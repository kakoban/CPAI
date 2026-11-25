import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MONTHLY_AI_QUOTA_LIMIT,
  AI_GUIDED_TOPICS,
  getTehranMonthKey,
  getNextTehranMonthResetLabelFa,
  computeAiQuotaState,
  normalizeAiQuestionText,
  buildNormalizedQuestionKey,
  computeQuestionSimilarity,
  findBestMatchingQa,
  isPersonalDraftAuditQuestion
} from '../src/utils/aiQuotaEngine';

test('getTehranMonthKey respects Asia/Tehran (+03:30) month boundary crossover', () => {
  assert.equal(getTehranMonthKey('2026-11-30T21:00:00Z'), '2026-12');
  assert.equal(getTehranMonthKey('2026-11-30T18:00:00Z'), '2026-11');
});

test('computeAiQuotaState enforces 5 non-duplicate monthly prompts for students and unlimited for admins', () => {
  assert.equal(MONTHLY_AI_QUOTA_LIMIT, 5);

  const fresh = computeAiQuotaState(0, false, 5, '2026-11-24T12:00:00Z');
  assert.equal(fresh.used, 0);
  assert.equal(fresh.remaining, 5);
  assert.equal(fresh.isExhausted, false);
  assert.equal(fresh.statusTone, 'healthy');
  assert.equal(fresh.usagePct, 0);
  assert.equal(fresh.monthKey, '2026-11');

  const low = computeAiQuotaState(3, false, 5, '2026-11-24T12:00:00Z');
  assert.equal(low.remaining, 2);
  assert.equal(low.isExhausted, false);
  assert.equal(low.statusTone, 'low');
  assert.equal(low.usagePct, 60);

  const exhausted = computeAiQuotaState(5, false, 5, '2026-11-24T12:00:00Z');
  assert.equal(exhausted.remaining, 0);
  assert.equal(exhausted.isExhausted, true);
  assert.equal(exhausted.statusTone, 'exhausted');
  assert.equal(exhausted.usagePct, 100);

  const over = computeAiQuotaState(8, false, 5, '2026-11-24T12:00:00Z');
  assert.equal(over.remaining, 0);
  assert.equal(over.isExhausted, true);
  assert.equal(over.usagePct, 100);

  const admin = computeAiQuotaState(18, true, 5, '2026-11-24T12:00:00Z');
  assert.equal(admin.isUnlimited, true);
  assert.equal(admin.isExhausted, false);
  assert.equal(admin.remaining, 5);
  assert.equal(admin.statusTone, 'healthy');
});

test('Persian/Arabic question normalization and semantic matching detect duplicates and shared Q&A hits', () => {
  const q1 = 'تفاوت AI Skill با MCP Connector به زبان ساده چیست؟';
  const q2 = 'تفاوت ai skill با mcp connector به زبان ساده چيست';
  const q2StopwordVariant = 'تفاوت ai skill و mcp connector به زبان ساده چيست؟';
  const q3 = 'لطفاً تفاوت AI Skill با MCP Connector را توضیح بده';
  const unrelated = 'فرمول محاسبه نرخ بازگشت سرمایه ROI در فاز اول CPMAI چیست؟';

  assert.equal(normalizeAiQuestionText(q1), normalizeAiQuestionText(q2));
  assert.equal(buildNormalizedQuestionKey(q1), buildNormalizedQuestionKey(q2));
  assert.equal(buildNormalizedQuestionKey(q1), buildNormalizedQuestionKey(q2StopwordVariant));
  assert.equal(computeQuestionSimilarity(q1, q2), 1);
  assert.equal(computeQuestionSimilarity(q1, q2StopwordVariant), 1);

  const paraphraseScore = computeQuestionSimilarity(q1, q3);
  assert.ok(paraphraseScore >= 0.72, `Expected paraphrase similarity >= 0.72, got ${paraphraseScore}`);

  const unrelatedScore = computeQuestionSimilarity(q1, unrelated);
  assert.ok(unrelatedScore < 0.3, `Expected unrelated similarity < 0.3, got ${unrelatedScore}`);

  const bank = [
    { id: 1, questionText: q1, answerText: 'پاسخ مشترک آماده درباره Skill و MCP' },
    { id: 2, questionText: unrelated, answerText: 'پاسخ مشترک درباره ROI' }
  ];
  const hit = findBestMatchingQa(q3, bank, (item) => item.questionText, 0.72);
  assert.ok(hit);
  assert.equal(hit?.item.id, 1);
});

test('isPersonalDraftAuditQuestion skips shared cache only when auditing a real personal draft', () => {
  assert.equal(isPersonalDraftAuditQuestion('پیش‌نویس من در این صفحه را ممیزی کن', ''), false);
  assert.equal(
    isPersonalDraftAuditQuestion(
      'پیش‌نویس من در این صفحه را ممیزی کن',
      'این یک متن کافی برای پیش‌نویس پروژه مهندسی در کتاب‌کار است.'
    ),
    true
  );
  assert.equal(
    isPersonalDraftAuditQuestion(
      'تفاوت Markdown با Word چیست؟',
      'این یک متن کافی برای پیش‌نویس پروژه مهندسی در کتاب‌کار است.'
    ),
    false
  );
});

test('getNextTehranMonthResetLabelFa and AI_GUIDED_TOPICS return complete localized metadata', () => {
  const resetFa = getNextTehranMonthResetLabelFa('2026-11-24T12:00:00Z');
  assert.ok(resetFa.length > 4);
  assert.ok(AI_GUIDED_TOPICS.length >= 6);
  for (const topic of AI_GUIDED_TOPICS) {
    assert.ok(topic.id && topic.labelFa && topic.promptFa);
  }
});
