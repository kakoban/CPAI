export type IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO';

export interface IndustryTrackInfo {
  id: IndustryTrackId;
  titleFa: string;
  titleEn: string;
  shortTitleFa: string;
  shortTitleEn: string;
  taglineFa: string;
  taglineEn: string;
  descriptionFa: string;
  descriptionEn: string;
  iconName: 'Building2' | 'Factory';
  scopePillsFa: string[];
  scopePillsEn: string[];
  governingStandardsFa: string[];
  governingStandardsEn: string[];
  defaultCaseStudy: {
    projectTitleFa: string;
    projectTitleEn: string;
    organizationFa: string;
    organizationEn: string;
    coreProblemFa: string;
    coreProblemEn: string;
    aiPatternFa: string;
    aiPatternEn: string;
    expectedRoiFa: string;
    expectedRoiEn: string;
  };
  accentColor: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
}

export const INDUSTRY_TRACKS: Record<IndustryTrackId, IndustryTrackInfo> = {
  CIVIL_INFRA: {
    id: 'CIVIL_INFRA',
    titleFa: 'مگاپروژه‌های راه، ترابری، شهرسازی و ابنیه کلان',
    titleEn: 'Mega Civil, Transportation & Urban Infrastructure Track',
    shortTitleFa: 'راه و شهرسازی و ابنیه',
    shortTitleEn: 'Civil & Infrastructure',
    taglineFa: 'مترو، راه‌آهن، تونل‌سازی مکانیزه (TBM)، بزرگراه‌ها، فرودگاه‌ها و ابنیه سنگین',
    taglineEn: 'Metro & Rail Transit, TBM Tunneling, Highways, Airports & Megabuildings',
    descriptionFa: 'ویژه مدیران، مهندسان مشاور و پیمانکاران مگاپروژه‌های عمرانی، حمل‌ونقل شهری و ساختمانی با تکیه بر استانداردهای نشریه ۴۳۱۱ و BIM.',
    descriptionEn: 'Tailored for leadership teams in urban transit, deep excavation, structural BIM, and national infrastructure.',
    iconName: 'Building2',
    scopePillsFa: [
      'احداث مکانیزه خطوط و ایستگاه‌های مترو (TBM)',
      'سازه نگهبان و گودبرداری‌های عمیق شهری',
      'مدیریت تاخیرات و ادعا (ماده ۳۰ نشریه ۴۳۱۱)',
      'پایش ژئوتکنیک و فرونشست معابر',
      'بهینه‌سازی ناوگان ماشین‌آلات سنگین'
    ],
    scopePillsEn: [
      'Mechanized TBM Tunneling & Stations',
      'Deep Excavations & Shoring Walls',
      'Contractual Delay Claims (Circular 4311)',
      'Geotechnical & Subsidence Telemetry',
      'Heavy Fleet Logistics & BIM Synergy'
    ],
    governingStandardsFa: [
      'شرایط عمومی پیمان (نشریه ۴۳۱۱ سازمان برنامه و بودجه)',
      'دستورالعمل‌های ژئوتکنیک و تونل‌سازی شهری',
      'استاندارد مدل‌سازی اطلاعات ساخت (BIM)',
      'مشخصات فنی عمومی کارهای ساختمانی (نشریه ۵۵)'
    ],
    governingStandardsEn: [
      'Plan & Budget Organization Circular 4311',
      'Urban Metro Technical Specifications',
      'Building Information Modeling (BIM)',
      'PBO Standard Specifications Circular 55'
    ],
    defaultCaseStudy: {
      projectTitleFa: 'سامانه شناختی پیش‌بینی نشست زمین و هدایت مگاپروژه احداث خط مترو',
      projectTitleEn: 'Cognitive Ground Subsidence Prediction & Metro Tunneling Management',
      organizationFa: 'شرکت راه‌آهن شهری تهران و حومه (مترو)',
      organizationEn: 'Urban Railway Transit Organization',
      coreProblemFa: 'پیش‌بینی بلادرنگ نشست سطحی معابر شهری بالای سر دستگاه TBM و کنترل تداخل تاسیسات معارض آب و گاز شهری برای کاهش تاخیرات بحرانی.',
      coreProblemEn: 'Real-time ground settlement forecasting above mechanized TBM drives to prevent utility ruptures and mitigate schedule bottlenecks.',
      aiPatternFa: 'الگوی شناخت ناهنجاری (Anomaly Detection) و الگوی پیش‌بینی (Predictive Pattern)',
      aiPatternEn: 'Anomaly Detection & Predictive Analytics Patterns',
      expectedRoiFa: 'کاهش ۶۵ درصدی خسارات نشست خاک، صرفه‌جویی ۲.۴ میلیون دلاری در ترمیم معابر و کاهش ۲۵ روز تاخیر بحرانی.',
      expectedRoiEn: '65% reduction in ground disturbance claims, $2.4M municipal savings, and 25-day critical path compression.'
    },
    accentColor: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-600 via-sky-600 to-indigo-700',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    glowColor: 'rgba(37, 99, 235, 0.35)'
  },
  ENERGY_PETRO: {
    id: 'ENERGY_PETRO',
    titleFa: 'مگاپروژه‌های نفت، گاز، پالایش و صنایع پتروشیمی',
    titleEn: 'Oil, Gas, Refining & Petrochemical Megaprojects Track',
    shortTitleFa: 'نفت، گاز و پتروشیمی',
    shortTitleEn: 'Oil, Gas & Petrochemical',
    taglineFa: 'احداث EPC، راه‌اندازی، پایپینگ، اورهال پالایشگاهی و بهره‌برداری مجتمع‌های پتروشیمی',
    taglineEn: 'EPC Turnkey, Commissioning, Process Safety, Piping & Petrochemical Operations',
    descriptionFa: 'ویژه مدیران مجتمع‌های پتروشیمی، پالایشگاه‌ها، خطوط انتقال انرژی و پیمانکاران EPC بر اساس استانداردهای فیدیک نقره‌ای، API و ASME.',
    descriptionEn: 'Dedicated to EPC mega-plants, refinery turnarounds, process safety management, and continuous petrochemical yield optimization.',
    iconName: 'Factory',
    scopePillsFa: [
      'احداث و راه‌اندازی مگاپروژه‌های کلید در دست (FIDIC EPC)',
      'بازرسی جوشکاری لوله‌ها و خطوط انتقال (API 1104)',
      'تست هیدروستاتیک و تست‌های فشار (ASME B31.3 / B31.8)',
      'تحلیل خطر و قابلیت بهره‌برداری (HAZOP) و ایمنی فرآیند (PSM)',
      'نگهداری پیش‌بینانه توربوکمپرسورها و پایش فلر'
    ],
    scopePillsEn: [
      'Turnkey EPC Megaproject Execution (FIDIC Silver)',
      'Welding NDT & Defect Capping (API 1104)',
      'Hydrostatic & Process Pressure (ASME B31.8/3)',
      'Process Safety Management & HAZOP Analysis',
      'Predictive Maintenance of Turbo-compressors'
    ],
    governingStandardsFa: [
      'فیدیک نقره‌ای بین‌المللی (FIDIC Silver Book EPC/Turnkey)',
      'استاندارد بازرسی فنی جوشکاری خطوط لوله (API 1104)',
      'آیین‌نامه طراحی و تست لوله‌کشی تحت فشار (ASME B31.3 / B31.8)',
      'استانداردهای ایمنی فرآیند OSHA PSM و HAZOP'
    ],
    governingStandardsEn: [
      'FIDIC Silver Book (EPC / Turnkey Contracts)',
      'API Standard 1104 for Pipeline Welding',
      'ASME Code for Pressure Piping (B31.3 / B31.8)',
      'Process Safety Management (PSM) & HAZOP'
    ],
    defaultCaseStudy: {
      projectTitleFa: 'سامانه هوشمند پایش ارتعاشات توربوکمپرسورها و بهینه‌سازی راندمان برج‌های الفین',
      projectTitleEn: 'Predictive Vibration Intelligence for Turbo-Compressors & Olefin Fractionation',
      organizationFa: 'شرکت صنایع پتروشیمی خلیج فارس / مجتمع پتروشیمی الفین',
      organizationEn: 'Petrochemical Industries Corporation / Olefin Plant',
      coreProblemFa: 'پیش‌بینی خرابی‌های پیش‌بینی‌نشده کمپرسورهای گازی، کاهش توقفات ناخواسته (Unplanned Shutdowns) و افزایش نرخ تبدیل اتیلن با کنترل دمای فلر.',
      coreProblemEn: 'Predicting catastrophic compressor trip events 72 hours in advance and optimizing distillation yields while mitigating flaring losses.',
      aiPatternFa: 'الگوی شناخت ناهنجاری (Anomaly Detection) و الگوی خودکارسازی و بهینه‌سازی (Autonomous / Optimization)',
      aiPatternEn: 'Anomaly Detection & Autonomous Optimization Patterns',
      expectedRoiFa: 'جلوگیری از توقف ۵ روزه خط تولید به ارزش ۴.۵ میلیون دلار، کاهش ۳۰ درصدی پرت فلر و نرخ بازگشت سرمایه ۳۸۰ درصدی.',
      expectedRoiEn: '$4.5M prevented trip downtime, 30% reduction in flare losses, and 380% 1-year project ROI.'
    },
    accentColor: 'text-amber-500 dark:text-amber-400',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  }
};

const STORAGE_KEY_TRACK = 'cpmai_selected_industry_track';

export const getSavedIndustryTrack = (): IndustryTrackId => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TRACK);
    if (saved === 'CIVIL_INFRA' || saved === 'ENERGY_PETRO') {
      return saved;
    }
  } catch {
    // LocalStorage error
  }
  return 'CIVIL_INFRA'; // Default track
};

export const saveIndustryTrack = (track: IndustryTrackId): void => {
  try {
    localStorage.setItem(STORAGE_KEY_TRACK, track);
  } catch {
    // LocalStorage error
  }
};
