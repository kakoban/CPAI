export interface HrArtifactExercise {
  id: string;
  number: number;
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  badgeEn: string;
  targetTools: string[];
  objectiveFa: string;
  objectiveEn: string;
  promptFa: string;
  promptEn: string;
  expectedOutputFa: string;
  expectedOutputEn: string;
  educationalTakeawayFa: string;
  educationalTakeawayEn: string;
  keyHighlightsFa: string[];
  keyHighlightsEn: string[];
}

export const HR_ARTIFACTS_WORKSHOP_HEADER = {
  titleFa: 'ابزار تعاملی منابع انسانی و اداری با استفاده از Gemini، Claude و NotebookLM',
  titleEn: 'Interactive HR & Admin Tooling Workflow with NotebookLM, Gemini & Claude',
  subtitleFa:
    'پس از استخراج قواعد بدون توهم در NotebookLM، از منطق تحلیلی Gemini (Canvas) و قدرت رابط کاربری Claude (Artifacts) استفاده کنید تا ضوابط منابع انسانی، قراردادهای کارگاهی و بخشنامه‌های داخلی سازمان به داشبوردها و ابزارهای تعاملی تبدیل شوند.',
  subtitleEn:
    'Combine NotebookLM ground-truth extraction, Gemini Canvas analytical structuring, and Claude Artifacts UI engineering to turn HR policies and site contract clauses into interactive live apps without coding.',
  twoStepChainGuide: {
    titleFa: '🔄 ورک‌فلو ۳ مرحله‌ای پیشنهادی: NotebookLM ← Gemini ← Claude',
    titleEn: '🔄 3-Stage Integrated Workflow: NotebookLM → Gemini → Claude',
    descriptionFa:
      'بهترین مسیر حرفه‌ای برای کارشناسان منابع انسانی و اداری پس از یادگیری NotebookLM، ترکیب هدفمند این سه ابزار در یک خط تولید پیوسته است:',
    descriptionEn:
      'Execute HR and administrative automation as a clean three-stage cognitive pipeline right after mastering NotebookLM:',
    steps: [
      {
        stepNumber: 1,
        toolBadge: 'NotebookLM',
        titleFa: 'گام ۱ · NotebookLM (کشف قواعد و تقاطع‌گیری بدون توهم)',
        titleEn: 'Step 1 · NotebookLM (Grounded Discovery & Cross-Audit)',
        descriptionFa:
          'ابتدا قرارداد کارگاهی (ماده ۲۵، بند ۴۲-۱ و متراژ صفحه ۵۴) و بخشنامه داخلی اضافه‌کاری را هم‌زمان در NotebookLM بارگذاری کنید تا قواعد قطعی، تضادها و انحرافات کارگاهی با ارجاع دقیق استخراج شوند.',
        descriptionEn:
          'Upload the site contract clauses and internal overtime directive into NotebookLM to extract exact rules, space tables, and deviations with cited page groundings.'
      },
      {
        stepNumber: 2,
        toolBadge: 'Gemini / Canvas',
        titleFa: 'گام ۲ · Gemini / Canvas (مدل‌سازی منطق، محاسبه و پیش‌نمونه)',
        titleEn: 'Step 2 · Gemini / Canvas (Rule Structuring & Prototype)',
        descriptionFa:
          'خروجی مستند NotebookLM و جدول کارکرد CSV را به Gemini بدهید تا فرمول‌های هشدار (خط قرمز HSE، فرجه ۷ روزه و ۲۴ ساعته)، تحلیل آماری و پیش‌نمونه اولیه فرم را در Gemini Canvas بسازد.',
        descriptionEn:
          'Feed NotebookLM verified rules and attendance CSV logs into Gemini Canvas to formalize thresholds, edge cases, and rapid interactive prototypes.'
      },
      {
        stepNumber: 3,
        toolBadge: 'Claude Artifacts',
        titleFa: 'گام ۳ · Claude Artifacts (ساخت نرم‌افزار و داشبورد نهایی HR)',
        titleEn: 'Step 3 · Claude Artifacts (Production Interactive App)',
        descriptionFa:
          'در پایان، یکی از ۵ پرامپت مهندسی‌شده زیر را به همراه خروجی گام‌های قبل در Claude Artifacts اجرا کنید تا داشبورد گرافیکی، ماشین‌حساب مهلت نامه یا چک‌لیست ممیزی کمپ آماده استفاده تیم تحویل بگیرید.',
        descriptionEn:
          'Run one of the 5 engineered prompts below inside Claude Artifacts to generate a polished React dashboard, notice deadline calculator, or camp audit application.'
      }
    ]
  }
};

export const HR_ARTIFACT_EXERCISES: HrArtifactExercise[] = [
  {
    id: 'hr_artifact_ex1_overtime_dashboard',
    number: 1,
    titleFa: 'تمرین ۱: ساخت داشبورد تعاملی کنترل اضافه‌کاری و ریسک خستگی (React Dashboard)',
    titleEn: 'Exercise 1: Interactive Overtime Control & Fatigue Risk React Dashboard',
    badgeFa: 'داشبورد مدیریتی React + Recharts',
    badgeEn: 'Interactive React Dashboard',
    targetTools: ['Claude Artifacts (React)', 'Gemini Canvas (Web App)'],
    objectiveFa:
      'تبدیل داده‌های خام کارت‌زن کارگاه‌ها به یک داشبورد مدیریتی با قابلیت فیلتر، نمودارهای مقایسه‌ای و هشدارهای خودکار قراردادی و ایمنی.',
    objectiveEn:
      'Transform raw site time-card data into an interactive management dashboard with filters, comparative charts, and automated contractual/HSE alerts.',
    promptFa: `یک داشبورد مدیریتی تعاملی و مدرن با استفاده از React، Tailwind CSS و کتابخانه Recharts به زبان فارسی (راست‌چین با فونت مناسب) برای "واحد منابع انسانی و اداری سازمان پیمانکار" در قالب یک Artifact / Canvas بساز.

منطق و قوانین داشبورد:
۱. سقف مجاز اضافه‌کاری داخلی: ستاد ۵۰ ساعت، دفتر فنی ۶۵ ساعت (با مجوز ۸۰)، کارگاه‌های ایستگاهی ۸۵ ساعت، و عملیات حفاری مکانیزه (TBM) به دلیل ماهیت شبانه‌روزی (ماده ۲۵ شرایط خصوصی) ۱۰۰ ساعت.
۲. خط قرمز ایمنی (HSE): کارکرد بیش از ۱۱۰ ساعت اضافه‌کاری در ماه یا بیش از ۱۴ روز کار متوالی بدون استراحت.
۳. الزام قراردادی (بند ۴۲-۱ ضمیمه شرایط خصوصی): کار شبانه در ایستگاه‌ها نیازمند اطلاع‌رسانی ۱ هفته قبل و اضافه‌کاری روز نیازمند اطلاع‌رسانی ۲۴ ساعت قبل به مهندس مشاور و مدیر طرح پروژه است.

امکانات داشبورد:
- ۴ کارت KPI در بالا (مجموع ساعت اضافه‌کاری، میانگین هر نفر، تعداد موارد نقض خط قرمز ایمنی، و ساعات شب‌کاری فاقد مجوز مشاور که در معرض رد شدن هستند).
- نمودار میله‌ای مقایسه اضافه‌کاری واقعی با سقف مجاز به تفکیک واحدها (ایستگاه مرکزی S-01 با مهندسین مشاور الف، ایستگاه غربی S-02 با مهندسین مشاور ب، TBM قطعه غربی با مهندسین مشاور ب، و دفتر فنی ستاد).
- جدول وضعیت کارگاه‌ها با برچسب رنگی (سبز: منطبق، زرد: انحراف از سقف داخلی، قرمز: نقض بند ۴۲-۱ قرارداد یا خط قرمز HSE).
- داده‌های اولیه مهرماه را به صورت پیش‌فرض در کد قرار بده و امکان فیلتر بر اساس نام ایستگاه/مشاور را فراهم کن.`,
    promptEn: `Create a modern, interactive RTL Persian management dashboard using React, Tailwind CSS, and Recharts for the "HR & Admin Department - Contractor Organization" inside a Claude Artifact / Gemini Canvas.

Dashboard Logic & Rules:
1. Internal Overtime Caps: HQ 50h, Technical Office 65h (80h with special permit), Station Sites 85h, and TBM Mechanized Tunneling 100h due to 24/7 continuous operations (Particular Conditions Article 25).
2. HSE Red Line: Overtime exceeding 110 hours/month or more than 14 consecutive working days without rest.
3. Contractual Mandate (Sub-Clause 42-1): Night shifts at stations require 1-week prior written notice, and daytime overtime requires 24-hour prior notice to the supervising consultant and Project Management Consultant (PMC).

Dashboard Features:
- 4 top KPI cards (Total Overtime Hours, Average per Person, HSE Red-Line Violations, and Unapproved Night-Shift Hours at risk of rejection).
- Bar chart comparing actual vs. capped overtime across units (Central Station S-01 with Consultant A, West Station S-02 with Consultant B, West TBM Sector with Consultant B, and HQ Technical Office).
- Status table with color badges (Green: Compliant, Yellow: Internal Cap Deviation, Red: Clause 42-1 or HSE Red-Line Breach).
- Embed October sample data by default and include interactive filtering by station/consultant.`,
    expectedOutputFa:
      'یک پنل گرافیکی کامل که در آن ردیف «ایستگاه مرکزی (کد S-01)» به دلیل ۱۰۵ ساعت اضافه‌کاری، ۱۸ روز کار متوالی تکنسین‌ها و عدم ارسال نامه یک هفته قبل به مهندسین مشاور الف به رنگ قرمز درآمده و میزان خسارت مالی ناشی از رد شدن ۴۰ ساعت شب‌کاری (طبق بند ۴۲-۱) را نمایش می‌دهد.',
    expectedOutputEn:
      'A full graphical dashboard highlighting Central Station (S-01) in red due to 105h average overtime, 18 consecutive workdays, and missing 7-day prior notice to Consultant A, quantifying the financial exposure of 40 rejected night-shift hours under Clause 42-1.',
    educationalTakeawayFa:
      'تبدیل هم‌زمان ضوابط داخلی سازمان پیمانکار و مواد شرایط خصوصی پیمان به یک پنل دیدبانی زنده (Live Compliance Monitor) برای مدیر منابع انسانی و رئیس کارگاه.',
    educationalTakeawayEn:
      'Simultaneously encoding internal HR directives and EPC contract clauses into a live visual compliance monitor.',
    keyHighlightsFa: [
      '۴ کارت KPI مدیریتی با محاسبه خودکار ساعات در معرض خطر رد شدن توسط مشاور',
      'نمودار مقایسه‌ای سقف مجاز در برابر کارکرد واقعی هر جبهه کاری (ایستگاهی، TBM، ستاد)',
      'هشدار بصری قرمز برای نقض هم‌زمان خط قرمز ایمنی (۱۸ روز کار متوالی) و بند ۴۲-۱ پیمان'
    ],
    keyHighlightsEn: [
      '4 executive KPI cards calculating unapproved hours at risk of consultant rejection',
      'Comparative bar chart of allowed caps vs. actual site overtime across stations, TBM, and HQ',
      'Automated red alert for combined HSE fatigue breach (18 consecutive days) and Clause 42-1 violation'
    ]
  },
  {
    id: 'hr_artifact_ex2_deadline_calculator',
    number: 2,
    titleFa: 'تمرین ۲: ساخت اپلیکیشن «ماشین‌حساب مهلت اطلاع‌رسانی و تولیدکننده خودکار نامه اضافه‌کاری/شب‌کاری»',
    titleEn: 'Exercise 2: Notice Deadline Calculator & Automated Overtime/Night-Shift Official Letter Generator',
    badgeFa: 'سیستم تصمیم‌یار (DSS) + تولید نامه',
    badgeEn: 'Decision Support & Letter Generator',
    targetTools: ['Claude Artifacts (Web App)', 'Gemini Canvas (Interactive UI)'],
    objectiveFa:
      'جلوگیری از خطای سرپرستان کارگاه در ارسال دیرهنگام نامه‌های کار شبانه به مهندسین مشاور (الف، ب، ج) و حذف ریسک رد شدن کارکرد (موضوع بند ۴۲-۱ ضمیمه شرایط خصوصی).',
    objectiveEn:
      'Prevent site superintendents from submitting late night-shift notices to supervising consultants (A, B, C) and eliminate time-card rejection risks under Sub-Clause 42-1.',
    promptFa: `یک ابزار وب تعاملی (Interactive Web App Artifact / Canvas) به زبان فارسی و راست‌چین برای واحد منابع انسانی و اداری سازمان پیمانکار بساز که دو کار انجام دهد: "کنترل مهلت زمانی بند ۴۲-۱ قرارداد" و "تولید خودکار نامه رسمی".

فیلدهای ورودی کاربر:
۱. انتخاب ایستگاه یا جبهه کاری از منوی کشویی (که به صورت خودکار نام مشاور ناظر را تشخیص دهد: مثلاً ایستگاه غربی کد S-02 -> مهندسین مشاور ب | ایستگاه مرکزی کد S-01 و ایستگاه شمالی کد S-03 -> مهندسین مشاور الف | ایستگاه شرقی کد S-04 -> مهندسین مشاور ج). مدیر طرح همیشه "مدیر طرح پروژه" است.
۲. نوع عملیات: (گزینه الف: اضافه‌کاری در ساعات روز / گزینه ب: کار شبانه در ایستگاه / گزینه ج: عملیات حفاری مکانیزه TBM).
۳. تاریخ شروع عملیات و تاریخ امروز (یا تعداد روزهای باقی‌مانده تا شروع عملیات).
۴. تعداد نفرات اجرایی، تعداد نفرات HSE مستقر (طبق بند ۹-۱۲ ضمیمه شرایط خصوصی) و شرح عملیات (مثلاً بتن‌ریزی یا آرماتوربندی).

منطق برنامه:
- اگر کاربر "عملیات TBM" را انتخاب کرد، پیغام سبز بدهد: "طبق ماده ۲۵ شرایط خصوصی، عملیات تونل مکانیزه ذاتاً شبانه‌روزی است و نیازی به اخذ مجوز موردی شب‌کاری ندارد."
- اگر "کار شبانه ایستگاه" انتخاب شد و فاصله زمانی کمتر از ۷ روز بود، هشدار قرمز نمایش دهد: "خطر رد شدن کارکرد! طبق بند ۴۲-۱ ضمیمه شرایط خصوصی، اطلاع‌رسانی کار شبانه باید حداقل ۱ هفته (۷ روز) قبل انجام شود."
- اگر "اضافه‌کاری روز" انتخاب شد و فاصله کمتر از ۲۴ ساعت (۱ روز) بود، هشدار قرمز مشابه بدهد.
- در پایین صفحه، بر اساس اطلاعات وارد شده، متن کامل و استاندارد نامه رسمی از سازمان پیمانکار به کارفرما (به اطلاع مدیر طرح پروژه و مهندسین مشاور ناظر مربوطه) را با استناد دقیق به ماده ۲۵ شرایط خصوصی (لزوم تطابق با لیست بیمه تأمین اجتماعی) و بند ۴۲-۱ تولید کند همراه با دکمه "کپی متن نامه".`,
    promptEn: `Build an interactive RTL Persian web application in Claude Artifacts / Gemini Canvas for the HR & Admin Department of the Contractor Organization that performs two core tasks: "Sub-Clause 42-1 Notice Deadline Verification" and "Automated Official Letter Generation".

User Input Fields:
1. Station / Sector dropdown (auto-detecting the assigned supervising consultant: West Station S-02 -> Consultant B | Central Station S-01 & North Station S-03 -> Consultant A | East Station S-04 -> Consultant C). Project Manager is always "Project Management Consultant (PMC)".
2. Operation Type: (Option A: Daytime Overtime / Option B: Station Night Work / Option C: Mechanized TBM Tunneling).
3. Target start date and current date (or days remaining until operation start).
4. Number of execution personnel, stationed HSE officers (per Sub-Clause 12-9), and operation description (e.g., slab concreting or rebar installation).

Application Logic:
- If "TBM Tunneling" is selected, display a green banner: "Per Particular Conditions Article 25, mechanized tunneling is inherently 24/7 and exempt from ad-hoc night-work permits."
- If "Station Night Work" is selected with less than 7 days lead time, trigger a red warning: "Rejection Risk! Per Sub-Clause 42-1, night-shift notification must be submitted at least 1 week (7 days) in advance."
- If "Daytime Overtime" is selected with less than 24 hours (1 day) lead time, display a similar red alert.
- At the bottom, dynamically generate the complete formal letter from the Contractor Organization to the Employer (CC: PMC and Supervising Consultant) citing Article 25 (mandatory alignment with stamped Social Security insurance lists) and Sub-Clause 42-1, with a one-click "Copy Letter" button.`,
    expectedOutputFa:
      'اپلیکیشن تعاملی که به محض انتخاب ایستگاه، مشاور ناظر را تشخیص داده، فاصله زمانی تا شروع عملیات را با فرجه قانونی بند ۴۲-۱ می‌سنجد و متن نامه رسمی آماده امضا را تولید می‌کند.',
    expectedOutputEn:
      'An interactive web calculator that maps each station to its supervising consultant, validates lead time against Clause 42-1, and outputs a ready-to-sign formal notice letter.',
    educationalTakeawayFa:
      'مهارت آموزشی برای تیم HR: یادگیری تبدیل قوانین متنی قرارداد به یک سیستم تصمیم‌یار (Decision Support System) که خطای انسانی در کارگاه‌ها را به صفر می‌رساند.',
    educationalTakeawayEn:
      'HR Skill Takeaway: Turning textual contract clauses into an automated Decision Support System (DSS) that eliminates human error across construction sites.',
    keyHighlightsFa: [
      'تشخیص خودکار مهندس مشاور ناظر بر اساس ایستگاه انتخاب‌شده',
      'تفکیک هوشمند استثنای شبانه‌روزی حفاری TBM (ماده ۲۵) از کار شبانه ایستگاهی (بند ۴۲-۱)',
      'تولید خودکار نامه رسمی با استناد به لیست بیمه ممهور به مهر تأمین اجتماعی و حضور افسر HSE'
    ],
    keyHighlightsEn: [
      'Auto-mapping of supervising consultant based on selected station code',
      'Smart distinction between 24/7 TBM exemption (Article 25) and station night work (Clause 42-1)',
      'Instant formal letter generation citing stamped SSO insurance lists and mandatory HSE presence'
    ]
  },
  {
    id: 'hr_artifact_ex3_camp_welfare_auditor',
    number: 3,
    titleFa: 'تمرین ۳: ساخت «چک‌لیست و ممیز هوشمند تجهیز کارگاه، اسکان و رفاهیات» (ماده ۲۰-ح و جدول صفحه ۵۴)',
    titleEn: 'Exercise 3: Smart Site Mobilization, Accommodation & Welfare Audit Tool (Article 20-H & Page 54 Table)',
    badgeFa: 'ابزار ممیزی کارگاهی (Audit Tool)',
    badgeEn: 'Interactive Site Audit App',
    targetTools: ['Claude Artifacts (React)', 'Gemini Canvas (Audit App)'],
    objectiveFa:
      'کنترل تعهدات پشتیبانی، اداری و رفاهی پیمانکار در هر سایت کارگاهی و محاسبه درصد تکمیل الزامات قراردادی.',
    objectiveEn:
      'Audit contractor administrative, accommodation, and welfare obligations across project sites and calculate a quantitative contractual compliance score.',
    promptFa: `یک اپلیکیشن چک‌لیست و ممیزی هوشمند کارگاهی (Audit Tool Artifact / Canvas) با React و Tailwind CSS برای مدیر منابع انسانی و پشتیبانی سازمان پیمانکار بساز.
این ابزار باید بر اساس ماده ۲۰-ح شرایط خصوصی و جدول حداقل متراژ فضاهای صفحه ۵۴ قرارداد، وضعیت هر کارگاه را ممیزی کند.

بخش‌های اپلیکیشن:
۱. انتخاب نام کارگاه (مثلاً ایستگاه پایانه کد S-05، ایستگاه شرقی کد S-04، ایستگاه مرکزی کد S-01 و...).
۲. بخش اول ممیزی (کنترل متراژ فضاها): کاربر متراژ موجود در کارگاه را وارد کند و برنامه آن را با حداقل متراژ قراردادی مقایسه کرده و کسری یا انطباق را با نوار پیشرفت نشان دهد:
- اتاق‌های کارگری (حداقل ۱۵۰ مترمربع)
- پرسنل اجرایی (حداقل ۳۰ مترمربع)
- پرسنل اداری و خدماتی (حداقل ۲۰ مترمربع)
- دفتر فنی (حداقل ۱۸ مترمربع) و اتاق جلسات (حداقل ۱۸ مترمربع)
- سرپرست کارگاه (حداقل ۱۲ مترمربع) و واحد HSE و کمک‌های اولیه (حداقل ۱۲ مترمربع)
- نماینده کارفرما (۹ مترمربع)، سرپرست نظارت (۹ مترمربع)، نظارت (۱۳ مترمربع) و آزمایشگاه (۹ مترمربع)
- سرویس بهداشتی کارگری (۸ مترمربع)، سرویس اداری (۶ مترمربع)، حمام با آب گرم شبانه‌روزی (۳ باب - ۶ مترمربع) و نمازخانه (۶ مترمربع).
۳. بخش دوم ممیزی (الزامات نفرات و خدمات ماده ۲۰-ح): چک‌باکس‌های تایید برای:
- نصب دستگاه کارت‌زن ورود و خروج و تحویل لباس فرم (بند ۱۰)
- استقرار حداقل ۱ نفر کارشناس HSE در سایت (بند ۷)
- استقرار ۱ نفر کارگر تمام‌وقت آزمایشگاه و ۱ نفر آبدارچی مجزا برای کارفرما/مدیر طرح/مشاور (بند ۹)
- تأمین غذای ۳ وعده برای حداقل ۱۰ نفر عوامل کارفرما و مشاور مقیم.

در انتها یک "نمره انطباق کارگاه (از ۱۰۰)" محاسبه شود و لیست نواقص برای ارسال به سرپرست کارگاه قابل خروجی گرفتن باشد.`,
    promptEn: `Create a smart site mobilization and welfare audit application (Audit Tool Artifact / Canvas) using React and Tailwind CSS for the HR & Support Manager.
The tool must audit each construction site against Particular Conditions Article 20-H and the Mandatory Minimum Space Table on Contract Page 54.

Application Sections:
1. Site Selector (e.g., Terminal Station S-05, East Station S-04, Central Station S-01, etc.).
2. Part 1 - Space Area Audit: User inputs existing area (m²) for each facility, and the app compares it against contractual minimums with progress bars and deficit alerts:
- Workers' Dormitories (min 150 m²)
- Execution Staff Office (min 30 m²)
- Admin & Support Staff (min 20 m²)
- Technical Office (min 18 m²) & Meeting Room (min 18 m²)
- Site Superintendent (min 12 m²) & HSE / First-Aid Unit (min 12 m²)
- Employer Representative (9 m²), Chief Supervisor (9 m²), Supervision Engineers (13 m²), Laboratory (9 m²)
- Workers' Restrooms (8 m²), Office Restrooms (6 m²), 24/7 Hot-Water Showers (3 units - 6 m²), Prayer Room (6 m²).
3. Part 2 - Staffing & Welfare Services Checklist (Article 20-H):
- Time-card attendance machine installed & uniforms issued (Item 10)
- Minimum 1 full-time HSE officer stationed on site (Item 7)
- 1 full-time lab worker & 1 dedicated hospitality attendant for Employer/PMC/Consultant (Item 9)
- 3 daily meals provided for at least 10 resident Employer/Consultant personnel.

Calculate an overall "Site Compliance Score (out of 100)" and generate an exportable Deficiency Action List for the Site Superintendent.`,
    expectedOutputFa:
      'فرم ممیزی تعاملی با نوارهای پیشرفت رنگی برای هر ۱۵ فضای کالبدی صفحه ۵۴ قرارداد، چک‌لیست خدمات ماده ۲۰-ح، نمره کل انطباق از ۱۰۰ و گزارش کسری متراژ آماده ارسال به سرپرست کارگاه.',
    expectedOutputEn:
      'An interactive audit checklist with progress bars for all 15 mandatory camp spaces on Page 54, Article 20-H service verification checkboxes, a 0-100 compliance score, and a deficiency report.',
    educationalTakeawayFa:
      'تبدیل جداول پیوست قرارداد به ابزار ممیزی میدانی قابل استفاده روی تبلت و موبایل در بازدیدهای ادواری واحد منابع انسانی و اداری.',
    educationalTakeawayEn:
      'Converting static contract appendix tables into a mobile-ready field inspection app for HR & Admin site audits.',
    keyHighlightsFa: [
      'کنترل خودکار متراژ ۱۵ ردیف فضای الزامی کمپ کارگاهی (صفحه ۵۴ قرارداد)',
      'پایش تعهدات خدماتی ماده ۲۰-ح (کارت‌زن، لباس فرم، غذای ۱۰ نفر کارفرما/مشاور، آبدارچی و کارگر آزمایشگاه)',
      'محاسبه نمره انطباق کارگاه از ۱۰۰ و صدور خودکار لیست نواقص'
    ],
    keyHighlightsEn: [
      'Automated area verification for all 15 mandatory camp spaces (Contract Page 54)',
      'Service compliance tracking under Article 20-H (attendance clock, uniforms, 10-person catering, lab & hospitality staff)',
      '0-100 site compliance scoring with one-click deficiency report export'
    ]
  },
  {
    id: 'hr_artifact_ex4_csv_manpower_converter',
    number: 4,
    titleFa: 'تمرین ۴: ساخت «مبدل CSV دستگاه کارت‌زن به گزارش ماهانه ماده ۱۸ شرایط خصوصی»',
    titleEn: 'Exercise 4: Time-Card CSV to Article 18 Monthly Manpower Distribution Report Converter',
    badgeFa: 'تبدیل داده CSV + گزارش چاپی ماده ۱۸',
    badgeEn: 'CSV Parser & Print-Ready Report',
    targetTools: ['Claude Artifacts (React + Charts)', 'Gemini Canvas (Data App)'],
    objectiveFa:
      'طبق ماده ۱۸ شرایط خصوصی (بند ۶ و بند ح-۲)، پیمانکار موظف است تا بیستم هر ماه (با داده‌های منتهی به پانزدهم ماه)، گزارش ماهانه حاوی «جداول و نمودار توزیع نیروی انسانی مستقر در کارگاه» را به مشاور و مدیر طرح ارائه دهد.',
    objectiveEn:
      'Per Particular Conditions Article 18 (Items 6 & H-2), the contractor must submit the monthly report by the 20th of each month (covering data through the 15th) containing "tables and charts of site manpower distribution" to the Consultant and PMC.',
    promptFa: `یک ابزار تحت وب در قالب Artifact / Canvas بساز که داده‌های حضور و غیاب ماهانه پرسنل (بازه ۱۶ ماه قبل تا ۱۵ ماه جاری طبق ماده ۱۸-۶ شرایط خصوصی پیمان) را مدیریت کند.

این برنامه باید:
۱. یک دکمه برای "بارگذاری فایل CSV" یا "استفاده از داده‌های نمونه کارگاهی" داشته باشد.
۲. جداول و نمودارهای توزیع نیروی انسانی مستقر در کارگاه (موضوع ماده ۱۸-ح ردیف ۲ شرایط خصوصی) را به تفکیک "ستاد"، "ایستگاه‌های زیرزمینی"، "ایستگاه‌های روباز" و "تونل مکانیزه TBM" و به تفکیک تخصص (مهندس، تکنسین، کارگر ماهر، HSE، خدماتی) به صورت نمودار دایره‌ای (Pie Chart) و ستونی انباشته (Stacked Bar) رسم کند.
۳. یک نمای چاپی (Print-friendly Report) استاندارد با سربرگ سازمان پیمانکار تولید کند که آماده پیوست شدن به گزارش ماهانه پیشرفت کار برای ارسال به مهندسین مشاور و مدیر طرح پروژه در تاریخ ۲۰ هر ماه باشد.`,
    promptEn: `Build a web utility in Claude Artifacts / Gemini Canvas that processes monthly personnel attendance data (covering the 16th of the previous month through the 15th of the current month per Particular Conditions Article 18-6).

The application must:
1. Provide buttons to "Upload Time-Card CSV" or "Load Sample Site Attendance Data".
2. Render site manpower distribution tables and charts (mandated by Article 18-H Item 2) broken down by location ("HQ", "Underground Stations", "Cut-and-Cover Stations", "Mechanized TBM Tunnel") and by role ("Engineer", "Technician", "Skilled Worker", "HSE Officer", "Support Staff") using Pie Charts and Stacked Bar Charts.
3. Generate a standardized Print-Friendly Official Report with the Contractor Organization's letterhead, ready to attach to the Monthly Progress Report submitted to the Supervising Consultants and PMC by the 20th of each month.`,
    expectedOutputFa:
      'ابزار تبدیل فوری خروجی خام دستگاه ساعت‌زنی به نمودارهای توزیع نیروی انسانی ماده ۱۸-ح و گزارش رسمی قابل چاپ برای تحویل بیستم هر ماه.',
    expectedOutputEn:
      'Instant converter turning raw time-clock CSV exports into Article 18-H manpower distribution charts and a print-ready formal appendix.',
    educationalTakeawayFa:
      'حذف ساعت‌ها کار دستی در اکسل برای تهیه جداول و نمودارهای توزیع نیروی انسانی در گزارش‌های ماهانه منتهی به ۱۵ هر ماه.',
    educationalTakeawayEn:
      'Eliminating hours of manual Excel work when compiling monthly manpower distribution charts for the 15th-to-20th reporting cycle.',
    keyHighlightsFa: [
      'پوشش دقیق بازه زمانی ماده ۱۸-۶ (داده‌های منتهی به ۱۵ هر ماه جهت ارائه تا ۲۰ ماه)',
      'ترسیم خودکار نمودار دایره‌ای (Pie) و ستونی انباشته (Stacked Bar) به تفکیک جبهه کاری و تخصص',
      'خروجی استاندارد چاپی (Print-Ready) با سربرگ سازمان پیمانکار جهت پیوست گزارش ماهانه پیشرفت'
    ],
    keyHighlightsEn: [
      'Exact alignment with Article 18-6 reporting window (cutoff on the 15th, submission by the 20th)',
      'Automated Pie and Stacked Bar charts by site zone and personnel discipline',
      'Print-friendly formal report view with contractor letterhead for monthly progress appendices'
    ]
  },
  {
    id: 'hr_artifact_ex5_contract_quiz_simulator',
    number: 5,
    titleFa: 'تمرین ۵: ساخت «آزمون‌ساز و شبیه‌ساز تعاملی قوانین قرارداد ویژه کارشناسان HR» (Gamified Quiz)',
    titleEn: 'Exercise 5: Gamified Contract Rules Quiz & Simulator for HR Specialists',
    badgeFa: 'آزمون‌ساز تعاملی (Gamified Quiz)',
    badgeEn: 'Interactive Gamified Quiz',
    targetTools: ['Claude Artifacts (Interactive Quiz)', 'Gemini Canvas (Gamified App)'],
    objectiveFa:
      'آموزش تعاملی مفاد قراردادهای کارگاهی و ضوابط منابع انسانی به کارشناسان جدیدالورود منابع انسانی و اداری.',
    objectiveEn:
      'Interactive onboarding and mastery assessment of contractual HR & Admin clauses for new HR specialists.',
    promptFa: `یک اپلیکیشن آزمون تعاملی (Interactive Quiz Artifact / Canvas) با طراحی گرافیکی جذاب برای آموزش کارشناسان منابع انسانی و اداری سازمان پیمانکار بساز.

۱۰ سوال چهارگزینه‌ای کاربردی و سناریومحور بر اساس مفاد زیر در آن قرار بده:
- تبصره ۴ ماده ۳ موافقتنامه و بند ۵۹-۱ ضمیمه شرایط خصوصی (محاسبه بیمه و کسورات بر اساس پروژه‌های غیرعمرانی)
- ماده ۱۸ شرایط خصوصی (مهلت ارائه گزارش ماهانه تا ۲۰ هر ماه با داده‌های منتهی به ۱۵ ماه و جدول توزیع نیروی انسانی)
- ماده ۲۰-ح شرایط خصوصی و جدول صفحه ۵۴ (تأمین غذا برای ۱۰ نفر، آبدارچی و کارگر آزمایشگاه، دستگاه کارت‌زن، لباس فرم و متراژ اتاق کارگری ۱۵۰ متر و HSE دوازده متر)
- ماده ۲۱-ج شرایط خصوصی (اعتبار بیمه مسئولیت مدنی کارکنان، پیمانکاران جزء و اشخاص ثالث تا تحویل موقت)
- ماده ۲۴-ب شرایط خصوصی (پرداخت ماهانه حقوق و تایید صلاحیت پیمانکاران جزء)
- ماده ۲۵ شرایط خصوصی و بند ۴۲-۱ ضمیمه (شرایط کار در شب، استثنای TBM، مهلت ۱ هفته برای شب‌کاری و ۲۴ ساعت برای اضافه‌کاری روز، و ملاک بودن لیست بیمه ممهور به مهر تأمین اجتماعی)
- بند ۴-۱۲ ضمیمه شرایط خصوصی (تایید چارت سازمانی و تغییر نفرات کلیدی توسط مشاور، مدیر طرح و کارفرما).

پس از انتخاب هر گزینه توسط کاربر، بلافاصله مشخص کن پاسخ درست است یا غلط و ماده و بند دقیق قرارداد را به عنوان توضیح نمایش بده. در پایان، کارنامه و سطح تسلط کارشناس را نمایش بده.`,
    promptEn: `Create an engaging, gamified Interactive Quiz Web App in Claude Artifacts / Gemini Canvas to train HR & Admin specialists of the Contractor Organization on contractual HR clauses.

Include 10 scenario-based multiple-choice questions covering:
- Agreement Article 3 Note 4 & Particular Conditions Sub-Clause 59-1 (Social Security & statutory deductions calculated under non-civil/non-development project rates)
- Particular Conditions Article 18 (Monthly report submission by the 20th with data through the 15th, including manpower distribution tables)
- Particular Conditions Article 20-H & Page 54 Table (3-meal catering for 10 Employer/Consultant staff, dedicated hospitality & lab worker, attendance clock, uniforms, 150 m² worker dorms, and 12 m² HSE room)
- Particular Conditions Article 21-C (Employer's Liability & Third-Party Insurance validity through Provisional Handover)
- Particular Conditions Article 24-B (Timely monthly wage payment and subcontractor qualification approval)
- Particular Conditions Article 25 & Sub-Clause 42-1 (Night-work rules, 24/7 TBM exemption, 1-week notice for night shifts & 24-hour notice for day overtime, and stamped Social Security insurance lists as the sole verification basis)
- Sub-Clause 12-4 (Approval of organizational chart and key personnel replacements by Consultant, PMC, and Employer).

Immediately after each answer selection, reveal whether it is correct or incorrect alongside the exact cited contract clause rationale. At the end, display a mastery scorecard and competency tier.`,
    expectedOutputFa:
      'اپلیکیشن آزمون ۱۰ سوالی تعاملی با بازخورد فوری، استناد دقیق به مواد موافقتنامه و شرایط خصوصی پیمان و صدور کارنامه سطح تسلط کارشناس HR.',
    expectedOutputEn:
      'A 10-question interactive quiz app with instant clause-grounded feedback, rationales, and a final HR competency scorecard.',
    educationalTakeawayFa:
      'تبدیل متون خشک حقوقی و پیمانی به یک بازی آموزشی تعاملی برای آنبوردینگ سریع کارشناسان جدیدالورود منابع انسانی.',
    educationalTakeawayEn:
      'Transforming dense legal contract clauses into an engaging onboarding simulator for new HR & Admin personnel.',
    keyHighlightsFa: [
      'پوشش کامل ۷ محور کلیدی منابع انسانی و اداری قراردادهای پیمانکاری در قالب ۱۰ سناریو',
      'بازخورد آنی همراه با ذکر دقیق شماره ماده و بند قانونی پس از هر پاسخ',
      'صدور کارنامه تحلیلی و تعیین سطح تسلط کارشناس در پایان آزمون'
    ],
    keyHighlightsEn: [
      'Comprehensive coverage of all 7 contractual HR & Admin pillars in 10 real-world scenarios',
      'Instant feedback citing the exact agreement and particular conditions clause after each question',
      'Final analytical scorecard and mastery level classification'
    ]
  }
];

export interface HrNotebookLmCompanionData {
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  simulatedOutputFa: string;
  simulatedOutputEn: string;
  sampleCsv: string;
  assumptionsFa: Array<{ title: string; detail: string; sourceTag: string }>;
  assumptionsEn: Array<{ title: string; detail: string; sourceTag: string }>;
  extractionPromptFa: string;
  extractionPromptEn: string;
}

export const HR_NOTEBOOKLM_COMPANION: HrNotebookLmCompanionData = {
  badgeFa: 'خروجی آماده گام ۱ (مستندسازی بدون توهم)',
  badgeEn: 'Ready Step-1 Output (Zero-Hallucination Grounding)',
  titleFa: 'خروجی فرضی و مستند NotebookLM + فرضیات لازم برای اجرای گام ۲ و ۳',
  titleEn: 'Simulated Grounded NotebookLM Output & Extraction Assumptions for Steps 2–3',
  subtitleFa:
    'اگر همین الان به فایل‌های PDF قرارداد دسترسی ندارید، این خروجی مستندسازی‌شده NotebookLM و جدول CSV نمونه را کپی کنید و مستقیماً در گام ۲ (Gemini Canvas) یا گام ۳ (Claude Artifacts) استفاده نمایید؛ یا از تب دوم فرضیات و پرامپت استخراج را در NotebookLM خودتان اجرا کنید.',
  subtitleEn:
    'Copy this grounded NotebookLM synthesis and sample attendance CSV directly into Gemini Canvas (Step 2) or Claude Artifacts (Step 3), or review the required source assumptions and extraction prompt in Tab 2.',
  simulatedOutputFa: `# گزارش مستند استخراج قواعد منابع انسانی و اداری (خروجی NotebookLM)

## ۱. جدول سقف اضافه‌کاری، خط قرمز ایمنی (HSE) و استثنای شبانه‌روزی
- **سقف اضافه‌کاری داخلی سازمان:**
  - واحد ستاد مرکزی: حداکثر **۵۰ ساعت** در ماه \`[منبع ۲: بخشنامه داخلی اضافه‌کاری · بند ۱]\`
  - دفتر فنی و مهندسی: حداکثر **۶۵ ساعت** (قابل افزایش تا **۸۰ ساعت** صرفاً با مجوز کتبی معاونت فنی) \`[منبع ۲: بند ۲]\`
  - کارگاه‌های ایستگاهی (S-01 تا S-05): حداکثر **۸۵ ساعت** در ماه \`[منبع ۲: بند ۳]\`
  - جبهه حفاری مکانیزه (TBM): حداکثر **۱۰۰ ساعت** در ماه (عملیات شبانه‌روزی پیوسته ۲۴/۷) \`[منبع ۱: ماده ۲۵ شرایط خصوصی]\`
- **خط قرمز قطعی HSE (ریسک خستگی و حادثه):**
  - اضافه‌کاری **بیش از ۱۱۰ ساعت در ماه** یا **بیش از ۱۴ روز کاری متوالی بدون استراحت** = وضعیت بحرانی (توقف فوری شیفت + اطلاع به افسر HSE) \`[منبع ۲: ضمیمه ایمنی]\`
- **نحوه احراز رسمی کارکرد:** ملاک قانونی حضور پرسنل و پیمانکاران جزء، صرفاً تطابق کارت‌زنی با **لیست بیمه ممهور به مهر تأمین اجتماعی** است \`[منبع ۱: ماده ۲۵ شرایط خصوصی]\`.

## ۲. فرجه قانونی اطلاع‌رسانی و نگاشت مهندس مشاور ناظر (بند ۴۲-۱)
- **کار شبانه در ایستگاه‌ها:** الزام ارسال نامه رسمی **حداقل ۱ هفته (۷ روز) پیش از شروع عملیات** + تأیید حضور افسر HSE \`[منبع ۱: بند ۴۲-۱ ضمیمه]\`.
- **اضافه‌کاری روزانه / روزهای تعطیل:** الزام اطلاع‌رسانی کتبی **حداقل ۲۴ ساعت قبل** به مشاور ناظر و مدیر طرح (PMC) \`[منبع ۱: بند ۴۲-۱]\`.
- **استثنای قانونی TBM:** حفاری مکانیزه تونل به صورت ذاتی ۲۴ ساعته بوده و از مجوز موردی شب‌کاری معاف است \`[منبع ۱: ماده ۲۵]\`.
- **جدول نگاشت ایستگاه ← مشاور ناظر:**
  - ایستگاه مرکزی (S-01) و شمالی (S-03) ← **مهندس مشاور الف (Consultant A)**
  - ایستگاه غربی (S-02) و جبهه TBM غربی ← **مهندس مشاور ب (Consultant B)**
  - ایستگاه شرقی (S-04) و پایانه (S-05) ← **مهندس مشاور ج (Consultant C)**

## ۳. استاندارد فضاهای کمپ کارگاهی و خدمات رفاهی (ماده ۲۰-ح و صفحه ۵۴)
- **حداقل متراژ الزامی فضاها:** اتاق‌های کارگری \`150 m²\` · پرسنل اجرایی \`30 m²\` · اداری و خدماتی \`20 m²\` · دفتر فنی \`18 m²\` · اتاق جلسات \`18 m²\` · سرپرست کارگاه \`12 m²\` · واحد HSE و کمک‌های اولیه \`12 m²\` · نظارت \`13 m²\` · نماینده کارفرما، سرپرست نظارت و آزمایشگاه هر کدام \`9 m²\` · سرویس کارگری \`8 m²\` · سرویس اداری، حمام آب گرم ۲۴ ساعته (۳ باب) و نمازخانه هر کدام \`6 m²\` \`[منبع ۳: جدول حداقل متراژ ص ۵۴]\`.
- **خدمات الزامی ماده ۲۰-ح:** نصب دستگاه کارت‌زن و تحویل لباس فرم (بند ۱۰)، استقرار حداقل ۱ کارشناس HSE مقیم (بند ۷)، ۱ کارگر تمام‌وقت آزمایشگاه + ۱ آبدارچی مجزا برای کارفرما/PMC/مشاور (بند ۹)، و تأمین **۳ وعده غذای روزانه برای حداقل ۱۰ نفر** عوامل مقیم کارفرما و مشاور \`[منبع ۱: ماده ۲۰-ح]\`.

## ۴. تقویم گزارش‌دهی ماهانه نیروی انسانی (ماده ۱۸-۶ و بند ح-۲)
- **بازه داده‌های کارت‌زن:** از روز **۱۶ ماه قبل تا ۱۵ ماه جاری** (Cut-off Date: پانزدهم هر ماه) \`[منبع ۴: ماده ۱۸-۶]\`.
- **مهلت تحویل گزارش چاپی و نمودارها:** حداکثر تا **بیستم (۲۰) هر ماه** همراه با جدول و نمودار توزیع نیروی انسانی به تفکیک جبهه کاری و تخصص \`[منبع ۴: ماده ۱۸-ح ردیف ۲]\`.`,
  simulatedOutputEn: `# Grounded HR & Site Admin Rules Synthesis (NotebookLM Step-1 Output)

## 1. Overtime Caps, HSE Red Line & 24/7 TBM Exemption
- **Internal Monthly Overtime Caps:** HQ \`50h\` · Technical Office \`65h\` (\`80h\` w/ written Deputy permit) · Station Sites (S-01..S-05) \`85h\` · Mechanized TBM Tunnel \`100h\` (24/7 continuous) \`[Source 1: Art. 25] [Source 2: HR Circular]\`.
- **HSE Critical Red Line:** Overtime \`> 110h/month\` OR \`> 14 consecutive working days\` without rest triggers mandatory shift halt & HSE review \`[Source 2: HSE Appendix]\`.
- **Verification Basis:** Stamped Social Security (SSO) insurance lists cross-checked against site time-card logs \`[Source 1: Art. 25]\`.

## 2. Sub-Clause 42-1 Lead Times & Consultant Mapping
- **Station Night Work:** Minimum **7 days (1 week)** prior formal written notice + on-site HSE officer \`[Source 1: Clause 42-1]\`.
- **Daytime / Holiday Overtime:** Minimum **24 hours** prior written notice to Supervising Consultant & PMC \`[Source 1: Clause 42-1]\`.
- **24/7 TBM Exemption:** Exempt from ad-hoc night-work permits per Article 25.
- **Consultant Mapping:** Central S-01 & North S-03 → Consultant A · West S-02 & West TBM → Consultant B · East S-04 & Terminal S-05 → Consultant C.

## 3. Camp Space Minimums & Welfare Obligations (Art. 20-H & Page 54)
- **Spaces (m²):** Workers' Dorms \`150\`, Execution \`30\`, Admin \`20\`, Tech Office \`18\`, Meeting \`18\`, Superintendent \`12\`, HSE/First-Aid \`12\`, Supervision \`13\`, Employer Rep/Chief Sup/Lab \`9 each\`, Worker WC \`8\`, Office WC/3×Hot Showers/Prayer \`6 each\`.
- **Mandatory Services:** Time-clock & uniforms (Item 10), ≥1 resident HSE officer (Item 7), 1 lab worker + 1 dedicated hospitality attendant (Item 9), 3 daily meals for ≥10 Employer/Consultant staff.

## 4. Monthly Manpower Reporting Window (Art. 18-6 & H-2)
- **Data Cutoff:** 16th of previous month to **15th of current month**.
- **Submission Deadline:** **20th of each month** with breakdown tables & charts by site zone and role.`,
  sampleCsv: `employee_id,full_name,unit_zone,role,station_code,consultant,overtime_hours,consecutive_days,sso_insured
HR-101,مهندس رضا کریمی,دفتر فنی,مهندس,HQ-01,PMC,72,11,Yes
HR-102,علی‌اکبر رضایی,جبهه TBM غربی,تکنسین,TBM-W,مشاور ب,96,13,Yes
HR-103,سعید محمدی,ایستگاه مرکزی,کارگر ماهر,S-01,مشاور الف,118,16,Yes
HR-104,مریم حسینی,ستاد مرکزی,کارشناس HR,HQ-01,PMC,44,6,Yes
HR-105,حسین جلالی,ایستگاه شرقی,افسر HSE,S-04,مشاور ج,82,12,Yes
HR-106,مهدی کاظمی,ایستگاه غربی,کارگر ماهر,S-02,مشاور ب,91,15,No`,
  assumptionsFa: [
    {
      title: 'منبع ۱: فایل PDF شرایط خصوصی قرارداد کارگاهی',
      detail: 'شامل ماده ۱۸ (تقویم گزارش ماهانه ۱۵ تا ۲۰)، ماده ۲۰-ح (رفاهیات و نفرات خدماتی)، ماده ۲۵ (کار شبانه، استثنای TBM و لیست بیمه ممهور) و بند ۴۲-۱ (فرجه ۷ روزه و ۲۴ ساعته).',
      sourceTag: 'Contract_Particular_Conditions.pdf'
    },
    {
      title: 'منبع ۲: بخشنامه داخلی اضافه‌کاری و ضوابط ایمنی HSE',
      detail: 'تعیین سقف ماهانه هر واحد (ستاد ۵۰، دفتر فنی ۶۵/۸۰، ایستگاه ۸۵، TBM ۱۰۰ ساعت) و آستانه خط قرمز خستگی (>۱۱۰ ساعت یا >۱۴ روز متوالی).',
      sourceTag: 'HR_Overtime_HSE_Policy.pdf'
    },
    {
      title: 'منبع ۳: پیوست جدول حداقل متراژ تجهیز کارگاه (صفحه ۵۴)',
      detail: 'جدول ۱۵ ردیفی حداقل متراژ فضاهای اسکان کارگری (۱۵۰ متر)، دفتر فنی (۱۸ متر)، HSE (۱۲ متر)، نظارت و سرویس‌های بهداشتی و حمام آب گرم.',
      sourceTag: 'Page54_Camp_Space_Table.pdf'
    },
    {
      title: 'منبع ۴ (ورودی گام ۲): فایل اکسل/CSV خروجی دستگاه کارت‌زن',
      detail: 'شامل ستون‌های کد پرسنلی، واحد، کد ایستگاه، ساعات اضافه‌کاری، روزهای کاری متوالی و وضعیت تطابق با لیست بیمه تأمین اجتماعی (بازه ۱۶ ماه قبل تا ۱۵ ماه جاری).',
      sourceTag: 'Attendance_16to15.csv'
    }
  ],
  assumptionsEn: [
    {
      title: 'Source 1: Contract Particular Conditions PDF',
      detail: 'Covers Art. 18 (15th cutoff / 20th submission), Art. 20-H (welfare & support staff), Art. 25 (night work, 24/7 TBM exemption, stamped SSO list), and Sub-Clause 42-1 (7-day & 24h notice).',
      sourceTag: 'Contract_Particular_Conditions.pdf'
    },
    {
      title: 'Source 2: Internal Overtime Circular & HSE Fatigue Rules',
      detail: 'Defines monthly caps per unit (HQ 50h, Tech Office 65h/80h, Stations 85h, TBM 100h) and HSE critical red line (>110h/mo or >14 consecutive days).',
      sourceTag: 'HR_Overtime_HSE_Policy.pdf'
    },
    {
      title: 'Source 3: Contract Page 54 Minimum Camp Space Table',
      detail: '15 mandatory camp space benchmarks (150m² worker dorms, 18m² tech office, 12m² HSE room, supervision rooms, hot showers, and restrooms).',
      sourceTag: 'Page54_Camp_Space_Table.pdf'
    },
    {
      title: 'Source 4 (For Step 2): Site Time-Card Attendance CSV',
      detail: 'Columns: employee_id, unit_zone, station_code, consultant, overtime_hours, consecutive_days, sso_insured covering the 16th-to-15th reporting cycle.',
      sourceTag: 'Attendance_16to15.csv'
    }
  ],
  extractionPromptFa: `بر اساس اسناد بارگذاری‌شده (شرایط خصوصی قرارداد، بخشنامه داخلی اضافه‌کاری و جدول صفحه ۵۴)، صرفاً با استناد دقیق به شماره ماده، بند و صفحه منابع، یک سند ساختاری Markdown در ۴ بخش خروجی بده تا در گام بعدی به Gemini Canvas و Claude Artifacts بدهم:
۱. سقف ماهانه اضافه‌کاری هر واحد (ستاد، دفتر فنی، ایستگاه‌ها، TBM)، خط قرمز HSE (ساعت و روز متوالی) و شرط لیست بیمه ممهور (ماده ۲۵).
۲. فرجه‌های قانونی اطلاع‌رسانی شب‌کاری و اضافه‌کاری روزانه (بند ۴۲-۱)، استثنای ۲۴ ساعته TBM و جدول نگاشت هر ایستگاه به مشاور ناظر (الف/ب/ج).
۳. جدول کامل حداقل متراژ ۱۵ فضای کمپ کارگاهی (صفحه ۵۴) و چک‌لیست تعهدات رفاهی و نفرات خدماتی (ماده ۲۰-ح).
۴. تقویم ارسال گزارش ماهانه نیروی انسانی (بازه ۱۶ تا ۱۵ و مهلت ارسال بیستم ماه طبق ماده ۱۸).
قانون سخت‌گیرانه: هیچ عددی را حدس نزن و جلوی هر قاعده، شماره ماده و منبع دقیق آن را داخل کروشه ذکر کن.`,
  extractionPromptEn: `Using ONLY the uploaded sources (Contract Particular Conditions, Internal Overtime Circular, and Page 54 Camp Space Table), produce a grounded Markdown brief with exact inline clause/page citations ready for Gemini Canvas and Claude Artifacts:
1. Monthly overtime caps per unit, HSE fatigue red line (>110h or >14 consecutive days), and stamped SSO insurance verification rule (Art. 25).
2. Sub-Clause 42-1 advance notice windows (7 days night shift, 24h daytime overtime), 24/7 TBM exemption, and Station-to-Consultant (A/B/C) mapping.
3. Full 15-row minimum camp space table (Page 54) and Article 20-H welfare/staffing obligations.
4. Article 18 monthly manpower reporting cycle (15th cutoff, 20th submission).
Strict rule: Never invent figures; cite exact article/clause numbers in brackets.`
};

