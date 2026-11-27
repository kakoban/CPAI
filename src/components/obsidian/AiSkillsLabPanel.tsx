import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Play
} from 'lucide-react';
import { Language } from '../../types/cpmai';

export interface ReadySkillPackageItem {
  id: string;
  name: string;
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  triggerWhenFa: string;
  skillMdContent: string;
  test1NormalTitleFa: string;
  test1NormalPromptFa: string;
  test2TrapTitleFa: string;
  test2TrapPromptFa: string;
  expectedTrapBehaviorFa: string;
}

interface AiSkillsLabPanelProps {
  lang: Language;
  readySkills: ReadySkillPackageItem[];
  selectedSkillId: string;
  onSelectSkillId: (id: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onDownloadSkillFile: (fileName: string, content: string) => void;
  onLoadToSandbox?: (promptText: string) => void;
  metaSkillBuilderPrompt: string;
  customName: string;
  onChangeCustomName: (v: string) => void;
  customDesc: string;
  onChangeCustomDesc: (v: string) => void;
  customSteps: string;
  onChangeCustomSteps: (v: string) => void;
  customOutputFormat: string;
  onChangeCustomOutputFormat: (v: string) => void;
  customTrapRule: string;
  onChangeCustomTrapRule: (v: string) => void;
  generatedCustomSkillMd: string;
  onBackToLesson: () => void;
}

type LabSubView = 'packages' | 'builder' | 'anatomy';

/**
 * Calm, on-demand Hands-On Lab & Sandbox view (Figma Frame 15:160):
 * Preserves 100% of all 3 ready SKILL.md packages, Normal vs. Trap tests,
 * Interactive SKILL.md Builder, SKILL.md Anatomy, Meta-Prompt, Download/Copy,
 * and onLoadToSandbox integration — organized cleanly without clutter.
 */
export const AiSkillsLabPanel: React.FC<AiSkillsLabPanelProps> = ({
  lang,
  readySkills,
  selectedSkillId,
  onSelectSkillId,
  copyToClipboard,
  copiedId,
  onDownloadSkillFile,
  onLoadToSandbox,
  metaSkillBuilderPrompt,
  customName,
  onChangeCustomName,
  customDesc,
  onChangeCustomDesc,
  customSteps,
  onChangeCustomSteps,
  customOutputFormat,
  onChangeCustomOutputFormat,
  customTrapRule,
  onChangeCustomTrapRule,
  generatedCustomSkillMd,
  onBackToLesson
}) => {
  const isFa = lang === 'fa';
  const [labTab, setLabTab] = useState<LabSubView>('packages');

  const activeReadySkill =
    readySkills.find((s) => s.id === selectedSkillId) || readySkills[0];

  return (
    <div className="space-y-6" data-testid="ai-skills-lab-view">
      {/* Header + Clean Lab Sub-Tabs */}
      <div className="space-y-4 pb-5 border-b border-[var(--cpai-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[var(--cpai-muted)]">
              {isFa
                ? 'آزمایشگاه عملی و سندباکس · دانلود، تست تله اعداد و ساخت SKILL.md'
                : 'Hands-on Lab & Sandbox · Download, Trap Testing & Custom SKILL.md Builder'}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--cpai-text)] leading-snug">
              {isFa ? 'کارگاه عملی ساخت و آزمایش AI Skills' : 'Hands-on AI Skills Lab & Sandbox'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onBackToLesson}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] hover:text-[var(--cpai-primary-strong)] transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
            <span>{isFa ? 'بازگشت به درس' : 'Back to lesson'}</span>
          </button>
        </div>

        <div
          role="tablist"
          aria-label={isFa ? 'ابزارهای آزمایشگاه AI Skills' : 'AI Skills lab tools'}
          className="flex flex-wrap sm:inline-flex items-center gap-1 p-1 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] w-full sm:w-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={labTab === 'packages'}
            data-testid="lab-subtab-packages"
            onClick={() => setLabTab('packages')}
            className={`min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none text-center ${
              labTab === 'packages'
                ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] font-semibold border border-[var(--cpai-border)]'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
            }`}
          >
            {isFa ? '۳ پکیج آماده و تست تله' : '3 Ready Packages & Trap Tests'}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={labTab === 'builder'}
            data-testid="lab-subtab-builder"
            onClick={() => setLabTab('builder')}
            className={`min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none text-center ${
              labTab === 'builder'
                ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] font-semibold border border-[var(--cpai-border)]'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
            }`}
          >
            {isFa ? 'اسکیل‌ساز سفارشی' : 'Custom SKILL.md Builder'}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={labTab === 'anatomy'}
            data-testid="lab-subtab-anatomy"
            onClick={() => setLabTab('anatomy')}
            className={`min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none text-center ${
              labTab === 'anatomy'
                ? 'bg-[var(--cpai-surface)] text-[var(--cpai-primary-strong)] font-semibold border border-[var(--cpai-border)]'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] border border-transparent'
            }`}
          >
            {isFa ? 'کالبدشکافی و پرامپت متا' : 'Anatomy & Meta-Prompt'}
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: 3 READY SKILL.MD PACKAGES + NORMAL vs TRAP TESTS */}
      {labTab === 'packages' && activeReadySkill && (
        <div className="space-y-6">
          {/* Package Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {readySkills.map((sk) => {
              const isSelected = sk.id === activeReadySkill.id;
              return (
                <button
                  key={sk.id}
                  type="button"
                  onClick={() => onSelectSkillId(sk.id)}
                  aria-pressed={isSelected}
                  data-testid={`ready-skill-btn-${sk.id}`}
                  className={`p-4 rounded-[var(--cpai-radius)] border text-start transition-colors flex flex-col justify-between gap-2 min-h-[84px] ${
                    isSelected
                      ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)]'
                      : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] text-[var(--cpai-text)] hover:border-[var(--cpai-primary)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--cpai-muted)]">
                    <span dir="ltr" className="font-mono truncate">
                      {sk.name}/SKILL.md
                    </span>
                    <span className="shrink-0">{sk.badgeFa}</span>
                  </div>
                  <div className="text-sm font-semibold leading-snug text-[var(--cpai-text)]">
                    {sk.titleFa}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Package Header & Primary Actions */}
          <div className="space-y-4 pt-2 border-t border-[var(--cpai-border)]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-semibold text-[var(--cpai-text)]">
                  {activeReadySkill.titleFa}
                </h4>
                <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
                  <span className="font-medium text-[var(--cpai-text)]">شرط فعال‌سازی خودکار: </span>
                  {activeReadySkill.triggerWhenFa}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button
                  type="button"
                  onClick={() => onDownloadSkillFile('SKILL.md', activeReadySkill.skillMdContent)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Download aria-hidden="true" className="w-4 h-4" />
                  <span>دانلود فایل <bdi dir="ltr">SKILL.md</bdi></span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(activeReadySkill.skillMdContent, `ready_skill_${activeReadySkill.id}`)
                  }
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[var(--cpai-text)] text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {copiedId === `ready_skill_${activeReadySkill.id}` ? (
                    <>
                      <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4" />
                      <span>کپی کل فایل</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Preview */}
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[var(--cpai-muted)]">
                محتوای کامل فایل استاندارد <bdi dir="ltr">SKILL.md</bdi>
              </div>
              <pre
                dir="ltr"
                className="cpai-code-block p-4 overflow-x-auto max-h-72 whitespace-pre-wrap text-left select-text"
              >
                {activeReadySkill.skillMdContent}
              </pre>
            </div>

            {/* Test 1 (Normal) vs Test 2 (Unverified Numbers Trap) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)] space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--cpai-success-text)] flex items-center gap-1.5">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 shrink-0" />
                      <span>{activeReadySkill.test1NormalTitleFa}</span>
                    </span>
                    <span dir="ltr" className="text-xs font-mono text-[var(--cpai-muted)] shrink-0">
                      Test #1
                    </span>
                  </div>
                  <p className="text-[13.5px] bg-[var(--cpai-surface)] p-3.5 rounded-lg border border-[var(--cpai-border)] text-[var(--cpai-text)] leading-[1.75] whitespace-pre-wrap">
                    {activeReadySkill.test1NormalPromptFa}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--cpai-border)] flex-wrap">
                  {onLoadToSandbox && (
                    <button
                      type="button"
                      onClick={() =>
                        onLoadToSandbox(
                          `${activeReadySkill.skillMdContent}\n\n---\nورودی کاربر برای تست ۱:\n${activeReadySkill.test1NormalPromptFa}`
                        )
                      }
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-[var(--cpai-primary-strong)] hover:bg-[var(--cpai-primary-soft)] transition-colors"
                    >
                      <Play aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>ارسال تست ۱ به سندباکس</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(activeReadySkill.test1NormalPromptFa, `test1_${activeReadySkill.id}`)
                    }
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] transition-colors"
                  >
                    {copiedId === `test1_${activeReadySkill.id}` ? (
                      <>
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-success-text)]" />
                        <span>کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                        <span>کپی متن تست ۱</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-[var(--cpai-radius)] bg-[var(--cpai-warning-bg)] border border-[var(--cpai-warning-border)] space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--cpai-warning-text)] flex items-center gap-1.5">
                      <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0" />
                      <span>{activeReadySkill.test2TrapTitleFa}</span>
                    </span>
                    <span dir="ltr" className="text-xs font-mono text-[var(--cpai-warning-text)] shrink-0">
                      Test #2 (Trap)
                    </span>
                  </div>
                  <p className="text-[13.5px] bg-[var(--cpai-surface)] p-3.5 rounded-lg border border-[var(--cpai-warning-border)] text-[var(--cpai-text)] leading-[1.75] whitespace-pre-wrap">
                    {activeReadySkill.test2TrapPromptFa}
                  </p>
                  <p className="text-[13.5px] text-[var(--cpai-warning-text)] leading-[1.7]">
                    <span className="font-semibold">واکنش مورد انتظار اسکیل: </span>
                    {activeReadySkill.expectedTrapBehaviorFa}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--cpai-warning-border)] flex-wrap">
                  {onLoadToSandbox && (
                    <button
                      type="button"
                      onClick={() =>
                        onLoadToSandbox(
                          `${activeReadySkill.skillMdContent}\n\n---\nورودی کاربر برای تست ۲ (تله اعداد تاییدنشده):\n${activeReadySkill.test2TrapPromptFa}`
                        )
                      }
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-[var(--cpai-warning-text)] hover:bg-[var(--cpai-surface)]/70 transition-colors"
                    >
                      <Play aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>ارسال تله ۲ به سندباکس</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(activeReadySkill.test2TrapPromptFa, `test2_${activeReadySkill.id}`)
                    }
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg border border-[var(--cpai-warning-border)] bg-[var(--cpai-surface)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] transition-colors"
                  >
                    {copiedId === `test2_${activeReadySkill.id}` ? (
                      <>
                        <Check aria-hidden="true" className="w-3.5 h-3.5 text-[var(--cpai-success-text)]" />
                        <span>کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="w-3.5 h-3.5" />
                        <span>کپی متن تست ۲</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INTERACTIVE CUSTOM SKILL.MD BUILDER */}
      {labTab === 'builder' && (
        <div className="space-y-5" data-testid="custom-skill-builder">
          <p className="text-sm sm:text-[15px] text-[var(--cpai-muted)] leading-relaxed">
            فیلدهای زیر را متناسب با فرآیند تکراری واحد خود ویرایش کنید تا فایل استاندارد{' '}
            <code dir="ltr" className="font-mono text-[var(--cpai-text)]">SKILL.md</code> به صورت زنده تولید و آماده دانلود یا ارسال به سندباکس شود.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="cpai-skill-name" className="block text-sm font-medium text-[var(--cpai-text)]">
                  ۱. نام انگلیسی اسکیل (با خط تیره، بدون فاصله)
                </label>
                <input
                  id="cpai-skill-name"
                  type="text"
                  dir="ltr"
                  value={customName}
                  onChange={(e) => onChangeCustomName(e.target.value)}
                  placeholder="e.g. weekly-site-report-checker"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-bg)] font-mono text-sm text-[var(--cpai-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cpai-skill-desc" className="block text-sm font-medium text-[var(--cpai-text)]">
                  ۲. شرح مأموریت و شرط فعال‌سازی خودکار (<bdi dir="ltr">Description</bdi>)
                </label>
                <textarea
                  id="cpai-skill-desc"
                  rows={2}
                  value={customDesc}
                  onChange={(e) => onChangeCustomDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-sm leading-relaxed text-[var(--cpai-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cpai-skill-steps" className="block text-sm font-medium text-[var(--cpai-text)]">
                  ۳. مراحل گام‌به‌گام انجام کار (<bdi dir="ltr">Workflow Steps</bdi>)
                </label>
                <textarea
                  id="cpai-skill-steps"
                  rows={3}
                  value={customSteps}
                  onChange={(e) => onChangeCustomSteps(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-sm leading-relaxed text-[var(--cpai-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cpai-skill-output" className="block text-sm font-medium text-[var(--cpai-text)]">
                  ۴. قالب خروجی دلخواه (<bdi dir="ltr">Output Format</bdi>)
                </label>
                <textarea
                  id="cpai-skill-output"
                  rows={2}
                  value={customOutputFormat}
                  onChange={(e) => onChangeCustomOutputFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-sm leading-relaxed text-[var(--cpai-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cpai-skill-trap" className="block text-sm font-medium text-[var(--cpai-warning-text)]">
                  ۵. قانون ضدتوهم و مدیریت تله‌ها (<bdi dir="ltr">Edge Cases & Traps</bdi>)
                </label>
                <textarea
                  id="cpai-skill-trap"
                  rows={2}
                  value={customTrapRule}
                  onChange={(e) => onChangeCustomTrapRule(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-warning-border)] bg-[var(--cpai-warning-bg)] text-sm leading-relaxed text-[var(--cpai-text)]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--cpai-muted)]">
                  <span className="font-medium text-[var(--cpai-text)]">پیش‌نمایش زنده فایل تولیدشده</span>
                  <span dir="ltr" className="font-mono text-[var(--cpai-primary-strong)] truncate">
                    {customName.trim() || 'custom-skill'}/SKILL.md
                  </span>
                </div>
                <pre
                  dir="ltr"
                  className="cpai-code-block p-4 overflow-y-auto h-[340px] whitespace-pre-wrap text-left select-text"
                >
                  {generatedCustomSkillMd}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onDownloadSkillFile('SKILL.md', generatedCustomSkillMd)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors flex-1 whitespace-nowrap"
                >
                  <Download aria-hidden="true" className="w-4 h-4" />
                  <span>دانلود مستقیم <bdi dir="ltr">SKILL.md</bdi></span>
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedCustomSkillMd, 'custom_generated_skill_md')}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[var(--cpai-text)] text-sm font-medium transition-colors flex-1 whitespace-nowrap"
                >
                  {copiedId === 'custom_generated_skill_md' ? (
                    <>
                      <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4" />
                      <span>کپی کد</span>
                    </>
                  )}
                </button>

                {onLoadToSandbox && (
                  <button
                    type="button"
                    onClick={() => onLoadToSandbox(generatedCustomSkillMd)}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)] text-sm font-medium transition-colors w-full sm:w-auto whitespace-nowrap"
                  >
                    <Play aria-hidden="true" className="w-4 h-4" />
                    <span>ارسال به سندباکس</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ANATOMY OF SKILL.MD + ZERO-CODE META PROMPT */}
      {labTab === 'anatomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-testid="skill-anatomy-view">
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-base font-semibold text-[var(--cpai-text)]">
              کالبدشکافی ۵ بخش اجباری یک <bdi dir="ltr">SKILL.md</bdi> استاندارد
            </h4>
            <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
              هر اسکیل یک پوشه ساده است که قلب تپنده آن فایلی دقیقاً با نام{' '}
              <code dir="ltr" className="font-mono text-[var(--cpai-primary-strong)]">SKILL.md</code> است:
            </p>
            <ol className="space-y-3 text-sm leading-[1.75] text-[var(--cpai-text)]">
              <li className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary-soft)] border border-[var(--cpai-primary)]/40">
                <strong className="font-semibold block mb-0.5">
                  ۱. شناسنامه و شرط فعال‌سازی (<bdi dir="ltr">YAML Frontmatter</bdi>)
                </strong>
                شامل <code dir="ltr" className="font-mono">name</code> و{' '}
                <code dir="ltr" className="font-mono">description</code>. مدل در شروع چت فقط این دو خط را می‌بیند تا هوشمندانه تصمیم به فراخوانی بگیرد.
              </li>
              <li className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)]">
                <strong className="font-semibold block mb-0.5">
                  ۲. هدف و نقش تخصصی (<bdi dir="ltr">Role & Objective</bdi>)
                </strong>
                تعیین پرسونا و زاویه دید تخصصی بدون حاشیه‌پردازی.
              </li>
              <li className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)]">
                <strong className="font-semibold block mb-0.5">
                  ۳. گام‌های پردازش (<bdi dir="ltr">Step-by-Step Workflow</bdi>)
                </strong>
                ترتیب منطقی اعتبارسنجی‌ها قبل از پاسخگویی.
              </li>
              <li className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)]">
                <strong className="font-semibold block mb-0.5">
                  ۴. قالب خروجی ثابت (<bdi dir="ltr">Strict Output Format</bdi>)
                </strong>
                قالب جدول‌ها و تیترهایی که باید ۱۰۰٪ بدون تغییر رعایت شوند.
              </li>
              <li className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-warning-bg)] border border-[var(--cpai-warning-border)]">
                <strong className="font-semibold block mb-0.5 text-[var(--cpai-warning-text)]">
                  ۵. تله‌های ضدتوهم (<bdi dir="ltr">Edge Cases & Traps</bdi>)
                </strong>
                مدیریت شرایط عدم‌قطعیت و قانون تله اعداد تاییدنشده.
              </li>
            </ol>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-base font-semibold text-[var(--cpai-text)]">
                  روش ساخت خودکار با پرامپت متا
                </h4>
                <span dir="ltr" className="text-xs font-mono text-[var(--cpai-muted)]">
                  Meta-Skill Prompt
                </span>
              </div>
              <p className="text-sm text-[var(--cpai-muted)] leading-relaxed">
                پرامپت زیر را کپی کنید، شرح کار تکراری‌تان را جایگزین کنید و به مدل بدهید تا فایل کامل{' '}
                <code dir="ltr" className="font-mono">SKILL.md</code> را برایتان بسازد:
              </p>
              <pre
                dir="rtl"
                className="cpai-code-block p-4 max-h-60 overflow-y-auto whitespace-pre-wrap text-right select-text"
              >
                {metaSkillBuilderPrompt}
              </pre>
            </div>

            <div className="space-y-3 pt-2 border-t border-[var(--cpai-border)]">
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => copyToClipboard(metaSkillBuilderPrompt, 'meta_skill_builder_prompt')}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  {copiedId === 'meta_skill_builder_prompt' ? (
                    <>
                      <Check aria-hidden="true" className="w-4 h-4" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4" />
                      <span>کپی پرامپت متا</span>
                    </>
                  )}
                </button>

                {onLoadToSandbox && (
                  <button
                    type="button"
                    onClick={() => onLoadToSandbox(metaSkillBuilderPrompt)}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)] text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Play aria-hidden="true" className="w-4 h-4" />
                    <span>ارسال به سندباکس</span>
                  </button>
                )}
              </div>

              <div className="p-3.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-bg)] border border-[var(--cpai-border)] text-xs sm:text-sm text-[var(--cpai-text)] space-y-1 leading-relaxed">
                <div className="font-semibold text-[var(--cpai-primary-strong)]">مسیر نصب در ابزارها:</div>
                <div>
                  • <bdi dir="ltr">Claude:</bdi> <bdi dir="ltr">Settings &gt; Capabilities &gt; Skills</bdi> یا پوشه{' '}
                  <code dir="ltr" className="font-mono">.claude/skills/</code>
                </div>
                <div>
                  • <bdi dir="ltr">ChatGPT / Gemini:</bdi> آپلود در <bdi dir="ltr">Project Files</bdi> یا{' '}
                  <bdi dir="ltr">Gem Knowledge</bdi>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
