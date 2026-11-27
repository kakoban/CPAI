/**
 * Opens an external AI workspace (ChatGPT, Claude, Gemini, NotebookLM) in a docked
 * side companion window on the right side of the screen.
 */
export function openAiCompanionWindow(
  url: string,
  targetName: string = 'ai_companion'
): Window | null {
  if (typeof window === 'undefined') return null;

  const availW = window.screen.availWidth || window.innerWidth || 1366;
  const availH = window.screen.availHeight || window.innerHeight || 768;
  const width = Math.min(540, Math.round(availW * 0.42));
  const height = Math.round(availH * 0.92);
  const left = Math.max(0, availW - width - 20);
  const top = 30;

  const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`;
  const popup = window.open(url, targetName, features);

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    return window.open(url, '_blank', 'noopener,noreferrer');
  }

  try {
    popup.focus();
  } catch {
    // ignore cross-origin focus error
  }
  return popup;
}
