import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  Copy,
  Check,
  Play,
  ExternalLink,
  Code,
  Users,
  CheckCircle2,
  Lightbulb,
  Layers,
  FileBarChart,
  Calculator,
  ClipboardCheck,
  FileSpreadsheet,
  Award,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import {
  HR_ARTIFACTS_WORKSHOP_HEADER,
  HR_ARTIFACT_EXERCISES,
  HrArtifactExercise
} from '../data/hr_artifacts_canvas_workshop';

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
  const [selectedExId, setSelectedExId] = useState<string>(HR_ARTIFACT_EXERCISES[0].id);

  const activeEx: HrArtifactExercise =
    HR_ARTIFACT_EXERCISES.find((ex) => ex.id === selectedExId) || HR_ARTIFACT_EXERCISES[0];

  const renderExerciseIcon = (num: number, className = 'w-4 h-4') => {
    switch (num) {
      case 1:
        return <FileBarChart className={className} />;
      case 2:
        return <Calculator className={className} />;
      case 3:
        return <ClipboardCheck className={className} />;
      case 4:
        return <FileSpreadsheet className={className} />;
      case 5:
      default:
        return <Award className={className} />;
    }
  };

  const activePrompt = lang === 'fa' ? activeEx.promptFa : activeEx.promptEn;
  const copyKey = `hr_artifact_prompt_${activeEx.id}`;
  const isCopied = copiedId === copyKey;

  return (
    <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
      <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#d97706]/10 text-[#b45309] dark:text-[#fbbf24] border border-[#d97706]/25 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>Claude Artifacts & Gemini Canvas</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6] border border-[#00738c]/20 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>
                  {lang === 'fa'
                    ? 'ویژه واحد منابع انسانی، اداری و رفاهی (پروژه مترو خط ایکس)'
                    : 'HR, Admin & Welfare Track (Metro Line X)'}
                </span>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
              {lang === 'fa' ? HR_ARTIFACTS_WORKSHOP_HEADER.titleFa : HR_ARTIFACTS_WORKSHOP_HEADER.titleEn}
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa' ? HR_ARTIFACTS_WORKSHOP_HEADER.subtitleFa : HR_ARTIFACTS_WORKSHOP_HEADER.subtitleEn}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>Claude Artifacts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>Gemini Canvas</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2-Step Chained Workshop Playbook (NotebookLM -> Claude Artifacts / Gemini Canvas) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00738c]/[0.06] via-[#2f7d5b]/[0.06] to-[#d97706]/[0.06] border border-[#00738c]/20 space-y-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00738c] dark:text-[#6fb3c6]" />
              <span>
                {lang === 'fa'
                  ? HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.titleFa
                  : HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.titleEn}
              </span>
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-[#12171b] text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/25">
              {lang === 'fa' ? 'بدون نیاز به دانش برنامه‌نویسی (No-Code AI App Building)' : 'Zero-Code AI Tooling'}
            </span>
          </div>

          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
            {lang === 'fa'
              ? HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.descriptionFa
              : HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.descriptionEn}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HR_ARTIFACTS_WORKSHOP_HEADER.twoStepChainGuide.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      st.stepNumber === 1
                        ? 'bg-[#00738c] text-white'
                        : 'bg-[#b45309] text-white'
                    }`}
                  >
                    {st.stepNumber}
                  </span>
                  <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? st.titleFa : st.titleEn}
                  </h4>
                </div>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa' ? st.descriptionFa : st.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Exercise Selector Cards */}
        <div className="space-y-2.5">
          <span className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9] block">
            {lang === 'fa'
              ? 'انتخاب تمرین عملی ساخت ابزار تعاملی (۵ تمرین کاربردی ویژه منابع انسانی و اداری):'
              : 'Select Interactive Artifact / Canvas Exercise (5 Applied HR & Admin Tools):'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {HR_ARTIFACT_EXERCISES.map((ex) => {
              const isSelected = ex.id === selectedExId;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setSelectedExId(ex.id)}
                  className={`p-3.5 rounded-2xl border text-right transition-all active:scale-[0.97] flex flex-col justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1f5163] text-white border-[#1f5163] shadow-sm'
                      : 'bg-[#f8f9fa] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border-black/[0.06] dark:border-white/[0.08] hover:border-[#00738c]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full gap-1">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#d97706]/15 text-[#b45309] dark:text-[#fbbf24]'
                      }`}
                    >
                      {renderExerciseIcon(ex.number, 'w-3 h-3')}
                      <span>{lang === 'fa' ? `تمرین ${ex.number}` : `Ex ${ex.number}`}</span>
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/15 text-white/90' : 'text-[#5d6b73] dark:text-[#9aa8b0]'
                      }`}
                    >
                      {lang === 'fa' ? ex.badgeFa : ex.badgeEn}
                    </span>
                  </div>

                  <div className="text-xs font-bold leading-snug line-clamp-2">
                    {lang === 'fa' ? ex.titleFa.replace(/^تمرین \d+:\s*/, '') : ex.titleEn.replace(/^Exercise \d+:\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Exercise Detailed Workspace */}
        <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.07] dark:border-white/[0.09] space-y-5">
          {/* Exercise Title & Objective */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#b45309] text-white">
                  {lang === 'fa' ? activeEx.badgeFa : activeEx.badgeEn}
                </span>
                {activeEx.targetTools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-white dark:bg-[#182026] text-[#1c2830] dark:text-[#e8ebe9] border border-black/[0.08] dark:border-white/[0.1]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <h4 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? activeEx.titleFa : activeEx.titleEn}
              </h4>
            </div>
          </div>

          {/* Objective Banner */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#161e24] border border-black/[0.05] dark:border-white/[0.07] text-xs leading-relaxed">
            <strong className="text-[#00738c] dark:text-[#6fb3c6] font-extrabold">
              {lang === 'fa' ? '🎯 هدف تمرین: ' : '🎯 Exercise Objective: '}
            </strong>
            <span className="text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? activeEx.objectiveFa : activeEx.objectiveEn}
            </span>
          </div>

          {/* Ready-to-Copy Prompt Box for Claude Artifacts / Gemini Canvas */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fffbeb]/80 to-[#fef3c7]/40 dark:from-[#2b1f09]/40 dark:to-[#1a160b]/40 border border-[#d97706]/35 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#b45309] dark:text-[#fbbf24] font-extrabold text-xs">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? 'پرامپت آماده برای وارد کردن در Claude (قابلیت Artifacts) یا Gemini (قابلیت Canvas):'
                    : 'Ready-to-Use Prompt for Claude Artifacts or Gemini Canvas:'}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(activePrompt)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white/80 dark:bg-[#12171b] text-[#b45309] dark:text-[#fbbf24] border border-[#d97706]/30 hover:bg-white transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'انتقال به کارگاه تست پرامپت' : 'Load to Sandbox'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(activePrompt, copyKey)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-[0.96] cursor-pointer ${
                    isCopied
                      ? 'bg-[#2f7d5b] text-white'
                      : 'bg-[#b45309] hover:bg-[#92400e] text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'پرامپت کپی شد!' : 'Prompt Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی پرامپت ساخت ابزار' : 'Copy Artifact Prompt'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0e1317] border border-[#d97706]/25 max-h-80 overflow-y-auto">
              <pre
                dir={lang === 'fa' ? 'rtl' : 'ltr'}
                className="text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text text-right"
              >
                {activePrompt}
              </pre>
            </div>
          </div>

          {/* Expected Output & Key Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Expected Output in Artifact / Canvas */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
              <div className="text-xs font-extrabold text-[#2f7d5b] dark:text-[#52b788] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? 'خروجی مورد انتظار در محیط Artifact / Canvas:'
                    : 'Expected Output in Artifact / Canvas:'}
                </span>
              </div>
              <p className="text-xs text-[#1c2830] dark:text-[#d1d7db] leading-relaxed">
                {lang === 'fa' ? activeEx.expectedOutputFa : activeEx.expectedOutputEn}
              </p>

              <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] space-y-1.5">
                <span className="text-[11px] font-bold text-[#5d6b73] dark:text-[#9aa8b0] block">
                  {lang === 'fa' ? 'ویژگی‌های کلیدی ابزار تولیدشده:' : 'Generated Tool Highlights:'}
                </span>
                <ul className="space-y-1 text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                  {(lang === 'fa' ? activeEx.keyHighlightsFa : activeEx.keyHighlightsEn).map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2f7d5b] mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Educational Takeaway for HR Team */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-[#b45309] dark:text-[#fbbf24] flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? 'مهارت آموزشی برای تیم منابع انسانی و اداری:'
                      : 'Educational Takeaway for the HR & Admin Team:'}
                  </span>
                </div>
                <p className="text-xs text-[#1c2830] dark:text-[#d1d7db] leading-relaxed">
                  {lang === 'fa' ? activeEx.educationalTakeawayFa : activeEx.educationalTakeawayEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f4f7f6] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2 text-[11px]">
                <span className="text-[#5d6b73] dark:text-[#9aa8b0] font-medium">
                  {lang === 'fa'
                    ? 'نکته: در Claude قابلیت Artifacts و در Gemini گزینه Canvas را فعال کنید.'
                    : 'Tip: Enable Artifacts in Claude or select Canvas in Gemini before pasting.'}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx = (HR_ARTIFACT_EXERCISES.findIndex((e) => e.id === selectedExId) + 1) % HR_ARTIFACT_EXERCISES.length;
                      setSelectedExId(HR_ARTIFACT_EXERCISES[nextIdx].id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{lang === 'fa' ? 'تمرین بعدی' : 'Next Exercise'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
