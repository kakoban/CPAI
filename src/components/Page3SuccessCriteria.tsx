import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { IndustryTrackId } from '../types/industryTrack';
import { ArrowLeft, ArrowRight, Lightbulb, FileText, Check, Copy, RotateCcw } from 'lucide-react';

interface Page3Props {
  lang: Language;
  industryTrack?: IndustryTrackId;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage2: () => void;
  onGoToPage4?: () => void;
}

export const Page3SuccessCriteria: React.FC<Page3Props> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  content,
  onChangeContent,
  onGoToPage2,
  onGoToPage4
}) => {
  const [copied, setCopied] = useState(false);
  const isPetro = industryTrack === 'ENERGY_PETRO';

  const t = {
    en: {
      badge: `CPMAI Phase I · Page 3 of 5 (${isPetro ? 'Oil & Gas Petrochemical Track' : 'Civil Megaproject Track'})`,
      subtaskH: 'Subtask: Determine Business Success Criteria',
      criteriaLabel: 'Business success criteria:',
      criteriaText: 'Describe the criteria for a successful or useful outcome of the project from the business point of view. This might be quite specific and able to be measured objectively, for example, reduction of customer attrition to a certain level, or it might be general and subjective, such as “give useful insights into the relationships.” In the latter case, it should be indicated who makes the subjective judgment.',
      slideTitle: 'What are the objective measures of success for this project iteration?',
      promptHint: 'Identify specific, measurable business success metrics for this iteration, distinguishing between objective quantitative KPIs and subjective qualitative judgments.',
      templateBtn: 'Insert Criteria Template',
      exampleBtn: isPetro ? 'Fill Refinery Fouling Success Criteria' : 'Fill Urban Metro TBM Success Criteria',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      prevPageBtn: 'Previous Page: What problem are you solving with AI?',
      nextPageBtn: 'Next Page: Cost-Benefit Analysis (Page 14)',
      tipsTitle: 'Key CPMAI Guidance for Business Success Criteria:',
      tip1: 'Business criteria are NOT technical metrics (e.g. F1-score or accuracy). They must reflect real business value (dollars, time, retention).',
      tip2: 'Objective measures must have explicit quantitative targets and timeframes (e.g. reduce churn by 12% over 6 months).',
      tip3: 'Subjective measures (e.g. "useful insights") must explicitly define the stakeholder evaluator who decides if the criterion is met.',
      tip4: 'Keep the success criteria calibrated strictly to THIS iteration scope, avoiding premature promises for future sprints.'
    },
    fa: {
      badge: `فاز اول CPMAI · صفحه ۳ از ۵ (${isPetro ? 'حوزه تخصصی نفت و گاز' : 'حوزه تخصصی مگاپروژه‌های عمرانی'})`,
      subtaskH: 'زیروظیفه: تعیین معیارهای موفقیت کسب‌وکار (Subtask: Determine Business Success Criteria)',
      criteriaLabel: 'معیارهای موفقیت کسب‌وکار (Business success criteria):',
      criteriaText: isPetro
        ? 'معیارهای یک نتیجه موفق یا سودمند از دیدگاه پالایشگاه و بهره‌برداری را توصیف کنید؛ مانند کاهش مشعل‌سوزی، جلوگیری از شات‌دان و افزایش راندمان حرارتی.'
        : 'معیارهای یک نتیجه موفق از دیدگاه مگاپروژه عمرانی و کارفرما را توصیف کنید؛ مانند کنترل نشست زیر ۲ میلی‌متر، حذف توقف TBM و کاهش ادعاهای تاخیرات نشریه ۴۳۱۱.',
      slideTitle: 'What are the objective measures of success for this project iteration?',
      promptHint: 'معیارهای عینی و سنجش‌پذیر موفقیت تجاری را برای این تکرار پروژه مشخص کنید و بین شاخص‌های کمّی و ارزیابی‌های کیفی تفکیک قائل شوید.',
      templateBtn: 'درج قالب استاندارد معیارها',
      exampleBtn: isPetro ? 'پر کردن با نمونه پالایشگاهی (معیارهای موفقیت)' : 'پر کردن با نمونه مگاپروژه احداث مترو (معیارهای موفقیت)',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      prevPageBtn: 'صفحه قبل: در این تکرار چه مسئله‌ای را با هوش مصنوعی حل می‌کنید؟',
      nextPageBtn: 'صفحه بعد: تحلیل هزینه-فایده و بودجه (اسلاید ۱۴)',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای معیارهای موفقیت کسب‌وکار:',
      tip1: 'معیارهای کسب‌وکار، معیارهای فنی هوش مصنوعی (مانند دقت یا F1-score) نیستند؛ بلکه باید ارزش ملموس سازمانی (ریال، زمان، کاهش ریسک) را بازتاب دهند.',
      tip2: 'معیارهای عینی باید دارای هدف کمّی مشخص و افق زمانی باشند (مانند کاهش ۸۰ درصدی ادعاهای تاخیرات پیمانکار یا کاهش ۳ میلیون دلاری مشعل‌سوزی).',
      tip3: 'برای معیارهای کیفی و ذهنی (مانند "ارائه بینش سودمند") باید صریحاً ذی‌نفع ارزیابی‌کننده تعیین شود.',
      tip4: 'معیارها را دقیقاً متناسب با محدوده همین تکرار بسنجید و از وعده‌های زودرس برای اسپرینت‌های آینده پرهیز کنید.'
    }
  }[lang];

  const handleInsertTemplate = () => {
    const templateEn = `1. Objective (Quantitative) Success Measures for this Iteration:
- Primary Metric: [e.g. Reduction of customer attrition from baseline 1.2%/month to <0.9%/month]
- Financial / Operational Payoff: [e.g. Preserved deposit balances worth $1.8M annually]
- Target Measurement Horizon: [e.g. Evaluated across 90 days following regional branch deployment]

2. Subjective (Qualitative) Success Criteria:
- Qualitative Goal: [e.g. Relationship managers perceive the generated churn risk scores as actionable and trustworthy]
- Evaluator / Decision Maker: [Explicitly state who makes the subjective call, e.g. Head of Branch Operations and Retail Retention Lead]

3. Baseline vs. Target Threshold:
- Current Baseline: [e.g. 5% save rate upon customer closure notice]
- Target Minimum Acceptable Threshold: [e.g. Minimum 10% customer retention save rate from proactive alerts]`;

    const templateFa = `۱. معیارهای عینی و کمّی موفقیت در این تکرار (Objective Quantitative Measures):
- شاخص اصلی: [مثلاً کاهش نرخ ریزش ماهانه از ۱.۲٪ فعلی به کمتر از ۰.۹٪]
- ارزش مالی یا عملیاتی ملموس: [مثلاً حفظ سالانه ۱.۸ میلیارد تومان از منابع سپرده‌گذاری]
- افق زمانی سنجش: [مثلاً ارزیابی در بازه ۹۰ روز پس از استقرار آزمایشی در شعب]

۲. معیارهای کیفی و ذهنی موفقیت (Subjective Qualitative Criteria):
- هدف کیفی: [مثلاً روسای شعب اعلام کنند که دلایل ریسک ریزش ارائه‌شده قابل‌اتکا و عملیاتی است]
- ارزیابی‌کننده نهایی: [مشخص کنید چه کسی قضاوت کیفی را انجام می‌دهد، مثلاً معاونت امور شعب و مدیر کل بازاریابی]

۳. خط مبنای فعلی در برابر آستانه هدف (Baseline vs. Target Threshold):
- خط مبنای کنونی: [مثلاً نرخ ماندگاری زیر ۵٪ پس از اعلام انصراف مشتری]
- حداقل آستانه پذیرش موفقیت: [مثلاً دستیابی به حداقل ۱۰٪ ماندگاری مشتریان از طریق هشدارهای زودهنگام]`;

    onChangeContent(lang === 'fa' ? templateFa : templateEn);
  };

  const handleInsertExample = () => {
    const exampleEnCivil = `Business Success Criteria: Urban Metro TBM Ground Subsidence Iteration (Sprint 1)

1. Objective (Quantitative) Measures of Success:
- Geotechnical Boundary Control: Keep maximum ground settlement above the TBM crown strictly below 2.0 mm across all intersecting municipal utility crossings.
- Contractual Delay Mitigation: Reduce contractor delay claims and work stoppages under Circular 4311 (Clause 30) by >=80%, preventing an estimated $1.4M in dispute costs.
- Prediction Horizon & Latency: Continuous 48-hour settlement predictions refreshed every 15 minutes with dashboard telemetry latency under 500ms.
- Model Precision Target: Mean Absolute Error (MAE) of settlement forecasting < 0.8 mm validated against real surveyor pin readings.

2. Subjective (Qualitative) Measures of Success:
- Engineering Usability: Resident supervisory engineers and TBM superintendents confirm that the real-time subsidence risk heatmaps provide actionable guidance for cutterhead torque and bentonite face pressure adjustments.
- Designated Evaluator: Metro Line Technical Project Director & Lead Geotechnical Consultant.

3. Minimum Acceptable Gate Threshold:
- If settlement prediction error exceeds 1.5 mm in initial drive testing, the team iterates on spatial-temporal feature engineering in Phase III before tunneling beneath pressurized gas mains.`;

    const exampleFaCivil = `معیارهای موفقیت کسب‌وکار: تکرار پیش‌بینی نشست زمین در حفاری مکانیزه مترو (اسپرینت ۱)

۱. معیارهای عینی و کمّی موفقیت برای این تکرار (Objective Measures):
- کنترل حدود مجاز ژئوتکنیکی: حفظ حداکثر فرونشست سطح زمین بالای تاج تونل زیر ۲.۰ میلی‌متر در تقاطع با خطوط لوله گاز و انتقال آب شهری.
- کاهش ادعاهای قراردادی تاخیرات: کاهش حداقل ۸۰ درصدی توقف‌های کارگاهی و ادعای تاخیرات مجاز پیمانکار تحت ماده ۳۰ نشریه ۴۳۱۱ (صرفه‌جویی ۱.۴ میلیارد تومانی در خسارات پروژه).
- افق زمانی و تاخیر پیش‌بینی: تولید مداوم نقشه پیش‌بینی نشست با افق ۴۸ ساعت قبل از پیشروی و تازه‌سازی هر ۱۵ دقیقه یکبار با تاخیر نمایش کمتر از ۵۰۰ میلی‌ثانیه.
- دقت پیش‌بینی مدل: خطای میانگین قدرمطلق (MAE) کمتر از ۰.۸ میلی‌متر در مقایسه با قرائت‌های واقعی پین‌های نقشه‌برداری.

۲. معیارهای کیفی و ذهنی موفقیت (Subjective Criteria):
- کارآمدی تصمیم‌یاری کارگاهی: مهندسان ناظر مقیم و سرپرست کارگاه تایید کنند که هشدارهای نشست، تصمیم‌گیری درباره تغییر پارامتر تزریق فوم و فشار پیشانی TBM را به شکل عملیاتی ممکن می‌سازد.
- مرجع قضاوت کیفی: مدیر فنی مگاپروژه احداث خط مترو و سرناظر ژئوتکنیک مهندس مشاور.

۳. آستانه پذیرش حداقلی برای پیشروی:
- در صورتی که خطای پیش‌بینی نشست در قطعه آزمایشی بالای ۱.۵ میلی‌متر باشد، پیشروی به زیر بافت فرسوده متوقف شده و تیم به فاز ۳ برای مهندسی ویژگی‌های لایه‌های زمین‌شناسی بازمی‌گردد.`;

    const exampleEnPetro = `Business Success Criteria: Crude Preheat Train Fouling & Flaring Mitigation (Sprint 1)

1. Objective (Quantitative) Measures of Success:
- Flaring & Fuel Cost Reduction: Cut emergency flaring emissions and furnace firing overconsumption by $2.4M annually through early descaling schedule optimization.
- Descaling Lead Time: Issue automated descaling advisories at least 45 days before the preheat train hydraulic pressure drop breaches the 3.5 bar critical threshold.
- Thermal Coefficient Accuracy: Achieve Mean Absolute Percentage Error (MAPE) < 4.5% in forecasting the overall heat transfer coefficient (U-value) degradation curve across 60 days.
- Availability & Telemetry Uptime: 99.8% uptime on Level-3 OT network integration with DCS OSIsoft PI data tags.

2. Subjective (Qualitative) Measures of Success:
- Operational Safety Alignment: Central Control Room (CCR) board operators and process engineers confirm that model advisory setpoints strictly respect equipment metallurgical creep limits and plant HAZOP safety matrices.
- Designated Evaluator: Refinery Chief Process Operations Superintendent and Senior Asset Integrity Lead.

3. Minimum Acceptable Gate Threshold:
- If U-value prediction MAPE exceeds 7% after 30 days of real-time monitoring, model retraining with updated crude assay properties is enforced before issuing autonomous advisory alerts.`;

    const exampleFaPetro = `معیارهای موفقیت کسب‌وکار: تکرار پیش‌بینی رسوب‌گرفتگی مبدل‌ها و کاهش مشعل‌سوزی پالایشگاه (اسپرینت ۱)

۱. معیارهای عینی و کمّی موفقیت برای این تکرار (Objective Measures):
- صرفه‌جویی مالی در سوخت و فلرینگ: کاهش مصرف گاز سوخت کوره و پیشگیری از مشعل‌سوزی اضطراری حداقل به ارزش ۲.۴ میلیون دلار در سال از طریق بهینه‌سازی توالی شستشوی مبدل‌ها.
- افق زمانی هشدار شستشو: صدور هشدار تمیزکاری مبدل‌ها حداقل ۴۵ روز پیش از رسیدن افت فشار هیدرولیکی به حد بحرانی ۳.۵ بار.
- دقت محاسباتی مدل: دستیابی به خطای درصد میانگین (MAPE) کمتر از ۴.۵٪ در پیش‌بینی منحنی افت ضریب انتقال حرارت (U-value) در بازه ۶۰ روزه آینده.
- پایداری اتصال صنعتی: آپ‌تایم ۹۹.۸٪ سامانه بر بستر شبکه صنعتی اتوماسیون (DCS) پالایشگاه.

۲. معیارهای کیفی و ذهنی موفقیت (Subjective Criteria):
- انطباق با اصول ایمنی فرآیند: بهره‌برداران اتاق کنترل مرکزی (CCR) و مهندسان فرآیند تایید کنند که نقاط کاری پیشنهادی مدل با حدود ایمنی متالورژیکی لوله‌ها و استانداردهای HAZOP مطابقت کامل دارد.
- مرجع قضاوت کیفی: رئیس بهره‌برداری پالایشگاه و سرپرست مهندسی ایمنی فرآیند و دارایی‌های فیزیکی.

۳. آستانه پذیرش حداقلی برای پیشروی:
- در صورتی که خطای پیش‌بینی ضریب حرارتی بالای ۷٪ باشد، پیشنهادهای مدل در وضعیت غیرفعال (Shadow Mode) قرار گرفته و تیم به فاز ۳ برای اصلاح موازنه جرم و انرژی بازمی‌گردد.`;

    const selectedEn = isPetro ? exampleEnPetro : exampleEnCivil;
    const selectedFa = isPetro ? exampleFaPetro : exampleFaCivil;

    onChangeContent(lang === 'fa' ? selectedFa : selectedEn);
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header (Matching Image 3) */}
      <div className="border-b border-[#d9dad5] dark:border-[#2d3942] pb-5">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
          <span>{t.badge}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] tracking-tight font-sans">
          {t.subtaskH}
        </h1>
      </div>

      {/* Top Description Box (Verbatim matching the top card in Image 3) */}
      <div className="relative p-5 sm:p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] border-t-3 border-t-[#1f5163] dark:border-t-[#6fb3c6] shadow-xs">
        <p className="text-xs sm:text-sm leading-relaxed text-[#2c3840] dark:text-[#cfd6db]">
          <b className="text-[#1c2830] dark:text-[#e8ebe9] font-semibold">{t.criteriaLabel} </b>
          {t.criteriaText}
        </p>

        {/* Subtle geometric watermark triangles matching top-right of Image 3 card */}
        <div className="absolute top-4 end-4 opacity-20 pointer-events-none text-[#b87333] dark:text-[#c98344]">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="currentColor">
            <polygon points="14,0 28,24 0,24" />
          </svg>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
          {t.promptHint}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleInsertTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#0a7b97] hover:text-[#0a7b97] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.templateBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleInsertExample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#0a7b97] text-[#0a7b97] dark:text-[#6fb3c6] dark:border-[#6fb3c6] hover:bg-[#0a7b97]/10 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{t.exampleBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.copiedToast : t.copyBtn}</span>
          </button>

          {content && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(lang === 'fa' ? 'آیا از پاک کردن متن بوم اطمینان دارید؟' : 'Clear canvas content?')) {
                  onChangeContent('');
                }
              }}
              className="p-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#b3432f] hover:bg-[#b3432f]/10"
              title={t.clearBtn}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Slide Container (Authentic replica of Image 3) */}
      <div className="rounded-xl border border-[#0a7b97] dark:border-[#0a7b97]/80 overflow-hidden shadow-sm bg-[#ffffff] dark:bg-[#16202a]">
        {/* Teal Header Bar (Verbatim Image 3 Teal Header) */}
        <div className="bg-[#00738c] px-6 py-3.5 text-white flex items-center justify-between select-none">
          <h2 className="font-semibold text-base sm:text-lg tracking-normal font-sans" dir="ltr">
            {t.slideTitle}
          </h2>
          <span className="text-[11px] font-mono opacity-80 px-2 py-0.5 rounded bg-black/20">
            CPMAI Page 13
          </span>
        </div>

        {/* Large Lavender-Blue Workspace Canvas Box (Matching Image 3) */}
        <div className="p-4 sm:p-6 bg-[#e6edfa] dark:bg-[#152335] min-h-[500px] sm:min-h-[580px] flex flex-col relative transition-colors">
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder={
              lang === 'fa'
                ? 'معیارهای عینی و سنجش‌پذیر موفقیت برای این تکرار پروژه را اینجا بنویسید...\n\nبرای شروع می‌توانید از دکمه‌های «درج قالب استاندارد معیارها» یا «پر کردن با نمونه موردی» در بالا استفاده کنید.'
                : 'Write your objective measures of success for this project iteration here...\n\nYou can also click "Insert Criteria Template" or "Fill Retail Banking Churn Example" above to get started.'
            }
            className="flex-1 w-full p-4 sm:p-5 rounded-lg bg-[#ffffff]/90 dark:bg-[#1a293d]/90 text-[#1c2830] dark:text-[#e8ebe9] border border-[#d2def2] dark:border-[#2d3f56] focus:border-[#00738c] focus:outline-none resize-y text-sm sm:text-[15px] leading-relaxed font-sans shadow-inner min-h-[420px]"
          />

          {/* Footer Bar of Canvas */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-1">
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>{words} {t.wordCount}</span>
              <span>·</span>
              <span>{chars} {t.charCount}</span>
            </div>

            {/* Corner Geometric Triangles (Watermark replica from bottom right of slide) */}
            <div className="opacity-25 dark:opacity-15 pointer-events-none text-[#00738c] dark:text-[#6fb3c6]">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="currentColor">
                <polygon points="48,32 24,32 48,8" />
                <polygon points="36,32 12,32 36,8" />
                <polygon points="24,32 0,32 24,8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CPMAI Methodology Tips Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-2.5">
        <h3 className="font-semibold text-xs sm:text-sm text-[#1f5163] dark:text-[#6fb3c6]">
          {t.tipsTitle}
        </h3>
        <ul className="space-y-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#1f5163] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1f5163] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1f5163] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1f5163] dark:text-[#6fb3c6] font-bold">•</span>
            <span>{t.tip4}</span>
          </li>
        </ul>
      </div>

      {/* Navigation Return Button to Page 2 and Next Page to Page 4 */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onGoToPage2}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#ffffff] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] transition-colors shadow-2xs"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبل: حل چه مسئله‌ای با AI؟' : 'Back to Page 2'}</span>
        </button>

        {onGoToPage4 && (
          <button
            type="button"
            onClick={onGoToPage4}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-xs"
          >
            <span>{t.nextPageBtn}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
