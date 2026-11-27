import { ModuleExerciseItem } from '../data/moduleExercises';

export interface ExerciseDeckSummary {
  totalCount: number;
  doneCount: number;
  totalMinutes: number;
  completedIndices: Set<number>;
  allCompleted: boolean;
}

export interface ExerciseSelfCheckSummary {
  checkedCount: number;
  totalCount: number;
  allChecked: boolean;
}

/**
 * Aggregates real completion count, total estimated minutes, and completed index Set
 * for any module exercise deck.
 */
export function computeExerciseDeckSummary(
  exercises: readonly Pick<ModuleExerciseItem, 'id' | 'estimatedMinutes'>[],
  completedMap: Record<string, boolean>
): ExerciseDeckSummary {
  const totalCount = exercises.length;
  const completedIndices = new Set<number>();
  let totalMinutes = 0;

  exercises.forEach((ex, idx) => {
    totalMinutes += Number.isFinite(ex.estimatedMinutes) ? Math.max(0, ex.estimatedMinutes) : 0;
    if (completedMap[ex.id]) {
      completedIndices.add(idx);
    }
  });

  const doneCount = completedIndices.size;
  return {
    totalCount,
    doneCount,
    totalMinutes,
    completedIndices,
    allCompleted: totalCount > 0 && doneCount === totalCount
  };
}

/**
 * Counts how many self-check rubric criteria have been ticked for a single exercise.
 */
export function computeExerciseSelfCheckProgress(
  exerciseId: string,
  criteriaCount: number,
  checksMap: Record<string, boolean>
): ExerciseSelfCheckSummary {
  const safeTotal = Number.isFinite(criteriaCount) && criteriaCount > 0 ? Math.floor(criteriaCount) : 0;
  let checkedCount = 0;
  for (let i = 0; i < safeTotal; i += 1) {
    if (checksMap[`${exerciseId}__${i}`]) {
      checkedCount += 1;
    }
  }
  return {
    checkedCount,
    totalCount: safeTotal,
    allChecked: safeTotal > 0 && checkedCount === safeTotal
  };
}

/**
 * Resolves the best starting exercise index when opening a module's exercise deck:
 * selects the first incomplete exercise, or 0 if all are completed or deck is empty.
 */
export function resolveInitialExerciseIndex(
  exercises: readonly Pick<ModuleExerciseItem, 'id'>[],
  completedMap: Record<string, boolean>
): number {
  if (exercises.length === 0) return 0;
  const firstIncomplete = exercises.findIndex((ex) => !completedMap[ex.id]);
  return firstIncomplete >= 0 ? firstIncomplete : 0;
}

export interface InlineCodeSegment {
  type: 'text' | 'code';
  value: string;
}

/**
 * Splits prose containing markdown backtick code spans (e.g. `SKILL.md`) into
 * structured text and code segments so UI can render clean inline <code> chips.
 */
export function parseInlineCodeSegments(raw: string): InlineCodeSegment[] {
  if (!raw) return [];
  const parts = raw.split(/(`[^`]+`)/g);
  const result: InlineCodeSegment[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      result.push({ type: 'code', value: part.slice(1, -1) });
    } else {
      result.push({ type: 'text', value: part });
    }
  }
  return result;
}

