export interface WorkbookPageDoc {
  pageNumber: number;
  titleEn: string;
  titleFa: string;
  sectionEn: string;
  sectionFa: string;
  imagePath: string;
  summaryEn: string;
  summaryFa: string;
  fullTextEn: string;
  keyPointsFa: string[];
  instructorNotesFa?: string;
}

export const WORKBOOK_PAGES_META: WorkbookPageDoc[] = [
  {
    pageNumber: 1,
    titleEn: 'PMI-CPMAI Sample-Filled Workbook (Cover)',
    titleFa: 'جلد کتاب کار نمونه تکمیل‌شده PMI-CPMAI',
    sectionEn: 'Cover',
    sectionFa: 'جلد',
    imagePath: '/workbook_pages/page_01.png',
    summaryEn: 'PMI Certified Professional in Managing AI (PMI-CPMAI)™ Training & Certification Sample-Filled Workbook (July 2025).',
    summaryFa: 'کتاب کار نمونه تکمیل‌شده دوره آموزشی و گواهینامه حرفه‌ای مدیریت هوش مصنوعی مؤسسه PMI (نسخه ژوئیه ۲۰۲۵).',
    fullTextEn: `PMI-CPMAI Training & Certification
PMI Training
PMI-CPMAI Sample-Filled Workbook
LAST UPDATED: July 2025
Check periodically for additional revisions`,
    keyPointsFa: [
      'کتاب کار رسمی مؤسسه مدیریت پروژه (PMI)',
      'ارائه‌دهنده متدولوژی CPMAI (Cognitive Project Management for AI)',
      'نمونه تکمیل‌شده بر اساس سناریوی کاربردی واقعی'
    ]
  },
  {
    pageNumber: 2,
    titleEn: 'Table of Contents (Part 1)',
    titleFa: 'فهرست مطالب (بخش اول)',
    sectionEn: 'Contents',
    sectionFa: 'فهرست',
    imagePath: '/workbook_pages/page_02.png',
    summaryEn: 'Table of Contents covering About PMI-CPMAI, Hierarchy, Phases, and Phase I Business Understanding.',
    summaryFa: 'فهرست عناوین شامل معرفی CPMAI، سلسله‌مراتب، فازها، و وظایف فاز اول (درک کسب‌وکار).',
    fullTextEn: `About PMI-CPMAI and This Workbook (p. 5)
About This Sample Workbook (p. 5)
How to Use This Workbook (p. 5)
CPMAI Hierarchy (p. 6)
Mapping Generic Tasks to Specialized Tasks (p. 6)
CPMAI Phases (p. 7)
Phase I: Business Understanding (p. 8)
Phase II: Data Understanding (p. 8)
Phase III: Data Preparation (p. 8)
Phase IV: Model Development (p. 8)
Phase V: Model Evaluation (p. 8)
Phase VI: Model Operationalization (p. 9)
Overview of the Phases With Generic Tasks Per Phase (p. 9)
Example Use Case: XYZ Company Customer Support Chatbot (p. 11)
CPMAI Phase I: Business Understanding (p. 19)`,
    keyPointsFa: [
      'سلسله‌مراتب چهارسطحی: فازها -> تسک‌های عمومی -> تسک‌های تخصصی -> مستندات و خروجی‌ها',
      'فاز اول تا ششم متدولوژی هوش مصنوعی',
      'آغاز فاز اول از صفحه ۱۹ با تعیین اهداف کسب‌وکار'
    ]
  },
  {
    pageNumber: 3,
    titleEn: 'Table of Contents (Part 2 - Phases II to IV)',
    titleFa: 'فهرست مطالب (بخش دوم - فازهای ۲ تا ۴)',
    sectionEn: 'Contents',
    sectionFa: 'فهرست',
    imagePath: '/workbook_pages/page_03.png',
    summaryEn: 'Table of Contents detailing AI Go/No-Go, Phase II (Data Understanding), Phase III (Data Prep), and Phase IV (Model Dev).',
    summaryFa: 'فهرست سرفصل‌های تصمیم‌گیری Go/No-Go، درک داده، آماده‌سازی داده و توسعه مدل.',
    fullTextEn: `Task Group: AI Go/No-Go (p. 33)
Phase II: Data Understanding (p. 40)
Phase III: Data Preparation (p. 48)
Phase IV: Model Development (p. 55)
- Generic Task Group: Select Modeling Technique (p. 55)
- AutoML, Fine-Tuning, Generative AI (pp. 57-58)
- Model Training & Hyperparameter Optimization (pp. 60-61)`,
    keyPointsFa: [
      'ارزیابی توجیه‌پذیری ۳گانه هوش مصنوعی (کسب‌وکار، داده، اجرا)',
      'انتخاب داده، پاکسازی و برچسب‌گذاری (Data Labeling)',
      'استفاده از مدل‌های از پیش‌آموزش‌دیده، Fine-Tuning و هوش مصنوعی مولد'
    ]
  },
  {
    pageNumber: 4,
    titleEn: 'Table of Contents (Part 3 - Phases V to VI)',
    titleFa: 'فهرست مطالب (بخش سوم - فازهای ۵ و ۶)',
    sectionEn: 'Contents',
    sectionFa: 'فهرست',
    imagePath: '/workbook_pages/page_04.png',
    summaryEn: 'Table of Contents for Model Evaluation, Model Operationalization, Governance, and Final Reporting.',
    summaryFa: 'فهرست ارزیابی مدل، عملیاتی‌سازی، حاکمیت مدل و گزارش‌دهی پایانی.',
    fullTextEn: `Phase V: Model Evaluation (p. 63)
- Evaluate Model Results, Confusion Matrix, KPIs (pp. 63-64)
- Model Iteration Approach & Review (pp. 67-69)
Phase VI: Model Operationalization (p. 71)
- Operationalization Plan & Environments (p. 71)
- Monitoring, Maintenance & Model Governance (pp. 73-74)
- Next Iteration Requirements & Final Report (pp. 75-78)`,
    keyPointsFa: [
      'سنجش ماتریس درهم‌ریختگی (Confusion Matrix) و معیارهای عملکردی مدل',
      'برنامه استقرار در محیط‌های ابری و Edge',
      'چارچوب حاکمیت هوش مصنوعی (AI Governance) و پایش مداوم مدل'
    ]
  },
  {
    pageNumber: 5,
    titleEn: 'About PMI-CPMAI and This Workbook',
    titleFa: 'درباره متدولوژی PMI-CPMAI و این کتاب کار',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_05.png',
    summaryEn: 'Introduction to CPMAI as a vendor-neutral, data-centric, AI-specific, iterative methodology extending CRISP-DM and Agile.',
    summaryFa: 'معرفی متدولوژی مستقل از فناوری، داده‌محور و چابک CPMAI که توسعه‌یافته بر پایه CRISP-DM و Agile است.',
    fullTextEn: `The PMI® Certified Professional in Managing AI (PMI-CPMAI)™ methodology is a vendor-neutral, data-centric, AI-specific, iterative methodology for running and managing artificial intelligence (AI), machine learning (ML), and cognitive technology projects.

This approach borrows and extends upon previous approaches like agile practices and CRISP-DM (Cross-Industry Standard Process for Data Mining).

How to Use This Workbook:
• Provides examples following the sample use case.
• Responses are potential exemplar responses.
• Use to see how to answer similar questions in your project.`,
    keyPointsFa: [
      'مستقل از ارائه‌دهنده (Vendor-Neutral)',
      'تمرکز محوری بر داده‌ها (Data-Centric)',
      'ماهیت تکرارشونده و چابک (Iterative & Agile)',
      'راهنمای عملی برای پروژه‌های هوش مصنوعی و یادگیری ماشین'
    ]
  },
  {
    pageNumber: 6,
    titleEn: 'CPMAI Hierarchy and Task Mapping',
    titleFa: 'سلسله‌مراتب CPMAI و نگاشت تسک‌ها',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_06.png',
    summaryEn: 'The four-level CPMAI hierarchy: Phases, Generic Tasks, Specialized Tasks, and Methodology Artifacts.',
    summaryFa: 'چهار لایه ساختاری متدولوژی: فازها، تسک‌های عمومی، تسک‌های تخصصی، و مصنوعات/مستندات متدولوژی.',
    fullTextEn: `CPMAI Hierarchy:
1. Phases: The highest level gathering activities into logical groups.
2. Generic Tasks: Tasks to accomplish for that phase to achieve its objective.
3. Specialized Tasks: Project-specific tasks adapted from generic tasks.
4. Methodology Artifacts: Specific records, outputs, decisions, and results.

Mapping Generic Tasks to Specialized Tasks:
• Analyze your specific context.
• Remove details not applicable.
• Add details specific to your context.
• Instantiate generic contents according to concrete characteristics.`,
    keyPointsFa: [
      'فازها (Phases): ۶ فاز کلان چرخه عمر پروژه',
      'تسک‌های عمومی (Generic Tasks): فعالیت‌های استاندارد و مشترک در هر فاز',
      'تسک‌های تخصصی (Specialized Tasks): بومی‌سازی تسک‌ها برای پروژه خاص شما',
      'مصنوعات متدولوژی (Artifacts): مستندات، شاخص‌ها و شواهد خروجی'
    ]
  },
  {
    pageNumber: 7,
    titleEn: 'CPMAI Phases Overview Diagram',
    titleFa: 'نمودار کلی فازهای شش‌گانه CPMAI',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_07.png',
    summaryEn: 'Figure 1: Visual diagram of the 6 mutually-iterative CPMAI phases centered around Data.',
    summaryFa: 'شکل ۱: چرخه تکرارشونده ۶ فاز CPMAI که همگی حول محور «داده» در گردش و بازگشت متقابل هستند.',
    fullTextEn: `Figure 1: CPMAI phases overview
Phases:
1. Business Understanding
2. Data Understanding
3. Data Preparation
4. Model Development
5. Model Evaluation
6. Model Operationalization

All phases are centered around DATA and are mutually iterative. If during Model Development you discover data issues, you can shift back to Data Understanding or Data Preparation before moving forward.`,
    keyPointsFa: [
      'تکرارپذیری متقابل (Mutually Iterative): امکان بازگشت به فازهای قبل در هر لحظه',
      'محوریت دائمی داده (Data-Centricity) در تمام مراحل توسعه',
      'انطباق با اسپرینت‌های اسکرام و چابک'
    ]
  },
  {
    pageNumber: 8,
    titleEn: 'Detailed Description of Phases I to V',
    titleFa: 'تشریح تفصیلی فازهای ۱ تا ۵ متدولوژی',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_08.png',
    summaryEn: 'In-depth description of Business Understanding, Data Understanding, Data Preparation, Model Development, and Model Evaluation.',
    summaryFa: 'توضیحات تکمیلی اهداف، کارکردها و ماهیت فازهای ۱ تا ۵.',
    fullTextEn: `Phase I: Business Understanding - Convert business objectives into AI problem definition and preliminary plan.
Phase II: Data Understanding - Initial data collection, requirements, data quality, exploratory insights.
Phase III: Data Preparation - Cleansing, aggregation, augmentation, labeling, normalization, transformation.
Phase IV: Model Development - Algorithm selection, model training, hyperparameter tuning, ensembles.
Phase V: Model Evaluation - Metric evaluation, confusion matrices, KPIs, user acceptance.`,
    keyPointsFa: [
      'فاز ۱: تعریف مسئله و تبدیل نیاز کسب‌وکار به مسئله یادگیری ماشین',
      'فاز ۲: شناسایی و ارزیابی کیفیت داده‌ها',
      'فاز ۳: پاکسازی، برچسب‌گذاری و مهندسی داده',
      'فاز ۴: آموزش و تنظیم ابرپارامترها',
      'فاز ۵: ارزیابی دقت و سنجه‌های کسب‌وکاری قبل از استقرار'
    ]
  },
  {
    pageNumber: 9,
    titleEn: 'Phase VI & Master Mapping Table',
    titleFa: 'فاز ۶ و جدول نگاشت تسک‌های عمومی فازها',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_09.png',
    summaryEn: 'Phase VI (Model Operationalization) description and Table 1: Generic Tasks & Artifacts per Phase.',
    summaryFa: 'توضیح فاز استقرار مدل به همراه جدول ۱ شامل تسک‌های عمومی و خروجی‌های استاندارد هر فاز.',
    fullTextEn: `Phase VI: Model Operationalization - Putting model into operation (cloud, edge, on-prem), monitoring, versioning, governance.

Table 1: Generic Tasks per Phase:
- Phase I: Determine business objectives, Assess situation.
- Phase II: Collect initial data, Describe data, Explore data, Verify data quality.
- Phase III: Select data, Clean data, Label data, Integrate data, Format data.
- Phase IV: Select modeling techniques, Generate test design, Build model.
- Phase V: Evaluate results, Review process, Determine next steps.
- Phase VI: Operationalize model, Monitor and maintain, Produce final report, Review project.`,
    keyPointsFa: [
      'عملیاتی‌سازی (Operationalization): استقرار در کلود یا Edge',
      'حاکمیت مدل و مانیتورینگ افت کیفیت (Drift)',
      'جدول مرجع بررسی پیشرفت پروژه در تمام فازها'
    ]
  },
  {
    pageNumber: 10,
    titleEn: 'Master Mapping Table (Continued)',
    titleFa: 'ادامه جدول نگاشت تسک‌های عمومی و الزامات شناختی',
    sectionEn: 'Methodology Guide',
    sectionFa: 'راهنمای متدولوژی',
    imagePath: '/workbook_pages/page_10.png',
    summaryEn: 'Table 1 continued: Cognitive requirements, Pretrained model customization, Dataset descriptions, and Validation.',
    summaryFa: 'ادامه جدول ۱ شامل تسک‌های خاص هوش مصنوعی: Go/No-Go، الگوها، سفارشی‌سازی مدل‌های آماده.',
    fullTextEn: `Table 1 (Continued):
- Phase I: Outline cognitive project requirements (AI Go/No-Go, Pattern identification, Transparency, Acceptable metrics).
- Phase II: Customize pretrained models, Pretrained and third-party model usage, Transfer learning requirements.
- Phase III: Describe dataset.
- Phase IV: Assess model, Model assessment, Model validation, Revised hyperparameter settings, Scaffolding environment.`,
    keyPointsFa: [
      'آزمون AI Go/No-Go برای تعیین نیاز واقعی به هوش مصنوعی',
      'انتخاب الگوهای ۷گانه هوش مصنوعی',
      'سفارشی‌سازی مدل‌های پیش‌آموزش‌دیده و یادگیری انتقالی (Transfer Learning)'
    ]
  },
  {
    pageNumber: 11,
    titleEn: 'Case Study: XYZ Company Background & Profile',
    titleFa: 'مطالعه موردی: مشخصات و پیش‌زمینه شرکت XYZ',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_11.png',
    summaryEn: 'Profile of XYZ Company: family-owned retail/e-commerce in personalized gifts, 150 employees, $2M support expenditure.',
    summaryFa: 'مشخصات شرکت فرضی XYZ: خرده‌فروشی آنلاین هدایای شخصی‌سازی‌شده، ۱۵۰ پرسنل، ۲ میلیون دلار هزینه پشتیبانی سالانه.',
    fullTextEn: `Example Use Case: XYZ Company Customer Support Chatbot
Industry: Personalized Gifts & Retail
Headquarters: Minneapolis, Minnesota
Company size: ~150 employees
Customer base: US (80%), Canada and Mexico (20%)
Support Team: 10 people, ~$2M annually
Products: Greeting cards, engraved jewelry boxes, photo frames
Peak Seasons: Holidays, graduation ceremonies, weddings
Problem: High volume of inquiries causing long delays (>24h).`,
    keyPointsFa: [
      'صنعت: فروش آنلاین هدایای اختصاصی و کارت تبریک',
      'تیم پشتیبانی: ۱۰ نفر با هزینه ۲ میلیون دلار در سال',
      'چالش اصلی: صف‌های طولانی و پاسخ‌دهی بالای ۲۴ ساعت در ایام اوج فروش'
    ]
  },
  {
    pageNumber: 12,
    titleEn: 'Case Study: Business Problem & Chatbot Scope',
    titleFa: 'مطالعه موردی: تعریف مسئله و قلمرو چت‌بات',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_12.png',
    summaryEn: 'Business problem (frustration over personalization/shipping) and AI Chatbot scope for Level 1 support inquiries.',
    summaryFa: 'بیان مسئله کسب‌وکار و دامنه کاربرد چت‌بات هوشمند برای پاسخ به سوالات سطح ۱ (Level 1).',
    fullTextEn: `Business Problem:
Customers frustrated by delayed responses on product personalization, shipping timelines, returns. Inquiries are repetitive.

AI-Powered Chatbot Scope (Level 1 Support):
• Basic product knowledge: features, pricing, availability.
• Account management: login, password reset, order status.
• Simple troubleshooting: common issue guidance.

Key Objectives:
• Response time reduced from 24 hours to < 5 minutes.
• 24/7 availability with minimal downtime.
• Scalability during peak holiday shopping.`,
    keyPointsFa: [
      'پاسخگویی به سوالات تکراری سطح ۱ با NLP',
      'کاهش زمان انتظار از ۲۴ ساعت به کمتر از ۵ دقیقه',
      'پشتیبانی ۲۴ ساعته در ۷ روز هفته بدون افزایش تصاعدی هزینه'
    ]
  },
  {
    pageNumber: 13,
    titleEn: 'Case Study: Compliance, Privacy & Ethics',
    titleFa: 'مطالعه موردی: الزامات انطباق، حریم خصوصی و اخلاق',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_13.png',
    summaryEn: 'Why AI over rule-based, language priorities (English first, French/Spanish later), and Data Privacy & Security requirements.',
    summaryFa: 'دلایل برتری AI بر سیستم‌های قاعده‌محور، اولویت زبان انگلیسی و الزامات سفت‌وسخت حریم خصوصی (CCPA).',
    fullTextEn: `Why AI: Rule-based requires constant manual updates; AI learns from historical chats and FAQs.
Languages: Prioritize English first, then Canadian French and Spanish.

Compliance & Ethical Requirements:
• Data Privacy: Collect minimal personal info; adhere to CCPA; strict encryption and access control.
• Transparency: Inform users they are speaking with a chatbot; clear opt-out and deletion mechanisms.
• Escalation: Seamless routing to human agents for complex issues.`,
    keyPointsFa: [
      'انطباق با قوانین حریم خصوصی کالیفرنیا (CCPA)',
      'شفافیت کامل: کاربر باید بداند در حال گفتگو با ربات است',
      'فرآیند ارجاع خودکار به پشتیبان انسانی برای موارد حساس'
    ]
  },
  {
    pageNumber: 14,
    titleEn: 'Case Study: Responsible AI, Budget & Constraints',
    titleFa: 'مطالعه موردی: هوش مصنوعی مسئولانه، بودجه و محدودیت‌ها',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_14.png',
    summaryEn: 'Fairness, bias mitigation, human-in-the-loop, and project constraints: Budget < $1M, Time: 4 months MVP.',
    summaryFa: 'انصاف، کاهش سوگیری، رویکرد انسان در چرخه، بودجه حداکثر ۱ میلیون دلار، و ساخت MVP در ۴ ماه.',
    fullTextEn: `Fairness & Bias Mitigation: Routine audits of training datasets to prevent biased responses.
Responsible AI: Human-in-the-loop for high-stakes or sensitive issues.

Resources & Constraints:
• Budget: Under 50% of current annual support spend (< $1M).
• Technology: Off-the-shelf AI frameworks preferred over custom build.
• Timeline: 4-month MVP launch before peak holiday retail season.`,
    keyPointsFa: [
      'انسان در چرخه (Human-in-the-loop) برای تصمیمات پرریسک',
      'سقف بودجه: زیر ۱ میلیون دلار (کمتر از نصف هزینه فعلی)',
      'بازه زمانی انتشار نسخه کمینه (MVP): ۴ ماه'
    ]
  },
  {
    pageNumber: 15,
    titleEn: 'Case Study: Personnel, Skill Gaps & Chat Logs',
    titleFa: 'مطالعه موردی: نیروی انسانی، شکاف مهارتی و گزارش‌های چت',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_15.png',
    summaryEn: 'Personnel constraints, agile experience, skill gaps (external consultancy), and Primary Data: 100k chat logs and 300 FAQs.',
    summaryFa: 'وضعیت پرسنل، نیاز به مشاور بیرونی، و داده‌های اولیه: ۱۰۰ هزار لاگ چت تاریخی و ۳۰۰ پرسش متداول.',
    fullTextEn: `Personnel: Dedicated PM, 1 technical resource with DS expertise in IT. Augmented with external AI consultancy.
Agile: Experience with short sprints.

Primary Data Sources:
1. Historical Chat Logs: ~100,000 logs in CSV/JSON spanning 2 years.
2. Customer Service FAQs: ~300 structured Q&A entries in CMS/spreadsheet.`,
    keyPointsFa: [
      'استفاده از مشاور بیرونی هوش مصنوعی جهت پر کردن خلاء مهارتی',
      '۱۰۰,۰۰۰ گفتگوی متنی ۲ سال گذشته با مشتریان',
      '۳۰۰ سوال و پاسخ متداول در پایگاه دانش'
    ]
  },
  {
    pageNumber: 16,
    titleEn: 'Case Study: E-Commerce Data & Data Quality',
    titleFa: 'مطالعه موردی: سوابق تراکنش، کاتالوگ و کیفیت داده‌ها',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_16.png',
    summaryEn: 'Transaction records in CRM, product catalogs, data sufficiency, and data quality (noise filtering needed).',
    summaryFa: 'سوابق سفارش‌ها در CRM، کاتالوگ محصولات، ارزیابی کفایت داده‌ها و فیلتر کردن نویزهای چت.',
    fullTextEn: `Supplementary Data Sources:
• E-commerce Transactions: Millions of CRM rows spanning 5 years.
• Product Catalog: XML/CSV feeds with personalization specs.
• Carrier APIs: External tracking libraries.

Data Quality:
High coverage for common queries; noise/typos in user chat logs require cleaning; need to link CRM order IDs with chat transcripts.`,
    keyPointsFa: [
      'میلیون‌ها رکورد تراکنش ۵ سال گذشته در سامانه CRM',
      'نیاز به تمیزکاری غلط‌های املایی و پیام‌های متفرقه در چت‌ها',
      'اتصال مستقیم به API کاتالوگ محصولات'
    ]
  },
  {
    pageNumber: 17,
    titleEn: 'Case Study: Deployment Channels & Architecture',
    titleFa: 'مطالعه موردی: کانال‌های استقرار و معماری یکپارچگی',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_17.png',
    summaryEn: 'Deployment on E-Commerce website, Mobile App, future Social Media, API connectivity, and Scalable Cloud hosting.',
    summaryFa: 'استقرار در وب‌سایت، اپلیکیشن موبایل، آینده در شبکه‌های اجتماعی، اتصال با وب‌هوک و زیرساخت ابری مقیاس‌پذیر.',
    fullTextEn: `Touchpoints:
1. E-Commerce Website: Live chat widget with user authentication to pull order history.
2. Mobile App: Native in-app chat with push notifications.
3. Social Media: Future phase (WhatsApp / Messenger).

Integration & Hosting:
REST APIs / webhooks for CRM & inventory; unified analytics database; scalable cloud hosting for seasonal spikes.`,
    keyPointsFa: [
      'ویجت چت زنده در تمام صفحات فروشگاه با امکان ورود حساب کاربری',
      'ماژول چت بومی در اپلیکیشن موبایل با نوتیفیکیشن',
      'میزبانی در زیرساخت ابری با قابلیت مقیاس‌پذیری خودکار'
    ]
  },
  {
    pageNumber: 18,
    titleEn: 'Case Study: UX Design, Fallback & Accessibility',
    titleFa: 'مطالعه موردی: طراحی تجربه کاربری، بازگشت و دسترسی‌پذیری',
    sectionEn: 'Case Study Brief',
    sectionFa: 'سناریوی مرجع',
    imagePath: '/workbook_pages/page_18.png',
    summaryEn: 'Conversation flows, fallback and escalation procedures, and accessibility compliance (screen readers, keyboard).',
    summaryFa: 'جریان گفتگو، گزینه‌های پاسخ سریع، رویه ارجاع به کارشناس، و سازگاری با استانداردهای دسترسی‌پذیری.',
    fullTextEn: `User Experience Design:
• Conversation flow: Quick replies and guided prompts alongside open-ended input.
• Fallback & Escalation: Seamless transfer to human agents or email ticket generation.
• Accessibility: Compatibility with screen readers and keyboard navigation.`,
    keyPointsFa: [
      'دکمه‌های انتخاب سریع (Quick Replies) در کنار پرسش متنی باز',
      'مکانیزم Fallback در صورت نیافتن پاسخ دقیق',
      'رعایت استانداردهای دسترسی‌پذیری (Accessibility)'
    ]
  },
  // EXERCISE PAGES 19 to 25 (Exemplar Solutions)
  {
    pageNumber: 19,
    titleEn: 'Page 19: Determine Business Objectives (Solution)',
    titleFa: 'صفحه ۱۹: تعیین اهداف کسب‌وکار (پاسخ نمونه استاد)',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_19.png',
    summaryEn: 'What problem are you solving with AI in this iteration? Routine Level 1 support automation for XYZ Company.',
    summaryFa: 'پاسخ استاندارد به مسئله‌ای که با هوش مصنوعی در این تکرار حل می‌شود: اتوماسیون پرسش‌های پشتیبانی سطح ۱.',
    fullTextEn: `What problem are you solving with AI in this iteration?
"XYZ Company is struggling to handle a growing volume of routine customer support inquiries—especially about product personalization, shipping timelines, returns, and order status—with its existing support team. Response times have risen to over 24 hours, leading to increased customer frustration and negative feedback. By implementing an AI-enabled chatbot for Level 1 customer support, XYZ Company aims to automate these repetitive inquiries, reduce wait times to under 5 minutes, and free human agents to focus on more complex or high-value customer issues. This AI solution will not only improve overall customer satisfaction and lower operational costs but will also scale effectively during holiday peaks and other busy seasons."`,
    keyPointsFa: [
      'مشکل: حجم فزاینده سوالات روزمره و زمان پاسخ‌دهی بالای ۲۴ ساعت',
      'راهکار: چت‌بات مجهز به هوش مصنوعی برای پشتیبانی سطح ۱',
      'نتیجه: کاهش زمان انتظار به کمتر از ۵ دقیقه و آزادسازی کارشناسان برای مسائل پیچیده'
    ],
    instructorNotesFa: 'دانشجو باید بتواند هم مسئله فعلی (زمان پاسخ > ۲۴ ساعت)، هم جامعه هدف (پشتیبانی سطح ۱)، و هم سنجه اولیه (کاهش به زیر ۵ دقیقه) را به وضوح بیان کند.'
  },
  {
    pageNumber: 20,
    titleEn: 'Page 20: Business Success Criteria & Cost-Benefit',
    titleFa: 'صفحه ۲۰: معیارهای موفقیت کسب‌وکار و تحلیل هزینه-فایده',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_20.png',
    summaryEn: 'Objective measures of success (wait time < 5 min, 60% automation, CSAT +10%, 24/7 uptime) and Cost-Benefit budget < $1M.',
    summaryFa: 'معیارهای کمی موفقیت (پاسخ زیر ۵ دقیقه، ۶۰٪ اتوماسیون، افزایش ۱۰٪ رضایت، ۲۴/۷) و بودجه زیر ۱ میلیون دلار.',
    fullTextEn: `What are the objective measures of success for this project iteration?
• Average Response Time: Reduce from 24 hours to under 5 minutes.
• Percentage of Automated Resolutions: Fully handle at least 60% of routine Level 1 queries without escalation.
• Improvement in Customer Satisfaction Scores: Increase positive feedback rating by at least 10%.
• Available 24/7: Minimal downtime (< 1% unscheduled outage).
• Cost-Effectiveness/ROI: Expenses below 50% of current annual support expenditure.

What is the cost and time budget for this project?
Budget under $1M (50% of $2M annual support spend), covering AI software licenses, CRM/API integration, cloud hosting, external consulting, and dedicated internal PM.`,
    keyPointsFa: [
      'کاهش زمان انتظار: به زیر ۵ دقیقه',
      'نرخ حل خودکار: حداقل ۶۰٪ استعلام‌ها بدون نیاز به انسان',
      'افزایش رضایت مشتری: حداقل ۱۰٪ رشد در امتیاز CSAT/NPS',
      'بودجه مجاز: کمتر از ۱ میلیون دلار'
    ],
    instructorNotesFa: 'معیارهای موفقیت باید SMART (مشخص، قابل اندازه‌گیری، دست‌یافتنی، مرتبط و دارای زمان‌بندی) باشند. بودجه پروژه نباید از نصف هزینه سالانه فعلی فراتر رود.'
  },
  {
    pageNumber: 21,
    titleEn: 'Page 21: Time Budget, Expected ROI & Heuristics',
    titleFa: 'صفحه ۲۱: بودجه زمانی، برآورد ROI و رویکرد اکتشافی',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_21.png',
    summaryEn: '4-month MVP roadmap, expected yearly savings of $500k-$800k, and introduction to Cognitive Requirements vs. Heuristic Baselines.',
    summaryFa: 'نقشه راه ۴ ماهه MVP، صرفه‌جویی سالانه ۵۰۰ تا ۸۰۰ هزار دلاری، و تعریف خط مبنای اکتشافی (Heuristic Baseline).',
    fullTextEn: `Time Budget: 4 months MVP launch:
• Month 1: Data gathering, requirements, AI tooling selection
• Month 2: Initial model development & integration
• Month 3: Testing, fine-tuning, user acceptance evaluation
• Month 4: MVP release, staff training, partial go-live

Expected ROI:
Cost savings: $500,000–$800,000 yearly savings from automating 60%-70% of Level 1 inquiries.
Intangible benefits: Customer satisfaction, peak season scalability, agent efficiency.`,
    keyPointsFa: [
      'برنامه زمانی: ۴ ماه تا تحویل MVP',
      'بازگشت سرمایه: ۵۰۰,۰۰۰ تا ۸۰۰,۰۰۰ دلار صرفه‌جویی مستقیم در هر سال',
      'تعریف خط مبنای اکتشافی (Heuristic Baseline) به عنوان معیار مقایسه با روش غیرشناختی'
    ],
    instructorNotesFa: 'محاسبه ROI در هوش مصنوعی باید هم منافع ملموس مالی (کاهش هزینه) و هم منافع ناملموس (وفاداری برند و مقیاس‌پذیری در پیک‌ها) را در بر بگیرد.'
  },
  {
    pageNumber: 22,
    titleEn: 'Page 22: Why Cognitive AI Solution & Noncognitive Gaps',
    titleFa: 'صفحه ۲۲: ضرورت راهکار شناختی و دلایل رد روش‌های غیرشناختی',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_22.png',
    summaryEn: 'Why AI is required over expanding humans or rule-based chatbots, and noncognitive portions integrated.',
    summaryFa: 'چرا رویکرد شناختی لازم است؟ مقایسه با استخدام نیروی بیشتر یا ربات سنتی کلیدواژه‌ای، و بخش‌های غیرهوشمند سیستم.',
    fullTextEn: `Why does this project need a cognitive (AI) solution?
Inquiries are high-volume and repetitive. AI learns from historical interactions and adapts to new products/policies. Rule-based systems require continuous, expensive manual scripting.

Noncognitive alternatives considered:
1. Expanding human support team (too costly, cannot scale seasonally).
2. Purely rule-based chatbot (rigid, manual updates become impossible with changing products).

Noncognitive portions used with AI:
CRM, order management, inventory database, web/mobile UI, branding, payment modules.`,
    keyPointsFa: [
      'چرا استخدام بیشتر رد شد: هزینه‌های سرسام‌آور و عدم مقیاس‌پذیری در فصول اوج',
      'چرا سیستم قاعده‌محور رد شد: ناتوانی در درک زبان طبیعی و نیاز مداوم به بازنویسی دستی قواعد',
      'بخش‌های غیرشناختی کمکی: دیتابیس انبار، سیستم پرداخت و مدیریت احراز هویت'
    ],
    instructorNotesFa: 'اصل طلایی CPMAI: «اگر روش غیرشناختی می‌تواند مسئله را به اندازه کافی خوب و ارزان حل کند، از AI استفاده نکنید!» در اینجا اثبات نیاز به یادگیری مداوم و درک محاوره الزامی است.'
  },
  {
    pageNumber: 23,
    titleEn: 'Page 23: Cognitive Objectives, Outcomes & AI Criteria',
    titleFa: 'صفحه ۲۳: اهداف شناختی، خروجی‌ها و معیارهای موفقیت هوش مصنوعی',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_23.png',
    summaryEn: 'Detailed cognitive objectives, business-oriented cognitive outcomes (80% resolution, +15% CSAT), and AI success criteria.',
    summaryFa: 'اهداف دقیق شناختی، خروجی‌های ملموس کسب‌وکار (۸۰٪ حل مسئله، ۱۵٪ رضایت)، و تمایز کارکرد هوش مصنوعی با نرم‌افزار عادی.',
    fullTextEn: `Cognitive Objectives:
• Automate high-volume repetitive Level 1 queries
• Real-time responses (< 5 min)
• Continuous learning from chat history
• Seamless CRM integration for personalization
• Peak season elasticity

Cognitive Outcomes:
• Successful resolution rate for routine questions >= 80%
• CSAT rating increase >= 15%
• Free human agents for complex escalations

AI Success Criteria:
• Learn from new FAQs/chats without manual reprogramming
• Context-aware, nuanced responses rather than rigid scripts
• Instant auto-scaling during high-traffic surges`,
    keyPointsFa: [
      'هدف شناختی: یادگیری مداوم از گفتگوهای واقعی و ارتقای دقت با گذر زمان',
      'خروجی ملموس: نرخ موفقیت حل حداقل ۸۰٪ و افزایش ۱۵٪ رضایت‌مندی',
      'معیار تمایز هوش مصنوعی: درک بافتار (Context) و تفاوت لحن مشتریان'
    ],
    instructorNotesFa: 'دانشجو باید تفاوت بین هدف کسب‌وکار (Business Goal) و هدف شناختی (Cognitive Objective) را مشخص کند؛ هدف شناختی باید توانمندی مدل را هدف قرار دهد.'
  },
  {
    pageNumber: 24,
    titleEn: 'Page 24: AI Pattern Identification (Seven Patterns)',
    titleFa: 'صفحه ۲۴: شناسایی الگوهای هوش مصنوعی (الگوهای ۷گانه)',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_24.png',
    summaryEn: 'Identification of the AI pattern implemented: Conversational & Human Interaction Pattern.',
    summaryFa: 'تعیین الگوی اصلی متدولوژی CPMAI: الگوی تعامل محاوره‌ای و انسانی (Conversational/Human Interaction).',
    fullTextEn: `AI Pattern Identification:
CPMAI uses Seven Patterns of AI:
1. Patterns and Anomalies
2. Conversational and Human Interaction
3. Recognition
4. Predictive Analytics and Decision Support
5. Goal-Driven Systems
6. Hyper-personalization
7. Autonomous Systems

Which pattern is implemented in this iteration?
"This iteration primarily implements the Conversational/Human Interaction AI pattern, leveraging natural language processing to provide real-time customer support."`,
    keyPointsFa: [
      'الگوی اصلی این اسپرینت: الگوی تعامل و محاوره انسانی (Conversational/Human Interaction)',
      'تکیه بر پردازش زبان طبیعی (NLP) و استخراج قصد کاربر (Intent Recognition)',
      'پتانسیل افزودن الگوی Hyper-personalization در فازهای بعدی'
    ],
    instructorNotesFa: 'تشخیص صحیح الگو به تیم اجازه می‌دهد میان‌برهای توسعه، معماری و الگوریتم‌های استاندارد همان الگو را مستقیماً به کار بگیرد.'
  },
  {
    pageNumber: 25,
    titleEn: 'Page 25: Resource Requirements - Talent, Tech & Skills',
    titleFa: 'صفحه ۲۵: نیازمندی‌های منابع - نیروی انسانی، فناوری و مهارت‌ها',
    sectionEn: 'Phase I Workbook',
    sectionFa: 'پاسخ حل‌شده فاز ۱',
    imagePath: '/workbook_pages/page_25.png',
    summaryEn: 'Inventory of resources: Talent (DS, Architect, PM, CS Lead), Technology (Chatbot platform, Cloud, APIs, CI/CD), and Skills.',
    summaryFa: 'موجودی کامل منابع: استعدادهای انسانی، پلتفرم‌های نرم‌افزاری و ابری، و مهارت‌های کلیدی مورد نیاز پروژه.',
    fullTextEn: `Talent/Team Resources Needed:
• Data scientist / ML specialist for NLP models
• Solutions architect / software engineer for CRM integration
• Project manager to coordinate agile cross-functional sprints
• Customer service lead for data curation & escalation workflows

Technology Resources:
• AI chatbot platform or NLP library
• Secure, scalable cloud hosting environment
• CRM and order management APIs
• CI/CD and version control pipelines

Skills Needed & Gaps:
• NLP expertise, software engineering / API development
• Data privacy and security good practices
• Agile project management
• Domain knowledge for customer service training and escalation`,
    keyPointsFa: [
      'تیم مورد نیاز: دانشمند داده، معمار نرم‌افزار، مدیر پروژه چابک، و لید پشتیبانی',
      'فناوری‌ها: پلتفرم چت‌بات هوش مصنوعی، هاستینگ ابری امن، و خط لوله CI/CD',
      'مهارت‌های ضروری: تخصص NLP، امنیت و حفظ حریم خصوصی، و دانش حوزه کسب‌وکار'
    ],
    instructorNotesFa: 'شناسایی زودهنگام شکاف مهارتی (Skill Gap) حیاتی است؛ شرکت XYZ می‌داند که برای NLP باید از مشاوران بیرونی استفاده کند.'
  }
];

// Reference data for prefilling student form with instructor exemplar answers
export const INSTRUCTOR_EXEMPLAR_ANSWERS = {
  page1: {
    story: 'به عنوان مدیر پشتیبانی شرکت XYZ، می‌خواهم پاسخ‌دهی به استعلام‌های متداول سطح ۱ (مانند وضعیت سفارش، زمان ارسال و مرجوعی) خودکار شود تا زمان انتظار مشتریان از ۲۴ ساعت به کمتر از ۵ دقیقه برسد.',
    bg: 'شرکت خرده‌فروشی هدایای شخصی‌سازی‌شده XYZ با ۱۵۰ کارمند و ۱۰ پرسنل پشتیبانی مشتریان، با افزایش شدید تماس‌ها و نارضایتی ناشی از انتظار بیش از ۲۴ ساعت در فصول اوج مواجه است.',
    obj: 'پیاده‌سازی چت‌بات هوشمند مبتنی بر NLP برای پاسخگویی ۲۴/۷ به استعلام‌های متداول سطح ۱، کاهش هزینه عملیاتی و ارتقای رضایت مشتریان.',
    qs: [
      'آیا چت‌بات می‌تواند به تنهایی حداقل ۶۰٪ استعلام‌های تکراری را بدون دخالت انسان حل کند؟',
      'چگونه اطلاعات سفارش و شخصی‌سازی کالا به طور بلادرنگ از CRM استخراج شود؟',
      'رویه ارجاع امن به اپراتور انسانی در صورت بروز نارضایتی یا موارد حساس چیست؟'
    ]
  },
  page2: `شرکت XYZ با حجم فزاینده استعلام‌های روزمره مشتریان—به‌ویژه درباره گزینه‌های شخصی‌سازی محصول، زمان‌بندی ارسال، شرایط مرجوعی و پیگیری سفارش—دست‌وپنجه نرم می‌کند. زمان پاسخ‌دهی به بیش از ۲۴ ساعت رسیده که موجب نارضایتی و بازخوردهای منفی شده است. با پیاده‌سازی چت‌بات مجهز به هوش مصنوعی برای پشتیبانی سطح ۱، شرکت به دنبال اتوماسیون این پرسش‌های تکراری، کاهش زمان انتظار به کمتر از ۵ دقیقه، و آزادسازی کارشناسان انسانی برای تمرکز بر مسائل پیچیده است. این راهکار علاوه بر افزایش رضایت و کاهش هزینه‌ها، پاسخگوی تقاضای فصول اوج خرید نیز خواهد بود.`,
  page3: `معیارهای عینی موفقیت در این تکرار:
۱. میانگین زمان پاسخ: کاهش از ۲۴ ساعت فعلی به کمتر از ۵ دقیقه.
۲. درصد حل خودکار: مدیریت کامل حداقل ۶۰٪ از استعلام‌های روزمره سطح ۱ بدون نیاز به ارجاع به کارشناس.
۳. ارتقای رضایت مشتری: افزایش حداقل ۱۰ درصدی در امتیاز بازخورد مثبت (NPS/CSAT) نسبت به خط مبنا.
۴. در دسترس بودن ۲۴/۷: ارائه خدمت شبانه‌روزی با حداقل توقف (قطعی برنامه‌ریزی‌نشده کمتر از ۱٪).
۵. اثربخشی هزینه/ROI: نگه‌داشتن هزینه‌های توسعه و عملیاتی چت‌بات در کمتر از ۵۰٪ بودجه پشتیبانی فعلی برای دستیابی به ROI مثبت در سال اول.`,
  page4: `بودجه هزینه و زمان پروژه:
شرکت XYZ قصد دارد هزینه‌های چت‌بات را زیر ۵۰٪ بودجه سالانه پشتیبانی ($2M) نگه دارد، بنابراین سقف بودجه کمتر از ۱ میلیون دلار است.
این بودجه شامل موارد زیر است:
- لایسنس پلتفرم نرم‌افزاری هوش مصنوعی
- توسعه APIها و یکپارچه‌سازی با سامانه‌های CRM و فروشگاه
- زیرساخت ابری و فضای ذخیره‌سازی
- خدمات مشاوره حرفه‌ای و تخصصی هوش مصنوعی
- منابع داخلی (مدیر پروژه اختصاصی)`,
  page5: `بودجه زمانی:
عرضه نسخه MVP در ۴ ماه:
- ماه ۱: جمع‌آوری داده‌ها، نهایی‌سازی نیازمندی‌ها، و انتخاب پلتفرم/ابزار هوش مصنوعی
- ماه ۲: توسعه مدل اولیه و یکپارچه‌سازی با سامانه‌های داخلی
- ماه ۳: آزمون، تنظیم دقیق، و ارزیابی پذیرش کاربر
- ماه ۴: انتشار MVP، آموزش کارکنان، و آغاز تعامل واقعی با مشتریان

نرخ بازگشت سرمایه (ROI) مورد انتظار:
- صرفه‌جویی مالی: ۵۰۰,۰۰۰ تا ۸۰۰,۰۰۰ دلار صرفه‌جویی سالانه با اتوماسیون ۶۰٪ تا ۷۰٪ استعلام‌ها.
- منافع ناملموس: ارتقای وفاداری مشتریان، مقیاس‌پذیری در روزهای پیک، و افزایش بهره‌وری تیم انسانی.`,
  page6: `رویکرد اکتشافی و غیرشناختی (Heuristic Baseline):
روش غیرشناختی فعلی، تکیه بر نیروی انسانی و اسکریپت‌های ثابت پاسخگویی است.
هدف راهکار شناختی انجام کار به شکل بهتر، سریع‌تر، ارزان‌تر و با قابلیت مقیاس‌پذیری بالاتر از روش اکتشافی است.`,
  page7: `چرا این پروژه به راهکار شناختی (هوش مصنوعی) نیاز دارد؟
تیم پشتیبانی در فصول شلوغ قادر به پاسخگویی به حجم انبوه پیام‌ها نیست. راهکار هوش مصنوعی از تاریخچه تعاملات یاد می‌گیرد و به سرعت با محصولات و سیاست‌های جدید هماهنگ می‌شود. برعکس، سیستم‌های قاعده‌محور نیازمند به‌روزرسانی مداوم و پرهزینه دستی هستند. هوش مصنوعی پاسخگویی بلادرنگ و ۲۴/۷ را در کنار مقیاس‌پذیری بالا فراهم می‌کند.`,
  page8: `گزینه‌های غیرشناختی و دلایل رد آن‌ها:
۱. افزایش تعداد پرسنل انسانی: هزینه استخدام سرسام‌آور بوده و در ایام افت فروش توجیه ندارد.
۲. چت‌بات قاعده‌محور سنتی: بازنویسی مداوم اسکریپت‌ها زمان‌بر و گران است و انعطاف لازم را ندارد.

بخش‌های غیرشناختی کمکی در این پروژه:
یکپارچگی با پایگاه داده CRM، دیتابیس سفارش‌ها و موجودی انبار، رابط کاربری وب و اپلیکیشن، ماژول‌های احراز هویت و پرداخت همگی توسط سرویس‌های غیرهوشمند استاندارد مدیریت می‌شوند.`,
  page9: `اهداف شناختی پروژه:
- اتوماسیون استعلام‌های پرحجم و تکراری سطح ۱ (ارسال، سفارش، مرجوعی)
- پاسخگویی بلادرنگ و رساندن زمان انتظار به چند دقیقه
- یادگیری مداوم از داده‌های گفتگو برای ارتقای دقت
- یکپارچگی بدون‌درز با CRM برای تعاملات شخصی‌سازی‌شده
- مقیاس‌پذیری بدون افت کیفیت در پیک‌های تقاضا`,
  page10: `خروجی‌ها و اهداف شناختی در قالب واژگان کسب‌وکار:
- پاسخگویی فوری و دقیق به پرسش‌های عمومی با حداقل دخالت انسانی
- دستیابی به نرخ حل موفق حداقل ۸۰٪ برای سوالات روزمره
- ارتقای رضایت‌مندی مشتریان به میزان ۱۵٪ یا بیشتر
- آزادسازی کارشناسان برای رسیدگی به موارد پیچیده و مشتریان ویژه
- ایجاد پایه‌ای مقیاس‌پذیر برای پشتیبانی چندزبانه در آینده`,
  page11: `معیارهای موفقیت سیستم هوش مصنوعی در برابر سیستم عادی:
- یادگیری خودکار از FAQها و آپدیت‌های محصول بدون نیاز به تغییر قواعد دستی
- ارائه پاسخ‌های هوشمندانه و متناسب با بافتار گفتگو به جای پاسخ‌های خشک و قالبی
- مقیاس‌پذیری لحظه‌ای در ساعات ترافیک سنگین بدون افت سرعت
- بهبود مستمر کیفیت پاسخ‌ها با گذر زمان از طریق بازخورد یادگیری ماشین`,
  page12: `شناسایی الگوی هوش مصنوعی:
متدولوژی CPMAI از ۷ الگوی هوش مصنوعی استفاده می‌کند:
۱. الگوها و ناهنجاری‌ها (Patterns & Anomalies)
۲. تعامل محاوره‌ای و انسانی (Conversational & Human Interaction)
۳. بازشناسی (Recognition)
۴. تحلیل پیش‌بینانه و تصمیم‌یار (Predictive Analytics & Decision Support)
۵. سیستم‌های هدف‌محور (Goal-Driven Systems)
۶. فوق‌شخصی‌سازی (Hyper-personalization)
۷. سیستم‌های خودمختار (Autonomous Systems)`,
  page13: `کدام الگو در این تکرار پیاده‌سازی می‌شود؟
این تکرار عمدتاً از «الگوی تعامل محاوره‌ای و انسانی (Conversational/Human Interaction)» با تکیه بر پردازش زبان طبیعی (NLP) استفاده می‌کند تا پشتیبانی بلادرنگ به مشتریان ارائه دهد.`,
  page14: `ارزیابی منابع انسانی مورد نیاز:
- دانشمند داده / متخصص یادگیری ماشین برای آموزش و فاین‌تیون مدل NLP
- معمار راهکار / مهندس نرم‌افزار جهت یکپارچه‌سازی چت‌بات با CRM و انبار
- مدیر پروژه برای هماهنگی اسپرینت‌ها و تیم‌های چندتخصصی
- لید پشتیبانی مشتریان برای جمع‌آوری داده‌های آموزشی و منطق ارجاع`,
  page15: `فناوری‌ها و مهارت‌های مورد نیاز:
فناوری‌ها:
- پلتفرم چت‌بات مجهز به هوش مصنوعی / کتابخانه NLP
- هاستینگ ابری امن با زیرساخت مقیاس‌پذیر
- دسترسی به سامانه‌های CRM از طریق API
- خط لوله CI/CD و سیستم کنترل نسخه

مهارت‌ها:
- تخصص در پردازش زبان طبیعی (NLP)
- مهندسی نرم‌افزار و معماری API
- آگاهی از استانداردها و الزامات حریم خصوصی داده‌ها
- مدیریت چابک پروژه (Agile PM)
- دانش حوزه پشتیبانی مشتریان و قوانین کسب‌وکار`
};
