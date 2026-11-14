import React, { useState, useEffect } from 'react';
import { StickyNote, Eye, EyeOff, ChevronDown, ChevronUp, X, Clock, MessageCircleQuestion, AlertTriangle, Target } from 'lucide-react';
import { Language } from '../../types/cpmai';
import {
  PresenterPageKey,
  getPresenterPageKey,
  getPresenterNoteForPage,
  loadCustomPresenterNotes,
  saveCustomPresenterNote,
  loadPrivacyMaskPref,
  savePrivacyMaskPref,
} from '../../data/presenterNotes';

interface PresenterNotesPanelProps {
  page: PresenterPageKey;
  sessionTitle: string;
  lang: Language;
  onClose: () => void;
}

export const PresenterNotesPanel: React.FC<PresenterNotesPanelProps> = ({
  page,
  sessionTitle,
  lang,
  onClose,
}) => {
  const isFa = lang === 'fa';
  const pageKey = getPresenterPageKey(page);
  const curated = getPresenterNoteForPage(page);

  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isMasked, setIsMasked] = useState<boolean>(() => loadPrivacyMaskPref());
  const [customNotes, setCustomNotes] = useState<Record<string, string>>(() => loadCustomPresenterNotes());
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const currentCustomNote = customNotes[pageKey] ?? '';

  useEffect(() => {
    setSavedNotice(false);
  }, [pageKey]);

  const handleToggleMask = () => {
    setIsMasked((prev) => {
      const next = !prev;
      savePrivacyMaskPref(next);
      return next;
    });
  };

  const handleCustomNoteChange = (value: string) => {
    setCustomNotes((prev) => saveCustomPresenterNote(pageKey, value, prev));
    setSavedNotice(true);
  };

  return (
    <aside
      data-testid="presenter-notes-panel"
      aria-label={isFa ? 'یادداشت‌های محرمانه مدرس' : 'Private Presenter Notes'}
      className="fixed bottom-4 start-4 z-50 w-[min(23.5rem,calc(100vw-2rem))] rounded-2xl bg-white/95 dark:bg-[#0f1720]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/90 shadow-[0_18px_45px_-15px_rgba(15,23,42,0.28)] overflow-hidden transition-all"
    >
      {/* Compact Header Bar */}
      <div className="px-3.5 py-2.5 bg-slate-50/90 dark:bg-[#16212c] border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-[#1f5163] dark:bg-[#6fb3c6] text-white dark:text-[#0b1117] flex items-center justify-center shrink-0">
            <StickyNote className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {isFa ? 'یادداشت محرمانه مدرس' : 'Presenter Notes'}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-bold shrink-0">
                {isFa ? 'خصوصی' : 'Private'}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {sessionTitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleToggleMask}
            data-testid="presenter-notes-mask-btn"
            aria-pressed={isMasked}
            title={
              isFa
                ? isMasked
                  ? 'نمایش متن یادداشت‌ها'
                  : 'تار کردن متن (محافظت هنگام اشتراک‌گذاری صفحه)'
                : isMasked
                ? 'Unblur private notes'
                : 'Blur notes for screen-share safety'
            }
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isMasked
                ? 'bg-[#1f5163]/15 border-[#1f5163]/40 text-[#1f5163] dark:text-[#6fb3c6]'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1f5163]/50'
            }`}
          >
            {isMasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            data-testid="presenter-notes-minimize-btn"
            aria-expanded={!isMinimized}
            title={isFa ? (isMinimized ? 'باز کردن یادداشت‌ها' : 'جمع کردن پنل') : isMinimized ? 'Expand notes' : 'Minimize panel'}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1f5163]/50 transition-colors cursor-pointer"
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            data-testid="presenter-notes-close-btn"
            title={isFa ? 'بستن پنل یادداشت‌ها' : 'Close Presenter Notes'}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-700 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Collapsible Content Body */}
      {!isMinimized && (
        <div
          data-testid="presenter-notes-body"
          className={`p-3.5 space-y-2.5 max-h-[58vh] overflow-y-auto text-xs transition-all duration-200 ${
            isMasked ? 'blur-[5px] hover:blur-none focus-within:blur-none select-none' : ''
          }`}
        >
          {/* Pacing Strip */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#1f5163]/8 dark:bg-[#6fb3c6]/10 border border-[#1f5163]/15 dark:border-[#6fb3c6]/20 text-[#1f5163] dark:text-[#8fd0e0]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold leading-snug">
              {isFa ? curated.pacingFa : curated.pacingEn}
            </span>
          </div>

          {/* Teaching Focus */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
              <Target className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#6fb3c6] shrink-0" />
              <span>{isFa ? 'محور کلیدی تدریس' : 'Teaching Focus'}</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              {isFa ? curated.focusFa : curated.focusEn}
            </p>
          </div>

          {/* Discussion Hook / Question */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#16212c] border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1e8f6b] dark:text-[#63c496]">
              <MessageCircleQuestion className="w-3.5 h-3.5 shrink-0" />
              <span>{isFa ? 'پرسش پیشنهادی از کلاس' : 'Class Discussion Prompt'}</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
              {isFa ? curated.classQuestionFa : curated.classQuestionEn}
            </p>
          </div>

          {/* Common Student Pitfall */}
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{isFa ? 'نکته کنکوری / تله رایج دانشجوها' : 'Watch Out / Common Pitfall'}</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-amber-900/85 dark:text-amber-200/85">
              {isFa ? curated.pitfallFa : curated.pitfallEn}
            </p>
          </div>

          {/* Private Editable Instructor Note */}
          <div className="pt-1 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor={`presenter-custom-note-${pageKey}`}
                className="text-[11px] font-bold text-slate-700 dark:text-slate-200"
              >
                {isFa ? 'یادداشت شخصی شما (محرمانه روی همین دستگاه)' : 'Your Private Note (Saved Locally)'}
              </label>
              {savedNotice && (
                <span className="text-[10px] font-semibold text-[#1e8f6b] dark:text-[#63c496]">
                  {isFa ? '✓ ذخیره شد' : '✓ Saved'}
                </span>
              )}
            </div>
            <textarea
              id={`presenter-custom-note-${pageKey}`}
              data-testid="presenter-notes-textarea"
              rows={2}
              value={currentCustomNote}
              onChange={(e) => handleCustomNoteChange(e.target.value)}
              placeholder={
                isFa
                  ? 'نکته کلاسی، مثال گروهی یا زمان‌بندی شخصی خودتان را اینجا بنویسید...'
                  : 'Jot down private cues, team examples, or timing reminders...'
              }
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1117] px-2.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1f5163] dark:focus:border-[#6fb3c6] resize-y leading-relaxed"
            />
          </div>
        </div>
      )}
    </aside>
  );
};
