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
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#c3d4d4] dark:border-[#274347] bg-[#f8fbfa]/80 dark:bg-[#0f1f22]/80 backdrop-blur-md hover:border-[#d98a1f] dark:hover:border-[#f0b04a] hover:bg-[#fdf0d8]/30 transition-all shadow-2xs group cursor-pointer text-start ${className}`}
      title={lang === 'fa' ? 'تغییر دیسیپلین و رده سازمانی' : 'Change Discipline & Role'}
    >
      <div className="w-2 h-2 rounded-full bg-[#d98a1f] animate-pulse shrink-0" />
      <div className="flex flex-col text-start min-w-0">
        <span className="text-[10px] font-semibold text-[#587479] dark:text-[#8ca8ab] uppercase tracking-wider leading-none">
          {lang === 'fa' ? 'دیسیپلین شما:' : 'Your Discipline:'}
        </span>
        <span className="text-xs font-bold text-[#12343b] dark:text-[#e4f0ee] group-hover:text-[#d98a1f] dark:group-hover:text-[#f0b04a] transition-colors leading-tight truncate max-w-[150px] mt-0.5">
          {lang === 'fa' ? meta.shortTitleFa : meta.shortTitleEn}
        </span>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-[#587479] group-hover:text-[#d98a1f] transition-colors shrink-0 ms-1" />
    </button>
  );
};
