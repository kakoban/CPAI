import { IndustryTrackId } from '../types/industryTrack';

export type DatabaseFamilyId =
  | 'relational'
  | 'document'
  | 'key_value'
  | 'wide_column'
  | 'search_engine'
  | 'graph'
  | 'time_series'
  | 'vector';

export interface DatabaseFamilyItem {
  id: DatabaseFamilyId;
  order: number;
  titleFa: string;
  titleEn: string;
  taglineFa: string;
  storeStageFa: string;
  problemFa: string;
  howItWorksFa: string;
  superpowerTitleFa: string;
  superpowerFa: string;
  prosFa: string[];
  consFa: string[];
  dataShapeFa: string;
  bestQuestionFa: string;
  examples: string[];
  sampleSnippetLabel: string;
  sampleSnippet: string;
  postgresAlternativeNoteFa?: string;
}

export interface DbDecisionScenario {
  id: string;
  labelFa: string;
  questionFa: string;
  recommendedFamilyId: DatabaseFamilyId;
  startWithPostgresNoteFa: string;
}

export interface PocketTermItem {
  id: string;
  order: number;
  termEn: string;
  termFa: string;
  simpleMeaningFa: string;
  tableHighlightPart: 'table' | 'column' | 'row' | 'pk' | 'schema' | 'query' | 'crud';
}

export interface CleansingColumnConfig {
  id: string;
  rawLabelFa: string;
  sqlName: string;
  sqlTypeSqlite: string;
  sqlTypePostgres: string;
  isPii: boolean;
  defaultIncluded: boolean;
  isGovernanceColumn?: boolean;
  defaultRationaleFa: string;
}

export interface CleansingSampleRow {
  id: number;
  reporterName: string;
  mobile: string;
  title: string;
  reportDate: string;
  category: string;
  description: string;
  status: string;
  miscNotes: string;
  issueHintFa?: string;
  defaultExcluded: boolean;
  defaultExclusionReason: string;
}

export type GlossaryCategoryId = 'core_db' | 'architecture' | 'cpmai_governance';

export interface GlossaryTermItem {
  id: string;
  order: number;
  category: GlossaryCategoryId;
  termEn: string;
  termFa: string;
  simpleDefinitionFa: string;
  everydayAnalogyFa: string;
}

export interface BeginnerMistakeItem {
  id: string;
  order: number;
  titleFa: string;
  mistakeFa: string;
  solutionFa: string;
}

export interface TrackDatabaseAdaptation {
  trackId: IndustryTrackId;
  trackLabelFa: string;
  projectTitleFa: string;
  tableContextFa: string;
  sampleTitleFa: string;
  sampleCategoryFa: ReportCategory;
  sampleDescriptionFa: string;
  sampleMetadataPairs: Array<{ key: string; value: string }>;
  piiExampleFa: string;
  postgresBenefitFa: string;
}

export const CANONICAL_TABLE_NAME = 'technical_reports' as const;

export const REPORT_CATEGORIES = [
  'تجهیزات',
  'ایمنی',
  'کیفیت',
  'پشتیبانی',
  'سایر'
] as const;

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export const REPORT_STATUSES = [
  'باز',
  'در حال پیگیری',
  'بسته‌شده'
] as const;

export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const EXCEL_LIMITATIONS = [
  {
    id: 'search',
    order: 1,
    titleFa: 'جستجو و فیلتر کند و پرخطا',
    detailFa:
      'جستجو و فیلتر کردن میان ده‌ها فایل پراکنده اکسل، PDF و یادداشت‌های شخصی کند، دستی و مستعد خطای انسانی است.'
  },
  {
    id: 'concurrency',
    order: 2,
    titleFa: 'تداخل ویرایش هم‌زمان و خطر خرابی داده',
    detailFa:
      'اگر دو نفر هم‌زمان یک فایل را تغییر دهند یا وسط ذخیره اطلاعات برق برود، داده‌ها ناقص، بازنویسی یا خراب می‌شوند.'
  },
  {
    id: 'ai_readiness',
    order: 3,
    titleFa: 'نیاز هوش مصنوعی به ساختار منظم',
    detailFa:
      'سیستم‌های هوش مصنوعی برای تحلیل دقیق و بدون خطا، به داده‌هایی نیاز دارند که در شکل و قالب منظم، یکدست و قابل استخراج آماده شده باشند.'
  }
];

export const DATABASE_FAMILIES: DatabaseFamilyItem[] = [
  {
    id: 'relational',
    order: 1,
    titleFa: 'دیتابیس رابطه‌ای',
    titleEn: 'Relational / SQL',
    taglineFa: 'نظم جدولی و اطمینان مالی',
    storeStageFa: 'گام ۱ فروشگاه: کاربران، محصولات پایه و سفارش‌های مالی',
    problemFa:
      'در شروع فروشگاه، سه دسته داده داریم: «کاربران»، «محصولات» و «سفارش‌ها». شکل این داده‌ها ثابت است و به هم ربط دارند (مثلاً هر سفارش متعلق به یک کاربر است و چند محصول دارد).',
    howItWorksFa:
      'اطلاعات دقیقاً شبیه جدول‌های منظم ذخیره می‌شود؛ هر سطر یک رکورد و هر ستون یک ویژگی است. جدول‌ها با کلید به هم وصل می‌شوند و با زبان SQL می‌توان پرسید: «سفارش‌های ماه پیش علی که بالای ۱ میلیون تومان بوده را بده.»',
    superpowerTitleFa: 'قدرت اصلی: تراکنش و قانون همه‌یاهیچ (ACID)',
    superpowerFa:
      'فرض کنید مشتری با کیف پولش خرید می‌کند؛ هم باید از موجودی کم شود و هم سفارش ثبت شود. دیتابیس رابطه‌ای تضمین می‌کند یا هر دو کار کامل انجام شوند یا هیچ‌کدام — وسط کار پول گم نمی‌شود.',
    prosFa: [
      'دقت و اطمینان بسیار بالا در داده‌های مالی و عملیاتی',
      'پاسخ سریع و منعطف به پرسش‌ها و گزارش‌های ترکیبی (Join)',
      'تضمین یکپارچگی داده با قیدها (Constraints) و تراکنش‌های ACID'
    ],
    consFa: [
      'اگر ساختار داده هر روز به‌شدت عوض شود، تغییر مداوم ستون‌ها نیاز به برنامه‌ریزی دارد',
      'پخش کردن روی ده‌ها سرور هم‌زمان در مقیاس میلیونی پیچیده‌تر از برخی مدل‌های NoSQL است'
    ],
    dataShapeFa: 'جدول منظم با روابط دقیق',
    bestQuestionFa: 'گزارش‌های ترکیبی و تراکنش‌های مالی',
    examples: ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite'],
    sampleSnippetLabel: 'نمونه جدول و کوئری SQL',
    sampleSnippet: `SELECT id, title, status
FROM technical_reports
WHERE is_deleted = FALSE AND status = 'باز'
ORDER BY report_date DESC;`,
    postgresAlternativeNoteFa:
      'PostgreSQL به‌عنوان «آچار فرانسه» شروع پروژه، همین هسته رابطه‌ای را به همراه JSONB، جستجوی متنی، Time-Series و pgvector پوشش می‌دهد.'
  },
  {
    id: 'document',
    order: 2,
    titleFa: 'دیتابیس سندمحور',
    titleEn: 'Document-Based',
    taglineFa: 'انعطاف برای مشخصات متنوع',
    storeStageFa: 'گام ۲ فروشگاه: کاتالوگ کالاهای نامتجانس (کفش، لپ‌تاپ، کتاب)',
    problemFa:
      'فروشگاه بزرگ می‌شود و حالا هم «لپ‌تاپ» می‌فروشد (رم، پردازنده، کارت گرافیک)، هم «کفش» (سایز، جنس کفی) و هم «کتاب» (نویسنده، شابک). اگر همه را در یک جدول ثابت بریزید، پر از خانه‌های خالی می‌شود.',
    howItWorksFa:
      'به‌جای سطرهای اجباری یک‌شکل، هر محصول را مثل یک «پرونده JSON» مستقل ذخیره می‌کند. هر پرونده فقط ویژگی‌های مرتبط با خودش را دارد و هر زمان می‌توان فیلد جدیدی به آن افزود.',
    superpowerTitleFa: 'قدرت اصلی: اسکیمای انعطاف‌پذیر (Flexible Schema)',
    superpowerFa:
      'بدون نیاز به دست‌کاری کل جدول و ایجاد صدها ستون خالی، می‌توان کالاها یا گزارش‌هایی با مشخصات کاملاً متفاوت را یکجا ذخیره کرد.',
    prosFa: [
      'انعطاف‌پذیری عالی برای داده‌های متغیر و نیمه‌ساخت‌یافته',
      'سرعت بالا در توسعه اولیه وقتی شکل همه فیلدها از روز اول قطعی نیست'
    ],
    consFa: [
      'در اتصال‌های چندجدولی پیچیده (Join) به قدرتمندی SQL نیست',
      'بدون نظم‌دهی تیمی ممکن است شکل اسناد به‌مرور آشفته شود'
    ],
    dataShapeFa: 'اسناد انعطاف‌پذیر (JSON)',
    bestQuestionFa: 'ذخیره داده‌های متنوع مثل کاتالوگ محصول',
    examples: ['MongoDB'],
    sampleSnippetLabel: 'نمونه سند JSON انعطاف‌پذیر',
    sampleSnippet: `{
  "product": "لپ‌تاپ صنعتی",
  "specs": { "ram_gb": 32, "cpu": "Core i7", "ip_rating": "IP65" }
}`,
    postgresAlternativeNoteFa:
      'نکته شروع هوشمند: در PostgreSQL یک ستون از نوع JSONB (مثل extra_metadata) همین انعطاف را بدون اضافه کردن دیتابیس دوم فراهم می‌کند.'
  },
  {
    id: 'key_value',
    order: 3,
    titleFa: 'دیتابیس کلید-مقدار',
    titleEn: 'Key-Value',
    taglineFa: 'سرعت نور در حافظه موقت (RAM)',
    storeStageFa: 'گام ۳ فروشگاه: کد ورود OTP، سبد خرید موقت و کش صفحه اول',
    problemFa:
      'در جشنواره فروش، هزاران نفر هم‌زمان کد ورود پیامکی (OTP) می‌خواهند یا صفحه اول سایت را باز می‌کنند. هر بار خواندن از هارددیسک، سایت را کند می‌کند.',
    howItWorksFa:
      'دقیقاً شبیه «دفترچه تلفن» یا کمد امانات شماره‌دار در حافظه فوق‌سریع RAM کار می‌کند: یک کلید می‌دهید (مثلاً کد کاربر) و در کسری از میلی‌ثانیه مقدارش را تحویل می‌گیرید.',
    superpowerTitleFa: 'قدرت اصلی: زمان انقضای خودکار (TTL) و سرعت RAM',
    superpowerFa:
      'می‌توانید بگویید «این کد ورود دقیقاً بعد از ۱۲۰ ثانیه خودش پاک شود». برای کش کردن نتایج پرتکرار و نشست کاربران بی‌رقیب است.',
    prosFa: [
      'سرعت فوق‌العاده بالا (در مقیاس میکروثانیه و میلی‌ثانیه)',
      'سادگی مطلق برای کشینگ، نشست‌های کاربری و شمارنده‌های لحظه‌ای'
    ],
    consFa: [
      'برای جستجوهای پیچیده، فیلتر روی چند ویژگی یا گزارش‌گیری تحلیلی ساخته نشده است',
      'حافظه RAM گران‌تر از دیسک است و معمولاً دیتابیس اصلی آرشیو نیست'
    ],
    dataShapeFa: 'جفت ساده کلید و مقدار',
    bestQuestionFa: '«مقدار مربوط به این کلید الان چیست؟» (کش و OTP)',
    examples: ['Redis'],
    sampleSnippetLabel: 'نمونه دستور کلید-مقدار با انقضا',
    sampleSnippet: `SET otp:user_42 "849210" EX 120
GET otp:user_42  -- خروجی در زیر ۱ میلی‌ثانیه`
  },
  {
    id: 'wide_column',
    order: 4,
    titleFa: 'دیتابیس ستون‌محور گسترده',
    titleEn: 'Wide-Column',
    taglineFa: 'مقیاس‌پذیری غول‌آسا در نوشتن داده',
    storeStageFa: 'گام ۴ فروشگاه: ثبت میلیون‌ها رویداد کلیک و پیام پشتیبانی لحظه‌ای',
    problemFa:
      'اپلیکیشن فروشگاه یا سیستم پیام‌رسان آن‌قدر بزرگ می‌شود که در هر ثانیه صدها هزار رویداد کلیک یا پیام چت (شبیه دیسکورد) باید بدون وقفه ثبت شوند.',
    howItWorksFa:
      'داده‌ها را بر اساس الگوهای دسترسی از پیش تعیین‌شده روی ده‌ها سرور پخش (Partition) می‌کند تا نوشتن هم‌زمان میلیون‌ها رکورد بدون گلوگاه انجام شود.',
    superpowerTitleFa: 'قدرت اصلی: تحمل بار نوشتن عظیم بدون توقف',
    superpowerFa:
      'حتی اگر یک سرور از دسترس خارج شود، خوشه به ثبت بی‌وقفه داده‌ها ادامه می‌دهد. (توجه: مدل Wide-Column مثل Cassandra برای ثبت سنگین است و با دیتابیس‌های ستونی تحلیلی OLAP مثل ClickHouse تفاوت دارد.)',
    prosFa: [
      'مقیاس‌پذیری افقی بسیار بالا برای حجم عظیم نوشتن داده',
      'دسترس‌پذیری مداوم در معماری‌های توزیع‌شده چندسروره'
    ],
    consFa: [
      'سؤال‌ها و کوئری‌ها باید از روز اول دقیق طراحی شوند؛ پرسش‌های ناگهانی و جدید در آن سخت است',
      'راه‌اندازی و نگهداری آن برای پروژه‌های کوچک و متوسط کاملاً غیرضروری است'
    ],
    dataShapeFa: 'جدول‌های توزیع‌شده گسترده',
    bestQuestionFa: 'ثبت میلیون‌ها رویداد و پیام در ثانیه',
    examples: ['Cassandra', 'ScyllaDB', '(تحلیلی OLAP: ClickHouse)'],
    sampleSnippetLabel: 'نمونه الگوی ذخیره بر اساس کلید پارتیشن',
    sampleSnippet: `Partition Key: channel_id = "support_2026_03"
Clustering Key: message_timestamp DESC
-> واکشی فوق‌سریع آخرین پیام‌های همان کانال`
  },
  {
    id: 'search_engine',
    order: 5,
    titleFa: 'موتور جستجو',
    titleEn: 'Search Engine',
    taglineFa: 'جستجوی هوشمند متنی و تحمل غلط املایی',
    storeStageFa: 'گام ۵ فروشگاه: کادر جستجوی هوشمند کالا با غلط املایی و فیلتر هم‌زمان',
    problemFa:
      'کاربر در کادر جستجو با غلط املایی تایپ می‌کند «گوشي سمسونگ ارزون»؛ دیتابیس معمولی یا چیزی پیدا نمی‌کند یا نتیجه نامرتبط برمی‌گرداند.',
    howItWorksFa:
      'مثل «فهرست الفبایی آخر یک کتاب قطور» (Inverted Index) تمام کلمات و ریشه‌ها را فهرست می‌کند تا بلافاصله بگوید هر کلمه در کدام کالاها آمده و کدام نتیجه مرتبط‌تر است.',
    superpowerTitleFa: 'قدرت اصلی: فهرست معکوس (Inverted Index) و رتبه‌بندی',
    superpowerFa:
      'پشتیبانی از جستجوی فازی (تحمل غلط املایی)، مترادف‌ها، هایلایت متن و امتیازدهی به مرتبط‌ترین نتایج در چند میلی‌ثانیه.',
    prosFa: [
      'تجربه جستجوی متنی حرفه‌ای و فیلترهای چندوجهی (Facets)',
      'رتبه‌بندی هوشمند نتایج بر اساس میزان تطابق'
    ],
    consFa: [
      'دیتابیس اصلی نگهداری تراکنش و اطلاعات مرجع نیست و معمولاً به‌عنوان انبار دوم کنار دیتابیس اصلی قرار می‌گیرد'
    ],
    dataShapeFa: 'فهرست معکوس کلمات (Inverted Index)',
    bestQuestionFa: 'جستجوی متنی با غلط املایی و رتبه‌بندی',
    examples: ['Elasticsearch'],
    sampleSnippetLabel: 'نمونه جستجوی فازی با تحمل غلط املایی',
    sampleSnippet: `{
  "query": {
    "match": { "title": { "query": "پمپ فشارقوی", "fuzziness": "AUTO" } }
  }
}`,
    postgresAlternativeNoteFa:
      'برای بسیاری از پروژه‌های اولیه، قابلیت Full-Text Search داخلی خود PostgreSQL بدون نیاز به نصب Elasticsearch کاملاً کافی است.'
  },
  {
    id: 'graph',
    order: 6,
    titleFa: 'دیتابیس گراف',
    titleEn: 'Graph DB',
    taglineFa: 'کشف شبکه‌ها و روابط چندمرحله‌ای',
    storeStageFa: 'گام ۶ فروشگاه: توصیه‌گر هوشمند و کشف شبکه‌های تقلب',
    problemFa:
      'می‌خواهید بپرسید «مشتری‌هایی که این کتاب را خریده‌اند و دوستِ خریداران دوره ما بوده‌اند، دیگر چه چیزهایی خریده‌اند؟» یا «آیا این ۱۰ حساب کاربری مشکوک با کارت بانکی و آدرس مشترک یک حلقه تقلب ساخته‌اند؟»',
    howItWorksFa:
      'داده‌ها را شبیه «نقشه مترو یا تخته کارآگاهان» ذخیره می‌کند: دایره‌ها گره (Node) هستند (کاربر، کالا، پیمانکار) و خط‌های بین آن‌ها یال یا رابطه (Edge) هستند.',
    superpowerTitleFa: 'قدرت اصلی: پیمایش سریع روابط چندلایه‌ای',
    superpowerFa:
      'سؤالی که در SQL با ۵ بار Join سنگین و کند می‌شود، در دیتابیس گراف با پرش مستقیم روی یال‌ها در کسری از ثانیه جواب می‌دهد.',
    prosFa: [
      'عالی برای سیستم‌های توصیه‌گر، کشف حلقه‌های تقلب و گراف دانش (Knowledge Graph)',
      'مدل‌سازی طبیعی شبکه‌های پیچیده انسانی، مالی و زنجیره تأمین'
    ],
    consFa: [
      'برای گزارش‌های جدولی ساده، انبارداری مالی و عملیات CRUD روزمره کاربرد اول نیست'
    ],
    dataShapeFa: 'گره و یال (Nodes & Edges)',
    bestQuestionFa: 'روابط پیچیده، توصیه‌گر و کشف تقلب',
    examples: ['Neo4j'],
    sampleSnippetLabel: 'نمونه کوئری گراف (Cypher)',
    sampleSnippet: `MATCH (u:User)-[:BOUGHT]->(p:Product)<-[:BOUGHT]-(peer:User)-[:BOUGHT]->(rec:Product)
WHERE u.id = 104 AND NOT (u)-[:BOUGHT]->(rec)
RETURN rec.title, count(*) AS score ORDER BY score DESC;`
  },
  {
    id: 'time_series',
    order: 7,
    titleFa: 'دیتابیس سری زمانی',
    titleEn: 'Time-Series',
    taglineFa: 'رصد لحظه‌به‌لحظه روندها و سنسورها',
    storeStageFa: 'گام ۷ فروشگاه: پایش لحظه‌ای سرعت سرورها، دما و سنسورهای صنعتی',
    problemFa:
      'می‌خواهید هر ثانیه دمای انبار، فشار پمپ، مصرف CPU سرور یا نوسان نرخ فروش را ثبت کنید و روند ۲۴ ساعت یا یک ماه گذشته را روی نمودار ببینید.',
    howItWorksFa:
      'هر رکورد سه جزء کلیدی دارد: «زمان دقیق (Timestamp) + عدد اندازه‌گیری (Value) + برچسب (Tag مثل نام سنسور)». داده‌ها بر اساس زمان فشرده‌سازی و چیده می‌شوند.',
    superpowerTitleFa: 'قدرت اصلی: فشرده‌سازی زمانی، Downsampling و Retention',
    superpowerFa:
      'به‌طور خودکار داده‌های ثانیه‌به‌ثانیه ماه قبل را به میانگین ساعتی خلاصه می‌کند (Downsampling) و داده‌های خیلی قدیمی را طبق قانون نگهداری پاک می‌کند.',
    prosFa: [
      'بسیار کم‌حجم و فوق‌سریع برای نمودارهای روندی، IoT و مانیتورینگ صنعتی',
      'توابع آماده میانگین متحرک، پنجره زمانی و تشخیص ناهنجاری روندی'
    ],
    consFa: [
      'برای ویرایش مکرر رکوردهای قدیمی یا روابط پیچیده کاربری طراحی نشده است'
    ],
    dataShapeFa: 'برچسب زمان + عدد + تگ',
    bestQuestionFa: 'روند سنسورها، مانیتورینگ و نمودارهای زمانی',
    examples: ['InfluxDB', 'TimescaleDB'],
    sampleSnippetLabel: 'نمونه تجمیع پنجره زمانی (Time Bucket)',
    sampleSnippet: `SELECT time_bucket('1 hour', recorded_at) AS hour,
       AVG(vibration_mm_s) AS avg_vibration
FROM pump_telemetry
WHERE recorded_at > NOW() - INTERVAL '24 hours'
GROUP BY hour ORDER BY hour;`,
    postgresAlternativeNoteFa:
      'افزونه TimescaleDB دقیقاً روی خود PostgreSQL نصب می‌شود و نیاز به دیتابیس جداگانه را برطرف می‌کند.'
  },
  {
    id: 'vector',
    order: 8,
    titleFa: 'دیتابیس برداری',
    titleEn: 'Vector DB',
    taglineFa: 'مغز جستجوی معنایی و هوش مصنوعی (RAG)',
    storeStageFa: 'گام ۸ فروشگاه: دستیار هوش مصنوعی که «منظور» کاربر را می‌فهمد',
    problemFa:
      'مشتری می‌پرسد «یه کادوی شیک برای پدرم که به کوهنوردی علاقه داره می‌خوام» یا مهندس می‌پرسد «در قراردادهای پارسال درباره جریمه تأخیر تجهیزات چه گفته‌ایم؟» — هیچ‌کدام از این کلمات دقیقاً در متن سند نیست!',
    howItWorksFa:
      'هوش مصنوعی هر متن یا سند را به یک آرایه عددی (Embedding / Vector) تبدیل می‌کند که «معنای» آن را در فضای چندبعدی نشان می‌دهد. دیتابیس برداری نزدیک‌ترین مفاهیم را از نظر معنایی پیدا می‌کند.',
    superpowerTitleFa: 'قدرت اصلی: جستجوی معنایی و معماری RAG',
    superpowerFa:
      'پیدا کردن مرتبط‌ترین پاراگراف‌ها بر اساس مفهوم (نه فقط تطابق کلمه) و تغذیه دقیق آن‌ها به LLM برای پاسخ‌های مستند بدون توهم.',
    prosFa: [
      'قلب تپنده سیستم‌های پرسش‌وپاسخ روی اسناد (RAG) و جستجوی معنایی',
      'درک مترادف‌ها و نیت کاربر حتی بدون اشتراک واژگان دقیق'
    ],
    consFa: [
      'برای نگهداری تراکنش‌های مالی، حسابداری و گزارش‌های دقیق عددی جایگزین SQL نیست'
    ],
    dataShapeFa: 'آرایه عددی معنایی (Embeddings)',
    bestQuestionFa: '«کدام اسناد از نظر معنایی شبیه سؤال کاربرند؟» (RAG)',
    examples: ['ChromaDB (جلسه ۷)', 'Milvus', 'Qdrant', 'Pinecone', 'pgvector'],
    sampleSnippetLabel: 'نمونه جستجوی همسایگی برداری (pgvector)',
    sampleSnippet: `SELECT doc_title, chunk_text
FROM knowledge_chunks
ORDER BY embedding <=> :question_vector
LIMIT 5;`,
    postgresAlternativeNoteFa:
      'افزونه pgvector قابلیت جستجوی برداری و RAG را مستقیماً به داخل همان PostgreSQL اضافه می‌کند!'
  }
];

export const DB_DECISION_SCENARIOS: DbDecisionScenario[] = [
  {
    id: 'orders_finance',
    labelFa: 'تراکنش مالی و گزارش‌های منظم پروژه',
    questionFa: 'سفارش‌ها، فاکتورها یا گزارش‌های روزانه فنی که ساختار مشخص و روابط مهم دارند.',
    recommendedFamilyId: 'relational',
    startWithPostgresNoteFa: 'انتخاب اول و مستقیم: PostgreSQL (آنلاین/تیمی) یا SQLite (آفلاین و سریع).'
  },
  {
    id: 'heterogeneous_catalog',
    labelFa: 'مشخصات متنوع و فیلدهای غیرثابت',
    questionFa: 'اقلام یا تجهیزاتی که هر کدام ویژگی‌های فنی کاملاً متفاوتی دارند.',
    recommendedFamilyId: 'document',
    startWithPostgresNoteFa: 'برای شروع پروژه، یک ستون JSONB داخل PostgreSQL همین نیاز را بدون دیتابیس دوم حل می‌کند.'
  },
  {
    id: 'otp_cache',
    labelFa: 'کد یک‌بارمصرف OTP و کش فوق‌سریع',
    questionFa: 'داده‌های موقتی که باید در چند میلی‌ثانیه خوانده شوند و پس از ۲ دقیقه منقضی شوند.',
    recommendedFamilyId: 'key_value',
    startWithPostgresNoteFa: 'در فاز اول پروژه معمولاً به Redis نیاز ندارید؛ وقتی ترافیک بالا رفت به‌عنوان کش اضافه می‌شود.'
  },
  {
    id: 'massive_chat_events',
    labelFa: 'ثبت میلیون‌ها پیام یا کلیک در ثانیه',
    questionFa: 'جریان سنگین رویدادها یا پیام‌رسان سازمانی در مقیاس صدها هزار نوشتن در ثانیه.',
    recommendedFamilyId: 'wide_column',
    startWithPostgresNoteFa: 'تا پیش از رسیدن به مقیاس ده‌ها هزار نوشتن در ثانیه، PostgreSQL پارتیشن‌بندی‌شده کافی است.'
  },
  {
    id: 'typo_search',
    labelFa: 'جستجوی متنی با تحمل غلط املایی',
    questionFa: 'کاربران کلمات را ناقص یا با غلط املایی جستجو می‌کنند و رتبه‌بندی هوشمند می‌خواهند.',
    recommendedFamilyId: 'search_engine',
    startWithPostgresNoteFa: 'برای شروع، Full-Text Search داخلی PostgreSQL کارتان را راه می‌اندازد و در مقیاس بالا Elasticsearch اضافه می‌شود.'
  },
  {
    id: 'fraud_recommendations',
    labelFa: 'کشف شبکه تقلب یا توصیه‌گر روابط',
    questionFa: 'تحلیل ارتباط‌های چندمرحله‌ای میان کاربران، پیمانکاران، کالاها و قراردادها.',
    recommendedFamilyId: 'graph',
    startWithPostgresNoteFa: 'روابط ۲ تا ۳ مرحله‌ای با Join و Recursive CTE در PostgreSQL قابل اجراست؛ برای گراف‌های عمیق Neo4j عالی است.'
  },
  {
    id: 'iot_telemetry',
    labelFa: 'داده سنسورها و نمودار روند لحظه‌ای',
    questionFa: 'ثبت ثانیه‌به‌ثانیه دما، فشار، ارتعاش یا مصرف سرور و محاسبه میانگین‌های ساعتی.',
    recommendedFamilyId: 'time_series',
    startWithPostgresNoteFa: 'افزونه TimescaleDB روی خود PostgreSQL نیاز سری زمانی را یکپارچه پوشش می‌دهد.'
  },
  {
    id: 'rag_semantic',
    labelFa: 'جستجوی معنایی اسناد و چت‌بات RAG',
    questionFa: 'پاسخ هوش مصنوعی بر اساس مفهوم و نیت سؤال کاربر روی آرشیو اسناد و گزارش‌ها.',
    recommendedFamilyId: 'vector',
    startWithPostgresNoteFa: 'افزونه pgvector روی PostgreSQL (یا ChromaDB در جلسه ۷) بهترین نقطه شروع برای RAG است.'
  }
];

export const POCKET_DICTIONARY_TERMS: PocketTermItem[] = [
  {
    id: 'table',
    order: 1,
    termEn: 'Table',
    termFa: 'جدول',
    simpleMeaningFa: 'یک برگه اکسل منظم برای یک موضوع خاص (مثلاً جدول technical_reports).',
    tableHighlightPart: 'table'
  },
  {
    id: 'column',
    order: 2,
    termEn: 'Column / Attribute',
    termFa: 'ستون / ویژگی',
    simpleMeaningFa: 'هر مشخصه‌ای که ثبت می‌کنیم (مثل title، report_date، status).',
    tableHighlightPart: 'column'
  },
  {
    id: 'row',
    order: 3,
    termEn: 'Row / Record',
    termFa: 'سطر / رکورد',
    simpleMeaningFa: 'یک مورد کامل ثبت‌شده (مثلاً یک گزارش فنی مشخص با تمام ویژگی‌هایش).',
    tableHighlightPart: 'row'
  },
  {
    id: 'primary_key',
    order: 4,
    termEn: 'Primary Key (id)',
    termFa: 'کلید اصلی',
    simpleMeaningFa: 'شماره شناسنامه یکتای هر سطر که همیشه اولین ستون جدول است (۱، ۲، ۳...).',
    tableHighlightPart: 'pk'
  },
  {
    id: 'schema',
    order: 5,
    termEn: 'Schema',
    termFa: 'اسکیما / نقشه جدول',
    simpleMeaningFa: 'نقشه معماری جدول: نام ستون‌ها، نوع داده هر ستون و قوانین اجباری بودن آن‌ها.',
    tableHighlightPart: 'schema'
  },
  {
    id: 'query',
    order: 6,
    termEn: 'Query',
    termFa: 'کوئری / پرس‌وجو',
    simpleMeaningFa: 'سؤالی که به زبان SQL از دیتابیس می‌پرسیم (مثلاً فقط گزارش‌های باز و حذف‌نشده را بیاور).',
    tableHighlightPart: 'query'
  },
  {
    id: 'crud',
    order: 7,
    termEn: 'CRUD',
    termFa: '۴ عمل اصلی حافظه دائمی',
    simpleMeaningFa: 'Create (ثبت) · Read (مشاهده/فیلتر) · Update (ویرایش) · Delete (حذف — در استاندارد ما: حذف نرم).',
    tableHighlightPart: 'crud'
  }
];

export const CPMAI_SELECT_DATA_CRITERIA = [
  {
    id: 'relevance',
    titleFa: 'تناسب با هدف پروژه (Project Relevance)',
    detailFa: 'فقط ستون‌ها و رکوردهایی وارد مدل و جدول شوند که مستقیماً به حل مسئله پروژه کمک می‌کنند.'
  },
  {
    id: 'quality',
    titleFa: 'کیفیت داده (Data Quality)',
    detailFa: 'داده‌های ناقص، تکراری، تستی و نویزها باید شناسایی و با دلیل شفاف از مجموعه تحلیلی جدا شوند.'
  },
  {
    id: 'technical',
    titleFa: 'محدودیت‌های فنی و امنیتی (Technical Constraints)',
    detailFa: 'حذف یا ناشناس‌سازی اطلاعات هویتی حساس (PII) و انتخاب نوع داده سازگار با موتور دیتابیس و حافظه.'
  }
];

export const CLEANSING_COLUMNS_INITIAL: CleansingColumnConfig[] = [
  {
    id: 'col_id',
    rawLabelFa: 'ردیف ← کلید اصلی (id)',
    sqlName: 'id',
    sqlTypeSqlite: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    sqlTypePostgres: 'BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY',
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'شناسه یکتا برای ردیابی، ویرایش، پیوند جداول و حذف نرم بدون خطا (همیشه ستون اول).'
  },
  {
    id: 'col_reporter_name',
    rawLabelFa: 'نام کامل ثبت‌کننده',
    sqlName: 'reporter_full_name',
    sqlTypeSqlite: 'TEXT',
    sqlTypePostgres: 'TEXT',
    isPii: true,
    defaultIncluded: false,
    defaultRationaleFa: 'داده هویتی شخصی (PII) — برای تحلیل فنی گزارش‌ها غیرضروری است و جهت حفظ حریم خصوصی حذف شد.'
  },
  {
    id: 'col_mobile',
    rawLabelFa: 'شماره موبایل',
    sqlName: 'reporter_mobile',
    sqlTypeSqlite: 'TEXT',
    sqlTypePostgres: 'TEXT',
    isPii: true,
    defaultIncluded: false,
    defaultRationaleFa: 'اطلاعات تماس حساس (PII) — خطر نشت داده بدون ارزش تحلیلی؛ از اسکیما کنار گذاشته شد.'
  },
  {
    id: 'col_title',
    rawLabelFa: 'عنوان کوتاه گزارش',
    sqlName: 'title',
    sqlTypeSqlite: 'TEXT NOT NULL CHECK (length(trim(title)) > 0)',
    sqlTypePostgres: 'TEXT NOT NULL CHECK (length(trim(title)) > 0)',
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'فیلد اجباری برای اسکن سریع گزارش‌ها در داشبورد، جستجو و اعتبارسنجی فرم.'
  },
  {
    id: 'col_report_date',
    rawLabelFa: 'تاریخ گزارش',
    sqlName: 'report_date',
    sqlTypeSqlite: 'TEXT NOT NULL',
    sqlTypePostgres: 'DATE NOT NULL',
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'ضروری برای تحلیل روند زمانی، اولویت‌بندی تأخیرات و ذخیره استاندارد ISO.'
  },
  {
    id: 'col_category',
    rawLabelFa: 'دسته‌بندی',
    sqlName: 'category',
    sqlTypeSqlite: "TEXT NOT NULL CHECK (category IN ('تجهیزات', 'ایمنی', 'کیفیت', 'پشتیبانی', 'سایر'))",
    sqlTypePostgres: "TEXT NOT NULL CHECK (category IN ('تجهیزات', 'ایمنی', 'کیفیت', 'پشتیبانی', 'سایر'))",
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'محدود به ۵ مقدار استاندارد برای فیلتر دقیق و گزارش‌گیری بدون غلط املایی.'
  },
  {
    id: 'col_description',
    rawLabelFa: 'شرح مشکل',
    sqlName: 'description',
    sqlTypeSqlite: 'TEXT NOT NULL CHECK (length(trim(description)) > 0)',
    sqlTypePostgres: 'TEXT NOT NULL CHECK (length(trim(description)) > 0)',
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'متن اصلی واقعه فنی برای تحلیل ریشه‌ای و ورودی تمیز مدل‌های هوش مصنوعی.'
  },
  {
    id: 'col_status',
    rawLabelFa: 'وضعیت',
    sqlName: 'status',
    sqlTypeSqlite: "TEXT NOT NULL DEFAULT 'باز' CHECK (status IN ('باز', 'در حال پیگیری', 'بسته‌شده'))",
    sqlTypePostgres: "TEXT NOT NULL DEFAULT 'باز' CHECK (status IN ('باز', 'در حال پیگیری', 'بسته‌شده'))",
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'ردیابی چرخه عمر گزارش فقط با ۳ وضعیت مجاز و قابل ممیزی.'
  },
  {
    id: 'col_extra_metadata',
    rawLabelFa: 'یادداشت‌های متفرقه ← extra_metadata (JSON)',
    sqlName: 'extra_metadata',
    sqlTypeSqlite: "TEXT NOT NULL DEFAULT '{}'",
    sqlTypePostgres: "JSONB NOT NULL DEFAULT '{}'::jsonb",
    isPii: false,
    defaultIncluded: true,
    defaultRationaleFa: 'پوشش فیلدهای منعطف و متغیر در قالب JSON/JSONB بدون نیاز به ساخت دیتابیس دوم.'
  },
  {
    id: 'col_is_deleted',
    rawLabelFa: 'نشانگر حذف نرم (is_deleted)',
    sqlName: 'is_deleted',
    sqlTypeSqlite: 'BOOLEAN NOT NULL DEFAULT FALSE',
    sqlTypePostgres: 'BOOLEAN NOT NULL DEFAULT FALSE',
    isPii: false,
    isGovernanceColumn: true,
    defaultIncluded: true,
    defaultRationaleFa: 'الزام حاکمیتی CPMAI برای اجرای Soft Delete و جلوگیری از پاک شدن غیرقابل ردیابی داده‌ها.'
  },
  {
    id: 'col_exclusion_reason',
    rawLabelFa: 'دلیل کنارگذاری (exclusion_reason)',
    sqlName: 'exclusion_reason',
    sqlTypeSqlite: 'TEXT',
    sqlTypePostgres: 'TEXT',
    isPii: false,
    isGovernanceColumn: true,
    defaultIncluded: true,
    defaultRationaleFa: 'تأمین شفافیت گزینش داده (Data Selection Transparency) هنگام کنار گذاشتن هر رکورد.'
  }
];

export const CLEANSING_SAMPLE_ROWS_INITIAL: CleansingSampleRow[] = [
  {
    id: 101,
    reporterName: 'مهندس رضا کریمی',
    mobile: '09123456789',
    title: 'نشتی آب‌بند پمپ تغذیه واحد ۲',
    reportDate: '2026-03-10',
    category: 'تجهیزات',
    description: 'در بازدید شیفت صبح افزایش لرزش و نشتی جزئی از سیل مکانیکی مشاهده شد.',
    status: 'در حال پیگیری',
    miscNotes: 'پلاک تجهیز: P-204 | اولویت: بالا',
    defaultExcluded: false,
    defaultExclusionReason: ''
  },
  {
    id: 102,
    reporterName: 'سارا محمدی',
    mobile: '09129876543',
    title: 'نقص حفاظ ایمنی راهروی شرقی',
    reportDate: '2026-03-11',
    category: 'ایمنی',
    description: 'نرده محافظ سکو در تراز +۴ متر لق شده و نیازمند جوشکاری فوری است.',
    status: 'باز',
    miscNotes: 'منطقه: سوله B',
    defaultExcluded: false,
    defaultExclusionReason: ''
  },
  {
    id: 103,
    reporterName: 'ادمین سیستم',
    mobile: '09000000000',
    title: 'تست ۱ ۲ ۳ آزمایش فرم',
    reportDate: '2026-03-12',
    category: 'سایر',
    description: 'تست جهت بررسی اتصال فرم به دیتابیس',
    status: 'باز',
    miscNotes: 'رکورد آزمایشی',
    issueHintFa: 'رکورد تستی — آلوده کردن آمار و تحلیل AI',
    defaultExcluded: true,
    defaultExclusionReason: 'داده آزمایشی (تست فنی فرم)؛ نباید وارد گزارش مدیریتی و تحلیل AI شود.'
  },
  {
    id: 104,
    reporterName: 'نامشخص',
    mobile: '09111111111',
    title: '---',
    reportDate: '2026-03-12',
    category: 'کیفیت',
    description: '',
    status: 'باز',
    miscNotes: 'فیلد شرح خالی مانده است',
    issueHintFa: 'رکورد ناقص — فاقد عنوان و شرح معتبر',
    defaultExcluded: true,
    defaultExclusionReason: 'رکورد ناقص با عنوان بی‌معنی و شرح خالی؛ فاقد حداقل کیفیت داده CPMAI.'
  }
];

export const BEGINNER_MISTAKES: BeginnerMistakeItem[] = [
  {
    id: 'm1',
    order: 1,
    titleFa: 'انتخاب چند دیتابیس مختلف در روز اول (تله Polyglot Persistence)',
    mistakeFa:
      'نصب هم‌زمان PostgreSQL، MongoDB، Redis و Elasticsearch در هفته اول پروژه باعث پیچیدگی همگام‌سازی و توقف تیم می‌شود.',
    solutionFa:
      'روز اول فقط با یک PostgreSQL (یا SQLite آفلاین) شروع کنید و از JSONB، جستجوی متنی و pgvector همان موتور استفاده کنید.'
  },
  {
    id: 'm2',
    order: 2,
    titleFa: 'ذخیره اطلاعات هویتی غیرضروری (PII)',
    mistakeFa:
      'آوردن کدملی، شماره موبایل یا آدرس منزل افراد در جدول گزارش‌های فنی فقط چون در فایل اکسل خام بوده است.',
    solutionFa:
      'پیش از ساخت جدول، ستون‌های PII غیرضروری را حذف یا ناشناس‌سازی کنید و دلیل آن را در سند انتخاب داده بنویسید.'
  },
  {
    id: 'm3',
    order: 3,
    titleFa: 'حذف سخت (Hard Delete) بدون ردپای ممیزی',
    mistakeFa:
      'پاک کردن کامل سطرها با دستور DELETE FROM باعث می‌شود هیچ‌کس نفهمد چه داده‌ای، کی و چرا از تحلیل حذف شده است.',
    solutionFa:
      'همیشه از Soft Delete با دو ستون is_deleted و exclusion_reason استفاده کنید تا شفافیت CPMAI حفظ شود.'
  },
  {
    id: 'm4',
    order: 4,
    titleFa: 'رها کردن ستون‌ها بدون قیدهای کنترلی (Constraints)',
    mistakeFa:
      'اجازه دادن به ثبت عنوان خالی یا تایپ آزاد وضعیت‌هایی مثل «بسته»، «بسته‌شده» و «تموم شد» جدول را غیرقابل تحلیل می‌کند.',
    solutionFa:
      'روی ستون‌های حیاتی NOT NULL و CHECK بگذارید و در فرم ورودی نیز اعتبارسنجی صریح قرار دهید.'
  }
];

export const READY_PROMPTS_SESSION_5 = {
  prompt1Schema: {
    id: 's5_db_prompt_1',
    titleFa: 'پرامپت آماده ۱: طراحی اسکیما و کد ساخت جدول (DDL / CREATE TABLE)',
    subtitleFa: 'همگام ۱۰۰٪ با جدول واحد technical_reports، قیدها و قوانین CPMAI',
    text: `نقش تو یک معمار پایگاه داده است که برای یک طراح غیربرنامه‌نویس کار می‌کند.
می‌خواهم جدول «technical_reports» (گزارش‌های روزانه فنی) را مطابق استاندارد PMI-CPMAI فاز سوم بسازم.

لطفاً کد دقیق SQL ساخت جدول (CREATE TABLE) را در دو نسخه «SQLite» و «PostgreSQL» با رعایت کامل ۴ قانون زیر تولید کن:
1. ستون اول حتماً کلید اصلی یکتا و افزایشی با نام «id» باشد.
2. دقیقاً از این ستون‌ها و مقادیر مجاز استفاده کن (هیچ ستون PII مثل نام کامل یا شماره موبایل اضافه نکن):
   - title (متن اجباری NOT NULL، غیرخالی)
   - report_date (تاریخ ISO اجباری NOT NULL)
   - category (اجباری، فقط یکی از: 'تجهیزات'، 'ایمنی'، 'کیفیت'، 'پشتیبانی'، 'سایر')
   - description (متن اجباری NOT NULL، غیرخالی)
   - status (اجباری با پیش‌فرض 'باز'، فقط یکی از: 'باز'، 'در حال پیگیری'، 'بسته‌شده')
   - extra_metadata (برای ویژگی‌های انعطاف‌پذیر: TEXT در SQLite و JSONB در PostgreSQL با پیش‌فرض '{}')
   - is_deleted (BOOLEAN اجباری با پیش‌فرض FALSE برای حذف نرم)
   - exclusion_reason (متن اختیاری، با قید CHECK که اگر is_deleted برابر TRUE شد، این فیلد نباید خالی باشد)
   - created_at و updated_at (زمان استاندارد ISO)
3. پس از کد SQL، هر ستون و هر قید (Constraint) را در یک خط خیلی ساده و به فارسی توضیح بده تا من به‌عنوان تصمیم‌گیرنده بتوانم آن را ممیزی کنم.
4. در پایان، یک کوئری آماده برای استخراج داده‌های تمیز (WHERE is_deleted = FALSE) بنویس.`
  },
  prompt2CrudApp: {
    id: 's5_db_prompt_2',
    titleFa: 'پرامپت آماده ۲: ساخت مینی‌اپ کامل مدیریت دائمی داده (CRUD + Soft Delete)',
    subtitleFa: 'قابل اجرا با FastAPI + SQLite + HTML (مسیر آفلاین) یا HTML + Supabase (مسیر تیمی)',
    text: `نقش تو یک مهندس نرم‌افزار Full-Stack است. می‌خواهم یک وب‌اپلیکیشن سبک، فارسی و راست‌به‌چپ (RTL) برای مدیریت دائمی جدول «technical_reports» بسازی.

[انتخاب مسیر: یکی از دو خط زیر را نگه دار]
- مسیر آفلاین سریع: بک‌اند با Python (FastAPI) + SQLite + یک صفحه HTML/Tailwind تمیز.
- مسیر آنلاین و تیمی: تک‌صفحه HTML/Tailwind متصل به جدول technical_reports در Supabase (PostgreSQL).

قرارداد دقیق ستون‌های جدول technical_reports:
id، title، report_date (ذخیره ISO و نمایش شمسی در UI)، category ('تجهیزات'|'ایمنی'|'کیفیت'|'پشتیبانی'|'سایر')، description، status ('باز'|'در حال پیگیری'|'بسته‌شده')، extra_metadata (JSON)، is_deleted (پیش‌فرض FALSE)، exclusion_reason، created_at، updated_at.

۵ قابلیت اجباری اپلیکیشن:
1. ثبت رکورد جدید (Create): فرم فارسی با پیش‌نمایش تاریخ شمسی کنار فیلد تاریخ، ورودی ساده کلید-مقدار برای extra_metadata، و جلوگیری از ثبت فرم در صورت خالی بودن title یا description با نمایش پیام خطای واضح.
2. مشاهده و فیلتر (Read): جدول با ستون اول id، فیلتر بر اساس category و status، و یک دکمه سوئیچ برای نمایش یا مخفی کردن رکوردهای حذف‌شده (Excluded).
3. ویرایش رکورد (Update): امکان تغییر عنوان، شرح یا وضعیت و به‌روزرسانی خودکار updated_at به‌طوری که بعد از رفرش صفحه تغییر ماندگار باشد.
4. حذف نرم اجباری (Soft Delete): دکمه حذف هرگز سطر را فیزیکی پاک نکند؛ بلکه پنجره‌ای باز کند که کاربر مجبور باشد دلیل کنارگذاری (exclusion_reason) را بنویسد، سپس is_deleted را TRUE کند (با دکمه بازگردانی).
5. جعبه شفافیت (Transparency Box): نمایش زنده کوئری SQL فعال (WHERE is_deleted = FALSE ...) در کنار پیش‌نمایش زنده و دکمه دانلود فایل JSON تمیز که فقط رکوردهای حذف‌نشده را خروجی می‌دهد.

در پایان، دستور دقیق اجرای محلی و چک‌لیست تست ۴ مرحله‌ای را هم بنویس.`
  }
};

export const GLOSSARY_CATEGORIES: Array<{
  id: 'all' | GlossaryCategoryId;
  labelFa: string;
  expectedCount: number;
}> = [
  { id: 'all', labelFa: 'همه واژه‌ها', expectedCount: 25 },
  { id: 'core_db', labelFa: 'مفاهیم پایه دیتابیس و جدول', expectedCount: 12 },
  { id: 'architecture', labelFa: 'معماری و انواع دیتابیس', expectedCount: 7 },
  { id: 'cpmai_governance', labelFa: 'حاکمیت CPMAI و امنیت', expectedCount: 6 }
];

// Strictly 25 terms: 12 core_db + 7 architecture + 6 cpmai_governance
export const GLOSSARY_TERMS: GlossaryTermItem[] = [
  // --- Part 1: 12 Core DB & Table Terms ---
  {
    id: 'g_database',
    order: 1,
    category: 'core_db',
    termEn: 'Database',
    termFa: 'پایگاه داده',
    simpleDefinitionFa:
      'انبار دیجیتال منظم، سریع و مطمئن برای نگهداری دائمی اطلاعات و پاسخ دقیق به پرسش‌ها در کسری از ثانیه.',
    everydayAnalogyFa:
      'بایگانی هوشمند یک کتابخانه بزرگ که کتابدارش با کد قفسه در یک ثانیه دقیقاً همان پرونده را می‌آورد — نه انبوه کاغذ روی میز.'
  },
  {
    id: 'g_schema',
    order: 2,
    category: 'core_db',
    termEn: 'Schema',
    termFa: 'اسکیما / نقشه ساختار',
    simpleDefinitionFa:
      'نقشه رسمی جدول که نام ستون‌ها، نوع داده هر ستون و قوانین مجاز ورود اطلاعات را پیش از ذخیره تعریف می‌کند.',
    everydayAnalogyFa:
      'نقشه معماری ساختمان پیش از آجرچینی؛ مشخص می‌کند هر اتاق کجاست و هر دیوار چه باری تحمل می‌کند.'
  },
  {
    id: 'g_ddl',
    order: 3,
    category: 'core_db',
    termEn: 'DDL / CREATE TABLE',
    termFa: 'دستور تعریف ساختار جدول',
    simpleDefinitionFa:
      'دستورهای زبان SQL (مثل CREATE TABLE) که خودِ چارچوب و قفسه‌های خالی جدول را در دیتابیس می‌سازند.',
    everydayAnalogyFa:
      'نجاری که کمد و کشوهای بایگانی را با برچسب‌های ثابت می‌سازد تا بعداً پرونده‌ها داخلش چیده شوند.'
  },
  {
    id: 'g_table',
    order: 4,
    category: 'core_db',
    termEn: 'Table',
    termFa: 'جدول',
    simpleDefinitionFa:
      'مجموعه‌ای منظم از سطرها و ستون‌ها که داده‌های مربوط به یک موجودیت مشخص (مثل گزارش‌های فنی) را نگه می‌دارد.',
    everydayAnalogyFa:
      'یک دفتر کل یا یک برگه مجزای اکسل که فقط مخصوص یک موضوع واحد است.'
  },
  {
    id: 'g_column',
    order: 5,
    category: 'core_db',
    termEn: 'Column / Attribute',
    termFa: 'ستون / ویژگی',
    simpleDefinitionFa:
      'هر صفت یا فیلد مشخصی که برای تمام رکوردهای یک جدول ثبت می‌شود (مثل عنوان، تاریخ یا وضعیت).',
    everydayAnalogyFa:
      'تیترهای بالای هر ستون در فرم ثبت‌نام (نام، تاریخ، وضعیت) که برای همه یکسان است.'
  },
  {
    id: 'g_row',
    order: 6,
    category: 'core_db',
    termEn: 'Row / Record',
    termFa: 'سطر / رکورد',
    simpleDefinitionFa:
      'یک نمونه کامل و مستقل از داده‌ها در جدول که تمام مقادیر ستون‌ها را برای یک رویداد مشخص نگه می‌دارد.',
    everydayAnalogyFa:
      'یک برگه فرم پُرشده کامل متعلق به یک سفارش یا یک گزارش روزانه کارگاهی.'
  },
  {
    id: 'g_primary_key',
    order: 7,
    category: 'core_db',
    termEn: 'Primary Key (id)',
    termFa: 'کلید اصلی',
    simpleDefinitionFa:
      'ستون یکتا و غیرتکراری (همیشه اولین ستون جدول) که هر سطر را بدون ابهام شناسایی می‌کند.',
    everydayAnalogyFa:
      'شماره پلاک خودرو یا کد ملی؛ حتی اگر دو گزارش عنوان مشابه داشته باشند، id آن‌ها هرگز یکی نیست.'
  },
  {
    id: 'g_constraints',
    order: 8,
    category: 'core_db',
    termEn: 'Constraints (NOT NULL / CHECK)',
    termFa: 'قیدهای کنترلی داده',
    simpleDefinitionFa:
      'قوانین نگهبان دیتابیس که جلوی ذخیره داده‌های خالی، نامعتبر یا خارج از فهرست مجاز را می‌گیرند.',
    everydayAnalogyFa:
      'بازرس ورودی کارگاه که اجازه نمی‌دهد فرم بدون عنوان یا با وضعیت نامعلوم وارد بایگانی شود.'
  },
  {
    id: 'g_query_sql',
    order: 9,
    category: 'core_db',
    termEn: 'Query & SQL',
    termFa: 'کوئری و زبان SQL',
    simpleDefinitionFa:
      'زبان استاندارد پرس‌وجو از پایگاه‌های داده رابطه‌ای برای خواندن، فیلتر کردن، مرتب‌سازی و گزارش‌گیری دقیق.',
    everydayAnalogyFa:
      'فرم درخواست شفاهی استاندارد به بایگان: «فقط پرونده‌های بازِ ماه اسفند که حذف نشده‌اند را به ترتیب تاریخ بیاور.»'
  },
  {
    id: 'g_crud',
    order: 10,
    category: 'core_db',
    termEn: 'CRUD',
    termFa: 'عملیات چهارگانه دائمی',
    simpleDefinitionFa:
      'چهار عملیات بنیادین هر نرم‌افزار داده‌محور: ایجاد (Create)، خواندن (Read)، ویرایش (Update) و حذف (Delete).',
    everydayAnalogyFa:
      'چهار کار اصلی با یک دفتر حسابداری: ثبت ردیف جدید، خواندن دفتر، اصلاح یک رقم و خط زدن با توضیح.'
  },
  {
    id: 'g_acid',
    order: 11,
    category: 'core_db',
    termEn: 'Transaction & Atomicity (ACID)',
    termFa: 'تراکنش و قانون همه‌یاهیچ',
    simpleDefinitionFa:
      'مکانیزم تضمین‌کننده که مجموعه‌ای از تغییرات وابسته (مثل کسر از کیف پول + ثبت سفارش) یا به‌طور کامل انجام می‌شوند یا هیچ‌کدام.',
    everydayAnalogyFa:
      'کارت‌به‌کارت بانکی؛ اگر وسط انتقال ارتباط قطع شود، پول نه از حساب شما کم می‌شود و نه در هوا گم می‌شود.'
  },
  {
    id: 'g_join',
    order: 12,
    category: 'core_db',
    termEn: 'Join',
    termFa: 'پیوند جداول',
    simpleDefinitionFa:
      'عملیاتی در SQL که دو یا چند جدول مرتبط را از طریق کلیدهای مشترک کنار هم می‌گذارد تا گزارش یکپارچه بسازد.',
    everydayAnalogyFa:
      'کنار هم گذاشتن «لیست تجهیزات» و «لیست گزارش خرابی‌ها» با شماره پلاک تجهیز تا مشخصات کامل هر دستگاه دیده شود.'
  },

  // --- Part 2: 7 Architecture & DB-Type Terms ---
  {
    id: 'g_jsonb',
    order: 13,
    category: 'architecture',
    termEn: 'JSON / JSONB',
    termFa: 'داده نیمه‌ساخت‌یافته منعطف',
    simpleDefinitionFa:
      'قالب استاندارد کلید-مقدار برای ذخیره ویژگی‌های متغیر و غیرثابت؛ JSONB نسخه دودویی، فشرده و سریع آن در PostgreSQL است.',
    everydayAnalogyFa:
      'یک پاکت ضمیمه کنار پرونده رسمی که هر بار می‌توانید یادداشت‌ها یا برچسب‌های متفاوتی بدون تغییر فرم اصلی در آن بگذارید.'
  },
  {
    id: 'g_caching_ram',
    order: 14,
    category: 'architecture',
    termEn: 'Caching & RAM',
    termFa: 'کش و حافظه سریع موقت',
    simpleDefinitionFa:
      'نگهداری موقت پاسخ‌های پرتکرار یا کدهای OTP در حافظه فوق‌سریع RAM (مانند Redis) برای جلوگیری از فشار روی دیسک.',
    everydayAnalogyFa:
      'گذاشتن فایل‌های پرکاربرد امروز روی میز کار به جای رفتن مداوم تا انبار زیرزمین.'
  },
  {
    id: 'g_inverted_index',
    order: 15,
    category: 'architecture',
    termEn: 'Inverted Index',
    termFa: 'فهرست معکوس جستجو',
    simpleDefinitionFa:
      'ساختار داخلی موتورهای جستجو (مانند Elasticsearch) که به ازای هر کلمه فهرست می‌کند در کدام اسناد ظاهر شده است.',
    everydayAnalogyFa:
      'نمایه الفبایی آخر یک کتاب مرجع که بدون ورق زدن کل کتاب، دقیقاً شماره صفحه هر کلیدواژه را می‌دهد.'
  },
  {
    id: 'g_node_edge',
    order: 16,
    category: 'architecture',
    termEn: 'Node & Edge',
    termFa: 'گره و یال در گراف',
    simpleDefinitionFa:
      'دو بلوک سازنده دیتابیس‌های گراف (مانند Neo4j): گره‌ها موجودیت‌ها هستند و یال‌ها نوع ارتباط میان آن‌ها را نشان می‌دهند.',
    everydayAnalogyFa:
      'ایستگاه‌های نقشه مترو (گره‌ها) و خطوط ریلی که ایستگاه‌ها را به هم وصل می‌کنند (یال‌ها).'
  },
  {
    id: 'g_embedding',
    order: 17,
    category: 'architecture',
    termEn: 'Embedding / Vector',
    termFa: 'بردار معنایی',
    simpleDefinitionFa:
      'تبدیل متن، جمله یا سند به یک آرایه عددی توسط مدل‌های هوش مصنوعی به‌طوری که مفاهیم هم‌معنی فاصله عددی کمی داشته باشند.',
    everydayAnalogyFa:
      'مختصات جغرافیایی روی نقشه معنا؛ دو کتاب با موضوع مشابه (حتی با کلمات متفاوت) دقیقاً در یک محله روی نقشه قرار می‌گیرند.'
  },
  {
    id: 'g_rag',
    order: 18,
    category: 'architecture',
    termEn: 'RAG (Retrieval-Augmented Generation)',
    termFa: 'تولید تقویت‌شده با بازیابی',
    simpleDefinitionFa:
      'معماری هوش مصنوعی که ابتدا بخش‌های مرتبط از اسناد را از دیتابیس برداری پیدا می‌کند و سپس آن‌ها را برای پاسخ دقیق به LLM می‌دهد.',
    everydayAnalogyFa:
      'آزمون کتاب‌باز؛ به‌جای حدس زدن از حافظه، کارشناس ابتدا دقیقاً همان صفحه آیین‌نامه را باز می‌کند و پاسخ مستند می‌دهد.'
  },
  {
    id: 'g_polyglot',
    order: 19,
    category: 'architecture',
    termEn: 'Polyglot Persistence',
    termFa: 'چنددیتابیسی هم‌زمان',
    simpleDefinitionFa:
      'استفاده هم‌زمان از چند موتور پایگاه داده متفاوت در یک سیستم بزرگ؛ برای استارتاپ‌ها و پروژه‌های اولیه معمولاً یک تله پیچیدگی است.',
    everydayAnalogyFa:
      'خرید هم‌زمان کامیون، جرثقیل و لیفتراک برای یک کارگاه کوچک، در حالی که یک وانت همه‌کاره کل کار سال اول را انجام می‌دهد.'
  },

  // --- Part 3: 6 PMI-CPMAI Governance & Security Terms ---
  {
    id: 'g_data_selection',
    order: 20,
    category: 'cpmai_governance',
    termEn: 'Data Selection',
    termFa: 'گزینش داده (فاز ۳ CPMAI)',
    simpleDefinitionFa:
      'انتخاب آگاهانه ستون‌ها (Attributes) و سطرهای (Records) مفید بر اساس تناسب با هدف، کیفیت داده و محدودیت‌های فنی.',
    everydayAnalogyFa:
      'سورتینگ و دست‌چین کردن مواد اولیه پیش از ورود به خط تولید تا قطعه معیوب محصول نهایی را خراب نکند.'
  },
  {
    id: 'g_rationale',
    order: 21,
    category: 'cpmai_governance',
    termEn: 'Inclusion / Exclusion Rationale',
    termFa: 'توجیه شمول یا حذف داده',
    simpleDefinitionFa:
      'ثبت مکتوب و منطقی دلیل اینکه چرا هر ستون یا گروهی از رکوردها در دیتابیس نگه داشته شده یا کنار گذاشته شده است.',
    everydayAnalogyFa:
      'صورت‌جلسه رسمی کارشناسی که توضیح می‌دهد چرا یک بند یا نمونه از محاسبات پروژه کنار گذاشته شده است.'
  },
  {
    id: 'g_transparency',
    order: 22,
    category: 'cpmai_governance',
    termEn: 'Data Selection Transparency',
    termFa: 'شفافیت گزینش داده',
    simpleDefinitionFa:
      'قابلیت مشاهده، بازتولید و ممیزی دقیق کوئری‌ها و فیلترهایی که مجموعه داده نهایی هوش مصنوعی را ساخته‌اند.',
    everydayAnalogyFa:
      'آشپزخانه با دیوار شیشه‌ای که مشتری و بازرس دقیقاً می‌بینند چه موادی با چه فیلتری در غذا استفاده شده است.'
  },
  {
    id: 'g_pii',
    order: 23,
    category: 'cpmai_governance',
    termEn: 'PII & Anonymization',
    termFa: 'اطلاعات هویتی حساس و ناشناس‌سازی',
    simpleDefinitionFa:
      'داده‌هایی مثل نام کامل، کدملی و شماره موبایل که هویت فرد را آشکار می‌کنند و باید پیش از ذخیره یا تحلیل حذف یا بی‌نام شوند.',
    everydayAnalogyFa:
      'پاک کردن نام و شماره تماس بیمار از روی برگه آزمایش پیش از ارسال آن به تیم تحقیقاتی.'
  },
  {
    id: 'g_soft_delete',
    order: 24,
    category: 'cpmai_governance',
    termEn: 'Soft Delete vs. Hard Delete',
    termFa: 'حذف نرم در برابر حذف سخت',
    simpleDefinitionFa:
      'در حذف سخت سطر برای همیشه پاک می‌شود؛ در حذف نرم سطر باقی می‌ماند ولی is_deleted برابر TRUE و دلیل آن در exclusion_reason ثبت می‌شود.',
    everydayAnalogyFa:
      'گذاشتن مُهر «ابطال شد به دلیل اشتباه تایپی» روی سند و بایگانی آن، به جای پاره کردن و انداختن در کاغذخردکن.'
  },
  {
    id: 'g_artifact',
    order: 25,
    category: 'cpmai_governance',
    termEn: 'Artifact',
    termFa: 'خروجی مستند و قابل تحویل',
    simpleDefinitionFa:
      'هر فایل ملموس و نسخه‌بندی‌شده (مثل schema.sql یا گزارش Markdown جلسه ۵ در گیت‌هاب) که سند رسمی انجام یک فاز مهندسی است.',
    everydayAnalogyFa:
      'نقشه ازبیلت (As-Built) یا صورت‌وضعیت امضاشده که تحویل کارفرما داده می‌شود و در آرشیو می‌ماند.'
  }
];

export const TRACK_DATABASE_ADAPTATIONS: Record<IndustryTrackId, TrackDatabaseAdaptation> = {
  CIVIL_INFRA: {
    trackId: 'CIVIL_INFRA',
    trackLabelFa: 'راه، شهرسازی و ابنیه کلان',
    projectTitleFa: 'سامانه ثبت و پایش گزارش‌های روزانه کارگاهی و ژئوتکنیک',
    tableContextFa:
      'در پروژه‌های مترو و تونل‌سازی، همین جدول technical_reports گزارش‌های روزانه توقف TBM، نشست معابر و بازرسی سگمنت‌ها را بدون پراکندگی اکسل یکپارچه می‌کند.',
    sampleTitleFa: 'افت فشار جک‌های سپر TBM در رینگ ۴۱۲',
    sampleCategoryFa: 'تجهیزات',
    sampleDescriptionFa: 'در حین حفاری شیفت شب افت فشار هیدرولیک جک شماره ۴ مشاهده شد و بررسی شیر کنترل در دستور کار قرار گرفت.',
    sampleMetadataPairs: [
      { key: 'ring_number', value: '412' },
      { key: 'station_km', value: '12+450' }
    ],
    piiExampleFa: 'نام اپراتور شیفت و شماره تماس پیمانکار جزء از جدول تحلیلی حذف و صرفاً کد شیفت ثبت می‌شود.',
    postgresBenefitFa:
      'با PostgreSQL + TimescaleDB می‌توانید هم گزارش‌های روزانه کارگاهی و هم داده‌های سنسور نشست زمین را در یک پایگاه داده نگه دارید.'
  },
  ENERGY_PETRO: {
    trackId: 'ENERGY_PETRO',
    trackLabelFa: 'نفت، گاز و پتروشیمی',
    projectTitleFa: 'سامانه مدیریت گزارش‌های روزانه تعمیرات، بازرسی و HSE واحدهای فرآیندی',
    tableContextFa:
      'در پالایشگاه و پتروشیمی، همین ساختار technical_reports گزارش‌های بازرسی جوش (API 1104)، پایش ارتعاش پمپ‌ها و رخدادهای شبهه‌حادثه HSE را با قابلیت ممیزی کامل ثبت می‌کند.',
    sampleTitleFa: 'افزایش دمای یاتاقان کمپرسور گازی K-102',
    sampleCategoryFa: 'ایمنی',
    sampleDescriptionFa: 'دمای یاتاقان خروجی از آستانه هشدار عبور کرد؛ بررسی سیستم روغن‌کاری و مجوز کار گرم ثبت شد.',
    sampleMetadataPairs: [
      { key: 'tag_no', value: 'K-102B' },
      { key: 'unit', value: 'Olefin-1' }
    ],
    piiExampleFa: 'نام و شماره پرسنلی بازرس یا اپراتور شیفت به‌عنوان PII کنار گذاشته می‌شود تا گزارش‌های ایمنی محرمانه و قابل تحلیل بمانند.',
    postgresBenefitFa:
      'PostgreSQL به همراه JSONB (برای مشخصات متغیر هر Tag تجهیز) و pgvector (برای جستجو روی استانداردهای ASME/API) انتخاب استاندارد EPC است.'
  },
  PAYA_SAMAN_PARS: {
    trackId: 'PAYA_SAMAN_PARS',
    trackLabelFa: 'هلدینگ پایا سامان پارس',
    projectTitleFa: 'سامانه یکپارچه گزارش‌های روزانه گلوگاه‌های ۶۳ پروژه دو بال اجرایی',
    tableContextFa:
      'در ستاد هلدینگ پایا سامان پارس، این اسکیما گزارش‌های میدانی شرکت‌های تابعه (از آزادراه و سد تا شهر صنعتی کاوه) را با فرمت واحد، شفافیت حذف نرم و خروجی تمیز برای داشبورد مدیران تجمیع می‌کند.',
    sampleTitleFa: 'تأخیر تأمین میلگرد جبهه پل کیلومتر ۱۸',
    sampleCategoryFa: 'پشتیبانی',
    sampleDescriptionFa: 'به‌دلیل تأخیر بارگیری محموله، عملیات آرماتوربندی پایه میانی ۴۸ ساعت به تعویق افتاد و پیگیری تدارکات ثبت شد.',
    sampleMetadataPairs: [
      { key: 'subsidiary', value: 'ملی ساختمان' },
      { key: 'contract_type', value: 'EPC+F' }
    ],
    piiExampleFa: 'شماره موبایل سرپرستان کارگاه و نام رانندگان از جدول مرکزی ستاد حذف شده و صرفاً کد پروژه و شرکت تابعه ثبت می‌شود.',
    postgresBenefitFa:
      'یک PostgreSQL مرکزی با ستون JSONB می‌تواند ویژگی‌های متفاوت پروژه‌های راه، مسکن و انرژی خورشیدی کاوه را بدون ساخت جداول پراکنده پوشش دهد.'
  },
  GENERAL_EVERYDAY: {
    trackId: 'GENERAL_EVERYDAY',
    trackLabelFa: 'روزمره، کسب‌وکار خرد و سبک زندگی',
    projectTitleFa: 'سامانه ثبت و پیگیری هوشمند درخواست‌ها و خطاهای کسب‌وکار کوچک',
    tableContextFa:
      'برای یک فروشگاه آنلاین کوچک یا کسب‌وکار خدماتی، همین جدول technical_reports تیکت‌های پشتیبانی، خرابی اقلام و پیگیری مشتریان را به‌جای دفترچه و اکسل‌های پراکنده سازمان‌دهی می‌کند.',
    sampleTitleFa: 'خطای درگاه پرداخت در سبد خرید موبایل',
    sampleCategoryFa: 'پشتیبانی',
    sampleDescriptionFa: 'برخی مشتریان پس از بازگشت از درگاه بانکی با صفحه سفید مواجه شدند و بررسی لاگ پرداخت آغاز شد.',
    sampleMetadataPairs: [
      { key: 'channel', value: 'Mobile Web' },
      { key: 'priority', value: 'فوری' }
    ],
    piiExampleFa: 'شماره تماس و نام کامل مشتری از جدول تحلیل خطاهای فنی جدا می‌شود تا هنگام ارسال داده به هوش مصنوعی، حریم خصوصی حفظ شود.',
    postgresBenefitFa:
      'شروع رایگان با SQLite روی سیستم شخصی یا لایه رایگان Supabase (PostgreSQL) کل نیاز یک فروشگاه کوچک را بدون هزینه زیرساخت پوشش می‌دهد.'
  }
};
