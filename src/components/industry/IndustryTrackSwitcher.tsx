import React from 'react';
import { Building2, Factory, ArrowRightLeft, Sparkles, ChevronDown } from 'lucide-react';
import { IndustryTrackId, INDUSTRY_TRACKS } from '../../types/industryTrack';

interface IndustryTrackSwitcherProps {
  currentTrack: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
  onOpenSelectorModal?: () => void;
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}

export const IndustryTrackSwitcher: React.FC<IndustryTrackSwitcherProps> = ({
  currentTrack,
  onSelectTrack,
  onOpenSelectorModal,
  variant = 'compact',
  className = ''
}) => {
  const isCivil = currentTrack === 'CIVIL_INFRA';
  const isPetro = currentTrack === 'ENERGY_PETRO';
  const isEveryday = currentTrack === 'GENERAL_EVERYDAY';
  const trackInfo = INDUSTRY_TRACKS[currentTrack];

  if (variant === 'dropdown') {
    const ActiveIcon = isCivil ? Building2 : isPetro ? Factory : Sparkles;
    const badgeColor = isCivil
      ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25'
      : isPetro
      ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25'
      : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25';

    const cycleTrack = () => {
      if (onOpenSelectorModal) {
        onOpenSelectorModal();
        return;
      }
      const order: IndustryTrackId[] = ['CIVIL_INFRA', 'ENERGY_PETRO', 'GENERAL_EVERYDAY'];
      const next = order[(order.indexOf(currentTrack) + 1) % order.length];
      onSelectTrack(next);
    };

    return (
      <button
        type="button"
        onClick={cycleTrack}
        dir="rtl"
        title={`حوزه فعال: ${trackInfo?.shortTitleFa || ''} (کلیک برای تغییر حوزه تخصصی)`}
        className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 hover:brightness-95 ${badgeColor} ${className}`}
      >
        <ActiveIcon className="w-3.5 h-3.5 shrink-0" />
        <span className="whitespace-nowrap">
          {isCivil ? 'راه و ابنیه' : isPetro ? 'نفت و انرژی' : 'روزمره و خانواده'}
        </span>
        <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs shrink-0 whitespace-nowrap ${className}`}
      dir="rtl"
    >
      {/* Civil & Infrastructure Tab */}
      <button
        type="button"
        onClick={() => onSelectTrack('CIVIL_INFRA')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
          isCivil
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="مگاپروژه‌های راه، ترابری، شهرسازی و ابنیه کلان (نشریه ۴۳۱۱ و BIM)"
      >
        <Building2 className={`w-3.5 h-3.5 shrink-0 ${isCivil ? 'text-white' : 'text-blue-500'}`} />
        <span className="whitespace-nowrap font-sans">راه و ابنیه</span>
      </button>

      {/* Oil, Gas & Petrochemical Tab */}
      <button
        type="button"
        onClick={() => onSelectTrack('ENERGY_PETRO')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
          isPetro
            ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-sm shadow-orange-500/20'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="مگاپروژه‌های نفت، گاز، پالایش و صنایع پتروشیمی (فیدیک، API و HAZOP)"
      >
        <Factory className={`w-3.5 h-3.5 shrink-0 ${isPetro ? 'text-white' : 'text-amber-500'}`} />
        <span className="whitespace-nowrap font-sans">نفت و انرژی</span>
      </button>

      {/* Everyday, Family & Lifestyle Tab */}
      <button
        type="button"
        onClick={() => onSelectTrack('GENERAL_EVERYDAY')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
          isEveryday
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-sm shadow-emerald-500/20'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="سبک زندگی، خانواده، خرید روزمره، برنامه‌ریزی سفر و ترندهای جذاب هوش مصنوعی"
      >
        <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isEveryday ? 'text-white' : 'text-emerald-500'}`} />
        <span className="whitespace-nowrap font-sans">روزمره و خانواده</span>
      </button>

      {/* Modal Trigger Icon (Optional) */}
      {onOpenSelectorModal && (
        <button
          type="button"
          onClick={onOpenSelectorModal}
          className="p-1.5 mr-0.5 rounded-lg text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors shrink-0 cursor-pointer"
          title="مشاهده جزئیات کامل و مقایسه سه مسیر"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
