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
  titleFa: 'کارگاه ساخت ابزارهای تعاملی منابع انسانی و اداری در Claude Artifacts و Gemini Canvas',
  titleEn: 'HR & Admin Interactive Tool-Building Workshop in Claude Artifacts & Gemini Canvas',
  subtitleFa:
    '۵ تمرین عملی برای تبدیل ضوابط منابع انسانی، مفاد قراردادهای کارگاهی و دستورالعمل‌های داخلی سازمان به داشبوردهای مدیریتی React، ماشین‌حساب‌های هوشمند مهلت قراردادی، چک‌لیست ممیزی کمپ و آزمون‌ساز تعاملی بدون نیاز به دانش برنامه‌نویسی.',
  subtitleEn:
    '5 practical exercises transforming HR regulations, site contract clauses, and internal organizational directives into interactive React dashboards, deadline calculators, camp audit tools, and gamified quizzes without coding.',
  twoStepChainGuide: {
    titleFa: '💡 راهنمای اجرای کارگاه آموزشی (زنجیره دو مرحله‌ای: NotebookLM + Claude Artifacts / Gemini Canvas)',
    titleEn: '💡 2-Step Chained Workshop Playbook (NotebookLM + Claude Artifacts / Gemini Canvas)',
    descriptionFa:
      'برای دستیابی به بالاترین بازدهی در کارگاه آموزشی، فرآیند کار کارشناسان منابع انسانی و اداری را در قالب یک زنجیره دو مرحله‌ای مکمل اجرا کنید:',
    descriptionEn:
      'For maximum training ROI, run the HR & Admin curriculum as a two-stage cognitive workflow:',
    steps: [
      {
        stepNumber: 1,
        titleFa: 'گام اول در NotebookLM (تولید محتوا، تقاطع‌گیری و کشف قواعد)',
        titleEn: 'Step 1 in NotebookLM (Ground-Truth Discovery & Rule Extraction)',
        descriptionFa:
          'کارشناسان ابتدا اسناد قرارداد کارگاهی (منبع ۱) و بخشنامه داخلی اضافه‌کاری سازمان پیمانکار (منبع ۲) را در NotebookLM بارگذاری و جستجو می‌کنند و قوانین، سقف‌های مجاز، متراژهای الزامی صفحه ۵۴ و انحرافات کارگاهی را بدون خطای توهم استخراج می‌نمایند.',
        descriptionEn:
          'Specialists query the site contract clauses and internal overtime directive in NotebookLM to extract exact rules, caps, mandatory space tables, and site deviations with zero hallucination.'
      },
      {
        stepNumber: 2,
        titleFa: 'گام دوم در Claude Artifacts یا Gemini Canvas (تبدیل قواعد متنی به نرم‌افزار تعاملی)',
        titleEn: 'Step 2 in Claude Artifacts or Gemini Canvas (Turning Rules into Interactive Apps)',
        descriptionFa:
          'کارشناسان خروجی متنی و قواعد استخراج‌شده از NotebookLM را کپی کرده و به همراه یکی از ۵ پرامپت مهندسی‌شده زیر به Claude (قابلیت Artifacts) یا Gemini (قابلیت Canvas) می‌دهند تا در چند ثانیه داشبورد گرافیکی، ماشین‌حساب مهلت زمانی یا فرم ممیزی هوشمند تحویل بگیرند.',
        descriptionEn:
          'Specialists paste the extracted rules alongside one of the 5 structured prompts below into Claude Artifacts or Gemini Canvas to generate live interactive dashboards, calculators, and audit apps in seconds.'
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
