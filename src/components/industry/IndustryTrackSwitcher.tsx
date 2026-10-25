import React from 'react';
import { Building2, Factory, ArrowRightLeft, Sparkles } from 'lucide-react';
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

  return (
    <div
      className={`inline-flex items-center p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs ${className}`}
      dir="rtl"
    >
      {/* Civil & Infrastructure Tab */}
      <button
        onClick={() => onSelectTrack('CIVIL_INFRA')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
          isCivil
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20 scale-[1.02]'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="مگاپروژه‌های راه، ترابری، شهرسازی و ابنیه کلان (نشریه ۴۳۱۱ و BIM)"
      >
        <Building2 className={`w-3.5 h-3.5 ${isCivil ? 'text-white' : 'text-blue-500'}`} />
        <span className="whitespace-nowrap font-sans">راه و ابنیه</span>
      </button>

      {/* Oil, Gas & Petrochemical Tab */}
      <button
        onClick={() => onSelectTrack('ENERGY_PETRO')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
          isPetro
            ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-sm shadow-orange-500/20 scale-[1.02]'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="مگاپروژه‌های نفت، گاز، پالایش و صنایع پتروشیمی (فیدیک، API و HAZOP)"
      >
        <Factory className={`w-3.5 h-3.5 ${isPetro ? 'text-white' : 'text-amber-500'}`} />
        <span className="whitespace-nowrap font-sans">نفت و انرژی</span>
      </button>

      {/* Everyday, Family & Lifestyle Tab */}
      <button
        onClick={() => onSelectTrack('GENERAL_EVERYDAY')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
          isEveryday
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-sm shadow-emerald-500/20 scale-[1.02]'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
        }`}
        title="سبک زندگی، خانواده، خرید روزمره، برنامه‌ریزی سفر و ترندهای جذاب هوش مصنوعی"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isEveryday ? 'text-white' : 'text-emerald-500'}`} />
        <span className="whitespace-nowrap font-sans">روزمره و خانواده</span>
      </button>

      {/* Modal Trigger Icon (Optional) */}
      {onOpenSelectorModal && (
        <button
          onClick={onOpenSelectorModal}
          className="p-1.5 mr-0.5 rounded-lg text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
          title="مشاهده جزئیات کامل و مقایسه سه مسیر"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
