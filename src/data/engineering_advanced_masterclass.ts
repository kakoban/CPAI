export interface VisionPromptCase {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  targetTools: string[];
  sampleImageDescriptionFa: string;
  sampleImageDescriptionEn: string;
  promptFa: string;
  promptEn: string;
  expectedOutputHighlightsFa: string[];
  expectedOutputHighlightsEn: string[];
}

export interface MermaidExample {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  mermaidCode: string;
  promptFa: string;
  promptEn: string;
}

export interface FewShotExample {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  promptTemplateFa: string;
  promptTemplateEn: string;
  explanationFa: string;
  explanationEn: string;
}

export interface ReasoningGuide {
  id: string;
  titleFa: string;
  titleEn: string;
  targetModelsFa: string;
  targetModelsEn: string;
  paradigmShiftFa: string;
  paradigmShiftEn: string;
  dosFa: string[];
  dosEn: string[];
  dontsFa: string[];
  dontsEn: string[];
  caseStudyFa: {
    problemStatementFa: string;
    badPromptFa: string;
    badPromptReasonFa: string;
    optimizedReasoningPromptFa: string;
  };
}

export interface WebGroundingGuide {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  prompts: {
    topicFa: string;
    topicEn: string;
    promptFa: string;
    promptEn: string;
    tipFa: string;
  }[];
}

export interface StructuredP6Guide {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  rawInputSnippetFa: string;
  conversionPromptFa: string;
  expectedOutputJsonFa: string;
  excelPasteGuideFa: string;
}

export interface AntiHallucinationPowerWords {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  clauses: {
    code: string;
    titleFa: string;
    clauseFa: string;
    clauseEn: string;
    rationaleFa: string;
  }[];
}

export interface NegotiationSimulator {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  rolePersonaFa: string;
  rolePersonaEn: string;
  simulatorSystemPromptFa: string;
  starterQueryFa: string;
  coachingTipsFa: string[];
}

// 1. VISION PROMPTS
export const VISION_CASES: VisionPromptCase[] = [
  {
    id: 'vision_hse_excavation',
    titleFa: 'بازرسی هوشمند ایمنی و HSE در شفت حفاری TBM و گودبرداری عمیق',
    titleEn: 'Smart HSE & Safety Inspection in TBM Launch Shaft & Deep Excavation',
    categoryFa: 'ایمنی، بهداشت و محیط‌زیست (HSE)',
    categoryEn: 'HSE & Operational Safety',
    descriptionFa: 'تحلیل چندوجهی عکس‌های کارگاه برای استخراج موارد عدم انطباق ایمنی، شرایط غیرایمن (Unsafe Conditions) و خطرات ریزش یا سقوط.',
    descriptionEn: 'Multimodal vision analysis of site photos to extract safety non-conformances, unsafe conditions, and excavation hazards.',
    targetTools: ['Claude 3.5/3.7 Sonnet', 'Gemini 1.5/2.0 Pro', 'ChatGPT Plus (GPT-4o)'],
    sampleImageDescriptionFa: 'عکس نمای باز از شفت ورودی TBM به عمق ۲۸ متر، شامل استرات‌های فلزی، جرثقیل متحرک، کارگران پای دیواره و حوضچه پساب.',
    sampleImageDescriptionEn: 'Wide shot of 28m deep TBM launch shaft showing steel struts, mobile crane, workers near wall, and slurry pit.',
    promptFa: `تصویر پیوست‌شده را به عنوان یک "سرممیز ارشد HSE و ایمنی سازه‌های زیرزمینی و گودبرداری‌های عمیق" مطابق استانداردهای OSHA 1926 و نشریه ۱۱۲ سازمان مدیریت تحلیل کن.

لطفاً خروجی را در قالب یک گزارش رسمی جدول‌بندی‌شده شامل ستون‌های زیر ارائه بده:
۱. موقعیت دقیق در عکس (مثلاً بالا-راست، مجاورت لبه ترانشه، کفی شفت)
۲. شرح عدم انطباق / ریسک شناسایی‌شده (تجهیزات حفاظت فردی PPE، لبه‌های حفاظت‌نشده، پایداری استرات، وضعیت قلاب و ریگینگ جرثقیل، معابر اضطراری، کابل‌های برق رهاشده)
۳. سطح شدت ریسک (بسیار بحرانی / بالا / متوسط / کم)
۴. کد بند استاندارد یا مقررات نقض‌شده
۵. اقدام اصلاحی فوری (CAPA) مورد نیاز

در انتها، یک ارزیابی کلی از فرهنگ ایمنی کارگاه در این تصویر ارائه کن و بنویس آیا اجازه ادامه عملیات اجرایی باید داده شود یا دستور توقف کار (Stop Work Order) فوری صادر می‌گردد.`,
    promptEn: `Analyze the attached image as a "Senior Underground & Deep Excavation HSE Lead Auditor" in accordance with OSHA 1926 standards.

Provide a structured tabular audit report with:
1. Exact location in photo
2. Identified hazard/non-conformance (PPE, edge protection, strut stability, crane rigging, access ladders, cables)
3. Risk severity level (Critical / High / Medium / Low)
4. Relevant violated OSHA standard clause
5. Immediate Corrective & Preventive Action (CAPA)

Conclude with an overall safety rating and whether an immediate Stop Work Order must be issued.`,
    expectedOutputHighlightsFa: [
      'شناسایی فقدان نرده حفاظتی (Toe-board & Handrail) در لبه پرتگاه ترانشه',
      'بررسی زاویه سیم‌بکسل جرثقیل در حال باربرداری قطعات پورتال',
      'تفکیک وضعیت استقرار شیلنگ‌های هوای فشرده و تابلو برق موقت کارگاهی',
      'صدور جدول ماتریس ارزیابی ریسک با راهکار اقدام اصلاحی ۲۴ ساعته'
    ],
    expectedOutputHighlightsEn: [
      'Detection of missing toe-boards and guardrails at excavation crest',
      'Crane rigging angle and sling inspection',
      'Temporary electrical distribution board compliance',
      '24-hour CAPA action matrix'
    ]
  },
  {
    id: 'vision_pid_blueprint',
    titleFa: 'استخراج هوشمند اجزا و کشف تداخل در نقشه‌های P&ID و خطوط لوله پالایشگاه',
    titleEn: 'Smart Tag Extraction & Clash Review from P&ID Engineering Diagrams',
    categoryFa: 'مهندسی فرآیند و پایپینگ نفت و گاز',
    categoryEn: 'Process & Piping Engineering',
    descriptionFa: 'تبدیل دیاگرام‌های پیچیده لوله‌کشی و ابزاردقیق (P&ID) به جدول تجهیزات (Equipment & Instrument Tag List) و بررسی سناریوهای ایمنی (PSV، کنترل ولو و خطوط بای‌پس).',
    descriptionEn: 'Extracting instrumentation tags, valves, pipe classes, and safety reviews (PSV, bypass lines) from P&ID drawings.',
    targetTools: ['Claude 3.5 Sonnet', 'Gemini 1.5 Pro'],
    sampleImageDescriptionFa: 'نقشه تصویری یا اسکن P&ID سیستم جداسازی گاز شامل مخزن تحت فشار (V-101)، خطوط فلنجی، شیرهای اطمینان PSV و گیج‌های فشار PT.',
    sampleImageDescriptionEn: 'Scan of high-pressure gas separator P&ID including vessel V-101, control valves, safety valves (PSV), and transmitters.',
    promptFa: `دیاگرام مهندسی P&ID پیوست را به عنوان یک "مهندس ارشد لوله‌کشی و فرآیند نفت و گاز (Piping & Process Lead)" با دقت بالا اسکن کن.

اقدامات مورد نیاز:
۱. جدول کامل تجهیزات (Equipment & Instrument Tag List):
   - تگ نامبر (مثلاً PSV-1021، FV-104، V-101)
   - نوع تجهیز یا شیر (Control Valve, Ball Valve, Check Valve, Rupture Disc, Transmitter)
   - سایز خط و کلاس متریال متصل (Pipe Size & Rating)
   - وضعیت نرمال کارکرد (Normally Closed / Normally Open / Fail-to-Close)
۲. بازرسی ایمنی و منطق فرآیندی:
   - آیا برای شیرهای کنترلی مسیر بای‌پس (Bypass) و ایزولاسیون با شیر دستی پیش‌بینی شده است؟
   - موقعیت و مسیر تخلیه شیرهای اطمینان فشار (PSV Discharge to Flare / Atmos) را بررسی کن.
۳. در صورت وجود هرگونه ابهام در کیفیت تصویر، خطوط ناخوانا را صراحتاً در ستون "نیاز به بررسی در نسخه DWG اصل" ثبت کن.`,
    promptEn: `Examine the attached P&ID engineering drawing as a Senior Piping & Process Engineer.

Required outputs:
1. Complete Tag Register: Tag ID, Equipment/Valve type, Line size/rating, Normal state (NO/NC/FC/FO).
2. Process & safety logic audit: Review control valve bypass loops and PSV discharge routes.
3. List any blurred or ambiguous tags requiring DWG CAD verification.`,
    expectedOutputHighlightsFa: [
      'استخراج تمامی تگ‌های ابزاردقیق (FT, PT, LT, TT)',
      'تعیین وضعیت ایمنی شیر کنترلی در صورت قطعی باد (Fail Safe State)',
      'تطبیق ریتینگ فلنج‌ها با کلاس فشاری ۶۰۰ پوند',
      'خروجی جدول با فرمت سازگار با نرم‌افزار اکسل'
    ],
    expectedOutputHighlightsEn: [
      'Instrumentation tag extraction (PT, FT, TT, LT)',
      'Fail-safe valve action verification',
      'Flange rating compatibility',
      'Excel-compatible register output'
    ]
  },
  {
    id: 'vision_handwritten_minutes',
    titleFa: 'OCR هوشمند صورت‌جلسات دست‌نویس کارگاه و تبدیل به جدول پیگیری اکسل',
    titleEn: 'Smart Handwritten Site Minutes OCR to Structured Excel Tracking Matrix',
    categoryFa: 'کنترل پروژه و مدیریت ادعا (Claims)',
    categoryEn: 'Project Controls & Claims',
    descriptionFa: 'خواندن صورت‌جلسات امضاشده دست‌نویس با خطوط نامرتب کارگاهی و تبدیل آن به ماتریس تعهدات طرفین با تاریخ قطعی و مهلت اقدام.',
    descriptionEn: 'Extracting messy handwritten site meeting notes and converting them into a tracking matrix with responsible parties and deadlines.',
    targetTools: ['ChatGPT Plus (GPT-4o)', 'Claude 3.5 Sonnet', 'Gemini 2.0 Flash / Pro'],
    sampleImageDescriptionFa: 'عکس صفحه صورتجلسه هماهنگی کارگاهی دست‌نویس با خودکار آبی شامل ۵ تصمیم با ذکر تاریخ، مسئول اجرا و امضای دستگاه نظارت.',
    sampleImageDescriptionEn: 'Photo of handwritten site coordination minutes in blue ink with 5 actionable decisions, deadlines, and signatures.',
    promptFa: `تصویر صورت‌جلسه دست‌نویس کارگاهی پیوست را با دقت بازخوانی و رونویسی (Transcribe) کن. به عنوان یک مدیر دفتر فنی (Technical Office Manager) عمل کن.

خروجی را در قالب جدول زیر استخراج کن:
| ردیف | شماره بند یا تصمیم | شرح اقدام و مصوبه کارگاهی | طرف مسئول (کارفرما / مشاور / پیمانکار) | مهلت اقدام (تاریخ قطعی) | پیامد قراردادی در صورت تاخیر | وضعیت امضا و تاییدات |

نکات کلیدی برای استخراج:
- کلمات دارای خط‌خوردگی یا حاشیه‌نویسی‌ها را حتماً در ستون توضیحات منعکس کن.
- نام اشخاص یا شرکت‌های قید شده را به دقت بنویس.
- مواردی که دارای بار ادعایی (تحویل جبهه کاری، نقشه تاخیری، رفع معارض) هستند را با نشانگر ⚠️ مشخص کن.`,
    promptEn: `Transcribe and structure the attached handwritten site minutes as a Technical Office Manager.

Output format:
| No. | Action Item | Detailed Decision | Responsible Party | Target Deadline | Contractual Consequence if Delayed | Signature Status |

Highlight claim-sensitive items (site handover, delayed IFC drawings, utility relocations) with ⚠️.`,
    expectedOutputHighlightsFa: [
      'استخراج متن با بازخوانی اصطلاحات فنی فارسی و نام‌های خاص',
      'تشخیص تاریخ‌های شمسی و تبدیل به تقویم پروژه',
      'تفکیک تکالیف کارفرما از وظایف اجرایی پیمانکار',
      'آماده‌سازی جدول جهت پیست مستقیم در گزارش هفتگی اکسل'
    ],
    expectedOutputHighlightsEn: [
      'Accurate handwritten transcription of technical Persian terms',
      'Solar/Gregorian date extraction',
      'Contractual responsibility breakdown',
      'Direct copy-paste to Excel'
    ]
  }
];

// 2. NEGOTIATION SIMULATOR
export const NEGOTIATION_SIMULATOR: NegotiationSimulator = {
  id: 'claim_negotiation_simulator',
  titleFa: 'شبیه‌ساز هوشمند جلسه دفاعیه ادعا و تاخیرات با مدیر کارفرما (Devil’s Advocate)',
  titleEn: 'AI Claim Defense & Dispute Negotiation Simulator (Tough Client Persona)',
  descriptionFa: 'قبل از رفتن به جلسه نفس‌گیر دفاع از لایحه تاخیرات یا درخواست خسارت مالی با کارفرما، هوش مصنوعی را در نقش سرسخت‌ترین مشاور کارفرما قرار دهید تا ادعای شما را موشکافی کند و سناریوهای ضدحمله کارفرما را فاش سازد!',
  rolePersonaFa: 'مهندس سخت‌گیر، مسلط به نشریه ۴۳۱۱ و فیدیک، مجهز به آمار تاخیرات همپوشان و به دنبال رد کلیه ادعاهای پیمانکار',
  rolePersonaEn: 'Tough Senior Contracts Lead defending the Employer, master of FIDIC and Circular 4311, focused on time-bar clauses and contractor defaults.',
  simulatorSystemPromptFa: `نقش شما: شما "مهندس ناصری"، مدیر ارشد و سرسخت قراردادها و رسیدگی به دعاوی در دستگاه نظارت کارفرما هستید. 
شخصیت و رویکرد:
- بسیار مؤدب اما فوق‌العاده ریزبین، سرسخت و مسلط به قوانین پیمان (نشریه ۴۳۱۱، بخشنامه ۵۰۹۰ تاخیرات، بخشنامه ۵۰۴۰ نرخ ارز، و فیدیک).
- استراتژی شما در جلسه: پیمانکار آمده تا ادعای تمدید زمان (EOT) و جبران هزینه‌های تعلیق و بالاسری را بقبولاند. هدف شما حفاظت از منافع مالی کارفرما و اثبات تاخیرات غیرمجاز یا همپوشان پیمانکار است.
- خطوط حمله شما:
  ۱. عدم رعایت تشریفات اخطار کتبی (فرجه ۲۱ روزه در ماده ۳۰ یا ۲۸ روزه در فیدیک).
  ۲. تاخیرات همپوشان پیمانکار (مثلاً کمبود ماشین‌آلات، تاخیر در تأمین میلگرد هم‌زمان با تاخیر نقشه کارفرما).
  ۳. عدم اثبات قرارگیری فعالیت در "مسیر بحرانی مصوب اولیه (Baseline Critical Path)".
  ۴. فقدان گزارش روزانه ثبت‌شده در دفترچه کارگاهی.

دستورالعمل تعاملی:
۱. وقتی من (کاربر) سناریوی ادعای خود را نوشتم، بلافاصله آن را قبول نکن! ۳ ایراد فنی و حقوقی بسیار چالش‌برانگیز به ادعای من وارد کن و از من مدرک و پاسخ بخواه.
۲. در پایان نقد خود بنویس: «حالا به این ۳ ایراد من مستند و با ارجاع به بندهای قرارداد پاسخ بده تا ببینم چطور در کمیته حل اختلاف دفاع می‌کنی.»
۳. بعد از هر پاسخ من، میزان قوت استدلال مرا از ۱۰ نمره بده و نقاط ضعف جدیدم را گوشزد کن.`,
  starterQueryFa: `آقای مهندس ناصری عزیز، سلام.
ما به عنوان پیمانکار پروژه، ادعای تمدید مدت ۶۰ روز به همراه جبران هزینه‌های بالاسری کارگاه را به علت تاخیر ۵۰ روزه کارفرما در ابلاغ نقشه‌های اجرایی فونداسیون شفت جنوبی TBM داریم. ما در روز ۳۵ام طی نامه کتبی شماره ۳۰۲ موضوع را به دستگاه نظارت اعلام کردیم و کارگاه عملاً به مدت ۴۰ روز معطل ماند. تقاضای تایید لایحه را داریم.`,
  coachingTipsFa: [
    'همیشه تاریخ قطعی وقوع حادثه را با تاریخ ارسال اخطار اولیه مقایسه کنید (قاعده اخطار بموقع).',
    'ثابت کنید فعالیتی که معطل مانده دقیقاً روی مسیر بحرانی (CPM) بوده و شناوری نداشته است.',
    'پیش از طرح ادعا، تاخیرات خودی (مثل کمبود نیروی انسانی در همان تاریخ) را بررسی و پیش‌دستی کنید.',
    'اسناد پشتیبان از دفترچه گزارش روزانه کارگاه با امضای سرپرست کارگاه و ناظر مقیم را آماده داشته باشید.'
  ]
};

// 3. MERMAID DIAGRAMS
export const MERMAID_EXAMPLES: MermaidExample[] = [
  {
    id: 'mermaid_wbs_metro',
    titleFa: 'ساختار شکست کار (WBS) مهندسی ایستگاه زیرزمینی مترو',
    titleEn: 'Multi-Tier WBS for Underground Metro Station',
    categoryFa: 'برنامه‌ریزی و کنترل پروژه',
    categoryEn: 'Project Planning & Controls',
    descriptionFa: 'تولید ساختار درختی شکست کار مهندسی برای ایستگاه تقاطعی مترو به همراه فازهای سازه، TBM و سیستم‌های MEP.',
    descriptionEn: 'Tree structure engineering WBS for an underground interchange metro station.',
    mermaidCode: `graph TD
    Root["پروژه ایستگاه زیرزمینی مترو تقاطعی"] --> P1["فاز ۱: مهندسی و تجهیز کارگاه"]
    Root --> P2["فاز ۲: سازه نگهبان و خاکبرداری"]
    Root --> P3["فاز ۳: عملیات تونلی TBM"]
    Root --> P4["فاز ۴: سازه بتنی و معماری"]
    Root --> P5["فاز ۵: تأسیسات MEP و سیگنالینگ"]

    P1 --> P11["نقشه‌های اجرایی IFC"]
    P1 --> P12["تجهیز شفت و دپوی سگمنت"]
    
    P2 --> P21["دیوار دیافراگمی Diaphragm Wall"]
    P2 --> P22["حفاری ترانشه عمیق 28m"]
    P2 --> P23["نصب استرات‌های فلزی و نیلینگ"]

    P3 --> P31["ورود و مونتاژ TBM EPB"]
    P3 --> P32["حفاری و لاینینگ سگمنتی"]
    P3 --> P33["تزریق فوم اصلاح خاک و گروتینگ"]

    P4 --> P41["دال کف و عایق رطوبتی"]
    P4 --> P42["سکوها و دال تیکتینگ"]
    P4 --> P43["ورودی‌ها و پله‌های فرار"]

    P5 --> P51["سیستم برق بالاسری OCS"]
    P5 --> P52["تهویه اضطراری تونل SES"]
    P5 --> P53["سیگنالینگ و ارتباطات CBTC"]`,
    promptFa: `لطفاً در داخل یک پنجره آرتیفکت (Artifact)، یک فلوچارت گرافیکی کامل از ساختار شکست کار (WBS) احداث یک ایستگاه متروی زیرزمینی عمیق با استفاده از کد Mermaid.js رسم کن. دیاگرام باید سلسله‌مراتبی از بالا به پایین (graph TD) بوده و شامل ۵ سطح اصلی: تجهیز شفت، سازه نگهبان، حفاری TBM، سازه بتنی و تأسیسات MEP باشد. نام‌ها به زبان فنی مهندسی فارسی نوشته شود.`,
    promptEn: `Generate a complete hierarchical engineering WBS for an underground metro station in Claude Artifacts using Mermaid.js syntax (graph TD). Include 5 main tiers: Site Mobilization, Shoring/Excavation, TBM Tunneling, Concrete Structure, and MEP/Signaling.`
  },
  {
    id: 'mermaid_cpm_pipeline',
    titleFa: 'شبکه مسیر بحرانی (CPM) عملیات احداث خط لوله نفت و گاز',
    titleEn: 'Critical Path Method (CPM) Network for Oil & Gas EPC Pipeline',
    categoryFa: 'زمان‌بندی و مسیر بحرانی',
    categoryEn: 'Scheduling & Critical Path',
    descriptionFa: 'نمایش توالی فعالیت‌های لوله‌گذاری، شناسایی گره‌های بحرانی و نقاط تصمیم‌گیری تست هیدروستاتیک و تزریق گاز.',
    descriptionEn: 'Sequence of pipeline construction activities, critical bottlenecks, hydrotest, and drying.',
    mermaidCode: `flowchart LR
    A["تحویل مسیر RoW<br/>(15 روز)"] --> B["مسیرسازی و بوته‌کنی<br/>(20 روز)"]
    B --> C["حمل و ریسه‌کردن لوله‌ها<br/>(25 روز)"]
    C --> D["خم‌کاری و جفت‌کردن Fit-up<br/>(15 روز)"]
    D --> E{"جوشکاری خط لوله<br/>(مسیر بحرانی - 45 روز)"}
    
    E -->|تایید NDT 100%| F["عایق سرجوش و تست منفذ<br/>(20 روز)"]
    E -->|تعمیر جوش| E_Repair["تعمیرات عیوب NDT<br/>(5 روز)"]
    E_Repair --> F
    
    F --> G["لوله‌گذاری در کانال Lowering<br/>(15 روز)"]
    G --> H["خاکریزی و پدینگ Padding<br/>(20 روز)"]
    H --> I{"تست هیدروستاتیک ASME B31.8<br/>(مسیر بحرانی - 10 روز)"}
    
    I -->|موفق| J["تخلیه آب و رطوبت‌زدایی Dewatering<br/>(12 روز)"]
    J --> K["تزریق گاز نیتروژن و راه‌اندازی RFSU"]
    
    style E fill:#ffebee,stroke:#c62828,stroke-width:3px
    style I fill:#ffebee,stroke:#c62828,stroke-width:3px
    style K fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px`,
    promptFa: `یک نمودار مسیر بحرانی (CPM) با کد Mermaid.js برای عملیات احداث خط لوله گاز ۵۶ اینچ داخل آرتیفکت ایجاد کن. فعالیت‌های بحرانی مانند جوشکاری خطی و تست هیدروستاتیک باید با رنگ قرمز متمایز شوند و شرط‌های بازرسی رادیوگرافی NDT به همراه مسیر تعمیر و تایید در آن مدل شود.`,
    promptEn: `Create a Mermaid.js CPM flowchart for a 56-inch gas pipeline construction inside Artifacts. Highlight critical path activities (welding, hydrotest) with red borders and show NDT inspection decision branches.`
  },
  {
    id: 'mermaid_dispute_fidic',
    titleFa: 'فلوچارت فرآیند حل اختلاف در شرایط عمومی پیمان و فیدیک (Dispute Ladder)',
    titleEn: 'FIDIC Sub-Clause 20 vs. Circular 4311 Dispute Resolution Ladder',
    categoryFa: 'حقوقی و حل اختلاف',
    categoryEn: 'Legal & Dispute Resolution',
    descriptionFa: 'نمودار گام‌به‌گام مراحل طرح ادعا، اخطار اولیه، تصمیم مهندس مشاور، هیئت داوری DAAB و دادگاه/شورای عالی فنی.',
    descriptionEn: 'Step-by-step dispute resolution ladder comparing FIDIC DAB to Iranian Supreme Technical Council.',
    mermaidCode: `flowchart TD
    Start["وقوع رویداد تاخیرساز یا ادعایی"] --> Notice{"اخطار اولیه ظرف مهلت قانونی<br/>(نشریه 4311: 21 روز / فیدیک: 28 روز)"}
    
    Notice -->|ارسال در مهلت| Submittal["ارائه لایحه مستند با اسناد CPM و مالی"]
    Notice -->|تاخیر در اخطار| TimeBar["⚠️ سقوط حق ادعا (Time-Barred)<br/>طبق بند 20.1 فیدیک"]
    
    Submittal --> EngReview{"بررسی و ارزیابی مهندس مشاور"}
    EngReview -->|توافق| Addendum["ابلاغ الحاقیه تمدید زمان یا تعدیل"]
    EngReview -->|رد یا عدم توافق| Tier2["ارجاع به هیئت رسیدگی به اختلافات DAAB / کارفرما"]
    
    Tier2 -->|پذیرش نظر هیئت| Settle["سازش و صدور صورت‌جلسه قطعی"]
    Tier2 -->|اعتراض رسمی NoD| Tier3{"مرجع نهایی حل اختلاف"}
    
    Tier3 --> Arb["داوری اتاق بازرگانی بین‌المللی ICC<br/>(قراردادهای خارجی)"]
    Tier3 --> GovCouncil["شورای عالی فنی سازمان برنامه (ماده 53)<br/>یا دادگاه صالحه"]
    
    style Notice fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style TimeBar fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Addendum fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px`,
    promptFa: `برای تفهیم فرآیند حل اختلاف پروژه‌های عمرانی به دانشجویان، یک فلوچارت عمودی Mermaid.js تولید کن که سلسله‌مراتب حل اختلاف (از اخطار اولیه تا داوری نهایی) را بر اساس ماده ۳۰ و ۵۳ شرایط عمومی پیمان و بند ۲۰ فیدیک ترسیم کند و حالت‌های سقوط حق (Time-Bar) را برجسته سازد.`,
    promptEn: `Generate a Mermaid.js dispute resolution flowchart comparing Circular 4311 and FIDIC Clause 20 ladder from initial notice to supreme council arbitration.`
  }
];

// 4. FEW-SHOT PROMPTING
export const FEW_SHOT_GUIDE: FewShotExample = {
  id: 'few_shot_daily_reports',
  titleFa: 'روش Few-Shot برای تبدیل یادداشت‌های شلخته کارگاهی به گزارش رسمی سازمانی',
  titleEn: 'Few-Shot Prompting: Transforming Messy Site Telegram Notes to Official Corporate Reports',
  descriptionFa: 'در تمام کارگاه‌های عمرانی و نفتی، تکنسین‌ها گزارش‌ها را با ادبیات عامیانه، دست‌نویس یا در پیام‌رسان‌ها می‌فرستند. با تکنیک چند مثاله (Few-Shot)، به هوش مصنوعی نشان می‌دهیم چگونه گزارش نامرتب را بدون حذف داده‌های فنی، به ادبیات فاخر و استاندارد مهندسی تبدیل کند.',
  descriptionEn: 'Teaching the LLM via examples to standardize informal site communication into polished corporate reports.',
  promptTemplateFa: `شما "سرپرست دفتر فنی پروژه احداث مترو و سازه‌های زیرزمینی" هستید. وظیفه شما بازنویسی یادداشت‌های پراکنده و عامیانه سرپرستان اجرایی کارگاه به "گزارش روزانه رسمی و مستند مهندسی" با ادبیات حقوقی دقیق است.

به دو نمونه تبدیل زیر نگاه کن و الگوی ساختاری را یاد بگیر:

### نمونه ۱:
[یادداشت خام سرپرست]:
دیروز شفت جنوبی جرثقیل ۶۰ تن خراب شد تا ظهر خوابیدیم. بعدش میلگرد نرسید آرماتوربندها بیکار موندن. فقط تونستیم ۱۰ تا سگمنت رینگ ۲۴ رو پیچ و مهره کنیم. ناظر کارفرما هم نیومد صورت‌جلسه بکنه گیر داد به گِل‌ولای کف شفت.

[گزارش رسمی بازنویسی‌شده]:
۱. وضعیت جبهه‌های کاری و پیشرفت فیزیکی:
   - ادامه عملیات مونتاژ و اتصال مکانیکی رینگ بتنی پیش‌ساخته شماره ۲۴ تونل TBM (نصب نهایی ۱۰ سگمنت استاندارد).
۲. توقفات، موانع اجرایی و عوامل تاخیرساز:
   - نقص فنی در مدار هیدرولیک جرثقیل مستقر در دهانه شفت جنوبی از ساعت ۰۸:۰۰ الی ۱۲:۳۰ (مدت توقف: ۴.۵ ساعت).
   - تاخیر در ورود محموله میلگردهای سایز ۲۸ مورد نیاز دیواره حائل به کارگاه ناشی از عدم صدور مجوز ورود خودروهای سنگین در محدوده شهری.
۳. وضعیت نظارت و مکاتبات کارگاهی:
   - به علت عدم حضور کارشناس ناظر سازه در شیفت صبح، انجام فرآیند تایید و امضای صورت‌جلسه تسطیح بستر میسر نگردید و مراتب طی یادداشت کارگاهی ثبت شد.

---

### نمونه ۲:
[یادداشت خام سرپرست]:
پمپ بتن گیر کرد بتن سفت شد مجبور شدیم دال پارت ۳ رو قطع کنیم. شانس آوردیم درز سرد نشد چسب اپوکسی زدیم. فردا باید ۵۰ تا تراک بیاد تا جبران بشه وگرنه به برنامه زمان‌بندی نمی‌رسیم.

[گزارش رسمی بازنویسی‌شده]:
۱. وضعیت جبهه‌های کاری و پیشرفت فیزیکی:
   - اجرای بتن‌ریزی بخش ابتدایی دال کف پارت ۳ با رده بتن C35 تا تراز طراحی.
۲. اقدامات کنترلی و مدیریت کیفیت (QA/QC):
   - به دلیل توقف اضطراری پمپ دکل‌دار، جهت ممانعت از ایجاد درز سرد سازه‌ای (Cold Joint)، بلافاصله تمهیدات استاندارد اجرایی شامل ایجاد قطع بتن به زاویه ۴۵ درجه و اعمال چسب رابط اپوکسی هماهنگ با ناظر مقیم پیاده‌سازی گردید.
۳. نیازمندی‌های فوری شیفت آتی:
   - ضرورت هماهنگی جهت تامین ناوگان پیوسته تراک‌میکسرها به میزان حداقل ۲۵۰ مترمکعب جهت جبران احجام معوق.

---

### وظیفه شما:
حالا یادداشت خام جدید زیر را بر اساس همان الگوی دو نمونه بالا به یک گزارش رسمی، دقیق و مهندسی تبدیل کن:

[یادداشت خام سرپرست برای تبدیل]:
{متن خام و شلخته پیامکی کارگاه را اینجا پیست کنید}`,
  promptTemplateEn: `You are the Lead Technical Office Engineer. Convert messy site foreman notes into official structured engineering reports using the 2-shot learning format provided above.`,
  explanationFa: 'در روش Few-Shot، مدل با دیدن ساختار قبل و بعد، نیازی به حدس زدن سلیقه نگارشی شما ندارد؛ لحن گزارش، تفکیک بندها و نحوه برخورد با ریسک‌ها را مستقیماً از الگوها کپی می‌کند.',
  explanationEn: 'Few-shot prompting eliminates ambiguous tone instructions by explicitly demonstrating the desired transformation pattern.'
};

// 5. REASONING MODELS
export const REASONING_GUIDE: ReasoningGuide = {
  id: 'reasoning_models_mastery',
  titleFa: 'استراتژی کار با مدل‌های استدلالی عمیق (OpenAI o1, o3, Gemini Thinking, Claude Thinking)',
  titleEn: 'Mastering Deep Reasoning Models for Complex Engineering Calculations & Claims',
  targetModelsFa: 'OpenAI o1 / o3-mini، Claude 3.7 Thinking Mode، Gemini 2.0 Flash Thinking',
  targetModelsEn: 'OpenAI o1 / o3-mini, Claude 3.7 Thinking, Gemini 2.0 Thinking',
  paradigmShiftFa: 'مدل‌های فکری با مدل‌های معمولی زبانی تفاوت بنیادین دارند: آن‌ها دارای فاز «تفکر پنهان (Chain-of-Thought)» هستند و نیازی نیست به آن‌ها بگویید "گام‌به‌گام فکر کن"؛ بلکه باید محدودیت‌ها، تعاریف ریاضی، قواعد مرزی و متغیرها را با سخت‌گیری فوق‌العاده بنویسید.',
  paradigmShiftEn: 'Reasoning models feature native internal thinking processes. Never ask them to "think step by step". Instead, specify rigorous edge cases, logic constraints, and mathematical relationships.',
  dosFa: [
    'شرایط مرزی و استثنائات را صریح مشخص کنید (مثلاً: تاخیرات همپوشان فقط به میزان سهم خالص تمدید می‌شوند).',
    'فرمول‌های ریاضی، وزن فعالیت‌ها در WBS و توالی تاریخی را در قالب ورودی صریح بدهید.',
    'از مدل بخواهید قبل از پاسخ نهایی، تناقضات احتمالی در داده‌ها را راستی‌آزمایی کند.',
    'محدودیت‌های حقوقی (مثلاً حداکثر خسارت تاخیر ۱۰٪ مبلغ پیمان) را به عنوان سقف عددی تعریف کنید.'
  ],
  dosEn: [
    'Define explicit boundary conditions and edge cases.',
    'Provide mathematical equations and activity weights clearly.',
    'Instruct the model to verify data consistency before calculating.',
    'Specify statutory caps (e.g., maximum liquidated damages 10% of contract value).'
  ],
  dontsFa: [
    'هرگز ننویسید "گام به گام فکر کن" یا "فرآیند تفکرت را برایم توضیح بده" (این دستور در مدل‌های استدلالی باعث تداخل و افت کارایی تفکر خودکار مدل می‌شود).',
    'از دادن ورودی‌های طولانی بدون ساختار پرهیز کنید؛ فرمت داده‌ها را با جدول یا فکت‌های نقطه‌ای شماره‌دار ارائه دهید.',
    'فرضیات حل‌نشده باقی نگذارید؛ اگر روزهای تعطیل رسمی جزو تقویم کاری پروژه نیستند، آن را دقیق مشخص کنید.'
  ],
  dontsEn: [
    'Never write "think step-by-step" (interferes with native internal reasoning tokens).',
    'Avoid unstructured wall-of-text prompts.',
    'Do not leave calendar assumptions ambiguous (specify working days vs. calendar days).'
  ],
  caseStudyFa: {
    problemStatementFa: 'محاسبه تاخیرات همپوشان (Concurrent Delays) کارفرما و پیمانکار در احداث خط لوله نفت با لحاظ مسیر بحرانی و تعدیل نرخ ارز.',
    badPromptFa: 'سلام، کارفرمای ما ۲۰ روز نقشه رو دیر داد، ما هم ۱۰ روز ماشین‌آلاتمون خراب بود، گام به گام فکر کن و بگو چقدر تاخیر مجاز داریم؟',
    badPromptReasonFa: 'دستور گام به گام اضافی است؛ تاریخ‌های شروع و پایان مشخص نیست؛ تقدم و تاخر مسیر بحرانی معلوم نیست؛ هیچ استنادی به فرمول قانونی تاخیرات همپوشان نشده است.',
    optimizedReasoningPromptFa: `مسئله تحلیل تاخیرات همپوشان (Concurrent Delay Analysis):
داده‌های قطعی تقویم پروژه:
۱. فعالیت بحرانی A (حفاری کانال ترانشه):
   - تاریخ شروع برنامه‌ای: اول اردیبهشت، تاریخ پایان برنامه‌ای: ۲۰ اردیبهشت (مدت: ۲۰ روز تقویمی).
   - رویداد کارفرما: تاخیر در تحویل زمین از تاریخ اول اردیبهشت تا دهم اردیبهشت (۱۰ روز تاخیر کارفرما).
   - رویداد پیمانکار: خرابی بیل مکانیکی از تاریخ پنجم اردیبهشت تا پانزدهم اردیبهشت (۱۰ روز تاخیر پیمانکار).
۲. اصول تحلیلی حاکم:
   - از متدولوژی Time Impact Analysis (TIA) انجمن مهندسی پیشرفت (AACE RP 29R-03) استفاده کن.
   - اصل تاخیرات همپوشان: در روزهایی که هر دو طرف مرتکب تاخیر روی مسیر بحرانی شده‌اند، پیمانکار فقط مستحق تمدید زمان (EOT) بدون حق مطالبه هزینه بالاسری (No Delay Damages) است.
   - در روزهایی که فقط کارفرما مقصر بوده، تمدید زمان همراه با جبران هزینه بالاسری تعلق می‌گیرد.
۳. مجهول:
   - الف) تعداد روزهای دقیق تمدید مجاز بدون هزینه
   - ب) تعداد روزهای تمدید مجاز همراه با جبران هزینه
   - ج) تعداد روزهای تاخیر غیرمجاز پیمانکار (مشمول جریمه خسارت تاخیرات)`
  }
};

// 6. WEB GROUNDING
export const WEB_GROUNDING_GUIDE: WebGroundingGuide = {
  id: 'web_grounding_engineering',
  titleFa: 'استخراج زنده بخشنامه‌های دولتی و شاخص‌های تعدیل با Google Search و Web Grounding',
  titleEn: 'Live Web Grounding: Fetching PBO Circulars, Quarterly Price Indices & Exchange Rates',
  descriptionFa: 'برای جلوگیری از توهم در ارقام و قوانین به‌روزشده، یاد بگیرید چطور ابزار جستجوی وب (Web Search در چت‌جی‌پی‌تی و Google Grounding در جمینای) را با پرامپت‌های مهندسی مهار کنید تا مستقیماً به بخشنامه‌های مصوب سازمان برنامه و بودجه استناد کنند.',
  descriptionEn: 'Using live search tools in Gemini and ChatGPT to cite officially published government circulars and price indices without hallucination.',
  prompts: [
    {
      topicFa: 'استعلام آخرین بخشنامه شاخص‌های تعدیل سازمان برنامه و بودجه',
      topicEn: 'Latest Quarterly Price Adjustment Indices',
      promptFa: `با استفاده از ابزار جستجوی وب، آخرین بخشنامه رسمی ابلاغ‌شده توسط "سازمان برنامه و بودجه کشور" در خصوص "شاخص‌های تعدیل دوره‌های سه‌ماهه" برای سال جاری و سال گذشته را جستجو کن.

خروجی باید شامل:
۱. شماره بخشنامه، تاریخ دقیق ابلاغ و نام رئیس وقت سازمان
۲. فصل‌های دارای بالاترین درصد افزایش شاخص نسبت به دوره قبل (به‌ویژه فصل کارهای فولادی سنگین، بتن، و لوله‌گذاری)
۳. لینک مستقیم یا آدرس صفحه رسمی سایت nezamfanni.ir یا mporg.ir
۴. هشدار صریح: در صورتی که شاخص‌های دوره آخر هنوز رسماً ابلاغ نشده، بنویس «هنوز به صورت رسمی منتشر نشده و آخرین نسخه مربوط به سه ماهه ... است». از هیچ رقم تخمینی یا غیررسمی استفاده نکن.`,
      promptEn: `Search for the latest official circular published by Iran's Plan & Budget Organization regarding quarterly price adjustment indices on nezamfanni.ir. Provide circular number, date, and highest index chapters.`,
      tipFa: 'قید کردن دامنه رسمی "nezamfanni.ir" یا نام دقیق "نظام فنی و اجرایی کشور" مانع از دریافت اطلاعات وبلاگ‌های غیررسمی می‌شود.'
    },
    {
      topicFa: 'استعلام آخرین نرخ‌های تسعیر ارز و بخشنامه جبران آثار نوسانات ارزی',
      topicEn: 'Foreign Exchange Fluctuation Compensation Circulars',
      promptFa: `با استفاده از جستجوی اینترنت، متن و ضوابط آخرین بخشنامه سازمان برنامه و بودجه تحت عنوان "نحوه جبران آثار ناشی از افزایش قیمت ارز در پیمان‌های ریالی فاقد تعدیل و دارای تعدیل" (معروف به بخشنامه نرخ ارز / نوسانات ارزی) را استخراج کن.

نکات الزامی:
- شرایط شمول پروژه‌ها (تاریخ انعقاد پیمان و درصد پیشرفت فیزیکی)
- رابطه ریاضی محاسبه ضریب جبران ارزی
- مراجع رسمی اعلام نرخ ارز معتبر (سامانه نیما یا مرکز مبادله ارز و طلای ایران)
- فقط به مراجع رسمی دولتی استناد کن.`,
      promptEn: `Fetch the official circular regarding compensation for currency fluctuation in government contracts. Outline eligibility criteria and exchange rate calculation methods from official sources.`,
      tipFa: 'همیشه از مدل بخواهید تاریخ اعتبار بخشنامه و اینکه آیا بخشنامه جدیدی آن را ابطال کرده یا خیر را ارزیابی کند.'
    }
  ]
};

// 7. STRUCTURED P6 & EXCEL
export const STRUCTURED_P6_GUIDE: StructuredP6Guide = {
  id: 'structured_p6_excel',
  titleFa: 'استخراج داده‌های ساختاریافته (JSON و Markdown) جهت انتقال مستقیم به Primavera P6 و Excel',
  titleEn: 'Structured Data Extraction for Seamless Import to Primavera P6 & Microsoft Excel',
  descriptionFa: 'تبدیل مکاتبات و صورت‌جلسات طولانی کارگاه به جداول استاندارد با ستون‌های Activity ID، پیش‌نیاز (Predecessor)، مدت، و تاریخ‌های شروع و پایان برای ایمپورت در نرم‌افزارهای کنترل پروژه بدون تایپ دستی.',
  rawInputSnippetFa: `گزیده‌ای از یادداشت صورت‌جلسه کارگاهی:
مقرر شد از تاریخ ۱۴۰۳/۰۲/۰۱ اجرای دیوار دیافراگمی پارت شمالی به مدت ۱۵ روز انجام شود (شناسه فعالیت DW-01). بلافاصله بعد از اتمام دیوار، خاکبرداری ترانشه مرحله اول (EX-01) به مدت ۲۰ روز آغاز گردد. پیش‌نیاز شروع نصب استرات‌های فلزی (ST-01 که ۱۲ روز زمان می‌برد)، رسیدن خاکبرداری به تراز منفی ۶ متر است که در روز دهم خاکبرداری رخ می‌دهد. پس از نصب استرات و خاکبرداری کامل، بتن‌مگر و آرماتوربندی دال کف (FD-01) به مدت ۱۸ روز شروع خواهد شد.`,
  conversionPromptFa: `متن فوق شامل توالی فعالیت‌های اجرایی کارگاه است. به عنوان یک برنامه‌ریز ارشد پروژه (Lead Project Planner):

این متن را به دو ساختار کاملاً تمیز تبدیل کن:

بخش اول: جدول Markdown با تب‌بندی مناسب جهت کپی مستقیم در نرم‌افزار Excel شامل ستون‌های:
Activity ID | Activity Name | Duration (Days) | Predecessor | Relationship Type | Lag (Days) | Start Date | Finish Date

بخش دوم: آبجکت معتبر JSON منطبق با فرمت ورودی استاندارد Primavera P6 / MSP:
\`\`\`json
{
  "project_id": "METRO-ST-12",
  "activities": [
    {
      "activity_id": "DW-01",
      "activity_name": "...",
      "duration": 15,
      "predecessors": [],
      "start": "2024-04-20",
      "finish": "..."
    }
  ]
}
\`\`\`
قوانین:
- روابط FS (Finish to Start) یا SS (Start to Start) همراه با Lag را بر اساس متن به دقت استخراج کن.
- از تاریخ‌های شمسی و معادل میلادی معتبر استفاده کن.`,
  expectedOutputJsonFa: `{
  "project_id": "METRO-ST-12",
  "activities": [
    {
      "activity_id": "DW-01",
      "activity_name": "دیوار دیافراگمی پارت شمالی",
      "duration": 15,
      "predecessors": [],
      "start": "1403/02/01",
      "finish": "1403/02/15"
    },
    {
      "activity_id": "EX-01",
      "activity_name": "خاکبرداری ترانشه مرحله اول",
      "duration": 20,
      "predecessors": [{"id": "DW-01", "type": "FS", "lag": 0}],
      "start": "1403/02/16",
      "finish": "1403/03/05"
    },
    {
      "activity_id": "ST-01",
      "activity_name": "نصب استرات‌های فلزی تراز اول",
      "duration": 12,
      "predecessors": [{"id": "EX-01", "type": "SS", "lag": 10}],
      "start": "1403/02/26",
      "finish": "1403/03/07"
    },
    {
      "activity_id": "FD-01",
      "activity_name": "بتن مگر و آرماتوربندی دال کف",
      "duration": 18,
      "predecessors": [
        {"id": "EX-01", "type": "FS", "lag": 0},
        {"id": "ST-01", "type": "FS", "lag": 0}
      ],
      "start": "1403/03/08",
      "finish": "1403/03/26"
    }
  ]
}`,
  excelPasteGuideFa: 'جدول تولیدی را می‌توانید مستقیماً کپی کرده و در ستون اول نرم‌افزار Excel پیست (Paste) کنید تا تمام داده‌ها بدون به‌هم‌ریختگی در سلول‌های تفکیک‌شده قرار گیرند.'
};

// 8. ANTI-HALLUCINATION POWER WORDS
export const ANTI_HALLUCINATION_POWER_WORDS: AntiHallucinationPowerWords = {
  id: 'anti_hallucination_clauses',
  titleFa: 'جعبه‌ابزار کلمات جادویی و شروط ضد توهم در پرامپت‌های مهندسی و حقوقی',
  titleEn: 'Anti-Hallucination Power Clauses: Zero-Tolerance Rules for Engineering & Legal Prompts',
  descriptionFa: 'در قراردادها و محاسبات مهندسی، حتی ۱ درصد توهم هوش مصنوعی می‌تواند به خسارت‌های چندمیلیاردی منجر شود. این شروط آزموده‌شده را در انتهای پرامپت‌ها یا در اینستراکشن سیستمی خود کپی کنید تا خطای مدل به نزدیک صفر میل کند.',
  clauses: [
    {
      code: 'CLAUSE_01_CITATION_MANDATE',
      titleFa: 'قاعده ارجاع مستقیم و الزامی به شماره ماده و بند',
      clauseFa: 'تمامی احکام، تحلیل‌ها و پاسخ‌های حقوقی شما باید منحصراً با ذکر شماره دقیق ماده، بند، پیوست و شماره صفحه متن بارگذاری‌شده همراه باشد. هر حکمی فاقد ارجاع مستقیم نامعتبر تلقی شده و نباید ذکر شود.',
      clauseEn: 'All legal conclusions must strictly reference the exact Clause, Sub-clause, and Annex of the uploaded agreement. Any statement without an exact citation is prohibited.',
      rationaleFa: 'مانع از ساختن قوانین فرضی یا استناد به مواد منسوخ‌شده می‌شود.'
    },
    {
      code: 'CLAUSE_02_UNKNOWN_DECLARATION',
      titleFa: 'فرمان صریح «اعلام فقدان اطلاعات» بدون حدس‌زدن',
      clauseFa: 'اگر پاسخ سوالی در اسناد ضمیمه‌شده به صراحت وجود ندارد، اکیداً از حدس‌زدن، استنباط غیرمستند یا برون‌یابی پرهیز کن و دقیقاً بنویس: «این موضوع در اسناد ارائه‌شده قید نشده است و نیاز به استعلام از دستگاه نظارت/کارفرما دارد».',
      clauseEn: 'If the provided documents do not contain the exact answer, explicitly respond: "This information is not present in the provided documentation" without guessing or extrapolating.',
      rationaleFa: 'بزرگ‌ترین راه مهار تمایل طبیعی مدل‌ها به خوش‌خدمتی و پاسخگویی کاذب.'
    },
    {
      code: 'CLAUSE_03_FACT_VS_INFERENCE',
      titleFa: 'تفکیک داده‌های قطعی از استنتاج‌های احتمالی',
      clauseFa: 'در تحلیل‌های خود، خروجی را به دو بخش کاملاً مجزا تفکیک کن: ۱) «فکت‌های صریح متن قرارداد» ۲) «تفسیرها و سناریوهای محتمل حقوقی». هرگز این دو دسته را با هم ترکیب نکن.',
      clauseEn: 'Explicitly bifurcate outputs into: 1) "Explicit Contractual Facts" and 2) "Interpretations & Potential Scenarios". Never merge factual statements with inferences.',
      rationaleFa: 'مدیر پروژه در یک نگاه متوجه می‌شود چه چیزی متن صریح قرارداد است و چه چیزی نظر تحلیلی هوش مصنوعی.'
    },
    {
      code: 'CLAUSE_04_ORDER_OF_PRECEDENCE',
      titleFa: 'قاعده تقدم اسناد در زمان تعارض داده‌ها',
      clauseFa: 'در صورت مشاهده هرگونه تناقض بین اسناد، طبق بند اولویت اسناد (موافقت‌نامه > شرایط خصوصی > شرایط عمومی پیمان > مشخصات فنی) عمل کن و تناقض را به همراه رتبه‌بندی اسناد در یک کادر هشدار گزارش بده.',
      clauseEn: 'In case of document conflicts, strictly enforce the contractual Order of Precedence and report discrepancies inside an alert box.',
      rationaleFa: 'جلوگیری از اعمال بندهای عمومی در جایی که شرایط خصوصی آن را تغییر داده است.'
    },
    {
      code: 'CLAUSE_05_NO_ASSUMPTIONS_CALC',
      titleFa: 'قاعده محاسبات ریاضی با داده‌های قطعی',
      clauseFa: 'در تمام محاسبات مالی، تعدیل و تاخیرات، فرمول مورداستفاده را نمایش بده و مقادیر جای‌گذاری‌شده را صراحتاً بنویس. اگر هر متغیری (مثل شاخص تعدیل یا تاریخ وقوع) نامعلوم است، از عدد فرضی استفاده نکن و مقدار را خالی بگذار.',
      clauseEn: 'Display all mathematical formulas and substituted variables explicitly. Never inject imaginary placeholder values for missing variables.',
      rationaleFa: 'تضمین می‌کند محاسبات مالیاتی و تعدیل ریالی بر پایه فرضیات غلط انجام نشود.'
    }
  ]
};
