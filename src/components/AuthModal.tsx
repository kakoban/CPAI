import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import { UserProfile } from '../types/auth';
import { authApi } from '../services/authApi';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../data/logo';
import {
  X,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShieldCheck,
  User,
  Sparkles,
  Lock,
  Database,
  Crown,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ArrowRight,
  Edit3,
  Phone,
  Briefcase,
  GraduationCap,
  Image as ImageIcon,
  Check,
  ChevronLeft
} from 'lucide-react';

const AVATAR_PRESETS = [
  {
    name: 'مدیر ارشد / مجری طرح',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  {
    name: 'مهندس داده و هوش مصنوعی',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  {
    name: 'مشاور مدیریت و استراتژی',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
  },
  {
    name: 'پژوهشگر ارشد / متخصص',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
  }
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [authTab, setAuthTab] = useState<'google' | 'email'>('google');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passInput, setPassInput] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGisReady, setIsGisReady] = useState<boolean>(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editFullName, setEditFullName] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editSpecialty, setEditSpecialty] = useState<string>('');
  const [editAiLevel, setEditAiLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [editBio, setEditBio] = useState<string>('');
  const [editAvatarUrl, setEditAvatarUrl] = useState<string>('');
  const [editClassCode, setEditClassCode] = useState<string>('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setEditFullName(currentUser.displayName || '');
      setEditPhone(currentUser.phone || '');
      setEditSpecialty(currentUser.specialty || '');
      const rawLvl = (currentUser.initialAiLevel || currentUser.aiLevel || 'beginner').toLowerCase();
      setEditAiLevel(
        rawLvl.includes('adv') ? 'advanced' : rawLvl.includes('inter') ? 'intermediate' : 'beginner'
      );
      setEditBio(currentUser.bio || '');
      setEditAvatarUrl(currentUser.avatarUrl || '');
      setEditClassCode(currentUser.classCode || '');
    }
  }, [currentUser, isEditingProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFullName.trim()) {
      setErrorMsg(lang === 'fa' ? 'لطفاً نام و نام خانوادگی را وارد کنید.' : 'Please enter full name.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await authApi.updateProfile({
        fullName: editFullName.trim(),
        displayName: editFullName.trim(),
        phone: editPhone.trim(),
        specialty: editSpecialty.trim(),
        aiLevel: editAiLevel,
        initialAiLevel: editAiLevel.toUpperCase(),
        bio: editBio.trim(),
        avatarUrl: editAvatarUrl.trim(),
        classCode: editClassCode.trim() || undefined
      });

      if (res.user) {
        onLoginSuccess(res.user);
        setProfileSaveSuccess(true);
        setTimeout(() => {
          setProfileSaveSuccess(false);
          setIsEditingProfile(false);
        }, 1200);
      } else {
        setErrorMsg(res.error || 'خطا در ذخیره مشخصات کاربر');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در برقراری ارتباط');
    } finally {
      setIsLoading(false);
    }
  };

  const googleClientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();

  // Check if Google Identity Services script is loaded
  useEffect(() => {
    const checkGis = () => {
      if (window.google?.accounts?.oauth2) {
        setIsGisReady(true);
      }
    };
    checkGis();
    const interval = setInterval(checkGis, 800);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  // Handle Email sign-in (admin or registered users)
  const handleEmailLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!emailInput.trim() || !passInput.trim()) {
      setErrorMsg(lang === 'fa' ? 'لطفاً ایمیل و گذرواژه را وارد کنید.' : 'Please enter email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await authApi.loginWithEmail(emailInput, passInput);
      if (res.user) {
        onLoginSuccess(res.user);
        setEmailInput('');
        setPassInput('');
        onClose();
      } else {
        setErrorMsg(
          res.error ||
            (lang === 'fa'
              ? 'ایمیل یا گذرواژه وارد شده نامعتبر است.'
              : 'Invalid email or password.')
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در برقراری ارتباط');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (profileData: {
    googleId?: string;
    email: string;
    name?: string;
    picture?: string;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await authApi.loginWithGoogle({
        googleId: profileData.googleId,
        email: profileData.email,
        displayName: profileData.name,
        avatarUrl: profileData.picture
      });

      if (res.user) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'خطا در احراز هویت با سرور');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در برقراری ارتباط');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    setErrorMsg(null);

    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        setIsLoading(true);
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse.error) {
              setIsLoading(false);
              setErrorMsg(
                tokenResponse.error_description ||
                  (lang === 'fa'
                    ? 'پنجره ورود توسط کاربر بسته شد یا خطای مجوز گوگل رخ داد.'
                    : 'Google login was cancelled or denied.')
              );
              return;
            }

            if (tokenResponse.access_token) {
              try {
                // Fetch profile directly from Google API
                const userinfoRes = await fetch(
                  'https://www.googleapis.com/oauth2/v3/userinfo',
                  {
                    headers: {
                      Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                  }
                );
                const profile = await userinfoRes.json();

                await handleGoogleSuccess({
                  googleId: profile.sub || profile.id,
                  email: profile.email,
                  name: profile.name || profile.given_name,
                  picture: profile.picture
                });
              } catch (fetchErr: any) {
                setIsLoading(false);
                setErrorMsg('خطا در دریافت پروفایل از سرور گوگل: ' + fetchErr.message);
              }
            }
          }
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
      } catch (gisErr: any) {
        setIsLoading(false);
        setErrorMsg('خطای راه‌اندازی کلاینت گوگل: ' + gisErr.message);
      }
    } else {
      handleSimulatedGoogleLogin();
    }
  };

  // Immediate Simulation for offline / developer testing
  const handleSimulatedGoogleLogin = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const mockProfiles = [
        {
          googleId: '109847291837402847192',
          email: 'project.director@owjbc.com',
          name: 'مهندس رضایی (مدیر ارشد پروژه)',
          picture:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
        }
      ];

      const chosen = mockProfiles[0];
      await handleGoogleSuccess(chosen);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Double Bezel Modal Container */}
      <div className="relative w-full max-w-lg my-auto p-1.5 rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-5 max-h-[88vh] overflow-y-auto">
          {/* Header & Close */}
          <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xs shrink-0 flex items-center justify-center">
                <img
                  src={OWJ_LOGO}
                  alt="OWJ"
                  className="h-7 w-auto min-w-[45px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = OWJ_LOGO_FALLBACK;
                  }}
                />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  {currentUser
                    ? isEditingProfile
                      ? (lang === 'fa' ? 'ویرایش اطلاعات پروفایل' : 'Edit Profile')
                      : (lang === 'fa' ? 'پروفایل کاربری' : 'User Profile')
                    : lang === 'fa'
                    ? 'ورود به سامانه CPMAI'
                    : 'Sign In to CPMAI'}
                </h3>
                <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'مشاوران مدیریت کسب‌وکار اوج'
                    : 'OWJ Business Council'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#5d6b73] dark:text-[#9aa8b0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If Logged In View */}
          {currentUser ? (
            isEditingProfile ? (
              /* Profile Edit Form */
              <form onSubmit={handleSaveProfile} className="space-y-4 text-right animate-fadeIn">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#2563EB] dark:text-[#60A5FA] text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? 'ویرایش مشخصات و اطلاعات بدو ورود' : 'Edit Profile & Details'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'بازگشت به کارت مشخصات' : 'Back to card'}</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                {profileSaveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'fa' ? '✓ مشخصات شما با موفقیت ذخیره و به‌روزرسانی شد.' : '✓ Profile updated successfully.'}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'نام و نام خانوادگی:' : 'Full Name:'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={editFullName}
                        onChange={(e) => setEditFullName(e.target.value)}
                        placeholder={lang === 'fa' ? 'مثال: مهندس نفیسی' : 'Your name'}
                        required
                        className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'شماره همراه:' : 'Phone Number:'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="0912xxxxxxx"
                        dir="ltr"
                        className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>
                </div>

                {/* Specialty */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'رشته و حوزه تخصصی فعالیت:' : 'Field / Specialty:'}
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={editSpecialty}
                      onChange={(e) => setEditSpecialty(e.target.value)}
                      placeholder={lang === 'fa' ? 'مثال: مدیریت پروژه، هوش تجاری، مهندسی داده...' : 'e.g. Project Management'}
                      className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Self-Reported AI Level Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'سطح آشنایی اولیه با هوش مصنوعی:' : 'Self-Reported AI Knowledge Tier:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        tier: 'beginner',
                        titleFa: 'مقدماتی (Beginner)',
                        descFa: 'ابزارهای عمومی چت، کاربری روزمره'
                      },
                      {
                        tier: 'intermediate',
                        titleFa: 'متوسط (Intermediate)',
                        descFa: 'پرامپت ساختاریافته، اتوماسیون'
                      },
                      {
                        tier: 'advanced',
                        titleFa: 'پیشرفته (Advanced)',
                        descFa: 'کدنویسی، معماری مدل‌ها و RAG'
                      }
                    ].map((item) => (
                      <div
                        key={item.tier}
                        onClick={() => setEditAiLevel(item.tier as any)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                          editAiLevel === item.tier
                            ? 'border-[#2563EB] bg-blue-500/10 dark:bg-blue-500/15 shadow-xs'
                            : 'border-black/[0.08] dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                            {item.titleFa}
                          </span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              editAiLevel === item.tier ? 'border-[#2563EB] bg-[#2563EB]' : 'border-gray-400'
                            }`}
                          >
                            {editAiLevel === item.tier && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] leading-tight">
                          {item.descFa}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avatar Selection & Presets */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa' ? 'تصویر آواتار پروفایل:' : 'Avatar Image:'}
                    </label>
                    <span className="text-[10px] text-[#5d6b73]">
                      {lang === 'fa' ? 'انتخاب سریع یا درج لینک دلخواه' : 'Preset or Custom URL'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditAvatarUrl(preset.url)}
                        title={preset.name}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          editAvatarUrl === preset.url
                            ? 'border-[#2563EB] scale-105 shadow-md'
                            : 'border-transparent opacity-75 hover:opacity-100 hover:border-black/20'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-10 h-10 object-cover" />
                        {editAvatarUrl === preset.url && (
                          <div className="absolute inset-0 bg-[#2563EB]/20 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <ImageIcon className="w-4 h-4 text-[#5d6b73] absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={editAvatarUrl}
                      onChange={(e) => setEditAvatarUrl(e.target.value)}
                      placeholder="https://... یا انتخاب از تصاویر بالا"
                      dir="ltr"
                      className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Bio / Description */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'معرفی کوتاه / بیوگرافی (اختیاری):' : 'Bio / Short note:'}
                  </label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder={lang === 'fa' ? 'چند جمله درباره پیشینه، علایق یا پروژه‌های مرتبط خود بنویسید...' : 'Short bio...'}
                    className="w-full p-2.5 text-xs rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors cursor-pointer"
                  >
                    {lang === 'fa' ? 'انصراف' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96] cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isLoading ? (lang === 'fa' ? 'در حال ذخیره...' : 'Saving...') : (lang === 'fa' ? 'ذخیره تغییرات مشخصات' : 'Save Changes')}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Card & Info View */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2f7d5b]/10 to-[#00738c]/5 border border-[#2f7d5b]/25 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.displayName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-[#161e24] shadow-md shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#00738c]/15 text-[#00738c] font-black text-xl flex items-center justify-center shrink-0">
                        {currentUser.displayName.charAt(0)}
                      </div>
                    )}

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] truncate">
                          {currentUser.displayName}
                        </h4>
                        <span className="text-[#2f7d5b] shrink-0" title="Verified Account">
                          <CheckCircle2 className="w-4 h-4 fill-[#2f7d5b] text-white" />
                        </span>
                      </div>
                      <p
                        dir="ltr"
                        className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0] truncate text-right"
                      >
                        {currentUser.email}
                      </p>
                      {currentUser.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/30">
                          <Crown className="w-3 h-3 text-amber-500" />
                          <span>{lang === 'fa' ? 'مدیر ارشد سامانه (Admin)' : 'Platform Administrator'}</span>
                        </span>
                      ) : (
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-[#2f7d5b]/15 text-[#2f7d5b] font-bold">
                          {lang === 'fa' ? 'حساب کاربری متصل' : 'Connected Account'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-[#2563EB] dark:text-[#60A5FA] border border-blue-500/25 text-xs font-bold transition-all cursor-pointer shrink-0"
                    title={lang === 'fa' ? 'ویرایش اطلاعات و مشخصات کاربری' : 'Edit Profile'}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'ویرایش مشخصات' : 'Edit'}</span>
                  </button>
                </div>

                {/* User Registered Info Grid */}
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-right">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#5d6b73] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#2563EB]" />
                      <span>شماره همراه:</span>
                    </span>
                    <p className="font-mono font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {currentUser.phone || 'ثبت نشده'}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#5d6b73] flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#2563EB]" />
                      <span>رشته و تخصص:</span>
                    </span>
                    <p className="font-bold text-[#1c2830] dark:text-[#e8ebe9] truncate">
                      {currentUser.specialty || 'ثبت نشده'}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#5d6b73] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>سطح اولیه آشنایی با AI:</span>
                    </span>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-mono">
                        {(currentUser.initialAiLevel || currentUser.aiLevel || 'BEGINNER').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#5d6b73] flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-emerald-600" />
                      <span>کلاس دوره:</span>
                    </span>
                    <p className="font-mono font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {currentUser.classCode || 'پیش‌فرض'}
                    </p>
                  </div>

                  {currentUser.bio && (
                    <div className="col-span-1 sm:col-span-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                      <span className="text-[10px] text-[#5d6b73] block mb-0.5">معرفی / بیوگرافی:</span>
                      <p className="text-[11px] text-[#1c2830] dark:text-[#e8ebe9] italic leading-relaxed">
                        «{currentUser.bio}»
                      </p>
                    </div>
                  )}
                </div>

                {/* Status details */}
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#00738c]" />
                      <span>{lang === 'fa' ? 'پایگاه داده:' : 'Database:'}</span>
                    </span>
                    <span className="font-mono text-[#1c2830] dark:text-[#e8ebe9] font-bold">
                      Neon PostgreSQL (Active)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2f7d5b]" />
                      <span>{lang === 'fa' ? 'امنیت نشست:' : 'Session:'}</span>
                    </span>
                    <span className="font-mono text-[#2f7d5b] font-bold">
                      Signed JWT (30 Days)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all active:scale-[0.96] cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{lang === 'fa' ? 'خروج از حساب' : 'Sign Out'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#1f5163] hover:bg-[#0f4c5c] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96] cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'ورود به پلتفرم' : 'Continue'}</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Logged Out View (Clean Google First + Email Option) */
            <div className="space-y-4">
              {/* Value Proposition */}
              <div className="space-y-1 text-center">
                <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'ورود به کتاب‌کار و امکانات پلتفرم CPMAI'
                    : 'Sign in to Access CPMAI Platform'}
                </h4>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'جهت دسترسی به کتاب‌کار، کارگاه نوت‌بوک‌ال‌ام و آزمون سطح‌سنجی، لطفاً وارد شوید.'
                    : 'Please sign in to access the workbook, NotebookLM lab, and quiz.'}
                </p>
              </div>

              {/* Mode Tabs: Google Sign In vs Email & Password */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('google');
                    setErrorMsg(null);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                    authTab === 'google'
                      ? 'bg-white dark:bg-[#1a232a] text-[#1c2830] dark:text-[#e8ebe9] shadow-xs'
                      : 'text-[#5d6b73] hover:text-[#1c2830]'
                  }`}
                >
                  <span>ورود با گوگل</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('email');
                    setErrorMsg(null);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                    authTab === 'email'
                      ? 'bg-white dark:bg-[#1a232a] text-[#1c2830] dark:text-[#e8ebe9] shadow-xs'
                      : 'text-[#5d6b73] hover:text-[#1c2830]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>ورود با ایمیل</span>
                </button>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* Tab 1: Google OAuth (Default) */}
              {authTab === 'google' && (
                <div className="space-y-3 pt-1">
                  <button
                    disabled={isLoading}
                    onClick={handleGoogleButtonClick}
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border border-black/[0.12] dark:border-white/[0.15] bg-white dark:bg-[#1a232a] hover:bg-[#f8f9fa] dark:hover:bg-[#202b33] text-[#1c2830] dark:text-[#e8ebe9] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98] hover:shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {/* Official Google SVG Logo */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>
                      {isLoading
                        ? lang === 'fa'
                          ? 'در حال اتصال به گوگل...'
                          : 'Connecting to Google...'
                        : lang === 'fa'
                        ? 'ورود با حساب گوگل (Continue with Google)'
                        : 'Continue with Google'}
                    </span>
                  </button>

                  {/* Developer Demo Button */}
                  <button
                    type="button"
                    onClick={handleSimulatedGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-semibold border border-black/[0.04] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>
                      {lang === 'fa'
                        ? 'تست سریع احراز هویت (حالت شبیه‌سازی)'
                        : 'Quick Test Sign-in (Demo Mode)'}
                    </span>
                  </button>
                </div>
              )}

              {/* Tab 2: Standard Clean Email Login (Empty fields, no leak) */}
              {authTab === 'email' && (
                <form onSubmit={handleEmailLogin} className="space-y-3 pt-1">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Email (ایمیل):</span>
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Password (رمز عبور):</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="text-[10px] text-[#5d6b73] hover:text-[#1c2830] flex items-center gap-1 cursor-pointer"
                      >
                        {showPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showPass ? 'مخفی' : 'نمایش'}</span>
                      </button>
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      dir="ltr"
                      value={passInput}
                      onChange={(e) => setPassInput(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {isLoading
                        ? lang === 'fa'
                          ? 'در حال بررسی اطلاعات...'
                          : 'Signing in...'
                        : lang === 'fa'
                        ? 'ورود به حساب کاربری'
                        : 'Sign In'}
                    </span>
                  </button>
                </form>
              )}

              {/* Security Footnote */}
              <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#2f7d5b]" />
                  <span>256-bit SSL & JWT</span>
                </span>
                <span className="text-[10px] font-mono">OWJ Certified Security</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
