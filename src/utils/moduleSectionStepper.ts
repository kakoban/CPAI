export interface ModuleTopicAnchor {
  index: number;
  top: number;
  label: string;
}

export interface RawTopicAnchorInput {
  top: number;
  label: string;
}

export type IntraModuleNextAction =
  | { action: 'step'; targetIdx: number }
  | { action: 'finish_to_orbit' };

export interface IntraModulePrevAction {
  canStepPrev: boolean;
  targetIdx: number;
}

export interface OrbitSessionOutline {
  id: string;
  modules: Array<{ id: string }>;
}

/**
 * Deduplicate and sort vertical section anchors inside a scrollable module body
 * so Prev/Next clicks step cleanly across meaningful topic blocks within the same module.
 */
export function dedupeAndFilterSectionAnchors(
  rawAnchors: RawTopicAnchorInput[],
  minGapPx = 110
): ModuleTopicAnchor[] {
  const safeGap = Math.max(24, minGapPx);
  const valid = rawAnchors
    .filter((a) => Number.isFinite(a.top) && a.top >= 0)
    .map((a) => ({
      top: Math.max(0, Math.round(a.top)),
      label: (a.label || '').trim()
    }))
    .sort((a, b) => a.top - b.top);

  const deduped: ModuleTopicAnchor[] = [];
  for (const item of valid) {
    const prev = deduped[deduped.length - 1];
    if (!prev || item.top - prev.top >= safeGap) {
      deduped.push({
        index: deduped.length,
        top: item.top,
        label: item.label || `بخش ${deduped.length + 1}`
      });
    }
  }

  return deduped;
}

/**
 * Determine which topic index inside the current module is active based on scroll position.
 */
export function computeActiveSectionIndex(
  scrollTop: number,
  anchors: ModuleTopicAnchor[],
  scrollHeight: number,
  clientHeight: number,
  offsetPx = 64
): number {
  if (!anchors.length) return 0;
  if (anchors.length === 1) return 0;

  // If the user has reached the bottom of the inner module pane, snap to the last topic
  if (scrollHeight > 0 && clientHeight > 0 && scrollTop + clientHeight >= scrollHeight - 28) {
    return anchors.length - 1;
  }

  const probe = Math.max(0, scrollTop + offsetPx);
  let active = 0;
  for (let i = 0; i < anchors.length; i++) {
    if (anchors[i].top <= probe) {
      active = i;
    } else {
      break;
    }
  }
  return active;
}

/**
 * Compute action for the "Next" button inside a module:
 * - Steps to the next topic inside the SAME module while topics remain.
 * - On the final topic, returns 'finish_to_orbit' to exit back to the Circular Orbit Hub.
 */
export function computeIntraModuleNextAction(
  currentIdx: number,
  totalSections: number
): IntraModuleNextAction {
  const safeTotal = Math.max(0, Math.floor(totalSections));
  const safeIdx = Math.max(0, Math.floor(currentIdx));

  if (safeTotal <= 1 || safeIdx >= safeTotal - 1) {
    return { action: 'finish_to_orbit' };
  }
  return {
    action: 'step',
    targetIdx: safeIdx + 1
  };
}

/**
 * Compute action for the "Previous" button inside a module:
 * - Only moves backward within the SAME module and never jumps to a previous module.
 */
export function computeIntraModulePrevAction(currentIdx: number): IntraModulePrevAction {
  const safeIdx = Math.max(0, Math.floor(currentIdx));
  if (safeIdx <= 0) {
    return { canStepPrev: false, targetIdx: 0 };
  }
  return { canStepPrev: true, targetIdx: safeIdx - 1 };
}

/**
 * When finishing a module and returning to the Circular Orbit Hub, resolve which session
 * and module come next so the Orbit dial highlights the upcoming session automatically.
 */
export function resolveNextOrbitTargetAfterModule(
  sessions: OrbitSessionOutline[],
  currentModuleId: string
): { nextSessionId: string; nextModuleId: string; isCourseEnd: boolean } {
  const flat: Array<{ sessionId: string; moduleId: string }> = [];
  for (const s of sessions) {
    for (const m of s.modules) {
      flat.push({ sessionId: s.id, moduleId: m.id });
    }
  }
  if (!flat.length) {
    return { nextSessionId: 's1', nextModuleId: currentModuleId, isCourseEnd: true };
  }

  const idx = flat.findIndex((item) => item.moduleId === currentModuleId);
  if (idx < 0) {
    return { nextSessionId: flat[0].sessionId, nextModuleId: flat[0].moduleId, isCourseEnd: false };
  }
  if (idx >= flat.length - 1) {
    return { nextSessionId: flat[0].sessionId, nextModuleId: flat[0].moduleId, isCourseEnd: true };
  }
  const next = flat[idx + 1];
  return {
    nextSessionId: next.sessionId,
    nextModuleId: next.moduleId,
    isCourseEnd: false
  };
}
