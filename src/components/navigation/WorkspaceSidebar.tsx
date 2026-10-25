import React, { useState, useEffect } from 'react';
import { AppPage } from '../../App';
import { Language } from '../../types/cpmai';
import {
  IndustryTrackId,
  DisciplineId
} from '../../types/industryTrack';
import { getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';
import {
  Sparkles,
  BookOpen,
  Target,
  Layers,
  Award,
  DollarSign,
  TrendingUp,
  Brain,
  Cpu,
  Lock,
  ChevronDown,
  X,
  Home,
  Check,
  Search,
  Boxes,
  Split,
  Gauge,
  Network,
  Workflow,
  Calendar,
  HardDrive,
  Calculator,
  ShieldCheck,
  Server,
  Database,
  Filter,
  BarChart3,
  Rocket
} from 'lucide-react';

interface WorkspaceSidebarProps {
  page: AppPage;
  onSelectPage: (page: AppPage) => void;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  isSessionLocked: (sessionNum: number) => boolean;
  onOpenBookModal: () => void;
  industryTrack?: IndustryTrackId;
  disciplineId?: DisciplineId;
}

export interface PhaseSessionItem {
  page: number;
  titleFa: string;
  titleEn: string;
  icon: React.ElementType;
  taskGroupFa?: string;
  taskGroupEn?: string;
}

export interface CpmaiPhaseConfig {
  id: number;
  roman: string;
  titleFa: string;
  titleEn: string;
  pageRangeFa: string;
  pageRangeEn: string;
  status: 'active' | 'in_development' | 'planned';
  taskGroups?: {
    titleFa: string;
    titleEn: string;
    sessions: PhaseSessionItem[];
  }[];
  sessions?: PhaseSessionItem[];
}

/**
 * Scalable CPMAI 6-Phases Architecture (Aligned with 97-Page Reference Curriculum)
 * Adding future sessions is as simple as adding an item to the corresponding phase!
 */
const CPMAI_MASTER_CURRICULUM: CpmaiPhaseConfig[] = [
  {
    id: 1,
    roman: 'I',
    titleFa: 'فاز ۱: شناخت کسب‌وکار',
    titleEn: 'Phase I: Business Understanding',
    pageRangeFa: 'صفحات ۱۱ تا ۵۰ کتاب کار (۲۱ جلسه فعال)',
    pageRangeEn: 'Pages 11–50 (21 Active Sessions)',
    status: 'active',
    taskGroups: [
      {
        titleFa: 'گروه وظایف ۱: اهداف کسب‌وکار و بازگشت سرمایه',
        titleEn: 'Task Group 1: Business Goals & ROI',
        sessions: [
          { page: 1, titleFa: 'جلسه ۱: درک کسب‌وکار و اهداف تجاری', titleEn: 'Session 1: Business Understanding', icon: BookOpen },
          { page: 2, titleFa: 'جلسه ۲: تعریف مسئله در این تکرار', titleEn: 'Session 2: Problem Iteration', icon: Layers },
          { page: 3, titleFa: 'جلسه ۳: معیارهای عینی موفقیت', titleEn: 'Session 3: Success Criteria', icon: Award },
          { page: 4, titleFa: 'جلسه ۴: تحلیل هزینه-فایده و بودجه', titleEn: 'Session 4: Cost-Benefit Analysis', icon: DollarSign },
          { page: 5, titleFa: 'جلسه ۵: برآورد نرخ بازگشت سرمایه (ROI)', titleEn: 'Session 5: Expected ROI', icon: TrendingUp }
        ]
      },
      {
        titleFa: 'گروه وظایف ۲: الزامات شناختی و چرایی AI',
        titleEn: 'Task Group 2: Cognitive Needs & Why AI',
        sessions: [
          { page: 6, titleFa: 'جلسه ۶: نیازمندی‌های شناختی پروژه', titleEn: 'Session 6: Cognitive Requirements', icon: Brain },
          { page: 7, titleFa: 'جلسه ۷: ضرورت راهکار شناختی (چرا AI؟)', titleEn: 'Session 7: Why AI Solution', icon: Cpu },
          { page: 8, titleFa: 'جلسه ۸: بخش‌های سنتی و غیرشناختی', titleEn: 'Session 8: Noncognitive Alternatives', icon: Layers },
          { page: 9, titleFa: 'جلسه ۹: اهداف اختصاصی شناختی', titleEn: 'Session 9: Cognitive Objectives', icon: Target },
          { page: 10, titleFa: 'جلسه ۱۰: خروجی‌های مورد انتظار شناختی', titleEn: 'Session 10: Cognitive Outcomes', icon: Award }
        ]
      },
      {
        titleFa: 'گروه وظایف ۳: الگوهای هفت‌گانه هوش مصنوعی',
        titleEn: 'Task Group 3: 7 Cognitive AI Patterns',
        sessions: [
          { page: 11, titleFa: 'جلسه ۱۱: معیارهای موفقیت پروژه AI', titleEn: 'Session 11: AI Success Criteria', icon: Award },
          { page: 12, titleFa: 'جلسه ۱۲: الگوهای هفت‌گانه شناختی', titleEn: 'Session 12: 7 AI Patterns', icon: Boxes },
          { page: 13, titleFa: 'جلسه ۱۳: انتخاب و توجیه الگوهای AI', titleEn: 'Session 13: Patterns Selection', icon: Split }
        ]
      },
      {
        titleFa: 'گروه وظایف ۴: ارزیابی وضعیت، مهارت و برنامه',
        titleEn: 'Task Group 4: Assess, Skills & Schedule',
        sessions: [
          { page: 14, titleFa: 'جلسه ۱۴: ارزیابی وضعیت و نیازمندی‌ها', titleEn: 'Session 14: Assess Situation', icon: Gauge },
          { page: 15, titleFa: 'جلسه ۱۵: فناوری‌ها و مهارت‌های لازم', titleEn: 'Session 15: Technology & Skills', icon: Network },
          { page: 16, titleFa: 'جلسه ۱۶: مایل‌استون‌ها و زمان‌بندی', titleEn: 'Session 16: Schedule Requirements', icon: Calendar }
        ]
      },
      {
        titleFa: 'گروه وظایف ۵: سنجه‌ها، مرزها و عملکرد مدل',
        titleEn: 'Task Group 5: Metrics, Boundaries & Baselines',
        sessions: [
          { page: 17, titleFa: 'جلسه ۱۷: محدودیت‌ها و مرزهای عملکرد', titleEn: 'Session 17: Boundaries & Constraints', icon: ShieldCheck },
          { page: 18, titleFa: 'جلسه ۱۸: سنجه‌ها و متریک‌های ارزیابی', titleEn: 'Session 18: Performance Metrics', icon: Calculator },
          { page: 19, titleFa: 'جلسه ۱۹: الزامات عملکرد در برابر خط مبنا', titleEn: 'Session 19: Requirements vs Baseline', icon: Workflow }
        ]
      },
      {
        titleFa: 'گروه وظایف ۶: شاخص‌های کلیدی عملکرد (KPI)',
        titleEn: 'Task Group 6: Target Acceptable KPIs',
        sessions: [
          { page: 20, titleFa: 'جلسه ۲۰: مقادیر قابل‌قبول KPI مدل', titleEn: 'Session 20: Acceptable KPI Values', icon: Server },
          { page: 21, titleFa: 'جلسه ۲۱: شاخص‌های زیرساخت و فناوری', titleEn: 'Session 21: Required Technology KPIs', icon: HardDrive }
        ]
      }
    ]
  },
  {
    id: 2,
    roman: 'II',
    titleFa: 'فاز ۲: درک داده‌ها',
    titleEn: 'Phase II: Data Understanding',
    pageRangeFa: 'صفحات ۵۱ تا ۶۱ کتاب کار',
    pageRangeEn: 'Pages 51–61',
    status: 'in_development',
    sessions: [
      { page: 22, titleFa: 'جلسه ۲۲: ممیزی داده‌های خام و لاگ‌های تلمتری', titleEn: 'Session 22: Raw Telemetry Audit', icon: Database },
      { page: 23, titleFa: 'جلسه ۲۳: کشف نویز، مقادیر گم‌شده و ارزیابی کیفیت', titleEn: 'Session 23: Data Quality & Outlier Detection', icon: Filter }
    ]
  },
  {
    id: 3,
    roman: 'III',
    titleFa: 'فاز ۳: آماده‌سازی داده‌ها',
    titleEn: 'Phase III: Data Preparation',
    pageRangeFa: 'صفحات ۶۲ تا ۶۸ کتاب کار',
    pageRangeEn: 'Pages 62–68',
    status: 'planned',
    sessions: [
      { page: 24, titleFa: 'جلسه ۲۴: خط لوله پاک‌سازی و همگام‌سازی زمانی', titleEn: 'Session 24: Cleaning & Time Alignment', icon: Workflow },
      { page: 25, titleFa: 'جلسه ۲۵: مهندسی ویژگی‌ها و پیشگیری از نشت داده', titleEn: 'Session 25: Feature Engineering & Leakage Defense', icon: Network }
    ]
  },
  {
    id: 4,
    roman: 'IV',
    titleFa: 'فاز ۴: توسعه مدل',
    titleEn: 'Phase IV: Model Development',
    pageRangeFa: 'صفحات ۶۹ تا ۷۸ کتاب کار',
    pageRangeEn: 'Pages 69–78',
    status: 'planned',
    sessions: [
      { page: 26, titleFa: 'جلسه ۲۶: انتخاب الگوریتم و آموزش مدل پایه', titleEn: 'Session 26: Model Training & Benchmarking', icon: Cpu },
      { page: 27, titleFa: 'جلسه ۲۷: تنظیم هایپرپارامترها و اعتبارسنجی متقاطع', titleEn: 'Session 27: Cross-Validation & Tuning', icon: SlidersIcon }
    ]
  },
  {
    id: 5,
    roman: 'V',
    titleFa: 'فاز ۵: ارزیابی مدل',
    titleEn: 'Phase V: Model Evaluation',
    pageRangeFa: 'صفحات ۷۹ تا ۸۶ کتاب کار',
    pageRangeEn: 'Pages 79–86',
    status: 'planned',
    sessions: [
      { page: 28, titleFa: 'جلسه ۲۸: اعتبارسنجی سودآوری تجاری و انطباق اخلاقی', titleEn: 'Session 28: Business Value Validation', icon: BarChart3 },
      { page: 29, titleFa: 'جلسه ۲۹: تصمیم‌گیری گیت خروج فاز پنجم', titleEn: 'Session 29: Gate Review & Sign-Off', icon: ShieldCheck }
    ]
  },
  {
    id: 6,
    roman: 'VI',
    titleFa: 'فاز ۶: عملیاتی‌سازی مدل',
    titleEn: 'Phase VI: Model Operationalization',
    pageRangeFa: 'صفحات ۸۷ تا ۹۷ کتاب کار',
    pageRangeEn: 'Pages 87–97',
    status: 'planned',
    sessions: [
      { page: 30, titleFa: 'جلسه ۳۰: استقرار در محیط واقعی (Production)', titleEn: 'Session 30: Production Deployment', icon: Rocket },
      { page: 31, titleFa: 'جلسه ۳۱: پایش انحراف مدل (Drift) و گزارش نهایی', titleEn: 'Session 31: Model Drift Monitoring', icon: Server }
    ]
  }
];

function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  page,
  onSelectPage,
  lang,
  isOpen,
  onClose,
  isSessionLocked,
  onOpenBookModal,
  industryTrack,
  disciplineId
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cpmai-sidebar-w');
      if (saved) return Math.max(280, Math.min(460, parseInt(saved, 10)));
    } catch {}
    return 344;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true });
  const [openTaskGroups, setOpenTaskGroups] = useState<Record<string, boolean>>({ '1-0': true, '1-1': true });
  const [completedSessions, setCompletedSessions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cpmai-completed-sessions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { 1: true };
  });

  const discMeta = disciplineId ? getDisciplineMetadata(disciplineId) : null;

  const updateWidth = (newW: number, persist = false) => {
    const clamped = Math.max(280, Math.min(460, Math.round(newW)));
    setSidebarWidth(clamped);
    if (persist) {
      try {
        localStorage.setItem('cpmai-sidebar-w', clamped.toString());
      } catch {}
    }
  };

  const toggleSessionDone = (sessionNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSessions((prev) => {
      const updated = { ...prev, [sessionNum]: !prev[sessionNum] };
      try {
        localStorage.setItem('cpmai-completed-sessions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (phaseId: number) => {
    setOpenPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleTaskGroup = (key: string) => {
    setOpenTaskGroups((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navigateTo = (target: AppPage) => {
    onSelectPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Dragging logic
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      const newWidth = lang === 'fa' ? e.clientX : window.innerWidth - e.clientX;
      updateWidth(newWidth, false);
    };

    const onUp = () => {
      setIsDragging(false);
      updateWidth(sidebarWidth, true);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, sidebarWidth, lang]);

  // Overall Phase 1 Progress
  const phase1TotalSessions = 21;
  const doneCount = Object.keys(completedSessions).filter((k) => completedSessions[+k] && +k >= 1 && +k <= 21).length;
  const progressPercent = Math.round((doneCount / phase1TotalSessions) * 100);

  const radius = 11;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#08130f]/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Element matching reference .side */}
      <aside
        style={{
          width: window.innerWidth >= 1024 ? (isOpen ? `${sidebarWidth}px` : '0px') : undefined,
          opacity: window.innerWidth >= 1024 && !isOpen ? 0 : 1,
          pointerEvents: window.innerWidth >= 1024 && !isOpen ? 'none' : 'auto'
        }}
        className={`fixed lg:sticky inset-y-0 start-0 lg:top-16 z-50 lg:z-30 h-full lg:h-[calc(100vh-4rem)] w-[min(340px,88vw)] lg:w-auto shrink-0 frosted-sidebar flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${isDragging ? 'select-none' : ''}`}
      >
        {/* Resize Grip Handle (.grip) on Desktop (visible only when open) */}
        {isOpen && (
          <div
            onMouseDown={() => setIsDragging(true)}
            onDoubleClick={() => updateWidth(344, true)}
            title={lang === 'fa' ? 'برای تغییر عرض بکشید (دوبار کلیک برای ریست)' : 'Drag to resize, double-click to reset'}
            className="hidden lg:block absolute inset-y-0 -inset-inline-end-1 w-2.5 cursor-col-resize z-20 group/grip"
          >
            <div className="w-0.5 h-full bg-[#d98a1f] opacity-0 group-hover/grip:opacity-100 transition-opacity mx-auto" />
          </div>
        )}

        {/* Top Header & Search (.top) */}
        <div className="p-4 pb-3 border-b border-white/60 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-sm font-extrabold text-[#12343b] dark:text-[#e4f0ee] leading-tight">
                {lang === 'fa' ? 'سرفصل‌های کارگاه CPMAI' : 'CPMAI Curriculum'}
              </h1>
              <span className="block text-[11px] font-semibold text-[#587479] dark:text-[#8ca8ab] mt-0.5">
                {discMeta
                  ? `${
                      industryTrack === 'CIVIL_INFRA'
                        ? 'راه و ابنیه'
                        : industryTrack === 'ENERGY_PETRO'
                        ? 'پتروشیمی'
                        : 'روزمره و خانواده'
                    } · ${discMeta.shortTitleFa}`
                  : industryTrack === 'CIVIL_INFRA'
                  ? 'هلدینگ راه و ابنیه'
                  : industryTrack === 'ENERGY_PETRO'
                  ? 'هلدینگ نفت و انرژی'
                  : 'سبک زندگی و خانواده'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#587479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              title={lang === 'fa' ? 'جمع کردن سایدبار' : 'Fold Sidebar'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Search Input (.search) */}
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'fa' ? 'جستجو در جلسه‌ها...' : 'Search sessions...'}
              className="w-full ps-8 pe-3 py-1.5 rounded-lg border border-white/80 dark:border-white/10 bg-white/60 dark:bg-black/40 text-xs text-[#12343b] dark:text-[#e4f0ee] placeholder-[#587479] focus:outline-hidden focus:border-[#d98a1f]"
            />
            <Search className="w-3.5 h-3.5 text-[#587479] absolute inset-inline-start-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Scrollable Curriculum (.scroll) without default scrollbar */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
          {/* Quick Start Navigation (.start) */}
          {!searchQuery && (
            <nav className="space-y-1 pb-3 border-b border-[#c3d4d4]/60 dark:border-[#274347]">
              {/* Page 0 Feature Card */}
              <button
                onClick={() => navigateTo(0)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-start cursor-pointer ${
                  page === 0
                    ? 'bg-[#12343b] text-[#f2f8f6] shadow-sm'
                    : 'bg-[#eaf2f1] dark:bg-[#172d31] text-[#12343b] dark:text-[#e4f0ee] hover:brightness-95'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Sparkles className="w-4 h-4 text-[#d98a1f] shrink-0" />
                  <span className="truncate">{lang === 'fa' ? 'کارگاه پرامپت و مبانی LLM' : 'LLM Prompt Workshop'}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#d98a1f] text-[#2a1a00] shrink-0">
                  Workshop
                </span>
              </button>

              {/* Placement Quiz */}
              <button
                onClick={() => navigateTo('quiz')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-start cursor-pointer ${
                  page === 'quiz'
                    ? 'bg-[#fdf0d8] dark:bg-[#2b2412] text-[#d98a1f] dark:text-[#f0b04a] font-bold border border-[#d98a1f]'
                    : 'text-[#12343b] dark:text-[#e4f0ee] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31]'
                }`}
              >
                <Target className="w-4 h-4 text-[#1e8f6b] shrink-0" />
                <span className="truncate">{lang === 'fa' ? 'آزمون سطح‌سنجی (ورود)' : 'Readiness Quiz'}</span>
              </button>
            </nav>
          )}

          {/* 6 CPMAI PHASES MASTER ARCHITECTURE */}
          <div className="space-y-2.5">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span>{lang === 'fa' ? 'فازهای ۶گانه استاندارد CPMAI' : '6 CPMAI Master Phases'}</span>
              <span className="font-mono text-[9px] text-gray-400">کتاب کار ۹۷ صفحه‌ای</span>
            </span>

            {CPMAI_MASTER_CURRICULUM.map((phase) => {
              const isOpenPhase = openPhases[phase.id] || !!searchQuery;
              const isPhaseActive = phase.status === 'active';

              // Flatten sessions for search and count
              const allPhaseSessions: PhaseSessionItem[] = phase.taskGroups
                ? phase.taskGroups.flatMap((tg) => tg.sessions)
                : phase.sessions || [];

              const filteredSessions = allPhaseSessions.filter((s) =>
                searchQuery
                  ? (lang === 'fa' ? s.titleFa : s.titleEn).includes(searchQuery)
                  : true
              );

              if (searchQuery && filteredSessions.length === 0) return null;

              const phaseDoneCount = allPhaseSessions.filter((s) => completedSessions[s.page]).length;
              const phaseFraction = allPhaseSessions.length > 0 ? phaseDoneCount / allPhaseSessions.length : 0;

              return (
                <div key={phase.id} className="rounded-xl border border-black/[0.04] dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.01] transition-all overflow-hidden">
                  {/* Phase Button (.phase-btn) */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] transition-all text-start cursor-pointer select-none"
                  >
                    {/* SVG Circular Progress Ring (.ring) */}
                    <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
                      <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                        <circle
                          cx="14"
                          cy="14"
                          r={radius}
                          className="stroke-[#c3d4d4] dark:stroke-[#274347] fill-none stroke-[2.5]"
                        />
                        <circle
                          cx="14"
                          cy="14"
                          r={radius}
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference * (1 - phaseFraction)}
                          className="stroke-[#1e8f6b] fill-none stroke-[2.5] stroke-linecap-round transition-all duration-300"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#12343b] dark:text-[#e4f0ee]">
                        {isPhaseActive ? phaseDoneCount : phase.roman}
                      </span>
                    </div>

                    {/* Phase Title + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="block text-xs font-bold text-[#12343b] dark:text-[#e4f0ee] truncate">
                          {lang === 'fa' ? phase.titleFa : phase.titleEn}
                        </span>
                        {!isPhaseActive && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-black/5 dark:bg-white/10 text-gray-500">
                            {phase.status === 'in_development' ? (lang === 'fa' ? 'به‌زودی' : 'Soon') : (lang === 'fa' ? 'نقشه راه' : 'Roadmap')}
                          </span>
                        )}
                      </div>
                      <small className="block text-[10px] text-[#587479] dark:text-[#8ca8ab]">
                        {lang === 'fa' ? phase.pageRangeFa : phase.pageRangeEn}
                      </small>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#587479] transition-transform duration-200 shrink-0 ${
                        isOpenPhase ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Sessions Container */}
                  {isOpenPhase && (
                    <div className="p-2 pt-0 space-y-3">
                      {/* If Phase 1: Render Task Groups with Tree Branch Styling */}
                      {phase.taskGroups ? (
                        phase.taskGroups.map((tg, tgIdx) => {
                          const tgKey = `${phase.id}-${tgIdx}`;
                          const isTgOpen = openTaskGroups[tgKey] !== false || !!searchQuery;
                          const groupDoneCount = tg.sessions.filter((s) => completedSessions[s.page]).length;

                          return (
                            <div key={tgIdx} className="space-y-1">
                              {/* Task Group Header (Collapsible sub-branch) */}
                              <button
                                type="button"
                                onClick={() => toggleTaskGroup(tgKey)}
                                className="w-full flex items-center justify-between px-2 py-1 rounded-md text-start transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer group/tg"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <ChevronDown
                                    className={`w-3 h-3 text-[#587479] transition-transform duration-200 shrink-0 ${
                                      isTgOpen ? '' : '-rotate-90'
                                    }`}
                                  />
                                  <span className="text-[11px] font-bold text-[#12343b] dark:text-[#e4f0ee] truncate">
                                    {lang === 'fa' ? tg.titleFa : tg.titleEn}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 shrink-0">
                                  {groupDoneCount}/{tg.sessions.length}
                                </span>
                              </button>

                              {/* Task Group Sessions (Tree Leaves with connecting lines) */}
                              {isTgOpen && (
                                <ol className="relative pe-1 ps-3.5 space-y-1 ms-2 border-s-2 border-dashed border-[#c3d4d4] dark:border-[#274347]">
                                  {tg.sessions.map((session) => {
                                    const Icon = session.icon;
                                    const isCurrent = page === session.page;
                                    const isDone = !!completedSessions[session.page];
                                    const isLocked = isSessionLocked(session.page);

                                    return (
                                      <li key={session.page} className="relative group/li">
                                        {/* Horizontal Branch Branchlet (L-connector) */}
                                        <div className="absolute top-3.5 -start-3.5 w-3 h-0.5 border-t-2 border-dashed border-[#c3d4d4] dark:border-[#274347] pointer-events-none" />

                                        <div
                                          onClick={() => navigateTo(session.page as AppPage)}
                                          className={`group/sess flex items-center justify-between p-1.5 rounded-lg text-start transition-all cursor-pointer ${
                                            isCurrent
                                              ? 'bg-[#fdf0d8] dark:bg-[#2b2412] text-[#12343b] dark:text-[#e4f0ee] font-bold shadow-2xs'
                                              : isLocked
                                              ? 'opacity-80 hover:bg-rose-500/5 text-[#587479] dark:text-[#8ca8ab]'
                                              : 'hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] text-[#587479] dark:text-[#8ca8ab] hover:text-[#12343b] dark:hover:text-[#e4f0ee]'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 truncate">
                                            <span
                                              className={`w-5 h-5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 transition-all ${
                                                isDone
                                                  ? 'bg-[#1e8f6b] text-white border-[#1e8f6b]'
                                                  : isCurrent
                                                  ? 'bg-[#fafdfc] dark:bg-[#0f1f22] border-[#d98a1f] text-[#d98a1f] ring-2 ring-[#d98a1f]/30'
                                                  : isLocked
                                                  ? 'bg-[#fafdfc] dark:bg-[#0f1f22] border-rose-300 dark:border-rose-900/50 text-rose-500'
                                                  : 'bg-[#fafdfc] dark:bg-[#0f1f22] border-[#c3d4d4] dark:border-[#274347] text-[#587479]'
                                              }`}
                                            >
                                              {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : session.page}
                                            </span>
                                            <span className="text-xs truncate">
                                              {lang === 'fa' ? session.titleFa : session.titleEn}
                                            </span>
                                          </div>

                                          <div className="flex items-center gap-1 shrink-0">
                                            {isLocked ? (
                                              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/25 text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                                                <Lock className="w-3 h-3 text-rose-500" />
                                                <span className="text-[9px] hidden sm:inline">قفل</span>
                                              </span>
                                            ) : (
                                              <button
                                                type="button"
                                                onClick={(e) => toggleSessionDone(session.page, e)}
                                                title={isDone ? 'علامت‌گذاری به‌عنوان خوانده‌نشده' : 'علامت‌گذاری به‌عنوان انجام‌شده'}
                                                className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                                                  isDone
                                                    ? 'bg-[#1e8f6b] border-[#1e8f6b] text-white'
                                                    : 'opacity-0 group-hover/sess:opacity-100 border-[#c3d4d4] hover:border-[#1e8f6b] bg-white dark:bg-[#172d31]'
                                                }`}
                                              >
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ol>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        /* Upcoming Phase Sessions (Roadmap) */
                        <ol className="relative pe-1 ps-2 space-y-0.5">
                          {(phase.sessions || []).map((session) => (
                            <li key={session.page} className="opacity-70">
                              <div
                                onClick={() => {
                                  alert(lang === 'fa'
                                    ? `جلسه ${session.page} مربوط به ${phase.titleFa} است و در قالب نقشه راه توسعه به زودی فعال خواهد شد.`
                                    : `Session ${session.page} (${phase.titleEn}) is coming soon in the curriculum roadmap.`
                                  );
                                }}
                                className="flex items-center justify-between p-1.5 rounded-lg text-[#587479] dark:text-[#8ca8ab] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-xs"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  <span className="truncate">{lang === 'fa' ? session.titleFa : session.titleEn}</span>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400">Roadmap</span>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* More Nav (.more) */}
          <nav className="pt-3 border-t border-white/60 dark:border-white/10 space-y-1">
            <button
              onClick={() => {
                onOpenBookModal();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#587479] dark:text-[#8ca8ab] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#12343b] text-start transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'کتابچه LLM به زبان آدمیزاد' : 'LLM Book Digest'}</span>
            </button>
            <button
              onClick={() => navigateTo('landing')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#587479] dark:text-[#8ca8ab] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#12343b] text-start transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'صفحه لندینگ و معرفی' : 'Landing & Overview'}</span>
            </button>
          </nav>
        </div>

        {/* Footer with Progress Bar & Continue Action (.foot) */}
        <footer className="p-4 border-t border-white/60 dark:border-white/10 bg-transparent space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#587479] dark:text-[#8ca8ab]">
            <span>{lang === 'fa' ? 'پیشرفت فاز اول (درک کسب‌وکار)' : 'Phase I Progress'}</span>
            <span className="font-mono font-bold">
              {lang === 'fa' ? `${doneCount} از ${phase1TotalSessions} جلسه (${progressPercent}٪)` : `${doneCount} / ${phase1TotalSessions} (${progressPercent}%)`}
            </span>
          </div>

          {/* Progress Bar (.bar) */}
          <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#1e8f6b] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Continue button (.cont) */}
          <button
            onClick={() => navigateTo(typeof page === 'number' && page >= 1 ? page : 1)}
            className="w-full py-2 px-3 rounded-xl bg-[#d98a1f] hover:brightness-105 active:scale-[0.98] text-[#2a1a00] font-bold text-xs transition-all shadow-xs text-center cursor-pointer"
          >
            {lang === 'fa'
              ? `ادامه از جلسهٔ ${typeof page === 'number' && page >= 1 ? page : 1}`
              : `Continue from Session ${typeof page === 'number' && page >= 1 ? page : 1}`}
          </button>
        </footer>
      </aside>
    </>
  );
};
