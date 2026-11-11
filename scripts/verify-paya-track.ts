import assert from 'node:assert/strict';
import * as trackTypes from '../src/types/industryTrack.ts';
import * as disciplineReg from '../src/data/disciplineExamplesRegistry.ts';
import * as domainExamples from '../src/data/domainTrackExamples.ts';
import * as quizData from '../src/data/placement_quiz_data.ts';
import * as sampleDatasets from '../src/data/engineering_sample_datasets.ts';
import * as sampleContracts from '../src/data/engineering_sample_contracts.ts';
import * as s1s5 from '../src/data/session1_and_5_curriculum.ts';
import * as nlmGuide from '../src/data/notebooklm_engineering_guide.ts';
import * as nlmDocs from '../src/data/notebooklm_sample_documents.ts';
import * as payaSim from '../src/components/PayaHoldingArtifactSimulator.tsx';

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

// Task 3 Assertions
assert.equal(typeof (sampleDatasets as any).getDatasetsForTrack, 'function', 'getDatasetsForTrack must be exported');
assert.equal(typeof (sampleContracts as any).getContractsForTrack, 'function', 'getContractsForTrack must be exported');

const payaDatasets = (sampleDatasets as any).getDatasetsForTrack('PAYA_SAMAN_PARS');
assert.deepEqual(
  payaDatasets.map((d: any) => d.id),
  ['paya_infra_epc', 'paya_kaveh_housing', 'paya_holding_portfolio']
);

for (const ds of payaDatasets) {
  assert.ok(ds.descriptionFa.includes('شبیه‌سازی'), `${ds.id} must declare simulated training values`);
  const lines = ds.rawCsv.trim().split(/\r?\n/);
  assert.ok(lines.length >= 6, `${ds.id} CSV needs header + rows`);
  const colCount = lines[0].split(',').length;
  for (const row of lines) {
    assert.equal(row.split(',').length, colCount, `${ds.id} CSV row column mismatch: ${row}`);
  }
}

const civilDatasets = (sampleDatasets as any).getDatasetsForTrack('CIVIL_INFRA');
assert.equal(civilDatasets.length, 3);
assert.ok(civilDatasets.every((d: any) => !String(d.id).startsWith('paya_')));

const payaContracts = (sampleContracts as any).getContractsForTrack('PAYA_SAMAN_PARS');
assert.deepEqual(
  payaContracts.map((c: any) => c.id),
  ['paya_epcf_consortium_contract', 'paya_bot_kaveh_contract']
);
for (const c of payaContracts) {
  assert.ok(c.summaryFa.includes('شبیه‌سازی') || c.markdownContent.includes('شبیه‌سازی'), `${c.id} must declare simulated values`);
}

const civilContracts = (sampleContracts as any).getContractsForTrack('CIVIL_INFRA');
assert.equal(civilContracts.length, 2);
assert.ok(civilContracts.every((c: any) => !String(c.id).startsWith('paya_')));

console.log('Task 3 verification passed');

// Task 4 Assertions
assert.equal(typeof (s1s5 as any).getSessionCurriculumForTrack, 'function', 'getSessionCurriculumForTrack must be exported');
assert.equal(typeof (nlmGuide as any).getNotebookLmGuideForTrack, 'function', 'getNotebookLmGuideForTrack must be exported');
assert.equal(typeof (nlmDocs as any).getNotebookLmSampleDocsForTrack, 'function', 'getNotebookLmSampleDocsForTrack must be exported');

const civilCurr = (s1s5 as any).getSessionCurriculumForTrack('CIVIL_INFRA');
assert.equal(civilCurr.s1DemoSlides, s1s5.S1_DEMO_SLIDES);
assert.equal(civilCurr.readmeMd, s1s5.SAMPLE_ENGINEERING_README_MD);
assert.equal(civilCurr.cleanCsvContent, s1s5.SAMPLE_CLEAN_CSV_CONTENT);

const payaCurr = (s1s5 as any).getSessionCurriculumForTrack('PAYA_SAMAN_PARS');
assert.notEqual(payaCurr.s1DemoSlides, s1s5.S1_DEMO_SLIDES);
assert.ok(payaCurr.s1DemoSlides.length >= 6);
assert.ok(payaCurr.s1DriveSlides.length >= 5);
assert.ok(payaCurr.s1MarkdownSlides.length >= 5);
assert.ok(payaCurr.s1GithubSlides.length >= 6);
assert.ok(payaCurr.s5CapstoneSlides.length >= 4);
assert.ok(payaCurr.s5CapstoneSlides[1]?.codeSnippet, 'PAYA_S5_CAPSTONE_SLIDES[1].codeSnippet required');
assert.ok(
  payaCurr.s1DemoSlides.some((s: any) => s.titleFa.includes('پایا') || s.pointsFa.join(' ').includes('پایا سامان پارس')),
  'Paya S1 demo slides must mention Paya Saman Pars'
);
assert.ok(payaCurr.readmeMd.includes('پایا سامان پارس'));
const csvLines = payaCurr.cleanCsvContent.trim().split(/\r?\n/);
assert.ok(csvLines.length >= 5);
const csvCols = csvLines[0].split(',').length;
csvLines.forEach((l: string) => assert.equal(l.split(',').length, csvCols));

const payaNlm = (nlmGuide as any).getNotebookLmGuideForTrack('PAYA_SAMAN_PARS');
const payaDocs = (nlmDocs as any).getNotebookLmSampleDocsForTrack('PAYA_SAMAN_PARS');
assert.equal(payaNlm.departments.length, 7, 'Paya NotebookLM must have 7 departments');
for (const dept of payaNlm.departments) {
  assert.ok(payaDocs.departmentDocs[dept.id], `Missing Paya NotebookLM doc for department ${dept.id}`);
}
assert.ok(payaNlm.blueprints.length >= 3);
for (const bp of payaNlm.blueprints) {
  assert.ok(payaDocs.blueprintDocs[bp.id], `Missing Paya NotebookLM doc for blueprint ${bp.id}`);
}
assert.ok(payaNlm.exercises.length >= 4);
for (const ex of payaNlm.exercises) {
  assert.ok(payaDocs.exerciseDocs[ex.id], `Missing Paya NotebookLM doc for exercise ${ex.id}`);
}

console.log('Task 4 verification passed');

// Task 5 Assertions
assert.ok(payaSim.PayaHoldingArtifactSimulator, 'PayaHoldingArtifactSimulator must be exported');
assert.ok(payaSim.PAYA_MOCK_PORTFOLIO_DATA, 'PAYA_MOCK_PORTFOLIO_DATA must be exported');
assert.ok(
  String(payaSim.PAYA_MOCK_PORTFOLIO_DATA.simulated_notice).includes('شبیه‌سازی'),
  'PAYA_MOCK_PORTFOLIO_DATA must explicitly state simulated_notice'
);
assert.equal(payaSim.PAYA_MOCK_PORTFOLIO_DATA.holding_stats.cataloged_projects, 63);
const simWings = new Set(payaSim.PAYA_MOCK_PORTFOLIO_DATA.featured_projects.map((p: any) => p.wing));
assert.equal(simWings.size, 2, 'Simulator projects must cover both holding wings');

console.log('Task 5 verification passed');
