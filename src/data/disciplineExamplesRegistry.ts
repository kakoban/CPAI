import {
  DisciplineId,
  DisciplineMetadata,
  DisciplineExampleContent,
  IndustryTrackId,
  EngineeringRoleId
} from '../types/industryTrack';

export const DISCIPLINE_REGISTRY: Record<DisciplineId, DisciplineMetadata> = {
  // -------------------------------------------------------------
  // CIVIL INFRASTRUCTURE HOLDING DISCIPLINES (8 Disciplines)
  // -------------------------------------------------------------
  civil_tbm_tunnel: {
    id: 'civil_tbm_tunnel',
    trackId: 'CIVIL_INFRA',
    titleFa: 'عملیات حفاری مکانیزه تونل (TBM)',
    titleEn: 'Mechanized TBM Tunneling Operations',
    shortTitleFa: 'حفاری TBM',
    shortTitleEn: 'TBM Tunneling',
    iconName: 'Tunnel',
    governingStandardsFa: ['استاندارد انجمن تونل بریتانیا (BTS)', 'مشخصات فنی راه‌آهن شهری', 'نشریه ۵۵'],
    governingStandardsEn: ['British Tunnelling Society (BTS)', 'Metro Technical Specifications', 'PBO Circular 55'],
    performanceMetricsFa: ['متر طول حفاری در شیفت', 'فشار پیشانی (Bar)', 'گشتاور کاترهد (kNm)', 'حجم ملات تزریق دم‌برس'],
    performanceMetricsEn: ['Advance Meter/Shift', 'Face Pressure (Bar)', 'Cutterhead Torque (kNm)', 'Tail Grout Volume (m3)'],
    descriptionFa: 'هدایت دستگاه حفار مکانیزه، کنترل فشار سینه کار، سگمنت‌گذاری، تزریق دوغاب دم و پیشگیری از فرونشست زمین.',
    descriptionEn: 'Operating mechanized EPB/Slurry TBMs, face pressure balance, ring building, tail grouting, and ground subsidence control.'
  },
  civil_stations_natm: {
    id: 'civil_stations_natm',
    trackId: 'CIVIL_INFRA',
    titleFa: 'ساخت ایستگاه‌های زیرزمینی و گودهای عمیق',
    titleEn: 'Deep Excavation, Shoring & Station Civil Construction',
    shortTitleFa: 'ایستگاه‌ها و گود عمیق',
    shortTitleEn: 'Stations & Shoring',
    iconName: 'Building',
    governingStandardsFa: ['مبحث ۷ مقررات ملی ساختمان (پی و ژئوتکنیک)', 'دستورالعمل سازه نگهبان شهرداری'],
    governingStandardsEn: ['Iran National Building Code Part 7', 'Urban Shoring & Deep Excavation Guidelines'],
    performanceMetricsFa: ['مترمکعب خاکبرداری روزانه', 'تعداد شمع‌های بتنی اجرا شده', 'تناژ استرات‌های نصب‌شده', 'تغییرشکل دیواره گود (mm)'],
    performanceMetricsEn: ['Daily Excavation (m3)', 'Cast-in-situ Piles Count', 'Strut Steelwork Tonnage', 'Wall Deflection (mm)'],
    descriptionFa: 'پایدارسازی ترانشه‌های عمیق با دیوارهای دیافراگمی، استرات‌های فلزی، نیلینگ، سازه بتنی ایستگاه و حفر مغارهای NATM.',
    descriptionEn: 'Deep excavation retaining walls, diaphragm walls, heavy steel strutting, station concrete slabs, and NATM cavern caverns.'
  },
  civil_precast_segment: {
    id: 'civil_precast_segment',
    trackId: 'CIVIL_INFRA',
    titleFa: 'کارخانه سگمنت و صنایع قطعات پیش‌ساخته',
    titleEn: 'Precast Segment & Tunnel Lining Plant',
    shortTitleFa: 'تولید سگمنت بتنی',
    shortTitleEn: 'Precast Segments',
    iconName: 'Boxes',
    governingStandardsFa: ['آیین‌نامه بتن ایران (آبا)', 'استاندارد سگمنت‌های تونلی ACI 544'],
    governingStandardsEn: ['Iran Concrete Code (ABA)', 'ACI 544 Precast Tunnel Lining Standards'],
    performanceMetricsFa: ['تعداد رینگ تولیدی در روز', 'مقاومت فشاری ۲۸ روزه بتن (C50)', 'رواداری ابعادی قالب (±0.5mm)', 'نرخ ترمیم سگمنت'],
    performanceMetricsEn: ['Rings Cast per Day', '28-Day Concrete Strength (C50)', 'Mould Tolerance (±0.5mm)', 'Repair Rate (%)'],
    descriptionFa: 'تولید سگمنت‌های بتنی با خط کاروسل، عمل‌آوری بخار، مونتاژ قفسه آرماتور، نصب گسکت EPDM و استکینگ در دپو.',
    descriptionEn: 'Automated carousel segment production, steam curing, rebar jigs, EPDM gasket sealing, and yard dispatch logistics.'
  },
  civil_track_systems: {
    id: 'civil_track_systems',
    trackId: 'CIVIL_INFRA',
    titleFa: 'روسازی ریلی، ریل سوم و علائم (Trackwork & Signaling)',
    titleEn: 'Railway Trackwork, Traction Power & Signaling',
    shortTitleFa: 'روسازی و سیستم ریلی',
    shortTitleEn: 'Track & Systems',
    iconName: 'Train',
    governingStandardsFa: ['استانداردهای بین‌المللی اتحادیه راه‌آهن‌ها (UIC)', 'مشخصات فنی سیگنالینگ CENELEC'],
    governingStandardsEn: ['International Union of Railways (UIC)', 'CENELEC Rail Automation Standards'],
    performanceMetricsFa: ['متر طول ریل بتنی اجراشده', 'تعداد درزهای جوش فلش‌بات', 'تلرانس خط هادی (±1mm)', 'تعداد تست‌های اینترلاکینگ'],
    performanceMetricsEn: ['Track Meters Cast', 'Flash-Butt Weld Count', 'Track Geometry Deviation (mm)', 'Tested Interlocking Loops'],
    descriptionFa: 'اجرای خط بتنی بدون بالاست (Slab Track)، جوشکاری CWR ریل، برق‌رسانی ترکشن و سیستم‌های اتوماسیون قطار CBTC.',
    descriptionEn: 'Ballastless slab track installation, continuous welded rail (CWR), traction power 750V DC, and CBTC signaling.'
  },
  civil_highways_bridges: {
    id: 'civil_highways_bridges',
    trackId: 'CIVIL_INFRA',
    titleFa: 'آزادراه‌ها، روسازی آسفالتی و پل‌های طره‌ای بزرگ',
    titleEn: 'Highways, Heavy Pavements & Segmental Bridges',
    shortTitleFa: 'آزادراه و پل‌های کلان',
    shortTitleEn: 'Highways & Bridges',
    iconName: 'Milestone',
    governingStandardsFa: ['آیین‌نامه طرح هندسی راه‌های ایران (نشریه ۴۱۱)', 'مشخصات روسازی آسفالتی (نشریه ۲۳۴)'],
    governingStandardsEn: ['Highway Geometric Design Circular 411', 'Asphalt Paving Specifications Circular 234'],
    performanceMetricsFa: ['تن آسفالت پخش‌شده در روز', 'شاخص ناهمواری بین‌المللی (IRI)', 'تناژ عرشه طره متوازن (CFT)', 'تراکم غلتک‌کوبی'],
    performanceMetricsEn: ['Daily Asphalt Placed (Tons)', 'International Roughness Index (IRI)', 'Balanced Cantilever Segments', 'Compaction %'],
    descriptionFa: 'عملیات خاکی مسیر، ساب‌بیس، آسفالت پلیمری با فینیشر مجهز به هدایت سنسوری، پایه‌های بلند و عرشه پس‌تنیده پل‌ها.',
    descriptionEn: 'Highway earthwork, sensor-guided asphalt paving, bridge piers climbing formwork, and post-tensioned segmental spans.'
  },
  civil_technical_claims: {
    id: 'civil_technical_claims',
    trackId: 'CIVIL_INFRA',
    titleFa: 'دفتر فنی، امور پیمان، متره و مدیریت کلیم (Claims)',
    titleEn: 'Technical Office, Contract Claims & Cost Engineering',
    shortTitleFa: 'دفتر فنی و دعاوی پیمان',
    shortTitleEn: 'Technical & Claims',
    iconName: 'FileSpreadsheet',
    governingStandardsFa: ['شرایط عمومی پیمان (نشریه ۴۳۱۱)', 'بخشنامه‌های تعدیل آحاد بها ۱۷۳۰۷۳', 'فهرست‌بهای پایه سازمان برنامه'],
    governingStandardsEn: ['PBO Standard Contract Circular 4311', 'Price Index Escalation Circulars', 'National Unit Rate Catalogs'],
    performanceMetricsFa: ['مبلغ صورت‌وضعیت تاییدشده (میلیارد تومان)', 'روزهای تاخیر مجاز اخذشده (EOT)', 'درصد اختلاف متره برآورد', 'تحقق برنامه زمانی (SPI)'],
    performanceMetricsEn: ['Approved IPC Value ($/Rls)', 'Granted Extension of Time (Days)', 'Quantity Survey Variance %', 'Schedule Performance (SPI)'],
    descriptionFa: 'تهیه و رسیدگی صورت‌وضعیت‌ها، آنالیز تاخیرات ماده ۳۰ نشریه ۴۳۱۱، تطبیق با معارضین ملکی، و تهیه لوایح کلیم مالی.',
    descriptionEn: 'Interim payment certificates, Clause 30 delay claim dossiers, utility clash logs, and contract price escalations.'
  },
  civil_geotech_monitoring: {
    id: 'civil_geotech_monitoring',
    trackId: 'CIVIL_INFRA',
    titleFa: 'ژئودزی، نقشه‌برداری دقیق و مانیتورینگ ابزاردقیق نشست',
    titleEn: 'Geodesy, Underground Gyro Survey & Settlement Telemetry',
    shortTitleFa: 'ژئودزی و مانیتورینگ',
    shortTitleEn: 'Geodesy & Monitoring',
    iconName: 'Compass',
    governingStandardsFa: ['استاندارد نقشه‌برداری سازمان نقشه‌برداری کشور', 'حدود مجاز نشست سازه‌های سطحی (مبحث ۷)'],
    governingStandardsEn: ['National Mapping Organization Specs', 'Allowable Structural Angular Distortions'],
    performanceMetricsFa: ['میلی‌متر خطای انتقال بنچ‌مارک در شفت', 'تعداد پین‌های مانیتورینگ روزانه', 'دقت انحراف‌سنجی TBM (mm)', 'نرخ هشدار فرونشست'],
    performanceMetricsEn: ['Shaft Gyro Transfer Error (mm)', 'Daily Settlement Pins Monitored', 'TBM Laser Alignment (mm)', 'Subsidence Alert Frequency'],
    descriptionFa: 'نقشه‌برداری ژیروسکوپی در عمق شفت، هدایت لیزری دستگاه TBM، قرائت انکلینومترها و مدل‌سازی سه‌بعدی GIS فرونشست خیابان‌ها.',
    descriptionEn: 'Underground gyro plumbing, laser-guided TBM alignment, automated borehole telemetry, and 3D GIS subsidence models.'
  },
  civil_heavy_fleet: {
    id: 'civil_heavy_fleet',
    trackId: 'CIVIL_INFRA',
    titleFa: 'مدیریت ناوگان ماشین‌آلات سنگین، بچینگ و تجهیزات ویژه',
    titleEn: 'Heavy Fleet Logistics, Batching Plants & Plant Maintenance',
    shortTitleFa: 'ماشین‌آلات و لجستیک کارگاه',
    shortTitleEn: 'Heavy Fleet',
    iconName: 'Truck',
    governingStandardsFa: ['استانداردهای نگهداری و تعمیرات پیشگیرانه (PM)', 'دستورالعمل ایمنی ماشین‌آلات کارگاهی'],
    governingStandardsEn: ['Preventive Maintenance (PM) Manuals', 'Heavy Equipment Safety Standards'],
    performanceMetricsFa: ['ساعات آماده‌به‌کاری ناوگان (Availability %)', 'میانگین زمان بین خرابی (MTBF)', 'مصرف گازوئیل بر حسب تن-کیلومتر', 'زمان پاسخ اضطراری (MTTR)'],
    performanceMetricsEn: ['Fleet Availability (%)', 'Mean Time Between Failures (MTBF)', 'Fuel Burn per Ton-km', 'Mean Time to Repair (MTTR)'],
    descriptionFa: 'پایش تلمتری جرثقیل‌های پورتال شفت، لوکوموتیوهای حمل سگمنت، لودرها، تراک‌میکسرها و بچینگ‌پلنت‌های تولید ملات.',
    descriptionEn: 'Telemetry monitoring of shaft gantry cranes, tunnel diesel rolling stock, dump trucks, batching plants, and repair shops.'
  },

  // -------------------------------------------------------------
  // OIL, GAS & PETROCHEMICAL EPCC HOLDING DISCIPLINES (8 Disciplines)
  // -------------------------------------------------------------
  petro_process_safety: {
    id: 'petro_process_safety',
    trackId: 'ENERGY_PETRO',
    titleFa: 'مهندسی فرآیند، شبیه‌سازی، P&ID و ایمنی فرآیند (PSM/HAZOP)',
    titleEn: 'Process Engineering, Simulation, P&ID & Process Safety (PSM)',
    shortTitleFa: 'فرآیند و ایمنی (HAZOP)',
    shortTitleEn: 'Process & Safety',
    iconName: 'Flame',
    governingStandardsFa: ['استانداردهای API 520 / 521 (تخلیه فشار و فلر)', 'دستورالعمل OSHA برای ایمنی فرآیند (PSM)'],
    governingStandardsEn: ['API 520 / 521 Pressure Relief & Flare', 'OSHA 1910.119 Process Safety Management (PSM)'],
    performanceMetricsFa: ['نرخ گاز فلرینگ (Nm3/hr)', 'شاخص ایمنی SIL و تعداد گره‌های HAZOP', 'راندمان حرارتی کوره پالایشگاه', 'خطای موازنه جرم و انرژی'],
    performanceMetricsEn: ['Flaring Emission Rate', 'HAZOP Study Nodes & SIL Level', 'Furnace Thermal Efficiency %', 'Mass-Energy Balance Error %'],
    descriptionFa: 'مدلسازی در Aspen HYSYS، موازنه هیدرولیکی، طراحی P&ID، ارزیابی خطر جلسات HAZOP و مهار آلایندگی مشعل.',
    descriptionEn: 'Aspen HYSYS process modeling, P&ID drafting, safety relief flare design, HAZOP risk reviews, and emissions minimization.'
  },
  petro_piping_layout: {
    id: 'petro_piping_layout',
    trackId: 'ENERGY_PETRO',
    titleFa: 'مهندسی پایپینگ، تحلیل تنش، شاپ اسپول و جوشکاری آلیاژی',
    titleEn: 'Piping Engineering, Stress Analysis, Spool Fabrication & Welding',
    shortTitleFa: 'پایپینگ و جوشکاری',
    shortTitleEn: 'Piping & Stress',
    iconName: 'GitCommit',
    governingStandardsFa: ['استاندارد ASME B31.3 (لوله‌کشی فرآیندی پالایشگاهی)', 'استاندارد بازرسی لوله‌کشی API 570'],
    governingStandardsEn: ['ASME B31.3 Process Piping Code', 'API 570 Piping Inspection Code'],
    performanceMetricsFa: ['اینچ-قطر جوشکاری روزانه (Inch-Dia)', 'درصد معیوبی جوش در رادیوگرافی (Weld Repair %)', 'تعداد پکیج‌های هیدروتست آماده', 'تناژ اسپول شاپ'],
    performanceMetricsEn: ['Daily Welding (Inch-Dia)', 'Weld Repair Rate (<2%)', 'Hydrotest Packs Released', 'Spool Shop Output (Tons)'],
    descriptionFa: 'مدلسازی سه‌بعدی در E3D، تحلیل تنش لوله‌های دما بالا در Caesar II، شاپ برش و فیت‌آپ اسپول‌ها، و جوشکاری تخصصی آرگون و برق.',
    descriptionEn: 'E3D plant modeling, Caesar II thermal stress analysis, spool prefabrication, TIG/SMAW alloy welding, and hydrotest packs.'
  },
  petro_mechanical_heavy: {
    id: 'petro_mechanical_heavy',
    trackId: 'ENERGY_PETRO',
    titleFa: 'تجهیزات مکانیک ثابت، دوار و باربرداری فوق‌سنگین (Heavy Lift)',
    titleEn: 'Static/Rotary Mechanical Equipment & Heavy Rigging Engineering',
    shortTitleFa: 'مکانیک و تجهیزات سنگین',
    shortTitleEn: 'Mechanical & Heavy Lift',
    iconName: 'Cpu',
    governingStandardsFa: ['استاندارد API 650/620 (مخازن ذخیره نفتی)', 'استاندارد پمپ‌های فرآیندی API 610', 'TEMA (مبدل‌ها)'],
    governingStandardsEn: ['API 650/620 Storage Tanks', 'API 610 Refinery Centrifugal Pumps', 'TEMA Exchangers'],
    performanceMetricsFa: ['تناژ نصب تجهیزات با جرثقیل سنگین', 'انحراف هم‌محوری لیزری (Laser Alignment mm)', 'تست کارکرد بدون بار ۷۲ ساعته (Solo Run)', 'ضخامت‌سنجی پوسته‌ها'],
    performanceMetricsEn: ['Heavy Rigging Tonnage', 'Laser Alignment Tolerance (mm)', 'Compressor Solo Run Hours', 'NDT Shell Thickness'],
    descriptionFa: 'نصب برج‌های تقطیر، راکتورها، بویلرها، مخازن کروی و هم‌محوری توربوکمپرسورهای گاز به همراه طراحی ریگینگ پلن فوق‌سنگین.',
    descriptionEn: 'Heavy erection of distillation columns, API reactors, spherical tanks, turbocompressor laser train alignment, and crane studies.'
  },
  petro_electrical_inst: {
    id: 'petro_electrical_inst',
    trackId: 'ENERGY_PETRO',
    titleFa: 'برق صنعتی، ابزاردقیق میدانی، کالیبراسیون و سیستم‌های DCS/ESD',
    titleEn: 'Industrial Power, Field Instrumentation, Calibration & DCS/ESD',
    shortTitleFa: 'برق، ابزاردقیق و اتوماسیون',
    shortTitleEn: 'Electrical & Automation',
    iconName: 'Zap',
    governingStandardsFa: ['استانداردهای ضد انفجار IEC/ATEX', 'استاندارد اتوماسیون صنعتی ISA/IEC 62443'],
    governingStandardsEn: ['IEC / ATEX Hazardous Area Standards', 'ISA / IEC 62443 Industrial Cybersecurity'],
    performanceMetricsFa: ['تعداد لوپ‌های تست‌شده با اتاق کنترل', 'متر طول کابل‌کشی فشار قوی و ضعیف', 'تعداد ترانسمیترهای کالیبره‌شده در کارگاه', 'زمان پاسخ سیستم توقف اضطراری (ESD)'],
    performanceMetricsEn: ['Commissioned Loop Checks', 'Cabling Meters Pulled', 'Bench-Calibrated Transmitters', 'ESD Tripping Time (ms)'],
    descriptionFa: 'پست‌های برق فشار متوسط، سینی‌گذاری و وایرینگ، تیوبینگ استنلس استیل، کالیبراسیون کنترل‌ولوها و برنامه‌ریزی لاجیک سیستم کنترل DCS.',
    descriptionEn: 'Substations, cable pulling, hazardous area hookups, transmitter bench calibration, and DCS/ESD logic configuration.'
  },
  petro_civil_structure: {
    id: 'petro_civil_structure',
    trackId: 'ENERGY_PETRO',
    titleFa: 'سیویل صنعتی، پایپ‌رک‌های سنگین، ضدحریق (PFP) و سازه‌های بتنی',
    titleEn: 'Heavy Industrial Civil, Pipe Racks, Blast Buildings & Passive Fireproofing',
    shortTitleFa: 'سیویل و سازه‌های صنعتی',
    shortTitleEn: 'Industrial Civil',
    iconName: 'ShieldAlert',
    governingStandardsFa: ['استاندارد ASCE 7 (بارهای دینامیکی سازه‌های صنعتی)', 'مقررات سازه‌های ضد انفجار (Blast-Resistant)'],
    governingStandardsEn: ['ASCE Guidelines for Petrochemical Structures', 'API RP 752 / 753 Facility Siting Blast Codes'],
    performanceMetricsFa: ['مترمکعب بتن‌ریزی فونداسیون‌های دینامیکی', 'تناژ اسکلت فلزی پایپ‌رک نصب‌شده', 'مترمربع پوشش ضدحریق اسکلت (Fireproofing)', 'تست تراکم خاک بستر پلنت'],
    performanceMetricsEn: ['Dynamic Foundation Concrete (m3)', 'Pipe Rack Structural Steel (Tons)', 'Passive Fireproofing Area (m2)', 'Soil Compaction QA'],
    descriptionFa: 'فونداسیون‌های ارتعاشی توربین‌ها، نصب سازه‌های فلزی مرتفع پایپ‌رک، ساختمان‌های ضد انفجار اتاق کنترل و اعمال پوشش‌های نسوز و ضدحریق.',
    descriptionEn: 'Vibrating turbine block foundations, structural pipe rack erection, blast-resistant CCR control rooms, and epoxy fireproofing.'
  },
  petro_procurement_expediting: {
    id: 'petro_procurement_expediting',
    trackId: 'ENERGY_PETRO',
    titleFa: 'تدارکات کالا، پیگیری ساخت (Expediting)، اقلام LLI و بازرسی وندور',
    titleEn: 'Project Procurement, Long Lead Items (LLI), Expediting & Logistics',
    shortTitleFa: 'تدارکات، خرید و کالا',
    shortTitleEn: 'Procurement & Logistics',
    iconName: 'Package',
    governingStandardsFa: ['فهرست سازندگان معتبر وزارت نفت (MOP Vendor List)', 'استانداردهای بازرسی کالا بر اساس ITP'],
    governingStandardsEn: ['Ministry of Petroleum Approved Vendor List (AVL)', 'Inspection & Test Plans (ITP) Verification'],
    performanceMetricsFa: ['درصد تحقق تحویل اقلام با زمان ساخت طولانی (LLI)', 'نرخ انطباق گزارش بازرسی کالا (IRC)', 'روزهای معطلی در ترخیص گمرکی', 'مبلغ صرفه‌جویی در ارزیابی مالی مناقصه (CBE)'],
    performanceMetricsEn: ['LLI Delivery Schedule Adherence', 'IRC Release Certificate Turnaround', 'Port Customs Clearance (Days)', 'Purchasing Cost Savings'],
    descriptionFa: 'منبع‌یابی وندورهای معتبر بین‌المللی و داخلی، صدور سفارش خرید (PO)، اعزام بازرس مقیم به کارخانه سازنده کمپرسور و راکتور، و حمل بوژی‌های فوق‌سنگین به سایت.',
    descriptionEn: 'Managing long lead items (LLI), vendor expediting at foreign factories, material receipt OS&D inspections, and heavy SPMT haulage.'
  },
  petro_qaqc_ndt: {
    id: 'petro_qaqc_ndt',
    trackId: 'ENERGY_PETRO',
    titleFa: 'کنترل کیفیت، تست‌های غیرمخرب (NDT)، شناسایی آلیاژ (PMI) و پرونده نهایی',
    titleEn: 'Quality Assurance, NDT Inspection, Positive Material ID (PMI) & MDR',
    shortTitleFa: 'کنترل کیفیت و NDT',
    shortTitleEn: 'QA/QC & NDT',
    iconName: 'CheckCheck',
    governingStandardsFa: ['استاندارد ASNT برای تست‌های غیرمخرب', 'استاندارد جوشکاری ASME Sec IX و Sec V'],
    governingStandardsEn: ['ASNT Nondestructive Testing Standards', 'ASME Section IX Welding & Sec V NDT'],
    performanceMetricsFa: ['تعداد مفسرهایی که فیلم رادیوگرافی (RT) را بازرسی کردند', 'درصد کنترل متریال با دستگاه کوانتومتر XRF (PMI)', 'نرخ تایید بازرسی‌های فنی کارگاهی (RFI %)', 'سرعت تکمیل کتابچه کیفیت (MDR)'],
    performanceMetricsEn: ['RT Film Interpretation Volume', 'Positive Material Identification Coverage', 'RFI First-Time Acceptance %', 'Manufacturer Data Record Dossiers'],
    descriptionFa: 'تست‌های رادیوگرافی صنعتی جوش‌ها، تست التراسونیک، کوانتومتری آلیاژی فلزات، تست چسبندگی رنگ صنعتی، و تجمیع پرونده مدارک کیفیت برای تحویل رسمی پلنت.',
    descriptionEn: 'Field radiography, ultrasonic testing, XRF alloy PMI checks, painting DFT inspections, and compiling final Quality Dossiers (MDR).'
  },
  petro_commissioning_pcc: {
    id: 'petro_commissioning_pcc',
    trackId: 'ENERGY_PETRO',
    titleFa: 'پیش‌راه‌اندازی، تکمیل مکانیکی (MC)، پانچ‌لیست و راه‌اندازی فرآیندی',
    titleEn: 'Pre-Commissioning, Mechanical Completion (MC), Punch-Listing & Start-Up',
    shortTitleFa: 'پیش‌راه‌اندازی و استارت‌آپ',
    shortTitleEn: 'Pre-Comm & Start-Up',
    iconName: 'Power',
    governingStandardsFa: ['دستورالعمل‌های بهره‌برداری صاحب دانش فنی (Licensor SOP)', 'استاندارد بازرسی ایمنی پیش از راه‌اندازی (PSSR)'],
    governingStandardsEn: ['Licensor Standard Operating Procedures (SOP)', 'Pre-Startup Safety Review (PSSR) Protocol'],
    performanceMetricsFa: ['تعداد زیرسیستم‌های دارای گواهی تکمیل مکانیکی (MCC)', 'نرخ بستن پانچ‌های دسته A (بحرانی)', 'ساعت اجرای موفقیت‌آمیز فلاشینگ و بخارشویی', 'ساعات تزریق پیوسته خوراک (Feed-in)'],
    performanceMetricsEn: ['Signed Mechanical Completion Certs (MCC)', 'Category-A Critical Punch Clearance', 'Steam/Air Blowing Milestones', 'Stable Feed-in Operating Hours'],
    descriptionFa: 'تفکیک پلنت به ساب‌سیستم‌ها، گشت پانچ‌گیری با کارفرما، شستشوی شیمیایی بویلرها، گازپرانی با نیتروژن، بارگذاری کاتالیست و تزریق خوراک تا تولید پایدار.',
    descriptionEn: 'Plant subsystems turnover, joint walk-down punchlisting, N2 purging, chemical cleaning, catalyst loading, and live feed-in.'
  }
};

export const DISCIPLINE_EXAMPLES_REGISTRY: Record<DisciplineId, DisciplineExampleContent> = {
  // CIVIL DISCIPLINES CONTENT
  civil_tbm_tunnel: {
    disciplineId: 'civil_tbm_tunnel',
    titleFa: 'عملیات حفاری مکانیزه تونل (TBM)',
    titleEn: 'TBM Tunneling Operations',
    businessProblemFa: 'خطر بالای فرونشست زمین در مجاورت خطوط انتقال گاز و آب شهری به دلیل تغییرات ناشناخته پارامترهای پیشانی دستگاه TBM در بافت‌های آبرفتی، که باعث توقف کارگاه و کلیم‌های ماده ۳۰ نشریه ۴۳۱۱ می‌شود.',
    businessProblemEn: 'Severe surface ground settlement risks above EPB TBMs intersecting pressurized gas and water mains due to dynamic soil behavior, causing site shutdowns and Circular 4311 delay claims.',
    whyAiFa: 'رابطه چندمتغیره پیچیده میان سرعت چرخش کاترهد، فشار محفظه پیشانی، دبی تزریق فوم پلیمری و نشست سطحی در لایه‌های ناهمگن با معادلات تحلیلی صلب خاک قابل پیش‌بینی نیست؛ الگوریتم زمانی پیش‌بینانه ضروری است.',
    whyAiEn: 'Complex non-linear relationships among cutterhead RPM, chamber pressure, polymer foam volume, and settlement cannot be modeled by rigid geotechnical formulas; temporal deep learning is required.',
    successCriteriaFa: [
      'کنترل حداکثر نشست تاج تونل در محدوده زیر ۲ میلی‌متر',
      'پیش‌بینی ۴۸ ساعته فرونشست با خطای کمتر از ۰.۸ میلی‌متر',
      'کاهش ۸۰ درصدی توقف‌های ناشی از تداخلات تاسیساتی'
    ],
    successCriteriaEn: [
      'Maintain maximum ground settlement under 2.0 mm',
      '48-hour settlement forecasting with < 0.8 mm MAE',
      '80% reduction in utility-related excavation stops'
    ],
    costBenefitSummaryFa: 'سرمایه‌گذاری ۱۳۵ هزار دلاری در برابر ۱.۷ میلیون دلار صرفه‌جویی مستقیم در عدم پرداخت خسارت توقف TBM و دعاوی پیمانکار.',
    costBenefitSummaryEn: '$135k iteration investment yielding $1.7M savings in avoided machine idling and contractor delay compensation.',
    roiEstimateFa: 'نرخ بازگشت سرمایه ۱۰۱۴٪ با دوره بازگشت ۱.۱ ماه پس از استقرار در اتاق فرمان TBM.',
    roiEstimateEn: '1,014% Net ROI with an amortization horizon of 1.1 months in the TBM control cabin.'
  },
  civil_stations_natm: {
    disciplineId: 'civil_stations_natm',
    titleFa: 'ساخت ایستگاه و گودهای عمیق',
    titleEn: 'Station Construction & Deep Shoring',
    businessProblemFa: 'تغییرشکل‌های جانبی بیش از حد مجاز دیواره گودهای عمیق شهری (بالای ۳۰ متر) در مجاورت سازه‌های قدیمی و ترک‌خوردگی ساختمان‌های همجوار که منجر به دستور توقف دادستانی و کارفرما می‌شود.',
    businessProblemEn: 'Excessive lateral deflection in 30m+ deep urban excavations neighboring heritage buildings, triggering judicial stop-work orders and emergency shoring interventions.',
    whyAiFa: 'پایش داده‌های صدها انکلینومتر و بارسل استرات‌ها به شکل دستی نیازمند چند روز زمان است و امکان مداخله قبل از وقوع تغییرشکل پلاستیک را نمی‌دهد؛ هوش مصنوعی همبستگی بارسل‌ها با نشست را در ثانیه کشف می‌کند.',
    whyAiEn: 'Manual processing of hundreds of inclinometers and strut load cells takes days; AI models correlated sensor telemetry in seconds, enabling proactive pre-stressing interventions.',
    successCriteriaFa: [
      'نگه‌داشتن جابه‌جایی افقی بالای گود زیر ۱۵ میلی‌متر',
      'هشدار زودهنگام پدیده تسلیم خاک با پیش‌بینی ۷۲ ساعته',
      'صفر خسارت به سازه‌های مسکونی مجاور گود'
    ],
    successCriteriaEn: [
      'Keep top lateral wall deflection strictly below 15 mm',
      '72-hour early warning before soil plastic yield thresholds',
      'Zero structural damage claims from neighboring buildings'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۱.۱ میلیون دلاری در اجتناب از تزریق‌های اضطراری تحکیم خاک و دعاوی حقوقی مالکان همجوار.',
    costBenefitSummaryEn: '$1.1M direct savings by eliminating emergency jet-grouting and neighboring property litigation costs.',
    roiEstimateFa: 'بازگشت سرمایه ۷۴۰٪ در بازه زمانی ۲.۳ ماه.',
    roiEstimateEn: '740% Net ROI recovering capital within 2.3 months.'
  },
  civil_precast_segment: {
    disciplineId: 'civil_precast_segment',
    titleFa: 'کارخانه تولید سگمنت بتنی',
    titleEn: 'Precast Segment Plant',
    businessProblemFa: 'نوسانات در مقاومت بتن ۲۸ روزه سگمنت‌ها و پیدایش ترک‌های مویی حین دمولدینگ که باعث توقف ارسال رینگ به شفت و کاهش سرعت پیشروی TBM در تونل می‌شود.',
    businessProblemEn: 'Inconsistent 28-day concrete strength and micro-cracking during vacuum demoulding, starving the tunnel shaft of segment rings and throttling TBM advance rates.',
    whyAiFa: 'تاثیر متقابل دمای بخار کیورینگ، رطوبت محفظه، عیار میکروسیلیس و زمان باز کردن قالب‌ها نیازمند بهینه‌سازی چندهدفه پیوسته بر پایه یادگیری ماشین است.',
    whyAiEn: 'Interacting dynamics of steam curing temperature, silica fume hydration, and vacuum lifting timing require ML multi-objective optimization.',
    successCriteriaFa: [
      'کاهش نرخ سگمنت‌های دارای عیب به زیر ۱.۲ درصد',
      'تضمین مقاومت فشاری بالای ۵۰ مگاپاسکال ظرف ۱۸ ساعت کیورینگ',
      'تأمین ۱۰۰٪ نیاز روزانه دو دستگاه TBM بدون وقفه'
    ],
    successCriteriaEn: [
      'Reduce segment defect reject rate to below 1.2%',
      'Achieve >50 MPa compressive strength in 18h curing',
      '100% on-time ring delivery buffer for twin TBMs'
    ],
    costBenefitSummaryFa: 'کاهش ۴۲۰ هزار دلاری در مصرف سیمان و افزودنی‌ها و رفع جریمه‌های توقف خط سگمنت‌گذاری تونل.',
    costBenefitSummaryEn: '$420k raw material savings and elimination of shaft starved-lining liquidated damages.',
    roiEstimateFa: 'بازگشت سرمایه ۴۸۰٪ در مدت ۳.۵ ماه.',
    roiEstimateEn: '480% Net ROI within 3.5 months.'
  },
  civil_track_systems: {
    disciplineId: 'civil_track_systems',
    titleFa: 'روسازی ریلی و سیستم‌های مترو',
    titleEn: 'Trackwork & Signaling Systems',
    businessProblemFa: 'ناهمواری‌های میلی‌متری هندسه خط و عدم تطابق موقعیت ریل با سوزن‌ها که منجر به ارتعاش شدید قطار، سایش زودهنگام چرخ‌ها و عدم اخذ تاییدیه کمیسیون تحویل موقت می‌شود.',
    businessProblemEn: 'Sub-millimeter track geometry deviations causing train vibration, excessive wheel-rail wear, and rejection during pre-commissioning certification tests.',
    whyAiFa: 'پردازش همزمان داده‌های هندسه واگن تستی (Track Recording Car) و بهینه‌سازی محل تنظیم پابندهای ریل نیازمند الگوریتم‌های بهینه‌سازی هوشمند فضایی است.',
    whyAiEn: 'Simultaneous processing of Track Recording Car gyro data and fastener shimming optimization demands spatial cognitive algorithms.',
    successCriteriaFa: [
      'دستیابی به شاخص کیفیت خط (TQI) بالای ۹۲',
      'کاهش ۵۰ درصدی نیاز به سنگ‌زنی مجدد درزهای جوش CWR',
      'تاییدیه قطعی بهره‌برداری آزمایشی در اولین بازرسی'
    ],
    successCriteriaEn: [
      'Achieve Track Quality Index (TQI) > 92',
      '50% reduction in rail weld joint grinding reworks',
      'First-pass passenger trial run sign-off'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۶۸۰ هزار دلاری در استهلاک خطوط ریلی و تست‌های تکراری سرعت قطار.',
    costBenefitSummaryEn: '$680k saved in rail-wheel wear mitigation and eliminated repeat testing drives.',
    roiEstimateFa: 'نرخ بازگشت سرمایه ۵۶۰٪ در مدت ۴ ماه.',
    roiEstimateEn: '560% Net ROI in 4 months.'
  },
  civil_highways_bridges: {
    disciplineId: 'civil_highways_bridges',
    titleFa: 'آزادراه و پل‌های طره‌ای کلان',
    titleEn: 'Highways & Segmental Bridges',
    businessProblemFa: 'افت شاخص بین‌المللی ناهمواری آسفالت (IRI) و ترک‌های حرارتی در روسازی‌های آزادراهی به همراه خطای کنترل خیز در عرشه‌های طره‌ای متوازن پل‌های بزرگ.',
    businessProblemEn: 'Sub-standard asphalt International Roughness Index (IRI) and deflection deviations in balanced cantilever bridge decks during progressive span execution.',
    whyAiFa: 'پیش‌بینی رفتار خزش و جمع‌شدگی بتن پل در کنار دمای متغیر محیط و فاکتورهای غلتک‌کوبی نیازمند ترکیب شبکه‌های عصبی با روابط مکانیک جامدات است.',
    whyAiEn: 'Predicting concrete creep/shrinkage under ambient temperature variations and asphalt paver dynamics requires hybrid neural solid-mechanics.',
    successCriteriaFa: [
      'شاخص ناهمواری روسازی IRI کمتر از ۱.۲ متر بر کیلومتر',
      'خطای خیز نوک طره پل کمتر از ۳ میلی‌متر در زمان اتصال دهانه',
      'کاهش ۳۰ درصدی مصرف قیر پلیمری با بهینه‌سازی تراکم'
    ],
    successCriteriaEn: [
      'Keep asphalt IRI strictly below 1.2 m/km',
      'Cantilever tip deflection error < 3 mm at span closure',
      '30% reduction in asphalt re-compaction cycles'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۱.۳ میلیون دلاری در پیشگیری از تراش و روکش مجدد آسفالت و جرایم تاخیر آزادراهی.',
    costBenefitSummaryEn: '$1.3M saved in milling/resurfacing avoidance and highway concession penalties.',
    roiEstimateFa: 'بازگشت سرمایه ۸۹۰٪ در مدت ۱.۸ ماه.',
    roiEstimateEn: '890% Net ROI in 1.8 months.'
  },
  civil_technical_claims: {
    disciplineId: 'civil_technical_claims',
    titleFa: 'دفتر فنی، کلیم و قراردادها',
    titleEn: 'Technical Office & Claims',
    businessProblemFa: 'عدم ثبت به موقع مستندات معارضین ملکی، توقفات کارگاهی و ابلاغ تغییر مقادیر که منجر به رد لوایح تاخیرات مجاز طبق ماده ۳۰ نشریه ۴۳۱۱ و تحمیل خسارت تاخیرات به شرکت می‌شود.',
    businessProblemEn: 'Delayed documentation of utility hindrances and scope variations, resulting in consultant rejection of Clause 30 delay claims and liquidated damage exposure.',
    whyAiFa: 'پردازش متن هزاران صورت‌جلسه کارگاهی، گزارش‌های روزانه پیمانکاران جزء و احکام بخشنامه‌ها با مدل‌های زبانی استنتاجی (LLM Agentic RAG) خطاهای انسانی در کلیم را حذف می‌کند.',
    whyAiEn: 'Processing thousands of daily site logs, weather records, and Circular 4311 directives with specialized LLM Agents eliminates human claim drafting gaps.',
    successCriteriaFa: [
      'استخراج خودکار علل تاخیرات در فرجه ۲۱ روزه با دقت ۱۰۰٪',
      'اثبات تمدید مدت مجاز پیمان (EOT) به ارزش حداقل ۳۰ میلیارد تومان',
      'تسریع ۶۰ درصدی در رسیدگی به صورت‌وضعیت‌های موقت کارگاهی'
    ],
    successCriteriaEn: [
      'Automated 21-day notice claim drafting with 100% compliance',
      'Defensible extension of time (EOT) securing $2M+ in claim recoveries',
      '60% acceleration in interim payment certificate audits'
    ],
    costBenefitSummaryFa: 'سرمایه‌گذاری ۶۵ هزار دلاری در برابر احیای ۱.۸ میلیون دلار مطالبات و تعدیلات مسدودشده کارفرما.',
    costBenefitSummaryEn: '$65k investment recovering $1.8M in blocked delay compensations and price escalations.',
    roiEstimateFa: 'بازگشت سرمایه ۲۲۰۰٪ در کمتر از ۲۵ روز.',
    roiEstimateEn: '2,200% Net ROI inside 25 days.'
  },
  civil_geotech_monitoring: {
    disciplineId: 'civil_geotech_monitoring',
    titleFa: 'ژئودزی و مانیتورینگ ابزاردقیق',
    titleEn: 'Geodesy & Geotech Telemetry',
    businessProblemFa: 'خطای زاویه‌ای در شفت‌های عمیق تونل و تاخیر در قرائت دستی صدها پین نشست ساختمانی که پایش بهنگام پدیده فرونشست خیابان‌های پرتردد را غیرممکن می‌سازد.',
    businessProblemEn: 'Angular plumbing errors in deep shafts and manual survey pin latency preventing real-time alert dispatch during urban street subsidence crises.',
    whyAiFa: 'تلفیق داده‌های ایستگاه توتال استیشن رباتیک، تصاویر ماهواره‌ای InSAR و سنسورهای پیزومتری نیازمند فیلترهای کالمن و شبکه‌های پیش‌بین فضایی-زمانی است.',
    whyAiEn: 'Fusing robotic total station feeds, satellite InSAR, and borehole piezometers requires spatial-temporal Kalman neural filters.',
    successCriteriaFa: [
      'کاهش خطای انحراف محور تونل در اتصال شفت‌ها به کمتر از ۲ میلی‌متر',
      'داشبورد مانیتورینگ بلادرنگ با رفرش هر ۵ دقیقه یکبار',
      'پیش‌بینی حوادث فرونشست معابر با افق ۷۲ ساعته'
    ],
    successCriteriaEn: [
      'Tunnel breakthrough axis alignment error < 2 mm',
      'Live settlement dashboard updating every 5 minutes',
      '72-hour advance notice on urban street sinkholes'
    ],
    costBenefitSummaryFa: 'جلوگیری از حادثه فرونشست شهری با صرفه‌جویی ۹۰۰ هزار دلاری در دیه و خسارات ابنیه مجاور.',
    costBenefitSummaryEn: '$900k liability avoidance from urban sinkhole collapses and structural cracks.',
    roiEstimateFa: 'بازگشت سرمایه ۶۸۰٪ در مدت ۲.۸ ماه.',
    roiEstimateEn: '680% Net ROI in 2.8 months.'
  },
  civil_heavy_fleet: {
    disciplineId: 'civil_heavy_fleet',
    titleFa: 'ماشین‌آلات و لجستیک کارگاه',
    titleEn: 'Heavy Fleet & Batching Logistics',
    businessProblemFa: 'خرابی‌های ناگهانی جرثقیل‌های پورتال شفت، لوکوموتیوهای تونلی و پمپ‌های بتن که جریان کار تمام کارگاه مترو و راه‌سازی را متوقف می‌کند.',
    businessProblemEn: 'Unplanned breakdowns of shaft gantry cranes, tunnel locomotives, and concrete pumps paralyzing active tunnel advance schedules.',
    whyAiFa: 'تحلیل داده‌های ارتعاش‌سنجی، فشار روغن هیدرولیک و آنالیز ذرات فرسایشی روغن با مدل‌های طبقه‌بندی ناهنجاری (Anomaly Detection) زمان دقیق خرابی را پیش‌بینی می‌کند.',
    whyAiEn: 'Vibration telemetry, hydraulic pressure spikes, and oil spectrographic wear data processed by Anomaly Detection models pinpoint failure windows.',
    successCriteriaFa: [
      'افزایش آماده‌به‌کاری ناوگان سنگین به بالای ۹۵ درصد',
      'کاهش ۷۰ درصدی توقف‌های اضطراری جرثقیل اصلی شفت',
      'بهینه‌سازی ۲۰ درصدی مصرف سوخت ناوگان حمل خاک'
    ],
    successCriteriaEn: [
      'Elevate heavy plant availability to > 95%',
      '70% reduction in shaft gantry crane emergency stoppages',
      '20% diesel fuel efficiency optimization across muck haulers'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۵۵۰ هزار دلاری در هزینه‌های تعمیرات اساسی اضطراری و کرایه جرثقیل‌های جایگزین.',
    costBenefitSummaryEn: '$550k saved in catastrophic machine rebuilds and third-party crane rentals.',
    roiEstimateFa: 'بازگشت سرمایه ۵۲۰٪ در مدت ۳ ماه.',
    roiEstimateEn: '520% Net ROI in 3 months.'
  },

  // PETROCHEMICAL & REFINERY DISCIPLINES CONTENT
  petro_process_safety: {
    disciplineId: 'petro_process_safety',
    titleFa: 'مهندسی فرآیند و ایمنی (HAZOP/PSM)',
    titleEn: 'Process Engineering & HAZOP',
    businessProblemFa: 'شات‌دان ناگهانی واحد تقطیر به دلیل گرفتگی مبدل‌ها، عدم تعادل موازنه جرم و انرژی و تشدید مشعل‌سوزی (Flaring) با زیان سنگین مالی و محیط‌زیستی.',
    businessProblemEn: 'Unscheduled distillation plant trips driven by heat exchanger fouling and mass-energy imbalances, causing heavy flaring emissions and throughput losses.',
    whyAiFa: 'برهم‌کنش غیرخطی ترکیب خوراک نفت خام، دمای لایه‌های مبدل و حدود ایمنی فشار در برج تقطیر با مدل‌های ترکیبی سینتیک-ماشین لرنینگ کنترل‌پذیر است.',
    whyAiEn: 'Non-linear interactions of crude assay variance, exchanger skin temperatures, and column hydraulics require hybrid kinetics-ML supervisory control.',
    successCriteriaFa: [
      'کاهش ۲.۴ میلیون دلاری مشعل‌سوزی و مصرف سوخت سالانه',
      'پیش‌بینی ۴۵ روزه زمان رسیدن افت فشار به حد مجاز شستشو',
      'تایید کامل گیت‌های ایمنی HAZOP و استانداردهای API 521'
    ],
    successCriteriaEn: [
      '$2.4M annualized reduction in flaring and furnace fuel burn',
      '45-day descaling advance warning before differential pressure limits',
      'Full compliance with HAZOP safety matrices and API 521 codes'
    ],
    costBenefitSummaryFa: 'سرمایه‌گذاری ۱۶۰ هزار دلاری در برابر ۳.۶۵ میلیون دلار سود ناشی از صرفه‌جویی انرژی و حفظ تولید پایدار.',
    costBenefitSummaryEn: '$160k investment delivering $3.65M in annual fuel conservation and production preservation.',
    roiEstimateFa: 'نرخ بازگشت سرمایه ۲۱۸۱٪ در مدت کمتر از ۲۰ روز.',
    roiEstimateEn: '2,181% Net ROI with payback within 18 days.'
  },
  petro_piping_layout: {
    disciplineId: 'petro_piping_layout',
    titleFa: 'مهندسی پایپینگ، تحلیل تنش و جوشکاری',
    titleEn: 'Piping, Stress & Welding',
    businessProblemFa: 'تنش‌های شدید حرارتی در اتصالات لوله‌های فشار قوی به نازل‌های پمپ‌ها و برج‌ها، و نرخ بالای تعمیر جوش (Weld Repair Rate) در رادیوگرافی که زمان هیدروتست را ماه‌ها عقب می‌اندازد.',
    businessProblemEn: 'Thermal stress concentrations on pump/vessel nozzles violating ASME B31.3 limits, combined with high radiography weld repair rates delaying hydrotest clearances.',
    whyAiFa: 'پیش‌بینی رفتار خزش و تنش دینامیکی خطوط لوله و شناسایی فاکتورهای خطای جوشکاران آلیاژی با سیستم‌های بینایی ماشین و هوش تجویزی سرعت رفع پانچ‌ها را چند برابر می‌کند.',
    whyAiEn: 'Predicting dynamic stress hotspots and identifying welder error patterns via predictive analytics eliminates fabrication shop bottlenecks.',
    successCriteriaFa: [
      'کاهش نرخ عیب جوش در رادیوگرافی به زیر ۱.۵ درصد',
      'صفر شدن تنش‌های فراتر از حد مجاز روی نازل تجهیزات دوار',
      'تسریع ۴۰ درصدی در صدور تست‌پکیج‌های هیدروتست'
    ],
    successCriteriaEn: [
      'Compress weld radiography defect rate strictly under 1.5%',
      'Zero nozzle thermal over-stress violations on rotating assets',
      '40% faster hydrotest package turnover'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۸۵۰ هزار دلاری در هزینه‌های برش، رادیوگرافی مجدد و آزمون‌های غیرمخرب جوشکاری.',
    costBenefitSummaryEn: '$850k saved by eliminating weld cut-outs, re-radiography, and hydrotest delays.',
    roiEstimateFa: 'بازگشت سرمایه ۹۲۰٪ در مدت ۱.۶ ماه.',
    roiEstimateEn: '920% Net ROI in 1.6 months.'
  },
  petro_mechanical_heavy: {
    disciplineId: 'petro_mechanical_heavy',
    titleFa: 'مکانیک، تجهیزات سنگین و ریگینگ',
    titleEn: 'Mechanical & Heavy Lift',
    businessProblemFa: 'ریسک‌های جابه‌جایی و نصب برج‌های چندصد تنی با جرثقیل‌های غول‌پیکر در شرایط باد، و خطاهای ناهم‌محوری (Misalignment) در کوپلینگ توربوکمپرسورها که موجب ارتعاش شدید می‌شود.',
    businessProblemEn: 'Catastrophic lift risks during heavy distillation column erections under wind loads, and turbocompressor train shaft misalignment causing severe vibration trips.',
    whyAiFa: 'مدلسازی بلادرنگ متغیرهای باد، شعاع بوم جرثقیل، تنش کابل‌ها و هم‌محوری لیزری شفت‌ها با الگوریتم‌های شناختی ایمنی صد درصدی نصب را تضمین می‌کند.',
    whyAiEn: 'Real-time modeling of wind dynamics, crane boom radius, wire rope tensile stresses, and laser alignment offsets guarantees lift safety.',
    successCriteriaFa: [
      'نصب ۱۰۰٪ ایمن سنگین‌ترین ستون‌های پالایشگاه با صفر حادثه',
      'دستیابی به لرزش یاتاقان کمپرسور زیر ۱.۵ میلی‌متر بر ثانیه در Solo Run',
      'کاهش ۳۵ درصدی زمان استقرار جرثقیل‌های سنگین استیجاری'
    ],
    successCriteriaEn: [
      '100% zero-incident erection of columns weighing up to 800 Tons',
      'Compressor bearing vibration strictly below 1.5 mm/s in 72h solo run',
      '35% reduction in heavy crawler crane rental downtime'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۱.۴ میلیون دلاری در اجتناب از تکرار باربرداری و تعمیرات اساسی محور کمپرسور.',
    costBenefitSummaryEn: '$1.4M saved in heavy lift demurrage and compressor shaft mechanical damage avoidance.',
    roiEstimateFa: 'بازگشت سرمایه ۱۱۰۰٪ در کمتر از ۱.۵ ماه.',
    roiEstimateEn: '1,100% Net ROI in 1.5 months.'
  },
  petro_electrical_inst: {
    disciplineId: 'petro_electrical_inst',
    titleFa: 'برق، ابزاردقیق و کنترل (DCS/ESD)',
    titleEn: 'Electrical & Instrumentation',
    businessProblemFa: 'قطعی نویز سیگنال در تگ‌های ترانسمیترهای فشار و دما، خطاهای لوپ‌چک در زمان راه‌اندازی و تاخیر در کانفیگ لاجیک‌های اضطراری سیستم ESD اتاق کنترل.',
    businessProblemEn: 'Transmitter signal noise, loop-check wiring bottlenecks, and delayed ESD interlock validation threatening scheduled gas feed-in milestones.',
    whyAiFa: 'تشخیص خودکار ایرادات سیم‌کشی و اعتبارسنجی منطق ماتریس‌های علت و معلول (Cause & Effect) در سیستم‌های کنترل با هوش مصنوعی هزاران ساعت تست را کوتاه می‌کند.',
    whyAiEn: 'Automated signal fault diagnostics and AI verification of Cause & Effect safety interlocks compress commissioning testing loops by weeks.',
    successCriteriaFa: [
      'انجام لوپ‌چک کامل ۱۰,۰۰۰ تگ در نصف زمان پیش‌بینی‌شده',
      'شناسایی و تصحیح ۱۰۰٪ خطاهای سیستم ضدانفجار (Ex) پیش از تزریق گاز',
      'زمان پاسخگویی سیستم توقف اضطراری زیر ۵۰ میلی‌ثانیه'
    ],
    successCriteriaEn: [
      'Complete 10k DCS/ESD loop checks in 50% scheduled time',
      'Zero ATEX/Ex hazardous area non-conformances before Gas-In',
      'Safety Instrumented System (SIS) trip response < 50ms'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۷۲۰ هزار دلاری در کاهش زمان اقامت کارشناسان وندورهای خارجی سیستم‌های کنترل.',
    costBenefitSummaryEn: '$720k saved in foreign vendor TA service fees and faster substation commissioning.',
    roiEstimateFa: 'بازگشت سرمایه ۷۸۰٪ در بازه ۲.۵ ماه.',
    roiEstimateEn: '780% Net ROI in 2.5 months.'
  },
  petro_civil_structure: {
    disciplineId: 'petro_civil_structure',
    titleFa: 'سیویل و سازه‌های صنعتی',
    titleEn: 'Industrial Civil & Pipe Racks',
    businessProblemFa: 'خستگی و لرزش فونداسیون کمپرسورهای رفت و برگشتی، نشست نامتقارن مخازن ذخیره نفتی و تاخیر در اعمال پوشش‌های ضدحریق (PFP) روی پایپ‌رک‌های اصلی.',
    businessProblemEn: 'Resonant vibration in reciprocating compressor table-tops, uneven settlement in crude tanks, and delayed structural fireproofing (PFP) execution.',
    whyAiFa: 'محاسبات برهم‌کنش خاک و فونداسیون دینامیکی در ترکیب با داده‌های پایش نشست مخازن بزرگ از طریق یادگیری عمیق فیزیک‌محور مهار می‌شود.',
    whyAiEn: 'Physics-informed neural models predict soil-foundation dynamic resonance and API 650 tank edge settlement behavior accurately.',
    successCriteriaFa: [
      'حفظ دامنه نوسان فونداسیون کمپرسور در محدوده مجاز API 686',
      'عدم انحراف نشست فونداسیون مخازن نفت از استاندارد API 653',
      'کاهش ۲۰ درصدی زمان نصب پوشش‌های اپوکسی ضدحریق'
    ],
    successCriteriaEn: [
      'Maintain compressor foundation peak-to-peak vibration within API 686 limits',
      'Strict compliance of tank perimeter settlement with API 653',
      '20% faster application of structural epoxy fireproofing'
    ],
    costBenefitSummaryFa: 'جلوگیری از تخریب یاتاقان‌های کمپرسور با ارزش ۵۸۰ هزار دلار صرفه‌جویی سالانه.',
    costBenefitSummaryEn: '$580k annual savings in rotating machine foundation stability and bearing lifespan.',
    roiEstimateFa: 'بازگشت سرمایه ۶۱۰٪ در مدت ۳ ماه.',
    roiEstimateEn: '610% Net ROI in 3 months.'
  },
  petro_procurement_expediting: {
    disciplineId: 'petro_procurement_expediting',
    titleFa: 'تدارکات، اقلام LLI و زنجیره تأمین',
    titleEn: 'Procurement, LLI & Supply Chain',
    businessProblemFa: 'تاخیر در تحویل اقلام با زمان ساخت طولانی (راکتورها و آلیاژهای خاص)، توقف در ترخیص گمرکی و کشف کسری یا آسیب کالا (OS&D) پس از رسیدن به سایت.',
    businessProblemEn: 'Fabrication delays in Long Lead Items (reactors, heavy forgings), customs logjams, and damaging OS&D discrepancies discovered at site receipt.',
    whyAiFa: 'رصد هوشمند پایپ‌لاین تولید وندورها با تحلیل ریسک چندمعیاره و پردازش اسناد ترخیص و گواهی رهاسازی (IRC) ریسک تاخیرات خرید را حذف می‌کند.',
    whyAiEn: 'Multi-variable vendor tracking models analyzing factory production milestones and customs paperwork mitigate supply chain critical path delays.',
    successCriteriaFa: [
      'پیش‌بینی تاخیرات ساخت کارخانه‌ای با افق ۹۰ روز قبل از سررسید',
      'کاهش زمان ترخیص تجهیزات گمرکی به زیر ۱۰ روز',
      'صفر کسری در بالک متریال پایپینگ حین عملیات نصب'
    ],
    successCriteriaEn: [
      '90-day early alert on foreign vendor shop fabrication delays',
      'Compress customs port clearance lead time to under 10 days',
      'Zero bulk piping fitting shortages during active field erection'
    ],
    costBenefitSummaryFa: 'جلوگیری از توقف ۲ ماهه پیمانکاران نصب به ارزش ۲.۱ میلیون دلار صرفه‌جویی در هزینه‌های ادعا.',
    costBenefitSummaryEn: '$2.1M contractor idle-time claim avoidance through seamless LLI delivery synchronization.',
    roiEstimateFa: 'بازگشت سرمایه ۱۶۵۰٪ در کمتر از ۱ ماه.',
    roiEstimateEn: '1,650% Net ROI in under 1 month.'
  },
  petro_qaqc_ndt: {
    disciplineId: 'petro_qaqc_ndt',
    titleFa: 'کنترل کیفیت، بازرسی جوش و NDT',
    titleEn: 'QA/QC, Welding & NDT Inspection',
    businessProblemFa: 'اشتباه در نصب اتصالات آلیاژی (تداخل استیل و کربن استیل)، تاخیر در تفسیر فیلم‌های رادیوگرافی جوش و عدم تکمیل به موقع کتابچه‌های کیفیت (MDR).',
    businessProblemEn: 'Alloy material cross-contamination, backlog in weld radiographic film interpretation, and late turnover of Manufacturer Data Records (MDR).',
    whyAiFa: 'سیستم‌های بینایی هوشمند برای تفسیر دیجیتال فیلم‌های رادیوگرافی (AI RT Film Interpretation) و ردیابی داده‌های کدهای تست PMI ریسک خطای بازرسان را به صفر می‌رساند.',
    whyAiEn: 'Automated AI radiographic film interpretation and digital PMI alloy tracking eliminate inspector fatigue and human oversight.',
    successCriteriaFa: [
      'دقت بالای ۹۹ درصد در کشف عیوب بحرانی جوش (ترک، عدم نفوذ و حبس سرباره)',
      'تایید ۱۰۰٪ گواهی‌های شناسایی آلیاژ (PMI) در محل نصب',
      'تولید خودکار ۹۰ درصد فصول کتابچه مدارک نهایی کیفیت (MDR)'
    ],
    successCriteriaEn: [
      '99%+ accuracy in detecting critical weld defects (cracks, lack of fusion)',
      '100% positive verification of alloy metallurgy via digital PMI tags',
      'Automated compilation of 90% of plant Quality Dossiers (MDR)'
    ],
    costBenefitSummaryFa: 'صرفه‌جویی ۱.۲ میلیون دلاری در اجتناب از حوادث نشتی در هیدروتست و هزینه‌های بازرسی مجدد.',
    costBenefitSummaryEn: '$1.2M saved in hydrotest rupture prevention and streamlined MDR acceptance.',
    roiEstimateFa: 'بازگشت سرمایه ۱۳۵۰٪ در مدت ۱.۲ ماه.',
    roiEstimateEn: '1,350% Net ROI in 1.2 months.'
  },
  petro_commissioning_pcc: {
    disciplineId: 'petro_commissioning_pcc',
    titleFa: 'پیش‌راه‌اندازی، پانچ و استارت‌آپ (PC&C)',
    titleEn: 'Pre-Commissioning & Start-Up',
    businessProblemFa: 'انباشت هزاران پانچ رده A (بحرانی) در زمان تحویل‌گیری مکانیکی، نشت گاز در تست نیتروژن-هلیوم و تاخیر در دستیابی به محصول استاندارد (On-Spec).',
    businessProblemEn: 'Accumulation of Category-A punchlist items blocking mechanical completion, nitrogen leak test breaches, and protracted timelines to on-spec production.',
    whyAiFa: 'سیستم‌های مدیریت تحویل‌گیری هوشمند با اولویت‌بندی خودکار ساب‌سیستم‌های راه‌اندازی و شبیه‌سازی مراحل تزریق خوراک مسیر بحرانی را کوتاه می‌کنند.',
    whyAiEn: 'Intelligent subsystem turnover matrices dynamically prioritizing punch clearance and feed-in ramp sequences compress start-up by weeks.',
    successCriteriaFa: [
      'بستن ۱۰۰٪ پانچ‌های بحرانی رده A ظرف مدت ۲ هفته',
      'تزریق ایمن خوراک (Feed-In) بدون حتی یک حادثه نشت فرآیندی',
      'دستیابی به تولید محصول استاندارد با مشخصات تضمین‌شده (PTR) در ۷۲ ساعت'
    ],
    successCriteriaEn: [
      'Clear 100% of critical Category-A punches inside a 14-day window',
      'Zero-leakage, 100% safe initial gas/feed introduction (Feed-In)',
      'Attain on-spec product and successful PTR within 72 hours of start-up'
    ],
    costBenefitSummaryFa: 'جلوگیری از تاخیر یک‌ماهه در تولید تجاری با ارزش بیش از ۴.۵ میلیون دلار سود ناخالص.',
    costBenefitSummaryEn: '$4.5M in early commercial production revenue unlocked through expedited commissioning turnover.',
    roiEstimateFa: 'بازگشت سرمایه ۲۸۰۰٪ در کمتر از ۲ هفته.',
    roiEstimateEn: '2,800% Net ROI within 14 days.'
  }
};

export function getDisciplineMetadata(disciplineId: DisciplineId): DisciplineMetadata {
  return DISCIPLINE_REGISTRY[disciplineId] || DISCIPLINE_REGISTRY.civil_tbm_tunnel;
}

export function getDisciplineExampleContent(
  disciplineId: DisciplineId
): DisciplineExampleContent {
  return (
    DISCIPLINE_EXAMPLES_REGISTRY[disciplineId] ||
    DISCIPLINE_EXAMPLES_REGISTRY.civil_tbm_tunnel
  );
}

export function getDisciplinesByTrack(trackId: IndustryTrackId): DisciplineMetadata[] {
  return Object.values(DISCIPLINE_REGISTRY).filter((d) => d.trackId === trackId);
}

export interface DisciplinePromptPair {
  weakPromptFa: string;
  weakPromptEn: string;
  weakCritiqueFa: string;
  weakCritiqueEn: string;
  engineeredPromptFa: string;
  engineeredPromptEn: string;
  engineeredBreakdownFa: { role: string; context: string; task: string; output: string };
  engineeredBreakdownEn: { role: string; context: string; task: string; output: string };
}

export function getDisciplinePromptShowcase(disciplineId: DisciplineId): DisciplinePromptPair {
  const meta = getDisciplineMetadata(disciplineId);
  const content = getDisciplineExampleContent(disciplineId);

  return {
    weakPromptFa: `«یک گزارش و تحلیل درباره وضعیت ${meta.titleFa} برای من بنویس.»`,
    weakPromptEn: `"Write a report and analysis about ${meta.titleEn}."`,
    weakCritiqueFa: `ایراد پرامپت: فاقد نقش، فاقد داده‌های سنسوری و استانداردهای مرجع (${meta.governingStandardsFa[0]}) و بدون خروجی ساختاریافته. نتیجه متنی کلی و توهم‌آمیز خواهد بود.`,
    weakCritiqueEn: `Flaw: Lacks role persona, operational metrics (${meta.performanceMetricsEn[0]}), reference standards, and output constraints. Yields generic textbook fluff.`,
    engineeredPromptFa: `تو مهندس ارشد و هماهنگ‌کننده تخصصی در واحد ${meta.titleFa} بر مبنای استاندارد ${meta.governingStandardsFa[0]} هستی [Role].
در حال حاضر با چالش عملیاتی روبرو هستیم: ${content.businessProblemFa} [Context].
داده‌های ورودی و پارامترهای تلمتری بر اساس شاخص‌های [${meta.performanceMetricsFa.join(' | ')}] در اختیار توست.
وظیفه تو این است که ریشه بروز خطا را واکاوی کرده و راهکار پیشگیرانه کاهش ریسک را پیشنهاد دهی [Task].
خروجی باید در یک جدول ۴ ستونه با عناوین [عامل بحرانی | حد مجاز استاندارد | انحراف فعلی | اقدام اصلاحی شیفت] بدون زیاده‌گویی استخراج شود [Output].`,
    engineeredPromptEn: `You are a Lead Specialist in ${meta.titleEn} adhering to ${meta.governingStandardsEn[0]} [Role].
Operational Context: ${content.businessProblemEn} [Context].
Input telemetry encompasses key metrics: [${meta.performanceMetricsEn.join(' | ')}].
Your task is to analyze root causes and formulate risk mitigation protocols [Task].
Output format must be a structured 4-column Markdown table: [Critical Anomaly | Engineering Limit | Current Deviation | Shift Action Plan] with zero preamble [Output].`,
    engineeredBreakdownFa: {
      role: `مهندس ارشد ${meta.shortTitleFa} منطبق بر ${meta.governingStandardsFa[0]}`,
      context: content.businessProblemFa.slice(0, 100) + '...',
      task: `واکاوی ریشه انحرافات ${meta.performanceMetricsFa[0]} و تدوین برنامه اقدام`,
      output: `جدول ۴ ستونه: [عامل بحرانی | حد استاندارد | انحراف | اقدام اصلاحی]`
    },
    engineeredBreakdownEn: {
      role: `Lead Specialist in ${meta.shortTitleEn} (${meta.governingStandardsEn[0]})`,
      context: content.businessProblemEn.slice(0, 100) + '...',
      task: `Analyze root anomalies in ${meta.performanceMetricsEn[0]} and prescribe shift actions`,
      output: `4-column Markdown table: [Anomaly | Standard Limit | Deviation | Action Plan]`
    }
  };
}

