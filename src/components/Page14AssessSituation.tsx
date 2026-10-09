import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Target,
  ShieldCheck,
  TrendingUp,
  Zap,
  Info,
  Layers,
  Network,
  Cpu,
  Bot,
  Search,
  Workflow,
  Clock,
  Calendar,
  Users,
  HardDrive,
  Database,
  DollarSign,
  Flag,
  AlertCircle,
  Timer,
  Server,
  Layers3,
  Sliders,
  CheckSquare
} from 'lucide-react';

interface Page14Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage13: () => void;
  onGoToPage15?: () => void;
}

interface ResourceRole {
  id: string;
  titleEn: string;
  titleFa: string;
  category: 'talent' | 'compute' | 'software' | 'budget';
  allocationEn: string;
  allocationFa: string;
  descriptionEn: string;
  descriptionFa: string;
  keySkillsEn: string[];
  keySkillsFa: string[];
  riskIfMissingEn: string;
  riskIfMissingFa: string;
}

interface MilestoneGate {
  phase: string;
  titleEn: string;
  titleFa: string;
  targetWeekEn: string;
  targetWeekFa: string;
  deliverableEn: string;
  deliverableFa: string;
  gateCriteriaEn: string;
  gateCriteriaFa: string;
  criticalDependencyEn: string;
  criticalDependencyFa: string;
}

interface CaseStudyTemplate {
  id: string;
  nameEn: string;
  nameFa: string;
  domainEn: string;
  domainFa: string;
  badgeColor: string;
  sprintCadenceEn: string;
  sprintCadenceFa: string;
  totalTimeboxEn: string;
  totalTimeboxFa: string;
  resourceSummaryEn: string;
  resourceSummaryFa: string;
  scheduleSummaryEn: string;
  scheduleSummaryFa: string;
  fullWorkbookEn: string;
  fullWorkbookFa: string;
}

export const Page14AssessSituation: React.FC<Page14Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage13,
  onGoToPage15
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'resources' | 'schedule' | 'templates' | 'canvas' | 'audit'>('resources');
  const [resourceSubCategory, setResourceSubCategory] = useState<'all' | 'talent' | 'compute' | 'software' | 'budget'>('all');
  const [selectedSprintLength, setSelectedSprintLength] = useState<number>(2); // 2-week sprint
  const [selectedIterationWeeks, setSelectedIterationWeeks] = useState<number>(6); // 6-week timebox

  // 1. Resource Catalog for AI Projects
  const RESOURCE_ROLES: ResourceRole[] = [
    {
      id: 'biz-sme',
      titleEn: 'Business Subject Matter Expert (SME) / Product Owner',
      titleFa: 'متخصص موضوعی کسب‌وکار (SME) / مالک محصول',
      category: 'talent',
      allocationEn: '30% - 50% FTE throughout iteration',
      allocationFa: '۳۰٪ تا ۵۰٪ ظرفیت تمام‌وقت در طول چرخه',
      descriptionEn: 'Validates cognitive project requirements, clarifies edge cases, and verifies that model output aligns with business decisions.',
      descriptionFa: 'الزامات شناختی را اعتبارسنجی می‌کند، حالت‌های حدی را شفاف می‌سازد و انطباق خروجی مدل با تصمیمات تجاری را تأیید می‌کند.',
      keySkillsEn: ['Domain operational knowledge', 'Decision rule expertise', 'Business metric ownership'],
      keySkillsFa: ['دانش عملیاتی حوزه تخصصی', 'تسلط بر قوانین تصمیم‌گیری', 'مالکیت شاخص‌های تجاری'],
      riskIfMissingEn: 'Model solves the wrong question or produces technically sound but business-useless predictions.',
      riskIfMissingFa: 'مدل مسئله اشتباهی را حل می‌کند یا پیش‌بینی‌هایی دقیق اما بی‌فایده برای کسب‌وکار می‌سازد.'
    },
    {
      id: 'data-scientist',
      titleEn: 'Lead Data Scientist / Applied ML Researcher',
      titleFa: 'دانشمند ارشد داده / پژوهشگر یادگیری ماشین کاربردی',
      category: 'talent',
      allocationEn: '100% FTE',
      allocationFa: '۱۰۰٪ ظرفیت تمام‌وقت',
      descriptionEn: 'Explores data distributions, establishes baseline heuristics, tests algorithmic hypothesis, and tunes candidate models.',
      descriptionFa: 'توزیع‌های داده را کاوش می‌کند، خط مبنای اولیه را می‌سازد، فرضیات الگوریتمی را آزمایش و مدل‌های کاندید را تنظیم می‌کند.',
      keySkillsEn: ['Statistical modeling', 'PyTorch / Scikit-learn', 'Feature engineering', 'Evaluation metrics'],
      keySkillsFa: ['مدل‌سازی آماری', 'پایتورچ و سایکیت‌لرن', 'مهندسی ویژگی‌ها', 'متریک‌های ارزیابی'],
      riskIfMissingEn: 'Inability to formulate mathematically sound models, leading to overfitting or model delusion.',
      riskIfMissingFa: 'ناتوانی در فرموله‌سازی ریاضی مناسب که منجر به بیش‌برازش یا توهم مدل می‌شود.'
    },
    {
      id: 'ml-engineer',
      titleEn: 'Machine Learning Engineer (MLOps & Inference)',
      titleFa: 'مهندس یادگیری ماشین (MLOps و استنتاج برخط)',
      category: 'talent',
      allocationEn: '80% - 100% FTE',
      allocationFa: '۸۰٪ تا ۱۰۰٪ ظرفیت تمام‌وقت',
      descriptionEn: 'Builds reproducible training pipelines, packages model artifacts, quantizes weights for low latency, and configures monitoring.',
      descriptionFa: 'پایپ‌لاین‌های بازتولیدپذیر آموزش را می‌سازد، مدل را بسته‌بندی می‌کند، کوانتیزه‌سازی برای تاخیر کم را انجام می‌دهد و پایش را پیکربندی می‌کند.',
      keySkillsEn: ['Docker / Kubernetes', 'Model serving (vLLM, Triton)', 'CI/CD for ML', 'Latency optimization'],
      keySkillsFa: ['داکر و کوبرنتیز', 'سرویس‌دهی مدل (vLLM, Triton)', 'توسعه مداوم ML', 'بهینه‌سازی تاخیر'],
      riskIfMissingEn: 'Models remain stranded in exploratory Jupyter notebooks and never reach production stability.',
      riskIfMissingFa: 'مدل در نوت‌بوک‌های تحقیقاتی محبوس مانده و هرگز به پایداری عملیاتی در محیط واقعی نمی‌رسد.'
    },
    {
      id: 'data-engineer',
      titleEn: 'Data Engineer / Pipeline Architect',
      titleFa: 'مهندس داده / معمار پایپ‌لاین‌های داده',
      category: 'talent',
      allocationEn: '100% FTE in Phases II-III, 30% in later phases',
      allocationFa: '۱۰۰٪ تمام‌وقت در فازهای ۲ و ۳، ۳۰٪ در فازهای بعدی',
      descriptionEn: 'Extracts data from transactional lakes, builds sanitization pipelines, enforces schemas, and ensures high-throughput ingestion.',
      descriptionFa: 'داده‌ها را از پایگاه‌های عملیاتی استخراج می‌کند، پایپ‌لاین پالایش می‌سازد، ساختارها را اعمال و بارگذاری با کارایی بالا را تضمین می‌کند.',
      keySkillsEn: ['SQL / Spark / dbt', 'Data lakehouses (BigQuery, Snowflake)', 'ETL/ELT orchestration', 'Data quality tests'],
      keySkillsFa: ['اس‌کیوال، اسپارک، dbt', 'دریاچه‌داده (Snowflake, BigQuery)', 'ارکستراسیون ETL/ELT', 'تست‌های کیفیت داده'],
      riskIfMissingEn: 'Data poisoning, schema drift, garbage-in-garbage-out, and weeks of project delays waiting for extracts.',
      riskIfMissingFa: 'آلودگی داده‌ها، تغییر ساختار ناگهانی و هفته‌ها تاخیر پروژه در انتظار دریافت خروجی‌های داده.'
    },
    {
      id: 'gov-legal',
      titleEn: 'AI Ethics, Governance & Legal Advisor',
      titleFa: 'مشاور اخلاق هوش مصنوعی، حاکمیت و حقوقی',
      category: 'talent',
      allocationEn: '15% - 25% FTE (Stage-gate clearance)',
      allocationFa: '۱۵٪ تا ۲۵٪ ظرفیت (تأیید گیت‌های مرحله‌ای)',
      descriptionEn: 'Reviews data licensing, PII compliance, intellectual property boundaries, bias audits, and regulatory mandates.',
      descriptionFa: 'مجوزهای قانونی داده، محرمانگی اطلاعات هویتی (PII)، مالکیت فکری، ممیزی تعصبات و الزامات نظارتی را بررسی می‌کند.',
      keySkillsEn: ['Data privacy (GDPR / HIPAA)', 'EU AI Act compliance', 'Algorithmic accountability', 'IP contracts'],
      keySkillsFa: ['حریم خصوصی (GDPR / HIPAA)', 'انطباق با قوانین هوش مصنوعی', 'پاسخگویی الگوریتمی', 'قراردادهای مالکیت'],
      riskIfMissingEn: 'Regulatory fines, reputation disasters, or cancellation of project at deployment time due to compliance blocks.',
      riskIfMissingFa: 'جریمه‌های سنگین رگولاتوری، آسیب به برند یا لغو پروژه در آستانه انتشار به دلیل موانع قانونی.'
    },
    {
      id: 'compute-training',
      titleEn: 'GPU / Accelerator Training Cluster',
      titleFa: 'خوشه پردازش شتاب‌یافته گرافیکی (GPU) جهت آموزش',
      category: 'compute',
      allocationEn: 'Dedicated burst cluster (e.g. 4x A100/H100 or on-demand cloud spot)',
      allocationFa: 'خوشه محاسباتی اختصاصی یا ابری (مثلاً 4x A100/H100 یا سرورهای ابری)',
      descriptionEn: 'High-memory GPU/TPU nodes required for deep feature embeddings, model training runs, and hyperparameter sweeps.',
      descriptionFa: 'گره‌های گرافیکی با حافظه بالا جهت استخراج امبدینگ‌ها، دوره‌های آموزش مدل و جستجوی هایپرپارامترها.',
      keySkillsEn: ['CUDA 12.x', 'High-throughput NVMe scratch disk', 'Distributed training interconnect'],
      keySkillsFa: ['کودا ۱۲', 'دیسک‌های پرسرعت NVMe محلی', 'ارتباطات شبکه‌ای با پهنای باند بالا'],
      riskIfMissingEn: 'Training jobs take weeks instead of hours, completely freezing the agile experimental iteration cycle.',
      riskIfMissingFa: 'فرآیند آموزش هفته‌ها به جای چند ساعت طول کشیده و چرخه چابک آزمایش‌ها را به کلی متوقف می‌کند.'
    },
    {
      id: 'compute-inference',
      titleEn: 'Production Low-Latency Inference Serving',
      titleFa: 'زیرساخت استنتاج برخط با تاخیر پایین برای بهره‌برداری',
      category: 'compute',
      allocationEn: 'Autoscaling CPU/GPU endpoint with 99.9% SLA',
      allocationFa: 'اندپوینت با قابلیت مقیاس‌پذیری خودکار پردازنده/گرافیک و پایداری ۹۹.۹٪',
      descriptionEn: 'Reliable hosting with sub-100ms response time, high concurrency handling, and zero-downtime canary deployments.',
      descriptionFa: 'میزبانی پایدار با پاسخگویی زیر ۱۰۰ میلی‌ثانیه، مدیریت بار ترافیک همزمان و استقرار قناری بدون قطعی.',
      keySkillsEn: ['Kubernetes / Serverless ML', 'Model Quantization (INT8/FP16)', 'Prometheus / Grafana metrics'],
      keySkillsFa: ['کوبرنتیز یا سرورلس ML', 'کوانتیزه‌سازی مدل (INT8/FP16)', 'پایش پرومتئوس و گرافانا'],
      riskIfMissingEn: 'Inference latency spikes under real user load, causing downstream application timeouts and user churn.',
      riskIfMissingFa: 'تاخیر شدید در پاسخگویی تحت بار واقعی کاربران که منجر به تایم‌اوت سامانه‌ها و ریزش مشتری می‌شود.'
    },
    {
      id: 'sw-lakehouse',
      titleEn: 'Data Lakehouse & Feature Store',
      titleFa: 'دریاچه‌داده تحلیلی و مخزن ویژگی‌ها (Feature Store)',
      category: 'software',
      allocationEn: 'Unified analytics repository with row-level security',
      allocationFa: 'مخزن یکپارچه تحلیلی با امنیت در سطح ردیف',
      descriptionEn: 'Stores raw history, cleaned transformation tables, and real-time offline/online feature values with zero train-serve skew.',
      descriptionFa: 'ذخیره تاریخچه خام، جداول پالایش‌شده و مقادیر ویژگی‌ها بدون انحراف میان آموزش و بهره‌برداری.',
      keySkillsEn: ['Snowflake / BigQuery / Databricks', 'Feast / Hopsworks', 'Delta Lake / Iceberg'],
      keySkillsFa: ['اسنوفلیک، بیگ‌کوئری، دیتا‌بریکس', 'ابزارهای Feature Store', 'فرمت‌های مدرن دلتا‌لیک'],
      riskIfMissingEn: 'Train-serving skew: model receives different feature definitions in production than it was trained on.',
      riskIfMissingFa: 'انحراف آموزش-بهره‌برداری: مدل در محیط عملیاتی داده‌هایی با تعاریف متفاوت از زمان آموزش دریافت می‌کند.'
    },
    {
      id: 'sw-mlops',
      titleEn: 'MLOps Pipeline & Experiment Tracker',
      titleFa: 'سامانه ارکستراسیون MLOps و رهگیری آزمایش‌ها',
      category: 'software',
      allocationEn: 'Centralized registry & artifact store',
      allocationFa: 'مخزن متمرکز مدل‌ها و رهگیری آزمایش‌ها',
      descriptionEn: 'Tracks code versions, hyperparameters, metrics, and generated artifacts to maintain 100% audit reproducibility.',
      descriptionFa: 'نسخه‌های کد، هایپرپارامترها، متریک‌ها و مدل‌های خروجی را برای تکرارپذیری کامل ممیزی ثبت می‌کند.',
      keySkillsEn: ['MLflow / Weights & Biases', 'DVC (Data Version Control)', 'Kubeflow Pipelines'],
      keySkillsFa: ['ام‌ال‌فلو یا W&B', 'نسخه‌بندی داده با DVC', 'پایپ‌لاین‌های کوب‌فلو'],
      riskIfMissingEn: 'Engineers cannot reproduce successful past models or explain which training data created a production artifact.',
      riskIfMissingFa: 'مهندسان نمی‌توانند مدل‌های موفق گذشته را بازتولید کرده یا توضیح دهند کدام داده منجر به این مدل شده است.'
    },
    {
      id: 'budget-cloud',
      titleEn: 'Cloud Compute & API Token Budget Allocation',
      titleFa: 'بودجه رایانش ابری و توکن‌های مصرفی سرویس‌های خارجی',
      category: 'budget',
      allocationEn: 'Allocated run-rate + 25% exploratory experimentation buffer',
      allocationFa: 'بودجه تخمینی پردازش + ۲۵٪ بافر اضافه برای آزمایش‌های اکتشافی',
      descriptionEn: 'Dedicated budget for training node hours, inference servers, storage bandwidth, and commercial model tokens.',
      descriptionFa: 'بودجه مصوب برای ساعات مصرف سرورهای گرافیکی، ترافیک ذخیره‌سازی و مصرف توکن مدل‌های تجاری.',
      keySkillsEn: ['FinOps for Cloud ML', 'Cost monitoring alerts', 'Spot instance arbitrage'],
      keySkillsFa: ['مدیریت مالی ابری (FinOps)', 'هشدارهای سقف هزینه', 'استفاده از سرورهای تخفیف‌دار'],
      riskIfMissingEn: 'Project halted mid-iteration due to account quota freezes or unexpected invoice spikes.',
      riskIfMissingFa: 'توقف ناگهانی پروژه در میانه کار به علت مسدود شدن سهمیه حساب ابری یا هزینه‌های پیش‌بینی‌نشده.'
    }
  ];

  // 2. CPMAI Iteration Schedule & Milestone Stage-Gates
  const MILESTONES: MilestoneGate[] = [
    {
      phase: 'Phase I',
      titleEn: 'Gate 1: Business Objective & Pattern Sign-Off',
      titleFa: 'گیت ۱: تأیید اهداف کسب‌وکار و الگوی شناختی',
      targetWeekEn: 'Week 1',
      targetWeekFa: 'هفته ۱',
      deliverableEn: 'Signed business problem statement, measurable ROI metric, chosen AI pattern(s), and resource charter.',
      deliverableFa: 'بیانیه مصوب مسئله کسب‌وکار، شاخص سنجش‌پذیر ROI، الگوهای هوش مصنوعی برگزیده و منشور منابع.',
      gateCriteriaEn: 'Executive and SME consensus that an AI solution has clear advantages over non-cognitive alternatives.',
      gateCriteriaFa: 'اجماع مدیران و ذی‌نفعان بر اینکه راهکار AI برتری شفافی نسبت به جایگزین‌های غیرشناختی دارد.',
      criticalDependencyEn: 'Executive sponsor availability & clear decision ownership.',
      criticalDependencyFa: 'حضور و تصمیم‌گیری صریح حامی اجرایی و مالک محصول.'
    },
    {
      phase: 'Phase II',
      titleEn: 'Gate 2: Data Availability & Veracity Clearance',
      titleFa: 'گیت ۲: تأیید در دسترس بودن داده و کفایت کیفی',
      targetWeekEn: 'Week 2 - 3',
      targetWeekFa: 'هفته ۲ تا ۳',
      deliverableEn: 'Data Inventory Report, Exploratory Data Analysis (EDA) charts, and initial quality deficiency log.',
      deliverableFa: 'گزارش فهرست دارایی داده‌ها، نمودارهای تحلیل اکتشافی (EDA) و کارنامه نواقص اولیه داده.',
      gateCriteriaEn: 'Confirmed access to historical data with sufficient volume, signal quality, and acceptable label veracity.',
      gateCriteriaFa: 'تأیید دسترسی به حجم کافی از داده‌های معتبر با سیگنال مناسب و کیفیت برچسب‌گذاری قابل قبول.',
      criticalDependencyEn: 'Database credentials, security clearances, and PII masking sign-off.',
      criticalDependencyFa: 'دریافت دسترسی امنیتی، مجوزهای پایگاه داده و سازوکار ماسک‌سازی اطلاعات هویتی.'
    },
    {
      phase: 'Phase III',
      titleEn: 'Gate 3: Pristine Training Dataset & Baseline Pipeline',
      titleFa: 'گیت ۳: پایپ‌لاین تولید داده پالایش‌شده و خط مبنای ساده',
      targetWeekEn: 'Week 3 - 4',
      targetWeekFa: 'هفته ۳ تا ۴',
      deliverableEn: 'Automated data cleaning pipeline, train/val/test splits with leak prevention, and non-cognitive baseline heuristic benchmark.',
      deliverableFa: 'پایپ‌لاین پالایش خودکار داده، افراز بدون نشت داده آموزش/آزمون و خط مبنای ساده غیرشناختی برای مقایسه.',
      gateCriteriaEn: 'Repeatable feature generation established; simple heuristic performance documented as hurdle rate.',
      gateCriteriaFa: 'تکرارپذیری استخراج ویژگی‌ها اثبات شده و عملکرد روش ساده به عنوان حد نصاب ثبت شده است.',
      criticalDependencyEn: 'Data engineering compute clusters and label consensus with domain SMEs.',
      criticalDependencyFa: 'زیرساخت پردازش مهندسی داده و توافق بر روی تعریف برچسب‌ها با متخصصان حوزه.'
    },
    {
      phase: 'Phase IV',
      titleEn: 'Gate 4: Model Proof-of-Concept (POC) Benchmark',
      titleFa: 'گیت ۴: اثبات مفهوم مدل و شکستن حد نصاب خط مبنا',
      targetWeekEn: 'Week 4 - 5',
      targetWeekFa: 'هفته ۴ تا ۵',
      deliverableEn: 'Trained model artifact achieving measurable improvement over the baseline on held-out validation test split.',
      deliverableFa: 'مدل آموزش‌دیده که روی داده‌های آزمون اعتبارسنجی بهبود معناداری نسبت به خط مبنا ثبت کرده باشد.',
      gateCriteriaEn: 'Model satisfies initial algorithmic performance criteria without evidence of severe overfitting.',
      gateCriteriaFa: 'مدل معیارهای عملکردی اولیه را برآورده کرده و علائم بیش‌برازش شدید مشاهده نشود.',
      criticalDependencyEn: 'GPU cluster availability and stable experiment tracking infrastructure.',
      criticalDependencyFa: 'در دسترس بودن سرورهای GPU و پایداری سامانه رهگیری آزمایش‌ها.'
    },
    {
      phase: 'Phase V',
      titleEn: 'Gate 5: Operational Evaluation & Robustness Clearance',
      titleFa: 'گیت ۵: ارزیابی عملیاتی، ایمنی و انطباق با کسب‌وکار',
      targetWeekEn: 'Week 5 - 6',
      targetWeekFa: 'هفته ۵ تا ۶',
      deliverableEn: 'Model evaluation report, fairness & bias analysis, stress-testing on edge cases, and inference latency validation.',
      deliverableFa: 'گزارش تفصیلی ارزیابی مدل، تحلیل تعصبات و انصاف، تست‌های فشار در شرایط بحرانی و سنجش تاخیر پاسخ.',
      gateCriteriaEn: 'Business stakeholders and governance committee formally sign off on the accuracy-risk trade-off.',
      gateCriteriaFa: 'مالک کسب‌وکار و کمیته حاکمیت به‌صورت رسمی موازنه دقت و ریسک مدل را تایید نمایند.',
      criticalDependencyEn: 'Subject matter expert availability for blind qualitative spot-checking.',
      criticalDependencyFa: 'حضور متخصصان حوزه برای ارزیابی کیفی کورکورانه خروجی‌های مدل.'
    },
    {
      phase: 'Phase VI',
      titleEn: 'Gate 6: Pilot Shadow Deployment & Operational Hand-off',
      titleFa: 'گیت ۶: استقرار آزمایشی سایه و تحویل به عملیات',
      targetWeekEn: 'Week 6+',
      targetWeekFa: 'هفته ۶ به بعد',
      deliverableEn: 'Containerized inference service running in shadow mode, real-time drift telemetry, and operational rollback runbook.',
      deliverableFa: 'سرویس استنتاج کانتینری در حالت سایه (Shadow Mode)، داشبورد پایش انحراف داده و دستورالعمل بازگشت به عقب.',
      gateCriteriaEn: 'Production integration functions with 0 disruptions to core operations and meets latency SLAs.',
      gateCriteriaFa: 'سرویس بدون ایجاد اختلال در عملیات جاری کسب‌وکار مستقر شده و الزامات تاخیر را برآورده می‌کند.',
      criticalDependencyEn: 'Production DevOps integration window and network firewall access.',
      criticalDependencyFa: 'پنجره زمانی مجاز تیم دوآپس برای اتصال شبکه و تنظیمات فایروال تولید.'
    }
  ];

  // 3. Real-World Industry Templates
  const TEMPLATES: CaseStudyTemplate[] = [
    {
      id: 'finance-fraud',
      nameEn: 'Financial Transaction Fraud Detection',
      nameFa: 'کشف تقلب و تخلفات تراکنش‌های مالی',
      domainEn: 'FinTech / Banking',
      domainFa: 'بانکداری و فین‌تک',
      badgeColor: '#00738c',
      sprintCadenceEn: '2-week sprint cycles',
      sprintCadenceFa: 'اسپرینت‌های ۲ هفته‌ای چابک',
      totalTimeboxEn: '6-week Phase I-VI initial iteration',
      totalTimeboxFa: 'بازه زمانی ۶ هفته‌ای برای چرخه اول فازهای ۱ تا ۶',
      resourceSummaryEn: '1 Lead Fraud SME (40%), 1 Data Scientist (100%), 1 ML Engineer (100%), 1 Data Engineer (100%), 1 Compliance Officer. 8x A100 GPU cluster for graph embeddings; sub-40ms CPU inference endpoint in secure VPC. Budget: $28k cloud + $15k vendor data.',
      resourceSummaryFa: '۱ متخصص ارشد تقلب (۴۰٪)، ۱ دانشمند داده (۱۰۰٪)، ۱ مهندس یادگیری ماشین (۱۰۰٪)، ۱ مهندس داده (۱۰۰٪) و ۱ مشاور حقوقی. خوشه ۸ پردازنده A100 برای امبدینگ گراف؛ استنتاج زیر ۴۰ میلی‌ثانیه در شبکه ایزوله. بودجه: ۲۸ هزار دلار ابری + ۱۵ هزار دلار داده خارجی.',
      scheduleSummaryEn: 'Hard deadline: Regulatory AML audit in 8 weeks. Week 1: Fraud pattern definition. Week 2-3: Core banking transaction extraction & PII tokenization. Week 4: Graph neural network POC. Week 5: Backtesting on historical fraud rings. Week 6: Shadow production deployment.',
      scheduleSummaryFa: 'ضرب‌الاجل قطعی: ممیزی نظارتی پولشویی ظرف ۸ هفته. هفته ۱: تدوین الگوهای تقلب. هفته ۲-۳: استخراج تراکنش‌ها و توکن‌سازی داده‌های هویتی. هفته ۴: مدل اولیه یادگیری گراف. هفته ۵: آزمون گذشته‌نگر روی پرونده‌های تقلب. هفته ۶: استقرار در حالت سایه.',
      fullWorkbookEn: `=== TASK GROUP: ASSESS SITUATION (CPMAI SLIDE 24) ===
Project: Financial Transaction Fraud & Anti-Money Laundering Detection
Iteration Timebox: 6 Weeks (Three 2-Week Agile Sprints)

1. TASK: RESOURCE REQUIREMENTS
-------------------------------------------------------------
A. Personnel & Talent Allocation:
• Business SME / Fraud Investigator Lead: 40% FTE (validates false positives and edge-case fraud ring typologies).
• Lead Data Scientist: 100% FTE (graph feature engineering, model architecture, calibration).
• ML Engineer / MLOps: 100% FTE (low-latency Triton server setup, Docker containers, automated drift monitoring).
• Data Engineer: 100% FTE in Sprints 1-2 (Kafka stream ingestion, OLTP replication, strict PII tokenization).
• Legal & Regulatory Compliance Counsel: 20% FTE (PCI-DSS & GDPR validation, audit trail review).

B. Hardware & Compute Infrastructure:
• Training: 8x NVIDIA A100 (80GB) cloud cluster with 2TB high-throughput NVMe scratch storage.
• Inference: Dual redundant c6i.4xlarge compute instances serving models with sub-35ms p99 latency.
• Security Isolation: Dedicated VPC with Zero-Trust ingress, private endpoints, and KMS encryption at rest.

C. Software, Tooling & Data Stack:
• Core Frameworks: PyTorch Geometric, XGBoost, Scikit-learn, ONNX Runtime.
• Data & Feature Store: Snowflake (analytical warehouse) + Redis (in-memory feature store for online inference).
• MLOps & Tracking: MLflow for artifact registry, Prometheus & Grafana for live latency/drift telemetry.

D. Budget & Commercial Allocations:
• Compute Budget: $22,000 cloud infrastructure spend for training sweeps and shadow instances.
• Auxiliary Data: $12,000 for verified global fraud blacklist subscription.
• Contingency Reserve: $6,000 (20% reserve for burst training experiments).

2. TASK: SCHEDULE REQUIREMENTS
-------------------------------------------------------------
A. Iteration Cadence & Timeboxing:
• Agile Sprint Length: 2-week sprints with bi-weekly demos to the Head of Risk.
• Total Iteration Timebox: 6 weeks (Sprint 1: Phases I & II; Sprint 2: Phases III & IV; Sprint 3: Phases V & VI).

B. Key Milestones & Stage Gates:
• Gate 1 (End of W1): Fraud objective signed off (Primary Goal: reduce false positive review queue by 45%).
• Gate 2 (End of W2): Core banking transaction database extraction & anonymization verified.
• Gate 3 (End of W3): Cleaned feature tables & rule-based benchmark established (current rule-engine catch rate: 62%).
• Gate 4 (End of W4): Candidate model exceeds benchmark (POC achieves 84% recall at 3% false alarm rate).
• Gate 5 (End of W5): Stress-testing on holiday surge scenarios and fairness audit completed without demographic skew.
• Gate 6 (End of W6): Shadow pipeline operational alongside legacy rule engine, processing live Kafka stream.

C. Hard Deadlines & Business Events:
• Regulatory Audit: Mandatory compliance reporting with Central Bank scheduled in Week 8.
• Holiday Shopping Surge: Model must achieve shadow validation before Q4 retail peak.

D. Critical Path Dependencies & Lead Times:
• Data Access Approval: InfoSec approval for core banking schema access requires 10 business days (initiated Day 1).
• Regulatory PII Sign-Off: Legal clearance for customer identity hash mapping.`,
      fullWorkbookFa: `=== گروه وظایف: ارزیابی وضعیت (اسلاید ۲۴ کتاب کار CPMAI) ===
پروژه: کشف هوشمند تقلب و پولشویی در تراکنش‌های بانکی
جعبه زمانی چرخه: ۶ هفته (سه اسپرینت چابک ۲ هفته‌ای)

۱. وظیفه: نیازمندی‌های منابع (Resource Requirements)
-------------------------------------------------------------
الف. نیروی انسانی و تخصیص مهارت‌ها:
• متخصص ارشد حوزه کشف تقلب (SME): ۴۰٪ ظرفیت (بررسی هشدارهای کاذب و اعتبارسنجی الگوهای جدید کلاهبرداری).
• دانشمند ارشد داده: ۱۰۰٪ ظرفیت (استخراج ویژگی‌های گراف، معماری مدل، کالیبراسیون احتمالات).
• مهندس یادگیری ماشین (MLOps): ۱۰۰٪ ظرفیت (کانتینرسازی Triton، بهینه‌سازی تاخیر استنتاج، پایش بلادرنگ انحراف).
• مهندس داده: ۱۰۰٪ در اسپرینت‌های ۱ و ۲ (یکپارچه‌سازی با کافکا، پالایش جداول تراکنش، توکن‌سازی داده‌های هویتی).
• مشاور ارشد حقوقی و انطباق: ۲۰٪ ظرفیت (ممیزی استانداردهای PCI-DSS و رگولاتوری بانکی).

ب. زیرساخت محاسباتی و سخت‌افزاری:
• محیط آموزش: ۸ کارت گرافیک NVIDIA A100 ابری به همراه ۲ ترابایت دیسک فوق‌سریع NVMe.
• محیط استنتاج برخط: سرورهای محاسباتی با تاخیر پاسخ کمتر از ۳۵ میلی‌ثانیه برای صدک ۹۹ تراکنش‌ها.
• امنیت زیرساخت: شبکه ابری اختصاصی ایزوله (VPC) با رمزنگاری سرتاسری و احراز هویت بدون اعتماد (Zero-Trust).

ج. پلتفرم‌های نرم‌افزاری و ابزارهای داده:
• فریم‌ورک‌ها: PyTorch Geometric، XGBoost، سایکیت‌لرن و موتور استنتاج ONNX.
• ذخیره‌سازی و مخزن ویژگی: پایگاه اسنوفلیک (انبار داده تحلیلی) + ردیس (مخزن ویژگی برخط جهت پاسخ سریع).
• مدیریت چرخه ML: سامانه MLflow جهت ثبت نسخه‌های مدل و گرافانا جهت پایش زنده بار و تغییر توزیع داده.

د. بودجه مالی و مجوزها:
• بودجه پردازش ابری: ۲۲،۰۰۰ دلار برای آموزش مدل‌ها و میزبانی آزمایشی سرورها.
• خرید داده‌های اعتباری و لیست سیاه: ۱۲،۰۰۰ دلار جهت اشتراک بانک اطلاعاتی تقلب جهانی.
• ذخیره احتیاطی: ۶،۰۰۰ دلار (۲۰٪ بافر برای آزمایش‌های اکتشافی تکمیلی).

۲. وظیفه: نیازمندی‌های زمان‌بندی (Schedule Requirements)
-------------------------------------------------------------
الف. ریتم اسپرینت‌ها و جعبه زمانی:
• طول اسپرینت: اسپرینت‌های ۲ هفته‌ای به همراه جلسه دمو و بررسی نتایج با مدیر ریسک در پایان هر دوره.
• کل زمان چرخه اول: ۶ هفته (اسپرینت ۱: فازهای ۱ و ۲؛ اسپرینت ۲: فازهای ۳ و ۴؛ اسپرینت ۳: فازهای ۵ و ۶).

ب. نقاط عطف کلیدی و گیت‌های تصمیم‌گیری (Stage Gates):
• گیت ۱ (پایان هفته اول): تایید بیانیه اهداف تجاری (هدف اصلی: کاهش ۴۵ درصدی هشدارهای نادرست).
• گیت ۲ (پایان هفته دوم): تکمیل استخراج ایمن داده‌های تاریخی تراکنش‌ها و رفع نواقص کیفی.
• گیت ۳ (پایان هفته سوم): استقرار خط مبنای ساده مبتنی بر قوانین قدیمی (حد نصاب موفقیت: پوشش ۶۲ درصدی تقلب).
• گیت ۴ (پایان هفته چهارم): اثبات برتری مدل بر خط مبنا (دستیابی به بازخوانی ۸۴٪ با خطای کاذب زیر ۳٪).
• گیت ۵ (پایان هفته پنجم): ممیزی انصاف و تست مدل در سناریوهای ترافیک سنگین پایان ماه بدون افت دقت.
• گیت ۶ (پایان هفته ششم): استقرار آزمایشی در حالت سایه موازی با سامانه قدیمی و دریافت تاییدیه حاکمیت داده.

ج. ضرب‌الاجل‌های قطعی و الزامات محیطی:
• بازرسی بانک مرکزی: تحویل مستندات انطباق نظارتی تا پایان هفته هشتم الزامی است.
• پیک خرید سالانه: مدل باید پیش از آغاز ترافیک سنگین خریدهای پایان سال اعتبارسنجی عملیاتی شود.

د. وابستگی‌های مسیر بحرانی و زمان انتظار:
• مجوز امنیت اطلاعات (InfoSec): دسترسی به داده‌های بانکی نیازمند ۱۰ روز کاری است (درخواست از روز اول ثبت شد).
• تاییدیه حقوقی عدم افشای هویت مشتریان: تایید روش هش‌سازی داده‌های شناسایی کاربران.`
    },
    {
      id: 'health-radiology',
      nameEn: 'Clinical Radiology Screening Assistant',
      nameFa: 'دستیار غربالگری بالینی تصاویر رادیولوژی',
      domainEn: 'Healthcare / Medical Imaging',
      domainFa: 'سلامت و تصویربرداری پزشکی',
      badgeColor: '#1b3a4b',
      sprintCadenceEn: '3-week sprint cycles',
      sprintCadenceFa: 'اسپرینت‌های ۳ هفته‌ای بالینی',
      totalTimeboxEn: '9-week Phase I-VI iteration timebox',
      totalTimeboxFa: 'بازه زمانی ۹ هفته‌ای چرخه اعتبارسنجی',
      resourceSummaryEn: '2 Board-Certified Radiologists (25%), 1 Medical AI Scientist (100%), 1 Clinical Systems Engineer, 1 Bioethics & HIPAA Lead. 4x H100 GPUs for 3D DICOM CT scans. Budget: $45k compute + $25k expert labeling honorariums.',
      resourceSummaryFa: '۲ پزشک رادیولوژیست معتمد (۲۵٪)، ۱ دانشمند هوش مصنوعی پزشکی (۱۰۰٪)، ۱ مهندس سامانه بیمارستانی، ۱ مدیر اخلاق زیستی و حریم خصوصی. ۴ کارت H100 برای تصاویر سی‌تی‌اسکن ۳ بعدی DICOM. بودجه: ۴۵ هزار دلار پردازش + ۲۵ هزار دلار حق‌الزحمه برچسب‌گذاری بالینی.',
      scheduleSummaryEn: 'Hard deadline: Hospital IRB Institutional Review Board review at Week 8. Week 1: Protocol design. Week 2-4: PACS archive DICOM extraction & multi-reader label consensus. Week 5-6: 3D CNN / Vision Transformer POC. Week 7: Sensitivity stress-testing. Week 8-9: Silent clinical integration.',
      scheduleSummaryFa: 'ضرب‌الاجل قطعی: جلسه کمیته اخلاق بیمارستان (IRB) در هفته هشتم. هفته ۱: تدوین پروتکل بالینی. هفته ۲-۴: استخراج تصاویر DICOM از سرور PACS و ایجاد اجماع برچسب‌گذاری. هفته ۵-۶: مدل‌سازی با ترنسفورمرهای بینایی. هفته ۷: ارزیابی حساسیت بالینی. هفته ۸-۹: استقرار خاموش در بیمارستان.',
      fullWorkbookEn: `=== TASK GROUP: ASSESS SITUATION (CPMAI SLIDE 24) ===
Project: AI-Assisted Chest CT Nodule Detection & Triage
Iteration Timebox: 9 Weeks (Three 3-Week Clinical Sprints)

1. TASK: RESOURCE REQUIREMENTS
• Personnel: 2 Radiologists (25% FTE each for ground-truth adjudication), 1 Medical CV Scientist (100%), 1 HL7/FHIR Integration Engineer (100%), 1 Healthcare Compliance Officer (15%).
• Hardware: 4x NVIDIA H100 80GB GPU cluster for volumetric 3D lung scans. High-durability HIPAA-compliant encrypted storage.
• Software Stack: MONAI framework, PyTorch, Orthanc PACS server, ClearML experiment tracking.
• Budget: $45,000 for cloud training & secure enclave; $25,000 for radiologist panel adjudication compensation.

2. TASK: SCHEDULE REQUIREMENTS
• Iteration Cadence: 3-week clinical sprints with bi-weekly radiology department reviews.
• Stage-Gates:
  - Gate 1 (W1): Clinical triage objective approved (reduce nodule review turnaround time from 48h to 4h).
  - Gate 2 (W3): 12,000 anonymized DICOM scans indexed; zero patient identifiers detected.
  - Gate 3 (W5): Heuristic radiologist agreement baseline mapped (inter-rater kappa score: 0.74).
  - Gate 4 (W6): Deep learning model exceeds 96% sensitivity for nodules > 6mm on internal test set.
  - Gate 5 (W8): Independent external validation across 3 hospital scanner vendor models (GE, Siemens, Philips).
  - Gate 6 (W9): Silent shadow integration with hospital PACS; model outputs stored in research database only.
• Hard Deadlines: Institutional Review Board (IRB) quarterly hearing in Week 8.
• Critical Path Dependencies: 3-week lead time for hospital ethics board data transfer agreement.`,
      fullWorkbookFa: `=== گروه وظایف: ارزیابی وضعیت (اسلاید ۲۴ کتاب کار CPMAI) ===
پروژه: دستیار هوشمند غربالگری و اولویت‌بندی ندول‌های ریه در سی‌تی‌اسکن
جعبه زمانی چرخه: ۹ هفته (سه اسپرینت ۳ هفته‌ای بالینی)

۱. وظیفه: نیازمندی‌های منابع (Resource Requirements)
• نیروی انسانی: ۲ پزشک رادیولوژیست (هر کدام ۲۵٪ برای داوری موارد اختلافی)، ۱ متخصص بینایی ماشین پزشکی (۱۰۰٪)، ۱ مهندس یکپارچه‌سازی سامانه‌های بالینی HL7/FHIR (۱۰۰٪) و ۱ مشاور انطباق سلامت (۱۵٪).
• سخت‌افزار: خوشه ۴ کارت گرافیک NVIDIA H100 با حافظه ۸۰ گیگابایت جهت پردازش حجم‌های سه‌بعدی سی‌تی‌اسکن، ذخیره‌سازی ابری امن با انطباق HIPAA.
• پلتفرم‌های نرم‌افزاری: فریم‌ورک MONAI، پایتورچ، سرور آزمایشگاهی PACS و سامانه مدیریت داده ClearML.
• بودجه: ۴۵،۰۰۰ دلار پردازش ابری امن + ۲۵،۰۰۰ دلار حق‌الزحمه تیم پزشکان برای برچسب‌گذاری طلایی.

۲. وظیفه: نیازمندی‌های زمان‌بندی (Schedule Requirements)
• ریتم اسپرینت‌ها: اسپرینت‌های ۳ هفته‌ای همراه با جلسه بازخوانی بالینی در بیمارستان.
• گیت‌های مرحله‌ای CPMAI:
  - گیت ۱ (هفته ۱): تصویب هدف بالینی (کاهش زمان انتظار پاسخ بیماران بدحال از ۴۸ ساعت به زیر ۴ ساعت).
  - گیت ۲ (هفته ۳): استخراج ۱۲،۰۰۰ تصویر DICOM بدون اطلاعات هویتی و تایید کیفیت رزولوشن.
  - گیت ۳ (هفته ۵): ثبت خط مبنای توافق میان پزشکان انسانی (ضریب کاپا ۰.۷۴).
  - گیت ۴ (هفته ۶): دستیابی به حساسیت بالای ۹۶٪ در تشخیص ضایعات بزرگتر از ۶ میلی‌متر.
  - گیت ۵ (هفته ۸): اعتبارسنجی روی داده‌های اسکنرهای مختلف (زیمنس، فیلیپس، جی‌ای) بدون افت دقت.
  - گیت ۶ (هفته ۹): اتصال در حالت سایه خاموش به سامانه تصویربرداری بیمارستان جهت پایش پایداری.
• ضرب‌الاجل قطعی: ممیزی فصلی کمیته اخلاق پژوهش پزشکی در هفته هشتم.
• وابستگی مسیر بحرانی: زمان انتظار ۳ هفته‌ای برای دریافت مجوز انتقال داده‌های بیمارستانی.`
    },
    {
      id: 'ecommerce-rec',
      nameEn: 'E-Commerce Real-Time Recommendations',
      nameFa: 'موتور پیشنهاد هوشمند و بلادرنگ فروشگاه اینترنتی',
      domainEn: 'Retail & E-Commerce',
      domainFa: 'خرده‌فروشی آنلاین و تجارت الکترونیک',
      badgeColor: '#2f7d5b',
      sprintCadenceEn: '2-week sprint cycles',
      sprintCadenceFa: 'اسپرینت‌های ۲ هفته‌ای چابک',
      totalTimeboxEn: '6-week Phase I-VI iteration timebox',
      totalTimeboxFa: 'بازه زمانی ۶ هفته‌ای چرخه چابک',
      resourceSummaryEn: '1 E-Commerce Merchandiser (30%), 1 Recommender Systems ML Engineer (100%), 1 Backend Engineer (100%), 1 Data Platform Engineer (80%). 2x A100 for batch two-tower embeddings; high-IOPS Redis cluster for 15ms live ranking. Budget: $18,000.',
      resourceSummaryFa: '۱ مدیر بازرگانی و فروش آنلاین (۳۰٪)، ۱ مهندس سیستم‌های توصیه‌گر (۱۰۰٪)، ۱ مهندس بک‌اند (۱۰۰٪)، ۱ مهندس پلتفرم داده (۸۰٪). ۲ کارت A100 برای امبدینگ‌های دوبخشی؛ کلاستر ردیس پرسرعت برای رتبه‌بندی در ۱۵ میلی‌ثانیه. بودجه: ۱۸،۰۰۰ دلار.',
      scheduleSummaryEn: 'Hard deadline: Black Friday launch window in 7 weeks. Week 1: Conversion KPI alignment. Week 2: User clickstream session extraction. Week 3: Popularity & collaborative filtering baseline. Week 4: Two-tower neural model POC. Week 5: A/B testing framework setup. Week 6: 5% live traffic canary rollout.',
      scheduleSummaryFa: 'ضرب‌الاجل قطعی: آغاز حراج بزرگ جمعه سیاه ظرف ۷ هفته آینده. هفته ۱: همسوسازی اهداف نرخ تبدیل. هفته ۲: استخراج جریان کلیک‌ها و سبدهای خرید. هفته ۳: برپایی خط مبنای کالاهای محبوب. هفته ۴: مدل یادگیری عمیق دوبخشی. هفته ۵: اتصال سامانه تست A/B. هفته ۶: انتشار قناری برای ۵٪ کاربران.',
      fullWorkbookEn: `=== TASK GROUP: ASSESS SITUATION (CPMAI SLIDE 24) ===
Project: Real-Time Session-Based E-Commerce Recommender Engine
Iteration Timebox: 6 Weeks (Three 2-Week Agile Sprints)

1. TASK: RESOURCE REQUIREMENTS
• Personnel: E-Commerce Category Manager (30% FTE), Recommender Data Scientist (100%), Backend/API Engineer (100%), Data Platform Engineer (80%).
• Hardware: 2x NVIDIA A100 for offline two-tower user/item representation learning; multi-node Redis cluster with 15ms p95 latency budget.
• Software Stack: PyTorch, Hugging Face Transformers, Kafka event bus, Feast feature store, LaunchDarkly for A/B flags.
• Budget: $14,000 cloud infrastructure + $4,000 experimentation contingency.

2. TASK: SCHEDULE REQUIREMENTS
• Iteration Cadence: 2-week agile sprint cycles with continuous integration.
• Stage-Gates:
  - Gate 1 (W1): Conversion increase KPI approved (+8% lift in average basket size on product detail pages).
  - Gate 2 (W2): 90 days of clickstream and completed order logs validated for zero data leakage.
  - Gate 3 (W3): Baseline heuristic (most popular items within same category) benchmarked.
  - Gate 4 (W4): Neural two-tower POC demonstrates 22% higher NDCG@10 compared to heuristic baseline.
  - Gate 5 (W5): Offline replay testing shows zero latency degradation under peak concurrent load.
  - Gate 6 (W6): Canary deployment routing 5% of web/mobile traffic to new recommendation pipeline.
• Hard Deadlines: Annual Black Friday Shopping Season in 7 weeks (hard freeze 10 days prior).
• Critical Path Dependencies: CDN edge-caching configuration & API gateway routing update.`,
      fullWorkbookFa: `=== گروه وظایف: ارزیابی وضعیت (اسلاید ۲۴ کتاب کار CPMAI) ===
پروژه: سیستم هوشمند پیشنهاد محصولات در لحظه بر اساس رفتار نشست کاربر
جعبه زمانی چرخه: ۶ هفته (سه اسپرینت ۲ هفته‌ای چابک)

۱. وظیفه: نیازمندی‌های منابع (Resource Requirements)
• نیروی انسانی: مدیر بازرگانی آنلاین (۳۰٪)، متخصص سیستم‌های توصیه‌گر (۱۰۰٪)، مهندس توسعه نرم‌افزار (۱۰۰٪)، مهندس پلتفرم داده (۸۰٪).
• سخت‌افزار: ۲ کارت گرافیک NVIDIA A100 برای آموزش مدل‌های بازنمایی کاربر-کالا، کلاستر ردیس پرسرعت با تاخیر زیر ۱۵ میلی‌ثانیه.
• نرم‌افزار و ابزارها: پایتورچ، صف رویدادهای کافکا، مخزن ویژگی Feast و پلتفرم تست چندمتغیره A/B.
• بودجه: ۱۴،۰۰۰ دلار سرورهای ابری + ۴،۰۰۰ دلار بافر احتیاطی برای آزمایش‌های بهینه‌سازی.

۲. وظیفه: نیازمندی‌های زمان‌بندی (Schedule Requirements)
• ریتم اسپرینت‌ها: اسپرینت‌های چابک ۲ هفته‌ای با تحویل مستمر.
• گیت‌های مرحله‌ای CPMAI:
  - گیت ۱ (هفته ۱): تصویب شاخص تجاری (افزایش ۸ درصدی ارزش سبد خرید در صفحات نمایش محصول).
  - گیت ۲ (هفته ۲): پالایش داده‌های ۹۰ روز سوابق کلیک و سفارشات بدون نشت اطلاعات آینده.
  - گیت ۳ (هفته ۳): تعیین خط مبنای ساده بر اساس محبوب‌ترین کالاهای همان دسته‌بندی.
  - گیت ۴ (هفته ۴): اثبات برتری مدل دو‌بخشی (بهبود ۲۲ درصدی شاخص رتبه‌بندی NDCG نسبت به خط مبنا).
  - گیت ۵ (هفته ۵): تایید عدم افزایش تاخیر بارگذاری صفحات در شبیه‌سازی ترافیک سنگین.
  - گیت ۶ (هفته ۶): استقرار قناری و هدایت ۵٪ ترافیک زنده کاربران به سیستم جدید.
• ضرب‌الاجل قطعی: جشنواره فروش جمعه سیاه ظرف ۷ هفته آینده (فریز کد ۱۰ روز قبل از آغاز).
• وابستگی مسیر بحرانی: اعمال تنظیمات مسیریابی در درگاه API و سرورهای شبکه توزیع محتوا (CDN).`
    }
  ];

  // Helper functions
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleApplyTemplate = (template: CaseStudyTemplate) => {
    const textToInsert = lang === 'fa' ? template.fullWorkbookFa : template.fullWorkbookEn;
    onChangeContent(textToInsert);
    setActiveTab('canvas');
  };

  const handleResetToSkeleton = () => {
    const skeletonEn = `=== CPMAI WORKBOOK: SLIDE 24 ===
Phase I: Business Understanding
Task Group: Assess Situation
Tasks: Resource Requirements & Schedule Requirements

1. TASK: RESOURCE REQUIREMENTS
-------------------------------------------------------------
A. Personnel & Talent Allocation:
• Business SME / Domain Expert: [Specify name/role and % FTE allocation]
• Data Science / ML Talent: [Specify required modeling skills, lead researcher]
• Machine Learning Engineering (MLOps): [Deployment, inference latency, pipelines]
• Data Engineering: [Data extraction, cleaning, storage, and pipeline infrastructure]
• Governance, Privacy & Legal: [PII compliance, security clearance, regulatory review]

B. Hardware & Compute Infrastructure:
• Training Infrastructure: [GPUs/TPUs needed, cluster capacity, storage IOPS]
• Production Inference Infrastructure: [CPU/GPU instances, latency SLAs, memory]
• Network & Security Isolation: [VPC setup, access control, encrypted storage]

C. Software, Tooling & Data Stack:
• Modeling Frameworks: [PyTorch, Scikit-learn, Hugging Face, etc.]
• Data Platform / Lakehouse: [Snowflake, BigQuery, Databricks, PostgreSQL]
• MLOps & Experiment Tracking: [MLflow, Weights & Biases, DVC, etc.]
• Annotation / Labeling Tooling: [Label Studio, internal tools, external vendor]

D. Budget & Financial Allocations:
• Cloud Compute Spend: [Estimated compute run-rate for iteration]
• API / Data Acquisition Costs: [Third-party subscriptions, token fees]
• Experimentation Contingency Buffer: [Recommended 20-30% buffer]

2. TASK: SCHEDULE REQUIREMENTS
-------------------------------------------------------------
A. Agile Cadence & Timeboxing:
• Sprint Length: [e.g. 2-week sprints]
• Total Phase I-VI Iteration Timebox: [e.g. 6 weeks / 8 weeks]

B. CPMAI Stage-Gate Milestones:
• Gate 1 (Business Objective Sign-off): [Week 1 target, criteria]
• Gate 2 (Data Feasibility & Veracity): [Week 2-3 target, criteria]
• Gate 3 (Pristine Pipeline & Baseline Heuristic): [Week 3-4 target, criteria]
• Gate 4 (Model POC vs. Baseline): [Week 4-5 target, criteria]
• Gate 5 (Operational Evaluation & Bias Audit): [Week 5-6 target, criteria]
• Gate 6 (Production Shadow/Pilot Deployment): [Week 6+ target, criteria]

C. Hard Deadlines & Business Events:
• Fixed Deadlines: [Regulatory dates, product launches, fiscal year markers]

D. Critical Path Dependencies & Lead Times:
• Long Lead-Time Blockers: [Data access approvals, legal clearances, API credentials]
• Risk Mitigation Plan: [Contingency actions if blocker delays project]`;

    const skeletonFa = `=== کتاب کار متدولوژی CPMAI: اسلاید ۲۴ ===
فاز اول: درک کسب‌وکار (Phase I: Business Understanding)
گروه وظایف: ارزیابی وضعیت (Task Group: Assess Situation)
وظایف: نیازمندی‌های منابع (Resource Requirements) و زمان‌بندی (Schedule Requirements)

۱. وظیفه: نیازمندی‌های منابع (Task: Resource Requirements)
-------------------------------------------------------------
الف. نیروی انسانی و تخصیص مهارت‌ها:
• متخصص موضوعی کسب‌وکار (SME): [نام/عنوان نقش و درصد زمان اختصاص‌یافته]
• متخصصان علم داده و یادگیری ماشین: [مهارت‌های لازم برای ساخت و تحلیل مدل]
• مهندس یادگیری ماشین (MLOps): [بسته‌بندی، پایپ‌لاین‌ها و استقرار عملیاتی]
• مهندس داده: [استخراج داده، ذخیره‌سازی، بهینه‌سازی و تضمین کیفیت پایپ‌لاین]
• مشاور حقوقی، حاکمیت و امنیت: [بررسی حریم خصوصی، مجوزها و انطباق نظارتی]

ب. زیرساخت محاسباتی و سخت‌افزاری:
• محیط آموزش مدل: [تعداد و نوع پردازنده‌های گرافیکی GPU، ظرفیت حافظه و دیسک]
• محیط استنتاج و سرویس‌دهی: [سرورهای میزبانی، سقف تاخیر پاسخگویی و پایداری]
• امنیت و ایزولاسیون شبکه: [شبکه ابری اختصاصی VPC، مدیریت دسترسی و رمزنگاری]

ج. پلتفرم‌های نرم‌افزاری و ابزارهای داده:
• فریم‌ورک‌های مدل‌سازی: [پایتورچ، سایکیت‌لرن، هاب هاگینگ‌فیس و غیره]
• انبار داده / دریاچه‌داده: [اسنوفلیک، بیگ‌کوئری، دیتا‌بریکس یا پایگاه‌های داخلی]
• مدیریت چرخه ML و ثبت آزمایش‌ها: [MLflow، W&B، DVC و غیره]
• ابزارهای برچسب‌گذاری و آماده‌سازی داده: [لیبل استودیو یا فرآیندهای داخلی]

د. بودجه مالی و مجوزها:
• هزینه پردازش ابری: [برآورد مصرف سرورهای آموزشی و میزبانی در طول چرخه]
• هزینه داده و APIهای تجاری: [خرید اشتراک‌ها یا هزینه‌های مصرف توکن مدل‌ها]
• بافر مالی احتیاطی: [۲۰ الی ۳۰ درصد بودجه ذخیره برای سناریوهای پیش‌بینی‌نشده]

۲. وظیفه: نیازمندی‌های زمان‌بندی (Task: Schedule Requirements)
-------------------------------------------------------------
الف. ریتم چابک و جعبه زمانی چرخه:
• طول هر اسپرینت: [مثلاً اسپرینت‌های ۲ هفته‌ای]
• کل جعبه زمانی برای فازهای ۱ تا ۶: [مثلاً ۶ هفته یا ۸ هفته]

ب. نقاط عطف و گیت‌های مرحله‌ای CPMAI:
• گیت ۱ (تایید اهداف کسب‌وکار): [هدف زمانی هفته اول و معیار پذیرش]
• گیت ۲ (تایید در دسترس بودن و سلامت داده): [هدف زمانی هفته ۲-۳ و معیار پذیرش]
• گیت ۳ (تولید پایپ‌لاین داده و خط مبنای ساده): [هدف زمانی هفته ۳-۴ و معیار پذیرش]
• گیت ۴ (اثبات برتری مدل بر خط مبنا POC): [هدف زمانی هفته ۴-۵ و معیار پذیرش]
• گیت ۵ (ارزیابی عملیاتی، ایمنی و تعصبات): [هدف زمانی هفته ۵-۶ و معیار پذیرش]
• گیت ۶ (استقرار آزمایشی در حالت سایه): [هدف زمانی هفته ۶ به بعد و معیار پذیرش]

ج. ضرب‌الاجل‌های قطعی و رویدادهای سازمانی:
• مهلت‌های غیرقابل تغییر: [الزامات قانونی رگولاتوری، لانچ محصول یا جلسات هیئت‌مدیره]

د. وابستگی‌های مسیر بحرانی و زمان‌های انتظار:
• گلوگاه‌های با زمان انتظار طولانی: [مجوزهای امنیت اطلاعات، تایید قراردادها، تخصیص سرور]
• برنامه مقابله با ریسک: [اقدام جایگزین در صورت تاخیر هر وابستگی]`;

    onChangeContent(lang === 'fa' ? skeletonFa : skeletonEn);
  };

  const filteredRoles = resourceSubCategory === 'all'
    ? RESOURCE_ROLES
    : RESOURCE_ROLES.filter(r => r.category === resourceSubCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Slide 24 CPMAI Banner Header */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228]">
        <div className="bg-gradient-to-r from-[#1b3a4b] via-[#1f5163] to-[#00738c] text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-[#ffffff]/20 text-white backdrop-blur-xs">
                {lang === 'fa' ? 'فاز اول: درک کسب‌وکار' : 'Phase I: Business Understanding'}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#2f7d5b] text-white flex items-center gap-1 shadow-xs">
                <Workflow className="w-3.5 h-3.5" />
                {lang === 'fa' ? 'اسلاید ۲۴ کتاب کار CPMAI' : 'CPMAI Slide 24'}
              </span>
            </div>
            <span className="text-xs font-mono text-[#99e2b4] bg-[#122830]/60 px-3 py-1 rounded-full border border-[#99e2b4]/30">
              CPMAI Methodology Workbook • Task Group: Assess Situation
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 font-serif">
            {lang === 'fa'
              ? 'اسلاید ۲۴: ارزیابی وضعیت — نیازمندی‌های منابع و زمان‌بندی'
              : 'Slide 24: Assess Situation — Resource & Schedule Requirements'}
          </h1>
          <p className="text-sm sm:text-base text-[#d9dad5] max-w-4xl leading-relaxed">
            {lang === 'fa'
              ? 'در متدولوژی بین‌المللی CPMAI، گروه وظایف «ارزیابی وضعیت» تضمین می‌کند که پروژه با شناسایی پیش‌دستانه مهارت‌های تخصصی، توان پردازش GPU، پلتفرم‌های داده، بودجه، ریتم اسپرینت‌ها، گیت‌های مرحله‌ای ۶گانه و وابستگی‌های مسیر بحرانی، به ورطه فرسایش و غافلگیری نیفتد.'
              : 'In the international CPMAI methodology, the "Assess Situation" task group ensures the project iteration is rigorously scoped across personnel skills, compute/GPU infrastructure, tooling/data pipelines, budget, sprint cadence, 6-phase stage gates, and critical-path bottlenecks before engineering begins.'}
          </p>
        </div>

        {/* Methodology Anchor & Key Principles */}
        <div className="p-4 sm:p-6 bg-[#f4f4f1] dark:bg-[#141b20] border-b border-[#d9dad5] dark:border-[#2d3942]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-[#1c2830] border border-[#d9dad5] dark:border-[#2d3942]">
              <Users className="w-5 h-5 text-[#00738c] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-medium mb-1">
                  {lang === 'fa' ? 'مهارت‌ها در برابر تئوری' : 'Talent & Domain SMEs'}
                </strong>
                <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                  {lang === 'fa'
                    ? 'پروژه‌های شناختی بدون همراهی مداوم متخصص حوزه کسب‌وکار (SME) و مهندسان داده شکست می‌خورند؛ نه کمبود الگوریتم.'
                    : 'Cognitive systems fail without continuous domain SME participation and robust data engineering, not algorithms.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-[#1c2830] border border-[#d9dad5] dark:border-[#2d3942]">
              <HardDrive className="w-5 h-5 text-[#1f5163] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-medium mb-1">
                  {lang === 'fa' ? 'سخت‌افزار و زیرساخت محاسبه' : 'Compute & FinOps Reality'}
                </strong>
                <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                  {lang === 'fa'
                    ? 'تعیین سهمیه GPU، حافظه دیسک، بودجه توکن و تاخیر مجاز استنتاج (SLA) باید در همان هفته اول تثبیت شود.'
                    : 'GPU availability, inference latency limits, and cloud run-rates must be budgeted in Week 1, not during deployment.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-[#1c2830] border border-[#d9dad5] dark:border-[#2d3942]">
              <Calendar className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-medium mb-1">
                  {lang === 'fa' ? 'زمان‌بندی چابک با گیت‌های تصمیم' : 'Agile Cadence & Stage-Gates'}
                </strong>
                <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                  {lang === 'fa'
                    ? 'زمان‌بندی CPMAI مبتنی بر اسپرینت‌های محدود به زمان است؛ خروج از هر فاز منوط به پاس شدن گیت مشخص است.'
                    : 'CPMAI timeboxes iterations into fixed agile sprints with explicit go/no-go criteria at every phase gate.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] px-4 pt-2">
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'resources'
                ? 'border-[#00738c] text-[#00738c] dark:text-[#99e2b4] font-semibold'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'fa' ? '۱. نیازمندی‌های منابع (Task: Resources)' : '1. Resource Requirements'}</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-[#00738c] text-[#00738c] dark:text-[#99e2b4] font-semibold'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'fa' ? '۲. نیازمندی‌های زمان‌بندی (Task: Schedule)' : '2. Schedule Requirements'}</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'border-[#00738c] text-[#00738c] dark:text-[#99e2b4] font-semibold'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'fa' ? '۳. الگوهای آماده صنایع' : '3. Industry Templates'}</span>
          </button>

          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'canvas'
                ? 'border-[#00738c] text-[#00738c] dark:text-[#99e2b4] font-semibold'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{lang === 'fa' ? '۴. بوم پاسخ اسلاید ۲۴' : '4. Slide 24 Canvas'}</span>
            {wordCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#2f7d5b] text-white">
                {wordCount} {lang === 'fa' ? 'کلمه' : 'words'}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'border-[#00738c] text-[#00738c] dark:text-[#99e2b4] font-semibold'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{lang === 'fa' ? '۵. ممیزی ریسک و کیفیت CPMAI' : '5. Quality & Risk Audit'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RESOURCE REQUIREMENTS MATRIX */}
      {activeTab === 'resources' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub-filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? 'دسته‌بندی منابع:' : 'Resource Category:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'talent', 'compute', 'software', 'budget'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setResourceSubCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      resourceSubCategory === cat
                        ? 'bg-[#00738c] text-white shadow-xs'
                        : 'bg-[#f4f4f1] dark:bg-[#25323d] text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                    }`}
                  >
                    {cat === 'all' && (lang === 'fa' ? 'همه منابع (۱۰ قلم)' : 'All Resources (10)')}
                    {cat === 'talent' && (lang === 'fa' ? 'نیروی انسانی و مهارت‌ها' : 'Talent & Skills')}
                    {cat === 'compute' && (lang === 'fa' ? 'سخت‌افزار و محاسبات' : 'Compute & Hardware')}
                    {cat === 'software' && (lang === 'fa' ? 'پلتفرم‌ها و ابزارهای داده' : 'Software & Tooling')}
                    {cat === 'budget' && (lang === 'fa' ? 'بودجه و تامین مالی' : 'Budget & FinOps')}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('canvas');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#e3f4f7] dark:bg-[#122830] text-[#00738c] dark:text-[#99e2b4] text-xs font-medium hover:bg-[#d0ecf1] dark:hover:bg-[#1b3a44] transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'انتقال به کاربرگ اصلی' : 'Open in Workbook'}</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoles.map(role => (
              <div
                key={role.id}
                className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                        role.category === 'talent'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : role.category === 'compute'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : role.category === 'software'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {role.category === 'talent' && (lang === 'fa' ? 'نیروی انسانی' : 'Personnel')}
                      {role.category === 'compute' && (lang === 'fa' ? 'محاسبات و سخت‌افزار' : 'Compute')}
                      {role.category === 'software' && (lang === 'fa' ? 'پلتفرم نرم‌افزاری' : 'Software')}
                      {role.category === 'budget' && (lang === 'fa' ? 'تامین مالی و بودجه' : 'Budget')}
                    </span>

                    <span className="text-[11px] font-mono text-[#5d6b73] dark:text-[#9aa8b0] bg-[#f4f4f1] dark:bg-[#25323d] px-2 py-0.5 rounded">
                      {lang === 'fa' ? role.allocationFa : role.allocationEn}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                    {lang === 'fa' ? role.titleFa : role.titleEn}
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-3 leading-relaxed">
                    {lang === 'fa' ? role.descriptionFa : role.descriptionEn}
                  </p>

                  {/* Skills tags */}
                  <div className="mb-3">
                    <span className="text-[11px] font-semibold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                      {lang === 'fa' ? 'مهارت‌ها و مشخصات کلیدی:' : 'Key Competencies / Specs:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(lang === 'fa' ? role.keySkillsFa : role.keySkillsEn).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-[#f4f4f1] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk Warning Box */}
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs">
                  <div className="flex items-start gap-1.5 text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <strong className="font-semibold block mb-0.5">
                        {lang === 'fa' ? 'ریسک عدم تامین یا فقدان این منبع:' : 'Risk if resource is missing:'}
                      </strong>
                      <span className="leading-normal">
                        {lang === 'fa' ? role.riskIfMissingFa : role.riskIfMissingEn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULE REQUIREMENTS & ROADMAP */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Cadence Configuration Box */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00738c]" />
                  <span>{lang === 'fa' ? 'پیکربندی ریتم چابک و جعبه زمانی چرخه' : 'Agile Sprint Cadence & Timebox Sizing'}</span>
                </h3>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                  {lang === 'fa'
                    ? 'تعیین طول اسپرینت‌ها و کل بازه زمانی چرخه برای اجرای فازهای اول تا ششم CPMAI'
                    : 'Configure iteration parameters to align with CPMAI agile sprint boundaries'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-1">
                    {lang === 'fa' ? 'طول هر اسپرینت:' : 'Sprint Duration:'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(w => (
                      <button
                        key={w}
                        onClick={() => setSelectedSprintLength(w)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          selectedSprintLength === w
                            ? 'bg-[#1f5163] text-white'
                            : 'bg-[#f4f4f1] dark:bg-[#25323d] text-[#5d6b73] dark:text-[#9aa8b0]'
                        }`}
                      >
                        {w} {lang === 'fa' ? 'هفته' : 'Wk'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-1">
                    {lang === 'fa' ? 'کل چرخه (جعبه زمانی):' : 'Total Iteration:'}
                  </span>
                  <div className="flex gap-1">
                    {[4, 6, 8, 12].map(w => (
                      <button
                        key={w}
                        onClick={() => setSelectedIterationWeeks(w)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          selectedIterationWeeks === w
                            ? 'bg-[#00738c] text-white'
                            : 'bg-[#f4f4f1] dark:bg-[#25323d] text-[#5d6b73] dark:text-[#9aa8b0]'
                        }`}
                      >
                        {w} {lang === 'fa' ? 'هفته' : 'Wk'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#e3eef1] dark:bg-[#122830] border border-[#00738c]/20 text-xs text-[#1f5163] dark:text-[#99e2b4] flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Info className="w-4 h-4 text-[#00738c]" />
                {lang === 'fa'
                  ? `برنامه منتخب: چرخه ${selectedIterationWeeks} هفته‌ای مشتمل بر ${Math.ceil(selectedIterationWeeks / selectedSprintLength)} اسپرینت ${selectedSprintLength} هفته‌ای چابک.`
                  : `Configured Plan: ${selectedIterationWeeks}-week iteration comprising ${Math.ceil(selectedIterationWeeks / selectedSprintLength)} agile sprints of ${selectedSprintLength} weeks each.`}
              </span>
              <span className="text-[11px] font-mono bg-white dark:bg-[#1c2830] px-2 py-0.5 rounded text-[#1c2830] dark:text-[#e8ebe9]">
                CPMAI Phase I-VI Iteration Model
              </span>
            </div>
          </div>

          {/* CPMAI 6 Stage-Gates Visual Roadmap */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-[#2f7d5b]" />
              <span>
                {lang === 'fa'
                  ? 'نقاط عطف و گیت‌های مرحله‌ای شش‌گانه CPMAI (Stage-Gate Governance)'
                  : 'CPMAI Six Phase Stage-Gate Roadmap & Exit Criteria'}
              </span>
            </h3>

            <div className="space-y-3">
              {MILESTONES.map((gate, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] hover:border-[#00738c] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1f5163] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#00738c]/10 text-[#00738c] dark:text-[#99e2b4]">
                        {gate.phase}
                      </span>
                      <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                        {lang === 'fa' ? gate.titleFa : gate.titleEn}
                      </h4>
                    </div>

                    <span className="text-xs font-mono font-medium text-[#1f5163] dark:text-[#99e2b4] bg-[#f4f4f1] dark:bg-[#25323d] px-2.5 py-1 rounded">
                      {lang === 'fa' ? gate.targetWeekFa : gate.targetWeekEn}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                    <div>
                      <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-medium mb-0.5">
                        {lang === 'fa' ? 'خروجی تحویلی (Deliverable):' : 'Phase Deliverable:'}
                      </strong>
                      <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                        {lang === 'fa' ? gate.deliverableFa : gate.deliverableEn}
                      </span>
                    </div>

                    <div>
                      <strong className="block text-[#2f7d5b] font-medium mb-0.5">
                        {lang === 'fa' ? 'معیار تایید گیت (Gate Criteria):' : 'Acceptance Exit Gate:'}
                      </strong>
                      <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                        {lang === 'fa' ? gate.gateCriteriaFa : gate.gateCriteriaEn}
                      </span>
                    </div>

                    <div>
                      <strong className="block text-[#b3432f] font-medium mb-0.5">
                        {lang === 'fa' ? 'وابستگی بحرانی (Critical Blocker):' : 'Critical Dependency:'}
                      </strong>
                      <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">
                        {lang === 'fa' ? gate.criticalDependencyFa : gate.criticalDependencyEn}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INDUSTRY TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'نمونه‌های آماده زیر، مشخصات واقعی منابع، زمان‌بندی و گیت‌های مرحله‌ای را برای صنایع مختلف به تصویر می‌کشند.'
                : 'These curated industry references demonstrate real-world resource, schedule, and stage-gate planning.'}
            </span>
            <span className="font-semibold text-[#00738c] dark:text-[#99e2b4]">
              {lang === 'fa' ? 'قابلیت اعمال مستقیم روی کاربرگ' : '1-Click Insert into Slide 24'}
            </span>
          </div>

          <div className="space-y-5">
            {TEMPLATES.map(template => (
              <div
                key={template.id}
                className="p-6 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2.5 py-0.5 rounded text-xs font-bold text-white"
                        style={{ backgroundColor: template.badgeColor }}
                      >
                        {lang === 'fa' ? template.domainFa : template.domainEn}
                      </span>
                      <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                        {lang === 'fa' ? template.sprintCadenceFa : template.sprintCadenceEn} • {lang === 'fa' ? template.totalTimeboxFa : template.totalTimeboxEn}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? template.nameFa : template.nameEn}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleApplyTemplate(template)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00738c] hover:bg-[#1f5163] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'درج در بوم اسلاید ۲۴' : 'Insert into Canvas'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#141b20] border border-[#d9dad5] dark:border-[#2d3942]">
                    <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-semibold mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#00738c]" />
                      {lang === 'fa' ? 'خلاصه منابع و زیرساخت (Resources):' : 'Resource Allocation Summary:'}
                    </strong>
                    <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa' ? template.resourceSummaryFa : template.resourceSummaryEn}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#141b20] border border-[#d9dad5] dark:border-[#2d3942]">
                    <strong className="block text-[#1c2830] dark:text-[#e8ebe9] font-semibold mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2f7d5b]" />
                      {lang === 'fa' ? 'خلاصه زمان‌بندی و گیت‌ها (Schedule):' : 'Schedule & Milestone Summary:'}
                    </strong>
                    <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa' ? template.scheduleSummaryFa : template.scheduleSummaryEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE CANVAS (SLIDE 24) */}
      {activeTab === 'canvas' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Canvas Actions Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'کاربرگ رسمی اسلاید ۲۴ (Slide 24 Worksheet)' : 'Official Slide 24 Worksheet Canvas'}
              </span>
              <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                {wordCount} {lang === 'fa' ? 'کلمه' : 'words'} • {charCount} {lang === 'fa' ? 'نویسه' : 'chars'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToSkeleton}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] transition-colors"
                title={lang === 'fa' ? 'بارگذاری اسکلت استاندارد' : 'Load Standard Skeleton'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'الگوی ساختاریافته' : 'Structure Skeleton'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#1f5163] transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی پاسخ' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={content}
              onChange={e => onChangeContent(e.target.value)}
              placeholder={
                lang === 'fa'
                  ? 'مشخصات تفصیلی نیازمندی‌های منابع (نیروی انسانی، پردازش، پلتفرم‌ها، بودجه) و زمان‌بندی (طول اسپرینت، گیت‌های مرحله‌ای ۶گانه، ضرب‌الاجل‌ها و وابستگی‌ها) را برای پروژه خود اینجا وارد نمایید...'
                  : 'Document your project resource requirements (talent, compute, software/data, budget) and schedule requirements (agile cadence, stage-gates, hard deadlines, dependencies)...'
              }
              rows={22}
              className="w-full p-4 rounded-xl font-mono text-xs sm:text-sm leading-relaxed border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#141b20] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:ring-2 focus:ring-[#00738c] shadow-inner"
            />
          </div>

          {/* Quick Helper Tips */}
          <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {lang === 'fa'
                ? 'راهنمایی CPMAI: مشخص کنید چه زمانی و چه کسی به داده‌ها دسترسی خواهد داشت. دریافت مجوز داده بزرگترین مانع تاخیر در اسلاید ۲۴ است.'
                : 'CPMAI Pro-Tip: Explicitly note data access lead time. Security credential clearance is the single most frequent schedule killer.'}
            </span>
            <span className="text-[11px] font-mono text-[#2f7d5b]">
              Auto-saved to LocalStorage
            </span>
          </div>
        </div>
      )}

      {/* TAB 5: CPMAI QUALITY & RISK AUDIT */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2f7d5b]" />
                <span>{lang === 'fa' ? 'ممیزی ۵ مرحله‌ای کیفیت و سنجش امکان‌سنجی اسلاید ۲۴' : 'CPMAI 5-Point Feasibility & Risk Audit'}</span>
              </h3>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                {lang === 'fa'
                  ? 'بر اساس متدولوژی بین‌المللی CPMAI، قبل از آغاز عملیات مهندسی در فاز دوم، موارد زیر باید به دقت بررسی شوند:'
                  : 'Verify these 5 critical criteria before advancing from Phase I to Data Understanding (Phase II):'}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  titleEn: '1. Domain SME & Data Engineering Availability Confirmed',
                  titleFa: '۱. تخصیص قطعی وقت متخصص موضوعی کسب‌وکار (SME) و مهندس داده',
                  descEn: 'Confirm that domain experts are contractually or organizationally committed (at least 20-30% FTE). Never start ML modeling without a dedicated domain validator.',
                  descFa: 'اطمینان از اینکه کارشناسان حوزه به میزان حداقل ۲۰ الی ۳۰ درصد زمان خود را به پروژه اختصاص داده‌اند. بدون حضور متخصص کسب‌وکار، مدل‌سازی را آغاز نکنید.'
                },
                {
                  id: 2,
                  titleEn: '2. Compute & GPU Infrastructure Provisioned Prior to Modeling',
                  titleFa: '۲. تامین زیرساخت سخت‌افزاری و کارت‌های گرافیکی قبل از آغاز فاز ۴',
                  descEn: 'Verify that required GPU instances, cloud quota allocations, and disk storage are approved and accessible, avoiding mid-iteration delays.',
                  descFa: 'اطمینان از تایید سهمیه سرورهای گرافیکی ابری و ظرفیت هارددیسک‌های پرسرعت تا در میانه چرخه کار متوقف نشود.'
                },
                {
                  id: 3,
                  titleEn: '3. Data Access Clearance Lead-Times Integrated into Critical Path',
                  titleFa: '۳. لحاظ کردن زمان انتظار مجوزهای امنیتی پایگاه داده در مسیر بحرانی',
                  descEn: 'Enterprise data access frequently takes 2 to 4 weeks. Request clearances on Day 1 of Phase I to avoid engineering idle time in Phase II.',
                  descFa: 'اخذ دسترسی به داده‌های سازمانی معمولاً ۲ الی ۴ هفته طول می‌کشد. درخواست دسترسی باید از روز اول فاز یک ثبت شود.'
                },
                {
                  id: 4,
                  titleEn: '4. Iteration is Strictly Timeboxed (No Open-Ended Research)',
                  titleFa: '۴. محدودسازی قاطعانه چرخه در یک جعبه زمانی چابک (پرهیز از پروژه‌های بی‌پایان)',
                  descEn: 'A CPMAI iteration should typically span 4 to 10 weeks. If research questions remain unbounded, split into smaller sprint-sized user stories.',
                  descFa: 'چرخه باید حداکثر بین ۴ تا ۱۰ هفته مقید به زمان باشد. پروژه‌های هوش مصنوعی نباید تبدیل به فعالیت‌های پژوهشی نامحدود شوند.'
                },
                {
                  id: 5,
                  titleEn: '5. Non-Negotiable Stage-Gate Exit Criteria Established for Each Phase',
                  titleFa: '۵. تعیین معیارهای ملموس و غیرقابل چشم‌پوشی برای عبور از هر گیت',
                  descEn: 'Each phase must have a crisp deliverable and acceptance benchmark (e.g., POC beats heuristic baseline by X%, data quality deficiencies logged).',
                  descFa: 'برای عبور از هر فاز باید معیاری کمی و صریح (مانند شکست دادن خط مبنای ساده یا اتمام ممیزی داده) تدوین شده باشد.'
                }
              ].map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#141b20] border border-[#d9dad5] dark:border-[#2d3942] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#00738c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? item.titleFa : item.titleEn}
                    </h4>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5 leading-relaxed">
                      {lang === 'fa' ? item.descFa : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation (Previous: Page 13 / Next: Page 15) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage13}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: صفحه ۱۳ (اسلاید ۲۳: تعیین الگوها)'
              : 'Previous: Page 13 (Slide 23: Which Patterns are Used?)'}
          </span>
        </button>

        {onGoToPage15 && (
          <button
            onClick={onGoToPage15}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-medium hover:bg-[#005f73] transition-colors cursor-pointer"
          >
            <span>
              {lang === 'fa'
                ? 'صفحه بعدی: صفحه ۱۵ (اسلاید ۲۵: منابع فناوری و مهارت‌ها)'
                : 'Next: Page 15 (Slide 25: Technology & Skills)'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
