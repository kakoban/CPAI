import React, { useEffect, useState } from 'react';
import { Language } from '../../types/cpmai';
import {
  clampStepIndex,
  formatStepNumber,
  getStepBoundaryState,
  markStepVisited
} from '../../utils/focusedLessonEngine';
import { FocusedLessonLayout, FocusedStepItem, FocusedViewTab } from './FocusedLessonLayout';
import { FocusedLessonFooter } from './FocusedLessonFooter';
import { LessonTakeawayCallout } from './LessonTakeawayCallout';

export interface FocusedModuleDeckStep extends FocusedStepItem {
  takeaway?: React.ReactNode;
  takeawayLabelFa?: string;
  takeawayLabelEn?: string;
  content: React.ReactNode;
}

interface FocusedModuleDeckProps {
  lang: Language;
  moduleCode?: string;
  moduleTitle: string;
  moduleSubtitle?: string;
  steps: FocusedModuleDeckStep[];
  sidebarTitleFa?: string;
  sidebarTitleEn?: string;
  stepUnitFa?: string;
  stepUnitEn?: string;
  headerAction?: React.ReactNode;
  views?: FocusedViewTab[];
  activeViewId?: string;
  onSelectView?: (viewId: string) => void;
  isStepListVisible?: boolean;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  finalStepCta?: {
    label: string;
    onClick: () => void;
    testId?: string;
  };
  renderStepHeader?: boolean;
  onStepChange?: (index: number) => void;
  testId?: string;
}

/**
 * Reusable focused single-step module shell for curriculum modules.
 * Wraps FocusedLessonLayout + FocusedLessonFooter with local step & visited-progress state.
 */
export const FocusedModuleDeck: React.FC<FocusedModuleDeckProps> = ({
  lang,
  moduleCode,
  moduleTitle,
  moduleSubtitle,
  steps,
  sidebarTitleFa,
  sidebarTitleEn,
  stepUnitFa = 'گام',
  stepUnitEn = 'steps',
  headerAction,
  views,
  activeViewId,
  onSelectView,
  isStepListVisible = true,
  secondaryAction,
  finalStepCta,
  renderStepHeader = true,
  onStepChange,
  testId
}) => {
  const isFa = lang === 'fa';
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [visitedStepIndices, setVisitedStepIndices] = useState<Set<number>>(() => new Set([0]));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Safely clamp index if step list length changes (e.g. track switch)
  useEffect(() => {
    setActiveStepIndex((prev) => clampStepIndex(prev, steps.length));
  }, [steps.length]);

  const boundary = getStepBoundaryState(activeStepIndex, steps.length);
  const currentStep = steps[boundary.currentIndex];

  const handleSelectStep = (index: number) => {
    const nextIdx = clampStepIndex(index, steps.length);
    setActiveStepIndex(nextIdx);
    setVisitedStepIndices((prev) => markStepVisited(prev, nextIdx));
    onStepChange?.(nextIdx);
  };

  return (
    <div data-testid={testId}>
      <FocusedLessonLayout
        lang={lang}
        moduleCode={moduleCode}
        moduleTitle={moduleTitle}
        moduleSubtitle={moduleSubtitle}
        steps={steps}
        activeStepIndex={boundary.currentIndex}
        visitedStepIndices={visitedStepIndices}
        onSelectStep={handleSelectStep}
        views={views}
        activeViewId={activeViewId}
        onSelectView={onSelectView}
        isStepListVisible={isStepListVisible}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={setIsMobileDrawerOpen}
        sidebarTitleFa={sidebarTitleFa}
        sidebarTitleEn={sidebarTitleEn}
        stepUnitFa={stepUnitFa}
        stepUnitEn={stepUnitEn}
        headerAction={headerAction}
      >
        {currentStep ? (
          <article className="space-y-6">
            {renderStepHeader && (
              <header className="pb-4 border-b border-[var(--cpai-border)] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap tabular-nums">
                  <span className="font-semibold text-[var(--cpai-primary-strong)]">
                    {isFa
                      ? `${stepUnitFa} ${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(boundary.totalSteps, 'fa')}`
                      : `Step ${boundary.stepNumber} of ${boundary.totalSteps}`}
                  </span>
                  {currentStep.category && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{currentStep.category}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg sm:text-[22px] font-bold text-[var(--cpai-text)] leading-snug">
                  {currentStep.title}
                </h3>

                {currentStep.subtitle && (
                  <p className="text-sm sm:text-[15px] text-[var(--cpai-muted)] leading-relaxed">
                    {currentStep.subtitle}
                  </p>
                )}
              </header>
            )}

            <div className="space-y-5">{currentStep.content}</div>

            {currentStep.takeaway && (
              <LessonTakeawayCallout
                lang={lang}
                labelFa={currentStep.takeawayLabelFa}
                labelEn={currentStep.takeawayLabelEn}
                text={currentStep.takeaway}
              />
            )}

            <FocusedLessonFooter
              lang={lang}
              boundary={boundary}
              onPrev={() => handleSelectStep(boundary.currentIndex - 1)}
              onNext={() => handleSelectStep(boundary.currentIndex + 1)}
              secondaryAction={secondaryAction}
              finalStepCta={finalStepCta}
              stepUnitFa={stepUnitFa}
              stepUnitEn={stepUnitEn === 'steps' ? 'Step' : stepUnitEn}
            />
          </article>
        ) : (
          <p className="text-sm text-[var(--cpai-muted)] py-8 text-center">
            {isFa ? 'محتوایی برای این بخش یافت نشد.' : 'No content available for this section.'}
          </p>
        )}
      </FocusedLessonLayout>
    </div>
  );
};
