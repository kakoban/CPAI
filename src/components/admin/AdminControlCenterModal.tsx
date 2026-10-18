import React, { useState, useEffect } from 'react';
import { Language } from '../../types/cpmai';
import { UserProfile } from '../../types/auth';
import {
  UserRegistryItem,
  ClassEntity,
  PlacementMatrixData,
  SessionLockEntity,
  AlignmentIndex
} from '../../types/lms';
import { lmsApi, AdminOverviewResponse } from '../../services/lmsApi';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../../data/logo';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Grid3X3,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  X,
  Layers,
  Sparkles,
  BarChart2,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  Check
} from 'lucide-react';

interface AdminControlCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  lang: Language;
}

export const AdminControlCenterModal: React.FC<AdminControlCenterModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'matrix' | 'drip'>('users');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [overview, setOverview] = useState<AdminOverviewResponse | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>('ALL');

  // Filters for User Registry
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [alignmentFilter, setAlignmentFilter] = useState<string>('ALL');

  // Matrix interactive drilldown state
  const [selectedCell, setSelectedCell] = useState<{
    tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    band: 'Low' | 'Proficient' | 'Mastery';
  } | null>(null);

  // Status message for actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async (classId?: string) => {
    setIsLoading(true);
    try {
      const targetQuery = classId && classId !== 'ALL' ? classId : undefined;
      const data = await lmsApi.fetchAdminOverview(targetQuery);
      if (data) {
        setOverview(data);
      }
    } catch (err) {
      console.error('Error loading admin overview:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData(selectedClassId);
    }
  }, [isOpen, selectedClassId]);

  useEffect(() => {
    setSelectedCell(null);
  }, [selectedClassId]);

  if (!isOpen) return null;

  const currentClass = selectedClassId !== 'ALL'
    ? (overview?.classes.find((c) => c.id === selectedClassId) || null)
    : (overview?.classes[0] || null);

  // User Registry Filtered List
  const filteredUsers = (overview?.users || []).filter((u) => {
    const matchesClass = selectedClassId === 'ALL' || !selectedClassId || u.classId === selectedClassId;
    const matchesSearch =
      !searchQuery ||
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(searchQuery)) ||
      (u.specialty && u.specialty.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTier =
      tierFilter === 'ALL' ||
      (u.initialAiLevel || '').toUpperCase() === tierFilter.toUpperCase() ||
      (u.assessmentResult?.testedTier || '').toUpperCase() === tierFilter.toUpperCase();

    const matchesAlignment =
      alignmentFilter === 'ALL' ||
      (alignmentFilter === 'NONE' && !u.assessmentResult) ||
      (u.assessmentResult?.alignmentIndex === alignmentFilter);

    return matchesClass && matchesSearch && matchesTier && matchesAlignment;
  });

  // Toggle Leaderboard Visibility
  const handleToggleLeaderboard = async () => {
    if (!currentClass) return;
    const newStatus = !currentClass.isLeaderboardVisible;
    const success = await lmsApi.toggleLeaderboardVisibility(currentClass.id, newStatus);
    if (success) {
      showToast(newStatus ? 'جدول رتبه‌بندی برای دانشجویان این کلاس منتشر شد.' : 'جدول رتبه‌بندی برای دانشجویان مخفی شد.');
      loadData(selectedClassId);
    }
  };

  // Toggle Single Session Lock
  const handleToggleSession = async (sessionNum: number, currentUnlocked: boolean) => {
    if (!currentClass) return;
    const success = await lmsApi.toggleSessionLock(currentClass.id, sessionNum, !currentUnlocked);
    if (success) {
      showToast(`وضعیت جلسه ${sessionNum} تغییر یافت.`);
      loadData(selectedClassId);
    }
  };

  // Unlock All / Reset Drip
  const handleBatchSessions = async (unlockAll: boolean) => {
    if (!currentClass) return;
    const success = await lmsApi.unlockAllSessions(currentClass.id, unlockAll);
    if (success) {
      showToast(unlockAll ? 'کلیه جلسات باز شدند.' : 'جلسات ۲ تا ۲۱ قفل و به حالت قطره‌ای پیش‌فرض بازگشتند.');
      loadData(selectedClassId);
    }
  };

  // Export User Registry to CSV
  const handleExportCSV = () => {
    if (!overview?.users) return;
    const headers = [
      'شناسه کاربری',
      'نام و نام خانوادگی',
      'ایمیل',
      'تلفن همراه',
      'رشته و تخصص',
      'کد کلاس',
      'سطح انتخابی اولیه',
      'سطح آزموده شده',
      'نمره خام',
      'درصد کسب شده',
      'شاخص تطابق سطح',
      'تاریخ ثبت‌نام'
    ];

    const rows = filteredUsers.map((u) => [
      `"${u.id}"`,
      `"${u.fullName}"`,
      `"${u.email}"`,
      `"${u.phone || ''}"`,
      `"${u.specialty || ''}"`,
      `"${u.classCode || ''}"`,
      `"${u.initialAiLevel || ''}"`,
      `"${u.assessmentResult?.testedTier || ''}"`,
      `"${u.assessmentResult?.rawScore ?? ''}"`,
      `"${u.assessmentResult?.percentage ?? ''}%"`,
      `"${u.assessmentResult?.alignmentIndex || 'شرکت نکرده'}"`,
      `"${new Date(u.createdAt).toLocaleDateString('fa-IR')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CPMAI_Users_Registry_${selectedClassId || 'All'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('فایل اکسل/CSV با موفقیت دانلود شد.');
  };

  // Dynamic 2D Matrix computed for the selected cohort (or ALL cohorts)
  const cohortUsers = (overview?.users || []).filter(
    (u) => selectedClassId === 'ALL' || !selectedClassId || u.classId === selectedClassId
  );

  const computedMatrix = React.useMemo(() => {
    const mat: Record<
      'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
      Record<'Low' | 'Proficient' | 'Mastery', { count: number; percentage: number; students: { id: string; fullName: string; score: number }[] }>
    > = {
      BEGINNER: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      },
      INTERMEDIATE: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      },
      ADVANCED: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      }
    };

    let totalAssessed = 0;
    let matchedCount = 0;
    let dunningKrugerCount = 0;
    let highPotentialCount = 0;

    cohortUsers.forEach((u) => {
      if (u.assessmentResult) {
        totalAssessed++;
        const rawTier = (u.initialAiLevel || 'BEGINNER').toUpperCase();
        const tier = (['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(rawTier) ? rawTier : 'BEGINNER') as
          | 'BEGINNER'
          | 'INTERMEDIATE'
          | 'ADVANCED';
        const pct = u.assessmentResult.percentage;
        const band: 'Low' | 'Proficient' | 'Mastery' = pct < 50 ? 'Low' : pct < 80 ? 'Proficient' : 'Mastery';

        mat[tier][band].count++;
        mat[tier][band].students.push({
          id: u.id,
          fullName: u.fullName,
          score: pct
        });

        if (u.assessmentResult.alignmentIndex === 'Below Tier') dunningKrugerCount++;
        else if (u.assessmentResult.alignmentIndex === 'Above Tier') highPotentialCount++;
        else matchedCount++;
      }
    });

    (['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).forEach((tier) => {
      (['Low', 'Proficient', 'Mastery'] as const).forEach((band) => {
        mat[tier][band].percentage = totalAssessed > 0 ? Math.round((mat[tier][band].count / totalAssessed) * 100) : 0;
      });
    });

    return {
      matrix: mat,
      totalAssessed,
      matchedCount,
      dunningKrugerCount,
      highPotentialCount
    };
  }, [cohortUsers]);

  const matrix = computedMatrix.matrix;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Double Bezel Container */}
      <div className="relative w-full max-w-6xl my-auto p-1.5 rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-8 space-y-6 text-right">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-600/20 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    مرکز فرماندهی مدیریت آموزش (Admin Control Center)
                  </h3>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                    دسترسی مدیر ارشد
                  </span>
                </div>
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  پایش پیشرفت دانشجویان، ماتریس تطابق سطح و مدیریت محتوای قطره‌ای (Curriculum Drip)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => loadData(selectedClassId)}
                title="تازه‌سازی داده‌ها"
                className="p-2 rounded-xl text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Cohort Class Selector Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                انتخاب کلاس آموزشی (Cohort):
              </span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] font-mono font-bold cursor-pointer"
              >
                <option value="ALL">کلیه کلاس‌ها (All Cohorts)</option>
                {overview?.classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.code} — {cls.title} ({cls.studentCount} دانشجو)
                  </option>
                ))}
              </select>
            </div>

            {selectedClassId !== 'ALL' && currentClass ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#5d6b73]">
                  وضعیت رتبه‌بندی ({currentClass.code}):
                </span>
                <button
                  onClick={handleToggleLeaderboard}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    currentClass.isLeaderboardVisible
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  }`}
                >
                  {currentClass.isLeaderboardVisible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>منتشر شده (قابل مشاهده برای دانشجو)</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>مخفی (در انتظار انتشار)</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <span>نمای تجمیعی:</span>
                <span className="font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">
                  {overview?.classes.length || 0} کلاس آموزشی
                </span>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08]">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>۱. ثبت‌نامی‌ها و پرونده دانشجویان (User Registry)</span>
              <span className="px-2 py-0.2 text-[10px] rounded-full bg-blue-500/10 text-blue-600 font-mono">
                {filteredUsers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>۲. ماتریس ۲بعدی تعیین سطح (Placement Matrix)</span>
              <span className="px-2 py-0.2 text-[10px] rounded-full bg-purple-500/10 text-purple-600 font-mono">
                3×3
              </span>
            </button>

            <button
              onClick={() => setActiveTab('drip')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                activeTab === 'drip'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>۳. مدیریت دسترسی و زمان‌بندی قطره‌ای (Curriculum Drip)</span>
              <span className="px-2 py-0.2 text-[10px] rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                ۲۲ جلسه
              </span>
            </button>
          </div>

          {/* TAB 1: User Registry Table */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجوی نام، تلفن، ایمیل، تخصص..."
                      className="w-full pr-9 pl-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  {/* Tier Filter */}
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer"
                  >
                    <option value="ALL">کلیه سطوح</option>
                    <option value="BEGINNER">مقدماتی (Beginner)</option>
                    <option value="INTERMEDIATE">متوسط (Intermediate)</option>
                    <option value="ADVANCED">پیشرفته (Advanced)</option>
                  </select>

                  {/* Alignment Filter */}
                  <select
                    value={alignmentFilter}
                    onChange={(e) => setAlignmentFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer"
                  >
                    <option value="ALL">کلیه وضعیت‌های انطباق</option>
                    <option value="Matches">انطباق کامل (Matches)</option>
                    <option value="Below Tier">شکاف مهارتی (Below Tier)</option>
                    <option value="Above Tier">فراتر از سطح (Above Tier)</option>
                    <option value="NONE">بدون آزمون</option>
                  </select>
                </div>

                {/* Export CSV Button */}
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer self-end sm:self-auto shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>خروجی اکسل / CSV</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] font-bold">
                      <tr>
                        <th className="py-3 px-4">مشخصات دانشجو</th>
                        <th className="py-3 px-4">اطلاعات تماس</th>
                        <th className="py-3 px-4">کلاس دوره</th>
                        <th className="py-3 px-4">سطح ادعایی اولیه</th>
                        <th className="py-3 px-4 text-center">نمره ارزیابی</th>
                        <th className="py-3 px-4 text-center">شاخص انطباق</th>
                        <th className="py-3 px-4 text-center">تاریخ ثبت‌نام</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#5d6b73]">
                            هیچ کاربری با فیلترهای انتخابی یافت نشد.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                                  <span>{user.fullName}</span>
                                  {user.role === 'admin' && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500 text-white">
                                      Admin
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                                  {user.specialty || 'تخصص نامشخص'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-0.5 text-[11px] font-mono">
                                <div className="flex items-center gap-1 text-[#1c2830] dark:text-[#e8ebe9]">
                                  <Mail className="w-3 h-3 text-[#5d6b73]" />
                                  <span>{user.email}</span>
                                </div>
                                {user.phone && (
                                  <div className="flex items-center gap-1 text-[#5d6b73] dark:text-[#9aa8b0]">
                                    <Phone className="w-3 h-3" />
                                    <span>{user.phone}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                              {user.classCode || 'پیش‌فرض'}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/5 dark:bg-white/10 text-[#1c2830] dark:text-[#e8ebe9]">
                                {user.initialAiLevel || 'BEGINNER'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {user.assessmentResult ? (
                                <div className="font-mono">
                                  <span className="font-black text-xs text-[#2563EB] dark:text-blue-400">
                                    {user.assessmentResult.percentage}%
                                  </span>
                                  <span className="text-[10px] text-[#5d6b73] mr-1">
                                    ({user.assessmentResult.rawScore} نمره)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[11px] text-[#5d6b73] italic">
                                  در انتظار آزمون
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {user.assessmentResult ? (
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                    user.assessmentResult.alignmentIndex === 'Matches'
                                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                      : user.assessmentResult.alignmentIndex === 'Above Tier'
                                      ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                                  }`}
                                >
                                  {user.assessmentResult.alignmentIndex === 'Matches'
                                    ? '✓ انطباق'
                                    : user.assessmentResult.alignmentIndex === 'Above Tier'
                                    ? '🚀 فراتر'
                                    : '⚠️ نیاز به بازآموزی'}
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#5d6b73]">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-mono text-[11px] text-[#5d6b73]">
                              {new Date(user.createdAt).toLocaleDateString('fa-IR')}
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

          {/* TAB 2: 2D Placement Matrix */}
          {activeTab === 'matrix' && matrix && (
            <div className="space-y-6">
              {/* Summary Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                  <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>کل دانشجویان ارزیابی‌شده:</span>
                  </span>
                  <div className="text-2xl font-black font-mono text-[#1c2830] dark:text-[#e8ebe9]">
                    {computedMatrix.totalAssessed} نفر
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>انطباق کامل (Matches):</span>
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                    {computedMatrix.matchedCount} نفر
                  </div>
                  <span className="text-[10px] text-emerald-600/80">
                    شناخت واقع‌بینانه از سطح مهارت خود
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>خطای دانینگ-کروگر (Below Tier):</span>
                  </span>
                  <div className="text-2xl font-black font-mono text-amber-700 dark:text-amber-300">
                    {computedMatrix.dunningKrugerCount} نفر
                  </div>
                  <span className="text-[10px] text-amber-600/80">
                    بیش‌برآورد اولیه و نیاز به تقویت پایه
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                  <span className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>استعداد برتر (Above Tier):</span>
                  </span>
                  <div className="text-2xl font-black font-mono text-blue-700 dark:text-blue-300">
                    {computedMatrix.highPotentialCount} نفر
                  </div>
                  <span className="text-[10px] text-blue-600/80">
                    تسلط فراتر از سطح انتخابی اولیه
                  </span>
                </div>
              </div>

              {/* 2D Matrix Grid */}
              <div className="p-5 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4 text-[#2563EB]" />
                    <span>ماتریس تحلیلی ۲ بعدی: سطح خوداظهاری (محور Y) × عملکرد اندازه‌گیری‌شده آزمون (محور X)</span>
                  </h4>
                  <span className="text-[11px] text-[#5d6b73]">
                    جهت مشاهده اسامی دانشجویان، روی هر خانه کلیک کنید
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs border-collapse">
                    <thead>
                      <tr>
                        <th className="p-3 text-right bg-black/[0.04] dark:bg-white/[0.06] rounded-tr-xl font-bold w-48 text-[#5d6b73]">
                          سطح خوداظهاری اولیه \ عملکرد
                        </th>
                        <th className="p-3 font-black text-rose-700 dark:text-rose-400 bg-rose-500/10 border border-black/[0.04]">
                          ضعیف (Low)
                          <div className="text-[10px] font-normal text-[#5d6b73]">زیر ۵۰٪</div>
                        </th>
                        <th className="p-3 font-black text-blue-700 dark:text-blue-400 bg-blue-500/10 border border-black/[0.04]">
                          مسلط و شایسته (Proficient)
                          <div className="text-[10px] font-normal text-[#5d6b73]">۵۰ تا ۷۹٪</div>
                        </th>
                        <th className="p-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 rounded-tl-xl border border-black/[0.04]">
                          تسلط عالی (Mastery)
                          <div className="text-[10px] font-normal text-[#5d6b73]">۸۰٪ و بالاتر</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                      {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((tier) => (
                        <tr key={tier}>
                          <td className="p-3 text-right font-black bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04]">
                            {tier === 'BEGINNER'
                              ? 'سطح ۱: مقدماتی (Beginner)'
                              : tier === 'INTERMEDIATE'
                              ? 'سطح ۲: متوسط (Intermediate)'
                              : 'سطح ۳: پیشرفته (Advanced)'}
                          </td>
                          {(['Low', 'Proficient', 'Mastery'] as const).map((band) => {
                            const cell = matrix[tier][band];
                            const isSelected = selectedCell?.tier === tier && selectedCell?.band === band;
                            return (
                              <td
                                key={band}
                                onClick={() => setSelectedCell({ tier, band })}
                                className={`p-4 border border-black/[0.06] dark:border-white/[0.08] cursor-pointer transition-all ${
                                  isSelected
                                    ? 'ring-2 ring-[#2563EB] bg-blue-500/20'
                                    : cell.count > 0
                                    ? 'hover:bg-black/5 dark:hover:bg-white/5 bg-black/[0.01]'
                                    : 'text-[#5d6b73]/40'
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="text-xl font-black font-mono text-[#1c2830] dark:text-[#e8ebe9]">
                                    {cell.count} نفر
                                  </div>
                                  <div className="text-[11px] font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                                    {cell.percentage}% از کل
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Selected Cell Drilldown */}
                {selectedCell && (
                  <div className="p-4 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                        <span className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                          دانشجویان خانه انتخابی ({selectedCell.tier} × {selectedCell.band}):
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500 text-white">
                          {matrix[selectedCell.tier][selectedCell.band].students.length} نفر
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedCell(null)}
                        className="text-xs text-[#5d6b73] hover:text-[#1c2830] cursor-pointer"
                      >
                        بستن جزئیات
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {matrix[selectedCell.tier][selectedCell.band].students.map((s) => (
                        <div
                          key={s.id}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#12181d] border border-black/[0.08] dark:border-white/[0.1] text-xs flex items-center gap-2 shadow-2xs"
                        >
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                            {s.fullName}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                            {s.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Curriculum Drip Content & Session Locks */}
          {activeTab === 'drip' && (
            <div className="space-y-5">
              {selectedClassId === 'ALL' && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>
                      توجه: قفل و دسترسی جلسات بر اساس هر کلاس به‌طور مستقل ذخیره می‌شود. هم‌اکنون تنظیمات کلاس ({currentClass?.code || 'پیش‌فرض'}) نمایش داده شده است. جهت کنترل دسترسی یک دوره خاص، ابتدا کلاس مورد نظر را از منوی بالا انتخاب فرمایید.
                    </span>
                  </div>
                </div>
              )}

              {/* Batch Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    کنترل گروهی دسترسی جلسات برای کلاس: {currentClass?.code || 'انتخاب نشده'}
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    به‌طور پیش‌فرض، جلسات ۰ و ۱ برای دانشجو باز است و جلسات ۲ تا ۲۱ قفل می‌باشند.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handleBatchSessions(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>باز کردن تمام جلسات (Unlock All)</span>
                  </button>

                  <button
                    onClick={() => handleBatchSessions(false)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>بازنشانی به حالت قطره‌ای (Reset Drip)</span>
                  </button>
                </div>
              </div>

              {/* Sessions List */}
              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] font-bold">
                      <tr>
                        <th className="py-3 px-4 text-center w-20">شماره</th>
                        <th className="py-3 px-4">عنوان جلسه / ماژول آموزشی</th>
                        <th className="py-3 px-4 text-center">وضعیت دسترسی دانشجو</th>
                        <th className="py-3 px-4 text-center w-36">کلید تغییر وضعیت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                      {(overview?.sessionLocks || []).map((session) => (
                        <tr
                          key={session.id}
                          className={`hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors ${
                            session.isUnlocked ? '' : 'opacity-85'
                          }`}
                        >
                          <td className="py-3 px-4 text-center font-mono font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                            جلسه {session.sessionNum}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                              {session.title}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {session.isUnlocked ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                                <Unlock className="w-3 h-3 text-emerald-600" />
                                <span>باز و در دسترس</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                                <Lock className="w-3 h-3 text-rose-600" />
                                <span>قفل قطره‌ای</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleSession(session.sessionNum, session.isUnlocked)}
                              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                session.isUnlocked
                                  ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/25'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                              }`}
                            >
                              {session.isUnlocked ? 'قفل کردن 🔒' : 'باز کردن 🔓'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[11px] text-[#5d6b73]">
              سیستم مدیریت یکپارچه کلاس‌های دوره CPMAI مشاوران مدیریت اوج
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-bold transition-all cursor-pointer"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
