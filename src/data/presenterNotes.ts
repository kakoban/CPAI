export type PresenterPageKey = 'landing' | 'quiz' | number;

export interface PresenterSessionNote {
  sessionKey: string;
  pacingFa: string;
  pacingEn: string;
  focusFa: string;
  focusEn: string;
  classQuestionFa: string;
  classQuestionEn: string;
  pitfallFa: string;
  pitfallEn: string;
}

export const CUSTOM_NOTES_STORAGE_KEY = 'cpmai_presenter_custom_notes_v1';
export const PRESENTER_MASK_STORAGE_KEY = 'cpmai_presenter_privacy_mask_v1';

export const PRESENTER_SESSION_NOTES: Record<string, PresenterSessionNote> = {
  '0': {
    sessionKey: '0',
    pacingFa: 'حدود ۲۰ دقیقه روی معماری کلی و سپس اجرای زنده دموی ۱-۱',
    pacingEn: '20m big-picture framing, then run Demo 1-1 live',
    focusFa: 'نشان دهید چت‌بات روزمره با مهندسی AI مبتنی بر Drive، Markdown، Skills و MCP تفاوت ساختاری دارد.',
    focusEn: 'Contrast ad-hoc chatbot prompting with structured Drive + Markdown + Skills + MCP pipelines.',
    classQuestionFa: 'آخرین بار چند فایل اکسل با نام Final_Rev داشتید و چطور وسط پروژه گم شد؟',
    classQuestionEn: 'How many Final_Rev files did your team lose track of last month?',
    pitfallFa: 'از جزئیات کدنویسی پرهیز کنید؛ ابتدا منطق اتصال و استانداردسازی داده را در ذهن دانشجو جا بیندازید.',
    pitfallEn: 'Avoid deep syntax early; anchor why data standardization precedes prompting.',
  },
  '1': {
    sessionKey: '1',
    pacingFa: '۱۵ دقیقه توضیح مفاهیم + ۲۰ دقیقه پر کردن گام ۲ روی پروژه واقعی کلاس',
    pacingEn: '15m concept framing + 20m live worksheet fill in Step 2',
    focusFa: 'مرز بین «ایده جذاب AI» و «درد واقعی کسب‌وکار» را با مثال ملموس سازمان روشن کنید.',
    focusEn: 'Separate shiny AI ideas from measurable business pain using the active track example.',
    classQuestionFa: 'اگر بودجه پروژه را خودتان می‌دادید، این مسئله ارزش حل کردن با AI را دارد؟',
    classQuestionEn: 'If you funded this yourself, would solving this problem justify AI investment?',
    pitfallFa: 'دانشجوها معمولاً به‌جای «هدف کسب‌وکار»، «تکنولوژی راه‌حل» را در برگه می‌نویسند؛ اصلاحش کنید.',
    pitfallEn: 'Students often write the tech solution instead of the business objective; redirect them.',
  },
  '2': {
    sessionKey: '2',
    pacingFa: '۱۵ دقیقه مرور اسکوپ چابک (Agile Iteration)',
    pacingEn: '15m on Agile iteration scoping',
    focusFa: 'تأکید کنید CPMAI پروژه‌ها را در اسپرینت‌های کوچک می‌شکند تا شکست پرهزینه رخ ندهد.',
    focusEn: 'Emphasize slicing CPMAI delivery into small sprints so failures stay cheap.',
    classQuestionFa: 'کوچک‌ترین نسخه قابل‌ارائه (Slice) که در ۴ هفته خروجی ملموس بدهد چیست؟',
    classQuestionEn: 'What is the smallest slice of this problem that delivers tangible value in 4 weeks?',
    pitfallFa: 'نگذارید اسکوپ تکرار اول، کل سازمان را همزمان پوشش دهد.',
    pitfallEn: 'Prevent teams from stuffing the entire enterprise scope into Iteration 1.',
  },
  '3': {
    sessionKey: '3',
    pacingFa: '۲۰ دقیقه تعریف KPIهای عینی و قابل اندازه‌گیری',
    pacingEn: '20m defining objective, measurable KPIs',
    focusFa: 'تبدیل جملات کلی مثل «بهبود سرعت» به اعداد دقیق قبل و بعد از پروژه.',
    focusEn: 'Translate vague wishes like "improve speed" into crisp before/after metrics.',
    classQuestionFa: 'روز تحویل پروژه، مدیرعامل با چه عددی می‌گوید این پروژه موفق بوده است؟',
    classQuestionEn: 'On launch day, which exact number convinces leadership this project succeeded?',
    pitfallFa: 'خطا: نوشتن «دقت مدل ۹۵٪» به‌جای «کاهش ۳۰٪ زمان بررسی پرونده»؛ دقت مدل کار جلسه ۱۸ است.',
    pitfallEn: 'Watch out for model accuracy metrics sneaking in here—those belong in Session 18.',
  },
  '4': {
    sessionKey: '4',
    pacingFa: '۱۵ دقیقه بررسی هزینه‌های پنهان (نگهداری، داده، لیبل‌گذاری)',
    pacingEn: '15m uncovering hidden AI costs (labeling, maintenance, drift)',
    focusFa: 'هزینه AI فقط خرید GPU یا API نیست؛ آماده‌سازی داده و نگهداری مداوم بخش اصلی بودجه است.',
    focusEn: 'AI cost is not just API tokens; data prep and ongoing maintenance dominate TCO.',
    classQuestionFa: 'هزینه اشتباه کردن مدل در تولید (False Positive/Negative) چقدر است؟',
    classQuestionEn: 'What is the real financial cost when the model makes a wrong call in production?',
    pitfallFa: 'دانشجوها هزینه نظارت انسانی (Human-in-the-loop) را از جدول بودجه جا می‌اندازند.',
    pitfallEn: 'Teams frequently omit ongoing human-in-the-loop review costs from their budget.',
  },
  '5': {
    sessionKey: '5',
    pacingFa: '۱۵ دقیقه محاسبه بازگشت سرمایه (ROI) و دوره بازپرداخت',
    pacingEn: '15m ROI & payback period calculation',
    focusFa: 'جمع‌بندی گروه ۱: آیا منافع کمی و کیفی پروژه ظرف ۶ تا ۱۸ ماه هزینه‌ها را پوشش می‌دهد؟',
    focusEn: 'Close Task Group 1: do quantified benefits outweigh TCO within a realistic payback window?',
    classQuestionFa: 'اگر پروژه فقط ۴۰٪ پیش‌بینی اولیه اثر بگذارد، هنوز توجیه اقتصادی دارد؟',
    classQuestionEn: 'If real impact is only 40% of the optimistic estimate, does the ROI still hold?',
    pitfallFa: 'خوش‌بینی بیش از حد در برآورد صرفه‌جویی نفر-ساعت بدون لحاظ زمان اصلاح خطاهای مدل.',
    pitfallEn: 'Over-optimistic labor savings without subtracting time spent reviewing model outputs.',
  },
  '6': {
    sessionKey: '6',
    pacingFa: '۱۵ دقیقه معرفی نیازهای شناختی (Cognitive Needs)',
    pacingEn: '15m framing Cognitive Requirements',
    focusFa: 'نشان دهید کدام بخش مسئله به درک الگو، استنتاج یا تصمیم‌گیری در عدم قطعیت نیاز دارد.',
    focusEn: 'Pinpoint where the workflow genuinely needs pattern recognition, reasoning, or uncertainty handling.',
    classQuestionFa: 'کجای این فرآیند قوانین ثابت If/Else دیگر جواب نمی‌دهد؟',
    classQuestionEn: 'Where do deterministic If/Else rules break down in this workflow?',
    pitfallFa: 'هر اتوماسیونی نیاز شناختی نیست؛ فرم‌های ساده را با ابزار شناختی اشتباه نگیرید.',
    pitfallEn: 'Not every automation is cognitive; distinguish basic workflow rules from AI.',
  },
  '7': {
    sessionKey: '7',
    pacingFa: '۱۵ دقیقه چالش «چرا AI؟» (دفاعیه مهندسی)',
    pacingEn: '15m "Why AI?" defense exercise',
    focusFa: 'تیم باید بتواند ثابت کند چرا روش‌های کلاسیک (جستجو، فیلتر، قوانین کسب‌وکار) کافی نیستند.',
    focusEn: 'Require teams to defend why SQL queries, regex, or heuristics cannot solve this alone.',
    classQuestionFa: 'اگر اجازه استفاده از AI نداشتید، این مسئله را چطور حل می‌کردید؟',
    classQuestionEn: 'If AI were banned from this project, how would you solve 80% of it tomorrow?',
    pitfallFa: 'توجیه «چون رقیب هم دارد» در متدولوژی CPMAI مردود است.',
    pitfallEn: '"Competitors are using it" is never a valid CPMAI engineering justification.',
  },
  '8': {
    sessionKey: '8',
    pacingFa: '۱۵ دقیقه تفکیک بخش‌های سنتی و غیرشناختی',
    pacingEn: '15m separating non-cognitive software components',
    focusFa: 'در یک سیستم واقعی AI، معمولاً ۷۰٪ کد نرم‌افزار کلاسیک (API، دیتابیس، مجوزها) و ۳۰٪ مدل هوشمند است.',
    focusEn: 'Remind students that production systems are ~70% classic software (DB, auth, UI) and ~30% AI.',
    classQuestionFa: 'کدام محاسبات مالی یا امنیتی باید ۱۰۰٪ قطعی و بیرون از LLM بماند؟',
    classQuestionEn: 'Which compliance or arithmetic checks must remain 100% deterministic outside the LLM?',
    pitfallFa: 'سپردن محاسبات ریاضی دقیق یا کنترل دسترسی به پرامپت به‌جای کد قطعی.',
    pitfallEn: 'Letting prompts perform exact billing math or authorization instead of deterministic code.',
  },
  '9': {
    sessionKey: '9',
    pacingFa: '۱۵ دقیقه نگاشت اهداف اختصاصی شناختی',
    pacingEn: '15m mapping specific cognitive objectives',
    focusFa: 'هر هدف شناختی باید به یک قابلیت مشخص (طبقه‌بندی، خلاصه‌سازی، استخراج موجودیت، پیش‌بینی) گره بخورد.',
    focusEn: 'Tie each cognitive goal to a concrete capability: classify, extract, forecast, or summarize.',
    classQuestionFa: 'دقیقاً چه قضاوت انسانی قرار است توسط سیستم تقویت یا تسریع شود؟',
    classQuestionEn: 'Which exact human judgment is this cognitive module augmenting?',
    pitfallFa: 'نوشتن اهداف بسیار کلی مثل «سیستم هوشمند تصمیم‌گیر» بدون مشخص کردن ورودی/خروجی.',
    pitfallEn: 'Vague goals like "smart decision engine" with no concrete input/output contract.',
  },
  '10': {
    sessionKey: '10',
    pacingFa: '۱۵ دقیقه مشخص‌کردن فرمت و خروجی شناختی',
    pacingEn: '15m defining cognitive output artifacts',
    focusFa: 'تعریف دقیق ساختار خروجی (JSON، برچسب، امتیاز اعتماد، ارجاع منبع) برای اتصال به سیستم‌های بعدی.',
    focusEn: 'Specify exact output contracts (schema, confidence score, citations) for downstream integration.',
    classQuestionFa: 'کاربر یا نرم‌افزار بعدی بعد از دریافت خروجی AI دقیقاً چه اقدامی انجام می‌دهد؟',
    pitfallEn: 'Assuming free-form chat text is sufficient when downstream systems expect structured data.',
    classQuestionEn: 'What exact action does the user or API take immediately after receiving the AI output?',
    pitfallFa: 'اکتفا به خروجی متن آزاد وقتی سیستم سازمانی به داده ساختاریافته نیاز دارد.',
  },
  '11': {
    sessionKey: '11',
    pacingFa: '۱۵ دقیقه معیارهای موفقیت پروژه AI در سطح سیستم',
    pacingEn: '15m system-level AI project success criteria',
    focusFa: 'پل بین اهداف جلسه ۳ (کسب‌وکار) و رفتار سیستم AI در دنیای واقعی با حضور کاربر.',
    focusEn: 'Bridge business KPIs (Session 3) with real-world user-facing AI system reliability.',
    classQuestionFa: 'چند درصد پذیرش توسط کارمندان (Adoption) موفقیت پروژه را تضمین می‌کند؟',
    classQuestionEn: 'What user adoption or override rate defines real success after rollout?',
    pitfallFa: 'مدل دقیق است اما کاربر به آن اعتماد نمی‌کند و دوباره دستی کار را انجام می‌دهد.',
    pitfallEn: 'High lab accuracy paired with zero user trust because explanations are missing.',
  },
  '12': {
    sessionKey: '12',
    pacingFa: '۲۵ دقیقه مرور الگوهای هفت‌گانه AI (نقطه عطف فاز ۱)',
    pacingEn: '25m walking through the 7 Patterns of AI (core milestone)',
    focusFa: 'تثبیت ۷ الگوی CPMAI: Hyperpersonalization، Autonomous Systems، Predictive Analytics، Conversational، Pattern Recognition، Goal-Driven، Recognition.',
    focusEn: 'Anchor all 7 CPMAI Patterns so teams classify problems by pattern before picking vendors/models.',
    classQuestionFa: 'سیستم دستیار مهندسی خودتان ترکیبی از کدام دو الگوی هفت‌گانه است؟',
    classQuestionEn: 'Which two of the 7 AI patterns best describe your own capstone project?',
    pitfallFa: 'دانشجوها همه چیز را در «Conversational (چت‌بات)» خلاصه می‌کنند؛ الگوهای دیگر را برجسته کنید.',
    pitfallEn: 'Teams default to Conversational/Chatbot for everything—challenge them with other patterns.',
  },
  '13': {
    sessionKey: '13',
    pacingFa: '۲۰ دقیقه انتخاب و توجیه الگوهای پروژه',
    pacingEn: '20m selecting and justifying chosen AI patterns',
    focusFa: 'هر انتخاب الگو باید مستقیماً به ورودی‌های شناختی جلسات ۶ تا ۱۰ متصل شود.',
    focusEn: 'Every pattern choice must trace directly back to cognitive objectives from Sessions 6–10.',
    classQuestionFa: 'چرا الگوی انتخابی شما از دو الگوی جایگزین دیگر مناسب‌تر است؟',
    classQuestionEn: 'Why does your chosen pattern beat the closest runner-up for this dataset?',
    pitfallFa: 'انتخاب بیش از ۳ الگو همزمان برای فاز اول، پروژه را از کنترل خارج می‌کند.',
    pitfallEn: 'Selecting 4+ patterns simultaneously in Iteration 1 guarantees scope creep.',
  },
  '14': {
    sessionKey: '14',
    pacingFa: '۱۵ دقیقه ارزیابی وضعیت فعلی، داده‌ها و ریسک‌ها',
    pacingEn: '15m assessing situation, data availability, and risks',
    focusFa: 'واقع‌سنجی دارایی‌های موجود: آیا داده پاک داریم، دسترسی حقوقی مجاز است و ریسک توقف چیست؟',
    focusEn: 'Reality check: do we actually have clean data, legal clearance, and stakeholder buy-in?',
    classQuestionFa: 'بزرگ‌ترین گلوگاه غیرفنی (قانونی، سازمانی یا دسترسی داده) در مسیر شما کدام است؟',
    classQuestionEn: 'What is your biggest non-technical blocker: legal, cultural, or data access?',
    pitfallFa: 'فرض اینکه «داده‌ها در اکسل شرکت حتماً تمیز و آماده است»!',
    pitfallEn: 'Assuming internal spreadsheets are clean, consistent, and ready to ingest.',
  },
  '15': {
    sessionKey: '15',
    pacingFa: '۱۵ دقیقه شکاف مهارت‌ها و فناوری‌های مورد نیاز',
    pacingEn: '15m auditing required technology and team skills',
    focusFa: 'تفکیک مهارت‌هایی که در تیم هست از نیازهای بیرونی (مهندس داده، متخصص دامنه، امنیت).',
    focusEn: 'Map existing team skills vs missing roles (domain SME, data engineer, security review).',
    classQuestionFa: 'اگر همین فردا کد را تحویل بگیرید، چه کسی مالک نگهداری هفتگی آن خواهد بود؟',
    classQuestionEn: 'If shipped tomorrow, who owns weekly monitoring and prompt/model updates?',
    pitfallFa: 'فراموش کردن نقش «خبره دامنه (Domain SME)» برای برچسب‌گذاری و ارزیابی کیفیت.',
    pitfallEn: 'Forgetting to budget time from Domain SMEs for evaluation and ground truth review.',
  },
  '16': {
    sessionKey: '16',
    pacingFa: '۱۵ دقیقه طراحی مایل‌استون‌ها و زمان‌بندی واقع‌بینانه',
    pacingEn: '15m realistic milestone & schedule planning',
    focusFa: 'تخصیص ۴۰ تا ۶۰ درصد زمان اسپرینت اول به آماده‌سازی و ارزیابی داده، نه فقط مدل‌سازی.',
    focusEn: 'Allocate 40–60% of initial project time to data readiness and evaluation harnesses.',
    classQuestionFa: 'کدام مایل‌استون اولین نقطه تصمیم Go/No-Go شماست؟',
    classQuestionEn: 'Which milestone serves as your earliest Go / No-Go gate?',
    pitfallFa: 'زمان‌بندی خطی نرم‌افزار سنتی بدون لحاظ چرخه‌های تکرار و تست دقت.',
    pitfallEn: 'Linear waterfall schedules with zero buffer for iterative model/prompt tuning.',
  },
  '17': {
    sessionKey: '17',
    pacingFa: '۱۵ دقیقه تعیین مرزهای عملکرد و محدودیت‌ها',
    pacingEn: '15m setting performance boundaries & guardrails',
    focusFa: 'مشخص کردن مواردی که سیستم نباید هرگز به‌تنهایی انجام دهد (Fallback & Guardrails).',
    focusEn: 'Define hard boundaries, latency ceilings, and when the AI must defer to a human.',
    classQuestionFa: 'اگر مدل اطمینان زیر ۷۰٪ داشت، سیستم دقیقاً چه واکنشی نشان دهد؟',
    classQuestionEn: 'When model confidence drops below threshold, what is the safe fallback UX?',
    pitfallFa: 'نداشتن مسیر خروج امن (Graceful Degradation) هنگام خطای API یا پاسخ مبهم.',
    pitfallEn: 'No graceful fallback path when external APIs fail or outputs are uncertain.',
  },
  '18': {
    sessionKey: '18',
    pacingFa: '۲۰ دقیقه سنجه‌ها و متریک‌های فنی ارزیابی مدل',
    pacingEn: '20m technical model evaluation metrics',
    focusFa: 'تفاوت Precision، Recall، F1، تأخیر (Latency) و معیارهای کیفی LLM (Groundedness / Hallucination Rate).',
    focusEn: 'Match the right metric to business risk: Precision vs Recall, latency, and hallucination rate.',
    classQuestionFa: 'در پروژه شما اشتباه مثبت کاذب خطرناک‌تر است یا منفی کاذب؟',
    classQuestionEn: 'In your domain, is a False Positive or a False Negative more expensive?',
    pitfallFa: 'تکیه بر Accuracy ساده در داده‌های نامتوازن (مثلاً خطای نادر ایمنی یا تقلب).',
    pitfallEn: 'Using plain Accuracy on imbalanced datasets (e.g., rare safety defects or fraud).',
  },
  '19': {
    sessionKey: '19',
    pacingFa: '۱۵ دقیقه مقایسه الزامات مدل با خط مبنا (Baseline)',
    pacingEn: '15m comparing requirements against current baseline',
    focusFa: 'مدل AI باید حداقل چقدر بهتر از روش فعلی (انسان یا سیستم ساده) باشد تا ارزش جایگزینی داشته باشد؟',
    focusEn: 'Establish the current human or heuristic baseline—how much better must AI be to justify switching?',
    classQuestionFa: 'دقت و سرعت فرآیند فعلی سازمان بدون هوش مصنوعی دقیقاً چقدر است؟',
    classQuestionEn: 'What is your organization’s exact speed and error rate right now without AI?',
    pitfallFa: 'انتظار دقت ۱۰۰٪ از هوش مصنوعی وقتی خط مبنای انسانی فعلی ۸۲٪ است.',
    pitfallEn: 'Demanding 100% AI perfection when the current human baseline sits around 82%.',
  },
  '20': {
    sessionKey: '20',
    pacingFa: '۱۵ دقیقه تعیین آستانه‌های قابل‌قبول KPI مدل',
    pacingEn: '15m locking acceptable KPI thresholds',
    focusFa: 'تعیین سه سطح حداقل قابل‌پذیرش، هدف مطلوب و آستانه هشدار برای پایش پس از استقرار.',
    focusEn: 'Set Minimum Acceptable, Target, and Alert thresholds for ongoing production monitoring.',
    classQuestionFa: 'اگر عملکرد مدل پس از ۳ ماه ۵٪ افت کرد، سیستم هشدار چطور فعال شود؟',
    classQuestionEn: 'If drift lowers performance by 5% three months post-launch, what triggers an alert?',
    pitfallFa: 'گذاشتن اعداد غیرواقعی و بدون توافق با ذی‌نفع کسب‌وکار.',
    pitfallEn: 'Picking arbitrary target numbers without sign-off from business stakeholders.',
  },
  '21': {
    sessionKey: '21',
    pacingFa: '۲۰ دقیقه جمع‌بندی فاز اول و شاخص‌های فناوری و زیرساخت',
    pacingEn: '20m Phase I wrap-up & infrastructure KPIs',
    focusFa: 'حفظ پایداری زیرساخت (Uptime، هزینه هر درخواست، امنیت داده و سقف مصرف توکن) و آماده شدن برای فاز ۲ (داده).',
    focusEn: 'Lock infra KPIs (uptime, cost per query, privacy compliance) and readiness for CPMAI Phase II.',
    classQuestionFa: 'اگر مصرف کاربران فردا ۱۰ برابر شود، زیرساخت و هزینه API شما دوام می‌آورد؟',
    classQuestionEn: 'If usage spikes 10x tomorrow, will your latency and token budget hold up?',
    pitfallFa: 'نادیده گرفتن محدودیت محرمانگی داده سازمانی هنگام انتخاب مدل ابری در برابر مدل محلی.',
    pitfallEn: 'Overlooking enterprise data-residency rules between cloud APIs and on-prem models.',
  },
  quiz: {
    sessionKey: 'quiz',
    pacingFa: '۱۰ دقیقه راهنمایی و جمع‌بندی نتایج آزمون سطح‌سنجی',
    pacingEn: '10m briefing & debriefing Placement Quiz outcomes',
    focusFa: 'آزمون برای شناسایی شکاف‌های ذهنی شرکت‌کنندگان است، نه نمره‌دهی تنبیهی.',
    focusEn: 'Frame the quiz as a diagnostic calibration tool rather than a graded exam.',
    classQuestionFa: 'کدام سؤال آزمون برایتان غیرمنتظره‌ترین زاویه دید را داشت؟',
    classQuestionEn: 'Which quiz question challenged your initial assumption about AI projects?',
    pitfallFa: 'اطمینان حاصل کنید همه دانشجوها پس از مشاهده نتیجه به ماژول پیشنهادی برگردند.',
    pitfallEn: 'Guide students back to their recommended module immediately after reviewing results.',
  },
};

export function getPresenterPageKey(page: PresenterPageKey): string {
  if (typeof page === 'number') return String(page);
  if (page === 'quiz') return 'quiz';
  return '0';
}

export function getPresenterNoteForPage(page: PresenterPageKey): PresenterSessionNote {
  const key = getPresenterPageKey(page);
  return PRESENTER_SESSION_NOTES[key] || PRESENTER_SESSION_NOTES['0'];
}

export function loadCustomPresenterNotes(): Record<string, string> {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(CUSTOM_NOTES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCustomPresenterNote(
  pageKey: string,
  text: string,
  currentNotes: Record<string, string>
): Record<string, string> {
  const next = { ...currentNotes };
  if (text.trim() === '') {
    delete next[pageKey];
  } else {
    next[pageKey] = text;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CUSTOM_NOTES_STORAGE_KEY, JSON.stringify(next));
    }
  } catch {}
  return next;
}

export function loadPrivacyMaskPref(): boolean {
  try {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(PRESENTER_MASK_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function savePrivacyMaskPref(masked: boolean): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PRESENTER_MASK_STORAGE_KEY, masked ? 'true' : 'false');
    }
  } catch {}
}
