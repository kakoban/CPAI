import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Target,
  ShieldCheck,
  TrendingUp,
  Zap,
  Info,
  Layers,
  Network,
  Cpu,
  MessageSquare,
  Eye,
  Bot,
  Search,
  Workflow,
  GitBranch,
  Split,
  ChevronRight,
  Sliders,
  Filter
} from 'lucide-react';

interface Page13Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage12: () => void;
  onGoToPage14?: () => void;
}

interface PatternDetail {
  id: string;
  number: number;
  nameEn: string;
  nameFa: string;
  icon: string;
  badgeColor: string;
  borderColor: string;
  bgLight: string;
  bgDark: string;
  summaryEn: string;
  summaryFa: string;
  roleInProjectEn: string;
  roleInProjectFa: string;
  inputDataEn: string;
  inputDataFa: string;
  outputEn: string;
  outputFa: string;
  whyChooseEn: string;
  whyChooseFa: string;
  whyExcludeEn: string;
  whyExcludeFa: string;
  pipelineStageEn: string;
  pipelineStageFa: string;
}

export const Page13WhichPatternsUsed: React.FC<Page13Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage12,
  onGoToPage14
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'architect' | 'pipeline' | 'templates' | 'canvas' | 'checklist'>('architect');
  const [primaryPattern, setPrimaryPattern] = useState<string>('predictive');
  const [secondaryPatterns, setSecondaryPatterns] = useState<string[]>(['hyperpersonalization']);
  const [filterCategory, setFilterCategory] = useState<'all' | 'selected' | 'unselected'>('all');

  const PATTERNS: PatternDetail[] = [
    {
      id: 'hyperpersonalization',
      number: 1,
      nameEn: 'Hyperpersonalization',
      nameFa: 'مشتری‌سازی بیش‌ازحد (شخصی‌سازی پیشرفته)',
      icon: 'sparkles',
      badgeColor: '#00738c',
      borderColor: 'border-[#00738c]/40',
      bgLight: 'bg-[#e3f4f7]',
      bgDark: 'dark:bg-[#122830]',
      summaryEn: 'Treat each individual human or customer uniquely as a "segment of one" based on context and preferences.',
      summaryFa: 'رفتار با هر مشتری یا کاربر به عنوان یک «بخش تک‌نفره» متمایز، بر مبنای سوابق رفتار، بافت جاری و ترجیحات فردی.',
      roleInProjectEn: 'Customizes individual recommendations, content rank orders, UI layouts, or bespoke offers for each user.',
      roleInProjectFa: 'سفارشی‌سازی پیشنهادات، رتبه‌بندی فید، چیدمان رابط کاربری یا پیشنهادات تجاری اختصاصی برای هر کاربر.',
      inputDataEn: 'User interaction history, click sequences, dwell time, device context, user preferences.',
      inputDataFa: 'تاریخچه تعاملات کاربر، توالی کلیک‌ها، مدت زمان تماشا، بافت دستگاه و ویژگی‌های زمینه‌ای.',
      outputEn: 'Ranked individual feed scores, customized item lists, dynamic 1-to-1 content delivery.',
      outputFa: 'امتیاز رتبه‌بندی اختصاصی فید، لیست آیتم‌های شخصی‌سازی‌شده، خروجی تعاملی ۱ به ۱.',
      whyChooseEn: 'Chosen when distinct user preferences drive engagement and generic aggregate averages produce poor business outcomes.',
      whyChooseFa: 'زمانی انتخاب می‌شود که سلایق منحصر‌به‌فرد کاربران عامل اصلی موفقیت است و میانگین‌های عمومی رضایت ایجاد نمی‌کنند.',
      whyExcludeEn: 'Excluded when all users require the exact same standard protocol, compliance rules, or regulatory baseline.',
      whyExcludeFa: 'رد می‌شود اگر کلیه کاربران مشمول یک پروتکل یا فرآیند یکسان، قانونی و غیرقابل شخصی‌سازی باشند.',
      pipelineStageEn: 'Downstream Personalization & Scoring Layer',
      pipelineStageFa: 'لایه شخصی‌سازی و امتیازدهی نهایی'
    },
    {
      id: 'conversational',
      number: 2,
      nameEn: 'Conversational / Human Interaction',
      nameFa: 'سیستم‌های تعاملی و زبان طبیعی',
      icon: 'message',
      badgeColor: '#1f5163',
      borderColor: 'border-[#1f5163]/40',
      bgLight: 'bg-[#e8f1f4]',
      bgDark: 'dark:bg-[#162930]',
      summaryEn: 'Comprehend, reason, and converse with humans seamlessly using natural language (speech, audio, and text).',
      summaryFa: 'توانمندسازی رایانه‌ها برای درک، تعامل، استدلال و گفتگوی روان با انسان با زبان طبیعی (متن، صوت و گفتار).',
      roleInProjectEn: 'Provides customer-facing or internal employee conversational dialogue, question answering, and text summarization.',
      roleInProjectFa: 'ارائه رابط تعاملی و گفتگومحور برای مشتریان یا کارکنان داخلی، پاسخ به سوالات، سنتز متون و خلاصه اسناد.',
      inputDataEn: 'Natural language queries, chat transcripts, PDF document corpus, speech audio recordings.',
      inputDataFa: 'پرامپت‌ها و سوالات متنی کاربر، متن چت‌ها، آرشیو اسناد متنی/PDF، صدا و گفتار ضبط‌شده.',
      outputEn: 'Contextually grounded natural language answers, structured task triggers, audio voice speech.',
      outputFa: 'پاسخ‌های زبانی دقیق، خلاصه‌ها، استخراج اطلاعات و فراخوانی توابع سیستمی.',
      whyChooseEn: 'Chosen when users interact through open-ended questions, requiring semantic reasoning over unstructured text.',
      whyChooseFa: 'زمانی انتخاب می‌شود که کاربر با زبان طبیعی و سوالات باز با سیستم تعامل دارد و نیاز به استدلال معنایی است.',
      whyExcludeEn: 'Excluded when interface is purely tabular, numeric, dashboard-driven, or programmatic without conversational requirements.',
      whyExcludeFa: 'رد می‌شود اگر سیستم صرفاً داشبورد تحلیلی عددی، تراکنشی یا فرم استاندارد بدون نیاز به مکالمه باشد.',
      pipelineStageEn: 'Interaction & Dialogue Interface Layer',
      pipelineStageFa: 'لایه رابط تعاملی و استدلال زبانی'
    },
    {
      id: 'predictive',
      number: 3,
      nameEn: 'Predictive Analytics & Decision Support',
      nameFa: 'تحلیل پیش‌بینانه و پشتیبانی تصمیم',
      icon: 'trending',
      badgeColor: '#b87333',
      borderColor: 'border-[#b87333]/40',
      bgLight: 'bg-[#faeee5]',
      bgDark: 'dark:bg-[#2b1e16]',
      summaryEn: 'Forecast future events, estimate probabilities, and augment human judgment with actionable numerical scores.',
      summaryFa: 'تحلیل داده‌های تاریخی برای پیش‌بینی وقایع آینده، تخمین احتمالات و تقویت تصمیم انسان با امتیازات عددی اقدام‌پذیر.',
      roleInProjectEn: 'Calculates quantitative risk scores, probability of events (e.g. click, churn, default), and forecasting targets.',
      roleInProjectFa: 'محاسبه امتیازات احتمالاتی، برآورد ریسک وقایع (مانند کلیک، ریزش کاربر، عدم بازپرداخت وام) و تخمین مقادیر آتی.',
      inputDataEn: 'Historical tabular logs, user profiles, transactional attributes, continuous sensor signals, KPI records.',
      inputDataFa: 'داده‌های ساخت‌یافته جدولی، سوابق تراکنش‌ها، لاگ‌های عددی و زمانی، مقادیر ویژگی‌های استخراج‌شده.',
      outputEn: 'Calibrated probability scores (0.0 to 1.0), numeric regression forecast, multi-class risk categorization.',
      outputFa: 'احتمال کالیبره‌شده (بین ۰ تا ۱)، پیش‌بینی رگرسیون، رتبه‌بندی ریسک، هشدارهای اقدام بعدی.',
      whyChooseEn: 'Chosen when the core business question is "What will happen next?" or "What is the likelihood of this outcome?".',
      whyChooseFa: 'زمانی انتخاب می‌شود که پرسش اصلی کسب‌وکار "در آینده چه رخ خواهد داد؟" یا "احتمال وقوع این رویداد چقدر است؟" باشد.',
      whyExcludeEn: 'Excluded when the goal is physical robotics motion control or perceptual raw image classification without tabular forecasting.',
      whyExcludeFa: 'رد می‌شود اگر مسئله صرفاً کنترل فیزیکی سخت‌افزار یا پردازش حسی خام بدون استنتاج پیش‌بینانه باشد.',
      pipelineStageEn: 'Core Inference & Scoring Engine',
      pipelineStageFa: 'موتور استنتاج تحلیلی و امتیازدهی هسته'
    },
    {
      id: 'recognition',
      number: 4,
      nameEn: 'Recognition Systems',
      nameFa: 'ادراک حسی و بازشناسی الگوها',
      icon: 'eye',
      badgeColor: '#2f7d5b',
      borderColor: 'border-[#2f7d5b]/40',
      bgLight: 'bg-[#eaf4ef]',
      bgDark: 'dark:bg-[#13271d]',
      summaryEn: 'Detect, classify, and identify objects, sounds, handwriting, faces, or defect patterns in unstructured sensory data.',
      summaryFa: 'تشخیص، طبقه‌بندی و شناسایی اشیاء، چهره‌ها، متون دست‌نویس، اصوات و عیوب در داده‌های ادراکی و حسی بدون ساختار.',
      roleInProjectEn: 'Transforms raw pixels, video frames, audio spectrograms, or scanned files into structured semantic tokens.',
      roleInProjectFa: 'تبدیل پیکسل‌های تصویر، فریم‌های ویدیو، امواج صوتی یا اسناد اسکن‌شده به توکن‌ها و برچسب‌های ساخت‌یافته.',
      inputDataEn: 'Raw images, camera video streams, scanned document pages, microphone audio feeds.',
      inputDataFa: 'تصاویر خام، جریان‌های ویدیویی دوربین‌ها، صفحات اسکن‌شده اسناد (PDF/TIFF)، فایل‌های صوتی.',
      outputEn: 'Bounding boxes, segmentation masks, OCR text transcription, classification labels with confidence scores.',
      outputFa: 'کادرهای احاطه‌کننده (Bounding Box)، متن بازشناسی‌شده (OCR)، برچسب رده با درصد اطمینان.',
      whyChooseEn: 'Chosen when inputs are sensory perceptual modalities (vision, audio, scanned documents) that lack predefined tabular keys.',
      whyChooseFa: 'زمانی انتخاب می‌شود که ورودی سامانه داده‌های حسی (بینایی ماشین، صوت، تصویر سند) بدون ساختار جدولی باشد.',
      whyExcludeEn: 'Excluded when all inputs are already neatly structured in SQL databases or CSV tables.',
      whyExcludeFa: 'رد می‌شود اگر کلیه داده‌های ورودی از قبل در جداول پایگاه‌داده ساخت‌یافته و تمیز قرار داشته باشند.',
      pipelineStageEn: 'Perceptual Preprocessing & Feature Extraction',
      pipelineStageFa: 'لایه ادراک حسی و استخراج اولیه ویژگی‌ها'
    },
    {
      id: 'autonomous',
      number: 5,
      nameEn: 'Autonomous Systems',
      nameFa: 'سیستم‌های خودران و عامل‌های مستقل',
      icon: 'bot',
      badgeColor: '#d97706',
      borderColor: 'border-[#d97706]/40',
      bgLight: 'bg-[#fef3c7]/60',
      bgDark: 'dark:bg-[#2e2311]',
      summaryEn: 'Operate independently to complete complex physical or digital workflows with minimal or zero human intervention.',
      summaryFa: 'عملکرد کاملاً مستقل در اجرای وظایف چندمرحله‌ای فیزیکی یا نرم‌افزاری بدون نیاز به مداخله مستمر انسانی.',
      roleInProjectEn: 'Executes closed-loop end-to-end task flows, robotic vehicle movement, or self-governing software processes.',
      roleInProjectFa: 'اجرای حلقه-بسته وظایف چندگانه، هدایت ربات یا پهپاد، یا مدیریت خودکار جریان‌های کاری نرم‌افزاری.',
      inputDataEn: 'Continuous telemetry, multi-sensor radar/LiDAR feeds, environment state observations, multi-system status.',
      inputDataFa: 'تله‌متری مداوم، داده‌های رادار/لیدار و سنسورها، وضعیت لحظه‌ای محیط و سیستم‌های عملیاتی.',
      outputEn: 'Direct physical actuator controls, automated end-to-end transaction commits, self-healing corrections.',
      outputFa: 'فرمان‌های حرکتی و کنترلی محرک‌ها، اجرای خودکار و نهایی تراکنش‌ها، اقدامات خودترمیم‌شونده.',
      whyChooseEn: 'Chosen when the machine must make real-time decisions and execute physical or systemic actions without waiting for a human.',
      whyChooseFa: 'زمانی انتخاب می‌شود که سیستم باید بی‌درنگ و بدون انتظار برای تایید اپراتور، اقدام فیزیکی یا سیستمی انجام دهد.',
      whyExcludeEn: 'Excluded when human-in-the-loop oversight is legally, ethically, or procedurally required for all decisions.',
      whyExcludeFa: 'رد می‌شود اگر طبق مقررات و موازین پروژه، نظارت و تایید انسان برای هر تصمیم حیاتی و الزامی باشد.',
      pipelineStageEn: 'Closed-Loop Action & Execution Layer',
      pipelineStageFa: 'لایه اجرای حلقه-بسته و کنترل خودکار'
    },
    {
      id: 'goaldriven',
      number: 6,
      nameEn: 'Goal-Driven Systems',
      nameFa: 'سیستم‌های هدف‌گرا و یادگیری تقویتی',
      icon: 'target',
      badgeColor: '#7c3aed',
      borderColor: 'border-[#7c3aed]/40',
      bgLight: 'bg-[#f5f3ff]',
      bgDark: 'dark:bg-[#231836]',
      summaryEn: 'Discover optimal sequence of actions through simulation, trial, error, and feedback to maximize an objective function.',
      summaryFa: 'یافتن توالی بهینه اقدامات از طریق شبیه‌سازی، آزمون، خطا و بازخورد محیطی جهت بیشینه‌سازی تابع هدف یا پاداش.',
      roleInProjectEn: 'Optimizes dynamic multi-step scheduling, dynamic auction pricing, supply chain routing, or gaming policies.',
      roleInProjectFa: 'بهینه‌سازی زمان‌بندی پویا، کشف بهترین قیمت مناقصه، مسیریابی لجستیک یا انتخاب استراتژی‌های چندمرحله‌ای.',
      inputDataEn: 'Environment state vectors, allowable action boundaries, reward penalty signals, simulation constraints.',
      inputDataFa: 'بردار وضعیت محیط شبیه‌سازی‌شده، فضای اقدامات ممکن، سیگنال پاداش/جریمه و محدودیت‌های عملیاتی.',
      outputEn: 'Optimal multi-step policy, action recommendation sequence, resource allocation dispatch plan.',
      outputFa: 'سیاست اقدام بهینه، توالی اقدامات راهبردی، برنامه تخصیص بهینه منابع.',
      whyChooseEn: 'Chosen when the path to success requires exploring trade-offs over thousands of steps against a defined reward function.',
      whyChooseFa: 'زمانی انتخاب می‌شود که برای رسیدن به هدف، کاوش سناریوهای متعدد در محیط شبیه‌ساز و بیشینه‌سازی تابع پاداش لازم است.',
      whyExcludeEn: 'Excluded when sufficient historical labeled training data exists for standard supervised classification or regression.',
      whyExcludeFa: 'رد می‌شود اگر داده‌های برچسب‌دار تاریخی کافی برای یادگیری نظارت‌شده سنتی بدون نیاز به شبیه‌سازی در دست باشد.',
      pipelineStageEn: 'Dynamic Policy & Combinatorial Optimizer',
      pipelineStageFa: 'لایه بهینه‌سازی ترکیبیاتی و سیاست‌های پویا'
    },
    {
      id: 'patternsanomalies',
      number: 7,
      nameEn: 'Patterns & Anomalies',
      nameFa: 'کشف الگوها و شناسایی ناهنجاری‌ها',
      icon: 'search',
      badgeColor: '#dc2626',
      borderColor: 'border-[#dc2626]/40',
      bgLight: 'bg-[#fef2f2]',
      bgDark: 'dark:bg-[#2b1616]',
      summaryEn: 'Identify hidden correlations, clustered structures, or rare outlier deviations differing from baseline normalcy.',
      summaryFa: 'شناسایی همبستگی‌های پنهان، ساختارهای خوشه‌ای یا انحرافات نادر و غیرمنتظره نسبت به رفتار متعارف سیستم.',
      roleInProjectEn: 'Flags fraudulent transactions, network intrusion spikes, equipment vibration anomalies, or data drift.',
      roleInProjectFa: 'شناسایی تراکنش‌های مشکوک به کلاهبرداری، حملات سایبری، ارتعاشات غیرعادی تجهیزات صنعتی و انحرافات داده.',
      inputDataEn: 'High-throughput event logs, financial transaction streams, machine sensor telemetry, network flow metrics.',
      inputDataFa: 'لاگ‌های پرحجم سیستمی، جریان تراکنش‌های مالی، داده‌های سنسوری تجهیزات، ترافیک شبکه.',
      outputEn: 'Continuous anomaly score (deviation from norm), outlier flags, cluster topology graphs, audit triggers.',
      outputFa: 'امتیاز پیوسته ناهنجاری، پرچم هشدار انحراف، خوشه‌های ارتباطی پنهان، محرک بازرسی ویژه.',
      whyChooseEn: 'Chosen when anomalies are extremely rare (<1%), constantly evolving, and cannot be captured by static rule thresholds.',
      whyChooseFa: 'زمانی انتخاب می‌شود که رویدادهای هدف بسیار نادرند (<۱٪)، الگوها مدام تغییر می‌کنند و قوانین ثابت کارایی ندارند.',
      whyExcludeEn: 'Excluded when all target classes are balanced, well-known, and predictable via standard supervised classifiers.',
      whyExcludeFa: 'رد می‌شود اگر کلاس‌های مسئله کاملاً متوازن بوده و نیازی به کشف رفتارهای انحرافی ناشناخته نباشد.',
      pipelineStageEn: 'Unsupervised Filtering & Outlier Sentinel',
      pipelineStageFa: 'لایه دیده‌بانی بدون نظارت و فیلتر ناهنجاری'
    }
  ];

  const toggleSecondaryPattern = (id: string) => {
    if (id === primaryPattern) return; // cannot be primary and secondary at once
    setSecondaryPatterns(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const setAsPrimary = (id: string) => {
    setPrimaryPattern(id);
    setSecondaryPatterns(prev => prev.filter(p => p !== id));
  };

  const primaryObj = PATTERNS.find(p => p.id === primaryPattern) || PATTERNS[2];
  const secondaryObjs = PATTERNS.filter(p => secondaryPatterns.includes(p.id));
  const excludedObjs = PATTERNS.filter(p => p.id !== primaryPattern && !secondaryPatterns.includes(p.id));

  // Pre-configured Slide 23 templates
  const TEMPLATES = [
    {
      title: lang === 'fa' ? 'پروژه رتبه‌بندی و پیش‌بینی کلیک ویدیو (الگوی ۳ + ۱)' : 'Video Recommendation & Click Prediction (Patterns 3 & 1)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۳ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns Breakdown)
عنوان کاربرگ: Which patterns are being used in this project?

۱. الگوی اصلی پروژه (Primary Pattern):
- نام الگو: الگوی ۳ - تحلیل پیش‌بینانه و پشتیبانی تصمیم (Predictive Analytics & Decision Support)
- نقش شناختی در این تکرار: برآورد دقیق احتمال کلیک کاربر (CTR) و تخمین مدت زمان تماشای ویدیو (Expected Watch Time).
- داده‌های ورودی: ویژگی‌های جدولی ویدیو (دسته‌بندی، مدت زمان، تعداد بازدید قبلی)، داده‌های بافتی جلسه (ساعت، نوع دستگاه)، و شاخص‌های تعاملی کاربر.
- خروجی الگو: امتیاز عددی احتمال بین ۰ و ۱ برای هر ویدیوی کاندید.
- دلیل انتخاب: پاسخ به سوال اصلی کسب‌وکار که «احتمال درگیر شدن کاربر با این محتوا چقدر است؟» و نیاز به تخمین کمی ارزش قبل از نمایش.

۲. الگوی ثانویه / مکمل (Secondary / Supporting Pattern):
- نام الگو: الگوی ۱ - شخصی‌سازی پیشرفته (Hyperpersonalization)
- نقش شناختی در این تکرار: ترکیب امتیازهای احتمال با پروفایل و ترجیحات یکتای هر کاربر برای ایجاد فید ۱ به ۱ («سگمنت تک‌نفره»).
- نحوه یکپارچگی خط لوله (Pipeline Synergy): الگوی ۳ ویدیوها را امتیازدهی می‌کند، سپس الگوی ۱ فید نهایی را با حفظ تنوع سلیقه و تازگی برای کاربر مرتب می‌سازد.

۳. دلایل رد یا تعویق سایر الگوها در این تکرار (Pattern Elimination & Scope Control):
- الگوی ۲ (تعاملی): کاربر از طریق متن گفتگو نمی‌کند؛ رابط کاربری فید گرافیکی است.
- الگوی ۴ (ادراک حسی/بینایی): پردازش محتوای پیکسل ویدیو در تکرارهای آینده برای دسته‌بندی بصری اضافه خواهد شد؛ در این تکرار متادیتا کافی است.
- الگوی ۵ (خودران): تصمیمی با محرک فیزیکی یا تغییرات مستقل سیستمی بدون کنترل وجود ندارد.
- الگوی ۶ (هدف‌گرا): نیازی به شبیه‌سازی تقویتی چندمرحله‌ای نیست زیرا داده‌های تعامل تاریخی کافی است.
- الگوی ۷ (ناهنجاری): کشف تقلب کلیک در محدوده این تکرار قرار ندارد.

۴. دارایی‌ها و خط‌لوله‌های قابل بهره‌برداری (Leverageable Assets & Toolkits):
- خط لوله‌های پیش‌آموزش‌دیده TensorFlow Recommenders (TFRS) جهت تولید امبدینگ‌های مشترک.
- مدل‌های گرادیان‌افزای بهینه‌شده LightGBM و CatBoost جهت استنتاج با تاخیر کمتر از ۲۰ میلی‌ثانیه.
- ابزار تفسیرپذیری TreeSHAP برای حسابرسی عدم تعصب و شفافیت تصمیمات مدل.`
        : `=== AI Patterns Breakdown (Slide 23 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns Breakdown)
Sheet Title: Which patterns are being used in this project?

1. Primary Cognitive Pattern:
- Pattern: Pattern 3 - Predictive Analytics & Decision Support
- Cognitive Role in this Iteration: Predict user Click-Through Rate (CTR) and estimate expected watch time duration per video impression.
- Input Modality: Tabular video metadata, contextual session features (time of day, device type), and historical engagement metrics.
- Output Contract: Calibrated probability score (0.0 to 1.0) and expected duration score.
- Selection Rationale: Directly answers the core business challenge: "What is the likelihood this user will engage with this content?".

2. Secondary / Supporting Pattern(s):
- Pattern: Pattern 1 - Hyperpersonalization
- Cognitive Role: Translates raw prediction scores into an individualized "segment-of-one" feed order tailored to specific viewer taste and recent session intent.
- Pipeline Orchestration: Pattern 3 provides candidate confidence scores; Pattern 1 optimizes catalog diversity, novelty penalty, and personal rank ordering.

3. Deliberate Elimination of Alternative Patterns (Scope Control):
- Pattern 2 (Conversational): No natural language chat dialogue; user consumes structured video cards.
- Pattern 4 (Recognition): Raw pixel computer vision deferred to future sprints; current iteration leverages catalog metadata.
- Pattern 5 (Autonomous): No physical actuators or self-executing system actions.
- Pattern 6 (Goal-Driven): Supervised learning on historical clicks is sufficient; trial-and-error simulation is unnecessary.
- Pattern 7 (Anomalies): Click-fraud detection handled by separate infrastructure team.

4. Leverageable Accelerators & Toolkits:
- Open-source TensorFlow Recommenders (TFRS) dual-tower architecture.
- Low-latency LightGBM / CatBoost inference serving engine.
- TreeSHAP feature attribution toolkit for fairness and transparency audits.`
    },
    {
      title: lang === 'fa' ? 'پروژه کشف تقلب و حلقه‌های تبانی مالی (الگوی ۷ + ۳)' : 'Financial Fraud Ring & AML Detection (Patterns 7 & 3)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۳ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns Breakdown)
عنوان کاربرگ: Which patterns are being used in this project?

۱. الگوی اصلی پروژه (Primary Pattern):
- نام الگو: الگوی ۷ - کشف الگوها و شناسایی ناهنجاری‌ها (Patterns & Anomalies)
- نقش شناختی: کشف انحرافات شدید از رفتار تراکنشی عادی و شناسایی حلقه‌های پنهان پولشویی و کارت‌های مسروقه بدون نیاز به برچسب‌های از پیش معلوم.
- داده‌های ورودی: جریان برخط تراکنش‌های بانکی، سرعت انتقال وجوه، گراف ارتباطات حساب‌ها و لاگ‌های دستگاه‌ها.
- خروجی الگو: امتیاز ناهنجاری بدون نظارت و نقشه‌برداری پیوندهای مشکوک در گراف تراکنش‌ها.
- دلیل انتخاب: تقلب پدیده‌ای بسیار نادر (<۰.۰۸٪) و همواره در حال تغییر است که روش‌های طبقه‌بندی سنتی در آن دچار افت شدید دقت می‌شوند.

۲. الگوی ثانویه / مکمل (Secondary / Supporting Pattern):
- نام الگو: الگوی ۳ - تحلیل پیش‌بینانه و پشتیبانی تصمیم (Predictive Analytics & Decision Support)
- نقش شناختی: تولید امتیاز ریسک قطعی (Fraud Risk Score) و طبقه‌بندی سطح فوریت جهت ارسال هشدار به کارشناسان مبارزه با پولشویی.
- نحوه یکپارچگی خط لوله: خوشه‌ها و ناهنجاری‌های کشف‌شده توسط الگوی ۷ به عنوان ویژگی‌های ورودی (Feature) به مدل پیش‌بین الگوی ۳ تزریق می‌شوند.

۳. دلایل عدم استفاده از سایر الگوها:
- الگوهای ۱، ۲، ۴، ۵، ۶ به دلیل عدم تطابق با ماهیت تراکنش‌های مالی و نیاز به پاسخگویی شفاف بانکی در این فاز استفاده نشده‌اند.

۴. دارایی‌های قابل بهره‌برداری:
- کتابخانه PyOD (Python Outlier Detection) با الگوریتم‌های Isolation Forest و Deep Autoencoders.
- چارچوب تحلیل گراف PyTorch Geometric برای ردیابی شبکه‌های تبانی مالی.`
        : `=== AI Patterns Breakdown (Slide 23 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns Breakdown)
Sheet Title: Which patterns are being used in this project?

1. Primary Cognitive Pattern:
- Pattern: Pattern 7 - Patterns & Anomalies
- Cognitive Role: Detect abnormal velocity shifts, deviant spending outliers, and clandestine multi-account collusion networks without ground-truth labels.
- Input Modality: High-volume streaming transaction logs, card velocity metrics, IP/device fingerprints, and financial relationship graphs.
- Output Contract: Unsupervised outlier anomaly score and topology subgraphs of suspicious transaction clusters.
- Selection Rationale: Fraudulent activity constitutes <0.08% of transactions, rendering standard supervised classifiers ineffective without anomaly pre-filtering.

2. Secondary / Supporting Pattern(s):
- Pattern: Pattern 3 - Predictive Analytics & Decision Support
- Cognitive Role: Evaluates anomaly signals alongside historical chargeback records to output an actionable risk probability score for AML officers.
- Pipeline Orchestration: Pattern 7 extracts unsupervised outlier indicators; Pattern 3 calibrates decisive probability and triggers tier-1 operational alerts.

3. Deliberate Elimination of Alternative Patterns:
- Patterns 1, 2, 4, 5, 6 are out of scope: no dialogue, no computer vision, and fully audited human escalation required.

4. Leverageable Accelerators & Toolkits:
- Open-source PyOD framework with pre-built Isolation Forest and Autoencoder pipelines.
- PyTorch Geometric (PyG) for Graph Neural Network link prediction.`
    },
    {
      title: lang === 'fa' ? 'پروژه دستیار اسناد و قراردادهای سازمانی (الگوی ۴ + ۲)' : 'Intelligent Document & Contract Copilot (Patterns 4 & 2)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۳ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns Breakdown)
عنوان کاربرگ: Which patterns are being used in this project?

۱. الگوی اصلی پروژه (Primary Pattern):
- نام الگو: الگوی ۴ - ادراک حسی و بازشناسی الگوها (Recognition Systems)
- نقش شناختی: استخراج خودکار متون (OCR)، تشخیص چیدمان سند (Layout Parsing)، شناسایی جداول و مهرهای اسناد حقوقی اسکن‌شده.
- داده‌های ورودی: فایل‌های تصویری اسکن‌شده PDF و TIFF با وضوح‌های مختلف.
- خروجی الگو: متون ساخت‌یافته، جدول‌های استخراج‌شده و متادیتای استنادپذیر اسناد.
- دلیل انتخاب: اسناد حقوقی و مالی به شکل تصویر اسکن‌شده وارد سازمان می‌شوند و اولین گام حیاتی، تبدیل ادراک تصویری به داده دیجیتال است.

۲. الگوی ثانویه / مکمل (Secondary / Supporting Pattern):
- نام الگو: الگوی ۲ - سیستم‌های تعاملی و زبان طبیعی (Conversational / Human Interaction)
- نقش شناختی: درک معنایی مفاد قرارداد، پاسخ به پرسش‌های تحلیلی حقوقدانان با زبان طبیعی و خلاصه‌سازی بندهای پرخطر.
- نحوه یکپارچگی خط لوله: متون استخراج‌شده از الگوی ۴ در پایگاه داده برداری ذخیره شده و توسط موتور تعاملی الگوی ۲ (معماری RAG) مورد استدلال قرار می‌گیرند.

۳. دلایل عدم استفاده از سایر الگوها:
- الگوهای ۱، ۳، ۵، ۶، ۷ در تکرار اول نیازی به پیاده‌سازی ندارند.

۴. دارایی‌های قابل بهره‌برداری:
- موتورهای بازشناسی منبع‌باز PaddleOCR و docTR.
- چارچوب‌های استاندارد RAG (LangChain / LlamaIndex) همراه با مدل‌های زبانی متن‌باز پایه.`
        : `=== AI Patterns Breakdown (Slide 23 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns Breakdown)
Sheet Title: Which patterns are being used in this project?

1. Primary Cognitive Pattern:
- Pattern: Pattern 4 - Recognition Systems
- Cognitive Role: Parse complex document layouts, Optical Character Recognition (OCR), table structure extraction, and stamp/signature verification from raw scanned PDFs.
- Input Modality: Multi-page high-resolution TIFF and scanned PDF documents.
- Output Contract: Structured Markdown text, bounding box coordinates, and extracted key-value pairs.
- Selection Rationale: Incoming documentation arrives as raw image files requiring sensory computer vision prior to any text understanding.

2. Secondary / Supporting Pattern(s):
- Pattern: Pattern 2 - Conversational / Human Interaction
- Cognitive Role: Enables legal and compliance experts to query documentation using conversational natural language, performing clause comparison and risk synthesis.
- Pipeline Orchestration: Pattern 4 parses raw pixels into indexed text chunks; Pattern 2 retrieves relevant clauses via Retrieval-Augmented Generation (RAG) for interactive dialogue.

3. Deliberate Elimination of Alternative Patterns:
- Patterns 1, 3, 5, 6, 7 are outside the primary contract intelligence iteration scope.

4. Leverageable Accelerators & Toolkits:
- Open-source PaddleOCR / docTR layout parsing backbones.
- LangChain / LlamaIndex hybrid retrieval pipelines.`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInsertTemplate = (templateText: string) => {
    if (content.trim()) {
      onChangeContent(content + '\n\n' + templateText);
    } else {
      onChangeContent(templateText);
    }
    setActiveTab('canvas');
  };

  // Helper to generate dynamic architecture text into canvas
  const handleGenerateArchitecture = () => {
    const secListEn = secondaryObjs.map(s => `Pattern ${s.number}: ${s.nameEn}`).join(', ') || 'None';
    const secListFa = secondaryObjs.map(s => `الگوی ${s.number}: ${s.nameFa}`).join('، ') || 'موردی انتخاب نشده';
    const excListEn = excludedObjs.map(e => `Pattern ${e.number}: ${e.nameEn}`).join(', ') || 'None';
    const excListFa = excludedObjs.map(e => `الگوی ${e.number}: ${e.nameFa}`).join('، ') || 'هیچ‌کدام';

    const textToInsert = lang === 'fa'
      ? `=== پیکربندی الگوهای هوش مصنوعی پروژه (اسلاید ۲۳ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements
پرسش رسمی اسلاید ۲۳: کدام الگوها در این پروژه مورد استفاده قرار می‌گیرند؟ (Which patterns are being used in this project?)

۱. الگوی اصلی (Primary Pattern):
- الگوی منتخب: الگوی ${primaryObj.number} - ${primaryObj.nameFa} (${primaryObj.nameEn})
- نقش در پروژه: ${primaryObj.roleInProjectFa}
- داده‌های ورودی: ${primaryObj.inputDataFa}
- خروجی مورد انتظار: ${primaryObj.outputFa}
- دلیل اصلی انتخاب: ${primaryObj.whyChooseFa}

۲. الگوهای مکمل / ثانویه (Secondary / Supporting Patterns):
${secondaryObjs.length > 0 ? secondaryObjs.map(s => `- الگوی ${s.number} - ${s.nameFa}:
  نقش شناختی: ${s.roleInProjectFa}
  ورودی داده: ${s.inputDataFa}
  خروجی: ${s.outputFa}`).join('\n') : '- در این تکرار الگوی مکمل انتخاب نشده است.'}

۳. یکپارچگی خط لوله الگوها (Pipeline Architecture & Data Flow):
- مرحله ۱ (${primaryObj.pipelineStageFa}): اجرای الگوی اصلی (${primaryObj.nameFa}) جهت تولید استنتاج پایه.
${secondaryObjs.length > 0 ? secondaryObjs.map(s => `- مرحله بعدی (${s.pipelineStageFa}): تزریق خروجی مرحله قبل به الگوی مکمل (${s.nameFa}) جهت تولید ارزش نهایی.`).join('\n') : ''}
- مرحله خروجی: تحویل نتایج پردازش‌شده به سیستم‌های عملیاتی یا کاربران نهایی.

۴. الگوهای ردشده / به تعویق افتاده در این تکرار (Pattern Elimination Rationale):
- الگوهای خارج از دامنه این تکرار: ${excListFa}
- منطق حذف: برای جلوگیری از پیچیدگی غیرضروری معماری در متدولوژی چابک CPMAI، تنها الگوهایی که مستقیماً پاسخگوی داستان کاربر (User Story) این اسپرینت هستند پیاده‌سازی می‌شوند و سایر الگوها تا تکرارهای آتی به تعویق می‌افتند.`
      : `=== AI Pattern Architecture Selection (Slide 23 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Official Slide 23 Prompt: Which patterns are being used in this project?

1. Primary Cognitive Pattern:
- Selected Pattern: Pattern ${primaryObj.number} - ${primaryObj.nameEn}
- Architectural Role: ${primaryObj.roleInProjectEn}
- Input Data Modality: ${primaryObj.inputDataEn}
- Target Output: ${primaryObj.outputEn}
- Primary Rationale: ${primaryObj.whyChooseEn}

2. Secondary / Supporting Pattern(s):
${secondaryObjs.length > 0 ? secondaryObjs.map(s => `- Pattern ${s.number} - ${s.nameEn}:
  Role: ${s.roleInProjectEn}
  Input: ${s.inputDataEn}
  Output: ${s.outputEn}`).join('\n') : '- No secondary patterns assigned for this iteration.'}

3. Multi-Pattern Pipeline Synergy & Flow:
- Stage 1 (${primaryObj.pipelineStageEn}): Executes ${primaryObj.nameEn} to generate intermediate baseline cognitive signals.
${secondaryObjs.length > 0 ? secondaryObjs.map(s => `- Sequential Stage (${s.pipelineStageEn}): Ingests upstream signals into ${s.nameEn} to complete the solution.`).join('\n') : ''}
- Downstream Action: Emits final outputs to production operational consumers or user interface.

4. Excluded Patterns & Deliberate Scope Containment:
- Excluded Patterns: ${excListEn}
- Elimination Rationale: In compliance with agile CPMAI governance, non-essential cognitive capabilities are deferred to prevent architectural sprawl and maintain clear evaluation boundaries.`;

    handleInsertTemplate(textToInsert);
  };

  // Real-time quality verification checks for Slide 23
  const hasPrimary = /primary|اصلی|الگوی اصلی|الگو \d|pattern \d/i.test(content);
  const hasRoleOrObjective = /role|نقش|هدف|وظیفه|objective|function/i.test(content);
  const hasInputOutput = /input|output|ورودی|خروجی|داده|data/i.test(content);
  const hasElimination = /eliminat|exclud|رد|حذف|تعویق|defer|scope|چرا استفاده نشد/i.test(content);
  const hasSynergyOrAsset = /pipeline|خط لوله|synergy|asset|یکپارچگی|ابزار|toolkit|مدل|model/i.test(content);

  const checklistScore = [hasPrimary, hasRoleOrObjective, hasInputOutput, hasElimination, hasSynergyOrAsset].filter(Boolean).length;
  const isComplete = checklistScore >= 4;

  const getPatternIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles': return <Sparkles className="w-5 h-5 text-[#00738c]" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-[#1f5163]" />;
      case 'trending': return <TrendingUp className="w-5 h-5 text-[#b87333]" />;
      case 'eye': return <Eye className="w-5 h-5 text-[#2f7d5b]" />;
      case 'bot': return <Bot className="w-5 h-5 text-[#d97706]" />;
      case 'target': return <Target className="w-5 h-5 text-[#7c3aed]" />;
      case 'search': return <Search className="w-5 h-5 text-[#dc2626]" />;
      default: return <Brain className="w-5 h-5 text-[#00738c]" />;
    }
  };

  const filteredPatterns = PATTERNS.filter(p => {
    if (filterCategory === 'selected') {
      return p.id === primaryPattern || secondaryPatterns.includes(p.id);
    }
    if (filterCategory === 'unselected') {
      return p.id !== primaryPattern && !secondaryPatterns.includes(p.id);
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Official CPMAI Header Banner - Slide 23 Context */}
      <div className="p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-[#1f5163] text-white">
              Phase I: Business Understanding
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6]">
              {lang === 'fa' ? 'گروه وظایف: الزامات شناختی پروژه' : 'Task Group: Cognitive Project Requirements'}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#f0f1ee] dark:bg-[#25323d] text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa' ? 'وظیفه: الزامات شناختی' : 'Task: Cognitive Requirements'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#5d6b73] dark:text-[#9aa8b0]">
            <Workflow className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
            <span>{lang === 'fa' ? 'اسلاید ۲۳ کتاب کار CPMAI' : 'CPMAI Workbook Slide 23'}</span>
          </div>
        </div>

        {/* Slide 23 Title & Official Prompt */}
        <div className="mt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#00738c] dark:text-[#6fb3c6]" />
            <span>
              {lang === 'fa'
                ? 'کدام الگوها در این پروژه مورد استفاده قرار می‌گیرند؟'
                : 'Which patterns are being used in this project?'}
            </span>
          </h2>
          <p className="mt-2 text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
            {lang === 'fa'
              ? 'در این مرحله از متدولوژی CPMAI، باید دقیقاً مشخص کنید کدام‌یک از الگوهای هفت‌گانه هوش مصنوعی به عنوان الگوی اصلی و کدام به عنوان الگوی مکمل انتخاب می‌شوند، داده‌های ورودی و خروجی هر الگو چیست، چگونه در قالب یک خط لوله یکپارچه عمل می‌کنند و چرا سایر الگوها در این تکرار کنار گذاشته شده‌اند.'
              : 'At this critical CPMAI milestone, explicitly declare which of the Seven Patterns of AI serve as your primary and secondary patterns, specify the data flow and role for each, detail multi-pattern pipeline integration, and document why unused patterns are intentionally eliminated for this iteration.'}
          </p>
        </div>

        {/* Selected Pattern Badges Bar */}
        <div className="mt-4 pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
            {lang === 'fa' ? 'وضعیت انتخاب الگوها:' : 'Active Pattern Selection:'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#00738c] text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {lang === 'fa' ? 'الگوی اصلی:' : 'Primary:'} {lang === 'fa' ? primaryObj.nameFa : primaryObj.nameEn}
          </span>
          {secondaryObjs.map(s => (
            <span key={s.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6] border border-[#00738c]/30">
              <Split className="w-3.5 h-3.5" />
              {lang === 'fa' ? 'مکمل:' : 'Secondary:'} {lang === 'fa' ? s.nameFa : s.nameEn}
            </span>
          ))}
          {secondaryObjs.length === 0 && (
            <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] italic">
              {lang === 'fa' ? '(هیچ الگوی مکملی انتخاب نشده است)' : '(No secondary patterns selected)'}
            </span>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#d9dad5] dark:border-[#2d3942] overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('architect')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'architect'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{lang === 'fa' ? 'معمار الگوها (انتخاب و نقش‌ها)' : 'Pattern Architect & Roles'}</span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pipeline'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>{lang === 'fa' ? 'شبیه‌ساز خط لوله الگوها' : 'Pipeline Synergy Flow'}</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'canvas'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'fa' ? 'بوم پاسخ اسلاید ۲۳' : 'Slide 23 Workbook Canvas'}</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'templates'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'fa' ? 'نمونه‌های آماده صنایع' : 'Industry Templates'}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'fa' ? 'چک‌لیست کیفیت CPMAI' : 'CPMAI Quality Audit'}</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            isComplete ? 'bg-[#2f7d5b] text-white' : 'bg-[#d97706] text-white'
          }`}>
            {checklistScore}/5
          </span>
        </button>
      </div>

      {/* TAB 1: ARCHITECT & SELECTION */}
      {activeTab === 'architect' && (
        <div className="space-y-6">
          {/* Quick Architect Action Banner */}
          <div className="p-4 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>{lang === 'fa' ? 'پیکربندی سریع معماری الگوها' : 'Quick Pattern Architecture Generator'}</span>
              </h3>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa'
                  ? 'الگوی اصلی و مکمل‌های مورد نیاز را انتخاب کنید، سپس با زدن این دکمه ساختار رسمی پاسخ اسلاید ۲۳ را در بوم درج نمایید.'
                  : 'Select your primary pattern and secondary supplements, then click to instantly insert the structured Slide 23 responses into your canvas.'}
              </p>
            </div>

            <button
              onClick={handleGenerateArchitecture}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00738c] hover:bg-[#1f5163] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>{lang === 'fa' ? 'تولید و درج معماری در بوم اسلاید ۲۳' : 'Generate & Insert into Canvas'}</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              <Filter className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'فیلتر الگوها:' : 'Filter Patterns:'}</span>
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterCategory === 'all'
                    ? 'bg-[#1f5163] text-white'
                    : 'bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9]'
                }`}
              >
                {lang === 'fa' ? 'همه (۷ الگو)' : 'All (7 Patterns)'}
              </button>
              <button
                onClick={() => setFilterCategory('selected')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterCategory === 'selected'
                    ? 'bg-[#00738c] text-white'
                    : 'bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9]'
                }`}
              >
                {lang === 'fa' ? 'منتخب‌ها (اصلی و مکمل)' : 'Selected'}
              </button>
              <button
                onClick={() => setFilterCategory('unselected')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterCategory === 'unselected'
                    ? 'bg-[#5d6b73] text-white'
                    : 'bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9]'
                }`}
              >
                {lang === 'fa' ? 'کنارگذاشته‌شده‌ها' : 'Excluded'}
              </button>
            </div>

            <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'کلیک روی کارت برای تغییر وضعیت یا مشاهده جزئیات فنی'
                : 'Click card controls to assign roles or inspect technical specifications'}
            </span>
          </div>

          {/* 7 Pattern Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatterns.map(p => {
              const isPrimary = p.id === primaryPattern;
              const isSecondary = secondaryPatterns.includes(p.id);
              const isExcluded = !isPrimary && !isSecondary;

              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isPrimary
                      ? 'border-[#00738c] bg-[#ffffff] dark:bg-[#1a2228] shadow-md ring-2 ring-[#00738c]/20'
                      : isSecondary
                      ? 'border-[#1f5163]/50 bg-[#ffffff] dark:bg-[#1a2228] shadow-xs'
                      : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff]/60 dark:bg-[#1a2228]/60 opacity-80'
                  }`}
                >
                  {/* Pattern Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${p.bgLight} ${p.bgDark} shrink-0`}>
                        {getPatternIcon(p.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9]">
                            #{p.number}
                          </span>
                          <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                            {lang === 'fa' ? p.nameFa : p.nameEn}
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] block mt-0.5">
                          {p.nameEn}
                        </span>
                      </div>
                    </div>

                    {/* Role Badges */}
                    <div>
                      {isPrimary ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#00738c] text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                          {lang === 'fa' ? 'الگوی اصلی' : 'Primary Pattern'}
                        </span>
                      ) : isSecondary ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6] border border-[#00738c]/40">
                          <Split className="w-3 h-3" />
                          {lang === 'fa' ? 'الگوی مکمل' : 'Secondary'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#f0f1ee] dark:bg-[#25323d] text-[#5d6b73] dark:text-[#9aa8b0]">
                          {lang === 'fa' ? 'کنارگذاشته‌شده' : 'Excluded'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary & Project Role */}
                  <div className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-3">
                    <p className="leading-relaxed">
                      <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                        {lang === 'fa' ? 'نقش در پروژه:' : 'Role in Project:'}{' '}
                      </strong>
                      {lang === 'fa' ? p.roleInProjectFa : p.roleInProjectEn}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                      <div>
                        <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                          {lang === 'fa' ? 'داده‌های ورودی:' : 'Input Modality:'}
                        </span>
                        <span className="text-[11px] leading-tight block mt-0.5">
                          {lang === 'fa' ? p.inputDataFa : p.inputDataEn}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9] block">
                          {lang === 'fa' ? 'خروجی الگو:' : 'Expected Output:'}
                        </span>
                        <span className="text-[11px] leading-tight block mt-0.5">
                          {lang === 'fa' ? p.outputFa : p.outputEn}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px]">
                      <span className="font-semibold text-[#2f7d5b] dark:text-[#6ee7b7]">
                        {lang === 'fa' ? 'علت انتخاب:' : 'Selection Rationale:'}{' '}
                      </span>
                      <span>{lang === 'fa' ? p.whyChooseFa : p.whyChooseEn}</span>
                    </div>

                    {isExcluded && (
                      <div className="pt-1 text-[11px] text-[#b87333]">
                        <span className="font-semibold">
                          {lang === 'fa' ? 'علت عدم استفاده در این تکرار:' : 'Why Excluded:'}{' '}
                        </span>
                        <span>{lang === 'fa' ? p.whyExcludeFa : p.whyExcludeEn}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAsPrimary(p.id)}
                        disabled={isPrimary}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isPrimary
                            ? 'bg-[#00738c] text-white cursor-default'
                            : 'bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#00738c] hover:text-white'
                        }`}
                      >
                        {isPrimary
                          ? (lang === 'fa' ? 'الگوی اصلی فعلی' : 'Current Primary')
                          : (lang === 'fa' ? 'تعیین به عنوان الگوی اصلی' : 'Set as Primary')}
                      </button>

                      <button
                        onClick={() => toggleSecondaryPattern(p.id)}
                        disabled={isPrimary}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isPrimary
                            ? 'opacity-40 cursor-not-allowed text-[#5d6b73]'
                            : isSecondary
                            ? 'bg-[#1f5163] text-white hover:bg-[#b87333]'
                            : 'bg-[#f0f1ee] dark:bg-[#25323d] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e3eef1] dark:hover:bg-[#1b2c32]'
                        }`}
                      >
                        {isSecondary
                          ? (lang === 'fa' ? 'حذف از الگوهای مکمل' : 'Remove Secondary')
                          : (lang === 'fa' ? 'افزودن به الگوهای مکمل' : '+ Add as Secondary')}
                      </button>
                    </div>

                    <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono">
                      {lang === 'fa' ? p.pipelineStageFa : p.pipelineStageEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PIPELINE SYNERGY FLOW */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-2 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
              <span>{lang === 'fa' ? 'جریان یکپارچگی خط لوله الگوهای انتخابی شما' : 'Pipeline Synergy & Data Flow'}</span>
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-6 leading-relaxed">
              {lang === 'fa'
                ? 'در متدولوژی CPMAI به ندرت پروژه‌ای تنها از یک الگو استفاده می‌کند. در ادامه نمایش بصری چگونگی عبور داده از الگوی اصلی به الگوهای ثانویه و تبدیل آن به اقدام عملیاتی کسب‌وکار ترسیم شده است.'
                : 'In real-world CPMAI deployments, cognitive systems compose multiple patterns. Below is the active data orchestration pipeline connecting your primary pattern with secondary supplements.'}
            </p>

            {/* Visual Flowchart */}
            <div className="p-6 rounded-xl bg-[#f8f9fa] dark:bg-[#161f26] border border-[#d9dad5] dark:border-[#2d3942] space-y-6">
              {/* Step 1: Raw Data Ingestion */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-48 p-3 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-center shadow-xs shrink-0">
                  <DatabaseIcon className="w-5 h-5 mx-auto text-[#5d6b73] dark:text-[#9aa8b0] mb-1" />
                  <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                    {lang === 'fa' ? 'داده‌های خام ورودی' : 'Raw Input Ingestion'}
                  </span>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] block mt-0.5">
                    {lang === 'fa' ? primaryObj.inputDataFa : primaryObj.inputDataEn}
                  </span>
                </div>

                <div className="flex items-center text-[#00738c] dark:text-[#6fb3c6]">
                  <ChevronRight className="w-6 h-6 hidden sm:block rotate-0" />
                  <ArrowRight className="w-5 h-5 sm:hidden rotate-90" />
                </div>

                {/* Step 2: Primary Pattern Engine */}
                <div className="flex-1 p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border-2 border-[#00738c] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00738c] text-white">
                      {lang === 'fa' ? 'الگوی اصلی (Primary)' : 'Primary Engine'}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00738c] dark:text-[#6fb3c6]">
                      #{primaryObj.number} {primaryObj.nameEn}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? primaryObj.nameFa : primaryObj.nameEn}
                  </h4>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
                    {lang === 'fa' ? primaryObj.roleInProjectFa : primaryObj.roleInProjectEn}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'سیگنال میانی خروجی:' : 'Emitted Intermediate Signal:'}
                    </span>
                    <span className="font-mono text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? primaryObj.outputFa : primaryObj.outputEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3: Secondary Patterns (if any) */}
              {secondaryObjs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-0.5 bg-[#00738c]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {secondaryObjs.map(s => (
                      <div key={s.id} className="p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#1f5163]/40 shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6]">
                            {lang === 'fa' ? 'الگوی مکمل (Secondary)' : 'Supporting Pattern'}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                            #{s.number}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? s.nameFa : s.nameEn}
                        </h4>
                        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                          {lang === 'fa' ? s.roleInProjectFa : s.roleInProjectEn}
                        </p>
                        <div className="mt-2 pt-2 border-t border-[#d9dad5] dark:border-[#2d3942] text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                          <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                            {lang === 'fa' ? 'خروجی نهایی:' : 'Final Output:'}{' '}
                          </strong>
                          {lang === 'fa' ? s.outputFa : s.outputEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Business Consumption */}
              <div className="flex items-center justify-center">
                <div className="h-6 w-0.5 bg-[#2f7d5b]" />
              </div>

              <div className="p-4 rounded-lg bg-[#eaf4ef] dark:bg-[#13271d] border border-[#2f7d5b]/30 text-center">
                <CheckCircle2 className="w-5 h-5 mx-auto text-[#2f7d5b] mb-1" />
                <h5 className="text-xs font-bold text-[#2f7d5b] dark:text-[#6ee7b7]">
                  {lang === 'fa' ? 'ارزش عملیاتی کسب‌وکار (Business Action & ROI)' : 'Downstream Business Action & ROI'}
                </h5>
                <p className="text-xs text-[#1c2830] dark:text-[#e8ebe9] mt-1 max-w-lg mx-auto">
                  {lang === 'fa'
                    ? 'تصمیم‌گیری آگاهانه، کاهش خطای انسانی، افزایش رضایت مشتری و تحقق معیارهای عینی موفقیت تکرار.'
                    : 'Automated operational dispatch, accelerated decision velocity, and delivery of targeted sprint success criteria.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORKBOOK CANVAS */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div>
                <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6]" />
                  <span>{lang === 'fa' ? 'بوم نگارش رسمی اسلاید ۲۳ کتاب کار' : 'Official Slide 23 Canvas'}</span>
                </h3>
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'پاسخ جامع پرسش «کدام الگوها در این پروژه استفاده می‌شوند؟» به صورت خودکار در این فضا ذخیره می‌شود.'
                    : 'Enter your comprehensive Slide 23 responses here. Auto-saved across your sessions.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateArchitecture}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] hover:bg-[#00738c] hover:text-white text-xs font-medium transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'درج خودکار معماری انتخابی' : 'Insert Architecture'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#25323d] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی متن' : 'Copy')}</span>
                </button>

                <button
                  onClick={() => onChangeContent('')}
                  className="p-1.5 rounded-lg text-[#5d6b73] hover:text-[#dc2626] hover:bg-[#fee2e2] dark:hover:bg-[#381e1e] transition-colors"
                  title={lang === 'fa' ? 'پاکسازی بوم' : 'Clear Canvas'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rich Textarea Canvas */}
            <textarea
              value={content}
              onChange={e => onChangeContent(e.target.value)}
              placeholder={
                lang === 'fa'
                  ? `پاسخ اسلاید ۲۳ کتاب کار را اینجا بنویسید یا از دکمه «تولید و درج معماری» در بالا استفاده کنید...

بخش‌های ضروری برای پوشش کامل اسلاید ۲۳:
۱. الگوی اصلی هوش مصنوعی و نقش شناختی آن در این تکرار
۲. الگوهای مکمل / ثانویه و نحوه یکپارچگی خط لوله (Pipeline Integration)
۳. دلایل رد یا به تعویق انداختن ۵ الگوی دیگر در این تکرار (Scope Control)
۴. دارایی‌ها، ابزارها و مدل‌های مرجع قابل استفاده (Toolkits & Foundation Models)`
                  : `Document your comprehensive responses for Slide 23 here...

Key sections to cover:
1. Primary AI pattern and its exact cognitive role in this sprint
2. Secondary/supporting patterns and multi-pattern pipeline synergy
3. Deliberate elimination justification for non-selected patterns
4. Reusable open-source assets, benchmarks, and foundation weights`
              }
              rows={16}
              className="w-full p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#161c22] text-[#1c2830] dark:text-[#e8ebe9] font-mono text-xs sm:text-sm focus:ring-2 focus:ring-[#00738c] focus:outline-none transition-all leading-relaxed"
            />

            {/* Word / Char Counter */}
            <div className="flex items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-2 pt-2 border-t border-[#d9dad5] dark:border-[#2d3942]">
              <div className="flex items-center gap-3 font-mono">
                <span>{lang === 'fa' ? 'تعداد کلمات:' : 'Words:'} {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
                <span>{lang === 'fa' ? 'کاراکترها:' : 'Characters:'} {content.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isComplete ? 'bg-[#2f7d5b]' : 'bg-[#d97706]'}`} />
                <span>
                  {isComplete
                    ? (lang === 'fa' ? 'شاخص‌های کلیدی اسلاید ۲۳ تکمیل شده است' : 'Key Slide 23 checks satisfied')
                    : (lang === 'fa' ? 'بخشی از شاخص‌های کیفیت اسلاید ۲۳ هنوز تکمیل نشده' : 'Quality checklist in progress')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INDUSTRY TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
              {lang === 'fa' ? 'الگوهای مرجع تکمیل‌شده اسلاید ۲۳ در صنایع مختلف' : 'Official Reference Implementations for Slide 23'}
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'می‌توانید هر یک از این نمونه‌های واقعی را متناسب با پروژه خود انتخاب کرده و مستقیماً وارد بوم کنید:'
                : 'Click any industry template to review the complete multi-pattern breakdown or insert it into your workbook canvas:'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {TEMPLATES.map((tmpl, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h4 className="text-sm font-bold text-[#00738c] dark:text-[#6fb3c6] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{tmpl.title}</span>
                  </h4>

                  <button
                    onClick={() => handleInsertTemplate(tmpl.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] hover:bg-[#1f5163] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'درج این الگو در بوم' : 'Insert into Canvas'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-lg bg-[#f8f9fa] dark:bg-[#161f26] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60">
                  {tmpl.text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CPMAI QUALITY CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
            <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2f7d5b]" />
              <span>{lang === 'fa' ? 'ممیزی کیفیت و جامعیت اسلاید ۲۳ کتاب کار CPMAI' : 'CPMAI Slide 23 Quality & Completeness Audit'}</span>
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-4">
              {lang === 'fa'
                ? 'متدولوژی CPMAI الزام می‌کند که هر پاسخ اسلاید ۲۳ دارای حداقل این ۵ مؤلفه اساسی باشد:'
                : 'International CPMAI certification standards require rigorous coverage of these 5 dimensions:'}
            </p>

            <div className="space-y-3">
              <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                hasPrimary ? 'bg-[#eaf4ef] dark:bg-[#13271d] border-[#2f7d5b]/40' : 'bg-[#f8f9fa] dark:bg-[#161f26] border-[#d9dad5] dark:border-[#2d3942]'
              }`}>
                {hasPrimary ? <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" /> : <HelpCircle className="w-5 h-5 text-[#5d6b73] shrink-0 mt-0.5" />}
                <div>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? '۱. تصریح شفاف الگوی اصلی هوش مصنوعی' : '1. Explicit Primary AI Pattern Identified'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                    {lang === 'fa'
                      ? 'الگوی اصلی باید از میان الگوهای هفت‌گانه با شماره و عنوان استاندارد نام‌گذاری شده باشد.'
                      : 'Must explicitly name the core primary pattern from the 7 Patterns of AI.'}
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                hasRoleOrObjective ? 'bg-[#eaf4ef] dark:bg-[#13271d] border-[#2f7d5b]/40' : 'bg-[#f8f9fa] dark:bg-[#161f26] border-[#d9dad5] dark:border-[#2d3942]'
              }`}>
                {hasRoleOrObjective ? <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" /> : <HelpCircle className="w-5 h-5 text-[#5d6b73] shrink-0 mt-0.5" />}
                <div>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? '۲. تعیین دقیق نقش شناختی هر الگو در حل مسئله' : '2. Concrete Cognitive Role Specified'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                    {lang === 'fa'
                      ? 'توضیح اینکه این الگو چه بار شناختی یا تحلیلی را از دوش انسان یا سیستم برمی‌دارد.'
                      : 'Articulate the exact cognitive function performed by the model in this specific iteration.'}
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                hasInputOutput ? 'bg-[#eaf4ef] dark:bg-[#13271d] border-[#2f7d5b]/40' : 'bg-[#f8f9fa] dark:bg-[#161f26] border-[#d9dad5] dark:border-[#2d3942]'
              }`}>
                {hasInputOutput ? <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" /> : <HelpCircle className="w-5 h-5 text-[#5d6b73] shrink-0 mt-0.5" />}
                <div>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? '۳. تبیین داده‌های ورودی و خروجی مورد انتظار' : '3. Input/Output Data Modalities Declared'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                    {lang === 'fa'
                      ? 'نوع داده‌های ورودی (جدولی، تصویری، متنی) و ساختار ریاضی/عملیاتی خروجی (احتمال، رتبه، کادر، متن).'
                      : 'Declare input modalities (tabular, vision, NLP) and output contracts (probability, coordinates, text).'}
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                hasElimination ? 'bg-[#eaf4ef] dark:bg-[#13271d] border-[#2f7d5b]/40' : 'bg-[#f8f9fa] dark:bg-[#161f26] border-[#d9dad5] dark:border-[#2d3942]'
              }`}>
                {hasElimination ? <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" /> : <HelpCircle className="w-5 h-5 text-[#5d6b73] shrink-0 mt-0.5" />}
                <div>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? '۴. استدلال کنار گذاشتن سایر الگوها (Scope Control)' : '4. Justification for Pattern Elimination'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                    {lang === 'fa'
                      ? 'چرا الگوهای دیگر در این اسپرینت استفاده نشده‌اند تا از گسترش بی‌رویه دامنه پروژه جلوگیری شود.'
                      : 'Document why non-selected patterns are intentionally excluded or postponed to subsequent iterations.'}
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                hasSynergyOrAsset ? 'bg-[#eaf4ef] dark:bg-[#13271d] border-[#2f7d5b]/40' : 'bg-[#f8f9fa] dark:bg-[#161f26] border-[#d9dad5] dark:border-[#2d3942]'
              }`}>
                {hasSynergyOrAsset ? <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0 mt-0.5" /> : <HelpCircle className="w-5 h-5 text-[#5d6b73] shrink-0 mt-0.5" />}
                <div>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? '۵. معماری خط لوله و دارایی‌های قابل بهره‌برداری' : '5. Pipeline Synergy & Reusable Toolkits'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                    {lang === 'fa'
                      ? 'چگونگی ارتباط الگوها با یکدیگر و نام بردن از جعبه‌ابزارها، مدل‌های پایه و کدهای منبع‌باز شتاب‌دهنده.'
                      : 'Outline how patterns interface together and identify reusable foundation weights, toolkits, or benchmarks.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer (Back to Page 12 / Slide 22 & Next to Page 14 / Slide 24) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage12}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: صفحه ۱۲ (اسلاید ۲۲: الگوهای هوش مصنوعی)'
              : 'Previous: Page 12 (Slide 22: AI Patterns)'}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] hidden sm:flex items-center gap-2">
            <span>
              {lang === 'fa'
                ? 'تکمیل کاربرگ انتخاب الگوهای هوش مصنوعی (اسلاید ۲۳)'
                : 'Slide 23 Pattern Breakdown Completed'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f7d5b]" />
          </div>

          {onGoToPage14 && (
            <button
              onClick={onGoToPage14}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] hover:bg-[#1f5163] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>
                {lang === 'fa'
                  ? 'صفحه بعدی: صفحه ۱۴ (اسلاید ۲۴: ارزیابی وضعیت — منابع و زمان‌بندی)'
                  : 'Next: Page 14 (Slide 24: Assess Situation)'}
              </span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
