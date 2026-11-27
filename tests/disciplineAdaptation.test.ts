import test from 'node:test';
import assert from 'node:assert/strict';
import { getNotebookLmGuideForTrack } from '../src/data/notebooklm_engineering_guide';
import { getNotebookLmSampleDocsForTrack } from '../src/data/notebooklm_sample_documents';
import { getModuleExerciseDeck } from '../src/data/moduleExercises';

test('getNotebookLmGuideForTrack adapts department matrix and labs to the active discipline and role', () => {
  const claimsGuide = getNotebookLmGuideForTrack(
    'CIVIL_INFRA',
    'civil_technical_claims',
    'director'
  );
  assert.equal(claimsGuide.departments[0].id, 'discipline_active');
  assert.ok(claimsGuide.departments[0].departmentFa.includes('دفتر فنی و دعاوی پیمان'));
  assert.ok(claimsGuide.departments[0].managerRoleFa.includes('مدیر طرح'));
  assert.equal(claimsGuide.exercises[0].id, 'ex0_discipline_active');
  assert.ok(claimsGuide.exercises[0].titleFa.includes('مدیران'));

  const petroGuide = getNotebookLmGuideForTrack(
    'ENERGY_PETRO',
    'petro_process_safety',
    'site_operator'
  );
  assert.ok(petroGuide.departments[0].departmentFa.includes('فرآیند و ایمنی (HAZOP)'));
  assert.ok(petroGuide.departments[0].samplePromptFa.includes('SOP') || petroGuide.departments[0].samplePromptFa.includes('ایمنی'));
  assert.notEqual(
    claimsGuide.departments[0].samplePromptFa,
    petroGuide.departments[0].samplePromptFa
  );
});

test('changing organizational level (roleId) on the SAME discipline changes challenge nature, sources, doc, and lab exercise', () => {
  const directorGuide = getNotebookLmGuideForTrack(
    'PAYA_SAMAN_PARS',
    'paya_roads_rail_airports',
    'director'
  );
  const operatorGuide = getNotebookLmGuideForTrack(
    'PAYA_SAMAN_PARS',
    'paya_roads_rail_airports',
    'site_operator'
  );

  // Department matrix challenge & prompt differ completely by role
  assert.notEqual(directorGuide.departments[0].managerRoleFa, operatorGuide.departments[0].managerRoleFa);
  assert.notEqual(directorGuide.departments[0].practicalValueFa, operatorGuide.departments[0].practicalValueFa);
  assert.notEqual(directorGuide.departments[0].samplePromptFa, operatorGuide.departments[0].samplePromptFa);
  assert.ok(directorGuide.departments[0].samplePromptFa.includes('هیئت‌مدیره'));
  assert.ok(operatorGuide.departments[0].samplePromptFa.includes('چک‌لیست'));

  // Lab exercise title, objective, and prompt differ completely by role
  assert.notEqual(directorGuide.exercises[0].titleFa, operatorGuide.exercises[0].titleFa);
  assert.notEqual(directorGuide.exercises[0].objectiveFa, operatorGuide.exercises[0].objectiveFa);
  assert.notEqual(directorGuide.exercises[0].promptToCopyFa, operatorGuide.exercises[0].promptToCopyFa);

  // Specimen document differs completely by role
  const directorDocs = getNotebookLmSampleDocsForTrack('PAYA_SAMAN_PARS', 'paya_roads_rail_airports', 'director');
  const operatorDocs = getNotebookLmSampleDocsForTrack('PAYA_SAMAN_PARS', 'paya_roads_rail_airports', 'site_operator');
  assert.notEqual(
    directorDocs.exerciseDocs.ex0_discipline_active.fileName,
    operatorDocs.exerciseDocs.ex0_discipline_active.fileName
  );
  assert.notEqual(
    directorDocs.exerciseDocs.ex0_discipline_active.markdownContent,
    operatorDocs.exerciseDocs.ex0_discipline_active.markdownContent
  );
});

test('getNotebookLmSampleDocsForTrack generates a discipline-matched specimen document', () => {
  const docs = getNotebookLmSampleDocsForTrack(
    'PAYA_SAMAN_PARS',
    'paya_kaveh_industrial_city',
    'lead_superintendent'
  );
  assert.ok(docs.departmentDocs.discipline_active);
  assert.equal(
    docs.departmentDocs.discipline_active.fileName,
    'NotebookLM_paya_kaveh_industrial_city_lead_superintendent.md'
  );
  assert.ok(docs.exerciseDocs.ex0_discipline_active);
  assert.ok(docs.exerciseDocs.ex0_discipline_active.markdownContent.includes('کاوه'));
});

test('getModuleExerciseDeck dynamically tailors module exercises by BOTH discipline and role', () => {
  const directorDeck = getModuleExerciseDeck('notebooklm', {
    trackId: 'CIVIL_INFRA',
    disciplineId: 'civil_tbm_tunnel',
    roleId: 'director'
  })!;
  const operatorDeck = getModuleExerciseDeck('notebooklm', {
    trackId: 'CIVIL_INFRA',
    disciplineId: 'civil_tbm_tunnel',
    roleId: 'site_operator'
  })!;

  assert.ok(directorDeck.workshopGoalFa.includes('حفاری TBM'));
  assert.ok(directorDeck.workshopGoalFa.includes('مدیر طرح'));
  assert.ok(operatorDeck.workshopGoalFa.includes('اپراتور'));
  assert.notEqual(directorDeck.exercises[0].scenarioFa, operatorDeck.exercises[0].scenarioFa);
  assert.notEqual(directorDeck.exercises[0].deliverableFa, operatorDeck.exercises[0].deliverableFa);
  assert.notEqual(directorDeck.exercises[0].promptStarterFa, operatorDeck.exercises[0].promptStarterFa);
});
