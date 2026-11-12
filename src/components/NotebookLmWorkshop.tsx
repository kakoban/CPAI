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
  FileCode,
  Users,
  Code,
  Monitor,
  Zap,
  Home
} from 'lucide-react';
import {
  ProjectorSlideModal,
  ProjectorSlideItem,
  splitPointTitleAndBody
} from './ProjectorSlideModal';
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
import { HrArtifactsCanvasWorkshop } from './HrArtifactsCanvasWorkshop';

interface NotebookLmWorkshopProps {
  lang: Language;
  industryTrack?: IndustryTrackId;
  onLoadToSandbox: (promptText: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const NotebookLmWorkshop: React.FC<NotebookLmWorkshopProps> = ({
  lang,
  industryTrack = 'CIVIL_INFRA',
  onLoadToSandbox,
  copyToClipboard,
  copiedId
}) => {
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

  const [activeSubTab, setActiveSubTab] = useState<'mastery_guide' | 'departments' | 'blueprints' | 'exercises' | 'artifacts_canvas'>('mastery_guide');
  const [activeMasteryIdx, setActiveMasteryIdx] = useState<number>(0);
  const [activeStudioToolId, setActiveStudioToolId] = useState<string>(NOTEBOOKLM_STUDIO_TOOLS[0].id);
  const [projectorDeck, setProjectorDeck] = useState<'mastery' | 'studio' | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(UNIT_MANAGERS_MATRIX[0].id);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(PRESENTATION_INFOGRAPHIC_GUIDES[0].id);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(NOTEBOOKLM_EXERCISES[0].id);
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [docCopiedId, setDocCopiedId] = useState<string | null>(null);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const subTabNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDeptId(UNIT_MANAGERS_MATRIX[0]?.id || 'tech_office');
    setSelectedBlueprintId(PRESENTATION_INFOGRAPHIC_GUIDES[0]?.id || 'presentation_deck_workflow');
    setSelectedExerciseId(NOTEBOOKLM_EXERCISES[0]?.id || 'ex1_contract_claim_extraction');
    setPreviewDocId(null);
    setActiveScenarioIdx(0);
  }, [industryTrack]);

  const SUB_TAB_ITEMS: Array<{
    id: 'mastery_guide' | 'departments' | 'blueprints' | 'exercises' | 'artifacts_canvas';
    keyHint: string;
    titleFa: string;
    titleEn: string;
    subtitleFa: string;
    subtitleEn: string;
    activeClass: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'mastery_guide',
      keyHint: 'N1',
      titleFa: '۰. آموزش جامع قابلیت‌ها',
      titleEn: '0. Complete Mastery Guide',
      subtitleFa: 'نقشه ذهنی، ویدیو، نوت‌ها و فارسی‌سازی',
      subtitleEn: 'Mind Map, Video, Notes & Persian',
      activeClass: 'bg-gradient-to-b from-[#9333ea] to-[#0a3642] text-white border-[#07262e] border-b-[#04181d] ring-2 ring-[#9333ea]/30',
      icon: <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />,
    },
    {
      id: 'departments',
      keyHint: 'N2',
      titleFa: '۱. ماتریس ۷ دپارتمان',
      titleEn: '1. 7-Department Matrix',
      subtitleFa: 'دفتر فنی، قراردادها، PMO، HSE و HR',
      subtitleEn: 'Tech Office, Contracts, PMO, HSE, HR',
      activeClass: 'bg-gradient-to-b from-[#c026d3] to-[#00596d] text-white border-[#004454] border-b-[#002f3a] ring-2 ring-[#c026d3]/30',
      icon: <Building2 className="w-4 h-4 shrink-0 mt-0.5" />,
    },
    {
      id: 'blueprints',
      keyHint: 'N3',
      titleFa:
        industryTrack === 'PAYA_SAMAN_PARS'
          ? '۲. پرزنتیشن، کاوه و پادکست'
          : '۲. پرزنتیشن و ممیزی HR',
      titleEn:
        industryTrack === 'PAYA_SAMAN_PARS'
          ? '2. Board Decks, Kaveh & Audio'
          : '2. Slide Decks & HR Audit',
      subtitleFa:
        industryTrack === 'PAYA_SAMAN_PARS'
          ? 'هیئت‌مدیره دو بال، اینفوگرافیک کاوه و پادکست'
          : 'اسلاید، اینفوگرافیک، پادکست و منابع انسانی',
      subtitleEn: 'Decks, Infographics & Audio Briefings',
      activeClass: 'bg-gradient-to-b from-[#b87333] to-[#965b24] text-white border-[#78471a] border-b-[#593412] ring-2 ring-[#b87333]/30',
      icon: <FileBarChart className="w-4 h-4 shrink-0 mt-0.5" />,
    },
    {
      id: 'exercises',
      keyHint: 'N4',
      titleFa: `۳. تمرینات عملی (${NOTEBOOKLM_EXERCISES.length.toLocaleString('fa-IR')} تمرین)`,
      titleEn: `3. Hands-On Labs (${NOTEBOOKLM_EXERCISES.length})`,
      subtitleFa: 'سناریوهای واقعی با فایل‌های آماده تست',
      subtitleEn: 'Real Scenarios with Sample Docs',
      activeClass: 'bg-gradient-to-b from-[#2f7d5b] to-[#236146] text-white border-[#1a4934] border-b-[#113123] ring-2 ring-[#2f7d5b]/30',
      icon: <BookmarkCheck className="w-4 h-4 shrink-0 mt-0.5" />,
    },
    {
      id: 'artifacts_canvas',
      keyHint: 'N5',
      titleFa: '۴. ساخت ابزار (Artifacts/Canvas)',
      titleEn: '4. Build HR Tools (Artifacts)',
      subtitleFa: '۵ تمرین ساخت داشبورد و ماشین‌حساب HR',
      subtitleEn: '5 Interactive HR Dashboard Exercises',
      activeClass: 'bg-gradient-to-b from-[#b45309] to-[#92400e] text-white border-[#78350f] border-b-[#451a03] ring-2 ring-[#b45309]/30',
      icon: <Code className="w-4 h-4 shrink-0 mt-0.5" />,
    },
  ];

  const renderSubTabKeycaps = (scrollToTopOnSelect: boolean) => (
    <div className="p-2.5 rounded-2xl bg-[#eef1f0] dark:bg-[#131b20] border border-black/[0.08] dark:border-white/[0.1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs shadow-inner">
      {SUB_TAB_ITEMS.map((tab) => {
        const isSelected = activeSubTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setActiveSubTab(tab.id);
              if (scrollToTopOnSelect) {
                setTimeout(() => {
                  subTabNavRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 40);
              }
            }}
            className={`group flex flex-col justify-between gap-2 p-3 rounded-xl text-right transition-all duration-100 cursor-pointer select-none border border-b-4 active:translate-y-[2px] active:border-b ${
              isSelected
                ? `${tab.activeClass} shadow-md`
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1d262d] dark:to-[#161d23] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-[#c026d3]/40 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5">
                {tab.icon}
                <span className="font-black leading-snug">
                  {lang === 'fa' ? tab.titleFa : tab.titleEn}
                </span>
              </div>
              <span
                dir="ltr"
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                  isSelected
                    ? 'bg-black/20 text-white border-white/25'
                    : 'bg-black/[0.04] dark:bg-white/[0.05] text-[#5d6b73] dark:text-[#9aa8b0] border-black/10 dark:border-white/10'
                }`}
              >
                {tab.keyHint}
              </span>
            </div>
            <div className={`text-[10px] leading-snug ${isSelected ? 'text-white/85' : 'text-[#5d6b73] dark:text-[#9aa8b0]'}`}>
              {lang === 'fa' ? tab.subtitleFa : tab.subtitleEn}
            </div>
          </button>
        );
      })}
    </div>
  );

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
      case 'hr_overtime_compliance_blueprint':
        return isFa
          ? [
              'منبع ۱: گزیده مواد منابع انسانی، رفاهی، بیمه‌ای و کارگاهی از قرارداد پروژه مترو خط ایکس',
              'منبع ۲: بخشنامه داخلی کنترل اضافه‌کاری پرسنل سازمان پیمانکار (HR-INST-1403/07) و گزارش کارکرد مهرماه',
              'جدول متراژ الزامی فضاهای اداری، کارگری و رفاهی کارگاه (صفحه ۵۴ قرارداد) و ضوابط ماده ۲۰-ح و ۲۵'
            ]
          : [
              'Source 1: Metro Line X EPC Contract HR, Welfare, SSO & Camp Clauses',
              'Source 2: Contractor Internal Overtime Directive (HR-INST-1403/07) & October Attendance Logs',
              'Contract Page 54 Mandatory Camp Space Table & Articles 20-H / 25 / 42-1'
            ];
      case 'paya_board_dual_wing_deck':
        return isFa
          ? [
              'پرونده پورتفوی ۶۳ پروژه و ۱۴ شرکت تابعه دو بال هلدینگ پایا سامان پارس',
              'گزارش پیشرفت بال پیمانکاری (تهران–شمال، امارات SKF2، سدها، ریل و فرودگاه)',
              'گزارش بال مسکن (آتی‌ساز، خانه، عمران مسکن) و طرح‌های کاوه ۱۴۰۵'
            ]
          : [
              'Paya 63-Project & 14-Subsidiary Dual-Wing Portfolio Dossier',
              'Civil Contracting progress logs (domestic & UAE SKF2)',
              'Housing wing & 1405 Kaveh solar/cold-plasma summaries'
            ];
      case 'paya_kaveh_investor_infographic':
        return isFa
          ? [
              'سند منطقه ویژه اقتصادی و شهر صنعتی ۳۰۰۰ هکتاری کاوه در ساوه',
              'پرونده نیروگاه خورشیدی ۵ مگاواتی (BOT) و تصفیه‌خانه پلاسمای سرد (BLT)'
            ]
          : [
              'Kaveh 3,000ha Special Economic Zone dossier',
              '5MW Solar PV (BOT) & Cold-Plasma Effluent (BLT) specifications'
            ];
      case 'paya_audio_consortium_briefing':
        return isFa
          ? [
              'قرارداد کنسرسیومی EPC+F و تقسیم سهم رامان، جنرال مکانیک، دی و تابیران',
              'ضوابط ماده ۳۰ تاخیرات و خلاصه پورتفوی دو بال'
            ]
          : [
              'EPC+F Consortium agreement & subsidiary workshare terms',
              'Clause 30 notice rules & dual-wing summary'
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
      case 'ex5_hr_metro_line10_compliance':
        return isFa
          ? [
              'منبع شماره ۱: گزیده مواد منابع انسانی، اداری و کارگاهی از قرارداد پروژه مترو خط ایکس (metro_line_x_hr_contract_clauses.md)',
              'منبع شماره ۲: دستورالعمل داخلی کنترل اضافه‌کاری و دیتابیس کارکرد مهرماه پرسنل سازمان پیمانکار (contractor_internal_overtime_directive.md)',
              'امکان کپی مجزای منبع ۱ و منبع ۲ از طریق گزینه Paste Text در NotebookLM'
            ]
          : [
              'Source 1: Metro Line X HR, Admin & Camp Welfare Contract Clauses (metro_line_x_hr_contract_clauses.md)',
              'Source 2: Contractor Internal Overtime Directive & October Time-Card Logs (contractor_internal_overtime_directive.md)',
              'Individual Copy buttons for Paste Text of Source 1 and Source 2 in NotebookLM'
            ];
      case 'paya_ex1_consortium_audit':
        return isFa
          ? [
              'قرارداد نمونه کنسرسیومی EPC+F پایا (paya_epcf_consortium_contract_sim.md)',
              'تقسیم سهم ۵۰٪ رامان، ۳۰٪ جنرال مکانیک و ۲۰٪ دی/تابیران + فرجه ۲۱ روزه ماده ۳۰'
            ]
          : [
              'Paya EPC+F Consortium Specimen Contract (.md)',
              '50/30/20 subsidiary workshare & 21-day notice rule'
            ];
      case 'paya_ex2_kaveh_bot_audio':
        return isFa
          ? [
              'پرونده BOT/BLT شهر صنعتی کاوه (نیروگاه خورشیدی ۵MW و تصفیه‌خانه پلاسمای سرد)',
              'حداقل ۸۸٪ کاهش COD، مهلت ۴۸ ساعته خورشیدی و دوره ۱۵/۱۰ ساله'
            ]
          : [
              'Kaveh BOT/BLT Concession Brief (5MW Solar & Cold Plasma)',
              '88% COD reduction SLA, 48h solar remediation & handover terms'
            ];
      case 'paya_ex3_63projects_board_deck':
        return isFa
          ? [
              'پرونده ۶۳ پروژه ثبت‌شده در ۸ حوزه و دو بال هلدینگ پایا سامان پارس',
              'تحلیل فیلدهای خالی پورتال و ۰ پروژه در دسته ابنیه ساختمانی/مدیریت شهری'
            ]
          : [
              '63-Project 8-Sector Portfolio Dossier (.md)',
              'Portal metadata gap audit & empty Urban/Housing category'
            ];
      case 'paya_ex4_hr_fleet_cross_audit':
        return isFa
          ? [
              'منبع ۱: دستورالعمل سرمایه انسانی (۵۰۰۰+ نیرو در ۱۴ شرکت تابعه)',
              'منبع ۲: گزارش هم‌افزایی ناوگان سنگین و ایمنی HSE کارگاه‌ها'
            ]
          : [
              'Source 1: Paya 5,000+ Staff HR & Welfare Directive',
              'Source 2: Inter-Subsidiary Heavy Fleet & HSE Brief'
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

  const renderSubDocumentsSection = (subDocs?: SampleSubDocument[]) => {
    if (!subDocs || subDocs.length === 0) return null;
    return (
      <div className="space-y-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#c026d3] dark:text-[#fb7185]" />
            <span>
              {lang === 'fa'
                ? 'بارگذاری تفکیکی دو منبع در NotebookLM (از طریق گزینه Paste Text):'
                : 'Copy Individual Sources for NotebookLM (Paste Text):'}
            </span>
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
            {lang === 'fa' ? '۲ منبع مجزا (الزامات پیمان + ضوابط داخلی پیمانکار)' : '2 Separate Sources'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subDocs.map((sub) => (
            <div
              key={sub.id}
              className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] space-y-2.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                    {lang === 'fa' ? sub.labelFa : sub.labelEn}
                  </div>
                  <div dir="ltr" className="text-[10px] font-mono text-[#5d6b73] dark:text-[#9aa8b0] truncate">
                    {sub.fileName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <button
                  onClick={() => handleCopySpecimen(sub)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-[0.96] ${
                    docCopiedId === sub.id
                      ? 'bg-[#2f7d5b] text-white'
                      : 'bg-[#c026d3] hover:bg-[#9333ea] text-white'
                  }`}
                >
                  {docCopiedId === sub.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی شد! (Paste Text)' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'کپی متن برای Paste Text' : 'Copy for Paste Text'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadSpecimen(sub)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f0f2f1] dark:bg-[#1a232a] hover:bg-black/10 text-[#1c2830] dark:text-[#e8ebe9] text-[11px] font-semibold transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'دانلود (.md)' : 'Download'}</span>
                </button>
                <button
                  onClick={() => setPreviewDocId(previewDocId === sub.id ? null : sub.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#c026d3]/30 text-[#c026d3] dark:text-[#fb7185] text-[11px] font-semibold hover:bg-[#c026d3]/10 transition-all"
                >
                  {previewDocId === sub.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{lang === 'fa' ? (previewDocId === sub.id ? 'بستن متن' : 'مشاهده متن') : 'View'}</span>
                </button>
              </div>
              {previewDocId === sub.id && (
                <div className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#0e1317] border border-black/[0.06] dark:border-white/[0.08] max-h-64 overflow-y-auto mt-2">
                  <pre
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                    className="text-[11px] font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text"
                  >
                    {sub.markdownContent}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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

  return (
    <section className="space-y-6">
      {/* SECTION HEADER & HERO CARD (Double-Bezel Taste-Skill Architecture) */}
      <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-br from-white via-[#fcfdfe] to-[#f4f7f6] dark:from-[#161e24] dark:via-[#131b20] dark:to-[#0f1519] p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185] border border-[#c026d3]/20 flex items-center gap-1.5">
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
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.96] border border-white/20"
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
                <div className="text-sm sm:text-base font-black text-[#c026d3] dark:text-[#fb7185] mt-0.5 tabular-nums">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Why Engineers Love It */}
          <div className="p-4 rounded-2xl bg-[#c026d3]/[0.04] dark:bg-[#c026d3]/[0.08] border border-[#c026d3]/15 space-y-2.5">
            <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185] font-bold text-xs">
              <CheckSquare className="w-4 h-4" />
              <span>{lang === 'fa' ? 'چرا نوت‌بوک ال‌ام بازی را برای مدیران پروژه عوض می‌کند؟' : 'Why NotebookLM is a Game Changer for Mega-Projects:'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] sm:text-xs text-[#1c2830] dark:text-[#d1d7db] leading-relaxed">
              {(lang === 'fa' ? NOTEBOOKLM_OVERVIEW.whyEngineersLoveItFa : NOTEBOOKLM_OVERVIEW.whyEngineersLoveItEn).map(
                (item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c026d3] dark:bg-[#fb7185] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TAB NAVIGATOR: 5-COLUMN TACTILE MECHANICAL KEYCAP GRID */}
      <div ref={subTabNavRef} className="scroll-mt-4">
        {renderSubTabKeycaps(false)}
      </div>

      {/* SUB-TAB 0: COMPREHENSIVE NOTEBOOKLM MASTERY & STUDIO TOOLS GUIDE */}
      {activeSubTab === 'mastery_guide' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Part A: 7-Step Comprehensive Curriculum */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185] border border-[#c026d3]/20">
                      راهنمای صفر تا صد کار با Google NotebookLM
                    </span>
                    <span className="text-[11px] font-semibold text-[#2f7d5b] dark:text-[#52b788]">
                      ذخیره نوت‌ها · فارسی‌سازی خروجی · نقشه ذهنی · ویدیو و پادکست · آنبوردینگ پرسنل
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? '۷ مبحث کلیدی تسلط بر NotebookLM (روی هر مبحث کلیک کنید):'
                      : '7 Core Modules for Mastering Google NotebookLM:'}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('thock');
                      setProjectorDeck('mastery');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>حالت اسلاید پروژکتور (۷ اسلاید)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveMasteryIdx((prev) =>
                        prev > 0 ? prev - 1 : NOTEBOOKLM_MASTERY_MODULES.length - 1
                      );
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#f4f6f5] dark:bg-[#1d262d] text-[#1c2830] dark:text-[#e8ebe9] border border-black/10 dark:border-white/10 border-b-[3px] border-b-black/25 active:translate-y-[2px] active:border-b cursor-pointer"
                  >
                    → مبحث قبلی
                  </button>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#c026d3]/15 text-[#c026d3] dark:text-[#fb7185]">
                    {activeMasteryIdx + 1} / {NOTEBOOKLM_MASTERY_MODULES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveMasteryIdx((prev) =>
                        prev < NOTEBOOKLM_MASTERY_MODULES.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#c026d3] text-white border border-[#004454] border-b-[3px] border-b-[#002f3a] active:translate-y-[2px] active:border-b cursor-pointer"
                  >
                    مبحث بعدی ←
                  </button>
                </div>
              </div>

              {/* Clean All-Visible 7-Module Tactile Keycap Grid Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {NOTEBOOKLM_MASTERY_MODULES.map((item, idx) => {
                  const isSelected = idx === activeMasteryIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => playTactileSound('hover')}
                      onClick={() => {
                        playTactileSound('thock');
                        setActiveMasteryIdx(idx);
                      }}
                      className={`p-3 rounded-xl border border-b-4 text-right transition-all duration-100 cursor-pointer flex items-start gap-2.5 select-none active:translate-y-[2px] active:border-b ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#c026d3] to-[#00596d] text-white border-[#004454] border-b-[#002f3a] shadow-md ring-2 ring-[#c026d3]/25'
                          : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1b242b] dark:to-[#141b20] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-[#c026d3]/40 shadow-xs'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-white/20 text-white border-white/25'
                            : 'bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185] border-[#c026d3]/20'
                        }`}
                      >
                        {item.stepBadge}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-extrabold leading-snug line-clamp-2">{item.titleFa}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Lesson Multi-Column Slide Card (Fixes Screenshot 3!) */}
              {(() => {
                const mod = NOTEBOOKLM_MASTERY_MODULES[activeMasteryIdx] || NOTEBOOKLM_MASTERY_MODULES[0];
                return (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#c026d3]/[0.07] via-white to-[#2f7d5b]/[0.05] dark:from-[#c026d3]/[0.15] dark:via-[#141c22] dark:to-[#2f7d5b]/[0.1] border-2 border-[#c026d3]/35 space-y-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-[#c026d3]/20">
                      <span className="px-3.5 py-1 rounded-xl bg-[#c026d3] text-white text-xs sm:text-sm font-black">
                        {mod.stepBadge} — {mod.categoryFa}
                      </span>
                      <span dir="ltr" className="text-xs sm:text-sm font-mono font-bold text-[#334155] dark:text-[#cbd5e1]">
                        {mod.titleEn}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-2xl font-black text-[#0f172a] dark:text-white leading-snug">
                      {mod.titleFa}
                    </h4>

                    {/* 3-Column Scannable Slide Grid Instead of Wide Text Lines */}
                    <div
                      className={`grid grid-cols-1 ${
                        mod.detailedStepsFa.length === 2
                          ? 'lg:grid-cols-2'
                          : mod.detailedStepsFa.length >= 3
                            ? 'md:grid-cols-2 xl:grid-cols-3'
                            : 'lg:grid-cols-1'
                      } gap-4`}
                    >
                      {mod.detailedStepsFa.map((st, idx) => {
                        const { heading, body } = splitPointTitleAndBody(st);
                        return (
                          <div
                            key={idx}
                            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11171d] border border-[#c026d3]/25 shadow-2xs space-y-2.5 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-lg bg-[#c026d3] text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-sm sm:text-base font-black text-[#c026d3] dark:text-[#fb7185] leading-snug">
                                  {heading || `گام اجرایی ${idx + 1}`}
                                </span>
                              </div>
                              <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
                                {body}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pro Tip Box */}
                    <div className="p-4 rounded-2xl bg-[#2f7d5b]/15 border-2 border-[#2f7d5b]/35 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-[#2f7d5b] dark:text-[#52b788] shrink-0 mt-0.5" />
                      <div className="text-sm sm:text-base font-bold text-[#0f172a] dark:text-[#e8ebe9] leading-relaxed">
                        <strong className="text-[#2f7d5b] dark:text-[#52b788] font-black">ترفند حرفه‌ای: </strong>
                        {mod.proTipFa}
                      </div>
                    </div>

                    {/* Optional Copyable Prompt */}
                    {mod.copyablePromptFa && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#11161c] text-[#f1f5f9] space-y-2.5 border border-white/15">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-black text-[#fb7185]">
                            {mod.copyablePromptTitleFa || 'پرامپت آماده کپی:'}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(mod.copyablePromptFa!, `mastery_prompt_${mod.id}`)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#c026d3] hover:bg-[#9333ea] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedId === `mastery_prompt_${mod.id}` ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>کپی شد!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>کپی پرامپت</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed select-text text-right" dir="rtl">
                          {mod.copyablePromptFa}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Part B: 6 Studio Super-Tools Interactive Explorer (Mind Map, Video Overview, Audio Overview, Flashcards, Briefing/Timeline, Infographic Vision) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#c026d3] dark:text-[#fb7185]" />
                  <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'جعبه ابزار پنل Studio در NotebookLM: آموزش ۶ خروجی جادویی + پرامپت‌های Customize'
                      : 'NotebookLM Studio Panel: 6 Super-Tools & Customize Prompts'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                  روی هر یک از ۶ ابزار پنل Studio کلیک کنید تا روش استفاده گام‌به‌گام و پرامپت فارسی‌ساز بخش Customize آن را ببینید:
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playTactileSound('thock');
                  setProjectorDeck('studio');
                }}
                className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shrink-0"
              >
                <Monitor className="w-4 h-4" />
                <span>حالت اسلاید پروژکتور (۶ ابزار Studio)</span>
              </button>
            </div>

            {/* 6 Tool Selector Tactile Keycap Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {NOTEBOOKLM_STUDIO_TOOLS.map((tool) => {
                const isSelected = tool.id === activeStudioToolId;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onMouseEnter={() => playTactileSound('hover')}
                    onClick={() => {
                      playTactileSound('thock');
                      setActiveStudioToolId(tool.id);
                    }}
                    className={`p-3.5 rounded-2xl border border-b-4 text-right transition-all duration-100 cursor-pointer flex flex-col justify-between gap-2 select-none active:translate-y-[2px] active:border-b ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#9333ea] to-[#0a3642] text-white border-[#07262e] border-b-[#04181d] shadow-md ring-2 ring-[#9333ea]/25'
                        : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1b242b] dark:to-[#141b20] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-[#c026d3]/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]'
                        }`}
                      >
                        {tool.badgeFa}
                      </span>
                      <span dir="ltr" className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[#5d6b73]'}`}>
                        {tool.nameEn}
                      </span>
                    </div>
                    <div className="text-xs font-extrabold leading-snug">{tool.nameFa}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Studio Tool Details */}
            {(() => {
              const activeTool =
                NOTEBOOKLM_STUDIO_TOOLS.find((t) => t.id === activeStudioToolId) || NOTEBOOKLM_STUDIO_TOOLS[0];
              return (
                <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#c026d3]/25 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                      {activeTool.nameFa}
                    </h4>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {activeTool.whatItDoesFa}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
                      <div className="text-xs font-extrabold text-[#c026d3] dark:text-[#fb7185]">
                        🛠️ راهنمای گام‌به‌گام اجرا در NotebookLM:
                      </div>
                      <ul className="space-y-2 text-xs text-[#2c3840] dark:text-[#d1d7db] leading-relaxed">
                        {activeTool.howToUseFa.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="font-bold text-[#c026d3] dark:text-[#fb7185]">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#fb7185]">
                            پرامپت سفارشی‌سازی فارسی (Customize / Chat Prompt):
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(activeTool.customizePromptFa, `studio_tool_${activeTool.id}`)
                            }
                            className="px-3 py-1 rounded-lg bg-[#c026d3] hover:bg-[#9333ea] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            {copiedId === `studio_tool_${activeTool.id}` ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>کپی شد!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>کپی پرامپت</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre
                          dir="rtl"
                          className="text-xs font-mono whitespace-pre-wrap leading-relaxed select-text text-right"
                        >
                          {activeTool.customizePromptFa}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* SUB-TAB 1: UNIT MANAGERS MATRIX */}
      {activeSubTab === 'departments' && (
        <div className="space-y-5">
          {/* Department Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
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
                      ? 'bg-white dark:bg-[#1a232a] border-[#c026d3] dark:border-[#fb7185] shadow-md ring-2 ring-[#c026d3]/20'
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
                      <span className="font-semibold text-[#c026d3] dark:text-[#fb7185]">
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
                    <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185] font-bold text-xs">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{lang === 'fa' ? 'مدارک و منابع پیشنهادی جهت بارگذاری:' : 'Recommended Sources to Upload:'}</span>
                    </div>
                    <span dir="ltr" className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
                      PDF / MD / Sheets
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {(lang === 'fa'
                      ? selectedDepartment.recommendedSourcesFa
                      : selectedDepartment.recommendedSourcesEn
                    ).map((source, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c026d3] dark:bg-[#fb7185] mt-1.5 shrink-0" />
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
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#c026d3]/[0.04] to-[#2f7d5b]/[0.03] dark:from-[#c026d3]/[0.08] dark:to-[#2f7d5b]/[0.05] border border-[#c026d3]/25 space-y-3.5 shadow-2xs">
                  {/* Card Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-[#c026d3]/15 text-[#c026d3] dark:text-[#fb7185] shrink-0 mt-0.5 sm:mt-0">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            dir="ltr"
                            className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] text-[#c026d3] dark:text-[#fb7185]"
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c026d3] hover:bg-[#9333ea] text-white text-xs font-bold shadow-xs active:scale-[0.96] transition-all"
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
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a232a] border border-[#c026d3]/30 text-[#c026d3] dark:text-[#fb7185] text-xs font-bold hover:bg-[#c026d3]/10 active:scale-[0.96] transition-all"
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
                        <span dir="ltr" className="font-mono font-bold text-[#c026d3] dark:text-[#fb7185]">
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

                  {/* Individual Sub-Documents (e.g. Source 1 & Source 2 for HR Paste Text) */}
                  {renderSubDocumentsSection(currentSampleDoc.subDocuments)}
                </div>
              )}

              {/* Ready-to-Copy Prompt for this Department */}
              <div className="p-4 rounded-2xl bg-[#c026d3]/[0.03] dark:bg-[#c026d3]/[0.06] border border-[#c026d3]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185] font-bold text-xs">
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
                    className="flex items-center gap-1.5 text-xs font-bold text-[#c026d3] dark:text-[#fb7185] hover:underline"
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
                        : 'bg-[#c026d3] hover:bg-[#9333ea] text-white'
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
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              PRESENTATION_INFOGRAPHIC_GUIDES.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-3`}
          >
            {PRESENTATION_INFOGRAPHIC_GUIDES.map((blueprint) => {
              const isSelected = blueprint.id === selectedBlueprintId;
              const isAudio =
                blueprint.kind === 'audio' ||
                blueprint.id === 'audio_overview_deep_dive' ||
                blueprint.id === 'paya_audio_consortium_briefing';
              const isInfographic =
                blueprint.kind === 'infographic' ||
                blueprint.id === 'infographic_blueprint_workflow' ||
                blueprint.id === 'paya_kaveh_investor_infographic';
              const isHr =
                blueprint.kind === 'hr' || blueprint.id === 'hr_overtime_compliance_blueprint';
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
                    {isAudio ? (
                      <Headphones className="w-4 h-4 text-[#b87333]" />
                    ) : isInfographic ? (
                      <Sliders className="w-4 h-4 text-[#b87333]" />
                    ) : isHr ? (
                      <Users className="w-4 h-4 text-[#b87333]" />
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
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#b87333]/[0.05] to-[#c026d3]/[0.03] dark:from-[#b87333]/[0.08] dark:to-[#c026d3]/[0.05] border border-[#b87333]/25 space-y-3.5 shadow-2xs">
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

                    {/* Individual Sub-Documents for Blueprint */}
                    {renderSubDocumentsSection(currentBlueprintSampleDoc.subDocuments)}
                  </div>
                )}
              </div>

              {/* Copyable Prompt */}
              <div className="p-4 rounded-2xl bg-[#b87333]/[0.03] dark:bg-[#b87333]/[0.06] border border-[#b87333]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#b87333] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {selectedBlueprint.kind === 'audio' ||
                      selectedBlueprint.id === 'audio_overview_deep_dive' ||
                      selectedBlueprint.id === 'paya_audio_consortium_briefing'
                        ? lang === 'fa'
                          ? 'دستورالعمل سفارشی‌سازی پادکست (Audio Overview Customize):'
                          : 'Audio Overview Custom Instruction:'
                        : lang === 'fa'
                        ? 'پرامپت استخراج ساختار:'
                        : 'Extraction Prompt:'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]">
                    {selectedBlueprint.kind === 'audio' ||
                    selectedBlueprint.id === 'audio_overview_deep_dive' ||
                    selectedBlueprint.id === 'paya_audio_consortium_briefing'
                      ? 'NotebookLM Studio'
                      : 'NotebookLM Chat'}
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
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              NOTEBOOKLM_EXERCISES.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
            } gap-3`}
          >
            {NOTEBOOKLM_EXERCISES.map((ex) => {
              const isSelected = ex.id === selectedExerciseId;
              return (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExerciseId(ex.id);
                    setActiveScenarioIdx(0);
                  }}
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
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#c026d3]/10 hover:bg-[#c026d3]/20 text-[#c026d3] dark:text-[#fb7185] text-xs font-bold transition-colors"
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
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#2f7d5b]/[0.05] to-[#c026d3]/[0.03] dark:from-[#2f7d5b]/[0.08] dark:to-[#c026d3]/[0.05] border border-[#2f7d5b]/25 space-y-3.5 shadow-2xs">
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

                    {/* Individual Sub-Documents (Source 1 & Source 2 for Paste Text) */}
                    {renderSubDocumentsSection(currentExerciseSampleDoc.subDocuments)}
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
                    <CheckSquare className="w-4 h-4 text-[#c026d3]" />
                    <span>{lang === 'fa' ? 'مراحل گام‌به‌گام انجام تمرین:' : 'Step-by-Step Instructions:'}</span>
                  </span>
                  <div className="space-y-2">
                    {(lang === 'fa' ? selectedExercise.instructionsFa : selectedExercise.instructionsEn).map(
                      (inst, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-lg bg-[#c026d3]/15 text-[#c026d3] dark:text-[#fb7185] font-bold text-[11px] flex items-center justify-center shrink-0">
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

              {/* Multi-Scenario Workshop Section (e.g., Exercise 5 HR 4 Practice Scenarios) */}
              {selectedExercise.subScenarios && selectedExercise.subScenarios.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#c026d3]/[0.05] to-[#2f7d5b]/[0.05] dark:from-[#c026d3]/[0.1] dark:to-[#2f7d5b]/[0.08] border border-[#c026d3]/25 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185] font-extrabold text-xs sm:text-sm">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>
                        {lang === 'fa'
                          ? 'سناریوهای چهارگانه تمرینی و پرامپت‌های کاربردی (ممیزی، رفاهی، مکاتبه اخطار، کوییز):'
                          : '4 Interactive HR Practice Scenarios (Audit, Welfare, Warning Memo, Quiz):'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788]">
                      {lang === 'fa' ? 'همراه با کلید ارزیابی و نمونه نامه رسمی' : 'Includes Evaluation Keys & Sample Memo'}
                    </span>
                  </div>

                  {/* Scenario Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {selectedExercise.subScenarios.map((scen, idx) => {
                      const isActive = activeScenarioIdx === idx;
                      return (
                        <button
                          key={scen.id}
                          onClick={() => setActiveScenarioIdx(idx)}
                          className={`p-3 rounded-xl border text-right transition-all active:scale-[0.97] flex flex-col justify-between gap-1.5 ${
                            isActive
                              ? 'bg-[#c026d3] text-white border-[#c026d3] shadow-sm'
                              : 'bg-white dark:bg-[#141b20] text-[#1c2830] dark:text-[#e8ebe9] border-black/[0.06] dark:border-white/[0.08] hover:border-[#c026d3]/40'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded self-start ${
                              isActive ? 'bg-white/20 text-white' : 'bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]'
                            }`}
                          >
                            {lang === 'fa' ? `سناریوی ${scen.number}` : `Scenario ${scen.number}`}
                          </span>
                          <span className="text-xs font-bold leading-snug line-clamp-2">
                            {lang === 'fa' ? scen.titleFa : scen.titleEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Scenario Detail */}
                  {(() => {
                    const activeScen =
                      selectedExercise.subScenarios[activeScenarioIdx] || selectedExercise.subScenarios[0];
                    return (
                      <div className="p-4 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                            {lang === 'fa' ? activeScen.titleFa : activeScen.titleEn}
                          </h4>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onLoadToSandbox(lang === 'fa' ? activeScen.promptFa : activeScen.promptEn)
                              }
                              className="flex items-center gap-1 text-[11px] font-bold text-[#c026d3] dark:text-[#fb7185] hover:underline"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>{lang === 'fa' ? 'تست در کارگاه پرامپت' : 'Load to Sandbox'}</span>
                            </button>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  lang === 'fa' ? activeScen.promptFa : activeScen.promptEn,
                                  `scen_prompt_${activeScen.id}`
                                )
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                copiedId === `scen_prompt_${activeScen.id}`
                                  ? 'bg-[#2f7d5b] text-white'
                                  : 'bg-[#c026d3] hover:bg-[#9333ea] text-white'
                              }`}
                            >
                              {copiedId === `scen_prompt_${activeScen.id}` ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{lang === 'fa' ? 'پرامپت کپی شد!' : 'Copied!'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>{lang === 'fa' ? 'کپی پرامپت این تمرین' : 'Copy Scenario Prompt'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Prompt Box */}
                        <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1317] border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                          <pre
                            dir={lang === 'fa' ? 'rtl' : 'ltr'}
                            className="whitespace-pre-wrap select-text text-right"
                          >
                            {lang === 'fa' ? activeScen.promptFa : activeScen.promptEn}
                          </pre>
                        </div>

                        {/* Expected Output / Evaluation Key */}
                        <div className="p-3.5 rounded-xl bg-[#2f7d5b]/[0.06] border border-[#2f7d5b]/25 space-y-2">
                          <div className="text-xs font-extrabold text-[#2f7d5b] dark:text-[#52b788] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>
                              {lang === 'fa'
                                ? 'خروجی مورد انتظار از NotebookLM (کلید ارزیابی):'
                                : 'Expected NotebookLM Output (Evaluation Key):'}
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#1c2830] dark:text-[#d1d7db]">
                            {(lang === 'fa' ? activeScen.expectedKeyFa : activeScen.expectedKeyEn).map((k, kIdx) => (
                              <li key={kIdx} className="flex items-start gap-2 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2f7d5b] mt-1.5 shrink-0" />
                                <span>{k}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Sample Standard Internal Warning Letter (if present, e.g. Scenario 3) */}
                        {activeScen.sampleLetterOutputFa && (
                          <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/30 space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                                <FileText className="w-4 h-4 shrink-0" />
                                <span>
                                  {lang === 'fa'
                                    ? 'نمونه نامه استاندارد درون‌سازمانی (کلید ارزیابی تمرین ۳):'
                                    : 'Standard Internal Warning Memo Specimen (Scenario 3 Key):'}
                                </span>
                              </span>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    activeScen.sampleLetterOutputFa || '',
                                    `scen_letter_${activeScen.id}`
                                  )
                                }
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                  copiedId === `scen_letter_${activeScen.id}`
                                    ? 'bg-[#2f7d5b] text-white'
                                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                                }`}
                              >
                                {copiedId === `scen_letter_${activeScen.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{lang === 'fa' ? 'متن نامه کپی شد!' : 'Letter Copied!'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>{lang === 'fa' ? 'کپی متن نامه رسمی' : 'Copy Official Letter'}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] max-h-96 overflow-y-auto">
                              <pre
                                dir="rtl"
                                className="text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-text text-right"
                              >
                                {activeScen.sampleLetterOutputFa}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

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

          {/* When HR Exercise 5 is selected, also display the 5 Claude Artifacts & Gemini Canvas Exercises below */}
          {selectedExercise.id === 'ex5_hr_metro_line10_compliance' && (
            <HrArtifactsCanvasWorkshop
              lang={lang}
              onLoadToSandbox={onLoadToSandbox}
              copyToClipboard={copyToClipboard}
              copiedId={copiedId}
            />
          )}
        </div>
      )}

      {/* SUB-TAB 4: CLAUDE ARTIFACTS & GEMINI CANVAS HR TOOL-BUILDING WORKSHOP */}
      {activeSubTab === 'artifacts_canvas' && (
        <HrArtifactsCanvasWorkshop
          lang={lang}
          onLoadToSandbox={onLoadToSandbox}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* ===================================================================== */}
      {/* BOTTOM SUB-TAB MECHANICAL KEYCAP DECK FOR NOTEBOOKLM WORKSHOP         */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-white to-[#f4f6f5] dark:from-[#161e24] dark:to-[#11171b] border border-[#c026d3]/25 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c026d3] animate-pulse" />
            <span className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa'
                ? 'پنل پایین کارگاه NotebookLM: جابه‌جایی سریع بین ۵ بخش این کارگاه (بدون اسکرول به بالا):'
                : 'NotebookLM Bottom Deck: Quick Switch Between All 5 Sections:'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playTactileSound('switch');
              subTabNavRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="self-start sm:self-auto px-3 py-1 rounded-xl text-[11px] font-extrabold bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185] border border-[#c026d3]/25 border-b-[3px] border-b-[#c026d3]/40 active:translate-y-[2px] active:border-b transition-all cursor-pointer"
          >
            {lang === 'fa' ? '↑ پرش به بالای کارگاه NotebookLM' : '↑ Top of NotebookLM'}
          </button>
        </div>
        {renderSubTabKeycaps(true)}
      </div>

      {/* FULL-SCREEN PROJECTOR SLIDE DECK MODAL FOR NOTEBOOKLM */}
      {projectorDeck === 'mastery' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setProjectorDeck(null)}
          deckTitleFa="۷ مبحث کلیدی تسلط کامل بر Google NotebookLM"
          deckSubtitleFa="بخش ۹ · آموزش جامع قابلیت‌ها"
          accentColor="teal"
          slides={NOTEBOOKLM_MASTERY_MODULES.map((m, idx): ProjectorSlideItem => ({
            stepNumber: m.stepBadge,
            keyHint: `N${idx + 1}`,
            badgeFa: m.categoryFa,
            titleFa: m.titleFa,
            titleEn: m.titleEn,
            pointsFa: m.detailedStepsFa,
            proTipFa: m.proTipFa,
            codeTitleFa: m.copyablePromptTitleFa,
            codeSnippet: m.copyablePromptFa,
            codeDir: 'rtl'
          }))}
          activeIndex={activeMasteryIdx}
          onChangeIndex={setActiveMasteryIdx}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {projectorDeck === 'studio' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setProjectorDeck(null)}
          deckTitleFa="جعبه ابزار پنل Studio در Google NotebookLM (۶ خروجی جادویی)"
          deckSubtitleFa="بخش ۹ · Mind Map · Video · Audio · Flashcards · Vision"
          accentColor="blue"
          slides={NOTEBOOKLM_STUDIO_TOOLS.map((t, idx): ProjectorSlideItem => ({
            stepNumber: `ابزار ${idx + 1}`,
            keyHint: `ST${idx + 1}`,
            badgeFa: t.badgeFa,
            titleFa: t.nameFa,
            titleEn: t.nameEn,
            pointsFa: [t.whatItDoesFa, ...t.howToUseFa],
            codeTitleFa: 'پرامپت سفارشی‌سازی فارسی (Customize Prompt)',
            codeSnippet: t.customizePromptFa,
            codeDir: 'rtl'
          }))}
          activeIndex={Math.max(
            0,
            NOTEBOOKLM_STUDIO_TOOLS.findIndex((t) => t.id === activeStudioToolId)
          )}
          onChangeIndex={(newIdx) => {
            const tool = NOTEBOOKLM_STUDIO_TOOLS[newIdx];
            if (tool) setActiveStudioToolId(tool.id);
          }}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}
    </section>
  );
};
