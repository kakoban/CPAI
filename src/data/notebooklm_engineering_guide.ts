export interface DepartmentUseCase {
  id: string;
  departmentFa: string;
  departmentEn: string;
  managerRoleFa: string;
  managerRoleEn: string;
  iconName: string;
  colorTheme: string;
  recommendedSourcesFa: string[];
  recommendedSourcesEn: string[];
  keyDeliverablesFa: string[];
  keyDeliverablesEn: string[];
  samplePromptFa: string;
  samplePromptEn: string;
  practicalValueFa: string;
  practicalValueEn: string;
}

export interface PresentationInfographicBlueprint {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  stepByStepGuideFa: string[];
  stepByStepGuideEn: string[];
  copyablePromptFa: string;
  copyablePromptEn: string;
  outputPreviewHighlightsFa: string[];
  outputPreviewHighlightsEn: string[];
}

export interface ExerciseSubScenario {
  id: string;
  number: number;
  titleFa: string;
  titleEn: string;
  promptFa: string;
  promptEn: string;
  expectedKeyFa: string[];
  expectedKeyEn: string[];
  sampleLetterOutputFa?: string;
}

export interface NotebookLmExercise {
  id: string;
  exerciseNumber: number;
  titleFa: string;
  titleEn: string;
  targetDepartmentFa: string;
  targetDepartmentEn: string;
  estimatedMinutes: number;
  difficultyFa: string;
  difficultyEn: string;
  requiredSourceFa: string;
  requiredSourceEn: string;
  sourceDownloadNoteFa: string;
  sourceDownloadNoteEn: string;
  objectiveFa: string;
  objectiveEn: string;
  instructionsFa: string[];
  instructionsEn: string[];
  promptToCopyFa: string;
  promptToCopyEn: string;
  successVerificationFa: string[];
  successVerificationEn: string[];
  subScenarios?: ExerciseSubScenario[];
}

// 1. CORE CAPABILITIES OF NOTEBOOKLM
export const NOTEBOOKLM_OVERVIEW = {
  titleFa: 'گوگل نوت‌بوک ال‌ام (Google NotebookLM): دستیار هوشمند مبتنی بر پایگاه دانش مستند',
  titleEn: 'Google NotebookLM: Zero-Hallucination Grounded AI for Mega-Projects',
  url: 'https://notebooklm.google.com',
  taglineFa: 'تبدیل صدها صفحه اسناد فنی، قراردادی و گزارش‌های کارگاهی به خرد اجرایی، پادکست‌های صوتی، اسلایدهای پرزنتیشن و اینفوگرافیک با ارجاع دقیق به شماره صفحه.',
  taglineEn: 'Transform hundreds of engineering specs, EPC contracts, and site logs into executive podcasts, slide decks, and infographics with 100% source attribution.',
  keyStats: [
    { labelFa: 'ظرفیت هم‌زمان منابع', labelEn: 'Max Sources', value: '50 سند' },
    { labelFa: 'حجم هر منبع ورودی', labelEn: 'Words Per Source', value: '۵۰۰,۰۰۰ واژه' },
    { labelFa: 'تضمین عدم توهم', labelEn: 'Source Grounding', value: '۱۰۰٪ مستند' },
    { labelFa: 'پادکست صوتی عمیق', labelEn: 'Audio Overview', value: 'دو نفره AI' }
  ],
  whyEngineersLoveItFa: [
    'بر خلاف ChatGPT و مدل‌های عمومی، نوت‌بوک ال‌ام از خودش چیزی اختراع نمی‌کند؛ هر پاسخ دارای نشانگرهای عددگذاری‌شده (Footnotes) است که با کلیک روی آن، دقیقاً پاراگراف و صفحه سند منبع هایلایت می‌شود.',
    'قابلیت آپلود مستقیم انواع فایل‌ها: PDF نقشه‌ها و مشخصات، فایل‌های Word صورت‌جلسات، شیت‌های اکسل/CSV، فایل‌های متنی Markdown، لینک وب‌سایت‌های استاندارد و حتی ویدیوهای یوتیوب کارگاهی.',
    'تولید پادکست صوتی اختصاصی (Audio Overview): دو میزبان هوش مصنوعی اسناد خشک مهندسی را تحلیل کرده و در قالب گفت‌وگوی صوتی جذاب ۱۰ دقیقه‌ای به شما تحویل می‌دهند تا در مسیر کارگاه گوش دهید!',
    'حفظ کامل محرمانگی سازمانی: گوگل تضمین کرده داده‌های بارگذاری‌شده در حساب‌های سازمانی NotebookLM برای آموزش مدل‌های عمومی استفاده نمی‌شوند.'
  ],
  whyEngineersLoveItEn: [
    'Strict source grounding with inline numbered citations. Click any citation to see the exact paragraph.',
    'Supports up to 50 sources (PDFs, Docs, Sheets/CSV, Markdown, URLs, and YouTube videos).',
    'Audio Overview generates a lifelike 2-host conversational podcast summarizing technical documents.',
    'Enterprise data privacy: Uploaded project files are not used to train Google models.'
  ]
};

// 2. UNIT MANAGERS MATRIX IN METRO & OIL/GAS PROJECTS
export const UNIT_MANAGERS_MATRIX: DepartmentUseCase[] = [
  {
    id: 'tech_office',
    departmentFa: 'دفتر فنی و مهندسی (Technical Office)',
    departmentEn: 'Engineering & Technical Office',
    managerRoleFa: 'مدیر دفتر فنی و سرپرست مهندسی پروژه',
    managerRoleEn: 'Lead Technical Office Manager',
    iconName: 'Building2',
    colorTheme: '#00738c',
    recommendedSourcesFa: [
      'مشخصات فنی عمومی و خصوصی پیمان (نظیر نشریه ۵۵ یا استانداردهای مترو)',
      'کدهای بین‌المللی پروژه (مانند ASME B31.8, API 1104, NFPA 130, BTS)',
      'دفترچه‌های محاسباتی سازه نگهبان، شفت TBM، و گزارش‌های ژئوتکنیک خاک',
      'کاتالوگ‌های تجهیزات و مشخصات متریال مصالح ابلاغی (IFC Drawings)'
    ],
    recommendedSourcesEn: [
      'Project Particular Specifications & Metro Technical Guidelines',
      'International Codes (ASME B31.8, API 1104, NFPA 130, BTS)',
      'Geotechnical soil investigation reports & structural design books',
      'Material submittals, vendor catalogs, and IFC drawings'
    ],
    keyDeliverablesFa: [
      'استخراج مغایرت‌های بین نقشه‌های معماری/سازه و استانداردهای مصوب کارفرما',
      'تولید فرم‌های تاییدیه مصالح (Material Approval Sheets - MAS)',
      'پاسخ فوری به سوالات فنی مهندسان اجرایی در کارگاه همراه با ذکر شماره بند استاندارد'
    ],
    keyDeliverablesEn: [
      'Clash and discrepancy detection between IFC drawings and specs',
      'Drafting Material Approval Sheets (MAS)',
      'Instant technical queries verification with clause citations'
    ],
    samplePromptFa: `با بررسی تمامی اسناد مشخصات فنی و گزارش ژئوتکنیک بارگذاری‌شده:
۱. مشخصات فنی دوغاب تزریق پشت رینگ سگمنت‌های TBM (Tail Grouting) شامل مقاومت فشاری ۲۸ روزه، درصد روانی، زمان گیرش اولیه و نسبت آب به سیمان مجاز را در یک جدول استخراج کن.
۲. آیا در مشخصات فنی محدودیتی برای نشست مجاز سطح خیابان بالای خط تونل (Maximum Surface Settlement) ذکر شده است؟ شماره صفحه و بند دقیق را رفرنس بده.`,
    samplePromptEn: `Based on the uploaded technical specs and geotechnical reports:
1. Extract a table of TBM tail grouting requirements (28-day compressive strength, bleed percentage, initial setting time, W/C ratio).
2. Is there an allowable ground settlement limit specified for urban streets? Provide exact page and clause citations.`,
    practicalValueFa: 'صرفه‌جویی در ده‌ها ساعت جستجوی دستی در میان هزاران صفحه استاندارد و کاهش خطاهای رد مصالح توسط دستگاه نظارت.',
    practicalValueEn: 'Saves dozens of hours flipping through thick specification binders and eliminates material rejection delays.'
  },
  {
    id: 'contracts_claims',
    departmentFa: 'قراردادها، حقوقی و دعاوی (Contracts & Claims)',
    departmentEn: 'Contracts, Legal & Claims Department',
    managerRoleFa: 'مدیر امور قراردادها و کارشناس لایحه تاخیرات',
    managerRoleEn: 'Contracts Director & Claim Specialist',
    iconName: 'Scale',
    colorTheme: '#b87333',
    recommendedSourcesFa: [
      'موافقت‌نامه، شرایط عمومی (نشریه ۴۳۱۱ یا فیدیک سیلوربوک) و شرایط خصوصی پیمان',
      'کلیه مکاتبات رسمی ارسالی و دریافتی با کارفرما و مهندس مشاور',
      'صورت‌جلسات تحویل زمین، موانع اجرایی و معارضین تأسیساتی شهری',
      'دستورکارها (Site Instructions) و تغییر مقادیر کار (Change Orders)'
    ],
    recommendedSourcesEn: [
      'Contract Agreement, General Conditions (FIDIC/Circular 4311), Particular Conditions',
      'All incoming and outgoing official project correspondence',
      'Site handover minutes, utility clashes, and right-of-way obstruction records',
      'Site instructions and Variation Orders (VO)'
    ],
    keyDeliverablesFa: [
      'تدوین جدول زمانی مستندات ادعا (Chronological Event Matrix) با ارجاع دقیق به شماره نامه‌ها',
      'بررسی رعایت مهلت‌های اخطار کتبی (فرجه ۲۱ روزه ماده ۳۰ یا ۲۸ روزه فیدیک)',
      'پیش‌نویس نامه‌های رسمی اخطار تاخیر و لوایح دفاعیه با استناد به بندهای قراردادی'
    ],
    keyDeliverablesEn: [
      'Chronological delay event register linking dates and letter numbers',
      'Time-bar compliance verification (Clause 30 / FIDIC Clause 20.1)',
      'Drafting substantiated contractual claims and notice letters'
    ],
    samplePromptFa: `به عنوان مشاور ارشد امور قراردادها و دعاوی:
تمامی مکاتبات و صورت‌جلسات بارگذاری‌شده مربوط به "توقف حفاری TBM به دلیل برخورد با لوله گاز معارض در ایستگاه ۱۲" را مرور کن.
۱. یک جدول زمانی دقیق (Chronology) از اولین نامه اعلام وجود معارض، نامه‌های پیگیری، تاریخ تشکیل جلسه تا ابلاغ جابجایی تاسیسات رسم کن.
۲. آیا پیمانکار اخطار اولیه خود را ظرف فرجه ۲۱ روزه مقرر در ماده ۳۰ شرایط عمومی پیمان ارسال کرده است؟
۳. پیش‌نویس یک لایحه ادعای تمدید زمان (EOT) رسمی خطاب به مهندس مشاور با استناد به شماره نامه‌ها و بندهای قرارداد تنظیم کن.`,
    samplePromptEn: `As Senior Contracts Advisor:
Review all uploaded letters regarding the utility clash in Station 12.
1. Generate a chronological timeline from the first notice to the relocation order.
2. Did the contractor issue the notice within the statutory 21-day window of Clause 30?
3. Draft a formal Extension of Time (EoT) claim letter with exact letter and clause citations.`,
    practicalValueFa: 'جلوگیری از رد ادعاهای میلیاردی به دلیل خطای زمانی و آماده‌سازی پرونده‌های داوری بدون اتکا به حافظه افراد.',
    practicalValueEn: 'Prevents multi-billion claim rejections due to missed deadlines and builds ironclad arbitration files.'
  },
  {
    id: 'planning_controls',
    departmentFa: 'برنامه‌ریزی و کنترل پروژه (Planning & PMO)',
    departmentEn: 'Planning & Project Controls (PMO)',
    managerRoleFa: 'مدیر برنامه‌ریزی و کنترل پروژه (PMO Lead)',
    managerRoleEn: 'Lead Project Controls Manager',
    iconName: 'FileSpreadsheet',
    colorTheme: '#0f4c5c',
    recommendedSourcesFa: [
      'گزارش‌های ماهانه و هفتگی پیشرفت فیزیکی ۱۲ ماه گذشته پروژه',
      'منشور پروژه و ساختار شکست کار (WBS Dictionary)',
      'صورت‌وضعیت‌های موقت تاییدشده مالی و گزارش‌های ارزش کسب‌شده (EVM)',
      'برنامه زمان‌بندی مبنا (Baseline Schedule) و مکاتبات مسیر بحرانی'
    ],
    recommendedSourcesEn: [
      'Monthly and weekly progress reports for the past 12 months',
      'Project charter and WBS dictionary',
      'Approved interim payment certificates & Earned Value (EVM) sheets',
      'Baseline schedule logs and critical path memos'
    ],
    keyDeliverablesFa: [
      'تحلیل علل ریشه‌ای انحراف شاخص‌های زمانی و هزینه‌ای (SPI و CPI)',
      'استخراج خلاصه مدیریتی جهت ارائه به هیئت‌مدیره و ارکان راهبری پروژه',
      'پیش‌بینی تاخیرات بر اساس روند پیشرفت جبهه‌های کاری TBM و پایپینگ'
    ],
    keyDeliverablesEn: [
      'Root cause analysis of schedule and cost variances (SPI/CPI)',
      'Executive dashboard summaries for Board meetings',
      'Completion forecasting based on TBM advance and piping trends'
    ],
    samplePromptFa: `تمام گزارش‌های ماهانه و صورت‌وضعیت‌های بارگذاری‌شده پروژه را بررسی کن:
۱. سه فعالیت اصلی که بیشترین تاخیر تجمعی منفی را در مسیر بحرانی پروژه ایجاد کرده‌اند کدامند؟
۲. روند تغییرات شاخص‌های SPI و CPI را در طول ۶ ماه اخیر به همراه علل اعلام‌شده توسط تیم پروژه خلاصه کن.
۳. یک خلاصه اجرایی ۳ پاراگرافی از وضعیت پروژه برای جلسه ماهانه هیئت‌مدیره بنویس.`,
    samplePromptEn: `Analyze all uploaded monthly progress reports:
1. Identify the top 3 critical path activities causing the largest negative schedule variance.
2. Summarize the 6-month trend of SPI and CPI and their documented causes.
3. Write a 3-paragraph executive summary for the monthly Board of Directors briefing.`,
    practicalValueFa: 'خلاصه‌سازی هزاران صفحه داده‌های پراکنده در چند دقیقه جهت تصمیم‌گیری استراتژیک مدیران عامل.',
    practicalValueEn: 'Compresses thousands of pages of raw PMO reports into executive intelligence within minutes.'
  },
  {
    id: 'hse_safety',
    departmentFa: 'ایمنی، بهداشت و محیط‌زیست (HSE)',
    departmentEn: 'Health, Safety & Environment (HSE)',
    managerRoleFa: 'مدیر ایمنی و سرپرست ارشد HSE کارگاه',
    managerRoleEn: 'HSE Director & Lead Safety Engineer',
    iconName: 'Shield',
    colorTheme: '#8c3b2d',
    recommendedSourcesFa: [
      'پلان ایمنی و نظام‌نامه HSE مصوب پروژه (HSE Plan)',
      'گزارش‌های حوادث، شبه‌حوادث (Near Misses) و لاگ‌های بازرسی روزانه',
      'دستورالعمل‌های ورود به فضاهای بسته (Confined Space) در شفت و تونل',
      'شناسنامه ایمنی مواد شیمیایی (MSDS) مورد استفاده در فوم TBM و عایق‌ها'
    ],
    recommendedSourcesEn: [
      'Approved Project HSE Plan & Safety Manuals',
      'Incident & Near-Miss investigation logs and daily audit sheets',
      'Confined space entry & gas testing protocols for deep shafts',
      'Material Safety Data Sheets (MSDS) for tunneling foams and coatings'
    ],
    keyDeliverablesFa: [
      'تولید خودکار موضوعات صحبت‌های ۵ دقیقه‌ای ایمنی قبل از کار (Toolbox Talks)',
      'استخراج سناریوهای واکنش در شرایط اضطراری (ERP) برای ریزش گود، نشت گاز یا آتش‌سوزی',
      'ماتریس ارزیابی ریسک و شناسایی کانون‌های پرخطر شیفت‌های کاری'
    ],
    keyDeliverablesEn: [
      'Automated generation of daily 5-minute Toolbox Talks (TBT)',
      'Emergency Response Plans (ERP) for collapse, gas leak, or tunnel fire',
      'Job Hazard Analysis (JHA) and high-risk zone heatmaps'
    ],
    samplePromptFa: `بر اساس دستورالعمل‌های ایمنی و نظام‌نامه HSE بارگذاری‌شده برای کار در فضاهای زیرزمینی و شفت TBM:
۱. یک چک‌لیست بازرسی روزانه ۱۰ ماده‌ای برای ایمنی عملیات کار در ارتفاع و استقرار جرثقیل در لبه ترانشه شفت استخراج کن.
۲. پنج سرفصل آموزشی کوتاه برای جلسات ایمنی صبحگاهی (Toolbox Talk) کارگران بخش لاینینگ تونل بنویس.
۳. در صورت قطعی ناگهانی سیستم تهویه هوای تونل (SES)، پروتکل گام‌به‌گام تخلیه اضطراری چیست؟`,
    samplePromptEn: `Based on the uploaded underground HSE manual:
1. Generate a 10-point daily safety checklist for crane operations and working at height near the shaft crest.
2. Create 5 concise Toolbox Talk (TBT) topics for tunnel lining crews.
3. What is the mandatory step-by-step emergency evacuation protocol in case of tunnel ventilation failure?`,
    practicalValueFa: 'تبدیل آیین‌نامه‌های قطور ایمنی به هشدارهای عملیاتی روزانه و جلوگیری از حوادث مرگبار کارگاهی.',
    practicalValueEn: 'Transforms bulky safety manuals into daily actionable checklists, actively preventing fatal incidents.'
  },
  {
    id: 'qaqc_inspection',
    departmentFa: 'کنترل کیفیت و بازرسی فنی (QA/QC)',
    departmentEn: 'Quality Assurance & Quality Control (QA/QC)',
    managerRoleFa: 'مدیر کنترل کیفیت و رئیس آزمایشگاه مقیم',
    managerRoleEn: 'Lead QA/QC Manager & Materials Lab Head',
    iconName: 'CheckCircle2',
    colorTheme: '#2f7d5b',
    recommendedSourcesFa: [
      'برنامه جامع کنترل کیفیت و طرح آزمون و بازرسی (ITP)',
      'نتایج شیت‌های آزمایشگاهی مقاومت فشاری بتن، اسلامپ و آزمون‌های غیرمخرب (NDT)',
      'گزارش‌های عدم انطباق کیفی صادرشده (NCR Register)',
      'دستورالعمل‌های روش اجرای استاندارد (Method Statements)'
    ],
    recommendedSourcesEn: [
      'Inspection and Test Plans (ITP) & Quality Manuals',
      'Concrete compressive test results, slump logs, and NDT reports',
      'Non-Conformance Report (NCR) logs and dispositions',
      'Approved Contractor Method Statements'
    ],
    keyDeliverablesFa: [
      'پایش خودکار عدم انطباق‌ها و استخراج الگوهای عیوب تکرارشونده در بتن یا جوشکاری',
      'آماده‌سازی مدارک بازرسی نهایی جهت صدور گواهی تحویل موقت (PAC)',
      'چک‌لیست‌های پیش‌راه‌اندازی سیستم‌ها و بستن لیست پانچ‌ها (Punch List Clearance)'
    ],
    keyDeliverablesEn: [
      'Automated NCR trend tracking for recurring weld and concrete defects',
      'Dossier compilation for Provisional Acceptance Certificate (PAC)',
      'Pre-commissioning checklists and punch-list clearance workflows'
    ],
    samplePromptFa: `تمامی مدارک ITP، نتایج آزمون‌های بتن و لاگ NCRهای بارگذاری‌شده را بررسی کن:
۱. چند مورد عدم انطباق (NCR) در خصوص عیوب ظاهری سگمنت‌های بتنی (کرموزدگی یا ترک مویی) ثبت شده و چه تعداد هنوز باز است؟
۲. معیارهای پذیرش مقاومت فشاری بتن رده C50 بر اساس نمونه‌های استوانه‌ای استاندارد چیست؟
۳. چک‌لیست ۵ مرحله‌ای رفع نقص (Punch Clearing) برای سیستم تزریق گروت را تنظیم کن.`,
    samplePromptEn: `Review the uploaded ITP, concrete test reports, and NCR logs:
1. How many NCRs were issued regarding precast segment defects and how many remain open?
2. What are the acceptance criteria for C50 concrete compressive strength?
3. Generate a 5-step punch-clearing checklist for the grouting system.`,
    practicalValueFa: 'تسریع چشمگیر فرآیند بستن پانچ‌ها و دریافت تاییدیه مهندس مشاور بدون تاخیر در تحویل نهایی.',
    practicalValueEn: 'Dramatically speeds up punch clearance and avoids handover delays with the supervising engineer.'
  },
  {
    id: 'site_operations',
    departmentFa: 'مدیریت اجرایی و کارگاه (Construction & Site Ops)',
    departmentEn: 'Construction & Site Operations',
    managerRoleFa: 'مدیر پروژه و سرپرست کل کارگاه‌های اجرایی',
    managerRoleEn: 'Project Director & Site General Superintendent',
    iconName: 'Layers',
    colorTheme: '#1f5163',
    recommendedSourcesFa: [
      'گزارش‌های روزانه سرپرستان کارگاه و دفترچه گزارش‌های روزانه ناظر مقیم',
      'شناسنامه ماشین‌آلات و سوابق تعمیر و نگهداری تجهیزات سنگین (TBM, جرثقیل‌ها)',
      'پلان‌های ترافیکی مصوب و مجوزهای پلیس راهور و شهرداری',
      'خلاصه‌های مالی هفتگی و لیست تنخواه‌گردان‌های اضطراری کارگاه'
    ],
    recommendedSourcesEn: [
      'Daily site logs and resident engineer inspection diaries',
      'Heavy equipment maintenance registers (TBM, cranes, pumps)',
      'Approved traffic diversion schemes and municipal permits',
      'Weekly field cost summaries and petty cash authorizations'
    ],
    keyDeliverablesFa: [
      'تولید پادکست خلاصه صوتی (Audio Overview) جهت گوش دادن به گزارش روزانه در خودرو',
      'پایش آماده‌به‌کاری ناوگان ماشین‌آلات و زنجیره تامین متریال حیاتی',
      'برنامه‌ریزی شیفت‌های شبانه بر اساس جبهه‌های کاری آزادشده'
    ],
    keyDeliverablesEn: [
      'Generating 10-minute Audio Overview podcasts for daily commute briefing',
      'Fleet readiness tracking and critical material supply bottlenecks',
      'Night-shift operational assignments based on handed-over workfronts'
    ],
    samplePromptFa: `تمامی گزارش‌های روزانه کارگاهی هفته گذشته را مرور کن:
۱. بیشترین ساعات توقف ماشین‌آلات کلیدی (جرثقیل پورتال و TBM) مربوط به چه علت‌هایی بوده است؟
۲. وضعیت پیشرفت رینگ‌گذاری در شیفت شب نسبت به شیفت روز چه تفاوتی داشته است؟
۳. برای جلسه هماهنگی عصر امروز با سرپرستان اجرایی، ۴ موضوع دارای اولویت بحرانی را استخراج کن.`,
    samplePromptEn: `Review all daily site logs from the past week:
1. What caused the highest equipment downtime for the TBM and gantry crane?
2. Compare ring assembly progress between day and night shifts.
3. Identify the top 4 critical priority topics for this evening's coordination meeting.`,
    practicalValueFa: 'تسلط کامل مدیر پروژه بر جزییات کارگاه بدون غرق شدن در صدها برگه گزارش روزانه کاغذی.',
    practicalValueEn: 'Empowers the Project Director with full operational command without drowning in paperwork.'
  },
  {
    id: 'hr_admin',
    departmentFa: 'منابع انسانی، اداری و رفاهی (HR & Admin)',
    departmentEn: 'Human Resources, Admin & Site Welfare',
    managerRoleFa: 'مدیر منابع انسانی و امور اداری پروژه (پروژه مترو خط ایکس)',
    managerRoleEn: 'HR & Administrative Affairs Manager (Metro Line X Project)',
    iconName: 'Users',
    colorTheme: '#7c3aed',
    recommendedSourcesFa: [
      'منبع ۱: گزیده مواد منابع انسانی، رفاهی، بیمه‌ای و کارگاهی از قرارداد احداث مترو خط ایکس (مواد ۱۸، ۲۰-ح، ۲۱-ج، ۲۴-ب، ۲۵ و بند ۴۲-۱)',
      'منبع ۲: بخشنامه داخلی کنترل اضافه‌کاری پرسنل سازمان پیمانکار (HR-INST-1403/07) و دیتابیس کارکرد ماهانه دستگاه‌های کارت‌زن (ایستگاه S-01، ایستگاه S-02، واحد TBM و ستاد)',
      'جدول حداقل متراژ فضاهای الزامی تجهیز کارگاه (صفحه ۵۴ قرارداد مترو خط ایکس)',
      'لیست‌های بیمه تامین اجتماعی و گزارش‌های روزانه تاییدشده مهندسین مشاور ناظر'
    ],
    recommendedSourcesEn: [
      'Source 1: HR, Welfare, Insurance & Site Clauses from Metro Line X Contract (Articles 18, 20-H, 21-C, 24-B, 25 & Clause 42-1)',
      'Source 2: Internal Contractor Overtime Directive (HR-INST-1403/07) & Monthly Time-Card Attendance Logs (Station S-01, Station S-02, TBM, HQ)',
      'Mandatory Site Camp Space Allocation Table (Contract Page 54)',
      'Social Security (SSO) certified rosters & consultant-approved daily logs'
    ],
    keyDeliverablesFa: [
      'تقاطع‌گیری هوشمند بین «الزامات بیرونی پیمان (کارفرما/مشاور)» و «ضوابط کنترلی داخلی (سازمان پیمانکار)» برای کشف انحرافات اضافه‌کاری و شب‌کاری',
      'بررسی رعایت مهلت اطلاع‌رسانی قبلی به مهندس مشاور (بند ۴۲-۱: یک هفته قبل برای شب‌کاری و ۲۴ ساعت قبل برای اضافه‌کاری روز) و خط قرمز خستگی مفرط (۱۴ روز کار متوالی)',
      'تفکیک تعهدات متراژ فضاهای اداری/رفاهی پرسنل پیمانکار در برابر عوامل کارفرما، مدیر طرح و مهندس مشاور (ماده ۲۰-ح و صفحه ۵۴)',
      'نگارش خودکار نامه‌های رسمی اخطار درون‌سازمانی به سرپرستان کارگاه و طراحی کوییز ۴ گزینه‌ای ارزیابی تسلط کارشناسان HR'
    ],
    keyDeliverablesEn: [
      'Cross-referencing External Contract Obligations (Client/Consultant) vs. Internal HR Controls (Contractor Organization)',
      'Auditing Clause 42-1 notice deadlines (7 days for night shift, 24h for day overtime) & 14-day consecutive fatigue red-lines',
      'Comparing contractor vs. client/consultant camp space allocations (Article 20-H & Page 54) and catering/service staff',
      'Drafting formal internal warning memos to site superintendents & generating 4-option compliance quizzes'
    ],
    samplePromptFa: `با تقاطع‌گیری بین "منبع ۱ (قرارداد مترو خط ایکس)" و "منبع ۲ (بخشنامه داخلی و کارکرد ماهانه سازمان پیمانکار)":
۱. یک جدول تحلیلی از وضعیت اضافه‌کاری ۴ واحد پروژه (ایستگاه مرکزی S-01، ایستگاه غربی S-02، واحد TBM، و دفتر فنی/ستاد) تهیه کن و مشخص کن در هر واحد آیا سقف مجاز داخلی و الزامات قراردادی (ماده ۲۵ و بند ۴۲-۱) رعایت شده است یا خیر؟
۲. بر اساس ماده ۲۰-ح و جدول صفحه ۵۴ قرارداد، متراژ فضاهای الزامی برای پرسنل خود پیمانکار در مقایسه با عوامل کارفرما و نظارت چقدر است و چه تعداد نیروی خدماتی و وعده غذایی باید تامین شود؟
۳. یک نامه رسمی درون‌سازمانی از طرف "مدیر منابع انسانی سازمان پیمانکار" به "سرپرست کارگاه ایستگاه شماره ۱ (S-01)" بابت عدم اطلاع‌رسانی ۱ هفته قبل شب‌کاری به مهندس مشاور و کارکرد ۱۸ روز متوالی ۳ تکنسین سازه نگهبان بنویس.`,
    samplePromptEn: `By cross-referencing "Source 1 (Metro Line X Contract)" and "Source 2 (Internal Contractor Overtime Directive & Monthly Logs)":
1. Build an analytical compliance table across all 4 project units (Station S-01, Station S-02, TBM Unit, and Technical Office/HQ) checking internal overtime caps, Clause 42-1 prior notice rules, and HSE fatigue risks.
2. Extract the mandatory space allocation table (Page 54 & Article 20-H) comparing contractor staff facilities vs. client/consultant spaces and catering duties.
3. Draft an official internal warning letter from the Contractor's HR Manager to the Station S-01 Site Superintendent regarding unnotified night concrete pouring and 18-day consecutive work violations.`,
    practicalValueFa: 'جلوگیری از سوخت شدن هزینه‌های شب‌کاری و اضافه‌کاری در صورت‌وضعیت‌ها (ماده ۲۵ و بند ۴۲-۱) و پیشگیری از حوادث ناشی از خستگی مفرط در کارگاه‌های زیرزمینی.',
    practicalValueEn: 'Prevents financial rejection of night-shift overtime claims under Clause 42-1 and eliminates underground fatigue hazards.'
  }
];

// 3. PRESENTATION AND INFOGRAPHIC WORKFLOWS
export const PRESENTATION_INFOGRAPHIC_GUIDES: PresentationInfographicBlueprint[] = [
  {
    id: 'presentation_deck_workflow',
    titleFa: 'استخراج اسلایدهای پرزنتیشن گزارش هیئت‌مدیره و کارفرما (Slide Deck Blueprint)',
    titleEn: 'Executive Presentation Slide Deck Extraction for Board & Client Briefings',
    categoryFa: 'پرزنتیشن و ارائه مدیریتی',
    categoryEn: 'Executive Presentations',
    descriptionFa: 'چگونه صدها صفحه گزارش ماهانه و مکاتبات قراردادی را در NotebookLM به یک فایل ساختاریافته ۱۰ اسلایدی برای ارائه به هیئت‌مدیره، مجمع یا کارفرما تبدیل کنیم.',
    descriptionEn: 'How to distill hundreds of pages of project reports into a high-impact 10-slide presentation deck outline.',
    stepByStepGuideFa: [
      '۱. فایل‌های گزارش پیشرفت ماهانه اخیر، گزارش مالی EVM و خلاصه دعاوی را در یک نوت‌بوک جدید آپلود کنید.',
      '۲. پرامپت اختصاصی استخراج پرزنتیشن (پایین) را کپی کرده و در چت NotebookLM ارسال کنید.',
      '۳. مدل ساختار کامل ۱۰ اسلاید شامل عنوان، ۳ نکته کلیدی، داده‌های آماری دقیق و پیام نهایی هر اسلاید را با رفرنس صفحه ارائه می‌دهد.',
      '۴. خروجی را با دکمه Copy کپی کرده و مستقیماً در نرم‌افزارهای PowerPoint، Google Slides یا ابزارهای AI مانند Gamma یا Canva جای‌گذاری نمایید.'
    ],
    stepByStepGuideEn: [
      '1. Upload recent progress reports, EVM finance sheets, and claim summaries into a Notebook.',
      '2. Send the Presentation Deck Prompt below.',
      '3. NotebookLM generates a 10-slide outline with titles, bullet points, data callouts, and takeaways.',
      '4. Paste the structure into PowerPoint, Google Slides, Gamma, or Canva.'
    ],
    copyablePromptFa: `بر اساس تمامی اسناد پیشرفت، صورت‌وضعیت‌ها و گزارش‌های ژئوتکنیکی بارگذاری‌شده در این نوت‌بوک:

یک ساختار اسلایدی حرفه‌ای و ۱۰ صفحه‌ای (Slide Deck Outline) برای جلسه ارائه پیشرفت پروژه به "هیئت‌مدیره و سرمایه‌گذار ارشد" طراحی کن.

قالب هر اسلاید باید دقیقاً شامل بخش‌های زیر باشد:
[اسلاید شماره X: عنوان جذاب و کوتاه]
- تیتر فرعی و پیام کلیدی اسلاید (Takeaway Message)
- ۳ نکته تحلیلی و مستند (با ذکر ارقام قطعی، درصد پیشرفت، تاریخ‌ها و رفرنس سند منبع)
- شاخص عددی برجسته (Hero Metric / Big Number) جهت نمایش درشت در وسط اسلاید
- چالش یا مانع بحرانی و اقدام پیشنهادی پروژه (Mitigation Action)

عناوین اسلایدها باید توالی زیر را داشته باشند:
اسلاید ۱: تابلوی کلی وضعیت پروژه و هدف کلان دوره
اسلاید ۲: شاخص‌های ارزش کسب‌شده (EVM: PV, EV, AC, SPI, CPI) و انحرافات مالی
اسلاید ۳: وضعیت پیشرفت جبهه تونل‌سازی مکانیزه TBM / خط لوله نفت
اسلاید ۴: عملیات ابنیه ایستگاه، دال کف و سیستم‌های سازه نگهبان
اسلاید ۵: تحلیل مسیر بحرانی و عوامل تاخیرساز کارفرما (معارضین و ابلاغ نقشه‌ها)
اسلاید ۶: کارنامه ایمنی HSE و پایش مخاطرات کارگاهی
اسلاید ۷: مدیریت کیفیت QA/QC و وضعیت بستن پانچ‌ها و آزمایشات متریال
اسلاید ۸: زنجیره تامین و چالش‌های ترخیص قطعات یدکی و متریال حیاتی
اسلاید ۹: پیش‌بینی زمان پایان کارگاه (Forecast Completion Date) و سناریوهای جبرانی
اسلاید ۱۰: تصمیمات اضطراری که تصویب آن‌ها در این جلسه از هیئت‌مدیره الزامی است.`,
    copyablePromptEn: `Based on all uploaded project documents:
Generate a professional 10-slide presentation deck outline for the Board of Directors.
Each slide must include: Title, Core Takeaway, 3 Documented Bullet Points with exact citations, Hero Metric, and Mitigation Action.`,
    outputPreviewHighlightsFa: [
      'اسلایدهای ساختاریافته بدون متن‌های اضافه، آماده کپی در قالب‌های آماده شرکتی',
      'تفکیک ارقام مالی و درصدهای پیشرفت فیزیکی از روی منابع واقعی',
      'اسلاید پایانی اختصاصی برای اخذ مصوبات مالی و حقوقی از اعضای هیئت‌مدیره'
    ],
    outputPreviewHighlightsEn: [
      'Ready-to-use slide outline for corporate templates',
      'Strict factual metrics pulled directly from uploaded project data',
      'Dedicated decision-making slide for Board approvals'
    ]
  },
  {
    id: 'infographic_blueprint_workflow',
    titleFa: 'استخراج داده‌های کلیدی و سناریوی اینفوگرافیک کارگاهی (Infographic Design Blueprint)',
    titleEn: 'Data Extraction for Engineering & HSE Site Infographics & Posters',
    categoryFa: 'اینفوگرافیک و اطلاع‌رسانی تصویری',
    categoryEn: 'Infographics & Visual Posters',
    descriptionFa: 'استخراج فکت‌های آماری، نمودارهای مقایسه‌ای و فلوچارت‌های فرآیندی جهت طراحی اینفوگرافیک‌های دیواری کارگاه یا داشبوردهای تصویری در نرم‌افزارهای گرافیکی.',
    descriptionEn: 'Extracting key metrics, comparison charts, and safety flows for site posters and executive infographics.',
    stepByStepGuideFa: [
      '۱. اسناد دستورالعمل ایمنی، مشخصات فنی یا عملکرد ۶ ماهه کارگاه را به منابع نوت‌بوک اضافه کنید.',
      '۲. پرامپت استخراج بلوک‌های اینفوگرافیک را ارسال کنید.',
      '۳. نوت‌بوک ال‌ام محتوا را در قالب ۵ بلوک بصری مجزا (شامل آیکون پیشنهادی، تیتر دوکلمه‌ای، عدد آماری بزرگ، و پیام توصیفی) تولید می‌کند.',
      '۴. خروجی را به عنوان بریف محتوایی به طراح گرافیک بدهید یا در ابزارهایی مانند Canva به پوستر حرفه‌ای تبدیل کنید.'
    ],
    stepByStepGuideEn: [
      '1. Add safety standards or monthly progress reports to your Notebook.',
      '2. Send the Infographic Blueprint Prompt.',
      '3. NotebookLM structures the data into 5 visual infographic cards with suggested icons, hero stats, and captions.',
      '4. Hand the brief to your graphic designer or build it in Canva.'
    ],
    copyablePromptFa: `از تمامی اسناد بارگذاری‌شده در این نوت‌بوک، یک بریف محتوایی کامل برای طراحی یک "پوستر اینفوگرافیک مدیریتی یک‌صفحه‌ای" استخراج کن.

ساختار خروجی را در ۵ بلوک بصری منظم تنظیم کن:
بلوک ۱ (Hero Header): تیتر اصلی اینفوگرافیک، تاریخ دوره، و زیرعنوان در یک خط.
بلوک ۲ (Key Numbers Grid): ۴ آمار شگفت‌انگیز عددی پروژه (مثلاً متراژ حفاری‌شده TBM، دایا-اینچ جوشکاری، نفر-ساعت کار بدون حادثه، درصد پیشرفت فیزیکی).
بلوک ۳ (Process Flow): دیاگرام جریان کار ۵ مرحله‌ای از عملیات اصلی همراه با آیکون پیشنهادی برای هر مرحله.
بلوک ۴ (Risk & Warning Callout): کادر هشدار قرمز/نارنجی شامل ۳ ریسک و معارض اولویت‌دار که تیم کارگاه باید بشناسد.
بلوک ۵ (Footer Factoid): نتیجه‌گیری الهام‌بخش برای ارتقای انگیزه تیم اجرایی کارگاه.`,
    copyablePromptEn: `Extract an Infographic Design Brief in 5 structured visual blocks: Hero Header, 4 Key Numbers Grid, 5-Step Process Flow, Risk Callout Box, and Footer Takeaway.`,
    outputPreviewHighlightsFa: [
      'دسته‌بندی منظم داده‌ها برای طراحی گرافیکی بدون سردرگمی',
      'ایده‌آل برای نصب روی بردهای اطلاع‌رسانی کارگاه، پورتال داخلی شرکت و اتاق مدیریت پروژه',
      'انتقال شفاف پیام‌های پیچیده مهندسی در یک نگاه'
    ],
    outputPreviewHighlightsEn: [
      'Structured briefing ready for graphic design tools',
      'Ideal for site noticeboards and project dashboards',
      'Communicates complex engineering data at a glance'
    ]
  },
  {
    id: 'audio_overview_deep_dive',
    titleFa: 'تولید و سفارشی‌سازی پادکست صوتی عمیق (Audio Overview Deep Dive Guide)',
    titleEn: 'Generating & Customizing 2-Host Audio Overview Podcasts',
    categoryFa: 'پادکست و خلاصه‌سازی صوتی',
    categoryEn: 'Audio Summarization',
    descriptionFa: 'چگونه از قابلیت جادویی گفت‌وگوی صوتی دونفره هوش مصنوعی برای تبدیل زونکن‌های خسته‌کننده به یک خلاصه صوتی شنیدنی و کاربردی استفاده کنیم.',
    descriptionEn: 'How to generate and customize lifelike 2-host conversational podcasts from dry engineering manuals.',
    stepByStepGuideFa: [
      '۱. فایل‌های مدنظر (مثلاً متن کامل قرارداد و آخرین لایحه تاخیرات) را در NotebookLM بارگذاری کنید.',
      '۲. در پنل راست نوت‌بوک (Studio)، به بخش "Audio Overview" بروید.',
      '۳. روی دکمه Customize کلیک کنید تا زاویه صحبت مجریان را تعیین کنید (مثلاً: «تمرکز ویژه بر دلایل تاخیرات کارفرما و چالش‌های ژئوتکنیکی TBM داشته باشید»).',
      '۴. دکمه Generate را بزنید؛ پس از ۲ تا ۴ دقیقه، پادکست کامل تولید می‌شود و می‌توانید آن را دانلود کرده و برای سایر مدیران ارسال کنید!'
    ],
    stepByStepGuideEn: [
      '1. Upload your target project documents into NotebookLM.',
      '2. Navigate to the "Audio Overview" card in the Studio panel.',
      '3. Click "Customize" and specify your focus (e.g. "Focus on critical path delays and contractor claims").',
      '4. Hit "Generate" and download the MP3 file for executive briefings on the go.'
    ],
    copyablePromptFa: `Focus the deep-dive conversation specifically on:
1. The main contractual disputes and excusable delay claims under Clause 30 of the contract.
2. The exact geotechnical risks and ground obstacles encountered by the TBM excavation team.
3. Keep the tone professional, engaging, and highlight the actionable recommendations for senior leadership.`,
    copyablePromptEn: `Focus the deep-dive conversation specifically on contractual claims under Clause 30, TBM geotechnical obstacles, and strategic leadership recommendations.`,
    outputPreviewHighlightsFa: [
      'تبدیل متن‌های سخت حقوقی به مکالمه زنده و جذاب دو کارشناس',
      'امکان گوش دادن در خودرو، حین ماموریت‌های بین کارگاهی یا ورزش',
      'اشتراک‌گذاری آسان فایل صوتی از طریق پیام‌رسان‌ها با اعضای تیم'
    ],
    outputPreviewHighlightsEn: [
      'Transforms dry contracts into engaging live discussions',
      'Listen on the go during project commute',
      'Easily shareable MP3 files with project stakeholders'
    ]
  },
  {
    id: 'hr_overtime_compliance_blueprint',
    titleFa: 'ممیزی تطبیقی منابع انسانی، سقف اضافه‌کاری و تعهدات رفاهی کارگاه (HR & Contract Compliance Blueprint)',
    titleEn: 'HR Overtime Audit, Camp Welfare & Contractual Compliance Blueprint (Metro Line X)',
    categoryFa: 'منابع انسانی و کنترل کارگاهی',
    categoryEn: 'HR & Site Administration',
    descriptionFa: 'چگونه کارشناسان منابع انسانی و امور اداری در NotebookLM بین «الزامات بیرونی پیمان (قرارداد مترو خط ایکس)» و «ضوابط کنترلی داخلی (بخشنامه اضافه‌کاری و گزارش کارت‌زن سازمان پیمانکار)» تقاطع‌گیری کرده و گزارش ممیزی، جدول متراژ فضاهای رفاهی و مکاتبات اخطار کارگاهی تولید کنند.',
    descriptionEn: 'Cross-analyze external EPC contract clauses (Metro Line X) against internal HR overtime directives to generate compliance matrices, welfare space audits, and formal warning letters.',
    stepByStepGuideFa: [
      '۱. دو منبع متنی شامل «منبع ۱: گزیده مواد منابع انسانی قرارداد مترو خط ایکس» و «منبع ۲: بخشنامه داخلی کنترل اضافه‌کاری و کارکرد ماهانه سازمان پیمانکار» را از طریق Paste Text یا فایل نمونه در NotebookLM بارگذاری کنید.',
      '۲. پرامپت تقاطع‌گیری و ممیزی منابع انسانی (پایین) را در چت NotebookLM ارسال کنید تا هر ۴ واحد (ایستگاه مرکزی S-01، ایستگاه غربی S-02، واحد TBM و ستاد) بررسی شوند.',
      '۳. جدول متراژ فضاهای رفاهی و اداری (صفحه ۵۴ قرارداد) و تعهدات تغذیه و نیروهای خدماتی (ماده ۲۰-ح) را به تفکیک عوامل پیمانکار و کارفرما/مشاور استخراج نمایید.',
      '۴. پیش‌نویس نامه رسمی اخطار درون‌سازمانی به سرپرست کارگاه متخلف (S-01) و کوییز ۴ گزینه‌ای ارزیابی کارشناسان منابع انسانی را مستقیماً از NotebookLM تحویل بگیرید.'
    ],
    stepByStepGuideEn: [
      '1. Load both sources (Source 1: Metro Line X HR Contract Clauses & Source 2: Internal Contractor Overtime Directive & Monthly Logs) into NotebookLM via Paste Text or file upload.',
      '2. Run the HR Cross-Compliance Audit Prompt below to evaluate Station S-01, Station S-02, TBM Unit, and HQ.',
      '3. Extract the mandatory camp space square-meter matrix (Contract Page 54) and catering/janitorial obligations (Article 20-H).',
      '4. Generate the formal internal warning memo to the S-01 Site Superintendent and a 5-question multiple-choice quiz.'
    ],
    copyablePromptFa: `با تقاطع‌گیری دقیق بین «منبع شماره ۱ (گزیده الزامات منابع انسانی قرارداد مترو خط ایکس)» و «منبع شماره ۲ (بخشنامه داخلی HR-INST-1403/07 و کارکرد ماهانه سازمان پیمانکار)» خروجی‌های مدیریتی زیر را تولید کن:

بخش اول (داشبورد ممیزی اضافه‌کاری و شب‌کاری ۴ واحد):
یک جدول مقایسه‌ای برای ۴ واحد (۱. ایستگاه مرکزی S-01، ۲. ایستگاه غربی S-02، ۳. واحد TBM قطعه غربی، ۴. دفتر فنی و ستاد) رسم کن که شامل ستون‌های زیر باشد:
- میانگین اضافه‌کاری واقعی در برابر سقف مجاز داخلی سازمان پیمانکار
- وضعیت رعایت بند ۴۲-۱ ضمیمه شرایط خصوصی (اطلاع‌رسانی ۱ هفته قبل برای کار شبانه و ۲۴ ساعت قبل برای اضافه‌کاری روز) و ماده ۲۵ شرایط خصوصی
- وضعیت رعایت خط قرمز ایمنی و خستگی مفرط (حداکثر ۱۱۰ ساعت یا ۱۴ روز کار متوالی طبق بند ۹-۱۲)
- پیامد مالی و ادعایی برای سازمان پیمانکار

بخش دوم (اینفوگرافیک تعهدات رفاهی و جدول متراژ فضاهای صفحه ۵۴):
- تفکیک دقیق متراژ فضاهای الزامی برای پرسنل خود پیمانکار در مقابل فضاهای کارفرما، مدیر طرح و مهندس مشاور
- تعهدات تامین غذا (۳ وعده برای حداقل ۱۰ نفر) و نفرات خدماتی مقیم (کارگر آزمایشگاه و آبدارچی مجزا طبق ماده ۲۰-ح)

بخش سوم (نامه رسمی اخطار درون‌سازمانی):
یک نامه رسمی با فرمت مکاتبات اداری سازمان پیمانکار از طرف «مدیر منابع انسانی و امور اداری پروژه مترو خط ایکس» به «سرپرست کارگاه ایستگاه شماره ۱ (S-01)» بنویس و ضمن استناد به بند ۴۲-۱، ماده ۲۵ و بند ۹-۱۲ قرارداد، ۳ دستورالعمل کنترلی الزامی برای ماه آینده ابلاغ کن.`,
    copyablePromptEn: `Cross-reference Source 1 (Metro Line X Contract HR Clauses) and Source 2 (Internal Contractor Overtime Directive & Monthly Attendance Logs) to generate:
1. A 4-unit Overtime & Night-Shift Compliance Audit Table (Station S-01, Station S-02, TBM, HQ) checking internal caps, Clause 42-1 notice deadlines, Article 25 insurance rosters, and 14-day fatigue red-lines.
2. A breakdown of mandatory camp space allocations (Page 54) and catering/service staff duties (Article 20-H) for contractor vs. client/consultant teams.
3. A formal internal warning memo from the Contractor HR Manager to the S-01 Site Superintendent with corrective actions for the upcoming month.`,
    outputPreviewHighlightsFa: [
      'کشف فوری تخلف ایستگاه شماره ۱ (S-01) در عدم ارسال نامه ۱ هفته قبل شب‌کاری به مهندس مشاور (بند ۴۲-۱) و کارکرد ۱۸ روز پیاپی ۳ تکنسین',
      'تفکیک دقیق متراژ فضاهای کارگاهی (۱۵۰ مترمربع اتاق کارگری، ۳۰ مترمربع اجرایی، ۱۸ مترمربع دفتر فنی در برابر فضاهای نظارت و کارفرما)',
      'تولید نامه رسمی اداری آماده امضا با استناد هم‌زمان به بخشنامه داخلی HR-INST-1403/07 و مواد ۲۵ و ۴۲-۱ پیمان'
    ],
    outputPreviewHighlightsEn: [
      'Pinpoints Station S-01 night-shift notice violation under Clause 42-1 and 18-day consecutive work safety breach',
      'Contrasts contractor camp space requirements vs. client/consultant offices and catering duties',
      'Produces a sign-ready formal Persian administrative memo citing both internal directives and contract articles'
    ]
  }
];

// 4. HANDS-ON CLASSROOM EXERCISES
export const NOTEBOOKLM_EXERCISES: NotebookLmExercise[] = [
  {
    exerciseNumber: 1,
    id: 'ex1_contract_claim_extraction',
    titleFa: 'تمرین اول: استخراج ادعاهای تاخیرات قراردادی با رفرنس دقیق صفحه به صفحه',
    titleEn: 'Exercise 1: Contractual Delay Claim Extraction with Exact Citations',
    targetDepartmentFa: 'مدیران قرارداد، حقوقی و دفتر فنی',
    targetDepartmentEn: 'Contracts, Legal & Tech Office',
    estimatedMinutes: 15,
    difficultyFa: 'متوسط',
    difficultyEn: 'Intermediate',
    requiredSourceFa: 'فایل قرارداد نمونه مترو یا خط لوله نفت موجود در بخش ۶ همین برنامه (فرمت MD)',
    requiredSourceEn: 'Specimen Metro or Oil/Gas EPC Contract from Section 6 of this app (MD format)',
    sourceDownloadNoteFa: 'فایل قرارداد را از بخش ۶ صفحه صفر دانلود کنید یا با دکمه کپی ذخیره کرده و در NotebookLM بارگذاری نمایید.',
    sourceDownloadNoteEn: 'Download the specimen contract MD file from Section 6 and upload it to NotebookLM.',
    objectiveFa: 'تست توانایی NotebookLM در استخراج دقیق حقوق پیمانکار بدون حتی یک کلمه توهم و ارجاع به شماره ماده و بند.',
    objectiveEn: 'Verify NotebookLM zero-hallucination citation capabilities against engineering contract terms.',
    instructionsFa: [
      'وارد سایت notebooklm.google.com شوید و یک Notebook جدید به نام "کلاس قرارداد و دعاوی" بسازید.',
      'فایل قرارداد مهندسی نمونه مترو (metro_epc_contract_specimen.md) را از بخش ۶ دانلود کرده و به عنوان منبع آپلود کنید.',
      'پرامپت تمرین ۱ (پایین) را کپی کرده و در چت نوت‌بوک ارسال کنید.',
      'روی شماره‌های رفرنس داخل متن کلیک کنید تا باز شدن سند و هایلایت بند مربوطه را با چشم خود ببینید.'
    ],
    instructionsEn: [
      'Open notebooklm.google.com and create a new notebook named "Contract Workshop".',
      'Download and upload the metro EPC contract specimen MD file as a source.',
      'Paste Exercise 1 prompt and send.',
      'Click the inline citation chips to view direct paragraph highlights in the source viewer.'
    ],
    promptToCopyFa: `با استناد به متن قرارداد بارگذاری‌شده:
۱. فرجه زمانی الزامی برای ارسال اخطار کتبی تاخیرات توسط پیمانکار چند روز است و عدم ارسال در این مهلت چه پیامدی دارد؟
۲. در صورت بروز معارض تاسیساتی شهری در شفت ایستگاه، آیا پیمانکار مستحق تمدید مدت پیمان و هزینه آماده‌به‌کاری است؟
۳. سقف جریمه خسارت تاخیرات غیرمجاز چقدر تعیین شده است؟
(پاسخ را با استناد دقیق به شماره ماده و بند قرارداد بده).`,
    promptToCopyEn: `Based on the uploaded contract:
1. What is the mandatory time-bar window for delay notices and what is the penalty for late notices?
2. Is the contractor entitled to time extension and idling costs for unforeseen underground utility clashes?
3. What is the maximum liquidated damages cap?
(Cite exact article numbers).`,
    successVerificationFa: [
      'مشاهده استخراج صحیح ماده ۳۰ و مهلت ۲۱ روزه اخطار کتبی',
      'ارجاع درست به شرط پرداخت هزینه‌های آماده‌به‌کاری معارضین',
      'استناد بدون توهم به سقف جریمه تاخیرات (حداکثر ۵ تا ۱۰ درصد مبلغ پیمان)'
    ],
    successVerificationEn: [
      'Accurate identification of Clause 30 and 21-day notice rule',
      'Correct verification of utility idling compensation terms',
      'Accurate citation of liquidated damages cap without hallucination'
    ]
  },
  {
    exerciseNumber: 2,
    id: 'ex2_audio_podcast_creation',
    titleFa: 'تمرین دوم: ساخت پادکست صوتی دونفره مدیریتی (Audio Overview) از مشخصات پروژه',
    titleEn: 'Exercise 2: Generate an Executive 2-Host Audio Overview Podcast',
    targetDepartmentFa: 'مدیران ارشد، سرپرستان کارگاه و مدیران پروژه',
    targetDepartmentEn: 'Project Directors & Site Managers',
    estimatedMinutes: 10,
    difficultyFa: 'آسان و هیجان‌انگیز',
    difficultyEn: 'Easy & Engaging',
    requiredSourceFa: 'فایل قرارداد نمونه نفت و گاز (oil_gas_pipeline_epc_contract.md) یا متن گزارش کارگاه',
    requiredSourceEn: 'Oil & Gas EPC Contract or project progress report',
    sourceDownloadNoteFa: 'فایل قرارداد نفت و گاز فیدیک را از بخش ۶ دانلود و آپلود کنید.',
    sourceDownloadNoteEn: 'Download the Oil & Gas FIDIC contract from Section 6 and upload to NotebookLM.',
    objectiveFa: 'تولید یک خلاصه صوتی هوشمند ۱۰ دقیقه‌ای با دو مجری هوش مصنوعی و گوش دادن به مباحثه آن‌ها درباره ریسک‌های پروژه.',
    objectiveEn: 'Experience the AI Audio Overview podcast summarizing technical risks in conversational English.',
    instructionsFa: [
      'در همان نوت‌بوک یا نوت‌بوک جدید، منبع قرارداد نفت و گاز را اضافه کنید.',
      'در ستون سمت راست (Studio)، روی کارت "Audio Overview" کلیک کنید.',
      'گزینه Customize را انتخاب کرده و دستورالعمل جهت‌دهی پادکست (پایین) را در آن قرار دهید.',
      'دکمه Generate را بزنید و منتظر آماده شدن پادکست بمانید، سپس آن را پخش کرده و به تحلیل دو مجری گوش دهید.'
    ],
    instructionsEn: [
      'In NotebookLM, ensure the Oil & Gas contract is selected as source.',
      'Click the Audio Overview card in the Studio panel.',
      'Click Customize and paste the custom instruction below.',
      'Hit Generate, wait for the audio generation, and play the conversation.'
    ],
    promptToCopyFa: `Please focus the conversation on:
- The strict 28-day time-bar rule under FIDIC Sub-Clause 20.1 and why contractors lose claims.
- The pipeline welding quality criteria (API 1104) and hydrotest safety requirements.
- Make the dialogue lively, insightful, and practical for an EPC project director.`,
    promptToCopyEn: `Please focus the conversation on FIDIC Sub-Clause 20.1 time-bar consequences, API 1104 pipeline welding standards, and hydrotest procedures.`,
    successVerificationFa: [
      'تولید فایل صوتی با کیفیت بالا با دو صدای زن و مرد طبیعی',
      'بحث صوتی درباره سقوط حق ادعا در روز ۲۸ام و حساسیت‌های تست هیدرواستاتیک',
      'امکان دانلود فایل MP3 برای ذخیره در گوشی تلفن همراه'
    ],
    successVerificationEn: [
      'High quality natural conversational audio between two hosts',
      'Discussion covering Clause 20.1 time-bar and hydrotest risks',
      'Downloadable MP3 file ready for mobile playback'
    ]
  },
  {
    exerciseNumber: 3,
    id: 'ex3_executive_presentation_deck',
    titleFa: 'تمرین سوم: تولید ساختار اسلایدهای پرزنتیشن گزارش هیئت‌مدیره از داده‌های پروژه',
    titleEn: 'Exercise 3: Generate Board of Directors Presentation Slide Outline',
    targetDepartmentFa: 'مدیران برنامه‌ریزی، کنترل پروژه و PMO',
    targetDepartmentEn: 'Planning, PMO & Project Controls',
    estimatedMinutes: 15,
    difficultyFa: 'متوسط',
    difficultyEn: 'Intermediate',
    requiredSourceFa: 'فایل داده‌های CSV حفاری مترو یا خط لوله نفت موجود در بخش ۵ همین برنامه',
    requiredSourceEn: 'Metro TBM or Pipeline CSV dataset from Section 5 of this app',
    sourceDownloadNoteFa: 'فایل CSV مترو را از بخش ۵ دانلود کرده یا متن آن را در یک فایل متنی ذخیره کرده و در NotebookLM آپلود کنید.',
    sourceDownloadNoteEn: 'Download the Metro CSV data from Section 5 and upload it to NotebookLM.',
    objectiveFa: 'تبدیل شیت داده‌های خام و انحرافات زمانی/ریالی به یک ارائه اسلایدی ۱۰ صفحه‌ای استاندارد برای مدیران ارشد.',
    objectiveEn: 'Transform raw engineering CSV progress data into a 10-slide executive board presentation deck.',
    instructionsFa: [
      'فایل دیتای CSV مترو یا پایپینگ را به نوت‌بوک خود اضافه کنید.',
      'پرامپت استخراج پرزنتیشن را در چت ارسال کنید.',
      'بررسی کنید چگونه نوت‌بوک ال‌ام اعداد واقعی ستون‌های PV, EV, AC و شاخص‌های SPI/CPI را در قالب اسلایدهای تصمیم‌گیری استخراج می‌کند.',
      'خروجی را در یک فایل ارائه کپی کنید.'
    ],
    instructionsEn: [
      'Upload the Metro CSV or Pipeline CSV dataset to your notebook.',
      'Paste Exercise 3 prompt into the chat.',
      'Observe how NotebookLM synthesizes EVM metrics (SPI, CPI, variances) into presentation slides.',
      'Copy the output structure into your presentation editor.'
    ],
    promptToCopyFa: `از داده‌های عددی و پیشرفت فیزیکی بارگذاری‌شده در این منبع:
یک ساختار اسلایدی ۸ صفحه‌ای برای جلسه پیشرفت کارگاه با کارفرما آماده کن.
هر اسلاید باید شامل:
- عنوان اسلاید
- مهم‌ترین شاخص عددی (Hero Number)
- ۳ نکته کلیدی تحلیلی همراه با رفرنس عدد
- تصمیم و مصوبه مورد نیاز از کارفرما
(اسلایدها باید به طور خاص به شاخص‌های EVM و انحرافات حفاری سگمنتی اشاره داشته باشند).`,
    promptToCopyEn: `Generate an 8-slide presentation outline for client progress review. Each slide must include a title, hero metric, 3 analytical bullets, and required client decision.`,
    successVerificationFa: [
      'استخراج دقیق مقادیر شاخص SPI و CPI از روی فایل داده‌ها',
      'تفکیک فعالیت‌های بحرانی تاخیردار در اسلایدهای مجزا',
      'ارائه پیشنهادات اقدام جبرانی برای هر اسلاید'
    ],
    successVerificationEn: [
      'Accurate synthesis of SPI/CPI values from the raw CSV data',
      'Clear breakdown of delayed critical path activities',
      'Concrete recovery proposals for each slide'
    ]
  },
  {
    exerciseNumber: 4,
    id: 'ex4_hse_qaqc_infographic',
    titleFa: 'تمرین چهارم: استخراج ماتریس اینفوگرافیک واکنش سریع و چک‌لیست ایمنی کارگاه',
    titleEn: 'Exercise 4: Site HSE & QA/QC Infographic Blueprint & Fast-Response Matrix',
    targetDepartmentFa: 'مدیران HSE، کنترل کیفیت و سرپرستان کارگاه',
    targetDepartmentEn: 'HSE, QA/QC & Site Superintendents',
    estimatedMinutes: 10,
    difficultyFa: 'آسان',
    difficultyEn: 'Easy',
    requiredSourceFa: 'متن نظام‌نامه ایمنی، مشخصات فنی یا قرارداد موجود در برنامه',
    requiredSourceEn: 'Safety manual or technical specs from the workbook',
    sourceDownloadNoteFa: 'می‌توانید از همان قرارداد مترو یا مشخصات فنی به عنوان منبع استفاده کنید.',
    sourceDownloadNoteEn: 'You can use the Metro specification or contract as source.',
    objectiveFa: 'تولید کارت‌های بصری اینفوگرافیک برای انتقال سریع پیام‌های ایمنی و کیفی به نیروهای عملیاتی کارگاه.',
    objectiveEn: 'Generate visual infographic cards to communicate safety and quality rules to field crews.',
    instructionsFa: [
      'در نوت‌بوک خود، پرامپت استخراج اینفوگرافیک (پایین) را ارسال کنید.',
      'خروجی ۵ بلوکه را دریافت کرده و تطابق فکت‌های عددی با متن منبع را بررسی نمایید.',
      'متن حاصله را به عنوان بریف طراحی پوستر کارگاهی در نظر بگیرید.'
    ],
    instructionsEn: [
      'Send the Exercise 4 Infographic prompt in NotebookLM.',
      'Review the 5-block visual layout and verify data facts against the source.',
      'Use the output as an actionable brief for site poster creation.'
    ],
    promptToCopyFa: `بر اساس اسناد فنی و ایمنی بارگذاری‌شده:
یک طرح محتوایی برای یک پوستر اینفوگرافیک کارگاهی تحت عنوان "دستورالعمل حیاتی پایداری گود و ایمنی در شفت TBM" تهیه کن.
خروجی باید در قالب ۴ بلوک مشخص باشد:
بلوک ۱: ۳ خطر مرگبار اصلی در شفت بر اساس استانداردها با نشانگر ⚠️
بلوک ۲: جدول ۵ مرحله‌ای اقدامات پیشگیرانه روزانه
بلوک ۳: ۳ رقم و تلرانس حیاتی که باید روی گیج‌ها پایش شوند
بلوک ۴: شماره تلفن‌ها و پروتکل اعلام وضعیت اضطراری`,
    promptToCopyEn: `Generate a 4-block infographic poster content brief titled "Critical Shaft Excavation & TBM Safety Rules" covering main hazards, daily checklist, gauge limits, and emergency protocol.`,
    successVerificationFa: [
      'تدوین بلوک‌های بصری شفاف و قابل فهم برای نیروهای اجرایی',
      'ذکر هشدارهای ایمنی متناسب با فضای زیرزمینی و کار در ارتفاع',
      'ارائه پروتکل شفاف واکنش سریع در شرایط اضطراری'
    ],
    successVerificationEn: [
      'Clear, visual block layout for field technicians',
      'Underground safety hazards properly emphasized',
      'Actionable rapid response protocol'
    ]
  },
  {
    exerciseNumber: 5,
    id: 'ex5_hr_metro_line10_compliance',
    titleFa: 'تمرین پنجم (ویژه منابع انسانی): تقاطع‌گیری قرارداد مترو خط ایکس و بخشنامه داخلی اضافه‌کاری سازمان پیمانکار',
    titleEn: 'Exercise 5 (HR & Admin Masterclass): Metro Line X Contract vs. Internal Contractor Overtime Audit',
    targetDepartmentFa: 'منابع انسانی، امور اداری، رفاهی و پشتیبانی کارگاه',
    targetDepartmentEn: 'Human Resources, Admin & Site Welfare',
    estimatedMinutes: 20,
    difficultyFa: 'جامع و کاربردی (۴ سناریو)',
    difficultyEn: 'Comprehensive (4 Scenarios)',
    requiredSourceFa: 'منبع ۱ (گزیده مواد منابع انسانی قرارداد مترو خط ایکس) + منبع ۲ (بخشنامه داخلی کنترل اضافه‌کاری و کارکرد ماهانه سازمان پیمانکار)',
    requiredSourceEn: 'Source 1 (Metro Line X HR Contract Clauses) + Source 2 (Internal Contractor Overtime Directive & Monthly Attendance Logs)',
    sourceDownloadNoteFa: 'کارشناسان واحد منابع انسانی می‌توانند هر دو منبع را از کارت زیر دانلود یا کپی کرده و از طریق گزینه Paste Text به عنوان دو منبع مجزا در NotebookLM وارد کنند.',
    sourceDownloadNoteEn: 'HR specialists can copy or download both sources below and load them via Paste Text into NotebookLM.',
    objectiveFa: 'کسب مهارت تحلیل تطبیقی بین «الزامات بیرونی پیمان (کارفرما/مشاور)» و «ضوابط کنترلی داخلی (سازمان پیمانکار)»، کشف انحرافات اضافه‌کاری و شب‌کاری، استخراج تعهدات رفاهی و نگارش مکاتبات کنترلی.',
    objectiveEn: 'Master cross-compliance analysis between external EPC contract terms and internal HR controls, audit site overtime logs, extract welfare obligations, and draft formal corrective memos.',
    instructionsFa: [
      'وارد سایت notebooklm.google.com شوید و یک نوت‌بوک جدید به نام «ممیزی منابع انسانی - پروژه مترو خط ایکس» بسازید.',
      'منبع شماره ۱ (گزیده مواد منابع انسانی قرارداد مترو خط ایکس) و منبع شماره ۲ (بخشنامه داخلی کنترل اضافه‌کاری و کارکرد ماهانه سازمان پیمانکار) را از بخش منابع همین صفحه کپی کرده و با گزینه Paste Text در NotebookLM بارگذاری کنید.',
      'هر یک از ۴ سناریوی تمرینی زیر (۱. ممیزی اضافه‌کاری، ۲. بررسی تعهدات رفاهی و متراژ فضاها، ۳. صدور اخطار رسمی درون‌سازمانی به سرپرست کارگاه S-01، و ۴. طراحی کوییز ۴ گزینه‌ای) را انتخاب و پرامپت آن را در چت NotebookLM اجرا نمایید.',
      'پاسخ‌های تولیدشده توسط NotebookLM را با «کلید ارزیابی و نمونه نامه استاندارد» در هر تمرین مقایسه و صحت‌سنجی کنید.'
    ],
    instructionsEn: [
      'Open notebooklm.google.com and create a new notebook titled "HR Compliance - Metro Line X".',
      'Copy Source 1 (Metro Line X HR Contract Extract) and Source 2 (Internal Contractor Overtime Directive & Monthly Logs) from the source cards below and add them via Paste Text.',
      'Run the 4 practice scenarios below (1. Overtime Audit, 2. Welfare & Space Allocation, 3. Formal Warning Letter to S-01 Superintendent, 4. 4-Option Quiz Generation).',
      'Verify NotebookLM outputs against the provided Evaluation Keys and Standard Internal Letter template.'
    ],
    promptToCopyFa: `با تقاطع‌گیری بین "منبع ۱ (قرارداد مترو خط ایکس)" و "منبع ۲ (بخشنامه داخلی و کارکرد ماهانه سازمان پیمانکار)"، یک جدول تحلیلی از وضعیت اضافه‌کاری ۴ واحد پروژه در مهرماه تهیه کن. مشخص کن در هر واحد:
۱. آیا سقف مجاز داخلی رعایت شده است؟
۲. آیا الزامات قراردادی (ماده ۲۵ شرایط خصوصی و بند ۴۲-۱ ضمیمه شرایط خصوصی) رعایت شده است؟
۳. چه ریسک‌های مالی یا ایمنی (HSE) برای سازمان پیمانکار ایجاد شده است؟`,
    promptToCopyEn: `By cross-referencing "Source 1 (Metro Line X Contract)" and "Source 2 (Internal Contractor Directive & Monthly Attendance Logs)", prepare an analytical table of the overtime status of the 4 project units in October. Specify for each unit:
1. Was the internal overtime cap respected?
2. Were contractual requirements (Article 25 Particular Conditions and Clause 42-1 Annex) met?
3. What financial or safety (HSE) risks were created for the Contractor Organization?`,
    successVerificationFa: [
      'کشف نقض سه‌گانه در ایستگاه مرکزی (S-01): ۱۰۵ ساعت اضافه‌کاری (سقف ۸۵)، ۱۸ روز کار متوالی ۳ تکنسین (سقف ۱۴ روز)، و عدم اطلاع‌رسانی ۱ هفته قبل شب‌کاری به مهندس مشاور (بند ۴۲-۱)',
      'تشخیص انحراف سقف داخلی در دفتر فنی/متره (۹۲ ساعت بدون مجوز) و اداری/تدارکات ستاد (۶۸ ساعت در برابر سقف ۵۰ ساعت) و تایید انطباق کامل ایستگاه غربی (S-02) و TBM',
      'استخراج دقیق متراژ فضاهای صفحه ۵۴ قرارداد، تعهدات ماده ۲۰-ح و نگارش نامه رسمی اخطار به سرپرست کارگاه S-01'
    ],
    successVerificationEn: [
      'Identifies triple violation at Central Station (S-01): 105h overtime vs 85h cap, 18 consecutive workdays vs 14-day safety limit, and missed 7-day night-work notice to Consultant (Clause 42-1)',
      'Detects internal cap overruns in Technical Office (92h) and HQ Admin (68h vs 50h) while confirming full compliance at West Station (S-02) and TBM',
      'Extracts Page 54 camp space allocations, Article 20-H catering rules, and drafts a formal internal warning memo to S-01 Superintendent'
    ],
    subScenarios: [
      {
        id: 'hr_scen_1_overtime_audit',
        number: 1,
        titleFa: 'تمرین ۱: ممیزی اضافه‌کاری داخلی و کشف انحرافات (پرامپت تحلیلی)',
        titleEn: 'Practice 1: Internal Overtime Audit & Deviation Discovery (Analytical Prompt)',
        promptFa: `با تقاطع‌گیری بین "منبع ۱ (قرارداد مترو خط ایکس)" و "منبع ۲ (بخشنامه داخلی و کارکرد ماهانه سازمان پیمانکار)"، یک جدول تحلیلی از وضعیت اضافه‌کاری ۴ واحد پروژه در مهرماه تهیه کن. مشخص کن در هر واحد:
۱. آیا سقف مجاز داخلی رعایت شده است؟
۲. آیا الزامات قراردادی (ماده ۲۵ شرایط خصوصی و بند ۴۲-۱ ضمیمه شرایط خصوصی) رعایت شده است؟
۳. چه ریسک‌های مالی یا ایمنی (HSE) برای سازمان پیمانکار ایجاد شده است؟`,
        promptEn: `By cross-referencing "Source 1 (Metro Line X Contract)" and "Source 2 (Internal Contractor Directive & Monthly Attendance Logs)", prepare an analytical table of the overtime status of the 4 project units in October. Specify for each unit:
1. Was the internal overtime cap respected?
2. Were contractual requirements (Article 25 Particular Conditions and Clause 42-1 Annex) met?
3. What financial or safety (HSE) risks were created for the Contractor Organization?`,
        expectedKeyFa: [
          'ایستگاه مرکزی (S-01): نقض سقف داخلی (۱۰۵ ساعت در برابر سقف ۸۵ ساعت) + نقض خط قرمز ایمنی (۱۸ روز کار متوالی ۳ تکنسین در برابر سقف ۱۴ روز) + نقض بند ۴۲-۱ ضمیمه شرایط خصوصی (عدم اطلاع‌رسانی ۱ هفته قبل به مهندس مشاور الف برای کار شبانه). پیامد: رد شدن کارکرد شبانه توسط مشاور و عدم امکان دریافت اضافه‌هزینه کار در شب طبق ماده ۲۵ شرایط خصوصی.',
          'دفتر فنی و ستاد: انحراف از سقف داخلی در بخش متره (۹۲ ساعت در برابر سقف ۶۵/۸۰ ساعت بدون مجوز) و بخش اداری/تدارکات (۶۸ ساعت در برابر ۵۰ ساعت).',
          'ایستگاه غربی (S-02) و واحد TBM: انطباق کامل با سقف داخلی و ضوابط بند ۴۲-۱ و ماده ۲۵ قرارداد.'
        ],
        expectedKeyEn: [
          'Central Station (S-01): Breached internal cap (105h vs 85h) + Breached HSE fatigue red-line (18 consecutive days for 3 shoring technicians vs 14-day limit) + Breached Clause 42-1 (notified Consultant A 2 days after night concrete pour instead of 1 week prior). Consequence: Rejection of night hours and loss of Article 25 reimbursement.',
          'Technical Office & HQ: Breached internal caps in Quantity Surveying (92h vs 65/80h without approval) and HQ Admin/Procurement (68h vs 50h cap).',
          'West Station (S-02) & TBM Unit: Full compliance with internal caps, Clause 42-1 advance notice, and Article 25 continuous 24/7 tunneling rules.'
        ]
      },
      {
        id: 'hr_scen_2_welfare_spaces',
        number: 2,
        titleFa: 'تمرین ۲: بررسی تعهدات رفاهی و پشتیبانی پرسنل سازمان در مقابل عوامل کارفرما',
        titleEn: 'Practice 2: Contractor Staff Welfare & Camp Spaces vs. Client/Consultant Personnel',
        promptFa: `بر اساس منبع ۱ (ماده ۲۰-ح شرایط خصوصی و جدول متراژ فضاهای صفحه ۵۴)، واحد منابع انسانی و پشتیبانی کارگاه برای استقرار پرسنل خود سازمان پیمانکار در مقایسه با عوامل کارفرما و نظارت، چه فضاهایی با چه متراژی باید تأمین کند؟ همچنین چه تعداد نیروی انسانی خدماتی باید به هزینه پیمانکار در اختیار مشاور، مدیر طرح و آزمایشگاه قرار گیرد؟`,
        promptEn: `Based on Source 1 (Article 20-H Particular Conditions and the space allocation table on Page 54), what spaces and square meters must HR & Site Support provide for the Contractor's own personnel compared to Client and Supervision teams? Also, how many service staff and meals must be provided at the Contractor's expense?`,
        expectedKeyFa: [
          'فضاهای پرسنل خود سازمان پیمانکار: سرپرست کارگاه (۱۲ مترمربع)، دفتر فنی (۱۸ مترمربع)، پرسنل اجرایی (۳۰ مترمربع)، نقشه‌برداری (۹ مترمربع)، پرسنل اداری و خدماتی (۲۰ مترمربع)، واحد HSE و کمک‌های اولیه (۱۲ مترمربع)، اتاق‌های کارگری (۱۵۰ مترمربع)، سرویس بهداشتی کارگری (۸ مترمربع)، حمام شبانه‌روزی (۳ باب - ۶ مترمربع).',
          'فضاهای کارفرما و نظارت: نماینده کارفرما (۹ مترمربع)، سرپرست نظارت (۹ مترمربع)، نظارت (۱۳ مترمربع)، اتاق جلسات (۱۸ مترمربع)، آزمایشگاه (۹ مترمربع).',
          'تأمین نیروی خدماتی و تغذیه: ۱ نفر کارگر تمام‌وقت برای آزمایشگاه + ۱ نفر آبدارچی مجزا و تمام‌وقت برای عوامل کارفرما، مدیر طرح و مشاور + تأمین غذای سه‌وعده برای حداقل ۱۰ نفر از عوامل کارفرما و مشاورین مقیم در هر بخش.'
        ],
        expectedKeyEn: [
          'Contractor Staff Spaces: Site Superintendent (12 m²), Technical Office (18 m²), Execution Staff (30 m²), Surveying (9 m²), Admin & Services (20 m²), HSE & First Aid (12 m²), Workers Dormitories (150 m²), Workers Restrooms (8 m²), 24/7 Hot Showers (3 units - 6 m²).',
          'Client & Supervision Spaces: Client Representative (9 m²), Chief Supervisor (9 m²), Supervision Office (13 m²), Meeting Room (18 m²), Laboratory (9 m²).',
          'Service Staff & Catering: 1 full-time laboratory worker + 1 dedicated full-time janitor/tea-server for Client/Project Manager/Consultant + 3 daily meals across shifts for at least 10 resident Client/Consultant personnel per section.'
        ]
      },
      {
        id: 'hr_scen_3_warning_letter',
        number: 3,
        titleFa: 'تمرین ۳: صدور اخطار و دستورالعمل داخلی به سرپرست کارگاه (مکاتبه درون‌سازمانی)',
        titleEn: 'Practice 3: Issuing Formal Internal Warning & Corrective Directive to Site Superintendent',
        promptFa: `بر اساس انحرافات کشف‌شده در ایستگاه مرکزی (S-01) در منبع ۲ و الزامات بند ۴۲-۱ ضمیمه شرایط خصوصی و ماده ۲۵ شرایط خصوصی در منبع ۱، یک نامه رسمی درون‌سازمانی از طرف "مدیر منابع انسانی سازمان پیمانکار" به "سرپرست کارگاه ایستگاه مرکزی (S-01)" بنویس. در این نامه ضمن اشاره به خطای رخ‌داده در عدم اطلاع‌رسانی به موقع کار شبانه به مهندسین مشاور الف و ریسک خستگی مفرط ۳ نفر تکنسین سازه نگهبان، دستورالعمل اصلاحی برای ماه آینده را ابلاغ کن.`,
        promptEn: `Based on the deviations discovered at Central Station (S-01) in Source 2 and the requirements of Clause 42-1 and Article 25 in Source 1, write a formal internal memo from the "HR Manager of the Contractor Organization" to the "Site Superintendent of Central Station (S-01)" highlighting the late night-work notice to Consultant A, the 18-day fatigue risk for 3 shoring technicians, and mandatory corrective rules for next month.`,
        expectedKeyFa: [
          'استناد دقیق به بند ۴۲-۱ ضمیمه شرایط خصوصی (الزام اطلاع‌رسانی ۱ هفته قبل برای کار شبانه و ۲۴ ساعت قبل برای اضافه‌کاری روز) و ماده ۲۵ شرایط خصوصی (لزوم تایید در گزارش روزانه و لیست بیمه تامین اجتماعی).',
          'اشاره به تجاوز از سقف داخلی (۱۰۵ ساعت در برابر ۸۵ ساعت) و نقض خط قرمز ایمنی (۱۸ روز کار متوالی ۳ تکنسین سازه نگهبان در برابر سقف ۱۴ روز موضوع بند ۹-۱۲).',
          'ابلاغ ۳ دستورالعمل اجرایی برای ماه آینده: ۱. استراحت جبرانی و مسدودسازی کارت‌زن بالای ۱۴ روز متوالی، ۲. ارسال برنامه شب‌کاری حداقل ۸ روز قبل به دفتر فنی و HR، ۳. رعایت سقف ۸۵ ساعت اضافه‌کاری.'
        ],
        expectedKeyEn: [
          'Cites Clause 42-1 (1-week advance notice for night work, 24h for day overtime) and Article 25 (daily log confirmation & SSO insurance roster requirement).',
          'Addresses the 105h overtime overrun (vs 85h cap) and the 18-day consecutive work safety violation for 3 shoring technicians (Clause 9-12).',
          'Enforces 3 corrective actions: immediate compensatory rest & time-card block at 14 days, submitting night-work plans 8 days in advance, and enforcing the 85h monthly cap.'
        ],
        sampleLetterOutputFa: `سازمان مهندسی و ساخت پیمانکار - مکاتبات داخلی
پروژه: احداث مترو خط ایکس (Line X)
شماره: CTR-MX-HR-INT-[شماره]/[سال]
تاریخ: [تاریخ شمسی]
پیوست: گزارش کارکرد ماهانه دستگاه کارت‌زن ایستگاه S-01

از: مدیریت منابع انسانی و امور اداری پروژه مترو خط ایکس
به: جناب آقای [نام سرپرست کارگاه] - سرپرست محترم کارگاه ایستگاه مرکزی (S-01)
رونوشت: مدیریت محترم پروژه / مدیریت محترم فنی و مهندسی / واحد HSE مرکزی
موضوع: اعلام انحرافات کارکرد ماهانه، الزام به رعایت سقف اضافه‌کاری و ضوابط اطلاع‌رسانی کار در شب
مرجع: بخشنامه داخلی شماره HR-INST-1403/07 و مفاد ماده ۲۵ و بند ۴۲-۱ شرایط خصوصی پیمان

با سلام و احترام؛

بر اساس بررسی‌های صورت‌گرفته بر روی داده‌های سامانه حضور و غیاب کارگاه ایستگاه مرکزی (S-01) در ماه گذشته و تطبیق آن با ضوابط داخلی سازمان و الزامات قراردادی پیمان، موارد عدم انطباق زیر در مدیریت ساعات کار پرسنل آن کارگاه احصا گردیده است:

۱. عدم رعایت مهلت قراردادی اطلاع‌رسانی کار در شب: علی‌رغم ثبت ۴۰ ساعت شب‌کاری به ازای هر نفر برای ۱۲ نفر از پرسنل اجرایی سیویل جهت عملیات بتن‌ریزی، مکاتبه رسمی با مهندسین مشاور ناظر (مشاور الف) و مدیر طرح دو روز پس از شروع عملیات ارسال شده است. مطابق نص صریح بند ۴۲-۱ ضمیمه شرایط خصوصی پیمان، پیمانکار موظف است برنامه کار شبانه را یک هفته قبل و اضافه‌کاری در ساعات روز را ۲۴ ساعت قبل به مهندس مشاور و مدیر طرح اطلاع دهد و عدم اطلاع به موقع موجب رد شدن کار انجام‌شده در ساعات مزبور خواهد شد. همچنین به استناد ماده ۲۵ شرایط خصوصی پیمان، پذیرش اضافه‌هزینه‌های نیروی انسانی در شیفت شب منوط به تایید در گزارش‌های روزانه و تطابق با لیست‌های مستند سازمان تأمین اجتماعی است که به دلیل تأخیر در اطلاع‌رسانی، این مبالغ فاقد وجاهت ادعایی در صورت‌وضعیت‌ها می‌باشد.

۲. تجاوز از سقف اضافه‌کاری داخلی و خط قرمز ایمنی (HSE): میانگین اضافه‌کاری پرسنل اجرایی آن کارگاه به ۱۰۵ ساعت رسیده که ۲۰ ساعت بالاتر از سقف مجاز داخلی (۸۵ ساعت) است. علاوه بر این، ۳ نفر از تکنسین‌های بخش سازه نگهبان به مدت ۱۸ روز متوالی بدون روز استراحت در کارگاه حضور داشته‌اند که نقض صریح ضوابط کنترل خستگی و ایمنی عملیات زیرزمینی (موضوع بند ۹-۱۲ ضمیمه شرایط خصوصی پیمان) محسوب می‌گردد.

در همین راستا، مقتضی است از ابتدای ماه جاری اقدامات کنترلی زیر به طور دقیق در آن کارگاه اجرا گردد:
- برنامه‌ریزی جهت استراحت جبرانی و چرخش شیفت فوری برای ۳ نفر تکنسین سازه نگهبان و مسدودسازی ثبت کارکرد بیش از ۱۴ روز متوالی در دستگاه کارت‌زن کارگاه.
- ارسال برنامه نیازمندی‌های کار شبانه حداقل ۸ روز پیش از شروع عملیات به دفتر فنی و واحد منابع انسانی جهت صدور به موقع نامه رسمی به مهندسین مشاور ناظر و مدیر طرح.
- کنترل سقف اضافه‌کاری پرسنل کارگاه در محدوده مصوب ۸۵ ساعت ماهانه.

بدیهی است از ابتدای ماه جاری، هرگونه ساعت اضافه‌کاری و شب‌کاری در کارگاه‌های ایستگاهی که فاقد نامه اطلاع‌رسانی قبلی به دستگاه نظارت و تایید در گزارش روزانه کارگاهی باشد، در محاسبات کارکرد ماهانه قابل تایید نخواهد بود.

[نام و نام خانوادگی]
مدیر منابع انسانی و امور اداری
پروژه احداث مترو خط ایکس`
      },
      {
        id: 'hr_scen_4_quiz_generation',
        number: 4,
        titleFa: 'تمرین ۴: طراحی کوییز ۴ گزینه‌ای توسط NotebookLM',
        titleEn: 'Practice 4: Automated 4-Option Compliance Quiz Generation by NotebookLM',
        promptFa: `بر اساس هر دو منبع بارگذاری‌شده، ۵ سوال چهارگزینه‌ای استاندارد به همراه کلید پاسخ تشریحی طراحی کن که تسلط کارشناس منابع انسانی بر "تفاوت سقف‌های داخلی سازمان پیمانکار" و "الزامات قراردادی پروژه مترو خط ایکس" را بسنجد.`,
        promptEn: `Based on both uploaded sources, design 5 standard multiple-choice questions with detailed answer keys to test an HR specialist's mastery of the difference between "Internal Contractor Caps" and "Metro Line X Contractual Requirements".`,
        expectedKeyFa: [
          'طراحی ۵ سوال چهارگزینه‌ای دقیق از اعداد و مواد هر دو سند (مثلاً مهلت ۲۰ام هر ماه برای گزارش ماهانه ماده ۱۸، مهلت ۱ هفته قبل شب‌کاری بند ۴۲-۱، سقف ۵۰/۶۵/۸۵/۱۰۰ ساعت اضافه‌کاری داخلی، و متراژ ۱۵۰ مترمربع اتاق کارگری).',
          'ارائه کلید تشریحی مستند با ذکر دقیق شماره ماده قرارداد یا شماره بند بخشنامه داخلی HR-INST-1403/07.'
        ],
        expectedKeyEn: [
          'Generates 5 rigorous multiple-choice questions testing exact numbers across both sources (Article 18 20th-of-month deadline, Clause 42-1 7-day night-work notice, 50/65/85/100h internal caps, and 150 m² worker dormitories).',
          'Provides detailed answer keys citing the exact contract clause or internal directive section.'
        ]
      }
    ]
  }
];
