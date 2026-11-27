import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Check,
  Copy,
  Download,
  ExternalLink,
  FolderTree,
  Play
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import { FocusedModuleDeck, FocusedModuleDeckStep } from '../learning/FocusedModuleDeck';
import {
  DiagramWrapper,
  GitHubAnnotatedUiMockup,
  GitHubDccWorkflowDiagram,
  PipelineArchitectureDiagram,
  VisualTableComparisonDiagram
} from '../visuals/EngineeringVisualDiagrams';

interface TrackMetaphorSummary {
  trackLabelFa: string;
  driveFa: string;
  githubFa: string;
}

interface Session1DemoModuleProps {
  lang: Language;
  activeTrackMetaphor: TrackMetaphorSummary;
}

export const Session1DemoModule: React.FC<Session1DemoModuleProps> = ({
  lang,
  activeTrackMetaphor
}) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's1-1-story',
      title: isFa ? 'داستان این دوره ۲۰ ساعته چیست؟' : 'Why Start with Drive & GitHub?',
      category: isFa ? 'مقدمه از صفر مطلق' : 'Zero-Assumption Intro',
      subtitle: isFa
        ? `مسیر انتخابی شما: ${activeTrackMetaphor.trackLabelFa}`
        : activeTrackMetaphor.trackLabelFa,
      content: (
        <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            اکثر افراد از هوش مصنوعی فقط مثل یک «چت‌بات معمولی» استفاده می‌کنند: هر روز یک جدول یا متن را از فایل‌های به‌هم‌ریخته کپی می‌کنند، داخل چت پیست می‌کنند و جواب می‌گیرند؛ و فردا که چت جدیدی باز می‌کنند، هوش مصنوعی همه‌چیز را فراموش کرده است! در سال ۲۰۲۶ با ظهور{' '}
            <strong className="font-semibold">مهارت‌های ماژولار (Skills)</strong> و{' '}
            <strong className="font-semibold">پروتکل اتصال مستقیم (MCP)</strong>، هوش مصنوعی دیگر یک چت‌بات نیست؛ بلکه به یک همکار دیجیتال تبدیل شده که به پوشه‌های گوگل درایو و آرشیو گیت‌هاب شما وصل می‌شود.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-sm">
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-[var(--cpai-error)]">۱. مشکل روش سنتی (بدون زیرساخت)</div>
              <p className="text-[var(--cpai-muted)] leading-relaxed">
                فایل‌های پراکنده با نام‌های{' '}
                <code dir="ltr" className="px-1 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] font-mono text-xs">
                  Final_Rev3_Edited.xlsx
                </code>
                ، کپی-پیست دستی و فراموشی دائمی استانداردهای شرکت توسط مدل.
              </p>
            </div>
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-[var(--cpai-primary-strong)]">۲. دو ستون ذخیره‌سازی در جلسه ۱</div>
              <p className="text-[var(--cpai-muted)] leading-relaxed">
                • <strong className="text-[var(--cpai-text)]">{activeTrackMetaphor.driveFa}</strong>
                <br />• <strong className="text-[var(--cpai-text)]">{activeTrackMetaphor.githubFa}</strong>
              </p>
            </div>
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-[var(--cpai-success-text)]">۳. خروجی نهایی در جلسه ۵</div>
              <p className="text-[var(--cpai-muted)] leading-relaxed">
                خوانش خودکار جدول از Drive/هارد با MCP ← ممیزی با Skill ← تولید داشبورد در Artifact ← ثبت ریویژن در GitHub!
              </p>
            </div>
          </div>
        </div>
      ),
      takeaway:
        'پرامپت‌نویسی بدون زیرساخت داده تمیز، فقط سرعت تکرار خطا را بالا می‌برد؛ به همین دلیل دوره را از استانداردسازی Drive، Markdown و GitHub آغاز می‌کنیم.'
    },
    {
      id: 's1-1-pipeline-diagram',
      title: isFa ? 'معماری خط تولید خودکار ۵ مرحله‌ای دوره' : '5-Stage Automated AI Pipeline',
      category: isFa ? 'اینفوگرافیک معماری' : 'Architecture Visual',
      subtitle: isFa
        ? 'نمایش جایگاه هر ابزار از جلسه ۱ تا ارکستراسیون کامل جلسه ۵'
        : 'How each session tool connects into one repeatable pipeline',
      content: (
        <DiagramWrapper
          titleFa="اینفوگرافیک تصویری: زنجیره خط تولید خودکار مهندسی (پایپ‌لاین ۵ مرحله‌ای دوره)"
          titleEn="Visual Infographic: Automated 5-Stage Engineering AI Pipeline"
          badgeFa="معماری پیوسته"
          lang={lang}
        >
          <PipelineArchitectureDiagram lang={lang} />
        </DiagramWrapper>
      ),
      takeaway:
        'هر ۵ جلسه این دوره دقیقاً یک حلقه از این زنجیره را تکمیل می‌کند تا در جلسه ۵ کل فرایند به‌صورت پیوسته اجرا شود.'
    },
    {
      id: 's1-1-roadmap-table',
      title: isFa ? 'نقشه راه ۵ جلسه و چرایی تقدم گیت‌هاب بر پرامپت‌نویسی' : '5-Session Roadmap Table',
      category: isFa ? 'نقشه راه دوره' : 'Curriculum Map',
      subtitle: isFa
        ? 'نقش گوگل درایو، گیت‌هاب و خروجی عملی هر جلسه'
        : 'Deliverables and data infrastructure role across all 5 sessions',
      content: (
        <div className="overflow-x-auto rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)]">
          <table className="w-full text-right text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] font-bold text-[var(--cpai-text)]">
                <th className="p-3.5">جلسه</th>
                <th className="p-3.5">محور اصلی</th>
                <th className="p-3.5">نقش گیت‌هاب و درایو در آن جلسه</th>
                <th className="p-3.5">خروجی عملی پایان جلسه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--cpai-border)] text-[var(--cpai-text)]">
              <tr>
                <td className="p-3.5 font-semibold text-[var(--cpai-primary-strong)] whitespace-nowrap">جلسه ۱ (۴ ساعت)</td>
                <td className="p-3.5 font-medium">زیرساخت داده (Drive + Markdown + GitHub)</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">ایجاد اولین شیت استاندارد در Drive و ساخت اولین مخزن (Repo) در GitHub</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">ثبت اولین فایل دستورالعمل <code dir="ltr" className="font-mono text-xs">README.md</code> در گیت‌هاب</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[var(--cpai-primary-strong)] whitespace-nowrap">جلسه ۲ (۴ ساعت)</td>
                <td className="p-3.5 font-medium">LLMها، پرامپت‌نویسی RCTO، Gems/Projects و Artifacts</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">تغذیه فایل‌های استاندارد جلسه ۱ به Projects و ذخیره کد داشبورد Artifact در GitHub</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">ساخت مشاور مقیم و داشبورد تعاملی React/HTML</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[var(--cpai-primary-strong)] whitespace-nowrap">جلسه ۳ (۴ ساعت)</td>
                <td className="p-3.5 font-medium">NotebookLM، ممیزی قراردادها و معماری Skills</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">اتصال Gem به <code dir="ltr" className="font-mono text-xs">@Google Drive</code> و ذخیره پوشه <code dir="ltr" className="font-mono text-xs">SKILL.md</code> در GitHub تیمی</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">ساخت و تست مهارت دائمی با سناریوی تله اعداد</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[var(--cpai-primary-strong)] whitespace-nowrap">جلسه ۴ (۴ ساعت)</td>
                <td className="p-3.5 font-medium">انقلاب MCP، خطوط قرمز امنیتی و مغز دوم Obsidian</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">اتصال مستقیم کلاود به هارد شخصی (Filesystem MCP) و اکانت گیت‌هاب (GitHub MCP)</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">خواندن و ویرایش خودکار فایل‌ها بدون کپی-پیست</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[var(--cpai-primary-strong)] whitespace-nowrap">جلسه ۵ (۴ ساعت)</td>
                <td className="p-3.5 font-medium">ارکستراسیون کامل، مسترکلاس و پل Vibe Coding</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">اجرای خط تولید کامل از Drive تا انتشار زنده داشبورد روی GitHub Pages</td>
                <td className="p-3.5 text-[var(--cpai-muted)]">آمادگی ۱۰۰٪ برای ورود به محیط‌های Cursor و Claude Code</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      takeaway:
        'همه فایل‌هایی که امروز در Drive و GitHub می‌سازید تا پایان جلسه ۵ و حتی در دوره Vibe Coding همراه شما باقی می‌مانند.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session1-demo-module"
      moduleCode={isFa ? 'ماژول ۱-۱' : 'Module 1-1'}
      moduleTitle={
        isFa
          ? 'دموی ۱۵ دقیقه‌ای خروجی نهایی: چرا باید قبل از هوش مصنوعی از Drive و GitHub شروع کنیم؟'
          : '15-Min Final Outcome Demo: Why Drive & GitHub Come First'
      }
      moduleSubtitle={
        isFa
          ? 'نمایش خط تولید تمام‌اتوماتیک جلسه ۵ برای درک جایگاه هر ابزار پیش از شروع دوره'
          : 'Previewing the Session 5 automated workflow before building the foundation'
      }
      steps={steps}
    />
  );
};

interface Session1DriveModuleProps {
  lang: Language;
  activeTrackMetaphor: TrackMetaphorSummary;
  cleanCsvContent: string;
  downloadTextFile: (filename: string, text: string, mimeType: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onLoadToSandbox: (promptText: string) => void;
}

export const Session1DriveModule: React.FC<Session1DriveModuleProps> = ({
  lang,
  activeTrackMetaphor,
  cleanCsvContent,
  downloadTextFile,
  copyToClipboard,
  copiedId,
  onLoadToSandbox
}) => {
  const isFa = lang === 'fa';
  const cleanTablePrompt =
    'این جدول کپی‌شده را به یک جدول کاملاً استاندارد و ماشین‌خوان CSV تبدیل کن: سلول‌های ادغام‌شده را در تمام ردیف‌ها پر کن، اعداد را از توضیحات متنی جدا کن، ردیف‌های جمع کل میانی را حذف کن و یک ستون مجزا برای Notes بساز.';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's1-2-definition',
      title: isFa ? 'گوگل درایو و ساختار پوشه‌بندی استاندارد' : 'Google Drive & Standard Folder Architecture',
      category: isFa ? 'تعریف پایه از صفر' : 'Zero-to-One Definition',
      subtitle: activeTrackMetaphor.driveFa,
      content: (
        <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            <strong className="font-semibold">گوگل درایو (Google Drive)</strong> یک هارد دیسک ابری رایگان (۱۵ گیگابایت) متصل به جیمیل شماست. برخلاف پوشه‌های معمولی ویندوز یا فلش‌مموری که با هر بار ایمیل کردن یک فایل، نسخه‌های تکراری و گیج‌کننده ایجاد می‌شود، در{' '}
            <strong className="font-semibold">Google Docs</strong> (معادل Word) و{' '}
            <strong className="font-semibold">Google Sheets</strong> (معادل Excel) تمام اعضای تیم روی{' '}
            <strong className="font-semibold">یک نسخه واحد و زنده</strong> کار می‌کنند. مهم‌تر از آن، هوش مصنوعی Gemini و Claude می‌توانند مستقیماً به پوشه‌های گوگل درایو شما وصل شوند و از روی جداول زنده گزارش بگیرند؛ به شرطی که جدول شما «ماشین‌خوان» باشد!
          </p>

          <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--cpai-text)]">
                <FolderTree className="w-4 h-4 text-[var(--cpai-primary)]" />
                <span>ساختار پوشه‌بندی استاندارد در Google Drive</span>
              </div>
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline"
              >
                <span>ورود به drive.google.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <pre
              dir="ltr"
              className="p-3.5 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-xs space-y-1 overflow-x-auto"
            >
{`📁 AI_Project_Workspace/
 ├── 📁 01_Master_Specs/ (Contracts, MDR, WBS)
 ├── 📁 02_Live_Sheets/ (Clean Tabular Sheets)
 └── 📁 03_AI_Outputs/ (Audits & Reports)`}
            </pre>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)] text-xs">
              <span className="text-[var(--cpai-muted)]">نمونه فایل CSV استاندارد آماده تست:</span>
              <button
                type="button"
                onClick={() => downloadTextFile('clean_engineering_log.csv', cleanCsvContent, 'text/csv;charset=utf-8;')}
                className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود نمونه CSV استاندارد</span>
              </button>
            </div>
          </div>
        </div>
      ),
      takeaway:
        'فایل‌های پروژه را در ۳ پوشه مجزا (اسناد مرجع، شیت‌های زنده و خروجی‌های AI) سازمان‌دهی کنید تا اتصال Google Drive Connector دقیق و سریع باشد.'
    },
    {
      id: 's1-2-five-rules',
      title: isFa ? '۵ قانون طلایی جدول ماشین‌خوان (Machine-Readable)' : '5 Golden Rules for Machine-Readable Tables',
      category: isFa ? 'استانداردسازی داده' : 'Data Standardization',
      content: (
        <ol className="space-y-3 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--cpai-text)]">
          {[
            {
              title: '۱. ممنوعیت مطلق سلول‌های Merge شده',
              body: 'ادغام سلول‌ها باعث خطای Null و جا افتادن نام فعالیت‌ها هنگام خوانش توسط هوش مصنوعی می‌شود.'
            },
            {
              title: '۲. سطر اول = فقط نام ستون‌ها',
              body: 'بدون ردیف‌های عنوان تزیینی، لوگو یا تاریخ در بالای جدول.'
            },
            {
              title: '۳. خلوص نوع داده در هر ستون',
              body: 'در ستون درصد یا مبلغ، فقط عدد بنویسید (عبارت «حدود ۴۰٪» یا «تأیید نشده» در ستون عدد ممنوع است).'
            },
            {
              title: '۴. حذف ردیف «جمع کل» از وسط جدول خام',
              body: 'ردیف‌های جمع میانی باعث دوبار شمارش شدن اعداد در تحلیل AI و محاسبات می‌شوند.'
            },
            {
              title: '۵. معماری دو شیتی (Raw Data vs Dashboard)',
              body: 'تب 01_Raw_Data را خالص برای هوش مصنوعی نگه دارید و تب 02_Dashboard را برای پرینت و ارائه مدیریتی بسازید.'
            }
          ].map((rule, idx) => (
            <li
              key={idx}
              className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1"
            >
              <div className="font-bold text-[var(--cpai-primary-strong)]">{rule.title}</div>
              <p className="text-[var(--cpai-text)]">{rule.body}</p>
            </li>
          ))}
        </ol>
      ),
      takeaway:
        'جدا کردن تب داده خام (01_Raw_Data) از تب گزارش پرینتی (02_Dashboard) مشکل ۹۰٪ اکسل‌های کارگاهی را یک‌بار برای همیشه حل می‌کند.'
    },
    {
      id: 's1-2-visual-comparison',
      title: isFa ? 'مقایسه بصری: جدول خراب انسانی در برابر شیت ماشین‌خوان' : 'Broken Excel vs Machine-Readable Sheet',
      category: isFa ? 'مقایسه ساختاری' : 'Visual Comparison',
      content: (
        <div className="space-y-5">
          <DiagramWrapper
            titleFa="مقایسه بصری ساختار شیت‌ها: جدول پر از نویز اکسل ❌ در برابر شیت ماشین‌خوان هوش مصنوعی ✅"
            titleEn="Visual Comparison: Legacy Excel Table vs. AI Machine-Readable Sheet"
            badgeFa="الگوی ساختاری"
            lang={lang}
          >
            <VisualTableComparisonDiagram lang={lang} />
          </DiagramWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] space-y-2">
              <div className="font-bold text-[var(--cpai-error)]">❌ جدول رایج ولی خراب برای هوش مصنوعی</div>
              <ul className="space-y-1.5 text-[var(--cpai-text)] leading-relaxed">
                <li>• ردیف ۱ تا ۳: «به نام خدا - گزارش پیشرفت ماهانه پروژه - تاریخ: آبانماه» (سلول ادغام‌شده سراسری)</li>
                <li>• ستون نام واحد: برای ۵ فعالیت زیر هم، سلول «ایستگاه مرکزی» Merge شده است (ردیف‌های ۲ تا ۵ برای AI خالی دیده می‌شوند!).</li>
                <li>• ستون پیشرفت: نوشته شده «حدود ۷۵ درصد (منتظر تایید ناظر)» (ترکیب متن و عدد در یک سلول).</li>
              </ul>
            </div>
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] space-y-2">
              <div className="font-bold text-[var(--cpai-success-text)]">✅ جدول تمیز و استاندارد (Machine-Readable)</div>
              <pre
                dir="ltr"
                className="p-3 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-[11px] overflow-x-auto"
              >
                {cleanCsvContent}
              </pre>
            </div>
          </div>
        </div>
      ),
      takeaway:
        'هر ردیف در جدول ماشین‌خوان باید به‌تنهایی کامل و خودکفا باشد؛ هیچ ردیفی نباید برای فهمیده شدن به سلول Merge شده ردیف بالایی وابسته باشد.'
    },
    {
      id: 's1-2-cleaner-prompt',
      title: isFa ? 'پرامپت تمیزکننده خودکار جداول نامنظم' : 'Automated Table Cleaning Prompt',
      category: isFa ? 'تمرین عملی ۱۵ دقیقه‌ای' : 'Hands-On Exercise',
      content: (
        <div className="space-y-4">
          <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[var(--cpai-text)]">
            اگر از قبل جدول‌های نامنظم زیادی دارید، نیازی نیست دستی آن‌ها را اصلاح کنید! جدول نامنظم را کپی کنید و با پرامپت زیر به Claude یا Gemini بدهید تا نسخه استاندارد CSV را تحویلتان دهد:
          </p>
          <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
            <div className="px-4 py-2.5 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[var(--cpai-text)]">پرامپت تبدیل جدول اکسل به CSV استاندارد</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(cleanTablePrompt)}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>ارسال به سندباکس</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(cleanTablePrompt, 'clean_table_prompt')}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                >
                  {copiedId === 'clean_table_prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'clean_table_prompt' ? 'کپی شد!' : 'کپی پرامپت'}</span>
                </button>
              </div>
            </div>
            <div className="p-4 bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] text-xs sm:text-sm leading-relaxed font-mono">
              «{cleanTablePrompt}»
            </div>
          </div>
        </div>
      ),
      takeaway:
        'همیشه خروجی CSV تولیدشده توسط مدل را یک بار در Google Sheets باز کنید و مطمئن شوید تعداد ردیف‌ها و جمع کل اعداد دقیقاً با فایل اصلی برابر است.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session1-drive-module"
      moduleCode={isFa ? 'ماژول ۱-۲' : 'Module 1-2'}
      moduleTitle={
        isFa
          ? 'گوگل درایو (Google Drive) و استانداردسازی جداول کارگاهی'
          : 'Google Drive & Machine-Readable Engineering Sheets'
      }
      moduleSubtitle={
        isFa
          ? `۱.۵ ساعت · ${activeTrackMetaphor.driveFa}`
          : '1.5 hrs · From messy Excel spreadsheets to AI-ready tables'
      }
      steps={steps}
    />
  );
};

interface Session1MarkdownModuleProps {
  lang: Language;
  readmeMd: string;
  downloadTextFile: (filename: string, text: string, mimeType: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const Session1MarkdownModule: React.FC<Session1MarkdownModuleProps> = ({
  lang,
  readmeMd,
  downloadTextFile,
  copyToClipboard,
  copiedId
}) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's1-3-what-is-md',
      title: isFa ? 'اصلاً Markdown چیست و چرا جایگزین Word شده است؟' : 'What is Markdown (.md)?',
      category: isFa ? 'تعریف پایه از صفر' : 'Zero-to-One Definition',
      content: (
        <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
          <p>
            <strong className="font-semibold">مارک‌داون (Markdown)</strong> با پسوند{' '}
            <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] font-mono text-sm">
              .md
            </code>{' '}
            ساده‌ترین استاندارد جهانی برای نوشتن متن ساختاریافته با کیبورد است. در نرم‌افزار Word، وقتی متنی را تیتر یا جدول می‌کنید، هزاران خط کد مخفی استایل و فونت پشت صحنه ذخیره می‌شود که برای هوش مصنوعی حکم «نویز و زباله» را دارد. اما در Markdown، شما با گذاشتن یک علامت مربع (
            <code dir="ltr" className="px-1 py-0.5 rounded bg-[var(--cpai-surface-subtle)] font-mono text-sm">#</code>) قبل از جمله به هوش مصنوعی می‌گویید «این تیتر اصلی است» و با گذاشتن دو ستاره (
            <code dir="ltr" className="px-1 py-0.5 rounded bg-[var(--cpai-surface-subtle)] font-mono text-sm">**مهم**</code>) می‌گویید «روی این کلمه تمرکز کن».
          </p>
          <p className="text-[var(--cpai-muted)]">
            تمام فایل‌های <strong className="text-[var(--cpai-text)]">GitHub (README.md)</strong>، تمام{' '}
            <strong className="text-[var(--cpai-text)]">مهارت‌های کلود (SKILL.md)</strong> و تمام یادداشت‌های{' '}
            <strong className="text-[var(--cpai-text)]">Obsidian</strong> با همین فرمت نوشته می‌شوند!
          </p>
        </div>
      ),
      takeaway:
        'فایل Markdown سبک‌ترین، تمیزترین و دقیق‌ترین قالب متنی برای انتقال ساختار، سلسله‌مراتب و قوانین به مدل‌های زبانی است.'
    },
    {
      id: 's1-3-cheat-sheet',
      title: isFa ? 'تقلب‌نامه ۶ علامت طلایی Markdown' : '6 Essential Markdown Symbols',
      category: isFa ? 'سینتکس کاربردی' : 'Cheat Sheet',
      subtitle: isFa ? 'کل چیزی که برای نوشتن مستندات حرفه‌ای نیاز دارید' : 'Everything you need to write structured AI specs',
      content: (
        <div
          dir="ltr"
          className="p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-xs sm:text-sm space-y-2.5 overflow-x-auto"
        >
          <div><span className="text-emerald-400"># Title</span>         → تیتر اصلی سطح ۱ (H1)</div>
          <div><span className="text-emerald-400">## Section</span>      → تیتر بخش سطح ۲ (H2)</div>
          <div><span className="text-amber-300">**Bold Rule**</span>   → بولد و تاکید شدید روی قانون</div>
          <div><span className="text-sky-400">- Item</span>          → بولت‌پوینت و لیست شروط</div>
          <div><span className="text-pink-400">| A | B |</span>       → ساخت جدول ساختاریافته</div>
          <div><span className="text-purple-300">---</span>             → خط افقی جداکننده بخش‌ها</div>
        </div>
      ),
      takeaway:
        'یادگیری همین ۶ علامت کمتر از ۵ دقیقه زمان می‌برد اما دقت پاسخ‌گویی مدل به پرامپت‌ها و اسناد شما را به‌شکل محسوسی افزایش می‌دهد.'
    },
    {
      id: 's1-3-readme-template',
      title: isFa ? 'قالب آماده README.md برای اولین مخزن گیت‌هاب شما' : 'Ready-to-Use README.md Template',
      category: isFa ? 'قالب آماده دانلود' : 'Downloadable Template',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-[15px] text-[var(--cpai-muted)] leading-relaxed">
            این فایل استاندارد را دانلود یا کپی کنید تا در ماژول بعدی (۱-۴ گیت‌هاب) مستقیماً در اولین Repository خود قرار دهید:
          </p>
          <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
            <div className="px-4 py-2.5 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-wrap items-center justify-between gap-2">
              <span dir="ltr" className="font-mono text-xs font-semibold text-[var(--cpai-text)]">README.md</span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => downloadTextFile('README.md', readmeMd, 'text/markdown;charset=utf-8;')}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                  <span>دانلود فایل README.md</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(readmeMd, 'sample_readme_md')}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                >
                  {copiedId === 'sample_readme_md' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'sample_readme_md' ? 'کپی شد!' : 'کپی متن Markdown'}</span>
                </button>
              </div>
            </div>
            <pre
              dir="rtl"
              className="p-4 bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-xs max-h-72 overflow-y-auto whitespace-pre-wrap text-right leading-relaxed"
            >
              {readmeMd}
            </pre>
          </div>
        </div>
      ),
      takeaway:
        'فایل README.md شناسنامه رسمی مخزن شما در GitHub است؛ هم اعضای تیم و هم ایجنت‌های هوش مصنوعی ابتدا این فایل را می‌خوانند.'
    },
    {
      id: 's1-3-conversion-yaml',
      title: isFa ? 'تبدیل خودکار Word به Markdown + مفهوم YAML Frontmatter' : 'Auto-Converting Word & YAML Frontmatter',
      category: isFa ? 'تکنیک تکمیلی' : 'Workflow Tip',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-2">
            <h4 className="font-bold text-[var(--cpai-text)]">۱. تبدیل مستقیم در Google Docs (بدون هیچ ابزاری)</h4>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              فایل Word خود را در Google Docs باز کنید و از منوی بالا روی{' '}
              <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] font-mono text-xs text-[var(--cpai-text)]">
                File &gt; Download &gt; Markdown (.md)
              </code>{' '}
              کلیک کنید! گوگل داکس تمام تیترها و جداول شما را به یک فایل <code dir="ltr" className="font-mono">.md</code> تمیز تبدیل می‌کند.
            </p>
          </div>
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-2">
            <h4 className="font-bold text-[var(--cpai-text)]">۲. شناسنامه بالای فایل (YAML Frontmatter) چیست؟</h4>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              در ابتدای فایل‌های حرفه‌ای Markdown (مثل{' '}
              <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] font-mono text-xs text-[var(--cpai-text)]">
                SKILL.md
              </code>{' '}
              در جلسه ۳)، چند خط بین دو علامت <code dir="ltr" className="font-mono">---</code> نوشته می‌شود که شامل نام و شرط فعال‌سازی فایل برای هوش مصنوعی است.
            </p>
          </div>
        </div>
      ),
      takeaway:
        'تبدیل اسناد Word قدیمی از طریق خروجی Markdown گوگل داکس سریع‌ترین راه برای ورود آرشیو سازمانی شما به دنیای AI است.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session1-markdown-module"
      moduleCode={isFa ? 'ماژول ۱-۳' : 'Module 1-3'}
      moduleTitle={
        isFa
          ? 'زبان Markdown (.md)؛ زبان مادری هوش مصنوعی و گیت‌هاب'
          : 'Markdown (.md): The Native Language of AI & GitHub'
      }
      moduleSubtitle={
        isFa
          ? '۱ ساعت · از تعریف پایه Markdown تا تسلط بر ۶ علامت کلیدی و قالب آماده دستورالعمل مهندسی'
          : '1 hr · 6 core symbols, README.md template & YAML frontmatter'
      }
      steps={steps}
    />
  );
};

interface Session1GithubModuleProps {
  lang: Language;
  activeTrackMetaphor: TrackMetaphorSummary;
}

export const Session1GithubModule: React.FC<Session1GithubModuleProps> = ({
  lang,
  activeTrackMetaphor
}) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's1-4-concepts',
      title: isFa ? 'گیت‌هاب به زبان دفتر فنی و کنترل مدارک (DCC)' : 'GitHub as Engineering DCC',
      category: isFa ? '۶ مفهوم پایه' : '6 Core Concepts',
      subtitle: activeTrackMetaphor.githubFa,
      content: (
        <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.85] text-[var(--cpai-text)]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p>
              تصور کنید در دفتر فنی پروژه، ۵ مهندس روی یک دستورالعمل کار می‌کنند و فایل‌ها را با نام‌های{' '}
              <code dir="ltr" className="font-mono text-xs">Spec_Rev1.docx</code> و{' '}
              <code dir="ltr" className="font-mono text-xs">Spec_Final_Ali.docx</code> ردوبدل می‌کنند.{' '}
              <strong className="font-semibold">GitHub</strong> دقیقاً یک{' '}
              <strong className="font-semibold">سیستم کنترل مدارک ابری (DCC)</strong> و «ماشین زمان فایل‌ها» است: تمام مهارت‌های کلود (
              <code dir="ltr" className="font-mono text-xs">SKILL.md</code>)، تمام سرورهای MCP و داشبوردهای Artifacts روی GitHub نگهداری می‌شوند.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline"
            >
              <span>ورود به سایت github.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
            {[
              {
                en: '1. Repository (Repo)',
                dcc: 'معادل: زونکن و پرونده اصلی پروژه در DCC',
                desc: 'پوشه اصلی پروژه شما در گیت‌هاب که تمام فایل‌های Markdown، اسکیل‌ها، قالب‌ها و داشبوردها با تاریخچه کامل در آن قرار می‌گیرند.'
              },
              {
                en: '2. Commit (ثبت ریویژن)',
                dcc: 'معادل: صدور ریویژن جدید (Rev.01 → Rev.02)',
                desc: 'ذخیره رسمی تغییر به همراه یک جمله توضیح (Commit Message) که مشخص می‌کند دقیقاً چه چیزی و به چه دلیلی اصلاح شد.'
              },
              {
                en: '3. Diff (مقایسه تغییرات)',
                dcc: 'معادل: Redline و ابروگذاری تغییرات',
                desc: 'نمایش خودکار تفاوت دو ریویژن کنار هم؛ جملات حذف‌شده با رنگ قرمز و جملات جدید با رنگ سبز مشخص می‌شوند.'
              },
              {
                en: '4. Branch (شاخه موازی)',
                dcc: 'معادل: نسخه چکنویس و آزمایشی (Draft)',
                desc: 'ایجاد یک کپی موازی از سند برای اعمال تغییرات آزمایشی، بدون اینکه نسخه اصلی مصوب (main) دستکاری یا خراب شود.'
              },
              {
                en: '5. Pull Request (PR)',
                dcc: 'معادل: فرم درخواست تایید سرپرست (IFC)',
                desc: 'درخواست رسمی برای بررسی تغییرات شاخه چکنویس توسط مدیر فنی و ادغام (Merge) آن در نسخه اصلی پروژه.'
              },
              {
                en: '6. GitHub Pages',
                dcc: 'معادل: تابلوی اعلانات و داشبورد آنلاین پروژه',
                desc: 'قابلیت رایگان تبدیل داشبوردهای ساخته‌شده با Claude Artifacts در مخزن شما به یک لینک وب زنده برای کارفرما.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5"
              >
                <div dir="ltr" className="font-mono font-bold text-xs text-[var(--cpai-primary-strong)] text-right">
                  {item.en}
                </div>
                <div className="font-bold text-[var(--cpai-text)]">{item.dcc}</div>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      takeaway:
        'برای کار با گیت‌هاب نیازی به برنامه‌نویسی نیست؛ اگر منطق ریویژن، چکنویس و تایید سرپرست در کنترل مدارک را بشناسید، کل منطق GitHub را بلدید.'
    },
    {
      id: 's1-4-diagrams',
      title: isFa ? 'چرخه مهندسی مدارک و راهنمای تصویری ۳ کلید حیاتی گیت‌هاب' : 'DCC Lifecycle & GitHub Web UI Guide',
      category: isFa ? 'راهنمای تصویری' : 'Visual Guide',
      content: (
        <div className="space-y-5">
          <DiagramWrapper
            titleFa="دیاگرام چرخه مهندسی مدارک در گیت‌هاب: از شاخه چکنویس تا ریویژن و ابلاغ (IFC)"
            titleEn="Visual Flow: DCC Document Control Lifecycle via Git & GitHub"
            badgeFa="گردش کار تیمی"
            lang={lang}
          >
            <GitHubDccWorkflowDiagram lang={lang} />
          </DiagramWrapper>

          <DiagramWrapper
            titleFa="راهنمای تصویری صفحه گیت‌هاب: ۳ کلید حیاتی که هر مهندس در اولین ورود باید بداند"
            titleEn="Annotated GitHub Web UI: The 3 Essential Buttons Every Beginner Needs"
            badgeFa="راهنمای گام‌به‌گام"
            lang={lang}
          >
            <GitHubAnnotatedUiMockup lang={lang} />
          </DiagramWrapper>
        </div>
      ),
      takeaway:
        'همه مراحل ساخت مخزن، ویرایش فایل و ثبت ریویژن (Commit) با دکمه‌های گرافیکی وب در github.com انجام می‌شود.'
    },
    {
      id: 's1-4-hands-on',
      title: isFa ? 'کارگاه عملی ۲۰ دقیقه‌ای: ساخت اولین Repo و اولین Commit' : '20-Min Lab: First Repo & Commit',
      category: isFa ? '۴ گام عملی' : 'Hands-On Lab',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm">
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
            <div className="font-bold text-[var(--cpai-primary-strong)]">گام ۱: ساخت اکانت و کلیک روی New Repository</div>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              وارد <code dir="ltr" className="font-mono text-xs">github.com</code> شوید، ثبت‌نام کنید و از گوشه بالا سمت راست روی علامت <code dir="ltr" className="font-mono">+</code> و گزینه <strong className="text-[var(--cpai-text)]">New repository</strong> کلیک کنید.
            </p>
          </div>
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
            <div className="font-bold text-[var(--cpai-primary-strong)]">گام ۲: نام‌گذاری مخزن و تیک Add a README file</div>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              در کادر Repository name عبارت <code dir="ltr" className="font-mono text-xs">ai-engineering-hub</code> را بنویسید، حالت را روی <strong className="text-[var(--cpai-text)]">Private</strong> (یا Public) بگذارید، حتماً تیک <strong className="text-[var(--cpai-text)]">Add a README file</strong> را بزنید و دکمه <strong className="text-[var(--cpai-text)]">Create repository</strong> را بفشارید.
            </p>
          </div>
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
            <div className="font-bold text-[var(--cpai-primary-strong)]">گام ۳: ویرایش گرافیکی با آیکون مداد</div>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              در صفحه مخزن جدیدتان، روی آیکون مداد (Edit file) در گوشه بالای فایل <code dir="ltr" className="font-mono text-xs">README.md</code> کلیک کنید و متن قالب Markdown ماژول ۱-۳ را داخل آن Paste نمایید.
            </p>
          </div>
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
            <div className="font-bold text-[var(--cpai-primary-strong)]">گام ۴: ثبت اولین ریویژن رسمی (Commit Changes)</div>
            <p className="text-[var(--cpai-muted)] leading-relaxed">
              روی دکمه سبز <strong className="text-[var(--cpai-text)]">Commit changes...</strong> کلیک کنید، در کادر توضیح بنویسید <code dir="ltr" className="font-mono text-xs">docs: init engineering AI constitution rev.01</code> و تایید کنید.
            </p>
          </div>
        </div>
      ),
      takeaway:
        'همیشه پیام Commit را کوتاه و گویا بنویسید تا ماه‌ها بعد دقیقاً بدانید هر ریویژن چه تغییری ایجاد کرده است.'
    },
    {
      id: 's1-4-github-pages',
      title: isFa ? 'دیپلوی رایگان پروژه‌های استاتیک با GitHub Pages' : 'Free Static Deployment via GitHub Pages',
      category: isFa ? 'انتشار آنلاین' : 'GitHub Pages',
      subtitle: isFa
        ? 'انتشار رایگان وبسایت و داشبورد مهندسی روی دامنه اینترنتی رایگان بدون نیاز به هاست'
        : 'Publish HTML/CSS/JS dashboards directly from your repo',
      content: (
        <div className="space-y-4 text-sm">
          <p className="text-[var(--cpai-text)] leading-relaxed">
            برای دیپلوی کردن پروژه روی گیت‌هاب و دریافت لینک مستقیم (URL)، از سرویس رایگان{' '}
            <strong className="font-semibold">GitHub Pages</strong> استفاده می‌کنیم. اگر فایل{' '}
            <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] font-mono text-xs">
              index.html
            </code>{' '}
            مستقیماً در پوشه اصلی قرار دارد، این ۵ گام را انجام دهید:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                n: '۱',
                title: 'آپلود کدها در گیت‌هاب',
                body: 'یک ریپازیتوری با وضعیت Public بسازید و فایل‌ها را Push کنید (فایل index.html باید دقیقاً در ریشه پروژه باشد).'
              },
              {
                n: '۲',
                title: 'ورود به تنظیمات',
                body: 'در صفحه ریپازیتوری خود در گیت‌هاب، از نوار بالا روی تب Settings کلیک کنید.'
              },
              {
                n: '۳',
                title: 'بخش Pages',
                body: 'از منوی سمت چپ (در بخش Code and automation)، گزینه Pages را انتخاب کنید.'
              },
              {
                n: '۴',
                title: 'تنظیم برنچ',
                body: 'Source را روی Deploy from a branch بگذارید، برنچ را روی main و پوشه را روی /(root) تنظیم کرده و Save را بزنید.'
              },
              {
                n: '۵',
                title: 'دریافت URL زنده وبسایت',
                body: '۱ تا ۲ دقیقه صبر کنید و صفحه را رفرش کنید تا لینک زنده پروژه در بالای صفحه نمایش داده شود.'
              }
            ].map((st) => (
              <div
                key={st.n}
                className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-[var(--cpai-primary-strong)]">
                  <span className="w-5 h-5 rounded bg-[var(--cpai-primary-soft)] flex items-center justify-center text-xs tabular-nums">
                    {st.n}
                  </span>
                  <span>{st.title}</span>
                </div>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">{st.body}</p>
              </div>
            ))}
          </div>

          <div
            dir="ltr"
            className="p-3 rounded-[var(--cpai-radius)] bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] font-mono text-xs text-left"
          >
            https://&lt;username&gt;.github.io/&lt;repository-name&gt;/
          </div>
        </div>
      ),
      takeaway:
        'با GitHub Pages می‌توانید هر داشبورد تک‌فایل HTML ساخته‌شده با Claude Artifacts را در کمتر از ۲ دقیقه با لینک زنده در اختیار مدیران قرار دهید.'
    },
    {
      id: 's1-4-404-fix',
      title: isFa ? 'نکته حیاتی index.html و رفع خطای 404 در GitHub Pages' : 'index.html Rule & 404 Troubleshooting',
      category: isFa ? 'عیب‌یابی رایج' : 'Troubleshooting',
      content: (
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-warning-bg)] border border-[var(--cpai-warning-border)] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--cpai-warning-text)]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>نکته بسیار حیاتی: نام دقیق فایل ورودی باید index.html باشد</span>
            </div>
            <p className="text-[var(--cpai-text)] leading-relaxed text-xs sm:text-sm">
              گیت‌هاب برای بارگذاری خودکار صفحه در آدرس اصلی ریپازیتوری، منحصراً به فایلی با نام دقیق{' '}
              <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] font-mono font-bold">
                index.html
              </code>{' '}
              (با تمام حروف کوچک انگلیسی) نیاز دارد. اگر فایل با نام‌های دیگر یا فارسی ذخیره شده باشد، گیت‌هاب قادر به شناسایی آن به‌عنوان فایل ریشه نیست.
            </p>
          </div>

          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] space-y-3">
            <div className="flex items-center gap-2 font-bold text-[var(--cpai-error)]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>راهنمای رفع خطای رایج «404 File not found» در GitHub Pages</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1.5">
                <div className="font-bold text-[var(--cpai-text)]">۱. بررسی شاخه (Branch) و مسیر انتخابی</div>
                <ol className="list-decimal list-inside space-y-1 text-[var(--cpai-muted)] leading-relaxed">
                  <li>به <strong className="text-[var(--cpai-text)]">Settings → Pages</strong> بروید.</li>
                  <li>اگر از <code dir="ltr" className="font-mono">npm run deploy</code> استفاده کرده‌اید، Branch را روی <code dir="ltr" className="font-mono font-bold">gh-pages</code> و پوشه را روی <code dir="ltr" className="font-mono">/(root)</code> بگذارید.</li>
                  <li>اگر پروژه فایل‌های خام HTML/CSS است، Branch را روی <code dir="ltr" className="font-mono font-bold">main</code> و مسیر را <code dir="ltr" className="font-mono">/(root)</code> بگذارید و Save کنید.</li>
                </ol>
              </div>
              <div className="p-3.5 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1.5">
                <div className="font-bold text-[var(--cpai-text)]">۲. بررسی محل و حروف کوچک/بزرگ index.html</div>
                <ul className="list-disc list-inside space-y-1 text-[var(--cpai-muted)] leading-relaxed">
                  <li>نام فایل باید دقیقاً با حروف کوچک <code dir="ltr" className="font-mono font-bold">index.html</code> باشد (نه <code dir="ltr" className="font-mono line-through">Index.html</code> یا <code dir="ltr" className="font-mono line-through">main.html</code>).</li>
                  <li>فایل <code dir="ltr" className="font-mono font-bold">index.html</code> باید مستقیماً در ریشه (Root) همان شاخه انتخابی باشد، نه داخل یک پوشه فرعی.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      takeaway:
        '۹۵٪ خطاهای 404 در GitHub Pages با چک کردن دو مورد حل می‌شوند: نام دقیق index.html با حروف کوچک و قرار گرفتن آن در ریشه شاخه انتخابی.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session1-github-module"
      moduleCode={isFa ? 'ماژول ۱-۴' : 'Module 1-4'}
      moduleTitle={
        isFa
          ? 'گیت‌هاب (GitHub) از صفر مطلق به زبان دفتر فنی و کنترل مدارک (DCC)'
          : 'GitHub from Zero for Engineering Document Control (DCC)'
      }
      moduleSubtitle={
        isFa
          ? `۱.۵ ساعت · ${activeTrackMetaphor.githubFa} — بدون یک خط کدنویسی`
          : '1.5 hrs · Zero-code web UI workflow, commits, branches & GitHub Pages'
      }
      steps={steps}
    />
  );
};
