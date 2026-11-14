import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRESENTER_SESSION_NOTES,
  getPresenterPageKey,
  getPresenterNoteForPage,
  saveCustomPresenterNote,
} from '../src/data/presenterNotes.ts';

test('getPresenterPageKey normalizes numeric pages, quiz, and landing fallback', () => {
  assert.equal(getPresenterPageKey(0), '0');
  assert.equal(getPresenterPageKey(1), '1');
  assert.equal(getPresenterPageKey(21), '21');
  assert.equal(getPresenterPageKey('quiz'), 'quiz');
  assert.equal(getPresenterPageKey('landing'), '0');
});

test('PRESENTER_SESSION_NOTES provides non-empty FA/EN notes for sessions 0..21 and quiz', () => {
  for (let i = 0; i <= 21; i++) {
    const note = getPresenterNoteForPage(i);
    assert.equal(note.sessionKey, String(i));
    assert.ok(note.focusFa.length > 10, `focusFa missing for page ${i}`);
    assert.ok(note.focusEn.length > 10, `focusEn missing for page ${i}`);
    assert.ok(note.classQuestionFa.length > 5, `classQuestionFa missing for page ${i}`);
    assert.ok(note.classQuestionEn.length > 5, `classQuestionEn missing for page ${i}`);
    assert.ok(note.pitfallFa.length > 5, `pitfallFa missing for page ${i}`);
    assert.ok(note.pitfallEn.length > 5, `pitfallEn missing for page ${i}`);
  }
  const quizNote = getPresenterNoteForPage('quiz');
  assert.equal(quizNote.sessionKey, 'quiz');
  assert.ok(PRESENTER_SESSION_NOTES['quiz'].pacingFa.length > 5);
});

test('saveCustomPresenterNote updates per-session note and prunes whitespace-only notes', () => {
  const initial: Record<string, string> = { '0': 'Intro demo note' };
  const afterAdd = saveCustomPresenterNote('1', 'Discuss ROI example with Team B', initial);
  assert.equal(afterAdd['0'], 'Intro demo note');
  assert.equal(afterAdd['1'], 'Discuss ROI example with Team B');
  assert.equal(initial['1'], undefined);

  const afterClear = saveCustomPresenterNote('1', '   ', afterAdd);
  assert.equal('1' in afterClear, false);
  assert.equal(afterClear['0'], 'Intro demo note');
});
