import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types/cpmai';
import { IndustryTrackId } from '../types/industryTrack';
import { playTactileSound } from '../utils/uiSoundEffects';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Play,
  Building2,
  Scale,
  FileSpreadsheet,
  Shield,
  CheckCircle2,
  Layers,
  Headphones,
  FileText,
  Lightbulb,
  BookmarkCheck,
  FileBarChart,
  Sliders,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Users,
  Zap,
  Home,
  BookOpen,
  Briefcase,
  FlaskConical
} from 'lucide-react';
import { splitPointTitleAndBody } from '../utils/lessonText';
import {
  getNotebookLmGuideForTrack,
  DepartmentUseCase,
  PresentationInfographicBlueprint,
  NotebookLmExercise
} from '../data/notebooklm_engineering_guide';
import {
  getNotebookLmSampleDocsForTrack,
  SampleDepartmentDocument,
  SampleSubDocument
} from '../data/notebooklm_sample_documents';
import {
  NOTEBOOKLM_MASTERY_MODULES,
  NOTEBOOKLM_STUDIO_TOOLS
} from '../data/notebooklm_mastery_curriculum';
import { SpecimenDocumentCard } from './notebooklm/SpecimenDocumentCard';

type NotebookLmStage = 'basics' | 'studio' | 'usecases' | 'labs';

interface NotebookLmWorkshopProps {
  lang: Language;
  industryTrack?: IndustryTrackId;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onOpenHrToolsWorkshop?: () => void;
  isPresentationMode?: boolean;
  isSplitCockpit?: boolean;
}

export const NotebookLmWorkshop: React.FC<NotebookLmWorkshopProps> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  onLoadToSandbox,
  copyToClipboard,
  copiedId,
  onOpenHrToolsWorkshop,
  isPresentationMode = false,
  isSplitCockpit = false
}) => {
  const isFa = lang === 'fa';
  const {
    overview: NOTEBOOKLM_OVERVIEW,
    departments: UNIT_MANAGERS_MATRIX,
    blueprints: PRESENTATION_INFOGRAPHIC_GUIDES,
    exercises: NOTEBOOKLM_EXERCISES
  } = getNotebookLmGuideForTrack(industryTrack);
  const {
    departmentDocs: SAMPLE_DEPARTMENT_DOCS,
    blueprintDocs: SAMPLE_BLUEPRINT_DOCS,
    exerciseDocs: SAMPLE_EXERCISE_DOCS
  } = getNotebookLmSampleDocsForTrack(industryTrack);

  // Clean 4-stage sequential flow: 1. Basics (7 lessons) -> 2. Studio (6 tools) -> 3. Org Use Cases (Depts & Decks) -> 4. Real-Doc Labs
  const [activeStage, setActiveStage] = useState<NotebookLmStage>('basics');
  const [useCaseMode, setUseCaseMode] = useState<'departments' | 'blueprints'>('departments');
  const [activeMasteryIdx, setActiveMasteryIdx] = useState<number>(0);
  const [activeStudioToolId, setActiveStudioToolId] = useState<string>(NOTEBOOKLM_STUDIO_TOOLS[0].id);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(UNIT_MANAGERS_MATRIX[0].id);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(PRESENTATION_INFOGRAPHIC_GUIDES[0].id);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(NOTEBOOKLM_EXERCISES[0].id);
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [docCopiedId, setDocCopiedId] = useState<string | null>(null);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  // Start collapsed so learners reach the actual syllabus and lessons immediately above the fold
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(false);
  const stageTopRef = useRef<HTMLDivElement>(null);
  const basicsPanelRef = useRef<HTMLDivElement>(null);

  const selectMasteryLesson = (nextIdx: number) => {
    playTactileSound('switch');
    setActiveMasteryIdx(nextIdx);
    requestAnimationFrame(() => {
      const panel = basicsPanelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      if (rect.top < 80) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  useEffect(() => {
    if (isPresentationMode) {
      setIsOverviewExpanded(false);
    }
  }, [isPresentationMode]);

  useEffect(() => {
    setSelectedDeptId(UNIT_MANAGERS_MATRIX[0]?.id || 'tech_office');
    setSelectedBlueprintId(PRESENTATION_INFOGRAPHIC_GUIDES[0]?.id || 'presentation_deck_workflow');
    setSelectedExerciseId(NOTEBOOKLM_EXERCISES[0]?.id || 'ex1_contract_claim_extraction');
    setPreviewDocId(null);
    setActiveScenarioIdx(0);
  }, [industryTrack]);

  const STAGES: Array<{
    id: NotebookLmStage;
    numFa: string;
    numEn: string;
    labelFa: string;
    labelEn: string;
    metaFa: string;
    metaEn: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'basics',
      numFa: '۱',
      numEn: '1',
      labelFa: 'مبانی و تسلط',
      labelEn: 'Core Mastery',
      metaFa: '۷ درس گام‌به‌گام',
      metaEn: '7 Lessons',
      icon: <BookOpen className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'studio',
      numFa: '۲',
      numEn: '2',
      labelFa: 'ابزارهای Studio',
      labelEn: 'Studio Tools',
      metaFa: '۶ خروجی هوشمند',
      metaEn: '6 Outputs',
      icon: <Sliders className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'usecases',
      numFa: '۳',
      numEn: '3',
      labelFa: 'کاربردهای سازمانی',
      labelEn: 'Org Playbooks',
      metaFa: 'دپارتمان‌ها و اسلاید',
      metaEn: 'Depts & Decks',
      icon: <Briefcase className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'labs',
      numFa: '۴',
      numEn: '4',
      labelFa: 'کارگاه اسناد واقعی',
      labelEn: 'Real-Doc Labs',
      metaFa: `${NOTEBOOKLM_EXERCISES.length.toLocaleString('fa-IR')} سناریو با فایل`,
      metaEn: `${NOTEBOOKLM_EXERCISES.length} Labs`,
      icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" />
    }
  ];

  const switchStage = (next: NotebookLmStage, scrollUp = false) => {
    playTactileSound('thock');
    setActiveStage(next);
    setPreviewDocId(null);
    if (scrollUp) {
      setTimeout(() => {
        stageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  const selectedDepartment: DepartmentUseCase =
    UNIT_MANAGERS_MATRIX.find((d) => d.id === selectedDeptId) || UNIT_MANAGERS_MATRIX[0];

  const selectedBlueprint: PresentationInfographicBlueprint =
    PRESENTATION_INFOGRAPHIC_GUIDES.find((b) => b.id === selectedBlueprintId) || PRESENTATION_INFOGRAPHIC_GUIDES[0];

  const selectedExercise: NotebookLmExercise =
    NOTEBOOKLM_EXERCISES.find((e) => e.id === selectedExerciseId) || NOTEBOOKLM_EXERCISES[0];

  const currentSampleDoc: SampleDepartmentDocument | undefined =
    SAMPLE_DEPARTMENT_DOCS[selectedDepartment.id];

  const currentBlueprintSampleDoc: SampleDepartmentDocument | undefined =
    SAMPLE_BLUEPRINT_DOCS[selectedBlueprint.id];

  const currentExerciseSampleDoc: SampleDepartmentDocument | undefined =
    SAMPLE_EXERCISE_DOCS[selectedExercise.id];

  const handleDownloadSpecimen = (doc: SampleDepartmentDocument | SampleSubDocument) => {
    const blob = new Blob([doc.markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', doc.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySpecimen = (doc: SampleDepartmentDocument | SampleSubDocument) => {
    copyToClipboard(doc.markdownContent, `specimen_doc_${doc.id}`);
    setDocCopiedId(doc.id);
    setTimeout(() => setDocCopiedId(null), 2500);
  };

  const handleTogglePreview = (docId: string) => {
    setPreviewDocId((prev) => (prev === docId ? null : docId));
  };

  const renderDeptIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Home':
        return <Home className={className} />;
      case 'Layers':
      default:
        return <Layers className={className} />;
    }
  };

  const currentStageIdx = STAGES.findIndex((s) => s.id === activeStage);
  const nextStageObj = currentStageIdx >= 0 && currentStageIdx < STAGES.length - 1 ? STAGES[currentStageIdx + 1] : null;
  const prevStageObj = currentStageIdx > 0 ? STAGES[currentStageIdx - 1] : null;

  const activeMasteryMod = NOTEBOOKLM_MASTERY_MODULES[activeMasteryIdx] || NOTEBOOKLM_MASTERY_MODULES[0];
  const activeStudioTool =
    NOTEBOOKLM_STUDIO_TOOLS.find((t) => t.id === activeStudioToolId) || NOTEBOOKLM_STUDIO_TOOLS[0];

  return (
    <section className="space-y-4">
      {/* 1. COMPACT TOP HEADER BAR (Collapsed by Default; Overview Opens On-Demand) */}
      <div
        ref={stageTopRef}
        data-testid={isOverviewExpanded ? 'notebooklm-overview-expanded' : 'notebooklm-overview-collapsed'}
        className="rounded-2xl bg-white dark:bg-[#151e26] border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden scroll-mt-4"
      >
        <div className="px-4 py-2.5 sm:px-5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
              <span>{isFa ? 'Google NotebookLM' : 'Google NotebookLM'}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600 hidden sm:inline">·</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 hidden sm:inline">
              {isFa
                ? 'هوش مستند بدون توهم · ۵۰ سند هم‌زمان · ۵۰۰ هزار واژه · پادکست و نقشه ذهنی'
                : 'Zero-Hallucination Document Lab · 50 Sources · 500k Words'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={NOTEBOOKLM_OVERVIEW.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <span>{isFa ? 'ورود به NotebookLM' : 'Open NotebookLM'}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <button
              type="button"
              onClick={() => {
                playTactileSound('switch');
                setIsOverviewExpanded((prev) => !prev);
              }}
              data-testid="notebooklm-overview-toggle"
              aria-expanded={isOverviewExpanded}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1c2630] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#1f5163]/50 cursor-pointer transition-colors whitespace-nowrap"
            >
              {isOverviewExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{isFa ? (isOverviewExpanded ? 'بستن معرفی' : 'معرفی کوتاه') : isOverviewExpanded ? 'Hide Overview' : 'Overview'}</span>
            </button>
          </div>
        </div>

        {/* Optional Expandable Overview (Single-Elevation, Clean Divider) */}
        {isOverviewExpanded && (
          <div className="px-4 pb-4 pt-3 sm:px-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#11181f] space-y-3.5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white text-balance">
                {isFa ? NOTEBOOKLM_OVERVIEW.titleFa : NOTEBOOKLM_OVERVIEW.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa ? NOTEBOOKLM_OVERVIEW.taglineFa : NOTEBOOKLM_OVERVIEW.taglineEn}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {NOTEBOOKLM_OVERVIEW.keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#18212b] border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isFa ? stat.labelFa : stat.labelEn}
                  </div>
                  <div className="text-sm font-black text-[#1f5163] dark:text-[#6fb3c6] mt-0.5 tabular-nums">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
              {(isFa ? NOTEBOOKLM_OVERVIEW.whyEngineersLoveItFa : NOTEBOOKLM_OVERVIEW.whyEngineersLoveItEn).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 2. CLEAN 4-STAGE LINEAR STEPPER BAR (Replaces Chaotic 3D Keycaps) */}
      <nav
        aria-label={isFa ? 'مراحل آموزش Google NotebookLM' : 'NotebookLM Learning Stages'}
        data-testid="nlm-stage-nav"
        className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-[#11181f] border border-slate-200/90 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-1.5"
      >
        {STAGES.map((stage) => {
          const isSelected = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              data-testid={`nlm-stage-${stage.id}`}
              aria-current={isSelected ? 'step' : undefined}
              onClick={() => switchStage(stage.id)}
              className={`px-3 py-2 rounded-xl text-right transition-all cursor-pointer flex items-center gap-2.5 min-w-0 ${
                isSelected
                  ? 'bg-white dark:bg-[#1c2732] text-slate-900 dark:text-white shadow-xs ring-1 ring-[#1f5163]/30 dark:ring-[#6fb3c6]/40'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-[#17212b]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg font-mono text-xs font-black flex items-center justify-center shrink-0 tabular-nums ${
                  isSelected
                    ? 'bg-[#1f5163] text-white'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isFa ? stage.numFa : stage.numEn}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-extrabold leading-tight truncate">
                  {isFa ? stage.labelFa : stage.labelEn}
                </div>
                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {isFa ? stage.metaFa : stage.metaEn}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* ===================================================================== */}
      {/* STAGE 1: CORE MASTERY — CLEAN TWO-ZONE MASTER-DETAIL (7 LESSONS)      */}
      {/* ===================================================================== */}
      {activeStage === 'basics' && (
        <div
          ref={basicsPanelRef}
          data-testid="nlm-panel-basics"
          className="rounded-2xl bg-white dark:bg-[#151e26] border border-slate-200 dark:border-slate-800 overflow-x-clip scroll-mt-3 animate-fadeIn"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sticky Syllabus Rail (Right in RTL) — stays pinned while lesson content scrolls */}
            <aside className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#11181f] rounded-t-2xl lg:rounded-tr-2xl lg:rounded-tl-none lg:rounded-br-2xl">
              <div
                data-testid="nlm-syllabus-sticky"
                className={`p-3 space-y-1.5 lg:sticky lg:overflow-y-auto ${
                  isSplitCockpit
                    ? 'lg:top-20 xl:top-0 lg:max-h-[calc(100vh-6rem)] xl:max-h-[calc(100dvh-15rem)]'
                    : isPresentationMode
                      ? 'lg:top-3 lg:max-h-[calc(100vh-2rem)]'
                      : 'lg:top-20 lg:max-h-[calc(100vh-6rem)]'
                }`}
              >
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>{isFa ? 'فهرست ۷ درس پایه تا تسلط' : '7-Lesson Syllabus'}</span>
                  <span className="font-mono tabular-nums text-[#1f5163] dark:text-[#6fb3c6]">
                    {(activeMasteryIdx + 1).toLocaleString('fa-IR')}/{NOTEBOOKLM_MASTERY_MODULES.length.toLocaleString('fa-IR')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
                  {NOTEBOOKLM_MASTERY_MODULES.map((item, idx) => {
                    const isSelected = idx === activeMasteryIdx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`nlm-lesson-item-${idx + 1}`}
                        onClick={() => selectMasteryLesson(idx)}
                        className={`w-full px-2.5 py-2 rounded-xl text-right transition-colors cursor-pointer flex items-start gap-2 ${
                          isSelected
                            ? 'bg-[#1f5163] text-white shadow-2xs'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-[#19232d]'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isFa ? (idx + 1).toLocaleString('fa-IR') : idx + 1}
                        </span>
                        <span className="text-xs font-bold leading-snug line-clamp-2">
                          {item.titleFa}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Focused Active Lesson Stage (Left in RTL) */}
            <div className="lg:col-span-8 xl:col-span-9 p-5 sm:p-6 flex flex-col justify-between gap-5">
              <div className="space-y-5">
                {/* Lesson Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                        {activeMasteryMod.stepBadge}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{activeMasteryMod.categoryFa}</span>
                      <span aria-hidden="true" className="hidden sm:inline">·</span>
                      <span dir="ltr" className="font-mono text-[11px] hidden sm:inline">
                        {activeMasteryMod.titleEn}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug text-balance">
                      {activeMasteryMod.titleFa}
                    </h3>
                  </div>
                </div>

                {/* Clean Numbered Steps */}
                <div className="space-y-3">
                  {activeMasteryMod.detailedStepsFa.map((st, idx) => {
                    const { heading, body } = splitPointTitleAndBody(st);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50/90 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-lg bg-[#1f5163]/12 dark:bg-[#6fb3c6]/20 text-[#1f5163] dark:text-[#6fb3c6] font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {isFa ? (idx + 1).toLocaleString('fa-IR') : idx + 1}
                        </span>
                        <div className="space-y-1 min-w-0">
                          {heading && (
                            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                              {heading}
                            </div>
                          )}
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Calm Pro Tip Callout */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    <strong className="font-extrabold text-emerald-800 dark:text-emerald-300">
                      {isFa ? 'نکته کلیدی: ' : 'Pro Tip: '}
                    </strong>
                    {activeMasteryMod.proTipFa}
                  </p>
                </div>

                {/* Copyable Prompt (if lesson has one) */}
                {activeMasteryMod.copyablePromptFa && (
                  <div className="rounded-xl bg-slate-900 dark:bg-[#0c1218] border border-slate-700/80 text-slate-100 overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-800/80 dark:bg-[#131b24] border-b border-slate-700/70 flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-200">
                        {activeMasteryMod.copyablePromptTitleFa || (isFa ? 'پرامپت آماده اجرا:' : 'Ready Prompt:')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onLoadToSandbox(activeMasteryMod.copyablePromptFa!)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(activeMasteryMod.copyablePromptFa!, `mastery_prompt_${activeMasteryMod.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#2a6a80] text-white text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          {copiedId === `mastery_prompt_${activeMasteryMod.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-300" />
                              <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <pre
                      dir="rtl"
                      className="p-3.5 text-xs leading-relaxed whitespace-pre-wrap font-sans text-slate-100 text-right select-text"
                    >
                      {activeMasteryMod.copyablePromptFa}
                    </pre>
                  </div>
                )}
              </div>

              {/* Clean Lesson Prev/Next Footer */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    selectMasteryLesson(activeMasteryIdx > 0 ? activeMasteryIdx - 1 : NOTEBOOKLM_MASTERY_MODULES.length - 1)
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a232d] hover:border-[#1f5163]/50 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{isFa ? 'درس قبلی' : 'Previous'}</span>
                </button>

                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  {isFa
                    ? `درس ${(activeMasteryIdx + 1).toLocaleString('fa-IR')} از ${NOTEBOOKLM_MASTERY_MODULES.length.toLocaleString('fa-IR')}`
                    : `Lesson ${activeMasteryIdx + 1} / ${NOTEBOOKLM_MASTERY_MODULES.length}`}
                </span>

                {activeMasteryIdx < NOTEBOOKLM_MASTERY_MODULES.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => selectMasteryLesson(activeMasteryIdx + 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    <span>{isFa ? 'درس بعدی' : 'Next Lesson'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => switchStage('studio', true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    <span>{isFa ? 'مرحله بعد: ابزارهای Studio' : 'Next: Studio Tools'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STAGE 2: STUDIO SUPER-TOOLS (6 DEDICATED OUTPUTS)                     */}
      {/* ===================================================================== */}
      {activeStage === 'studio' && (
        <div
          data-testid="nlm-panel-studio"
          className="rounded-2xl bg-white dark:bg-[#151e26] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {isFa ? '۶ ابزار خروجی پنل Studio در NotebookLM' : 'NotebookLM Studio Panel: 6 Smart Outputs'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isFa
                  ? 'ابزار مورد نظر را انتخاب کنید تا روش اجرا و پرامپت فارسی‌ساز بخش Customize را ببینید.'
                  : 'Select any Studio tool to view step-by-step instructions and its Customize prompt.'}
              </p>
            </div>
          </div>

          {/* Clean 6-Item Tool Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {NOTEBOOKLM_STUDIO_TOOLS.map((tool) => {
              const isSelected = tool.id === activeStudioToolId;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    playTactileSound('switch');
                    setActiveStudioToolId(tool.id);
                  }}
                  className={`p-2.5 rounded-xl border text-right transition-colors cursor-pointer flex flex-col justify-between gap-1 ${
                    isSelected
                      ? 'bg-[#1f5163] text-white border-[#1f5163] shadow-2xs'
                      : 'bg-slate-50 dark:bg-[#11181f] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#1f5163]/50'
                  }`}
                >
                  <span className={`text-[10px] font-mono truncate ${isSelected ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'}`} dir="ltr">
                    {tool.nameEn}
                  </span>
                  <span className="text-xs font-extrabold leading-snug line-clamp-2">{tool.nameFa}</span>
                </button>
              );
            })}
          </div>

          {/* Active Studio Tool Detail */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6]">{activeStudioTool.badgeFa}</div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">{activeStudioTool.nameFa}</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeStudioTool.whatItDoesFa}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  {isFa ? 'مراحل اجرا در NotebookLM:' : 'How to Run in NotebookLM:'}
                </div>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeStudioTool.howToUseFa.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[#1f5163] dark:text-[#6fb3c6] shrink-0">
                        {isFa ? `${(sIdx + 1).toLocaleString('fa-IR')}.` : `${sIdx + 1}.`}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl bg-slate-900 dark:bg-[#0c1218] border border-slate-700/80 text-slate-100 overflow-hidden flex flex-col">
                <div className="px-3.5 py-2 bg-slate-800/80 dark:bg-[#131b24] border-b border-slate-700/70 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-200">
                    {isFa ? 'پرامپت فارسی‌سازی (Customize Prompt)' : 'Customize Prompt'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onLoadToSandbox(activeStudioTool.customizePromptFa)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeStudioTool.customizePromptFa, `studio_tool_${activeStudioTool.id}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#2a6a80] text-white text-[11px] font-bold cursor-pointer"
                    >
                      {copiedId === `studio_tool_${activeStudioTool.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-300" />
                          <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{isFa ? 'کپی' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre
                  dir="rtl"
                  className="p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed text-right text-slate-100 select-text flex-1"
                >
                  {activeStudioTool.customizePromptFa}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STAGE 3: ORGANIZATIONAL PLAYBOOKS (DEPTS + PRESENTATION BLUEPRINTS)   */}
      {/* ===================================================================== */}
      {activeStage === 'usecases' && (
        <div
          data-testid="nlm-panel-usecases"
          className="rounded-2xl bg-white dark:bg-[#151e26] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 animate-fadeIn"
        >
          {/* Unified Inner Segmented Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {isFa ? 'کاربردهای سازمانی NotebookLM' : 'Organizational Playbooks'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isFa
                  ? 'بر اساس دپارتمان کاری خودتان یا نوع خروجی مدیریتی (اسلاید، اینفوگرافیک، پادکست) الگو و سند نمونه بردارید.'
                  : 'Browse ready-to-use workflows by department or by deliverable format.'}
              </p>
            </div>

            <div
              role="tablist"
              className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#11181f] border border-slate-200 dark:border-slate-800 self-start sm:self-center shrink-0"
            >
              <button
                type="button"
                role="tab"
                aria-selected={useCaseMode === 'departments'}
                data-testid="nlm-usecase-depts"
                onClick={() => {
                  playTactileSound('switch');
                  setUseCaseMode('departments');
                  setPreviewDocId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  useCaseMode === 'departments'
                    ? 'bg-[#1f5163] text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isFa ? `ماتریس ${UNIT_MANAGERS_MATRIX.length.toLocaleString('fa-IR')} دپارتمان` : `${UNIT_MANAGERS_MATRIX.length} Departments`}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={useCaseMode === 'blueprints'}
                data-testid="nlm-usecase-blueprints"
                onClick={() => {
                  playTactileSound('switch');
                  setUseCaseMode('blueprints');
                  setPreviewDocId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  useCaseMode === 'blueprints'
                    ? 'bg-[#1f5163] text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isFa ? 'الگوهای پرزنتیشن و پادکست' : 'Decks & Audio Blueprints'}
              </button>
            </div>
          </div>

          {/* 3A: 7-Department Matrix */}
          {useCaseMode === 'departments' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {UNIT_MANAGERS_MATRIX.map((dept) => {
                  const isSelected = dept.id === selectedDeptId;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setSelectedDeptId(dept.id);
                        setPreviewDocId(null);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#1f5163] text-white border-[#1f5163]'
                          : 'bg-slate-50 dark:bg-[#11181f] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#1f5163]/50'
                      }`}
                    >
                      {renderDeptIcon(dept.iconName, 'w-3.5 h-3.5 shrink-0')}
                      <span>
                        {isFa ? dept.departmentFa.split('(')[0].trim() : dept.departmentEn.split('&')[0].trim()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Department Detail */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                      {isFa ? selectedDepartment.departmentFa : selectedDepartment.departmentEn}
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isFa ? selectedDepartment.managerRoleFa : selectedDepartment.managerRoleEn}
                    </div>
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold max-w-md">
                    {isFa ? selectedDepartment.practicalValueFa : selectedDepartment.practicalValueEn}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-extrabold text-[#1f5163] dark:text-[#6fb3c6]">
                      {isFa ? 'مدارک پیشنهادی برای بارگذاری (PDF / MD / Sheets)' : 'Recommended Sources'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {(isFa ? selectedDepartment.recommendedSourcesFa : selectedDepartment.recommendedSourcesEn).map(
                        (source, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="font-mono text-[#1f5163] dark:text-[#6fb3c6]">•</span>
                            <span>{source}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {isFa ? 'خروجی‌های کلیدی قابل استخراج' : 'Key Deliverables'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {(isFa ? selectedDepartment.keyDeliverablesFa : selectedDepartment.keyDeliverablesEn).map(
                        (deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {currentSampleDoc && (
                  <SpecimenDocumentCard
                    lang={lang}
                    doc={currentSampleDoc}
                    helperNoteFa="فایل را در NotebookLM آپلود و پرامپت زیر را اجرا کنید."
                    helperNoteEn="Upload to NotebookLM and run the prompt below."
                    docCopiedId={docCopiedId}
                    previewDocId={previewDocId}
                    onDownload={handleDownloadSpecimen}
                    onCopy={handleCopySpecimen}
                    onTogglePreview={handleTogglePreview}
                  />
                )}

                {/* Ready Prompt */}
                <div className="rounded-xl bg-slate-900 dark:bg-[#0c1218] border border-slate-700/80 text-slate-100 overflow-hidden">
                  <div className="px-3.5 py-2 bg-slate-800/80 border-b border-slate-700/70 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-200">
                      {isFa
                        ? `پرامپت آماده دپارتمان ${selectedDepartment.departmentFa.split('(')[0].trim()}`
                        : `Ready Prompt · ${selectedDepartment.departmentEn}`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onLoadToSandbox(
                            isFa ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            isFa ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn,
                            `dept_prompt_${selectedDepartment.id}`
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#2a6a80] text-white text-[11px] font-bold cursor-pointer"
                      >
                        {copiedId === `dept_prompt_${selectedDepartment.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-300" />
                            <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre
                    dir={isFa ? 'rtl' : 'ltr'}
                    className={`p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed text-slate-100 max-h-52 overflow-y-auto select-text ${
                      isFa ? 'text-right' : 'text-left'
                    }`}
                  >
                    {isFa ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* 3B: Presentation, Infographic, Podcast & HR Audit Blueprints */}
          {useCaseMode === 'blueprints' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {PRESENTATION_INFOGRAPHIC_GUIDES.map((blueprint) => {
                  const isSelected = blueprint.id === selectedBlueprintId;
                  const isAudio =
                    blueprint.kind === 'audio' ||
                    blueprint.id === 'audio_overview_deep_dive' ||
                    blueprint.id === 'paya_audio_consortium_briefing';
                  const isHr =
                    blueprint.kind === 'hr' || blueprint.id === 'hr_overtime_compliance_blueprint';
                  return (
                    <button
                      key={blueprint.id}
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setSelectedBlueprintId(blueprint.id);
                        setPreviewDocId(null);
                      }}
                      className={`p-3 rounded-xl border text-right transition-colors cursor-pointer space-y-1 ${
                        isSelected
                          ? 'bg-[#1f5163] text-white border-[#1f5163]'
                          : 'bg-slate-50 dark:bg-[#11181f] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#1f5163]/50'
                      }`}
                    >
                      <div className={`flex items-center justify-between text-[10.5px] font-semibold ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                        <span>{isFa ? blueprint.categoryFa : blueprint.categoryEn}</span>
                        {isAudio ? (
                          <Headphones className="w-3.5 h-3.5" />
                        ) : isHr ? (
                          <Users className="w-3.5 h-3.5" />
                        ) : (
                          <FileBarChart className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="text-xs font-extrabold leading-snug line-clamp-2">
                        {isFa ? blueprint.titleFa : blueprint.titleEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 pt-1">
                <div className="space-y-1 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                    {isFa ? selectedBlueprint.categoryFa : selectedBlueprint.categoryEn}
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {isFa ? selectedBlueprint.titleFa : selectedBlueprint.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isFa ? selectedBlueprint.descriptionFa : selectedBlueprint.descriptionEn}
                  </p>
                </div>

                {/* 4-Step Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isFa ? selectedBlueprint.stepByStepGuideFa : selectedBlueprint.stepByStepGuideEn).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-md bg-[#1f5163]/12 dark:bg-[#6fb3c6]/20 text-[#1f5163] dark:text-[#6fb3c6] font-mono font-bold text-[11px] flex items-center justify-center shrink-0 tabular-nums">
                          {isFa ? (idx + 1).toLocaleString('fa-IR') : idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    )
                  )}
                </div>

                {currentBlueprintSampleDoc && (
                  <SpecimenDocumentCard
                    lang={lang}
                    doc={currentBlueprintSampleDoc}
                    helperNoteFa="سند نمونه را در نوت‌بوک بارگذاری و پرامپت استخراج زیر را بفرستید."
                    helperNoteEn="Upload to NotebookLM and run the prompt below."
                    docCopiedId={docCopiedId}
                    previewDocId={previewDocId}
                    onDownload={handleDownloadSpecimen}
                    onCopy={handleCopySpecimen}
                    onTogglePreview={handleTogglePreview}
                  />
                )}

                {/* Copyable Extraction Prompt */}
                <div className="rounded-xl bg-slate-900 dark:bg-[#0c1218] border border-slate-700/80 text-slate-100 overflow-hidden">
                  <div className="px-3.5 py-2 bg-slate-800/80 border-b border-slate-700/70 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-200">
                      {isFa ? 'پرامپت آماده استخراج ساختار' : 'Extraction Prompt'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onLoadToSandbox(
                            isFa ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            isFa ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn,
                            `blueprint_prompt_${selectedBlueprint.id}`
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#2a6a80] text-white text-[11px] font-bold cursor-pointer"
                      >
                        {copiedId === `blueprint_prompt_${selectedBlueprint.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-300" />
                            <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre
                    dir={isFa && selectedBlueprint.id !== 'audio_overview_deep_dive' ? 'rtl' : 'ltr'}
                    className={`p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed text-slate-100 max-h-52 overflow-y-auto select-text ${
                      isFa && selectedBlueprint.id !== 'audio_overview_deep_dive' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {isFa ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* STAGE 4: REAL-DOCUMENT LABS (5 HANDS-ON SCENARIOS WITH .MD FILES)     */}
      {/* ===================================================================== */}
      {activeStage === 'labs' && (
        <div
          data-testid="nlm-panel-labs"
          className="rounded-2xl bg-white dark:bg-[#151e26] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {isFa ? 'کارگاه عملی با اسناد واقعی (فایل‌های آماده .md)' : 'Hands-On Labs with Real Sample Documents'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isFa
                  ? 'یکی از سناریوها را انتخاب کنید، فایل آماده آن را دانلود کرده در NotebookLM آپلود کنید و خروجی را ارزیابی نمایید.'
                  : 'Pick a real-world scenario, upload its sample file to NotebookLM, and run the structured prompt.'}
              </p>
            </div>
            <a
              href={NOTEBOOKLM_OVERVIEW.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a232d] hover:border-[#1f5163]/50 text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] whitespace-nowrap"
            >
              <span>{isFa ? 'باز کردن NotebookLM' : 'Open NotebookLM'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Compact Lab Selector Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {NOTEBOOKLM_EXERCISES.map((ex) => {
              const isSelected = ex.id === selectedExerciseId;
              return (
                <button
                  key={ex.id}
                  type="button"
                  data-testid={`nlm-lab-${ex.id}`}
                  onClick={() => {
                    playTactileSound('switch');
                    setSelectedExerciseId(ex.id);
                    setActiveScenarioIdx(0);
                    setPreviewDocId(null);
                  }}
                  className={`p-2.5 rounded-xl border text-right transition-colors cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-[#1f5163] text-white border-[#1f5163]'
                      : 'bg-slate-50 dark:bg-[#11181f] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#1f5163]/50'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[10.5px] font-mono tabular-nums ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                    <span>{isFa ? `سناریو ${ex.exerciseNumber.toLocaleString('fa-IR')}` : `Lab #${ex.exerciseNumber}`}</span>
                    <span>{ex.estimatedMinutes}m</span>
                  </div>
                  <div className="text-xs font-extrabold leading-snug line-clamp-2">
                    {isFa ? ex.titleFa : ex.titleEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Lab Workspace */}
          <div className="space-y-4">
            <div className="space-y-1 pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                  {isFa ? `سناریو ${selectedExercise.exerciseNumber.toLocaleString('fa-IR')}` : `Lab #${selectedExercise.exerciseNumber}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{isFa ? selectedExercise.targetDepartmentFa : selectedExercise.targetDepartmentEn}</span>
                <span aria-hidden="true">·</span>
                <span>{isFa ? `${selectedExercise.estimatedMinutes.toLocaleString('fa-IR')} دقیقه` : `${selectedExercise.estimatedMinutes} min`}</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {isFa ? selectedExercise.titleFa : selectedExercise.titleEn}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa ? selectedExercise.objectiveFa : selectedExercise.objectiveEn}
              </p>
            </div>

            {currentExerciseSampleDoc && (
              <SpecimenDocumentCard
                lang={lang}
                doc={currentExerciseSampleDoc}
                helperNoteFa="فایل منبع را در نوت‌بوک آپلود کرده و پرامپت زیر را اجرا نمایید."
                helperNoteEn="Upload this source to your notebook and run the prompt below."
                docCopiedId={docCopiedId}
                previewDocId={previewDocId}
                onDownload={handleDownloadSpecimen}
                onCopy={handleCopySpecimen}
                onTogglePreview={handleTogglePreview}
              />
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                {isFa ? 'گام‌های اجرای سناریو:' : 'Step-by-Step Instructions:'}
              </div>
              <ol className="space-y-1.5">
                {(isFa ? selectedExercise.instructionsFa : selectedExercise.instructionsEn).map((inst, iIdx) => (
                  <li
                    key={iIdx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#1f5163]/12 dark:bg-[#6fb3c6]/20 text-[#1f5163] dark:text-[#6fb3c6] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {isFa ? (iIdx + 1).toLocaleString('fa-IR') : iIdx + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Main Exercise Prompt */}
            <div className="rounded-xl bg-slate-900 dark:bg-[#0c1218] border border-slate-700/80 text-slate-100 overflow-hidden">
              <div className="px-3.5 py-2 bg-slate-800/80 border-b border-slate-700/70 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-200">
                  {isFa ? 'پرامپت اصلی تمرین برای NotebookLM' : 'Main Exercise Prompt'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      onLoadToSandbox(
                        isFa ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-[11px] font-bold cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        isFa ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn,
                        `ex_prompt_${selectedExercise.id}`
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#2a6a80] text-white text-[11px] font-bold cursor-pointer"
                  >
                    {copiedId === `ex_prompt_${selectedExercise.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300" />
                        <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <pre
                dir={isFa && selectedExercise.id !== 'ex2_audio_podcast_creation' ? 'rtl' : 'ltr'}
                className={`p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed text-slate-100 max-h-56 overflow-y-auto select-text ${
                  isFa && selectedExercise.id !== 'ex2_audio_podcast_creation' ? 'text-right' : 'text-left'
                }`}
              >
                {isFa ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn}
              </pre>
            </div>

            {/* Optional Multi-Scenario Section (e.g., HR 4 Scenarios + Evaluation Key) */}
            {selectedExercise.subScenarios && selectedExercise.subScenarios.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200 dark:border-slate-800 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
                    <span>
                      {isFa
                        ? '۴ سناریوی تخصصی منابع انسانی + کلید ارزیابی'
                        : '4 Interactive HR Practice Scenarios & Keys'}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {selectedExercise.subScenarios.map((scen, idx) => {
                    const isActive = activeScenarioIdx === idx;
                    return (
                      <button
                        key={scen.id}
                        type="button"
                        onClick={() => setActiveScenarioIdx(idx)}
                        className={`p-2.5 rounded-lg border text-right transition-colors cursor-pointer space-y-0.5 ${
                          isActive
                            ? 'bg-[#1f5163] text-white border-[#1f5163]'
                            : 'bg-white dark:bg-[#161e26] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#1f5163]/50'
                        }`}
                      >
                        <div className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                          {isFa ? `سناریو ${scen.number.toLocaleString('fa-IR')}` : `Scenario ${scen.number}`}
                        </div>
                        <div className="text-xs font-bold leading-snug line-clamp-2">
                          {isFa ? scen.titleFa : scen.titleEn}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const activeScen =
                    selectedExercise.subScenarios[activeScenarioIdx] || selectedExercise.subScenarios[0];
                  return (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#161e26] border border-slate-200 dark:border-slate-700/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                          {isFa ? activeScen.titleFa : activeScen.titleEn}
                        </h5>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onLoadToSandbox(isFa ? activeScen.promptFa : activeScen.promptEn)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] cursor-pointer"
                          >
                            <Play className="w-3 h-3" />
                            <span>{isFa ? 'سندباکس' : 'Sandbox'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(
                                isFa ? activeScen.promptFa : activeScen.promptEn,
                                `scen_prompt_${activeScen.id}`
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold cursor-pointer"
                          >
                            {copiedId === `scen_prompt_${activeScen.id}` ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{isFa ? 'کپی پرامپت' : 'Copy'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <pre
                        dir={isFa ? 'rtl' : 'ltr'}
                        className={`p-3 rounded-lg bg-slate-50 dark:bg-[#0e141a] border border-slate-200/80 dark:border-slate-800 text-xs font-sans whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200 select-text ${
                          isFa ? 'text-right' : 'text-left'
                        }`}
                      >
                        {isFa ? activeScen.promptFa : activeScen.promptEn}
                      </pre>

                      <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 space-y-1.5">
                        <div className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                          {isFa ? 'کلید ارزیابی خروجی مورد انتظار:' : 'Expected Output Key:'}
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                          {(isFa ? activeScen.expectedKeyFa : activeScen.expectedKeyEn).map((k, kIdx) => (
                            <li key={kIdx} className="flex items-start gap-2 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {activeScen.sampleLetterOutputFa && (
                        <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5" />
                              <span>{isFa ? 'نمونه نامه رسمی استاندارد (کلید ارزیابی):' : 'Official Letter Specimen:'}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                copyToClipboard(activeScen.sampleLetterOutputFa || '', `scen_letter_${activeScen.id}`)
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                            >
                              {copiedId === `scen_letter_${activeScen.id}` ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{isFa ? 'کپی نامه' : 'Copy Letter'}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre
                            dir="rtl"
                            className="p-3 rounded-md bg-white dark:bg-[#0e141a] border border-amber-200/60 dark:border-slate-800 text-xs font-sans whitespace-pre-wrap leading-relaxed text-right text-slate-800 dark:text-slate-200 max-h-72 overflow-y-auto select-text"
                          >
                            {activeScen.sampleLetterOutputFa}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Success Criteria Checklist */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-slate-200/75 dark:border-slate-800 space-y-2">
              <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isFa ? 'معیارهای ارزیابی موفقیت این سناریو:' : 'Success Criteria:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(isFa ? selectedExercise.successVerificationFa : selectedExercise.successVerificationEn).map(
                  (crit, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-white dark:bg-[#161e26] border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{crit}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bridge to Interactive HR Tools Workshop */}
            {selectedExercise.id === 'ex5_hr_metro_line10_compliance' && onOpenHrToolsWorkshop && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11181f] border border-[#1f5163]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                    {isFa ? 'گام بعدی پس از تحلیل مستندات در NotebookLM:' : 'Next Step After NotebookLM:'}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {isFa
                      ? 'ابزار تعاملی منابع انسانی و اداری با Gemini، Claude و NotebookLM'
                      : 'Interactive HR & Admin Tools (Gemini, Claude & NotebookLM)'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenHrToolsWorkshop}
                  data-testid="open-hr-tools-from-nlm-btn"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>{isFa ? 'ورود به ابزارهای تعاملی HR' : 'Open Interactive HR Tools'}</span>
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. QUIET SINGLE-LINE STAGE PROGRESSION BAR (Replaces Duplicated Bottom Keycap Deck) */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {prevStageObj ? (
          <button
            type="button"
            onClick={() => switchStage(prevStageObj.id, true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#151e26] hover:border-[#1f5163]/50 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>
              {isFa ? `مرحله قبل: ${prevStageObj.labelFa}` : `Prev: ${prevStageObj.labelEn}`}
            </span>
          </button>
        ) : (
          <span />
        )}

        {nextStageObj ? (
          <button
            type="button"
            onClick={() => switchStage(nextStageObj.id, true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <span>
              {isFa
                ? `مرحله بعد: ${nextStageObj.numFa}. ${nextStageObj.labelFa}`
                : `Next: ${nextStageObj.numEn}. ${nextStageObj.labelEn}`}
            </span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        ) : onOpenHrToolsWorkshop ? (
          <button
            type="button"
            onClick={onOpenHrToolsWorkshop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <span>{isFa ? 'ماژول بعدی: ابزارهای تعاملی HR' : 'Next Module: Interactive HR Tools'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span />
        )}
      </div>
    </section>
  );
};
