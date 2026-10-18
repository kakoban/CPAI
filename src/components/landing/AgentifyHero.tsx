import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Cpu, Layers, ShieldCheck, Target } from 'lucide-react';

interface AgentifyHeroProps {
  onExploreSolutions: () => void;
  onWatchVideo: () => void;
  onGoToQuiz?: () => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
}

export const AgentifyHero: React.FC<AgentifyHeroProps> = ({
  onExploreSolutions,
  onWatchVideo,
  onGoToQuiz,
  isLoggedIn,
  onOpenAuth
}) => {
  const handleProtectedClick = (action: () => void) => {
    if (!isLoggedIn) {
      onOpenAuth();
    } else {
      action();
    }
  };

  return (
    <div
      dir="ltr"
      className="relative z-10 w-full lg:w-[58%] min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-28 pb-16 bg-white/90 lg:bg-transparent transition-colors text-left font-inter"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-8 max-w-2xl"
      >
        {/* 1. Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gray-300 bg-white/70 backdrop-blur-xs shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
          <span className="font-inter text-[11px] font-bold text-gray-600 uppercase tracking-[0.16em]">
            OWJ BUSINESS COUNCIL · COGNITIVE PROJECT MANAGEMENT (CPMAI)
          </span>
        </div>

        {/* 2. Cybernetic Headline */}
        <h1 className="font-orbitron font-black text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-0.02em] text-[#0A101D]">
          COGNITIVE AI <br className="hidden sm:inline" />
          <span className="text-[#60A5FA]">THAT POWERS</span> <br className="hidden sm:inline" />
          MEGAPROJECTS<span className="text-[#2563EB]">.</span>
        </h1>

        {/* 3. Subheading */}
        <p className="text-base sm:text-[17px] text-[#4A5568] leading-relaxed max-w-xl">
          OWJ Business Council empowers infrastructure, metro, and energy project leaders with Cognitive Project Management for AI (CPMAI). Blend human engineering leadership with predictive AI, NotebookLM, and enterprise governance.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          {/* Primary CTA */}
          <button
            onClick={() => handleProtectedClick(onExploreSolutions)}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group active:scale-95"
          >
            <span>Start CPMAI Workbook</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Video Showcase */}
          <button
            onClick={onWatchVideo}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-[#0A101D] text-[15px] font-medium shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </span>
            <span>Watch Showcase</span>
          </button>

          {/* Tertiary CTA: Readiness Quiz */}
          {onGoToQuiz && (
            <button
              onClick={() => handleProtectedClick(onGoToQuiz)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[14px] font-semibold transition-all cursor-pointer active:scale-95"
            >
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Readiness Quiz</span>
            </button>
          )}
        </div>

        {/* 5. Statistics Grid */}
        <div className="pt-8 border-t border-gray-300/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {/* Col 1 */}
          <div className="sm:pr-4 space-y-1">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <Cpu className="w-5 h-5 shrink-0" />
              <span className="font-orbitron font-extrabold text-[24px] text-[#0A101D] tracking-tight">
                6 Phases
              </span>
            </div>
            <p className="text-xs text-[#4A5568] font-semibold">
              Cognitive AI Methodology
            </p>
          </div>

          {/* Col 2 */}
          <div className="sm:px-4 sm:border-x sm:border-gray-300/80 space-y-1">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <Layers className="w-5 h-5 shrink-0" />
              <span className="font-orbitron font-extrabold text-[22px] text-[#0A101D] tracking-tight">
                PMI & IPMA
              </span>
            </div>
            <p className="text-xs text-[#4A5568] font-semibold">
              Global Standards Aligned
            </p>
          </div>

          {/* Col 3 */}
          <div className="sm:pl-4 space-y-1">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-orbitron font-extrabold text-[20px] text-[#0A101D] tracking-tight">
                Enterprise
              </span>
            </div>
            <p className="text-xs text-[#4A5568] font-semibold truncate">
              Metro & Energy Focus
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
