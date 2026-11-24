import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PeerCandidateDescriptor,
  areSizesComparable,
  computeStructuralSimilarity,
  extractStructuralClasses,
  resolvePeerStepDelta,
  selectPeerIds
} from '../src/utils/spotlightPeers';

test('extractStructuralClasses strips state and color variants while keeping structural layout classes', () => {
  const activeCard = extractStructuralClasses([
    'p-3.5',
    'rounded-xl',
    'bg-[#1f5163]',
    'text-white',
    'border',
    'border-[#1f5163]',
    'space-y-1',
    'dark:bg-[#16101c]'
  ]);
  const inactiveCard = extractStructuralClasses([
    'p-3.5',
    'rounded-xl',
    'bg-[#fdf8f5]',
    'text-[#261a1d]',
    'border',
    'border-[#ecdcd8]',
    'space-y-1',
    'hover:border-[#1f5163]'
  ]);

  assert.equal(computeStructuralSimilarity(activeCard, inactiveCard), 1);
  assert.ok(activeCard.has('p-3.5'));
  assert.ok(activeCard.has('rounded-xl'));
  assert.ok(!activeCard.has('bg-[#1f5163]'));
});

test('areSizesComparable matches same-size peer cards and rejects vastly larger containers', () => {
  assert.equal(
    areSizesComparable({ width: 240, height: 120 }, { width: 240, height: 150 }, 'sibling'),
    true
  );
  assert.equal(
    areSizesComparable({ width: 240, height: 120 }, { width: 1180, height: 120 }, 'sibling'),
    false
  );
  assert.equal(
    areSizesComparable({ width: 240, height: 120 }, { width: 250, height: 135 }, 'container'),
    true
  );
  assert.equal(
    areSizesComparable({ width: 240, height: 120 }, { width: 520, height: 120 }, 'container'),
    false
  );
});

test('selectPeerIds finds all 5 direct sibling step cards and excludes unrelated wide header sibling', () => {
  const candidates: PeerCandidateDescriptor[] = [
    {
      id: 'header',
      tagName: 'DIV',
      classNames: ['flex', 'items-center', 'justify-between', 'pb-3', 'border-b'],
      width: 1120,
      height: 64,
      parentId: 'grid_1',
      grandParentId: 'sec_1'
    },
    ...[1, 2, 3, 4, 5].map((n) => ({
      id: `step_${n}`,
      tagName: 'DIV',
      classNames: ['p-3.5', 'rounded-xl', 'bg-[#fdf8f5]', 'border', 'space-y-1'],
      width: 215,
      height: n === 3 ? 148 : 124,
      parentId: 'grid_1',
      grandParentId: 'sec_1'
    }))
  ];

  const result = selectPeerIds('step_5', candidates);
  assert.deepEqual(result.peerIds, ['step_1', 'step_2', 'step_3', 'step_4', 'step_5']);
  assert.equal(result.currentIndex, 4);
});

test('selectPeerIds finds 1-level wrapped cousin cards under a shared grandparent', () => {
  const candidates: PeerCandidateDescriptor[] = [1, 2, 3].map((n) => ({
    id: `card_${n}`,
    tagName: 'ARTICLE',
    classNames: ['p-4', 'rounded-xl', 'border', 'space-y-2.5'],
    width: 480,
    height: 170 + n * 10,
    parentId: `wrapper_${n}`,
    grandParentId: 'grid_root'
  }));

  const res = selectPeerIds('card_2', candidates);
  assert.deepEqual(res.peerIds, ['card_1', 'card_2', 'card_3']);
  assert.equal(res.currentIndex, 1);
});

test('selectPeerIds falls back to container-wide same-component peers while ignoring ancestors/descendants', () => {
  const candidates: PeerCandidateDescriptor[] = [
    {
      id: 'outer_wrapper',
      tagName: 'DIV',
      classNames: ['p-4', 'rounded-xl', 'border', 'space-y-2'],
      width: 480,
      height: 180,
      parentId: 'root',
      grandParentId: null,
      isAncestorOrDescendantOfTarget: true
    },
    {
      id: 'sec_a_card',
      tagName: 'DIV',
      classNames: ['p-4', 'rounded-xl', 'border', 'space-y-2'],
      width: 480,
      height: 175,
      parentId: 'sec_a',
      grandParentId: 'root'
    },
    {
      id: 'sec_b_card',
      tagName: 'DIV',
      classNames: ['p-4', 'rounded-xl', 'border', 'space-y-2'],
      width: 476,
      height: 190,
      parentId: 'sec_b',
      grandParentId: 'root'
    }
  ];

  const res = selectPeerIds('sec_a_card', candidates);
  assert.deepEqual(res.peerIds, ['sec_a_card', 'sec_b_card']);
  assert.equal(res.currentIndex, 0);
});

test('resolvePeerStepDelta respects RTL and LTR arrow directions', () => {
  // RTL: ArrowLeft advances forward (Next), ArrowRight goes backward (Prev)
  assert.equal(resolvePeerStepDelta('ArrowLeft', 'rtl'), 1);
  assert.equal(resolvePeerStepDelta('ArrowRight', 'rtl'), -1);

  // LTR: ArrowRight advances forward (Next), ArrowLeft goes backward (Prev)
  assert.equal(resolvePeerStepDelta('ArrowRight', 'ltr'), 1);
  assert.equal(resolvePeerStepDelta('ArrowLeft', 'ltr'), -1);

  assert.equal(resolvePeerStepDelta('ArrowDown', 'rtl'), 1);
  assert.equal(resolvePeerStepDelta('ArrowUp', 'rtl'), -1);
  assert.equal(resolvePeerStepDelta('Enter', 'rtl'), 0);
});
