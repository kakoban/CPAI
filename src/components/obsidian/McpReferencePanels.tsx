import React from 'react';
import { ArrowRight, ExternalLink, Wrench } from 'lucide-react';
import { Language } from '../../types/cpmai';
import { MCP_TROUBLESHOOTING_TABLE } from '../../data/mcp_masterclass_curriculum';

interface McpReferencePanelProps {
  lang: Language;
  onBackToLesson: () => void;
}

/**
 * Calm reference view for MCP Protocol:
 * 1) 3 core architectural pillars (USB-C N+M, Host/Client/Server, FastMCP + Inspector)
 * 2) Semantic 3-row table comparing Tools vs Resources vs Prompts
 * 3) 4 Official MCP Server Directories + JSON validation tip
 */
export const McpArchitectureComparisonPanel: React.FC<McpReferencePanelProps> = ({
  lang,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';

  const directories = [
    { label: 'github.com/modelcontextprotocol/servers', href: 'https://github.com/modelcontextprotocol/servers' },
    { label: 'smithery.ai', href: 'https://smithery.ai' },
    { label: 'glama.ai/mcp/servers', href: 'https://glama.ai/mcp/servers' },
    { label: 'mcp.so', href: 'https://mcp.so' }
  ];

  return (
    <article className="space-y-8" data-testid="mcp-comparison-view">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-[var(--cpai-muted)]">
            {isFa
              ? 'مرجع معماری و منابع · Model Context Protocol'
              : 'Architecture & Directories · Model Context Protocol'}
          </div>
          <h3 className="cpai-lesson-title">
            {isFa
              ? 'سه ستون معماری MCP، مقایسه قابلیت‌ها و دایرکتوری سرورهای آماده'
              : 'MCP Core Pillars, Capabilities Comparison & Official Directories'}
          </h3>
          <p className="cpai-lesson-lead">
            {isFa
              ? 'نمای کلی استاندارد اتصال هوش مصنوعی به فایل‌ها، دیتابیس‌ها و ابزارهای سازمانی بدون نیاز به اتصال‌های تکراری.'
              : 'High-level architecture for connecting AI models to files, databases, and enterprise tools.'}
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

      {/* 3 Calm Architectural Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-2.5">
          <div className="text-xs font-medium text-[var(--cpai-muted)]">۰۱ · استاندارد اتصال</div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            پورت USB-C هوش مصنوعی (تبدیل N×M به N+M)
          </h4>
          <p className="text-sm leading-[1.85] text-[var(--cpai-text)]">
            پروتکل متن‌باز معرفی‌شده توسط Anthropic که هوش مصنوعی را از «اتاق دربسته» خارج می‌کند تا به فایل‌ها، دیتابیس‌ها، گیت‌هاب و APIها با یک زبان مشترک وصل شود.
          </p>
        </section>

        <section className="p-5 rounded-xl bg-[var(--cpai-primary-soft)] border border-[var(--cpai-primary)] space-y-2.5">
          <div className="text-xs font-semibold text-[var(--cpai-primary-strong)]">۰۲ · معماری ۳ جزئی</div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            Host، Client و MCP Server
          </h4>
          <p className="text-sm leading-[1.85] text-[var(--cpai-text)]">
            برنامه‌هایی مثل <strong className="font-semibold">Claude Desktop</strong> و{' '}
            <strong className="font-semibold">Cursor</strong> میزبان (Host) هستند، بخش مترجم داخل آن‌ها{' '}
            <strong className="font-semibold">Client</strong> است و برنامه پایتون شما{' '}
            <strong className="font-semibold">MCP Server</strong> است که Tools، Resources و Prompts را ارائه می‌دهد.
          </p>
        </section>

        <section className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-2.5">
          <div className="text-xs font-medium text-[var(--cpai-muted)]">۰۳ · پیاده‌سازی سریع</div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            ساخت سریع با FastMCP + تست با Inspector
          </h4>
          <p className="text-sm leading-[1.85] text-[var(--cpai-text)]">
            با پکیج رسمی <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">mcp[cli]&gt;=1.28,&lt;2</code> و دکوراتور{' '}
            <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">@mcp.tool()</code> هر تابع پایتونی به یک ابزار هوشمند برای هوش مصنوعی تبدیل می‌شود.
          </p>
        </section>
      </div>

      {/* Semantic 3-Row Capabilities Comparison Table */}
      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[var(--cpai-text)]">
          تفاوت دقیق ۳ قابلیت اصلی سرورهای MCP (<bdi dir="ltr">Tools vs. Resources vs. Prompts</bdi>)
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[var(--cpai-border)]">
          <table className="w-full text-right text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] text-[var(--cpai-text)]">
                <th scope="col" className="p-3.5 font-semibold">قابلیت در MCP</th>
                <th scope="col" className="p-3.5 font-semibold">نقش و عملکرد</th>
                <th scope="col" className="p-3.5 font-semibold">کنترل‌کننده</th>
                <th scope="col" className="p-3.5 font-semibold">مثال واقعی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--cpai-border)] text-[var(--cpai-text)] bg-[var(--cpai-surface)]">
              <tr>
                <th scope="row" className="p-3.5 font-mono text-xs sm:text-sm font-semibold text-[var(--cpai-primary-strong)]" dir="ltr">
                  1. Tools (@mcp.tool)
                </th>
                <td className="p-3.5">انجام عملیات، محاسبه، تغییر داده یا فراخوانی API</td>
                <td className="p-3.5 font-medium">مدل هوش مصنوعی (Model-Controlled)</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">افزودن تسک جدید، ارسال ایمیل، ثبت رکورد در دیتابیس</td>
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-mono text-xs sm:text-sm font-semibold text-[var(--cpai-primary-strong)]" dir="ltr">
                  2. Resources (@mcp.resource)
                </th>
                <td className="p-3.5">داده‌ها و فایل‌های صرفاً خواندنی (Read-Only Context)</td>
                <td className="p-3.5 font-medium">برنامه و مدل</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">خواندن لاگ سرور، فایل راهنما یا جدول قیمت‌ها بدون تغییر</td>
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-mono text-xs sm:text-sm font-semibold text-[var(--cpai-primary-strong)]" dir="ltr">
                  3. Prompts (@mcp.prompt)
                </th>
                <td className="p-3.5">قالب‌های آماده گفتگو و دستورالعمل‌های از پیش تعریف‌شده</td>
                <td className="p-3.5 font-medium">کاربر (User-Controlled)</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">قالب آماده «بررسی کد امنیتی» یا «خلاصه‌سازی گزارش روزانه»</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 Official MCP Server Directories + JSONLint Tip */}
      <section className="p-5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-4">
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            ۴ منبع معتبر دانلود هزاران سرور MCP آماده و رایگان
          </h4>
          <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
            قبل از اینکه خودتان سروری کدنویسی کنید، در این ۴ دایرکتوری رسمی بررسی کنید؛ برای اکثر سرویس‌ها (GitHub، Postgres، Google Drive، Brave Search، Slack) سرور آماده وجود دارد:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" dir="ltr">
          {directories.map((dir) => (
            <a
              key={dir.href}
              href={dir.href}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] px-3.5 py-2.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface)] border border-[var(--cpai-border)] hover:border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)] font-mono text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-colors"
            >
              <span className="truncate">{dir.label}</span>
              <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0" />
            </a>
          ))}
        </div>

        <div className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] text-sm text-[var(--cpai-text)] leading-relaxed">
          <strong className="font-semibold text-[var(--cpai-success-text)]">ابزار تست اعتبار فایل JSON تنظیمات: </strong>
          قبل از ذخیره <code dir="ltr" className="font-mono">claude_desktop_config.json</code>، کد خود را در سایت{' '}
          <a
            href="https://jsonlint.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono font-semibold text-[var(--cpai-primary-strong)] underline"
            dir="ltr"
          >
            jsonlint.com
          </a>{' '}
          تست کنید تا مطمئن شوید ویرگول اضافه یا بک‌اسلش تکی ندارد.
        </div>
      </section>
    </article>
  );
};

/**
 * Calm 7-row MCP Troubleshooting Reference Table.
 */
export const McpTroubleshootingPanel: React.FC<McpReferencePanelProps> = ({
  lang,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';

  return (
    <article className="space-y-6" data-testid="mcp-troubleshooting-view">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--cpai-muted)]">
            <Wrench aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
            <span>Troubleshooting Cheat Sheet</span>
          </div>
          <h3 className="cpai-lesson-title">
            {isFa
              ? 'جدول مرجع عیب‌یابی: ۷ خطای پرتکرار در راه‌اندازی MCP'
              : 'MCP Troubleshooting Reference: 7 Common Setup Errors'}
          </h3>
          <p className="cpai-lesson-lead">
            {isFa
              ? 'اگر هنگام اجرای سرور FastMCP یا اتصال به Claude Desktop به خطا برخوردید، علت و راه‌حل قطعی را اینجا بررسی کنید.'
              : 'Quick diagnostics and verified fixes for common FastMCP and Claude Desktop connection errors.'}
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

      <div className="overflow-x-auto rounded-xl border border-[var(--cpai-border)]">
        <table className="w-full text-right text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] text-[var(--cpai-text)]">
              <th scope="col" className="p-3.5 font-semibold w-[28%]">خطا / مشکل مشاهده‌شده</th>
              <th scope="col" className="p-3.5 font-semibold w-[32%]">علت اصلی</th>
              <th scope="col" className="p-3.5 font-semibold w-[40%]">راه‌حل سریع و قطعی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--cpai-border)] bg-[var(--cpai-surface)]">
            {MCP_TROUBLESHOOTING_TABLE.map((row, rIdx) => (
              <tr key={rIdx} className="align-top">
                <th scope="row" className="p-3.5 font-semibold text-[var(--cpai-error)]">
                  {row.errorTitle}
                </th>
                <td className="p-3.5 text-[var(--cpai-muted)] leading-relaxed">{row.causeFa}</td>
                <td className="p-3.5 text-[var(--cpai-text)] leading-relaxed">{row.solutionFa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
