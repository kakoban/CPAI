import React, { useState } from 'react';
import {
  Bot,
  Check,
  Copy,
  Download,
  ExternalLink,
  Factory,
  FolderKanban,
  Landmark,
  Play,
  Train
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import { IndustryTrackId } from '../../types/industryTrack';
import { ContractSpecimen } from '../../data/engineering_sample_contracts';
import { FocusedModuleDeck, FocusedModuleDeckStep } from '../learning/FocusedModuleDeck';
import { ContractAuditArchitectureDiagram, DiagramWrapper } from '../visuals/EngineeringVisualDiagrams';

interface ContractsAndGemsModuleProps {
  lang: Language;
  industryTrack: IndustryTrackId;
  trackContracts: ContractSpecimen[];
  selectedContractId: string;
  onSelectContractId: (id: string) => void;
  downloadTextFile: (filename: string, text: string, mimeType: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  loadPromptToSandbox: (prompt: string) => void;
  openCompanionWindow: (url: string, name: string) => void;
}

export const ContractsAndGemsModule: React.FC<ContractsAndGemsModuleProps> = ({
  lang,
  industryTrack,
  trackContracts,
  selectedContractId,
  onSelectContractId,
  downloadTextFile,
  copyToClipboard,
  copiedId,
  loadPromptToSandbox,
  openCompanionWindow
}) => {
  const isFa = lang === 'fa';
  const [contractCopied, setContractCopied] = useState(false);
  const [instructionCopiedId, setInstructionCopiedId] = useState<string | null>(null);

  const currentContract = trackContracts.find((c) => c.id === selectedContractId) || trackContracts[0];
  const geminiInst = isFa ? currentContract.geminiSystemInstructionFa : currentContract.geminiSystemInstructionEn;
  const claudeInst = isFa ? currentContract.claudeSystemInstructionFa : currentContract.claudeSystemInstructionEn;

  const renderContractSelectorBar = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {trackContracts.map((contract) => {
        const isSelected = contract.id === currentContract.id;
        return (
          <button
            key={contract.id}
            type="button"
            onClick={() => onSelectContractId(contract.id)}
            className={`p-3.5 rounded-[var(--cpai-radius)] border text-right transition-colors cursor-pointer flex flex-col justify-between gap-2 ${
              isSelected
                ? 'border-[var(--cpai-primary)] bg-[var(--cpai-primary-soft)]'
                : 'border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] hover:border-[var(--cpai-primary)]/50'
            }`}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {contract.id === 'metro_tunnel_contract' && (
                  <Train className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                )}
                {contract.id === 'oil_gas_epc_contract' && (
                  <Factory className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                )}
                {contract.id.startsWith('paya_') && (
                  <Landmark className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                )}
                <span className="font-bold text-xs sm:text-sm text-[var(--cpai-text)] truncate">
                  {isFa ? contract.titleFa : contract.titleEn}
                </span>
              </div>
              {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[var(--cpai-primary)] shrink-0" />}
            </div>
            <span className="text-[11px] text-[var(--cpai-muted)]">
              {isFa ? contract.governingStandardFa : contract.governingStandardEn}
            </span>
          </button>
        );
      })}
    </div>
  );

  const steps: FocusedModuleDeckStep[] = [
    {
      id: 's3-1-architecture',
      title: isFa ? 'معماری ۳ ستونه ممیزی قرارداد و انتخاب پرونده نمونه' : '3-Pillar Contract Audit Architecture',
      category: isFa ? 'معماری حقوقی و ادعا' : 'Audit Architecture',
      subtitle: isFa
        ? 'درک ساختار ممیزی قرارداد، تاخیرات و ادعاها پیش از ساخت دستیار'
        : 'Understand the 3-pillar contract audit architecture and choose a specimen contract',
      content: (
        <div className="space-y-5">
          <DiagramWrapper
            titleFa="اینفوگرافیک تصویری: معماری ۳ ستونه ممیزی قرارداد، تاخیرات و ادعاها (Claims) با هوش مصنوعی"
            titleEn="Visual Infographic: 3-Pillar AI Contract & Delay Claims Audit Architecture"
            badgeFa="معماری حقوقی و ادعا"
            lang={lang}
          >
            <ContractAuditArchitectureDiagram lang={lang} />
          </DiagramWrapper>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-[var(--cpai-muted)]">
              {isFa ? 'قرارداد نمونه فعال برای تمرین‌های گام‌های بعدی را انتخاب کنید:' : 'Select active specimen contract:'}
            </div>
            {renderContractSelectorBar()}
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'تفکیک متن قرارداد (Knowledge) از نقش و قوانین پاسخ‌گویی (System Instruction) پایه ساخت یک دستیار حقوقی بدون توهم است.'
        : 'Separating contract documents (Knowledge) from System Instructions is the foundation of a zero-hallucination legal assistant.'
    },
    {
      id: 's3-1-contract-md',
      title: isFa ? 'دانلود و بررسی متن کامل قرارداد نمونه (.md)' : 'Download & Inspect Specimen Contract (.md)',
      category: isFa ? 'فایل دانش (Knowledge)' : 'Contract Knowledge File',
      subtitle: `${currentContract.fileName} · ${isFa ? currentContract.governingStandardFa : currentContract.governingStandardEn}`,
      content: (
        <div className="space-y-4">
          {renderContractSelectorBar()}

          <div className="rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] overflow-hidden">
            <div className="p-4 bg-[var(--cpai-surface-subtle)] border-b border-[var(--cpai-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <h4 className="font-bold text-sm text-[var(--cpai-text)]">
                  {isFa ? currentContract.titleFa : currentContract.titleEn}
                </h4>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa ? currentContract.summaryFa : currentContract.summaryEn}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    downloadTextFile(
                      currentContract.fileName,
                      currentContract.markdownContent,
                      'text/markdown;charset=utf-8;'
                    )
                  }
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isFa ? 'دانلود فایل قرارداد (.md)' : 'Download Contract (.md)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(currentContract.markdownContent, 'contract_md_' + currentContract.id);
                    setContractCopied(true);
                    setTimeout(() => setContractCopied(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-xs font-medium text-[var(--cpai-text)] cursor-pointer"
                >
                  {contractCopied ? <Check className="w-3.5 h-3.5 text-[var(--cpai-primary)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{contractCopied ? (isFa ? 'متن کپی شد' : 'Copied') : isFa ? 'کپی متن کامل قرارداد' : 'Copy Full Contract'}</span>
                </button>
              </div>
            </div>
            <div className="p-4 bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] max-h-80 overflow-y-auto font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {currentContract.markdownContent}
            </div>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'بارگذاری فایل قرارداد با فرمت Markdown (.md) باعث می‌شود مدل شماره مواد، تبصره‌ها و جداول جرایم را بدون خطای OCR بخواند.'
        : 'Uploading contracts in clean Markdown ensures accurate article and clause citations without OCR errors.'
    },
    {
      id: 's3-1-instructions',
      title: isFa ? 'دستورالعمل سیستمی اختصاصی برای Gemini Gems و Claude Projects' : 'System Instructions for Gems & Projects',
      category: isFa ? 'تنظیم دستیار مقیم' : 'System Instructions',
      content: (
        <div className="space-y-4">
          {renderContractSelectorBar()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gemini Gem */}
            <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[var(--cpai-primary-strong)]">
                    <Bot className="w-4 h-4 shrink-0" />
                    <h4 className="font-bold text-sm">
                      {isFa ? 'دستورالعمل سیستمی Gemini Gems' : 'Gemini Gems System Instruction'}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'این متن را در بخش Instructions جمینای Gem کپی کرده و فایل قرارداد MD را در بخش دانش (Knowledge) بارگذاری کنید.'
                    : 'Paste this prompt in Gemini Gem Instructions and upload the MD contract file as Knowledge.'}
                </p>
                <div className="p-3 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed">
                  <pre className="whitespace-pre-wrap">{geminiInst}</pre>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)]">
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(geminiInst, 'gem_inst_' + currentContract.id);
                    setInstructionCopiedId('gem_' + currentContract.id);
                    setTimeout(() => setInstructionCopiedId(null), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                >
                  {instructionCopiedId === 'gem_' + currentContract.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {instructionCopiedId === 'gem_' + currentContract.id
                      ? isFa
                        ? 'دستورالعمل کپی شد!'
                        : 'Copied!'
                      : isFa
                      ? 'کپی دستورالعمل Gem'
                      : 'Copy Gem Instruction'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline cursor-pointer"
                >
                  <span>Gemini Gems</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Claude Projects */}
            <div className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[var(--cpai-primary-strong)]">
                    <FolderKanban className="w-4 h-4 shrink-0" />
                    <h4 className="font-bold text-sm">
                      {isFa ? 'دستورالعمل سیستمی Claude Projects' : 'Claude Projects Custom Instructions'}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {isFa
                    ? 'این متن را در بخش Custom Instructions پروژه کلود کپی کرده و فایل قرارداد MD را در Project Knowledge بارگذاری کنید.'
                    : 'Paste this in Claude Project Instructions and upload the MD contract file into Project Knowledge.'}
                </p>
                <div className="p-3 rounded-lg bg-[var(--cpai-code-bg)] text-[var(--cpai-code-text)] max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed">
                  <pre className="whitespace-pre-wrap">{claudeInst}</pre>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)]">
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(claudeInst, 'claude_inst_' + currentContract.id);
                    setInstructionCopiedId('claude_' + currentContract.id);
                    setTimeout(() => setInstructionCopiedId(null), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                >
                  {instructionCopiedId === 'claude_' + currentContract.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {instructionCopiedId === 'claude_' + currentContract.id
                      ? isFa
                        ? 'دستورالعمل کپی شد!'
                        : 'Copied!'
                      : isFa
                      ? 'کپی دستورالعمل Project'
                      : 'Copy Project Instruction'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline cursor-pointer"
                >
                  <span>Claude Projects</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'در هر دو پلتفرم Gemini Gems و Claude Projects، الزام به استناد دقیق به شماره ماده باعث حذف پاسخ‌های کلی و غیرحقوقی می‌شود.'
        : 'Requiring exact article citations in both Gems and Projects eliminates vague or ungrounded legal responses.'
    },
    {
      id: 's3-1-queries',
      title: isFa ? 'پرسش‌های نمونه برای آزمون ادعاها و تاخیرات' : 'Sample Claims & Delay Audit Queries',
      category: isFa ? 'تست و ارزیابی دستیار' : 'Test Prompts',
      content: (
        <div className="space-y-4">
          {renderContractSelectorBar()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {currentContract.sampleTestQueries.map((q, qIdx) => {
              const activeQueryText = isFa ? q.queryFa : q.queryEn;
              const queryKey = `contract_q_${currentContract.id}_${qIdx}`;
              const isCopied = copiedId === queryKey;

              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)] flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-[var(--cpai-text)] leading-snug">
                      {isFa ? q.titleFa : q.titleEn}
                    </h5>
                    <p className="text-xs text-[var(--cpai-muted)] font-mono leading-relaxed bg-[var(--cpai-surface)] p-3 rounded-lg border border-[var(--cpai-border)]">
                      {activeQueryText}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--cpai-border)]">
                    <button
                      type="button"
                      onClick={() => loadPromptToSandbox(activeQueryText)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{isFa ? 'ارسال به سندباکس' : 'Sandbox'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeQueryText, queryKey)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? (isFa ? 'کپی شد' : 'Copied') : isFa ? 'کپی پرامپت' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
      takeaway: isFa
        ? 'پس از ساخت دستیار، حتماً هر ۳ پرسش نمونه را آزمایش کنید و بررسی نمایید آیا شماره مواد دقیقاً با متن قرارداد تطابق دارد یا خیر.'
        : 'Test your newly created assistant with all 3 queries and verify every cited clause against the source contract.'
    },
    {
      id: 's3-1-setup-guide',
      title: isFa ? 'راهنمای ۴ مرحله‌ای ساخت دستیار قرارداد در کلاس درس' : '4-Step Classroom Setup Guide',
      category: isFa ? 'چک‌لیست اجرا' : 'Classroom Checklist',
      content: (
        <ol className="space-y-3 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--cpai-text)]">
          {[
            isFa
              ? 'فایل قرارداد MD را از گام ۲ دانلود کنید و در سیستم خود نگه دارید.'
              : 'Download the MD contract file from Step 2.',
            isFa
              ? 'در Claude به منوی Projects → New Project بروید (یا در Gemini به منوی Gems → New Gem).'
              : 'In Claude go to Projects → New Project (or in Gemini to Gems → New Gem).',
            isFa
              ? 'فایل قرارداد MD را در بخش فایل‌های دانش (Project Knowledge / Files) بارگذاری کنید.'
              : 'Upload the downloaded MD contract file into Project Knowledge / Files.',
            isFa
              ? 'دستورالعمل سیستمی (System Instruction) گام ۳ را کپی کرده و در بخش Instructions ذخیره کنید؛ دستیار اختصاصی شما آماده پاسخ‌گویی به دعاوی و تاخیرات است!'
              : 'Paste the System Instruction from Step 3 and save; your specialized contract advisor is live!'
          ].map((item, idx) => (
            <li
              key={idx}
              className="p-4 rounded-[var(--cpai-radius)] bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-md bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                {isFa ? (idx + 1).toLocaleString('fa-IR') : idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ),
      takeaway: isFa
        ? 'پس از ذخیره این دستیار در Gem یا Project، هر زمان الحاقیه جدیدی به قرارداد اضافه شد فقط فایل جدید را به Knowledge اضافه کنید.'
        : 'Whenever a contract addendum arrives, simply upload it to the same Knowledge base to keep your advisor current.'
    }
  ];

  return (
    <FocusedModuleDeck
      lang={lang}
      testId="session3-contracts-gems-module"
      moduleCode={isFa ? 'ماژول ۳-۱' : 'Module 3-1'}
      moduleTitle={
        isFa
          ? industryTrack === 'PAYA_SAMAN_PARS'
            ? 'کارگاه ممیزی قراردادهای EPC+F، BOT و کنسرسیوم هلدینگ پایا سامان پارس در Gems و Projects'
            : 'کارگاه تحلیل قراردادهای EPC (مترو و نفت‌وگاز) و ساخت دستیار در Gems و Projects'
          : 'Specimen Engineering Contracts & Custom Assistant Setup in Gems & Projects'
      }
      moduleSubtitle={
        isFa
          ? 'دانلود متن کامل قراردادها (.md)، دستورالعمل سیستمی Gemini Gems و Claude Projects و پرسش‌های آزمون ادعاها'
          : 'Download Markdown contracts, System Instructions for Gems & Projects, and claims test queries'
      }
      steps={steps}
    />
  );
};
