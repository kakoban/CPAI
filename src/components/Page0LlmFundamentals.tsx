import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Zap,
  ShieldAlert,
  FileText,
  Layers,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Code,
  FolderKanban,
  CheckCircle2,
  Info,
  Lightbulb,
  Play,
  RotateCcw,
  Bot,
  Scale,
  Building2,
  Factory,
  Train,
  FileSpreadsheet,
  ListChecks,
  BookCheck,
  AlertCircle,
  Download,
  Table,
  Database,
  Eye,
  ScrollText,
  BookmarkCheck,
  FileCheck2,
  Shield,
  Target
} from 'lucide-react';
import { ENGINEERING_DATASETS } from '../data/engineering_sample_datasets';
import { ENGINEERING_CONTRACTS } from '../data/engineering_sample_contracts';
import { Page0EngineeringMasterclass } from './Page0EngineeringMasterclass';
import { NotebookLmWorkshop } from './NotebookLmWorkshop';
import { ClaudeEnterpriseConnectors } from './connectors/ClaudeEnterpriseConnectors';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../data/logo';
import { IndustryTrackId, DisciplineId } from '../types/industryTrack';
import {
  getDisciplineMetadata,
  getDisciplinePromptShowcase
} from '../data/disciplineExamplesRegistry';

interface Page0Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage1: () => void;
  onOpenQuiz?: () => void;
  industryTrack?: IndustryTrackId;
  disciplineId?: DisciplineId;
}

interface PromptItem {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  promptFa: string;
  promptEn: string;
  targetTools: string[];
}

export const Page0LlmFundamentals: React.FC<Page0Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage1,
  onOpenQuiz,
  industryTrack = 'CIVIL_INFRA',
  disciplineId
}) => {
  const effectiveDiscipline: DisciplineId =
    disciplineId ||
    (industryTrack === 'ENERGY_PETRO' ? 'petro_process_safety' : 'civil_tbm_tunnel');

  const discMeta = getDisciplineMetadata(effectiveDiscipline);
  const disciplinePromptPair = getDisciplinePromptShowcase(effectiveDiscipline);
  const [activeTab, setActiveTab] = useState<
    | 'all'
    | 'tools'
    | 'prompting'
    | 'prompts_library'
    | 'advanced_features'
    | 'engineering_dashboards'
    | 'contracts_and_gems'
    | 'connectors'
    | 'notebooklm'
    | 'masterclass'
    | 'safety'
    | 'sandbox'
  >('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sandboxCopied, setSandboxCopied] = useState(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('metro_station_tbm');
  const [csvCopied, setCsvCopied] = useState(false);
  const [promptWithDataCopiedId, setPromptWithDataCopiedId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string>('metro_tunnel_contract');
  const [contractCopied, setContractCopied] = useState(false);
  const [instructionCopiedId, setInstructionCopiedId] = useState<string | null>(null);

  // Auto-scroll selected tab pill into view smoothly
  const navPillsRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tab: typeof activeTab, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tab);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  useEffect(() => {
    if (navPillsRef.current) {
      const activeEl = navPillsRef.current.querySelector<HTMLButtonElement>('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (industryTrack === 'ENERGY_PETRO') {
      setSelectedDatasetId('oil_gas_pipeline_ndt');
      setSelectedContractId('oil_gas_epc_contract');
    } else {
      setSelectedDatasetId('metro_station_tbm');
      setSelectedContractId('metro_tunnel_contract');
    }
  }, [industryTrack]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copySandboxToClipboard = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setSandboxCopied(true);
    setTimeout(() => setSandboxCopied(false), 2500);
  };

  const loadPromptToSandbox = (promptText: string) => {
    onChangeContent(promptText);
    const sandboxEl = document.getElementById('prompt-sandbox');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const PROMPT_LIBRARY: PromptItem[] = [
    {
      id: `discipline_custom_${discMeta.id}`,
      titleFa: `پرامپت تخصصی دیسیپلین: ${discMeta.titleFa}`,
      titleEn: `Discipline Engineering Prompt: ${discMeta.titleEn}`,
      categoryFa: discMeta.trackId === 'CIVIL_INFRA' ? 'مگاپروژه‌های راه و ابنیه' : discMeta.trackId === 'ENERGY_PETRO' ? 'نفت، گاز و پتروشیمی' : 'سبک زندگی و خانواده',
      categoryEn: discMeta.trackId === 'CIVIL_INFRA' ? 'Civil & Infrastructure' : discMeta.trackId === 'ENERGY_PETRO' ? 'Oil & Gas EPCC' : 'Lifestyle & Everyday AI',
      descriptionFa: `پرامپت مهندسی‌شده RCTO با استانداردهای ${discMeta.governingStandardsFa[0]} و تحلیل شاخص‌های ${discMeta.performanceMetricsFa.slice(0, 2).join(' و ')}.`,
      descriptionEn: `Engineered RCTO prompt customized for ${discMeta.governingStandardsEn[0]} and ${discMeta.performanceMetricsEn.slice(0, 2).join(', ')}.`,
      promptFa: disciplinePromptPair.engineeredPromptFa,
      promptEn: disciplinePromptPair.engineeredPromptEn,
      targetTools: ['Claude 3.5 / 3.7', 'ChatGPT-4o', 'Gemini Pro']
    },
    {
      id: 'meeting_summary',
      titleFa: 'خلاصه‌سازی جلسه و استخراج اکشن‌آیتم‌ها',
      titleEn: 'Executive Meeting Summary & Action Items',
      categoryFa: 'مدیریت و عملیات',
      categoryEn: 'Management & Ops',
      descriptionFa: 'تبدیل یادداشت‌های نامنظم جلسه به یک گزارش حرفه‌ای با وظایف، مسئولان و ضرب‌الاجل‌ها.',
      descriptionEn: 'Transform raw meeting transcripts/notes into structured summaries with owners and deadlines.',
      promptFa: `تو یک مدیر دفتر ارشد و هماهنگ‌کننده اجرایی بسیار منظم هستی.
من در ادامه متن یا یادداشت‌های خام جلسه‌ای درباره [موضوع جلسه مثلاً: بازبینی اسپرینت شماره ۴] را قرار می‌دهم.

وظیفه تو این است که خروجی را در قالب زیر به زبان فارسی روان و حرفه‌ای استخراج کنی:
۱. خلاصه اجرایی جلسه در حداکثر ۳ بولت‌پوینت کلیدی
۲. تصمیمات قطعی اتخاذ شده (Decisions Made)
۳. جدول اکشن‌آیتم‌ها (Action Items Table) شامل ۴ ستون: [عنوان اقدام | فرد مسئول | ضرب‌الاجل زمانی | پیش‌نیازها]
۴. موضوعات بلاتکلیف یا ریسک‌های نیازمند پیگیری در جلسه بعد

متن یادداشت‌های جلسه:
[متن یا صورت‌جلسه خام خود را اینجا جای‌گذاری کنید]`,
      promptEn: `You are an elite Chief of Staff and Executive Coordinator.
Below are the raw notes from a meeting regarding [Meeting Topic, e.g., Sprint 4 Review].

Please produce a crisp executive brief with the following structure:
1. Executive Summary in 3 concise bullet points.
2. Definite Decisions Made.
3. Action Items Table with 4 columns: [Action Item | Owner | Due Date | Dependencies].
4. Open Issues / Risks requiring follow-up in the next sync.

Meeting Notes:
[Paste raw notes or transcript here]`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'business_email',
      titleFa: 'تدوین ایمیل رسمی سازمانی و پیگیری تعهدات',
      titleEn: 'Executive Business Follow-up Email',
      categoryFa: 'ارتباطات حرفه‌ای',
      categoryEn: 'Professional Comms',
      descriptionFa: 'نگارش ایمیل با لحن محترمانه، قاطع و سازمانی برای پیگیری قرارداد یا تصمیم مدیران بدون بی‌ادبی.',
      descriptionEn: 'Draft polished, respectful yet firm executive emails to follow up on contracts or deliverables.',
      promptFa: `تو متخصص ارتباطات تجاری و مکاتبات دیپلماتیک سازمانی هستی.
شرایط: دیروز جلسه‌ای با [نام مخاطب / مشتری / مدیر] درباره [موضوع توافق مثلاً: تایید نهایی بودجه خرید نرم‌افزار] داشتیم و قرار بود تا امروز عصر نظرشان را اعلام کنند. هنوز پاسخی دریافت نشده است.

وظیفه:
یک ایمیل پیگیری در حداکثر ۲ تا ۳ پاراگراف کوتاه با مشخصات زیر بنویس:
- لحن: کاملاً محترمانه، حرفه‌ای، محکم و تشکرآمیز (بدون چاپلوسی یا لحن تهاجمی).
- یادآوری ارزش: اشاره کوتاه به اینکه تایید به موقع، به حفظ زمان‌بندی پروژه تا [تاریخ هدف] کمک می‌کند.
- دعوت به اقدام (CTA) مشخص: تعیین زمان برای یک مکالمه تلفنی ۱۰ دقیقه‌ای در صورت وجود هرگونه ابهام.
- ارائه ۲ گزینه برای خط موضوع (Subject Line) جذاب و تمیز.`,
      promptEn: `You are an expert in corporate communications and executive negotiation.
Context: Yesterday we met with [Client Name / Manager] regarding [Topic, e.g., Final Software Budget Approval]. They intended to confirm by today, but we have not yet heard back.

Task:
Draft a concise 2-3 paragraph follow-up email:
- Tone: Highly courteous, respectful, firm, and value-oriented (not passive-aggressive).
- Value proposition: Gently note that confirming this week ensures our launch milestone on [Target Date].
- Clear Call to Action (CTA): Propose a brief 10-minute touchpoint if anything needs clarifying.
- Provide 2 compelling Subject Line variations.`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'project_wbs',
      titleFa: 'شکست ساختار کار (WBS) و طراحی اسپرینت چابک',
      titleEn: 'Agile WBS & Sprint Breakdown',
      categoryFa: 'مدیریت پروژه چابک',
      categoryEn: 'Agile Project Mgmt',
      descriptionFa: 'تجزیه یک هدف بزرگ کسب‌وکاری به بسته‌های کاری شفاف، معیارهای پذیرش (DoD) و اسپرینت‌های ۲ هفته‌ای.',
      descriptionEn: 'Break down a major business initiative into clear work packages, Definition of Done, and 2-week sprints.',
      promptFa: `تو یک اسکرام‌مستر و مشاور مدیریت پروژه چابک با گواهینامه PMP و CPMAI هستی.
پروژه ما: [شرح کوتاه پروژه مثلاً: راه‌اندازی ربات پاسخگوی هوشمند سوالات پرسنلی منابع انسانی].
مدت زمان کل: [مثلاً ۶ هفته در قالب ۳ اسپرینت ۲ هفته‌ای].

وظیفه:
۱. تجزیه ساختار کار (WBS) در ۳ سطح (فازها، بسته‌های کاری، و وظایف عملیاتی).
۲. برای هر اسپرینت، هدف اسپرینت (Sprint Goal)، خروجی کلیدی (Deliverable) و داستان‌های کاربر نمونه (User Stories با فرمت As a... I want... So that...) ارائه بده.
۳. تعریف انجام کار (Definition of Done - DoD) را به صورت شفاف مشخص کن.
۴. بزرگ‌ترین وابستگی‌ها (Dependencies) میان تیم فنی و کسب‌وکار را هایلایت کن.
پاسخ را در جداول منظم و با دسته‌بندی منطقی ارائه بده.`,
      promptEn: `You are an Agile Project Manager and CPMAI certified advisor.
Project: [Brief project description, e.g., Internal HR Policy AI Chatbot for 5,000 employees].
Timeline: [e.g., 6 weeks split into 3 two-week sprints].

Task:
1. Generate a 3-tier Work Breakdown Structure (WBS: Phases, Work Packages, Tasks).
2. For each sprint, outline the Sprint Goal, Key Deliverable, and 2 sample User Stories in standard agile format (As a... I want... So that...).
3. Specify the Definition of Done (DoD).
4. Highlight the top 3 cross-functional dependencies between technical engineering and business stakeholders.
Format using clean markdown tables.`,
      targetTools: ['Claude', 'ChatGPT']
    },
    {
      id: 'devils_advocate',
      titleFa: 'وکیل مدافع شیطان: نقد بی‌رحمانه و مدیریت ریسک',
      titleEn: "Devil's Advocate & Critical Decision Stress-Testing",
      categoryFa: 'استراتژی و تصمیم‌گیری',
      categoryEn: 'Strategy & Risks',
      descriptionFa: 'آزمون استرس تصمیمات؛ هوش مصنوعی نقایص پنهان، خطاهای شناختی و آسیب‌پذیری‌های برنامه را آشکار می‌کند.',
      descriptionEn: 'Stress-test strategic assumptions; AI pinpoints blind spots, cognitive biases, and failure modes.',
      promptFa: `از این لحظه نقش "وکیل مدافع شیطان" (Devil's Advocate) و منتقد سخت‌گیر استراتژیک را بازی کن. هدف تو زیر سوال بردن خوش‌بینی‌های افراطی و آشکار کردن نقاط کور تصمیم ماست.

ایده یا تصمیم پیشنهادی ما:
[تصمیم خود را بنویسید، مثلاً: می‌خواهیم بخش پشتیبانی مشتریان را کاملاً به هوش مصنوعی بسپاریم و تیم انسانی را به یک نفر اپراتور ناظر تقلیل دهیم].

لطفاً:
۱. ۵ دلیل اصلی که چرا این تصمیم ممکن است با شکستی سنگین مواجه شود را فهرست کن.
۲. ۳ ریسک پنهان (عملیاتی، مالی، رضایت مشتری، یا حقوقی/امنیتی) که معمولاً نادیده گرفته می‌شوند را تشریح کن.
۳. اگر رقیب سرسخت ما این تصمیم را می‌دید، چطور از این نقطه ضعف علیه ما سوءاستفاده می‌کرد؟
۴. سه پیش‌شرط ایمنی (Guardrails) که بدون آن‌ها اجرای این تصمیم خودکشی سازمانی است را بیان کن.
صادق، صریح و بدون تعارف باش.`,
      promptEn: `Act as a ruthless Devil's Advocate and battle-tested executive risk assessor. Your goal is to shatter our confirmation bias and uncover latent operational vulnerabilities.

Our Proposed Decision:
[Insert decision, e.g., Fully replace Level 1 customer support with GenAI agents, cutting human staff by 80%].

Deliverables:
1. Top 5 brutal failure scenarios where this decision collapses.
2. 3 subtle blind spots (operational, financial, reputational, or legal) teams routinely overlook.
3. How an aggressive competitor could exploit this move against us.
4. 3 non-negotiable guardrails/mitigations required before giving a green light.
Be ruthlessly candid and analytical.`,
      targetTools: ['Claude', 'ChatGPT', 'Gemini']
    },
    {
      id: 'data_analyzer',
      titleFa: 'تحلیل داده‌ها و گزارش آماری برای تصمیم‌گیران',
      titleEn: 'Data Insights & Metric Interpretation',
      categoryFa: 'داده و هوش تجاری',
      categoryEn: 'Data & Analytics',
      descriptionFa: 'ارسال داده‌های خام، جدول اکسل یا خروجی دیتابیس برای دریافت تحلیل روندی، ناهنجاری‌ها و توصیه‌ها.',
      descriptionEn: 'Feed raw CSV/tables to extract trend shifts, statistical anomalies, and tactical business takeaways.',
      promptFa: `تو یک تحلیل‌گر ارشد کسب‌وکار و دانشمند داده هستی.
من داده‌های زیر را در اختیارت قرار می‌دهم. این داده‌ها مربوط به [شرح داده مثلاً: عملکرد فروش و تیکت‌های پشتیبانی در ۳ ماه گذشته] است.

وظایف تو:
۱. تحلیل روندهای کلیدی (Trend Analysis): چه تغییرات معناداری در داده‌ها دیده می‌شود؟
۲. کشف ناهنجاری‌ها (Outliers & Anomalies): چه نقاط غیرعادی یا نگران‌کننده‌ای وجود دارد؟
۳. فرضیه‌سازی و علت‌یابی اولیه: محتمل‌ترین دلایل وقوع این الگوها چیست؟
۴. سه توصیه عملیاتی مشخص برای بهبود شاخص‌ها در ماه آینده.
پاسخ را خلاصه، مجهز به اعداد و بدون کلی‌گویی ارائه کن.

داده‌ها:
[داده‌ها یا جدول خود را اینجا الصاق کنید]`,
      promptEn: `You are a Senior Business Intelligence and Data Science Lead.
Below is a data snapshot related to [Data description, e.g., Q3 Customer Support Tickets and Resolution times].

Your tasks:
1. Primary Trend Analysis: Highlight significant directional shifts.
2. Anomaly & Outlier Detection: Pinpoint suspicious spikes or drops.
3. Root-Cause Hypotheses: Propose 2-3 logical drivers explaining the numbers.
4. 3 actionable tactical recommendations for next month's sprint.
Keep it quantitative, concise, and focused on ROI.

Data:
[Paste table or CSV here]`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'meta_prompter',
      titleFa: 'مهندسی متقابل پرامپت: ارتقادهنده پرامپت با خودِ هوش مصنوعی',
      titleEn: 'Meta-Prompt: Prompt Engineering Coach',
      categoryFa: 'ابزار پرامپت‌نویسی',
      categoryEn: 'Prompt Mastery',
      descriptionFa: 'یک پرامپت ساده به هوش مصنوعی بدهید تا خودش آن را با تکنیک‌های پیشرفته بازنویسی و کامل کند.',
      descriptionEn: 'Feed a rough prompt to the LLM and let it engineer an optimized, high-precision version for you.',
      promptFa: `تو یک مهندس ارشد پرامپت (Lead Prompt Engineer) هستی.
من یک درخواست ساده در ذهن دارم که می‌خواهم از یک هوش مصنوعی بپرسم، اما می‌دانم که ناقص است.

درخواست ساده من این است:
"[درخواست خام خود را بنویسید، مثلاً: می‌خواهم یک استراتژی بازاریابی برای خدمات ابری بنویسم]"

وظیفه تو این است:
۱. پرامپت خام من را به یک "سوپرپرامپت" استاندارد با متدولوژی RCTO (شامل نقش مشخص، پس‌زمینه کسب‌وکار، وظایف گام‌به‌گام و محدودیت‌های خروجی) ارتقا دهی.
۲. جایگاه‌هایی که من باید اطلاعات اختصاصی سازمانم را در آن پر کنم با علامت [کروشه] مشخص کن.
۳. سه سوال هوشمندانه از من بپرس که اگر به آن‌ها جواب دهم، کیفیت پاسخ خروجی چند برابر می‌شود.`,
      promptEn: `You are an elite Prompt Engineer.
I have a rough, unoptimized idea that I want to ask an AI, but it lacks structure.

My rough prompt is:
"[Insert rough idea, e.g., Help me design a B2B SaaS onboarding sequence]"

Your task:
1. Transform my rough idea into a production-grade prompt using the RCTO framework (Role, Context, Step-by-step Task, Output format & Constraints).
2. Insert explicit [brackets] for organizational variables I should customize.
3. Ask me 3 sharp clarifying questions that, once answered, would make the output 10x more relevant.`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'contract_claims',
      titleFa: 'تحلیل تاخیرات، ادعاها (Claims) و تدوین لایحه دفاعیه (ماده ۳۰ پیمان / فیدیک)',
      titleEn: 'Contractual Claim & Delay Analysis (Clause 30 / FIDIC)',
      categoryFa: 'حقوقی و دعاوی پیمانکاری',
      categoryEn: 'Legal & Contract Claims',
      descriptionFa: 'انطباق مستندات تاخیرات با ماده ۳۰ شرایط عمومی پیمان یا فیدیک، تعیین مسئولیت تاخیر و تنظیم پیش‌نویس لایحه دفاعیه در آرتیفکت.',
      descriptionEn: 'Map delays to Clause 30/FIDIC, determine critical path liability, and generate an executive claim brief.',
      promptFa: `تو سرپرست ارشد امور قراردادها و دعاوی فنی (Claims Manager) با تسلط کامل بر شرایط عمومی پیمان (نشریه ۴۳۱۱) و قراردادهای فیدیک (FIDIC) هستی.

اطلاعات و مستندات پروژه:
- موضوع ادعا: [مثلاً تاخیر ۲ ماهه در تحویل زمین، تداخل تاسیسات معارض شهری و عدم ابلاغ نقشه‌های فونداسیون]
- مستندات و مکاتبات کارگاهی: [تاریخ تحویل موقت، شماره نامه‌های اخطار پیمانکار، صورت‌جلسات کارگاهی و گزارش‌های روزانه]

وظایف تحلیلی:
۱. انطباق حقوقی و زمانی با ماده ۳۰ شرایط عمومی پیمان (یا بند ۸.۴ فیدیک): آیا این تاخیرات در زمره تاخیرات مجاز (Excusable Delays) قرار می‌گیرند؟
۲. تحلیل مسیر بحرانی (Critical Path Impact): انحراف ایجاد شده بر زمان‌بندی کل پروژه را تخمین بزن.
۳. استخراج ماتریس تعهدات متقابل و اثبات تقصیر/قصور کارفرما در انجام تعهدات قراردادی.
۴. تدوین پیش‌نویس کامل لایحه دفاعیه و درخواست رسمی تمدید مدت پیمان خطاب به کارفرما/دستگاه نظارت با لحن اداری، قاطع، حقوقی و مستند به شماره مواد و تبصره‌های پیمان.
خروجی لایحه را بدون تعارف و در قالب یک سند اداری رسمی جهت قرارگیری در آرتیفکت تنظیم کن.`,
      promptEn: `You are a Senior Contract & Claims Specialist well-versed in FIDIC conditions and General Conditions of Contract.

Context & Case Data:
- Claim Subject: [e.g., 2-month delay in site handover, underground municipal utilities clashes, delayed IFC drawings]
- Project Evidence: [Site handover dates, contractor notice letters, daily logs, site minutes]

Analytical Tasks:
1. Legal & contractual mapping to Clause 30 (or FIDIC Sub-Clause 8.4): Classify excusable vs. non-excusable delays.
2. Critical Path Impact Analysis: Estimate the net project completion variance.
3. Extract reciprocal obligations matrix establishing owner default/delay.
4. Draft a formal, hard-hitting Extension of Time (EoT) claim submission letter referencing specific contract clauses.
Format the output as a formal executive brief suitable for a dedicated Artifact document.`,
      targetTools: ['Claude', 'Gemini', 'ChatGPT']
    },
    {
      id: 'industrial_qa_qc',
      titleFa: 'چک‌لیست عدم‌انطباق فنی و بازرسی استاندارد (مترو / پتروشیمی)',
      titleEn: 'Engineering QA/QC & Non-Conformance Matrix (ASME / API / Metro)',
      categoryFa: 'فنی و مهندسی پروژه',
      categoryEn: 'Engineering QA/QC',
      descriptionFa: 'تطبیق لاگ‌های کارگاهی با کدهای استاندارد (ASME, API, مشخصات تونل‌سازی) و تولید ماتریس رفع عدم انطباق (NCR).',
      descriptionEn: 'Cross-reference field reports against engineering codes to produce Inspection and Non-Conformance (NCR) matrices.',
      promptFa: `تو مدیر ارشد کنترل کیفیت (QA/QC Manager) و بازرس فنی ارشد در پروژه‌های بزرگ زیرساختی و صنعتی هستی.

اطلاعات گزارش کارگاهی و متریال:
- حوزه پروژه: [مثلاً اجرای لاینینگ سگمنتی تونل مترو با TBM / یا تست پایپینگ و مخازن تحت فشار پتروشیمی]
- مستندات و لاگ‌های تست: [شرح عدم انطباق مثلاً افت فشار در تست هیدروستاتیک یا ترک‌های سطحی در سگمنت بتنی شماره ۴۲]
- استانداردهای مرجع: [مثلاً ASME Sec VIII, API 1104, IPS یا مشخصات فنی نشریه مترو]

وظایف تحلیلی:
۱. تحلیل علت ریشه‌ای نقص فنی (Root Cause Analysis - RCA).
۲. تطبیق دقیق با تلرانس‌ها و بندهای مجاز در استاندارد مرجع.
۳. تدوین ماتریس گزارش عدم انطباق (NCR) شامل ستون‌های: [کد نقص | شرح عدم انطباق | شدت ریسک | اقدام اصلاحی الزامی (CAPA) | روش بازرسی مجدد | تاییدکننده نهایی].
۴. پیش‌نویس چک‌لیست بازرسی نهایی و صدور گواهی تحویل موقت در یک جدول منسجم.`,
      promptEn: `You are a Senior QA/QC and Technical Inspection Lead on major industrial/infrastructure projects.

Field Inspection Data:
- Domain: [e.g., Segmental Lining of Metro TBM Tunnel / Petrochemical Piping & Pressure Vessel Hydrotest]
- Test Findings: [Observed non-conformance, e.g., pressure drop during hydrotest or structural spalling on precast segment]
- Governing Codes: [e.g., ASME Sec VIII, API 1104, IPS, or Metro Technical Specs]

Tasks:
1. Root Cause Analysis (RCA) of the observed deficiency.
2. Compliance cross-check against code tolerances.
3. Generate a structured Non-Conformance Report (NCR) matrix: [NCR ID | Description | Severity | Corrective Action (CAPA) | Re-inspection Protocol | Approver].
4. Draft a definitive field inspection checklist for mechanical completion / temporary handover.`,
      targetTools: ['Claude', 'ChatGPT', 'Gemini']
    },
    // LIFESTYLE & EVERYDAY PROMPT SUITE
    {
      id: 'kitchen_fridge_chef',
      titleFa: 'سرآشپز نجات یخچال: دستور پخت خوشمزه با باقیمانده مواد غذایی',
      titleEn: 'Zero-Waste Fridge Chef: Creative Meals from Leftovers',
      categoryFa: 'آشپزی و سبک زندگی',
      categoryEn: 'Home & Lifestyle',
      descriptionFa: 'اقلام پراکنده باقیمانده در یخچال را بدهید تا ۳ غذای سریع، اقتصادی و لذیذ بدون نیاز به خرید اضافی پیشنهاد دهد.',
      descriptionEn: 'Feed your scattered fridge ingredients to generate 3 quick, delicious, zero-waste family meals.',
      promptFa: `تو یک سرآشپز خلاق، صرفه‌جو و کارشناس تغذیه خانواده هستی که شعارت «صفر دورریز مواد غذایی» است.
من در حال حاضر اقلام غذایی زیر را در یخچال و کابینت دارم که ممکن است به زودی فاسد یا کهنه شوند:
[لیست اقلام موجود، مثلاً: نصف سینه مرغ پخته، دو عدد کدو، مقداری ماست چکیده، کمی پنیر پیتزا، پیاز و ادویه‌جات]

شرایط:
- تعداد نفرات: [مثلاً ۳ نفر]
- حداکثر زمان آماده‌سازی: [مثلاً ۲۵ دقیقه]
- وسایل پخت موجود: [مثلاً گاز و تابه، بدون فر]

وظیفه تو:
۱. سه گزینه غذای لذیذ، ابتکاری و متناسب با ذائقه ایرانی پیشنهاد کن (یکی بسیار سریع، یکی خوراک گرم، یکی غذای سبک).
2. برای هر گزینه: مواد لازم دقیق از بین اقلام من، طرز تهیه گام‌به‌گام در ۵ مرحله کوتاه، و ترفند خوشمزه‌تر شدن را ذکر کن.
۳. در یک خط بگو با این کار جلوی دورریز چه اقلامی گرفته شد و چقدر در خرید دوباره صرفه‌جویی شد.`,
      promptEn: `You are an inventive, zero-waste family chef and home nutrition expert.
Here are the miscellaneous leftover ingredients currently in my fridge that need using up:
[List ingredients, e.g., half roasted chicken breast, 2 zucchinis, plain yogurt, shredded cheese, onion, basic spices]

Constraints:
- Serving: [e.g., 3 people]
- Max prep & cooking time: [e.g., 25 minutes]
- Equipment: [Stovetop and skillet, no oven]

Tasks:
1. Propose 3 delicious, creative meal concepts from these exact items (Quick Stir-fry, Warm Comfort Dish, Light Dinner).
2. For each: Step-by-step 5-minute recipe, seasoning hacks, and exact portions.
3. Calculate estimated grocery waste avoided.`,
      targetTools: ['ChatGPT-4o', 'Claude 3.5 / 3.7', 'Gemini Flash']
    },
    {
      id: 'parenting_homework',
      titleFa: 'مربی همراه والدین: آموزش درس‌های سخت به زبان قصه و بازی',
      titleEn: 'Smart Parenting Coach: Explaining Homework through Fun Stories',
      categoryFa: 'والدین و آموزش کودک',
      categoryEn: 'Parenting & EdTech',
      descriptionFa: 'آموزش مفاهیم دشوار ریاضی، علوم و تاریخ با انیمیشن‌های مورد علاقه کودک بدون اشک و لجبازی.',
      descriptionEn: 'Teach challenging STEM or history concepts using a child favorite characters and game mechanics.',
      promptFa: `تو یک مربی مهربان، متخصص روانشناسی یادگیری کودک و قصه‌گوی خلاق هستی.
کودک من [سن مثلاً: ۸ ساله، کلاس دوم یا سوم] در یادگیری مبحث [موضوع درسی مثلاً: جمع و تفریق کسرها یا چرخه‌های آب و باران در علوم] احساس خستگی و مقاومت می‌کند.
علاقه‌مندی‌های اصلی او: [مثلاً کارتون کارخانه‌هیولاها، بازی‌های لگو و شخصیت‌های فضایی].

وظیفه تو:
۱. این مفهوم درسی را در قالب یک داستان کوتاه هیجان‌انگیز ۳ دقیقه‌ای با کاراکترهای مورد علاقه او توضیح بده طوری که مفهوم در ذهن او تصویرسازی شود.
۲. یک بازی خانگی ۵ دقیقه‌ای ۲ نفره (بین والد و کودک) بدون نیاز به وسایل خاص طراحی کن که کودک با بازی، درستی فرمول را خودش کشف کند.
۳. دو سوال معماگونه با جایزه فرضی برای تثبیت درس بنویس.
لحن پاسخ صمیمی، پرانرژی و سرشار از شوخ‌طبعی کودکانه باشد.`,
      promptEn: `You are an empathetic child educational psychologist and master storyteller.
My child [Age: e.g., 8 years old, 3rd grade] is struggling and frustrated with [Topic: e.g., Fractions or Water Cycle].
Their passions: [e.g., Minecraft building, Space exploration, Lego].

Tasks:
1. Explain this exact academic concept through an engaging 3-minute adventure story starring their favorite theme.
2. Design a simple 5-minute hands-on game using household items where the child naturally discovers the solution.
3. Craft 2 riddle-style reward questions reinforcing the takeaway.
Tone must be warm, enthusiastic, and playful.`,
      targetTools: ['ChatGPT-4o', 'Claude 3.7', 'Gemini Pro']
    },
    {
      id: 'polite_negotiation',
      titleFa: 'مذاکره روزمره، اجاره‌بها و پس‌گرفتن مؤدبانه طلب بدون دلخوری',
      titleEn: 'Polite Negotiation: Rent Discount & Tactful Loan Recovery',
      categoryFa: 'آداب معاشرت و ارتباطات',
      categoryEn: 'Social & Negotiation',
      descriptionFa: 'نگارش پیام‌های محکم، دیپلماتیک و بسیار محترمانه برای پس‌گرفتن قرض یا گرفتن تخفیف کرایه خانه.',
      descriptionEn: 'Draft warm, assertive, non-confrontational texts to recover loans or negotiate favorable rent terms.',
      promptFa: `تو متخصص برجسته ارتباطات بین‌فردی، اصول مذاکره هاروارد و روانشناسی زبان (NVC) هستی.
موقعیت حساس من:
[شرح موقعیت مثلاً: می‌خواهم از صاحب‌خانه‌ام درخواست کنم اجاره امسال را کمتر از نرخ تورم افزایش دهد چون مستاجر بسیار خوش‌حساب و مراقب ملک بوده‌ام / یا: می‌خواهم مبلغی را که ۶ ماه پیش به دوستم قرض داده‌ام بدون ایجاد ناراحتی و با حفظ رفاقت پس بگیرم].

ملاحظات:
- رابطه ما: [صمیمی / نیمه‌رسمی / کاری]
- هدف مشخص: [مثلاً تعیین تاریخ دقیق واریز یا توافق روی مبلغ مشخص]

وظیفه تو:
۱. سه متن پیام کوتاه آماده ارسال بنویس:
   - گزینه ۱: لحن بسیار گرم و دوستانه با حفظ حرمت‌ها
   - گزینه ۲: لحن قاطع، محترمانه و شفاف بر مبنای منطق و حقایق
   - گزینه ۳: پیشنهاد بازپرداخت قسطی یا مصالحه برد-برد
۲. دو خطای بزرگ کلامی که نباید در این گفتگو مرتکب شوم را به من هشدار بده.`,
      promptEn: `You are an elite interpersonal communication and negotiation expert specializing in principled negotiation and boundary-setting.
My delicate interpersonal scenario:
[Describe scenario, e.g., Tactfully asking landlord for a rent freeze based on 3-year spotless tenancy, OR gently recovering an overdue personal loan from a close friend without destroying the relationship].

Tasks:
1. Draft 3 tailored, ready-to-send messages:
   - Option A: Warm, friendly, and relationship-centric.
   - Option B: Firm, polite, and fact-based.
   - Option C: Pragmatic win-win compromise proposal.
2. Warn me against 2 conversational landmines to strictly avoid.`,
      targetTools: ['Claude 3.5 / 3.7', 'ChatGPT-4o']
    },
    {
      id: 'viral_reels_script',
      titleFa: 'سناریونویسی وایرال اینستاگرام و ریلز با قلاب‌های ۳ ثانیه‌ای',
      titleEn: 'Viral Social Media Script: 3-Second Hooks & Retention',
      categoryFa: 'ترندها و تولید محتوا',
      categoryEn: 'Viral Content',
      descriptionFa: 'ایده و سناریوی آماده ویدیو با قلاب‌های روانشناختی، کات‌های جذاب و کپشن پرکامنت.',
      descriptionEn: 'High-retention video scripts with psychological hooks, visual pacing, and comment-generating CTAs.',
      promptFa: `تو یک استراتژیست ارشد تولید محتوای وایرال در اینستاگرام و تیک‌تاک با شناخت عمیق از الگوریتم ریلز و روانشناسی ۳ ثانیه اول هستی.
موضوع ویدیوی من: [موضوع، مثلاً: ۳ اشتباه بزرگ در خرید لباس / یا: ترفند پس‌انداز ماهیانه ۱۰ میلیون تومان / یا: طرز تهیه یک دسر ۳ سوته].
مخاطب هدف: [مثلاً جوانان، مادران، کارمندان].

وظیفه تو تدوین یک سناریوی کامل ۶۰ ثانیه‌ای است:
۱. قلاب طلایی (Hook): ۳ گزینه جمله افتتاحیه کنجکاوی‌برانگیز و شوکه‌کننده برای ۳ ثانیه اول.
۲. بدنه سناریو (Story & Value): متن گفتار کلمه‌به‌کلمه همراه با مشخص کردن زاویه دوربین و کات‌های تصویر (B-Roll).
۳. کال تو اکشن (CTA): یک دعوت به اقدام هوشمندانه که مخاطب را ترغیب به کامنت‌گذاشتن یا اشتراک‌گذاری در استوری کند.
۴. متن کپشن با ۵ هشتگ پربازدید هدفمند و خط اول جذاب.`,
      promptEn: `You are a viral social media strategist specializing in Instagram Reels/TikTok algorithmic retention and psychological hooks.
Video Topic: [e.g., 3 stealth money leaks keeping you broke, OR 15-minute healthy lunchbox prep].
Target Audience: [e.g., Working parents, young professionals].

Deliverables for a 45-60 second high-retention reel:
1. 3 explosive 3-second auditory/visual hooks that stop the thumb scroll.
2. Word-for-word spoken script with camera angles and B-roll visual cues.
3. High-converting CTA engineered to trigger comments and story shares.
4. Companion caption with engaging first-line preview and 5 targeted hashtags.`,
      targetTools: ['ChatGPT-4o', 'Claude', 'Gemini']
    },
    {
      id: 'smart_travel_planner',
      titleFa: 'برنامه‌ریزی سفر اقتصادی خانوادگی و شکار بلیت ارزان',
      titleEn: 'Family Vacation Architect: Budget Itineraries & Flight Deals',
      categoryFa: 'سفر و اوقات فراغت',
      categoryEn: 'Travel & Vacations',
      descriptionFa: 'طراحی برنامه روزبه‌روز سفر متناسب با انرژی کودک و سالمندان، به همراه چک‌لیست چمدان و ترفندهای کاهش هزینه.',
      descriptionEn: 'Balanced multi-day travel itineraries accommodating kids and seniors, with zero-forgotten packing matrices.',
      promptFa: `تو یک راهنمای حرفه‌ای سفر، مشاور بودجه‌بندی گردشگری و طراح برنامه‌های خانوادگی هستی.
اطلاعات سفر ما:
- مقصد: [مثلاً جزیره کیش / شهر استانبول / شمال ایران]
- مدت سفر: [مثلاً ۴ روز و ۳ شب]
- همسفران: [مثلاً ۲ بزرگسال و یک کودک ۶ ساله]
- سقف بودجه کل: [مثلاً ۲۵ میلیون تومان بدون احتساب پرواز]
- سبک ترجیحی: [آرامش‌بخش، تجربیات محلی و شکم‌گردی، بدون دویدن مدام]

وظیفه تو:
۱. جدول زمان‌بندی روزانه منعطف (صبح، بعدازظهر، شب) با فواصل استراحت کافی برای کودک.
۲. معرفی غذاهای محلی اصیل و رستوران‌های باکیفیت و قیمت‌مناسب دور از تله‌های توریستی.
۳. ترفندهای طلایی برای خرید بلیت و رزرو اقامتگاه با تخفیف حداکثری.
۴. چک‌لیست کامل بستن چمدان شامل داروهای ضروری و مدارک به صورت تفکیک‌شده.`,
      promptEn: `You are an elite family travel concierge and budget travel optimizer.
Trip Profile:
- Destination: [e.g., Istanbul, Turkey / Kish Island / Northern Coast]
- Duration: [e.g., 4 Days, 3 Nights]
- Party: [e.g., 2 adults, 1 child aged 6]
- Total Budget Cap: [e.g., $1,000 excluding airfare]
- Preferred Travel Vibe: [Relaxed, foodie, cultural, low-stress]

Tasks:
1. Flexible hour-by-hour itinerary balancing sights with child nap/downtime windows.
2. Authentic local cuisine gems off the commercial tourist traps.
3. Proven fare-saving hacks for local transit and accommodation.
4. Comprehensive multi-compartment luggage & first-aid pack list.`,
      targetTools: ['Claude 3.7', 'Gemini Pro', 'ChatGPT-4o']
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#1c2830] dark:text-[#e8ebe9]">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1f5163] via-[#0f4c5c] to-[#0a3540] text-white p-6 sm:p-8 shadow-md border border-[#1f5163]/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://owjbc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-1 rounded-lg border border-white/40 shadow-xs hover:scale-105 transition-transform shrink-0"
                title="OWJ Business Council"
              >
                <img
                  src={OWJ_LOGO}
                  alt="OWJ Business Council"
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = OWJ_LOGO_FALLBACK;
                  }}
                />
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#99e2b4] text-xs font-semibold tracking-wide border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>{lang === 'fa' ? 'ماژول صفر پیش‌نیاز · گروه مشاوران مدیریت اوج (OWJ)' : 'Prerequisite Module 0 · OWJ Business Council'}</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
              {lang === 'fa'
                ? 'راهنمای کاربردی و الفبای کار با مدل‌های زبانی بزرگ (LLMs)'
                : 'Applied Handbook: Mastering Large Language Models for Practitioners'}
            </h1>
            <p className="text-xs sm:text-sm text-[#d0e5ec] leading-relaxed">
              {lang === 'fa'
                ? 'پیش از ورود به مراحل رسمی استاندارد CPMAI، در این کارگاه عملی با سه غول دنیای هوش مصنوعی (ChatGPT، Claude، Gemini)، متدولوژی نگارش پرامپت‌های اثربخش (R-C-T-O)، ابزارهای پیشرفته‌ای مانند Artifacts و Projects، و مجموعه‌ای از پرامپت‌های آماده و قابل کپی آشنا شوید.'
                : 'Before embarking on CPMAI Phase I, equip yourself with practical AI skills: top LLM platforms (ChatGPT, Claude, Gemini), the RCTO prompt engineering framework, advanced workflows (Artifacts & Projects), and one-click copyable prompts.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={onGoToPage1}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2f7d5b] hover:bg-[#25664a] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02]"
            >
              <span>{lang === 'fa' ? 'ورود به صفحه ۱ (فاز اول CPMAI)' : 'Proceed to Page 1 (Phase I)'}</span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <a
              href="#prompt-sandbox"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'پرش به کارگاه تمرین پرامپت' : 'Jump to Prompt Sandbox'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Placement Quiz Banner for New Entrants */}
      <div className="p-1 rounded-2xl bg-gradient-to-r from-[#2f7d5b]/25 via-[#00738c]/25 to-[#b87333]/25 border border-[#2f7d5b]/30 shadow-2xs">
        <div className="rounded-[calc(1rem-0.25rem)] bg-white dark:bg-[#161e24] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] shrink-0 mt-0.5 sm:mt-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/30">
                  {lang === 'fa' ? 'پیش‌نیاز پیشنهادی اعضای جدید پلتفرم' : 'Recommended Newcomer Entry Gate'}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono">
                  {lang === 'fa' ? '⏱️ ۱۲ سوال تعاملی · ۷ دقیقه' : '⏱️ 12 Questions · 7 Min'}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa'
                  ? 'آزمون تعاملی سنجش سطح هوش مصنوعی، گیت‌هاب و اصطلاحات مهندسی'
                  : 'Interactive AI & Software Engineering Readiness Assessment'}
              </h3>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] max-w-2xl leading-relaxed">
                {lang === 'fa'
                  ? 'پیش از شروع کتاب‌کار CPMAI، میزان تسلط خود را بر اصطلاحات دنیای واقعی (Git, GitHub, PRs, Tokens, RAG, NotebookLM, APIs) محک بزنید و کارنامه و نقشه راه شخصی‌سازی‌شده دریافت کنید.'
                  : 'Assess your practical fluency across Git, PRs, Tokens, RAG architectures, and AI safety to receive a tailored roadmap.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white text-xs font-black shadow-xs transition-all active:scale-[0.96] shrink-0 hover:scale-[1.02]"
          >
            <span>{lang === 'fa' ? 'شرکت در آزمون سطح‌سنجی 🚀' : 'Take Readiness Quiz 🚀'}</span>
            {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Navigation Pills (Double-Bezel Island with Auto-Scroll to Active Pill) */}
      <div
        ref={navPillsRef}
        className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xs shadow-inner overflow-x-auto no-scrollbar scroll-smooth text-xs font-medium"
      >
        <button
          onClick={onOpenQuiz}
          className="px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788] hover:bg-[#2f7d5b]/20 border border-[#2f7d5b]/30 font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Target className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? '🎯 آزمون تعیین سطح' : '🎯 Readiness Quiz'}</span>
        </button>
        <button
          onClick={(e) => handleTabClick('all', e)}
          data-active={activeTab === 'all'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#1f5163] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? 'نمای کامل همه بخش‌ها' : 'All Sections'}
        </button>
        <button
          onClick={(e) => handleTabClick('tools', e)}
          data-active={activeTab === 'tools'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'tools'
              ? 'bg-[#00738c] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۱. سه غول هوش مصنوعی' : '1. Top 3 LLMs'}
        </button>
        <button
          onClick={(e) => handleTabClick('prompting', e)}
          data-active={activeTab === 'prompting'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'prompting'
              ? 'bg-[#0f4c5c] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۲. فرمول طلایی RCTO' : '2. RCTO Framework'}
        </button>
        <button
          onClick={(e) => handleTabClick('prompts_library', e)}
          data-active={activeTab === 'prompts_library'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'prompts_library'
              ? 'bg-[#b87333] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۳. کتابخانه پرامپت‌های آماده' : '3. Prompt Library'}
        </button>
        <button
          onClick={(e) => handleTabClick('advanced_features', e)}
          data-active={activeTab === 'advanced_features'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'advanced_features'
              ? 'bg-[#1b3a4b] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۴. سیستم‌های خبره سازمانی و قراردادها (Gems & Projects)' : '4. Enterprise Systems & Contracts'}
        </button>
        <button
          onClick={(e) => handleTabClick('engineering_dashboards', e)}
          data-active={activeTab === 'engineering_dashboards'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'engineering_dashboards'
              ? 'bg-[#00738c] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۵. کارگاه داشبورد داده‌های مهندسی (مترو و نفت‌وگاز)' : '5. Engineering Data & Dashboards'}
        </button>
        <button
          onClick={(e) => handleTabClick('contracts_and_gems', e)}
          data-active={activeTab === 'contracts_and_gems'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'contracts_and_gems'
              ? 'bg-[#b87333] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۶. کارگاه قراردادها و دستیار Gems/Projects' : '6. Contracts & Gems/Projects'}
        </button>
        <button
          onClick={(e) => handleTabClick('connectors', e)}
          data-active={activeTab === 'connectors'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'connectors'
              ? 'bg-[#1a73e8] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۷. کانکتورهای گوگل، Slack و Notion MCP' : '7. Google, Slack & Notion Connectors'}
        </button>
        <button
          onClick={(e) => handleTabClick('notebooklm', e)}
          data-active={activeTab === 'notebooklm'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'notebooklm'
              ? 'bg-[#00738c] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۸. کارگاه Google NotebookLM (مدیران و تمرینات)' : '8. Google NotebookLM Workshop'}
        </button>
        <button
          onClick={(e) => handleTabClick('masterclass', e)}
          data-active={activeTab === 'masterclass'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'masterclass'
              ? 'bg-[#6d28d9] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۹. مسترکلاس مهندسی با LLM' : '9. Engineering Masterclass'}
        </button>
        <button
          onClick={(e) => handleTabClick('safety', e)}
          data-active={activeTab === 'safety'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'safety'
              ? 'bg-[#8c3b2d] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۱۰. خطوط قرمز امنیتی و توهم' : '10. Safety & Guardrails'}
        </button>
        <button
          onClick={(e) => handleTabClick('sandbox', e)}
          data-active={activeTab === 'sandbox'}
          className={`px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'sandbox'
              ? 'bg-[#2f7d5b] text-white font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          {lang === 'fa' ? '۱۱. کارگاه تست پرامپت' : '11. Prompt Sandbox'}
        </button>
      </div>

      {/* SECTION 1: THE BIG 3 LLMs */}
      {(activeTab === 'all' || activeTab === 'tools') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بخش ۱: سه ابزار اصلی هوش مصنوعی و لینک‌های دسترسی' : 'Section 1: The Top 3 LLM Platforms & Direct Access'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'کدام مدل برای کار شما مناسب‌تر است؟ با یک کلیک ثبت‌نام و استفاده را شروع کنید.'
                    : 'Choose the right LLM for your workflow. Register and start with one click.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ChatGPT Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e3f6f0] dark:bg-[#10a37f]/20 border border-[#10a37f]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-chatgpt" aria-label="ChatGPT">
                          <g transform="translate(12 12)" fill="none" stroke="#10A37F" strokeWidth="1.9">
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(60)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(120)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(180)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(240)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(300)" />
                          </g>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">ChatGPT</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">OpenAI</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#10a37f]/10 text-[#10a37f] border border-[#10a37f]/20">
                      {lang === 'fa' ? 'همه‌فن‌حریف و جامع' : 'Most Versatile'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بهترین ابزار عمومی با پشتیبانی از وب‌سرچ زنده، اجرای کدهای پایتون، تحلیل پیشرفته داده‌ها، ساخت عکس و اکوسیستم وسیع افزونه‌ها (Custom GPTs).'
                      : 'The most popular all-rounder with live web browsing, Python code execution, advanced data analytics, image generation, and Custom GPTs.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: GPT-4o, GPT-4o mini, o1' : 'Key Models: GPT-4o, 4o-mini, o1'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: تحلیل فایل اکسل و پروژه‌ها' : 'Feature: Code Interpreter & Projects'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'ثبت‌نام ساده با جیمیل یا مایکروسافت' : 'Easy signup with Google/Microsoft'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#10a37f] hover:bg-[#0e8e6e] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150"
                  >
                    <span>{lang === 'fa' ? 'ورود به ChatGPT (chatgpt.com)' : 'Open ChatGPT'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Claude Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#fdeee6] dark:bg-[#d97706]/20 border border-[#d97706]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-claude" aria-label="Claude">
                          <g transform="translate(12 12)" stroke="#D97757" strokeWidth="2.4" strokeLinecap="round">
                            <line y1="-3" y2="-11" />
                            <line y1="-3" y2="-9" transform="rotate(30)" />
                            <line y1="-3" y2="-11" transform="rotate(60)" />
                            <line y1="-3" y2="-9" transform="rotate(90)" />
                            <line y1="-3" y2="-11" transform="rotate(120)" />
                            <line y1="-3" y2="-9" transform="rotate(150)" />
                            <line y1="-3" y2="-11" transform="rotate(180)" />
                            <line y1="-3" y2="-9" transform="rotate(210)" />
                            <line y1="-3" y2="-11" transform="rotate(240)" />
                            <line y1="-3" y2="-9" transform="rotate(270)" />
                            <line y1="-3" y2="-11" transform="rotate(300)" />
                            <line y1="-3" y2="-9" transform="rotate(330)" />
                          </g>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">Claude</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">Anthropic</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20">
                      {lang === 'fa' ? 'پادشاه نگارش و کد' : 'Top Writing & Code'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بهترین کیفیت درک و تولید متن فارسی طبیعی، کدنویسی، تحلیل داکیومنت‌های بزرگ و شاهکار آرتیفکت‌ها (Artifacts) برای پیش‌نمایش زنده وب و اسناد.'
                      : 'Unmatched nuance, superior coding, large document comprehension, and interactive Artifacts for side-by-side previews.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: Claude 3.5 Sonnet, Haiku' : 'Key Models: Claude 3.5 Sonnet, Haiku'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: آرتیفکت‌های تعاملی و Projects' : 'Feature: Interactive Artifacts & Projects'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'پنجره ورودی ۲۰۰ هزار توکنی (یک کتاب کامل)' : '200K token context window'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#92400e] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150"
                  >
                    <span>{lang === 'fa' ? 'ورود به Claude (claude.ai)' : 'Open Claude'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Gemini Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] dark:bg-[#1a73e8]/20 border border-[#1a73e8]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-gemini" aria-label="Gemini">
                          <defs>
                            <linearGradient id="gemGradPage0" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4285F4" />
                              <stop offset="55%" stopColor="#9B72CB" />
                              <stop offset="100%" stopColor="#D96570" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#gemGradPage0)" d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">Gemini</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">Google</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/20">
                      {lang === 'fa' ? 'حافظه ۲ میلیونی و گوگل' : '2M Context & Google'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بزرگ‌ترین کانتکست جهان (۲ میلیون توکن)، اتصال مستقیم با تایپ @ به Google Drive و Gmail و YouTube، و ساخت دستیار اختصاصی با Gems.'
                      : 'Massive 2M token context, seamless Google Workspace integration (@Drive, @Gmail, @YouTube), and custom Gems.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: Gemini 1.5 Pro, 1.5 Flash' : 'Key Models: Gemini 1.5 Pro, Flash'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: واکشی ویدیو، صوت و گوگل‌درایو' : 'Feature: Multimodal & Workspace @mentions'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'ورود مستقیم با اکانت جیمیل' : 'Zero friction login with Google account'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150"
                  >
                    <span>{lang === 'fa' ? 'ورود به Gemini (gemini.google.com)' : 'Open Gemini'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: THE RCTO PROMPTING FRAMEWORK */}
      {(activeTab === 'all' || activeTab === 'prompting') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#0f4c5c]/10 text-[#0f4c5c] dark:text-[#6ee7b7]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بخش ۲: فرمول طلایی پرامپت‌نویسی حرفه‌ای (چهارضلعی R-C-T-O)' : 'Section 2: The Gold Standard RCTO Prompting Formula'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'دیگر پرامپت‌های مبهم و کلی ننویسید. با رعایت این ۴ رکن، هوش مصنوعی دقیقاً همان خروجی مدنظر شما را تولید می‌کند.'
                    : 'Stop writing vague prompts. Follow the 4 core pillars to command high-precision responses.'}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* R - Role */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#1f5163] text-white font-extrabold text-sm flex items-center justify-center">
                  R
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'نقش (Role)' : 'Role'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'مدل چه کلاه‌داری است؟' : 'Who is the model?'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'تعیین شخصیت و سطح تخصص هوش مصنوعی. به آن بگویید در جایگاه چه کسی فکر کند.'
                  : 'Assign persona and domain expertise. Tell the AI which expert shoes to step into.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#1f5163] dark:text-[#6fb3c6]">
                {lang === 'fa'
                  ? '«تو مدیر ارشد محصول با ۱۰ سال سابقه در حوزه فین‌تک هستی...»'
                  : '"You are a Lead Product Manager with 10 years in FinTech..."'}
              </div>
            </div>

            {/* C - Context */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#00738c] text-white font-extrabold text-sm flex items-center justify-center">
                  C
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'زمینه (Context)' : 'Context'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'وضع موجود و پیش‌نیازها' : 'Background & Situation'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'توصیف شرکت، بازار هدف، محدودیت‌های زمانی و داده‌های ورودی. هوش مصنوعی ذهن‌خوانی بلد نیست.'
                  : 'Describe organizational background, audience, and constraints. Never assume the AI knows.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#00738c] dark:text-[#6ee7b7]">
                {lang === 'fa'
                  ? '«شرکت ما ۴۰ نفر پرسنل دارد و نرخ ریزش مشتریان ماه قبل به ۱۲٪ رسیده است...»'
                  : '"We are a 40-person startup facing a 12% monthly customer churn..."'}
              </div>
            </div>

            {/* T - Task */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#b87333] text-white font-extrabold text-sm flex items-center justify-center">
                  T
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'وظیفه (Task)' : 'Task'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'دستور کار صریح و افعال شفاف' : 'Actionable Directive'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'دستور شفاف و قابل ارزیابی بدون ابهام. از افعال مشخص مثل «اولویت‌بندی کن»، «استخراج کن» استفاده کنید.'
                  : 'Unambiguous directive with sharp action verbs: "Categorize", "Synthesize", "Prioritize".'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#b87333] dark:text-[#e0a96d]">
                {lang === 'fa'
                  ? '«۵ علت اصلی این ریزش را شناسایی و برای هر یک اقدام کم‌هزینه پیشنهاد بده...»'
                  : '"Identify top 5 churn root causes and draft low-cost mitigation steps..."'}
              </div>
            </div>

            {/* O - Output */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#2f7d5b] text-white font-extrabold text-sm flex items-center justify-center">
                  O
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'قالب خروجی (Output)' : 'Output & Format'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'لحن، ساختار و محدودیت کلمات' : 'Structure, Tone & Style'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'مشخص کردن نوع ارائه: جدول، بولت‌پوینت، کد JSON، زبان فارسی صمیمی یا رسمی، و حد طول پاسخ.'
                  : 'Format specification: Markdown table, bullet points, corporate tone, length limits.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#2f7d5b] dark:text-[#63c496]">
                {lang === 'fa'
                  ? '«پاسخ را در یک جدول مقایسه‌ای ۴ ستونه به فارسی سازمانی و بدون مقدمه بنویس.»'
                  : '"Output as a 4-column Markdown table, professional Persian, no preamble."'}
              </div>
            </div>
          </div>

          {/* Before vs After Interactive Showcase */}
          <div className="rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#fbbf24]" />
                {lang === "fa" ? "مقایسه عینی: پرامپت ضعیف در برابر پرامپت مهندسی‌شده" : "Side-by-Side: Weak vs. High-Performance Prompt"}
              </span>

              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6] self-start sm:self-auto border border-[#1f5163]/20">
                {lang === "fa" ? `دیسیپلین شما: ${discMeta.titleFa}` : `Discipline: ${discMeta.titleEn}`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Prompt */}
              <div className="p-4 rounded-xl bg-[#fdf2f2] dark:bg-[#2a1715] border border-[#f87171]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#b91c1c] dark:text-[#f87171] flex items-center gap-1">
                    <span>✕</span>
                    <span>
                      {lang === "fa" ? `پرامپت ضعیف و مبهم در دیسیپلین ${discMeta.shortTitleFa}` : `Weak Prompt in ${discMeta.shortTitleEn}`}
                    </span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-[#1a1515] font-sans text-xs text-[#b91c1c] dark:text-[#fca5a5] leading-relaxed">
                  {lang === "fa" ? disciplinePromptPair.weakPromptFa : disciplinePromptPair.weakPromptEn}
                </div>
                <p className="text-[11px] text-[#7f1d1d] dark:text-[#fca5a5] leading-relaxed">
                  {lang === "fa" ? disciplinePromptPair.weakCritiqueFa : disciplinePromptPair.weakCritiqueEn}
                </p>
              </div>

              {/* Good Prompt */}
              <div className="p-4 rounded-xl bg-[#ecfdf5] dark:bg-[#10241b] border border-[#34d399]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#047857] dark:text-[#34d399] flex items-center gap-1">
                    <span>✓</span>
                    <span>
                      {lang === "fa" ? `پرامپت مهندسی‌شده RCTO در ${discMeta.shortTitleFa}` : `Engineered RCTO Prompt (${discMeta.shortTitleEn})`}
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        lang === "fa" ? disciplinePromptPair.engineeredPromptFa : disciplinePromptPair.engineeredPromptEn,
                        "demo_disc_prompt"
                      )
                    }
                    className="text-[10px] font-semibold text-[#047857] dark:text-[#34d399] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === "demo_disc_prompt" ? (
                      <>
                        <Check className="w-3 h-3 text-[#059669]" />
                        <span>{lang === "fa" ? "کپی شد" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === "fa" ? "کپی پرامپت دیسیپلین" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-[#132b20] font-sans text-xs text-[#065f46] dark:text-[#a7f3d0] leading-relaxed space-y-1">
                  <div>
                    <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6] font-mono">[Role] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.role : disciplinePromptPair.engineeredBreakdownEn.role}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#00738c] dark:text-[#6ee7b7] font-mono">[Context] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.context : disciplinePromptPair.engineeredBreakdownEn.context}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#b87333] dark:text-[#e0a96d] font-mono">[Task] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.task : disciplinePromptPair.engineeredBreakdownEn.task}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2f7d5b] dark:text-[#63c496] font-mono">[Output] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.output : disciplinePromptPair.engineeredBreakdownEn.output}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#065f46] dark:text-[#6ee7b7] leading-relaxed">
                  {lang === "fa"
                    ? `مزیت: مدل دقیقاً با ضوابط ${discMeta.governingStandardsFa[0]} و شاخص‌های دیسیپلین پاسخ می‌دهد و نیازی به رفت و برگشت نیست.`
                    : `Advantage: The LLM complies directly with ${discMeta.governingStandardsEn[0]} and discipline KPIs with zero hallucination.`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: READY-TO-COPY PROMPT LIBRARY */}
      {(activeTab === 'all' || activeTab === 'prompts_library') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بخش ۳: کتابخانه پرامپت‌های آماده و کاربردی (کپی با یک کلیک)' : 'Section 3: Battle-Tested Prompt Templates (One-Click Copy)'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'این پرامپت‌ها را با یک کلیک کپی کنید یا در کارگاه تمرین بارگذاری نمایید و در ChatGPT یا Claude امتحان کنید.'
                    : 'Click to copy or load into the sandbox below. Paste directly into ChatGPT, Claude, or Gemini.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROMPT_LIBRARY.map((item) => {
              const activePromptText = lang === 'fa' ? item.promptFa : item.promptEn;
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] p-5 shadow-xs flex flex-col justify-between hover:border-[#1f5163] dark:hover:border-[#6fb3c6] transition-all space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#e3eef1] dark:bg-[#1e2a30] text-[#1f5163] dark:text-[#6fb3c6]">
                          {lang === 'fa' ? item.categoryFa : item.categoryEn}
                        </span>

                        <div className="flex flex-wrap items-center gap-1">
                          {item.targetTools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 font-mono"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                        {lang === 'fa' ? item.titleFa : item.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa' ? item.descriptionFa : item.descriptionEn}
                    </p>

                    <div className="relative rounded-lg bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 p-3 max-h-44 overflow-y-auto">
                      <pre className="text-xs font-sans text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-all">
                        {activePromptText}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                    <button
                      onClick={() => loadPromptToSandbox(activePromptText)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6] hover:underline"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'بارگذاری در کارگاه تست' : 'Load to Sandbox'}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(activePromptText, item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-all ${
                        isCopied
                          ? 'bg-[#2f7d5b] text-white'
                          : 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy Prompt'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 4: ENTERPRISE EXPERT SYSTEMS (GEMS, PROJECTS, ARTIFACTS, CONTRACTS & INDUSTRY) */}
      {(activeTab === 'all' || activeTab === 'advanced_features') && (
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#1b3a4b]/10 text-[#1b3a4b] dark:text-[#99e2b4]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'بخش ۴: سیستم‌های خبره سازمانی و مشاوران مدیریتی با Gems، Projects و Artifacts'
                    : 'Section 4: Enterprise Expert Systems with Gems, Projects & Artifacts'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'تبدیل مدل‌های زبانی عمومی به مشاوران دقیق حقوقی، مهندسی و مدیریت پروژه در صنایع سنگین و پیمانکاری'
                    : 'Transform generic LLMs into precision engineering, legal, and mega-project advisors.'}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Callout Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1f5163]/10 via-[#0f4c5c]/10 to-[#1b3a4b]/10 border border-[#1f5163]/30 text-xs sm:text-sm leading-relaxed text-[#1c2830] dark:text-[#e8ebe9]">
            <p className="font-medium">
              {lang === 'fa' ? (
                <>
                  ترکیب ابزارهای سفارشی‌سازی مانند <strong className="text-[#1a73e8] font-bold">Gems در جمینای</strong> و{' '}
                  <strong className="text-[#d97706] font-bold">Projects در کلود (Claude)</strong> همراه با قابلیت‌های{' '}
                  <strong className="text-[#10a37f] font-bold">Artifacts</strong> و{' '}
                  <strong className="text-[#1f5163] dark:text-[#6fb3c6] font-bold">System Instructions</strong>، مدل‌های زبانی عمومی را به سیستم‌های خبره سازمانی و مشاوران دقیق مدیریتی تبدیل می‌کند.
                </>
              ) : (
                <>
                  Combining customization engines like <strong>Gemini Gems</strong> and <strong>Claude Projects</strong> with <strong>Artifacts</strong> and <strong>System Instructions</strong> elevates generic LLMs into enterprise expert systems and rigorous management advisors.
                </>
              )}
            </p>
          </div>

          {/* Part 1: Core Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
              <span>{lang === 'fa' ? '۱. معماری هسته: تفکیک ابزارها و قابلیت‌ها' : '1. Core Architecture: Decoupling Tools & Capabilities'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instructions / Persona */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#1f5163] dark:text-[#6fb3c6]">
                  <Terminal className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'دستورالعمل‌های سیستمی (Instructions)' : 'System Instructions'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'تنظیم زاویه دید، دکترین تصمیم‌گیری، قالب‌بندی خروجی و محدودیت‌های تحلیلی مدل. در این بخش رفتار هوش مصنوعی از حالت یک چت‌بات عمومی خارج شده و نقاب یک نقش خاص سازمانی (Persona) را می‌پذیرد.'
                    : 'Governs decision doctrine, analytical bias, output schema, and boundaries. Strips casual chatbot traits to adopt a strict enterprise persona.'}
                </p>
              </div>

              {/* Gems / Projects */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6ee7b7]">
                  <FolderKanban className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'جم‌ها و پروژه‌ها (Gems / Projects)' : 'Gems & Projects (Knowledge Base)'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'ایجاد محیط‌های ایزوله همراه با مخزن دانشی اختصاصی (Knowledge Base). شما اسناد قراردادی، استانداردهای فنی، شرایط عمومی پیمان، یا نقشه‌ها را یک‌بار بارگذاری می‌کنید و مدل تمام خروجی‌های خود را فقط بر پایه آن داده‌ها مستند می‌کند.'
                    : 'Isolated workspaces with persistent ground-truth data. Upload technical codes, FIDIC clauses, or P&IDs once; the AI anchors all answers strictly to them.'}
                </p>
              </div>

              {/* Artifacts */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#b87333] dark:text-[#e0a96d]">
                  <Code className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'آرتیفکت‌ها (Artifacts)' : 'Artifacts Workspace'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'تفکیک گفت‌وگو از محصول نهایی کار. آرتیفکت بستری مستقل برای تدوین پیش‌نویس لوایح، تولید کدهای تحلیلی، نمودارهای جریان کار، داشبوردهای مدیریتی یا جداول ماتریس ریسک است که بدون به‌هم‌ریختگی محیط چت، قابل ویرایش و توسعه است.'
                    : 'Decouples dialogue from the work product. Standalone canvas for drafting formal claims, EVM dashboards, and risk matrices without cluttering chat history.'}
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Complex Contract & Claims Methodology */}
          <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#8c3b2d] dark:text-[#f87171]">
              <Scale className="w-5 h-5" />
              <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa'
                  ? '۲. متدولوژی تحلیل قراردادهای پیچیده با Gems و Projects'
                  : '2. Complex Contract & Claim Analysis Methodology with Gems/Projects'}
              </h3>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa'
                ? 'برای بررسی و ارزیابی ادعاها (Claims)، ریسک‌ها و تاخیرات قراردادی، چت معمولی پاسخگو نیست؛ باید یک Gem یا Project تخصصی تحلیل حقوقی و ادعا با پیکربندی زیر تعریف شود:'
                : 'For evaluating claims, risks, and project delay penalties, basic chat is insufficient. Deploy a dedicated Contract & Claim Analysis Gem:'}
            </p>

            {/* Knowledge Configuration Box */}
            <div className="p-3.5 rounded-lg bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 font-mono text-xs text-[#1c2830] dark:text-[#e8ebe9] space-y-1">
              <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6] block mb-1">
                {lang === 'fa' ? '[پیکربندی دانشی Gem / Project]:' : '[Gem / Project Knowledge Configuration]:'}
              </span>
              <div>• {lang === 'fa' ? 'بارگذاری شرایط عمومی و خصوصی پیمان (مانند نشریه ۴۳۱۱ یا فیدیک FIDIC نقره‌ای/زرد/قرمز)' : 'General & Particular Conditions of Contract (e.g., FIDIC Silver/Yellow/Red Books)'}</div>
              <div>• {lang === 'fa' ? 'بخشنامه‌های جبرانی (تعدیل آحاد بها، نوسان نرخ ارز، تمدید مدت پیمان)' : 'Statutory Compensation Circulars (Price Adjustments, FX Variations, EoT Guidelines)'}</div>
              <div>• {lang === 'fa' ? 'مکاتبات کارگاهی، صورت‌جلسات تحویل زمین و گزارش‌های روزانه پیشرفت پروژه' : 'Site correspondence, site possession protocols, and daily contractor logs'}</div>
            </div>

            {/* 3 Step Extraction Process */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa' ? 'فرایند استخراج خروجی تحلیلی در ۳ گام:' : '3-Step Analytical Extraction Process:'}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                  <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-1">
                    <span>۱.</span>
                    <span>{lang === 'fa' ? 'ماتریس تخصیص ریسک' : 'Risk Allocation Matrix'}</span>
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'استخراج تعهدات نامتقارن کارفرما/پیمانکار، بندهای مبهم در آزادسازی زمین، تحویل جبهه‌های کاری، یا فورس‌ماژور.'
                      : 'Uncovers asymmetrical clauses, land handover ambiguities, and force majeure liabilities.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                  <span className="font-bold text-[#00738c] dark:text-[#6ee7b7] flex items-center gap-1">
                    <span>۲.</span>
                    <span>{lang === 'fa' ? 'ارزیابی دعاوی تاخیرات و مالی' : 'Delay & Financial Claims'}</span>
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'انطباق مستندات روزانه با مواعد مندرج در ماده ۳۰ شرایط عمومی پیمان، بررسی ضرورت اخطار کتبی و تحلیل مسیر بحرانی (Critical Path).'
                      : 'Maps daily logs against Clause 30 deadlines, notice prerequisites, and critical path variance.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                  <span className="font-bold text-[#2f7d5b] dark:text-[#63c496] flex items-center gap-1">
                    <span>۳.</span>
                    <span>{lang === 'fa' ? 'تدوین لایحه دفاعیه در آرتیفکت' : 'Formal Defense in Artifact'}</span>
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'مدل متن رسمی دفاعیه را با استناد دقیق به شماره بندهای قرارداد و مستندات تاریخی داخل یک Artifact با فرمت نامه اداری رسمی تنظیم می‌کند.'
                      : 'Drafts hard-hitting official submission briefs citing exact contract clauses in a standalone Artifact.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Part 3: Industrial & Engineering Expert Assistants Table */}
          <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6fb3c6]">
              <Factory className="w-5 h-5" />
              <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa'
                  ? '۳. الگوی ساخت دستیارهای تخصصی صنعتی و فنی (مترو، پتروشیمی، حقوقی)'
                  : '3. Industrial & Technical Expert Assistant Patterns (Metro, Petrochemical, Legal)'}
              </h3>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'پیکربندی مخزن دانشی و نوع خروجی‌های آرتیفکت بر حسب رده تخصصی پروژه:'
                : 'Knowledge base taxonomy and Artifact deliverables categorized by engineering discipline:'}
            </p>

            <div className="overflow-x-auto rounded-lg border border-[#d9dad5] dark:border-[#2d3942]">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border-b border-[#d9dad5] dark:border-[#2d3942]">
                    <th className="p-3 font-bold w-1/4">
                      {lang === 'fa' ? 'رده تخصصی و نقش' : 'Discipline & Role'}
                    </th>
                    <th className="p-3 font-bold w-3/8">
                      {lang === 'fa' ? 'ساختار دانشی Gem / Project' : 'Gem / Project Knowledge Base'}
                    </th>
                    <th className="p-3 font-bold w-3/8">
                      {lang === 'fa' ? 'خروجی‌های کاربردی و نحوه استفاده در Artifact' : 'Applied Artifact Deliverables'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d9dad5]/60 dark:divide-[#2d3942]/60">
                  {/* Row 1: Metro */}
                  <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                    <td className="p-3 align-top font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-[#00738c] shrink-0" />
                        <span>{lang === 'fa' ? 'مدیر پروژه و مدیر فنی مترو' : 'Metro Project & Technical Director'}</span>
                      </div>
                    </td>
                    <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'مشخصات فنی عمومی و خصوصی تونل‌سازی، لاینینگ سگمنتی، رژیم حفاری TBM (مانند EPB)، سیستم پایدارسازی گود و ایستگاه‌ها، سازه نگهبان، و WBS پروژه.'
                        : 'Tunneling technical specs, segmental precast lining, EPB TBM excavation logs, deep excavation support, shoring systems, and project WBS.'}
                    </td>
                    <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                      <div>• {lang === 'fa' ? 'تحلیل انحرافات زمانی و ریالی با رویکرد ارزش کسب‌شده (EVM)' : 'EVM schedule and cost variance analysis'}</div>
                      <div>• {lang === 'fa' ? 'پیش‌نویس چک‌لیست‌های تحویل موقت قطعات لاینینگ و تزریق فوم' : 'Precast segment QA checklists & foam injection audits'}</div>
                      <div>• {lang === 'fa' ? 'سناریونویسی مدیریت ریسک برخورد با معارضات تاسیساتی شهری' : 'Urban utility clashes risk scenarios & shoring logs'}</div>
                    </td>
                  </tr>

                  {/* Row 2: Petrochemical */}
                  <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                    <td className="p-3 align-top font-bold text-[#0f4c5c] dark:text-[#6ee7b7]">
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4 text-[#0f4c5c] shrink-0" />
                        <span>{lang === 'fa' ? 'مدیر پتروشیمی و پالایشگاه' : 'Petrochemical & Refinery Lead'}</span>
                      </div>
                    </td>
                    <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'استانداردهای فرآیندی (ASME, API, IPS)، نقشه‌های P&ID، لاگ‌های تعمیرات و نگهداری، رویه‌های ایمنی HAZOP و استانداردهای متریال.'
                        : 'Process safety codes (ASME Sec VIII, API 1104, IPS), P&IDs, plant maintenance logs, HAZOP studies, metallurgy specs.'}
                    </td>
                    <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                      <div>• {lang === 'fa' ? 'بررسی عدم‌انطباق‌های متالورژیکی و پایپینگ با کد استاندارد' : 'Metallurgical & piping non-conformance audits against code'}</div>
                      <div>• {lang === 'fa' ? 'آماده‌سازی ماتریس بازرسی فنی و برنامه‌ریزی تست‌های هیدروستاتیک' : 'Technical inspection matrix & hydrotest scheduling'}</div>
                      <div>• {lang === 'fa' ? 'ساخت ماتریس علل ریشه‌ای (RCA) در توقفات عملیاتی واحدها' : 'Root Cause Analysis (RCA) matrices for operational trips'}</div>
                    </td>
                  </tr>

                  {/* Row 3: Legal & Contracts */}
                  <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                    <td className="p-3 align-top font-bold text-[#b87333] dark:text-[#e0a96d]">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#b87333] shrink-0" />
                        <span>{lang === 'fa' ? 'مشاور حقوقی و قراردادها' : 'Legal Counsel & Contract Advisor'}</span>
                      </div>
                    </td>
                    <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'قوانین بالادستی، آیین‌نامه معاملات، شرایط عمومی پیمان، رویه‌های قضایی و داوری بین‌المللی/داخلی.'
                        : 'Governing procurement laws, General Conditions of Contract, arbitration precedents, and statutory regulations.'}
                    </td>
                    <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                      <div>• {lang === 'fa' ? 'چک‌لیست انطباق‌سنجی قرارداد با قوانین حاکم پیش از امضا' : 'Pre-award contractual compliance and loophole audits'}</div>
                      <div>• {lang === 'fa' ? 'استخراج مهلت‌های انقضای ضمانت‌نامه‌ها، جرایم تاخیر و سقف تعدیل' : 'Bank guarantee expiry schedules, liquidated damages & cap tracking'}</div>
                      <div>• {lang === 'fa' ? 'ساخت جداول تعهدات متقابل در Artifact برای ارجاع سریع تیم اجرایی' : 'Reciprocal obligations matrices in Artifacts for site execution'}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Part 4 & 5: Operational Steps & Pre-deployment Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Operational Implementation Steps */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#1f5163] dark:text-[#6fb3c6]">
                <ListChecks className="w-5 h-5" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? '۴. مراحل عملیاتی راه‌اندازی دستیار اختصاصی' : '4. Operational Deployment Steps'}
                </h4>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                  <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6] block">
                    {lang === 'fa' ? 'گام ۱: پایه‌گذاری System Instruction' : 'Step 1: Anchor System Instruction'}
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'نقش را دقیق، بدون تعارف و با لحن مهندسی/حقوقی بنویسید (مثلاً: «تو سرپرست امور قراردادها و دعاوی فنی هستی؛ هیچ ادعایی را بدون ارجاع به ماده و تبصره صریح قرارداد و بخشنامه‌های سازمان برنامه نمی‌پذیری»).'
                      : 'Define the persona rigorously: "You are the Senior Claims Officer; reject any claim lacking explicit reference to contractual sub-clauses and verified logs."'}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                  <span className="font-bold text-[#00738c] dark:text-[#6ee7b7] block">
                    {lang === 'fa' ? 'گام ۲: تغذیه اسناد مرجع' : 'Step 2: Upload Ground-Truth Docs'}
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'نسخه‌های متنی تمیز و PDFهای دارای لایه متنی اسناد را مستقیماً به مخزن دانشی Gem یا Project بارگذاری کنید تا استنادها قطعی و بدون افت کیفیت باشد.'
                      : 'Upload clean, OCR-layered PDFs and structured markdown files directly into the Gem/Project Knowledge Base.'}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                  <span className="font-bold text-[#b87333] dark:text-[#e0a96d] block">
                    {lang === 'fa' ? 'گام ۳: تعریف ساختار خروجی با Artifacts' : 'Step 3: Direct Artifact Formatting'}
                  </span>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'به دستیار دستور دهید خلاصه‌ها را در قالب جداول چندمتغیره، پیش‌نویس مکاتبات را به صورت ساختار نامه‌ای رسمی، و داده‌های پیشرفت کار را به شکل کدهای داشبورد بصری تولید کند.'
                      : 'Direct the assistant to output briefs as formal letters and metrics as interactive tables in dedicated Artifacts.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#63c496]">
                <BookCheck className="w-5 h-5" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'چک‌لیست اعتبارسنجی پیش از استقرار Gem' : 'Pre-Deployment Validation Checklist'}
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <li className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                      {lang === 'fa' ? 'قید شرط عدم فرضیه‌سازی (Hallucination Guardrail):' : 'Strict Zero-Hallucination Guardrail:'}
                    </strong>
                    <span>
                      {lang === 'fa'
                        ? 'اطمینان از قرار دادن شروط عدم فرضیه‌سازی در بخش دستورالعمل تا مدل در صورت نبود داده در اسناد بارگذاری‌شده، اعلام بی‌اطلاعی کند.'
                        : 'Ensure instructions mandate stating "Information not found in reference documents" rather than guessing.'}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                      {lang === 'fa' ? 'طبقه‌بندی بر اساس اولویت حاکمیت اسناد:' : 'Contractual Order of Precedence:'}
                    </strong>
                    <span>
                      {lang === 'fa'
                        ? 'طبقه‌بندی اسناد بر اساس اولویت حاکمیت اسناد (مثلاً تقدم موافقت‌نامه بر شرایط عمومی و شرایط عمومی بر مشخصات فنی).'
                        : 'Explicitly enforce document hierarchy (Agreement > Particular Conditions > General Conditions > Technical Specs).'}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                      {lang === 'fa' ? 'یکپارچه‌سازی شیوه‌نامه مکاتبات رسمی:' : 'Corporate Letter & Tone Style Guide:'}
                    </strong>
                    <span>
                      {lang === 'fa'
                        ? 'یکپارچه‌سازی شیوه‌نامه نگارش مکاتبات رسمی سازمان در حافظه پایدار دستیار جهت انطباق ۱۰۰٪ با نامه‌های صادره سازمانی.'
                        : 'Embed the organization’s standard official letterhead format and diplomatic tone in persistent memory.'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: ENGINEERING DATA & DASHBOARD WORKSHOP (METRO & OIL/GAS) */}
      {(activeTab === 'all' || activeTab === 'engineering_dashboards') && (() => {
        const currentDataset = ENGINEERING_DATASETS.find(d => d.id === selectedDatasetId) || ENGINEERING_DATASETS[0];
        const claudePromptText = lang === 'fa' ? currentDataset.claudeDashboardPromptFa : currentDataset.claudeDashboardPromptEn;
        const geminiPromptText = lang === 'fa' ? currentDataset.geminiPythonAnalyticsPromptFa : currentDataset.geminiPythonAnalyticsPromptEn;
        const fullClaudePrompt = `${claudePromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;
        const fullGeminiPrompt = `${geminiPromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;

        return (
          <section className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'بخش ۵: کارگاه عملی تحلیل داده و ساخت داشبورد مهندسی با Claude و Gemini (مترو و نفت‌وگاز)'
                      : 'Section 5: Engineering Data & Dashboard Workshop with Claude & Gemini'}
                  </h2>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa'
                      ? 'دانلود فایل‌های CSV واقعی، پیش‌نمایش جداول داده، و پرامپت‌های آماده جهت تولید فوری داشبورد React در Claude Artifacts و تحلیل‌های پیش‌بینانه پایتون در Gemini.'
                      : 'Download real-world CSV engineering datasets, preview data matrices, and use one-click prompts for interactive React dashboards or Python analytics.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Dataset Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ENGINEERING_DATASETS.map((ds) => {
                const isSelected = ds.id === selectedDatasetId;
                return (
                  <button
                    key={ds.id}
                    onClick={() => setSelectedDatasetId(ds.id)}
                    className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'border-[#00738c] bg-[#e3eef1]/60 dark:bg-[#1b2c32] shadow-xs'
                        : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#00738c]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {ds.id === 'metro_station_tbm' && <Train className={`w-4 h-4 ${isSelected ? 'text-[#00738c]' : 'text-[#5d6b73]'}`} />}
                        {ds.id === 'oil_gas_pipeline_epc' && <Factory className={`w-4 h-4 ${isSelected ? 'text-[#00738c]' : 'text-[#5d6b73]'}`} />}
                        {ds.id === 'refinery_equipment_qa' && <Building2 className={`w-4 h-4 ${isSelected ? 'text-[#00738c]' : 'text-[#5d6b73]'}`} />}
                        <span className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? ds.titleFa : ds.titleEn}
                        </span>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#00738c] shrink-0" />}
                    </div>
                    <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                      {lang === 'fa' ? ds.domainFa : ds.domainEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Dataset Inspection Card */}
            <div className="p-5 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? currentDataset.domainFa : currentDataset.domainEn}
                    </span>
                    <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      {currentDataset.fileName} ({currentDataset.rowCount} {lang === 'fa' ? 'ردیف' : 'rows'} · {currentDataset.columnCount} {lang === 'fa' ? 'ستون' : 'cols'})
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? currentDataset.titleFa : currentDataset.titleEn}
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa' ? currentDataset.descriptionFa : currentDataset.descriptionEn}
                  </p>
                </div>

                {/* Direct File Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={currentDataset.fileDownloadPath}
                    download={currentDataset.fileName}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2f7d5b] hover:bg-[#25664a] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'دانلود فایل CSV' : 'Download CSV'}</span>
                  </a>

                  <button
                    onClick={() => {
                      copyToClipboard(currentDataset.rawCsv, 'raw_csv_' + currentDataset.id);
                      setCsvCopied(true);
                      setTimeout(() => setCsvCopied(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] hover:border-[#00738c] text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    {csvCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2f7d5b]" />
                        <span>{lang === 'fa' ? 'CSV کپی شد' : 'CSV Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی متن CSV' : 'Copy CSV Text'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#00738c]" />
                  <span>{lang === 'fa' ? 'پیش‌نمایش داده‌های نمونه (نمونه ۵ ردیف اول):' : 'Data Matrix Preview (First 5 Rows):'}</span>
                </span>

                <div className="overflow-x-auto rounded-xl border border-[#d9dad5] dark:border-[#2d3942] max-h-56">
                  <table className="w-full text-[11px] text-right font-mono border-collapse">
                    <thead>
                      <tr className="bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border-b border-[#d9dad5] dark:border-[#2d3942]">
                        {Object.keys(currentDataset.previewRows[0] || {}).map((colKey) => (
                          <th key={colKey} className="p-2.5 font-bold whitespace-nowrap">
                            {colKey}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d9dad5]/60 dark:divide-[#2d3942]/60">
                      {currentDataset.previewRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                          {Object.values(row).map((val, cIdx) => (
                            <td key={cIdx} className="p-2.5 whitespace-nowrap text-[#5d6b73] dark:text-[#9aa8b0]">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ready-to-Fire Prompts Grid (Claude Artifacts vs Gemini Python) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Claude Prompt Card */}
                <div className="p-4 rounded-xl border border-[#d97706]/40 bg-[#fffbeb]/40 dark:bg-[#2b1f09]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#b45309] dark:text-[#fbbf24]">
                        <Code className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'پرامپت Claude Artifacts (تولید داشبورد تعاملی React)' : 'Claude Artifacts React Dashboard Prompt'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#d97706]/10 text-[#d97706]">
                        Claude 3.5 Sonnet
                      </span>
                    </div>

                    <p className="text-[11px] text-[#78350f] dark:text-[#fde68a] leading-relaxed">
                      {lang === 'fa'
                        ? 'این پرامپت را در Claude کپی کنید تا بدون نیاز به کدنویسی، یک داشبورد کامل React با فیلترها، کارت‌های KPI و نمودارهای روند در یک آرتیفکت زنده تحویل بگیرید.'
                        : 'Generates an interactive, production-ready React + Tailwind dashboard in a live side-by-side Claude Artifact.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#d97706]/30 max-h-36 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{claudePromptText}</pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-[#d97706]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(fullClaudePrompt, 'claude_full_' + currentDataset.id);
                        setPromptWithDataCopiedId('claude_' + currentDataset.id);
                        setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {promptWithDataCopiedId === 'claude_' + currentDataset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => loadPromptToSandbox(fullClaudePrompt)}
                        className="px-2.5 py-1.5 text-[11px] font-semibold text-[#b45309] dark:text-[#fbbf24] hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                      </button>

                      <a
                        href="https://claude.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#b45309]/10 hover:bg-[#b45309]/20 text-[#b45309] dark:text-[#fbbf24] flex items-center gap-1 transition-colors"
                      >
                        <span>Claude</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Gemini Prompt Card */}
                <div className="p-4 rounded-xl border border-[#1a73e8]/40 bg-[#eff6ff]/40 dark:bg-[#0f1d38]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1d4ed8] dark:text-[#60a5fa]">
                        <Terminal className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'پرامپت Gemini (تحلیل آماری، رگرسیون و پایتون)' : 'Gemini Python Analytics & Forecasting'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#1a73e8]/10 text-[#1a73e8]">
                        Gemini 1.5 Pro
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1e40af] dark:text-[#93c5fd] leading-relaxed">
                      {lang === 'fa'
                        ? 'این پرامپت را در Gemini وارد کنید تا اسکریپت پایتون، مدل‌سازی رگرسیون تاخیرات، نمودار همبستگی آماری و تحلیل ریشه‌ای را اجرا کند.'
                        : 'Executes advanced Python regression models, schedule variance forecasts, and correlation analysis.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#1a73e8]/30 max-h-36 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{geminiPromptText}</pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-[#1a73e8]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(fullGeminiPrompt, 'gemini_full_' + currentDataset.id);
                        setPromptWithDataCopiedId('gemini_' + currentDataset.id);
                        setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {promptWithDataCopiedId === 'gemini_' + currentDataset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => loadPromptToSandbox(fullGeminiPrompt)}
                        className="px-2.5 py-1.5 text-[11px] font-semibold text-[#1a73e8] dark:text-[#60a5fa] hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                      </button>

                      <a
                        href="https://gemini.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#60a5fa] flex items-center gap-1 transition-colors"
                      >
                        <span>Gemini</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classroom Teaching Playbook */}
              <div className="p-4 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>{lang === 'fa' ? 'راهنمای ۳ مرحله‌ای برای استفاده مدرسان در کلاس درس:' : 'Classroom Playbook for Instructors:'}</span>
                </span>
                <ol className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-1 list-decimal list-inside leading-relaxed">
                  <li>
                    {lang === 'fa'
                      ? 'دیتاست مدنظر (مترو یا نفت‌وگاز) را از تب‌های بالا انتخاب کنید و روی کلید سبز «دانلود فایل CSV» کلیک کنید تا فایل روی سیستم ذخیره شود.'
                      : 'Select the desired domain dataset (Metro or Oil & Gas) and download the CSV file.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'کلید «کپی پرامپت + کل داده‌های CSV» مربوط به Claude یا Gemini را فشار دهید (متن پرامپت به‌همراه داده‌ها در حافظه قرار می‌گیرد).'
                      : 'Click "Copy Prompt + Full CSV" to place the prompt and data onto your clipboard.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'وارد claude.ai یا gemini.google.com شوید، متن را پیست کنید و اینتر را بزنید. در کمتر از ۲۰ ثانیه، یک داشبورد زنده یا تحلیل پایتون برای مخاطبان به نمایش درمی‌آید!'
                      : 'Open Claude or Gemini, paste the prompt, and press enter to showcase live Artifact dashboards in under 20 seconds!'}
                  </li>
                </ol>
              </div>
            </div>
          </section>
        );
      })()}

      {/* SECTION 6: CONTRACTS & ASSISTANTS WORKSHOP (GEMS & PROJECTS) */}
      {(activeTab === 'all' || activeTab === 'contracts_and_gems') && (() => {
        const currentContract = ENGINEERING_CONTRACTS.find(c => c.id === selectedContractId) || ENGINEERING_CONTRACTS[0];
        const geminiInst = lang === 'fa' ? currentContract.geminiSystemInstructionFa : currentContract.geminiSystemInstructionEn;
        const claudeInst = lang === 'fa' ? currentContract.claudeSystemInstructionFa : currentContract.claudeSystemInstructionEn;

        return (
          <section className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                  <ScrollText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'بخش ۶: کارگاه تحلیل قراردادهای EPC (مترو و نفت‌وگاز) و ساخت دستیار در Gems و Projects'
                      : 'Section 6: Specimen Engineering Contracts & Custom Assistant Setup in Gems & Projects'}
                  </h2>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa'
                      ? 'دانلود متن کامل قراردادها با فرمت Markdown، دریافت System Instruction اختصاصی برای ساخت Gem و Project، و پرسش‌های نمونه برای آزمون ادعاها و تاخیرات.'
                      : 'Download full contracts in Markdown, copy tailored System Instructions for Gemini Gems & Claude Projects, and run simulated claims and delay queries.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Contract Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ENGINEERING_CONTRACTS.map((contract) => {
                const isSelected = contract.id === selectedContractId;
                return (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContractId(contract.id)}
                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between gap-2.5 ${
                      isSelected
                        ? 'border-[#b87333] bg-[#fffaf5] dark:bg-[#2b1f09]/40 shadow-xs'
                        : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#b87333]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {contract.id === 'metro_tunnel_contract' && <Train className={`w-4 h-4 ${isSelected ? 'text-[#b87333]' : 'text-[#5d6b73]'}`} />}
                        {contract.id === 'oil_gas_epc_contract' && <Factory className={`w-4 h-4 ${isSelected ? 'text-[#b87333]' : 'text-[#5d6b73]'}`} />}
                        <span className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? contract.titleFa : contract.titleEn}
                        </span>
                      </div>
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#b87333] shrink-0" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                      <span className="px-2 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                        {lang === 'fa' ? contract.governingStandardFa : contract.governingStandardEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Contract Details & Markdown View */}
            <div className="p-5 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                      {lang === 'fa' ? currentContract.governingStandardFa : currentContract.governingStandardEn}
                    </span>
                    <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      {currentContract.fileName}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? currentContract.titleFa : currentContract.titleEn}
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa' ? currentContract.summaryFa : currentContract.summaryEn}
                  </p>
                </div>

                {/* Direct Actions: Download & Copy Markdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={currentContract.fileDownloadPath}
                    download={currentContract.fileName}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2f7d5b] hover:bg-[#25664a] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'دانلود فایل قرارداد (.md)' : 'Download Contract (.md)'}</span>
                  </a>

                  <button
                    onClick={() => {
                      copyToClipboard(currentContract.markdownContent, 'contract_md_' + currentContract.id);
                      setContractCopied(true);
                      setTimeout(() => setContractCopied(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] hover:border-[#b87333] text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    {contractCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2f7d5b]" />
                        <span>{lang === 'fa' ? 'متن کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی متن کامل قرارداد' : 'Copy Full Contract'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Scrollable Contract Markdown Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#b87333]" />
                  <span>{lang === 'fa' ? 'پیش‌نمایش مواد و متن قرارداد (Markdown):' : 'Contract Text Preview (Markdown):'}</span>
                </span>

                <div className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 max-h-60 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed whitespace-pre-wrap">
                  {currentContract.markdownContent}
                </div>
              </div>

              {/* System Instructions Cards for Gemini Gems vs Claude Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Gemini Gem System Instruction */}
                <div className="p-4 rounded-xl border border-[#1a73e8]/40 bg-[#eff6ff]/40 dark:bg-[#0f1d38]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1d4ed8] dark:text-[#60a5fa]">
                        <Bot className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'دستورالعمل سیستمی برای Gemini Gems' : 'Gemini Gems System Instruction'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#1a73e8]/10 text-[#1a73e8]">
                        Gemini Gem Persona
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1e40af] dark:text-[#93c5fd] leading-relaxed">
                      {lang === 'fa'
                        ? 'این متن را در بخش Instructions جمینای Gem کپی کرده و فایل قرارداد MD بالا را در بخش دانش (Knowledge) بارگذاری کنید.'
                        : 'Paste this prompt in Gemini Gem Instructions and upload the MD contract file as Knowledge.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#1a73e8]/30 max-h-40 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{geminiInst}</pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1a73e8]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(geminiInst, 'gem_inst_' + currentContract.id);
                        setInstructionCopiedId('gem_' + currentContract.id);
                        setTimeout(() => setInstructionCopiedId(null), 2500);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {instructionCopiedId === 'gem_' + currentContract.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'دستورالعمل کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی دستورالعمل Gem' : 'Copy Gem Instruction'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href="https://gemini.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#60a5fa] flex items-center gap-1 transition-colors"
                    >
                      <span>Gemini Gems</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Claude Projects Custom Instruction */}
                <div className="p-4 rounded-xl border border-[#d97706]/40 bg-[#fffbeb]/40 dark:bg-[#2b1f09]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#b45309] dark:text-[#fbbf24]">
                        <FolderKanban className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'دستورالعمل سیستمی برای Claude Projects' : 'Claude Projects Custom Instructions'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#d97706]/10 text-[#d97706]">
                        Claude Project Prompt
                      </span>
                    </div>

                    <p className="text-[11px] text-[#78350f] dark:text-[#fde68a] leading-relaxed">
                      {lang === 'fa'
                        ? 'این متن را در بخش Custom Instructions پروژه کلود کپی کرده و فایل قرارداد MD بالا را در Project Knowledge بارگذاری کنید.'
                        : 'Paste this in Claude Project Instructions and upload the MD contract file into Project Knowledge.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#d97706]/30 max-h-40 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{claudeInst}</pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#d97706]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(claudeInst, 'claude_inst_' + currentContract.id);
                        setInstructionCopiedId('claude_' + currentContract.id);
                        setTimeout(() => setInstructionCopiedId(null), 2500);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {instructionCopiedId === 'claude_' + currentContract.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'دستورالعمل کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی دستورالعمل Project' : 'Copy Project Instruction'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href="https://claude.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#b45309]/10 hover:bg-[#b45309]/20 text-[#b45309] dark:text-[#fbbf24] flex items-center gap-1 transition-colors"
                    >
                      <span>Claude Projects</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sample Test Queries for Students & Practitioners */}
              <div className="space-y-3 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-[#b87333]" />
                  <span>{lang === 'fa' ? 'پرسش‌های نمونه برای آزمایش و ارزیابی دستیار قرارداد (قابل کپی با یک کلیک):' : 'Sample Test Prompts to Query the Contract Assistant:'}</span>
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentContract.sampleTestQueries.map((q, qIdx) => {
                    const activeQueryText = lang === 'fa' ? q.queryFa : q.queryEn;
                    const queryKey = `contract_q_${currentContract.id}_${qIdx}`;
                    const isCopied = copiedId === queryKey;

                    return (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <h5 className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                            {lang === 'fa' ? q.titleFa : q.titleEn}
                          </h5>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono leading-relaxed bg-white dark:bg-[#151515] p-2 rounded-lg border border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                            {activeQueryText}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-1 pt-1">
                          <button
                            onClick={() => loadPromptToSandbox(activeQueryText)}
                            className="text-[10px] font-semibold text-[#1f5163] dark:text-[#6fb3c6] hover:underline flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>{lang === 'fa' ? 'کارگاه' : 'Sandbox'}</span>
                          </button>

                          <button
                            onClick={() => copyToClipboard(activeQueryText, queryKey)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                              isCopied
                                ? 'bg-[#2f7d5b] text-white'
                                : 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-white" />
                                <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Classroom Setup Guide */}
              <div className="p-4 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>{lang === 'fa' ? 'راهنمای ۴ مرحله‌ای ساخت دستیار قرارداد در کلاس درس:' : '4-Step Classroom Setup Guide:'}</span>
                </span>
                <ol className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-1 list-decimal list-inside leading-relaxed">
                  <li>
                    {lang === 'fa'
                      ? 'فایل قرارداد MD را با کلید سبز بالا دانلود کنید و در سیستم خود نگه دارید.'
                      : 'Download the MD contract file using the green button above.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'در Claude به منوی Projects -> New Project بروید (یا در Gemini به منوی Gems -> New Gem).'
                      : 'In Claude go to Projects -> New Project (or in Gemini to Gems -> New Gem).'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'فایل قرارداد MD را در بخش فایل‌های دانش (Project Knowledge / Files) بارگذاری کنید.'
                      : 'Upload the downloaded MD contract file into Project Knowledge / Files.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'دستورالعمل سیستمی (System Instruction) بالا را کپی کرده و در بخش Instructions ذخیره کنید؛ دستیار اختصاصی شما آماده پاسخ‌گویی به دعاوی و تاخیرات است!'
                      : 'Paste the System Instruction above into the assistant instructions and hit save; your specialized contract advisor is live!'}
                  </li>
                </ol>
              </div>
            </div>
          </section>
        );
      })()}

      {/* SECTION 7: CLAUDE ENTERPRISE & GOOGLE CONNECTORS (GMAIL, DRIVE, CALENDAR, SLACK & NOTION MCP) */}
      {(activeTab === 'all' || activeTab === 'connectors') && (
        <ClaudeEnterpriseConnectors
          lang={lang}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SECTION 8: GOOGLE NOTEBOOKLM MEGA-WORKSHOP */}
      {(activeTab === 'all' || activeTab === 'notebooklm') && (
        <NotebookLmWorkshop
          lang={lang}
          onLoadToSandbox={loadPromptToSandbox}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SECTION 8: ADVANCED ENGINEERING MASTERCLASS */}
      {(activeTab === 'all' || activeTab === 'masterclass') && (
        <Page0EngineeringMasterclass
          lang={lang}
          onLoadToSandbox={loadPromptToSandbox}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SECTION 9: SAFETY GUARDRAILS & HALLUCINATION DEFENSE */}
      {(activeTab === 'all' || activeTab === 'safety') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#8c3b2d]/10 text-[#8c3b2d] dark:text-[#f87171]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بخش ۹: خطوط قرمز امنیتی، حریم داده و مهار خطای توهم (Hallucination)' : 'Section 9: Security Guardrails & Hallucination Mitigation'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'هوش مصنوعی ابزاری احتمالی (Probabilistic) است، نه قطعی. این اصول را برای حفاظت از اسرار سازمان رعایت کنید.'
                    : 'Cognitive models are probabilistic, not deterministic. Protect proprietary data and control accuracy.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Rule 1: Data Privacy & PII */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#b91c1c] dark:text-[#f87171]">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'سه قانون سفت و سخت حریم خصوصی و امنیت' : '3 Non-Negotiable Privacy Rules'}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#b91c1c] dark:text-[#f87171] font-bold">۱.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'عدم درج اطلاعات هویتی و مالی (PII):' : 'Never paste PII:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'شماره ملی، رمزهای عبور، شماره کارت، و مشخصات محرمانه مشتریان را هرگز در چت عمومی وارد نکنید.'
                      : 'Never enter national IDs, passwords, bank numbers, or confidential customer identifiers into public LLM chats.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b91c1c] dark:text-[#f87171] font-bold">۲.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'خاموش کردن آموزش روی داده‌ها:' : 'Disable Model Training on Your Chats:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'در تنظیمات ChatGPT گزینه Data Controls -> Improve the model for everyone را در حساب‌های شخصی خاموش کنید.'
                      : 'In ChatGPT settings, turn off "Improve the model for everyone" to prevent chats being used in training sets.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b91c1c] dark:text-[#f87171] font-bold">۳.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'ماسک‌گذاری نام‌ها:' : 'Pseudonymize & Mask Names:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'به جای نام مشتری یا شرکت رقیب واقعی، از نام‌های فرضی مانند «مشتری X» یا «شرکت آلفا» استفاده کنید.'
                      : 'Replace actual client or competitor names with placeholders like "Company Alpha" or "Client X".'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Rule 2: Hallucination Mitigation */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6fb3c6]">
                <Info className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'تکنیک‌های جلوگیری از خطای توهم (Hallucination)' : 'Tactics to Squash Hallucinations'}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">۱.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'جمله جادویی «نمی‌دانم»:' : 'Permit Admitting Ignorance:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'همیشه به پرامپت اضافه کنید: «اگر پاسخ دقیق را بر اساس داده‌های ارائه شده نمی‌دانی، حدس نزن و صریحاً بگو نمی‌دانم».'
                      : 'Explicitly state: "If the exact answer is not in the text, do not guess; state that you do not know."'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">۲.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'الزام به ارجاع (Citation):' : 'Demand Source Citations:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'از مدل بخواهید برای هر ادعا یا آمار، شماره صفحه یا بند دقیق سند مرجع را ذکر کند.'
                      : 'Instruct the model to cite the exact section or paragraph for every factual claim.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">۳.</span>
                  <span>
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'استراتژی گام‌به‌گام (Iterative):' : 'Iterative Step-by-Step Refinement:'}
                    </strong>{' '}
                    {lang === 'fa'
                      ? 'انتظار نداشته باشید کل پروژه با ۱ پرامپت حل شود؛ ابتدا سرفصل بگیرید، سپس بند به بند گسترش دهید.'
                      : 'Never expect a final deliverable in a single turn. Request an outline first, critique it, then expand.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: INTERACTIVE PRACTICE SANDBOX */}
      {(activeTab === 'all' || activeTab === 'sandbox') && (
        <section id="prompt-sandbox" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#63c496]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بخش ۱۰: کارگاه شخصی‌سازی و تست پرامپت (Sandbox)' : 'Section 10: Interactive Prompt Customization Sandbox'}
                </h2>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'پرامپت خود را در این جعبه ویرایش و شخصی‌سازی کنید، سپس با یک کلیک کپی کرده و در یکی از مدل‌ها اجرا نمایید.'
                    : 'Draft, tweak, and personalize your prompt here. Click to copy and launch in ChatGPT, Claude, or Gemini.'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'پیش‌نویس پرامپت اختصاصی شما:' : 'Your Custom Prompt Draft:'}
              </span>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    onChangeContent(
                      lang === 'fa'
                        ? disciplinePromptPair.engineeredPromptFa
                        : disciplinePromptPair.engineeredPromptEn
                    )
                  }
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#1f5163]/10 hover:bg-[#1f5163]/20 text-[#1f5163] dark:text-[#6fb3c6] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>
                    {lang === 'fa'
                      ? `بارگذاری الگوی دیسیپلین ${discMeta.shortTitleFa}`
                      : `Load ${discMeta.shortTitleEn} Template`}
                  </span>
                </button>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? `${content.trim().length ? content.trim().split(/\s+/).length : 0} واژه · ${content.length} کاراکتر`
                    : `${content.trim().length ? content.trim().split(/\s+/).length : 0} words · ${content.length} chars`}
                </span>
                {content && (
                  <button
                    onClick={() => onChangeContent('')}
                    className="flex items-center gap-1 text-[11px] text-[#b91c1c] dark:text-[#f87171] hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'fa' ? 'پاک کردن' : 'Clear'}</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={8}
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              placeholder={
                lang === 'fa'
                  ? 'پرامپت خود را اینجا بنویسید، یا از بخش کتابخانه پرامپت‌های بالا یکی را انتخاب کنید تا اینجا بارگذاری شود...\nفرمول RCTO را فراموش نکنید:\n[Role] تو مشاور ارشد...\n[Context] شرکت ما...\n[Task] این ۵ کار را انجام بده...\n[Output] در قالب جدول...'
                  : 'Type your prompt here, or pick one from the library above...\nRemember the RCTO formula:\n[Role] You are a lead...\n[Context] Our organization...\n[Task] Perform these 5 steps...\n[Output] In a structured table...'
              }
              className="w-full p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdfdfd] dark:bg-[#12171b] text-xs sm:text-sm font-mono text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#1f5163] dark:focus:ring-[#6fb3c6] transition-all resize-y"
            />

            {/* Quick Action & Launch Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                onClick={copySandboxToClipboard}
                disabled={!content.trim()}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                  sandboxCopied
                    ? 'bg-[#2f7d5b] text-white'
                    : content.trim()
                    ? 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                    : 'bg-[#d9dad5] dark:bg-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0] cursor-not-allowed'
                }`}
              >
                {sandboxCopied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{lang === 'fa' ? 'پرامپت با موفقیت کپی شد!' : 'Copied to Clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'کپی پرامپت آماده' : 'Copy Prompt'}</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-medium hidden md:inline">
                  {lang === 'fa' ? 'تست فوری در:' : 'Test in:'}
                </span>

                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#10a37f]/10 hover:bg-[#10a37f]/20 text-[#10a37f] border border-[#10a37f]/30 text-xs font-semibold transition-colors"
                >
                  <span>ChatGPT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#d97706]/10 hover:bg-[#d97706]/20 text-[#d97706] border border-[#d97706]/30 text-xs font-semibold transition-colors"
                >
                  <span>Claude</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] border border-[#1a73e8]/30 text-xs font-semibold transition-colors"
                >
                  <span>Gemini</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prominent Footer Call to Action: Proceed to Page 1 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#e3eef1] via-[#d7e8ec] to-[#cbe2e8] dark:from-[#1b2c32] dark:via-[#16252b] dark:to-[#121e23] border border-[#1f5163]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-right">
          <span className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] block">
            {lang === 'fa' ? 'پایان پیش‌نیاز · ورود به متدولوژی استاندارد پروژه' : 'Prerequisite Complete · Enter Official CPMAI Standard'}
          </span>
          <h4 className="text-sm sm:text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
            {lang === 'fa'
              ? 'ورود به فاز اول CPMAI: درک کسب‌وکار (صفحه ۱ از ۵)'
              : 'Proceed to CPMAI Phase I: Business Understanding (Page 1)'}
          </h4>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {lang === 'fa'
              ? 'اکنون که جعبه‌ابزار LLM را در اختیار دارید، تعریف نیازمندی‌ها، اهداف و داستان کاربر پروژه هوش مصنوعی را آغاز کنید.'
              : 'Armed with the LLM toolkit, define business goals, constraints, and sprint user stories.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToPage1}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-[#0a7b97] hover:bg-[#08677e] text-white transition-all shadow-sm hover:scale-[1.02] shrink-0"
        >
          <span>{lang === 'fa' ? 'شروع فاز اول CPMAI (صفحه ۱)' : 'Start CPMAI Phase I (Page 1)'}</span>
          {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
