import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookCheck,
  Building2,
  Check,
  CheckCircle2,
  Code,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Factory,
  FolderKanban,
  Globe,
  Landmark,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Scale,
  Terminal,
  Train,
  Users
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import { IndustryTrackId } from '../../types/industryTrack';
import { EngineeringDataset } from '../../data/engineering_sample_datasets';
import { PayaHoldingArtifactSimulator } from '../PayaHoldingArtifactSimulator';
import { FocusedModuleDeck, FocusedModuleDeckStep } from '../learning/FocusedModuleDeck';
import { DiagramWrapper, RctoFrameworkDiagram } from '../visuals/EngineeringVisualDiagrams';

export interface Session2PromptItem {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  promptFa: string;
  promptEn: string;
  targetTools: string[];
}

export interface Session2RctoPillarExample {
  roleFa: string;
  roleEn: string;
  contextFa: string;
  contextEn: string;
  taskFa: string;
  taskEn: string;
  outputFa: string;
  outputEn: string;
}

export interface Session2OtherLlmPlatform {
  id: 'deepseek' | 'qwen' | 'perplexity' | 'grok' | 'mistral' | 'meta_llama';
  name: string;
  company: string;
  url: string;
  domainLabel: string;
  badgeFa: string;
  badgeEn: string;
  descFa: string;
  descEn: string;
  modelsFa: string;
  modelsEn: string;
  accentHex: string;
  bgTintClass: string;
}

export interface Session2DisciplineMeta {
  titleFa: string;
  titleEn: string;
  shortTitleFa: string;
  shortTitleEn: string;
  governingStandardsFa: string[];
  governingStandardsEn: string[];
}

export interface Session2DisciplinePromptPair {
  weakPromptFa: string;
  weakPromptEn: string;
  weakCritiqueFa: string;
  weakCritiqueEn: string;
  engineeredPromptFa: string;
  engineeredPromptEn: string;
  engineeredBreakdownFa: {
    role: string;
    context: string;
    task: string;
    output: string;
  };
  engineeredBreakdownEn: {
    role: string;
    context: string;
    task: string;
    output: string;
  };
}

/* ============================================================================
   MODULE 2-1: WHAT IS A PROMPT?
   ============================================================================ */

interface Session2PromptDefinitionProps {
  lang: Language;
  loadPromptToSandbox: (prompt: string) => void;
  onGoToRcto: () => void;
}

export const Session2PromptDefinitionModule: React.FC<Session2PromptDefinitionProps> = ({
  lang,
  loadPromptToSandbox,
  onGoToRcto
}) => {
  const isFa = lang === 'fa';

  const samplePrompt = isFa
    ? 'نقش: تو یک دستیار تحلیلگر حرفه‌ای هستی.\nزمینه: داده‌های خام جلسه یا گزارش زیر در اختیار توست.\nوظیفه: فقط بر اساس متن داده‌شده، ۳ نکته کلیدی و جدول اکشن‌آیتم‌ها را استخراج کن. اگر اطلاعاتی در متن نیست، حدس نزن و بنویس «نامشخص».\nقالب خروجی: جدول ۴ ستونه [موضوع | مسئول | مهلت | اولویت].'
    : 'Role: Senior analyst.\nContext: Raw meeting notes below.\nTask: Extract 3 takeaways and an action-item table strictly from the text; mark missing fields as "Unspecified".\nOutput: 4-column table [Topic | Owner | Due | Priority].';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's2-1-core',
      title: isFa ? 'تعریف بنیادین پرامپت و منطق درک مدل زبانی' : 'Core Definition & LLM Interpretation Logic',
      category: isFa ? 'تعریف و منطق' : 'Core Concept',
      subtitle: isFa
        ? 'چرا کیفیت ورودی شما مستقیماً تعیین‌کننده دقت و قابلیت استناد خروجی است.'
        : 'Why input clarity directly governs output accuracy and auditability.',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-2.5">
            <h4 className="text-base sm:text-lg font-extrabold text-[var(--cpai-text)] leading-snug">
              {isFa
                ? 'پرامپت یعنی «دستورالعمل، مسئله، داده و چارچوبی که به هوش مصنوعی می‌دهید» تا دقیقاً پاسخ مطلوب شما را تولید کند.'
                : 'A Prompt is the instruction, context, data, and constraints you give an AI model to shape its exact response.'}
            </h4>
            <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
              {isFa
                ? 'برخلاف جستجوی گوگل که فقط دنبال کلمات کلیدی می‌گردد، مدل زبانی بزرگ (LLM) کل نیت، نقش، داده‌های زمینه‌ای و قالب مورد انتظار شما را تحلیل می‌کند. هر جزئیاتی که ننویسید، مدل حدس می‌زند.'
                : 'Unlike keyword search, an LLM reads intent, persona, background, and output rules. Anything omitted gets guessed.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] space-y-1.5">
              <div className="text-xs font-bold text-[var(--cpai-error)]">
                {isFa ? 'ورودی خام و مبهم (۱ خطی)' : 'Raw 1-Line Vague Prompt'}
              </div>
              <p className="text-sm text-[var(--cpai-text)] leading-relaxed">
                {isFa
                  ? 'پرامپت مبهم (۱ خطی) ← پاسخ عمومی، تکراری یا همراه با حدس و خطا'
                  : 'Vague 1-line prompt -> Generic, guesswork-heavy output'}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] space-y-1.5">
              <div className="text-xs font-bold text-[var(--cpai-success-text)]">
                {isFa ? 'پرامپت مهندسی‌شده' : 'Engineered Prompt'}
              </div>
              <p className="text-sm font-semibold text-[var(--cpai-text)] leading-relaxed">
                {isFa
                  ? 'پرامپت مهندسی‌شده (دستور + زمینه + قید + قالب) ← خروجی دقیق و قابل ممیزی'
                  : 'Structured prompt (Role + Context + Task + Format) -> Actionable, auditable output'}
              </p>
            </div>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'هر جزئیاتی را که در پرامپت مشخص نکنید، مدل زبانی با حدس آماری پر می‌کند؛ شفافیت ورودی مساوی دقت خروجی است.'
        : 'Any constraint omitted from your prompt will be guessed by the LLM—clarity in means precision out.'
    },
    {
      id: 's2-1-levels',
      title: isFa ? 'سه سطح پرامپت‌نویسی: از ساده تا استاندارد سازمانی' : '3 Levels of Prompting',
      category: isFa ? 'سطوح بلوغ' : 'Prompting Levels',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--cpai-muted)]">
              <span className="font-bold">{isFa ? 'سطح ۱ · ساده' : 'Level 1 · Basic'}</span>
              <span dir="ltr" className="font-mono">Zero-Shot</span>
            </div>
            <h4 className="font-bold text-sm text-[var(--cpai-text)]">
              {isFa ? 'پرامپت مستقیم بدون نمونه' : 'Direct Zero-Shot Prompt'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
              {isFa
                ? 'یک درخواست کوتاه بدون مثال یا داده کمکی (مثلاً: «یک چک‌لیست ایمنی کارگاه بنویس»). برای پرسش‌های عمومی سریع است اما در کار سازمانی دقیق نیست.'
                : 'A direct ask without examples or background (e.g., "Write a site safety checklist"). Fast for trivia, too vague for enterprise work.'}
            </p>
          </div>

          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--cpai-primary)]">
              <span className="font-bold">{isFa ? 'سطح ۲ · الگو محور' : 'Level 2 · Pattern'}</span>
              <span dir="ltr" className="font-mono">Few-Shot</span>
            </div>
            <h4 className="font-bold text-sm text-[var(--cpai-text)]">
              {isFa ? 'پرامپت همراه با ۱ تا ۳ نمونه واقعی' : 'Few-Shot Prompting'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
              {isFa
                ? 'در کنار دستور، ۱ یا ۲ نمونه از نامه، جدول یا گزارش استاندارد سازمان خود را می‌گذارید تا هوش مصنوعی دقیقاً لحن و ساختار شما را تقلید کند.'
                : 'Provide 1-3 real examples alongside your instruction so the model mirrors your exact corporate tone and schema.'}
            </p>
          </div>

          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-primary)]/40 bg-[var(--cpai-primary-soft)] space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--cpai-primary)]">
              <span className="font-bold">{isFa ? 'سطح ۳ · استاندارد دوره' : 'Level 3 · Course Standard'}</span>
              <span dir="ltr" className="font-mono">RCTO</span>
            </div>
            <h4 className="font-bold text-sm text-[var(--cpai-text)]">
              {isFa ? 'مهندسی پرامپت ساختاریافته (RCTO)' : 'Structured Prompt Engineering'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--cpai-text)] leading-relaxed">
              {isFa
                ? 'ترکیب شفاف نقش، بافت واقعی، وظیفه دقیق، قیدهای عدم توهم («اگر نبود بنویس نامشخص») و فرمت خروجی؛ فرمولی که در بخش ۲-۲ یاد می‌گیرید.'
                : 'Combines Role, Context, Task, anti-hallucination guardrails, and exact Output schema—covered step-by-step in 2-2.'}
            </p>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'در گزارش‌های حساس و سازمانی، همیشه از سطح ۳ (RCTO + قید عدم توهم) استفاده کنید تا خروجی قابل دفاع باشد.'
        : 'For high-stakes enterprise work, always use Level 3 (RCTO + anti-hallucination guardrails).'
    },
    {
      id: 's2-1-try-and-bridge',
      title: isFa ? 'آزمایش نمونه پرامپت و ورود به فرمول طلایی RCTO' : 'Test a Sample Prompt & Bridge to RCTO',
      category: isFa ? 'تمرین فوری' : 'Quick Practice',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
            {isFa
              ? 'پیش از رفتن به فرمول چهارضلعی ۲-۲، این نمونه پرامپت ساختاریافته را مستقیماً در سندباکس تست کنید:'
              : 'Before jumping to the 4-pillar formula in 2-2, try this structured prompt directly in the sandbox:'}
          </p>

          <pre className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed border border-[var(--cpai-border)]">
            {samplePrompt}
          </pre>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => loadPromptToSandbox(samplePrompt)}
              className="px-4 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs sm:text-sm font-semibold text-[var(--cpai-text)] inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 text-[var(--cpai-primary)]" />
              <span>{isFa ? 'تست نمونه پرامپت در سندباکس' : 'Try Sample in Sandbox'}</span>
            </button>
            <button
              type="button"
              onClick={onGoToRcto}
              className="px-4 py-2.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:opacity-95 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-opacity cursor-pointer"
            >
              <span>{isFa ? 'گام بعدی ۲-۲: فرمول طلایی RCTO' : 'Next 2-2: Golden RCTO Formula'}</span>
              {isFa ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۱"
      moduleTitle={
        isFa
          ? 'پرامپت (Prompt) چیست؟ تعریف، منطق کار و تفاوت دستور خام با دستور حرفه‌ای'
          : 'What is a Prompt? Definition, Mechanics & Anatomy'
      }
      moduleSubtitle={
        isFa
          ? 'پیش از شناخت ابزارها و فرمول‌ها، باید بدانیم هوش مصنوعی چگونه دستور ما را می‌فهمد و چرا کیفیت ورودی تعیین‌کننده کیفیت خروجی است.'
          : 'Before picking tools or frameworks, understand how LLMs interpret your input and why input clarity dictates output precision.'
      }
      steps={steps}
    />
  );
};

/* ============================================================================
   MODULE 2-2: THE RCTO PROMPTING FRAMEWORK
   ============================================================================ */

interface Session2RctoPromptingProps {
  lang: Language;
  activeRctoPillars: Session2RctoPillarExample;
  discMeta: Session2DisciplineMeta;
  disciplinePromptPair: Session2DisciplinePromptPair;
  copiedId: string | null;
  copyToClipboard: (text: string, id: string) => void;
  loadPromptToSandbox: (prompt: string) => void;
}

export const Session2RctoPromptingModule: React.FC<Session2RctoPromptingProps> = ({
  lang,
  activeRctoPillars,
  discMeta,
  disciplinePromptPair,
  copiedId,
  copyToClipboard,
  loadPromptToSandbox
}) => {
  const isFa = lang === 'fa';
  const engineeredText = isFa ? disciplinePromptPair.engineeredPromptFa : disciplinePromptPair.engineeredPromptEn;

  const pillars = [
    {
      letter: 'R',
      title: isFa ? 'نقش (Role)' : 'Role',
      hint: isFa ? 'مدل چه کلاه‌داری است؟' : 'Who is the model?',
      desc: isFa
        ? 'تعیین شخصیت و سطح تخصص هوش مصنوعی. به آن بگویید در جایگاه چه کسی فکر کند.'
        : 'Assign persona and domain expertise. Tell the AI which expert shoes to step into.',
      example: isFa ? activeRctoPillars.roleFa : activeRctoPillars.roleEn
    },
    {
      letter: 'C',
      title: isFa ? 'زمینه (Context)' : 'Context',
      hint: isFa ? 'وضع موجود و پیش‌نیازها' : 'Background & Situation',
      desc: isFa
        ? 'توصیف شرکت، بازار هدف، محدودیت‌های زمانی و داده‌های ورودی. هوش مصنوعی ذهن‌خوانی بلد نیست.'
        : 'Describe organizational background, audience, and constraints. Never assume the AI knows.',
      example: isFa ? activeRctoPillars.contextFa : activeRctoPillars.contextEn
    },
    {
      letter: 'T',
      title: isFa ? 'وظیفه (Task)' : 'Task',
      hint: isFa ? 'دستور کار صریح و افعال شفاف' : 'Actionable Directive',
      desc: isFa
        ? 'دستور شفاف و قابل ارزیابی بدون ابهام. از افعال مشخص مثل «اولویت‌بندی کن»، «استخراج کن» استفاده کنید.'
        : 'Unambiguous directive with sharp action verbs: "Categorize", "Synthesize", "Prioritize".',
      example: isFa ? activeRctoPillars.taskFa : activeRctoPillars.taskEn
    },
    {
      letter: 'O',
      title: isFa ? 'قالب خروجی (Output)' : 'Output & Format',
      hint: isFa ? 'لحن، ساختار و محدودیت کلمات' : 'Structure, Tone & Style',
      desc: isFa
        ? 'مشخص کردن نوع ارائه: جدول، بولت‌پوینت، کد JSON، زبان فارسی صمیمی یا رسمی، و حد طول پاسخ.'
        : 'Format specification: Markdown table, bullet points, corporate tone, length limits.',
      example: isFa ? activeRctoPillars.outputFa : activeRctoPillars.outputEn
    }
  ];

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's2-2-diagram',
      title: isFa ? 'اینفوگرافیک ساختار چهارضلعی RCTO' : 'The 4 Pillars of RCTO Infographic',
      category: isFa ? 'نمای معماری' : 'Visual Framework',
      content: (
        <DiagramWrapper
          titleFa="اینفوگرافیک تصویری: ساختار چهارضلعی فرمول طلایی RCTO"
          titleEn="Visual Infographic: The 4 Pillars of RCTO Prompting"
          badgeFa="چارچوب استاندارد"
          lang={lang}
        >
          <RctoFrameworkDiagram lang={lang} />
        </DiagramWrapper>
      ),
      takeaway: isFa
        ? 'فرمول RCTO چهار ستون مکمل است: نقش (R)، زمینه (C)، وظیفه (T) و قالب خروجی (O).'
        : 'RCTO aligns four complementary pillars: Role, Context, Task, and Output.'
    },
    {
      id: 's2-2-pillars',
      title: isFa ? 'کالبدشکافی چهار رکن R · C · T · O برای مسیر تخصصی شما' : 'Breaking Down R · C · T · O for Your Track',
      category: isFa ? 'چهار رکن' : '4 Pillars',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.letter}
              className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[var(--cpai-primary)] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {pillar.letter}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[var(--cpai-text)]">{pillar.title}</h4>
                  <span className="text-xs text-[var(--cpai-muted)]">{pillar.hint}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">{pillar.desc}</p>
              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-xs font-mono text-[var(--cpai-primary)] leading-relaxed">
                {pillar.example}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 's2-2-comparison',
      title: isFa
        ? `مقایسه عینی: پرامپت ضعیف در برابر مهندسی‌شده (${discMeta.shortTitleFa})`
        : `Side-by-Side: Weak vs. Engineered Prompt (${discMeta.shortTitleEn})`,
      category: isFa ? 'نمونه دیسیپلین' : 'Discipline Showcase',
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-[var(--cpai-text)] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[var(--cpai-warning-text)]" />
              <span>{isFa ? `دیسیپلین شما: ${discMeta.titleFa}` : `Discipline: ${discMeta.titleEn}`}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] space-y-2.5">
              <div className="text-xs font-bold text-[var(--cpai-error)] flex items-center gap-1.5">
                <span>✕</span>
                <span>
                  {isFa
                    ? `پرامپت ضعیف و مبهم در ${discMeta.shortTitleFa}`
                    : `Weak Prompt in ${discMeta.shortTitleEn}`}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-error-border)] text-xs sm:text-sm text-[var(--cpai-text)] leading-relaxed">
                {isFa ? disciplinePromptPair.weakPromptFa : disciplinePromptPair.weakPromptEn}
              </div>
              <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                {isFa ? disciplinePromptPair.weakCritiqueFa : disciplinePromptPair.weakCritiqueEn}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--cpai-success-text)] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>
                    {isFa
                      ? `پرامپت مهندسی‌شده RCTO (${discMeta.shortTitleFa})`
                      : `Engineered RCTO Prompt (${discMeta.shortTitleEn})`}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(engineeredText, 'demo_disc_prompt')}
                  className="text-xs font-semibold text-[var(--cpai-success-text)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'demo_disc_prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-success-border)] text-xs sm:text-sm text-[var(--cpai-text)] leading-relaxed space-y-1.5">
                <div>
                  <span dir="ltr" className="inline-block me-1.5 font-bold text-[var(--cpai-primary)] font-mono">[Role]</span>
                  <span>
                    {isFa
                      ? disciplinePromptPair.engineeredBreakdownFa.role
                      : disciplinePromptPair.engineeredBreakdownEn.role}
                  </span>
                </div>
                <div>
                  <span dir="ltr" className="inline-block me-1.5 font-bold text-[var(--cpai-primary)] font-mono">[Context]</span>
                  <span>
                    {isFa
                      ? disciplinePromptPair.engineeredBreakdownFa.context
                      : disciplinePromptPair.engineeredBreakdownEn.context}
                  </span>
                </div>
                <div>
                  <span dir="ltr" className="inline-block me-1.5 font-bold text-[var(--cpai-primary)] font-mono">[Task]</span>
                  <span>
                    {isFa
                      ? disciplinePromptPair.engineeredBreakdownFa.task
                      : disciplinePromptPair.engineeredBreakdownEn.task}
                  </span>
                </div>
                <div>
                  <span dir="ltr" className="inline-block me-1.5 font-bold text-[var(--cpai-primary)] font-mono">[Output]</span>
                  <span>
                    {isFa
                      ? disciplinePromptPair.engineeredBreakdownFa.output
                      : disciplinePromptPair.engineeredBreakdownEn.output}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <p className="text-xs text-[var(--cpai-success-text)] leading-relaxed">
                  {isFa
                    ? `مزیت: مدل دقیقاً با ضوابط ${discMeta.governingStandardsFa[0]} و شاخص‌های دیسیپلین پاسخ می‌دهد.`
                    : `Advantage: The LLM complies directly with ${discMeta.governingStandardsEn[0]} and discipline KPIs.`}
                </p>
                <button
                  type="button"
                  onClick={() => loadPromptToSandbox(engineeredText)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isFa ? 'تست در سندباکس' : 'Test in Sandbox'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۲"
      moduleTitle={
        isFa
          ? 'فرمول طلایی پرامپت‌نویسی حرفه‌ای (چهارضلعی R-C-T-O)'
          : 'The Gold Standard RCTO Prompting Formula'
      }
      moduleSubtitle={
        isFa
          ? 'دیگر پرامپت‌های مبهم و کلی ننویسید. با رعایت این ۴ رکن، هوش مصنوعی دقیقاً همان خروجی مدنظر شما را تولید می‌کند.'
          : 'Stop writing vague prompts. Follow the 4 core pillars to command high-precision responses.'
      }
      steps={steps}
    />
  );
};

/* ============================================================================
   MODULE 2-3: AI GIANTS & PROMINENT GLOBAL LLMs
   ============================================================================ */

interface Session2AiToolsProps {
  lang: Language;
  otherPlatforms: Session2OtherLlmPlatform[];
  renderOtherLogo: (id: Session2OtherLlmPlatform['id']) => React.ReactNode;
  openCompanionWindow: (url: string, name: string) => void;
}

export const Session2AiToolsModule: React.FC<Session2AiToolsProps> = ({
  lang,
  otherPlatforms,
  renderOtherLogo,
  openCompanionWindow
}) => {
  const isFa = lang === 'fa';

  const bigThree = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      subtitle: `OpenAI · ${isFa ? 'همه‌فن‌حریف' : 'Versatile'}`,
      url: 'https://chatgpt.com',
      domain: 'chatgpt.com',
      accentBg: 'bg-[#10a37f] hover:bg-[#0e8e6e]',
      accentText: 'text-[#10a37f]',
      desc: isFa
        ? 'بهترین ابزار عمومی با پشتیبانی از وب‌سرچ زنده، اجرای کدهای پایتون، تحلیل پیشرفته داده‌ها، ساخت عکس و اکوسیستم وسیع افزونه‌ها (Custom GPTs).'
        : 'The most popular all-rounder with live web browsing, Python code execution, advanced data analytics, image generation, and Custom GPTs.',
      bullets: isFa
        ? [
            'مدل‌های کلیدی: GPT-4o, GPT-4o mini, o1',
            'قابلیت شاخص: تحلیل فایل اکسل و پروژه‌ها',
            'ثبت‌نام ساده با جیمیل یا مایکروسافت'
          ]
        : [
            'Key Models: GPT-4o, 4o-mini, o1',
            'Feature: Code Interpreter & Projects',
            'Easy signup with Google/Microsoft'
          ],
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-chatgpt" aria-label="ChatGPT">
          <g transform="translate(12 12)" fill="none" stroke="#10A37F" strokeWidth="1.9">
            <ellipse cy="-5.5" rx="3.6" ry="6.5" />
            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(60)" />
            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(120)" />
            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(180)" />
            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(240)" />
            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(300)" />
          </g>
        </svg>
      )
    },
    {
      id: 'claude',
      name: 'Claude',
      subtitle: `Anthropic · ${isFa ? 'نگارش و کد' : 'Writing & Code'}`,
      url: 'https://claude.ai',
      domain: 'claude.ai',
      accentBg: 'bg-[#b45309] hover:bg-[#92400e]',
      accentText: 'text-[#b45309] dark:text-[#fbbf24]',
      desc: isFa
        ? 'بهترین کیفیت درک و تولید متن فارسی طبیعی، کدنویسی، تحلیل داکیومنت‌های بزرگ و شاهکار آرتیفکت‌ها (Artifacts) برای پیش‌نمایش زنده وب و اسناد.'
        : 'Unmatched nuance, superior coding, large document comprehension, and interactive Artifacts for side-by-side previews.',
      bullets: isFa
        ? [
            'مدل‌های کلیدی: Claude 3.5 Sonnet, Haiku',
            'قابلیت شاخص: آرتیفکت‌های تعاملی و Projects',
            'پنجره ورودی ۲۰۰ هزار توکنی (یک کتاب کامل)'
          ]
        : [
            'Key Models: Claude 3.5 Sonnet, Haiku',
            'Feature: Interactive Artifacts & Projects',
            '200K token context window'
          ],
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-claude" aria-label="Claude">
          <g transform="translate(12 12)" stroke="#D97757" strokeWidth="2.4" strokeLinecap="round">
            <line y1="-3" y2="-11" />
            <line y1="-3" y2="-9" transform="rotate(30)" />
            <line y1="-3" y2="-11" transform="rotate(60)" />
            <line y1="-3" y2="-9" transform="rotate(90)" />
            <line y1="-3" y2="-11" transform="rotate(120)" />
            <line y1="-3" y2="-9" transform="rotate(150)" />
            <line y1="-3" y2="-11" transform="rotate(180)" />
            <line y1="-3" y2="-9" transform="rotate(210)" />
            <line y1="-3" y2="-11" transform="rotate(240)" />
            <line y1="-3" y2="-9" transform="rotate(270)" />
            <line y1="-3" y2="-11" transform="rotate(300)" />
            <line y1="-3" y2="-9" transform="rotate(330)" />
          </g>
        </svg>
      )
    },
    {
      id: 'gemini',
      name: 'Gemini',
      subtitle: `Google · ${isFa ? 'حافظه ۲ میلیونی' : '2M Context'}`,
      url: 'https://gemini.google.com',
      domain: 'gemini.google.com',
      accentBg: 'bg-[#1a73e8] hover:bg-[#1557b0]',
      accentText: 'text-[#1a73e8] dark:text-[#60a5fa]',
      desc: isFa
        ? 'بزرگ‌ترین کانتکست جهان (۲ میلیون توکن)، اتصال مستقیم با تایپ @ به Google Drive و Gmail و YouTube، و ساخت دستیار اختصاصی با Gems.'
        : 'Massive 2M token context, seamless Google Workspace integration (@Drive, @Gmail, @YouTube), and custom Gems.',
      bullets: isFa
        ? [
            'مدل‌های کلیدی: Gemini 1.5 Pro, 1.5 Flash',
            'قابلیت شاخص: واکشی ویدیو، صوت و گوگل‌درایو',
            'ورود مستقیم با اکانت جیمیل'
          ]
        : [
            'Key Models: Gemini 1.5 Pro, Flash',
            'Feature: Multimodal & Workspace @mentions',
            'Zero friction login with Google account'
          ],
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-gemini" aria-label="Gemini">
          <defs>
            <linearGradient id="gemGradS2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="55%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gemGradS2)"
            d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
          />
        </svg>
      )
    }
  ];

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's2-3-big3',
      title: isFa ? 'سه غول اصلی هوش مصنوعی: ChatGPT، Claude و Gemini' : 'The Big 3 Platforms: ChatGPT, Claude & Gemini',
      category: isFa ? 'پلتفرم‌های اصلی' : 'Big 3',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bigThree.map((item) => (
            <div
              key={item.id}
              className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] flex items-center justify-center shrink-0">
                    {item.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--cpai-text)]">{item.name}</h4>
                    <span className="text-xs text-[var(--cpai-muted)]">{item.subtitle}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">{item.desc}</p>

                <div className="space-y-1.5 pt-2 border-t border-[var(--cpai-border)] text-xs text-[var(--cpai-text)]">
                  {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${item.accentText} shrink-0 mt-0.5`} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--cpai-border)] space-y-2">
                <button
                  type="button"
                  onClick={() => openCompanionWindow(item.url, `${item.id}_companion`)}
                  className={`w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg ${item.accentBg} text-white text-xs font-semibold transition-colors cursor-pointer`}
                >
                  <span>{isFa ? `ورود به ${item.name} در پنجره کناری` : `Open ${item.name} in Side Window`}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className={`block text-center text-xs font-mono ${item.accentText} hover:underline`}
                >
                  {item.domain} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      ),
      takeaway: isFa
        ? 'در این دوره برای نگارش فارسی و داشبوردسازی از Claude، برای اسناد بسیار حجیم و اکوسیستم گوگل از Gemini، و برای تحلیل همه‌منظوره از ChatGPT استفاده می‌کنیم.'
        : 'Use Claude for Artifacts & nuanced writing, Gemini for 2M-token Workspace workflows, and ChatGPT for versatile daily operations.'
    },
    {
      id: 's2-3-global',
      title: isFa ? 'سایر مدل‌های زبانی مطرح جهان (DeepSeek، Qwen، Perplexity و ...)' : 'Other Prominent Global LLMs',
      category: isFa ? 'اکوسیستم جهانی' : 'Global Ecosystem',
      subtitle: isFa
        ? 'کلیک روی لینک هر مدل برای ورود مستقیم یا باز کردن در پنجره کناری'
        : 'Click any official link or launch in the side companion window.',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)]">
            <Globe className="w-4 h-4 text-[var(--cpai-primary)]" />
            <span>
              {isFa
                ? 'مدل‌های مکمل برای استدلال عمیق، جستجوی مستند با منبع، و مدل‌های وزن‌باز:'
                : 'Complementary models for deep reasoning, citation-grounded search, and open-weight deployments:'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPlatforms.map((llm) => (
              <div
                key={llm.id}
                className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] flex flex-col justify-between gap-3.5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] flex items-center justify-center shrink-0">
                        {renderOtherLogo(llm.id)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--cpai-text)]">{llm.name}</h4>
                        <span className="text-[11px] text-[var(--cpai-muted)]">{llm.company}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                    {isFa ? llm.descFa : llm.descEn}
                  </p>

                  <div className="text-[11px] font-mono text-[var(--cpai-text)] bg-[var(--cpai-surface)] px-2.5 py-1.5 rounded-lg border border-[var(--cpai-border)]">
                    {isFa ? llm.modelsFa : llm.modelsEn}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[var(--cpai-border)] flex items-center justify-between gap-2">
                  <a
                    href={llm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[var(--cpai-primary)] hover:underline"
                  >
                    <span>{llm.domainLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => openCompanionWindow(llm.url, `${llm.id}_companion`)}
                    className="px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:opacity-95 text-white text-xs font-semibold transition-opacity cursor-pointer"
                  >
                    {isFa ? 'پنجره کناری' : 'Side Window'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۳"
      moduleTitle={
        isFa
          ? 'غول‌های هوش مصنوعی و مدل‌های زبانی مطرح (لینک مستقیم و لوگو)'
          : 'AI Giants & Prominent LLM Platforms (Direct Links & Logos)'
      }
      moduleSubtitle={
        isFa
          ? 'سه غول اصلی (ChatGPT، Claude، Gemini) در کنار مدل‌های قدرتمند جهانی مثل DeepSeek، Qwen، Perplexity، Grok و Mistral برای انتخاب هوشمندانه ابزار.'
          : 'The Big 3 platforms (ChatGPT, Claude, Gemini) alongside DeepSeek, Qwen, Perplexity, Grok, Mistral, and Meta Llama.'
      }
      steps={steps}
    />
  );
};

/* ============================================================================
   MODULE 2-4: READY-TO-COPY PROMPT LIBRARY
   ============================================================================ */

interface Session2PromptLibraryProps {
  lang: Language;
  promptLibrary: Session2PromptItem[];
  copiedId: string | null;
  copyToClipboard: (text: string, id: string) => void;
  loadPromptToSandbox: (prompt: string) => void;
}

export const Session2PromptLibraryModule: React.FC<Session2PromptLibraryProps> = ({
  lang,
  promptLibrary,
  copiedId,
  copyToClipboard,
  loadPromptToSandbox
}) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = promptLibrary.map((item) => {
    const activePromptText = isFa ? item.promptFa : item.promptEn;
    const isCopied = copiedId === item.id;

    return {
      id: `prompt-${item.id}`,
      title: isFa ? item.titleFa : item.titleEn,
      category: isFa ? item.categoryFa : item.categoryEn,
      subtitle: isFa ? item.descriptionFa : item.descriptionEn,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--cpai-border)]">
            <span className="text-xs font-semibold text-[var(--cpai-primary)]">
              {isFa ? `دسته‌بندی: ${item.categoryFa}` : `Category: ${item.categoryEn}`}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {item.targetTools.map((tool) => (
                <span
                  key={tool}
                  dir="ltr"
                  className="text-[11px] px-2 py-0.5 rounded bg-[var(--cpai-surface-subtle)] text-[var(--cpai-muted)] border border-[var(--cpai-border)] font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <pre className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed border border-[var(--cpai-border)] max-h-80 overflow-y-auto select-all">
            {activePromptText}
          </pre>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => loadPromptToSandbox(activePromptText)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs sm:text-sm font-semibold text-[var(--cpai-primary)] transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isFa ? 'بارگذاری در کارگاه تست' : 'Load to Sandbox'}</span>
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(activePromptText, item.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isCopied
                  ? 'bg-[var(--cpai-success-bg)] text-[var(--cpai-success-text)] border border-[var(--cpai-success-border)]'
                  : 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] hover:opacity-95'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isFa ? 'کپی شد!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isFa ? 'کپی پرامپت' : 'Copy Prompt'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )
    };
  });

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۴"
      moduleTitle={
        isFa
          ? 'کتابخانه پرامپت‌های آماده و کاربردی (کپی با یک کلیک)'
          : 'Battle-Tested Prompt Templates (One-Click Copy)'
      }
      moduleSubtitle={
        isFa
          ? 'هر پرامپت را از فهرست سمت راست انتخاب کنید، با یک کلیک کپی کنید یا در کارگاه تمرین بارگذاری نمایید.'
          : 'Select any template from the sidebar to copy with one click or load directly into the Sandbox.'
      }
      sidebarTitleFa="فهرست پرامپت‌های آماده"
      sidebarTitleEn="Prompt Templates"
      steps={steps}
    />
  );
};

/* ============================================================================
   MODULE 2-5: ENTERPRISE EXPERT SYSTEMS (GEMS, PROJECTS, ARTIFACTS)
   ============================================================================ */

export const Session2AdvancedFeaturesModule: React.FC<{ lang: Language }> = ({ lang }) => {
  const isFa = lang === 'fa';

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's2-5-architecture',
      title: isFa ? 'معماری هسته: تفکیک Instructions، Gems/Projects و Artifacts' : 'Core Architecture: Decoupling Tools & Capabilities',
      category: isFa ? 'معماری سیستم خبره' : 'Architecture',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-primary)]/25 text-sm leading-relaxed text-[var(--cpai-text)]">
            {isFa
              ? 'ترکیب ابزارهای سفارشی‌سازی مانند Gems در جمینای و Projects در کلود (Claude) همراه با قابلیت‌های Artifacts و System Instructions، مدل‌های زبانی عمومی را به سیستم‌های خبره سازمانی و مشاوران دقیق مدیریتی تبدیل می‌کند.'
              : 'Combining customization engines like Gemini Gems and Claude Projects with Artifacts and System Instructions elevates generic LLMs into enterprise expert systems and rigorous management advisors.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--cpai-primary)]">
                <Terminal className="w-4 h-4" />
                <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                  {isFa ? 'دستورالعمل‌های سیستمی (Instructions)' : 'System Instructions'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'تنظیم زاویه دید، دکترین تصمیم‌گیری، قالب‌بندی خروجی و محدودیت‌های تحلیلی مدل. در این بخش رفتار هوش مصنوعی از حالت یک چت‌بات عمومی خارج شده و نقاب یک نقش خاص سازمانی (Persona) را می‌پذیرد.'
                  : 'Governs decision doctrine, analytical bias, output schema, and boundaries. Strips casual chatbot traits to adopt a strict enterprise persona.'}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--cpai-primary)]">
                <FolderKanban className="w-4 h-4" />
                <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                  {isFa ? 'جم‌ها و پروژه‌ها (Gems / Projects)' : 'Gems & Projects (Knowledge Base)'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'ایجاد محیط‌های ایزوله همراه با مخزن دانشی اختصاصی (Knowledge Base). شما اسناد قراردادی، استانداردهای فنی، شرایط عمومی پیمان، یا نقشه‌ها را یک‌بار بارگذاری می‌کنید و مدل تمام خروجی‌های خود را فقط بر پایه آن داده‌ها مستند می‌کند.'
                  : 'Isolated workspaces with persistent ground-truth data. Upload technical codes, FIDIC clauses, or P&IDs once; the AI anchors all answers strictly to them.'}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--cpai-primary)]">
                <Code className="w-4 h-4" />
                <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                  {isFa ? 'آرتیفکت‌ها (Artifacts)' : 'Artifacts Workspace'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'تفکیک گفت‌وگو از محصول نهایی کار. آرتیفکت بستری مستقل برای تدوین پیش‌نویس لوایح، تولید کدهای تحلیلی، نمودارهای جریان کار، داشبوردهای مدیریتی یا جداول ماتریس ریسک است که بدون به‌هم‌ریختگی محیط چت، قابل ویرایش و توسعه است.'
                  : 'Decouples dialogue from the work product. Standalone canvas for drafting formal claims, EVM dashboards, and risk matrices without cluttering chat history.'}
              </p>
            </div>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'سه لایه مکمل: Instructions رفتار را قفل می‌کند، Gems/Projects اسناد مرجع را ثابت نگه می‌دارد، و Artifacts محصول نهایی را جداگانه می‌سازد.'
        : 'Three complementary layers: Instructions lock behavior, Gems/Projects hold ground truth, and Artifacts render deliverables cleanly.'
    },
    {
      id: 's2-5-methodology',
      title: isFa ? 'متدولوژی تحلیل قراردادهای پیچیده و ادعاها (Claims)' : 'Complex Contract & Claim Analysis Methodology',
      category: isFa ? 'فرآیند ۳ مرحله‌ای' : '3-Step Process',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
            {isFa
              ? 'برای بررسی و ارزیابی ادعاها (Claims)، ریسک‌ها و تاخیرات قراردادی، چت معمولی پاسخگو نیست؛ باید یک Gem یا Project تخصصی تحلیل حقوقی و ادعا با پیکربندی زیر تعریف شود:'
              : 'For evaluating claims, risks, and project delay penalties, basic chat is insufficient. Deploy a dedicated Contract & Claim Analysis Gem:'}
          </p>

          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] font-mono text-xs sm:text-sm text-[var(--cpai-text)] space-y-1.5">
            <span className="font-bold text-[var(--cpai-primary)] block">
              {isFa ? '[پیکربندی دانشی Gem / Project]:' : '[Gem / Project Knowledge Configuration]:'}
            </span>
            <div>• {isFa ? 'بارگذاری شرایط عمومی و خصوصی پیمان (مانند نشریه ۴۳۱۱ یا فیدیک FIDIC نقره‌ای/زرد/قرمز)' : 'General & Particular Conditions of Contract (e.g., FIDIC Silver/Yellow/Red Books)'}</div>
            <div>• {isFa ? 'بخشنامه‌های جبرانی (تعدیل آحاد بها، نوسان نرخ ارز، تمدید مدت پیمان)' : 'Statutory Compensation Circulars (Price Adjustments, FX Variations, EoT Guidelines)'}</div>
            <div>• {isFa ? 'مکاتبات کارگاهی، صورت‌جلسات تحویل زمین و گزارش‌های روزانه پیشرفت پروژه' : 'Site correspondence, site possession protocols, and daily contractor logs'}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-sm text-[var(--cpai-primary)]">
                {isFa ? '۱. ماتریس تخصیص ریسک' : '1. Risk Allocation Matrix'}
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'استخراج تعهدات نامتقارن کارفرما/پیمانکار، بندهای مبهم در آزادسازی زمین، تحویل جبهه‌های کاری، یا فورس‌ماژور.'
                  : 'Uncovers asymmetrical clauses, land handover ambiguities, and force majeure liabilities.'}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-sm text-[var(--cpai-primary)]">
                {isFa ? '۲. ارزیابی دعاوی تاخیرات و مالی' : '2. Delay & Financial Claims'}
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'انطباق مستندات روزانه با مواعد مندرج در ماده ۳۰ شرایط عمومی پیمان، بررسی ضرورت اخطار کتبی و تحلیل مسیر بحرانی (Critical Path).'
                  : 'Maps daily logs against Clause 30 deadlines, notice prerequisites, and critical path variance.'}
              </p>
            </div>

            <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5">
              <div className="font-bold text-sm text-[var(--cpai-success-text)]">
                {isFa ? '۳. تدوین لایحه دفاعیه در آرتیفکت' : '3. Formal Defense in Artifact'}
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                {isFa
                  ? 'مدل متن رسمی دفاعیه را با استناد دقیق به شماره بندهای قرارداد و مستندات تاریخی داخل یک Artifact با فرمت نامه اداری رسمی تنظیم می‌کند.'
                  : 'Drafts hard-hitting official submission briefs citing exact contract clauses in a standalone Artifact.'}
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 's2-5-industrial-matrix',
      title: isFa ? 'الگوی ساخت دستیارهای تخصصی صنعتی (مترو، پتروشیمی، حقوقی، HR)' : 'Industrial & Technical Expert Assistant Patterns',
      category: isFa ? 'ماتریس نقش‌ها' : 'Roles Matrix',
      content: (
        <div className="overflow-x-auto rounded-[var(--cpai-radius)] border border-[var(--cpai-border)]">
          <table className="w-full text-xs sm:text-sm text-right border-collapse">
            <thead>
              <tr className="bg-[var(--cpai-surface-subtle)] text-[var(--cpai-text)] border-b border-[var(--cpai-border)]">
                <th className="p-3 font-bold w-1/4">{isFa ? 'رده تخصصی و نقش' : 'Discipline & Role'}</th>
                <th className="p-3 font-bold w-3/8">{isFa ? 'ساختار دانشی Gem / Project' : 'Gem / Project Knowledge Base'}</th>
                <th className="p-3 font-bold w-3/8">{isFa ? 'خروجی‌های کاربردی در Artifact' : 'Applied Artifact Deliverables'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--cpai-border)]">
              <tr>
                <td className="p-3 align-top font-bold text-[var(--cpai-text)]">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                    <span>{isFa ? 'مدیر پروژه و مدیر فنی مترو' : 'Metro Project & Technical Director'}</span>
                  </div>
                </td>
                <td className="p-3 align-top text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'مشخصات فنی عمومی و خصوصی تونل‌سازی، لاینینگ سگمنتی، رژیم حفاری TBM (مانند EPB)، سیستم پایدارسازی گود و ایستگاه‌ها، سازه نگهبان، و WBS پروژه.'
                    : 'Tunneling technical specs, segmental precast lining, EPB TBM excavation logs, deep excavation support, shoring systems, and project WBS.'}
                </td>
                <td className="p-3 align-top text-[var(--cpai-text)] leading-relaxed space-y-1">
                  <div>• {isFa ? 'تحلیل انحرافات زمانی و ریالی با رویکرد ارزش کسب‌شده (EVM)' : 'EVM schedule and cost variance analysis'}</div>
                  <div>• {isFa ? 'پیش‌نویس چک‌لیست‌های تحویل موقت قطعات لاینینگ و تزریق فوم' : 'Precast segment QA checklists & foam injection audits'}</div>
                  <div>• {isFa ? 'سناریونویسی مدیریت ریسک برخورد با معارضات تاسیساتی شهری' : 'Urban utility clashes risk scenarios & shoring logs'}</div>
                </td>
              </tr>

              <tr>
                <td className="p-3 align-top font-bold text-[var(--cpai-text)]">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                    <span>{isFa ? 'مدیر پتروشیمی و پالایشگاه' : 'Petrochemical & Refinery Lead'}</span>
                  </div>
                </td>
                <td className="p-3 align-top text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'استانداردهای فرآیندی (ASME, API, IPS)، نقشه‌های P&ID، لاگ‌های تعمیرات و نگهداری، رویه‌های ایمنی HAZOP و استانداردهای متریال.'
                    : 'Process safety codes (ASME Sec VIII, API 1104, IPS), P&IDs, plant maintenance logs, HAZOP studies, metallurgy specs.'}
                </td>
                <td className="p-3 align-top text-[var(--cpai-text)] leading-relaxed space-y-1">
                  <div>• {isFa ? 'بررسی عدم‌انطباق‌های متالورژیکی و پایپینگ با کد استاندارد' : 'Metallurgical & piping non-conformance audits against code'}</div>
                  <div>• {isFa ? 'آماده‌سازی ماتریس بازرسی فنی و برنامه‌ریزی تست‌های هیدروستاتیک' : 'Technical inspection matrix & hydrotest scheduling'}</div>
                  <div>• {isFa ? 'ساخت ماتریس علل ریشه‌ای (RCA) در توقفات عملیاتی واحدها' : 'Root Cause Analysis (RCA) matrices for operational trips'}</div>
                </td>
              </tr>

              <tr>
                <td className="p-3 align-top font-bold text-[var(--cpai-text)]">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                    <span>{isFa ? 'مشاور حقوقی و قراردادها' : 'Legal Counsel & Contract Advisor'}</span>
                  </div>
                </td>
                <td className="p-3 align-top text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'قوانین بالادستی، آیین‌نامه معاملات، شرایط عمومی پیمان، رویه‌های قضایی و داوری بین‌المللی/داخلی.'
                    : 'Governing procurement laws, General Conditions of Contract, arbitration precedents, and statutory regulations.'}
                </td>
                <td className="p-3 align-top text-[var(--cpai-text)] leading-relaxed space-y-1">
                  <div>• {isFa ? 'چک‌لیست انطباق‌سنجی قرارداد با قوانین حاکم پیش از امضا' : 'Pre-award contractual compliance and loophole audits'}</div>
                  <div>• {isFa ? 'استخراج مهلت‌های انقضای ضمانت‌نامه‌ها، جرایم تاخیر و سقف تعدیل' : 'Bank guarantee expiry schedules, liquidated damages & cap tracking'}</div>
                  <div>• {isFa ? 'ساخت جداول تعهدات متقابل در Artifact برای ارجاع سریع تیم اجرایی' : 'Reciprocal obligations matrices in Artifacts for site execution'}</div>
                </td>
              </tr>

              <tr>
                <td className="p-3 align-top font-bold text-[var(--cpai-text)]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0" />
                    <span>{isFa ? 'مدیر منابع انسانی، اداری و رفاهی' : 'HR, Admin & Welfare Manager'}</span>
                  </div>
                </td>
                <td className="p-3 align-top text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'مواد منابع انسانی و رفاهی شرایط خصوصی پیمان (پروژه مترو خط ایکس)، جدول متراژ فضاهای کمپ کارگاهی (صفحه ۵۴)، بخشنامه داخلی کنترل اضافه‌کاری و لاگ‌های ساعت‌زنی.'
                    : 'Particular Conditions HR & welfare clauses (Metro Line X), Page 54 mandatory camp space table, internal overtime directives, and attendance logs.'}
                </td>
                <td className="p-3 align-top text-[var(--cpai-text)] leading-relaxed space-y-1">
                  <div>• {isFa ? 'ساخت داشبورد React کنترل اضافه‌کاری و ریسک خستگی در Claude Artifacts / Gemini Canvas' : 'Interactive React overtime & fatigue risk dashboard in Artifacts/Canvas'}</div>
                  <div>• {isFa ? 'ماشین‌حساب مهلت اطلاع‌رسانی بند ۴۲-۱ (۷ روز شب‌کاری / ۲۴ ساعت روزکاری) و صدور نامه رسمی' : 'Sub-Clause 42-1 notice deadline calculator & official letter generator'}</div>
                  <div>• {isFa ? 'اپلیکیشن ممیزی متراژ کمپ کارگاهی (ماده ۲۰-ح) و مبدل CSV کارت‌زن به گزارش ماهانه ماده ۱۸' : 'Article 20-H camp space audit app & Article 18 monthly CSV manpower chart converter'}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 's2-5-checklist',
      title: isFa ? 'مراحل عملیاتی راه‌اندازی و چک‌لیست اعتبارسنجی پیش از استقرار' : 'Operational Setup & Pre-Deployment Checklist',
      category: isFa ? 'استقرار و کنترل کیفیت' : 'Deployment & QA',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-3">
            <div className="flex items-center gap-2 text-[var(--cpai-primary)]">
              <ListChecks className="w-4 h-4" />
              <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                {isFa ? 'مراحل عملیاتی راه‌اندازی دستیار اختصاصی' : 'Operational Deployment Steps'}
              </h4>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                <span className="font-bold text-[var(--cpai-primary)] block">
                  {isFa ? 'گام ۱: پایه‌گذاری System Instruction' : 'Step 1: Anchor System Instruction'}
                </span>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'نقش را دقیق، بدون تعارف و با لحن مهندسی/حقوقی بنویسید (مثلاً: «تو سرپرست امور قراردادها و دعاوی فنی هستی؛ هیچ ادعایی را بدون ارجاع به ماده و تبصره صریح قرارداد و بخشنامه‌های سازمان برنامه نمی‌پذیری»).'
                    : 'Define the persona rigorously: "You are the Senior Claims Officer; reject any claim lacking explicit reference to contractual sub-clauses and verified logs."'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                <span className="font-bold text-[var(--cpai-primary)] block">
                  {isFa ? 'گام ۲: تغذیه اسناد مرجع' : 'Step 2: Upload Ground-Truth Docs'}
                </span>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'نسخه‌های متنی تمیز و PDFهای دارای لایه متنی اسناد را مستقیماً به مخزن دانشی Gem یا Project بارگذاری کنید تا استنادها قطعی و بدون افت کیفیت باشد.'
                    : 'Upload clean, OCR-layered PDFs and structured markdown files directly into the Gem/Project Knowledge Base.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                <span className="font-bold text-[var(--cpai-primary)] block">
                  {isFa ? 'گام ۳: تعریف ساختار خروجی با Artifacts' : 'Step 3: Direct Artifact Formatting'}
                </span>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'به دستیار دستور دهید خلاصه‌ها را در قالب جداول چندمتغیره، پیش‌نویس مکاتبات را به صورت ساختار نامه‌ای رسمی، و داده‌های پیشرفت کار را به شکل کدهای داشبورد بصری تولید کند.'
                    : 'Direct the assistant to output briefs as formal letters and metrics as interactive tables in dedicated Artifacts.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-3">
            <div className="flex items-center gap-2 text-[var(--cpai-success-text)]">
              <BookCheck className="w-4 h-4" />
              <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                {isFa ? 'چک‌لیست اعتبارسنجی پیش از استقرار Gem' : 'Pre-Deployment Validation Checklist'}
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--cpai-muted)]">
              <li className="flex items-start gap-2 p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--cpai-text)] block mb-0.5">
                    {isFa ? 'قید شرط عدم فرضیه‌سازی (Hallucination Guardrail):' : 'Strict Zero-Hallucination Guardrail:'}
                  </strong>
                  <span>
                    {isFa
                      ? 'اطمینان از قرار دادن شروط عدم فرضیه‌سازی در بخش دستورالعمل تا مدل در صورت نبود داده در اسناد بارگذاری‌شده، اعلام بی‌اطلاعی کند.'
                      : 'Ensure instructions mandate stating "Information not found in reference documents" rather than guessing.'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2 p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--cpai-text)] block mb-0.5">
                    {isFa ? 'طبقه‌بندی بر اساس اولویت حاکمیت اسناد:' : 'Contractual Order of Precedence:'}
                  </strong>
                  <span>
                    {isFa
                      ? 'طبقه‌بندی اسناد بر اساس اولویت حاکمیت اسناد (مثلاً تقدم موافقت‌نامه بر شرایط عمومی و شرایط عمومی بر مشخصات فنی).'
                      : 'Explicitly enforce document hierarchy (Agreement > Particular Conditions > General Conditions > Technical Specs).'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2 p-3 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--cpai-text)] block mb-0.5">
                    {isFa ? 'یکپارچه‌سازی شیوه‌نامه مکاتبات رسمی:' : 'Corporate Letter & Tone Style Guide:'}
                  </strong>
                  <span>
                    {isFa
                      ? 'یکپارچه‌سازی شیوه‌نامه نگارش مکاتبات رسمی سازمان در حافظه پایدار دستیار جهت انطباق ۱۰۰٪ با نامه‌های صادره سازمانی.'
                      : 'Embed the organization’s standard official letterhead format and diplomatic tone in persistent memory.'}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'پیش از استقرار هر دستیار سازمانی، هر سه لایه «قید عدم توهم»، «اولویت حاکمیت اسناد» و «شیوه‌نامه مکاتبات» را تست کنید.'
        : 'Before rolling out any enterprise assistant, validate zero-hallucination guardrails, document precedence, and corporate tone.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۵"
      moduleTitle={
        isFa
          ? 'سیستم‌های خبره سازمانی و مشاوران مدیریتی با Gems، Projects و Artifacts'
          : 'Enterprise Expert Systems with Gems, Projects & Artifacts'
      }
      moduleSubtitle={
        isFa
          ? 'تبدیل مدل‌های زبانی عمومی به مشاوران دقیق حقوقی، مهندسی و مدیریت پروژه در صنایع سنگین و پیمانکاری'
          : 'Transform generic LLMs into precision engineering, legal, and mega-project advisors.'
      }
      steps={steps}
    />
  );
};

/* ============================================================================
   MODULE 2-6: ENGINEERING DATA & DASHBOARD WORKSHOP
   ============================================================================ */

interface Session2EngineeringDashboardsProps {
  lang: Language;
  industryTrack: IndustryTrackId;
  trackDatasets: EngineeringDataset[];
  selectedDatasetId: string;
  onSelectDatasetId: (id: string) => void;
  downloadTextFile: (filename: string, text: string, mimeType: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  loadPromptToSandbox: (prompt: string) => void;
  openCompanionWindow: (url: string, name: string) => void;
}

export const Session2EngineeringDashboardsModule: React.FC<Session2EngineeringDashboardsProps> = ({
  lang,
  industryTrack,
  trackDatasets,
  selectedDatasetId,
  onSelectDatasetId,
  downloadTextFile,
  copyToClipboard,
  loadPromptToSandbox,
  openCompanionWindow
}) => {
  const isFa = lang === 'fa';
  const [csvCopied, setCsvCopied] = useState(false);
  const [promptWithDataCopiedId, setPromptWithDataCopiedId] = useState<string | null>(null);

  const currentDataset = trackDatasets.find((d) => d.id === selectedDatasetId) || trackDatasets[0];
  const claudePromptText = isFa ? currentDataset.claudeDashboardPromptFa : currentDataset.claudeDashboardPromptEn;
  const geminiPromptText = isFa ? currentDataset.geminiPythonAnalyticsPromptFa : currentDataset.geminiPythonAnalyticsPromptEn;
  const fullClaudePrompt = `${claudePromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;
  const fullGeminiPrompt = `${geminiPromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;

  const renderDatasetSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {trackDatasets.map((ds) => {
        const isSelected = ds.id === currentDataset.id;
        return (
          <button
            key={ds.id}
            type="button"
            onClick={() => onSelectDatasetId(ds.id)}
            className={`p-3.5 rounded-[var(--cpai-radius)] border text-right transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
              isSelected
                ? 'border-[var(--cpai-primary)] bg-[var(--cpai-primary-soft)]'
                : 'border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)]/40'
            }`}
          >
            <div className="flex items-center gap-2">
              {ds.id === 'metro_station_tbm' && (
                <Train className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[var(--cpai-primary)]' : 'text-[var(--cpai-muted)]'}`} />
              )}
              {ds.id === 'oil_gas_pipeline_epc' && (
                <Factory className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[var(--cpai-primary)]' : 'text-[var(--cpai-muted)]'}`} />
              )}
              {ds.id === 'refinery_equipment_qa' && (
                <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[var(--cpai-primary)]' : 'text-[var(--cpai-muted)]'}`} />
              )}
              {ds.id.startsWith('paya_') && (
                <Landmark className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[var(--cpai-primary)]' : 'text-[var(--cpai-muted)]'}`} />
              )}
              <span className="font-bold text-xs text-[var(--cpai-text)] leading-snug">
                {isFa ? ds.titleFa : ds.titleEn}
              </span>
            </div>
            <span className="text-[11px] text-[var(--cpai-muted)]">
              {isFa ? ds.domainFa : ds.domainEn}
            </span>
          </button>
        );
      })}
    </div>
  );

  const steps: FocusedModuleDeckStep[] = [
    ...(industryTrack === 'PAYA_SAMAN_PARS'
      ? [
          {
            id: 's2-6-paya-sim',
            title: isFa ? 'شبیه‌ساز زنده داشبورد آرتیفکت هلدینگ پایا سامان پارس' : 'Paya Saman Pars Interactive Artifact Simulator',
            category: isFa ? 'شبیه‌ساز زنده' : 'Live Simulator',
            content: <PayaHoldingArtifactSimulator lang={lang} />
          }
        ]
      : []),
    {
      id: 's2-6-dataset',
      title: isFa ? 'انتخاب دیتاست مهندسی، دانلود CSV و پیش‌نمایش داده‌ها' : 'Select Dataset, Download CSV & Inspect Preview',
      category: isFa ? 'داده مرجع CSV' : 'CSV Dataset',
      content: (
        <div className="space-y-4">
          {renderDatasetSelector()}

          <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--cpai-border)]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--cpai-muted)]">
                  <span className="font-semibold text-[var(--cpai-primary)]">
                    {isFa ? currentDataset.domainFa : currentDataset.domainEn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span dir="ltr" className="font-mono">
                    {currentDataset.fileName} ({currentDataset.rowCount} {isFa ? 'ردیف' : 'rows'} · {currentDataset.columnCount} {isFa ? 'ستون' : 'cols'})
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-[var(--cpai-text)]">
                  {isFa ? currentDataset.titleFa : currentDataset.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                  {isFa ? currentDataset.descriptionFa : currentDataset.descriptionEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    downloadTextFile(currentDataset.fileName, currentDataset.rawCsv, 'text/csv;charset=utf-8;')
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--cpai-primary)] hover:opacity-95 text-white dark:text-[#0F171A] text-xs font-semibold transition-opacity cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isFa ? 'دانلود فایل CSV' : 'Download CSV'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(currentDataset.rawCsv, 'raw_csv_' + currentDataset.id);
                    setCsvCopied(true);
                    setTimeout(() => setCsvCopied(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs font-semibold text-[var(--cpai-text)] transition-colors cursor-pointer"
                >
                  {csvCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--cpai-success-text)]" />
                      <span>{isFa ? 'CSV کپی شد' : 'CSV Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isFa ? 'کپی متن CSV' : 'Copy CSV Text'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--cpai-text)] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                <span>{isFa ? 'پیش‌نمایش داده‌های نمونه (۵ ردیف اول):' : 'Data Matrix Preview (First 5 Rows):'}</span>
              </span>

              <div className="overflow-x-auto rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] max-h-64">
                <table className="w-full text-[11px] sm:text-xs text-right font-mono border-collapse">
                  <thead>
                    <tr className="bg-[var(--cpai-surface-subtle)] text-[var(--cpai-text)] border-b border-[var(--cpai-border)]">
                      {Object.keys(currentDataset.previewRows[0] || {}).map((colKey) => (
                        <th key={colKey} className="p-2.5 font-bold whitespace-nowrap">
                          {colKey}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--cpai-border)]">
                    {currentDataset.previewRows.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className="p-2.5 whitespace-nowrap text-[var(--cpai-muted)]">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 's2-6-claude-prompt',
      title: isFa ? 'پرامپت آماده Claude Artifacts (داشبورد تعاملی React)' : 'Claude Artifacts React Dashboard Prompt',
      category: isFa ? 'داشبوردسازی با Claude' : 'Claude Artifacts',
      content: (
        <div className="space-y-4">
          {renderDatasetSelector()}

          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[var(--cpai-text)]">
                <Code className="w-4 h-4 text-[var(--cpai-primary)]" />
                <h4 className="font-bold text-sm">
                  {isFa ? 'پرامپت Claude Artifacts (تولید داشبورد تعاملی React)' : 'Claude Artifacts React Dashboard Prompt'}
                </h4>
              </div>
              <span dir="ltr" className="text-[11px] font-mono text-[var(--cpai-muted)]">
                Claude 3.5 Sonnet
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
              {isFa
                ? 'این پرامپت را در Claude کپی کنید تا بدون نیاز به کدنویسی، یک داشبورد کامل React با فیلترها، کارت‌های KPI و نمودارهای روند در یک آرتیفکت زنده تحویل بگیرید.'
                : 'Generates an interactive, production-ready React + Tailwind dashboard in a live side-by-side Claude Artifact.'}
            </p>

            <pre className="p-3.5 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] border border-[var(--cpai-border)] max-h-60 overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {claudePromptText}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)]">
              <button
                type="button"
                onClick={() => {
                  copyToClipboard(fullClaudePrompt, 'claude_full_' + currentDataset.id);
                  setPromptWithDataCopiedId('claude_' + currentDataset.id);
                  setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--cpai-primary)] hover:opacity-95 text-white text-xs font-semibold transition-opacity cursor-pointer"
              >
                {promptWithDataCopiedId === 'claude_' + currentDataset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isFa ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadPromptToSandbox(fullClaudePrompt)}
                  className="px-3 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs font-semibold text-[var(--cpai-primary)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isFa ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                  className="px-3 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs font-semibold text-[var(--cpai-text)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Claude</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 's2-6-gemini-prompt',
      title: isFa ? 'پرامپت آماده Gemini (تحلیل آماری، رگرسیون و پایتون)' : 'Gemini Python Analytics & Forecasting Prompt',
      category: isFa ? 'تحلیل آماری با Gemini' : 'Gemini Analytics',
      content: (
        <div className="space-y-4">
          {renderDatasetSelector()}

          <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[var(--cpai-text)]">
                <Terminal className="w-4 h-4 text-[var(--cpai-primary)]" />
                <h4 className="font-bold text-sm">
                  {isFa ? 'پرامپت Gemini (تحلیل آماری، رگرسیون و پایتون)' : 'Gemini Python Analytics & Forecasting'}
                </h4>
              </div>
              <span dir="ltr" className="text-[11px] font-mono text-[var(--cpai-muted)]">
                Gemini 1.5 Pro
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
              {isFa
                ? 'این پرامپت را در Gemini وارد کنید تا اسکریپت پایتون، مدل‌سازی رگرسیون تاخیرات، نمودار همبستگی آماری و تحلیل ریشه‌ای را اجرا کند.'
                : 'Executes advanced Python regression models, schedule variance forecasts, and correlation analysis.'}
            </p>

            <pre className="p-3.5 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] border border-[var(--cpai-border)] max-h-60 overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {geminiPromptText}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)]">
              <button
                type="button"
                onClick={() => {
                  copyToClipboard(fullGeminiPrompt, 'gemini_full_' + currentDataset.id);
                  setPromptWithDataCopiedId('gemini_' + currentDataset.id);
                  setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--cpai-primary)] hover:opacity-95 text-white text-xs font-semibold transition-opacity cursor-pointer"
              >
                {promptWithDataCopiedId === 'gemini_' + currentDataset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isFa ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadPromptToSandbox(fullGeminiPrompt)}
                  className="px-3 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs font-semibold text-[var(--cpai-primary)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isFa ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                  className="px-3 py-2 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] text-xs font-semibold text-[var(--cpai-text)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Gemini</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 's2-6-playbook',
      title: isFa ? 'راهنمای ۳ مرحله‌ای اجرای کارگاه داشبوردسازی در کلاس' : '3-Step Classroom Playbook',
      category: isFa ? 'راهنمای اجرا' : 'Playbook',
      content: (
        <div className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--cpai-text)]">
            <Layers className="w-4 h-4 text-[var(--cpai-primary)]" />
            <span>{isFa ? 'مسیر استاندارد از فایل CSV تا داشبورد زنده:' : 'Standard Workflow from CSV to Live Dashboard:'}</span>
          </div>
          <ol className="text-xs sm:text-sm text-[var(--cpai-muted)] space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              {isFa
                ? 'دیتاست مدنظر (مترو، نفت‌وگاز یا هلدینگ) را انتخاب کنید و روی کلید «دانلود فایل CSV» کلیک کنید تا فایل روی سیستم ذخیره شود.'
                : 'Select the desired domain dataset and download the CSV file.'}
            </li>
            <li>
              {isFa
                ? 'کلید «کپی پرامپت + کل داده‌های CSV» مربوط به Claude یا Gemini را فشار دهید (متن پرامپت به‌همراه داده‌ها در حافظه قرار می‌گیرد).'
                : 'Click "Copy Prompt + Full CSV" to place the prompt and data onto your clipboard.'}
            </li>
            <li>
              {isFa
                ? 'وارد claude.ai یا gemini.google.com شوید، متن را پیست کنید و اینتر را بزنید. در کمتر از ۲۰ ثانیه، یک داشبورد زنده یا تحلیل پایتون برای مخاطبان به نمایش درمی‌آید!'
                : 'Open Claude or Gemini, paste the prompt, and press enter to showcase live Artifact dashboards in under 20 seconds!'}
            </li>
          </ol>
        </div>
      ),
      takeaway: isFa
        ? 'با ترکیب یک CSV تمیز و پرامپت دقیق RCTO، در کمتر از یک دقیقه داشبورد تعاملی مدیریتی آماده ارائه می‌سازید.'
        : 'Pairing a clean CSV with a crisp RCTO prompt yields an interactive executive dashboard in under a minute.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      moduleCode="۲-۶"
      moduleTitle={
        isFa
          ? industryTrack === 'PAYA_SAMAN_PARS'
            ? 'کارگاه تحلیل پورتفو و داشبوردسازی دو بال هلدینگ پایا سامان پارس (۳ دیتاست تخصصی)'
            : 'کارگاه عملی تحلیل داده و ساخت داشبورد مهندسی با Claude و Gemini (مترو و نفت‌وگاز)'
          : 'Engineering Data & Dashboard Workshop with Claude & Gemini'
      }
      moduleSubtitle={
        isFa
          ? 'دانلود فایل‌های CSV واقعی، پیش‌نمایش جداول داده، و پرامپت‌های آماده جهت تولید فوری داشبورد React در Claude Artifacts و تحلیل‌های پیش‌بینانه پایتون در Gemini.'
          : 'Download real-world CSV engineering datasets, preview data matrices, and use one-click prompts for interactive React dashboards or Python analytics.'
      }
      steps={steps}
    />
  );
};
