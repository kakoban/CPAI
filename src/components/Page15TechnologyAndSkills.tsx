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
  Sliders,
  CheckSquare,
  Wrench,
  Code2,
  GitBranch,
  Cloud,
  Terminal,
  UserCheck,
  BookOpen
} from 'lucide-react';

interface Page15Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage14: () => void;
}

interface TechResourceItem {
  id: string;
  category: 'frameworks' | 'compute' | 'data_infra' | 'cicd_governance';
  titleEn: string;
  titleFa: string;
  specEn: string;
  specFa: string;
  recommendationEn: string;
  recommendationFa: string;
  exampleTools: string[];
}

interface SkillRoleItem {
  id: string;
  titleEn: string;
  titleFa: string;
  roleType: 'core_ml' | 'engineering' | 'domain' | 'management';
  allocationEn: string;
  allocationFa: string;
  essentialCompetenciesEn: string[];
  essentialCompetenciesFa: string[];
  commonGapsEn: string;
  commonGapsFa: string;
  mitigationStrategyEn: string;
  mitigationStrategyFa: string;
}

interface CaseStudySample {
  id: string;
  nameEn: string;
  nameFa: string;
  badgeColor: string;
  domainEn: string;
  domainFa: string;
  techResourcesEn: string;
  techResourcesFa: string;
  skillsNeededEn: string;
  skillsNeededFa: string;
}

export const Page15TechnologyAndSkills: React.FC<Page15Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage14
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'tech_catalog' | 'skills_matrix' | 'gap_analysis' | 'samples' | 'readiness'>('canvas');
  const [techFilter, setTechFilter] = useState<'all' | 'frameworks' | 'compute' | 'data_infra' | 'cicd_governance'>('all');
  const [skillFilter, setSkillFilter] = useState<'all' | 'core_ml' | 'engineering' | 'domain' | 'management'>('all');

  // Parse structured sections if stored in unified content
  const defaultTechText = content.includes('=== TECHNOLOGY RESOURCES ===')
    ? content.split('=== SKILLS & COMPETENCIES ===')[0].replace('=== TECHNOLOGY RESOURCES ===', '').trim()
    : content;
  const defaultSkillText = content.includes('=== SKILLS & COMPETENCIES ===')
    ? content.split('=== SKILLS & COMPETENCIES ===')[1].trim()
    : '';

  const [techInput, setTechInput] = useState(defaultTechText);
  const [skillInput, setSkillInput] = useState(defaultSkillText);

  // Sync to parent content
  const handleUpdate = (tech: string, skill: string) => {
    setTechInput(tech);
    setSkillInput(skill);
    const combined = `=== TECHNOLOGY RESOURCES ===\n${tech}\n\n=== SKILLS & COMPETENCIES ===\n${skill}`;
    onChangeContent(combined);
  };

  // 1. Technology Catalog for AI Initiatives
  const TECH_CATALOG: TechResourceItem[] = [
    {
      id: 'nlp-llm-frameworks',
      category: 'frameworks',
      titleEn: 'AI/ML Libraries & NLP Frameworks',
      titleFa: 'کتابخانه‌های هوش مصنوعی و فریم‌ورک‌های NLP',
      specEn: 'Supervised classifiers, pre-trained transformers, retrieval pipelines',
      specFa: 'کلاسیفایرهای یادگیری نظارت‌شده، مدل‌های ترنسفورمر، خط لوله‌های بازیابی اطلاعات',
      recommendationEn: 'Scikit-Learn, PyTorch, Hugging Face Transformers, vLLM, LangChain',
      recommendationFa: 'سایکیت‌لرن، پایتورچ، هاگینگ‌فیس، vLLM، لنگ‌چین',
      exampleTools: ['Scikit-Learn', 'PyTorch', 'HuggingFace', 'LangChain', 'vLLM']
    },
    {
      id: 'compute-instances',
      category: 'compute',
      titleEn: 'Secure Scalable Compute Infrastructure',
      titleFa: 'زیرساخت پردازشی امن و مقیاس‌پذیر',
      specEn: 'Training acceleration (GPU nodes) & high-availability CPU/GPU endpoints for inference',
      specFa: 'شتاب‌دهنده‌های آموزش (GPU) و سرورهای استنتاج با آپ‌تایم بالای ۹۹٪ و تاخیر کم',
      recommendationEn: 'Cloud Instances (AWS EC2 / Azure ML / GCP Vertex), on-prem GPU cluster',
      recommendationFa: 'سرورهای ابری اختصاصی، کانتینرهای داکر، کلاسترهای محلی با دیسک پرسرعت NVMe',
      exampleTools: ['NVIDIA A100/L4', 'Docker Engine', 'Kubernetes', 'Cloud Spot Nodes']
    },
    {
      id: 'integration-apis',
      category: 'data_infra',
      titleEn: 'Enterprise Data APIs & Integration Endpoints',
      titleFa: 'درگاه‌های رابط برنامه‌نویسی (API) و یکپارچه‌سازی داده',
      specEn: 'Bi-directional secure connectors to CRM, Ticketing, ERP, and transaction databases',
      specFa: 'کانکتورهای امن دوطرفه به سامانه‌های CRM، مدیریت سفارشات، سیستم تیکتینگ و پایگاه داده عملیاتی',
      recommendationEn: 'RESTful / GraphQL APIs, Webhooks, OAuth2 authentication, Apache Kafka',
      recommendationFa: 'وب‌هوک‌های امن، احراز هویت توکن‌محور OAuth2، پایپ‌لاین‌های پیام‌رسان رویدادمحور',
      exampleTools: ['Zendesk API', 'Salesforce REST', 'PostgreSQL', 'Kafka', 'Redis']
    },
    {
      id: 'cicd-mlops',
      category: 'cicd_governance',
      titleEn: 'Version Control, CI/CD & MLOps Governance',
      titleFa: 'کنترل نسخه، استقرار مداوم (CI/CD) و حاکمیت MLOps',
      specEn: 'Model registry, artifact storage, automated unit testing, drift monitoring dashboards',
      specFa: 'رجیستری نسخه‌بندی مدل، ذخیره‌سازی مصنوعات، تست‌های خودکار یکپارچگی و مانیتورینگ رانش داده',
      recommendationEn: 'Git, GitHub Actions / GitLab CI, MLflow, Weights & Biases, Prometheus',
      recommendationFa: 'گیت، اکشن‌های خودکار، ام‌ال‌فلو، داشبوردهای پرومتئوس و لاگینگ متمرکز',
      exampleTools: ['Git / GitHub', 'MLflow', 'GitHub Actions', 'Prometheus', 'Grafana']
    }
  ];

  // 2. Skill Roles & Competencies
  const SKILL_ROLES: SkillRoleItem[] = [
    {
      id: 'nlp-engineer',
      titleEn: 'NLP / Machine Learning Specialist',
      titleFa: 'متخصص پردازش زبان طبیعی و یادگیری ماشین',
      roleType: 'core_ml',
      allocationEn: '100% FTE',
      allocationFa: '۱۰۰٪ ظرفیت تمام‌وقت',
      essentialCompetenciesEn: [
        'Text feature engineering (TF-IDF, n-grams, dense embeddings)',
        'Classifier training, cross-validation, and confidence calibration',
        'Model fine-tuning and hyperparameter optimization'
      ],
      essentialCompetenciesFa: [
        'مهندسی ویژگی‌های متن (TF-IDF، n-gram، امبدینگ‌های برداری)',
        'آموزش کلاسیفایر، اعتبارسنجی متقاطع و کالیبراسیون احتمال اطمینان',
        'تنظیم بهینه هایپرپارامترها و جلوگیری از بیش‌برازش'
      ],
      commonGapsEn: 'Lack of NLP practical experience; reliance on opaque black-box APIs without local fallback.',
      commonGapsFa: 'کمبود تجربه عملیاتی NLP در استقرار سازمانی؛ اتکای بیش از حد به APIهای ناشناخته خارجی.',
      mitigationStrategyEn: 'Engage external AI specialized consultancy or adopt validated modular reference pipelines.',
      mitigationStrategyFa: 'استفاده از مشاوران تخصصی هوش مصنوعی یا بهره‌گیری از پایپ‌لاین‌های استاندارد آزموده شده.'
    },
    {
      id: 'solutions-architect',
      titleEn: 'Solutions Architect & Integration Engineer',
      titleFa: 'معمار راهکار نرم‌افزاری و مهندس یکپارچه‌سازی',
      roleType: 'engineering',
      allocationEn: '50% - 80% FTE',
      allocationFa: '۵۰٪ تا ۸۰٪ ظرفیت تمام‌وقت',
      essentialCompetenciesEn: [
        'API endpoint construction and webhook event handling',
        'Secure token authentication and middleware caching',
        'High-throughput asynchronous queuing and latency SLA control'
      ],
      essentialCompetenciesFa: [
        'طراحی اندپوینت‌های وب‌هوک و معماری میکروسرویس',
        'مدیریت احراز هویت توکن‌های امنیتی و کشینگ پاسخ‌ها',
        'کنترل صف‌های غیرهمزمان و تضمین تاخیر زیر ۵ میلی‌ثانیه'
      ],
      commonGapsEn: 'System integration silos; legacy CRM systems lacking modern REST endpoints.',
      commonGapsFa: 'عدم تطابق سامانه‌های قدیمی سازمان با استانداردهای مدرن وب‌هوک و REST API.',
      mitigationStrategyEn: 'Build lightweight intermediate adapter microservices and API gateways.',
      mitigationStrategyFa: 'توسعه مایکروسرویس‌های واسط (Middleware Adapters) و درگاه‌های یکپارچه API.'
    },
    {
      id: 'domain-lead',
      titleEn: 'Customer Support Lead / Domain SME',
      titleFa: 'سرپرست خدمات مشتریان / متخصص موضوعی حوزه (SME)',
      roleType: 'domain',
      allocationEn: '30% - 40% FTE',
      allocationFa: '۳۰٪ تا ۴۰٪ ظرفیت کاری',
      essentialCompetenciesEn: [
        'Curating authentic training FAQs and intent taxonomies',
        'Defining human escalation workflows and threshold boundaries',
        'Validating chatbot tone, accuracy, and customer-centric empathy'
      ],
      essentialCompetenciesFa: [
        'انتخاب و تدوین سوالات پرتکرار و برچسب‌گذاری دسته‌های پیام',
        'تعریف دقیق مسیرهای ارجاع به انسان و سناریوهای بحرانی',
        'ارزیابی لحن پاسخ‌ها و انطباق آن با استانداردهای رضایت مشتری'
      ],
      commonGapsEn: 'Staff resistance or fear of AI replacement leading to incomplete training datasets.',
      commonGapsFa: 'مقاومت سازمانی یا نگرانی از جایگزینی پرسنل با هوش مصنوعی و عدم همکاری کامل در تدوین دیتا.',
      mitigationStrategyEn: 'Transparent upskilling; framing the AI chatbot as an assistant that eliminates boring repetitive tickets.',
      mitigationStrategyFa: 'شفاف‌سازی و ارتقای مهارت پرسنل؛ معرفی چت‌بات به عنوان دستیاری برای حذف تیکت‌های خسته‌کننده.'
    },
    {
      id: 'ai-project-manager',
      titleEn: 'Agile AI Project Manager (PMI-CPMAI)',
      titleFa: 'مدیر چابک پروژه هوش مصنوعی (مسلط بر استاندارد CPMAI)',
      roleType: 'management',
      allocationEn: '100% FTE',
      allocationFa: '۱۰۰٪ ظرفیت تمام‌وقت',
      essentialCompetenciesEn: [
        'Orchestrating CPMAI 6-phase stage-gates and sprint backlogs',
        'Tracking ROI metrics ($747K savings) vs operational expenditure',
        'Enforcing Trustworthy AI governance and GDPR/CCPA data privacy'
      ],
      essentialCompetenciesFa: [
        'هدایت گیت‌های ۶ فاز CPMAI و مدیریت بک‌لاگ اسپرینت‌های چابک',
        'پایش مستمر شاخص‌های ROI مالی در برابر بودجه مصوب پروژه',
        'اعمال استانداردهای هوش مصنوعی مسئولیت‌پذیر و ماسک‌کردن داده‌های حساس'
      ],
      commonGapsEn: 'Managing AI with traditional linear waterfall methodologies expecting deterministic zero-error outcomes.',
      commonGapsFa: 'مدیریت پروژه هوش مصنوعی با متدهای خطی و سنتی آبشاری و انتظار خطای صفر غیرواقعی.',
      mitigationStrategyEn: 'Adopting probabilistic CPMAI thinking and agile iterative sprint cadences with frequent testing.',
      mitigationStrategyFa: 'به‌کارگیری چارچوب احتمالی CPMAI و چرخه‌های تکرار ۲ تا ۴ هفته‌ای چابک.'
    }
  ];

  // 3. Case Studies
  const SAMPLES: CaseStudySample[] = [
    {
      id: 'xyz-retail',
      nameEn: 'XYZ Company — Customer Support Chatbot (Official PMI Sample)',
      nameFa: 'شرکت XYZ — چت‌بات پشتیبانی فروشگاهی (نمونه رسمی کتاب کار PMI)',
      badgeColor: '#00738c',
      domainEn: 'E-Commerce Retail (Personalized Gifts)',
      domainFa: 'خرده‌فروشی آنلاین هدایای سفارشی',
      techResourcesEn: `1. An AI-powered chatbot platform and NLP classification library (Scikit-Learn / Transformers).
2. A secure cloud hosting environment with scalable auto-scaling infrastructure.
3. Access to CRM (Customer Relationship Management) and order management systems via well-defined REST APIs.
4. Version control (Git) and continuous integration/continuous delivery (CI/CD) pipelines for iterative deployment and regression testing.`,
      techResourcesFa: `۱. پلتفرم چت‌بات هوش مصنوعی و کتابخانه‌های پردازش زبان طبیعی (NLP) نظیر Scikit-Learn و HuggingFace.
۲. محیط هاستینگ ابری امن با زیرساخت مقیاس‌پذیر و دسترسی پایدار (آپ‌تایم بالای ۹۹٪).
۳. دسترسی به پایگاه داده سفارشات و سامانه CRM از طریق وب‌سرویس‌ها و APIهای معین.
۴. سیستم کنترل نسخه (Git) و پایپ‌لاین‌های استقرار مداوم (CI/CD) جهت توسعه تکرارشونده و تست‌های خودکار.`,
      skillsNeededEn: `1. NLP expertise for model training, feature extraction, and intent classification refinement.
2. Software engineering capabilities to construct, secure, and integrate backend APIs with company storefront.
3. Knowledge of data privacy regulations (GDPR / CCPA) and automated PII redaction methods.
4. Agile project management (CPMAI) to orchestrate cross-functional sprints within a 4-month MVP window.
5. Customer-service domain expertise to curate authentic FAQs, training logs, and Level-2 escalation logic.
* Skill Gaps Addressed: Limited internal data science headcount augmented through external AI consultancy.`,
      skillsNeededFa: `۱. تخصص پردازش زبان طبیعی (NLP) جهت آموزش مدل، استخراج ویژگی‌های متنی و بهینه‌سازی کلاسیفایر.
۲. مهارت مهندسی نرم‌افزار جهت ساخت، ایمن‌سازی و اتصال APIها به پلتفرم فروشگاه اینترنتی.
۳. دانش حریم خصوصی داده‌ها (GDPR / CCPA) و پیاده‌سازی مکانیزم ماسک کردن اطلاعات هویتی (PII).
۴. مدیریت پروژه چابک هوش مصنوعی (CPMAI) برای هدایت اسپرینت‌ها در بازه ۴ ماهه نسخه کمینه پذیرفتنی (MVP).
۵. دانش حوزه خدمات مشتریان برای تدوین سوالات پرتکرار و سناریوهای ارجاع به اپراتور انسان.
* جبران شکاف مهارتی: استفاده از مشاور خارجی هوش مصنوعی به منظور تکمیل تیم تک‌نفره IT داخلی.`
    },
    {
      id: 'metro-tbm',
      nameEn: 'Metro TBM Excavation — Geotechnical AI Predictive System',
      nameFa: 'حفاری مکانیزه مترو (TBM) — سامانه هوش مصنوعی پیش‌بینی ژئوتکنیک',
      badgeColor: '#b87333',
      domainEn: 'Heavy Infrastructure & Mechanized Tunneling',
      domainFa: 'زیرساخت‌های عمرانی و حفاری مکانیزه شهری',
      techResourcesEn: `1. Time-series ML stack: Python, Scikit-learn, XGBoost, and PyTorch for regression & anomaly detection.
2. High-performance industrial edge gateway connected to TBM PLC data-logger capturing 1Hz sensor telemetry.
3. Geo-database integration: Central PostgreSQL/TimescaleDB storing cutterhead torque, thrust, grout pressure, and settlement pins.
4. Automated data sanitization pipeline with Kalman filtering for noisy vibration sensors.`,
      techResourcesFa: `۱. جعبه‌ابزار تحلیل سری‌های زمانی: پایتون، XGBoost و پای‌تورچ جهت رگرسیون پیش‌بینانه و تشخیص ناهنجاری.
۲. گیت‌وی صنعتی متصل به PLC دستگاه حفار TBM با توان ثبت تله‌متری سنسورها با فرکانس ۱ هرتز.
۳. پایگاه داده ژئوتکنیک متمرکز (TimescaleDB) جهت ذخیره گشتاور کاترهد، فشار جک‌ها، تزریق دوغاب و سنسورهای نشست.
۴. خط لوله پالایش داده با فیلترهای کالمن برای حذف نویزهای سنسورهای ارتعاشی.`,
      skillsNeededEn: `1. Geotechnical & tunnel engineering SME knowledge to interpret ground loss and geological strata.
2. Machine learning engineer specializing in multivariate sensor regression and physics-informed models.
3. SCADA / PLC instrumentation technician to maintain sensor calibration and hardware reliability.
4. AI safety officer to enforce fail-safe autonomous alarms when cutterhead torque approaches plastic threshold.`,
      skillsNeededFa: `۱. متخصص مهندسی ژئوتکنیک و تونل‌سازی جهت تحلیل مکانیک خاک و رفتار لایه‌های زمین‌شناسی.
۲. مهندس یادگیری ماشین با تخصص در مدل‌های رگرسیون چندمتغیره و سیستم‌های تلفیق فیزیک و هوش مصنوعی.
۳. تکنسین ابزاردقیق و PLC برای کالیبراسیون مداوم سنسورها و نگهداری بستر سخت‌افزاری.
۴. مدیر ایمنی هوش مصنوعی جهت تعریف هشدارهای خودکار در صورت عبور گشتاور از حد مجاز.`
    }
  ];

  const handleApplySample = (sample: CaseStudySample) => {
    const tech = lang === 'fa' ? sample.techResourcesFa : sample.techResourcesEn;
    const skills = lang === 'fa' ? sample.skillsNeededFa : sample.skillsNeededEn;
    handleUpdate(tech, skills);
  };

  const handleCopyBoth = () => {
    const combined = lang === 'fa'
      ? `=== نیازمندی‌های منابع فناوری ===\n${techInput || '(موردی ثبت نشده)'}\n\n=== نیازمندی‌های مهارت‌ها و شکاف‌ها ===\n${skillInput || '(موردی ثبت نشده)'}`
      : `=== TECHNOLOGY RESOURCES ===\n${techInput || '(None entered)'}\n\n=== SKILLS & COMPETENCIES ===\n${skillInput || '(None entered)'}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(combined).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner matching Workbook Slide 25 */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] p-5 sm:p-6 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e6f4f7] dark:bg-[#102a33] text-[#00738c] dark:text-[#6fb3c6]">
              <HardDrive className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'فاز اول CPMAI · صفحه ۱۵ (اسلاید ۲۵)' : 'CPMAI Phase I · Page 15 (Slide 25)'}</span>
            </span>
            <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa' ? 'تسک: نیازمندی‌های منابع (Technology & Skills)' : 'Task: Resource Requirements'}
            </span>
          </div>

          <button
            onClick={handleCopyBoth}
            className="flex items-center gap-1.5 text-xs text-[#00738c] dark:text-[#6fb3c6] hover:underline cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی کل کاربرگ' : 'Copy All')}</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9] tracking-tight">
          {lang === 'fa'
            ? 'سیاهه منابع فناوری و مهارت‌های مورد نیاز پروژه شناختی'
            : 'Technology Resources & Skills Inventory for Cognitive Project'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mt-1.5 leading-relaxed">
          {lang === 'fa'
            ? 'بر اساس استاندارد CPMAI، قبل از آغاز فاز داده‌ها باید زیرساخت‌های پردازشی، پلتفرم‌ها و کتابخانه‌های AI مشخص گردند و تخصص‌های انسانی به همراه شکاف‌های مهارتی (Skill Gaps) جهت تامین بررسی شوند.'
            : 'According to CPMAI methodology, identify available cognitive technology infrastructure, algorithms, APIs, and assess human skills alongside critical skill gaps before advancing to data phases.'}
        </p>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#d9dad5] dark:border-[#2d3942] overflow-x-auto">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'canvas'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'کاربرگ کتاب کار (مطابق عکس)' : 'Workbook Canvas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tech_catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'tech_catalog'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'سیاهه فناوری‌ها و ابزارها' : 'Technology Stack'}</span>
          </button>

          <button
            onClick={() => setActiveTab('skills_matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'skills_matrix'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'تخصص‌ها و نقش‌ها' : 'Skills & Roles'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gap_analysis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'gap_analysis'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'تحلیل شکاف مهارت‌ها (Skill Gaps)' : 'Gap Analysis'}</span>
          </button>

          <button
            onClick={() => setActiveTab('samples')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'samples'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'نمونه‌های پرشده (کتاب حل‌شده)' : 'Case Study Samples'}</span>
          </button>

          <button
            onClick={() => setActiveTab('readiness')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'readiness'
                ? 'bg-[#00738c] text-white shadow-2xs font-semibold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'چک‌لیست آمادگی منابع' : 'Readiness Checklist'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: WORKBOOK CANVAS (Matching Exact Screenshot) */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          {/* Top Question 1 Container (Matching Screenshot Top Section) */}
          <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl border border-[#d9dad5] dark:border-[#2d3942] overflow-hidden shadow-xs">
            {/* Top Instruction Prompt */}
            <div className="p-4 sm:p-5 bg-[#fafaf8] dark:bg-[#151c21] border-b border-[#d9dad5] dark:border-[#2d3942]">
              <p className="text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                {lang === 'fa'
                  ? 'منابع فناوری خاص هوش مصنوعی که در دسترس دارید را فهرست کنید. چه زیرساختی برای استفاده در دسترس دارید؟ چه ابزارهای شناختی در دسترسی دارید؟'
                  : 'List the cognitive-specific technology resources you have available. What infrastructure do you have that is available for use? What cognitive tools do you have that is available for use?'}
              </p>
            </div>

            {/* Cyan Header Box (Matching Screenshot Box 1) */}
            <div className="bg-[#00738c] px-4 py-3 text-white flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                {lang === 'fa'
                  ? 'به چه منابع فناوری برای این پروژه نیاز دارید؟'
                  : 'What technology resources do you need for this project?'}
              </h2>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
                {techInput ? `${techInput.split(/\s+/).filter(Boolean).length} words` : '0 words'}
              </span>
            </div>

            {/* Blue Textarea Box (Matching Screenshot Box 1 Interior) */}
            <div className="p-4 bg-[#e8eef8] dark:bg-[#131d27]">
              <textarea
                value={techInput}
                onChange={e => handleUpdate(e.target.value, skillInput)}
                rows={7}
                placeholder={
                  lang === 'fa'
                    ? 'مثال: کتابخانه NLP، سرورهای ابری امن با GPU، وب‌هوک اتصال به سامانه CRM، پایپ‌لاین CI/CD و پایگاه داده تیکت‌ها...'
                    : 'e.g., An AI-powered chatbot platform or NLP library, a secure cloud hosting environment with scalable infrastructure, access to CRM via REST APIs, version control and CI/CD pipelines...'
                }
                className="w-full p-3.5 rounded-lg bg-white dark:bg-[#1a2228] border border-[#b8cce6] dark:border-[#2b3e52] text-[#1c2830] dark:text-[#e8ebe9] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00738c] resize-y leading-relaxed font-sans shadow-2xs"
              />
              <div className="flex items-center justify-between mt-2 flex-wrap gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <span>
                  {lang === 'fa'
                    ? 'نکته: منابع سخت‌افزاری پردازش، فریم‌ورک‌های AI، کانکتورهای API و زیرساخت استقرار را ذکر کنید.'
                    : 'Tip: Include compute acceleration, AI frameworks, API endpoints, and MLOps deployment tools.'}
                </span>
                <button
                  onClick={() => handleUpdate('', skillInput)}
                  className="text-xs text-[#b3432f] hover:underline cursor-pointer"
                >
                  {lang === 'fa' ? 'پاک کردن این کادر' : 'Clear Box'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Question 2 Container (Matching Screenshot Bottom Section) */}
          <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl border border-[#d9dad5] dark:border-[#2d3942] overflow-hidden shadow-xs">
            {/* Middle Instruction Prompt */}
            <div className="p-4 sm:p-5 bg-[#fafaf8] dark:bg-[#151c21] border-b border-[#d9dad5] dark:border-[#2d3942]">
              <p className="text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                {lang === 'fa'
                  ? 'مهارت‌های شناختی که در اختیار دارید را فهرست کنید. چه تخصص‌ها و مهارت‌هایی در دسترستان است که می‌توانید برای این پروژه استفاده کنید؟ چه شکاف‌های مهارتی را باید برای این پروژه برطرف کنید؟'
                  : 'List the cognitive skills you have available. What expertise and skills are available that you can use for this project? What are the skill gaps you need to address for this project?'}
              </p>
            </div>

            {/* Cyan Header Box (Matching Screenshot Box 2) */}
            <div className="bg-[#00738c] px-4 py-3 text-white flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                {lang === 'fa'
                  ? 'برای این تکرار پروژه به چه مهارت‌هایی نیاز دارید؟'
                  : 'What skills do you need for this project iteration?'}
              </h2>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
                {skillInput ? `${skillInput.split(/\s+/).filter(Boolean).length} words` : '0 words'}
              </span>
            </div>

            {/* Blue Textarea Box (Matching Screenshot Box 2 Interior) */}
            <div className="p-4 bg-[#e8eef8] dark:bg-[#131d27]">
              <textarea
                value={skillInput}
                onChange={e => handleUpdate(techInput, e.target.value)}
                rows={7}
                placeholder={
                  lang === 'fa'
                    ? 'مثال: تخصص پردازش متن NLP، مهندس یکپارچه‌سازی API، مدیر چابک پروژه (CPMAI)، کارشناس ارشد پشتیبانی برای تدوین سوالات پرتکرار و سناریوهای ارجاع، تامین شکاف دیتا ساینس با مشاور خارجی...'
                    : 'e.g., NLP expertise for model training, software engineering capabilities to build and integrate APIs, data privacy & security knowledge, agile project management, customer service domain knowledge. Skill gaps mitigated via external consultancy...'
                }
                className="w-full p-3.5 rounded-lg bg-white dark:bg-[#1a2228] border border-[#b8cce6] dark:border-[#2b3e52] text-[#1c2830] dark:text-[#e8ebe9] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00738c] resize-y leading-relaxed font-sans shadow-2xs"
              />
              <div className="flex items-center justify-between mt-2 flex-wrap gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <span>
                  {lang === 'fa'
                    ? 'نکته: نقش‌های تیمی مورد نیاز، مهارت‌های موجود و استراتژی جبران شکاف مهارتی (Skill Gaps) را مشخص کنید.'
                    : 'Tip: Clarify internal competencies, missing skillsets, and mitigation approaches (training, contractors).'}
                </span>
                <button
                  onClick={() => handleUpdate(techInput, '')}
                  className="text-xs text-[#b3432f] hover:underline cursor-pointer"
                >
                  {lang === 'fa' ? 'پاک کردن این کادر' : 'Clear Box'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECH CATALOG */}
      {activeTab === 'tech_catalog' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['all', 'frameworks', 'compute', 'data_infra', 'cicd_governance'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setTechFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  techFilter === cat
                    ? 'bg-[#00738c] text-white font-semibold'
                    : 'bg-[#ffffff] dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5] dark:border-[#2d3942]'
                }`}
              >
                {cat === 'all' && (lang === 'fa' ? 'همه فناوری‌ها' : 'All Technologies')}
                {cat === 'frameworks' && (lang === 'fa' ? 'فریم‌ورک‌های مدل و NLP' : 'AI/NLP Frameworks')}
                {cat === 'compute' && (lang === 'fa' ? 'سرورها و زیرساخت GPU' : 'Compute & GPU')}
                {cat === 'data_infra' && (lang === 'fa' ? 'درگاه‌های API و داده' : 'APIs & Data')}
                {cat === 'cicd_governance' && (lang === 'fa' ? 'پایپ‌لاین CI/CD و پایش' : 'CI/CD & MLOps')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TECH_CATALOG.filter(item => techFilter === 'all' || item.category === techFilter).map(item => (
              <div
                key={item.id}
                className="bg-[#ffffff] dark:bg-[#1a2228] p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? item.titleFa : item.titleEn}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0] font-mono">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-3 leading-relaxed">
                    {lang === 'fa' ? item.specFa : item.specEn}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#fafaf8] dark:bg-[#141b20] border border-[#e2e8f0] dark:border-[#2b3a47] text-xs">
                    <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'توصیه استاندارد CPMAI:' : 'CPMAI Recommendation:'}
                    </strong>
                    <p className="text-[#00738c] dark:text-[#6fb3c6] mt-0.5 font-medium">
                      {lang === 'fa' ? item.recommendationFa : item.recommendationEn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between flex-wrap gap-1.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.exampleTools.map(tool => (
                      <span
                        key={tool}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#e8eef8] dark:bg-[#131d27] text-[#1f5163] dark:text-[#9cc4db] font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const snippet = lang === 'fa'
                        ? `\n• ${item.titleFa}: ${item.recommendationFa}`
                        : `\n• ${item.titleEn}: ${item.recommendationEn}`;
                      handleUpdate((techInput + snippet).trim(), skillInput);
                    }}
                    className="text-xs text-[#00738c] dark:text-[#6fb3c6] hover:underline font-semibold cursor-pointer"
                  >
                    {lang === 'fa' ? '+ افزودن به کاربرگ' : '+ Insert'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS MATRIX */}
      {activeTab === 'skills_matrix' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['all', 'core_ml', 'engineering', 'domain', 'management'] as const).map(role => (
              <button
                key={role}
                onClick={() => setSkillFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  skillFilter === role
                    ? 'bg-[#00738c] text-white font-semibold'
                    : 'bg-[#ffffff] dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5] dark:border-[#2d3942]'
                }`}
              >
                {role === 'all' && (lang === 'fa' ? 'تمام تخصص‌ها' : 'All Roles')}
                {role === 'core_ml' && (lang === 'fa' ? 'متخصص یادگیری ماشین و NLP' : 'Core ML / NLP')}
                {role === 'engineering' && (lang === 'fa' ? 'مهندسی نرم‌افزار و معماری' : 'Software & Arch')}
                {role === 'domain' && (lang === 'fa' ? 'متخصص حوزه کسب‌وکار (SME)' : 'Domain SME')}
                {role === 'management' && (lang === 'fa' ? 'مدیر چابک پروژه AI' : 'Agile Project PM')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_ROLES.filter(r => skillFilter === 'all' || r.roleType === skillFilter).map(role => (
              <div
                key={role.id}
                className="bg-[#ffffff] dark:bg-[#1a2228] p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? role.titleFa : role.titleEn}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#e6f4f7] dark:bg-[#102a33] text-[#00738c] dark:text-[#6fb3c6] font-medium">
                      {lang === 'fa' ? role.allocationFa : role.allocationEn}
                    </span>
                  </div>

                  <div className="space-y-2 mt-3">
                    <span className="text-xs font-bold text-[#5d6b73] dark:text-[#9aa8b0]">
                      {lang === 'fa' ? 'شایستگی‌های حیاتی مورد نیاز:' : 'Key Competencies:'}
                    </span>
                    <ul className="text-xs space-y-1 text-[#1c2830] dark:text-[#e8ebe9]">
                      {(lang === 'fa' ? role.essentialCompetenciesFa : role.essentialCompetenciesEn).map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2f7d5b] shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 p-2.5 rounded-lg bg-[#fff8eb] dark:bg-[#281e10] border border-[#f5d08a] dark:border-[#523d1d] text-xs">
                    <strong className="text-[#a16207] dark:text-[#fde047]">
                      {lang === 'fa' ? 'شکاف رایج:' : 'Common Gap:'}
                    </strong>
                    <p className="text-[#78350f] dark:text-[#fef08a] mt-0.5">
                      {lang === 'fa' ? role.commonGapsFa : role.commonGapsEn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between">
                  <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? role.mitigationStrategyFa : role.mitigationStrategyEn}
                  </span>
                  <button
                    onClick={() => {
                      const snippet = lang === 'fa'
                        ? `\n• ${role.titleFa} (${role.allocationFa}): ${role.essentialCompetenciesFa.join('، ')}`
                        : `\n• ${role.titleEn} (${role.allocationEn}): ${role.essentialCompetenciesEn.join(', ')}`;
                      handleUpdate(techInput, (skillInput + snippet).trim());
                    }}
                    className="text-xs text-[#00738c] dark:text-[#6fb3c6] hover:underline font-semibold cursor-pointer shrink-0 ml-2"
                  >
                    {lang === 'fa' ? '+ افزودن به کاربرگ' : '+ Insert'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GAP ANALYSIS */}
      {activeTab === 'gap_analysis' && (
        <div className="bg-[#ffffff] dark:bg-[#1a2228] p-5 sm:p-6 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'راهنمای تحلیل و جبران شکاف مهارت‌ها (Skill Gap Mitigation Strategy)' : 'Skill Gap Mitigation Strategy'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
              {lang === 'fa'
                ? 'در پروژه‌های هوش مصنوعی، به‌ندرت تمام مهارت‌ها در تیم داخلی وجود دارد. آزمون CPMAI از شما انتظار دارد ۳ شیوه مشخص برای جبران شکاف‌ها تعریف کنید:'
                : 'Cognitive initiatives rarely start with 100% internal skills. CPMAI expects explicit plans across 3 key mitigation channels:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#fafaf8] dark:bg-[#151c21] border border-[#d9dad5] dark:border-[#2d3942] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#e8eef8] dark:bg-[#131d27] text-[#00738c] flex items-center justify-center font-bold">
                ۱
              </div>
              <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'ارتقای مهارت پرسنل داخلی (Internal Upskilling)' : 'Internal Upskilling'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'آموزش پرسنل پشتیبانی جهت برچسب‌گذاری دیتا، درک ساختار بازخورد به ربات و مدیریت ارجاعات به انسان.'
                  : 'Training internal staff on data labeling, prompt engineering, and human-in-the-loop escalation handling.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#fafaf8] dark:bg-[#151c21] border border-[#d9dad5] dark:border-[#2d3942] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#e6f4f7] dark:bg-[#102a33] text-[#00738c] flex items-center justify-center font-bold">
                ۲
              </div>
              <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'به‌کارگیری مشاوران بیرونی (External Contractors)' : 'External Contractors'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'برون‌سپاری بخش‌های خاص مدل‌سازی NLP یا معماری ابری تا سقف بودجه تعیین‌شده، بدون بار استخدام دائم.'
                  : 'Engaging third-party AI boutique consultancies for high-complexity modeling without incurring long-term overhead.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#fafaf8] dark:bg-[#151c21] border border-[#d9dad5] dark:border-[#2d3942] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#f0fbf6] dark:bg-[#0c2419] text-[#2f7d5b] flex items-center justify-center font-bold">
                ۳
              </div>
              <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'استفاده از مدل‌های پیش‌آموزش‌دیده (Pretrained Foundation)' : 'Pretrained Foundation Models'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'بهره‌گیری از ابزارهای آماده NLP برای کاهش نیاز به توسعه الگوریتم از صفر و کوتاه کردن چرخه زمان‌بندی.'
                  : 'Leveraging established HuggingFace / cloud NLP libraries to avoid building deep architectures from scratch.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SAMPLES */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#e6f4f7] dark:bg-[#102a33] border border-[#b2e1eb] dark:border-[#1d4d5e] text-xs text-[#00738c] dark:text-[#6fb3c6]">
            {lang === 'fa'
              ? 'نمونه‌های رسمی زیر را مشاهده کنید. با کلیک روی دکمه «درج در کاربرگ»، این متن‌ها مستقیماً وارد فرم کتاب کار شما می‌شوند:'
              : 'Review official case studies below. Click "Apply to Canvas" to insert them directly into your workbook canvas:'}
          </div>

          <div className="space-y-4">
            {SAMPLES.map(sample => (
              <div
                key={sample.id}
                className="bg-[#ffffff] dark:bg-[#1a2228] p-5 sm:p-6 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: sample.badgeColor }}
                    />
                    <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? sample.nameFa : sample.nameEn}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleApplySample(sample)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00738c] text-white hover:bg-[#005f73] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'درج در کاربرگ من' : 'Apply to Canvas'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#fafaf8] dark:bg-[#151c21] border border-[#d9dad5] dark:border-[#2d3942] space-y-1.5">
                    <strong className="text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? '۱. منابع فناوری مورد نیاز:' : '1. Technology Resources Needed:'}
                    </strong>
                    <p className="text-[#5d6b73] dark:text-[#9aa8b0] whitespace-pre-line leading-relaxed">
                      {lang === 'fa' ? sample.techResourcesFa : sample.techResourcesEn}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#fafaf8] dark:bg-[#151c21] border border-[#d9dad5] dark:border-[#2d3942] space-y-1.5">
                    <strong className="text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? '۲. مهارت‌های مورد نیاز و پوشش شکاف‌ها:' : '2. Skills Needed & Skill Gaps:'}
                    </strong>
                    <p className="text-[#5d6b73] dark:text-[#9aa8b0] whitespace-pre-line leading-relaxed">
                      {lang === 'fa' ? sample.skillsNeededFa : sample.skillsNeededEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: READINESS CHECKLIST */}
      {activeTab === 'readiness' && (
        <div className="bg-[#ffffff] dark:bg-[#1a2228] p-5 sm:p-6 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
            {lang === 'fa' ? 'چک‌لیست ممیزی آمادگی منابع (Resource Readiness Gate Checklist)' : 'Resource Readiness Gate Checklist'}
          </h3>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {lang === 'fa'
              ? 'قبل از تایید گیت فاز ۱ و ورود به فاز داده‌ها، این ۵ پرسش را ارزیابی کنید:'
              : 'Assess these 5 criteria before clearing Phase I Stage-Gate into Data Understanding:'}
          </p>

          <div className="space-y-3">
            {[
              {
                id: 1,
                titleEn: 'Infrastructure & Compute Budget Clearance',
                titleFa: 'تأیید بودجه زیرساخت و سرورهای محاسباتی',
                descEn: 'Compute and cloud storage expenditure is approved within the project budget constraints.',
                descFa: 'هزینه‌های سرور ابری یا خوشه پردازش محلی در چارچوب محدودیت بودجه پروژه تصویب شده است.'
              },
              {
                id: 2,
                titleEn: 'Target System API Access & Data Ingestion Permissions',
                titleFa: 'دسترسی امن به درگاه‌های داده و سامانه‌های بالادستی (CRM/ERP)',
                descEn: 'API access tokens, read/write permissions, and data transfer endpoints are verified with IT.',
                descFa: 'دسترسی توکن‌های API و مجوزهای خواندن لاگ‌ها با واحد IT و مدیریت امنیت داده هماهنگ شده است.'
              },
              {
                id: 3,
                titleEn: 'Data Science & NLP Lead Confirmed',
                titleFa: 'تثبیت متخصص ارشد یادگیری ماشین و پردازش زبان طبیعی',
                descEn: 'At least one dedicated technical expert is allocated for model exploration and tuning.',
                descFa: 'حداقل یک نیروی متخصص فنی (داخلی یا پیمانکار مشاور) برای توسعه و تیونینگ مدل اختصاص یافته است.'
              },
              {
                id: 4,
                titleEn: 'Business SME / Customer Service Champion Committed',
                titleFa: 'تخصیص زمان مالک فرآیند کسب‌وکار و کارشناس پشتیبانی',
                descEn: 'A representative domain expert is available to validate model output and curate golden FAQ test sets.',
                descFa: 'نماینده تیم پشتیبانی جهت اعتبارسنجی پاسخ‌ها و تدوین سناریوهای تستی وقت کافی دارد.'
              },
              {
                id: 5,
                titleEn: 'Skill Gap Fallback Plan in Place',
                titleFa: 'تدوین برنامه پشتیبان برای مهارت‌های مفقود در تیم',
                descEn: 'Deficiencies in engineering or MLOps have a clear plan (training, contract, or managed APIs).',
                descFa: 'برای تخصص‌های ناموجود، برنامه مشخصی (استفاده از مشاور یا بهره‌گیری از کتابخانه‌های معتبر آماده) وجود دارد.'
              }
            ].map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-[#fafaf8] dark:bg-[#141b20] border border-[#d9dad5] dark:border-[#2d3942] flex items-start gap-3"
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
      )}

      {/* Footer Navigation (Previous: Page 14 / Slide 24) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage14}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: صفحه ۱۴ (اسلاید ۲۴: ارزیابی وضعیت)'
              : 'Previous: Page 14 (Slide 24: Assess Situation)'}
          </span>
        </button>

        <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
          <span>
            {lang === 'fa'
              ? 'تکمیل کاربرگ سیاهه فناوری و مهارت‌های شناختی (اسلاید ۲۵)'
              : 'Slide 25 Technology & Skills Completed'}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#2f7d5b]" />
        </div>
      </div>
    </div>
  );
};
