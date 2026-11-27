import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampStepIndex,
  getStepBoundaryState,
  stepForward,
  stepBackward,
  resolveFocusedStepKeyAction,
  computeVisitedProgress,
  parseLessonBlocks,
  formatStepNumber,
  computeSidebarScrollTop
} from '../src/utils/focusedLessonEngine.ts';

test('clampStepIndex handles empty, negative, out-of-range, and valid step counts', () => {
  assert.equal(clampStepIndex(0, 0), 0);
  assert.equal(clampStepIndex(5, 0), 0);
  assert.equal(clampStepIndex(-3, 12), 0);
  assert.equal(clampStepIndex(0, 1), 0);
  assert.equal(clampStepIndex(4, 1), 0);
  assert.equal(clampStepIndex(5, 12), 5);
  assert.equal(clampStepIndex(99, 12), 11);
});

test('getStepBoundaryState enforces start/end boundaries for 0, 1, and N steps', () => {
  const empty = getStepBoundaryState(0, 0);
  assert.equal(empty.canGoPrev, false);
  assert.equal(empty.canGoNext, false);
  assert.equal(empty.stepNumber, 0);

  const single = getStepBoundaryState(0, 1);
  assert.equal(single.canGoPrev, false);
  assert.equal(single.canGoNext, false);
  assert.equal(single.isFirst, true);
  assert.equal(single.isLast, true);
  assert.equal(single.stepNumber, 1);

  const firstOf12 = getStepBoundaryState(0, 12);
  assert.equal(firstOf12.canGoPrev, false);
  assert.equal(firstOf12.canGoNext, true);
  assert.equal(firstOf12.stepNumber, 1);

  const middleOf12 = getStepBoundaryState(5, 12);
  assert.equal(middleOf12.canGoPrev, true);
  assert.equal(middleOf12.canGoNext, true);
  assert.equal(middleOf12.stepNumber, 6);

  const lastOf12 = getStepBoundaryState(11, 12);
  assert.equal(lastOf12.canGoPrev, true);
  assert.equal(lastOf12.canGoNext, false);
  assert.equal(lastOf12.isLast, true);
});

test('stepForward and stepBackward stay strictly within module step boundaries without wrapping', () => {
  assert.equal(stepBackward(0, 12), 0);
  assert.equal(stepBackward(3, 12), 2);
  assert.equal(stepForward(3, 12), 4);
  assert.equal(stepForward(11, 12), 11);
  assert.equal(stepForward(0, 1), 0);
});

test('resolveFocusedStepKeyAction respects RTL/LTR arrow direction, Home/End, and Escape drawer close', () => {
  // Escape closes drawer first
  assert.deepEqual(
    resolveFocusedStepKeyAction('Escape', {
      isRtl: true,
      currentIndex: 2,
      totalSteps: 12,
      isDrawerOpen: true
    }),
    { type: 'close_drawer' }
  );

  // RTL: ArrowLeft goes forward, ArrowRight goes backward
  assert.deepEqual(
    resolveFocusedStepKeyAction('ArrowLeft', {
      isRtl: true,
      currentIndex: 2,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 3 }
  );
  assert.deepEqual(
    resolveFocusedStepKeyAction('ArrowRight', {
      isRtl: true,
      currentIndex: 2,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 1 }
  );

  // LTR: ArrowRight goes forward, ArrowLeft goes backward
  assert.deepEqual(
    resolveFocusedStepKeyAction('ArrowRight', {
      isRtl: false,
      currentIndex: 2,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 3 }
  );
  assert.deepEqual(
    resolveFocusedStepKeyAction('ArrowLeft', {
      isRtl: false,
      currentIndex: 2,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 1 }
  );

  // Home / End
  assert.deepEqual(
    resolveFocusedStepKeyAction('Home', {
      isRtl: true,
      currentIndex: 6,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 0 }
  );
  assert.deepEqual(
    resolveFocusedStepKeyAction('End', {
      isRtl: true,
      currentIndex: 0,
      totalSteps: 12,
      isDrawerOpen: false
    }),
    { type: 'go_to_step', index: 11 }
  );
});

test('computeVisitedProgress deduplicates and filters invalid indices', () => {
  assert.deepEqual(computeVisitedProgress([0, 0, 2, -1, 99], 12), {
    visitedCount: 2,
    totalSteps: 12,
    percent: 17
  });
  assert.deepEqual(computeVisitedProgress([], 0), {
    visitedCount: 0,
    totalSteps: 0,
    percent: 0
  });
});

test('parseLessonBlocks splits Persian prose and bullet/numbered items cleanly', () => {
  const sample =
    'هر فایل SKILL.md از دو بخش تشکیل می‌شود:\n۱) سرصفحه YAML: شامل name و description.\n۲) بدنه Markdown: شامل نقش و گام‌ها.';
  const blocks = parseLessonBlocks(sample);

  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].type, 'paragraph');
  assert.equal(blocks[1].type, 'bullet_list');
  if (blocks[1].type === 'bullet_list') {
    assert.equal(blocks[1].items.length, 2);
    assert.equal(blocks[1].items[0].label, 'سرصفحه YAML');
    assert.equal(blocks[1].items[0].text, 'شامل name و description.');
  }
});

test('formatStepNumber formats Persian and English numerals with optional padding', () => {
  assert.equal(formatStepNumber(1, 'fa', true), '۰۱');
  assert.equal(formatStepNumber(12, 'fa', true), '۱۲');
  assert.equal(formatStepNumber(1, 'en', true), '01');
  assert.equal(formatStepNumber(5, 'fa', false), '۵');
});

test('computeSidebarScrollTop keeps active item inside sidebar without unnecessary scrolling', () => {
  assert.equal(
    computeSidebarScrollTop({ itemTop: 60, itemHeight: 50, scrollTop: 0, containerHeight: 300 }),
    null
  );
  assert.equal(
    computeSidebarScrollTop({ itemTop: 320, itemHeight: 50, scrollTop: 0, containerHeight: 300, padding: 10 }),
    80
  );
  assert.equal(
    computeSidebarScrollTop({ itemTop: 40, itemHeight: 50, scrollTop: 200, containerHeight: 300, padding: 10 }),
    30
  );
});

