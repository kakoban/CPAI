import React, { useEffect, useRef } from 'react';
import { Check, List, X } from 'lucide-react';
import { Language } from '../../types/cpmai';
import {
  computeSidebarScrollTop,
  computeVisitedProgress,
  formatStepNumber,
  getStepBoundaryState,
  resolveFocusedStepKeyAction
} from '../../utils/focusedLessonEngine';

export interface FocusedStepItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export interface FocusedViewTab {
  id: string;
  label: string;
}

interface FocusedLessonLayoutProps {
  lang: Language;
  moduleCode?: string;
  moduleTitle: string;
  moduleSubtitle?: string;
  steps: FocusedStepItem[];
  activeStepIndex: number;
  visitedStepIndices: ReadonlySet<number>;
  onSelectStep: (index: number) => void;
  views?: FocusedViewTab[];
  activeViewId?: string;
  onSelectView?: (viewId: string) => void;
  isStepListVisible?: boolean;
  isMobileDrawerOpen: boolean;
  onToggleMobileDrawer: (open: boolean) => void;
  sidebarTitleFa?: string;
  sidebarTitleEn?: string;
  progressLabelFa?: string;
  progressLabelEn?: string;
  stepUnitFa?: string;
  stepUnitEn?: string;
  allowZeroProgress?: boolean;
  progressTestId?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Reusable focused single-step learning shell:
 * - Calm single-elevation surface using --cpai-* semantic tokens
 * - Right-side step sidebar on desktop (~320-340px)
 * - Accessible slide-over Drawer on mobile/tablet (<1024px) with Escape + focus return
 * - Main reading canvas constrained to ~904px readable measure
 * - Works for 0, 1, or N steps without hardcoding counts
 */
export const FocusedLessonLayout: React.FC<FocusedLessonLayoutProps> = ({
  lang,
  moduleCode,
  moduleTitle,
  moduleSubtitle,
  steps,
  activeStepIndex,
  visitedStepIndices,
  onSelectStep,
  views,
  activeViewId,
  onSelectView,
  isStepListVisible = true,
  isMobileDrawerOpen,
  onToggleMobileDrawer,
  sidebarTitleFa = 'فهرست گام‌های درس',
  sidebarTitleEn = 'Lesson Steps',
  progressLabelFa = 'گام‌های مرور‌شده در این نشست',
  progressLabelEn = 'Reviewed in this session',
  stepUnitFa = 'گام',
  stepUnitEn = 'steps',
  allowZeroProgress = false,
  progressTestId,
  headerAction,
  children
}) => {
  const isFa = lang === 'fa';
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const wasDrawerOpenRef = useRef<boolean>(false);
  const desktopNavRef = useRef<HTMLElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const boundary = getStepBoundaryState(activeStepIndex, steps.length);
  const progress = computeVisitedProgress(visitedStepIndices, steps.length);

  // Reset reading pane scroll to top whenever step or active view changes
  useEffect(() => {
    const contentEl = contentScrollRef.current;
    if (contentEl && contentEl.scrollTop > 0) {
      contentEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [boundary.currentIndex, activeViewId]);

  // Keep active step visible inside the pinned desktop sidebar without scrolling outer viewport
  useEffect(() => {
    const navEl = desktopNavRef.current;
    if (!navEl || !isStepListVisible) return;
    const activeBtn = navEl.querySelector<HTMLElement>(
      `[data-testid="focused-step-item-${boundary.stepNumber}"]`
    );
    if (!activeBtn) return;

    const itemTop = activeBtn.offsetTop - navEl.offsetTop;
    const nextScrollTop = computeSidebarScrollTop({
      itemTop,
      itemHeight: activeBtn.offsetHeight,
      scrollTop: navEl.scrollTop,
      containerHeight: navEl.clientHeight
    });
    if (nextScrollTop !== null) {
      navEl.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
    }
  }, [boundary.stepNumber, isStepListVisible]);

  // Move focus into mobile drawer when opened, and restore focus to trigger when closed (X01)
  useEffect(() => {
    if (isMobileDrawerOpen) {
      wasDrawerOpenRef.current = true;
      const timer = window.setTimeout(() => {
        drawerCloseRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(timer);
    } else if (wasDrawerOpenRef.current) {
      wasDrawerOpenRef.current = false;
      drawerTriggerRef.current?.focus();
    }
  }, [isMobileDrawerOpen]);

  // Keyboard support: Escape closes drawer; RTL-aware ArrowLeft/ArrowRight navigates steps when not typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isTyping && e.key !== 'Escape') return;

      const action = resolveFocusedStepKeyAction(e.key, {
        isRtl: isFa,
        currentIndex: boundary.currentIndex,
        totalSteps: steps.length,
        isDrawerOpen: isMobileDrawerOpen
      });

      if (action.type === 'close_drawer') {
        e.preventDefault();
        onToggleMobileDrawer(false);
      } else if (action.type === 'go_to_step' && isStepListVisible && !isMobileDrawerOpen) {
        // Only hijack Home/End or Arrow keys when user isn't interacting with a form/link inside another view
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          if (e.altKey || target === document.body || target?.closest('[data-focused-reader-root="true"]')) {
            // Avoid hijacking horizontal scroll inside code blocks or tables
            if (target?.closest('pre, table')) return;
            e.preventDefault();
            onSelectStep(action.index);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isFa,
    boundary.currentIndex,
    steps.length,
    isMobileDrawerOpen,
    isStepListVisible,
    onSelectStep,
    onToggleMobileDrawer
  ]);

  const renderStepListItems = (closeOnSelect: boolean) => (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="shrink-0 pb-4 mb-3 border-b border-[var(--cpai-border)] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--cpai-text)]">
            {isFa ? sidebarTitleFa : sidebarTitleEn}
          </h3>
          <span className="text-xs text-[var(--cpai-muted)] tabular-nums">
            {steps.length > 0
              ? isFa
                ? `${formatStepNumber(steps.length, 'fa')} ${stepUnitFa}`
                : `${steps.length} ${stepUnitEn}`
              : isFa
              ? `۰ ${stepUnitFa}`
              : `0 ${stepUnitEn}`}
          </span>
        </div>

        {/* Real progress bar (viewed steps for lessons, or completed count for exercises) */}
        {steps.length > 0 && (
          <div className="space-y-1.5" data-testid={progressTestId}>
            <div
              className="h-1.5 w-full rounded-full bg-[var(--cpai-surface-subtle)] overflow-hidden"
              role="progressbar"
              aria-valuenow={progress.visitedCount}
              aria-valuemin={0}
              aria-valuemax={progress.totalSteps}
              aria-label={isFa ? progressLabelFa : progressLabelEn}
            >
              <div
                className="h-full rounded-full bg-[var(--cpai-primary)] transition-all duration-200 origin-right"
                style={{
                  width: `${
                    allowZeroProgress
                      ? progress.percent
                      : Math.max(progress.percent, Math.round((1 / steps.length) * 100))
                  }%`
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[var(--cpai-muted)] tabular-nums">
              <span>{isFa ? progressLabelFa : progressLabelEn}</span>
              <span>
                {isFa
                  ? `${formatStepNumber(progress.visitedCount, 'fa')} از ${formatStepNumber(progress.totalSteps, 'fa')}`
                  : `${progress.visitedCount} of ${progress.totalSteps}`}
              </span>
            </div>
          </div>
        )}
      </div>

      {steps.length === 0 ? (
        <p className="text-sm text-[var(--cpai-muted)] py-6 text-center">
          {isFa ? 'هنوز گامی برای این ماژول ثبت نشده است.' : 'No steps available for this module.'}
        </p>
      ) : (
        <nav
          ref={closeOnSelect ? undefined : desktopNavRef}
          aria-label={isFa ? 'ناوبری گام‌های ماژول' : 'Module step navigation'}
          data-testid={closeOnSelect ? 'mobile-step-list-nav' : 'desktop-step-list-nav'}
          className={`space-y-1.5 ${closeOnSelect ? '' : 'overflow-y-auto min-h-0 flex-1 pe-1'}`}
        >
          <ol className="space-y-1.5 pb-3">
            {steps.map((step, idx) => {
              const isActive = idx === boundary.currentIndex;
              const isVisited = visitedStepIndices.has(idx);
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectStep(idx);
                      if (closeOnSelect) onToggleMobileDrawer(false);
                    }}
                    aria-current={isActive ? 'step' : undefined}
                    data-testid={`focused-step-item-${idx + 1}`}
                    className={`w-full min-h-[48px] px-3 py-2.5 rounded-[var(--cpai-radius)] border text-start transition-colors flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)]'
                        : 'bg-transparent border-transparent hover:bg-[var(--cpai-surface-subtle)] text-[var(--cpai-text)]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 mt-0.5 rounded-md text-xs font-semibold tabular-nums flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                          : isVisited
                          ? 'bg-[var(--cpai-success-bg)] text-[var(--cpai-success-text)]'
                          : 'bg-[var(--cpai-surface-subtle)] text-[var(--cpai-muted)]'
                      }`}
                    >
                      {isVisited && !isActive ? (
                        <Check aria-hidden="true" className="w-3.5 h-3.5" />
                      ) : (
                        formatStepNumber(idx + 1, lang, true)
                      )}
                    </span>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div
                        className={`text-[13.5px] leading-snug line-clamp-2 ${
                          isActive ? 'font-semibold text-[var(--cpai-primary-strong)]' : 'font-normal text-[var(--cpai-text)]'
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.category && (
                        <div className="text-[11px] text-[var(--cpai-muted)] truncate">
                          {step.category}
                          {isActive ? (isFa ? ' · در حال مطالعه' : ' · Current') : ''}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );

  const hasHeaderControls = Boolean(
    headerAction ||
      (views && views.length > 1 && onSelectView) ||
      (isStepListVisible && steps.length > 0)
  );

  return (
    <section
      data-focused-reader-root="true"
      data-testid="cpai-focused-reader"
      className="cpai-focused-reader rounded-2xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] p-3 sm:p-4 lg:p-5 flex flex-col gap-3.5 lg:gap-4"
    >
      {/* Pinned Module Top Strip: Full header pinned on desktop; compact controls bar sticks flush on mobile */}
      <header
        data-testid="focused-module-header"
        data-spotlight-ignore="true"
        className="contents lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:shrink-0 lg:pb-3.5 lg:border-b lg:border-[var(--cpai-border)]"
      >
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
            {moduleCode && (
              <span className="font-semibold text-[var(--cpai-primary-strong)]">
                {moduleCode
                  .replace(/\u200F/g, '')
                  .split(/([۰-۹0-9]+-[۰-۹0-9]+)/g)
                  .map((part, idx) =>
                    /^[۰-۹0-9]+-[۰-۹0-9]+$/.test(part) ? (
                      <bdi key={idx} dir="ltr" className="inline-block">
                        {part}
                      </bdi>
                    ) : (
                      <React.Fragment key={idx}>{part}</React.Fragment>
                    )
                  )}
              </span>
            )}
            {moduleCode && <span aria-hidden="true">·</span>}
            <span className="tabular-nums">
              {isFa
                ? `${formatStepNumber(steps.length, 'fa')} ${stepUnitFa === 'گام' ? 'گام آموزشی' : stepUnitFa}`
                : `${steps.length} ${stepUnitEn}`}
            </span>
            {moduleSubtitle && (
              <>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="basis-full sm:basis-auto">{moduleSubtitle}</span>
              </>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--cpai-text)] leading-snug">
            {moduleTitle}
          </h2>
        </div>

        {hasHeaderControls && (
          <div
            data-testid="focused-module-controls"
            className="sticky top-0 z-20 lg:static -mx-3 px-3 py-2 sm:-mx-4 sm:px-4 lg:mx-0 lg:px-0 lg:py-0 bg-[var(--cpai-bg)] lg:bg-transparent border-y border-[var(--cpai-border)] lg:border-0 flex items-center gap-2 flex-wrap shrink-0"
          >
            {headerAction}

            {/* Segmented Mode Switcher (Lesson | Comparison | Lab & Sandbox) */}
            {views && views.length > 1 && onSelectView && (
              <div
                role="tablist"
                aria-label={isFa ? 'بخش‌های این ماژول' : 'Module views'}
                className={`grid ${views.length === 2 || views.length === 4 ? 'grid-cols-2' : 'grid-cols-3'} sm:inline-flex items-stretch sm:items-center gap-1 p-1 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] w-full sm:w-auto`}
              >
                {views.map((view) => {
                  const selected = view.id === activeViewId;
                  return (
                    <button
                      key={view.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      data-testid={`focused-view-tab-${view.id}`}
                      onClick={() => onSelectView(view.id)}
                      className={`min-h-[40px] px-2 sm:px-3.5 py-1.5 rounded-lg text-[11.5px] sm:text-[13px] leading-snug text-center transition-colors sm:whitespace-nowrap ${
                        selected
                          ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] font-semibold shadow-2xs border border-[var(--cpai-border)]'
                          : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] font-normal border border-transparent'
                      }`}
                    >
                      {view.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile / Tablet Step Drawer Trigger (< lg) */}
            {isStepListVisible && steps.length > 0 && (
              <button
                ref={drawerTriggerRef}
                type="button"
                onClick={() => onToggleMobileDrawer(true)}
                aria-expanded={isMobileDrawerOpen}
                aria-controls="cpai-mobile-step-drawer"
                data-testid="mobile-step-drawer-trigger"
                className="lg:hidden inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors whitespace-nowrap"
              >
                <List aria-hidden="true" className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                <span>
                  {isFa
                    ? `فهرست ${stepUnitFa === 'گام' ? 'گام‌ها' : `${stepUnitFa}‌ها`} (${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(steps.length, 'fa')})`
                    : `${sidebarTitleEn} (${boundary.stepNumber}/${steps.length})`}
                </span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content Layout: Pinned Right Sidebar on Desktop + Independently Scrollable Reading Pane */}
      <div
        data-testid="focused-reader-body"
        className="flex flex-col lg:flex-row items-start gap-5 flex-1 min-h-0"
      >
        {isStepListVisible && (
          <aside
            aria-label={isFa ? 'فهرست گام‌های ماژول' : 'Module steps'}
            data-testid="desktop-step-sidebar"
            className="hidden lg:flex lg:flex-col w-[308px] xl:w-[330px] shrink-0 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-4 sticky top-2 max-h-[calc(100vh-240px)] overflow-hidden"
          >
            {renderStepListItems(false)}
          </aside>
        )}

        <div
          ref={contentScrollRef}
          data-testid="focused-content-scroll"
          className="flex-1 min-w-0 w-full scroll-smooth lg:pe-1 lg:pb-1"
        >
          <div className="w-full max-w-[904px] mx-auto rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-4 sm:p-6 lg:p-7">
            {children}
          </div>
        </div>
      </div>

      {/* Accessible Slide-Over Step Drawer for Mobile & Tablet (< lg) */}
      {isStepListVisible && isMobileDrawerOpen && (
        <div
          id="cpai-mobile-step-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={isFa ? 'فهرست گام‌های درس' : 'Lesson steps drawer'}
          data-testid="mobile-step-drawer"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          <div
            aria-hidden="true"
            onClick={() => onToggleMobileDrawer(false)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-[1px]"
          />
          <div className="relative z-10 ms-0 me-auto w-[min(88vw,340px)] max-w-full h-full bg-[var(--cpai-surface)] border-e border-[var(--cpai-border)] p-4 flex flex-col shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--cpai-border)]">
              <span className="text-sm font-semibold text-[var(--cpai-text)]">
                {moduleTitle}
              </span>
              <button
                ref={drawerCloseRef}
                type="button"
                onClick={() => onToggleMobileDrawer(false)}
                aria-label={isFa ? 'بستن فهرست گام‌ها' : 'Close steps drawer'}
                data-testid="mobile-step-drawer-close"
                className="inline-flex items-center justify-center w-11 h-11 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors shrink-0"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderStepListItems(true)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
