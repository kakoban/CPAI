import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import katex from 'katex';
import { DocStats, HeadingItem, MarkdownDoc, MarkdownDocument } from './types';
import { getRunnableLanguage } from './codeRunner';
import { resolveTransclusions, renderSynapseLinks } from './synapseEngine';
import { renderDataBlockHtml } from './dataBlocksEngine';

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function preprocessMarkdown(md: string): { processed: string; mathBlocks: string[]; mathInlines: string[] } {
  const mathBlocks: string[] = [];
  const mathInlines: string[] = [];

  // 1. Extract and preserve Block Math $$...$$ (enforcing LTR)
  let processed = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    const idx = mathBlocks.length;
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      mathBlocks.push(`<div class="katex-block katex-display-wrapper my-4 overflow-x-auto py-2" style="direction: ltr !important; text-align: center !important;">${rendered}</div>`);
    } catch {
      mathBlocks.push(`<div class="katex-error" style="direction: ltr !important; text-align: left !important;">$$\n${escapeHtml(math)}\n$$</div>`);
    }
    return `%%MATHBLOCK_${idx}%%`;
  });

  // 2. Extract and preserve Inline Math $...$ (avoiding currency $10)
  processed = processed.replace(/(?<!\$)\$([^\$\n\r]+?)\$(?!\$)/g, (match, math) => {
    if (/^\d+(\.\d+)?$/.test(math.trim())) {
      return match;
    }
    const idx = mathInlines.length;
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
      mathInlines.push(`<span class="katex-inline" style="direction: ltr !important; display: inline-block;">${rendered}</span>`);
    } catch {
      mathInlines.push(`<span class="katex-error" style="direction: ltr !important;">$${escapeHtml(math)}$</span>`);
    }
    return `%%MATHINLINE_${idx}%%`;
  });

  // 3. Highlight syntax: ==color:text== or ==text==
  processed = processed.replace(/==(?:(yellow|green|blue|pink|purple|orange):)?([^=\n\r]+?)==/g, (_, color, text) => {
    const chosenColor = color || 'yellow';
    return `<mark class="md-highlight md-highlight-${chosenColor} cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all" data-highlight-color="${chosenColor}" data-raw-text="${escapeHtml(text.trim())}">${text}</mark>`;
  });

  // 4. Page break markers
  processed = processed.replace(/<!--\s*page[-_]?break\s*-->|\\pagebreak|\{\.page-break\}/gi, () => {
    return '\n\n<div class="page-break" aria-hidden="true"></div>\n\n';
  });

  return { processed, mathBlocks, mathInlines };
}

function postprocessHtml(html: string, mathBlocks: string[], mathInlines: string[]): string {
  let result = html;

  result = result.replace(/%%MATHBLOCK_(\d+)%%/g, (_, id) => mathBlocks[Number(id)] || '');
  result = result.replace(/%%MATHINLINE_(\d+)%%/g, (_, id) => mathInlines[Number(id)] || '');

  // GitHub / Obsidian callouts / admonitions
  const calloutRegex = /<blockquote[^>]*>\s*<p[^>]*>(?:\[\!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\])\s*(?:<br\s*\/?>)?([\s\S]*?)<\/p>\s*<\/blockquote>/gi;
  result = result.replace(calloutRegex, (_, type, content) => {
    const t = type.toUpperCase();
    const config: Record<string, { title: string; icon: string }> = {
      NOTE: {
        title: 'نکته آموزشی (Note)',
        icon: '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      },
      TIP: {
        title: 'نکته کاربردی (Tip)',
        icon: '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
      },
      IMPORTANT: {
        title: 'بسیار مهم (Important)',
        icon: '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
      },
      WARNING: {
        title: 'هشدار (Warning)',
        icon: '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      },
      CAUTION: {
        title: 'توجه ویژه (Caution)',
        icon: '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      },
    };
    const c = config[t] || config.NOTE;
    return `
      <div dir="auto" class="admonition admonition-${t.toLowerCase()}">
        <div class="admonition-title">
          ${c.icon}
          <span>${c.title}</span>
        </div>
        <div class="admonition-content">${content}</div>
      </div>
    `;
  });

  return result;
}

function createCustomRenderer(allDocs: MarkdownDoc[] = []) {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const rawText = tokens.map((t) => ('text' in t ? t.text : '')).join('');
    const id = slugify(rawText || `heading-${depth}`);
    return `<h${depth} id="${id}" dir="auto">${text}</h${depth}>\n`;
  };

  renderer.code = function ({ text, lang }) {
    const cleanLang = (lang || '').toLowerCase().trim();

    if (cleanLang === 'mermaid') {
      const encodedCode = encodeURIComponent(text);
      return `
        <div class="mermaid-block-wrapper my-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden shadow-xs" data-mermaid-code="${encodedCode}">
          <div class="mermaid-header flex items-center justify-between px-3 py-2 bg-[var(--bg-tertiary)]/60 border-b border-[var(--border-color)] text-xs text-[var(--text-muted)] select-none">
            <span class="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-indigo-500">
              <span>نمودار Mermaid</span>
            </span>
            <button type="button" data-code="${encodedCode}" class="copy-code-btn flex items-center gap-1 px-2 py-0.5 rounded text-[11px] cursor-pointer">
              <span>کپی کد</span>
            </button>
          </div>
          <div class="mermaid-render-container p-4 overflow-x-auto flex justify-center items-center min-h-[100px] dir-ltr text-center">
            <div class="mermaid-loading flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span>در حال رسم نمودار وکتور...</span>
            </div>
          </div>
        </div>
      `;
    }

    if (cleanLang === 'studio-query' || cleanLang === 'datablock') {
      return renderDataBlockHtml(text, allDocs);
    }

    const validLang = cleanLang && Prism.languages[cleanLang] ? cleanLang : null;
    let highlighted: string;

    if (validLang) {
      try {
        highlighted = Prism.highlight(text, Prism.languages[validLang], validLang);
      } catch {
        highlighted = escapeHtml(text);
      }
    } else if (cleanLang === 'typescript' || cleanLang === 'ts') {
      highlighted = Prism.highlight(text, Prism.languages.typescript || Prism.languages.javascript, 'typescript');
    } else {
      highlighted = escapeHtml(text);
    }

    const displayLang = cleanLang || 'code';
    const runnableLang = getRunnableLanguage(cleanLang);
    const encoded = encodeURIComponent(text);

    const runBtn = runnableLang
      ? `<button type="button" data-code="${encoded}" data-lang="${runnableLang}" class="run-code-btn"><span>اجرای زنده (Run)</span></button>`
      : '';

    return `
      <div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-lang">${displayLang}</span>
          <div class="flex items-center gap-2">
            ${runBtn}
            <button type="button" data-code="${encoded}" class="copy-code-btn">
              <span>کپی کد</span>
            </button>
          </div>
        </div>
        <pre><code class="language-${displayLang}">${highlighted}</code></pre>
        <div class="code-output-console hidden border-t border-slate-700/80 bg-slate-950 p-3.5 text-xs font-mono"></div>
      </div>
    `;
  };

  renderer.table = function (token) {
    let headerCells = '';
    for (let j = 0; j < token.header.length; j++) {
      headerCells += this.tablecell(token.header[j]);
    }
    const thead = `<thead><tr>${headerCells}</tr></thead>`;

    let bodyRows = '';
    for (let i = 0; i < token.rows.length; i++) {
      let rowCells = '';
      for (let j = 0; j < token.rows[i].length; j++) {
        rowCells += this.tablecell(token.rows[i][j]);
      }
      bodyRows += `<tr>${rowCells}</tr>`;
    }
    const tbody = `<tbody>${bodyRows}</tbody>`;

    return `<div class="table-responsive"><table class="custom-markdown-table">${thead}${tbody}</table></div>`;
  };

  return renderer;
}

export function parseMarkdown(
  markdown: string,
  options?: { documents?: MarkdownDocument[]; activeDocId?: string }
): string {
  if (!markdown) return '';
  const allDocs = options?.documents || [];
  const withTransclusions = allDocs.length > 0 ? resolveTransclusions(markdown, allDocs) : markdown;
  const { processed, mathBlocks, mathInlines } = preprocessMarkdown(withTransclusions);

  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer: createCustomRenderer(allDocs),
  });

  const parsed = marked.parse(processed, { async: false }) as string;
  const postprocessed = postprocessHtml(parsed, mathBlocks, mathInlines);

  return renderSynapseLinks(postprocessed, allDocs);
}

export async function parseMarkdownToHtml(markdown: string, allDocs: MarkdownDoc[] = []): Promise<string> {
  return parseMarkdown(markdown, { documents: allDocs });
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = markdown.split('\n');

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const cleanText = rawText
        .replace(/==(?:[\w]+:)?(.+?)==/g, '$1')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/\$(.+?)\$/g, '$1');

      headings.push({
        id: slugify(cleanText || `section-${index}`),
        text: cleanText,
        level,
        line: index + 1,
      });
    }
  });

  return headings;
}

export function calculateStats(text: string): DocStats {
  if (!text.trim()) {
    return {
      words: 0,
      chars: 0,
      charsNoSpaces: 0,
      lines: 1,
      readingTime: 0,
      readingTimeMin: 0,
      headingsCount: 0,
      tasks: { total: 0, completed: 0 },
      tasksCount: { total: 0, completed: 0 },
    };
  }

  const wordsArray = text.trim().match(/[\w\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF-]+/g);
  const words = wordsArray ? wordsArray.length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const lines = text.split('\n').length;
  const readingTimeMin = Math.max(1, Math.ceil(words / 180));
  const headingsCount = (text.match(/^#{1,6}\s+.+$/gm) || []).length;
  const totalTasks = (text.match(/^[\s]*[-*+]\s+\[[ xX]\]\s+/gm) || []).length;
  const completedTasks = (text.match(/^[\s]*[-*+]\s+\[[xX]\]\s+/gm) || []).length;

  return {
    words,
    chars,
    charsNoSpaces,
    lines,
    readingTime: readingTimeMin,
    readingTimeMin,
    headingsCount,
    tasks: {
      total: totalTasks,
      completed: completedTasks,
    },
    tasksCount: {
      total: totalTasks,
      completed: completedTasks,
    },
  };
}
