import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { IndustryTrackId } from '../types/industryTrack';
import { ArrowLeft, ArrowRight, Lightbulb, FileText, Check, Copy, RotateCcw } from 'lucide-react';

interface Page2Props {
  lang: Language;
  industryTrack?: IndustryTrackId;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage1: () => void;
  onGoToPage3?: () => void;
}

export const Page2ProblemIteration: React.FC<Page2Props> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  content,
  onChangeContent,
  onGoToPage1,
  onGoToPage3
}) => {
  const [copied, setCopied] = useState(false);
  const isPetro = industryTrack === 'ENERGY_PETRO';

  const t = {
    en: {
      badge: `CPMAI Phase I · Page 2 of 5 (${isPetro ? 'Oil & Gas Petrochemical Track' : 'Civil Megaproject Track'})`,
      slideTitle: 'What problem are you solving with AI in this iteration?',
      promptHint: 'Write your complete problem definition for this iteration. Address the business friction, why traditional software fails, current vs future state, and scope boundaries.',
      templateBtn: 'Insert CPMAI Template',
      exampleBtn: isPetro ? 'Fill Refinery Fouling Case Study' : 'Fill Urban Metro TBM Case Study',
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
      badge: `فاز اول CPMAI · صفحه ۲ از ۵ (${isPetro ? 'حوزه تخصصی نفت و گاز' : 'حوزه تخصصی مگاپروژه‌های عمرانی'})`,
      slideTitle: 'What problem are you solving with AI in this iteration?',
      promptHint: 'تعریف دقیق مسئله در این تکرار (اسپرینت) را بنویسید: چه اصطکاکی در کسب‌وکار رخ می‌دهد؟ چرا نرم‌افزار سنتی پاسخگو نیست؟ وضعیت فعلی در برابر مطلوب چیست و مرزهای این تکرار کجاست؟',
      templateBtn: 'درج قالب استاندارد CPMAI',
      exampleBtn: isPetro ? 'پر کردن با نمونه پالایشگاهی (رسوب مبدل‌ها)' : 'پر کردن با نمونه مگاپروژه احداث خط مترو (TBM)',
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
    const exampleEnCivil = `Iteration Problem Definition: Urban Metro TBM Ground Subsidence Prediction

1. Business Problem:
Mechanized tunneling (TBM) beneath dense urban sectors poses severe risks of unexpected surface ground settlement, causing structural cracking in heritage buildings and ruptures in municipal gas mains. Contractor delays and damage claims under Circular 4311 (Clause 30) currently exceed $1.8M per incident.

2. Why AI?
Soil-structure interaction in heterogeneous alluvial layers is highly non-linear. Static geotechnical formulas and empirical Peck curves fail to account for dynamic cutterhead speed, foam injection rates, and face pressure fluctuations. A temporal deep learning model (Bi-LSTM / PINN) is required to learn complex relationships across high-frequency machine telemetry and ground monitoring sensors.

3. Current State vs. Desired Future State:
- Current State: Reactive daily surveyor pin readings taken after subsidence has already occurred. Emergency stops halt excavation for 14+ days.
- Future State in this Sprint: 48-hour proactive settlement forecasting ahead of the TBM drive with alerts embedded in the engineering supervision dashboard, maintaining settlement under the 2mm threshold.

4. Iteration Scoping (Sprint 1):
- IN-SCOPE: Section 1 of Metro Line 10 (4.2 km drive, alluvial sand/gravel stratum) using real-time TBM #1 telemetry and borehole inclinometers.
- OUT-OF-SCOPE: Station deep excavation shoring and segmental lining crack vision analysis (deferred to Sprints 2 & 3).`;

    const exampleFaCivil = `تعریف مسئله این تکرار: پیش‌بینی نشست سطحی زمین در حفاری مکانیزه مترو (TBM)

۱. صورت مسئله کسب‌وکار:
حفاری مکانیزه تونل مترو در زیر بافت مسکونی و متراکم شهری، با خطر فرونشست ناگهانی زمین و شکست خطوط گاز و آب مواجه است. توقف‌های اضطراری کارگاه و ادعای تاخیرات مجاز پیمانکار بر اساس ماده ۳۰ نشریه ۴۳۱۱ (شرایط عمومی پیمان) خسارت سنگین زمانی و ریالی به پروژه تحمیل می‌کند.

۲. چرا هوش مصنوعی؟
رفتار ژئوتکنیکی آبرفت‌های ناهمگن شهری در برابر چرخش کله‌حفار و فشار پیشانی کاملاً غیرخطی است. فرمول‌های استاتیک خاک و منحنی‌های تجربی پک (Peck) قادر به تطبیق با نوسانات دبی تزریق فوم، گشتاور و فشار هیدرولیکی نیستند. یک مدل یادگیری عمیق زمانی (Bi-LSTM) برای کشف زودهنگام همبستگی‌های پنهان تلمتری دستگاه با نرخ فرونشست مورد نیاز است.

۳. وضعیت فعلی در برابر وضعیت مطلوب در این تکرار:
- وضعیت فعلی: قرائت دستی روزانه پین‌های نقشه‌برداری که پس از وقوع فرونشست متوجه آسیب می‌شوند و کارگاه را ۲ هفته متوقف می‌کنند.
- وضعیت مطلوب در این اسپرینت: پیش‌بینی ۴۸ ساعته پروفیل نشست با خطای کمتر از ۲ میلی‌متر و ارسال هشدار خودکار به اتاق هدایت TBM جهت بازتنظیم پارامترهای پیشانی قبل از عبور از زیر لوله‌های گاز.

۴. مرزبندی محدوده این تکرار (اسپرینت ۱):
- درون محدوده (In-Scope): قطعه اول تونل خط ۱۰ به طول ۴.۲ کیلومتر در لایه آبرفتی با تلمتری لحظه‌ای دستگاه TBM شماره ۱ و داده‌های گمانه‌های مانیتورینگ.
- خارج از محدوده (Out-of-Scope): پایش تصویری ترک‌خوردگی سگمنت‌ها و دیوارهای سازه نگهبان ایستگاه‌ها (موکول به اسپرینت‌های ۲ و ۳).`;

    const exampleEnPetro = `Iteration Problem Definition: Crude Preheat Train Fouling & Flaring Mitigation

1. Business Problem:
Severe thermal fouling and asphaltene deposition in atmospheric crude distillation preheat exchangers forces furnace firing increases, causing unplanned throughput cuts and emergency flaring events totaling over $3.2M in annual profit losses.

2. Why AI?
Crude blending variances (API gravity, sulfur, salt, and heavy metals) interact dynamically with skin temperatures. First-principles heat transfer equations cannot model non-linear fouling kinetics under fluctuating throughput without manual lab recalibration. A machine learning model is required to estimate continuous fouling resistance (Rf) in real-time.

3. Current State vs. Desired Future State:
- Current State: Run-to-failure or reactive cleaning triggered after furnace limits are reached, resulting in emergency shutdowns and heavy flaring.
- Future State in this Sprint: 60-day predictive trajectory of heat transfer coefficient (U-value) degradation, enabling scheduled bypass descaling without plant trips and saving $1.4M in furnace fuel.

4. Iteration Scoping (Sprint 1):
- IN-SCOPE: CDU Train-A heat exchangers (E-101 through E-108) with 5-second DCS historian telemetry and daily crude laboratory assays.
- OUT-OF-SCOPE: Vacuum distillation columns, flare gas recovery compressor modeling, and automated valve setpoint actuation (deferred to Sprints 2 & 3).`;

    const exampleFaPetro = `تعریف مسئله این تکرار: پیش‌بینی رسوب‌گرفتگی مبدل‌های پیش‌گرمایش و کاهش مشعل‌سوزی پالایشگاه

۱. صورت مسئله کسب‌وکار:
رسوب تدریجی و کک‌گرفتگی (Fouling) در مبدل‌های حرارتی واحد تقطیر اتمسفری، دمای ورودی به کوره را کاهش داده و مصرف سوخت و انتشار کربن را بالا می‌برد. افت شدید راندمان حرارتی منجر به شات‌دان ناخواسته و مشعل‌سوزی (Flaring) اضطراری با زیان سالانه بیش از ۳ میلیون دلار می‌شود.

۲. چرا هوش مصنوعی؟
تغییرات مداوم در کیفیت خوراک ورودی (گرانروی API، درصد آسفالتین و نمک) با دمای پوسته لوله‌ها برهم‌کنش پیچیده دارد. معادلات صلب ترمودینامیکی بدون آزمایش‌های آزمایشگاهی روزانه قادر به محاسبه بلادرنگ نرخ تشکیل رسوب نیستند. مدل یادگیری ماشین هیبریدی (XGBoost ترکیب‌شده با سینتیک رسوب) برای برآورد مقاومت رسوب (Rf) بر پایه داده‌های سنسوری DCS ضروری است.

۳. وضعیت فعلی در برابر وضعیت مطلوب در این تکرار:
- وضعیت فعلی: کارکرد تا مرز توقف (Run-to-failure) و شستشوی اضطراری با توقف چندروزه واحد و سوزاندن گازهای باارزش در مشعل.
- وضعیت مطلوب در این اسپرینت: پیش‌بینی ۶۰ روزه افت ضریب انتقال حرارت (U-value) و تعیین زمان بهینه تمیزکاری مبدل‌ها بدون توقف خط تولید، با صرفه‌جویی ۱.۴ میلیون دلاری در سوخت کوره.

۴. مرزبندی محدوده این تکرار (اسپرینت ۱):
- درون محدوده (In-Scope): قطار مبدل‌های پیش‌گرمایش واحد تقطیر اتمسفری (E-101 تا E-108) با تلمتری ۵ ثانیه‌ای سیستم DCS و نتایج آزمایشگاه نفت خام.
- خارج از محدوده (Out-of-Scope): ستون‌های تقطیر در خلاء، کمپرسورهای بازیافت گاز فلر و کنترل خودکار شیرهای برقی (موکول به اسپرینت‌های ۲ و ۳).`;

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
