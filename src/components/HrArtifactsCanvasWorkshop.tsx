import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  Copy,
  Check,
  Play,
  ExternalLink,
  Code,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import {
  HR_ARTIFACTS_WORKSHOP_HEADER,
  HR_ARTIFACT_EXERCISES,
  HR_NOTEBOOKLM_COMPANION,
  HrArtifactExercise
} from '../data/hr_artifacts_canvas_workshop';
import { FocusedLessonLayout, FocusedStepItem, FocusedViewTab } from './learning/FocusedLessonLayout';
import { FocusedLessonFooter } from './learning/FocusedLessonFooter';
import { LessonTakeawayCallout } from './learning/LessonTakeawayCallout';
import { clampStepIndex, formatStepNumber, getStepBoundaryState, markStepVisited } from '../utils/focusedLessonEngine';

interface HrArtifactsCanvasWorkshopProps {
  lang: Language;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const HrArtifactsCanvasWorkshop: React.FC<HrArtifactsCanvasWorkshopProps> = ({
  lang,
  onLoadToSandbox,
  copyToClipboard,
  copiedId
}) => {
  const isFa = lang === 'fa';
  const [activeView, setActiveView] = useState<'apps' | 'playbook'>('apps');
  const [activeExIdx, setActiveExIdx] = useState<number>(0);
  const [visitedExIndices, setVisitedExIndices] = useState<Set<number>>(() => new Set([0]));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [notebookCompanionTab, setNotebookCompanionTab] = useState<'output' | 'assumptions'>('output');
  const [isNotebookCompanionOpen, setIsNotebookCompanionOpen] = useState<boolean>(true);

  const activeEx: HrArtifactExercise = HR_ARTIFACT_EXERCISES[activeExIdx] || HR_ARTIFACT_EXERCISES[0];
  const activePrompt = isFa ? activeEx.promptFa : activeEx.promptEn;
  const copyKey = `hr_artifact_prompt_${activeEx.id}`;
  const isCopied = copiedId === copyKey;

  const notebookOutputText = isFa
    ? HR_NOTEBOOKLM_COMPANION.simulatedOutputFa
    : HR_NOTEBOOKLM_COMPANION.simulatedOutputEn;
  const notebookPromptText = isFa
    ? HR_NOTEBOOKLM_COMPANION.extractionPromptFa
    : HR_NOTEBOOKLM_COMPANION.extractionPromptEn;
  const notebookAssumptions = isFa
    ? HR_NOTEBOOKLM_COMPANION.assumptionsFa
    : HR_NOTEBOOKLM_COMPANION.assumptionsEn;

  const steps: FocusedStepItem[] = HR_ARTIFACT_EXERCISES.map((ex) => ({
    id: ex.id,
    title: isFa ? ex.titleFa.replace(/^تمرین \d+:\s*/, '') : ex.titleEn.replace(/^Exercise \d+:\s*/, ''),
    category: isFa ? ex.badgeFa : ex.badgeEn
  }));

  const views: FocusedViewTab[] = [
    { id: 'apps', label: isFa ? 'کارگاه ۵ اپلیکیشن HR' : '5 HR Interactive Apps' },
    { id: 'playbook', label: isFa ? 'جریان ۳ مرحله‌ای و NotebookLM' : '3-Step Playbook & NotebookLM' }
  ];

  const boundary = getStepBoundaryState(activeExIdx, steps.length);

  const handleSelectStep = (idx: number) => {
    const nextIdx = clampStepIndex(idx, steps.length);
    setActiveExIdx(nextIdx);
    setVisitedExIndices((prev) => markStepVisited(prev, nextIdx));
  };

  return (
    <div data-testid="hr-artifacts-workshop">
      <FocusedLessonLayout
        lang={lang}
        moduleCode={isFa ? 'کارگاه HR' : 'HR Track'}
        moduleTitle={isFa ? HR_ARTIFACTS_WORKSHOP_HEADER.titleFa : HR_ARTIFACTS_WORKSHOP_HEADER.titleEn}
        moduleSubtitle={
          isFa
            ? 'ویژه واحد منابع انسانی، اداری و رفاهی · NotebookLM + Gemini Canvas + Claude Artifacts'
            : 'HR, Admin & Welfare Track · NotebookLM + Gemini Canvas + Claude Artifacts'
        }
        steps={steps}
        activeStepIndex={boundary.currentIndex}
        visitedStepIndices={visitedExIndices}
        onSelectStep={handleSelectStep}
        views={views}
        activeViewId={activeView}
        onSelectView={(v) => setActiveView(v as 'apps' | 'playbook')}
        isStepListVisible={activeView === 'apps'}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={setIsMobileDrawerOpen}
        sidebarTitleFa="۵ ابزار تعاملی منابع انسانی"
        sidebarTitleEn="5 HR Artifact Exercises"
        stepUnitFa="تمرین"
        stepUnitEn="exercises"
      >
        {activeView === 'apps' ? (
          <article className="space-y-6">
            {/* Step Header */}
            <header className="pb-4 border-b border-[var(--cpai-border)] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap tabular-nums">
                <span className="font-semibold text-[var(--cpai-primary-strong)]">
                  {isFa
                    ? `تمرین ${formatStepNumber(boundary.stepNumber, 'fa')} از ${formatStepNumber(boundary.totalSteps, 'fa')}`
                    : `Exercise ${boundary.stepNumber} of ${boundary.totalSteps}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{isFa ? activeEx.badgeFa : activeEx.badgeEn}</span>
                {activeEx.targetTools.map((tool, tIdx) => (
                  <React.Fragment key={tIdx}>
                    <span aria-hidden="true">·</span>
                    <span dir="ltr" className="font-mono text-[var(--cpai-text)]">
                      {tool}
                    </span>
                  </React.Fragment>
                ))}
              </div>
              <h3 className="text-lg sm:text-[22px] font-bold text-[var(--cpai-text)] leading-snug">
                {isFa ? activeEx.titleFa : activeEx.titleEn}
              </h3>
            </header>

            {/* Objective */}
            <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-4 sm:p-5 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--cpai-text)]">
              <strong className="font-semibold text-[var(--cpai-primary-strong)]">
                {isFa ? 'هدف تمرین: ' : 'Exercise Objective: '}
              </strong>
              <span>{isFa ? activeEx.objectiveFa : activeEx.objectiveEn}</span>
            </div>

            {/* Ready-to-Copy Prompt */}
            <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
              <div className="px-4 py-3 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--cpai-text)]">
                  <Sparkles className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                  <span>
                    {isFa
                      ? 'پرامپت آماده برای Claude Artifacts یا Gemini Canvas'
                      : 'Ready-to-Use Prompt for Claude Artifacts or Gemini Canvas'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onLoadToSandbox(activePrompt)}
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isFa ? 'ارسال به سندباکس' : 'Load to Sandbox'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(activePrompt, copyKey)}
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>
                      {isCopied
                        ? isFa
                          ? 'پرامپت کپی شد!'
                          : 'Copied!'
                        : isFa
                        ? 'کپی پرامپت ساخت ابزار'
                        : 'Copy Artifact Prompt'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[var(--cpai-code-bg)] max-h-80 overflow-y-auto">
                <pre
                  dir={isFa ? 'rtl' : 'ltr'}
                  className="text-xs font-mono text-[var(--cpai-code-text)] whitespace-pre-wrap leading-relaxed select-text text-right"
                >
                  {activePrompt}
                </pre>
              </div>
            </div>

            {/* Expected Output & Highlights */}
            <div className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--cpai-text)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                <span>
                  {isFa
                    ? 'خروجی مورد انتظار در محیط Artifact / Canvas'
                    : 'Expected Output in Artifact / Canvas'}
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-[var(--cpai-text)] leading-[1.8]">
                {isFa ? activeEx.expectedOutputFa : activeEx.expectedOutputEn}
              </p>
              <div className="pt-3 border-t border-[var(--cpai-border)] space-y-2">
                <div className="text-xs font-semibold text-[var(--cpai-muted)]">
                  {isFa ? 'ویژگی‌های کلیدی ابزار تولیدشده:' : 'Generated Tool Highlights:'}
                </div>
                <ul className="space-y-1.5 text-sm text-[var(--cpai-text)]">
                  {(isFa ? activeEx.keyHighlightsFa : activeEx.keyHighlightsEn).map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--cpai-primary)] mt-2 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Educational Takeaway */}
            <LessonTakeawayCallout
              lang={lang}
              labelFa="مهارت آموزشی برای تیم منابع انسانی و اداری"
              labelEn="Educational Takeaway for HR & Admin Teams"
              text={isFa ? activeEx.educationalTakeawayFa : activeEx.educationalTakeawayEn}
            />

            <FocusedLessonFooter
              lang={lang}
              boundary={boundary}
              onPrev={() => handleSelectStep(boundary.currentIndex - 1)}
              onNext={() => handleSelectStep(boundary.currentIndex + 1)}
              secondaryAction={{
                label: isFa ? 'مشاهده جریان ۳ مرحله‌ای و NotebookLM' : 'Open 3-Step Playbook & NotebookLM',
                onClick: () => setActiveView('playbook')
              }}
              prevLabelFa="تمرین قبلی"
              prevLabelEn="Previous exercise"
              nextLabelFa="تمرین بعدی"
              nextLabelEn="Next exercise"
              stepUnitFa="تمرین"
              stepUnitEn="Exercise"
            />
          </article>
        ) : (
          <div className="space-y-6">
            {/* Quick Links to External Tools */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--cpai-border)]">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--cpai-text)]">
                  {isFa
                    ? HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.titleFa
                    : HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.titleEn}
                </h3>
                <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.descriptionFa
                    : HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.descriptionEn}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://notebooklm.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                >
                  <span>1. NotebookLM</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                </a>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                >
                  <span>2. Gemini Canvas</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                </a>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                >
                  <span>3. Claude Artifacts</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                </a>
              </div>
            </div>

            {/* 3 Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {formatStepNumber(st.stepNumber, lang)}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--cpai-text)] leading-snug">
                      {isFa ? st.titleFa : st.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                    {isFa ? st.descriptionFa : st.descriptionEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Grounded NotebookLM Simulated Output + Assumptions Companion Pack */}
            <div
              data-testid="hr-notebooklm-companion-panel"
              className="rounded-[var(--cpai-radius)] bg-[var(--cpai-surface)] border border-[var(--cpai-border)] overflow-hidden"
            >
              <div className="px-4 py-3.5 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-wrap items-center justify-between gap-2.5">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] text-[11px] font-semibold">
                      {isFa ? HR_NOTEBOOKLM_COMPANION.badgeFa : HR_NOTEBOOKLM_COMPANION.badgeEn}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--cpai-text)]">
                      {isFa ? HR_NOTEBOOKLM_COMPANION.titleFa : HR_NOTEBOOKLM_COMPANION.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                    {isFa ? HR_NOTEBOOKLM_COMPANION.subtitleFa : HR_NOTEBOOKLM_COMPANION.subtitleEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotebookCompanionOpen((prev) => !prev)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-medium text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] transition-colors cursor-pointer shrink-0"
                >
                  {isNotebookCompanionOpen
                    ? isFa
                      ? 'جمع کردن پنل'
                      : 'Collapse'
                    : isFa
                    ? 'مشاهده خروجی و فرضیات'
                    : 'Expand Pack'}
                </button>
              </div>

              {isNotebookCompanionOpen && (
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="inline-flex items-center p-1 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)]">
                      <button
                        type="button"
                        data-testid="hr-nlm-tab-output"
                        onClick={() => setNotebookCompanionTab('output')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          notebookCompanionTab === 'output'
                            ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] shadow-2xs border border-[var(--cpai-border)]'
                            : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
                        }`}
                      >
                        {isFa
                          ? '۱. خروجی فرضی و مستند NotebookLM'
                          : '1. Simulated NotebookLM Output'}
                      </button>
                      <button
                        type="button"
                        data-testid="hr-nlm-tab-assumptions"
                        onClick={() => setNotebookCompanionTab('assumptions')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          notebookCompanionTab === 'assumptions'
                            ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] shadow-2xs border border-[var(--cpai-border)]'
                            : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
                        }`}
                      >
                        {isFa
                          ? '۲. فرضیات منابع و پرامپت استخراج'
                          : '2. Source Assumptions & Extraction Prompt'}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        data-testid="hr-nlm-copy-output-btn"
                        onClick={() => copyToClipboard(notebookOutputText, 'hr_nlm_simulated_output')}
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedId === 'hr_nlm_simulated_output' ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedId === 'hr_nlm_simulated_output'
                            ? isFa
                              ? 'خروجی کپی شد'
                              : 'Output Copied'
                            : isFa
                            ? 'کپی خروجی NotebookLM'
                            : 'Copy NotebookLM Output'}
                        </span>
                      </button>

                      <button
                        type="button"
                        data-testid="hr-nlm-copy-csv-btn"
                        onClick={() => copyToClipboard(HR_NOTEBOOKLM_COMPANION.sampleCsv, 'hr_nlm_sample_csv')}
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[var(--cpai-text)] text-xs font-medium transition-colors cursor-pointer"
                      >
                        {copiedId === 'hr_nlm_sample_csv' ? (
                          <Check className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                        ) : (
                          <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                        )}
                        <span>
                          {copiedId === 'hr_nlm_sample_csv'
                            ? isFa
                              ? 'CSV کپی شد'
                              : 'CSV Copied'
                            : isFa
                            ? 'کپی جدول CSV کارکرد'
                            : 'Copy Sample CSV'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {notebookCompanionTab === 'output' ? (
                    <div className="space-y-3">
                      <div
                        dir={isFa ? 'rtl' : 'ltr'}
                        className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] max-h-72 overflow-y-auto text-xs sm:text-sm leading-relaxed text-[var(--cpai-text)] whitespace-pre-wrap"
                      >
                        {notebookOutputText}
                      </div>
                      <div className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-border)] flex flex-wrap items-center justify-between gap-2.5 text-xs">
                        <span className="text-[var(--cpai-text)] leading-relaxed">
                          {isFa
                            ? 'مسیر سریع: خروجی NotebookLM و جدول CSV را کپی کنید، سپس به تب «کارگاه ۵ اپلیکیشن HR» بروید و پرامپت ابزار دلخواه را در Gemini Canvas یا Claude Artifacts اجرا کنید.'
                            : 'Fast Track: Copy the grounded output + sample CSV, then open the 5 HR Apps tab and run any exercise prompt.'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onLoadToSandbox(
                              `${notebookOutputText}\n\n--- CSV کارکرد نمونه ---\n${HR_NOTEBOOKLM_COMPANION.sampleCsv}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] font-semibold text-xs cursor-pointer whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isFa ? 'ارسال به سندباکس پرامپت' : 'Send to Sandbox'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {notebookAssumptions.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-[var(--cpai-text)]">
                                {item.title}
                              </span>
                              <span
                                dir="ltr"
                                className="px-2 py-0.5 rounded bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-primary-strong)] font-mono text-[10px] font-semibold shrink-0"
                              >
                                {item.sourceTag}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
                        <div className="px-4 py-2.5 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-[var(--cpai-text)] flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                            <span>
                              {isFa
                                ? 'پرامپت آماده استخراج قواعد در NotebookLM (گام ۱)'
                                : 'Ready-to-Use NotebookLM Extraction Prompt (Step 1)'}
                            </span>
                          </span>
                          <button
                            type="button"
                            data-testid="hr-nlm-copy-prompt-btn"
                            onClick={() => copyToClipboard(notebookPromptText, 'hr_nlm_extraction_prompt')}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                          >
                            {copiedId === 'hr_nlm_extraction_prompt' ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>
                              {copiedId === 'hr_nlm_extraction_prompt'
                                ? isFa
                                  ? 'کپی شد'
                                  : 'Copied'
                                : isFa
                                ? 'کپی پرامپت گام ۱'
                                : 'Copy Step-1 Prompt'}
                            </span>
                          </button>
                        </div>
                        <pre
                          dir={isFa ? 'rtl' : 'ltr'}
                          className="p-4 bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] text-xs leading-relaxed whitespace-pre-wrap font-mono"
                        >
                          {notebookPromptText}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveView('apps')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>{isFa ? 'شروع کارگاه ۵ اپلیکیشن HR' : 'Start 5 HR Interactive Apps'}</span>
              </button>
            </div>
          </div>
        )}
      </FocusedLessonLayout>
    </div>
  );
};
