import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { ArrowLeft, ArrowRight, Lightbulb, FileText, Check, Copy, RotateCcw } from 'lucide-react';

interface Page2Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage1: () => void;
  onGoToPage3?: () => void;
}

export const Page2ProblemIteration: React.FC<Page2Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage1,
  onGoToPage3
}) => {
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 2 of 5 (Slide 12)',
      slideTitle: 'What problem are you solving with AI in this iteration?',
      promptHint: 'Write your complete problem definition for this iteration. Address the business friction, why traditional software fails, current vs future state, and scope boundaries.',
      templateBtn: 'Insert CPMAI Template',
      exampleBtn: 'Fill Retail Banking Churn Example',
      clearBtn: 'Clear Canvas',
      copyBtn: 'Copy Canvas',
      copiedToast: 'Copied to clipboard!',
      wordCount: 'words',
      charCount: 'characters',
      prevPageBtn: 'Previous Page: CPMAI Phase I Overview',
      tipsTitle: 'Key CPMAI Guidance for this Page:',
      tip1: 'Be specific to THIS iteration (sprint) — avoid boiling the ocean.',
      tip2: 'Explain why rule-based programming or static SQL cannot solve this (Why cognitive?).',
      tip3: 'Clarify current human/manual friction versus desired future AI-augmented state.',
      tip4: 'Explicitly define what is IN-SCOPE versus deferred to future iterations.'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۲ از ۵ (اسلاید ۱۲ کتاب کار)',
      slideTitle: 'What problem are you solving with AI in this iteration?',
      promptHint: 'تعریف دقیق مسئله در این تکرار (اسپرینت) را بنویسید: چه اصطکاکی در کسب‌وکار رخ می‌دهد؟ چرا نرم‌افزار سنتی پاسخگو نیست؟ وضعیت فعلی در برابر مطلوب چیست و مرزهای این تکرار کجاست؟',
      templateBtn: 'درج قالب استاندارد CPMAI',
      exampleBtn: 'پر کردن با نمونه موردی بانکداری خرد',
      clearBtn: 'پاک کردن بوم',
      copyBtn: 'کپی متن بوم',
      copiedToast: 'متن بوم در کلیپ‌بورد کپی شد!',
      wordCount: 'کلمه',
      charCount: 'نویسه',
      prevPageBtn: 'صفحه قبل: فاز اول CPMAI و اهداف کسب‌وکار',
      tipsTitle: 'راهنمای کلیدی متدولوژی CPMAI برای این صفحه:',
      tip1: 'مسئله را دقیقاً برای همین تکرار (اسپرینت جاری) محدود کنید — کل سازمان را هدف نگیرید.',
      tip2: 'تبیین کنید چرا برنامه‌نویسی سنتی یا قوانین شرطی ساده قادر به حل آن نیستند (چرا هوش مصنوعی؟).',
      tip3: 'تفاوت فرآیند دستی فعلی با وضعیت مطلوب پس از استقرار هوش مصنوعی را شفاف کنید.',
      tip4: 'موارد درون محدوده این تکرار (In-Scope) و موارد موکول‌شده به آینده (Out-of-Scope) را تفکیک کنید.'
    }
  }[lang];

  const handleInsertTemplate = () => {
    const templateEn = `1. Business Problem Statement:
[Describe the specific business friction, bottleneck, or financial loss occurring in the organization]

2. Why AI (Cognitive vs. Traditional Programming):
[Explain why static If-Then business rules or database queries fail to capture the complex, probabilistic patterns]

3. Current State:
- How it is handled today: [Manual review, heuristic rules, or ignored]
- Cost / Time / Error rate today: [e.g. 14 days delay, high customer churn rate]

4. Desired Future State (in this iteration):
- Expected outcome: [e.g. Early predictive score 30 days prior to churn with top factors]
- Operational integration: [e.g. Embedded alert in relationship manager CRM dashboard]

5. Iteration Scoping:
- IN-SCOPE for this sprint: [e.g. High-value retail checking accounts, transaction history data]
- OUT-OF-SCOPE (Deferred to future sprints): [e.g. Corporate accounts, automated offer dispatch, chatbot interaction]`;

    const templateFa = `۱. صورت مسئله کسب‌وکار (Business Problem Statement):
[توصیف دقیق مشکل، اصطکاک عملیاتی یا هزینه‌ای که در فرآیند فعلی سازمان رخ می‌دهد]

۲. چرا هوش مصنوعی؟ (تفاوت سیستم شناختی با برنامه‌نویسی سنتی):
[توضیح دهید چرا کدهای شرطی معمولی (If-Then) یا گزارش‌های دیتابیس قادر به کشف الگوهای پیچیده و چندمتغیره نیستند]

۳. وضعیت فعلی (Current State):
- نحوه مدیریت فعلی: [فرآیند دستی، حدس و گمان یا اقدام دیرهنگام]
- هزینه و زمان فعلی: [مثلاً تاخیر ۲ هفته‌ای، خروج ۱.۲٪ مشتریان در ماه بدون اطلاع قبلی]

۴. وضعیت مطلوب با هوش مصنوعی در این تکرار (Desired Future State):
- خروجی مورد انتظار: [مثلاً کارت امتیازی ریسک با پیش‌بینی ۳۰ روزه قبل از خروج مشتری]
- نحوه استفاده عملیاتی: [مثلاً نمایش در داشبورد CRM کارشناسان شعبه]

۵. مرزبندی محدوده این تکرار (Iteration Scoping):
- درون محدوده این اسپرینت (In-Scope): [مثلاً صرفاً حساب‌های جاری مشتریان حقیقی با موجودی بالای ۱۰ میلیون تومان]
- خارج از محدوده (Out-of-Scope - موکول به آینده): [مثلاً حساب‌های شرکتی، ارسال خودکار پیامک، بازاریابی هوشمند]`;

    onChangeContent(lang === 'fa' ? templateFa : templateEn);
  };

  const handleInsertExample = () => {
    const exampleEn = `Iteration Problem Definition: Retail Banking High-Value Churn Prediction

1. Business Problem:
The bank experiences a monthly 1.2% attrition rate among high-value retail deposit holders migrating to digital neo-banks. Currently, branch managers receive no warning until an account cancellation request is formally filed.

2. Why AI?
Customer defection is driven by subtle, multi-variable behavior shifts (reduced app logins, gradual transaction drops, bill-pay diversion, customer service friction). Traditional static If-Then thresholds only trigger when balances have already dropped to zero, when it is too late to retain the customer. A probabilistic predictive classification model is required to spot early warning patterns across 24 months of multi-channel data.

3. Current State vs. Desired Future State:
- Current: Passive and reactive. Customer calls after closing the account. Retention save rate <5%.
- Future State in this Sprint: Proactive prediction flagging at-risk accounts 30 days prior to departure, delivering a prioritized list of top churn drivers to relationship managers with an anticipated 12% churn reduction.

4. Iteration Scoping (Sprint 1):
- IN-SCOPE: Individual retail checking accounts with balances > $10,000 using 24-month historical transaction and digital channel data.
- OUT-OF-SCOPE: Commercial/business accounts, automated retention incentive bots, and call-center audio sentiment (deferred to Sprint 2 and 3).`;

    const exampleFa = `تعریف مسئله این تکرار: پیش‌بینی ریزش مشتریان ارزشمند بانکداری خرد

۱. صورت مسئله کسب‌وکار:
بانک ماهانه ۱.۲٪ از مشتریان سپرده‌گذار باارزش خود را به دلیل مهاجرت به نئوبانک‌های دیجیتال از دست می‌دهد. در حال حاضر، شعب هیچ دیدگاهی نسبت به کاهش تعامل مشتریان ندارند تا زمانی که مشتری درخواست بستن حساب را ثبت می‌کند.

۲. چرا هوش مصنوعی؟
رفتار ترک مشتری ترکیبی چندمتغیره از نشانه‌های رفتاری ظریف است (کاهش تدریجی دفعات ورود به همراه بانک، افت تراکنش‌های کارت، جابه‌جایی پرداخت قبوض و نارضایتی در تیکت‌ها). قوانین سنتی شرطی (If-Then) تنها زمانی فعال می‌شوند که موجودی حساب صفر شده باشد که برای حفظ مشتری دیر است. یک الگوی طبقه‌بندی احتمالاتی (تحلیل پیش‌بینانه) برای کشف زودهنگام این الگو در تاریخچه ۲۴ ماهه مورد نیاز است.

۳. وضعیت فعلی در برابر وضعیت مطلوب در این تکرار:
- وضعیت فعلی: اقدام منفعلانه و دیرهنگام پس از ثبت انصراف، با نرخ ماندگاری زیر ۵٪.
- وضعیت مطلوب در این اسپرینت: پیش‌بینی خودکار هفتگی که ۳۰ روز قبل از خروج، هشدارهای حساب‌های پرریسک را همراه با ۳ علت اصلی به داشبورد CRM شعبه تزریق می‌کند تا نرخ ماندگاری ۱۲٪ افزایش یابد.

۴. مرزبندی محدوده این تکرار (اسپرینت ۱):
- درون محدوده (In-Scope): مشتریان حقیقی حساب جاری با موجودی بالای ۱۰ میلیون تومان بر اساس داده‌های ۲۴ ماهه تراکنش‌ها و درگاه‌های دیجیتال.
- خارج از محدوده (Out-of-Scope): حساب‌های حقوقی و تجاری، ربات‌های ارسال خودکار پیامک و تحلیل صوت مکالمات مرکز تماس (موکول به اسپرینت‌های ۲ و ۳).`;

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
      {/* Top Banner Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9dad5] dark:border-[#2d3942] pb-4">
        <div>
          <span className="text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
            {t.badge}
          </span>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
            {t.promptHint}
          </p>
        </div>

        {/* Action Toolbar */}
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

      {/* Slide Container (Authentic replica of Image 2) */}
      <div className="rounded-xl border border-[#0a7b97] dark:border-[#0a7b97]/80 overflow-hidden shadow-sm bg-[#ffffff] dark:bg-[#16202a]">
        {/* Teal Header Bar (Verbatim Image 2 Header) */}
        <div className="bg-[#00738c] px-6 py-3.5 text-white flex items-center justify-between select-none">
          <h2 className="font-semibold text-base sm:text-lg tracking-normal font-sans" dir="ltr">
            {t.slideTitle}
          </h2>
          <span className="text-[11px] font-mono opacity-80 px-2 py-0.5 rounded bg-black/20">
            CPMAI Workbook
          </span>
        </div>

        {/* Large Lavender-Blue Workspace Canvas Box (Matching Image 2) */}
        <div className="p-4 sm:p-6 bg-[#e6edfa] dark:bg-[#152335] min-h-[540px] sm:min-h-[620px] flex flex-col relative transition-colors">
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder={
              lang === 'fa'
                ? 'پاسخ و تحلیل خود را برای این تکرار اینجا بنویسید...\n\nبرای شروع می‌توانید از دکمه‌های «درج قالب استاندارد CPMAI» یا «پر کردن با نمونه موردی» در بالا استفاده کنید.'
                : 'Write your problem definition and iteration solution here...\n\nYou can also click "Insert CPMAI Template" or "Fill Retail Banking Churn Example" above to get started.'
            }
            className="flex-1 w-full p-4 sm:p-5 rounded-lg bg-[#ffffff]/90 dark:bg-[#1a293d]/90 text-[#1c2830] dark:text-[#e8ebe9] border border-[#d2def2] dark:border-[#2d3f56] focus:border-[#00738c] focus:outline-none resize-y text-sm sm:text-[15px] leading-relaxed font-sans shadow-inner min-h-[460px]"
          />

          {/* Footer Bar of Canvas */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-1">
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>{words} {t.wordCount}</span>
              <span>·</span>
              <span>{chars} {t.charCount}</span>
            </div>

            {/* Corner Geometric Triangles (Watermark replica from Image 2) */}
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

      {/* Navigation Toolbar between Pages */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onGoToPage1}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه ۱: درک کسب‌وکار' : 'Page 1: Overview'}</span>
        </button>

        {onGoToPage3 && (
          <button
            type="button"
            onClick={onGoToPage3}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#00738c] text-white hover:bg-[#005f73] transition-colors shadow-xs"
          >
            <span>{lang === 'fa' ? 'صفحه ۳: معیارهای موفقیت کسب‌وکار' : 'Page 3: Success Criteria'}</span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
