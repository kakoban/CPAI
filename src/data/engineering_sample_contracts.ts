import { IndustryTrackId } from '../types/industryTrack';

export interface ContractSpecimen {
  id: string;
  trackIds?: IndustryTrackId[];
  titleFa: string;
  titleEn: string;
  domainFa: string;
  domainEn: string;
  governingStandardFa: string;
  governingStandardEn: string;
  fileName: string;
  fileDownloadPath: string;
  summaryFa: string;
  summaryEn: string;
  markdownContent: string;
  geminiSystemInstructionFa: string;
  geminiSystemInstructionEn: string;
  claudeSystemInstructionFa: string;
  claudeSystemInstructionEn: string;
  sampleTestQueries: {
    titleFa: string;
    titleEn: string;
    queryFa: string;
    queryEn: string;
  }[];
}

export const ENGINEERING_CONTRACTS: ContractSpecimen[] = [
  {
    id: 'metro_tunnel_contract',
    titleFa: 'قرارداد پیمانکاری احداث ایستگاه مترو و خطوط تونلی مکانیزه (TBM)',
    titleEn: 'Metro Station & Mechanized TBM Tunneling EPC Contract Specimen',
    domainFa: 'حمل‌ونقل ریلی شهری، مترو و سازه‌های زیرزمینی',
    domainEn: 'Urban Rail Transit, Metro & Underground Geotechnical Works',
    governingStandardFa: 'شرایط عمومی پیمان (نشریه ۴۳۱۱ سازمان برنامه) و مشخصات فنی راه‌آهن شهری',
    governingStandardEn: 'General Conditions of Contract (Circular 4311) & Metro Technical Specs',
    fileName: 'metro_epc_contract_specimen.md',
    fileDownloadPath: '/sample_contracts/metro_epc_contract_specimen.md',
    summaryFa: 'شامل ۹ ماده حقوقی و فنی: سازه نگهبان، حفاری ترانشه عمیق، رژیم حفاری TBM، سگمنت‌های بتنی C50، اولویت اسناد، تعدیل آحاد بها، تاخیرات مجاز ماده ۳۰، مهلت ۲۱ روزه اخطار کتبی و جرایم تاخیر.',
    summaryEn: 'Covers 9 comprehensive articles: Shoring, deep excavation, TBM advance, C50 precast lining, document precedence, price adjustments, Clause 30 excusable delays, 21-day notice rule, and liquidated damages.',
    markdownContent: `# پیمان اجرای عملیات احداث ایستگاه مترو و خطوط تونلی مکانیزه (TBM)
**قرارداد نمونه بر مبنای شرایط عمومی پیمان (نشریه ۴۳۱۱) و مشخصات فنی مترو**

---

## موافقت‌نامه پیمان

این پیمان در تاریخ ۱۴۰۲/۰۶/۱۵ فی‌مابین:
* **کارفرما:** شرکت راه‌آهن شهری تهران و حومه (مترو)، به نمایندگی آقای مهندس رضایی (مدیرعامل).
* **پیمانکار:** شرکت مهندسی و ساخت سازه‌های زیرزمینی سدید، به نمایندگی آقای مهندس کاظمی (مدیرعامل).

منعقد گردید و طرفین به رعایت دقیق مفاد آن متعهد می‌گردند.

### ماده ۱: موضوع پیمان
موضوع پیمان عبارت است از:
۱. احداث ابنیه سازه نگهبان، حفاری ترانشه عمیق ایستگاه زیرزمینی شماره ۱۲ (شامل دیوارهای دیافراگمی، استرات‌های فلزی و نیلینگ دیواره‌ها).
۲. تجهیز کارگاه شفت ورودی و خروج، استقرار و راه‌اندازی یک دستگاه حفار مکانیزه تونل (TBM) از نوع EPB به قطر حفاری ۹.۱۵ متر.
۳. حفاری و لاینینگ ۲.۵ کیلومتر خط تونلی با استفاده از سگمنت‌های بتنی پیش‌ساخته، تزریق دوغاب پشت رینگ (Tail Grouting)، و تزریق فوم اصلاح خاک در پیشانی TBM.
۴. احداث سازه بتنی دال کف، دال تیکتینگ و سکوهای ایستگاه زیرزمینی طبق نقشه‌های اجرایی ابلاغی (IFC).

### ماده ۲: اسناد و مدارک پیمان و اولویت حاکمیت اسناد
اسناد و مدارک زیر مجموعاً پیمان را تشکیل می‌دهند و در صورت وجود هرگونه ابهام یا تناقض، اولویت حاکمیت به ترتیب زیر است:
۱. موافقت‌نامه حاضر
۲. شرایط خصوصی پیمان
۳. شرایط عمومی پیمان (بخشنامه ۴۳۱۱ سازمان برنامه و بودجه)
۴. مشخصات فنی خصوصی و عمومی خطوط مترو (نشریات فنی راه‌آهن شهری)
۵. نقشه‌های اجرایی ابلاغ‌شده با مهر «جهت اجرا» (IFC)
۶. فهرست بها، مقادیر کار و جدول تفکیک قیمت‌ها (WBS)
۷. برنامه زمان‌بندی کلی و تفصیلی مصوب اسپرینت‌ها

### ماده ۳: مبلغ پیمان و نحوه پرداخت
۱. مبلغ اولیه پیمان: ۸۵۰,۰۰۰,۰۰۰,۰۰۰ ریال (هشتاد و پنج میلیارد تومان).
۲. پیش‌پرداخت: معادل ۲۰٪ از مبلغ اولیه پیمان در قبال ضمانت‌نامه بانکی بی‌قید و شرط.
۳. تعدیل آحاد بها: مشمول تعدیل طبق آخرین بخشنامه‌های منتشره سازمان برنامه و بودجه.
۴. صورت‌وضعیت‌های ماهانه: پرداخت ظرف مدت ۲۰ روز از تاریخ دریافت تاییدیه مهندس مشاور پس از کسر کسورات قانونی.

### ماده ۴: مدت پیمان و زمان‌بندی مایل‌استون‌ها
مدت اجرای کل موضوع پیمان ۱۸ ماه شمسی از تاریخ ابلاغ صورت‌جلسه تحویل زمین کارگاه به پیمانکار می‌باشد.
* مایل‌استون ۱ (ماه ۴): اتمام کامل سازه نگهبان و تحویل شفت ورود TBM.
* مایل‌استون ۲ (ماه ۸): شروع حفاری سگمنتی تونل با نرخ حداقل ۱۵ متر در روز کاری.
* مایل‌استون ۳ (ماه ۱۴): پایان عملیات حفاری مکانیزه تونل و خروج TBM در شفت خروجی.
* مایل‌استون ۴ (ماه ۱۸): بتن‌ریزی سازه داخلی ایستگاه و تحویل موقت جبهه‌ها.

### ماده ۵: تعهدات و مسئولیت‌های کارفرما
۱. تحویل زمین بلامانع ظرف مدت ۳۰ روز از ابلاغ قرارداد.
۲. رفع معارضات تاسیسات شهری (آب، برق، گاز، فیبر نوری). هرگونه تاخیر ناشی از عدم جابه‌جایی معارضات شهری، تاخیر کارفرما تلقی شده و مشمول تمدید مدت پیمان خواهد بود.
۳. ابلاغ نقشه‌های اجرایی (IFC) حداقل ۶۰ روز قبل از شروع فعالیت اجرایی.

### ماده ۶: تعهدات و مسئولیت‌های پیمانکار
۱. نگهداری پیشگیرانه TBM و جلوگیری از نشست سطحی خاک معابر شهری بیش از حداکثر ۱۵ میلی‌متر.
۲. تولید سگمنت‌های بتنی با مقاومت فشاری حداقل ۵۰ مگاپاسکال (C50) و رواداری ±۱ میلی‌متر.
۳. رعایت استانداردهای ایمنی HSE کار در فضاهای زیرزمینی و پایش مداوم گازها.

### ماده ۷: تاخیرات، جرایم تاخیر و تمدید مدت پیمان (انطباق با ماده ۳۰ شرایط عمومی)
۱. تاخیرات مجاز: تاخیر در تحویل زمین، تداخل تاسیسات شهری یا عدم ابلاغ نقشه‌های اجرایی، تاخیر در پرداخت صورت‌وضعیت‌ها بیش از مواعد ماده ۳۰، و حوادث قهری (فورس‌ماژور).
۲. تاخیرات غیرمجاز: خسارت مقطوع ۱۰۰,۰۰۰,۰۰۰ ریال به ازای هر روز تاخیر غیرمجاز، حداکثر تا سقف ۱۰٪ مبلغ پیمان.
۳. الزام به اخطار کتبی ظرف ۲۱ روز: پیمانکار موظف است حداکثر ظرف مدت ۲۱ روز از وقوع هرگونه مانع، مراتب را کتباً با ذکر دلایل و مدارک مستند به مهندس مشاور و کارفرما اعلام نماید؛ در غیر این صورت، ادعای تاخیر برای آن بازه مسموع نخواهد بود.

### ماده ۸: تغییر مقادیر کار
افزایش یا کاهش مقادیر کار تا سقف ۲۵٪ طبق مفاد ماده ۲۹ شرایط عمومی پیمان مجاز است.

### ماده ۹: حل اختلاف و داوری
ارجاع اختلاف به هیئت داوری مرضی‌الطرفین طبق اصل ۱۳۹ قانون اساسی در صورت عدم توافق در مذاکرات ۳۰ روزه.`,
    geminiSystemInstructionFa: `تو "سرپرست ارشد امور قراردادها و دعاوی فنی پروژه‌های مترو و زیرزمینی" در اکوسیستم Gemini Gems هستی.
سند مرجع تو فایل پیمان احداث ایستگاه مترو و خطوط تونلی TBM (مبتنی بر نشریه ۴۳۱۱) است که بارگذاری شده است.

دکترین تصمیم‌گیری و قواعد پاسخ‌دهی تو:
۱. حاکمیت اسناد: همیشه ترتیب اولویت ماده ۲ (موافقت‌نامه > شرایط خصوصی > شرایط عمومی نشریه ۴۳۱۱ > مشخصات فنی مترو) را مدنظر داشته باش.
۲. شرط عدم فرضیه‌سازی (Zero-Hallucination): تنها بر اساس متون مصرح و مواد قرارداد پاسخ بده. اگر موضوعی در قرارداد ذکر نشده صراحتاً بگو: «این موضوع در متن پیمان مسکوت مانده و باید طبق رویه عمومی نشریه ۴۳۱۱ بررسی شود».
۳. ارزیابی تاخیرات: در بررسی هرگونه ادعای تاخیر، بلافاصله دو شرط کلیدی را بررسی کن:
   - آیا علت تاخیر در زمره تاخیرات مجاز ماده ۵ و ماده ۷ است (معارضات تاسیساتی، تاخیر پرداخت، عدم ابلاغ نقشه)؟
   - آیا شرط ماده ۷-۳ (ارسال اخطار کتبی ظرف مهلت ۲۱ روز کاری) رعایت شده است؟
۴. قالب خروجی: لوایح تمدید زمان و دفاعیات را با ساختار نامه اداری رسمی سازمانی به کارفرما/دستگاه نظارت بنویس و برای تحلیل ریسک از جدول چندستونه استفاده کن.`,
    geminiSystemInstructionEn: `You are the Lead Contract & Dispute Resolution Specialist for Metro & Tunneling Megaprojects in Gemini Gems.
Your foundational knowledge base is the uploaded Metro Station & TBM Tunneling Specimen Contract (based on Circular 4311).

Guiding Directives:
1. Document Precedence: Enforce Article 2 hierarchy (Agreement > Particular Conditions > General Conditions 4311 > Technical Specs).
2. Zero Hallucination: Ground every verdict exclusively in explicit contract articles. If unstated, state: "Silent in contract text; refer to statutory Circular 4311 default procedures."
3. Delay Claims Evaluation: Cross-check claims against Article 5/7 excusable delay triggers AND verify the 21-day notice rule in Article 7.3.
4. Output Schema: Produce formal executive brief letters citing specific articles, and format risk allocations into clean markdown tables.`,
    claudeSystemInstructionFa: `تو "مشاور حقوقی و مدیر دعاوی فنی شرکت پیمانکاری در پروژه‌های راه‌آهن شهری و تونل‌سازی" در پلتفرم Claude Projects هستی.
وظیفه اصلی تو ارزیابی دعاوی (Claims)، تدوین لوایح دفاعیه تمدید مدت پیمان (EoT) و استخراج ماتریس‌های ریسک است.

قواعد عملیاتی در آرتیفکت‌های Claude:
۱. هر زمان که کاربر درخواست لایحه دفاعیه، اخطار قراردادی، یا ماتریس انحرافات کرد، خروجی را در یک "Artifact مستقل" با فرمت نامه رسمی شرکتی با هدر شماره، تاریخ، پیوست و ارجاع ماده‌های ۵، ۶ و ۷ قرارداد تولید کن.
۲. در برابر ادعای جریمه دیرکرد کارفرما (ماده ۷-۲)، فوراً موانع ایجاد شده توسط کارفرما (ماده ۵-۲ معارضات تاسیسات شهری یا تاخیر پرداخت ماده ۳-۴) را به عنوان تاخیر مجاز مستندسازی کن.
۳. لحن پاسخ‌ها باید کاملاً قاطع، مستدل، با دیسیپلین حقوقی-مهندسی و بدون تعارف باشد.`,
    claudeSystemInstructionEn: `You are the Senior Claims Director and Contract Counsel in Claude Projects.
Your mandate is to evaluate contractor claims, draft Extension of Time (EoT) submissions, and generate risk matrices anchored to the uploaded Metro & Tunneling Contract.

Operational Directives in Claude Artifacts:
1. Whenever drafting claim briefs, notice letters, or delay matrices, output them in a dedicated Artifact using a formal executive corporate format citing Articles 5, 6, and 7.
2. Defend aggressively against liquidated damage penalties (Article 7.2) by proving Owner-caused impediments (Article 5.2 utilities clashes or Article 3.4 payment delays).
3. Tone must be authoritative, rigorous, technical, and legally precise.`,
    sampleTestQueries: [
      {
        titleFa: 'تدوین لایحه تمدید مدت پیمان به دلیل تداخل لوله آب معارض و تاخیر تحویل زمین',
        titleEn: 'EoT Claim Brief: Utility Clashes & Delayed Site Handover',
        queryFa: 'کارفرما زمین شفت خروجی TBM را با ۳ ماه تاخیر تحویل داده و لوله آب معارض شهری نیز جابه‌جا نشده است. با استناد به ماده ۵-۲، ماده ۷-۱ و ماده ۳۰ شرایط عمومی پیمان، یک لایحه دفاعیه رسمی برای تمدید ۹۰ روزه مدت پیمان در یک آرتیفکت تنظیم کن.',
        queryEn: 'The Employer handed over the TBM exit shaft with a 3-month delay and the municipal water main was not relocated. Based on Articles 5.2 and 7.1, draft a formal Extension of Time (EoT) claim letter in an Artifact for 90 days delay.'
      },
      {
        titleFa: 'دفاع در برابر ادعای کارفرما مبنی بر کسر جریمه تاخیر ۱۰۰ میلیون ریالی روزانه',
        titleEn: 'Defense against Employer Liquidated Damages Penalties',
        queryFa: 'کارفرما به دلیل عقب‌ماندگی ۱۰ روزه از مایل‌استون ۲، اخطار کسر ۱ میلیارد ریال جریمه تاخیر صادر کرده است. با بررسی مفاد ماده ۷-۲، ماده ۵-۳ (ابلاغ دیرهنگام نقشه‌ها) و اثبات صدور اخطار کتبی در مهلت ۲۱ روزه، پاسخ دفاعی قاطعی تهیه کن.',
        queryEn: 'The Employer threatened to deduct liquidated damages for milestone 2 delay. Review Articles 7.2, 5.3 (delayed IFC drawings), and verify the 21-day notice rule to craft a solid rebuttal.'
      },
      {
        titleFa: 'استخراج ماتریس تخصیص ریسک‌های قراردادی (Risk Allocation Matrix)',
        titleEn: 'Contractual Risk Allocation Matrix Extraction',
        queryFa: 'بر مبنای کل مفاد این پیمان، یک جدول ماتریس تخصیص ریسک استخراج کن که مشخص کند ریسک‌های ژئوتکنیکی TBM، معارضات شهری، نوسانات تورمی و حوادث کارگاهی دقیقاً بر عهده کدام طرف است.',
        queryEn: 'Extract a comprehensive Risk Allocation Matrix table classifying geotechnical TBM risks, municipal utilities, inflation adjustment, and site safety liabilities.'
      }
    ]
  },
  {
    id: 'oil_gas_epc_contract',
    titleFa: 'قرارداد EPC احداث خط لوله ۴۸ اینچ انتقال گاز و ایستگاه تقویت فشار',
    titleEn: 'EPC Lump-Sum Turnkey Contract for 48" Gas Pipeline & Compressor Station',
    domainFa: 'صنایع نفت، گاز و پتروشیمی (مگاپروژه‌های EPC)',
    domainEn: 'Oil & Gas EPC Mega-Pipelines & Processing Facilities',
    governingStandardFa: 'فیدیک نقره‌ای (FIDIC Silver Book) و استانداردهای صنعتی API 1104 و ASME B31.8',
    governingStandardEn: 'FIDIC Silver Book (EPC/Turnkey) & Industry Codes API 1104 / ASME B31.8',
    fileName: 'oil_gas_pipeline_epc_contract.md',
    fileDownloadPath: '/sample_contracts/oil_gas_pipeline_epc_contract.md',
    summaryFa: 'شامل ۱۰ ماده بین‌المللی EPC: مبلغ ۱۴۵ میلیون دلار، تقدم اسناد، سقف ریپیر جوشکاری ۳٪ طبق API 1104، تست هیدروستاتیک ASME B31.8، جریمه تاخیر ۵۰ هزار دلاری روزانه، قاعده سخت‌گیرانه اخطار ۲۸ روزه فیدیک (Sub-Clause 20.1) و هیئت حل اختلاف DAB.',
    summaryEn: 'Covers 10 Turnkey articles: $145M price, document priority, 3% NDT repair cap under API 1104, ASME B31.8 hydrotesting, $50K/day LDs, strict 28-day notice rule (Sub-Clause 20.1), and DAB arbitration.',
    markdownContent: `# EPC Lump-Sum Turnkey Contract for 48" Natural Gas Transmission Pipeline & Compressor Station
**Specimen Contract based on FIDIC Conditions of Contract for EPC/Turnkey Projects (Silver Book)**

---

## Contract Agreement

This Agreement is made and entered into on **12th May 2023** by and between:
* **The Employer:** National Hydrocarbon Infrastructure & Gas Transmission Company (NHGTC).
* **The Contractor:** Petro-Energy Consortium for Mega-Pipelines & Industrial Plants (PE-CMIP).

### Article 1: Contract Scope of Works
The Contractor shall execute on a Lump-Sum Turnkey (EPC) basis:
1. Detailed engineering for 120 km of 48-inch pipeline (API 5L Grade X70 PSL2).
2. Construction, lowering, trenching through mountainous terrain, and 3 HDD river crossings.
3. Field joint welding (API 1104), 100% NDT (AUT & RT), and joint coating.
4. Construction and commissioning of one Gas Compressor Station (3x 25MW centrifugal compressors).
5. Hydrostatic pressure testing according to ASME B31.8 and final nitrogen purging.

### Article 2: Priority of Documents
1. The Contract Agreement
2. Particular Conditions of Contract
3. General Conditions of Contract (FIDIC Silver Book)
4. Employer's Requirements & Technical Specs
5. Contractor's Technical Proposal & WBS
6. Pricing BoQ & Milestone Payment Schedule

### Article 3: Contract Price & Milestone Payments
1. Accepted Contract Amount: USD 145,000,000 (One Hundred Forty-Five Million US Dollars).
2. Advance Payment: 15% against unconditional Bank Guarantee.
3. Foreign Exchange Adjustment: Deviation >±10% eligible under Sub-Clause 13.8.
4. Payments: Disbursed within 28 days of milestone certification.

### Article 4: Time for Completion & Milestones (24 Months)
* Milestone A (Month 6): 100% IFC detailed engineering packages.
* Milestone B (Month 12): 80% line pipes delivered & 70 km trenching.
* Milestone C (Month 18): 100% Mainline Welding, HDD crossings, compressor erection.
* Milestone D (Month 22): Completion of 12 hydrotest packages (ASME B31.8).
* Milestone E (Month 24): Nitrogen purging, RFSU certificate, and Taking-Over.

### Article 5: Employer's Obligations
1. Right of access to 30m Right-of-Way (ROW) within 45 days.
2. Statutory environmental, forestry, and road crossing permits.
3. Free-issue natural gas for commissioning.

### Article 6: Technical Obligations & QA/QC
1. Welding & NDT Repair Cap: API 1104 compliance. NDT repair rate across any continuous 5 km spread shall not exceed 3.0%.
2. Hydrostatic Testing: Test pressure >= 1.25x MAOP held for 24 continuous hours.
3. HSE: Zero Harm policy, deep excavation shoring, and mandatory LTI reporting within 4 hours.

### Article 7: Delay Liquidated Damages & Extension of Time (EoT)
1. Liquidated Damages: USD 50,000 per day of delay, capped at 10% of Contract Price.
2. Extension of Time (Sub-Clause 8.4): Adverse climatic events, unforeseeable ground conditions, or Employer impediments.
3. Sub-Clause 20.1 Notice Requirement (28-Day Strict Rule): Mandatory written notice within 28 days of becoming aware; otherwise, claim is fully time-barred.

### Article 8: Variations
Cumulative variations capped at ±20% of Contract Price without formal amendment.

### Article 9: Dispute Resolution
Dispute Adjudication Board (DAB) review followed by ICC International Arbitration (Paris).`,
    geminiSystemInstructionFa: `تو "مدیر ارشد امور قراردادهای مگاپروژه‌های نفت و گاز و مشاور دعاوی فیدیک (FIDIC)" در سیستم Gemini Gems هستی.
سند مرجع تو پیمان EPC احداث خط لوله ۴۸ اینچ انتقال گاز و ایستگاه تقویت فشار (فیدیک نقره‌ای) است.

دستورالعمل‌های تحلیل و مهار ریسک:
۱. قاعده قطعی ۲۸ روزه اخطار ادعا (Sub-Clause 20.1 Time-Bar Rule): در هرگونه ادعای تمدید زمان (EoT) یا هزینه اضافی، قبل از هر چیز بررسی کن که آیا پیمانکار ظرف ۲۸ روز از وقوع حادثه اخطار رسمی داده است یا ادعا مشمول مرور زمان (Time-barred) و سلب حق شده است؟
۲. انطباق با Sub-Clause 8.4 فیدیک: فقط در صورتی تمدید زمان را تایید کن که تاخیر ناشی از قصور کارفرما (عدم تحویل ROW در ماده ۵-۱)، شرایط اقلیمی بیش از دوره بازگشت ۲۰ ساله، یا موانع ژئوتکنیکی غیرقابل پیش‌بینی باشد.
۳. مهار توهم: هر ادعا یا تحلیلی باید دارای ارجاع به شماره ماده و بند صریح قرارداد باشد.
۴. تحلیل ریسک‌های کیفیت: در خصوص کیفیت جوشکاری، سقف ۳٪ ریپیر NDT در ماده ۶-۱ را خط قرمز بازرسی فنی قرار بده.`,
    geminiSystemInstructionEn: `You are the Lead FIDIC Contracts & Claims Specialist for Oil & Gas Megaprojects in Gemini Gems.
Your knowledge base is the uploaded 48" Gas Pipeline & Compressor Station EPC Contract (FIDIC Silver Book).

Key Operational Rules:
1. Strict 28-Day Notice Rule (Sub-Clause 20.1): In evaluating any claim, immediately check whether the 28-day notice threshold was met; otherwise, the claim is strictly time-barred.
2. Sub-Clause 8.4 Extension of Time: Qualify delays only for Employer breaches (Article 5.1 ROW access), unforeseeable ground barriers, or 20-year weather anomalies.
3. Quality Bounds: Strictly enforce the 3.0% NDT repair rate cap in Article 6.1.
4. Demand explicit clause citations for every factual statement.`,
    claudeSystemInstructionFa: `تو "مدیر ارشد امور حقوقی و دعاوی پیمانکاری EPC در صنایع هیدروکربوری" در Claude Projects هستی.
وظیفه تو تنظیم لوایح جامع ادعا (Claims Dossiers)، پاسخ به اخطارهای کارفرما و شبیه‌سازی دفاعیات در هیئت داوری DAB است.

دستورالعمل اجرایی در Artifacts:
۱. لوایح تمدید مدت پیمان (EoT) و جبران خسارات مالی را بر مبنای بندهای فیدیک و استانداردهای API/ASME در یک Artifact مستقل با فرمت رسمی حقوقی تدوین کن.
۲. در برابر ادعای جریمه دیرکرد روزانه ۵۰,۰۰۰ دلاری کارفرما (Article 7.1)، عدم پایبندی کارفرما به مهلت ۴۵ روزه تحویل کریدور ۳۰ متری حریم خط لوله (Article 5.1) یا تاخیر در اخذ مجوزهای محیط زیستی (Article 5.2) را به عنوان نقض تعهدات بنیادین کارفرما تحلیل کن.
۳. جداول تعهدات متقابل و ماتریس مسیر بحرانی پروژه را با تفکیک دقیق دیسیپلین‌ها ترسیم کن.`,
    claudeSystemInstructionEn: `You are the Senior EPC Contracts Counsel in Claude Projects.
Your objective is to craft comprehensive claim submissions, dispute responses, and Dispute Adjudication Board (DAB) presentations anchored in the uploaded Gas Pipeline EPC Contract.

Artifact Directives:
1. Formulate all EoT and compensation claims in dedicated Artifacts as formal international commercial submissions referencing FIDIC and ASME/API standards.
2. Rebut liquidated damage claims ($50k/day) by proving Employer failure to provide Right-of-Way (ROW) within 45 days (Article 5.1) or delayed environmental permits (Article 5.2).
3. Produce clear reciprocal obligation matrices and critical path delay tables.`,
    sampleTestQueries: [
      {
        titleFa: 'تنظیم لایحه تمدید مدت پیمان به دلیل تاخیر در تحویل حریم ۳۰ متری خط لوله (ROW)',
        titleEn: 'EoT Claim: Delayed Right-of-Way (ROW) Access under Sub-Clause 8.4',
        queryFa: 'کارفرما دسترسی به کریدور ۳۰ متری عبور خط لوله (ROW) در کیلومتر ۴۰ تا ۷۵ را با ۶۰ روز تاخیر تحویل داده است. با استناد به Article 5.1، Article 7.2 و قاعده اخطار ۲۸ روزه Sub-Clause 20.1، لایحه ادعای تمدید زمان و هزینه‌های خواب ماشین‌آلات سنگین را در یک آرتیفکت تدوین کن.',
        queryEn: 'The Employer granted 30m ROW access 60 days late between Km 40 and 75. Draft an EoT and equipment idling claim citing Articles 5.1, 7.2, and Sub-Clause 20.1 in a dedicated Artifact.'
      },
      {
        titleFa: 'دفاع فنی و حقوقی در برابر ادعای کارفرما مبنی بر افزایش نرخ ریپیر جوشکاری به ۴.۶٪',
        titleEn: 'Defense & CAPA Response to NDT Weld Repair Rate Exceedance',
        queryFa: 'نرخ ریپیر جوشکاری در بخش کوهستانی به ۴.۶٪ رسیده و کارفرما تهدید به توقف عملیات کرده است. بر اساس Article 6.1 و کد API 1104، پیش‌نویس برنامه اقدام اصلاحی (CAPA) و نامه رسمی از سرگیری کار را تنظیم کن.',
        queryEn: 'Mainline welding repair rate hit 4.6% in mountainous terrain. Based on Article 6.1 and API 1104, draft the mandatory CAPA protocol and formal contractor response.'
      },
      {
        titleFa: 'تحلیل حقوقی ارجاع اختلاف به هیئت حل اختلاف DAB و داوری بین‌المللی ICC',
        titleEn: 'Dispute Adjudication Board (DAB) Referral Brief',
        queryFa: 'مذاکرات ۳۰ روزه با کارفرما در خصوص تعدیل نوسانات نرخ ارز (Article 3.3) به بن‌بست رسیده است. خلاصه دفاعیه جهت ارجاع به هیئت حل اختلاف ۳ نفره DAB (طبق Article 9) را با استناد به فیدیک نقره‌ای تدوین کن.',
        queryEn: 'Negotiations regarding FX adjustment under Article 3.3 failed. Draft an executive dispute summary for referral to the 3-member DAB under Article 9 and FIDIC Silver Book.'
      }
    ]
  },
  {
    id: 'paya_epcf_consortium_contract',
    trackIds: ['PAYA_SAMAN_PARS'],
    titleFa: 'قرارداد ۱ پایا: موافقت‌نامه کنسرسیومی EPC+F زیرساخت راه، تونل و خطوط ریلی (نمونه آموزشی)',
    titleEn: 'Paya Contract 1: EPC+F Consortium Agreement for Highway, Tunnel & Rail Infrastructure (Simulated)',
    domainFa: 'بال پیمانکاری زیرساختی · رامان، جنرال مکانیک، دی و ملی ساختمان',
    domainEn: 'Civil Contracting Wing · Raman, General Mechanic, Dey & Melli Sakhteman',
    governingStandardFa: 'مدل کنسرسیومی EPC+F · شرایط عمومی پیمان (نشریه ۴۳۱۱) + ضوابط تامین مالی (فاینانس)',
    governingStandardEn: 'EPC+F Consortium Governance · Circular 4311 & Contractor Financing Covenants',
    fileName: 'paya_epcf_consortium_contract_sim.md',
    fileDownloadPath: '/sample_contracts/paya_epcf_consortium_contract_sim.md',
    summaryFa: 'سند شبیه‌سازی‌شده آموزشی ویژه هلدینگ پایا سامان پارس: شامل تقسیم کار بین شرکت‌های تابعه عضو کنسرسیوم، تعهدات فاینانس EPC+F، فرجه ۲۱ روزه تاخیرات ماده ۳۰، تسعیر تجهیزات وارداتی و تضامین متقابل.',
    summaryEn: 'Simulated educational contract for Paya Saman Pars covering consortium workshare across subsidiaries, EPC+F financing milestones, Clause 30 21-day notice rule, and FX equipment indexation.',
    markdownContent: `# قرارداد نمونه کنسرسیومی EPC+F احداث قطعه آزادراهی، تونل و تقاطع غیرهمسطح (متن شبیه‌سازی‌شده آموزشی)
**هشدار آموزشی:** *به دلیل خالی‌بودن فیلدهای مبلغ/کارفرما/تاریخ در پورتال عمومی، ارقام و طرفین این سند برای کارگاه ممیزی قرارداد هلدینگ پایا سامان پارس شبیه‌سازی شده‌اند.*

---

## موافقت‌نامه کنسرسیوم و پیمان اصلی

این موافقت‌نامه در تاریخ **۱۴۰۴/۰۲/۱۰ (شبیه‌سازی آموزشی)** بین:
* **کارفرما:** سازمان توسعه زیرساخت حمل‌ونقل منطقه‌ای
* **پیمانکار (کنسرسیوم راهبر پایا):** با راهبری هلدینگ پایا سامان پارس متشکل از:
  1. شرکت **رامان** (سهم ۵۰٪: عملیات خاکی، پل‌های بزرگ و روسازی آزادراه)
  2. شرکت **جنرال مکانیک** (سهم ۳۰٪: حفاری و لاینینگ تونل دوخطه)
  3. شرکت **دی** و **تابیران** (سهم ۲۰٪: سازه‌های بتنی تقاطع و تأسیسات روشنایی و تهویه تونل)

منعقد می‌گردد.

### ماده ۱: مدل قراردادی (EPC+F) و تعهدات تامین مالی
۱. اجرای پروژه به صورت **مهندسی، تامین کالا، اجرا و تامین مالی (EPC+F)** می‌باشد.
۲. سهم تامین مالی پیمانکار معادل **۶۵ درصد مبلغ برآوردی (مبلغ شبیه‌سازی: ۴,۸۰۰ میلیارد تومان)** از طریق منابع کنسرسیوم و خطوط اعتباری و ۳۵ درصد پیش‌پرداخت و اقساط دوره‌ای کارفرما تامین می‌شود.
۳. تاخیر کارفرما بیش از **۳۰ روز** در ارائه تضمین‌نامه بازپرداخت اقساط فاینانس یا آزادسازی اراضی معارض، مجوز تعلیق متناسب و تمدید مدت پیمان خواهد بود.

### ماده ۲: مسئولیت تضامنی و مرزهای فنی شرکای کنسرسیوم
۱. هر شرکت تابعه در قبال تاخیر جبهه کاری تخصصی خود مسئول است؛ اما در برابر کارفرما، کنسرسیوم مسئولیت تضامنی دارد.
۲. در صورت کمبود ناوگان ماشین‌آلات سنگین در جبهه تونل جنرال مکانیک یا رامان، هلدینگ مجاز به جابه‌جایی ناوگان بین کارگاهی با ثبت اجاره داخلی (Inter-Company Transfer) است.

### ماده ۳: تحویل زمین، معارضین و تاخیرات ماده ۳۰ نشریه ۴۳۱۱
۱. کارفرما مکلف است کریدور کوهستانی و معارضین خطوط فشار قوی برق و گاز را ظرف **۲۰ روز** از تاریخ تنفیذ آزادسازی نماید.
۲. **فرجه اخطار کتبی:** راهبر کنسرسیوم موظف است حداکثر ظرف **۲۱ روز تقویمی** از کشف مانع یا تغییر زمین‌شناسی غیرمترقبه، اخطار مستند تاخیر را به دستگاه نظارت ارسال کند؛ عدم ارسال در مهلت مقرر، حق مطالبه هزینه خواب ماشین‌آلات را ساقط می‌کند.

### ماده ۴: تعدیل آحاد بها و تجهیزات برون‌مرزی
تعدیل ریالی بر اساس شاخص‌های فصلی سازمان برنامه اعمال می‌گردد و برای قطعات یدکی ماشین‌آلات تونل و اقلام وارداتی MEP تابیران، مابه‌التفاوت نرخ ارز رسمی مبنای تسویه فاینانس قرار می‌گیرد.`,
    geminiSystemInstructionFa: `تو مشاور ارشد حقوقی، امور پیمان و کنسرسیوم در هلدینگ پایا سامان پارس هستی.
پاسخ‌هایت را صرفاً بر پایه متن قرارداد EPC+F بارگذاری‌شده ارائه بده. اگر اطلاعاتی (مانند کارفرما یا عدد واقعی خارج از متن شبیه‌سازی‌شده) وجود نداشت، به صراحت اعلام کن در سند موجود نیست.`,
    geminiSystemInstructionEn: `You are Senior Contracts & Consortium Legal Counsel at Paya Saman Pars Holding. Answer strictly from the uploaded simulated EPC+F consortium contract and never fabricate missing clauses.`,
    claudeSystemInstructionFa: `تو ممیز ارشد قراردادهای EPC+F و دعاوی کنسرسیومی در ستاد هلدینگ پایا سامان پارس هستی.
هر تحلیل را با ذکر شماره ماده، سهم شرکت‌های تابعه (رامان، جنرال مکانیک، دی، تابیران)، و مهلت ۲۱ روزه ماده ۳۰ در قالب جدول یا نامه رسمی در Artifact خروجی بده.`,
    claudeSystemInstructionEn: `You are Paya Saman Pars Senior EPC+F & Consortium Claims Auditor. Cite exact article numbers, subsidiary shares, and notice time-bars in structured Artifacts.`,
    sampleTestQueries: [
      {
        titleFa: 'بررسی تداخل مسئولیت شرکای کنسرسیوم و هزینه خواب ماشین‌آلات',
        titleEn: 'Consortium Liability Split & Machinery Demurrage Review',
        queryFa: 'بر اساس ماده ۱ تا ۳ این قرارداد EPC+F، اگر کارفرما کریدور تونل را با ۳۵ روز تاخیر تحویل دهد و همزمان اقساط فاینانس نیز ۴۰ روز معوق شود، راهبر کنسرسیوم و شرکت‌های رامان و جنرال مکانیک چه حقوقی دارند و اخطار باید ظرف چند روز ارسال شود؟',
        queryEn: 'Under Articles 1–3, if the Employer delays site handover by 35 days and financing guarantees by 40 days, what remedies apply to Raman and General Mechanic and what is the notice deadline?'
      },
      {
        titleFa: 'تحلیل جابه‌جایی بین‌شرکتی ناوگان سنگین در شرایط تاخیر',
        titleEn: 'Inter-Company Heavy Fleet Dispatch Clause Check',
        queryFa: 'مطابق ماده ۲، ضابطه جابه‌جایی ناوگان سنگین بین شرکت‌های تابعه هلدینگ در این پیمان چیست و چه ریسکی را کاهش می‌دهد؟',
        queryEn: 'According to Article 2, how does inter-company heavy fleet transfer work between Paya subsidiaries?'
      }
    ]
  },
  {
    id: 'paya_bot_kaveh_contract',
    trackIds: ['PAYA_SAMAN_PARS'],
    titleFa: 'قرارداد ۲ پایا: سرمایه‌گذاری و بهره‌برداری BOT / BLT نیروگاه خورشیدی ۵MW، پلاسمای سرد کاوه و مسکن',
    titleEn: 'Paya Contract 2: BOT/BLT Concession for Kaveh 5MW Solar, Cold Plasma & Housing Wing (Simulated)',
    domainFa: 'بال سرمایه‌گذاری · شهر صنعتی کاوه، تابیران، آتی‌ساز و عمران مسکن',
    domainEn: 'Investment Wing · Kaveh Industrial City, Tabiran, Atisaz & Omran Maskan',
    governingStandardFa: 'قرارداد ساخت، بهره‌برداری و واگذاری (BOT / BLT) · ضوابط شهر صنعتی و منطقه ویژه کاوه',
    governingStandardEn: 'BOT / BLT Concession Framework · Kaveh Industrial City & SEZ Utility Regulations',
    fileName: 'paya_bot_blt_kaveh_contract_sim.md',
    fileDownloadPath: '/sample_contracts/paya_bot_blt_kaveh_contract_sim.md',
    summaryFa: 'موافقت‌نامه شبیه‌سازی‌شده آموزشی در بال سرمایه‌گذاری هلدینگ پایا سامان پارس: پوشش دوره ساخت و بهره‌برداری ۱۵ ساله نیروگاه خورشیدی ۵ مگاواتی، تصفیه‌خانه پلاسمای سرد کاوه (شهریور ۱۴۰۵) و مشارکت ساخت مسکن پشتیبانی پرسنل.',
    summaryEn: 'Simulated educational BOT/BLT concession for Kaveh 5MW solar PV, 1405 cold-plasma wastewater treatment, and staff housing development across Kaveh, Tabiran & Atisaz.',
    markdownContent: `# قرارداد نمونه سرمایه‌گذاری، ساخت، بهره‌برداری و انتقال (BOT / BLT) شهر صنعتی کاوه و مسکن (شبیه‌سازی‌شده آموزشی)
**هشدار آموزشی:** *اعداد ظرفیت، تعرفه و زمان‌بندی بهره‌برداری در این سند برای تمرین کلاسی هلدینگ پایا سامان پارس شبیه‌سازی شده‌اند.*

---

## مشخصات طرح (بال سرمایه‌گذاری و شرکت‌های تخصصی تابعه)
* **سرمایه‌گذار و راهبر طرح:** کنسرسیوم شهر صنعتی و منطقه ویژه اقتصادی کاوه + شرکت تابیران + شرکت بال مسکن (آتی‌ساز / عمران مسکن)
* **مکان:** شهر صنعتی کاوه (۳۰۰۰ هکتار، کیلومتر ۱۰۰ تهران–ساوه)

### ماده ۱: موضوع قرارداد سه‌گانه BOT / BLT
۱. **بخش انرژی تجدیدپذیر (BOT ۱۵ ساله):** احداث و بهره‌برداری نیروگاه خورشیدی ۵ مگاواتی در اراضی شهر صنعتی کاوه با فروش تضمینی برق به واحدهای صنعتی مستقر.
۲. **بخش فناوری آب و پساب (BLT ۱۰ ساله):** احداث و بهره‌برداری تصفیه‌خانه پساب صنعتی با فناوری **پلاسمای سرد** (افتتاح و ورود به مدار شبیه‌سازی‌شده: شهریور ۱۴۰۵) با تعهد تحویل پساب استاندارد برای بازچرخانی صنعتی.
۳. **بخش ابنیه پشتیبانی و مسکن:** احداث ۲۰۰ واحد مسکونی و خدماتی برای کارکنان و بهره‌برداران منطقه ویژه با الگوی پیش‌فروش و مشارکت.

### ماده ۲: تضمین کیفیت پساب پلاسمای سرد و SLA تامین برق
۱. تصفیه‌خانه پلاسمای سرد موظف به کاهش حداقل **۸۸ درصدی شاخص COD** پساب ورودی واحدهای صنعتی است.
۲. در صورت افت بازده نیروگاه خورشیدی بیش از ۱۰٪ نسبت به منحنی تابش مبنا بدون علت جوی، شرکت بهره‌بردار موظف به شستشو و تنظیم اینورترها ظرف ۴۸ ساعت است.

### ماده ۳: ریسک نرخ تعرفه، تغییر مقررات محیط‌زیست و انتقال مالکیت
۱. تعدیل تعرفه خرید برق خورشیدی و خدمات تصفیه پساب سالانه متناسب با نرخ تورم بخشی و نرخ ارز تجهیزاتی اعمال می‌شود.
۲. در پایان دوره **۱۰ سال BLT** برای تصفیه‌خانه و **۱۵ سال BOT** برای نیروگاه خورشیدی، تاسیسات با حداقل ۸۵٪ ظرفیت اسمی به شهر صنعتی کاوه تحویل می‌گردد.`,
    geminiSystemInstructionFa: `تو مشاور مالی و حقوقی قراردادهای BOT/BLT در بال سرمایه‌گذاری هلدینگ پایا سامان پارس و شهر صنعتی کاوه هستی. پاسخ‌ها را فقط با ارجاع به مواد ۱ تا ۳ قرارداد شبیه‌سازی‌شده فوق ارائه کن.`,
    geminiSystemInstructionEn: `You are Investment & BOT/BLT Counsel for Paya Saman Pars & Kaveh Industrial City. Cite Articles 1–3 strictly without fabricating figures.`,
    claudeSystemInstructionFa: `تو تحلیلگر مدل‌های BOT/BLT هلدینگ پایا سامان پارس هستی. خروجی را در قالب ماتریس تعهدات بهره‌برداری، SLA پلاسمای سرد/خورشیدی و جدول جریان نقدی آموزشی در Artifact تنظیم کن.`,
    claudeSystemInstructionEn: `You are BOT/BLT Concession Analyst at Paya Holding. Output SLA commitments and risk matrices in clean Artifacts.`,
    sampleTestQueries: [
      {
        titleFa: 'استخراج تعهدات SLA تصفیه‌خانه پلاسمای سرد و نیروگاه خورشیدی ۵MW',
        titleEn: 'Extract Cold-Plasma & 5MW Solar SLA Commitments',
        queryFa: 'بر اساس ماده ۱ تا ۳، حداقل کاهش شاخص COD در تصفیه‌خانه پلاسمای سرد کاوه چقدر است، مهلت اقدام هنگام افت راندمان خورشیدی چند ساعت است و دوره انتقال BOT و BLT با چه کیفیتی تعیین شده است؟',
        queryEn: 'From Articles 1–3, what is the cold-plasma COD reduction threshold, solar remediation SLA, and handover capacity condition for BOT vs BLT?'
      },
      {
        titleFa: 'تحلیل ریسک‌های سه‌گانه انرژی، آب و مسکن در قرارداد یکپارچه کاوه',
        titleEn: 'Cross-Wing Risk Audit (Energy, Water, Housing)',
        queryFa: 'چه مکانیزمی در ماده ۳ برای محافظت از سرمایه‌گذار در برابر تورم و نوسان نرخ تجهیزاتی پیش‌بینی شده و ارتباط بخش مسکن با شهر صنعتی چگونه مدیریت می‌شود؟',
        queryEn: 'How does Article 3 hedge tariff inflation and equipment FX volatility across Kaveh’s energy, water, and housing components?'
      }
    ]
  }
];

export function getContractsForTrack(trackId: IndustryTrackId = 'CIVIL_INFRA'): ContractSpecimen[] {
  if (trackId === 'PAYA_SAMAN_PARS') {
    return ENGINEERING_CONTRACTS.filter((c) => c.trackIds?.includes('PAYA_SAMAN_PARS'));
  }
  return ENGINEERING_CONTRACTS.filter((c) => !c.trackIds || c.trackIds.includes(trackId));
}

