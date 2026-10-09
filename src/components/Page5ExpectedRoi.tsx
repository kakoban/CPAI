import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { ArrowLeft, ArrowRight, Lightbulb, Calculator, Check, Copy, RotateCcw, TrendingUp, Percent, DollarSign, Target, FileText } from 'lucide-react';

interface Page5Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage4: () => void;
  onGoToPage6?: () => void;
}

export const Page5ExpectedRoi: React.FC<Page5Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage4,
  onGoToPage6
}) => {
  const [copied, setCopied] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Sensitivity analysis inputs
  const [investmentCost, setInvestmentCost] = useState('120000');
  const [annualBenefit, setAnnualBenefit] = useState('540000');
  const [annualOpsCost, setAnnualOpsCost] = useState('25000');
  const [adoptionRate, setAdoptionRate] = useState('85'); // %

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 5 of 5 (Slide 15)',
      slideBanner: 'What is the expected ROI for this project?',
      promptHint:
        'Calculate and articulate the expected Return on Investment (ROI) for this cognitive iteration. Include quantified financial ROI, payback period, strategic/non-monetary dividends, and risk/adoption sensitivity assumptions.',
      templateBtn: 'Insert CPMAI ROI Template',
      exampleBtn: 'Fill Retail Banking Churn ROI Example',
      calcToggleBtn: 'Interactive ROI & Sensitivity Tool',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      prevPageBtn: 'Previous Page: Cost-Benefit Analysis (Page 14)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      pageNumber: '15',
      tipsTitle: 'Key CPMAI Guidance for Expected ROI in AI Projects:',
      tip1:
        'Formula Clarity: State your exact equation — typically ((Net Cumulative Benefit - Initial Investment) / Initial Investment) * 100% over a 1 to 3 year horizon.',
      tip2:
        'Incorporate Adoption Discount: Model predictions only generate value if downstream operations act on them. Apply an operational adoption factor (e.g. 70%-85%) to avoid overpromising.',
      tip3:
        'Account for Model Retraining & Maintenance: Ongoing MLOps and cloud inference consume annual operational expenditure (OpEx); do not treat initial build cost as the only expense.',
      tip4:
        'Payback Period Target: Cognitive agile iterations in CPMAI should target a rapid breakeven period (ideally within 3 to 12 months) before major Phase VI scaling.',
      calcTitle: 'Interactive ROI & Adoption Sensitivity Estimator',
      calcApplyBtn: 'Append ROI Metrics to Canvas',
      investLabel: 'Initial Project Investment ($)',
      benefitLabel: 'Gross Annual Business Benefit ($)',
      opsLabel: 'Annual Model Maintenance & OpEx ($)',
      adoptLabel: 'Operational Adoption Rate (%)',
      netAnnualBenefit: 'Net Annual Benefit (Adjusted)',
      firstYearRoi: 'First-Year Net ROI',
      paybackPeriod: 'Payback Period',
      months: 'months'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۵ از ۵ (اسلاید ۱۵ کتاب کار)',
      slideBanner: 'What is the expected ROI for this project?',
      promptHint:
        'نرخ بازگشت سرمایه (ROI) مورد انتظار برای این تکرار هوش مصنوعی را محاسبه و تبیین کنید. شامل درصد بازگشت مالی، دوره بازگشت سرمایه (Payback Period)، مزایای استراتژیک غیرمالی و تحلیل حساسیت نرخ پذیرش سازمانی.',
      templateBtn: 'درج قالب استاندارد برآورد ROI',
      exampleBtn: 'پر کردن با نمونه موردی بانکداری خرد',
      calcToggleBtn: 'ابزار تعاملی محاسبه ROI و تحلیل حساسیت',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      prevPageBtn: 'صفحه قبل: تحلیل هزینه-فایده و بودجه (اسلاید ۱۴)',
      pmiCopyright:
        '© 2025 Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI® course.',
      pageNumber: '۱۵',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای برآورد نرخ بازگشت سرمایه (ROI):',
      tip1:
        'شفافیت در فرمول محاسبه: رابطه مالی خود را دقیق بنویسید — عموماً ((سود خالص تجمعی منهای سرمایه‌گذاری اولیه) تقسیم بر سرمایه‌گذاری اولیه) ضربدر ۱۰۰ در افق ۱ تا ۳ ساله.',
      tip2:
        'اعمال ضریب پذیرش سازمانی (Adoption Rate): خروجی مدل هوش مصنوعی تنها زمانی ارزش خلق می‌کند که کاربران انسانی یا فرآیندهای عملیاتی به آن عمل کنند؛ نرخ پذیرش واقع‌بینانه (۷۰ تا ۸۵ درصد) را در محاسبات لحاظ کنید.',
      tip3:
        'لحاظ کردن هزینه مداوم نگهداری و بازآموزی مدل: پروژه‌های هوش مصنوعی نیازمند هزینه پایش مداوم (OpEx) هستند؛ سرمایه‌گذاری را تنها محدود به فاز اولیه توسعه ندانید.',
      tip4:
        'هدف‌گذاری دوره بازگشت سریع: اسپرینت‌های چابک CPMAI باید بازگشت سرمایه‌ای سریع (معمولاً بین ۳ تا ۱۲ ماه پس از استقرار) را اثبات کنند تا منابع فازهای توسعه بعدی توجیه شود.',
      calcTitle: 'محاسبه‌گر تعاملی ROI و تحلیل حساسیت پذیرش',
      calcApplyBtn: 'پیوست شاخص‌های ROI به بوم',
      investLabel: 'کل سرمایه‌گذاری اولیه ($)',
      benefitLabel: 'کل منفعت ناخالص سالانه ($)',
      opsLabel: 'هزینه نگهداری و عملیات سالانه ($)',
      adoptLabel: 'نرخ پذیرش عملیاتی شعبه/کاربران (٪)',
      netAnnualBenefit: 'منفعت خالص تعدیل‌شده سالانه',
      firstYearRoi: 'نرخ بازگشت سرمایه سال اول (ROI)',
      paybackPeriod: 'دوره بازگشت سرمایه',
      months: 'ماه'
    }
  }[lang];

  // Mathematical calculations
  const invest = parseFloat(investmentCost) || 1;
  const gross = parseFloat(annualBenefit) || 0;
  const ops = parseFloat(annualOpsCost) || 0;
  const adoptFrac = (parseFloat(adoptionRate) || 100) / 100;

  const realizedGrossBenefit = gross * adoptFrac;
  const netYearBenefit = realizedGrossBenefit - ops;
  const netFirstYear = netYearBenefit - invest;
  const firstYearRoiPercent = invest > 0 ? Math.round((netFirstYear / invest) * 100) : 0;
  const paybackMonths = netYearBenefit > 0 ? ((invest / netYearBenefit) * 12).toFixed(1) : 'N/A';

  const handleInsertTemplate = () => {
    const templateEn = `1. Expected Quantitative Financial ROI:
- Initial Project Investment: $120,000
- Projected Gross Annual Business Return: $540,000
- Operational Adoption Factor: 85% (Adjusted Gross Return: $459,000)
- Annual MLOps, Compute & Retraining OpEx: $25,000
- Net Annualized Business Payoff: $434,000 / year
- Year 1 Net ROI: [($434,000 - $120,000) / $120,000] * 100% = 261% Net ROI
- Estimated Payback Period: ~3.3 months following production rollout.

2. Three-Year Cumulative Value Horizon:
- Year 1 Net Value: $314,000
- Year 2 Net Value: $434,000 (with established adoption)
- Year 3 Net Value: $434,000
- 3-Year Cumulative Net Return: $1,182,000 on a $120,000 initial spend (985% 3-year ROI).

3. Strategic / Qualitative Non-Monetary Dividends:
- Competitive Advantage: First-mover capability in proactive retention vs digital challengers.
- Data Assets & Infrastructure: Creation of a centralized high-value customer feature store usable across subsequent lending & marketing sprints.
- Organizational Cognitive Literacy: Branch staff transition from passive churn fire-fighting to proactive AI-guided relationship management.

4. Sensitivity & Downside Risk Scenarios:
- Conservative (Worst-Case) Scenario: If adoption drops to 60% and retention lift is 50% of expected ($270,000 * 0.6 = $162,000 gross), Year 1 ROI remains positive at 14% with payback in 10.5 months.
- Optimistic Scenario: If adoption exceeds 95% with cross-sell synergy, Year 1 ROI reaches 320% with payback in 2.8 months.`;

    const templateFa = `۱. برآورد کمّی نرخ بازگشت سرمایه مالی (Quantitative Financial ROI):
- کل سرمایه‌گذاری اولیه در اسپرینت: ۱۲۰,۰۰۰ دلار (معادل ۶ میلیارد تومان)
- منافع ناخالص سالانه پیش‌بینی‌شده: ۵۴۰,۰۰۰ دلار
- ضریب تعدیل نرخ پذیرش عملیاتی شعب: ۸۵٪ (منافع ناخالص تعدیل‌شده: ۴۵۹,۰۰۰ دلار)
- هزینه مداوم سالانه ابزارهای MLOps و زیرساخت ابری: ۲۵,۰۰۰ دلار
- منفعت خالص سالانه تحقق‌یافته: ۴۳۴,۰۰۰ دلار در سال
- نرخ بازگشت سرمایه سال اول (Net Year-1 ROI): معادل ۲۶۱ درصد
- دوره بازگشت سرمایه (Payback Period): تقریباً ۳.۳ ماه پس از استقرار عملیاتی در شعب.

۲. افق ارزش مالی تجمعی ۳ ساله (3-Year Value Horizon):
- ارزش خالص سال اول: ۳۱۴,۰۰۰ دلار (با کسر سرمایه‌گذاری اولیه)
- ارزش خالص سال دوم: ۴۳۴,۰۰۰ دلار
- ارزش خالص سال سوم: ۴۳۴,۰۰۰ دلار
- کل بازدهی خالص تجمعی ۳ ساله: ۱,۱۸۲,۰۰۰ دلار بر روی ۱۲۰,۰۰۰ دلار هزینه اولیه (۹۸۵٪ بازگشت سرمایه ۳ ساله).

۳. مزایای استراتژیک و کیفی غیرمالی (Strategic Qualitative Dividends):
- مزیت رقابتی پایدار: تبدیل شدن به پیشگام صنعت در نگهداشت پیش‌دستانه مشتری در برابر نئوبانک‌ها.
- ایجاد دارایی داده‌ای مشترک: شکل‌گیری ذخیره‌گاه ویژگی‌های مشتریان (Feature Store) برای اسپرینت‌های آینده اعتبارسنجی و بازاریابی.
- ارتقای سواد شناختی سازمان: گذار شعب از رویکرد انفعالی (تماس پس از انصراف) به مدیریت رابطه پیش‌بینانه و هوشمند.

۴. تحلیل حساسیت و سناریوهای ریسک (Sensitivity & Downside Analysis):
- سناریوی بدبینانه (محافظه‌کارانه): در صورت کاهش نرخ پذیرش به ۶۰٪ و تحقق تنها ۵۰٪ اثرگذاری پیش‌بینی، منفعت خالص سالانه به ۱۳۷,۰۰۰ دلار رسیده و پروژه همچنان ظرف ۱۰.۵ ماه سر‌به‌سر می‌شود.
- سناریوی خوش‌بینانه: در صورت پذیرش بالای ۹۵٪، نرخ بازگشت سال اول به بیش از ۳۲۰٪ می‌رسد.`;

    onChangeContent(lang === 'fa' ? templateFa : templateEn);
  };

  const handleInsertExample = () => {
    const exampleEn = `Detailed ROI Justification: High-Value Retail Checking Account Churn Model (Iteration 1)

1. Executive Financial ROI Summary:
- Initial Sprint Investment: $120,000 (Talent, GPU cloud, data engineering, validation gate)
- Annualized Gross Value Preserved: $540,000
- Risk-Adjusted Value (at 85% staff adoption): $459,000
- Ongoing Annual Maintenance & Inference Cost: $25,000
- First-Year Net ROI: 261%
- Capital Payback Horizon: 3.3 Months

2. ROI Mechanics & Breakdown:
- Cost-Avoidance Dividend: $140,000 annual labor savings by eliminating manual branch retention logs and untargeted outbound campaigns.
- Revenue Retention Dividend: $320,000 retained net interest margin by proactively preserving deposit balances of 450 at-risk accounts.
- Customer Reacquisition Savings: $80,000 saved by not having to replace lost depositors with high-cost customer acquisition bonuses.

3. Downside Risk Cushion:
Even if model prediction accuracy degrades by 30% or branch adoption is delayed by 60 days, the investment reaches financial breakeven within month 7 of deployment. The business case possesses high robustness under CPMAI standards.`;

    const exampleFa = `توجیه تفصیلی نرخ بازگشت سرمایه (ROI): مدل پیش‌بینی ریزش مشتریان بانکداری خرد (تکرار اول)

۱. خلاصه مدیریتی شاخص‌های بازگشت سرمایه:
- سرمایه‌گذاری اولیه در این تکرار: ۱۲۰,۰۰۰ دلار (تیم فنی، پردازش ابری، مهندسی داده و استقرار)
- ارزش ناخالص سالانه حفظ‌شده: ۵۴۰,۰۰۰ دلار
- ارزش تعدیل‌شده بر اساس ریسک و نرخ پذیرش شعب (۸۵٪): ۴۵۹,۰۰۰ دلار
- هزینه عملیاتی و پایش سالانه مدل: ۲۵,۰۰۰ دلار
- نرخ بازگشت سرمایه خالص سال اول (Net Year 1 ROI): ۲۶۱ درصد
- زمان بازگشت سرمایه: ۳.۳ ماه پس از آغاز بهره‌برداری عملیاتی

۲. تفکیک سرفصل‌های بازدهی مالی:
- صرفه‌جویی ناشی از کاهش فرآیند دستی: ۱۴۰,۰۰۰ دلار کاهش ساعات کار اداری پرسنل شعب.
- حفظ سود تسهیلاتی سپرده‌ها: ۳۲۰,۰۰۰ دلار حفظ سود حاصل از نگه‌داشت ۴۵۰ حساب کلیدی در معرض خطر خروج.
- اجتناب از هزینه‌های جذب مجدد: ۸۰,۰۰۰ دلار صرفه‌جویی در پاداش‌ها و کمپین‌های تبلیغاتی جایگزینی مشتری.

۳. حاشیه امنیت و پوشش ریسک:
حتی در صورت افت ۳۰ درصدی دقت پیش‌بینی یا تأخیر ۲ ماهه در پذیرش کامل توسط کارشناسان شعب، پروژه حداکثر در ماه هفتم به نقطه سر‌به‌سر مالی خواهد رسید که طبق چارچوب اعتبارسنجی CPMAI، توجیه اقتصادی آن قطعی و کم‌ریسک است.`;

    onChangeContent(lang === 'fa' ? exampleFa : exampleEn);
  };

  const handleAppendCalculatorResults = () => {
    const summaryText =
      lang === 'fa'
        ? `\n\n--- شاخص‌های کلیدی برآورد ROI (استخراج‌شده از محاسبه‌گر) ---
• سرمایه‌گذاری اولیه: $${invest.toLocaleString()}
• منفعت ناخالص سالانه: $${gross.toLocaleString()}
• نرخ پذیرش عملیاتی: ${adoptionRate}% (منفعت تعدیل‌شده: $${realizedGrossBenefit.toLocaleString()})
• هزینه مداوم سالانه: $${ops.toLocaleString()}
• منفعت خالص سالانه: $${netYearBenefit.toLocaleString()}
• نرخ بازگشت سرمایه سال اول (Net ROI): ${firstYearRoiPercent}%
• دوره بازگشت سرمایه: ${paybackMonths} ماه`
        : `\n\n--- Key Expected ROI Metrics Calculated ---
• Initial Investment: $${invest.toLocaleString()}
• Gross Annual Benefit: $${gross.toLocaleString()}
• Operational Adoption Rate: ${adoptionRate}% (Adjusted Gross: $${realizedGrossBenefit.toLocaleString()})
• Annual Maintenance OpEx: $${ops.toLocaleString()}
• Net Annual Payoff: $${netYearBenefit.toLocaleString()}
• Year-1 Net ROI: ${firstYearRoiPercent}%
• Payback Period: ${paybackMonths} months`;

    onChangeContent((content || '') + summaryText);
  };

  const handleCopy = () => {
    if (!content) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Page Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#00738c] text-white">
            {t.badge}
          </span>
          <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {lang === 'fa' ? 'کتاب کار رسمی CPMAI · مؤسسه PMI' : 'Official CPMAI Workbook · PMI'}
          </span>
        </div>

        <button
          type="button"
          onClick={onGoToPage4}
          className="flex items-center gap-1.5 text-xs font-medium text-[#00738c] dark:text-[#6fb3c6] hover:underline"
        >
          {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.prevPageBtn}</span>
        </button>
      </div>

      {/* Main Slide Card Container (1-to-1 visual fidelity with uploaded slide) */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] rounded-xl border border-[#d9dad5] dark:border-[#2d3942] overflow-hidden shadow-xs relative">
        {/* Question Header: Dark Cyan / Teal banner matching image */}
        <div className="bg-[#00738c] text-white px-5 py-3.5 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
          <span dir="ltr" className="tracking-tight font-sans">
            {t.slideBanner}
          </span>
          <span className="text-[11px] font-mono opacity-85 px-2 py-0.5 rounded bg-black/20">
            {lang === 'fa' ? 'اسلاید ۱۵' : 'Slide 15'}
          </span>
        </div>

        {/* Interactive Workspace Canvas (Lavender/Periwinkle container with watermarked triangles) */}
        <div className="bg-[#e8edf9] dark:bg-[#141f30] border-2 border-t-0 border-[#00738c] p-4 sm:p-6 shadow-inner flex flex-col min-h-[520px] relative">
          {/* Action Bar inside Canvas */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#c8d4eb] dark:border-[#22334d]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.templateBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleInsertExample}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] dark:border-[#6fb3c6] bg-white/70 dark:bg-black/20 hover:bg-white transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{t.exampleBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#2f7d5b] text-[#2f7d5b] dark:text-[#63c496] dark:border-[#63c496] bg-white/70 dark:bg-black/20 hover:bg-white transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{t.calcToggleBtn}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!content}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md bg-white/80 dark:bg-[#1c2830] text-[#1c2830] dark:text-[#e8ebe9] border border-[#c8d4eb] dark:border-[#22334d] hover:bg-white disabled:opacity-40 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copiedToast : t.copyBtn}</span>
              </button>

              {content && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(lang === 'fa' ? 'آیا از پاک کردن متن بوم اطمینان دارید؟' : 'Clear canvas?')) {
                      onChangeContent('');
                    }
                  }}
                  className="p-1.5 rounded-md text-[#b3432f] hover:bg-white/60 dark:hover:bg-black/20 transition-colors"
                  title={t.clearBtn}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Embedded Interactive ROI & Sensitivity Analysis Tool */}
          {showCalculator && (
            <div className="mb-4 p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2536] border border-[#00738c]/30 shadow-xs text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#d9dad5] dark:border-[#2d3942]">
                <div className="flex items-center gap-2 font-semibold text-[#00738c] dark:text-[#6fb3c6]">
                  <Calculator className="w-4 h-4" />
                  <span>{t.calcTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={handleAppendCalculatorResults}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#2f7d5b] text-white hover:bg-[#25684a] transition-colors"
                >
                  {t.calcApplyBtn}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                    {t.investLabel}
                  </label>
                  <input
                    type="number"
                    value={investmentCost}
                    onChange={(e) => setInvestmentCost(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                  />
                </div>
                <div>
                  <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                    {t.benefitLabel}
                  </label>
                  <input
                    type="number"
                    value={annualBenefit}
                    onChange={(e) => setAnnualBenefit(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                  />
                </div>
                <div>
                  <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                    {t.opsLabel}
                  </label>
                  <input
                    type="number"
                    value={annualOpsCost}
                    onChange={(e) => setAnnualOpsCost(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                  />
                </div>
                <div>
                  <label className="text-[#5d6b73] dark:text-[#9aa8b0] block mb-0.5">
                    {t.adoptLabel}
                  </label>
                  <input
                    type="number"
                    value={adoptionRate}
                    onChange={(e) => setAdoptionRate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228]"
                  />
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] block">{t.netAnnualBenefit}</span>
                  <span className="font-bold text-sm text-[#2f7d5b] dark:text-[#63c496]">
                    ${netYearBenefit.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] block">{t.firstYearRoi}</span>
                  <span className="font-bold text-sm text-[#00738c] dark:text-[#6fb3c6]">
                    {firstYearRoiPercent}% Net ROI
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] block">{t.paybackPeriod}</span>
                  <span className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {paybackMonths} {t.months}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Main Primary Answer Textarea */}
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder={
              lang === 'fa'
                ? 'پاسخ و تحلیل نرخ بازگشت سرمایه (ROI) این پروژه را در این کادر بنویسید:\n۱. محاسبه عددی ROI سال اول و تجمعی (ارزش خالص منفعت تقسیم بر سرمایه‌گذاری)\n۲. دوره بازگشت سرمایه (چند ماه تا سر‌به‌سر شدن هزینه اسپرینت؟)\n۳. مزایای استراتژیک غیرپولی (مزیت رقابتی، داده‌های سازمانی، سواد شناختی)\n۴. تحلیل حساسیت (در صورت افت نرخ پذیرش یا خطای پیش‌بینی، توجیه مالی چگونه حفظ می‌شود؟)...'
                : 'Write your Expected ROI justification here:\n1. Financial ROI calculation (Year 1 & 3-year cumulative net payoff)\n2. Payback period (months to break-even on sprint investment)\n3. Strategic non-monetary dividends (competitive advantage, feature store assets)\n4. Sensitivity & downside risk scenarios (accounting for operational adoption rate)...'
            }
            className="flex-1 w-full p-4 sm:p-5 rounded-lg bg-[#ffffff]/90 dark:bg-[#1a293d]/90 text-[#1c2830] dark:text-[#e8ebe9] border border-[#c8d4eb] dark:border-[#2d3942] focus:border-[#00738c] focus:outline-none resize-y text-sm sm:text-[15px] leading-relaxed font-sans shadow-inner min-h-[440px]"
          />

          {/* Canvas Footer Bar with Word Counts and Watermark */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-1">
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>{words} {t.wordCount}</span>
              <span>·</span>
              <span>{chars} {t.charCount}</span>
            </div>

            {/* Geometric Triangles Watermark Accent matching the slide bottom right */}
            <div className="opacity-25 dark:opacity-15 pointer-events-none text-[#00738c] dark:text-[#6fb3c6]">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="currentColor">
                <polygon points="48,32 24,32 48,8" />
                <polygon points="36,32 12,32 36,8" />
                <polygon points="24,32 0,32 24,8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Slide Footer matching uploaded image: Copyright on left, Page number 15 on right */}
        <div className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-[#5d6b73] dark:text-[#9aa8b0] bg-gradient-to-r from-transparent via-[#faede5]/30 to-[#faede5]/80 dark:via-transparent dark:to-transparent border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
          <span dir="ltr" className="tracking-tight">
            {t.pmiCopyright}
          </span>
          <span className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9] px-2 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b]">
            {t.pageNumber}
          </span>
        </div>
      </div>

      {/* CPMAI Methodology Tips Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-2.5">
        <h3 className="font-semibold text-xs sm:text-sm text-[#1f5163] dark:text-[#6fb3c6]">
          {t.tipsTitle}
        </h3>
        <ul className="space-y-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00738c] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip4}</span>
          </li>
        </ul>
      </div>

      {/* Navigation: Back to Page 4 and Forward to Page 6 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20">
        <button
          type="button"
          onClick={onGoToPage4}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-white dark:bg-[#1a2228] text-[#1f5163] dark:text-[#6fb3c6] border border-[#1f5163]/30 hover:bg-[#f4f4f1] transition-colors shadow-xs"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبلی: هزینه-فایده (ص ۴)' : 'Back to Page 4'}</span>
        </button>

        {onGoToPage6 && (
          <button
            type="button"
            onClick={onGoToPage6}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-md"
          >
            <span>{lang === 'fa' ? 'صفحه بعدی: الزامات شناختی (ص ۶)' : 'Next: Cognitive Requirements (Page 6)'}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
