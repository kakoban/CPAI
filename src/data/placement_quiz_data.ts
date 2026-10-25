import { AiFamiliarityLevel } from '../types/auth';
import { IndustryTrackId, DisciplineId, getSavedIndustryTrack, getSavedDiscipline } from '../types/industryTrack';
import { getDisciplineMetadata } from './disciplineExamplesRegistry';

export type QuizCategory =
  | 'foundations_safety'
  | 'prompt_engineering'
  | 'cpmai_patterns'
  | 'rag_notebooklm'
  | 'git_governance'
  | 'metrics_evaluation'
  | 'enterprise_megaprojects'
  | 'git_github'
  | 'llm_fundamentals'
  | 'security_apis';

export interface QuizQuestion {
  id: number;
  level: AiFamiliarityLevel;
  category: QuizCategory;
  categoryFa: string;
  categoryEn: string;
  categoryIcon: string;
  questionFa: string;
  questionEn: string;
  scenarioFa?: string;
  scenarioEn?: string;
  optionsFa: string[];
  optionsEn: string[];
  correctAnswerIndex: number;
  explanationFa: string;
  explanationEn: string;
  realWorldContextFa: string;
  realWorldContextEn: string;
}

export interface QuizResultLevel {
  minScore: number;
  maxScore: number;
  minPercentage: number;
  maxPercentage: number;
  levelKey: 'bronze' | 'silver' | 'gold' | 'platinum';
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  badgeEn: string;
  colorClass: string;
  borderColorClass: string;
  bgGradientClass: string;
  summaryFa: string;
  summaryEn: string;
  recommendedActionsFa: string[];
  recommendedActionsEn: string[];
  recommendedStartPage: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // LEVEL 1: BEGINNER (سطح مقدماتی - ۱۲ سوال جامع و کاربردی)
  // =========================================================================
  {
    id: 1,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'مبانی هوش مصنوعی شناختی',
    categoryEn: 'Cognitive AI Foundations',
    categoryIcon: 'Brain',
    questionFa: 'تفاوت اساسی میان «هوش مصنوعی شناختی (Cognitive AI)» و «اتوماسیون نرم‌افزاری سنتی (Traditional Automation)» چیست؟',
    questionEn: 'What is the fundamental difference between Cognitive AI and Traditional Software Automation?',
    scenarioFa: 'در جلسه تدوین استراتژی سازمان، مدیر پروژه می‌پرسد چرا نباید همان کدهای پیشین اکسل یا ماکروها را هوش مصنوعی بنامیم؟',
    scenarioEn: 'During a strategy meeting, the project director asks why conventional Excel macros cannot be classified as AI.',
    optionsFa: [
      'هوش مصنوعی فقط نرم‌افزارهایی است که روی سرورهای ابری اجرا می‌شوند.',
      'اتوماسیون سنتی خطا ندارد، اما هوش مصنوعی هیچ‌گاه نتایج قابل تکرار تولید نمی‌کند.',
      'اتوماسیون سنتی بر اساس قواعد و فرمول‌های شرطی ثابت (If/Then) کار می‌کند، در حالی که هوش مصنوعی شناختی الگوها را از داده‌ها می‌آموزد و در شرایط ابهام تصمیم‌گیری می‌کند.',
      'تنها تفاوت آن‌ها در سرعت محاسبات سخت‌افزاری است.'
    ],
    optionsEn: [
      'AI only refers to software hosted on cloud servers.',
      'Traditional automation is infallible, while AI never yields reproducible results.',
      'Traditional automation strictly follows rigid rules (If/Then), whereas Cognitive AI learns patterns from data and reasons under uncertainty.',
      'The only difference lies in hardware computing clock speeds.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'اتوماسیون کلاسیک نیازمند تعیین صریح همه سناریوها توسط برنامه‌نویس است. اما مدل‌های شناختی با یادگیری آماری از حجم داده‌ها، الگوهای پیچیده و غیرخطی را استخراج کرده و قابلیت تعمیم به داده‌های جدید را دارند.',
    explanationEn: 'Classic automation requires hardcoding every possible case. Cognitive AI infers patterns from observations and generalizes to unseen scenarios.',
    realWorldContextFa: 'در پروژه‌های عمرانی، یک ماکرو می‌تواند میانگین مقاومت فشاری بتن را حساب کند؛ اما یک مدل شناختی عوامل غیرمستقیم مانند رطوبت هوا و خطای اپراتور را در افت مقاومت کشف می‌کند.',
    realWorldContextEn: 'A macro calculates concrete strength averages; Cognitive AI discovers latent factors like humidity and operator variance impacting curing.'
  },
  {
    id: 2,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'ایمنی و مهار خطا',
    categoryEn: 'AI Safety & Hallucination',
    categoryIcon: 'ShieldAlert',
    questionFa: 'اصطلاح «توهم (Hallucination)» در مدل‌های زبانی بزرگ (LLM) دقیقاً به چه معناست و بهترین راهکار مهار آن در پروژه‌ها چیست؟',
    questionEn: 'What does "Hallucination" mean in Large Language Models (LLMs), and how is it best mitigated in engineering projects?',
    scenarioFa: 'یک مدل هوش مصنوعی در پاسخ به استعلام مهندس دفتر فنی، بندی از نشریه ۵۵ را با لحنی بسیار مطمئن نقل می‌کند که اصلاً در استاندارد وجود ندارد.',
    scenarioEn: 'An LLM quotes a nonexistent engineering clause with extreme confidence.',
    optionsFa: [
      'تولید اطلاعات نادرست یا ساختگی با لحنی کاملاً قانع‌کننده؛ که با متصل کردن مدل به اسناد معتبر مرجع (Grounding) مهار می‌شود.',
      'ویروسی شدن سرور هوش مصنوعی و نیاز به نصب مجدد نرم‌افزار.',
      'خاموش شدن خودکار مدل در اثر بار محاسباتی بالا.',
      'ناتوانی مدل در خواندن فایل‌های متنی فارسی.'
    ],
    optionsEn: [
      'Generating factually incorrect or fabricated claims with plausible eloquence; mitigated via strict source Grounding (RAG).',
      'A server virus corruption requiring software reinstallation.',
      'Automatic engine termination caused by excessive inference loads.',
      'An inherent inability to process Persian language syntax.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'مدل‌های زبانی ذاتاً تولیدکننده احتمالاتی واژگان بعدی هستند، نه پایگاه داده حقیقت‌سنج. راه‌حل بنیادین، متصل کردن مدل به منابع معتبر (Grounding/RAG) و اجبار مدل به استناد مستقیم به اسناد آپلودشده است.',
    explanationEn: 'LLMs predict token probabilities rather than querying absolute databases. Grounding grounds generative predictions strictly against verified corporate documentation.',
    realWorldContextFa: 'در استعلام‌های حقوقی پیمان، استناد به بند ناموجود شرایط عمومی پیمان می‌تواند به خسارت‌های چند ده میلیاردی منجر شود.',
    realWorldContextEn: 'Citing a fabricated contractual clause in arbitration can result in catastrophic financial losses.'
  },
  {
    id: 3,
    level: 'beginner',
    category: 'prompt_engineering',
    categoryFa: 'اصول پرامپت‌نویسی مهندسی',
    categoryEn: 'Engineering Prompt Frameworks',
    categoryIcon: 'Key',
    questionFa: 'در چارچوب استاندارد پرامپت‌نویسی مهندسی RCTO، مؤلفه‌های چهارگانه کدامند و چرا رعایت آن‌ها ضرورت دارد؟',
    questionEn: 'In the engineering RCTO prompt architecture, what do the four pillars represent?',
    scenarioFa: 'مهندس برنامه‌ریزی پروژه‌ای یک پرامپت یک‌خطی می‌نویسد و از هوش مصنوعی پاسخی نامرتبط و بسیار کلی دریافت می‌کند.',
    scenarioEn: 'A planning engineer sends a vague one-sentence prompt and receives an unhelpful generic response.',
    optionsFa: [
      'Result, Code, Target, Operation',
      'Rules, Constraints, Testing, Objectives',
      'Review, Calculate, Translate, Order',
      'Role (نقش)، Context (زمینه و مستندات)، Task (ماموریت مشخص)، Output (ساختار خروجی مطلوب)'
    ],
    optionsEn: [
      'Result, Code, Target, Operation',
      'Rules, Constraints, Testing, Objectives',
      'Review, Calculate, Translate, Order',
      'Role, Context, Task, Output format specifications'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'مدل زبانی به هدایت دقیق نیاز دارد. مشخص کردن نقش (مثلاً مدیر ادعا)، زمینه (شرایط پروژه)، ماموریت (بررسی تاخیر) و خروجی (جدول ۴ ستونه با ارجاع به ماده ۳۰) کیفیت پاسخ را به شدت ارتقا می‌دهد.',
    explanationEn: 'Specifying Role, Context, Task, and Output constraints forces the LLM into targeted engineering persona and deterministic output schemas.',
    realWorldContextFa: 'به جای نوشتن «تاخیرات را تحلیل کن»، می‌نویسیم: «در نقش مدیر قراردادهای مترو (R)، با توجه به این ۳ صورتجلسه (C)، تاخیرات کارفرما را استخراج کن (T) در قالب جدول ماتریس ادعا (O)».',
    realWorldContextEn: 'Instead of "analyze delays", specify: "As senior metro contract manager (R), using these 3 minutes (C), isolate client-caused delays (T) in a 4-column claim matrix (O)".'
  },
  {
    id: 4,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'امنیت و محرمانگی داده‌ها',
    categoryEn: 'Data Privacy & Enterprise Security',
    categoryIcon: 'ShieldAlert',
    questionFa: 'در صورت استفاده از نسخه‌های عمومی و رایگان هوش مصنوعی، چه خطری اسرار تجاری و نقشه‌های پروژه را تهدید می‌کند؟',
    questionEn: 'What risk do public free tiers of LLMs pose to confidential project blueprints and proprietary bids?',
    scenarioFa: 'یک مهندس جوان شیت قیمت‌های پیشنهادی مناقصه را جهت خلاصه کردن در چت‌بات عمومی آنلاین بارگذاری می‌کند.',
    scenarioEn: 'An engineer uploads competitive tender pricing schedules into a public consumer AI chat.',
    optionsFa: [
      'فایل‌ها فوراً پاک می‌شوند و در دسترس نخواهند بود.',
      'داده‌های حساس ممکن است برای آموزش نسخه‌های بعدی مدل عمومی استفاده شده و در پاسخ به سایر کاربران یا رقبا افشا گردد.',
      'سرعت اینترنت کارگاه کاهش پیدا می‌کند.',
      'هیچ خطری ندارد چون هوش مصنوعی حافظه دائمی ندارد.'
    ],
    optionsEn: [
      'The file is instantly deleted and becomes irrecoverable.',
      'Confidential data may be incorporated into training corpora, leaking confidential trade secrets to third parties or competitors.',
      'Workshop internet bandwidth experiences temporary degradation.',
      'No risk exists because AI possesses no persistent storage.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'سرویس‌های عمومی رایگان طبق قوانین خود مجاز به استفاده از ورودی کاربران جهت بازآموزی مدل‌ها هستند. در مگاپروژه‌ها باید از سرویس‌های تجاری Enterprise با تضمین عدم ذخیره داده (Zero Data Retention) یا مدل‌های On-Premise استفاده شود.',
    explanationEn: 'Free consumer tiers openly train on user prompts. Enterprise environments mandate Zero-Data-Retention (ZDR) commercial tiers or local air-gapped instances.',
    realWorldContextFa: 'افشای آنالیز قیمت یک پروژه تونل‌سازی در مناقصه بعدی، می‌تواند برنده شدن رقیب با قیمت چند درصد پایین‌تر را رقم بزند.',
    realWorldContextEn: 'Leaking cost breakdowns in competitive bidding guarantees rival contractors can underbid with razor-thin strategic margins.'
  },
  {
    id: 5,
    level: 'beginner',
    category: 'prompt_engineering',
    categoryFa: 'محدودیت‌های فنی مدل‌ها',
    categoryEn: 'Context Window & Token Limits',
    categoryIcon: 'Database',
    questionFa: 'مفهوم «پنجره کانتکست (Context Window)» در کار با اسناد حجیم پروژه‌ای چیست؟',
    questionEn: 'What does "Context Window" signify when auditing voluminous project documentation?',
    scenarioFa: 'مهندس ناظر می‌خواهد یک پرونده ادعای ۵۰۰۰ صفحه‌ای پیمانکار را یکجا تحلیل کند، اما با خطای محدودیت مواجه می‌شود.',
    scenarioEn: 'A project supervisor attempts to pass a 5,000-page claim binder in a single prompt and hits a system rejection.',
    optionsFa: [
      'حداکثر حجم داده (توکن‌ها) که مدل می‌تواند در یک تعامل دریافت کرده و همزمان در حافظه فعال خود مد نظر قرار دهد.',
      'ابعاد مانیتوری که هوش مصنوعی روی آن نمایش داده می‌شود.',
      'تعداد کارمندانی که می‌توانند همزمان با اکانت هوش مصنوعی کار کنند.',
      'زمان مجاز برای پاسخ‌دهی به یک سوال توسط هوش مصنوعی.'
    ],
    optionsEn: [
      'The maximum quantity of tokens an LLM can parse and attend to simultaneously in a single session.',
      'The physical display resolution of the monitor.',
      'The concurrent user seat allocation per enterprise license.',
      'The timeout threshold allotted for response generation.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'هر مدل سقف مشخصی برای تعداد توکن ورودی و خروجی دارد. برای اسناد بسیار حجیم، تقسیم‌بندی به قطعات معنادار (Chunking) و بهره‌گیری از ابزارهایی نظیر Google NotebookLM یا سیستم‌های RAG الزامی است.',
    explanationEn: 'Every model maintains finite context boundaries. Massive archives require semantic chunking and RAG pipelines such as NotebookLM.',
    realWorldContextFa: 'در نشریات فنی قطور، مدل‌های با کانتکست کوچک دچار پدیده فراموشی بخش‌های میانی متن (Lost in the Middle) می‌شوند.',
    realWorldContextEn: 'In massive specification manuals, low-context models suffer from the "Lost in the Middle" retrieval degradation.'
  },
  {
    id: 6,
    level: 'beginner',
    category: 'cpmai_patterns',
    categoryFa: 'امکان‌سنجی پروژه‌های هوش مصنوعی',
    categoryEn: 'When NOT to use AI in Projects',
    categoryIcon: 'CheckCircle2',
    questionFa: 'کدام‌یک از مسائل زیر برای حل شدن توسط هوش مصنوعی «نامناسب» است و باید از محاسبات مهندسی قطعی استفاده کرد؟',
    questionEn: 'Which engineering challenge is inherently UNSUITABLE for generative AI and demands deterministic engineering computation?',
    scenarioFa: 'در کمیته فنی پیشنهاد شده تا محاسبات بارهای لرزه‌ای پل بزرگراهی مستقیماً به هوش مصنوعی واگذار شود.',
    scenarioEn: 'A committee proposes handing seismic bridge load calculations entirely to a generative AI chatbot.',
    optionsFa: [
      'دسته‌بندی خودکار عکس‌های هوایی کارگاه بر اساس پیشرفت بتن‌ریزی.',
      'خلاصه‌سازی ۲۰۰ صورتجلسه کارگاهی ۳ سال گذشته و کشف تاخیرات بحرانی.',
      'ترجمه و تطبیق استاندارد FIDIC با شرایط عمومی پیمان ایران.',
      'محاسبه دقیق لنگر خمشی بحرانی یک تیر بتنی بر اساس فرمول‌های ریاضی و آیین‌نامه دقیق مبحث نهم.'
    ],
    optionsEn: [
      'Automated visual tagging of drone site photographs based on structural concrete curing progress.',
      'Synthesizing 200 workshop minutes to identify critical path delay occurrences.',
      'Translating and mapping FIDIC contractual clauses against local public tender conditions.',
      'Exact deterministic bending moment calculations governed by strict mathematical formulas and building codes.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'هوش مصنوعی شناختی بر پایه استنباط احتمالاتی است، نه اثبات فرمولی قطعی. برای محاسبات سازه‌ای که فرمول دقیق دارند، ماشین‌حساب‌های مهندسی قطعی (مانند نرم‌افزارهای ETABS یا SAP) تنها گزینه معتبر و ایمن هستند.',
    explanationEn: 'Cognitive models are probabilistic, not deterministic calculators. Closed-form structural equations mandate certified deterministic solvers (e.g., ETABS, SAP).',
    realWorldContextFa: 'قاعده فاز اول CPMAI: اگر مسئله با یک فرمول ریاضی قطعی یا قانون ساده اکسل حل می‌شود، هرگز به سراغ هوش مصنوعی نروید.',
    realWorldContextEn: 'CPMAI Phase I fundamental rule: If a problem is solvable with deterministic mathematical formulas, do not deploy cognitive machine learning.'
  },
  {
    id: 7,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'کیفیت داده‌های ورودی',
    categoryEn: 'Data Quality & Garbage In, Garbage Out',
    categoryIcon: 'Database',
    questionFa: 'قانون معروف «زباله وارد شود، زباله خارج می‌شود (Garbage In, Garbage Out)» در پیاده‌سازی هوش مصنوعی پروژه‌ای به چه مفهومی اشاره دارد؟',
    questionEn: 'What does the principle "Garbage In, Garbage Out" mean in the context of cognitive project management?',
    scenarioFa: 'گزارش‌های روزانه ثبت‌شده توسط سرپرستان کارگاه دارای تناقض و اشتباهات تایپی فراوان است و خروجی پیش‌بینی هوش مصنوعی غیرقابل استفاده شده است.',
    scenarioEn: 'Daily site logs recorded by foremen are full of contradictions and typo errors, producing unusable predictive models.',
    optionsFa: [
      'سرورهای هوش مصنوعی هنگام پردازش داده‌های قدیمی خاک می‌گیرند.',
      'هوش مصنوعی فقط با زبان انگلیسی خروجی باکیفیت می‌دهد.',
      'حتی قدرتمندترین مدل هوش مصنوعی در صورت تغذیه شدن با داده‌های ناقص، متناقض یا نادرست، نتایج فاقد اعتبار و گمراه‌کننده تولید خواهد کرد.',
      'داده‌های بازیافتی محیط زیست را باید در سرورهای سبز ذخیره کرد.'
    ],
    optionsEn: [
      'AI hardware racks physically deteriorate when handling uncleaned legacy files.',
      'AI systems only generate robust outputs when prompted exclusively in English.',
      'Even the most advanced model will produce invalid and dangerous forecasts if trained or prompted with noisy, contradictory, or uncurated data.',
      'Recycled environmental data must be stored on green solar servers.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'کیفیت بینش تولیدشده توسط هوش مصنوعی کاملاً تابع کیفیت، ساختاریافتگی و صحه‌گذاری داده‌های ورودی است. در CPMAI فازهای Data Understanding و Data Preparation بخش اعظم زمان پروژه را به خود اختصاص می‌دهند.',
    explanationEn: 'Cognitive intelligence is completely bounded by the integrity and curation of input data. In CPMAI, data understanding and preparation consume the vast majority of lifecycle effort.',
    realWorldContextFa: 'اگر احجام بتن‌ریزی در گزارش‌های روزانه کارگاه به صورت تخمینی ثبت شده باشند، مدل نمی‌تواند انحراف هزینه و مصالح پروژه را با دقت واقعی تخمین بزند.',
    realWorldContextEn: 'If concrete pours are loosely estimated by site foremen, the predictive AI model cannot forecast cost and inventory variances with statistical validity.'
  },
  {
    id: 8,
    level: 'beginner',
    category: 'prompt_engineering',
    categoryFa: 'راستی‌آزمایی و ارجاع‌دهی',
    categoryEn: 'Source Verification & Fact Checking',
    categoryIcon: 'BookCheck',
    questionFa: 'هنگام استفاده از هوش مصنوعی برای استخراج مطالبات قراردادی یا تعهدات مناقصه، مهندس پروژه چه اقدامی را حتماً باید انجام دهد؟',
    questionEn: 'When using AI to synthesize contractual delay claims, what mandatory verification protocol must an engineer execute?',
    scenarioFa: 'هوش مصنوعی ادعا می‌کند کارفرما طبق ماده ۴۶ موظف به پرداخت جریمه تاخیر تحویل زمین است.',
    scenarioEn: 'An AI summary claims the client is liable under Clause 46 for site delivery delays.',
    optionsFa: [
      'متن هوش مصنوعی را بدون تغییر پرینت گرفته و برای کارفرما ارسال کند.',
      'هر گزاره، عدد و بند قراردادی استخراج‌شده را با متن فیزیکی و امضاشده قرارداد اصلی تطبیق داده و ارجاع دقیق (شماره صفحه و بند) را کنترل نماید.',
      'از هوش مصنوعی بخواهد خودش قسم بخورد که اطلاعاتش درست است.',
      'از یک مدل دیگر بپرسد آیا مدل اول راست می‌گوید.'
    ],
    optionsEn: [
      'Print the generated report directly on official letterhead without human review.',
      'Cross-check every generated citation, figure, and contractual clause against the physically executed master contract with exact page references.',
      'Ask the AI prompt to affirm with absolute certainty that it made no mistake.',
      'Prompt a secondary generic chatbot to confirm if the first chatbot is telling the truth.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'هوش مصنوعی ابزار دستیار (Copilot) است، نه مسئول حقوقی پیمان. مهندس پروژه مسئولیت قانونی پاسخ‌ها را بر عهده دارد و باید هر ارجاع را با منبع مرجع تطبیق دهد.',
    explanationEn: 'AI functions strictly as an augmentative copilot. The certified engineer bears complete ethical and professional accountability for verifying every reference.',
    realWorldContextFa: 'در پروژه‌های عمرانی کشور، استناد به بندی که در نسخه نهایی موافقت‌نامه خط خورده بوده است، موجب شکست قطعی در داوری و ادعاهای مالی خواهد شد.',
    realWorldContextEn: 'Citing a clause that was explicitly struck out during final contract negotiations guarantees dismissal in legal dispute adjudication.'
  },
  {
    id: 9,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'انواع هوش مصنوعی در سازمان',
    categoryEn: 'Generative vs Predictive AI',
    categoryIcon: 'Brain',
    questionFa: 'تفاوت بنیادین «هوش مصنوعی مولد (Generative AI)» و «هوش مصنوعی پیش‌بین (Predictive AI)» در مدیریت پروژه‌ها چیست؟',
    questionEn: 'What is the distinction between Generative AI and Predictive AI in project management?',
    scenarioFa: 'معاونت فنی سازمان می‌خواهد بداند برای پیش‌بینی احتمال تاخیر در تحویل تجهیزات خارجی، باید از مدل‌های زبانی مانند ChatGPT استفاده کند یا مدل‌های رگرسیون و یادگیری ماشین.',
    scenarioEn: 'Management asks whether to use LLMs like ChatGPT or machine learning regression models to predict equipment lead-time delays.',
    optionsFa: [
      'هیچ تفاوتی ندارند و هر دو نام‌های تجاری مختلف برای یک الگوریتم هستند.',
      'هوش مصنوعی مولد فقط برای نقاشی است و هوش مصنوعی پیش‌بین فقط برای پیش‌بینی وضع آب‌وهوا.',
      'هوش مصنوعی پیش‌بین قدیمی و منسوخ شده و امروزه مدل‌های زبانی جایگزین همه محاسبات شده‌اند.',
      'هوش مصنوعی مولد محتوای جدید (متن، کد، جدول) تولید می‌کند؛ در حالی که هوش مصنوعی پیش‌بین بر اساس داده‌های عددی تاریخی، احتمال وقوع رخدادهای آینده یا مقادیر عددی را برآورد می‌کند.'
    ],
    optionsEn: [
      'They are identical commercial marketing synonyms for the same underlying algorithm.',
      'Generative AI is only for visual art while Predictive AI is restricted to meteorological weather forecasts.',
      'Predictive AI is obsolete and LLMs have completely replaced statistical modeling.',
      'Generative AI creates novel synthesis (text, structured tables, code), whereas Predictive AI models estimate likelihoods or numerical values from historical tabular data.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'هوش مصنوعی مولد برای خلاصه‌سازی اسناد، نگارش مکاتبات و پیش‌نویس ادعاها عالی است؛ اما برای پیش‌بینی تاخیر، هزینه و ریسک، مدل‌های پیش‌بین (مانند Random Forest، XGBoost یا شبکه‌های عصبی سری زمانی) دقت و اعتبار بالاتری دارند.',
    explanationEn: 'Generative AI excels at textual synthesis and contract drafting, while tabular predictive algorithms (e.g. XGBoost, regression) are required for numerical schedule and cost forecasting.',
    realWorldContextFa: 'برای پیش‌نویس لایحه تاخیرات از هوش مصنوعی مولد استفاده می‌کنیم، اما برای تخمین درصد تاخیر مجاز از مدل‌های آماری و هوش مصنوعی پیش‌بین کمک می‌گیریم.',
    realWorldContextEn: 'We use generative AI to draft the contractual claim narrative, but rely on predictive AI to forecast critical path float erosion probabilities.'
  },
  {
    id: 10,
    level: 'beginner',
    category: 'prompt_engineering',
    categoryFa: 'تکنیک‌های پرامپت‌نویسی پیشرفته',
    categoryEn: 'Few-Shot Prompting Technique',
    categoryIcon: 'Key',
    questionFa: 'تکنیک «پرامپت‌نویسی با چند نمونه (Few-Shot Prompting)» به چه معناست و چه تاثیری در خروجی‌های مهندسی دارد؟',
    questionEn: 'What is Few-Shot Prompting and how does it elevate the precision of engineering deliverables?',
    scenarioFa: 'مهندس دفتر فنی از هوش مصنوعی می‌خواهد صورت‌جلسات کارگاهی را در قالب ساختار اختصاصی شرکت خلاصه‌سازی کند اما مدل مدام قالب متفاوتی تولید می‌کند.',
    scenarioEn: 'An engineer asks the model to format site minutes into the company template, but the AI keeps inventing arbitrary layouts.',
    optionsFa: [
      'ارسال پرامپت با سرعت خیلی بالا در چند ثانیه متوالی.',
      'کاهش طول پرامپت به کمتر از ۵ کلمه جهت صرفه‌جویی در مصرف توکن.',
      'قرار دادن ۲ یا ۳ نمونه کامل از «ورودی و خروجی ایده‌آل» در بدنه پرامپت، تا مدل سبک، لحن و فرمت جدول‌بندی مورد انتظار را بیاموزد.',
      'استفاده همزمان از چند مرورگر مختلف برای ارسال یک پرامپت.'
    ],
    optionsEn: [
      'Rapid-fire dispatching of prompts within milliseconds.',
      'Constraining the prompt length to under 5 tokens to minimize cost.',
      'Providing 2 or 3 curated input-output demonstrations within the prompt context to anchor structure, schema, and engineering tone.',
      'Running multiple parallel browsers simultaneously for one request.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'مدل‌های زبانی با مشاهده نمونه‌های واقعی (Exemplars) الگوی ساختاری را دقیقاً تکرار می‌کنند. ارائه یک نمونه از صورت‌جلسه ورودی و جدول ادعای خروجی مد نظرتان، احتمال خطای فرمت را به صفر نزدیک می‌کند.',
    explanationEn: 'LLMs mirror structural patterns through in-context learning. Providing few-shot demonstrations virtually eliminates formatting and schema divergence.',
    realWorldContextFa: 'وقتی می‌خواهید صدها نامه کارگاهی را به جدول ماتریس ریسک تبدیل کنید، گذاشتن یک نمونه تبدیل‌شده در پرامپت، خروجی یکدست و بی‌نقص ایجاد می‌کند.',
    realWorldContextEn: 'When converting hundreds of submittals into risk registers, a single annotated input-output example ensures standard tabular consistency.'
  },
  {
    id: 11,
    level: 'beginner',
    category: 'foundations_safety',
    categoryFa: 'نظارت انسانی بر تصمیمات هوش مصنوعی',
    categoryEn: 'Human-in-the-Loop (HITL) Principle',
    categoryIcon: 'ShieldAlert',
    questionFa: 'اصل حیاتی «انسان در حلقه تصمیم‌گیری (Human-in-the-Loop - HITL)» در به‌کارگیری هوش مصنوعی در پروژه‌ها بیانگر چیست؟',
    questionEn: 'What does the mandatory "Human-in-the-Loop" (HITL) governance principle stipulate in engineering environments?',
    scenarioFa: 'یک سیستم هوش مصنوعی پیشنهاد قطع بتن‌ریزی فونداسیون به دلیل خطر فرونشست خاک را به صورت خودکار صادر کرده است.',
    scenarioEn: 'An autonomous AI system issues an automated directive to halt foundation pouring due to settlement risk.',
    optionsFa: [
      'هیچ خروجی یا توصیه بحرانی هوش مصنوعی نباید بدون بررسی، راستی‌آزمایی و امضای مهندس صاحب صلاحیت انسانی به اقدام عملی یا تعهد قراردادی تبدیل شود.',
      'باید یک اپراتور در اتاق سرور بنشیند و فقط چراغ‌های دستگاه را چک کند.',
      'انسان‌ها باید همه کارها را خودشان با دست انجام دهند و هوش مصنوعی خاموش بماند.',
      'هوش مصنوعی باید بتواند انسان‌ها را استخدام یا اخراج کند.'
    ],
    optionsEn: [
      'No mission-critical AI inference or directive can trigger physical execution without rigorous verification and sign-off by a licensed human professional.',
      'A hardware technician must passively monitor physical cooling lights in the server room.',
      'Engineers must manually perform all drafting by hand while keeping AI disconnected.',
      'The AI system is empowered to autonomously hire or dismiss site personnel.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'مدل‌های هوش مصنوعی مشاور و شتاب‌دهنده هستند؛ اما مسئولیت مدنی، حقوقی، ایمنی و اخلاقی تصمیمات منحصراً بر عهده اشخاص حقیقی و مهندسان دارای پروانه است.',
    explanationEn: 'Cognitive models advise and accelerate analysis; ultimate legal, ethical, and structural liability rests exclusively with certified human professionals.',
    realWorldContextFa: 'هوش مصنوعی می‌تواند ناهنجاری در کرنش‌سنج‌های سد را گزارش دهد، اما تصمیم تخلیه کارگاه یا اصلاح تزریق بتن باید با تایید ناظر مقیم و سرناظر باشد.',
    realWorldContextEn: 'AI detects structural strain anomalies; however, the formal decision to alter grouting specifications mandates licensed supervisory engineer concurrence.'
  },
  {
    id: 12,
    level: 'beginner',
    category: 'cpmai_patterns',
    categoryFa: 'مهار توهم در داده‌های مالی و کمی',
    categoryEn: 'Zero Hallucination in Quantitative Project Data',
    categoryIcon: 'FileSpreadsheet',
    questionFa: 'چرا تحلیل مقادیر مالی، احجام ریالی و صورت‌وضعیت‌ها در مدل‌های زبانی عمومی بدون اتصال مستقیم به سند (Grounding) پرخطرترین کار ممکن است؟',
    questionEn: 'Why is financial valuation and billing audit without document Grounding the highest-risk use case for LLMs?',
    scenarioFa: 'حسابدار پروژه از یک چت‌بات معمولی می‌خواهد جمع مبالغ صورت‌وضعیت تجمعی را محاسبه کند و مدل عددی با ۳۰ میلیارد ریال اختلاف اعلام می‌کند.',
    scenarioEn: 'An accountant asks a generic LLM to sum cumulative subcontractor invoices and receives a figure divergent by 30 billion Rials.',
    optionsFa: [
      'چون چت‌بات‌ها مبالغ ریال ایران را نمی‌شناسند و فقط دلار بلدند.',
      'مدل‌های زبانی بزرگ ماشین محاسباتی دقیق حسابی نیستند؛ آن‌ها کلمات و ارقام را بر اساس احتمال بافت متن پیش‌بینی می‌کنند و در جمع و تفریق اعداد بزرگ دچار خطای محاسباتی می‌شوند.',
      'چون سرورهای هوش مصنوعی مالیات کسر می‌کنند.',
      'داده‌های مالی حجم زیادی دارند و باعث خاموشی مدل می‌شوند.'
    ],
    optionsEn: [
      'Chatbots are unaware of local currency denominations.',
      'LLMs are probabilistic token sequence predictors rather than deterministic arithmetic calculation engines, prone to math errors in large sums.',
      'AI server providers impose hidden tax withholdings on financial computations.',
      'Ledger databases are too voluminous, triggering catastrophic server failure.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'مدل‌های LLM متن را پردازش می‌کنند و عملیات جمع ریاضی را مانند ماشین‌حساب قطعی انجام نمی‌دهند، مگر اینکه از ابزارهای کمکی (Code Interpreter / Python Tool) یا اتصال ساختاریافته به شیت‌های اکسل استفاده کنند.',
    explanationEn: 'LLMs predict tokens rather than performing arithmetic in registers. Reliable financial audit requires grounding coupled with external code interpreters (Python execution).',
    realWorldContextFa: 'برای صورت‌وضعیت‌های کارگاهی، همیشه باید از نوت‌بوک‌ال‌ام یا ابزارهای پایتون کمکی استفاده کرد تا اعداد مستقیماً از جداول سند خوانده شوند نه بر اساس تخمین ذهنی مدل.',
    realWorldContextEn: 'For project progress invoices, always pair language models with deterministic formula execution to pull exact ledger figures from verified spreadsheets.'
  },

  // =========================================================================
  // LEVEL 2: INTERMEDIATE (سطح متوسط / مدیر پروژه - ۱۲ سوال استاندارد CPMAI)
  // =========================================================================
  {
    id: 13,
    level: 'intermediate',
    category: 'cpmai_patterns',
    categoryFa: 'متدولوژی CPMAI و فازهای چرخه حیات',
    categoryEn: 'CPMAI Methodology Lifecycle',
    categoryIcon: 'Layers',
    questionFa: 'بر اساس متدولوژی استاندارد شناختی CPMAI (Cognitive Project Management for AI)، فاز اول پروژه کدام است و چرا شروع با فاز مدل‌سازی اشتباهی فاجعه‌بار محسوب می‌شود؟',
    questionEn: 'According to the CPMAI standard, what is Phase I, and why is rushing directly into model training a catastrophic blunder?',
    scenarioFa: 'تیم هوش مصنوعی شرکت پیشنهاد می‌دهد بلافاصله یک مدل دیپ‌لرنینگ برای کنترل پیشرفت کارگاه خریداری یا آموزش داده شود.',
    scenarioEn: 'A vendor urges purchasing an expensive deep learning progress tracking model without a validated use case.',
    optionsFa: [
      'فاز اول، خرید کارت‌های گرافیک GPU است.',
      'فاز اول، جمع‌آوری یک میلیون عکس از محیط کارگاه است.',
      'فاز اول، نصب سیستم‌عامل لینوکس بر روی سرورهای محلی است.',
      'فاز اول «درک کسب‌وکار (Business Understanding)» است؛ بدون تعریف شاخص‌های موفقیت عینی، بررسی راه‌حل‌های سنتی و توجیه مالی ROI، پروژه در معرض شکست قرار می‌گیرد.'
    ],
    optionsEn: [
      'Phase I is the bulk acquisition of high-performance GPU hardware.',
      'Phase I is capturing a million unstructured drone photos of the construction site.',
      'Phase I is installing open-source Linux distributions across local workstations.',
      'Phase I is "Business Understanding"; without defining quantifiable business KPIs, evaluating non-cognitive baselines, and proving ROI, failure is guaranteed.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'بیش از ۸۰ درصد پروژه‌های هوش مصنوعی سنتی به این دلیل شکست می‌خورند که قبل از درک دقیق صورت‌مسئله کسب‌وکار، ذی‌نفعان و سنجش راه‌حل‌های غیرشناختی ارزان‌تر، مستقیماً وارد کدنویسی مدل می‌شوند.',
    explanationEn: 'Over 80% of enterprise AI pilots collapse because teams code models before rigorously qualifying stakeholder value and non-cognitive baselines in Phase I.',
    realWorldContextFa: 'کتاب‌کار ۲۱ صفحه‌ای CPMAI فاز اول را در صفحات ۱ تا ۷ به تثبیت اهداف، معیار موفقیت، ROI و گزینه‌های جایگزین غیرهوش‌مصنوعی اختصاص داده است.',
    realWorldContextEn: 'Pages 1 through 7 of the CPMAI Workbook dedicate Phase I to defining objective business metrics, ROI justification, and non-cognitive alternatives.'
  },
  {
    id: 14,
    level: 'intermediate',
    category: 'cpmai_patterns',
    categoryFa: 'الگوهای هفت‌گانه هوش مصنوعی',
    categoryEn: 'The 7 Patterns of AI',
    categoryIcon: 'Cpu',
    questionFa: 'در طبقه‌بندی بنیادین CPMAI، «الگوهای هفت‌گانه هوش مصنوعی (Seven Patterns of AI)» کدام الگوریتم‌ها هستند؟',
    questionEn: 'Under the CPMAI methodology, what do the Seven Patterns of AI represent?',
    scenarioFa: 'مدیر پروژه می‌خواهد برای کنترل نشست زمین در حین حفاری تونل مترو، الگوی مناسب هوش مصنوعی را انتخاب کند.',
    scenarioEn: 'A project manager needs to identify the proper AI pattern for monitoring ground settlement during TBM tunnel boring.',
    optionsFa: [
      'پایتون، جاوا، سی‌پلاس‌پلاس، اس‌کیو‌ال، جاوااسکریپت، گو، کاتلین.',
      'شخصی‌سازی افراطی، سیستم‌های خودمختار، مکالمه‌ای، شناسایی و طبقه‌بندی، تحلیل و پیش‌بینی الگوها، سیستم‌های هدف‌محور، و کشف الگوها و ناهنجاری‌ها (Anomaly Detection).',
      'سرعت، دقت، امنیت، حافظه، گرافیک، صدا، تصویر.',
      'ورودی، پردازش، حافظه، خروجی، فایروال، کابل‌کشی، سرور.'
    ],
    optionsEn: [
      'Python, Java, C++, SQL, JavaScript, Go, Kotlin.',
      'Hyperpersonalization, Autonomous Systems, Conversational/Human Interaction, Recognition, Predictive Analytics, Goal-Driven Systems, and Patterns & Anomalies.',
      'Speed, Accuracy, Security, Memory, Graphics, Audio, Video.',
      'Input, Processing, Storage, Output, Firewall, Cabling, Rack Server.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'شناخت این ۷ الگو به مدیر پروژه اجازه می‌دهد معماری، داده‌های مورد نیاز و سنجه‌های ارزیابی را متناسب با ماهیت مسئله انتخاب کند. برای نشست تونل، الگوی Patterns & Anomaly Detection و Predictive Analytics کاربرد دارند.',
    explanationEn: 'Categorizing problems into the 7 Patterns dictates required training data, architectural complexity, and evaluation metrics.',
    realWorldContextFa: 'در کتاب‌کار CPMAI (صفحات ۱۲ و ۱۳)، پروژه‌ها به این الگوها نگاشت می‌شوند تا ابزار و ریسک‌های متناسب مشخص گردند.',
    realWorldContextEn: 'Workbook Pages 12 & 13 map corporate initiatives directly against these 7 patterns to clarify toolsets and deployment risks.'
  },
  {
    id: 15,
    level: 'intermediate',
    category: 'rag_notebooklm',
    categoryFa: 'معماری RAG و استخراج دانش',
    categoryEn: 'RAG Architecture & Document Retrieval',
    categoryIcon: 'BookOpen',
    questionFa: 'تفاوت بنیادین میان «معماری تولید با بازیابی افزوده (RAG)» و «آموزش مجدد یا Fine-Tuning مدل» در پروژه‌های فنی چیست؟',
    questionEn: 'What is the operational difference between RAG (Retrieval-Augmented Generation) and Fine-Tuning when auditing proprietary contracts?',
    scenarioFa: 'مشاور پروژه تصمیم دارد برای استعلام اسناد مناقصه، بین آپلود مدارک در سیستم RAG و بازآموزی اختصاصی مدل یکی را انتخاب کند.',
    scenarioEn: 'A consultant must choose between a RAG architecture and fine-tuning an open-source model to query technical specs.',
    optionsFa: [
      'معماری RAG با جستجو در منابع اسناد سازمانی به‌روز، بدون تغییر وزن‌های مدل، پاسخ مستند با ارجاع دقیق می‌دهد؛ در حالی که Fine-Tuning وزن‌های مدل را برای یادگیری لحن تغییر می‌دهد و تضمینی برای جلوگیری از توهم ندارد.',
      'معماری RAG فقط برای متون انگلیسی کاربرد دارد، اما Fine-Tuning برای زبان فارسی است.',
      'معماری RAG نیاز به ابرکامپیوترهای فوق گران‌قیمت دارد ولی Fine-Tuning در چند ثانیه روی لپ‌تاپ انجام می‌شود.',
      'معماری RAG تمام اسناد را روی اینترنت عمومی منتشر می‌کند.'
    ],
    optionsEn: [
      'RAG dynamically retrieves verified enterprise chunks without modifying weights, providing precise citations; Fine-Tuning updates weights to teach style/syntax but does not guarantee factual grounding.',
      'RAG is strictly compatible with English, whereas Fine-Tuning is exclusive to Persian.',
      'RAG demands multi-million dollar supercomputers, whereas Fine-Tuning runs in seconds on consumer laptops.',
      'RAG exposes all proprietary files publicly across external search indexes.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'در پروژه‌های مهندسی که اسناد مدام تغییر می‌کنند (نقشه‌های As-Built، الحاقیه‌ها)، سیستم RAG (مانند Google NotebookLM) بسیار چابک‌تر، ارزان‌تر و قابل اتکاتر است، زیرا به هر پاسخ منبع دقیق الصاق می‌کند.',
    explanationEn: 'RAG retrieves real-time project revisions and pins direct citations to sources, whereas fine-tuning is static, expensive, and still prone to hallucinating facts.',
    realWorldContextFa: 'در کارگاه آموزشی نوت‌بوک‌ال‌ام، با بارگذاری اسناد پیمانکاری، ظرف چند ثانیه یک سیستم RAG محلی بدون نیاز به کدنویسی در اختیار مدیران قرار می‌گیرد.',
    realWorldContextEn: 'In the NotebookLM lab, uploading project contracts yields an instant grounded RAG environment with verified citations without writing a single line of code.'
  },
  {
    id: 16,
    level: 'intermediate',
    category: 'metrics_evaluation',
    categoryFa: 'سنجه‌های ارزیابی و ماتریس اغتشاش',
    categoryEn: 'Precision vs. Recall Tradeoff',
    categoryIcon: 'Target',
    questionFa: 'در سیستم هوش مصنوعی تشخیص ترک‌های بحرانی سازه پل، چرا سنجه «پوشش (Recall)» اولویت بالاتری نسبت به «دقت (Precision)» دارد؟',
    questionEn: 'In a vision AI system detecting critical structural bridge fractures, why is Recall prioritized over Precision?',
    scenarioFa: 'مهندس ناظر ارشد متوجه می‌شود مدل گاهی خط و خش‌های سطحی بتن را به اشتباه ترک بحرانی اعلام می‌کند (False Positive)، اما هیچ ترک خطرناکی را از قلم نمی‌اندازد.',
    scenarioEn: 'An inspector notes the vision model occasionally flags paint scratches as structural cracks (False Positive), but never misses an actual fissure.',
    optionsFa: [
      'چون محاسبه فرمول Recall در اکسل ساده‌تر از Precision است.',
      'چون استانداردهای بین‌المللی اجازه استفاده از Precision را نمی‌دهند.',
      'چون هزینه یک مثبت کاذب (بررسی مجدد توسط ناظر) بسیار ناچیز است، اما منفی کاذب (عدم تشخیص ترک واقعی) می‌تواند منجر به ریزش پل و فاجعه انسانی شود.',
      'چون مدل‌های هوش مصنوعی اصولاً نمی‌توانند Precision بالای ۵۰ درصد داشته باشند.'
    ],
    optionsEn: [
      'Because Recall calculation formulas are simpler to evaluate in spreadsheets.',
      'Because international civil codes legally ban Precision benchmarking.',
      'Because the operational cost of a False Positive (human reinspection) is trivial, while a False Negative (missing a catastrophic fissure) risks structural collapse and loss of human life.',
      'Because computer vision models can never theoretically exceed 50% Precision.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'در کاربردهای ایمنی‌محور و پزشکی، منفی کاذب (False Negative) مرگبار است. بالا بردن Recall تضمین می‌کند تمام عیوب بحرانی شناسایی شوند، حتی اگر ناظر انسانی مجبور شود چند مورد آلارم اشتباه را بازبینی کند.',
    explanationEn: 'In life-safety engineering, False Negatives carry fatal consequences. Maximizing Recall captures all true defects, accepting marginal human reinspection overhead.',
    realWorldContextFa: 'کتاب‌کار CPMAI در صفحه ۱۸ و ۱۹ ماتریس اغتشاش و حساسیت‌های سنجه‌ها را دقیقاً بر مبنای هزینه مالی و جانی خطاهای False Positive و False Negative تدوین می‌کند.',
    realWorldContextEn: 'CPMAI Workbook Pages 18 & 19 calibrate confusion matrices based explicitly on the financial and safety penalties of False Positives versus False Negatives.'
  },
  {
    id: 17,
    level: 'intermediate',
    category: 'cpmai_patterns',
    categoryFa: 'توجیه اقتصادی و بازگشت سرمایه',
    categoryEn: 'ROI & Cost-Benefit Analysis',
    categoryIcon: 'Calculator',
    questionFa: 'در فاز اول CPMAI، محاسبه شاخص بازگشت سرمایه (ROI) برای پروژه هوش مصنوعی چگونه تدوین می‌شود؟',
    questionEn: 'In CPMAI Phase I, how is the Return on Investment (ROI) justification modeled for an enterprise AI initiative?',
    scenarioFa: 'مدیرعامل شرکت سرمایه‌گذاری برای تصویب بودجه خرید لایسنس پلتفرم هوش مصنوعی، برآورد ملموس صرفه‌جویی را طلب می‌کند.',
    scenarioEn: 'The CEO demands a quantifiable payback model before authorizing enterprise AI infrastructure licensing.',
    optionsFa: [
      'با اعلام اینکه هوش مصنوعی ترند روز دنیاست و همه شرکت‌ها باید آن را داشته باشند.',
      'با مقایسه کل هزینه‌های مالکیت (TCO) شامل سخت‌افزار، لایسنس، داده‌برداری و آموزش با صرفه‌جویی مالی ناشی از کاهش تاخیرات، ادعاهای مالیاتی و کاهش نیروی تکراری.',
      'با درخواست وام بلاعوض از سازمان‌های دولتی بدون توجیه مالی.',
      'با وعده افزایش قیمت سهام شرکت در بورس.'
    ],
    optionsEn: [
      'By arguing that AI is a global trend and mandatory for public prestige.',
      'By comparing Total Cost of Ownership (TCO including compute, licensing, curation, and staffing) directly against validated cost avoidance from schedule delay mitigation and claims defense.',
      'By requesting unmonitored government grants without payback criteria.',
      'By promising vague equity stock appreciation.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'پروژه‌های شناختی بدون توجیه ملموس مالی به سرعت در چرخه Pilot Purgatory گرفتار می‌شوند. در صفحه ۴ و ۵ کتاب‌کار، فرمول هزینه/فایده و سنجه‌های عینی ROI برای اثبات به هیئت‌مدیره تدوین می‌گردد.',
    explanationEn: 'Unquantified AI pilots get trapped in "pilot purgatory". CPMAI Pages 4 & 5 enforce rigorous Total Cost of Ownership (TCO) versus cost-avoidance ROI models.',
    realWorldContextFa: 'جلوگیری از فقط یک ادعای تاخیر غیرمجاز ۵۰ میلیارد ریالی پیمانکار، می‌تواند هزینه ۳ سال زیرساخت هوش مصنوعی شرکت را جبران کند.',
    realWorldContextEn: 'Mitigating a single unwarranted 50-billion-Rial delay penalty claim instantly finances three years of enterprise AI infrastructure costs.'
  },
  {
    id: 18,
    level: 'intermediate',
    category: 'git_governance',
    categoryFa: 'کنترل نسخه و حاکمیت داده',
    categoryEn: 'Version Control & Auditability',
    categoryIcon: 'GitBranch',
    questionFa: 'چرا نگهداری سابقه نسخه‌ها (Version Control با Git و DVC) برای کدها و مجموعه داده‌های هوش مصنوعی در مگاپروژه‌ها الزامی است؟',
    questionEn: 'Why is strict version control (Git & Data Version Control - DVC) non-negotiable for enterprise engineering AI?',
    scenarioFa: 'در جریان یک بازرسی فنی، کارفرما می‌پرسد مدل هوش مصنوعی ۶ ماه پیش بر اساس کدام نسخه نقشه سازه، مجوز بتن‌ریزی سقف را صادر کرده است.',
    scenarioEn: 'An external auditor asks which specific structural drawing revision an AI model used six months ago to approve slab pouring.',
    optionsFa: [
      'برای اینکه پوشه‌های ویندوز مرتب‌تر به نظر برسند.',
      'برای اینکه سرعت کدنویسی برنامه‌نویسان دو برابر شود.',
      'چون گیت‌هاب فضای ذخیره‌سازی نامحدود رایگان برای فیلم‌ها می‌دهد.',
      'برای تضمین تکرارپذیری، امکان ردیابی قانونی تصمیمات گذشته (Auditability)، و بازگردانی سریع سیستم در صورت بروز رفتار پیش‌بینی‌نشده.'
    ],
    optionsEn: [
      'To make Windows folder directories look neat and tidy.',
      'To artificially double developer typing velocity.',
      'Because GitHub provides free unlimited storage for video assets.',
      'To guarantee scientific reproducibility, legal auditability of historical outputs, and rollback capability in the event of behavioral drift.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'در دعاوی حقوقی مهندسی، باید دقیقاً اثبات شود در فلان تاریخ، کدام نسخه داده آموزشی و کدام وزن مدل تصمیم گرفته است. ابزارهای Git و DVC زیربنای حاکمیت شفاف در فاز ۶ CPMAI هستند.',
    explanationEn: 'In legal claims arbitration, parties must mathematically prove which training dataset slice and model checkpoint produced a historic recommendation.',
    realWorldContextFa: 'اگر پیمانکار نقشه Revision 2 را دستکاری کرده باشد، کنترل نسخه گیت مشخص می‌کند خطای تحلیلی ناشی از نسخه فایل ارسالی بوده نه مدل.',
    realWorldContextEn: 'Version control proves whether a flawed site recommendation stemmed from an altered drawing revision or a model inference anomaly.'
  },
  {
    id: 19,
    level: 'intermediate',
    category: 'rag_notebooklm',
    categoryFa: 'استخراج هوشمند دعاوی و ادعاها',
    categoryEn: 'Knowledge Graph & Delay Claim Extraction',
    categoryIcon: 'BookOpen',
    questionFa: 'هنگام پیاده‌سازی سیستم هوشمند کشف تاخیرات با Google NotebookLM، بارگذاری همزمان چه اسنادی «مثلث کشف تناقض» را تشکیل می‌دهد؟',
    questionEn: 'When building an automated delay claim audit in NotebookLM, which three documentation streams form the "Contradiction Triad"?',
    scenarioFa: 'دفتر فنی قصد دارد تناقضات میان ادعای بارندگی پیمانکار با واقعیت کارگاه را کشف کند.',
    scenarioEn: 'A technical office seeks to cross-examine contractor weather delay claims against factual site daily logs.',
    optionsFa: [
      'صورت‌جلسات کارگاهی روزانه (Daily Logs)، برنامه‌زمانی تفصیلی مصوب (Baseline CPM)، و گزارش‌های رسمی هواشناسی یا مستندات ثبت‌شده ورود مصالح.',
      'عکس پروفایل کارکنان، فیش‌های حقوقی و لیست بیمه تامین اجتماعی.',
      'کتاب‌های دانشگاهی مدیریت پروژه، بروشورهای تبلیغاتی و روزنامه‌های کثیرالانتشار.',
      'فاکتورهای خرید تجهیزات کامپیوتری و قرارداد اینترنت کارگاه.'
    ],
    optionsEn: [
      'Daily site logs, approved CPM baseline schedules, and official meteorological station records / material delivery submittals.',
      'Staff badge photos, payroll ledger stubs, and social security tax returns.',
      'Academic project management textbooks, marketing pamphlets, and daily newspapers.',
      'Computer hardware procurement invoices and site internet service agreements.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'هوش مصنوعی زمانی ادعاهای واهی را کشف می‌کند که این سه ضلع را با هم تطبیق دهد: اگر پیمانکار ادعای تعطیلی به علت باران داشته، اما ثبت ورود بتن در همان روز وجود دارد، تناقض آشکار می‌شود.',
    explanationEn: 'AI uncovers fraudulent claims when triangulating claims against baseline schedules and daily delivery logs to surface irreconcilable contradictions.',
    realWorldContextFa: 'در کارگاه آموزشی NotebookLM پلتفرم، دقیقاً این موردکاوی با اسناد شبیه‌سازی‌شده مترو جهت استخراج تاخیرات مجاز پیاده‌سازی شده است.',
    realWorldContextEn: 'In our NotebookLM Workshop, this exact metro triad workflow is implemented to uncover unexcused contractor delay claims.'
  },
  {
    id: 20,
    level: 'intermediate',
    category: 'metrics_evaluation',
    categoryFa: 'مدیریت داده‌های نامتعادل',
    categoryEn: 'Class Imbalance & F1-Score',
    categoryIcon: 'Target',
    questionFa: 'در پیش‌بینی حوادث جانی کارگاهی یا خرابی بحرانی دستگاه TBM که در کمتر از ۱٪ روزها رخ می‌دهد، چرا سنجه Accuracy (صحت کلی) کاملاً فریبنده است؟',
    questionEn: 'In predicting catastrophic site fatalities or TBM breakdowns occurring in under 1% of operational days, why is Accuracy completely misleading?',
    scenarioFa: 'یک مدل هوش مصنوعی ادعا می‌کند ۹۹٪ دقت (Accuracy) دارد، اما هیچ‌گاه خرابی دستگاه را پیش‌بینی نمی‌کند و همیشه خروجی «سالم» می‌دهد.',
    scenarioEn: 'A vendor advertises 99% accuracy, but the model simply predicts "no breakdown" 100% of the time, missing every disaster.',
    optionsFa: [
      'چون Accuracy فقط برای زبان‌های خارجی محاسبه می‌شود.',
      'چون Accuracy نیازمند داشتن حداقل ۱۰ هزار کاربر همزمان است.',
      'در داده‌های نامتعادل (Class Imbalance)، مدلی که همیشه بگوید «هیچ حادثه‌ای رخ نمی‌دهد» به راحتی به ۹۹٪ Accuracy می‌رسد اما در عمل کارایی آن صفر است؛ لذا باید از F1-Score یا PR-AUC استفاده کرد.',
      'چون فرمول ریاضی Accuracy دارای باگ سیستمی در کامپیوترهاست.'
    ],
    optionsEn: [
      'Because Accuracy metrics are only valid when applied to foreign languages.',
      'Because Accuracy requires 10,000 concurrent web users to evaluate.',
      'In severely imbalanced datasets, a trivial model that always predicts "normal" achieves 99% accuracy while having zero utility; F1-score or PR-AUC is required.',
      'Because computer processors contain arithmetic bugs when calculating division by zero.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'مشکل عدم تعادل داده (Class Imbalance) یکی از شایع‌ترین دام‌های مهندسی است. در صفحه ۱۹ کتاب‌کار CPMAI صراحتاً تاکید شده که برای رخدادهای نادر، سنجه F1-Score میانگین همساز Precision و Recall است و مانع فریب مدیر پروژه می‌شود.',
    explanationEn: 'Class imbalance renders raw accuracy useless. CPMAI Page 19 mandates F1-Score (harmonic mean of Precision & Recall) to prevent catastrophic false confidence.',
    realWorldContextFa: 'دستگاه حفار تونل مترو در ۹۹.۵٪ روزها کار می‌کند. مدلی که خرابی‌های نادر بلبرینگ اصلی را نبیند، حتی با ۹۹٪ صحت کلی، خسارت ۱۰۰ میلیاردی توقف دستگاه را به بار می‌آورد.',
    realWorldContextEn: 'A TBM runs smoothly 99.5% of the time. An AI missing bearing seizures with 99% raw accuracy still causes millions of dollars in catastrophic stoppage costs.'
  },
  {
    id: 21,
    level: 'intermediate',
    category: 'cpmai_patterns',
    categoryFa: 'پایش و افت کارایی مدل',
    categoryEn: 'Model Drift & Concept Drift',
    categoryIcon: 'TrendingUp',
    questionFa: 'پدیده «افت تدریجی مدل (Model & Concept Drift)» در پروژه‌های چندساله ساخت و ساز به چه دلیلی رخ می‌دهد؟',
    questionEn: 'Why does "Model & Concept Drift" occur across multi-year infrastructure megaprojects?',
    scenarioFa: 'مدلی که سال گذشته تاخیرات ترخیص گمرکی را با دقت عالی پیش‌بینی می‌کرد، امسال پیش‌بینی‌های بسیار نادرستی ارائه می‌دهد.',
    scenarioEn: 'A model that accurately forecasted customs clearance lead times last year now produces massive forecasting errors.',
    optionsFa: [
      'سیم‌های سرور شل شده یا کابل‌های شبکه کهنه شده‌اند.',
      'تعداد بازدیدکنندگان سایت پلتفرم کاهش یافته است.',
      'کدهای پایتون به دلیل گذشت زمان فاسد می‌شوند.',
      'رفتار محیطی، قوانین ارزی، تحریم‌ها، تورم یا رفتار پیمانکاران در گذر زمان تغییر کرده و داده‌های پیشین دیگر بیانگر واقعیت روز نیستند.'
    ],
    optionsEn: [
      'Physical network Ethernet cables have degraded over time.',
      'Site visitor web traffic volume has diminished.',
      'Python source code undergoes bit rot and logical expiration.',
      'Macroeconomic dynamics, inflation, supply chains, regulatory policies, or contractor behavior shift over time, rendering historical training data unrepresentative.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'مدل‌های هوش مصنوعی ایستا هستند در حالی که جهان پروژه پویاست. در فاز ششم CPMAI (Model Operationalization) پایش مستمر، تعیین آستانه افت کارایی و بازآموزی دوره‌ای مدل پیش‌بینی الزامی است.',
    explanationEn: 'Trained models are static snapshots; real megaproject environments evolve. CPMAI Phase VI enforces ongoing monitoring pipelines to trigger retraining upon drift detection.',
    realWorldContextFa: 'تغییر ناگهانی نرخ ارز یا قوانین ثبت سفارش قطعات یدکی پمپ‌بنزین‌ها، الگوهای ترخیص را دگرگون کرده و نیاز به کالیبراسیون فوری مدل دارد.',
    realWorldContextEn: 'Abrupt foreign exchange tariff revisions instantly alter customs clearance lead times, invalidating old predictive model parameters.'
  },
  {
    id: 22,
    level: 'intermediate',
    category: 'git_governance',
    categoryFa: 'نشت داده در آموزش مدل',
    categoryEn: 'Data Leakage Prevention',
    categoryIcon: 'ShieldAlert',
    questionFa: '«نشت داده (Data Leakage)» در ساخت مدل هوش مصنوعی پیش‌بینی تاخیرات پروژه چیست و چگونه از آن جلوگیری می‌شود؟',
    questionEn: 'What is "Data Leakage" in training predictive project models and how is it rigorously prevented?',
    scenarioFa: 'مدل هوش مصنوعی در محیط تست آزمایشگاهی ۱۰۰٪ پیش‌بینی درست داشت، اما در کارگاه واقعی عملکرد فاجعه‌باری به جای گذاشت.',
    scenarioEn: 'A model achieved 100% predictive accuracy in laboratory cross-validation, but completely failed when deployed live on site.',
    optionsFa: [
      'ورود اطلاعاتی از آینده (مانند صورت‌جلسه توافق نهایی تاخیرات) به ویژگی‌های آموزشی مدل، به طوری که مدل پاسخ نهایی را در زمان آموزش دیده‌است.',
      'ریختن مایعات یا چای روی هارد دیسک سرور حاوی داده‌ها.',
      'هک شدن پسورد اکانت دیتابیس توسط مهندسان رقیب.',
      'عدم استفاده از فونت استاندارد در شیت‌های اکسل.'
    ],
    optionsEn: [
      'Accidentally incorporating target outcome information from the future (such as final negotiated settlement values) into training features.',
      'Spilling beverages over physical server storage chassis.',
      'Brute-force credential compromises executed by rival construction firms.',
      'Neglecting to apply standard typography fonts in spreadsheet templates.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'نشت داده زمانی رخ می‌دهد که ویژگی‌هایی که فقط «پس از وقوع رخداد» آشکار می‌شوند، به عنوان ورودی به مدل داده شوند. مدل در آزمون تست این تقلب را می‌خواند اما در محیط واقعی داده‌های آینده در دسترس نیستند.',
    explanationEn: 'Data leakage happens when features only observable after an event occurs are fed into the training matrix, creating false perfection that fails live.',
    realWorldContextFa: 'اگر در پیش‌بینی ادعای پیمانکار، تاریخ صدور چک خسارت را جزو ورودی‌ها بگذارید، مدل ادعا را حدس نمی‌زند بلکه از تاریخ چک می‌فهمد که ادعا تایید شده بوده است!',
    realWorldContextEn: 'If a model predicting claim validity is fed the settlement check timestamp, it cheats during training and fails live when no check exists yet.'
  },
  {
    id: 23,
    level: 'intermediate',
    category: 'metrics_evaluation',
    categoryFa: 'تعهدات قراردادی و کنترل تاخیرات',
    categoryEn: 'EVM & Baseline Schedule Alignment',
    categoryIcon: 'Target',
    questionFa: 'در پلتفرم CPMAI، پیوند سنجه‌های تحلیل ارزش کسب‌شده (EVM) نظیر SPI و CPI با مدل‌های هوش مصنوعی چه مزیتی برای مدیران ارشد دارد؟',
    questionEn: 'In CPMAI engineering workflows, what strategic advantage does pairing EVM metrics (SPI/CPI) with AI predictive pipelines deliver?',
    scenarioFa: 'مدیر پروژه می‌خواهد بداند آیا پروژه‌ای با شاخص عملکرد زمانی SPI = 0.82 در موعد مقرر به پایان می‌رسد یا خیر.',
    scenarioEn: 'A project manager asks whether an infrastructure package with SPI = 0.82 can recover to hit targeted commissioning deadlines.',
    optionsFa: [
      'مدل هوش مصنوعی بدون نیاز به پول و بودجه پروژه را در زمان معین تمام می‌کند.',
      'هوش مصنوعی به جای نگاه منفعلانه به گذشته، اثر تاخیرات جاری شاخص SPI را با تاخیرات زنجیره‌ای فعالیت‌های مسیر بحرانی (CPM) تلفیق کرده و تاریخ دقیق تحویل واقعی را هشدار می‌دهد.',
      'هوش مصنوعی به صورت خودکار مقادیر SPI را دستکاری می‌کند تا پروژه در گزارش‌ها سبز نشان داده شود.',
      'نیازی به نرم‌افزارهای پریماورا P6 یا ام‌اس‌پروژکت نخواهد بود.'
    ],
    optionsEn: [
      'The AI system magically completes site tasks without human labor or financial budget.',
      'Rather than passive historical reporting, AI integrates current SPI float erosion across forward critical path activities (CPM) to forecast realistic completion dates.',
      'The AI automatically fabricates SPI numbers to falsely paint the project progress green in steering committee slide decks.',
      'Primavera P6 and Microsoft Project enterprise tools can be completely decommissioned.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'شاخص‌های سنتی EVM فقط نشان می‌دهند تا الان چقدر عقب هستیم، اما اثرات تاخیرات را بر روابط پیش‌نیازی آینده پیش‌بینی نمی‌کنند. هوش مصنوعی مسیر بحرانی دینامیک را برآورد می‌کند.',
    explanationEn: 'Classic EVM indicates historical lag but cannot model non-linear cascade disruptions across future schedule constraints. AI forecasts dynamic critical path slippage.',
    realWorldContextFa: 'کتاب‌کار CPMAI در صفحه ۲ و ۳ شاخص‌های موفقیت تکرار پروژه را دقیقا با سنجه‌های کنترلی EVM و مدیریت تغییرات همسو می‌سازد.',
    realWorldContextEn: 'CPMAI Workbook Pages 2 & 3 align project iteration success directly with objective Earned Value Management baseline variances.'
  },
  {
    id: 24,
    level: 'intermediate',
    category: 'cpmai_patterns',
    categoryFa: 'معیارهای پذیرش ذی‌نفعان در فازهای مهندسی',
    categoryEn: 'Stakeholder Acceptance & Model Readiness',
    categoryIcon: 'CheckCircle2',
    questionFa: 'در فاز ارزیابی مدل (Model Evaluation) طبق متدولوژی CPMAI، تایید نهایی مدل هوش مصنوعی بر چه اساسی انجام می‌شود؟',
    questionEn: 'Under CPMAI Phase V (Model Evaluation), what benchmark governs formal stakeholder sign-off?',
    scenarioFa: 'دانشمند داده شرکت مدلی با دقت ریاضی بالا آورده است، اما ناظران کارگاه حاضر به استفاده از آن نیستند چون خروجی‌ها قابل فهم نیست.',
    scenarioEn: 'A data scientist presents a mathematically complex model, but site engineers refuse to adopt it because outputs lack explainability.',
    optionsFa: [
      'هر مدلی که تعداد پارامترهای بیشتری داشته باشد خودبه‌خود تایید می‌شود.',
      'رای‌گیری در کانال تلگرامی سازمان برای انتخاب مدل برتر.',
      'انطباق با معیارهای پذیرش کسب‌وکار (Business Acceptance Criteria) که در فاز ۱ تعریف شده بود، نه صرفاً نمرات ریاضی دقت؛ مدل باید برای مهندسان قابل تفسیر و در فرآیند کارگاهی عملیاتی باشد.',
      'تایید فقط بر عهده واحد IT سازمان است و نیازی به نظر مهندسان پروژه نیست.'
    ],
    optionsEn: [
      'Whichever model exhibits the highest parameter count is automatically certified.',
      'Running a social media poll among field staff to pick the favorite model.',
      'Fulfillment of the operational Business Acceptance Criteria established in Phase I, rather than abstract mathematical loss metrics alone, ensuring explainability for site teams.',
      'Sign-off is the sole discretion of corporate IT without technical office or project manager participation.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'موفقیت در CPMAI با رضایت ذی‌نفع و انطباق با اهداف کسب‌وکار سنجیده می‌شود. مدلی با ۹۸٪ دقت که مهندسان دلیل پیش‌بینی‌های آن را نفهمند، کنار گذاشته خواهد شد.',
    explanationEn: 'CPMAI defines success through stakeholder adoption and business value realization. An unexplainable black-box model will be rejected by field engineers regardless of accuracy scores.',
    realWorldContextFa: 'کتاب‌کار در صفحه ۲۱ سنجه‌های KPI پذیرش را تدوین کرده تا فاصله بین دانشمندان داده و مهندسان اجرایی پل زده شود.',
    realWorldContextEn: 'Workbook Page 21 defines acceptable KPI performance values to bridge the critical chasm between data scientists and executive project sponsors.'
  },

  // =========================================================================
  // LEVEL 3: ADVANCED (سطح پیشرفته / راهبر ارشد و معمار AI - ۱۲ سوال عمیق سازمانی)
  // =========================================================================
  {
    id: 25,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'سیستم‌های چندعاملی در مگاپروژه‌ها',
    categoryEn: 'Multi-Agent Autonomous Orchestration',
    categoryIcon: 'Cpu',
    questionFa: 'در معماری سیستم‌های چندعاملی (Multi-Agent Workflows) برای کنترل فنی مگاپروژه‌ها، تفکیک وظایف بر چه اساسی صورت می‌پذیرد؟',
    questionEn: 'In Multi-Agent enterprise architectures for megaproject oversight, what is the core architectural principle for agent role separation?',
    scenarioFa: 'سازمان قصد دارد فرآیند ارزیابی صورت‌وضعیت‌ها را از طریق چند هوش مصنوعی خودکارسازی کند تا احتمال تبانی و خطای انسانی حذف شود.',
    scenarioEn: 'An infrastructure agency deploys a multi-agent framework to audit contractor interim payment certificates.',
    optionsFa: [
      'تعریف عامل‌های تخصصی مجزا (مانند عامل استخراج مقادیر، عامل تطبیق با فهرست‌بها، عامل راستی‌آزمایی قرارداد) همراه با یک عامل منتقد/داور (Critic/Verifier) جهت کنترل تناقضات.',
      'استفاده از یک مدل بسیار بزرگ به تنهایی برای همه کارها بدون نیاز به ساختار چندعاملی.',
      'دادن دسترسی مستقیم به هوش مصنوعی برای امضا و پرداخت چک‌های بانکی پروژه.',
      'اجرای همزمان ۵ چت‌بات در تب‌های مختلف گوگل کروم.'
    ],
    optionsEn: [
      'Decomposing workflows into specialized discrete agents (e.g. Quantity Extractor, Specification Verifier, Contract Adjudicator) supervised by an independent Critic/Verifier agent.',
      'Deploying a monolithic ultra-large model to execute all multi-disciplinary workflows without decomposition.',
      'Granting autonomous agents direct credentialed authorization to sign and disburse bank transfers.',
      'Manually opening five browser tabs with generic commercial chatbot interfaces.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'سیستم‌های چندعاملی با تقسیم مسئولیت و نقد متقابل خروجی‌ها (Agentic Verification) توهم را به شدت کاهش می‌دهند. عامل اول بندهای قرارداد را می‌خواند، عامل دوم مقادیر نقشه را استخراج می‌کند و عامل سوم عدم تطابق‌ها را به صورت مدلل گزارش می‌دهد.',
    explanationEn: 'Multi-agent architectures isolate cognitive tasks and enforce peer verification protocols (Critic/Verifier), driving hallucination down while maintaining auditable logs.',
    realWorldContextFa: 'در دفتر فنی، تفکیک وظیفه بین عامل بررسی نقشه‌ها و عامل انطباق با شرایط عمومی پیمان مانع از پذیرش صورت‌وضعیت‌های فاقد مصوبه تغییر مقادیر می‌شود.',
    realWorldContextEn: 'Separating technical drawing verification agents from contract compliance agents prevents accepting unauthorized scope variance invoices.'
  },
  {
    id: 26,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'استقرار درون‌سازمانی و بدون اینترنت',
    categoryEn: 'Air-Gapped & On-Premises Deployments',
    categoryIcon: 'Database',
    questionFa: 'در پروژه‌های ملی حساس (سدها، تاسیسات انرژی و مترو)، الزامات استقرار مدل‌های زبانی به صورت کاملاً Air-Gapped (بدون اینترنت) چیست؟',
    questionEn: 'In critical national infrastructure (dams, nuclear energy, defense transit), what are the foundational requirements for Air-Gapped on-premise AI deployments?',
    scenarioFa: 'شورای امنیت سازمان دستور داده کلیه ابزارهای هوش مصنوعی باید روی سرورهای ایزوله محلی بدون کوچک‌ترین اتصال خارجی مستقر گردند.',
    scenarioEn: 'A national security directive orders all AI inference pipelines to run on air-gapped on-premise servers with zero external connectivity.',
    optionsFa: [
      'کشیدن کابل شبکه در ساعت‌های اداری و وصل کردن آن در شب.',
      'خرید اکانت پرمیوم ChatGPT با پروکسی‌های پنهان.',
      'استقرار مدل‌های منبع‌باز سبک و کوانتیزه‌شده (Local LLMs) نظیر Llama 3 یا DeepSeek روی کلاسترهای GPU داخلی با موتورهای استنتاجی مانند vLLM یا Ollama و پایگاه برداری محلی.',
      'نصب آنتی‌ویروس قوی روی لپ‌تاپ مدیر پروژه.'
    ],
    optionsEn: [
      'Disconnecting Ethernet cables during office hours and reconnecting overnight.',
      'Purchasing commercial cloud tokens routed through obfuscated enterprise proxies.',
      'Deploying quantized open-weights models (Local LLMs like Llama 3 or DeepSeek) orchestrated via high-throughput inference engines (vLLM, Ollama) against local vector stores.',
      'Installing consumer antivirus utilities on project executive laptops.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'امنیت در مگاپروژه‌ها نیازمند عدم خروج حتی یک بایت داده به خارج از فایروال سازمان است. استفاده از مدل‌های منبع‌باز روی سخت‌افزار اختصاصی محلی با پایگاه داده‌های برداری محلی (مانند pgvector روی Neon یا Qdrant) این امر را محقق می‌سازد.',
    explanationEn: 'Zero-trust defense infrastructure prohibits external packet routing. Quantized open-weight models hosted on internal clusters provide sovereign AI capabilities.',
    realWorldContextFa: 'با استقرار لوکال، اسناد مناقصات محرمانه و نقشه‌های تاسیسات زیرزمینی پدافندی بدون نیاز به اینترنت و با سرعت فوق‌العاده پردازش و جستجو می‌شوند.',
    realWorldContextEn: 'Air-gapped deployment enables confidential military and subway tunnel blueprints to be indexed securely with instantaneous local inference.'
  },
  {
    id: 27,
    level: 'advanced',
    category: 'rag_notebooklm',
    categoryFa: 'معماری وکتور دیتابیس‌ها و استراتژی تقطیع',
    categoryEn: 'Hybrid Vector Search & Chunking Strategy',
    categoryIcon: 'Database',
    questionFa: 'در پیاده‌سازی سیستم RAG سازمانی روی اسناد پیمانکاری، چرا ترکیب جستجوی معنایی متراکم (Dense Embeddings) و جستجوی کلمه‌کلیدی (BM25) تحت عنوان Hybrid Search ضروری است؟',
    questionEn: 'Why is Hybrid Search (combining dense vector embeddings with sparse BM25 keyword matching) mandatory when querying technical contract databases?',
    scenarioFa: 'مدل برداری نمی‌تواند پلاک ثبتی ملک معارض یا شماره دقیق بخشنامه ۵ رقمی را بیابد، هرچند مفهوم حقوقی آن را می‌فهمد.',
    scenarioEn: 'A dense vector search model understands the legal concept of an expropriated parcel, but consistently fails to locate the exact 5-digit plot registration number.',
    optionsFa: [
      'برای اینکه سرعت پاسخگویی مدل ۵ برابر شود.',
      'چون الگوریتم BM25 مصرف برق سرور را کاهش می‌دهد.',
      'چون وکتور دیتابیس‌ها قادر به ذخیره بیش از ۱۰۰ سند نیستند.',
      'چون جستجوی برداری کلمات کوتاه و ارقام دقیق را در فضای برداری به خوبی تفکیک نمی‌کند و جستجوی BM25 دقت کدهای فنی و پلاک‌ها را تضمین می‌نماید.'
    ],
    optionsEn: [
      'To artificially increase LLM inference token generation speed fivefold.',
      'Because sparse BM25 indexing algorithms reduce physical datacenter electrical consumption.',
      'Because vector databases crash when document collections exceed 100 files.',
      'Dense embeddings compress semantic meaning but blur exact alphanumeric serials and clause codes; sparse BM25 guarantees deterministic exact-match retrieval.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'مدل‌های Embedding معنا را درک می‌کنند اما در تطابق اعداد خاص (مانند ماده ۴۶-الف یا شماره بخشنامه) ضعیف هستند. ترکیب BM25 و Dense با الگوریتم Reciprocal Rank Fusion (RRF) بهترین دقت را در متون مهندسی رقم می‌زند.',
    explanationEn: 'Dense embeddings excel at conceptual semantic search but struggle with exact alphanumeric strings. Hybrid search with Reciprocal Rank Fusion delivers peak engineering precision.',
    realWorldContextFa: 'وقتی مهندس می‌نویسد «شماره استعلام ۲۳۴-ب مربوط به تحویل زمین»، سیستم هم شماره سند را با BM25 پیدا می‌کند و هم مفهوم تاخیرات تحویل زمین را با Embeddings استخراج می‌نماید.',
    realWorldContextEn: 'When searching for "Notice 234-B regarding delayed possession", BM25 catches the precise document ID while vector embeddings catch the conceptual delay narrative.'
  },
  {
    id: 28,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'تحلیل حالت‌های شکست مدل و جدول FMEA',
    categoryEn: 'AI Failure Mode & Effects Analysis (FMEA)',
    categoryIcon: 'ShieldAlert',
    questionFa: 'جدول «تحلیل حالت‌های شکست و اثرات آن (FMEA)» برای سیستم‌های هوش مصنوعی سازمانی چه عواملی را اندازه‌گیری می‌کند؟',
    questionEn: 'What does a Failure Mode and Effects Analysis (FMEA) framework measure when stress-testing enterprise AI models?',
    scenarioFa: 'کمیته ریسک مگاپروژه می‌خواهد بداند در صورت خطای هوش مصنوعی در پایش شیب شیروانی خاکی، سیستم چگونه ایمن متوقف خواهد شد.',
    scenarioEn: 'A risk committee audits how the predictive AI slope stability system safely fails if sensor telemetry drifts.',
    optionsFa: [
      'میزان حقوق دریافتی برنامه‌نویسان و سرعت تایپ آن‌ها در گیت‌هاب.',
      'شدت اثر خرابی (Severity)، احتمال وقوع خطا (Occurrence)، و احتمال کشف پیش از آسیب (Detection) جهت تعیین عدد اولویت ریسک (RPN).',
      'دمای قطعات کامپیوتری و میزان خنک‌کنندگی فن‌ها.',
      'تعداد لایک‌های دریافتی گزارش‌های هفتگی در شبکه‌های اجتماعی.'
    ],
    optionsEn: [
      'Software developer compensation packages and typing metrics on GitHub commits.',
      'Failure Severity (S), Likelihood of Occurrence (O), and Detection capability (D) to calculate the actionable Risk Priority Number (RPN).',
      'Physical processor component temperatures and fan RPM acoustics.',
      'Social media engagement metrics across executive company releases.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'روش استاندارد FMEA برای هوش مصنوعی، خطرات ناشی از توهم، نشت داده، سوگیری و انحراف مدل را بر اساس ۳ شاخص S و O و D ارزیابی می‌کند تا مکانیزم‌های Fallback خودکار طراحی شوند.',
    explanationEn: 'AI FMEA quantifies failure modes (hallucination, data shift, bias) across Severity, Occurrence, and Detectability to establish automated graceful degradation guardrails.',
    realWorldContextFa: 'در پلتفرم CPMAI، در صورت عدم قطعیت بالای مدل در پایش شیب ترانشه، سیستم خودبه‌خود پرچم قرمز بالا برده و کنترل را به تجهیزات ژئوتکنیکی آنالوگ و ناظر انسانی بازمی‌گرداند.',
    realWorldContextEn: 'In our CPMAI framework, high inference uncertainty triggers an automated safe fallback, reverting operational authority to analog geotechnical gauges.'
  },
  {
    id: 29,
    level: 'advanced',
    category: 'metrics_evaluation',
    categoryFa: 'شاخص‌های کلیدی عملکرد فنی مدل',
    categoryEn: 'Technical KPIs (Latency, Throughput, Drift)',
    categoryIcon: 'Gauge',
    questionFa: 'در فاز پنجم و ششم متدولوژی CPMAI، تفاوت «سنجه‌های عملکرد مدل (Model KPIs)» با «سنجه‌های ارزش کسب‌وکار (Business KPIs)» چیست؟',
    questionEn: 'In CPMAI Phases V & VI, what differentiates Technical Model KPIs from Strategic Business KPIs?',
    scenarioFa: 'تیم هوش مصنوعی افت تاخیر پاسخ‌دهی (Latency) به زیر ۲۰۰ میلی‌ثانیه را جشن گرفته است، اما مدیر پروژه از افزایش هزینه‌های ادعایی پیمانکار شکایت دارد.',
    scenarioEn: 'Data engineers celebrate driving inference latency below 200ms, yet the project director notes contract claims costs continue to escalate.',
    optionsFa: [
      'سنجه‌های کسب‌وکار متعلق به قرن گذشته است و هوش مصنوعی فقط با سنجه‌های فنی ارزیابی می‌شود.',
      'سنجه‌های فنی با ریال سنجیده می‌شوند و سنجه‌های کسب‌وکار با مگابایت.',
      'سنجه‌های فنی (مانند Loss، F1-Score، Latency، Throughput) کیفیت الگوریتم را می‌سنجند؛ در حالی که سنجه‌های کسب‌وکار (مانند صرفه‌جویی ریالی، کاهش تاخیرات پروژه، زمان چرخه تایید اسناد) ارزش حاصله برای سازمان را اندازه‌گیری می‌کنند.',
      'این دو کاملاً یکسان هستند و هیچ تفاوتی با هم ندارند.'
    ],
    optionsEn: [
      'Business KPIs are legacy artifacts; modern AI initiatives are governed exclusively by raw compute metrics.',
      'Technical KPIs are measured in monetary currency while Business KPIs are measured in megabytes.',
      'Technical Model KPIs (Loss, F1-Score, Latency, Token Throughput) assess algorithmic health; Business KPIs (cost avoidance, claim settlement velocity, schedule float preserved) quantify enterprise ROI.',
      'They are identical and interchangeable terms.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'مدل می‌تواند از نظر فنی سریع و با دقت بالا باشد، اما اگر بر روی مسئله‌ای بی‌اهمیت اعمال شود، هیچ ارزش تجاری برای پروژه نخواهد داشت. کتاب‌کار CPMAI در صفحات ۲۰ و ۲۱ این دو سنجه را با هم کالیبره می‌کند.',
    explanationEn: 'A model may boast high accuracy, but if misaligned with operational bottlenecks, it delivers zero economic return. CPMAI Pages 20 & 21 tightly couple technical thresholds to corporate milestones.',
    realWorldContextFa: 'کاهش زمان بررسی یک نامه ادعایی از ۱۴ روز به ۲ ساعت (Business KPI) ثمره ارتقای سنجه F1-Score مدل به بالای ۹۲٪ (Technical KPI) است.',
    realWorldContextEn: 'Compressing claim adjudication cycles from 14 days to 2 hours (Business KPI) is unlocked by driving model F1-Score above 92% (Technical KPI).'
  },
  {
    id: 30,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'تنظیم آستانه تصمیم‌گیری با هزینه خطا',
    categoryEn: 'Cost-Weighted Confusion Matrix Optimization',
    categoryIcon: 'Target',
    questionFa: 'در تصمیم‌گیری‌های مالی پروژه‌ای، بهینه‌سازی «آستانه تصمیم (Decision Threshold)» بر مبنای ماتریس هزینه چه معنایی دارد؟',
    questionEn: 'In high-stakes project dispute arbitration, what does optimizing the Decision Threshold against a Cost Matrix signify?',
    scenarioFa: 'در پایش نشت نفت خط لوله انتقال، هزینه بررسی اشتباه یک کیلومتر لوله ۵۰ میلیون ریال است، اما هزینه نشت کشف‌نشده ۲۰۰ میلیارد ریال خسارت دارد.',
    scenarioEn: 'In pipeline leak detection, false alarm reinspection costs 50 million Rials, but an undetected leak inflicts 200 billion Rials in catastrophic environmental damages.',
    optionsFa: [
      'تنظیم آستانه احتمال مدل (مثلاً تغییر از 0.5 به 0.15) برای کاهش حداکثری خطاهای بسیار گران‌قیمت (False Negatives)، حتی به قیمت افزایش خطاهای کم‌هزینه (False Positives).',
      'تعیین آستانه سرعت خودروهای حمل بتن در جاده‌های کارگاهی.',
      'ثابت نگه داشتن آستانه روی ۰.۵ تحت هر شرایطی چون استاندارد ریاضی است.',
      'کاهش هزینه‌های پروژه با اخراج ناظران کنترل کیفی.'
    ],
    optionsEn: [
      'Calibrating the probability decision cutoff (e.g. lowering from 0.5 to 0.15) to minimize catastrophic high-cost False Negatives at the deliberate expense of harmless False Positives.',
      'Setting speed governor thresholds for site concrete agitator trucks.',
      'Dogmatically anchoring the threshold at 0.5 because academic textbooks assume symmetry.',
      'Cutting operational budgets by dismissing certified quality control inspectors.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'در دنیای واقعی، هزینه خطاهای مختلف یکسان نیست. وقتی هزینه نادیده گرفتن یک فاجعه ۴۰۰۰ برابر هزینه بررسی اشتباه است، آستانه حساسیت مدل باید به سمت کشف حداکثری هشدارهای خطرناک جابجا شود.',
    explanationEn: 'Error costs are inherently asymmetric. When missing a disaster is 4,000x costlier than checking a false alarm, the threshold must be tuned toward hyper-sensitive detection.',
    realWorldContextFa: 'در صفحه ۱۷ و ۱۸ کتاب‌کار CPMAI، جدول ماتریس اغتشاش دقیقا با ضرایب خسارت مالی و ریسک اعتباری کارفرما وزن‌دهی می‌شود.',
    realWorldContextEn: 'Workbook Pages 17 & 18 parameterize the confusion matrix with weighted monetary penalty coefficients reflecting true liability exposure.'
  },
  {
    id: 31,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'سفارشی‌سازی سبک و کارآمد مدل‌ها',
    categoryEn: 'PEFT & LoRA Adaptation for Engineering Specs',
    categoryIcon: 'Cpu',
    questionFa: 'مزیت استراتژیک تکنیک‌های LoRA و PEFT در انطباق مدل‌های پایه زبانی با اصطلاحات پیچیده قراردادهای مهندسی چیست؟',
    questionEn: 'What is the strategic architectural advantage of LoRA (Low-Rank Adaptation) and PEFT when specializing foundation LLMs on dense engineering contracts?',
    scenarioFa: 'سازمان قصد دارد یک مدل زبانی ۷۰ میلیارد پارامتری را برای تحلیل شرایط عمومی پیمان و نشریات سازمان برنامه سازگار کند، اما بودجه خرید ده‌ها سرور گران‌قیمت را ندارد.',
    scenarioEn: 'An agency aims to adapt a 70B parameter open-weights model to local state procurement regulations on a limited budget.',
    optionsFa: [
      'حذف نیمی از لایه‌های مدل برای سبک شدن برنامه.',
      'قفل کردن وزن‌های اصلی مدل و آموزش دادن فقط بخش بسیار کوچکی (زیر ۱٪) از ماتریس‌های وزن افزوده، که هزینه محاسباتی و سخت‌افزاری را بیش از ۹۰٪ کاهش می‌دهد.',
      'ترجمه همه قراردادها به زبان انگلیسی و سپس استفاده از مدل‌های خارجی.',
      'استفاده از هوش مصنوعی برای تایپ سریع‌تر متون در ورد.'
    ],
    optionsEn: [
      'Deleting 50% of the transformer layers to lighten disk footprint.',
      'Freezing the core model weights and updating less than 1% of parameters via low-rank adapter matrices, slashing GPU compute and VRAM overhead by over 90%.',
      'Translating all Persian contracts into English to leverage foreign commercial APIs.',
      'Using consumer generative autocomplete plugins to type text faster in Word.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'آموزش کامل (Full Fine-Tuning) مدل‌های بزرگ نیازمند کلاسترهای فوق‌سنگین است. با تکنیک LoRA می‌توان آدپتورهای سبکی ساخت که در حافظه یک سرور محلی جای گرفته و زبان تخصصی مقررات ملی را فرا بگیرند.',
    explanationEn: 'Full parameter fine-tuning is economically prohibitive. LoRA injects trainable low-rank decomposition matrices, enabling enterprise domain specialization on modest local GPUs.',
    realWorldContextFa: 'یک تیم مهندسی با آموزش یک LoRA Adapter پنجاه مگابایتی روی مدل Llama، توانست اصطلاحات متروی تهران و نشریه ۱۰۱ را با دقت شگفت‌انگیز تحلیل کند.',
    realWorldContextEn: 'By training a 50MB LoRA adapter on an open-weight foundation model, teams can inject local civil engineering terminology without re-training the base architecture.'
  },
  {
    id: 32,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'ارزیابی خودکار با رویکرد داوری',
    categoryEn: 'LLM-as-a-Judge Evaluation & Ragas Framework',
    categoryIcon: 'BookCheck',
    questionFa: 'چارچوب «داوری مدل با مدل (LLM-as-a-Judge)» و سنجه‌های Ragas در سیستم‌های ادعای مهندسی چگونه عمل می‌کنند؟',
    questionEn: 'How does the "LLM-as-a-Judge" evaluation framework (Ragas metrics) measure output reliability across technical claim synthesizers?',
    scenarioFa: 'برای اطمینان از کیفیت پاسخ‌های هوش مصنوعی به سوالات مناقصه‌گران، نیاز به ارزیابی خودکار هزاران پاسخ بدون اتکا به نیروی انسانی است.',
    scenarioEn: 'An agency needs to continuously audit thousands of automated tender Q&A answers without manual human review bottlenecks.',
    optionsFa: [
      'بررسی اینکه آیا پاسخ به زبان شعر یا نثر ادبی نگاشته شده است.',
      'مقایسه سرعت اینترنت سرور در زمان پاسخ‌دهی.',
      'امتیازدهی بر اساس تعداد کلمات به‌کاررفته در متن خروجی.',
      'اندازه‌گیری سنجه‌های علمی نظیر وفاداری به منبع (Faithfulness)، ارتباط پاسخ (Answer Relevance) و انطباق با واقعیت زمینه (Context Precision) از طریق یک مدل ارزیاب مستقل و بی‌طرف.'
    ],
    optionsEn: [
      'Scoring whether technical answers exhibit poetic eloquence or formal prose.',
      'Comparing local broadband bandwidth metrics during inference generation.',
      'Rating quality strictly based on the gross word count of the generated output.',
      'Benchmarking programmatic metrics such as Faithfulness to context, Answer Relevance, and Context Recall via an independent, prompt-engineered evaluator model.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'چارچوب Ragas بررسی می‌کند آیا تمام ادعاهای پاسخ در متن استخراج‌شده وجود دارند (Faithfulness) و آیا پاسخ واقعاً پرسش مطرح‌شده را حل کرده است (Relevance)، که از ارزیابی‌های سلیقه‌ای جلوگیری می‌کند.',
    explanationEn: 'Ragas mathematically calculates whether generated assertions are faithfully grounded in retrieved context and directly answer the underlying prompt query.',
    realWorldContextFa: 'در پلتفرم CPMAI، پاسخ‌های تولیدی نوت‌بوک‌ال‌ام با سنجه Faithfulness ارزیابی می‌شوند تا اطمینان حاصل شود هیچ تفسیری خارج از شرایط عمومی پیمان صادر نشده است.',
    realWorldContextEn: 'In enterprise CPMAI audits, Faithfulness scores ensure every generated contractual defense assertion is strictly anchored in ratified contractual clauses.'
  },
  {
    id: 33,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'تضمین خروجی ساختاریافته و نرده‌های محافظ',
    categoryEn: 'Guardrails & Structured JSON Function Calling',
    categoryIcon: 'ShieldAlert',
    questionFa: 'چرا اجبار مدل به تولید «خروجی ساختاریافته با اسکیمای JSON (Structured Output via Schema/Function Calling)» برای اتصال هوش مصنوعی به سیستم‌های ERP و پریماورا P6 حیاتی است؟',
    questionEn: 'Why is enforcing Structured JSON Output via Function Calling / Schema Validation critical when integrating AI with ERP and Primavera P6 systems?',
    scenarioFa: 'خروجی هوش مصنوعی قرار است مستقیماً به عنوان فعالیت‌های جدید وارد نرم‌افزار پریماورا P6 یا بانک داده اوراکل پروژه شود.',
    scenarioEn: 'AI outputs must programmatically inject newly identified mitigation tasks into Primavera P6 and Oracle Primavera Cloud.',
    optionsFa: [
      'چون نرم‌افزارهای سازمانی متن‌های انشایی و توصیفی را نمی‌فهمند؛ خروجی باید دارای فیلدهای قطعی معتبر (مانند Activity_ID، Duration، Cost) با انواع داده مشخص باشد تا فرآیند پایپ‌لاین قطع نگردد.',
      'چون کدهای JSON باعث زیباتر شدن ظاهر صفحه نمایش می‌شوند.',
      'چون شرکت سازنده نرم‌افزار P6 استفاده از فرمت متنی را قدغن کرده است.',
      'برای اینکه سرعت اینترنت پایگاه داده کاهش نیابد.'
    ],
    optionsEn: [
      'Because enterprise software rejects unformatted prose; inputs must adhere to strict type schemas (Activity_ID, Duration, Cost) to prevent automated pipeline crashes.',
      'Because JSON formatting makes web user interfaces look aesthetically pleasing.',
      'Because Primavera developers legally prohibited natural language file imports.',
      'To preserve database query socket transmission speeds.'
    ],
    correctAnswerIndex: 0,
    explanationFa: 'استفاده از Guardrails و خروجی ساختاریافته تضمین می‌کند مدل متنی تصادفی تولید نکند و خروجی همیشه دقیقاً با نوع داده‌های مورد انتظار سیستم‌های سازمانی (مانند تاریخ معتبر، عدد اعشاری مشخص) مطابقت داشته باشد.',
    explanationEn: 'Structured output guarantees deterministic JSON schemas, preventing parsing crashes and validating datatypes before downstream ERP database ingestion.',
    realWorldContextFa: 'اگر مدل به جای عدد «۳۰ روز» عبارت «حدوداً یک ماه» را خروجی دهد، دیتابیس پریماورا با خطای Crash مواجه می‌شود؛ اما اسکیمای JSON عدد صحیح 30 را تضمین می‌کند.',
    realWorldContextEn: 'If an LLM emits "approximately a month" instead of integer 30 for duration, Primavera crashes. Enforced JSON schemas guarantee valid integer delivery.'
  },
  {
    id: 34,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'کوانتیزاسیون و بهینه‌سازی استنتاج',
    categoryEn: 'Model Quantization (FP16 vs INT4/INT8 Optimization)',
    categoryIcon: 'Cpu',
    questionFa: 'فناوری «کوانتیزاسیون (Quantization نظیر AWQ یا GGUF/GPTQ)» چگونه امکان اجرای مدل‌های عظیم را بر روی سرورهای محدود شرکتی فراهم می‌سازد؟',
    questionEn: 'How does model Quantization (such as AWQ, GGUF, or INT4/INT8) enable running massive models on constrained enterprise hardware?',
    scenarioFa: 'مدیر فناوری اطلاعات اعلام می‌کند خرید سرور GPU با حافظه VRAM هشتاد گیگابایتی مقدور نیست و تنها یک کارت گرافیک ۲۴ گیگابایتی در اختیار دارند.',
    scenarioEn: 'IT reports that acquiring an 80GB VRAM GPU is impossible, leaving the engineering team with only a single 24GB workstation card.',
    optionsFa: [
      'با پاک کردن کلمات کم‌استفاده از دیکشنری مدل.',
      'با افزایش ولتاژ برق ورودی سرور به دو برابر.',
      'با تبدیل وزن‌های اعشاری ۱۶ بیتی (FP16) به اعداد صحیح ۴ بیتی یا ۸ بیتی (INT4/INT8)، که مصرف حافظه VRAM را به یک‌چهارم کاهش داده و با افت ناچیز دقت، اجرای مدل‌های بزرگ را روی کارت‌های عادی ممکن می‌کند.',
      'با فشرده‌سازی فایل مدل به فرمت ZIP قبل از اجرا.'
    ],
    optionsEn: [
      'By purging infrequent vocabulary terms from the model token dictionary.',
      'By double-stepping datacenter incoming three-phase electrical voltage.',
      'By converting 16-bit floating-point weights (FP16) into 4-bit or 8-bit integers (INT4/INT8), compressing VRAM footprints by up to 75% with negligible accuracy trade-off.',
      'By archiving the foundation model weights into a standard ZIP archive before loading.'
    ],
    correctAnswerIndex: 2,
    explanationFa: 'یک مدل ۷۰ میلیارد پارامتری در حالت FP16 نیازمند حداقل ۱۴۰ گیگابایت حافظه VRAM است. اما در نسخه کوانتیزه‌شده ۴ بیتی (INT4)، در حدود ۴۰ گیگابایت جا می‌گیرد و روی دو کارت معمولی اجرا می‌شود.',
    explanationEn: 'FP16 requires 140GB of VRAM for a 70B parameter model. INT4 quantization compresses the footprint to ~40GB, allowing deployment on cost-effective multi-GPU rigs.',
    realWorldContextFa: 'با کوانتیزاسیون، پلتفرم CPMAI را می‌توان در سرورهای محلی پروژه‌های سدسازی و نیروگاهی بدون نیاز به سخت‌افزارهای چند میلیارد تومانی مستقر کرد.',
    realWorldContextEn: 'Quantization allows deployment of CPMAI local knowledge assistants directly inside isolated hydro-electric and mining field offices.'
  },
  {
    id: 35,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'استانداردها و حاکمیت بین‌المللی AI',
    categoryEn: 'Regulatory Compliance (ISO/IEC 42001 & High-Risk AI)',
    categoryIcon: 'ShieldAlert',
    questionFa: 'بر طبق استاندارد بین‌المللی مدیریت هوش مصنوعی (ISO/IEC 42001) و مقررات سامانه‌های پرریسک (High-Risk AI)، کدام الزام برای پروژه‌های زیرساختی حیاتی اجباری است؟',
    questionEn: 'Under international AI governance standards (ISO/IEC 42001 & EU AI Act for High-Risk Infrastructure Systems), what compliance requirement is mandatory?',
    scenarioFa: 'در پروژه احداث خط متروی پایتخت، سیستم پایش خودکار پایداری سقف ایستگاه با هوش مصنوعی تجهیز شده است.',
    scenarioEn: 'An automated vision AI system monitors underground metro cavern roof stability in an urban megaproject.',
    optionsFa: [
      'استفاده از لوگوی رسمی سازمان ملل روی مستندات پروژه.',
      'ثبت وقایع غیرقابل دستکاری (Tamper-evident Audit Logging)، ارزیابی مستمر ریسک، شفافیت الگوریتم، و الزام وجود کلید توقف اضطراری توسط ناظر انسانی (Human Override).',
      'حذف تمامی کارمندان انسانی و واگذاری ۱۰۰٪ اختیارات به هوش مصنوعی.',
      'ارسال روزانه همه لاگ‌ها به شرکت‌های خارجی تولیدکننده نرم‌افزار.'
    ],
    optionsEn: [
      'Displaying United Nations insignia across operational project documentation.',
      'Tamper-evident audit logging, continuous risk assessment, algorithmic transparency, and mandatory Human Override mechanisms (kill-switches).',
      'Terminating human engineering staff and transferring 100% operational authority to autonomous software.',
      'Routing real-time logs overseas to external software vendor headquarters.'
    ],
    correctAnswerIndex: 1,
    explanationFa: 'سامانه‌های زیرساختی در زمره سیستم‌های با ریسک بالا (High-Risk) هستند. استاندارد ISO 42001 الزام می‌کند همه ورودی‌ها، وزن‌ها و خروجی‌ها قابل ردیابی باشند و انسان همیشه دسترسی لغو تصمیم را داشته باشد.',
    explanationEn: 'Civil infrastructure falls under High-Risk regulatory tiers. ISO 42001 mandates comprehensive traceability, logging, robust validation, and immediate human override override.',
    realWorldContextFa: 'اگر هوش مصنوعی مترو دستور اشتباهی صادر کند، لاگ‌های تغییرناپذیر اثبات می‌کنند خطا در چه مرحله‌ای رخ داده و ناظر ارشد انسانی باید بتواند فوراً مداخله کند.',
    realWorldContextEn: 'In subway monitoring, immutable audit logs provide legal transparency while ensuring field supervisors can override false sensor alarms.'
  },
  {
    id: 36,
    level: 'advanced',
    category: 'enterprise_megaprojects',
    categoryFa: 'معماری جامع هوش مصنوعی سازمانی',
    categoryEn: 'Holistic CPMAI Enterprise Architecture',
    categoryIcon: 'Award',
    questionFa: 'در رهبری تحول هوش مصنوعی در شرکت‌های بزرگ پیمانکاری و مهندسی مشاور، چه عاملی متضمن موفقیت بلندمدت بر اساس متدولوژی CPMAI است؟',
    questionEn: 'In leading enterprise AI transformation across major EPC contracting and consulting firms, what ensures sustainable success according to CPMAI?',
    scenarioFa: 'هیئت‌مدیره قصد دارد بودجه کلانی را برای تحول دیجیتال شرکت در طول برنامه ۵ ساله تصویب کند.',
    scenarioEn: 'The executive board approves a 5-year digital transformation budget for corporate-wide AI adoption.',
    optionsFa: [
      'خرید سریع گران‌ترین نرم‌افزار هوش مصنوعی موجود در بازار بدون آموزش کارکنان.',
      'ممنوعیت کامل استفاده از کامپیوتر در پروژه‌ها.',
      'برگزاری سمینارهای تشریفاتی بدون وارد کردن هوش مصنوعی به جریان واقعی کارهای دفتر فنی.',
      'پیوند عمیق هوش مصنوعی با شایستگی‌های مهندسی انسانی، فرهنگ‌سازی آموزش مستمر، پایبندی به چرخه ۶ فازی CPMAI و شروع از مسائل با ROI بالا و ریسک مهارشده.'
    ],
    optionsEn: [
      'Purchasing the most expensive commercial AI tool on the market without investing in personnel upskilling.',
      'Banning personal computers and spreadsheets from engineering job sites.',
      'Hosting theoretical academic seminars without embedding AI assistants into real technical office daily workflows.',
      'Deep alignment of cognitive technology with human engineering expertise, continuous upskilling, strict adherence to the 6-phase CPMAI methodology, and targeting high-ROI, risk-governed pilot use cases.'
    ],
    correctAnswerIndex: 3,
    explanationFa: 'هوش مصنوعی یک تحول سازمانی است، نه یک ابزار نرم‌افزاری صرف. متدولوژی CPMAI با تمرکز بر درک کسب‌وکار، مهندسی داده، مدیریت ریسک و ارتقای مهارت سرمایه انسانی، موفقیت پایدار را تضمین می‌کند.',
    explanationEn: 'Enterprise AI is an organizational capability transformation. CPMAI guarantees sustainable value by bridging technology, sound engineering discipline, and human workforce leadership.',
    realWorldContextFa: 'کتاب‌کار ۲۱ صفحه‌ای CPMAI اوج، نقشه راه گام‌به‌گام این توانمندسازی را از مهندسی پرامپت فاز صفر تا سنجه‌های نهایی فاز ۶ در اختیار مدیران قرار می‌دهد.',
    realWorldContextEn: 'The OWJ 21-page CPMAI Workbook serves as the definitive end-to-end blueprint, translating conceptual AI potential into governed enterprise megaproject reality.'
  }
];

export const QUIZ_LEVELS: QuizResultLevel[] = [
  {
    minScore: 0,
    maxScore: 5,
    minPercentage: 0,
    maxPercentage: 49,
    levelKey: 'bronze',
    titleFa: 'سطح آشنایی مقدماتی هوش مصنوعی (Foundational Level)',
    titleEn: 'Foundational Knowledge Level',
    badgeFa: 'گواهینامه سطح برنز هوش مصنوعی',
    badgeEn: 'Bronze Certificate Badge',
    colorClass: 'text-[#b45309]',
    borderColorClass: 'border-[#b45309]',
    bgGradientClass: 'from-[#b45309]/10 to-[#b45309]/5',
    summaryFa: 'شما گام‌های نخست آشنایی با مفاهیم هوش مصنوعی را برداشته‌اید. برای ورود به پروژه‌های واقعی، تسلط بر چارچوب‌های پرامپت‌نویسی مهندسی، مهار توهم مدل‌ها و یادگیری الگوهای هفت‌گانه CPMAI ضروری است.',
    summaryEn: 'You possess foundational awareness of AI concepts. Advancing into engineering workflows requires mastering prompt architectures, grounding, and the 7 Patterns of CPMAI.',
    recommendedActionsFa: [
      'مطالعه و تکمیل کارگاه پرامپت‌نویسی در صفحه ۰ کتاب‌کار (Page 0 LLM Fundamentals).',
      'تمرین با الگوی RCTO در کارگاه سندباکس مهندسی جهت مهار خطاهای توهم مدل.',
      'مشاهده بخش‌های استخراج داده با NotebookLM در سناریوهای حل اختلاف کارگاهی.'
    ],
    recommendedActionsEn: [
      'Complete the LLM Fundamentals & Prompting Sandbox on Page 0 of the CPMAI Workbook.',
      'Practice the RCTO prompt framework to minimize hallucination risks in technical queries.',
      'Explore the NotebookLM Workshop for grounded contract claim analysis.'
    ],
    recommendedStartPage: 0
  },
  {
    minScore: 6,
    maxScore: 8,
    minPercentage: 50,
    maxPercentage: 74,
    levelKey: 'silver',
    titleFa: 'سطح کاربردی و تحلیل‌گر پروژه‌های شناختی (Applied AI Practitioner)',
    titleEn: 'Applied AI Practitioner Level',
    badgeFa: 'گواهینامه سطح نقره‌ای تسلط کاربردی',
    badgeEn: 'Silver Certificate Badge',
    colorClass: 'text-[#0284c7]',
    borderColorClass: 'border-[#0284c7]',
    bgGradientClass: 'from-[#0284c7]/10 to-[#0284c7]/5',
    summaryFa: 'عملکرد بسیار خوب! شما درک مناسبی از کاربرد هوش مصنوعی در پروژه‌ها، معماری RAG و تفاوت‌های اتوماسیون با مدل‌های شناختی دارید. اکنون زمان تعمیق فازهای شش‌گانه CPMAI و سنجه‌های ماتریس اغتشاش است.',
    summaryEn: 'Strong performance! Solid grasp of applied AI, RAG concepts, and automation limits. You are well-positioned to master the 6 Phases of CPMAI and advanced confusion matrix metrics.',
    recommendedActionsFa: [
      'تکمیل فاز اول CPMAI (صفحات ۱ تا ۷ کتاب‌کار) شامل تدوین سنجه‌های موفقیت و راه‌حل‌های غیرشناختی.',
      'پیاده‌سازی یک موردکاوی واقعی با نوت‌بوک‌ال‌ام برای تحلیل تاخیرات قرارداد شرکت.',
      'مطالعه الگوهای هفت‌گانه هوش مصنوعی در صفحات ۱۲ و ۱۳ کتاب‌کار.'
    ],
    recommendedActionsEn: [
      'Complete CPMAI Phase I (Pages 1-7) including ROI calculation and non-cognitive alternatives.',
      'Run a real delay claim audit using Google NotebookLM on active project files.',
      'Review the 7 Patterns of AI on Pages 12 & 13.'
    ],
    recommendedStartPage: 1
  },
  {
    minScore: 9,
    maxScore: 10,
    minPercentage: 75,
    maxPercentage: 89,
    levelKey: 'gold',
    titleFa: 'سطح مدیر ارشد پروژه‌های هوش مصنوعی (Enterprise AI Lead)',
    titleEn: 'Enterprise AI Lead Level',
    badgeFa: 'گواهینامه سطح طلایی نخبگان CPMAI',
    badgeEn: 'Gold Level Certificate',
    colorClass: 'text-[#d97706]',
    borderColorClass: 'border-[#d97706]',
    bgGradientClass: 'from-[#d97706]/10 to-[#d97706]/5',
    summaryFa: 'فوق‌العاده است! تسلط شما بر ظرافت‌های سنجه‌های Precision/Recall، حاکمیت داده، معماری RAG و مگاپروژه‌های زیرساختی نشان‌دهنده توانایی رهبری تحول دیجیتال در سازمان‌های بزرگ است.',
    summaryEn: 'Outstanding performance! Deep understanding of Precision/Recall tradeoffs, data governance, RAG architecture, and megaproject risk management.',
    recommendedActionsFa: [
      'تکمیل گام‌به‌گام تمام ۲۱ صفحه کتاب‌کار مهندسی CPMAI و تدوین سند منشور پروژه هوش مصنوعی.',
      'بررسی سنجه‌های KPI فنی مدل و آستانه‌های پذیرش در صفحات ۱۸ تا ۲۱.',
      'طراحی سیستم‌های چندعاملی (Multi-Agent) برای اتوماسیون فرآیندهای دفتر فنی.'
    ],
    recommendedActionsEn: [
      'Complete all 21 pages of the CPMAI Engineering Workbook for an active corporate initiative.',
      'Calibrate technical KPI thresholds and stakeholder acceptance criteria (Pages 18-21).',
      'Architect multi-agent workflows to streamline technical office operations.'
    ],
    recommendedStartPage: 1
  },
  {
    minScore: 11,
    maxScore: 12,
    minPercentage: 90,
    maxPercentage: 100,
    levelKey: 'platinum',
    titleFa: 'سطح معمار ارشد و راهبر ملی هوش مصنوعی (AI Chief Architect)',
    titleEn: 'Master AI Chief Architect Level',
    badgeFa: 'نشان پلاتینیوم معمار ارشد CPMAI',
    badgeEn: 'Platinum Chief Architect Badge',
    colorClass: 'text-[#6d28d9]',
    borderColorClass: 'border-[#6d28d9]',
    bgGradientClass: 'from-[#6d28d9]/10 to-[#6d28d9]/5',
    summaryFa: 'کمال مطلق! پاسخ صحیح به سوالات فوق‌تخصصی نشان‌دهنده درک بی‌نقص شما از تلاقی مهندسی، کنترل نسخه، استراتژی مدل، حاکمیت داده و استانداردهای جهانی نظیر CPMAI است.',
    summaryEn: 'Flawless score! Demonstrates comprehensive mastery across engineering data systems, version control, model performance metrics, and enterprise AI leadership.',
    recommendedActionsFa: [
      'هدایت تدوین استانداردهای هوش مصنوعی سازمانی و رهبری کمیته‌های راهبری پروژه.',
      'منتورینگ مهندسان و مدیران پروژه‌ها در پیاده‌سازی متدولوژی رسمی CPMAI.',
      'طراحی و استقرار خطوط لوله تحلیلی با پایپ‌لاین‌های کاملاً امن On-Premises.'
    ],
    recommendedActionsEn: [
      'Steer enterprise AI governance policy and lead project steering committees.',
      'Mentor engineering executives in certified CPMAI methodology implementation.',
      'Design air-gapped, zero-trust AI pipelines for critical infrastructure.'
    ],
    recommendedStartPage: 1
  }
];

// =========================================================================
// DISCIPLINE & INDUSTRY TRACK ADAPTATIONS (تطبیق سناریوی سوالات با دیسیپلین انتخابی)
// =========================================================================

export interface QuizQuestionAdaptation {
  scenarioFa?: string;
  scenarioEn?: string;
  realWorldContextFa?: string;
  realWorldContextEn?: string;
  questionFa?: string;
  questionEn?: string;
}

export const DISCIPLINE_QUIZ_ADAPTATIONS: Record<
  'ENERGY_PETRO' | 'GENERAL_EVERYDAY',
  Record<number, QuizQuestionAdaptation>
> = {
  ENERGY_PETRO: {
    1: {
      scenarioFa: 'در جلسه تدوین استراتژی مجتمع پتروشیمی، رئیس بهره‌برداری می‌پرسد چرا نباید همان کدهای فرترن یا اکسل‌های محاسباتی فلرینگ را هوش مصنوعی بنامیم؟',
      scenarioEn: 'During a refinery strategy sync, the operations director asks why legacy flare calculation spreadsheets cannot be labeled as AI.',
      realWorldContextFa: 'در صنایع پتروشیمی، یک ماکرو می‌تواند میانگین فشار برج تقطیر را حساب کند؛ اما یک مدل شناختی عوامل ناپیدا مانند رطوبت هوای محیط و ناخالصی خوراک ورودی را در رسوب کوره کشف می‌کند.',
      realWorldContextEn: 'A spreadsheet computes distillation averages; Cognitive AI discovers latent factors like ambient air humidity and feed impurities driving furnace fouling.'
    },
    2: {
      scenarioFa: 'یک مدل هوش مصنوعی در پاسخ به استعلام مهندس پایپینگ، بندی از استاندارد API 1104 یا ASME B31.3 را با لحنی بسیار مطمئن نقل می‌کند که اصلاً در استاندارد وجود ندارد.',
      scenarioEn: 'An LLM quotes a nonexistent piping code clause from API 1104 with extreme confidence during field inspection.',
      realWorldContextFa: 'در استعلام‌های فنی و تست‌های فشار خطوط گاز ترش، استناد به بند ناموجود استاندارد ASME یا API می‌تواند به نشتی فاجعه‌بار گاز و خسارات سنگین انسانی و مالی منجر شود.',
      realWorldContextEn: 'In high-pressure sour gas lines, citing fabricated ASME or API clauses can cause fatal pressure breaches and catastrophic plant shutdowns.'
    },
    3: {
      realWorldContextFa: 'به جای پرامپت کلی، می‌نویسیم: «در نقش مهندس ارشد ایمنی فرآیند پالایشگاه (R)، با توجه به تلمتری فشار و دمای برج الفین (C)، لاگ حوادث فلر را واکاوی کن (T) در قالب جدول ماتریس HAZOP چهار ستونه (O)».',
      realWorldContextEn: 'Instead of vague prompts: "As Lead Process Safety Engineer (R), given distillation tower telemetry (C), analyze flare gas excursion logs (T) into a 4-column HAZOP matrix (O)".'
    },
    7: {
      scenarioFa: 'پیمانکار EPC ادعا می‌کند تاخیر در تحویل نقشه‌های ایزومتریک پایپینگ و P&ID موجب توقف عملیات نصب شده و کلیم بند ۸.۴ فیدیک دارد، در حالی که گزارش لاگ‌های روزانه چیز دیگری نشان می‌دهد.',
      scenarioEn: 'An EPC contractor claims site stoppage under FIDIC Clause 8.4 due to late piping isometric drawings, contradicting field gate logs.',
      realWorldContextFa: 'اگر لاگ‌های ساعات کارکرد جرثقیل‌های سنگین یا ترخیص گمرکی تجهیزات کاتالیست به اشتباه ثبت شوند، خروجی پیش‌بینی ادعای پیمانکار کاملاً غلط و فاقد اعتبار حقوقی در داوری فیدیک خواهد بود.',
      realWorldContextEn: 'If heavy crane rental logs or catalyst customs clearance dates are corrupted, claim forecasting models will collapse in FIDIC international arbitration.'
    },
    10: {
      realWorldContextFa: 'در پروژه‌های پتروشیمی، برای اینکه مدل بتواند تگ‌های مختلف پایپینگ، ولوها و کلاس‌های فلنج را دقیقاً مطابق با استاندارد کدگذاری مدارک پروژه دسته‌بندی کند، چند نمونه قبلی در پرامپت قرار می‌دهیم.',
      realWorldContextEn: 'In petrochemical engineering, few-shot prompt examples teach the LLM project-specific piping valve tags and material specification classes reliably.'
    },
    11: {
      scenarioFa: 'یک سیستم هوش مصنوعی پیشنهاد خاموشی اضطراری (ESD Trip) توربوکمپرسور چند میلیون دلاری پالایشگاه به دلیل لرزش یاتاقان را به صورت خودکار صادر کرده است.',
      scenarioEn: 'An autonomous AI system triggers an Emergency Shutdown (ESD) of a multi-million-dollar olefin compressor due to bearing vibration telemetry.',
      realWorldContextFa: 'هوش مصنوعی می‌تواند ناهنجاری ارتعاشی کمپرسور را گزارش دهد، اما تصمیم شات‌دان واحد الفین (با هزینه توقف ۱ میلیون دلاری در روز) یا سوئیچ به کمپرسور رزرو باید با تایید رئیس بهره‌برداری باشد.',
      realWorldContextEn: 'AI detects vibration anomalies, but executing a plant shutdown costing $1M/day requires final validation by the Chief Operations Superintendent.'
    },
    13: {
      scenarioFa: 'در کارگاه پتروشیمی، تیم پیشنهاد می‌دهد بلافاصله یک مدل دیپ‌لرنینگ برای کنترل پیشرفت راه‌اندازی پلنت خریداری یا آموزش داده شود، بدون تعیین شفاف اهداف تجاری.',
      scenarioEn: 'In a petrochemical complex, the team proposes buying deep learning packages for commissioning progress before defining measurable business ROI.',
      realWorldContextFa: 'کتاب‌کار ۲۱ صفحه‌ای CPMAI فاز اول را به تثبیت اهداف پالایشگاه، سنجه‌های موفقیت، ROI و جایگزین‌های سنتی مهندسی اختصاص داده است.',
      realWorldContextEn: 'Phase 1 of CPMAI requires defining business ROI, licensor performance warranties, and non-AI alternatives before any neural code is written.'
    },
    16: {
      questionFa: 'در سیستم هوش مصنوعی بازرسی جوش و فیلم‌های رادیوگرافی (RT) خطوط لوله پرفشار گاز، چرا سنجه «پوشش حداکثری عیوب (High Recall)» حیاتی‌تر از «دقت خالص (Precision)» است؟',
      questionEn: 'In an AI system inspecting pipeline radiographic weld films (RT), why is High Recall far more critical than High Precision?',
      scenarioFa: 'مهندس ارشد بازرسی NDT متوجه می‌شود مدل گاهی سوختگی‌های جزئی سطحی را به اشتباه ترک بحرانی اعلام می‌کند (False Positive)، اما هیچ ترک عمقی خطرناکی را از قلم نمی‌اندازد.',
      scenarioEn: 'A Senior NDT inspector notices the AI occasionally flags minor surface scratches as cracks (False Positive), but never misses a subterranean crack (False Negative).',
      realWorldContextFa: 'در خطوط لوله انتقال هیدروکربن ترش، هزینه بازرسی مجدد یک نقطه سالم چندصد هزار تومان است، اما ندیدن یک ترک بحرانی جوش به معنای انفجار مرگبار خط در تست هیدروستاتیک است!',
      realWorldContextEn: 'In high-pressure hydrocarbon pipelines, re-inspecting a false alarm costs minimal labor, but missing an internal weld crack causes lethal rupture in hydrotests!'
    },
    17: {
      realWorldContextFa: 'جلوگیری از فقط یک حادثه تریپ اضطراری کوره یا توقف ۲ روزه خط تولید اتیلن به ارزش ۴ میلیون دلار، می‌تواند هزینه کل زیرساخت هوش مصنوعی شرکت را جبران کند.',
      realWorldContextEn: 'Preventing a single unscheduled furnace shutdown saving $4M in olefin losses justifies the entire corporate AI engineering budget.'
    },
    20: {
      scenarioFa: 'در پیش‌بینی حوادث انفجار فرآیندی یا خرابی بحرانی توربوکمپرسور که رویدادی بسیار نادر (کمتر از ۱ در ۱۰,۰۰۰ ساعت) است، چرا معیار Accuracy فریبنده است؟',
      scenarioEn: 'In predicting catastrophic refinery compressor trips or explosion events occurring < 0.01% of operating hours, why is simple Accuracy deceptive?',
      realWorldContextFa: 'کمپرسور گاز در ۹۹.۸٪ روزها بدون مشکل می‌چرخد. مدلی که خرابی‌های نادر خستگی محور را نبیند، حتی با ۹۹.۸٪ صحت کلی، فاجعه آتش‌سوزی در واحد تقطیر را رقم خواهد زد.',
      realWorldContextEn: 'A gas compressor runs smoothly 99.8% of the time. A model predicting "No Failure" achieves 99.8% Accuracy while missing the catastrophe!'
    },
    21: {
      scenarioFa: 'مدل هوش مصنوعی بهینه‌سازی راندمان برج الفین که در بهار عالی کار می‌کرد، با شروع گرمای تابستان دچار افت دقت شدید شده است.',
      scenarioEn: 'An AI yield optimizer for olefin distillation towers performing well in spring experiences sudden degradation during summer heatwaves.',
      realWorldContextFa: 'دریفت مفهومی (Concept Drift) در پتروشیمی زمانی رخ می‌دهد که دمای هوای محیط بالا می‌رود و برج‌های خنک‌کننده راندمان متفاوتی پیدا می‌کنند.',
      realWorldContextEn: 'Concept drift occurs in refineries when ambient summer temperatures alter cooling tower heat exchange physics, invalidating spring training weights.'
    }
  },
  GENERAL_EVERYDAY: {
    1: {
      scenarioFa: 'در جلسه برنامه‌ریزی خانه یا کسب‌وکار، یکی از اعضا می‌پرسد چرا نباید یک اکسل جمع هزینه‌ها یا نرم‌افزار حسابداری ساده را هوش مصنوعی بنامیم؟',
      scenarioEn: 'During a household budgeting discussion, a family member asks why a spreadsheet calculating monthly expenses cannot be termed AI.',
      realWorldContextFa: 'یک ماشین‌حساب یا اکسل می‌تواند مجموع هزینه‌های ماهانه سبد خرید را جمع بزند؛ اما هوش مصنوعی شناختی الگوی پنهان مصرف خوراکی‌ها، خریدهای هیجانی و زمان بهینه خرید اقلام قبل از گرانی را کشف می‌کند.',
      realWorldContextEn: 'A calculator totals grocery receipts; Cognitive AI discovers hidden consumption velocity, impulse spending leaks, and optimal vacation booking windows.'
    },
    2: {
      scenarioFa: 'یک مدل هوش مصنوعی در پاسخ به سوال مادر درباره داروی سرماخوردگی کودک یا مقررات رژیم غذایی، مطلبی کاملاً خیالی و غیرعلمی را با لحنی بسیار مطمئن توصیه می‌کند.',
      scenarioEn: 'An LLM recommends an unverified dietary concoction for a toddler with supreme confidence when prompted by a parent.',
      realWorldContextFa: 'در سلامت خانواده و تربیت فرزند، استناد به اطلاعات توهمی بدون منبع می‌تواند به سلامت کودک آسیب زده یا موجب زیان مالی و اضطراب شود.',
      realWorldContextEn: 'In parenting and household wellness, ungrounded hallucinations can compromise child nutrition, waste money, or generate needless panic.'
    },
    3: {
      realWorldContextFa: 'به جای پرامپت مبهم، می‌نویسیم: «در نقش کارشناس اقتصاد خانوار و تغذیه (R)، با توجه به این اقلام موجود در یخچال و بودجه ۵۰۰ هزار تومانی (C)، برنامه شام ۴ نفره کم‌هزینه و سالم پیشنهاد بده (T) در قالب جدول دستور پخت ۵ مرحله‌ای (O)».',
      realWorldContextEn: 'Instead of vague prompts: "As Family Meal & Budget Specialist (R), given my fridge pantry items and 4 family members (C), generate 3 zero-waste dinners (T) in a 5-step recipe table (O)".'
    },
    7: {
      scenarioFa: 'کاربر عکس فاکتورهای مخدوش و ناخوانای خرید سوپرمارکت را به مدل می‌دهد و انتظار دارد هوش مصنوعی بودجه ماه آینده را دقیق پیش‌بینی کند.',
      scenarioEn: 'A user uploads blurry, incomplete receipts from local corner shops and expects the AI to forecast monthly household cashflow perfectly.',
      realWorldContextFa: 'اگر پیامک‌های واریز و برداشت بانکی یا مبالغ خرید اشتباه یا ناقص به سیستم داده شوند، هوش مصنوعی سبد مصرفی خانوار را کاملاً غیرواقعی تخمین خواهد زد.',
      realWorldContextEn: 'If bank SMS alerts or POS receipt line items contain missing prices, the household financial model produces distorted, misleading advice.'
    },
    10: {
      realWorldContextFa: 'برای اینکه مدل بتواند لحن پیام‌های پیگیری طلب از دوستان، نامه‌های اداری، یا تکالیف داستانی کودک را دقیقاً مطابق با سلیقه شما تنظیم کند، قراردادن دو نمونه موفق در پرامپت معجزه می‌کند.',
      realWorldContextEn: 'In everyday life, providing 2 example polite text messages or playful story samples enables the AI to mirror your personal conversational voice perfectly.'
    },
    11: {
      scenarioFa: 'یک بات هوش مصنوعی مدیریت مالی خانواده، پیشنهاد لغو فوری بیمه تکمیلی درمان یا حراج وسایل ضروری را برای کاهش هزینه‌های جاری صادر کرده است.',
      scenarioEn: 'An automated personal finance bot recommends cancelling essential health insurance policies to hit an artificial monthly savings target.',
      realWorldContextFa: 'هوش مصنوعی می‌تواند مسیرهای صرفه‌جویی در هزینه را نشان دهد، اما تصمیمات حساس زندگی (سلامت، آموزش کودک یا مسکن) حتماً نیازمند قضاوت و تایید نهایی پدر و مادر است.',
      realWorldContextEn: 'AI identifies cost optimization paths, but life decisions impacting health, education, or shelter strictly demand human parental judgment.'
    },
    13: {
      scenarioFa: 'در راه‌اندازی یک پروژه شخصی یا کسب‌وکار خانگی، فرد بلافاصله یک سیستم پیچیده یادگیری ماشین می‌خرد بدون اینکه اهداف دقیق مالی و مشتریان را شفاف کرده باشد.',
      scenarioEn: 'When launching a family business or micro-creator channel, someone buys complex AI tools before validating customer demand or target ROI.',
      realWorldContextFa: 'متدولوژی CPMAI تاکید می‌کند قبل از هرگونه کدنویسی یا استفاده از ابزارهای پیچیده، باید هدف دقیق (مثلاً کاهش ۲۵٪ هزینه‌ها یا افزایش فروش) مشخص و سود آن سنجیده شود.',
      realWorldContextEn: 'CPMAI mandates defining concrete value (e.g., cutting 25% grocery waste, booking lowest airfare) and measuring ROI before adopting complex tech.'
    },
    16: {
      questionFa: 'در سیستم هوش مصنوعی پایش کیفیت و تاریخ انقضای مواد غذایی خانه و فروشگاه، چرا سنجه «پوشش حداکثری عیوب (High Recall)» حیاتی‌تر از «دقت خالص (Precision)» است؟',
      questionEn: 'In an AI system detecting spoiled groceries and expired dairy in household pantries, why is High Recall more vital than High Precision?',
      scenarioFa: 'سامانه کنترل کیفیت گاهی میوه‌های لکه‌دار سالم را به اشتباه فاسد اعلام می‌کند (False Positive)، اما هرگز گوشت یا لبنیات تاریخ‌گذشته خطرناک را سالم اعلام نمی‌کند.',
      scenarioEn: 'A food freshness scanner occasionally flags spotted ripe fruit as spoiled (False Positive), but never passes expired dairy as safe (False Negative).',
      realWorldContextFa: 'اگر سیستم یک سیب با پوست کدر را دورریز پیشنهاد دهد ضرر کمی دارد، اما اگر شیر فاسد را تایید کند سلامت فرزندان خانواده به خطر می‌افتد!',
      realWorldContextEn: 'Discarding safe bruised produce costs cents, but certifying salmonella-tainted food poisons your family members!'
    },
    17: {
      realWorldContextFa: 'صرفه‌جویی ماهیانه ۸ الی ۱۲ میلیون تومان با حذف دورریز غذا و خریدهای هیجانی، می‌تواند ظرف ۶ ماه بودجه سفر تفریحی کامل خانواده را تامین کند.',
      realWorldContextEn: 'Saving $200-$300 monthly by eliminating grocery waste and impulse leaks fully finances your dream family holiday within 6 months.'
    },
    20: {
      scenarioFa: 'در پیش‌بینی حراج‌های استثنایی و لحظه‌ای بلیت هواپیما و هتل‌ها (کمتر از ۱٪ روزها)، چرا معیار Accuracy گمراه‌کننده است؟',
      scenarioEn: 'In predicting rare 48-hour flight flash sales and hotel super-deals occurring on < 1% of calendar days, why is Accuracy deceptive?',
      realWorldContextFa: 'نرخ پروازها در ۹۹٪ روزها عادی است. مدلی که همیشه بگوید «امروز تخفیفی نیست»، ۹۹٪ دقت ریاضی دارد اما هیچ تخفیف و آفر طلایی را برای خانواده شکار نخواهد کرد!',
      realWorldContextEn: 'Flights sit at base rates 99% of days. A lazy model predicting "No Sale" boasts 99% Accuracy yet saves zero dollars for family vacations!'
    },
    21: {
      scenarioFa: 'سیستم هوشمند مدیریت خرید خانه که پاییز عالی کار می‌کرد، با شروع اسفندماه و خریدهای عید نوروز دچار پیش‌بینی‌های نامربوط شده است.',
      scenarioEn: 'A smart household grocery bot working flawlessly in autumn fails to predict March holiday shopping and seasonal New Year expenses.',
      realWorldContextFa: 'دریفت مفهومی (Concept Drift) زمانی رخ می‌دهد که الگوهای تقویمی، تورم یا مناسبت‌ها تغییر می‌کنند و رفتار خرید خانواده دیگر شبیه روزهای عادی نیست.',
      realWorldContextEn: 'Concept drift occurs when seasonal festivities, school terms, or macro-inflation fundamentally alter normal family purchase cadences.'
    }
  }
};

export function getAdaptedQuizQuestions(
  level: AiFamiliarityLevel = 'intermediate',
  disciplineId?: DisciplineId,
  industryTrack?: IndustryTrackId
): QuizQuestion[] {
  const effectiveTrack: IndustryTrackId =
    industryTrack ||
    (disciplineId ? getDisciplineMetadata(disciplineId).trackId : getSavedIndustryTrack());
  const effectiveDiscipline: DisciplineId =
    disciplineId || getSavedDiscipline(effectiveTrack);
  const discMeta = getDisciplineMetadata(effectiveDiscipline);

  const baseQuestions = QUIZ_QUESTIONS.filter((q) => q.level === level);

  if (effectiveTrack === 'CIVIL_INFRA') {
    return baseQuestions;
  }

  const trackAdaptations = DISCIPLINE_QUIZ_ADAPTATIONS[effectiveTrack] || {};

  return baseQuestions.map((q) => {
    const adapt = trackAdaptations[q.id];
    if (!adapt) return q;

    return {
      ...q,
      questionFa: adapt.questionFa || q.questionFa,
      questionEn: adapt.questionEn || q.questionEn,
      scenarioFa: adapt.scenarioFa ? adapt.scenarioFa.replace('[دیسیپلین]', discMeta.shortTitleFa) : q.scenarioFa,
      scenarioEn: adapt.scenarioEn ? adapt.scenarioEn.replace('[Discipline]', discMeta.shortTitleEn) : q.scenarioEn,
      realWorldContextFa: adapt.realWorldContextFa || q.realWorldContextFa,
      realWorldContextEn: adapt.realWorldContextEn || q.realWorldContextEn
    };
  });
}
