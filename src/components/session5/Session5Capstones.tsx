import React from 'react';
import { Check, Copy, Play } from 'lucide-react';
import { Language } from '../../types/cpmai';
import { FocusedModuleDeck, FocusedModuleDeckStep } from '../learning/FocusedModuleDeck';

interface Session5OrchestrationModuleProps {
  lang: Language;
  trackLabelFa: string;
  orchestrationPrompt: string;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onLoadToSandbox: (promptText: string) => void;
}

export const Session5OrchestrationModule: React.FC<Session5OrchestrationModuleProps> = ({
  lang,
  trackLabelFa,
  orchestrationPrompt,
  copyToClipboard,
  copiedId,
  onLoadToSandbox
}) => {
  const isFa = lang === 'fa';
  const isCopied = copiedId === 's5_orchestration_prompt';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's5-1-raw-input',
      title: isFa ? 'ورودی خام: Google Drive یا پوشه هارد' : 'Raw Input: Google Drive / Local Folder',
      category: isFa ? 'مرحله ۱ زنجیره' : 'Pipeline Stage 1',
      subtitle: isFa
        ? 'آماده‌سازی پرونده‌های پروژه در مخزن فایل استاندارد'
        : 'Preparing project status files in a structured folder or Drive',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa ? (
              <>
                در شروع زنجیره ارکستراسیون پایان دوره، فایل وضعیت کارگاه (
                <strong className="font-semibold text-[var(--cpai-primary-strong)]">{trackLabelFa}</strong>)
                در پوشه محلی پروژه یا فضای Google Drive قرار می‌گیرد.
              </>
            ) : (
              'At the start of the end-to-end capstone workflow, raw project files live in your local project folder or Google Drive.'
            )}
          </p>
          <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-2 text-sm text-[var(--cpai-muted)]">
            <div className="font-semibold text-[var(--cpai-text)]">
              {isFa ? 'ساختار پیشنهادی پوشه ورودی' : 'Recommended Input Folder Structure'}
            </div>
            <p className="leading-relaxed">
              {isFa
                ? 'فایل‌های خام گزارش پیشرفت، فایل‌های Markdown خلاصه جلسات و جداول CSV/Excel را در یک پوشه با نام‌گذاری منظم قرار دهید تا ایجنت بدون سردرگمی همه مستندات را ببیند.'
                : 'Keep progress reports, Markdown meeting notes, and CSV/Excel sheets inside one clearly named folder so the agent reads them reliably.'}
            </p>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'هرچه نام‌گذاری فایل‌های خام در پوشه پروژه منظم‌تر باشد، خطای مرحله خوانش خودکار به صفر نزدیک‌تر می‌شود.'
        : 'Clean folder naming directly eliminates ambiguity during automated MCP ingestion.'
    },
    {
      id: 's5-1-mcp-pipeline',
      title: isFa ? 'پایپ‌لاین داده: خوانش خودکار با MCP' : 'Data Pipeline: Automated Reading via MCP',
      category: isFa ? 'مرحله ۲ زنجیره' : 'Pipeline Stage 2',
      subtitle: isFa
        ? 'اتصال مستقیم کلاود به فایل‌های پروژه بدون کپی-پیست دستی'
        : 'Connecting Claude directly to project files with zero manual copy-paste',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa
              ? 'کلاود بدون کپی-پیست، فایل‌ها را مستقیماً از طریق Filesystem MCP یا Google Drive MCP می‌خواند. با این کار محدودیت‌های بارگذاری دستی حذف می‌شود و تمام فایل‌های مرتبط یکجا وارد بافت تحلیل می‌شوند.'
              : 'Claude reads project files directly via Filesystem MCP or Google Drive MCP without manual copy-paste, bringing every relevant document into one grounded context.'}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'به‌جای انتقال تکه-تکه متن‌ها، دسترسی خواندنی (Read-Only) از طریق MCP بدهید تا مدل به نسخه واقعی و به‌روز فایل‌ها متصل بماند.'
        : 'Grant scoped read access via MCP so the model always inspects live source documents.'
    },
    {
      id: 's5-1-skill-audit',
      title: isFa ? 'مغز پردازش: ممیزی با SKILL.md' : 'Processing Brain: Auditing with SKILL.md',
      category: isFa ? 'مرحله ۳ زنجیره' : 'Pipeline Stage 3',
      subtitle: isFa
        ? 'اجرای قواعد کنترل پروژه، شناسایی گلوگاه‌ها و اعداد مشکوک'
        : 'Applying your standard SKILL.md rules to catch bottlenecks and unverified figures',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa ? (
              <>
                بر اساس اسکیل کنترل پروژه شما (<code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] font-mono text-sm">SKILL.md</code>)، مدل تاخیرات، گلوگاه‌ها و اعداد مشکوک یا بدون منبع را استخراج و ممیزی می‌کند.
              </>
            ) : (
              'Using your project controls SKILL.md, the model systematically extracts delays, bottlenecks, and unverified numbers.'
            )}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'وقتی دستورالعمل ممیزی داخل SKILL.md استانداردسازی شده باشد، هر بار اجرای زنجیره خروجی هم‌ساختار و قابل اتکا تولید می‌کند.'
        : 'A standardized SKILL.md guarantees repeatable, auditable analysis on every run.'
    },
    {
      id: 's5-1-artifact-viz',
      title: isFa ? 'مصورسازی: تولید داشبورد Artifact' : 'Visualization: Interactive Artifact Dashboard',
      category: isFa ? 'مرحله ۴ زنجیره' : 'Pipeline Stage 4',
      subtitle: isFa
        ? 'تبدیل گزارش ممیزی به داشبورد تعاملی HTML/React همراه با جدول هشدارها'
        : 'Turning audit findings into an interactive HTML/React dashboard with alert tables',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa
              ? 'خروجی ممیزی به‌صورت داشبورد تعاملی HTML/React همراه با جدول هشدارها، شاخص‌های کلیدی (KPI) و فیلتر وضعیت بحرانی ساخته می‌شود تا مدیران پروژه در چند ثانیه وضعیت واقعی کارگاه را ببینند.'
              : 'The audit output is rendered as an interactive HTML/React dashboard with alert tables and KPIs so project leadership spots issues immediately.'}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'خروجی مدیریتی باید هم خوانا و هم تعاملی باشد؛ Artifact فاصله میان تحلیل متنی و تصمیم‌گیری مدیران را حذف می‌کند.'
        : 'Artifacts turn raw audit text into executive-ready interactive decision views.'
    },
    {
      id: 's5-1-github-dcc',
      title: isFa ? 'انتشار در DCC: ثبت با GitHub MCP' : 'Publish to DCC: Commit via GitHub MCP',
      category: isFa ? 'مرحله ۵ زنجیره' : 'Pipeline Stage 5',
      subtitle: isFa
        ? 'ثبت مستقیم کد داشبورد و گزارش Markdown در مخزن GitHub پروژه'
        : 'Committing dashboard code and Markdown reports directly to your GitHub repository',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa
              ? 'کد داشبورد و گزارش Markdown به‌صورت مستقیم در ریپازیتوری GitHub پروژه ثبت و منتشر می‌شود. بدین ترتیب تاریخچه کامل نسخه‌ها (Version History) در DCC پروژه حفظ شده و قابل ممیزی می‌ماند.'
              : 'Dashboard code and Markdown reports are committed directly to the project GitHub repository, preserving a complete auditable version history.'}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'ثبت خروجی نهایی در GitHub باعث می‌شود هیچ گزارش مدیریتی در پیام‌رسان‌ها گم نشود و همه تغییرات دارای تاریخچه دقیق باشند.'
        : 'Committing outputs to GitHub preserves full traceability across reporting cycles.'
    },
    {
      id: 's5-1-master-prompt',
      title: isFa ? 'پرامپت جامع ارکستراسیون (اجرای یک‌مرحله‌ای)' : 'Master Orchestration Prompt',
      category: isFa ? 'اجرای عملی' : 'Hands-on Execution',
      subtitle: isFa
        ? 'اجرای کل زنجیره ۵ مرحله‌ای بالا با یک دستور واحد در محیط کار'
        : 'Trigger the complete 5-stage workflow with a single structured instruction',
      content: (
        <div className="space-y-4">
          <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[var(--cpai-muted)]">
            {isFa
              ? 'پرامپت زیر تمام ۵ گام زنجیره (خوانش MCP، ممیزی با SKILL.md، تولید داشبورد Artifact و آماده‌سازی Commit گیت‌هاب) را در یک دستور استاندارد ترکیب می‌کند:'
              : 'Copy or load this master orchestration prompt into the Sandbox to execute all 5 stages seamlessly:'}
          </p>

          <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
            <div className="px-4 py-2.5 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[var(--cpai-text)]">
                {isFa ? 'پرامپت جامع ارکستراسیون پایان دوره' : 'Capstone Master Orchestration Prompt'}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(orchestrationPrompt)}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ارسال به سندباکس' : 'Load to Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orchestrationPrompt, 's5_orchestration_prompt')}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>
                    {isCopied
                      ? isFa
                        ? 'پرامپت ارکستراسیون کپی شد!'
                        : 'Copied!'
                      : isFa
                      ? 'کپی پرامپت جامع ارکستراسیون'
                      : 'Copy Master Prompt'}
                  </span>
                </button>
              </div>
            </div>
            <pre
              dir="rtl"
              className="p-4 bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-xs leading-relaxed whitespace-pre-wrap text-right overflow-x-auto"
            >
              {orchestrationPrompt}
            </pre>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'پیش از اجرای نهایی Commit در GitHub، خروجی مرحله ۴ (داشبورد و جدول هشدارها) را یک بار مرور و تأیید انسانی (Human-in-the-Loop) کنید.'
        : 'Always review the generated dashboard and alert table before approving the final GitHub commit.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session5-orchestration-module"
      moduleCode={isFa ? 'ماژول ۵-۱' : 'Module 5-1'}
      moduleTitle={
        isFa
          ? 'پروژه جامع پایان دوره (End-to-End Engineering Workflow)'
          : 'End-to-End Engineering Workflow Capstone'
      }
      moduleSubtitle={
        isFa
          ? '۲.۵ ساعت · اتصال زنجیره‌ای Drive + Filesystem MCP + Skill + Artifact + GitHub MCP'
          : '2.5 hrs · Connecting Drive + Filesystem MCP + Skill + Artifact + GitHub MCP'
      }
      steps={steps}
    />
  );
};

interface Session5VibeCodingModuleProps {
  lang: Language;
}

export const Session5VibeCodingModule: React.FC<Session5VibeCodingModuleProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's5-4-vision',
      title: isFa
        ? 'گذر از محیط چت به محیط توسعه هوشمند (IDE)'
        : 'Moving from Chat to AI-Native IDEs',
      category: isFa ? 'چشم‌انداز Vibe Coding' : 'Vibe Coding Vision',
      subtitle: isFa
        ? 'تبدیل تک‌فایل‌های محیط چت به نرم‌افزارهای کامل چندصفحه‌ای در Cursor، Windsurf و Claude Code'
        : 'Evolving single-file chat outputs into full multi-page apps in Cursor, Windsurf, and Claude Code',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <blockquote className="rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-border)] p-5 sm:p-6 text-[var(--cpai-text)] leading-[1.9]">
            «تا امروز در محیط چت (Claude و Gemini) تک‌فایل‌ها و مینی‌اپلیکیشن‌ها را ساختید، با Skills به آن‌ها روش کار دادید و با MCP به فایل‌ها و گیت‌هاب وصل شدید. در دوره{' '}
            <strong className="font-bold text-[var(--cpai-primary-strong)]">Vibe Coding</strong>، ما همین مغز هوش مصنوعی، همین MCPها، همین Skills و همین GitHub را به داخل یک محیط توسعه حرفه‌ای (IDE) می‌بریم تا به‌جای یک صفحه داشبورد، یک نرم‌افزار کامل تحت وب یا دسکتاپ چندصفحه‌ای با دیتابیس واقعی بسازیم؛ بدون اینکه خودتان درگیر سینتکس کدنویسی شوید.»
          </blockquote>
        </div>
      ),
      takeaway: isFa
        ? 'تمام مفاهیمی که در این ۵ جلسه آموختید (Markdown، Skills، Artifacts، MCP و دیتابیس) دقیقاً زیرساخت اصلی ورود به Vibe Coding هستند.'
        : 'Everything learned across these 5 sessions directly powers full-stack Vibe Coding workflows.'
    },
    {
      id: 's5-4-legacy-github-mcp',
      title: isFa ? 'میراث جلسه ۱ و ۴: GitHub + MCP' : 'Legacy of Sessions 1 & 4: GitHub + MCP',
      category: isFa ? 'معماری مخزن و اتصال' : 'Repo & Integration',
      subtitle: isFa
        ? 'مخزن کد واقعی با Commit و Branch مستقیم توسط ایجنت'
        : 'Your GitHub repository becomes the live codebase for agent commits and branches',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa
              ? 'ریپازیتوری گیت‌هاب شما تبدیل به مخزن اصلی کد نرم‌افزار می‌شود و ایجنت مستقیماً در آن Commit و Branch می‌زند. هر تغییر قابلیت بازگشت (Rollback) و بررسی دقیق (Pull Request) دارد.'
              : 'Your GitHub repository becomes the primary software codebase where the agent creates branches and commits with full rollback safety.'}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'تسلط بر شاخه‌سازی (Branching) و مستندسازی در GitHub مهم‌ترین کمربند ایمنی شما هنگام کار با ایجنت‌های کدنویس است.'
        : 'GitHub branching and clean commits are your safety net when building with coding agents.'
    },
    {
      id: 's5-4-legacy-artifacts',
      title: isFa ? 'میراث جلسه ۲: Artifacts → Components' : 'Legacy of Session 2: Artifacts → Components',
      category: isFa ? 'معماری رابط کاربری' : 'UI Component Architecture',
      subtitle: isFa
        ? 'تبدیل تک‌صفحه‌های React ساخته‌شده در Artifacts به کامپوننت‌های ماژولار'
        : 'Transforming single-page React Artifacts into modular enterprise components',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa
              ? 'تک‌صفحه‌های React که در Artifacts ساختید، به کامپوننت‌های ماژولار یک سیستم کامل سازمانی تبدیل می‌شوند؛ با مسیریابی چندصفحه‌ای، احراز هویت واقعی و اتصال مستقیم به پایگاه داده.'
              : 'Single-page React Artifacts evolve into modular components inside a full enterprise application with routing, auth, and persistent databases.'}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'هر داشبورد یا فرم تعاملی که امروز در Artifact طراحی می‌کنید، می‌تواند فردا مستقیم به یک صفحه واقعی در سامانه سازمانی شما تبدیل شود.'
        : 'Every Artifact prototype you design today can become a production page tomorrow.'
    },
    {
      id: 's5-4-legacy-skills',
      title: isFa ? 'میراث جلسه ۳: SKILL.md → CLAUDE.md' : 'Legacy of Session 3: SKILL.md → CLAUDE.md',
      category: isFa ? 'استانداردسازی ایجنت' : 'Agent Governance',
      subtitle: isFa
        ? 'انتقال مهارت‌های استاندارد به پوشه .claude/skills پروژه'
        : 'Placing your standardized skills inside .claude/skills/ so coding agents follow your rules',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            {isFa ? (
              <>
                مهارت‌های استانداردی که نوشتید، در پوشه{' '}
                <code
                  dir="ltr"
                  className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] font-mono text-sm"
                >
                  .claude/skills/
                </code>{' '}
                پروژه قرار می‌گیرند تا ایجنت کدنویس دقیقاً طبق استاندارد سازمانی، زبان طراحی و قوانین امنیتی شما کد بزند.
              </>
            ) : (
              'The standardized skills you wrote live inside .claude/skills/ so coding agents adhere to your exact architectural and security standards.'
            )}
          </p>
        </div>
      ),
      takeaway: isFa
        ? 'در دنیای Vibe Coding، مزیت رقابتی شما دانستن سینتکس نیست؛ بلکه داشتن SKILL.md و CLAUDE.md دقیق و مهندسی‌شده است.'
        : 'In Vibe Coding, your superpower is precise engineering specifications in SKILL.md and CLAUDE.md.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session5-vibecoding-module"
      moduleCode={isFa ? 'ماژول ۵-۴' : 'Module 5-4'}
      moduleTitle={
        isFa
          ? 'پل ورود به Vibe Coding؛ فردا قرار است چه کار کنیم؟'
          : 'Bridge to Vibe Coding: What Comes Next?'
      }
      moduleSubtitle={
        isFa
          ? '۱.۵ ساعت · گذر از تک‌فایل‌های چت به نرم‌افزارهای چندصفحه‌ای در Cursor، Windsurf و Claude Code'
          : '1.5 hrs · From chat Artifacts to multi-page software in Cursor, Windsurf & Claude Code'
      }
      steps={steps}
    />
  );
};
