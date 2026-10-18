import React, { useState } from 'react';
import { UserProfile, AiFamiliarityLevel, OnboardingPayload } from '../types/auth';
import { authApi } from '../services/authApi';
import { Language } from '../types/cpmai';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../data/logo';
import {
  User,
  Phone,
  Briefcase,
  Brain,
  Cpu,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  GraduationCap
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  onComplete: (user: UserProfile) => void;
  lang: Language;
}

const SPECIALTY_PRESETS = [
  'عمران، سازه و ژئوتکنیک',
  'مدیریت ساخت و پروژه (Construction & PM)',
  'صنایع، برنامه‌ریزی و کنترل پروژه',
  'نفت، گاز، پتروشیمی و انرژی',
  'مهندسی مکانیک، تاسیسات و برق (MEP)',
  'فناوری اطلاعات، مهندسی نرم‌افزار و داده',
  'معماری و طراحی شهری',
  'امور پیمان و دعاوی قراردادی (Claims)'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentUser,
  onComplete,
  lang
}) => {
  const [fullName, setFullName] = useState<string>(
    currentUser.displayName && !currentUser.displayName.includes('@')
      ? currentUser.displayName
      : ''
  );
  const [phone, setPhone] = useState<string>(currentUser.phone || '');
  const [specialty, setSpecialty] = useState<string>(currentUser.specialty || '');
  const [classCode, setClassCode] = useState<string>(currentUser.classCode || '');
  const [aiLevel, setAiLevel] = useState<AiFamiliarityLevel>(
    currentUser.aiLevel || 'intermediate'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg('لطفاً نام و نام خانوادگی کامل خود را وارد فرمایید.');
      return;
    }

    if (!specialty.trim()) {
      setErrorMsg('لطفاً حوزه تخصص یا رشته مهندسی خود را مشخص کنید.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('لطفاً یک شماره تلفن همراه معتبر (مانند 09123456789) وارد فرمایید.');
      return;
    }

    setIsLoading(true);
    try {
      const payload: OnboardingPayload = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        specialty: specialty.trim(),
        aiLevel,
        classCode: classCode.trim() || undefined
      };

      const res = await authApi.completeOnboarding(payload);
      if (res.user) {
        onComplete(res.user);
      } else {
        setErrorMsg(res.error || 'خطا در ثبت اطلاعات. لطفاً مجدداً تلاش کنید.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در برقراری ارتباط');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Double Bezel Modal */}
      <div className="relative w-full max-w-2xl my-auto p-1.5 rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-6 sm:p-8 space-y-6 text-right">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xs">
                <img
                  src={OWJ_LOGO}
                  alt="OWJ"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = OWJ_LOGO_FALLBACK;
                  }}
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  تکمیل اطلاعات پرونده آموزشی و تعیین سطح اولیه
                </h3>
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  مشاوران مدیریت کسب‌وکار اوج · دوره جامع مدیریت پروژه‌های شناختی (CPMAI)
                </span>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
              مرحله الزامی
            </span>
          </div>

          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
            دانشجوی گرامی، جهت تنظیم هوشمند محتوای کتاب‌کار و <strong className="text-[#1c2830] dark:text-[#e8ebe9]">سفارشی‌سازی سطح سوالات آزمون ورودی</strong> متناسب با سابقه شما، لطفاً فیلدهای زیر را تکمیل فرمایید.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>نام و نام خانوادگی کامل:</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: مهندس سارا صابری"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>شماره تلفن همراه (جهت ارسال گواهینامه):</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            {/* Specialization / Engineering Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>حوزه تخصصی و رشته مهندسی:</span>
              </label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="تخصص خود را تایپ کنید یا از موارد پرتکرار زیر انتخاب نمایید..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
              />

              {/* Quick Preset Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SPECIALTY_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSpecialty(preset)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg transition-all cursor-pointer border ${
                      specialty === preset
                        ? 'bg-blue-500/15 border-blue-500 text-[#2563EB] font-bold'
                        : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Assignment / Cohort Code */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-blue-500/[0.04] dark:bg-blue-500/[0.07] border border-blue-500/15">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  <span>کد کلاس یا شناسه دوره (Class Code - اختیاری):</span>
                </label>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                  تخصیص خودکار ۲ ساعته فعال است
                </span>
              </div>
              <input
                type="text"
                dir="ltr"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                placeholder="مثال: OWJ-FALL-2026 یا خالی بگذارید برای کلاس پیش‌فرض"
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
              />
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                💡 در صورت خالی گذاشتن، سامانه هوشمند اوج به‌صورت خودکار شما را بر اساس پنجره زمانی ۲ ساعته فعلی به گروه کلاسی هم‌دوره‌ای‌های آنلاین منتسب خواهد کرد.
              </p>
            </div>

            {/* AI Familiarity Level (The Core Requirement) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>سطح آشنایی فعلی با هوش مصنوعی (مؤثر در سطح سوالات آزمون):</span>
                </label>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                  بانک آزمون با این انتخاب تطبیق می‌یابد
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Level 1: Beginner */}
                <div
                  onClick={() => setAiLevel('beginner')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    aiLevel === 'beginner'
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-xs'
                      : 'border-black/[0.08] dark:border-white/[0.1] bg-black/[0.01] hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                        <Brain className="w-4 h-4" />
                      </div>
                      {aiLevel === 'beginner' && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                        سطح ۱: مقدماتی (Beginner)
                      </h4>
                      <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
                        استفاده از چت‌بات‌های عمومی مانند ChatGPT بدون سابقه کدنویسی یا استقرار ابزارهای فنی.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    🎯 آزمون: مبانی پایه و مهار توهم هوش مصنوعی
                  </div>
                </div>

                {/* Level 2: Intermediate */}
                <div
                  onClick={() => setAiLevel('intermediate')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    aiLevel === 'intermediate'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 shadow-xs ring-1 ring-blue-500/40'
                      : 'border-black/[0.08] dark:border-white/[0.1] bg-black/[0.01] hover:border-blue-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#2563EB]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      {aiLevel === 'intermediate' && (
                        <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                          سطح ۲: متوسط (Intermediate)
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
                        پرامپت‌نویسی پیشرفته، کار با نوت‌بوک‌ال‌ام و استفاده از هوش مصنوعی در تحلیل اسناد و پروژه‌ها.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px] text-blue-700 dark:text-blue-400 font-semibold">
                    🎯 آزمون: ۷ الگوی CPMAI، RAG و متریک‌ها
                  </div>
                </div>

                {/* Level 3: Advanced */}
                <div
                  onClick={() => setAiLevel('advanced')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    aiLevel === 'advanced'
                      ? 'border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 shadow-xs'
                      : 'border-black/[0.08] dark:border-white/[0.1] bg-black/[0.01] hover:border-purple-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                        <Award className="w-4 h-4" />
                      </div>
                      {aiLevel === 'advanced' && (
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                        سطح ۳: پیشرفته (Advanced)
                      </h4>
                      <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1 leading-relaxed">
                        تسلط بر معماری مدل‌ها، API، پایپ‌لاین‌های داده، حاکمیت داده و استقرار سازمانی AI.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px] text-purple-700 dark:text-purple-400 font-semibold">
                    🎯 آزمون: Fine-Tuning، KPI فنی و مگاپروژه‌ها
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-[#5d6b73]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>اطلاعات شما با امنیت کامل ذخیره می‌گردد</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isLoading ? 'در حال ثبت پرونده...' : 'ثبت اطلاعات و ورود به آزمون سطح‌سنجی'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
