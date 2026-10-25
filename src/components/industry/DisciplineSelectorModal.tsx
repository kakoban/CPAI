import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Building2,
  Factory,
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

const spring = { type: 'spring', stiffness: 260, damping: 20, mass: 0.9 } as const;
const springSnappy = { type: 'spring', stiffness: 420, damping: 28 } as const;
const SHIFT = 10;
const R_REST = 16;
const R_HOVER = 22;

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setSelectedDiscipline(currentDiscipline);
    setSelectedRole(currentRole);
  }, [currentDiscipline, currentRole, isOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const disciplines = getDisciplinesByTrack(currentTrack);
  const isRtl = lang === 'fa';
  const isEveryday = currentTrack === 'GENERAL_EVERYDAY';

  // Side A (Disciplines, right side in RTL = +x shift):
  const colASign = isMobile ? 0 : isRtl ? 1 : -1;
  const colARestRadius = isMobile
    ? '14px'
    : isRtl
    ? `0 ${R_REST}px ${R_REST}px 0`
    : `${R_REST}px 0 0 ${R_REST}px`;

  // Side B (Roles, left side in RTL = -x shift):
  const colBSign = isMobile ? 0 : isRtl ? -1 : 1;
  const colBRestRadius = isMobile
    ? '14px'
    : isRtl
    ? `${R_REST}px 0 0 ${R_REST}px`
    : `0 ${R_REST}px ${R_REST}px 0`;

  const roles = isEveryday
    ? [
        {
          id: 'director' as EngineeringRoleId,
          titleFa: 'سرپرست خانوار / مدیر ارشد اقتصاد خانه',
          titleEn: 'Head of Household & Family Decision Maker',
          descFa: 'مدیریت کلان بودجه و پس‌انداز خانواده، برنامه‌ریزی مسکن و سرمایه‌گذاری، تصمیم‌گیری اهداف سفر و آینده فرزندان',
          descEn: 'Macro budget stewardship, family savings, vacation funding & strategic household milestones'
        },
        {
          id: 'lead_superintendent' as EngineeringRoleId,
          titleFa: 'پدر، مادر یا هماهنگ‌کننده امور خانه',
          titleEn: 'Parent & Home Coordinator',
          descFa: 'آموزش و همراهی کودک، مدیریت سبد مصرف و مواد غذایی، سلامت و تغذیه اعضای خانواده و نظم روزانه',
          descEn: 'Child homework & emotional growth, zero-waste pantry planning, balanced family vitality'
        },
        {
          id: 'technical_engineer' as EngineeringRoleId,
          titleFa: 'فریلنسر، شاغل یا کارآفرین خرد',
          titleEn: 'Freelancer, Creator & Small Business Lead',
          descFa: 'تولید محتوا، شبکه‌های اجتماعی، بهره‌وری فردی، مذاکره و توسعه مهارت‌ها و جریان‌های درآمدی',
          descEn: 'Viral content creation, daily time-boxing, social media growth & independent income streams'
        },
        {
          id: 'site_operator' as EngineeringRoleId,
          titleFa: 'دانشجو، یادگیرنده یا جستجوگر هوش مصنوعی',
          titleEn: 'Student, Self-Learner & Everyday AI Explorer',
          descFa: 'تکالیف درسی و پژوهشی، یادگیری خودآموز، مهارت‌های نوین دیجیتال و حل هوشمند مسائل روزمره',
          descEn: 'Coursework mastery, rapid skill acquisition, homework shortcuts and hands-on AI experiments'
        }
      ]
    : [
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

  const selectedDiscMeta = disciplines.find((d) => d.id === selectedDiscipline);
  const selectedRoleMeta = roles.find((r) => r.id === selectedRole);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#08130f]/60 dark:bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Dialog Surface with Glassmorphic styling from reference */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="discipline-dialog-title"
        className="relative w-full max-w-[960px] max-h-[90vh] flex flex-col frosted-glass rounded-2xl sm:rounded-3xl shadow-[0_24px_60px_rgba(8,30,35,0.28)] overflow-hidden text-[#12343b] dark:text-[#e4f0ee]"
      >
        {/* Header (Matching reference .hd) */}
        <header className="flex items-start gap-3.5 px-6 pt-6 pb-4 border-b border-white/60 dark:border-white/10 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-[#12343b] dark:bg-[#1b3b40] text-[#f2f8f6] flex items-center justify-center shrink-0 shadow-sm">
            {currentTrack === 'CIVIL_INFRA' ? (
              <Building2 className="w-5 h-5" />
            ) : currentTrack === 'ENERGY_PETRO' ? (
              <Factory className="w-5 h-5" />
            ) : (
              <Sparkles className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1
              id="discipline-dialog-title"
              className="text-lg sm:text-xl font-black leading-snug flex flex-wrap items-center gap-2"
            >
              <span>
                {lang === 'fa'
                  ? isEveryday
                    ? 'انتخاب حوزه کاربردی و نقش شما در زندگی و خانواده'
                    : 'انتخاب دیسیپلین تخصصی و رده سازمانی'
                  : isEveryday
                  ? 'Lifestyle Focus Area & Personal / Family Role Selection'
                  : 'Discipline & Organizational Role Selection'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#eaf2f1] dark:bg-[#172d31] text-[#587479] dark:text-[#8ca8ab]">
                {currentTrack === 'CIVIL_INFRA'
                  ? (lang === 'fa' ? 'هلدینگ راه و شهرسازی' : 'Civil & Infrastructure Holding')
                  : currentTrack === 'ENERGY_PETRO'
                  ? (lang === 'fa' ? 'هلدینگ پتروشیمی و پالایشگاه' : 'Oil & Gas EPCC Holding')
                  : (lang === 'fa' ? 'سبک زندگی، خانواده و کاربردهای روزمره' : 'Family, Lifestyle & Everyday AI')}
              </span>
            </h1>
            <p className="text-xs text-[#587479] dark:text-[#8ca8ab] mt-1 leading-relaxed max-w-2xl">
              {lang === 'fa'
                ? isEveryday
                  ? 'بر اساس نیاز و جایگاه خود، حوزه تمرکز و نقش خود را انتخاب کنید تا مثال‌ها و تمرین‌ها شخصی‌سازی شوند.'
                  : 'بر اساس ساختار سازمانی (OBS) مرجع، دیسیپلین و رده خود را انتخاب کنید تا مثال‌ها و تمرین‌ها اختصاصی شوند.'
                : isEveryday
                ? 'Select your lifestyle focus area and personal/family role to customize everyday AI examples.'
                : 'Select your OBS discipline & hierarchical role to customize CPMAI examples and worksheets.'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#587479] dark:text-[#8ca8ab] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] hover:text-[#12343b] dark:hover:text-[#e4f0ee] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* 2-Column Body with Split Showcase Motion Pattern */}
        <div className="flex-1 overflow-y-auto px-6 py-5 grid grid-cols-1 md:grid-cols-[1.2fr_auto_0.8fr] gap-6 md:gap-3.5 no-scrollbar overflow-x-hidden">
          {/* Column 1: Disciplines (Side A - Outward shift away from divider) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-4.5 h-4.5 rounded-full bg-[#1e8f6b] text-white flex items-center justify-center transition-all ${
                  selectedDiscipline ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <h2 className="text-sm font-bold text-[#12343b] dark:text-[#e4f0ee]">
                {lang === 'fa'
                  ? isEveryday
                    ? '۱. حوزه کاربردی و دغدغه شما'
                    : '۱. دیسیپلین تخصصی شما'
                  : isEveryday
                  ? '1. Your Lifestyle Focus Area'
                  : '1. Your Specialized Discipline'}
              </h2>
            </div>
            <p className="text-xs text-[#587479] dark:text-[#8ca8ab]">
              {lang === 'fa'
                ? isEveryday
                  ? 'یک حوزه را انتخاب کنید؛ شاخص‌ها و ابزارهای آن در تمرین‌ها فعال می‌شوند.'
                  : 'یک حوزه را انتخاب کنید؛ شاخص‌های آن در مثال‌ها به کار می‌روند.'
                : isEveryday
                ? 'Select a lifestyle domain to tailor everyday KPIs and AI tools.'
                : 'Select a domain; its KPIs will populate your exercises and examples.'}
            </p>

            <div className="space-y-2 pt-1" role="radiogroup">
              {disciplines.map((d) => {
                const isChecked = selectedDiscipline === d.id;
                return (
                  <motion.div
                    key={d.id}
                    onClick={() => setSelectedDiscipline(d.id)}
                    initial={false}
                    style={{
                      borderRadius: isChecked ? '18px' : colARestRadius
                    }}
                    whileHover={{
                      x: colASign * SHIFT,
                      borderRadius: `${R_HOVER}px`,
                      boxShadow: '0 16px 32px -12px rgba(18, 52, 59, 0.28)',
                      zIndex: 10
                    }}
                    whileFocus={{
                      x: colASign * SHIFT,
                      borderRadius: `${R_HOVER}px`
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={spring}
                    className={`block p-3.5 border transition-colors cursor-pointer relative select-none ${
                      isChecked
                        ? 'bg-[#fdf0d8] dark:bg-[#2b2412] border-[#d98a1f] dark:border-[#f0b04a] shadow-xs'
                        : 'bg-white/60 dark:bg-white/[0.03] border-[#c3d4d4] dark:border-[#274347] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Radio Circle Indicator (.mark) */}
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#d98a1f] dark:border-[#f0b04a] bg-white dark:bg-[#0f1f22]'
                            : 'border-[#c3d4d4] dark:border-[#587479]'
                        }`}
                      >
                        {isChecked && (
                          <motion.span
                            initial={{ scale: 0.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springSnappy}
                            className="w-2.5 h-2.5 rounded-full bg-[#d98a1f] dark:bg-[#f0b04a]"
                          />
                        )}
                      </span>

                      {/* Text & Expandable Details */}
                      <div className="flex-1 min-w-0">
                        <b className="block text-xs sm:text-sm font-bold leading-snug">
                          {lang === 'fa' ? d.titleFa : d.titleEn}
                        </b>

                        {/* Accordion (.more) - expanded when checked */}
                        {isChecked && (
                          <div className="mt-2 pt-2 border-t border-[#c3d4d4]/60 dark:border-[#274347] animate-fade-in space-y-2">
                            <p className="text-xs text-[#587479] dark:text-[#8ca8ab] leading-relaxed">
                              {lang === 'fa' ? d.descriptionFa : d.descriptionEn}
                            </p>

                            {/* KPI Tags Pills (.kpi) */}
                            <div className="pt-1">
                              <span className="block text-[11px] font-semibold text-[#587479] dark:text-[#8ca8ab] mb-1.5">
                                {lang === 'fa' ? 'شاخص‌هایی که در مثال‌ها می‌بینید:' : 'KPIs populated in your examples:'}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {(lang === 'fa' ? d.performanceMetricsFa : d.performanceMetricsEn).map((kpi, kIdx) => (
                                  <span
                                    key={kIdx}
                                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-[#172d31] border border-[#c3d4d4] dark:border-[#274347] text-[#12343b] dark:text-[#e4f0ee]"
                                  >
                                    {kpi}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Vertical Dotted Divider (Split Showcase Axis) */}
          <div className="hidden md:block self-stretch border-s-2 border-dotted border-[#c3d4d4] dark:border-[#274347] my-3 mx-1" />

          {/* Column 2: Roles Ladder (Side B - Outward shift in opposite direction) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-4.5 h-4.5 rounded-full bg-[#1e8f6b] text-white flex items-center justify-center transition-all ${
                  selectedRole ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <h2 className="text-sm font-bold text-[#12343b] dark:text-[#e4f0ee]">
                {lang === 'fa'
                  ? isEveryday
                    ? '۲. نقش و جایگاه شما در زندگی و خانواده'
                    : '۲. رده سازمانی و مسئولیت شما'
                  : isEveryday
                  ? '2. Your Role in Family & Everyday Life'
                  : '2. Organizational Role & Responsibility'}
              </h2>
            </div>
            <p className="text-xs text-[#587479] dark:text-[#8ca8ab]">
              {lang === 'fa'
                ? isEveryday
                  ? 'از مدیریت بودجه خانه تا فریلنسری و یادگیری فردی.'
                  : 'از تصمیم‌گیری کلان تا اجرای میدانی.'
                : isEveryday
                ? 'From household management to freelancing and personal growth.'
                : 'From strategic executive down to site execution.'}
            </p>

            {/* Vertical Ladder (.ladder) with dashed connector line */}
            <div className="relative space-y-2 pt-1" role="radiogroup">
              {roles.map((r, rIdx) => {
                const isChecked = selectedRole === r.id;
                const isLast = rIdx === roles.length - 1;

                return (
                  <motion.div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    initial={false}
                    style={{
                      borderRadius: isChecked ? '18px' : colBRestRadius
                    }}
                    whileHover={{
                      x: colBSign * SHIFT,
                      borderRadius: `${R_HOVER}px`,
                      boxShadow: '0 16px 32px -12px rgba(18, 52, 59, 0.28)',
                      zIndex: 10
                    }}
                    whileFocus={{
                      x: colBSign * SHIFT,
                      borderRadius: `${R_HOVER}px`
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={spring}
                    className={`block p-3.5 border transition-colors cursor-pointer relative select-none ${
                      isChecked
                        ? 'bg-[#fdf0d8] dark:bg-[#2b2412] border-[#d98a1f] dark:border-[#f0b04a] shadow-xs'
                        : 'bg-white/40 dark:bg-white/[0.02] border-transparent hover:bg-[#eaf2f1] dark:hover:bg-[#172d31]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Vertical line indicator */}
                      <div className="relative flex flex-col items-center shrink-0">
                        <span
                          className={`w-5 h-5 rounded-full border-2 mt-0.5 z-10 flex items-center justify-center transition-all ${
                            isChecked
                              ? 'border-[#d98a1f] dark:border-[#f0b04a] bg-white dark:bg-[#0f1f22]'
                              : 'border-[#c3d4d4] dark:border-[#587479] bg-[#fafdfc] dark:bg-[#0f1f22]'
                          }`}
                        >
                          {isChecked && (
                            <motion.span
                              initial={{ scale: 0.3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={springSnappy}
                              className="w-2.5 h-2.5 rounded-full bg-[#d98a1f] dark:bg-[#f0b04a]"
                            />
                          )}
                        </span>
                        {!isLast && (
                          <span className="w-0.5 h-10 border-e border-dashed border-[#c3d4d4] dark:border-[#274347] absolute top-6" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <b className="block text-xs sm:text-sm font-bold leading-snug">
                          {lang === 'fa' ? r.titleFa : r.titleEn}
                        </b>
                        <p className="text-xs text-[#587479] dark:text-[#8ca8ab] mt-1 leading-relaxed">
                          {lang === 'fa' ? r.descFa : r.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer (Matching reference .ft with summary chips + actions) */}
        <footer className="px-6 py-4 border-t border-white/60 dark:border-white/10 bg-transparent relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Summary chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {selectedDiscMeta && (
              <span className="px-3 py-1 rounded-full bg-[#fdf0d8] dark:bg-[#2b2412] text-[#12343b] dark:text-[#e4f0ee] border border-[#d98a1f] dark:border-[#f0b04a] font-bold">
                {lang === 'fa' ? selectedDiscMeta.shortTitleFa : selectedDiscMeta.shortTitleEn}
              </span>
            )}
            {selectedRoleMeta && (
              <span className="px-3 py-1 rounded-full bg-[#fdf0d8] dark:bg-[#2b2412] text-[#12343b] dark:text-[#e4f0ee] border border-[#d98a1f] dark:border-[#f0b04a] font-bold">
                {lang === 'fa' ? selectedRoleMeta.titleFa.split('/')[0].trim() : selectedRoleMeta.titleEn.split('/')[0].trim()}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#587479] dark:text-[#8ca8ab] hover:bg-[#eaf2f1] dark:hover:bg-[#172d31] transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedDiscipline || !selectedRole}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#12343b] dark:bg-[#1b3b40] text-[#f2f8f6] hover:brightness-110 active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-[#d98a1f]" />
              <span>
                {lang === 'fa'
                  ? isEveryday
                    ? 'اعمال تنظیمات و شخصی‌سازی'
                    : 'اعمال دیسیپلین و سفارشی‌سازی'
                  : 'Apply & Personalize'}
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
