import test from 'node:test';
import assert from 'node:assert/strict';
import { ORBIT_MODULES_CATALOG } from '../src/data/orbitCurriculumCatalog';
import {
  buildModuleReviewPayload,
  toggleReviewModuleSelection,
  resolveDashboardEscapeAction
} from '../src/utils/dashboardReviewEngine';

test('buildModuleReviewPayload builds real catalog + exercise payload for every catalog module', () => {
  for (const mod of ORBIT_MODULES_CATALOG) {
    const payload = buildModuleReviewPayload(mod.id, ORBIT_MODULES_CATALOG);
    assert.ok(payload, `Expected payload for module ${mod.id}`);
    assert.equal(payload.module.id, mod.id);
    assert.ok(payload.module.expectedOutcomesFa.length > 0);
    assert.ok(payload.exerciseDeck, `Expected exercise deck for module ${mod.id}`);
    assert.ok(payload.exerciseDeck.exercises.length > 0);
  }
});

test('buildModuleReviewPayload resolves prev/next neighbors accurately within reviewed modules', () => {
  const reviewed = ORBIT_MODULES_CATALOG.slice(4, 7); // prompt_definition, prompting, tools
  const first = buildModuleReviewPayload(reviewed[0].id, reviewed);
  assert.ok(first);
  assert.equal(first.positionIndex, 0);
  assert.equal(first.prevModuleId, null);
  assert.equal(first.nextModuleId, reviewed[1].id);

  const middle = buildModuleReviewPayload(reviewed[1].id, reviewed);
  assert.ok(middle);
  assert.equal(middle.positionIndex, 1);
  assert.equal(middle.prevModuleId, reviewed[0].id);
  assert.equal(middle.nextModuleId, reviewed[2].id);

  const last = buildModuleReviewPayload(reviewed[2].id, reviewed);
  assert.ok(last);
  assert.equal(last.positionIndex, 2);
  assert.equal(last.prevModuleId, reviewed[1].id);
  assert.equal(last.nextModuleId, null);

  assert.equal(buildModuleReviewPayload('non_existent_id', reviewed), null);
  assert.equal(buildModuleReviewPayload(null, reviewed), null);
});

test('toggleReviewModuleSelection switches smoothly and collapses when clicking active module', () => {
  assert.equal(toggleReviewModuleSelection(null, 'prompt_definition'), 'prompt_definition');
  assert.equal(toggleReviewModuleSelection('prompt_definition', 'prompting'), 'prompting');
  assert.equal(toggleReviewModuleSelection('prompting', 'prompting'), null);
});

test('resolveDashboardEscapeAction closes side review drawer before closing the dashboard', () => {
  assert.equal(resolveDashboardEscapeAction('prompt_definition'), 'close_review');
  assert.equal(resolveDashboardEscapeAction(null), 'close_dashboard');
});
