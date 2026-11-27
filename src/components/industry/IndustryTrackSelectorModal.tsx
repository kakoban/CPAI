import React, { useEffect } from 'react';
import {
  X,
  Building2,
  Factory,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronLeft,
  Landmark,
  Home
} from 'lucide-react';
import { IndustryTrackId, INDUSTRY_TRACKS } from '../../types/industryTrack';

interface IndustryTrackSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
  allowedTracks?: IndustryTrackId[];
  orgTrackId?: IndustryTrackId;
  organizationLabel?: string;
}

export const IndustryTrackSelectorModal: React.FC<IndustryTrackSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  onSelectTrack,
  allowedTracks,
  orgTrackId,
  organizationLabel
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trackIds: IndustryTrackId[] =
    allowedTracks && allowedTracks.length > 0
      ? allowedTracks
      : (Object.keys(INDUSTRY_TRACKS) as IndustryTrackId[]);

  const tracks = trackIds
    .map((id) => INDUSTRY_TRACKS[id])
    .filter(Boolean);

  const isDualMode = tracks.length === 2;

  const handleChoose = (id: IndustryTrackId) => {
    onSelectTrack(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 overflow-y-auto"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="industry-track-modal-title"
      data-testid="industry-track-selector-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${
          isDualMode ? 'max-w-4xl' : 'max-w-6xl'
        } my-auto rounded-2xl bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-text)] shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[var(--cpai-border)] bg-[var(--cpai-bg)] flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[var(--cpai-primary-soft)] text-[var(--cpai-primary)] border border-[var(--cpai-border)] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-[var(--cpai-muted)] flex-wrap">
                <span className="font-semibold text-[var(--cpai-primary-strong)]">
                  اکوسیستم شورای کسب‌وکار اوج
                </span>
                {organizationLabel && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{organizationLabel}</span>
                  </>
                )}
              </div>
              <h2
                id="industry-track-modal-title"
                className="text-lg sm:text-xl font-bold text-[var(--cpai-text)] tracking-tight mt-0.5"
              >
                انتخاب فضای یادگیری و مثال‌های دوره
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره انتخاب حوزه"
            data-testid="industry-modal-close-btn"
            className="w-10 h-10 rounded-xl bg-[var(--cpai-surface)] hover:bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="بستن (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6">
          <p className="text-sm text-[var(--cpai-muted)] leading-relaxed max-w-2xl">
            {isDualMode
              ? 'با توجه به سازمان شما، دو فضای کاری آماده است: حوزه تخصصی سازمان خودتان برای تمرین‌های کاری و پروژه‌ای، یا فضای خانه و خانواده برای کاربردهای روزمره هوش مصنوعی.'
              : 'برای اینکه مثال‌ها، کیس‌استادی‌ها، قراردادهای نمونه و پرامپت‌ها دقیقاً با فضای کاری و زندگی شما همسو شوند، مسیر مورد نظر خود را انتخاب نمایید:'}
          </p>

          {/* 2-Column Clean Comparison Grid */}
          <div
            data-testid="industry-track-cards-grid"
            className={`grid grid-cols-1 ${
              isDualMode ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4'
            } gap-5`}
          >
            {tracks.map((track) => {
              const isSelected = track.id === currentTrack;
              const isEveryday = track.id === 'GENERAL_EVERYDAY';
              const isOrgTrack = orgTrackId ? track.id === orgTrackId : !isEveryday;

              const Icon = isEveryday
                ? Home
                : track.iconName === 'Building2'
                ? Building2
                : track.iconName === 'Factory'
                ? Factory
                : track.iconName === 'Landmark'
                ? Landmark
                : Sparkles;

              return (
                <div
                  key={track.id}
                  data-testid={`industry-track-card-${track.id}`}
                  onClick={() => handleChoose(track.id)}
                  className={`group rounded-2xl border p-5 sm:p-6 transition-colors cursor-pointer flex flex-col justify-between gap-5 ${
                    isSelected
                      ? 'bg-[var(--cpai-primary-soft)]/50 border-[var(--cpai-primary)] ring-1 ring-[var(--cpai-primary)]'
                      : 'bg-[var(--cpai-bg)] border-[var(--cpai-border)] hover:border-[var(--cpai-primary)]/60 hover:bg-[var(--cpai-surface)]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A]'
                              : 'bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-primary)]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[var(--cpai-primary-strong)]">
                            {isEveryday
                              ? 'خانه و خانواده'
                              : isOrgTrack && organizationLabel
                              ? `حوزه تخصصی شما · ${organizationLabel}`
                              : 'حوزه تخصصی سازمان شما'}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[var(--cpai-text)] leading-snug mt-0.5">
                            {isEveryday ? 'خانه، خانواده و زندگی روزمره' : track.shortTitleFa}
                          </h3>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--cpai-primary-strong)] shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[var(--cpai-primary)]" />
                          <span>فعال</span>
                        </span>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-[var(--cpai-muted)] leading-relaxed">
                      {track.taglineFa}
                    </p>

                    {/* Scope List (clean unboxed rows) */}
                    <div className="space-y-2 pt-3 border-t border-[var(--cpai-border)]">
                      <div className="text-xs font-semibold text-[var(--cpai-text)]">
                        محورها و مثال‌های تحت پوشش
                      </div>
                      <ul className="space-y-1.5 text-xs text-[var(--cpai-muted)]">
                        {track.scopePillsFa.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cpai-primary)] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standards */}
                    <div className="space-y-1.5 pt-3 border-t border-[var(--cpai-border)]">
                      <div className="text-xs font-semibold text-[var(--cpai-text)]">
                        چارچوب و استانداردهای مبنا
                      </div>
                      <ul className="space-y-1 text-xs text-[var(--cpai-muted)]">
                        {track.governingStandardsFa.slice(0, 2).map((std, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <ShieldCheck className="w-3.5 h-3.5 text-[var(--cpai-primary)] mt-0.5 shrink-0" />
                            <span>{std}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    data-testid={`select-industry-track-${track.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoose(track.id);
                    }}
                    className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] hover:bg-[var(--cpai-primary-strong)]'
                        : 'bg-[var(--cpai-surface)] border border-[var(--cpai-border)] text-[var(--cpai-text)] hover:border-[var(--cpai-primary)] hover:text-[var(--cpai-primary-strong)]'
                    }`}
                  >
                    <span>
                      {isSelected
                        ? 'مسیر فعال فعلی'
                        : isEveryday
                        ? 'ورود به فضای خانه و خانواده'
                        : 'فعال‌سازی حوزه تخصصی سازمان'}
                    </span>
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 sm:px-7 border-t border-[var(--cpai-border)] bg-[var(--cpai-bg)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--cpai-muted)]">
          <span>
            در هر زمان می‌توانید بین حوزه تخصصی سازمان خود و فضای خانه و خانواده جابه‌جا شوید.
          </span>
          <span className="font-mono text-[11px] text-[var(--cpai-primary-strong)]">
            OWJ BUSINESS COUNCIL
          </span>
        </div>
      </div>
    </div>
  );
};
