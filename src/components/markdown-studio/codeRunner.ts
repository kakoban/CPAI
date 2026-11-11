export type RunnableLanguage = 'html' | 'javascript' | 'python';

export interface RunResult {
  success: boolean;
  output?: string;
  htmlDoc?: string;
  error?: string;
  executionTimeMs: number;
  lang: RunnableLanguage;
}

export function getRunnableLanguage(lang?: string): RunnableLanguage | null {
  if (!lang) return null;
  const l = lang.trim().toLowerCase();
  if (l === 'html' || l === 'htm') return 'html';
  if (l === 'javascript' || l === 'js') return 'javascript';
  if (l === 'python' || l === 'py') return 'python';
  return null;
}

function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  }
  return String(val);
}

let pyodideLoadingPromise: Promise<unknown> | null = null;

export async function loadPyodideInstance(onStatusUpdate?: (status: string) => void): Promise<any> {
  const win = window as any;
  if (win.__pyodideInstance) {
    return win.__pyodideInstance;
  }

  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      onStatusUpdate?.('در حال بارگذاری موتور پایتون (Pyodide WebAssembly)...');
      if (!win.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('عدم امکان دانلود ماژول Pyodide از CDN'));
          document.head.appendChild(script);
        });
      }

      onStatusUpdate?.('در حال راه‌اندازی محیط مفسر پایتون...');
      const pyodide = await win.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      });
      win.__pyodideInstance = pyodide;
      return pyodide;
    })();
  }

  return pyodideLoadingPromise;
}

export async function executeCode(
  code: string,
  rawLang: string,
  targetOrCallback?: HTMLElement | ((status: string) => void)
): Promise<RunResult> {
  const consoleEl = targetOrCallback instanceof HTMLElement ? targetOrCallback : null;
  const onStatusUpdate = typeof targetOrCallback === 'function' ? targetOrCallback : undefined;

  if (consoleEl) {
    consoleEl.classList.remove('hidden');
    consoleEl.innerHTML = `<div class="text-amber-400 text-xs py-1">در حال اجرای کد...</div>`;
  }

  const lang = getRunnableLanguage(rawLang);
  if (!lang) {
    const res: RunResult = {
      success: false,
      error: `زبان ${rawLang} برای اجرای مستقیم پشتیبانی نمی‌شود.`,
      executionTimeMs: 0,
      lang: 'javascript',
    };
    if (consoleEl) {
      consoleEl.innerHTML = `<pre class="text-rose-400 text-xs">${res.error}</pre>`;
    }
    return res;
  }

  const startTime = performance.now();

  if (lang === 'html') {
    const res: RunResult = {
      success: true,
      htmlDoc: code,
      executionTimeMs: Math.round(performance.now() - startTime),
      lang: 'html',
    };
    if (consoleEl) {
      consoleEl.innerHTML = `<iframe sandbox="allow-scripts" class="w-full h-48 bg-white rounded-lg border border-slate-700" srcdoc="${code.replace(/"/g, '&quot;')}"></iframe>`;
    }
    return res;
  }

  if (lang === 'javascript') {
    const logs: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) => logs.push(args.map(formatValue).join(' ')),
      info: (...args: unknown[]) => logs.push(args.map(formatValue).join(' ')),
      warn: (...args: unknown[]) => logs.push('[WARN] ' + args.map(formatValue).join(' ')),
      error: (...args: unknown[]) => logs.push('[ERROR] ' + args.map(formatValue).join(' ')),
    };

    try {
      const runner = new Function('console', `"use strict";\n${code}`);
      const result = runner(customConsole);
      if (result !== undefined) {
        logs.push(`=> ${formatValue(result)}`);
      }
      const outputText = logs.length > 0 ? logs.join('\n') : '(کد با موفقیت اجرا شد بدون خروجی کنسول)';
      if (consoleEl) {
        consoleEl.innerHTML = `<div class="flex items-center justify-between text-[10px] text-emerald-400 mb-1"><span>خروجی اجرای زنده (JavaScript):</span><span>${Math.round(performance.now() - startTime)}ms</span></div><pre class="text-emerald-300 text-xs whitespace-pre-wrap">${outputText}</pre>`;
      }
      return {
        success: true,
        output: outputText,
        executionTimeMs: Math.round(performance.now() - startTime),
        lang: 'javascript',
      };
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      if (consoleEl) {
        consoleEl.innerHTML = `<pre class="text-rose-400 text-xs whitespace-pre-wrap">${errMsg}</pre>`;
      }
      return {
        success: false,
        output: logs.join('\n'),
        error: errMsg,
        executionTimeMs: Math.round(performance.now() - startTime),
        lang: 'javascript',
      };
    }
  }

  if (lang === 'python') {
    try {
      const pyodide = await loadPyodideInstance((msg) => {
        onStatusUpdate?.(msg);
        if (consoleEl) {
          consoleEl.innerHTML = `<div class="text-amber-400 text-xs py-1">${msg}</div>`;
        }
      });

      const logs: string[] = [];
      pyodide.setStdout({ batched: (msg: string) => logs.push(msg) });
      pyodide.setStderr({ batched: (msg: string) => logs.push(`[stderr] ${msg}`) });

      const evalResult = await pyodide.runPythonAsync(code);
      if (evalResult !== undefined && evalResult !== null) {
        const strVal = String(evalResult);
        if (strVal && strVal !== 'None') {
          logs.push(strVal);
        }
      }

      const outputText = logs.length > 0 ? logs.join('\n') : '(کد پایتون با موفقیت اجرا شد بدون خروجی print)';
      if (consoleEl) {
        consoleEl.innerHTML = `<div class="flex items-center justify-between text-[10px] text-emerald-400 mb-1"><span>خروجی مفسر پایتون (Pyodide):</span><span>${Math.round(performance.now() - startTime)}ms</span></div><pre class="text-emerald-300 text-xs whitespace-pre-wrap">${outputText}</pre>`;
      }

      return {
        success: true,
        output: outputText,
        executionTimeMs: Math.round(performance.now() - startTime),
        lang: 'python',
      };
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      if (consoleEl) {
        consoleEl.innerHTML = `<pre class="text-rose-400 text-xs whitespace-pre-wrap">${errMsg}</pre>`;
      }
      return {
        success: false,
        error: errMsg,
        executionTimeMs: Math.round(performance.now() - startTime),
        lang: 'python',
      };
    }
  }

  return {
    success: false,
    error: 'زبان ناشناخته',
    executionTimeMs: 0,
    lang,
  };
}
