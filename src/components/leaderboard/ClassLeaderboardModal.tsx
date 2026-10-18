import React, { useState, useEffect } from 'react';
import { Language } from '../../types/cpmai';
import { UserProfile } from '../../types/auth';
import { LeaderboardEntry, LeaderboardResponse } from '../../types/lms';
import { lmsApi } from '../../services/lmsApi';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../../data/logo';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Users,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronUp,
  Flame,
  ShieldCheck,
  Brain,
  Cpu
} from 'lucide-react';

interface ClassLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  lang: Language;
}

export const ClassLeaderboardModal: React.FC<ClassLeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<LeaderboardResponse>({
    isLeaderboardVisible: false,
    classCode: currentUser?.classCode || 'DEFAULT',
    entries: [],
    totalParticipants: 0
  });

  const isAdmin = (currentUser?.role || '').toLowerCase() === 'admin';

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    lmsApi
      .fetchLeaderboard({
        classCode: currentUser?.classCode,
        classId: currentUser?.classId
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, currentUser?.classCode, currentUser?.classId]);

  if (!isOpen) return null;

  // Filter entries according to activeTab and search query
  const filteredEntries = data.entries.filter((entry) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (entry.testedTier || '').toUpperCase() === activeTab ||
      (entry.initialAiLevel || '').toUpperCase() === activeTab;

    const matchesSearch =
      !searchQuery ||
      entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.specialty || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Top 3 Podium
  const top1 = data.entries[0];
  const top2 = data.entries[1];
  const top3 = data.entries[2];

  const getTierBadge = (tier?: string) => {
    const t = (tier || 'BEGINNER').toUpperCase();
    if (t === 'ADVANCED') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/25">
          پیشرفته (Advanced)
        </span>
      );
    }
    if (t === 'INTERMEDIATE') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/25">
          متوسط (Intermediate)
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
        مقدماتی (Beginner)
      </span>
    );
  };

  const getAlignmentBadge = (align: string) => {
    if (align === 'Matches') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
          ✓ انطباق سطح
        </span>
      );
    }
    if (align === 'Above Tier') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/15 text-blue-700 dark:text-blue-300">
          🚀 فراتر از سطح
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
        ⚠️ نیاز به بازآموزی
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Double Bezel Card Container */}
      <div className="relative w-full max-w-4xl my-auto p-1.5 rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-8 space-y-6 text-right">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    جدول رتبه‌بندی رقابتی هم‌دوره‌ای‌ها (Class Leaderboard)
                  </h3>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    کلاس: {data.classCode}
                  </span>
                </div>
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  مشاوران مدیریت کسب‌وکار اوج · ایزولاسیون بر اساس کد کلاسی هم‌گروهی
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {isAdmin && !data.isLeaderboardVisible && (
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  پیش‌نمایش مدیر (برای دانشجو پنهان است)
                </span>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pending / Hidden State for Normal Students */}
          {!data.isLeaderboardVisible && !isAdmin ? (
            <div className="py-14 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-inner">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  جدول نتایج هنوز منتشر نشده است
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  نتایج آزمون و جدول رتبه‌بندی پس از اتمام زمان ارزیابی کلیه هم‌دوره‌ای‌ها، توسط مدرس و مدیریت دوره منتشر خواهد شد.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full bg-black/5 dark:bg-white/5 text-[#5d6b73] dark:text-[#9aa8b0]">
                    <Users className="w-3.5 h-3.5" />
                    <span>تعداد شرکت‌کنندگان این کلاس تا این لحظه: {data.totalParticipants} نفر</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Top 3 Podium (Gamification Highlight) */}
              {data.entries.length >= 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* Rank 2 (Silver) */}
                  {top2 ? (
                    <div className="order-2 sm:order-1 p-4 rounded-2xl bg-slate-500/[0.06] dark:bg-slate-500/[0.08] border border-slate-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-slate-500/40 transition-all">
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-black">
                        🥈 رتبه ۲
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-900 flex items-center justify-center text-lg font-black shadow-md mt-2">
                        {top2.fullName.charAt(0)}
                      </div>
                      <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9] mt-2 line-clamp-1">
                        {top2.fullName}
                      </h4>
                      <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] line-clamp-1">
                        {top2.specialty || 'مدیریت و مهندسی'}
                      </span>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-xl font-black font-mono text-slate-700 dark:text-slate-200">
                          {top2.percentage}%
                        </span>
                        <span className="text-[10px] text-[#5d6b73]">({top2.score}/{top2.maxScore})</span>
                      </div>
                    </div>
                  ) : (
                    <div className="order-2 sm:order-1 p-4 rounded-2xl border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-xs text-[#5d6b73]">
                      در انتظار داوطلب دوم
                    </div>
                  )}

                  {/* Rank 1 (Gold - Champion) */}
                  {top1 && (
                    <div className="order-1 sm:order-2 p-5 rounded-3xl bg-gradient-to-b from-amber-500/[0.12] to-amber-500/[0.04] border-2 border-amber-500/40 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg scale-[1.02]">
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center gap-1 shadow-xs">
                        <Crown className="w-3 h-3" />
                        <span>🥇 رتبه ۱ (طلایی)</span>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 flex items-center justify-center text-2xl font-black shadow-lg mt-3 ring-4 ring-amber-400/30">
                        {top1.fullName.charAt(0)}
                      </div>
                      <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] mt-2 line-clamp-1">
                        {top1.fullName}
                      </h4>
                      <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] line-clamp-1">
                        {top1.specialty || 'مدیریت و مهندسی'}
                      </span>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                          {top1.percentage}%
                        </span>
                        <span className="text-xs text-[#5d6b73]">({top1.score}/{top1.maxScore})</span>
                      </div>
                      <div className="mt-2">
                        {getTierBadge(top1.testedTier)}
                      </div>
                    </div>
                  )}

                  {/* Rank 3 (Bronze) */}
                  {top3 ? (
                    <div className="order-3 p-4 rounded-2xl bg-amber-700/[0.06] dark:bg-amber-700/[0.08] border border-amber-700/20 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-amber-700/40 transition-all">
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-black">
                        🥉 رتبه ۳
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center text-lg font-black shadow-md mt-2">
                        {top3.fullName.charAt(0)}
                      </div>
                      <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9] mt-2 line-clamp-1">
                        {top3.fullName}
                      </h4>
                      <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] line-clamp-1">
                        {top3.specialty || 'مدیریت و مهندسی'}
                      </span>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-xl font-black font-mono text-amber-700 dark:text-amber-300">
                          {top3.percentage}%
                        </span>
                        <span className="text-[10px] text-[#5d6b73]">({top3.score}/{top3.maxScore})</span>
                      </div>
                    </div>
                  ) : (
                    <div className="order-3 p-4 rounded-2xl border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-xs text-[#5d6b73]">
                      در انتظار داوطلب سوم
                    </div>
                  )}
                </div>
              )}

              {/* Controls: Search and Tier Tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                {/* Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] w-full sm:w-auto">
                  {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] shadow-xs'
                          : 'text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                      }`}
                    >
                      {tab === 'ALL'
                        ? 'همه سطوح'
                        : tab === 'BEGINNER'
                        ? 'مقدماتی'
                        : tab === 'INTERMEDIATE'
                        ? 'متوسط'
                        : 'پیشرفته'}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجوی نام یا تخصص..."
                    className="w-full pr-9 pl-3 py-1.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              {/* Leaderboard Data Table */}
              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] font-bold">
                      <tr>
                        <th className="py-3 px-4 text-center w-16">رتبه</th>
                        <th className="py-3 px-4">نام و مشخصات دانشجو</th>
                        <th className="py-3 px-4">سطح ارزیابی</th>
                        <th className="py-3 px-4 text-center">نمره خام</th>
                        <th className="py-3 px-4 text-center">درصد</th>
                        <th className="py-3 px-4 text-center">شاخص انطباق</th>
                        <th className="py-3 px-4 text-center">زمان تکمیل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                      {filteredEntries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#5d6b73]">
                            هیچ رکوردی برای نمایش یافت نشد.
                          </td>
                        </tr>
                      ) : (
                        filteredEntries.map((row) => {
                          const isCurrent = currentUser?.id === row.userId;
                          return (
                            <tr
                              key={row.userId}
                              className={`transition-colors ${
                                isCurrent
                                  ? 'bg-blue-50/70 dark:bg-blue-950/30 font-bold'
                                  : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.02]'
                              }`}
                            >
                              <td className="py-3 px-4 text-center">
                                {row.rank === 1 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs">
                                    ۱
                                  </span>
                                ) : row.rank === 2 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-white font-black text-xs">
                                    ۲
                                  </span>
                                ) : row.rank === 3 ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs">
                                    ۳
                                  </span>
                                ) : (
                                  <span className="font-mono text-xs text-[#5d6b73]">
                                    {row.rank}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6] flex items-center justify-center font-bold text-xs shrink-0">
                                    {row.fullName.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[#1c2830] dark:text-[#e8ebe9]">
                                        {row.fullName}
                                      </span>
                                      {isCurrent && (
                                        <span className="px-1.5 py-0.2 text-[9px] rounded-sm bg-blue-500 text-white">
                                          شما
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                                      {row.specialty || 'مدیریت و مهندسی پروژه'}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {getTierBadge(row.testedTier)}
                              </td>
                              <td className="py-3 px-4 text-center font-mono font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                                {row.score} / {row.maxScore}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="font-mono font-black text-xs text-[#2563EB] dark:text-blue-400">
                                  {row.percentage}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {getAlignmentBadge(row.alignmentIndex)}
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-[11px] text-[#5d6b73]">
                                {new Date(row.completedAt).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[11px] text-[#5d6b73]">
              سیستم رتبه‌بندی بلادرنگ بر بستر Neon PostgreSQL
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-bold transition-all cursor-pointer"
            >
              بستن پنجره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
