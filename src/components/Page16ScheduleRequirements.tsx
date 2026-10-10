import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  GitBranch,
  Timer,
  Layers,
  ShieldCheck,
  Zap,
  Info,
  Sliders,
  Flag,
  AlertCircle,
  CheckSquare,
  Users,
  HardDrive
} from 'lucide-react';

interface Page16Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage15: () => void;
}

interface MilestoneItem {
  id: string;
  month: string;
  monthFa: string;
  titleEn: string;
  titleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  deliverablesEn: string[];
  deliverablesFa: string[];
}

interface ConstraintItem {
  id: string;
  type: 'schedule' | 'dependency' | 'resource' | 'legal';
  titleEn: string;
  titleFa: string;
  impactEn: string;
  impactFa: string;
  mitigationEn: string;
  mitigationFa: string;
}

interface CaseStudySample {
  id: string;
  nameEn: string;
  nameFa: string;
  badgeColor: string;
  domainEn: string;
  domainFa: string;
  schedulePlanEn: string;
  schedulePlanFa: string;
  constraintsEn: string;
  constraintsFa: string;
}

export const Page16ScheduleRequirements: React.FC<Page16Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage15
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'milestones' | 'constraints' | 'guide'>('canvas');
  const [selectedCase, setSelectedCase] = useState<string>('xyz_chatbot');
  const [copied, setCopied] = useState(false);
  const [showHelperPrompt, setShowHelperPrompt] = useState(true);

  // Standard Milestones for a 4-Month AI MVP (aligning with CPMAI agile sprints)
  const milestones: MilestoneItem[] = [
    {
      id: 'm1',
      month: 'Month 1',
      monthFa: 'ماه اول',
      titleEn: 'Discovery, Data Gathering & AI Tooling Selection',
      titleFa: 'شناسایی، گردآوری داده‌ها و انتخاب ابزارهای هوش مصنوعی',
      descriptionEn: 'Gather historical chat logs, finalize success metrics, select AI frameworks/cloud platform, and conduct data legal rights checks.',
      descriptionFa: 'جمع‌آوری لاگ‌های چت تاریخی، نهایی‌سازی سنجه‌های موفقیت، انتخاب پلتفرم ابری و کتابخانه‌های AI، و بررسی حقوقی داده‌ها.',
      deliverablesEn: ['Initial data dump (100k chat logs)', 'Data quality audit report', 'AI platform architecture selection'],
      deliverablesFa: ['دریافت ۱۰۰,۰۰۰ گفتگوی تاریخی', 'گزارش ممیزی کیفیت داده‌ها', 'انتخاب معماری و پلتفرم ابری']
    },
    {
      id: 'm2',
      month: 'Month 2',
      monthFa: 'ماه دوم',
      titleEn: 'Model Development & System Integration (Sprints 1-2)',
      titleFa: 'توسعه مدل اولیه و یکپارچه‌سازی سامانه‌ها (اسپرینت‌های ۱ و ۲)',
      descriptionEn: 'Train baseline NLP models, build API connectors for CRM and inventory, configure fallbacks and escalation logic.',
      descriptionFa: 'آموزش مدل اولیه NLP، ساخت رابط‌های API برای اتصال به CRM و سیستم انبار، و پیکربندی منطق ارجاع به انسان.',
      deliverablesEn: ['Baseline intent classification model', 'CRM/Inventory REST API integration', 'Automated testing pipeline'],
      deliverablesFa: ['مدل اولیه تشخیص قصد (Intent Classification)', 'یکپارچه‌سازی وب‌هوک‌های CRM و موجودی', 'خط لوله تست خودکار']
    },
    {
      id: 'm3',
      month: 'Month 3',
      monthFa: 'ماه سوم',
      titleEn: 'Testing, Fine-Tuning & User Acceptance (Sprints 3-4)',
      titleFa: 'تست، تنظیم دقیق (Fine-Tuning) و ارزیابی پذیرش کاربر',
      descriptionEn: 'Conduct pilot testing with internal support staff, refine edge cases, evaluate against confusion matrix metrics, and train support agents.',
      descriptionFa: 'اجرای تست پایلوت با پرسنل پشتیبانی، رفع خطاهای بافتاری، سنجش با ماتریس درهم‌ریختگی و آموزش تیم پشتیبانی.',
      deliverablesEn: ['Internal pilot feedback report', 'Model performance evaluation (Recall/F1)', 'Support agent training sessions'],
      deliverablesFa: ['گزارش بازخورد تست پایلوت داخلی', 'ارزیابی متریک‌های مدل (Recall/Precision)', 'کارگاه‌های آموزش کارشناسان پشتیبانی']
    },
    {
      id: 'm4',
      month: 'Month 4',
      monthFa: 'ماه چهارم',
      titleEn: 'MVP Release & Controlled Production Go-Live',
      titleFa: 'انتشار نسخه کمینه (MVP) و راه‌اندازی زنده کنترل‌شده',
      descriptionEn: 'Launch chatbot widget on e-commerce site for 20% of traffic, monitor live response latency and safety guardrails, scale prior to holiday peak.',
      descriptionFa: 'راه‌اندازی ویجت در سایت برای ۲۰٪ کاربران، پایش بلادرنگ تاخیر و نرده‌های حفاظتی، و آمادگی کامل برای پیک فصل خرید.',
      deliverablesEn: ['Live production deployment', 'Real-time telemetry dashboard', 'Escalation response SLA monitoring'],
      deliverablesFa: ['استقرار نهایی روی سرور پروداکشن', 'داشبورد مانیتورینگ زنده تعاملات', 'پایش قرارداد سطح خدمت (SLA) ارجاع']
    }
  ];

  // Critical Project Constraints & Dependencies
  const constraints: ConstraintItem[] = [
    {
      id: 'c1',
      type: 'schedule',
      titleEn: '4-Month Hard Deadline Before Peak Retail Season',
      titleFa: 'ددلاین قطعی ۴ ماهه پیش از فصل اوج خرید',
      impactEn: 'Delays would push release into peak holiday operations when code freezes are active.',
      impactFa: 'تاخیر در پروژه باعث تلاقی با ایام اوج خرید و دوره فریز سرورها (Code Freeze) خواهد شد.',
      mitigationEn: 'Use 2-week short agile sprints with rigid scope containment for MVP.',
      mitigationFa: 'برگزاری اسپرینت‌های چابک ۲ هفته‌ای با کنترل دقیق دامنه کار (Scope Control).'
    },
    {
      id: 'c2',
      type: 'dependency',
      titleEn: 'Backend CRM & Inventory API Synchronization',
      titleFa: 'وابستگی به همگام‌سازی APIهای CRM و انبار',
      impactEn: 'Chatbot cannot provide personalized order status without live, low-latency API access.',
      impactFa: 'ربات بدون دسترسی سریع به این APIها قادر به پاسخ به وضعیت سفارشات شخصی‌سازی نخواهد بود.',
      mitigationEn: 'Establish mock API endpoints in Sprint 1 to unblock NLP model development.',
      mitigationFa: 'ایجاد اندپوینت‌های شبیه‌سازی‌شده (Mock APIs) در اسپرینت اول تا توسعه مدل معطل نماند.'
    },
    {
      id: 'c3',
      type: 'resource',
      titleEn: 'Limited Internal AI Talent (1 Internal Engineer)',
      titleFa: 'محدودیت نیروی متخصص داخلی هوش مصنوعی (۱ نفر)',
      impactEn: 'Internal bottleneck could delay model hyperparameter tuning and architecture validation.',
      impactFa: 'گلوگاه نیروی انسانی می‌تواند به تاخیر در تیونینگ ابرپارامترها و اعتبارسنجی مدل منجر شود.',
      mitigationEn: 'Augment with external AI consultancy/contractors within the approved budget.',
      mitigationFa: 'استفاده از مشاوران و پیمانکاران خبره هوش مصنوعی در چارچوب سقف بودجه مصوب.'
    },
    {
      id: 'c4',
      type: 'legal',
      titleEn: 'Data Usage Rights & Privacy Regulations (CCPA Compliance)',
      titleFa: 'حقوق قانونی استفاده از داده و انطباق با مقررات حریم خصوصی (CCPA)',
      impactEn: 'Using un-anonymized customer transcripts could lead to serious legal liabilities.',
      impactFa: 'استفاده از گفتگوهای حاوی داده‌های حساس مشتری بدون ناشناس‌سازی ریسک حقوقی دارد.',
      mitigationEn: 'Implement automated PII scrubbing (Personally Identifiable Information) before model ingestion.',
      mitigationFa: 'اجرای اسکریپت‌های حذف خودکار داده‌های هویتی حساس (PII Scrubbing) پیش از ورود به مدل.'
    }
  ];

  // Case study presets
  const caseStudies: CaseStudySample[] = [
    {
      id: 'xyz_chatbot',
      nameEn: 'XYZ Company Support Chatbot (Official PMI Sample)',
      nameFa: 'چت‌بات پشتیبانی شرکت XYZ (نمونه رسمی کتاب کار PMI)',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      domainEn: 'E-Commerce / Customer Support Automation',
      domainFa: 'تجارت الکترونیک / اتوماسیون پشتیبانی مشتریان',
      schedulePlanEn: `Project Iteration Schedule Requirements:
1. Target Timeline: Launch a Minimum Viable Product (MVP) within 4 months, strictly ahead of the upcoming peak retail season.
2. Sprint Cadence: Execute 2-to-4-week agile sprints, delivering incremental cognitive features (intent classification, entity extraction, CRM integration).
3. Cross-Functional Sync: Weekly sync between IT engineering, customer support leadership, and external AI contractors to mitigate blockers.
4. Pilot Period: Dedicate Month 3 to internal staff pilot testing and iterative prompt/model refinement.`,
      schedulePlanFa: `الزامات زمان‌بندی تکرار پروژه:
۱. بازه زمانی هدف: عرضه نسخه کمینه محصول (MVP) ظرف ۴ ماه، حتماً پیش از آغاز فصل اوج خرید تعطیلات.
2. آهنگ اسپرینت‌ها: اسپرینت‌های چابک ۲ تا ۴ هفته‌ای، با تحویل تدریجی قابلیت‌های شناختی (تشخیص قصد، استخراج موجودیت، اتصال به CRM).
۳. هماهنگی بین‌تیمی: جلسات هفتگی همگام‌سازی میان تیم فنی IT، مدیران پشتیبانی و مشاوران بیرونی برای رفع سریع موانع.
۴. دوره پایلوت: اختصاص ماه سوم به تست داخلی توسط پرسنل پشتیبانی و اصلاح مداوم سناریوها بر اساس بازخورد واقعی.`,
      constraintsEn: `Project Constraints & Dependencies:
1. Team Resources: Limited internal AI personnel (1 data scientist); requires augmenting with external contractors under the dedicated project manager.
2. Budget Cap: Total expenses must remain below 50% of the annual $2M support budget (< $1M) to secure a 1-year positive ROI.
3. API Dependencies: Live dependency on CRM and order management REST endpoints for real-time order tracking.
4. Data Legal Clearances: Verified authorization to use 100k historical chat logs under CCPA, with mandatory PII redaction.
5. Operational Peak Risk: High season retail surges could divert internal staff from testing tasks.`,
      constraintsFa: `محدودیت‌ها و وابستگی‌های پروژه:
۱. منابع تیم: محدودیت متخصص داخلی هوش مصنوعی (۱ دانشمند داده)؛ نیاز به تکمیل ظرفیت با پیمانکار بیرونی تحت نظر مدیر پروژه اختصاصی.
۲. سقف بودجه: تمام هزینه‌ها باید زیر ۵۰٪ بودجه پشتیبانی فعلی (کمتر از ۱ میلیون دلار) باقی بماند تا بازگشت سرمایه ۱ ساله تضمین شود.
۳. وابستگی به API: وابستگی حیاتی به اندپوینت‌های CRM و سامانه انبار برای استعلام بلادرنگ وضعیت سفارشات.
۴. مجوزهای قانونی داده: تأیید مجوز استفاده از ۱۰۰,۰۰۰ گفتگوی متنی تحت الزامات قانون CCPA، همراه با فیلتر الزامی اطلاعات هویتی (PII).
۵. ریسک تداخل فصلی: پیک فروش نباید باعث معطل ماندن مراحل آزمون و تحویل پروژه شود.`
    },
    {
      id: 'fintech_fraud',
      nameEn: 'Real-Time Fraud Detection Engine',
      nameFa: 'موتور کشف تقلب بلادرنگ بانکی',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      domainEn: 'FinTech / Payment Security',
      domainFa: 'فین‌تک / امنیت پرداخت‌های مالی',
      schedulePlanEn: `Schedule Requirements:
- 3-Month POC iteration: Month 1 (data pipelines), Month 2 (unsupervised anomaly detection model), Month 3 (shadow-mode evaluation).
- Sprint cadence: 2-week sprints with bi-weekly risk auditing.`,
      schedulePlanFa: `الزامات زمان‌بندی:
- تکرار ۳ ماهه برای اثبات مفهوم (POC): ماه ۱ (خط لوله داده)، ماه ۲ (مدل یادگیری بدون‌ناظر کشف ناهنجاری)، ماه ۳ (استقرار در حالت Shadow Mode).
- چرخه اسپرینت‌ها: اسپرینت‌های ۲ هفته‌ای با ممیزی ریسک دوره‌ای.`,
      constraintsEn: `Constraints:
- Latency constraint: Inference time must be under 50ms per transaction.
- Regulatory constraint: Compliance with Central Bank and PCI-DSS compliance audits.`,
      constraintsFa: `محدودیت‌ها:
- محدودیت تاخیر زمانی: پاسخ‌دهی استنتاج مدل زیر ۵۰ میلی‌ثانیه برای هر تراکنش.
- محدودیت رگولاتوری: انطباق کامل با الزامات بانک مرکزی و استاندارد امنیتی PCI-DSS.`
    }
  ];

  const handleApplyPreset = (preset: CaseStudySample) => {
    const textToInsert = lang === 'fa'
      ? `=== الزامات زمان‌بندی و وابستگی‌های پروژه (${preset.nameFa}) ===\nحوزه: ${preset.domainFa}\n\n${preset.schedulePlanFa}\n\n${preset.constraintsFa}`
      : `=== Task: Schedule Requirements (${preset.nameEn}) ===\nDomain: ${preset.domainEn}\n\n${preset.schedulePlanEn}\n\n${preset.constraintsEn}`;

    onChangeContent(textToInsert);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCase = caseStudies.find(c => c.id === selectedCase) || caseStudies[0];

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
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {lang === 'fa' ? 'گروه تسک: ارزیابی وضعیت' : 'Task Group: Assess Situation'}
              </span>
              <span className="text-xs font-mono text-gray-400">
                Slide 26 · Page 16
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'صفحه ۱۶: الزامات زمان‌بندی و وابستگی‌های پروژه' : 'Page 16: Task: Schedule Requirements'}
            </h1>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
              {lang === 'fa'
                ? 'تعیین برنامه زمانی تکرارها، اسپرینت‌های چابک، مایلستون‌های کلیدی و محدودیت‌ها و وابستگی‌های بحرانی برای موفقیت تحویل'
                : 'Identify critical project schedule, timing, dependencies, and constraints that impact this agile iteration.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToPage15}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'صفحه قبلی (۱۵: فناوری و مهارت‌ها)' : 'Previous: Page 15'}</span>
            </button>
          </div>
        </div>

        {/* The Two Official Workbook Cards (Matching Slide 26 exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Left Card: Description */}
          <div className="p-4 rounded-xl bg-[#faf6f0] dark:bg-[#201d18] border border-[#ecdccb] dark:border-[#3d3428] relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8a5d2e] dark:text-[#d4a373]">
                {lang === 'fa' ? 'شرح تسک (Description)' : 'Description'}
              </span>
              <div className="w-3 h-3 text-[#d4a373] opacity-60">▲</div>
            </div>
            <p className="text-xs leading-relaxed text-[#4a3f35] dark:text-[#d6c7b2]">
              {lang === 'fa'
                ? 'الزامات حیاتی زمان‌بندی، فواصل زمانی و وابستگی‌های پروژه که بر این تکرار (Iteration) اثر می‌گذارند کدامند؟'
                : 'What are the critical project schedule, timing, and dependency requirements that will impact this iteration?'}
            </p>
          </div>

          {/* Right Card: Task Artifacts */}
          <div className="p-4 rounded-xl bg-[#faf6f0] dark:bg-[#201d18] border border-[#ecdccb] dark:border-[#3d3428] relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8a5d2e] dark:text-[#d4a373]">
                {lang === 'fa' ? 'مستندات و خروجی‌ها (Task Artifacts)' : 'Task Artifacts'}
              </span>
              <div className="w-3 h-3 text-[#d4a373] opacity-60">▲</div>
            </div>
            <p className="text-xs leading-relaxed text-[#4a3f35] dark:text-[#d6c7b2]">
              {lang === 'fa'
                ? 'فهرست کردن تمام الزامات پروژه، شامل زمان‌بندی تکمیل، فهم‌پذیری و کیفیت نتایج، امنیت، و مسائل حقوقی. همچنین به عنوان بخشی از این خروجی، اطمینان حاصل کنید که مجوز قانونی استفاده از داده‌ها را در اختیار دارید.'
                : 'List all requirements of the project, including schedule of completion, comprehensibility and quality of results, and security, as well as legal issues. As part of this output, make sure you are allowed to use the data.'}
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#eceeed] dark:border-[#252f38] text-xs">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'canvas'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'بوم نگارش الزامات زمان‌بندی' : 'Schedule Canvas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'milestones'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'نقشه راه اسپرینت‌ها (۴ ماهه)' : 'Agile Roadmap'}</span>
          </button>

          <button
            onClick={() => setActiveTab('constraints')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'constraints'
                ? 'bg-[#00738c] text-white shadow-xs font-bold'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'محدودیت‌ها و وابستگی‌ها' : 'Constraints & Risks'}</span>
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
            <span>{lang === 'fa' ? 'راهنما و نکات CPMAI' : 'CPMAI Guide'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CANVAS (MAIN INTERACTIVE WORKBOOK CANVAS) */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Blue Header Banner matching the Workbook Slide */}
          <div className="bg-[#00738c] text-white px-5 py-3 rounded-t-xl font-bold text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {lang === 'fa'
                  ? 'الزامات زمان‌بندی تکرار پروژه و محدودیت‌های تحویل (اسلاید ۲۶)'
                  : 'What are the project iteration schedule requirements, timing, and constraints?'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApplyPreset(currentCase)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-medium transition-colors cursor-pointer"
                title={lang === 'fa' ? 'بارگذاری پاسخ نمونه شرکت XYZ' : 'Load XYZ Company sample'}
              >
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'fa' ? 'درج پاسخ نمونه کتاب' : 'Insert Sample'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Text Area with Lavender/Blue Canvas Background */}
          <div className="bg-[#e4ebfc] dark:bg-[#172233] p-5 rounded-b-xl border border-[#c5d5f5] dark:border-[#24354f] space-y-4">
            {showHelperPrompt && (
              <div className="p-3.5 rounded-lg bg-white/90 dark:bg-[#1a2638] border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {lang === 'fa' ? 'پرسش‌های کلیدی برای پاسخ در این بخش:' : 'Key guiding questions for this section:'}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-blue-800 dark:text-blue-300 opacity-90">
                      <li>{lang === 'fa' ? 'بازه زمانی تحویل MVP و طول هر اسپرینت چابک چقدر است؟ (مثلاً ۴ ماه و اسپرینت‌های ۲ تا ۴ هفته‌ای)' : 'What is the target MVP timeline and sprint length? (e.g. 4 months, 2-4 week sprints)'}</li>
                      <li>{lang === 'fa' ? 'چه مایلستون‌هایی برای جمع‌آوری داده، توسعه مدل و پایلوت در نظر گرفته شده است؟' : 'What are the milestone phases for data, modeling, and pilot testing?'}</li>
                      <li>{lang === 'fa' ? 'چه وابستگی‌های فنی (APIهای سامانه CRM/انبار) یا قانونی (مجوز حریم خصوصی داده) وجود دارد؟' : 'What technical API dependencies or data legal/privacy permissions exist?'}</li>
                      <li>{lang === 'fa' ? 'چه ریسک‌های زمانی یا فصلی ممکن است تحویل پروژه را با مانع مواجه کند؟' : 'What seasonal or resource bottlenecks could impact delivery?'}</li>
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
                ? 'الزامات زمان‌بندی، اسپرینت‌ها، مایلستون‌ها و محدودیت‌های تکرار این پروژه هوش مصنوعی را در اینجا یادداشت کنید...'
                : 'Detail your project iteration schedule requirements, agile sprint cadences, milestones, and constraints here...'}
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

          {/* Quick Preset Selector */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'نمونه‌های آماده مطالعه موردی جهت درج سریع:' : 'Case Study Presets for Instant Insertion:'}</span>
              </span>

              <span className="text-[11px] text-gray-400">
                {lang === 'fa' ? 'کلیک جهت مشاهده و جایگذاری در بوم' : 'Click to preview and apply'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => setSelectedCase(cs.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedCase === cs.id
                      ? 'border-[#00738c] bg-[#00738c]/5 shadow-xs'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {lang === 'fa' ? cs.nameFa : cs.nameEn}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${cs.badgeColor}`}>
                      {lang === 'fa' ? cs.domainFa : cs.domainEn}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {lang === 'fa' ? cs.schedulePlanFa : cs.schedulePlanEn}
                  </p>

                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApplyPreset(cs); }}
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

      {/* TAB 2: MILESTONES (AGILE 4-MONTH ROADMAP) */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              {lang === 'fa' ? 'نقشه راه اسپرینت‌های ۴ ماهه پروژه چت‌بات (MVP)' : '4-Month Agile Roadmap & Sprint Milestones'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'fa'
                ? 'متدولوژی CPMAI بر تحویل چابک و تدریجی تاکید دارد؛ هر تکرار باید خروجی ملموس به همراه داشته باشد.'
                : 'CPMAI emphasizes incremental value delivery; each sprint delivers tangible artifacts.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {milestones.map((m, index) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00738c] text-white">
                      {lang === 'fa' ? m.monthFa : m.month}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Phase {index + 1}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    {lang === 'fa' ? m.titleFa : m.titleEn}
                  </h4>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {lang === 'fa' ? m.descriptionFa : m.descriptionEn}
                  </p>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      {lang === 'fa' ? 'خروجی‌های کلیدی (Deliverables):' : 'Key Deliverables:'}
                    </span>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      {(lang === 'fa' ? m.deliverablesFa : m.deliverablesEn).map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2f7d5b] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONSTRAINTS & RISKS */}
      {activeTab === 'constraints' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              {lang === 'fa' ? 'محدودیت‌ها، ریسک‌ها و وابستگی‌های بحرانی' : 'Critical Constraints, Risks & Dependencies'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'fa'
                ? 'شناسایی زودهنگام موانع و برنامه‌ریزی راهکارهای کاهش ریسک در تسک Schedule Requirements الزامی است.'
                : 'Early identification of constraints and mitigation strategies is vital in CPMAI Schedule Requirements.'}
            </p>

            <div className="space-y-3">
              {constraints.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{lang === 'fa' ? c.titleFa : c.titleEn}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 uppercase font-mono">
                      {c.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="font-semibold text-amber-800 dark:text-amber-300 block">
                        {lang === 'fa' ? 'اثر بالقوه بر اسپرینت:' : 'Potential Impact:'}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {lang === 'fa' ? c.impactFa : c.impactEn}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-[#2f7d5b] dark:text-[#52b788] block">
                        {lang === 'fa' ? 'راهکار مهار و کاهش ریسک (Mitigation):' : 'Mitigation Strategy:'}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {lang === 'fa' ? c.mitigationFa : c.mitigationEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CPMAI GUIDE */}
      {activeTab === 'guide' && (
        <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <Lightbulb className="w-5 h-5 text-[#2f7d5b]" />
            <span>{lang === 'fa' ? 'راهنمای متدولوژی CPMAI برای تسک Schedule Requirements' : 'CPMAI Methodology Guidance for Schedule Requirements'}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-[#00738c] block mb-1">
                {lang === 'fa' ? '۱. چرا پروژه‌های هوش مصنوعی نیازمند زمان‌بندی تکرارشونده هستند؟' : '1. Why AI Projects Need Iterative Scheduling?'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'بر خلاف توسعه نرم‌افزار سنتی که قطعی (Deterministic) است، هوش مصنوعی احتمالی (Probabilistic) و داده‌محور است. امکان دارد نیاز به بازگشت از فاز مدل‌سازی به فاز درک داده باشد؛ بنابراین اسپرینت‌های کوتاه ۲ تا ۴ هفته‌ای بهترین راهکار برای ارزیابی تدریجی نتایج هستند.'
                  : 'Unlike deterministic software, AI is probabilistic and data-centric. Teams may need to loop back from Model Development to Data Understanding; thus short 2-4 week sprints are essential.'}
            </p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-[#00738c] block mb-1">
                {lang === 'fa' ? '۲. ممیزی قانونی مجوز استفاده از داده (Data Rights Checklist)' : '2. Data Rights & Legal Permission Checklist'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'متدولوژی صراحتاً بیان می‌کند: «مطمئن شوید مجوز استفاده از داده را دارید». باید بررسی شود که داده‌های گفتگوهای تاریخی، اطلاعات خرید یا سوابق مشتریان نقض‌کننده حریم خصوصی (مانند قوانین GDPR، CCPA یا مقررات محلی) نباشند.'
                  : 'The methodology explicitly mandates ensuring you are legally authorized to use the data. Confirm that customer chat transcripts and transaction logs comply with CCPA, GDPR, and enterprise privacy standards.'}
            </p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-[#00738c] block mb-1">
                {lang === 'fa' ? '۳. مدیریت وابستگی‌ها با تیم‌های غیر هوش مصنوعی' : '3. Managing Non-AI System Dependencies'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'چت‌بات مستقل کارایی ندارد؛ نیاز به ارتباط بلادرنگ با سامانه‌های CRM، انبار و وب‌سایت است. تاخیر تیم‌های دیگر در آماده‌سازی APIها نباید اسپرینت هوش مصنوعی را متوقف کند (استفاده از داده‌های Mock در اسپرینت‌های اولیه الزامی است).'
                  : 'AI models rely on live CRM/inventory APIs. Delays in upstream engineering teams should not stall AI sprints; leverage mock API responses during early sprints.'}
            </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs">
        <button
          onClick={onGoToPage15}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'صفحه قبلی: ۱۵ (فناوری و مهارت‌ها)' : 'Previous: Page 15'}</span>
        </button>

        <span className="text-gray-400 font-mono">
          Slide 26 / Phase I Complete
        </span>
      </div>
    </div>
  );
};
