import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  Gauge,
  Sliders,
  Database,
  Users,
  HardDrive,
  ShieldCheck,
  Clock,
  Info,
  Layers,
  Brain,
  Activity,
  BarChart3,
  GitBranch,
  Calendar,
  Lock
} from 'lucide-react';

interface Page17Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage16: () => void;
  onGoToPage18?: () => void;
}

interface ConstraintCategory {
  id: string;
  titleEn: string;
  titleFa: string;
  iconName: string;
  itemsEn: string[];
  itemsFa: string[];
  mitigationEn: string;
  mitigationFa: string;
}

interface CaseStudyPreset {
  id: string;
  titleEn: string;
  titleFa: string;
  domainEn: string;
  domainFa: string;
  badgeColor: string;
  constraintsEn: string;
  constraintsFa: string;
  performanceTargetEn: string;
  performanceTargetFa: string;
}

export const Page17ProjectConstraintsAndModelPerformance: React.FC<Page17Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage16,
  onGoToPage18
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'categories' | 'performance_intro' | 'guide'>('canvas');
  const [selectedCase, setSelectedCase] = useState<string>('xyz_support');
  const [copied, setCopied] = useState(false);
  const [showHelperPrompt, setShowHelperPrompt] = useState(true);

  // Constraint Categories according to CPMAI methodology
  const constraintCategories: ConstraintCategory[] = [
    {
      id: 'tech_data',
      titleEn: 'Technological & Data Constraints',
      titleFa: 'محدودیت‌های فنی، زیرساختی و داده‌ای',
      iconName: 'Database',
      itemsEn: [
        'Practical dataset size limit: maximum logs ingestible per training epoch without exceeding cloud compute budget.',
        'Inference latency SLA: chatbot response generation must finish within 1.5 seconds under peak concurrency.',
        'Legacy API connectivity: CRM REST endpoints only support rate-limits of 50 req/sec.',
        'Data variety & noise: historical chat transcripts contain typos, colloquial slang, and mixed language tokens.'
      ],
      itemsFa: [
        'محدودیت حجم عملی داده‌ها: سقف داده‌های قابل پردازش در هر دور آموزش بدون نقض بودجه ابری.',
        'آستانه تاخیر استنتاج (Latency SLA): مدل باید در ساعات اوج ظرف حداکثر ۱.۵ ثانیه پاسخ تولید کند.',
        'محدودیت نرخ تبادل APIهای قدیمی: وب‌سرویس CRM دارای محدودیت ۵۰ درخواست در ثانیه است.',
        'تنوع و نویز داده‌ها: گفتگوهای گذشته حاوی غلط‌های املایی، اصطلاحات عامیانه و متن‌های دوزبانه است.'
      ],
      mitigationEn: 'Pre-process text with robust spell-checkers, implement Redis caching for frequent queries, and test with synthetic load generators.',
      mitigationFa: 'پیش‌پردازش متن با تصحیح‌کننده‌های خودکار، کش‌گذاری پاسخ‌های پرشمار در Redis، و آزمون با بار ترافیکی شبیه‌سازی‌شده.'
    },
    {
      id: 'resource_talent',
      titleEn: 'Resource & Personnel Availability Constraints',
      titleFa: 'محدودیت‌های در دسترس بودن منابع انسانی و متخصصان',
      iconName: 'Users',
      itemsEn: [
        'Subject Matter Expert (SME) availability: customer support leads can only dedicate 4 hours/week for review.',
        'Sole internal data scientist: single point of failure for model tuning and pipeline updates.',
        'Contractor budget ceiling: consulting hours capped at $250,000 to keep overall project spend under $1M.'
      ],
      itemsFa: [
        'محدودیت زمان کارشناسان ارشد (SMEs): لیدهای پشتیبانی حداکثر ۴ ساعت در هفته برای بازبینی سناریوها فرصت دارند.',
        'تنها یک دانشمند داده داخلی: وجود نقطه شکست منفرد (SPOF) در فرآیند تیونینگ مدل.',
        'سقف بودجه مشاور بیرونی: حداکثر ۲۵۰,۰۰۰ دلار برای برون‌سپاری جهت باقی ماندن زیر سقف بودجه ۱ میلیون دلاری.'
      ],
      mitigationEn: 'Schedule fixed weekly annotation review blocks and enforce strict documentation of model configurations.',
      mitigationFa: 'تعیین زمان‌بندی ثابت هفتگی برای اعتبارسنجی داده‌ها و مستندسازی دقیق تنظیمات مدل برای تسهیل جایگزینی.'
    },
    {
      id: 'legal_compliance',
      titleEn: 'Legal, Privacy & Regulatory Constraints',
      titleFa: 'محدودیت‌های قانونی، حریم خصوصی و انطباق با مقررات',
      iconName: 'ShieldCheck',
      itemsEn: [
        'CCPA & GDPR compliance: customer personal details (names, credit card tokens, addresses) must never be stored in plain text.',
        'Data retention policy: chat logs older than 24 months must be purged or irreversibly anonymized.',
        'Model IP & data ownership: third-party foundational LLM providers must not train on customer inputs.'
      ],
      itemsFa: [
        'انطباق با مقررات CCPA و GDPR: اطلاعات هویتی و پرداختی مشتریان هرگز نباید در حافظه مدل یا لاگ‌ها به صورت خام ذخیره شود.',
        'سیاست نگهداری داده‌ها: لاگ‌های بیش از ۲۴ ماه باید امحاء شده یا به صورت برگشت‌ناپذیر ناشناس‌سازی شوند.',
        'مالکیت معنوی داده‌ها: ارائه‌دهنده سرویس ابری هوش مصنوعی نباید از مکالمات مشتریان برای آموزش مدل‌های عمومی خود استفاده کند.'
      ],
      mitigationEn: 'Enforce enterprise data-masking pipelines before model feeding; sign zero-data-retention agreements with AI vendors.',
      mitigationFa: 'استفاده از پایپ‌لاین ماسک‌گذاری خودکار داده‌های حساس (PII) و فعال‌سازی توافق‌نامه عدم ذخیره داده (Zero-Data-Retention) با تامین‌کننده کلود.'
    },
    {
      id: 'operational_season',
      titleEn: 'Operational & Seasonal Timing Constraints',
      titleFa: 'محدودیت‌های عملیاتی، تقویمی و فصول اوج فروش',
      iconName: 'Calendar',
      itemsEn: [
        'Code Freeze: IT strictly prohibits production deployments 3 weeks prior to Black Friday and Christmas.',
        'Customer service team shifts: training on chatbot escalation workflows must finish by end of Month 3.',
        'Server capacity during seasonal peaks: retail traffic spikes 5x; infrastructure auto-scaling must be stress-tested.'
      ],
      itemsFa: [
        'فریز کد (Code Freeze): واحد فناوری اطلاعات اعمال هرگونه تغییر بر سرور پروداکشن را ۳ هفته مانده به بلک‌فرایدی ممنوع کرده است.',
        'شیفت‌های کاری پشتیبانی: آموزش پرسنل برای کار با پنل ارجاع چت‌بات باید دقیقاً تا پایان ماه سوم تکمیل شود.',
        'ظرفیت سرورها در ایام پیک: ترافیک سایت در ایام عید ۵ برابر می‌شود؛ مقیاس‌پذیری زیرساخت باید از قبل زیر بار شدید تست شود.'
      ],
      mitigationEn: 'Back-calculate milestone deadlines from code freeze date; run automated load tests in Month 3.',
      mitigationFa: 'محاسبه معکوس ددلاین‌ها از تاریخ آغاز فریز سرورها، و اجرای تست بار ترافیکی تا انتهای ماه سوم.'
    }
  ];

  // Case study presets
  const presets: CaseStudyPreset[] = [
    {
      id: 'xyz_support',
      titleEn: 'XYZ Company Customer Support Chatbot (Slide 27 Exemplar)',
      titleFa: 'چت‌بات پشتیبانی مشتریان شرکت XYZ (نمونه استاندارد اسلاید ۲۷)',
      domainEn: 'E-Commerce / Level 1 Support Automation',
      domainFa: 'تجارت الکترونیک / پشتیبانی سطح ۱ مشتریان',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      constraintsEn: `Project Constraints & Operational Boundaries:
1. Budgetary Ceiling:
   - Total expenditures must remain strictly below $1,000,000 (50% of annual $2M support budget) covering AI licensing, cloud GPUs, CRM integration, and consultancy.
2. Dataset Limits & Quality:
   - Available data consists of 100,000 historical chat logs and 300 FAQs.
   - Roughly 15% of historical transcripts contain spelling typos or unsupported multi-lingual fragments requiring heavy noise filtering.
3. System Integration & Legacy API Constraints:
   - Direct database access to the proprietary CRM is restricted; all interactions must rely on REST endpoints with an SLA of < 200ms.
4. Regulatory & Data Governance:
   - CCPA regulations mandate automated PII redaction (names, phone numbers, addresses) before model training or third-party API exposure.
5. Calendar & Seasonal Cutoff:
   - Project must achieve MVP production readiness within 4 months to prevent rollout during holiday peak shopping code freezes.`,
      constraintsFa: `محدودیت‌های تکمیلی و مرزهای عملیاتی پروژه (شرکت XYZ):
۱. سقف بودجه مالی:
   - کل هزینه‌های پروژه (لایسنس، هاستینگ ابری، یکپارچه‌سازی API و مشاوره) باید اکیداً زیر ۱,۰۰۰,۰۰۰ دلار (کمتر از ۵۰٪ بودجه سالانه پشتیبانی ۲ میلیون دلاری) بماند.
۲. محدودیت‌های کمی و کیفی داده‌ها:
   - دیتاست در دسترس شامل ۱۰۰,۰۰۰ گفتگوی متنی ۲ سال گذشته و ۳۰۰ پرسش متداول (FAQ) است.
   - حدود ۱۵٪ لاگ‌های قدیمی حاوی غلط‌های املایی، کلمات شکسته یا زبان‌های دیگر است که نیازمند پیش‌پردازش سنگین و فیلتر نویز است.
۳. محدودیت‌های یکپارچگی و وب‌سرویس‌های قدیمی:
   - دسترسی مستقیم به پایگاه داده سامانه CRM ممنوع است؛ تبادل داده صرفاً از طریق REST API با زمان پاسخ کمتر از ۲۰۰ میلی‌ثانیه مجاز است.
۴. حریم خصوصی و انطباق قانونی:
   - قوانین حریم خصوصی کالیفرنیا (CCPA) حذف خودکار اطلاعات هویتی حساس (نام، شماره تماس، کارت بانکی) پیش از پردازش در مدل را الزامی می‌سازد.
۵. ددلاین قطعی فصلی:
   - تحویل نسخه MVP باید ظرف ۴ ماه نهایی شود تا تلاقی با دوره فریز سیستمی (Code Freeze) تعطیلات پایان سال رخ ندهد.`,
      performanceTargetEn: `Initial Model Performance Targets (Phase I Exploration):
- Minimum Recall on Level 1 Routine Queries: >= 85%
- Maximum False Positive Rate (FPR) on policy questions: <= 5%
- Expected Intent Classification Accuracy: >= 88%`,
      performanceTargetFa: `اهداف اولیه عملکرد مدل (اکتشاف فاز اول):
- حداقل Recall برای سوالات متداول سطح ۱: ≥ ۸۵٪
- حداکثر نرخ خطای نوع اول (False Positive Rate) در پاسخ به مقررات: ≤ ۵٪
- دقت مورد انتظار تشخیص قصد کاربر (Accuracy): ≥ ۸۸٪`
    },
    {
      id: 'fraud_prevention',
      titleEn: 'Banking Fraud Prevention System',
      titleFa: 'سیستم هوشمند کشف تقلب تراکنش‌های بانکی',
      domainEn: 'FinTech / High-Speed Transaction Auditing',
      domainFa: 'فین‌تک / ممیزی سرعت‌بالای تراکنش‌های بانکی',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      constraintsEn: `Project Constraints:
- Strict sub-50 millisecond inference constraint per payment swipe.
- Regulatory requirement: zero PII leakage under PCI-DSS certification.
- Massive class imbalance: fraudulent transactions represent fewer than 0.02% of total dataset.`,
      constraintsFa: `محدودیت‌های پروژه:
- محدودیت تاخیر استنتاج اکیداً زیر ۵۰ میلی‌ثانیه برای هر تراکنش کارتی.
- الزامات قانونی انطباق کامل با استاندارد PCI-DSS بدون نشت اطلاعات حساب.
- عدم توازن شدید داده‌ها (Class Imbalance): تراکنش‌های متقلبانه کمتر از ۰.۰۲٪ کل دیتاست را تشکیل می‌دهند.`,
      performanceTargetEn: `Performance Targets:
- Target Recall: >= 92% (catching fraudulent attempts)
- False Positive Rate: <= 0.8% to avoid blocking legitimate cardholders.`,
      performanceTargetFa: `اهداف عملکرد مدل:
- حداقل Recall هدف: ≥ ۹۲٪ (کشف حداکثری تقلب)
- حداکثر False Positive Rate: ≤ ۰.۸٪ برای جلوگیری از مسدودسازی اشتباه کارت مشتریان عادی.`
    }
  ];

  const handleApplyPreset = (preset: CaseStudyPreset) => {
    const textToInsert = lang === 'fa'
      ? `=== محدودیت‌های تکمیلی تحویل پروژه (${preset.titleFa}) ===\nحوزه: ${preset.domainFa}\n\n${preset.constraintsFa}\n\n${preset.performanceTargetFa}`
      : `=== Additional Project Constraints (${preset.titleEn}) ===\nDomain: ${preset.domainEn}\n\n${preset.constraintsEn}\n\n${preset.performanceTargetEn}`;

    onChangeContent(textToInsert);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentPreset = presets.find(p => p.id === selectedCase) || presets[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Slide & Task Header */}
      <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eceeed] dark:border-[#252f38] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788]">
                {lang === 'fa' ? 'فاز ۱: درک کسب‌وکار' : 'Phase I: Business Understanding'}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                {lang === 'fa' ? 'ارزیابی وضعیت → عملکرد مدل' : 'Assess Situation → Model Performance'}
              </span>
              <span className="text-xs font-mono text-gray-400">
                Slide 27 · Page 17
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa'
                ? 'صفحه ۱۷: محدودیت‌های تکمیلی پروژه و مقادیر قابل‌قبول عملکرد مدل'
                : 'Page 17: Project Constraints & Acceptable Model Performance Values'}
            </h1>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
              {lang === 'fa'
                ? 'تعیین محدودیت‌های عملیاتی، فنی و حجمی داده‌ها، و ورود به مبحث معیارهای عملکرد احتمالی مدل‌های هوش مصنوعی (اسلاید ۲۷)'
                : 'Identify resource, data, and technical constraints, and introduce probabilistic model performance threshold metrics (Slide 27).'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToPage16}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'صفحه قبلی (۱۶: الزامات زمان‌بندی)' : 'Previous: Page 16'}</span>
            </button>
          </div>
        </div>

        {/* Top Prompt Instruction (Matching Slide 27 Top text) */}
        <div className="mt-4 p-4 rounded-xl bg-[#f4f7fa] dark:bg-[#182330] border border-[#d2dfec] dark:border-[#2a3c50] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#00738c] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-[#2c3e50] dark:text-[#c4d7ed] space-y-1">
            <span className="font-bold text-sm block text-[#00738c] dark:text-[#4da3b8]">
              {lang === 'fa' ? 'راهنمای اسلاید ۲۷ کتاب کار:' : 'Slide 27 Workbook Instruction:'}
            </span>
            <p>
              {lang === 'fa'
                ? '«محدودیت‌های پروژه را فهرست کنید. این موارد ممکن است محدودیت در در دسترس بودن منابع باشند، اما می‌توانند شامل محدودیت‌های فناوری مانند حجم مجموعه‌داده‌ای که استفاده از آن برای مدل‌سازی عملی است نیز باشند.»'
                : '"List the constraints on the project. These may be constraints on the availability of resources but may also include technological constraints such as the size of the data set that it is practical to use for modeling."'}
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#eceeed] dark:border-[#252f38] text-xs flex-wrap">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'canvas'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'بوم ثبت محدودیت‌ها' : 'Constraints Canvas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'categories'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'دسته‌بندی ۴گانه محدودیت‌ها' : 'Constraint Categories'}</span>
          </button>

          <button
            onClick={() => setActiveTab('performance_intro')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'performance_intro'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'تسک جدید: عملکرد سیستم هوش مصنوعی' : 'AI Performance Task Group'}</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'guide'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'راهنمای تحلیلی متدولوژی' : 'Methodology Guide'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CANVAS (MAIN INTERACTIVE WORKBOOK CANVAS) */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Blue Header Banner matching Slide 27 */}
          <div className="bg-[#00738c] text-white px-5 py-3 rounded-t-xl font-bold text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>
                {lang === 'fa'
                  ? 'سایر محدودیت‌های پروژه که ممکن است بر توانایی تحویل این تکرار اثر بگذارند کدامند؟'
                  : 'What are the other project constraints that might impact the ability to deliver this iteration?'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApplyPreset(currentPreset)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-medium transition-colors cursor-pointer"
                title={lang === 'fa' ? 'بارگذاری پاسخ نمونه شرکت XYZ' : 'Load XYZ Company sample'}
              >
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'fa' ? 'درج نمونه کتاب' : 'Insert Sample'}</span>
              </button>
            </div>
          </div>

          {/* Large Light-Blue Interactive Text Canvas */}
          <div className="bg-[#e4ebfc] dark:bg-[#172233] p-5 rounded-b-xl border border-[#c5d5f5] dark:border-[#24354f] space-y-4">
            {showHelperPrompt && (
              <div className="p-3.5 rounded-lg bg-white/95 dark:bg-[#1a2638] border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {lang === 'fa' ? 'نکات پیشنهادی برای درج در بوم محدودیت‌ها:' : 'Key considerations for constraints canvas:'}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-blue-800 dark:text-blue-300 opacity-90">
                      <li>{lang === 'fa' ? 'محدودیت سقف بودجه مالی و کنترل هزینه ابزارها و هاستینگ ابری' : 'Financial budget constraints and compute costs'}</li>
                      <li>{lang === 'fa' ? 'محدودیت حجم و کیفیت داده‌ها (مانند تمیزکاری ۱۰۰,۰۰۰ گفتگوی متنی ۲ سال گذشته)' : 'Dataset volume, completeness, and noise filtering limits'}</li>
                      <li>{lang === 'fa' ? 'وابستگی به رابط‌های برنامه‌نویسی سامانه‌های قدیمی (CRM و دیتابیس انبار)' : 'Dependencies on legacy REST APIs and rate-limits'}</li>
                      <li>{lang === 'fa' ? 'الزامات حریم خصوصی و عدم افشای اطلاعات هویتی مشتریان (CCPA/GDPR)' : 'Data governance, privacy compliance (CCPA/GDPR)'}</li>
                      <li>{lang === 'fa' ? 'محدودیت‌های زمانی و فریز سیستمی پیش از ایام اوج خرید' : 'Holiday seasonal spikes and strict code freeze windows'}</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setShowHelperPrompt(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              placeholder={lang === 'fa'
                ? 'محدودیت‌های منابع، بودجه، داده‌ها، معماری فنی، انطباق با مقررات و ریسک‌های فصلی این اسپرینت را بنویسید...'
                : 'Detail all project constraints including resource availability, dataset limitations, technical bottlenecks, and legal boundaries here...'}
              className="w-full h-80 p-4 rounded-xl bg-white dark:bg-[#131b26] border border-blue-200 dark:border-blue-800 text-gray-900 dark:text-gray-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00738c] font-sans resize-y shadow-inner"
            />

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-blue-200 dark:border-blue-900/40">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span>{lang === 'fa' ? `تعداد کلمات: ${content.trim() ? content.trim().split(/\s+/).length : 0}` : `Words: ${content.trim() ? content.trim().split(/\s+/).length : 0}`}</span>
                <span>{lang === 'fa' ? `کاراکترها: ${content.length}` : `Characters: ${content.length}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a2638] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی متن' : 'Copy Text')}</span>
                </button>

                <button
                  onClick={() => onChangeContent('')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a2638] border border-red-200 dark:border-red-900/40 hover:bg-red-50 text-red-600 dark:text-red-400 font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'پاک کردن' : 'Clear'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Case Study Presets */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'نمونه‌های آماده مطالعه موردی جهت جایگذاری سریع:' : 'Case Study Presets:'}</span>
              </span>

              <span className="text-[11px] text-gray-400">
                {lang === 'fa' ? 'انتخاب جهت پیش‌نمایش و درج مستقیم' : 'Select to preview and apply'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setSelectedCase(preset.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedCase === preset.id
                      ? 'border-[#00738c] bg-[#00738c]/5 shadow-xs'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {lang === 'fa' ? preset.titleFa : preset.titleEn}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${preset.badgeColor}`}>
                      {lang === 'fa' ? preset.domainFa : preset.domainEn}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {lang === 'fa' ? preset.constraintsFa : preset.constraintsEn}
                  </p>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApplyPreset(preset); }}
                      className="text-[11px] font-semibold text-[#00738c] hover:underline flex items-center gap-1"
                    >
                      <span>{lang === 'fa' ? 'درج در بوم' : 'Insert to Canvas'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONSTRAINT CATEGORIES MATRIX */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              {lang === 'fa' ? 'ماتریس چهارگانه محدودیت‌های پروژه هوش مصنوعی' : 'Four Pillars of AI Project Constraints'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'fa'
                ? 'در متدولوژی CPMAI، شناسایی زودهنگام محدودیت‌های زیرساختی، حقوقی و داده‌ای مانع از شکست پروژه در فازهای عملیاتی می‌شود.'
                : 'Early mapping of data, technological, and compliance boundaries prevents late-stage deployment failures.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {constraintCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 space-y-3"
                >
                  <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                    <div className="p-1.5 rounded-lg bg-[#00738c]/10 text-[#00738c]">
                      {cat.id === 'tech_data' && <Database className="w-4 h-4" />}
                      {cat.id === 'resource_talent' && <Users className="w-4 h-4" />}
                      {cat.id === 'legal_compliance' && <ShieldCheck className="w-4 h-4" />}
                      {cat.id === 'operational_season' && <Calendar className="w-4 h-4" />}
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {lang === 'fa' ? cat.titleFa : cat.titleEn}
                    </h4>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      {lang === 'fa' ? 'مهم‌ترین محدودیت‌ها:' : 'Critical Constraints:'}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {(lang === 'fa' ? cat.itemsFa : cat.itemsEn).map((it, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#eef7f2] dark:bg-[#16291e] border border-green-200 dark:border-green-900/40 text-xs">
                    <span className="font-bold text-[#2f7d5b] dark:text-[#52b788] block mb-0.5">
                      {lang === 'fa' ? 'راهکار مهار و کاهش ریسک:' : 'Mitigation Strategy:'}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      {lang === 'fa' ? cat.mitigationFa : cat.mitigationEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PERFORMANCE INTRO (SLIDE 27 BOTTOM SECTION) */}
      {activeTab === 'performance_intro' && (
        <div className="space-y-5">
          {/* Section Transition Header */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white font-mono">
              Next Task Group in Phase I
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {lang === 'fa'
                ? 'گروه تسک: عملکرد و عملیات سیستم هوش مصنوعی (AI System Performance and Operation)'
                : 'Task Group: AI System Performance and Operation'}
            </h3>
            <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-300 mt-0.5">
              {lang === 'fa'
                ? 'تسک: مقادیر قابل‌قبول عملکرد مدل (Acceptable Model Performance Values)'
                : 'Task: Acceptable Model Performance Values'}
            </h4>
          </div>

          {/* Slide 27 Description Card (Matching the Bottom Section of Slide 27) */}
          <div className="p-5 rounded-xl bg-[#faf6f0] dark:bg-[#201d18] border border-[#ecdccb] dark:border-[#3d3428] space-y-4">
            <div className="flex items-center justify-between border-b border-[#ecdccb] dark:border-[#3d3428] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8a5d2e] dark:text-[#d4a373] flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-amber-600" />
                <span>{lang === 'fa' ? 'شرح تسک در کتاب کار (Description):' : 'Task Description from Workbook:'}</span>
              </span>
              <span className="text-xs text-amber-800 dark:text-amber-300 font-mono">Slide 27</span>
            </div>

            <p className="text-sm leading-relaxed text-[#4a3f35] dark:text-[#d6c7b2]">
              {lang === 'fa'
                ? 'پروژه‌های شناختی با پروژه‌های سنتی توسعه نرم‌افزار متفاوت هستند زیرا ماهیتی احتمالی (Probabilistic) دارند. آن‌ها نتایج را در بازه‌هایی از احتمال و با میزانی از خطا ارائه می‌دهند. تیم‌های پروژه باید حداقل مقادیر قابل‌قبول عملکرد را که برای یک پروژه خاص می‌پذیرند، مشخص کنند. این حدود قابل‌قبول ممکن است در طول تکرارهای اولیه، زمانی که پروژه ارزش خود را اثبات می‌کند، در سطحی پایین‌تر شروع شود و در تکرارهای بعدی افزایش یابد. در یک پروژه یادگیری ماشین، استفاده از ماتریس درهم‌ریختگی (Confusion Matrix) نشان‌داده‌شده در شکل ۳ چگونگی محاسبه معیارهای مختلف را شرح می‌دهد.'
                : 'Cognitive projects differ from traditional application development projects in that they are probabilistic. They provide results in ranges of probability and with some element of error. Project teams need to identify the minimum acceptable performance values they will accept for a particular project. These acceptable limits might start low during initial iterations, while the project proves its value, and may be increased in subsequent iterations. In a machine learning project, using the confusion matrix shown in Figure 3 illustrates how to calculate various measures.'}
            </p>
          </div>

          {/* Key Principle: Probabilistic vs Deterministic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
              <span className="font-bold text-blue-900 dark:text-blue-200 text-sm flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>{lang === 'fa' ? 'نرم‌افزار سنتی: قطعی (Deterministic)' : 'Traditional Software: Deterministic'}</span>
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lang === 'fa'
                  ? 'بر پایه کدهای شرطی صریح (If/Else) کار می‌کند؛ یک ورودی مشخص همواره و ۱۰۰٪ خروجی یکسانی تولید می‌کند و باگی اگر نباشد، درصد خطای سیستم صفر فرض می‌شود.'
                  : 'Operates on deterministic rules and explicit logic. Given input X, output Y is 100% predictable with zero expected probabilistic error.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 text-xs space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-200 text-sm flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-purple-600" />
                <span>{lang === 'fa' ? 'پروژه‌های شناختی: احتمالی (Probabilistic)' : 'Cognitive AI Projects: Probabilistic'}</span>
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lang === 'fa'
                  ? 'الگوها را از داده‌ها استخراج می‌کند و خروجی‌ها را با سطح اطمینان (Confidence Score) و مقداری خطای آماری ذاتی ارائه می‌دهد. تعیین «حداقل عملکرد قابل‌قبول» در فاز درک کسب‌وکار الزامی است.'
                  : 'Learns distributions from data. Outputs have confidence scores and inherent statistical errors. Defining minimum acceptable performance thresholds early is crucial.'}
              </p>
            </div>
          </div>

          {/* Sneak Peek to Slide 28 (Confusion Matrix) */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-[#00738c] shrink-0" />
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">
                  {lang === 'fa' ? 'گام بعدی در اسلاید ۲۸: ماتریس درهم‌ریختگی (Confusion Matrix)' : 'Coming up in Slide 28: Confusion Matrix (Figure 3)'}
                </span>
                <span className="text-gray-500">
                  {lang === 'fa'
                    ? 'محاسبه ریاضی معیارهای دقت (Accuracy)، بازخوانی (Recall/Sensitivity)، صحت (Precision)، امتیاز F1 و نرخ مثبت کاذب (FPR)'
                    : 'Mathematical computation of Accuracy, Sensitivity/Recall, Precision, F1-Score, and False Positive Rate.'}
                </span>
              </div>
            </div>

            {onGoToPage18 && (
              <button
                onClick={onGoToPage18}
                className="px-3 py-1.5 rounded-lg bg-[#00738c] text-white font-semibold shrink-0 hover:bg-[#005f73] transition-colors"
              >
                {lang === 'fa' ? 'مشاهده اسلاید ۲۸' : 'View Slide 28'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: METHODOLOGY GUIDE */}
      {activeTab === 'guide' && (
        <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <Lightbulb className="w-5 h-5 text-[#2f7d5b]" />
            <span>{lang === 'fa' ? 'بینش‌های کلیدی متدولوژی CPMAI برای اسلاید ۲۷' : 'CPMAI Methodology Insights for Slide 27'}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-[#00738c] block mb-1">
                {lang === 'fa' ? '۱. چرا تعیین محدودیت‌های فنی و حجمی داده‌ها قبل از مدل‌سازی حیاتی است؟' : '1. Why Set Data & Technological Constraints Early?'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'در پروژه‌های هوش مصنوعی، بزرگ‌تر بودن دیتاست همیشه به معنی بهتر بودن نیست. داده‌های بیش از حد ممکن است هزینه سرورهای پردازشی (GPU) را سرسام‌آور کند، زمان آموزش را به شدت افزایش دهد یا نویزهای نامرتبط وارد مدل کند. تعیین سقف عملی داده‌ها (Practical Dataset Size) به مهار هزینه‌ها و چابک ماندن اسپرینت‌ها کمک می‌کند.'
                  : 'Bigger datasets are not always better. Excessive unstructured data skyrockets GPU training costs and introduces noise. Setting a practical data threshold keeps sprints lean and cost-effective.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-[#00738c] block mb-1">
                {lang === 'fa' ? '۲. اصل «آستانه پایین در اسپرینت‌های اولیه، رشد در تکرارهای بعدی»' : '2. The Threshold Progression Principle'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'انتظار دقت ۹۹ درصدی در اسپرینت اول یک توهم است! متدولوژی CPMAI تاکید می‌کند که در فاز اثبات مفهوم (POC / MVP)، آستانه دقت را معقول انتخاب کنید (مثلاً ۸۰٪ یا ۸۵٪) تا ارزش اولیه ثابت شود. سپس در چرخه‌های تکرار بعدی با مهندسی ویژگی و افزودن داده‌های باکیفیت، آستانه را ارتقا دهید.'
                  : 'Expecting 99% accuracy in Sprint 1 is a trap. CPMAI prescribes setting conservative thresholds (e.g. 80-85%) to prove initial business value, then ratcheting metrics upward in subsequent iterations.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs flex-wrap gap-3">
        <button
          onClick={onGoToPage16}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{lang === 'fa' ? 'صفحه قبلی: ۱۶ (الزامات زمان‌بندی)' : 'Previous: Page 16 (Schedule Requirements)'}</span>
        </button>

        {onGoToPage18 && (
          <button
            onClick={onGoToPage18}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors cursor-pointer shadow-xs"
          >
            <span>
              {lang === 'fa'
                ? 'صفحه بعدی: ۱۸ (اسلاید ۲۸: ماتریس درهم‌ریختگی و سنجه‌ها)'
                : 'Next: Page 18 (Slide 28: Confusion Matrix & Metrics)'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
