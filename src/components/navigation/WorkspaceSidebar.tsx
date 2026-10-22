import React, { useState } from 'react';
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
  ChevronRight,
  X,
  PanelLeftClose,
  PanelLeft,
  Home,
  CheckCircle2,
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
    titleFa: 'فاز اول: شناخت کسب‌وکار',
    titleEn: 'Phase I: Business Understanding',
    sessions: [
      { page: 1, titleFa: 'جلسه ۱: درک کسب‌وکار و اهداف', titleEn: 'Session 1: Business Understanding', icon: BookOpen },
      { page: 2, titleFa: 'جلسه ۲: تعریف مسئله در این تکرار', titleEn: 'Session 2: Problem Iteration', icon: Layers },
      { page: 3, titleFa: 'جلسه ۳: معیارهای عینی موفقیت', titleEn: 'Session 3: Success Criteria', icon: Award },
      { page: 4, titleFa: 'جلسه ۴: تحلیل هزینه-فایده و بودجه', titleEn: 'Session 4: Cost-Benefit Analysis', icon: DollarSign },
      { page: 5, titleFa: 'جلسه ۵: برآورد نرخ بازگشت سرمایه (ROI)', titleEn: 'Session 5: Expected ROI', icon: TrendingUp }
    ]
  },
  {
    id: 2,
    roman: 'II',
    titleFa: 'فاز دوم: نیازمندی‌ها و چرایی AI',
    titleEn: 'Phase II: Cognitive Needs & Why AI',
    sessions: [
      { page: 6, titleFa: 'جلسه ۶: الزامات شناختی پروژه', titleEn: 'Session 6: Cognitive Requirements', icon: Brain },
      { page: 7, titleFa: 'جلسه ۷: ضرورت راهکار شناختی (چرا AI؟)', titleEn: 'Session 7: Why AI Solution', icon: Cpu },
      { page: 8, titleFa: 'جلسه ۸: بخش‌های غیرشناختی و سنتی', titleEn: 'Session 8: Noncognitive Alternatives', icon: Layers },
      { page: 9, titleFa: 'جلسه ۹: اهداف اختصاصی شناختی', titleEn: 'Session 9: Cognitive Objectives', icon: Target },
      { page: 10, titleFa: 'جلسه ۱۰: خروجی‌های مورد انتظار شناختی', titleEn: 'Session 10: Cognitive Outcomes', icon: Award }
    ]
  },
  {
    id: 3,
    roman: 'III',
    titleFa: 'فاز سوم: الگوهای شناختی ۷گانه',
    titleEn: 'Phase III: 7 Cognitive Patterns',
    sessions: [
      { page: 11, titleFa: 'جلسه ۱۱: معیارهای موفقیت پروژه AI', titleEn: 'Session 11: AI Success Criteria', icon: Award },
      { page: 12, titleFa: 'جلسه ۱۲: الگوهای هفت‌گانه شناختی', titleEn: 'Session 12: 7 AI Patterns', icon: Boxes },
      { page: 13, titleFa: 'جلسه ۱۳: انتخاب و توجیه الگوها', titleEn: 'Session 13: Patterns Selection', icon: Split }
    ]
  },
  {
    id: 4,
    roman: 'IV',
    titleFa: 'فاز چهارم: وضعیت، مهارت و برنامه',
    titleEn: 'Phase IV: Assess, Skills & Schedule',
    sessions: [
      { page: 14, titleFa: 'جلسه ۱۴: ارزیابی وضعیت و نیازمندی‌ها', titleEn: 'Session 14: Assess Situation', icon: Gauge },
      { page: 15, titleFa: 'جلسه ۱۵: فناوری‌ها و مهارت‌های لازم', titleEn: 'Session 15: Technology & Skills', icon: Network },
      { page: 16, titleFa: 'جلسه ۱۶: مایل‌استون‌ها و زمان‌بندی', titleEn: 'Session 16: Schedule Requirements', icon: Calendar }
    ]
  },
  {
    id: 5,
    roman: 'V',
    titleFa: 'فاز پنجم: سنجه‌های ارزیابی و مرزها',
    titleEn: 'Phase V: Metrics & Boundaries',
    sessions: [
      { page: 17, titleFa: 'جلسه ۱۷: محدودیت‌ها و مرزهای عملکرد', titleEn: 'Session 17: Boundaries & Constraints', icon: ShieldCheck },
      { page: 18, titleFa: 'جلسه ۱۸: سنجه‌ها و متریک‌های ارزیابی', titleEn: 'Session 18: Performance Metrics', icon: Calculator },
      { page: 19, titleFa: 'جلسه ۱۹: الزامات عملکرد در برابر خط مبنا', titleEn: 'Session 19: Requirements vs Baseline', icon: Workflow }
    ]
  },
  {
    id: 6,
    roman: 'VI',
    titleFa: 'فاز ششم: شاخص‌های عملیاتی (KPI)',
    titleEn: 'Phase VI: Operational KPIs',
    sessions: [
      { page: 20, titleFa: 'جلسه ۲۰: مقادیر قابل‌قبول KPI مدل', titleEn: 'Session 20: Acceptable KPI Values', icon: Server },
      { page: 21, titleFa: 'جلسه ۲۱: شاخص‌های زیرساخت و فناوری', titleEn: 'Session 21: Required Technology KPIs', icon: HardDrive }
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
  const [collapsedPhases, setCollapsedPhases] = useState<Record<number, boolean>>({});

  const togglePhase = (phaseId: number) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const discMeta = disciplineId ? getDisciplineMetadata(disciplineId) : null;

  const navigateTo = (target: AppPage) => {
    onSelectPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 z-50 lg:z-30 h-[100dvh] w-72 sm:w-80 shrink-0 bg-white dark:bg-[#131b20] border-e border-[#d9dad5]/80 dark:border-[#26333c]/80 flex flex-col shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 border-b border-[#d9dad5]/70 dark:border-[#26333c]/70 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1f5163] text-white flex items-center justify-center font-black text-xs shadow-xs">
              AI
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'سرفصل‌های کارگاه CPMAI' : 'CPMAI Curriculum'}
              </span>
              <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] truncate max-w-[170px]">
                {discMeta
                  ? (lang === 'fa' ? discMeta.shortTitleFa : discMeta.shortTitleEn)
                  : (industryTrack === 'ENERGY_PETRO' ? 'نفت و پتروشیمی' : 'راه و شهرسازی')}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 lg:hidden"
            title="بستن سایدبار"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs">
          {/* SECTION 1: CORE GATEWAYS */}
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {lang === 'fa' ? 'گام‌های بنیادین و مدال‌ها' : 'Foundations & Toolkits'}
            </span>

            {/* Landing */}
            <button
              onClick={() => navigateTo('landing')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition-all ${
                page === 'landing'
                  ? 'bg-[#2563EB]/15 text-[#2563EB] dark:text-[#60A5FA] ring-1 ring-[#2563EB]/30'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Home className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>{lang === 'fa' ? 'صفحه لندینگ و معرفی' : 'Landing Page'}</span>
            </button>

            {/* Page 0: LLM Toolkit */}
            <button
              onClick={() => navigateTo(0)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all ${
                page === 0
                  ? 'bg-[#1f5163] text-white shadow-xs'
                  : 'text-[#1f5163] dark:text-[#6fb3c6] bg-[#1f5163]/5 dark:bg-[#6fb3c6]/10 hover:bg-[#1f5163]/15'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{lang === 'fa' ? 'صفحه ۰: کارگاه پرامپت و مبانی LLM' : 'Page 0: LLM Toolkit'}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 font-mono">
                Workshop
              </span>
            </button>

            {/* Quiz */}
            <button
              onClick={() => navigateTo('quiz')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition-all ${
                page === 'quiz'
                  ? 'bg-[#2f7d5b] text-white shadow-xs'
                  : 'text-[#2f7d5b] dark:text-[#52b788] bg-[#2f7d5b]/10 dark:bg-[#2f7d5b]/15 hover:bg-[#2f7d5b]/20'
              }`}
            >
              <Target className="w-4 h-4 shrink-0" />
              <span>{lang === 'fa' ? '🎯 آزمون سطح‌سنجی (ورود)' : '🎯 Readiness Quiz'}</span>
            </button>

            {/* Book Digest Modal Trigger */}
            <button
              onClick={() => {
                onOpenBookModal();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all text-right"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{lang === 'fa' ? '📚 کتابچه LLM به زبان آدمیزاد' : '📚 Book Digest'}</span>
            </button>
          </div>

          {/* SECTION 2: 21 CPMAI CURRICULUM PHASES */}
          <div className="space-y-3 pt-2 border-t border-[#d9dad5]/60 dark:border-[#26333c]/60">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span>{lang === 'fa' ? 'جلسات ۲۱گانه متدولوژی CPMAI' : '21 CPMAI Sessions'}</span>
              <span className="font-mono text-[9px] text-gray-400">۶ فاز</span>
            </span>

            {CPMAI_PHASES.map((phase) => {
              const isCollapsed = collapsedPhases[phase.id];
              const hasActiveChild = phase.sessions.some((s) => s.page === page);

              return (
                <div key={phase.id} className="space-y-1">
                  {/* Phase Group Accordion Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-start transition-all cursor-pointer ${
                      hasActiveChild
                        ? 'bg-black/[0.04] dark:bg-white/[0.05] text-[#1c2830] dark:text-[#e8ebe9] font-black'
                        : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {phase.roman}
                      </span>
                      <span className="text-[11px] font-bold truncate">
                        {lang === 'fa' ? phase.titleFa : phase.titleEn}
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {/* Phase Session Items */}
                  {!isCollapsed && (
                    <div className="space-y-0.5 pe-1 ps-2 border-s-2 border-black/[0.06] dark:border-white/[0.08] ms-3.5">
                      {phase.sessions.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = page === item.page;
                        const isLocked = isSessionLocked(item.page);

                        return (
                          <button
                            key={item.page}
                            onClick={() => navigateTo(item.page as AppPage)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-start text-[11px] transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#1f5163] text-white font-bold shadow-2xs'
                                : 'text-[#4b5563] dark:text-[#9ca3af] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] hover:text-[#111827] dark:hover:text-[#f3f4f6]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                              <span className="truncate">{lang === 'fa' ? item.titleFa : item.titleEn}</span>
                            </div>
                            {isLocked && (
                              <Lock className={`w-3 h-3 shrink-0 ${isCurrent ? 'text-white/80' : 'text-rose-500/80'}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer with Discipline Quick Card */}
        {discMeta && (
          <div className="p-3 border-t border-[#d9dad5]/70 dark:border-[#26333c]/70 bg-black/[0.01] dark:bg-white/[0.02]">
            <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-semibold">دیسیپلین فعال شما:</span>
                <span className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] truncate max-w-[190px]">
                  {lang === 'fa' ? discMeta.shortTitleFa : discMeta.shortTitleEn}
                </span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
