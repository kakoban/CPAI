import {
  ORBIT_MODULES_CATALOG,
  ORBIT_MODULE_BY_ID,
  VALID_ORBIT_MODULE_IDS,
  OrbitModuleCatalogItem,
  OrbitSessionId
} from '../data/orbitCurriculumCatalog';

export interface WeekdayCohortDefinition {
  id: string;
  code: string;
  title: string;
  organization: string;
  weekdayIndex: number; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat (Asia/Tehran)
  weekdayFa: string;
  aliases: string[];
  accentColor: 'blue' | 'emerald' | 'amber' | 'purple';
}

export interface CohortScheduleRecord {
  id: string;
  code: string;
  title: string;
  organization: string;
  weekdayIndex: number;
  weekdayFa: string;
  aliases: string[];
  reviewedModules: string[];
  nextModules: string[];
  instructorNote: string;
  studentCount?: number;
  updatedAt?: string;
}

export interface CohortUserEntry {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  specialty?: string | null;
  role?: string;
  createdAt?: string | null;
  weekdayCohortId?: string | null;
  weekdayCohortManual?: boolean;
  resolvedCohortId: string | null;
  firstEntryWeekdayIndex: number | null;
  firstEntryWeekdayFa: string;
}

export interface ExpectedSessionGroupSummary {
  sessionId: OrbitSessionId;
  sessionNumFa: string;
  sessionTitleFa: string;
  modules: OrbitModuleCatalogItem[];
}

export interface ExpectedLearningSummary {
  reviewedModules: OrbitModuleCatalogItem[];
  nextModules: OrbitModuleCatalogItem[];
  sessionGroups: ExpectedSessionGroupSummary[];
  totalReviewedModules: number;
  totalCatalogModules: number;
  completionPct: number;
  totalExpectedOutcomes: number;
}

export const PERSIAN_WEEKDAY_NAMES: Record<number, string> = {
  0: 'یکشنبه',
  1: 'دوشنبه',
  2: 'سه‌شنبه',
  3: 'چهارشنبه',
  4: 'پنج‌شنبه',
  5: 'جمعه',
  6: 'شنبه'
};

export const OFFICIAL_WEEKDAY_COHORTS: WeekdayCohortDefinition[] = [
  {
    id: 'cohort_mon_hera',
    code: 'COHORT-MON-HERA',
    title: 'موسسه حرا',
    organization: 'موسسه حرا',
    weekdayIndex: 1,
    weekdayFa: 'دوشنبه‌ها',
    aliases: ['حرا', 'موسسه حرا', 'مؤسسه حرا', 'دوشنبه', 'دوشنبه ها', 'hera'],
    accentColor: 'blue'
  },
  {
    id: 'cohort_wed_damavand_tehran',
    code: 'COHORT-WED-DAMAVAND-TEHRAN',
    title: 'طرح دماوند تهران',
    organization: 'طرح دماوند — تهران',
    weekdayIndex: 3,
    weekdayFa: 'چهارشنبه‌ها',
    aliases: ['دماوند تهران', 'طرح دماوند تهران', 'تهران', 'طرح دماوند', 'دماوند', 'چهارشنبه', 'چهارشنبه ها', 'damavand tehran'],
    accentColor: 'emerald'
  },
  {
    id: 'cohort_thu_paya_damavand',
    code: 'COHORT-THU-PAYA-DAMAVAND',
    title: 'هلدینگ پایا سامان (موسسه دماوند)',
    organization: 'هلدینگ پایا سامان — موسسه دماوند',
    weekdayIndex: 4,
    weekdayFa: 'پنج‌شنبه‌ها',
    aliases: [
      'پایا',
      'پایا سامان',
      'هلدینگ پایا سامان',
      'هلدینگ پایا',
      'موسسه دماوند',
      'مؤسسه دماوند',
      'دماوند',
      'پنج شنبه',
      'پنج‌شنبه',
      'پنجشنبه',
      'paya',
      'paya saman'
    ],
    accentColor: 'amber'
  },
  {
    id: 'cohort_sun_damavand_asaluyeh',
    code: 'COHORT-SUN-DAMAVAND-ASALUYEH',
    title: 'طرح دماوند تیم عسلویه',
    organization: 'طرح دماوند — تیم عسلویه',
    weekdayIndex: 0,
    weekdayFa: 'یکشنبه‌ها',
    aliases: [
      'عسلویه',
      'تیم عسلویه',
      'طرح دماوند عسلویه',
      'طرح دماوند تیم عسلویه',
      'طرح دماوند',
      'دماوند',
      'یکشنبه',
      'یک‌شنبه',
      'یکشنبه ها',
      'asaluyeh'
    ],
    accentColor: 'purple'
  }
];

export const COHORT_ID_BY_WEEKDAY: Record<number, string> = Object.fromEntries(
  OFFICIAL_WEEKDAY_COHORTS.map((c) => [c.weekdayIndex, c.id])
);

const WEEKDAY_SHORT_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
};

/**
 * Normalize Persian/Arabic/Latin search strings so partial user queries match reliably.
 */
export function normalizePersianSearchText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[\u064A\u0649]/g, 'ی') // Arabic yeh -> Persian yeh
    .replace(/\u0643/g, 'ک') // Arabic kaf -> Persian kaf
    .replace(/\u0629/g, 'ه') // Teh marbuta -> heh
    .replace(/[\u0622\u0623\u0625]/g, 'ا') // Alef variants -> alef
    .replace(/\u0624/g, 'و') // Waw with hamza -> waw
    .replace(/\u0626/g, 'ی') // Yeh with hamza -> yeh
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // Diacritics & tatweel
    .replace(/[\u200C\u200D]/g, ' ') // ZWNJ / ZWJ -> space
    .replace(/[()\-–—_.,،·/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Compute day-of-week index (0=Sun..6=Sat) in Asia/Tehran timezone for any date input.
 */
export function getTehranWeekdayIndex(dateInput?: string | Date | null): number | null {
  if (!dateInput) return null;
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;

  try {
    const shortDay = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran',
      weekday: 'short'
    }).format(date);
    return WEEKDAY_SHORT_TO_INDEX[shortDay] ?? null;
  } catch {
    return date.getUTCDay();
  }
}

export function classifyCohortIdByFirstEntryDate(dateInput?: string | Date | null): string | null {
  const dow = getTehranWeekdayIndex(dateInput);
  if (dow === null) return null;
  return COHORT_ID_BY_WEEKDAY[dow] || null;
}

export function formatPersianFirstEntryDate(dateInput?: string | Date | null): string {
  if (!dateInput) return 'نامشخص';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return 'نامشخص';
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran',
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function sanitizeModuleIds(rawIds: unknown): string[] {
  if (!Array.isArray(rawIds)) return [];
  const selectedSet = new Set<string>();
  for (const item of rawIds) {
    if (typeof item === 'string' && VALID_ORBIT_MODULE_IDS.has(item)) {
      selectedSet.add(item);
    }
  }
  // Keep deterministic curriculum ordering
  return ORBIT_MODULES_CATALOG.map((m) => m.id).filter((id) => selectedSet.has(id));
}

export function getDefaultCohortSchedules(): CohortScheduleRecord[] {
  return OFFICIAL_WEEKDAY_COHORTS.map((def) => ({
    id: def.id,
    code: def.code,
    title: def.title,
    organization: def.organization,
    weekdayIndex: def.weekdayIndex,
    weekdayFa: def.weekdayFa,
    aliases: [...def.aliases],
    reviewedModules: [],
    nextModules: [],
    instructorNote: '',
    studentCount: 0,
    updatedAt: undefined
  }));
}

export function groupUsersByWeekdayCohort<
  T extends {
    id: string;
    email: string;
    fullName: string;
    phone?: string | null;
    specialty?: string | null;
    role?: string;
    createdAt?: string | null;
    weekdayCohortId?: string | null;
    weekdayCohortManual?: boolean;
  }
>(
  users: T[]
): {
  byCohort: Record<string, CohortUserEntry[]>;
  unmatched: CohortUserEntry[];
} {
  const byCohort: Record<string, CohortUserEntry[]> = {};
  for (const def of OFFICIAL_WEEKDAY_COHORTS) {
    byCohort[def.id] = [];
  }
  const unmatched: CohortUserEntry[] = [];

  for (const u of users) {
    const dow = getTehranWeekdayIndex(u.createdAt);
    const autoCohortId = dow !== null ? COHORT_ID_BY_WEEKDAY[dow] || null : null;
    const validExplicit =
      u.weekdayCohortId && byCohort[u.weekdayCohortId] ? u.weekdayCohortId : null;
    const resolvedCohortId = u.weekdayCohortManual ? validExplicit : validExplicit || autoCohortId;

    const entry: CohortUserEntry = {
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      phone: u.phone ?? null,
      specialty: u.specialty ?? null,
      role: u.role,
      createdAt: u.createdAt ?? null,
      weekdayCohortId: u.weekdayCohortId ?? null,
      weekdayCohortManual: !!u.weekdayCohortManual,
      resolvedCohortId,
      firstEntryWeekdayIndex: dow,
      firstEntryWeekdayFa: dow !== null ? PERSIAN_WEEKDAY_NAMES[dow] : 'نامشخص'
    };

    if (resolvedCohortId && byCohort[resolvedCohortId]) {
      byCohort[resolvedCohortId].push(entry);
    } else {
      unmatched.push(entry);
    }
  }

  return { byCohort, unmatched };
}

/**
 * Partial/full Persian & English cohort lookup supporting partial organization, company, project, or weekday names.
 */
export function searchCohortsByQuery(
  cohorts: CohortScheduleRecord[],
  rawQuery: string
): CohortScheduleRecord[] {
  const normalizedQuery = normalizePersianSearchText(rawQuery);
  if (!normalizedQuery) return [];

  const queryTokens = normalizedQuery.split(' ').filter((t) => t.length >= 1);

  const scored: Array<{ cohort: CohortScheduleRecord; score: number }> = [];

  for (const cohort of cohorts) {
    const haystacks = [
      cohort.title,
      cohort.organization,
      cohort.weekdayFa,
      cohort.code,
      ...(Array.isArray(cohort.aliases) ? cohort.aliases : [])
    ]
      .map(normalizePersianSearchText)
      .filter(Boolean);

    const combined = haystacks.join(' ');
    let score = 0;

    if (haystacks.some((h) => h === normalizedQuery)) {
      score = 100;
    } else if (haystacks.some((h) => h.startsWith(normalizedQuery))) {
      score = 80;
    } else if (haystacks.some((h) => h.includes(normalizedQuery))) {
      score = 65;
    } else if (queryTokens.length > 0 && queryTokens.every((tok) => combined.includes(tok))) {
      score = 50;
    }

    if (score > 0) {
      scored.push({ cohort, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.cohort.title.localeCompare(b.cohort.title, 'fa'));
  return scored.map((s) => s.cohort);
}

/**
 * Assemble the structured "What you are expected to have learned so far" summary
 * strictly from the admin-selected reviewed & next modules.
 */
export function buildExpectedLearningSummary(
  reviewedModuleIds: string[],
  nextModuleIds: string[]
): ExpectedLearningSummary {
  const cleanReviewed = sanitizeModuleIds(reviewedModuleIds);
  const cleanNext = sanitizeModuleIds(nextModuleIds);

  const reviewedModules = cleanReviewed
    .map((id) => ORBIT_MODULE_BY_ID[id])
    .filter((m): m is OrbitModuleCatalogItem => Boolean(m));

  const nextModules = cleanNext
    .map((id) => ORBIT_MODULE_BY_ID[id])
    .filter((m): m is OrbitModuleCatalogItem => Boolean(m));

  const groupMap = new Map<OrbitSessionId, ExpectedSessionGroupSummary>();
  for (const mod of reviewedModules) {
    const existing = groupMap.get(mod.sessionId);
    if (existing) {
      existing.modules.push(mod);
    } else {
      groupMap.set(mod.sessionId, {
        sessionId: mod.sessionId,
        sessionNumFa: mod.sessionNumFa,
        sessionTitleFa: mod.sessionTitleFa,
        modules: [mod]
      });
    }
  }

  const totalExpectedOutcomes = reviewedModules.reduce(
    (sum, mod) => sum + mod.expectedOutcomesFa.length,
    0
  );
  const totalCatalogModules = ORBIT_MODULES_CATALOG.length;
  const completionPct =
    totalCatalogModules > 0 ? Math.round((reviewedModules.length / totalCatalogModules) * 100) : 0;

  return {
    reviewedModules,
    nextModules,
    sessionGroups: Array.from(groupMap.values()),
    totalReviewedModules: reviewedModules.length,
    totalCatalogModules,
    completionPct,
    totalExpectedOutcomes
  };
}
