import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  Gauge,
  Sliders,
  Database,
  Users,
  HardDrive,
  ShieldCheck,
  Clock,
  Info,
  Layers,
  Brain,
  Activity,
  BarChart3,
  GitBranch,
  Calendar,
  Lock,
  Calculator,
  Percent,
  CheckSquare,
  Zap,
  Target,
  AlertCircle,
  Compass
} from 'lucide-react';

interface Page18Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage17: () => void;
  onGoToPage19?: () => void;
}

interface MetricArtifact {
  id: string;
  nameEn: string;
  nameFa: string;
  formula: string;
  targetValue: number; // percentage 0-100
  definitionEn: string;
  definitionFa: string;
  spamExampleEn: string;
  spamExampleFa: string;
  costImpactEn: string;
  costImpactFa: string;
  color: string;
}

interface CaseStudyPreset {
  id: string;
  titleEn: string;
  titleFa: string;
  domainEn: string;
  domainFa: string;
  badgeColor: string;
  tp: number;
  fn: number;
  fp: number;
  tn: number;
  minAccuracy: number;
  minPrecision: number;
  minRecall: number;
  minF1: number;
  maxFpr: number;
  rationaleEn: string;
  rationaleFa: string;
}

export const Page18ModelPerformanceMetrics: React.FC<Page18Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage17,
  onGoToPage19
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'artifacts' | 'canvas' | 'guide'>('matrix');
  const [selectedPreset, setSelectedPreset] = useState<string>('xyz_support');
  const [copied, setCopied] = useState(false);
  const [showHelperPrompt, setShowHelperPrompt] = useState(true);

  // Interactive Confusion Matrix Values (default: XYZ Support Chatbot sample)
  const [tp, setTp] = useState<number>(170); // True Positive: correctly identified intent
  const [fn, setFn] = useState<number>(30);  // False Negative (Type II): intent missed, escalated
  const [fp, setFp] = useState<number>(18);  // False Positive (Type I): wrongly classified intent
  const [tn, setTn] = useState<number>(282); // True Negative: correctly flagged as other/irrelevant

  // Target values for the 5 artifacts
  const [targetAccuracy, setTargetAccuracy] = useState<number>(85);
  const [targetPrecision, setTargetPrecision] = useState<number>(88);
  const [targetRecall, setTargetRecall] = useState<number>(82);
  const [targetF1, setTargetF1] = useState<number>(85);
  const [targetMaxFpr, setTargetMaxFpr] = useState<number>(10);

  // Computed metrics from Confusion Matrix
  const totalSamples = tp + fn + fp + tn;
  const calcAccuracy = totalSamples > 0 ? ((tp + tn) / totalSamples) * 100 : 0;
  const calcPrecision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 0;
  const calcRecall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0; // Sensitivity
  const calcSpecificity = tn + fp > 0 ? (tn / (tn + fp)) * 100 : 0;
  const calcF1 = calcPrecision + calcRecall > 0 ? (2 * (calcPrecision * calcRecall)) / (calcPrecision + calcRecall) : 0;
  const calcFpr = fp + tn > 0 ? (fp / (fp + tn)) * 100 : 0;
  const calcNpv = tn + fn > 0 ? (tn / (tn + fn)) * 100 : 0;

  // Case Study Presets
  const caseStudyPresets: CaseStudyPreset[] = [
    {
      id: 'xyz_support',
      titleEn: 'XYZ Company Support Chatbot (Official CPMAI Case)',
      titleFa: 'چت‌بات پشتیبانی مشتریان شرکت XYZ (مطالعه موردی رسمی CPMAI)',
      domainEn: 'Customer Service & Conversational AI',
      domainFa: 'خدمات مشتریان و هوش مصنوعی محاوره‌ای',
      badgeColor: 'bg-[#00738c] text-white',
      tp: 170,
      fn: 30,
      fp: 18,
      tn: 282,
      minAccuracy: 85,
      minPrecision: 88,
      minRecall: 82,
      minF1: 85,
      maxFpr: 8,
      rationaleEn:
        'Prioritizes high Precision (88%) to avoid hallucinating policies or confusing users. Moderate Recall (82%) is acceptable because unconfident intents smoothly route to human Tier-2 agents without hurting satisfaction.',
      rationaleFa:
        'اولویت بالا برای دقت Precision (۸۸٪) جهت پرهیز از توهم یا پاسخ نادرست به مشتری. نرخ Recall در حد ۸۲٪ کاملاً قابل قبول است زیرا درخواست‌های نامطمئن به اپراتور انسانی ارجاع (Fallback) داده می‌شوند.'
    },
    {
      id: 'spam_filter',
      titleEn: 'Enterprise Email Spam Filter (Slide 28 Canonical Example)',
      titleFa: 'فیلتر اسپم ایمیل سازمانی (مثال رسمی متن اسلاید ۲۸)',
      domainEn: 'Text Classification / Cybersecurity',
      domainFa: 'دسته‌بندی متنی و امنیت اطلاعات',
      badgeColor: 'bg-[#1b3a4b] text-white',
      tp: 450,
      fn: 50,
      fp: 5,
      tn: 1495,
      minAccuracy: 95,
      minPrecision: 98,
      minRecall: 90,
      minF1: 94,
      maxFpr: 1,
      rationaleEn:
        'Extremely low tolerance for False Positives (Type I Error). An important customer email sent to Spam causes disastrous business disruption. High Precision (98%) is paramount.',
      rationaleFa:
        'تحمل بسیار پایین برای خطای نوع اول (False Positive). اگر ایمیل مهم قرارداد یک مشتری اشتباهاً اسپم شود فاجعه‌بار است؛ بنابراین Precision باید حداقل ۹۸٪ و نرخ FPR زیر ۱٪ باشد.'
    },
    {
      id: 'fraud_detection',
      titleEn: 'Banking & Credit Card Fraud Screening',
      titleFa: 'سیستم غربالگری تقلب بانکی و کارت اعتباری',
      domainEn: 'FinTech / Anomaly Detection',
      domainFa: 'فین‌تک و تشخیص ناهنجاری',
      badgeColor: 'bg-[#b3432f] text-white',
      tp: 96,
      fn: 4,
      fp: 80,
      tn: 1820,
      minAccuracy: 94,
      minPrecision: 55,
      minRecall: 96,
      minF1: 70,
      maxFpr: 5,
      rationaleEn:
        'High Recall (96%) is mission-critical: missing a million-dollar fraud (False Negative) is unacceptable. False Positives (asking the user to re-verify an OTP) are cheap inconveniences.',
      rationaleFa:
        'اولویت مطلق بر Recall حداکثری (۹۶٪). از دست رفتن یک تراکنش کلاهبرداری (False Negative) خسارت جبران‌ناپذیر دارد، در حالی که ارسال پیامک تأیید مجدد به مشتری (FP) هزینه اندکی دارد.'
    }
  ];

  const handleApplyPreset = (preset: CaseStudyPreset) => {
    setSelectedPreset(preset.id);
    setTp(preset.tp);
    setFn(preset.fn);
    setFp(preset.fp);
    setTn(preset.tn);
    setTargetAccuracy(preset.minAccuracy);
    setTargetPrecision(preset.minPrecision);
    setTargetRecall(preset.minRecall);
    setTargetF1(preset.minF1);
    setTargetMaxFpr(preset.maxFpr);
  };

  // Generate complete workbook canvas markdown
  const generateCanvasMarkdown = () => {
    const curPreset = caseStudyPresets.find(p => p.id === selectedPreset) || caseStudyPresets[0];

    if (lang === 'fa') {
      return `### فاز اول متدولوژی CPMAI: درک کسب‌وکار (Phase I: Business Understanding)
### گروه وظیفه: عملکرد و عملیات سیستم هوش مصنوعی (Task Group: AI System Performance and Operation)
### وظیفه: مقادیر قابل قبول عملکرد مدل (Task: Acceptable Model Performance Values - اسلاید ۲۸)

---

#### ۱. شبیه‌سازی ماتریس درهم‌ریختگی (Figure 3. Confusion Matrix Baseline)
- **مطالعه موردی انتخاب‌شده:** ${curPreset.titleFa}
- **حوزه کاربرد:** ${curPreset.domainFa}
- **تعداد کل نمونه‌های آزمون:** ${totalSamples} مورد
  * **مثبت واقعی (True Positive - TP):** ${tp} (تشخیص صحیح رویداد هدف)
  * **منفی کاذب (False Negative - FN / خطای نوع دوم Type II):** ${fn} (رویداد هدف از دست رفته یا نادیده گرفته شده)
  * **مثبت کاذب (False Positive - FP / خطای نوع اول Type I):** ${fp} (هشدار اشتباه برای رویداد غیرهدف)
  * **منفی واقعی (True Negative - TN):** ${tn} (رد صحیح موارد غیرهدف)

---

#### ۲. مقادیر سنجه‌های محاسبه‌شده در آزمون پایه (Computed Baseline Metrics):
- **دقت کلی (Accuracy):** ${calcAccuracy.toFixed(2)}% (فرمول: (TP + TN) / Total)
- **دقت مثبت / صحت (Precision / PPV):** ${calcPrecision.toFixed(2)}% (فرمول: TP / (TP + FP))
- **بازیابی / حساسیت (Recall / Sensitivity):** ${calcRecall.toFixed(2)}% (فرمول: TP / (TP + FN))
- **ویژگی / تشخیص منفی (Specificity):** ${calcSpecificity.toFixed(2)}% (فرمول: TN / (TN + FP))
- **امتیاز همساز F1 Score:** ${calcF1.toFixed(2)}% (فرمول: 2 * (Prec * Rec) / (Prec + Rec))
- **نرخ مثبت کاذب (False Positive Rate - FPR):** ${calcFpr.toFixed(2)}% (فرمول: FP / (FP + TN))

---

#### ۳. مصنوعات کلیدی وظیفه (The 5 CPMAI Task Artifacts & Thresholds):

1. **حداقل دقت قابل قبول (Minimum Acceptable Accuracy):**
   - **مقدار آستانه تاییدشده:** ${targetAccuracy}%
   - **منطق و توجیه کسب‌وکار:** برای چرخه نخست (MVP) چت‌بات، دقت بالای ۸۰ تا ۸۵ درصد جهت اثبات ارزش سرمایه‌گذاری کافی است. انتظار دقت ۱۰۰٪ به دلیل ماهیت احتمالی هوش مصنوعی توهم است و هزینه مهندسی را تصاعدی می‌کند.

2. **حداقل دقت پیش‌بینی مثبت (Minimum Acceptable Precision / PPV):**
   - **مقدار آستانه تاییدشده:** ${targetPrecision}%
   - **منطق و توجیه کسب‌وکار:** پاسخ اشتباه یا ارائه اطلاعات غلط سیاستی به مشتریان هزینه بسیار سنگین‌تری نسبت به عذرخواهی و ارجاع به اپراتور انسانی دارد. لذا ضریب Precision باید بالا نگه داشته شود.

3. **حداقل میزان بازیابی یا حساسیت (Minimum Acceptable Recall / Sensitivity):**
   - **مقدار آستانه تاییدشده:** ${targetRecall}%
   - **منطق و توجیه کسب‌وکار:** در صورتی که چت‌بات قصد کاربر را با قطعیت زیر ۸۰٪ تشخیص دهد، نباید حدس بزند؛ سیستم به جای اصرار بر پاسخ نادقیق، مکالمه را به کارشناس پشتیبانی ارجاع می‌دهد (Fallback Protocol).

4. **حداقل امتیاز ترکیبی F1 (Minimum Acceptable F1 Score):**
   - **مقدار آستانه تاییدشده:** ${targetF1}%
   - **منطق و توجیه کسب‌وکار:** میانگین هارمونیک متوازن بین صحت و پوشش، تضمین می‌کند که مدل بدون فدا کردن یکی به نفع دیگری، کیفیت پاسخ‌دهی پایداری دارد.

5. **حداکثر نرخ مثبت کاذب مجاز (Maximum Acceptable False Positive Rate - FPR):**
   - **مقدار آستانه تاییدشده:** ${targetMaxFpr}%
   - **منطق و توجیه کسب‌وکار:** حداکثر خطای پذیرفته‌شده در اختصاص برچسب نامربوط نباید از ۸ تا ۱۰ درصد فراتر رود تا از بروز نارضایتی یا اسپم تلقی شدن پیام‌های چت‌بات جلوگیری شود.

---

#### ۴. ملاحظات هزینه و پیچیدگی نتایج نادقیق (Cost, Complexity & Trade-offs):
- **پیامد خطای نوع اول (False Positive Cost):** ارائه پاسخ نادرست در مورد موجودی کالا یا قیمت، مستقیماً به شکایت رسمی و لغو سفارش می‌انجامد.
- **پیامد خطای نوع دوم (False Negative Cost):** متوجه نشدن سوال مشتری و ارجاع زودهنگام به اپراتور، صرفاً اندکی زمان اپراتور را می‌گیرد که در برابر ارائه پاسخ غلط ارجحیت دارد.
- **برنامه ارتقای تکرار شونده (Iterative Ratchet Plan):** آستانه ۸۵٪ در اسپرینت اول پایه قرار گرفته و پس از جمع‌آوری لاگ‌های ۳۰ روز ابتدایی، به ۹۰٪ ارتقا خواهد یافت.`;
    }

    return `### CPMAI Phase I: Business Understanding
### Task Group: AI System Performance and Operation
### Task: Acceptable Model Performance Values (Slide 28 / Figure 3)

---

#### 1. Baseline Confusion Matrix Simulation (Figure 3)
- **Selected Reference Case:** ${curPreset.titleEn}
- **Operating Domain:** ${curPreset.domainEn}
- **Total Test Sample Population:** ${totalSamples} instances
  * **True Positive (TP):** ${tp} (Correct target classification)
  * **False Negative (FN / Type II Error):** ${fn} (Missed target case)
  * **False Positive (FP / Type I Error):** ${fp} (False alarm / spurious detection)
  * **True Negative (TN):** ${tn} (Correctly rejected non-target)

---

#### 2. Computed Baseline Performance Metrics:
- **Accuracy:** ${calcAccuracy.toFixed(2)}% (Formula: (TP + TN) / Total)
- **Precision (Positive Predictive Value):** ${calcPrecision.toFixed(2)}% (Formula: TP / (TP + FP))
- **Recall (Sensitivity):** ${calcRecall.toFixed(2)}% (Formula: TP / (TP + FN))
- **Specificity:** ${calcSpecificity.toFixed(2)}% (Formula: TN / (TN + FP))
- **F1 Score:** ${calcF1.toFixed(2)}% (Formula: 2 * (Prec * Rec) / (Prec + Rec))
- **False Positive Rate (FPR):** ${calcFpr.toFixed(2)}% (Formula: FP / (FP + TN))

---

#### 3. The 5 CPMAI Task Artifacts & Threshold Definitions:

1. **Minimum Acceptable Accuracy:**
   - **Approved Threshold:** ${targetAccuracy}%
   - **Business Justification:** A baseline range of 80-85% proves initial business feasibility for the MVP iteration without incurring exponential compute expenses.

2. **Minimum Acceptable Precision (Positive Predictive Value):**
   - **Approved Threshold:** ${targetPrecision}%
   - **Business Justification:** Providing misleading policies or incorrect billing facts carries a heavy brand penalty. High precision prevents hallucinations.

3. **Minimum Acceptable Recall (Sensitivity):**
   - **Approved Threshold:** ${targetRecall}%
   - **Business Justification:** Borderline inquiries below 82% confidence are routed to human Tier-2 agents via the built-in fallback protocol.

4. **Minimum Acceptable F1 Score:**
   - **Approved Threshold:** ${targetF1}%
   - **Business Justification:** The harmonic mean guarantees balanced performance without sacrificing precision for raw coverage.

5. **Maximum Acceptable False Positive Rate (FPR):**
   - **Approved Threshold:** ${targetMaxFpr}%
   - **Business Justification:** Spurious misclassifications must be capped below 10% to prevent customer frustration.

---

#### 4. Cost, Complexity & Handling Inaccurate Results:
- **Type I Error Penalty:** High - Incorrect automated responses degrade brand trust.
- **Type II Error Penalty:** Low/Moderate - Smooth escalation to human agents mitigates risk.
- **Iterative Growth Plan:** Ratchet thresholds from 85% in Sprint 1 to 90% in Sprint 3 based on active user logs.`;
  };

  const handleCopy = () => {
    const textToCopy = content || generateCanvasMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleApplyToCanvas = () => {
    onChangeContent(generateCanvasMarkdown());
    setActiveTab('canvas');
  };

  const handleReset = () => {
    const confirmMsg =
      lang === 'fa'
        ? 'آیا مایل به بازنشانی مقادیر به حالت پیش‌فرض شرکت XYZ هستید؟'
        : 'Reset metrics to XYZ Company defaults?';
    if (window.confirm(confirmMsg)) {
      handleApplyPreset(caseStudyPresets[0]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b3a4b] via-[#1f5163] to-[#00738c] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>
                {lang === 'fa'
                  ? 'فاز اول: درک کسب‌وکار • اسلاید ۲۸'
                  : 'CPMAI Phase I: Business Understanding • Slide 28'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {lang === 'fa'
                ? 'ماتریس درهم‌ریختگی و مقادیر قابل قبول عملکرد مدل'
                : 'Figure 3: Confusion Matrix & Model Performance Values'}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              {lang === 'fa'
                ? 'تعیین مقادیر آستانه قابل قبول برای ۵ سنجه اساسی متدولوژی CPMAI (دقت کلی، دقت، بازیابی، F1 و نرخ مثبت کاذب) و موازنه خطاهای نوع اول و دوم در طبقه‌بندی‌کننده‌های باینری.'
                : 'Define minimum acceptable thresholds for the 5 CPMAI performance metrics (Accuracy, Precision, Recall, F1, and Max False Positive Rate) and manage Type I vs Type II error trade-offs.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleApplyToCanvas}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#1f5163] hover:bg-[#e3f2ea] text-xs font-bold transition-all shadow-sm cursor-pointer"
              title={lang === 'fa' ? 'تزریق مستقیم محاسبات به بوم مستندات' : 'Inject calculations into canvas'}
            >
              <Zap className="w-4 h-4 text-[#00738c]" />
              <span>{lang === 'fa' ? 'تزریق به بوم' : 'Inject into Canvas'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00738c]" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {lang === 'fa' ? 'انتخاب مطالعه موردی پیش‌فرض (بارگذاری سریع مقادیر):' : 'Select Case Study Preset:'}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#b3432f] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'fa' ? 'بازنشانی' : 'Reset'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {caseStudyPresets.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#00738c] bg-[#00738c]/10 dark:bg-[#00738c]/20 ring-1 ring-[#00738c]'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                    {lang === 'fa' ? preset.titleFa : preset.titleEn}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00738c] shrink-0" />}
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                  {lang === 'fa' ? preset.domainFa : preset.domainEn}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{lang === 'fa' ? 'شبیه‌ساز ماتریس درهم‌ریختگی (Figure 3)' : 'Figure 3 Confusion Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('artifacts')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'artifacts'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{lang === 'fa' ? '۵ مصنوع سنجه‌های عملکرد (Task Artifacts)' : '5 Performance Artifacts'}</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'canvas'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'fa' ? 'بوم مستندات نهایی (Workbook Canvas)' : 'Workbook Canvas'}</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-white dark:bg-[#1a2228] text-[#00738c] dark:text-[#6ee7b7] shadow-xs font-bold'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>{lang === 'fa' ? 'راهنما و مفاهیم آزمون PMI' : 'PMI Exam & Methodology Guide'}</span>
        </button>
      </div>

      {/* TAB 1: Figure 3 Confusion Matrix Simulator */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Main Visual 2x2 Matrix */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#00738c]" />
                  <span>
                    {lang === 'fa'
                      ? 'ماتریس درهم‌ریختگی برای طبقه‌بندی‌کننده باینری (Figure 3)'
                      : 'Figure 3. Confusion Matrix (for binary classifier)'}
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'fa'
                    ? 'اعداد سلول‌ها را تغییر دهید تا فرمول‌های رسمی PMI و سنجه‌های خروجی به صورت بلادرنگ بازتولید شوند.'
                    : 'Adjust cell frequencies to see PMI CPMAI formulas calculate live in real-time.'}
                </p>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                {lang === 'fa' ? `کل نمونه‌ها: ${totalSamples}` : `Total Samples: ${totalSamples}`}
              </div>
            </div>

            {/* Matrix Visual Grid (Matching Figure 3 from PMI Slide 28) */}
            <div className="overflow-x-auto">
              <div className="min-w-[620px]">
                {/* Top Header: Predicted Class */}
                <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold mb-2">
                  <div className="col-span-3"></div>
                  <div className="col-span-6 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800">
                    {lang === 'fa' ? 'کلاس پیش‌بینی شده (Predicted Class)' : 'Predicted Class'}
                  </div>
                  <div className="col-span-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {lang === 'fa' ? 'سنجه‌های ردیفی' : 'Row Formulas'}
                  </div>
                </div>

                {/* Sub headers: Positive / Negative / Formula */}
                <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold mb-2">
                  <div className="col-span-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                    {lang === 'fa' ? 'کلاس واقعی (Actual Class)' : 'Actual Class'}
                  </div>
                  <div className="col-span-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'مثبت (Positive)' : 'Positive'}
                  </div>
                  <div className="col-span-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'منفی (Negative)' : 'Negative'}
                  </div>
                  <div className="col-span-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'حساسیت و ویژگی' : 'Sensitivity / Specificity'}
                  </div>
                </div>

                {/* Row 1: Actual Positive */}
                <div className="grid grid-cols-12 gap-2 mb-2">
                  {/* Row Header */}
                  <div className="col-span-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col justify-center">
                    <span className="font-bold text-xs text-blue-900 dark:text-blue-200">
                      {lang === 'fa' ? 'مثبت واقعی' : 'Positive'}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {lang === 'fa' ? `مجموع: ${tp + fn}` : `Sum: ${tp + fn}`}
                    </span>
                  </div>

                  {/* Cell 1: True Positive (TP) */}
                  <div className="col-span-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-center flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>True Positive (TP)</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mb-2">
                        {lang === 'fa' ? 'تشخیص صحیح مثبت' : 'Correct Hit'}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setTp(prev => Math.max(0, prev - 5))}
                        className="w-6 h-6 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={tp}
                        onChange={(e) => setTp(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 p-1 text-center font-mono font-bold text-sm bg-white dark:bg-gray-800 border border-emerald-400 dark:border-emerald-700 rounded"
                      />
                      <button
                        onClick={() => setTp(prev => prev + 5)}
                        className="w-6 h-6 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cell 2: False Negative (FN) - Type II Error */}
                  <div className="col-span-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 text-center flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-amber-800 dark:text-amber-300 font-bold text-xs mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>False Negative (FN)</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold inline-block mb-2">
                        Type II Error (خطای نوع دوم)
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setFn(prev => Math.max(0, prev - 5))}
                        className="w-6 h-6 rounded bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={fn}
                        onChange={(e) => setFn(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 p-1 text-center font-mono font-bold text-sm bg-white dark:bg-gray-800 border border-amber-400 dark:border-amber-700 rounded"
                      />
                      <button
                        onClick={() => setFn(prev => prev + 5)}
                        className="w-6 h-6 rounded bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Formula Cell: Recall / Sensitivity */}
                  <div className="col-span-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center flex flex-col justify-center">
                    <span className="text-xs font-bold text-purple-900 dark:text-purple-200 mb-1">
                      Sensitivity / Recall
                    </span>
                    <span className="text-[11px] font-mono text-purple-700 dark:text-purple-300">
                      TP / (TP + FN)
                    </span>
                    <div className="text-base font-extrabold text-purple-900 dark:text-purple-100 mt-1">
                      {calcRecall.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Row 2: Actual Negative */}
                <div className="grid grid-cols-12 gap-2 mb-2">
                  {/* Row Header */}
                  <div className="col-span-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col justify-center">
                    <span className="font-bold text-xs text-blue-900 dark:text-blue-200">
                      {lang === 'fa' ? 'منفی واقعی' : 'Negative'}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {lang === 'fa' ? `مجموع: ${fp + tn}` : `Sum: ${fp + tn}`}
                    </span>
                  </div>

                  {/* Cell 3: False Positive (FP) - Type I Error */}
                  <div className="col-span-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 text-center flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-rose-800 dark:text-rose-300 font-bold text-xs mb-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>False Positive (FP)</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200/70 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200 font-bold inline-block mb-2">
                        Type I Error (خطای نوع اول)
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setFp(prev => Math.max(0, prev - 5))}
                        className="w-6 h-6 rounded bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={fp}
                        onChange={(e) => setFp(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 p-1 text-center font-mono font-bold text-sm bg-white dark:bg-gray-800 border border-rose-400 dark:border-rose-700 rounded"
                      />
                      <button
                        onClick={() => setFp(prev => prev + 5)}
                        className="w-6 h-6 rounded bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cell 4: True Negative (TN) */}
                  <div className="col-span-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-center flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>True Negative (TN)</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mb-2">
                        {lang === 'fa' ? 'رد صحیح موارد غیرهدف' : 'Correct Rejection'}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setTn(prev => Math.max(0, prev - 5))}
                        className="w-6 h-6 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={tn}
                        onChange={(e) => setTn(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 p-1 text-center font-mono font-bold text-sm bg-white dark:bg-gray-800 border border-emerald-400 dark:border-emerald-700 rounded"
                      />
                      <button
                        onClick={() => setTn(prev => prev + 5)}
                        className="w-6 h-6 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Formula Cell: Specificity */}
                  <div className="col-span-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center flex flex-col justify-center">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                      Specificity
                    </span>
                    <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300">
                      TN / (FP + TN)
                    </span>
                    <div className="text-base font-extrabold text-indigo-900 dark:text-indigo-100 mt-1">
                      {calcSpecificity.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Precision / NPV / Overall Accuracy */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 p-2 text-center text-xs font-bold text-gray-500 flex items-center justify-center">
                    {lang === 'fa' ? 'سنجه‌های ستونی' : 'Column Formulas'}
                  </div>

                  {/* Precision */}
                  <div className="col-span-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center">
                    <span className="text-xs font-bold text-sky-900 dark:text-sky-200 block mb-0.5">
                      Precision (PPV)
                    </span>
                    <span className="text-[10px] font-mono text-sky-700 dark:text-sky-300 block mb-1">
                      TP / (TP + FP)
                    </span>
                    <span className="text-base font-extrabold text-sky-900 dark:text-sky-100">
                      {calcPrecision.toFixed(1)}%
                    </span>
                  </div>

                  {/* Negative Predictive Value (NPV) */}
                  <div className="col-span-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                      Neg. Predictive Value
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 block mb-1">
                      TN / (TN + FN)
                    </span>
                    <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                      {calcNpv.toFixed(1)}%
                    </span>
                  </div>

                  {/* Accuracy */}
                  <div className="col-span-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-700 text-center">
                    <span className="text-xs font-bold text-teal-900 dark:text-teal-200 block mb-0.5">
                      Accuracy
                    </span>
                    <span className="text-[10px] font-mono text-teal-700 dark:text-teal-300 block mb-1">
                      (TP + TN) / Total
                    </span>
                    <span className="text-base font-extrabold text-teal-900 dark:text-teal-100">
                      {calcAccuracy.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Cards (F1 Score & FPR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200 dark:border-violet-900 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-violet-900 dark:text-violet-200 font-bold text-sm">
                    <Zap className="w-4 h-4 text-violet-600" />
                    <span>{lang === 'fa' ? 'امتیاز ترکیبی F1 (F1 Score)' : 'F1 Score (Harmonic Mean)'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    2 * (Precision * Recall) / (Precision + Recall)
                  </p>
                </div>
                <div className="text-2xl font-black text-violet-800 dark:text-violet-200">
                  {calcF1.toFixed(1)}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-200 dark:border-rose-900 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{lang === 'fa' ? 'نرخ مثبت کاذب (False Positive Rate)' : 'False Positive Rate (FPR)'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    FP / (FP + TN) = 1 - Specificity
                  </p>
                </div>
                <div className="text-2xl font-black text-rose-700 dark:text-rose-300">
                  {calcFpr.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Type I vs Type II Error Explainer Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{lang === 'fa' ? 'خطای نوع اول (Type I Error) — مثبت کاذب (FP)' : 'Type I Error: False Positive (FP)'}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {lang === 'fa'
                  ? 'سیستم چیزی را اعلام می‌کند که واقعیت ندارد (اعلام هشدار دروغین یا گرگ اومد!). در مثال ایمیل اسلاید ۲۸، یعنی ایمیل عادی و سالم اشتباهاً اسپم تشخیص داده شود. در چت‌بات پشتیبانی، یعنی ربات به اشتباه فکر کند منظور مشتری را فهمیده و پاسخ غلط یا گیج‌کننده به مشتری تحویل دهد.'
                  : 'Predicting a positive result when actual is negative (false alarm). In email filtering, marking a legitimate message as spam. In chatbots, falsely confident in a misidentified intent.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{lang === 'fa' ? 'خطای نوع دوم (Type II Error) — منفی کاذب (FN)' : 'Type II Error: False Negative (FN)'}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {lang === 'fa'
                  ? 'سیستم رویداد واقعی را از دست می‌دهد و متوجه آن نمی‌شود (غفلت از هدف). در مثال اسپم، یعنی ایمیل مزاحم تشخیص داده نشود و به اینباکس راه یابد. در چت‌بات، یعنی ربات سوال مشتری را متوجه نشود و آن را به اپراتور انسانی ارجاع دهد.'
                  : 'Failing to detect a positive case (miss). In spam filtering, letting an unwanted spam email slip into inbox. In chatbots, failing to resolve the query and escalating to a human agent.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The 5 CPMAI Task Artifacts */}
      {activeTab === 'artifacts' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              {lang === 'fa'
                ? 'متن اسلاید ۲۸ کتاب کار PMI مشخصاً ۵ مصنوع کلیدی زیر را به عنوان خروجی‌های وظیفه معرفی می‌کند. اسلایدر هر سنجه را مطابق نیازهای پروژه تنظیم نمایید تا حداقل مقدار قابل قبول تعیین شود.'
                : 'Slide 28 explicitly designates these 5 Task Artifacts. Adjust each slider to declare the minimum acceptable thresholds based on your business cost model.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Artifact 1: Minimum Acceptable Accuracy */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'fa' ? '۱. حداقل دقت کلی قابل قبول (Minimum acceptable accuracy)' : '1. Minimum Acceptable Accuracy'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    Accuracy = (TP + TN) / (TP + TN + FP + FN)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === 'fa' ? 'آستانه تاییدشده:' : 'Target:'}</span>
                  <span className="text-base font-extrabold text-[#00738c] font-mono">
                    {targetAccuracy}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="99"
                value={targetAccuracy}
                onChange={(e) => setTargetAccuracy(parseInt(e.target.value))}
                className="w-full accent-[#00738c] cursor-pointer"
              />

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'تعریف اسلاید ۲۸: ' : 'Slide 28 Definition: '}
                  </strong>
                  {lang === 'fa'
                    ? 'دقت عبارت است از مجموع مثبت‌های واقعی و منفی‌های واقعی تقسیم بر کل نتایج. در واقع محاسبه می‌کنید که مدل در چه کسری از کل حدس‌های خود «درست گفته» است. دستیابی به ۱۰۰٪ غیرممکن است و مقدار آستانه به هزینه، پیچیدگی و زمان لازم برای رسیدگی به خطاهای مدل بستگی دارد.'
                    : 'Accuracy is calculated as (TP + TN) divided by all results. In essence, calculating how much the model got right over all of its guesses. 100% correct is not feasible; acceptable value depends on the cost, complexity, and time of handling inaccurate results.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold">{lang === 'fa' ? 'مثال چت‌بات شرکت XYZ: ' : 'XYZ Chatbot Case: '}</span>
                  {lang === 'fa'
                    ? 'آستانه پایه ۸۵٪ در نظر گرفته شده است زیرا ۱۵٪ پاسخ‌های ناموفق توسط کارشناسان انسانی جبران می‌شوند.'
                    : '85% threshold chosen for MVP; the 15% imperfect queries gracefully fall back to human agents.'}
                </p>
              </div>
            </div>

            {/* Artifact 2: Minimum Acceptable Precision */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'fa'
                        ? '۲. حداقل دقت پیش‌بینی مثبت (Minimum acceptable precision / PPV)'
                        : '2. Minimum Acceptable Precision / Positive Predictive Value'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    Precision = TP / (TP + FP)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === 'fa' ? 'آستانه تاییدشده:' : 'Target:'}</span>
                  <span className="text-base font-extrabold text-sky-600 font-mono">
                    {targetPrecision}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="99"
                value={targetPrecision}
                onChange={(e) => setTargetPrecision(parseInt(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'تعریف اسلاید ۲۸: ' : 'Slide 28 Definition: '}
                  </strong>
                  {lang === 'fa'
                    ? 'دقت (صحت) نشان می‌دهد که از کل زمان‌هایی که مدل یک نتیجه مثبت را پیش‌بینی کرده، چند بار این پیش‌بینی درست بوده است. در مثال فیلتر اسپم، یعنی از کل ایمیل‌هایی که سیستم برچسب اسپم زد، چه تعداد واقعاً اسپم بوده‌اند.'
                    : 'Precision measures how many times the model correctly predicted a positive result over all times it guessed a positive result.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold">{lang === 'fa' ? 'اهمیت تجاری: ' : 'Business Impact: '}</span>
                  {lang === 'fa'
                    ? 'پرهیز از توهم (Hallucination) مدل؛ هر چه Precision بالاتر باشد، کاربر اعتماد بیشتری به ادعاهای مدل خواهد داشت.'
                    : 'High precision prevents hallucinated or false answers, protecting user confidence.'}
                </p>
              </div>
            </div>

            {/* Artifact 3: Minimum Acceptable Recall */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'fa'
                        ? '۳. حداقل بازیابی یا حساسیت (Minimum acceptable recall / sensitivity)'
                        : '3. Minimum Acceptable Recall / Sensitivity'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    Recall = TP / (TP + FN)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === 'fa' ? 'آستانه تاییدشده:' : 'Target:'}</span>
                  <span className="text-base font-extrabold text-purple-600 font-mono">
                    {targetRecall}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="99"
                value={targetRecall}
                onChange={(e) => setTargetRecall(parseInt(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'تعریف اسلاید ۲۸: ' : 'Slide 28 Definition: '}
                  </strong>
                  {lang === 'fa'
                    ? 'میزان بازیابی عبارت است از تعداد دفعاتی که مدل به درستی یک نتیجه مثبت را پیش‌بینی کرده تقسیم بر تمام زمان‌هایی که باید آن را مثبت تشخیص می‌داد. در مثال اسپم، یعنی چه نسبتی از ایمیل‌های واقعاً اسپم توسط مدل شکار شده‌اند.'
                    : 'Recall measures the number of times the model correctly predicted a positive result over all times it should have predicted a positive result.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold">{lang === 'fa' ? 'موازنه با دقت: ' : 'Recall Tradeoff: '}</span>
                  {lang === 'fa'
                    ? 'افزایش سخت‌گیرانه Recall معمولاً منجر به کاهش Precision می‌شود. چت‌بات ترجیح می‌دهد سوالات مبهم را به انسان بسپارد تا اینکه ریسک پاسخ نادرست را بپذیرد.'
                    : 'Pushing recall too high often dilutes precision. The chatbot opts to escalate uncertain queries rather than hallucinate.'}
                </p>
              </div>
            </div>

            {/* Artifact 4: Minimum Acceptable F1 */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'fa'
                        ? '۴. حداقل امتیاز ترکیبی F1 (Minimum acceptable F1)'
                        : '4. Minimum Acceptable F1 Score'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    F1 = (2 × Precision × Recall) / (Precision + Recall)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === 'fa' ? 'آستانه تاییدشده:' : 'Target:'}</span>
                  <span className="text-base font-extrabold text-violet-600 font-mono">
                    {targetF1}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="99"
                value={targetF1}
                onChange={(e) => setTargetF1(parseInt(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'تعریف اسلاید ۲۸: ' : 'Slide 28 Definition: '}
                  </strong>
                  {lang === 'fa'
                    ? 'امتیاز F1 از ترکیب دقت و بازیابی محاسبه می‌شود. آن را به عنوان یک میانگین وزنی (هارمونیک) از دقت و بازیابی تصور کنید. چه حداقل مقداری از F1 را به عنوان شرط موفقیت چرخه پروژه خواهید پذیرفت؟'
                    : 'The F1 is calculated as a combination of precision and recall. Think of it as a weighted average. What minimum value would you accept?'}
                </p>
              </div>
            </div>

            {/* Artifact 5: Maximum Acceptable False Positive Rate */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'fa'
                        ? '۵. حداکثر نرخ مثبت کاذب مجاز (Maximum acceptable false positive rate)'
                        : '5. Maximum Acceptable False Positive Rate (FPR)'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    FPR = FP / (FP + TN)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === 'fa' ? 'حداکثر سقف مجاز:' : 'Max Ceiling:'}</span>
                  <span className="text-base font-extrabold text-rose-600 font-mono">
                    {targetMaxFpr}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="25"
                value={targetMaxFpr}
                onChange={(e) => setTargetMaxFpr(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {lang === 'fa' ? 'تعریف اسلاید ۲۸: ' : 'Slide 28 Definition: '}
                  </strong>
                  {lang === 'fa'
                    ? 'برخی پروژه‌ها جریمه بسیار سنگینی برای پیش‌بینی نادرست مثبت دارند. در شرایطی که اشتباه مثبت هزینه قابل توجهی دارد، باید حداکثر نرخ مجاز را تعیین کنید. هدف این است که این عدد تا حد امکان به ۰٪ نزدیک باشد.'
                    : 'Some projects incur a high penalty for incorrectly predicted positive results. You need to indicate your maximum accepted false positive rate. The goal is to get this number as close to 0% as possible.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold">{lang === 'fa' ? 'سقف شرکت XYZ: ' : 'XYZ Ceiling: '}</span>
                  {lang === 'fa'
                    ? 'سقف ۸ تا ۱۰ درصد تعیین شده است؛ خطای بیش از ۱۰٪ به طور محسوسی باعث ریزش اعتماد مشتریان در تست پایلوت می‌شود.'
                    : 'Targeted under 10% to prevent degrading customer trust during pilot rollouts.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Workbook Canvas */}
      {activeTab === 'canvas' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'بوم مستندات کتاب کار CPMAI (اسلاید ۲۸)' : 'CPMAI Workbook Canvas (Slide 28)'}</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'fa'
                  ? 'این بخش مستندات رسمی پروژه شما را برای ارائه به ذی‌نفعان و ممیزی CPMAI نگهداری می‌کند.'
                  : 'Official documentation artifact capturing your model performance thresholds.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی متن' : 'Copy')}</span>
              </button>

              <button
                onClick={handleApplyToCanvas}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] text-xs font-semibold cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'تولید مجدد متن' : 'Regenerate'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={content || generateCanvasMarkdown()}
            onChange={(e) => onChangeContent(e.target.value)}
            rows={16}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/60 font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00738c] transition-all resize-y"
            placeholder={lang === 'fa' ? 'محتوای بوم در اینجا ثبت و به طور خودکار ذخیره می‌شود...' : 'Workbook documentation content...'}
          />

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
            <span>
              {lang === 'fa'
                ? '✓ تغییرات به طور خودکار در فضای محلی مرورگر شما ذخیره می‌گردد.'
                : '✓ Changes save automatically to local browser storage.'}
            </span>
            <span className="font-mono">
              {(content || generateCanvasMarkdown()).length} {lang === 'fa' ? 'نویسه' : 'chars'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 4: PMI Exam & Methodology Guide */}
      {activeTab === 'guide' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>{lang === 'fa' ? 'بینش‌های حیاتی متدولوژی CPMAI و سوالات آزمون PMI برای اسلاید ۲۸' : 'CPMAI Methodology & PMI Exam Insights for Slide 28'}</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۱. چرا دستیابی به دقت ۱۰۰٪ در هوش مصنوعی غیرممکن است؟' : '1. Why 100% Accuracy is Impossible in AI'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'بر خلاف نرم‌افزارهای سنتی مبتنی بر کدنویسی دترمینیستیک (قوانین اگر/آنگاه)، سیستم‌های یادگیری ماشین ماهیتاً احتمالی (Probabilistic) هستند. داده‌های دنیای واقعی همواره نویز، ابهام زبانی، شرایط لبه (Edge Cases) و توزیع‌های متغیر دارند. هر مدیر پروژه‌ای که ادعای دقت ۱۰۰٪ داشته باشد یا بیش‌برازش (Overfitting) شدید رخ داده یا آزمون‌ها غیرواقعی است.'
                  : 'Traditional software is deterministic; AI is inherently probabilistic. Real-world data contains linguistic ambiguity, noise, and drift. Claiming 100% accuracy is a major red flag for severe overfitting.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۲. موازنه اساسی: چه زمانی Precision مهم‌تر است و چه زمانی Recall؟' : '2. The Trade-off: Precision vs Recall Priorities'}
              </span>
              <p>
                {lang === 'fa'
                  ? '• اولویت با Precision: زمانی که هزینه خطای نوع اول (False Alarm) فاجعه‌بار باشد؛ مانند فیلتر اسپم (که نباید ایمیل کاری مهم حذف شود) یا صدور احکام حقوقی/پزشکی حساس.\n• اولویت با Recall: زمانی که هزینه خطای نوع دوم (از دست رفتن مورد واقعی) جبران‌ناپذیر باشد؛ مانند غربالگری سرطان، تشخیص کلاهبرداری‌های میلیاردی یا هشدارهای فرود هواپیما.'
                  : '• High Precision Priority: When Type I errors (False Positives) carry severe penalties (e.g. email spam filters discarding vital contracts, or financial policy announcements).\n• High Recall Priority: When Type II errors (False Negatives) are catastrophic (e.g. disease screening, fraud detection, safety alarms).'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-bold text-[#00738c] block text-sm">
                {lang === 'fa' ? '۳. مدیریت نتایج نادقیق (Handling Inaccurate Results):' : '3. Managing Inaccurate Results & Fallback Protocols'}
              </span>
              <p>
                {lang === 'fa'
                  ? 'متدولوژی CPMAI تاکید می‌کند که پروژه موفق پروژه‌ای نیست که خطا نداشته باشد، بلکه پروژه‌ای است که پروتکل کنترل خطای شفاف دارد. در چت‌بات شرکت XYZ، زمانی که ضریب اطمینان مدل زیر ۸۰٪ باشد، سامانه با پیام «اجازه دهید شما را به همکارم متصل کنم» گفت‌وگو را به اپراتور هدایت می‌کند تا از ایجاد نارضایتی جلوگیری شود.'
                  : 'CPMAI teaches that successful AI is defined by robust fallback mechanisms, not zero errors. When model confidence dips below threshold, automated graceful hand-offs to human staff preserve brand trust.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs flex-wrap gap-3">
        <button
          onClick={onGoToPage17}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors cursor-pointer"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>
            {lang === 'fa'
              ? 'صفحه قبلی: ۱۷ (اسلاید ۲۷: محدودیت‌ها و عملکرد مدل)'
              : 'Previous: Page 17 (Slide 27: Constraints & Performance)'}
          </span>
        </button>

        {onGoToPage19 && (
          <button
            onClick={onGoToPage19}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors cursor-pointer shadow-xs"
          >
            <span>
              {lang === 'fa'
                ? 'صفحه بعدی: ۱۹ (اسلاید ۲۹)'
                : 'Next: Page 19 (Slide 29)'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
