import React from 'react';
import { Language, Theme } from '../types/cpmai';
import { UI_TRANSLATIONS } from '../data/translations';
import { Moon, Sun, Globe, FileDown, Settings, Printer, FileCode2 } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onOpenExport: () => void;
  onOpenSettings: () => void;
  onOpenMarkdownStudio?: () => void;
  overallProgress: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  onOpenExport,
  onOpenSettings,
  onOpenMarkdownStudio,
  overallProgress
}) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#ffffff]/90 dark:bg-[#1a2228]/90 backdrop-blur-md border-b border-[#d9dad5] dark:border-[#2d3942] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-base sm:text-lg tracking-tight text-[#1c2830] dark:text-[#e8ebe9]">
            {t.brand}
          </span>
          <span className="hidden sm:inline-block text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            · {t.brandTag}
          </span>
        </div>

        {/* Zone 2: Navigation / Progress indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
          <span>{t.overallProg}</span>
          <span className="font-mono font-medium text-[#e0533c] dark:text-[#fb7185]">
            {overallProgress}%
          </span>
          <div className="w-24 h-2 bg-[#d9dad5] dark:bg-[#2d3942] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e0533c] dark:bg-[#fb7185] transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Markdown Studio Button */}
          {onOpenMarkdownStudio && (
            <button
              onClick={onOpenMarkdownStudio}
              title={lang === 'fa' ? 'استودیو مارک‌دان اوج (آپلود، مرور و ویرایش فایل‌های .md)' : 'OWJ Markdown Studio'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'fa' ? 'استودیو مارک‌دان' : 'Markdown Studio'}</span>
            </button>
          )}

          {/* Print / PDF Button */}
          <button
            onClick={() => window.print()}
            title={t.printBtn}
            className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Export Dossier Modal Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[#e0533c] dark:text-[#fb7185]" />
            <span className="hidden sm:inline">{t.exportBtn}</span>
          </button>

          {/* Project Settings */}
          <button
            onClick={onOpenSettings}
            title={t.settingsBtn}
            className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.switchLang}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            title={t.themeToggle}
            className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
