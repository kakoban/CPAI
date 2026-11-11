import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MarkdownTemplate, MarkdownDocument, HeadingItem } from './types';
import { MARKDOWN_TEMPLATES } from './sampleDocs';
import {
  X,
  Sparkles,
  FilePlus2,
  Replace,
  BookOpen,
  Highlighter,
  Search,
  ReplaceAll,
  Check,
  CaseSensitive,
  FileText,
  Star,
  ArrowUpDown,
  CornerDownLeft,
  ListTree,
  Hash,
} from 'lucide-react';

/* ============================================================
   1. Templates Modal
   ============================================================ */
interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MarkdownTemplate, mode: 'new' | 'replace') => void;
}

export const MdTemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      dir="rtl"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                گالری قالب‌های آماده مارک‌دان اوج
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ساختارهای استاندارد آموزشی، منشور CPMAI، مهندسی پرامپت RCTO و اسلاید ارائه
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {MARKDOWN_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tpl.name}
                      </h3>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                        {tpl.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2 mb-4">
                  {tpl.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(tpl, 'new');
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  <FilePlus2 className="w-3.5 h-3.5" />
                  <span>ایجاد سند جدید</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(tpl, 'replace');
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  title="جایگزینی در سند فعلی"
                >
                  <Replace className="w-3.5 h-3.5" />
                  <span>جایگزینی</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   2. Cheatsheet Modal
   ============================================================ */
interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MdCheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { title: 'تیترهای اصلی و فرعی', code: '# تیتر ۱\n## تیتر ۲\n### تیتر ۳', desc: 'ساختاردهی سلسله‌مراتبی به سند' },
    { title: 'تاکیدها (ضخیم و مورب)', code: '**متن ضخیم**\n*متن مورب*\n~~خط‌خورده~~', desc: 'برجسته‌سازی واژگان مهم' },
    {
      title: 'هایلایت و ماژیک رنگی (۶ رنگ)',
      code: '==yellow:متن زرد==\n==green:متن سبز==\n==blue:متن آبی==\n==pink:متن صورتی==',
      desc: 'رنگ‌ها: yellow, green, blue, pink, purple, orange',
    },
    {
      title: 'کادرهای آموزشی (Callouts)',
      code: '> [!NOTE]\n> متن نکته آموزشی\n\n> [!IMPORTANT]\n> نکته امتحانی مهم',
      desc: 'انواع: NOTE, TIP, IMPORTANT, WARNING, CAUTION',
    },
    {
      title: 'فرمول‌های ریاضی (KaTeX)',
      code: 'فرمول خطی: $E = mc^2$\n\nفرمول بلوکی:\n$$\n\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\n$$',
      desc: 'پشتیبانی کامل از دستورات LaTeX',
    },
    {
      title: 'نمودار و فلوچارت (Mermaid)',
      code: '```mermaid\nflowchart LR\n  A[شروع] --> B[پایان]\n```',
      desc: 'رسم خودکار چارت و دیاگرام از روی متن',
    },
    {
      title: 'پیوندهای سیناپس (WikiLinks)',
      code: '[[نام سند مقصد]]\n![[تزریق زنده محتوای سند]]',
      desc: 'ایجاد شبکه دانش بین اسناد استودیو',
    },
    {
      title: 'چک‌لیست و جدول',
      code: '- [x] انجام شده\n- [ ] در انتظار\n\n| ستون ۱ | ستون ۲ |\n|---|---|\n| الف | ب |',
      desc: 'لیست‌های تعاملی و جداول واکنش‌گرا',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      dir="rtl"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                راهنمای سریع دستورات مارک‌دان و قابلیت‌های استودیو اوج
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                شامل سینتکس استاندارد + سینتکس اختصاصی ماژیک ۶ رنگ، دیاگرام و کادرهای آموزشی
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70"
            >
              <div className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
                <Highlighter className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">{item.desc}</p>
              <pre
                dir="ltr"
                className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed"
              >
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   3. Search & Replace Modal
   ============================================================ */
interface SearchReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onChangeContent: (newContent: string) => void;
  onSelectMatch?: (start: number, end: number) => void;
}

export const MdSearchReplaceModal: React.FC<SearchReplaceModalProps> = ({
  isOpen,
  onClose,
  content,
  onChangeContent,
  onSelectMatch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replacedCount, setReplacedCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const getMatches = () => {
    if (!searchTerm) return [];
    const flags = caseSensitive ? 'g' : 'gi';
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    const matches: { index: number; length: number }[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({ index: match.index, length: match[0].length });
      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
    return matches;
  };

  const matches = getMatches();

  const handleFindNext = () => {
    if (matches.length === 0) return;
    const first = matches[0];
    onSelectMatch?.(first.index, first.index + first.length);
  };

  const handleReplaceFirst = () => {
    if (!searchTerm || matches.length === 0) return;
    const flags = caseSensitive ? '' : 'i';
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    const updated = content.replace(regex, replaceTerm);
    onChangeContent(updated);
    setReplacedCount(1);
    setTimeout(() => setReplacedCount(null), 2000);
  };

  const handleReplaceAll = () => {
    if (!searchTerm || matches.length === 0) return;
    const count = matches.length;
    const flags = caseSensitive ? 'g' : 'gi';
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    const updated = content.replace(regex, replaceTerm);
    onChangeContent(updated);
    setReplacedCount(count);
    setTimeout(() => setReplacedCount(null), 2500);
  };

  return (
    <div
      className="fixed top-20 left-6 z-[130] w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 animate-fadeIn"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <Search className="w-4 h-4 text-indigo-500" />
          <span>جستجو و جایگزینی در متن</span>
        </div>
        <div className="flex items-center gap-1">
          {searchTerm && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
              {matches.length} مورد
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="عبارت مورد جستجو..."
            className="w-full pr-3 pl-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setCaseSensitive(!caseSensitive)}
            title="حساس به حروف بزرگ و کوچک (Case Sensitive)"
            className={`absolute left-2 p-1 rounded-md transition-colors cursor-pointer ${
              caseSensitive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CaseSensitive className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="جایگزین شود با..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleFindNext}
            disabled={matches.length === 0}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>یافتن</span>
          </button>
          <button
            type="button"
            onClick={handleReplaceFirst}
            disabled={matches.length === 0}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-medium disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Replace className="w-3.5 h-3.5" />
            <span>جایگزینی یکی</span>
          </button>
          <button
            type="button"
            onClick={handleReplaceAll}
            disabled={matches.length === 0}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ReplaceAll className="w-3.5 h-3.5" />
            <span>همه ({matches.length})</span>
          </button>
        </div>

        {replacedCount !== null && (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium pt-1">
            <Check className="w-3.5 h-3.5" />
            <span>{replacedCount} مورد با موفقیت جایگزین شد!</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   4. Quick Switcher Modal (Ctrl+K)
   ============================================================ */
interface QuickSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: MarkdownDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateNewDoc: (initialTitle?: string) => void;
}

export const MdQuickSwitcherModal: React.FC<QuickSwitcherModalProps> = ({
  isOpen,
  onClose,
  documents,
  activeDocId,
  onSelectDoc,
  onCreateNewDoc,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q)
    );
  }, [documents, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredDocs.length, query]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredDocs.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, filteredDocs.length)) % Math.max(1, filteredDocs.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredDocs[selectedIndex]) {
        onSelectDoc(filteredDocs[selectedIndex].id);
        onClose();
      } else if (query.trim()) {
        onCreateNewDoc(query.trim());
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[135] flex items-start justify-center pt-[12vh] bg-slate-950/60 backdrop-blur-sm p-4"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی سریع در عنوان، دسته‌بندی یا متن اسناد (Ctrl+K)..."
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-50 dark:divide-slate-800/50">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => {
              const isSelected = idx === selectedIndex;
              const isCurrent = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => {
                    onSelectDoc(doc.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-right transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                      }`}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold truncate flex items-center gap-2">
                        <span>{doc.title}</span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-normal">
                            فعال
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{doc.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {doc.isFavorite && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-400 mb-3">سندی با عبارت «{query}» یافت نشد.</p>
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    onCreateNewDoc(query.trim());
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <span>+ ساخت سند جدید با نام «{query.trim()}»</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" /> پیمایش
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> انتخاب
            </span>
          </div>
          <span>ESC برای بستن</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   5. Outline Drawer (Table of Contents)
   ============================================================ */
interface OutlineDrawerProps {
  headings: HeadingItem[];
  isOpen: boolean;
  onClose: () => void;
  onJumpToLine?: (line: number) => void;
}

export const MdOutlineDrawer: React.FC<OutlineDrawerProps> = ({
  headings,
  isOpen,
  onClose,
  onJumpToLine,
}) => {
  if (!isOpen) return null;

  const scrollToHeading = (item: HeadingItem) => {
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onJumpToLine) {
      onJumpToLine(item.line);
    }
  };

  return (
    <div
      className="w-64 bg-slate-50/90 dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 select-none"
      dir="rtl"
    >
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <ListTree className="w-4 h-4 text-indigo-500" />
          <span>فهرست مطالب (TOC)</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {headings.length === 0 ? (
          <div className="text-center py-8 px-4 text-xs text-slate-400 dark:text-slate-500">
            هیچ تیتری (#) در سند یافت نشد. برای ایجاد فهرست خودکار از علامت # در ابتدای خط استفاده کنید.
          </div>
        ) : (
          headings.map((h, idx) => {
            const indentClass =
              {
                1: 'pr-2 font-bold text-slate-800 dark:text-slate-100',
                2: 'pr-5 font-semibold text-slate-700 dark:text-slate-300',
                3: 'pr-8 text-slate-600 dark:text-slate-400',
                4: 'pr-10 text-slate-500 dark:text-slate-400 text-[11px]',
                5: 'pr-12 text-slate-400 text-[11px]',
                6: 'pr-12 text-slate-400 text-[11px]',
              }[h.level] || 'pr-2';

            return (
              <button
                key={`${h.id}-${idx}`}
                type="button"
                onClick={() => scrollToHeading(h)}
                className={`w-full text-right py-1.5 pl-2 rounded-lg text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 truncate cursor-pointer ${indentClass}`}
              >
                <Hash className="w-3 h-3 opacity-40 shrink-0" />
                <span className="truncate">{h.text}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
