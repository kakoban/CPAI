import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle,
  Lightbulb,
  FileText,
  Target,
  Clock,
  Check,
  CheckCircle2,
  Copy,
  RotateCcw,
  Zap,
  Info,
  ShieldCheck,
  BarChart3,
  Percent,
  Calculator,
  Compass,
  ArrowUpRight,
  CheckSquare,
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';

interface Page20Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage19: () => void;
  onGoToPage21?: () => void;
}

interface KpiCategoryItem {
  id: string;
  titleEn: string;
  titleFa: string;
  iconName: string;
  kpisEn: { name: string; baseline: string; target: string; measureMethod: string }[];
  kpisFa: { name: string; baseline: string; target: string; measureMethod: string }[];
}

interface CaseStudyPreset {
  id: string;
  titleEn: string;
  titleFa: string;
  domainEn: string;
  domainFa: string;
  badgeColor: string;
  monthlyTickets: number;
  currentCostPerTicket: number;
  containmentRate: number;
  aiCostPerTicket: number;
  targetCsat: number;
  targetAhtMinutes: number;
  executiveSummaryEn: string;
  executiveSummaryFa: string;
}

export const Page20AcceptableKpiPerformanceValues: React.FC<Page20Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage19,
  onGoToPage21
}) => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'calculator' | 'canvas' | 'guide'>('worksheet');
  const [selectedPreset, setSelectedPreset] = useState<string>('xyz_support');
  const [copied, setCopied] = useState(false);

  // Interactive KPI Cost-Benefit & Efficiency Calculator
  const [monthlyTickets, setMonthlyTickets] = useState<number>(50000);
  const [currentCostPerTicket, setCurrentCostPerTicket] = useState<number>(6.5); // $6.50 human agent
  const [containmentRate, setContainmentRate] = useState<number>(40); // 40% AI resolved
  const [aiCostPerTicket, setAiCostPerTicket] = useState<number>(0.5); // $0.50 per AI deflection
  const [targetCsat, setTargetCsat] = useState<number>(4.2);
  const [targetAhtMinutes, setTargetAhtMinutes] = useState<number>(2.0); // from 8.5 min to 2.0 min

  // Calculator outputs
  const automatedTickets = Math.round((monthlyTickets * containmentRate) / 100);
  const baselineCost = monthlyTickets * currentCostPerTicket;
  const newHumanCost = (monthlyTickets - automatedTickets) * currentCostPerTicket;
  const newAiCost = automatedTickets * aiCostPerTicket;
  const newTotalCost = newHumanCost + newAiCost;
  const monthlySavings = baselineCost - newTotalCost;
  const annualSavings = monthlySavings * 12;

  // Case Study Presets
  const caseStudyPresets: CaseStudyPreset[] = [
    {
      id: 'xyz_support',
      titleEn: 'XYZ Company Support Chatbot (Official CPMAI Case)',
      titleFa: 'چت‌بات پشتیبانی مشتریان شرکت XYZ (مطالعه موردی رسمی CPMAI)',
      domainEn: 'Customer Support Automation & Service Desk',
      domainFa: 'اتوماسیون خدمات مشتریان و پشتیبانی سطح ۱',
      badgeColor: 'bg-[#00738c] text-white',
      monthlyTickets: 50000,
      currentCostPerTicket: 6.5,
      containmentRate: 40,
      aiCostPerTicket: 0.5,
      targetCsat: 4.2,
      targetAhtMinutes: 2.0,
      executiveSummaryEn:
        'Deliver a 40% tier-1 inquiry deflection rate in Iteration 1, reducing average handling time from 8.5 to 2.0 minutes and generating $120,000 monthly cost savings while maintaining CSAT >= 4.2 / 5.0.',
      executiveSummaryFa:
        'مهار خودکار ۴۰٪ از تیکت‌های پشتیبانی سطح ۱ در فاز اول، کاهش میانگین زمان مکالمه از ۸.۵ به ۲.۰ دقیقه، و ایجاد ۱۲۰,۰۰۰ دلار صرفه‌جویی هزینه ماهانه همراه با حفظ رضایت مشتری (CSAT >= ۴.۲ از ۵).'
    },
    {
      id: 'ecommerce_search',
      titleEn: 'E-Commerce AI Search & Cross-Sell Assistant',
      titleFa: 'دستیار جستجو و پیشنهاد هوشمند فروشگاه آنلاین',
      domainEn: 'E-Commerce / Conversion Rate & GMV Growth',
      domainFa: 'تجارت الکترونیک / رشد فروش و تبدیل سبد خرید',
      badgeColor: 'bg-[#1b3a4b] text-white',
      monthlyTickets: 120000,
      currentCostPerTicket: 3.0,
      containmentRate: 60,
      aiCostPerTicket: 0.2,
      targetCsat: 4.5,
      targetAhtMinutes: 1.0,
      executiveSummaryEn:
        'Boost add-to-cart conversions by 12%, deflect 60% of product pre-purchase questions, and capture $250,000 in monthly upsell revenue with instant personalized product recommendations.',
      executiveSummaryFa:
        'افزایش ۱۲ درصدی نرخ تبدیل سبد خرید، پاسخ‌دهی خودکار به ۶۰٪ از سوالات پیش از خرید کالا، و خلق ۲۵۰,۰۰۰ دلار درآمد مضاعف ماهانه با پیشنهادات اختصاصی و آنی.'
    },
    {
      id: 'it_incident_triage',
      titleEn: 'Enterprise IT Service Desk Incident Auto-Triage',
      titleFa: 'سامانه تریاژ و رفع خودکار رخدادهای واحد فناوری اطلاعات',
      domainEn: 'ITSM / DevOps & Infrastructure Operations',
      domainFa: 'مدیریت خدمات فناوری اطلاعات (ITSM) و عملیات زیرساخت',
      badgeColor: 'bg-[#b3432f] text-white',
      monthlyTickets: 25000,
      currentCostPerTicket: 18.0,
      containmentRate: 35,
      aiCostPerTicket: 1.2,
      targetCsat: 4.4,
      targetAhtMinutes: 3.5,
      executiveSummaryEn:
        'Automate password resets, access provisioning, and common software issues for 35% of IT tickets, slashing employee idle time and saving 1,800 engineering hours monthly.',
      executiveSummaryFa:
        'اتوماسیون بازنشانی کلمه عبور، تخصیص دسترسی‌ها و رفع باگ‌های نرم‌افزاری متداول برای ۳۵٪ از درخواست‌ها، کاهش زمان انتظار پرسنل و آزادسازی ۱,۸۰۰ ساعت کاری تیم فنی در ماه.'
    }
  ];

  const handleApplyPreset = (preset: CaseStudyPreset) => {
    setSelectedPreset(preset.id);
    setMonthlyTickets(preset.monthlyTickets);
    setCurrentCostPerTicket(preset.currentCostPerTicket);
    setContainmentRate(preset.containmentRate);
    setAiCostPerTicket(preset.aiCostPerTicket);
    setTargetCsat(preset.targetCsat);
    setTargetAhtMinutes(preset.targetAhtMinutes);
  };

  // Generate complete workbook canvas markdown
  const generateCanvasMarkdown = () => {
    const curPreset = caseStudyPresets.find(p => p.id === selectedPreset) || caseStudyPresets[0];

    if (lang === 'fa') {
      return `### فاز اول متدولوژی CPMAI: درک کسب‌وکار (Phase I: Business Understanding)
### گروه وظیفه: عملکرد و عملیات سیستم هوش مصنوعی (Task Group: AI System Performance and Operation)
### وظیفه: مقادیر قابل قبول سنجه‌های کلیدی عملکرد کسب‌وکار (Task: Acceptable KPI Performance Values - اسلاید ۳۰)

---

#### ۱. منطق متدولوژی CPMAI: تفاوت سنجه‌های آماری مدل با سنجه‌های عملکردی کسب‌وکار (Business KPIs)
پروژه‌های شناختی و هوش مصنوعی ماهیتاً احتمالی (Probabilistic) هستند و خروجی‌ها همواره با درصدی از خطا یا عدم قطعیت همراه‌اند. ذی‌نفعان ارشد سازمان برای «دقت ۸۸ درصدی مدل» بودجه اختصاص نمی‌دهند؛ بلکه آنچه ارزش سرمایه‌گذاری را توجیه می‌کند، تحقق **سنجه‌های کلیدی عملکرد تجاری (Business KPIs)** از جمله کاهش هزینه، رشد درآمد، ارتقای کارایی و کاهش خطاهای انسانی است. 

در فاز اول (MVP)، آستانه اهداف KPI در حد معقول تعیین می‌شود تا پس از اثبات ارزش تجاری اولیه در سازمان، در تکرارهای بعدی ارتقا یابد.

---

#### ۲. چارچوب سنجه‌های کلیدی عملکرد تجاری پروژه (Required Business KPIs):

##### ۱. اهداف کارایی و کاهش هزینه‌های عملیاتی (Desired Efficiency & Cost Reduction):
- **نرخ مهار خودکار درخواست‌ها (Automated Containment Rate):** هدف‌گذاری حداقل ${containmentRate}٪ از تیکت‌های سطح ۱ بدون نیاز به ارجاع به اپراتور انسانی (تقریباً ${automatedTickets.toLocaleString('fa-IR')} تیکت در ماه).
- **میانگین زمان رسیدگی به درخواست (Average Handling Time - AHT):** کاهش از ۸.۵ دقیقه فعلی به کمتر از ${targetAhtMinutes} دقیقه در چرخه اول.
- **کاهش هزینه به ازای هر تعامل (Cost per Contact):** کاهش هزینه از ${currentCostPerTicket}$ به ازای هر تیکت انسانی به ${aiCostPerTicket}$ به ازای پاسخ چت‌بات هوش مصنوعی.
- **برآورد صرفه‌جویی مالی ماهانه:** معادل ${Math.round(monthlySavings).toLocaleString('fa-IR')}$ دلار در ماه (${Math.round(annualSavings).toLocaleString('fa-IR')}$ دلار در سال).

##### ۲. اهداف رضایت و وفاداری مشتری (Customer Experience & Satisfaction - CX):
- **شاخص رضایت مشتری (CSAT):** کسب امتیاز حداقل ${targetCsat} از ۵ در نظرسنجی‌های پس از گفت‌وگو با چت‌بات.
- **شاخص ترویج‌کنندگان (Net Promoter Score - NPS):** رشد ۶ تا ۸ امتیازی در بازه ۶ ماهه اول بهره‌برداری به دلیل دسترسی ۲۴/۷ و پاسخگویی آنی.
- **حل مسئله در اولین تعامل (First Contact Resolution - FCR):** هدف‌گذاری بالای ۷۰٪ در سوالات متداول حوزه پیگیری سفارش و مرجوعی.

##### ۳. اهداف کاهش خطای فرآیندی و ریسک سازمانی (Reduction in Errors & Risk):
- **کاهش خطای انسانی در ثبت اطلاعات سفارش:** کاهش ۶۰ درصدی ارجاعات اشتباه تیکت‌ها به دپارتمان‌های نامربوط.
- **تطابق کامل با قوانین حریم خصوصی (Compliance):** صفر درصد نشت اطلاعات هویتی و رعایت کامل الزامات GDPR و CCPA.

##### ۴. اهداف درآمدی و ارزش افزوده تجاری (Revenue & Growth Goals):
- **حفظ مشتریان (Churn Reduction):** کاهش ۱.۵ درصدی نرخ ریزش مشتریان ناراضی به واسطه رفع فوری مشکلات ثبت سفارش در ساعات غیراداری.
- **نرخ بازگشت سرمایه مورد انتظار (Expected ROI):** تحقق بازگشت سرمایه ۱۸۰٪ در بازه ۱۲ ماهه پس از راه‌اندازی نسخه MVP.

---

#### ۳. پیوند و ردگیری سنجه‌های مدل به سنجه‌های کسب‌وکار (Traceability Link):
- اگر سنجه **Precision** مدل زیر ۸۵٪ افت کند، شاخص **CSAT** به طور مستقیم آسیب می‌بیند (ارائه پاسخ اشتباه به مشتری).
- اگر سنجه **Recall** مدل زیر ۸۰٪ باشد، شاخص **Containment Rate** به هدف ۴۰٪ نخواهد رسید و بار کاری اپراتورها کاهش نخواهد یافت.
- اگر سنجه **Inference Latency** بیش از ۲ ثانیه شود، کاربر مکالمه را رها کرده و تماس تلفنی گران‌قیمت برقرار می‌کند.

---

#### ۴. برنامه ارتقای تدریجی در چرخه‌های بعدی (Iterative KPI Ratchet Plan):
- **اسپرینت ۱ (MVP):** مهار خودکار ۴۰٪، رضایت ۴.۲، تاخیر زیر ۲ ثانیه.
- **اسپرینت ۲:** مهار خودکار ۵۵٪ با اتصال به وب‌سرویس تراکنش‌های مالی، رضایت ۴.۴.
- **اسپرینت ۳ (بلوغ سیستم):** مهار خودکار ۶۵٪ و افزودن قابلیت پیش‌بینی خودکار نیاز مشتری بر پایه تاریخچه خرید.`;
    }

    return `### CPMAI Phase I: Business Understanding
### Task Group: AI System Performance and Operation
### Task: Acceptable KPI Performance Values (Slide 30)

---

#### 1. CPMAI Rationale: Model Metrics vs Business KPIs
Cognitive projects are probabilistic, producing outputs with statistical error margins. Executive sponsors do not fund models for technical precision alone; they invest in measurable Business KPIs: cost reduction, revenue growth, operational efficiency, and error minimization.

Initial iteration thresholds are set conservatively to validate business feasibility, then ratcheted upwards in subsequent sprints.

---

#### 2. Required Business KPIs Framework:

##### 1. Desired Efficiency & Cost Reduction:
- **Automated Containment Rate:** Target minimum ${containmentRate}% of tier-1 inquiries resolved end-to-end without human hand-off (~${automatedTickets.toLocaleString()} tickets/month).
- **Average Handling Time (AHT):** Slashed from 8.5 minutes baseline to under ${targetAhtMinutes} minutes.
- **Cost Per Contact Reduction:** Decreased from $${currentCostPerTicket} per human agent ticket to $${aiCostPerTicket} per AI interaction.
- **Estimated Monthly Savings:** $${Math.round(monthlySavings).toLocaleString()} / month ($${Math.round(annualSavings).toLocaleString()} annualized).

##### 2. Customer Experience & Satisfaction (CX):
- **Customer Satisfaction (CSAT):** Target >= ${targetCsat} / 5.0 on automated interactions.
- **Net Promoter Score (NPS):** +6 to +8 point uplift across digital channels within 6 months.
- **First Contact Resolution (FCR):** >= 70% for order tracking and returns inquiries.

##### 3. Reduction in Process Errors & Compliance Risk:
- **Routing Error Deflection:** 60% reduction in misrouted support tickets.
- **Privacy Compliance:** Zero data leaks; strict adherence to CCPA and GDPR governance.

##### 4. Revenue Goals & Customer Retention:
- **Churn Mitigation:** 1.5% reduction in customer attrition due to 24/7 immediate assistance.
- **Projected Iteration ROI:** 180% return on invested capital within 12 months post-pilot.

---

#### 3. Traceability Link (Model Metrics -> Business KPIs):
- Model **Precision** < 85% directly degrades **CSAT** (misleading responses).
- Model **Recall** < 80% directly causes **Containment Rate** failure (too many premature escalations).
- Inference **Latency** > 2.0s triggers user drop-off and expensive phone calls.

---

#### 4. Iterative KPI Ratchet Roadmap:
- **Iteration 1 (MVP):** 40% Containment, 4.2 CSAT, <2s latency.
- **Iteration 2:** 55% Containment with live transactional API integration, 4.4 CSAT.
- **Iteration 3:** 65% Containment with predictive customer intent modeling.`;
  };

  const handleCopy = () => {
    const textToCopy = content || generateCanvasMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleApplyToCanvas = () => {
    onChangeContent(generateCanvasMarkdown());
    setActiveTab('canvas');
  };

  const handleReset = () => {
    const confirmMsg =
      lang === 'fa'
        ? 'آیا مایل به بازنشانی مقادیر به حالت پیش‌فرض شرکت XYZ هستید؟'
        : 'Reset metrics to XYZ Company defaults?';
    if (window.confirm(confirmMsg)) {
      handleApplyPreset(caseStudyPresets[0]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b3a4b] via-[#1f5163] to-[#00738c] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>
                {lang === 'fa'
                  ? 'فاز اول: درک کسب‌وکار • اسلاید ۳۰'
                  : 'CPMAI Phase I: Business Understanding • Slide 30'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {lang === 'fa'
                ? 'وظیفه: مقادیر قابل قبول سنجه‌های عملکردی کسب‌وکار (Business KPIs)'
                : 'Task: Acceptable KPI Performance Values'}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              {lang === 'fa'
                ? 'تعیین اهداف ملموس و قابل ارزیابی تجاری شامل کارایی عملیاتی، کاهش هزینه‌ها، رشد درآمد، کاهش خطاهای فرآیندی و میزان رضایت مشتری برای تکرار جاری پروژه هوش مصنوعی.'
                : 'Define required business KPIs (revenue targets, customer acquisition/retention, error reduction, efficiency gains, and CSAT) that govern and justify this AI project iteration.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleApplyToCanvas}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#1f5163] hover:bg-[#e3f2ea] text-xs font-bold transition-all shadow-sm cursor-pointer"
              title={lang === 'fa' ? 'تزریق مستقیم به بوم مستندات' : 'Inject directly into canvas'}
            >
              <Zap className="w-4 h-4 text-[#00738c]" />
              <span>{lang === 'fa' ? 'تزریق به بوم' : 'Inject to Canvas'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00738c]" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {lang === 'fa' ? 'مطالعه موردی مرجع (بارگذاری سریع سناریو):' : 'Select Case Study Preset:'}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#b3432f] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'fa' ? 'بازنشانی' : 'Reset'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {caseStudyPresets.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#00738c] bg-[#00738c]/10 dark:bg-[#00738c]/20 ring-1 ring-[#00738c]'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                    {lang === 'fa' ? preset.titleFa : preset.titleEn}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00738c] shrink-0" />}
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                  {lang === 'fa' ? preset.domainFa : preset.domainEn}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description & Task Artifacts Callout (Matching Slide 30 structure) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Box: Description */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00738c] dark:text-[#6ee7b7] border-b border-gray-100 dark:border-gray-800 pb-2">
            <Info className="w-4 h-4" />
            <span>{lang === 'fa' ? 'شرح وظیفه (Description - متن رسمی اسلاید ۳۰)' : 'Description (Slide 30)'}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {lang === 'fa'
              ? '«پروژه‌های شناختی با پروژه‌های سنتی توسعه نرم‌افزار متفاوتند زیرا ماهیتی احتمالی دارند. آنها نتایج را در بازه‌های احتمالی و با میزانی از خطا ارائه می‌دهند. تیم‌های پروژه باید حداقل مقادیر قابل قبول عملکرد را برای یک پروژه خاص مشخص نمایند. این حدود قابل قبول ممکن است در تکرارهای اولیه که پروژه ارزش خود را اثبات می‌کند پایین باشد و در چرخه‌های بعدی ارتقا یابد.»'
              : 'Cognitive projects differ from traditional application development projects in that they are probabilistic. They provide results in ranges of probability and with some element of error. Project teams should identify the minimum acceptable performance values. These limits may start low during initial iterations and increase in subsequent iterations.'}
          </p>
        </div>

        {/* Right Box: Task Artifacts */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1f5163] dark:text-[#99e2b4] border-b border-gray-100 dark:border-gray-800 pb-2">
            <CheckSquare className="w-4 h-4" />
            <span>{lang === 'fa' ? 'مصنوعات وظیفه: سنجه‌های تجاری الزامی (Required Business KPIs)' : 'Task Artifacts: Required Business KPIs'}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {lang === 'fa'
              ? '«سنجه‌های کلیدی کسب‌وکار مورد نیاز — مانند اهداف درآمدی، اهداف جذب یا حفظ مشتری، کاهش خطاها، کارایی مطلوب یا سایر سنجه‌ها — که این پروژه قصد دستیابی به آن‌ها را دارد چیست؟ این شاخص‌ها باید معیارهایی قابل ارزیابی باشند که سیستم و پروژه در برابر آن‌ها سنجیده شوند.»'
              : 'What are the required business KPIs—such as revenue goals, customer acquisition goals, reduction in errors, desired efficiency, or other metrics—that this project will aim to achieve? These KPIs should be assessable metrics that the system and project can be measured against.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'worksheet'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{lang === 'fa' ? 'کاربرگ ۴ دسته KPI کلیدی' : '4 KPI Categories Worksheet'}</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{lang === 'fa' ? 'ماشین‌حساب ارزش تجاری و صرفه‌جویی' : 'Business Value & Savings Calculator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'canvas'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'fa' ? 'بوم مستندات نهایی (Workbook Canvas)' : 'Workbook Canvas'}</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>{lang === 'fa' ? 'راهنما و نگاشت سنجه‌های مدل به KPI' : 'Model Metrics to KPI Traceability'}</span>
        </button>
      </div>

      {/* TAB 1: 4 KPI Categories Worksheet */}
      {activeTab === 'worksheet' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              {lang === 'fa'
                ? 'در متدولوژی CPMAI، سنجه‌های تجاری برای اثبات ارزش پروژه در برابر سرمایه‌گذاران تعریف می‌شوند. ۴ دسته اصلی زیر را مطابق با نیازمندی‌های چرخه پروژه خود بررسی و تکمیل فرمایید:'
                : 'Under CPMAI, business KPIs justify AI project investment. Review and configure the 4 core business metric pillars for this project iteration:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category 1: Efficiency & Cost Reduction */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00738c] dark:text-[#6ee7b7] border-b border-gray-100 dark:border-gray-800 pb-2">
                <Clock className="w-4 h-4" />
                <span>{lang === 'fa' ? '۱. کارایی عملیاتی و کاهش هزینه (Desired Efficiency)' : '1. Operational Efficiency & Cost'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'نرخ مهار تیکت‌ها (Containment): ' : 'Containment Rate: '}</strong>
                    <span>{lang === 'fa' ? `${containmentRate}٪ حل خودکار بدون نیاز به اپراتور انسانی` : `${containmentRate}% automated tier-1 deflection`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'میانگین زمان مکالمه (AHT): ' : 'Average Handling Time: '}</strong>
                    <span>{lang === 'fa' ? `کاهش از ۸.۵ دقیقه به زیر ${targetAhtMinutes} دقیقه` : `Reduced from 8.5m to < ${targetAhtMinutes}m`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'هزینه هر تماس (Cost per Contact): ' : 'Cost per Contact: '}</strong>
                    <span>{lang === 'fa' ? `کاهش از ${currentCostPerTicket}$ به ${aiCostPerTicket}$ به ازای هر تیکت` : `Cut from $${currentCostPerTicket} to $${aiCostPerTicket} per inquiry`}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Category 2: Customer Experience & Satisfaction */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1f5163] dark:text-[#99e2b4] border-b border-gray-100 dark:border-gray-800 pb-2">
                <Users className="w-4 h-4" />
                <span>{lang === 'fa' ? '۲. رضایت و جذب مشتری (Customer Acquisition & CX)' : '2. Customer Experience & Acquisition'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'شاخص رضایت مشتری (CSAT): ' : 'Target CSAT Score: '}</strong>
                    <span>{lang === 'fa' ? `کسب حداقل ${targetCsat} از ۵ در نظرسنجی‌ها` : `>= ${targetCsat} / 5.0 on automated sessions`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'شاخص وفاداری (NPS Uplift): ' : 'NPS Improvement: '}</strong>
                    <span>{lang === 'fa' ? 'ارتقای ۶ تا ۸ امتیازی ظرف ۶ ماه به دلیل سرعت و در دسترس بودن ۲۴ ساعته' : '+6 to +8 points within 6 months'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'حل در اولین تماس (First Contact Resolution): ' : 'First Contact Resolution: '}</strong>
                    <span>{lang === 'fa' ? 'هدف‌گذاری بالای ۷۰٪ در سوالات متداول' : '>= 70% on tier-1 FAQ & tracking queries'}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Category 3: Error Reduction & Compliance */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'fa' ? '۳. کاهش خطاها و ریسک فرآیندی (Reduction in Errors)' : '3. Error Reduction & Compliance'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'کاهش خطای ارجاع تیکت: ' : 'Routing Error Deflection: '}</strong>
                    <span>{lang === 'fa' ? 'کاهش ۶۰ درصدی ارجاع اشتباه به دپارتمان‌های نامربوط' : '60% drop in misdirected internal tickets'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'انطباق قانونی و حریم خصوصی: ' : 'Regulatory Compliance: '}</strong>
                    <span>{lang === 'fa' ? 'صفر درصد خطای افشای اطلاعات هویتی و رعایت کامل CCPA/GDPR' : 'Zero privacy violations (GDPR/CCPA compliant)'}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Category 4: Revenue & Value Generation */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                <TrendingUp className="w-4 h-4" />
                <span>{lang === 'fa' ? '۴. اهداف درآمدی و ارزش افزوده (Revenue Goals)' : '4. Revenue Goals & Retention'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'کاهش ریزش مشتریان (Churn Reduction): ' : 'Churn Mitigation: '}</strong>
                    <span>{lang === 'fa' ? 'کاهش ۱.۵ درصدی به واسطه رفع فوری مشکلات ثبت سفارش در ساعات غیراداری' : '1.5% decrease via instant 24/7 resolution'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'نرخ بازگشت سرمایه (Projected ROI): ' : 'Projected Iteration ROI: '}</strong>
                    <span>{lang === 'fa' ? '۱۸۰٪ بازگشت سرمایه در بازه ۱۲ ماهه پس از راه‌اندازی MVP' : '180% return on investment within 12 months'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Business Value & Cost Savings Calculator */}
      {activeTab === 'calculator' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#00738c]" />
              <span>{lang === 'fa' ? 'شبیه‌ساز تعاملی توجیه اقتصادی و صرفه‌جویی هزینه تکرار هوش مصنوعی' : 'Interactive ROI & Cost Savings Simulator'}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'fa'
                ? 'پارامترهای عملیاتی زیر را تغییر دهید تا اثرات سنجه‌های KPI بر روی صرفه‌جویی مالی و کارایی به صورت بلادرنگ محاسبه شوند.'
                : 'Adjust operational sliders to simulate live financial savings and efficiency gains.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Slider 1: Monthly Inquiries */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'حجم تیکت‌های ماهانه:' : 'Monthly Inquiries Volume:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  {monthlyTickets.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={monthlyTickets}
                onChange={(e) => setMonthlyTickets(parseInt(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>

            {/* Slider 2: Current Cost per Ticket */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'هزینه فعلی هر تیکت اپراتور انسانی:' : 'Current Cost per Human Ticket:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  ${currentCostPerTicket.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="25.0"
                step="0.5"
                value={currentCostPerTicket}
                onChange={(e) => setCurrentCostPerTicket(parseFloat(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>

            {/* Slider 3: AI Containment Rate */}
            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-900 dark:text-teal-200">
                  {lang === 'fa' ? 'نرخ مهار خودکار چت‌بات (Containment):' : 'AI Containment Rate Target:'}
                </span>
                <span className="font-bold text-teal-700 dark:text-teal-300 font-mono text-sm">
                  {containmentRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={containmentRate}
                onChange={(e) => setContainmentRate(parseInt(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Slider 4: AI Cost per Ingestion */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'هزینه ابری استنتاج هر تیکت AI:' : 'AI Inference Cost per Ticket:'}
                </span>
                <span className="font-bold text-gray-700 dark:text-gray-300 font-mono text-sm">
                  ${aiCostPerTicket.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={aiCostPerTicket}
                onChange={(e) => setAiCostPerTicket(parseFloat(e.target.value))}
                className="w-full accent-gray-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Calculator Output KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-300 dark:border-emerald-800 text-center">
              <span className="text-xs text-gray-500 block mb-1">
                {lang === 'fa' ? 'تیکت‌های حل خودکار ماهانه' : 'Monthly Deflected Tickets'}
              </span>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {automatedTickets.toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                {lang === 'fa' ? 'آزادسازی ظرفیت اپراتورها' : 'Human hours reclaimed'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-300 dark:border-teal-800 text-center">
              <span className="text-xs text-gray-500 block mb-1">
                {lang === 'fa' ? 'صرفه‌جویی خالص ماهانه' : 'Monthly Net Savings'}
              </span>
              <span className="text-2xl font-black text-[#00738c] dark:text-[#6ee7b7] font-mono">
                ${Math.round(monthlySavings).toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                {lang === 'fa' ? 'در هر ماه عملیاتی' : 'Per operating month'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-300 dark:border-blue-800 text-center">
              <span className="text-xs text-gray-500 block mb-1">
                {lang === 'fa' ? 'صرفه‌جویی تجمیعی سالانه' : 'Annualized Net Savings'}
              </span>
              <span className="text-2xl font-black text-blue-800 dark:text-blue-300 font-mono">
                ${Math.round(annualSavings).toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                {lang === 'fa' ? 'بازگشت سرمایه فوق‌العاده' : 'High ROI justification'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Workbook Canvas */}
      {activeTab === 'canvas' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'بوم مستندات کتاب کار CPMAI (اسلاید ۳۰)' : 'CPMAI Workbook Canvas (Slide 30)'}</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'fa'
                  ? 'مستندات رسمی سنجه‌های KPI تجاری که در ممیزی فاز اول و توسط هیئت مدیره پروژه ارزیابی می‌شود.'
                  : 'Official documentation artifact capturing your required Business KPIs for Phase I stage-gate review.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی متن' : 'Copy')}</span>
              </button>

              <button
                onClick={handleApplyToCanvas}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] text-xs font-semibold cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'تولید مجدد متن' : 'Regenerate'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={content || generateCanvasMarkdown()}
            onChange={(e) => onChangeContent(e.target.value)}
            rows={16}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/60 font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00738c] transition-all resize-y"
            placeholder={lang === 'fa' ? 'سنجه‌های کلیدی کسب‌وکار در اینجا ثبت و به طور خودکار ذخیره می‌شوند...' : 'Document required business KPIs...'}
          />

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
            <span>
              {lang === 'fa'
                ? '✓ تغییرات به طور خودکار در فضای محلی مرورگر شما ذخیره می‌گردد.'
                : '✓ Changes save automatically to local browser storage.'}
            </span>
            <span className="font-mono">
              {(content || generateCanvasMarkdown()).length} {lang === 'fa' ? 'نویسه' : 'chars'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 4: Methodology Guide */}
      {activeTab === 'guide' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>{lang === 'fa' ? 'راهنما و بینش‌های متدولوژی CPMAI برای اسلاید ۳۰' : 'CPMAI Methodology Insights for Slide 30'}</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۱. چرا سنجه‌های الگوریتمی مدل به تنهایی برای موفقیت پروژه کافی نیستند؟' : '1. Why Model Metrics Alone Are Insufficient'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'بسیاری از پروژه‌های هوش مصنوعی در محیط آزمایشگاهی به دقت ۹۵ درصدی دست می‌یابند، اما به دلیل عدم انطباق با نیازمندی‌های کسب‌وکار شکست می‌خورند. مدیر پروژه با متدولوژی CPMAI موظف است پلی مستقیم بین سنجه‌های ریاضی (مانند F1 و Precision) و اهداف سازمانی (مانند کاهش هزینه تیکت، رضایت مشتری و سودآوری) ایجاد کند.'
                  : 'Many ML projects achieve 95% validation accuracy in labs but fail in production because they do not move organizational needles. CPMAI demands a transparent traceability bridge linking mathematical metrics to tangible business KPIs.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۲. اصل «آستانه پایین در اسپرینت اول، رشد تصاعدی در تکرارهای بعدی»:' : '2. The Conservative MVP Baseline Principle'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'متن اسلاید ۳۰ صراحتاً بیان می‌کند: «این محدودیت‌های قابل قبول ممکن است در تکرارهای اولیه که پروژه ارزش خود را اثبات می‌کند پایین باشند و در تکرارهای بعدی ارتقا یابند». اگر در اسپرینت اول هدف‌گذاری مهار خودکار را به جای ۴۰٪ روی ۹۰٪ قرار دهید، پروژه به دلیل فشار سنگین داده‌ای و الگوریتمی شکست خواهد خورد.'
                  : 'Slide 30 states: "These acceptable limits may start low during initial iterations, while the project proves its value, and may be increased in subsequent iterations." Aiming for 90% containment in Sprint 1 is a recipe for failure; start at 40%, prove value, and ratchet up.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs flex-wrap gap-3">
        <button
          onClick={onGoToPage19}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: ۱۹ (اسلاید ۲۹: سنجه‌ها و حساسیت‌ها)'
              : 'Previous: Page 19 (Slide 29: Metrics & Sensitivities)'}
          </span>
        </button>

        {onGoToPage21 && (
          <button
            onClick={onGoToPage21}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors cursor-pointer shadow-xs"
          >
            <span>
              {lang === 'fa'
                ? 'صفحه بعدی: ۲۱ (اسلاید ۳۱)'
                : 'Next: Page 21 (Slide 31)'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
