import React, { useState } from 'react';
import { LandingMediaConfig, PlaybackMode, BlendMode, MediaSourceType } from '../../types/media';
import { MEDIA_PRESETS, DEFAULT_MEDIA_CONFIG } from '../../services/mediaConfig';
import {
  X,
  Film,
  Sparkles,
  Link2,
  Upload,
  RotateCcw,
  Check,
  Play,
  Sliders,
  Eye,
  Layers,
  Cpu,
  Workflow
} from 'lucide-react';

interface MediaCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: LandingMediaConfig;
  onApplyConfig: (config: LandingMediaConfig) => void;
  onResetConfig: () => void;
}

export const MediaCustomizerModal: React.FC<MediaCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onApplyConfig,
  onResetConfig
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'url' | 'upload' | 'settings'>('presets');
  const [tempConfig, setTempConfig] = useState<LandingMediaConfig>(currentConfig);
  const [customUrlInput, setCustomUrlInput] = useState<string>(
    currentConfig.type === 'video' ? currentConfig.url : ''
  );
  const [uploadFileName, setUploadFileName] = useState<string>('');

  if (!isOpen) return null;

  // Handle preset selection
  const handleSelectPreset = (preset: LandingMediaConfig) => {
    const updated: LandingMediaConfig = {
      ...preset,
      opacity: tempConfig.opacity,
      scale: tempConfig.scale
    };
    setTempConfig(updated);
    onApplyConfig(updated);
  };

  // Handle custom URL apply
  const handleApplyCustomUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customUrlInput.trim()) return;

    const updated: LandingMediaConfig = {
      id: 'custom-url-' + Date.now(),
      type: 'video',
      url: customUrlInput.trim(),
      title: 'Custom Online Video',
      description: 'Streamed directly from user-provided URL',
      playbackMode: tempConfig.playbackMode,
      blendMode: tempConfig.blendMode,
      opacity: tempConfig.opacity,
      scale: tempConfig.scale,
      origin: tempConfig.origin,
      isCustom: true
    };

    setTempConfig(updated);
    onApplyConfig(updated);
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setUploadFileName(file.name);

    const updated: LandingMediaConfig = {
      id: 'local-file-' + Date.now(),
      type: 'video',
      url: fileUrl,
      title: file.name,
      description: `Local media (${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
      playbackMode: tempConfig.playbackMode,
      blendMode: tempConfig.blendMode,
      opacity: tempConfig.opacity,
      scale: tempConfig.scale,
      origin: tempConfig.origin,
      isCustom: true
    };

    setTempConfig(updated);
    onApplyConfig(updated);
  };

  const handleReset = () => {
    onResetConfig();
    setTempConfig(DEFAULT_MEDIA_CONFIG);
    setCustomUrlInput(DEFAULT_MEDIA_CONFIG.url);
    setUploadFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-inter">
      {/* Double Bezel Container */}
      <div className="relative w-full max-w-2xl p-1.5 rounded-3xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.15] shadow-2xl">
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-6 sm:p-7 space-y-5 text-left">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-[#2563EB] border border-blue-500/20 shadow-2xs">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <span>Landing Page Media Customizer</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold">
                    Interactive
                  </span>
                </h3>
                <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  تنظیم و تغییر ویدیوی پس‌زمینه متحرک لندینگ پیج (Scrub Video / Neural / URL)
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

          {/* Navigation Tabs */}
          <div className="grid grid-cols-4 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white dark:bg-[#1f2933] text-[#2563EB] shadow-xs'
                  : 'text-[#5d6b73] hover:text-[#1c2830]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>پوسته‌ها (Presets)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-white dark:bg-[#1f2933] text-[#2563EB] shadow-xs'
                  : 'text-[#5d6b73] hover:text-[#1c2830]'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>لینک ویدیو (URL)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white dark:bg-[#1f2933] text-[#2563EB] shadow-xs'
                  : 'text-[#5d6b73] hover:text-[#1c2830]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>آپلود فایل (Local)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-[#1f2933] text-[#2563EB] shadow-xs'
                  : 'text-[#5d6b73] hover:text-[#1c2830]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>تنظیمات افکت</span>
            </button>
          </div>

          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {MEDIA_PRESETS.map((preset) => {
                  const isSelected = tempConfig.id === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#2563EB] bg-blue-50/60 dark:bg-blue-950/30 shadow-xs'
                          : 'border-black/[0.08] dark:border-white/[0.1] hover:border-blue-300 dark:hover:border-blue-700 bg-black/[0.01]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                            {preset.type === 'video' ? (
                              <Film className="w-4 h-4 text-[#2563EB]" />
                            ) : preset.type === 'canvas-neural' ? (
                              <Cpu className="w-4 h-4 text-[#00738c]" />
                            ) : (
                              <Workflow className="w-4 h-4 text-emerald-600" />
                            )}
                            <span>{preset.title}</span>
                          </span>

                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                          {preset.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center gap-2 text-[10px] text-[#5d6b73]">
                        <span className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono">
                          {preset.playbackMode === 'scrub' ? 'Interactive Scrub' : 'Loop Mode'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono">
                          {preset.blendMode.replace('mix-blend-', '')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleApplyCustomUrl} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-[#2563EB]" />
                  <span>آدرس مستقیم فایل ویدیو (Direct Video URL):</span>
                </label>
                <p className="text-[11px] text-[#5d6b73]">
                  لینک مستقیم فایل ویدیو با پسوند MP4 یا WebM را وارد کنید (مانند فایل‌های هاست، CDN، S3 یا استوریج اختصاصی).
                </p>
                <input
                  type="url"
                  dir="ltr"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://example.com/videos/custom_hero_motion.mp4"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-black/[0.1] dark:border-white/[0.15] bg-white dark:bg-[#12181d] text-[#1c2830] dark:text-[#e8ebe9] focus:ring-2 focus:ring-[#2563EB] focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCustomUrlInput(
                      'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/robo_motion.mp4'
                    )
                  }
                  className="px-3 py-2 text-xs text-[#5d6b73] hover:text-black dark:hover:text-white"
                >
                  بازنشانی لینک به ربات اصلی
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>اعمال و بارگذاری لینک</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: LOCAL FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-black/15 dark:border-white/15 rounded-2xl p-6 text-center space-y-3 hover:border-blue-400 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    انتخاب فایل ویدیو یا انیمیشن از کامپیوتر
                  </h4>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    پشتیبانی از فرمت‌های MP4, WebM, MOV, Animated GIF
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95">
                  <Film className="w-4 h-4" />
                  <span>انتخاب فایل ویدیو...</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,image/gif"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadFileName && (
                  <div className="pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>فایل با موفقیت بارگذاری شد: {uploadFileName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ADVANCED PLAYBACK & BLEND SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              {/* Playback Mode */}
              <div className="space-y-2">
                <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                  نحوه پخش ویدیو (Playback Behaviour):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...tempConfig, playbackMode: 'scrub' as PlaybackMode };
                      setTempConfig(updated);
                      onApplyConfig(updated);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      tempConfig.playbackMode === 'scrub'
                        ? 'border-[#2563EB] bg-blue-50/60 dark:bg-blue-950/30'
                        : 'border-black/[0.08] hover:border-black/20'
                    }`}
                  >
                    <div className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      Interactive Scrub
                    </div>
                    <div className="text-[11px] text-[#5d6b73]">
                      حرکت فریم ویدیو با موقعیت ماوس (حالت Agentify)
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...tempConfig, playbackMode: 'loop' as PlaybackMode };
                      setTempConfig(updated);
                      onApplyConfig(updated);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      tempConfig.playbackMode === 'loop'
                        ? 'border-[#2563EB] bg-blue-50/60 dark:bg-blue-950/30'
                        : 'border-black/[0.08] hover:border-black/20'
                    }`}
                  >
                    <div className="font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      Continuous Loop
                    </div>
                    <div className="text-[11px] text-[#5d6b73]">
                      پخش ممتد و روان ویدیو در پس‌زمینه
                    </div>
                  </button>
                </div>
              </div>

              {/* Blend Mode */}
              <div className="space-y-2">
                <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                  حالت ترکیب رنگ با پس‌زمینه (Blend Mode):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mode: 'mix-blend-multiply', title: 'Multiply (پیش‌فرض)', note: 'برای پس‌زمینه سفید' },
                    { mode: 'mix-blend-normal', title: 'Normal', note: 'رنگ‌های واقعی' },
                    { mode: 'mix-blend-screen', title: 'Screen', note: 'درخشان و شفاف' }
                  ].map((item) => (
                    <button
                      key={item.mode}
                      type="button"
                      onClick={() => {
                        const updated = { ...tempConfig, blendMode: item.mode as BlendMode };
                        setTempConfig(updated);
                        onApplyConfig(updated);
                      }}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        tempConfig.blendMode === item.mode
                          ? 'border-[#2563EB] bg-blue-50/60 dark:bg-blue-950/30'
                          : 'border-black/[0.08]'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{item.title}</div>
                      <div className="text-[10px] text-[#5d6b73]">{item.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Opacity & Scale Sliders */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>میزان شفافیت (Opacity):</span>
                    <span className="font-mono">{Math.round(tempConfig.opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="1"
                    step="0.05"
                    value={tempConfig.opacity}
                    onChange={(e) => {
                      const updated = { ...tempConfig, opacity: parseFloat(e.target.value) };
                      setTempConfig(updated);
                      onApplyConfig(updated);
                    }}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>اندازه مقیاس (Scale):</span>
                    <span className="font-mono">{Math.round(tempConfig.scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.3"
                    step="0.05"
                    value={tempConfig.scale}
                    onChange={(e) => {
                      const updated = { ...tempConfig, scale: parseFloat(e.target.value) };
                      setTempConfig(updated);
                      onApplyConfig(updated);
                    }}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی به حالت پیش‌فرض (ربات)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0A101D] hover:bg-black text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>تأیید و بستن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
