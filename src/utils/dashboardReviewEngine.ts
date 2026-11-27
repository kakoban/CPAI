import { ORBIT_MODULE_BY_ID, OrbitModuleCatalogItem } from '../data/orbitCurriculumCatalog';
import { getModuleExerciseDeck, ModuleExerciseDeck } from '../data/moduleExercises';

export interface DashboardModuleReviewPayload {
  module: OrbitModuleCatalogItem;
  exerciseDeck: ModuleExerciseDeck | null;
  positionIndex: number;
  totalReviewed: number;
  prevModuleId: string | null;
  nextModuleId: string | null;
}

/**
 * Builds the complete side-panel quick-review payload for a reviewed module,
 * including real catalog metadata, expected outcomes, practical exercises,
 * and prev/next navigation within the student's reviewed modules list.
 */
export function buildModuleReviewPayload(
  moduleId: string | null,
  reviewedModules: ReadonlyArray<OrbitModuleCatalogItem>
): DashboardModuleReviewPayload | null {
  if (!moduleId) return null;

  const catalogModule = ORBIT_MODULE_BY_ID[moduleId];
  if (!catalogModule) return null;

  const positionIndex = reviewedModules.findIndex((m) => m.id === moduleId);
  const totalReviewed = reviewedModules.length;
  const prevModuleId =
    positionIndex > 0 ? reviewedModules[positionIndex - 1].id : null;
  const nextModuleId =
    positionIndex >= 0 && positionIndex < totalReviewed - 1
      ? reviewedModules[positionIndex + 1].id
      : null;

  return {
    module: catalogModule,
    exerciseDeck: getModuleExerciseDeck(moduleId),
    positionIndex,
    totalReviewed,
    prevModuleId,
    nextModuleId
  };
}

/**
 * Toggles or switches the currently open reviewed module inside the dashboard side-panel.
 * Clicking the already-open module collapses the optional review panel cleanly;
 * clicking another module switches the review panel in place without leaving the dashboard.
 */
export function toggleReviewModuleSelection(
  currentModuleId: string | null,
  clickedModuleId: string
): string | null {
  if (!clickedModuleId) return currentModuleId;
  if (currentModuleId === clickedModuleId) {
    return null;
  }
  return clickedModuleId;
}

/**
 * Determines layered Escape-key behavior inside the User Dashboard:
 * closes the optional side review drawer first while keeping the dashboard open,
 * and only closes the dashboard when no review drawer is open.
 */
export function resolveDashboardEscapeAction(
  reviewModuleId: string | null
): 'close_review' | 'close_dashboard' {
  return reviewModuleId ? 'close_review' : 'close_dashboard';
}
