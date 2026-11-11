import React, { useMemo, useEffect, useRef, useState } from 'react';
import { parseMarkdown } from './markdownParser';
import { debounceRenderMermaid } from './mermaidRenderer';
import { executeCode } from './codeRunner';
import { ThemeMode, FontFamily, HighlightColor, MarkdownDocument } from './types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Highlighter,
  Sparkles,
  Check,
  MessageSquarePlus,
  Link2,
} from 'lucide-react';
import { findInboundBacklinks } from './synapseEngine';

interface MdPreviewProps {
  markdown: string;
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: number;
  direction: 'rtl' | 'ltr' | 'auto';
  scrollPercentage?: number;
  onToggleCheckbox?: (checkboxIndex: number) => void;
  onUpdateMarkdown?: (newMarkdown: string) => void;
  documents?: MarkdownDocument[];
  activeDocId?: string;
  onSelectDoc?: (id: string) => void;
}

const PEN_COLORS: { color: HighlightColor; bg: string; label: string }[] = [
  { color: 'yellow', bg: 'bg-yellow-300', label: 'ماژیک زرد' },
  { color: 'green', bg: 'bg-emerald-400', label: 'ماژیک سبز' },
  { color: 'blue', bg: 'bg-sky-400', label: 'ماژیک آبی' },
  { color: 'pink', bg: 'bg-pink-400', label: 'ماژیک صورتی' },
  { color: 'purple', bg: 'bg-purple-400', label: 'ماژیک بنفش' },
  { color: 'orange', bg: 'bg-orange-400', label: 'ماژیک نارنجی' },
];

export const MdPreview: React.FC<MdPreviewProps> = ({
  markdown,
  theme,
  fontFamily,
  fontSize,
  direction,
  scrollPercentage,
  onToggleCheckbox,
  onUpdateMarkdown,
  documents = [],
  activeDocId = '',
  onSelectDoc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState<number>(100);
  const [maxWidth, setMaxWidth] = useState<'normal' | 'wide' | 'full'>('normal');
  const [readProgress, setReadProgress] = useState<number>(0);

  // Interactive Teacher Highlighter Mode
  const [teacherPenActive, setTeacherPenActive] = useState<boolean>(false);
  const [activePenColor, setActivePenColor] = useState<HighlightColor>('yellow');
  const [selectionToast, setSelectionToast] = useState<string | null>(null);
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
  const [teacherNoteText, setTeacherNoteText] = useState<string>('');

  const htmlContent = useMemo(
    () => parseMarkdown(markdown, { documents, activeDocId }),
    [markdown, documents, activeDocId]
  );

  const activeDoc = useMemo(
    () => documents.find((d) => d.id === activeDocId),
    [documents, activeDocId]
  );

  const backlinks = useMemo(() => {
    if (!activeDoc || !documents.length) return [];
    return findInboundBacklinks(activeDoc.title, documents);
  }, [activeDoc, documents]);

  useEffect(() => {
    if (contentRef.current) {
      debounceRenderMermaid(contentRef.current);
    }
  }, [htmlContent, theme]);

  const detectedDir = useMemo(() => {
    if (direction !== 'auto') return direction;
    const firstChars = markdown.trim().slice(0, 120);
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(firstChars) || firstChars.length === 0 ? 'rtl' : 'ltr';
  }, [markdown, direction]);

  useEffect(() => {
    if (scrollPercentage !== undefined && containerRef.current) {
      const el = containerRef.current;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        el.scrollTop = maxScroll * scrollPercentage;
      }
    }
  }, [scrollPercentage]);

  const handleContainerScroll = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 0) {
      setReadProgress(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
    } else {
      setReadProgress(100);
    }
  };

  // Handle interactive clicks on copy buttons, run buttons, synapse links, and task checkboxes
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Copy code button
      const copyBtn = target.closest('.copy-code-btn') as HTMLButtonElement | null;
      if (copyBtn) {
        const encodedCode = copyBtn.getAttribute('data-code');
        if (encodedCode) {
          const decodedCode = decodeURIComponent(encodedCode);
          navigator.clipboard.writeText(decodedCode);
          const span = copyBtn.querySelector('span');
          if (span) {
            const originalText = span.textContent;
            span.textContent = 'کپی شد!';
            copyBtn.classList.add('text-emerald-400');
            setTimeout(() => {
              span.textContent = originalText;
              copyBtn.classList.remove('text-emerald-400');
            }, 2000);
          }
        }
        return;
      }

      // 2. Live Code Execution (Sandbox Runner)
      const runBtn = target.closest('.run-code-btn') as HTMLButtonElement | null;
      if (runBtn) {
        const encodedCode = runBtn.getAttribute('data-code');
        const lang = runBtn.getAttribute('data-lang') || 'js';
        const wrapper = runBtn.closest('.code-block-wrapper');
        const consoleEl = wrapper?.querySelector('.code-output-console') as HTMLElement | null;

        if (encodedCode && consoleEl) {
          const decodedCode = decodeURIComponent(encodedCode);
          executeCode(decodedCode, lang, consoleEl);
        }
        return;
      }

      // 3. Synapse WikiLinks Navigation
      const synapseLink = target.closest('.synapse-link') as HTMLAnchorElement | null;
      if (synapseLink) {
        e.preventDefault();
        const docId = synapseLink.getAttribute('data-doc-id');
        if (docId && onSelectDoc) {
          onSelectDoc(docId);
        }
        return;
      }

      // 4. Interactive checkboxes
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'checkbox') {
        const allCheckboxes = Array.from(el.querySelectorAll('input[type="checkbox"]'));
        const idx = allCheckboxes.indexOf(target as HTMLInputElement);
        if (idx !== -1 && onToggleCheckbox) {
          onToggleCheckbox(idx);
        }
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [htmlContent, onToggleCheckbox, onSelectDoc]);

  const handleMouseUp = () => {
    if (!teacherPenActive || !onUpdateMarkdown) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2 || selectedText.length > 300 || selectedText.includes('\n')) return;

    if (markdown.includes(selectedText)) {
      const highlighted = `==${activePenColor}:${selectedText}==`;
      const updated = markdown.replace(selectedText, highlighted);
      onUpdateMarkdown(updated);
      selection.removeAllRanges();
      setSelectionToast(`«${selectedText.slice(0, 28)}${selectedText.length > 28 ? '...' : ''}» هایلایت شد!`);
      setTimeout(() => setSelectionToast(null), 2500);
    }
  };

  const handleAddTeacherNote = () => {
    if (!teacherNoteText.trim() || !onUpdateMarkdown) return;
    const noteBlock = `\n\n> [!IMPORTANT]\n> **یادداشت مطالعه:** ${teacherNoteText.trim()}\n`;
    onUpdateMarkdown(markdown + noteBlock);
    setTeacherNoteText('');
    setShowNoteInput(false);
    setSelectionToast('یادداشت به انتهای سند اضافه شد!');
    setTimeout(() => setSelectionToast(null), 2500);
  };

  const fontClass = {
    vazir: 'md-font-vazir',
    sans: 'md-font-sans',
    serif: 'md-font-serif',
    mono: 'md-font-mono',
  }[fontFamily];

  const widthClass = {
    normal: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-none',
  }[maxWidth];

  const scaledFontSize = Math.round((fontSize * zoom) / 100);

  return (
    <div
      ref={containerRef}
      onScroll={handleContainerScroll}
      className={`md-studio-root h-full w-full overflow-y-auto transition-colors duration-300 theme-${theme} ${fontClass} relative`}
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Top Reading Progress Bar */}
      <div className="sticky top-0 left-0 right-0 z-30 h-1 bg-transparent pointer-events-none no-print">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Floating Reader & Teacher Toolbar */}
      <div
        className="sticky top-3 z-20 flex flex-wrap justify-between items-center px-4 sm:px-6 pointer-events-none no-print gap-2"
        dir="rtl"
      >
        {/* Teacher Interactive Highlighter Bar */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-slate-900/85 dark:bg-slate-800/95 backdrop-blur-md text-white shadow-xl border border-white/10">
          <button
            type="button"
            onClick={() => setTeacherPenActive(!teacherPenActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              teacherPenActive
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'hover:bg-white/10 text-slate-200'
            }`}
            title="با روشن کردن قلم معلم، هر متنی را در پیش‌نمایش با ماوس انتخاب کنید، بلافاصله ماژیک کشیده می‌شود!"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>{teacherPenActive ? 'قلم هایلایت: روشن' : 'قلم هایلایت تعاملی'}</span>
          </button>

          {teacherPenActive && (
            <div className="flex items-center gap-1 px-1.5 border-r border-white/15">
              {PEN_COLORS.map((p) => (
                <button
                  key={p.color}
                  type="button"
                  onClick={() => setActivePenColor(p.color)}
                  className={`w-4 h-4 rounded-full ${p.bg} transition-transform flex items-center justify-center cursor-pointer ${
                    activePenColor === p.color
                      ? 'scale-125 ring-2 ring-white'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={p.label}
                >
                  {activePenColor === p.color && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="افزودن سریع یادداشت به انتهای سند"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">یادداشت سریع</span>
          </button>
        </div>

        {/* Zoom & Width Controls */}
        <div className="pointer-events-auto flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-900/80 dark:bg-slate-800/90 backdrop-blur-md text-white text-xs shadow-lg border border-white/10">
          <button
            type="button"
            onClick={() =>
              setMaxWidth((w) => (w === 'normal' ? 'wide' : w === 'wide' ? 'full' : 'normal'))
            }
            className="p-1 hover:bg-white/15 rounded-lg transition-colors flex items-center gap-1 px-1.5 cursor-pointer"
            title="تغییر عرض صفحه مطالعه"
          >
            {maxWidth === 'full' ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline text-[10px]">
              {maxWidth === 'normal' ? 'استاندارد' : maxWidth === 'wide' ? 'عریض' : 'تمام‌صفحه'}
            </span>
          </button>
          <div className="w-px h-3.5 bg-white/20 mx-0.5" />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(80, z - 10))}
            className="p-1 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
            title="کوچک‌نمایی"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] min-w-[38px] text-center">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            className="p-1 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
            title="بزرگ‌نمایی"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoom !== 100 && (
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="p-1 hover:bg-white/15 rounded-lg text-amber-300 transition-colors cursor-pointer"
              title="اندازه پیش‌فرض"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Teacher Note Drawer */}
      {showNoteInput && (
        <div
          className="sticky top-16 z-20 mx-auto max-w-xl px-4 mb-4 no-print animate-fadeIn"
          dir="rtl"
        >
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border-2 border-indigo-500 flex items-center gap-2">
            <input
              type="text"
              value={teacherNoteText}
              onChange={(e) => setTeacherNoteText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTeacherNote()}
              placeholder="متن نکته یا یادداشت مطالعه را بنویسید..."
              className="flex-1 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <button
              type="button"
              onClick={handleAddTeacherNote}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              ثبت در سند
            </button>
          </div>
        </div>
      )}

      {/* Selection Highlight Feedback Toast */}
      {selectionToast && (
        <div
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-amber-400/40 animate-bounce no-print"
          dir="rtl"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{selectionToast}</span>
        </div>
      )}

      {teacherPenActive && (
        <div className="mx-auto max-w-md mb-2 px-4 text-center no-print" dir="rtl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-semibold">
            <Highlighter className="w-3.5 h-3.5" />
            <span>حالت ماژیک فعال است: هر عبارت یا جمله‌ای را با ماوس انتخاب کنید تا هایلایت شود.</span>
          </div>
        </div>
      )}

      <div
        ref={contentRef}
        onMouseUp={handleMouseUp}
        dir={detectedDir}
        style={{ fontSize: `${scaledFontSize}px` }}
        className={`markdown-body ${widthClass} mx-auto px-6 sm:px-12 pb-16 pt-4 transition-all duration-200 ${
          teacherPenActive ? 'cursor-text selection:bg-amber-300 selection:text-slate-900' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Inbound Backlinks Section */}
      {backlinks.length > 0 && (
        <div className={`${widthClass} mx-auto px-6 sm:px-12 pb-20 no-print`} dir="rtl">
          <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400">
              <Link2 className="w-4 h-4 text-indigo-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                پیوندهای ورودی به این سند ({backlinks.length})
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {backlinks.map((bl, idx) => (
                <button
                  key={`${bl.sourceDocId}-${idx}`}
                  type="button"
                  onClick={() => onSelectDoc?.(bl.sourceDocId)}
                  className="text-right p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group cursor-pointer"
                >
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline mb-1">
                    {bl.sourceDocTitle}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 font-mono leading-relaxed">
                    {bl.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
