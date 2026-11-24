export interface PeerCandidateDescriptor {
  id: string;
  tagName: string;
  classNames: string[];
  width: number;
  height: number;
  parentId: string | null;
  grandParentId: string | null;
  spotlightGroup?: string | null;
  isAncestorOrDescendantOfTarget?: boolean;
}

const STATE_OR_COLOR_PREFIXES = [
  'bg-',
  'text-',
  'border-slate',
  'border-gray',
  'border-zinc',
  'border-neutral',
  'border-stone',
  'border-red',
  'border-orange',
  'border-amber',
  'border-yellow',
  'border-lime',
  'border-green',
  'border-emerald',
  'border-teal',
  'border-cyan',
  'border-sky',
  'border-blue',
  'border-indigo',
  'border-violet',
  'border-purple',
  'border-fuchsia',
  'border-pink',
  'border-rose',
  'border-white',
  'border-black',
  'border-[#',
  'ring-',
  'shadow-',
  'opacity-',
  'from-',
  'via-',
  'to-',
  'hover:',
  'focus:',
  'focus-visible:',
  'active:',
  'dark:',
  'group-hover:',
  'disabled:',
  'animate-',
  'transition'
];

/**
 * Keeps structural/layout component classes (padding, radius, flex/grid, spacing, border presence)
 * while ignoring state/theme/color variants so active vs inactive peer cards still match.
 */
export function extractStructuralClasses(classNames: string[]): Set<string> {
  const result = new Set<string>();
  for (const raw of classNames) {
    const token = raw.trim();
    if (!token) continue;
    const isStateOrColor = STATE_OR_COLOR_PREFIXES.some((prefix) => token.startsWith(prefix));
    if (isStateOrColor) continue;
    result.add(token);
  }
  return result;
}

export function computeStructuralSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function areSizesComparable(
  target: { width: number; height: number },
  candidate: { width: number; height: number },
  mode: 'sibling' | 'container'
): boolean {
  if (target.width <= 0 || target.height <= 0 || candidate.width <= 0 || candidate.height <= 0) {
    return false;
  }
  const widthRatio = candidate.width / target.width;
  const heightRatio = candidate.height / target.height;

  if (mode === 'sibling') {
    // Sibling cards in responsive grids/flex rows can vary slightly in height due to text wrap
    return widthRatio >= 0.58 && widthRatio <= 1.72 && heightRatio >= 0.45 && heightRatio <= 2.25;
  }

  // Container-wide fallback requires tighter dimensional parity so unrelated huge/tiny blocks never mix
  return widthRatio >= 0.72 && widthRatio <= 1.38 && heightRatio >= 0.52 && heightRatio <= 1.9;
}

/**
 * Pure peer-group matcher operating on descriptors (used by both unit tests and the DOM adapter).
 * Priority order:
 * 1. Explicit data-spotlight-group match (if present)
 * 2. Direct siblings under the same parent with matching tag, structural classes & comparable size
 * 3. 1-level cousins (e.g. cards inside wrapper grid items under the same grandparent)
 * 4. Same-component, same-size peers anywhere inside the spotlight root container
 */
export function selectPeerIds(
  targetId: string,
  candidates: PeerCandidateDescriptor[]
): { peerIds: string[]; currentIndex: number } {
  const target = candidates.find((c) => c.id === targetId);
  if (!target) {
    return { peerIds: [], currentIndex: -1 };
  }

  // 1. Explicit spotlight group
  if (target.spotlightGroup) {
    const grouped = candidates
      .filter((c) => c.spotlightGroup === target.spotlightGroup)
      .map((c) => c.id);
    if (grouped.length >= 2) {
      return { peerIds: grouped, currentIndex: grouped.indexOf(targetId) };
    }
  }

  const targetTag = target.tagName.toLowerCase();
  const targetStruct = extractStructuralClasses(target.classNames);

  // 2. Direct siblings under the same parent
  if (target.parentId) {
    const siblings = candidates.filter((c) => {
      if (c.id === targetId) return true;
      if (c.parentId !== target.parentId) return false;
      if (c.tagName.toLowerCase() !== targetTag) return false;
      if (!areSizesComparable(target, c, 'sibling')) return false;
      const sim = computeStructuralSimilarity(targetStruct, extractStructuralClasses(c.classNames));
      return sim >= 0.45;
    });
    if (siblings.length >= 2) {
      const peerIds = siblings.map((c) => c.id);
      return { peerIds, currentIndex: peerIds.indexOf(targetId) };
    }
  }

  // 3. One-level wrapped cousins under the same grandparent
  if (target.grandParentId) {
    const cousins = candidates.filter((c) => {
      if (c.id === targetId) return true;
      if (c.grandParentId !== target.grandParentId) return false;
      if (c.parentId === target.parentId) return false;
      if (c.isAncestorOrDescendantOfTarget) return false;
      if (c.tagName.toLowerCase() !== targetTag) return false;
      if (!areSizesComparable(target, c, 'sibling')) return false;
      const sim = computeStructuralSimilarity(targetStruct, extractStructuralClasses(c.classNames));
      return sim >= 0.55;
    });
    if (cousins.length >= 2) {
      const peerIds = cousins.map((c) => c.id);
      return { peerIds, currentIndex: peerIds.indexOf(targetId) };
    }
  }

  // 4. Container-wide fallback: same tag + high structural similarity + tight size parity
  const containerPeers = candidates.filter((c) => {
    if (c.id === targetId) return true;
    if (c.isAncestorOrDescendantOfTarget) return false;
    if (c.tagName.toLowerCase() !== targetTag) return false;
    if (!areSizesComparable(target, c, 'container')) return false;
    const sim = computeStructuralSimilarity(targetStruct, extractStructuralClasses(c.classNames));
    return sim >= 0.6;
  });

  if (containerPeers.length >= 2) {
    const peerIds = containerPeers.map((c) => c.id);
    return { peerIds, currentIndex: peerIds.indexOf(targetId) };
  }

  return { peerIds: [targetId], currentIndex: 0 };
}

/**
 * Resolves keyboard arrow keys into a peer index delta (+1 = next, -1 = prev) respecting RTL vs LTR.
 */
export function resolvePeerStepDelta(key: string, direction: 'rtl' | 'ltr'): -1 | 0 | 1 {
  if (key === 'ArrowDown' || key === 'PageDown') return 1;
  if (key === 'ArrowUp' || key === 'PageUp') return -1;
  if (direction === 'rtl') {
    if (key === 'ArrowLeft') return 1;
    if (key === 'ArrowRight') return -1;
  } else {
    if (key === 'ArrowRight') return 1;
    if (key === 'ArrowLeft') return -1;
  }
  return 0;
}

/**
 * DOM adapter: collects peer HTMLElements in document reading order matching the selected spotlight element.
 */
export function findMatchingDomPeers(
  target: HTMLElement,
  root: HTMLElement
): { peers: HTMLElement[]; currentIndex: number } {
  if (!root.contains(target)) {
    return { peers: [target], currentIndex: 0 };
  }

  const parentMap = new WeakMap<Node, string>();
  let nextParentUid = 1;
  const getParentUid = (node: Node | null): string | null => {
    if (!node) return null;
    let uid = parentMap.get(node);
    if (!uid) {
      uid = `p_${nextParentUid++}`;
      parentMap.set(node, uid);
    }
    return uid;
  };

  const targetTag = target.tagName.toLowerCase();
  const explicitGroup = target.getAttribute('data-spotlight-group');

  // Gather candidate DOM elements of the same tag (or explicit group) inside root
  const rawElements: HTMLElement[] = [];
  if (explicitGroup) {
    root.querySelectorAll<HTMLElement>(`[data-spotlight-group="${explicitGroup}"]`).forEach((el) => {
      if (!el.closest('[data-spotlight-ignore="true"]')) rawElements.push(el);
    });
  } else {
    root.querySelectorAll<HTMLElement>(targetTag).forEach((el) => {
      if (!el.closest('[data-spotlight-ignore="true"]')) rawElements.push(el);
    });
  }

  if (!rawElements.includes(target)) {
    rawElements.push(target);
  }

  const idToElement = new Map<string, HTMLElement>();
  const descriptors: PeerCandidateDescriptor[] = [];

  rawElements.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    // Skip hidden/collapsed elements (except target itself)
    if (el !== target && (rect.width < 40 || rect.height < 24)) return;

    const uid = `el_${idx}`;
    idToElement.set(uid, el);

    const isAncestorOrDescendant =
      el !== target && (el.contains(target) || target.contains(el));

    descriptors.push({
      id: uid,
      tagName: el.tagName,
      classNames: Array.from(el.classList),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      parentId: getParentUid(el.parentElement),
      grandParentId: getParentUid(el.parentElement?.parentElement ?? null),
      spotlightGroup: el.getAttribute('data-spotlight-group'),
      isAncestorOrDescendantOfTarget: isAncestorOrDescendant
    });
  });

  const targetEntry = Array.from(idToElement.entries()).find(([, el]) => el === target);
  if (!targetEntry) {
    return { peers: [target], currentIndex: 0 };
  }

  const { peerIds, currentIndex } = selectPeerIds(targetEntry[0], descriptors);
  const peers = peerIds
    .map((id) => idToElement.get(id))
    .filter((el): el is HTMLElement => Boolean(el));

  return {
    peers: peers.length > 0 ? peers : [target],
    currentIndex: currentIndex >= 0 ? currentIndex : 0
  };
}
