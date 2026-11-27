export interface StepBoundaryState {
  currentIndex: number;
  totalSteps: number;
  stepNumber: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface VisitedProgressState {
  visitedCount: number;
  totalSteps: number;
  percent: number;
}

export type FocusedStepKeyAction =
  | { type: 'none' }
  | { type: 'close_drawer' }
  | { type: 'go_to_step'; index: number };

export interface ParsedBulletItem {
  label?: string;
  text: string;
}

export type ParsedLessonBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullet_list'; items: ParsedBulletItem[] };

/**
 * Clamps any requested step index safely within [0, totalSteps - 1].
 * Returns 0 when totalSteps <= 0 so callers never index out of bounds.
 */
export function clampStepIndex(index: number, totalSteps: number): number {
  if (!Number.isFinite(totalSteps) || totalSteps <= 0) return 0;
  const maxIndex = Math.floor(totalSteps) - 1;
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Math.min(Math.floor(index), maxIndex);
}

/**
 * Computes navigation boundary flags for any step count (0, 1, or N).
 */
export function getStepBoundaryState(
  currentIndex: number,
  totalSteps: number
): StepBoundaryState {
  const safeTotal = Number.isFinite(totalSteps) && totalSteps > 0 ? Math.floor(totalSteps) : 0;
  if (safeTotal === 0) {
    return {
      currentIndex: 0,
      totalSteps: 0,
      stepNumber: 0,
      canGoPrev: false,
      canGoNext: false,
      isFirst: true,
      isLast: true
    };
  }
  const safeIndex = clampStepIndex(currentIndex, safeTotal);
  return {
    currentIndex: safeIndex,
    totalSteps: safeTotal,
    stepNumber: safeIndex + 1,
    canGoPrev: safeIndex > 0,
    canGoNext: safeIndex < safeTotal - 1,
    isFirst: safeIndex === 0,
    isLast: safeIndex === safeTotal - 1
  };
}

/**
 * Advances one step forward, stopping cleanly at the final step (never wraps unexpectedly).
 */
export function stepForward(currentIndex: number, totalSteps: number): number {
  const state = getStepBoundaryState(currentIndex, totalSteps);
  if (!state.canGoNext) return state.currentIndex;
  return state.currentIndex + 1;
}

/**
 * Moves one step backward, stopping cleanly at step 0.
 */
export function stepBackward(currentIndex: number, totalSteps: number): number {
  const state = getStepBoundaryState(currentIndex, totalSteps);
  if (!state.canGoPrev) return state.currentIndex;
  return state.currentIndex - 1;
}

/**
 * Resolves keyboard navigation actions for RTL and LTR focused step readers.
 * - Escape closes the mobile step drawer when open.
 * - In RTL, ArrowLeft moves forward (next step) and ArrowRight moves backward (prev step).
 * - In LTR, ArrowRight moves forward and ArrowLeft moves backward.
 * - Home / End jump to first / last step.
 */
export function resolveFocusedStepKeyAction(
  key: string,
  options: {
    isRtl: boolean;
    currentIndex: number;
    totalSteps: number;
    isDrawerOpen: boolean;
  }
): FocusedStepKeyAction {
  const { isRtl, currentIndex, totalSteps, isDrawerOpen } = options;

  if (key === 'Escape' && isDrawerOpen) {
    return { type: 'close_drawer' };
  }

  if (totalSteps <= 1) {
    return { type: 'none' };
  }

  const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
  const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';

  if (key === nextKey) {
    const nextIdx = stepForward(currentIndex, totalSteps);
    return nextIdx !== currentIndex ? { type: 'go_to_step', index: nextIdx } : { type: 'none' };
  }

  if (key === prevKey) {
    const prevIdx = stepBackward(currentIndex, totalSteps);
    return prevIdx !== currentIndex ? { type: 'go_to_step', index: prevIdx } : { type: 'none' };
  }

  if (key === 'Home') {
    return currentIndex !== 0 ? { type: 'go_to_step', index: 0 } : { type: 'none' };
  }

  if (key === 'End') {
    const lastIdx = clampStepIndex(totalSteps - 1, totalSteps);
    return currentIndex !== lastIdx ? { type: 'go_to_step', index: lastIdx } : { type: 'none' };
  }

  return { type: 'none' };
}

/**
 * Computes real visited-step count strictly from valid unique indices within [0, totalSteps - 1].
 */
export function computeVisitedProgress(
  visitedIndices: Iterable<number>,
  totalSteps: number
): VisitedProgressState {
  const safeTotal = Number.isFinite(totalSteps) && totalSteps > 0 ? Math.floor(totalSteps) : 0;
  if (safeTotal === 0) {
    return { visitedCount: 0, totalSteps: 0, percent: 0 };
  }

  const validSet = new Set<number>();
  for (const idx of visitedIndices) {
    if (Number.isInteger(idx) && idx >= 0 && idx < safeTotal) {
      validSet.add(idx);
    }
  }

  const visitedCount = validSet.size;
  const percent = Math.round((visitedCount / safeTotal) * 100);
  return { visitedCount, totalSteps: safeTotal, percent };
}

/**
 * Parses real lesson prose into semantic paragraphs and clean bullet lists
 * without fabricating text or breaking mixed Persian/English sentences.
 */
export function parseLessonBlocks(rawText: string): ParsedLessonBlock[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ParsedLessonBlock[] = [];
  let currentBullets: ParsedBulletItem[] = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: 'bullet_list', items: currentBullets });
      currentBullets = [];
    }
  };

  for (const line of lines) {
    const bulletMatch = line.match(/^(?:[•\-*]|\d+[.)]|[۰-۹]+[.)])\s+(.+)$/);
    if (bulletMatch) {
      const content = bulletMatch[1].trim();
      const colonIdx = content.indexOf(':');
      if (colonIdx > 0 && colonIdx <= 60) {
        currentBullets.push({
          label: content.slice(0, colonIdx).trim(),
          text: content.slice(colonIdx + 1).trim()
        });
      } else {
        currentBullets.push({ text: content });
      }
    } else {
      flushBullets();
      blocks.push({ type: 'paragraph', text: line });
    }
  }

  flushBullets();
  return blocks;
}

/**
 * Formats integer step numbers cleanly for Persian or English UI.
 */
export function formatStepNumber(n: number, lang: 'fa' | 'en', padTwoDigits = false): string {
  const safe = Math.max(0, Math.floor(n));
  if (lang === 'en') {
    return padTwoDigits ? String(safe).padStart(2, '0') : String(safe);
  }
  const padded = padTwoDigits && safe < 10 ? `0${safe}` : String(safe);
  return padded.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

/**
 * Computes the target scrollTop inside a fixed-height step sidebar nav container
 * so the active step button stays visible without ever nudging outer page scroll.
 * Returns null if the active item is already fully within the visible window.
 */
export function computeSidebarScrollTop(params: {
  itemTop: number;
  itemHeight: number;
  scrollTop: number;
  containerHeight: number;
  padding?: number;
}): number | null {
  const { itemTop, itemHeight, scrollTop, containerHeight, padding = 10 } = params;
  if (containerHeight <= 0 || itemHeight <= 0) return null;

  const visibleTop = scrollTop + padding;
  const visibleBottom = scrollTop + containerHeight - padding;
  const itemBottom = itemTop + itemHeight;

  if (itemTop < visibleTop) {
    return Math.max(0, itemTop - padding);
  }
  if (itemBottom > visibleBottom) {
    return Math.max(0, itemBottom - containerHeight + padding);
  }
  return null;
}

/**
 * Returns a new Set with the visited step index recorded (only if non-negative integer).
 */
export function markStepVisited(
  visitedIndices: ReadonlySet<number>,
  stepIndex: number
): Set<number> {
  const next = new Set(visitedIndices);
  if (Number.isInteger(stepIndex) && stepIndex >= 0) {
    next.add(stepIndex);
  }
  return next;
}
