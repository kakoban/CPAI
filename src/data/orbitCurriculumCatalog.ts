export type OrbitSessionId = 's1' | 's2' | 's_nlm' | 's3' | 's4' | 's5';

export interface OrbitModuleCatalogItem {
  id: string;
  sessionId: OrbitSessionId;
  sessionNumFa: string;
  sessionTitleFa: string;
  num: string;
  titleFa: string;
  titleEn: string;
  subFa: string;
  deliverableFa: string;
  expectedOutcomesFa: string[];
}

export interface OrbitSessionCatalogGroup {
  id: OrbitSessionId;
  numFa: string;
  titleFa: string;
  modules: OrbitModuleCatalogItem[];
}

export const ORBIT_MODULES_CATALOG: OrbitModuleCatalogItem[] = [
  // Session 1
  {
    id: 's1_demo',
    sessionId: 's1',
    sessionNumFa: 'جلسه ۱',
    sessionTitleFa: 'زیرساخت داده: Drive، Markdown و GitHub',
    num: '۱-۱',
    titleFa: 'دموی ۱۵ دقیقه‌ای خروجی نهایی دوره',
    titleEn: '15-Min End-to-End Demo',
    subFa: 'چشم‌انداز خط تولید اتوماتیک جلسه ۵',
    deliverableFa: 'ترسیم نقشه ذهنی خط تولید از فایل خام تا داشبورد و ریپازیتوری پروژه',
    expectedOutcomesFa: [
      'درک تفاوت کار دستی با چت‌بات در برابر معماری خط تولید خودکار داده و AI',
      'شناخت نقش پنج لایه کلیدی دوره (Drive، Markdown، Skill، MCP و GitHub)'
    ]
  },
  {
    id: 's1_drive',
    sessionId: 's1',
    sessionNumFa: 'جلسه ۱',
    sessionTitleFa: 'زیرساخت داده: Drive، Markdown و GitHub',
    num: '۱-۲',
    titleFa: 'گوگل درایو و استانداردسازی جداول',
    titleEn: 'Google Drive & Clean Tables',
    subFa: 'حذف سلول‌های Merge و ساختار ماشین‌خوان',
    deliverableFa: 'ساخت یک فایل اکسل/شیت استاندارد بدون سلول ادغام‌شده و با پوشه‌بندی تمیز در Drive',
    expectedOutcomesFa: [
      'اصلاح جداول اداری و فنی با حذف سلول‌های Merge و هدرهای چندردیفه',
      'استانداردسازی نام‌گذاری فایل‌ها و پوشه‌ها برای خوانش دقیق توسط هوش مصنوعی'
    ]
  },
  {
    id: 's1_markdown',
    sessionId: 's1',
    sessionNumFa: 'جلسه ۱',
    sessionTitleFa: 'زیرساخت داده: Drive، Markdown و GitHub',
    num: '۱-۳',
    titleFa: 'زبان Markdown؛ زبان مشترک مهندس و AI',
    titleEn: 'Markdown (.md) Standard',
    subFa: 'چرا فایل Word پر از نویز است؟ (.md)',
    deliverableFa: 'تبدیل یک گزارش یا صورتجلسه اداری/فنی به فایل ساختاری .md تمیز',
    expectedOutcomesFa: [
      'تسلط بر ساختار تیترها، لیست‌ها، جداول و بلوک کد در فایل‌های Markdown',
      'درک چرایی برتری فرمت .md بر Word و PDF در مصرف توکن و دقت مدل‌های زبانی'
    ]
  },
  {
    id: 's1_github',
    sessionId: 's1',
    sessionNumFa: 'جلسه ۱',
    sessionTitleFa: 'زیرساخت داده: Drive، Markdown و GitHub',
    num: '۱-۴',
    titleFa: 'گیت‌هاب به زبان دفتر فنی و DCC',
    titleEn: 'GitHub as Engineering DCC',
    subFa: 'Repo · Commit (Rev) · Branch & PR',
    deliverableFa: 'ساخت یک مخزن (Repository) شخصی و ثبت حداقل یک نسخه (Commit) مستند',
    expectedOutcomesFa: [
      'درک مفاهیم Repository، Commit، Branch و Pull Request معادل نظام کنترل مدارک (DCC)',
      'توانایی ثبت، تاریخچه‌گیری و بازیابی نسخه‌های اسناد پروژه روی GitHub'
    ]
  },

  // Session 2
  {
    id: 'prompt_definition',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۱',
    titleFa: 'پرامپت چیست؟ (تعریف و آناتومی)',
    titleEn: 'What is a Prompt? (Anatomy)',
    subFa: 'ورودی دقیق ← خروجی دقیق · Zero-Shot تا مهندسی پرامپت',
    deliverableFa: 'تبدیل یک درخواست مبهم روزمره به پرامپت دقیق با دستور، زمینه و قیود مشخص',
    expectedOutcomesFa: [
      'شناخت اجزای اصلی پرامپت شامل دستورالعمل، زمینه (Context) و محدودیت‌ها',
      'تشخیص تفاوت Zero-Shot و Few-Shot و زمان استفاده از هر کدام'
    ]
  },
  {
    id: 'prompting',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۲',
    titleFa: 'فرمول طلایی مهندسی پرامپت (RCTO)',
    titleEn: 'RCTO Prompt Framework',
    subFa: 'چارچوب ۴ مرحله‌ای Role, Context, Task, Output',
    deliverableFa: 'نگارش حداقل یک پرامپت کامل ۴بخشی RCTO برای وظیفه شغلی خود',
    expectedOutcomesFa: [
      'طراحی پرامپت‌های تکرارپذیر و دقیق با ساختار Role، Context، Task و Output',
      'کنترل قالب خروجی مدل (جدول، نامه رسمی، JSON یا چک‌لیست اجرایی)'
    ]
  },
  {
    id: 'tools',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۳',
    titleFa: 'غول‌های هوش مصنوعی و LLMهای مطرح',
    titleEn: 'AI Giants & Leading LLMs',
    subFa: 'ChatGPT · Claude · Gemini · DeepSeek · Qwen و ...',
    deliverableFa: 'انتخاب مدل مناسب برای سه سناریوی کاری (تحلیل سند، کدنویسی و پژوهش)',
    expectedOutcomesFa: [
      'شناخت نقاط قوت و محدودیت‌های مدل‌های اصلی (ChatGPT، Claude، Gemini و مدل‌های باز)',
      'انتخاب هوشمندانه‌ی ابزار متناسب با پنجره متن (Context Window)، زبان فارسی و استدلال'
    ]
  },
  {
    id: 'prompts_library',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۴',
    titleFa: 'کتابخانه پرامپت‌های آماده دیسیپلین‌ها',
    titleEn: 'Ready Prompt Library',
    subFa: 'پرامپت‌های تخصصی و روزمره قابل کپی',
    deliverableFa: 'بومی‌سازی ۲ پرامپت آماده متناسب با واحد سازمانی یا پروژه شخصی',
    expectedOutcomesFa: [
      'استفاده و سفارشی‌سازی الگوهای آماده پرامپت بدون شروع از صفر',
      'تطبیق واژگان و استانداردهای تخصصی واحد کاری با ساختار پرامپت'
    ]
  },
  {
    id: 'advanced_features',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۵',
    titleFa: 'میز کار هوشمند: Gems و Projects',
    titleEn: 'Gems & Claude Projects',
    subFa: 'ساخت مشاور مقیم با دانش پایه اختصاصی',
    deliverableFa: 'راه‌اندازی یک Gem در Gemini یا Project در Claude با دستورالعمل ثابت و فایل مرجع',
    expectedOutcomesFa: [
      'تبدیل پرامپت‌های تکراری به مشاور مقیم (Custom Gem / Claude Project)',
      'بارگذاری اسناد مرجع سازمانی به عنوان دانش پایه اختصاصی برای پاسخ‌های منسجم'
    ]
  },
  {
    id: 'engineering_dashboards',
    sessionId: 's2',
    sessionNumFa: 'جلسه ۲',
    sessionTitleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
    num: '۲-۶',
    titleFa: 'ساخت داشبورد و ابزار در Artifacts و Canvas',
    titleEn: 'Artifacts & Canvas Lab',
    subFa: 'تولید نرم‌افزار و نمودار بدون کدنویسی',
    deliverableFa: 'ساخت یک داشبورد یا ماشین‌حساب تعاملی مهندسی در Claude Artifacts یا Gemini Canvas',
    expectedOutcomesFa: [
      'تبدیل داده‌های جدولی به داشبورد تعاملی و نمودار مدیریتی بدون دانش برنامه‌نویسی',
      'اصلاح مرحله‌ای ظاهر و منطق ابزار تولیدشده از طریق گفت‌وگوی دقیق با مدل'
    ]
  },

  // Dedicated NotebookLM Workshop
  {
    id: 'notebooklm',
    sessionId: 's_nlm',
    sessionNumFa: 'بخش NotebookLM',
    sessionTitleFa: 'کارگاه تخصصی و مجزای Google NotebookLM',
    num: 'NLM',
    titleFa: 'کارگاه جامع Google NotebookLM',
    titleEn: 'Google NotebookLM Complete Lab',
    subFa: 'قابلیت‌های Studio، ماتریس ۷ دپارتمان، پادکست و تمرینات عملی',
    deliverableFa: 'ساخت یک نوت‌بوک مستندمحور با ارجاع دقیق، خلاصه اجرایی و خروجی صوتی/تصویری',
    expectedOutcomesFa: [
      'تحلیل هم‌زمان ده‌ها سند پروژه با صفر توهم (Source-Grounded) و ارجاع شماره‌دار',
      'تولید پادکست آموزشی، نقشه ذهنی و گزارش‌های دپارتمانی در بخش Studio'
    ]
  },
  {
    id: 'hr_interactive_tools',
    sessionId: 's_nlm',
    sessionNumFa: 'بخش NotebookLM',
    sessionTitleFa: 'کارگاه تخصصی و مجزای Google NotebookLM',
    num: 'HR',
    titleFa: 'ابزار تعاملی منابع انسانی و اداری (NotebookLM + Gemini + Claude)',
    titleEn: 'Interactive HR & Admin Tools',
    subFa: 'ورک‌فلو ۳ مرحله‌ای از تحلیل مستندات تا ساخت ۵ اپلیکیشن تعاملی HR',
    deliverableFa: 'اجرای زنجیره سه‌ابزاری استخراج قوانین از NotebookLM تا ساخت مینی‌اپ اداری/HR',
    expectedOutcomesFa: [
      'استخراج دقیق ضوابط قراردادی و آیین‌نامه‌های اداری/رفاهی بدون خطای خوانش',
      'اتصال خروجی مستند NotebookLM به Canvas و Artifacts برای تولید اپلیکیشن کاربردی'
    ]
  },

  // Session 3
  {
    id: 'contracts_and_gems',
    sessionId: 's3',
    sessionNumFa: 'جلسه ۳',
    sessionTitleFa: 'ممیزی قراردادها و معماری مهارت‌ها (AI Skills)',
    num: '۳-۱',
    titleFa: 'کارگاه ممیزی قراردادها و ادعاها',
    titleEn: 'Contracts & Claims Lab',
    subFa: 'نشریه ۴۳۱۱، فیدیک و سیستم‌های خبره',
    deliverableFa: 'تهیه ماتریس ریسک و چک‌لیست ممیزی یک بند قراردادی یا ادعای پیمانکاری',
    expectedOutcomesFa: [
      'استخراج تعهدات، ریسک‌ها و تعارض‌های متنی در اسناد قراردادی (نشریه ۴۳۱۱ و FIDIC)',
      'ساخت دستیار خبره ممیزی اسناد با قواعد شفاف و قابل راستی‌آزمایی'
    ]
  },
  {
    id: 'skills_lab',
    sessionId: 's3',
    sessionNumFa: 'جلسه ۳',
    sessionTitleFa: 'ممیزی قراردادها و معماری مهارت‌ها (AI Skills)',
    num: '۳-۲',
    titleFa: 'معماری AI Skills (استاندارد SKILL.md)',
    titleEn: 'AI Skills (SKILL.md) Lab',
    subFa: 'ساخت مهارت دائمی در Claude و اتصال در Gemini',
    deliverableFa: 'تدوین یک فایل SKILL.md استاندارد شامل رویه کاری (SOP) و آزمون تله (Trap Test)',
    expectedOutcomesFa: [
      'طراحی مهارت استاندارد و قابل حمل در قالب SKILL.md با قوانین، مراحل و موارد منع',
      'آزمون مقاومت مهارت با سناریوهای تله و جلوگیری از خطاهای رایج مدل'
    ]
  },

  // Session 4
  {
    id: 'mcp_lab',
    sessionId: 's4',
    sessionNumFa: 'جلسه ۴',
    sessionTitleFa: 'انقلاب MCP، امنیت و مغز دوم Obsidian',
    num: '۴-۱',
    titleFa: 'پروتکل MCP؛ پایپ‌لاین اتصال داده به هارد و گیت‌هاب',
    titleEn: 'MCP Protocol & Servers',
    subFa: 'Filesystem · GitHub MCP · پیش‌نیازهای نصب',
    deliverableFa: 'پیکربندی مفهومی و عملی اتصال دستیار AI به پوشه محلی یا مخزن GitHub از طریق MCP',
    expectedOutcomesFa: [
      'درک معماری استاندارد MCP و پایان نیاز به کپی-پیست دستی فایل‌ها در پنجره چت',
      'شناخت سرورهای کلیدی MCP مانند Filesystem، GitHub و پایگاه داده'
    ]
  },
  {
    id: 'connectors',
    sessionId: 's4',
    sessionNumFa: 'جلسه ۴',
    sessionTitleFa: 'انقلاب MCP، امنیت و مغز دوم Obsidian',
    num: '۴-۲',
    titleFa: 'کانکتورهای گوگل، Slack و Workspace',
    titleEn: 'Workspace & Tool Connectors',
    subFa: 'اتصال زنده به ایمیل، درایو و تقویم',
    deliverableFa: 'طراحی سناریوی جستجو و خلاصه‌سازی خودکار ایمیل‌ها، تقویم و اسناد Drive',
    expectedOutcomesFa: [
      'اتصال ایمن مدل به ابزارهای روزمره سازمانی (Gmail، Drive، Calendar و Slack)',
      'تشخیص مرز دسترسی خواندنی در برابر دسترسی تغییردهنده در کانکتورها'
    ]
  },
  {
    id: 'safety',
    sessionId: 's4',
    sessionNumFa: 'جلسه ۴',
    sessionTitleFa: 'انقلاب MCP، امنیت و مغز دوم Obsidian',
    num: '۴-۳',
    titleFa: 'خطوط قرمز امنیتی، حفاظت از توکن و توهم',
    titleEn: 'Security & Token Guardrails',
    subFa: 'امنیت PAT گیت‌هاب، دسترسی پوشه و Human-in-the-Loop',
    deliverableFa: 'ممیزی امنیتی یک پرامپت و پاک‌سازی اطلاعات حساس (توکن، رمز و داده شخصی)',
    expectedOutcomesFa: [
      'رعایت اصل کمترین دسترسی (Least Privilege) و حفاظت مطلق از توکن‌ها و کلیدهای API',
      'اعمال کنترل انسانی در حلقه (Human-in-the-Loop) پیش از هر عملیات حساس یا انتشار'
    ]
  },
  {
    id: 'obsidian_brain',
    sessionId: 's4',
    sessionNumFa: 'جلسه ۴',
    sessionTitleFa: 'انقلاب MCP، امنیت و مغز دوم Obsidian',
    num: '۴-۴',
    titleFa: 'مغز دوم Obsidian + اتصال Claude و Hermes',
    titleEn: 'Obsidian Second Brain',
    subFa: 'حافظه دائمی رایگان روی هارد شخصی',
    deliverableFa: 'ساخت یک Vault ساختاریافته در Obsidian با یادداشت‌های لینک‌شده و قابل جستجو توسط AI',
    expectedOutcomesFa: [
      'ایجاد پایگاه دانش شخصی دائمی و آفلاین بر پایه فایل‌های Markdown در Obsidian',
      'اتصال حافظه بلندمدت Vault به دستیار هوش مصنوعی برای پاسخ‌گویی متنی دقیق'
    ]
  },

  // Session 5
  {
    id: 's5_orchestration',
    sessionId: 's5',
    sessionNumFa: 'جلسه ۵',
    sessionTitleFa: 'ارکستراسیون کامل و پل ورود به Vibe Coding',
    num: '۵-۱',
    titleFa: 'پروژه جامع End-to-End (ترکیب تمام ابزارها)',
    titleEn: 'End-to-End Capstone Project',
    subFa: 'Drive + MCP + Skill + Artifact + GitHub Pages',
    deliverableFa: 'طراحی و اجرای یک چرخه کامل از خوانش داده خام تا انتشار داشبورد روی GitHub',
    expectedOutcomesFa: [
      'ترکیب یکپارچه پنج گام ارکستراسیون (ورودی خام، اتصال، مغز پردازش، مصورسازی و انتشار)',
      'عیب‌یابی گلوگاه‌های انتقال داده میان ابزارهای مختلف در یک پروژه واقعی'
    ]
  },
  {
    id: 'masterclass',
    sessionId: 's5',
    sessionNumFa: 'جلسه ۵',
    sessionTitleFa: 'ارکستراسیون کامل و پل ورود به Vibe Coding',
    num: '۵-۲',
    titleFa: 'مسترکلاس مهندسی پیشرفته با LLM',
    titleEn: 'Advanced Engineering Masterclass',
    subFa: 'تکنیک‌های پیشرفته استدلال و تحلیل فنی',
    deliverableFa: 'حل یک مسئله چندمرحله‌ای مهندسی با استدلال زنجیره‌ای و بازبینی نقادانه',
    expectedOutcomesFa: [
      'به‌کارگیری تکنیک‌های پیشرفته استدلال، تجزیه مسئله و نقد خروجی مدل',
      'کاهش خطاهای محاسباتی و منطقی در تحلیل گزارش‌های فنی پیچیده'
    ]
  },
  {
    id: 's5_database_crud',
    sessionId: 's5',
    sessionNumFa: 'جلسه ۵',
    sessionTitleFa: 'ارکستراسیون کامل و پل ورود به Vibe Coding',
    num: '۵-۳',
    titleFa: 'ساختارسازی داده، انتخاب پایگاه داده و عملیات دائمی (CRUD)',
    titleEn: 'Data Structuring, Database Selection & Persistent CRUD',
    subFa: '۸ خانواده دیتابیس، قوانین CPMAI، حذف نرم و مینی‌اپ زنده CRUD',
    deliverableFa: 'تولید سند گزینش داده CPMAI و اسکیمای جدول استاندارد (SQLite/PostgreSQL) با حذف نرم',
    expectedOutcomesFa: [
      'شناخت ۸ خانواده پایگاه داده و انتخاب درست SQLite یا PostgreSQL برای شروع پروژه',
      'اجرای قوانین فاز ۳ استاندارد CPMAI (حذف PII، تفکیک داده مفید و مزاحم، حذف نرم)',
      'ساخت و آزمون سیستم ثبت دائمی CRUD و درک ارتباط فرم کاربری با جدول دیتابیس'
    ]
  },
  {
    id: 's5_vibecoding',
    sessionId: 's5',
    sessionNumFa: 'جلسه ۵',
    sessionTitleFa: 'ارکستراسیون کامل و پل ورود به Vibe Coding',
    num: '۵-۴',
    titleFa: 'پل ورود به Vibe Coding؛ فردا چه می‌کنیم؟',
    titleEn: 'Bridge to Vibe Coding',
    subFa: 'انتقال مغز AI، اسکیل‌ها و MCP به محیط IDE حرفه‌ای',
    deliverableFa: 'آماده‌سازی بسته انتقال پروژه (اسکیما، SKILL.md و نقشه راه) برای ساخت نرم‌افزار کامل در IDE',
    expectedOutcomesFa: [
      'درک تفاوت ساخت نمونه اولیه در چت با توسعه محصول پایدار در محیط Vibe Coding',
      'آمادگی برای هدایت هوش مصنوعی در نقش طراح و معمار سیستم بدون نیاز به حفظ سینتکس'
    ]
  }
];

export const ORBIT_MODULE_BY_ID: Record<string, OrbitModuleCatalogItem> = Object.fromEntries(
  ORBIT_MODULES_CATALOG.map((item) => [item.id, item])
);

export const VALID_ORBIT_MODULE_IDS = new Set<string>(
  ORBIT_MODULES_CATALOG.map((item) => item.id)
);

export const ORBIT_SESSIONS_CATALOG: OrbitSessionCatalogGroup[] = (
  ['s1', 's2', 's_nlm', 's3', 's4', 's5'] as OrbitSessionId[]
).map((sessionId) => {
  const modules = ORBIT_MODULES_CATALOG.filter((m) => m.sessionId === sessionId);
  return {
    id: sessionId,
    numFa: modules[0]?.sessionNumFa || sessionId,
    titleFa: modules[0]?.sessionTitleFa || sessionId,
    modules
  };
});
