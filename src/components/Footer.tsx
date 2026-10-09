import React from 'react';
import { Language } from '../types/cpmai';
import { UI_TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <footer className="mt-16 pt-8 border-t border-[#d9dad5] dark:border-[#2d3942] text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span>{t.by} </span>
          <a
            href="https://owjbc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:text-[#1f5163] dark:hover:text-[#6fb3c6] transition-colors underline decoration-[#1f5163]/40 underline-offset-4"
          >
            {t.org}
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="https://owjbc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1f5163] dark:hover:text-[#6fb3c6] transition-colors"
          >
            owjbc.com
          </a>
          <span className="text-[#d9dad5] dark:text-[#2d3942]">·</span>
          <a
            href="https://www.instagram.com/owjbc/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1f5163] dark:hover:text-[#6fb3c6] transition-colors"
          >
            {t.instagram}
          </a>
          <span className="text-[#d9dad5] dark:text-[#2d3942]">·</span>
          <a
            href="https://t.me/OWJBC"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1f5163] dark:hover:text-[#6fb3c6] transition-colors"
          >
            {t.telegram}
          </a>
        </div>
      </div>

      <div className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed" dir="ltr">
        &copy; {new Date().getFullYear()} Project Management Institute, Inc. All rights reserved. This material is being provided as part of a PMI&copy; CPMAI course by OWJ Business Council.
      </div>
    </footer>
  );
};
