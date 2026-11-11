import React, { useState } from 'react';
import { ArrowRight, User, ExternalLink, Film, Sliders, Sparkles, BookOpen, FileCode2 } from 'lucide-react';
import { UserProfile } from '../../types/auth';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../../data/logo';
import { IndustryTrackId } from '../../types/industryTrack';
import { IndustryTrackSwitcher } from '../industry/IndustryTrackSwitcher';

interface AgentifyNavbarProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onGoToQuiz?: () => void;
  onOpenMediaCustomizer?: () => void;
  onReplayIntro?: () => void;
  onOpenBookModal?: () => void;
  onOpenMarkdownStudio?: () => void;
  currentTrack?: IndustryTrackId;
  onSelectTrack?: (track: IndustryTrackId) => void;
  onOpenTrackModal?: () => void;
}

export const AgentifyNavbar: React.FC<AgentifyNavbarProps> = ({
  onEnterApp,
  onOpenAuth,
  currentUser,
  onGoToQuiz,
  onOpenMediaCustomizer,
  onReplayIntro,
  onOpenBookModal,
  onOpenMarkdownStudio,
  currentTrack,
  onSelectTrack,
  onOpenTrackModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleProtectedAction = (action?: () => void) => {
    if (!currentUser) {
      onOpenAuth();
    } else if (action) {
      action();
    } else {
      onEnterApp();
    }
  };

  const navLinks = [
    {
      label: 'CPMAI Methodology',
      onClick: () => handleProtectedAction(onEnterApp)
    },
    {
      label: 'Readiness Quiz',
      onClick: () => handleProtectedAction(onGoToQuiz || onEnterApp)
    },
    {
      label: 'کتابچه LLM',
      icon: BookOpen,
      onClick: () => onOpenBookModal?.()
    },
    {
      label: 'About OWJ',
      isExternal: true,
      href: 'https://owjbc.com/'
    }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-2xs font-inter">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 flex-nowrap">
        {/* Left: OWJ + CPMAI Brand Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 whitespace-nowrap"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-white p-1.5 rounded-xl border border-black/[0.08] shadow-2xs group-hover:scale-105 transition-all shrink-0">
            <img
              src={OWJ_LOGO}
              alt="OWJ Business Council"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = OWJ_LOGO_FALLBACK;
              }}
            />
          </div>

          <div className="flex flex-col text-left shrink-0">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-orbitron font-extrabold text-base tracking-[0.12em] text-[#0A101D] group-hover:text-[#e0533c] transition-colors">
                OWJ
              </span>
              <span className="font-orbitron font-bold text-[11px] tracking-wider text-[#e0533c]">
                AI·CPMAI
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#4A5568] tracking-tight whitespace-nowrap hidden sm:inline">
              Business Council & AI Academy
            </span>
          </div>
        </div>

        {/* Center: Clean Pill Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/80 shrink-0">
          {navLinks.map((item, idx) => {
            const Icon = item.icon;
            return item.isExternal ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white transition-all whitespace-nowrap shrink-0"
              >
                <span>{item.label}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ) : (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Clean, Non-Wrapping Action Bar */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap">
          {/* Compact Single-Pill Track Switcher */}
          {currentTrack && onSelectTrack && (
            <IndustryTrackSwitcher
              currentTrack={currentTrack}
              onSelectTrack={onSelectTrack}
              onOpenSelectorModal={onOpenTrackModal}
              variant="dropdown"
            />
          )}

          {/* Sleek Markdown Studio Button */}
          {onOpenMarkdownStudio && (
            <button
              type="button"
              onClick={onOpenMarkdownStudio}
              title="استودیو مارک‌دان اوج: آپلود، مرور، هایلایت ۶ رنگ و ویرایش زنده فایل‌های .md"
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-bold text-indigo-950 bg-indigo-50/90 hover:bg-indigo-600 hover:text-white border border-indigo-200/90 hover:border-indigo-600 shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <FileCode2 className="w-3.5 h-3.5 text-indigo-600 group-hover:text-amber-300 transition-colors shrink-0" />
              <span className="whitespace-nowrap">استودیو مارک‌دان</span>
            </button>
          )}

          {/* Compact Utility Icons (Intro & Media) */}
          <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                title="پخش تیزر سینمایی برند (AJA Intro)"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 border border-transparent hover:border-cyan-200 transition-all cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4 text-cyan-600" />
              </button>
            )}

            {onOpenMediaCustomizer && (
              <button
                type="button"
                onClick={onOpenMediaCustomizer}
                title="تغییر ویدیو و پس‌زمینه لندینگ (Media)"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#e0533c] hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all cursor-pointer shrink-0"
              >
                <Film className="w-4 h-4 text-[#e0533c]" />
              </button>
            )}
          </div>

          {/* User Profile / Sign In */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-semibold text-[#0A101D] bg-white/80 hover:bg-white border border-slate-200/90 shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {currentUser ? (
              <span className="flex items-center gap-1.5 text-[#0A101D] font-bold whitespace-nowrap">
                <User className="w-3.5 h-3.5 text-[#e0533c] shrink-0" />
                <span className="max-w-[110px] truncate">{currentUser.displayName}</span>
              </span>
            ) : (
              <span className="whitespace-nowrap">Sign In</span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => handleProtectedAction(onEnterApp)}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-gradient-to-r from-[#e0533c] to-[#c026d3] hover:from-[#c2410c] hover:to-[#9333ea] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Start CPMAI</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 shrink-0" />
          </button>
        </div>

        {/* Mobile Hamburger & CTA */}
        <div className="flex items-center gap-2 lg:hidden shrink-0 whitespace-nowrap">
          {onOpenMarkdownStudio && (
            <button
              type="button"
              onClick={onOpenMarkdownStudio}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
              title="استودیو مارک‌دان"
            >
              <FileCode2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="whitespace-nowrap">مارک‌دان</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleProtectedAction(onEnterApp)}
            className="h-8 px-3 rounded-full bg-gradient-to-r from-[#e0533c] to-[#c026d3] text-white text-xs font-bold whitespace-nowrap shrink-0"
          >
            Workbook
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-[#0A101D] focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-[#0A101D] rounded-full transition-all duration-300 transform origin-left ${
                  isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#0A101D] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#0A101D] rounded-full transition-all duration-300 transform origin-left ${
                  isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white/95 backdrop-blur-md z-40 lg:hidden flex flex-col justify-between p-6 animate-fadeIn overflow-y-auto">
          <div className="flex flex-col gap-3 pt-2 text-base font-bold text-[#0A101D]">
            {navLinks.map((item, idx) =>
              item.isExternal ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 border-b border-gray-100"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ) : (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    item.onClick?.();
                  }}
                  className="text-left py-2.5 hover:text-[#e0533c] transition-colors border-b border-gray-100"
                >
                  {item.label}
                </button>
              )
            )}

            <div className="pt-2 space-y-2.5">
              {currentTrack && onSelectTrack && (
                <div className="pb-2 mb-2 border-b border-gray-100 flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-gray-500 text-right">حوزه تخصصی مگاپروژه‌ها:</span>
                  <IndustryTrackSwitcher
                    currentTrack={currentTrack}
                    onSelectTrack={onSelectTrack}
                    onOpenSelectorModal={onOpenTrackModal}
                    className="w-full justify-between"
                  />
                </div>
              )}

              {onOpenMarkdownStudio && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMarkdownStudio();
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-indigo-50 text-left font-bold text-indigo-900 border border-indigo-200"
                >
                  <span className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-indigo-600" />
                    <span>استودیو مارک‌دان اوج (آپلود، مرور و ویرایش)</span>
                  </span>
                  <span className="text-xs font-mono text-indigo-600">ورود ←</span>
                </button>
              )}

              {onReplayIntro && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full flex items-center justify-between py-2 text-left font-semibold text-cyan-800"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span>AJA Cinematic Brand Intro</span>
                  </span>
                  <span className="text-xs font-mono text-cyan-600">PLAY →</span>
                </button>
              )}

              {onOpenMediaCustomizer && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMediaCustomizer();
                  }}
                  className="w-full flex items-center justify-between py-2 text-left font-semibold text-[#0A101D] border-b border-gray-100"
                >
                  <span className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#e0533c]" />
                    <span>Customize Background Media</span>
                  </span>
                  <Sliders className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2 text-left font-semibold text-[#0A101D]"
              >
                {currentUser ? `Account: ${currentUser.displayName}` : 'Sign In / Register'}
              </button>
            </div>
          </div>

          <div className="space-y-3 pb-4">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleProtectedAction(onEnterApp);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#e0533c] text-white text-sm font-semibold shadow-lg"
            >
              <span>Access CPMAI Workbook</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
