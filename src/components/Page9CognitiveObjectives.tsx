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
  Cpu,
  Layers,
  Database,
  Workflow,
  Sliders,
  Plus,
  Trash2,
  BarChart3,
  Boxes,
  Shield,
  Zap,
  Split,
  Eye,
  Film
} from 'lucide-react';

interface Page9Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage8: () => void;
  onGoToPage10: () => void;
}

interface CognitiveObjectiveItem {
  id: string;
  title: string;
  pattern: string;
  taskDesc: string;
  inputs: string;
  outputs: string;
  downstreamAction: string;
  targetMetric: string;
  boundary: string;
}

export const Page9CognitiveObjectives: React.FC<Page9Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage8,
  onGoToPage10
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'objectives' | 'noncogTech'>('objectives');

  // Interactive Cognitive Objectives list
  const [objectives, setObjectives] = useState<CognitiveObjectiveItem[]>([
    {
      id: '1',
      title:
        lang === 'fa'
          ? 'پیش‌بینی احتمال کلیک کاربر روی ویدیوها جهت مرتب‌سازی بهینه لیست پیشنهادات'
          : 'Predicting video clicks to enable sorting by predicted total clicks',
      pattern: 'Predictive Analytics',
      taskDesc:
        lang === 'fa'
          ? 'محاسبه امتیاز احتمال کلیک (CTR) به ازای هر جفت کاربر-ویدیو و پیش‌بینی مجموع کلیک‌های مورد انتظار در نشست فعلی کاربر.'
          : 'Calculate Click-Through Rate (CTR) probability per user-video pair and estimate total expected clicks in current user session.',
      inputs:
        lang === 'fa'
          ? 'تاریخچه تماشا، ویدیوهای پسندیده‌شده در ۳۰ روز گذشته، برچسب‌ها و ژانر ویدیو، زمان روز، نوع دستگاه، و مدت زمان حضور در صفحه.'
          : 'Watch history, 30-day likes, video metadata tags/genre, time of day, client device category, and dwell time.',
      outputs:
        lang === 'fa'
          ? 'امتیاز پیوسته احتمال کلیک بین ۰.۰۰ تا ۱.۰۰ (Probability Score) به همراه بردار رتبه‌بندی ویدیوهای منتخب.'
          : 'Continuous probability score [0.00 - 1.00] and ranked permutation array of candidate video IDs.',
      downstreamAction:
        lang === 'fa'
          ? 'سرویس لایه نمایش، ویدیوها را براساس بیشترین کلیک پیش‌بینی‌شده در ردیف اول صفحه اصلی نمایش می‌دهد تا تعامل کاربر حداکثر شود.'
          : 'Presentation API dynamically sorts video tiles by highest predicted clicks in the primary homepage carousel to maximize engagement.',
      targetMetric:
        lang === 'fa'
          ? 'AUC-ROC >= 0.84، تاخیر پاسخ‌دهی کمتر از ۴۵ میلی‌ثانیه در صدک ۹۹، و حداقل ۱۰٪ افزایش در نرخ کلیک واقعی نسبت به هیوریستیک ۱۰ فیلم برتر.'
          : 'AUC-ROC >= 0.84, p99 inference latency < 45ms, and >= +10% lift in actual CTR over heuristic Top-10 baseline.',
      boundary:
        lang === 'fa'
          ? 'در این تکرار، تحلیل چندرسانه‌ای فریم‌های داخل ویدیو یا صوت انجام نمی‌شود و فقط متادیتای آماری و رفتار کاربر ملاک است.'
          : 'Out of scope for this iteration: raw video frame vision analysis or speech audio processing; metadata & behavioral clickstream only.'
    }
  ]);

  // Noncognitive components state
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'ui',
    'api',
    'db',
    'rules',
    'hitl',
    'auth'
  ]);
  const [uiDetails, setUiDetails] = useState('');
  const [apiDetails, setApiDetails] = useState('');
  const [dbDetails, setDbDetails] = useState('');
  const [rulesDetails, setRulesDetails] = useState('');
  const [hitlDetails, setHitlDetails] = useState('');
  const [authDetails, setAuthDetails] = useState('');

  const toggleComponent = (id: string) => {
    setSelectedComponents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddObjective = () => {
    const newObj: CognitiveObjectiveItem = {
      id: Date.now().toString(),
      title: lang === 'fa' ? 'هدف شناختی جدید' : 'New Cognitive Objective',
      pattern: 'Predictive Analytics',
      taskDesc: '',
      inputs: '',
      outputs: '',
      downstreamAction: '',
      targetMetric: '',
      boundary: ''
    };
    setObjectives((prev) => [...prev, newObj]);
  };

  const handleRemoveObjective = (id: string) => {
    if (objectives.length <= 1) return;
    setObjectives((prev) => prev.filter((o) => o.id !== id));
  };

  const handleUpdateObjective = (id: string, field: keyof CognitiveObjectiveItem, val: string) => {
    setObjectives((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  };

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 9 of 9 (Slide 19: Cognitive Objectives)',
      taskGroupTitle: 'Task Group: Cognitive Project Requirements',
      taskTitle: 'Task: Cognitive Requirements',
      slidePrompt: 'Cognitive objectives: Enumerate the specific objectives',
      slideSubtitle:
        'Specify the tangible cognitive capabilities and learning tasks the AI model must accomplish to satisfy the business objectives. Clarify inputs, expected outputs, consumption actions, and quantitative target metrics.',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      tabObjectives: '1. Enumerate Cognitive Objectives (Slide 19 Focus)',
      tabNoncogTech: '2. Supporting Noncognitive Tech & Ecosystem',
      coreInstructionTitle: 'CPMAI Definition & Core Requirements for Slide 19:',
      coreInstructionText:
        'A cognitive objective must represent an explicit, tangible capability performed by machine intelligence — such as "predicting video clicks to enable sorting by predicted total clicks" — rather than an abstract business aspiration. In CPMAI methodology, each cognitive objective must specify: (1) Cognitive task & AI pattern, (2) Input data requirements, (3) Expected prediction/output format, (4) How the output drives business decision-making, (5) Measurable accuracy/latency thresholds, and (6) Boundaries & non-goals for this iteration.',
      templateBtn: 'Insert Official CPMAI Template',
      exampleVideoBtn: 'Example 1: Video Click Prediction (CPMAI Official)',
      exampleFraudBtn: 'Example 2: Transaction Fraud & Anomaly Scoring',
      exampleChurnBtn: 'Example 3: Churn Risk & Next-Best-Action',
      exampleMedicalBtn: 'Example 4: Medical Imaging Triage',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      canvasPlaceholder:
        'Task Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive objectives: Enumerate the specific objectives\n\n1. Cognitive Objective 1: Predicting video clicks to enable sorting by predicted total clicks\n   - Cognitive Capability & AI Pattern: Predictive Analytics / CTR probability estimation\n   - Input Data: Watch history, genre affinity, session context, time of day\n   - Expected Output: Calibrated CTR score [0.0 - 1.0] per candidate video\n   - Downstream Consumption: Dynamic sorting of carousel tiles to maximize viewer engagement\n   - Performance Target: AUC-ROC >= 0.84, Latency < 50ms, +10% lift over Top-10 heuristic\n   - Boundaries & Scope: Metadata & clickstream only; no deep video frame vision in iteration 1\n\n2. Cognitive Objective 2: ...',
      prevPageBtn: 'Previous: Noncognitive Portions & Automation Alternatives (Page 8 / Slide 18)',
      builderTitle: 'Interactive Cognitive Objectives Builder',
      builderSub:
        'Define and enumerate each distinct cognitive capability. Then click "Generate to Canvas" to format your official Slide 19 deliverable.',
      addObjectiveBtn: 'Add Another Cognitive Objective',
      generateToCanvasBtn: 'Generate Formatted Objectives to Canvas',
      objNumber: 'Cognitive Objective #',
      objTitleLabel: 'Objective Title & Concrete Goal',
      patternLabel: 'Pattern of AI (CPMAI 7 Patterns)',
      taskDescLabel: 'Specific Cognitive Task & Capability',
      inputsLabel: 'Required Input Data & Features',
      outputsLabel: 'Expected Output, Predictions or Classifications',
      downstreamLabel: 'How Output is Consumed & Business Value Impact',
      metricsLabel: 'Quantitative Acceptance Metric & Threshold',
      boundaryLabel: 'Scope Limits & Non-Goals for this Iteration',
      sevenPatternsGuideTitle: 'CPMAI 7 Patterns of AI Reference:',
      pattern1: '1. Hyperpersonalization (tailoring content/experience to individual users)',
      pattern2: '2. Recognition (identifying objects, images, audio, handwriting)',
      pattern3: '3. Conversation & Human Interaction (chatbots, NLP, intent understanding)',
      pattern4: '4. Predictive Analytics (forecasting future values, trends, probabilities)',
      pattern5: '5. Autonomous Systems (vehicles, self-directed bots, automated routing)',
      pattern6: '6. Goal-Driven Systems (reinforcement learning, game play, combinatorial bidding)',
      pattern7: '7. Patterns & Anomalies (fraud detection, outlier identification, fault isolation)',
      noncogSectionTitle: 'Supporting Noncognitive Technologies in Conjunction',
      noncogSectionDesc:
        'Detail the supporting noncognitive ecosystem operating alongside the AI solution (Presentation UI, APIs, Databases, Rule Guardrails, Human-in-the-Loop review, and Security).'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۹ از ۹ (اسلاید ۱۹: اهداف شناختی پروژه)',
      taskGroupTitle: 'گروه وظایف: الزامات پروژه‌های شناختی (Task Group: Cognitive Project Requirements)',
      taskTitle: 'وظیفه: الزامات شناختی (Task: Cognitive Requirements)',
      slidePrompt: 'اهداف شناختی: شمارش و تعیین دقیق اهداف شناختی (Cognitive objectives: Enumerate the specific objectives)',
      slideSubtitle:
        'شمارش و تشریح دقیق قابلیت‌های شناختی و وظایف یادگیری ماشینی که مدل هوش مصنوعی برای محقق‌سازی اهداف کسب‌وکار باید به ثمر برساند؛ شامل داده‌های ورودی، ساختار خروجی، نحوه مصرف در فرآیند تجاری و شاخص‌های کمی عملکرد.',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      tabObjectives: '۱. شمارش اهداف شناختی (تمرکز اصلی اسلاید ۱۹)',
      tabNoncogTech: '۲. فناوری‌های غیرشناختی مکمل و زیست‌بوم معماری',
      coreInstructionTitle: 'تعریف رسمی و الزامات کلیدی اسلاید ۱۹ در متدولوژی CPMAI:',
      coreInstructionText:
        'یک هدف شناختی باید معرف یک توانمندی ملموس و عملیاتی اجراشده توسط هوش ماشینی باشد — نظیر «پیش‌بینی میزان کلیک روی ویدیو جهت مرتب‌سازی لیست بر اساس مجموع کلیک‌های پیش‌بینی‌شده» — نه صرفاً یک آرزوی کلی کسب‌وکاری. در متدولوژی رسمی CPMAI، هر هدف شناختی باید ۶ مؤلفه زیر را صراحتاً مستند کند: (۱) توانمندی شناختی و الگوی هوش مصنوعی، (۲) داده‌های ورودی مورد نیاز، (۳) ساختار خروجی یا پیش‌بینی، (۴) نحوه مصرف خروجی و تصمیم‌گیری تجاری، (۵) معیارهای کمی عملکرد و تاخیر، و (۶) مرزها و مواردی که عمداً در این تکرار خارج از محدوده هستند.',
      templateBtn: 'درج قالب استاندارد CPMAI',
      exampleVideoBtn: 'نمونه ۱: پیش‌بینی کلیک ویدیو (مثال رسمی CPMAI)',
      exampleFraudBtn: 'نمونه ۲: کشف تقلب و ناهنجاری تراکنش‌های مالی',
      exampleChurnBtn: 'نمونه ۳: پیش‌بینی ریسک ریزش و پیشنهاد بهینه',
      exampleMedicalBtn: 'نمونه ۴: تریاژ و اولویت‌بندی تصاویر پزشکی',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی محتوای بوم',
      copiedToast: 'متن در حافظه کپی شد!',
      wordCount: 'کلمه',
      charCount: 'کاراکتر',
      canvasPlaceholder:
        'گروه وظایف: الزامات پروژه‌های شناختی (Task Group: Cognitive Project Requirements)\nوظیفه: الزامات شناختی (Task: Cognitive Requirements)\nاهداف شناختی: شمارش و تعیین دقیق اهداف شناختی (Cognitive objectives: Enumerate the specific objectives)\n\n۱. هدف شناختی اول: پیش‌بینی کلیک ویدیوها جهت امکان مرتب‌سازی لیست پیشنهادات بر پایه مجموع کلیک‌های پیش‌بینی‌شده\n   - توانمندی شناختی و الگوی هوش مصنوعی: تحلیل پیش‌بینانه (Predictive Analytics) / تخمین احتمال کلیک (CTR)\n   - داده‌های ورودی: تاریخچه تماشای کاربر، علاقه‌مندی به ژانرها، زمینه نشست و زمان روز\n   - خروجی مورد انتظار: امتیاز کالیبره‌شده احتمال کلیک [۰.۰ تا ۱.۰] به ازای هر ویدیو کاندید\n   - نحوه مصرف در کسب‌وکار: مرتب‌سازی آنی ردیف اول صفحه اصلی برای بیشینه‌سازی زمان مشاهده کاربر\n   - معیارهای کمی موفقیت: شاخص AUC-ROC >= 0.84، تاخیر کمتر از ۵۰ میلی‌ثانیه، و ۱۰٪+ بهبود CTR نسبت به هیوریستیک ۱۰ فیلم برتر\n   - مرزها و موارد خارج از محدوده: فقط متادیتا و لاگ رفتار کلیک؛ پردازش بینایی فریم‌های ویدیو در این تکرار اجرا نمی‌شود.\n\n۲. هدف شناختی دوم: ...',
      prevPageBtn: 'قبلی: بخش‌های غیرشناختی و اتوماسیون (صفحه ۸ / اسلاید ۱۸)',
      builderTitle: 'سازنده تعاملی اهداف شناختی پروژه (Cognitive Objectives Builder)',
      builderSub:
        'هر یک از توانمندی‌های شناختی و وظایف هوش مصنوعی را تفکیک و تنظیم کنید، سپس روی «تولید و انتقال به بوم» کلیک نمایید تا خروجی رسمی اسلاید ۱۹ تولید شود.',
      addObjectiveBtn: 'افزودن هدف شناختی جدید',
      generateToCanvasBtn: 'تولید و انتقال ساختاریافته اهداف به بوم',
      objNumber: 'هدف شناختی شماره ',
      objTitleLabel: 'عنوان و تعریف هدف شناختی ملموس',
      patternLabel: 'الگوی هوش مصنوعی (از میان الگوهای ۷‌گانه CPMAI)',
      taskDescLabel: 'توانمندی شناختی مشخص و ماهیت وظیفه یادگیری',
      inputsLabel: 'داده‌ها و ویژگی‌های ورودی مورد نیاز (Input Features)',
      outputsLabel: 'خروجی مورد انتظار، کلاس‌بندی یا پیش‌بینی (Expected Output)',
      downstreamLabel: 'نحوه مصرف خروجی و ارزش‌آفرینی در فرآیند کسب‌وکار',
      metricsLabel: 'معیار پذیرش کمی و آستانه عملکرد (Accuracy / Latency)',
      boundaryLabel: 'مرزهای تکرار و اهداف خارج از محدوده (Iteration Non-Goals)',
      sevenPatternsGuideTitle: 'راهنمای الگوهای هفت‌گانه هوش مصنوعی در CPMAI:',
      pattern1: '۱. شخصی‌سازی فراگیر (Hyperpersonalization): متناسب‌سازی تجربه برای هر کاربر خاص',
      pattern2: '۲. شناسایی و تشخیص (Recognition): تشخیص الگو در تصویر، صوت، حسگرها یا متن',
      pattern3: '۳. تعامل و مکالمه (Conversation): چت‌بات‌ها، پردازش زبان طبیعی و فهم نیت کاربر',
      pattern4: '۴. تحلیل پیش‌بینانه (Predictive Analytics): پیش‌بینی روندهای آینده، مقادیر عددی یا احتمالات',
      pattern5: '۵. سیستم‌های خودمختار (Autonomous Systems): مسیریابی و کنترل مستقل بدون دخالت انسان',
      pattern6: '۶. سیستم‌های هدف‌محور (Goal-Driven Systems): یادگیری تقویتی و بهینه‌سازی برد در بازی‌ها و مزایده‌ها',
      pattern7: '۷. الگوها و ناهنجاری‌ها (Patterns & Anomalies): کشف تقلب مالی، عیب‌یابی تجهیزات و داده‌های پرت',
      noncogSectionTitle: 'فناوری‌های غیرشناختی مکمل در کنار راه‌حل شناختی',
      noncogSectionDesc:
        'تعیین زیست‌بوم نرم‌افزاری شامل رابط کاربری، وب‌سرویس‌ها، پایگاه داده، موتور قواعد قطعی و داشبورد نظارت انسانی (HITL).'
    }
  };

  const text = t[lang];

  // Word and character counters
  const trimmed = content.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = content.length;

  const handleCopy = () => {
    if (!navigator.clipboard || !content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Generate formatted cognitive objectives to canvas
  const handleGenerateToCanvas = () => {
    let out = '';
    if (lang === 'fa') {
      out += `=== کاربرگ اسلاید ۱۹ کتاب کار رسمی CPMAI (فاز اول: درک کسب‌وکار) ===\n`;
      out += `گروه وظایف: الزامات پروژه‌های شناختی (Task Group: Cognitive Project Requirements)\n`;
      out += `وظیفه: الزامات شناختی (Task: Cognitive Requirements)\n`;
      out += `موضوع اسلاید ۱۹: اهداف شناختی: شمارش و تعیین دقیق اهداف شناختی\n`;
      out += `(Cognitive objectives: Enumerate the specific objectives)\n`;
      out += `تاریخ ثبت: ${new Date().toLocaleDateString('fa-IR')} | استاندارد رسمی متدولوژی CPMAI\n\n`;

      out += `------------------------------------------------------------\n`;
      out += `فهرست تفصیلی اهداف شناختی مدلسازی‌شده در این تکرار پروژه:\n`;
      out += `------------------------------------------------------------\n\n`;

      objectives.forEach((obj, idx) => {
        out += `هدف شناختی ${idx + 1}: ${obj.title || 'بدون عنوان'}\n`;
        out += `  • الگوی هوش مصنوعی (CPMAI Pattern): ${obj.pattern}\n`;
        out += `  • شرح توانمندی شناختی: ${obj.taskDesc || 'تعریف‌نشده'}\n`;
        out += `  • داده‌ها و ورودی‌های مورد نیاز: ${obj.inputs || 'تعریف‌نشده'}\n`;
        out += `  • ساختار خروجی و پیش‌بینی مدل: ${obj.outputs || 'تعریف‌نشده'}\n`;
        out += `  • نحوه مصرف در فرآیند کسب‌وکار و تصمیم‌گیری: ${obj.downstreamAction || 'تعریف‌نشده'}\n`;
        out += `  • معیارهای کمی پذیرش و آستانه عملکرد: ${obj.targetMetric || 'تعریف‌نشده'}\n`;
        out += `  • مرزهای تکرار و موارد خارج از محدوده (Non-Goals): ${obj.boundary || 'تعریف‌نشده'}\n\n`;
      });

      if (activeTab === 'noncogTech' || selectedComponents.length > 0) {
        out += `------------------------------------------------------------\n`;
        out += `فناوری‌های غیرشناختی مکمل در کنار راه‌حل شناختی (Noncognitive Ecosystem):\n`;
        out += `------------------------------------------------------------\n`;
        if (selectedComponents.includes('ui')) out += `۱. رابط کاربری (UI): ${uiDetails || 'داشبورد وب واکنش‌گرا و اپلیکیشن موبایل جهت نمایش نتایج به کاربران'}\n`;
        if (selectedComponents.includes('api')) out += `۲. وب‌سرویس‌ها (APIs): ${apiDetails || 'اندپوینت‌های میکروسرویس RESTful / FastAPI با زمان پاسخ کمتر از ۵۰ میلی‌ثانیه'}\n`;
        if (selectedComponents.includes('db')) out += `۳. پایگاه داده (Databases): ${dbDetails || 'پایگاه رابطه‌ای PostgreSQL و کش Redis برای رتبه‌بندی فوق‌سریع'}\n`;
        if (selectedComponents.includes('rules')) out += `۴. موتور قواعد قطعی (Rules): ${rulesDetails || 'گاردریل‌های قطعی فیلتر محتوای نامناسب و اعتبارسنجی قوانین تجاری صلب'}\n`;
        if (selectedComponents.includes('hitl')) out += `۵. بازبینی انسانی (HITL): ${hitlDetails || 'داشبورد کارشناسی جهت رسیدگی به موارد کم‌اطمینان یا اعتراضات کاربران'}\n`;
        if (selectedComponents.includes('auth')) out += `۶. امنیت و حاکمیت (Security): ${authDetails || 'پروتکل احراز هویت OAuth 2.0، مجوزدهی RBAC و ثبت ردپای حسابرسی'}\n`;
      }
    } else {
      out += `=== CPMAI Slide 19 Deliverable (Phase I: Business Understanding) ===\n`;
      out += `Task Group: Cognitive Project Requirements\n`;
      out += `Task: Cognitive Requirements\n`;
      out += `Topic: Cognitive objectives: Enumerate the specific objectives\n`;
      out += `Timestamp: ${new Date().toISOString()} | Official CPMAI Standard\n\n`;

      out += `------------------------------------------------------------\n`;
      out += `Enumerated Cognitive Objectives for this Iteration:\n`;
      out += `------------------------------------------------------------\n\n`;

      objectives.forEach((obj, idx) => {
        out += `Cognitive Objective ${idx + 1}: ${obj.title || 'Untitled'}\n`;
        out += `  • AI Pattern: ${obj.pattern}\n`;
        out += `  • Cognitive Capability & Task: ${obj.taskDesc || 'N/A'}\n`;
        out += `  • Input Features & Data Sources: ${obj.inputs || 'N/A'}\n`;
        out += `  • Expected Output / Prediction Format: ${obj.outputs || 'N/A'}\n`;
        out += `  • Downstream Consumption & Business Action: ${obj.downstreamAction || 'N/A'}\n`;
        out += `  • Quantitative Target Metric & Threshold: ${obj.targetMetric || 'N/A'}\n`;
        out += `  • Iteration Boundaries & Non-Goals: ${obj.boundary || 'N/A'}\n\n`;
      });
    }

    onChangeContent(out);
  };

  // Insert standard template
  const handleInsertTemplate = () => {
    if (lang === 'fa') {
      const tmpl = `=== کاربرگ اسلاید ۱۹ کتاب کار رسمی CPMAI (فاز اول: درک کسب‌وکار) ===
گروه وظایف: الزامات پروژه‌های شناختی (Task Group: Cognitive Project Requirements)
وظیفه: الزامات شناختی (Task: Cognitive Requirements)
موضوع اسلاید ۱۹: اهداف شناختی: شمارش و تعیین دقیق اهداف شناختی (Cognitive objectives: Enumerate the specific objectives)
مرجع دوره: © 2025 Project Management Institute, Inc. All rights reserved.

--------------------------------------------------------------------------------
شمارش اهداف شناختی پروژه (Enumerated Cognitive Objectives):
--------------------------------------------------------------------------------

هدف شناختی ۱: پیش‌بینی احتمال کلیک روی ویدیوها جهت امکان مرتب‌سازی براساس مجموع کلیک‌های پیش‌بینی‌شده
(Predicting video clicks to enable sorting by predicted total clicks)
• الگوی هوش مصنوعی (AI Pattern): تحلیل پیش‌بینانه (Predictive Analytics) و شخصی‌سازی (Hyperpersonalization)
• توانمندی شناختی مشخص: محاسبه پیوسته احتمال کلیک (CTR Score) به ازای هر کاربر و هر محتوای ویدیویی کاندید در نشست جاری.
• داده‌ها و ویژگی‌های ورودی:
  ۱. تاریخچه ۵۰ ویدیوی اخیر تماشا شده توسط کاربر و مدت زمان مشاهده (Dwell Time)
  ۲. متادیتای ویدیو: دسته‌بندی موضوعی، طول ویدیو، سال انتشار، نرخ لایک تاریخی
  ۳. زمینه نشست جاری: زمان روز، نوع دستگاه (موبایل/تلویزیون)، کیفیت اتصال اینترنت
• خروجی مورد انتظار مدل: بردار امتیاز احتمال کلیک [۰.۰۰ تا ۱.۰۰] برای ۱۰۰ ویدیوی برتر نامزد.
• نحوه مصرف خروجی و اقدام تجاری: وب‌سرویس فرانت‌اند ردیف اول صفحه اصلی اپلیکیشن را بر اساس بالاترین امتیازهای کلیک مرتب می‌کند تا زمان تماشای کاربر بیشینه گردد.
• معیارهای کمی موفقیت و پذیرش:
  - شاخص دقت آماری: AUC-ROC >= 0.84 بر روی داده‌های آزمون مجزا
  - عملکرد زیرساختی: زمان استنتاج p99 زیر ۴۰ میلی‌ثانیه برای ۱۰۰ آیتم
  - اثر تجاری مورد سنجش در تست A/B: حداقل ۱۲٪ افزایش در نرخ کلیک و ۷٪ افزایش در دقایق مشاهده کاربر در مقایسه با روش قبلی (لیست ۱۰ فیلم پربازدید هفته).
• مرزها و موارد خارج از محدوده (Non-Goals):
  - در این تکرار اسپرینت، پردازش محتوای بینایی فریم‌های داخل ویدیو یا صوت انجام نمی‌شود.
  - پیش‌بینی بازخورد منفی (Skip / Dislike) به تکرار بعدی موکول شده است.

--------------------------------------------------------------------------------
هدف شناختی ۲: دسته‌بندی آنی تراکنش‌های مشکوک به پولشویی و کلاهبرداری
• الگوی هوش مصنوعی: کشف الگوها و ناهنجاری‌ها (Patterns & Anomalies)
• توانمندی شناختی: سنجش میزان انحراف الگوی تراکنش مالی از رفتار نرمال کاربر و انتساب امتیاز ریسک تقلب [۰ تا ۱۰۰].
• داده‌های ورودی: مبلغ تراکنش، موقعیت مکانی IP و GPS، فاصله زمانی با آخرین تراکنش، نوع درگاه پذیرنده.
• خروجی مدل: امتیاز خطر تقلب به همراه دلایل کلیدی ناهنجاری (Feature Attribution).
• نحوه مصرف: اگر امتیاز بالای ۸۵ باشد تراکنش در کمتر از ۲۰۰ میلی‌ثانیه مسدود و به اپراتور امنیتی ارجاع می‌شود؛ اگر بین ۵۰ تا ۸۵ باشد پیامک تایید هویت دو مرحله‌ای ارسال می‌گردد.
• معیار پذیرش: دقت شناسایی (Precision) بالای ۹۲٪ با نرخ هشدار کاذب (FPR) زیر ۰.۸٪.
• مرزهای تکرار: بررسی تراکنش‌های بین‌المللی ارزی در این فاز پوشش داده نمی‌شود.`;
      onChangeContent(tmpl);
    } else {
      const tmpl = `=== CPMAI Slide 19 Deliverable (Phase I: Business Understanding) ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Slide 19: Cognitive objectives: Enumerate the specific objectives
Course Material: © 2025 Project Management Institute, Inc. All rights reserved.

--------------------------------------------------------------------------------
Enumerated Cognitive Objectives:
--------------------------------------------------------------------------------

Cognitive Objective 1: Predicting video clicks to enable sorting by predicted total clicks
• AI Pattern: Predictive Analytics / Hyperpersonalization
• Specific Cognitive Capability: Calibrated Click-Through Rate (CTR) estimation and predicted total clicks per user session.
• Input Features & Data Sources:
  1. User past 30-day watch history, completion rates, and like signals
  2. Candidate video metadata: tags, duration, age, historical popularity
  3. Contextual session signals: time of day, device category, geography
• Expected Output: Continuous probability vector [0.00 to 1.00] across candidate catalogue.
• Downstream Consumption & Business Action:
  Presentation API re-orders carousel tiles so high-probability videos appear first, directly driving viewer session watch time.
• Quantitative Success Metric & Acceptance Threshold:
  - Model offline accuracy: AUC-ROC >= 0.84, PR-AUC >= 0.62
  - Serving latency: p99 inference < 40ms under 10,000 QPS load
  - Online business target: >= +12% lift in actual CTR and +8% watch hours vs top-10 heuristic baseline.
• Iteration Boundaries & Non-Goals:
  - Deep vision frame analysis and audio sentiment are excluded from iteration 1 (metadata & interaction logs only).

--------------------------------------------------------------------------------
Cognitive Objective 2: Real-time Transaction Fraud Scoring & Anomaly Detection
• AI Pattern: Patterns & Anomalies
• Specific Cognitive Capability: Multi-dimensional anomaly scoring against expected user baseline behavior.
• Input Features: Transaction amount, IP velocity, geo-distance velocity, merchant category code.
• Expected Output: Calibrated risk probability score [0 to 100] and top 3 risk anomaly factors.
• Downstream Consumption: Real-time payment gateway triggers immediate step-up authentication or hold.
• Acceptance Threshold: Precision >= 92% at Recall >= 88%, False Positive Rate < 0.8%.
• Boundaries: Cross-border FX wire transfers excluded in this sprint iteration.`;
      onChangeContent(tmpl);
    }
  };

  // Case Study 1: Video Click Prediction (CPMAI Official Example)
  const handleLoadVideoCase = () => {
    setObjectives([
      {
        id: '1',
        title:
          lang === 'fa'
            ? 'پیش‌بینی احتمال کلیک کاربر روی ویدیوها جهت مرتب‌سازی لیست بر اساس مجموع کلیک‌های پیش‌بینی‌شده'
            : 'Predicting video clicks to enable sorting by predicted total clicks',
        pattern: 'Predictive Analytics',
        taskDesc:
          lang === 'fa'
            ? 'تخمین احتمال کلیک (CTR) به ازای هر جفت کاربر-ویدیو و پیش‌بینی تعداد تماشای کامل در نشست جاری.'
            : 'Estimate Click-Through Rate (CTR) probability per user-video pair and forecast completion likelihood in session.',
        inputs:
          lang === 'fa'
            ? 'تاریخچه ۳۰ ویدیوی اخیر، برچسب‌ها، ژانر، مدت زمان، ساعت مشاهده و نوع دستگاه کاربر.'
            : 'Recent 30 videos watched, content genre tags, duration, time of day, and client platform.',
        outputs:
          lang === 'fa'
            ? 'بردار امتیاز احتمال کلیک [۰.۰۰ تا ۱.۰۰] به همراه ترتیب مرتب‌شده ۱۰۰ ویدیوی کاندید.'
            : 'Continuous probability score [0.00 - 1.00] and ranked permutation array of candidate video IDs.',
        downstreamAction:
          lang === 'fa'
            ? 'سرویس لایه وب، ویدیوها را بر اساس بالاترین امتیاز کلیک پیش‌بینی‌شده در ردیف نخست اپلیکیشن نمایش می‌دهد.'
            : 'Presentation API dynamically sorts video tiles by highest predicted clicks in the primary carousel.',
        targetMetric:
          lang === 'fa'
            ? 'شاخص AUC-ROC >= 0.84، تاخیر زیر ۴۵ میلی‌ثانیه و حداقل ۱۰٪ افزایش در کلیک واقعی نسبت به روش هیوریستیک ۱۰ فیلم برتر.'
            : 'AUC-ROC >= 0.84, serving latency < 45ms, and >= +10% lift in CTR over heuristic top-10 baseline.',
        boundary:
          lang === 'fa'
            ? 'در این تکرار، تحلیل ویدیو و صدا انجام نمی‌شود و تنها متادیتا و لاگ‌های کلیک مدنظر است.'
            : 'Iteration 1 excludes raw video frame vision analysis; metadata and interaction logs only.'
      },
      {
        id: '2',
        title:
          lang === 'fa'
            ? 'پیش‌بینی میزان ریزش کاربر از تماشای ویدیو در ۶۰ ثانیه اول (Early Abandonment)'
            : 'Predicting early viewer abandonment within the first 60 seconds',
        pattern: 'Patterns & Anomalies',
        taskDesc:
          lang === 'fa'
            ? 'تشخیص زودهنگام عدم تمایل کاربر به محتوای انتخابی جهت جایگزینی هوشمندانه تریلر و پیشنهادات مرتبط.'
            : 'Detect early loss of viewer engagement to dynamically adjust thumbnail previews and fallback picks.',
        inputs:
          lang === 'fa'
            ? 'نرخ توقف/پرش تاریخی ویدیوها، کیفیت اتصال شبکه کاربر، رزولوشن تصویر و سابقه جهش کاربر.'
            : 'Historical video bounce rate, network throughput bandwidth, stream bit-rate, and skip velocity.',
        outputs:
          lang === 'fa'
            ? 'احتمال خروج زودهنگام [High / Medium / Low].'
            : 'Categorical abandonment risk class [High / Medium / Low].',
        downstreamAction:
          lang === 'fa'
            ? 'پیشنهاد ویدیوهای مکمل با موضوع مشابه قبل از خروج کامل کاربر از اپلیکیشن.'
            : 'Serve complementary recommendations before user terminates session.',
        targetMetric:
          lang === 'fa'
            ? 'دقت (Recall) بالای ۸۰٪ با نرخ هشدار کاذب زیر ۱۰٪.'
            : 'Recall >= 80% with False Positive Rate < 10%.',
        boundary:
          lang === 'fa'
            ? 'اعمال تغییرات خودکار در کیفیت پخش ویدیو در حیطه این هدف نیست.'
            : 'Adaptive bitrate video transcode is out of scope for this iteration.'
      }
    ]);
  };

  // Case Study 2: Fraud & Anomaly
  const handleLoadFraudCase = () => {
    setObjectives([
      {
        id: '1',
        title:
          lang === 'fa'
            ? 'محاسبه امتیاز احتمال تقلب در تراکنش‌های کارتی و اینترنتی (Fraud Risk Scoring)'
            : 'Real-time card and payment fraud risk probability scoring',
        pattern: 'Patterns & Anomalies',
        taskDesc:
          lang === 'fa'
            ? 'شناسایی ناهنجاری‌های رفتاری نسبت به الگوهای هزینه‌کرد تاریخی دارنده حساب.'
            : 'Detect anomalous spending velocity and atypical behavioral deviations from account baseline.',
        inputs:
          lang === 'fa'
            ? 'مبلغ تراکنش، موقعیت جغرافیایی IP و دستگاه، فاصله زمانی با تراکنش قبلی، دسته‌بندی صنف پذیرنده.'
            : 'Transaction amount, device fingerprint, IP geo-velocity, merchant category, time delta.',
        outputs:
          lang === 'fa'
            ? 'امتیاز ریسک کالیبره‌شده بین ۰ تا ۱۰۰ به همراه ۵ متغیر موثر در ناهنجاری.'
            : 'Calibrated fraud risk score [0 - 100] with top-5 SHAP explanatory features.',
        downstreamAction:
          lang === 'fa'
            ? 'مسدودسازی آنی مبالغ مشکوک بالای ۹۰ و ارسال رمز پیامکی یک‌بارمصرف برای مبالغ بین ۶۰ تا ۹۰.'
            : 'Immediate automated payment block if score > 90; step-up SMS OTP challenge if between 60 and 90.',
        targetMetric:
          lang === 'fa'
            ? 'دقت (Precision) بالای ۹۱٪، پوشش (Recall) بالای ۸۵٪، زمان پردازش کمتر از ۸۰ میلی‌ثانیه.'
            : 'Precision >= 91%, Recall >= 85%, p99 latency < 80ms.',
        boundary:
          lang === 'fa'
            ? 'تراکنش‌های بین‌بانکی ارزی بین‌المللی سوییفت در این اسپرینت لحاظ نشده است.'
            : 'Cross-border SWIFT institutional wires excluded in iteration 1.'
      }
    ]);
  };

  // Case Study 3: Churn & LTV
  const handleLoadChurnCase = () => {
    setObjectives([
      {
        id: '1',
        title:
          lang === 'fa'
            ? 'پیش‌بینی احتمال لغو اشتراک و ریزش مشتری در بازه ۳۰ روزه آینده (Churn Risk Prediction)'
            : 'Predicting 30-day customer churn and subscription cancellation probability',
        pattern: 'Predictive Analytics',
        taskDesc:
          lang === 'fa'
            ? 'ارزیابی احتمال عدم تمدید اشتراک بر پایه کاهش تعامل، تیکت‌های پشتیبانی و فرکانس لاگین.'
            : 'Estimate probability of subscription cancellation based on usage decay and support tickets.',
        inputs:
          lang === 'fa'
            ? 'تعداد روزهای عدم فعالیت، افت مصرف دیتا، تعداد تیکت‌های نارضایتی، مدت زمان باقی‌مانده از قرارداد.'
            : 'Days of inactivity, usage volume decline, unresolved CSAT complaints, contract tenure.',
        outputs:
          lang === 'fa'
            ? 'احتمال ریزش [۰.۰ تا ۱.۰] و سطح ریسک (High / Medium / Low).'
            : 'Churn probability [0.0 - 1.0] and risk bucket tier.',
        downstreamAction:
          lang === 'fa'
            ? 'تخصیص خودکار کد تخفیف حفظ مشتری و ارجاع حساب‌های باارزش به تیم پشتیبانی اختصاصی.'
            : 'Trigger automated retention voucher and route high-value VIP accounts to retention desk.',
        targetMetric:
          lang === 'fa'
            ? 'شاخص AUC-ROC >= 0.86 و کاهش حداقل ۱۵٪ در نرخ ریزش واقعی مشتریان هدف.'
            : 'AUC-ROC >= 0.86 and >= 15% reduction in net realized churn.',
        boundary:
          lang === 'fa'
            ? 'مشتریان سازمانی با قراردادهای سالانه اختصاصی خارج از مدل این تکرار هستند.'
            : 'Enterprise custom-contract corporate accounts excluded.'
      }
    ]);
  };

  // Case Study 4: Medical Imaging
  const handleLoadMedicalCase = () => {
    setObjectives([
      {
        id: '1',
        title:
          lang === 'fa'
            ? 'تشخیص و اولویت‌بندی وجود ضایعات بحرانی در تصاویر سی‌تی‌اسکن قفسه سینه'
            : 'Detecting and triaging critical acute anomalies on chest CT scans',
        pattern: 'Recognition',
        taskDesc:
          lang === 'fa'
            ? 'طبقه‌بندی تصاویر رادیولوژی بر پایه وجود نشانه‌های خونریزی یا آمبولی ریه جهت تریاژ فوری پزشک.'
            : 'Classify radiology scans for presence of pulmonary embolism or hemorrhage to triage radiologist worklist.',
        inputs:
          lang === 'fa'
            ? 'فایل‌های تصویربرداری خام استاندارد DICOM، سن و جنسیت بیمار، علائم حیاتی ثبت‌شده در تریاژ.'
            : 'Standard raw DICOM volumetric scans, patient triage age/gender, recorded vital signs.',
        outputs:
          lang === 'fa'
            ? 'احتمال ناهنجاری حاد [۰ تا ۱۰۰٪] و کادر محدودکننده (Bounding Box) ضایعه مشکوک.'
            : 'Critical acute anomaly probability [0 - 100%] and localization bounding box mask.',
        downstreamAction:
          lang === 'fa'
            ? 'انتقال پرونده بیمار به صدر صف بررسی رادیولوژیست کشیک با برچسب هشدار فوری.'
            : 'Elevate scan to top of on-call radiologist worklist with urgent notification badge.',
        targetMetric:
          lang === 'fa'
            ? 'حساسیت (Sensitivity) بالای ۹۶٪ برای موارد بحرانی و کاهش زمان بررسی از ۴۵ به ۸ دقیقه.'
            : 'Sensitivity >= 96% for acute findings; reduce radiologist review turnaround from 45 to 8 mins.',
        boundary:
          lang === 'fa'
            ? 'مدل صرفاً تریاژ و اولویت‌بندی می‌کند و تشخیص نهایی قطعی بر عهده پزشک متخصص است (HITL).'
            : 'Triage prioritization only; diagnostic certification remains exclusively with radiologist (HITL).'
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00738c]/10 text-[#00738c] dark:bg-[#00738c]/20 dark:text-[#6fb3c6] border border-[#00738c]/20">
            <Target className="w-3.5 h-3.5" />
            {text.badge}
          </span>
        </div>

        <button
          onClick={onGoToPage8}
          className="flex items-center gap-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#00738c] dark:hover:text-[#6fb3c6] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{text.prevPageBtn}</span>
        </button>
      </div>

      {/* Main Slide Title & Official Prompt Box */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl p-6 border border-[#d9dad5] dark:border-[#2d3942] shadow-xs mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#00738c]/10 dark:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] shrink-0">
            <Brain className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5d6b73] dark:text-[#9aa8b0]">
              {text.taskGroupTitle} · {text.taskTitle}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.slidePrompt}
            </h1>
            <p className="text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.slideSubtitle}
            </p>
          </div>
        </div>

        {/* Official Guidance Highlight Callout */}
        <div className="mt-5 p-4 rounded-lg bg-[#00738c]/5 dark:bg-[#00738c]/15 border border-[#00738c]/25">
          <div className="flex items-center gap-2 mb-1.5 text-[#00738c] dark:text-[#6fb3c6] font-semibold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>{text.coreInstructionTitle}</span>
          </div>
          <p className="text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
            {text.coreInstructionText}
          </p>
        </div>

        {/* 7 Patterns of AI Reference strip */}
        <div className="mt-4 pt-4 border-t border-[#d9dad5]/70 dark:border-[#2d3942]/70">
          <div className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-2 flex items-center gap-1.5">
            <Boxes className="w-3.5 h-3.5 text-[#00738c] dark:text-[#6fb3c6]" />
            <span>{text.sevenPatternsGuideTitle}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">1. Hyperpersonalization:</span> {lang === 'fa' ? 'شخصی‌سازی محتوا و پیشنهاد' : 'Customizing experience per user'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">2. Recognition:</span> {lang === 'fa' ? 'تشخیص تصویر، صوت و متن' : 'Vision, speech & pattern recognition'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">3. Conversation:</span> {lang === 'fa' ? 'چت‌بات و فهم زبان طبیعی' : 'Chatbots & NLP understanding'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">4. Predictive Analytics:</span> {lang === 'fa' ? 'پیش‌بینی احتمالات و مقادیر' : 'Forecasting trends & CTR'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">5. Autonomous:</span> {lang === 'fa' ? 'سیستم‌های مستقل و ربات‌ها' : 'Autonomous vehicles & agents'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">6. Goal-Driven:</span> {lang === 'fa' ? 'یادگیری تقویتی و بهینه‌سازی' : 'Reinforcement learning & gaming'}
            </div>
            <div className="p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] sm:col-span-2 md:col-span-1">
              <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">7. Patterns & Anomalies:</span> {lang === 'fa' ? 'کشف تقلب و ناهنجاری‌ها' : 'Fraud detection & outlier alert'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar: Templates & Official Case Studies */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleInsertTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{text.templateBtn}</span>
          </button>

          <button
            onClick={handleLoadVideoCase}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-[#00738c]" />
            <span>{text.exampleVideoBtn}</span>
          </button>

          <button
            onClick={handleLoadFraudCase}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#b87333]" />
            <span>{text.exampleFraudBtn}</span>
          </button>

          <button
            onClick={handleLoadChurnCase}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#2f7d5b]" />
            <span>{text.exampleChurnBtn}</span>
          </button>

          <button
            onClick={handleLoadMedicalCase}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-[#7b2cbf]" />
            <span>{text.exampleMedicalBtn}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeContent('')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#b43b3b] hover:border-[#b43b3b]/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{text.clearBtn}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5 text-[#00738c]" />}
            <span>{copied ? text.copiedToast : text.copyBtn}</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs: 1. Enumerate Cognitive Objectives (Primary) vs 2. Noncognitive Tech & Ecosystem */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#d9dad5] dark:border-[#2d3942] pb-2">
        <button
          onClick={() => setActiveTab('objectives')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'objectives'
              ? 'bg-[#00738c] text-white shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#d9dad5]/30'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>{text.tabObjectives}</span>
        </button>

        <button
          onClick={() => setActiveTab('noncogTech')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'noncogTech'
              ? 'bg-[#00738c] text-white shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#d9dad5]/30'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{text.tabNoncogTech}</span>
        </button>
      </div>

      {/* TAB 1: Cognitive Objectives Interactive Builder */}
      {activeTab === 'objectives' && (
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {text.builderTitle}
              </h2>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {text.builderSub}
              </p>
            </div>
            <button
              onClick={handleAddObjective}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1f5163] text-white hover:bg-[#163c4a] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{text.addObjectiveBtn}</span>
            </button>
          </div>

          {/* Cards for each objective */}
          <div className="space-y-5">
            {objectives.map((obj, index) => (
              <div
                key={obj.id}
                className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00738c] text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.objNumber} {index + 1}
                    </span>
                  </div>

                  {objectives.length > 1 && (
                    <button
                      onClick={() => handleRemoveObjective(obj.id)}
                      className="p-1 rounded text-[#5d6b73] hover:text-[#b43b3b] hover:bg-[#b43b3b]/10 transition-colors"
                      title={lang === 'fa' ? 'حذف این هدف شناختی' : 'Remove objective'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Objective Title */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.objTitleLabel}
                    </label>
                    <input
                      type="text"
                      value={obj.title}
                      onChange={(e) => handleUpdateObjective(obj.id, 'title', e.target.value)}
                      placeholder={lang === 'fa' ? 'مثال: پیش‌بینی احتمال کلیک روی ویدیوها جهت مرتب‌سازی لیست' : 'e.g. Predicting video clicks to enable sorting by predicted total clicks'}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>

                  {/* AI Pattern selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.patternLabel}
                    </label>
                    <select
                      value={obj.pattern}
                      onChange={(e) => handleUpdateObjective(obj.id, 'pattern', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    >
                      <option value="Predictive Analytics">4. Predictive Analytics (تحلیل پیش‌بینانه)</option>
                      <option value="Hyperpersonalization">1. Hyperpersonalization (شخصی‌سازی)</option>
                      <option value="Recognition">2. Recognition (تشخیص و شناسایی)</option>
                      <option value="Conversation">3. Conversation & Interaction (مکالمه و پردازش متن)</option>
                      <option value="Autonomous Systems">5. Autonomous Systems (سیستم‌های خودمختار)</option>
                      <option value="Goal-Driven Systems">6. Goal-Driven Systems (سیستم‌های هدف‌محور)</option>
                      <option value="Patterns & Anomalies">7. Patterns & Anomalies (ناهنجاری‌ها و کشف تقلب)</option>
                    </select>
                  </div>
                </div>

                {/* Specific Cognitive Task */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                    {text.taskDescLabel}
                  </label>
                  <input
                    type="text"
                    value={obj.taskDesc}
                    onChange={(e) => handleUpdateObjective(obj.id, 'taskDesc', e.target.value)}
                    placeholder={lang === 'fa' ? 'محاسبه امتیاز احتمال کلیک (CTR Score) و برآورد مجموع کلیک‌های پیش‌بینی‌شده در این جلسه...' : 'Estimate Click-Through Rate (CTR) and predict expected total session clicks...'}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inputs */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.inputsLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={obj.inputs}
                      onChange={(e) => handleUpdateObjective(obj.id, 'inputs', e.target.value)}
                      placeholder={lang === 'fa' ? 'سابقه تماشا، دسته‌بندی موضوعی، زمان روز، پلتفرم...' : 'Watch history, category tags, time of day, client device...'}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>

                  {/* Outputs */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.outputsLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={obj.outputs}
                      onChange={(e) => handleUpdateObjective(obj.id, 'outputs', e.target.value)}
                      placeholder={lang === 'fa' ? 'امتیاز پیوسته [۰ تا ۱] و رتبه‌بندی کاندیدها...' : 'Continuous probability score [0 - 1] and ranked array...'}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Downstream consumption */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.downstreamLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={obj.downstreamAction}
                      onChange={(e) => handleUpdateObjective(obj.id, 'downstreamAction', e.target.value)}
                      placeholder={lang === 'fa' ? 'مرتب‌سازی آنی محتوا در ردیف نخست صفحه اصلی اپلیکیشن...' : 'Sort carousel tiles dynamically in homepage API...'}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>

                  {/* Target metric */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.metricsLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={obj.targetMetric}
                      onChange={(e) => handleUpdateObjective(obj.id, 'targetMetric', e.target.value)}
                      placeholder={lang === 'fa' ? 'AUC-ROC >= 0.84، تاخیر زیر ۴۵ میلی‌ثانیه، ۱۰٪+ بهبود...' : 'AUC-ROC >= 0.84, latency < 45ms, +10% CTR lift...'}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>

                  {/* Boundary / Scope limits */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {text.boundaryLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={obj.boundary}
                      onChange={(e) => handleUpdateObjective(obj.id, 'boundary', e.target.value)}
                      placeholder={lang === 'fa' ? 'تحلیل بصری فریم‌های داخل ویدیو در این تکرار خارج از محدوده است...' : 'Raw video frame vision processing excluded in iteration 1...'}
                      className="w-full text-xs p-2.5 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Generate to canvas button */}
          <div className="flex justify-end">
            <button
              onClick={handleGenerateToCanvas}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{text.generateToCanvasBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Supporting Noncognitive Tech Ecosystem */}
      {activeTab === 'noncogTech' && (
        <div className="p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-5 mb-8">
          <div>
            <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.noncogSectionTitle}
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
              {text.noncogSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* UI Component */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('ui') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'رابط کاربری و لایه نمایش (UI / Front-End)' : 'Presentation UI & Front-End'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('ui')}
                  onChange={() => toggleComponent('ui')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={uiDetails}
                onChange={(e) => setUiDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'داشبورد وب با React و اپ موبایل جهت رندر ردیف پیشنهادات...' : 'Web React app and mobile client rendering dynamic carousel...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            {/* API Component */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('api') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'سرویس‌های واسط و میکروسرویس‌ها (APIs / Gateway)' : 'API Gateway & Microservices'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('api')}
                  onChange={() => toggleComponent('api')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={apiDetails}
                onChange={(e) => setApiDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'اندپوینت FastAPI با تاخیر زیر ۳۰ میلی‌ثانیه برای استنتاج...' : 'REST/gRPC inference service with p99 < 30ms...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            {/* Database Component */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('db') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'پایگاه داده و ذخیره‌سازی (Database & Cache)' : 'Persistence & Cache (DB/Redis)'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('db')}
                  onChange={() => toggleComponent('db')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={dbDetails}
                onChange={(e) => setDbDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'پایگاه PostgreSQL برای تراکنش‌ها و Redis برای کش رتبه‌بندی...' : 'PostgreSQL, Redis cache for low latency...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            {/* Rule Engine Guardrails */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('rules') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'موتور قواعد قطعی و گاردریل‌ها (Deterministic Rules)' : 'Deterministic Rule Guardrails'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('rules')}
                  onChange={() => toggleComponent('rules')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={rulesDetails}
                onChange={(e) => setRulesDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'قواعد صلب انطباق قانونی، فیلتر حد مجاز و سقف اعتباری...' : 'Sanity bound overrides, regulatory compliance checks...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            {/* HITL Component */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('hitl') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'بازبینی انسانی (Human-in-the-Loop - HITL)' : 'Human-in-the-Loop Review Console'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('hitl')}
                  onChange={() => toggleComponent('hitl')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={hitlDetails}
                onChange={(e) => setHitlDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'ارجاع پیش‌بینی‌های با اطمینان زیر ۷۵٪ به کارشناس مجرب...' : 'Triage queue for low-confidence predictions...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            {/* Auth Component */}
            <div className={`p-3 rounded-lg border transition-all ${selectedComponents.includes('auth') ? 'bg-[#00738c]/5 border-[#00738c]/40' : 'bg-[#f4f4f1] dark:bg-[#12171b] border-[#d9dad5] dark:border-[#2d3942]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'امنیت و کنترل دسترسی (Security & RBAC)' : 'Security, RBAC & Governance'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('auth')}
                  onChange={() => toggleComponent('auth')}
                  className="rounded text-[#00738c]"
                />
              </div>
              <input
                type="text"
                value={authDetails}
                onChange={(e) => setAuthDetails(e.target.value)}
                placeholder={lang === 'fa' ? 'پروتکل OAuth 2.0، مجوزدهی مبتنی بر نقش و رمزنگاری...' : 'OAuth 2.0 / OIDC, RBAC authorization, audit logs...'}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={handleGenerateToCanvas}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#1f5163] text-white hover:bg-[#163c4a] transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{text.generateToCanvasBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#00738c]" />
            <span>{lang === 'fa' ? 'بوم ثبت خروجی کاربرگ اسلاید ۱۹' : 'Slide 19 Output Deliverable Canvas'}</span>
          </label>
          <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
            <span>{wordCount} {text.wordCount}</span>
            <span>·</span>
            <span>{charCount} {text.charCount}</span>
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
          <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">Slide 19</span>
        </div>
      </div>

      {/* Navigation Footer (Back to Page 8, Next to Page 10 & Completion Status) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942]">
        <button
          onClick={onGoToPage8}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبلی: صفحه ۸ (اسلاید ۱۸: بخش‌های غیرشناختی)' : 'Previous: Page 8 (Slide 18: Noncognitive Parts)'}</span>
        </button>

        <button
          onClick={onGoToPage10}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-medium hover:bg-[#005f73] transition-colors shadow-xs"
        >
          <span>{lang === 'fa' ? 'صفحه بعدی: صفحه ۱۰ (اسلاید ۲۰: نتایج شناختی)' : 'Next: Page 10 (Slide 20: Cognitive Outcomes)'}</span>
          {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
