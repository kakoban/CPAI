import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CANONICAL_TABLE_NAME,
  DATABASE_FAMILIES,
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  POCKET_DICTIONARY_TERMS,
  READY_PROMPTS_SESSION_5,
  REPORT_CATEGORIES,
  REPORT_STATUSES
} from '../src/data/databaseCrudCurriculum';
import {
  buildCleanAnalyticalExport,
  buildExtraMetadataObject,
  buildTransparencySqlQuery,
  createTechnicalReport,
  escapeSqlString,
  filterTechnicalReports,
  formatIsoToJalaliDate,
  generateDynamicHomeworkMarkdown,
  generateDynamicSchemaSql,
  getInitialColumnSelectionState,
  getInitialRowSelectionState,
  getSeedTechnicalReports,
  recommendDatabaseByScenarioId,
  restoreTechnicalReport,
  softDeleteTechnicalReport,
  updateTechnicalReport,
  validateReportInput
} from '../src/utils/databaseCrudEngine';

test('glossary strictly contains 25 unique terms split 12 + 7 + 6 with everyday analogies', () => {
  assert.equal(GLOSSARY_TERMS.length, 25);
  assert.equal(DATABASE_FAMILIES.length, 8);
  assert.equal(POCKET_DICTIONARY_TERMS.length, 7);

  const ids = new Set(GLOSSARY_TERMS.map((t) => t.id));
  assert.equal(ids.size, 25, 'Glossary term IDs must be unique');

  const coreCount = GLOSSARY_TERMS.filter((t) => t.category === 'core_db').length;
  const archCount = GLOSSARY_TERMS.filter((t) => t.category === 'architecture').length;
  const govCount = GLOSSARY_TERMS.filter((t) => t.category === 'cpmai_governance').length;

  assert.equal(coreCount, 12);
  assert.equal(archCount, 7);
  assert.equal(govCount, 6);

  for (const cat of GLOSSARY_CATEGORIES) {
    if (cat.id === 'all') {
      assert.equal(cat.expectedCount, 25);
    } else {
      const actual = GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;
      assert.equal(cat.expectedCount, actual);
    }
  }

  for (const item of GLOSSARY_TERMS) {
    assert.ok(item.termEn.trim().length > 1);
    assert.ok(item.termFa.trim().length > 1);
    assert.ok(item.simpleDefinitionFa.trim().length > 10);
    assert.ok(item.everydayAnalogyFa.trim().length > 10);
  }
});

test('canonical technical_reports schema contract is aligned across prompts, SQLite and PostgreSQL DDL', () => {
  const columns = getInitialColumnSelectionState();
  const pgSql = generateDynamicSchemaSql({
    dialect: 'postgresql',
    columns,
    industryTrack: 'ENERGY_PETRO'
  });
  const sqliteSql = generateDynamicSchemaSql({
    dialect: 'sqlite',
    columns,
    industryTrack: 'ENERGY_PETRO'
  });

  // Table name and key columns in both dialects and both prompts
  for (const text of [
    pgSql,
    sqliteSql,
    READY_PROMPTS_SESSION_5.prompt1Schema.text,
    READY_PROMPTS_SESSION_5.prompt2CrudApp.text
  ]) {
    assert.ok(text.includes(CANONICAL_TABLE_NAME), 'Must reference technical_reports');
    assert.ok(text.includes('title'), 'Must include canonical title column');
    assert.ok(text.includes('is_deleted'), 'Must include Soft Delete column');
    assert.ok(text.includes('exclusion_reason'), 'Must include exclusion_reason column');
    assert.ok(text.includes('extra_metadata'), 'Must include extra_metadata column');
    for (const status of REPORT_STATUSES) {
      assert.ok(text.includes(status), `Must include canonical status: ${status}`);
    }
  }

  // Dialect-specific syntax
  assert.ok(pgSql.includes('GENERATED ALWAYS AS IDENTITY PRIMARY KEY'));
  assert.ok(pgSql.includes('JSONB'));
  assert.ok(sqliteSql.includes('INTEGER PRIMARY KEY AUTOINCREMENT'));
  assert.ok(sqliteSql.includes("TEXT NOT NULL DEFAULT '{}'"));

  // PII columns excluded by default must NOT appear inside CREATE TABLE definition
  const createBlockPg = pgSql.split('CREATE TABLE')[1].split(');')[0];
  assert.ok(!createBlockPg.includes('reporter_full_name'));
  assert.ok(!createBlockPg.includes('reporter_mobile'));
});

test('form validation rejects empty title or description and creates valid record with incremented id', () => {
  const emptyCheck = validateReportInput({
    title: '   ',
    report_date: '2026-03-14',
    category: REPORT_CATEGORIES[0],
    description: '',
    status: REPORT_STATUSES[0]
  });
  assert.equal(emptyCheck.valid, false);
  assert.ok(emptyCheck.errors.title);
  assert.ok(emptyCheck.errors.description);

  const seed = getSeedTechnicalReports();
  const created = createTechnicalReport(
    seed,
    {
      title: 'خرابی شیر کنترل فشار',
      report_date: '2026-03-14',
      category: 'تجهیزات',
      description: 'فشار خروجی نوسان شدید دارد.',
      status: 'باز',
      metadataMode: 'pairs',
      metadataPairs: [
        { key: 'tag_no', value: 'V-109' },
        { key: '  ', value: 'ignored' }
      ],
      metadataFreeNote: ''
    },
    '2026-03-14T10:00:00.000Z'
  );

  assert.equal(created.ok, true);
  if (created.ok) {
    assert.equal(created.record.id, 5);
    assert.equal(created.record.is_deleted, false);
    assert.deepEqual(created.record.extra_metadata, { tag_no: 'V-109' });
    assert.equal(created.nextRecords.length, seed.length + 1);
  }
});

test('buildExtraMetadataObject safely handles key-value pairs and free-text notes without syntax errors', () => {
  const fromPairs = buildExtraMetadataObject(
    'pairs',
    [
      { key: 'unit', value: 'Olefin "1"' },
      { key: 'shift', value: "Night's Team" }
    ],
    ''
  );
  assert.equal(JSON.parse(JSON.stringify(fromPairs)).unit, 'Olefin "1"');
  assert.equal(JSON.parse(JSON.stringify(fromPairs)).shift, "Night's Team");

  const fromNote = buildExtraMetadataObject('note', [], 'نیاز به بررسی کارشناس ایمنی در شیفت فردا');
  assert.deepEqual(fromNote, { note: 'نیاز به بررسی کارشناس ایمنی در شیفت فردا' });

  const emptyNote = buildExtraMetadataObject('note', [], '   ');
  assert.deepEqual(emptyNote, {});
});

test('update, soft delete (mandatory non-empty reason), restore, and clean JSON export work end-to-end', () => {
  const seed = getSeedTechnicalReports();

  // Update updates updated_at
  const upd = updateTechnicalReport(
    seed,
    1,
    { status: 'بسته‌شده' },
    '2026-03-15T12:00:00.000Z'
  );
  assert.equal(upd.ok, true);
  if (!upd.ok) return;
  assert.equal(upd.record.status, 'بسته‌شده');
  assert.equal(upd.record.updated_at, '2026-03-15T12:00:00.000Z');

  // Soft delete rejects empty reason
  const rejected = softDeleteTechnicalReport(upd.nextRecords, 2, '   ');
  assert.equal(rejected.ok, false);

  // Soft delete accepts ANY non-empty reason (not tied to word "تست")
  const softDel = softDeleteTechnicalReport(
    upd.nextRecords,
    2,
    'ثبت تکراری توسط شیفت قبلی',
    '2026-03-15T12:30:00.000Z'
  );
  assert.equal(softDel.ok, true);
  if (!softDel.ok) return;

  // Record remains in main array (no hard delete)
  assert.equal(softDel.nextRecords.length, seed.length);
  assert.equal(softDel.record.is_deleted, true);
  assert.equal(softDel.record.exclusion_reason, 'ثبت تکراری توسط شیفت قبلی');

  // Clean analytical export automatically excludes all is_deleted = true rows
  const cleanJsonRows = buildCleanAnalyticalExport(softDel.nextRecords, {
    category: 'ALL',
    status: 'ALL',
    searchText: ''
  });
  assert.ok(cleanJsonRows.every((r) => !r.is_deleted));
  assert.ok(!cleanJsonRows.some((r) => r.id === 2));
  assert.ok(!cleanJsonRows.some((r) => r.id === 4));

  // Restore brings record back into clean export
  const restored = restoreTechnicalReport(softDel.nextRecords, 2);
  const cleanAfterRestore = filterTechnicalReports(restored, {
    category: 'ALL',
    status: 'ALL',
    includeDeleted: false,
    searchText: ''
  });
  assert.ok(cleanAfterRestore.some((r) => r.id === 2));
});

test('SQL transparency builder escapes single quotes safely and reflects active filters', () => {
  assert.equal(escapeSqlString("O'Reilly's DB"), "O''Reilly''s DB");

  const sql = buildTransparencySqlQuery({
    category: 'تجهیزات',
    status: 'باز',
    includeDeleted: false,
    searchText: "پمپ'2"
  });

  assert.ok(sql.includes('WHERE is_deleted = FALSE'));
  assert.ok(sql.includes("category = 'تجهیزات'"));
  assert.ok(sql.includes("status = 'باز'"));
  assert.ok(sql.includes("title LIKE '%پمپ''2%'"));
  assert.ok(!sql.includes("'%پمپ'2%'"));
});

test('dynamic Markdown & Jalali formatting reflect Tab 2 column/row decisions and active industry track', () => {
  const columns = getInitialColumnSelectionState();
  const sampleRows = getInitialRowSelectionState();
  const activeSqlQuery = buildTransparencySqlQuery({
    category: 'ALL',
    status: 'ALL',
    includeDeleted: false,
    searchText: ''
  });

  const md = generateDynamicHomeworkMarkdown({
    dialect: 'postgresql',
    columns,
    sampleRows,
    activeSqlQuery,
    industryTrack: 'PAYA_SAMAN_PARS',
    activeCleanCount: 3,
    excludedLiveCount: 1
  });

  assert.ok(md.includes('هلدینگ پایا سامان پارس'));
  assert.ok(md.includes('reporter_full_name'));
  assert.ok(md.includes('حذف (Exclude)'));
  assert.ok(md.includes('#103'));
  assert.ok(md.includes('WHERE is_deleted = FALSE'));

  const jalali = formatIsoToJalaliDate('2026-03-10');
  assert.ok(jalali.includes('۱۴۰۴') || jalali.includes('1404'), `Expected Jalali year 1404, got: ${jalali}`);

  const rec = recommendDatabaseByScenarioId('rag_semantic');
  assert.equal(rec.family.id, 'vector');
});
