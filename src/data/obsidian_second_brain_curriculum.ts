export interface ObsidianLessonStep {
  stepNumber: string;
  keyHint: string;
  badgeFa: string;
  titleFa: string;
  titleEn: string;
  deepDiveFa: string[];
  proTipFa: string;
  codeOrConfigSnippet?: {
    titleFa: string;
    code: string;
    language: 'markdown' | 'bash' | 'json' | 'env';
  };
}

export interface ObsidianDailyWorkflow {
  id: string;
  badgeFa: string;
  titleFa: string;
  descriptionFa: string;
  promptFa: string;
}

/**
 * 13-Step Complete Obsidian + Claude + Hermes Second Brain Curriculum
 * Extracted from the comprehensive Obsidian + Claude + Hermes Second Brain course:
 * - Problem of AI Amnesia
 * - Why Obsidian beats Notion (Local plain-text .md files vs locked cloud DBs)
 * - Exact difference between Obsidian (Read/Write Living Memory) and NotebookLM (Read-Only Research Library)
 * - Installing Obsidian & Creating Your First Vault from Scratch
 * - Ideal Folder & Note Architecture for AI Comprehension (00_Inbox to 04_Archive + CLAUDE.md)
 * - Golden Rules of Note-Taking (YAML Properties/Frontmatter, [[Wikilinks]], Headings, Graph View)
 * - How Any AI Model Connects to Obsidian
 * - Connecting Claude Desktop directly to the Vault
 * - Introducing Hermes Agent (Nous Research Free Open-Source Agent with Built-in Obsidian Skill)
 * - Method 1 of Connecting Hermes to Obsidian (Enabling the built-in Obsidian skill)
 * - Method 2 of Connecting Hermes to Obsidian + Fixing the Common Windows Vault Path Issue
 * - Real Everyday Workflows (Automating note sorting with Hermes & Claude)
 * - Hands-On Final Exercise
 */
export const OBSIDIAN_SECOND_BRAIN_STEPS: ObsidianLessonStep[] = [
  {
    stepNumber: 'فصل ۰۱',
    keyHint: 'B1',
    badgeFa: 'مسئله فراموشی هوش مصنوعی',
    titleFa: 'مشکلی که همه داریم: فراموشی هوش مصنوعی در هر چت جدید!',
    titleEn: 'The Problem We All Share: AI Amnesia Across Chats',
    deepDiveFa: [
      'بزرگ‌ترین مشکل کار روزمره با ChatGPT، Claude یا Gemini این است که هر بار چت جدیدی باز می‌کنید، هوش مصنوعی دچار «فراموشی کامل» می‌شود و دوباره باید از اول توضیح دهید چه کسی هستید، شغل شما چیست، روی چه پروژه‌هایی کار می‌کنید و چه سبکی را دوست دارید.',
      'حتی قابلیت Memory داخلی چت‌بات‌ها بسیار محدود و سطحی است و نمی‌تواند صدها یادداشت، صورت‌جلسه، ایده‌ها و مستندات پروژه‌های شما را به صورت ساختاریافته نگه دارد.',
      'راه‌حل قطعی و رایگان این مشکل، ساخت یک «مغز دوم (Second Brain)» روی کامپیوتر خودتان با نرم‌افزار Obsidian و وصل کردن مستقیم هوش مصنوعی (Claude و Hermes) به آن است تا هوش مصنوعی به یک حافظه دائمی و زنده دسترسی داشته باشد.'
    ],
    proTipFa:
      'وقتی هوش مصنوعی به والت Obsidian شما وصل باشد، دیگر به جای کپی-پیست کردن متون طولانی در چت، فقط می‌گویید: «پوشه پروژه‌های من را بخوان و بگو امروز روی چه کاری تمرکز کنم!»'
  },
  {
    stepNumber: 'فصل ۰۲',
    keyHint: 'B2',
    badgeFa: 'ماهیت Obsidian',
    titleFa: 'Obsidian چیست و چرا با بقیه برنامه‌ها (مثل Notion) فرق دارد؟',
    titleEn: 'What Is Obsidian and Why It Beats Cloud Apps Like Notion',
    deepDiveFa: [
      'Obsidian یک برنامه یادداشت‌برداری ۱۰۰٪ رایگان است که یک تفاوت بنیادین با Notion، Google Docs یا اپلیکیشن‌های ابری دارد: همه‌چیز را به صورت «فایل متنی ساده (Markdown / .md)» مستقیماً روی هارد کامپیوتر خودتان ذخیره می‌کند.',
      'در Notion، یادداشت‌های شما داخل دیتابیس‌های ابری و اختصاصی شرکت Notion قفل شده‌اند؛ به همین دلیل هوش مصنوعی نمی‌تواند مستقیماً وارد پوشه‌های کامپیوتر شما شود و در کسری از ثانیه یادداشت‌ها را بخواند، ویرایش کند یا دسته‌بندی نماید.',
      'اما چون هر یادداشت در Obsidian فقط یک فایل متنی `.md` ساده روی هارد شماست، هر مدل هوش مصنوعی (Claude، Hermes، Cursor، Codex) می‌تواند بدون هیچ محدودیت ابری یا تحریمی، صدها یادداشت شما را بخواند و مستقیماً داخل آن‌ها بنویسد.'
    ],
    proTipFa:
      'حتی اگر ۱۰۰ سال دیگر برنامه Obsidian وجود نداشته باشد، تمام یادداشت‌های شما فایل‌های متنی استاندارد هستند که با هر ویرایشگر متنی در دنیا باز می‌شوند (مالکیت ۱۰۰٪ داده‌ها).'
  },
  {
    stepNumber: 'فصل ۰۳',
    keyHint: 'B3',
    badgeFa: 'مقایسه کلیدی',
    titleFa: 'تفاوت دقیق Obsidian با Google NotebookLM چیست؟',
    titleEn: 'Exact Difference Between Obsidian and Google NotebookLM',
    deepDiveFa: [
      'بسیاری می‌پرسند: «وقتی NotebookLM داریم، چرا باید از Obsidian استفاده کنیم؟» پاسخ در تفاوت «کتابخانه مرجع» با «دفترچه کار زنده» است:',
      '۱) Google NotebookLM یک «کتابخانه پژوهشی یک‌طرفه (Read-Only)» است؛ شما فایل‌های PDF سنگین (مثل قرارداد ۵۰۰ صفحه‌ای یا کتاب) را آپلود می‌کنید تا بدون توهم از آن‌ها سوال بپرسید یا پادکست و اسلاید بسازید. اما NotebookLM نمی‌تواند فایل‌های روی هارد شما را ویرایش کند یا یادداشت‌های روزمره شما را مرتب نماید.',
      '۲) Obsidian یک «حافظه زنده و دوطرفه (Read & Write Second Brain)» است؛ هوش مصنوعی (Claude یا Hermes) هم یادداشت‌های شما را می‌خواند، هم یادداشت جدید داخل پوشه‌ها می‌سازد، هم غلط‌های املایی را اصلاح می‌کند و هم فایل‌های به‌هم‌ریخته را در پوشه‌های درست دسته‌بندی می‌کند.'
    ],
    proTipFa:
      'بهترین ترکیب حرفه‌ای: از NotebookLM برای تحلیل اسناد سنگین و PDFهای مرجع استفاده کنید، و خلاصه خروجی‌ها و کارهای روزمره خود را در مغز دوم Obsidian ذخیره کنید تا Claude و Hermes همیشه به آن‌ها دسترسی داشته باشند.'
  },
  {
    stepNumber: 'فصل ۰۴',
    keyHint: 'B4',
    badgeFa: 'نصب و راه‌اندازی',
    titleFa: 'نصب رایگان از صفر و ساخت اولین Vault در Obsidian',
    titleEn: 'Installing Obsidian from Scratch & Creating Your First Vault',
    deepDiveFa: [
      '۱. وارد سایت رسمی obsidian.md شوید و نسخه متناسب با سیستم‌عامل خود (ویندوز، مک یا لینوکس) را به صورت کاملاً رایگان دانلود و نصب کنید.',
      '۲. پس از باز کردن برنامه، روی گزینه Create new vault کلیک کنید. در ادبیات آبسیدین، به پوشه اصلی یادداشت‌های شما یک «Vault (گاوصندوق/مخزن دانش)» گفته می‌شود.',
      '۳. یک نام انگلیسی ساده و بدون فاصله برای Vault انتخاب کنید (مثلاً `MIND` یا `SecondBrain`) و محل ذخیره آن را در یکی از درایوهای کامپیوتر (مثلاً `D:/MIND`) قرار دهید.',
      '۴. برای نوشتن راحت به زبان فارسی، از بخش Settings > Editor گزینه Right-to-left (RTL) یا پلاگین RTL Support را فعال کنید تا متون فارسی و انگلیسی به زیبایی در کنار هم نمایش داده شوند.'
    ],
    proTipFa:
      'نکته بسیار مهم برای اتصال بعدی به هوش مصنوعی: نام پوشه اصلی Vault و مسیر آن را حتماً انگلیسی و بدون فاصله (Space) بگذارید (مثلاً `D:/MIND` به جای `D:/My Persian Vault`).'
  },
  {
    stepNumber: 'فصل ۰۵',
    keyHint: 'B5',
    badgeFa: 'معماری پوشه‌ها',
    titleFa: 'ساختار درست پوشه‌ها و یادداشت‌ها برای اینکه هوش مصنوعی از آن سر دربیابد',
    titleEn: 'Structuring Folders & Notes So AI Understands Your Vault',
    deepDiveFa: [
      'اگر یادداشت‌ها را بدون ساختار در ده‌ها پوشه تودرتو بریزید، هم خودتان گیج می‌شوید و هم هوش مصنوعی هنگام جستجو توکن زیادی مصرف می‌کند. بهترین ساختار استاندارد جهانی (الهام‌گرفته از روش PARA)، ایجاد ۵ پوشه شماره‌گذاری‌شده در ریشه Vault است:',
      '• پوشه `00_Inbox`: محل ریختن سریع تمام ایده‌های خام، یادداشت‌های عجله‌ای و متون مرتب‌نشده روزانه.',
      '• پوشه `01_Projects`: پروژه‌های فعلی و در حال اجرای شما که ددلاین و هدف مشخص دارند.',
      '• پوشه `02_Areas`: حوزه‌های دائمی کار و زندگی (مثل امور مالی، سلامت، مدیریت تیم، یادگیری).',
      '• پوشه `03_Resources`: بانک اطلاعات، پرامپت‌های کاربردی، خلاصه کتاب‌ها و مقالات مرجع.',
      '• پوشه `04_Archive`: پروژه‌ها و یادداشت‌های قدیمی که تمام شده‌اند اما نمی‌خواهید پاک شوند.',
      '• فایل کلیدی `CLAUDE.md` در ریشه والت: یک فایل متنی در پوشه اصلی که به هوش مصنوعی می‌گوید شما که هستید، ساختار پوشه‌هایتان چیست و چه قوانینی را باید هنگام ویرایش رعایت کند.'
    ],
    proTipFa:
      'شماره‌گذاری ابتدای پوشه‌ها (`00` تا `04`) باعث می‌شود پوشه‌ها همیشه به ترتیب منطقی جریان کار (از ورودی خام تا آرشیو) مرتب بمانند.',
    codeOrConfigSnippet: {
      titleFa: 'ساختار استاندارد پوشه‌های Vault + فایل راهنمای CLAUDE.md:',
      language: 'markdown',
      code: `D:/MIND/
├── 00_Inbox/        # یادداشت‌های خام و سریع روزانه (مرتب‌نشده)
├── 01_Projects/     # پروژه‌های فعال در حال اجرا
├── 02_Areas/        # مسئولیت‌ها و حوزه‌های دائمی کار و زندگی
├── 03_Resources/    # بانک دانش، پرامپت‌ها، مقالات و آموزش‌ها
├── 04_Archive/      # پروژه‌های به‌پایان‌رسیده
└── CLAUDE.md        # دفترچه راهنمای هوش مصنوعی برای شناخت والت شما`
    }
  },
  {
    stepNumber: 'فصل ۰۶',
    keyHint: 'B6',
    badgeFa: 'اصول یادداشت‌نویسی',
    titleFa: 'نکات طلایی ساخت یادداشت: Properties، لینک‌های [[ ]] و Graph View',
    titleEn: 'Essential Note-Taking Rules: Properties, [[Wikilinks]], and Graph View',
    deepDiveFa: [
      'برای اینکه یادداشت‌های شما برای هوش مصنوعی مثل یک دیتابیس هوشمند عمل کنند، ۳ قابلیت کلیدی Obsidian را به کار بگیرید:',
      '۱) بخش Properties (فرانت‌متر YAML): در اولین خط هر یادداشت سه خط تیره (`---`) بزنید تا بخش ویژگی‌ها باز شود. حداقل `date` (تاریخ)، `tags` (برچسب‌ها) و `status` (وضعیت) را وارد کنید تا هوش مصنوعی بتواند یادداشت‌ها را فیلتر کند.',
      '۲) لینک‌های دوطرفه با دو کروشه `[[نام یادداشت]]` (Wikilinks): هر جا داخل متن به پروژه، فرد یا موضوع مرتبطی اشاره کردید، نام آن را داخل دو کروشه بگذارید (مثلاً `[[پروژه مترو خط ایکس]]`). این کار یادداشت‌های جزیره‌ای را به یک شبکه عصبی به هم پیوسته تبدیل می‌کند.',
      '۳) نمای گراف (Graph View): با زدن دکمه Graph View در نوار کناری Obsidian، نقشه ستاره‌ای تمام یادداشت‌ها و ارتباطات بین آن‌ها را می‌بینید و متوجه می‌شوید کدام موضوعات بیشترین ارتباط را با هم دارند.'
    ],
    proTipFa:
      'در فایل `CLAUDE.md` به هوش مصنوعی دستور دهید که هر بار یادداشت جدیدی می‌سازد، خودش به صورت خودکار Properties بالای صفحه و لینک‌های `[[...]]` به یادداشت‌های قبلی را درج کند!',
    codeOrConfigSnippet: {
      titleFa: 'نمونه یک یادداشت استاندارد و بهینه برای هوش مصنوعی:',
      language: 'markdown',
      code: `---
date: 2026-04-12
tags: [پروژه-عمرانی, جلسه-هفتگی, منابع-انسانی]
status: active
---

# صورت‌جلسه بررسی کارکرد کارگاه مرکزی

در جلسه امروز وضعیت اضافه‌کاری تکنسین‌های [[پروژه مترو خط ایکس]] بررسی شد.
طبق بخشنامه [[ضوابط کنترل اضافه‌کاری]]، سقف مجاز کارگاه ۸۵ ساعت تعیین گردید.

## تصمیمات و اقدامات بعدی
- [ ] ارسال گزارش کارکرد به واحد [[مدیریت پیمان و ادعا]]
- [ ] بررسی مجوز شب‌کاری ایستگاه مرکزی`
    }
  },
  {
    stepNumber: 'فصل ۰۷',
    keyHint: 'B7',
    badgeFa: 'معماری اتصال AI',
    titleFa: 'منطق وصل کردن هر مدل هوش مصنوعی به Obsidian',
    titleEn: 'How Any AI Model Connects Directly to Obsidian',
    deepDiveFa: [
      'چرا می‌توانیم تقریباً هر مدل یا ایجنت هوش مصنوعی را به Obsidian وصل کنیم؟ چون والت Obsidian چیزی جز یک پوشه معمولی روی هارد کامپیوتر شما نیست!',
      'بنابراین هر ابزار هوش مصنوعی که بتواند به پوشه‌های کامپیوتر شما دسترسی خواندن و نوشتن (Filesystem Access) داشته باشد—چه از طریق Claude Desktop، چه از طریق ایجنت رایگان Hermes، و چه از طریق ابزارهای کدنویسی مثل Cursor، Windsurf یا Claude Code—می‌تواند مستقیماً وارد پوشه `D:/MIND` شود.',
      'به محض اتصال، هوش مصنوعی ابتدا فایل `CLAUDE.md` را می‌خواند تا قوانین شما را یاد بگیرد و سپس می‌تواند تمام فایل‌های `.md` را جستجو، خلاصه‌سازی، ویرایش و مرتب‌سازی کند.'
    ],
    proTipFa:
      'شما مجبور به استفاده از یک مدل خاص نیستید؛ چون حافظه شما روی هارد خودتان است، امروز می‌توانید Claude را به آن وصل کنید و فردا Hermes یا هر مدل جدید دیگری را!'
  },
  {
    stepNumber: 'فصل ۰۸',
    keyHint: 'B8',
    badgeFa: 'اتصال Claude Desktop',
    titleFa: 'وصل کردن مستقیم Claude Desktop به Vault یادداشت‌ها',
    titleEn: 'Connecting Claude Desktop Directly to Your Obsidian Vault',
    deepDiveFa: [
      'برای وصل کردن برنامه دسکتاپ Claude به پوشه یادداشت‌های Obsidian در کامپیوتر:',
      '۱. برنامه Claude Desktop و Node.js (نسخه LTS) را روی سیستم خود نصب داشته باشید.',
      '۲. در برنامه Claude Desktop از منوی بالای صفحه وارد `Settings > Developer` شوید و روی دکمه `Edit Config` کلیک کنید تا فایل `claude_desktop_config.json` باز شود.',
      '۳. کد اتصال پوشه فایل‌ها (Filesystem) را در این فایل قرار دهید و مسیر پوشه Vault خود (مثلاً `D:/MIND`) را معرفی کنید.',
      '۴. برنامه Claude Desktop را یک بار کامل ببندید و دوباره باز کنید (Restart). اکنون آیکون ابزارها در کادر چت کلاد فعال شده و کلاد به کل یادداشت‌های شما دسترسی مستقیم دارد!'
    ],
    proTipFa:
      'قبل از اینکه از Claude بخواهید تغییرات بزرگی روی یادداشت‌ها اعمال کند، همیشه در `CLAUDE.md` قانون بگذارید که هیچ فایلی را بدون اجازه مستقیم شما Delete نکند.',
    codeOrConfigSnippet: {
      titleFa: 'کد اتصال پوشه Vault در فایل claude_desktop_config.json:',
      language: 'json',
      code: `{
  "mcpServers": {
    "obsidian-vault": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/MIND"
      ]
    }
  }
}`
    }
  },
  {
    stepNumber: 'فصل ۰۹',
    keyHint: 'B9',
    badgeFa: 'ایجنت رایگان Hermes',
    titleFa: 'معرفی Hermes Agent: دستیار رایگان و متن‌باز با اسکیل داخلی Obsidian',
    titleEn: 'Introducing Hermes Agent (Nous Research) for Obsidian Automation',
    deepDiveFa: [
      'علاوه بر Claude Desktop، یکی از بهترین و قدرتمندترین ابزارهای رایگان برای مدیریت خودکار Obsidian، ایجنت هوشمند **Hermes Agent** (ساخته‌شده توسط شرکت تحقیقاتی Nous Research به آدرس `hermes-agent.nousresearch.com`) است.',
      'چرا Hermes فوق‌العاده است؟ چون به صورت پیش‌فرض دارای یک **اسکیل داخلی اختصاصی برای Obsidian (`skills/note-taking/obsidian`)** است! یعنی خودش از قبل می‌داند ساختار والت آبسیدین چیست، چطور لینک‌های `[[...]]` بسازد، چطور تگ بزند و چطور یادداشت‌ها را بدون خراب کردن فرمت ویرایش کند.',
      'علاوه بر این، Hermes می‌تواند به مدل‌های مختلف متصل شود و کارهای تکراری مثل مرتب‌سازی خودکار یادداشت‌های `00_Inbox` را با یک دستور ساده برای شما انجام دهد.'
    ],
    proTipFa:
      'ایجنت Hermes دقیقاً بر پایه همان استاندارد `SKILL.md` که در بخش اول آموختید کار می‌کند و اسکیل داخلی Obsidian آن یکی از کامل‌ترین نمونه‌های اسکیل در دنیای هوش مصنوعی است.'
  },
  {
    stepNumber: 'فصل ۱۰',
    keyHint: 'B10',
    badgeFa: 'روش اول اتصال Hermes',
    titleFa: 'روش اول اتصال Hermes به Obsidian: فعال‌سازی اسکیل داخلی و تنظیم مسیر',
    titleEn: 'Method 1: Connecting Hermes to Obsidian via Built-in Skill',
    deepDiveFa: [
      'در روش اول اتصال Hermes به والت Obsidian:',
      '۱. پس از نصب و اجرای Hermes، وارد بخش مدیریت اسکیل‌ها (Skills) شوید و اسکیل پیش‌فرض `obsidian` (در مسیر `skills/note-taking/obsidian`) را فعال کنید.',
      '۲. در تنظیمات محیطی Hermes (فایل `~/.hermes/.env` یا بخش تنظیمات اسکیل)، متغیر محیطی `OBSIDIAN_VAULT_PATH` را برابر با آدرس کامل پوشه Vault خود قرار دهید.',
      '۳. اکنون هر زمان در چت Hermes از کلمه «یادداشت»، «Obsidian» یا «Vault» استفاده کنید، اسکیل Obsidian به صورت خودکار روشن شده و به پوشه شما متصل می‌شود.'
    ],
    proTipFa:
      'با فعال بودن اسکیل Obsidian در Hermes، نیازی نیست هر بار آدرس پوشه را در چت بنویسید؛ ایجنت به صورت دائمی مسیر والت شما را می‌شناسد.',
    codeOrConfigSnippet: {
      titleFa: 'تنظیم مسیر والت در فایل تنظیمات Hermes (~/.hermes/.env):',
      language: 'env',
      code: `# تنظیم مسیر پوشه اصلی Vault آبسیدین برای ایجنت Hermes
OBSIDIAN_VAULT_PATH="D:/MIND"`
    }
  },
  {
    stepNumber: 'فصل ۱۱',
    keyHint: 'B11',
    badgeFa: 'روش دوم + رفع باگ ویندوز',
    titleFa: 'روش دوم اتصال Hermes به Obsidian + رفع مشکل رایج خوانده نشدن مسیر در ویندوز',
    titleEn: 'Method 2: Direct Vault Path & Fixing the Common Windows Path Issue',
    deepDiveFa: [
      'بسیاری از کاربران ویندوز هنگام وصل کردن Hermes یا Claude به Obsidian با خطای «پیدا نشدن مسیر Vault (Path not found)» مواجه می‌شوند. علت و راه‌حل قطعی آن چیست؟',
      '۱) مشکل بک‌اسلش ویندوز (`\\`): وقتی در ویندوز آدرس پوشه را کپی می‌کنید، به صورت `D:\\MIND` (با بک‌اسلش) است. در فایل‌های کانفیگ هوش مصنوعی و JSON، بک‌اسلش کاراکتر کنترلی محسوب می‌شود و آدرس را خراب می‌کند! همیشه آن را به اسلش معمولی (`D:/MIND`) یا دو بک‌اسلش (`D:\\\\MIND`) تبدیل کنید.',
      '۲) مشکل مسیر در محیط WSL / لینوکس روی ویندوز: اگر Hermes را داخل WSL ویندوز اجرا می‌کنید، درایو `D:` ویندوز با آدرس `/mnt/d/MIND` شناخته می‌شود نه `D:/MIND`!',
      '۳) روش دوم اتصال مستقیم در چت Hermes: حتی اگر متغیر محیطی را تنظیم نکرده باشید، می‌توانید مستقیماً در دستور خود به Hermes بگویید: «پوشه والت آبسیدین من در مسیر `D:/MIND` (یا `/mnt/d/MIND`) قرار دارد؛ وارد آن شو و فایل‌ها را بررسی کن.»'
    ],
    proTipFa:
      '۳ قانون طلایی جلوگیری از خطای ویندوز: ۱) از اسلش `/` به جای `\\` استفاده کنید، ۲) نام پوشه والت انگلیسی و بدون فاصله باشد (`D:/MIND`)، ۳) در صورت استفاده از WSL از فرمت `/mnt/d/MIND` استفاده کنید.',
    codeOrConfigSnippet: {
      titleFa: 'مقایسه مسیر اشتباه و مسیر صحیح Vault در ویندوز و WSL:',
      language: 'bash',
      code: `# ❌ اشتباه رایج در ویندوز (باعث خطای خوانده نشدن Vault می‌شود):
D:\\MIND\\My Notes

# ✅ روش صحیح ۱ (در ویندوز برای Claude Desktop و Hermes):
D:/MIND

# ✅ روش صحیح ۲ (در صورت اجرای Hermes روی WSL ویندوز):
/mnt/d/MIND`
    }
  },
  {
    stepNumber: 'فصل ۱۲',
    keyHint: 'B12',
    badgeFa: 'کارهای واقعی روزمره',
    titleFa: 'کارهای واقعی روزمره: خودکار کردن مرتب‌سازی یادداشت‌ها با Hermes و Claude',
    titleEn: 'Real Everyday Workflows: Automating Note Sorting & Daily Planning',
    deepDiveFa: [
      'حالا که مغز دوم شما به Claude و Hermes وصل شده، در زندگی و کار روزمره چه استفاده‌هایی از آن می‌کنیم؟',
      '۱) مرتب‌سازی خودکار پوشه `00_Inbox` (محبوب‌ترین کاربرد!): در طول هفته هر ایده یا نکته سريعی به ذهنتان می‌رسد بدون وسواس در `00_Inbox` می‌اندازید. آخر هفته به Hermes یا Claude می‌گویید: «تمام یادداشت‌های داخل `00_Inbox` را بخوان، غلط‌های املایی و جمله‌بندی آن‌ها را تمیز کن، تگ و تاریخ بالای صفحه بزن، به یادداشت‌های مرتبط لینک `[[...]]` بده و هر کدام را به پوشه درست خودش (`01_Projects` یا `03_Resources`) منتقل کن!»',
      '۲) برنامه‌ریزی هوشمند صبحگاهی: هر صبح از هوش مصنوعی می‌پرسید بر اساس یادداشت‌های داخل `01_Projects`، امروز کدام ۳ کار اولویت حیاتی دارند.',
      '۳) تبدیل گفتار یا متن خام جلسه به یادداشت استاندارد متصل به گراف دانش بدون یک ثانیه وقت گذاشتن برای فرمت‌بندی.'
    ],
    proTipFa:
      'با سپردن مرتب‌سازی `00_Inbox` به Hermes و Claude، دیگر هیچ‌وقت نگران شلخته شدن یادداشت‌هایتان نخواهید بود؛ شما فقط ایده‌ها را ثبت می‌کنید و هوش مصنوعی کتابدار منظم شماست!'
  },
  {
    stepNumber: 'فصل ۱۳',
    keyHint: 'B13',
    badgeFa: 'تمرین عملی پایان دوره',
    titleFa: 'تمرین عملی: راه‌اندازی اولین مغز دوم و اجرای مرتب‌سازی خودکار در ۱۵ دقیقه',
    titleEn: 'Hands-On Exercise: Launch Your Second Brain in 15 Minutes',
    deepDiveFa: [
      'برای اینکه این آموزش به مهارت دائمی شما تبدیل شود، همین امروز این تمرین ۴ مرحله‌ای را انجام دهید:',
      'گام ۱: برنامه Obsidian را نصب کنید و یک Vault جدید در مسیر `D:/MIND` بسازید.',
      'گام ۲: پنج پوشه `00_Inbox` تا `04_Archive` را بسازید و تمپلیت آماده `CLAUDE.md` (موجود در همین صفحه) را کپی کرده و در ریشه پوشه `D:/MIND` ذخیره کنید.',
      'گام ۳: سه یادداشت خام و نامرتب (مثلاً یک ایده کاری، یک لیست خرید یا تسک پروژه، و یک نکته آموزشی) داخل پوشه `00_Inbox` بسازید.',
      'گام ۴: Claude Desktop یا ایجنت Hermes را به پوشه `D:/MIND` وصل کنید و پرامپت «مرتب‌سازی خودکار Inbox» را اجرا کنید و ببینید چطور هوش مصنوعی هر ۳ فایل را فرمت‌بندی، تگ‌گذاری و به پوشه‌های اصلی منتقل می‌کند!'
    ],
    proTipFa:
      'همین یک بار انجام دادن این تمرین ۱۵ دقیقه‌ای، نحوه کار شما با هوش مصنوعی را برای همیشه از «چت‌های فراموش‌شونده» به «همکاری با یک دستیار دارای حافظه دائمی» تغییر می‌دهد.'
  }
];

export const OBSIDIAN_DAILY_WORKFLOWS: ObsidianDailyWorkflow[] = [
  {
    id: 'wf_inbox_zero_hermes',
    badgeFa: '۱. اتوماسیون محبوب (Hermes / Claude)',
    titleFa: 'مرتب‌سازی خودکار یادداشت‌های خام (00_Inbox)',
    descriptionFa:
      'پالایش یادداشت‌های عجله‌ای، اصلاح غلط‌های املایی، افزودن Properties و انتقال خودکار به پوشه‌های اصلی.',
    promptFa: `وارد پوشه 00_Inbox در والت Obsidian من (مسیر D:/MIND) شو و تمام یادداشت‌های خام داخل آن را یکی‌یکی بخوان.
برای هر یادداشت:
۱. غلط‌های املایی و جمله‌بندی‌های ناقص را بدون تغییر لحن من اصلاح و مرتب کن.
۲. در بالای فایل بخش Properties (شامل date امروز، tags مرتبط و status) را اضافه کن.
۳. اگر به موضوع یا پروژه‌ای اشاره شده که قبلاً در والت یادداشت دارد، نام آن را با فرمت [[نام یادداشت]] لینک بده.
۴. بر اساس موضوع، هر فایل را به پوشه مناسب خودش (01_Projects، 02_Areas یا 03_Resources) منتقل کن و در پایان یک جدول گزارش از کارهایی که انجام دادی به من بده.`
  },
  {
    id: 'wf_daily_priorities',
    badgeFa: '۲. شروع روز کاری',
    titleFa: 'استخراج ۳ اولویت کلیدی امروز از پروژه‌های فعال',
    descriptionFa:
      'بررسی فایل CLAUDE.md و پوشه 01_Projects برای تعیین مهم‌ترین تسک‌های امروز بدون نیاز به توضیح مجدد.',
    promptFa: `ابتدا فایل CLAUDE.md و سپس تمام یادداشت‌های داخل پوشه 01_Projects در والت Obsidian من را بررسی کن.
بر اساس ددلاین‌ها، تسک‌های تیک‌نخورده (- [ ]) و اولویت‌های کاری من، بگو امروز دقیقاً روی کدام ۳ کار کلیدی باید تمرکز کنم؟ پاسخ را در یک جدول جمع‌وجور همراه با دلیل اولویت هر مورد بنویس.`
  },
  {
    id: 'wf_capture_idea_graph',
    badgeFa: '۳. ثبت در گراف دانش',
    titleFa: 'تبدیل ایده یا خلاصه جلسه به یادداشت استاندارد متصل به گراف',
    descriptionFa:
      'ذخیره مستقیم نکات جلسه یا ایده جدید در پوشه مناسب به همراه ویکی‌لینک‌های دوطرفه [[...]].',
    promptFa: `متن زیر را به عنوان یک یادداشت استاندارد جدید در والت Obsidian من ذخیره کن:
۱. بر اساس موضوع، تصمیم بگیر در کدام پوشه (01_Projects یا 03_Resources) و با چه نام فایلی ذخیره شود.
۲. در ابتدای فایل YAML Frontmatter شامل تاریخ امروز و تگ‌های دقیق قرار بده.
۳. متن را با تیترهای استاندارد (# و ##) و چک‌لیست اقدامات بعدی (- [ ]) ساختاردهی کن و به یادداشت‌های مرتبط قبلی در والت من با فرمت [[نام یادداشت]] لینک بده:

[متن ایده یا صورت‌جلسه خود را اینجا قرار دهید]`
  },
  {
    id: 'wf_hands_on_exercise',
    badgeFa: '۴. پرامپت تمرین پایان دوره',
    titleFa: 'تست سلامت اتصال Claude / Hermes به والت شما',
    descriptionFa:
      'اولین دستوری که پس از ساخت پوشه D:/MIND و اتصال هوش مصنوعی باید برای تست اجرا کنید.',
    promptFa: `پوشه والت Obsidian من را در مسیر D:/MIND بررسی کن.
۱. بگو الان چه پوشه‌ها و فایل‌هایی داخل والت من می‌بینی؟
۲. اگر هر یک از پوشه‌های استاندارد (00_Inbox، 01_Projects، 02_Areas، 03_Resources، 04_Archive) یا فایل CLAUDE.md وجود نداشت، خودت همین الان آن‌ها را برایم بساز.
۳. یک یادداشت نمونه خوش‌آمدگویی با فرمت استاندارد Obsidian (دارای Properties و لینک [[CLAUDE]]) در پوشه 00_Inbox ایجاد کن تا از صحت دسترسی خواندن و نوشتن مطمئن شویم.`
  }
];
