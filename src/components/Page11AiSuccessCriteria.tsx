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
  XCircle,
  HelpCircle,
  Target,
  BarChart3,
  Award,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Plus,
  Trash2,
  Zap,
  Info,
  Scale,
  Users,
  Compass,
  Cpu,
  Layers
} from 'lucide-react';

interface Page11Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage10: () => void;
  onGoToPage12?: () => void;
}

interface ComparisonDimensionItem {
  id: string;
  dimension: string;
  nonAiCapability: string;
  aiAdvantage: string;
  whyNonAiFails: string;
}

interface SkepticProofItem {
  id: string;
  concern: string;
  skepticPersona: string;
  proofMethod: string;
  successThreshold: string;
}

export const Page11AiSuccessCriteria: React.FC<Page11Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage10,
  onGoToPage12
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'skeptics' | 'examples' | 'checklist'>('overview');

  // Interactive Comparison Matrix Items
  const [comparisonItems, setComparisonItems] = useState<ComparisonDimensionItem[]>([
    {
      id: '1',
      dimension: lang === 'fa' ? 'پردازش داده‌های بدون ساختار و زبان طبیعی (Unstructured Data)' : 'Unstructured Data & Ambiguity Handling',
      nonAiCapability:
        lang === 'fa'
          ? 'تطبیق کلیدواژه‌های سخت‌گیرانه (Exact Regex Match) و فرم‌های استاندارد شده'
          : 'Exact keyword / regex matching, restricted fixed forms only',
      aiAdvantage:
        lang === 'fa'
          ? 'تحلیل عمیق معنایی، درک زمینه، مدیریت مترادف‌ها، غلط‌های املایی و زبان محاوره‌ای'
          : 'Contextual semantics, intent extraction, tolerant to colloquialisms & typos',
      whyNonAiFails:
        lang === 'fa'
          ? 'قوانین شرطی (IF-THEN) با تغییر ساختار یا نگارش سند متوقف شده و نیاز به بازنویسی دائمی دارند'
          : 'Rule-based systems break when wording or format changes, causing huge maintenance overhead'
    },
    {
      id: '2',
      dimension: lang === 'fa' ? 'کشف الگوهای غیرخطی چندمتغیره در مقیاس بالا (Complex Non-linear Patterns)' : 'High-dimensional Non-linear Pattern Recognition',
      nonAiCapability:
        lang === 'fa'
          ? 'استفاده از جداول تصمیم ایستا بر اساس ۳ تا ۵ ویژگی تعریف‌شده توسط انسان'
          : 'Static decision trees or manual heuristics with 3-5 intuitive rules',
      aiAdvantage:
        lang === 'fa'
          ? 'تحلیل هم‌زمان صدها ویژگی رفتاری کاربر و محتوا جهت پیش‌بینی نرخ کلیک و ترجیحات'
          : 'Synthesizing hundreds of latent behavioral and contextual signals simultaneously',
      whyNonAiFails:
        lang === 'fa'
          ? 'انسان یا روش‌های سنتی قادر به شهود یا فرمول‌نویسی همبستگی‌های غیرخطی در ابعاد بالا نیستند'
          : 'Traditional software cannot model combinatorial explosion of non-linear user signals'
    },
    {
      id: '3',
      dimension: lang === 'fa' ? 'مقیاس‌پذیری و خستگی‌ناپذیری در حجم بالا (Scalability & Zero Fatigue)' : 'Scalability & Vigilance without Fatigue',
      nonAiCapability:
        lang === 'fa'
          ? 'تکیه بر بازبینی چشمی توسط تیم‌های انسانی با خستگی پس از چند ساعت و خطای متغیر'
          : 'Manual human review queues suffering fatigue, distraction, and inconsistent standards',
      aiAdvantage:
        lang === 'fa'
          ? 'پردازش بلادرنگ هزاران درخواست با کیفیت یکنواخت ۲۴/۷ و هزینه نهایی نزدیک به صفر'
          : 'Sub-second consistent inferences 24/7 with near-zero marginal cost per decision',
      whyNonAiFails:
        lang === 'fa'
          ? 'افزایش حجم تراکنش‌ها مستلزم استخدام خطی نیروی انسانی و افزایش سرسام‌آور هزینه‌هاست'
          : 'Scaling manual review requires linear hiring, ballooning payroll and operational latency'
    }
  ]);

  // Interactive Skeptic Mitigation Items
  const [skepticItems, setSkepticItems] = useState<SkepticProofItem[]>([
    {
      id: '1',
      concern:
        lang === 'fa'
          ? 'عدم قطعیت و احتمال توهم یا تصمیم‌گیری اشتباه با عواقب مالی یا حقوقی'
          : 'Black-box unpredictability, hallucination risks, or compliance liabilities',
      skepticPersona:
        lang === 'fa'
          ? 'مدیر ارشد ریسک، بازرسی و حقوقی (Risk & Compliance Director)'
          : 'Chief Risk Officer & Legal Counsel',
      proofMethod:
        lang === 'fa'
          ? 'مکانیزم اطمینان کالیبره‌شده (Confidence Score)، فیلتر گاردریل و ارجاع خودکار موارد زیر ۸۵٪ به انسان (HITL)'
          : 'Calibrated confidence gating, deterministic safety guardrails, and HITL escalation below 85%',
      successThreshold:
        lang === 'fa'
          ? 'نرخ خطای بحرانی زیر ۰.۱٪ با تضمین ۱۰۰٪ ثبت لاگ‌های ردیابی و انطباق'
          : 'Critical error rate < 0.1% with 100% audit logging of decision trails'
    },
    {
      id: '2',
      concern:
        lang === 'fa'
          ? 'آیا هزینه‌های سنگین زیرساخت و توسعه AI واقعاً خروجی بهتری نسبت به روش سنتی ارزان‌تر دارد؟'
          : 'Is AI investment really generating higher ROI than simple rule heuristics or manual processes?',
      skepticPersona:
        lang === 'fa'
          ? 'مدیر مالی و مدیر پروژه سنتی (CFO & Senior Project Manager)'
          : 'CFO & Enterprise Operations Director',
      proofMethod:
        lang === 'fa'
          ? 'تست همزمان A/B بین پایپ‌لاین هوش مصنوعی و پایپ‌لاین فعلی روی ترافیک زنده و گزارش شفاف هزینه بر تصمیم'
          : 'Live split A/B testing against incumbent baseline, tracking cost-per-successful-transaction',
      successThreshold:
        lang === 'fa'
          ? 'افزایش حداقل ۱۵ درصدی نرخ تبدیل/دقت و بازگشت سرمایه مثبت طی ۳ ماه پس از عرضه'
          : 'Statistically significant lift (+15% metric lift, p < 0.01) with positive net ROI in 90 days'
    },
    {
      id: '3',
      concern:
        lang === 'fa'
          ? 'جعبه سیاه بودن تصمیمات و ناتوانی در توضیح دلایل به مشتریان یا بازرسان'
          : 'Inability to explain decisions to end-users or regulatory auditors (Explainability)',
      skepticPersona:
        lang === 'fa'
          ? 'مدیر محصول و پشتیبانی مشتریان (Product Manager & Customer Ops)'
          : 'Product Lead & Customer Support Directors',
      proofMethod:
        lang === 'fa'
          ? 'پیاده‌سازی ماژول‌های هوش مصنوعی توضیح‌پذیر (XAI با SHAP/LIME) و ارائه خلاصه دلایل به زبان طبیعی'
          : 'Integrated XAI feature attribution (SHAP values) and natural language rationale summaries',
      successThreshold:
        lang === 'fa'
          ? 'رضایت ۹۰ درصدی کارشناسان ممیزی از وضوح دلایل و پذیرش کامل در آزمون‌های تطابق'
          : 'Audit approval rate >= 95% on sampled explanations and transparent recourse pathways'
    }
  ]);

  const handleAddComparison = () => {
    const newItem: ComparisonDimensionItem = {
      id: Date.now().toString(),
      dimension: lang === 'fa' ? 'بعد مقایسه‌ای جدید' : 'New Comparison Dimension',
      nonAiCapability: lang === 'fa' ? 'محدودیت یا عملکرد سیستم غیر AI' : 'Non-AI Baseline Limitations',
      aiAdvantage: lang === 'fa' ? 'برتری و ارزش افزوده سیستم هوش مصنوعی' : 'Cognitive System Superiority',
      whyNonAiFails: lang === 'fa' ? 'چرا سیستم غیر AI قادر به حل آن نیست' : 'Why non-AI approaches fall short'
    };
    setComparisonItems([...comparisonItems, newItem]);
  };

  const handleRemoveComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== id));
  };

  const handleUpdateComparison = (id: string, field: keyof ComparisonDimensionItem, val: string) => {
    setComparisonItems(comparisonItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const handleAddSkeptic = () => {
    const newItem: SkepticProofItem = {
      id: Date.now().toString(),
      concern: lang === 'fa' ? 'نگرانی یا ابهام جدید اعضای تیم' : 'New Skeptic Concern / Risk',
      skepticPersona: lang === 'fa' ? 'ذی‌نفع یا نقش سازمانی' : 'Stakeholder Persona',
      proofMethod: lang === 'fa' ? 'روش اثبات تجربی (A/B Test / XAI / بنچمارک)' : 'Empirical Proof & Governance Method',
      successThreshold: lang === 'fa' ? 'آستانه موفقیت و شاخص اثبات' : 'Acceptance Threshold'
    };
    setSkepticItems([...skepticItems, newItem]);
  };

  const handleRemoveSkeptic = (id: string) => {
    setSkepticItems(skepticItems.filter(item => item.id !== id));
  };

  const handleUpdateSkeptic = (id: string, field: keyof SkepticProofItem, val: string) => {
    setSkepticItems(skepticItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const text = {
    badgePhase: lang === 'fa' ? 'فاز اول CPMAI · درک کسب‌وکار' : 'CPMAI Phase I · Business Understanding',
    badgeTaskGroup: lang === 'fa' ? 'گروه وظایف: الزامات پروژه شناختی' : 'Task Group: Cognitive Project Requirements',
    badgeTask: lang === 'fa' ? 'وظیفه: الزامات شناختی (اسلاید ۲۱)' : 'Task: Cognitive Requirements (Slide 21)',
    pageTitle:
      lang === 'fa'
        ? 'معیارهای موفقیت هوش مصنوعی (AI Success Criteria)'
        : 'AI Success Criteria: Unique Capabilities & Skeptic Proof',
    pageSubtitle:
      lang === 'fa'
        ? 'تشریح معیارهای پیامد موفق پروژه AI، تبیین کارهایی که سیستم‌های غیر AI قادر به انجام آن نیستند، وجوه برتری بر روش‌های سنتی، و استراتژی اثبات عینی برای اقناع شکاکان تیم'
        : 'Describe criteria for a successful outcome to an AI project, establish what AI achieves that non-AI cannot, articulate superiority dimensions, and formulate empirical proof to satisfy team skeptics.',
    questionsHeader: lang === 'fa' ? 'پرسش‌های رسمی اسلاید ۲۱ در متدولوژی CPMAI' : 'Core Slide 21 Questions in CPMAI Workbook',
    q1Title: lang === 'fa' ? 'پرسش ۱: معیارهای پیامد مفید و موفق در پروژه هوش مصنوعی' : 'Question 1: Criteria for a successful or useful outcome to an AI project',
    q1Desc:
      lang === 'fa'
        ? 'معیارهای یک نتیجه موفق یا سودمند برای پروژه هوش مصنوعی را توصیف کنید. (چه عواملی اثبات می‌کند که پروژه به ارزش تجاری وعده داده‌شده رسیده است؟)'
        : 'Describe the criteria for a successful or useful outcome to the project for an AI project in terms of quantifiable business and cognitive impact.',
    q2Title: lang === 'fa' ? 'پرسش ۲: کارهایی که پروژه AI انجام می‌دهد و پروژه غیر AI ناتوان از آن است' : 'Question 2: What would the AI project do that a non-AI project cannot do?',
    q2Desc:
      lang === 'fa'
        ? 'پروژه هوش مصنوعی باید چه کاری را با موفقیت انجام دهد که یک سیستم سنتی، قاعده‌محور یا دستی عاجز از انجام آن خواهد بود؟'
        : 'What would the AI project need to successfully do that a non-AI project would not be able to do (e.g. semantic ambiguity, high-dimensional patterns)?',
    q3Title: lang === 'fa' ? 'پرسش ۳: وجوه برتری سیستم هوش مصنوعی نسبت به سیستم غیر AI' : 'Question 3: In what ways would the AI system need to be better than non-AI?',
    q3Desc:
      lang === 'fa'
        ? 'سیستم هوش مصنوعی از چه جنبه‌ها و ابعادی (دقت، سرعت، ثبات، تاب‌آوری خطا، هزینه مقیاس) باید بهتر از سیستم‌های غیر AI عمل کند؟'
        : 'In what ways would the AI system need to be better than a non-AI system (throughput, latency, vigilance, generalization, unit cost)?',
    q4Title: lang === 'fa' ? 'پرسش ۴: اقناع شکاکان و شیوه اثبات کارآمدی سیستم هوش مصنوعی' : 'Question 4: What would you need to prove to satisfy team skeptics?',
    q4Desc:
      lang === 'fa'
        ? 'اگر برخی از اعضای تیم یا ذی‌نفعان نسبت به استفاده از هوش مصنوعی بدبین یا مردد هستند، چه چیزی را باید در سیستم اثبات کنید تا نگرانی‌های آنها برطرف شود؟'
        : 'If some people on your team are skeptical about the use of AI, what would you need to prove in your AI system to satisfy their needs?',

    // Tabs
    tabOverview: lang === 'fa' ? 'اصول CPMAI و ابعاد تمایز' : 'CPMAI Principles & Core Pillars',
    tabComparison: lang === 'fa' ? 'ماتریس مقایسه: AI در برابر غیر AI' : 'AI vs Non-AI Head-to-Head Matrix',
    tabSkeptics: lang === 'fa' ? 'استراتژی اثبات و اقناع شکاکان' : 'Skeptic Proof Strategy & Protocols',
    tabExamples: lang === 'fa' ? 'نمونه‌های اسلاید ۲۱ کتاب کار' : 'Slide 21 Reference Templates',
    tabChecklist: lang === 'fa' ? 'چک‌لیست اعتبارسنجی پاسخ' : 'Slide 21 Quality Checklist',

    // Action buttons
    copyTemplate: lang === 'fa' ? 'درج الگوی رسمی اسلاید ۲۱ در بوم' : 'Insert Slide 21 Standard Template',
    copyVideoExample: lang === 'fa' ? 'درج مثال پروژه ویدیو (پیش‌بینی کلیک)' : 'Insert Video Clicks Success Criteria',
    copyDocExample: lang === 'fa' ? 'درج مثال پروژه اسناد (تحلیل هوشمند)' : 'Insert Document AI Success Criteria',
    copiedText: lang === 'fa' ? 'کپی شد!' : 'Copied!',
    clearBtn: lang === 'fa' ? 'پاک کردن بوم' : 'Clear Canvas',
    canvasHeader: lang === 'fa' ? 'بوم ثبت پاسخ اسلاید ۲۱ کتاب کار CPMAI' : 'Slide 21 Workbook Canvas · AI Success Criteria',
    canvasPlaceholder:
      lang === 'fa'
        ? 'پاسخ کامل خود به پرسش‌های اسلاید ۲۱ را در اینجا یادداشت یا از دکمه‌های بالا برای درج الگو استفاده کنید...'
        : 'Enter your comprehensive Slide 21 responses here, or use the pre-formatted templates above...',
    pmiCopyright:
      lang === 'fa'
        ? 'چارچوب متدولوژی CPMAI (شناسایی، الزامات شناختی، درک کسب‌وکار) · مشاوران مدیریت کسب و کار اوج'
        : 'CPMAI Methodology Framework (Cognitive Project Requirements, Phase I) · OWJ Business Council'
  };

  const handleCopyTemplate = () => {
    const templateText =
      lang === 'fa'
        ? `=== پاسخ اسلاید ۲۱ کتاب کار CPMAI: معیارهای موفقیت هوش مصنوعی (AI Success Criteria) ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
موضوع: AI Success Criteria (اسلاید ۲۱)

۱. معیارهای پیامد موفق و مفید برای پروژه هوش مصنوعی (Criteria for a Successful/Useful AI Outcome):
   - بهبود شاخص‌های کلیدی کسب‌وکار (KPI Lift): افزایش نرخ تبدیل یا اثربخشی حداقل ۱۵٪ در مقایسه با وضعیت پایه سنتی.
   - دقت و کیفیت استنتاج در محیط عملیاتی: حفظ دقت بالای ۹۰٪ (F1-score >= 0.88) روی داده‌های واقعی توزیع‌نشده.
   - پایداری و بازده اقتصادی (Cost-to-Value Ratio): هزینه استنتاج ابری و محاسباتی به ازای هر تراکنش کمتر از ۵٪ ارزش خلق‌شده باشد.
   - پذیرش و اعتماد کاربران نهایی (User Adoption Rate): بیش از ۸۵٪ از کارشناسان و کاربران خروجی سیستم را بدون نیاز به لغو دستی بپذیرند.

۲. کارهایی که پروژه هوش مصنوعی انجام می‌دهد و سیستم غیر AI عاجز از انجام آن است:
   - درک معنایی محتوای ساختارنیافته (Semantic Understanding): تفسیر زبان طبیعی با وجود خطاهای نگارشی، تفاوت‌های لهجه، و عبارات چندپهلو که قوانین سخت شرطی (Regex/IF-THEN) قادر به درک آن نیستند.
   - کشف الگوهای پنهان چندبعدی (High-Dimensional Pattern Discovery): ترکیب همزمان صدها فاکتور غیرخطی رفتاری و بافتی که فرمول‌نویسی دستی آنها برای ذهن انسان ناممکن است.
   - تعمیم‌پذیری به داده‌های نادیده (Generalization to Unseen Data): تصمیم‌گیری صحیح در موقعیت‌های جدید بدون شکست سیستم و بدون نیاز به نگارش کدهای جدید برای هر استثنا.

۳. وجوه برتری سیستم هوش مصنوعی نسبت به سیستم غیر AI (Superiority Dimensions):
   - توان عملیاتی و مقیاس‌پذیری (Throughput): پردازش هزاران تراکنش در ثانیه با تاخیر کمتر از ۱۰۰ میلی‌ثانیه؛ در حالی که سیستم سنتی انسانی با افزایش خطی هزینه و گلوگاه زمانی مواجه است.
   - ثبات و حذف خطای ناشی از خستگی (Zero Fatigue & Consistent Rigor): مدل ۲۴ ساعت شبانه‌روز با ضوابط یکسان و بدون افت دقت تصمیم می‌گیرد؛ برخلاف قضاوت دستی که در انتهای شیفت دچار خطای شدید می‌شود.
   - هزینه نهایی تصمیم (Marginal Cost): کاهش ۹۰ درصدی هزینه واحد به ازای هر پردازش پس از استقرار، بر خلاف هزینه‌های جاری سرسام‌آور بازبینی دستی.
   - چابکی در تطبیق با بازار (Retraining Velocity): همگام‌سازی با روندهای جدید صرفاً با بازآموزی مدل، به جای بازنویسی هزاران قانون ایستا و پیچیده.

۴. پاسخ به شکاکان تیم و راهکارهای اثبات عینی (Satisfying Team Skeptics & Proof Strategy):
   - آزمون مقایسه‌ای رودررو (Head-to-Head A/B Testing): اجرای هم‌زمان پایپ‌لاین AI در کنار سیستم سنتی روی ۱۰,۰۰۰ نمونه واقعی و اثبات برتری معنادار آماری (p < 0.01).
   - توضیح‌پذیری و شفافیت تصمیم (Explainability via XAI): نمایش امتیاز اطمینان و بردار اهمیت ویژگی‌ها (SHAP Values) تا سیستم جعبه سیاه غیرشفاف تلقی نشود.
   - مکانیزم ایمنی شکست و انسان در حلقه (Fail-Safe & HITL Guardrails): تعیین حد آستانه ۸۵٪ اطمینان؛ مواردی که مدل نسبت به آنها تردید دارد بلافاصله برای بازبینی تخصصی به کارشناس ارجاع داده می‌شوند تا هیچ ریسک فاجعه‌باری به کسب‌وکار تحمیل نشود.
   - محاسبه شفاف ریسک و بازگشت سرمایه (Risk-Adjusted ROI Proof): اثبات اینکه نرخ خطای کاهش‌یافته و صرفه‌جویی زمانی، تمامی هزینه‌های توسعه و خطاهای محتمل را جبران می‌کند.`
        : `=== CPMAI Slide 21 Deliverable: AI Success Criteria ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Topic: AI Success Criteria (Slide 21)

1. Criteria for a successful or useful outcome to the AI project:
   - Measurable Business Lift: Achieve >= 15% improvement in operational throughput or target conversion KPI versus baseline.
   - Generalization Accuracy: Maintain >= 90% accuracy (Macro F1 >= 0.88) on production holdout data under continuous operations.
   - Economic Viability: Per-inference compute cost remains below 5% of the economic value unlocked per processed item.
   - Stakeholder Adoption: Attain an 85%+ user acceptance rate without recurring manual overrides.

2. What the AI project successfully does that a non-AI project CANNOT do:
   - Semantic Comprehension of Unstructured Data: Interpret natural language, multimodal inputs, and context despite variations, typos, and ambiguity where rigid boolean rules fail.
   - High-Dimensional Non-Linear Synthesis: Uncover latent correlations across hundreds of concurrent user and catalog attributes beyond human heuristic modeling.
   - Robust Generalization to Novel Cases: Handle edge cases and unseen scenarios gracefully without crashing or requiring software release cycles for every exception.

3. Ways the AI system is superior to a non-AI system:
   - Throughput & Operational Velocity: Process thousands of evaluations per second with sub-100ms latency, breaking the linear headcount-to-volume bottleneck.
   - Consistency & Elimination of Fatigue: 24/7 deterministic rigor unaffected by cognitive overload, subjective shifts, or shift transitions.
   - Near-Zero Marginal Cost per Decision: Once deployed, scaling inference by 10x increases costs marginally compared to manual workforce expansion.
   - Adaptive Retraining Agility: Continual domain adaptation through retraining loops rather than refactoring brittle spaghetti rule trees.

4. Empirical Proof & Protocols to Satisfy Team Skeptics:
   - Champion-Challenger (A/B) Holdout Benchmark: Run shadow mode against legacy heuristics across 10k production records, proving statistically significant superiority (p-value < 0.01).
   - Explainable AI (XAI) Attribution: Deliver transparent feature importance weights (SHAP/LIME) and confidence scores for every high-stakes decision.
   - Fail-Safe & Human-in-the-Loop (HITL) Guardrails: Enforce an 85% confidence threshold; uncertain predictions route to human specialists, preventing catastrophic failures.
   - Quantified Error Cost & Net ROI Audit: Demonstrate that the risk-weighted cost of false positives is heavily eclipsed by the efficiency and conversion gains.`;

    onChangeContent(templateText);
  };

  const handleCopyVideoExample = () => {
    const videoText =
      lang === 'fa'
        ? `=== نمونه پروژه رتبه‌بندی و پیش‌بینی کلیک ویدیو: اسلاید ۲۱ کتاب کار CPMAI ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
موضوع: AI Success Criteria (اسلاید ۲۱) · Video Click Prediction Project

۱. معیارهای موفقیت برای سیستم رتبه‌بندی ویدیو مبتنی بر هوش مصنوعی:
   - افزایش حداقل ۱۲ درصدی در نرخ کلیک ویدیوها (CTR Lift >= +12%) در مقایسه با مرتب‌سازی سنتی بر اساس تاریخ یا محبوبیت کل.
   - افزایش ۸ درصدی در میانگین زمان تماشای کاربران (Watch Time).
   - تاخیر استنتاج (Latency) کمتر از ۴۰ میلی‌ثانیه برای پاسخ‌دهی بلادرنگ در اپلیکیشن.
   - نرخ تنوع و پوشش کاتالوگ (Catalog Diversity) حداقل ۴۵٪ برای جلوگیری از انحصار ویدیوهای ترند.

۲. کارهایی که سیستم AI انجام می‌دهد و سیستم غیر AI از آن ناتوان است:
   - درک ترجیحات ضمنی کاربر (Implicit Preferences): مدل علایق نهفته کاربر را از روی الگوهای توقف، پرش و جستجوهای قبلی استخراج می‌کند؛ کاری که هیچ سیستم فیلترینگ استاتیک قادر به پیش‌بینی آن نیست.
   - انطباق در لحظه با زمینه مصرف (Real-time Contextual Sensitivity): لحاظ کردن ساعت شبانه‌روز، نوع دستگاه و موقعیت مکانی در کسری از ثانیه در میان میلیون‌ها ترکیب محتوایی.

۳. وجوه برتری مدل هوش مصنوعی بر مرتب‌سازی سنتی غیر AI:
   - رفع بن‌بست داده‌های جدید (Cold-Start Generalization): استفاده از امبدینگ‌های معنایی متن و تصویر ویدیو برای پیشنهاد ویدیوهای تازه بارگذاری‌شده بدون نیاز به جمع‌آوری دستی آرا.
   - جلوگیری از حباب اطلاعاتی (Filter Bubble): بالانس پویا میان بهره‌برداری از علایق پیشین (Exploitation) و کاوش ویدیوهای نوآورانه (Exploration).
   - مقیاس‌پذیری بی‌درنگ با رشد کاتالوگ بدون نیاز به تنظیم دستی صدها قانون متناقض.

۴. پاسخ به شکاکان تیم (تیم مارکتینگ و مهندسی داده سنتی):
   - اجرای تست A/B آنلاین ۵۰/۵۰ به مدت ۲ هفته و اثبات افزایش نرخ درگیری به صورت آماری ملموس.
   - تدوین مکانیزم ایمنی بازگشت به محبوب‌ترین‌ها (Fallback to Popularity) در صورت قطعی یا تاخیر سرور استنتاج.
   - گزارش تفکیکی منصفانه بودن توزیع ترافیک برای تولیدکنندگان محتوای مختلف.`
        : `=== Reference Project: Video Click Prediction & Ranking (CPMAI Slide 21) ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Topic: AI Success Criteria (Slide 21) · Video Recommendation Project

1. Measurable Success Criteria for Video Click Prediction AI:
   - Statistically significant CTR lift of >= +12% over rule-based chronological/popularity baseline.
   - Average session watch-time expansion of >= +8% across active user cohorts.
   - Strict inference SLA: p95 latency < 40ms under 500 peak RPS.
   - Catalog serendipity: Expand active long-tail catalog consumption by >= 30%.

2. What this AI project does that traditional sorting CANNOT do:
   - Synthesizes subtle non-linear multi-session interactions and implicit negative signals (skips, abandonment).
   - Contextual real-time matching between user immediate intent and millions of multimodal video embeddings.

3. Ways AI is superior to non-AI heuristics:
   - Resolves cold-start bottlenecks via content embeddings rather than waiting for manual popularity thresholds.
   - Continuously balances exploitation of known preferences with exploration of novel niches.
   - Automates personalization for 1M+ active users without maintaining brittle manual segment taxonomies.

4. Satisfying Team Skeptics:
   - 14-day randomized A/B live split test demonstrating provable engagement lift at p < 0.001.
   - Instant deterministic circuit breaker falling back to cache popular feeds if latency exceeds 60ms.
   - Weekly fairness and bias audits verifying content creator distribution.`;

    onChangeContent(videoText);
  };

  const handleCopyDocExample = () => {
    const docText =
      lang === 'fa'
        ? `=== نمونه پروژه پردازش هوشمند اسناد حقوقی و مالی: اسلاید ۲۱ کتاب کار CPMAI ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
موضوع: AI Success Criteria (اسلاید ۲۱) · Document Intelligence Project

۱. معیارهای موفقیت برای سیستم پردازش شناختی اسناد:
   - دسته‌بندی خودکار اسناد با دقت حداقل ۹۲٪ و توان پردازش بیش از ۶۰ سند در ساعت به ازای هر عامل پردازشی.
   - کاهش ۷۰ درصدی زمان چرخه از لحظه دریافت تا بایگانی نهایی در سامانه‌های ERP.
   - صفر شدن خطای از دست رفتن بندهای حساس یا مهلت‌های قراردادی در اسناد اسکن‌شده.

۲. کارهایی که سیستم AI انجام می‌دهد و سیستم غیر AI (OCR ساده / فرم‌های کاغذی) ناتوان از آن است:
   - استخراج مفاهیم حقوقی و تعهدات مالی فارغ از فرمت، فونت، چیدمان ستون‌ها یا اصطلاحات نگارشی گوناگون.
   - توانایی استنتاج ارتباطات معنایی بین پیوست‌ها، الحاقیه‌ها و متن اصلی بدون تکیه بر ساختار ثابت شابلون.

۳. وجوه برتری سیستم AI بر فرآیند دستی یا نرم‌افزارهای سنتی:
   - حذف کامل خستگی اپراتورها و سوگیری‌های شخصی در بازبینی اسناد طولانی ۱۰۰ صفحه‌ای.
   - سرعت پردازش ۱۰ برابری نسبت به سریع‌ترین کارشناس انسانی با هزینه نهایی ۹۰٪ کمتر.
   - ثبت دقیق امتیاز اطمینان برای هر بند استخراج‌شده جهت تضمین ممیزی‌های قانونی.

۴. پاسخ به شکاکان تیم (تیم حقوقی و مدیران انطباق مقرراتی):
   - تعبیه سیستم انسان در حلقه (HITL): تمامی اسناد دارای اطمینان کمتر از ۸۸٪ یا ریسک حقوقی بالا مستقیماً به کارشناس ارشد ارجاع می‌شوند.
   - آزمون بنچمارک کور (Double-Blind Benchmark): مقایسه خروجی هوش مصنوعی با دو وکیل مستقل و اثبات دقت بالاتر AI در کشف ناهماهنگی‌های قراردادی.
   - شفافیت و ارجاع مستقیم متن: مدل موظف است شماره صفحه، پاراگراف و منبع دقیق هر تعهد استخراج‌شده را هایلایت کند.`
        : `=== Reference Project: Document Intelligence & Contract Extraction (CPMAI Slide 21) ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Topic: AI Success Criteria (Slide 21) · Document Intelligence Project

1. AI Success Criteria for Document Processing System:
   - Document classification accuracy >= 92% with throughput >= 60 docs/hour per worker node.
   - 70% reduction in document turnaround time from receipt to ERP indexing.
   - Zero missed high-liability clauses or contractual deadlines across audited volumes.

2. What AI does that traditional OCR / template matching CANNOT do:
   - Semantic understanding of contractual obligations regardless of layout variability, scanned skew, or phraseology.
   - Cross-referencing annexes and parent agreements without predefined coordinate masks.

3. Ways AI is superior to non-AI manual review:
   - Eliminates cognitive fatigue across dense 100-page legal filings.
   - 10x higher processing velocity with 90% lower operational cost per processed document.
   - Explicit confidence scoring on every extracted clause for verifiable governance.

4. Satisfying Team Skeptics (Legal & Compliance Officers):
   - Enforce Human-in-the-Loop review for all documents with confidence score < 88%.
   - Double-blind benchmark against two independent compliance attorneys demonstrating superior recall.
   - Exact provenance linking: AI must cite and highlight the exact clause coordinates in the source PDF.`;

    onChangeContent(docText);
  };

  const handleCopyCanvas = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInsertMatrixToCanvas = () => {
    let matrixSummary = lang === 'fa'
      ? `\n\n--- ماتریس مقایسه هوش مصنوعی در برابر غیر هوش مصنوعی (AI vs Non-AI Matrix) ---\n`
      : `\n\n--- AI vs Non-AI Head-to-Head Comparison Matrix ---\n`;

    comparisonItems.forEach((item, index) => {
      matrixSummary += lang === 'fa'
        ? `${index + 1}. بعد: ${item.dimension}\n   - سیستم غیر AI: ${item.nonAiCapability}\n   - برتری سیستم AI: ${item.aiAdvantage}\n   - چرا غیر AI ناکام است: ${item.whyNonAiFails}\n`
        : `${index + 1}. Dimension: ${item.dimension}\n   - Non-AI Baseline: ${item.nonAiCapability}\n   - AI Advantage: ${item.aiAdvantage}\n   - Why Non-AI Fails: ${item.whyNonAiFails}\n`;
    });

    onChangeContent(content + matrixSummary);
  };

  const handleInsertSkepticsToCanvas = () => {
    let skepticSummary = lang === 'fa'
      ? `\n\n--- استراتژی اقناع شکاکان و شیوه اثبات عینی (Skeptic Mitigation & Proof Strategy) ---\n`
      : `\n\n--- Skeptic Mitigation & Empirical Proof Strategy ---\n`;

    skepticItems.forEach((item, index) => {
      skepticSummary += lang === 'fa'
        ? `${index + 1}. نگرانی: ${item.concern}\n   - ذی‌نفع: ${item.skepticPersona}\n   - روش اثبات: ${item.proofMethod}\n   - آستانه موفقیت: ${item.successThreshold}\n`
        : `${index + 1}. Concern: ${item.concern}\n   - Stakeholder: ${item.skepticPersona}\n   - Proof Method: ${item.proofMethod}\n   - Acceptance Threshold: ${item.successThreshold}\n`;
    });

    onChangeContent(content + skepticSummary);
  };

  // Checklist verification states
  const hasSuccessCriteria = content.includes('معیار') || content.includes('موفق') || content.includes('Success') || content.includes('Criteria');
  const hasUniqueAiCapabilities = content.includes('عاجز') || content.includes('قادر') || content.includes('بدون ساختار') || content.includes('Cannot') || content.includes('Unique');
  const hasSuperiorityDimensions = content.includes('برتر') || content.includes('مقیاس') || content.includes('خستگی') || content.includes('Better') || content.includes('Superior');
  const hasSkepticStrategy = content.includes('شکاک') || content.includes('مردد') || content.includes('اثبات') || content.includes('Skeptic') || content.includes('Proof');

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6]">
              {text.badgePhase}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#f0f1ee] dark:bg-[#1f282e] text-[#5d6b73] dark:text-[#9aa8b0]">
              {text.badgeTaskGroup}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]">
              {text.badgeTask}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              CPMAI Slide 21
            </span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2.5">
          <Award className="w-6 h-6 text-[#00738c] dark:text-[#6fb3c6] shrink-0" />
          <span>{text.pageTitle}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mt-1.5 leading-relaxed">
          {text.pageSubtitle}
        </p>
      </div>

      {/* Slide 21 Official Questions Breakdown Cards */}
      <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d9dad5] dark:border-[#2d3942]">
          <HelpCircle className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
          <h2 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
            {text.questionsHeader}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1 */}
          <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#1a2228] border border-blue-200 dark:border-blue-900/50 hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold text-xs sm:text-sm mb-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-xs font-bold shrink-0">۱</span>
              <span>{text.q1Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q1Desc}
            </p>
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-lg bg-[#fcf9f5] dark:bg-[#1a2228] border border-amber-200 dark:border-amber-900/50 hover:border-amber-400 transition-colors">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-xs sm:text-sm mb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-xs font-bold shrink-0">۲</span>
              <span>{text.q2Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q2Desc}
            </p>
          </div>

          {/* Question 3 */}
          <div className="p-4 rounded-lg bg-[#f6fbf8] dark:bg-[#1a2228] border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 transition-colors">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs sm:text-sm mb-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-xs font-bold shrink-0">۳</span>
              <span>{text.q3Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q3Desc}
            </p>
          </div>

          {/* Question 4 */}
          <div className="p-4 rounded-lg bg-[#faf5ff] dark:bg-[#1a2228] border border-purple-200 dark:border-purple-900/50 hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-semibold text-xs sm:text-sm mb-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-xs font-bold shrink-0">۴</span>
              <span>{text.q4Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{text.tabOverview}</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'comparison'
              ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{text.tabComparison}</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#ffffff]/20">
            {comparisonItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('skeptics')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'skeptics'
              ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{text.tabSkeptics}</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#ffffff]/20">
            {skepticItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'examples'
              ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{text.tabExamples}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'checklist'
              ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{text.tabChecklist}</span>
        </button>
      </div>

      {/* Tab 1: Overview & CPMAI Pillars */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>
                {lang === 'fa'
                  ? 'تمایز بنیادین موفقیت در پروژه هوش مصنوعی در برابر پروژه‌های نرم‌افزاری کلاسیک'
                  : 'Fundamental Distinction: AI Success vs Traditional Software Success'}
              </span>
            </h3>

            <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed space-y-3">
              <p>
                {lang === 'fa'
                  ? 'در پروژه‌های نرم‌افزاری متعارف (Deterministic Software)، موفقیت با «انطباق ۱۰۰ درصدی کد با مشخصات فنی و عدم کرش» سنجیده می‌شود: اگر دکمه کار کند، فرم ثبت شود و محاسبات ریاضی بر اساس فرمول‌های قطعی اجرا گردد، سیستم موفق است. اما در متدولوژی CPMAI، پروژه‌های هوش مصنوعی ماهیتی احتمالی (Probabilistic) دارند و موفقیت آنها فراتر از اجرای بدون خطای کد است.'
                  : 'In conventional deterministic software, success is binary compliance: if code executes without crashes and processes forms per fixed specifications, it is successful. In CPMAI, cognitive AI projects are probabilistic. True success requires statistical generalization, handling ambiguity, and provable business lift.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-3.5 rounded-lg bg-[#f0f9ff] dark:bg-[#13232c] border border-blue-200 dark:border-blue-900/40">
                <div className="font-semibold text-xs text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? '۱. تعمیم به داده‌های نادیده' : '1. Statistical Generalization'}</span>
                </div>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'هوش مصنوعی باید روی داده‌های جدید در دنیای واقعی با دقت قابل قبول عمل کند، نه فقط روی داده‌های آموزشی.'
                    : 'The model must maintain predictive rigor on unseen production holdouts, avoiding catastrophic overfitting.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#f0fdf4] dark:bg-[#13261c] border border-emerald-200 dark:border-emerald-900/40">
                <div className="font-semibold text-xs text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? '۲. ارزش افزوده و برتری نسبت به خط پایه' : '2. Provable Lift Over Baseline'}</span>
                </div>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'سیستم AI باید در معیارهای کلیدی تجاری (دقت، سرعت، هزینه، نرخ تبدیل) به وضوح بهتر از روش‌های سنتی قبلی باشد.'
                    : 'AI must demonstrate statistically significant margin gains against existing non-cognitive heuristics.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#faf5ff] dark:bg-[#1f1a2e] border border-purple-200 dark:border-purple-900/40">
                <div className="font-semibold text-xs text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? '۳. ایمنی، تاب‌آوری و کنترل ریسک' : '3. Safety & Fail-Safe HITL'}</span>
                </div>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'سیستم باید نقاط عدم اطمینان خود را بشناسد و موارد پرریسک را بدون وقفه به بازبین‌های انسانی ارجاع دهد.'
                    : 'Calibrated confidence gating prevents silent degradation, routing low-confidence cases to human experts.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI vs Non-AI Comparison Matrix Builder */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'ماتریس تحلیل رودررو: سیستم هوش مصنوعی در برابر رویکردهای غیر AI'
                    : 'AI vs Non-AI Head-to-Head Comparison Matrix'}
                </h3>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                  {lang === 'fa'
                    ? 'تعیین دقیق نقاط تمایز، محدودیت‌های خط پایه سنتی و دلایل برتری هوش مصنوعی در ابعاد گوناگون پروژه'
                    : 'Formulate why non-AI heuristics fail and articulate where cognitive components provide unique advantages.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddComparison}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'افزودن بعد مقایسه' : 'Add Dimension'}</span>
                </button>

                <button
                  onClick={handleInsertMatrixToCanvas}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] text-xs font-medium hover:bg-[#00738c]/10 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'درج ماتریس در بوم' : 'Insert to Canvas'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {comparisonItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] relative group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-5 h-5 rounded-full bg-[#1f5163] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={item.dimension}
                        onChange={(e) => handleUpdateComparison(item.id, 'dimension', e.target.value)}
                        className="w-full text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-[#00738c] focus:outline-none px-1"
                        placeholder="عنوان بعد مقایسه..."
                      />
                    </div>

                    {comparisonItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveComparison(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title={lang === 'fa' ? 'حذف این بعد' : 'Remove dimension'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2">
                    {/* Non-AI baseline */}
                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
                        {lang === 'fa' ? 'رویکرد غیر AI (Non-AI Baseline)' : 'Non-AI Baseline'}
                      </span>
                      <textarea
                        rows={3}
                        value={item.nonAiCapability}
                        onChange={(e) => handleUpdateComparison(item.id, 'nonAiCapability', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 resize-none text-[#5d6b73] dark:text-[#9aa8b0] focus:outline-none"
                      />
                    </div>

                    {/* AI advantage */}
                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-emerald-200 dark:border-emerald-800/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                        {lang === 'fa' ? 'برتری سیستم هوش مصنوعی (AI Advantage)' : 'AI Cognitive Advantage'}
                      </span>
                      <textarea
                        rows={3}
                        value={item.aiAdvantage}
                        onChange={(e) => handleUpdateComparison(item.id, 'aiAdvantage', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 resize-none text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none"
                      />
                    </div>

                    {/* Why non-AI fails */}
                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-amber-200 dark:border-amber-800/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                        {lang === 'fa' ? 'چرا سیستم غیر AI عاجز است؟ (Why Non-AI Fails)' : 'Why Non-AI Fails'}
                      </span>
                      <textarea
                        rows={3}
                        value={item.whyNonAiFails}
                        onChange={(e) => handleUpdateComparison(item.id, 'whyNonAiFails', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 resize-none text-[#5d6b73] dark:text-[#9aa8b0] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Skeptic Mitigation Strategy Builder */}
      {activeTab === 'skeptics' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
                  <span>
                    {lang === 'fa'
                      ? 'اقناع شکاکان تیم: پروتکل اثبات عینی و کاهش ریسک (Satisfying Team Skeptics)'
                      : 'Satisfying Team Skeptics: Empirical Proof & Risk Mitigation Protocols'}
                  </span>
                </h3>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                  {lang === 'fa'
                    ? 'شناسایی دغدغه‌های کلیدی اعضای مردد تیم (ریسک، هزینه، جعبه سیاه بودن) و تدوین استراتژی اثبات تجربی برای جلب اعتماد آنها'
                    : 'Systematically address skeptic concerns through rigorous empirical benchmarks, explainability (XAI), and fail-safe controls.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddSkeptic}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'افزودن دغدغه شکاکان' : 'Add Concern'}</span>
                </button>

                <button
                  onClick={handleInsertSkepticsToCanvas}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] text-xs font-medium hover:bg-[#00738c]/10 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'درج استراتژی در بوم' : 'Insert to Canvas'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {skepticItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={item.concern}
                        onChange={(e) => handleUpdateSkeptic(item.id, 'concern', e.target.value)}
                        className="w-full text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-[#00738c] focus:outline-none px-1"
                        placeholder="دغدغه یا نگرانی اصلی شکاکان..."
                      />
                    </div>

                    {skepticItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveSkeptic(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title={lang === 'fa' ? 'حذف' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2">
                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                        {lang === 'fa' ? 'نقش / ذی‌نفع مردد (Skeptic Persona)' : 'Skeptic Persona'}
                      </span>
                      <input
                        type="text"
                        value={item.skepticPersona}
                        onChange={(e) => handleUpdateSkeptic(item.id, 'skepticPersona', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none"
                      />
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-blue-200 dark:border-blue-800/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                        {lang === 'fa' ? 'روش اثبات تجربی (Proof Method)' : 'Empirical Proof Method'}
                      </span>
                      <textarea
                        rows={2}
                        value={item.proofMethod}
                        onChange={(e) => handleUpdateSkeptic(item.id, 'proofMethod', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 resize-none text-[#5d6b73] dark:text-[#9aa8b0] focus:outline-none"
                      />
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-[#141a20] border border-emerald-200 dark:border-emerald-800/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                        {lang === 'fa' ? 'حد آستانه رضایت (Success Threshold)' : 'Success Acceptance Threshold'}
                      </span>
                      <textarea
                        rows={2}
                        value={item.successThreshold}
                        onChange={(e) => handleUpdateSkeptic(item.id, 'successThreshold', e.target.value)}
                        className="w-full text-xs bg-transparent border-0 resize-none text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Reference Project Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
              <span>
                {lang === 'fa'
                  ? 'نمونه‌های رسمی و استاندارد اسلاید ۲۱ کتاب کار CPMAI'
                  : 'Official CPMAI Slide 21 Reference Implementations'}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* Example 1: Document Intelligence */}
              <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#1a2228] border border-blue-200 dark:border-blue-900/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'پروژه ۱: هوش اسناد و تحلیل قراردادها' : 'Project 1: Document Intelligence'}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      NLP & OCR
                    </span>
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-3">
                    {lang === 'fa'
                      ? 'دسته‌بندی خودکار اسناد با دقت ۹۲٪ و توان ۶۰ سند در ساعت. برتری نسبت به روش سنتی در درک معنایی زبان و استخراج تعهدات از فرمت‌های متنوع بدون افت کیفیت ناشی از خستگی اپراتور.'
                      : 'Classify unstructured contracts with 92% accuracy at 60 docs/hour. Outperforms rigid OCR by understanding semantic ambiguity and complex multi-clause relationships.'}
                  </p>
                </div>
                <button
                  onClick={handleCopyDocExample}
                  className="w-full py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{text.copyDocExample}</span>
                </button>
              </div>

              {/* Example 2: Video Click Prediction */}
              <div className="p-4 rounded-lg bg-[#fcf9f5] dark:bg-[#1a2228] border border-amber-200 dark:border-amber-900/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'پروژه ۲: رتبه‌بندی و پیش‌بینی کلیک ویدیو' : 'Project 2: Video Click Prediction'}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                      Ranking & RecSys
                    </span>
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-3">
                    {lang === 'fa'
                      ? 'پیش‌بینی احتمال کلیک و رتبه‌بندی با افزایش حداقل ۱۲ درصدی CTR نسبت به روش سنتی. ترکیب هم‌زمان صدها ویژگی زمینه‌ای با تاخیر زیر ۴۰ میلی‌ثانیه و حذف انحصار ویدیوهای محبوب.'
                      : 'Predict viewer click probability achieving +12% CTR lift over popularity sorting. Evaluates high-dimensional contextual signals under 40ms SLA without manual heuristic coding.'}
                  </p>
                </div>
                <button
                  onClick={handleCopyVideoExample}
                  className="w-full py-2 px-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{text.copyVideoExample}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Quality Assurance Checklist */}
      {activeTab === 'checklist' && (
        <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2f7d5b]" />
            <span>
              {lang === 'fa'
                ? 'چک‌لیست تطابق کیفی با اسلاید ۲۱ کتاب کار CPMAI'
                : 'Slide 21 CPMAI Quality & Completeness Audit'}
            </span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              hasSuccessCriteria
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-2.5">
                {hasSuccessCriteria ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <span className={hasSuccessCriteria ? 'text-emerald-900 dark:text-emerald-200 font-medium' : 'text-gray-500'}>
                  {lang === 'fa'
                    ? '۱. تعریف صریح معیارهای موفقیت و پیامد مفید هوش مصنوعی (KPI Lift / Accuracy / ROI)'
                    : '1. Explicit definition of measurable AI Success Criteria (KPI Lift, accuracy threshold, ROI)'}
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {hasSuccessCriteria ? '✓ پوشش داده شد' : 'نیازمند تکمیل'}
              </span>
            </div>

            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              hasUniqueAiCapabilities
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-2.5">
                {hasUniqueAiCapabilities ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <span className={hasUniqueAiCapabilities ? 'text-emerald-900 dark:text-emerald-200 font-medium' : 'text-gray-500'}>
                  {lang === 'fa'
                    ? '۲. تبیین قابلیت‌های منحصربه‌فرد AI که سیستم غیر AI عاجز از انجام آن است'
                    : '2. Articulation of unique cognitive capabilities non-AI systems cannot execute'}
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {hasUniqueAiCapabilities ? '✓ پوشش داده شد' : 'نیازمند تکمیل'}
              </span>
            </div>

            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              hasSuperiorityDimensions
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-2.5">
                {hasSuperiorityDimensions ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <span className={hasSuperiorityDimensions ? 'text-emerald-900 dark:text-emerald-200 font-medium' : 'text-gray-500'}>
                  {lang === 'fa'
                    ? '۳. تشریح وجوه برتری سیستم هوش مصنوعی نسبت به سیستم غیر AI (سرعت، مقیاس، ثبات، هزینه نهایی)'
                    : '3. Enumeration of superiority dimensions over non-AI (throughput, zero fatigue, cost)'}
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {hasSuperiorityDimensions ? '✓ پوشش داده شد' : 'نیازمند تکمیل'}
              </span>
            </div>

            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              hasSkepticStrategy
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-2.5">
                {hasSkepticStrategy ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <span className={hasSkepticStrategy ? 'text-emerald-900 dark:text-emerald-200 font-medium' : 'text-gray-500'}>
                  {lang === 'fa'
                    ? '۴. تدوین استراتژی اثبات تجربی برای اقناع شکاکان تیم (A/B Test، XAI، انسان در حلقه)'
                    : '4. Strategy to satisfy team skeptics via empirical benchmarking, XAI, and HITL'}
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {hasSkepticStrategy ? '✓ پوشش داده شد' : 'نیازمند تکمیل'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas Card */}
      <div className="bg-[#ffffff] dark:bg-[#161c22] rounded-xl p-5 sm:p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
            <h2 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.canvasHeader}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{text.copyTemplate}</span>
            </button>

            <button
              onClick={handleCopyCanvas}
              disabled={!content}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                copied
                  ? 'border-emerald-600 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20'
                  : 'border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? text.copiedText : (lang === 'fa' ? 'کپی متن' : 'Copy')}</span>
            </button>

            <button
              onClick={() => onChangeContent('')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              title={text.clearBtn}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{text.clearBtn}</span>
            </button>
          </div>
        </div>

        {/* Real-time Validation Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap text-[11px]">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <span>{lang === 'fa' ? 'تعداد کلمات:' : 'Word count:'}</span>
            <span className="font-mono font-bold">{content.trim() ? content.trim().split(/\s+/).length : 0}</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <span>{lang === 'fa' ? 'کاراکتر:' : 'Characters:'}</span>
            <span className="font-mono font-bold">{content.length}</span>
          </div>

          <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
            hasSuccessCriteria && hasUniqueAiCapabilities && hasSuperiorityDimensions && hasSkepticStrategy
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            <span>
              {hasSuccessCriteria && hasUniqueAiCapabilities && hasSuperiorityDimensions && hasSkepticStrategy
                ? (lang === 'fa' ? 'تکمیل کامل ۴ پرسش اسلاید ۲۱' : 'All 4 Slide 21 Questions Addressed')
                : (lang === 'fa' ? 'در حال تکمیل بخش‌های اسلاید ۲۱' : 'Slide 21 In Progress')}
            </span>
          </div>
        </div>

        <textarea
          rows={16}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder={text.canvasPlaceholder}
          className="w-full font-mono text-xs p-4 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c] leading-relaxed transition-all resize-y"
        />

        {/* Footer Disclaimer */}
        <div className="mt-4 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 flex flex-wrap items-center justify-between text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] gap-2">
          <span>{text.pmiCopyright}</span>
          <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">Slide 21</span>
        </div>
      </div>

      {/* Navigation Footer (Back to Page 10 / Slide 20 & Next to Page 12 / Slide 22) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage10}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: صفحه ۱۰ (اسلاید ۲۰: نتایج شناختی)'
              : 'Previous: Page 10 (Slide 20: Cognitive Outcomes)'}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
            <span>
              {lang === 'fa'
                ? 'تکمیل بخش معیارهای موفقیت هوش مصنوعی (اسلاید ۲۱)'
                : 'Slide 21 AI Success Criteria Completed'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f7d5b]" />
          </div>

          {onGoToPage12 && (
            <button
              onClick={onGoToPage12}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-medium hover:bg-[#005f73] transition-colors shadow-xs"
            >
              <span>
                {lang === 'fa'
                  ? 'صفحه بعدی: صفحه ۱۲ (اسلاید ۲۲: الگوهای هوش مصنوعی)'
                  : 'Next: Page 12 (Slide 22: AI Patterns)'}
              </span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
