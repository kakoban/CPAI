import { IndustryTrackId } from '../types/industryTrack';

export interface EngineeringDataset {
  id: string;
  trackIds?: IndustryTrackId[];
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
  },
  {
    id: 'paya_infra_epc',
    trackIds: ['PAYA_SAMAN_PARS'],
    titleFa: 'دیتاست ۱ پایا: بال پیمانکاری زیرساختی (راه، تونل، سد، ریل، فرودگاه و امارات)',
    titleEn: 'Paya Dataset 1: Civil & Infrastructure Wing (Domestic & UAE Corridors)',
    domainFa: 'بال پیمانکاری زیرساختی · ملی ساختمان، جنرال مکانیک، دی، رامان و تابیران (مقادیر شبیه‌سازی‌شده آموزشی)',
    domainEn: 'Civil Contracting Wing · Melli Sakhteman, General Mechanic, Dey, Raman, Tabiran (Simulated)',
    descriptionFa: 'نمونه کارگاهی پروژه‌های شاخص بال عمرانی (آزادراه تهران–شمال، تونل قلاجه، امارات SKF2 و R1000C، سدهای مخملکوه و شهری‌کور، راه‌آهن میانه–اردبیل، مترو تبریز و پایانه سلام)؛ اعداد مالی/پیشرفت برای کارگاه شبیه‌سازی‌شده‌اند.',
    descriptionEn: 'Simulated educational dataset across flagship domestic & UAE infrastructure projects (Tehran-North, Qalajeh, SKF2, Makhmalkuh Dam, Mianeh-Ardabil Rail, Tabriz Metro, Salam Terminal).',
    fileName: 'paya_infra_epc_portfolio_sim.csv',
    fileDownloadPath: '/sample_datasets/paya_infra_epc_portfolio_sim.csv',
    rowCount: 10,
    columnCount: 11,
    columnsFa: ['کد پروژه', 'نام پروژه شاخص', 'حوزه کاری', 'شرکت تابعه مجری', 'مدل قراردادی', 'پیشرفت برنامه‌ای ٪', 'پیشرفت واقعی ٪', 'شاخص SPI', 'شاخص CPI', 'موقعیت', 'وضعیت و گلوگاه (شبیه‌سازی)'],
    columnsEn: ['Project_ID', 'Project_Name', 'Sector', 'Subsidiary', 'Contract_Model', 'Planned_Pct', 'Actual_Pct', 'SPI', 'CPI', 'Region', 'Bottleneck_Note'],
    previewRows: [
      { Project_ID: 'PSP-RD-01', Project_Name: 'Tehran-North Freeway Sec', Sector: 'Road_Tunnel', Subsidiary: 'General Mechanic', Contract_Model: 'EPC', Planned_Pct: 78.0, Actual_Pct: 71.5, SPI: 0.92, CPI: 0.95, Region: 'Domestic', Bottleneck_Note: 'Mountain rock support variance (Sim)' },
      { Project_ID: 'PSP-UAE-02', Project_Name: 'Shis-Khorfakkan (SKF2)', Sector: 'Road_Tunnel_Export', Subsidiary: 'Raman', Contract_Model: 'EPC+F', Planned_Pct: 92.0, Actual_Pct: 90.0, SPI: 0.98, CPI: 1.01, Region: 'UAE', Bottleneck_Note: 'On track for handover (Sim)' },
      { Project_ID: 'PSP-DM-03', Project_Name: 'Makhmalkuh Storage Dam', Sector: 'Dam_Water', Subsidiary: 'Dey', Contract_Model: 'PC', Planned_Pct: 64.0, Actual_Pct: 55.0, SPI: 0.86, CPI: 0.91, Region: 'Domestic', Bottleneck_Note: 'Spillway concrete form delay (Sim)' },
      { Project_ID: 'PSP-RL-04', Project_Name: 'Tabriz Metro Line 1 Stations', Sector: 'Rail_Metro', Subsidiary: 'Melli Sakhteman', Contract_Model: 'EPC', Planned_Pct: 84.0, Actual_Pct: 79.0, SPI: 0.94, CPI: 0.96, Region: 'Domestic', Bottleneck_Note: 'MEP smoke duct interface (Sim)' },
      { Project_ID: 'PSP-AP-05', Project_Name: 'IKIA Salam Terminal & Phase1', Sector: 'Airport', Subsidiary: 'Salam Terminal Co', Contract_Model: 'BOT', Planned_Pct: 96.0, Actual_Pct: 95.0, SPI: 0.99, CPI: 0.98, Region: 'Domestic', Bottleneck_Note: 'Baggage HVAC tuning (Sim)' }
    ],
    rawCsv: `Project_ID,Project_Name,Sector,Subsidiary,Contract_Model,Planned_Pct,Actual_Pct,SPI,CPI,Region,Simulated_Note
PSP-RD-01,Tehran-North Freeway Heavy Civil,Road_Tunnel,General_Mechanic,EPC,78.0,71.5,0.92,0.95,Iran,Mountain rock support adjustment (Simulated)
PSP-RD-02,Qalajeh-Ilam Road & Tunnel,Road_Tunnel,Dey,EPC,85.0,80.0,0.94,0.97,Iran,Winter portal concrete protection (Simulated)
PSP-UAE-01,Shis-Khorfakkan Road & Tunnel SKF2,Road_Tunnel_Export,Raman,EPC+F,92.0,90.0,0.98,1.01,UAE,Export services milestone verified (Simulated)
PSP-UAE-02,Sharjah-Khorfakkan R1000C,Road_Tunnel_Export,General_Mechanic,EPC,88.0,85.5,0.97,0.99,UAE,Final asphalt & drainage check (Simulated)
PSP-DM-01,Makhmalkuh & Shahri-Kour Dams,Dam_Water,Dey,PC,64.0,55.0,0.86,0.91,Iran,Seasonal hydrology & spillway delay (Simulated)
PSP-DM-02,Bandar Anzali Land Reclamation,Marine_Water,Bonab,EPC,72.0,68.0,0.94,0.95,Iran,Dredging barge weather hold (Simulated)
PSP-RL-01,Mianeh-Ardabil Railway & Karaj-Qazvin,Rail_Metro,Melli_Sakhteman,EPC+F,79.0,73.0,0.92,0.94,Iran,Ballast & bridge abutment lag (Simulated)
PSP-RL-02,Tabriz Line 1 & Tehran M3/N4 Metro,Rail_Metro,General_Mechanic,EPC,84.0,79.0,0.94,0.96,Iran,Station escalation claim review (Simulated)
PSP-AP-01,IKIA Salam Terminal & Kish South Runway,Airport,Salam_Co,BOT,96.0,95.0,0.99,0.98,Iran,Apron lighting commissioning (Simulated)
PSP-IND-01,Kaveh South Kish Steel & Hegmatan Cement,Industrial_Civil,Melli_Sakhteman,EPC,81.0,76.0,0.94,0.93,Iran,Heavy foundation anchor bolts ready (Simulated)`,
    claudeDashboardPromptFa: `تو مدیر ارشد کنترل پورتفوی بال پیمانکاری هلدینگ پایا سامان پارس هستی.
داده‌های CSV زیر شامل وضعیت پروژه‌های شاخص بال پیمانکاری (ملی ساختمان، جنرال مکانیک، دی، رامان، بن‌آب) در داخل کشور و امارات است (تمام اعداد برای تمرین شبیه‌سازی‌شده‌اند).

یک داشبورد مدیریتی تعاملی React + Tailwind در Claude Artifact بساز شامل:
۱. کارت‌های KPI بال عمرانی: میانگین SPI و CPI، سهم پروژه‌های برون‌مرزی امارات در برابر داخلی، و وضعیت بر اساس مدل قراردادی (EPC، EPC+F، PC، BOT).
۲. فیلتر سریع بر اساس شرکت تابعه و حوزه تخصصی (راه و تونل، سد و دریایی، ریل و مترو، فرودگاه، ابنیه صنعتی).
۳. بخش هشدار پروژه‌های نیازمند توجه (مانند SPI زیر ۰.۹۰ در جبهه سدسازی) و پیشنهاد هم‌افزایی ماشین‌آلات بین شرکت‌های تابعه.
۴. تذکر شفاف در فوتر داشبورد مبنی بر شبیه‌سازی آموزشی اعداد قرارداد/پیشرفت.

دیتاست CSV:
[داده‌های CSV اینجا قرار می‌گیرد]`,
    claudeDashboardPromptEn: `You are Portfolio Controls Lead for Paya Saman Pars Civil Contracting Wing.
Build an interactive React + Tailwind Artifact dashboard from the simulated training CSV below:
1. KPI summary across EPC, EPC+F, PC, and BOT models plus Domestic vs. UAE performance.
2. Subsidiary & sector filters (Road/Tunnel, Dams/Marine, Rail/Metro, Airport, Industrial Civil).
3. Bottleneck alerts for SPI < 0.90 suggesting cross-subsidiary heavy fleet sharing.
4. Clear footer badge noting educational simulated data.`,
    geminiPythonAnalyticsPromptFa: `تو تحلیلگر ارشد داده و ریسک در هلدینگ پایا سامان پارس هستی.
با Python روی دیتاست بال پیمانکاری:
۱. میانگین شاخص SPI و CPI را به تفکیک مدل قراردادی (EPC در برابر EPC+F و BOT) و شرکت تابعه (رامان، دی، جنرال مکانیک، ملی ساختمان) محاسبه و نمودار میله‌ای ترسیم کن.
۲. پروژه‌های دارای انحراف منفی (Planned - Actual > 5%) را استخراج و اولویت‌بندی کن.
۳. پیشنهادهای کاربردی برای تکمیل فیلدهای خالی کارفرما و مبلغ پیمان در سامانه هلدینگ بنویس.`,
    geminiPythonAnalyticsPromptEn: `Analyze Paya Civil Wing's simulated CSV in Python:
1. Group mean SPI & CPI by Contract_Model and Subsidiary with charts.
2. Rank workfronts with >5% schedule variance.
3. Recommend data-governance checks for missing portal fields.`
  },
  {
    id: 'paya_kaveh_housing',
    trackIds: ['PAYA_SAMAN_PARS'],
    titleFa: 'دیتاست ۲ پایا: بال مسکن، MEP تابیران و شهر صنعتی کاوه (خورشیدی ۵MW و پلاسمای سرد)',
    titleEn: 'Paya Dataset 2: Housing Wing, Tabiran MEP & Kaveh Industrial City (5MW Solar & Cold Plasma)',
    domainFa: 'بال مسکن و شهرک کاوه · آتی‌ساز، خانه، عمران مسکن، تابیران و کاوه (مقادیر شبیه‌سازی‌شده آموزشی)',
    domainEn: 'Housing Wing & Kaveh SEZ · Atisaz, Khaneh, Omran Maskan, Tabiran & Kaveh (Simulated)',
    descriptionFa: 'پوشش‌دهنده شهر صنعتی ۳۰۰۰ هکتاری کاوه (نیروگاه خورشیدی ۵ مگاواتی و تصفیه‌خانه پلاسمای سرد ۱۴۰۵)، پروژه‌های MEP تابیران و طرح‌های انبوه‌سازی/شهرک‌سازی آتی‌ساز، خانه و عمران مسکن؛ اعداد برای تمرین کلاسی شبیه‌سازی‌شده‌اند.',
    descriptionEn: 'Simulated educational dataset spanning Kaveh 3,000ha Industrial City (5MW solar + 1405 cold-plasma effluent), Tabiran MEP works, and Atisaz/Khaneh/Omran Maskan housing towns.',
    fileName: 'paya_kaveh_housing_wing_sim.csv',
    fileDownloadPath: '/sample_datasets/paya_kaveh_housing_wing_sim.csv',
    rowCount: 8,
    columnCount: 10,
    columnsFa: ['کد دارایی/پروژه', 'عنوان پروژه یا طرح', 'شرکت تابعه', 'حوزه', 'مدل بهره‌برداری', 'پیشرفت/آمادگی ٪', 'شاخص بهره‌وری', 'ظرفیت/مقیاس', 'وضعیت ثبت پورتال', 'نکته فنی (شبیه‌سازی)'],
    columnsEn: ['Asset_ID', 'Asset_Name', 'Subsidiary', 'Domain', 'Model', 'Readiness_Pct', 'Efficiency_Index', 'Scale_Note', 'Portal_Status', 'Simulated_Note'],
    previewRows: [
      { Asset_ID: 'KAV-SOL-01', Asset_Name: 'Kaveh 5MW Solar Power Plant', Subsidiary: 'Kaveh City / Tabiran', Domain: 'Renewable_Energy', Model: 'BOT', Readiness_Pct: 91.0, Efficiency_Index: 0.96, Scale_Note: '5 MW PV (1405 News)', Portal_Status: 'News-Verified', Simulated_Note: 'Inverter grid sync test (Sim)' },
      { Asset_ID: 'KAV-PLS-02', Asset_Name: 'Cold-Plasma Effluent Treatment', Subsidiary: 'Kaveh Industrial City', Domain: 'Water_Tech', Model: 'BLT', Readiness_Pct: 87.5, Efficiency_Index: 0.94, Scale_Note: '3000ha Industrial Reuse', Portal_Status: 'News-Verified', Simulated_Note: 'COD reduction pilot log (Sim)' },
      { Asset_ID: 'MEP-SHZ-03', Asset_Name: 'Shiraz & Isfahan Metro Vent', Subsidiary: 'Tabiran', Domain: 'MEP_Systems', Model: 'EPC', Readiness_Pct: 89.0, Efficiency_Index: 0.95, Scale_Note: 'Line 1 Smoke Control', Portal_Status: 'Site-Active', Simulated_Note: 'Jet fan flow balancing (Sim)' },
      { Asset_ID: 'HSG-ATZ-04', Asset_Name: 'Darya-Kenar & Tower Complexes', Subsidiary: 'Atisaz', Domain: 'Housing_Towns', Model: 'Investment', Readiness_Pct: 95.0, Efficiency_Index: 0.97, Scale_Note: '1433+ Villas & Towers', Portal_Status: 'Needs-Portal-Update', Simulated_Note: 'Urban catalog update due (Sim)' },
      { Asset_ID: 'HSG-ISF-05', Asset_Name: 'Shahinshahr & Baharestan', Subsidiary: 'Omran Maskan Isfahan', Domain: 'Satellite_Cities', Model: 'Investment', Readiness_Pct: 76.0, Efficiency_Index: 0.90, Scale_Note: 'Central Iran Towns', Portal_Status: 'Needs-Portal-Update', Simulated_Note: 'Material escalation audit (Sim)' }
    ],
    rawCsv: `Asset_ID,Asset_Name,Subsidiary,Domain,Model,Readiness_Pct,Efficiency_Index,Scale_Note,Portal_Status,Simulated_Note
KAV-SOL-01,Kaveh 5MW Solar Power Plant,Kaveh_Industrial_City,Renewable_Energy,BOT,91.0,0.96,5_MW_PV_Saveh,News_1405,Inverter peak-shaving sync active (Simulated)
KAV-PLS-02,Kaveh Cold-Plasma Effluent Plant,Kaveh_Industrial_City,Industrial_Water,BLT,87.5,0.94,3000ha_Industrial_Zone,News_1405,Cold-plasma COD abatement test (Simulated)
MEP-SHZ-01,Shiraz & Isfahan Metro Smoke Vent,Tabiran,MEP_Electrical_Mech,EPC,89.0,0.95,Metro_Line_1_MEP,Portal_Listed,NFPA smoke extraction verified (Simulated)
MEP-YAZ-02,Yazdmehr 63kV Substation & Mashhad,Tabiran,MEP_Power,EPC,93.0,0.97,63kV_Power_Supply,Portal_Listed,Relay protection tests passed (Simulated)
HSG-ATZ-01,Atisaz Towers & Darya-Kenar Villas,Atisaz,Mass_Housing,Investment,95.0,0.97,1433_Plus_Villas,Portal_Gap_0_Urban,Heritage catalog digitization needed (Simulated)
HSG-KHN-02,Tourist Towns & Commercial Towers,Khaneh_Co,Urban_Buildings,Investment,74.0,0.89,Mixed_Use_Complexes,Portal_Gap_0_Urban,Cost-per-m2 variance review (Simulated)
HSG-SHM-03,Northern Villa & Housing Projects,Omran_Maskan_Shomal,Mass_Housing,PC,78.0,0.91,North_Iran_Coast,Portal_Gap_0_Urban,Pre-sale cashflow alignment (Simulated)
HSG-ISF-04,Baharestan & Shahinshahr Satellites,Omran_Maskan_Isfahan,Satellite_Towns,Investment,76.0,0.90,Central_Iran_Hub,Portal_Gap_0_Urban,Urban renewal phasing update (Simulated)`,
    claudeDashboardPromptFa: `تو مدیر نوآوری، انرژی و توسعه مسکن در هلدینگ پایا سامان پارس هستی.
داده‌های CSV زیر شامل وضعیت شهر صنعتی ۳۰۰۰ هکتاری کاوه (نیروگاه خورشیدی ۵MW و تصفیه‌خانه پلاسمای سرد)، پروژه‌های MEP تابیران و شرکت‌های بال مسکن (آتی‌ساز، خانه، عمران مسکن) است (مقادیر شبیه‌سازی‌شده آموزشی).

یک داشبورد تعاملی در Claude Artifact طراحی کن که:
۱. عملکرد انرژی و آب سبز شهر صنعتی کاوه (خورشیدی ۵MW و پلاسمای سرد) را کنار شاخص‌های پروژه‌های مسکن و MEP نمایش دهد.
۲. پروژه‌هایی را که در سایت هلدینگ وضعیت «Portal_Gap_0_Urban» دارند (بخش ابنیه ساختمانی و مدیریت شهری) هایلایت کرده و چک‌لیست تکمیل پورتفو بسازد.
۳. امکان شبیه‌سازی اثر تکمیل پروژه‌های BOT/BLT کاوه بر جریان نقدی پایدار هلدینگ را فراهم کند.

دیتاست CSV:
[داده‌های CSV اینجا قرار می‌گیرد]`,
    claudeDashboardPromptEn: `Build an interactive Claude Artifact dashboard tracking Kaveh 3,000ha Industrial City (5MW Solar & Cold Plasma), Tabiran MEP, and the Housing Investment Wing from this simulated training CSV, flagging Portal_Gap_0_Urban items.`,
    geminiPythonAnalyticsPromptFa: `با Python داده‌های بال مسکن، MEP و شهر صنعتی کاوه را تحلیل کن:
۱. مقایسه Readiness_Pct و Efficiency_Index بین پروژه‌های BOT/BLT شهر صنعتی کاوه و پروژه‌های سرمایه‌گذاری مسکن.
۲. فهرست دارایی‌هایی که نیاز به ثبت فوری شناسنامه در دسته «ابنیه ساختمانی و مدیریت شهری» سایت هلدینگ دارند.
۳. تحلیل ریسک بهای تمام‌شده و پیشنهاد بهینه‌سازی نقدینگی.`,
    geminiPythonAnalyticsPromptEn: `Analyze Paya Housing, MEP, and Kaveh simulated dataset in Python comparing BOT/BLT assets vs housing developments and listing Portal_Gap_0_Urban items.`
  },
  {
    id: 'paya_holding_portfolio',
    trackIds: ['PAYA_SAMAN_PARS'],
    titleFa: 'دیتاست ۳ پایا: داشبورد کلان ۶۳ پروژه، ۵۰۰۰ نیرو و ناوگان ۱۴ شرکت تابعه',
    titleEn: 'Paya Dataset 3: Holding Macro Portfolio (63 Projects, 5,000 Staff & 14 Subsidiaries)',
    domainFa: 'ستاد هلدینگ پایا سامان پارس · نمای یکپارچه ۸ حوزه کاری و ۱۴ شرکت تابعه (شبیه‌سازی آموزشی)',
    domainEn: 'Paya Holding HQ · 8 Domains, 63 Projects & 14 Subsidiaries Matrix (Simulated Training Data)',
    descriptionFa: 'ماتریس جامع تجمیعی ستاد هلدینگ برای پایش توزیع ۶۳ پروژه ثبت‌شده روی سایت در ۸ حوزه، تخصیص ۵۰۰۰ نیروی انسانی و ناوگان ماشین‌آلات سنگین میان دو بال؛ کلیه اعداد تکمیلی جهت تمرین کلاسی شبیه‌سازی‌شده‌اند.',
    descriptionEn: 'Executive holding matrix reconciling all 8 business domains, 63 site-listed projects, 5,000+ personnel, and heavy machinery across both wings (simulated training figures).',
    fileName: 'paya_holding_63projects_macro_sim.csv',
    fileDownloadPath: '/sample_datasets/paya_holding_63projects_macro_sim.csv',
    rowCount: 8,
    columnCount: 10,
    columnsFa: ['حوزه تخصصی', 'بال اجرایی', 'تعداد پروژه سایت', 'شرکت‌های تابعه اصلی', 'مدل غالب', 'نیروی انسانی تخمینی', 'دستگاه سنگین فعال', 'تکمیل فیلد سایت ٪', 'ریسک کلان (شبیه‌سازی)', 'اولویت هوش مصنوعی'],
    columnsEn: ['Domain_Sector', 'Holding_Wing', 'Site_Projects', 'Key_Subsidiaries', 'Primary_Models', 'Est_Workforce', 'Active_Heavy_Units', 'Portal_Detail_Pct', 'Macro_Risk', 'AI_Priority'],
    previewRows: [
      { Domain_Sector: 'Road_Bridge_Tunnel', Holding_Wing: 'Civil_Contracting', Site_Projects: 28, Key_Subsidiaries: 'Raman-GenMech-Dey', Primary_Models: 'EPC_EPC+F', Est_Workforce: 2150, Active_Heavy_Units: 340, Portal_Detail_Pct: 12, Macro_Risk: 'High-Geology', AI_Priority: 'Critical-P1' },
      { Domain_Sector: 'Dams_Water_Marine', Holding_Wing: 'Civil_Contracting', Site_Projects: 14, Key_Subsidiaries: 'Dey-Melli-Bonab', Primary_Models: 'EPC_PC', Est_Workforce: 920, Active_Heavy_Units: 145, Portal_Detail_Pct: 10, Macro_Risk: 'Hydrology-Lag', AI_Priority: 'High-P1' },
      { Domain_Sector: 'Rail_Metro_Transit', Holding_Wing: 'Civil_Contracting', Site_Projects: 8, Key_Subsidiaries: 'Melli-GenMech', Primary_Models: 'EPC_EPC+F', Est_Workforce: 640, Active_Heavy_Units: 85, Portal_Detail_Pct: 15, Macro_Risk: 'Escalation-Claims', AI_Priority: 'High-P1' },
      { Domain_Sector: 'Kaveh_Ind_City_Energy', Holding_Wing: 'Investment_Housing', Site_Projects: 2, Key_Subsidiaries: 'Kaveh-Tabiran', Primary_Models: 'BOT_BLT', Est_Workforce: 380, Active_Heavy_Units: 38, Portal_Detail_Pct: 65, Macro_Risk: 'Grid-Effluent-Load', AI_Priority: 'Strategic-P1' },
      { Domain_Sector: 'Housing_Urban_Renewal', Holding_Wing: 'Investment_Housing', Site_Projects: 0, Key_Subsidiaries: 'Atisaz-Khaneh-Omran', Primary_Models: 'BOT_Invest', Est_Workforce: 410, Active_Heavy_Units: 52, Portal_Detail_Pct: 0, Macro_Risk: 'Portal-Gap-Cost', AI_Priority: 'Immediate-P1' }
    ],
    rawCsv: `Domain_Sector,Holding_Wing,Site_Projects,Key_Subsidiaries,Primary_Models,Est_Workforce,Active_Heavy_Units,Portal_Detail_Pct,Macro_Risk,AI_Priority
Road_Bridge_Tunnel,Civil_Contracting,28,Raman_GenMech_Dey,EPC_EPC+F,2150,340,12,Geology_Claims_UAE_FX,Critical_P1
Dams_Water_Marine,Civil_Contracting,14,Dey_Melli_Bonab,EPC_PC,920,145,10,Hydrology_Cashflow,High_P1
Rail_Metro_Transit,Civil_Contracting,8,Melli_GenMech,EPC_EPC+F,640,85,15,Utility_Clash_Escalation,High_P1
Airport_Terminals,Civil_Contracting,5,GenMech_Salam,EPC_BOT,310,42,18,MEP_Handover_Schedule,Medium_P2
Industrial_Plants,Civil_Contracting,4,Melli_Sakhteman,EPC_PC,290,48,14,Long_Lead_Equipment,Medium_P2
MEP_Electrical_Mech,Civil_Contracting,4,Tabiran,EPC_PC,240,22,20,Substation_Vent_Testing,High_P2
Kaveh_Ind_City_Solar_Plasma,Investment_Housing,2,Kaveh_Tabiran,BOT_BLT,260,30,65,Solar_ColdPlasma_Scale,Strategic_P1
Housing_Urban_Management,Investment_Housing,0,Atisaz_Khaneh_Omran_Kowsar,Investment_BLT,390,45,0,Portal_0_Projects_Inflation,Immediate_P1`,
    claudeDashboardPromptFa: `تو مشاور ارشد تحول دیجیتال و هوش مصنوعی مدیرعامل هلدینگ پایا سامان پارس هستی.
داده‌های CSV زیر نمای کلان پورتفوی هلدینگ در ۸ حوزه کاری (شامل ۶۳ پروژه ثبت‌شده، ۵۰۰۰+ نیروی انسانی، ناوگان سنگین و ۱۴ شرکت تابعه در دو بال) است. (اعداد نیرو، ناوگان و درصد تکمیل پورتال جهت آموزش شبیه‌سازی شده‌اند).

در Claude Artifact یک «اتاق فرماندهی مدیرعامل هلدینگ پایا سامان پارس» با React + Tailwind بساز که شامل بخش‌های زیر باشد:
۱. کارت‌های کلان بالا: جمع پروژه‌های ثبت‌شده (۶۳ پروژه در ۶ دسته + طرح‌های کاوه و خلأ دسته مسکن)، توزیع ۵۰۰۰+ نیرو و ناوگان ماشین‌آلات بین دو بال.
۲. نمودار مقایسه‌ای ۸ حوزه تخصصی (از ۲۸ پروژه راه و تونل تا ۱۴ سد، ۸ ریل، ۵ فرودگاه، ۴ صنعتی، ۴ MEP، کاوه و بال مسکن).
۳. بخش هشدار حکمرانی داده (Data Governance Alert): برجسته‌سازی خلأ اطلاعات کارفرما/مبلغ در صفحات جزئیات سایت و ۰ پروژه در دسته «ابنیه ساختمانی و مدیریت شهری».
۴. شبیه‌ساز سناریوی هم‌افزایی: جابه‌جایی ناوگان سنگین و تمرکز هوش مصنوعی روی قراردادهای EPC+F و BOT.

دیتاست CSV:
[داده‌های CSV اینجا قرار می‌گیرد]`,
    claudeDashboardPromptEn: `You are Chief AI Transformation Advisor to Paya Saman Pars Holding CEO.
Build an interactive Holding CEO Command Center React Artifact from this simulated 8-sector portfolio CSV:
1. KPIs covering 63 cataloged projects, 5,000+ staff, heavy fleet, and dual-wing split.
2. Visual comparison across all 8 domains (28 Roads -> 0 Housing Portal Gap).
3. Data Governance Alert flagging empty portal detail fields and 0-project Urban/Housing listing.
4. Interactive wing synergy & EPC+F/BOT priority simulator.`,
    geminiPythonAnalyticsPromptFa: `تو دانشمند داده ستاد هلدینگ پایا سامان پارس هستی.
با Python روی دیتاست کلان ۸ حوزه کاری:
۱. سهم درصدی هر حوزه از کل پروژه‌ها، نیروی انسانی و ناوگان سنگین را محاسبه و نمودار دو محوره ترسیم کن.
۲. همبستگی بین نبود داده در پورتال (Portal_Detail_Pct پایین) و ریسک حکمرانی پورتفو را تحلیل و برنامه اولویت‌دار Phase I CPMAI برای پرکردن شکاف‌های اطلاعاتی پیشنهاد بده.
۳. یک گزارش ۳ دقیقه‌ای هیئت‌مدیره به فارسی تولید کن.`,
    geminiPythonAnalyticsPromptEn: `Analyze Paya Holding's 8-domain macro CSV in Python: compute portfolio/workforce/fleet shares, flag portal data-gap priorities, and output a concise board brief.`
  }
];

export function getDatasetsForTrack(trackId: IndustryTrackId = 'CIVIL_INFRA'): EngineeringDataset[] {
  if (trackId === 'PAYA_SAMAN_PARS') {
    return ENGINEERING_DATASETS.filter((ds) => ds.trackIds?.includes('PAYA_SAMAN_PARS'));
  }
  return ENGINEERING_DATASETS.filter((ds) => !ds.trackIds || ds.trackIds.includes(trackId));
}

