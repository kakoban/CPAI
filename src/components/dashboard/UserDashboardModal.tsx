import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  SlidersHorizontal,
  Calendar,
  CheckCircle2,
  Target,
  ArrowLeft,
  Bot,
  Trophy,
  FileCode2,
  UserCheck,
  RefreshCw,
  Search,
  RotateCcw,
  Cloud,
  Sun,
  Moon,
  Globe,
  Home,
  Building2,
  Factory,
  Landmark,
  ShieldCheck,
  Check,
  Briefcase,
  BookOpen,
  Share2,
  Linkedin,
  Instagram,
  MessageCircle,
  Send,
  Youtube,
  Link2,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  Edit2
} from 'lucide-react';
import {
  CommunitySocialConfig,
  DEFAULT_COMMUNITY_SOCIAL_CONFIG,
  SocialPlatformType,
  buildVisibleCommunityBadges,
  VisibleCommunityBadge
} from '../../utils/communityLinksEngine';
import { Language, Theme } from '../../types/cpmai';
import { UserProfile } from '../../types/auth';
import { IndustryTrackId, DisciplineId, INDUSTRY_TRACKS } from '../../types/industryTrack';
import { getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';
import { ALL_INDUSTRY_TRACKS, resolveUserOrgTrack } from '../../utils/userWorkspaceEngine';
import { AiQuotaState } from '../../utils/aiQuotaEngine';
import {
  CohortScheduleRecord,
  PrivateCohortLookupStatus,
  buildExpectedLearningSummary,
  getDefaultCohortSchedules
} from '../../utils/cohortScheduleEngine';
import {
  buildModuleReviewPayload,
  toggleReviewModuleSelection,
  resolveDashboardEscapeAction
} from '../../utils/dashboardReviewEngine';
import { ModuleQuickReviewPanel } from './ModuleQuickReviewPanel';
import { lmsApi } from '../../services/lmsApi';

const SELF_CHECK_STORAGE_PREFIX = 'cpmai_cohort_outcomes_check_v1_';

type DashboardTab = 'overview' | 'skills' | 'tools';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  currentUser: UserProfile | null;
  myCohort: CohortScheduleRecord | null;
  searchedCohort: CohortScheduleRecord | null;
  isCohortLoading: boolean;
  onRefreshCohort: () => void;
  onSetSearchedCohort: (cohort: CohortScheduleRecord | null) => void;
  industryTrack: IndustryTrackId;
  orgTrackId: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
  onOpenTrackModal: () => void;
  activeDiscipline: DisciplineId;
  onSelectDiscipline?: (disciplineId: DisciplineId) => void;
  onOpenDisciplineModal: () => void;
  aiQuota: AiQuotaState | null;
  onOpenAiTutor: () => void;
  onOpenLeaderboard: () => void;
  onOpenMarkdownStudio: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
  onSelectModule: (moduleId: string) => void;
  onSyncToCloud: () => void;
  isSyncing: boolean;
  cloudStatus: 'idle' | 'syncing' | 'synced' | 'error';
  completedPage0Count?: number;
}

const ORG_TRACK_SHORT_LABELS: Record<IndustryTrackId, string> = {
  CIVIL_INFRA: 'راه و شهرسازی و ابنیه',
  ENERGY_PETRO: 'نفت، گاز و پتروشیمی',
  PAYA_SAMAN_PARS: 'پایا سامان پارس',
  GENERAL_EVERYDAY: 'خانه و خانواده'
};

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  currentUser,
  myCohort,
  searchedCohort,
  isCohortLoading,
  onRefreshCohort,
  onSetSearchedCohort,
  industryTrack,
  orgTrackId,
  onSelectTrack,
  onOpenTrackModal,
  activeDiscipline,
  onOpenDisciplineModal,
  aiQuota,
  onOpenAiTutor,
  onOpenLeaderboard,
  onOpenMarkdownStudio,
  onOpenAuth,
  onOpenAdmin,
  isAdmin = false,
  onSelectModule,
  onSyncToCloud,
  isSyncing,
  cloudStatus
}) => {
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [reviewModuleId, setReviewModuleId] = useState<string | null>(null);
  const [checkedOutcomeKeys, setCheckedOutcomeKeys] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<PrivateCohortLookupStatus>('idle');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [adminCohorts, setAdminCohorts] = useState<CohortScheduleRecord[]>(() =>
    getDefaultCohortSchedules()
  );
  const [isAdminCohortsLoading, setIsAdminCohortsLoading] = useState<boolean>(false);

  // Admin-configured community & social invite links (only displayed to learners when configured)
  const [communityConfig, setCommunityConfig] = useState<CommunitySocialConfig>(
    () => ({ ...DEFAULT_COMMUNITY_SOCIAL_CONFIG })
  );
  const [draftCommunityConfig, setDraftCommunityConfig] = useState<CommunitySocialConfig>(
    () => ({ ...DEFAULT_COMMUNITY_SOCIAL_CONFIG })
  );
  const [isCommunityEditorOpen, setIsCommunityEditorOpen] = useState<boolean>(false);
  const [isSavingCommunity, setIsSavingCommunity] = useState<boolean>(false);
  const [communitySaveMsg, setCommunitySaveMsg] = useState<string | null>(null);

  const visibleCommunityBadges = useMemo(
    () => buildVisibleCommunityBadges(communityConfig),
    [communityConfig]
  );

  // Load community social links whenever dashboard opens (or updates via admin save)
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    lmsApi.fetchCommunitySocialLinks().then((cfg) => {
      if (cancelled) return;
      setCommunityConfig(cfg);
      setDraftCommunityConfig({
        ...cfg,
        instructorName: cfg.instructorName || (isAdmin ? currentUser?.displayName || '' : '')
      });
    });

    const handleUpdated = (ev: Event) => {
      const nextCfg = (ev as CustomEvent<{ config?: CommunitySocialConfig }>)?.detail?.config;
      if (nextCfg) {
        setCommunityConfig(nextCfg);
      }
    };
    window.addEventListener('cpmai_community_links_updated', handleUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener('cpmai_community_links_updated', handleUpdated);
    };
  }, [isOpen, isAdmin, currentUser?.displayName]);

  const handleSaveCommunityLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCommunity(true);
    setCommunitySaveMsg(null);
    const res = await lmsApi.saveAdminCommunitySocialLinks(draftCommunityConfig);
    setIsSavingCommunity(false);
    if (res.success && res.config) {
      setCommunityConfig(res.config);
      setDraftCommunityConfig(res.config);
      setCommunitySaveMsg(isFa ? 'لینک‌ها ذخیره و در داشبورد فراگیران فعال شد.' : 'Saved & published to learner dashboards.');
      setTimeout(() => setCommunitySaveMsg(null), 3500);
    } else {
      setCommunitySaveMsg(res.error || (isFa ? 'خطا در ذخیره لینک‌ها' : 'Failed to save links'));
    }
  };

  const handleClearCommunityLinks = async () => {
    const emptyCfg: CommunitySocialConfig = { ...DEFAULT_COMMUNITY_SOCIAL_CONFIG };
    setDraftCommunityConfig(emptyCfg);
    setIsSavingCommunity(true);
    const res = await lmsApi.saveAdminCommunitySocialLinks(emptyCfg);
    setIsSavingCommunity(false);
    if (res.success && res.config) {
      setCommunityConfig(res.config);
      setIsCommunityEditorOpen(false);
    }
  };

  const handleAddExtraCommunityLink = () => {
    setDraftCommunityConfig((prev) => ({
      ...prev,
      extraLinks: [
        ...(prev.extraLinks || []),
        {
          id: `extra_${Date.now()}`,
          platform: 'telegram',
          label: '',
          url: '',
          badgeSubtext: ''
        }
      ]
    }));
  };

  const renderBadgeIcon = (badge: VisibleCommunityBadge) => {
    switch (badge.platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4 shrink-0" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 shrink-0" />;
      case 'bale':
        return <MessageCircle className="w-4 h-4 shrink-0" />;
      case 'telegram':
        return <Send className="w-4 h-4 shrink-0" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 shrink-0" />;
      case 'website':
        return <Globe className="w-4 h-4 shrink-0" />;
      default:
        return <Link2 className="w-4 h-4 shrink-0" />;
    }
  };

  const getBadgeStyleClasses = (badge: VisibleCommunityBadge): { pill: string; iconBox: string } => {
    if (badge.platform === 'linkedin') {
      return {
        pill: 'border-[#0A66C2]/25 bg-[#0A66C2]/[0.06] hover:bg-[#0A66C2]/[0.12] hover:border-[#0A66C2]/50 text-[var(--cpai-text)]',
        iconBox: 'bg-[#0A66C2] text-white'
      };
    }
    if (badge.platform === 'instagram') {
      return {
        pill: 'border-rose-500/25 bg-rose-500/[0.06] hover:bg-rose-500/[0.12] hover:border-rose-500/50 text-[var(--cpai-text)]',
        iconBox: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white'
      };
    }
    if (badge.platform === 'bale') {
      return {
        pill: 'border-emerald-600/25 bg-emerald-500/[0.07] hover:bg-emerald-500/[0.14] hover:border-emerald-600/50 text-[var(--cpai-text)]',
        iconBox: 'bg-emerald-600 text-white'
      };
    }
    if (badge.platform === 'telegram') {
      return {
        pill: 'border-sky-500/25 bg-sky-500/[0.06] hover:bg-sky-500/[0.12] hover:border-sky-500/50 text-[var(--cpai-text)]',
        iconBox: 'bg-sky-500 text-white'
      };
    }
    if (badge.platform === 'youtube') {
      return {
        pill: 'border-red-500/25 bg-red-500/[0.06] hover:bg-red-500/[0.12] hover:border-red-500/50 text-[var(--cpai-text)]',
        iconBox: 'bg-red-600 text-white'
      };
    }
    return {
      pill: 'border-[var(--cpai-primary)]/30 bg-[var(--cpai-primary-soft)]/60 hover:bg-[var(--cpai-primary-soft)] hover:border-[var(--cpai-primary)] text-[var(--cpai-text)]',
      iconBox: 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
    };
  };

  const activeCohort = searchedCohort || myCohort;
  const activeDisciplineMeta = useMemo(
    () => getDisciplineMetadata(activeDiscipline),
    [activeDiscipline]
  );

  // For Admin/Instructor: load all teaching subsidiary cohorts so every company can be previewed/tested
  useEffect(() => {
    if (!isOpen || !isAdmin) return;
    let cancelled = false;
    setIsAdminCohortsLoading(true);
    lmsApi
      .fetchAdminWeekdayCohorts()
      .then((res) => {
        if (cancelled) return;
        if (res?.cohorts && res.cohorts.length > 0) {
          setAdminCohorts(res.cohorts);
        }
      })
      .catch(() => {
        // Keep default cohorts fallback
      })
      .finally(() => {
        if (!cancelled) setIsAdminCohortsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, isAdmin]);

  const handleSelectAdminCohort = (cohort: CohortScheduleRecord) => {
    onSetSearchedCohort(cohort);
    const resolvedTrack = resolveUserOrgTrack({ cohort });
    if (resolvedTrack !== industryTrack) {
      onSelectTrack(resolvedTrack);
    }
    setReviewModuleId(null);
  };

  // Reset side review drawer when modal closes or cohort changes
  useEffect(() => {
    if (!isOpen) {
      setReviewModuleId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setReviewModuleId(null);
  }, [activeCohort?.id]);

  // Layered Escape close: closes optional review panel first, keeping dashboard open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (resolveDashboardEscapeAction(reviewModuleId) === 'close_review') {
        setReviewModuleId(null);
      } else {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, reviewModuleId]);

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

  const learningSummary = useMemo(() => {
    if (!activeCohort) return null;
    return buildExpectedLearningSummary(activeCohort.reviewedModules, activeCohort.nextModules);
  }, [activeCohort]);

  const reviewPayload = useMemo(
    () => buildModuleReviewPayload(reviewModuleId, learningSummary?.reviewedModules ?? []),
    [reviewModuleId, learningSummary]
  );
  const isReviewOpen = !!reviewPayload;

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

  const totalOutcomes = learningSummary?.totalExpectedOutcomes ?? 0;
  const selfCheckPct = totalOutcomes > 0 ? Math.round((selfCheckedCount / totalOutcomes) * 100) : 0;

  const reviewedCount = learningSummary?.totalReviewedModules ?? 0;
  const totalCatalogModules = learningSummary?.totalCatalogModules ?? 22;
  const courseProgressPct =
    totalCatalogModules > 0 ? Math.round((reviewedCount / totalCatalogModules) * 100) : 0;
  const nextCount = learningSummary?.nextModules.length ?? 0;

  const quotaText = aiQuota
    ? aiQuota.isUnlimited
      ? isFa
        ? 'نامحدود'
        : 'Unlimited'
      : isFa
      ? `${aiQuota.remaining.toLocaleString('fa-IR')} از ${aiQuota.limit.toLocaleString('fa-IR')}`
      : `${aiQuota.remaining}/${aiQuota.limit}`
    : isFa
    ? '۵ پرسش ماهانه'
    : '5/month';

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

  const handlePrivateSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchStatus('idle');
      onSetSearchedCohort(null);
      return;
    }
    setIsSearching(true);
    try {
      const res = await lmsApi.lookupPrivateCohortByQuery(trimmed);
      setSearchStatus(res.status);
      if (res.status === 'matched' && res.cohort) {
        onSetSearchedCohort(res.cohort);
        setActiveTab('overview');
      } else {
        onSetSearchedCohort(null);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setSearchStatus('idle');
    onSetSearchedCohort(null);
  };

  const handleJumpToModule = (moduleId: string) => {
    onSelectModule(moduleId);
    onClose();
  };

  const OrgIcon =
    orgTrackId === 'PAYA_SAMAN_PARS'
      ? Landmark
      : orgTrackId === 'ENERGY_PETRO'
      ? Factory
      : Building2;

  if (!isOpen) return null;

  const navItems: Array<{
    id: DashboardTab;
    labelFa: string;
    shortFa: string;
    labelEn: string;
    shortEn: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'overview',
      labelFa: 'نمای کلی و نقشه راه',
      shortFa: 'نقشه راه',
      labelEn: 'Overview & Roadmap',
      shortEn: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />
    },
    {
      id: 'skills',
      labelFa: 'مهارت‌ها و خودارزیابی',
      shortFa: 'مهارت‌ها',
      labelEn: 'Expected Skills',
      shortEn: 'Skills',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
      badge: totalOutcomes > 0 ? `${selfCheckedCount.toLocaleString('fa-IR')}/${totalOutcomes.toLocaleString('fa-IR')}` : undefined
    },
    {
      id: 'tools',
      labelFa: 'ابزارها و تنظیمات',
      shortFa: 'تنظیمات',
      labelEn: 'Tools & Settings',
      shortEn: 'Tools',
      icon: <SlidersHorizontal className="w-4 h-4 shrink-0" />
    }
  ];

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-dashboard-title"
      data-testid="user-dashboard-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${
          isReviewOpen ? 'max-w-[96vw] xl:max-w-[1440px]' : 'max-w-5xl'
        } h-[min(90dvh,780px)] rounded-2xl bg-[var(--cpai-bg)] border border-[var(--cpai-border)] text-[var(--cpai-text)] shadow-2xl flex flex-col overflow-hidden transition-[max-width] duration-200`}
      >
        {/* Top Bar: Identity + Quick Refresh + Close */}
        <header className="shrink-0 px-4 py-3.5 sm:px-6 border-b border-[var(--cpai-border)] bg-[var(--cpai-surface)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-[var(--cpai-border)] shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] flex items-center justify-center text-sm font-bold shrink-0">
                {(currentUser?.displayName || 'ک').charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
                <span className="font-semibold text-[var(--cpai-primary-strong)]">
                  {isFa ? 'داشبورد فراگیر' : 'Learner Dashboard'}
                </span>
                {activeCohort && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{activeCohort.title}</span>
                    <span aria-hidden="true" className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{activeCohort.weekdayFa}</span>
                  </>
                )}
              </div>
              <h2
                id="user-dashboard-title"
                className="text-base sm:text-lg font-bold text-[var(--cpai-text)] truncate"
              >
                {currentUser?.displayName || (isFa ? 'پنل اختصاصی شما' : 'Your Workspace')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {searchedCohort && myCohort && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-xs font-semibold text-[var(--cpai-primary-strong)] hover:border-[var(--cpai-primary)] cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isFa ? 'کلاس من' : 'My Class'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onRefreshCohort}
              aria-label={isFa ? 'به‌روزرسانی وضعیت کلاس' : 'Refresh class status'}
              title={isFa ? 'تازه‌سازی آخرین تغییرات مدرس' : 'Refresh instructor updates'}
              className="w-9 h-9 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-[var(--cpai-muted)] hover:text-[var(--cpai-primary)] hover:border-[var(--cpai-primary)] flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isCohortLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label={isFa ? 'بستن داشبورد' : 'Close dashboard'}
              data-testid="user-dashboard-close-btn"
              className="w-9 h-9 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Body: Right Navigation Rail (Desktop) + Dashboard Canvas + Optional Split-View Review Drawer */}
        <div className="relative flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Rail */}
          <aside
            className={`shrink-0 ${
              isReviewOpen ? 'md:w-56 xl:w-60' : 'md:w-60'
            } border-b md:border-b-0 md:border-e border-[var(--cpai-border)] bg-[var(--cpai-surface)] p-3 sm:p-4 flex flex-col justify-between gap-4`}
          >
            <nav
              aria-label={isFa ? 'بخش‌های داشبورد' : 'Dashboard navigation'}
              className="grid grid-cols-3 md:flex md:flex-col gap-1.5"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                    data-testid={`dashboard-tab-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center justify-center md:justify-between gap-1.5 md:gap-2 px-2.5 md:px-3 py-2 md:py-2.5 rounded-xl text-xs md:text-[13px] font-semibold cursor-pointer whitespace-nowrap md:w-full ${
                      isActive
                        ? 'bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] border border-[var(--cpai-primary)]'
                        : 'bg-transparent text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:bg-[var(--cpai-surface-subtle)] border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 md:gap-2 min-w-0">
                      {item.icon}
                      <span className="md:hidden truncate">{isFa ? item.shortFa : item.shortEn}</span>
                      <span className="hidden md:inline truncate">{isFa ? item.labelFa : item.labelEn}</span>
                    </span>
                    {item.badge && (
                      <span className="hidden md:inline text-[11px] font-mono tabular-nums opacity-80">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Bottom Rail: Quick Progress + AI Tutor */}
            <div className="hidden md:flex flex-col gap-3 pt-3 border-t border-[var(--cpai-border)]">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--cpai-muted)]">
                    {isFa ? 'پیشرفت کلاس' : 'Class Progress'}
                  </span>
                  <span className="font-bold text-[var(--cpai-text)] tabular-nums">
                    {courseProgressPct.toLocaleString(isFa ? 'fa-IR' : 'en-US')}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--cpai-surface-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--cpai-primary)] transition-all duration-300"
                    style={{ width: `${courseProgressPct}%` }}
                  />
                </div>
                <div className="text-[11px] text-[var(--cpai-muted)] tabular-nums">
                  {isFa
                    ? `${reviewedCount.toLocaleString('fa-IR')} از ${totalCatalogModules.toLocaleString('fa-IR')} ماژول مرور شده`
                    : `${reviewedCount} of ${totalCatalogModules} modules reviewed`}
                </div>
              </div>

              <button
                type="button"
                data-testid="dashboard-rail-ai-btn"
                onClick={() => {
                  onClose();
                  onOpenAiTutor();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 shrink-0" />
                  <span>{isFa ? 'مربی هوشمند AI' : 'AI Tutor'}</span>
                </span>
                <span className="text-[11px] opacity-90 tabular-nums">{quotaText}</span>
              </button>
            </div>
          </aside>

          {/* Main Scrollable Canvas */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Admin / Instructor Multi-Company Test Switcher */}
                {isAdmin && (
                  <section
                    data-testid="admin-dashboard-company-switcher"
                    className="rounded-2xl bg-[var(--cpai-primary-soft)]/45 border border-[var(--cpai-primary)]/40 p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <ShieldCheck className="w-4 h-4 text-[var(--cpai-primary-strong)] shrink-0" />
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-[var(--cpai-text)]">
                            {isFa
                              ? 'تست شرکت‌های زیرمجموعه و کلاس‌های تدریس (ویژه ادمین)'
                              : 'Admin Company & Cohort Preview Switcher'}
                          </h3>
                          <p className="text-[11px] text-[var(--cpai-muted)]">
                            {isFa
                              ? 'با انتخاب هر شرکت، نقشه راه، مهارت‌ها، مرور سریع و مسیر تخصصی همان مجموعه بارگذاری می‌شود.'
                              : 'Select any teaching company to test its roadmap, skills, quick review, and domain track.'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        <button
                          type="button"
                          data-testid="admin-community-links-toggle-btn"
                          onClick={() => setIsCommunityEditorOpen((prev) => !prev)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                            isCommunityEditorOpen
                              ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] border-[var(--cpai-primary)]'
                              : 'border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] hover:border-[var(--cpai-primary)]'
                          }`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{isFa ? 'لینک‌های دعوت و سوشال' : 'Social & Invite Links'}</span>
                          {visibleCommunityBadges.length > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/15 text-[10px] font-mono tabular-nums">
                              {visibleCommunityBadges.length.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                            </span>
                          )}
                        </button>

                        {searchedCohort && (
                          <button
                            type="button"
                            onClick={handleClearSearch}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[11px] font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer shrink-0"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{isFa ? 'حالت پیش‌فرض' : 'Reset'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {adminCohorts.map((cohort) => {
                        const isSelectedCohort = activeCohort?.id === cohort.id;
                        const cohortTrack = resolveUserOrgTrack({ cohort });
                        const cohortReviewed = cohort.reviewedModules?.length ?? 0;
                        const CohortIcon =
                          cohortTrack === 'PAYA_SAMAN_PARS'
                            ? Landmark
                            : cohortTrack === 'ENERGY_PETRO'
                            ? Factory
                            : Building2;

                        return (
                          <button
                            key={cohort.id}
                            type="button"
                            data-testid={`admin-cohort-switch-${cohort.id}`}
                            onClick={() => handleSelectAdminCohort(cohort)}
                            className={`p-2.5 rounded-xl border text-start transition-colors cursor-pointer flex items-start gap-2.5 ${
                              isSelectedCohort
                                ? 'bg-[var(--cpai-surface)] border-[var(--cpai-primary)] ring-1 ring-[var(--cpai-primary)] shadow-2xs'
                                : 'bg-[var(--cpai-bg)]/90 border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 hover:bg-[var(--cpai-surface)]'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelectedCohort
                                  ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                                  : 'bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary)]'
                              }`}
                            >
                              <CohortIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-[var(--cpai-text)] truncate">
                                {cohort.title}
                              </div>
                              <div className="flex items-center justify-between gap-1 text-[10.5px] text-[var(--cpai-muted)] mt-0.5">
                                <span className="truncate">{cohort.weekdayFa}</span>
                                <span className="font-mono tabular-nums shrink-0">
                                  {isFa
                                    ? `${cohortReviewed.toLocaleString('fa-IR')}/۲۲`
                                    : `${cohortReviewed}/22`}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {isAdminCohortsLoading && (
                      <div className="text-[11px] text-[var(--cpai-muted)]">
                        {isFa ? 'در حال دریافت آخرین وضعیت شرکت‌ها...' : 'Loading live cohorts...'}
                      </div>
                    )}

                    {/* Collapsible Admin Social & Community Invite Links Editor */}
                    {isCommunityEditorOpen && (
                      <form
                        data-testid="admin-community-links-editor"
                        onSubmit={handleSaveCommunityLinks}
                        className="mt-2 pt-3 border-t border-[var(--cpai-primary)]/25 space-y-3 animate-fadeIn"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-[var(--cpai-text)]">
                              {isFa
                                ? 'تنظیم لینک‌های شبکه‌های اجتماعی و دعوت فراگیران'
                                : 'Configure Instructor & OWJ Social / Community Invite Links'}
                            </div>
                            <p className="text-[11px] text-[var(--cpai-muted)]">
                              {isFa
                                ? 'هر موردی که پر کنید به شکل بج زیبا در داشبورد فراگیران نمایش داده می‌شود؛ فیلدهای خالی نمایش داده نمی‌شوند.'
                                : 'Filled links appear as clean badges in learner dashboards; empty fields stay completely hidden.'}
                            </p>
                          </div>
                          {visibleCommunityBadges.length > 0 && (
                            <button
                              type="button"
                              onClick={handleClearCommunityLinks}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-500/30 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{isFa ? 'پاک کردن همه' : 'Clear All'}</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'نام مدرس / دعوت‌کننده (برای بج لینکدین شخصی)' : 'Instructor Name (for personal badge)'}
                            </span>
                            <input
                              type="text"
                              value={draftCommunityConfig.instructorName}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, instructorName: e.target.value }))
                              }
                              placeholder={isFa ? 'مثلاً: مهندس فکوری‌زاد' : 'e.g. Eng. Fakourizad'}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>

                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'عنوان یا زیرمتن کوتاه (اختیاری)' : 'Short Subtitle (optional)'}
                            </span>
                            <input
                              type="text"
                              value={draftCommunityConfig.instructorTitle || ''}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, instructorTitle: e.target.value }))
                              }
                              placeholder={isFa ? 'مثلاً: مدرس دوره و مشاور AI اوج' : 'e.g. Lead AI Instructor'}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>

                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'آدرس لینکدین شخصی شما (ادمین)' : 'Admin Personal LinkedIn URL'}
                            </span>
                            <input
                              type="text"
                              dir="ltr"
                              value={draftCommunityConfig.adminLinkedinUrl}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, adminLinkedinUrl: e.target.value }))
                              }
                              placeholder="https://linkedin.com/in/..."
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] font-mono focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>

                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'آدرس لینکدین اوج' : 'OWJ Official LinkedIn URL'}
                            </span>
                            <input
                              type="text"
                              dir="ltr"
                              value={draftCommunityConfig.owjLinkedinUrl}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, owjLinkedinUrl: e.target.value }))
                              }
                              placeholder="https://linkedin.com/company/owjbc"
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] font-mono focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>

                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'آدرس اینستاگرام اوج' : 'Instagram URL'}
                            </span>
                            <input
                              type="text"
                              dir="ltr"
                              value={draftCommunityConfig.instagramUrl}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, instagramUrl: e.target.value }))
                              }
                              placeholder="https://instagram.com/..."
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] font-mono focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>

                          <label className="space-y-1">
                            <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'آدرس کانال بله اوج' : 'OWJ Bale Channel URL'}
                            </span>
                            <input
                              type="text"
                              dir="ltr"
                              value={draftCommunityConfig.baleUrl}
                              onChange={(e) =>
                                setDraftCommunityConfig((p) => ({ ...p, baleUrl: e.target.value }))
                              }
                              placeholder="https://ble.ir/..."
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] font-mono focus:outline-hidden focus:border-[var(--cpai-primary)]"
                            />
                          </label>
                        </div>

                        <label className="block space-y-1">
                          <span className="block text-[11px] font-semibold text-[var(--cpai-text)]">
                            {isFa ? 'پیام کوتاه دعوت برای فراگیران (اختیاری)' : 'Short Invite Note (optional)'}
                          </span>
                          <input
                            type="text"
                            value={draftCommunityConfig.inviteMessage || ''}
                            onChange={(e) =>
                              setDraftCommunityConfig((p) => ({ ...p, inviteMessage: e.target.value }))
                            }
                            placeholder={
                              isFa
                                ? 'مثلاً: برای ارتباط مستقیم، دریافت فایل‌های تکمیلی و پیوستن به جمع اوج همراه ما باشید.'
                                : 'Join our official channels for updates and direct mentoring.'
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] focus:outline-hidden focus:border-[var(--cpai-primary)]"
                          />
                        </label>

                        {/* Extra Custom Channels (Telegram, YouTube, Website, etc.) */}
                        {(draftCommunityConfig.extraLinks || []).length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[11px] font-semibold text-[var(--cpai-text)]">
                              {isFa ? 'سایر شبکه‌ها و کانال‌های دلخواه:' : 'Additional Custom Channels:'}
                            </div>
                            {draftCommunityConfig.extraLinks.map((extra, idx) => (
                              <div
                                key={extra.id}
                                className="grid grid-cols-1 sm:grid-cols-[120px_1fr_1.4fr_auto] gap-2 items-center"
                              >
                                <select
                                  value={extra.platform}
                                  onChange={(e) => {
                                    const nextPlat = e.target.value as SocialPlatformType;
                                    setDraftCommunityConfig((p) => ({
                                      ...p,
                                      extraLinks: p.extraLinks.map((it, i) =>
                                        i === idx ? { ...it, platform: nextPlat } : it
                                      )
                                    }));
                                  }}
                                  className="px-2 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)]"
                                >
                                  <option value="telegram">{isFa ? 'تلگرام' : 'Telegram'}</option>
                                  <option value="bale">{isFa ? 'بله' : 'Bale'}</option>
                                  <option value="linkedin">{isFa ? 'لینکدین' : 'LinkedIn'}</option>
                                  <option value="instagram">{isFa ? 'اینستاگرام' : 'Instagram'}</option>
                                  <option value="youtube">{isFa ? 'یوتیوب' : 'YouTube'}</option>
                                  <option value="website">{isFa ? 'وب‌سایت' : 'Website'}</option>
                                  <option value="other">{isFa ? 'سایر' : 'Other'}</option>
                                </select>
                                <input
                                  type="text"
                                  value={extra.label}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setDraftCommunityConfig((p) => ({
                                      ...p,
                                      extraLinks: p.extraLinks.map((it, i) =>
                                        i === idx ? { ...it, label: val } : it
                                      )
                                    }));
                                  }}
                                  placeholder={isFa ? 'عنوان بج (مثلاً کانال تلگرام)' : 'Badge Label'}
                                  className="px-2.5 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)]"
                                />
                                <input
                                  type="text"
                                  dir="ltr"
                                  value={extra.url}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setDraftCommunityConfig((p) => ({
                                      ...p,
                                      extraLinks: p.extraLinks.map((it, i) =>
                                        i === idx ? { ...it, url: val } : it
                                      )
                                    }));
                                  }}
                                  placeholder="https://..."
                                  className="px-2.5 py-1.5 text-xs rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-[var(--cpai-text)] font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDraftCommunityConfig((p) => ({
                                      ...p,
                                      extraLinks: p.extraLinks.filter((_, i) => i !== idx)
                                    }))
                                  }
                                  className="p-1.5 rounded-lg border border-[var(--cpai-border)] text-[var(--cpai-muted)] hover:text-rose-600 cursor-pointer"
                                  title={isFa ? 'حذف' : 'Remove'}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleAddExtraCommunityLink}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-surface)] text-xs font-semibold text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                            <span>{isFa ? 'افزودن لینک شبکه دیگر' : 'Add Another Channel'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {communitySaveMsg && (
                              <span className="text-[11px] font-semibold text-[var(--cpai-primary-strong)]">
                                {communitySaveMsg}
                              </span>
                            )}
                            <button
                              type="submit"
                              data-testid="save-community-links-btn"
                              disabled={isSavingCommunity}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs font-bold cursor-pointer disabled:opacity-50"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>
                                {isSavingCommunity
                                  ? isFa
                                    ? 'در حال ذخیره...'
                                    : 'Saving...'
                                  : isFa
                                  ? 'ذخیره در داشبورد دانشجوها'
                                  : 'Save to Student Dashboard'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </section>
                )}

                {/* 4-Cell Real Metric Strip */}
                <div className={`grid grid-cols-2 ${isReviewOpen ? '2xl:grid-cols-4' : 'lg:grid-cols-4'} gap-3`}>
                  <div className="p-4 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                    <div className="text-xs text-[var(--cpai-muted)]">
                      {isFa ? 'ماژول‌های مرور شده' : 'Reviewed Modules'}
                    </div>
                    <div className="text-xl font-bold text-[var(--cpai-text)] tabular-nums">
                      {reviewedCount.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                      <span className="text-xs font-normal text-[var(--cpai-muted)] ms-1">
                        / {totalCatalogModules.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                    <div className="text-xs text-[var(--cpai-muted)]">
                      {isFa ? 'ماژول‌های جلسه جاری' : 'Current Session'}
                    </div>
                    <div className="text-xl font-bold text-[var(--cpai-primary-strong)] tabular-nums">
                      {nextCount.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                      <span className="text-xs font-normal text-[var(--cpai-muted)] ms-1">
                        {isFa ? 'ماژول' : 'modules'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                    <div className="text-xs text-[var(--cpai-muted)]">
                      {isFa ? 'مهارت‌های تاییدشده' : 'Verified Skills'}
                    </div>
                    <div className="text-xl font-bold text-[var(--cpai-text)] tabular-nums">
                      {selfCheckedCount.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                      <span className="text-xs font-normal text-[var(--cpai-muted)] ms-1">
                        / {totalOutcomes.toLocaleString(isFa ? 'fa-IR' : 'en-US')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] space-y-1">
                    <div className="text-xs text-[var(--cpai-muted)]">
                      {isFa ? 'سهمیه مربی هوشمند' : 'AI Tutor Quota'}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[var(--cpai-text)] tabular-nums truncate">
                      {quotaText}
                    </div>
                  </div>
                </div>

                {/* Focal Anchor: Upcoming / Current Class Modules */}
                <section
                  data-testid="dashboard-next-modules-section"
                  className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--cpai-border)]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)]">
                        <Target className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                        <span>{isFa ? 'اقدام اصلی · ادامه یادگیری' : 'Primary Action · Continue Learning'}</span>
                        {activeCohort && (
                          <>
                            <span aria-hidden="true">·</span>
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>{activeCohort.weekdayFa}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[var(--cpai-text)]">
                        {isFa ? 'ماژول‌های کلاس هفته جاری / آینده' : 'Upcoming Class Modules'}
                      </h3>
                    </div>

                    {totalOutcomes > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('skills')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-primary-strong)] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-center"
                      >
                        <GraduationCap className="w-4 h-4 shrink-0" />
                        <span>
                          {isFa
                            ? `چک‌لیست مهارت‌ها (${totalOutcomes.toLocaleString('fa-IR')})`
                            : `Skills Checklist (${totalOutcomes})`}
                        </span>
                      </button>
                    )}
                  </div>

                  {!activeCohort ? (
                    <div className="p-4 rounded-xl bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                        {isFa
                          ? 'کلاس اختصاصی شما هنوز به‌صورت خودکار متصل نشده است. می‌توانید از بخش «ابزارها و تنظیمات» نام دقیق سازمان یا پروژه خود را جستجو کنید یا مستقیماً از مدار آموزشی شروع کنید.'
                          : 'Your organization cohort is not auto-linked yet. You can look it up in Tools & Settings or start directly from the course orbit.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('tools')}
                        className="px-3.5 py-2 rounded-xl bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] text-xs font-semibold whitespace-nowrap cursor-pointer shrink-0"
                      >
                        {isFa ? 'جستجوی کلاس من' : 'Find My Class'}
                      </button>
                    </div>
                  ) : learningSummary && learningSummary.nextModules.length > 0 ? (
                    <div className="space-y-2.5">
                      {learningSummary.nextModules.map((mod) => (
                        <button
                          key={mod.id}
                          type="button"
                          data-testid={`dashboard-open-next-${mod.id}`}
                          onClick={() => handleJumpToModule(mod.id)}
                          className="w-full p-3.5 rounded-xl bg-[var(--cpai-bg)] hover:bg-[var(--cpai-primary-soft)]/50 border border-[var(--cpai-border)] hover:border-[var(--cpai-primary)] transition-colors cursor-pointer flex items-center justify-between gap-3 text-start group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              dir="ltr"
                              className="px-2.5 py-1 rounded-lg bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] font-mono text-xs font-bold tabular-nums shrink-0"
                            >
                              {mod.num}
                            </span>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-[var(--cpai-text)] group-hover:text-[var(--cpai-primary-strong)] truncate">
                                {mod.titleFa}
                              </div>
                              <div className="text-xs text-[var(--cpai-muted)] truncate mt-0.5">
                                {isFa ? 'برای ورود مستقیم به محیط مطالعه کلیک کنید' : 'Open focused lesson'}
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] shrink-0">
                            <span>{isFa ? 'شروع' : 'Open'}</span>
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                          </span>
                        </button>
                      ))}

                      {activeCohort.instructorNote && (
                        <div className="p-3.5 rounded-xl bg-[var(--cpai-warning-bg)] border border-[var(--cpai-border)] text-xs text-[var(--cpai-warning-text)] leading-relaxed">
                          <strong className="font-bold">{isFa ? 'یادداشت مدرس: ' : 'Instructor Note: '}</strong>
                          {activeCohort.instructorNote}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[var(--cpai-muted)]">
                      {isFa
                        ? 'ماژول جلسه بعدی هنوز توسط مدرس ثبت نشده است.'
                        : 'Next session module has not been scheduled yet.'}
                    </p>
                  )}
                </section>

                {/* Reviewed Modules List (Click opens optional side review drawer without leaving dashboard) */}
                {activeCohort && learningSummary && (
                  <section
                    data-testid="dashboard-reviewed-modules-section"
                    className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--cpai-border)]">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[var(--cpai-success-text)] shrink-0" />
                        <h3 className="text-sm sm:text-base font-bold text-[var(--cpai-text)]">
                          {isFa ? 'ماژول‌های مرور شده تا امروز' : 'Reviewed Modules'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)]">
                        <span className="hidden sm:inline">
                          {isFa ? 'کلیک برای مرور سریع در کنار داشبورد' : 'Click for quick side review'}
                        </span>
                        <span className="tabular-nums font-semibold">
                          {isFa
                            ? `${reviewedCount.toLocaleString('fa-IR')} مورد`
                            : `${reviewedCount} items`}
                        </span>
                      </div>
                    </div>

                    {learningSummary.reviewedModules.length === 0 ? (
                      <p className="text-xs sm:text-sm text-[var(--cpai-muted)]">
                        {isFa
                          ? 'هنوز ماژول مرور شده‌ای توسط مدرس برای کلاس شما ثبت نشده است.'
                          : 'No reviewed modules recorded yet.'}
                      </p>
                    ) : (
                      <div
                        className={`grid grid-cols-1 ${
                          isReviewOpen ? '2xl:grid-cols-2' : 'sm:grid-cols-2'
                        } gap-2`}
                      >
                        {learningSummary.reviewedModules.map((mod) => {
                          const isReviewing = reviewModuleId === mod.id;
                          return (
                            <button
                              key={mod.id}
                              type="button"
                              data-testid={`dashboard-review-module-${mod.id}`}
                              aria-pressed={isReviewing}
                              onClick={() =>
                                setReviewModuleId((prev) => toggleReviewModuleSelection(prev, mod.id))
                              }
                              className={`p-2.5 rounded-xl border text-start transition-colors cursor-pointer flex items-center justify-between gap-2 group ${
                                isReviewing
                                  ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)]'
                                  : 'bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] border-[var(--cpai-border)]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  dir="ltr"
                                  className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold tabular-nums shrink-0 ${
                                    isReviewing
                                      ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                                      : 'bg-[var(--cpai-success-bg)] text-[var(--cpai-success-text)]'
                                  }`}
                                >
                                  {mod.num}
                                </span>
                                <span
                                  className={`text-xs font-semibold truncate ${
                                    isReviewing
                                      ? 'text-[var(--cpai-primary-strong)]'
                                      : 'text-[var(--cpai-text)] group-hover:text-[var(--cpai-primary-strong)]'
                                  }`}
                                >
                                  {mod.titleFa}
                                </span>
                              </div>
                              {isReviewing ? (
                                <span className="text-[10px] font-bold text-[var(--cpai-primary-strong)] shrink-0">
                                  {isFa ? 'در حال مرور' : 'Reviewing'}
                                </span>
                              ) : (
                                <BookOpen className="w-3.5 h-3.5 text-[var(--cpai-muted)] group-hover:text-[var(--cpai-primary)] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </section>
                )}

                {/* User Quick Tools Row (All user utilities consolidated cleanly) */}
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--cpai-text)]">
                    {isFa ? 'امکانات و ابزارهای فراگیر' : 'Learner Tools'}
                  </h3>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      isReviewOpen ? '2xl:grid-cols-4' : 'lg:grid-cols-4'
                    } gap-3`}
                  >
                    <button
                      type="button"
                      data-testid="dashboard-action-ai-tutor"
                      onClick={() => {
                        onClose();
                        onOpenAiTutor();
                      }}
                      className="p-4 rounded-xl bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] border border-[var(--cpai-border)] text-start transition-colors cursor-pointer space-y-2"
                    >
                      <Bot className="w-5 h-5 text-[var(--cpai-primary)]" />
                      <div>
                        <div className="text-sm font-bold text-[var(--cpai-text)]">
                          {isFa ? 'مربی هوشمند AI' : 'AI Tutor'}
                        </div>
                        <div className="text-xs text-[var(--cpai-muted)] mt-0.5">
                          {isFa ? `سهمیه فعال: ${quotaText}` : `Quota: ${quotaText}`}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      data-testid="dashboard-action-leaderboard"
                      onClick={() => {
                        onClose();
                        onOpenLeaderboard();
                      }}
                      className="p-4 rounded-xl bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] border border-[var(--cpai-border)] text-start transition-colors cursor-pointer space-y-2"
                    >
                      <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <div className="text-sm font-bold text-[var(--cpai-text)]">
                          {isFa ? 'جدول رتبه‌بندی کلاس' : 'Class Leaderboard'}
                        </div>
                        <div className="text-xs text-[var(--cpai-muted)] mt-0.5">
                          {isFa ? 'مقایسه پیشرفت هم‌دوره‌ای‌ها' : 'Peer cohort rankings'}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      data-testid="dashboard-action-markdown"
                      onClick={() => {
                        onClose();
                        onOpenMarkdownStudio();
                      }}
                      className="p-4 rounded-xl bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] border border-[var(--cpai-border)] text-start transition-colors cursor-pointer space-y-2"
                    >
                      <FileCode2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <div className="text-sm font-bold text-[var(--cpai-text)]">
                          {isFa ? 'استودیو مارک‌دان' : 'Markdown Studio'}
                        </div>
                        <div className="text-xs text-[var(--cpai-muted)] mt-0.5">
                          {isFa ? 'مرور، هایلایت و ویرایش فایل .md' : 'Edit & highlight .md files'}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      data-testid="dashboard-action-profile"
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="p-4 rounded-xl bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] border border-[var(--cpai-border)] text-start transition-colors cursor-pointer space-y-2"
                    >
                      <UserCheck className="w-5 h-5 text-[var(--cpai-success-text)]" />
                      <div>
                        <div className="text-sm font-bold text-[var(--cpai-text)]">
                          {isFa ? 'پروفایل و حساب کاربری' : 'Account & Profile'}
                        </div>
                        <div className="text-xs text-[var(--cpai-muted)] mt-0.5 truncate">
                          {currentUser?.email || (isFa ? 'مدیریت ورود و خروج' : 'Manage sign-in')}
                        </div>
                      </div>
                    </button>
                  </div>
                </section>

                {/* Community & Instructor Invite Badges (Rendered ONLY when admin has configured >= 1 link) */}
                {visibleCommunityBadges.length > 0 && (
                  <section
                    data-testid="dashboard-community-badges"
                    className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="text-sm font-bold text-[var(--cpai-text)] flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-[var(--cpai-primary)] shrink-0" />
                          <span>
                            {isFa
                              ? communityConfig.instructorName?.trim()
                                ? `همراهی با ${communityConfig.instructorName.trim()} و جامعه اوج`
                                : 'ارتباط با مدرس و شبکه‌های رسمی اوج'
                              : 'Connect with Instructor & OWJ Community'}
                          </span>
                        </h3>
                        {communityConfig.inviteMessage?.trim() && (
                          <p className="text-xs text-[var(--cpai-muted)] leading-relaxed">
                            {communityConfig.inviteMessage.trim()}
                          </p>
                        )}
                      </div>

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => setIsCommunityEditorOpen(true)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-[11px] font-semibold text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] cursor-pointer shrink-0"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{isFa ? 'ویرایش لینک‌ها' : 'Edit Links'}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {visibleCommunityBadges.map((badge) => {
                        const styleCls = getBadgeStyleClasses(badge);
                        return (
                          <a
                            key={badge.id}
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`community-badge-${badge.id}`}
                            className={`group inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-xs ${styleCls.pill}`}
                          >
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${styleCls.iconBox}`}
                            >
                              {renderBadgeIcon(badge)}
                            </span>
                            <span className="min-w-0 text-start">
                              <span className="block text-xs font-bold leading-snug whitespace-nowrap">
                                {isFa ? badge.labelFa : badge.labelEn}
                              </span>
                              {badge.subtextFa && (
                                <span className="block text-[10.5px] text-[var(--cpai-muted)] leading-tight whitespace-nowrap">
                                  {badge.subtextFa}
                                </span>
                              )}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[var(--cpai-muted)] group-hover:text-[var(--cpai-primary)] shrink-0 ms-0.5 transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  </section>
                )}
              </>
            )}

            {activeTab === 'skills' && (
              <section data-testid="dashboard-skills-panel" className="space-y-4">
                <div className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[var(--cpai-text)]">
                        {isFa ? 'آنچه انتظار می‌رود تا الان یاد گرفته باشید' : 'Expected Learning Outcomes'}
                      </h3>
                      <p className="text-xs text-[var(--cpai-muted)] mt-0.5">
                        {isFa
                          ? 'مهارت‌هایی که تسلط دارید را تیک بزنید؛ وضعیت شما روی همین دستگاه ذخیره می‌شود.'
                          : 'Check off skills you have mastered; progress is saved locally.'}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[var(--cpai-primary-strong)] tabular-nums shrink-0">
                      {isFa
                        ? `${selfCheckedCount.toLocaleString('fa-IR')} از ${totalOutcomes.toLocaleString('fa-IR')} (${selfCheckPct.toLocaleString('fa-IR')}٪)`
                        : `${selfCheckedCount}/${totalOutcomes} (${selfCheckPct}%)`}
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-[var(--cpai-surface-subtle)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--cpai-primary)] transition-all duration-300"
                      style={{ width: `${selfCheckPct}%` }}
                    />
                  </div>
                </div>

                {!learningSummary || learningSummary.reviewedModules.length === 0 ? (
                  <div className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-8 text-center space-y-2">
                    <GraduationCap className="w-8 h-8 text-[var(--cpai-muted)] mx-auto" />
                    <p className="text-sm font-semibold text-[var(--cpai-text)]">
                      {isFa ? 'هنوز مهارتی برای خودارزیابی فعال نشده است' : 'No expected skills recorded yet'}
                    </p>
                    <p className="text-xs text-[var(--cpai-muted)] max-w-md mx-auto">
                      {isFa
                        ? 'با مرور اولین ماژول‌ها توسط مدرس کلاس شما، چک‌لیست مهارت‌های کلیدی هر ماژول در این بخش فعال می‌شود.'
                        : 'Once your instructor marks modules as reviewed, your personal skill checklist will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {learningSummary.reviewedModules.map((mod) => (
                      <div
                        key={mod.id}
                        className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-4 sm:p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[var(--cpai-border)]">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              dir="ltr"
                              className="px-2 py-0.5 rounded-md bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary-strong)] font-mono text-xs font-bold tabular-nums shrink-0"
                            >
                              {mod.num}
                            </span>
                            <h4 className="text-sm font-bold text-[var(--cpai-text)] truncate">
                              {mod.titleFa}
                            </h4>
                          </div>
                          <button
                            type="button"
                            data-testid={`dashboard-skill-review-${mod.id}`}
                            onClick={() =>
                              setReviewModuleId((prev) => toggleReviewModuleSelection(prev, mod.id))
                            }
                            className="text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline cursor-pointer shrink-0"
                          >
                            {reviewModuleId === mod.id
                              ? isFa
                                ? 'بستن مرور'
                                : 'Close'
                              : isFa
                              ? 'مرور سریع ←'
                              : 'Quick Review →'}
                          </button>
                        </div>

                        <ul className="space-y-2">
                          {mod.expectedOutcomesFa.map((outcome, idx) => {
                            const key = `${mod.id}:${idx}`;
                            const isChecked = !!checkedOutcomeKeys[key];
                            return (
                              <li key={key}>
                                <button
                                  type="button"
                                  onClick={() => toggleOutcomeCheck(key)}
                                  aria-pressed={isChecked}
                                  className={`w-full p-2.5 rounded-xl border text-start transition-colors cursor-pointer flex items-start gap-2.5 ${
                                    isChecked
                                      ? 'bg-[var(--cpai-success-bg)]/60 border-[var(--cpai-primary)]/40 text-[var(--cpai-text)]'
                                      : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/50 text-[var(--cpai-text)]'
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                      isChecked
                                        ? 'bg-[var(--cpai-primary)] border-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                                        : 'bg-[var(--cpai-surface)] border-[var(--cpai-border)]'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3.5 h-3.5" />}
                                  </span>
                                  <span className="text-xs sm:text-sm leading-relaxed">{outcome}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'tools' && (
              <div data-testid="dashboard-tools-panel" className="space-y-5">
                {/* Domain Track Selector (All 4 tracks for Admin, 2-way for Learner) */}
                <section className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--cpai-text)]">
                        {isFa ? 'فضای یادگیری و مثال‌های دوره' : 'Learning Domain'}
                      </h3>
                      <p className="text-xs text-[var(--cpai-muted)] mt-0.5">
                        {isAdmin
                          ? isFa
                            ? 'دسترسی ادمین: انتخاب و تست هر ۴ حوزه تخصصی و شرکت‌های هلدینگ'
                            : 'Admin access: switch across all 4 specialized tracks & holdings'
                          : isFa
                          ? 'جابه‌جایی سریع بین حوزه تخصصی سازمان خود و کاربردهای خانه و خانواده'
                          : 'Switch between your organization domain and Home & Family'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenTrackModal();
                      }}
                      className="text-xs font-semibold text-[var(--cpai-primary-strong)] hover:underline cursor-pointer shrink-0"
                    >
                      {isFa ? 'جزئیات کامل' : 'Details'}
                    </button>
                  </div>

                  {isAdmin ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ALL_INDUSTRY_TRACKS.map((trackId) => {
                        const isSelected = industryTrack === trackId;
                        const info = INDUSTRY_TRACKS[trackId];
                        const TrackIcon =
                          trackId === 'GENERAL_EVERYDAY'
                            ? Home
                            : trackId === 'PAYA_SAMAN_PARS'
                            ? Landmark
                            : trackId === 'ENERGY_PETRO'
                            ? Factory
                            : Building2;
                        return (
                          <button
                            key={trackId}
                            type="button"
                            data-testid={`dashboard-admin-track-${trackId}`}
                            onClick={() => onSelectTrack(trackId)}
                            className={`p-3.5 rounded-xl border text-start transition-colors cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)] ring-1 ring-[var(--cpai-primary)]'
                                : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 text-[var(--cpai-text)]'
                            }`}
                          >
                            <TrackIcon className="w-5 h-5 shrink-0 text-[var(--cpai-primary)]" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold truncate">
                                {ORG_TRACK_SHORT_LABELS[trackId] || info?.shortTitleFa}
                              </div>
                              <div className="text-[11px] text-[var(--cpai-muted)] truncate">
                                {info?.taglineFa}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectTrack(orgTrackId)}
                        className={`p-3.5 rounded-xl border text-start transition-colors cursor-pointer flex items-center gap-3 ${
                          industryTrack !== 'GENERAL_EVERYDAY'
                            ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)]'
                            : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 text-[var(--cpai-text)]'
                        }`}
                      >
                        <OrgIcon className="w-5 h-5 shrink-0 text-[var(--cpai-primary)]" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">
                            {ORG_TRACK_SHORT_LABELS[orgTrackId] || INDUSTRY_TRACKS[orgTrackId]?.shortTitleFa}
                          </div>
                          <div className="text-[11px] text-[var(--cpai-muted)] truncate">
                            {isFa ? 'حوزه تخصصی سازمان شما' : 'Your organization track'}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectTrack('GENERAL_EVERYDAY')}
                        className={`p-3.5 rounded-xl border text-start transition-colors cursor-pointer flex items-center gap-3 ${
                          industryTrack === 'GENERAL_EVERYDAY'
                            ? 'bg-[var(--cpai-primary-soft)] border-[var(--cpai-primary)] text-[var(--cpai-primary-strong)]'
                            : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 text-[var(--cpai-text)]'
                        }`}
                      >
                        <Home className="w-5 h-5 shrink-0 text-[var(--cpai-primary)]" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">
                            {isFa ? 'خانه و خانواده' : 'Home & Family'}
                          </div>
                          <div className="text-[11px] text-[var(--cpai-muted)] truncate">
                            {isFa ? 'روزمره، خانواده و سبک زندگی' : 'Everyday & family workflows'}
                          </div>
                        </div>
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenDisciplineModal();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-text)] cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[var(--cpai-primary)]" />
                      <span>
                        {isFa
                          ? `دیسیپلین فعال: ${activeDisciplineMeta.shortTitleFa} (تغییر)`
                          : `Discipline: ${activeDisciplineMeta.shortTitleEn} (Change)`}
                      </span>
                    </button>

                    {isAdmin && onOpenAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAdmin();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15 text-xs font-semibold text-purple-700 dark:text-purple-300 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isFa ? 'مرکز فرماندهی مدیریت دوره' : 'Admin Control Center'}</span>
                      </button>
                    )}
                  </div>
                </section>

                {/* Preferences & Cloud Sync */}
                <section className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-3">
                  <h3 className="text-sm font-bold text-[var(--cpai-text)]">
                    {isFa ? 'نمایش و همگام‌سازی' : 'Display & Sync'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={onToggleTheme}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-text)] cursor-pointer"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      <span>
                        {theme === 'dark'
                          ? isFa
                            ? 'تغییر به حالت روشن'
                            : 'Switch to Light Mode'
                          : isFa
                          ? 'تغییر به حالت تاریک'
                          : 'Switch to Dark Mode'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={onToggleLang}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-text)] cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{isFa ? 'تغییر زبان به English' : 'تغییر زبان به فارسی'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onSyncToCloud}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] hover:border-[var(--cpai-primary)] text-xs font-semibold text-[var(--cpai-primary-strong)] disabled:opacity-50 cursor-pointer"
                    >
                      <Cloud className="w-4 h-4" />
                      <span>
                        {isSyncing
                          ? isFa
                            ? 'در حال همگام‌سازی ابری...'
                            : 'Syncing...'
                          : cloudStatus === 'synced'
                          ? isFa
                            ? 'همگام‌سازی ابری انجام شد'
                            : 'Synced to Cloud'
                          : isFa
                          ? 'ذخیره در پایگاه داده ابری'
                          : 'Save to Cloud'}
                      </span>
                    </button>
                  </div>
                </section>

                {/* Privacy-Preserving Exact Organization Lookup */}
                <section className="rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] p-5 space-y-3">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[var(--cpai-text)] flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-[var(--cpai-primary)]" />
                      <span>{isFa ? 'جستجوی محرمانه با نام دقیق موسسه یا پروژه' : 'Private Organization Lookup'}</span>
                    </h3>
                    <p className="text-xs text-[var(--cpai-muted)]">
                      {isFa
                        ? 'اگر نقشه راه کلاس شما به‌صورت خودکار نمایش داده نشده، نام دقیق سازمان یا پروژه خود را وارد کنید.'
                        : 'Enter your exact organization or project name to load your cohort schedule.'}
                    </p>
                  </div>

                  <form onSubmit={handlePrivateSearch} className="flex items-center gap-2">
                    <input
                      type="text"
                      data-testid="dashboard-cohort-lookup-input"
                      aria-label={isFa ? 'نام دقیق موسسه، شرکت یا پروژه شما' : 'Exact organization or project name'}
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (searchStatus !== 'idle') setSearchStatus('idle');
                      }}
                      placeholder={
                        isFa
                          ? 'نام دقیق موسسه، شرکت یا پروژه خود را بنویسید...'
                          : 'Enter exact organization or project name...'
                      }
                      className="flex-1 min-w-0 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-bg)] text-[var(--cpai-text)] placeholder:text-[var(--cpai-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--cpai-primary)]/40 focus:border-[var(--cpai-primary)]"
                    />
                    <button
                      type="submit"
                      disabled={isSearching || !query.trim()}
                      className="px-4 py-2 rounded-xl bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] disabled:opacity-50 text-white dark:text-[#0F171A] text-xs font-semibold cursor-pointer shrink-0"
                    >
                      {isSearching ? '...' : isFa ? 'جستجو' : 'Search'}
                    </button>
                  </form>

                  {(searchStatus === 'too_short' || searchStatus === 'ambiguous' || searchStatus === 'not_found') && (
                    <p className="text-xs text-[var(--cpai-muted)]">
                      {searchStatus === 'not_found'
                        ? isFa
                          ? 'کلاسی با این نام دقیق پیدا نشد. لطفاً عنوان کامل موسسه یا پروژه خود را بررسی کنید.'
                          : 'No exact class matched that name.'
                        : isFa
                        ? 'لطفاً نام دقیق‌تر و کامل‌تری وارد کنید تا تنها کلاس اختصاصی شما نمایش داده شود.'
                        : 'Please enter a more specific organization name.'}
                    </p>
                  )}
                </section>
              </div>
            )}
          </div>

          {/* Optional Split-View Quick Review Side Panel (Keeps Dashboard Open) */}
          {reviewPayload && (
            <ModuleQuickReviewPanel
              payload={reviewPayload}
              lang={lang}
              checkedOutcomeKeys={checkedOutcomeKeys}
              onToggleOutcome={toggleOutcomeCheck}
              onSelectSibling={(nextId) => setReviewModuleId(nextId)}
              onOpenFullLesson={handleJumpToModule}
              onClose={() => setReviewModuleId(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
