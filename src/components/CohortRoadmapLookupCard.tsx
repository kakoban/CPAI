import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  Building2,
  CheckCircle2,
  Target,
  GraduationCap,
  ArrowLeft,
  X,
  Calendar,
  Sparkles,
  BookOpen,
  Check,
  UserCheck,
  LogIn,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  RefreshCw,
  Bot
} from 'lucide-react';
import { Language } from '../types/cpmai';
import { UserProfile } from '../types/auth';
import {
  CohortScheduleRecord,
  PrivateCohortLookupStatus,
  buildExpectedLearningSummary
} from '../utils/cohortScheduleEngine';
import { AiQuotaState } from '../utils/aiQuotaEngine';
import { lmsApi } from '../services/lmsApi';

const SELF_CHECK_STORAGE_PREFIX = 'cpmai_cohort_outcomes_check_v1_';
const PANEL_CLOSED_STORAGE_KEY = 'cpmai_cohort_panel_closed_v1';

interface CohortRoadmapLookupCardProps {
  lang: Language;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onOpenAiTutor?: () => void;
  aiQuota?: AiQuotaState | null;
  onSelectModule: (moduleId: string) => void;
  onCohortChange?: (cohort: CohortScheduleRecord | null) => void;
}

export const CohortRoadmapLookupCard: React.FC<CohortRoadmapLookupCardProps> = ({
  lang,
  currentUser,
  onOpenAuth,
  onOpenAiTutor,
  aiQuota,
  onSelectModule,
  onCohortChange
}) => {
  // User-controlled panel close/minimize state
  const [isPanelClosed, setIsPanelClosed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(PANEL_CLOSED_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Automatic email-bound cohort resolved from server for the logged-in student
  const [myCohort, setMyCohort] = useState<CohortScheduleRecord | null>(null);
  const [isMyCohortLoading, setIsMyCohortLoading] = useState<boolean>(false);
  const [hasLoadedMyCohort, setHasLoadedMyCohort] = useState<boolean>(false);
  const [isRoadmapExpanded, setIsRoadmapExpanded] = useState<boolean>(true);

  // Secondary private zero-leak lookup state (never lists or leaks other classes)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [lastMatchedQuery, setLastMatchedQuery] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<PrivateCohortLookupStatus>('idle');
  const [searchedCohort, setSearchedCohort] = useState<CohortScheduleRecord | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Interactive Expected Learning Outcomes modal state
  const [isOutcomesModalOpen, setIsOutcomesModalOpen] = useState<boolean>(false);
  const [checkedOutcomeKeys, setCheckedOutcomeKeys] = useState<Record<string, boolean>>({});

  const togglePanelClosed = (closed: boolean) => {
    setIsPanelClosed(closed);
    try {
      if (closed) localStorage.setItem(PANEL_CLOSED_STORAGE_KEY, '1');
      else localStorage.removeItem(PANEL_CLOSED_STORAGE_KEY);
    } catch {}
  };

  const loadMyRoadmap = useCallback(async () => {
    if (!currentUser) {
      setMyCohort(null);
      setHasLoadedMyCohort(false);
      return;
    }
    setIsMyCohortLoading(true);
    try {
      const res = await lmsApi.fetchMyCohortRoadmap();
      setMyCohort(res.assigned && res.cohort ? res.cohort : null);
      setHasLoadedMyCohort(true);
    } finally {
      setIsMyCohortLoading(false);
    }
  }, [currentUser?.id, currentUser?.email]);

  useEffect(() => {
    loadMyRoadmap();
  }, [loadMyRoadmap]);

  // Live zero-lag injection whenever Admin saves a cohort schedule or reassigns a user
  useEffect(() => {
    const handleUpdated = (ev: Event) => {
      const detail = (ev as CustomEvent<{ cohort?: CohortScheduleRecord }>)?.detail;
      const updatedCohort = detail?.cohort;

      if (updatedCohort && updatedCohort.id) {
        setMyCohort((prev) => (prev && prev.id === updatedCohort.id ? { ...prev, ...updatedCohort } : prev));
        setSearchedCohort((prev) =>
          prev && prev.id === updatedCohort.id ? { ...prev, ...updatedCohort } : prev
        );
      }

      // Always re-sync fresh from DB in background to stay 100% consistent
      loadMyRoadmap();
      const refreshQuery = lastMatchedQuery || query.trim();
      if (searchedCohort && refreshQuery) {
        lmsApi.lookupPrivateCohortByQuery(refreshQuery).then((res) => {
          if (res.status === 'matched' && res.cohort) {
            setSearchedCohort(res.cohort);
          }
        });
      }
    };

    window.addEventListener('cpmai_cohort_schedules_updated', handleUpdated);
    return () => window.removeEventListener('cpmai_cohort_schedules_updated', handleUpdated);
  }, [loadMyRoadmap, searchedCohort?.id, lastMatchedQuery, query]);

  const handleManualRefresh = async () => {
    await loadMyRoadmap();
    const refreshQuery = lastMatchedQuery || query.trim();
    if (searchedCohort && refreshQuery) {
      setIsSearching(true);
      try {
        const res = await lmsApi.lookupPrivateCohortByQuery(refreshQuery);
        if (res.status === 'matched' && res.cohort) {
          setSearchedCohort(res.cohort);
        }
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Priority: explicit private search match if active; otherwise the student's own email-bound cohort
  const activeCohort = searchedCohort || myCohort;

  useEffect(() => {
    onCohortChange?.(activeCohort);
  }, [activeCohort, onCohortChange]);

  // Load personal self-check checklist for active cohort
  useEffect(() => {
    if (!activeCohort) {
      setCheckedOutcomeKeys({});
      return;
    }
    try {
      const raw = localStorage.getItem(`${SELF_CHECK_STORAGE_PREFIX}${activeCohort.id}`);
      setCheckedOutcomeKeys(raw ? JSON.parse(raw) : {});
    } catch {
      setCheckedOutcomeKeys({});
    }
  }, [activeCohort?.id]);

  const handlePrivateSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchStatus('idle');
      setSearchedCohort(null);
      setLastMatchedQuery('');
      return;
    }
    setIsSearching(true);
    try {
      const res = await lmsApi.lookupPrivateCohortByQuery(trimmed);
      setSearchStatus(res.status);
      if (res.status === 'matched' && res.cohort) {
        setSearchedCohort(res.cohort);
        setLastMatchedQuery(trimmed);
        setIsRoadmapExpanded(true);
      } else {
        setSearchedCohort(null);
        setLastMatchedQuery('');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setLastMatchedQuery('');
    setSearchStatus('idle');
    setSearchedCohort(null);
  };

  const toggleOutcomeCheck = (key: string) => {
    if (!activeCohort) return;
    setCheckedOutcomeKeys((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`${SELF_CHECK_STORAGE_PREFIX}${activeCohort.id}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const learningSummary = useMemo(() => {
    if (!activeCohort) return null;
    return buildExpectedLearningSummary(activeCohort.reviewedModules, activeCohort.nextModules);
  }, [activeCohort]);

  const selfCheckedCount = useMemo(() => {
    if (!learningSummary) return 0;
    let count = 0;
    for (const mod of learningSummary.reviewedModules) {
      mod.expectedOutcomesFa.forEach((_, idx) => {
        if (checkedOutcomeKeys[`${mod.id}:${idx}`]) count += 1;
      });
    }
    return count;
  }, [learningSummary, checkedOutcomeKeys]);

  const selfCheckPct =
    learningSummary && learningSummary.totalExpectedOutcomes > 0
      ? Math.round((selfCheckedCount / learningSummary.totalExpectedOutcomes) * 100)
      : 0;

  const quotaBadgeLabel = aiQuota
    ? aiQuota.isUnlimited
      ? 'نامحدود'
      : `${aiQuota.remaining.toLocaleString('fa-IR')} از ${aiQuota.limit.toLocaleString('fa-IR')}`
    : '۱۰ پرسش ماهانه';

  // Collapsed compact bar when user closes the panel
  if (isPanelClosed) {
    return (
      <div
        dir="rtl"
        data-testid="cohort-panel-collapsed-bar"
        className="rounded-2xl bg-white dark:bg-[#131d26] border border-[#1f5163]/20 dark:border-[#6fb3c6]/20 px-3 py-2.5 shadow-2xs flex items-center justify-between gap-2"
      >
        <button
          type="button"
          data-testid="cohort-panel-reopen-btn"
          onClick={() => togglePanelClosed(false)}
          className="flex items-center gap-2 min-w-0 text-right cursor-pointer group flex-1"
        >
          <div className="w-7 h-7 rounded-xl bg-[#1f5163]/10 dark:bg-[#6fb3c6]/15 text-[#1f5163] dark:text-[#6fb3c6] flex items-center justify-center shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-black text-slate-900 dark:text-white group-hover:text-[#1f5163] dark:group-hover:text-[#7ac1d4] transition-colors truncate">
              {activeCohort ? `نقشه راه کلاس: ${activeCohort.title}` : 'نقشه راه اختصاصی کلاس شما'}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              برای مشاهده برنامه ماژول‌ها کلیک کنید
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenAiTutor && (
            <button
              type="button"
              data-testid="cohort-collapsed-ai-btn"
              onClick={onOpenAiTutor}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-l from-[#1f5163] to-[#1e7b6e] text-white text-[10px] font-extrabold flex items-center gap-1 cursor-pointer hover:opacity-95 transition-opacity"
            >
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span>راهنمای AI ({quotaBadgeLabel})</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => togglePanelClosed(false)}
            aria-label="باز کردن پنل نقشه راه"
            className="px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-extrabold text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1"
          >
            <span>باز کردن</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        dir="rtl"
        data-testid="cohort-roadmap-lookup-card"
        className="rounded-2xl bg-white dark:bg-[#131d26] border border-[#1f5163]/20 dark:border-[#6fb3c6]/20 p-3.5 shadow-2xs space-y-3"
      >
        {/* Card Header + Refresh & Close Panel Controls */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-[#1f5163]/10 dark:bg-[#6fb3c6]/15 text-[#1f5163] dark:text-[#6fb3c6] flex items-center justify-center shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                {lang === 'fa' ? 'نقشه راه اختصاصی کلاس شما' : 'Your Personal Class Roadmap'}
              </h4>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {searchedCohort && myCohort && (
                <button
                  type="button"
                  data-testid="cohort-back-to-mine-btn"
                  onClick={handleClearSearch}
                  className="px-2 py-1 rounded-lg text-[10px] font-extrabold text-[#1f5163] dark:text-[#7ac1d4] hover:bg-[#1f5163]/10 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>کلاس من</span>
                </button>
              )}

              <button
                type="button"
                data-testid="cohort-panel-refresh-btn"
                onClick={handleManualRefresh}
                title="تازه‌سازی آخرین تغییرات مدرس"
                aria-label="تازه‌سازی برنامه کلاس"
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#1f5163] dark:hover:text-[#7ac1d4] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isMyCohortLoading || isSearching ? 'animate-spin' : ''}`} />
              </button>

              <button
                type="button"
                data-testid="cohort-panel-close-btn"
                onClick={() => togglePanelClosed(true)}
                title="بستن و جمع‌کردن پنل"
                aria-label="بستن پنل نقشه راه کلاس"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Primary Auto-Detected Personal Roadmap CTA */}
          {!currentUser ? (
            <button
              type="button"
              data-testid="cohort-login-roadmap-btn"
              onClick={() => onOpenAuth?.()}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-extrabold flex items-center justify-between gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4 shrink-0" />
                <span>ورود با ایمیل و نمایش نقشه راه کلاس من</span>
              </span>
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            </button>
          ) : isMyCohortLoading && !activeCohort ? (
            <div className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 text-center">
              در حال شناسایی خودکار کلاس بر اساس حساب کاربری شما...
            </div>
          ) : myCohort && !searchedCohort ? (
            <button
              type="button"
              data-testid="my-cohort-roadmap-btn"
              onClick={() => setIsRoadmapExpanded((prev) => !prev)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1f5163]/[0.08] dark:bg-[#1f5163]/25 hover:bg-[#1f5163]/15 border border-[#1f5163]/25 text-right transition-colors cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <UserCheck className="w-4 h-4 text-[#1f5163] dark:text-[#7ac1d4] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                    نقشه راه کلاس من: {myCohort.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    تشخیص خودکار از ایمیل شما · برگزاری {myCohort.weekdayFa}
                  </div>
                </div>
              </div>
              {isRoadmapExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#1f5163] dark:text-[#7ac1d4] shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#1f5163] dark:text-[#7ac1d4] shrink-0" />
              )}
            </button>
          ) : hasLoadedMyCohort && !myCohort && !searchedCohort ? (
            <div
              data-testid="cohort-unassigned-notice"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              حساب <span className="font-bold" dir="ltr">{currentUser.email}</span> هنوز به یکی از کلاس‌های ثابت هفته متصل نشده است. در صورت نیاز می‌توانید نام دقیق تیم یا موسسه خود را از بخش جستجوی محرمانه پایین وارد کنید.
            </div>
          ) : null}
        </div>

        {/* Active Cohort Roadmap Details (Only the user's OWN class OR exact unique private match) */}
        {activeCohort && learningSummary && isRoadmapExpanded && (
          <div
            data-testid="cohort-status-card"
            className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn"
          >
            {/* Cohort Identity Banner */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {activeCohort.title}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-[#1f5163] dark:text-[#6fb3c6]" />
                  <span>برگزاری: {activeCohort.weekdayFa}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-extrabold shrink-0 tabular-nums">
                {learningSummary.totalReviewedModules.toLocaleString('fa-IR')} از{' '}
                {learningSummary.totalCatalogModules.toLocaleString('fa-IR')} ماژول
              </span>
            </div>

            {/* Reviewed Modules */}
            <div data-testid="cohort-reviewed-section" className="space-y-1.5">
              <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>ماژول‌های مرور شده تا امروز:</span>
              </div>
              {learningSummary.reviewedModules.length === 0 ? (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 rounded-lg px-2.5 py-1.5">
                  هنوز ماژول مرور شده‌ای توسط مدرس برای کلاس شما ثبت نشده است.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {learningSummary.reviewedModules.map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => onSelectModule(mod.id)}
                      className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/70 text-[10px] font-bold text-emerald-800 dark:text-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span dir="ltr" className="font-extrabold">
                        {mod.num}
                      </span>
                      <span className="truncate max-w-[140px]">{mod.titleFa}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Next Class / Upcoming Module(s) */}
            <div
              data-testid="cohort-next-section"
              className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/90 dark:border-amber-800/60 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-800 dark:text-amber-300">
                  <Target className="w-3.5 h-3.5 shrink-0" />
                  <span>ماژول کلاس بعدی (هفته جاری / آینده):</span>
                </span>
              </div>

              {learningSummary.nextModules.length === 0 ? (
                <p className="text-[11px] text-amber-800/75 dark:text-amber-200/70">
                  ماژول جلسه بعدی هنوز توسط مدرس تعیین نشده است.
                </p>
              ) : (
                <div className="space-y-1">
                  {learningSummary.nextModules.map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => onSelectModule(mod.id)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#141e27] hover:border-amber-500 border border-amber-200/80 dark:border-amber-800/50 text-right transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          dir="ltr"
                          className="px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold shrink-0"
                        >
                          {mod.num}
                        </span>
                        <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 truncate">
                          {mod.titleFa}
                        </span>
                      </div>
                      <ArrowLeft className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {activeCohort.instructorNote && (
                <p className="text-[10px] text-amber-900/85 dark:text-amber-200/85 pt-1 border-t border-amber-200/70 dark:border-amber-800/50 leading-relaxed">
                  یادداشت مدرس: {activeCohort.instructorNote}
                </p>
              )}
            </div>

            {/* Dedicated Button: What You Are Expected to Have Learned So Far */}
            <button
              type="button"
              data-testid="cohort-expected-outcomes-btn"
              onClick={() => setIsOutcomesModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-extrabold flex items-center justify-between gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>آنچه انتظار می‌رود تا الان یاد گرفته باشید</span>
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/15 text-[10px] font-extrabold tabular-nums">
                {learningSummary.totalExpectedOutcomes.toLocaleString('fa-IR')} مهارت
              </span>
            </button>
          </div>
        )}

        {/* Attractive Monthly AI Guidance CTA (10 requests/month for students) */}
        {onOpenAiTutor && (
          <button
            type="button"
            data-testid="cohort-open-ai-guide-btn"
            onClick={onOpenAiTutor}
            className="w-full p-2.5 rounded-xl bg-gradient-to-l from-[#123c48] via-[#1b5a63] to-[#1e7b6e] hover:brightness-110 text-white transition-all cursor-pointer flex items-center justify-between gap-2 shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-right min-w-0">
                <div className="text-[11px] font-black truncate">
                  راهنمای هوشمند AI در موضوعات دوره
                </div>
                <div className="text-[10px] text-white/80 truncate">
                  پرسش، مثال صنعتی و ممیزی تمرین‌ها با هوش مصنوعی
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-white/15 border border-white/20 text-[10px] font-extrabold shrink-0 tabular-nums">
              {quotaBadgeLabel}
            </span>
          </button>
        )}

        {/* Secondary Privacy-Preserving Exact Search (NEVER lists or reveals any other cohorts) */}
        <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2">
          <button
            type="button"
            data-testid="cohort-toggle-private-search-btn"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-[#1f5163] dark:hover:text-[#7ac1d4] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>جستجوی محرمانه با نام دقیق موسسه یا پروژه</span>
            </span>
            {isSearchOpen ? (
              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            )}
          </button>

          {isSearchOpen && (
            <form onSubmit={handlePrivateSearch} className="space-y-2 animate-fadeIn">
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    data-testid="cohort-lookup-input"
                    aria-label="نام دقیق موسسه، شرکت یا پروژه شما"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (searchStatus !== 'idle') setSearchStatus('idle');
                    }}
                    placeholder={
                      lang === 'fa'
                        ? 'نام دقیق موسسه، شرکت یا پروژه خود را بنویسید...'
                        : 'Enter your exact organization or project name...'
                    }
                    className="w-full pr-3 pl-7 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-[#0d151c] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1f5163]/40 focus:border-[#1f5163]"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="پاک کردن جستجو"
                      onClick={handleClearSearch}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  data-testid="cohort-lookup-submit-btn"
                  disabled={isSearching || !query.trim()}
                  className="px-3 py-1.5 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] disabled:opacity-50 text-white text-xs font-extrabold transition-colors cursor-pointer shrink-0"
                >
                  {isSearching ? '...' : 'جستجو'}
                </button>
              </div>

              {/* Privacy-Safe Feedback (Never lists or hints at other organizations) */}
              {(searchStatus === 'too_short' || searchStatus === 'ambiguous') && (
                <div
                  data-testid="cohort-private-hint"
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#7ac1d4] shrink-0 mt-0.5" />
                  <span>
                    برای حفظ محرمانگی سایر کلاس‌ها، لطفاً نام دقیق‌تر موسسه، پروژه یا شهر تیم خود را وارد کنید.
                  </span>
                </div>
              )}

              {searchStatus === 'not_found' && (
                <div
                  data-testid="cohort-no-match"
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed"
                >
                  کلاسی با این نام دقیق ثبت نشده است. لطفاً املای نام موسسه یا تیم خود را بررسی کنید.
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Interactive Modal: Expected Learning Outcomes So Far */}
      {isOutcomesModalOpen && activeCohort && learningSummary && (
        <div
          dir="rtl"
          data-testid="cohort-expected-outcomes-modal"
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOutcomesModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-[#131c24] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shrink-0 bg-slate-50/70 dark:bg-[#0f171e]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="p-2 rounded-xl bg-[#1f5163] text-white">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                      آنچه انتظار می‌رود تا امروز یاد گرفته باشید
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeCohort.title} ({activeCohort.weekdayFa}) · بر اساس{' '}
                      {learningSummary.totalReviewedModules.toLocaleString('fa-IR')} سرماژول مرور شده توسط مدرس
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="بستن پنجره انتظارات یادگیری"
                onClick={() => setIsOutcomesModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {learningSummary.reviewedModules.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                  <Sparkles className="w-7 h-7 text-[#1f5163] dark:text-[#6fb3c6] mx-auto" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    کلاس شما هنوز در نقطه شروع است
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    به‌محض اینکه مدرس اولین سرماژول‌های مرور شده را برای «{activeCohort.title}» ثبت کند، چک‌لیست مهارت‌ها و خروجی‌های مورد انتظار شما در این بخش فعال می‌شود.
                  </p>
                </div>
              ) : (
                <>
                  {/* Self-Check Progress Bar */}
                  <div className="p-3.5 rounded-2xl bg-[#1f5163]/[0.06] dark:bg-[#1f5163]/20 border border-[#1f5163]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#1f5163] dark:text-[#7ac1d4]">
                        خودارزیابی تسلط شما روی مهارت‌های تدریس‌شده
                      </span>
                      <span className="font-black text-slate-900 dark:text-white tabular-nums">
                        {selfCheckedCount.toLocaleString('fa-IR')} از{' '}
                        {learningSummary.totalExpectedOutcomes.toLocaleString('fa-IR')} ({selfCheckPct.toLocaleString('fa-IR')}٪)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${selfCheckPct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      هر مهارتی را که به آن مسلط شده‌اید تیک بزنید؛ اگر موردی هنوز مبهم است، با دکمه «مرور ماژول» مستقیم به درس آن برگردید.
                    </p>
                  </div>

                  {/* Grouped Session & Module Outcomes */}
                  <div className="space-y-3">
                    {learningSummary.sessionGroups.map((group) => (
                      <div
                        key={group.sessionId}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                      >
                        <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-[#0f171e] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {group.sessionNumFa} · {group.sessionTitleFa}
                          </span>
                          <span className="text-[10px] font-bold text-[#1f5163] dark:text-[#6fb3c6] tabular-nums">
                            {group.modules.length.toLocaleString('fa-IR')} ماژول
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                          {group.modules.map((mod) => (
                            <div key={mod.id} className="p-3.5 space-y-2.5 bg-white dark:bg-[#131c24]">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    dir="ltr"
                                    className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold shrink-0"
                                  >
                                    {mod.num}
                                  </span>
                                  <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white">
                                    {mod.titleFa}
                                  </h4>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsOutcomesModalOpen(false);
                                    onSelectModule(mod.id);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#1f5163] hover:text-white text-slate-700 dark:text-slate-200 text-[10px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  <span>مرور ماژول</span>
                                </button>
                              </div>

                              {/* Interactive Outcome Checkboxes */}
                              <div className="space-y-1.5">
                                {mod.expectedOutcomesFa.map((outcome, idx) => {
                                  const key = `${mod.id}:${idx}`;
                                  const isChecked = !!checkedOutcomeKeys[key];
                                  return (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => toggleOutcomeCheck(key)}
                                      className={`w-full p-2 rounded-xl border text-right text-xs transition-all flex items-start gap-2 cursor-pointer ${
                                        isChecked
                                          ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100'
                                          : 'bg-slate-50/60 dark:bg-[#0f171e] border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#1f5163]/40'
                                      }`}
                                    >
                                      <span
                                        className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                          isChecked
                                            ? 'bg-emerald-600 border-emerald-600 text-white'
                                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-[#131c24]'
                                        }`}
                                      >
                                        {isChecked && <Check className="w-3 h-3" />}
                                      </span>
                                      <span className="leading-relaxed">{outcome}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Expected Practical Deliverable */}
                              <div className="px-2.5 py-1.5 rounded-lg bg-[#1f5163]/[0.05] dark:bg-[#6fb3c6]/10 text-[11px] text-slate-600 dark:text-slate-300">
                                <strong className="text-[#1f5163] dark:text-[#7ac1d4]">
                                  خروجی عملی مورد انتظار:
                                </strong>{' '}
                                {mod.deliverableFa}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Upcoming Class Preview Footer */}
              {learningSummary.nextModules.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 dark:text-amber-300">
                    <Target className="w-4 h-4" />
                    <span>آمادگی برای کلاس بعدی ({activeCohort.weekdayFa})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {learningSummary.nextModules.map((mod) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => {
                          setIsOutcomesModalOpen(false);
                          onSelectModule(mod.id);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#141e27] border border-amber-300 dark:border-amber-700/70 hover:border-amber-500 text-[11px] font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span dir="ltr" className="text-amber-700 dark:text-amber-300">
                          {mod.num}
                        </span>
                        <span>{mod.titleFa}</span>
                        <ArrowLeft className="w-3 h-3 text-amber-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0f171e] flex items-center justify-between gap-2 shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                چک‌لیست خودارزیابی شما به‌صورت خودکار در همین مرورگر ذخیره می‌شود.
              </span>
              <button
                type="button"
                onClick={() => setIsOutcomesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-extrabold cursor-pointer transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
