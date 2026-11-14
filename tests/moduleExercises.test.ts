import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllModuleExerciseIds,
  getCompletedExercisesCountForModule,
  getModuleExerciseDeck,
  getTotalModuleExercisesCount
} from '../src/data/moduleExercises';

const ALL_EXPECTED_PAGE0_MODULES = [
  's1_demo',
  's1_drive',
  's1_markdown',
  's1_github',
  'prompt_definition',
  'prompting',
  'tools',
  'prompts_library',
  'advanced_features',
  'engineering_dashboards',
  'notebooklm',
  'hr_interactive_tools',
  'contracts_and_gems',
  'skills_lab',
  'mcp_lab',
  'connectors',
  'safety',
  'obsidian_brain',
  's5_orchestration',
  'masterclass',
  's5_vibecoding'
];

test('every Page 0 module (all 21) has a dedicated custom exercise deck', () => {
  const registeredIds = getAllModuleExerciseIds();
  for (const moduleId of ALL_EXPECTED_PAGE0_MODULES) {
    assert.ok(
      registeredIds.includes(moduleId),
      `Missing exercise deck for module: ${moduleId}`
    );
    const deck = getModuleExerciseDeck(moduleId);
    assert.ok(deck, `getModuleExerciseDeck returned null for ${moduleId}`);
    assert.equal(deck.moduleId, moduleId);
    assert.ok(deck.moduleTitleFa.trim().length > 4);
    assert.ok(deck.workshopGoalFa.trim().length > 10);
    assert.ok(
      deck.exercises.length >= 2,
      `Module ${moduleId} should have at least 2 practical exercises`
    );
  }
});

test('all exercises have unique IDs and complete custom fields', () => {
  const seenExerciseIds = new Set<string>();
  for (const moduleId of getAllModuleExerciseIds()) {
    const deck = getModuleExerciseDeck(moduleId)!;
    for (const ex of deck.exercises) {
      assert.ok(
        !seenExerciseIds.has(ex.id),
        `Duplicate exercise id detected: ${ex.id}`
      );
      seenExerciseIds.add(ex.id);
      assert.equal(ex.moduleId, moduleId);
      assert.ok(ex.titleFa.trim().length >= 8, `Empty titleFa in ${ex.id}`);
      assert.ok(ex.scenarioFa.trim().length >= 25, `Short scenarioFa in ${ex.id}`);
      assert.ok(ex.stepsFa.length >= 2, `Need >=2 steps in ${ex.id}`);
      assert.ok(ex.deliverableFa.trim().length >= 8, `Empty deliverable in ${ex.id}`);
      assert.ok(ex.promptStarterFa.trim().length >= 25, `Short starter prompt in ${ex.id}`);
      assert.ok(
        ex.selfCheckCriteriaFa.length >= 1,
        `Need self-check criteria in ${ex.id}`
      );
      assert.ok(ex.estimatedMinutes >= 5 && ex.estimatedMinutes <= 60);
    }
  }
  assert.ok(seenExerciseIds.size >= 42);
});

test('exercise completion counters return exact module counts', () => {
  assert.equal(getTotalModuleExercisesCount('s1_drive'), 2);
  assert.equal(getTotalModuleExercisesCount('unknown_module'), 0);

  const deck = getModuleExerciseDeck('notebooklm')!;
  const firstId = deck.exercises[0].id;
  assert.equal(getCompletedExercisesCountForModule('notebooklm', {}), 0);
  assert.equal(
    getCompletedExercisesCountForModule('notebooklm', { [firstId]: true }),
    1
  );
  const allDone = Object.fromEntries(deck.exercises.map((e) => [e.id, true]));
  assert.equal(
    getCompletedExercisesCountForModule('notebooklm', allDone),
    deck.exercises.length
  );
});
