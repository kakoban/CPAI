import { Language } from '../types/cpmai';

export interface UITranslation {
  brand: string;
  brandTag: string;
  org: string;
  by: string;
  sub: string;
  overallProg: string;
  phaseProg: string;
  stepsLabel: string;
  copyBtn: string;
  copiedToast: string;
  resetBtn: string;
  resetConfirm: string;
  exportBtn: string;
  importBtn: string;
  printBtn: string;
  settingsBtn: string;
  exShow: string;
  exHide: string;
  addBtn: string;
  rmBtn: string;
  savedLabel: string;
  autoSaved: string;
  readCheckbox: string;
  switchLang: string;
  themeToggle: string;
  projectMetaTitle: string;
  saveMetaBtn: string;
  closeBtn: string;
  exportModalTitle: string;
  downloadJsonBtn: string;
  copyMdBtn: string;
  importJsonTitle: string;
  importJsonPlaceholder: string;
  applyImportBtn: string;
  importSuccess: string;
  importError: string;
  phasesNav: string[];
  cognitivePatterns: Array<{ key: string; label: string; desc: string }>;
  caseStudies: Array<{ id: string; name: string }>;
  decisionOptions: Array<{ id: string; label: string }>;
  footerRights: string;
  instagram: string;
  telegram: string;
  website: string;
  p1SubPage1: string;
  p1SubPage2: string;
  nextPage: string;
  prevPage: string;
  problemSlideTitle: string;
  problemSlideSubtitle: string;
  problemStatementLabel: string;
  problemStatementHint: string;
  whyAiLabel: string;
  whyAiHint: string;
  currentStateLabel: string;
  currentStateHint: string;
  futureStateLabel: string;
  futureStateHint: string;
  inScopeLabel: string;
  inScopeHint: string;
  outOfScopeLabel: string;
  outOfScopeHint: string;
  aiFeasibilityCheckLabel: string;
  checkHasData: string;
  checkUncertainty: string;
  checkImpact: string;
  checkCognitive: string;
  canvasNotesLabel: string;
  canvasNotesHint: string;
  p1SubPage3: string;
  cbSlideHeader: string;
  cbSlideBanner: string;
  cbInstructionTitle: string;
  cbInstructionText: string;
  cbCostBudgetLabel: string;
  cbCostBudgetHint: string;
  cbTimeBudgetLabel: string;
  cbTimeBudgetHint: string;
  cbCostBreakdownTitle: string;
  cbPersonnelCost: string;
  cbComputeCost: string;
  cbDataCost: string;
  cbOpsCost: string;
  cbBenefitsTitle: string;
  cbTangibleSavings: string;
  cbRevenueUplift: string;
  cbRiskReduction: string;
  cbRoiEstimateLabel: string;
  cbRoiEstimateHint: string;
  cbCanvasLabel: string;
  cbCanvasHint: string;
  cbPageNumber: string;
}

export const UI_TRANSLATIONS: Record<Language, UITranslation> = {
  en: {
    brand: 'CPMAI Workbook',
    brandTag: 'Cognitive Project Management for AI',
    org: 'OWJ Business Council',
    by: 'Prepared by',
    sub: 'Your responses automatically save to this device.',
    overallProg: 'Total CPMAI Progress',
    phaseProg: 'Phase Completion',
    stepsLabel: 'Phase Milestones',
    copyBtn: 'Copy Phase Artifacts',
    copiedToast: 'Artifacts copied to clipboard. Ready to paste.',
    resetBtn: 'Clear Phase',
    resetConfirm: 'Are you sure you want to clear your worksheet inputs for this phase?',
    exportBtn: 'Export Project Dossier',
    importBtn: 'Import Backup',
    printBtn: 'Print / Save PDF',
    settingsBtn: 'Project Settings',
    exShow: 'Show Guided Example',
    exHide: 'Hide Example',
    addBtn: 'Add',
    rmBtn: 'Remove',
    savedLabel: 'Saved locally',
    autoSaved: 'Auto-saved',
    readCheckbox: 'I have read and understood the objectives of this phase',
    switchLang: 'فارسی',
    themeToggle: 'Theme',
    projectMetaTitle: 'Project Dossier Information',
    saveMetaBtn: 'Save Project Details',
    closeBtn: 'Close',
    exportModalTitle: 'Complete CPMAI Project Dossier',
    downloadJsonBtn: 'Download JSON Backup',
    copyMdBtn: 'Copy Full Markdown Report',
    importJsonTitle: 'Restore Workbook from JSON',
    importJsonPlaceholder: 'Paste exported JSON content here...',
    applyImportBtn: 'Restore Data',
    importSuccess: 'Project data successfully restored!',
    importError: 'Invalid JSON format. Please check the backup file.',
    phasesNav: [
      'I. Business Understanding',
      'II. Data Understanding',
      'III. Data Preparation',
      'IV. Model Development',
      'V. Model Evaluation',
      'VI. Operationalization'
    ],
    cognitivePatterns: [
      { key: 'predictive', label: 'Predictive Analytics', desc: 'Forecast future events, scores, or classifications using historical data.' },
      { key: 'conversational', label: 'Conversational / Natural Language', desc: 'Interact via human text/speech (chatbots, extraction, summarization).' },
      { key: 'recognition', label: 'Recognition Systems', desc: 'Identify entities, objects, or biometric features in vision/audio data.' },
      { key: 'anomaly', label: 'Patterns & Anomalies', desc: 'Uncover hidden clusters, fraud, deviations, or outliers.' },
      { key: 'hyperpersonalization', label: 'Hyperpersonalization', desc: 'Tailor real-time dynamic experiences to individual users.' },
      { key: 'autonomous', label: 'Autonomous Systems', desc: 'Systems operating with minimal human guidance in dynamic environments.' },
      { key: 'goal_driven', label: 'Goal-Driven Systems', desc: 'Reinforcement and optimization solving complex strategic trade-offs.' }
    ],
    caseStudies: [
      { id: 'banking', name: 'Retail Banking Churn' },
      { id: 'healthcare', name: 'Clinical Patient Triage' },
      { id: 'ecommerce', name: 'E-Commerce Dynamic Pricing' },
      { id: 'manufacturing', name: 'Predictive Equipment Maintenance' }
    ],
    decisionOptions: [
      { id: 'deploy', label: 'Approve for Phase VI Operationalization (Go)' },
      { id: 'iterate_data', label: 'Return to Phase III (Iterate Data & Features)' },
      { id: 'retune_model', label: 'Return to Phase IV (Adjust Architecture / Hyperparameters)' },
      { id: 'reassess_business', label: 'Return to Phase I (Revisit Business Goals & Feasibility)' }
    ],
    footerRights: 'Project Management Institute, Inc. All rights reserved. Provided as part of CPMAI training curriculum.',
    instagram: 'Instagram',
    telegram: 'Telegram',
    website: 'owjbc.com',
    p1SubPage1: 'Page 1: Determine Business Objectives',
    p1SubPage2: 'Page 2: What problem are you solving with AI in this iteration?',
    nextPage: 'Next Page',
    prevPage: 'Previous Page',
    problemSlideTitle: 'What problem are you solving with AI in this iteration?',
    problemSlideSubtitle: 'Formulate the concrete cognitive problem definition, justify why AI is required over rule-based software, and bound the iteration scope.',
    problemStatementLabel: 'Business Problem & Friction Point',
    problemStatementHint: 'What specific business friction, operational delay, or bottleneck occurs?',
    whyAiLabel: 'Why AI? (Cognitive vs Traditional Programming)',
    whyAiHint: 'Why can traditional procedural programming, simple SQL queries, or static rules NOT solve this?',
    currentStateLabel: 'Current State (How is it handled today?)',
    currentStateHint: 'Manual human review, heuristic scripts, or unmanaged bottleneck? Quantify current cost/time.',
    futureStateLabel: 'Desired Future State (In this iteration)',
    futureStateHint: 'What will the operational process look like once this cognitive iteration is delivered?',
    inScopeLabel: 'In-Scope for THIS Iteration',
    inScopeHint: 'What is strictly being developed and delivered in this sprint?',
    outOfScopeLabel: 'Out-of-Scope (Deferred to Future Sprints)',
    outOfScopeHint: 'Prevent scope creep: what is explicitly deferred or excluded?',
    aiFeasibilityCheckLabel: 'CPMAI "Is it an AI Problem?" Feasibility Gate',
    checkHasData: 'Sufficient representative data exists or can be obtained',
    checkUncertainty: 'Business process can tolerate probabilistic uncertainty / non-zero error rate',
    checkImpact: 'Quantifiable business payoff justifies cognitive development cost',
    checkCognitive: 'Task requires perception, pattern recognition, generation, or prediction',
    canvasNotesLabel: 'Worksheet Canvas / Freeform Notes',
    canvasNotesHint: 'Use this space to draft your thoughts, stakeholder notes, or unstructured ideas for this iteration.',
    p1SubPage3: 'Page 3: Cost-Benefit Analysis & Budget',
    cbSlideHeader: 'Subtask: Cost-Benefit Analysis',
    cbSlideBanner: 'What is the cost and time budget for this project?',
    cbInstructionTitle: 'Costs and benefits:',
    cbInstructionText: 'Construct a cost-benefit analysis for the project, which compares the costs of the project with the potential benefits to the business if it is successful. The comparison should be as specific as possible. For example, use monetary measures in a commercial situation.',
    cbCostBudgetLabel: 'Total Cost Budget',
    cbCostBudgetHint: 'What is the overall monetary expenditure allocated for this AI iteration?',
    cbTimeBudgetLabel: 'Time Budget & Schedule',
    cbTimeBudgetHint: 'What is the anticipated iteration duration, sprint milestones, and deployment timeline?',
    cbCostBreakdownTitle: 'Cost Breakdown by Category',
    cbPersonnelCost: 'Personnel & Engineering Talent',
    cbComputeCost: 'Cloud, Infrastructure & GPU Compute',
    cbDataCost: 'Data Acquisition, Cleaning & Labeling',
    cbOpsCost: 'MLOps, Tooling & Production Maintenance',
    cbBenefitsTitle: 'Anticipated Business Benefits & Financial Returns',
    cbTangibleSavings: 'Direct Cost Reductions & Labor Savings',
    cbRevenueUplift: 'Incremental Revenue & Conversion Uplift',
    cbRiskReduction: 'Risk Avoidance & Fraud / Churn Loss Mitigation',
    cbRoiEstimateLabel: 'Net ROI & Payback Timeline',
    cbRoiEstimateHint: 'Quantified ratio of return-on-investment and estimated months to break-even.',
    cbCanvasLabel: 'Interactive Worksheet Box (Page 14)',
    cbCanvasHint: 'Draft your complete cost-benefit calculations, budget figures, and monetary comparisons directly on this canvas.',
    cbPageNumber: '14'
  },
  fa: {
    brand: 'کتاب کار CPMAI',
    brandTag: 'متدولوژی مدیریت پروژه شناختی برای هوش مصنوعی',
    org: 'مشاوران مدیریت کسب و کار اوج',
    by: 'تهیه‌شده توسط',
    sub: 'پاسخ‌های شما به‌صورت خودکار روی همین مرورگر ذخیره می‌شوند.',
    overallProg: 'پیشرفت کل چرخه CPMAI',
    phaseProg: 'پیشرفت فاز جاری',
    stepsLabel: 'گام‌های فاز جاری',
    copyBtn: 'کپی مستندات این فاز',
    copiedToast: 'مستندات کپی شد. آماده پیوست به تکالیف یا گزارش پروژه.',
    resetBtn: 'پاک کردن این فاز',
    resetConfirm: 'آیا از پاک کردن اطلاعات واردشده در این فاز اطمینان دارید؟',
    exportBtn: 'خروجی پرونده کامل پروژه',
    importBtn: 'بازیابی پشتیبان',
    printBtn: 'چاپ / خروجی PDF',
    settingsBtn: 'مشخصات پروژه',
    exShow: 'نمایش مثال راهنما',
    exHide: 'پنهان‌سازی مثال',
    addBtn: 'افزودن',
    rmBtn: 'حذف',
    savedLabel: 'روی دستگاه ذخیره شد',
    autoSaved: 'ذخیره خودکار',
    readCheckbox: 'اهداف، نیازمندی‌ها و چارچوب این فاز را مطالعه کردم',
    switchLang: 'English',
    themeToggle: 'حالت نمایش',
    projectMetaTitle: 'شناسنامه و مشخصات پروژه',
    saveMetaBtn: 'ثبت اطلاعات پروژه',
    closeBtn: 'بستن',
    exportModalTitle: 'پرونده کامل مستندات پروژه بر اساس CPMAI',
    downloadJsonBtn: 'دریافت فایل پشتیبان (JSON)',
    copyMdBtn: 'کپی گزارش کامل مارک‌داون (Markdown)',
    importJsonTitle: 'بازیابی اطلاعات از فایل پشتیبان',
    importJsonPlaceholder: 'محتوای فایل JSON را اینجا جای‌گذاری کنید...',
    applyImportBtn: 'اعمال و بازیابی',
    importSuccess: 'اطلاعات پروژه با موفقیت بازیابی شد!',
    importError: 'فرمت فایل معتبر نیست. لطفاً فایل JSON صحیح را بررسی کنید.',
    phasesNav: [
      'فاز ۱: درک کسب‌وکار',
      'فاز ۲: درک داده‌ها',
      'فاز ۳: آماده‌سازی داده‌ها',
      'فاز ۴: توسعهٔ مدل',
      'فاز ۵: ارزیابی مدل',
      'فاز ۶: عملیاتی‌سازی'
    ],
    cognitivePatterns: [
      { key: 'predictive', label: 'تحلیل‌های پیش‌بینانه (Predictive)', desc: 'پیش‌بینی رویدادها، نمرات اعتباری یا طبقه‌بندی آینده بر اساس الگوهای داده گذشته.' },
      { key: 'conversational', label: 'مکالمه و پردازش متن (Conversational)', desc: 'تعامل انسانی متنی یا صوتی (چت‌بات‌ها، استخراج اطلاعات و خلاصه‌سازی).' },
      { key: 'recognition', label: 'سیستم‌های تشخیص (Recognition)', desc: 'شناسایی اشیاء، چهره، الگوهای تصویری و پردازش سیگنال و گفتار.' },
      { key: 'anomaly', label: 'کشف الگوها و ناهنجاری‌ها (Anomalies)', desc: 'خوشه‌بندی رفتاری، کشف تقلب، شناسایی رفتارهای غیرعادی در شبکه‌ها.' },
      { key: 'hyperpersonalization', label: 'بیش‌شخصی‌سازی (Hyperpersonalization)', desc: 'تطبیق بلادرنگ پیشنهادها و تجربیات کاربری با نیازهای منحصربه‌فرد هر فرد.' },
      { key: 'autonomous', label: 'سیستم‌های خودران (Autonomous)', desc: 'سیستم‌هایی که بدون دخالت پیوسته انسان در محیط‌های پویا تصمیم می‌گیرند.' },
      { key: 'goal_driven', label: 'سیستم‌های هدف‌محور (Goal-Driven)', desc: 'بهینه‌سازی چندمتغیره و یادگیری تقویتی برای حل مسائل پیچیده استراتژیک.' }
    ],
    caseStudies: [
      { id: 'banking', name: 'ریزش مشتریان بانکداری خرد' },
      { id: 'healthcare', name: 'تریاژ بالینی بیماران' },
      { id: 'ecommerce', name: 'قیمت‌گذاری پویا در تجارت الکترونیک' },
      { id: 'manufacturing', name: 'نگهداری و تعمیرات پیش‌بینانه تجهیزات' }
    ],
    decisionOptions: [
      { id: 'deploy', label: 'تایید کامل برای استقرار در فاز ۶ (Go)' },
      { id: 'iterate_data', label: 'بازگشت به فاز ۳ (تکرار آماده‌سازی و مهندسی ویژگی‌ها)' },
      { id: 'retune_model', label: 'بازگشت به فاز ۴ (تنظیم ابرپارامترها و بازآموزی مدل)' },
      { id: 'reassess_business', label: 'بازگشت به فاز ۱ (بازنگری در اهداف تجاری و امکان‌پذیری)' }
    ],
    footerRights: 'کلیه حقوق برای Project Management Institute, Inc محفوظ است. ارائه‌شده در چارچوب سرفصل‌های رسمی دوره CPMAI.',
    instagram: 'اینستاگرام',
    telegram: 'تلگرام',
    website: 'owjbc.com',
    p1SubPage1: 'صفحه ۱: تعیین اهداف کسب‌وکار',
    p1SubPage2: 'صفحه ۲: حل چه مسئله‌ای با هوش مصنوعی در این تکرار؟',
    nextPage: 'صفحه بعد',
    prevPage: 'صفحه قبل',
    problemSlideTitle: 'What problem are you solving with AI in this iteration?',
    problemSlideSubtitle: 'تعریف دقیق مسئله، تبیین چرایی نیاز به هوش مصنوعی به جای نرم‌افزار سنتی و تعیین مرزهای این تکرار (اسپرینت).',
    problemStatementLabel: 'تعریف مسئله و نقطه اصطکاک کسب‌وکار',
    problemStatementHint: 'دقیقاً چه مشکل، تاخیر، هزینه یا نارضایتی در فرآیند فعلی کسب‌وکار رخ می‌دهد؟',
    whyAiLabel: 'چرا هوش مصنوعی؟ (تفاوت سیستم شناختی با برنامه‌نویسی سنتی)',
    whyAiHint: 'چرا قوانین شرطی ساده، کدنویسی معمولی یا کوئری پایگاه داده قادر به حل این مسئله نیستند؟',
    currentStateLabel: 'وضعیت فعلی (اکنون فرآیند چگونه انجام می‌شود؟)',
    currentStateHint: 'فرآیند دستی، حدس و گمان انسانی یا نادیده گرفتن؟ هزینه، زمان و نرخ خطای فعلی را برآورد کنید.',
    futureStateLabel: 'وضعیت مطلوب (در این تکرار با هوش مصنوعی)',
    futureStateHint: 'پس از پیاده‌سازی این اسپرینت هوش مصنوعی، چه تغییری حاصل خواهد شد؟ خروجی عملیاتی چیست؟',
    inScopeLabel: 'محدوده درون این تکرار (In-Scope)',
    inScopeHint: 'دقیقاً چه مواردی در این اسپرینت ساخته و تحویل داده می‌شود؟',
    outOfScopeLabel: 'خارج از محدوده این تکرار (Out-of-Scope)',
    outOfScopeHint: 'پیشگیری از خزش محدوده: چه ویژگی‌هایی آگاهانه به اسپرینت‌های آینده موکول می‌شود؟',
    aiFeasibilityCheckLabel: 'چک‌لیست سنجش امکان‌پذیری و ماهیت هوش مصنوعی در CPMAI',
    checkHasData: 'داده‌های تاریخی کافی و معرف جامعه در دسترس است یا امکان جمع‌آوری دارد',
    checkUncertainty: 'کسب‌وکار قابلیت پذیرش ماهیت احتمالی و خطای کنترل‌شده هوش مصنوعی را دارد',
    checkImpact: 'ارزش تجاری حاصله، هزینه و پیچیدگی توسعه سیستم هوش مصنوعی را توجیه می‌کند',
    checkCognitive: 'انجام کار نیازمند ادراک، کشف الگو، پیش‌بینی یا تصمیم‌گیری شناختی فراتر از قوانین ثابت است',
    canvasNotesLabel: 'بوم یادداشت و ثبت آزاد پاسخ برگه تمرین',
    canvasNotesHint: 'این فضا مشابه اسلاید اصلی کتاب کار برای یادداشت‌برداری آزاد و ثبت نکات کارگاهی در نظر گرفته شده است.',
    p1SubPage3: 'صفحه ۳: تحلیل هزینه-فایده و بودجه (اسلاید ۱۴)',
    cbSlideHeader: 'Subtask: Cost-Benefit Analysis',
    cbSlideBanner: 'What is the cost and time budget for this project?',
    cbInstructionTitle: 'هزینه‌ها و منافع (Costs and benefits):',
    cbInstructionText: 'یک تحلیل هزینه-فایده برای پروژه تدوین کنید که هزینه‌های پروژه را با منافع بالقوه آن برای کسب‌وکار در صورت موفقیت مقایسه کند. این مقایسه باید تا حد ممکن مشخص و دقیق باشد؛ برای مثال در شرایط تجاری، از معیارهای پولی و مالی استفاده نمایید.',
    cbCostBudgetLabel: 'بودجه هزینه‌ای کل پروژه (Cost Budget)',
    cbCostBudgetHint: 'کل بودجه مالی تخصیص‌یافته برای این تکرار هوش مصنوعی چقدر است؟ (شامل دستمزد، سرور، داده و ابزارها)',
    cbTimeBudgetLabel: 'بودجه زمانی و زمان‌بندی پروژه (Time Budget)',
    cbTimeBudgetHint: 'طول دوره این اسپرینت، نقاط عطف فازها و موعد عرضه نسخه آزمایشی چقدر است؟',
    cbCostBreakdownTitle: 'تفکیک هزینه‌ها به تفکیک سرفصل‌ها',
    cbPersonnelCost: 'نیروی انسانی و مهندسین (دیتا ساینتیست، توسعه‌دهنده)',
    cbComputeCost: 'محاسبات ابری و پردازش گرافیکی (GPU / Cloud)',
    cbDataCost: 'تأمین، پاکسازی و برچسب‌گذاری داده‌ها',
    cbOpsCost: 'عملیات، ابزارها و پایش مداوم مدل (MLOps)',
    cbBenefitsTitle: 'منافع بالقوه و بازدهی مالی برای کسب‌وکار',
    cbTangibleSavings: 'کاهش مستقیم هزینه‌های عملیاتی و صرفه‌جویی زمان',
    cbRevenueUplift: 'رشد درآمد، افزایش نرخ تبدیل و فروش بیشتر',
    cbRiskReduction: 'کاهش ریسک، جلوگیری از ریزش مشتری یا پیشگیری از تقلب',
    cbRoiEstimateLabel: 'برآورد نرخ بازگشت سرمایه (ROI) و دوره بازگشت',
    cbRoiEstimateHint: 'محاسبه تخمینی نرخ بازگشت سرمایه (نسبت فایده به هزینه) و تعداد ماه‌های جبران هزینه.',
    cbCanvasLabel: 'بوم پاسخ کارگاهی (مطابق اسلاید رسمی صفحه ۱۴)',
    cbCanvasHint: 'فضای اصلی برگه تمرین جهت نگارش کامل تحلیل هزینه-فایده، اعداد و مقایسه‌های مالی و زمانی.',
    cbPageNumber: '۱۴'
  }
};
