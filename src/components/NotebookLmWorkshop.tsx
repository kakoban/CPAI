import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types/cpmai';
import { DisciplineId, EngineeringRoleId, IndustryTrackId } from '../types/industryTrack';
import { getDisciplineMetadata } from '../data/disciplineExamplesRegistry';
import { getRoleChallengeProfile, getRoleDisplayMeta } from '../utils/disciplineAdaptation';
import { openAiCompanionWindow } from '../utils/companionWindow';
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
import { FocusedLessonLayout, FocusedStepItem, FocusedViewTab } from './learning/FocusedLessonLayout';
import { FocusedLessonFooter } from './learning/FocusedLessonFooter';
import { clampStepIndex, getStepBoundaryState, markStepVisited } from '../utils/focusedLessonEngine';

type NotebookLmStage = 'basics' | 'studio' | 'usecases' | 'labs';

interface NotebookLmWorkshopProps {
  lang: Language;
  industryTrack?: IndustryTrackId;
  disciplineId?: DisciplineId;
  roleId?: EngineeringRoleId;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onOpenHrToolsWorkshop?: () => void;
  onOpenDisciplineModal?: () => void;
  openCompanionWindow?: (url: string, name: string) => void;
  isPresentationMode?: boolean;
  isSplitCockpit?: boolean;
}

export const NotebookLmWorkshop: React.FC<NotebookLmWorkshopProps> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  disciplineId,
  roleId = 'technical_engineer',
  onLoadToSandbox,
  copyToClipboard,
  copiedId,
  onOpenHrToolsWorkshop,
  onOpenDisciplineModal,
  openCompanionWindow,
  isPresentationMode = false,
  isSplitCockpit = false
}) => {
  const isFa = lang === 'fa';
  const activeDisciplineMeta = disciplineId ? getDisciplineMetadata(disciplineId) : null;
  const activeRoleMeta = getRoleDisplayMeta(roleId, industryTrack);
  const roleProfile = getRoleChallengeProfile(roleId, industryTrack);
  const {
    overview: NOTEBOOKLM_OVERVIEW,
    departments: UNIT_MANAGERS_MATRIX,
    blueprints: PRESENTATION_INFOGRAPHIC_GUIDES,
    exercises: NOTEBOOKLM_EXERCISES
  } = getNotebookLmGuideForTrack(industryTrack, disciplineId, roleId);
  const {
    departmentDocs: SAMPLE_DEPARTMENT_DOCS,
    blueprintDocs: SAMPLE_BLUEPRINT_DOCS,
    exerciseDocs: SAMPLE_EXERCISE_DOCS
  } = getNotebookLmSampleDocsForTrack(industryTrack, disciplineId, roleId);

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
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [visitedBasics, setVisitedBasics] = useState<Set<number>>(() => new Set([0]));
  const [visitedStudio, setVisitedStudio] = useState<Set<number>>(() => new Set([0]));
  const [visitedLabs, setVisitedLabs] = useState<Set<number>>(() => new Set([0]));
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
  }, [industryTrack, disciplineId, roleId]);

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
  const activeStudioIdx = Math.max(
    0,
    NOTEBOOKLM_STUDIO_TOOLS.findIndex((t) => t.id === activeStudioToolId)
  );
  const activeStudioTool = NOTEBOOKLM_STUDIO_TOOLS[activeStudioIdx] || NOTEBOOKLM_STUDIO_TOOLS[0];
  const activeLabIdx = Math.max(
    0,
    NOTEBOOKLM_EXERCISES.findIndex((e) => e.id === selectedExerciseId)
  );

  const viewTabs: FocusedViewTab[] = STAGES.map((st) => ({
    id: st.id,
    label: isFa ? st.labelFa : st.labelEn
  }));

  const basicsSteps: FocusedStepItem[] = NOTEBOOKLM_MASTERY_MODULES.map((item, idx) => ({
    id: item.id,
    title: item.titleFa,
    category: isFa ? `درس ${(idx + 1).toLocaleString('fa-IR')}` : `Lesson ${idx + 1}`
  }));

  const studioSteps: FocusedStepItem[] = NOTEBOOKLM_STUDIO_TOOLS.map((tool) => ({
    id: tool.id,
    title: tool.nameFa,
    category: tool.nameEn
  }));

  const labSteps: FocusedStepItem[] = NOTEBOOKLM_EXERCISES.map((ex) => ({
    id: ex.id,
    title: isFa ? ex.titleFa : ex.titleEn,
    category:
      ex.exerciseNumber === 0
        ? isFa
          ? `اختصاصی دیسیپلین · ${ex.estimatedMinutes} دقیقه`
          : `Active Discipline · ${ex.estimatedMinutes}m`
        : isFa
        ? `سناریو ${ex.exerciseNumber.toLocaleString('fa-IR')} · ${ex.estimatedMinutes} دقیقه`
        : `Lab #${ex.exerciseNumber} · ${ex.estimatedMinutes}m`
  }));

  const currentSidebarSteps =
    activeStage === 'basics'
      ? basicsSteps
      : activeStage === 'studio'
      ? studioSteps
      : activeStage === 'labs'
      ? labSteps
      : [];

  const currentStepIndex =
    activeStage === 'basics'
      ? activeMasteryIdx
      : activeStage === 'studio'
      ? activeStudioIdx
      : activeStage === 'labs'
      ? activeLabIdx
      : 0;

  const currentVisitedSet =
    activeStage === 'basics'
      ? visitedBasics
      : activeStage === 'studio'
      ? visitedStudio
      : visitedLabs;

  const handleSelectCurrentStageStep = (idx: number) => {
    if (activeStage === 'basics') {
      const next = clampStepIndex(idx, basicsSteps.length);
      selectMasteryLesson(next);
      setVisitedBasics((prev) => markStepVisited(prev, next));
    } else if (activeStage === 'studio') {
      const next = clampStepIndex(idx, studioSteps.length);
      playTactileSound('switch');
      setActiveStudioToolId(NOTEBOOKLM_STUDIO_TOOLS[next].id);
      setVisitedStudio((prev) => markStepVisited(prev, next));
    } else if (activeStage === 'labs') {
      const next = clampStepIndex(idx, labSteps.length);
      playTactileSound('switch');
      setSelectedExerciseId(NOTEBOOKLM_EXERCISES[next].id);
      setActiveScenarioIdx(0);
      setPreviewDocId(null);
      setVisitedLabs((prev) => markStepVisited(prev, next));
    }
  };

  const currentBoundary = getStepBoundaryState(currentStepIndex, currentSidebarSteps.length);

  return (
    <div
      ref={stageTopRef}
      data-testid={isOverviewExpanded ? 'notebooklm-overview-expanded' : 'notebooklm-overview-collapsed'}
      className="scroll-mt-4"
    >
      <FocusedLessonLayout
        lang={lang}
        moduleCode="NotebookLM"
        moduleTitle={isFa ? 'کارگاه جامع Google NotebookLM' : 'Google NotebookLM Mastery Workshop'}
        moduleSubtitle={
          isFa
            ? 'هوش مستند بدون توهم · ۵۰ سند هم‌زمان · ۵۰۰ هزار واژه · پادکست و نقشه ذهنی'
            : 'Zero-Hallucination Document Lab · 50 Sources · 500k Words'
        }
        steps={currentSidebarSteps}
        activeStepIndex={currentStepIndex}
        visitedStepIndices={currentVisitedSet}
        onSelectStep={handleSelectCurrentStageStep}
        views={viewTabs}
        activeViewId={activeStage}
        onSelectView={(v) => switchStage(v as NotebookLmStage)}
        isStepListVisible={activeStage !== 'usecases'}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={setIsMobileDrawerOpen}
        sidebarTitleFa={
          activeStage === 'basics'
            ? '۷ درس پایه تا تسلط'
            : activeStage === 'studio'
            ? '۶ ابزار پنل Studio'
            : 'سناریوهای کارگاه اسناد'
        }
        sidebarTitleEn={
          activeStage === 'basics'
            ? '7-Lesson Syllabus'
            : activeStage === 'studio'
            ? '6 Studio Tools'
            : 'Real-Doc Labs'
        }
        stepUnitFa={activeStage === 'studio' ? 'ابزار' : activeStage === 'labs' ? 'سناریو' : 'درس'}
        stepUnitEn={activeStage === 'studio' ? 'tools' : activeStage === 'labs' ? 'labs' : 'lessons'}
        headerAction={
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              data-testid="open-notebooklm-companion-btn"
              onClick={() => {
                if (openCompanionWindow) {
                  openCompanionWindow(NOTEBOOKLM_OVERVIEW.url, 'notebooklm_companion');
                } else {
                  openAiCompanionWindow(NOTEBOOKLM_OVERVIEW.url, 'notebooklm_companion');
                }
              }}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
              title={isFa ? 'باز کردن NotebookLM در پنجره کناری (بدون ترک صفحه)' : 'Open NotebookLM in side companion window'}
            >
              <span>{isFa ? 'ورود به NotebookLM در پنجره کناری' : 'Open NotebookLM Side Window'}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('switch');
                setIsOverviewExpanded((prev) => !prev);
              }}
              data-testid="notebooklm-overview-toggle"
              aria-expanded={isOverviewExpanded}
              className="inline-flex items-center gap-1 min-h-[40px] px-3 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer transition-colors whitespace-nowrap"
            >
              {isOverviewExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{isFa ? (isOverviewExpanded ? 'بستن معرفی' : 'معرفی کوتاه') : isOverviewExpanded ? 'Hide Overview' : 'Overview'}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Optional Expandable Overview */}
          {isOverviewExpanded && (
            <div className="p-4 sm:p-5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] space-y-3.5 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[var(--cpai-text)] text-balance">
                  {isFa ? NOTEBOOKLM_OVERVIEW.titleFa : NOTEBOOKLM_OVERVIEW.titleEn}
                </h3>
                <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
                  {isFa ? NOTEBOOKLM_OVERVIEW.taglineFa : NOTEBOOKLM_OVERVIEW.taglineEn}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {NOTEBOOKLM_OVERVIEW.keyStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2.5 rounded-lg bg-[var(--cpai-surface)] border border-[var(--cpai-border)]"
                  >
                    <div className="text-[11px] text-[var(--cpai-muted)]">
                      {isFa ? stat.labelFa : stat.labelEn}
                    </div>
                    <div className="text-sm font-bold text-[var(--cpai-primary-strong)] mt-0.5 tabular-nums">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[var(--cpai-text)] leading-relaxed pt-1">
                {(isFa ? NOTEBOOKLM_OVERVIEW.whyEngineersLoveItFa : NOTEBOOKLM_OVERVIEW.whyEngineersLoveItEn).map(
                  (item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--cpai-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STAGE 1: CORE MASTERY — FOCUSED SINGLE-LESSON VIEW (7 LESSONS)        */}
          {/* ===================================================================== */}
          {activeStage === 'basics' && (
            <div
              ref={basicsPanelRef}
              data-testid="nlm-panel-basics"
              className="space-y-5 scroll-mt-3 animate-fadeIn"
            >
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

              <FocusedLessonFooter
                lang={lang}
                boundary={currentBoundary}
                onPrev={() => handleSelectCurrentStageStep(currentBoundary.currentIndex - 1)}
                onNext={() => handleSelectCurrentStageStep(currentBoundary.currentIndex + 1)}
                finalStepCta={{
                  label: isFa ? 'مرحله بعد: ابزارهای Studio' : 'Next: Studio Tools',
                  onClick: () => switchStage('studio', true)
                }}
                prevLabelFa="درس قبلی"
                prevLabelEn="Previous lesson"
                nextLabelFa="درس بعدی"
                nextLabelEn="Next lesson"
                stepUnitFa="درس"
                stepUnitEn="Lesson"
              />
            </div>
          )}

      {/* ===================================================================== */}
      {/* STAGE 2: STUDIO SUPER-TOOLS (6 DEDICATED OUTPUTS)                     */}
      {/* ===================================================================== */}
      {activeStage === 'studio' && (
        <div
          data-testid="nlm-panel-studio"
          className="space-y-5 animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--cpai-border)]">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold text-[var(--cpai-text)]">
                {isFa ? '۶ ابزار خروجی پنل Studio در NotebookLM' : 'NotebookLM Studio Panel: 6 Smart Outputs'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)]">
                {isFa
                  ? 'ابزار مورد نظر را از فهرست سمت راست انتخاب کنید تا روش اجرا و پرامپت فارسی‌ساز بخش Customize را ببینید.'
                  : 'Select any Studio tool from the sidebar to view step-by-step instructions and its Customize prompt.'}
              </p>
            </div>
          </div>

          {/* Active Studio Tool Detail */}
          <div className="space-y-4">
            {activeDisciplineMeta && (
              <div
                data-testid="nlm-studio-role-callout"
                className="p-3.5 rounded-xl bg-[var(--cpai-primary-soft)]/50 border border-[var(--cpai-primary)]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-bold text-[var(--cpai-primary-strong)]">
                    {isFa
                      ? `پیشنهاد متناسب با سطح «${activeRoleMeta.shortFa}» در دیسیپلین «${activeDisciplineMeta.shortTitleFa}»:`
                      : `Recommended for ${activeRoleMeta.shortEn} · ${activeDisciplineMeta.shortTitleEn}:`}
                  </div>
                  <div className="text-xs font-semibold text-[var(--cpai-text)]">
                    {isFa
                      ? `${roleProfile.recommendedStudioToolFa} — ${roleProfile.challengeTypeFa}`
                      : `${roleProfile.recommendedStudioToolEn} — ${roleProfile.challengeTypeEn}`}
                  </div>
                </div>
                {onOpenDisciplineModal && (
                  <button
                    type="button"
                    onClick={onOpenDisciplineModal}
                    className="px-2.5 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[11px] font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    {isFa ? 'تغییر سطح / دیسیپلین' : 'Change Level / Discipline'}
                  </button>
                )}
              </div>
            )}

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
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {isFa ? 'کاربردهای سازمانی NotebookLM' : 'Organizational Playbooks'}
                </h3>
                {activeDisciplineMeta && (
                  <button
                    type="button"
                    onClick={onOpenDisciplineModal}
                    disabled={!onOpenDisciplineModal}
                    data-testid="nlm-active-discipline-pill"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/30 text-[11px] font-bold ${
                      onOpenDisciplineModal ? 'hover:border-[var(--cpai-primary)] cursor-pointer' : ''
                    }`}
                  >
                    <span>
                      {isFa
                        ? `هم‌تراز با دیسیپلین: ${activeDisciplineMeta.shortTitleFa} · سطح ${activeRoleMeta.shortFa}`
                        : `Matched: ${activeDisciplineMeta.shortTitleEn} · ${activeRoleMeta.shortEn}`}
                    </span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {isFa
                  ? 'بر اساس دیسیپلین فعال، دپارتمان کاری خودتان یا نوع خروجی مدیریتی (اسلاید، اینفوگرافیک، پادکست) الگو و سند نمونه بردارید.'
                  : 'Browse ready-to-use workflows tailored to your discipline, department, or deliverable format.'}
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
                {selectedDepartment.id === 'discipline_active' && activeDisciplineMeta && (
                  <div
                    data-testid="nlm-role-challenge-banner"
                    className="p-3.5 rounded-xl bg-[var(--cpai-primary-soft)]/45 border border-[var(--cpai-primary)]/35 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[var(--cpai-primary-strong)]">
                        {isFa ? `جنس چالش سطح «${activeRoleMeta.shortFa}»: ` : `${activeRoleMeta.shortEn} Challenge: `}
                      </span>
                      <span className="text-[var(--cpai-text)]">{isFa ? roleProfile.challengeTypeFa : roleProfile.challengeTypeEn}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--cpai-primary-strong)]">
                        {isFa ? 'قالب خروجی این سطح: ' : 'Target Output: '}
                      </span>
                      <span className="text-[var(--cpai-text)]">{isFa ? roleProfile.deliverableShapeFa : roleProfile.deliverableShapeEn}</span>
                    </div>
                  </div>
                )}

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
          className="space-y-5 animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[var(--cpai-border)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[var(--cpai-text)]">
                  {isFa ? 'کارگاه عملی با اسناد واقعی (فایل‌های آماده .md)' : 'Hands-On Labs with Real Sample Documents'}
                </h3>
                {activeDisciplineMeta && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/30 text-[11px] font-bold">
                    {isFa
                      ? `تنظیم‌شده برای: ${activeDisciplineMeta.shortTitleFa} · ${activeRoleMeta.shortFa}`
                      : `${activeDisciplineMeta.shortTitleEn} · ${activeRoleMeta.shortEn}`}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--cpai-muted)] mt-0.5">
                {isFa
                  ? 'سناریو را از فهرست سمت راست انتخاب کنید، فایل آماده آن را دانلود کرده در NotebookLM آپلود کنید و خروجی را ارزیابی نمایید.'
                  : 'Pick a scenario from the sidebar, upload its sample file to NotebookLM, and run the structured prompt.'}
              </p>
            </div>
            {onOpenDisciplineModal && (
              <button
                type="button"
                onClick={onOpenDisciplineModal}
                className="px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer shrink-0 whitespace-nowrap"
              >
                {isFa ? 'تغییر سطح / دیسیپلین' : 'Change Level / Discipline'}
              </button>
            )}
          </div>

          {/* Active Lab Workspace */}
          <div className="space-y-4">
            <div className="space-y-1 pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                  {selectedExercise.exerciseNumber === 0
                    ? isFa
                      ? 'سناریوی اختصاصی دیسیپلین'
                      : 'Discipline Lab'
                    : isFa
                    ? `سناریو ${selectedExercise.exerciseNumber.toLocaleString('fa-IR')}`
                    : `Lab #${selectedExercise.exerciseNumber}`}
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

          {/* Stage-level Footer for Studio, Use Cases, and Labs */}
          {activeStage === 'studio' && (
            <FocusedLessonFooter
              lang={lang}
              boundary={currentBoundary}
              onPrev={() => handleSelectCurrentStageStep(currentBoundary.currentIndex - 1)}
              onNext={() => handleSelectCurrentStageStep(currentBoundary.currentIndex + 1)}
              finalStepCta={{
                label: isFa ? 'مرحله بعد: کاربردهای سازمانی' : 'Next: Org Playbooks',
                onClick: () => switchStage('usecases', true)
              }}
              prevLabelFa="ابزار قبلی"
              prevLabelEn="Previous tool"
              nextLabelFa="ابزار بعدی"
              nextLabelEn="Next tool"
              stepUnitFa="ابزار"
              stepUnitEn="Tool"
            />
          )}

          {activeStage === 'usecases' && (
            <div className="pt-6 mt-6 border-t border-[var(--cpai-border)] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => switchStage('studio', true)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span>{isFa ? 'بازگشت به ابزارهای Studio' : 'Back to Studio Tools'}</span>
              </button>
              <button
                type="button"
                onClick={() => switchStage('labs', true)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold cursor-pointer transition-colors"
              >
                <span>{isFa ? 'مرحله بعد: کارگاه اسناد واقعی' : 'Next: Real-Doc Labs'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeStage === 'labs' && (
            <FocusedLessonFooter
              lang={lang}
              boundary={currentBoundary}
              onPrev={() => handleSelectCurrentStageStep(currentBoundary.currentIndex - 1)}
              onNext={() => handleSelectCurrentStageStep(currentBoundary.currentIndex + 1)}
              finalStepCta={
                onOpenHrToolsWorkshop
                  ? {
                      label: isFa ? 'ماژول بعدی: ابزارهای تعاملی HR' : 'Next Module: Interactive HR Tools',
                      onClick: onOpenHrToolsWorkshop
                    }
                  : undefined
              }
              prevLabelFa="سناریو قبلی"
              prevLabelEn="Previous lab"
              nextLabelFa="سناریو بعدی"
              nextLabelEn="Next lab"
              stepUnitFa="سناریو"
              stepUnitEn="Lab"
            />
          )}
        </div>
      </FocusedLessonLayout>
    </div>
  );
};
