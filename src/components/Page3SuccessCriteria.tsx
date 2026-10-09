import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { ArrowLeft, ArrowRight, Lightbulb, FileText, Check, Copy, RotateCcw } from 'lucide-react';

interface Page3Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage2: () => void;
  onGoToPage4?: () => void;
}

export const Page3SuccessCriteria: React.FC<Page3Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage2,
  onGoToPage4
}) => {
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 3 of 5 (Slide 13)',
      subtaskH: 'Subtask: Determine Business Success Criteria',
      criteriaLabel: 'Business success criteria:',
      criteriaText: 'Describe the criteria for a successful or useful outcome of the project from the business point of view. This might be quite specific and able to be measured objectively, for example, reduction of customer attrition to a certain level, or it might be general and subjective, such as “give useful insights into the relationships.” In the latter case, it should be indicated who makes the subjective judgment.',
      slideTitle: 'What are the objective measures of success for this project iteration?',
      promptHint: 'Identify specific, measurable business success metrics for this iteration, distinguishing between objective quantitative KPIs and subjective qualitative judgments.',
      templateBtn: 'Insert Criteria Template',
      exampleBtn: 'Fill Retail Banking Churn Example',
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
      badge: 'فاز اول CPMAI · صفحه ۳ از ۵ (اسلاید ۱۳ کتاب کار)',
      subtaskH: 'زیروظیفه: تعیین معیارهای موفقیت کسب‌وکار (Subtask: Determine Business Success Criteria)',
      criteriaLabel: 'معیارهای موفقیت کسب‌وکار (Business success criteria):',
      criteriaText: 'معیارهای یک نتیجه موفق یا سودمند از دیدگاه کسب‌وکار را توصیف کنید. این معیارها ممکن است کاملاً مشخص و به صورت عینی قابل اندازه‌گیری باشند؛ برای مثال، کاهش ریزش مشتری به یک سطح معین (مانند کاهش ۱۰ درصدی). یا ممکن است کلی و کیفی/ذهنی باشند، مانند «ارائه بینش‌های مفید در روابط با مشتریان». در حالت دوم، باید مشخص شود چه کسی این قضاوت کیفی و ذهنی را انجام می‌دهد.',
      slideTitle: 'What are the objective measures of success for this project iteration?',
      promptHint: 'معیارهای عینی و سنجش‌پذیر موفقیت تجاری را برای این تکرار پروژه مشخص کنید و بین شاخص‌های کمّی و ارزیابی‌های کیفی تفکیک قائل شوید.',
      templateBtn: 'درج قالب استاندارد معیارها',
      exampleBtn: 'پر کردن با نمونه موردی بانکداری خرد',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      prevPageBtn: 'صفحه قبل: در این تکرار چه مسئله‌ای را با هوش مصنوعی حل می‌کنید؟',
      nextPageBtn: 'صفحه بعد: تحلیل هزینه-فایده و بودجه (اسلاید ۱۴)',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای معیارهای موفقیت کسب‌وکار:',
      tip1: 'معیارهای کسب‌وکار، معیارهای فنی هوش مصنوعی (مانند دقت یا F1-score) نیستند؛ بلکه باید ارزش ملموس سازمانی (ریال، زمان، رضایت) را بازتاب دهند.',
      tip2: 'معیارهای عینی باید دارای هدف کمّی مشخص و افق زمانی باشند (مانند کاهش ۱۲ درصدی ریزش ظرف ۶ ماه).',
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
    const exampleEn = `Business Success Criteria: Retail Banking Churn Iteration (Sprint 1)

1. Objective (Quantitative) Measures of Success:
- Attrition Rate Reduction: Reduce monthly customer defection among high-value checking accounts from the current 1.2% baseline to <=1.0% (a net 15% reduction in churn rate).
- Financial Impact: Retain an estimated $1.85M in core deposits over the first 6 months across pilot branches.
- Campaign Conversion: Proactive retention outreach based on AI alerts achieves >=12% retention save rate (compared to current passive <5% recovery rate).
- Timeliness & SLA: High-risk customer predictions delivered to branch CRM systems every Monday morning prior to 08:00 AM with <2 seconds dashboard load latency.

2. Subjective (Qualitative) Measures of Success:
- Decision Support Utility: Branch relationship managers report that the top-3 explanatory churn drivers provided for each flagged customer provide actionable context during consultation calls.
- Designated Evaluator: Regional Branch Operations Director, assessed via a bi-weekly qualitative review panel.

3. Minimum Acceptable Gate Threshold:
- If churn reduction is <8% after 90 days, the iteration triggers a CPMAI Phase III data refinement cycle before wider network rollout.`;

    const exampleFa = `معیارهای موفقیت کسب‌وکار: تکرار پیش‌بینی ریزش مشتریان بانکداری خرد (اسپرینت ۱)

۱. معیارهای عینی و کمّی موفقیت برای این تکرار (Objective Measures):
- نرخ کاهش ریزش مشتریان: کاهش نرخ ریزش ماهانه حساب‌های جاری باارزش از خط مبنای ۱.۲٪ فعلی به کمتر از ۱.۰٪ (معادل کاهش خالص ۱۵ درصدی در نرخ خروج).
- ارزش مالی محافظت‌شده: حفظ حداقل ۱.۸۵ میلیارد تومان از منابع پایدار سپرده‌های خرد ظرف ۶ ماه اول در شعب پایلوت.
- نرخ اثربخشی تماس‌های نگهداشت: دستیابی به حداقل ۱۲٪ ماندگاری مشتریان پس از تماس فعالانه کارشناسان (در مقایسه با نرخ زیر ۵٪ در فرآیند منفعل فعلی).
- دسترس‌پذیری عملیاتی: تزریق خودکار کارت امتیازی مشتریان پرریسک به سامانه CRM شعب در صبح هر شنبه پیش از ساعت ۸:۰۰ صبح با تاخیر نمایش کمتر از ۲ ثانیه.

۲. معیارهای کیفی و ذهنی موفقیت (Subjective Criteria):
- مطلوبیت تصمیم‌یاری: کارشناسان و روسای شعب اعلام کنند که سه دلیل اصلی ارائه شده برای ریسک ریزش هر مشتری در مکالمه تلفنی واقعاً کارآمد و قابل‌استفاده است.
- مرجع قضاوت کیفی: مدیر امور شعب منطقه و رئیس اداره نگهداری مشتریان، ارزیابی‌شده در جلسه بازنگری دوهفته‌یک‌بار.

۳. آستانه پذیرش حداقلی برای پیشروی:
- در صورتی که کاهش ریزش پس از ۹۰ روز به کمتر از ۸٪ برسد، طبق متدولوژی CPMAI تیم به فاز ۳ (آماده‌سازی داده‌ها) بازمی‌گردد تا متغیرهای رفتاری جدیدی اضافه شوند.`;

    onChangeContent(lang === 'fa' ? exampleFa : exampleEn);
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
