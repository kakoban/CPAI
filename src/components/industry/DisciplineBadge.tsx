import React from 'react';
import { DisciplineId, IndustryTrackId } from '../../types/industryTrack';
import { getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';
import { ChevronDown, Sliders } from 'lucide-react';

interface DisciplineBadgeProps {
  currentTrack: IndustryTrackId;
  currentDiscipline: DisciplineId;
  onClick: () => void;
  lang?: 'fa' | 'en';
  className?: string;
}

export const DisciplineBadge: React.FC<DisciplineBadgeProps> = ({
  currentTrack,
  currentDiscipline,
  onClick,
  lang = 'fa',
  className = ''
}) => {
  const meta = getDisciplineMetadata(currentDiscipline);

  return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-soft)]/40 transition-colors shadow-2xs group cursor-pointer text-start ${className}`}
        title={lang === 'fa' ? 'تغییر دیسیپلین و رده سازمانی' : 'Change Discipline & Role'}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--cpai-primary)] shrink-0" />
        <div className="flex flex-col text-start min-w-0">
          <span className="text-[10px] font-semibold text-[var(--cpai-muted)] uppercase tracking-wider leading-none">
            {lang === 'fa' ? 'دیسیپلین شما:' : 'Your Discipline:'}
          </span>
          <span className="text-xs font-bold text-[var(--cpai-text)] group-hover:text-[var(--cpai-primary-strong)] transition-colors leading-tight truncate max-w-[150px] mt-0.5">
            {lang === 'fa' ? meta.shortTitleFa : meta.shortTitleEn}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[var(--cpai-muted)] group-hover:text-[var(--cpai-primary)] transition-colors shrink-0 ms-1" />
      </button>
  );
};
