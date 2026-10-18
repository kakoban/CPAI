import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Server,
  Cpu,
  Clock,
  HardDrive,
  Database,
  ShieldCheck,
  Activity,
  Zap,
  Target,
  FileText,
  Lightbulb,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  Info,
  Sliders,
  CheckSquare,
  Lock,
  Layers,
  Compass,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Cloud
} from 'lucide-react';

interface Page21Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage20: () => void;
  onGoToPage22?: () => void;
}

interface CaseStudyPreset {
  id: string;
  titleEn: string;
  titleFa: string;
  domainEn: string;
  domainFa: string;
  badgeColor: string;
  targetP95LatencySec: number;
  uptimeTarget: number;
  maxConcurrency: number;
  cloudMonthlyBudget: number;
  errorRateTolerancePercent: number;
  techSummaryEn: string;
  techSummaryFa: string;
}

export const Page21RequiredTechnologyKpis: React.FC<Page21Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage20,
  onGoToPage22
}) => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'simulator' | 'canvas' | 'guide'>('worksheet');
  const [selectedPreset, setSelectedPreset] = useState<string>('xyz_support');
  const [copied, setCopied] = useState(false);

  // Technology KPI interactive controls
  const [targetP95LatencySec, setTargetP95LatencySec] = useState<number>(1.5);
  const [uptimeTarget, setUptimeTarget] = useState<number>(99.9);
  const [maxConcurrency, setMaxConcurrency] = useState<number>(250);
  const [cloudMonthlyBudget, setCloudMonthlyBudget] = useState<number>(4500);
  const [errorRateTolerancePercent, setErrorRateTolerancePercent] = useState<number>(0.1);
  const [vectorSearchLatencyMs, setVectorSearchLatencyMs] = useState<number>(120);

  // Case study presets
  const caseStudyPresets: CaseStudyPreset[] = [
    {
      id: 'xyz_support',
      titleEn: 'XYZ Company Support Chatbot (Official CPMAI Case)',
      titleFa: 'چت‌بات پشتیبانی مشتریان شرکت XYZ (مطالعه موردی رسمی CPMAI)',
      domainEn: 'Conversational AI / Customer Support Stack',
      domainFa: 'هوش مصنوعی محاوره‌ای و خدمات مشتریان',
      badgeColor: 'bg-[#00738c] text-white',
      targetP95LatencySec: 1.5,
      uptimeTarget: 99.9,
      maxConcurrency: 250,
      cloudMonthlyBudget: 4500,
      errorRateTolerancePercent: 0.1,
      techSummaryEn:
        'Sub-1.5s P95 turn latency, 99.9% availability, 250 peak concurrent sessions, with strict circuit breakers on legacy CRM endpoints and $4,500 monthly cloud inference cap.',
      techSummaryFa:
        'تاخیر پاسخ‌دهی P95 زیر ۱.۵ ثانیه، آپتایم ۹۹.۹٪، پشتیبانی از ۲۵۰ کاربر همزمان در ساعات اوج، سقف مصرف ابری ۴,۵۰۰ دلار در ماه، و ایزولاسیون با مکانیزم Circuit Breaker برای وب‌سرویس‌های قدیمی CRM.'
    },
    {
      id: 'fraud_realtime',
      titleEn: 'Real-Time Financial Transaction Fraud Engine',
      titleFa: 'موتور بلادرنگ کشف تقلب تراکنش‌های مالی',
      domainEn: 'FinTech / High-Throughput Stream Processing',
      domainFa: 'فین‌تک و پردازش جریانی فوق سریع',
      badgeColor: 'bg-[#b3432f] text-white',
      targetP95LatencySec: 0.08,
      uptimeTarget: 99.99,
      maxConcurrency: 2000,
      cloudMonthlyBudget: 12000,
      errorRateTolerancePercent: 0.01,
      techSummaryEn:
        'Ultra-low 80ms P95 scoring SLA, 99.99% multi-region redundancy, 2,000 TPS concurrency, with sub-10ms in-memory feature cache.',
      techSummaryFa:
        'تاخیر استنتاج فوق‌سریع زیر ۸۰ میلی‌ثانیه برای هر تراکنش، دسترسی‌پذیری ۹۹.۹۹٪ با سرورهای پشتیبان چندمنطقه‌ای، توان پردازش ۲,۰۰۰ تراکنش در ثانیه و حافظه کش موقت زیر ۱۰ میلی‌ثانیه.'
    },
    {
      id: 'document_ocr_batch',
      titleEn: 'Enterprise Document OCR & Knowledge Ingestion',
      titleFa: 'سامانه استخراج اسناد سازمانی و نمایه RAG',
      domainEn: 'Document Intelligence / Batch Processing',
      domainFa: 'هوشمندی اسناد و پردازش دسته‌ای',
      badgeColor: 'bg-[#1b3a4b] text-white',
      targetP95LatencySec: 4.0,
      uptimeTarget: 99.5,
      maxConcurrency: 100,
      cloudMonthlyBudget: 3000,
      errorRateTolerancePercent: 0.5,
      techSummaryEn:
        'High-throughput queue processing (10,000 PDF pages/hour), async workers on spot GPU instances, and automatic retry dead-letter queues.',
      techSummaryFa:
        'توان پردازش دسته‌ای ۱۰,۰۰۰ صفحه PDF در ساعت با صف‌های غیرهمزمان، استفاده از سرورهای پردازشی ارزان‌قیمت Spot، و مکانیزم تلاش مجدد خودکار برای صفحات مخدوش.'
    }
  ];

  const handleApplyPreset = (preset: CaseStudyPreset) => {
    setSelectedPreset(preset.id);
    setTargetP95LatencySec(preset.targetP95LatencySec);
    setUptimeTarget(preset.uptimeTarget);
    setMaxConcurrency(preset.maxConcurrency);
    setCloudMonthlyBudget(preset.cloudMonthlyBudget);
    setErrorRateTolerancePercent(preset.errorRateTolerancePercent);
  };

  // Compile full markdown output
  const generateCanvasMarkdown = () => {
    const curPreset = caseStudyPresets.find(p => p.id === selectedPreset) || caseStudyPresets[0];

    if (lang === 'fa') {
      return `### فاز اول متدولوژی CPMAI: درک کسب‌وکار (Phase I: Business Understanding)
### گروه وظیفه: عملکرد و عملیات سیستم هوش مصنوعی (Task Group: AI System Performance and Operation)
### وظیفه: مقادیر قابل قبول سنجه‌های کلیدی عملکرد فناوری (Task: Required Technology KPIs - اسلاید ۳۱)

---

#### ۱. منطق متدولوژی CPMAI برای سنجه‌های فناوری (Technology KPIs Rationale):
در حالی که سنجه‌های مدل (مانند دقت و بازیابی در اسلایدهای ۲۸ و ۲۹) کیفیت آماری الگوریتم را می‌سنجند و سنجه‌های تجاری (اسلاید ۳۰) توجیه مالی پروژه را تضمین می‌کنند، **سنجه‌های کلیدی فناوری (Technology KPIs)** تضمین‌کننده پایداری عملیاتی، کارایی معماری زیرساخت و انطباق فنی با تیم‌های IT، DevOps و MLOps هستند.

سنجه‌های فناوری باید کمّی، شفاف و در سطح سیستم‌های مانیتورینگ ابری (Prometheus، Datadog، AWS CloudWatch) قابل سنجش و هشداردهی باشند.

---

#### ۲. سنجه‌های کلیدی فناوری برای تکرار جاری پروژه (Required Technology KPIs):

##### ۱. تاخیر و زمان پاسخ‌دهی سیستم (Latency & Response Time SLAs):
- **آستانه تاخیر استنتاج صدک ۹۵ (P95 Latency SLA):** حداکثر ${targetP95LatencySec} ثانیه برای تولید و ارسال پاسخ در هر نوبت مکالمه.
- **آستانه تاخیر صدک ۹۹ (P99 Latency SLA):** حداکثر ۲.۵ ثانیه در ساعات اوج بار ترافیکی.
- **زمان دریافت اولین توکن (Time to First Token - TTFT):** کمتر از ۴۰۰ میلی‌ثانیه برای پاسخ‌های متنی جریانی (Streaming).
- **تاخیر جستجوی برداری در پایگاه دانش (Vector DB RAG Retrieval):** کمتر از ${vectorSearchLatencyMs} میلی‌ثانیه برای بازیابی مرتبط‌ترین مستندات پایگاه دانش.

##### ۲. مصرف منابع ابری و مدیریت هزینه‌های زیرساخت (Cloud Resource Usage & FinOps):
- **سقف مجاز هزینه ماهانه سرورها و استنتاج ابری (Cloud Budget Ceiling):** حداکثر $${cloudMonthlyBudget.toLocaleString('fa-IR')} دلار در ماه برای چرخه اول (MVP).
- **میزان بهره‌وری پردازنده‌های گرافیکی (GPU Utilization SLA):** نرخ بهره‌وری پایدار بین ۶۵٪ تا ۷۵٪ در ساعات کاری؛ فعال‌سازی سیاست مقیاس‌پذیری خودکار (Auto-scaling) در صورت عبور بار پردازشی از ۸۰٪.
- **ردپای حافظه مدل (Memory Footprint):** حداکثر ۱۶ گیگابایت حافظه VRAM به ازای هر نود پردازشی از طریق تکنیک‌های کوانتیزاسیون (Quantization 8-bit / 4-bit).

##### ۳. گذردهی و الزامات سیستم‌های داده (Data Systems & Throughput):
- **حداکثر کاربران همزمان پشتیبانی‌شده (Peak Concurrency):** پشتیبانی بدون افت عملکرد از ${maxConcurrency} مکالمه همزمان در ساعات شلوغی فروشگاه.
- **گذردهی درگاه‌های ارتباطی (API Throughput):** توانایی پردازش ۵۰ درخواست در ثانیه (RPS).
- **محدودیت نرخ تبادل با وب‌سرویس‌های قدیمی (Legacy API Rate-Limiting):** محدودسازی فراخوانی‌های سرویس CRM و انبارداری به سقف ۴۵ درخواست در ثانیه همراه با کش‌گذاری نتایج پرکاربرد در Redis (با طول عمر کش ۱۵ دقیقه).

##### ۴. نرخ‌های خطا، قابلیت اطمینان و پایداری (Error Rates & Reliability):
- **نرخ خطای سرویس‌های سیستمی (HTTP 5xx Error Rate):** کمتر از ${errorRateTolerancePercent}٪ از کل فراخوانی‌های وب‌سرویس.
- **دسترسی‌پذیری و پایداری سیستم (Uptime SLA):** حداقل ${uptimeTarget}٪ (معادل کمتر از ۴۳ دقیقه توقف غیربرنامه‌ریزی‌شده در کل ماه).
- **پروتکل قطع‌کننده مدار (Circuit Breaker) و Fallback:** در صورت تاخیر بیش از ۳ ثانیه در دریافت اطلاعات از وب‌سرویس CRM یا کاهش قطعیت مدل به زیر ۸۲٪، گفت‌وگو بلافاصله با پیامی محترمانه به کارشناس پشتیبانی ارجاع داده می‌شود.
- **میانگین زمان بازیابی از خرابی (MTTR):** کمتر از ۱۵ دقیقه با اتکا به کانتینرهای خودترمیم‌شونده در کوبرنتیز و قابلیت Rollback سریع در پایپ‌لاین CI/CD.

##### ۵. امنیت، انطباق داده‌ها و حاکمیت (Security & Data Governance):
- **ماسک‌سازی خودکار داده‌های حساس (PII Redaction):** ماسک‌سازی ۱۰۰٪ اطلاعات کارت‌های بانکی، شماره‌های تماس و کلمات عبور قبل از ذخیره‌سازی در پایگاه داده یا ارسال به مدل زبانی.
- **رمزنگاری داده‌ها:** استفاده از پروتکل امنیتی TLS 1.3 در انتقال و الگوریتم AES-256 برای داده‌های ذخیره‌شده روی دیسک.
- **پایش رانش داده و مدل (Model Drift Monitoring):** ثبت گزارش روزانه توزیع ورودی‌های کاربران و اعلام هشدار در صورت رانش مفهومی واژگان بیش از ۵٪.

---

#### ۳. پیوند و همسوسازی سنجه‌های فناوری با اهداف تجاری (Alignment with Business KPIs):
- دستیابی به سنجه **تاخیر زیر ۱.۵ ثانیه** پیش‌شرط قطعی تحقق شاخص **رضایت مشتری (CSAT بالای ۴.۲)** است؛ مکالمات کند باعث انصراف کاربر و برقراری تماس تلفنی پرهزینه می‌شود.
- پایداری **آپتایم ۹۹.۹٪** تضمین می‌کند که پروژه می‌تواند به هدف تجاری **مهار خودکار ۴۰٪ از تیکت‌ها** دست یابد.
- مهار **هزینه ابری زیر ۴,۵۰۰ دلار** حاشیه سود و نرخ بازگشت سرمایه (**ROI معادل ۱۸۰٪**) را در چرخه اول حفظ می‌کند.`;
    }

    return `### CPMAI Phase I: Business Understanding
### Task Group: AI System Performance and Operation
### Task: Required Technology KPIs (Slide 31)

---

#### 1. CPMAI Methodology Rationale for Technology KPIs:
While model performance metrics (Slides 28-29) evaluate algorithmic accuracy and business KPIs (Slide 30) validate commercial return, **Technology KPIs** govern operational feasibility, infrastructural stability, and technical SLAs negotiated with IT, DevOps, and MLOps teams.

These metrics must be quantifiable and monitorable in real-time via enterprise APM tools (e.g. Datadog, CloudWatch, Prometheus).

---

#### 2. Required Technology KPIs Specification:

##### 1. Latency & Response Time SLAs:
- **P95 Latency SLA:** Maximum ${targetP95LatencySec} seconds for end-to-end response generation per conversational turn.
- **P99 Latency SLA:** Under 2.5 seconds during peak concurrency spikes.
- **Time to First Token (TTFT):** Under 400ms for streaming LLM generation.
- **RAG Vector Search Latency:** Under ${vectorSearchLatencyMs}ms for similarity searches across enterprise knowledge embeddings.

##### 2. Server, GPU & Cloud Resource Usage (FinOps):
- **Monthly Cloud Compute Budget Ceiling:** Capped at $${cloudMonthlyBudget.toLocaleString()} for the MVP iteration to prevent cost overruns.
- **GPU Cluster Utilization Target:** Sustained 65-75% load during business hours; auto-scaling policy triggers when load exceeds 80%.
- **Model Memory Footprint:** VRAM capped at <= 16GB per worker node using 8-bit quantization.

##### 3. Data Systems & Throughput Requirements:
- **Peak Concurrency:** Support ${maxConcurrency} concurrent active sessions without latency degradation.
- **API Throughput:** Sustained 50 queries/second capacity.
- **Legacy CRM API Rate Limits:** Ingestion rate throttled to 45 req/sec with Redis caching (TTL = 15 minutes) to protect upstream ERP systems.

##### 4. Error Rates, Reliability & High Availability:
- **Service Error Rate (HTTP 5xx):** Strictly < ${errorRateTolerancePercent}% of total API calls.
- **System Uptime & Availability SLA:** Minimum ${uptimeTarget}% uptime (max 43 minutes unplanned downtime per month).
- **Circuit Breaker & Fallback:** Automated graceful handoff to human agents when inference exceeds 3.0s or confidence dips below 82%.
- **Mean Time to Recovery (MTTR):** < 15 minutes via self-healing Kubernetes pod restarts and automated CI/CD rollback.

##### 5. Security & Data Governance:
- **PII Redaction:** 100% masking of payment info, passwords, and identifiers prior to logging.
- **Encryption:** TLS 1.3 in-transit and AES-256 at-rest.
- **Model Drift Auditing:** Automated daily confidence monitoring with anomaly alerts if drift exceeds 5%.

---

#### 3. Alignment with Business KPIs:
- **Sub-1.5s Latency** is a direct prerequisite for achieving **CSAT >= 4.2**; slow responses trigger immediate customer abandonment.
- **99.9% Uptime** guarantees that the system delivers on its commercial goal of **40% tier-1 containment**.
- **$4,500 Cloud Cap** protects operational margins and guarantees the projected **180% ROI**.`;
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
                  ? 'فاز اول: درک کسب‌وکار • اسلاید ۳۱'
                  : 'CPMAI Phase I: Business Understanding • Slide 31'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {lang === 'fa'
                ? 'سنجه‌های کلیدی عملکرد فناوری (Required Technology KPIs)'
                : 'Required Technology KPIs'}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              {lang === 'fa'
                ? 'تعیین الزامات فنی سیستم هوش مصنوعی مرتبط با تیم IT و عملیات شامل زمان پاسخ‌دهی (SLA)، مصرف سرور و ابر، نیازمندی‌های داده‌ای، گذردهی و سقف مجاز نرخ خطا.'
                : 'Define operational technology KPIs relevant to IT and technical operations—such as response times, cloud/server compute usage, data throughput, and error rate ceilings.'}
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

      {/* Official Slide 31 Prompt Box */}
      <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-900 dark:text-teal-200">
          <Terminal className="w-4 h-4 text-teal-600" />
          <span>{lang === 'fa' ? 'متن و پرسش رسمی اسلاید ۳۱ کتاب کار PMI-CPMAI:' : 'Official Slide 31 Task Prompt:'}</span>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          {lang === 'fa'
            ? '«سنجه‌های کلیدی فناوری مورد نیاز که برای تیم فناوری اطلاعات (IT) یا عملیات فنی مرتبط هستند — مانند زمان پاسخ‌دهی، مصرف سرور یا ابر، نیازمندی‌های سیستم‌های داده، نرخ‌های خطا یا سایر سنجه‌ها — که این پروژه قصد دستیابی به آن‌ها را دارد چیست؟ این KPIها باید سنجه‌هایی قابل ارزیابی باشند که سیستم و پروژه بتوانند در برابر آن‌ها سنجیده شوند.»'
            : 'What are the required technology KPIs that would be relevant to the IT team or technical operation—such as response time, server or cloud usage, data system requirements, error rates, or other metrics—that this project will aim to achieve? These KPIs need to be assessable metrics that the system and project can be measured against.'}
        </p>
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
          <Activity className="w-4 h-4" />
          <span>{lang === 'fa' ? 'کاربرگ ۵ ستون KPI فناوری' : '5 Technology KPI Pillars'}</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{lang === 'fa' ? 'تنظیم‌کننده توافق‌نامه سطح خدمات (SLA Simulator)' : 'SLA & Cloud Simulator'}</span>
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
          <span>{lang === 'fa' ? 'راهنمای FinOps و MLOps' : 'FinOps & MLOps Governance'}</span>
        </button>
      </div>

      {/* TAB 1: 5 Technology KPI Pillars */}
      {activeTab === 'worksheet' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pillar 1: Latency & Response Times */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00738c] dark:text-[#6ee7b7] border-b border-gray-100 dark:border-gray-800 pb-2">
                <Clock className="w-4 h-4" />
                <span>{lang === 'fa' ? '۱. زمان پاسخ‌دهی و تاخیر استنتاج (Response Time SLAs)' : '1. Response Time & Latency SLAs'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'آستانه تاخیر صدک ۹۵ (P95 Latency): ' : 'P95 Latency SLA: '}</strong>
                    <span>{lang === 'fa' ? `حداکثر ${targetP95LatencySec} ثانیه در هر نوبت گفت‌وگو` : `<= ${targetP95LatencySec}s per turn`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'دریافت اولین توکن (TTFT): ' : 'Time to First Token: '}</strong>
                    <span>{lang === 'fa' ? 'کمتر از ۴۰۰ میلی‌ثانیه برای پاسخ‌های جریانی' : '< 400ms for streaming responses'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'بازیابی برداری RAG (Vector Search): ' : 'Vector Retrieval: '}</strong>
                    <span>{lang === 'fa' ? `کمتر از ${vectorSearchLatencyMs} میلی‌ثانیه برای جستجوی اسناد پایگاه دانش` : `< ${vectorSearchLatencyMs}ms across FAQ index`}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Cloud / Server Resource & FinOps */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1f5163] dark:text-[#99e2b4] border-b border-gray-100 dark:border-gray-800 pb-2">
                <Cpu className="w-4 h-4" />
                <span>{lang === 'fa' ? '۲. مصرف سرور، ابر و هزینه‌ها (Server & Cloud Usage)' : '2. Server & Cloud Compute (FinOps)'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'سقف هزینه ابری ماهانه: ' : 'Monthly Cloud Cap: '}</strong>
                    <span>{lang === 'fa' ? `حداکثر $${cloudMonthlyBudget.toLocaleString('fa-IR')} دلار در ماه برای فاز MVP` : `Capped at $${cloudMonthlyBudget.toLocaleString()} / month`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'بهره‌وری سرورهای گرافیکی (GPU Load): ' : 'GPU Utilization: '}</strong>
                    <span>{lang === 'fa' ? 'میانگین ۶۵٪ تا ۷۵٪ و مقیاس‌پذیری خودکار با عبور از ۸۰٪' : '65-75% sustained load; auto-scale at 80%'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f5163] mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'ردپای حافظه مدل (VRAM Footprint): ' : 'Memory Footprint: '}</strong>
                    <span>{lang === 'fa' ? 'کوانتیزاسیون ۸ بیتی با مصرف حداکثر ۱۶ گیگابایت حافظه' : '<= 16GB VRAM per worker node'}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Data System Requirements & Concurrency */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                <Database className="w-4 h-4" />
                <span>{lang === 'fa' ? '۳. نیازمندی‌های سیستم داده و گذردهی (Data System Requirements)' : '3. Data System & Throughput'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'کاربران همزمان (Peak Concurrency): ' : 'Peak Concurrency: '}</strong>
                    <span>{lang === 'fa' ? `پشتیبانی پایدار از ${maxConcurrency} گفت‌وگوی زنده همزمان` : `${maxConcurrency} concurrent active chats`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'کنترل نرخ وب‌سرویس CRM (Rate Limiting): ' : 'CRM API Rate Limit: '}</strong>
                    <span>{lang === 'fa' ? 'حداکثر ۴۵ درخواست در ثانیه همراه با کش ۱۵ دقیقه‌ای Redis' : 'Throttled to 45 req/sec with 15m Redis TTL'}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Pillar 4: Error Rates & High Availability */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'fa' ? '۴. نرخ‌های خطا و پایداری سرویس (Error Rates & Reliability)' : '4. Error Rates & Uptime SLAs'}</span>
              </div>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'نرخ خطای سیستمی (HTTP 5xx): ' : 'Service Error Rate: '}</strong>
                    <span>{lang === 'fa' ? `کمتر از ${errorRateTolerancePercent}٪ از کل فراخوانی‌ها` : `< ${errorRateTolerancePercent}% of all API traffic`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'پایداری و دسترسی‌پذیری (Uptime SLA): ' : 'Uptime SLA: '}</strong>
                    <span>{lang === 'fa' ? `حداقل ${uptimeTarget}٪ دسترسی در ماه (کمتر از ۴۳ دقیقه داون‌تایم)` : `>= ${uptimeTarget}% uptime monthly`}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>{lang === 'fa' ? 'بازیابی از خرابی (MTTR): ' : 'Recovery Time (MTTR): '}</strong>
                    <span>{lang === 'fa' ? 'کمتر از ۱۵ دقیقه با کانتینرهای خودترمیم‌شونده' : '< 15 minutes self-healing recovery'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive SLA & Resource Simulator */}
      {activeTab === 'simulator' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#00738c]" />
              <span>{lang === 'fa' ? 'شبیه‌ساز و تنظیم‌کننده توافق‌نامه سطح خدمات (SLA & Infrastructure Tuning)' : 'Infrastructure SLA & Capacity Tuning Simulator'}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'fa'
                ? 'مقادیر فنی را تغییر دهید تا مشخصات توافق‌نامه سطح خدمات فناوری اطلاعات به صورت خودکار محاسبه و تنظیم شوند.'
                : 'Tune technical parameters to configure real-time IT operational benchmarks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Control 1: P95 Latency */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'آستانه تاخیر استنتاج صدک ۹۵ (P95 Latency):' : 'P95 Latency SLA:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  {targetP95LatencySec} s
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={targetP95LatencySec}
                onChange={(e) => setTargetP95LatencySec(parseFloat(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>

            {/* Control 2: Uptime SLA */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'پایداری و دسترسی‌پذیری ماهانه (Uptime SLA):' : 'Monthly Uptime SLA:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  {uptimeTarget}%
                </span>
              </div>
              <input
                type="range"
                min="99.0"
                max="99.99"
                step="0.05"
                value={uptimeTarget}
                onChange={(e) => setUptimeTarget(parseFloat(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>

            {/* Control 3: Peak Concurrency */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'حداکثر سقف جلسات همزمان (Peak Concurrency):' : 'Peak Concurrent Chats:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  {maxConcurrency}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={maxConcurrency}
                onChange={(e) => setMaxConcurrency(parseInt(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>

            {/* Control 4: Monthly Cloud FinOps Cap */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {lang === 'fa' ? 'سقف بودجه ابری ماهانه (Cloud FinOps Cap):' : 'Monthly Cloud Budget Cap:'}
                </span>
                <span className="font-bold text-[#00738c] font-mono text-sm">
                  ${cloudMonthlyBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={cloudMonthlyBudget}
                onChange={(e) => setCloudMonthlyBudget(parseInt(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time SLA Benchmark Status */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-[#00738c]/10 to-blue-500/10 border border-teal-300 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00738c]" />
              <div>
                <span className="font-bold text-xs text-gray-900 dark:text-white block">
                  {lang === 'fa' ? 'وضعیت ارزیابی معماری فنی:' : 'Architecture SLA Grade:'}
                </span>
                <span className="text-[11px] text-gray-500">
                  {lang === 'fa'
                    ? `سازگار با استانداردهای سازمانی (آپتایم ${uptimeTarget}٪ با تاخیر استنتاج ${targetP95LatencySec} ثانیه)`
                    : `Enterprise grade: ${uptimeTarget}% uptime with ${targetP95LatencySec}s P95 turn latency`}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700">
              {lang === 'fa' ? '✓ تاییدشده برای فاز اول CPMAI' : '✓ CPMAI Phase I Certified'}
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
                <span>{lang === 'fa' ? 'بوم مستندات کتاب کار CPMAI (اسلاید ۳۱)' : 'CPMAI Workbook Canvas (Slide 31)'}</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'fa'
                  ? 'مستندات نهایی سنجه‌های فناوری که مبنای توافق‌نامه سطح خدمات (SLA) با تیم‌های IT و DevOps خواهد بود.'
                  : 'Official documentation artifact capturing your required Technology KPIs for IT alignment.'}
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
            placeholder={lang === 'fa' ? 'سنجه‌های کلیدی عملکرد فناوری را در اینجا مستند و ذخیره فرمایید...' : 'Document required technology KPIs...'}
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
            <span>{lang === 'fa' ? 'راهنما و بینش‌های متدولوژی CPMAI برای سنجه‌های فناوری (اسلاید ۳۱)' : 'CPMAI Methodology Insights for Technology KPIs (Slide 31)'}</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۱. چرا سنجه‌های فناوری برای تیم IT در پروژه‌های شناختی حیاتی است؟' : '1. Why Technology KPIs Are Mission-Critical for IT Teams'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'برخلاف سرویس‌های سنتی وب، پردازش‌های هوش مصنوعی (به‌ویژه مدل‌های یادگیری عمیق و LLMها) بار پردازشی سنگینی به سرورهای GPU وارد می‌کنند و می‌توانند باعث افزایش سرسام‌آور هزینه‌های ابری (Cloud Runaway Costs) شوند. توافق بر سر سنجه‌های فناوری به مدیر پروژه اجازه می‌دهد منابع سرور، تاخیر مجاز و سقف هزینه‌های ابری را قبل از ورود به فاز عملیاتی کنترل کند.'
                  : 'Unlike standard web microservices, AI inference incurs heavy GPU loads and unpredictable cloud bills. Agreeing on strict Technology KPIs enables project managers and IT leads to bound resource consumption, latency SLAs, and cost ceilings before deployment.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۲. مهار تاخیر و زنجیره خطای سیستم‌های بیرونی (Circuit Breaker Design):' : '2. Graceful Degradation & Circuit Breakers'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'چت‌بات هوش مصنوعی وابسته به APIهای سازمان (CRM، دیتابیس سفارشات و سیستم انبار) است. اگر این سرویس‌های قدیمی در ساعات اوج کند شوند یا از کار بیفتند، سیستم هوش مصنوعی نباید کاربر را معلق نگه دارد. پیاده‌سازی مکانیزم Circuit Breaker و کش‌گذاری نتایج، از قفل شدن مدل جلوگیری می‌کند.'
                  : 'AI chatbots depend on external enterprise systems (CRM, inventory, ERP). If upstream endpoints stall under load, the AI system must not hang. Implementing circuit breakers and caching preserves responsiveness and user trust.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs flex-wrap gap-3">
        <button
          onClick={onGoToPage20}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: ۲۰ (اسلاید ۳۰: سنجه‌های KPI کسب‌وکار)'
              : 'Previous: Page 20 (Slide 30: Business KPIs)'}
          </span>
        </button>

        {onGoToPage22 && (
          <button
            onClick={onGoToPage22}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors cursor-pointer shadow-xs"
          >
            <span>
              {lang === 'fa'
                ? 'صفحه بعدی: ۲۲ (اسلاید ۳۲)'
                : 'Next: Page 22 (Slide 32)'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
