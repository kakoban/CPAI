import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ZoomIn, ZoomOut, RotateCcw, ScanSearch, X, Crosshair } from 'lucide-react';
import { Language } from '../../types/cpmai';
import { playTactileSound } from '../../utils/uiSoundEffects';

interface SectionSpotlightZoomProps {
  containerRef: React.RefObject<HTMLElement | null>;
  isPickMode: boolean;
  onPickModeChange: (active: boolean) => void;
  lang: Language;
}

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: string;
}

interface SpotlightSnapshot {
  clonedNode: HTMLElement;
  direction: 'rtl' | 'ltr';
  origWidth: number;
  origHeight: number;
  originCenterX: number;
  originCenterY: number;
  needsSurfaceBg: boolean;
  borderRadius: string;
  autoZoom: number;
}

function isTransparentColor(color: string | null | undefined): boolean {
  if (!color) return true;
  const c = color.replace(/\s+/g, '').toLowerCase();
  return c === 'transparent' || c === 'rgba(0,0,0,0)' || c === 'rgba(0,0,0,0.0)';
}

function isMeaningfulSpotlightCandidate(el: HTMLElement, root: HTMLElement): boolean {
  if (el === root || !root.contains(el)) return false;
  if (el.closest('[data-spotlight-ignore="true"]')) return false;

  const tag = el.tagName.toLowerCase();
  if (
    ['span', 'strong', 'em', 'b', 'i', 'a', 'svg', 'path', 'circle', 'rect', 'line', 'polygon', 'br', 'hr'].includes(
      tag
    )
  ) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  if (rect.width < 150 || rect.height < 48) return false;

  // Prevent selecting the entire huge page wrapper
  const maxAllowedHeight = Math.max(window.innerHeight * 1.15, 780);
  if (rect.height > maxAllowedHeight) return false;

  if (el.hasAttribute('data-spotlight-block')) return true;

  if (['pre', 'table', 'figure', 'details', 'article', 'blockquote'].includes(tag)) {
    return true;
  }

  const cs = window.getComputedStyle(el);
  const hasBorder =
    parseFloat(cs.borderTopWidth) > 0 ||
    parseFloat(cs.borderRightWidth) > 0 ||
    parseFloat(cs.borderBottomWidth) > 0 ||
    parseFloat(cs.borderLeftWidth) > 0;
  const hasBg = !isTransparentColor(cs.backgroundColor) || cs.backgroundImage !== 'none';
  const hasRadius = parseFloat(cs.borderTopLeftRadius) >= 8;

  if ((hasBorder || hasBg) && hasRadius) {
    return true;
  }

  if (tag === 'section' && rect.height <= window.innerHeight * 0.95) {
    return true;
  }

  return false;
}

function findSpotlightTarget(rawTarget: EventTarget | null, root: HTMLElement): HTMLElement | null {
  if (!(rawTarget instanceof Element)) return null;
  let cur: HTMLElement | null = rawTarget instanceof HTMLElement ? rawTarget : rawTarget.parentElement;
  if (!cur || !root.contains(cur)) return null;
  if (cur.closest('[data-spotlight-ignore="true"]')) return null;

  let fallback: HTMLElement | null = null;

  while (cur && cur !== root) {
    if (isMeaningfulSpotlightCandidate(cur, root)) {
      return cur;
    }
    const rect = cur.getBoundingClientRect();
    if (
      !fallback &&
      rect.width >= 150 &&
      rect.height >= 44 &&
      rect.height <= window.innerHeight * 0.95 &&
      ['div', 'section', 'li', 'p', 'ul', 'ol'].includes(cur.tagName.toLowerCase())
    ) {
      fallback = cur;
    }
    cur = cur.parentElement;
  }

  return fallback;
}

function buildSpotlightSnapshot(target: HTMLElement): SpotlightSnapshot {
  const rect = target.getBoundingClientRect();
  const cs = window.getComputedStyle(target);
  const clone = target.cloneNode(true) as HTMLElement;

  // Remove duplicate IDs from cloned DOM tree to keep document IDs unique
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
  // Ensure cloned root fills its spotlight stage cleanly without sticky/margin offsets
  clone.style.margin = '0';
  clone.style.position = 'relative';
  clone.style.top = 'auto';
  clone.style.left = 'auto';
  clone.style.right = 'auto';
  clone.style.bottom = 'auto';
  clone.style.transform = 'none';
  clone.style.maxHeight = 'none';

  const origWidth = Math.max(220, Math.round(rect.width));
  const origHeight = Math.max(60, Math.round(rect.height));

  // Smart auto-zoom: enlarge small/medium cards dramatically while fitting comfortably inside viewport
  const maxStageW = window.innerWidth * 0.86;
  const maxStageH = window.innerHeight * 0.74;
  const fitByW = maxStageW / origWidth;
  const fitByH = maxStageH / origHeight;
  const preferredZoom = origWidth < 420 ? 1.55 : origWidth < 680 ? 1.35 : 1.18;
  const autoZoom = Number(Math.max(1.08, Math.min(preferredZoom, fitByW, fitByH, 1.8)).toFixed(2));

  const needsSurfaceBg = isTransparentColor(cs.backgroundColor) && cs.backgroundImage === 'none';

  return {
    clonedNode: clone,
    direction: cs.direction === 'ltr' ? 'ltr' : 'rtl',
    origWidth,
    origHeight,
    originCenterX: rect.left + rect.width / 2,
    originCenterY: rect.top + rect.height / 2,
    needsSurfaceBg,
    borderRadius: cs.borderRadius && cs.borderRadius !== '0px' ? cs.borderRadius : '16px',
    autoZoom
  };
}

export const SectionSpotlightZoom: React.FC<SectionSpotlightZoomProps> = ({
  containerRef,
  isPickMode,
  onPickModeChange,
  lang
}) => {
  const isFa = lang === 'fa';
  const [hoverRect, setHoverRect] = useState<HighlightRect | null>(null);
  const [snapshot, setSnapshot] = useState<SpotlightSnapshot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.3);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const cloneHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = cloneHostRef.current;
    if (!host) return;
    if (snapshot?.clonedNode) {
      host.replaceChildren(snapshot.clonedNode);
    } else {
      host.replaceChildren();
    }
  }, [snapshot]);

  const openSpotlightForElement = useCallback(
    (target: HTMLElement) => {
      playTactileSound('thock');
      const snap = buildSpotlightSnapshot(target);
      setSnapshot(snap);
      setZoomLevel(snap.autoZoom);
      setHoverRect(null);
      hoveredElRef.current = null;
      onPickModeChange(false);
      setIsEntered(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntered(true);
        });
      });
    },
    [onPickModeChange]
  );

  const closeSpotlight = useCallback(() => {
    playTactileSound('switch');
    setIsEntered(false);
    setTimeout(() => {
      setSnapshot(null);
    }, 170);
  }, []);

  // Hover tracker & click capture during Pick Mode, plus Alt+Click power shortcut anytime.
  // Bound on document so conditional mounting of containerRef (e.g., after closing Orbit Hub) always works.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPickMode) return;
      const root = containerRef.current;
      if (!root) return;
      const found = findSpotlightTarget(e.target, root);
      if (found !== hoveredElRef.current) {
        hoveredElRef.current = found;
      }
      if (!found) {
        setHoverRect(null);
        return;
      }
      const r = found.getBoundingClientRect();
      const cs = window.getComputedStyle(found);
      setHoverRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        borderRadius: cs.borderRadius && cs.borderRadius !== '0px' ? cs.borderRadius : '14px'
      });
    };

    const handleClickCapture = (e: MouseEvent) => {
      const root = containerRef.current;
      if (!root) return;
      const triggeredByAlt = e.altKey && !isPickMode;
      if (!isPickMode && !triggeredByAlt) return;

      const found = findSpotlightTarget(e.target, root);
      if (!found) return;

      e.preventDefault();
      e.stopPropagation();
      openSpotlightForElement(found);
    };

    const handleScroll = () => {
      if (!isPickMode || !hoveredElRef.current) return;
      const r = hoveredElRef.current.getBoundingClientRect();
      setHoverRect((prev) =>
        prev
          ? {
              ...prev,
              top: r.top,
              left: r.left,
              width: r.width,
              height: r.height
            }
          : null
      );
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClickCapture, true);
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    const rootEl = containerRef.current;
    const prevCursor = rootEl?.style.cursor ?? '';
    if (rootEl && isPickMode) {
      rootEl.style.cursor = 'crosshair';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClickCapture, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (rootEl && isPickMode) {
        rootEl.style.cursor = prevCursor;
      }
    };
  }, [containerRef, isPickMode, openSpotlightForElement]);

  // Clear hover highlight when pick mode turns off
  useEffect(() => {
    if (!isPickMode) {
      setHoverRect(null);
      hoveredElRef.current = null;
    }
  }, [isPickMode]);

  // Lock background scrolling & handle Escape / +/- keyboard controls while Spotlight or Pick Mode is open
  useEffect(() => {
    if (!snapshot && !isPickMode) return;

    const prevOverflow = document.body.style.overflow;
    if (snapshot) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (snapshot) {
          closeSpotlight();
        } else if (isPickMode) {
          onPickModeChange(false);
        }
      } else if (snapshot && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        setZoomLevel((z) => Math.min(2.2, Number((z + 0.15).toFixed(2))));
      } else if (snapshot && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        setZoomLevel((z) => Math.max(1.0, Number((z - 0.15).toFixed(2))));
      } else if (snapshot && e.key === '0') {
        e.preventDefault();
        setZoomLevel(snapshot.autoZoom);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      if (snapshot) {
        document.body.style.overflow = prevOverflow;
      }
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [snapshot, isPickMode, closeSpotlight, onPickModeChange]);

  if (typeof document === 'undefined') return null;

  const viewportCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 720;
  const viewportCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 450;
  const initDx = snapshot ? Math.max(-320, Math.min(320, snapshot.originCenterX - viewportCenterX)) : 0;
  const initDy = snapshot ? Math.max(-220, Math.min(220, snapshot.originCenterY - viewportCenterY)) : 0;

  return createPortal(
    <>
      {/* 1. PICK MODE FLOATING BANNER & LIVE HOVER HIGHLIGHT FRAME */}
      {isPickMode && (
        <>
          <div
            data-testid="spotlight-pick-banner"
            data-spotlight-ignore="true"
            dir={isFa ? 'rtl' : 'ltr'}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[85] px-4 py-2 rounded-full bg-slate-900/95 dark:bg-slate-950/95 text-white border border-sky-400/40 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs animate-fadeIn max-w-[94vw]"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <Crosshair className="w-3.5 h-3.5 text-sky-300 shrink-0" />
            <span className="font-bold truncate">
              {isFa
                ? 'حالت فوکوس و زوم فعال است · روی هر کارت، جدول، نمودار یا بلوک متنی کلیک کنید'
                : 'Spotlight Pick Mode · Click any card, table, diagram, or block to zoom'}
            </span>
            <button
              type="button"
              onClick={() => onPickModeChange(false)}
              className="px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition-colors cursor-pointer shrink-0"
            >
              {isFa ? 'لغو (Esc)' : 'Cancel'}
            </button>
          </div>

          {hoverRect && (
            <div
              data-testid="spotlight-hover-frame"
              aria-hidden="true"
              className="fixed z-[80] pointer-events-none border-2 border-sky-500 bg-sky-500/[0.07] shadow-[0_0_0_4px_rgba(14,165,233,0.18)] transition-all duration-100 ease-out"
              style={{
                top: hoverRect.top - 3,
                left: hoverRect.left - 3,
                width: hoverRect.width + 6,
                height: hoverRect.height + 6,
                borderRadius: hoverRect.borderRadius
              }}
            >
              <div
                dir={isFa ? 'rtl' : 'ltr'}
                className="absolute -top-7 right-2 px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10.5px] font-extrabold shadow-md flex items-center gap-1 whitespace-nowrap"
              >
                <ScanSearch className="w-3 h-3 shrink-0" />
                <span>{isFa ? 'کلیک برای زوم و فوکوس' : 'Click to Spotlight'}</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* 2. FROZEN BLURRED BACKDROP + ISOLATED POP-OUT SPOTLIGHT STAGE */}
      {snapshot && (
        <div
          data-testid="spotlight-zoom-overlay"
          data-spotlight-ignore="true"
          role="dialog"
          aria-modal="true"
          aria-label={isFa ? 'بزرگ‌نمایی و فوکوس بخش انتخاب‌شده' : 'Spotlight Focused Section'}
          onClick={closeSpotlight}
          className={`fixed inset-0 z-[95] flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-200 ease-out ${
            isEntered
              ? 'bg-slate-950/65 dark:bg-black/80 backdrop-blur-md opacity-100'
              : 'bg-slate-950/0 backdrop-blur-none opacity-0'
          }`}
        >
          {/* Isolated Pop-Out Element Container */}
          <div
            data-testid="spotlight-zoom-stage"
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[92vw] max-h-[80vh] overflow-auto rounded-2xl shadow-[0_32px_90px_-15px_rgba(0,0,0,0.65)] ring-1 ring-white/25 dark:ring-sky-400/25 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isEntered
                ? 'translate3d(0, 0, 0) scale(1)'
                : `translate3d(${initDx * 0.25}px, ${initDy * 0.25}px, 0) scale(0.88)`,
              opacity: isEntered ? 1 : 0.3
            }}
          >
            <div
              ref={cloneHostRef}
              dir={snapshot.direction}
              className={
                snapshot.needsSurfaceBg
                  ? 'bg-white dark:bg-[#131c24] text-[#1c2830] dark:text-[#e8ebe9] p-5 sm:p-6'
                  : 'text-[#1c2830] dark:text-[#e8ebe9]'
              }
              style={{
                width: `${snapshot.origWidth}px`,
                maxWidth: '100%',
                borderRadius: snapshot.borderRadius,
                // CSS zoom enlarges text & layout cleanly with razor-sharp vector rendering
                zoom: zoomLevel as unknown as number
              }}
            />
          </div>

          {/* Floating Bottom Studio Zoom Control Dock */}
          <div
            data-testid="spotlight-zoom-controls"
            dir={isFa ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
            className={`mt-5 px-3 py-2 rounded-full bg-slate-900/95 dark:bg-slate-950/95 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-white transition-all duration-300 ${
              isEntered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              type="button"
              data-testid="spotlight-zoom-out"
              onClick={() => {
                playTactileSound('switch');
                setZoomLevel((z) => Math.max(1.0, Number((z - 0.15).toFixed(2))));
              }}
              disabled={zoomLevel <= 1.0}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-35 transition-colors cursor-pointer"
              title={isFa ? 'کوچک‌نمایی (-)' : 'Zoom Out (-)'}
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              data-testid="spotlight-zoom-reset"
              onClick={() => {
                playTactileSound('switch');
                setZoomLevel(snapshot.autoZoom);
              }}
              dir="ltr"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 font-mono text-xs font-extrabold tabular-nums min-w-[58px] text-center transition-colors cursor-pointer"
              title={isFa ? 'بازنشانی به زوم هوشمند (0)' : 'Reset to auto-fit (0)'}
            >
              {Math.round(zoomLevel * 100)}%
            </button>

            <button
              type="button"
              data-testid="spotlight-zoom-in"
              onClick={() => {
                playTactileSound('switch');
                setZoomLevel((z) => Math.min(2.2, Number((z + 0.15).toFixed(2))));
              }}
              disabled={zoomLevel >= 2.2}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-35 transition-colors cursor-pointer"
              title={isFa ? 'بزرگ‌نمایی (+)' : 'Zoom In (+)'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <span aria-hidden="true" className="w-px h-4 bg-white/15 mx-0.5" />

            <button
              type="button"
              data-testid="spotlight-repick-btn"
              onClick={() => {
                playTactileSound('switch');
                setSnapshot(null);
                setIsEntered(false);
                onPickModeChange(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 hover:bg-sky-500/35 border border-sky-400/35 text-sky-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFa ? 'انتخاب بخش دیگر' : 'Pick Another'}</span>
            </button>

            <button
              type="button"
              data-testid="spotlight-close-btn"
              onClick={closeSpotlight}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 hover:bg-rose-500/80 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isFa ? 'بستن (Esc)' : 'Close'}</span>
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
