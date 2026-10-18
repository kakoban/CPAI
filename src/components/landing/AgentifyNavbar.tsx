import React, { useState } from 'react';
import { ArrowRight, User, ExternalLink, Hexagon, Film, Sliders } from 'lucide-react';
import { UserProfile } from '../../types/auth';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../../data/logo';

interface AgentifyNavbarProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onGoToQuiz?: () => void;
  onOpenMediaCustomizer?: () => void;
}

export const AgentifyNavbar: React.FC<AgentifyNavbarProps> = ({
  onEnterApp,
  onOpenAuth,
  currentUser,
  onGoToQuiz,
  onOpenMediaCustomizer
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
        <div className="hidden lg:flex items-center gap-3">
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
                    item.onClick();
                  }}
                  className="text-left py-2 hover:text-[#2563EB] transition-colors border-b border-gray-100"
                >
                  {item.label}
                </button>
              )
            )}

            <div className="pt-2 space-y-2">
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
