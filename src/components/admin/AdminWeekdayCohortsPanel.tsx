import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  CheckCircle2,
  Target,
  Users,
  RefreshCw,
  Save,
  Download,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Check,
  AlertCircle,
  UserCheck,
  Layers
} from 'lucide-react';
import {
  ORBIT_SESSIONS_CATALOG,
  ORBIT_MODULE_BY_ID,
  ORBIT_MODULES_CATALOG
} from '../../data/orbitCurriculumCatalog';
import {
  CohortScheduleRecord,
  CohortUserEntry,
  OFFICIAL_WEEKDAY_COHORTS,
  formatPersianFirstEntryDate,
  getDefaultCohortSchedules,
  groupUsersByWeekdayCohort
} from '../../utils/cohortScheduleEngine';
import { lmsApi } from '../../services/lmsApi';
import { UserRegistryItem } from '../../types/lms';

interface AdminWeekdayCohortsPanelProps {
  fallbackUsers: UserRegistryItem[];
  onNotify: (message: string) => void;
}

const ACCENT_STYLES: Record<
  'blue' | 'emerald' | 'amber' | 'purple',
  {
    activeBorder: string;
    activeBg: string;
    badgeBg: string;
    dot: string;
  }
> = {
  blue: {
    activeBorder: 'border-blue-500 ring-2 ring-blue-500/20',
    activeBg: 'bg-blue-500/[0.07] dark:bg-blue-500/15',
    badgeBg: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500'
  },
  emerald: {
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
    activeBg: 'bg-emerald-500/[0.07] dark:bg-emerald-500/15',
    badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500'
  },
  amber: {
    activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
    activeBg: 'bg-amber-500/[0.07] dark:bg-amber-500/15',
    badgeBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500'
  },
  purple: {
    activeBorder: 'border-purple-500 ring-2 ring-purple-500/20',
    activeBg: 'bg-purple-500/[0.07] dark:bg-purple-500/15',
    badgeBg: 'bg-purple-500/15 text-purple-700 dark:text-purple-300',
    dot: 'bg-purple-500'
  }
};

export const AdminWeekdayCohortsPanel: React.FC<AdminWeekdayCohortsPanelProps> = ({
  fallbackUsers,
  onNotify
}) => {
  const [cohorts, setCohorts] = useState<CohortScheduleRecord[]>(() => getDefaultCohortSchedules());
  const [usersByCohort, setUsersByCohort] = useState<Record<string, CohortUserEntry[]>>({});
  const [unmatchedUsers, setUnmatchedUsers] = useState<CohortUserEntry[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('cohort_mon_hera');
  const [subView, setSubView] = useState<'schedule' | 'members'>('schedule');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [rosterSearch, setRosterSearch] = useState<string>('');
  const [assigningUserId, setAssigningUserId] = useState<string | null>(null);

  // Editable draft state for currently selected cohort
  const [draftReviewed, setDraftReviewed] = useState<string[]>([]);
  const [draftNext, setDraftNext] = useState<string[]>([]);
  const [draftNote, setDraftNote] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  const loadFromDb = async () => {
    setIsLoading(true);
    try {
      const data = await lmsApi.fetchAdminWeekdayCohorts();
      if (data && data.cohorts.length > 0) {
        setCohorts(data.cohorts);
        setUsersByCohort(data.usersByCohort || {});
        setUnmatchedUsers(data.unmatchedUsers || []);
        setTotalUsers(data.totalUsers || 0);
      } else {
        // Fallback client-side grouping if API unreachable
        const grouped = groupUsersByWeekdayCohort(fallbackUsers);
        const defaults = getDefaultCohortSchedules().map((c) => ({
          ...c,
          studentCount: (grouped.byCohort[c.id] || []).length
        }));
        setCohorts(defaults);
        setUsersByCohort(grouped.byCohort);
        setUnmatchedUsers(grouped.unmatched);
        setTotalUsers(fallbackUsers.length);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFromDb();
  }, []);

  const activeCohort = useMemo(
    () => cohorts.find((c) => c.id === selectedCohortId) || null,
    [cohorts, selectedCohortId]
  );

  // Sync draft editor whenever active cohort changes or reloads from DB
  useEffect(() => {
    if (activeCohort) {
      setDraftReviewed(activeCohort.reviewedModules || []);
      setDraftNext(activeCohort.nextModules || []);
      setDraftNote(activeCohort.instructorNote || '');
      setHasUnsavedChanges(false);
    }
  }, [activeCohort?.id, activeCohort?.updatedAt]);

  const activeMembers = useMemo(() => {
    const rawList =
      selectedCohortId === 'UNMATCHED'
        ? unmatchedUsers
        : usersByCohort[selectedCohortId] || [];

    const q = rosterSearch.trim().toLowerCase();
    if (!q) return rawList;
    return rawList.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.specialty && u.specialty.toLowerCase().includes(q)) ||
        (u.phone && u.phone.includes(q))
    );
  }, [selectedCohortId, usersByCohort, unmatchedUsers, rosterSearch]);

  const handleToggleReviewed = (moduleId: string) => {
    setDraftReviewed((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
    setHasUnsavedChanges(true);
  };

  const handleToggleNext = (moduleId: string) => {
    setDraftNext((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
    setHasUnsavedChanges(true);
  };

  const handleToggleWholeSessionReviewed = (sessionModuleIds: string[]) => {
    const allSelected = sessionModuleIds.every((id) => draftReviewed.includes(id));
    if (allSelected) {
      setDraftReviewed((prev) => prev.filter((id) => !sessionModuleIds.includes(id)));
    } else {
      setDraftReviewed((prev) => Array.from(new Set([...prev, ...sessionModuleIds])));
    }
    setHasUnsavedChanges(true);
  };

  const handleSaveSchedule = async () => {
    if (!activeCohort) return;
    setIsSaving(true);
    try {
      const res = await lmsApi.saveAdminCohortSchedule({
        cohortId: activeCohort.id,
        reviewedModules: draftReviewed,
        nextModules: draftNext,
        instructorNote: draftNote
      });
      if (res.success && res.cohort) {
        setCohorts((prev) =>
          prev.map((c) =>
            c.id === res.cohort!.id
              ? { ...c, ...res.cohort!, studentCount: c.studentCount }
              : c
          )
        );
        setHasUnsavedChanges(false);
        onNotify(`برنامه ماژول‌های «${activeCohort.title}» با موفقیت در دیتابیس ذخیره شد.`);
      } else {
        onNotify(res.error || 'خطا در ذخیره برنامه ماژول‌ها.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncByWeekday = async () => {
    setIsSyncing(true);
    try {
      const res = await lmsApi.syncAdminWeekdayCohorts(false);
      if (res.success) {
        await loadFromDb();
        onNotify(
          `تقسیم‌بندی خودکار بر اساس اولین تاریخ ورود (به وقت تهران) انجام و در دیتابیس ثبت شد (${res.updatedCount} رکورد بررسی شد).`
        );
      } else {
        onNotify(res.error || 'خطا در همگام‌سازی کاربران.');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleReassignUser = async (userId: string, nextCohortId: string) => {
    setAssigningUserId(userId);
    try {
      const targetId = nextCohortId === 'UNMATCHED' ? null : nextCohortId;
      const res = await lmsApi.assignUserToWeekdayCohort(userId, targetId);
      if (res.success) {
        await loadFromDb();
        onNotify('کلاس کاربر با موفقیت در پایگاه داده به‌روزرسانی شد.');
      } else {
        onNotify(res.error || 'خطا در تغییر کلاس کاربر.');
      }
    } finally {
      setAssigningUserId(null);
    }
  };

  const handleExportCohortCsv = () => {
    const label =
      selectedCohortId === 'UNMATCHED'
        ? 'سایر_روزها'
        : activeCohort?.title.replace(/\s+/g, '_') || selectedCohortId;

    const headers = [
      'ردیف',
      'نام و نام خانوادگی',
      'ایمیل',
      'تلفن همراه',
      'تخصص',
      'روز اولین ورود (تهران)',
      'تاریخ شمسی اولین ورود',
      'نحوه تخصیص',
      'کلاس فعلی'
    ];

    const rows = activeMembers.map((u, idx) => [
      `"${idx + 1}"`,
      `"${u.fullName}"`,
      `"${u.email}"`,
      `"${u.phone || ''}"`,
      `"${u.specialty || ''}"`,
      `"${u.firstEntryWeekdayFa}"`,
      `"${formatPersianFirstEntryDate(u.createdAt)}"`,
      `"${u.weekdayCohortManual ? 'تخصیص دستی مدیر' : 'خودکار بر اساس روز ورود'}"`,
      `"${activeCohort?.title || 'تخصیص‌نیافته'}"`
    ]);

    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cohort_${label}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify(`لیست نفرات «${activeCohort?.title || 'سایر روزها'}» به صورت CSV دانلود شد.`);
  };

  const getAccentForCohort = (cohortId: string): 'blue' | 'emerald' | 'amber' | 'purple' => {
    return OFFICIAL_WEEKDAY_COHORTS.find((c) => c.id === cohortId)?.accentColor || 'blue';
  };

  return (
    <div className="space-y-4" data-testid="admin-weekday-cohorts-panel">
      {/* Top Explanation & Sync Bar */}
      <div className="p-4 rounded-2xl bg-[#1f5163]/[0.06] dark:bg-[#1f5163]/20 border border-[#1f5163]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
            <h3 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
              تقسیم‌بندی کلاس‌های سازمانی بر اساس روز اولین ورود و برنامه‌ریزی ماژول‌ها
            </h3>
          </div>
          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
            کاربران به‌طور خودکار بر اساس روز هفته اولین ورود (به وقت تهران) در ۴ کلاس رسمی دسته‌بندی و در دیتابیس ذخیره می‌شوند. برای هر کلاس می‌توانید ماژول‌های مرور شده و ماژول کلاس بعدی را مشخص کنید تا در کنار گردونه برای دانشجویان نمایش داده شود.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="sync-weekday-cohorts-btn"
            onClick={handleSyncByWeekday}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] disabled:opacity-60 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>همگام‌سازی با اولین روز ورود</span>
          </button>
        </div>
      </div>

      {/* 4 Official Weekday Cohort Cards + Unmatched Bucket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {cohorts.map((cohort) => {
          const isSelected = selectedCohortId === cohort.id;
          const accent = ACCENT_STYLES[getAccentForCohort(cohort.id)];
          const membersCount = (usersByCohort[cohort.id] || []).length;
          const reviewedCount = cohort.reviewedModules?.length || 0;
          const nextCount = cohort.nextModules?.length || 0;

          return (
            <button
              key={cohort.id}
              type="button"
              data-testid={`admin-cohort-card-${cohort.id}`}
              onClick={() => setSelectedCohortId(cohort.id)}
              className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? `${accent.activeBorder} ${accent.activeBg} shadow-xs`
                  : 'border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#161e24] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${accent.badgeBg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                    {cohort.weekdayFa}
                  </span>
                  <span className="text-[11px] font-black text-[#1c2830] dark:text-[#e8ebe9] tabular-nums">
                    {membersCount.toLocaleString('fa-IR')} نفر
                  </span>
                </div>
                <div className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                  {cohort.title}
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 pt-2 border-t border-black/[0.05] dark:border-white/[0.06] text-[10px]">
                <span className="text-emerald-700 dark:text-emerald-300 font-bold tabular-nums">
                  {reviewedCount.toLocaleString('fa-IR')} مرور شده
                </span>
                <span className="text-amber-700 dark:text-amber-300 font-bold tabular-nums">
                  {nextCount > 0 ? `${nextCount.toLocaleString('fa-IR')} بعدی` : 'بعدی نامشخص'}
                </span>
              </div>
            </button>
          );
        })}

        {/* Unmatched Days Card (Saturday, Tuesday, Friday) */}
        <button
          type="button"
          data-testid="admin-cohort-card-UNMATCHED"
          onClick={() => {
            setSelectedCohortId('UNMATCHED');
            setSubView('members');
          }}
          className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
            selectedCohortId === 'UNMATCHED'
              ? 'border-slate-500 ring-2 ring-slate-500/20 bg-slate-500/10'
              : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30 hover:border-slate-400'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-1.5">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                شنبه / سه‌شنبه / جمعه
              </span>
              <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 tabular-nums">
                {unmatchedUsers.length.toLocaleString('fa-IR')} نفر
              </span>
            </div>
            <div className="text-xs font-black text-slate-700 dark:text-slate-200 leading-snug">
              سایر روزهای ورود (قابل انتقال)
            </div>
          </div>
          <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
            کل سامانه: {totalUsers.toLocaleString('fa-IR')} کاربر
          </div>
        </button>
      </div>

      {/* Active Cohort Workspace */}
      {selectedCohortId !== 'UNMATCHED' && activeCohort ? (
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#121920] overflow-hidden shadow-2xs">
          {/* Sub-Header & View Switcher */}
          <div className="p-3.5 sm:p-4 bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                  {activeCohort.title}
                </h4>
                <span className="px-2 py-0.5 rounded-lg bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6] text-[11px] font-bold">
                  {activeCohort.weekdayFa}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] tabular-nums">
                  ({(usersByCohort[activeCohort.id] || []).length.toLocaleString('fa-IR')} نفر ثبت‌شده)
                </span>
              </div>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                ماژول‌های مرور شده ({draftReviewed.length.toLocaleString('fa-IR')} از{' '}
                {ORBIT_MODULES_CATALOG.length.toLocaleString('fa-IR')}) · ماژول کلاس بعدی (
                {draftNext.length.toLocaleString('fa-IR')})
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex rounded-xl p-1 bg-black/[0.04] dark:bg-white/[0.06]">
                <button
                  type="button"
                  data-testid="cohort-subtab-schedule"
                  onClick={() => setSubView('schedule')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === 'schedule'
                      ? 'bg-white dark:bg-[#1b2630] text-[#1f5163] dark:text-[#6fb3c6] shadow-2xs'
                      : 'text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>برنامه ماژول‌ها (مرورشده و بعدی)</span>
                </button>
                <button
                  type="button"
                  data-testid="cohort-subtab-members"
                  onClick={() => setSubView('members')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === 'members'
                      ? 'bg-white dark:bg-[#1b2630] text-[#1f5163] dark:text-[#6fb3c6] shadow-2xs'
                      : 'text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    لیست نفرات ({(usersByCohort[activeCohort.id] || []).length.toLocaleString('fa-IR')})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* SUB-VIEW A: Module Schedule Editor */}
          {subView === 'schedule' && (
            <div className="p-4 space-y-4">
              {/* Instructor Note & Save Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161f27] border border-slate-200/80 dark:border-slate-800">
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor="cohort-instructor-note-input"
                    className="block text-[11px] font-extrabold text-[#1c2830] dark:text-[#e8ebe9]"
                  >
                    یادداشت مدرس / زمان‌بندی کلاس بعدی (اختیاری — نمایش برای دانشجویان این کلاس):
                  </label>
                  <input
                    id="cohort-instructor-note-input"
                    data-testid="cohort-instructor-note-input"
                    type="text"
                    value={draftNote}
                    onChange={(e) => {
                      setDraftNote(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder={`مثال: ${activeCohort.weekdayFa} ساعت ۹ تا ۱۳ · لطفاً پیش از جلسه فایل تمرین را آماده کنید`}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#10171d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#1f5163]"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {hasUnsavedChanges && (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      تغییرات ذخیره نشده
                    </span>
                  )}
                  <button
                    type="button"
                    data-testid="save-cohort-schedule-btn"
                    onClick={handleSaveSchedule}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره برنامه در دیتابیس'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Preview of Selected Next-Class Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ماژول‌های مرور شده تا امروز ({draftReviewed.length.toLocaleString('fa-IR')})
                    </span>
                    {draftReviewed.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraftReviewed([]);
                          setHasUnsavedChanges(true);
                        }}
                        className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        پاک کردن همه
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {draftReviewed.length === 0 ? (
                      <span className="text-[11px] text-[#5d6b73]">
                        هنوز ماژولی به عنوان مرور شده انتخاب نشده است.
                      </span>
                    ) : (
                      draftReviewed.map((id) => {
                        const mod = ORBIT_MODULE_BY_ID[id];
                        if (!mod) return null;
                        return (
                          <span
                            key={id}
                            className="px-2 py-0.5 rounded-lg bg-emerald-600/15 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold"
                          >
                            {mod.num} · {mod.titleFa}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/25 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      ماژول کلاس بعدی / هفته آینده ({draftNext.length.toLocaleString('fa-IR')})
                    </span>
                    {draftNext.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraftNext([]);
                          setHasUnsavedChanges(true);
                        }}
                        className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        پاک کردن
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {draftNext.length === 0 ? (
                      <span className="text-[11px] text-[#5d6b73]">
                        ماژول هدف کلاس بعدی را از فهرست پایین انتخاب کنید.
                      </span>
                    ) : (
                      draftNext.map((id) => {
                        const mod = ORBIT_MODULE_BY_ID[id];
                        if (!mod) return null;
                        return (
                          <span
                            key={id}
                            className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[10px] font-bold"
                          >
                            {mod.num} · {mod.titleFa}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* 6 Orbit Sessions & 22 Modules Checklist */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {ORBIT_SESSIONS_CATALOG.map((session) => {
                  const sessionIds = session.modules.map((m) => m.id);
                  const allReviewed = sessionIds.every((id) => draftReviewed.includes(id));

                  return (
                    <div
                      key={session.id}
                      className="rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-slate-50/60 dark:bg-[#161f27]/70 p-3 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-black/[0.05] dark:border-white/[0.07]">
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold text-[#1f5163] dark:text-[#6fb3c6] block">
                            {session.numFa}
                          </span>
                          <h5 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9] truncate">
                            {session.titleFa}
                          </h5>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleWholeSessionReviewed(sessionIds)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-colors cursor-pointer whitespace-nowrap ${
                            allReviewed
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white dark:bg-[#10171d] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                          }`}
                        >
                          {allReviewed ? '✓ کل جلسه مرور شد' : 'انتخاب کل جلسه'}
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {session.modules.map((mod) => {
                          const isReviewed = draftReviewed.includes(mod.id);
                          const isNext = draftNext.includes(mod.id);

                          return (
                            <div
                              key={mod.id}
                              className={`p-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                                isNext
                                  ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/60'
                                  : isReviewed
                                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                                    : 'bg-white dark:bg-[#11181f] border-black/[0.06] dark:border-white/[0.07]'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    dir="ltr"
                                    className="px-1.5 py-0.5 rounded-md bg-black/[0.05] dark:bg-white/[0.08] text-[10px] font-extrabold text-[#1f5163] dark:text-[#6fb3c6] shrink-0"
                                  >
                                    {mod.num}
                                  </span>
                                  <span className="text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] truncate">
                                    {mod.titleFa}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  data-testid={`toggle-reviewed-${mod.id}`}
                                  onClick={() => handleToggleReviewed(mod.id)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold border flex items-center gap-1 transition-all cursor-pointer ${
                                    isReviewed
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                      : 'bg-white dark:bg-[#161f27] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                                  }`}
                                >
                                  <Check className="w-3 h-3" />
                                  <span>مرور شده</span>
                                </button>

                                <button
                                  type="button"
                                  data-testid={`toggle-next-${mod.id}`}
                                  onClick={() => handleToggleNext(mod.id)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold border flex items-center gap-1 transition-all cursor-pointer ${
                                    isNext
                                      ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                                      : 'bg-white dark:bg-[#161f27] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-500'
                                  }`}
                                >
                                  <Target className="w-3 h-3" />
                                  <span>کلاس بعدی</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW B: Member Roster */}
          {subView === 'members' && (
            <div className="p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    placeholder="جستجو در نفرات این کلاس (نام، ایمیل، تلفن)..."
                    className="w-full pr-9 pl-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#10171d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#1f5163]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleExportCohortCsv}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود لیست نفرات (CSV)</span>
                </button>
              </div>

              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] font-bold">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-12">#</th>
                        <th className="py-2.5 px-3">نام و مشخصات</th>
                        <th className="py-2.5 px-3">ایمیل / تماس</th>
                        <th className="py-2.5 px-3">اولین تاریخ ورود (تهران)</th>
                        <th className="py-2.5 px-3">وضعیت تخصیص</th>
                        <th className="py-2.5 px-3">انتقال / تغییر کلاس</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#5d6b73]">
                            در حال بارگذاری لیست نفرات از دیتابیس...
                          </td>
                        </tr>
                      ) : activeMembers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#5d6b73]">
                            کاربری در این کلاس ثبت نشده است.
                          </td>
                        </tr>
                      ) : (
                        activeMembers.map((member, index) => (
                          <tr
                            key={member.id}
                            className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                          >
                            <td className="py-2.5 px-3 text-center text-[#5d6b73] font-bold tabular-nums">
                              {(index + 1).toLocaleString('fa-IR')}
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                                {member.fullName}
                              </div>
                              {member.specialty && (
                                <div className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                                  {member.specialty}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9]">
                                {member.email}
                              </div>
                              {member.phone && (
                                <div className="font-mono text-[10px] text-[#5d6b73]">
                                  {member.phone}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                                <Clock className="w-3 h-3 text-[#1f5163] dark:text-[#6fb3c6] shrink-0" />
                                <span>{formatPersianFirstEntryDate(member.createdAt)}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  member.weekdayCohortManual
                                    ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300'
                                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                }`}
                              >
                                <UserCheck className="w-3 h-3" />
                                <span>
                                  {member.weekdayCohortManual ? 'تخصیص دستی' : 'خودکار (روز ورود)'}
                                </span>
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <select
                                aria-label={`انتخاب کلاس برای ${member.fullName}`}
                                value={member.resolvedCohortId || 'UNMATCHED'}
                                disabled={assigningUserId === member.id}
                                onChange={(e) => handleReassignUser(member.id, e.target.value)}
                                className="px-2 py-1 text-[11px] rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#10171d] text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer"
                              >
                                {cohorts.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.weekdayFa} — {c.title}
                                  </option>
                                ))}
                                <option value="UNMATCHED">سایر روزها (تخصیص‌نیافته)</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Unmatched Days Roster View */
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121920] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                کاربران با اولین ورود در سایر روزها (شنبه، سه‌شنبه یا جمعه)
              </h4>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                از منوی مقابل هر کاربر می‌توانید او را به‌صورت دستی به یکی از ۴ کلاس رسمی منتقل و در دیتابیس ذخیره کنید.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportCohortCsv}
              className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>دانلود لیست (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] font-bold">
                <tr>
                  <th className="py-2.5 px-3">نام و مشخصات</th>
                  <th className="py-2.5 px-3">ایمیل</th>
                  <th className="py-2.5 px-3">اولین تاریخ ورود (تهران)</th>
                  <th className="py-2.5 px-3">تخصیص به کلاس رسمی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                {activeMembers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-[#5d6b73]">
                      همه کاربران در ۴ کلاس رسمی دسته‌بندی شده‌اند.
                    </td>
                  </tr>
                ) : (
                  activeMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                        {member.fullName}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#5d6b73]">
                        {member.email}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                        {formatPersianFirstEntryDate(member.createdAt)}
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          aria-label={`تخصیص کلاس برای ${member.fullName}`}
                          value="UNMATCHED"
                          disabled={assigningUserId === member.id}
                          onChange={(e) => handleReassignUser(member.id, e.target.value)}
                          className="px-2.5 py-1 text-[11px] rounded-lg border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#10171d] text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer"
                        >
                          <option value="UNMATCHED">انتخاب کلاس...</option>
                          {cohorts.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.weekdayFa} — {c.title}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
