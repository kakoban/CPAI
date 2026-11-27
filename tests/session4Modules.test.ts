import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SafetyChecklistItem,
  computeChecklistReadiness,
  countCheckedInPillar,
  filterConnectorRows,
  toggleChecklistItem
} from '../src/utils/session4Helpers';

test('filterConnectorRows returns all, google-only, or team-only rows accurately', () => {
  const rows = [
    { id: 'gmail', category: 'google' as const },
    { id: 'drive', category: 'google' as const },
    { id: 'calendar', category: 'google' as const },
    { id: 'slack', category: 'team' as const },
    { id: 'notion', category: 'team' as const }
  ];

  assert.equal(filterConnectorRows(rows, 'all').length, 5);
  assert.deepEqual(
    filterConnectorRows(rows, 'google').map((r) => r.id),
    ['gmail', 'drive', 'calendar']
  );
  assert.deepEqual(
    filterConnectorRows(rows, 'team').map((r) => r.id),
    ['slack', 'notion']
  );
});

test('toggleChecklistItem adds and removes IDs immutably', () => {
  const initial = new Set<string>(['pat_no_chat']);
  const added = toggleChecklistItem(initial, 'pat_fine_grained');
  assert.equal(initial.size, 1);
  assert.equal(added.has('pat_fine_grained'), true);
  assert.equal(added.size, 2);

  const removed = toggleChecklistItem(added, 'pat_no_chat');
  assert.equal(removed.has('pat_no_chat'), false);
  assert.equal(removed.size, 1);
});

test('computeChecklistReadiness ignores unknown IDs and detects full readiness', () => {
  const validIds = ['a', 'b', 'c', 'd'];

  assert.deepEqual(computeChecklistReadiness(new Set(['unknown']), validIds), {
    checkedCount: 0,
    totalCount: 4,
    percent: 0,
    isFullyReady: false
  });

  assert.deepEqual(computeChecklistReadiness(new Set(['a', 'c', 'unknown']), validIds), {
    checkedCount: 2,
    totalCount: 4,
    percent: 50,
    isFullyReady: false
  });

  assert.deepEqual(computeChecklistReadiness(new Set(validIds), validIds), {
    checkedCount: 4,
    totalCount: 4,
    percent: 100,
    isFullyReady: true
  });
});

test('countCheckedInPillar aggregates counts per security pillar accurately', () => {
  const items: SafetyChecklistItem[] = [
    { id: 'p1', pillarId: 'pat_mcp', titleFa: '', titleEn: '', detailFa: '', detailEn: '' },
    { id: 'p2', pillarId: 'pat_mcp', titleFa: '', titleEn: '', detailFa: '', detailEn: '' },
    { id: 'r1', pillarId: 'privacy_pii', titleFa: '', titleEn: '', detailFa: '', detailEn: '' },
    { id: 'h1', pillarId: 'hallucination', titleFa: '', titleEn: '', detailFa: '', detailEn: '' }
  ];

  const checked = new Set(['p1', 'h1']);
  assert.deepEqual(countCheckedInPillar(checked, items, 'pat_mcp'), { checked: 1, total: 2 });
  assert.deepEqual(countCheckedInPillar(checked, items, 'privacy_pii'), { checked: 0, total: 1 });
  assert.deepEqual(countCheckedInPillar(checked, items, 'hallucination'), { checked: 1, total: 1 });
});
