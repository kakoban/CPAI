import React, { useState } from 'react';
import { ArrowRight, User, ExternalLink, Hexagon, Film, Sliders, Sparkles, BookOpen } from 'lucide-react';
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
  currentTrack,
  onSelectTrack,
  onOpenTrackModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Protected action: if not logged in, prompt AuthModal first
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
      label: '📚 LLM به زبان آدمیزاد',
      onClick: () => onOpenBookModal?.()
    },
    {
      label: 'CPMAI Methodology',
      onClick: () => handleProtectedAction(onEnterApp)
    },
    {
      label: 'NotebookLM Lab',
      onClick: () => handleProtectedAction(onEnterApp)
    },
    {
      label: 'Infrastructure Cases',
      onClick: () => handleProtectedAction(onEnterApp)
    },
    {
      label: 'Readiness Quiz',
      onClick: () => handleProtectedAction(onGoToQuiz || onEnterApp)
    },
    {
      label: 'About OWJ',
      isExternal: true,
      href: 'https://owjbc.com/'
    }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/85 backdrop-blur-md lg:bg-white/40 lg:backdrop-blur-sm border-b border-gray-200/60 shadow-2xs font-inter">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: OWJ + CPMAI Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-white p-1.5 rounded-2xl border border-black/[0.08] shadow-xs group-hover:scale-105 transition-all">
            <img
              src={OWJ_LOGO}
              alt="OWJ Business Council"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = OWJ_LOGO_FALLBACK;
              }}
            />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-orbitron font-extrabold text-base lg:text-lg tracking-[0.14em] text-[#0A101D] group-hover:text-[#2563EB] transition-colors">
                OWJ
              </span>
              <span className="font-orbitron font-bold text-xs tracking-wider text-[#2563EB]">
                AI·CPMAI
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#4A5568] tracking-tight">
              Business Council & AI Academy
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#4A5568]">
          {navLinks.map((item, idx) =>
            item.isExternal ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#0A101D] transition-colors duration-200 group"
              >
                <span>{item.label}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="hover:text-[#0A101D] transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Right: User Authentication & Start Button */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Industry Track Switcher */}
          {currentTrack && onSelectTrack && (
            <IndustryTrackSwitcher
              currentTrack={currentTrack}
              onSelectTrack={onSelectTrack}
              onOpenSelectorModal={onOpenTrackModal}
              className="hidden xl:inline-flex"
            />
          )}

          {/* LLM Book Modal Trigger */}
          {onOpenBookModal && (
            <button
              onClick={onOpenBookModal}
              title="کتابچه جامع: مدل‌های زبانی بزرگ (LLM) به زبان آدمیزاد"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0A101D] hover:bg-black/5 hover:text-emerald-700 transition-all cursor-pointer border border-emerald-500/30 bg-gradient-to-r from-emerald-50/90 to-teal-50/90 shadow-2xs group"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-emerald-800">LLM به زبان آدمیزاد</span>
            </button>
          )}

          {/* AJA Brand Experience Intro Trigger */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Experience AJA Cinematic Brand Intro"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0A101D] hover:bg-black/5 hover:text-cyan-700 transition-all cursor-pointer border border-cyan-400/40 bg-gradient-to-r from-cyan-50/80 to-sky-50/80 shadow-2xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 group-hover:rotate-45 transition-transform" />
              <span className="font-mono tracking-wider font-bold text-cyan-800">AJA INTRO</span>
            </button>
          )}

          {/* Media Customizer Trigger */}
          {onOpenMediaCustomizer && (
            <button
              onClick={onOpenMediaCustomizer}
              title="Customize Background Motion Media"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0A101D] hover:bg-black/5 hover:text-[#2563EB] transition-all cursor-pointer border border-gray-200/80 bg-white/60 shadow-2xs group"
            >
              <Film className="w-3.5 h-3.5 text-[#2563EB] group-hover:rotate-12 transition-transform" />
              <span>Media</span>
            </button>
          )}

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#0A101D] hover:bg-black/5 transition-all cursor-pointer border border-gray-200/80"
          >
            {currentUser ? (
              <span className="flex items-center gap-1.5 text-[#2563EB] font-bold">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[130px] truncate">{currentUser.displayName}</span>
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <button
            onClick={() => handleProtectedAction(onEnterApp)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group active:scale-95"
          >
            <span>Start CPMAI</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger & CTA */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={() => handleProtectedAction(onEnterApp)}
            className="px-3 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold"
          >
            Workbook
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#0A101D] focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
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
        <div className="fixed inset-0 top-20 bg-white/95 backdrop-blur-md z-40 lg:hidden flex flex-col justify-between p-7 animate-fadeIn">
          <div className="flex flex-col gap-5 pt-4 text-lg font-bold text-[#0A101D]">
            {navLinks.map((item, idx) =>
              item.isExternal ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    item.onClick?.();
                  }}
                  className="text-left py-2 hover:text-[#2563EB] transition-colors border-b border-gray-100"
                >
                  {item.label}
                </button>
              )
            )}

            <div className="pt-2 space-y-2">
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

              {onOpenBookModal && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBookModal();
                  }}
                  className="w-full flex items-center justify-between py-2 text-left font-semibold text-emerald-800"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>کتابچه: LLM به زبان آدمیزاد</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-600">مطالعه →</span>
                </button>
              )}

              {onReplayIntro && (
                <button
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMediaCustomizer();
                  }}
                  className="w-full flex items-center justify-between py-2 text-left font-semibold text-[#0A101D] border-b border-gray-100"
                >
                  <span className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#2563EB]" />
                    <span>Customize Background Media</span>
                  </span>
                  <Sliders className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-left font-semibold text-[#0A101D]"
              >
                {currentUser ? `Account: ${currentUser.displayName}` : 'Sign In / Register'}
              </button>
            </div>
          </div>

          <div className="space-y-3 pb-6">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleProtectedAction(onEnterApp);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#2563EB] text-white text-sm font-semibold shadow-lg"
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
