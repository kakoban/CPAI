# سند طراحی: مسیر چهارم مستقل «هلدینگ پایا سامان پارس» (رویکرد ۳)

**تاریخ:** ۲۰۲۶-۱۱-۱۱  
**وضعیت:** تاییدشده (Approved)  
**مسیر هدف:** `PAYA_SAMAN_PARS` (مستقل کنار `CIVIL_INFRA`، `ENERGY_PETRO`، `GENERAL_EVERYDAY`)

---

## ۱. هدف و زمینه (Intent & Why)
اعضای سازمان **هلدینگ پایا سامان پارس** (تأسیس ۱۳۸۶، زیرمجموعه بنیاد مستضعفان، بیش از ۵۰۰۰ نیرو و ناوگان ماشین‌آلات سنگین) دوره آموزشی CPMAI و ابزارهای هوش مصنوعی خود را از **فردا** شروع می‌کنند.

هدف: افزودن یک مسیر چهارم مستقل و کاملاً بومی‌سازی‌شده بر بستر ساختار واقعی هلدینگ (۲ بال اجرایی، ۸ حوزه تخصصی، ۶۳ پروژه ثبت‌شده و ۱۴ شرکت تابعه) و مدل‌های قراردادی (`EPC`، `EPC+F`، `PC`، `BOT`، `BLT`، کنسرسیوم) به‌طوری که تمام تجربه کاربری از آزمون ورودی تا کارگاه‌های فاز صفر، شبیه‌ساز، NotebookLM و فاز ۱ CPMAI با پروژه‌ها و ادبیات خود سازمان کار کند.

---

## ۲. اهداف، عدم‌اهداف و ضداهداف (Goals, Non-Goals, Anti-Goals)

### اهداف (Goals)
1. **استقلال کامل مسیر چهارم (`PAYA_SAMAN_PARS`):** افزودن مسیر بدون هیچ تغییری در رفتار، محتوا یا داده‌های ۳ مسیر فعلی.
2. **هویت و مرزبندی دقیق:**
   - عنوان کوتاه (سوئیچر و سایدبار): `پایا سامان پارس`
   - عنوان کامل (مودال ۴ کارته و هدر صفحات): `هلدینگ پایا سامان پارس (پیمانکاری زیرساخت، مسکن و شهرک صنعتی)`
   - تم بصری متمایز: طیف بنفش/نیلی (`from-violet-600 via-purple-600 to-indigo-700`, `text-violet-600 dark:text-violet-400`, `border-violet-500/40`, `glowColor: 'rgba(139, 92, 246, 0.35)'`) برای تمایز کامل از آبی عمران، کهربایی نفت و زمردی روزمره.
3. **پوشش کامل ۸ دیسیپلین (`PayaDisciplineId`) در ۳ گروه ساختاری هلدینگ (ستاد + ۲ بال اجرایی و ۱۴ شرکت تابعه):**
   برای نمایش در `DisciplineSelectorModal.tsx` (ستون اول با گروه‌بندی سه‌گانه در حالت `PAYA_SAMAN_PARS`) و `AdminControlCenterModal.tsx`:
   - **گروه الف: ستاد هلدینگ، قراردادها و کنترل پورتفو**
     1. `paya_portfolio_pmo` — **کنترل پورتفوی ۶۳ پروژه، PMO، مناقصات و دفتر فنی هلدینگ:** تجمیع پیشرفت ۶۳ پروژه در ۸ حوزه، مناقصات، برآورد و گزارش‌دهی هیئت‌مدیره هلدینگ.
     2. `paya_contracts_epcf_bot` — **امور قراردادها، کنسرسیوم و مدل‌های مالی (EPC / EPC+F / PC / BOT / BLT):** ساختاردهی کنسرسیوم‌های بین‌شرکتی، فاینانس، شرایط عمومی پیمان و بازگشت سرمایه پروژه‌های مشارکتی.
     3. `paya_hr_fleet_support` — **سرمایه انسانی (۵۰۰۰ نیرو)، پشتیبانی بین‌شرکتی و ناوگان ماشین‌آلات سنگین:** مدیریت نیروی انسانی ۱۴ شرکت تابعه، تجهیز کارگاه و بهره‌وری ناوگان ماشین‌آلات سنگین هلدینگ.
   - **گروه ب: بال پیمانکاری عمرانی و زیربنایی** *(ملی ساختمان، جنرال مکانیک، دی، رامان، تابیران، بن‌آب، احداث و راه‌اندازی پایانه سلام)*
     4. `paya_roads_rail_airports` — **راه، پل، تونل، حمل‌ونقل ریلی، مترو و فرودگاه (داخلی و امارات):** آزادراه تهران–شمال، قلاجه، قائمشهر–پل سفید، پل‌های شهدای اروند/۹ دی/فردیس، تقاطع‌های تهران، گچاب-۱/دهنو-۱، پروژه‌های امارات (SKF2 شیص–خورفکان، R1000C، وادی‌الحلو، R199، جبل‌الکتاب)، راه‌آهن میانه–اردبیل، کرج–قزوین، دوخطه‌سازی شمسی–میبد–ارژنگ/بیسیم–گلدانه/گرمسار، مترو تبریز/تهران/اصفهان، فرودگاه امام(فاز ۱ و سلام)، کیش، آبادان، اردبیل.
     5. `paya_dams_marine_industrial` — **سد، تأسیسات آبی، سازه‌های دریایی و ابنیه صنعتی:** سدهای شهری‌کور، مخملکوه، هشتجین، عمارت، سرنی، قصر شیرین ۱ و ۲، میمه، سد باطله فولاد شرق کاوه، تونل فاضلاب غرب تهران، بم–بروات/جیرفت، بندرانزلی، نگین بوشهر، موج‌شکن کلبا؛ سایت فولاد کاوه جنوب کیش، سیمان هگمتان، گندله‌سازی، احیای مستقیم.
     6. `paya_mep_tabiran_energy` — **تأسیسات الکتریکال و مکانیکال، نیروگاه خورشیدی و پلاسمای سرد (تابیران):** تهویه/دفع دود مترو شیراز و اصفهان، پست ۶۳kV یزدمهر، تأسیسات باب‌الجواد مشهد، نیروگاه خورشیدی ۵ مگاواتی و تصفیه‌خانه پساب با فناوری پلاسمای سرد کاوه (شهریور ۱۴۰۵).
   - **گروه ج: بال سرمایه‌گذاری مسکن و شهرک‌سازی صنعتی** *(آتی‌ساز، شرکت خانه، عمران و مسکن ایران/شمال/اصفهان، شهر صنعتی کاوه، معین کوثر)*
     7. `paya_housing_urban` — **انبوه‌سازی، برج‌سازی، شهرک‌سازی و بازآفرینی شهری:** شهرک دریاکنار (۱۴۳۳+ ویلا)، شهرک‌های اقماری شاهین‌شهر/بهارستان/ملک‌شهر، مجتمع‌های مسکونی/تجاری/اداری، شهرک‌های توریستی و بازآفرینی بافت فرسوده.
     8. `paya_kaveh_industrial_city` — **مدیریت و بهره‌برداری شهر صنعتی و منطقه ویژه اقتصادی کاوه (۳۰۰۰ هکتار ساوه):** زیرساخت صنعتی، انرژی تجدیدپذیر، تصفیه پساب، واگذاری زمین و خدمات بهره‌برداران صنعتی.
   - **افزودن فیلد اختیاری `groupFa` / `groupEn` به `DisciplineMetadata`** برای گروه‌بندی تمیز در مودال دیسیپلین‌ها هنگام فعال بودن `PAYA_SAMAN_PARS`.
   - **رده‌های سازمانی اختصاصی پایا (۴ سطح در `DisciplineSelectorModal.tsx` و `ContextualAiTutorSidebar.tsx`):**
     - `director`: مدیرعامل / معاونت هلدینگ یا مدیرعامل شرکت تابعه
     - `lead_superintendent`: مدیر طرح، کنسرسیوم یا سرپرست بهره‌برداری شهر صنعتی / مسکن
     - `technical_engineer`: کارشناس ارشد دفتر فنی، مناقصات، کنترل پروژه و امور پیمان
     - `site_operator`: رئیس کارگاه، ناظر اجرا، مهندس MEP و سرپرست ناوگان
   - **تخصص‌های پیش‌فرض ثبت‌نام (`OnboardingModal.tsx`):** در مسیر اختصاصی `/paya` یا `?track=PAYA_SAMAN_PARS`، گزینه‌های تخصصی متناسب با هلدینگ پایا در `SPECIALTY_PRESETS` (یا در بالای لیست) در دسترس باشند.
4. **شبیه‌ساز اختصاصی Claude Artifact (`PayaHoldingArtifactSimulator`):** کامپوننت تعاملی جدید برای «داشبورد فرماندهی پورتفوی ۶۳ پروژه‌ای و پایش دو بال هلدینگ پایا سامان پارس» با ۳ زیرتب (`پیش‌نمایش آرتیفکت زنده`، `پرامپت کلود (RCTO)`، `داده JSON پورتفو`)، کارت‌های KPI پورتفوی دو بال، وضعیت پروژه‌های شاخص داخلی/امارات و چت تحلیلی آفلاین.
5. **بازنویسی مسیرمحور اسلایدهای جلسه ۱ و ۵ (`session1_and_5_curriculum.ts`):** افزودن کلیدهای/اسلایدهای اختصاصی پایا سامان پارس برای دمو (`s1_demo`)، گوگل درایو (`s1_drive`)، مارک‌دان (`s1_markdown`)، گیت‌هاب (`s1_github`)، ارکستراسیون و Vibe Coding (`s5_capstone`) به همراه فایل‌های دانلودی نمونه `PAYA_README_MD` و `PAYA_CLEAN_CSV_CONTENT`.
6. **بازنویسی مسیرمحور کارگاه NotebookLM:** اختصاصی‌سازی ماتریس دپارتمان‌ها (۷ دپارتمان متناسب با هلدینگ و شرکت‌های تابعه)، پرزنتیشن/اینفوگرافیک (`blueprints`)، تمرین‌های کلاسی (`exercises`) و اسناد قابل دانلود `.md` (`notebooklm_sample_documents.ts`) هنگام فعال بودن مسیر `PAYA_SAMAN_PARS`.
7. **دیتاست‌های چندگانه و قراردادهای اختصاصی در کارگاه‌های فاز صفر (ایزوله بر اساس مسیر):**
   - با توجه به نیاز به «دیتاست اختصاصی در چند نوع» و ایزوله‌سازی مسیر اختصاصی، در `src/data/engineering_sample_datasets.ts` فیلد `trackIds?: IndustryTrackId[]` اضافه شده و هنگام فعال بودن `PAYA_SAMAN_PARS` فقط **۳ دیتاست اختصاصی** زیر نمایش داده می‌شوند (دیتاست‌های ۳ مسیر قبلی بدون تغییر باقی می‌مانند):
     1. `paya_infra_epc`: **بال پیمانکاری زیرساختی (راه، پل، تونل، سد، ریل و فرودگاه + پروژه‌های امارات)** — شاخص‌های EVM، مدل قراردادی (EPC/EPC+F/PC) و شرکت مجری (ملی ساختمان، جنرال مکانیک، دی، رامان) با برچسب مقادیر شبیه‌سازی‌شده آموزشی.
     2. `paya_kaveh_housing`: **بال سرمایه‌گذاری مسکن، ابنیه و شهر صنعتی کاوه** — شهرک‌سازی (آتی‌ساز، خانه، عمران مسکن)، نیروگاه خورشیدی ۵ مگاواتی و تصفیه‌خانه پساب پلاسمای سرد کاوه (۱۴۰۵)، مدل BOT/BLT.
     3. `paya_holding_portfolio`: **داشبورد کلان پورتفوی ۶۳ پروژه، ۵۰۰۰ نیرو و ناوگان ماشین‌آلات ۱۴ شرکت تابعه** — تجمیع وضعیت ۸ حوزه تخصصی، توزیع منابع انسانی/ماشین‌آلات و گلوگاه‌های کنسرسیوم.
   - در `src/data/engineering_sample_contracts.ts` هنگام فعال بودن `PAYA_SAMAN_PARS` **۲ قرارداد اختصاصی** نمایش داده می‌شوند:
     1. `paya_epcf_consortium_contract`: قرارداد کنسرسیومی **EPC+F** پروژه زیرساختی راه، تونل و خطوط ریلی (بال پیمانکاری).
     2. `paya_bot_kaveh_contract`: قرارداد سرمایه‌گذاری و بهره‌برداری **BOT / BLT** نیروگاه خورشیدی ۵ مگاواتی، تصفیه‌خانه پلاسمای سرد شهر صنعتی کاوه و مشارکت ساخت مسکن (بال سرمایه‌گذاری).
8. **انطباق کامل سایر بخش‌های پلتفرم:**
   - مثال‌های ۶ فاز CPMAI در `src/data/domainTrackExamples.ts`
   - ۸ کیس‌استادی و پرامپت‌های RCTO در `src/data/disciplineExamplesRegistry.ts`
   - صفحات ۰ تا ۵ (`Page0LlmFundamentals` و `Page1`..`Page5`)، آزمون سطح‌سنجی (`placement_quiz_data.ts` + `InteractivePlacementQuiz.tsx`)، سایدبار (`WorkspaceSidebar.tsx`)، پنل ادمین (`AdminControlCenterModal.tsx`) و مربی هوشمند (`ContextualAiTutorSidebar.tsx`).

### عدم‌اهداف (Non-Goals)
- تغییر اسکیمای دیتابیس PostgreSQL/Prisma یا افزودن endpoint جدید بک‌اند (مدیریت مسیر در فرانت‌اند/LocalStorage است و `api/index.ts` همین الان `industryTrack` و `disciplineTitle` را پویا می‌خواند).
- واکشی یا اسکرپ زنده از وب‌سایت هلدینگ پایا سامان پارس.
- بازنویسی صفحات ۶ تا ۲۱ (`Page6`..`Page21`) که در معماری فعلی track-agnostic هستند.
- بازنویسی اختصاصی `HrArtifactsCanvasWorkshop.tsx` یا `Page0EngineeringMasterclass.tsx` (به‌عنوان ابزارهای مهندسی مشترک باقی می‌مانند).

### ضداهداف (Anti-Goals)
- شکستن یا تغییر محتوای ۳ مسیر قبلی (`CIVIL_INFRA`، `ENERGY_PETRO`، `GENERAL_EVERYDAY`).
- جازدن داده‌های مالی، کارفرمایی یا زمانی شبیه‌سازی‌شده به‌عنوان آمار واقعی رسمی وب‌سایت (به‌صراحت ذکر شده فیلدهای جزئیات سایت خالی‌اند؛ تمام ارقام پیمان/تاریخ/پیشرفت در دیتاست، قرارداد و شبیه‌ساز باید صراحتاً به‌عنوان «مقادیر شبیه‌سازی‌شده آموزشی» برچسب بخورند).
- بروز خطای TypeScript یا شکست Build پیش از کلاس فردا (`npm run lint` و `npm run build` باید بدون خطا پاس شوند).

---

## ۳. محدودیت‌ها و تصمیمات معماری (Constraints & Design Calls)

### رویکردهای بررسی‌شده و انتخاب نهایی
- **رویکرد ۱ (رد شد برای نیاز فعلی):** فقط هسته مسیر، فاز ۱ و آزمون — دیتاست، قرارداد، شبیه‌ساز و NotebookLM هلدینگ را پوشش نمی‌داد.
- **رویکرد ۲ (جایگزین سبک‌تر):** هسته + ۱ دیتاست + ۱ قرارداد — سریع‌تر بود اما اسلایدهای کلاس، NotebookLM و شبیه‌ساز زنده اختصاصی هلدینگ را نداشت.
- **رویکرد ۳ (انتخاب کاربر):** بازنویسی عمیق و کامل کارگاه‌ها شامل شبیه‌ساز اختصاصی + اسلایدهای جلسه ۱ و ۵ + کارگاه NotebookLM + تمام بخش‌های رویکرد ۱ و ۲.

### الگوی کلیدی پیاده‌سازی: Track-Parameterized Selectors
برای اینکه مسیرهای موجود دست‌نخورده بمانند و تغییرات پاک و ماژولار باشند، برای بخش‌هایی که قبلاً داده تک‌مسیره داشتند از **توابع انتخابگر بر اساس `industryTrack`** استفاده می‌کنیم:
1. **`session1_and_5_curriculum.ts`**:
   - حفظ اکسپورت‌های فعلی (`S1_DEMO_SLIDES`, `S1_DRIVE_SLIDES`, ...) به‌عنوان پیش‌فرض مسیرهای قبلی.
   - افزودن مجموعه اسلایدها و فایل‌های نمونه پایا سامان پارس (`PAYA_S1_DEMO_SLIDES`, ..., `PAYA_README_MD`, `PAYA_CLEAN_CSV_CONTENT`) و تابع `getSessionCurriculumForTrack(industryTrack)` که در `Page0LlmFundamentals.tsx` استفاده می‌شود.
2. **`NotebookLmWorkshop.tsx` و داده‌های مرتبط**:
   - افزودن پراپ اختیاری `industryTrack?: IndustryTrackId` به `NotebookLmWorkshopProps` و پاس‌دادن آن از `Page0LlmFundamentals.tsx`.
   - تعریف داده‌های پایا سامان پارس در `notebooklm_engineering_guide.ts` و `notebooklm_sample_documents.ts` (با حفظ کلیدهای استاندارد فعلی برای ۳ مسیر دیگر) از طریق توابع کمکی `getNotebookLmGuideForTrack(track)` و `getNotebookLmSampleDocsForTrack(track)`.
   - دپارتمان‌های پایا در ماتریس NotebookLM شامل ۷ واحد واقعی هلدینگ: (۱) دفتر فنی و مناقصات کلان، (۲) امور قراردادها و مدل‌های EPC+F/BOT/BLT، (۳) کنترل پورتفوی ۶۳ پروژه و شرکت‌های تابعه، (۴) شهر صنعتی کاوه، انرژی خورشیدی و تصفیه پساب، (۵) بال انبوه‌سازی، مسکن و بازآفرینی شهری، (۶) کارگاه، ماشین‌آلات سنگین و HSE، و (۷) منابع انسانی بین‌شرکتی هلدینگ.
3. **`PayaHoldingArtifactSimulator.tsx` و نقاط اتصال آن**:
   - کامپوننت جدید `src/components/PayaHoldingArtifactSimulator.tsx` هم‌سبک `PetroClaudeArtifactSimulator.tsx` با شبیه‌سازی داشبورد دو بال پیمانکاری زیرساختی و مسکن/شهرک صنعتی + ۶۳ پروژه + وضعیت نمونه پروژه‌ها (آزادراه تهران–شمال، مترو تبریز، فرودگاه سلام، سد مخملکوه، نیروگاه خورشیدی و پلاسمای سرد کاوه، شهرک مسکونی آتی‌ساز/عمران مسکن، پروژه برون‌مرزی امارات SKF2).
   - نمایش در دو نقطه:
     1. **در صفحه صفر (`Page0LlmFundamentals.tsx`)**: در بخش ابزارهای پیشرفته/داشبورد (وقتی `industryTrack === 'PAYA_SAMAN_PARS'`) تا مدرس و فراگیران مستقیماً در کارگاه جلسه ۲ با آن کار کنند.
     2. **در کتابچه (`LlmForHumansBookModal.tsx`)**: پاس‌دادن `industryTrack` از `App.tsx` به `LlmForHumansBookModal` تا در فصل ۵ کتابچه، هنگام انتخاب `PAYA_SAMAN_PARS` شبیه‌ساز هلدینگ پایا به‌صورت خودکار به‌جای/همراه شبیه‌ساز پتروشیمی نمایش داده شود.
4. **شبکه کارت‌ها، ورود اختصاصی و ایزوله‌سازی ۴ مسیره**:
   - `IndustryTrackId`: `'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY' | 'PAYA_SAMAN_PARS'` (در `src/types/industryTrack.ts` و `src/types/lms.ts`).
   - **ورود اختصاصی بدون شکستن مسیرهای قبلی:** `getSavedIndustryTrack()` برای بازدیدکنندگان عادی بدون تغییر روی `CIVIL_INFRA` می‌ماند، اما هم پارامتر URL مانند `?track=PAYA_SAMAN_PARS` (یا `?track=paya`) و هم مسیر اختصاصی `/paya` یا `/paya-saman-pars` توسط `getSavedIndustryTrack()` و `App.tsx` پشتیبانی می‌شوند تا با ارسال لینک اختصاصی، کاربران فردا مستقیماً وارد مسیر هلدینگ پایا سامان پارس شوند (و انتخاب در `localStorage` ذخیره شود).
   - `IndustryTrackSelectorModal.tsx`: تغییر گرید از `md:grid-cols-3` به `grid-cols-1 md:grid-cols-2 xl:grid-cols-4` تا ۴ کارت بدون شلوغی جا بگیرند.
   - `IndustryTrackSwitcher.tsx`: افزودن تب چهارم `پایا سامان پارس` (آیکون `Landmark` از `lucide-react` برای تفکیک بصری از `Building2` عمران و `Factory` نفت) در حالت تب کامل و در چرخه `dropdown`.
   - `DisciplineSelectorModal.tsx`: افزودن ۴ رده سازمانی متناسب با هلدینگ پایا (مدیرعامل/معاونت هلدینگ و شرکت تابعه؛ مدیر طرح/کنسرسیوم و پیمان EPC+F/BOT؛ مهندس دفتر فنی، مناقصات و کنترل پروژه؛ سرپرست کارگاه، MEP و بهره‌برداری شهر صنعتی).
   - `Page0LlmFundamentals.tsx`: فیلترکردن `ENGINEERING_DATASETS` و `ENGINEERING_CONTRACTS` بر اساس `industryTrack` — وقتی `PAYA_SAMAN_PARS` فعال است فقط ۳ دیتاست اختصاصی پایا (در گرید ۳ستونه) و ۲ قرارداد اختصاصی پایا (در گرید ۲ستونه) نمایش داده می‌شوند؛ برای ۳ مسیر دیگر فقط دیتاست‌ها و قراردادهای فعلی نمایش داده می‌شوند و انتخاب خودکار با تغییر `industryTrack` همگام می‌ماند.

---

## ۴. فهرست فایل‌های درگیر

### فایل جدید
- `src/components/PayaHoldingArtifactSimulator.tsx`

### فایل‌های ویرایشی
- `src/types/industryTrack.ts` — تعریف `PAYA_SAMAN_PARS`، `PayaDisciplineId`، به‌روزرسانی `getSavedIndustryTrack` و `getSavedDiscipline`
- `src/types/lms.ts` — افزودن `PAYA_SAMAN_PARS` به `UserRegistryItem['trackId']`
- `src/data/disciplineExamplesRegistry.ts` — ۸ دیسیپلین `paya_*`، ۸ کیس‌استادی، شاخه `PAYA_SAMAN_PARS` در `getDisciplinePromptShowcase`
- `src/data/domainTrackExamples.ts` — مثال‌های ۶ فاز CPMAI برای `PAYA_SAMAN_PARS`
- `src/data/engineering_sample_datasets.ts` — افزودن فیلد `trackIds` و ۳ دیتاست اختصاصی (`paya_infra_epc`، `paya_kaveh_housing`، `paya_holding_portfolio`) با برچسب مقادیر شبیه‌سازی‌شده آموزشی
- `src/data/engineering_sample_contracts.ts` — افزودن فیلد `trackIds` و ۲ قرارداد نمونه (`paya_epcf_consortium_contract`، `paya_bot_kaveh_contract`)
- `src/data/session1_and_5_curriculum.ts` — اسلایدها و فایل‌های دانلودی track-aware برای `PAYA_SAMAN_PARS`
- `src/data/notebooklm_engineering_guide.ts` — ماتریس ۷ دپارتمان، blueprints و تمرین‌های `PAYA_SAMAN_PARS`
- `src/data/notebooklm_sample_documents.ts` — اسناد `.md` نمونه قابل دانلود برای `PAYA_SAMAN_PARS`
- `src/data/placement_quiz_data.ts` — انطباق سوالات آزمون (`DISCIPLINE_QUIZ_ADAPTATIONS.PAYA_SAMAN_PARS`)
- `src/components/industry/IndustryTrackSwitcher.tsx` — تب چهارم و لیبل حالت dropdown
- `src/components/industry/IndustryTrackSelectorModal.tsx` — گرید ۴ کارته و نمایش آیکون/تم `PAYA_SAMAN_PARS`
- `src/components/industry/DisciplineSelectorModal.tsx` — گروه‌بندی ۳گانه دیسیپلین‌های پایا + ۴ رده سازمانی هلدینگی + آیکون `Landmark`
- `src/components/OnboardingModal.tsx` — پیش‌فرض‌های تخصصی هلدینگ پایا سامان پارس
- `src/components/tutor/ContextualAiTutorSidebar.tsx` — نگاشت رده‌های سازمانی پایا در کانتکست مربی AI
- `src/components/navigation/WorkspaceSidebar.tsx` — لیبل هدر سایدبار برای `PAYA_SAMAN_PARS`
- `src/components/admin/AdminControlCenterModal.tsx` — افزودن optgroup چهارم و به‌روزرسانی شمارنده دیسیپلین‌ها (۳۲ دیسیپلین)
- `src/components/InteractivePlacementQuiz.tsx` — برچسب کارنامه/گواهینامه برای `PAYA_SAMAN_PARS`
- `src/components/NotebookLmWorkshop.tsx` — مصرف `industryTrack` برای نمایش داده‌های هلدینگ پایا
- `src/components/book/LlmForHumansBookModal.tsx` — دریافت `industryTrack` و نمایش `PayaHoldingArtifactSimulator`
- `src/components/Page0LlmFundamentals.tsx` — `TRACK_METAPHORS`، `TRACK_RCTO_PILLARS`، انتخاب/فیلتر دیتاست و قرارداد، اسلایدها، پاس‌دادن `industryTrack` به `NotebookLmWorkshop` و نمایش شبیه‌ساز اختصاصی
- `src/components/Page1BusinessUnderstanding.tsx` تا `src/components/Page5ExpectedRoi.tsx` — انطباق عنوان، راهنما، پیش‌فرض‌های محاسبه‌گر و کوییز داخلی صفحه ۱ برای `PAYA_SAMAN_PARS`
- `src/App.tsx` — پشتیبانی `/paya` و `?track=PAYA_SAMAN_PARS`، پاس‌دادن `industryTrack` به `LlmForHumansBookModal` و `OnboardingModal`

---

## ۵. تصمیمات تاییدشده نهایی (Approved Decisions)

1. **رویکرد اجرایی:** رویکرد ۳ (شامل شبیه‌ساز اختصاصی `PayaHoldingArtifactSimulator`، بازنویسی مسیرمحور اسلایدهای جلسه ۱ و ۵، کارگاه NotebookLM، صفحات ۰ تا ۵، آزمون، سایدبار، پنل ادمین و مربی AI).
2. **مسیر اختصاصی و ورود بدون تداخل:** پیش‌فرض ریشه سایت برای ۳ مسیر قبلی ثابت می‌ماند؛ مسیر پایا هم از سوئیچر/مودال ۴تایی و هم با لینک اختصاصی `/paya` یا `?track=PAYA_SAMAN_PARS` مستقیم باز و در `localStorage` ذخیره می‌شود.
3. **دیتاست‌های چندگانه و قراردادهای ایزوله:** هنگام فعال بودن `PAYA_SAMAN_PARS`، سه دیتاست مجزا (بال عمرانی، بال مسکن و کاوه، و پورتفوی ۶۳ پروژه‌ای و ناوگان ۱۴ شرکت) و دو قرارداد اختصاصی (کنسرسیوم `EPC+F` زیرساخت و `BOT/BLT` نیروگاه خورشیدی-پلاسمای سرد کاوه) نمایش داده و خودکار انتخاب می‌شوند.
4. **شفافیت داده‌ها:** به دلیل خالی بودن فیلدهای مبلغ/تاریخ/کارفرما روی سایت هلدینگ، تمام اعداد مالی و زمانی به‌صراحت با برچسب «مقادیر شبیه‌سازی‌شده آموزشی» درج می‌شوند.
5. **صحت فنی پیش از تحویل:** اجرای `npm run lint` (`tsc --noEmit`)، `npm run build` (`vite build`) و بررسی بصری UI روی مسیر `PAYA_SAMAN_PARS` و ۳ مسیر قبلی.
