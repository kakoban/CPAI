import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { IndustryTrackId, DisciplineId } from '../types/industryTrack';
import { getDisciplineMetadata, getDisciplineExampleContent } from '../data/disciplineExamplesRegistry';
import { ArrowLeft, ArrowRight, Lightbulb, Calculator, Check, Copy, RotateCcw, DollarSign, Clock, TrendingUp, FileText } from 'lucide-react';

interface Page4Props {
  lang: Language;
  industryTrack?: IndustryTrackId;
  disciplineId?: DisciplineId;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage3: () => void;
  onGoToPage5?: () => void;
}

export const Page4CostBenefit: React.FC<Page4Props> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  disciplineId,
  content,
  onChangeContent,
  onGoToPage3,
  onGoToPage5
}) => {
  const [copied, setCopied] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const isPetro = industryTrack === 'ENERGY_PETRO';
  const discMeta = disciplineId ? getDisciplineMetadata(disciplineId) : null;
  const discContent = disciplineId ? getDisciplineExampleContent(disciplineId) : null;

  // Structured breakdown states for the interactive calculator
  const [costPersonnel, setCostPersonnel] = useState(isPetro ? '95000' : '85000');
  const [costCompute, setCostCompute] = useState(isPetro ? '25000' : '20000');
  const [costData, setCostData] = useState(isPetro ? '20000' : '15000');
  const [costOps, setCostOps] = useState(isPetro ? '20000' : '15000');

  const [benefitSavings, setBenefitSavings] = useState(isPetro ? '1400000' : '650000');
  const [benefitRevenue, setBenefitRevenue] = useState(isPetro ? '1800000' : '750000');
  const [benefitRisk, setBenefitRisk] = useState(isPetro ? '450000' : '300000');

  const [timeWeeks, setTimeWeeks] = useState(isPetro ? '16' : '14');

  const t = {
    en: {
      badge: `CPMAI Phase I · Page 4 of 5 (${discMeta ? discMeta.titleEn : isPetro ? 'Oil & Gas Petrochemical Track' : 'Civil Megaproject Track'})`,
      subtaskH: 'Subtask: Cost-Benefit Analysis',
      costsAndBenefitsLabel: 'Costs and benefits:',
      costsAndBenefitsText:
        'Construct a cost-benefit analysis for the project, which compares the costs of the project with the potential benefits to the business if it is successful. The comparison should be as specific as possible. For example, use monetary measures in a commercial situation.',
      slideBanner: 'What is the cost and time budget for this project?',
      promptHint:
        'Specify the financial budget, resource costs (talent, cloud/GPU, data, maintenance), project schedule/time budget, and quantifiable financial return (cost reduction, revenue uplift, risk avoidance).',
      templateBtn: 'Insert Cost-Benefit Template',
      exampleBtn: discMeta ? `Fill ${discMeta.shortTitleEn} Cost-Benefit Example` : isPetro ? 'Fill Refinery Preheat Cost-Benefit Example' : 'Fill Metro TBM Cost-Benefit Example',
      calcToggleBtn: 'Interactive Financial ROI Estimator',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      prevPageBtn: 'Previous Page: Determine Business Success Criteria',
      nextPageBtn: 'Next Page: Expected ROI (Page 15)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      pageNumber: '14',
      tipsTitle: 'Key CPMAI Guidance for Cost-Benefit & Budget Analysis:',
      tip1:
        'Compare specific monetary measures: Avoid vague claims like "improved efficiency" — translate into saved dollar amounts, labor hours, or preserved customer lifetime value.',
      tip2:
        'Factor in hidden AI costs: Beyond initial modeling, account for data ingestion, annotation/labeling, GPU cloud infrastructure, and ongoing model monitoring/retraining.',
      tip3:
        'Bound the time budget to agile iterations: Define milestone gates (Proof-of-Concept, Evaluation Decision Gate, Pilot Rollout) rather than open-ended timelines.',
      tip4:
        'Risk of inaction: Consider the cost to the business if this AI project is NOT implemented (e.g. competitor loss, worsening churn rate).',
      calcTitle: 'Quick Financial & Schedule Calculator',
      calcApplyBtn: 'Append Financial Breakdown to Canvas',
      totalCost: 'Total Cost Budget',
      totalBenefit: 'Total Potential Business Benefit',
      netBenefit: 'Net Business Payoff',
      roiRatio: 'Estimated ROI',
      timeDuration: 'Time Budget Duration',
      weeks: 'weeks'
    },
    fa: {
      badge: `فاز اول CPMAI · صفحه ۴ از ۵ (${isPetro ? 'حوزه تخصصی نفت و گاز' : 'حوزه تخصصی مگاپروژه‌های عمرانی'})`,
      subtaskH: 'زیروظیفه: تحلیل هزینه-فایده (Subtask: Cost-Benefit Analysis)',
      costsAndBenefitsLabel: 'هزینه‌ها و منافع (Costs and benefits):',
      costsAndBenefitsText:
        'یک تحلیل هزینه-فایده برای پروژه تدوین کنید که هزینه‌های پروژه را با منافع بالقوه آن برای کسب‌وکار در صورت موفقیت مقایسه کند. این مقایسه باید تا حد ممکن مشخص و دقیق باشد؛ برای مثال در شرایط تجاری، از معیارهای پولی و مالی استفاده نمایید.',
      slideBanner: 'What is the cost and time budget for this project?',
      promptHint:
        'بودجه مالی، هزینه‌های منابع (متخصصان، زیرساخت ابری و پردازش GPU، تأمین داده، نگهداری)، بودجه زمانی و زمان‌بندی پروژه و بازدهی مالی سنجش‌پذیر (کاهش هزینه، درآمد افزایشی، جلوگیری از زیان) را ثبت نمایید.',
      templateBtn: 'درج قالب تحلیل هزینه-فایده و بودجه',
      exampleBtn: discMeta ? `پر کردن با تحلیل هزینه-فایده ${discMeta.shortTitleFa}` : isPetro ? 'پر کردن با نمونه پالایشگاهی (هزینه-فایده)' : 'پر کردن با نمونه مگاپروژه احداث مترو (هزینه-فایده)',
      calcToggleBtn: 'ماشین‌حساب تعاملی برآورد ROI و بودجه',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      prevPageBtn: 'صفحه قبل: تعیین معیارهای موفقیت کسب‌وکار',
      nextPageBtn: 'صفحه بعد: برآورد نرخ بازگشت سرمایه (اسلاید ۱۵)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      pageNumber: '۱۴',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای تحلیل هزینه-فایده و بودجه‌بندی:',
      tip1:
        'از معیارهای پولی و سنجش‌پذیر استفاده کنید: از اصطلاحات مبهم مانند «بهبود کارایی» پرهیز کنید؛ آن را به رقم مشخص ریالی/دلاری، ساعت صرفه‌جویی نیروی انسانی یا ارزش حفظ مشتری تبدیل نمایید.',
      tip2:
        'هزینه‌های پنهان هوش مصنوعی را در نظر بگیرید: علاوه بر کدنویسی، هزینه‌های پاکسازی داده، زیرساخت ابری پردازشگرهای GPU و پایش مداوم مدل در فاز عملیات را بودجه‌بندی کنید.',
      tip3:
        'بودجه زمانی را به تکرارهای چابک مقید کنید: نقاط عطف مشخص (اثبات مفهوم، گیت ارزیابی فاز ۵، عرضه آزمایشی در پایلوت) تعیین کنید تا پروژه گرفتار زمان‌بندی بی‌پایان نشود.',
      tip4:
        'هزینه عدم اقدام را بسنجید: بررسی کنید در صورت عدم اجرای این پروژه، سازمان چه مبالغی را به رقبا یا به دلیل ریزش و ناکارآمدی از دست خواهد داد.',
      calcTitle: 'محاسبه‌گر سریع مالی و زمان‌بندی',
      calcApplyBtn: 'پیوست جدول محاسبات به انتهای بوم',
      totalCost: 'کل بودجه هزینه‌ای پروژه',
      totalBenefit: 'کل منافع و بازدهی مالی بالقوه',
      netBenefit: 'ارزش خالص حاصله (سود خالص)',
      roiRatio: 'نرخ بازگشت سرمایه تخمینی (ROI)',
      timeDuration: 'بودجه زمانی اسپرینت',
      weeks: 'هفته'
    }
  }[lang];

  // Calculations
  const numPersonnel = parseFloat(costPersonnel) || 0;
  const numCompute = parseFloat(costCompute) || 0;
  const numData = parseFloat(costData) || 0;
  const numOps = parseFloat(costOps) || 0;
  const totalCostVal = numPersonnel + numCompute + numData + numOps;

  const numSavings = parseFloat(benefitSavings) || 0;
  const numRevenue = parseFloat(benefitRevenue) || 0;
  const numRisk = parseFloat(benefitRisk) || 0;
  const totalBenefitVal = numSavings + numRevenue + numRisk;

  const netPayoffVal = totalBenefitVal - totalCostVal;
  const roiPercent = totalCostVal > 0 ? Math.round((netPayoffVal / totalCostVal) * 100) : 0;

  const handleInsertTemplate = () => {
    const templateEn = `1. Cost Budget Breakdown:
- Personnel & Engineering: $75,000 (Data Scientist, ML Engineer, Domain Expert for 14 weeks)
- Cloud & Compute Infrastructure: $18,000 (GPU training instances, data storage, CI/CD pipelines)
- Data Acquisition & Annotation: $12,000 (Historical database extraction, feature tagging)
- MLOps, Tooling & Operational Maintenance: $15,000 (Model monitoring, drift alerts, API hosting)
- Total Estimated Cost Budget: $120,000

2. Time Budget & Iteration Milestones:
- Total Iteration Duration: 14 Weeks
  * Weeks 1-3: Data Understanding & Extraction (Phase II)
  * Weeks 4-7: Feature Engineering & Preprocessing (Phase III)
  * Weeks 8-11: Model Development, Baseline & Validation (Phase IV)
  * Weeks 12-13: Model Evaluation Gate & Business KPI Audit (Phase V)
  * Week 14: Pilot Deployment & Operationalization Handover (Phase VI)

3. Anticipated Business Benefits (Monetary):
- Tangible Cost Savings: $140,000 / year (Reduced manual churn auditing labor & outbound calls)
- Revenue Retention / Uplift: $320,000 / year (Preserving at-risk high-balance deposits)
- Risk / Loss Mitigation: $80,000 / year (Preventing competitor fee drain)
- Total Anticipated Annual Benefit: $540,000

4. Cost-Benefit Comparison & ROI Summary:
- Net Financial Payoff (Year 1): $540,000 - $120,000 = $420,000
- Return on Investment (ROI): 350%
- Payback Period: ~2.7 months following operational deployment.`;

    const templateFa = `۱. تفکیک بودجه هزینه‌ای پروژه (Cost Budget Breakdown):
- نیروی انسانی و متخصصین: ۷۵,۰۰۰ دلار / معادل ۳.۸ میلیارد تومان (دیتا ساینتیست، مهندس یادگیری ماشین، خبره کسب‌وکار برای ۱۴ هفته)
- زیرساخت محاسباتی و سرورهای GPU: ۱۸,۰۰۰ دلار (آموزش مدل، ذخیره‌سازی ابری و خطوط لوله CI/CD)
- استخراج، پالایش و برچسب‌گذاری داده‌ها: ۱۲,۰۰۰ دلار (توسعه اتصالات پایگاه داده و مهندسی داده)
- ابزارهای MLOps و نگهداری عملیاتی: ۱۵,۰۰۰ دلار (پایش انحراف مدل، هشدارها و میزبانی API)
- کل بودجه هزینه‌ای برآورد شده: ۱۲۰,۰۰۰ دلار (۶ میلیارد تومان)

۲. بودجه زمانی و زمان‌بندی نقاط عطف پروژه (Time Budget):
- کل طول زمان تکرار: ۱۴ هفته
  * هفته‌های ۱ تا ۳: درک داده‌ها و پایپ‌لاین اولیه (فاز ۲)
  * هفته‌های ۴ تا ۷: مهندسی ویژگی‌ها و پیش‌پردازش داده‌ها (فاز ۳)
  * هفته‌های ۸ تا ۱۱: آموزش مدل‌های یادگیری ماشین، مدل پایه و اعتبارسنجی (فاز ۴)
  * هفته‌های ۱۲ تا ۱۳: گیت ارزیابی مدل و بازبینی شاخص‌های تجاری (فاز ۵)
  * هفته ۱۴: استقرار نسخه آزمایشی در شعب پایلوت و تحویل عملیاتی (فاز ۶)

۳. منافع بالقوه کسب‌وکار بر حسب معیارهای مالی (Anticipated Business Benefits):
- صرفه‌جویی مستقیم در هزینه‌های عملیاتی: ۱۴۰,۰۰۰ دلار سالانه (کاهش ساعات کار دستی و فرآیندهای لغو حساب)
- حفظ منابع مالی و افزایش درآمد: ۳۲۰,۰۰۰ دلار سالانه (حفظ سپرده‌های در معرض ریسک خروج)
- پیشگیری از زیان و ریسک رقابتی: ۸۰,۰۰۰ دلار سالانه (جلوگیری از مهاجرت مشتریان به نئوبانک‌ها)
- کل منافع مالی سالانه برآورد شده: ۵۴۰,۰۰۰ دلار (۲۷ میلیارد تومان)

۴. مقایسه هزینه-فایده و نتیجه‌گیری توجیه اقتصادی (ROI & Viability):
- سود خالص مالی (سال اول): ۵۴۰,۰۰۰ منهای ۱۲۰,۰۰۰ = ۴۲۰,۰۰۰ دلار سود خالص
- نرخ بازگشت سرمایه (ROI): ۳۵۰ درصد
- دوره بازگشت سرمایه: کمتر از ۳ ماه پس از استقرار عملیاتی مدل در شعب بانک.`;

    onChangeContent(lang === 'fa' ? templateFa : templateEn);
  };

  const handleInsertExample = () => {
    const exampleEnCivil = `Project Cost-Benefit Analysis: Urban Metro TBM Ground Subsidence Forecasting

1. Project Cost Budget: $135,000 total iteration investment
- Lead Geotechnical AI Specialist & MLOps Engineer (3.5 months): $85,000
- High-rate IoT telemetry & borehole sensor ingestion infrastructure: $20,000
- Historic TBM drive telemetry extraction & 3D BIM spatial mapping: $15,000
- Tunnel site edge server appliance (Class 1 Div 2 safe) & runbook: $15,000

2. Project Time Budget & Phased Schedule: 14 Calendar Weeks
- Phase II (Data Understanding): Weeks 1-3 [TBM ring telemetry & inclinometer database sync]
- Phase III (Data Preparation): Weeks 4-7 [Spatial-temporal feature engineering & chainage alignment]
- Phase IV (Model Development): Weeks 8-11 [Bi-LSTM vs Physics-Informed Neural Network benchmarks]
- Phase V (Evaluation Decision Gate): Weeks 12-13 [Simulated crossing test with Lead Consultant]
- Phase VI (Pilot Operationalization): Week 14 [Deployment in TBM #1 navigation cabin]

3. Quantified Potential Business Benefits (Annualized):
- Work Stoppage Avoidance: Preventing two 14-day emergency TBM shutdowns saves $650,000 in heavy plant idle costs.
- Circular 4311 Claim Defense: Eliminating contractor delay disputes (Clause 30) mitigates $750,000 in direct claims.
- Utility Rupture Liability Avoidance: Proactive alert suppresses $300,000 in pressurized municipal gas line risk.
- Total Gross Annual Financial Benefit: $1,700,000

4. Definitive Cost-Benefit Conclusion:
With an iteration cost of $135,000 yielding $1.7M in year-one risk and delay savings, the project produces an ROI of 1,159% and pays for itself within 1.1 months. It is exceptionally viable under CPMAI standards.`;

    const exampleFaCivil = `تحلیل هزینه-فایده و بودجه پروژه: سامانه هوش مصنوعی پیش‌بینی نشست زمین در حفاری مکانیزه مترو

۱. بودجه هزینه‌ای پروژه: ۱۳۵,۰۰۰ دلار (سرمایه‌گذاری کل اسپرینت)
- تیم فنی متخصص (متخصص ارشد هوش مصنوعی ژئوتکنیک و مهندس MLOps برای ۳.۵ ماه): ۸۵,۰۰۰ دلار
- زیرساخت جمع‌آوری داده‌های IoT سنسورهای ابزار دقیق گمانه‌ها: ۲۰,۰۰۰ دلار
- استخراج تاریخچه لاگ‌های TBM و انطباق با مدل سه‌بعدی BIM: ۱۵,۰۰۰ دلار
- تجهیز سرور لبه (Edge Server) صنعتی در اتاق کنترل کارگاهی و تدوین راهنمای عملیات: ۱۵,۰۰۰ دلار

۲. بودجه زمانی و نقاط عطف متدولوژی: ۱۴ هفته کاری
- فاز ۲ (درک داده‌ها): هفته‌های ۱ تا ۳ [اتصال و همگام‌سازی تلمتری پیشروی TBM با پین‌های نقشه‌برداری]
- فاز ۳ (آماده‌سازی داده‌ها): هفته‌های ۴ تا ۷ [مهندسی ویژگی‌های مکانی-زمانی و ایستگاه‌بندی محور تونل]
- فاز ۴ (توسعه مدل): هفته‌های ۸ تا ۱۱ [توسعه شبکه عصبی Bi-LSTM و اعتبارسنجی با خطای کمتر از ۱ میلی‌متر]
- فاز ۵ (ارزیابی نتایج و گیت تصمیم‌گیری): هفته‌های ۱۲ تا ۱۳ [آزمون شبیه‌سازی عبور از زیر مجاری آب با مهندس مشاور]
- فاز ۶ (استقرار پایلوت): هفته ۱۴ [استقرار بر خط در اتاق اپراتور TBM شماره ۱]

۳. منافع بالقوه تجاری بر حسب معیارهای مالی (سالانه):
- جلوگیری از توقف عملیات TBM: پیشگیری از دو توقف اضطراری ۱۴ روزه = ۶۵۰,۰۰۰ دلار صرفه‌جویی در هزینه خواب ماشین‌آلات.
- دفاع در برابر ادعاهای تاخیرات پیمانکار: حذف ادعای تاخیرات مجاز ماده ۳۰ نشریه ۴۳۱۱ = ۷۵۰,۰۰۰ دلار صرفه‌جویی در دعاوی مالی.
- پیشگیری از خسارت تخریب تاسیسات زیرسطحی: حذف ریسک حوادث انفجار لوله‌های گاز = ۳۰۰,۰۰۰ دلار.
- کل منافع مالی سال اول: ۱,۷۰۰,۰۰۰ دلار (بیش از ۸۵ میلیارد تومان)

۴. جمع‌بندی مقایسه هزینه-فایده:
پروژه با هزینه ۱۳۵,۰۰۰ دلار و منفعت سالانه ۱,۷۰۰,۰۰۰ دلار، نرخ بازگشت سرمایه ۱,۱۵۹٪ و دوره بازگشت کمتر از ۱.۵ ماه دارد و طبق متدولوژی CPMAI دارای توجیه اقتصادی ممتاز است.`;

    const exampleEnPetro = `Project Cost-Benefit Analysis: Crude Preheat Train Fouling & Flaring Mitigation

1. Project Cost Budget: $160,000 total iteration investment
- Industrial Chemical Process AI Engineers (2 FT resources x 4 months): $95,000
- Isolated Level-3 OT edge compute & real-time historian interfaces: $25,000
- 36-month DCS telemetry ingestion & mass-energy reconciliation pipeline: $20,000
- Industrial cybersecurity hardening (IEC 62443 compliance) & HAZOP review: $20,000

2. Project Time Budget & Phased Schedule: 16 Calendar Weeks
- Phase II (Data Understanding): Weeks 1-3 [Audit 12k DCS sensor tags & GC lab assay sync]
- Phase III (Data Preparation): Weeks 4-8 [Mass-energy reconciliation & clean U-value calculation]
- Phase IV (Model Development): Weeks 9-12 [Hybrid Ebert-Panchal kinetics + XGBoost training]
- Phase V (Evaluation Decision Gate): Weeks 13-14 [HAZOP process safety review with Operations Chief]
- Phase VI (Pilot Operationalization): Weeks 15-16 [CCR supervisory screen integration & APC link]

3. Quantified Potential Business Benefits (Annualized):
- Furnace Fuel Gas Conservation: 3.2% thermal efficiency recovery saves $1,400,000 in fuel gas annually.
- Unplanned Shutdown & Flaring Prevention: Eliminating 1 emergency plant turnaround avoids $1,800,000 in flaring losses.
- Exchanger Tube Lifespan Extension: Optimal descaling reduces mechanical stress, saving $450,000 in retubing capex.
- Total Gross Annual Financial Benefit: $3,650,000

4. Definitive Cost-Benefit Conclusion:
With an upfront investment of $160,000 delivering $3,650,000 in annual thermal and operational savings, the project yields an ROI of 2,181% and amortizes within 16 days. The economic justification is overwhelmingly verified.`;

    const exampleFaPetro = `تحلیل هزینه-فایده و بودجه پروژه: سامانه هوش مصنوعی پیش‌بینی رسوب مبدل‌ها و کاهش مشعل‌سوزی پالایشگاه

۱. بودجه هزینه‌ای پروژه: ۱۶۰,۰۰۰ دلار (سرمایه‌گذاری کل اسپرینت)
- تیم فنی متخصص (مهندسان ارشد هوش مصنوعی فرآیندهای نفت و پتروشیمی برای ۴ ماه): ۹۵,۰۰۰ دلار
- سرورهای لبه پردازش امن در شبکه OT پالایشگاه و درگاه‌های OSIsoft PI: ۲۵,۰۰۰ دلار
- استخراج تاریخچه ۳۶ ماهه دیتای DCS و پایپ‌لاین موازنه جرم و انرژی: ۲۰,۰۰۰ دلار
- استانداردهای امنیت صنعتی IEC 62443، ممیزی ایمنی HAZOP و راهنمای عملیات: ۲۰,۰۰۰ دلار

۲. بودجه زمانی و نقاط عطف متدولوژی: ۱۶ هفته کاری
- فاز ۲ (درک داده‌ها): هفته‌های ۱ تا ۳ [ممیزی تگ‌های حرارتی و فشار DCS و انطباق با آزمایش‌های نفت خام]
- فاز ۳ (آماده‌سازی داده‌ها): هفته‌های ۴ تا ۸ [اعتبارسنجی موازنه جرم و انرژی و محاسبه ضریب تمیز انتقال حرارت]
- فاز ۴ (توسعه مدل): هفته‌های ۹ تا ۱۲ [ترکیب معادلات سینتیک رسوب با مدل‌های گرادیان بوستینگ]
- فاز ۵ (ارزیابی نتایج و گیت تصمیم‌گیری): هفته‌های ۱۳ تا ۱۴ [جلسه ممیزی ایمنی HAZOP با رئیس بهره‌برداری]
- فاز ۶ (استقرار پایلوت): هفته‌های ۱۵ تا ۱۶ [اتصال به اتاق کنترل مرکزی پالایشگاه و سامانه APC]

۳. منافع بالقوه تجاری بر حسب معیارهای مالی (سالانه):
- صرفه‌جویی در سوخت کوره: بهبود ۳.۲ درصدی راندمان حرارتی = ۱,۴۰۰,۰۰۰ دلار صرفه‌جویی سالانه در گاز سوخت.
- پیشگیری از شات‌دان و مشعل‌سوزی: جلوگیری از یک توقف ناخواسته پالایشگاه = ۱,۸۰۰,۰۰۰ دلار حفظ تولید و کاهش فلرینگ.
- افزایش طول عمر لوله‌های مبدل: کاهش شوک‌های دمایی = ۴۵۰,۰۰۰ دلار صرفه‌جویی در تعمیرات اساسی.
- کل منافع مالی سال اول: ۳,۶۵۰,۰۰۰ دلار (بیش از ۱۸۰ میلیارد تومان)

۴. جمع‌بندی مقایسه هزینه-فایده:
پروژه با هزینه ۱۶۰,۰۰۰ دلار و منفعت سالانه ۳,۶۵۰,۰۰۰ دلار، نرخ بازگشت سرمایه ۲,۱۸۱٪ و دوره بازگشت کمتر از ۱ ماه دارد و از منظر متدولوژی CPMAI یک سرمایه‌گذاری استراتژیک فوق‌العاده است.`;

    let selectedEn = isPetro ? exampleEnPetro : exampleEnCivil;
    let selectedFa = isPetro ? exampleFaPetro : exampleFaCivil;

    if (discContent) {
      selectedEn = `Project Cost-Benefit Analysis: ${discContent.titleEn}

1. Estimated Investment Budget:
${discContent.costBenefitSummaryEn}

2. Projected Financial Dividends & ROI:
- ${discContent.roiEstimateEn}
- Focus Area: Mitigating critical failure modes and accelerating project turnover.`;

      selectedFa = `تحلیل هزینه-فایده و بودجه پروژه: ${discContent.titleFa}

۱. برآورد بودجه سرمایه‌گذاری و منافع:
${discContent.costBenefitSummaryFa}

۲. نرخ بازگشت سرمایه و بازدهی مالی:
- ${discContent.roiEstimateFa}
- تمرکز اصلی: رفع گلوگاه‌های اجرایی و تضمین سرعت تحویل پروژه.`;
    }

    onChangeContent(lang === 'fa' ? selectedFa : selectedEn);
  };

  const handleAppendCalculatorResults = () => {
    const summaryText =
      lang === 'fa'
        ? `\n\n--- جدول محاسبات مالی و بودجه زمانی استخراج‌شده از محاسبه‌گر ---
• کل بودجه هزینه‌ای: $${totalCostVal.toLocaleString()} (نیروی انسانی: $${numPersonnel.toLocaleString()} | پردازش: $${numCompute.toLocaleString()} | داده: $${numData.toLocaleString()} | ابزارها: $${numOps.toLocaleString()})
• کل منافع مالی بالقوه: $${totalBenefitVal.toLocaleString()} (صرفه‌جویی مستقیم: $${numSavings.toLocaleString()} | افزایش درآمد: $${numRevenue.toLocaleString()} | کاهش ریسک: $${numRisk.toLocaleString()})
• بازدهی خالص پروژه (سود خالص): $${netPayoffVal.toLocaleString()}
• نرخ بازگشت سرمایه برآورد شده (ROI): ${roiPercent}%
• طول دوره زمانی تکرار: ${timeWeeks} هفته کاری`
        : `\n\n--- Financial & Schedule Summary Calculated ---
• Total Cost Budget: $${totalCostVal.toLocaleString()} (Talent: $${numPersonnel.toLocaleString()} | Compute: $${numCompute.toLocaleString()} | Data: $${numData.toLocaleString()} | Ops: $${numOps.toLocaleString()})
• Total Business Benefits: $${totalBenefitVal.toLocaleString()} (Direct Savings: $${numSavings.toLocaleString()} | Revenue: $${numRevenue.toLocaleString()} | Risk Avoidance: $${numRisk.toLocaleString()})
• Net Business Payoff: $${netPayoffVal.toLocaleString()}
• Estimated ROI: ${roiPercent}%
• Time Budget Duration: ${timeWeeks} calendar weeks`;

    onChangeContent((content || '') + summaryText);
  };

  const handleCopy = () => {
    if (!content) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Page Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#00738c] text-white">
            {t.badge}
          </span>
          <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {lang === 'fa' ? 'کتاب کار رسمی CPMAI · مؤسسه PMI' : 'Official CPMAI Workbook · PMI'}
          </span>
        </div>

        <button
          type="button"
          onClick={onGoToPage3}
          className="flex items-center gap-1.5 text-xs font-medium text-[#00738c] dark:text-[#6fb3c6] hover:underline"
        >
          {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.prevPageBtn}</span>
        </button>
      </div>

      {/* Main Slide Card Container (1-to-1 fidelity with uploaded images) */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl border border-[#d9dad5] dark:border-[#2d3942] overflow-hidden shadow-xs">
        {/* Slide Header: Subtask Title */}
        <div className="p-5 sm:p-6 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c2830] dark:text-[#e8ebe9] font-sans">
            {t.subtaskH}
          </h2>
        </div>

        {/* Callout / Instruction Box (Authentic match to slide top section) */}
        <div className="px-5 sm:px-6 mb-5">
          <div className="relative rounded-lg bg-[#faede5] dark:bg-[#281b15] border-s-4 border-[#3c2a1e] dark:border-[#b37446] p-4 sm:p-5 shadow-xs">
            {/* The double triangle watermark icon from the slide (top right) */}
            <div className="absolute top-3 end-3 opacity-60 dark:opacity-40 text-[#b58c70] dark:text-[#c49b80] pointer-events-none flex flex-col items-center">
              <svg width="22" height="26" viewBox="0 0 24 28" fill="currentColor">
                <polygon points="12,1 23,12 1,12" />
                <polygon points="12,14 23,25 1,25" />
              </svg>
            </div>

            <div className="pe-8">
              <p className="text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                <strong className="font-bold text-[#1c2830] dark:text-[#ffffff]">
                  {t.costsAndBenefitsLabel}{' '}
                </strong>
                <span className="text-[#3c4a52] dark:text-[#d0d7dd]">
                  {t.costsAndBenefitsText}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Question Header: Dark Cyan / Teal banner matching image */}
        <div className="px-5 sm:px-6">
          <div className="bg-[#00738c] text-white px-5 py-3 rounded-t-lg font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
            <span dir="ltr" className="tracking-tight font-sans">
              {t.slideBanner}
            </span>
            <span className="text-[11px] font-mono opacity-85 px-2 py-0.5 rounded bg-black/20">
              {lang === 'fa' ? 'اسلاید ۱۴' : 'Slide 14'}
            </span>
          </div>

          {/* Interactive Workspace Canvas (Lavender/Periwinkle container matching image) */}
          <div className="bg-[#e8edf9] dark:bg-[#141f30] border-2 border-t-0 border-[#00738c] rounded-b-lg p-4 sm:p-6 shadow-inner flex flex-col min-h-[480px]">
            {/* Action Bar inside Canvas */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#c8d4eb] dark:border-[#22334d]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleInsertTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.templateBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleInsertExample}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] dark:border-[#6fb3c6] bg-white/70 dark:bg-black/20 hover:bg-white transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{t.exampleBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#2f7d5b] text-[#2f7d5b] dark:text-[#63c496] dark:border-[#63c496] bg-white/70 dark:bg-black/20 hover:bg-white transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{t.calcToggleBtn}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!content}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md bg-white/80 dark:bg-[#1c2830] text-[#1c2830] dark:text-[#e8ebe9] border border-[#c8d4eb] dark:border-[#22334d] hover:bg-white disabled:opacity-40 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copiedToast : t.copyBtn}</span>
                </button>

                {content && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(lang === 'fa' ? 'آیا از پاک کردن متن بوم اطمینان دارید؟' : 'Clear canvas?')) {
                        onChangeContent('');
                      }
                    }}
                    className="p-1.5 rounded-md text-[#b3432f] hover:bg-white/60 dark:hover:bg-black/20 transition-colors"
                    title={t.clearBtn}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Optional Embedded Interactive Calculator Widget */}
            {showCalculator && (
              <div className="mb-4 p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2536] border border-[#00738c]/30 shadow-xs text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="flex items-center gap-2 font-semibold text-[#00738c] dark:text-[#6fb3c6]">
                    <Calculator className="w-4 h-4" />
                    <span>{t.calcTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAppendCalculatorResults}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#2f7d5b] text-white hover:bg-[#25684a] transition-colors"
                  >
                    {t.calcApplyBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Costs Column */}
                  <div className="space-y-2 p-3 rounded-md bg-[#f4f4f1] dark:bg-[#121a24]">
                    <span className="font-semibold text-[#b3432f] dark:text-[#ee8f7a] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      {t.totalCost}: ${totalCostVal.toLocaleString()}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'نیروی انسانی ($)' : 'Personnel ($)'}
                        </label>
                        <input
                          type="number"
                          value={costPersonnel}
                          onChange={(e) => setCostPersonnel(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'رایانش ابری و GPU ($)' : 'Compute & GPU ($)'}
                        </label>
                        <input
                          type="number"
                          value={costCompute}
                          onChange={(e) => setCostCompute(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'تأمین داده ($)' : 'Data ($)'}
                        </label>
                        <input
                          type="number"
                          value={costData}
                          onChange={(e) => setCostData(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'عملیات و MLOps ($)' : 'Ops / Tools ($)'}
                        </label>
                        <input
                          type="number"
                          value={costOps}
                          onChange={(e) => setCostOps(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Benefits Column */}
                  <div className="space-y-2 p-3 rounded-md bg-[#f4f4f1] dark:bg-[#121a24]">
                    <span className="font-semibold text-[#2f7d5b] dark:text-[#63c496] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.totalBenefit}: ${totalBenefitVal.toLocaleString()}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'صرفه‌جویی مستقیم ($)' : 'Cost Savings ($)'}
                        </label>
                        <input
                          type="number"
                          value={benefitSavings}
                          onChange={(e) => setBenefitSavings(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'رشد درآمد ($)' : 'Revenue Uplift ($)'}
                        </label>
                        <input
                          type="number"
                          value={benefitRevenue}
                          onChange={(e) => setBenefitRevenue(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                          {lang === 'fa' ? 'کاهش ریسک ($)' : 'Risk Avoidance ($)'}
                        </label>
                        <input
                          type="number"
                          value={benefitRisk}
                          onChange={(e) => setBenefitRisk(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                        />
                      </div>
                      <div>
                        <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.timeDuration}
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={timeWeeks}
                            onChange={(e) => setTimeWeeks(e.target.value)}
                            className="w-full px-2 py-1 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                          />
                          <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">{t.weeks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Metric Result */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{t.netBenefit}:</span>
                    <span className="font-bold text-sm text-[#2f7d5b] dark:text-[#63c496]">
                      ${netPayoffVal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{t.roiRatio}:</span>
                    <span className="font-bold text-sm px-2 py-0.5 rounded bg-[#00738c] text-white">
                      {roiPercent}% ROI
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Primary Answer Textarea */}
            <textarea
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              placeholder={
                lang === 'fa'
                  ? 'پاسخ و تحلیل هزینه-فایده این تکرار را در این کادر بنویسید:\n۱. بودجه هزینه‌ای (دستمزد، سرورهای ابری GPU، استخراج و پاکسازی داده، ابزارهای نگهداری)\n۲. بودجه زمانی و زمان‌بندی نقاط عطف اسپرینت\n۳. منافع مالی بالقوه (کاهش مستقیم هزینه، رشد درآمد، کاهش ریسک ریزش)\n۴. مقایسه مالی، نرخ بازگشت سرمایه (ROI) و دوره بازگشت سرمایه...'
                  : 'Write your cost-benefit and budget analysis here:\n1. Cost Budget breakdown (Talent, GPU cloud compute, data procurement, MLOps)\n2. Time Budget & iteration milestones\n3. Anticipated business benefits in monetary figures (Cost savings, revenue uplift, loss avoidance)\n4. Specific monetary comparison & net ROI justification...'
              }
              className="flex-1 w-full p-4 sm:p-5 rounded-lg bg-[#ffffff]/90 dark:bg-[#1a293d]/90 text-[#1c2830] dark:text-[#e8ebe9] border border-[#c8d4eb] dark:border-[#22334d] focus:border-[#00738c] focus:outline-none resize-y text-sm sm:text-[15px] leading-relaxed font-sans shadow-inner min-h-[420px]"
            />

            {/* Canvas Footer Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-1">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span>{words} {t.wordCount}</span>
                <span>·</span>
                <span>{chars} {t.charCount}</span>
              </div>

              {/* Corner Watermark Pattern matching bottom right of slide */}
              <div className="opacity-25 dark:opacity-15 pointer-events-none text-[#00738c] dark:text-[#6fb3c6]">
                <svg width="48" height="32" viewBox="0 0 48 32" fill="currentColor">
                  <polygon points="48,32 24,32 48,8" />
                  <polygon points="36,32 12,32 36,8" />
                  <polygon points="24,32 0,32 24,8" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Footer matching Image 1: Copyright on left, Page number on right */}
        <div className="px-5 sm:px-6 py-4 mt-2 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-[#5d6b73] dark:text-[#9aa8b0] border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
          <span dir="ltr" className="tracking-tight">
            {t.pmiCopyright}
          </span>
          <span className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9] px-2 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b]">
            {t.pageNumber}
          </span>
        </div>
      </div>

      {/* CPMAI Methodology Tips Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-2.5">
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

      {/* Navigation Return Button to Page 3 and Next Page to Page 5 */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onGoToPage3}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#ffffff] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] transition-colors shadow-2xs"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبل: معیارهای موفقیت' : 'Back to Page 3'}</span>
        </button>

        {onGoToPage5 && (
          <button
            type="button"
            onClick={onGoToPage5}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-xs"
          >
            <span>{t.nextPageBtn}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
