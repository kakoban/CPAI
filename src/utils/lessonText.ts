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

/**
 * Splits a bullet string like "عنوان کلیدی: توضیح کامل..." into a bold header + body
 * for cleaner reading and visual hierarchy in lesson steps.
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
