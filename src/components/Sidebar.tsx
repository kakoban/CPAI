import React from 'react';
import { PhaseId, Language } from '../types/cpmai';
import { UI_TRANSLATIONS } from '../data/translations';
import { OWJ_LOGO } from '../data/logo';
import { Check } from 'lucide-react';

interface SidebarProps {
  activePhase: PhaseId;
  onSelectPhase: (id: PhaseId) => void;
  lang: Language;
  phaseProgress: Record<PhaseId, number>;
  activePhaseSteps: Array<{ title: string; anchor: string; isDone: boolean }>;
  onStepClick?: (stepIndex: number, anchor: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePhase,
  onSelectPhase,
  lang,
  phaseProgress,
  activePhaseSteps,
  onStepClick
}) => {
  const t = UI_TRANSLATIONS[lang];
  const currentProgress = phaseProgress[activePhase] || 0;

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  const scrollToAnchor = (stepIndex: number, anchorId: string) => {
    if (onStepClick) {
      onStepClick(stepIndex, anchorId);
      return;
    }
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-full md:w-72 lg:w-80 shrink-0 border-b md:border-b-0 md:border-e border-[#d9dad5] dark:border-[#2d3942] p-5 sm:p-6 md:sticky md:top-15 md:h-[calc(100vh-3.75rem)] md:overflow-y-auto bg-[#ffffff]/60 dark:bg-[#161c22]/60">
      {/* Brand Header */}
      <a
        href="https://owjbc.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 mb-4 group"
      >
        <div className="bg-[#ffffff] p-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] shadow-xs shrink-0">
          <img
            src={OWJ_LOGO}
            alt={t.org}
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] group-hover:text-[#1f5163] dark:group-hover:text-[#6fb3c6] transition-colors leading-tight">
            {t.org}
          </span>
          <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
            {t.by} {t.org}
          </span>
        </div>
      </a>

      {/* Title & subtitle */}
      <div className="mb-5 pb-4 border-b border-[#d9dad5] dark:border-[#2d3942]">
        <h1 className="font-semibold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
          {t.brand}
        </h1>
        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
          {t.sub}
        </p>
      </div>

      {/* 6 Phases Navigation */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#5d6b73] dark:text-[#9aa8b0] mb-2 px-1">
          {lang === 'fa' ? 'فازهای شش‌گانه CPMAI' : 'CPMAI Phases'}
        </h2>
        <ol className="space-y-1">
          {([1, 2, 3, 4, 5, 6] as PhaseId[]).map((phaseId, index) => {
            const isActive = activePhase === phaseId;
            const progress = phaseProgress[phaseId] || 0;
            const isCompleted = progress === 100;

            return (
              <li key={phaseId}>
                <button
                  onClick={() => onSelectPhase(phaseId)}
                  className={`w-full text-start flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6] font-semibold shadow-xs'
                      : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#f4f4f1] dark:hover:bg-[#1a2228] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`font-serif font-bold text-xs px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]'
                          : 'bg-[#d9dad5]/50 dark:bg-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                      }`}
                    >
                      {romanNumerals[index]}
                    </span>
                    <span className="truncate">{t.phasesNav[index]}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ms-2">
                    {isCompleted ? (
                      <span className="w-4 h-4 rounded-full bg-[#2f7d5b] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                        {progress}%
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Active Phase Progress Indicator */}
      <div className="mb-6 p-3.5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
        <div className="flex items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
          <span>{t.phaseProg}</span>
          <span className="font-mono font-medium text-[#1f5163] dark:text-[#6fb3c6]">
            {currentProgress}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#d9dad5] dark:bg-[#2d3942] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1f5163] dark:bg-[#6fb3c6] transition-all duration-300"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      {/* Active Phase Step Checklist */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5d6b73] dark:text-[#9aa8b0] mb-2.5 px-1">
          {t.stepsLabel}
        </h3>
        <ul className="space-y-2 text-xs">
          {activePhaseSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`w-4 h-4 mt-0.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                  step.isDone
                    ? 'bg-[#2f7d5b] text-white font-bold'
                    : 'border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0]'
                }`}
              >
                {step.isDone ? '✓' : idx + 1}
              </span>
              <button
                onClick={() => scrollToAnchor(idx, step.anchor)}
                className={`text-start hover:underline transition-colors ${
                  step.isDone
                    ? 'text-[#1c2830] dark:text-[#e8ebe9] font-medium'
                    : 'text-[#5d6b73] dark:text-[#9aa8b0]'
                }`}
              >
                {step.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
