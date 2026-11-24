import {
  CANONICAL_TABLE_NAME,
  CLEANSING_COLUMNS_INITIAL,
  CLEANSING_SAMPLE_ROWS_INITIAL,
  CleansingColumnConfig,
  CleansingSampleRow,
  DATABASE_FAMILIES,
  DB_DECISION_SCENARIOS,
  DatabaseFamilyItem,
  REPORT_CATEGORIES,
  REPORT_STATUSES,
  ReportCategory,
  ReportStatus,
  TRACK_DATABASE_ADAPTATIONS
} from '../data/databaseCrudCurriculum';
import { IndustryTrackId } from '../types/industryTrack';

export type SqlDialect = 'sqlite' | 'postgresql';

export interface MetadataPair {
  key: string;
  value: string;
}

export interface TechnicalReportRecord {
  id: number;
  title: string;
  report_date: string; // ISO YYYY-MM-DD
  category: ReportCategory;
  description: string;
  status: ReportStatus;
  extra_metadata: Record<string, string>;
  is_deleted: boolean;
  exclusion_reason: string | null;
  created_at: string; // ISO-8601
  updated_at: string; // ISO-8601
}

export interface ReportFormInput {
  title: string;
  report_date: string;
  category: ReportCategory;
  description: string;
  status: ReportStatus;
  metadataMode: 'pairs' | 'note';
  metadataPairs: MetadataPair[];
  metadataFreeNote: string;
}

export interface ValidationErrors {
  title?: string;
  report_date?: string;
  category?: string;
  description?: string;
  status?: string;
}

export interface CrudFilterState {
  category: 'ALL' | ReportCategory;
  status: 'ALL' | ReportStatus;
  includeDeleted: boolean;
  searchText: string;
}

export interface VerificationChecklistState {
  createdValidRecord: boolean;
  triggeredEmptyValidation: boolean;
  updatedRecord: boolean;
  softDeletedAndVerifiedJson: boolean;
}

export interface ColumnSelectionStateItem {
  id: string;
  sqlName: string;
  rawLabelFa: string;
  isPii: boolean;
  included: boolean;
  rationaleFa: string;
  sqlTypeSqlite: string;
  sqlTypePostgres: string;
  isGovernanceColumn?: boolean;
}

export interface RowSelectionStateItem {
  id: number;
  title: string;
  reportDate: string;
  category: string;
  description: string;
  status: string;
  excluded: boolean;
  exclusionReason: string;
}

export function getTodayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatIsoToJalaliDate(isoValue: string): string {
  if (!isoValue || !isoValue.trim()) return '—';
  const normalized = isoValue.length === 10 ? `${isoValue}T12:00:00Z` : isoValue;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return isoValue;
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch {
    return isoValue.slice(0, 10);
  }
}

export function formatIsoToJalaliDateTime(isoValue: string): string {
  if (!isoValue || !isoValue.trim()) return '—';
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return isoValue;
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return isoValue;
  }
}

/**
 * Escapes single quotes for safe SQL string literal display (' -> '').
 */
export function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''");
}

/**
 * Safely converts beginner-friendly key/value pairs or free note into a valid JSON object.
 */
export function buildExtraMetadataObject(
  mode: 'pairs' | 'note',
  pairs: MetadataPair[],
  freeNote: string
): Record<string, string> {
  if (mode === 'note') {
    const trimmed = freeNote.trim();
    return trimmed ? { note: trimmed } : {};
  }
  const result: Record<string, string> = {};
  for (const pair of pairs) {
    const k = pair.key.trim();
    const v = pair.value.trim();
    if (k && v) {
      result[k] = v;
    }
  }
  return result;
}

export function validateReportInput(input: {
  title: string;
  report_date: string;
  category: string;
  description: string;
  status: string;
}): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!input.title || !input.title.trim()) {
    errors.title = 'عنوان گزارش اجباری است و نمی‌تواند خالی باشد (قید NOT NULL).';
  }
  if (!input.report_date || !/^\d{4}-\d{2}-\d{2}$/.test(input.report_date.trim())) {
    errors.report_date = 'تاریخ گزارش باید در قالب معتبر ISO (YYYY-MM-DD) انتخاب شود.';
  }
  if (!REPORT_CATEGORIES.includes(input.category as ReportCategory)) {
    errors.category = 'دسته‌بندی انتخاب‌شده خارج از مقادیر مجاز جدول است.';
  }
  if (!input.description || !input.description.trim()) {
    errors.description = 'شرح مشکل اجباری است و نمی‌تواند خالی باشد (قید NOT NULL).';
  }
  if (!REPORT_STATUSES.includes(input.status as ReportStatus)) {
    errors.status = 'وضعیت انتخاب‌شده خارج از ۳ مقدار استاندارد جدول است.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function getSeedTechnicalReports(): TechnicalReportRecord[] {
  return [
    {
      id: 1,
      title: 'نشتی آب‌بند مکانیکی پمپ تغذیه واحد ۲',
      report_date: '2026-03-10',
      category: 'تجهیزات',
      description: 'در بازدید شیفت صبح افزایش لرزش و نشتی جزئی از سیل مکانیکی مشاهده شد.',
      status: 'در حال پیگیری',
      extra_metadata: { equipment_tag: 'P-204', priority: 'بالا' },
      is_deleted: false,
      exclusion_reason: null,
      created_at: '2026-03-10T07:30:00.000Z',
      updated_at: '2026-03-10T09:15:00.000Z'
    },
    {
      id: 2,
      title: 'نقص حفاظ ایمنی سکوی شرقی',
      report_date: '2026-03-11',
      category: 'ایمنی',
      description: 'نرده محافظ در تراز +۴ متر لق شده و نیازمند جوشکاری و بازرسی مجدد است.',
      status: 'باز',
      extra_metadata: { zone: 'سوله B', hse_level: 'فوری' },
      is_deleted: false,
      exclusion_reason: null,
      created_at: '2026-03-11T08:10:00.000Z',
      updated_at: '2026-03-11T08:10:00.000Z'
    },
    {
      id: 3,
      title: 'کالیبراسیون سنسور فشار خط خروجی',
      report_date: '2026-03-12',
      category: 'کیفیت',
      description: 'اختلاف قرائت ۰.۴ بار برطرف شد و گواهی کالیبراسیون دوره‌ای ثبت گردید.',
      status: 'بسته‌شده',
      extra_metadata: { certificate_no: 'CAL-404-19' },
      is_deleted: false,
      exclusion_reason: null,
      created_at: '2026-03-12T11:00:00.000Z',
      updated_at: '2026-03-12T14:20:00.000Z'
    },
    {
      id: 4,
      title: 'رکورد آزمایشی تست اولیه فرم',
      report_date: '2026-03-12',
      category: 'سایر',
      description: 'ثبت آزمایشی جهت بررسی صحت اتصال دیتابیس پیش از شروع عملیات.',
      status: 'باز',
      extra_metadata: { note: 'تست فنی سیستم' },
      is_deleted: true,
      exclusion_reason: 'داده آزمایشی (تست فنی)؛ طبق استاندارد CPMAI از خروجی تحلیلی کنار گذاشته شد.',
      created_at: '2026-03-12T15:00:00.000Z',
      updated_at: '2026-03-12T15:05:00.000Z'
    }
  ];
}

export function createTechnicalReport(
  records: TechnicalReportRecord[],
  input: ReportFormInput,
  nowIso: string = new Date().toISOString()
):
  | { ok: true; record: TechnicalReportRecord; nextRecords: TechnicalReportRecord[] }
  | { ok: false; errors: ValidationErrors } {
  const validation = validateReportInput(input);
  if (!validation.valid) {
    return { ok: false, errors: validation.errors };
  }

  const maxId = records.reduce((max, item) => (item.id > max ? item.id : max), 0);
  const newRecord: TechnicalReportRecord = {
    id: maxId + 1,
    title: input.title.trim(),
    report_date: input.report_date.trim(),
    category: input.category,
    description: input.description.trim(),
    status: input.status,
    extra_metadata: buildExtraMetadataObject(
      input.metadataMode,
      input.metadataPairs,
      input.metadataFreeNote
    ),
    is_deleted: false,
    exclusion_reason: null,
    created_at: nowIso,
    updated_at: nowIso
  };

  return {
    ok: true,
    record: newRecord,
    nextRecords: [newRecord, ...records]
  };
}

export function updateTechnicalReport(
  records: TechnicalReportRecord[],
  id: number,
  patch: {
    title?: string;
    report_date?: string;
    category?: ReportCategory;
    description?: string;
    status?: ReportStatus;
    extra_metadata?: Record<string, string>;
  },
  nowIso: string = new Date().toISOString()
):
  | { ok: true; record: TechnicalReportRecord; nextRecords: TechnicalReportRecord[] }
  | { ok: false; errors: ValidationErrors } {
  const existing = records.find((r) => r.id === id);
  if (!existing) {
    return { ok: false, errors: { title: 'رکورد مورد نظر یافت نشد.' } };
  }

  const candidate = {
    title: patch.title !== undefined ? patch.title : existing.title,
    report_date: patch.report_date !== undefined ? patch.report_date : existing.report_date,
    category: patch.category !== undefined ? patch.category : existing.category,
    description: patch.description !== undefined ? patch.description : existing.description,
    status: patch.status !== undefined ? patch.status : existing.status
  };

  const validation = validateReportInput(candidate);
  if (!validation.valid) {
    return { ok: false, errors: validation.errors };
  }

  const updated: TechnicalReportRecord = {
    ...existing,
    title: candidate.title.trim(),
    report_date: candidate.report_date.trim(),
    category: candidate.category,
    description: candidate.description.trim(),
    status: candidate.status,
    extra_metadata:
      patch.extra_metadata !== undefined ? patch.extra_metadata : existing.extra_metadata,
    updated_at: nowIso
  };

  return {
    ok: true,
    record: updated,
    nextRecords: records.map((r) => (r.id === id ? updated : r))
  };
}

export function softDeleteTechnicalReport(
  records: TechnicalReportRecord[],
  id: number,
  exclusionReason: string,
  nowIso: string = new Date().toISOString()
):
  | { ok: true; record: TechnicalReportRecord; nextRecords: TechnicalReportRecord[] }
  | { ok: false; error: string } {
  const trimmedReason = exclusionReason.trim();
  if (!trimmedReason) {
    return {
      ok: false,
      error: 'طبق قانون شفافیت CPMAI، ثبت دلیل کنارگذاری (exclusion_reason) برای حذف نرم اجباری است.'
    };
  }

  const existing = records.find((r) => r.id === id);
  if (!existing) {
    return { ok: false, error: 'رکورد مورد نظر برای حذف نرم یافت نشد.' };
  }

  const updated: TechnicalReportRecord = {
    ...existing,
    is_deleted: true,
    exclusion_reason: trimmedReason,
    updated_at: nowIso
  };

  return {
    ok: true,
    record: updated,
    nextRecords: records.map((r) => (r.id === id ? updated : r))
  };
}

export function restoreTechnicalReport(
  records: TechnicalReportRecord[],
  id: number,
  nowIso: string = new Date().toISOString()
): TechnicalReportRecord[] {
  return records.map((r) =>
    r.id === id
      ? {
          ...r,
          is_deleted: false,
          exclusion_reason: null,
          updated_at: nowIso
        }
      : r
  );
}

export function filterTechnicalReports(
  records: TechnicalReportRecord[],
  filter: CrudFilterState
): TechnicalReportRecord[] {
  const q = filter.searchText.trim().toLowerCase();
  return records.filter((rec) => {
    if (!filter.includeDeleted && rec.is_deleted) return false;
    if (filter.category !== 'ALL' && rec.category !== filter.category) return false;
    if (filter.status !== 'ALL' && rec.status !== filter.status) return false;
    if (q) {
      const hay = `${rec.id} ${rec.title} ${rec.description} ${rec.category} ${rec.status} ${JSON.stringify(rec.extra_metadata)} ${rec.exclusion_reason || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/**
 * Generates clean analytical records for AI export (strictly excluding is_deleted = TRUE).
 */
export function buildCleanAnalyticalExport(
  records: TechnicalReportRecord[],
  filter: Pick<CrudFilterState, 'category' | 'status' | 'searchText'>
): TechnicalReportRecord[] {
  return filterTechnicalReports(records, {
    ...filter,
    includeDeleted: false
  });
}

/**
 * Generates a syntactically valid, escaped SQL transparency query reflecting active UI filters.
 */
export function buildTransparencySqlQuery(
  filter: CrudFilterState,
  activeColumnSqlNames?: string[]
): string {
  const defaultCols = [
    'id',
    'title',
    'report_date',
    'category',
    'description',
    'status',
    'extra_metadata',
    'created_at',
    'updated_at'
  ];

  const selectedCols =
    activeColumnSqlNames && activeColumnSqlNames.length > 0
      ? activeColumnSqlNames.filter((c) => filter.includeDeleted || (c !== 'is_deleted' && c !== 'exclusion_reason'))
      : defaultCols;

  const finalCols = filter.includeDeleted
    ? Array.from(new Set([...selectedCols, 'is_deleted', 'exclusion_reason']))
    : selectedCols;

  const conditions: string[] = [];
  if (!filter.includeDeleted) {
    conditions.push('is_deleted = FALSE');
  }
  if (filter.category !== 'ALL') {
    conditions.push(`category = '${escapeSqlString(filter.category)}'`);
  }
  if (filter.status !== 'ALL') {
    conditions.push(`status = '${escapeSqlString(filter.status)}'`);
  }
  const trimmedSearch = filter.searchText.trim();
  if (trimmedSearch) {
    const safeSearch = escapeSqlString(trimmedSearch);
    conditions.push(`(title LIKE '%${safeSearch}%' OR description LIKE '%${safeSearch}%')`);
  }

  const whereClause = conditions.length > 0 ? `\nWHERE ${conditions.join('\n  AND ')}` : '';
  return `SELECT ${finalCols.join(', ')}\nFROM ${CANONICAL_TABLE_NAME}${whereClause}\nORDER BY report_date DESC, id DESC;`;
}

export function recommendDatabaseByScenarioId(scenarioId: string): {
  scenario: (typeof DB_DECISION_SCENARIOS)[number];
  family: DatabaseFamilyItem;
} {
  const scenario =
    DB_DECISION_SCENARIOS.find((s) => s.id === scenarioId) || DB_DECISION_SCENARIOS[0];
  const family =
    DATABASE_FAMILIES.find((f) => f.id === scenario.recommendedFamilyId) || DATABASE_FAMILIES[0];
  return { scenario, family };
}

export function getInitialColumnSelectionState(): ColumnSelectionStateItem[] {
  return CLEANSING_COLUMNS_INITIAL.map((col: CleansingColumnConfig) => ({
    id: col.id,
    sqlName: col.sqlName,
    rawLabelFa: col.rawLabelFa,
    isPii: col.isPii,
    included: col.defaultIncluded,
    rationaleFa: col.defaultRationaleFa,
    sqlTypeSqlite: col.sqlTypeSqlite,
    sqlTypePostgres: col.sqlTypePostgres,
    isGovernanceColumn: col.isGovernanceColumn
  }));
}

export function getInitialRowSelectionState(): RowSelectionStateItem[] {
  return CLEANSING_SAMPLE_ROWS_INITIAL.map((row: CleansingSampleRow) => ({
    id: row.id,
    title: row.title,
    reportDate: row.reportDate,
    category: row.category,
    description: row.description,
    status: row.status,
    excluded: row.defaultExcluded,
    exclusionReason: row.defaultExclusionReason
  }));
}

/**
 * Dynamically generates dialect-accurate schema.sql reflecting Tab 2 column choices and active industry track.
 */
export function generateDynamicSchemaSql(params: {
  dialect: SqlDialect;
  columns: ColumnSelectionStateItem[];
  industryTrack: IndustryTrackId;
}): string {
  const { dialect, columns, industryTrack } = params;
  const trackInfo = TRACK_DATABASE_ADAPTATIONS[industryTrack];
  const includedCols = columns.filter((c) => c.included);
  const excludedCols = columns.filter((c) => !c.included);

  const dialectTitle = dialect === 'postgresql' ? 'PostgreSQL / Supabase' : 'SQLite (آفلاین و سبک)';
  const colLines: string[] = [];

  for (const col of includedCols) {
    const typeExpr = dialect === 'postgresql' ? col.sqlTypePostgres : col.sqlTypeSqlite;
    colLines.push(`  ${col.sqlName} ${typeExpr}`);
  }

  // Always include audit timestamps
  if (dialect === 'postgresql') {
    colLines.push(`  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`);
    colLines.push(`  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`);
  } else {
    colLines.push(`  created_at TEXT NOT NULL DEFAULT (datetime('now'))`);
    colLines.push(`  updated_at TEXT NOT NULL DEFAULT (datetime('now'))`);
  }

  // Add Soft Delete transparency constraint if both governance columns are present
  const hasSoftDeleteCols =
    includedCols.some((c) => c.sqlName === 'is_deleted') &&
    includedCols.some((c) => c.sqlName === 'exclusion_reason');

  if (hasSoftDeleteCols) {
    colLines.push(
      `  CONSTRAINT chk_soft_delete_reason CHECK (is_deleted = FALSE OR (exclusion_reason IS NOT NULL AND length(trim(exclusion_reason)) > 0))`
    );
  }

  const excludedComments =
    excludedCols.length > 0
      ? excludedCols
          .map((c) => `-- ستون کنارگذاشته‌شده: ${c.sqlName} (${c.rawLabelFa}) -> دلیل: ${c.rationaleFa}`)
          .join('\n')
      : '-- هیچ ستونی کنار گذاشته نشده است.';

  const indexStatements =
    dialect === 'postgresql'
      ? `CREATE INDEX IF NOT EXISTS idx_${CANONICAL_TABLE_NAME}_active_date\n  ON ${CANONICAL_TABLE_NAME} (report_date DESC)\n  WHERE is_deleted = FALSE;`
      : `CREATE INDEX IF NOT EXISTS idx_${CANONICAL_TABLE_NAME}_active_date\n  ON ${CANONICAL_TABLE_NAME} (is_deleted, report_date DESC);`;

  return `-- ============================================================================
-- فایل اسکیما (DDL) جلسه ۵ — استاندارد PMI-CPMAI فاز سوم (آماده‌سازی داده)
-- موتور انتخابی: ${dialectTitle}
-- مسیر صنعتی فعال: ${trackInfo.trackLabelFa} (${trackInfo.projectTitleFa})
-- ============================================================================
-- گزارش پاک‌سازی ستون‌ها (Data Selection Rationale):
${excludedComments}

CREATE TABLE IF NOT EXISTS ${CANONICAL_TABLE_NAME} (
${colLines.join(',\n')}
);

${indexStatements}

-- کوئری پایه استخراج داده‌های تمیز برای تحلیل و هوش مصنوعی:
SELECT id, title, report_date, category, description, status, extra_metadata, created_at, updated_at
FROM ${CANONICAL_TABLE_NAME}
WHERE is_deleted = FALSE
ORDER BY report_date DESC, id DESC;
`;
}

/**
 * Dynamically generates 05_data_selection_and_schema.md reflecting Tab 2 column/row decisions,
 * Tab 3 live SQL query, dialect choice, and active industry track.
 */
export function generateDynamicHomeworkMarkdown(params: {
  dialect: SqlDialect;
  columns: ColumnSelectionStateItem[];
  sampleRows: RowSelectionStateItem[];
  activeSqlQuery: string;
  industryTrack: IndustryTrackId;
  activeCleanCount: number;
  excludedLiveCount: number;
}): string {
  const {
    dialect,
    columns,
    sampleRows,
    activeSqlQuery,
    industryTrack,
    activeCleanCount,
    excludedLiveCount
  } = params;

  const trackInfo = TRACK_DATABASE_ADAPTATIONS[industryTrack];
  const engineLabel =
    dialect === 'postgresql'
      ? 'PostgreSQL (یا Supabase) — پایگاه داده رابطه‌ای با پشتیبانی JSONB، جستجوی متنی و pgvector'
      : 'SQLite — پایگاه داده رابطه‌ای سبک و آفلاین قابل مهاجرت مستقیم به PostgreSQL';

  const columnRowsMd = columns
    .map((c) => {
      const decision = c.included ? 'شمول (Include)' : 'حذف (Exclude)';
      const piiTag = c.isPii ? 'بله (PII)' : 'خیر';
      return `| \`${c.sqlName}\` | ${c.rawLabelFa} | ${piiTag} | ${decision} | ${c.rationaleFa} |`;
    })
    .join('\n');

  const rowDecisionsMd = sampleRows
    .map((r) => {
      const decision = r.excluded ? 'کنارگذاری با حذف نرم (Soft Delete)' : 'شمول در داده تمیز (Include)';
      const reason = r.excluded
        ? r.exclusionReason || 'دلیل ثبت نشده'
        : 'رکورد معتبر عملیاتی با فیلدهای کامل و قابل اتکا برای تحلیل';
      return `| #${r.id} | ${r.title || '(بدون عنوان)'} | ${formatIsoToJalaliDate(r.reportDate)} | ${decision} | ${reason} |`;
    })
    .join('\n');

  return `# گزارش جلسه ۵: انتخاب پایگاه داده، گزینش داده و اسکیما (PMI-CPMAI فاز سوم)

**مسیر صنعتی و پروژه:** ${trackInfo.trackLabelFa} — ${trackInfo.projectTitleFa}  
**نام جدول اصلی:** \`${CANONICAL_TABLE_NAME}\`  
**موتور پایگاه داده انتخابی:** ${engineLabel}

---

## ۱. توجیه معماری و انتخاب پایگاه داده

- **شکل داده و سؤال اصلی:** داده‌های گزارش‌های فنی ساختار جدولی منظم همراه با چند ویژگی متغیر دارند و نیازمند فیلتر دقیق، ویرایش ماندگار و شفافیت ممیزی هستند.
- **دلیل انتخاب موتور واحد (پرهیز از تله Polyglot Persistence):** برای جلوگیری از پیچیدگی نگهداری چند دیتابیس در شروع پروژه، از یک موتور رابطه‌ای واحد استفاده شده و ویژگی‌های متغیر به جای دیتابیس دوم در ستون \`extra_metadata\` (JSON/JSONB) ذخیره می‌شوند.
- **نکته تطبیقی مسیر صنعتی:** ${trackInfo.postgresBenefitFa}

---

## ۲. جدول توجیه شمول و حذف ستون‌ها (Column Selection Rationale)

| نام ستون SQL | عنوان اولیه | داده هویتی (PII) | تصمیم CPMAI | دلیل شمول یا حذف (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
${columnRowsMd}

---

## ۳. جدول توجیه شمول و حذف سطرها (Row Selection & Soft Delete Rationale)

| شناسه | عنوان رکورد | تاریخ (شمسی) | وضعیت در مجموعه تمیز | دلیل ثبت‌شده (\`exclusion_reason\`) |
| :--- | :--- | :--- | :--- | :--- |
${rowDecisionsMd}

---

## ۴. کوئری شفافیت استخراج داده‌های تمیز (Data Selection Transparency)

وضعیت لحظه‌ای مینی‌اپ کارگاه: **${activeCleanCount} رکورد تمیز فعال** و **${excludedLiveCount} رکورد کنارگذاشته‌شده با حذف نرم**.

\`\`\`sql
${activeSqlQuery}
\`\`\`

---

## ۵. پروتکل شفافیت و حاکمیت حذف نرم (Soft Delete Protocol)

1. هیچ رکوردی در جدول \`${CANONICAL_TABLE_NAME}\` به‌صورت فیزیکی (\`DELETE FROM\`) پاک نمی‌شود.
2. هنگام کنار گذاشتن هر رکورد تستی، تکراری یا ناقص، مقدار \`is_deleted = TRUE\` و متن غیرخالی در \`exclusion_reason\` به‌صورت اجباری ثبت می‌شود.
3. تمام تاریخ‌ها در دیتابیس و خروجی JSON با استاندارد **ISO** ذخیره و در رابط کاربری فارسی به‌صورت **تاریخ شمسی** نمایش داده می‌شوند.
4. فایل \`schema.sql\` و همین سند در ریپازیتوری گیت‌هاب پروژه Commit می‌شوند تا هر تغییر ساختار قابل ردیابی و بازتولید باشد.
`;
}
