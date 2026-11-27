import React, { useMemo, useState } from 'react';
import { Language } from '../../types/cpmai';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  HardDrive,
  Mail,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import {
  FocusedLessonLayout,
  FocusedStepItem,
  FocusedViewTab
} from '../learning/FocusedLessonLayout';
import { FocusedLessonFooter } from '../learning/FocusedLessonFooter';
import { LessonTakeawayCallout } from '../learning/LessonTakeawayCallout';
import {
  formatStepNumber,
  getStepBoundaryState,
  markStepVisited
} from '../../utils/focusedLessonEngine';
import {
  ConnectorCategoryFilter,
  ConnectorMatrixRow,
  filterConnectorRows
} from '../../utils/session4Helpers';

interface ClaudeEnterpriseConnectorsProps {
  lang: Language;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

type ConnectorsViewId = 'lesson' | 'reference';

const NOTION_MCP_URL = 'https://mcp.notion.com/mcp';
const NOTION_CLI_CMD = 'claude mcp add --transport http notion https://mcp.notion.com/mcp';

interface ConnectorLessonStep {
  id: string;
  categoryFa: string;
  categoryEn: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  takeawayFa: string;
  takeawayEn: string;
}

const CONNECTOR_STEPS: ConnectorLessonStep[] = [
  {
    id: 'overview',
    categoryFa: 'دسترسی و فعال‌سازی',
    categoryEn: 'Access & Setup',
    titleFa: 'نمای کلی کانکتورهای گوگل و مسیر فعال‌سازی',
    titleEn: 'Google Workspace Connectors Overview & Setup',
    subtitleFa: 'اتصال مستقیم Claude و Claude Desktop به ایمیل، درایو و تقویم بدون کپی‌پیست دستی',
    subtitleEn: 'Connect Claude and Claude Desktop directly to email, drive, and calendar streams',
    takeawayFa:
      'هر سه کانکتور Gmail، Google Drive و Google Calendar در Claude و Claude Desktop در دسترس هستند و از بخش Customize > Connectors متصل یا قطع می‌شوند.',
    takeawayEn:
      'Gmail, Google Drive, and Google Calendar connectors are available across Claude and Claude Desktop and managed from Customize > Connectors.'
  },
  {
    id: 'gmail',
    categoryFa: 'گوگل ورکس‌پیس ۱',
    categoryEn: 'Google Workspace 1',
    titleFa: 'کانکتور Gmail: جست‌وجو، پیش‌نویس و ارسال با تأیید انسانی',
    titleEn: 'Gmail Connector: Search, Draft & Human-Approved Send',
    subtitleFa: 'مدیریت رشته‌پیام‌ها، برچسب‌ها و ارسال ایمیل با قفل تأیید پیش از ارسال واقعی',
    subtitleEn: 'Search threads, organize labels, and send emails with mandatory human approval',
    takeawayFa:
      'به صورت پیش‌فرض، پیش از هر ارسال واقعی ایمیل، Claude از شما تأیید صریح می‌گیرد تا هیچ مکاتبه سازمانی ناخواسته ارسال نشود.',
    takeawayEn:
      'By default, human-in-the-loop confirmation is enforced before any live email is sent.'
  },
  {
    id: 'drive',
    categoryFa: 'گوگل ورکس‌پیس ۲',
    categoryEn: 'Google Workspace 2',
    titleFa: 'کانکتور Google Drive: خوانش زنده Docs، Sheets و Slides',
    titleEn: 'Google Drive Connector: Live Docs, Sheets & Slides',
    subtitleFa: 'استخراج متن مستقیم از اسناد و تحلیل جداول Sheets در قالب CSV',
    subtitleEn: 'Extract raw document text and parse large Sheets tables as structured CSV',
    takeawayFa:
      'جداول Google Sheets به صورت CSV سریع و دقیق پردازش می‌شوند، اما به یاد داشته باشید تصاویر داخل اسناد توسط این کانکتور خوانده نمی‌شوند.',
    takeawayEn:
      'Sheets are parsed cleanly as structured CSV for fast analysis, while embedded images inside documents are bypassed.'
  },
  {
    id: 'calendar',
    categoryFa: 'گوگل ورکس‌پیس ۳',
    categoryEn: 'Google Workspace 3',
    titleFa: 'کانکتور Google Calendar: درک تعهدات و جلوگیری از تداخل',
    titleEn: 'Google Calendar Connector: Commitments & Clash Prevention',
    subtitleFa: 'اتصال تقویم کاری برای زمان‌بندی هوشمند جلسات و مدیریت برنامه‌های پروژه',
    subtitleEn: 'Connect your calendar so Claude understands commitments and flags scheduling clashes',
    takeawayFa:
      'از مسیر Settings > Connectors > Google Calendar با یک کلیک تقویم را متصل کنید تا Claude تداخل‌های زمانی جلسات پروژه را پیش از وقوع تشخیص دهد.',
    takeawayEn:
      'Connect via Settings > Connectors > Google Calendar so Claude can detect project scheduling conflicts ahead of time.'
  },
  {
    id: 'slack',
    categoryFa: 'همکاری تیمی',
    categoryEn: 'Team Collaboration',
    titleFa: 'کانکتور سازمانی Slack: جست‌وجو در کانال‌ها و پیام‌ها',
    titleEn: 'Slack Enterprise Connector: Channels, DMs & Files',
    subtitleFa: 'سه روش رسمی استفاده از Claude در ورک‌اسپیس Slack برای خلاصه‌سازی و بازیابی زمینه',
    subtitleEn: 'Three official ways to combine Claude with Slack workspaces for executive catch-ups',
    takeawayFa:
      'به ازای هر حساب Claude تنها یک ورک‌اسپیس Slack متصل می‌شود و در پلن‌های Pro، Max، Team و Enterprise قابل فعال‌سازی است.',
    takeawayEn:
      'Each Claude account connects to one Slack workspace and is supported on Pro, Max, Team, and Enterprise plans.'
  },
  {
    id: 'notion_context',
    categoryFa: 'Notion MCP و کانتکست',
    categoryEn: 'Notion MCP & Context',
    titleFa: 'کانکتور رسمی Notion MCP و قانون مدیریت پنجره کانتکست',
    titleEn: 'Official Hosted Notion MCP & Context Window Discipline',
    subtitleFa: 'اتصال با احراز هویت امن OAuth در وب، دسکتاپ و Claude Code CLI + جلوگیری از اشغال بی‌مورد حافظه',
    subtitleEn: 'OAuth-secured hosted MCP setup across Web, Desktop, and CLI plus context budget rules',
    takeawayFa:
      'همه‌ی کانکتورها را همیشه روشن نگذارید؛ هر کانکتور فعال پیش از شروع گفت‌وگو بخشی از Context Window را با Schema توابع اشغال می‌کند.',
    takeawayEn:
      'Never leave every connector enabled simultaneously—each active connector spends context window tokens on tool schemas before your first prompt.'
  }
];

const CONNECTOR_MATRIX_ROWS: ConnectorMatrixRow[] = [
  {
    id: 'gmail',
    category: 'google',
    nameFa: 'Gmail',
    nameEn: 'Gmail',
    scopeFa: 'جست‌وجو، خواندن، پیش‌نویس، ارسال، پاسخ، فوروارد و مرتب‌سازی برچسب‌ها و Threadها',
    scopeEn: 'Search, read, draft, send, reply, forward, and organize labels/threads',
    planOrPathFa: 'Claude و Claude Desktop · Settings > Connectors',
    planOrPathEn: 'Claude & Claude Desktop · Settings > Connectors',
    guardrailFa: 'تأیید انسانی پیش از ارسال واقعی الزامی است (ارسال مستقیم از ۱۸ آگوست ۲۰۲۶)',
    guardrailEn: 'Human approval required before sending (Direct Send since Aug 2026)',
    docsUrl: 'https://claude.com/docs/connectors/google/gmail',
    docsLabelFa: 'مستندات Gmail',
    docsLabelEn: 'Gmail Docs'
  },
  {
    id: 'drive',
    category: 'google',
    nameFa: 'Google Drive',
    nameEn: 'Google Drive',
    scopeFa: 'خواندن و ویرایش زنده Docs، استخراج Sheets به صورت CSV و Slides به صورت متن ساده',
    scopeEn: 'Read/edit Docs, parse Sheets as CSV, and read Slides as plain text',
    planOrPathFa: 'Claude و Claude Desktop · Settings > Connectors',
    planOrPathEn: 'Claude & Claude Desktop · Settings > Connectors',
    guardrailFa: 'تصاویر داخل اسناد پردازش نمی‌شوند',
    guardrailEn: 'Embedded images inside documents are bypassed',
    docsUrl: 'https://claude.com/docs/connectors/google/drive',
    docsLabelFa: 'مستندات Drive',
    docsLabelEn: 'Drive Docs'
  },
  {
    id: 'calendar',
    category: 'google',
    nameFa: 'Google Calendar',
    nameEn: 'Google Calendar',
    scopeFa: 'درک تعهدات تقویمی، مدیریت جلسات و پیشگیری از تداخل زمانی پروژه',
    scopeEn: 'Understand calendar commitments, optimize agendas, detect clashes',
    planOrPathFa: 'Settings > Connectors > Google Calendar > Connect',
    planOrPathEn: 'Settings > Connectors > Google Calendar > Connect',
    guardrailFa: 'فقط به داده‌های همان حساب گوگل متصل‌شده دسترسی دارد',
    guardrailEn: 'Scoped strictly to the explicitly connected Google account',
    docsUrl: 'https://claude.com/docs/connectors/google/calendar',
    docsLabelFa: 'مستندات Calendar',
    docsLabelEn: 'Calendar Docs'
  },
  {
    id: 'slack',
    category: 'team',
    nameFa: 'Slack',
    nameEn: 'Slack',
    scopeFa: 'جست‌وجو در کانال‌ها، پیام‌های مستقیم و فایل‌ها (Claude Tag، Slack App، Connector)',
    scopeEn: 'Search channels, DMs, and files (Claude Tag, Slack App, Connector)',
    planOrPathFa: 'Pro، Max، Team و Enterprise · Org / Customize > Connectors',
    planOrPathEn: 'Pro, Max, Team & Enterprise · Org / Customize > Connectors',
    guardrailFa: 'حداکثر یک ورک‌اسپیس Slack به ازای هر حساب Claude',
    guardrailEn: 'Maximum 1 Slack workspace per Claude account',
    docsUrl: 'https://claude.com/docs/connectors/slack',
    docsLabelFa: 'مستندات Slack',
    docsLabelEn: 'Slack Docs'
  },
  {
    id: 'notion',
    category: 'team',
    nameFa: 'Notion MCP (Hosted)',
    nameEn: 'Notion MCP (Hosted)',
    scopeFa: 'جست‌وجو، خواندن، ایجاد و ویرایش مستندات فنی و PRD با احراز هویت OAuth',
    scopeEn: 'OAuth-secured search, read, create, and update of specs & PRDs',
    planOrPathFa: 'Add custom connector یا دستور CLI در Claude Code',
    planOrPathEn: 'Add custom connector or Claude Code CLI command',
    guardrailFa: 'پس از افزودن در Claude Desktop، برنامه را کامل ببندید و دوباره باز کنید',
    guardrailEn: 'Fully restart Claude Desktop after adding for registration to take effect',
    docsUrl: 'https://developers.notion.com/docs/mcp',
    docsLabelFa: 'مستندات Notion MCP',
    docsLabelEn: 'Notion MCP Docs'
  }
];

export const ClaudeEnterpriseConnectors: React.FC<ClaudeEnterpriseConnectorsProps> = ({
  lang,
  copyToClipboard,
  copiedId
}) => {
  const isFa = lang === 'fa';
  const [activeView, setActiveView] = useState<ConnectorsViewId>('lesson');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(() => new Set([0]));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<ConnectorCategoryFilter>('all');

  const steps: FocusedStepItem[] = useMemo(
    () =>
      CONNECTOR_STEPS.map((s) => ({
        id: s.id,
        title: isFa ? s.titleFa : s.titleEn,
        category: isFa ? s.categoryFa : s.categoryEn
      })),
    [isFa]
  );

  const views: FocusedViewTab[] = useMemo(
    () => [
      { id: 'lesson', label: isFa ? 'مطالعه درس' : 'Lesson' },
      { id: 'reference', label: isFa ? 'مقایسه و حریم خصوصی' : 'Matrix & Privacy' }
    ],
    [isFa]
  );

  const handleSelectStep = (idx: number) => {
    const safeIdx = Math.max(0, Math.min(CONNECTOR_STEPS.length - 1, idx));
    setActiveStepIndex(safeIdx);
    setVisitedSteps((prev) => markStepVisited(prev, safeIdx));
  };

  const boundary = getStepBoundaryState(activeStepIndex, CONNECTOR_STEPS.length);
  const currentStep = CONNECTOR_STEPS[boundary.currentIndex];
  const filteredMatrixRows = useMemo(
    () => filterConnectorRows(CONNECTOR_MATRIX_ROWS, categoryFilter),
    [categoryFilter]
  );

  return (
    <FocusedLessonLayout
      lang={lang}
      moduleCode={isFa ? 'ماژول ۴-۲' : 'Module 4-2'}
      moduleTitle={
        isFa
          ? 'کانکتورهای گوگل و ابزارهای سازمانی'
          : 'Google Workspace & Enterprise Connectors'
      }
      moduleSubtitle="Gmail · Drive · Calendar · Slack · Notion MCP"
      steps={steps}
      activeStepIndex={boundary.currentIndex}
      visitedStepIndices={visitedSteps}
      onSelectStep={handleSelectStep}
      views={views}
      activeViewId={activeView}
      onSelectView={(id) => setActiveView(id as ConnectorsViewId)}
      isStepListVisible={activeView === 'lesson'}
      isMobileDrawerOpen={isMobileDrawerOpen}
      onToggleMobileDrawer={setIsMobileDrawerOpen}
    >
      {activeView === 'lesson' ? (
        <article className="space-y-6">
          {/* Calm Step Header */}
          <header className="space-y-2 pb-5 border-b border-[var(--cpai-border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
              <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                {isFa
                  ? `گام ${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(CONNECTOR_STEPS.length, 'fa')}`
                  : `Step ${boundary.stepNumber} of ${CONNECTOR_STEPS.length}`}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isFa ? currentStep.categoryFa : currentStep.categoryEn}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--cpai-text)] leading-snug">
              {isFa ? currentStep.titleFa : currentStep.titleEn}
            </h3>

            <p className="text-sm sm:text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
              {isFa ? currentStep.subtitleFa : currentStep.subtitleEn}
            </p>
          </header>

          {/* Step Body */}
          <div className="space-y-6 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
            {currentStep.id === 'overview' && (
              <>
                <p>
                  {isFa
                    ? 'با کانکتورهای رسمی، هوش مصنوعی بدون نیاز به کپی‌پیست دستی به جریان داده‌های زنده ایمیل، اسناد ابری، تقویم کاری و هاب‌های تیمی متصل می‌شود و هم‌زمان تعهدات حریم خصوصی سازمانی را حفظ می‌کند.'
                    : 'Official connectors link Claude directly to live workspace streams across email, cloud drives, schedules, and team hubs while preserving enterprise privacy guarantees.'}
                </p>

                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-5 space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--cpai-text)]">
                    {isFa ? 'دسترس‌پذیری کانکتورهای سه‌گانه گوگل' : 'Google Workspace Connectors Availability'}
                  </h4>
                  <p className="text-[15px] text-[var(--cpai-muted)] leading-relaxed">
                    {isFa
                      ? 'هر سه کانکتور Gmail، Google Drive و Google Calendar برای همه کاربران Claude و اپلیکیشن Claude Desktop در دسترس هستند. اگر دکمه Connect را در تنظیمات ندیدید، پلن اکانت خود را بررسی کنید.'
                      : 'All three connectors (Gmail, Drive, Calendar) are available in Claude and Claude Desktop. Check your subscription plan if the Connect button is missing.'}
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <a
                      href="https://claude.ai/customize/connectors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors"
                    >
                      <span>{isFa ? 'مدیریت کانکتورها در Claude.ai' : 'Manage Connectors in Claude.ai'}</span>
                      <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0" />
                    </a>
                    <a
                      href="https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                    >
                      <span>{isFa ? 'راهنمای جامع هر ۳ کانکتور گوگل' : 'Google Connectors Guide'}</span>
                      <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-muted)]" />
                    </a>
                    <a
                      href="https://claude.ai/directory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                    >
                      <span>{isFa ? 'دایرکتوری کامل کانکتورها' : 'All Connectors Directory'}</span>
                      <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-muted)]" />
                    </a>
                  </div>
                </div>
              </>
            )}

            {currentStep.id === 'gmail' && (
              <>
                <div className="flex items-center gap-3 text-sm text-[var(--cpai-muted)]">
                  <Mail aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0" />
                  <span>{isFa ? 'Google Workspace · عملیات زنده با تأیید انسانی' : 'Google Workspace · Live Action with Human Safeguard'}</span>
                </div>

                <p>
                  {isFa
                    ? 'امکان جست‌وجو و خواندن ایمیل‌ها، ایجاد پیش‌نویس، ارسال ایمیل، پاسخ، فوروارد و مرتب‌سازی برچسب‌ها و رشته‌ها (Thread). به صورت پیش‌فرض برای ارسال ایمیل، تأیید انسانی الزامی است.'
                    : 'Search and read emails, draft, send, reply, forward, and organize labels and threads. Human confirmation is enforced by default prior to sending.'}
                </p>

                <ul className="space-y-2.5 text-[15.5px] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0 mt-1" />
                    <span>
                      {isFa
                        ? 'قابلیت ارسال ایمیل مستقیم (از ۱۸ آگوست ۲۰۲۶) در کنار مدیریت پیش‌نویس‌ها و رشته‌پیام‌ها.'
                        : 'Direct Send capability (since Aug 18, 2026) alongside draft and thread management.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0 mt-1" />
                    <span>
                      {isFa
                        ? 'نیازمند تأیید صریح شما قبل از هر ارسال واقعی (Human-in-the-Loop Safeguard).'
                        : 'Explicit user confirmation required before any real email is dispatched.'}
                    </span>
                  </li>
                </ul>

                <div>
                  <a
                    href="https://claude.com/docs/connectors/google/gmail"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-semibold text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'مستندات رسمی Gmail' : 'Official Gmail Docs'}</span>
                    <ExternalLink aria-hidden="true" className="w-4 h-4" />
                  </a>
                </div>
              </>
            )}

            {currentStep.id === 'drive' && (
              <>
                <div className="flex items-center gap-3 text-sm text-[var(--cpai-muted)]">
                  <HardDrive aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0" />
                  <span>{isFa ? 'Google Workspace · استخراج متن Docs، Sheets و Slides' : 'Google Workspace · Docs, Sheets & Slides Extraction'}</span>
                </div>

                <p>
                  {isFa
                    ? 'برای ویرایش و خواندن زنده فایل‌های Docs، Sheets و Slides در کنار Drive. کلود متن فایل‌ها را استخراج می‌کند؛ Sheets به صورت خروجی CSV و Slides به صورت متن ساده خوانده می‌شود.'
                    : 'Access and edit Docs, Sheets, and Slides in Drive. Claude extracts raw text; Sheets is parsed as structured CSV and Slides as plain text.'}
                </p>

                <ul className="space-y-2.5 text-[15.5px] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0 mt-1" />
                    <span>
                      {isFa
                        ? 'تحلیل سریع داده‌های جدولی بزرگ در Google Sheets به شکل ساختاریافته CSV.'
                        : 'High-speed tabular parsing for large Google Sheets via structured CSV.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle aria-hidden="true" className="w-5 h-5 text-[var(--cpai-warning-text)] shrink-0 mt-1" />
                    <span>
                      {isFa
                        ? 'محدودیت مهم: تصاویر داخل اسناد (Docs یا Slides) توسط این کانکتور پردازش نمی‌شوند.'
                        : 'Important limitation: Embedded images inside documents are bypassed by this connector.'}
                    </span>
                  </li>
                </ul>

                <div>
                  <a
                    href="https://claude.com/docs/connectors/google/drive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-semibold text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'مستندات رسمی Google Drive' : 'Official Drive Docs'}</span>
                    <ExternalLink aria-hidden="true" className="w-4 h-4" />
                  </a>
                </div>
              </>
            )}

            {currentStep.id === 'calendar' && (
              <>
                <div className="flex items-center gap-3 text-sm text-[var(--cpai-muted)]">
                  <Calendar aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0" />
                  <span>{isFa ? 'Google Workspace · مدیریت هوشمند جلسات و تقویم' : 'Google Workspace · Smart Agenda & Schedule'}</span>
                </div>

                <p>
                  {isFa
                    ? 'به Claude کمک می‌کند تعهدات تقویمی شما را بفهمد و جلسات و برنامه‌های کاری را بهینه مدیریت کند. اتصال از مسیر Settings > Connectors با کلیک روی Connect انجام می‌شود.'
                    : 'Enables Claude to comprehend your scheduled commitments and optimize meetings. Connect via Settings > Connectors > Connect.'}
                </p>

                <ul className="space-y-2.5 text-[15.5px] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0 mt-1" />
                    <span>
                      {isFa ? 'مسیر فعال‌سازی: ' : 'Activation path: '}
                      <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-sm font-mono">
                        Settings &gt; Connectors &gt; Google Calendar
                      </code>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0 mt-1" />
                    <span>
                      {isFa
                        ? 'پیشگیری از تداخل زمانی جلسات پروژه و پیشنهاد بازه‌های آزاد واقعی.'
                        : 'Automatic project clash detection and real availability lookup.'}
                    </span>
                  </li>
                </ul>

                <div>
                  <a
                    href="https://claude.com/docs/connectors/google/calendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-semibold text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'مستندات رسمی Google Calendar' : 'Official Calendar Docs'}</span>
                    <ExternalLink aria-hidden="true" className="w-4 h-4" />
                  </a>
                </div>
              </>
            )}

            {currentStep.id === 'slack' && (
              <>
                <p>
                  {isFa
                    ? 'جست‌وجو در کانال‌ها، پیام‌های مستقیم و فایل‌های ورک‌اسپیس Slack برای یافتن زمینه و خلاصه کردن مباحث. برای مثال: «خلاصه‌ی اتفاقات کانال #general امروز را بگو».'
                    : 'Search channels, DMs, and files across your Slack workspace for contextual recall and executive catch-ups.'}
                </p>

                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-5 space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--cpai-text)]">
                    {isFa ? 'سه روش رسمی استفاده از Claude در Slack' : '3 Official Ways to Use Claude with Slack'}
                  </h4>
                  <ul className="space-y-2 text-[15px] leading-relaxed">
                    <li>
                      <strong className="font-semibold text-[var(--cpai-text)]">Claude Tag: </strong>
                      <span className="text-[var(--cpai-muted)]">
                        {isFa ? 'عضو مشترک در کانال‌های اسلک برای پاسخ‌گویی به تیم' : 'Tag as a teammate directly inside shared channels'}
                      </span>
                    </li>
                    <li>
                      <strong className="font-semibold text-[var(--cpai-text)]">Claude in Slack App: </strong>
                      <span className="text-[var(--cpai-muted)]">
                        {isFa ? 'دستیار شخصی در پیام خصوصی (1-on-1 DM)' : 'Personal 1-on-1 direct message assistant inside Slack'}
                      </span>
                    </li>
                    <li>
                      <strong className="font-semibold text-[var(--cpai-text)]">Slack Connector: </strong>
                      <span className="text-[var(--cpai-muted)]">
                        {isFa ? 'ورود داده‌های اسلک به چت کلود یا Cowork برای تحلیل جامع' : 'Bring Slack knowledge directly into Claude chat or Cowork'}
                      </span>
                    </li>
                  </ul>
                </div>

                <ul className="space-y-2 text-[15px] text-[var(--cpai-muted)] leading-relaxed">
                  <li>
                    • <strong className="text-[var(--cpai-text)]">{isFa ? 'پلن‌های پشتیبانی‌شده: ' : 'Plans: '}</strong>
                    {isFa ? 'برای Team، Enterprise و همچنین مشترکین Pro و Max فعال است.' : 'Supported on Team, Enterprise, and Pro/Max.'}
                  </li>
                  <li>
                    • <strong className="text-[var(--cpai-text)]">{isFa ? 'محدودیت اتصال: ' : 'Limit: '}</strong>
                    {isFa ? 'به ازای هر حساب Claude تنها یک ورک‌اسپیس Slack متصل می‌شود.' : 'Supports 1 Slack workspace per Claude account.'}
                  </li>
                  <li>
                    • <strong className="text-[var(--cpai-text)]">{isFa ? 'مسیر فعال‌سازی: ' : 'Path: '}</strong>
                    <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-xs font-mono text-[var(--cpai-text)]">
                      Organization settings &gt; Connectors
                    </code>{' '}
                    {isFa ? 'یا' : 'or'}{' '}
                    <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-xs font-mono text-[var(--cpai-text)]">
                      Customize &gt; Connectors
                    </code>
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://claude.com/docs/connectors/slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-medium text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'مستندات Slack' : 'Slack Docs'}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://claude.com/claude-in-slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'معرفی اپلیکیشن' : 'App Page'}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-muted)]" />
                  </a>
                  <a
                    href="https://claude.com/blog/claude-and-slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'بلاگ آنتروپیک' : 'Anthropic Blog'}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-muted)]" />
                  </a>
                </div>
              </>
            )}

            {currentStep.id === 'notion_context' && (
              <>
                <p>
                  {isFa
                    ? 'نوشن دارای سرور MCP رسمی و میزبانی‌شده (Official Hosted MCP) است که با احراز هویت امن OAuth، امکان جست‌وجو، خواندن، ایجاد و ویرایش مستندات فنی و PRD پروژه‌ها را مستقیماً به Claude می‌دهد.'
                    : 'Notion provides an official hosted MCP server with OAuth authentication to search, read, write, and update technical docs and PRDs directly from Claude.'}
                </p>

                {/* Copyable Hosted URL */}
                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--cpai-muted)]">
                      {isFa ? 'آدرس سرور رسمی MCP نوشن (وب و دسکتاپ)' : 'Official Hosted MCP Server URL'}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(NOTION_MCP_URL, 'notion_mcp_url')}
                      data-testid="copy-notion-url-btn"
                      className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                    >
                      {copiedId === 'notion_mcp_url' ? (
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-success-text)]" />
                      ) : (
                        <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedId === 'notion_mcp_url'
                          ? isFa
                            ? 'کپی شد'
                            : 'Copied'
                          : isFa
                          ? 'کپی آدرس'
                          : 'Copy URL'}
                      </span>
                    </button>
                  </div>
                  <div
                    dir="ltr"
                    className="px-3 py-2.5 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] font-mono text-sm text-[var(--cpai-primary-strong)] overflow-x-auto select-all"
                  >
                    {NOTION_MCP_URL}
                  </div>
                </div>

                {/* Copyable Claude Code CLI Command */}
                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--cpai-muted)] inline-flex items-center gap-1.5">
                      <Terminal aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>
                        {isFa
                          ? 'دستور نصب تک‌خطی در Claude Code (CLI)'
                          : 'One-line command for Claude Code (CLI)'}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(NOTION_CLI_CMD, 'notion_cli_cmd')}
                      data-testid="copy-notion-cli-btn"
                      className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                    >
                      {copiedId === 'notion_cli_cmd' ? (
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-success-text)]" />
                      ) : (
                        <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedId === 'notion_cli_cmd'
                          ? isFa
                            ? 'کپی شد'
                            : 'Copied'
                          : isFa
                          ? 'کپی دستور'
                          : 'Copy CLI'}
                      </span>
                    </button>
                  </div>
                  <pre
                    dir="ltr"
                    className="px-3.5 py-2.5 rounded-lg bg-[#0F171A] text-[#E6EDF0] font-mono text-xs sm:text-[13px] overflow-x-auto select-all"
                  >
                    {NOTION_CLI_CMD}
                  </pre>
                </div>

                <ul className="space-y-2 text-[15px] text-[var(--cpai-muted)] leading-relaxed">
                  <li>
                    • {isFa ? 'در وب/دسکتاپ: از مسیر ' : 'In Web/Desktop: '}
                    <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-xs font-mono text-[var(--cpai-text)]">
                      Settings &gt; Connectors &gt; Add custom connector
                    </code>{' '}
                    {isFa ? 'آدرس بالا را وارد کنید.' : 'paste the server URL above.'}
                  </li>
                  <li>
                    •{' '}
                    {isFa
                      ? 'نکته کلیدی: بعد از افزودن کانکتور در نسخه دسکتاپ، برنامه Claude Desktop را کامل ببندید و دوباره باز کنید.'
                      : 'Tip: Fully quit and relaunch Claude Desktop after adding so registration takes effect.'}
                  </li>
                </ul>

                {/* Context Consumption Engineering Rule */}
                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-warning-bg)] border border-[var(--cpai-warning-border)] p-4 sm:p-5 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--cpai-warning-text)]">
                    <AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
                    <span>
                      {isFa
                        ? 'توصیه مهندسی مدیریت کانتکست (Context Consumption)'
                        : 'Context Window Consumption Best Practice'}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-[var(--cpai-text)]">
                    {isFa
                      ? 'همه‌ی کانکتورها را همیشه روشن نگذارید! هر کانکتور فعال، پیش از آن‌که پیامی تایپ کنید، بخشی از پنجره زمینه (Context Window) را برای تعاریف توابع و Schema اشغال می‌کند. فقط کانکتورهایی را که برای وظیفه فعلی نیاز دارید در همان گفت‌وگو فعال کنید تا حداکثر ظرفیت حافظه مدل برای تحلیل‌های سنگین مهندسی حفظ شود.'
                      : 'Do not keep all connectors enabled simultaneously. Each active connector consumes context window tokens for function schemas before you even type. Enable only what is strictly required for the active session.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://developers.notion.com/docs/mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-medium text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'مستندات Notion MCP' : 'Notion MCP Docs'}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://developers.notion.com/guides/mcp/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    <span>{isFa ? 'راهنمای پروتکل MCP نوشن' : 'Notion MCP Overview'}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-muted)]" />
                  </a>
                </div>
              </>
            )}
          </div>

          <LessonTakeawayCallout
            lang={lang}
            text={isFa ? currentStep.takeawayFa : currentStep.takeawayEn}
          />

          <FocusedLessonFooter
            lang={lang}
            boundary={boundary}
            onPrev={() => handleSelectStep(boundary.currentIndex - 1)}
            onNext={() => handleSelectStep(boundary.currentIndex + 1)}
            secondaryAction={{
              label: isFa ? 'مقایسه و حریم خصوصی' : 'Matrix & Privacy',
              onClick: () => setActiveView('reference')
            }}
            finalStepCta={{
              label: isFa ? 'مشاهده جدول مقایسه و حریم خصوصی' : 'View Matrix & Privacy',
              onClick: () => setActiveView('reference')
            }}
          />
        </article>
      ) : (
        <div className="space-y-8" data-testid="connectors-reference-panel">
          {/* Header + Clean Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--cpai-text)]">
                {isFa ? 'ماتریس مقایسه کانکتورها و حریم خصوصی' : 'Connectors Comparison Matrix & Privacy'}
              </h3>
              <p className="text-sm text-[var(--cpai-muted)]">
                {isFa
                  ? 'مرور سریع دامنه دسترسی، پلن موردنیاز، محدودیت کلیدی و مستندات رسمی هر کانکتور'
                  : 'Quick reference for scope, activation path, limitations, and official documentation'}
              </p>
            </div>

            <div
              role="group"
              aria-label={isFa ? 'فیلتر دسته کانکتورها' : 'Filter connector category'}
              className="inline-flex items-center gap-1 p-1 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] self-start sm:self-auto"
            >
              {(
                [
                  { id: 'all', fa: 'همه (۵)', en: 'All (5)' },
                  { id: 'google', fa: 'گوگل (۳)', en: 'Google (3)' },
                  { id: 'team', fa: 'Slack & Notion (۲)', en: 'Team (2)' }
                ] as const
              ).map((item) => {
                const active = categoryFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategoryFilter(item.id)}
                    aria-pressed={active}
                    data-testid={`connector-filter-${item.id}`}
                    className={`min-h-[36px] px-3 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] font-semibold border border-[var(--cpai-border)]'
                        : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
                    }`}
                  >
                    {isFa ? item.fa : item.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-[var(--cpai-radius)] border border-[var(--cpai-border)]">
            <table className="w-full text-start border-collapse text-sm" data-testid="connectors-comparison-table">
              <thead>
                <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] text-xs font-semibold text-[var(--cpai-muted)]">
                  <th className="py-3 px-4 text-start whitespace-nowrap">{isFa ? 'کانکتور' : 'Connector'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'کاربرد و دامنه دسترسی' : 'Scope & Capabilities'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'پلن / مسیر اتصال' : 'Plan / Setup'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'نکته یا محدودیت کلیدی' : 'Key Rule / Limit'}</th>
                  <th className="py-3 px-4 text-start whitespace-nowrap">{isFa ? 'مستندات' : 'Docs'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--cpai-border)]">
                {filteredMatrixRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[var(--cpai-surface-subtle)]/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[var(--cpai-text)] whitespace-nowrap align-top">
                      {isFa ? row.nameFa : row.nameEn}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--cpai-text)] leading-relaxed align-top">
                      {isFa ? row.scopeFa : row.scopeEn}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--cpai-muted)] leading-relaxed align-top">
                      {isFa ? row.planOrPathFa : row.planOrPathEn}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--cpai-muted)] leading-relaxed align-top">
                      {isFa ? row.guardrailFa : row.guardrailEn}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap align-top">
                      <a
                        href={row.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline"
                      >
                        <span>{isFa ? row.docsLabelFa : row.docsLabelEn}</span>
                        <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Privacy & Governance Guarantees */}
          <section
            aria-label={isFa ? 'تعهدات حریم خصوصی و امنیت داده‌های متصل' : 'Privacy & Security Guarantees'}
            className="rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] p-5 space-y-3"
          >
            <h4 className="text-sm font-semibold text-[var(--cpai-success-text)] flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="w-4 h-4 shrink-0" />
              <span>
                {isFa ? 'تعهدات حریم خصوصی و امنیت داده‌های متصل' : 'Privacy & Security Guarantees'}
              </span>
            </h4>
            <ul className="space-y-2 text-[14.5px] leading-relaxed text-[var(--cpai-text)] list-disc list-inside">
              <li>
                {isFa
                  ? 'Claude فقط به داده‌های همان حساب گوگلی که صراحتاً متصل کرده‌اید دسترسی دارد.'
                  : 'Claude only reads data from the explicitly connected Google account.'}
              </li>
              <li>
                {isFa
                  ? 'طبق اعلام رسمی Anthropic، مدل‌ها هرگز روی داده‌های کانکتورهای Gmail، Drive و Calendar شما آموزش داده نمی‌شوند.'
                  : 'Anthropic confirms models are never trained on your Gmail, Drive, or Calendar data.'}
              </li>
              <li>
                {isFa
                  ? 'در پلن‌های Team و Enterprise، مالک سازمان (Owner) باید ابتدا کانکتور را در سطح سازمان فعال نماید.'
                  : 'In Team & Enterprise tiers, workspace owners must enable connectors organization-wide first.'}
              </li>
            </ul>
          </section>

          {/* Official Management Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] hover:border-[var(--cpai-primary)] flex items-center justify-between gap-2 text-sm font-medium text-[var(--cpai-text)] transition-colors"
            >
              <span>{isFa ? 'راهنمای جامع گوگل' : 'Google Connectors Guide'}</span>
              <ExternalLink aria-hidden="true" className="w-4 h-4 text-[var(--cpai-muted)] shrink-0" />
            </a>
            <a
              href="https://claude.ai/directory"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] hover:border-[var(--cpai-primary)] flex items-center justify-between gap-2 text-sm font-medium text-[var(--cpai-text)] transition-colors"
            >
              <span>{isFa ? 'دایرکتوری کامل کانکتورها' : 'All Connectors Directory'}</span>
              <ExternalLink aria-hidden="true" className="w-4 h-4 text-[var(--cpai-muted)] shrink-0" />
            </a>
            <a
              href="https://claude.ai/customize/connectors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] hover:border-[var(--cpai-primary)] flex items-center justify-between gap-2 text-sm font-medium text-[var(--cpai-text)] transition-colors"
            >
              <span>{isFa ? 'مدیریت و قطع اتصال' : 'Manage & Disconnect'}</span>
              <ExternalLink aria-hidden="true" className="w-4 h-4 text-[var(--cpai-muted)] shrink-0" />
            </a>
          </div>

          <div className="pt-4 border-t border-[var(--cpai-border)] flex justify-end">
            <button
              type="button"
              onClick={() => setActiveView('lesson')}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
            >
              {isFa ? 'بازگشت به مطالعه گام‌به‌گام' : 'Back to step-by-step lesson'}
            </button>
          </div>
        </div>
      )}
    </FocusedLessonLayout>
  );
};
