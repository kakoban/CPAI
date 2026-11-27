import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeExerciseDeckSummary,
  computeExerciseSelfCheckProgress,
  parseInlineCodeSegments,
  resolveInitialExerciseIndex
} from '../src/utils/exerciseDeckEngine';

test('computeExerciseDeckSummary aggregates done count, minutes, and completed indices accurately', () => {
  const exercises = [
    { id: 'ex_1', estimatedMinutes: 15 },
    { id: 'ex_2', estimatedMinutes: 20 },
    { id: 'ex_3', estimatedMinutes: 10 }
  ];

  const partial = computeExerciseDeckSummary(exercises, { ex_2: true });
  assert.equal(partial.totalCount, 3);
  assert.equal(partial.doneCount, 1);
  assert.equal(partial.totalMinutes, 45);
  assert.deepEqual([...partial.completedIndices], [1]);
  assert.equal(partial.allCompleted, false);

  const complete = computeExerciseDeckSummary(exercises, {
    ex_1: true,
    ex_2: true,
    ex_3: true
  });
  assert.equal(complete.doneCount, 3);
  assert.equal(complete.allCompleted, true);
  assert.deepEqual([...complete.completedIndices], [0, 1, 2]);
});

test('computeExerciseSelfCheckProgress counts ticked rubric criteria accurately', () => {
  const checks = {
    ex_1__0: true,
    ex_1__2: true,
    ex_2__0: true
  };

  assert.deepEqual(computeExerciseSelfCheckProgress('ex_1', 3, checks), {
    checkedCount: 2,
    totalCount: 3,
    allChecked: false
  });

  assert.deepEqual(computeExerciseSelfCheckProgress('ex_2', 1, checks), {
    checkedCount: 1,
    totalCount: 1,
    allChecked: true
  });

  assert.deepEqual(computeExerciseSelfCheckProgress('ex_none', 0, checks), {
    checkedCount: 0,
    totalCount: 0,
    allChecked: false
  });
});

test('resolveInitialExerciseIndex opens first incomplete exercise or falls back to 0', () => {
  const exercises = [{ id: 'ex_1' }, { id: 'ex_2' }, { id: 'ex_3' }];

  assert.equal(resolveInitialExerciseIndex([], {}), 0);
  assert.equal(resolveInitialExerciseIndex(exercises, {}), 0);
  assert.equal(resolveInitialExerciseIndex(exercises, { ex_1: true }), 1);
  assert.equal(resolveInitialExerciseIndex(exercises, { ex_1: true, ex_2: true }), 2);
  assert.equal(
    resolveInitialExerciseIndex(exercises, { ex_1: true, ex_2: true, ex_3: true }),
    0
  );
});

test('parseInlineCodeSegments splits backtick code tokens cleanly without dropping text', () => {
  assert.deepEqual(parseInlineCodeSegments(''), []);
  assert.deepEqual(parseInlineCodeSegments('متن ساده بدون کد'), [
    { type: 'text', value: 'متن ساده بدون کد' }
  ]);
  assert.deepEqual(
    parseInlineCodeSegments('فایل `SKILL.md` با فیلد `name` و `description`'),
    [
      { type: 'text', value: 'فایل ' },
      { type: 'code', value: 'SKILL.md' },
      { type: 'text', value: ' با فیلد ' },
      { type: 'code', value: 'name' },
      { type: 'text', value: ' و ' },
      { type: 'code', value: 'description' }
    ]
  );
});
