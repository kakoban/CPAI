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
  Layers,
  Zap,
  TrendingUp,
  Cpu,
  Film,
  Users,
  ShieldAlert,
  Activity,
  CheckSquare
} from 'lucide-react';

interface Page7Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage6: () => void;
  onGoToPage8?: () => void;
}

export const Page7WhyAiSolution: React.FC<Page7Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage6,
  onGoToPage8
}) => {
  const [copied, setCopied] = useState(false);
  const [showBuilder, setShowBuilder] = useState(true);

  // Exact 3 Slide 17 Questions state
  const [q1Alternatives, setQ1Alternatives] = useState('');
  const [q2WhyNotFeasible, setQ2WhyNotFeasible] = useState('');
  const [q3WhyNotUsedIfFeasible, setQ3WhyNotUsedIfFeasible] = useState('');

  // AI Go / No-Go Test Checklist state
  const [testRulesFail, setTestRulesFail] = useState<boolean | null>(null);
  const [testScaleExceedsHuman, setTestScaleExceedsHuman] = useState<boolean | null>(null);
  const [testPatternComplexity, setTestPatternComplexity] = useState<boolean | null>(null);
  const [testDataAvailable, setTestDataAvailable] = useState<boolean | null>(null);
  const [testRoiJustified, setTestRoiJustified] = useState<boolean | null>(null);

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 7 of 8 (Slide 17: Cognitive Requirements Worksheet)',
      slideTitle: 'Why is an AI solution needed for this project?',
      slideSubtitle:
        'Official CPMAI Slide 17 Workbook: Identify noncognitive alternatives, rigorously evaluate feasibility, and document firm justification for why an AI solution is required.',
      corePromptIntro:
        'Slide 17 addresses the core AI Go/No-Go qualification by answering three explicit questions:',
      
      // The 3 Exact Slide 17 Questions
      question1Title: 'Question 1: What noncognitive (non-AI) alternatives are there to solving the current business problem?',
      question1Sub: 'Identify baseline heuristic, deterministic software, rule-based, or manual human effort approaches.',
      question1Placeholder: 'e.g., Top-10 static lists, manual Excel triage, nested SQL If-Then rules, increasing customer service reps...',

      question2Title: 'Question 2: For those alternatives, why are they not feasible for this project?',
      question2Sub: 'Specify engineering, complexity, latency, data scale, or cost blockers that make them impossible or ineffective.',
      question2Placeholder: 'e.g., Combinatorial explosion of rules, impossible sub-second latency for 50M users, cognitive fatigue causing 40% error rates...',

      question3Title: 'Question 3: If noncognitive alternatives are feasible, then why are they not being used for this project?',
      question3Sub: 'If a heuristic is technically "good enough", justify why cognitive AI is strategically mandatory (5 Value Vectors: Better, Faster, Cheaper, More Reliable, More Scalable).',
      question3Placeholder: 'e.g., Heuristic leaves $8.4M in churn unaddressed, fails long-tail catalog, creates brittle technical debt, and cannot scale linearly with 10x traffic...',

      templateBtn: 'Insert Official Slide 17 Template',
      exampleMovieBtn: 'Example 1: Streaming Recommendations (Top-10 vs Deep ML)',
      exampleChurnBtn: 'Example 2: Banking Churn (Excel Rules vs Predictive ML)',
      exampleFraudBtn: 'Example 3: Payment Fraud (Static Limits vs Graph AI)',
      exampleHealthBtn: 'Example 4: Radiology Triage (Manual Queue vs Vision AI)',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      canvasTitle: 'Slide 17 Workbook Answers Canvas',
      canvasPlaceholder:
        'CPMAI Slide 17 Workbook Worksheet Answers:\n\nQuestion 1: What noncognitive (non-AI) alternatives are there to solving the current business problem?\n...\n\nQuestion 2: For those alternatives, why are they not feasible for this project?\n...\n\nQuestion 3: If noncognitive alternatives are feasible, then why are they not being used for this project?\n...',
      prevPageBtn: 'Previous: Cognitive Requirements (Page 6 / Slide 16)',
      nextPageBtn: 'Next: Noncognitive Portions & Automation (Page 8 / Slide 18)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      builderTitle: 'Slide 17 Three-Question Structured Builder',
      builderSubtitle: 'Fill each of the 3 official workbook questions below to compile directly into your answer canvas.',
      applyBuilderBtn: 'Apply Slide 17 Answers to Canvas',
      goNoGoTitle: 'CPMAI AI Go / No-Go Decision Gate',
      goNoGoSubtitle: 'Test whether this project requirement legitimately qualifies for cognitive/AI investment:',
      q1: '1. Rule-Based Limitation: Can deterministic rules (if-then logic, SQL) solve this accurately without exploding in complexity?',
      q1Note: 'If rules WORK WELL, use software engineering (No-Go for AI). If rules BREAK DOWN, proceed toward AI.',
      q2: '2. Scale & Velocity: Does volume, dimensional complexity, or real-time latency exceed human / manual capacity?',
      q2Note: 'If YES, cognitive automation provides essential scalability that cannot be staffed manually.',
      q3: '3. Non-Linear Patterns: Are the underlying patterns hidden, multi-modal, or too intricate for human rule crafting?',
      q3Note: 'If YES, statistical machine learning pattern recognition is mathematically required.',
      q4: '4. Data Feasibility: Is representative, clean historical data available or reliably collectable for training/inference?',
      q4Note: 'If NO, AI will fail immediately; project must halt or pivot to data collection first.',
      q5: '5. Value Uplift vs TCO: Will the measurable business uplift (better, faster, cheaper) significantly exceed AI lifecycle TCO?',
      q5Note: 'If YES, the cognitive solution has positive financial viability.',
      goVerdict: 'AI GO: High cognitive justification. Problem meets all criteria for machine learning.',
      noGoVerdict: 'AI NO-GO / RE-EVALUATE: A heuristic or deterministic software approach is superior or data prerequisites are missing.',
      cautionVerdict: 'HYBRID / CONDITIONAL: Consider starting with an enhanced heuristic baseline before committing full AI resources.',
      neutralVerdict: 'Answer the 5 gate questions above to evaluate the CPMAI AI Go/No-Go decision.',
      appendTestToCanvas: 'Append Decision Gate Assessment to Canvas',
      fiveVectorsTitle: 'The 5 Cognitive Value Vectors (CPMAI Benchmark for Question 3):',
      v1: 'Better: Outperforms human/heuristic accuracy, precision, or personalization.',
      v2: 'Faster: Delivers real-time inferences in milliseconds vs hours/days of human turnaround.',
      v3: 'Cheaper: Dramatically reduces cost-per-transaction at large production volume.',
      v4: 'More Reliable: Operates 24/7 without cognitive fatigue, oversight, or inconsistency.',
      v5: 'More Scalable: Handles 10x to 10,000x user/data surges without linear staffing headcount.'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۷ از ۸ (اسلاید ۱۷: کاربرگ الزامات پروژه‌های شناختی)',
      slideTitle: 'Why is an AI solution needed for this project?',
      slideSubtitle:
        'اسلاید ۱۷ کتاب کار رسمی متدولوژی CPMAI: شناسایی راه‌حل‌های جایگزین غیرشناختی، ارزیابی دقیق امکان‌پذیری و ثبت توجیه قاطع برای الزام راه‌حل هوش مصنوعی.',
      corePromptIntro:
        'اسلاید ۱۷ کتاب کار با طرح دقیق ۳ پرسش اساسی، آزمون تایید صلاحیت نیاز به هوش مصنوعی (AI Go/No-Go) را ارزیابی می‌کند:',
      
      // The 3 Exact Slide 17 Questions
      question1Title: 'پرسش ۱: What noncognitive (non-AI) alternatives are there to solving the current business problem?',
      question1Sub: 'چه راه‌حل‌های جایگزین غیرشناختی (غیر مبتنی بر هوش مصنوعی) برای حل مسئله فعلی کسب‌وکار وجود دارند؟ (تعیین خط مبنای اکتشافی Heuristic، قوانین برنامه‌نویسی Rule-based یا تلاش دستی انسان)',
      question1Placeholder: 'مثال: فهرست استاتیک ۱۰ آیتم برتر، فیلترهای شرطی اکسل و SQL، استخدام اپراتورهای بیشتر، یا فرآیندهای بازبینی دستی...',

      question2Title: 'پرسش ۲: For those alternatives, why are they not feasible for this project?',
      question2Sub: 'برای آن راه‌حل‌های جایگزین، چرا برای این پروژه امکان‌پذیر (شدنی) نیستند؟ (موانع فنی، تاخیر زمانی، مقیاس داده، خستگی شناختی یا انفجار پیچیدگی قوانین)',
      question2Placeholder: 'مثال: ناتوانی در تحلیل همزمان صدها متغیر رفتاری، تاخیر چندساعته در برابر تصمیم‌گیری بلادرنگ میلی‌ثانیه‌ای، خطای ۴۰ درصدی بازبین‌های انسانی...',

      question3Title: 'پرسش ۳: If noncognitive alternatives are feasible, then why are they not being used for this project?',
      question3Sub: 'اگر راه‌حل‌های جایگزین غیرشناختی امکان‌پذیر هستند، پس چرا برای این پروژه استفاده نمی‌شوند؟ (توجیه قاطع بر اساس ۵ بردار ارزش CPMAI: بهتر، سریع‌تر، ارزان‌تر، مطمئن‌تر، مقیاس‌پذیرتر، هزینه فرصت و بدهی فنی)',
      question3Placeholder: 'مثال: راه‌حل غیرشناختی اگرچه کار می‌کند، اما ۸۰٪ ظرفیت درآمدی را می‌سوزاند، با رشد ۱۰ برابری مشتریان فرو می‌پاشد، و هوش مصنوعی سودآوری سالانه را میلیون‌ها دلار افزایش می‌دهد...',

      templateBtn: 'درج قالب استاندارد ۳ پرسش اسلاید ۱۷',
      exampleMovieBtn: 'نمونه ۱: پیشنهادگر مدیا و فیلم (۱۰ فیلم برتر در برابر هوش مصنوعی عمیق)',
      exampleChurnBtn: 'نمونه ۲: پیش‌بینی ریزش مشتریان بانک (فیلترهای اکسل در برابر یادگیری ماشین)',
      exampleFraudBtn: 'نمونه ۳: کشف تقلب در تراکنش (آستانه‌های ایستا در برابر هوش مصنوعی گراف)',
      exampleHealthBtn: 'نمونه ۴: تریاژ تصویربرداری پزشکی (صف دستی در برابر هوش مصنوعی بینایی)',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'کاراکتر',
      canvasTitle: 'بوم ثبت پاسخ به ۳ پرسش اسلاید ۱۷ کتاب کار CPMAI',
      canvasPlaceholder:
        'پاسخ‌های تحلیلی خود به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI را در این بخش بنویسید یا از فرم سازنده و نمونه‌های آماده زیر استفاده کنید:\n\n۱. What noncognitive (non-AI) alternatives are there to solving the current business problem?\n...\n\n۲. For those alternatives, why are they not feasible for this project?\n...\n\n۳. If noncognitive alternatives are feasible, then why are they not being used for this project?\n...',
      prevPageBtn: 'صفحه قبلی: صفحه ۶ (اسلاید ۱۶: الزامات پروژه‌های شناختی)',
      nextPageBtn: 'صفحه بعدی: صفحه ۸ (اسلاید ۱۸: بخش‌های غیرشناختی مکمل و اتوماسیون)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      builderTitle: 'سازنده ساختاریافته ۳ پرسش اسلاید ۱۷ کتاب کار',
      builderSubtitle: 'پاسخ‌های خود را در ۳ فیلد متناظر با ۳ پرسش اصلی اسلاید ۱۷ وارد کنید تا مستقیماً به ساختار استاندارد بوم اضافه شود.',
      applyBuilderBtn: 'اعمال پاسخ‌های ۳ پرسش اسلاید ۱۷ به بوم',
      goNoGoTitle: 'دروازه ارزیابی تصمیم‌گیری تایید یا رد هوش مصنوعی (AI Go / No-Go Gate)',
      goNoGoSubtitle: 'بررسی ۵ پرسش کلیدی متدولوژی CPMAI جهت اعتبارسنجی قطعی نیاز به راه‌حل شناختی:',
      q1: '۱. محدودیت قوانین برنامه‌نویسی: آیا قوانین قطعی سنتی (If-Then یا کوئری‌های SQL) می‌توانند مسئله را بدون انفجار پیچیدگی حل کنند؟',
      q1Note: 'اگر قوانین سنتی به خوبی جواب می‌دهند: مهندسی نرم‌افزار سنتی کافی است (رد هوش مصنوعی). اگر قوانین شکست می‌خورند: نیاز به هوش مصنوعی است.',
      q2: '۲. مقیاس و سرعت: آیا حجم، ابعاد داده‌ها یا نیاز به تصمیم‌گیری بلادرنگ فراتر از ظرفیت کارشناس انسانی است؟',
      q2Note: 'اگر بله: اتوماسیون شناختی برای مقیاس‌پذیری الزامی است.',
      q3: '۳. پیچیدگی الگوهای غیرخطی: آیا الگوها غیرخطی، پنهان و چندبعدی هستند که نوشتن قوانین دستی برای آن‌ها غیرممکن است؟',
      q3Note: 'اگر بله: به بازشناسی آماری الگوها با یادگیری ماشین نیاز قطعی است.',
      q4: '۴. امکان‌پذیری داده: آیا داده‌های تاریخی برچسب‌خورده، باکیفیت و پایدار برای آموزش یا استنتاج در دسترس است؟',
      q4Note: 'اگر خیر: پروژه بدون داده با شکست مواجه می‌شود و ابتدا باید زیرساخت داده تامین شود.',
      q5: '۵. ارتقای ارزش در برابر هزینه کل: آیا جهش ارزش کسب‌وکار (بهتر، سریع‌تر، ارزان‌تر) بر هزینه‌های سنگین چرخه عمر هوش مصنوعی می‌چربد؟',
      q5Note: 'اگر بله: راه‌حل شناختی توجیه اقتصادی مثبت دارد.',
      goVerdict: 'تایید هوش مصنوعی (AI GO): توجیه کامل برای راه‌حل شناختی. مسئله تمام شروط یادگیری ماشین را داراست.',
      noGoVerdict: 'رد یا بازنگری هوش مصنوعی (AI NO-GO): رویکرد هیوریستیک یا نرم‌افزاری سنتی مناسب‌تر است یا پیش‌نیازهای داده فراهم نیست.',
      cautionVerdict: 'رویکرد ترکیبی / مشروط (HYBRID): پیشنهاد می‌شود ابتدا خط مبنای اکتشافی بهینه پیاده‌سازی شود و سپس سراغ هوش مصنوعی رفت.',
      neutralVerdict: 'به ۵ پرسش فوق پاسخ دهید تا ارزیابی تصمیم دروازه CPMAI مشخص شود.',
      appendTestToCanvas: 'درج نتیجه دروازه تصمیم در بوم',
      fiveVectorsTitle: '۵ بردار ارزش شناختی (معیار طلایی CPMAI برای پاسخ به پرسش ۳):',
      v1: '۱. بهتر (Better): برتری در دقت، تفکیک‌پذیری یا شخصی‌سازی نسبت به رویکرد انسانی و قوانین سنتی.',
      v2: '۲. سریع‌تر (Faster): استنتاج بلادرنگ در کسری از ثانیه (میلی‌ثانیه) در برابر ساعات یا روزها پردازش دستی.',
      v3: '۳. ارزان‌تر (Cheaper): کاهش چشمگیر هزینه هر تراکنش در مقیاس‌های میلیونی تولید.',
      v4: '۴. مطمئن‌تر (More Reliable): کارکرد ۲۴ ساعته در تمام روزهای هفته بدون خستگی شناختی یا خطای غفلت.',
      v5: '۵. مقیاس‌پذیرتر (More Scalable): پوشش جهش‌های ۱۰ برابری تا ۱,۰۰۰ برابری تقاضا بدون نیاز به استخدام خطی پرسنل.'
    }
  };

  const text = t[lang];

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  // Handle Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Compile Structured Builder into Canvas with the EXACT 3 SLIDE 17 QUESTIONS
  const handleApplyBuilder = () => {
    let compiled = '';
    if (lang === 'fa') {
      compiled = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(چرا برای این پروژه به یک راه‌حل هوش مصنوعی / شناختی نیاز است؟)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
*(چه راه‌حل‌های جایگزین غیرشناختی (غیر مبتنی بر هوش مصنوعی) برای حل مسئله فعلی کسب‌وکار وجود دارند؟)*
${q1Alternatives.trim() || '• [راه‌حل‌های جایگزین غیرشناختی (دستی، هیوریستیک، مبتنی بر قوانین یا اکسل) هنوز وارد نشده است.]'}

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
*(برای آن راه‌حل‌های جایگزین، چرا برای این پروژه امکان‌پذیر (شدنی) نیستند؟)*
${q2WhyNotFeasible.trim() || '• [دلایل عدم امکان‌پذیری راه‌حل‌های غیرشناختی از نظر مقیاس، تاخیر، پیچیدگی و هزینه هنوز ثبت نشده است.]'}

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
*(اگر راه‌حل‌های جایگزین غیرشناختی امکان‌پذیر هستند، پس چرا برای این پروژه استفاده نمی‌شوند؟)*
${q3WhyNotUsedIfFeasible.trim() || '• [توجیه قاطع بر اساس برتری ۵ بردار ارزش هوش مصنوعی، هزینه فرصت از دست‌رفته و شکست در مقیاس بالا هنوز مشخص نشده است.]'}

---
تاریخ ثبت: ${new Date().toLocaleDateString('fa-IR')} | متدولوژی مدیریت پروژه شناختی (CPMAI) · اسلاید ۱۷`;
    } else {
      compiled = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
${q1Alternatives.trim() || '• [Current noncognitive, rule-based, heuristic, or manual human alternatives not yet specified.]'}

### Question 2:
**For those alternatives, why are they not feasible for this project?**
${q2WhyNotFeasible.trim() || '• [Technical, latency, scale, combinatorial complexity, or staffing feasibility blockers not yet detailed.]'}

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
${q3WhyNotUsedIfFeasible.trim() || '• [Firm strategic justification across the 5 Cognitive Value Vectors (Better, Faster, Cheaper, More Reliable, More Scalable) not yet recorded.]'}

---
Recorded on: ${new Date().toISOString().split('T')[0]} | CPMAI Phase I Methodology · Slide 17`;
    }

    onChangeContent(compiled);
  };

  // Insert Standard CPMAI Template for Slide 17
  const handleInsertTemplate = () => {
    if (lang === 'fa') {
      const template = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(چرا برای این پروژه به یک راه‌حل هوش مصنوعی / شناختی نیاز است؟)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
*(چه راه‌حل‌های جایگزین غیرشناختی (غیر مبتنی بر هوش مصنوعی) برای حل مسئله فعلی کسب‌وکار وجود دارند؟)*
• رویکرد اکتشافی / هیوریستیک فعلی (Current Heuristic Baseline): [شرح روش دستی، سرانگشتی، یا سنتی مورد استفاده امروز]
• سیستم قوانین قطعی شرطی (Rule-Based Logic): [جداول قوانین If-Then یا کوئری‌های شرطی SQL]
• فرآیند دستی مبتنی بر نیروی انسانی (Manual Human Effort): [استخدام تحلیلگران یا کارشناسان بیشتر برای ارزیابی دستی]
• اتوماسیون رباتیک فرآیندها (RPA / Macro Automation): [ماکروهای استاتیک یا ربات‌های نرم‌افزاری تکرارکننده عملیات بدون یادگیری]

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
*(برای آن راه‌حل‌های جایگزین، چرا برای این پروژه امکان‌پذیر (شدنی) نیستند؟)*
• موانع مقیاس داده و حجم (Scale Bottlenecks): [افزایش حجم تراکنش‌ها از توان بررسی دستی یا کوئری‌های همزمان فراتر می‌رود]
• محدودیت تاخیر و سرعت تصمیم‌گیری (Latency / Speed): [سیستم سنتی نیازمند ساعت‌ها زمان است، اما کسب‌وکار به تصمیم بلادرنگ (<۱۰۰ میلی‌ثانیه) نیاز دارد]
• انفجار پیچیدگی قوانین (Rule Combinatorial Explosion): [تعریف قوانین دستی برای صدها رفتار و سناریوی غیرخطی منجر به کدهای شکننده و غیرقابل نگهداری می‌شود]
• خطای انسانی و خستگی شناختی (Cognitive Fatigue): [بررسی مداوم موارد یکنواخت به افت دقت و از دست رفتن موارد بحرانی می‌انجامد]

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
*(اگر راه‌حل‌های جایگزین غیرشناختی امکان‌پذیر هستند، پس چرا برای این پروژه استفاده نمی‌شوند؟)*
• بردار «بهتر» (Better): [دقت یادگیری ماشین الگوهای پنهان و چندبعدی را کشف کرده و خطاهای مثبت کاذب را به شدت کاهش می‌دهد]
• بردار «سریع‌تر» (Faster): [ارائه تصمیم‌گیری و شخصی‌سازی در کسری از ثانیه در جریان تراکنش‌های واقعی کاربر]
• بردار «ارزان‌تر» (Cheaper): [هزینه نهایی هر پردازش در حجم بالا به کسری از هزینه استخدام خطی نیروی انسانی تنزل می‌یابد]
• بردار «مطمئن‌تر» (More Reliable): [تضمین عملکرد پایدار و بدون وقفه در تمام ساعات شبانه‌روز]
• بردار «مقیاس‌پذیرتر» (More Scalable): [پوشش جهش‌های تقاضا بدون وابستگی به افزایش تعداد کارمندان]
• هزینه فرصت و شکست در رشد (Opportunity Cost & Technical Debt): [اتکا به رویکرد سنتی سبب عقب‌ماندگی رقابتی، نارضایتی کاربران و هزینه‌های نگهداری سرسام‌آور می‌شود]

نتیجه‌گیری: اگرچه رویکردهای غیرشناختی ممکن است به عنوان یک خط مبنای ساده وجود داشته باشند، اما راه‌حل هوش مصنوعی تنها گزینه‌ای است که بازگشت سرمایه پایدار و برتری رقابتی را محقق می‌سازد.`;
      onChangeContent(template);
    } else {
      const template = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• Current Heuristic Baseline: [Describe the manual rule-of-thumb, spreadsheet, or simple baseline currently used]
• Deterministic Rule Engine: [Nested If-Then business logic or relational database filter queries]
• Manual Human Operations: [Hiring additional staff / analysts to manually review and process items]
• Robotic Process Automation (RPA): [Static deterministic screen macros replicating keystrokes without statistical learning]

### Question 2:
**For those alternatives, why are they not feasible for this project?**
• Volume & Scale Limits: [Workload exceeds human review capacity; rule engines grind under complex join queries]
• Turnaround Latency: [Turnaround takes hours or days while production requires sub-second (<50ms) inference]
• Combinatorial Explosion of Rules: [Manual rule trees cannot cope with high-dimensional, evolving patterns without constant breakage]
• Cognitive Fatigue & Inconsistency: [Human operators exhibit inconsistency and error spikes during surge volumes]

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• Better: [Machine learning discovers non-linear interaction patterns, yielding 3x higher accuracy and precision]
• Faster: [Sub-50ms inference inside real-time digital customer interactions]
• Cheaper: [Marginal cost per decision approaches zero at production scale compared to linear labor payroll]
• More Reliable: [24/7 consistent execution without human fatigue or bias]
• More Scalable: [Handles 10x traffic surges seamlessly without operational bottleneck]
• Opportunity Cost: [Relying on a "good enough" heuristic leaves millions in business value uncaptured and creates insurmountable technical debt]

Conclusion: Cognitive solution is strictly required because noncognitive alternatives fail to deliver viable performance, unit economics, and competitive scale.`;
      onChangeContent(template);
    }
  };

  // Case Study 1: Media / Streaming Recommendations
  const handleExampleMovie = () => {
    if (lang === 'fa') {
      const ex = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(نمونه موردی ۱: سیستم پیشنهاد محتوا و فیلم در پلتفرم استریمینگ)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• رویکرد هیوریستیک ۱۰ فیلم برتر: نمایش یک فهرست ایستا و سراسری از ۱۰ فیلم پربازدید هفته به تمام کاربران بدون تمایز سلیقه.
• دسته‌بندی دستی ژانرها: تفکیک فیلم‌ها در تب‌های ثابت اکشن، کمدی، درام و نمایش جدیدترین فیلم‌های اضافه شده در هر تب.
• پیشنهاد توسط تیم سردبیری: انتخاب هفتگی فیلم‌های منتخب توسط کارشناسان سینما و ارسال ایمیل عمومی به تمام مشترکان.

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
• چرا امکان‌پذیر نیستند؟
  ۱. سلیقه‌های متضاد: یک فهرست مشترک برای میلیون‌ها کاربر با تنوع علایق (از انیمه تا فیلم‌های مستند) رضایت کمتر از ۱۵٪ مشترکان را جلب می‌کند.
  ۲. نادیده گرفتن آرشیو فیلم‌ها (Long-Tail Failure): بیش از ۸۰٪ عناوین فیلم‌ها در کاتالوگ هیچ‌گاه در لیست ۱۰ فیلم برتر جا نگرفته و سرمایه هنگفت خرید لایسنس آن‌ها بلااستفاده می‌ماند.
  ۳. عدم امکان شخصی‌سازی بلادرنگ: زمان مشاهده فیلم، نوع دستگاه و حس و حال کاربر به طور مداوم تغییر می‌کند و تیم سردبیری نمی‌تواند برای هر کاربر لحظه‌ای لیست جدا بسازد.

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• حتی اگر سیستم هیوریستیک ۱۰ فیلم برتر از نظر فنی ارزان و قابل اجرا باشد، چرا استفاده نمی‌شود؟
  ۱. بردار بهتر: مدل هوش مصنوعی فیلترینگ مشارکتی دوبرجی (Two-Tower NCF) با درک شباهت‌های پنهان، عناوین متناسب با سلیقه هر فرد را استخراج می‌کند و نرخ تماشا را ۳۲٪ افزایش می‌دهد.
  ۲. بردار سریع‌تر: پاسخ در کمتر از ۱۵ میلی‌ثانیه برای ۵۰ میلیون کاربر فعال.
  ۳. بردار ارزان‌تر و مقیاس‌پذیرتر: جایگزینی کامل نیاز به صدها نیروی انسانی با زیرساخت سرور مقیاس‌پذیر.
  ۴. توجیه مالی قاطع: کاهش ریزش اشتراک ماهیانه به ارزش سالانه ۱۲.۵ میلیون دلار سود مستقیم به همراه دارد.`;
      onChangeContent(ex);
    } else {
      const ex = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?
(Case Study 1: Video Streaming Personalization vs Top-10 Heuristic)

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• Global Top-10 Most Popular List: Displaying an identical static carousel of the week's most viewed titles to all subscribers.
• Category Static Grids: Hardcoded genre shelves (Action, Comedy, Sci-Fi) ordered strictly by release date.
• Human Editorial Curation: Staff movie critics manually curating weekly "Staff Picks" newsletters.

### Question 2:
**For those alternatives, why are they not feasible for this project?**
• Why are they not feasible?
  1. Complete Personalization Blindness: A uniform list achieves less than 14% click-through; viewers with diverse niche interests abandon the platform.
  2. Long-Tail Catalog Waste: 82% of licensed library assets never appear on top-10 lists, wasting tens of millions in acquisition royalties.
  3. Context Ignorance: Rule systems cannot adjust to device form-factor, time-of-day, or momentary viewing intent.

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• If the Top-10 heuristic is feasible and cheap to host, why is it rejected?
  1. Better: Two-Tower Neural Collaborative Filtering tailors 50M distinct homepages, elevating watch-time by 32%.
  2. Faster: Sub-20ms inference inside live user discovery sessions.
  3. Scalable: Scales to 100M global subscribers without expanding editorial headcounts.
  4. Bottom-Line ROI: Recovers $14.2M annually in prevented subscriber churn compared to static heuristics.`;
      onChangeContent(ex);
    }
  };

  // Case Study 2: Banking Churn
  const handleExampleChurn = () => {
    if (lang === 'fa') {
      const ex = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(نمونه موردی ۲: پیش‌بینی ریزش مشتریان بانک در برابر فیلترهای استاتیک اکسل و کوئری‌های SQL)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• قوانین فیلتر فصلی در پایگاه داده: اجرای کوئری: «اگر موجودی < ۱ میلیون تومان و در ۶۰ روز گذشته تراکنش صفر باشد، مشتری در خطر ریزش است».
• پیگیری تلفنی دستی: ارسال خروجی فیلتر به کارشناسان شعب برای تماس تلفنی بازاریابی.
• پیامک تخفیف عمومی: ارسال پیامک تخفیف کارمزد برای تمامی کارت‌های کم‌تراکنش.

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
• چرا امکان‌پذیر نیستند؟
  ۱. تاخیر گذشته‌نگر: قوانین آستانه زمانی فعال می‌شوند که مشتری از قبل سپرده خود را به بانک رقیب منتقل کرده و حساب را خالی کرده است.
  ۲. خطای مثبت کاذب شدید (۶۵٪): مشتریان وفاداری که فقط به سفر رفته‌اند پی‌درپی با تماس‌های مزاحم روبه‌رو می‌شوند، در حالی که مشتریان ثروتمند با کاهش آرام تراکنش شناسایی نمی‌شوند.
  ۳. عدم توانایی در بررسی الگوهای چندبعدی: قوانین شرطی دستی نمی‌توانند تعامل همزمان ۸۰ شاخص رفتاری، بانکی و کاربری اپلیکیشن را محاسبه کنند.

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• با وجود اینکه اسکریپت SQL امکان‌پذیر و قابل اجراست، چرا کنار گذاشته می‌شود؟
  ۱. بردار بهتر: الگوریتم گرادیان بوستینگ (LightGBM) الگوهای پنهان کاهش سرعت تراکنش را ۴۵ روز قبل از تخلیه حساب با دقت ۸۸٪ کشف می‌کند.
  ۲. بردار ارزان‌تر: تمرکز بودجه تخفیف و تماس فقط بر روی مشتریان باارزش با احتمال بازگشت بالا، هزینه‌های بازاریابی هدررفته را ۵۰٪ کاهش می‌دهد.
  ۳. بردار مطمئن‌تر و مقیاس‌پذیرتر: پایش شبانه ۲ میلیون حساب بدون نیاز به استخدام کارمندان بیشتر در شعب.
  ۴. ارزش مالی: حفظ تنها ۱,۲۰۰ حساب سپرده کلان سالانه بیش از ۴ میلیون دلار حاشیه سود برای بانک حفظ می‌کند.`;
      onChangeContent(ex);
    } else {
      const ex = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?
(Case Study 2: Banking Customer Churn vs Static SQL Rules)

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• Periodic SQL Query Filter: "If balance < $1,000 AND zero transactions in 60 days, flag as churn risk".
• Manual Branch Outreach: Pushing static spreadsheet exports to branch relationship managers for outbound phone calls.
• Blanket Promo Campaign: Blasting generic fee-waiver discount codes to all dormant cardholders.

### Question 2:
**For those alternatives, why are they not feasible for this project?**
• Why are they not feasible?
  1. Backward-Looking Lag: Rule thresholds fire weeks after the customer has already initiated balance transfer to a rival bank.
  2. Severe False-Positive Rate (65%): Branch staff waste 60% of outbound calling hours on false alarms while quiet affluent churners go undetected.
  3. Dimensional Inadequacy: Rule trees cannot calculate non-linear interactions across 85 transactional and mobile telemetry features simultaneously.

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• Even if the SQL heuristic is technically feasible to run, why is it rejected?
  1. Better: Ensemble Gradient Boosted Trees detect subtle decay signatures 45 days in advance with 88% precision.
  2. Faster: Automates nightly risk scores across 1.8M accounts in minutes.
  3. Cheaper: Targets retention capital solely on high-salvage LTV accounts, cutting campaign waste by 45%.
  4. Business Impact: Retaining just 1,400 premier accounts protects $4.2M in annual net interest margin.`;
      onChangeContent(ex);
    }
  };

  // Case Study 3: Fraud Detection
  const handleExampleFraud = () => {
    if (lang === 'fa') {
      const ex = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(نمونه موردی ۳: کشف تقلب در درگاه پرداخت بانکی در برابر آستانه‌های ایستا)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• قوانین ایستای محدودیت مبلغ: «تراکنش بالای ۵۰ میلیون تومان یا بیش از ۳ تلاش ناموفق در ۱۰ دقیقه مسدود شود».
• صف بررسی دستی اپراتور: ارسال تمام تراکنش‌های مشکوک به تیم نظارت جهت بررسی فاکتور و تماس تلفنی.
• احراز هویت پیامکی اجباری: اجبار رمز یکبار مصرف پیامکی برای تمامی مبالغ بالاتر از حد نصاب.

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
• چرا امکان‌پذیر نیستند؟
  ۱. دور زدن ساده توسط کلاهبرداران: شبکه‌های سازمان‌یافته با انجام تراکنش‌های ۴۹ میلیون تومانی (زیر سقف) و استفاده از کارت‌های متعدد قوانین را دور می‌زنند.
  ۲. مسدودسازی فاجعه‌بار مشتریان واقعی: ۹۰٪ تراکنش‌های مسدودشده مربوط به خریداران معتبر در سفر یا خریدهای فصلی است که به ترک خرید و خسارت مالی منجر می‌شود.
  ۳. عدم مقیاس‌پذیری در حراج‌ها: در روزهای تخفیف با ۱۰,۰۰۰ تراکنش در ثانیه، بررسی دستی ناممکن است و کل سیستم درگاه با صف طویل متوقف می‌شود.

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• چرا با وجود امکان اجرای قوانین شرطی سنتی، هوش مصنوعی الزامی است؟
  ۱. بردار بهتر: شبکه عصبی گرافی (GNN) با بررسی ارتباطات مخفی میان اثر انگشت دستگاه، کارت‌ها و شماره‌های شبا تقلب‌های شبکه‌ای را با دقت ۹۶٪ شناسایی می‌کند.
  ۲. بردار سریع‌تر: استنتاج در کمتر از ۲۰ میلی‌ثانیه قبل از صدور تاییدیه بانکی.
  ۳. بردار ارزان‌تر: کاهش ۶۵ درصدی خطای مسدودسازی مشتریان واقعی، سالانه ۷ میلیون دلار فروش از دست‌رفته را احیا می‌کند.
  ۴. توجیه نهایی: جلوگیری از سالانه ۱۸ میلیون دلار زیان مستقیم ناشی از تقلب با بازگشت سرمایه ۵۰۰ درصدی.`;
      onChangeContent(ex);
    } else {
      const ex = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?
(Case Study 3: Real-Time Payment Fraud Detection vs Hardcoded Rule Limits)

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• Hardcoded Velocity Rules: "If amount > $5,000 OR >3 declined attempts in 10 minutes, block transaction".
• Manual Review Queue: Backlog of flagged orders dispatched to fraud analysts for manual phone verification.
• Mandatory Step-Up 2FA: Enforcing SMS OTP challenges across every checkout transaction above $100.

### Question 2:
**For those alternatives, why are they not feasible for this project?**
• Why are they not feasible?
  1. Easily Circumvented: Fraud rings exploit threshold boundaries with $4,950 transactions distributed across hundreds of mule accounts.
  2. High False-Decline Friction: 88% of blocked transactions are legitimate high-value buyers, costing 7x more in lost revenue than actual fraud losses.
  3. Peak Burst Collapse: Manual queues collapse during holiday sale events with 6,000 transactions/sec.

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• Why reject the feasible rule engine in favor of cognitive AI?
  1. Better: Graph Convolutional Networks + Anomaly Ensembles detect multi-account fraud rings with 96% precision.
  2. Faster: Sub-25ms inference within the live payment authorization gateway.
  3. Cheaper: Recaptures $6.8M in lost sales revenue by cutting false declines by 62%.
  4. ROI Impact: Protects $14.5M in annual chargeback losses against minimal cloud inference operating costs.`;
      onChangeContent(ex);
    }
  };

  // Case Study 4: Healthcare / Radiology
  const handleExampleHealth = () => {
    if (lang === 'fa') {
      const ex = `# پاسخ به ۳ پرسش رسمی اسلاید ۱۷ کتاب کار CPMAI:
## Why is an AI solution needed for this project?
(نمونه موردی ۴: تریاژ و اولویت‌بندی تصاویر پزشکی اورژانس در برابر صف زمانی سنتی)

### پرسش ۱ (Question 1):
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• صف زمانی نوبتی ساده (FIFO): خواندن اسکن‌های سی‌تی‌اسکن بر اساس ترتیب ورود توسط رادیولوژیست‌های شیفت.
• علامت‌گذاری دستی «فوری» توسط پزشک تریاژ: نشانه‌گذاری توسط پزشک عمومی بر اساس وضعیت بالینی اولیه بیمار.
• افزایش تعداد رادیولوژیست‌های شیفت شب: استخدام متخصصان بیشتر برای کاهش صف انتظارات.

### پرسش ۲ (Question 2):
**For those alternatives, why are they not feasible for this project?**
• چرا امکان‌پذیر نیستند؟
  ۱. تاخیر مرگبار در موارد خاموش: بیمار با خونریزی حاد داخل جمجمه ممکن است در ظاهر آرام باشد و تا ۴ ساعت در صف بماند تا تصویر باز شود.
  ۲. کمبود شدید رادیولوژیست در بیمارستان‌های دوردست: امکان حضور شبانه‌روزی متخصصان زبده در تمام مناطق وجود ندارد.
  ۳. خستگی شناختی: بررسی پیاپی ۲۰۰ اسکن نرمال سبب خطای غفلت در کشف خونریزی میلی‌متری در اسکن ۲۰۱ می‌شود.

### پرسش ۳ (Question 3):
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• حتی اگر صف زمانی و تریاژ دستی از نظر اداری امکان‌پذیر باشد، چرا سیستم هوش مصنوعی الزامی است؟
  ۱. بردار بهتر: مدل بینایی ماشین سه‌بعدی با حساسیت ۹۷.۵٪ خونریزی‌های بحرانی و سکته حاد را بدون تاخیر کشف می‌کند.
  ۲. بردار سریع‌تر: پردازش در کمتر از ۴۰ ثانیه و انتقال اسکن بحرانی به بالاترین نقطه صف کاری پزشک ظرف ۱ دقیقه.
  ۳. بردار مطمئن‌تر: مراقبت خستگی‌ناپذیر ۲۴ ساعته در ۳۶۵ روز سال به عنوان همیار هوشمند متخصصان.
  ۴. توجیه نجات جان انسان‌ها: کاهش زمان آغاز درمان سکته از ۴ ساعت به ۲۰ دقیقه در ساعات طلایی نجات جان بیماران.`;
      onChangeContent(ex);
    } else {
      const ex = `# CPMAI Slide 17 Workbook Assessment:
## Why is an AI solution needed for this project?
(Case Study 4: Radiology Urgent Triage vs First-In-First-Out Queue)

### Question 1:
**What noncognitive (non-AI) alternatives are there to solving the current business problem?**
• FIFO Reading Queue: Radiologists interpret CT and MRI scans strictly in the chronological order they are uploaded.
• Manual "Stat" Flagging: Ordering ER physicians mark scans as urgent based on outward physical triage signs.
• Night-Shift Staffing Expansion: Hiring locum radiologists to clear overnight reading backlogs.

### Question 2:
**For those alternatives, why are they not feasible for this project?**
• Why are they not feasible?
  1. Fatal Delay for Silent Symptoms: Acute intracranial hemorrhages can appear clinically subtle, sitting in queue for 4+ hours before scan review.
  2. Severe Radiologist Shortages: Rural and regional community hospitals lack 24/7 on-call subspecialists.
  3. Cognitive Fatigue: Reading 200 consecutive normal head scans drastically degrades diagnostic vigilance on scan #201.

### Question 3:
**If noncognitive alternatives are feasible, then why are they not being used for this project?**
• Why reject the existing feasible manual workflow for AI?
  1. Better: 3D Convolutional Neural Networks detect life-threatening anomalies with 97.4% sensitivity.
  2. Faster: Reprioritizes critical hemorrhage cases to the top of the reading list in under 45 seconds.
  3. More Reliable: Operates with consistent vigilance 24/7/365 without diagnostic fatigue.
  4. Clinical Impact: Cuts stroke time-to-intervention by 68%, saving lives and preventing permanent disability.`;
      onChangeContent(ex);
    }
  };

  // Evaluate AI Go/No-Go Gate
  const getGoVerdict = () => {
    if (
      testRulesFail === null &&
      testScaleExceedsHuman === null &&
      testPatternComplexity === null &&
      testDataAvailable === null &&
      testRoiJustified === null
    ) {
      return { status: 'neutral', text: text.neutralVerdict, color: 'text-[#5d6b73] dark:text-[#9aa8b0]' };
    }

    // If rules work well, or data is missing -> No-Go
    if (testRulesFail === false || testDataAvailable === false) {
      return {
        status: 'nogo',
        text: text.noGoVerdict,
        color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50'
      };
    }

    // If all positive
    if (
      testRulesFail === true &&
      testScaleExceedsHuman === true &&
      testPatternComplexity === true &&
      testDataAvailable === true &&
      testRoiJustified === true
    ) {
      return {
        status: 'go',
        text: text.goVerdict,
        color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50'
      };
    }

    // Partial/Hybrid
    return {
      status: 'caution',
      text: text.cautionVerdict,
      color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50'
    };
  };

  const verdict = getGoVerdict();

  const handleAppendGoNoGo = () => {
    const verdictBlock =
      lang === 'fa'
        ? `\n\n### پیوست دروازه تصمیم‌گیری CPMAI AI Go / No-Go (پشتیبان پرسش‌های ۲ و ۳):
• وضعیت قوانین قطعی سنتی: ${testRulesFail ? 'شکست قوانین سنتی (نیازمند هوش مصنوعی)' : testRulesFail === false ? 'قوانین سنتی پاسخگو هستند (رد هوش مصنوعی)' : 'تعیین‌نشده'}
• مقیاس و سرعت فراتر از انسان: ${testScaleExceedsHuman ? 'بله، حجم و سرعت تصمیم فراتر از توان دستی است' : 'خیر'}
• پیچیدگی الگوهای غیرخطی: ${testPatternComplexity ? 'بله، الگوها غیرخطی و چندبعدی هستند' : 'خیر'}
• در دسترس بودن داده‌های باکیفیت: ${testDataAvailable ? 'بله، داده‌های غنی و پایدار موجود است' : 'خیر (ریسک اصلی پروژه)'}
• توجیه اقتصادی و برتری ارزش: ${testRoiJustified ? 'بله، ارتقای عملکرد بر هزینه کل مالکیت می‌چربد' : 'خیر'}
• نتیجه نهایی دروازه CPMAI: ${verdict.text}`
        : `\n\n### CPMAI AI Go / No-Go Decision Gate Assessment (Supporting Questions 2 & 3):
• Deterministic Rule Feasibility: ${testRulesFail ? 'Deterministic rules fail (AI Required)' : testRulesFail === false ? 'Deterministic software suffices (No-Go for AI)' : 'Unspecified'}
• Scale Exceeds Human Capacity: ${testScaleExceedsHuman ? 'Yes, volume/speed exceeds manual staffing' : 'No'}
• Non-Linear Pattern Complexity: ${testPatternComplexity ? 'Yes, patterns are high-dimensional and non-linear' : 'No'}
• High-Quality Data Availability: ${testDataAvailable ? 'Yes, representative training data is accessible' : 'No (Fatal Project Risk)'}
• Value Uplift vs TCO: ${testRoiJustified ? 'Yes, cognitive uplift substantially exceeds AI TCO' : 'No'}
• Final Gate Recommendation: ${verdict.text}`;

    onChangeContent(content + verdictBlock);
  };

  return (
    <div className="space-y-6 sm:space-y-8" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#ffffff] dark:bg-[#172026] border border-[#1f5163]/20 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#00738c] via-[#10b981] to-[#f59e0b]" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00738c]/10 dark:bg-[#6fb3c6]/15 flex items-center justify-center text-[#00738c] dark:text-[#6fb3c6]">
              <Brain className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00738c]/10 dark:bg-[#6fb3c6]/20 text-[#00738c] dark:text-[#6fb3c6] mb-1">
                {text.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {text.slideTitle}
              </h2>
            </div>
          </div>

          {/* Top Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              type="button"
              onClick={handleInsertTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] hover:bg-[#e8ebe9] dark:hover:bg-[#25323a] text-[#1c2830] dark:text-[#e8ebe9] transition-colors border border-[#1f5163]/20 cursor-pointer"
              title={text.templateBtn}
            >
              <FileText className="w-3.5 h-3.5 text-[#00738c] dark:text-[#6fb3c6]" />
              <span>{lang === 'fa' ? 'درج قالب ۳ سوال اسلاید ۱۷' : 'Insert Slide 17 Template'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#00738c] hover:bg-[#005f73] text-white transition-colors shadow-xs cursor-pointer"
              title={text.copyBtn}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? text.copiedToast : text.copyBtn}</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          {text.slideSubtitle}
        </p>

        {/* Methodology Reminder Callout */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6] shrink-0 mt-0.5" />
          <div className="text-xs text-[#1f5163] dark:text-[#6fb3c6] leading-relaxed">
            <span className="font-bold block mb-1">
              {lang === 'fa' ? '۳ پرسش اساسی اسلاید ۱۷ کتاب کار متدولوژی CPMAI:' : 'Official CPMAI Slide 17 Questions:'}
            </span>
            <span>{text.corePromptIntro}</span>
          </div>
        </div>
      </div>

      {/* PROMINENT SHOWCASE OF THE 3 EXACT SLIDE 17 QUESTIONS */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#ffffff] via-[#f7fafc] to-[#eef6f8] dark:from-[#172026] dark:via-[#1a252c] dark:to-[#172329] border-2 border-[#00738c]/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#00738c]/15 pb-3">
          <div className="flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'پرسش‌های رسمی و دقیق اسلاید ۱۷ (Slide 17 Questions):' : 'Official Slide 17 Exact Questions:'}
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
            CPMAI Workbook Slide 17
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1f282e] border border-[#00738c]/20 shadow-2xs hover:border-[#00738c] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-[#00738c] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span className="text-xs font-bold text-[#00738c] dark:text-[#6fb3c6]">
                  {lang === 'fa' ? 'پرسش اول' : 'Question 1'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-snug mb-2 font-mono">
                "What noncognitive (non-AI) alternatives are there to solving the current business problem?"
              </p>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'چه راه‌حل‌های جایگزین غیرشناختی (غیر هوش مصنوعی) برای حل مسئله فعلی کسب‌وکار وجود دارند؟'
                  : 'Identify heuristics, rules, manual labor, or deterministic scripts used as alternatives.'}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1f282e] border border-[#00738c]/20 shadow-2xs hover:border-[#00738c] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-[#f59e0b] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span className="text-xs font-bold text-[#f59e0b] dark:text-amber-400">
                  {lang === 'fa' ? 'پرسش دوم' : 'Question 2'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-snug mb-2 font-mono">
                "For those alternatives, why are they not feasible for this project?"
              </p>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'برای آن راه‌حل‌های جایگزین، چرا برای این پروژه امکان‌پذیر (شدنی) نیستند؟'
                  : 'Explain why scale, latency, data dimensionality, or maintenance make them unfeasible.'}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1f282e] border border-[#00738c]/20 shadow-2xs hover:border-[#00738c] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-[#10b981] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </span>
                <span className="text-xs font-bold text-[#10b981] dark:text-emerald-400">
                  {lang === 'fa' ? 'پرسش سوم' : 'Question 3'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-snug mb-2 font-mono">
                "If noncognitive alternatives are feasible, then why are they not being used for this project?"
              </p>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'اگر راه‌حل‌های جایگزین غیرشناختی امکان‌پذیر هستند، پس چرا برای این پروژه از آن‌ها استفاده نمی‌شود؟'
                  : 'Firm justification via 5 Value Vectors, strategic moat, opportunity cost, and scaling.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Cognitive Value Vectors Banner (Supporting Question 3) */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#00738c]/10 via-[#10b981]/10 to-[#6366f1]/10 dark:from-[#00738c]/20 dark:via-[#10b981]/20 dark:to-[#6366f1]/20 border border-[#00738c]/20">
        <h3 className="text-xs sm:text-sm font-bold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-2 mb-2.5">
          <TrendingUp className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
          <span>{text.fiveVectorsTitle}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs text-[#1c2830] dark:text-[#e8ebe9]">
          <div className="p-2.5 rounded-lg bg-white/70 dark:bg-[#172026]/80 border border-[#1f5163]/10">
            <span className="font-bold text-[#00738c] dark:text-[#6fb3c6] block mb-0.5">۱. Better (بهتر)</span>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">{text.v1}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 dark:bg-[#172026]/80 border border-[#1f5163]/10">
            <span className="font-bold text-[#10b981] dark:text-emerald-400 block mb-0.5">۲. Faster (سریع‌تر)</span>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">{text.v2}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 dark:bg-[#172026]/80 border border-[#1f5163]/10">
            <span className="font-bold text-[#f59e0b] dark:text-amber-400 block mb-0.5">۳. Cheaper (ارزان‌تر)</span>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">{text.v3}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 dark:bg-[#172026]/80 border border-[#1f5163]/10">
            <span className="font-bold text-[#6366f1] dark:text-indigo-400 block mb-0.5">۴. More Reliable (مطمئن‌تر)</span>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">{text.v4}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/70 dark:bg-[#172026]/80 border border-[#1f5163]/10">
            <span className="font-bold text-[#ec4899] dark:text-pink-400 block mb-0.5">۵. Scalable (مقیاس‌پذیر)</span>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-normal">{text.v5}</span>
          </div>
        </div>
      </div>

      {/* Case Studies / Industry Presets Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#172026] border border-[#1f5163]/20 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'نمونه‌های آماده پاسخ به ۳ پرسش اسلاید ۱۷ بر اساس صنایع واقعی:' : 'Real-World 3-Question Case Studies (Click to Load):'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={handleExampleMovie}
            className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] hover:bg-[#e3eef1] dark:hover:bg-[#1b2c32] text-start border border-[#1f5163]/15 transition-all group cursor-pointer"
          >
            <Film className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block leading-tight">
                {lang === 'fa' ? 'پیشنهادگر فیلم و مدیا' : 'Streaming Media Recs'}
              </span>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-tight block mt-1">
                {lang === 'fa' ? '۱۰ فیلم برتر در برابر هوش مصنوعی عمیق' : 'Top-10 vs Deep 2-Tower'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExampleChurn}
            className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] hover:bg-[#e3eef1] dark:hover:bg-[#1b2c32] text-start border border-[#1f5163]/15 transition-all group cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#10b981] dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block leading-tight">
                {lang === 'fa' ? 'ریزش مشتریان بانکی' : 'Banking Customer Churn'}
              </span>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-tight block mt-1">
                {lang === 'fa' ? 'فیلتر اکسل در برابر پیش‌بینی ML' : 'Excel rules vs LightGBM'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExampleFraud}
            className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] hover:bg-[#e3eef1] dark:hover:bg-[#1b2c32] text-start border border-[#1f5163]/15 transition-all group cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#f59e0b] dark:text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block leading-tight">
                {lang === 'fa' ? 'کشف تقلب پرداخت' : 'Payment Fraud Triage'}
              </span>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-tight block mt-1">
                {lang === 'fa' ? 'آستانه ایستا در برابر گراف AI' : 'Hardcoded rules vs Graph AI'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExampleHealth}
            className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] hover:bg-[#e3eef1] dark:hover:bg-[#1b2c32] text-start border border-[#1f5163]/15 transition-all group cursor-pointer"
          >
            <Activity className="w-4 h-4 text-[#6366f1] dark:text-indigo-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block leading-tight">
                {lang === 'fa' ? 'تریاژ تصویربرداری پزشکی' : 'Radiology Urgent Triage'}
              </span>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-tight block mt-1">
                {lang === 'fa' ? 'صف زمانی دستی در برابر بینایی AI' : 'FIFO queue vs Vision CNN'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Structured 3-Question Builder Accordion / Toggle */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#172026] border border-[#1f5163]/20 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
              <span>{text.builderTitle}</span>
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
              {text.builderSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBuilder(!showBuilder)}
            className="text-xs text-[#00738c] dark:text-[#6fb3c6] hover:underline font-medium cursor-pointer"
          >
            {showBuilder ? (lang === 'fa' ? 'بستن فرم سازنده' : 'Collapse Builder') : (lang === 'fa' ? 'نمایش فرم سازنده' : 'Expand Builder')}
          </button>
        </div>

        {showBuilder && (
          <div className="space-y-4 pt-2">
            {/* Input 1: Question 1 */}
            <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#00738c]/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#00738c] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  1
                </span>
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {text.question1Title}
                </label>
              </div>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2 leading-relaxed">
                {text.question1Sub}
              </p>
              <textarea
                value={q1Alternatives}
                onChange={(e) => setQ1Alternatives(e.target.value)}
                placeholder={text.question1Placeholder}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-white dark:bg-[#172026] text-[#1c2830] dark:text-[#e8ebe9] border border-[#1f5163]/20 focus:outline-hidden focus:border-[#00738c] dark:focus:border-[#6fb3c6] resize-y"
              />
            </div>

            {/* Input 2: Question 2 */}
            <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#f59e0b]/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  2
                </span>
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {text.question2Title}
                </label>
              </div>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2 leading-relaxed">
                {text.question2Sub}
              </p>
              <textarea
                value={q2WhyNotFeasible}
                onChange={(e) => setQ2WhyNotFeasible(e.target.value)}
                placeholder={text.question2Placeholder}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-white dark:bg-[#172026] text-[#1c2830] dark:text-[#e8ebe9] border border-[#1f5163]/20 focus:outline-hidden focus:border-[#00738c] dark:focus:border-[#6fb3c6] resize-y"
              />
            </div>

            {/* Input 3: Question 3 */}
            <div className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#10b981]/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  3
                </span>
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {text.question3Title}
                </label>
              </div>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2 leading-relaxed">
                {text.question3Sub}
              </p>
              <textarea
                value={q3WhyNotUsedIfFeasible}
                onChange={(e) => setQ3WhyNotUsedIfFeasible(e.target.value)}
                placeholder={text.question3Placeholder}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-white dark:bg-[#172026] text-[#1c2830] dark:text-[#e8ebe9] border border-[#1f5163]/20 focus:outline-hidden focus:border-[#00738c] dark:focus:border-[#6fb3c6] resize-y"
              />
            </div>

            <button
              type="button"
              onClick={handleApplyBuilder}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#00738c] hover:bg-[#005f73] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{text.applyBuilderBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Interactive AI Go / No-Go Decision Gate */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#172026] border border-[#1f5163]/20 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.goNoGoTitle}
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {text.goNoGoSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {/* Question 1 */}
          <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#1f5163]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9]">
                {text.q1}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestRulesFail(true)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testRulesFail === true
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'خیر، قوانین شکست می‌خورند' : 'No, Rules Fail'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestRulesFail(false)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testRulesFail === false
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'بله، قوانین پاسخگو هستند' : 'Yes, Rules Suffice'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 italic">
              {text.q1Note}
            </p>
          </div>

          {/* Question 2 */}
          <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#1f5163]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9]">
                {text.q2}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestScaleExceedsHuman(true)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testScaleExceedsHuman === true
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'بله، فراتر از توان انسانی است' : 'Yes, Exceeds Human'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestScaleExceedsHuman(false)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testScaleExceedsHuman === false
                      ? 'bg-gray-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'خیر، کارمندان دستی می‌رسند' : 'No, Manual Suffices'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 italic">
              {text.q2Note}
            </p>
          </div>

          {/* Question 3 */}
          <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#1f5163]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9]">
                {text.q3}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestPatternComplexity(true)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testPatternComplexity === true
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'بله، الگوها غیرخطی هستند' : 'Yes, Non-Linear Patterns'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestPatternComplexity(false)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testPatternComplexity === false
                      ? 'bg-gray-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'خیر، خطی و ساده هستند' : 'No, Simple Linear'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 italic">
              {text.q3Note}
            </p>
          </div>

          {/* Question 4 */}
          <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#1f5163]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9]">
                {text.q4}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestDataAvailable(true)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testDataAvailable === true
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'بله، داده باکیفیت داریم' : 'Yes, Data Ready'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestDataAvailable(false)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testDataAvailable === false
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'خیر، داده کافی نداریم' : 'No Data Available'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 italic">
              {text.q4Note}
            </p>
          </div>

          {/* Question 5 */}
          <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#1f282e] border border-[#1f5163]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9]">
                {text.q5}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestRoiJustified(true)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testRoiJustified === true
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'بله، ارزش بیش از هزینه است' : 'Yes, High Value Uplift'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestRoiJustified(false)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    testRoiJustified === false
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white dark:bg-[#172026] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-100'
                  }`}
                >
                  {lang === 'fa' ? 'خیر، هزینه هوش مصنوعی بیشتر است' : 'No, Costs Exceed Value'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 italic">
              {text.q5Note}
            </p>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className={`mt-4 p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${verdict.color}`}>
          <div className="flex items-center gap-2.5">
            {verdict.status === 'go' && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            {verdict.status === 'nogo' && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />}
            {verdict.status === 'caution' && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />}
            {verdict.status === 'neutral' && <HelpCircle className="w-5 h-5 text-[#5d6b73] dark:text-[#9aa8b0] shrink-0" />}
            <span className="text-xs sm:text-sm font-bold leading-tight">
              {verdict.text}
            </span>
          </div>

          {verdict.status !== 'neutral' && (
            <button
              type="button"
              onClick={handleAppendGoNoGo}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 transition-colors shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              {text.appendTestToCanvas}
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Canvas Textarea */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] dark:bg-[#172026] border border-[#1f5163]/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.canvasTitle}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            <span>
              {wordCount} {text.wordCount}
            </span>
            <span>•</span>
            <span>
              {charCount} {text.charCount}
            </span>
            <button
              type="button"
              onClick={() => onChangeContent('')}
              className="hover:text-rose-500 transition-colors ml-2 cursor-pointer"
              title={text.clearBtn}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder={text.canvasPlaceholder}
          rows={16}
          className="w-full text-xs sm:text-sm p-4 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border border-[#1f5163]/20 focus:outline-hidden focus:border-[#00738c] dark:focus:border-[#6fb3c6] transition-colors leading-relaxed font-mono"
        />

        {/* Bottom PMI Copyright Notice matching Slide 17 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#1f5163]/10 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
          <span>{text.pmiCopyright}</span>
          <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">
            {lang === 'fa' ? 'اسلاید ۱۷ کتاب کار رسمی CPMAI' : 'CPMAI Official Course Slide 17'}
          </span>
        </div>
      </div>

      {/* Navigation Return Button to Page 6 & Forward to Page 8 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20">
        <button
          type="button"
          onClick={onGoToPage6}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#ffffff] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228] transition-colors shadow-xs cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{text.prevPageBtn}</span>
        </button>

        {onGoToPage8 && (
          <button
            type="button"
            onClick={onGoToPage8}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-sm cursor-pointer"
          >
            <span>{text.nextPageBtn}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
