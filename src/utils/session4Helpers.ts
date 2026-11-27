export type ConnectorCategoryFilter = 'all' | 'google' | 'team';

export interface ConnectorMatrixRow {
  id: string;
  category: 'google' | 'team';
  nameFa: string;
  nameEn: string;
  scopeFa: string;
  scopeEn: string;
  planOrPathFa: string;
  planOrPathEn: string;
  guardrailFa: string;
  guardrailEn: string;
  docsUrl: string;
  docsLabelFa: string;
  docsLabelEn: string;
}

export interface SafetyChecklistItem {
  id: string;
  pillarId: 'pat_mcp' | 'privacy_pii' | 'hallucination';
  titleFa: string;
  titleEn: string;
  detailFa: string;
  detailEn: string;
}

export interface ChecklistReadiness {
  checkedCount: number;
  totalCount: number;
  percent: number;
  isFullyReady: boolean;
}

export function filterConnectorRows<T extends { category: 'google' | 'team' }>(
  rows: readonly T[],
  filter: ConnectorCategoryFilter
): T[] {
  if (filter === 'all') return [...rows];
  return rows.filter((row) => row.category === filter);
}

export function toggleChecklistItem(
  checkedIds: ReadonlySet<string>,
  itemId: string
): Set<string> {
  const next = new Set(checkedIds);
  if (next.has(itemId)) {
    next.delete(itemId);
  } else {
    next.add(itemId);
  }
  return next;
}

export function computeChecklistReadiness(
  checkedIds: ReadonlySet<string>,
  validItemIds: readonly string[]
): ChecklistReadiness {
  const totalCount = validItemIds.length;
  if (totalCount === 0) {
    return { checkedCount: 0, totalCount: 0, percent: 0, isFullyReady: false };
  }
  let checkedCount = 0;
  for (const id of validItemIds) {
    if (checkedIds.has(id)) checkedCount += 1;
  }
  const percent = Math.round((checkedCount / totalCount) * 100);
  return {
    checkedCount,
    totalCount,
    percent,
    isFullyReady: checkedCount === totalCount
  };
}

export function countCheckedInPillar(
  checkedIds: ReadonlySet<string>,
  items: readonly SafetyChecklistItem[],
  pillarId: SafetyChecklistItem['pillarId']
): { checked: number; total: number } {
  let checked = 0;
  let total = 0;
  for (const item of items) {
    if (item.pillarId === pillarId) {
      total += 1;
      if (checkedIds.has(item.id)) checked += 1;
    }
  }
  return { checked, total };
}
