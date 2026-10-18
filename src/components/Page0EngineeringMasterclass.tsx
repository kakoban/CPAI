import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  Camera,
  Users,
  Workflow,
  Target,
  Brain,
  Globe,
  FileSpreadsheet,
  Shield,
  Copy,
  Check,
  Play,
  Lightbulb,
  AlertTriangle,
  Code,
  Layers,
  ArrowRight,
  ArrowLeft,
  FileJson,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  VISION_CASES,
  NEGOTIATION_SIMULATOR,
  MERMAID_EXAMPLES,
  FEW_SHOT_GUIDE,
  REASONING_GUIDE,
  WEB_GROUNDING_GUIDE,
  STRUCTURED_P6_GUIDE,
  ANTI_HALLUCINATION_POWER_WORDS
} from '../data/engineering_advanced_masterclass';

interface Page0EngineeringMasterclassProps {
  lang: Language;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const Page0EngineeringMasterclass: React.FC<Page0EngineeringMasterclassProps> = ({
  lang,
  onLoadToSandbox,
  copyToClipboard,
  copiedId
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'vision' | 'negotiation' | 'mermaid' | 'few_shot' | 'reasoning' | 'web_grounding' | 'p6_excel' | 'power_words'
  >('vision');

  const [selectedVisionId, setSelectedVisionId] = useState<string>('vision_hse_excavation');
  const [selectedMermaidId, setSelectedMermaidId] = useState<string>('mermaid_wbs_metro');
  const [selectedWebIndex, setSelectedWebIndex] = useState<number>(0);
  const [allClausesCopied, setAllClausesCopied] = useState<boolean>(false);

  const activeVisionCase = VISION_CASES.find((v) => v.id === selectedVisionId) || VISION_CASES[0];
  const activeMermaid = MERMAID_EXAMPLES.find((m) => m.id === selectedMermaidId) || MERMAID_EXAMPLES[0];
  const activeWeb = WEB_GROUNDING_GUIDE.prompts[selectedWebIndex] || WEB_GROUNDING_GUIDE.prompts[0];

  const handleCopyAllClauses = () => {
    const combined = ANTI_HALLUCINATION_POWER_WORDS.clauses
      .map(
        (c, idx) =>
          `[شرط ${idx + 1}: ${c.titleFa}]\n${c.clauseFa}\n(Rationale: ${c.rationaleFa})\n`
      )
      .join('\n---\n\n');
    copyToClipboard(combined, 'all_clauses');
    setAllClausesCopied(true);
    setTimeout(() => setAllClausesCopied(false), 2500);
  };

  return (
    <section className="space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#6d28d9]/20 to-[#8b5cf6]/20 text-[#6d28d9] dark:text-[#a78bfa] border border-[#6d28d9]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa'
                  ? 'بخش ۸: مسترکلاس ابرقدرت‌های مهندسی با هوش مصنوعی (۸ ابزار تحول‌آفرین)'
                  : 'Section 8: Advanced Engineering Superpowers Masterclass (8 Game-Changing Tools)'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#6d28d9]/10 text-[#6d28d9] dark:text-[#a78bfa] border border-[#6d28d9]/30">
                PRO / MASTERCLASS
              </span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'تحلیل تصویری کارگاه، شبیه‌ساز لایحه تاخیرات با کارفرما، تولید دیاگرام Mermaid، استدلال عمیق، و فرمول‌های ضد توهم.'
                : 'Computer vision, claim defense simulator, live Mermaid diagrams in Artifacts, deep reasoning, and anti-hallucination.'}
            </p>
          </div>
        </div>
      </div>

      {/* 8-Tab Navigation Bar (Double-Bezel Island) */}
      <div className="p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xs shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveSubTab('vision')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'vision'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۱. بینایی و نقشه‌ها' : '1. Vision & CAD'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('negotiation')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'negotiation'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۲. شبیه‌ساز ادعا' : '2. Claim Sim'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('mermaid')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'mermaid'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۳. دیاگرام Mermaid' : '3. Mermaid'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('few_shot')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'few_shot'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۴. متد چندمثاله' : '4. Few-Shot'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('reasoning')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'reasoning'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۵. استدلال عمیق' : '5. Reasoning'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('web_grounding')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'web_grounding'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۶. وب‌گراندینگ' : '6. Web Search'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('p6_excel')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'p6_excel'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۷. داده برای P6' : '7. P6 & Excel'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('power_words')}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-150 active:scale-[0.96] ${
              activeSubTab === 'power_words'
                ? 'bg-[#6d28d9] text-white shadow-xs font-bold'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-[#ffffff] dark:hover:bg-[#12171b]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-center truncate w-full">{lang === 'fa' ? '۸. کلمات جادویی' : '8. Zero Halluc'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: MULTIMODAL VISION */}
      {activeSubTab === 'vision' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#6d28d9]/10 via-[#8b5cf6]/10 to-transparent border border-[#6d28d9]/20 flex items-start gap-3">
            <Camera className="w-5 h-5 text-[#6d28d9] dark:text-[#a78bfa] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? 'انقلاب بینایی ماشین در مهندسی (Multimodal Vision)'
                  : 'Multimodal Computer Vision in Civil & Industrial Engineering'}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'مدل‌های Claude 3.5/3.7 Sonnet و Gemini 1.5/2.0 Pro عکس‌های کارگاهی، دیاگرام‌های P&ID و نقشه‌های فاز ۲ را مستقیماً تحلیل می‌کنند. دیگر نیازی به تایپ دستی گزارش‌های بازرسی نیست!'
                  : 'Modern LLMs inspect high-res site photos, blueprints, and P&ID diagrams with precision. No more manual transcription of inspection logs.'}
              </p>
            </div>
          </div>

          {/* Case Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {VISION_CASES.map((vc) => (
              <button
                key={vc.id}
                type="button"
                onClick={() => setSelectedVisionId(vc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedVisionId === vc.id
                    ? 'bg-[#1f5163] text-white shadow-xs'
                    : 'bg-[#ffffff] dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1]'
                }`}
              >
                {lang === 'fa' ? vc.titleFa : vc.titleEn}
              </button>
            ))}
          </div>

          {/* Active Vision Card */}
          <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                  {lang === 'fa' ? activeVisionCase.categoryFa : activeVisionCase.categoryEn}
                </span>
                <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mt-1">
                  {lang === 'fa' ? activeVisionCase.titleFa : activeVisionCase.titleEn}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">{lang === 'fa' ? 'مدل‌های پیشنهادی:' : 'Compatible:'}</span>
                {activeVisionCase.targetTools.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border border-[#d9dad5] dark:border-[#2d3942]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Photo Scenario */}
            <div className="p-3 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'سناریوی تصویر ارسالی در کلاس:' : 'Sample Image Scenario:'}</span>
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa' ? activeVisionCase.sampleImageDescriptionFa : activeVisionCase.sampleImageDescriptionEn}
              </p>
            </div>

            {/* Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'متن پرامپت تصویری (Prompt to accompany image):' : 'Vision Prompt Text:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLoadToSandbox(lang === 'fa' ? activeVisionCase.promptFa : activeVisionCase.promptEn)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>{lang === 'fa' ? 'تست در سندباکس' : 'Load Sandbox'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(lang === 'fa' ? activeVisionCase.promptFa : activeVisionCase.promptEn, activeVisionCase.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      copiedId === activeVisionCase.id
                        ? 'bg-[#2f7d5b] text-white'
                        : 'bg-[#6d28d9] hover:bg-[#5b21b6] text-white'
                    }`}
                  >
                    {copiedId === activeVisionCase.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#1c2830] dark:text-[#e8ebe9] max-h-60 overflow-y-auto">
                {lang === 'fa' ? activeVisionCase.promptFa : activeVisionCase.promptEn}
              </pre>
            </div>

            {/* Expected Highlights */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#5d6b73] dark:text-[#9aa8b0] block">
                {lang === 'fa' ? 'خروجی‌های کلیدی که هوش مصنوعی استخراج خواهد کرد:' : 'Key Model Extraction Highlights:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(lang === 'fa' ? activeVisionCase.expectedOutputHighlightsFa : activeVisionCase.expectedOutputHighlightsEn).map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2f7d5b] shrink-0" />
                      <span>{h}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CLAIM NEGOTIATION SIMULATOR */}
      {activeSubTab === 'negotiation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#b91c1c]/10 via-[#ef4444]/10 to-transparent border border-[#b91c1c]/20 flex items-start gap-3">
            <Users className="w-5 h-5 text-[#b91c1c] dark:text-[#f87171] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? 'شبیه‌ساز جلسه دفاع ادعا و تاخیرات با کارفرما (Devil’s Advocate)'
                  : 'AI Claim Defense Negotiation Simulator (Adversarial Client Persona)'}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'قبل از حضور در جلسه سرنوشت‌ساز لایحه تاخیرات با کارفرما، هوش مصنوعی را در نقش «مهندس ناصری - مدیر سخت‌گیر قراردادهای کارفرما» قرار دهید تا استدلال‌های شما را به چالش بکشد و نقاط کور پرونده را فاش سازد.'
                  : 'Stress-test your claim arguments against a tough AI adversary simulating the Employer’s senior claim manager.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left 2 Cols: Persona & System Prompt */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#b91c1c]/10 text-[#b91c1c] dark:text-[#f87171]">
                      System Prompt / Persona
                    </span>
                    <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mt-1">
                      {lang === 'fa' ? 'دستورالعمل سیستمی شبیه‌ساز (پیکربندی چت‌بات کارفرما):' : 'Simulator System Instructions:'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(NEGOTIATION_SIMULATOR.simulatorSystemPromptFa, 'neg_system')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      copiedId === 'neg_system' ? 'bg-[#2f7d5b] text-white' : 'bg-[#b91c1c] hover:bg-[#991b1b] text-white'
                    }`}
                  >
                    {copiedId === 'neg_system' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی دستورالعمل سیستم' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#1c2830] dark:text-[#e8ebe9] max-h-56 overflow-y-auto">
                  {NEGOTIATION_SIMULATOR.simulatorSystemPromptFa}
                </pre>
              </div>

              {/* Starter Prompt to Test */}
              <div className="p-4 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'سناریوی پیام افتتاحیه پیمانکار (Starter Pitch):' : 'Sample Opening Pitch:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(NEGOTIATION_SIMULATOR.starterQueryFa, 'neg_pitch')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      copiedId === 'neg_pitch' ? 'bg-[#2f7d5b] text-white' : 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                    }`}
                  >
                    {copiedId === 'neg_pitch' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'کپی پیام اول' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed italic">
                  "{NEGOTIATION_SIMULATOR.starterQueryFa}"
                </div>
              </div>
            </div>

            {/* Right Col: Coaching Tips */}
            <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-2">
                <Lightbulb className="w-4 h-4 text-[#fbbf24]" />
                <span>{lang === 'fa' ? '۴ اصل کلیدی دفاع در جلسات کارفرما:' : '4 Golden Defense Rules:'}</span>
              </span>
              <div className="space-y-2.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {NEGOTIATION_SIMULATOR.coachingTipsFa.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b]">
                    <span className="font-extrabold text-[#b91c1c] dark:text-[#f87171]">{idx + 1}.</span>
                    <span className="leading-relaxed text-[#1c2830] dark:text-[#e8ebe9]">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MERMAID ENGINEERING DIAGRAMS */}
      {activeSubTab === 'mermaid' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#00738c]/10 via-[#0a7b97]/10 to-transparent border border-[#00738c]/20 flex items-start gap-3">
            <Workflow className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? 'رندر زنده دیاگرام‌های مهندسی با کد Mermaid در Claude Artifacts'
                  : 'Live Engineering Diagrams in Claude Artifacts via Mermaid.js'}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'کلود می‌تواند با کد سبک Mermaid، دیاگرام‌های سازمانی، مسیر بحرانی (CPM)، ساختار WBS و فلوچارت‌های حل اختلاف را به شکل زنده در پنجره Artifacts رسم کند و خروجی SVG بدون نیاز به Visio به شما بدهد!'
                  : 'Generate interactive WBS, CPM networks, and dispute ladders inside Claude Artifacts without Visio.'}
              </p>
            </div>
          </div>

          {/* Diagram Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {MERMAID_EXAMPLES.map((me) => (
              <button
                key={me.id}
                type="button"
                onClick={() => setSelectedMermaidId(me.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedMermaidId === me.id
                    ? 'bg-[#00738c] text-white shadow-xs'
                    : 'bg-[#ffffff] dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1]'
                }`}
              >
                {lang === 'fa' ? me.titleFa : me.titleEn}
              </button>
            ))}
          </div>

          {/* Active Mermaid View */}
          <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                  {lang === 'fa' ? activeMermaid.categoryFa : activeMermaid.categoryEn}
                </span>
                <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mt-1">
                  {lang === 'fa' ? activeMermaid.titleFa : activeMermaid.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(lang === 'fa' ? activeMermaid.promptFa : activeMermaid.promptEn)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'سندباکس' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeMermaid.mermaidCode, `code_${activeMermaid.id}`)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === `code_${activeMermaid.id}`
                      ? 'bg-[#2f7d5b] text-white'
                      : 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                  }`}
                >
                  {copiedId === `code_${activeMermaid.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی کد Mermaid' : 'Copy Mermaid'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt for Claude */}
            <div className="p-3 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'پرامپت درخواست دیاگرام از Claude در کلاس:' : 'Claude Prompt:'}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa' ? activeMermaid.promptFa : activeMermaid.promptEn}
              </p>
            </div>

            {/* Mermaid Syntax Code Block */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? 'کد Mermaid تولیدشده (قابل رندر در Claude Artifacts یا Notion/GitHub):' : 'Mermaid Syntax:'}
              </span>
              <pre className="p-3.5 rounded-xl bg-[#1e293b] text-[#38bdf8] border border-[#334155] text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto dir-ltr">
                {activeMermaid.mermaidCode}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FEW-SHOT PROMPTING */}
      {activeSubTab === 'few_shot' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2f7d5b]/10 via-[#10b981]/10 to-transparent border border-[#2f7d5b]/20 flex items-start gap-3">
            <Target className="w-5 h-5 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? FEW_SHOT_GUIDE.titleFa
                  : FEW_SHOT_GUIDE.titleEn}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa' ? FEW_SHOT_GUIDE.descriptionFa : FEW_SHOT_GUIDE.descriptionEn}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#63c496]">
                  2-Shot Pattern Template
                </span>
                <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'الگوی پرامپت ۲ مثاله برای یادگیری درون‌متنی مدل (In-Context Learning):' : 'Few-Shot Learning Prompt:'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(FEW_SHOT_GUIDE.promptTemplateFa)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'سندباکس' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(FEW_SHOT_GUIDE.promptTemplateFa, 'fewshot_tmpl')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === 'fewshot_tmpl' ? 'bg-[#2f7d5b] text-white' : 'bg-[#2f7d5b] hover:bg-[#236348] text-white'
                  }`}
                >
                  {copiedId === 'fewshot_tmpl' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی کل الگو' : 'Copy Template'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#1c2830] dark:text-[#e8ebe9] max-h-72 overflow-y-auto">
              {FEW_SHOT_GUIDE.promptTemplateFa}
            </pre>

            <div className="p-3 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#00738c] shrink-0" />
              <span>{lang === 'fa' ? FEW_SHOT_GUIDE.explanationFa : FEW_SHOT_GUIDE.explanationEn}</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: REASONING MODELS */}
      {activeSubTab === 'reasoning' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#d97706]/10 via-[#f59e0b]/10 to-transparent border border-[#d97706]/20 flex items-start gap-3">
            <Brain className="w-5 h-5 text-[#d97706] dark:text-[#fbbf24] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? REASONING_GUIDE.titleFa
                  : REASONING_GUIDE.titleEn}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa' ? REASONING_GUIDE.paradigmShiftFa : REASONING_GUIDE.paradigmShiftEn}
              </p>
            </div>
          </div>

          {/* DOs & DONTs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DOs */}
            <div className="p-4 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#2f7d5b]/40 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#2f7d5b] dark:text-[#63c496] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'fa' ? 'بایدها در مدل‌های استدلالی (o1 / o3 / Thinking):' : 'DOs in Reasoning Models:'}</span>
              </span>
              <ul className="text-xs space-y-1.5 text-[#5d6b73] dark:text-[#9aa8b0]">
                {REASONING_GUIDE.dosFa.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2f7d5b] font-bold">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTs */}
            <div className="p-4 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#b91c1c]/40 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#b91c1c] dark:text-[#f87171] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{lang === 'fa' ? 'نبایدها (اشتباهات رایج):' : 'DONTs (Common Traps):'}</span>
              </span>
              <ul className="text-xs space-y-1.5 text-[#5d6b73] dark:text-[#9aa8b0]">
                {REASONING_GUIDE.dontsFa.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#b91c1c] font-bold">✗</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Case Study */}
          <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#d97706]/10 text-[#d97706] dark:text-[#fbbf24]">
                  Real-World Calculation Case Study
                </span>
                <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mt-1">
                  {lang === 'fa' ? 'پرامپت مهندسی بهینه‌شده برای تحلیل تاخیرات همپوشان (TIA):' : 'Optimized Concurrent Delay Prompt:'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(REASONING_GUIDE.caseStudyFa.optimizedReasoningPromptFa)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'سندباکس' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(REASONING_GUIDE.caseStudyFa.optimizedReasoningPromptFa, 'reasoning_prompt')
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === 'reasoning_prompt' ? 'bg-[#2f7d5b] text-white' : 'bg-[#d97706] hover:bg-[#b45309] text-white'
                  }`}
                >
                  {copiedId === 'reasoning_prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#1c2830] dark:text-[#e8ebe9] max-h-60 overflow-y-auto">
              {REASONING_GUIDE.caseStudyFa.optimizedReasoningPromptFa}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: WEB GROUNDING */}
      {activeSubTab === 'web_grounding' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1a73e8]/10 via-[#00738c]/10 to-transparent border border-[#1a73e8]/20 flex items-start gap-3">
            <Globe className="w-5 h-5 text-[#1a73e8] dark:text-[#60a5fa] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? 'اتصال زنده به اینترنت (Web Grounding) جهت استخراج شاخص‌ها و بخشنامه‌ها'
                  : 'Live Web Grounding: Real-time Circulars & Price Adjustments'}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'چگونه با ابزار جستجوی وب جمینای و چت‌جی‌پی‌تی، آخرین بخشنامه‌های ابلاغی سازمان برنامه و بودجه (شاخص‌های تعدیل سه ماهه و نوسان ارز) را بدون توهم دریافت کنیم.'
                  : 'Instruct ChatGPT Web & Gemini Google Search to fetch verified Plan & Budget Organization indices.'}
              </p>
            </div>
          </div>

          {/* Prompt Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {WEB_GROUNDING_GUIDE.prompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedWebIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedWebIndex === idx
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-[#ffffff] dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5] dark:border-[#2d3942] hover:bg-[#f4f4f1]'
                }`}
              >
                {lang === 'fa' ? p.topicFa : p.topicEn}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-3">
              <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? activeWeb.topicFa : activeWeb.topicEn}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadToSandbox(lang === 'fa' ? activeWeb.promptFa : activeWeb.promptEn)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'سندباکس' : 'Sandbox'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(lang === 'fa' ? activeWeb.promptFa : activeWeb.promptEn, `web_${selectedWebIndex}`)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === `web_${selectedWebIndex}`
                      ? 'bg-[#2f7d5b] text-white'
                      : 'bg-[#1a73e8] hover:bg-[#1557b0] text-white'
                  }`}
                >
                  {copiedId === `web_${selectedWebIndex}` ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی پرامپت جستجو' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? activeWeb.promptFa : activeWeb.promptEn}
            </pre>

            <div className="p-3 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#fbbf24] shrink-0" />
              <span>
                <strong className="text-[#1c2830] dark:text-[#e8ebe9]">{lang === 'fa' ? 'نکته طلایی جستجو: ' : 'Search Pro-Tip: '}</strong>
                {lang === 'fa' ? activeWeb.tipFa : activeWeb.tipFa}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: STRUCTURED P6 & EXCEL */}
      {activeSubTab === 'p6_excel' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#00738c]/10 via-[#0a7b97]/10 to-transparent border border-[#00738c]/20 flex items-start gap-3">
            <FileSpreadsheet className="w-5 h-5 text-[#00738c] dark:text-[#6fb3c6] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                {lang === 'fa'
                  ? STRUCTURED_P6_GUIDE.titleFa
                  : STRUCTURED_P6_GUIDE.titleEn}
              </span>
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa' ? STRUCTURED_P6_GUIDE.descriptionFa : STRUCTURED_P6_GUIDE.descriptionFa}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Raw Input vs Conversion Prompt */}
            <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? '۱. متن اولیه آشفته صورت‌جلسه کارگاه:' : '1. Raw Unstructured Minutes:'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed italic">
                {STRUCTURED_P6_GUIDE.rawInputSnippetFa}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? '۲. پرامپت استخراج داده ساختاریافته:' : '2. Extraction Prompt:'}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(STRUCTURED_P6_GUIDE.conversionPromptFa, 'p6_prompt')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === 'p6_prompt' ? 'bg-[#2f7d5b] text-white' : 'bg-[#00738c] hover:bg-[#005a6e] text-white'
                  }`}
                >
                  {copiedId === 'p6_prompt' ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {STRUCTURED_P6_GUIDE.conversionPromptFa}
              </pre>
            </div>

            {/* Expected JSON output */}
            <div className="p-5 rounded-2xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <FileJson className="w-4 h-4 text-[#00738c]" />
                  <span>{lang === 'fa' ? '۳. خروجی استاندارد JSON برای P6:' : '3. Standard JSON for P6:'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(STRUCTURED_P6_GUIDE.expectedOutputJsonFa, 'p6_json')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    copiedId === 'p6_json' ? 'bg-[#2f7d5b] text-white' : 'bg-[#1f5163] hover:bg-[#163f4e] text-white'
                  }`}
                >
                  {copiedId === 'p6_json' ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'کپی JSON' : 'Copy JSON'}</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 rounded-lg bg-[#1e293b] text-[#38bdf8] border border-[#334155] text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto dir-ltr">
                {STRUCTURED_P6_GUIDE.expectedOutputJsonFa}
              </pre>

              <div className="p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? STRUCTURED_P6_GUIDE.excelPasteGuideFa : STRUCTURED_P6_GUIDE.excelPasteGuideFa}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: ANTI-HALLUCINATION POWER WORDS */}
      {activeSubTab === 'power_words' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#b91c1c]/10 via-[#c2410c]/10 to-transparent border border-[#b91c1c]/20 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#b91c1c] dark:text-[#f87171] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {lang === 'fa'
                    ? ANTI_HALLUCINATION_POWER_WORDS.titleFa
                    : ANTI_HALLUCINATION_POWER_WORDS.titleEn}
                </span>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa' ? ANTI_HALLUCINATION_POWER_WORDS.descriptionFa : ANTI_HALLUCINATION_POWER_WORDS.descriptionFa}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAllClauses}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                allClausesCopied ? 'bg-[#2f7d5b] text-white shadow-xs' : 'bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-sm'
              }`}
            >
              {allClausesCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'تمام شروط کپی شدند!' : 'All Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'کپی یکجای تمام ۵ شرط' : 'Copy All 5 Clauses'}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ANTI_HALLUCINATION_POWER_WORDS.clauses.map((c, i) => (
              <div
                key={c.code}
                className="p-4 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60 pb-2">
                    <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#b91c1c]/10 text-[#b91c1c] dark:text-[#f87171]">
                        #{i + 1}
                      </span>
                      <span>{lang === 'fa' ? c.titleFa : c.code}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(lang === 'fa' ? c.clauseFa : c.clauseEn, c.code)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                        copiedId === c.code ? 'bg-[#2f7d5b] text-white' : 'bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] hover:text-[#1c2830]'
                      }`}
                    >
                      {copiedId === c.code ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === c.code ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی شرط' : 'Copy')}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed bg-[#f8f9fa] dark:bg-[#12171b] p-2.5 rounded-lg border border-[#d9dad5]/60 dark:border-[#2d3942]/60 font-medium">
                    "{lang === 'fa' ? c.clauseFa : c.clauseEn}"
                  </p>
                </div>

                <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-[#00738c] shrink-0" />
                  <span>{lang === 'fa' ? c.rationaleFa : c.rationaleFa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
