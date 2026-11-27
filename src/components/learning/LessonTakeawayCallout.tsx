import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '../../types/cpmai';

interface LessonTakeawayCalloutProps {
  lang: Language;
  labelFa?: string;
  labelEn?: string;
  text: React.ReactNode;
}

/**
 * Calm, single-surface takeaway block designed for focused reading.
 * Uses subtle semantic surface and hairline border (no thick accent bars or gradients).
 */
export const LessonTakeawayCallout: React.FC<LessonTakeawayCalloutProps> = ({
  lang,
  labelFa = 'جمع‌بندی کلیدی این گام',
  labelEn = 'Key Takeaway',
  text
}) => {
  if (!text || (typeof text === 'string' && !text.trim())) return null;

  return (
    <aside
      aria-label={lang === 'fa' ? labelFa : labelEn}
      className="rounded-[var(--cpai-radius)] bg-[var(--cpai-success-bg)] border border-[var(--cpai-success-border)] px-5 py-4 sm:px-6 sm:py-5"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          aria-hidden="true"
          className="w-5 h-5 text-[var(--cpai-success-text)] shrink-0 mt-1"
        />
        <div className="min-w-0 space-y-1">
          <div className="text-sm font-semibold text-[var(--cpai-success-text)]">
            {lang === 'fa' ? labelFa : labelEn}
          </div>
          <p className="text-[16px] sm:text-[17px] font-normal leading-[1.75] text-[var(--cpai-text)]">
            {text}
          </p>
        </div>
      </div>
    </aside>
  );
};
