import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Play,
  Download,
  Building2,
  Scale,
  FileSpreadsheet,
  Shield,
  CheckCircle2,
  Layers,
  Headphones,
  FileText,
  Clock,
  Lightbulb,
  CheckSquare,
  BookmarkCheck,
  Radio,
  FileBarChart,
  Sliders,
  ChevronRight,
  ArrowRight,
  Eye,
  EyeOff,
  FileCode
} from 'lucide-react';
import {
  NOTEBOOKLM_OVERVIEW,
  UNIT_MANAGERS_MATRIX,
  PRESENTATION_INFOGRAPHIC_GUIDES,
  NOTEBOOKLM_EXERCISES,
  DepartmentUseCase,
  PresentationInfographicBlueprint,
  NotebookLmExercise
} from '../data/notebooklm_engineering_guide';
import {
  SAMPLE_DEPARTMENT_DOCS,
  SAMPLE_BLUEPRINT_DOCS,
  SAMPLE_EXERCISE_DOCS,
  SampleDepartmentDocument
} from '../data/notebooklm_sample_documents';

interface NotebookLmWorkshopProps {
  lang: Language;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const NotebookLmWorkshop: React.FC<NotebookLmWorkshopProps> = ({
  lang,
  onLoadToSandbox,
  copyToClipboard,
  copiedId
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'departments' | 'blueprints' | 'exercises'>('departments');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('tech_office');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('presentation_deck_workflow');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('ex1_contract_claim_extraction');
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [docCopiedId, setDocCopiedId] = useState<string | null>(null);

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

  const getBlueprintSources = (id: string, isFa: boolean) => {
    switch (id) {
      case 'presentation_deck_workflow':
        return isFa
          ? [
              'گزارش پیشرفت ماهانه اخیر پروژه (Monthly Progress Report)',
              'شیت‌های مالی تحلیل ارزش کسب‌شده (EVM Sheets)',
              'خلاصه وضعیت دعاوی قراردادی، تاخیرات مجاز و موانع بحرانی کارگاه'
            ]
          : [
              'Recent Monthly Project Progress Reports',
              'Earned Value Management (EVM) Financial Data Sheets',
              'Contractual Delay Claims and Critical Path Bottlenecks Brief'
            ];
      case 'infographic_blueprint_workflow':
        return isFa
          ? [
              'آمار تجمعی حفاری، رینگ‌گذاری، و متراژهای اجرایی پروژه',
              'کارنامه ایمنی و بهداشت (نفر-ساعت کارکرد بدون حادثه LTI)',
              'فلوچارت فرآیند ۵ مرحله‌ای مهندسی و لاینینگ سگمنتی'
            ]
          : [
              'Cumulative excavation, ring assembly and footage logs',
              'HSE safety performance register (LTI-free man-hours)',
              '5-step engineering and segment lining process workflow'
            ];
      case 'audio_overview_deep_dive':
      default:
        return isFa
          ? [
              'متن شرایط عمومی و خصوصی پیمان (ماده ۳۰ نشریه ۴۳۱۱ یا فیدیک)',
              'مکاتبات رسمی اعلام موانع و صورت‌جلسات معارضین تاسیساتی',
              'لاگ مغایرت‌های ژئوتکنیکی زمین و توقفات ماشین‌آلات حفار'
            ]
          : [
              'General & Particular Conditions of Contract (FIDIC / Clause 30)',
              'Official utility clash correspondence and site minutes',
              'Geotechnical discrepancy logs and heavy equipment downtime records'
            ];
    }
  };

  const getExerciseSources = (id: string, isFa: boolean) => {
    switch (id) {
      case 'ex1_contract_claim_extraction':
        return isFa
          ? [
              'فایل نمونه قرارداد احداث مترو و سازه‌های زیرزمینی (metro_epc_contract_specimen.md)',
              'شرایط عمومی پیمان نشریه ۴۳۱۱ (به‌ویژه ماده ۳۰: تاخیرات، معارضین و تمدید مدت)',
              'مکاتبات رسمی اعلام موانع و صورت‌جلسات توقف کارگاه ناشی از معارضین تاسیساتی'
            ]
          : [
              'Metro EPC Contract Specimen (metro_epc_contract_specimen.md)',
              'General Conditions Circular 4311 (specifically Clause 30: Excusable Delays)',
              'Official site utility clash correspondence and idle downtime minutes'
            ];
      case 'ex2_audio_podcast_creation':
        return isFa
          ? [
              'متن کامل قرارداد فیدیک سیلوربوک خط لوله نفت و گاز (oil_gas_pipeline_epc_contract.md)',
              'مشخصات فنی استاندارد API 1104 جوشکاری و تست هیدرواستاتیک ASME B31.8',
              'سوابق اخطارهای ۲۸ روزه ساب‌کلاز ۲۰.۱ فیدیک و مکاتبات ترخیص کالا'
            ]
          : [
              'FIDIC Silver Book Pipeline EPC Contract (oil_gas_pipeline_epc_contract.md)',
              'API 1104 welding standards & ASME B31.8 hydrotest technical requirements',
              'Sub-Clause 20.1 28-day mandatory notice records & customs delay logs'
            ];
      case 'ex3_executive_presentation_deck':
        return isFa
          ? [
              'گزارش ماهانه پیشرفت فیزیکی و مقادیر ارزش کسب‌شده (planning_pmo_monthly_evm_progress.md)',
              'شیت شاخص‌های مالی و زمانی پروژه (PV, EV, AC, SPI=0.835, CPI=0.910)',
              'فایل داده‌های CSV حفاری سگمنتی مترو و عملیات جوشکاری از بخش ۵ برنامه'
            ]
          : [
              'Monthly EVM Progress & Variances Report (planning_pmo_monthly_evm_progress.md)',
              'Earned Value metrics sheet (PV, EV, AC, SPI=0.835, CPI=0.910)',
              'Metro TBM segment or pipeline welding CSV raw data from Section 5'
            ];
      case 'ex4_hse_qaqc_infographic':
      default:
        return isFa
          ? [
              'دستورالعمل جامع ایمنی شفت و فضاهای بسته کارگاهی (hse_confined_space_incident_report.md)',
              'جدول حدود مجاز گازهای سمی (O2, CO, H2S, LEL) و الزامات ریگینگ جرثقیل',
              'پروتکل تخلیه اضطراری در شرایط قطعی تهویه و ۵ سرفصل TBT صبحگاهی'
            ]
          : [
              'Confined Space & Shaft Excavation HSE Manual (hse_confined_space_incident_report.md)',
              'Multi-gas threshold limits table (O2, CO, H2S, LEL) & crane rigging rules',
              'Emergency ventilation shutdown evacuation SOP & 5 daily TBT topics'
            ];
    }
  };

  const handleDownloadSpecimen = (doc: SampleDepartmentDocument) => {
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

  const handleCopySpecimen = (doc: SampleDepartmentDocument) => {
    copyToClipboard(doc.markdownContent, `specimen_doc_${doc.id}`);
    setDocCopiedId(doc.id);
    setTimeout(() => setDocCopiedId(null), 2500);
  };

  const renderDeptIcon = (iconName: string, className = 'w-5 h-5') => {
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
      case 'Layers':
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <section className="space-y-6">
      {/* SECTION HEADER & HERO CARD (Double-Bezel Taste-Skill Architecture) */}
      <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-br from-white via-[#fcfdfe] to-[#f4f7f6] dark:from-[#161e24] dark:via-[#131b20] dark:to-[#0f1519] p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6] border border-[#00738c]/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Google AI Studio & NotebookLM
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/20">
                  {lang === 'fa' ? 'بدون خطا و توهم (Zero Hallucination)' : '100% Grounded Intelligence'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#1c2830] dark:text-[#e8ebe9] tracking-tight text-balance">
                {lang === 'fa' ? NOTEBOOKLM_OVERVIEW.titleFa : NOTEBOOKLM_OVERVIEW.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed text-pretty">
                {lang === 'fa' ? NOTEBOOKLM_OVERVIEW.taglineFa : NOTEBOOKLM_OVERVIEW.taglineEn}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href={NOTEBOOKLM_OVERVIEW.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00738c] to-[#0f4c5c] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.96] border border-white/20"
              >
                <span>{lang === 'fa' ? 'ورود به Google NotebookLM' : 'Open NotebookLM'}</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* 4 Stats Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {NOTEBOOKLM_OVERVIEW.keyStats.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#1a232a]/80 border border-black/[0.04] dark:border-white/[0.06] shadow-2xs backdrop-blur-sm"
              >
                <div className="text-[10px] sm:text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa' ? stat.labelFa : stat.labelEn}
                </div>
                <div className="text-sm sm:text-base font-black text-[#00738c] dark:text-[#6fb3c6] mt-0.5 tabular-nums">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Why Engineers Love It */}
          <div className="p-4 rounded-2xl bg-[#00738c]/[0.04] dark:bg-[#00738c]/[0.08] border border-[#00738c]/15 space-y-2.5">
            <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6fb3c6] font-bold text-xs">
              <CheckSquare className="w-4 h-4" />
              <span>{lang === 'fa' ? 'چرا نوت‌بوک ال‌ام بازی را برای مدیران پروژه عوض می‌کند؟' : 'Why NotebookLM is a Game Changer for Mega-Projects:'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] sm:text-xs text-[#1c2830] dark:text-[#d1d7db] leading-relaxed">
              {(lang === 'fa' ? NOTEBOOKLM_OVERVIEW.whyEngineersLoveItFa : NOTEBOOKLM_OVERVIEW.whyEngineersLoveItEn).map(
                (item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] dark:bg-[#6fb3c6] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TAB NAVIGATOR (DOUBLE-BEZEL CONCENTRIC PILLS) */}
      <div className="flex items-center p-1.5 rounded-2xl bg-[#f0f2f1] dark:bg-[#131b20] border border-black/[0.05] dark:border-white/[0.06] overflow-x-auto gap-1 text-xs">
        <button
          onClick={() => setActiveSubTab('departments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 font-bold ${
            activeSubTab === 'departments'
              ? 'bg-[#00738c] text-white shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{lang === 'fa' ? '۱. ماتریس ۶ دپارتمان پروژه' : '1. 6-Department Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('blueprints')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 font-bold ${
            activeSubTab === 'blueprints'
              ? 'bg-[#b87333] text-white shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <FileBarChart className="w-4 h-4" />
          <span>{lang === 'fa' ? '۲. پرزنتیشن، اینفوگرافیک و پادکست' : '2. Slide Decks & Infographics'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('exercises')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.96] shrink-0 font-bold ${
            activeSubTab === 'exercises'
              ? 'bg-[#2f7d5b] text-white shadow-xs'
              : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>{lang === 'fa' ? '۳. تمرینات عملی کلاسی (۴ تمرین)' : '3. Hands-On Exercises'}</span>
        </button>
      </div>

      {/* SUB-TAB 1: UNIT MANAGERS MATRIX */}
      {activeSubTab === 'departments' && (
        <div className="space-y-5">
          {/* Department Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {UNIT_MANAGERS_MATRIX.map((dept) => {
              const isSelected = dept.id === selectedDeptId;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setPreviewDocId(null);
                  }}
                  className={`p-3 rounded-2xl border text-right sm:text-center transition-all duration-150 active:scale-[0.96] flex flex-col items-center gap-2 justify-center ${
                    isSelected
                      ? 'bg-white dark:bg-[#1a232a] border-[#00738c] dark:border-[#6fb3c6] shadow-md ring-2 ring-[#00738c]/20'
                      : 'bg-white/60 dark:bg-[#151c22]/60 border-black/[0.05] dark:border-white/[0.06] hover:bg-white dark:hover:bg-[#1a232a]'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isSelected ? `${dept.colorTheme}20` : '#f0f2f1',
                      color: isSelected ? dept.colorTheme : '#5d6b73'
                    }}
                  >
                    {renderDeptIcon(dept.iconName)}
                  </div>
                  <span
                    className={`text-[11px] font-bold line-clamp-1 ${
                      isSelected ? 'text-[#1c2830] dark:text-[#e8ebe9]' : 'text-[#5d6b73] dark:text-[#9aa8b0]'
                    }`}
                  >
                    {lang === 'fa' ? dept.departmentFa.split('(')[0].trim() : dept.departmentEn.split('&')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Department Showcase Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-6">
              {/* Department Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
                    style={{
                      backgroundColor: `${selectedDepartment.colorTheme}15`,
                      color: selectedDepartment.colorTheme
                    }}
                  >
                    {renderDeptIcon(selectedDepartment.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? selectedDepartment.departmentFa : selectedDepartment.departmentEn}
                    </h3>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">
                        {lang === 'fa' ? selectedDepartment.managerRoleFa : selectedDepartment.managerRoleEn}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788] text-xs font-bold border border-[#2f7d5b]/20 self-start sm:self-auto">
                  {lang === 'fa' ? 'ارزش عملیاتی: ' : 'Value: '}
                  <span className="font-normal text-[11px] text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? selectedDepartment.practicalValueFa : selectedDepartment.practicalValueEn}
                  </span>
                </div>
              </div>

              {/* 2-Column Specs: Sources vs Deliverables (Balanced Heights) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recommended Sources to Upload */}
                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6fb3c6] font-bold text-xs">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{lang === 'fa' ? 'مدارک و منابع پیشنهادی جهت بارگذاری:' : 'Recommended Sources to Upload:'}</span>
                    </div>
                    <span dir="ltr" className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                      PDF / MD / Sheets
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {(lang === 'fa'
                      ? selectedDepartment.recommendedSourcesFa
                      : selectedDepartment.recommendedSourcesEn
                    ).map((source, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00738c] dark:bg-[#6fb3c6] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Deliverables */}
                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#52b788] font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? 'خروجی‌های کلیدی قابل استخراج:' : 'Key Deliverables Generated:'}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {(lang === 'fa'
                      ? selectedDepartment.keyDeliverablesFa
                      : selectedDepartment.keyDeliverablesEn
                    ).map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2f7d5b] dark:bg-[#52b788] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DEDICATED FULL-WIDTH SAMPLE SPECIMEN CARD FOR TESTING (Zero-Collision RTL Layout) */}
              {currentSampleDoc && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#00738c]/[0.04] to-[#2f7d5b]/[0.03] dark:from-[#00738c]/[0.08] dark:to-[#2f7d5b]/[0.05] border border-[#00738c]/25 space-y-3.5 shadow-2xs">
                  {/* Card Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-[#00738c]/15 text-[#00738c] dark:text-[#6fb3c6] shrink-0 mt-0.5 sm:mt-0">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            dir="ltr"
                            className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] text-[#00738c] dark:text-[#6fb3c6]"
                          >
                            {currentSampleDoc.fileName}
                          </span>
                          <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] font-bold border border-[#2f7d5b]/30">
                            {lang === 'fa' ? 'سند نمونه شبیه‌سازی‌شده آماده تست' : 'Ready-to-Test Specimen'}
                          </span>
                          <span dir="ltr" className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                            {currentSampleDoc.fileSizeApprox}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                          {lang === 'fa' ? currentSampleDoc.titleFa : currentSampleDoc.titleEn}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-[#2f7d5b] dark:text-[#52b788] bg-[#2f7d5b]/10 px-3 py-1.5 rounded-xl border border-[#2f7d5b]/20 self-start sm:self-auto">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'fa' ? 'تست ۲ دقیقه‌ای بدون نیاز به سند اولیه' : 'Instant 2-Minute Test'}</span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed bg-white/70 dark:bg-[#141b20]/70 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                    {lang === 'fa' ? currentSampleDoc.summaryFa : currentSampleDoc.summaryEn}
                  </p>

                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleDownloadSpecimen(currentSampleDoc)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00738c] hover:bg-[#0f4c5c] text-white text-xs font-bold shadow-xs active:scale-[0.96] transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'دانلود فایل نمونه (.md)' : 'Download .md File'}</span>
                      </button>

                      <button
                        onClick={() => handleCopySpecimen(currentSampleDoc)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-[0.96] transition-all ${
                          docCopiedId === currentSampleDoc.id
                            ? 'bg-[#2f7d5b] text-white'
                            : 'bg-white dark:bg-[#1a232a] border border-black/[0.08] dark:border-white/[0.1] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f0f2f1] dark:hover:bg-[#202b33]'
                        }`}
                      >
                        {docCopiedId === currentSampleDoc.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>{lang === 'fa' ? 'متن سند کپی شد!' : 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{lang === 'fa' ? 'کپی متن کامل سند' : 'Copy Full Text'}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setPreviewDocId(previewDocId === currentSampleDoc.id ? null : currentSampleDoc.id)
                        }
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a232a] border border-[#00738c]/30 text-[#00738c] dark:text-[#6fb3c6] text-xs font-bold hover:bg-[#00738c]/10 active:scale-[0.96] transition-all"
                      >
                        {previewDocId === currentSampleDoc.id ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>{lang === 'fa' ? 'بستن پیش‌نمایش' : 'Hide Preview'}</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>{lang === 'fa' ? 'مشاهده محتوای سند' : 'Preview Document'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5">
                      <span>💡</span>
                      <span>
                        {lang === 'fa'
                          ? 'فایل را در NotebookLM آپلود کرده و پرامپت آماده پایین را ارسال نمایید.'
                          : 'Upload this file to NotebookLM and send the prompt below.'}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Preview Drawer */}
                  {previewDocId === currentSampleDoc.id && (
                    <div className="p-4 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] max-h-80 overflow-y-auto space-y-2 mt-3 shadow-inner">
                      <div className="flex items-center justify-between pb-2 border-b border-black/[0.05] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                        <span dir="ltr" className="font-mono font-bold text-[#00738c] dark:text-[#6fb3c6]">
                          {currentSampleDoc.fileName} (Markdown Specimen)
                        </span>
                        <span dir="ltr" className="font-mono text-[11px]">
                          {currentSampleDoc.markdownContent.length} chars
                        </span>
                      </div>
                      <pre
                        dir={lang === 'fa' ? 'rtl' : 'ltr'}
                        className="text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text"
                      >
                        {currentSampleDoc.markdownContent}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Ready-to-Copy Prompt for this Department */}
              <div className="p-4 rounded-2xl bg-[#00738c]/[0.03] dark:bg-[#00738c]/[0.06] border border-[#00738c]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#00738c] dark:text-[#6fb3c6] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {lang === 'fa'
                        ? `پرامپت تخصصی آماده برای مدیر ${selectedDepartment.departmentFa.split('(')[0]}:`
                        : `Ready-to-Use Prompt for ${selectedDepartment.departmentEn}:`}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                    NotebookLM Chat
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] max-h-52 overflow-y-auto font-mono text-[11px] sm:text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                  <pre
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                    className="whitespace-pre-wrap select-text text-right"
                  >
                    {lang === 'fa' ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn}
                  </pre>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() =>
                      onLoadToSandbox(
                        lang === 'fa' ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-[#00738c] dark:text-[#6fb3c6] hover:underline"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'تست در کارگاه پرامپت (Sandbox)' : 'Load to Sandbox'}</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        lang === 'fa' ? selectedDepartment.samplePromptFa : selectedDepartment.samplePromptEn,
                        `dept_prompt_${selectedDepartment.id}`
                      )
                    }
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shadow-xs ${
                      copiedId === `dept_prompt_${selectedDepartment.id}`
                        ? 'bg-[#2f7d5b] text-white'
                        : 'bg-[#00738c] hover:bg-[#0f4c5c] text-white'
                    }`}
                  >
                    {copiedId === `dept_prompt_${selectedDepartment.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی پرامپت برای NotebookLM' : 'Copy Prompt'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PRESENTATION, INFOGRAPHICS & AUDIO OVERVIEW */}
      {activeSubTab === 'blueprints' && (
        <div className="space-y-5">
          {/* Blueprint Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRESENTATION_INFOGRAPHIC_GUIDES.map((blueprint) => {
              const isSelected = blueprint.id === selectedBlueprintId;
              return (
                <button
                  key={blueprint.id}
                  onClick={() => setSelectedBlueprintId(blueprint.id)}
                  className={`p-4 rounded-2xl border text-right transition-all duration-150 active:scale-[0.96] space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#1a232a] border-[#b87333] shadow-md ring-2 ring-[#b87333]/20'
                      : 'bg-white/60 dark:bg-[#151c22]/60 border-black/[0.05] dark:border-white/[0.06] hover:bg-white dark:hover:bg-[#1a232a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#b87333]/10 text-[#b87333]">
                      {lang === 'fa' ? blueprint.categoryFa : blueprint.categoryEn}
                    </span>
                    {blueprint.id === 'audio_overview_deep_dive' ? (
                      <Headphones className="w-4 h-4 text-[#b87333]" />
                    ) : blueprint.id === 'infographic_blueprint_workflow' ? (
                      <Sliders className="w-4 h-4 text-[#b87333]" />
                    ) : (
                      <FileBarChart className="w-4 h-4 text-[#b87333]" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] line-clamp-2">
                    {lang === 'fa' ? blueprint.titleFa : blueprint.titleEn}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Selected Blueprint Detail Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-6">
              <div className="space-y-2 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#b87333]/10 text-[#b87333]">
                    {lang === 'fa' ? selectedBlueprint.categoryFa : selectedBlueprint.categoryEn}
                  </span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? selectedBlueprint.titleFa : selectedBlueprint.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa' ? selectedBlueprint.descriptionFa : selectedBlueprint.descriptionEn}
                </p>
              </div>

              {/* 4-Step Action Guide */}
              <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-[#b87333] font-bold text-xs">
                  <Lightbulb className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'راهنمای گام‌به‌گام پیاده‌سازی:' : 'Step-by-Step Implementation Guide:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(lang === 'fa' ? selectedBlueprint.stepByStepGuideFa : selectedBlueprint.stepByStepGuideEn).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white dark:bg-[#182026] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-lg bg-[#b87333]/15 text-[#b87333] font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* RECOMMENDED SOURCES & DEDICATED SPECIMEN DOCUMENT FOR THIS BLUEPRINT */}
              <div className="space-y-4">
                {/* Recommended Sources to Upload */}
                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#b87333] font-bold text-xs">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{lang === 'fa' ? 'مدارک و منابع پیشنهادی جهت بارگذاری:' : 'Recommended Sources to Upload:'}</span>
                    </div>
                    <span dir="ltr" className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#b87333]/10 text-[#b87333]">
                      PDF / Reports / Specs
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {getBlueprintSources(selectedBlueprint.id, lang === 'fa').map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DEDICATED SPECIMEN CARD FOR BLUEPRINT */}
                {currentBlueprintSampleDoc && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#b87333]/[0.05] to-[#00738c]/[0.03] dark:from-[#b87333]/[0.08] dark:to-[#00738c]/[0.05] border border-[#b87333]/25 space-y-3.5 shadow-2xs">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-[#b87333]/15 text-[#b87333] shrink-0 mt-0.5 sm:mt-0">
                          <FileCode className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              dir="ltr"
                              className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] text-[#b87333]"
                            >
                              {currentBlueprintSampleDoc.fileName}
                            </span>
                            <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#b87333]/15 text-[#b87333] font-bold border border-[#b87333]/30">
                              {lang === 'fa' ? 'سند نمونه آماده استخراج' : 'Ready-to-Extract Specimen'}
                            </span>
                            <span dir="ltr" className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                              {currentBlueprintSampleDoc.fileSizeApprox}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                            {lang === 'fa' ? currentBlueprintSampleDoc.titleFa : currentBlueprintSampleDoc.titleEn}
                          </h4>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-[#b87333] bg-[#b87333]/10 px-3 py-1.5 rounded-xl border border-[#b87333]/20 self-start sm:self-auto">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'fa' ? 'آماده بارگذاری در نوت‌بوک' : 'Ready to Upload'}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed bg-white/70 dark:bg-[#141b20]/70 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                      {lang === 'fa' ? currentBlueprintSampleDoc.summaryFa : currentBlueprintSampleDoc.summaryEn}
                    </p>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleDownloadSpecimen(currentBlueprintSampleDoc)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b87333] hover:bg-[#92400e] text-white text-xs font-bold shadow-xs active:scale-[0.96] transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'دانلود فایل نمونه (.md)' : 'Download .md File'}</span>
                        </button>

                        <button
                          onClick={() => handleCopySpecimen(currentBlueprintSampleDoc)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-[0.96] transition-all ${
                            docCopiedId === currentBlueprintSampleDoc.id
                              ? 'bg-[#2f7d5b] text-white'
                              : 'bg-white dark:bg-[#1a232a] border border-black/[0.08] dark:border-white/[0.1] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f0f2f1] dark:hover:bg-[#202b33]'
                          }`}
                        >
                          {docCopiedId === currentBlueprintSampleDoc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>{lang === 'fa' ? 'متن سند کپی شد!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'کپی متن کامل سند' : 'Copy Full Text'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            setPreviewDocId(previewDocId === currentBlueprintSampleDoc.id ? null : currentBlueprintSampleDoc.id)
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a232a] border border-[#b87333]/30 text-[#b87333] text-xs font-bold hover:bg-[#b87333]/10 active:scale-[0.96] transition-all"
                        >
                          {previewDocId === currentBlueprintSampleDoc.id ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'بستن پیش‌نمایش' : 'Hide Preview'}</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'مشاهده محتوای سند' : 'Preview Document'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5">
                        <span>💡</span>
                        <span>
                          {lang === 'fa'
                            ? 'این سند را در NotebookLM اضافه کنید و پرامپت زیر را بفرستید.'
                            : 'Upload to NotebookLM and run the prompt below.'}
                        </span>
                      </div>
                    </div>

                    {/* Preview Drawer */}
                    {previewDocId === currentBlueprintSampleDoc.id && (
                      <div className="p-4 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] max-h-80 overflow-y-auto space-y-2 mt-3 shadow-inner">
                        <div className="flex items-center justify-between pb-2 border-b border-black/[0.05] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                          <span dir="ltr" className="font-mono font-bold text-[#b87333]">
                            {currentBlueprintSampleDoc.fileName}
                          </span>
                          <span dir="ltr" className="font-mono text-[11px]">
                            {currentBlueprintSampleDoc.markdownContent.length} chars
                          </span>
                        </div>
                        <pre
                          dir={lang === 'fa' ? 'rtl' : 'ltr'}
                          className="text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text"
                        >
                          {currentBlueprintSampleDoc.markdownContent}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Copyable Prompt */}
              <div className="p-4 rounded-2xl bg-[#b87333]/[0.03] dark:bg-[#b87333]/[0.06] border border-[#b87333]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#b87333] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {selectedBlueprint.id === 'audio_overview_deep_dive'
                        ? lang === 'fa'
                          ? 'دستورالعمل سفارشی‌سازی پادکست (Audio Overview Customize):'
                          : 'Audio Overview Custom Instruction:'
                        : lang === 'fa'
                        ? 'پرامپت استخراج ساختار:'
                        : 'Extraction Prompt:'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                    {selectedBlueprint.id === 'audio_overview_deep_dive' ? 'NotebookLM Studio' : 'NotebookLM Chat'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] max-h-56 overflow-y-auto font-mono text-[11px] sm:text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                  <pre
                    dir={lang === 'fa' && selectedBlueprint.id !== 'audio_overview_deep_dive' ? 'rtl' : 'ltr'}
                    className="whitespace-pre-wrap select-text text-right"
                  >
                    {lang === 'fa' ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn}
                  </pre>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() =>
                      onLoadToSandbox(
                        lang === 'fa' ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-[#b87333] hover:underline"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'تست در کارگاه پرامپت (Sandbox)' : 'Load to Sandbox'}</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        lang === 'fa' ? selectedBlueprint.copyablePromptFa : selectedBlueprint.copyablePromptEn,
                        `blueprint_prompt_${selectedBlueprint.id}`
                      )
                    }
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shadow-xs ${
                      copiedId === `blueprint_prompt_${selectedBlueprint.id}`
                        ? 'bg-[#2f7d5b] text-white'
                        : 'bg-[#b87333] hover:bg-[#92400e] text-white'
                    }`}
                  >
                    {copiedId === `blueprint_prompt_${selectedBlueprint.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی پرامپت استخراج' : 'Copy Prompt'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.06] space-y-2">
                <span className="text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? 'مزیت‌های خروجی استخراج‌شده:' : 'Deliverable Highlights:'}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {(lang === 'fa'
                    ? selectedBlueprint.outputPreviewHighlightsFa
                    : selectedBlueprint.outputPreviewHighlightsEn
                  ).map((hl, hIdx) => (
                    <div key={hIdx} className="p-2 rounded-lg bg-white dark:bg-[#141b20] border border-black/[0.04]">
                      {hl}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: HANDS-ON CLASSROOM EXERCISES */}
      {activeSubTab === 'exercises' && (
        <div className="space-y-5">
          {/* Exercise Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {NOTEBOOKLM_EXERCISES.map((ex) => {
              const isSelected = ex.id === selectedExerciseId;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExerciseId(ex.id)}
                  className={`p-3.5 rounded-2xl border text-right transition-all duration-150 active:scale-[0.96] flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-white dark:bg-[#1a232a] border-[#2f7d5b] shadow-md ring-2 ring-[#2f7d5b]/20'
                      : 'bg-white/60 dark:bg-[#151c22]/60 border-black/[0.05] dark:border-white/[0.06] hover:bg-white dark:hover:bg-[#1a232a]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] font-black text-xs flex items-center justify-center">
                        {ex.exerciseNumber}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{ex.estimatedMinutes} دقیقه</span>
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9] line-clamp-2">
                      {lang === 'fa' ? ex.titleFa : ex.titleEn}
                    </h4>
                  </div>

                  <div className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                    <span>{lang === 'fa' ? ex.targetDepartmentFa.split('،')[0] : ex.targetDepartmentEn.split(',')[0]}</span>
                    <span className="font-bold text-[#2f7d5b] dark:text-[#52b788]">
                      {lang === 'fa' ? ex.difficultyFa : ex.difficultyEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Exercise Detail Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-6">
              {/* Exercise Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#2f7d5b] text-white">
                      تمرین شماره {selectedExercise.exerciseNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00738c]/10 text-[#00738c] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? selectedExercise.targetDepartmentFa : selectedExercise.targetDepartmentEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      {lang === 'fa' ? `مدت زمان: ${selectedExercise.estimatedMinutes} دقیقه` : `${selectedExercise.estimatedMinutes} min`}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? selectedExercise.titleFa : selectedExercise.titleEn}
                  </h3>
                </div>

                <div className="shrink-0">
                  <a
                    href="https://notebooklm.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00738c]/10 hover:bg-[#00738c]/20 text-[#00738c] dark:text-[#6fb3c6] text-xs font-bold transition-colors"
                  >
                    <span>اجرای تمرین در NotebookLM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* RECOMMENDED SOURCES & DEDICATED SPECIMEN DOCUMENT FOR THIS EXERCISE */}
              <div className="space-y-4">
                {/* Recommended Sources to Upload */}
                <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#52b788] font-bold text-xs">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{lang === 'fa' ? 'مدارک و منابع پیشنهادی جهت بارگذاری:' : 'Recommended Sources to Upload:'}</span>
                    </div>
                    <span dir="ltr" className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788]">
                      MD / Contracts / Reports
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {getExerciseSources(selectedExercise.id, lang === 'fa').map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2f7d5b] dark:bg-[#52b788] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SOURCE DOCUMENT SPECIMEN CARD FOR THE EXERCISE */}
                {currentExerciseSampleDoc && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#2f7d5b]/[0.05] to-[#00738c]/[0.03] dark:from-[#2f7d5b]/[0.08] dark:to-[#00738c]/[0.05] border border-[#2f7d5b]/25 space-y-3.5 shadow-2xs">
                    {/* Card Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] shrink-0 mt-0.5 sm:mt-0">
                          <FileCode className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              dir="ltr"
                              className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] text-[#2f7d5b] dark:text-[#52b788]"
                            >
                              {currentExerciseSampleDoc.fileName}
                            </span>
                            <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] font-bold border border-[#2f7d5b]/30">
                              {lang === 'fa' ? `منبع الزامی تمرین شماره ${selectedExercise.exerciseNumber}` : `Required Source #${selectedExercise.exerciseNumber}`}
                            </span>
                            <span dir="ltr" className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                              {currentExerciseSampleDoc.fileSizeApprox}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                            {lang === 'fa' ? currentExerciseSampleDoc.titleFa : currentExerciseSampleDoc.titleEn}
                          </h4>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-[#2f7d5b] dark:text-[#52b788] bg-[#2f7d5b]/10 px-3 py-1.5 rounded-xl border border-[#2f7d5b]/20 self-start sm:self-auto">
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'fa' ? 'فایل آماده دانلود و تست' : 'Ready to Download'}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed bg-white/70 dark:bg-[#141b20]/70 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                      {lang === 'fa' ? currentExerciseSampleDoc.summaryFa : currentExerciseSampleDoc.summaryEn}
                    </p>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleDownloadSpecimen(currentExerciseSampleDoc)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white text-xs font-bold shadow-xs active:scale-[0.96] transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'دانلود فایل منبع تمرین (.md)' : 'Download Source (.md)'}</span>
                        </button>

                        <button
                          onClick={() => handleCopySpecimen(currentExerciseSampleDoc)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-[0.96] transition-all ${
                            docCopiedId === currentExerciseSampleDoc.id
                              ? 'bg-[#2f7d5b] text-white'
                              : 'bg-white dark:bg-[#1a232a] border border-black/[0.08] dark:border-white/[0.1] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f0f2f1] dark:hover:bg-[#202b33]'
                          }`}
                        >
                          {docCopiedId === currentExerciseSampleDoc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>{lang === 'fa' ? 'متن سند کپی شد!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'کپی متن کامل سند' : 'Copy Full Text'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            setPreviewDocId(previewDocId === currentExerciseSampleDoc.id ? null : currentExerciseSampleDoc.id)
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a232a] border border-[#2f7d5b]/30 text-[#2f7d5b] dark:text-[#52b788] text-xs font-bold hover:bg-[#2f7d5b]/10 active:scale-[0.96] transition-all"
                        >
                          {previewDocId === currentExerciseSampleDoc.id ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'بستن پیش‌نمایش' : 'Hide Preview'}</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'مشاهده محتوای سند' : 'Preview Document'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5">
                        <span>💡</span>
                        <span>
                          {lang === 'fa'
                            ? 'این فایل را دانلود کنید، در نوت‌بوک آپلود نمایید و پرامپت تمرین پایین را ارسال کنید.'
                            : 'Download and upload this source to your notebook and run the exercise prompt below.'}
                        </span>
                      </div>
                    </div>

                    {/* Preview Drawer */}
                    {previewDocId === currentExerciseSampleDoc.id && (
                      <div className="p-4 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] max-h-80 overflow-y-auto space-y-2 mt-3 shadow-inner">
                        <div className="flex items-center justify-between pb-2 border-b border-black/[0.05] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                          <span dir="ltr" className="font-mono font-bold text-[#2f7d5b] dark:text-[#52b788]">
                            {currentExerciseSampleDoc.fileName}
                          </span>
                          <span dir="ltr" className="font-mono text-[11px]">
                            {currentExerciseSampleDoc.markdownContent.length} chars
                          </span>
                        </div>
                        <pre
                          dir={lang === 'fa' ? 'rtl' : 'ltr'}
                          className="text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text"
                        >
                          {currentExerciseSampleDoc.markdownContent}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Objective & Step-by-Step Instructions */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#f4f7f6] dark:bg-[#131b20] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                  <strong className="text-[#2f7d5b] dark:text-[#52b788] font-bold">
                    {lang === 'fa' ? 'هدف آموزشی تمرین: ' : 'Objective: '}
                  </strong>
                  <span>{lang === 'fa' ? selectedExercise.objectiveFa : selectedExercise.objectiveEn}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#00738c]" />
                    <span>{lang === 'fa' ? 'مراحل گام‌به‌گام انجام تمرین:' : 'Step-by-Step Instructions:'}</span>
                  </span>
                  <div className="space-y-2">
                    {(lang === 'fa' ? selectedExercise.instructionsFa : selectedExercise.instructionsEn).map(
                      (inst, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-lg bg-[#00738c]/15 text-[#00738c] dark:text-[#6fb3c6] font-bold text-[11px] flex items-center justify-center shrink-0">
                            {iIdx + 1}
                          </span>
                          <span className="leading-relaxed">{inst}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Copyable Exercise Prompt */}
              <div className="p-4 rounded-2xl bg-[#2f7d5b]/[0.03] dark:bg-[#2f7d5b]/[0.06] border border-[#2f7d5b]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#52b788] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'پرامپت اصلی تمرین جهت کپی در NotebookLM:' : 'Exercise Prompt to Copy:'}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                    Exercise #{selectedExercise.exerciseNumber}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] max-h-56 overflow-y-auto font-mono text-[11px] sm:text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                  <pre
                    dir={lang === 'fa' && selectedExercise.id !== 'ex2_audio_podcast_creation' ? 'rtl' : 'ltr'}
                    className="whitespace-pre-wrap select-text text-right"
                  >
                    {lang === 'fa' ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn}
                  </pre>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() =>
                      onLoadToSandbox(
                        lang === 'fa' ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-[#2f7d5b] hover:underline"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'تست در کارگاه پرامپت (Sandbox)' : 'Load to Sandbox'}</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        lang === 'fa' ? selectedExercise.promptToCopyFa : selectedExercise.promptToCopyEn,
                        `ex_prompt_${selectedExercise.id}`
                      )
                    }
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shadow-xs ${
                      copiedId === `ex_prompt_${selectedExercise.id}`
                        ? 'bg-[#2f7d5b] text-white'
                        : 'bg-[#2f7d5b] hover:bg-[#256347] text-white'
                    }`}
                  >
                    {copiedId === `ex_prompt_${selectedExercise.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی متن پرامپت تمرین' : 'Copy Exercise Prompt'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Success Criteria Verification Box */}
              <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-2.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? 'چک‌لیست ارزیابی موفقیت تمرین در کلاس درس:' : 'Classroom Success Criteria Checklist:'}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(lang === 'fa'
                    ? selectedExercise.successVerificationFa
                    : selectedExercise.successVerificationEn
                  ).map((crit, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-xl bg-white dark:bg-[#182026] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-start gap-2"
                    >
                      <Check className="w-4 h-4 text-[#2f7d5b] shrink-0 mt-0.5" />
                      <span className="leading-snug">{crit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
