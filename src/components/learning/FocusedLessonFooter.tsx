import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../../types/cpmai';
import { StepBoundaryState, formatStepNumber } from '../../utils/focusedLessonEngine';

interface FocusedLessonFooterProps {
  lang: Language;
  boundary: StepBoundaryState;
  onPrev: () => void;
  onNext: () => void;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  finalStepCta?: {
    label: string;
    onClick: () => void;
    testId?: string;
  };
  prevLabelFa?: string;
  prevLabelEn?: string;
  nextLabelFa?: string;
  nextLabelEn?: string;
  stepUnitFa?: string;
  stepUnitEn?: string;
}

/**
 * Clean single-primary-CTA footer for focused step-by-step lessons.
 * Respects RTL chevron semantics and enforces >=44px touch targets.
 */
export const FocusedLessonFooter: React.FC<FocusedLessonFooterProps> = ({
  lang,
  boundary,
  onPrev,
  onNext,
  secondaryAction,
  finalStepCta,
  prevLabelFa = 'گام قبلی',
  prevLabelEn = 'Previous step',
  nextLabelFa = 'گام بعدی',
  nextLabelEn = 'Next step',
  stepUnitFa = 'گام',
  stepUnitEn = 'Step'
}) => {
  const isFa = lang === 'fa';

  return (
    <footer className="pt-6 mt-8 border-t border-[var(--cpai-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={onPrev}
          disabled={!boundary.canGoPrev}
          data-testid="focused-prev-step-btn"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] hover:text-[var(--cpai-primary-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {isFa ? (
            <ChevronRight aria-hidden="true" className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronLeft aria-hidden="true" className="w-4 h-4 shrink-0" />
          )}
          <span>{isFa ? prevLabelFa : prevLabelEn}</span>
        </button>

        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 rounded-[var(--cpai-radius)] text-sm font-medium text-[var(--cpai-primary-strong)] hover:bg-[var(--cpai-primary-soft)] transition-colors whitespace-nowrap"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3">
        <span className="text-xs text-[var(--cpai-muted)] tabular-nums whitespace-nowrap">
          {isFa
            ? `${stepUnitFa} ${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(boundary.totalSteps, 'fa')}`
            : `${stepUnitEn} ${boundary.stepNumber} of ${boundary.totalSteps}`}
        </span>

        {boundary.canGoNext ? (
          <button
            type="button"
            onClick={onNext}
            data-testid="focused-next-step-btn"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <span>{isFa ? nextLabelFa : nextLabelEn}</span>
            {isFa ? (
              <ChevronLeft aria-hidden="true" className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronRight aria-hidden="true" className="w-4 h-4 shrink-0" />
            )}
          </button>
        ) : finalStepCta ? (
          <button
            type="button"
            onClick={finalStepCta.onClick}
            data-testid={finalStepCta.testId || 'focused-final-cta-btn'}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <span>{finalStepCta.label}</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            data-testid="focused-next-step-btn"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] text-[var(--cpai-muted)] text-sm font-medium opacity-60 cursor-not-allowed whitespace-nowrap"
          >
            <span>{isFa ? `پایان ${stepUnitFa}‌ها` : `End of ${stepUnitEn.toLowerCase()}s`}</span>
          </button>
        )}
      </div>
    </footer>
  );
};
