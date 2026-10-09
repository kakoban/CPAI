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
  XCircle,
  HelpCircle,
  Target,
  BarChart3,
  Award,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Plus,
  Trash2,
  Zap,
  Info,
  Layers,
  Network,
  Cpu,
  Compass,
  MessageSquare,
  Eye,
  Bot,
  Flame,
  Search,
  FolderGit2,
  Share2,
  Download
} from 'lucide-react';

interface Page12Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage11: () => void;
  onGoToPage13?: () => void;
}

interface PatternInfo {
  id: string;
  number: number;
  nameEn: string;
  nameFa: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  commonGoalEn: string;
  commonGoalFa: string;
  underlyingTechEn: string;
  underlyingTechFa: string;
  inputOutputEn: string;
  inputOutputFa: string;
  exampleUseCasesEn: string[];
  exampleUseCasesFa: string[];
  leverageableAssetsEn: string[];
  leverageableAssetsFa: string[];
}

export const Page12AiPatterns: React.FC<Page12Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage11,
  onGoToPage13
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'determination' | 'assets' | 'canvas'>('overview');
  const [selectedPrimaryPattern, setSelectedPrimaryPattern] = useState<string>('predictive');
  const [selectedSecondaryPattern, setSelectedSecondaryPattern] = useState<string>('hyperpersonalization');

  // The Seven Patterns of AI from CPMAI (Figure 2)
  const SEVEN_PATTERNS: PatternInfo[] = [
    {
      id: 'hyperpersonalization',
      number: 1,
      nameEn: 'Hyperpersonalization',
      nameFa: 'مشتری‌سازی بیش‌ازحد (شخصی‌سازی پیشرفته)',
      icon: 'sparkles',
      color: '#00738c',
      bgColor: 'bg-[#e3f4f7] dark:bg-[#122830]',
      borderColor: 'border-[#00738c]/30 dark:border-[#00738c]/50',
      commonGoalEn: 'Treat each individual human or customer uniquely as a "segment of one" based on behavioral signals, context, and preferences.',
      commonGoalFa: 'رفتار با هر مشتری یا کاربر به عنوان یک «بخش تک‌نفره» متمایز، بر مبنای سوابق رفتار، زمینه و ترجیحات فردی.',
      underlyingTechEn: 'Collaborative filtering, matrix factorization, two-tower embedding models, contextual bandits, behavioral sequence transformers.',
      underlyingTechFa: 'پالایش مشارکتی، مدل‌های امبدینگ دوبرجی (Two-Tower)، مدل‌های دسته‌بندی توالی رفتاری کاربر، الگوریتم‌های باندیت بافتاری.',
      inputOutputEn: 'Input: User browsing history, click sequences, dwell time, demographics. Output: Custom ranked feeds, individualized product lists, personalized pricing.',
      inputOutputFa: 'ورودی: توالی کلیک‌ها، مدت زمان تماشا، بافت جاری و سوابق تعامل. خروجی: فید رتبه‌بندی‌شده اختصاصی، پیشنهادات ۱ به ۱، تخفیف شخصی.',
      exampleUseCasesEn: [
        'E-commerce tailored product recommendation engine',
        'Video streaming feed ranking and thumbnail selection',
        'Personalized healthcare treatment plans and wellness tips',
        'Dynamic individualized learning and tutoring paths'
      ],
      exampleUseCasesFa: [
        'موتور توصیه محصولات شخصی‌سازی‌شده در فروشگاه اینترنتی',
        'رتبه‌بندی فید ویدیو و انتخاب تصویر شاخص اختصاصی هر کاربر',
        'برنامه‌های درمانی و ورزشی متناسب با ویژگی‌های منحصر‌به‌فرد بیمار',
        'مسیرهای آموزشی و آزمون‌های هوشمند اختصاصی یادگیرنده'
      ],
      leverageableAssetsEn: [
        'TensorFlow Recommenders (TFRS) open-source pipeline',
        'Pre-trained user-item embedding representations',
        'Standard MovieLens & Amazon product metadata benchmarks',
        'Vector database indexing (FAISS, Milvus, Pinecone)'
      ],
      leverageableAssetsFa: [
        'خط لوله آماده TensorFlow Recommenders (TFRS)',
        'نمایش‌های امبدینگ پیش‌آموزش‌دیده کاربر و آیتم',
        'داده‌ها و معیارهای استاندارد ارزیابی (مانند بنچمارک‌های MovieLens)',
        'پایگاه داده‌های برداری آماده جستجوی نزدیک‌ترین همسایه (FAISS، Milvus)'
      ]
    },
    {
      id: 'conversational',
      number: 2,
      nameEn: 'Conversational / Human Interaction',
      nameFa: 'سیستم‌های تعاملی و زبان طبیعی',
      icon: 'message',
      color: '#1f5163',
      bgColor: 'bg-[#e8f1f4] dark:bg-[#162930]',
      borderColor: 'border-[#1f5163]/30 dark:border-[#1f5163]/50',
      commonGoalEn: 'Enable computers to comprehend, interact, reason, and converse with humans seamlessly using natural language (speech, audio, and text).',
      commonGoalFa: 'توانمندسازی رایانه‌ها برای درک، تعامل، استدلال و گفتگوی روان با انسان با استفاده از زبان طبیعی (متن، صوت و گفتار).',
      underlyingTechEn: 'Transformer LLMs, Retrieval-Augmented Generation (RAG), intent classification, Named Entity Recognition (NER), STT / TTS pipelines.',
      underlyingTechFa: 'مدل‌های زبانی بزرگ (LLM)، معماری‌های بازیابی افزوده (RAG)، بازشناسی موجودیت‌های نام‌دار (NER)، تبدیل گفتار به متن و متن به گفتار.',
      inputOutputEn: 'Input: Unstructured natural language text, voice audio, dialog context. Output: Fluent answers, extracted task intents, voice audio, structured action calls.',
      inputOutputFa: 'ورودی: متن بدون ساختار، صوت کاربر، تاریخچه گفتگو. خروجی: پاسخ متنی دقیق، قصد استخراج‌شده، صدای پاسخ، فراخوانی توابع سیستم.',
      exampleUseCasesEn: [
        'Enterprise tier-1 customer service chatbots and voice agents',
        'Contract and legal document conversational Q&A copilots',
        'Clinical medical note dictation and automated synthesis',
        'Interactive code and workflow authoring assistants'
      ],
      exampleUseCasesFa: [
        'چت‌بات‌ها و دستیاران صوتی پشتیبانی مشتریان سازمان',
        'دستیار پرسش و پاسخ تعاملی روی اسناد و قراردادهای حقوقی',
        'رونویسی و خلاصه‌سازی هوشمند یادداشت‌های بالینی پزشکان',
        'دستیاران تعاملی برنامه‌نویسی و پیکربندی خودکار فرآیندها'
      ],
      leverageableAssetsEn: [
        'Open-source foundation model backbones (Llama 3, Mistral, Gemma)',
        'Pre-built RAG chunking and hybrid search frameworks (LangChain, LlamaIndex)',
        'Pre-trained Speech-to-Text models (OpenAI Whisper)',
        'Validated conversational evaluation rubrics (Ragas, MT-Bench)'
      ],
      leverageableAssetsFa: [
        'مدل‌های زبانی منبع‌باز پایه و بهینه‌سازی‌شده برای فارسی/انگلیسی',
        'چارچوب‌های آماده پیاده‌سازی RAG (مانند LangChain و LlamaIndex)',
        'مدل‌های بازشناسی خودکار گفتار پیش‌آموزش‌دیده (Whisper)',
        'سنجه‌ها و بنچمارک‌های استاندارد سنجش کیفیت پاسخ تعاملی (Ragas)'
      ]
    },
    {
      id: 'predictive',
      number: 3,
      nameEn: 'Predictive Analytics & Decision Support',
      nameFa: 'تحلیل پیش‌بینانه و پشتیبانی تصمیم',
      icon: 'trending',
      color: '#b87333',
      bgColor: 'bg-[#faeee5] dark:bg-[#2b1e16]',
      borderColor: 'border-[#b87333]/30 dark:border-[#b87333]/50',
      commonGoalEn: 'Analyze historical and operational data to forecast future events, estimate probabilities, and augment human judgment with actionable scores.',
      commonGoalFa: 'تحلیل داده‌های تاریخی و عملیاتی برای پیش‌بینی وقایع آینده، تخمین احتمالات و تقویت تصمیم انسان با امتیازات اقدام‌پذیر.',
      underlyingTechEn: 'Gradient Boosted Decision Trees (XGBoost, LightGBM, CatBoost), logistic / linear regression, deep tabular models, survival analysis.',
      underlyingTechFa: 'درختان تصمیم گرادیان‌افزا (XGBoost، LightGBM)، رگرسیون لجستیک، شبکه‌های عصبی داده‌های جدولی، تحلیل بقا و سری‌های زمانی.',
      inputOutputEn: 'Input: Structured tabular features, historical events, time series, KPI metrics. Output: Probability scores, risk categories, next-best-action alerts.',
      inputOutputFa: 'ورودی: ویژگی‌های داده‌های جدولی، سوابق تراکنش، معیارهای عملکرد. خروجی: درصد احتمال وقوع، طبقه‌بندی ریسک، پیشنهاد بهترین اقدام بعدی.',
      exampleUseCasesEn: [
        'Video click-through rate (CTR) prediction and watch duration estimation',
        'Customer churn prediction and early flight-risk alerts',
        'Credit scoring, default risk assessment, and loan underwriting',
        'Predictive equipment maintenance and failure forecasting'
      ],
      exampleUseCasesFa: [
        'پیش‌بینی نرخ کلیک ویدیوها (CTR) و تخمین زمان ماندگاری کاربر',
        'پیش‌بینی ریزش مشتریان و هشدارهای زودهنگام خطر خروج',
        'اعتبارسنجی بانکی و تخمین ریسک عدم بازپرداخت تسهیلات',
        'نگهداری و تعمیرات پیش‌بینانه تجهیزات صنعتی پیش از خرابی'
      ],
      leverageableAssetsEn: [
        'Optimized tabular baseline models (LightGBM / CatBoost pipelines)',
        'Model interpretability and explainability toolkits (SHAP, LIME)',
        'Standard hyperparameter optimization templates (Optuna)',
        'Proven calibration curves and ROC-AUC / PR-AUC evaluation suites'
      ],
      leverageableAssetsFa: [
        'خط لوله‌های بهینه‌شده مدل‌های جدولی (LightGBM / CatBoost)',
        'ابزارهای تفسیرپذیری و شفاف‌سازی تصمیمات مدل (SHAP و LIME)',
        'قالب‌های تنظیم خودکار ابرپارامترها (مانند کتابخانه Optuna)',
        'کدهای اعتبارسنجی استاندارد و سنجش دقت کالیبراسیون احتمال'
      ]
    },
    {
      id: 'recognition',
      number: 4,
      nameEn: 'Recognition',
      nameFa: 'ادراک حسی و بازشناسی الگوها',
      icon: 'eye',
      color: '#2f7d5b',
      bgColor: 'bg-[#eaf4ef] dark:bg-[#13271d]',
      borderColor: 'border-[#2f7d5b]/30 dark:border-[#2f7d5b]/50',
      commonGoalEn: 'Detect, classify, and identify entities, objects, sounds, handwriting, faces, or gestures in unstructured sensory and perceptual data.',
      commonGoalFa: 'تشخیص، طبقه‌بندی و شناسایی موجودیت‌ها، اشیاء، چهره‌ها، متون دست‌نویس و اصوات در داده‌های حسی و ادراکی بدون ساختار.',
      underlyingTechEn: 'Convolutional Neural Networks (CNNs), Vision Transformers (ViT), YOLO object detectors, OCR engines, acoustic event classification.',
      underlyingTechFa: 'شبکه‌های عصبی پیچشی (CNN)، ترنسفورمرهای بینایی (ViT)، آشکارسازهای YOLO، موتورهای بازشناسی نویسه (OCR)، مدل‌های طبقه‌بندی صوت.',
      inputOutputEn: 'Input: Images, video feeds, scanned documents, acoustic audio. Output: Bounding boxes, segmentation masks, OCR text, class labels with confidence.',
      inputOutputFa: 'ورودی: تصاویر، استریم ویدیویی، اسناد اسکن‌شده، اصوات محیطی. خروجی: کادرهای احاطه‌کننده (Bounding Box)، متن استخراج‌شده، برچسب رده.',
      exampleUseCasesEn: [
        'Automated legal contract and invoice OCR extraction',
        'Medical imaging diagnostic assistance (X-ray, MRI, CT pathology detection)',
        'Manufacturing defect detection on fast conveyor lines',
        'Facial authentication, license plate recognition, and badge access'
      ],
      exampleUseCasesFa: [
        'استخراج هوشمند متون قراردادها، فاکتورها و مدارک هویتی (OCR)',
        'دستیار تشخیصی تصاویر پزشکی (رادیولوژی، ام‌آرآی، سی‌تی‌اسکن)',
        'بازرسی خودکار عیوب قطعات روی خطوط تولید صنعتی',
        'احراز هویت بیومتریک چهره و پلاک‌خوان هوشمند خودروها'
      ],
      leverageableAssetsEn: [
        'Pre-trained vision architectures (YOLOv8/v11, ResNet, Vision Transformer)',
        'Open-source OCR toolkits (PaddleOCR, Tesseract, docTR)',
        'COCO / ImageNet transfer learning weights and fine-tuning scripts',
        'Data augmentation pipelines (Albumentations, TorchVision)'
      ],
      leverageableAssetsFa: [
        'معماری‌های پیش‌آموزش‌دیده بینایی ماشین (YOLOv8/v11، ResNet، ViT)',
        'موتورهای منبع‌باز قدرتمند OCR (مانند PaddleOCR، Tesseract)',
        'وزن‌های یادگیری انتقالی مبتنی بر دیتاست‌های جهانی (COCO، ImageNet)',
        'خط لوله‌های آماده افزایش مصنوعی داده‌های تصویر (Albumentations)'
      ]
    },
    {
      id: 'autonomous',
      number: 5,
      nameEn: 'Autonomous Systems',
      nameFa: 'سیستم‌های خودران و عامل‌های مستقل',
      icon: 'bot',
      color: '#d97706',
      bgColor: 'bg-[#fef3c7]/50 dark:bg-[#2e2311]',
      borderColor: 'border-[#d97706]/30 dark:border-[#d97706]/50',
      commonGoalEn: 'Operate independently and complete complex physical or digital tasks with minimal or zero human intervention while adapting to changing conditions.',
      commonGoalFa: 'عملکرد کاملاً مستقل و اجرای وظایف پیچیده فیزیکی یا نرم‌افزاری بدون نیاز به مداخله مستمر انسان همراه با سازگاری با محیط متغیر.',
      underlyingTechEn: 'Sensor fusion, Simultaneous Localization and Mapping (SLAM), autonomous agent planners (ReAct), multi-agent swarms, cognitive RPA.',
      underlyingTechFa: 'تلفیق سنسورها (Sensor Fusion)، نقشه‌برداری هم‌زمان (SLAM)، عامل‌های خودکار نرم‌افزاری (ReAct Loops)، اتوماسیون فرآیند شناختی.',
      inputOutputEn: 'Input: Environmental sensory feeds, telemetry, multi-step goal objectives. Output: Physical actuator control signals, multi-system transactional executions.',
      inputOutputFa: 'ورودی: سیگنال‌های سنسوری محیط، داده‌های تله‌متری، اهداف چندمرحله‌ای. خروجی: فرمان‌های حرکتی به محرک‌ها، اجرای خودکار زنجیره تراکنش‌ها.',
      exampleUseCasesEn: [
        'Self-driving passenger vehicles and autonomous warehouse delivery robots',
        'Autonomous software agents executing end-to-end customer onboarding',
        'Unmanned aerial vehicles (drones) inspecting power lines and agriculture',
        'Self-healing cloud infrastructure and automated incident remediation'
      ],
      exampleUseCasesFa: [
        'خودروهای خودران و ربات‌های انباردار بدون راننده در مراکز توزیع',
        'عامل‌های نرم‌افزاری مستقل مجری فرآیند کامل ثبت‌نام و فعال‌سازی حساب',
        'پهپادهای خودران جهت بازرسی خطوط انتقال برق و اراضی کشاورزی',
        'زیرساخت‌های ابری خودترمیم‌شونده و رفع خودکار نقص‌های امنیتی'
      ],
      leverageableAssetsEn: [
        'Robot Operating System (ROS 2) navigation packages',
        'Multi-agent cognitive orchestrators (AutoGen, CrewAI, LangGraph)',
        'Standard simulation physics engines (CARLA, Isaac Sim, Gazebo)',
        'Safety supervisor monitors and fail-safe interlocking protocols'
      ],
      leverageableAssetsFa: [
        'بسته‌های مسیریابی و کنترل Robot Operating System (ROS 2)',
        'چارچوب‌های هماهنگ‌سازی عامل‌های هوشمند (AutoGen، CrewAI)',
        'موتورهای شبیه‌ساز فیزیکی استاندارد محیط (Gazebo، CARLA)',
        'معماری‌های مرجع مانیتورینگ ایمنی و سوییچ‌های قطع اضطراری'
      ]
    },
    {
      id: 'goaldriven',
      number: 6,
      nameEn: 'Goal-Driven Systems',
      nameFa: 'سیستم‌های هدف‌گرا و بهینه‌سازی تقویتی',
      icon: 'target',
      color: '#7c3aed',
      bgColor: 'bg-[#f5f3ff] dark:bg-[#231836]',
      borderColor: 'border-[#7c3aed]/30 dark:border-[#7c3aed]/50',
      commonGoalEn: 'Discover optimal sequences of actions through trial, error, simulation, and feedback to achieve a specific target or maximize reward functions.',
      commonGoalFa: 'یافتن توالی بهینه اقدامات از طریق آزمون، شبیه‌سازی و بازخورد محیطی جهت رسیدن به هدف یا بیشینه‌سازی تابع پاداش.',
      underlyingTechEn: 'Reinforcement Learning (RL), Deep Q-Networks (DQN), Proximal Policy Optimization (PPO), Monte Carlo Tree Search, Genetic Algorithms.',
      underlyingTechFa: 'یادگیری تقویتی (RL)، الگوریتم‌های PPO و DQN، جستجوی درختی مونت‌کارلو، الگوریتم‌های ژنتیک و بهینه‌سازی مقید ریاضی.',
      inputOutputEn: 'Input: State observations, action space constraints, reward signals. Output: Optimized policy action mapping, dynamic operational schedules.',
      inputOutputFa: 'ورودی: ماتریس وضعیت محیط، فضای اقدامات مجاز، سیگنال پاداش/جریمه. خروجی: سیاست اقدام بهینه، برنامه تخصیص منابع و زمان‌بندی پویا.',
      exampleUseCasesEn: [
        'Real-time automated ad-bidding auctions and financial algorithmic trading',
        'Supply chain global routing, container scheduling, and inventory reordering',
        'Game playing AI masters (chess, Go, multiplayer tactical strategies)',
        'HVAC energy consumption and data center thermal optimization'
      ],
      exampleUseCasesFa: [
        'حراج‌های بلادرنگ مناقصه تبلیغات و معاملات الگوریتمی بازارهای مالی',
        'بهینه‌سازی شبکه توزیع و لجستیک زنجیره تأمین و چینش کانتینرها',
        'سیستم‌های تسلط بر بازی‌های استراتژیک و محیط‌های شبیه‌سازی رقابتی',
        'بهینه‌سازی مصرف انرژی سیستم‌های سرمایش و حرارت در مراکز داده بزرگ'
      ],
      leverageableAssetsEn: [
        'Standard RL libraries (Stable-Baselines3, Ray RLlib, CleanRL)',
        'Google OR-Tools combinatorial optimization solvers',
        'Gymnasium / PettingZoo simulated benchmark environments',
        'Standard reward function reward-shaping formulation templates'
      ],
      leverageableAssetsFa: [
        'کتابخانه‌های یادگیری تقویتی استاندارد (Stable-Baselines3، Ray RLlib)',
        'حل‌کننده‌های بهینه‌سازی ترکیبیاتی ریاضی (Google OR-Tools)',
        'محیط‌های شبیه‌سازی بنچمارک Gymnasium',
        'فرمول‌ها و الگوهای آماده مهندسی و شکل‌دهی تابع پاداش (Reward Shaping)'
      ]
    },
    {
      id: 'patternsanomalies',
      number: 7,
      nameEn: 'Patterns & Anomalies',
      nameFa: 'کشف الگوها و شناسایی ناهنجاری‌ها',
      icon: 'search',
      color: '#dc2626',
      bgColor: 'bg-[#fef2f2] dark:bg-[#2b1616]',
      borderColor: 'border-[#dc2626]/30 dark:border-[#dc2626]/50',
      commonGoalEn: 'Identify hidden correlations, clustered structures, or rare deviant signals that differ significantly from baseline expected behavior.',
      commonGoalFa: 'شناسایی همبستگی‌های پنهان، ساختارهای خوشه‌ای یا سیگنال‌های انحرافی نادر که با رفتار عادی مبنا به طور چشمگیر تفاوت دارند.',
      underlyingTechEn: 'Isolation Forests, One-Class SVM, Deep Autoencoders, DBSCAN clustering, Graph Neural Networks (GNNs), statistical Z-score deviation.',
      underlyingTechFa: 'جنگل‌های ایزوله‌سازی (Isolation Forest)، خودرمزگذارها (Autoencoder)، خوشه‌بندی DBSCAN، شبکه‌های عصبی گرافی (GNN)، سنجش انحراف آماری.',
      inputOutputEn: 'Input: High-volume transaction streams, system logs, sensor time series. Output: Outlier risk scores, fraud ring graphs, root cause alert indicators.',
      inputOutputFa: 'ورودی: حجم عظیم تراکنش‌های لحظه‌ای، لاگ‌های سیستمی، سری‌های زمانی سنسورها. خروجی: امتیاز ناهنجاری، شناسایی حلقه‌های تقلب، هشدارهای انحراف.',
      exampleUseCasesEn: [
        'Banking and credit card transaction fraud ring detection',
        'Cybersecurity network intrusion detection and unauthorized exfiltration',
        'Industrial machine telemetry anomaly detection before catastrophic breakdown',
        'Healthcare claims overbilling and medical billing compliance audits'
      ],
      exampleUseCasesFa: [
        'کشف تبانی و حلقه‌های کلاهبرداری تراکنش‌های بانکی و کارت‌های اعتباری',
        'شناسایی نفوذ به شبکه و خروج غیرمجاز داده‌ها در امنیت سایبری',
        'تشخیص ناهنجاری‌های ارتعاشی توربین‌ها و ماشین‌آلات پیش از فاجعه',
        'شناسایی پرونده‌های مشکوک به تخلف و بیش‌صورت‌حسابی در بیمه سلامت'
      ],
      leverageableAssetsEn: [
        'PyOD (Python Outlier Detection) comprehensive toolkit',
        'Pre-built Isolation Forest and Autoencoder pipelines',
        'Graph analytics frameworks (NetworkX, DGL, PyTorch Geometric)',
        'Standard credit card fraud benchmark datasets (e.g. ULB IEEE-CIS)'
      ],
      leverageableAssetsFa: [
        'جعبه‌ابزار جامع PyOD (Python Outlier Detection)',
        'خط لوله‌های آماده جنگل ایزوله‌سازی و شبکه‌های Autoencoder',
        'چارچوب‌های تحلیل گراف و کشف حلقه‌های ارتباطی (PyTorch Geometric)',
        'دیتاست‌ها و کدهای بنچمارک استاندارد جهانی کشف تقلب اعتباری'
      ]
    }
  ];

  // Templates for canvas insertion based on slide 22
  const TEMPLATES = [
    {
      title: lang === 'fa' ? 'پروژه پیش‌بینی کلیک و رتبه‌بندی ویدیو (الگوی ترکیبی ۳ و ۱)' : 'Video Click Prediction & Ranking (Hybrid Pattern 3 & 1)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۲ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns - Figure 2)

۱. کدام‌یک از الگوهای هفت‌گانه هوش مصنوعی در این پروژه استفاده می‌شوند؟ (Which patterns are used?)
- الگوی اصلی (Primary Pattern): الگوی ۳ - تحلیل پیش‌بینانه و پشتیبانی تصمیم (Predictive Analytics & Decision Support)
  هدف: برآورد احتمال کلیک کاربر (CTR) روی ویدیوها و تخمین زمان تماشای تخمینی (Expected Watch Duration) بر پایه داده‌های ویژگی‌های ویدیو و تعاملات تاریخی.
- الگوی مکمل/ثانویه (Secondary Pattern): الگوی ۱ - شخصی‌سازی پیشرفته (Hyperpersonalization)
  هدف: رتبه‌بندی اختصاصی فید هر کاربر به صورت ۱ به ۱ بر اساس اولویت‌ها، تاریخچه و بافت لحظه‌ای (Context) به عنوان یک سگمنت تک‌نفره.

۲. چگونه این تصمیم و انتخاب را اتخاذ کردید؟ (How did you make this determination?)
الف) ماهیت داده‌های ورودی: داده‌های این پروژه شامل ویژگی‌های جدولی محتوا (طول ویدیو، دسته‌بندی، سابقه تعامل) همراه با ماتریس تعاملات کاربر است که دقیقاً با الگوریتم‌های رگرسیون و پیش‌بینی طبقه‌بندی همخوانی دارد.
ب) ماهیت خروجی مورد انتظار: خروجی سیستم یک عدد احتمالاتی بین ۰ و ۱ (احتمال کلیک) و یک بردار رتبه‌بندی فید است که تصمیم انتخاب محتوا را برای موتور پیشنهاددهنده بهینه‌سازی می‌کند.
ج) رد سایر الگوها: این مسئله نیازمند کنترل خودکار محرک فیزیکی نیست (رد سیستم خودران)، با زبان طبیعی آزاد چت نمی‌کند (رد سیستم تعاملی)، و نیازی به کشف رفتار غیرعادی یا ناهنجاری امنیتی ندارد (رد الگوی ۷). بنابراین الگوی ۳ و ۱ تطابق ۱۰۰٪ دارند.

۳. چه پروژه‌های مشابهی با این الگوها ساخته شده‌اند که می‌توان از دارایی‌های آن‌ها استفاده کرد؟ (Leverageable assets & similar projects)
- پروژه‌های مرجع مشابه: سیستم رتبه‌بندی توصیه‌گر YouTube (معماری Two-Tower)، الگوریتم رتبه‌بندی فید تیک‌تاک و سیستم توصیه نتفلیکس.
- دارایی‌های قابل بهره‌برداری (Leverageable Assets):
  ۱. خط لوله متن‌باز TensorFlow Recommenders (TFRS) جهت ساخت لایه امبدینگ مشترک کاربران و ویدیوها.
  ۲. مدل‌های LightGBM و CatBoost بهینه‌شده برای پیش‌بینی سریع نرخ کلیک با ویژگی‌های تبولی و دسته‌ای.
  ۳. پایگاه‌داده برداری FAISS برای بازیابی پرسرعت (Candidate Generation) از میان میلیون‌ها ویدیو.
  ۴. ابزار SHAP جهت تحلیل اهمیت ویژگی‌ها و کشف سهم هر فاکتور در تصمیم‌گیری الگوریتم.`
        : `=== AI Patterns for Project (Slide 22 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns - Figure 2)

1. Which of these patterns are used in this project?
- Primary Pattern: Pattern 3 - Predictive Analytics & Decision Support
  Objective: Estimate video Click-Through Rate (CTR) and predict watch duration to score candidate videos for downstream ranking.
- Secondary Pattern: Pattern 1 - Hyperpersonalization
  Objective: Deliver an individualized 1-to-1 feed ranking for each user based on real-time context and historical taste profiles.

2. How did you make this determination?
A) Input Data Modality: Tabular engagement logs, user interaction history, and contextual session features directly match supervised learning pipelines.
B) Nature of System Output: A calibrated probability score (pCTR) and personalized ranking order, which supports automated catalog presentation.
C) Elimination of Alternative Patterns: The task requires neither physical action (eliminating Autonomous Systems) nor open-ended conversational dialogue (eliminating Conversational AI) nor fraud outlier tracking (eliminating Anomalies). Hence, Patterns 3 & 1 represent the exact architectural fit.

3. What other similar projects have been built using these patterns from which you can leverage assets?
- Benchmark Projects: YouTube Two-Tower Candidate Generation, Netflix Personalization Engine, and TikTok DLRM ranking architectures.
- Leverageable Assets & Accelerators:
  1. Open-source TensorFlow Recommenders (TFRS) pipeline for dual-encoder user/video representations.
  2. Optimized LightGBM and CatBoost baseline ensembles for low-latency CTR inference.
  3. Pre-configured FAISS / Milvus vector index for millisecond retrieval over massive catalog items.
  4. TreeSHAP toolkit for feature attribution and bias auditing.`
    },
    {
      title: lang === 'fa' ? 'پروژه کشف تقلب و حلقه‌های تبانی مالی (الگوی ۷ و ۳)' : 'Financial Fraud Ring & Anomaly Detection (Patterns 7 & 3)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۲ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns - Figure 2)

۱. کدام‌یک از الگوهای هفت‌گانه هوش مصنوعی در این پروژه استفاده می‌شوند؟
- الگوی اصلی: الگوی ۷ - کشف الگوها و شناسایی ناهنجاری‌ها (Patterns & Anomalies)
  هدف: شناسایی تراکنش‌های مشکوک، الگوهای انحرافی از رفتار عادی و کشف شبکه‌های تبانی و پولشویی پیچیده.
- الگوی مکمل: الگوی ۳ - تحلیل پیش‌بینانه و پشتیبانی تصمیم (Predictive Analytics & Decision Support)
  هدف: تولید امتیاز ریسک (Fraud Risk Score) برای هر تراکنش و ارسال هشدار خودکار به کارشناسان تطبیق.

۲. چگونه این تصمیم و انتخاب را اتخاذ کردید؟
الف) ماهیت داده‌ها: تراکنش‌های بسیار نامتوازن (تراکنش‌های متقلب کمتر از ۰.۱٪ کل تراکنش‌ها هستند)؛ بنابراین روش‌های سنتی طبقه‌بندی صرف شکست می‌خورند و نیازمند رویکرد انحراف از مبنا و کشف ناهنجاری بدون نظارت و نیمه‌نظارتی هستیم.
ب) شکل شبکه داده: متقلبان از کارت‌ها و حساب‌های مشترک استفاده می‌کنند که نیازمند تحلیل گرافی و کشف الگوی ساختاری است.
ج) تصمیم‌گیری: الگوی ۷ به عنوان شتاب‌دهنده برای یافتن خوشه‌های انحرافی و الگوی ۳ برای امتیازدهی قطعی انتخاب شده‌اند.

۳. چه پروژه‌های مشابهی با این الگوها ساخته شده‌اند که می‌توان از دارایی‌های آن‌ها استفاده کرد؟
- پروژه‌های مشابه: سامانه‌های کشف تقلب مسترکارت و ویزا (Decision Intelligence)، سامانه‌های ضدپولشویی (AML) بانک‌های بین‌المللی.
- دارایی‌های قابل بهره‌برداری:
  ۱. جعبه‌ابزار منبع‌باز PyOD شامل مدل‌های آماده Isolation Forest و Deep Autoencoders.
  ۲. معماری‌های گراف عصبی PyTorch Geometric جهت ردیابی پیوندهای پنهان بین حساب‌ها.
  ۳. دیتاست‌های استاندارد بنچمارک IEEE-CIS Fraud Detection جهت ارزیابی اولیه مدل‌ها.`
        : `=== AI Patterns for Project (Slide 22 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns - Figure 2)

1. Which of these patterns are used in this project?
- Primary Pattern: Pattern 7 - Patterns & Anomalies
  Objective: Uncover hidden structural fraud rings, outlier transactional velocities, and novel evasion attempts.
- Secondary Pattern: Pattern 3 - Predictive Analytics & Decision Support
  Objective: Output real-time risk severity scores and prescriptive escalation triggers for financial crime analysts.

2. How did you make this determination?
A) Severe Class Imbalance: Fraud represents <0.1% of transactions, invalidating standard symmetric classification and demanding unsupervised/semi-supervised anomaly detection.
B) Relational Topology: Sybil attacks and synthetic identities share underlying attributes across accounts, requiring topological graph pattern mining.
C) Elimination of Non-Relevant Patterns: No voice/dialogue or physical control needed.

3. What other similar projects have been built using these patterns from which you can leverage assets?
- Benchmark Projects: Visa Risk Manager, Stripe Radar, PayPal Anti-Money Laundering graph pipelines.
- Leverageable Assets & Accelerators:
  1. Open-source PyOD library for robust outlier ensembles.
  2. PyTorch Geometric (PyG) for Graph Neural Network link prediction.
  3. Pre-trained autoencoder architectures optimized for high-throughput stream processing.`
    },
    {
      title: lang === 'fa' ? 'پروژه دستیار تعاملی تحلیل اسناد حقوقی و پزشکی (الگوی ۲ و ۴)' : 'Document Intelligence & Conversational Copilot (Patterns 2 & 4)',
      text: lang === 'fa'
        ? `=== الگوهای هوش مصنوعی پروژه (اسلاید ۲۲ کتاب کار CPMAI) ===
فاز: Phase I: Business Understanding
گروه وظایف: Cognitive Project Requirements
وظیفه: Cognitive Requirements (AI Patterns - Figure 2)

۱. کدام‌یک از الگوهای هفت‌گانه هوش مصنوعی در این پروژه استفاده می‌شوند؟
- الگوی اصلی: الگوی ۲ - سیستم‌های تعاملی و زبان طبیعی (Conversational / Human Interaction)
  هدف: پاسخ به سوالات پیچیده کارشناسان بر اساس متن قراردادها و اسناد با استفاده از زبان طبیعی محاوره‌ای.
- الگوی مکمل: الگوی ۴ - ادراک حسی و بازشناسی الگوها (Recognition)
  هدف: بازشناسی خودکار نویسه‌ها (OCR) و استخراج جداول و مهرهای اسناد اسکن‌شده تصویری.

۲. چگونه این تصمیم و انتخاب را اتخاذ کردید؟
الف) ماهیت داده‌های ورودی: داده‌ها اسناد اسکن‌شده PDF و فایل‌های تصویری بدون ساختار هستند که نیازمند لایه ادراک حسی (Recognition) برای تبدیل پیکسل به متن و لایه زبانی (Conversational) برای درک معنایی می‌باشند.
ب) نوع تعامل کاربر: کاربر به جای جستجوی کلیدواژه‌ای خشک، سوالات مفهومی حقوقی مطرح کرده و پاسخ تحلیلی استنادپذیر می‌خواهد.

۳. چه پروژه‌های مشابهی ساخته شده‌اند و چه دارایی‌هایی قابل استفاده است؟
- پروژه‌های مرجع: سامانه‌های Harvey AI (دستیار حقوقی) و Nuance DAX (دستیار مستندسازی بالینی).
- دارایی‌های قابل بهره‌برداری:
  ۱. خط لوله‌های پیش‌آموزش‌دیده OCR مانند PaddleOCR و Tesseract برای استخراج متون اسناد.
  ۲. چارچوب‌های استاندارد RAG متن‌باز (LangChain / LlamaIndex) همراه با پایگاه داده برداری Qdrant.
  ۳. مدل‌های زبانی تنظیم‌شده بر داده‌های تخصصی و پرامپت‌های مهندسی‌شده استاندارد.`
        : `=== AI Patterns for Project (Slide 22 of CPMAI Workbook) ===
Phase I: Business Understanding
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements (AI Patterns - Figure 2)

1. Which of these patterns are used in this project?
- Primary Pattern: Pattern 2 - Conversational / Human Interaction
  Objective: Enable conversational querying, contextual reasoning, and clause synthesis over dense multi-page documentation.
- Secondary Pattern: Pattern 4 - Recognition
  Objective: Optical Character Recognition (OCR), document layout parsing, and table structure recovery from raw image scans.

2. How did you make this determination?
A) Input Modality: Multi-page scanned PDF images require Computer Vision/OCR (Pattern 4) before semantic reasoning (Pattern 2).
B) User Interface Paradigm: Subject matter experts require interactive conversational retrieval rather than static keyword search.

3. What other similar projects have been built using these patterns from which you can leverage assets?
- Benchmark Projects: Harvey Legal AI, BloombergGPT research workflows, Nuance clinical documentation copilots.
- Leverageable Assets & Accelerators:
  1. Open-source PaddleOCR / docTR layout parsing engines.
  2. LangChain / LlamaIndex RAG architectures with hybrid vector-keyword retrieval.
  3. Pre-trained instruction-tuned LLMs with long-context windows (128k+ tokens).`
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

  // Helper check for Slide 22 required questions
  const q1Addressed = /pattern|الگو|کدام|which|primary|secondary|اصلی|مکمل/i.test(content);
  const q2Addressed = /determination|چگونه|تصمیم|چرا|why|how|دلیل|منطق|input|output|ورودی|خروجی/i.test(content);
  const q3Addressed = /similar|مشابه|leverage|asset|دارایی|پروژه|benchmark|استفاده|شتاب/i.test(content);

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

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner - Slide 22 Context */}
      <div className="p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-[#1f5163] text-white">
              {lang === 'fa' ? 'فاز اول: درک کسب‌وکار' : 'Phase I: Business Understanding'}
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6]">
              {lang === 'fa' ? 'اسلاید ۲۲ کتاب کار CPMAI' : 'CPMAI Workbook Slide 22'}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0]">
              Figure 2: The Seven Patterns of AI
            </span>
          </div>
          <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5 font-medium">
            <Network className="w-4 h-4 text-[#00738c]" />
            <span>Task Group: Cognitive Project Requirements</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
          {lang === 'fa'
            ? 'الگوهای هوش مصنوعی (الگوهای هفت‌گانه هوش مصنوعی به عنوان شتاب‌دهنده‌ها)'
            : 'AI Patterns: The Seven Patterns of AI as Cognitive Accelerators'}
        </h1>

        <p className="mt-2 text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          {lang === 'fa'
            ? 'شکل ۲ الگوهای هفت‌گانه هوش مصنوعی در متدولوژی CPMAI را نشان می‌دهد. از آنجا که هر یک از این الگوها اهداف مشترک و فناوری‌های زیربنایی مشخصی دارند، به عنوان شتاب‌دهنده برای پروژه‌های شناختی عمل می‌کنند و مانع از اختراع مجدد چرخ می‌شوند.'
            : 'Figure 2 illustrates the Seven Patterns of AI. Because each of these patterns has common goals and underlying technologies, they act as an accelerator for cognitive projects, preventing teams from reinventing architectures.'}
        </p>

        {/* 3 Core Questions Highlight */}
        <div className="mt-4 p-4 rounded-lg bg-[#f8faf9] dark:bg-[#131b20] border border-[#d9dad5]/70 dark:border-[#2d3942]/70">
          <div className="text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-1.5 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'fa' ? 'سه پرسش کلیدی اسلاید ۲۲ که باید مستند شوند:' : 'Three Critical Slide 22 Questions to Document:'}</span>
          </div>
          <ol className="list-decimal list-inside text-xs text-[#1c2830] dark:text-[#e8ebe9] space-y-1.5 leading-relaxed font-medium">
            <li>
              <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">
                {lang === 'fa' ? 'کدام‌یک از این الگوها در این پروژه استفاده می‌شوند؟' : 'Which of these patterns are used in this project?'}
              </span>{' '}
              <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? '(تک‌الگویی یا ترکیب هیبریدی از الگوها)' : '(Single pattern or hybrid combination)'}
              </span>
            </li>
            <li>
              <span className="font-semibold text-[#b87333] dark:text-[#e59866]">
                {lang === 'fa' ? 'چگونه این تصمیم و انتخاب را اتخاذ کردید؟' : 'How did you make this determination?'}
              </span>{' '}
              <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? '(منطق انطباق نیازمندی، داده‌های ورودی و خروجی شناختی)' : '(Input data modality, nature of output, task constraints)'}
              </span>
            </li>
            <li>
              <span className="font-semibold text-[#2f7d5b] dark:text-[#6ee7b7]">
                {lang === 'fa' ? 'چه پروژه‌های مشابه دیگری با این الگوها ساخته شده‌اند که می‌توانید از دارایی‌های آن‌ها استفاده کنید؟' : 'What other similar projects have been built using these patterns from which you can leverage assets?'}
              </span>{' '}
              <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? '(مدل‌های پایه‌ای، خطوط لوله MLOps، بنچمارک‌ها و معماری‌های مرجع)' : '(Pretrained backbones, pipelines, datasets, open benchmarks)'}
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#1f5163] text-white shadow-xs font-semibold'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'نمای کلی الگوهای ۷گانه' : '7 Patterns Visual Map'}</span>
        </button>

        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
            activeTab === 'patterns'
              ? 'bg-[#00738c] text-white shadow-xs font-semibold'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'شناسایی و انتخاب الگوها (Q1)' : 'Pattern Selector (Q1)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('determination')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
            activeTab === 'determination'
              ? 'bg-[#b87333] text-white shadow-xs font-semibold'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'منطق تصمیم‌گیری و اثبات (Q2)' : 'Determination Logic (Q2)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('assets')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
            activeTab === 'assets'
              ? 'bg-[#2f7d5b] text-white shadow-xs font-semibold'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'شتاب‌دهنده‌ها و پروژه‌های مشابه (Q3)' : 'Assets & Similar Projects (Q3)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
            activeTab === 'canvas'
              ? 'bg-[#7c3aed] text-white shadow-xs font-semibold'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{lang === 'fa' ? 'بوم ثبت پاسخ اسلاید ۲۲' : 'Worksheet Canvas (Slide 22)'}</span>
          {content.trim().length > 30 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 ms-1" />
          )}
        </button>
      </div>

      {/* TAB 1: OVERVIEW OF 7 PATTERNS (Figure 2 in CPMAI) */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#00738c]" />
                <span>{lang === 'fa' ? 'چرا الگوهای هوش مصنوعی شتاب‌دهنده پروژه هستند؟' : 'Why AI Patterns Accelerate Cognitive Projects'}</span>
              </h2>
              <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">CPMAI Core Concept</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa'
                ? 'در متدولوژی CPMAI، بیش از ۹۵٪ از تمام کاربردهای هوش مصنوعی در جهان ذیل یکی از این هفت الگو قرار می‌گیرند. شناخت صحیح الگو به تیم امکان می‌دهد تا نوع داده مورد نیاز، معماری الگوریتم، نحوه ارزیابی و ریسک‌های رایج را در ابتدای پروژه پیش‌بینی کرده و از دارایی‌های موجود (Pretrained Weights، خطوط لوله و بنچمارک‌ها) استفاده کنند.'
                : 'In the CPMAI methodology, over 95% of all enterprise AI use cases map directly to one or more of these Seven Patterns. Recognizing the applicable pattern upfront informs data requirements, algorithm architectures, evaluation protocols, and unlocks reusable assets from existing projects.'}
            </p>
          </div>

          {/* 7 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEVEN_PATTERNS.map((p) => {
              const isPrimary = selectedPrimaryPattern === p.id;
              const isSecondary = selectedSecondaryPattern === p.id;

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isPrimary
                      ? 'border-[#00738c] bg-[#e3f4f7]/40 dark:bg-[#122830]/60 ring-2 ring-[#00738c]/30'
                      : isSecondary
                      ? 'border-[#b87333] bg-[#faeee5]/40 dark:bg-[#2b1e16]/60'
                      : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228]'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${p.bgColor}`}>
                          {getPatternIcon(p.icon)}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-semibold uppercase text-[#5d6b73] dark:text-[#9aa8b0]">
                            Pattern #{p.number}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                            {lang === 'fa' ? p.nameFa : p.nameEn}
                          </h3>
                        </div>
                      </div>
                      {isPrimary && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00738c] text-white">
                          {lang === 'fa' ? 'الگوی اصلی' : 'Primary'}
                        </span>
                      )}
                      {isSecondary && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#b87333] text-white">
                          {lang === 'fa' ? 'الگوی مکمل' : 'Secondary'}
                        </span>
                      )}
                    </div>

                    {/* Common Goal */}
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-3">
                      {lang === 'fa' ? p.commonGoalFa : p.commonGoalEn}
                    </p>

                    {/* Underlying Technologies */}
                    <div className="mb-3 p-2.5 rounded-lg bg-[#f8faf9] dark:bg-[#131b20] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 text-[11px]">
                      <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                        {lang === 'fa' ? 'فناوری‌های زیربنایی مشترک:' : 'Common Underlying Tech:'}
                      </span>
                      <span className="text-[#5d6b73] dark:text-[#9aa8b0] leading-snug block">
                        {lang === 'fa' ? p.underlyingTechFa : p.underlyingTechEn}
                      </span>
                    </div>
                  </div>

                  {/* Actions to tag */}
                  <div className="pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => setSelectedPrimaryPattern(p.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        isPrimary
                          ? 'bg-[#00738c] text-white'
                          : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                      }`}
                    >
                      {lang === 'fa' ? 'انتخاب به عنوان اصلی' : 'Set as Primary'}
                    </button>
                    <button
                      onClick={() => setSelectedSecondaryPattern(p.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        isSecondary
                          ? 'bg-[#b87333] text-white'
                          : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                      }`}
                    >
                      {lang === 'fa' ? 'انتخاب به عنوان مکمل' : 'Set as Secondary'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PATTERN SELECTOR (Question 1) */}
      {activeTab === 'patterns' && (
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#00738c]" />
              <span>{lang === 'fa' ? 'پرسش ۱ اسلاید ۲۲: کدام‌یک از این الگوها در این پروژه استفاده می‌شوند؟' : 'Question 1: Which of these patterns are used in this project?'}</span>
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-4">
              {lang === 'fa'
                ? 'پروژه‌ها ممکن است بر یک الگوی خاص متمرکز باشند یا به صورت هیبریدی (ترکیبی از ۲ الگو) عمل کنند. لطفاً الگوی اصلی و الگوی مکمل این اسپرینت را مشخص فرمایید.'
                : 'Projects may center on a single pattern or execute as a hybrid combination of multiple patterns. Select the primary and supporting patterns for this iteration below.'}
            </p>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Primary Pattern Selector */}
              <div className="p-4 rounded-lg bg-[#f8faf9] dark:bg-[#131b20] border border-[#00738c]/40">
                <label className="text-xs font-bold text-[#00738c] dark:text-[#6fb3c6] block mb-2">
                  {lang === 'fa' ? 'الگوی اصلی پروژه (Primary Pattern):' : 'Primary Project Pattern:'}
                </label>
                <select
                  value={selectedPrimaryPattern}
                  onChange={(e) => setSelectedPrimaryPattern(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] font-medium focus:outline-none focus:border-[#00738c]"
                >
                  {SEVEN_PATTERNS.map((p) => (
                    <option key={p.id} value={p.id}>
                      Pattern #{p.number}: {lang === 'fa' ? p.nameFa : p.nameEn}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? SEVEN_PATTERNS.find(p => p.id === selectedPrimaryPattern)?.commonGoalFa
                    : SEVEN_PATTERNS.find(p => p.id === selectedPrimaryPattern)?.commonGoalEn}
                </p>
              </div>

              {/* Secondary Pattern Selector */}
              <div className="p-4 rounded-lg bg-[#f8faf9] dark:bg-[#131b20] border border-[#b87333]/40">
                <label className="text-xs font-bold text-[#b87333] dark:text-[#e59866] block mb-2">
                  {lang === 'fa' ? 'الگوی ثانویه / مکمل (Secondary / Supporting Pattern):' : 'Secondary / Supporting Pattern (Optional):'}
                </label>
                <select
                  value={selectedSecondaryPattern}
                  onChange={(e) => setSelectedSecondaryPattern(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] font-medium focus:outline-none focus:border-[#b87333]"
                >
                  <option value="none">{lang === 'fa' ? 'بدون الگوی ثانویه (فقط تک‌الگویی)' : 'None (Single Pattern Project)'}</option>
                  {SEVEN_PATTERNS.map((p) => (
                    <option key={p.id} value={p.id} disabled={p.id === selectedPrimaryPattern}>
                      Pattern #{p.number}: {lang === 'fa' ? p.nameFa : p.nameEn} {p.id === selectedPrimaryPattern ? '(الگوی اصلی)' : ''}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {selectedSecondaryPattern !== 'none'
                    ? (lang === 'fa'
                        ? SEVEN_PATTERNS.find(p => p.id === selectedSecondaryPattern)?.commonGoalFa
                        : SEVEN_PATTERNS.find(p => p.id === selectedSecondaryPattern)?.commonGoalEn)
                    : (lang === 'fa' ? 'این پروژه به صورت تک‌الگویی اجرا خواهد شد.' : 'This project strictly focuses on a single pattern.')}
                </p>
              </div>
            </div>

            {/* Quick Generator Button */}
            <div className="p-3 rounded-lg bg-[#e3eef1] dark:bg-[#1b2c32] flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-[#1f5163] dark:text-[#6fb3c6] font-medium">
                {lang === 'fa'
                  ? 'آیا می‌خواهید شرح الگوی انتخاب‌شده را مستقیماً به بوم پاسخ اضافه کنید؟'
                  : 'Insert the formatted pattern selection into your canvas?'}
              </span>
              <button
                onClick={() => {
                  const prim = SEVEN_PATTERNS.find(p => p.id === selectedPrimaryPattern);
                  const sec = SEVEN_PATTERNS.find(p => p.id === selectedSecondaryPattern);
                  const textToInsert = lang === 'fa'
                    ? `=== پاسخ پرسش ۱ اسلاید ۲۲: الگوهای مورد استفاده در پروژه ===\n` +
                      `۱. الگوی اصلی: ${prim ? prim.nameFa : ''} (الگوی شماره ${prim ? prim.number : ''})\n` +
                      `   هدف الگوی اصلی: ${prim ? prim.commonGoalFa : ''}\n` +
                      (sec && selectedSecondaryPattern !== 'none'
                        ? `۲. الگوی ثانویه/مکمل: ${sec.nameFa} (الگوی شماره ${sec.number})\n   هدف الگوی ثانویه: ${sec.commonGoalFa}\n`
                        : `۲. وضعیت الگوی ثانویه: تک‌الگویی بدون نیاز به الگوی مکمل در این اسپرینت.\n`)
                    : `=== Answer to Question 1 (Slide 22): Patterns Used ===\n` +
                      `1. Primary Pattern: ${prim ? prim.nameEn : ''} (Pattern #${prim ? prim.number : ''})\n` +
                      `   Primary Goal: ${prim ? prim.commonGoalEn : ''}\n` +
                      (sec && selectedSecondaryPattern !== 'none'
                        ? `2. Supporting Pattern: ${sec.nameEn} (Pattern #${sec.number})\n   Supporting Goal: ${sec.commonGoalEn}\n`
                        : `2. Supporting Pattern: Pure single-pattern execution for this iteration.\n`);
                  handleInsertTemplate(textToInsert);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'درج در بوم پاسخ (Canvas)' : 'Insert into Canvas'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DETERMINATION LOGIC (Question 2) */}
      {activeTab === 'determination' && (
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-[#b87333]" />
              <span>{lang === 'fa' ? 'پرسش ۲ اسلاید ۲۲: چگونه این تصمیم و انتخاب را اتخاذ کردید؟' : 'Question 2: How did you make this determination?'}</span>
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-4">
              {lang === 'fa'
                ? 'در متدولوژی CPMAI، تعیین الگو بر اساس حدس یا سلیقه مهندسی نیست؛ بلکه بر مبنای ۴ معیار عینی شامل: ساختار داده‌های ورودی، ماهیت خروجی، میزان استقلال عملیاتی و رد سایر الگوها اثبات می‌شود.'
                : 'In CPMAI, pattern determination must be justified through rigorous analysis of input data modalities, target system output, level of operational autonomy, and explicit disqualification of non-applicable patterns.'}
            </p>

            {/* 4 Pillars of Determination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fcfcfb] dark:bg-[#12171b]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#00738c] text-white flex items-center justify-center text-[10px]">۱</span>
                  <span>{lang === 'fa' ? 'نوع و قالب داده‌های ورودی (Input Modality)' : 'Input Data Modality'}</span>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'آیا داده‌ها جدولی با ویژگی‌های مشخص هستند (تحلیل پیش‌بینانه)، زبان طبیعی و صوت هستند (تعاملی)، تصاویر و سنسورها هستند (ادراک حسی/خودران)، یا ماتریس تعاملات کاربر (شخصی‌سازی)؟'
                    : 'Are the inputs tabular features (Predictive), free-form text/speech (Conversational), perceptual video/pixels (Recognition), or user engagement logs (Hyperpersonalization)?'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fcfcfb] dark:bg-[#12171b]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#b87333] text-white flex items-center justify-center text-[10px]">۲</span>
                  <span>{lang === 'fa' ? 'ماهیت خروجی مورد انتظار (Nature of Output)' : 'Nature of Expected Output'}</span>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'آیا خروجی یک امتیاز یا احتمال (Probability/Score)، یک پاسخ متنی، برچسب کلاس، فرمان فیزیکی به محرک، یا شناسایی انحراف و تقلب است؟'
                    : 'Does the system emit a numerical probability score, a conversational natural language reply, a detection bounding box, or physical actuation commands?'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fcfcfb] dark:bg-[#12171b]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#2f7d5b] text-white flex items-center justify-center text-[10px]">۳</span>
                  <span>{lang === 'fa' ? 'سطح استقلال و حضور انسان (Human in the Loop)' : 'Autonomy Level & Human-in-the-Loop'}</span>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'آیا سیستم فقط به عنوان تصمیم‌یار و پیشنهاددهنده (Decision Support) به انسان کمک می‌کند، یا کاملاً بدون دخالت انسانی اقدام را نهایی می‌کند (Autonomous)؟'
                    : 'Is the model strictly augmentative decision support for human operators, or does it execute autonomously without continuous human oversight?'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fcfcfb] dark:bg-[#12171b]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[10px]">۴</span>
                  <span>{lang === 'fa' ? 'رد الگوهای نامرتبط (Negative Elimination)' : 'Negative Disqualification of Others'}</span>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'اثبات اینکه چرا الگوهای دیگر انتخاب نشدند (مثلاً این پروژه نیازی به دیالوگ ندارد پس تعاملی نیست، یا محیط بازیابی پاداش ندارد پس هدف‌گرا نیست).'
                    : 'Systematically explaining why alternate patterns are disqualified prevents scope creep and keeps architecture boundaries tight.'}
                </p>
              </div>
            </div>

            {/* Quick Generator Button */}
            <div className="p-3 rounded-lg bg-[#faeee5] dark:bg-[#2b1e16] flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-[#b87333] dark:text-[#e59866] font-medium">
                {lang === 'fa'
                  ? 'درج متن ساختاریافته تحلیل منطق تصمیم‌گیری بر اساس ۴ رکن فوق در بوم:'
                  : 'Insert the 4-pillar structured determination justification into your canvas:'}
              </span>
              <button
                onClick={() => {
                  const textToInsert = lang === 'fa'
                    ? `=== پاسخ پرسش ۲ اسلاید ۲۲: نحوه اتخاذ این تصمیم (Determination Rationale) ===\n` +
                      `منطق تعیین الگوی این پروژه بر اساس ۴ رکن روش‌شناسی CPMAI مستند شده است:\n` +
                      `۱. ماهیت داده‌های ورودی: ورودی‌های پردازش‌شده در این اسپرینت مستقیماً ساختار داده‌های مورد نیاز برای الگوی منتخب را تشکیل می‌دهند.\n` +
                      `۲. ماهیت خروجی مورد انتظار: خروجی سیستم دقیقاً با تعریف الگوی منتخب منطبق است و مستقیماً در چرخه تصمیم‌گیری پایین‌دستی به کار می‌رود.\n` +
                      `۳. سطح استقلال عملیاتی: مرز دخالت انسان و سیستم مشخص گردیده و ماهیت سیستم‌یاری/خودمختاری تفکیک شده است.\n` +
                      `۴. رد الگوهای نامرتبط: سایر الگوهای هفت‌گانه به دلیل عدم تطابق با تعریف مسئله این اسپرینت به درستی کنار گذاشته شدند تا از پیچیدگی غیرضروری جلوگیری شود.`
                    : `=== Answer to Question 2 (Slide 22): Determination Rationale ===\n` +
                      `The selection of this pattern is justified across the 4 CPMAI architectural criteria:\n` +
                      `1. Input Data Modality: Current available dataset features map directly to the technical prerequisites of the selected pattern.\n` +
                      `2. Target Output Character: System output perfectly matches the mathematical formulation of the targeted pattern.\n` +
                      `3. Operational Autonomy: The human-in-the-loop vs autonomous boundary has been strictly demarcated.\n` +
                      `4. Negative Disqualification: Competing patterns were systematically evaluated and eliminated to avoid unnecessary architectural overhead.`;
                  handleInsertTemplate(textToInsert);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b87333] text-white text-xs font-semibold hover:bg-[#9a5e27] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'درج در بوم پاسخ (Canvas)' : 'Insert into Canvas'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASSETS & SIMILAR PROJECTS (Question 3) */}
      {activeTab === 'assets' && (
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
            <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2 mb-2">
              <FolderGit2 className="w-4 h-4 text-[#2f7d5b]" />
              <span>{lang === 'fa' ? 'پرسش ۳ اسلاید ۲۲: چه پروژه‌های مشابهی ساخته شده‌اند و چه دارایی‌هایی قابل استفاده است؟' : 'Question 3: Similar projects and leverageable assets to accelerate development?'}</span>
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed mb-4">
              {lang === 'fa'
                ? 'هدف اصلی شناخت الگو در CPMAI، بهره‌برداری از دارایی‌های موجود (Assets) است تا پروژه از صفر آغاز نشود. این دارایی‌ها شامل مدل‌های پیش‌آموزش‌دیده، دیتاست‌های بنچمارک، خطوط لوله و معماری‌های مرجع هستند.'
                : 'The primary payoff of CPMAI pattern identification is asset leverage. Instead of reinventing foundational algorithms, teams accelerate time-to-value by reusing pretrained models, evaluation pipelines, reference codebases, and industry benchmarks.'}
            </p>

            {/* Asset Table per Pattern */}
            <div className="space-y-3">
              {SEVEN_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fcfcfb] dark:bg-[#12171b]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${p.bgColor}`}>
                        {getPatternIcon(p.icon)}
                      </div>
                      <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                        Pattern #{p.number}: {lang === 'fa' ? p.nameFa : p.nameEn}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const textToInsert = lang === 'fa'
                          ? `=== دارایی‌های قابل بهره‌برداری برای ${p.nameFa} ===\n` +
                            `پروژه‌های مرجع مشابه: ${p.exampleUseCasesFa.join(' | ')}\n` +
                            `دارایی‌ها و شتاب‌دهنده‌های قابل استفاده:\n` +
                            p.leverageableAssetsFa.map(a => `- ${a}`).join('\n')
                          : `=== Leverageable Assets for ${p.nameEn} ===\n` +
                            `Similar Reference Projects: ${p.exampleUseCasesEn.join(' | ')}\n` +
                            `Accelerators & Reusable Assets:\n` +
                            p.leverageableAssetsEn.map(a => `- ${a}`).join('\n');
                        handleInsertTemplate(textToInsert);
                      }}
                      className="text-[11px] font-semibold text-[#00738c] dark:text-[#6fb3c6] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'درج دارایی‌ها در بوم' : 'Insert Assets'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-[#5d6b73] dark:text-[#9aa8b0] text-[11px] block mb-1">
                        {lang === 'fa' ? 'نمونه پروژه‌های مرجع موفق:' : 'Benchmark Projects / Use Cases:'}
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[#1c2830] dark:text-[#e8ebe9] text-[11px]">
                        {(lang === 'fa' ? p.exampleUseCasesFa : p.exampleUseCasesEn).map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2f7d5b] dark:text-[#6ee7b7] text-[11px] block mb-1">
                        {lang === 'fa' ? 'دارایی‌های آماده شتاب‌دهنده (Assets):' : 'Reusable Accelerators & Assets:'}
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[#1c2830] dark:text-[#e8ebe9] text-[11px]">
                        {(lang === 'fa' ? p.leverageableAssetsFa : p.leverageableAssetsEn).map((ast, i) => (
                          <li key={i}>{ast}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WORKSHEET CANVAS (Slide 22 Canvas & Checklist) */}
      <div className="p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00738c]" />
              <span>{lang === 'fa' ? 'بوم ثبت پاسخ اسلاید ۲۲ (Worksheet Canvas)' : 'Slide 22 Worksheet Canvas'}</span>
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
              {lang === 'fa'
                ? 'پاسخ‌های کامل خود به سه پرسش کلیدی اسلاید ۲۲ را در کادر زیر تکمیل نمایید.'
                : 'Document your complete, rigorous answers to all three Slide 22 questions below.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی متن' : 'Copy')}</span>
            </button>

            <button
              onClick={() => onChangeContent('')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title={lang === 'fa' ? 'پاک کردن بوم' : 'Clear Canvas'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real-time Checklist for 3 Slide 22 Questions */}
        <div className="mb-4 p-3.5 rounded-lg bg-[#f8faf9] dark:bg-[#131b20] border border-[#d9dad5]/70 dark:border-[#2d3942]/70">
          <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-2 flex items-center justify-between">
            <span>{lang === 'fa' ? 'چک‌لیست خودکار ارزیابی کیفیت پاسخ اسلاید ۲۲:' : 'Slide 22 Quality Audit Checklist:'}</span>
            <span className="text-[11px] font-mono font-medium text-[#00738c] dark:text-[#6fb3c6]">
              {Number(q1Addressed) + Number(q2Addressed) + Number(q3Addressed)} / 3 {lang === 'fa' ? 'معیار' : 'criteria'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className={`p-2 rounded flex items-center gap-2 border ${
              q1Addressed
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}>
              {q1Addressed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
              <span className="leading-tight">
                {lang === 'fa' ? '۱. مشخص‌کردن الگو(ها) (Q1)' : '1. Patterns Identified (Q1)'}
              </span>
            </div>

            <div className={`p-2 rounded flex items-center gap-2 border ${
              q2Addressed
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}>
              {q2Addressed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
              <span className="leading-tight">
                {lang === 'fa' ? '۲. اثبات منطق تصمیم‌گیری (Q2)' : '2. Determination Justified (Q2)'}
              </span>
            </div>

            <div className={`p-2 rounded flex items-center gap-2 border ${
              q3Addressed
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}>
              {q3Addressed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
              <span className="leading-tight">
                {lang === 'fa' ? '۳. دارایی‌ها و پروژه‌های مشابه (Q3)' : '3. Assets & Projects Cited (Q3)'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Insert Preset Templates */}
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#5d6b73] dark:text-[#9aa8b0] shrink-0 font-medium">
            {lang === 'fa' ? 'قالب‌های مرجع آماده:' : 'Preset Templates:'}
          </span>
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => handleInsertTemplate(tmpl.text)}
              className="px-2.5 py-1 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] hover:border-[#00738c] text-[#1c2830] dark:text-[#e8ebe9] font-medium transition-colors shrink-0"
            >
              + {tmpl.title}
            </button>
          ))}
        </div>

        {/* The Textarea Canvas */}
        <textarea
          rows={16}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder={
            lang === 'fa'
              ? 'پاسخ کامل خود به پرسش‌های اسلاید ۲۲ کتاب کار CPMAI را اینجا بنویسید یا از دکمه‌های درج قالب‌های آماده بالا استفاده فرمایید:\n\n۱. کدام یک از این الگوهای هفت‌گانه در این پروژه استفاده می‌شوند؟\n۲. چگونه این تصمیم و انتخاب را اتخاذ کردید؟\n۳. چه پروژه‌های مشابه دیگری با این الگوها ساخته شده‌اند که می‌توانید از دارایی‌های آن‌ها استفاده کنید؟'
              : 'Write your comprehensive answers to Slide 22 of the CPMAI Workbook here, or click preset templates above:\n\n1. Which of these patterns are used in this project?\n2. How did you make this determination?\n3. What other similar projects have been built using these patterns from which you can leverage assets?'
          }
          className="w-full font-mono text-xs p-4 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c] leading-relaxed transition-all resize-y"
        />

        {/* Word / Character Counter & Copyright */}
        <div className="mt-3 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 flex flex-wrap items-center justify-between text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] gap-2">
          <div className="flex items-center gap-3">
            <span>
              {lang === 'fa' ? 'تعداد کلمات:' : 'Words:'}{' '}
              <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                {content.trim() ? content.trim().split(/\s+/).length : 0}
              </strong>
            </span>
            <span>
              {lang === 'fa' ? 'تعداد کاراکتر:' : 'Characters:'}{' '}
              <strong className="text-[#1c2830] dark:text-[#e8ebe9]">{content.length}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>CPMAI Methodology · OWJ Business Council</span>
            <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">Slide 22</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation (Back to Page 11 / Slide 21 & Next to Page 13 / Slide 23) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage11}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: صفحه ۱۱ (اسلاید ۲۱: معیارهای موفقیت هوش مصنوعی)'
              : 'Previous: Page 11 (Slide 21: AI Success Criteria)'}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
            <span>
              {lang === 'fa'
                ? 'تکمیل بخش الگوهای هوش مصنوعی (اسلاید ۲۲)'
                : 'Slide 22 AI Patterns Completed'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f7d5b]" />
          </div>

          {onGoToPage13 && (
            <button
              onClick={onGoToPage13}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] hover:bg-[#1f5163] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>
                {lang === 'fa'
                  ? 'صفحه بعدی: صفحه ۱۳ (اسلاید ۲۳: کدام الگوها استفاده می‌شوند؟)'
                  : 'Next: Page 13 (Slide 23: Which Patterns Used?)'}
              </span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
