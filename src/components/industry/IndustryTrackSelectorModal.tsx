import React from 'react';
import {
  X,
  Building2,
  Factory,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';
import { IndustryTrackId, INDUSTRY_TRACKS } from '../../types/industryTrack';

interface IndustryTrackSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
}

export const IndustryTrackSelectorModal: React.FC<IndustryTrackSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  onSelectTrack
}) => {
  if (!isOpen) return null;

  const tracks = Object.values(INDUSTRY_TRACKS);

  const handleChoose = (id: IndustryTrackId) => {
    onSelectTrack(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      dir="rtl"
    >
      {/* Outer Double Bezel Frame */}
      <div className="relative w-full max-w-5xl my-auto p-1.5 rounded-3xl bg-black/[0.1] dark:bg-white/[0.08] border border-black/[0.15] dark:border-white/[0.15] shadow-2xl">
        
        {/* Inner Modal Content */}
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-[#fcfcfa] dark:bg-[#131a22] text-[#1a2329] dark:text-[#e4e8eb] p-6 sm:p-10 space-y-8 shadow-inner">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                    INDUSTRY DOMAIN GATEWAY
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono hidden sm:inline">
                    اکوسیستم شورای کسب‌وکار اوج
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight mt-1">
                  گزینش حوزه تخصصی مگاپروژه‌ها
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-2xl bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] transition-all cursor-pointer border border-black/[0.08] dark:border-white/[0.1] self-end sm:self-center"
              title="بستن (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              برای اینکه مثال‌ها، کیس‌استادی‌ها، قراردادهای نمونه، دیتاست‌های واقعی و پرامپت‌های بوم CPMAI دقیقاً با فضای کاری شما همسو شوند، حوزه صنعتی مورد نظر خود را انتخاب نمایید:
            </p>
          </div>

          {/* Dual Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {tracks.map((track) => {
              const isSelected = track.id === currentTrack;
              const isCivil = track.id === 'CIVIL_INFRA';
              const Icon = isCivil ? Building2 : Factory;

              return (
                <div
                  key={track.id}
                  onClick={() => handleChoose(track.id)}
                  className={`group relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? `bg-white dark:bg-[#1a232d] ${track.borderColor} shadow-xl scale-[1.01] ring-2 ring-blue-500/30`
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.2] dark:hover:border-white/[0.2] hover:bg-white dark:hover:bg-[#18212a]'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 35px ${track.glowColor}` : undefined
                  }}
                >
                  {/* Top Header of Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-br ${track.gradient} text-white shadow-md`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-gray-400 block uppercase">
                          {track.shortTitleEn}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug">
                          {track.titleFa}
                        </h3>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>فعال</span>
                      </span>
                    )}
                  </div>

                  {/* Scope Pills */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 block">
                      محورها و موضوعات تحت پوشش:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.scopePillsFa.map((pill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-gray-700 dark:text-gray-300"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Governing Standards */}
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-gray-500 dark:text-gray-400 block">
                      استانداردها و قراردادهای مبنا:
                    </span>
                    <ul className="space-y-1 text-[11px]">
                      {track.governingStandardsFa.map((std, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                          <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          <span>{std}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study Box */}
                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold block">
                      پروژه نمونه پیش‌فرض در بوم:
                    </span>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                      {track.defaultCaseStudy.projectTitleFa}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                      {track.defaultCaseStudy.coreProblemFa}
                    </p>
                  </div>

                  {/* Choose CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoose(track.id);
                    }}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isSelected
                        ? `bg-gradient-to-r ${track.gradient} text-white hover:opacity-95`
                        : 'bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span>{isSelected ? 'مسیر فعلی انتخاب‌شده' : 'گزینش و فعال‌سازی این حوزه'}</span>
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer Helper Note */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>شما در هر زمان می‌توانید با کلیک روی سوئیچر بالای صفحه، بین دو حوزه جابه‌جا شوید.</span>
            </span>
            <span className="font-mono text-[11px] text-cyan-600">PMI-CPMAI · OWJ COUNCIL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
