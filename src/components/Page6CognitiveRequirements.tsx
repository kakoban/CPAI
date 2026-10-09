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
  Film,
  Users,
  ShieldAlert
} from 'lucide-react';

interface Page6Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage5: () => void;
  onGoToPage7?: () => void;
}

export const Page6CognitiveRequirements: React.FC<Page6Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage5,
  onGoToPage7
}) => {
  const [copied, setCopied] = useState(false);
  const [showGoNoGoTool, setShowGoNoGoTool] = useState(false);

  // Structured breakdown inputs for the 4 requirements
  const [currentNoncognitive, setCurrentNoncognitive] = useState('');
  const [additionalNoncognitive, setAdditionalNoncognitive] = useState('');
  const [disadvantagesNoncognitive, setDisadvantagesNoncognitive] = useState('');
  const [cognitiveJustification, setCognitiveJustification] = useState('');

  // AI Go / No-Go Test Checklist state
  const [testRulesFail, setTestRulesFail] = useState<boolean | null>(null);
  const [testScaleExceedsHuman, setTestScaleExceedsHuman] = useState<boolean | null>(null);
  const [testPatternComplexity, setTestPatternComplexity] = useState<boolean | null>(null);
  const [testDataAvailable, setTestDataAvailable] = useState<boolean | null>(null);
  const [testRoiJustified, setTestRoiJustified] = useState<boolean | null>(null);

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 6 of 8 (Slide 16: Cognitive Project Requirements)',
      taskGroupLabel: 'Task Group: Cognitive Project Requirements',
      taskGroupDesc:
        'In this set of tasks, we address business understanding objectives that are specifically relevant to cognitive projects. Not all business requirements need to be met with cognitive projects when simpler or more direct or more programmatic/deterministic/heuristic methods apply. The objective in this task group is to uncover those cognitive relevant requirements, assess the AI Go/No-Go test and additional needs to help sharpen the cognitive requirements and uncover additional considerations for AI projects.',
      taskTitle: 'Task: Cognitive Requirements',
      descTitle: 'Description & Task Artifacts',
      descText:
        'The goal of this section is to make it clear what and how the cognitive solution will be relevant to the business objectives. How is the business objective being addressed currently? In what ways would noncognitive approaches solve this problem? Would those noncognitive approaches solve this problem equally well? If not, in what ways would machine-based cognitive approaches solve it better? What would the cognitive solution need to do in order to solve the problem better than noncognitive approaches?',
      heuristicCalloutTitle: 'Noncognitive / Heuristic Approach Definition:',
      heuristicCalloutText:
        'A heuristic approach is a simple, straightforward way of accomplishing something that represents the baseline, noncognitive approach. Some people refer to heuristic as "quick and dirty" while others simply consider it to be the simple, obvious method, or others think of it as the brute-force approach, depending on the situation. For example, if the goal is to develop a system to provide movie recommendations, the noncognitive heuristic approach might be to simply present the top 10 list of most popular movies. In another example, if the solution is to replace human effort to do a similar task, then the heuristic approach might be simply that same human effort.',
      cognitiveGoalTitle: 'Benchmark & The Good-Enough Principle:',
      cognitiveGoalText:
        'The goal of a cognitive solution is to do the task better, faster, cheaper, more reliably, or more scalable than the heuristic approach. In this task, identify the heuristic approach if it exists. If not, determine what the heuristic approach could be. In some instances, simply defining a heuristic approach may make the need for a cognitive approach unnecessary as it may not be effective to replace a "good enough" noncognitive solution.',
      fourTasksTitle: 'For this task (Core Action Items):',
      req1: '1. List the current, noncognitive approaches used to address the current task.',
      req2: '2. List any additional noncognitive approaches that could be "good enough" to use to meet the requirements.',
      req3: '3. List the specific disadvantages of these noncognitive approaches in terms of cost, effort, complexity, scalability, time, or other considerations that any cognitive approach would need to improve upon.',
      req4: '4. If the noncognitive approaches are indeed good enough, provide a firm justification for why a cognitive approach is required.',
      templateBtn: 'Insert Cognitive Requirements Template',
      exampleMovieBtn: 'Example 1: Recommendation Engine (Movie Top-10 vs AI)',
      exampleChurnBtn: 'Example 2: Churn & Retention (Static Rules vs ML)',
      exampleFraudBtn: 'Example 3: Fraud Detection (Hardcoded Thresholds vs AI)',
      goNoGoBtn: 'Interactive AI Go/No-Go Decision Test',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      canvasPlaceholder:
        'Write or generate your cognitive requirements assessment here. Compare the noncognitive/heuristic baseline against the cognitive machine learning solution...',
      prevPageBtn: 'Previous Page: Expected ROI (Page 5)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      tipsTitle: 'Key CPMAI Methodology Guidance for Cognitive Requirements:',
      tip1:
        'Always establish the Heuristic Baseline first: Never benchmark an AI model against 0% accuracy; benchmark it against the existing rule-of-thumb or human baseline.',
      tip2:
        'Avoid "AI for AI\'s sake": If a deterministic SQL rule, regular expression, or static top-10 list solves 90% of the business need with zero GPU costs, cognitive approaches may be a wasteful over-engineering.',
      tip3:
        'Quantify the 5 Value Vectors: How does the cognitive approach win? (1) Better precision, (2) Faster response time, (3) Lower unit cost at volume, (4) Higher operational reliability, or (5) Infinite scalability.',
      tip4:
        'Firm Justification Gate: If noncognitive is "good enough" for low volumes, identify the tipping point (e.g. at 50,000+ daily transactions, human rule maintenance becomes mathematically impossible).',
      goNoGoTitle: 'CPMAI AI Go / No-Go Quick Assessment Test',
      goNoGoSubtitle: 'Determine if this business requirement genuinely necessitates an AI / Cognitive system:',
      q1: 'Can this problem be solved accurately using fixed deterministic rules or simple if-then logic?',
      q1Note: 'If YES, deterministic software is preferred over AI (No-Go for AI).',
      q2: 'Does the volume, velocity, or nuance of decisions exceed human / manual capacity?',
      q2Note: 'If YES, cognitive automation provides essential scalability.',
      q3: 'Are the underlying patterns non-linear, multi-modal, or too high-dimensional for humans to hand-craft?',
      q3Note: 'If YES, machine learning patterns are required.',
      q4: 'Is high-quality representative historical data available or obtainable for training/inference?',
      q4Note: 'If NO, AI will fail; you must iterate on data first.',
      q5: 'Will the cognitive uplift (better, faster, cheaper) significantly exceed the total cost of ownership of AI?',
      q5Note: 'If YES, cognitive project is financially justified.',
      goVerdict: 'AI GO: High cognitive justification. Proceed with machine learning approach.',
      noGoVerdict: 'AI NO-GO / RE-EVALUATE: Heuristic or deterministic approach is superior or prerequisites not met.',
      neutralVerdict: 'Answer the questions above to determine the CPMAI AI Go/No-Go recommendation.',
      appendTestToCanvas: 'Append Assessment Summary to Canvas'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۶ از ۸ (اسلاید ۱۶: الزامات پروژه‌های شناختی)',
      taskGroupLabel: 'گروه وظایف: الزامات پروژه‌های شناختی (Task Group: Cognitive Project Requirements)',
      taskGroupDesc:
        'در این مجموعه وظایف، به اهداف مربوط به درک کسب‌وکار می‌پردازیم که مشخصاً مختص پروژه‌های شناختی (هوش مصنوعی) هستند. همه نیازمندی‌های کسب‌وکار لزوماً نیازی به حل با پروژه‌های شناختی ندارند، به‌ویژه زمانی که روش‌های ساده‌تر، مستقیم‌تر، برنامه‌نویسی‌شده، قطعی (Deterministic) یا اکتشافی/هیوریستیک (Heuristic) قابل اعمال باشند. هدف از این گروه وظایف، شناسایی آن دسته از نیازمندی‌های مرتبط با حوزه شناختی، ارزیابی آزمون تایید/رد هوش مصنوعی (AI Go/No-Go Test) و سایر نیازهای تکمیلی جهت شفاف‌سازی الزامات شناختی و کشف ملاحظات مضاعف پروژه‌های هوش مصنوعی است.',
      taskTitle: 'وظیفه: الزامات شناختی (Task: Cognitive Requirements)',
      descTitle: 'شرح و مصنوعات وظیفه (Description & Task Artifacts)',
      descText:
        'هدف این بخش آن است که کاملاً مشخص شود راه‌حل شناختی چگونه و تا چه اندازه به اهداف کسب‌وکار مرتبط خواهد بود. این هدف کسب‌وکار در حال حاضر چگونه حل و مدیریت می‌شود؟ روش‌های غیرشناختی چگونه می‌توانند این مسئله را حل کنند؟ آیا این روش‌های غیرشناختی می‌توانند مسئله را به همان خوبی حل کنند؟ اگر خیر، راه‌حل‌های شناختی مبتنی بر ماشین به چه شیوه‌هایی آن را بهتر حل می‌کنند؟ راه‌حل شناختی به چه اقداماتی نیاز دارد تا بتواند مسئله را بهتر از رویکردهای غیرشناختی حل کند؟',
      heuristicCalloutTitle: 'تعریف رویکرد غیرشناختی / اکتشافی (Noncognitive / Heuristic Approach):',
      heuristicCalloutText:
        'رویکرد هیوریستیک (اکتشافی)، یک روش ساده و سرراست برای انجام یک کار است که خط مبنا (Baseline) و رویکرد غیرشناختی را تشکیل می‌دهد. برخی افراد رویکرد هیوریستیک را «سریع و دم‌دستی» (Quick and dirty) می‌نامند، در حالی که دیگران آن را صرفاً روش بدیهی و ساده دانسته، یا بسته به موقعیت، آن را رویکرد سنتی یا سرانگشتی (Brute-force) قلمداد می‌کنند. به عنوان مثال، اگر هدف توسعه سیستمی برای پیشنهاد فیلم به کاربران باشد، رویکرد غیرشناختی هیوریستیک ممکن است صرفاً نمایش لیست ۱۰ فیلم برتر و پرطرفدار اخیر باشد. در مثالی دیگر، اگر قرار است زحمت و تلاش انسانی جایگزین شود، رویکرد هیوریستیک می‌تواند دقیقاً همان کار دستی کارشناسان انسانی باشد.',
      cognitiveGoalTitle: 'معیار موفقیت و اصل «به اندازه کافی خوب» (The Good-Enough Principle):',
      cognitiveGoalText:
        'هدف یک راه‌حل شناختی این است که وظیفه را بهتر، سریع‌تر، ارزان‌تر، مطمئن‌تر یا با مقیاس‌پذیری بیشتری نسبت به رویکرد هیوریستیک انجام دهد. در این وظیفه، اگر رویکرد هیوریستیک وجود دارد آن را شناسایی کنید؛ و اگر وجود ندارد، مشخص کنید چه رویکرد هیوریستیکی می‌تواند وجود داشته باشد. در پاره‌ای از موارد، صرفاً تعریف رویکرد هیوریستیک ممکن است نیاز به راه‌حل شناختی را به‌کلی منتفی سازد، چرا که جایگزین کردن یک راه‌حل غیرشناختی که «به اندازه کافی خوب» است، صرفه اقتصادی و منطقی نخواهد داشت.',
      fourTasksTitle: 'اقدامات اصلی این وظیفه (For this task):',
      req1: '۱. فهرست کردن رویکردهای غیرشناختی فعلی که برای رفع این وظیفه استفاده می‌شوند.',
      req2: '۲. فهرست کردن هرگونه رویکرد غیرشناختی تکمیلی که می‌تواند «به اندازه کافی خوب» باشد تا نیازمندی‌ها را برآورده کند.',
      req3: '۳. فهرست کردن معایب و نقاط ضعف مشخص این رویکردهای غیرشناختی از نظر هزینه، تلاش، پیچیدگی، مقیاس‌پذیری، زمان یا سایر ملاحظاتی که هر راه‌حل شناختی ملزم به بهبود آن‌هاست.',
      req4: '۴. اگر رویکردهای غیرشناختی در واقع به اندازه کافی خوب هستند، ارائه توجیه قاطع و مستدل برای این که چرا یک راه‌حل شناختی مورد نیاز است.',
      templateBtn: 'درج قالب الزامات شناختی و خط مبنای هیوریستیک',
      exampleMovieBtn: 'نمونه ۱: موتور پیشنهادگر فیلم (۱۰ فیلم برتر هیوریستیک در برابر هوش مصنوعی)',
      exampleChurnBtn: 'نمونه ۲: پیش‌بینی ریزش مشتری (قوانین اکسل دستی در برابر مدل یادگیری ماشین)',
      exampleFraudBtn: 'نمونه ۳: کشف تقلب و ریسک (آستانه‌های ایستا در برابر یادگیری ماشین بی‌درنگ)',
      goNoGoBtn: 'ابزار تعاملی ارزیابی آزمون AI Go / No-Go',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      canvasPlaceholder:
        'تحلیل الزامات شناختی و خط مبنای غیرشناختی خود را در اینجا بنویسید یا از دکمه‌های قالب و نمونه استفاده نمایید...',
      prevPageBtn: 'صفحه قبل: برآورد نرخ بازگشت سرمایه ROI (صفحه ۵)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای وظیفه الزامات شناختی:',
      tip1:
        'همیشه خط مبنای اکتشافی (Heuristic Baseline) را تعریف کنید: دقت مدل هوش مصنوعی را هرگز با صفر درصد مقایسه نکنید؛ بلکه آن را با عملکرد رویه دستی، اکسل فعلی یا قانون سرانگشتی موجود مقایسه نمایید.',
      tip2:
        'از تله «هوش مصنوعی صرفاً برای هوش مصنوعی» بپرهیزید: اگر یک کوئری ساده SQL یا لیست ۱۰ تایی محبوب‌ترین‌ها ۹۰٪ خواسته کسب‌وکار را با هزینه صفر تأمین می‌کند، ساخت سیستم هوش مصنوعی اسراف منابع است.',
      tip3:
        'برد هوش مصنوعی را در پنج محور اصلی بسنجید: (۱) دقت بهتر، (۲) سرعت پاسخگویی بالاتر، (۳) هزینه واحد کمتر در تیراژ بالا، (۴) قابلیت اطمینان و ثبات رفتاری، یا (۵) مقیاس‌پذیری نامحدود.',
      tip4:
        'گیت توجیه قاطع (Firm Justification): اگر راه‌حل دستی برای امروز کافی است، نقطه عطف (Tipping Point) را مشخص کنید (مثلاً عبور از ۵۰ هزار تراکنش در روز که نیروی انسانی دیگر قادر به کنترل آن نیست).',
      goNoGoTitle: 'چک‌لیست آزمون تصمیم‌گیری هوش مصنوعی (AI Go / No-Go Decision Test)',
      goNoGoSubtitle: 'بررسی این که آیا این نیازمندی تجاری واقعاً نیاز به سامانه هوش مصنوعی/شناختی دارد:',
      q1: 'آیا این مسئله با قوانین قطعی و ثابت برنامه‌نویسی (If-Then) یا فرمول ریاضی با دقت کافی قابل حل است؟',
      q1Note: 'اگر بله، رویکرد نرم‌افزاری کلاسیک برتر از هوش مصنوعی است (رد نیاز به هوش مصنوعی).',
      q2: 'آیا حجم، سرعت یا پیچیدگی تصمیمات از توان پردازش نیروی انسانی فراتر رفته است؟',
      q2Note: 'اگر بله، اتوماسیون شناختی مقیاس‌پذیری حیاتی ایجاد می‌کند.',
      q3: 'آیا الگوهای پنهان داده غیرخطی، چندوجهی یا بسیار پیچیده‌اند به‌طوری‌که انسان نتواند دستی فرموله کند؟',
      q3Note: 'اگر بله، یادگیری الگو توسط الگوریتم ماشین الزامی است.',
      q4: 'آیا داده‌های باکیفیت و معرف گذشته در دسترس است یا امکان جمع‌آوری آن وجود دارد؟',
      q4Note: 'اگر خیر، پروژه شکست خواهد خورد و باید ابتدا به آماده‌سازی داده پرداخت.',
      q5: 'آیا ارزش افزوده شناختی (بهتر، سریع‌تر، ارزان‌تر) به‌طور چشمگیری از کل هزینه‌های هوش مصنوعی بیشتر است؟',
      q5Note: 'اگر بله، توجیه اقتصادی و تجاری هوش مصنوعی احراز شده است.',
      goVerdict: 'تایید هوش مصنوعی (AI GO): توجیه شناختی قوی است. توسعه پروژه هوش مصنوعی مجاز است.',
      noGoVerdict: 'عدم تایید / بازنگری (AI NO-GO): رویکرد هیوریستیک یا قطعی کافی است و یا پیش‌نیازهای داده فراهم نیست.',
      neutralVerdict: 'برای مشاهده نتیجه آزمون تصمیم‌گیری، به پرسش‌های ۵گانه بالا پاسخ دهید.',
      appendTestToCanvas: 'پیوست خلاصه ارزیابی به انتهای بوم'
    }
  }[lang];

  // Templates & Examples
  const insertTemplate = () => {
    const tmpl =
      lang === 'fa'
        ? `=== بوم تحلیل الزامات پروژه‌های شناختی (CPMAI Cognitive Requirements) ===

۱. رویکردهای غیرشناختی فعلی (Current Noncognitive Approaches):
- روش جاری سازمان برای حل این مسئله: [مثال: بررسی دستی کارشناس / قوانین شرطی ساده در اکسل / اعمال میانگین تاریخی]
- خط مبنای عملکرد (Baseline): [مثال: بررسی ۴۰ پرونده در روز با خطای ۱۵٪]
- منابع انسانی و هزینه‌ای درگیر: [تعداد کارشناسان و ابزارهای فعلی]

۲. رویکردهای غیرشناختی تکمیلی که ممکن است «به اندازه کافی خوب» باشند (Additional "Good Enough" Noncognitive Approaches):
- رویکرد هیوریستیک شماره ۱: [مثال: دسته‌بندی بر اساس ۳ قانون آستانه‌ای ساده]
- رویکرد هیوریستیک شماره ۲: [مثال: نمایش ۱۰ مورد برتر/محبوب‌ترین بر اساس آمار کلی]
- ارزیابی کفایت: آیا این روش‌ها برای فاز فعلی بدون نیاز به یادگیری ماشین پاسخگو هستند؟ [بله / خیر با دلیل]

۳. معایب مشخص رویکردهای غیرشناختی (Specific Disadvantages of Noncognitive Approaches):
- از نظر هزینه (Cost): [هزینه بالای دستمزد ساعتی پرسنل یا خطاهای تجاری]
- از نظر تلاش و زمان (Effort & Time): [تأخیر چندین روزه در پردازش و نیاز مداوم به بازبینی دستی قوانین]
- از نظر پیچیدگی (Complexity): [شکست قوانین شرطی در برابر الگوهای چندبعدی و متغیرهای پنهان]
- از نظر مقیاس‌پذیری (Scalability): [ناتوانی در پردازش همزمان حجم انبوه تراکنش‌ها و کاربران]

۴. توجیه قاطع برای لزوم راه‌حل شناختی (Firm Justification for Cognitive Approach):
- راه‌حل شناختی در چه ابعادی بهتر، سریع‌تر، ارزان‌تر، مطمئن‌تر یا مقیاس‌پذیرتر عمل می‌کند؟:
  * بهتر (Better): [پیش‌بینی دقیق‌تر با کشف ارتباطات غیرخطی]
  * سریع‌تر (Faster): [پاسخ در کمتر از ۲۰۰ میلی‌ثانیه به جای ساعت‌ها]
  * ارزان‌تر (Cheaper): [کاهش ۹۰ درصدی هزینه هر تراکنش در مقیاس بالا]
  * مطمئن‌تر (More Reliable): [حذف خطای انسانی، خستگی ذهنی و اعمال سلیقه فردی]
  * مقیاس‌پذیرتر (More Scalable): [پشتیبانی از میلیون‌ها رخداد بدون افزایش خطی پرسنل]
- نتیجه ارزیابی AI Go/No-Go: [Go / ادامه پروژه با هوش مصنوعی تأیید شد]`
        : `=== CPMAI Cognitive Project Requirements Canvas ===

1. Current Noncognitive Approaches:
- Current organization method: [e.g. Manual specialist review / static spreadsheet rules / historical averages]
- Performance baseline: [e.g. 40 reviews/day with ~15% human discrepancy]
- Current headcount & cost involved: [Staff hours and tooling cost]

2. Additional "Good Enough" Noncognitive Approaches:
- Heuristic alternative 1: [e.g. Static threshold-based rules engine]
- Heuristic alternative 2: [e.g. Top-10 global popularity ranking]
- Adequacy assessment: Could this noncognitive approach suffice for the immediate phase? [Yes/No with rationale]

3. Specific Disadvantages of Noncognitive Approaches:
- Cost: [High labor overhead, costly false negatives]
- Effort & Time: [Multi-day processing delays, constant manual rule upkeep]
- Complexity: [Deterministic rules break down when dealing with high-dimensional nonlinear patterns]
- Scalability: [Cannot scale to hundreds of thousands of concurrent requests]

4. Firm Justification for Cognitive Solution (AI Go/No-Go):
- How the cognitive approach wins (Better, Faster, Cheaper, More Reliable, More Scalable):
  * Better: Uncovers latent multi-factor patterns inaccessible to human rule-making.
  * Faster: Real-time inference under 150ms vs 48-hour manual batch review.
  * Cheaper: Reduces unit decision cost by 85% at production volume.
  * More Reliable: Consistent rule-independent scoring without decision fatigue.
  * More Scalable: Seamlessly handles 100x traffic spikes.
- AI Go/No-Go Decision Gate: [AI GO confirmed — Heuristic baseline insufficient for business objectives]`;

    onChangeContent(tmpl);
  };

  const fillMovieExample = () => {
    const ex =
      lang === 'fa'
        ? `=== نمونه موردی: سیستم پیشنهاد محتوا و فیلم (سرویس VOD / استریمینگ) ===

۱. رویکردهای غیرشناختی فعلی (Current Noncognitive Approaches):
- روش جاری: تهیه فهرست دستی هفتگی توسط تیم سردبیری (Curated Editorial Lists) و نمایش ۱۰ فیلم پربیننده اخیر (Top 10 Most Popular).
- خط مبنای عملکرد (Baseline): نرخ کلیک (CTR) فهرست‌های سردبیری حدود ۳.۲٪ است و بیش از ۷۰٪ از آرشیو هزاران عنوان فیلم هرگز دیده نمی‌شوند (The Cold Catalog Problem).

۲. رویکردهای غیرشناختی تکمیلی که ممکن است «به اندازه کافی خوب» باشند:
- رویکرد هیوریستیک جایگزین: مرتب‌سازی فیلم‌ها بر اساس امتیاز کاربران (IMDb/داخلی) و فیلتر ساده بر اساس آخرین ژانر تماشاشده کاربر (مثلاً اگر فیلم کمدی دید، ۳ فیلم پرامتیاز کمدی بعدی را نشان بده).
- ارزیابی کفایت: این روش برای استارتاپ کوچک با ۱۰۰ فیلم «به اندازه کافی خوب» است؛ اما با رشد آرشیو به بیش از ۱۰ هزار فیلم و افزایش تنوع سلیقه کاربران، رضایت کاربر را تأمین نمی‌کند.

۳. معایب مشخص رویکرد غیرشناختی (Disadvantages):
- هزینه و تلاش: نیاز به تیم دائمی تولید محتوا برای برچسب‌گذاری و چیدمان دستی مداوم بنرها.
- پیچیدگی: ناتوانی در ترکیب چندبعدی علایق (مثلاً کاربری که عصرها مستند علمی می‌بیند اما آخر هفته‌ها فیلم اکشن خانوادگی).
- مقیاس‌پذیری: محتوای پیشنهادی برای همه کاربران یکسان است و امکان شخصی‌سازی برای ۳ میلیون کاربر همزمان وجود ندارد.

۴. توجیه قاطع برای استفاده از راه‌حل شناختی (Firm Justification):
- راه‌حل شناختی (Collaborative & Content-based Embeddings / Deep Retrieval):
  * بهتر (Better): افزایش نرخ کلیک و تماشا تا ۹.۸٪ و احیای دم دراز محتوا (Long Tail).
  * سریع‌تر و بی‌درنگ (Faster): به‌روزرسانی سبد پیشنهادات بلافاصله پس از هر تعامل در کمتر از ۵۰ میلی‌ثانیه.
  * مقیاس‌پذیرتر (More Scalable): رتبه‌بندی بلادرنگ ۱۰ هزار عنوان فیلم متناسب با سلیقه میلیون‌ها کاربر منحصر‌به‌فرد.
- نتیجه آزمون AI Go/No-Go: تأیید شد (AI GO) - فراتر از ظرفیت هر رویکرد هیوریستیک یا فرمول‌نویسی دستی.`
        : `=== Case Example: Video Streaming Recommendation Engine ===

1. Current Noncognitive Approaches:
- Baseline: Static Top-10 Most Popular movies row + weekly editorial curated playlists.
- Metric baseline: 3.2% click-through rate (CTR); 75% of catalog titles remain undiscovered.

2. Additional "Good Enough" Noncognitive Approaches:
- Heuristic alternative: Rule-based category matching (if user last watched "Action", show highest-rated action films).
- Adequacy check: Good enough for small catalogs (<200 films), but severely inadequate for large media platforms with diverse sub-genres.

3. Disadvantages of Noncognitive Approaches:
- Cost/Effort: Requires ongoing editorial manual curation.
- Complexity: Fails to detect cross-genre affinities, temporal mood shifts, or subtle behavioral signals.
- Scalability: Provides one-size-fits-all suggestions; cannot personalize for 2M+ active subscribers.

4. Firm Justification for Cognitive Solution (AI GO):
- Machine learning matrix factorization & deep embeddings enable hyper-personalized rankings in <50ms.
- Cognitive solution delivers: (1) 3x improvement in user engagement (from 3.2% to 9.8%), (2) 40% reduction in customer churn, (3) discovery of the long-tail catalog.
- Decision: AI GO validated.`;

    onChangeContent(ex);
  };

  const fillChurnExample = () => {
    const ex =
      lang === 'fa'
        ? `=== نمونه موردی: شناسایی پیشگیرانه ریزش مشتریان بانکداری خرد ===

۱. رویکردهای غیرشناختی فعلی (Current Noncognitive Approaches):
- روش جاری: گزارش فصلی اکسل از مشتریانی که بیش از ۵۰٪ موجودی سپرده‌شان در یک ماه افت کرده است، به همراه تماس بازاریابی شعب پس از بسته شدن حساب.
- خط مبنای عملکرد (Baseline): شناسایی دیرهنگام (Post-Mortem)؛ تنها ۸٪ از مشتریان منصرف می‌شوند زیرا تصمیم خود را از قبل نهایی کرده‌اند.

۲. رویکردهای غیرشناختی تکمیلی که ممکن است «به اندازه کافی خوب» باشند:
- رویکرد هیوریستیک جایگزین: تدوین ماتریس ۵ شرطی در نرم‌افزار انبار داده (مثلاً: عدم ورود به همراه کارت در ۳۰ روز اخیر + کاهش تراکنش کارتخوان + سن زیر ۴۰ سال).
- ارزیابی کفایت: اگرچه ساده است، اما هشدارهای نادرست (False Positives) بالای ۶۵٪ تولید می‌کند و بودجه شعب را در تماس‌های بی‌مورد هدر می‌دهد.

۳. معایب مشخص رویکرد غیرشناختی:
- زمان و تأخیر: واکنش پس از وقوع واقعه؛ رویکرد غیرشناختی نمی‌تواند نشانه‌های خاموش ۶۰ روز قبل از خروج را ردیابی کند.
- پیچیدگی غیرخطی: رفتار مالی مدرن چندعاملی است (تغییر دراریز حقوق، کاهش تراکنش‌های خرد، تغییر در زمان استفاده از درگاه) و با شروط ساده If-Then قابل فرمول‌بندی نیست.
- هزینه ناشی از فرسایش مشتریان: سالانه صدها میلیارد ریال سپرده ارزان‌قیمت از دست می‌رود.

۴. توجیه قاطع برای راه‌حل شناختی (Cognitive Justification):
- مدل یادگیری ماشین (Gradient Boosted Survival Analysis):
  * ۶۰ روز قبل از اقدام به بستن حساب، احتمال ریزش را با دقت ۸۳٪ پیش‌بینی می‌کند.
  * مداخله هوشمند خودکار (ارائه بسته وفاداری شخصی‌سازی‌شده) نرخ ریزش را از ۱۸٪ به ۱۱٪ کاهش می‌دهد.
- نتیجه آزمون AI Go/No-Go: تأیید شد (AI GO) - رویکرد هیوریستیک هزینه پنهان کلانی به دلیل خطای بالا دارد.`
        : `=== Case Example: Retail Banking Customer Churn Prevention ===

1. Current Noncognitive Approaches:
- Baseline: Monthly spreadsheet export flagging accounts with >50% balance drops in 30 days.
- Performance: Reactive; branch managers call after customers already opened accounts at competitor banks (retention rescue rate <8%).

2. Additional "Good Enough" Noncognitive Approaches:
- Heuristic alternative: A 4-rule SQL query (e.g. Inactive mobile app >30 days AND debit card volume drop >40%).
- Adequacy check: Generates >60% false positives, exhausting relationship managers on irrelevant calls.

3. Disadvantages of Noncognitive Approaches:
- Latency: Fails to detect early latent signals (occurring 60-90 days prior to departure).
- Complexity: Incapable of weighing non-linear combinations of transactional recency, salary cadence, and digital interactions.
- Financial impact: Millions in deposits lost annually due to delayed intervention.

4. Firm Justification for Cognitive Solution (AI GO):
- Predictive ML classifier forecasts churn risk 60 days ahead with 82% precision.
- Cognitive system enables targeted proactive incentives, preserving high-value customer relationships with 4.5x ROI.
- Decision: AI GO affirmed.`;

    onChangeContent(ex);
  };

  const fillFraudExample = () => {
    const ex =
      lang === 'fa'
        ? `=== نمونه موردی: سامانه کشف تقلب تراکنش‌های درگاه پرداخت ===

۱. رویکردهای غیرشناختی فعلی (Current Noncognitive Approaches):
- روش جاری: قوانین سخت‌افزاری ایستا (مثلاً: تراکنش بالای ۵۰ میلیون ریال در ساعات ۱ بامداد تا ۵ صبح یا بیش از ۵ تراکنش متوالی در ۵ دقیقه مسدود شود).
- خط مبنای عملکرد (Baseline): مسدودی اشتباه ۴.۸٪ از خریداران واقعی (False Declines) و از دست رفتن فروش فروشگاه‌ها، همزمان با عبور کلاهبرداری‌های سازمان‌یافته با ارقام ریز.

۲. رویکردهای غیرشناختی تکمیلی که ممکن است «به اندازه کافی خوب» باشند:
- رویکرد هیوریستیک جایگزین: ایجاد فهرست سیاه (Blacklist) از IPها و شماره کارت‌های مشکوک + الزام رمز دوم برای کلیه تراکنش‌ها.
- ارزیابی کفایت: باعث ایجاد اصطکاک شدید برای کاربران عادی و خروج خریداران از سبد خرید می‌شود.

۳. معایب مشخص رویکرد غیرشناختی:
- زمان و سرعت: کلاهبرداران شیوه‌های خود را هر چند هفته تغییر می‌دهند و نگهداری دستی صدها قانون شرطی پیچیده غیرممکن است.
- هزینه مسدودی کاذب: هزینه مشتریان ناراضی که خریدشان بی‌دلیل مسدود شده، ۱۰ برابر بیشتر از مبلغ خود کلاهبرداری‌هاست.

۴. توجیه قاطع برای راه‌حل شناختی (Cognitive Justification):
- مدل هوش مصنوعی شناختی (Real-time Anomaly Detection & Graph ML):
  * ارزیابی همزمان ۵۰ ویژگی رفتاری در کمتر از ۴۰ میلی‌ثانیه.
  * کاهش ۷۰ درصدی مسدودی کاذب مشتریان واقعی و تشخیص الگوهای جدید حمله در روز صفر بدون نیاز به کدنویسی قوانین جدید.
- نتیجه آزمون AI Go/No-Go: تأیید شد (AI GO) - هوش مصنوعی ارزش حیاتی دارد.`
        : `=== Case Example: E-Commerce Payment Fraud Detection ===

1. Current Noncognitive Approaches:
- Static threshold rules (e.g., block transactions >$1,000 between 2 AM - 5 AM or >3 purchases within 10 minutes).
- Baseline: High false decline rate (5.2% of legitimate buyers rejected) while micro-fraud syndicates slip through unnoticed.

2. Additional "Good Enough" Noncognitive Approaches:
- Heuristic alternative: IP address blacklists + mandatory step-up 2FA for all orders over $200.
- Adequacy check: Creates high customer checkout friction, causing substantial basket abandonment.

3. Disadvantages of Noncognitive Approaches:
- Rapid obsolescence: Attackers modify velocity and amounts within days; maintaining thousands of static rules creates spaghetti code.
- Business cost: False declines cost 10x more lost revenue than fraud chargebacks.

4. Firm Justification for Cognitive Solution:
- Real-time ML anomaly detection scores 60+ behavioral features within 35ms.
- Achieves 70% reduction in false declines while trapping complex synthetic identity schemes.
- Decision: AI GO validated.`;

    onChangeContent(ex);
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  // Evaluate AI Go/No-Go
  const isAllAnswered =
    testRulesFail !== null &&
    testScaleExceedsHuman !== null &&
    testPatternComplexity !== null &&
    testDataAvailable !== null &&
    testRoiJustified !== null;

  const isAiGo =
    testRulesFail === true && // Rules fail to solve it
    testPatternComplexity === true && // Complex patterns
    testDataAvailable === true && // Data is available
    testRoiJustified === true; // Positive ROI

  const appendAssessmentToCanvas = () => {
    const assessmentSummary =
      lang === 'fa'
        ? `\n\n--- خلاصه ارزیابی آزمون تایید هوش مصنوعی (AI Go / No-Go Test) ---
- عدم کفایت قوانین قطعی و برنامه‌نویسی ساده: ${testRulesFail ? 'تأیید شد (هوش مصنوعی لازم است)' : 'رد شد (قوانین ساده کافی است)'}
- فراتر رفتن مقیاس از توان دستی انسان: ${testScaleExceedsHuman ? 'بله' : 'خیر'}
- پیچیدگی غیرخطی و چندوجهی الگوها: ${testPatternComplexity ? 'بله' : 'خیر'}
- دسترسی به داده‌های باکیفیت: ${testDataAvailable ? 'تأمین است' : 'ناقص است'}
- توجیه اقتصادی و بازگشت سرمایه نسبت به هزینه AI: ${testRoiJustified ? 'مثبت و توجیه‌پذیر' : 'ناکافی'}
نتیجه نهایی گیت تصمیم‌گیری: ${isAiGo ? 'تایید ادامه با هوش مصنوعی (AI GO)' : 'بازنگری / عدم تایید در این مرحله (AI NO-GO)'}`
        : `\n\n--- CPMAI AI Go / No-Go Assessment Summary ---
- Deterministic rules fail to meet business need: ${testRulesFail ? 'Confirmed (Cognitive required)' : 'Unconfirmed (Rules sufficient)'}
- Volume/Scale exceeds manual human capacity: ${testScaleExceedsHuman ? 'Yes' : 'No'}
- Non-linear multi-dimensional patterns present: ${testPatternComplexity ? 'Yes' : 'No'}
- Quality training data available: ${testDataAvailable ? 'Yes' : 'No'}
- Expected ROI exceeds AI total cost of ownership: ${testRoiJustified ? 'Yes' : 'No'}
Final Decision Gate Verdict: ${isAiGo ? 'AI GO (Approved for Cognitive Solution)' : 'AI NO-GO / RE-EVALUATE'}`;

    onChangeContent(content + assessmentSummary);
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Slide Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b3a4b] via-[#1f5163] to-[#00738c] text-white shadow-md relative overflow-hidden border border-[#005f73]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold tracking-wide mb-2 text-[#99e2b4]">
              <Brain className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{t.taskGroupLabel}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#e0fbfc] mt-2 max-w-3xl leading-relaxed">
              {t.taskGroupDesc}
            </p>
          </div>

          <div className="shrink-0 flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 sm:border-l sm:border-white/20 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-white/70 uppercase tracking-wider font-medium">
              {lang === 'fa' ? 'صفحه کتاب کار' : 'Workbook Page'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#99e2b4]">16 / ص ۶</span>
          </div>
        </div>
      </div>

      {/* Task Definition & CPMAI Heuristic Callout Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-[#e3eef1] dark:bg-[#1f5163]/30 text-[#00738c] dark:text-[#6fb3c6] shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {t.taskTitle}
            </h2>
            <h3 className="text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6] uppercase tracking-wider">
              {t.descTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {t.descText}
            </p>
          </div>
        </div>

        {/* Heuristic Callout (Highlighted Box) */}
        <div className="p-4 rounded-xl bg-[#fff8eb] dark:bg-[#2b2416] border border-[#f0c05a]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#9a6300] dark:text-[#e6b149] font-bold text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 shrink-0" />
            <span>{t.heuristicCalloutTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6e4e10] dark:text-[#d4be88] leading-relaxed">
            {t.heuristicCalloutText}
          </p>
        </div>

        {/* Good-Enough Principle & Benchmarking */}
        <div className="p-4 rounded-xl bg-[#f0f9f5] dark:bg-[#172e25] border border-[#2f7d5b]/30 space-y-2">
          <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#63c496] font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t.cognitiveGoalTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#275943] dark:text-[#98d4b6] leading-relaxed">
            {t.cognitiveGoalText}
          </p>
        </div>

        {/* The 4 Action Items of this task */}
        <div className="pt-2 border-t border-[#d9dad5] dark:border-[#2d3942] space-y-2.5">
          <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
            <span>{t.fourTasksTitle}</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#2c3b42] dark:text-[#c4d2d8]">
            <div className="p-2.5 rounded-lg bg-[#f4f6f7] dark:bg-[#202930] border border-[#e2e7ea] dark:border-[#2d3942]">
              <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6] block mb-1">{t.req1}</span>
              <span className="text-[#5d6b73] dark:text-[#9aa8b0] text-[11px]">
                {lang === 'fa' ? 'اکسل، رویه دستی، فرمول‌های ساده، فهرست‌های ایستا یا قضاوت کارشناس' : 'Spreadsheets, manual reviews, static rankings, human heuristics'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f4f6f7] dark:bg-[#202930] border border-[#e2e7ea] dark:border-[#2d3942]">
              <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6] block mb-1">{t.req2}</span>
              <span className="text-[#5d6b73] dark:text-[#9aa8b0] text-[11px]">
                {lang === 'fa' ? 'آیا یک کوئری ساده SQL یا چند قانون شرطی If-Then نیاز را به حد کفایت برآورده می‌کند؟' : 'Could deterministic logic or heuristics satisfy the baseline requirement?'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f4f6f7] dark:bg-[#202930] border border-[#e2e7ea] dark:border-[#2d3942]">
              <span className="font-semibold text-[#b3432f] dark:text-[#e06d53] block mb-1">{t.req3}</span>
              <span className="text-[#5d6b73] dark:text-[#9aa8b0] text-[11px]">
                {lang === 'fa' ? 'هزینه سرسام‌آور در تیراژ بالا، تأخیر زمانی، نرخ خطای بالا یا شکست در ابعاد پیچیده' : 'Cost overhead, slow latency, false positive rate, unscalability'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f4f6f7] dark:bg-[#202930] border border-[#e2e7ea] dark:border-[#2d3942]">
              <span className="font-semibold text-[#2f7d5b] dark:text-[#63c496] block mb-1">{t.req4}</span>
              <span className="text-[#5d6b73] dark:text-[#9aa8b0] text-[11px]">
                {lang === 'fa' ? 'اثبات قاطع این که چرا هوش مصنوعی بهتر، سریع‌تر، ارزان‌تر و مقیاس‌پذیرتر است' : 'Ironclad case: Better, faster, cheaper, more reliable, and scalable'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Toolbar & Quick-Fill Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Insert Standard Template */}
          <button
            type="button"
            onClick={insertTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e3eef1] dark:bg-[#1f5163]/40 text-[#00738c] dark:text-[#6fb3c6] hover:bg-[#d0e5ea] text-xs font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.templateBtn}</span>
          </button>

          {/* Preset Example 1: Movies */}
          <button
            type="button"
            onClick={fillMovieExample}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1] dark:hover:bg-[#202930] text-xs text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
            title="Recommendation Engine example from workbook"
          >
            <Film className="w-3.5 h-3.5 text-[#00738c]" />
            <span className="hidden md:inline">{t.exampleMovieBtn}</span>
            <span className="md:hidden">{lang === 'fa' ? 'پیشنهاد فیلم' : 'Movies'}</span>
          </button>

          {/* Preset Example 2: Churn */}
          <button
            type="button"
            onClick={fillChurnExample}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1] dark:hover:bg-[#202930] text-xs text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
            title="Customer churn prevention"
          >
            <Users className="w-3.5 h-3.5 text-[#2f7d5b]" />
            <span className="hidden md:inline">{t.exampleChurnBtn}</span>
            <span className="md:hidden">{lang === 'fa' ? 'ریزش مشتری' : 'Churn'}</span>
          </button>

          {/* Preset Example 3: Fraud */}
          <button
            type="button"
            onClick={fillFraudExample}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1] dark:hover:bg-[#202930] text-xs text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
            title="Fraud detection thresholds"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#b3432f]" />
            <span className="hidden md:inline">{t.exampleFraudBtn}</span>
            <span className="md:hidden">{lang === 'fa' ? 'کشف تقلب' : 'Fraud'}</span>
          </button>
        </div>

        {/* AI Go/No-Go Decision Tool Toggle */}
        <button
          type="button"
          onClick={() => setShowGoNoGoTool(prev => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            showGoNoGoTool
              ? 'bg-[#1f5163] text-white shadow-xs'
              : 'border border-[#1f5163] text-[#1f5163] dark:text-[#6fb3c6] hover:bg-[#1f5163]/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.goNoGoBtn}</span>
        </button>
      </div>

      {/* AI Go/No-Go Assessment Tool (Interactive Evaluator) */}
      {showGoNoGoTool && (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#f9fbfa] to-[#eef4f2] dark:from-[#172228] dark:to-[#131b20] border-2 border-[#1f5163]/30 shadow-md space-y-4 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
                <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                  {t.goNoGoTitle}
                </h3>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                {t.goNoGoSubtitle}
              </p>
            </div>

            {/* Verdict Badge */}
            {isAllAnswered && (
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shrink-0 shadow-xs ${
                  isAiGo
                    ? 'bg-[#2f7d5b] text-white'
                    : 'bg-[#b3432f] text-white'
                }`}
              >
                {isAiGo ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{isAiGo ? 'AI GO' : 'AI NO-GO'}</span>
              </div>
            )}
          </div>

          {/* 5 Questions */}
          <div className="space-y-3 pt-2">
            {/* Q1 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {t.q1}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {t.q1Note}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestRulesFail(false)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testRulesFail === false
                      ? 'bg-[#b3432f] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'بله (قوانین ساده کافی است)' : 'Yes (Rules work)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestRulesFail(true)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testRulesFail === true
                      ? 'bg-[#2f7d5b] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'خیر (قوانین ساده شکست می‌خورند)' : 'No (Rules fail)'}
                </button>
              </div>
            </div>

            {/* Q2 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {t.q2}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {t.q2Note}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestScaleExceedsHuman(true)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testScaleExceedsHuman === true
                      ? 'bg-[#2f7d5b] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'بله (حجم بالا)' : 'Yes (High scale)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestScaleExceedsHuman(false)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testScaleExceedsHuman === false
                      ? 'bg-[#7c8b93] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'خیر (حجم دستی کافیست)' : 'No (Low volume)'}
                </button>
              </div>
            </div>

            {/* Q3 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {t.q3}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {t.q3Note}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestPatternComplexity(true)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testPatternComplexity === true
                      ? 'bg-[#2f7d5b] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'بله (الگوهای پنهان چندبعدی)' : 'Yes (High complexity)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestPatternComplexity(false)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testPatternComplexity === false
                      ? 'bg-[#7c8b93] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'خیر (خطی و ساده)' : 'No (Simple)'}
                </button>
              </div>
            </div>

            {/* Q4 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {t.q4}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {t.q4Note}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestDataAvailable(true)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testDataAvailable === true
                      ? 'bg-[#2f7d5b] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'بله (داده در دسترس)' : 'Yes (Data available)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestDataAvailable(false)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testDataAvailable === false
                      ? 'bg-[#b3432f] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'خیر (فاقد داده کافی)' : 'No (Missing data)'}
                </button>
              </div>
            </div>

            {/* Q5 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {t.q5}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {t.q5Note}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTestRoiJustified(true)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testRoiJustified === true
                      ? 'bg-[#2f7d5b] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'بله (ROI مثبت)' : 'Yes (Positive ROI)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTestRoiJustified(false)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    testRoiJustified === false
                      ? 'bg-[#b3432f] text-white'
                      : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                  }`}
                >
                  {lang === 'fa' ? 'خیر (توجیه مالی ضعیف)' : 'No (Weak ROI)'}
                </button>
              </div>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                {isAllAnswered
                  ? isAiGo
                    ? t.goVerdict
                    : t.noGoVerdict
                  : t.neutralVerdict}
              </span>
            </div>

            {isAllAnswered && (
              <button
                type="button"
                onClick={appendAssessmentToCanvas}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] text-xs font-semibold transition-colors shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.appendTestToCanvas}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Workbook Canvas (Textarea Editor) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#d9dad5] dark:border-[#2d3942]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00738c]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'بوم ثبت الزامات شناختی و خط مبنای اکتشافی' : 'Cognitive Requirements & Heuristic Baseline Canvas'}
            </h3>
          </div>

          {/* Counters & Utilities */}
          <div className="flex items-center gap-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            <span>
              {words} {t.wordCount} · {chars} {t.charCount}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1] dark:hover:bg-[#202930] text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
              title={t.copyBtn}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copiedToast : t.copyBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(lang === 'fa' ? 'آیا از پاک کردن متن بوم اطمینان دارید؟' : 'Clear canvas?')) {
                  onChangeContent('');
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[#b3432f] hover:bg-[#b3432f]/10 transition-colors"
              title={t.clearBtn}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.clearBtn}</span>
            </button>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder={t.canvasPlaceholder}
          rows={14}
          className="w-full p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdfdfc] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#00738c] focus:border-transparent transition-all font-mono"
        />

        <div className="flex items-center justify-between text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] pt-1">
          <span>{t.pmiCopyright}</span>
          <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">CPMAI Slide 16</span>
        </div>
      </div>

      {/* CPMAI Methodology Tips Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-2.5">
        <h3 className="font-semibold text-xs sm:text-sm text-[#1f5163] dark:text-[#6fb3c6]">
          {t.tipsTitle}
        </h3>
        <ul className="space-y-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip4}</span>
          </li>
        </ul>
      </div>

      {/* Navigation Return to Page 5 and Forward to Page 7 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20">
        <button
          type="button"
          onClick={onGoToPage5}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-white dark:bg-[#172026] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#d8e6eb] dark:hover:bg-[#253840] border border-[#1f5163]/20 transition-colors shadow-2xs"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبل: برآورد ROI (صفحه ۵)' : 'Previous: Expected ROI (Page 5)'}</span>
        </button>

        {onGoToPage7 && (
          <button
            type="button"
            onClick={onGoToPage7}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#00738c] hover:bg-[#005f73] text-white transition-colors shadow-xs"
          >
            <span>{lang === 'fa' ? 'صفحه بعد: چرا راه‌حل هوش مصنوعی؟ (اسلاید ۱۷)' : 'Next: Why is AI Needed? (Slide 17)'}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
