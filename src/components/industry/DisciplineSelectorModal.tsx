import React, { useState } from 'react';
import {
  DisciplineId,
  IndustryTrackId,
  EngineeringRoleId,
  saveDiscipline,
  saveRole
} from '../../types/industryTrack';
import { getDisciplinesByTrack } from '../../data/disciplineExamplesRegistry';
import {
  X,
  Check,
  Layers,
  UserCheck,
  Building2,
  Factory,
  Briefcase,
  Sliders,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface DisciplineSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: IndustryTrackId;
  currentDiscipline: DisciplineId;
  currentRole: EngineeringRoleId;
  onSelectDiscipline: (disciplineId: DisciplineId) => void;
  onSelectRole: (roleId: EngineeringRoleId) => void;
  lang?: 'fa' | 'en';
}

export const DisciplineSelectorModal: React.FC<DisciplineSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  currentDiscipline,
  currentRole,
  onSelectDiscipline,
  onSelectRole,
  lang = 'fa'
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>(currentDiscipline);
  const [selectedRole, setSelectedRole] = useState<EngineeringRoleId>(currentRole);

  if (!isOpen) return null;

  const disciplines = getDisciplinesByTrack(currentTrack);

  const roles = [
    {
      id: 'director' as EngineeringRoleId,
      titleFa: 'مدیر طرح / مدیر ارشد پروژه',
      titleEn: 'Project Director / Executive PM',
      descFa: 'تصمیم‌گیری کلان سبد پروژه، مدل‌های مالی BOT/PPP، مناقصات و حاکمیت کلیم',
      descEn: 'Strategic portfolio decisions, BOT/PPP models, executive claims governance'
    },
    {
      id: 'lead_superintendent' as EngineeringRoleId,
      titleFa: 'سرپرست دیسیپلین / رئیس کارگاه',
      titleEn: 'Discipline Lead / Superintendent',
      descFa: 'راهبری عملیات اجرایی کارگاه، تخصیص منابع ماشین‌آلات و مدیریت پیمانکاران جزء',
      descEn: 'Field site supervision, heavy plant deployment, subcontractor management'
    },
    {
      id: 'technical_engineer' as EngineeringRoleId,
      titleFa: 'مهندس دفتر فنی / کنترل پروژه / ناظر',
      titleEn: 'Technical Office & Controls Engineer',
      descFa: 'متره و برآورد، تهیه صورت‌وضعیت‌ها، لایحه تاخیرات ماده ۳۰، مدلسازی BIM و شاپ',
      descEn: 'Quantity surveying, IPC audits, delay claim briefs, BIM coordination'
    },
    {
      id: 'site_operator' as EngineeringRoleId,
      titleFa: 'اپراتور، جنرال فورمن و بازرس کیفی',
      titleEn: 'Site Operator, Foreman & Inspector',
      descFa: 'کابین هدایت TBM، پایپینگ، جوشکاری و NDT، کنترل لوپ‌های DCS و پرمیت کارگاهی',
      descEn: 'TBM cabin pilot, piping fit-up, NDT film inspection, DCS loop checks'
    }
  ];

  const handleApply = () => {
    onSelectDiscipline(selectedDiscipline);
    saveDiscipline(selectedDiscipline);
    onSelectRole(selectedRole);
    saveRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#131b20] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden text-[#1c2830] dark:text-[#e8ebe9]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-[#f8faf9] dark:bg-[#162026]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6]">
              {currentTrack === 'CIVIL_INFRA' ? (
                <Building2 className="w-6 h-6" />
              ) : (
                <Factory className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                <span>{lang === 'fa' ? 'انتخاب دیسیپلین تخصصی و رده سازمانی' : 'Discipline & Organizational Role Selection'}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6]">
                  {currentTrack === 'CIVIL_INFRA' ? 'هلدینگ راه و شهرسازی' : 'هلدینگ پتروشیمی و پالایشگاه'}
                </span>
              </h3>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                {lang === 'fa'
                  ? 'بر اساس ساختار سازمانی (OBS) مرجع، دیسیپلین و رده خود را انتخاب کنید تا مثال‌ها و تمرین‌ها اختصاصی شوند.'
                  : 'Select your OBS discipline & hierarchical role to customize CPMAI examples and worksheets.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1: DISCIPLINES GRID */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
                <span>{lang === 'fa' ? '۱. دیسیپلین و واحد سازمانی تخصصی شما:' : '1. Select Your Discipline:'}</span>
              </label>
              <span className="text-[11px] text-gray-400 font-mono">
                {disciplines.length} {lang === 'fa' ? 'دیسیپلین استاندارد' : 'Disciplines'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {disciplines.map((d) => {
                const isSelected = selectedDiscipline === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDiscipline(d.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'border-[#1f5163] dark:border-[#6fb3c6] bg-[#1f5163]/5 dark:bg-[#6fb3c6]/10 ring-2 ring-[#1f5163]/20 shadow-sm'
                        : 'border-black/5 dark:border-white/5 bg-[#fcfdfd] dark:bg-[#182329] hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                          {lang === 'fa' ? d.titleFa : d.titleEn}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#1f5163] dark:bg-[#6fb3c6] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] line-clamp-2 leading-relaxed">
                        {lang === 'fa' ? d.descriptionFa : d.descriptionEn}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
                      {d.performanceMetricsFa.slice(0, 2).map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/[0.03] dark:bg-white/[0.05] text-[#5d6b73] dark:text-[#9aa8b0]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: ROLES */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#b87333] dark:text-[#c98344]" />
              <span>{lang === 'fa' ? '۲. رده سازمانی و مسئولیت شما:' : '2. Select Your Role:'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#b87333] dark:border-[#c98344] bg-[#b87333]/5 dark:bg-[#c98344]/10 ring-2 ring-[#b87333]/20 shadow-sm'
                        : 'border-black/5 dark:border-white/5 bg-[#fcfdfd] dark:bg-[#182329] hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                        {lang === 'fa' ? r.titleFa : r.titleEn}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#b87333] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
                      {lang === 'fa' ? r.descFa : r.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-5 border-t border-black/5 dark:border-white/5 bg-[#f8faf9] dark:bg-[#162026]">
          <span className="text-xs text-gray-400 font-mono">
            {lang === 'fa' ? 'ذخیره‌سازی پایدار در مرورگر' : 'Persistent in LocalStorage'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-black/5 transition-colors"
            >
              {lang === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1f5163] hover:bg-[#163c4a] text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'fa' ? 'اعمال دیسیپلین و سفارشی‌سازی' : 'Apply & Customize'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
