import React from 'react';
import { Building2, Factory, ArrowRightLeft, Home, ChevronDown, Landmark } from 'lucide-react';
import { IndustryTrackId, INDUSTRY_TRACKS } from '../../types/industryTrack';

interface IndustryTrackSwitcherProps {
  currentTrack: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
  onOpenSelectorModal?: () => void;
  allowedTracks?: IndustryTrackId[];
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}

const TRACK_LABELS: Record<IndustryTrackId, string> = {
  CIVIL_INFRA: 'راه و ابنیه',
  ENERGY_PETRO: 'نفت و انرژی',
  PAYA_SAMAN_PARS: 'پایا سامان پارس',
  GENERAL_EVERYDAY: 'خانه و خانواده'
};

export const IndustryTrackSwitcher: React.FC<IndustryTrackSwitcherProps> = ({
  currentTrack,
  onSelectTrack,
  onOpenSelectorModal,
  allowedTracks,
  variant = 'compact',
  className = ''
}) => {
  const isCivil = currentTrack === 'CIVIL_INFRA';
  const isPetro = currentTrack === 'ENERGY_PETRO';
  const isEveryday = currentTrack === 'GENERAL_EVERYDAY';
  const isPaya = currentTrack === 'PAYA_SAMAN_PARS';
  const trackInfo = INDUSTRY_TRACKS[currentTrack];

  const visibleTracks: IndustryTrackId[] =
    allowedTracks && allowedTracks.length > 0
      ? allowedTracks
      : ['CIVIL_INFRA', 'ENERGY_PETRO', 'GENERAL_EVERYDAY', 'PAYA_SAMAN_PARS'];

  if (variant === 'dropdown') {
    const ActiveIcon = isEveryday
      ? Home
      : isCivil
      ? Building2
      : isPetro
      ? Factory
      : Landmark;

    const badgeColor = isEveryday
      ? 'text-[var(--cpai-success-text)] bg-[var(--cpai-success-bg)] border-[var(--cpai-border)]'
      : 'text-[var(--cpai-primary-strong)] bg-[var(--cpai-primary-soft)] border-[var(--cpai-border)]';

    const handleTrigger = () => {
      if (onOpenSelectorModal) {
        onOpenSelectorModal();
        return;
      }
      const next = visibleTracks[(visibleTracks.indexOf(currentTrack) + 1) % visibleTracks.length];
      onSelectTrack(next);
    };

    return (
      <button
        type="button"
        onClick={handleTrigger}
        dir="rtl"
        data-testid="industry-track-switcher-btn"
        title={`فضای فعال: ${TRACK_LABELS[currentTrack] || trackInfo?.shortTitleFa || ''} (کلیک برای تغییر بین حوزه تخصصی و خانه و خانواده)`}
        className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:border-[var(--cpai-primary)] ${badgeColor} ${className}`}
      >
        <ActiveIcon className="w-3.5 h-3.5 shrink-0" />
        <span className="whitespace-nowrap">{TRACK_LABELS[currentTrack]}</span>
        <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center flex-wrap gap-1 p-1 rounded-xl bg-[var(--cpai-surface-subtle)] border border-[var(--cpai-border)] shrink-0 ${className}`}
      dir="rtl"
    >
      {visibleTracks.map((trackId) => {
        const isActive = currentTrack === trackId;
        const Icon =
          trackId === 'GENERAL_EVERYDAY'
            ? Home
            : trackId === 'CIVIL_INFRA'
            ? Building2
            : trackId === 'ENERGY_PETRO'
            ? Factory
            : Landmark;

        return (
          <button
            key={trackId}
            type="button"
            onClick={() => onSelectTrack(trackId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isActive
                ? 'bg-[var(--cpai-primary)] text-white dark:text-[#0F171A] shadow-2xs'
                : 'text-[var(--cpai-muted)] hover:text-[var(--cpai-text)] hover:bg-[var(--cpai-surface)]'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{TRACK_LABELS[trackId]}</span>
          </button>
        );
      })}

      {onOpenSelectorModal && (
        <button
          type="button"
          onClick={onOpenSelectorModal}
          className="p-1.5 rounded-lg text-[var(--cpai-muted)] hover:text-[var(--cpai-primary)] hover:bg-[var(--cpai-surface)] transition-colors shrink-0 cursor-pointer"
          title="مقایسه و تغییر فضای یادگیری"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
