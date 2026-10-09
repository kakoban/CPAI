import React, { useState } from 'react';
import { AppState, Language } from '../types/cpmai';
import { UI_TRANSLATIONS } from '../data/translations';
import { PHASES_DATA } from '../data/cpmaiPhases';
import { X, Copy, Download, Upload, Check, AlertCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
  lang: Language;
  onImportState: (importedState: Partial<AppState>) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  appState,
  lang,
  onImportState
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'backup'>('markdown');
  const [importJsonText, setImportJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null);

  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[lang];

  // Generate complete Markdown dossier across all 6 phases
  const generateMarkdownDossier = (): string => {
    const meta = appState.projectMeta;
    let md = `# CPMAI Project Dossier: ${meta.title || 'AI Initiative'}\n\n`;
    md += `**Organization:** ${meta.organization || 'OWJ Business Council'}\n`;
    md += `**Lead Project Manager:** ${meta.leadName || 'Unassigned'}\n`;
    md += `**Sprint / Iteration:** ${meta.sprint || 'Sprint 1'}\n`;
    md += `**Methodology:** Cognitive Project Management for Artificial Intelligence (CPMAI)\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n\n---\n\n`;

    // Phase 1
    const p1c = PHASES_DATA[lang][1];
    md += `## Phase I: ${p1c.title}\n`;
    md += `### ${p1c.taskGroup}\n`;
    md += `#### Page 1: Determine Business Objectives\n`;
    md += `- **Sprint User Story:** ${appState.p1.userStory || 'N/A'}\n`;
    md += `- **Business Background:** ${appState.p1.background || 'N/A'}\n`;
    md += `- **Primary Objective:** ${appState.p1.primaryObjective || 'N/A'}\n`;
    md += `- **Cognitive Pattern:** ${appState.p1.cognitivePattern || 'N/A'}\n`;
    md += `- **Business Success Criteria:** ${appState.p1.businessSuccessCriteria || 'N/A'}\n`;
    md += `**Related Business Questions:**\n`;
    if (appState.p1.relatedQuestions.length > 0) {
      appState.p1.relatedQuestions.forEach((q, i) => {
        md += `${i + 1}. ${q}\n`;
      });
    } else {
      md += `*None listed*\n`;
    }
    md += `\n#### Page 2: What problem are you solving with AI in this iteration?\n`;
    md += `- **Business Problem Statement:** ${appState.p1.problemDef?.problemStatement || 'N/A'}\n`;
    md += `- **Why AI (vs. Traditional Programming):** ${appState.p1.problemDef?.whyAiNotTraditional || 'N/A'}\n`;
    md += `- **Current State:** ${appState.p1.problemDef?.currentState || 'N/A'}\n`;
    md += `- **Desired Future State:** ${appState.p1.problemDef?.futureState || 'N/A'}\n`;
    md += `- **In-Scope for this Iteration:** ${appState.p1.problemDef?.inScope || 'N/A'}\n`;
    md += `- **Out-of-Scope (Deferred):** ${appState.p1.problemDef?.outOfScope || 'N/A'}\n`;
    if (appState.p1.problemDef?.canvasNotes) {
      md += `- **Canvas & Workshop Notes:**\n${appState.p1.problemDef.canvasNotes}\n`;
    }
    md += `\n---\n\n`;

    // Phase 2
    const p2c = PHASES_DATA[lang][2];
    md += `## Phase II: ${p2c.title}\n`;
    md += `### ${p2c.taskGroup}\n`;
    md += `- **Data Characteristics & Exploration:** ${appState.p2.dataCharacteristics || 'N/A'}\n`;
    md += `- **Governance & Privacy Protocols:** ${appState.p2.governanceAndEthics || 'N/A'}\n`;
    md += `#### Data Sources Catalog:\n`;
    if (appState.p2.dataSources.length > 0) {
      appState.p2.dataSources.forEach(s => {
        md += `- **${s.source}** | Format: ${s.format} | Volume: ${s.volume} | Status: ${s.status}\n`;
      });
    } else {
      md += `*No sources recorded*\n`;
    }
    md += `#### Quality Deficiencies & Bias:\n`;
    if (appState.p2.qualityDeficiencies.length > 0) {
      appState.p2.qualityDeficiencies.forEach((d, i) => {
        md += `${i + 1}. ${d}\n`;
      });
    } else {
      md += `*No deficiencies identified*\n`;
    }
    md += `\n---\n\n`;

    // Phase 3
    const p3c = PHASES_DATA[lang][3];
    md += `## Phase III: ${p3c.title}\n`;
    md += `### ${p3c.taskGroup}\n`;
    md += `- **Inclusion / Exclusion Criteria:** ${appState.p3.inclusionCriteria || 'N/A'}\n`;
    md += `- **Cleaning & Imputation Plan:** ${appState.p3.cleaningPlan || 'N/A'}\n`;
    md += `- **Dataset Partitions:** ${appState.p3.partitioningSplit || 'N/A'}\n`;
    md += `- **Data Leakage Mitigation:** ${appState.p3.leakageMitigation || 'N/A'}\n`;
    md += `#### Engineered Features:\n`;
    if (appState.p3.engineeredFeatures.length > 0) {
      appState.p3.engineeredFeatures.forEach(f => {
        md += `- **${f.feature}:** ${f.logic}\n`;
      });
    } else {
      md += `*No engineered features recorded*\n`;
    }
    md += `\n---\n\n`;

    // Phase 4
    const p4c = PHASES_DATA[lang][4];
    md += `## Phase IV: ${p4c.title}\n`;
    md += `### ${p4c.taskGroup}\n`;
    md += `- **Candidate Architecture:** ${appState.p4.chosenAlgorithm || 'N/A'}\n`;
    md += `- **Baseline Benchmark Model:** ${appState.p4.baselineComparison || 'N/A'}\n`;
    md += `- **Validation Protocol:** ${appState.p4.validationStrategy || 'N/A'}\n`;
    md += `- **Hyperparameter Notes:** ${appState.p4.hyperparameterNotes || 'N/A'}\n`;
    md += `#### Metrics Evaluation:\n`;
    if (appState.p4.evaluationMetrics.length > 0) {
      appState.p4.evaluationMetrics.forEach(m => {
        md += `- **${m.metric}:** Target: ${m.target} | Achieved: ${m.achieved}\n`;
      });
    } else {
      md += `*No metrics registered*\n`;
    }
    md += `\n---\n\n`;

    // Phase 5
    const p5c = PHASES_DATA[lang][5];
    md += `## Phase V: ${p5c.title}\n`;
    md += `### ${p5c.taskGroup}\n`;
    md += `- **Business KPI Alignment:** ${appState.p5.kpiComparisonResult || 'N/A'}\n`;
    md += `- **Fairness & Bias Audit:** ${appState.p5.ethicalAndBiasFindings || 'N/A'}\n`;
    md += `- **Explainability (XAI):** ${appState.p5.explainabilityAssessment || 'N/A'}\n`;
    md += `- **Gate Consensus Decision:** ${appState.p5.nextStepDecision || 'N/A'}\n`;
    md += `- **Decision Rationale:** ${appState.p5.decisionRationale || 'N/A'}\n`;
    md += `\n---\n\n`;

    // Phase 6
    const p6c = PHASES_DATA[lang][6];
    md += `## Phase VI: ${p6c.title}\n`;
    md += `### ${p6c.taskGroup}\n`;
    md += `- **Production Architecture:** ${appState.p6.deploymentArchitecture || 'N/A'}\n`;
    md += `- **Continuous Telemetry & Monitoring:** ${appState.p6.monitoringStrategy || 'N/A'}\n`;
    md += `- **Emergency Rollback Plan:** ${appState.p6.rollbackPlan || 'N/A'}\n`;
    md += `- **Runbook Owner:** ${appState.p6.operationalRunbookOwner || 'N/A'}\n`;
    md += `#### Drift & Retraining Triggers:\n`;
    if (appState.p6.driftTriggers.length > 0) {
      appState.p6.driftTriggers.forEach((tr, i) => {
        md += `${i + 1}. ${tr}\n`;
      });
    } else {
      md += `*No triggers defined*\n`;
    }
    md += `\n---\n*Generated by CPMAI Workbook · OWJ Business Council (owjbc.com)*\n`;

    return md;
  };

  const fullMarkdown = generateMarkdownDossier();

  const handleCopyMarkdown = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullMarkdown).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpmai_workbook_${appState.projectMeta.title ? appState.projectMeta.title.replace(/\s+/g, '_') : 'project'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (typeof parsed === 'object' && parsed !== null) {
        onImportState(parsed);
        setImportStatus({ success: true, msg: t.importSuccess });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error('Invalid JSON structure');
      }
    } catch {
      setImportStatus({ success: false, msg: t.importError });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d9dad5] dark:border-[#2d3942]">
          <h3 className="font-semibold text-base text-[#1c2830] dark:text-[#e8ebe9]">
            {t.exportModalTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#f4f4f1] dark:hover:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#d9dad5] dark:border-[#2d3942] px-6 bg-[#f4f4f1]/50 dark:bg-[#12171b]/50">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'markdown'
                ? 'border-[#1f5163] text-[#1f5163] dark:border-[#6fb3c6] dark:text-[#6fb3c6]'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
            }`}
          >
            {lang === 'fa' ? 'گزارش کامل مارک‌داون' : 'Markdown Dossier'}
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'backup'
                ? 'border-[#1f5163] text-[#1f5163] dark:border-[#6fb3c6] dark:text-[#6fb3c6]'
                : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
            }`}
          >
            {lang === 'fa' ? 'پشتیبان‌گیری و بازیابی (JSON)' : 'JSON Backup & Restore'}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs sm:text-sm">
          {activeTab === 'markdown' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'این گزارش شامل جمع‌بندی تمام فازهای شش‌گانه برای تحویل تکلیف یا ارائه به ذی‌نفعان است.'
                    : 'Unified summary ready to submit for PMI course grading or executive review.'}
                </span>
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : t.copyMdBtn}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={fullMarkdown}
                rows={14}
                className="w-full p-4 font-mono text-xs rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] select-all leading-relaxed"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Download JSON */}
              <div className="p-4 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
                <h4 className="font-semibold text-sm text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {lang === 'fa' ? 'دریافت نسخه پشتیبان کامل' : 'Export Full JSON Backup'}
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-3">
                  {lang === 'fa'
                    ? 'فایل تمام پاسخ‌ها و تنظیمات پروژه را برای استفاده در مرورگر دیگر ذخیره کنید.'
                    : 'Download all project state, answers, and metadata into a local JSON file.'}
                </p>
                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadJsonBtn}</span>
                </button>
              </div>

              {/* Restore JSON */}
              <div className="p-4 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942]">
                <h4 className="font-semibold text-sm text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                  {t.importJsonTitle}
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-3">
                  {lang === 'fa'
                    ? 'متن فایل JSON قبلی را اینجا جای‌گذاری کرده و روی اعمال کلیک کنید.'
                    : 'Paste the exported JSON content below to restore your work.'}
                </p>

                <textarea
                  rows={6}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder={t.importJsonPlaceholder}
                  className="w-full p-3 font-mono text-xs rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] mb-3"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleApplyImport}
                    disabled={!importJsonText.trim()}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#2f7d5b] text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.applyImportBtn}</span>
                  </button>

                  {importStatus && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${importStatus.success ? 'text-[#2f7d5b]' : 'text-[#b3432f]'}`}>
                      {importStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{importStatus.msg}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#d9dad5] dark:border-[#2d3942] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b]"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
