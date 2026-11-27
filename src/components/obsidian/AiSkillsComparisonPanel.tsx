import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../../types/cpmai';

interface AiSkillsComparisonPanelProps {
  lang: Language;
  onBackToLesson: () => void;
}

/**
 * Calm, semantic Concept Comparison view (Figma Frame 15:96) for AI Skills:
 * Preserves 100% of real Prompt vs. SKILL.md vs. MCP educational content and comparison matrix.
 */
export const AiSkillsComparisonPanel: React.FC<AiSkillsComparisonPanelProps> = ({
  lang,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';

  return (
    <article className="space-y-8" data-testid="ai-skills-comparison-view">
      <div className="space-y-2.5 pb-5 border-b border-[var(--cpai-border)]">
        <div className="text-xs text-[var(--cpai-muted)]">
          {isFa ? 'مرجع مقایسه مفاهیم · Prompt، Skill و MCP' : 'Concept Comparison · Prompt, Skill & MCP'}
        </div>
        <h3 className="cpai-lesson-title">
          {isFa
            ? 'تفاوت دقیق بین Prompt، Skill و پروتکل MCP چیست؟'
            : 'The Exact Difference Between a Prompt, a Skill, and MCP'}
        </h3>
        <p className="cpai-lesson-lead">
          {isFa
            ? 'یکی از رایج‌ترین سردرگمی‌ها در کار با هوش مصنوعی، اشتباه گرفتن پرامپت (Prompt)، اسکیل (Skill) و پروتکل MCP است. با این مرزبندی ملموس سازمانی، نقش هر سه را دقیق تفکیک کنید:'
            : 'Keep the exact boundary clear between an ad-hoc Prompt, a reusable Skill (SKILL.md), and the Model Context Protocol (MCP).'}
        </p>
      </div>

      {/* Three Clean Flat Concept Columns (Zero gradients, zero badge sandwiches) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-2.5">
          <div className="text-xs text-[var(--cpai-muted)]">۱ · دستور لحظه‌ای</div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            پرامپت (<bdi dir="ltr">Prompt</bdi>)
          </h4>
          <p className="text-sm font-medium text-[var(--cpai-primary-strong)]">
            «چه کاری را همین الان انجام بده؟»
          </p>
          <p className="text-[15px] font-normal text-[var(--cpai-text)] leading-[1.75]">
            مثل توضیح شفاهی یک تسک به کارمند در همان لحظه است: «این متن جلسه امروز را خلاصه کن». اگر فردا چت جدیدی باز کنید، هوش مصنوعی تمام نکات و قالب دلخواه شما را فراموش کرده است.
          </p>
        </div>

        <div className="p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-primary)] space-y-2.5">
          <div className="text-xs font-medium text-[var(--cpai-primary-strong)]">
            ۲ · مغز و روش انجام کار (استاندارد اصلی)
          </div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            اسکیل (<bdi dir="ltr">SKILL.md</bdi>)
          </h4>
          <p className="text-sm font-medium text-[var(--cpai-primary-strong)]">
            «چگونه و با چه استانداردی کار را انجام بده؟»
          </p>
          <p className="text-[15px] font-normal text-[var(--cpai-text)] leading-[1.75]">
            مثل دفترچه شرح وظایف و آیین‌نامه استاندارد (SOP) است که یک‌بار در فایل <code dir="ltr" className="font-mono text-sm">SKILL.md</code> می‌نویسید. هوش مصنوعی فقط وقتی که موضوع مرتبط باشد به‌صورت خودکار آن را باز می‌کند و همیشه با کیفیت و قالب ثابت کار را تحویل می‌دهد.
          </p>
        </div>

        <div className="p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-2.5">
          <div className="text-xs text-[var(--cpai-muted)]">۳ · دسترسی و ابزار</div>
          <h4 className="text-base font-semibold text-[var(--cpai-text)]">
            پروتکل <bdi dir="ltr">MCP</bdi>
          </h4>
          <p className="text-sm font-medium text-[var(--cpai-primary-strong)]">
            «به چه داده‌ها و نرم‌افزارهایی دسترسی داری؟»
          </p>
          <p className="text-[15px] font-normal text-[var(--cpai-text)] leading-[1.75]">
            مثل کابل شبکه و کارت تردد کارمند به نرم‌افزارهای بیرونی (Google Drive، Gmail، تقویم، دیتابیس یا پوشه Obsidian) است. MCP خودش نمی‌داند چطور گزارش بنویسد؛ فقط دسترسی خواندن و نوشتن می‌دهد.
          </p>
        </div>
      </div>

      {/* Semantic Comparison Table with Safe Mobile Scroll Wrapper */}
      <div className="space-y-3">
        <h4 className="text-base font-semibold text-[var(--cpai-text)]">
          {isFa ? 'جدول مقایسه ویژگی‌های کلیدی' : 'Key Capabilities Comparison'}
        </h4>
        <div className="overflow-x-auto rounded-[var(--cpai-radius)] border border-[var(--cpai-border)]">
          <table className="w-full min-w-[540px] text-start border-collapse text-[14.5px]">
            <thead>
              <tr className="bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] text-[var(--cpai-text)]">
                <th scope="col" className="px-4 py-3.5 font-semibold text-start">
                  ویژگی کلیدی
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-start">
                  پرامپت معمولی (<bdi dir="ltr">Prompt</bdi>)
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-start text-[var(--cpai-primary-strong)] bg-[var(--cpai-primary-soft)]">
                  اسکیل استاندارد (<bdi dir="ltr">SKILL.md</bdi>)
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-start">
                  پروتکل اتصال (<bdi dir="ltr">MCP</bdi>)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--cpai-border)] text-[var(--cpai-text)]">
              <tr>
                <th scope="row" className="px-4 py-3.5 font-medium text-start">
                  ماندگاری در حافظه
                </th>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  موقت (محدود به همان یک چت)
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--cpai-success-text)] bg-[var(--cpai-primary-soft)]/40">
                  دائمی و قابل استفاده در تمام چت‌ها
                </td>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  دائمی (در سطح اتصال به سرویس)
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3.5 font-medium text-start">
                  مصرف توکن و حافظه (<bdi dir="ltr">Context</bdi>)
                </th>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  در صورت کپی مداوم، حافظه چت را پر می‌کند
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--cpai-success-text)] bg-[var(--cpai-primary-soft)]/40">
                  بهینه (فقط هنگام نیاز فراخوانی می‌شود)
                </td>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  فقط هنگام فراخوانی ابزار
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3.5 font-medium text-start">
                  نیاز به دانش فنی
                </th>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  صفر (متن ساده)
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--cpai-success-text)] bg-[var(--cpai-primary-soft)]/40">
                  صفر (یک فایل متنی ساده <bdi dir="ltr">SKILL.md</bdi>)
                </td>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  متوسط (نیازمند تنظیم کانکتور یا JSON)
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3.5 font-medium text-start">
                  قابلیت انتقال بین پلتفرم‌ها
                </th>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  کپی-پیست دستی
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--cpai-success-text)] bg-[var(--cpai-primary-soft)]/40">
                  استاندارد جهانی در <bdi dir="ltr">Claude, ChatGPT, Codex, Gemini</bdi>
                </td>
                <td className="px-4 py-3.5 font-normal text-[var(--cpai-muted)]">
                  پشتیبانی در کلاینت‌های سازگار با MCP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--cpai-border)] flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={onBackToLesson}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] hover:text-[var(--cpai-primary-strong)] transition-colors"
        >
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
          <span>{isFa ? 'بازگشت به مطالعه گام‌ها' : 'Back to lesson steps'}</span>
        </button>
      </div>
    </article>
  );
};
