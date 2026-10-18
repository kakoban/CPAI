export interface EngineeringDataset {
  id: string;
  titleFa: string;
  titleEn: string;
  domainFa: string;
  domainEn: string;
  descriptionFa: string;
  descriptionEn: string;
  fileName: string;
  fileDownloadPath: string;
  rowCount: number;
  columnCount: number;
  columnsFa: string[];
  columnsEn: string[];
  previewRows: Record<string, string | number>[];
  rawCsv: string;
  claudeDashboardPromptFa: string;
  claudeDashboardPromptEn: string;
  geminiPythonAnalyticsPromptFa: string;
  geminiPythonAnalyticsPromptEn: string;
}

export const ENGINEERING_DATASETS: EngineeringDataset[] = [
  {
    id: 'metro_station_tbm',
    titleFa: 'دیتاست عملکرد ساخت ایستگاه مترو و حفاری مکانیزه TBM',
    titleEn: 'Metro Underground Station & TBM Tunneling Progress',
    domainFa: 'مهندسی عمران، مترو و تونل‌سازی شهری',
    domainEn: 'Urban Metro & Mechanized Tunneling Engineering',
    descriptionFa: 'شامل داده‌های پیشرفت فیزیکی ماهانه، ارزش کسب‌شده (EVM: PV, EV, AC, SPI, CPI)، متراژ حفاری دستگاه TBM، تعداد رینگ سگمنتی و روزهای تاخیر در مسیر بحرانی.',
    descriptionEn: 'Monthly physical progress, EVM metrics (PV, EV, AC, SPI, CPI), TBM tunneling advance, precast lining rings, and critical path delays.',
    fileName: 'metro_station_construction_data.csv',
    fileDownloadPath: '/sample_datasets/metro_station_construction_data.csv',
    rowCount: 12,
    columnCount: 14,
    columnsFa: ['ماه/دوره', 'بخش ایستگاه/تونل', 'پیشرفت برنامه‌ای ٪', 'پیشرفت واقعی ٪', 'ارزش برنامه‌ای (M$)', 'ارزش کسب‌شده (M$)', 'هزینه واقعی (M$)', 'شاخص زمان SPI', 'شاخص هزینه CPI', 'متراژ TBM', 'رینگ سگمنتی', 'تاخیر بحرانی (روز)', 'حوادث HSE', 'وضعیت'],
    columnsEn: ['Month', 'Section', 'Planned %', 'Actual %', 'PV ($M)', 'EV ($M)', 'AC ($M)', 'SPI', 'CPI', 'TBM (m)', 'Rings', 'Delay (Days)', 'HSE Incidents', 'Status'],
    previewRows: [
      { Month: '2024-M01', Section: 'Station Box Excavation', 'Planned %': 8.5, 'Actual %': 8.0, SPI: 0.94, CPI: 0.97, 'TBM (m)': 0, Delay: 2, Status: 'On-Track' },
      { Month: '2024-M03', Section: 'Shoring & Diaphragm Wall', 'Planned %': 28.0, 'Actual %': 24.0, SPI: 0.86, CPI: 0.92, 'TBM (m)': 0, Delay: 8, Status: 'Critical-Delay' },
      { Month: '2024-M05', Section: 'TBM Tunnel Drive 1', 'Planned %': 48.0, 'Actual %': 42.0, SPI: 0.88, CPI: 0.92, 'TBM (m)': 185, Delay: 10, Status: 'Delay-Mitigated' },
      { Month: '2024-M08', Section: 'Segmental Lining', 'Planned %': 78.0, 'Actual %': 73.5, SPI: 0.94, CPI: 0.97, 'TBM (m)': 365, Delay: 6, Status: 'Recovering' },
      { Month: '2024-M12', Section: 'Trackwork Installation', 'Planned %': 100.0, 'Actual %': 97.0, SPI: 0.97, CPI: 0.99, 'TBM (m)': 420, Delay: 3, Status: 'Substantially-Completed' }
    ],
    rawCsv: `Month_Period,Station_Section,Planned_Progress_Pct,Actual_Progress_Pct,Planned_Value_M_USD,Earned_Value_M_USD,Actual_Cost_M_USD,SPI,CPI,TBM_Advance_Meters,Concrete_Lining_Rings,Critical_Delays_Days,Safety_Incidents,Status
2024-M01,Station Box Excavation,8.5,8.0,1.70,1.60,1.65,0.94,0.97,0,0,2,0,On-Track
2024-M02,Station Box Excavation,18.0,16.5,3.60,3.30,3.50,0.92,0.94,0,0,4,1,Minor-Delay
2024-M03,Shoring & Diaphragm Wall,28.0,24.0,5.60,4.80,5.20,0.86,0.92,0,0,8,0,Critical-Delay
2024-M04,Shoring & Diaphragm Wall,39.0,33.0,7.80,6.60,7.30,0.85,0.90,0,0,12,0,Critical-Delay
2024-M05,TBM Tunnel Drive 1,48.0,42.0,9.60,8.40,9.10,0.88,0.92,185,123,10,0,Delay-Mitigated
2024-M06,TBM Tunnel Drive 1,59.0,52.0,11.80,10.40,11.20,0.88,0.93,240,160,11,1,Behind-Schedule
2024-M07,Segmental Lining,69.0,63.0,13.80,12.60,13.20,0.91,0.95,310,206,9,0,Recovering
2024-M08,Segmental Lining,78.0,73.5,15.60,14.70,15.10,0.94,0.97,365,243,6,0,Recovering
2024-M09,Platform Slab Concrete,85.0,81.0,17.00,16.20,16.80,0.95,0.96,410,273,5,0,On-Track
2024-M10,Platform Slab Concrete,91.0,87.5,18.20,17.50,17.90,0.96,0.98,420,280,4,0,On-Track
2024-M11,Trackwork Installation,96.0,92.0,19.20,18.40,18.80,0.96,0.98,420,280,5,0,On-Track
2024-M12,Trackwork Installation,100.0,97.0,20.00,19.40,19.60,0.97,0.99,420,280,3,0,Substantially-Completed`,
    claudeDashboardPromptFa: `تو یک مهندس ارشد کنترل پروژه و طراح ارشد داشبوردهای مدیریتی فرانت‌اند (React + Tailwind CSS) هستی.
من داده‌های عملکرد ماهانه ساخت ایستگاه و تونل مترو را در ادامه در اختیارت قرار می‌دهم.

وظیفه تو این است که در یک "Artifact اختصاصی و مستقل"، یک داشبورد تحلیلی مدرن، تعاملی و فارسی (RTL) با مشخصات زیر بسازی:
۱. کارت‌های کلیدی (KPI Cards): میانگین SPI و CPI، انحراف کل پیشرفت (Variance)، مجموع متراژ حفاری TBM و کل روزهای تاخیر در مسیر بحرانی با برچسب‌های رنگی مناسب.
۲. نمودار مقایسه S-Curve: مقایسه پیشرفت فیزیکی برنامه‌ای در برابر پیشرفت فیزیکی واقعی در طول ۱۲ ماه به همراه خط روند ارزش کسب‌شده.
۳. فیلتر بخش‌های پروژه: قابلیت انتخاب بین کل پروژه، بخش ایستگاه و سازه نگهبان، و بخش تونل و TBM.
۴. جدول تحلیل وضعیت تاخیرات با وضعیت‌های رنگی (سبز: On-Track، زرد: Recovering، قرمز: Critical-Delay).
۵. باکس تحلیل متنی استراتژیک در زیر داشبورد: ارائه ۳ اقدام اصلاحی فنی برای جبران تاخیرات تیرهای سازه نگهبان و تسریع لاینینگ.

داده‌های ورودی (CSV):
[داده‌های CSV مترو را اینجا پیست کنید]`,
    claudeDashboardPromptEn: `You are a Lead Project Controls Engineer and expert React/Tailwind Dashboard Designer.
Below is the monthly performance dataset for our underground metro station and TBM tunneling project.

Your task is to build a fully interactive, production-ready React Dashboard inside a dedicated Claude Artifact:
1. Top KPI Summary Cards: Average SPI, CPI, Schedule Variance, Total TBM Advance Meters, and Total Critical Path Delays.
2. S-Curve Progress Chart: Visual comparison of Planned Progress vs. Actual Progress across the 12-month timeline.
3. Interactive Section Filter: Toggle between All Sections, Station Deep Excavation, and TBM Tunneling.
4. Risk & Delay Matrix Table: Categorized by status pills (Green for On-Track, Orange for Recovering, Red for Critical-Delay).
5. Executive Strategy Brief: Bottom section outlining 3 actionable mitigation steps for shoring delays and critical path recovery.

Input CSV:
[Paste Metro CSV Data Here]`,
    geminiPythonAnalyticsPromptFa: `تو دانشمند ارشد داده در حوزه مدیریت مگاپروژه‌های ساختمانی و مترو هستی.
داده‌های CSV پیوست مربوط به پیشرفت ساخت یک ایستگاه مترو و خط تونلی TBM در طول یک سال است.

وظایف تحلیلی تو در محیط پایتون (Gemini Python Analysis):
۱. یک اسکریپت کامل پایتون با کتابخانه‌های pandas, matplotlib, seaborn بنویس که:
   - منحنی S-Curve پیشرفت برنامه‌ای و واقعی را ترسیم کند.
   - همبستگی (Correlation) میان تاخیر در مسیر بحرانی (Critical_Delays_Days) و افت شاخص SPI را محاسبه کند.
۲. با اعمال یک مدل رگرسیون ساده بر نرخ پیشرفت ماهانه TBM و بتن‌ریزی سگمنت، پیش‌بینی کن تاریخ اتمام واقعی پروژه (Projected Completion Date) چند ماه با برنامه مصوب اختلاف خواهد داشت؟
۳. سه دلیل ریشه‌ای (Root Causes) افت SPI در ماه‌های ۳ و ۴ را با توجه به داده‌های سازه نگهبان استخراج و فرموله کن.`,
    geminiPythonAnalyticsPromptEn: `You are a Senior Project Data Scientist specializing in Infrastructure & Metro Megaprojects.
Below is a 12-month execution dataset for an underground metro station and TBM drive.

Tasks for Python Data Analysis:
1. Write a complete Python script using pandas, matplotlib, and seaborn:
   - Plot the Planned vs. Actual progress S-curve alongside EVM cost trends.
   - Calculate the statistical correlation between Critical Path Delays and SPI erosion.
2. Fit a regression model on monthly TBM advance rates to forecast the net project completion variance in days.
3. Isolate the operational root causes behind the Q1 performance slump in shoring/diaphragm wall activities and output mitigation actions.`
  },
  {
    id: 'oil_gas_pipeline_epc',
    titleFa: 'دیتاست پیشرفت و کنترل کیفیت EPC خط لوله و ایستگاه تقویت فشار گاز',
    titleEn: 'Oil & Gas Pipeline & Compressor Station EPC Quality & Progress',
    domainFa: 'صنایع نفت، گاز و پتروشیمی (پروژه‌های EPC)',
    domainEn: 'Oil & Gas EPC Mega-infrastructure & Quality Control',
    descriptionFa: 'شامل داده‌های ۱۰ ساب‌سیستم خط انتقال گاز، نفر-ساعت کارکرد، متراژ جوشکاری (اینچ‌قطر)، نرخ ریپیر تست‌های NDT، پکیج‌های هیدروتست، تامین متریال و شاخص‌های SPI/CPI.',
    descriptionEn: 'EPC pipeline subsystems, earned manhours, welding diameter-inches, NDT repair rates, hydrotest approvals, MTO availability, and SPI/CPI risk scores.',
    fileName: 'oil_gas_pipeline_epc_data.csv',
    fileDownloadPath: '/sample_datasets/oil_gas_pipeline_epc_data.csv',
    rowCount: 10,
    columnCount: 14,
    columnsFa: ['کد زیرسیستم', 'عنوان بخش پروژه', 'دیسیپلین مهندسی', 'نفر-ساعت برنامه', 'نفر-ساعت واقعی', 'اینچ‌قطر جوش برنامه', 'اینچ‌قطر جوش واقعی', 'نرخ ریپیر NDT ٪', 'پکیج‌های هیدروتست', 'تامین متریال ٪', 'حوادث LTI', 'شاخص SPI', 'شاخص CPI', 'سطح ریسک'],
    columnsEn: ['Code', 'Subsystem Name', 'Discipline', 'Planned MH', 'Actual MH', 'Plan Weld (Dia-In)', 'Act Weld (Dia-In)', 'NDT Repair %', 'Hydrotest Packs', 'Material %', 'HSE LTI', 'SPI', 'CPI', 'Risk Level'],
    previewRows: [
      { Code: 'SS-01', Name: 'Pipeline Trenching & ROW', Discipline: 'Civil', 'Planned MH': 14500, 'Actual MH': 15200, 'NDT %': 0.0, SPI: 0.96, Risk: 'Low' },
      { Code: 'SS-02', Name: 'Mainline Welding Section A', Discipline: 'Piping/Welding', 'Planned MH': 38000, 'Actual MH': 41200, 'NDT %': 2.1, SPI: 0.94, Risk: 'Medium' },
      { Code: 'SS-03', Name: 'Mainline Welding Section B (Mountainous)', Discipline: 'Piping/Welding', 'Planned MH': 45000, 'Actual MH': 52000, 'NDT %': 4.6, SPI: 0.85, Risk: 'High-Critical' },
      { Code: 'SS-06', Name: 'HDD River Crossing Boring', Discipline: 'Specialist Trenchless', 'Planned MH': 22000, 'Actual MH': 28500, 'NDT %': 1.8, SPI: 0.78, Risk: 'High-Critical' },
      { Code: 'SS-07', Name: 'Compressor Station Piping & Spools', Discipline: 'Mechanical/Piping', 'Planned MH': 56000, 'Actual MH': 60500, 'NDT %': 2.4, SPI: 0.93, Risk: 'Medium' }
    ],
    rawCsv: `Subsystem_Code,Subsystem_Name,Discipline,Planned_Manhours,Actual_Manhours,Welding_Dia_Inch_Planned,Welding_Dia_Inch_Actual,NDT_Repair_Rate_Pct,Hydrotest_Packs_Approved,Material_Delivery_Pct,HSE_LTI_Incidents,SPI,CPI,Risk_Level
SS-01,Pipeline Trenching & ROW,Civil,14500,15200,0,0,0.0,0,98.5,0,0.96,0.95,Low
SS-02,Mainline Welding Section A,Piping/Welding,38000,41200,42000,39500,2.1,0,95.0,0,0.94,0.91,Medium
SS-03,Mainline Welding Section B (Mountainous),Piping/Welding,45000,52000,42000,36800,4.6,0,88.0,0,0.85,0.81,High-Critical
SS-04,AUT & NDT Joint Inspection,QA/QC,12000,13100,0,0,3.2,0,100.0,0,0.92,0.92,Medium
SS-05,Field Joint Coating & Wrapping,Corrosion/Protection,18500,19800,0,0,1.2,0,94.0,0,0.93,0.93,Low
SS-06,HDD River Crossing Boring,Specialist Trenchless,22000,28500,4500,3900,1.8,0,82.0,1,0.78,0.77,High-Critical
SS-07,Compressor Station Piping & Spools,Mechanical/Piping,56000,60500,58000,54200,2.4,8,91.0,0,0.93,0.90,Medium
SS-08,Compressor Station Equipment Erection,Mechanical,28000,29200,0,0,0.0,4,96.0,0,0.97,0.96,Low
SS-09,Hydrostatic Testing Packages (Pack 1-12),Pre-commissioning,16000,18500,0,0,0.8,9,92.0,0,0.88,0.86,Medium
SS-10,Tie-in & Nitrogen Purging,Pre-commissioning,9500,9800,8500,8200,1.1,3,99.0,0,0.96,0.97,Low`,
    claudeDashboardPromptFa: `تو مدیر ارشد کنترل پروژه و QA/QC در مگاپروژه‌های خطوط لوله انتقال نفت و گاز (EPC) هستی.
من جدول عملکرد زیرسیستم‌های خط لوله و ایستگاه تقویت فشار را در اختیارت قرار می‌دهم.

وظیفه تو این است که در یک "Artifact مستقل در Claude (کامپوننت React + Tailwind)"، یک داشبورد فرماندهی مهندسی و مدیریت کیفیت بسازی که شامل بخش‌های زیر باشد:
۱. کارت‌های کلیدی کنترل کیفیت و بهره‌وری:
   - مجموع اینچ‌قطر جوشکاری واقعی در برابر برنامه
   - میانگین نرخ ریپیر جوش (NDT Repair Rate ٪) با برجسته‌سازی بخش‌های بحرانی بالای ۳٪
   - نسبت بهره‌وری نفر-ساعت (Productivity Ratio: Planned MH / Actual MH)
   - تعداد پکیج‌های هیدروتست تایید شده از کل پکیج‌ها
۲. نمودار مقایسه‌ای پیشرفت دیسیپلین‌ها (سیویل، پایپینگ، بازرسی، مکانیکال و پیش‌راه‌اندازی).
۳. ماتریس رتبه‌بندی ریسک ساب‌سیستم‌ها با فیلتر سریع بر اساس سطح ریسک (High-Critical, Medium, Low).
۴. بخش هشدارهای بحرانی مهندسی: تشریح دلایل انحراف ساب‌سیستم حفاری افقی HDD و جوشکاری در مناطق کوهستانی به همراه راهکارهای جبرانی.

داده‌های ورودی (CSV):
[داده‌های CSV نفت و گاز را اینجا پیست کنید]`,
    claudeDashboardPromptEn: `You are an EPC Project Controls Director and Lead QA/QC Manager in the Oil & Gas sector.
Below is the execution and inspection dataset for our gas transmission pipeline and compressor station package.

Build an executive command dashboard inside a Claude React Artifact:
1. Quality & Production KPIs: Total Welded Dia-Inches vs. Target, Overall NDT Repair Rate % (with alerts for segments >3%), Manhour Productivity Index, and Hydrotest Completion Rate.
2. Discipline Breakdown: Visual progress comparison across Civil, Piping, QA/QC, and Commissioning.
3. Risk Heatmap Table: Categorized by Low, Medium, and High-Critical tags with dynamic sorting.
4. Engineering Alert Center: Detailed drill-down on HDD trenchless boring bottlenecks and mountainous section welding delays with concrete mitigation protocols.

Input CSV:
[Paste Oil & Gas CSV Data Here]`,
    geminiPythonAnalyticsPromptFa: `تو دانشمند داده و متخصص قابلیت اطمینان و کیفیت صنعتی در مهندسی نفت و گاز هستی.
داده‌های عملکردی پروژه خط لوله انتقال گاز را تحلیل کن و:
۱. کدهای پایتون بنویس تا رابطه رگرسیونی بین افزایش نرخ ریپیر جوش (NDT_Repair_Rate_Pct) و اضافه مصرف نفر-ساعت (Actual_Manhours - Planned_Manhours) را محاسبه کند.
۲. با آزمون‌های آماری مشخص کن کدام متغیر (کمبود متریال، نرخ ریپیر جوشکاری یا شرایط جغرافیایی کوهستانی) بیشترین اثر منفی را روی شاخص SPI ساب‌سیستم‌ها گذاشته است؟
۳. یک جدول پیش‌بینی ریسک برای فاز پیش‌راه‌اندازی و تست‌های هیدروستاتیک با راهکار کاهش ریسک به زبان فارسی فنی تولید کن.`,
    geminiPythonAnalyticsPromptEn: `You are a Senior Industrial Data Scientist & Reliability Lead in Oil & Gas EPC projects.
Analyze the pipeline project CSV dataset and:
1. Write Python code to quantify the regression relationship between NDT Repair Rates and Manhour cost overruns.
2. Perform sensitivity analysis identifying whether material shortages, weld repair spikes, or terrain complexity caused the biggest drag on subsystem SPI.
3. Generate a predictive risk register for upcoming hydrotest packages and nitrogen purging operations.`
  },
  {
    id: 'refinery_equipment_qa',
    titleFa: 'دیتاست بازرسی فنی، پانچ‌لیست و پیش‌راه‌اندازی تجهیزات پالایشگاه',
    titleEn: 'Refinery Process Equipment Inspection & Punch List Clearance',
    domainFa: 'بازرسی فنی، تست‌های مکانیکی و راه‌اندازی پالایشگاه',
    domainEn: 'Refinery Mechanical Completion & Commissioning QA/QC',
    descriptionFa: 'شامل تگ تجهیزات فرآیندی (برج‌های تقطیر، مبدل‌ها، پمپ‌ها، کمپرسورهای گازی، مخازن ذخیره)، کدهای حاکم (ASME, API, TEMA)، پانچ‌های گروه A و B، تست‌های ارتعاش و وضعیت صدور گواهی RFSU.',
    descriptionEn: 'Process equipment tags (distillation columns, exchangers, API pumps, compressors, tanks), governing codes, Cat A/B punches, vibration velocities, and RFSU readiness.',
    fileName: 'refinery_equipment_inspection_data.csv',
    fileDownloadPath: '/sample_datasets/refinery_equipment_inspection_data.csv',
    rowCount: 8,
    columnCount: 12,
    columnsFa: ['تگ تجهیز', 'نوع تجهیز', 'واحد فرآیندی', 'کد استاندارد', 'فشار عملیاتی (بار)', 'فشار تست هیدروستاتیک', 'پانچ بحرانی A', 'پانچ جزئی B', 'ارتعاش (mm/s)', 'خوردگی مجاز (mm)', 'تاییدیه بازرسی', 'وضعیت راه‌اندازی'],
    columnsEn: ['Tag', 'Type', 'Unit', 'Code', 'Op Pressure (bar)', 'Hydrotest (bar)', 'Cat A Punch', 'Cat B Punch', 'Vibration (mm/s)', 'Corr Allow (mm)', 'QA Signoff', 'Status'],
    previewRows: [
      { Tag: 'V-101', Type: 'Vacuum Distillation Column', Unit: 'CDU-01', Code: 'ASME Sec VIII Div 1', 'Cat A': 0, 'Cat B': 4, 'Vibration': 0.0, Signoff: 'Approved', Status: 'Ready-for-Feed' },
      { Tag: 'E-102B', Type: 'Crude Preheat Exchanger', Unit: 'CDU-01', Code: 'TEMA-R / ASME VIII', 'Cat A': 1, 'Cat B': 3, 'Vibration': 0.0, Signoff: 'Pending-Gasket', Status: 'Punch-Clearance' },
      { Tag: 'P-105B', Type: 'Crude Charge Pump (Turbine)', Unit: 'Offsites', Code: 'API 610 11th Ed', 'Cat A': 2, 'Cat B': 5, 'Vibration': 4.8, Signoff: 'Rejected-Align', Status: 'Field-Rework' },
      { Tag: 'C-201', Type: 'Centrifugal Gas Compressor', Unit: 'HDT-02', Code: 'API 617 8th Ed', 'Cat A': 1, 'Cat B': 6, 'Vibration': 1.8, Signoff: 'Pending-Lube', Status: 'Pre-commissioning' },
      { Tag: 'R-401', Type: 'Hydrotreater Reactor', Unit: 'HDT-02', Code: 'ASME Sec VIII Div 2', 'Cat A': 0, 'Cat B': 1, 'Vibration': 0.0, Signoff: 'Approved', Status: 'Catalyst-Loading' }
    ],
    rawCsv: `Equipment_Tag,Equipment_Type,Process_Unit,Governing_Standard,Operating_Pressure_Bar,Hydrotest_Pressure_Bar,Punch_Cat_A_Blockers,Punch_Cat_B_Minor,Vibration_Velocity_mm_s,Corrosion_Allowance_mm,QA_QC_Signoff,Commissioning_Status
V-101,Vacuum Distillation Column,CDU-01,ASME Sec VIII Div 1,3.5,6.2,0,4,0.0,3.0,Approved,Ready-for-Feed
E-102A,Crude Preheat Heat Exchanger,CDU-01,TEMA-R / ASME VIII,28.0,42.5,0,2,0.0,4.5,Approved,Hydrotested
E-102B,Crude Preheat Heat Exchanger,CDU-01,TEMA-R / ASME VIII,28.0,42.5,1,3,0.0,4.5,Pending-Gasket-Fix,Punch-Clearance
P-105A,Crude Charge Pump (Motor Driven),Offsites,API 610 11th Ed,45.0,68.0,0,1,2.1,0.0,Approved,Cold-Commissioned
P-105B,Crude Charge Pump (Turbine Driven),Offsites,API 610 11th Ed,45.0,68.0,2,5,4.8,0.0,Rejected-Alignment,Field-Rework
C-201,Centrifugal Gas Compressor,HDT-02,API 617 8th Ed,85.0,128.0,1,6,1.8,0.0,Pending-Lube-Oil-Flush,Pre-commissioning
TK-301,Floating Roof Crude Storage Tank,Tank-Farm,API 650 12th Ed,Atm,Water-Fill,0,3,0.0,6.0,Approved,Settlement-Tested
R-401,Hydrotreater Reactor (Cr-Mo-V),HDT-02,ASME Sec VIII Div 2,145.0,218.0,0,1,0.0,6.5,Approved,Catalyst-Loading`,
    claudeDashboardPromptFa: `تو مدیر ارشد پیش‌راه‌اندازی و بازرسی فنی پالایشگاه (Commissioning & QA/QC Lead) هستی.
من داده‌های پانچ‌لیست و وضعیت تست تجهیزات کلیدی واحدهای فرآیندی پالایشگاه را به پیوست این پیام می‌دهم.

وظیفه تو این است که در یک "Artifact مستقل در Claude (یک کامپوننت React + Tailwind)"، داشبورد آماده‌سازی برای راه‌اندازی (RFSU Readiness Dashboard) را بسازی:
۱. کارت‌های کلیدی: تعداد کل تجهیزات تایید شده، تعداد پانچ‌های گروه A (مسدودکننده راه‌اندازی)، میانگین ارتعاش تجهیزات دوار و درصد آمادگی تزریق خوراک (Feed Readiness ٪).
۲. جدول تفکیکی پانچ‌لیست به تفکیک واحدها (CDU, HDT, Offsites, Tank Farm) با برچسب‌های مشخص.
۳. بخش قرمز هشدار عدم انطباق (Red Flag Focus): تحلیل چرایی رد شدن پمپ P-105B به دلیل ارتعاش ۴.۸ میلی‌متر بر ثانیه و راهکار رفع ناترازی (Misalignment) طبق استاندارد API 610.
۴. دکمه‌های شبیه‌سازی تایید پانچ‌ها و بروزرسانی لحظه‌ای وضعیت به Ready for Startup.

داده‌های ورودی (CSV):
[داده‌های CSV تجهیزات پالایشگاه را اینجا پیست کنید]`,
    claudeDashboardPromptEn: `You are the Lead Refinery Commissioning & Technical Inspection Manager.
Below is the Punch List and Mechanical Completion log for critical process units and rotary/static equipment.

Build a Ready-for-Startup (RFSU) Tracking Dashboard inside a Claude React Artifact:
1. Executive Metrics: Total Equipment Count, Cleared vs. Blocked by Cat A Punches, Rotary Vibration Health %, and Overall Feed Ingress Readiness %.
2. Equipment Matrix by Process Unit (CDU, HDT, Tank Farm) with interactive inspection stage badges.
3. High-Priority NCR Alert: Technical dissection of turbine pump P-105B rejected for 4.8 mm/s vibration against API 610 limits with step-by-step alignment remediation protocol.
4. Interactive checklist toggling punch items to simulate RFSU certificate generation.

Input CSV:
[Paste Refinery CSV Data Here]`,
    geminiPythonAnalyticsPromptFa: `تو مهندس ارشد پایپینگ، متالورژی و ارتعاشات صنعتی هستی.
داده‌های تست تجهیزات پالایشگاهی را بررسی کن و:
۱. با اسکریپت پایتون، نمودار توزیع فشار تست هیدروستاتیک در برابر فشار عملیاتی را بر اساس کدهای استاندارد ASME Sec VIII Div 1 & 2 ترسیم کن.
۲. ارتعاش ۴.۸ میلی‌متر بر ثانیه پمپ P-105B را طبق جدول ارتعاشات مجاز استاندارد ISO 10816 و API 610 ارزیابی کن و مشخص کن آیا در محدوده خطرناک (Alarm/Trip) قرار دارد یا خیر؟
۳. ماتریس پاک‌سازی پانچ‌های بحرانی (Punch Cat A Clearance Schedule) را استخراج کن.`,
    geminiPythonAnalyticsPromptEn: `You are a Senior Mechanical Integrity & Rotating Equipment Specialist in Refinery Engineering.
Analyze the equipment inspection dataset and:
1. Write Python code to plot Hydrotest Pressure vs. Design Operating Pressure across ASME codes.
2. Evaluate pump P-105B's 4.8 mm/s vibration severity against ISO 10816-3 Zone C/D limits and API 610 vibration criteria.
3. Generate a Cat A punch clearance timeline model prior to hydrocarbon introduction.`
  }
];
