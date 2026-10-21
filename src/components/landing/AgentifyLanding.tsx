import React, { useState } from 'react';
import { AgentifyNavbar } from './AgentifyNavbar';
import { VideoBackground } from './VideoBackground';
import { AgentifyHero } from './AgentifyHero';
import { MediaCustomizerModal } from './MediaCustomizerModal';
import { UserProfile } from '../../types/auth';
import { LandingMediaConfig } from '../../types/media';
import { mediaService, DEFAULT_MEDIA_CONFIG } from '../../services/mediaConfig';
import { X, Play, BookOpen, Film, Sliders, Sparkles } from 'lucide-react';

import { IndustryTrackId } from '../../types/industryTrack';

interface AgentifyLandingProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onGoToQuiz?: () => void;
  onReplayIntro?: () => void;
  onOpenBookModal?: () => void;
  currentTrack?: IndustryTrackId;
  onSelectTrack?: (track: IndustryTrackId) => void;
  onOpenTrackModal?: () => void;
}

export const AgentifyLanding: React.FC<AgentifyLandingProps> = ({
  onEnterApp,
  onOpenAuth,
  currentUser,
  onGoToQuiz,
  onReplayIntro,
  onOpenBookModal,
  currentTrack,
  onSelectTrack,
  onOpenTrackModal
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [mediaConfig, setMediaConfig] = useState<LandingMediaConfig>(() =>
    mediaService.getSavedConfig()
  );

  const handleProtectedEnter = () => {
    if (!currentUser) {
      onOpenAuth();
    } else {
      onEnterApp();
    }
  };

  const handleApplyMediaConfig = (newConfig: LandingMediaConfig) => {
    setMediaConfig(newConfig);
    mediaService.saveConfig(newConfig);
  };

  const handleResetMediaConfig = () => {
    const def = mediaService.resetConfig();
    setMediaConfig(def);
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen overflow-x-hidden antialiased bg-[#e7eaef] text-[#0A101D] selection:bg-blue-100 selection:text-blue-900 relative font-inter"
    >
      {/* Global Content Container */}
      <div className="max-w-[1600px] mx-auto relative min-h-screen">
        {/* Navigation Bar */}
        <AgentifyNavbar
          onEnterApp={onEnterApp}
          onOpenAuth={onOpenAuth}
          currentUser={currentUser}
          onGoToQuiz={onGoToQuiz}
          onOpenMediaCustomizer={() => setIsMediaModalOpen(true)}
          onReplayIntro={onReplayIntro}
          onOpenBookModal={onOpenBookModal}
          currentTrack={currentTrack}
          onSelectTrack={onSelectTrack}
          onOpenTrackModal={onOpenTrackModal}
        />

        {/* Video / Canvas Background (Absolute) */}
        <VideoBackground config={mediaConfig} />

        {/* Hero Section (Left-aligned) */}
        <AgentifyHero
          onExploreSolutions={onEnterApp}
          onWatchVideo={() => setIsVideoModalOpen(true)}
          onGoToQuiz={onGoToQuiz}
          isLoggedIn={!!currentUser}
          onOpenAuth={onOpenAuth}
        />

        {/* Floating Trigger: Customize Background Motion Media (Bottom-Left) */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsMediaModalOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-black text-[#0A101D] dark:text-white text-xs font-bold shadow-2xl border border-gray-300 dark:border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            title="Click to change or upload landing background video/media"
          >
            <div className="p-1 rounded-lg bg-blue-500/10 text-[#2563EB]">
              <Film className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <span className="leading-tight">Change Background Media</span>
              <span className="text-[10px] text-gray-500 font-normal truncate max-w-[140px]">
                {mediaConfig.title}
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse ml-1" />
          </button>
        </div>

        {/* Floating Quick Navigation to CPMAI Platform (Bottom-Right) */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleProtectedEnter}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0A101D] hover:bg-black text-white text-xs font-bold shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Enter CPMAI Engineering Workbook</span>
            <BookOpen className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Media Customizer Modal */}
      <MediaCustomizerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        currentConfig={mediaConfig}
        onApplyConfig={handleApplyMediaConfig}
        onResetConfig={handleResetMediaConfig}
      />

      {/* Video Preview Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#2563EB] fill-[#2563EB]" />
                <span className="font-orbitron font-bold text-sm tracking-wider">
                  OWJ BUSINESS COUNCIL · {mediaConfig.title.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsMediaModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5 text-blue-400" />
                  <span>Change Media</span>
                </button>

                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {mediaConfig.type === 'video' ? (
                <video
                  key={mediaConfig.url}
                  src={mediaConfig.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-white">
                  <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
                  <p className="font-orbitron text-sm tracking-wide">
                    {mediaConfig.title} is currently active on the background canvas.
                  </p>
                  <button
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      setIsMediaModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold"
                  >
                    Configure Canvas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
