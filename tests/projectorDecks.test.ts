import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getPage0ModuleProjectorDeck,
  getCpmaiPageProjectorDeck
} from '../src/data/projectorDecks';

const PAGE0_NEW_COVERED_MODULES = [
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
  'masterclass'
];

test('Every remaining Page 0 module provides a valid multi-slide projector deck', () => {
  for (const modId of PAGE0_NEW_COVERED_MODULES) {
    const bundle = getPage0ModuleProjectorDeck(modId, 'مهندسی تست');
    assert.ok(bundle, `Expected projector deck for module ${modId}`);
    assert.ok(bundle.deckTitleFa.trim().length > 5, `Deck title empty for ${modId}`);
    assert.ok(bundle.slides.length >= 3, `Expected >= 3 slides for ${modId}, got ${bundle.slides.length}`);
    for (const slide of bundle.slides) {
      assert.ok(slide.stepNumber.trim().length > 0, `Missing stepNumber in ${modId}`);
      assert.ok(slide.badgeFa.trim().length > 0, `Missing badgeFa in ${modId}`);
      assert.ok(slide.titleFa.trim().length > 5, `Missing titleFa in ${modId}`);
      assert.ok(slide.pointsFa.length >= 2, `Expected >= 2 bullet points in ${modId}`);
    }
  }
});

test('All CPMAI Workbook pages 1..21 provide rich 3-slide projector decks', () => {
  const seenTitles = new Set<string>();
  for (let page = 1; page <= 21; page++) {
    const bundle = getCpmaiPageProjectorDeck(
      page,
      `جلسه ${page}: عنوان تستی`,
      'گروه آزمایشی',
      `Session ${page}`
    );
    assert.equal(bundle.slides.length, 3, `Expected 3 slides for CPMAI page ${page}`);
    for (const slide of bundle.slides) {
      assert.ok(slide.titleFa.trim().length > 3);
      assert.ok(slide.pointsFa.length === 3);
    }
    const firstPoint = bundle.slides[0].pointsFa[0];
    assert.ok(!seenTitles.has(firstPoint), `Duplicate focus note detected on page ${page}`);
    seenTitles.add(firstPoint);
  }
});
