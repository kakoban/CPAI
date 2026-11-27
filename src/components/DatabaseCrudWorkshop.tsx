import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Database,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileCode2,
  FileText,
  Filter,
  Info,
  KeyRound,
  Layers,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Table2,
  Trash2,
  Undo2,
  X
} from 'lucide-react';
import {
  BEGINNER_MISTAKES,
  CANONICAL_TABLE_NAME,
  CPMAI_SELECT_DATA_CRITERIA,
  DATABASE_FAMILIES,
  DB_DECISION_SCENARIOS,
  DatabaseFamilyId,
  EXCEL_LIMITATIONS,
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  GlossaryCategoryId,
  POCKET_DICTIONARY_TERMS,
  READY_PROMPTS_SESSION_5,
  REPORT_CATEGORIES,
  REPORT_STATUSES,
  ReportCategory,
  ReportStatus,
  TRACK_DATABASE_ADAPTATIONS
} from '../data/databaseCrudCurriculum';
import {
  ColumnSelectionStateItem,
  CrudFilterState,
  MetadataPair,
  RowSelectionStateItem,
  SqlDialect,
  TechnicalReportRecord,
  ValidationErrors,
  VerificationChecklistState,
  buildCleanAnalyticalExport,
  buildExtraMetadataObject,
  buildTransparencySqlQuery,
  createTechnicalReport,
  filterTechnicalReports,
  formatIsoToJalaliDate,
  formatIsoToJalaliDateTime,
  generateDynamicHomeworkMarkdown,
  generateDynamicSchemaSql,
  getInitialColumnSelectionState,
  getInitialRowSelectionState,
  getSeedTechnicalReports,
  getTodayIsoDate,
  recommendDatabaseByScenarioId,
  restoreTechnicalReport,
  softDeleteTechnicalReport,
  updateTechnicalReport
} from '../utils/databaseCrudEngine';
import { IndustryTrackId } from '../types/industryTrack';
import { playTactileSound } from '../utils/uiSoundEffects';
import { FocusedLessonLayout, FocusedStepItem } from './learning/FocusedLessonLayout';
import { FocusedLessonFooter } from './learning/FocusedLessonFooter';
import { clampStepIndex, getStepBoundaryState, markStepVisited } from '../utils/focusedLessonEngine';

interface DatabaseCrudWorkshopProps {
  industryTrack?: IndustryTrackId;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

type WorkshopStageTab = 'databases' | 'cpmai' | 'crud_lab' | 'glossary';

const STORAGE_KEY_RECORDS = 'cpmai_s5_db_crud_records_v1';
const STORAGE_KEY_CHECKLIST = 'cpmai_s5_db_crud_checklist_v1';
const STORAGE_KEY_COLUMNS = 'cpmai_s5_db_cpmai_columns_v1';
const STORAGE_KEY_ROWS = 'cpmai_s5_db_cpmai_rows_v1';

const STAGE_TABS: Array<{
  id: WorkshopStageTab;
  stepNumFa: string;
  labelFa: string;
  shortSubFa: string;
}> = [
  {
    id: 'databases',
    stepNumFa: '۱',
    labelFa: '۸ خانواده دیتابیس و انتخاب هوشمند',
    shortSubFa: 'داستان فروشگاه و قانون PostgreSQL'
  },
  {
    id: 'cpmai',
    stepNumFa: '۲',
    labelFa: 'فرهنگ ۷ واژه، CPMAI و حذف نرم',
    shortSubFa: 'پاک‌سازی PII و حذف نرم استاندارد'
  },
  {
    id: 'crud_lab',
    stepNumFa: '۳',
    labelFa: 'کارگاه CRUD، پرامپت‌ها و گیت‌هاب',
    shortSubFa: 'مینی‌اپ زنده، پرامپت و فایل گیت‌هاب'
  },
  {
    id: 'glossary',
    stepNumFa: '۴',
    labelFa: 'واژه‌نامه ۲۵ مفهومی با معادل روزمره',
    shortSubFa: '۱۲ پایه / ۷ معماری / ۶ CPMAI'
  }
];

function triggerTextDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const DatabaseCrudWorkshop: React.FC<DatabaseCrudWorkshopProps> = ({
  industryTrack = 'CIVIL_INFRA',
  onLoadToSandbox,
  copyToClipboard,
  copiedId
}) => {
  const [activeStage, setActiveStage] = useState<WorkshopStageTab>('databases');
  const [visitedStageIndices, setVisitedStageIndices] = useState<Set<number>>(() => new Set([0]));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // --- Tab 1: 8-DB Story & Decision Simulator ---
  const [selectedFamilyId, setSelectedFamilyId] = useState<DatabaseFamilyId>('relational');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('orders_finance');

  // --- Tab 2: Pocket 7 Terms & Two-Level CPMAI Cleansing Lab ---
  const [activePocketTermId, setActivePocketTermId] = useState<string>('primary_key');
  const [columnsState, setColumnsState] = useState<ColumnSelectionStateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLUMNS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return getInitialColumnSelectionState();
  });

  const [sampleRowsState, setSampleRowsState] = useState<RowSelectionStateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return getInitialRowSelectionState();
  });

  // --- Tab 3: Live CRUD Mini-App & Dynamic Downloads ---
  const [records, setRecords] = useState<TechnicalReportRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return getSeedTechnicalReports();
  });

  const [checklist, setChecklist] = useState<VerificationChecklistState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return {
      createdValidRecord: false,
      triggeredEmptyValidation: false,
      updatedRecord: false,
      softDeletedAndVerifiedJson: false
    };
  });

  const [hasSoftDeletedAny, setHasSoftDeletedAny] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDate, setFormDate] = useState<string>(() => getTodayIsoDate());
  const [formCategory, setFormCategory] = useState<ReportCategory>('تجهیزات');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formStatus, setFormStatus] = useState<ReportStatus>('باز');
  const [metadataMode, setMetadataMode] = useState<'pairs' | 'note'>('pairs');
  const [metadataPairs, setMetadataPairs] = useState<MetadataPair[]>([
    { key: 'equipment_tag', value: '' }
  ]);
  const [metadataFreeNote, setMetadataFreeNote] = useState<string>('');
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [formFeedbackFa, setFormFeedbackFa] = useState<string | null>(null);

  const [filterState, setFilterState] = useState<CrudFilterState>({
    category: 'ALL',
    status: 'ALL',
    includeDeleted: false,
    searchText: ''
  });

  // Inline editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editStatus, setEditStatus] = useState<ReportStatus>('باز');
  const [editError, setEditError] = useState<string | null>(null);

  // Soft Delete modal state
  const [softDeleteTarget, setSoftDeleteTarget] = useState<TechnicalReportRecord | null>(null);
  const [softDeleteReason, setSoftDeleteReason] = useState<string>('');
  const [softDeleteError, setSoftDeleteError] = useState<string | null>(null);

  // Dynamic SQL / Markdown deliverables state
  const [sqlDialect, setSqlDialect] = useState<SqlDialect>('postgresql');
  const [activeDeliverableTab, setActiveDeliverableTab] = useState<'schema' | 'markdown'>('schema');

  // --- Tab 4: 25-Term Glossary State ---
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<'all' | GlossaryCategoryId>('all');

  // Persist CRUD & Lab state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklist));
    } catch {
      // ignore
    }
  }, [checklist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(columnsState));
    } catch {
      // ignore
    }
  }, [columnsState]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROWS, JSON.stringify(sampleRowsState));
    } catch {
      // ignore
    }
  }, [sampleRowsState]);

  // Derived data
  const trackAdaptation = TRACK_DATABASE_ADAPTATIONS[industryTrack] || TRACK_DATABASE_ADAPTATIONS.CIVIL_INFRA;

  const selectedFamily = useMemo(
    () => DATABASE_FAMILIES.find((f) => f.id === selectedFamilyId) || DATABASE_FAMILIES[0],
    [selectedFamilyId]
  );

  const scenarioRecommendation = useMemo(
    () => recommendDatabaseByScenarioId(selectedScenarioId),
    [selectedScenarioId]
  );

  const activePocketTerm = useMemo(
    () => POCKET_DICTIONARY_TERMS.find((t) => t.id === activePocketTermId) || POCKET_DICTIONARY_TERMS[0],
    [activePocketTermId]
  );

  const piiColumnsRemaining = useMemo(
    () => columnsState.filter((c) => c.isPii && c.included),
    [columnsState]
  );

  const includedSqlNames = useMemo(
    () => columnsState.filter((c) => c.included).map((c) => c.sqlName),
    [columnsState]
  );

  const visibleRecords = useMemo(
    () => filterTechnicalReports(records, filterState),
    [records, filterState]
  );

  const cleanExportRecords = useMemo(
    () =>
      buildCleanAnalyticalExport(records, {
        category: filterState.category,
        status: filterState.status,
        searchText: filterState.searchText
      }),
    [records, filterState]
  );

  const activeCleanCount = useMemo(
    () => records.filter((r) => !r.is_deleted).length,
    [records]
  );

  const excludedLiveCount = useMemo(
    () => records.filter((r) => r.is_deleted).length,
    [records]
  );

  const liveSqlQuery = useMemo(
    () => buildTransparencySqlQuery(filterState, includedSqlNames),
    [filterState, includedSqlNames]
  );

  const liveCleanJsonString = useMemo(
    () => JSON.stringify(cleanExportRecords, null, 2),
    [cleanExportRecords]
  );

  const previewExtraMetadataObj = useMemo(
    () => buildExtraMetadataObject(metadataMode, metadataPairs, metadataFreeNote),
    [metadataMode, metadataPairs, metadataFreeNote]
  );

  const dynamicSchemaSql = useMemo(
    () =>
      generateDynamicSchemaSql({
        dialect: sqlDialect,
        columns: columnsState,
        industryTrack
      }),
    [sqlDialect, columnsState, industryTrack]
  );

  const dynamicHomeworkMarkdown = useMemo(
    () =>
      generateDynamicHomeworkMarkdown({
        dialect: sqlDialect,
        columns: columnsState,
        sampleRows: sampleRowsState,
        activeSqlQuery: liveSqlQuery,
        industryTrack,
        activeCleanCount,
        excludedLiveCount
      }),
    [
      sqlDialect,
      columnsState,
      sampleRowsState,
      liveSqlQuery,
      industryTrack,
      activeCleanCount,
      excludedLiveCount
    ]
  );

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      if (glossaryCategory !== 'all' && item.category !== glossaryCategory) return false;
      if (!q) return true;
      const hay =
        `${item.termEn} ${item.termFa} ${item.simpleDefinitionFa} ${item.everydayAnalogyFa}`.toLowerCase();
      return hay.includes(q);
    });
  }, [glossarySearch, glossaryCategory]);

  const completedChecklistCount = useMemo(
    () => Object.values(checklist).filter(Boolean).length,
    [checklist]
  );

  // Handlers
  const handleStageChange = (stage: WorkshopStageTab) => {
    playTactileSound('switch');
    setActiveStage(stage);
  };

  const handleSelectScenario = (scenarioId: string) => {
    playTactileSound('switch');
    setSelectedScenarioId(scenarioId);
    const rec = recommendDatabaseByScenarioId(scenarioId);
    setSelectedFamilyId(rec.family.id);
  };

  const handleToggleColumnIncluded = (colId: string) => {
    playTactileSound('switch');
    setColumnsState((prev) =>
      prev.map((col) => {
        if (col.id !== colId) return col;
        // Keep primary key id always included
        if (col.sqlName === 'id') return col;
        return { ...col, included: !col.included };
      })
    );
  };

  const handleColumnRationaleChange = (colId: string, nextRationale: string) => {
    setColumnsState((prev) =>
      prev.map((col) => (col.id === colId ? { ...col, rationaleFa: nextRationale } : col))
    );
  };

  const handleToggleSampleRowExcluded = (rowId: number) => {
    playTactileSound('switch');
    setSampleRowsState((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        const nextExcluded = !row.excluded;
        return {
          ...row,
          excluded: nextExcluded,
          exclusionReason:
            nextExcluded && !row.exclusionReason.trim()
              ? 'رکورد نامعتبر یا خارج از دامنه تحلیل (حذف نرم CPMAI)'
              : row.exclusionReason
        };
      })
    );
  };

  const handleSampleRowReasonChange = (rowId: number, reason: string) => {
    setSampleRowsState((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, exclusionReason: reason } : row))
    );
  };

  const handleResetCleansingLab = () => {
    playTactileSound('switch');
    setColumnsState(getInitialColumnSelectionState());
    setSampleRowsState(getInitialRowSelectionState());
  };

  const handleAddMetadataPair = () => {
    setMetadataPairs((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleUpdateMetadataPair = (index: number, field: 'key' | 'value', val: string) => {
    setMetadataPairs((prev) =>
      prev.map((pair, idx) => (idx === index ? { ...pair, [field]: val } : pair))
    );
  };

  const handleRemoveMetadataPair = (index: number) => {
    setMetadataPairs((prev) => (prev.length <= 1 ? [{ key: '', value: '' }] : prev.filter((_, i) => i !== index)));
  };

  const handleLoadTrackSampleIntoForm = () => {
    playTactileSound('switch');
    setFormTitle(trackAdaptation.sampleTitleFa);
    setFormDate(getTodayIsoDate());
    setFormCategory(trackAdaptation.sampleCategoryFa);
    setFormDescription(trackAdaptation.sampleDescriptionFa);
    setFormStatus('باز');
    setMetadataMode('pairs');
    setMetadataPairs(trackAdaptation.sampleMetadataPairs.map((p) => ({ ...p })));
    setFormErrors({});
    setFormFeedbackFa(`مثال مسیر «${trackAdaptation.trackLabelFa}» در فرم بارگذاری شد. دکمه ثبت رکورد را بزنید.`);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createTechnicalReport(records, {
      title: formTitle,
      report_date: formDate,
      category: formCategory,
      description: formDescription,
      status: formStatus,
      metadataMode,
      metadataPairs,
      metadataFreeNote
    });

    if (!res.ok) {
      playTactileSound('switch');
      setFormErrors(res.errors);
      setFormFeedbackFa(null);
      if (res.errors.title || res.errors.description) {
        setChecklist((prev) => ({ ...prev, triggeredEmptyValidation: true }));
      }
      return;
    }

    playTactileSound('thock');
    setRecords(res.nextRecords);
    setFormErrors({});
    setFormTitle('');
    setFormDescription('');
    setMetadataPairs([{ key: 'equipment_tag', value: '' }]);
    setMetadataFreeNote('');
    setFormFeedbackFa(`رکورد جدید با شناسه #${res.record.id} در جدول technical_reports ثبت شد.`);
    setChecklist((prev) => ({ ...prev, createdValidRecord: true }));
  };

  const handleStartEdit = (rec: TechnicalReportRecord) => {
    playTactileSound('switch');
    setEditingId(rec.id);
    setEditTitle(rec.title);
    setEditDescription(rec.description);
    setEditStatus(rec.status);
    setEditError(null);
  };

  const handleSaveEdit = (id: number) => {
    const res = updateTechnicalReport(records, id, {
      title: editTitle,
      description: editDescription,
      status: editStatus
    });
    if (!res.ok) {
      setEditError(res.errors.title || res.errors.description || 'ورودی ویرایش نامعتبر است.');
      return;
    }
    playTactileSound('thock');
    setRecords(res.nextRecords);
    setEditingId(null);
    setEditError(null);
    setChecklist((prev) => ({ ...prev, updatedRecord: true }));
  };

  const handleConfirmSoftDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!softDeleteTarget) return;
    const res = softDeleteTechnicalReport(records, softDeleteTarget.id, softDeleteReason);
    if (!res.ok) {
      setSoftDeleteError(res.error);
      return;
    }
    playTactileSound('thock');
    setRecords(res.nextRecords);
    setSoftDeleteTarget(null);
    setSoftDeleteReason('');
    setSoftDeleteError(null);
    setHasSoftDeletedAny(true);
    // Live JSON preview is rendered right alongside SQL, so any valid Soft Delete immediately reflects in clean JSON
    setChecklist((prev) => ({ ...prev, softDeletedAndVerifiedJson: true }));
  };

  const handleRestoreRecord = (id: number) => {
    playTactileSound('switch');
    setRecords((prev) => restoreTechnicalReport(prev, id));
  };

  const handleDownloadCleanJson = () => {
    playTactileSound('switch');
    triggerTextDownload(
      `${CANONICAL_TABLE_NAME}_clean.json`,
      liveCleanJsonString,
      'application/json;charset=utf-8'
    );
    if (hasSoftDeletedAny || excludedLiveCount > 0) {
      setChecklist((prev) => ({ ...prev, softDeletedAndVerifiedJson: true }));
    }
  };

  const handleResetDemoCrud = () => {
    playTactileSound('switch');
    setRecords(getSeedTechnicalReports());
    setChecklist({
      createdValidRecord: false,
      triggeredEmptyValidation: false,
      updatedRecord: false,
      softDeletedAndVerifiedJson: false
    });
    setHasSoftDeletedAny(false);
    setFormErrors({});
    setFormFeedbackFa('داده‌های نمونه اولیه و چک‌لیست تست ۴ مرحله‌ای بازنشانی شدند.');
  };

  const currentStageIdx = Math.max(0, STAGE_TABS.findIndex((s) => s.id === activeStage));
  const stageSteps: FocusedStepItem[] = STAGE_TABS.map((tab) => ({
    id: tab.id,
    title: tab.labelFa,
    category: tab.shortSubFa
  }));
  const boundary = getStepBoundaryState(currentStageIdx, stageSteps.length);

  const handleSelectStageByIndex = (idx: number) => {
    const nextIdx = clampStepIndex(idx, stageSteps.length);
    setVisitedStageIndices((prev) => markStepVisited(prev, nextIdx));
    handleStageChange(STAGE_TABS[nextIdx].id);
  };

  return (
    <div data-testid="database-crud-workshop" className="text-right" dir="rtl">
      <FocusedLessonLayout
        lang="fa"
        moduleCode="ماژول ۵-۳"
        moduleTitle="ساختارسازی داده، انتخاب پایگاه داده و عملیات دائمی (CRUD)"
        moduleSubtitle={`استاندارد PMI-CPMAI: فاز سوم — آماده‌سازی داده · جدول ${CANONICAL_TABLE_NAME}`}
        steps={stageSteps}
        activeStepIndex={currentStageIdx}
        visitedStepIndices={visitedStageIndices}
        onSelectStep={handleSelectStageByIndex}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={setIsMobileDrawerOpen}
        sidebarTitleFa="مراحل کارگاه دیتابیس"
        stepUnitFa="مرحله"
      >
        <div className="space-y-6">
          {/* Calm Golden Class Rule banner */}
          <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-border)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--cpai-primary-strong)]">
                قانون طلایی این کلاس
              </p>
              <p className="text-sm text-[var(--cpai-text)] leading-relaxed">
                شما قرار نیست کدها را از حفظ بنویسید. نقش شما <strong className="font-bold text-[var(--cpai-primary-strong)]">طراح و تصمیم‌گیرنده</strong> است و نقش هوش مصنوعی <strong className="font-bold text-[var(--cpai-primary-strong)]">کدنویس کمکی</strong>. اگر مفهوم و منطق این درس را بفهمید، هوش مصنوعی تمام کدها را دقیق و بی‌نقص تولید می‌کند.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] shrink-0 tabular-nums">
              <span>۴ مرحله کارگاهی</span>
              <span aria-hidden="true" className="opacity-40">|</span>
              <span>۲۵ واژه مرجع</span>
            </div>
          </div>

      {/* ================================================================= */}
      {/* TAB 1: EXCEL VS DB + 8 DATABASE FAMILIES & DECISION SIMULATOR     */}
      {/* ================================================================= */}
      {activeStage === 'databases' && (
        <div className="space-y-6" data-testid="stage-databases">
          {/* Section 1: Why Excel & Notepad aren't enough */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">بخش ۱ · مقدمه مفهومی</p>
              <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                چرا فایل اکسل و دفترچه یادداشت برای پروژه‌های واقعی کافی نیست؟
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                در روزهای اول شاید چند فایل اکسل یا PDF کارتان را راه بیندازد؛ اما به‌محض اینکه اطلاعات زیاد شود یا بخواهید هوش مصنوعی را روی آن‌ها سوار کنید، سه بحران جدی رخ می‌دهد:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {EXCEL_LIMITATIONS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1.5"
                >
                  <div className="text-xs font-mono font-bold text-[#e0533c] tabular-nums">
                    بحران {item.order} از ۳
                  </div>
                  <h4 className="text-sm font-bold text-[#261a1d] dark:text-[#faedf3]">
                    {item.titleFa}
                  </h4>
                  <p className="text-xs text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                    {item.detailFa}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#151e28] border border-[#dbe7ee] dark:border-[#2a3b4c] text-xs sm:text-sm text-[#1e293b] dark:text-[#e2e8f0] leading-relaxed">
              <strong className="font-black text-[#1f5163] dark:text-[#7ec6da]">تعریف پایگاه داده (Database): </strong>
              یک انبار دیجیتال منظم، سریع و مطمئن است که اطلاعات را به‌صورت دائمی نگه می‌دارد و به هر سؤالی که از آن بپرسید، در کسری از ثانیه جواب دقیق می‌دهد.
            </div>
          </div>

          {/* Section 2: Interactive 8-DB Online Store Story + Decision Advisor */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-4 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  بخش ۲ · شبیه‌ساز داستان‌محور فروشگاه آنلاین
                </p>
                <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                  شناخت ۸ خانواده اصلی دیتابیس (هر کجا قبلی کم آورد، بعدی وارد میدان می‌شود)
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  همه اسم‌های ترسناک مثل PostgreSQL، MongoDB، Redis و Elasticsearch فقط ۸ ایده متفاوت برای «شکل خاص داده» و «پاسخ سریع به یک سؤال خاص» هستند.
                </p>
              </div>
              <div className="text-xs font-bold text-[#1f5163] dark:text-[#7ec6da] shrink-0">
                سؤال کلیدی معمار: «داده من چه شکلی است و چه سؤالی از آن می‌پرسم؟»
              </div>
            </div>

            {/* Quick Interactive Advisor: Pick Your Scenario */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#261a1d] dark:text-[#faedf3]">
                  انتخابگر سریع سناریو (مسئله پروژه خود را انتخاب کنید تا دیتابیس مناسب فعال شود):
                </span>
                <span className="text-[11px] text-[#64748b] dark:text-[#ad99ab] tabular-nums">
                  ۸ سناریوی واقعی
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DB_DECISION_SCENARIOS.map((sc) => {
                  const isSelected = selectedScenarioId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => handleSelectScenario(sc.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#1f5163] text-white border-[#1f5163]'
                          : 'bg-[#fdf8f5] dark:bg-[#16101c] text-[#334155] dark:text-[#cbd5e1] border-[#ecdcd8] dark:border-[#382645] hover:border-[#1f5163]'
                      }`}
                    >
                      {sc.labelFa}
                    </button>
                  );
                })}
              </div>
              <div className="p-3 rounded-xl bg-[#f4f9fb] dark:bg-[#16222c] border border-[#cde1e8] dark:border-[#2a4554] text-xs text-[#1e293b] dark:text-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-[#1f5163] dark:text-[#7ec6da]">پیشنهاد شبیه‌ساز: </span>
                  <span>
                    {scenarioRecommendation.family.titleFa} ({scenarioRecommendation.family.titleEn}) —{' '}
                    {scenarioRecommendation.scenario.questionFa}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#1f5163] dark:text-[#7ec6da] shrink-0">
                  {scenarioRecommendation.scenario.startWithPostgresNoteFa}
                </span>
              </div>
            </div>

            {/* Two-Zone Sandbox Split: Story Rail (right) + Detailed Family Stage (left) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Control / Story Deck (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                {DATABASE_FAMILIES.map((family) => {
                  const isActive = selectedFamily.id === family.id;
                  return (
                    <button
                      key={family.id}
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setSelectedFamilyId(family.id);
                      }}
                      className={`w-full p-3 rounded-xl border text-right transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                        isActive
                          ? 'bg-[#1f5163] text-white border-[#1f5163]'
                          : 'bg-[#fdf8f5] dark:bg-[#16101c] text-[#261a1d] dark:text-[#faedf3] border-[#ecdcd8] dark:border-[#382645] hover:border-[#1f5163]/60'
                      }`}
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black tabular-nums opacity-80">
                            {family.order}.
                          </span>
                          <span className="text-xs sm:text-[13px] font-bold truncate">
                            {family.titleFa}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] truncate ${
                            isActive ? 'text-white/80' : 'text-[#64748b] dark:text-[#ad99ab]'
                          }`}
                        >
                          {family.titleEn} · {family.taglineFa}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-mono shrink-0 mt-0.5 ${
                          isActive ? 'text-white/90' : 'text-[#64748b] dark:text-[#94a3b8]'
                        }`}
                      >
                        {family.examples[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Stage Detail Panel (8 cols) */}
              <div
                data-testid="selected-db-detail"
                className="lg:col-span-8 p-5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-[#ecdcd8] dark:border-[#382645]">
                    <div className="space-y-1">
                      <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                        {selectedFamily.storeStageFa}
                      </p>
                      <h4 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                        {selectedFamily.order}. {selectedFamily.titleFa} ({selectedFamily.titleEn}) —{' '}
                        {selectedFamily.taglineFa}
                      </h4>
                    </div>
                    <div className="text-xs font-mono text-[#1f5163] dark:text-[#7ec6da] shrink-0">
                      {selectedFamily.examples.join(' · ')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
                    <div className="space-y-1">
                      <div className="font-bold text-[#261a1d] dark:text-[#faedf3]">مسئله در داستان فروشگاه</div>
                      <p className="text-[#475569] dark:text-[#cbd5e1]">{selectedFamily.problemFa}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-[#261a1d] dark:text-[#faedf3]">چطور کار می‌کند؟</div>
                      <p className="text-[#475569] dark:text-[#cbd5e1]">{selectedFamily.howItWorksFa}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                    <div className="text-xs font-bold text-[#1f5163] dark:text-[#7ec6da]">
                      {selectedFamily.superpowerTitleFa}
                    </div>
                    <p className="text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                      {selectedFamily.superpowerFa}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="space-y-1.5">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>مزایا و نقاط قوت</span>
                      </div>
                      <ul className="space-y-1 text-[#334155] dark:text-[#cbd5e1] list-disc pr-4">
                        {selectedFamily.prosFa.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-bold text-[#b45309] dark:text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>محدودیت‌ها</span>
                      </div>
                      <ul className="space-y-1 text-[#334155] dark:text-[#cbd5e1] list-disc pr-4">
                        {selectedFamily.consFa.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Live Data / Query Shape Preview */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-[#64748b] dark:text-[#ad99ab]">
                      {selectedFamily.sampleSnippetLabel}
                    </div>
                    <pre
                      dir="ltr"
                      className="p-3 rounded-xl bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] leading-relaxed overflow-x-auto text-left"
                    >
                      {selectedFamily.sampleSnippet}
                    </pre>
                  </div>
                </div>

                {selectedFamily.postgresAlternativeNoteFa && (
                  <div className="p-3 rounded-xl bg-[#f4f9fb] dark:bg-[#16222c] border border-[#cde1e8] dark:border-[#2a4554] text-xs text-[#1f5163] dark:text-[#9bd3e3]">
                    <strong>مسیر شروع بدون پیچیدگی: </strong>
                    {selectedFamily.postgresAlternativeNoteFa}
                  </div>
                )}
              </div>
            </div>

            {/* 8-Row Summary Comparison Table */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                  جدول مقایسه سریع ۸ خانواده پایگاه داده در یک نگاه
                </h4>
                <span className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  روی هر ردیف کلیک کنید تا جزئیاتش بالا نمایش داده شود
                </span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#ecdcd8] dark:border-[#382645]">
                <table className="w-full text-xs text-right border-collapse">
                  <thead className="bg-[#fdf8f5] dark:bg-[#16101c] text-[#475569] dark:text-[#cbd5e1] border-b border-[#ecdcd8] dark:border-[#382645]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">#</th>
                      <th className="py-2.5 px-3 font-bold">نوع دیتابیس</th>
                      <th className="py-2.5 px-3 font-bold">شکل داده</th>
                      <th className="py-2.5 px-3 font-bold">بهترین سؤال / کاربرد</th>
                      <th className="py-2.5 px-3 font-bold">مثال‌های مشهور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecdcd8]/70 dark:divide-[#382645]/70">
                    {DATABASE_FAMILIES.map((family) => {
                      const isRowActive = selectedFamily.id === family.id;
                      return (
                        <tr
                          key={family.id}
                          onClick={() => {
                            playTactileSound('switch');
                            setSelectedFamilyId(family.id);
                          }}
                          className={`cursor-pointer transition-colors ${
                            isRowActive
                              ? 'bg-[#f4f9fb] dark:bg-[#16222c]'
                              : 'bg-white dark:bg-[#201729] hover:bg-[#fdf8f5] dark:hover:bg-[#1a1322]'
                          }`}
                        >
                          <td className="py-2.5 px-3 font-mono font-bold tabular-nums text-[#64748b] dark:text-[#94a3b8]">
                            {family.order}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-[#261a1d] dark:text-[#faedf3] whitespace-nowrap">
                            {family.titleFa}{' '}
                            <span className="font-mono font-normal text-[#64748b] dark:text-[#ad99ab]">
                              ({family.titleEn})
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-[#334155] dark:text-[#cbd5e1]">
                            {family.dataShapeFa}
                          </td>
                          <td className="py-2.5 px-3 text-[#334155] dark:text-[#cbd5e1]">
                            {family.bestQuestionFa}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-[#1f5163] dark:text-[#7ec6da]">
                            {family.examples.join('، ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Beginner Warning & Golden Starting Strategy + Active Industry Track Adaptation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#fff8f6] dark:bg-[#28171c] border border-[#f5d0c8] dark:border-[#5b2a33] space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-[#c2410c] dark:text-[#fda4af]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>هشدار برای تازه‌کارها: تله چنددیتابیسی (Polyglot Persistence)</span>
                </div>
                <p className="text-xs text-[#334155] dark:text-[#e2e8f0] leading-relaxed">
                  بزرگ‌ترین اشتباه مبتدی‌ها این است که روز اول پروژه سراغ نصب هم‌زمان PostgreSQL، MongoDB، Redis و Elasticsearch بروند.{' '}
                  <strong>قانون طلایی شروع:</strong> تقریباً همیشه فقط با <strong>PostgreSQL</strong> (یا نسخه آفلاین و سبک <strong>SQLite</strong>) شروع کنید. خود PostgreSQL به‌تنهایی جدول رابطه‌ای، اسناد JSON (با <code className="font-mono">JSONB</code>)، جستجوی متنی، سری زمانی (<code className="font-mono">TimescaleDB</code>) و حتی جستجوی برداری AI (<code className="font-mono">pgvector</code>) را پوشش می‌دهد.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f4f9fb] dark:bg-[#16222c] border border-[#cde1e8] dark:border-[#2a4554] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-[#1f5163] dark:text-[#7ec6da]">
                    تطبیق با مسیر صنعتی فعال شما: {trackAdaptation.trackLabelFa}
                  </span>
                  <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">مثال اختصاصی مسیر</span>
                </div>
                <p className="text-xs text-[#1e293b] dark:text-[#e2e8f0] leading-relaxed">
                  {trackAdaptation.tableContextFa}
                </p>
                <p className="text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                  <strong>چرا PostgreSQL در این مسیر؟ </strong>
                  {trackAdaptation.postgresBenefitFa}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: POCKET 7 TERMS + CPMAI SELECT DATA (COL & ROW) + SOFT DEL  */}
      {/* ================================================================= */}
      {activeStage === 'cpmai' && (
        <div className="space-y-6" data-testid="stage-cpmai">
          {/* Section 3: Pocket 7-Word Dictionary + Interactive Table Anatomy */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-5">
            <div className="space-y-1">
              <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">بخش ۳ · واژگان بنیادین</p>
              <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                فرهنگ لغت جیبی دیتابیس (فقط ۷ کلمه برای تسلط بر مکالمه با هوش مصنوعی)
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                روی هر یک از ۷ مفهوم کلیک کنید تا جایگاه دقیق آن روی جدول نمونه <code className="font-mono">{CANONICAL_TABLE_NAME}</code> روشن شود.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {POCKET_DICTIONARY_TERMS.map((item) => {
                const isSelected = activePocketTerm.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setActivePocketTermId(item.id);
                    }}
                    className={`p-3 rounded-xl border text-right transition-colors cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-[#1f5163] text-white border-[#1f5163]'
                        : 'bg-[#fdf8f5] dark:bg-[#16101c] text-[#261a1d] dark:text-[#faedf3] border-[#ecdcd8] dark:border-[#382645] hover:border-[#1f5163]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold">{item.order}. {item.termFa}</span>
                      <span
                        className={`font-mono text-[11px] ${
                          isSelected ? 'text-white/85' : 'text-[#1f5163] dark:text-[#7ec6da]'
                        }`}
                      >
                        {item.termEn}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] leading-relaxed ${
                        isSelected ? 'text-white/90' : 'text-[#475569] dark:text-[#cbd5e1]'
                      }`}
                    >
                      {item.simpleMeaningFa}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Interactive Table Anatomy Visual */}
            <div className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#1f5163] dark:text-[#7ec6da]">
                  آناتومی زنده جدول · مفهوم انتخاب‌شده: {activePocketTerm.termFa} ({activePocketTerm.termEn})
                </span>
                <span className="font-mono text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                  Table: {CANONICAL_TABLE_NAME}
                </span>
              </div>

              <div
                className={`overflow-x-auto rounded-lg border transition-colors ${
                  activePocketTerm.tableHighlightPart === 'table'
                    ? 'border-[#1f5163] ring-2 ring-[#1f5163]/25'
                    : 'border-[#ecdcd8] dark:border-[#382645]'
                }`}
              >
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr
                      className={`border-b border-[#ecdcd8] dark:border-[#382645] ${
                        activePocketTerm.tableHighlightPart === 'column' ||
                        activePocketTerm.tableHighlightPart === 'schema'
                          ? 'bg-[#e6f3f7] dark:bg-[#1d3947] text-[#1f5163] dark:text-[#9bd3e3]'
                          : 'bg-white dark:bg-[#201729] text-[#475569] dark:text-[#cbd5e1]'
                      }`}
                    >
                      <th
                        className={`py-2 px-3 font-mono ${
                          activePocketTerm.tableHighlightPart === 'pk'
                            ? 'bg-[#1f5163] text-white'
                            : ''
                        }`}
                      >
                        id (PK)
                      </th>
                      <th className="py-2 px-3 font-mono">title (TEXT NOT NULL)</th>
                      <th className="py-2 px-3 font-mono">report_date (ISO)</th>
                      <th className="py-2 px-3 font-mono">status (CHECK)</th>
                      <th className="py-2 px-3 font-mono">is_deleted (BOOL)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecdcd8]/60 dark:divide-[#382645]/60 bg-white dark:bg-[#201729]">
                    <tr
                      className={
                        activePocketTerm.tableHighlightPart === 'row'
                          ? 'bg-[#e6f3f7] dark:bg-[#1d3947]'
                          : ''
                      }
                    >
                      <td
                        className={`py-2 px-3 font-mono font-bold tabular-nums ${
                          activePocketTerm.tableHighlightPart === 'pk'
                            ? 'bg-[#1f5163]/15 text-[#1f5163] dark:text-[#7ec6da]'
                            : ''
                        }`}
                      >
                        1
                      </td>
                      <td className="py-2 px-3">نشتی آب‌بند پمپ تغذیه</td>
                      <td className="py-2 px-3 tabular-nums">۱۴۰۴/۱۲/۱۹</td>
                      <td className="py-2 px-3">در حال پیگیری</td>
                      <td className="py-2 px-3 font-mono">FALSE</td>
                    </tr>
                    <tr>
                      <td
                        className={`py-2 px-3 font-mono font-bold tabular-nums ${
                          activePocketTerm.tableHighlightPart === 'pk'
                            ? 'bg-[#1f5163]/15 text-[#1f5163] dark:text-[#7ec6da]'
                            : ''
                        }`}
                      >
                        2
                      </td>
                      <td className="py-2 px-3">نقص حفاظ ایمنی سکو</td>
                      <td className="py-2 px-3 tabular-nums">۱۴۰۴/۱۲/۲۰</td>
                      <td className="py-2 px-3">باز</td>
                      <td className="py-2 px-3 font-mono">FALSE</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {(activePocketTerm.tableHighlightPart === 'query' ||
                activePocketTerm.tableHighlightPart === 'crud') && (
                <div className="p-3 rounded-lg bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] text-left" dir="ltr">
                  {activePocketTerm.tableHighlightPart === 'query'
                    ? `SELECT id, title, status FROM ${CANONICAL_TABLE_NAME} WHERE is_deleted = FALSE AND status = 'باز';`
                    : `CREATE (INSERT) · READ (SELECT) · UPDATE (SET status = 'بسته‌شده') · SOFT DELETE (SET is_deleted = TRUE)`}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: PMI-CPMAI Select Data Rules + Two-Level Interactive Cleansing Lab */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  بخش ۴ · حاکمیت استاندارد PMI-CPMAI (تسک Select Data)
                </p>
                <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                  آزمایشگاه گزینش ستونی (حذف PII) و گزینش سطری (حذف نرم) با ثبت دلیل شفاف
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  تغییرات شما در این آزمایشگاه به‌طور زنده به فایل‌های <code className="font-mono">schema.sql</code> و{' '}
                  <code className="font-mono">05_data_selection_and_schema.md</code> در تب ۳ منتقل می‌شوند.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetCleansingLab}
                className="px-3 py-1.5 rounded-lg border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] text-xs font-semibold text-[#334155] dark:text-[#cbd5e1] hover:border-[#1f5163] flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>بازگردانی به حالت استاندارد جزوه</span>
              </button>
            </div>

            {/* 3 CPMAI Select Data Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CPMAI_SELECT_DATA_CRITERIA.map((cr) => (
                <div
                  key={cr.id}
                  className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1"
                >
                  <div className="text-xs font-bold text-[#1f5163] dark:text-[#7ec6da]">{cr.titleFa}</div>
                  <p className="text-xs text-[#475569] dark:text-[#cbd5e1] leading-relaxed">{cr.detailFa}</p>
                </div>
              ))}
            </div>

            {/* Compliance Live Banner */}
            <div
              data-testid="pii-compliance-banner"
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                piiColumnsRemaining.length === 0
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {piiColumnsRemaining.length === 0 ? (
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                )}
                <span>
                  {piiColumnsRemaining.length === 0
                    ? 'انطباق کامل حریم خصوصی CPMAI: هیچ ستون PII در اسکیمای نهایی وجود ندارد.'
                    : `هشدار حریم خصوصی: ${piiColumnsRemaining.length} ستون حساس PII هنوز فعال است (${piiColumnsRemaining
                        .map((c) => c.rawLabelFa)
                        .join('، ')}).`}
                </span>
              </div>
              <span className="font-mono tabular-nums shrink-0">
                ستون‌های فعال: {columnsState.filter((c) => c.included).length}/{columnsState.length}
              </span>
            </div>

            {/* Level 1: Column Selection + Editable Inclusion/Exclusion Rationale */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                  سطح ۱ — گزینش ستون‌ها (Column / Attribute Selection) و ثبت دلیل شمول یا حذف
                </h4>
                <span className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  مسیر فعال: {trackAdaptation.piiExampleFa}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#ecdcd8] dark:border-[#382645]">
                <table className="w-full text-xs text-right border-collapse">
                  <thead className="bg-[#fdf8f5] dark:bg-[#16101c] text-[#475569] dark:text-[#cbd5e1] border-b border-[#ecdcd8] dark:border-[#382645]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">وضعیت شمول</th>
                      <th className="py-2.5 px-3 font-bold">ستون جدول خام</th>
                      <th className="py-2.5 px-3 font-bold">نام SQL</th>
                      <th className="py-2.5 px-3 font-bold">حساسیت PII</th>
                      <th className="py-2.5 px-3 font-bold">دلیل شمول یا حذف (Rationale — قابل ویرایش)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecdcd8]/70 dark:divide-[#382645]/70">
                    {columnsState.map((col) => {
                      const isPrimaryKey = col.sqlName === 'id';
                      return (
                        <tr
                          key={col.id}
                          className={
                            col.included
                              ? 'bg-white dark:bg-[#201729]'
                              : 'bg-[#fdf8f5]/80 dark:bg-[#16101c]/80 opacity-85'
                          }
                        >
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <button
                              type="button"
                              disabled={isPrimaryKey}
                              aria-label={`${col.included ? 'حذف' : 'شمول'} ستون ${col.rawLabelFa}`}
                              onClick={() => handleToggleColumnIncluded(col.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                                isPrimaryKey
                                  ? 'bg-[#1f5163]/10 text-[#1f5163] dark:text-[#7ec6da] border-[#1f5163]/30 cursor-not-allowed'
                                  : col.included
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 cursor-pointer'
                                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800 cursor-pointer'
                              }`}
                            >
                              {isPrimaryKey
                                ? 'الزامی (PK)'
                                : col.included
                                ? 'شمول (Include)'
                                : 'حذف‌شده (Exclude)'}
                            </button>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-[#261a1d] dark:text-[#faedf3] whitespace-nowrap">
                            {col.rawLabelFa}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#1f5163] dark:text-[#7ec6da] whitespace-nowrap">
                            {col.sqlName}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {col.isPii ? (
                              <span className="font-bold text-[#c2410c] dark:text-[#fda4af]">
                                بله · حساس (PII)
                              </span>
                            ) : (
                              <span className="text-[#64748b] dark:text-[#94a3b8]">خیر</span>
                            )}
                          </td>
                          <td className="py-2 px-3 min-w-[260px]">
                            <input
                              type="text"
                              aria-label={`دلیل تصمیم برای ستون ${col.rawLabelFa}`}
                              value={col.rationaleFa}
                              onChange={(e) => handleColumnRationaleChange(col.id, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Level 2: Row Selection (4 Sample Rows incl. Test & Incomplete Rows) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                  سطح ۲ — گزینش سطرها (Row / Record Selection) با حذف نرم و دلیل مستند
                </h4>
                <span className="text-xs text-[#64748b] dark:text-[#ad99ab] tabular-nums">
                  سطرهای تمیز: {sampleRowsState.filter((r) => !r.excluded).length} · کنارگذاشته‌شده:{' '}
                  {sampleRowsState.filter((r) => r.excluded).length}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#ecdcd8] dark:border-[#382645]">
                <table className="w-full text-xs text-right border-collapse">
                  <thead className="bg-[#fdf8f5] dark:bg-[#16101c] text-[#475569] dark:text-[#cbd5e1] border-b border-[#ecdcd8] dark:border-[#382645]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">id</th>
                      <th className="py-2.5 px-3 font-bold">عنوان رکورد نمونه</th>
                      <th className="py-2.5 px-3 font-bold">شرح</th>
                      <th className="py-2.5 px-3 font-bold">تصمیم سطری</th>
                      <th className="py-2.5 px-3 font-bold">دلیل کنارگذاری (exclusion_reason)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecdcd8]/70 dark:divide-[#382645]/70">
                    {sampleRowsState.map((row) => (
                      <tr
                        key={row.id}
                        className={
                          row.excluded
                            ? 'bg-amber-50/40 dark:bg-amber-950/15'
                            : 'bg-white dark:bg-[#201729]'
                        }
                      >
                        <td className="py-2.5 px-3 font-mono font-bold tabular-nums text-[#64748b] dark:text-[#94a3b8]">
                          #{row.id}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#261a1d] dark:text-[#faedf3]">
                          <div>{row.title}</div>
                          <div className="text-[11px] text-[#64748b] dark:text-[#94a3b8] tabular-nums">
                            {formatIsoToJalaliDate(row.reportDate)} · {row.category}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[#475569] dark:text-[#cbd5e1] max-w-xs">
                          {row.description ? (
                            row.description
                          ) : (
                            <span className="font-semibold text-[#c2410c] dark:text-[#fda4af]">
                              (خالی — رکورد ناقص)
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleSampleRowExcluded(row.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition-colors ${
                              row.excluded
                                ? 'bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            {row.excluded ? 'حذف نرم (Excluded)' : 'نگه‌داشتن (Active)'}
                          </button>
                        </td>
                        <td className="py-2 px-3 min-w-[240px]">
                          {row.excluded ? (
                            <input
                              type="text"
                              aria-label={`دلیل کنارگذاری سطر ${row.id}`}
                              value={row.exclusionReason}
                              onChange={(e) => handleSampleRowReasonChange(row.id, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#16101c] border border-amber-300 dark:border-amber-700 text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
                            />
                          ) : (
                            <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                              وارد مجموعه داده تمیز برای تحلیل و AI می‌شود
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hard Delete vs Soft Delete Visual Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-rose-800 dark:text-rose-300">
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <span>حذف سخت (Hard Delete) — روش غیراستاندارد برای پروژه‌های AI</span>
                </div>
                <p className="text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                  با اجرای <code className="font-mono">DELETE FROM technical_reports WHERE id = 103</code>، سطر برای همیشه محو می‌شود. یک ماه بعد هیچ‌کس نمی‌تواند پاسخ دهد چرا این داده از تحلیل کنار رفته یا آیا اشتباهی رخ داده است.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>حذف نرم (Soft Delete) — ترفند مهندسی استاندارد CPMAI</span>
                </div>
                <p className="text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                  به‌جای پاک کردن سطر، دو ستون <code className="font-mono">is_deleted</code> (پیش‌فرض <code className="font-mono">FALSE</code>) و <code className="font-mono">exclusion_reason</code> اضافه می‌کنیم. در کوئری‌های تحلیلی فقط <code className="font-mono">WHERE is_deleted = FALSE</code> می‌خوانیم و ردپای ممیزی کامل می‌ماند.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: LIVE CRUD MINI-APP + PROMPTS + 4 MISTAKES + GITHUB FILES   */}
      {/* ================================================================= */}
      {activeStage === 'crud_lab' && (
        <div className="space-y-6" data-testid="stage-crud-lab">
          {/* Two Execution Paths Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1.5">
              <div className="text-xs font-black text-[#1f5163] dark:text-[#7ec6da]">
                مسیر الف · آفلاین و سریع (SQLite)
              </div>
              <p className="text-xs text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                کل پایگاه داده فقط یک فایل روی کامپیوتر شماست؛ بدون نیاز به اینترنت، ثبت‌نام یا سرور. بهترین گزینه برای تمرین سریع فردی و نمونه‌سازی اولیه با Python / FastAPI.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1.5">
              <div className="text-xs font-black text-[#1f5163] dark:text-[#7ec6da]">
                مسیر ب · آنلاین و تیمی (Supabase / PostgreSQL)
              </div>
              <p className="text-xs text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                یک PostgreSQL واقعی رایگان روی فضای ابری همراه با داشبورد جدولی، پشتیبانی <code className="font-mono">JSONB</code>، API آماده و دسترسی هم‌زمان تیم پروژه.
              </p>
            </div>
          </div>

          {/* LIVE CRUD MINI-APP WORKBENCH */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  بخش ۵ · کارگاه عملی تعاملی درون‌مرورگری (با ذخیره واقعی در مرورگر برای تست رفرش)
                </p>
                <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                  مینی‌اپ زنده ثبت و مدیریت گزارش‌های فنی ({CANONICAL_TABLE_NAME})
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadTrackSampleIntoForm}
                  className="px-3 py-1.5 rounded-lg border border-[#1f5163]/40 bg-[#f4f9fb] dark:bg-[#16222c] text-xs font-semibold text-[#1f5163] dark:text-[#7ec6da] hover:bg-[#e8f4f8] dark:hover:bg-[#1e303e] cursor-pointer whitespace-nowrap"
                >
                  پر کردن فرم با مثال {trackAdaptation.trackLabelFa}
                </button>
                <button
                  type="button"
                  onClick={handleResetDemoCrud}
                  className="px-3 py-1.5 rounded-lg border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] text-xs font-semibold text-[#475569] dark:text-[#cbd5e1] hover:border-[#1f5163] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>بازنشانی داده‌های نمونه</span>
                </button>
              </div>
            </div>

            {/* 4-Step Auto-Ticking Verification Test Checklist */}
            <div
              data-testid="crud-verification-checklist"
              className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-black text-[#261a1d] dark:text-[#faedf3]">
                  چک‌لیست تست ۵ دقیقه‌ای کارگاه (با انجام هر آزمون در مینی‌اپ به‌صورت خودکار تیک می‌خورد)
                </span>
                <span className="font-bold text-[#1f5163] dark:text-[#7ec6da] tabular-nums">
                  {completedChecklistCount} از ۴ تأییدشده
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {[
                  {
                    key: 'createdValidRecord',
                    done: checklist.createdValidRecord,
                    title: '۱. ثبت رکورد معتبر',
                    hint: 'یک گزارش کامل ثبت کنید تا id جدید بگیرد'
                  },
                  {
                    key: 'triggeredEmptyValidation',
                    done: checklist.triggeredEmptyValidation,
                    title: '۲. آزمون فرم خالی',
                    hint: 'فرم را با عنوان یا شرح خالی بزنید تا قید NOT NULL مانع شود'
                  },
                  {
                    key: 'updatedRecord',
                    done: checklist.updatedRecord,
                    title: '۳. ویرایش و پایداری',
                    hint: 'یک سطر را ویرایش کنید؛ پس از رفرش صفحه سر جایش می‌ماند'
                  },
                  {
                    key: 'softDeletedAndVerifiedJson',
                    done: checklist.softDeletedAndVerifiedJson,
                    title: '۴. حذف نرم و JSON تمیز',
                    hint: 'هر رکوردی را با دلیل حذف نرم کنید و حذفش را در JSON زنده ببینید'
                  }
                ].map((step) => (
                  <div
                    key={step.key}
                    data-testid={`check-step-${step.key}`}
                    data-done={step.done ? 'true' : 'false'}
                    className={`p-3 rounded-lg border space-y-1 transition-colors ${
                      step.done
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-[#201729] border-[#ecdcd8] dark:border-[#382645]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      {step.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-[#94a3b8] shrink-0" />
                      )}
                      <span
                        className={
                          step.done
                            ? 'text-emerald-900 dark:text-emerald-200'
                            : 'text-[#261a1d] dark:text-[#faedf3]'
                        }
                      >
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748b] dark:text-[#ad99ab] leading-relaxed">
                      {step.done ? 'تأیید شد' : step.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Form + Records Table Split */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              {/* CREATE FORM (5 cols) */}
              <form
                onSubmit={handleCreateSubmit}
                noValidate
                className="xl:col-span-5 p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3.5"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#ecdcd8] dark:border-[#382645]">
                  <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                    ثبت رکورد جدید (Create)
                  </h4>
                  <span className="font-mono text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                    INSERT INTO {CANONICAL_TABLE_NAME}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label
                    htmlFor="crud-title"
                    className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
                  >
                    عنوان گزارش (<code className="font-mono">title</code>) *
                  </label>
                  <input
                    id="crud-title"
                    type="text"
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (formErrors.title) setFormErrors((p) => ({ ...p, title: undefined }));
                    }}
                    placeholder="مثلاً: نشتی شیر برقی خط اصلی"
                    className={`w-full px-3 py-2 rounded-lg bg-white dark:bg-[#201729] border text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none ${
                      formErrors.title
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[#ecdcd8] dark:border-[#382645] focus:border-[#1f5163]'
                    }`}
                  />
                  {formErrors.title && (
                    <p
                      role="alert"
                      className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.title}</span>
                    </p>
                  )}
                </div>

                {/* Date (ISO input + Live Jalali Preview) + Category + Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="crud-report-date"
                      className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
                    >
                      تاریخ گزارش (<code className="font-mono">report_date</code>) *
                    </label>
                    <input
                      id="crud-report-date"
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs font-mono text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
                    />
                    <div
                      data-testid="jalali-date-preview"
                      className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#1f5163] dark:text-[#7ec6da] tabular-nums"
                    >
                      <span className="whitespace-nowrap">
                        شمسی: <strong>{formatIsoToJalaliDate(formDate)}</strong>
                      </span>
                      <span aria-hidden="true" className="opacity-40">|</span>
                      <span className="whitespace-nowrap">
                        ISO: <span dir="ltr" className="font-mono inline-block">{formDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="crud-category"
                      className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
                    >
                      دسته‌بندی (<code className="font-mono">category</code>)
                    </label>
                    <select
                      id="crud-category"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ReportCategory)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
                    >
                      {REPORT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label
                    htmlFor="crud-status"
                    className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
                  >
                    وضعیت (<code className="font-mono">status</code>)
                  </label>
                  <select
                    id="crud-status"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ReportStatus)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
                  >
                    {REPORT_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label
                    htmlFor="crud-description"
                    className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
                  >
                    شرح مشکل (<code className="font-mono">description</code>) *
                  </label>
                  <textarea
                    id="crud-description"
                    rows={3}
                    value={formDescription}
                    onChange={(e) => {
                      setFormDescription(e.target.value);
                      if (formErrors.description) {
                        setFormErrors((p) => ({ ...p, description: undefined }));
                      }
                    }}
                    placeholder="توضیح دقیق رخداد، محل و اقدام پیشنهادی..."
                    className={`w-full px-3 py-2 rounded-lg bg-white dark:bg-[#201729] border text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none ${
                      formErrors.description
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[#ecdcd8] dark:border-[#382645] focus:border-[#1f5163]'
                    }`}
                  />
                  {formErrors.description && (
                    <p
                      role="alert"
                      className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.description}</span>
                    </p>
                  )}
                </div>

                {/* Beginner-Friendly extra_metadata (Key-Value Pairs OR Free Note -> Auto JSON) */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#261a1d] dark:text-[#faedf3]">
                      اطلاعات تکمیلی انعطاف‌پذیر (<code className="font-mono">extra_metadata</code>)
                    </span>
                    <div className="inline-flex rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] p-0.5 border border-[#ecdcd8] dark:border-[#382645]">
                      <button
                        type="button"
                        onClick={() => setMetadataMode('pairs')}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                          metadataMode === 'pairs'
                            ? 'bg-[#1f5163] text-white'
                            : 'text-[#64748b] dark:text-[#ad99ab]'
                        }`}
                      >
                        کلید + مقدار
                      </button>
                      <button
                        type="button"
                        onClick={() => setMetadataMode('note')}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                          metadataMode === 'note'
                            ? 'bg-[#1f5163] text-white'
                            : 'text-[#64748b] dark:text-[#ad99ab]'
                        }`}
                      >
                        یادداشت آزاد
                      </button>
                    </div>
                  </div>

                  {metadataMode === 'pairs' ? (
                    <div className="space-y-2">
                      {metadataPairs.map((pair, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-1.5 items-center">
                          <input
                            type="text"
                            aria-label={`کلید ویژگی ${idx + 1}`}
                            value={pair.key}
                            onChange={(e) => handleUpdateMetadataPair(idx, 'key', e.target.value)}
                            placeholder="کلید (مثلاً tag_no)"
                            className="col-span-5 px-2.5 py-1.5 rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-[11px] font-mono text-[#261a1d] dark:text-[#faedf3]"
                          />
                          <input
                            type="text"
                            aria-label={`مقدار ویژگی ${idx + 1}`}
                            value={pair.value}
                            onChange={(e) => handleUpdateMetadataPair(idx, 'value', e.target.value)}
                            placeholder="مقدار (مثلاً P-204)"
                            className="col-span-6 px-2.5 py-1.5 rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-[11px] text-[#261a1d] dark:text-[#faedf3]"
                          />
                          <button
                            type="button"
                            aria-label={`حذف ردیف ویژگی ${idx + 1}`}
                            onClick={() => handleRemoveMetadataPair(idx)}
                            className="col-span-1 p-1.5 rounded-lg text-[#64748b] hover:text-rose-600 cursor-pointer flex justify-center"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddMetadataPair}
                        className="text-[11px] font-bold text-[#1f5163] dark:text-[#7ec6da] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>افزودن ویژگی دیگر</span>
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      aria-label="یادداشت آزاد برای extra_metadata"
                      value={metadataFreeNote}
                      onChange={(e) => setMetadataFreeNote(e.target.value)}
                      placeholder="هر یادداشت دلخواهی بنویسید تا خودکار به JSON معتبر تبدیل شود..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3]"
                    />
                  )}

                  <div className="text-[11px] text-[#64748b] dark:text-[#94a3b8] flex items-center justify-between gap-2 pt-1 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60">
                    <span>خروجی خودکار JSONB:</span>
                    <code dir="ltr" className="font-mono text-[#1f5163] dark:text-[#7ec6da] truncate max-w-[240px]">
                      {JSON.stringify(previewExtraMetadataObj)}
                    </code>
                  </div>
                </div>

                {formFeedbackFa && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{formFeedbackFa}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1f5163] hover:bg-[#173f4e] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت رکورد در جدول technical_reports</span>
                </button>
              </form>

              {/* READ / FILTER / UPDATE / SOFT DELETE TABLE (7 cols) */}
              <div className="xl:col-span-7 space-y-3.5">
                {/* Filter Bar */}
                <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="font-bold text-[#261a1d] dark:text-[#faedf3] flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#7ec6da]" />
                      <span>فیلتر و مشاهده جدول (Read)</span>
                    </div>
                    <div className="text-[11px] text-[#64748b] dark:text-[#ad99ab] tabular-nums">
                      فعال تمیز: {activeCleanCount} · حذف نرم: {excludedLiveCount} · نمایش فعلی: {visibleRecords.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      aria-label="جستجو در گزارش‌های فنی"
                      value={filterState.searchText}
                      onChange={(e) =>
                        setFilterState((p) => ({ ...p, searchText: e.target.value }))
                      }
                      placeholder="جستجو در عنوان یا شرح..."
                      className="sm:col-span-4 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3]"
                    />
                    <select
                      aria-label="فیلتر دسته‌بندی"
                      value={filterState.category}
                      onChange={(e) =>
                        setFilterState((p) => ({
                          ...p,
                          category: e.target.value as 'ALL' | ReportCategory
                        }))
                      }
                      className="sm:col-span-3 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3]"
                    >
                      <option value="ALL">همه دسته‌ها</option>
                      {REPORT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label="فیلتر وضعیت"
                      value={filterState.status}
                      onChange={(e) =>
                        setFilterState((p) => ({
                          ...p,
                          status: e.target.value as 'ALL' | ReportStatus
                        }))
                      }
                      className="sm:col-span-3 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3]"
                    >
                      <option value="ALL">همه وضعیت‌ها</option>
                      {REPORT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setFilterState((p) => ({ ...p, includeDeleted: !p.includeDeleted }));
                      }}
                      className={`sm:col-span-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                        filterState.includeDeleted
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                          : 'bg-white dark:bg-[#201729] text-[#475569] dark:text-[#cbd5e1] border-[#ecdcd8] dark:border-[#382645]'
                      }`}
                    >
                      {filterState.includeDeleted ? (
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>حذف‌شده‌ها</span>
                    </button>
                  </div>
                </div>

                {/* Records Table */}
                <div className="overflow-x-auto rounded-xl border border-[#ecdcd8] dark:border-[#382645]">
                  <table className="w-full text-xs text-right border-collapse">
                    <thead className="bg-[#fdf8f5] dark:bg-[#16101c] text-[#475569] dark:text-[#cbd5e1] border-b border-[#ecdcd8] dark:border-[#382645]">
                      <tr>
                        <th className="py-2.5 px-3 font-mono font-bold">id</th>
                        <th className="py-2.5 px-3 font-bold">عنوان و شرح گزارش</th>
                        <th className="py-2.5 px-3 font-bold">تاریخ شمسی</th>
                        <th className="py-2.5 px-3 font-bold">دسته / وضعیت</th>
                        <th className="py-2.5 px-3 font-bold">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ecdcd8]/70 dark:divide-[#382645]/70 bg-white dark:bg-[#201729]">
                      {visibleRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-xs text-[#64748b] dark:text-[#94a3b8]">
                            رکوردی مطابق فیلتر فعلی یافت نشد. فیلترها را تغییر دهید یا رکورد جدیدی ثبت کنید.
                          </td>
                        </tr>
                      ) : (
                        visibleRecords.map((rec) => {
                          const isEditing = editingId === rec.id;
                          return (
                            <tr
                              key={rec.id}
                              data-testid={`crud-row-${rec.id}`}
                              className={
                                rec.is_deleted
                                  ? 'bg-amber-50/45 dark:bg-amber-950/20'
                                  : 'hover:bg-[#fdf8f5]/60 dark:hover:bg-[#1a1322]'
                              }
                            >
                              <td className="py-2.5 px-3 font-mono font-black tabular-nums text-[#1f5163] dark:text-[#7ec6da] align-top">
                                #{rec.id}
                              </td>
                              <td className="py-2.5 px-3 align-top space-y-1 min-w-[210px]">
                                {isEditing ? (
                                  <div className="space-y-1.5">
                                    <input
                                      type="text"
                                      aria-label={`ویرایش عنوان رکورد ${rec.id}`}
                                      value={editTitle}
                                      onChange={(e) => setEditTitle(e.target.value)}
                                      className="w-full px-2 py-1 rounded border border-[#1f5163] bg-white dark:bg-[#16101c] text-xs"
                                    />
                                    <textarea
                                      rows={2}
                                      aria-label={`ویرایش شرح رکورد ${rec.id}`}
                                      value={editDescription}
                                      onChange={(e) => setEditDescription(e.target.value)}
                                      className="w-full px-2 py-1 rounded border border-[#1f5163] bg-white dark:bg-[#16101c] text-xs"
                                    />
                                    {editError && (
                                      <p className="text-[11px] text-rose-600 dark:text-rose-400">
                                        {editError}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    <div className="font-bold text-[#261a1d] dark:text-[#faedf3]">
                                      {rec.title}
                                    </div>
                                    <p className="text-[11px] text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                                      {rec.description}
                                    </p>
                                    {Object.keys(rec.extra_metadata || {}).length > 0 && (
                                      <div
                                        dir="ltr"
                                        className="font-mono text-[10px] text-[#64748b] dark:text-[#94a3b8] text-right"
                                      >
                                        JSON: {JSON.stringify(rec.extra_metadata)}
                                      </div>
                                    )}
                                    {rec.is_deleted && (
                                      <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 pt-0.5">
                                        حذف نرم‌شده · دلیل: {rec.exclusion_reason}
                                      </div>
                                    )}
                                  </>
                                )}
                              </td>
                              <td className="py-2.5 px-3 align-top whitespace-nowrap">
                                <div
                                  title={`ISO: ${rec.report_date}`}
                                  className="font-semibold tabular-nums text-[#261a1d] dark:text-[#faedf3]"
                                >
                                  {formatIsoToJalaliDate(rec.report_date)}
                                </div>
                                <div
                                  title={`updated_at ISO: ${rec.updated_at}`}
                                  className="text-[10px] text-[#64748b] dark:text-[#94a3b8] tabular-nums mt-0.5"
                                >
                                  بروزرسانی: {formatIsoToJalaliDateTime(rec.updated_at)}
                                </div>
                              </td>
                              <td className="py-2.5 px-3 align-top whitespace-nowrap">
                                {isEditing ? (
                                  <select
                                    aria-label={`ویرایش وضعیت رکورد ${rec.id}`}
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as ReportStatus)}
                                    className="px-2 py-1 rounded border border-[#1f5163] bg-white dark:bg-[#16101c] text-xs"
                                  >
                                    {REPORT_STATUSES.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <div className="space-y-0.5">
                                    <div className="text-[#475569] dark:text-[#cbd5e1]">{rec.category}</div>
                                    <div
                                      className={`font-bold ${
                                        rec.status === 'بسته‌شده'
                                          ? 'text-emerald-700 dark:text-emerald-400'
                                          : rec.status === 'در حال پیگیری'
                                          ? 'text-[#1f5163] dark:text-[#7ec6da]'
                                          : 'text-[#c2410c] dark:text-[#fda4af]'
                                      }`}
                                    >
                                      {rec.status}
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="py-2.5 px-3 align-top whitespace-nowrap">
                                {isEditing ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleSaveEdit(rec.id)}
                                      className="px-2.5 py-1 rounded-lg bg-[#1f5163] text-white text-[11px] font-bold cursor-pointer"
                                    >
                                      ذخیره
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingId(null);
                                        setEditError(null);
                                      }}
                                      className="px-2 py-1 rounded-lg border border-[#ecdcd8] dark:border-[#382645] text-[11px] cursor-pointer"
                                    >
                                      انصراف
                                    </button>
                                  </div>
                                ) : rec.is_deleted ? (
                                  <button
                                    type="button"
                                    aria-label={`بازگردانی رکورد ${rec.id}`}
                                    onClick={() => handleRestoreRecord(rec.id)}
                                    className="px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                  >
                                    <Undo2 className="w-3.5 h-3.5" />
                                    <span>بازگردانی</span>
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      aria-label={`ویرایش رکورد ${rec.id}`}
                                      onClick={() => handleStartEdit(rec)}
                                      className="px-2 py-1 rounded-lg border border-[#ecdcd8] dark:border-[#382645] hover:border-[#1f5163] text-[#334155] dark:text-[#cbd5e1] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>ویرایش</span>
                                    </button>
                                    <button
                                      type="button"
                                      aria-label={`حذف نرم رکورد ${rec.id}`}
                                      onClick={() => {
                                        playTactileSound('switch');
                                        setSoftDeleteTarget(rec);
                                        setSoftDeleteReason('');
                                        setSoftDeleteError(null);
                                      }}
                                      className="px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>حذف نرم</span>
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* DUAL-PANE TRANSPARENCY BOX: Live Escaped SQL + Live Clean JSON Preview */}
            <div
              data-testid="transparency-dual-box"
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2"
            >
              {/* Live SQL Pane */}
              <div className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-black text-[#261a1d] dark:text-[#faedf3] flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-[#1f5163] dark:text-[#7ec6da]" />
                      <span>جعبه شفافیت ۱: کوئری زنده SQL (همگام با فیلترهای بالا)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveSqlQuery, 's5_live_sql')}
                      className="px-2.5 py-1 rounded-lg border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 's5_live_sql' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === 's5_live_sql' ? 'کپی شد' : 'کپی SQL'}</span>
                    </button>
                  </div>
                  <pre
                    dir="ltr"
                    data-testid="live-sql-preview"
                    className="p-3 rounded-lg bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] leading-relaxed overflow-x-auto text-left max-h-56"
                  >
                    {liveSqlQuery}
                  </pre>
                </div>
                <p className="text-[11px] text-[#64748b] dark:text-[#ad99ab]">
                  تمام فیلترهای متنی با امن‌سازی تک‌کوتیشن (<code className="font-mono">&apos; → &apos;&apos;</code>) تولید می‌شوند تا کوئری نمایش‌داده‌شده همیشه معتبر بماند.
                </p>
              </div>

              {/* Live Clean JSON Preview Pane */}
              <div className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-black text-[#261a1d] dark:text-[#faedf3] flex items-center gap-1.5">
                      <FileCode2 className="w-4 h-4 text-[#1f5163] dark:text-[#7ec6da]" />
                      <span>
                        جعبه شفافیت ۲: پیش‌نمایش زنده JSON تمیز ({cleanExportRecords.length} رکورد فعال)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          copyToClipboard(liveCleanJsonString, 's5_live_json');
                          if (hasSoftDeletedAny || excludedLiveCount > 0) {
                            setChecklist((prev) => ({
                              ...prev,
                              softDeletedAndVerifiedJson: true
                            }));
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 's5_live_json' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === 's5_live_json' ? 'کپی شد' : 'کپی JSON'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadCleanJson}
                        className="px-2.5 py-1 rounded-lg bg-[#1f5163] hover:bg-[#173f4e] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود JSON تمیز</span>
                      </button>
                    </div>
                  </div>
                  <pre
                    dir="ltr"
                    data-testid="live-clean-json-preview"
                    className="p-3 rounded-lg bg-[#0f172a] text-[#a7f3d0] font-mono text-[11px] leading-relaxed overflow-auto text-left max-h-56"
                  >
                    {liveCleanJsonString}
                  </pre>
                </div>
                <p className="text-[11px] text-[#64748b] dark:text-[#ad99ab]">
                  به‌محض انجام حذف نرم روی هر سطر، آن رکورد بی‌درنگ از این خروجی JSON تمیز کنار گذاشته می‌شود (همیشه <code className="font-mono">is_deleted = FALSE</code>).
                </p>
              </div>
            </div>
          </div>

          {/* Ready Prompts 1 & 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                پرامپت‌های مهندسی‌شده کارگاه · همگام ۱۰۰٪ با جدول {CANONICAL_TABLE_NAME}
              </p>
              <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                دو پرامپت آماده برای تولید کد دیتابیس و مینی‌اپ CRUD با کمک هوش مصنوعی
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[READY_PROMPTS_SESSION_5.prompt1Schema, READY_PROMPTS_SESSION_5.prompt2CrudApp].map(
                (promptItem) => (
                  <div
                    key={promptItem.id}
                    className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                          {promptItem.titleFa}
                        </h4>
                        <p className="text-[11px] text-[#64748b] dark:text-[#ad99ab]">
                          {promptItem.subtitleFa}
                        </p>
                      </div>
                      <pre
                        dir="rtl"
                        className="p-3 rounded-lg bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-right max-h-60 overflow-y-auto"
                      >
                        {promptItem.text}
                      </pre>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onLoadToSandbox(promptItem.text)}
                        className="px-3 py-1.5 rounded-lg border border-[#1f5163]/40 bg-white dark:bg-[#201729] text-xs font-bold text-[#1f5163] dark:text-[#7ec6da] hover:bg-[#f4f9fb] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>ارسال به سندباکس</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(promptItem.text, promptItem.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#173f4e] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === promptItem.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === promptItem.id ? 'کپی شد!' : 'کپی پرامپت'}</span>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Section 6: 4 Common Beginner Mistakes */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">بخش ۶ · خطاهای پرتکرار</p>
              <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                چهار اشتباه رایج مبتدی‌ها در طراحی پایگاه داده (و راهکار مهندسی آن)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {BEGINNER_MISTAKES.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-2 text-xs"
                >
                  <div className="font-black text-[#261a1d] dark:text-[#faedf3]">
                    {item.order}. {item.titleFa}
                  </div>
                  <p className="text-rose-800 dark:text-rose-300 leading-relaxed">
                    <strong>اشتباه: </strong>
                    {item.mistakeFa}
                  </p>
                  <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    <strong>راهکار استاندارد: </strong>
                    {item.solutionFa}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Dynamic GitHub Homework Deliverables (SQLite / PostgreSQL Switch + Dynamic MD) */}
          <div
            data-testid="github-deliverables-box"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  بخش ۷ · تکلیف جلسه ۵ (Commit در ریپازیتوری ورک‌بوک پروژه در گیت‌هاب)
                </p>
                <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                  تولید پویا و دانلود مستقیم فایل‌های <code className="font-mono">schema.sql</code> و{' '}
                  <code className="font-mono">05_data_selection_and_schema.md</code>
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#cbd5e1]">
                  این دو فایل به‌صورت زنده از تصمیم‌های پاک‌سازی تب ۲، مسیر صنعتی «{trackAdaptation.trackLabelFa}» و کوئری فعال مینی‌اپ شما ساخته شده‌اند.
                </p>
              </div>

              {/* Dual SQL Dialect Switch (SQLite / PostgreSQL) */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  role="group"
                  aria-label="انتخاب موتور پایگاه داده برای خروجی SQL"
                  className="inline-flex rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] p-1 border border-[#ecdcd8] dark:border-[#382645]"
                >
                  <button
                    type="button"
                    data-testid="dialect-btn-postgresql"
                    onClick={() => {
                      playTactileSound('switch');
                      setSqlDialect('postgresql');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      sqlDialect === 'postgresql'
                        ? 'bg-[#1f5163] text-white'
                        : 'text-[#475569] dark:text-[#cbd5e1]'
                    }`}
                  >
                    PostgreSQL / Supabase
                  </button>
                  <button
                    type="button"
                    data-testid="dialect-btn-sqlite"
                    onClick={() => {
                      playTactileSound('switch');
                      setSqlDialect('sqlite');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      sqlDialect === 'sqlite'
                        ? 'bg-[#1f5163] text-white'
                        : 'text-[#475569] dark:text-[#cbd5e1]'
                    }`}
                  >
                    SQLite (آفلاین)
                  </button>
                </div>
              </div>
            </div>

            {/* File Preview Switch + Copy/Download Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] p-1 border border-[#ecdcd8] dark:border-[#382645]">
                <button
                  type="button"
                  onClick={() => setActiveDeliverableTab('schema')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    activeDeliverableTab === 'schema'
                      ? 'bg-[#1f5163] text-white'
                      : 'text-[#475569] dark:text-[#cbd5e1]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span className="font-mono">schema.sql</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeliverableTab('markdown')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    activeDeliverableTab === 'markdown'
                      ? 'bg-[#1f5163] text-white'
                      : 'text-[#475569] dark:text-[#cbd5e1]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-mono">05_data_selection_and_schema.md</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      activeDeliverableTab === 'schema'
                        ? dynamicSchemaSql
                        : dynamicHomeworkMarkdown,
                      `s5_copy_${activeDeliverableTab}`
                    )
                  }
                  className="px-3 py-1.5 rounded-lg border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === `s5_copy_${activeDeliverableTab}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedId === `s5_copy_${activeDeliverableTab}` ? 'کپی شد!' : 'کپی محتوای فایل'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('thock');
                    triggerTextDownload('schema.sql', dynamicSchemaSql, 'text/sql;charset=utf-8');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#173f4e] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود schema.sql ({sqlDialect === 'postgresql' ? 'PG' : 'SQLite'})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('thock');
                    triggerTextDownload(
                      '05_data_selection_and_schema.md',
                      dynamicHomeworkMarkdown,
                      'text/markdown;charset=utf-8'
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#e0533c] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود 05_data_selection_and_schema.md</span>
                </button>
              </div>
            </div>

            <pre
              dir={activeDeliverableTab === 'schema' ? 'ltr' : 'rtl'}
              data-testid="deliverable-preview"
              className={`p-4 rounded-xl bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] leading-relaxed overflow-auto max-h-80 whitespace-pre-wrap ${
                activeDeliverableTab === 'schema' ? 'text-left' : 'text-right'
              }`}
            >
              {activeDeliverableTab === 'schema' ? dynamicSchemaSql : dynamicHomeworkMarkdown}
            </pre>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 4: 25-TERM SPECIALIZED GLOSSARY WITH EVERYDAY ANALOGIES       */}
      {/* ================================================================= */}
      {activeStage === 'glossary' && (
        <div
          data-testid="stage-glossary"
          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-4 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
            <div className="space-y-1">
              <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                پیوست کامل جلسه ۵ · ۱۲ مفهوم پایه + ۷ مفهوم معماری + ۶ مفهوم حاکمیت CPMAI
              </p>
              <h3 className="text-base sm:text-lg font-black text-[#261a1d] dark:text-[#faedf3]">
                راهنمای واژگان تخصصی جلسه ۵ (۲۵ واژه با معادل‌سازی قابل لمس و روزمره)
              </h3>
            </div>
            <div className="text-xs font-bold text-[#1f5163] dark:text-[#7ec6da] tabular-nums">
              نمایش {filteredGlossary.length} از {GLOSSARY_TERMS.length} واژه
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#94a3b8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="جستجو در ۲۵ واژه تخصصی"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="جستجوی فارسی یا انگلیسی (مثلاً Soft Delete، JSONB، PII، ACID)..."
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {GLOSSARY_CATEGORIES.map((cat) => {
                const isActive = glossaryCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setGlossaryCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                      isActive
                        ? 'bg-[#1f5163] text-white border-[#1f5163]'
                        : 'bg-[#fdf8f5] dark:bg-[#16101c] text-[#475569] dark:text-[#cbd5e1] border-[#ecdcd8] dark:border-[#382645] hover:border-[#1f5163]'
                    }`}
                  >
                    {cat.labelFa} ({cat.expectedCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glossary Grid or Empty State */}
          {filteredGlossary.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-center space-y-3">
              <p className="text-sm font-bold text-[#261a1d] dark:text-[#faedf3]">
                هیچ واژه‌ای مطابق جستجوی «{glossarySearch}» پیدا نشد.
              </p>
              <button
                type="button"
                onClick={() => {
                  setGlossarySearch('');
                  setGlossaryCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-[#1f5163] text-white text-xs font-bold cursor-pointer"
              >
                پاک کردن جستجو و نمایش هر ۲۵ واژه
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredGlossary.map((item) => (
                <article
                  key={item.id}
                  className="p-4 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#ecdcd8]/70 dark:border-[#382645]/70">
                    <div>
                      <div className="text-[11px] text-[#64748b] dark:text-[#ad99ab] tabular-nums">
                        واژه {item.order} از ۲۵ ·{' '}
                        {item.category === 'core_db'
                          ? 'مفاهیم پایه دیتابیس'
                          : item.category === 'architecture'
                          ? 'معماری و انواع دیتابیس'
                          : 'حاکمیت CPMAI و امنیت'}
                      </div>
                      <h4 className="text-sm font-black text-[#261a1d] dark:text-[#faedf3]">
                        {item.termFa}
                      </h4>
                    </div>
                    <span
                      dir="ltr"
                      className="font-mono text-xs font-bold text-[#1f5163] dark:text-[#7ec6da] shrink-0"
                    >
                      {item.termEn}
                    </span>
                  </div>

                  <p className="text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                    <strong className="text-[#261a1d] dark:text-[#faedf3]">تعریف ساده: </strong>
                    {item.simpleDefinitionFa}
                  </p>

                  <p className="text-xs text-[#1f5163] dark:text-[#9bd3e3] leading-relaxed">
                    <strong>معادل روزمره ملموس: </strong>
                    {item.everydayAnalogyFa}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

          <FocusedLessonFooter
            lang="fa"
            boundary={boundary}
            onPrev={() => handleSelectStageByIndex(boundary.currentIndex - 1)}
            onNext={() => handleSelectStageByIndex(boundary.currentIndex + 1)}
            prevLabelFa="مرحله قبلی"
            nextLabelFa="مرحله بعدی"
            stepUnitFa="مرحله"
          />
        </div>
      </FocusedLessonLayout>

      {/* ================================================================= */}
      {/* SOFT DELETE MANDATORY REASON MODAL                                */}
      {/* ================================================================= */}
      {softDeleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="soft-delete-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <form
            onSubmit={handleConfirmSoftDelete}
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h4
                  id="soft-delete-modal-title"
                  className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]"
                >
                  حذف نرم رکورد #{softDeleteTarget.id} (Soft Delete)
                </h4>
                <p className="text-xs text-[#64748b] dark:text-[#ad99ab]">
                  رکورد «{softDeleteTarget.title}» از دیتابیس پاک نمی‌شود؛ فقط با مقدار{' '}
                  <code className="font-mono">is_deleted = TRUE</code> از خروجی تحلیلی AI کنار گذاشته می‌شود.
                </p>
              </div>
              <button
                type="button"
                aria-label="بستن پنجره حذف نرم"
                onClick={() => {
                  setSoftDeleteTarget(null);
                  setSoftDeleteError(null);
                }}
                className="p-1.5 rounded-lg text-[#64748b] hover:bg-[#fdf8f5] dark:hover:bg-[#16101c] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="soft-delete-reason-input"
                className="block text-xs font-bold text-[#261a1d] dark:text-[#faedf3]"
              >
                دلیل کنارگذاری (<code className="font-mono">exclusion_reason</code>) — اجباری *
              </label>
              <textarea
                id="soft-delete-reason-input"
                rows={3}
                value={softDeleteReason}
                onChange={(e) => {
                  setSoftDeleteReason(e.target.value);
                  if (softDeleteError) setSoftDeleteError(null);
                }}
                placeholder="مثلاً: رکورد آزمایشی، ثبت تکراری یا خطای ورود داده..."
                className="w-full px-3 py-2 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] text-xs text-[#261a1d] dark:text-[#faedf3] focus:outline-none focus:border-[#1f5163]"
              />
              {softDeleteError && (
                <p
                  role="alert"
                  className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{softDeleteError}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSoftDeleteTarget(null);
                  setSoftDeleteError(null);
                }}
                className="px-3.5 py-2 rounded-xl border border-[#ecdcd8] dark:border-[#382645] text-xs font-semibold text-[#475569] dark:text-[#cbd5e1] cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#e0533c] hover:bg-[#c2410c] text-white text-xs font-bold cursor-pointer"
              >
                تأیید حذف نرم و ثبت دلیل
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
