import React, { useState, useEffect, useRef } from 'react';
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
  Server
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

interface NavPhaseGroup {
  id: number;
  roman: string;
  titleFa: string;
  titleEn: string;
  subFa: string;
  subEn: string;
  sessions: {
    page: number;
    titleFa: string;
    titleEn: string;
    icon: React.ElementType;
  }[];
}

const CPMAI_PHASES: NavPhaseGroup[] = [
  {
    id: 1,
    roman: 'I',
    titleFa: 'فاز اول',
    titleEn: 'Phase I',
    subFa: 'شناخت کسب‌وکار',
    subEn: 'Business Understanding',
    sessions: [
      { page: 1, titleFa: 'درک کسب‌وکار و اهداف', titleEn: 'Business Understanding', icon: BookOpen },
      { page: 2, titleFa: 'تعریف مسئله در این تکرار', titleEn: 'Problem Iteration', icon: Layers },
      { page: 3, titleFa: 'معیارهای عینی موفقیت', titleEn: 'Success Criteria', icon: Award },
      { page: 4, titleFa: 'تحلیل هزینه-فایده و بودجه', titleEn: 'Cost-Benefit Analysis', icon: DollarSign },
      { page: 5, titleFa: 'برآورد نرخ بازگشت سرمایه (ROI)', titleEn: 'Expected ROI', icon: TrendingUp }
    ]
  },
  {
    id: 2,
    roman: 'II',
    titleFa: 'فاز دوم',
    titleEn: 'Phase II',
    subFa: 'نیازمندی‌ها و چرایی AI',
    subEn: 'Cognitive Needs & Why AI',
    sessions: [
      { page: 6, titleFa: 'الزامات شناختی پروژه', titleEn: 'Cognitive Requirements', icon: Brain },
      { page: 7, titleFa: 'ضرورت راهکار شناختی (چرا AI؟)', titleEn: 'Why AI Solution', icon: Cpu },
      { page: 8, titleFa: 'بخش‌های غیرشناختی و سنتی', titleEn: 'Noncognitive Alternatives', icon: Layers },
      { page: 9, titleFa: 'اهداف اختصاصی شناختی', titleEn: 'Cognitive Objectives', icon: Target },
      { page: 10, titleFa: 'خروجی‌های مورد انتظار شناختی', titleEn: 'Cognitive Outcomes', icon: Award }
    ]
  },
  {
    id: 3,
    roman: 'III',
    titleFa: 'فاز سوم',
    titleEn: 'Phase III',
    subFa: 'الگوهای شناختی ۷گانه',
    subEn: '7 Cognitive Patterns',
    sessions: [
      { page: 11, titleFa: 'معیارهای موفقیت پروژه AI', titleEn: 'AI Success Criteria', icon: Award },
      { page: 12, titleFa: 'الگوهای هفت‌گانه شناختی', titleEn: '7 AI Patterns', icon: Boxes },
      { page: 13, titleFa: 'انتخاب و توجیه الگوها', titleEn: 'Patterns Selection', icon: Split }
    ]
  },
  {
    id: 4,
    roman: 'IV',
    titleFa: 'فاز چهارم',
    titleEn: 'Phase IV',
    subFa: 'وضعیت، مهارت و برنامه',
    subEn: 'Assess, Skills & Schedule',
    sessions: [
      { page: 14, titleFa: 'ارزیابی وضعیت و نیازمندی‌ها', titleEn: 'Assess Situation', icon: Gauge },
      { page: 15, titleFa: 'فناوری‌ها و مهارت‌های لازم', titleEn: 'Technology & Skills', icon: Network },
      { page: 16, titleFa: 'مایل‌استون‌ها و زمان‌بندی', titleEn: 'Schedule Requirements', icon: Calendar }
    ]
  },
  {
    id: 5,
    roman: 'V',
    titleFa: 'فاز پنجم',
    titleEn: 'Phase V',
    subFa: 'سنجه‌های ارزیابی و مرزها',
    subEn: 'Metrics & Boundaries',
    sessions: [
      { page: 17, titleFa: 'محدودیت‌ها و مرزهای عملکرد', titleEn: 'Boundaries & Constraints', icon: ShieldCheck },
      { page: 18, titleFa: 'سنجه‌ها و متریک‌های ارزیابی', titleEn: 'Performance Metrics', icon: Calculator },
      { page: 19, titleFa: 'الزامات عملکرد در برابر خط مبنا', titleEn: 'Requirements vs Baseline', icon: Workflow }
    ]
  },
  {
    id: 6,
    roman: 'VI',
    titleFa: 'فاز ششم',
    titleEn: 'Phase VI',
    subFa: 'شاخص‌های عملیاتی (KPI)',
    subEn: 'Operational KPIs',
    sessions: [
      { page: 20, titleFa: 'مقادیر قابل‌قبول KPI مدل', titleEn: 'Acceptable KPI Values', icon: Server },
      { page: 21, titleFa: 'شاخص‌های زیرساخت و فناوری', titleEn: 'Required Technology KPIs', icon: HardDrive }
    ]
  }
];

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
  // Width resizability state (default 344px, min 280, max 460)
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cpmai-sidebar-w');
      if (saved) return Math.max(280, Math.min(460, parseInt(saved, 10)));
    } catch {
      // LocalStorage error
    }
    return 344;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
  const [completedSessions, setCompletedSessions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cpmai-completed-sessions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { 1: true };
  });

  const discMeta = disciplineId ? getDisciplineMetadata(disciplineId) : null;

  // Persist width
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
      // In RTL: dragging from left edge of screen or right depending on placement
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

  // Overall progress calculations
  const totalSessions = 21;
  const doneCount = Object.keys(completedSessions).filter((k) => completedSessions[+k] && +k >= 1 && +k <= 21).length;
  const progressPercent = Math.round((doneCount / totalSessions) * 100);

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
        style={{ width: window.innerWidth >= 1024 ? `${sidebarWidth}px` : undefined }}
        className={`fixed lg:sticky inset-y-0 start-0 lg:top-16 z-50 lg:z-30 h-full lg:h-[calc(100vh-4rem)] w-[min(340px,88vw)] lg:w-auto shrink-0 bg-[#f8fbfa]/95 dark:bg-[#0f1f22]/95 backdrop-blur-2xl border-inline-end border-[#c3d4d4] dark:border-[#274347] flex flex-col shadow-2xl lg:shadow-[inset_-1px_0_0_rgba(255,255,255,0.4)] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${isDragging ? 'select-none' : ''}`}
      >
        {/* Resize Grip Handle (.grip) on Desktop */}
        <div
          onMouseDown={() => setIsDragging(true)}
          onDoubleClick={() => updateWidth(344, true)}
          title={lang === 'fa' ? 'برای تغییر عرض بکشید (دوبار کلیک برای ریست)' : 'Drag to resize, double-click to reset'}
          className="hidden lg:block absolute inset-y-0 -inset-inline-end-1 w-2.5 cursor-col-resize z-20 group/grip"
        >
          <div className="w-0.5 h-full bg-[#d98a1f] opacity-0 group-hover/grip:opacity-100 transition-opacity mx-auto" />
        </div>

        {/* Top Header & Search (.top) */}
        <div className="p-4 pb-3 border-b border-[#c3d4d4]/60 dark:border-[#274347] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-sm font-extrabold text-[#12343b] dark:text-[#e4f0ee] leading-tight">
                {lang === 'fa' ? 'سرفصل‌های کارگاه CPMAI' : 'CPMAI Curriculum'}
              </h1>
              <span className="block text-[11px] font-semibold text-[#587479] dark:text-[#8ca8ab] mt-0.5">
                {discMeta
                  ? `${industryTrack === 'CIVIL_INFRA' ? 'راه و شهرسازی' : 'پتروشیمی'} · ${discMeta.shortTitleFa}`
                  : (industryTrack === 'CIVIL_INFRA' ? 'هلدینگ راه و شهرسازی' : 'هلدینگ پتروشیمی')}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#587479] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] lg:hidden"
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
              className="w-full ps-8 pe-3 py-1.5 rounded-lg border border-[#c3d4d4] dark:border-[#274347] bg-[#e6eded]/60 dark:bg-[#08130f]/60 text-xs text-[#12343b] dark:text-[#e4f0ee] placeholder-[#587479] focus:outline-hidden focus:border-[#d98a1f]"
            />
            <Search className="w-3.5 h-3.5 text-[#587479] absolute inset-inline-start-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Scrollable Curriculum (.scroll) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
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

          {/* 6 Phases Accordion Timeline (.phases) */}
          <div className="space-y-2">
            {CPMAI_PHASES.map((phase) => {
              const isOpenPhase = openPhases[phase.id] || !!searchQuery;
              const filteredSessions = phase.sessions.filter((s) =>
                searchQuery
                  ? (lang === 'fa' ? s.titleFa : s.titleEn).includes(searchQuery)
                  : true
              );

              if (searchQuery && filteredSessions.length === 0) return null;

              const phaseDoneCount = phase.sessions.filter((s) => completedSessions[s.page]).length;
              const phaseFraction = phaseDoneCount / phase.sessions.length;

              return (
                <div key={phase.id} className="rounded-xl border border-transparent transition-all">
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
                        {phaseDoneCount}
                      </span>
                    </div>

                    {/* Phase Title + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-[#12343b] dark:text-[#e4f0ee] truncate">
                        {lang === 'fa' ? `${phase.titleFa}: ${phase.subFa}` : `${phase.titleEn}: ${phase.subEn}`}
                      </span>
                      <small className="block text-[10px] text-[#587479] dark:text-[#8ca8ab]">
                        {lang === 'fa'
                          ? `${phaseDoneCount} از ${phase.sessions.length} جلسه`
                          : `${phaseDoneCount} of ${phase.sessions.length} sessions`}
                      </small>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#587479] transition-transform duration-200 shrink-0 ${
                        isOpenPhase ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Sessions List with Timeline Connector Lines (.panel) */}
                  {isOpenPhase && (
                    <ol className="relative pe-1 ps-3 space-y-1 pt-1 ms-3.5 border-s-2 border-dashed border-[#c3d4d4] dark:border-[#274347]">
                      {filteredSessions.map((session, sIdx) => {
                        const isNow = page === session.page;
                        const isDone = !!completedSessions[session.page];
                        const isLocked = isSessionLocked(session.page);

                        return (
                          <li key={session.page} className="relative">
                            <div
                              onClick={() => navigateTo(session.page as AppPage)}
                              className={`group/sess flex items-center justify-between p-1.5 rounded-lg text-start transition-all cursor-pointer ${
                                isNow
                                  ? 'bg-[#fdf0d8] dark:bg-[#2b2412] text-[#12343b] dark:text-[#e4f0ee] font-bold shadow-2xs'
                                  : 'hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] text-[#587479] dark:text-[#8ca8ab] hover:text-[#12343b] dark:hover:text-[#e4f0ee]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {/* Number Node Circle (.node) */}
                                <span
                                  className={`w-6 h-6 rounded-full border text-[11px] font-mono font-bold flex items-center justify-center shrink-0 transition-all ${
                                    isDone
                                      ? 'bg-[#1e8f6b] text-white border-[#1e8f6b]'
                                      : isNow
                                      ? 'bg-[#fafdfc] dark:bg-[#0f1f22] border-[#d98a1f] text-[#d98a1f] ring-2 ring-[#d98a1f]/30'
                                      : 'bg-[#fafdfc] dark:bg-[#0f1f22] border-[#c3d4d4] dark:border-[#274347] text-[#587479]'
                                  }`}
                                >
                                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : session.page}
                                </span>

                                <span className="text-xs truncate">
                                  {lang === 'fa' ? session.titleFa : session.titleEn}
                                </span>
                              </div>

                              {/* Action: Drip Lock or Checkbox (.check) */}
                              <div className="flex items-center gap-1 shrink-0">
                                {isLocked ? (
                                  <Lock className="w-3 h-3 text-rose-500/80" />
                                ) : (
                                  <button
                                    type="button"
                                    onClick={(e) => toggleSessionDone(session.page, e)}
                                    title={isDone ? 'علامت‌گذاری به‌عنوان خوانده‌نشده' : 'علامت‌گذاری به‌عنوان انجام‌شده'}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                      isDone
                                        ? 'bg-[#1e8f6b] border-[#1e8f6b] text-white'
                                        : 'opacity-0 group-hover/sess:opacity-100 border-[#c3d4d4] hover:border-[#1e8f6b] bg-white dark:bg-[#172d31]'
                                    }`}
                                  >
                                    <Check className="w-3 h-3 stroke-[3]" />
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
            })}
          </div>

          {/* More Nav (.more) */}
          <nav className="pt-3 border-t border-[#c3d4d4]/60 dark:border-[#274347] space-y-1">
            <button
              onClick={() => {
                onOpenBookModal();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#587479] dark:text-[#8ca8ab] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] hover:text-[#12343b] text-start transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'کتابچه LLM به زبان آدمیزاد' : 'LLM Book Digest'}</span>
            </button>
            <button
              onClick={() => navigateTo('landing')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#587479] dark:text-[#8ca8ab] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] hover:text-[#12343b] text-start transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'صفحه لندینگ و معرفی' : 'Landing & Overview'}</span>
            </button>
          </nav>
        </div>

        {/* Footer with Progress Bar & Continue Action (.foot) */}
        <footer className="p-4 border-t border-[#c3d4d4]/60 dark:border-[#274347] bg-[#f8fbfa] dark:bg-[#0f1f22] space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#587479] dark:text-[#8ca8ab]">
            <span>{lang === 'fa' ? 'پیشرفت شما' : 'Your Progress'}</span>
            <span className="font-mono font-bold">
              {lang === 'fa' ? `${doneCount} از ${totalSessions} جلسه (${progressPercent}٪)` : `${doneCount} / ${totalSessions} (${progressPercent}%)`}
            </span>
          </div>

          {/* Progress Bar (.bar) */}
          <div className="w-full h-1.5 rounded-full bg-[#c3d4d4] dark:bg-[#274347] overflow-hidden">
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
