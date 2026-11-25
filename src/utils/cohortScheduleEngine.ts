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

export type PrivateCohortLookupStatus =
  | 'idle'
  | 'too_short'
  | 'matched'
  | 'ambiguous'
  | 'not_found';

export interface PrivateCohortLookupResult {
  status: PrivateCohortLookupStatus;
  cohort: CohortScheduleRecord | null;
}

const WEEKDAY_ONLY_TOKENS = new Set([
  'شنبه',
  'یکشنبه',
  'یک شنبه',
  'یکشنبه ها',
  'یک شنبه ها',
  'دوشنبه',
  'دوشنبه ها',
  'سه شنبه',
  'سه شنبه ها',
  'چهارشنبه',
  'چهارشنبه ها',
  'پنجشنبه',
  'پنج شنبه',
  'پنجشنبه ها',
  'پنج شنبه ها',
  'جمعه',
  'جمعه ها'
]);

/**
 * Privacy-preserving single-cohort lookup:
 * - Requires at least 3 normalized characters (blocks 1-2 letter fishing like "م").
 * - Ignores weekday-only terms so users cannot enumerate organizations by guessing days of week.
 * - Returns a cohort ONLY when the query uniquely identifies 1 organization/project.
 * - Never returns multiple cohorts, counts, or suggestions of other classes.
 */
export function resolveUniqueCohortByQuery(
  cohorts: CohortScheduleRecord[],
  rawQuery: string
): PrivateCohortLookupResult {
  const normalizedQuery = normalizePersianSearchText(rawQuery);
  if (!normalizedQuery) {
    return { status: 'idle', cohort: null };
  }

  if (normalizedQuery.length < 3) {
    return { status: 'too_short', cohort: null };
  }

  if (WEEKDAY_ONLY_TOKENS.has(normalizedQuery)) {
    return { status: 'not_found', cohort: null };
  }

  const queryTokens = normalizedQuery
    .split(' ')
    .filter((t) => t.length >= 2 && !WEEKDAY_ONLY_TOKENS.has(t));

  if (queryTokens.length === 0) {
    return { status: 'too_short', cohort: null };
  }

  const matches: Array<{ cohort: CohortScheduleRecord; exact: boolean }> = [];

  for (const cohort of cohorts) {
    const privateHaystacks = [
      cohort.title,
      cohort.organization,
      ...(Array.isArray(cohort.aliases) ? cohort.aliases : [])
    ]
      .map(normalizePersianSearchText)
      .filter((h) => Boolean(h) && !WEEKDAY_ONLY_TOKENS.has(h));

    const combined = privateHaystacks.join(' ');
    const isExact = privateHaystacks.some((h) => h === normalizedQuery);
    const isSubstring = privateHaystacks.some((h) => h.includes(normalizedQuery));
    const isAllTokens = queryTokens.every((tok) => combined.includes(tok));

    if (isExact || isSubstring || isAllTokens) {
      matches.push({ cohort, exact: isExact });
    }
  }

  if (matches.length === 0) {
    return { status: 'not_found', cohort: null };
  }

  if (matches.length === 1) {
    return { status: 'matched', cohort: matches[0].cohort };
  }

  // Only resolve among multiple candidates if the user typed the exact unique name of one specific org
  // (e.g. "موسسه دماوند") while not matching other orgs exactly
  const exactMatches = matches.filter((m) => m.exact);
  if (exactMatches.length === 1) {
    return { status: 'matched', cohort: exactMatches[0].cohort };
  }

  return { status: 'ambiguous', cohort: null };
}

/**
 * Partial/full Persian & English cohort lookup (admin/internal helper).
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

export interface OrbitCohortSessionHighlight {
  sessionId: OrbitSessionId;
  nextModules: OrbitModuleCatalogItem[];
  reviewedModulesCount: number;
  totalSessionModulesCount: number;
  isCurrentClassSession: boolean;
  isFullyReviewedByAdmin: boolean;
  isPartiallyReviewedByAdmin: boolean;
}

export interface OrbitCohortHighlights {
  cohortId: string;
  cohortTitle: string;
  weekdayIndex: number;
  weekdayFa: string;
  todayWeekdayIndex: number | null;
  todayWeekdayFa: string;
  isClassDayToday: boolean;
  primaryCurrentSessionId: OrbitSessionId | null;
  currentSessionIds: OrbitSessionId[];
  bySession: Record<OrbitSessionId, OrbitCohortSessionHighlight>;
  currentModules: OrbitModuleCatalogItem[];
  nodeBadgeFa: string;
  nodeBadgeEn: string;
  bannerTitleFa: string;
  bannerTitleEn: string;
  bannerSubtitleFa: string;
  bannerSubtitleEn: string;
  instructorNote: string;
}

const ORDERED_ORBIT_SESSION_IDS: OrbitSessionId[] = ['s1', 's2', 's_nlm', 's3', 's4', 's5'];

/**
 * Pure helper mapping a student's weekday cohort + admin-assigned reviewed/next modules
 * onto the 6 Circular Orbit sessions, aware of Asia/Tehran weekday to distinguish
 * "Today's Class Session" vs "This Week's Current Session".
 */
export function computeOrbitCohortHighlights(
  cohort: CohortScheduleRecord | null | undefined,
  nowDate?: string | Date | null
): OrbitCohortHighlights | null {
  if (!cohort) return null;

  const todayWeekdayIndex = getTehranWeekdayIndex(nowDate ?? new Date());
  const todayWeekdayFa =
    todayWeekdayIndex !== null ? PERSIAN_WEEKDAY_NAMES[todayWeekdayIndex] || 'امروز' : 'امروز';
  const isClassDayToday =
    todayWeekdayIndex !== null && Number(cohort.weekdayIndex) === todayWeekdayIndex;

  const cleanReviewedSet = new Set(sanitizeModuleIds(cohort.reviewedModules));
  const cleanNextIds = sanitizeModuleIds(cohort.nextModules);
  const cleanNextSet = new Set(cleanNextIds);

  const bySession = {} as Record<OrbitSessionId, OrbitCohortSessionHighlight>;
  const currentSessionIds: OrbitSessionId[] = [];
  const currentModules: OrbitModuleCatalogItem[] = [];

  for (const sessionId of ORDERED_ORBIT_SESSION_IDS) {
    const sessionCatalogMods = ORBIT_MODULES_CATALOG.filter((m) => m.sessionId === sessionId);
    const nextModsInSession = sessionCatalogMods.filter((m) => cleanNextSet.has(m.id));
    const reviewedCount = sessionCatalogMods.filter((m) => cleanReviewedSet.has(m.id)).length;
    const totalCount = sessionCatalogMods.length;
    const isCurrentClassSession = nextModsInSession.length > 0;

    if (isCurrentClassSession) {
      currentSessionIds.push(sessionId);
      currentModules.push(...nextModsInSession);
    }

    bySession[sessionId] = {
      sessionId,
      nextModules: nextModsInSession,
      reviewedModulesCount: reviewedCount,
      totalSessionModulesCount: totalCount,
      isCurrentClassSession,
      isFullyReviewedByAdmin: totalCount > 0 && reviewedCount === totalCount,
      isPartiallyReviewedByAdmin: reviewedCount > 0 && reviewedCount < totalCount
    };
  }

  // Primary focus session: first admin-assigned current/next-week session;
  // fallback if admin only marked reviewed modules so far: first session not fully reviewed yet.
  let primaryCurrentSessionId: OrbitSessionId | null = currentSessionIds[0] ?? null;
  if (!primaryCurrentSessionId && cleanReviewedSet.size > 0) {
    const firstPending = ORDERED_ORBIT_SESSION_IDS.find(
      (sid) => !bySession[sid].isFullyReviewedByAdmin
    );
    primaryCurrentSessionId = firstPending ?? ORDERED_ORBIT_SESSION_IDS[ORDERED_ORBIT_SESSION_IDS.length - 1];
  }

  const moduleSummaryFa = currentModules.map((m) => `${m.num} (${m.titleFa})`).join('، ');
  const moduleSummaryEn = currentModules.map((m) => `${m.num} (${m.titleEn})`).join(', ');

  const nodeBadgeFa = isClassDayToday ? 'جلسه امروز' : 'جلسه هفته جاری';
  const nodeBadgeEn = isClassDayToday ? "Today's Class" : "This Week's Class";

  const bannerTitleFa = isClassDayToday
    ? `امروز روز کلاس شماست (${cohort.weekdayFa} · ${cohort.title})`
    : `برنامه کلاس شما: ${cohort.weekdayFa} · ${cohort.title}`;

  const bannerTitleEn = isClassDayToday
    ? `Today is your class day (${cohort.title})`
    : `Your class schedule: ${cohort.title}`;

  const bannerSubtitleFa =
    currentModules.length > 0
      ? isClassDayToday
        ? `جلسه امروز شما روی گردونه مشخص شده است: ${moduleSummaryFa}`
        : `جلسه جاری این هفته روی گردونه مشخص شده است: ${moduleSummaryFa}`
      : isClassDayToday
        ? 'امروز روز کلاس شماست؛ مدرس هنوز ماژول جلسه امروز را انتخاب نکرده است.'
        : 'به محض انتخاب ماژول هفته جاری توسط مدرس، جلسه هدف روی همین گردونه روشن می‌شود.';

  const bannerSubtitleEn =
    currentModules.length > 0
      ? isClassDayToday
        ? `Today's session is highlighted on the orbit: ${moduleSummaryEn}`
        : `This week's session is highlighted on the orbit: ${moduleSummaryEn}`
      : 'Waiting for instructor to assign the upcoming module for your cohort.';

  return {
    cohortId: cohort.id,
    cohortTitle: cohort.title,
    weekdayIndex: cohort.weekdayIndex,
    weekdayFa: cohort.weekdayFa,
    todayWeekdayIndex,
    todayWeekdayFa,
    isClassDayToday,
    primaryCurrentSessionId,
    currentSessionIds,
    bySession,
    currentModules,
    nodeBadgeFa,
    nodeBadgeEn,
    bannerTitleFa,
    bannerTitleEn,
    bannerSubtitleFa,
    bannerSubtitleEn,
    instructorNote: cohort.instructorNote || ''
  };
}

/**
 * Returns true if the student's active cohort has this module marked as reviewed/completed by the admin.
 */
export function isModuleReviewedByCohort(
  moduleId: string,
  cohort: CohortScheduleRecord | null | undefined
): boolean {
  if (!moduleId || !cohort || !Array.isArray(cohort.reviewedModules)) return false;
  if (!VALID_ORBIT_MODULE_IDS.has(moduleId)) return false;
  return cohort.reviewedModules.includes(moduleId);
}

export interface EffectiveModuleCompletionState {
  isCompleted: boolean;
  isReviewedByCohort: boolean;
  isLockedByAdminCohort: boolean;
  canUserToggle: boolean;
}

/**
 * Pure completion resolver:
 * - Admin-reviewed cohort modules automatically appear completed (Done & Green) for the student.
 * - Non-admin students cannot uncheck/remove the completion checkmark on admin-reviewed modules,
 *   while remaining completely free to open and review the module content.
 */
export function resolveEffectiveModuleCompletion(params: {
  moduleId: string;
  sessionId?: string;
  localCompletedModules: Record<string, boolean>;
  localCompletedSessions: Record<string, boolean>;
  cohort: CohortScheduleRecord | null | undefined;
  isAdmin: boolean;
}): EffectiveModuleCompletionState {
  const { moduleId, sessionId, localCompletedModules, localCompletedSessions, cohort, isAdmin } = params;
  const isReviewedByCohort = isModuleReviewedByCohort(moduleId, cohort);
  const isLocallyDone = Boolean(
    localCompletedModules[moduleId] || (sessionId && localCompletedSessions[sessionId])
  );
  const isCompleted = isReviewedByCohort || isLocallyDone;
  const isLockedByAdminCohort = isReviewedByCohort && !isAdmin;

  return {
    isCompleted,
    isReviewedByCohort,
    isLockedByAdminCohort,
    canUserToggle: !isLockedByAdminCohort
  };
}


