export type IndustryTrackId =
  | 'CIVIL_INFRA'
  | 'ENERGY_PETRO'
  | 'GENERAL_EVERYDAY'
  | 'PAYA_SAMAN_PARS';

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
  iconName: 'Building2' | 'Factory' | 'Sparkles' | 'Landmark';
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
  },
  GENERAL_EVERYDAY: {
    id: 'GENERAL_EVERYDAY',
    titleFa: 'سبک زندگی، خانواده و کاربردهای روزمره هوش مصنوعی',
    titleEn: 'Everyday, Family & Lifestyle AI Track',
    shortTitleFa: 'روزمره، خانواده و سفر',
    shortTitleEn: 'Everyday & Lifestyle',
    taglineFa: 'والدین هوشمند، اقتصاد خانوار، خرید بهینه، برنامه‌ریزی سفر و ترندهای جذاب هوش مصنوعی',
    taglineEn: 'Smart Parenting, Household Budgeting, Smart Shopping, Travel & Viral Everyday AI',
    descriptionFa: 'ویژه والدین، خانواده‌ها، عاشقان سفر، علاقه‌مندان به ترندهای وایرال شبکه‌های اجتماعی و کارآفرینان کسب‌وکارهای خرد برای کاربرد هوش مصنوعی در زندگی ملموس روزمره.',
    descriptionEn: 'Designed for families, parents, travel enthusiasts, social media creators, and everyday smart living powered by AI.',
    iconName: 'Sparkles',
    scopePillsFa: [
      'والدین و آموزش خلاقانه کودکان',
      'مدیریت خرید، سبد مصرف و اقتصاد خانوار',
      'برنامه‌ریزی هوشمند سفرهای رویایی و تفریحات',
      'آشپزی خلاقانه با باقیمانده یخچال و رژیم',
      'ترفندهای مذاکره، خرید خانه و خودرو',
      'تولید سناریوهای جذاب و وایرال شبکه‌های اجتماعی'
    ],
    scopePillsEn: [
      'Smart Parenting & Kids EdTech',
      'Household Budget & Smart Shopping',
      'Smart Travel Itineraries & Vacations',
      'Kitchen Creativity & Zero-Waste Meals',
      'Everyday Negotiation & Real Estate',
      'Viral Content & Social Media Ideas'
    ],
    governingStandardsFa: [
      'استاندارد ۶ فاز مدیریت پروژه‌های شناختی CPMAI',
      'چارچوب سواد دیجیتال و هوش مصنوعی یونسکو',
      'اصول مصرف پایدار و اقتصاد مقاومتی خانوار',
      'رهنمودهای ایمنی و سلامت دیجیتال کودک و خانواده'
    ],
    governingStandardsEn: [
      'CPMAI 6-Phase Cognitive Project Methodology',
      'UNESCO AI & Digital Literacy Framework',
      'Sustainable Household Economics Principles',
      'Family & Kids Digital Well-being Guidelines'
    ],
    defaultCaseStudy: {
      projectTitleFa: 'سامانه هوشمند اقتصاد خانوار، کاهش دورریز خرید و پس‌انداز بودجه سفر خانوادگی',
      projectTitleEn: 'Smart Household Budget, Grocery Waste Reduction & Vacation Savings AI',
      organizationFa: 'باشگاه هوشمند خانواده و سبک زندگی (Smart Family Hub)',
      organizationEn: 'Smart Family & Lifestyle Community',
      coreProblemFa: 'کاهش ۲۵ درصدی دورریز اقلام فاسدشدنی در خرید ماهانه، پیش‌بینی ارزان‌ترین نرخ بلیت و اقامتگاه سفر، و متناسب‌سازی تغذیه خانواده.',
      coreProblemEn: 'Reducing 25% perishable grocery waste, predicting lowest vacation flight/hotel fares, and personalizing family nutrition.',
      aiPatternFa: 'الگوی شناخت ناهنجاری (Anomaly Detection)، الگوی پیش‌بینی (Predictive) و سیستم پیشنهاددهنده (Recommendation)',
      aiPatternEn: 'Anomaly Detection, Predictive Analytics & Hyper-Personalized Recommendation Patterns',
      expectedRoiFa: 'صرفه‌جویی ماهیانه ۸ الی ۱۲ میلیون تومان در هزینه‌های پرت خانوار و تامین ۱۰۰ درصدی بودجه سفر سالیانه خانواده.',
      expectedRoiEn: '$2,400 annual household grocery savings and fully funded annual family vacation fund.'
    },
    accentColor: 'text-emerald-500 dark:text-emerald-400',
    gradient: 'from-emerald-500 via-teal-500 to-indigo-600',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  },
  PAYA_SAMAN_PARS: {
    id: 'PAYA_SAMAN_PARS',
    titleFa: 'هلدینگ پایا سامان پارس (پیمانکاری زیرساخت، مسکن و شهرک صنعتی)',
    titleEn: 'Paya Saman Pars Holding (Infrastructure, Housing & Kaveh Industrial City)',
    shortTitleFa: 'پایا سامان پارس',
    shortTitleEn: 'Paya Saman Pars',
    taglineFa: 'دو بال پیمانکاری عمرانی و سرمایه‌گذاری مسکن/شهرک کاوه · ۸ حوزه، ۶۳ پروژه، ۱۴ شرکت تابعه (EPC+F / BOT / BLT)',
    taglineEn: 'Dual-Wing Civil Contracting & Housing/Industrial City Portfolio · 8 Sectors, 63 Projects, 14 Subsidiaries',
    descriptionFa: 'مسیر اختصاصی مدیران، کارشناسان دفتر فنی، امور پیمان و بهره‌برداری هلدینگ پایا سامان پارس و شرکت‌های تابعه (ملی ساختمان، جنرال مکانیک، دی، رامان، تابیران، آتی‌ساز، خانه، عمران مسکن و شهر صنعتی کاوه).',
    descriptionEn: 'Dedicated track for Paya Saman Pars Holding & subsidiaries spanning EPC/EPC+F/BOT/BLT infrastructure, industrial plants, housing development, and Kaveh Special Economic Zone.',
    iconName: 'Landmark',
    scopePillsFa: [
      'راه، آزادراه، پل، تونل و برون‌مرزی امارات (۲۸ پروژه)',
      'سد، انتقال آب، دریایی و ریل/فرودگاه (۲۷ پروژه)',
      'ابنیه صنعتی، MEP، خورشیدی ۵MW و پلاسمای سرد کاوه',
      'انبوه‌سازی، شهرک‌سازی و منطقه ویژه کاوه (۳۰۰۰ هکتار)',
      'مدل‌های قراردادی EPC / EPC+F / PC / BOT / BLT و کنسرسیوم'
    ],
    scopePillsEn: [
      'Highways, Tunnels & UAE Cross-Border (28 Projects)',
      'Dams, Water, Marine, Rail & Airports (27 Projects)',
      'Industrial Civil, MEP, 5MW Solar & Cold Plasma',
      'Housing Wing & Kaveh 3,000ha Industrial City',
      'EPC / EPC+F / PC / BOT / BLT & Consortium Governance'
    ],
    governingStandardsFa: [
      'شرایط عمومی پیمان (نشریه ۴۳۱۱) و فیدیک EPC / EPC+F',
      'چارچوب‌های سرمایه‌گذاری و مشارکت BOT / BLT و کنسرسیوم',
      'استانداردهای راه و تونل، نشریه ۵۵، مقررات ملی ساختمان و HSE',
      'ضوابط بهره‌برداری شهرک‌های صنعتی، انرژی تجدیدپذیر و پلاسمای سرد'
    ],
    governingStandardsEn: [
      'Circular 4311 & FIDIC EPC / EPC+F Contracting Standards',
      'BOT / BLT Concession & Multi-Subsidiary Consortium Governance',
      'Civil/Tunneling Specs (Circular 55), Building Codes & ISO HSE',
      'Industrial City Infrastructure, Solar PV & Cold-Plasma Standards'
    ],
    defaultCaseStudy: {
      projectTitleFa: 'داشبورد فرماندهی هوشمند پورتفوی ۶۳ پروژه‌ای و پایش دو بال هلدینگ پایا سامان پارس',
      projectTitleEn: 'Cognitive Command Center for Paya Saman Pars 63-Project Dual-Wing Portfolio',
      organizationFa: 'هلدینگ پایا سامان پارس و ۱۴ شرکت تابعه (ستاد و دو بال اجرایی)',
      organizationEn: 'Paya Saman Pars Holding & 14 Subsidiary Companies',
      coreProblemFa: 'تجمیع ناهمگون گزارش‌های ۶۳ پروژه در ۸ حوزه (از آزادراه تهران–شمال و پروژه‌های امارات تا شهر صنعتی کاوه و بال مسکن)، تاخیر در پایش قراردادهای EPC+F/BOT و نبود هشدار پیش‌دستانه انحراف منابع (۵۰۰۰+ نیرو و ناوگان سنگین).',
      coreProblemEn: 'Fragmented multi-subsidiary reporting across 63 infrastructure, UAE export, housing, and Kaveh Industrial City projects without unified EPC+F/BOT risk forecasting.',
      aiPatternFa: 'الگوی پیش‌بینی (Predictive)، شناخت ناهنجاری (Anomaly Detection) و تعامل مکالمه‌ای مستند (Conversational / Grounded AI)',
      aiPatternEn: 'Predictive Analytics, Anomaly Detection & Source-Grounded Conversational AI',
      expectedRoiFa: 'کاهش ۳۵ درصدی زمان تجمیع گزارش‌های ستاد هلدینگ و شناسایی زودهنگام گلوگاه‌های مالی و تاخیرات در دو بال اجرایی (برآورد شبیه‌سازی‌شده آموزشی).',
      expectedRoiEn: '35% faster executive holding consolidation and proactive bottleneck detection across both contracting and investment wings (educational simulation).'
    },
    accentColor: 'text-violet-600 dark:text-violet-400',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    borderColor: 'border-violet-500/40 hover:border-violet-400',
    glowColor: 'rgba(139, 92, 246, 0.35)'
  }
};

const STORAGE_KEY_TRACK = 'cpmai_selected_industry_track';

export const resolveTrackFromUrl = (
  pathname?: string,
  search?: string
): IndustryTrackId | null => {
  try {
    const rawPath =
      pathname !== undefined
        ? pathname
        : typeof window !== 'undefined'
        ? window.location.pathname
        : '';
    const rawSearch =
      search !== undefined
        ? search
        : typeof window !== 'undefined'
        ? window.location.search
        : '';

    const normalizedPath = rawPath.toLowerCase().replace(/\/+$/, '');
    if (
      normalizedPath === '/paya' ||
      normalizedPath.endsWith('/paya') ||
      normalizedPath === '/paya-saman-pars' ||
      normalizedPath.endsWith('/paya-saman-pars')
    ) {
      return 'PAYA_SAMAN_PARS';
    }

    if (rawSearch) {
      const params = new URLSearchParams(rawSearch);
      const trackParam = (params.get('track') || '').trim().toUpperCase();
      if (trackParam === 'PAYA' || trackParam === 'PAYA_SAMAN_PARS') {
        return 'PAYA_SAMAN_PARS';
      }
      if (
        trackParam === 'CIVIL_INFRA' ||
        trackParam === 'ENERGY_PETRO' ||
        trackParam === 'GENERAL_EVERYDAY'
      ) {
        return trackParam;
      }
    }
  } catch {
    // URL parsing error
  }
  return null;
};

export const getCleanedUrlAfterTrackChange = (
  pathname: string,
  search: string
): string => {
  const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '');
  const nextPath =
    normalizedPath === '/paya' ||
    normalizedPath.endsWith('/paya') ||
    normalizedPath === '/paya-saman-pars' ||
    normalizedPath.endsWith('/paya-saman-pars')
      ? '/'
      : pathname || '/';

  const params = new URLSearchParams(search || '');
  params.delete('track');
  const nextQuery = params.toString();
  return nextQuery ? `${nextPath}?${nextQuery}` : nextPath;
};

export const getSavedIndustryTrack = (): IndustryTrackId => {
  const urlTrack = resolveTrackFromUrl();
  if (urlTrack) {
    saveIndustryTrack(urlTrack);
    return urlTrack;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_TRACK);
      if (
        saved === 'CIVIL_INFRA' ||
        saved === 'ENERGY_PETRO' ||
        saved === 'GENERAL_EVERYDAY' ||
        saved === 'PAYA_SAMAN_PARS'
      ) {
        return saved;
      }
    }
  } catch {
    // LocalStorage error
  }
  return 'CIVIL_INFRA'; // Default track
};

export const saveIndustryTrack = (track: IndustryTrackId): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_TRACK, track);
    }
  } catch {
    // LocalStorage error
  }
};

export type CivilDisciplineId =
  | 'civil_tbm_tunnel'
  | 'civil_stations_natm'
  | 'civil_precast_segment'
  | 'civil_track_systems'
  | 'civil_highways_bridges'
  | 'civil_technical_claims'
  | 'civil_geotech_monitoring'
  | 'civil_heavy_fleet';

export type PetroDisciplineId =
  | 'petro_process_safety'
  | 'petro_piping_layout'
  | 'petro_mechanical_heavy'
  | 'petro_electrical_inst'
  | 'petro_civil_structure'
  | 'petro_procurement_expediting'
  | 'petro_qaqc_ndt'
  | 'petro_commissioning_pcc';

export type GeneralDisciplineId =
  | 'general_family_parenting'
  | 'general_household_finance'
  | 'general_travel_lifestyle'
  | 'general_viral_content'
  | 'general_ecommerce_retail'
  | 'general_health_nutrition'
  | 'general_personal_productivity'
  | 'general_customer_care';

export type PayaDisciplineId =
  | 'paya_portfolio_pmo'
  | 'paya_contracts_epcf_bot'
  | 'paya_hr_fleet_support'
  | 'paya_roads_rail_airports'
  | 'paya_dams_marine_industrial'
  | 'paya_mep_tabiran_energy'
  | 'paya_housing_urban'
  | 'paya_kaveh_industrial_city';

export type DisciplineId =
  | CivilDisciplineId
  | PetroDisciplineId
  | GeneralDisciplineId
  | PayaDisciplineId;

export type EngineeringRoleId =
  | 'director'            // مدیر طرح / مدیر ارشد پروژه
  | 'lead_superintendent' // سرپرست دیسیپلین / رئیس کارگاه
  | 'technical_engineer'  // مهندس دفتر فنی / کنترل پروژه / ناظر
  | 'site_operator';      // اپراتور / جنرال فورمن / بازرس کیفی

export interface DisciplineMetadata {
  id: DisciplineId;
  trackId: IndustryTrackId;
  groupFa?: string;
  groupEn?: string;
  titleFa: string;
  titleEn: string;
  shortTitleFa: string;
  shortTitleEn: string;
  iconName: string;
  governingStandardsFa: string[];
  governingStandardsEn: string[];
  performanceMetricsFa: string[];
  performanceMetricsEn: string[];
  descriptionFa: string;
  descriptionEn: string;
}

export interface DisciplineExampleContent {
  disciplineId: DisciplineId;
  titleFa: string;
  titleEn: string;
  businessProblemFa: string;
  businessProblemEn: string;
  whyAiFa: string;
  whyAiEn: string;
  successCriteriaFa: string[];
  successCriteriaEn: string[];
  costBenefitSummaryFa: string;
  costBenefitSummaryEn: string;
  roiEstimateFa: string;
  roiEstimateEn: string;
}

const STORAGE_KEY_DISCIPLINE = 'cpmai_selected_discipline_id';
const STORAGE_KEY_ROLE = 'cpmai_selected_engineering_role';

export const getSavedDiscipline = (track: IndustryTrackId = 'CIVIL_INFRA'): DisciplineId => {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_DISCIPLINE) as DisciplineId;
      if (saved) {
        if (track === 'CIVIL_INFRA' && saved.startsWith('civil_')) return saved;
        if (track === 'ENERGY_PETRO' && saved.startsWith('petro_')) return saved;
        if (track === 'GENERAL_EVERYDAY' && saved.startsWith('general_')) return saved;
        if (track === 'PAYA_SAMAN_PARS' && saved.startsWith('paya_')) return saved;
      }
    }
  } catch {
    // LocalStorage error
  }
  if (track === 'ENERGY_PETRO') return 'petro_process_safety';
  if (track === 'GENERAL_EVERYDAY') return 'general_household_finance';
  if (track === 'PAYA_SAMAN_PARS') return 'paya_portfolio_pmo';
  return 'civil_tbm_tunnel';
};

export const saveDiscipline = (disciplineId: DisciplineId): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_DISCIPLINE, disciplineId);
    }
  } catch {
    // LocalStorage error
  }
};

export const getSavedRole = (): EngineeringRoleId => {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_ROLE) as EngineeringRoleId;
      if (saved && ['director', 'lead_superintendent', 'technical_engineer', 'site_operator'].includes(saved)) {
        return saved;
      }
    }
  } catch {
    // LocalStorage error
  }
  return 'technical_engineer';
};

export const saveRole = (role: EngineeringRoleId): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ROLE, role);
    }
  } catch {
    // LocalStorage error
  }
};

export interface DomainExampleArtifact {
  backgroundFa: string;
  backgroundEn: string;
  primaryObjectiveFa: string;
  primaryObjectiveEn: string;
  relatedQuestionsFa: string[];
  relatedQuestionsEn: string[];
  sampleDatasetTitleFa?: string;
  sampleDatasetTitleEn?: string;
  sampleContractClauseFa?: string;
  sampleContractClauseEn?: string;
}

export interface DomainPhaseExample {
  phaseId: number;
  subtaskId?: number;
  trackId: IndustryTrackId;
  titleFa: string;
  titleEn: string;
  exampleNoteFa: string;
  exampleNoteEn: string;
  artifacts: DomainExampleArtifact;
  quizScenarioFa?: string;
  quizScenarioEn?: string;
}

export type DomainTrackExamplesRegistry = Record<
  IndustryTrackId,
  Record<number, DomainPhaseExample>
>;

