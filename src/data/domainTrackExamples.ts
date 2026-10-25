import {
  IndustryTrackId,
  DomainPhaseExample,
  DomainTrackExamplesRegistry
} from '../types/industryTrack';

export const DOMAIN_PHASE_EXAMPLES: DomainTrackExamplesRegistry = {
  CIVIL_INFRA: {
    1: {
      phaseId: 1,
      trackId: 'CIVIL_INFRA',
      titleFa: 'درک کسب‌وکار: مگاپروژه احداث خطوط مترو و ترابری ریلی',
      titleEn: 'Business Understanding: Urban Metro & Rail Transit Megaproject',
      exampleNoteFa:
        'مثال: هدف اصلی، پیش‌بینی فرونشست زمین بالای سر دستگاه حفار مکانیزه (TBM) در تقاطع با تاسیسات زیرسطحی شهری (خطوط گاز و لوله‌های انتقال آب) جهت پیشگیری از توقف عملیات و ادعاهای خسارت پیمانکار تحت ماده ۳۰ نشریه ۴۳۱۱ است.',
      exampleNoteEn:
        'Example: Primary objective is forecasting surface ground subsidence along the mechanized TBM drive intersecting municipal gas and water mains, preventing work stoppages and delay claims under Circular 4311 (Clause 30).',
      artifacts: {
        backgroundFa:
          'پروژه احداث خط ۱۰ متروی کلان‌شهر شامل ۲۲ کیلومتر تونل مکانیزه با دو دستگاه TBM و ۱۸ ایستگاه زیرزمینی. مجاورت با سازه‌های قدیمی و خطوط انتقال نیرو ریسک فرونشست بحرانی ایجاد کرده است.',
        backgroundEn:
          'Construction of a 22 km urban metro tunnel utilizing dual TBMs with 18 underground stations. Proximity to heritage structures and pressurized utilities creates severe settlement risk.',
        primaryObjectiveFa:
          'پیش‌بینی حوادث ژئوتکنیکی و نشست سطح معابر با حداقل افق ۴۸ ساعت قبل از رسیدن کله‌حفار TBM برای جلوگیری از خسارات ساختمانی و تاخیرات قراردادی.',
        primaryObjectiveEn:
          'Predict geotechnical subsidence events at least 48 hours ahead of the TBM cutterhead to eliminate structural damage and critical-path contractual delays.',
        relatedQuestionsFa: [
          'کدام پارامترهای اپراتوری TBM (فشار پیشانی، گشتاور کله‌حفار، نرخ تزریق فوم) بیشترین همبستگی را با نشست سطحی دارند؟',
          'آیا سامانه هوش مصنوعی می‌تواند احتمال فعال‌شدن بند تعلیق کار یا ادعای تاخیرات مجاز پیمانکار را به صورت ریالی تخمین بزند؟'
        ],
        relatedQuestionsEn: [
          'Which TBM operational telemetry (face pressure, cutterhead torque, bentonite flow) correlates most strongly with ground subsidence?',
          'Can the cognitive model estimate financial exposure under contractor delay claim clauses?'
        ],
        sampleDatasetTitleFa: 'تلمتری لحظه‌ای سنسورهای TBM و قرائت پین‌های ژئوتکنیک نقشه‌برداری',
        sampleDatasetTitleEn: 'Real-time TBM parameter telemetry & ground settlement pin measurements',
        sampleContractClauseFa: 'ماده ۳۰ و ۴۴ شرایط عمومی پیمان (نشریه ۴۳۱۱ - تاخیرات و تغییر مقادیر کار)',
        sampleContractClauseEn: 'Clauses 30 & 44 of Standard Conditions of Contract (Circular 4311)'
      }
    },
    2: {
      phaseId: 2,
      trackId: 'CIVIL_INFRA',
      titleFa: 'درک داده‌ها: سنسورهای ابزار دقیق ژئوتکنیک و قرائت‌های ابنیه',
      titleEn: 'Data Understanding: Geotechnical Instrumentation & Structural Telemetry',
      exampleNoteFa:
        'مثال: تجمیع داده‌های پیزومترها، شیب‌سنج‌ها (Inclinometer)، تصاویر ارتوفتوی هفتگی پهپادی و فایل‌های خروجی پارامترهای مانیتورینگ دستگاه TBM.',
      exampleNoteEn:
        'Example: Aggregating piezometer pore pressures, borehole inclinometer deflections, weekly drone orthomosaics, and continuous TBM data logs.',
      artifacts: {
        backgroundFa: 'داده‌های حسگرهای ژئوتکنیکی هر ۵ ثانیه یکبار از طریق دیتالاگرهای بی‌سیم ارسال می‌شوند اما قطعی مقطعی سنسورها نویز بالایی دارد.',
        backgroundEn: 'Geotechnical sensors transmit telemetry every 5s over wireless loggers, but packet dropouts generate substantial missing values.',
        primaryObjectiveFa: 'پالایش، همگام‌سازی زمانی و اعتبارسنجی کیفی داده‌های سنسوری برای تغذیه پایدار به مدل یادگیری عمیق.',
        primaryObjectiveEn: 'Clean, synchronize timestamps, and validate data quality for reliable ingestion by the deep learning pipeline.',
        relatedQuestionsFa: ['نرخ داده‌های پرت (Outliers) در سنسورهای شیب‌سنج چقدر است؟'],
        relatedQuestionsEn: ['What is the outlier frequency in borehole inclinometer readings?']
      }
    },
    3: {
      phaseId: 3,
      trackId: 'CIVIL_INFRA',
      titleFa: 'آماده‌سازی داده‌ها: هم‌ترازی مکانی-زمانی داده‌های نقشه و سنسور',
      titleEn: 'Data Preparation: Spatial-Temporal Alignment of Surveying & Telemetry',
      exampleNoteFa:
        'مثال: تبدیل مختصات UTM قرائت‌های نشست به ایستگاه‌بندی محور تونل (Chainage)، نرمال‌سازی فشار خاک و مهندسی ویژگی شتاب فرونشست در بازه ۷۲ ساعته.',
      exampleNoteEn:
        'Example: Converting UTM survey coordinates into tunnel chainage alignments, normalizing earth pressure balance, and feature engineering 72h settlement acceleration.',
      artifacts: {
        backgroundFa: 'پراکندگی مکانی گمانه‌ها نیازمند درونیابی فضایی (Kriging) و پیوند به مدل سه‌بعدی BIM پروژه است.',
        backgroundEn: 'Sparse borehole distributions require spatial kriging and structural integration into the project BIM model.',
        primaryObjectiveFa: 'تولید ماتریس ویژگی‌های مهندسی‌شده با ابعاد زمانی برای مدلسازی رگرسیون تداخلی.',
        primaryObjectiveEn: 'Generate engineered feature matrices with temporal lag horizons for cross-interference regression modeling.',
        relatedQuestionsFa: ['چگونه تفاوت نرخ نمونه‌برداری سنسورها (هر ثانیه) و قرائت‌های دستی نقشه‌برداری (روزانه) پل شود؟'],
        relatedQuestionsEn: ['How to reconcile 1Hz machine telemetry with daily manual surveying observations?']
      }
    },
    4: {
      phaseId: 4,
      trackId: 'CIVIL_INFRA',
      titleFa: 'مدلسازی: پیش‌بینی نشست سطحی و هشدار زودهنگام تداخلات',
      titleEn: 'Modeling: Settlement Prediction & Spatial Interference Early Warning',
      exampleNoteFa:
        'مثال: مقایسه شبکه عصبی برگشتی دوطرفه (Bi-LSTM) با مدل‌های رگرسیون فیزیک‌محور (PEC) جهت پیش‌بینی پروفیل نشست پک (Peck Curve).',
      exampleNoteEn:
        'Example: Evaluating Bidirectional LSTM against Physics-Informed Neural Networks (PINN) for predicting Peck empirical settlement curves.',
      artifacts: {
        backgroundFa: 'مدل باید در کمتر از ۵۰۰ میلی‌ثانیه هشدار سطح هشدار زرد و قرمز را به اتاق کنترل TBM ارسال کند.',
        backgroundEn: 'Model inference must flag yellow/red safety alerts to the TBM control cabin in under 500ms.',
        primaryObjectiveFa: 'دستیابی به خطای میانگین کمتر از ۲ میلی‌متر در برآورد حداکثر نشست زمین در بالای تاج تونل.',
        primaryObjectiveEn: 'Achieve < 2mm Mean Absolute Error in estimating maximum crown subsidence.',
        relatedQuestionsFa: ['آیا مدل توانایی تعمیم به لایه‌های زمین‌شناسی پیش‌بینی‌نشده را دارد؟'],
        relatedQuestionsEn: ['Can the model generalize across unmapped geological faults and alluvial transitions?']
      }
    },
    5: {
      phaseId: 5,
      trackId: 'CIVIL_INFRA',
      titleFa: 'ارزیابی: انطباق با معیارهای پایش ابزاردقیق نشریه ۵۵ و ایمنی شهری',
      titleEn: 'Evaluation: Compliance with Circular 55 Geotechnical Limits & Safety Standards',
      exampleNoteFa:
        'مثال: ارزیابی مدل در ۱۰ سناریوی بحرانی عبور از زیر مجاری فاضلاب و پل‌های هوایی، و محاسبه کاهش ادعاهای تاخیرات مالی پیمانکاران.',
      exampleNoteEn:
        'Example: Testing the model against 10 critical utility-crossing scenarios and quantifying contractor claim exposure mitigations.',
      artifacts: {
        backgroundFa: 'تایید مهندس مشاور و کارفرما بر اساس تطابق با حدود مجاز چرخش زاویه‌ای سازه‌ها در مبحث ۷ مقررات ملی ساختمان.',
        backgroundEn: 'Supervisory consultant sign-off based on National Building Code (Part 7) allowable angular distortions.',
        primaryObjectiveFa: 'کاهش ۹۰ درصدی توقف‌های اضطراری TBM و اثبات توجیه اقتصادی در جلسه دفاعیه کارفرما.',
        primaryObjectiveEn: '90% reduction in unplanned TBM emergency halts with demonstrated contractor claim defenses.',
        relatedQuestionsFa: ['نرخ هشدار کاذب (False Alarm) مدل در روزهای بارانی چقدر است؟'],
        relatedQuestionsEn: ['What is the false positive alarm rate during heavy rainfall water-table variations?']
      }
    },
    6: {
      phaseId: 6,
      trackId: 'CIVIL_INFRA',
      titleFa: 'استقرار و عملیات: یکپارچه‌سازی با داشبورد مانیتورینگ کارگاه و BIM',
      titleEn: 'Operational Deployment: Integration with Site Operations & 4D BIM Dashboard',
      exampleNoteFa:
        'مثال: استقرار روی سرور لبه کارگاهی (Edge Server) در اتاق مانیتورینگ کارفرما، با قابلیت ارسال هشدار پیامکی به سرپرست کارگاه و سوپروایزر TBM.',
      exampleNoteEn:
        'Example: On-premise edge appliance deployment at the client site cabin with automated SMS alerts to geotechnical superintendents.',
      artifacts: {
        backgroundFa: 'داشبورد باید وضعیت پیشروی سگمنت‌گذاری و پایش تغییرشکل را بر روی نقشه GIS سه‌بعدی نمایش دهد.',
        backgroundEn: 'The operational dashboard renders real-time ring installations and displacement vectors over 3D GIS.',
        primaryObjectiveFa: 'استقرار پایدار با آپ‌تایم ۹۹.۹٪ بدون نیاز به اینترنت سراسری در عمق ۲۵ متری زمین.',
        primaryObjectiveEn: '99.9% uptime standalone operation 25m underground with zero external internet dependencies.',
        relatedQuestionsFa: ['پروتکل بازیابی سیستم در صورت قطع ناگهانی برق دیزل ژنراتور کارگاه چیست؟'],
        relatedQuestionsEn: ['What is the automated recovery failover following emergency generator switches?']
      }
    }
  },
  ENERGY_PETRO: {
    1: {
      phaseId: 1,
      trackId: 'ENERGY_PETRO',
      titleFa: 'درک کسب‌وکار: مگاپروژه پالایشگاهی، پتروشیمی و گاز طبیعی',
      titleEn: 'Business Understanding: Refinery, Petrochemical & Gas Processing Megaproject',
      exampleNoteFa:
        'مثال: هدف اصلی، پیش‌بینی زودهنگام پدیده رسوب‌گرفتگی (Fouling) و کک‌گرفتگی در مبدل‌های حرارتی و برج تقطیر میعانات گازی جهت جلوگیری از شات‌دان ناخواسته و کاهش مشعل‌سوزی (Flaring) به ارزش حداقل ۳ میلیون دلار در سال.',
      exampleNoteEn:
        'Example: Primary objective is early prediction of heat exchanger fouling and coking in the crude distillation train to avoid emergency plant shutdowns and cut flaring emissions by $3M+ annually.',
      artifacts: {
        backgroundFa:
          'پالایشگاه میعانات گازی پارس جنوبی با ظرفیت پالایش ۳۶۰ هزار بشکه در روز. رسوب تدریجی در مبدل‌های پیش‌گرمایش، مصرف سوخت کوره و ریسک توقف ناگهانی تولید را افزایش داده است.',
        backgroundEn:
          'Gas condensate mega-refinery processing 360k BPD. Heavy fouling in preheat trains drives up furnace fuel consumption and threatens unplanned refinery trips.',
        primaryObjectiveFa:
          'پیش‌بینی نرخ افت ضریب انتقال حرارت (U-value) و زمان بهینه شستشوی مبدل‌ها بدون توقف خط تولید در بازه ۶۰ روزه آینده.',
        primaryObjectiveEn:
          'Predict the overall heat transfer coefficient degradation and schedule optimal descaling windows 60 days ahead without unbalancing throughput.',
        relatedQuestionsFa: [
          'چگونه تغییر در ترکیب خوراک ورودی (API و درصد گوگرد) بر سرعت رسوب‌گذاری اثر می‌گذارد؟',
          'آیا مدل هوش مصنوعی می‌تواند دمای بهینه سوخت کوره را برای مینیمم کردن مشعل‌سوزی و انتشار کربن تنظیم کند؟'
        ],
        relatedQuestionsEn: [
          'How does feed crude API gravity and sulfur variance impact thermal fouling kinetics?',
          'Can the cognitive model optimize furnace firing temperatures to minimize carbon intensity and flaring?'
        ],
        sampleDatasetTitleFa: 'تلمتری سنسورهای سیستم DCS و تاریخچه بازرسی فنی ضخامت‌سنجی التراسونیک',
        sampleDatasetTitleEn: 'DCS process historian telemetry & ultrasonic thickness corrosion logs',
        sampleContractClauseFa: 'بندهای ضمانت عملکرد و جریمه شات‌دان پالایشگاه در قراردادهای EPC/O&M',
        sampleContractClauseEn: 'Guaranteed performance KPIs & unplanned downtime penalties in EPC/O&M contracts'
      }
    },
    2: {
      phaseId: 2,
      trackId: 'ENERGY_PETRO',
      titleFa: 'درک داده‌ها: داده‌های DCS، لاگ‌های آزمایشگاهی خوراک و لاگ‌های P&ID',
      titleEn: 'Data Understanding: Distributed Control System (DCS), Lab Assays & P&ID',
      exampleNoteFa:
        'مثال: تجمیع تگ‌های حرارتی، دبی، فشار و آنالیزورهای آنلاین گاز کروماتوگرافی (GC) پالایشگاه از بستر دیتابیس صنعتی OSIsoft PI / Aspen InfoPlus.',
      exampleNoteEn:
        'Example: Aggregating temperature, differential pressure, flow transmitters, and online gas chromatography from OSIsoft PI historians.',
      artifacts: {
        backgroundFa: 'سامانه بیش از ۱۲ هزار تگ آنالوگ را هر ۵ ثانیه ذخیره می‌کند، اما مشکلات دریفت سنسور و اشباع سیگنال وجود دارد.',
        backgroundEn: 'Historian records 12k+ analog tags at 5-second intervals, but instrument drift and signal clipping require systematic isolation.',
        primaryObjectiveFa: 'شناسایی و تصحیح سنسورهای کالیبره‌نشده و همبستگی‌سنجی تگ‌های پیوسته با آزمایش‌های روزانه آزمایشگاه نفت.',
        primaryObjectiveEn: 'Identify uncalibrated transmitters and align high-frequency DCS telemetry with daily laboratory assay samples.',
        relatedQuestionsFa: ['کدام تگ‌های سنسوری بیشترین نویز یا قطعی را در زمان شوک‌های فرآیندی نشان می‌دهند؟'],
        relatedQuestionsEn: ['Which process tags exhibit highest sensor noise during transient plant swings?']
      }
    },
    3: {
      phaseId: 3,
      trackId: 'ENERGY_PETRO',
      titleFa: 'آماده‌سازی داده‌ها: موازنه‌های جرمی و انرژی، پالایش نویز سنسورها',
      titleEn: 'Data Preparation: Mass-Energy Reconciliation & Industrial Sensor Denoising',
      exampleNoteFa:
        'مثال: اجرای الگوریتم اعتبارسنجی موازنه جرم و انرژی (Data Reconciliation) مطابق استاندارد API 560 و محاسبه ضریب انتقال حرارت تمیز (Clean U-Value).',
      exampleNoteEn:
        'Example: Implementing mass-energy data reconciliation per API 560 and calculating normalized clean heat-transfer coefficients.',
      artifacts: {
        backgroundFa: 'نوسانات دبی خوراک باید نرمال‌سازی شود تا افت واقعی راندمان حرارتی از تغییرات حجم ورودی تفکیک گردد.',
        backgroundEn: 'Feed rate oscillations must be decoupled from genuine thermal degradation through Reynolds-based normalization.',
        primaryObjectiveFa: 'تولید شاخص پیوسته مقاومت رسوب (Fouling Resistance Rf) بر حسب زمان.',
        primaryObjectiveEn: 'Generate continuous thermal fouling resistance indices (Rf) across the train timeline.',
        relatedQuestionsFa: ['چگونه داده‌های زمان شات‌دان و بای‌پاس مبدل‌ها از دیتاست آموزش مدل خارج شوند؟'],
        relatedQuestionsEn: ['How are bypass operations and maintenance transient intervals filtered from training windows?']
      }
    },
    4: {
      phaseId: 4,
      trackId: 'ENERGY_PETRO',
      titleFa: 'مدلسازی: پیش‌بینی رسوب‌گرفتگی مبدل‌ها و بهینه‌سازی نقطه کارکرد کوره',
      titleEn: 'Modeling: Heat Exchanger Fouling Trajectory & Furnace Firing Optimization',
      exampleNoteFa:
        'مثال: ترکیب مدل سینتیک رسوب‌گذاری فیزیکی (Ebert-Panchal) با مدل بوستینگ گرادیان (XGBoost) برای پیش‌بینی دقیق افت فشار و انتقال حرارت.',
      exampleNoteEn:
        'Example: Hybridizing first-principles Ebert-Panchal fouling kinetics with XGBoost for dual hydraulic pressure-drop and thermal predictions.',
      artifacts: {
        backgroundFa: 'مدل باید توانایی پیش‌بینی زمان رسیدن به حد بحرانی افت فشار (۳.۵ بار) را با فاصله زمانی حداقل ۳۰ روز داشته باشد.',
        backgroundEn: 'Model must predict the breach of 3.5 bar differential pressure thresholds at least 30 days in advance.',
        primaryObjectiveFa: 'دستیابی به ضریب همبستگی R² بالای ۰.۹۲ در پیش‌بینی دمای خروجی جریان نفت خام از مبدل‌ها.',
        primaryObjectiveEn: 'Achieve R² > 0.92 on crude exit temperature trajectories across unseen test seasons.',
        relatedQuestionsFa: ['آیا مدل توانایی توصیه توالی بهینه تمیزکاری مبدل‌ها را دارد؟'],
        relatedQuestionsEn: ['Can the model formulate optimal exchanger descaling sequences across parallel trains?']
      }
    },
    5: {
      phaseId: 5,
      trackId: 'ENERGY_PETRO',
      titleFa: 'ارزیابی: استانداردهای ایمنی فرآیند (HAZOP/SIL) و تاییدیه متالورژی',
      titleEn: 'Evaluation: Process Safety Gate (HAZOP/SIL) & Metallurgical Integrity Audit',
      exampleNoteFa:
        'مثال: ارزیابی سازگاری خروجی‌های مدل با حدود ایمنی فشار و دمای تجهیزات مطابق کتابچه راهنمای عملیات پالایشگاه (SOP) و جلسات HAZOP.',
      exampleNoteEn:
        'Example: Verifying model outputs comply with Maximum Allowable Working Pressure (MAWP) limits under plant HAZOP guidelines.',
      artifacts: {
        backgroundFa: 'هرگونه پیشنهاد افزایش دمای لوله‌ها نباید از حد خزش متالورژیکی (Creep limit) فراتر رود.',
        backgroundEn: 'Optimization bounds must strictly respect metallurgical creep limits and tube skin thermocouple thresholds.',
        primaryObjectiveFa: 'اخذ تاییدیه سرپرست ارشد ایمنی فرآیند (Process Safety Superintendent) و رئیس بهره‌برداری.',
        primaryObjectiveEn: 'Secure operational approval from Process Safety Superintendent and Chief Plant Operations.',
        relatedQuestionsFa: ['در صورت رفتار غیرمنتظره مدل، مکانیزم قطع خودکار (Interlock) چگونه عمل می‌کند؟'],
        relatedQuestionsEn: ['What hard-wired interlock protocol takes control upon AI inference deviations?']
      }
    },
    6: {
      phaseId: 6,
      trackId: 'ENERGY_PETRO',
      titleFa: 'استقرار و پایش: اتصال به اتاق کنترل مرکزی پالایشگاه (CCR) و APC',
      titleEn: 'Deployment: Central Control Room (CCR) Integration & APC Supervisory Loop',
      exampleNoteFa:
        'مثال: ارسال فرامین نظارتی به سیستم کنترل پیشرفته (APC) و داشبورد اپراتوری سالن کنترل، به همراه هشدار صوتی و تصویری در وضعیت ناهنجار.',
      exampleNoteEn:
        'Example: Dispatching setpoint targets to the APC supervisory controller with dedicated alarm matrices inside the central control room.',
      artifacts: {
        backgroundFa: 'سیستم باید بر بستر شبکه صنعتی ایزوله (OT Network) منطبق بر استانداردهای امنیت سایبری ISA/IEC 62443 نصب شود.',
        backgroundEn: 'System deploys strictly on isolated Level 3 OT networks conforming to ISA/IEC 62443 industrial cybersecurity.',
        primaryObjectiveFa: 'کاهش مستمر مصرف سوخت کوره و بازگشت سرمایه سالانه تضمین‌شده بدون هیچ‌گونه وقفه فرآیندی.',
        primaryObjectiveEn: 'Continuous reduction of furnace fuel consumption delivering proven annual ROI without process upsets.',
        relatedQuestionsFa: ['فرآیند پایش دریفت مدل و بازآموزی خودکار (Retraining) در دوره تعمیرات اساسی (Overhaul) چیست؟'],
        relatedQuestionsEn: ['What is the scheduled MLOps retraining cadence aligned with refinery turnaround cycles?']
      }
    }
  },
  GENERAL_EVERYDAY: {
    1: {
      phaseId: 1,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'درک کسب‌وکار: مدیریت هوشمند اقتصاد خانوار، کاهش دورریز خرید و پس‌انداز سفر',
      titleEn: 'Business Understanding: Smart Household Budget, Grocery Waste Reduction & Vacation Fund',
      exampleNoteFa:
        'مثال: هدف اصلی، کاهش ۲۵ درصدی دورریز مواد غذایی فاسدشدنی در سبد خرید هفتگی و ماهانه خانوار، پیشگیری از خریدهای هیجانی و هدایت پس‌اندازهای حاصله به سمت صندوق سفر تفریحی سالیانه خانواده است.',
      exampleNoteEn:
        'Example: Primary objective is cutting 25% perishable grocery waste, eliminating impulse buying leaks, and redirecting accumulated savings into a fully-funded annual family vacation.',
      artifacts: {
        backgroundFa:
          'خانواده‌ها ماهانه بخش چشمگیری از خریدهای سوپرمارکتی (میوه، سبزیجات و لبنیات) را به دلیل خرید بیش از حد نیاز یا فراموشی تاریخ انقضا دور می‌ریزند که بار مالی سنگین و عذاب وجدان به همراه دارد.',
        backgroundEn:
          'Urban households waste substantial grocery volume through impulse purchasing and fridge blindness, causing preventable financial strain and sustainability concerns.',
        primaryObjectiveFa:
          'طراحی ساختار شناختی برای پیش‌بینی دقیق مایحتاج مصرفی، بهینه‌سازی بودجه جاری و ذخیره ماهانه ۲۵٪ از هزینه‌های اتلافی در صندوق سفر.',
        primaryObjectiveEn:
          'Architect cognitive mechanisms to forecast household consumption, optimize shopping schedules, and capture 25% wasted spend for family recreation.',
        relatedQuestionsFa: [
          'کدام دسته‌های خرید سوپرمارکت بالاترین سهم را در دورریز ماهانه خانوار دارند؟',
          'چگونه هوش مصنوعی می‌تواند بدون نیاز به ثبت دستی خسته‌کننده، هزینه واقعی هر وعده غذای خانگی را تحلیل کند؟'
        ],
        relatedQuestionsEn: [
          'Which grocery categories suffer the highest expiration spoilage or redundant re-purchasing?',
          'How can AI compute accurate per-meal family costs without tedious manual bookkeeping?'
        ],
        sampleDatasetTitleFa: 'پیامک‌های بانکی تراکنش، عکس فاکتورهای فروشگاهی و گزارش موجودی یخچال',
        sampleDatasetTitleEn: 'Bank SMS alerts, supermarket receipts OCR logs, and weekly fridge pantry inventory',
        sampleContractClauseFa: 'منشور توافق بودجه‌بندی هوشمند خانوار و تعهد کاهش اسراف غذایی',
        sampleContractClauseEn: 'Smart Household Financial Compact & Zero-Waste Family Protocol'
      }
    },
    2: {
      phaseId: 2,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'درک داده‌ها: پیامک‌های بانکی، فاکتورهای خرید، بلیت‌های سفر و نرخ‌های بازار',
      titleEn: 'Data Understanding: Bank Telemetry, Supermarket Receipts & Travel Fare Streams',
      exampleNoteFa:
        'مثال: تجمیع داده‌های تراکنش‌های کارت‌های خانواده، استخراج اقلام از روی رسیدهای فروشگاه با OCR، و پایش روندهای فصلی قیمت بلیت هواپیما و هتل‌ها.',
      exampleNoteEn:
        'Example: Ingesting bank transaction telemetry, extracting itemized lines from retail receipts via OCR, and monitoring seasonal hotel/flight price volatility.',
      artifacts: {
        backgroundFa: 'داده‌های مالی خانواده در قالب پیامک‌های متفرقه بانکی، رسیدهای کاغذی و فاکتورهای اپلیکیشن‌های سفارش آنلاین پراکنده هستند.',
        backgroundEn: 'Household expenditure data is scattered across multi-bank SMS, physical thermal receipts, and online delivery app order histories.',
        primaryObjectiveFa: 'یکپارچه‌سازی، طبقه‌بندی خودکار اقلام و اعتبارسنجی کیفیت داده‌های خرید برای تغذیه به مدل هوش مصنوعی.',
        primaryObjectiveEn: 'Aggregate, categorize retail lines, and validate data cleanliness to feed the household intelligence model.',
        relatedQuestionsFa: ['میزان خطای خوانش متن فاکتورهای فارسی با عکس گوشی موبایل چقدر است؟'],
        relatedQuestionsEn: ['What is the OCR error rate on unstructured Persian thermal grocery receipts?']
      }
    },
    3: {
      phaseId: 3,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'آماده‌سازی داده‌ها: یکسان‌سازی اسامی اقلام، پاکسازی و تفکیک خریدهای ضروری از تفریحی',
      titleEn: 'Data Preparation: Persian Grocery Normalization & Discretionary Expense Flagging',
      exampleNoteFa:
        'مثال: نرمال‌سازی اسامی متنوع کالاها (مانند یکی‌کردن شیر کم‌چرب برندهای مختلف)، حذف نویز، تبدیل واحدهای کیلوگرم و بسته، و تفکیک هزینه‌های واجب از خریدهای تنقلاتی.',
      exampleNoteEn:
        'Example: Normalizing diverse brand item descriptions, unit conversions, and separating essential pantry staples from impulse discretionary treats.',
      artifacts: {
        backgroundFa: 'رسیدهای فروشگاهی دارای نام‌های مخفف و متناقض هستند و نیازمند نگاشت معنایی به فهرست استاندارد مواد غذایی و مصرفی می‌باشند.',
        backgroundEn: 'Thermal receipts use noisy abbreviations requiring semantic mapping into standard household nutrition and consumer catalogs.',
        primaryObjectiveFa: 'تولید مجموعه داده تمیز و مهندسی ویژگی‌های مصرفی خانوار (مانند نرخ هفتگی اتمام تخم‌مرغ یا لبنیات).',
        primaryObjectiveEn: 'Generate clean tabular datasets and engineered consumption features (e.g., weekly depletion velocity of essentials).',
        relatedQuestionsFa: ['چگونه خریدهای دوره‌ای (مانند شوینده‌ها) از مصرف روزانه تفکیک شوند؟'],
        relatedQuestionsEn: ['How do we isolate periodic bulk purchases from daily perishable consumption?']
      }
    },
    4: {
      phaseId: 4,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'توسعه مدل: پیش‌بینی اتمام اقلام یخچال، خوشه‌بندی ترجیحات و الگوریتم ارزان‌ترین سفر',
      titleEn: 'Model Development: Food Depletion Forecasting, Preference Clustering & Vacation Deal Finder',
      exampleNoteFa:
        'مثال: پیاده‌سازی مدل پیش‌بینی زمان تمام‌شدن اقلام بر اساس بعد خانوار، الگوریتم پیشنهاد دستور غذا با باقیمانده یخچال، و یادگیری ماشین برای شکار ارزان‌ترین زمان خرید بلیت سفر.',
      exampleNoteEn:
        'Example: Implementing depletion estimation models, leftover meal recipe recommenders, and predictive travel fare bargain locators.',
      artifacts: {
        backgroundFa: 'ترکیب الگوی پیش‌بینی (Predictive)، الگوی سیستم پیشنهاددهنده (Recommendation) و الگوی شناخت ناهنجاری قیمت برای خدمت به خانواده.',
        backgroundEn: 'Combining predictive analytics, personalized recipe recommendations, and pricing anomaly detection for household stewardship.',
        primaryObjectiveFa: 'ارائه پیش‌بینی دقیق از لیست خرید ضروری قبل از فاسد شدن مواد قبلی، و پیشنهاد بهترین بازه زمانی مسافرت اقتصادی.',
        primaryObjectiveEn: 'Deliver proactive grocery replenishment lists before spoilage occurs and pinpoint lowest-cost holiday vacation windows.',
        relatedQuestionsFa: ['دقت مدل در پیشنهاد فهرست خرید مطابق سلیقه غذایی فرزندان چقدر است؟'],
        relatedQuestionsEn: ['What is the model recommendation precision aligned with child nutritional preferences?']
      }
    },
    5: {
      phaseId: 5,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'ارزیابی مدل: سنجه دقت پیش‌بینی هزینه‌ها، رضایت اعضای خانواده و شاخص سلامت رژیم',
      titleEn: 'Model Evaluation: Budget Forecast Accuracy, Family Satisfaction & Nutritional Balance',
      exampleNoteFa:
        'مثال: ارزیابی خطای تخمین صورت‌حساب ماهانه (MAE کمتر از ۵٪)، سنجش میزان وفاداری خانواده به پیشنهادات سبد خرید و اطمینان از حذف تخفیف‌های قلابی.',
      exampleNoteEn:
        'Example: Validating monthly expense error margins (MAE < 5%), measuring household compliance to recommended menus, and filtering deceptive retailer discounts.',
      artifacts: {
        backgroundFa: 'مدل باید قبل از ورود به زندگی واقعی اعضای خانواده، از نظر عدم ارائه پیشنهادهای نامناسب یا ایجاد استرس مالی بررسی شود.',
        backgroundEn: 'The model must be audited to prevent stressful austerity recommendations or unhealthy dietary meal compositions.',
        primaryObjectiveFa: 'اطمینان از ارتقای رفاه خانواده، اثبات عینی پس‌انداز ریالی برای سفر و حفظ رضایت خاطر تمام اعضا.',
        primaryObjectiveEn: 'Ensure measurable quality-of-life improvements, verifiable vacation fund accumulation, and stress-free adoption.',
        relatedQuestionsFa: ['آیا هشدارهای اضافه مصرف بودجه لحنی مشوقانه و آرامش‌بخش دارند؟'],
        relatedQuestionsEn: ['Are budget overrun alerts empathetic, supportive, and actionable for family members?']
      }
    },
    6: {
      phaseId: 6,
      trackId: 'GENERAL_EVERYDAY',
      titleFa: 'عملیاتی‌سازی: دستیار خانوادگی در پیام‌رسان‌ها (بله/تلگرام)، اعلان‌های خرید و داشبورد سفر',
      titleEn: 'Model Operationalization: Messaging Bot Concierge, Proactive Expiry Push Alerts & Vacation Tracker',
      exampleNoteFa:
        'مثال: استقرار ربات در پیام‌رسان‌های در دسترس خانواده، ارسال هشدار هوشمند «شیر فردا ترش می‌شود، پنکیک درست کنید!» و نمایش ویجت پس‌انداز سفر روی صفحه گوشی.',
      exampleNoteEn:
        'Example: Deploying via everyday family messaging bots, sending proactive tips ("Milk expires tomorrow, make pancakes!"), and live vacation savings widgets.',
      artifacts: {
        backgroundFa: 'سیستم باید بدون نیاز به نصب اپلیکیشن‌های پیچیده، در پیام‌رسان‌های روزمره پدران و مادران با زبان طبیعی فارسی تعامل کند.',
        backgroundEn: 'The solution must integrate into familiar messaging apps using friendly natural Persian conversations without learning curves.',
        primaryObjectiveFa: 'استفاده مداوم روزمره تمام اعضای خانواده، ثبت آسان فاکتور با ارسال عکس، و دستیابی به هدف سفر خانوادگی.',
        primaryObjectiveEn: 'Sustained daily engagement, effortless photo-receipt uploads, and successful realization of the dream family vacation.',
        relatedQuestionsFa: ['چگونه سیستم با قطعی اینترنت یا دسترسی آفلاین به موجودی خانه هماهنگ می‌شود؟'],
        relatedQuestionsEn: ['How does the family assistant cache pantry inventory during temporary network disconnections?']
      }
    }
  }
};

export function getDomainPhaseExample(
  phaseId: number,
  trackId: IndustryTrackId = 'CIVIL_INFRA'
): DomainPhaseExample {
  const trackExamples = DOMAIN_PHASE_EXAMPLES[trackId] || DOMAIN_PHASE_EXAMPLES.CIVIL_INFRA;
  return (
    trackExamples[phaseId] ||
    trackExamples[1] ||
    DOMAIN_PHASE_EXAMPLES.CIVIL_INFRA[1]
  );
}

export function getDomainExampleNote(
  phaseId: number,
  trackId: IndustryTrackId = 'CIVIL_INFRA',
  lang: 'fa' | 'en' = 'fa'
): string {
  const example = getDomainPhaseExample(phaseId, trackId);
  return lang === 'fa' ? example.exampleNoteFa : example.exampleNoteEn;
}
