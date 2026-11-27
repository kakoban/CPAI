import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  CheckSquare,
  Circle,
  Copy,
  Square,
  Terminal
} from 'lucide-react';
import { Language } from '../types/cpmai';
import { ModuleExerciseDeck } from '../data/moduleExercises';
import { FocusedLessonLayout, FocusedStepItem } from './learning/FocusedLessonLayout';
import { FocusedLessonFooter } from './learning/FocusedLessonFooter';
import { LessonTakeawayCallout } from './learning/LessonTakeawayCallout';
import { formatStepNumber, getStepBoundaryState } from '../utils/focusedLessonEngine';
import {
  computeExerciseDeckSummary,
  computeExerciseSelfCheckProgress,
  parseInlineCodeSegments,
  resolveInitialExerciseIndex
} from '../utils/exerciseDeckEngine';

const renderInlineCode = (raw: string): React.ReactNode =>
  parseInlineCodeSegments(raw).map((seg, idx) =>
    seg.type === 'code' ? (
      <code
        key={idx}
        dir="ltr"
        className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] font-mono text-[0.86em] text-[var(--cpai-primary-strong)] align-baseline"
      >
        {seg.value}
      </code>
    ) : (
      <React.Fragment key={idx}>{seg.value}</React.Fragment>
    )
  );

interface ModuleExercisesViewProps {
  lang: Language;
  deck: ModuleExerciseDeck;
  completedMap: Record<string, boolean>;
  checksMap: Record<string, boolean>;
  notesMap: Record<string, string>;
  onToggleComplete: (exerciseId: string) => void;
  onToggleCheck: (checkKey: string) => void;
  onChangeNote: (exerciseId: string, value: string) => void;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onSwitchToLesson: () => void;
  onNextModuleExercises?: () => void;
  nextModuleLabelFa?: string;
  activeDisciplineLabel?: string;
  activeRoleLabel?: string;
}

export const ModuleExercisesView: React.FC<ModuleExercisesViewProps> = ({
  lang,
  deck,
  completedMap,
  checksMap,
  notesMap,
  onToggleComplete,
  onToggleCheck,
  onChangeNote,
  onLoadToSandbox,
  copyToClipboard,
  copiedId,
  onSwitchToLesson,
  onNextModuleExercises,
  nextModuleLabelFa,
  activeDisciplineLabel,
  activeRoleLabel
}) => {
  const isFa = lang === 'fa';
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(() =>
    resolveInitialExerciseIndex(deck.exercises, completedMap)
  );
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Reset active exercise cleanly whenever the learner switches to a different module's exercise deck
  useEffect(() => {
    setActiveExerciseIndex(resolveInitialExerciseIndex(deck.exercises, completedMap));
    setIsMobileDrawerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck.moduleId]);

  const summary = useMemo(
    () => computeExerciseDeckSummary(deck.exercises, completedMap),
    [deck.exercises, completedMap]
  );

  const steps: FocusedStepItem[] = useMemo(
    () =>
      deck.exercises.map((ex) => ({
        id: ex.id,
        title: ex.titleFa.replace(/`/g, ''),
        category: isFa
          ? `سطح: ${ex.difficultyFa} · ${formatStepNumber(ex.estimatedMinutes, 'fa')} دقیقه`
          : `${ex.difficultyFa} · ${ex.estimatedMinutes} min`
      })),
    [deck.exercises, isFa]
  );

  const boundary = getStepBoundaryState(activeExerciseIndex, deck.exercises.length);
  const activeExercise = deck.exercises[boundary.currentIndex];

  if (!activeExercise) {
    return null;
  }

  const isDone = !!completedMap[activeExercise.id];
  const selfCheck = computeExerciseSelfCheckProgress(
    activeExercise.id,
    activeExercise.selfCheckCriteriaFa.length,
    checksMap
  );
  const noteValue = notesMap[activeExercise.id] || '';
  const copyKey = `ex_prompt_${activeExercise.id}`;

  return (
    <div data-testid="module-exercises-panel" className="animate-fadeIn">
      <FocusedLessonLayout
        lang={lang}
        moduleCode={
          activeDisciplineLabel
            ? isFa
              ? `تمرین ماژول ${deck.moduleNum} · ${activeDisciplineLabel}`
              : `Lab ${deck.moduleNum} · ${activeDisciplineLabel}`
            : isFa
            ? `تمرین ماژول ${deck.moduleNum}`
            : `Lab · Module ${deck.moduleNum}`
        }
        moduleTitle={deck.moduleTitleFa}
        moduleSubtitle={
          isFa
            ? `${formatStepNumber(summary.totalMinutes, 'fa')} دقیقه کل تمرین${
                activeRoleLabel ? ` · جایگاه: ${activeRoleLabel}` : ''
              } · ${deck.workshopGoalFa}`
            : `${summary.totalMinutes} min total · ${deck.workshopGoalFa}`
        }
        steps={steps}
        activeStepIndex={boundary.currentIndex}
        visitedStepIndices={summary.completedIndices}
        onSelectStep={setActiveExerciseIndex}
        isStepListVisible
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={setIsMobileDrawerOpen}
        sidebarTitleFa="فهرست تمرین‌های ماژول"
        sidebarTitleEn="Module Exercises"
        progressLabelFa="تمرین‌های ثبت‌شده"
        progressLabelEn="Completed exercises"
        stepUnitFa="تمرین"
        stepUnitEn="exercises"
        allowZeroProgress
        progressTestId="module-exercises-progress"
        headerAction={
          <button
            type="button"
            onClick={onSwitchToLesson}
            data-testid="back-to-module-lesson-btn"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] hover:text-[var(--cpai-primary-strong)] transition-colors whitespace-nowrap"
          >
            <BookOpen aria-hidden="true" className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
            <span>{isFa ? 'بازگشت به درس ماژول' : 'Back to Lesson'}</span>
          </button>
        }
      >
        <article
          data-testid={`module-exercise-card-${activeExercise.id}`}
          className="space-y-6"
        >
          {/* Calm Unboxed Exercise Header */}
          <header className="pb-5 border-b border-[var(--cpai-border)] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--cpai-muted)]">
                <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                  {activeExercise.stepBadgeFa}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isFa ? `سطح: ${activeExercise.difficultyFa}` : activeExercise.difficultyFa}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {isFa
                    ? `زمان پیشنهادی: ${formatStepNumber(activeExercise.estimatedMinutes, 'fa')} دقیقه`
                    : `${activeExercise.estimatedMinutes} min`}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--cpai-text)] leading-snug">
                {renderInlineCode(activeExercise.titleFa)}
              </h3>

              <p
                dir="ltr"
                className={`text-xs font-mono text-[var(--cpai-muted)] ${isFa ? 'text-right' : 'text-left'}`}
              >
                {activeExercise.titleEn}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(activeExercise.id)}
              data-testid={`toggle-ex-done-${activeExercise.id}`}
              aria-pressed={isDone}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border text-sm font-semibold transition-colors whitespace-nowrap shrink-0 self-start ${
                isDone
                  ? 'bg-[var(--cpai-success-bg)] border-[var(--cpai-success-border)] text-[var(--cpai-success-text)]'
                  : 'bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] border-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
              }`}
            >
              {isDone ? (
                <CheckCircle2 aria-hidden="true" className="w-4 h-4 shrink-0" />
              ) : (
                <Circle aria-hidden="true" className="w-4 h-4 shrink-0" />
              )}
              <span>
                {isDone
                  ? isFa
                    ? 'تمرین انجام شد'
                    : 'Completed'
                  : isFa
                  ? 'ثبت انجام تمرین'
                  : 'Mark Complete'}
              </span>
            </button>
          </header>

          {/* Practical Scenario (Calm Readable Prose) */}
          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--cpai-primary-strong)]">
              {isFa ? 'سناریو و مسئله عملی شما' : 'Practical Scenario'}
            </h4>
            <p className="text-[16px] sm:text-[17px] leading-[1.85] text-[var(--cpai-text)]">
              {renderInlineCode(activeExercise.scenarioFa)}
            </p>
          </section>

          {/* Expected Deliverable Callout */}
          <LessonTakeawayCallout
            lang={lang}
            labelFa="خروجی قابل تحویل (Deliverable)"
            labelEn="Expected Deliverable"
            text={renderInlineCode(activeExercise.deliverableFa)}
          />

          {/* Execution Steps */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--cpai-text)]">
              {isFa ? 'گام‌های اجرای تمرین' : 'Execution Steps'}
            </h4>
            <ol className="space-y-3">
              {activeExercise.stepsFa.map((step, sIdx) => (
                <li
                  key={sIdx}
                  className="flex items-start gap-3 text-[15.5px] sm:text-[16px] leading-[1.8] text-[var(--cpai-text)]"
                >
                  <span className="w-6 h-6 mt-1 rounded-md bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] text-xs font-semibold tabular-nums flex items-center justify-center shrink-0">
                    {formatStepNumber(sIdx + 1, lang)}
                  </span>
                  <span className="min-w-0 flex-1">{renderInlineCode(step)}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Dedicated Starter Prompt Block + Direct Sandbox & Copy Actions */}
          <section className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-xs font-semibold text-[var(--cpai-code-text)] inline-flex items-center gap-2">
                <Terminal aria-hidden="true" className="w-4 h-4 text-[#63D0D4] shrink-0" />
                <span>
                  {isFa
                    ? 'پرامپت آماده اختصاصی این تمرین'
                    : 'Dedicated Exercise Starter Prompt'}
                </span>
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(activeExercise.promptStarterFa)}
                  data-testid={`load-ex-sandbox-${activeExercise.id}`}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold transition-colors"
                >
                  <Terminal aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{isFa ? 'بارگذاری در سندباکس' : 'Load in Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeExercise.promptStarterFa, copyKey)}
                  data-testid={`copy-ex-prompt-${activeExercise.id}`}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[var(--cpai-code-text)] text-xs font-medium transition-colors"
                >
                  {copiedId === copyKey ? (
                    <>
                      <Check aria-hidden="true" className="w-3.5 h-3.5 text-[#A7E3BD] shrink-0" />
                      <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                      <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre
              dir={isFa ? 'rtl' : 'ltr'}
              className={`p-4 sm:p-5 text-[13.5px] sm:text-[14px] leading-[1.85] whitespace-pre-wrap font-sans text-[var(--cpai-code-text)] overflow-x-auto ${
                isFa ? 'text-right' : 'text-left'
              }`}
            >
              {activeExercise.promptStarterFa}
            </pre>
          </section>

          {/* Self-Check Rubric & Auto-Saved Learner Worklog */}
          <section className="pt-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-[var(--cpai-text)]">
                  {isFa ? 'چک‌لیست خودارزیابی خروجی' : 'Self-Check Criteria'}
                </h4>
                <span className="text-xs font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                  {isFa
                    ? `${formatStepNumber(selfCheck.checkedCount, 'fa')} از ${formatStepNumber(selfCheck.totalCount, 'fa')}`
                    : `${selfCheck.checkedCount}/${selfCheck.totalCount}`}
                </span>
              </div>

              <div className="space-y-2">
                {activeExercise.selfCheckCriteriaFa.map((criterion, cIdx) => {
                  const checkKey = `${activeExercise.id}__${cIdx}`;
                  const checked = !!checksMap[checkKey];
                  return (
                    <button
                      key={checkKey}
                      type="button"
                      onClick={() => onToggleCheck(checkKey)}
                      data-testid={`ex-check-${checkKey}`}
                      aria-pressed={checked}
                      className={`w-full min-h-[44px] text-start p-3 rounded-[var(--cpai-radius)] border text-sm leading-relaxed flex items-start gap-2.5 transition-colors ${
                        checked
                          ? 'bg-[var(--cpai-success-bg)] border-[var(--cpai-success-border)] text-[var(--cpai-success-text)]'
                          : 'bg-[var(--cpai-surface)] border-[var(--cpai-border)] text-[var(--cpai-text)] hover:border-[var(--cpai-primary)]'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare
                          aria-hidden="true"
                          className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0 mt-1"
                        />
                      ) : (
                        <Square
                          aria-hidden="true"
                          className="w-4 h-4 text-[var(--cpai-muted)] shrink-0 mt-1"
                        />
                      )}
                      <span>{renderInlineCode(criterion)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-2.5 flex flex-col">
              <label
                htmlFor={`note-${activeExercise.id}`}
                className="text-sm font-semibold text-[var(--cpai-text)]"
              >
                {isFa
                  ? 'یادداشت، لینک فایل یا خلاصه خروجی شما (ذخیره خودکار)'
                  : 'Your Worklog, File Link or Result Summary (Auto-saved)'}
              </label>
              <textarea
                id={`note-${activeExercise.id}`}
                data-testid={`ex-note-${activeExercise.id}`}
                value={noteValue}
                onChange={(e) => onChangeNote(activeExercise.id, e.target.value)}
                rows={4}
                placeholder={
                  isFa
                    ? 'لینک شیت/گیت‌هاب یا نکات کلیدی که در اجرای این تمرین به دست آوردید اینجا بنویسید...'
                    : 'Paste your sheet/GitHub link or key takeaways from completing this exercise...'
                }
                className="w-full flex-1 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--cpai-text)] placeholder:text-[var(--cpai-muted)] focus:outline-none focus:border-[var(--cpai-primary)] resize-y"
              />
            </div>
          </section>

          {/* Clean Exercise Step Navigation Footer */}
          <FocusedLessonFooter
            lang={lang}
            boundary={boundary}
            onPrev={() => setActiveExerciseIndex(Math.max(0, boundary.currentIndex - 1))}
            onNext={() =>
              setActiveExerciseIndex(
                Math.min(deck.exercises.length - 1, boundary.currentIndex + 1)
              )
            }
            prevLabelFa="تمرین قبلی"
            prevLabelEn="Previous exercise"
            nextLabelFa="تمرین بعدی"
            nextLabelEn="Next exercise"
            stepUnitFa="تمرین"
            stepUnitEn="Exercise"
            secondaryAction={{
              label: isFa ? 'مرور دوباره درس این ماژول' : 'Review Module Lesson',
              onClick: onSwitchToLesson
            }}
            finalStepCta={
              onNextModuleExercises
                ? {
                    label: isFa
                      ? nextModuleLabelFa
                        ? `تمرین ماژول بعدی (${nextModuleLabelFa})`
                        : 'تمرین ماژول بعدی'
                      : 'Next Module Exercises',
                    onClick: onNextModuleExercises,
                    testId: 'next-module-exercises-btn'
                  }
                : undefined
            }
          />
        </article>
      </FocusedLessonLayout>
    </div>
  );
};
