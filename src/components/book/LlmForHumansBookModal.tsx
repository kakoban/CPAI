import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  X,
  Search,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sparkles,
  Brain,
  Layers,
  Cpu,
  ShieldAlert,
  Building2,
  ListChecks,
  Bookmark,
  Share2,
  Printer,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Sliders,
  Type
} from 'lucide-react';
import { LLM_FOR_HUMANS_CHAPTERS, LlmChapter } from '../../data/llmForHumansData';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../../data/logo';

interface LlmForHumansBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LlmForHumansBookModal: React.FC<LlmForHumansBookModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cpmai_llm_book_read');
      return saved ? JSON.parse(saved) : ['ch1'];
    } catch {
      return ['ch1'];
    }
  });

  // Keyboard navigation & close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Current active chapter
  const currentChapter = useMemo(() => {
    return (
      LLM_FOR_HUMANS_CHAPTERS.find((c) => c.id === selectedChapterId) ||
      LLM_FOR_HUMANS_CHAPTERS[0]
    );
  }, [selectedChapterId]);

  const currentIndex = useMemo(() => {
    return LLM_FOR_HUMANS_CHAPTERS.findIndex((c) => c.id === selectedChapterId);
  }, [selectedChapterId]);

  const prevChapter = currentIndex > 0 ? LLM_FOR_HUMANS_CHAPTERS[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < LLM_FOR_HUMANS_CHAPTERS.length - 1
      ? LLM_FOR_HUMANS_CHAPTERS[currentIndex + 1]
      : null;

  // Filtered chapters for search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return LLM_FOR_HUMANS_CHAPTERS;
    const q = searchQuery.toLowerCase();
    return LLM_FOR_HUMANS_CHAPTERS.filter(
      (c) =>
        c.titleFa.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.subtitleFa.toLowerCase().includes(q) ||
        c.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  const toggleChapterComplete = (id: string) => {
    setCompletedChapters((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem('cpmai_llm_book_read', JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedPromptId(id);
        setTimeout(() => setCopiedPromptId(null), 2500);
      });
    }
  };

  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'ListChecks':
        return <ListChecks className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const readingProgress = Math.round(
    (completedChapters.length / LLM_FOR_HUMANS_CHAPTERS.length) * 100
  );

  const fontClass =
    fontSize === 'sm'
      ? 'text-xs sm:text-sm leading-relaxed'
      : fontSize === 'lg'
      ? 'text-base sm:text-lg leading-loose'
      : 'text-sm sm:text-base leading-relaxed';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      dir="rtl"
    >
      {/* Outer Double Bezel Frame */}
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[950px] p-1.5 rounded-3xl bg-black/[0.1] dark:bg-white/[0.08] border border-black/[0.15] dark:border-white/[0.15] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Inner Window Container */}
        <div className="relative w-full h-full rounded-[calc(1.5rem-0.375rem)] bg-[#fbfbfa] dark:bg-[#12181f] text-[#1a2329] dark:text-[#e4e8eb] flex flex-col overflow-hidden shadow-inner">
          
          {/* Header Bar */}
          <header className="shrink-0 h-16 sm:h-20 px-4 sm:px-8 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#161e26]/80 backdrop-blur-xl flex items-center justify-between gap-4">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-600 text-white shadow-md shadow-cyan-500/20 shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                    EXECUTIVE DIGEST
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono hidden md:inline">
                    شورای کسب‌وکار اوج · CPMAI
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg font-black tracking-tight text-[#0f172a] dark:text-white">
                  مدل‌های زبانی بزرگ (LLM) به زبان آدمیزاد
                </h2>
              </div>
            </div>

            {/* Reading Controls & Close */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Progress Indicator */}
              <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06]">
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono font-medium text-gray-600 dark:text-gray-300">
                  {readingProgress}% خوانده‌شده
                </span>
              </div>

              {/* Font Size Toggle */}
              <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontSize === 'sm'
                      ? 'bg-white dark:bg-[#202b36] shadow-xs font-bold text-cyan-600 dark:text-cyan-400'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                  title="اندازه متن کوچک"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontSize === 'md'
                      ? 'bg-white dark:bg-[#202b36] shadow-xs font-bold text-cyan-600 dark:text-cyan-400'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                  title="اندازه متن استاندارد"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontSize === 'lg'
                      ? 'bg-white dark:bg-[#202b36] shadow-xs font-bold text-cyan-600 dark:text-cyan-400'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                  title="اندازه متن بزرگ"
                >
                  A+
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-2xl bg-black/[0.05] dark:bg-white/[0.06] hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer border border-black/[0.08] dark:border-white/[0.1]"
                title="بستن (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Body: Two-Column Layout (Sidebar Table of Contents + Reading Canvas) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar: Table of Contents */}
            <aside className="w-full md:w-80 lg:w-96 shrink-0 border-b md:border-b-0 md:border-l border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-[#141b22]/50 flex flex-col overflow-hidden max-h-[35vh] md:max-h-full">
              
              {/* Search Box */}
              <div className="p-3 sm:p-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در فصول و مباحث..."
                    className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1a232c] border border-black/[0.08] dark:border-white/[0.1] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-800 dark:text-gray-100 placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Chapters List */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 custom-scrollbar">
                {filteredChapters.map((ch) => {
                  const isSelected = ch.id === selectedChapterId;
                  const isRead = completedChapters.includes(ch.id);

                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full p-3 rounded-2xl text-right transition-all flex items-start gap-3 cursor-pointer group border ${
                        isSelected
                          ? 'bg-gradient-to-l from-cyan-500/10 via-sky-500/5 to-transparent border-cyan-500/40 dark:border-cyan-400/40 shadow-xs'
                          : 'bg-transparent border-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                      }`}
                    >
                      {/* Chapter Badge / Icon */}
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-white shadow-sm'
                            : 'bg-black/[0.04] dark:bg-white/[0.05] text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                        }`}
                      >
                        {getChapterIcon(ch.iconName)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                            فصل {ch.number}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {ch.readTimeMin} دقیقه
                          </span>
                        </div>
                        <h4
                          className={`text-xs sm:text-sm font-bold truncate leading-snug ${
                            isSelected
                              ? 'text-cyan-900 dark:text-cyan-100 font-extrabold'
                              : 'text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white'
                          }`}
                        >
                          {ch.titleFa}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5 font-light">
                          {ch.subtitleFa}
                        </p>
                      </div>

                      {/* Status Checkbox */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapterComplete(ch.id);
                        }}
                        className={`mt-1 text-xs shrink-0 cursor-pointer p-0.5 ${
                          isRead
                            ? 'text-emerald-500 hover:text-emerald-600'
                            : 'text-gray-300 dark:text-gray-600 hover:text-gray-400'
                        }`}
                        title={isRead ? 'علامت‌گذاری به عنوان خوانده‌نشده' : 'علامت‌گذاری به عنوان خوانده‌شده'}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isRead ? 'fill-emerald-500/20' : ''}`} />
                      </div>
                    </button>
                  );
                })}

                {filteredChapters.length === 0 && (
                  <div className="p-6 text-center text-xs text-gray-400">
                    موردی با این کلمه یافت نشد.
                  </div>
                )}
              </div>

              {/* Sidebar Footer info */}
              <div className="p-3 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01] text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>توسعه‌یافته در اکوسیستم اوج</span>
                <span className="font-mono text-[10px] text-cyan-600">PMI-CPMAI</span>
              </div>
            </aside>

            {/* Reading Canvas: Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 space-y-8 custom-scrollbar">
              
              {/* Chapter Header Card */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-bl from-cyan-500/10 via-sky-500/5 to-transparent border border-cyan-500/20 dark:border-cyan-400/20 overflow-hidden shadow-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-cyan-500 text-white text-xs font-mono font-bold tracking-wider shadow-xs">
                      فصل شماره {currentChapter.number}
                    </span>
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300" dir="ltr">
                      {currentChapter.titleEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 font-mono">
                      <span>مدت مطالعه:</span>
                      <strong className="text-cyan-600 dark:text-cyan-300">
                        {currentChapter.readTimeMin} دقیقه
                      </strong>
                    </span>
                    <span>•</span>
                    <button
                      onClick={() => toggleChapterComplete(currentChapter.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        completedChapters.includes(currentChapter.id)
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-black/[0.03] dark:bg-white/[0.05] text-gray-600 dark:text-gray-300 border-black/[0.08] dark:border-white/[0.1]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {completedChapters.includes(currentChapter.id)
                          ? 'مطالعه شده ✓'
                          : 'ثبت مطالعه'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    {currentChapter.titleFa}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    {currentChapter.subtitleFa}
                  </p>
                </div>
              </div>

              {/* Key Takeaways Box (نکات کلیدی) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>نکات کلیدی این فصل که باید در ذهن داشته باشید:</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                  {currentChapter.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chapter Sections */}
              <div className="space-y-8">
                {currentChapter.sections.map((sec, sIdx) => (
                  <article
                    key={sIdx}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161f28] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-5"
                  >
                    {/* Section Headings */}
                    <div className="space-y-1.5 border-b border-black/[0.05] dark:border-white/[0.06] pb-4">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                        {sec.heading}
                      </h3>
                      {sec.subheading && (
                        <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                          {sec.subheading}
                        </p>
                      )}
                    </div>

                    {/* Section Content */}
                    <div className={`text-gray-700 dark:text-gray-200 whitespace-pre-line ${fontClass}`}>
                      {sec.content}
                    </div>

                    {/* Analogy Callout (استعاره ملموس) */}
                    {sec.analogy && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <span>{sec.analogy.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                          {sec.analogy.description}
                        </p>
                      </div>
                    )}

                    {/* Code or Prompt Box */}
                    {sec.codeOrPrompt && (
                      <div className="rounded-2xl border border-black/[0.1] dark:border-white/[0.15] bg-[#0c1319] text-gray-100 overflow-hidden shadow-md" dir="ltr">
                        <div className="px-4 py-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs">
                          <span className="font-mono text-cyan-400 font-semibold">
                            {sec.codeOrPrompt.title}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(sec.codeOrPrompt!.text, `sec_${sIdx}`)
                            }
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all cursor-pointer"
                          >
                            {copiedPromptId === `sec_${sIdx}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">کپی شد!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>کپی پرامپت</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono whitespace-pre-wrap text-emerald-300/90 leading-relaxed overflow-x-auto text-right" dir="rtl">
                          {sec.codeOrPrompt.text}
                        </pre>
                        {sec.codeOrPrompt.explanation && (
                          <div className="p-3 bg-black/60 border-t border-white/5 text-[11px] text-gray-400 font-light text-right" dir="rtl">
                            💡 <strong>چرا این کارآمد است؟</strong> {sec.codeOrPrompt.explanation}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pro Tip */}
                    {sec.proTip && (
                      <div className="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25 flex items-start gap-3 text-xs sm:text-sm">
                        <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                        </span>
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <strong className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                            نکته کاربردی مدیران:
                          </strong>
                          {sec.proTip}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {/* Chapter Footer Navigation */}
              <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Previous Button */}
                {prevChapter ? (
                  <button
                    onClick={() => {
                      setSelectedChapterId(prevChapter.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#1a232c] border border-black/[0.08] dark:border-white/[0.1] hover:border-cyan-500 text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-mono">فصل قبل</span>
                      <span>{prevChapter.titleFa}</span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {/* Next Button */}
                {nextChapter ? (
                  <button
                    onClick={() => {
                      toggleChapterComplete(currentChapter.id);
                      setSelectedChapterId(nextChapter.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-l from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-cyan-500/20 group"
                  >
                    <div className="text-left">
                      <span className="text-[10px] opacity-75 block font-mono" dir="ltr">Next Chapter</span>
                      <span>فصل بعدی: {nextChapter.titleFa}</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      toggleChapterComplete(currentChapter.id);
                      onClose();
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
                  >
                    <span>اتمام کتابچه و بازگشت به پلتفرم</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
