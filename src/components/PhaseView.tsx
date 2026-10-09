import React, { useState } from 'react';
import {
  PhaseId,
  Language,
  Phase1Worksheet,
  Phase2Worksheet,
  Phase3Worksheet,
  Phase4Worksheet,
  Phase5Worksheet,
  Phase6Worksheet
} from '../types/cpmai';
import { PHASES_DATA } from '../data/cpmaiPhases';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  Copy,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface PhaseViewProps {
  phaseId: PhaseId;
  lang: Language;
  readChecked: boolean;
  onToggleRead: (checked: boolean) => void;
  showExample: boolean;
  onToggleExample: () => void;
  quizAnswers: Record<number, number>;
  onSelectQuizAnswer: (questionIndex: number, optionIndex: number) => void;
  p1: Phase1Worksheet;
  setP1: React.Dispatch<React.SetStateAction<Phase1Worksheet>>;
  p2: Phase2Worksheet;
  setP2: React.Dispatch<React.SetStateAction<Phase2Worksheet>>;
  p3: Phase3Worksheet;
  setP3: React.Dispatch<React.SetStateAction<Phase3Worksheet>>;
  p4: Phase4Worksheet;
  setP4: React.Dispatch<React.SetStateAction<Phase4Worksheet>>;
  p5: Phase5Worksheet;
  setP5: React.Dispatch<React.SetStateAction<Phase5Worksheet>>;
  p6: Phase6Worksheet;
  setP6: React.Dispatch<React.SetStateAction<Phase6Worksheet>>;
  onResetPhase: () => void;
  onNavigatePhase: (id: PhaseId) => void;
}

export const PhaseView: React.FC<PhaseViewProps> = ({
  phaseId,
  lang,
  readChecked,
  onToggleRead,
  showExample,
  onToggleExample,
  quizAnswers,
  onSelectQuizAnswer,
  p1,
  setP1,
  p2,
  setP2,
  p3,
  setP3,
  p4,
  setP4,
  p5,
  setP5,
  p6,
  setP6,
  onResetPhase,
  onNavigatePhase
}) => {
  const content = PHASES_DATA[lang][phaseId];
  const t = UI_TRANSLATIONS[lang];
  const [toastMessage, setToastMessage] = useState<string>('');

  // Temporary input buffers for adding list items
  const [newQuestionInput, setNewQuestionInput] = useState('');
  const [newSourceInput, setNewSourceInput] = useState({ source: '', format: '', volume: '', status: '' });
  const [newQualityDefectInput, setNewQualityDefectInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState({ feature: '', logic: '' });
  const [newMetricInput, setNewMetricInput] = useState({ metric: '', target: '', achieved: '' });
  const [newDriftTriggerInput, setNewDriftTriggerInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Copy phase summary to clipboard
  const handleCopySummary = () => {
    let text = `${content.title} (${content.roman})\n`;
    text += `${content.taskGroup}\n\n`;

    if (phaseId === 1) {
      text += `--- Page 1: Determine Business Objectives ---\n`;
      text += `User Story: ${p1.userStory}\n`;
      text += `Background: ${p1.background}\n`;
      text += `Primary Objective: ${p1.primaryObjective}\n`;
      text += `Cognitive Pattern: ${p1.cognitivePattern}\n`;
      text += `Success Criteria: ${p1.businessSuccessCriteria}\n`;
      text += `Related Questions:\n${p1.relatedQuestions.map((q, i) => `  ${i + 1}. ${q}`).join('\n')}\n\n`;
      text += `--- Page 2: What problem are you solving with AI in this iteration? ---\n`;
      text += `Problem Statement: ${p1.problemDef?.problemStatement || 'N/A'}\n`;
      text += `Why AI (vs Traditional): ${p1.problemDef?.whyAiNotTraditional || 'N/A'}\n`;
      text += `Current State: ${p1.problemDef?.currentState || 'N/A'}\n`;
      text += `Desired Future State: ${p1.problemDef?.futureState || 'N/A'}\n`;
      text += `In-Scope: ${p1.problemDef?.inScope || 'N/A'}\n`;
      text += `Out-of-Scope: ${p1.problemDef?.outOfScope || 'N/A'}\n`;
      if (p1.problemDef?.canvasNotes) {
        text += `Canvas & Workshop Notes: ${p1.problemDef.canvasNotes}\n`;
      }
    } else if (phaseId === 2) {
      text += `Data Characteristics:\n${p2.dataCharacteristics}\n`;
      text += `Governance & Ethics:\n${p2.governanceAndEthics}\n`;
      text += `Data Sources:\n${p2.dataSources.map(s => `  - ${s.source} (${s.format}, ${s.volume}) - ${s.status}`).join('\n')}\n`;
      text += `Quality Deficiencies:\n${p2.qualityDeficiencies.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}\n`;
    } else if (phaseId === 3) {
      text += `Inclusion Criteria:\n${p3.inclusionCriteria}\n`;
      text += `Cleaning Plan:\n${p3.cleaningPlan}\n`;
      text += `Partition Split: ${p3.partitioningSplit}\n`;
      text += `Data Leakage Mitigation:\n${p3.leakageMitigation}\n`;
      text += `Engineered Features:\n${p3.engineeredFeatures.map(f => `  - ${f.feature}: ${f.logic}`).join('\n')}\n`;
    } else if (phaseId === 4) {
      text += `Chosen Algorithm: ${p4.chosenAlgorithm}\n`;
      text += `Baseline Model: ${p4.baselineComparison}\n`;
      text += `Validation Strategy: ${p4.validationStrategy}\n`;
      text += `Hyperparameter Notes: ${p4.hyperparameterNotes}\n`;
      text += `Metrics:\n${p4.evaluationMetrics.map(m => `  - ${m.metric}: Target=${m.target}, Achieved=${m.achieved}`).join('\n')}\n`;
    } else if (phaseId === 5) {
      text += `KPI Comparison: ${p5.kpiComparisonResult}\n`;
      text += `Ethical Audit: ${p5.ethicalAndBiasFindings}\n`;
      text += `Explainability: ${p5.explainabilityAssessment}\n`;
      text += `Gate Decision: ${p5.nextStepDecision}\n`;
      text += `Rationale: ${p5.decisionRationale}\n`;
    } else if (phaseId === 6) {
      text += `Deployment Architecture:\n${p6.deploymentArchitecture}\n`;
      text += `Monitoring Strategy:\n${p6.monitoringStrategy}\n`;
      text += `Rollback Plan:\n${p6.rollbackPlan}\n`;
      text += `Runbook Owner: ${p6.operationalRunbookOwner}\n`;
      text += `Drift Triggers:\n${p6.driftTriggers.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}\n`;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(t.copiedToast);
      }).catch(() => {
        showToast('Unable to access clipboard');
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Phase Title Header */}
      <div className="border-b border-[#d9dad5] dark:border-[#2d3942] pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-7 rounded-xs bg-[#1f5163] dark:bg-[#6fb3c6]" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] font-serif-heading">
            {content.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-medium text-[#1f5163] dark:text-[#6fb3c6] mb-1">
          {content.taskGroup}
        </p>
        <p className="text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          {content.lede}
        </p>
      </div>

      {/* SECTION 1: Read Overview */}
      <section id="s-read" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] font-serif-heading">
            {content.readHeading}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mb-4">
          {content.readSubheading}
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none text-[#1c2830] dark:text-[#e8ebe9] space-y-3 leading-relaxed">
          {content.readingParagraphs.map((paragraph, idx) => (
            <p key={idx} className="bg-[#ffffff]/50 dark:bg-[#1a2228]/50 p-4 rounded-lg border border-[#d9dad5] dark:border-[#2d3942]">
              {paragraph}
            </p>
          ))}
        </div>

        <label className="flex items-center gap-2.5 mt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={readChecked}
            onChange={(e) => onToggleRead(e.target.checked)}
            className="w-5 h-5 rounded border-[#d9dad5] dark:border-[#2d3942] text-[#1f5163] focus:ring-[#2a6f97]"
          />
          <span className="text-sm font-medium text-[#1c2830] dark:text-[#e8ebe9]">
            {t.readCheckbox}
          </span>
        </label>
      </section>

      {/* SECTION 2: Subtask Description & Artifacts */}
      <section id="s-sub" className="scroll-mt-20">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] font-serif-heading mb-1">
          {content.subtaskHeading}
        </h3>
        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mb-4">
          {content.subtaskSubheading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Description Box */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] border-t-3 border-t-[#1f5163] dark:border-t-[#6fb3c6]">
            <h4 className="font-semibold text-sm text-[#1c2830] dark:text-[#e8ebe9] mb-3">
              {lang === 'fa' ? 'شرح وظایف کلیدی' : 'Key Responsibilities'}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {content.descriptionPoints.map((point, idx) => (
                <p key={idx}>{point}</p>
              ))}
            </div>
          </div>

          {/* Artifacts Box */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] border-t-3 border-t-[#1f5163] dark:border-t-[#6fb3c6]">
            <h4 className="font-semibold text-sm text-[#1c2830] dark:text-[#e8ebe9] mb-3">
              {content.artifactsHeading}
            </h4>
            <div className="space-y-3">
              {content.artifacts.map((art, idx) => (
                <div key={idx} className="text-xs sm:text-sm">
                  <span className="font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
                    {art.chip}:{' '}
                  </span>
                  <span className="text-[#1c2830] dark:text-[#e8ebe9] font-medium">
                    {art.title} –{' '}
                  </span>
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                    {art.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Worksheet Interactive Artifacts */}
      <section id="s-work" className="scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] font-serif-heading">
              {content.worksheetHeading}
            </h3>
            <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0]">
              {content.worksheetSubheading}
            </p>
          </div>

          {/* Example Toggle Button */}
          <button
            onClick={onToggleExample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1f5163] dark:text-[#6fb3c6] hover:border-[#1f5163] transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showExample ? t.exHide : t.exShow}</span>
          </button>
        </div>

        {/* Guided Example Callout */}
        {showExample && (
          <div className="mb-6 p-4 rounded-lg bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 dark:border-[#6fb3c6]/20 text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
            <div className="flex items-center gap-2 mb-2 font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
              <Lightbulb className="w-4 h-4" />
              <span>{content.example.title}</span>
            </div>
            <p className="mb-1 font-medium">{content.example.primary}</p>
            <p className="mb-3 text-[#5d6b73] dark:text-[#9aa8b0]">{content.example.secondary}</p>
            <ul className="space-y-1 list-disc list-inside text-xs">
              {content.example.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Custom Worksheet Content Based on Active Phase */}
        <div className="space-y-5 bg-[#ffffff] dark:bg-[#1a2228] p-5 sm:p-6 rounded-lg border border-[#d9dad5] dark:border-[#2d3942]">
          {/* PHASE 1 WORKSHEET */}
          {phaseId === 1 && (
            <div className="space-y-6">
              {/* Page 1 vs Page 2 Tab Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setP1(prev => ({ ...prev, activeSubPage: 1 }))}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                      p1.activeSubPage !== 2
                        ? 'bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] font-semibold'
                        : 'bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                    }`}
                  >
                    {t.p1SubPage1}
                  </button>
                  <button
                    type="button"
                    onClick={() => setP1(prev => ({ ...prev, activeSubPage: 2 }))}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                      p1.activeSubPage === 2
                        ? 'bg-[#0a7b97] text-white font-semibold shadow-xs'
                        : 'bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                    }`}
                  >
                    {t.p1SubPage2}
                  </button>
                </div>

                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {p1.activeSubPage === 2 ? '2 / 2' : '1 / 2'}
                </span>
              </div>

              {/* SUB-PAGE 1: Objectives & User Story */}
              {p1.activeSubPage !== 2 ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'داستان کاربر اسپرینت (Sprint User Story)' : 'Sprint User Story'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'به‌عنوان [نقش]، می‌خواهم [هدف] تا [فایده و ارزش کسب‌وکار].'
                        : 'As a [role], I want [goal] so that [business value].'}
                    </p>
                    <input
                      type="text"
                      value={p1.userStory}
                      onChange={(e) => setP1(prev => ({ ...prev, userStory: e.target.value }))}
                      placeholder={lang === 'fa' ? 'به‌عنوان مدیر ارتباط با مشتری، می‌خواهم...' : 'As a Retention Manager, I want...'}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'پس‌زمینه کسب‌وکار سازمان (Background)' : 'Organization Background'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'وضعیت فعلی سازمان در شروع پروژه چیست؟ چه چالش‌هایی وجود دارد؟'
                        : 'What is currently known about the business situation at project kickoff?'}
                    </p>
                    <textarea
                      rows={3}
                      value={p1.background}
                      onChange={(e) => setP1(prev => ({ ...prev, background: e.target.value }))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'هدف اصلی کسب‌وکار (Primary Business Objective)' : 'Primary Business Objective'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'یک جمله شفاف از دیدگاه کسب‌وکار (نه نام الگوریتم‌های هوش مصنوعی).'
                        : 'One precise sentence from the business point of view, not the technology.'}
                    </p>
                    <input
                      type="text"
                      value={p1.primaryObjective}
                      onChange={(e) => setP1(prev => ({ ...prev, primaryObjective: e.target.value }))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
                    />
                  </div>

                  {/* Cognitive Pattern Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'الگوی شناختی هوش مصنوعی (Cognitive Pattern)' : 'Cognitive AI Pattern'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'مسئله کسب‌وکار به کدام یک از الگوهای هفت‌گانه هوش مصنوعی CPMAI نگاشت می‌شود؟'
                        : 'Which of the 7 Cognitive AI Patterns applies to this business goal?'}
                    </p>
                    <select
                      value={p1.cognitivePattern}
                      onChange={(e) => setP1(prev => ({ ...prev, cognitivePattern: e.target.value }))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                    >
                      <option value="">{lang === 'fa' ? '-- انتخاب الگوی شناختی --' : '-- Select Cognitive Pattern --'}</option>
                      {t.cognitivePatterns.map(cp => (
                        <option key={cp.key} value={cp.key}>
                          {cp.label} - {cp.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Success Criteria */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'معیارهای موفقیت کسب‌وکار (Success Criteria / ROI)' : 'Business Success Criteria & ROI'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'شاخص‌های ملموس تحقق ارزش (مانند: ۱۰ درصد کاهش ریزش، ۳۵ درصد کاهش هزینه عملیاتی).'
                        : 'Measurable organizational metrics determining project success.'}
                    </p>
                    <input
                      type="text"
                      value={p1.businessSuccessCriteria}
                      onChange={(e) => setP1(prev => ({ ...prev, businessSuccessCriteria: e.target.value }))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                    />
                  </div>

                  {/* Related Business Questions Dynamic List */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                      {lang === 'fa' ? 'پرسش‌های کسب‌وکاری مرتبط (Related Business Questions)' : 'Related Business Questions'}
                    </label>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                      {lang === 'fa'
                        ? 'مشتری یا ذی‌نفعان می‌خواهند به چه سوالات فرعی دیگری پاسخ داده شود؟'
                        : 'List each specific question the business stakeholder wants addressed.'}
                    </p>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newQuestionInput}
                        onChange={(e) => setNewQuestionInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newQuestionInput.trim()) {
                              setP1(prev => ({ ...prev, relatedQuestions: [...prev.relatedQuestions, newQuestionInput.trim()] }));
                              setNewQuestionInput('');
                            }
                          }
                        }}
                        placeholder={lang === 'fa' ? 'یک پرسش بنویسید و افزودن را بزنید...' : 'Type a question and click Add...'}
                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newQuestionInput.trim()) {
                            setP1(prev => ({ ...prev, relatedQuestions: [...prev.relatedQuestions, newQuestionInput.trim()] }));
                            setNewQuestionInput('');
                          }
                        }}
                        className="px-4 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90"
                      >
                        {t.addBtn}
                      </button>
                    </div>

                    <ul className="space-y-2">
                      {p1.relatedQuestions.map((q, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-xs sm:text-sm">
                          <span className="font-semibold text-[#1f5163] dark:text-[#6fb3c6] shrink-0">
                            {idx + 1}.
                          </span>
                          <span className="flex-1 text-[#1c2830] dark:text-[#e8ebe9]">{q}</span>
                          <button
                            type="button"
                            onClick={() => setP1(prev => ({ ...prev, relatedQuestions: prev.relatedQuestions.filter((_, i) => i !== idx) }))}
                            className="text-[#b3432f] hover:opacity-80 p-1"
                            title={t.rmBtn}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Page Button */}
                  <div className="pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setP1(prev => ({ ...prev, activeSubPage: 2 }));
                        const el = document.getElementById('s-work');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#0a7b97] text-white hover:opacity-90 transition-opacity shadow-xs"
                    >
                      <span>{t.nextPage}: {t.p1SubPage2}</span>
                      {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                /* SUB-PAGE 2: What problem are you solving with AI in this iteration? */
                <div className="space-y-6">
                  {/* Slide Container (matching the user's uploaded slide photo) */}
                  <div className="rounded-xl border border-[#0a7b97]/40 dark:border-[#6fb3c6]/40 overflow-hidden shadow-xs bg-[#f0f4fb] dark:bg-[#15202a] relative">
                    {/* Top Slide Header */}
                    <div className="bg-[#0a7b97] px-5 py-3 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4" />
                        <h4 className="font-semibold text-sm sm:text-base tracking-tight" dir="ltr">
                          What problem are you solving with AI in this iteration?
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono opacity-85 px-2 py-0.5 rounded bg-black/20">
                        CPMAI Phase I · Page 2
                      </span>
                    </div>

                    {/* Slide Workspace Body */}
                    <div className="p-5 sm:p-7 space-y-6">
                      <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                        {t.problemSlideSubtitle}
                      </p>

                      {/* 1. Problem Statement */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                          1. {t.problemStatementLabel}
                        </label>
                        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                          {t.problemStatementHint}
                        </p>
                        <textarea
                          rows={3}
                          value={p1.problemDef?.problemStatement || ''}
                          onChange={(e) => setP1(prev => ({
                            ...prev,
                            problemDef: { ...prev.problemDef, problemStatement: e.target.value }
                          }))}
                          placeholder={lang === 'fa' ? 'مثال: نرخ بالای خروج مشتریان ارزشمند بدون شناسایی به‌موقع الگوهای رفتاری...' : 'e.g. Inability to identify at-risk checking account customers before they initiate competitor fund transfers...'}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#0a7b97]"
                        />
                      </div>

                      {/* 2. Why AI vs Traditional */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                          2. {t.whyAiLabel}
                        </label>
                        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                          {t.whyAiHint}
                        </p>
                        <textarea
                          rows={2}
                          value={p1.problemDef?.whyAiNotTraditional || ''}
                          onChange={(e) => setP1(prev => ({
                            ...prev,
                            problemDef: { ...prev.problemDef, whyAiNotTraditional: e.target.value }
                          }))}
                          placeholder={lang === 'fa' ? 'مثال: رفتار مشتریان غیرخطی و چندمتغیره است و قوانین شرطی ایستا (If-Then) تغییرات تدریجی رفتار را پوشش نمی‌دهند...' : 'e.g. Churn signals involve complex multi-variable interactions (login velocity, transaction dips, CRM sentiment) that static If-Then rules fail to detect...'}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#0a7b97]"
                        />
                      </div>

                      {/* 3. Current State vs Future State (2 Columns) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
                          <label className="block text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                            3.1. {t.currentStateLabel}
                          </label>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                            {t.currentStateHint}
                          </p>
                          <textarea
                            rows={3}
                            value={p1.problemDef?.currentState || ''}
                            onChange={(e) => setP1(prev => ({
                              ...prev,
                              problemDef: { ...prev.problemDef, currentState: e.target.value }
                            }))}
                            placeholder={lang === 'fa' ? 'شعبه تنها پس از ثبت درخواست بستن حساب مطلع می‌شود که برای حفظ مشتری دیر است.' : 'Currently, branches only discover customer churn after an account closure request is lodged.'}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                          />
                        </div>

                        <div className="p-3.5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
                          <label className="block text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                            3.2. {t.futureStateLabel}
                          </label>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                            {t.futureStateHint}
                          </p>
                          <textarea
                            rows={3}
                            value={p1.problemDef?.futureState || ''}
                            onChange={(e) => setP1(prev => ({
                              ...prev,
                              problemDef: { ...prev.problemDef, futureState: e.target.value }
                            }))}
                            placeholder={lang === 'fa' ? 'پیش‌بینی با احتمال بیش از ۷۰٪ ریزش، ۳۰ روز قبل از وقوع رویداد به کارشناس شعبه ارجاع می‌شود.' : 'Early prediction score generates proactive retention alert 30 days prior to departure.'}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                          />
                        </div>
                      </div>

                      {/* 4. In-Scope vs Out-of-Scope (2 Columns) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
                          <label className="block text-xs font-semibold text-[#2f7d5b] dark:text-[#63c496] mb-1">
                            4.1. {t.inScopeLabel}
                          </label>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                            {t.inScopeHint}
                          </p>
                          <textarea
                            rows={3}
                            value={p1.problemDef?.inScope || ''}
                            onChange={(e) => setP1(prev => ({
                              ...prev,
                              problemDef: { ...prev.problemDef, inScope: e.target.value }
                            }))}
                            placeholder={lang === 'fa' ? 'صرفاً پیش‌بینی ریزش مشتریان حقیقی حساب جاری با موجودی بالای ۱۰ میلیون تومان.' : 'Exclusively individual retail checking account churn prediction.'}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                          />
                        </div>

                        <div className="p-3.5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
                          <label className="block text-xs font-semibold text-[#b3432f] dark:text-[#ee8f7a] mb-1">
                            4.2. {t.outOfScopeLabel}
                          </label>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                            {t.outOfScopeHint}
                          </p>
                          <textarea
                            rows={3}
                            value={p1.problemDef?.outOfScope || ''}
                            onChange={(e) => setP1(prev => ({
                              ...prev,
                              problemDef: { ...prev.problemDef, outOfScope: e.target.value }
                            }))}
                            placeholder={lang === 'fa' ? 'حساب‌های حقوقی، ارسال خودکار تخفیف و پیشنهادها، کارت‌های اعتباری (موکول به اسپرینت‌های بعد).' : 'Corporate accounts, automated messaging bots, credit card accounts (deferred).'}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                          />
                        </div>
                      </div>

                      {/* 5. Feasibility Checks Matrix */}
                      <div className="p-4 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]">
                        <h5 className="text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-3">
                          5. {t.aiFeasibilityCheckLabel}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p1.problemDef?.aiFeasibilityChecks?.hasData || false}
                              onChange={(e) => setP1(prev => ({
                                ...prev,
                                problemDef: {
                                  ...prev.problemDef,
                                  aiFeasibilityChecks: {
                                    ...prev.problemDef?.aiFeasibilityChecks,
                                    hasData: e.target.checked
                                  }
                                }
                              }))}
                              className="mt-0.5 rounded border-[#d9dad5] text-[#0a7b97] focus:ring-[#0a7b97]"
                            />
                            <span>{t.checkHasData}</span>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p1.problemDef?.aiFeasibilityChecks?.toleratesUncertainty || false}
                              onChange={(e) => setP1(prev => ({
                                ...prev,
                                problemDef: {
                                  ...prev.problemDef,
                                  aiFeasibilityChecks: {
                                    ...prev.problemDef?.aiFeasibilityChecks,
                                    toleratesUncertainty: e.target.checked
                                  }
                                }
                              }))}
                              className="mt-0.5 rounded border-[#d9dad5] text-[#0a7b97] focus:ring-[#0a7b97]"
                            />
                            <span>{t.checkUncertainty}</span>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p1.problemDef?.aiFeasibilityChecks?.clearBusinessImpact || false}
                              onChange={(e) => setP1(prev => ({
                                ...prev,
                                problemDef: {
                                  ...prev.problemDef,
                                  aiFeasibilityChecks: {
                                    ...prev.problemDef?.aiFeasibilityChecks,
                                    clearBusinessImpact: e.target.checked
                                  }
                                }
                              }))}
                              className="mt-0.5 rounded border-[#d9dad5] text-[#0a7b97] focus:ring-[#0a7b97]"
                            />
                            <span>{t.checkImpact}</span>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p1.problemDef?.aiFeasibilityChecks?.cognitiveTaskFeasible || false}
                              onChange={(e) => setP1(prev => ({
                                ...prev,
                                problemDef: {
                                  ...prev.problemDef,
                                  aiFeasibilityChecks: {
                                    ...prev.problemDef?.aiFeasibilityChecks,
                                    cognitiveTaskFeasible: e.target.checked
                                  }
                                }
                              }))}
                              className="mt-0.5 rounded border-[#d9dad5] text-[#0a7b97] focus:ring-[#0a7b97]"
                            />
                            <span>{t.checkCognitive}</span>
                          </label>
                        </div>
                      </div>

                      {/* 6. Worksheet Canvas / Freeform Notes (Authentic slide box matching user screenshot) */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
                            6. {t.canvasNotesLabel}
                          </label>
                          <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                            {lang === 'fa' ? 'فضای آزاد بوم کارگاهی' : 'Workshop Freeform Canvas'}
                          </span>
                        </div>
                        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                          {t.canvasNotesHint}
                        </p>
                        <div className="relative">
                          <textarea
                            rows={6}
                            value={p1.problemDef?.canvasNotes || ''}
                            onChange={(e) => setP1(prev => ({
                              ...prev,
                              problemDef: { ...prev.problemDef, canvasNotes: e.target.value }
                            }))}
                            placeholder={lang === 'fa' ? 'یادداشت‌های آزاد، صورت‌جلسه توافق با ذی‌نفعان، فرضیات اولیه یا چارچوب‌بندی مسئله در این تکرار...' : 'Draft freeform notes, stakeholder workshop takeaways, hypotheses, or synthesis for this iteration...'}
                            className="w-full p-4 text-xs sm:text-sm rounded-lg border border-[#0a7b97]/30 dark:border-[#6fb3c6]/30 bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#0a7b97] leading-relaxed"
                          />
                          {/* Geometric triangle pattern accent in corner (matching CPMAI slide footer watermark) */}
                          <div className="absolute bottom-3 end-3 pointer-events-none opacity-20 dark:opacity-10 text-[#0a7b97] dark:text-[#6fb3c6]">
                            <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                              <polygon points="40,30 20,30 40,10" />
                              <polygon points="30,30 10,30 30,10" />
                              <polygon points="20,30 0,30 20,10" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Quick-fill Example Button for Page 2 */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]">
                        <button
                          type="button"
                          onClick={() => {
                            setP1(prev => ({
                              ...prev,
                              problemDef: {
                                problemStatement: lang === 'fa'
                                  ? 'بانک ماهانه ۱.۲٪ از مشتریان سپرده‌گذار باارزش خود را به دلیل مهاجرت به نئوبانک‌ها از دست می‌دهد و شعب پیش از انصراف کامل مشتری هیچ بینشی برای اقدام ندارند.'
                                  : 'The bank loses 1.2% of high-value deposit holders monthly to digital neo-banks, and branch managers have zero visibility into retention risk prior to customer departure.',
                                whyAiNotTraditional: lang === 'fa'
                                  ? 'قوانین سنتی شرطی (If-Then) تنها کاهش مانده پس از خروج پول را نشان می‌دهند، اما الگوی رفتار پیش از خروج ترکیبی پیچیده از افت دفعات ورود، کاهش پرداخت‌های اینترنتی و تغییر الگوی تراکنش است که نیازمند مدل طبقه‌بندی احتمالاتی است.'
                                  : 'Heuristic rules only fire after balances drop; however, early signals comprise nuanced multi-factor shifts across login velocities, bill payments, and sentiment that demand probabilistic classification.',
                                currentState: lang === 'fa'
                                  ? 'فرآیند منفعل: کارشناسان شعبه تنها هنگام ثبت درخواست بستن حساب تماس می‌گیرند که نرخ ماندگاری آن زیر ۵٪ است.'
                                  : 'Passive recovery: Branch relationship managers only reach out upon formal account cancellation notice, yielding <5% retention.',
                                futureState: lang === 'fa'
                                  ? 'مدل هوش مصنوعی هر هفته ۳۰ روز قبل از خروج احتمالی، کارت امتیازی ریسک ریزش را به همراه علل کلیدی به داشبورد CRM شعبه تزریق می‌کند.'
                                  : 'A weekly cognitive scoring job flags at-risk accounts 30 days ahead with top risk factors directly embedded into CRM dashboards.',
                                inScope: lang === 'fa'
                                  ? 'مشتریان حقیقی، حساب‌های جاری با موجودی بالای ۱۰ میلیون تومان، تاریخچه تراکنش‌های ۲۴ ماه اخیر.'
                                  : 'Individual retail checking accounts with balances > $10K, evaluating 24-month historical transaction patterns.',
                                outOfScope: lang === 'fa'
                                  ? 'حساب‌های حقوقی و تجاری، پیشنهادهای خودکار پاداش، تحلیل داده‌های صوتی مرکز تماس (موکول به اسپرینت‌های آینده).'
                                  : 'Commercial business accounts, automated reward fulfillment, and call audio analytics (deferred to Sprint 2 & 3).',
                                aiFeasibilityChecks: {
                                  hasData: true,
                                  toleratesUncertainty: true,
                                  clearBusinessImpact: true,
                                  cognitiveTaskFeasible: true
                                },
                                canvasNotes: lang === 'fa'
                                  ? 'توافق کارگاهی با معاونت بازاریابی و امور شعب: اسپرینت جاری بر پیش‌بینی تمرکز دارد. اقدام نگهداشت توسط متصدی شعبه انجام می‌شود.'
                                  : 'Workshop consensus: Focus Sprint 1 strictly on predictive classification. Proactive retention calls remain human-in-the-loop.'
                              }
                            }));
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#0a7b97] text-[#0a7b97] dark:text-[#6fb3c6] dark:border-[#6fb3c6] hover:bg-[#0a7b97]/10 transition-colors"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'پر کردن خودکار نمونه راهنما (مطالعه موردی بانکداری)' : 'Quick-fill Guided Case Study'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setP1(prev => ({ ...prev, activeSubPage: 1 }));
                            const el = document.getElementById('s-work');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#ffffff] dark:hover:bg-[#1a2228]"
                        >
                          {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                          <span>{t.prevPage}: {t.p1SubPage1}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PHASE 2 WORKSHEET */}
          {phaseId === 2 && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'فهرست منابع داده (Data Sources Inventory)' : 'Data Sources Inventory'}
                </label>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-3">
                  {lang === 'fa'
                    ? 'منابع داده، قالب ذخیره‌سازی، حجم تخمینی و وضعیت دسترسی را ثبت کنید.'
                    : 'Catalog data origins, file/DB format, record count, and access rights.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'نام منبع (مثال: CRM)' : 'Source (e.g. CRM DB)'}
                    value={newSourceInput.source}
                    onChange={(e) => setNewSourceInput(prev => ({ ...prev, source: e.target.value }))}
                    className="px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'قالب (مثال: PostgreSQL)' : 'Format (e.g. Parquet)'}
                    value={newSourceInput.format}
                    onChange={(e) => setNewSourceInput(prev => ({ ...prev, format: e.target.value }))}
                    className="px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'حجم (مثال: ۲ میلیون رکورد)' : 'Volume (e.g. 2M rows)'}
                    value={newSourceInput.volume}
                    onChange={(e) => setNewSourceInput(prev => ({ ...prev, volume: e.target.value }))}
                    className="px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={lang === 'fa' ? 'وضعیت (آماده/نیاز به مجوز)' : 'Status'}
                      value={newSourceInput.status}
                      onChange={(e) => setNewSourceInput(prev => ({ ...prev, status: e.target.value }))}
                      className="flex-1 px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSourceInput.source.trim()) {
                          setP2(prev => ({ ...prev, dataSources: [...prev.dataSources, { ...newSourceInput }] }));
                          setNewSourceInput({ source: '', format: '', volume: '', status: '' });
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]"
                    >
                      {t.addBtn}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {p2.dataSources.map((ds, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                        <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">{ds.source}</span>
                        <span className="text-[#5d6b73] dark:text-[#9aa8b0]">{ds.format}</span>
                        <span className="text-[#5d6b73] dark:text-[#9aa8b0]">{ds.volume}</span>
                        <span className="text-[#1f5163] dark:text-[#6fb3c6]">{ds.status}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setP2(prev => ({ ...prev, dataSources: prev.dataSources.filter((_, i) => i !== idx) }))}
                        className="text-[#b3432f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'یافته‌های کاوش و ویژگی‌های داده (Data Exploration)' : 'Exploration & Data Characteristics'}
                </label>
                <textarea
                  rows={3}
                  value={p2.dataCharacteristics}
                  onChange={(e) => setP2(prev => ({ ...prev, dataCharacteristics: e.target.value }))}
                  placeholder={lang === 'fa' ? 'توزیع متغیرها، مقادیر پرت، همبستگی‌ها...' : 'Distributions, correlations, skew...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              {/* Quality Deficiencies */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'کاستی‌ها و نقایص کیفی داده (Quality Deficiencies & Bias Risks)' : 'Quality Deficiencies & Bias'}
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newQualityDefectInput}
                    onChange={(e) => setNewQualityDefectInput(e.target.value)}
                    placeholder={lang === 'fa' ? 'مثال: نقص در ثبت متغیر سن یا عدم تعادل کلاس‌ها...' : 'e.g. 15% null values in income...'}
                    className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newQualityDefectInput.trim()) {
                        setP2(prev => ({ ...prev, qualityDeficiencies: [...prev.qualityDeficiencies, newQualityDefectInput.trim()] }));
                        setNewQualityDefectInput('');
                      }
                    }}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]"
                  >
                    {t.addBtn}
                  </button>
                </div>
                <ul className="space-y-1.5">
                  {p2.qualityDeficiencies.map((d, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
                      <span>• {d}</span>
                      <button
                        type="button"
                        onClick={() => setP2(prev => ({ ...prev, qualityDeficiencies: prev.qualityDeficiencies.filter((_, i) => i !== idx) }))}
                        className="text-[#b3432f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'حاکمیت داده، حریم خصوصی و اخلاق (Governance & Privacy)' : 'Data Governance & Privacy'}
                </label>
                <input
                  type="text"
                  value={p2.governanceAndEthics}
                  onChange={(e) => setP2(prev => ({ ...prev, governanceAndEthics: e.target.value }))}
                  placeholder={lang === 'fa' ? 'ضوابط محرمانگی، رضایت کاربران، تفکیک داده‌های هویتی...' : 'Compliance with GDPR, anonymization...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>
            </>
          )}

          {/* PHASE 3 WORKSHEET */}
          {phaseId === 3 && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'معیار شمول و حذف داده‌ها (Inclusion & Exclusion Criteria)' : 'Inclusion & Exclusion Criteria'}
                </label>
                <textarea
                  rows={2}
                  value={p3.inclusionCriteria}
                  onChange={(e) => setP3(prev => ({ ...prev, inclusionCriteria: e.target.value }))}
                  placeholder={lang === 'fa' ? 'چه ستون‌ها یا رکوردهایی به چه دلیلی وارد یا حذف شدند؟' : 'Why specific features or ranges were selected...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'استراتژی پاک‌سازی و جایگزینی مقادیر تهی (Cleaning Plan)' : 'Data Cleaning & Imputation Strategy'}
                </label>
                <textarea
                  rows={2}
                  value={p3.cleaningPlan}
                  onChange={(e) => setP3(prev => ({ ...prev, cleaningPlan: e.target.value }))}
                  placeholder={lang === 'fa' ? 'نحوه مدیریت مقادیر گم‌شده، فیلتر کردن نویزها و یکسان‌سازی فرمت‌ها...' : 'Imputation methods, outlier removal...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              {/* Feature Engineering */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'ویژگی‌های مهندسی‌شده (Engineered Features)' : 'Feature Engineering Transformations'}
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'نام ویژگی (مثال: rolling_txn_30d)' : 'Feature Name'}
                    value={newFeatureInput.feature}
                    onChange={(e) => setNewFeatureInput(prev => ({ ...prev, feature: e.target.value }))}
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'منطق ریاضی / تبدیل آماری' : 'Transformation Logic'}
                    value={newFeatureInput.logic}
                    onChange={(e) => setNewFeatureInput(prev => ({ ...prev, logic: e.target.value }))}
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFeatureInput.feature.trim()) {
                        setP3(prev => ({ ...prev, engineeredFeatures: [...prev.engineeredFeatures, { ...newFeatureInput }] }));
                        setNewFeatureInput({ feature: '', logic: '' });
                      }
                    }}
                    className="px-4 py-1.5 text-xs font-medium rounded bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]"
                  >
                    {t.addBtn}
                  </button>
                </div>
                <div className="space-y-1.5">
                  {p3.engineeredFeatures.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
                      <span><b className="text-[#1f5163] dark:text-[#6fb3c6]">{f.feature}:</b> {f.logic}</span>
                      <button
                        type="button"
                        onClick={() => setP3(prev => ({ ...prev, engineeredFeatures: prev.engineeredFeatures.filter((_, i) => i !== idx) }))}
                        className="text-[#b3432f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'تقسیم‌بندی داده‌ها (Train / Validation / Test Splits)' : 'Data Partitioning Splits'}
                </label>
                <input
                  type="text"
                  value={p3.partitioningSplit}
                  onChange={(e) => setP3(prev => ({ ...prev, partitioningSplit: e.target.value }))}
                  placeholder={lang === 'fa' ? 'مثال: ۷۰٪ آموزش، ۱۵٪ اعتبارسنجی، ۱۵٪ آزمون با برش زمانی' : 'e.g. 70% Train, 15% Val, 15% Test (temporal split)'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'پیشگیری از نشت داده (Data Leakage Mitigation Plan)' : 'Data Leakage Mitigation Protocol'}
                </label>
                <input
                  type="text"
                  value={p3.leakageMitigation}
                  onChange={(e) => setP3(prev => ({ ...prev, leakageMitigation: e.target.value }))}
                  placeholder={lang === 'fa' ? 'حذف متغیرهای بعد از رویداد، محاسبه تبدیلات صرفاً روی مجموعه آموزش...' : 'Fitting scalers only on train, removing post-event indicators...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>
            </>
          )}

          {/* PHASE 4 WORKSHEET */}
          {phaseId === 4 && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'تکنیک و الگوریتم‌های کاندیدا (Chosen Modeling Technique)' : 'Candidate Modeling Algorithms'}
                </label>
                <input
                  type="text"
                  value={p4.chosenAlgorithm}
                  onChange={(e) => setP4(prev => ({ ...prev, chosenAlgorithm: e.target.value }))}
                  placeholder={lang === 'fa' ? 'مثال: LightGBM، Random Forest، Transformer Fine-tune' : 'e.g. LightGBM, Fine-tuned LLM, CNN'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'مدل خط مبنا برای مقایسه (Baseline Benchmark Model)' : 'Baseline Benchmark Model'}
                </label>
                <input
                  type="text"
                  value={p4.baselineComparison}
                  onChange={(e) => setP4(prev => ({ ...prev, baselineComparison: e.target.value }))}
                  placeholder={lang === 'fa' ? 'مثال: رگرسیون لجستیک ساده یا قوانین شرطی موجود سازمان' : 'e.g. Simple Logistic Regression or current rule-based heuristic'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'استراتژی اعتبارسنجی (Validation & Test Protocol)' : 'Validation Strategy'}
                </label>
                <input
                  type="text"
                  value={p4.validationStrategy}
                  onChange={(e) => setP4(prev => ({ ...prev, validationStrategy: e.target.value }))}
                  placeholder={lang === 'fa' ? 'مثال: 5-Fold Stratified Cross-Validation با پنجره زمانی' : 'e.g. 5-Fold Stratified Cross-Validation'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              {/* Metric Scorecard */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'کارنامه معیارهای فنی (Technical Metrics Scorecard)' : 'Technical Metrics Evaluation'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'معیار (مثال: PR-AUC)' : 'Metric (e.g. F1-Score)'}
                    value={newMetricInput.metric}
                    onChange={(e) => setNewMetricInput(prev => ({ ...prev, metric: e.target.value }))}
                    className="px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <input
                    type="text"
                    placeholder={lang === 'fa' ? 'هدف (مثال: > 0.60)' : 'Target'}
                    value={newMetricInput.target}
                    onChange={(e) => setNewMetricInput(prev => ({ ...prev, target: e.target.value }))}
                    className="px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={lang === 'fa' ? 'محقق‌شده (مثال: 0.65)' : 'Achieved'}
                      value={newMetricInput.achieved}
                      onChange={(e) => setNewMetricInput(prev => ({ ...prev, achieved: e.target.value }))}
                      className="flex-1 px-3 py-1.5 text-xs rounded border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMetricInput.metric.trim()) {
                          setP4(prev => ({ ...prev, evaluationMetrics: [...prev.evaluationMetrics, { ...newMetricInput }] }));
                          setNewMetricInput({ metric: '', target: '', achieved: '' });
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]"
                    >
                      {t.addBtn}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {p4.evaluationMetrics.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
                      <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">{m.metric}</span>
                      <span className="text-[#5d6b73] dark:text-[#9aa8b0]">{lang === 'fa' ? 'هدف:' : 'Target:'} {m.target}</span>
                      <span className="font-mono text-[#2f7d5b] dark:text-[#63c496] font-bold">{lang === 'fa' ? 'کسب‌شده:' : 'Achieved:'} {m.achieved}</span>
                      <button
                        type="button"
                        onClick={() => setP4(prev => ({ ...prev, evaluationMetrics: prev.evaluationMetrics.filter((_, i) => i !== idx) }))}
                        className="text-[#b3432f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'تنظیم ابرپارامترها و تابع زیان (Hyperparameters & Loss Function)' : 'Hyperparameters & Tuning Notes'}
                </label>
                <textarea
                  rows={2}
                  value={p4.hyperparameterNotes}
                  onChange={(e) => setP4(prev => ({ ...prev, hyperparameterNotes: e.target.value }))}
                  placeholder="e.g. learning_rate=0.03, max_depth=6, focal_loss for imbalance..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>
            </>
          )}

          {/* PHASE 5 WORKSHEET */}
          {phaseId === 5 && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'تطبیق با شاخص‌های کسب‌وکار فاز اول (Business KPI & ROI Validation)' : 'Business KPI & ROI Alignment'}
                </label>
                <textarea
                  rows={2}
                  value={p5.kpiComparisonResult}
                  onChange={(e) => setP5(prev => ({ ...prev, kpiComparisonResult: e.target.value }))}
                  placeholder={lang === 'fa' ? 'آیا مدل توانست هدف سودآوری/کاهش هزینه تعیین‌شده در فاز اول را محقق کند؟' : 'Does the model deliver the projected dollar value or time savings?'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'ممیزی انصاف، عدم تبعیض و ایمنی (Ethics & Bias Audit)' : 'Ethical, Fairness & Bias Audit'}
                </label>
                <textarea
                  rows={2}
                  value={p5.ethicalAndBiasFindings}
                  onChange={(e) => setP5(prev => ({ ...prev, ethicalAndBiasFindings: e.target.value }))}
                  placeholder={lang === 'fa' ? 'ارزیابی نرخ خطای مدل روی زیرگروه‌ها و پیشگیری از قضاوت تبعیض‌آمیز...' : 'Subgroup parity, false-positive harm check, safety boundaries...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'قابلیت توضیح‌پذیری و شفافیت (Explainability / XAI)' : 'Explainability & Interpretability (XAI)'}
                </label>
                <input
                  type="text"
                  value={p5.explainabilityAssessment}
                  onChange={(e) => setP5(prev => ({ ...prev, explainabilityAssessment: e.target.value }))}
                  placeholder={lang === 'fa' ? 'استفاده از SHAP / LIME برای توجیه پیش‌بینی‌ها برای کاربر نهایی...' : 'e.g. SHAP waterfall plots provided for frontline staff'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              {/* Gate Decision Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'تصمیم رسمی گیت فاز پنجم (Phase V Milestone Decision)' : 'Phase V Milestone Decision'}
                </label>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
                  {lang === 'fa'
                    ? 'اجماع رسمی تیم: ورود به عملیاتی‌سازی یا بازگشت به فازهای قبل جهت تکرار چابک؟'
                    : 'Formal consensus gate: proceed to deploy, or iterate prior phases.'}
                </p>
                <select
                  value={p5.nextStepDecision}
                  onChange={(e) => setP5(prev => ({ ...prev, nextStepDecision: e.target.value as any }))}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                >
                  <option value="">{lang === 'fa' ? '-- انتخاب تصمیم گیت --' : '-- Select Gate Decision --'}</option>
                  {t.decisionOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'منطق و استدلال تصمیم گیت (Decision Rationale)' : 'Consensus Rationale'}
                </label>
                <textarea
                  rows={2}
                  value={p5.decisionRationale}
                  onChange={(e) => setP5(prev => ({ ...prev, decisionRationale: e.target.value }))}
                  placeholder={lang === 'fa' ? 'دلایل توافق ذی‌نفعان برای این تصمیم...' : 'Why the team agreed on this pathway...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>
            </>
          )}

          {/* PHASE 6 WORKSHEET */}
          {phaseId === 6 && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'معماری و نحوه استقرار عملیاتی (Deployment Architecture)' : 'Production Serving Architecture'}
                </label>
                <textarea
                  rows={2}
                  value={p6.deploymentArchitecture}
                  onChange={(e) => setP6(prev => ({ ...prev, deploymentArchitecture: e.target.value }))}
                  placeholder={lang === 'fa' ? 'سرویس‌دهی بلادرنگ (API)، پردازش دسته‌ای شبانه، استقرار در کانتینر...' : 'e.g. Nightly batch scoring containerized in Kubernetes...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'استراتژی پایش مداوم و تله‌متری (Continuous Monitoring Plan)' : 'Monitoring Strategy'}
                </label>
                <textarea
                  rows={2}
                  value={p6.monitoringStrategy}
                  onChange={(e) => setP6(prev => ({ ...prev, monitoringStrategy: e.target.value }))}
                  placeholder={lang === 'fa' ? 'پایش تاخیر پاسخ، ناهنجاری در داده‌های ورودی، افت نرخ رضایت...' : 'Tracking latency, data distribution shifts, error spikes...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              {/* Drift Triggers */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'آستانه‌های هشدار انحراف و بازآموزی (Drift & Retraining Triggers)' : 'Drift & Retraining Triggers'}
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newDriftTriggerInput}
                    onChange={(e) => setNewDriftTriggerInput(e.target.value)}
                    placeholder={lang === 'fa' ? 'مثال: انحراف پایداری جمعیت PSI > 0.15 یا افت دقت به زیر ۷۰٪' : 'e.g. Population Stability Index (PSI) > 0.15...'}
                    className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newDriftTriggerInput.trim()) {
                        setP6(prev => ({ ...prev, driftTriggers: [...prev.driftTriggers, newDriftTriggerInput.trim()] }));
                        setNewDriftTriggerInput('');
                      }
                    }}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e]"
                  >
                    {t.addBtn}
                  </button>
                </div>
                <ul className="space-y-1.5">
                  {p6.driftTriggers.map((trig, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
                      <span>• {trig}</span>
                      <button
                        type="button"
                        onClick={() => setP6(prev => ({ ...prev, driftTriggers: prev.driftTriggers.filter((_, i) => i !== idx) }))}
                        className="text-[#b3432f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'برنامه بازگشت اضطراری به نسخه قبل (Emergency Rollback Plan)' : 'Rollback & Failover Strategy'}
                </label>
                <input
                  type="text"
                  value={p6.rollbackPlan}
                  onChange={(e) => setP6(prev => ({ ...prev, rollbackPlan: e.target.value }))}
                  placeholder={lang === 'fa' ? 'سوئیچ خودکار به مدل قبلی یا قوانین سنتی در صورت خطای سرویس...' : 'Automated fallback to heuristic score or previous model artifact...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'متولی دفترچه راهنما و پشتیبانی (Operational Runbook Owner)' : 'Operational Runbook Owner'}
                </label>
                <input
                  type="text"
                  value={p6.operationalRunbookOwner}
                  onChange={(e) => setP6(prev => ({ ...prev, operationalRunbookOwner: e.target.value }))}
                  placeholder={lang === 'fa' ? 'تیم MLOps و کارشناس عملیات شعبه' : 'e.g. Lead MLOps Engineer & Branch Operations Lead'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b]"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 4: Interactive Quiz */}
      <section id="s-quiz" className="scroll-mt-20">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] font-serif-heading mb-1">
          {content.quizHeading}
        </h3>
        <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mb-4">
          {content.quizSubheading}
        </p>

        <div className="space-y-4">
          {content.quizzes.map((quiz, qIdx) => {
            const selectedOption = quizAnswers[qIdx];
            const hasAnswered = selectedOption !== undefined;
            const isCorrect = selectedOption === quiz.ans;

            return (
              <div
                key={qIdx}
                className="p-4 sm:p-5 rounded-lg bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942]"
              >
                <p className="font-semibold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] mb-3">
                  {qIdx + 1}. {quiz.q}
                </p>

                <div className="space-y-2">
                  {quiz.o.map((opt, oIdx) => {
                    let optStyle = 'border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163]';

                    if (hasAnswered) {
                      if (oIdx === quiz.ans) {
                        optStyle = 'border-[#2f7d5b] bg-[#e3f2ea] text-[#2f7d5b] dark:bg-[#173025] dark:text-[#63c496] font-medium';
                      } else if (selectedOption === oIdx) {
                        optStyle = 'border-[#b3432f] bg-[#f9e6e1] text-[#b3432f] dark:bg-[#3a1f19] dark:text-[#ee8f7a]';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={hasAnswered}
                        onClick={() => onSelectQuizAnswer(qIdx, oIdx)}
                        className={`w-full text-start p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer disabled:cursor-default ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className="mt-3 text-xs sm:text-sm leading-relaxed p-2.5 rounded-lg bg-[#ffffff]/50 dark:bg-[#12171b]/50 border border-[#d9dad5] dark:border-[#2d3942]">
                    <span className={`font-semibold ${isCorrect ? 'text-[#2f7d5b] dark:text-[#63c496]' : 'text-[#b3432f] dark:text-[#ee8f7a]'}`}>
                      {isCorrect ? (lang === 'fa' ? '✓ پاسخ درست است: ' : '✓ Correct: ') : (lang === 'fa' ? '✕ کاملاً درست نیست: ' : '✕ Not quite: ')}
                    </span>
                    <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                      {quiz.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#d9dad5] dark:border-[#2d3942]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90 transition-opacity"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{t.copyBtn}</span>
          </button>

          <button
            onClick={onResetPhase}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#b3432f] hover:text-[#b3432f] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetBtn}</span>
          </button>

          {toastMessage && (
            <span className="text-xs text-[#2f7d5b] dark:text-[#63c496] font-medium animate-fade-in">
              ✓ {toastMessage}
            </span>
          )}
        </div>

        {/* Next / Previous Phase Navigation Buttons */}
        <div className="flex items-center gap-2">
          {phaseId > 1 && (
            <button
              onClick={() => onNavigatePhase((phaseId - 1) as PhaseId)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]"
            >
              {lang === 'fa' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{lang === 'fa' ? `فاز قبلی (${phaseId - 1})` : `Phase ${phaseId - 1}`}</span>
            </button>
          )}
          {phaseId < 6 && (
            <button
              onClick={() => onNavigatePhase((phaseId + 1) as PhaseId)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#e3eef1] dark:bg-[#1b2c32] text-[#1f5163] dark:text-[#6fb3c6] hover:opacity-90 font-medium"
            >
              <span>{lang === 'fa' ? `فاز بعدی (${phaseId + 1})` : `Phase ${phaseId + 1}`}</span>
              {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
