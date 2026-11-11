import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Quote,
  Code,
  FileCode,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Link,
  Image,
  Minus,
  AlertCircle,
  Lightbulb,
  Info,
  AlertTriangle,
  Flame,
  ChevronDown,
  Undo2,
  Redo2,
  HelpCircle,
  GitGraph,
  Sigma,
  Terminal,
} from 'lucide-react';
import { HighlightColor } from './types';

interface MdToolbarProps {
  onInsertMarkdown: (prefix: string, suffix?: string, defaultText?: string) => void;
  onInsertHighlight: (color: HighlightColor) => void;
  onInsertTable: (rows: number, cols: number) => void;
  onInsertCallout: (type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenCheatsheet: () => void;
}

const HIGHLIGHT_OPTIONS: { color: HighlightColor; label: string; bg: string; border: string }[] = [
  { color: 'yellow', label: 'زرد طلایی (نکته کلیدی)', bg: 'bg-yellow-300', border: 'border-yellow-500' },
  { color: 'green', label: 'سبز زمردی (فرمول / تعریف)', bg: 'bg-emerald-300', border: 'border-emerald-500' },
  { color: 'blue', label: 'آبی آسمانی (مفاهیم پایه)', bg: 'bg-sky-300', border: 'border-sky-500' },
  { color: 'pink', label: 'صورتی مرجانی (هشدار / امتحانی)', bg: 'bg-pink-300', border: 'border-pink-500' },
  { color: 'purple', label: 'بنفش یاسی (نکات پیشرفته)', bg: 'bg-purple-300', border: 'border-purple-500' },
  { color: 'orange', label: 'نارنجی کهربایی (مثال کاربردی)', bg: 'bg-orange-300', border: 'border-orange-500' },
];

export const MdToolbar: React.FC<MdToolbarProps> = ({
  onInsertMarkdown,
  onInsertHighlight,
  onInsertTable,
  onInsertCallout,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenCheatsheet,
}) => {
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showCalloutMenu, setShowCalloutMenu] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [hoverRows, setHoverRows] = useState(3);
  const [hoverCols, setHoverCols] = useState(3);

  const closeAllMenus = () => {
    setShowHighlightMenu(false);
    setShowCalloutMenu(false);
    setShowTableMenu(false);
  };

  return (
    <div
      className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center gap-1 flex-wrap select-none relative z-20 shadow-xs"
      dir="rtl"
    >
      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="واگرد (Ctrl+Z)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="انجام مجدد (Ctrl+Y)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n# ', '\n', 'عنوان اصلی اول')}
          title="تیتر ۱ (H1)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n## ', '\n', 'زیرعنوان بخش دوم')}
          title="تیتر ۲ (H2)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n### ', '\n', 'تیتر سطح سوم')}
          title="تیتر ۳ (H3)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n#### ', '\n', 'تیتر سطح چهارم')}
          title="تیتر ۴ (H4)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Heading4 className="w-4 h-4" />
        </button>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onInsertMarkdown('**', '**', 'متن ضخیم')}
          title="ضخیم (Bold - Ctrl+B)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('*', '*', 'متن مورب')}
          title="مورب (Italic - Ctrl+I)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('~~', '~~', 'متن خط‌خورده')}
          title="خط‌خورده (Strikethrough)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        {/* Highlight Marker Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const next = !showHighlightMenu;
              closeAllMenus();
              setShowHighlightMenu(next);
            }}
            title="ماژیک هایلایت آموزشی (۶ رنگ)"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 transition-colors text-xs font-semibold cursor-pointer"
          >
            <Highlighter className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">هایلایت</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {showHighlightMenu && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 px-2 py-1 mb-1">
                انتخاب رنگ ماژیک آموزشی:
              </div>
              <div className="space-y-1">
                {HIGHLIGHT_OPTIONS.map((opt) => (
                  <button
                    key={opt.color}
                    type="button"
                    onClick={() => {
                      onInsertHighlight(opt.color);
                      setShowHighlightMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors text-right cursor-pointer"
                  >
                    <span className={`w-4 h-4 rounded-md ${opt.bg} border ${opt.border} shrink-0`} />
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code, Math & Diagrams */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onInsertMarkdown('`', '`', 'code')}
          title="کد درون‌خطی (Inline Code)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            onInsertMarkdown(
              '\n```javascript\n',
              '\n```\n',
              'function greet(name) {\n  return `سلام ${name}!`;\n}'
            )
          }
          title="بلوک کد برنامه‌نویسی (Code Block)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <FileCode className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            onInsertMarkdown(
              '\n```python\n',
              '\n```\n',
              '# اجرای زنده پایتون (با کلیک روی دکمه اجرای زنده در پیش‌نمایش)\nscores = [18.5, 19.2, 20.0, 17.8]\navg = sum(scores) / len(scores)\nprint(f"میانگین نمرات کلاس: {avg:.2f}")'
            )
          }
          title="درج کد قابل اجرای زنده (Python / JS Sandbox)"
          className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            onInsertMarkdown(
              '\n```mermaid\n',
              '\n```\n',
              'flowchart LR\n    A[شروع مبحث] --> B{آیا مفهوم روشن است؟}\n    B -- بله --> C[حل تمرین عملی]\n    B -- خیر --> D[مرور مجدد مثال‌ها]\n    D --> B'
            )
          }
          title="درج نمودار و فلوچارت هوشمند (Mermaid Diagram)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <GitGraph className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            onInsertMarkdown('\n$$\n', '\n$$\n', 'f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi')
          }
          title="فرمول ریاضی پیشرفته (KaTeX Math)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Sigma className="w-4 h-4" />
        </button>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n- ', '', 'آیتم لیست نقطه‌ای')}
          title="لیست نقطه‌ای"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n1. ', '', 'آیتم لیست شماره‌دار')}
          title="لیست شماره‌دار"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n- [ ] ', '', 'وظیفه یا تمرین جدید')}
          title="چک‌لیست تعاملی (Task List)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <CheckSquare className="w-4 h-4" />
        </button>
      </div>

      {/* Callouts & Quotes */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onInsertMarkdown('\n> ', '\n', 'نقل‌قول یا عبارت کلیدی...')}
          title="نقل‌قول (Blockquote)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const next = !showCalloutMenu;
              closeAllMenus();
              setShowCalloutMenu(next);
            }}
            title="باکس‌های آموزشی و هشدار (Callouts)"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors text-xs font-semibold cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">کادر آموزشی</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {showCalloutMenu && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 px-2 py-1">افزودن باکس آموزشی:</div>
              <button
                type="button"
                onClick={() => {
                  onInsertCallout('NOTE');
                  setShowCalloutMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4 text-blue-500" />
                <span>نکته و یادداشت (NOTE)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertCallout('TIP');
                  setShowCalloutMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>ترفند و راهکار (TIP)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertCallout('IMPORTANT');
                  setShowCalloutMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
              >
                <Flame className="w-4 h-4 text-purple-500" />
                <span>بسیار مهم / امتحانی (IMPORTANT)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertCallout('WARNING');
                  setShowCalloutMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>هشدار (WARNING)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertCallout('CAUTION');
                  setShowCalloutMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>احتیاط / خطای رایج (CAUTION)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Generator, Links, Images, Divider */}
      <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const next = !showTableMenu;
              closeAllMenus();
              setShowTableMenu(next);
            }}
            title="ساخت جدول"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Table className="w-4 h-4" />
          </button>

          {showTableMenu && (
            <div className="absolute right-0 mt-1.5 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 w-48">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 text-center">
                جدول {hoverRows} در {hoverCols}
              </div>
              <div className="grid grid-cols-5 gap-1.5 justify-items-center" dir="ltr">
                {Array.from({ length: 5 }).map((_, rIdx) =>
                  Array.from({ length: 5 }).map((__, cIdx) => {
                    const r = rIdx + 1;
                    const c = cIdx + 1;
                    const active = r <= hoverRows && c <= hoverCols;
                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onMouseEnter={() => {
                          setHoverRows(r);
                          setHoverCols(c);
                        }}
                        onClick={() => {
                          onInsertTable(r, c);
                          setShowTableMenu(false);
                        }}
                        className={`w-6 h-6 rounded border transition-all cursor-pointer ${
                          active
                            ? 'bg-indigo-500 border-indigo-600 scale-105'
                            : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onInsertMarkdown('[', '](https://example.com)', 'عنوان لینک')}
          title="افزودن لینک (Ctrl+K)"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            onInsertMarkdown(
              '![',
              '](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80)',
              'توضیح تصویر آموزشی'
            )
          }
          title="افزودن تصویر با زیرنویس خودکار"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Image className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onInsertMarkdown('\n\n---\n\n', '', '')}
          title="خط جداکننده افقی"
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Help / Cheatsheet */}
      <div className="mr-auto flex items-center">
        <button
          type="button"
          onClick={onOpenCheatsheet}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="راهنمای دستورات مارک‌دان"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline">راهنمای سینتکس</span>
        </button>
      </div>
    </div>
  );
};
