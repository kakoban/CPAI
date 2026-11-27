import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  Copy,
  BookOpen,
  Wrench,
  Target,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
  ListChecks,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import { DashboardModuleReviewPayload } from '../../utils/dashboardReviewEngine';

type ReviewPaneTab = 'summary' | 'exercises';

interface ModuleQuickReviewPanelProps {
  payload: DashboardModuleReviewPayload;
  lang: Language;
  checkedOutcomeKeys: Record<string, boolean>;
  onToggleOutcome: (key: string) => void;
  onSelectSibling: (moduleId: string) => void;
  onOpenFullLesson: (moduleId: string) => void;
  onClose: () => void;
}

export const ModuleQuickReviewPanel: React.FC<ModuleQuickReviewPanelProps> = ({
  payload,
  lang,
  checkedOutcomeKeys,
  onToggleOutcome,
  onSelectSibling,
  onOpenFullLesson,
  onClose
}) => {
  const isFa = lang === 'fa';
  const [paneTab, setPaneTab] = useState<ReviewPaneTab>('summary');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const { module: mod, exerciseDeck, positionIndex, totalReviewed, prevModuleId, nextModuleId } = payload;

  // Reset sub-tab and copy state when switching to a different module
  useEffect(() => {
    setPaneTab('summary');
    setCopiedPromptId(null);
  }, [mod.id]);

  const exercises = exerciseDeck?.exercises ?? [];

  const checkedInModule = mod.expectedOutcomesFa.reduce((acc, _, idx) => {
    return acc + (checkedOutcomeKeys[`${mod.id}:${idx}`] ? 1 : 0);
  }, 0);

  const handleCopyPrompt = async (exId: string, promptText: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText);
      }
      setCopiedPromptId(exId);
      setTimeout(() => {
        setCopiedPromptId((curr) => (curr === exId ? null : curr));
      }, 2200);
    } catch {
      setCopiedPromptId(exId);
    }
  };

  return (
    <aside
      data-testid="dashboard-review-drawer"
      aria-label={isFa ? `مرور سریع ماژول ${mod.titleFa}` : `Quick review: ${mod.titleEn}`}
      className="absolute inset-0 z-20 lg:static lg:z-auto w-full lg:w-[460px] xl:w-[530px] shrink-0 lg:border-s border-[var(--cpai-border)] bg-[var(--cpai-surface)] flex flex-col min-h-0 overflow-hidden"
    >
      {/* Pinned Top Header */}
      <div className="shrink-0 px-4 py-3.5 sm:px-5 border-b border-[var(--cpai-border)] bg-[var(--cpai-bg)] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer shrink-0"
            >
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              <span>{isFa ? 'بازگشت به داشبورد' : 'Back'}</span>
            </button>
            <span
              dir="ltr"
              className="px-2 py-0.5 rounded-md bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] font-mono text-[11px] font-bold tabular-nums shrink-0"
            >
              {mod.num}
            </span>
            <span className="hidden sm:inline text-[11px] font-medium text-[var(--cpai-muted)] truncate">
              {mod.sessionNumFa} · {mod.sessionTitleFa}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {totalReviewed > 1 && positionIndex >= 0 && (
              <div className="flex items-center gap-1 me-1">
                <button
                  type="button"
                  disabled={!prevModuleId}
                  data-testid="review-drawer-prev-btn"
                  onClick={() => prevModuleId && onSelectSibling(prevModuleId)}
                  title={isFa ? 'ماژول مرور شده قبلی' : 'Previous reviewed module'}
                  className="w-7 h-7 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-muted)] hover:text-[var(--cpai-primary)] hover:border-[var(--cpai-primary)] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-[var(--cpai-muted)] tabular-nums px-1">
                  {isFa
                    ? `${(positionIndex + 1).toLocaleString('fa-IR')}/${totalReviewed.toLocaleString('fa-IR')}`
                    : `${positionIndex + 1}/${totalReviewed}`}
                </span>
                <button
                  type="button"
                  disabled={!nextModuleId}
                  data-testid="review-drawer-next-btn"
                  onClick={() => nextModuleId && onSelectSibling(nextModuleId)}
                  title={isFa ? 'ماژول مرور شده بعدی' : 'Next reviewed module'}
                  className="w-7 h-7 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-muted)] hover:text-[var(--cpai-primary)] hover:border-[var(--cpai-primary)] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              data-testid="review-drawer-close-btn"
              aria-label={isFa ? 'بستن پنل مرور سریع' : 'Close review panel'}
              title={isFa ? 'بستن پنل مرور (Esc)' : 'Close review panel (Esc)'}
              className="w-8 h-8 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <div className="sm:hidden text-[11px] font-medium text-[var(--cpai-muted)] mb-0.5 truncate">
            {mod.sessionNumFa} · {mod.sessionTitleFa}
          </div>
          <h3
            data-testid="review-drawer-title"
            className="text-base font-bold text-[var(--cpai-text)] leading-snug"
          >
            {isFa ? mod.titleFa : mod.titleEn}
          </h3>
          <p className="text-xs text-[var(--cpai-muted)] mt-1 leading-relaxed">
            {mod.subFa}
          </p>
        </div>

        {/* Clean 2-Tab Switcher inside the Review Pane */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)]">
          <button
            type="button"
            data-testid="review-tab-summary"
            onClick={() => setPaneTab('summary')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
              paneTab === 'summary'
                ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/40 shadow-2xs'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{isFa ? 'مرور سریع و مهارت‌ها' : 'Summary & Skills'}</span>
          </button>

          <button
            type="button"
            data-testid="review-tab-exercises"
            onClick={() => setPaneTab('exercises')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
              paneTab === 'exercises'
                ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/40 shadow-2xs'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isFa
                ? `تمرین‌ها و پرامپت (${exercises.length.toLocaleString('fa-IR')})`
                : `Exercises (${exercises.length})`}
            </span>
          </button>
        </div>
      </div>

      {/* Independently Scrollable Review Body */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
        {paneTab === 'summary' && (
          <>
            {/* Workshop Goal */}
            {exerciseDeck?.workshopGoalFa && (
              <div className="p-3.5 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--cpai-primary-strong)]">
                  <Target className="w-3.5 h-3.5 shrink-0" />
                  <span>{isFa ? 'هدف اصلی این ماژول' : 'Core Module Goal'}</span>
                </div>
                <p className="text-[13px] text-[var(--cpai-text)] leading-relaxed">
                  {exerciseDeck.workshopGoalFa}
                </p>
              </div>
            )}

            {/* Concrete Deliverable */}
            <div className="p-3.5 rounded-xl bg-[var(--cpai-primary-soft)]/55 border border-[var(--cpai-primary)]/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--cpai-primary-strong)]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{isFa ? 'خروجی عملی مورد انتظار' : 'Key Practical Deliverable'}</span>
              </div>
              <p className="text-[13px] text-[var(--cpai-text)] leading-relaxed">
                {mod.deliverableFa}
              </p>
            </div>

            {/* Interactive Expected Outcomes Checklist (Synced live with Dashboard KPIs) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--cpai-text)]">
                  <ListChecks className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                  <span>{isFa ? 'چک‌لیست تسلط بر این ماژول' : 'Module Mastery Checklist'}</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                  {isFa
                    ? `${checkedInModule.toLocaleString('fa-IR')} از ${mod.expectedOutcomesFa.length.toLocaleString('fa-IR')}`
                    : `${checkedInModule}/${mod.expectedOutcomesFa.length}`}
                </span>
              </div>

              <ul className="space-y-2">
                {mod.expectedOutcomesFa.map((outcome, idx) => {
                  const key = `${mod.id}:${idx}`;
                  const isChecked = !!checkedOutcomeKeys[key];
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        data-testid={`review-outcome-check-${idx}`}
                        aria-pressed={isChecked}
                        onClick={() => onToggleOutcome(key)}
                        className={`w-full p-3 rounded-xl border text-start cursor-pointer flex items-start gap-2.5 transition-colors ${
                          isChecked
                            ? 'bg-[var(--cpai-success-bg)]/70 border-[var(--cpai-primary)]/40 text-[var(--cpai-text)]'
                            : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/50 text-[var(--cpai-text)]'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-[var(--cpai-primary)] border-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                              : 'bg-[var(--cpai-surface)] border-[var(--cpai-border)]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span
                          className={`text-[13px] leading-relaxed ${
                            isChecked ? 'line-through opacity-75' : ''
                          }`}
                        >
                          {outcome}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Glance at Exercises Count CTA */}
            {exercises.length > 0 && (
              <button
                type="button"
                onClick={() => setPaneTab('exercises')}
                className="w-full p-3 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-start transition-colors cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--cpai-text)]">
                    {isFa
                      ? `مرور ${exercises.length.toLocaleString('fa-IR')} تمرین عملی و پرامپت آماده این ماژول`
                      : `Review ${exercises.length} exercises & ready prompts`}
                  </div>
                  <div className="text-[11px] text-[var(--cpai-muted)] mt-0.5 truncate">
                    {exercises[0]?.titleFa}
                  </div>
                </div>
                {isFa ? (
                  <ChevronLeft className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                )}
              </button>
            )}
          </>
        )}

        {paneTab === 'exercises' && (
          <div className="space-y-4">
            {exercises.length === 0 ? (
              <div className="p-6 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] text-center text-xs text-[var(--cpai-muted)]">
                {isFa ? 'تمرین ثبت‌شده‌ای برای این ماژول یافت نشد.' : 'No exercises recorded for this module.'}
              </div>
            ) : (
              exercises.map((ex) => {
                const isCopied = copiedPromptId === ex.id;
                return (
                  <article
                    key={ex.id}
                    className="rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-[var(--cpai-muted)] flex-wrap">
                          <span className="font-semibold text-[var(--cpai-primary-strong)]">
                            {ex.stepBadgeFa}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{ex.difficultyFa}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <Clock className="w-3 h-3" />
                            {ex.estimatedMinutes.toLocaleString('fa-IR')} دقیقه
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[var(--cpai-text)] leading-snug">
                          {ex.titleFa}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                      {ex.scenarioFa}
                    </p>

                    {/* Numbered Steps */}
                    {ex.stepsFa.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-[var(--cpai-text)]">
                          {isFa ? 'مراحل کلیدی اجرا:' : 'Key Steps:'}
                        </div>
                        <ol className="space-y-1.5">
                          {ex.stepsFa.map((step, sIdx) => (
                            <li
                              key={sIdx}
                              className="flex items-start gap-2 text-xs text-[var(--cpai-text)] leading-relaxed"
                            >
                              <span className="w-5 h-5 rounded-md bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[10px] font-bold text-[var(--cpai-primary-strong)] flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                                {(sIdx + 1).toLocaleString('fa-IR')}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Ready Prompt Starter with 1-Click Copy */}
                    {ex.promptStarterFa && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-[var(--cpai-text)]">
                            {isFa ? 'پرامپت آماده مرور و اجرا' : 'Ready Prompt Starter'}
                          </span>
                          <button
                            type="button"
                            data-testid={`review-copy-prompt-${ex.id}`}
                            onClick={() => handleCopyPrompt(ex.id, ex.promptStarterFa)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[11px] font-semibold text-[var(--cpai-primary-strong)] transition-colors cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[var(--cpai-success-text)]" />
                                <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="allow-copy p-3 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] text-[11px] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto border border-[var(--cpai-border)]">
                          {ex.promptStarterFa}
                        </pre>
                      </div>
                    )}

                    {/* Self-Check Criteria */}
                    {ex.selfCheckCriteriaFa.length > 0 && (
                      <div className="pt-2 border-t border-[var(--cpai-border)] space-y-1">
                        <div className="text-[11px] font-semibold text-[var(--cpai-muted)]">
                          {isFa ? 'معیارهای ارزیابی خروجی:' : 'Self-Check Criteria:'}
                        </div>
                        <ul className="space-y-1">
                          {ex.selfCheckCriteriaFa.map((crit, cIdx) => (
                            <li
                              key={cIdx}
                              className="flex items-start gap-1.5 text-[11px] text-[var(--cpai-muted)] leading-relaxed"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--cpai-success-text)] shrink-0 mt-0.5" />
                              <span>{crit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Pinned Footer: Optional Full-Lesson Escape Hatch + Stay-in-Dashboard Close */}
      <footer className="shrink-0 px-4 py-3 sm:px-5 border-t border-[var(--cpai-border)] bg-[var(--cpai-bg)] flex items-center justify-between gap-2">
        <button
          type="button"
          data-testid="review-drawer-open-full-btn"
          onClick={() => onOpenFullLesson(mod.id)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span>{isFa ? 'باز کردن درس کامل' : 'Open Full Lesson'}</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] transition-colors cursor-pointer"
        >
          {isFa ? 'بستن مرور' : 'Close Review'}
        </button>
      </footer>
    </aside>
  );
};
