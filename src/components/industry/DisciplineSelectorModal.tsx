import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  DisciplineId,
  IndustryTrackId,
  EngineeringRoleId,
  INDUSTRY_TRACKS,
  saveDiscipline,
  saveRole
} from '../../types/industryTrack';
import { getDisciplinesByTrack, getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';
import { ALL_INDUSTRY_TRACKS } from '../../utils/userWorkspaceEngine';
import {
  X,
  Check,
  CheckCircle2,
  Building2,
  Factory,
  Sparkles,
  Landmark,
  Home,
  ChevronLeft
} from 'lucide-react';

interface DisciplineSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: IndustryTrackId;
  currentDiscipline: DisciplineId;
  currentRole: EngineeringRoleId;
  onSelectDiscipline: (disciplineId: DisciplineId) => void;
  onSelectRole: (roleId: EngineeringRoleId) => void;
  onSelectTrack?: (trackId: IndustryTrackId) => void;
  isAdmin?: boolean;
  lang?: 'fa' | 'en';
}

const spring = { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 } as const;
const springSnappy = { type: 'spring', stiffness: 420, damping: 28 } as const;
const SHIFT = 6;
const R_REST = 14;
const R_HOVER = 18;

const TRACK_FILTER_LABELS_FA: Record<IndustryTrackId, string> = {
  CIVIL_INFRA: 'راه و شهرسازی و ابنیه',
  ENERGY_PETRO: 'نفت، گاز و پتروشیمی',
  PAYA_SAMAN_PARS: 'هلدینگ پایا سامان پارس',
  GENERAL_EVERYDAY: 'خانه و خانواده'
};

export const DisciplineSelectorModal: React.FC<DisciplineSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  currentDiscipline,
  currentRole,
  onSelectDiscipline,
  onSelectRole,
  onSelectTrack,
  isAdmin = false,
  lang = 'fa'
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>(currentDiscipline);
  const [selectedRole, setSelectedRole] = useState<EngineeringRoleId>(currentRole);
  const [adminTrackFilter, setAdminTrackFilter] = useState<'ALL' | IndustryTrackId>('ALL');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setSelectedDiscipline(currentDiscipline);
    setSelectedRole(currentRole);
    if (isAdmin) {
      setAdminTrackFilter('ALL');
    }
  }, [currentDiscipline, currentRole, isOpen, isAdmin]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedDiscMeta = useMemo(
    () => getDisciplineMetadata(selectedDiscipline),
    [selectedDiscipline]
  );

  // Active track reflects the selected discipline's track when admin browses across all companies
  const effectiveTrack: IndustryTrackId = isAdmin ? selectedDiscMeta.trackId : currentTrack;

  const visibleTracks: IndustryTrackId[] = useMemo(() => {
    if (!isAdmin) return [currentTrack];
    if (adminTrackFilter !== 'ALL') return [adminTrackFilter];
    // Put currentTrack first, then the rest of the tracks so the user's current context is immediately on top
    return [
      currentTrack,
      ...ALL_INDUSTRY_TRACKS.filter((t) => t !== currentTrack)
    ];
  }, [isAdmin, adminTrackFilter, currentTrack]);

  if (!isOpen) return null;

  const isRtl = lang === 'fa';
  const isEveryday = effectiveTrack === 'GENERAL_EVERYDAY';
  const isPaya = effectiveTrack === 'PAYA_SAMAN_PARS';

  const colASign = isMobile ? 0 : isRtl ? 1 : -1;
  const colBSign = isMobile ? 0 : isRtl ? -1 : 1;

  const roles = isEveryday
    ? [
        {
          id: 'director' as EngineeringRoleId,
          titleFa: 'سرپرست خانوار / مدیر ارشد اقتصاد خانه',
          titleEn: 'Head of Household & Family Decision Maker',
          descFa: 'مدیریت کلان بودجه و پس‌انداز خانواده، برنامه‌ریزی مسکن و سرمایه‌گذاری، تصمیم‌گیری اهداف سفر و آینده فرزندان',
          descEn: 'Macro budget stewardship, family savings, vacation funding & strategic household milestones'
        },
        {
          id: 'lead_superintendent' as EngineeringRoleId,
          titleFa: 'پدر، مادر یا هماهنگ‌کننده امور خانه',
          titleEn: 'Parent & Home Coordinator',
          descFa: 'آموزش و همراهی کودک، مدیریت سبد مصرف و مواد غذایی، سلامت و تغذیه اعضای خانواده و نظم روزانه',
          descEn: 'Child homework & emotional growth, zero-waste pantry planning, balanced family vitality'
        },
        {
          id: 'technical_engineer' as EngineeringRoleId,
          titleFa: 'فریلنسر، شاغل یا کارآفرین خرد',
          titleEn: 'Freelancer, Creator & Small Business Lead',
          descFa: 'تولید محتوا، شبکه‌های اجتماعی، بهره‌وری فردی، مذاکره و توسعه مهارت‌ها و جریان‌های درآمدی',
          descEn: 'Viral content creation, daily time-boxing, social media growth & independent income streams'
        },
        {
          id: 'site_operator' as EngineeringRoleId,
          titleFa: 'دانشجو، یادگیرنده یا جستجوگر هوش مصنوعی',
          titleEn: 'Student, Self-Learner & Everyday AI Explorer',
          descFa: 'تکالیف درسی و پژوهشی، یادگیری خودآموز، مهارت‌های نوین دیجیتال و حل هوشمند مسائل روزمره',
          descEn: 'Coursework mastery, rapid skill acquisition, homework shortcuts and hands-on AI experiments'
        }
      ]
    : isPaya
    ? [
        {
          id: 'director' as EngineeringRoleId,
          titleFa: 'مدیرعامل / معاونت هلدینگ یا مدیرعامل شرکت تابعه',
          titleEn: 'Holding Executive / Subsidiary Managing Director',
          descFa: 'حاکمیت ۶۳ پروژه در دو بال پیمانکاری و مسکن/کاوه، تصمیم‌گیری کنسرسیومی EPC+F/BOT و گزارش‌دهی هیئت‌مدیره',
          descEn: 'Dual-wing governance across 63 projects & 14 subsidiaries, EPC+F/BOT portfolio allocation & board strategy'
        },
        {
          id: 'lead_superintendent' as EngineeringRoleId,
          titleFa: 'مدیر طرح، کنسرسیوم یا سرپرست بهره‌برداری شهر صنعتی / مسکن',
          titleEn: 'Consortium / Program Lead or Kaveh / Housing Director',
          descFa: 'راهبری جبهه‌های متعدد راه/سد/ریل/فرودگاه یا بهره‌برداری شهر صنعتی کاوه، خورشیدی ۵MW و شهرک‌سازی',
          descEn: 'Leading domestic/UAE infrastructure corridors, Kaveh 3,000ha SEZ, 5MW solar/cold-plasma & mass housing'
        },
        {
          id: 'technical_engineer' as EngineeringRoleId,
          titleFa: 'کارشناس ارشد دفتر فنی، مناقصات، کنترل پروژه و امور پیمان',
          titleEn: 'Holding Technical Office, Bidding, PMO & Contracts Specialist',
          descFa: 'تجمیع گزارش‌های ۱۴ شرکت تابعه، تکمیل شناسنامه پروژه‌ها، متره، تعدیل و لوایح تاخیرات ماده ۳۰/فیدیک',
          descEn: '14-subsidiary progress aggregation, tender estimation, EPC+F claims & Circular 4311 / BOT compliance'
        },
        {
          id: 'site_operator' as EngineeringRoleId,
          titleFa: 'رئیس کارگاه، ناظر اجرا، مهندس MEP و سرپرست ناوگان',
          titleEn: 'Site Superintendent, MEP Engineer & Heavy Fleet Lead',
          descFa: 'اجرای کارگاهی راه/تونل/سد/ابنیه، تست تأسیسات تابیران، پایش ناوگان ماشین‌آلات سنگین و ایمنی HSE',
          descEn: 'Field construction execution, Tabiran MEP/63kV testing, heavy machinery dispatch & site HSE checks'
        }
      ]
    : [
        {
          id: 'director' as EngineeringRoleId,
          titleFa: 'مدیر طرح / مدیر ارشد پروژه',
          titleEn: 'Project Director / Executive PM',
          descFa: 'تصمیم‌گیری کلان سبد پروژه، مدل‌های مالی BOT/PPP، مناقصات و حاکمیت کلیم',
          descEn: 'Strategic portfolio decisions, BOT/PPP models, executive claims governance'
        },
        {
          id: 'lead_superintendent' as EngineeringRoleId,
          titleFa: 'سرپرست دیسیپلین / رئیس کارگاه',
          titleEn: 'Discipline Lead / Superintendent',
          descFa: 'راهبری عملیات اجرایی کارگاه، تخصیص منابع ماشین‌آلات و مدیریت پیمانکاران جزء',
          descEn: 'Field site supervision, heavy plant deployment, subcontractor management'
        },
        {
          id: 'technical_engineer' as EngineeringRoleId,
          titleFa: 'مهندس دفتر فنی / کنترل پروژه / ناظر',
          titleEn: 'Technical Office & Controls Engineer',
          descFa: 'متره و برآورد، تهیه صورت‌وضعیت‌ها، لایحه تاخیرات ماده ۳۰، مدلسازی BIM و شاپ',
          descEn: 'Quantity surveying, IPC audits, delay claim briefs, BIM coordination'
        },
        {
          id: 'site_operator' as EngineeringRoleId,
          titleFa: 'اپراتور، جنرال فورمن و بازرس کیفی',
          titleEn: 'Site Operator, Foreman & Inspector',
          descFa: 'کابین هدایت TBM، پایپینگ، جوشکاری و NDT، کنترل لوپ‌های DCS و پرمیت کارگاهی',
          descEn: 'TBM cabin pilot, piping fit-up, NDT film inspection, DCS loop checks'
        }
      ];

  const handleApply = () => {
    if (isAdmin && onSelectTrack && selectedDiscMeta.trackId !== currentTrack) {
      onSelectTrack(selectedDiscMeta.trackId);
    }
    onSelectDiscipline(selectedDiscipline);
    saveDiscipline(selectedDiscipline);
    onSelectRole(selectedRole);
    saveRole(selectedRole);
    onClose();
  };

  const selectedRoleMeta = roles.find((r) => r.id === selectedRole);
  const trackInfo = INDUSTRY_TRACKS[effectiveTrack];

  const renderTrackIcon = (trackId: IndustryTrackId, className = 'w-5 h-5') => {
    if (trackId === 'ENERGY_PETRO') return <Factory className={className} />;
    if (trackId === 'PAYA_SAMAN_PARS') return <Landmark className={className} />;
    if (trackId === 'GENERAL_EVERYDAY') return <Home className={className} />;
    return <Building2 className={className} />;
  };

  const renderDisciplineCard = (d: ReturnType<typeof getDisciplinesByTrack>[number]) => {
    const isChecked = selectedDiscipline === d.id;
    return (
      <motion.div
        key={d.id}
        data-testid={`discipline-card-${d.id}`}
        onClick={() => setSelectedDiscipline(d.id)}
        initial={false}
        style={{
          borderRadius: `${R_REST}px`
        }}
        whileHover={{
          x: colASign * SHIFT,
          borderRadius: `${R_HOVER}px`,
          zIndex: 10
        }}
        whileFocus={{
          x: colASign * SHIFT,
          borderRadius: `${R_HOVER}px`
        }}
        whileTap={{ scale: 0.99 }}
        transition={spring}
        className={`block p-3.5 sm:p-4 border transition-colors cursor-pointer relative select-none ${
          isChecked
            ? 'bg-[var(--cpai-primary-soft)]/55 border-[var(--cpai-primary)] ring-1 ring-[var(--cpai-primary)]'
            : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 hover:bg-[var(--cpai-surface)]'
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
              isChecked
                ? 'border-[var(--cpai-primary)] bg-[var(--cpai-surface)]'
                : 'border-[var(--cpai-border)] bg-[var(--cpai-surface)]'
            }`}
          >
            {isChecked && (
              <motion.span
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springSnappy}
                className="w-2.5 h-2.5 rounded-full bg-[var(--cpai-primary)]"
              />
            )}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <b className="block text-xs sm:text-sm font-bold text-[var(--cpai-text)] leading-snug">
                {lang === 'fa' ? d.titleFa : d.titleEn}
              </b>
              {isChecked && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--cpai-primary-strong)] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                  <span>{lang === 'fa' ? 'فعال' : 'Active'}</span>
                </span>
              )}
            </div>

            {isChecked && (
              <div className="mt-2.5 pt-2.5 border-t border-[var(--cpai-border)] animate-fade-in space-y-2">
                <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                  {lang === 'fa' ? d.descriptionFa : d.descriptionEn}
                </p>

                <div className="pt-0.5">
                  <span className="block text-[11px] font-semibold text-[var(--cpai-text)] mb-1.5">
                    {lang === 'fa' ? 'شاخص‌هایی که در مثال‌ها و تمرین‌ها می‌بینید:' : 'KPIs populated in your exercises:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'fa' ? d.performanceMetricsFa : d.performanceMetricsEn).map((kpi, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-text)]"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 overflow-y-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-labelledby="discipline-dialog-title"
      data-testid="discipline-selector-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Unified Dialog Surface matching IndustryTrackSelectorModal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] my-auto flex flex-col rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-text)] shadow-2xl overflow-hidden">
        {/* Header (Matched to Image 1) */}
        <header className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[var(--cpai-border)] bg-[var(--cpai-bg)] flex items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary)] border border-[var(--cpai-border)] flex items-center justify-center shrink-0">
              {renderTrackIcon(effectiveTrack, 'w-5 h-5')}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
                <span className="font-semibold text-[var(--cpai-primary-strong)]">
                  {lang === 'fa' ? 'اکوسیستم شورای کسب‌وکار اوج' : 'OWJ Business Council Ecosystem'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate font-medium">
                  {isAdmin && adminTrackFilter === 'ALL'
                    ? lang === 'fa'
                      ? 'دسترسی جامع ادمین · همه شرکت‌ها و ۳۲ دیسیپلین'
                      : 'Admin Full View · All Companies & 32 Disciplines'
                    : lang === 'fa'
                    ? trackInfo.shortTitleFa
                    : trackInfo.shortTitleEn}
                </span>
              </div>
              <h2
                id="discipline-dialog-title"
                className="text-lg sm:text-xl font-bold text-[var(--cpai-text)] tracking-tight mt-0.5"
              >
                {lang === 'fa'
                  ? isEveryday
                    ? 'انتخاب حوزه کاربردی و نقش در زندگی و خانواده'
                    : 'انتخاب دیسیپلین تخصصی و رده سازمانی'
                  : isEveryday
                  ? 'Lifestyle Focus Area & Family Role Selection'
                  : 'Discipline & Organizational Role Selection'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'fa' ? 'بستن' : 'Close'}
            data-testid="discipline-modal-close-btn"
            className="w-10 h-10 rounded-xl bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title={lang === 'fa' ? 'بستن (ESC)' : 'Close (ESC)'}
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Admin Holding / Company Filter Bar */}
        {isAdmin && (
          <div
            data-testid="admin-discipline-track-filter"
            className="px-5 py-2.5 sm:px-7 border-b border-[var(--cpai-border)] bg-[var(--cpai-surface-subtle)]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0"
          >
            <span className="text-[11px] font-semibold text-[var(--cpai-muted)] whitespace-nowrap me-1">
              {lang === 'fa' ? 'فیلتر شرکت / حوزه:' : 'Filter Company:'}
            </span>
            <button
              type="button"
              onClick={() => setAdminTrackFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                adminTrackFilter === 'ALL'
                  ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] border-[var(--cpai-primary)]'
                  : 'bg-[var(--cpai-surface)] text-[var(--cpai-muted)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/50 hover:text-[var(--cpai-text)]'
              }`}
            >
              {lang === 'fa' ? 'همه دیسیپلین‌ها (۳۲)' : 'All Disciplines (32)'}
            </button>
            {ALL_INDUSTRY_TRACKS.map((tId) => {
              const isSelectedFilter = adminTrackFilter === tId;
              return (
                <button
                  key={tId}
                  type="button"
                  onClick={() => setAdminTrackFilter(tId)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelectedFilter
                      ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] border-[var(--cpai-primary)]'
                      : 'bg-[var(--cpai-surface)] text-[var(--cpai-muted)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/50 hover:text-[var(--cpai-text)]'
                  }`}
                >
                  {renderTrackIcon(tId, 'w-3.5 h-3.5 shrink-0')}
                  <span>{TRACK_FILTER_LABELS_FA[tId]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 2-Column Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 grid grid-cols-1 md:grid-cols-[1.25fr_auto_0.85fr] gap-6 md:gap-4 no-scrollbar overflow-x-hidden">
          {/* Column 1: Disciplines */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] flex items-center justify-center transition-all ${
                    selectedDiscipline ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <h3 className="text-sm font-bold text-[var(--cpai-text)]">
                  {lang === 'fa'
                    ? isEveryday
                      ? '۱. حوزه کاربردی و دغدغه شما'
                      : '۱. دیسیپلین تخصصی شما'
                    : isEveryday
                    ? '1. Your Lifestyle Focus Area'
                    : '1. Your Specialized Discipline'}
                </h3>
              </div>
              <span className="text-[11px] font-medium text-[var(--cpai-muted)]">
                {lang === 'fa'
                  ? 'شاخص‌ها و تمرین‌ها هماهنگ می‌شوند'
                  : 'Syncs KPIs & exercises'}
              </span>
            </div>

            <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
              {lang === 'fa'
                ? 'با انتخاب دیسیپلین، مثال‌ها، ماتریس‌های NotebookLM و تمرین‌های هر ماژول دقیقاً با تخصص شما تنظیم می‌شوند.'
                : 'Select a domain; its KPIs, NotebookLM matrices, and exercises will adapt to your specialty.'}
            </p>

            <div className="space-y-4 pt-1" role="radiogroup">
              {visibleTracks.map((trackId) => {
                const trackDisciplines = getDisciplinesByTrack(trackId);
                const tInfo = INDUSTRY_TRACKS[trackId];
                const showTrackHeader = isAdmin && visibleTracks.length > 1;
                const isTrackPaya = trackId === 'PAYA_SAMAN_PARS';

                return (
                  <div key={trackId} className="space-y-2.5">
                    {showTrackHeader && (
                      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary)] flex items-center justify-center shrink-0">
                            {renderTrackIcon(trackId, 'w-3.5 h-3.5')}
                          </span>
                          <span className="text-xs font-bold text-[var(--cpai-text)] truncate">
                            {lang === 'fa' ? tInfo.shortTitleFa : tInfo.shortTitleEn}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--cpai-muted)] shrink-0">
                          {lang === 'fa'
                            ? `${trackDisciplines.length.toLocaleString('fa-IR')} دیسیپلین`
                            : `${trackDisciplines.length} disciplines`}
                        </span>
                      </div>
                    )}

                    {isTrackPaya ? (
                      (() => {
                        const groupOrder: string[] = [];
                        for (const d of trackDisciplines) {
                          const g = (lang === 'fa' ? d.groupFa : d.groupEn) || '';
                          if (g && !groupOrder.includes(g)) groupOrder.push(g);
                        }
                        return groupOrder.map((groupLabel) => (
                          <div key={groupLabel} className="space-y-2">
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--cpai-primary-soft)]/50 border border-[var(--cpai-border)] text-[11px] font-bold text-[var(--cpai-primary-strong)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cpai-primary)] shrink-0" />
                              <span>{groupLabel}</span>
                            </div>
                            <div className="space-y-2">
                              {trackDisciplines
                                .filter((d) => ((lang === 'fa' ? d.groupFa : d.groupEn) || '') === groupLabel)
                                .map(renderDisciplineCard)}
                            </div>
                          </div>
                        ));
                      })()
                    ) : (
                      <div className="space-y-2">{trackDisciplines.map(renderDisciplineCard)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Vertical Divider */}
          <div className="hidden md:block self-stretch border-s border-[var(--cpai-border)] my-2 mx-1" />

          {/* Column 2: Roles Ladder */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] flex items-center justify-center transition-all ${
                  selectedRole ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <h3 className="text-sm font-bold text-[var(--cpai-text)]">
                {lang === 'fa'
                  ? isEveryday
                    ? '۲. نقش و جایگاه شما در زندگی و خانواده'
                    : '۲. رده سازمانی و مسئولیت شما'
                  : isEveryday
                  ? '2. Your Role in Family & Everyday Life'
                  : '2. Organizational Role & Responsibility'}
              </h3>
            </div>
            <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
              {lang === 'fa'
                ? isEveryday
                  ? 'از مدیریت بودجه خانه تا فریلنسری و یادگیری فردی.'
                  : isPaya
                  ? 'از حاکمیت ۶۳ پروژه و دو بال در ستاد تا اجرای کارگاهی و کاوه.'
                  : 'از تصمیم‌گیری کلان تا اجرای میدانی.'
                : isEveryday
                ? 'From household management to freelancing and personal growth.'
                : isPaya
                ? 'From Holding Board & 63-project governance down to field execution.'
                : 'From strategic executive down to site execution.'}
            </p>

            <div className="relative space-y-2.5 pt-1" role="radiogroup">
              {roles.map((r, rIdx) => {
                const isChecked = selectedRole === r.id;
                const isLast = rIdx === roles.length - 1;

                return (
                  <motion.div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    initial={false}
                    style={{
                      borderRadius: `${R_REST}px`
                    }}
                    whileHover={{
                      x: colBSign * SHIFT,
                      borderRadius: `${R_HOVER}px`,
                      zIndex: 10
                    }}
                    whileFocus={{
                      x: colBSign * SHIFT,
                      borderRadius: `${R_HOVER}px`
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={spring}
                    className={`block p-3.5 sm:p-4 border transition-colors cursor-pointer relative select-none ${
                      isChecked
                        ? 'bg-[var(--cpai-primary-soft)]/55 border-[var(--cpai-primary)] ring-1 ring-[var(--cpai-primary)]'
                        : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 hover:bg-[var(--cpai-surface)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex flex-col items-center shrink-0">
                        <span
                          className={`w-5 h-5 rounded-full border-2 mt-0.5 z-10 flex items-center justify-center transition-all ${
                            isChecked
                              ? 'border-[var(--cpai-primary)] bg-[var(--cpai-surface)]'
                              : 'border-[var(--cpai-border)] bg-[var(--cpai-surface)]'
                          }`}
                        >
                          {isChecked && (
                            <motion.span
                              initial={{ scale: 0.3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={springSnappy}
                              className="w-2.5 h-2.5 rounded-full bg-[var(--cpai-primary)]"
                            />
                          )}
                        </span>
                        {!isLast && (
                          <span className="w-0.5 h-10 border-e border-dashed border-[var(--cpai-border)] absolute top-6" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <b className="block text-xs sm:text-sm font-bold text-[var(--cpai-text)] leading-snug">
                            {lang === 'fa' ? r.titleFa : r.titleEn}
                          </b>
                          {isChecked && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--cpai-primary-strong)] shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                              <span>{lang === 'fa' ? 'فعال' : 'Active'}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--cpai-muted)] mt-1 leading-relaxed">
                          {lang === 'fa' ? r.descFa : r.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer (Matched to Image 1) */}
        <footer className="px-5 py-3.5 sm:px-7 border-t border-[var(--cpai-border)] bg-[var(--cpai-bg)] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[var(--cpai-surface)] text-[var(--cpai-muted)] border border-[var(--cpai-border)] font-medium">
              {lang === 'fa' ? trackInfo.shortTitleFa : trackInfo.shortTitleEn}
            </span>
            {selectedDiscMeta && (
              <span className="px-3 py-1 rounded-full bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/40 font-semibold">
                {lang === 'fa' ? selectedDiscMeta.shortTitleFa : selectedDiscMeta.shortTitleEn}
              </span>
            )}
            {selectedRoleMeta && (
              <span className="px-3 py-1 rounded-full bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]/40 font-semibold">
                {lang === 'fa' ? selectedRoleMeta.titleFa.split('/')[0].trim() : selectedRoleMeta.titleEn.split('/')[0].trim()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:border-[var(--cpai-primary)]/50 transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="button"
              data-testid="apply-discipline-btn"
              onClick={handleApply}
              disabled={!selectedDiscipline || !selectedRole}
              className="min-h-[42px] px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'fa'
                  ? isEveryday
                    ? 'اعمال تنظیمات و شخصی‌سازی'
                    : 'اعمال دیسیپلین و سفارشی‌سازی'
                  : 'Apply & Personalize'}
              </span>
              <ChevronLeft className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
