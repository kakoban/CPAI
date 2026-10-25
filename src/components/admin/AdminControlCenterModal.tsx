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
import { lmsApi, AdminOverviewResponse, getDefaultAdminOverview } from '../../services/lmsApi';
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
  Check,
  Edit2,
  FolderKanban,
  Building,
  Briefcase
} from 'lucide-react';
import { DISCIPLINE_REGISTRY } from '../../data/disciplineExamplesRegistry';

export function parseTimeSlotInfo(code: string): { isSlot: boolean; labelFa: string; labelEn: string; dateStr: string } {
  const match = code.match(/^(\d{4})(\d{2})(\d{2})_SLOT(\d+)$/i);
  if (!match) {
    return { isSlot: false, labelFa: code, labelEn: code, dateStr: '' };
  }
  const [, yyyy, mm, dd, slotStr] = match;
  const slotNum = parseInt(slotStr, 10);
  const startHour = slotNum * 2;
  const endHour = (startHour + 2) % 24;

  const startPad = String(startHour).padStart(2, '0') + ':00';
  const endPad = String(endHour).padStart(2, '0') + ':00';
  const dateFormatted = `${yyyy}/${mm}/${dd}`;

  return {
    isSlot: true,
    labelFa: `نوبت خودکار ۲ ساعته (${startPad} الی ${endPad}) · تاریخ ${dateFormatted}`,
    labelEn: `2-Hour Window (${startPad}–${endPad}) · ${dateFormatted}`,
    dateStr: dateFormatted
  };
}

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
  const [activeTab, setActiveTab] = useState<'users' | 'matrix' | 'drip' | 'cohorts'>('users');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [overview, setOverview] = useState<AdminOverviewResponse>(() => getDefaultAdminOverview(currentUser));
  const [selectedClassId, setSelectedClassId] = useState<string>('ALL');

  // Filters for User Registry
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [alignmentFilter, setAlignmentFilter] = useState<string>('ALL');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('ALL');
  const [trackFilter, setTrackFilter] = useState<string>('ALL');

  // Cohort Class Editing State
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState<string>('');
  const [editOrgInput, setEditOrgInput] = useState<string>('');

  // New Class Creation State
  const [isCreatingNewClass, setIsCreatingNewClass] = useState<boolean>(false);
  const [newClassCode, setNewClassCode] = useState<string>('');
  const [newClassTitle, setNewClassTitle] = useState<string>('');
  const [newClassOrg, setNewClassOrg] = useState<string>('');

  // Matrix interactive drilldown state
  const [selectedCell, setSelectedCell] = useState<{
    tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    band: 'Low' | 'Proficient' | 'Mastery';
  } | null>(null);

  // Status message for actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  const defaultClass: ClassEntity = {
    id: 'cls_master',
    code: 'CPMAI-2026',
    title: 'کلاس دوره تخصصی CPMAI',
    isLeaderboardVisible: true,
    studentCount: overview?.users?.length || 1,
    createdAt: new Date().toISOString()
  };

  const currentClass: ClassEntity = (selectedClassId !== 'ALL'
    ? overview.classes.find((c) => c.id === selectedClassId)
    : overview.classes[0]) || defaultClass;

  // Raw user list with guaranteed at least current user if empty
  const rawUsers = overview.users && overview.users.length > 0
    ? overview.users
    : (currentUser ? [{
        id: currentUser.id || 'usr_fakouri',
        email: currentUser.email || 'kafa.1368@gmail.com',
        fullName: currentUser.displayName || 'مهندس فکوری زاد (مدیر ارشد سامانه)',
        phone: currentUser.phone || '09120000000',
        specialty: currentUser.specialty || 'مدیریت ارشد پروژه و هوش مصنوعی',
        role: 'admin' as const,
        classId: 'cls_master',
        classCode: 'CPMAI-2026',
        initialAiLevel: 'ADVANCED',
        isOnboarded: true,
        createdAt: currentUser.createdAt || new Date().toISOString(),
        assessmentResult: {
          testedTier: 'ADVANCED',
          rawScore: 100,
          percentage: 100,
          alignmentIndex: 'Matches' as const,
          completedAt: new Date().toISOString()
        }
      }] : []);

  // User Registry Filtered List
  const filteredUsers = rawUsers.filter((u) => {
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

    const matchesDiscipline =
      disciplineFilter === 'ALL' ||
      u.disciplineId === disciplineFilter ||
      (u.specialty && u.specialty.includes(disciplineFilter));

    const matchesTrack =
      trackFilter === 'ALL' ||
      u.trackId === trackFilter;

    return matchesClass && matchesSearch && matchesTier && matchesAlignment && matchesDiscipline && matchesTrack;
  });

  // Start Editing Class Title / Org
  const handleStartEditClass = (cls: ClassEntity) => {
    setEditingClassId(cls.id);
    setEditTitleInput(cls.title || '');
    setEditOrgInput(cls.organization || '');
  };

  // Save Class Title / Org
  const handleSaveClassInfo = async (classId: string) => {
    if (!editTitleInput.trim()) {
      showToast('عنوان کلاس نمی‌تواند خالی باشد.');
      return;
    }

    const updatedTitle = editTitleInput.trim();
    const updatedOrg = editOrgInput.trim();

    // Optimistic UI Update
    setOverview((prev) => ({
      ...prev,
      classes: prev.classes.map((c) =>
        c.id === classId ? { ...c, title: updatedTitle, organization: updatedOrg } : c
      )
    }));

    setEditingClassId(null);
    showToast(`نام کلاس به «${updatedTitle}» تغییر یافت.`);
    await lmsApi.updateClassInfo(classId, updatedTitle, updatedOrg);
  };

  // Create New Manual Cohort Class
  const handleCreateNewClass = async () => {
    if (!newClassCode.trim()) {
      showToast('لطفاً کد کلاس را وارد نمایید (مانند METRO-LINE10).');
      return;
    }

    const code = newClassCode.trim().toUpperCase();
    const title = newClassTitle.trim() || `کلاس دوره CPMAI (${code})`;
    const org = newClassOrg.trim() || 'کارگاه سازمانی CPMAI';

    const created = await lmsApi.createCustomClass(code, title, org);
    if (created) {
      setOverview((prev) => ({
        ...prev,
        classes: [created, ...prev.classes]
      }));
      setNewClassCode('');
      setNewClassTitle('');
      setNewClassOrg('');
      setIsCreatingNewClass(false);
      showToast(`کلاس «${title}» با کد ${code} با موفقیت ایجاد شد.`);
    }
  };

  // Toggle Leaderboard Visibility with Optimistic UI
  const handleToggleLeaderboard = async () => {
    const targetClassId = currentClass.id;
    const newStatus = !currentClass.isLeaderboardVisible;

    // Optimistic update
    setOverview((prev) => ({
      ...prev,
      classes: prev.classes.map((c) =>
        c.id === targetClassId ? { ...c, isLeaderboardVisible: newStatus } : c
      )
    }));

    showToast(newStatus ? 'جدول رتبه‌بندی برای دانشجویان این کلاس منتشر شد.' : 'جدول رتبه‌بندی برای دانشجویان مخفی شد.');
    await lmsApi.toggleLeaderboardVisibility(targetClassId, newStatus);
  };

  // Toggle Single Session Lock with Optimistic UI
  const handleToggleSession = async (sessionNum: number, currentUnlocked: boolean) => {
    const targetClassId = currentClass.id;
    const nextUnlocked = !currentUnlocked;

    // Optimistic update
    setOverview((prev) => ({
      ...prev,
      sessionLocks: prev.sessionLocks.map((s) =>
        s.sessionNum === sessionNum ? { ...s, isUnlocked: nextUnlocked } : s
      )
    }));

    showToast(`وضعیت جلسه ${sessionNum} تغییر یافت به: ${nextUnlocked ? 'باز و در دسترس 🔓' : 'قفل قطره‌ای 🔒'}`);
    await lmsApi.toggleSessionLock(targetClassId, sessionNum, nextUnlocked);
  };

  // Unlock All / Reset Drip with Optimistic UI
  const handleBatchSessions = async (unlockAll: boolean) => {
    const targetClassId = currentClass.id;

    // Optimistic update
    setOverview((prev) => ({
      ...prev,
      sessionLocks: prev.sessionLocks.map((s) => ({
        ...s,
        isUnlocked: unlockAll ? true : (s.sessionNum <= 1)
      }))
    }));

    showToast(unlockAll ? 'کلیه جلسات باز شدند 🔓' : 'جلسات ۲ تا ۲۱ قفل و به حالت قطره‌ای پیش‌فرض بازگشتند 🔒');
    await lmsApi.unlockAllSessions(targetClassId, unlockAll);
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
      'دیسیپلین سازمانی',
      'رده نقشی',
      'کد کلاس',
      'عنوان کلاس',
      'سطح انتخابی اولیه',
      'سطح آزموده شده',
      'نمره خام',
      'درصد کسب شده',
      'شاخص تطابق سطح',
      'تاریخ ثبت‌نام'
    ];

    const formatDate = (dateStr?: string) => {
      if (!dateStr) return '';
      try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? '' : d.toLocaleDateString('fa-IR');
      } catch {
        return '';
      }
    };

    const rows = filteredUsers.map((u) => {
      const cls = overview.classes.find(c => c.id === u.classId || c.code === u.classCode);
      const discTitle = u.disciplineId ? (DISCIPLINE_REGISTRY[u.disciplineId as keyof typeof DISCIPLINE_REGISTRY]?.shortTitleFa || u.disciplineId) : 'حفاری TBM';

      return [
        `"${u.id}"`,
        `"${u.fullName}"`,
        `"${u.email}"`,
        `"${u.phone || ''}"`,
        `"${u.specialty || ''}"`,
        `"${discTitle}"`,
        `"${u.roleId || 'مهندس دفتر فنی'}"`,
        `"${u.classCode || ''}"`,
        `"${cls?.title || u.classTitle || ''}"`,
        `"${u.initialAiLevel || ''}"`,
        `"${u.assessmentResult?.testedTier || ''}"`,
        `"${u.assessmentResult?.rawScore ?? ''}"`,
        `"${u.assessmentResult?.percentage ?? ''}%"`,
        `"${u.assessmentResult?.alignmentIndex || 'شرکت نکرده'}"`,
        `"${formatDate(u.createdAt)}"`
      ];
    });

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Container with bounded height and scrollable body */}
      <div className="relative w-full max-w-6xl h-full sm:h-auto max-h-[96vh] sm:max-h-[92vh] flex flex-col p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl overflow-hidden">
        <div className="rounded-xl sm:rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-3.5 sm:p-7 space-y-3.5 sm:space-y-5 text-right flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Header - Fixed top */}
          <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-black/[0.06] dark:border-white/[0.08] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-600/20 shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-sm sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                    مرکز فرماندهی آموزش
                  </h3>
                  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 whitespace-nowrap">
                    مدیر ارشد
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-[#5d6b73] dark:text-[#9aa8b0] line-clamp-1 sm:line-clamp-none block mt-0.5">
                  پایش دانشجویان، ماتریس سطح و مدیریت دوره‌ها
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => loadData(selectedClassId)}
                title="تازه‌سازی داده‌ها"
                className="p-1.5 sm:p-2 rounded-xl text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn shrink-0">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Cohort Class Selector Strip - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] whitespace-nowrap">
                  کلاس آموزشی:
                </span>
              </div>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full sm:w-auto max-w-full sm:max-w-md px-2.5 py-1 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] font-mono font-bold cursor-pointer"
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
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-black/[0.04]">
                <span className="text-[11px] text-[#5d6b73]">
                  رتبه‌بندی ({currentClass.code}):
                </span>
                <button
                  onClick={handleToggleLeaderboard}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                    currentClass.isLeaderboardVisible
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  }`}
                >
                  {currentClass.isLeaderboardVisible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>منتشر شده</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>مخفی</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0] self-end sm:self-auto">
                <span>نمای تجمیعی:</span>
                <span className="font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold text-[11px]">
                  {overview?.classes.length || 0} کلاس
                </span>
              </div>
            )}
          </div>

          {/* Navigation Tabs - Fixed */}
          <div className="flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08] overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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

            <button
              onClick={() => setActiveTab('cohorts')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'cohorts'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>۴. مدیریت دوره‌ها و اسلات‌های زمانی (Cohorts & Time-Slots)</span>
              <span className="px-2 py-0.2 text-[10px] rounded-full bg-amber-500/10 text-amber-600 font-mono">
                {overview?.classes.length || 0} کلاس
              </span>
            </button>
          </div>

          {/* Modal Tab Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto no-scrollbar pr-1 -mr-1 space-y-4 min-h-0">

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

                  {/* Discipline Filter (16 OBS Disciplines) */}
                  <select
                    value={disciplineFilter}
                    onChange={(e) => setDisciplineFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer font-bold"
                  >
                    <option value="ALL">کلیه دیسیپلین‌ها (۲۴ دیسیپلین)</option>
                    <optgroup label="مگاپروژه‌های راه، ترابری و ابنیه (عمران)">
                      {Object.values(DISCIPLINE_REGISTRY)
                        .filter((d) => d.trackId === 'CIVIL_INFRA')
                        .map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.shortTitleFa}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="نفت، گاز، پالایشگاه و پتروشیمی">
                      {Object.values(DISCIPLINE_REGISTRY)
                        .filter((d) => d.trackId === 'ENERGY_PETRO')
                        .map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.shortTitleFa}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="کاربردهای عمومی، خانواده و سبک زندگی">
                      {Object.values(DISCIPLINE_REGISTRY)
                        .filter((d) => d.trackId === 'GENERAL_EVERYDAY')
                        .map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.shortTitleFa}
                          </option>
                        ))}
                    </optgroup>
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
                        <th className="py-3 px-4">دیسیپلین و رده سازمانی</th>
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
                              <div className="space-y-0.5">
                                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6]">
                                  {user.disciplineId ? (DISCIPLINE_REGISTRY[user.disciplineId as keyof typeof DISCIPLINE_REGISTRY]?.shortTitleFa || user.disciplineId) : 'حفاری TBM'}
                                </span>
                                <span className="block text-[10px] text-gray-400 font-mono">
                                  {user.roleId || 'مهندس دفتر فنی'}
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
                              {(() => {
                                try {
                                  const d = user.createdAt ? new Date(user.createdAt) : null;
                                  return d && !isNaN(d.getTime()) ? d.toLocaleDateString('fa-IR') : '—';
                                } catch {
                                  return '—';
                                }
                              })()}
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

          {/* TAB 4: Cohort Classes & 2-Hour Time Window Slots Management */}
          {activeTab === 'cohorts' && (
            <div className="space-y-5">
              {/* Top Banner Guide */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5 sm:mt-0 shadow-xs">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-amber-950 dark:text-amber-200 text-xs sm:text-sm">
                      مدیریت کلاس‌ها و دسته‌بندی خودکار پنجره‌های زمانی ۲ ساعته
                    </h3>
                    <p className="text-amber-900/80 dark:text-amber-300/80 text-[11px] mt-0.5 leading-relaxed">
                      کاربرانی که در یک بازه زمانی ۲ ساعته ثبت‌نام می‌کنند، به صورت خودکار در یک اسلات کلاس واحد دسته‌بندی می‌شوند. در این بخش می‌توانید برای هر کلاس/اسلات عنوان رسمی فارسی، سازمان کارفرما و وضعیت انتشار رتبه‌بندی را تعیین فرمایید.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-200">
                    {overview?.classes.length || 0} کلاس فعال
                  </span>
                  <button
                    onClick={() => setIsCreatingNewClass((prev) => !prev)}
                    className="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    {isCreatingNewClass ? 'بستن فرم' : '+ تعریف کلاس جدید'}
                  </button>
                </div>
              </div>

              {/* Create New Class Form Container */}
              {isCreatingNewClass && (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-[#2563EB]/40 shadow-sm space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                    <FolderKanban className="w-4 h-4" />
                    <span>مشخصات کلاس و دوره آموزشی جدید:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">
                        کد یکتای کلاس (انگلیسی):
                      </label>
                      <input
                        type="text"
                        value={newClassCode}
                        onChange={(e) => setNewClassCode(e.target.value)}
                        placeholder="مثال: METRO-LINE10"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">
                        عنوان رسمی کلاس (فارسی):
                      </label>
                      <input
                        type="text"
                        value={newClassTitle}
                        onChange={(e) => setNewClassTitle(e.target.value)}
                        placeholder="مثال: دوره تخصصی مترو و TBM"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">
                        شرکت / سازمان کارفرما:
                      </label>
                      <input
                        type="text"
                        value={newClassOrg}
                        onChange={(e) => setNewClassOrg(e.target.value)}
                        placeholder="مثال: شرکت راه‌آهن شهری تهران"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setIsCreatingNewClass(false)}
                      className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      onClick={handleCreateNewClass}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      ایجاد و فعال‌سازی کلاس
                    </button>
                  </div>
                </div>
              )}

              {/* Class Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(overview?.classes || []).map((cls) => {
                  const slotInfo = parseTimeSlotInfo(cls.code);
                  const isEditingThis = editingClassId === cls.id;

                  return (
                    <div
                      key={cls.id}
                      className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#161e24] shadow-xs space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08] text-[#1c2830] dark:text-[#e8ebe9]">
                                {cls.code}
                              </span>
                              {slotInfo.isSlot && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                  اسلات ۲ ساعته خودکار
                                </span>
                              )}
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {cls.studentCount || 0} دانشجو
                              </span>
                            </div>

                            {/* Human Title or Edit Form */}
                            {isEditingThis ? (
                              <div className="space-y-2 pt-1 animate-fadeIn">
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-500 mb-1">
                                    عنوان اختصاصی کلاس / دوره:
                                  </label>
                                  <input
                                    type="text"
                                    value={editTitleInput}
                                    onChange={(e) => setEditTitleInput(e.target.value)}
                                    placeholder="مثال: دوره تخصصی پایپینگ - نوبت عصر"
                                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#2563EB] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden"
                                    autoFocus
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-500 mb-1">
                                    سازمان / شرکت کارفرما:
                                  </label>
                                  <input
                                    type="text"
                                    value={editOrgInput}
                                    onChange={(e) => setEditOrgInput(e.target.value)}
                                    placeholder="مثال: شرکت نفت و گاز پارس"
                                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden"
                                  />
                                </div>
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => handleSaveClassInfo(cls.id)}
                                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>ذخیره نام</span>
                                  </button>
                                  <button
                                    onClick={() => setEditingClassId(null)}
                                    className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs cursor-pointer"
                                  >
                                    انصراف
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 pt-0.5">
                                <h4 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                                  {cls.title}
                                </h4>
                                <button
                                  onClick={() => handleStartEditClass(cls)}
                                  className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                                  title="تغییر نام کلاس"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {cls.organization && !isEditingThis && (
                              <div className="flex items-center gap-1 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                                <Building className="w-3 h-3 text-amber-500" />
                                <span>سازمان: {cls.organization}</span>
                              </div>
                            )}

                            {slotInfo.isSlot && (
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                                ⏱️ {slotInfo.labelFa}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedClassId(cls.id);
                              setActiveTab('users');
                              showToast(`فیلتر جدول روی کلاس «${cls.title}» تنظیم شد.`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] text-[#1c2830] dark:text-[#e8ebe9] font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            مشاهده دانشجویان 👥
                          </button>
                          <button
                            onClick={() => {
                              setSelectedClassId(cls.id);
                              setActiveTab('drip');
                              showToast(`قفل‌های قطره‌ای کلاس «${cls.title}» بازخوانی شدند.`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] text-[#1c2830] dark:text-[#e8ebe9] font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            مدیریت قفل جلسات 🔒
                          </button>
                        </div>

                        {/* Leaderboard toggle */}
                        <button
                          onClick={async () => {
                            const newStatus = !cls.isLeaderboardVisible;
                            setOverview((prev) => ({
                              ...prev,
                              classes: prev.classes.map((c) =>
                                c.id === cls.id ? { ...c, isLeaderboardVisible: newStatus } : c
                              )
                            }));
                            showToast(newStatus ? 'لیدربورد این کلاس منتشر شد.' : 'لیدربورد مخفی شد.');
                            await lmsApi.toggleLeaderboardVisibility(cls.id, newStatus);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                            cls.isLeaderboardVisible
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {cls.isLeaderboardVisible ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>رتبه‌بندی عمومی</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>رتبه‌بندی مخفی</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          </div>

          {/* Modal Footer - Fixed */}
          <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] shrink-0">
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
