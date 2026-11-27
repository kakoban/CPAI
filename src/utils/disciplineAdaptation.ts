import {
  DisciplineId,
  EngineeringRoleId,
  INDUSTRY_TRACKS,
  IndustryTrackId
} from '../types/industryTrack';
import {
  getDisciplineExampleContent,
  getDisciplineMetadata,
  getDisciplinePromptShowcase
} from '../data/disciplineExamplesRegistry';
import type {
  DepartmentUseCase,
  NotebookLmExercise
} from '../data/notebooklm_engineering_guide';
import type { SampleDepartmentDocument } from '../data/notebooklm_sample_documents';
import type { ModuleExerciseDeck } from '../data/moduleExercises';

export interface RoleDisplayMeta {
  id: EngineeringRoleId;
  titleFa: string;
  titleEn: string;
  shortFa: string;
  shortEn: string;
}

export interface RoleChallengeProfile {
  roleId: EngineeringRoleId;
  challengeTypeFa: string;
  challengeTypeEn: string;
  coreConcernFa: string;
  coreConcernEn: string;
  exerciseFocusFa: string;
  exerciseFocusEn: string;
  recommendedStudioToolId: string;
  recommendedStudioToolFa: string;
  recommendedStudioToolEn: string;
  deliverableShapeFa: string;
  deliverableShapeEn: string;
}

export function getRoleDisplayMeta(
  roleId: EngineeringRoleId = 'technical_engineer',
  trackId: IndustryTrackId = 'CIVIL_INFRA'
): RoleDisplayMeta {
  if (trackId === 'GENERAL_EVERYDAY') {
    const map: Record<EngineeringRoleId, RoleDisplayMeta> = {
      director: {
        id: 'director',
        titleFa: 'سرپرست خانوار / مدیر ارشد اقتصاد خانه',
        titleEn: 'Head of Household & Family Decision Maker',
        shortFa: 'سرپرست خانوار',
        shortEn: 'Household Lead'
      },
      lead_superintendent: {
        id: 'lead_superintendent',
        titleFa: 'پدر، مادر یا هماهنگ‌کننده امور خانه',
        titleEn: 'Parent & Home Coordinator',
        shortFa: 'هماهنگ‌کننده خانه',
        shortEn: 'Home Coordinator'
      },
      technical_engineer: {
        id: 'technical_engineer',
        titleFa: 'فریلنسر، شاغل یا کارآفرین خرد',
        titleEn: 'Freelancer, Creator & Small Business Lead',
        shortFa: 'فریلنسر / کارآفرین',
        shortEn: 'Freelancer'
      },
      site_operator: {
        id: 'site_operator',
        titleFa: 'دانشجو، یادگیرنده یا جستجوگر هوش مصنوعی',
        titleEn: 'Student, Self-Learner & Everyday AI Explorer',
        shortFa: 'دانشجو / یادگیرنده',
        shortEn: 'Learner'
      }
    };
    return map[roleId] || map.technical_engineer;
  }

  if (trackId === 'PAYA_SAMAN_PARS') {
    const map: Record<EngineeringRoleId, RoleDisplayMeta> = {
      director: {
        id: 'director',
        titleFa: 'مدیرعامل / معاونت هلدینگ یا مدیرعامل شرکت تابعه',
        titleEn: 'Holding Executive / Subsidiary Managing Director',
        shortFa: 'مدیرعامل / معاونت هلدینگ',
        shortEn: 'Holding Executive'
      },
      lead_superintendent: {
        id: 'lead_superintendent',
        titleFa: 'مدیر طرح، کنسرسیوم یا سرپرست بهره‌برداری',
        titleEn: 'Consortium / Program Lead or Operations Director',
        shortFa: 'مدیر طرح / کنسرسیوم',
        shortEn: 'Program Lead'
      },
      technical_engineer: {
        id: 'technical_engineer',
        titleFa: 'کارشناس ارشد دفتر فنی، مناقصات و کنترل پروژه',
        titleEn: 'Holding Technical Office, Bidding & PMO Specialist',
        shortFa: 'دفتر فنی و مناقصات',
        shortEn: 'Technical & PMO'
      },
      site_operator: {
        id: 'site_operator',
        titleFa: 'رئیس کارگاه، ناظر اجرا و مهندس بهره‌برداری',
        titleEn: 'Site Superintendent, Field Engineer & Operations',
        shortFa: 'رئیس کارگاه / ناظر',
        shortEn: 'Site Lead'
      }
    };
    return map[roleId] || map.technical_engineer;
  }

  const map: Record<EngineeringRoleId, RoleDisplayMeta> = {
    director: {
      id: 'director',
      titleFa: 'مدیر طرح / مدیر ارشد پروژه',
      titleEn: 'Project Director / Executive PM',
      shortFa: 'مدیر طرح',
      shortEn: 'Project Director'
    },
    lead_superintendent: {
      id: 'lead_superintendent',
      titleFa: 'سرپرست دیسیپلین / رئیس کارگاه',
      titleEn: 'Discipline Lead / Superintendent',
      shortFa: 'سرپرست دیسیپلین',
      shortEn: 'Discipline Lead'
    },
    technical_engineer: {
      id: 'technical_engineer',
      titleFa: 'مهندس دفتر فنی / کنترل پروژه / ناظر',
      titleEn: 'Technical Office & Controls Engineer',
      shortFa: 'مهندس دفتر فنی',
      shortEn: 'Technical Engineer'
    },
    site_operator: {
      id: 'site_operator',
      titleFa: 'اپراتور، جنرال فورمن و بازرس کیفی',
      titleEn: 'Site Operator, Foreman & Inspector',
      shortFa: 'اپراتور / بازرس کیفی',
      shortEn: 'Operator / QC'
    }
  };
  return map[roleId] || map.technical_engineer;
}

/**
 * Returns the distinct challenge type, core concern, and NotebookLM exercise style
 * for each organizational tier so switching level genuinely transforms the task.
 */
export function getRoleChallengeProfile(
  roleId: EngineeringRoleId = 'technical_engineer',
  trackId: IndustryTrackId = 'CIVIL_INFRA'
): RoleChallengeProfile {
  if (trackId === 'GENERAL_EVERYDAY') {
    const map: Record<EngineeringRoleId, RoleChallengeProfile> = {
      director: {
        roleId: 'director',
        challengeTypeFa: 'تصمیم‌گیری کلان مالی خانواده، اولویت‌بندی بودجه و پس‌انداز بلندمدت',
        challengeTypeEn: 'Macro household budgeting, savings allocation & long-term priorities',
        coreConcernFa: 'جلوگیری از کسری بودجه سالانه، مقایسه سناریوهای خرید/سرمایه‌گذاری و برآورد دقیق هزینه کل',
        coreConcernEn: 'Preventing annual budget deficits and comparing major purchase/investment scenarios',
        exerciseFocusFa: 'تجمیع فاکتورها و قراردادها برای ساخت داشبورد تصمیم‌گیری مالی و سناریوی صرفه‌جویی',
        exerciseFocusEn: 'Synthesizing receipts & contracts into a macro savings decision brief',
        recommendedStudioToolId: 'data_table',
        recommendedStudioToolFa: 'جدول مقایسه مالی و سناریوی بودجه (Data Table / Report)',
        recommendedStudioToolEn: 'Financial Comparison & Budget Scenario Table',
        deliverableShapeFa: 'ماتریس تصمیم‌گیری مالی و برنامه صرفه‌جویی ۱۲ ماهه',
        deliverableShapeEn: '12-Month Budget Decision Matrix'
      },
      lead_superintendent: {
        roleId: 'lead_superintendent',
        challengeTypeFa: 'هماهنگی برنامه هفتگی خانواده، آموزش کودک و مدیریت سبد مصرف بدون دورریز',
        challengeTypeEn: 'Weekly family coordination, parenting routines & zero-waste household planning',
        coreConcernFa: 'نظم‌دهی به کارهای هم‌زمان خانه، تقسیم وظایف، و صرفه‌جویی در زمان روزانه والدین',
        coreConcernEn: 'Balancing competing family routines, meal planning, and daily parent time savings',
        exerciseFocusFa: 'تبدیل یادداشت‌ها و برنامه‌های پراکنده به چک‌لیست هفتگی و پادکست/راهنمای خانواده',
        exerciseFocusEn: 'Turning scattered notes into a weekly family playbook and audio summary',
        recommendedStudioToolId: 'audio_overview',
        recommendedStudioToolFa: 'پادکست راهنمای خانواده و چک‌لیست هفتگی (Audio Overview)',
        recommendedStudioToolEn: 'Family Audio Brief & Weekly Checklist',
        deliverableShapeFa: 'برنامه عملیاتی هفتگی خانواده و جدول تقسیم کار',
        deliverableShapeEn: 'Weekly Family Execution Schedule'
      },
      technical_engineer: {
        roleId: 'technical_engineer',
        challengeTypeFa: 'تحلیل بازار، قیمت‌گذاری خدمات، قراردادهای کاری و بهره‌وری فریلنسری',
        challengeTypeEn: 'Market analysis, pricing strategy, client contracts & solo-business productivity',
        coreConcernFa: 'کشف نکات ریسکی قرارداد مشتریان، تدوین پروپوزال دقیق و افزایش حاشیه سود ساعتی',
        coreConcernEn: 'Spotting client contract traps, structuring proposals, and raising hourly margin',
        exerciseFocusFa: 'مقایسه مستند قراردادها و نیاز مشتری برای استخراج پروپوزال و جدول تعهدات',
        exerciseFocusEn: 'Cross-checking client briefs & contracts into a deliverables matrix',
        recommendedStudioToolId: 'study_guide',
        recommendedStudioToolFa: 'ماتریس تعهدات و پروپوزال استاندارد (Report / Brief)',
        recommendedStudioToolEn: 'Deliverables Matrix & Proposal Brief',
        deliverableShapeFa: 'چک‌لیست تعهدات قراردادی و سناریوی مذاکره با مشتری',
        deliverableShapeEn: 'Contract Risk Checklist & Client Negotiation Script'
      },
      site_operator: {
        roleId: 'site_operator',
        challengeTypeFa: 'یادگیری سریع، خلاصه‌سازی منابع درسی و آمادگی آزمون/ارائه با پادکست و نقشه ذهنی',
        challengeTypeEn: 'Rapid learning, textbook synthesis & exam readiness via Mind Map & Audio',
        coreConcernFa: 'تبدیل جزوه‌های طولانی و متون پیچیده به نقشه مفهومی، فلش‌کارت و مرور صوتی قابل فهم',
        coreConcernEn: 'Converting dense textbooks into digestible mind maps, flashcards, and audio reviews',
        exerciseFocusFa: 'ساخت Mind Map و پادکست مروری فارسی از جزوه یا منبع درسی واقعی',
        exerciseFocusEn: 'Generating a Mind Map and Persian Audio Overview from study sources',
        recommendedStudioToolId: 'mind_map',
        recommendedStudioToolFa: 'نقشه ذهنی (Mind Map) و پادکست مرور درس',
        recommendedStudioToolEn: 'Concept Mind Map & Audio Review',
        deliverableShapeFa: 'نقشه ذهنی مفاهیم کلیدی + ۵ سوال خودآزمایی با منبع',
        deliverableShapeEn: 'Visual Mind Map + Source-Cited Self-Quiz'
      }
    };
    return map[roleId] || map.technical_engineer;
  }

  const map: Record<EngineeringRoleId, RoleChallengeProfile> = {
    director: {
      roleId: 'director',
      challengeTypeFa: 'حاکمیت پورتفوی، ریسک مالی و قراردادی کلان، و تصمیم‌گیری هیئت‌مدیره',
      challengeTypeEn: 'Portfolio governance, macro financial/contractual risk & board-level decisions',
      coreConcernFa: 'جلوگیری از جرائم تاخیر، بهینه‌سازی جریان نقدینگی/ROI، مدیریت مدل‌های EPC+F/BOT و گزارش به هیئت‌مدیره',
      coreConcernEn: 'Mitigating delay penalties, optimizing cashflow/ROI, governing EPC+F/BOT risks & board reporting',
      exerciseFocusFa: 'تلفیق اسناد کلان برای استخراج اسلایدبریف هیئت‌مدیره، ماتریس ریسک مالی و پادکست مدیریتی',
      exerciseFocusEn: 'Synthesizing executive sources into a Board Slide Deck, risk matrix & executive audio brief',
      recommendedStudioToolId: 'audio_overview',
      recommendedStudioToolFa: 'اسلایدبریف هیئت‌مدیره + پادکست خلاصه مدیریتی (Audio Overview)',
      recommendedStudioToolEn: 'Board Slide Brief + Executive Audio Overview',
      deliverableShapeFa: 'گزارش تصمیم‌گیری هیئت‌مدیره (ریسک مالی، اثر ROI و مصوبه پیشنهادی)',
      deliverableShapeEn: 'Board Decision Brief (Financial Risk, ROI Impact & Resolution)'
    },
    lead_superintendent: {
      roleId: 'lead_superintendent',
      challengeTypeFa: 'هماهنگی جبهه‌های اجرایی، توزیع ناوگان و رفع گلوگاه‌های کارگاهی بین واحدها',
      challengeTypeEn: 'Cross-front execution coordination, heavy fleet dispatch & field bottleneck resolution',
      coreConcernFa: 'تداخل جبهه‌های کاری، کمبود ماشین‌آلات و نیروی انسانی در شیفت، و عقب‌ماندگی برنامه هفتگی کارگاه',
      coreConcernEn: 'Workfront clashes, equipment/crew shortages across shifts, and weekly schedule slippage',
      exerciseFocusFa: 'تقاطع‌گیری گزارش کارگاه‌ها برای کشف گلوگاه تجهیز/شیفت و صدور برنامه جبرانی هفته جاری',
      exerciseFocusEn: 'Cross-auditing field logs to resolve crew/equipment bottlenecks and issue weekly dispatch',
      recommendedStudioToolId: 'briefing_doc',
      recommendedStudioToolFa: 'دستورکار هماهنگی کارگاه و جدول توزیع منابع (Briefing / Matrix)',
      recommendedStudioToolEn: 'Site Coordination Briefing & Resource Dispatch Matrix',
      deliverableShapeFa: 'ماتریس رفع گلوگاه جبهه‌های کارگاهی + برنامه جابه‌جایی ماشین‌آلات و شیفت',
      deliverableShapeEn: 'Workfront Bottleneck Matrix & Shift/Fleet Reallocation Plan'
    },
    technical_engineer: {
      roleId: 'technical_engineer',
      challengeTypeFa: 'ممیزی خط‌به‌خط مشخصات فنی، تطبیق نقشه و پیمان، متره و مستندسازی لوایح تاخیرات',
      challengeTypeEn: 'Clause-cited specification audit, IFC/contract reconciliation, QS & delay claims',
      coreConcernFa: 'کشف مغایرت بین نقشه/مشخصات فنی/قرارداد، رد شدن صورت‌وضعیت و از دست رفتن فرجه اخطار ماده ۳۰ یا فیدیک',
      coreConcernEn: 'Uncovering IFC/spec clashes, IPC rejections, and missed Clause 30 / FIDIC notice deadlines',
      exerciseFocusFa: 'جدول تطبیق تعارضات بین ۲ سند فنی/قراردادی با ارجاع دقیق به شماره صفحه و بند [1][2]',
      exerciseFocusEn: 'Building a source-grounded variance & compliance table with exact [1][2] citations',
      recommendedStudioToolId: 'study_guide',
      recommendedStudioToolFa: 'جدول ممیزی تطبیقی با پاورقی دقیق (Citation Audit Table)',
      recommendedStudioToolEn: 'Clause-Cited Compliance & Variance Audit Table',
      deliverableShapeFa: 'ماتریس مغایرت‌های فنی-قراردادی به همراه شماره بند و پیش‌نویس لایحه/نامه رسمی',
      deliverableShapeEn: 'Clause-Cited Technical/Contractual Variance Matrix & Draft Notice'
    },
    site_operator: {
      roleId: 'site_operator',
      challengeTypeFa: 'پایش حدود مجاز عملیاتی (SOP/Tolerance)، بازرسی کیفی و خط قرمزهای ایمنی HSE در خط مقدم',
      challengeTypeEn: 'Frontline SOP/tolerance checks, QC/NDT verification & HSE red-line safety execution',
      coreConcernFa: 'تجاوز از آستانه مجاز دستگاه، خطای تست کیفی/جوش، خستگی شیفت و نبود چک‌لیست شفاف در لحظه اجرا',
      coreConcernEn: 'Exceeding equipment operating limits, QC/NDT failures, shift fatigue & missing field checklists',
      exerciseFocusFa: 'تبدیل دفترچه ضخیم استاندارد به چک‌لیست خط قرمزهای شیفت، نقشه ذهنی (Mind Map) و پادکست ایمنی کارگاه',
      exerciseFocusEn: 'Distilling thick manuals into a 1-page Shift Red-Line Checklist, Mind Map & Safety Audio',
      recommendedStudioToolId: 'mind_map',
      recommendedStudioToolFa: 'نقشه ذهنی (Mind Map) + چک‌لیست ایمنی و حدود مجاز شیفت',
      recommendedStudioToolEn: 'Operational Mind Map + Shift Safety/SOP Checklist',
      deliverableShapeFa: 'چک‌لیست عملیاتی خط قرمزهای شیفت (حد مجاز، آستانه توقف اضطراری و اقدام فوری)',
      deliverableShapeEn: 'Shift Red-Line Checklist (Limits, Emergency Stop Thresholds & Field Action)'
    }
  };
  return map[roleId] || map.technical_engineer;
}

/**
 * Builds a live NotebookLM Department Matrix entry tailored to BOTH the active discipline AND organizational role.
 */
export function buildDisciplineNotebookLmDepartment(
  disciplineId: DisciplineId,
  roleId: EngineeringRoleId = 'technical_engineer'
): DepartmentUseCase {
  const meta = getDisciplineMetadata(disciplineId);
  const example = getDisciplineExampleContent(disciplineId);
  const track = INDUSTRY_TRACKS[meta.trackId];
  const roleMeta = getRoleDisplayMeta(roleId, meta.trackId);
  const roleProfile = getRoleChallengeProfile(roleId, meta.trackId);
  const standardsList = meta.governingStandardsFa.length > 0
    ? meta.governingStandardsFa
    : track.governingStandardsFa;
  const kpisList = meta.performanceMetricsFa;

  const roleSpecificSourcesFa: Record<EngineeringRoleId, string[]> = {
    director: [
      `اسناد کلان پیمان و حاکمیت (${standardsList[0]}) و مصوبات هیئت‌مدیره ${track.shortTitleFa}`,
      `گزارش تجمیعی انحراف بودجه، جرائم تاخیر و بازگشت سرمایه (ROI) در حوزه ${meta.shortTitleFa}`,
      `خلاصه شاخص‌های کلیدی عملکرد [${kpisList.slice(0, 3).join(' | ')}] در سطح پورتفوی`
    ],
    lead_superintendent: [
      `گزارش روزانه/هفتگی پیشرفت جبهه‌های کارگاهی و تخصیص ناوگان در ${meta.shortTitleFa}`,
      `صورت‌جلسات رفع تداخل پیمانکاران جزء و برنامه جبرانی شیفت‌ها`,
      `جدول پایش گلوگاه‌های میدانی روی شاخص‌های [${kpisList.slice(0, 3).join(' | ')}]`
    ],
    technical_engineer: [
      `مشخصات فنی، آیین‌نامه‌ها و بندهای حقوقی مرجع: ${standardsList.join('، ')}`,
      `دفترچه‌های متره، صورت‌وضعیت، نقشه‌های IFC و مکاتبات ماده ۳۰ / فیدیک در ${meta.shortTitleFa}`,
      `داده‌های اندازه‌گیری‌شده [${kpisList.join(' | ')}] برای ممیزی مغایرت‌ها`
    ],
    site_operator: [
      `دفترچه دستورالعمل کاربری تجهیزات (SOP)، حدود رواداری مجاز و استاندارد ایمنی (${standardsList[0]})`,
      `چک‌لیست بازرسی کیفی (QC/NDT)، فرم پرمیت کار و لاگ شیفت‌های ${meta.shortTitleFa}`,
      `آستانه‌های هشدار لحظه‌ای روی شاخص‌های [${kpisList.slice(0, 3).join(' | ')}]`
    ]
  };

  const roleSpecificDeliverablesFa: Record<EngineeringRoleId, string[]> = {
    director: [
      `اسلایدبریف تصمیم‌گیری هیئت‌مدیره برای رفع چالش «${meta.shortTitleFa}» با برآورد ریسک مالی`,
      `تحلیل اثر مالی و ROI (${example.roiEstimateFa}) مستند به ارقام موجود در اسناد`,
      `تعیین مصوبه اجرایی و اولویت‌بندی سرمایه‌گذاری/تخصیص منابع بین واحدها`
    ],
    lead_superintendent: [
      `ماتریس گلوگاه‌های اجرایی و جابه‌جایی ناوگان/تجهیزات در جبهه‌های ${meta.shortTitleFa}`,
      `برنامه اقدام جبرانی ۷ روزه با تعیین مسئول هر شیفت و جبهه کاری`,
      example.successCriteriaFa[0] || `رفع انحراف شاخص «${kpisList[0]}» در سطح کارگاه`
    ],
    technical_engineer: [
      `جدول تطبیق خط‌به‌خط مغایرت‌های فنی و قراردادی با شماره صفحه و بند (${standardsList[0]})`,
      `بررسی رعایت مهلت‌های اخطار و مستندسازی ادله فنی برای صورت‌وضعیت یا لایحه`,
      ...(example.successCriteriaFa.slice(0, 2))
    ],
    site_operator: [
      `چک‌لیست عملیاتی تک‌برگی خط قرمزهای ایمنی و حدود مجاز (${kpisList[0]} و ${kpisList[1] || kpisList[0]})`,
      `جدول تشخیص سریع ناهنجاری در شیفت (علامت هشدار ← حد مجاز ← اقدام فوری توقف/اصلاح)`,
      `نقشه ذهنی (Mind Map) یا پادکست ۵ دقیقه‌ای برای توجیه ایمنی و کیفی تیم اجرایی`
    ]
  };

  const roleSpecificPromptFa: Record<EngineeringRoleId, string> = {
    director: `تو مشاور راهبردی «${roleMeta.titleFa}» در حوزه «${meta.titleFa}» (${track.shortTitleFa}) هستی.
فقط بر اساس اسناد بارگذاری‌شده در NotebookLM پاسخ بده (هر عدد یا ادعا بدون منبع بود، صراحتاً بنویس «در منبع ثبت نشده است»):
۱. با توجه به چالش کلان «${example.businessProblemFa}»، ۳ ریسک مالی/قراردادی اصلی را با استناد به شماره صفحه سند (${standardsList[0]}) استخراج کن.
۲. وضعیت شاخص‌های کلان [${kpisList.join(' | ')}] را در یک ماتریس تصمیم هیئت‌مدیره با ستون‌های [محور ریسک | پیامد مالی و تاخیر | اهرم کنترلی ${standardsList[0]} | مصوبه پیشنهادی مدیر طرح/عامل] تنظیم کن.
۳. در پایان یک خلاصه ۳ اسلایدی برای طرح در جلسه هیئت‌مدیره و تحقق «${example.roiEstimateFa}» ارائه بده.`,
    lead_superintendent: `تو دستیار اجرایی «${roleMeta.titleFa}» در عملیات «${meta.titleFa}» (${track.shortTitleFa}) هستی.
فقط بر اساس گزارش‌ها و اسناد موجود در ستون Sources پاسخ بده:
۱. از میان متن اسناد، گلوگاه‌های تداخل جبهه‌ها، کمبود ماشین‌آلات/نیرو و عوامل کندی در [${kpisList.join(' | ')}] را با ذکر شماره بخش استخراج کن.
۲. یک جدول برنامه جبرانی هفته جاری با ستون‌های [جبهه/واحد درگیر | گلوگاه اجرایی | منبع یا تجهیز مورد نیاز | اقدام فوری سرپرست تا ۷۲ ساعت آینده] بساز.
۳. پیش‌نویس یک ابلاغیه کوتاه و قاطع کارگاهی برای هماهنگی پیمانکاران جزء و شیفت‌ها بنویس.`,
    technical_engineer: `تو کارشناس ارشد در جایگاه «${roleMeta.titleFa}» در دیسیپلین «${meta.titleFa}» (${track.shortTitleFa}) هستی.
الزام صفر-توهم: تمام اعداد، بندها و ادعاها باید با شماره پاورقی مستند به منابع بارگذاری‌شده باشند:
۱. مفاد اسناد را با چارچوب «${standardsList.join(' / ')}» تطبیق بده و تمام مغایرت‌ها یا نقاط مبهم مرتبط با «${example.businessProblemFa}» را شکار کن.
۲. یک جدول ممیزی فنی-قراردادی با ستون‌های [موضوع فنی / بند مرجع | حد یا الزام استاندارد | وضعیت ثبت‌شده در گزارش | وضعیت تطبیق و اقدام دفتر فنی] روی شاخص‌های [${kpisList.join(' | ')}] تولید کن.
۳. اگر داده یا تاییدیه‌ای برای دفاع در صورت‌وضعیت یا لایحه کسری دارد، دقیقاً فهرست کن.`,
    site_operator: `تو دستیار خط مقدم و ایمنی برای «${roleMeta.titleFa}» در بخش «${meta.titleFa}» (${track.shortTitleFa}) هستی.
با تکیه صددرصدی به دستورالعمل‌ها و استانداردهای بارگذاری‌شده (${standardsList[0]}) و بدون هیچ حدس‌زدنی پاسخ بده:
۱. تمام حدود مجاز عملیاتی، تلرانس‌ها و خط قرمزهای توقف اضطراری مرتبط با [${kpisList.join(' | ')}] را با ذکر شماره صفحه از سند بیرون بکش.
۲. یک چک‌لیست جیبی شیفت در قالب جدول ۴ ستونه [نقطه بازرسی / پارامتر | حد مجاز استاندارد (SOP) | نشانه خطر یا خطا | دستور اقدام فوری در محل] بساز.
۳. سه اشتباه رایج و پرخطر اپراتورها در این دیسیپلین را بر اساس متن سند هشدار بده.`
  };

  return {
    id: 'discipline_active',
    departmentFa: `دیسیپلین فعال: ${meta.shortTitleFa} · سطح ${roleMeta.shortFa}`,
    departmentEn: `Active Discipline: ${meta.shortTitleEn} · ${roleMeta.shortEn}`,
    managerRoleFa: `${roleMeta.titleFa} · جنس چالش: ${roleProfile.challengeTypeFa}`,
    managerRoleEn: `${roleMeta.titleEn} · Focus: ${roleProfile.challengeTypeEn}`,
    iconName: meta.trackId === 'GENERAL_EVERYDAY' ? 'Home' : 'Layers',
    colorTheme: '#0d7477',
    recommendedSourcesFa: roleSpecificSourcesFa[roleId] || roleSpecificSourcesFa.technical_engineer,
    recommendedSourcesEn: [
      `Role focus: ${roleProfile.challengeTypeEn}`,
      `Governing standards: ${meta.governingStandardsEn.join(', ')}`,
      `KPI telemetry: ${meta.performanceMetricsEn.join(' | ')}`
    ],
    keyDeliverablesFa: roleSpecificDeliverablesFa[roleId] || roleSpecificDeliverablesFa.technical_engineer,
    keyDeliverablesEn: [
      roleProfile.deliverableShapeEn,
      ...(example.successCriteriaEn.slice(0, 2))
    ],
    samplePromptFa: roleSpecificPromptFa[roleId] || roleSpecificPromptFa.technical_engineer,
    samplePromptEn: `Act as ${roleMeta.titleEn} in ${meta.titleEn} (${track.shortTitleEn}).
Challenge Nature: ${roleProfile.challengeTypeEn}
Answer strictly from uploaded Sources with inline page/clause citations:
1. Address "${example.businessProblemEn}" focusing on: ${roleProfile.coreConcernEn}.
2. Build a 4-column table covering [${meta.performanceMetricsEn.join(' | ')}] tailored to deliver: ${roleProfile.deliverableShapeEn}.
3. Flag any missing numbers explicitly as "Not recorded in source".`,
    practicalValueFa: `جنس چالش سطح «${roleMeta.shortFa}»: ${roleProfile.coreConcernFa} — ارزش مورد انتظار: ${example.roiEstimateFa}`,
    practicalValueEn: `${roleProfile.coreConcernEn} — Expected impact: ${example.roiEstimateEn}`
  };
}

/**
 * Builds a downloadable Markdown specimen document specifically tailored to (disciplineId, roleId).
 */
export function buildDisciplineNotebookLmDocument(
  disciplineId: DisciplineId,
  roleId: EngineeringRoleId = 'technical_engineer'
): SampleDepartmentDocument {
  const meta = getDisciplineMetadata(disciplineId);
  const example = getDisciplineExampleContent(disciplineId);
  const track = INDUSTRY_TRACKS[meta.trackId];
  const roleMeta = getRoleDisplayMeta(roleId, meta.trackId);
  const roleProfile = getRoleChallengeProfile(roleId, meta.trackId);

  const roleDataSectionByTier: Record<EngineeringRoleId, string> = {
    director: `## ۳. بسته داده‌های تصمیم‌گیری هیئت‌مدیره (سطح مدیرعامل / مدیر طرح)
- **دغدغه اصلی این رده:** ${roleProfile.coreConcernFa}
- **مدل مالی و حاکمیت قرارداد:** ${meta.governingStandardsFa.join(' | ')}
- **برآورد اقتصادی و بازگشت سرمایه (ROI):** ${example.costBenefitSummaryFa} ← **${example.roiEstimateFa}**
- **سوال کلیدی جلسه تصمیم‌گیری:** در صورت تداوم انحراف در «${meta.performanceMetricsFa[0]}»، کدام گزینه (اصلاح پیمان / تزریق تجهیز / تغییر توالی جبهه) کمترین ریسک مالی و بیشترین حفاظت از برنامه کلان را دارد؟`,
    lead_superintendent: `## ۳. لاگ وضعیت جبهه‌های اجرایی و هماهنگی کارگاه (سطح سرپرست / رئیس کارگاه)
- **دغدغه اصلی این رده:** ${roleProfile.coreConcernFa}
- **گزارش میدانی شیفت‌ها:** در جبهه فعال «${meta.shortTitleFa}»، هماهنگی بین پیمانکاران جزء، تامین به‌موقع ماشین‌آلات و حفظ ریتم شاخص «${meta.performanceMetricsFa[0]}» دچار گلوگاه شده است.
- **نیاز فوری سرپرست:** تفکیک موانع قابل حل درون‌کارگاهی (تغییر توالی، شیفت‌بندی، جابه‌جایی تجهیز) از موانعی که نیازمند ارجاع به ستاد/دفتر فنی است.`,
    technical_engineer: `## ۳. پرونده ممیزی فنی، استانداردها و مستندات پیمان (سطح دفتر فنی / کنترل پروژه)
- **دغدغه اصلی این رده:** ${roleProfile.coreConcernFa}
- **بندها و استانداردهای مبنا برای تطبیق:**
${meta.governingStandardsFa.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}
- **نکته ممیزی:** تمام اعداد استخراج‌شده برای شاخص‌های «${meta.performanceMetricsFa.join('، ')}» باید به شماره صفحه و ردیف گزارش متصل شوند تا در دفاع از صورت‌وضعیت یا لایحه تاخیرات رد نشوند.`,
    site_operator: `## ۳. برگ حدود مجاز عملیاتی و چک‌لیست خط قرمز شیفت (سطح اجرا / اپراتور / بازرس کیفی)
- **دغدغه اصلی این رده:** ${roleProfile.coreConcernFa}
- **خط قرمزهای عملیاتی حین کار:**
  - پایش مستمر شاخص اول (**${meta.performanceMetricsFa[0]}**) پیش از خروج از محدوده مجاز استاندارد.
  - کنترل شاخص دوم (**${meta.performanceMetricsFa[1] || meta.performanceMetricsFa[0]}**) و ثبت فوری هر ناهنجاری پیش از ادامه کار.
  - توقف کار و ثبت گزارش ایمنی/کیفی در صورت مشاهده مغایرت با **${meta.governingStandardsFa[0]}**.`
  };

  const mdContent = `# بسته سند نمونه NotebookLM · دیسیپلین «${meta.titleFa}» (سطح: ${roleMeta.titleFa})
**مسیر / هلدینگ:** ${track.titleFa}
**دیسیپلین تخصصی:** ${meta.titleFa} (\`${meta.id}\`)
**سطح سازمانی مخاطب:** ${roleMeta.titleFa}
**جنس چالش این سطح:** ${roleProfile.challengeTypeFa}

---

## ۱. مسئله و دغدغه اصلی در این سطح سازمانی
${meta.descriptionFa}

**صورت‌مسئله محوری دیسیپلین:**
${example.businessProblemFa}

**چرا در این رده سازمانی به تحلیل مستند نیاز داریم؟**
${example.whyAiFa}

---

## ۲. ماتریس شاخص‌های پایش (KPIs) متناسب با رده ${roleMeta.shortFa}
| ردیف | شاخص کلیدی | تمرکز تحلیل در سطح ${roleMeta.shortFa} | مرجع استاندارد |
| :--- | :--- | :--- | :--- |
${meta.performanceMetricsFa
  .map(
    (kpi, idx) =>
      `| ${idx + 1} | ${kpi} | ${roleProfile.deliverableShapeFa} | ${meta.governingStandardsFa[0] || track.shortTitleFa} |`
  )
  .join('\n')}

---

${roleDataSectionByTier[roleId] || roleDataSectionByTier.technical_engineer}

---

## ۴. خروجی مورد انتظار و معیارهای پذیرش
${example.successCriteriaFa.map((c, i) => `- [ ] **معیار ${i + 1}:** ${c}`).join('\n')}
`;

  return {
    id: `doc_${disciplineId}_${roleId}`,
    departmentId: 'discipline_active',
    fileName: `NotebookLM_${disciplineId}_${roleId}.md`,
    titleFa: `بسته سند اختصاصی «${meta.shortTitleFa}» برای سطح «${roleMeta.shortFa}»`,
    titleEn: `Specimen Pack · ${meta.shortTitleEn} (${roleMeta.shortEn})`,
    fileSizeApprox: '۴ کیلوبایت',
    summaryFa: `متناسب‌سازی‌شده برای چالش «${roleProfile.challengeTypeFa}» در دیسیپلین ${meta.shortTitleFa}؛ شامل KPIها، استاندارد ${meta.governingStandardsFa[0]} و داده‌های سطح ${roleMeta.shortFa}.`,
    summaryEn: `Tailored for ${roleProfile.challengeTypeEn} in ${meta.shortTitleEn}.`,
    markdownContent: mdContent
  };
}

/**
 * Builds a tailored Real-Doc Lab scenario in NotebookLM Workshop where BOTH discipline AND organizational level
 * reshape the exercise title, challenge objective, workflow steps, Studio output, and prompt.
 */
export function buildDisciplineNotebookLmExercise(
  disciplineId: DisciplineId,
  roleId: EngineeringRoleId = 'technical_engineer'
): NotebookLmExercise {
  const meta = getDisciplineMetadata(disciplineId);
  const example = getDisciplineExampleContent(disciplineId);
  const track = INDUSTRY_TRACKS[meta.trackId];
  const roleMeta = getRoleDisplayMeta(roleId, meta.trackId);
  const roleProfile = getRoleChallengeProfile(roleId, meta.trackId);
  const deptCase = buildDisciplineNotebookLmDepartment(disciplineId, roleId);

  const titleByRoleFa: Record<EngineeringRoleId, string> = {
    director: `تمرین اختصاصی مدیران (${meta.shortTitleFa}): تصمیم‌گیری پورتفوی و بریف هیئت‌مدیره`,
    lead_superintendent: `تمرین اختصاصی سرپرستان (${meta.shortTitleFa}): رفع گلوگاه جبهه‌ها و هماهنگی شیفت`,
    technical_engineer: `تمرین اختصاصی دفتر فنی (${meta.shortTitleFa}): ممیزی مغایرت‌ها و ارجاع بندبه‌بند`,
    site_operator: `تمرین اختصاصی خط مقدم (${meta.shortTitleFa}): چک‌لیست خط قرمز ایمنی/SOP و نقشه ذهنی`
  };

  const titleByRoleEn: Record<EngineeringRoleId, string> = {
    director: `Executive Lab (${meta.shortTitleEn}): Board Risk Brief & ROI Tradeoff`,
    lead_superintendent: `Field Lead Lab (${meta.shortTitleEn}): Bottleneck & Shift Dispatch Audit`,
    technical_engineer: `Technical Office Lab (${meta.shortTitleEn}): Clause-Cited Compliance Matrix`,
    site_operator: `Frontline Lab (${meta.shortTitleEn}): Shift Red-Line SOP & Mind Map`
  };

  return {
    id: 'ex0_discipline_active',
    exerciseNumber: 0,
    titleFa: titleByRoleFa[roleId] || titleByRoleFa.technical_engineer,
    titleEn: titleByRoleEn[roleId] || titleByRoleEn.technical_engineer,
    targetDepartmentFa: `${meta.shortTitleFa} · سطح ${roleMeta.shortFa}`,
    targetDepartmentEn: `${meta.shortTitleEn} · ${roleMeta.shortEn}`,
    estimatedMinutes: roleId === 'site_operator' ? 12 : 18,
    difficultyFa: `سطح ${roleMeta.shortFa}`,
    difficultyEn: roleMeta.shortEn,
    requiredSourceFa: `فایل آماده NotebookLM_${disciplineId}_${roleId}.md + یک سند واقعی مرتبط با رده شما`,
    requiredSourceEn: `Specimen NotebookLM_${disciplineId}_${roleId}.md + 1 real file for your role`,
    sourceDownloadNoteFa: `این سند نمونه اختصاصاً برای چالش‌های «${roleMeta.shortFa}» در دیسیپلین «${meta.shortTitleFa}» تنظیم شده است.`,
    sourceDownloadNoteEn: `Tailored specifically for ${roleMeta.shortEn} challenges in ${meta.shortTitleEn}.`,
    objectiveFa: `جنس چالش این سطح: ${roleProfile.challengeTypeFa}. هدف تمرین: ${roleProfile.exerciseFocusFa} برای حل «${example.businessProblemFa}».`,
    objectiveEn: `Challenge focus: ${roleProfile.challengeTypeEn}. Objective: ${roleProfile.exerciseFocusEn}.`,
    instructionsFa: [
      `فایل نمونه \`NotebookLM_${disciplineId}_${roleId}.md\` را دانلود یا کپی کرده و به عنوان منبع در NotebookLM بارگذاری کنید (در صورت نیاز یک گزارش یا آیین‌نامه واقعی واحد خودتان را هم اضافه کنید).`,
      `پرامپت آماده زیر را اجرا کنید؛ دقت کنید که جنس خروجی دقیقاً برای سطح «${roleMeta.titleFa}» یعنی **${roleProfile.deliverableShapeFa}** طراحی شده است.`,
      `در پنل Studio ابزار پیشنهادی این رده (**${roleProfile.recommendedStudioToolFa}**) را بسازید و خروجی نهایی را با معیارهای پذیرش زیر کنترل کنید.`
    ],
    instructionsEn: [
      `Upload NotebookLM_${disciplineId}_${roleId}.md (plus an optional real report from ${meta.shortTitleEn}) into NotebookLM.`,
      `Run the role-calibrated prompt below to produce: ${roleProfile.deliverableShapeEn}.`,
      `Generate the recommended Studio output (${roleProfile.recommendedStudioToolEn}) and verify all citations.`
    ],
    promptToCopyFa: deptCase.samplePromptFa,
    promptToCopyEn: deptCase.samplePromptEn,
    successVerificationFa: [
      `جنس تحلیل و تصمیم استخراج‌شده دقیقاً در سطح اختیارات «${roleMeta.shortFa}» (${roleProfile.deliverableShapeFa}) است.`,
      `همه ارقام مرتبط با ${meta.performanceMetricsFa[0]} و بندهای ${meta.governingStandardsFa[0]} با پاورقی [1][2] به منبع متصل شده‌اند.`,
      `ابزار Studio پیشنهادی این سطح (${roleProfile.recommendedStudioToolFa}) بدون اطلاعات جعلی تولید شده است.`
    ],
    successVerificationEn: [
      `Output matches ${roleMeta.shortEn} decision scope (${roleProfile.deliverableShapeEn}).`,
      `All ${meta.performanceMetricsEn[0]} metrics cite source footnotes [1][2].`,
      `Recommended Studio output (${roleProfile.recommendedStudioToolEn}) contains zero hallucinations.`
    ]
  };
}

export interface ModuleExerciseContext {
  trackId?: IndustryTrackId;
  disciplineId?: DisciplineId;
  roleId?: EngineeringRoleId;
}

/**
 * Adapts any Page 0 ModuleExerciseDeck so its workshop goal, scenarios, deliverables,
 * and starter prompts dynamically reflect BOTH the active discipline AND organizational role.
 */
export function adaptModuleExerciseDeckForContext(
  deck: ModuleExerciseDeck,
  context?: ModuleExerciseContext
): ModuleExerciseDeck {
  if (!context?.disciplineId) {
    return deck;
  }

  const meta = getDisciplineMetadata(context.disciplineId);
  const example = getDisciplineExampleContent(context.disciplineId);
  const track = INDUSTRY_TRACKS[context.trackId || meta.trackId];
  const roleId = context.roleId || 'technical_engineer';
  const roleMeta = getRoleDisplayMeta(roleId, track.id);
  const roleProfile = getRoleChallengeProfile(roleId, track.id);
  const showcase = getDisciplinePromptShowcase(context.disciplineId);
  const primaryKpi = meta.performanceMetricsFa[0] || 'شاخص کلیدی عملکرد';
  const primaryStd = meta.governingStandardsFa[0] || track.governingStandardsFa[0] || 'استاندارد مرجع';

  const adaptedExercises = deck.exercises.map((ex, idx) => {
    const contextHeaderFa = `سناریوی سطح «${roleMeta.shortFa}» در دیسیپلین «${meta.shortTitleFa}» (${track.shortTitleFa}): `;
    const disciplineFocusLineFa =
      idx === 0
        ? `\n\n🎯 **جنس چالش این سطح سازمانی:** ${roleProfile.challengeTypeFa}\n📌 **تمرکز دیسیپلین ${meta.shortTitleFa}:** از شاخص‌های [${meta.performanceMetricsFa.slice(0, 3).join(' | ')}] و چارچوب «${primaryStd}» برای حل «${example.businessProblemFa}» با خروجی «${roleProfile.deliverableShapeFa}» استفاده کنید.`
        : `\n\n🎯 **هم‌راستایی با جایگاه «${roleMeta.titleFa}»:** دغدغه کلیدی شما در این گام «${roleProfile.coreConcernFa}» است و معیار قبولی، ارائه «${roleProfile.deliverableShapeFa}» می‌باشد.`;

    const adaptedDeliverableFa = `${ex.deliverableFa} — در قالب «${roleProfile.deliverableShapeFa}» بر مبنای «${primaryKpi}» (${meta.shortTitleFa})`;

    let adaptedPrompt = ex.promptStarterFa
      .replace(/\[نام واحد شما\]|\[نام واحد\]|\[نام تیم\]|\[نام دپارتمان\]/g, meta.shortTitleFa)
      .replace(/\[نام پروژه شما\]/g, `${meta.shortTitleFa} (${track.shortTitleFa})`)
      .replace(/\[نقش شما\]/g, roleMeta.titleFa);

    if (idx === 0 && (deck.moduleId === 'prompting' || deck.moduleId === 'notebooklm')) {
      adaptedPrompt = `${adaptedPrompt}\n\n--- مشخصات سطح سازمانی و دیسیپلین فعال ---\nدیسیپلین: ${meta.titleFa}\nسطح سازمانی: ${roleMeta.titleFa}\nجنس چالش و دغدغه: ${roleProfile.challengeTypeFa} (${roleProfile.coreConcernFa})\nشاخص‌های کلیدی (KPI): ${meta.performanceMetricsFa.join(' | ')}\nاستاندارد مبنا: ${primaryStd}\nقالب خروجی مطلوب این سطح: ${roleProfile.deliverableShapeFa}`;
    } else if (idx === 1 && deck.moduleId === 'prompting') {
      adaptedPrompt = `${showcase.engineeredPromptFa}\n\n[Role Calibration]: تمرکز تحلیل را دقیقاً متناسب با جایگاه «${roleMeta.titleFa}» و خروجی «${roleProfile.deliverableShapeFa}» تنظیم کن.`;
    } else if (idx === 1 && deck.moduleId === 'notebooklm') {
      adaptedPrompt = `${adaptedPrompt}\n\n[تنظیم سطح مخاطب]: این خروجی را دقیقاً متناسب با دغدغه «${roleMeta.titleFa}» (${roleProfile.coreConcernFa}) در حوزه «${meta.shortTitleFa}» شخصی‌سازی کن.`;
    }

    return {
      ...ex,
      scenarioFa: `${contextHeaderFa}${ex.scenarioFa}${disciplineFocusLineFa}`,
      deliverableFa: adaptedDeliverableFa,
      promptStarterFa: adaptedPrompt
    };
  });

  return {
    ...deck,
    workshopGoalFa: `${deck.workshopGoalFa} · متناسب با «${meta.shortTitleFa}» و سطح «${roleMeta.shortFa}» (${roleProfile.challengeTypeFa})`,
    exercises: adaptedExercises
  };
}
