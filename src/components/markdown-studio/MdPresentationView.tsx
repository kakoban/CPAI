import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { parseMarkdown } from './markdownParser';
import { debounceRenderMermaid } from './mermaidRenderer';
import { FontFamily } from './types';
import {
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  X,
  Presentation,
  Sparkles,
  Grid,
  Sun,
  Moon,
  Clock,
  ZoomIn,
  ZoomOut,
  Disc,
  Play,
  RotateCcw,
} from 'lucide-react';

interface MdPresentationViewProps {
  markdown: string;
  title: string;
  fontFamily: FontFamily;
  onExit: () => void;
}

type SplitMode = 'smart' | 'divider' | 'headings';

export const MdPresentationView: React.FC<MdPresentationViewProps> = ({
  markdown,
  title,
  fontFamily,
  onExit,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [splitMode, setSplitMode] = useState<SplitMode>('smart');
  const [slideTheme, setSlideTheme] = useState<'dark' | 'light'>('dark');
  const [fontScale, setFontScale] = useState<number>(100);
  const [showOverview, setShowOverview] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: -100, y: -100 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Lecture timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  const slideContentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => {
    const cleanMd = markdown.trim();
    if (!cleanMd) return ['# سند خالی است\nمحتوایی برای ارائه وجود ندارد.'];

    if (splitMode === 'divider') {
      const byHr = cleanMd
        .split(/\n\s*---\s*\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      return byHr.length > 0 ? byHr : [cleanMd];
    }

    if (splitMode === 'headings') {
      const byHeadings = cleanMd
        .split(/\n(?=#{1,2}\s)/)
        .map((s) => s.trim())
        .filter(Boolean);
      return byHeadings.length > 0 ? byHeadings : [cleanMd];
    }

    const rawSections = cleanMd
      .split(/\n\s*---\s*\n|\n(?=#{1,2}\s)/)
      .map((s) => s.trim())
      .filter(Boolean);

    return rawSections.length > 0 ? rawSections : [cleanMd];
  }, [markdown, splitMode]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(Math.max(0, slides.length - 1));
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (slideContentRef.current) {
      slideContentRef.current.scrollTop = 0;
      debounceRenderMermaid(slideContentRef.current);
    }
  }, [currentSlide, slides, slideTheme]);

  const goNext = useCallback(() => {
    setCurrentSlide((s) => Math.min(slides.length - 1, s + 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(slides.length - 1);
      } else if (e.key === 'o' || e.key === 'O') {
        setShowOverview((prev) => !prev);
      } else if (e.key === 'l' || e.key === 'L') {
        setLaserActive((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (showOverview) {
          setShowOverview(false);
        } else {
          onExit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, slides.length, showOverview, onExit]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!laserActive) return;
    setLaserPos({ x: e.clientX, y: e.clientY });
  };

  const currentHtml = useMemo(
    () => parseMarkdown(slides[currentSlide] || ''),
    [slides, currentSlide]
  );

  const fontClass = {
    vazir: 'md-font-vazir',
    sans: 'md-font-sans',
    serif: 'md-font-serif',
    mono: 'md-font-mono',
  }[fontFamily];

  const isDark = slideTheme === 'dark';

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      className={`md-studio-root fixed inset-0 z-[120] flex flex-col select-none transition-colors duration-300 ${fontClass} ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      } ${laserActive ? 'cursor-none' : ''}`}
      dir="rtl"
    >
      {/* Laser Pointer Dot */}
      {laserActive && (
        <div
          className="fixed pointer-events-none z-[130] w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-red-500 shadow-[0_0_20px_6px_rgba(239,68,68,0.85)] ring-2 ring-white transition-transform duration-75"
          style={{ left: laserPos.x, top: laserPos.y }}
        />
      )}

      {/* Top Presentation Header */}
      <div
        className={`flex items-center justify-between px-4 sm:px-6 py-2.5 border-b backdrop-blur-md z-20 ${
          isDark
            ? 'bg-slate-900/90 border-white/10 text-white'
            : 'bg-white/90 border-slate-200 text-slate-800 shadow-xs'
        }`}
      >
        {/* Right: Title & Slide Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Presentation className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold truncate max-w-[180px] sm:max-w-xs">{title}</h2>
            <p className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>
                اسلاید {currentSlide + 1} از {slides.length}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Presentation Controls */}
        <div className="hidden lg:flex items-center gap-2">
          <div
            className={`flex items-center p-1 rounded-xl border text-xs ${
              isDark ? 'bg-slate-800/80 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setSplitMode('smart')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                splitMode === 'smart'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              تفکیک هوشمند
            </button>
            <button
              type="button"
              onClick={() => setSplitMode('headings')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                splitMode === 'headings'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              بر اساس تیترها
            </button>
            <button
              type="button"
              onClick={() => setSplitMode('divider')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                splitMode === 'divider'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              خط جداکننده (---)
            </button>
          </div>

          {/* Font Scale */}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-xl border ${
              isDark ? 'bg-slate-800/80 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.max(70, s - 10))}
              className="p-1 hover:text-indigo-400 transition-colors cursor-pointer"
              title="کوچک‌تر کردن متن اسلاید"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-9 text-center">{fontScale}%</span>
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.min(150, s + 10))}
              className="p-1 hover:text-indigo-400 transition-colors cursor-pointer"
              title="بزرگ‌تر کردن متن اسلاید"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lecture Timer */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-mono ${
              isDark ? 'bg-slate-800/80 border-white/10 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(secondsElapsed)}</span>
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-0.5 hover:opacity-80 cursor-pointer"
              title={timerRunning ? 'توقف تایمر' : 'ادامه تایمر'}
            >
              <Play className={`w-3 h-3 ${timerRunning ? 'opacity-40' : 'text-amber-400'}`} />
            </button>
            <button
              type="button"
              onClick={() => setSecondsElapsed(0)}
              className="p-0.5 hover:opacity-80 cursor-pointer"
              title="صفر کردن تایمر"
            >
              <RotateCcw className="w-3 h-3 opacity-60" />
            </button>
          </div>
        </div>

        {/* Left: Tools & Exit */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLaserActive(!laserActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              laserActive
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                : isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="نشانگر لیزری تدریس (کلید L)"
          >
            <Disc className={`w-3.5 h-3.5 ${laserActive ? 'animate-ping' : 'text-red-500'}`} />
            <span className="hidden sm:inline">لیزر</span>
          </button>

          <button
            type="button"
            onClick={() => setShowOverview(!showOverview)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              showOverview
                ? 'bg-indigo-600 text-white border-indigo-500'
                : isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="نمای شبکه‌ای همه اسلایدها (کلید O)"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">نمای کلی</span>
          </button>

          <button
            type="button"
            onClick={() => setSlideTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="تغییر تم اسلاید (تیره / روشن)"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="تمام‌صفحه (Fullscreen)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-500 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </div>

      {/* Slide Overview Grid Modal */}
      {showOverview ? (
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Grid className="w-5 h-5 text-indigo-500" />
              <span>فهرست اسلایدهای ارائه ({slides.length} اسلاید)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {slides.map((s, idx) => {
                const firstLine =
                  s
                    .split('\n')[0]
                    ?.replace(/^#+\s*/, '')
                    .trim() || `اسلاید ${idx + 1}`;
                const previewSnippet = s
                  .replace(/^#+\s*.*$/m, '')
                  .trim()
                  .slice(0, 120);
                const active = idx === currentSlide;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentSlide(idx);
                      setShowOverview(false);
                    }}
                    className={`text-right p-5 rounded-2xl border transition-all flex flex-col justify-between h-44 group cursor-pointer ${
                      active
                        ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-500/10'
                        : isDark
                        ? 'bg-slate-900/90 border-white/10 hover:border-indigo-400/50'
                        : 'bg-white border-slate-200 hover:border-indigo-400 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400">
                          اسلاید {idx + 1}
                        </span>
                        {active && <span className="text-xs text-emerald-400 font-bold">● در حال نمایش</span>}
                      </div>
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-indigo-400 transition-colors">
                        {firstLine}
                      </h4>
                      <p className="text-xs opacity-60 line-clamp-2 mt-2 leading-relaxed">{previewSnippet}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Main Slide Stage */
        <div className="flex-1 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden relative">
          <div
            ref={slideContentRef}
            className={`w-full max-w-5xl max-h-full overflow-y-auto rounded-3xl p-6 sm:p-12 md:p-16 shadow-2xl transition-all duration-300 ${
              isDark ? 'slide-card-dark theme-dark' : 'slide-card-light theme-light'
            }`}
          >
            <div
              style={{ fontSize: `${Math.round((20 * fontScale) / 100)}px` }}
              className="markdown-body presentation-slide-body leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentHtml }}
            />
          </div>
        </div>
      )}

      {/* Bottom Slide Navigation Bar */}
      <div
        className={`px-6 py-3 border-t flex items-center justify-between gap-4 z-20 ${
          isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer ${
            isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>اسلاید قبلی</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1 px-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 bg-indigo-500'
                  : isDark
                  ? 'w-2.5 bg-white/25 hover:bg-white/40'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`اسلاید ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <span>اسلاید بعدی</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
