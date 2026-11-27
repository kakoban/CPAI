import React, { useMemo, useState } from 'react';
import { CheckCircle2, Info, RotateCcw, Shield, ShieldAlert } from 'lucide-react';
import { Language } from '../../types/cpmai';
import {
  FocusedLessonLayout,
  FocusedStepItem,
  FocusedViewTab
} from '../learning/FocusedLessonLayout';
import { FocusedLessonFooter } from '../learning/FocusedLessonFooter';
import { LessonTakeawayCallout } from '../learning/LessonTakeawayCallout';
import {
  formatStepNumber,
  getStepBoundaryState,
  markStepVisited
} from '../../utils/focusedLessonEngine';
import {
  SafetyChecklistItem,
  computeChecklistReadiness,
  countCheckedInPillar,
  toggleChecklistItem
} from '../../utils/session4Helpers';

interface SecurityGuardrailsModuleProps {
  lang: Language;
}

type SafetyViewId = 'lesson' | 'checklist';

interface SafetyStep {
  id: 'pat_mcp' | 'privacy_pii' | 'hallucination';
  categoryFa: string;
  categoryEn: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  takeawayFa: string;
  takeawayEn: string;
}

const SAFETY_STEPS: SafetyStep[] = [
  {
    id: 'pat_mcp',
    categoryFa: 'امنیت توکن و دسترسی',
    categoryEn: 'Token & Filesystem Safety',
    titleFa: 'امنیت توکن گیت‌هاب (PAT) و محدودسازی پوشه‌های MCP',
    titleEn: 'GitHub PAT Security & MCP Filesystem Scoping',
    subtitleFa: 'اصول حیاتی امنیت هنگام اتصال سرورهای MCP به پوشه‌های سیستم و مخازن گیت‌هاب سازمانی',
    subtitleEn: 'Critical security boundaries when connecting MCP servers to local folders and GitHub repositories',
    takeawayFa:
      'توکن‌های گیت‌هاب حکم کلید گاوصندوق را دارند؛ همیشه از Fine-Grained PAT محدود به یک مخزن استفاده کنید و دسترسی Filesystem MCP را فقط به یک پوشه کاری مشخص ببندید.',
    takeawayEn:
      'Treat GitHub PATs like vault keys: scope them to a single repository with Fine-Grained PATs and restrict Filesystem MCP to one working folder.'
  },
  {
    id: 'privacy_pii',
    categoryFa: 'حریم خصوصی و کنترل انسانی',
    categoryEn: 'Privacy & Human Control',
    titleFa: 'سه قانون غیرقابل‌مذاکره حریم خصوصی و محرمانگی (PII)',
    titleEn: '3 Non-Negotiable Privacy & Confidentiality Rules',
    subtitleFa: 'حفاظت از داده‌های هویتی، خاموش‌کردن آموزش مدل روی چت‌ها و اعمال کنترل انسانی پیش از تغییرات',
    subtitleEn: 'Protecting sensitive PII, disabling public model training, and enforcing human approval before writes',
    takeawayFa:
      'هیچ‌گاه داده هویتی یا سند طبقه‌بندی‌شده را در چت عمومی وارد نکنید و پیش از هر Commit یا حذف فایل توسط MCP، مجوز را شخصاً بررسی و تایید کنید.',
    takeawayEn:
      'Never paste PII or classified records into public chats, and personally inspect and approve every commit or file deletion requested by MCP.'
  },
  {
    id: 'hallucination',
    categoryFa: 'دقت و راستی‌آزمایی',
    categoryEn: 'Accuracy & Verification',
    titleFa: 'مهار خطای توهم در اعداد، قراردادها و استانداردها',
    titleEn: 'Tactics to Squash Hallucinations in Numbers & Standards',
    subtitleFa: 'سه سپر اجرایی برای جلوگیری از ارقام ساختگی و تضمین مستند بودن هر خروجی مهندسی',
    subtitleEn: 'Three operational defenses to eliminate fabricated figures and enforce source-backed engineering outputs',
    takeawayFa:
      'با ترکیب شرط «نمی‌دانم»، الزام به Citation دقیق و جداسازی برآوردهای شفاهی از ارقام قطعی، ریسک توهم مدل در گزارش‌های حساس را به حداقل برسانید.',
    takeawayEn:
      'Combine an explicit "I don\'t know" clause, mandatory citations, and separation of unverified estimates from official figures to squash hallucinations.'
  }
];

const PREFLIGHT_CHECKLIST_ITEMS: SafetyChecklistItem[] = [
  {
    id: 'pat_no_chat',
    pillarId: 'pat_mcp',
    titleFa: 'توکن گیت‌هاب (ghp_...) در هیچ چت یا پرامپتی ارسال نشده است',
    titleEn: 'No GitHub token (ghp_...) has been pasted into any chat or prompt',
    detailFa: 'در صورت افشای اتفاقی در چت، فوراً از Settings گیت‌هاب آن را Revoke کنید.',
    detailEn: 'If ever exposed in chat, revoke it immediately in GitHub Settings.'
  },
  {
    id: 'pat_fine_grained',
    pillarId: 'pat_mcp',
    titleFa: 'توکن MCP از نوع Fine-Grained PAT و محدود به یک ریپازیتوری مشخص است',
    titleEn: 'MCP token is a Fine-Grained PAT scoped to a single target repository',
    detailFa: 'اصل حداقل دسترسی (Least Privilege): هیچ‌گاه کل اکانت گیت‌هاب را باز نگذارید.',
    detailEn: 'Least privilege: never grant account-wide repository access.'
  },
  {
    id: 'mcp_folder_scope',
    pillarId: 'pat_mcp',
    titleFa: 'مسیر Filesystem MCP فقط به یک پوشه کاری (مثل D:/Project) محدود شده است',
    titleEn: 'Filesystem MCP is restricted to a single working directory (e.g., D:/Project)',
    detailFa: 'هرگز کل درایو C یا Desktop را در پیکربندی سرور MCP قرار ندهید.',
    detailEn: 'Never expose the entire C: drive or Desktop in MCP config.'
  },
  {
    id: 'pii_redacted',
    pillarId: 'privacy_pii',
    titleFa: 'اطلاعات حساس (PII) مانند شماره ملی، رمز عبور و اسناد طبقه‌بندی‌شده حذف یا ماسک شده‌اند',
    titleEn: 'Sensitive PII (national IDs, passwords, classified docs) is excluded or redacted',
    detailFa: 'ورود داده‌های محرمانه در محیط‌های چت عمومی مطلقاً ممنوع است.',
    detailEn: 'Never enter confidential or personally identifiable records in public chats.'
  },
  {
    id: 'training_disabled',
    pillarId: 'privacy_pii',
    titleFa: 'گزینه آموزش مدل روی داده‌های چت (Model Training) خاموش شده است',
    titleEn: 'Model training on chat data is disabled in account privacy settings',
    detailFa: 'پیش از بارگذاری فایل‌های کاری، تنظیمات حریم خصوصی حساب را بررسی کنید.',
    detailEn: 'Verify privacy toggles before uploading any work materials.'
  },
  {
    id: 'human_in_loop',
    pillarId: 'privacy_pii',
    titleFa: 'تایید انسانی (Human-in-the-Loop) پیش از هر Commit یا حذف فایل فعال است',
    titleEn: 'Human-in-the-loop approval is enforced prior to any commit or file deletion',
    detailFa: 'پیش از تایید هر ابزار نوشتنی MCP، خروجی و تغییرات پیشنهادی را شخصاً بخوانید.',
    detailEn: 'Review every write, commit, or delete request before approving.'
  },
  {
    id: 'idk_rule',
    pillarId: 'hallucination',
    titleFa: 'شرط «نمی‌دانم» در دستورالعمل یا Skill درج شده است',
    titleEn: 'Explicit "I don\'t know" fallback clause is included in the prompt or Skill',
    detailFa: 'مدل باید در صورت نبود داده در اسناد مرجع، صراحتاً عدم وجود داده را اعلام کند.',
    detailEn: 'Require the model to state explicitly when evidence is missing from source docs.'
  },
  {
    id: 'citation_rule',
    pillarId: 'hallucination',
    titleFa: 'الزام به Citation (شماره ماده، بند یا ردیف جدول) برای هر عدد تعریف شده است',
    titleEn: 'Mandatory citation (clause, section, or table row) is required for every number',
    detailFa: 'هر عدد بدون ارجاع مستند باید پیش از استفاده در گزارش مدیریتی بازبینی شود.',
    detailEn: 'Audit any figure lacking an explicit source reference before executive reporting.'
  },
  {
    id: 'unverified_trap',
    pillarId: 'hallucination',
    titleFa: 'تله اعداد تاییدنشده (تفکیک برآورد شفاهی از ارقام قطعی صورت‌جلسه) کنترل شده است',
    titleEn: 'Unverified Numbers Trap is handled (verbal estimates separated from confirmed figures)',
    detailFa: 'برآوردهای شفاهی و غیررسمی نباید با ارقام مصوب صورت‌جلسات مخلوط شوند.',
    detailEn: 'Keep verbal estimates visibly distinct from approved figures in meeting minutes.'
  }
];

export const SecurityGuardrailsModule: React.FC<SecurityGuardrailsModuleProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [activeView, setActiveView] = useState<SafetyViewId>('lesson');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(() => new Set([0]));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());

  const steps: FocusedStepItem[] = useMemo(
    () =>
      SAFETY_STEPS.map((s) => ({
        id: s.id,
        title: isFa ? s.titleFa : s.titleEn,
        category: isFa ? s.categoryFa : s.categoryEn
      })),
    [isFa]
  );

  const views: FocusedViewTab[] = useMemo(
    () => [
      { id: 'lesson', label: isFa ? 'مطالعه درس' : 'Lesson' },
      { id: 'checklist', label: isFa ? 'چک‌لیست پیش‌پرواز امنیتی' : 'Pre-Flight Checklist' }
    ],
    [isFa]
  );

  const handleSelectStep = (idx: number) => {
    const safeIdx = Math.max(0, Math.min(SAFETY_STEPS.length - 1, idx));
    setActiveStepIndex(safeIdx);
    setVisitedSteps((prev) => markStepVisited(prev, safeIdx));
  };

  const boundary = getStepBoundaryState(activeStepIndex, SAFETY_STEPS.length);
  const currentStep = SAFETY_STEPS[boundary.currentIndex];
  const validItemIds = useMemo(() => PREFLIGHT_CHECKLIST_ITEMS.map((i) => i.id), []);
  const readiness = useMemo(
    () => computeChecklistReadiness(checkedIds, validItemIds),
    [checkedIds, validItemIds]
  );

  return (
    <FocusedLessonLayout
      lang={lang}
      moduleCode={isFa ? 'ماژول ۴-۳' : 'Module 4-3'}
      moduleTitle={
        isFa
          ? 'خطوط قرمز امنیتی، حفاظت از توکن‌های گیت‌هاب (PAT) و مهار توهم'
          : 'Security Guardrails, PAT Safety & Hallucination Mitigation'
      }
      moduleSubtitle={
        isFa
          ? 'اصول حیاتی امنیت هنگام اتصال MCP به پوشه‌های سیستم و مخازن گیت‌هاب سازمانی'
          : 'Critical security rules when connecting MCP servers to local folders and GitHub repositories'
      }
      steps={steps}
      activeStepIndex={boundary.currentIndex}
      visitedStepIndices={visitedSteps}
      onSelectStep={handleSelectStep}
      views={views}
      activeViewId={activeView}
      onSelectView={(id) => setActiveView(id as SafetyViewId)}
      isStepListVisible={activeView === 'lesson'}
      isMobileDrawerOpen={isMobileDrawerOpen}
      onToggleMobileDrawer={setIsMobileDrawerOpen}
    >
      {activeView === 'lesson' ? (
        <article className="space-y-6">
          <header className="space-y-2 pb-5 border-b border-[var(--cpai-border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
              <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                {isFa
                  ? `گام ${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(SAFETY_STEPS.length, 'fa')}`
                  : `Step ${boundary.stepNumber} of ${SAFETY_STEPS.length}`}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isFa ? currentStep.categoryFa : currentStep.categoryEn}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--cpai-text)] leading-snug">
              {isFa ? currentStep.titleFa : currentStep.titleEn}
            </h3>

            <p className="text-sm sm:text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
              {isFa ? currentStep.subtitleFa : currentStep.subtitleEn}
            </p>
          </header>

          <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
            {currentStep.id === 'pat_mcp' && (
              <>
                <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] p-4 sm:p-5 flex items-start gap-3">
                  <Shield aria-hidden="true" className="w-5 h-5 text-[var(--cpai-error)] shrink-0 mt-1" />
                  <p className="text-[15px] leading-relaxed text-[var(--cpai-text)]">
                    {isFa
                      ? 'اتصال MCP به هارد شخصی یا مخازن گیت‌هاب سازمانی، سطح دسترسی واقعی ایجاد می‌کند. پیش از هر اتصال، این سه خط قرمز امنیتی را اعمال کنید:'
                      : 'Connecting MCP to local drives or enterprise GitHub repositories grants real operational access. Enforce these three security boundaries first:'}
                  </p>
                </div>

                <ol className="space-y-4">
                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۱. هرگز توکن را در چت نفرستید' : '1. Never paste tokens in chat'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa ? (
                        <>
                          توکن‌های{' '}
                          <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-sm font-mono text-[var(--cpai-text)]">
                            ghp_...
                          </code>{' '}
                          حکم کلید گاوصندوق را دارند؛ در صورت افشا در چت، فوراً از بخش Settings گیت‌هاب آن را{' '}
                          <strong className="text-[var(--cpai-text)]">Revoke</strong> کنید.
                        </>
                      ) : (
                        <>
                          GitHub tokens (<code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-sm font-mono text-[var(--cpai-text)]">ghp_...</code>) act as vault keys. If exposed in chat, immediately <strong>Revoke</strong> them in GitHub Settings.
                        </>
                      )}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۲. حداقل دسترسی (Fine-Grained PAT)' : '2. Least privilege (Fine-Grained PAT)'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'توکن MCP را فقط به یک ریپازیتوری مشخص محدود کنید، نه کل اکانت گیت‌هاب.'
                        : 'Scope the MCP token strictly to a single repository rather than your entire GitHub account.'}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۳. محدودسازی پوشه Filesystem' : '3. Restrict Filesystem MCP scope'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa ? (
                        <>
                          فقط مسیر یک پوشه کاری (مثلاً{' '}
                          <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-sm font-mono text-[var(--cpai-text)]">
                            D:/Project
                          </code>
                          ) را به MCP بدهید، نه کل درایو C یا Desktop.
                        </>
                      ) : (
                        <>
                          Grant MCP access only to a single working folder (e.g.,{' '}
                          <code dir="ltr" className="px-1.5 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-sm font-mono text-[var(--cpai-text)]">
                            D:/Project
                          </code>
                          ), never the entire C: drive or Desktop.
                        </>
                      )}
                    </p>
                  </li>
                </ol>
              </>
            )}

            {currentStep.id === 'privacy_pii' && (
              <>
                <div className="flex items-center gap-2.5 text-sm text-[var(--cpai-muted)]">
                  <ShieldAlert aria-hidden="true" className="w-5 h-5 text-[var(--cpai-error)] shrink-0" />
                  <span>
                    {isFa
                      ? 'سه خط قرمز محرمانگی برای کار روزمره با ابزارهای هوش مصنوعی'
                      : 'Three confidentiality boundaries for daily enterprise AI workflows'}
                  </span>
                </div>

                <ol className="space-y-4">
                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۱. عدم درج اطلاعات حساس (PII)' : '1. Never input sensitive PII'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'شماره ملی، رمزهای عبور و اسناد طبقه‌بندی‌شده را در چت عمومی وارد نکنید.'
                        : 'Do not enter national IDs, passwords, or classified documents into public chats.'}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۲. خاموش کردن Training' : '2. Disable Model Training'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'در تنظیمات حساب‌های عمومی گزینه آموزش مدل روی داده‌های چت را خاموش کنید.'
                        : 'Turn off chat-data model training in your public account privacy settings.'}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۳. تایید انسانی (Human-in-the-Loop)' : '3. Human-in-the-Loop Approval'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'پیش از هر Commit یا حذف فایل توسط MCP، مجوز را شخصاً بررسی و تایید کنید.'
                        : 'Personally inspect and approve permissions before any commit or file deletion via MCP.'}
                    </p>
                  </li>
                </ol>
              </>
            )}

            {currentStep.id === 'hallucination' && (
              <>
                <div className="flex items-center gap-2.5 text-sm text-[var(--cpai-muted)]">
                  <Info aria-hidden="true" className="w-5 h-5 text-[var(--cpai-primary)] shrink-0" />
                  <span>
                    {isFa
                      ? 'تکنیک‌های عملی جلوگیری از توهم در ارقام مالی، فنی و بندهای قراردادی'
                      : 'Practical tactics to eliminate hallucinated numbers and engineering references'}
                  </span>
                </div>

                <ol className="space-y-4">
                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۱. شرط «نمی‌دانم»' : '1. Explicit "I don\'t know" clause'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'الزام مدل به اعلام صریح در صورت نبود داده در اسناد مرجع.'
                        : 'Require the model to state clearly when requested data does not exist in source documents.'}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۲. الزام به Citation' : '2. Mandatory Citation'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'درخواست ذکر شماره ماده، بند یا ردیف جدول برای هر عدد گزارش‌شده.'
                        : 'Require the article number, clause, or table row reference for every reported figure.'}
                    </p>
                  </li>

                  <li className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] p-4 sm:p-5 space-y-1.5">
                    <div className="font-semibold text-[var(--cpai-text)]">
                      {isFa ? '۳. تله اعداد تاییدنشده' : '3. The Unverified Numbers Trap'}
                    </div>
                    <p className="text-[15.5px] text-[var(--cpai-muted)] leading-relaxed">
                      {isFa
                        ? 'جداسازی برآوردهای شفاهی از ارقام قطعی صورت‌جلسات.'
                        : 'Explicitly separate verbal estimates from confirmed figures in official minutes.'}
                    </p>
                  </li>
                </ol>
              </>
            )}
          </div>

          <LessonTakeawayCallout
            lang={lang}
            text={isFa ? currentStep.takeawayFa : currentStep.takeawayEn}
          />

          <FocusedLessonFooter
            lang={lang}
            boundary={boundary}
            onPrev={() => handleSelectStep(boundary.currentIndex - 1)}
            onNext={() => handleSelectStep(boundary.currentIndex + 1)}
            secondaryAction={{
              label: isFa ? 'چک‌لیست پیش‌پرواز' : 'Pre-Flight Checklist',
              onClick: () => setActiveView('checklist')
            }}
            finalStepCta={{
              label: isFa ? 'اجرای چک‌لیست پیش‌پرواز امنیتی' : 'Run Security Pre-Flight Checklist',
              onClick: () => setActiveView('checklist')
            }}
          />
        </article>
      ) : (
        <div className="space-y-6" data-testid="safety-preflight-checklist">
          {/* Checklist Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--cpai-border)]">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--cpai-text)]">
                {isFa ? 'چک‌لیست پیش‌پرواز امنیتی پیش از اتصال MCP' : 'MCP Security Pre-Flight Checklist'}
              </h3>
              <p className="text-sm text-[var(--cpai-muted)]">
                {isFa
                  ? 'پیش از اتصال هوش مصنوعی به پوشه کاری یا مخزن گیت‌هاب، این ۹ کنترل ایمنی را تیک بزنید.'
                  : 'Verify all 9 safeguards before connecting AI tools to local folders or GitHub repositories.'}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div
                data-testid="safety-readiness-status"
                className={`px-3.5 py-2 rounded-[var(--cpai-radius)] border text-xs font-semibold tabular-nums flex items-center gap-2 ${
                  readiness.isFullyReady
                    ? 'bg-[var(--cpai-success-bg)] border-[var(--cpai-success-border)] text-[var(--cpai-success-text)]'
                    : 'bg-[var(--cpai-surface-subtle)] border-[var(--cpai-border)] text-[var(--cpai-text)]'
                }`}
              >
                {readiness.isFullyReady && <CheckCircle2 aria-hidden="true" className="w-4 h-4 shrink-0" />}
                <span>
                  {isFa
                    ? `${formatStepNumber(readiness.checkedCount, 'fa')} از ${formatStepNumber(readiness.totalCount, 'fa')} مورد تایید شده`
                    : `${readiness.checkedCount} of ${readiness.totalCount} verified`}
                </span>
              </div>

              {readiness.checkedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCheckedIds(new Set())}
                  aria-label={isFa ? 'بازنشانی چک‌لیست' : 'Reset checklist'}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                >
                  <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>{isFa ? 'بازنشانی' : 'Reset'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Pillar Groups */}
          <div className="space-y-6">
            {SAFETY_STEPS.map((pillar) => {
              const pillarItems = PREFLIGHT_CHECKLIST_ITEMS.filter((i) => i.pillarId === pillar.id);
              const stats = countCheckedInPillar(checkedIds, PREFLIGHT_CHECKLIST_ITEMS, pillar.id);
              return (
                <section key={pillar.id} className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-[var(--cpai-text)]">
                      {isFa ? pillar.titleFa : pillar.titleEn}
                    </h4>
                    <span className="text-xs text-[var(--cpai-muted)] tabular-nums">
                      {isFa
                        ? `${formatStepNumber(stats.checked, 'fa')} از ${formatStepNumber(stats.total, 'fa')}`
                        : `${stats.checked}/${stats.total}`}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {pillarItems.map((item) => {
                      const isChecked = checkedIds.has(item.id);
                      return (
                        <label
                          key={item.id}
                          htmlFor={`safety-check-${item.id}`}
                          className={`flex items-start gap-3 p-4 rounded-[var(--cpai-radius)] border cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-[var(--cpai-success-bg)] border-[var(--cpai-success-border)]'
                              : 'bg-[var(--cpai-surface-subtle)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]'
                          }`}
                        >
                          <input
                            id={`safety-check-${item.id}`}
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              setCheckedIds((prev) => toggleChecklistItem(prev, item.id))
                            }
                            className="mt-1 w-4 h-4 accent-[var(--cpai-primary)] shrink-0 cursor-pointer"
                          />
                          <div className="min-w-0 space-y-1">
                            <div
                              className={`text-sm font-semibold leading-snug ${
                                isChecked
                                  ? 'text-[var(--cpai-success-text)]'
                                  : 'text-[var(--cpai-text)]'
                              }`}
                            >
                              {isFa ? item.titleFa : item.titleEn}
                            </div>
                            <div className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                              {isFa ? item.detailFa : item.detailEn}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--cpai-border)] flex justify-end">
            <button
              type="button"
              onClick={() => setActiveView('lesson')}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
            >
              {isFa ? 'بازگشت به مطالعه گام‌به‌گام' : 'Back to step-by-step lesson'}
            </button>
          </div>
        </div>
      )}
    </FocusedLessonLayout>
  );
};
