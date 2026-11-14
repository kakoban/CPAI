import React from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Clock,
  Sparkles,
  FileCheck2,
  ArrowLeft,
  ArrowRight,
  Circle,
  CheckSquare,
  Square
} from 'lucide-react';
import { Language } from '../types/cpmai';
import { ModuleExerciseDeck, ModuleExerciseDifficulty } from '../data/moduleExercises';

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
}

const DIFFICULTY_STYLES: Record<ModuleExerciseDifficulty, string> = {
  'پایه': 'text-emerald-700 dark:text-emerald-300',
  'عملیاتی': 'text-[#1f5163] dark:text-[#6fb3c6]',
  'پیشرفته': 'text-purple-700 dark:text-purple-300'
};

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
  nextModuleLabelFa
}) => {
  const totalCount = deck.exercises.length;
  const doneCount = deck.exercises.filter((ex) => !!completedMap[ex.id]).length;
  const totalMinutes = deck.exercises.reduce((sum, ex) => sum + ex.estimatedMinutes, 0);

  return (
    <div
      data-testid="module-exercises-panel"
      className="space-y-5 animate-fadeIn"
    >
      {/* Focused Module Exercise Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-[#1f5163]/8 via-white to-emerald-50/50 dark:from-[#1f5163]/20 dark:via-[#151e27] dark:to-emerald-950/20 border border-[#1f5163]/25 dark:border-[#6fb3c6]/25 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#1f5163] dark:text-[#6fb3c6]">
              <span className="inline-flex items-center gap-1">
                <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? `کارگاه تمرین عملی ماژول ${deck.moduleNum}`
                    : `Hands-On Lab · Module ${deck.moduleNum}`}
                </span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? `${totalMinutes.toLocaleString('fa-IR')} دقیقه کل تمرین`
                    : `${totalMinutes} min total`}
                </span>
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {deck.moduleTitleFa}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {deck.workshopGoalFa}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
            <div
              data-testid="module-exercises-progress"
              className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold tabular-nums ${
                doneCount === totalCount
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-[#131c24] text-[#1f5163] dark:text-[#6fb3c6] border-slate-200 dark:border-slate-700'
              }`}
            >
              {lang === 'fa'
                ? `${doneCount.toLocaleString('fa-IR')} از ${totalCount.toLocaleString('fa-IR')} تمرین ثبت شده`
                : `${doneCount} / ${totalCount} Completed`}
            </div>

            <button
              type="button"
              onClick={onSwitchToLesson}
              data-testid="back-to-module-lesson-btn"
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131c24] hover:border-[#1f5163] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#6fb3c6]" />
              <span>{lang === 'fa' ? 'بازگشت به درس ماژول' : 'Back to Lesson'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-5">
        {deck.exercises.map((ex, idx) => {
          const isDone = !!completedMap[ex.id];
          const checksDone = ex.selfCheckCriteriaFa.filter(
            (_, cIdx) => !!checksMap[`${ex.id}__${cIdx}`]
          ).length;
          const noteValue = notesMap[ex.id] || '';
          const copyKey = `ex_prompt_${ex.id}`;

          return (
            <article
              key={ex.id}
              data-testid={`module-exercise-card-${ex.id}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-4 shadow-xs ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-300 dark:border-emerald-800/70'
                  : 'bg-white dark:bg-[#18212b] border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Card Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-[#1f5163] text-white font-mono">
                      {ex.stepBadgeFa}
                    </span>
                    <span className={DIFFICULTY_STYLES[ex.difficultyFa]}>
                      {lang === 'fa' ? `سطح: ${ex.difficultyFa}` : ex.difficultyFa}
                    </span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {lang === 'fa'
                        ? `زمان پیشنهادی: ${ex.estimatedMinutes.toLocaleString('fa-IR')} دقیقه`
                        : `${ex.estimatedMinutes} min`}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                    {(idx + 1).toLocaleString('fa-IR')}. {ex.titleFa}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400" dir="ltr">
                    {ex.titleEn}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleComplete(ex.id)}
                  data-testid={`toggle-ex-done-${ex.id}`}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-[#131c24] border-emerald-300 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 shrink-0" />
                  )}
                  <span>
                    {isDone
                      ? lang === 'fa'
                        ? 'تمرین انجام شد'
                        : 'Completed'
                      : lang === 'fa'
                      ? 'ثبت انجام تمرین'
                      : 'Mark Complete'}
                  </span>
                </button>
              </div>

              {/* Scenario + Expected Deliverable */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 p-3.5 rounded-xl bg-slate-50 dark:bg-[#131c24] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-extrabold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fa' ? 'سناریو و مسئله عملی شما' : 'Practical Scenario'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {ex.scenarioFa}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-1.5">
                  <div className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fa' ? 'خروجی قابل تحویل (Deliverable)' : 'Expected Deliverable'}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-100 leading-relaxed">
                    {ex.deliverableFa}
                  </p>
                </div>
              </div>

              {/* Execution Steps */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  {lang === 'fa' ? 'گام‌های اجرای تمرین:' : 'Execution Steps:'}
                </div>
                <ol className="space-y-1.5">
                  {ex.stepsFa.map((step, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#1f5163]/12 text-[#1f5163] dark:bg-[#6fb3c6]/20 dark:text-[#6fb3c6] font-mono text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {(sIdx + 1).toLocaleString('fa-IR')}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Starter Prompt Block + Direct Sandbox & Copy Actions */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-900 dark:bg-[#0d131a] text-slate-100 overflow-hidden">
                <div className="px-3.5 py-2 bg-slate-800/90 dark:bg-[#131c24] border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#6fb3c6]" />
                    <span>
                      {lang === 'fa'
                        ? 'پرامپت آماده اختصاصی این تمرین'
                        : 'Dedicated Exercise Starter Prompt'}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onLoadToSandbox(ex.promptStarterFa)}
                      data-testid={`load-ex-sandbox-${ex.id}`}
                      className="px-2.5 py-1 rounded-lg bg-[#1f5163] hover:bg-[#296880] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>
                        {lang === 'fa' ? 'بارگذاری در سندباکس' : 'Load in Sandbox'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(ex.promptStarterFa, copyKey)}
                      data-testid={`copy-ex-prompt-${ex.id}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === copyKey ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  className={`p-3.5 text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-100 overflow-x-auto ${
                    lang === 'fa' ? 'text-right' : 'text-left'
                  }`}
                >
                  {ex.promptStarterFa}
                </pre>
              </div>

              {/* Interactive Self-Check Rubric + Learner Worklog */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131c24] border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {lang === 'fa' ? 'چک‌لیست خودارزیابی خروجی' : 'Self-Check Criteria'}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#1f5163] dark:text-[#6fb3c6] tabular-nums">
                      {checksDone}/{ex.selfCheckCriteriaFa.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {ex.selfCheckCriteriaFa.map((criterion, cIdx) => {
                      const checkKey = `${ex.id}__${cIdx}`;
                      const checked = !!checksMap[checkKey];
                      return (
                        <button
                          key={checkKey}
                          type="button"
                          onClick={() => onToggleCheck(checkKey)}
                          data-testid={`ex-check-${checkKey}`}
                          aria-pressed={checked}
                          className={`w-full text-right p-2 rounded-lg border text-xs flex items-start gap-2 transition-colors cursor-pointer ${
                            checked
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                              : 'bg-white dark:bg-[#18212b] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1f5163]/50'
                          }`}
                        >
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <span className={checked ? 'line-through opacity-80' : ''}>
                            {criterion}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131c24] border border-slate-200/80 dark:border-slate-800 space-y-2 flex flex-col">
                  <label
                    htmlFor={`note-${ex.id}`}
                    className="text-xs font-extrabold text-slate-800 dark:text-slate-100"
                  >
                    {lang === 'fa'
                      ? 'یادداشت، لینک فایل یا خلاصه خروجی شما (ذخیره خودکار)'
                      : 'Your Worklog, File Link or Result Summary (Auto-saved)'}
                  </label>
                  <textarea
                    id={`note-${ex.id}`}
                    data-testid={`ex-note-${ex.id}`}
                    value={noteValue}
                    onChange={(e) => onChangeNote(ex.id, e.target.value)}
                    rows={3}
                    placeholder={
                      lang === 'fa'
                        ? 'لینک شیت/گیت‌هاب یا نکات کلیدی که در اجرای این تمرین به دست آوردید اینجا بنویسید...'
                        : 'Paste your sheet/GitHub link or key takeaways from completing this exercise...'
                    }
                    className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#18212b] px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1f5163]/40 resize-y"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#18212b] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onSwitchToLesson}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-[#1f5163] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <BookOpen className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
          <span>{lang === 'fa' ? 'مرور دوباره درس این ماژول' : 'Review Module Lesson'}</span>
        </button>

        {onNextModuleExercises && (
          <button
            type="button"
            onClick={onNextModuleExercises}
            data-testid="next-module-exercises-btn"
            className="px-4 py-2 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <span>
              {lang === 'fa'
                ? nextModuleLabelFa
                  ? `تمرین ماژول بعدی (${nextModuleLabelFa})`
                  : 'تمرین ماژول بعدی'
                : 'Next Module Exercises'}
            </span>
            {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
