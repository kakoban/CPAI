import React from 'react';
import { DisciplineId, IndustryTrackId } from '../../types/industryTrack';
import { getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

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
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#182329]/80 backdrop-blur-xs hover:border-[#1f5163] dark:hover:border-[#6fb3c6] transition-all shadow-2xs group cursor-pointer text-right ${className}`}
      title={lang === 'fa' ? 'تغییر دیسیپلین و رده سازمانی' : 'Change Discipline & Role'}
    >
      <div className="w-2 h-2 rounded-full bg-[#1f5163] dark:bg-[#6fb3c6] animate-pulse" />
      <div className="flex flex-col text-right">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          {lang === 'fa' ? 'دیسیپلین شما:' : 'Your Discipline:'}
        </span>
        <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] group-hover:text-[#1f5163] dark:group-hover:text-[#6fb3c6] transition-colors leading-tight">
          {lang === 'fa' ? meta.shortTitleFa : meta.shortTitleEn}
        </span>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1f5163] transition-colors shrink-0" />
    </button>
  );
};
