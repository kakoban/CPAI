export const MONTHLY_AI_QUOTA_LIMIT = 5;

export interface AiQuotaState {
  limit: number;
  used: number;
  remaining: number;
  monthKey: string;
  resetLabelFa: string;
  isUnlimited: boolean;
  isExhausted: boolean;
  usagePct: number;
  statusTone: 'healthy' | 'low' | 'exhausted';
}

export interface SharedAiQaItem {
  id: number;
  questionText: string;
  answerText: string;
  topicId?: string;
  pageKey?: string;
  pageTitleFa?: string;
  industryTrack?: string;
  lang?: string;
  askedByLabel?: string;
  reuseCount: number;
  createdAt: string;
}

export interface AiGuidedTopic {
  id: string;
  labelFa: string;
  labelEn: string;
  promptFa: string;
  promptEn: string;
}

export const AI_GUIDED_TOPICS: AiGuidedTopic[] = [
  {
    id: 'prompt_rcto',
    labelFa: 'پرامپت‌نویسی RCTO',
    labelEn: 'RCTO Prompting',
    promptFa: 'یک پرامپت حرفه‌ای با چارچوب RCTO (نقش، بافتار، وظیفه، خروجی) برای یک مسئله واقعی در حوزه تخصصی من طراحی کن و توضیح بده هر بخش چه نقشی دارد.',
    promptEn: 'Design a practical RCTO prompt tailored to my active discipline and explain each component.'
  },
  {
    id: 'markdown_github',
    labelFa: 'Markdown و GitHub',
    labelEn: 'Markdown & GitHub',
    promptFa: 'تفاوت فایل Markdown با Word/PDF در کار با هوش مصنوعی چیست و چطور یک ساختار تمیز برای مستندات پروژه در GitHub بسازم؟',
    promptEn: 'Explain why Markdown works better than Word/PDF with AI and suggest a clean GitHub repository layout for project docs.'
  },
  {
    id: 'notebooklm_audit',
    labelFa: 'NotebookLM و ممیزی اسناد',
    labelEn: 'NotebookLM & Audit',
    promptFa: 'بهترین روش برای استفاده از NotebookLM جهت استخراج بدون توهم بندهای مهم قرارداد یا گزارش فنی پروژه چیست؟ ۳ پرامپت کاربردی بده.',
    promptEn: 'What is the best workflow in NotebookLM to extract grounded contract or technical report findings without hallucination?'
  },
  {
    id: 'skills_mcp',
    labelFa: 'AI Skills و MCP',
    labelEn: 'AI Skills & MCP',
    promptFa: 'تفاوت AI Skill با MCP Connector به زبان ساده چیست و چه زمانی در پروژه‌های سازمانی باید از هر کدام استفاده کنیم؟',
    promptEn: 'Explain the practical difference between an AI Skill and an MCP Connector with an enterprise project example.'
  },
  {
    id: 'database_crud',
    labelFa: 'دیتابیس و عملیات CRUD',
    labelEn: 'Database & CRUD',
    promptFa: 'برای ثبت دائمی گزارش‌های فنی یا سفارش‌ها، چطور بین SQLite، PostgreSQL و NoSQL انتخاب کنیم و فیلدهای کلیدی جدول چه باید باشد؟',
    promptEn: 'How should I choose between SQLite, PostgreSQL, and NoSQL for technical reports, and what core table columns should I define?'
  },
  {
    id: 'cpmai_phases',
    labelFa: 'فازهای CPMAI و ROI',
    labelEn: 'CPMAI & ROI',
    promptFa: 'چطور یک ایده هوش مصنوعی در سازمان را با استاندارد PMI-CPMAI ارزیابی کنیم تا مطمئن شویم واقعاً نیازمند AI است و ROI قابل دفاعی دارد؟',
    promptEn: 'How do I validate an enterprise AI idea under PMI-CPMAI Phase I to confirm AI necessity and defensible ROI?'
  }
];

const PERSIAN_AND_ENGLISH_STOPWORDS = new Set([
  'در', 'از', 'به', 'با', 'که', 'است', 'هست', 'این', 'آن', 'را', 'برای', 'یک', 'و', 'یا', 'تا', 'بر', 'هم',
  'می', 'شود', 'شده', 'کن', 'کنم', 'کنیم', 'بده', 'دهید', 'بگو', 'توضیح', 'لطفاً', 'لطفا', 'چطور', 'چگونه',
  'چیست', 'چه', 'کدام', 'آیا', 'من', 'ما', 'شما', 'خود', 'روی', 'بین', 'باید', 'دارد', 'دارند', 'اینکه',
  'the', 'is', 'are', 'a', 'an', 'of', 'to', 'in', 'for', 'on', 'with', 'and', 'or', 'what', 'how',
  'why', 'please', 'explain', 'give', 'me', 'my', 'can', 'should', 'do', 'does', 'this', 'that', 'it'
]);

/**
 * Normalize Persian/Arabic characters, zero-width joiners, digits, and punctuation
 * so duplicate or near-duplicate prompts reliably map to the same canonical form.
 */
export function normalizeAiQuestionText(text: string): string {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .replace(/[\u200c\u200b\u200d\ufeff]/g, ' ')
    .replace(/[يیئ]/g, 'ی')
    .replace(/[كک]/g, 'ک')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ؤ]/g, 'و')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u060c\u061b\u061f\u0640\u066a-\u066d]/g, ' ')
    .replace(/[^a-z0-9\u0600-\u06ff\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract meaningful keywords from a prompt after removing common filler/stop words.
 */
export function tokenizeAiQuestion(text: string): string[] {
  const norm = normalizeAiQuestionText(text);
  if (!norm) return [];
  const rawTokens = norm.split(' ').filter((tok) => tok.length >= 2);
  const meaningful = rawTokens.filter((tok) => !PERSIAN_AND_ENGLISH_STOPWORDS.has(tok));
  return Array.from(new Set(meaningful.length > 0 ? meaningful : rawTokens));
}

/**
 * Canonical deduplication key built from sorted meaningful tokens (capped for DB indexing).
 */
export function buildNormalizedQuestionKey(text: string): string {
  const tokens = tokenizeAiQuestion(text).sort();
  if (!tokens.length) return normalizeAiQuestionText(text).slice(0, 180);
  return tokens.join('_').slice(0, 180);
}

/**
 * Compute similarity score in [0, 1] between two prompts using exact canonical match
 * plus Dice/Jaccard token overlap over meaningful words.
 */
export function computeQuestionSimilarity(a: string, b: string): number {
  const normA = normalizeAiQuestionText(a);
  const normB = normalizeAiQuestionText(b);
  if (!normA || !normB) return 0;
  if (normA === normB) return 1;

  const keyA = buildNormalizedQuestionKey(normA);
  const keyB = buildNormalizedQuestionKey(normB);
  if (keyA && keyA === keyB) return 1;

  const setA = new Set(tokenizeAiQuestion(normA));
  const setB = new Set(tokenizeAiQuestion(normB));
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const tok of setA) {
    if (setB.has(tok)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  const jaccard = union > 0 ? intersection / union : 0;
  const dice = (2 * intersection) / (setA.size + setB.size);

  // Blend Jaccard and Dice so minor wording variations still score >= 0.72 while unrelated topics stay low
  return Number(((jaccard * 0.45) + (dice * 0.55)).toFixed(4));
}

/**
 * Detect whether the student is asking for a personalized audit of their own non-empty workbook draft.
 * Personal draft audits should not be served from or saved into the public shared Q&A bank.
 */
export function isPersonalDraftAuditQuestion(question: string, userDraft: string): boolean {
  if (!userDraft || userDraft.trim().length < 20) return false;
  const norm = normalizeAiQuestionText(question);
  return /(ممیزی|دست نویس|پیش نویس|پاسخ من|پاسخ فعلی|نوشتم|وارد کردم|نقد کن|بررسی کن|audit my|review my|critique my|my draft|my current)/i.test(
    norm
  );
}

/**
 * Find the highest-scoring matching Q&A item above threshold for zero-token-burn reuse or duplicate guarding.
 */
export function findBestMatchingQa<T>(
  candidateQuestion: string,
  items: T[],
  getText: (item: T) => string,
  threshold = 0.72
): { item: T; score: number } | null {
  let bestItem: T | null = null;
  let bestScore = 0;

  for (const item of items) {
    const score = computeQuestionSimilarity(candidateQuestion, getText(item));
    if (score >= threshold && score > bestScore) {
      bestScore = score;
      bestItem = item;
      if (score === 1) break;
    }
  }

  return bestItem ? { item: bestItem, score: bestScore } : null;
}

/**
 * Compute YYYY-MM month key in Asia/Tehran timezone so monthly resets align cleanly with local Iranian calendar transitions.
 */
export function getTehranMonthKey(dateInput?: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : dateInput ? new Date(dateInput) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tehran',
      year: 'numeric',
      month: '2-digit'
    }).formatToParts(safeDate);
    const year = parts.find((p) => p.type === 'year')?.value || String(safeDate.getUTCFullYear());
    const month = parts.find((p) => p.type === 'month')?.value || String(safeDate.getUTCMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  } catch {
    return `${safeDate.getUTCFullYear()}-${String(safeDate.getUTCMonth() + 1).padStart(2, '0')}`;
  }
}

/**
 * Human-readable Persian label showing when the student's monthly 5-request non-duplicate quota resets.
 */
export function getNextTehranMonthResetLabelFa(dateInput?: Date | string): string {
  const monthKey = getTehranMonthKey(dateInput);
  const [yStr, mStr] = monthKey.split('-');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  if (Number.isNaN(year) || Number.isNaN(month)) {
    return 'شروع ماه آینده';
  }
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextFirst = new Date(Date.UTC(nextYear, nextMonth - 1, 1, 12, 0, 0));
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(nextFirst);
  } catch {
    return `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
  }
}

/**
 * Pure quota calculator used identically by UI components and unit tests.
 */
export function computeAiQuotaState(
  usedCount: number,
  isUnlimited: boolean,
  limit = MONTHLY_AI_QUOTA_LIMIT,
  dateInput?: Date | string
): AiQuotaState {
  const safeLimit = Math.max(1, Math.floor(limit));
  const safeUsed = Math.max(0, Math.floor(Number.isFinite(usedCount) ? usedCount : 0));
  const remaining = isUnlimited ? safeLimit : Math.max(0, safeLimit - safeUsed);
  const isExhausted = !isUnlimited && remaining <= 0;
  const usagePct = isUnlimited
    ? 0
    : Math.min(100, Math.round((Math.min(safeUsed, safeLimit) / safeLimit) * 100));

  let statusTone: 'healthy' | 'low' | 'exhausted' = 'healthy';
  if (isExhausted) {
    statusTone = 'exhausted';
  } else if (!isUnlimited && remaining <= 2) {
    statusTone = 'low';
  }

  return {
    limit: safeLimit,
    used: safeUsed,
    remaining,
    monthKey: getTehranMonthKey(dateInput),
    resetLabelFa: getNextTehranMonthResetLabelFa(dateInput),
    isUnlimited,
    isExhausted,
    usagePct,
    statusTone
  };
}
