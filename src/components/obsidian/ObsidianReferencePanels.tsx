import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Play
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import { OBSIDIAN_DAILY_WORKFLOWS } from '../../data/obsidian_second_brain_curriculum';

interface ObsidianComparisonProps {
  lang: Language;
  onBackToLesson: () => void;
}

/**
 * Calm reference view for Obsidian Second Brain (Module 4-4):
 * - Why Obsidian (3 principles + official links)
 * - 4-row comparison table: Obsidian vs Notion vs Google NotebookLM
 * - D:/MIND/ 5-folder Vault architecture + Properties & [[Wikilinks]] rules
 */
export const ObsidianComparisonVaultPanel: React.FC<ObsidianComparisonProps> = ({
  lang,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';

  return (
    <article className="space-y-8" data-testid="obsidian-comparison-view">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-[var(--cpai-muted)]">
            {isFa
              ? 'مقایسه ابزارها و معماری پوشه · Obsidian Vault'
              : 'Tool Comparison & Vault Architecture · Obsidian'}
          </div>
          <h3 className="cpai-lesson-title">
            {isFa
              ? 'چرا Obsidian؟ مقایسه با Notion و NotebookLM + ساختار D:/MIND'
              : 'Obsidian vs. Notion vs. NotebookLM & D:/MIND Vault Architecture'}
          </h3>
          <p className="cpai-lesson-lead">
            {isFa
              ? 'شناخت تفاوت حافظه دوطرفه محلی با ابزارهای ابری و ساختار استاندارد ۵ پوشه برای درک فوری توسط Claude و Hermes.'
              : 'Understanding local read/write AI memory versus cloud tools and the standard 5-folder Vault layout.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToLesson}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-text)] transition-colors shrink-0 self-start"
        >
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
          <span>{isFa ? 'بازگشت به درس' : 'Back to lesson'}</span>
        </button>
      </header>

      {/* Why Obsidian + Official Links */}
      <section className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-4">
        <h4 className="text-base font-semibold text-[var(--cpai-text)]">
          چرا Obsidian تنها انتخاب واقعی برای «حافظه دائمی هوش مصنوعی» است؟
        </h4>
        <ul className="space-y-3 text-sm leading-[1.85] text-[var(--cpai-text)]">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-1" />
            <span>
              <strong className="font-semibold">فایل متنی ساده روی هارد خودتان (Local .md):</strong>{' '}
              برخلاف Notion که یادداشت‌ها را در سرور ابری قفل می‌کند، در Obsidian همه چیز فایل متنی ساده روی کامپیوتر شماست و هوش مصنوعی مستقیم آن‌ها را می‌خواند و ویرایش می‌کند.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-1" />
            <span>
              <strong className="font-semibold">تفاوت با NotebookLM:</strong>{' '}
              نوت‌بوک ال‌ام یک «کتابخانه تحقیق یک‌طرفه (فقط خواندنی)» برای PDFهای مرجع است؛ اما Obsidian یک «دفتر کار دوطرفه (خواندن و نوشتن)» است که هوش مصنوعی داخل آن یادداشت می‌سازد و پوشه‌ها را مرتب می‌کند.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-1" />
            <span>
              <strong className="font-semibold">۱۰۰٪ رایگان، آفلاین و بدون تحریم:</strong>{' '}
              هیچ محدودیت اکانت یا ریسک مسدود شدن حساب ابری وجود ندارد.
            </span>
          </li>
        </ul>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <a
            href="https://obsidian.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface)] border border-[var(--cpai-border)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-primary-strong)] transition-colors"
          >
            <span>سایت رسمی Obsidian.md</span>
            <ExternalLink aria-hidden="true" className="w-4 h-4" />
          </a>
          <a
            href="https://hermes-agent.nousresearch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface)] border border-[var(--cpai-border)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-primary-strong)] transition-colors"
          >
            <span>سایت Hermes Agent</span>
            <ExternalLink aria-hidden="true" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 4-Row Semantic Comparison Table */}
      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[var(--cpai-text)]">
          مقایسه دقیق: Obsidian در برابر Notion و Google NotebookLM
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[var(--cpai-border)]">
          <table className="w-full text-right text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] text-[var(--cpai-text)]">
                <th scope="col" className="p-3.5 font-semibold">معیار مقایسه</th>
                <th scope="col" className="p-3.5 font-semibold text-[var(--cpai-primary-strong)]">
                  Obsidian (مغز دوم زنده)
                </th>
                <th scope="col" className="p-3.5 font-semibold">Notion (فضای کاری ابری)</th>
                <th scope="col" className="p-3.5 font-semibold">Google NotebookLM (کتابخانه تحقیق)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)]">
              <tr>
                <th scope="row" className="p-3.5 font-semibold">محل ذخیره و فرمت</th>
                <td className="p-3.5 bg-[var(--cpai-primary-soft)] font-medium text-[var(--cpai-primary-strong)]">
                  فایل متنی ساده (.md) روی هارد کامپیوتر شما
                </td>
                <td className="p-3.5 text-[var(--cpai-muted)]">دیتابیس بسته در سرورهای ابری نوشن</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">منابع ثابت آپلودشده در کلود گوگل</td>
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-semibold">نوع دسترسی هوش مصنوعی</th>
                <td className="p-3.5 bg-[var(--cpai-primary-soft)] font-medium text-[var(--cpai-primary-strong)]">
                  دوطرفه کامل (خواندن، نوشتن، ویرایش و جابه‌جایی فایل‌ها)
                </td>
                <td className="p-3.5 text-[var(--cpai-muted)]">محدود و نیازمند API پیچیده</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">یک‌طرفه (فقط می‌خواند و به سوالات جواب می‌دهد)</td>
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-semibold">اتصال به Claude و Hermes</th>
                <td className="p-3.5 bg-[var(--cpai-primary-soft)] font-medium text-[var(--cpai-primary-strong)]">
                  مستقیم و آنی (از طریق پوشه Vault روی هارد)
                </td>
                <td className="p-3.5 text-[var(--cpai-muted)]">غیرمستقیم و کند</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">محیط بسته داخل سایت گوگل</td>
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-semibold">بهترین کاربرد</th>
                <td className="p-3.5 bg-[var(--cpai-primary-soft)] font-medium text-[var(--cpai-primary-strong)]">
                  حافظه دائمی روزانه، مدیریت پروژه‌ها، ایده‌ها و مرتب‌سازی خودکار
                </td>
                <td className="p-3.5 text-[var(--cpai-muted)]">تابلوهای تسک تیمی آنلاین</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">تحلیل PDFهای سنگین، قراردادها و ساخت پادکست/اسلاید</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Vault Architecture D:/MIND */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            معماری استاندارد پوشه‌های Vault + قواعد یادداشت‌نویسی برای هوش مصنوعی
          </h4>
          <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
            برای اینکه Claude و Hermes بلافاصله ساختار مغز دوم شما را بفهمند، از ساختن ده‌ها پوشه تودرتو خودداری کنید و فقط این ۵ پوشه شماره‌گذاری‌شده + فایل راهنمای{' '}
            <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">CLAUDE.md</code> را در ریشه والت بسازید:
          </p>
        </div>

        <pre dir="ltr" className="cpai-code-block p-4 overflow-x-auto text-left select-text">
{`D:/MIND/                   # پوشه اصلی Vault (نام انگلیسی و بدون فاصله)
├── 00_Inbox/              # یادداشت‌های خام و عجله‌ای روزانه
├── 01_Projects/           # پروژه‌های فعال در حال اجرا
├── 02_Areas/              # حوزه‌های دائمی کار و زندگی
├── 03_Resources/          # بانک مقالات، آموزش‌ها و پرامپت‌ها
├── 04_Archive/            # پروژه‌های تکمیل‌شده
└── CLAUDE.md              # شناسنامه و قوانین والت برای هوش مصنوعی`}
        </pre>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-1.5">
            <h5 className="text-sm font-semibold text-[var(--cpai-text)]">
              ۱. ویژگی‌های بالای یادداشت (<bdi dir="ltr">Properties / YAML Frontmatter</bdi>)
            </h5>
            <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
              در خط اول هر یادداشت سه خط تیره (<code dir="ltr" className="font-mono">---</code>) بزنید تا بخش Properties باز شود و حداقل{' '}
              <code dir="ltr" className="font-mono">date</code>، <code dir="ltr" className="font-mono">tags</code> و{' '}
              <code dir="ltr" className="font-mono">status</code> را ثبت کنید.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-1.5">
            <h5 className="text-sm font-semibold text-[var(--cpai-text)]">
              ۲. لینک‌های داخلی دوطرفه با دو کروشه <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">[[نام یادداشت]]</code>
            </h5>
            <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
              برای اتصال یادداشت‌ها در Graph View و درک ارتباط موضوعات توسط هوش مصنوعی، نام موضوعات مرتبط را داخل دو کروشه بگذارید.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

interface ObsidianConnectProps {
  lang: Language;
  claudeMdTemplate: string;
  claudeMcpConfigCode: string;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onDownloadFile: (fileName: string, content: string) => void;
  onLoadToSandbox?: (promptText: string) => void;
  onBackToLesson: () => void;
}

/**
 * Calm connection & daily workflows panel for Obsidian Second Brain (Module 4-4):
 * - CLAUDE.md Constitution Template (Download + Copy)
 * - Claude Desktop MCP JSON Config + Hermes Agent Method 1 & 2 + Windows/WSL Path Fix
 * - 4 Daily Operational Workflows (Copy + Load to Sandbox)
 */
export const ObsidianConnectWorkflowsPanel: React.FC<ObsidianConnectProps> = ({
  lang,
  claudeMdTemplate,
  claudeMcpConfigCode,
  copyToClipboard,
  copiedId,
  onDownloadFile,
  onLoadToSandbox,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';

  return (
    <article className="space-y-8" data-testid="obsidian-connect-view">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-[var(--cpai-muted)]">
            {isFa
              ? 'راهنمای اتصال، تمپلیت CLAUDE.md و ۴ پرامپت روزمره'
              : 'Connection Setup, CLAUDE.md & 4 Daily Workflows'}
          </div>
          <h3 className="cpai-lesson-title">
            {isFa
              ? 'اتصال Claude Desktop و Hermes به والت + پرامپت‌های عملیاتی'
              : 'Connect Claude Desktop & Hermes Agent + Daily Workflows'}
          </h3>
          <p className="cpai-lesson-lead">
            {isFa
              ? 'همه فایل‌های تنظیمات، رفع خطای مسیر ویندوز/WSL و ۴ پرامپت آماده برای مدیریت روزانه والت.'
              : 'Configuration snippets, Windows/WSL path fixes, and 4 ready-to-run daily prompts.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToLesson}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-text)] transition-colors shrink-0 self-start"
        >
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
          <span>{isFa ? 'بازگشت به درس' : 'Back to lesson'}</span>
        </button>
      </header>

      {/* 1. CLAUDE.md Constitution Template */}
      <section className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--cpai-text)]">
              فایل کلیدی <bdi dir="ltr">CLAUDE.md</bdi> (شناسنامه شما برای Claude و Hermes)
            </h4>
            <p className="text-sm text-[var(--cpai-muted)]">
              ذخیره در ریشه <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">D:/MIND/CLAUDE.md</code>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              type="button"
              onClick={() => onDownloadFile('CLAUDE.md', claudeMdTemplate)}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Download aria-hidden="true" className="w-4 h-4" />
              <span>دانلود <bdi dir="ltr">CLAUDE.md</bdi></span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(claudeMdTemplate, 'claude_md_tpl')}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-text)] transition-colors whitespace-nowrap"
            >
              {copiedId === 'claude_md_tpl' ? (
                <>
                  <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
                  <span>کپی شد</span>
                </>
              ) : (
                <>
                  <Copy aria-hidden="true" className="w-4 h-4" />
                  <span>کپی متن</span>
                </>
              )}
            </button>
          </div>
        </div>

        <pre dir="rtl" className="cpai-code-block p-4 max-h-60 overflow-y-auto whitespace-pre-wrap text-right select-text">
          {claudeMdTemplate}
        </pre>
      </section>

      {/* 2. Connection Guides: Claude Desktop + Hermes Agent + Windows/WSL Fix */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[var(--cpai-primary-strong)]">۱. اتصال Claude Desktop</div>
            <h4 className="text-base font-semibold text-[var(--cpai-text)]">
              دسترسی مستقیم برنامه دسکتاپ کلاد به پوشه <bdi dir="ltr">D:/MIND</bdi>
            </h4>
            <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
              در برنامه Claude Desktop وارد <code dir="ltr" className="font-mono">Settings &gt; Developer &gt; Edit Config</code> شوید و آدرس پوشه Vault خود را در{' '}
              <code dir="ltr" className="font-mono">claude_desktop_config.json</code> قرار دهید:
            </p>
            <pre dir="ltr" className="cpai-code-block p-3.5 overflow-x-auto text-left select-text">
              <code>{claudeMcpConfigCode}</code>
            </pre>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(claudeMcpConfigCode, 'mcp_cfg_code')}
            className="w-full min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-text)] flex items-center justify-center gap-2 transition-colors"
          >
            {copiedId === 'mcp_cfg_code' ? (
              <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
            ) : (
              <Copy aria-hidden="true" className="w-4 h-4" />
            )}
            <span>{copiedId === 'mcp_cfg_code' ? 'کانفیگ کپی شد' : 'کپی کانفیگ Claude Desktop'}</span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[var(--cpai-primary-strong)]">۲. اتصال ایجنت رایگان Hermes</div>
            <h4 className="text-base font-semibold text-[var(--cpai-text)]">
              اسکیل داخلی Obsidian در Hermes Agent (هر دو روش)
            </h4>
            <div className="text-sm text-[var(--cpai-muted)] space-y-2.5 leading-relaxed">
              <p>
                <strong className="font-semibold text-[var(--cpai-text)]">روش اول (دائمی):</strong> اسکیل{' '}
                <code dir="ltr" className="font-mono">skills/note-taking/obsidian</code> را روشن کنید و در{' '}
                <code dir="ltr" className="font-mono">~/.hermes/.env</code> بنویسید:
              </p>
              <pre dir="ltr" className="cpai-code-block p-3 text-left select-text">
                <code>OBSIDIAN_VAULT_PATH=&quot;D:/MIND&quot;</code>
              </pre>
              <p>
                <strong className="font-semibold text-[var(--cpai-text)]">روش دوم (مستقیم در چت):</strong> در اولین پیام به Hermes بگویید: «والت آبسیدین من در مسیر{' '}
                <code dir="ltr" className="font-mono">D:/MIND</code> (یا <code dir="ltr" className="font-mono">/mnt/d/MIND</code>) است؛ با اسکیل Obsidian وارد آن شو.»
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard('OBSIDIAN_VAULT_PATH="D:/MIND"', 'hermes_env_code')}
            className="w-full min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-sm font-medium text-[var(--cpai-text)] flex items-center justify-center gap-2 transition-colors"
          >
            {copiedId === 'hermes_env_code' ? (
              <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
            ) : (
              <Copy aria-hidden="true" className="w-4 h-4" />
            )}
            <span>{copiedId === 'hermes_env_code' ? 'کپی شد' : 'کپی کد مسیر Hermes'}</span>
          </button>
        </div>
      </section>

      {/* 3. Windows / WSL Path Warning Callout */}
      <section className="p-5 rounded-xl bg-[var(--cpai-warning-bg)] border border-[var(--cpai-warning-border)] space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--cpai-warning-text)]">
          <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0" />
          <span>رفع مشکل رایج ویندوز و WSL (خوانده نشدن مسیر Vault)</span>
        </div>
        <ul className="space-y-1.5 text-sm text-[var(--cpai-text)] leading-relaxed ps-4 list-disc">
          <li>
            <strong className="font-semibold">خطای بک‌اسلش ویندوز:</strong> هرگز آدرس را به صورت{' '}
            <code dir="ltr" className="font-mono">D:\MIND</code> ننویسید؛ حتماً از اسلش معمولی{' '}
            <code dir="ltr" className="font-mono">D:/MIND</code> یا دو بک‌اسلش <code dir="ltr" className="font-mono">D:\\MIND</code> استفاده کنید.
          </li>
          <li>
            <strong className="font-semibold">مسیر درایوها در WSL:</strong> اگر Hermes را در WSL اجرا می‌کنید، درایو D به صورت{' '}
            <code dir="ltr" className="font-mono">/mnt/d/MIND</code> نوشته می‌شود.
          </li>
          <li>
            <strong className="font-semibold">نام پوشه ریشه:</strong> بدون فاصله و انگلیسی باشد (مثلاً <code dir="ltr" className="font-mono">D:/MIND</code>).
          </li>
        </ul>
      </section>

      {/* 4. 4 Daily Operational Workflows */}
      <section className="space-y-4">
        <h4 className="text-base font-semibold text-[var(--cpai-text)]">
          ۴ پرامپت عملیاتی روزمره با مغز دوم (مرتب‌سازی خودکار یادداشت‌ها با Hermes و Claude)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OBSIDIAN_DAILY_WORKFLOWS.map((wf) => (
            <div
              key={wf.id}
              data-testid={`obsidian-workflow-${wf.id}`}
              className="p-4 sm:p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[var(--cpai-primary-strong)]">{wf.badgeFa}</div>
                <h5 className="text-sm font-semibold text-[var(--cpai-text)]">{wf.titleFa}</h5>
                <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">{wf.descriptionFa}</p>
                <pre
                  dir="rtl"
                  className="p-3 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface)] border border-[var(--cpai-border)] font-mono text-xs text-[var(--cpai-text)] whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto select-text text-right"
                >
                  {wf.promptFa}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--cpai-border)]">
                <button
                  type="button"
                  onClick={() => copyToClipboard(wf.promptFa, `obs_wf_${wf.id}`)}
                  className="flex-1 min-h-[42px] px-3.5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedId === `obs_wf_${wf.id}` ? (
                    <Check aria-hidden="true" className="w-4 h-4" />
                  ) : (
                    <Copy aria-hidden="true" className="w-4 h-4" />
                  )}
                  <span>{copiedId === `obs_wf_${wf.id}` ? 'کپی شد' : 'کپی پرامپت'}</span>
                </button>
                {onLoadToSandbox && (
                  <button
                    type="button"
                    onClick={() => onLoadToSandbox(wf.promptFa)}
                    className="min-h-[42px] px-3.5 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)] text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play aria-hidden="true" className="w-3.5 h-3.5" />
                    <span>تست در سندباکس</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
