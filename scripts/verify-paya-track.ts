import assert from 'node:assert/strict';
import * as trackTypes from '../src/types/industryTrack.ts';
import * as disciplineReg from '../src/data/disciplineExamplesRegistry.ts';
import * as domainExamples from '../src/data/domainTrackExamples.ts';
import * as quizData from '../src/data/placement_quiz_data.ts';

// Task 1 Assertions
assert.ok(
  Object.keys(trackTypes.INDUSTRY_TRACKS).includes('PAYA_SAMAN_PARS'),
  'INDUSTRY_TRACKS must include PAYA_SAMAN_PARS'
);

const payaTrack = (trackTypes.INDUSTRY_TRACKS as Record<string, any>).PAYA_SAMAN_PARS;
assert.equal(payaTrack.shortTitleFa, 'پایا سامان پارس');
assert.equal(payaTrack.iconName, 'Landmark');

// Node safety & non-Paya default isolation
assert.equal(trackTypes.getSavedIndustryTrack(), 'CIVIL_INFRA');

// URL entry resolution
assert.equal(typeof (trackTypes as any).resolveTrackFromUrl, 'function', 'resolveTrackFromUrl must be exported');
assert.equal((trackTypes as any).resolveTrackFromUrl('/paya', ''), 'PAYA_SAMAN_PARS');
assert.equal((trackTypes as any).resolveTrackFromUrl('/paya-saman-pars', ''), 'PAYA_SAMAN_PARS');
assert.equal((trackTypes as any).resolveTrackFromUrl('/', '?track=paya'), 'PAYA_SAMAN_PARS');
assert.equal((trackTypes as any).resolveTrackFromUrl('/', '?track=PAYA_SAMAN_PARS'), 'PAYA_SAMAN_PARS');
assert.equal((trackTypes as any).resolveTrackFromUrl('/', ''), null);

// 8 Paya disciplines across 3 groups
const payaDisciplines = disciplineReg.getDisciplinesByTrack('PAYA_SAMAN_PARS' as any);
assert.equal(payaDisciplines.length, 8, 'PAYA_SAMAN_PARS must have 8 disciplines');
const payaGroups = new Set(payaDisciplines.map((d) => d.groupFa));
assert.equal(payaGroups.size, 3, 'Paya disciplines must span 3 structural groups');

for (const d of payaDisciplines) {
  assert.ok(d.groupFa && d.groupFa.length > 0, `${d.id} missing groupFa`);
  const ex = disciplineReg.getDisciplineExampleContent(d.id);
  assert.equal(ex.disciplineId, d.id, `Example missing for ${d.id}`);
  const promptPair = disciplineReg.getDisciplinePromptShowcase(d.id);
  assert.ok(
    promptPair.engineeredPromptFa.includes('پایا سامان پارس'),
    `RCTO prompt for ${d.id} must reflect Paya Saman Pars context`
  );
  if (d.id === 'paya_housing_urban' || d.id === 'paya_kaveh_industrial_city') {
    assert.ok(!promptPair.engineeredPromptFa.includes('DCS'), `No refinery leak in ${d.id}`);
  }
}

assert.equal(trackTypes.getSavedDiscipline('PAYA_SAMAN_PARS' as any), 'paya_portfolio_pmo');

console.log('Task 1 verification passed');

// Task 2 Assertions
for (let phase = 1; phase <= 6; phase++) {
  const payaEx = domainExamples.getDomainPhaseExample(phase, 'PAYA_SAMAN_PARS' as any);
  const civilEx = domainExamples.getDomainPhaseExample(phase, 'CIVIL_INFRA');
  assert.equal(payaEx.trackId, 'PAYA_SAMAN_PARS', `Phase ${phase} trackId mismatch`);
  assert.notEqual(payaEx.titleFa, civilEx.titleFa, `Phase ${phase} title must differ from CIVIL_INFRA`);
  assert.notEqual(payaEx.exampleNoteFa, civilEx.exampleNoteFa, `Phase ${phase} note must differ from CIVIL_INFRA`);
}

const beginnerPayaQ = quizData.getAdaptedQuizQuestions('beginner', 'paya_portfolio_pmo', 'PAYA_SAMAN_PARS' as any);
for (const qid of [1, 2, 3]) {
  const item = beginnerPayaQ.find((q) => q.id === qid);
  assert.ok(item, `Missing beginner question ${qid}`);
  const combined = `${item.scenarioFa} ${item.realWorldContextFa}`;
  assert.ok(
    combined.includes('پایا') || combined.includes('کاوه') || combined.includes('EPC+F'),
    `Beginner question ${qid} not adapted to Paya`
  );
}

const interPayaQ = quizData.getAdaptedQuizQuestions('intermediate', 'paya_portfolio_pmo', 'PAYA_SAMAN_PARS' as any);
for (const qid of [13, 16, 20, 21]) {
  const item = interPayaQ.find((q) => q.id === qid);
  assert.ok(item, `Missing intermediate question ${qid}`);
  const combined = `${item.questionFa} ${item.scenarioFa} ${item.realWorldContextFa}`;
  assert.ok(
    combined.includes('پایا') || combined.includes('کاوه') || combined.includes('EPC+F') || combined.includes('تابعه'),
    `Intermediate question ${qid} not adapted to Paya`
  );
}

console.log('Task 2 verification passed');
