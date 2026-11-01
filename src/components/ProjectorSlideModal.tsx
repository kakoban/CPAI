import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Sun,
  Moon,
  Copy,
  Check,
  Lightbulb,
  Code2,
  ZoomIn,
  Sparkles
} from 'lucide-react';
import { playTactileSound } from '../utils/uiSoundEffects';

export interface ProjectorSlideItem {
  stepNumber: string;
  keyHint?: string;
  badgeFa: string;
  titleFa: string;
  titleEn?: string;
  pointsFa: string[];
  proTipFa?: string;
  codeTitleFa?: string;
  codeSnippet?: string;
  codeDir?: 'ltr' | 'rtl';
}

interface ProjectorSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckTitleFa: string;
  deckSubtitleFa?: string;
  accentColor?: 'blue' | 'teal' | 'purple';
  slides: ProjectorSlideItem[];
  activeIndex: number;
  onChangeIndex: (newIndex: number) => void;
  copyToClipboard?: (text: string, id: string) => void;
  copiedId?: string | null;
}

/**
 * Splits a bullet string like "عنوان کلیدی: توضیح کامل..." into a bold header + body
 * for effortless scanning from 5-8 meters away on a projector.
 */
export function splitPointTitleAndBody(text: string): { heading: string | null; body: string } {
  const colonIdx = text.indexOf(':');
  if (colonIdx > 2 && colonIdx < 85) {
    return {
      heading: text.slice(0, colonIdx + 1).trim(),
      body: text.slice(colonIdx + 1).trim()
    };
  }
  return { heading: null, body: text };
}

export const ProjectorSlideModal: React.FC<ProjectorSlideModalProps> = ({
  isOpen,
  onClose,
  deckTitleFa,
  deckSubtitleFa,
  accentColor = 'blue',
  slides,
  activeIndex,
  onChangeIndex,
  copyToClipboard,
  copiedId
}) => {
  const [projectorTheme, setProjectorTheme] = useState<'high_contrast_light' | 'cinema_dark'>(
    'high_contrast_light'
  );
  const [extraLargeText, setExtraLargeText] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playTactileSound('switch');
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        e.preventDefault();
        playTactileSound('thock');
        onChangeIndex(activeIndex < slides.length - 1 ? activeIndex + 1 : 0);
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        playTactileSound('thock');
        onChangeIndex(activeIndex > 0 ? activeIndex - 1 : slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, slides.length, onChangeIndex, onClose]);

  if (!isOpen || slides.length === 0) return null;

  const currentSlide = slides[activeIndex] || slides[0];
  const isLight = projectorTheme === 'high_contrast_light';

  const accentClasses = {
    blue: {
      badgeBg: 'bg-blue-600 text-white',
      softBg: isLight ? 'bg-blue-50 border-blue-300' : 'bg-blue-950/50 border-blue-500/40',
      numBg: 'bg-blue-600 text-white',
      headingText: isLight ? 'text-blue-800' : 'text-blue-300',
      activeKey: 'bg-blue-600 text-white border-blue-800 border-b-blue-950'
    },
    teal: {
      badgeBg: 'bg-[#0d9488] text-white',
      softBg: isLight ? 'bg-teal-50 border-teal-300' : 'bg-teal-950/50 border-teal-500/40',
      numBg: 'bg-[#0d9488] text-white',
      headingText: isLight ? 'text-teal-800' : 'text-teal-300',
      activeKey: 'bg-[#0d9488] text-white border-[#115e59] border-b-[#042f2e]'
    },
    purple: {
      badgeBg: 'bg-purple-600 text-white',
      softBg: isLight ? 'bg-purple-50 border-purple-300' : 'bg-purple-950/50 border-purple-500/40',
      numBg: 'bg-purple-600 text-white',
      headingText: isLight ? 'text-purple-800' : 'text-purple-300',
      activeKey: 'bg-purple-600 text-white border-purple-800 border-b-purple-950'
    }
  }[accentColor];

  return (
    <div
      dir="rtl"
      className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none ${
        isLight ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#090d11] text-[#f8fafc]'
      }`}
    >
      {/* 1. TOP PROJECTOR CONTROL BAR */}
      <div
        className={`px-6 py-3.5 border-b flex items-center justify-between gap-4 shrink-0 ${
          isLight
            ? 'bg-white border-slate-300 shadow-xs'
            : 'bg-[#111820] border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2.5 rounded-xl ${accentClasses.badgeBg} shadow-xs shrink-0`}>
            <Monitor className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                حالت اسلاید و ویدئو پروژکتور
              </span>
              {deckSubtitleFa && (
                <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {deckSubtitleFa}
                </span>
              )}
            </div>
            <h2 className="text-sm sm:text-base font-black truncate mt-0.5">{deckTitleFa}</h2>
          </div>
        </div>

        {/* Controls: Font Size, Light/Dark Projector Theme, Prev/Next, Close */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => {
              playTactileSound('switch');
              setExtraLargeText((prev) => !prev);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 border border-b-[3px] active:translate-y-[2px] active:border-b cursor-pointer transition-all ${
              extraLargeText
                ? 'bg-amber-500 text-slate-950 border-amber-700 border-b-amber-900'
                : isLight
                  ? 'bg-slate-100 text-slate-800 border-slate-300 border-b-slate-400 hover:bg-slate-200'
                  : 'bg-slate-800 text-slate-100 border-slate-700 border-b-slate-950 hover:bg-slate-700'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
            <span>{extraLargeText ? 'فونت سالن بزرگ (A++)' : 'درشت‌نمایی بیشتر (A+)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTactileSound('switch');
              setProjectorTheme((prev) =>
                prev === 'high_contrast_light' ? 'cinema_dark' : 'high_contrast_light'
              );
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 border border-b-[3px] active:translate-y-[2px] active:border-b cursor-pointer transition-all ${
              isLight
                ? 'bg-slate-100 text-slate-800 border-slate-300 border-b-slate-400 hover:bg-slate-200'
                : 'bg-slate-800 text-amber-300 border-slate-700 border-b-slate-950 hover:bg-slate-700'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span>{isLight ? 'تم تیره سالن' : 'تم روشن پروژکتور'}</span>
          </button>

          <div className="flex items-center gap-1.5 mx-1">
            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                onChangeIndex(activeIndex > 0 ? activeIndex - 1 : slides.length - 1);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1 border border-b-[3px] active:translate-y-[2px] active:border-b cursor-pointer ${
                isLight
                  ? 'bg-white text-slate-900 border-slate-300 border-b-slate-400 hover:bg-slate-50'
                  : 'bg-slate-800 text-white border-slate-700 border-b-slate-950 hover:bg-slate-700'
              }`}
              title="کلید جهت‌نمای راست (→)"
            >
              <ChevronRight className="w-4 h-4" />
              <span>قبلی</span>
            </button>

            <span
              className={`px-3.5 py-2 rounded-xl font-mono text-sm font-black ${
                isLight ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-white'
              }`}
            >
              {activeIndex + 1} / {slides.length}
            </span>

            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                onChangeIndex(activeIndex < slides.length - 1 ? activeIndex + 1 : 0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1 border border-b-[3px] active:translate-y-[2px] active:border-b cursor-pointer ${accentClasses.activeKey}`}
              title="کلید جهت‌نمای چپ (←)"
            >
              <span>اسلاید بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              playTactileSound('switch');
              onClose();
            }}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center gap-1.5 border border-red-800 border-b-[3px] border-b-red-950 active:translate-y-[2px] active:border-b cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>خروج (ESC)</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN SLIDE STAGE (SCROLLABLE IF NEEDED, ZERO CLUTTER, LARGE FONTS) */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-6 sm:py-8 flex flex-col justify-center max-w-[1600px] w-full mx-auto space-y-6 select-text">
        {/* Slide Header */}
        <div className="space-y-3 border-b-2 pb-5 border-current/10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-4 py-1.5 rounded-xl text-sm sm:text-base font-black ${accentClasses.badgeBg}`}>
                {currentSlide.stepNumber} {currentSlide.keyHint ? `(${currentSlide.keyHint})` : ''}
              </span>
              <span
                className={`px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-extrabold border ${accentClasses.softBg}`}
              >
                {currentSlide.badgeFa}
              </span>
            </div>
            {currentSlide.titleEn && (
              <span
                dir="ltr"
                className={`text-sm sm:text-base font-mono font-bold ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {currentSlide.titleEn}
              </span>
            )}
          </div>

          <h1
            className={`font-black leading-tight tracking-tight ${
              extraLargeText ? 'text-2xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-3xl lg:text-4xl'
            }`}
          >
            {currentSlide.titleFa}
          </h1>
        </div>

        {/* Slide Body: 2-Column or 3-Column Scannable High-Contrast Cards (Never a Wide Wall of Text!) */}
        <div
          className={`grid grid-cols-1 ${
            currentSlide.pointsFa.length === 2
              ? 'lg:grid-cols-2'
              : currentSlide.pointsFa.length >= 3
                ? 'md:grid-cols-2 xl:grid-cols-3'
                : 'lg:grid-cols-1'
          } gap-5`}
        >
          {currentSlide.pointsFa.map((pt, idx) => {
            const { heading, body } = splitPointTitleAndBody(pt);
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between gap-4 shadow-sm ${
                  isLight
                    ? 'bg-white border-slate-300 shadow-slate-200/60'
                    : 'bg-[#131c26] border-slate-700/80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono text-base font-black flex items-center justify-center shrink-0 shadow-xs ${accentClasses.numBg}`}
                    >
                      {idx + 1}
                    </span>
                    {heading ? (
                      <h3
                        className={`font-black leading-snug ${accentClasses.headingText} ${
                          extraLargeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {heading}
                      </h3>
                    ) : (
                      <span
                        className={`font-black ${accentClasses.headingText} ${
                          extraLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                        }`}
                      >
                        نکته محوری {idx + 1}
                      </span>
                    )}
                  </div>

                  <p
                    className={`font-semibold leading-relaxed ${
                      isLight ? 'text-slate-900' : 'text-slate-100'
                    } ${extraLargeText ? 'text-lg sm:text-2xl leading-loose' : 'text-base sm:text-xl leading-relaxed'}`}
                  >
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Code / Prompt Block */}
        {currentSlide.codeSnippet && (
          <div className="rounded-3xl bg-[#0f1419] text-[#f1f5f9] border-2 border-slate-700 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-black text-sky-400 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                <span>{currentSlide.codeTitleFa || 'کد / پرامپت عملیاتی این اسلاید'}</span>
              </span>
              {copyToClipboard && (
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(currentSlide.codeSnippet!, `proj_slide_code_${activeIndex}`)
                  }
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === `proj_slide_code_${activeIndex}` ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی کد / دستور</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <pre
              dir={currentSlide.codeDir || 'ltr'}
              className={`font-mono overflow-x-auto max-h-60 leading-relaxed select-text ${
                currentSlide.codeDir === 'rtl' ? 'text-right whitespace-pre-wrap' : 'text-left'
              } ${extraLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
            >
              <code>{currentSlide.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Bottom Pro Tip / Key Takeaway Banner */}
        {currentSlide.proTipFa && (
          <div
            className={`p-5 rounded-3xl border-2 flex items-start gap-3.5 ${
              isLight
                ? 'bg-amber-50 border-amber-400 text-slate-950'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
            }`}
          >
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div
              className={`font-bold leading-relaxed ${
                extraLargeText ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
              }`}
            >
              <span className="font-black underline decoration-amber-500 decoration-2 underline-offset-4 ml-2">
                جمع‌بندی طلایی برای ارائه:
              </span>
              {currentSlide.proTipFa}
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM SLIDE FILMSTRIP (QUICK KEYCAP SELECTOR + KEYBOARD HINT) */}
      <div
        className={`px-6 py-3 border-t flex items-center justify-between gap-4 overflow-x-auto shrink-0 ${
          isLight ? 'bg-white border-slate-300' : 'bg-[#111820] border-slate-800'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {slides.map((sl, sIdx) => {
            const isCurr = sIdx === activeIndex;
            return (
              <button
                key={sIdx}
                type="button"
                onClick={() => {
                  playTactileSound('thock');
                  onChangeIndex(sIdx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border border-b-[3px] active:translate-y-[2px] active:border-b transition-all cursor-pointer shrink-0 ${
                  isCurr
                    ? accentClasses.activeKey
                    : isLight
                      ? 'bg-slate-100 text-slate-800 border-slate-300 border-b-slate-400 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 border-slate-700 border-b-slate-950 hover:bg-slate-700'
                }`}
              >
                {sl.keyHint || sl.stepNumber}
              </button>
            );
          })}
        </div>

        <div
          className={`hidden md:flex items-center gap-2 text-xs font-bold shrink-0 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>با کلیدهای جهت‌نمای کیبورد (← و →) مثل پاورپوینت اسلایدها را ورق بزنید</span>
        </div>
      </div>
    </div>
  );
};
