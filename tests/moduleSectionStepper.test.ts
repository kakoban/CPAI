import test from 'node:test';
import assert from 'node:assert/strict';
import {
  dedupeAndFilterSectionAnchors,
  computeActiveSectionIndex,
  computeIntraModuleNextAction,
  computeIntraModulePrevAction,
  resolveNextOrbitTargetAfterModule
} from '../src/utils/moduleSectionStepper';

test('dedupeAndFilterSectionAnchors sorts and collapses closely packed anchors', () => {
  const anchors = dedupeAndFilterSectionAnchors(
    [
      { top: 420, label: 'بخش ۲' },
      { top: 10, label: 'شروع' },
      { top: 45, label: 'زیرتیتر خیلی نزدیک' },
      { top: 960, label: 'بخش ۳' },
      { top: 470, label: 'کارت نزدیک به بخش ۲' }
    ],
    110
  );

  assert.equal(anchors.length, 3);
  assert.deepEqual(
    anchors.map((a) => a.top),
    [10, 420, 960]
  );
  assert.deepEqual(
    anchors.map((a) => a.index),
    [0, 1, 2]
  );
});

test('computeActiveSectionIndex tracks inner scroll and snaps to last topic at bottom', () => {
  const anchors = [
    { index: 0, top: 0, label: 'بخش ۱' },
    { index: 1, top: 400, label: 'بخش ۲' },
    { index: 2, top: 900, label: 'بخش ۳' }
  ];

  assert.equal(computeActiveSectionIndex(0, anchors, 1600, 600), 0);
  assert.equal(computeActiveSectionIndex(360, anchors, 1600, 600), 1);
  assert.equal(computeActiveSectionIndex(880, anchors, 1600, 600), 2);
  // Near bottom of scrollable pane snaps to final section even if last anchor top is lower
  assert.equal(computeActiveSectionIndex(990, anchors, 1600, 600), 2);
});

test('computeIntraModuleNextAction stays inside module then finishes to circular orbit on final topic', () => {
  assert.deepEqual(computeIntraModuleNextAction(0, 4), { action: 'step', targetIdx: 1 });
  assert.deepEqual(computeIntraModuleNextAction(2, 4), { action: 'step', targetIdx: 3 });
  assert.deepEqual(computeIntraModuleNextAction(3, 4), { action: 'finish_to_orbit' });
  assert.deepEqual(computeIntraModuleNextAction(0, 1), { action: 'finish_to_orbit' });
});

test('computeIntraModulePrevAction never exits module boundary', () => {
  assert.deepEqual(computeIntraModulePrevAction(0), { canStepPrev: false, targetIdx: 0 });
  assert.deepEqual(computeIntraModulePrevAction(1), { canStepPrev: true, targetIdx: 0 });
  assert.deepEqual(computeIntraModulePrevAction(3), { canStepPrev: true, targetIdx: 2 });
});

test('resolveNextOrbitTargetAfterModule rotates circular orbit to the next session when module finishes', () => {
  const sessions = [
    { id: 's1', modules: [{ id: 's1_demo' }, { id: 's1_markdown' }] },
    { id: 's2', modules: [{ id: 'hr_workshop' }, { id: 'notebooklm' }] }
  ];

  assert.deepEqual(resolveNextOrbitTargetAfterModule(sessions, 's1_demo'), {
    nextSessionId: 's1',
    nextModuleId: 's1_markdown',
    isCourseEnd: false
  });
  assert.deepEqual(resolveNextOrbitTargetAfterModule(sessions, 's1_markdown'), {
    nextSessionId: 's2',
    nextModuleId: 'hr_workshop',
    isCourseEnd: false
  });
  assert.deepEqual(resolveNextOrbitTargetAfterModule(sessions, 'notebooklm'), {
    nextSessionId: 's1',
    nextModuleId: 's1_demo',
    isCourseEnd: true
  });
});
