import { IndustryTrackId } from '../types/industryTrack';
import { UserProfile } from '../types/auth';
import { CohortScheduleRecord } from './cohortScheduleEngine';

/**
 * Feature flag controlling visibility of the CPMAI 6-Phase / 21-Session Methodology Workbook
 * (WorkspaceSidebar, Bottom Quick-Jump Bar, and Session 5 -> Page 1 CTA).
 * Kept as a single switch so methodology pages remain intact in code while hidden from end users.
 */
export const SHOW_CPMAI_METHODOLOGY = false;

export type WorkspacePage = 'landing' | 'quiz' | number;

/**
 * Ensures users never land on hidden CPMAI methodology pages (1..21) while SHOW_CPMAI_METHODOLOGY is false.
 */
export function sanitizeActivePage(
  page: WorkspacePage,
  showMethodology: boolean = SHOW_CPMAI_METHODOLOGY
): WorkspacePage {
  if (showMethodology) return page;
  if (typeof page === 'number' && page >= 1 && page <= 21) {
    return 0;
  }
  return page;
}

export const PROFESSIONAL_TRACKS: ReadonlyArray<IndustryTrackId> = [
  'CIVIL_INFRA',
  'ENERGY_PETRO',
  'PAYA_SAMAN_PARS'
];

export const ALL_INDUSTRY_TRACKS: ReadonlyArray<IndustryTrackId> = [
  'CIVIL_INFRA',
  'ENERGY_PETRO',
  'PAYA_SAMAN_PARS',
  'GENERAL_EVERYDAY'
];

export function isProfessionalTrack(track: IndustryTrackId | null | undefined): track is IndustryTrackId {
  return !!track && PROFESSIONAL_TRACKS.includes(track);
}

/**
 * Deterministically resolves the logged-in user's assigned organization domain track
 * from their active cohort schedule or profile metadata.
 */
export function resolveUserOrgTrack(params: {
  cohort?: Partial<Pick<CohortScheduleRecord, 'id' | 'code' | 'title' | 'organization'>> | null;
  currentUser?: Partial<Pick<UserProfile, 'classCode' | 'classId' | 'specialty' | 'email'>> | null;
  savedTrack?: IndustryTrackId | null;
}): IndustryTrackId {
  const { cohort, currentUser, savedTrack } = params;

  const haystack = [
    cohort?.id,
    cohort?.code,
    cohort?.title,
    cohort?.organization,
    currentUser?.classCode,
    currentUser?.classId,
    currentUser?.specialty
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // 1. Paya Saman Pars Holding (e.g. هلدینگ پایا سامان - موسسه دماوند)
  if (
    haystack.includes('paya') ||
    haystack.includes('پایا') ||
    haystack.includes('کاوه')
  ) {
    return 'PAYA_SAMAN_PARS';
  }

  // 2. Oil, Gas & Petrochemical (e.g. طرح دماوند عسلویه / تهران / نفت و گاز)
  if (
    haystack.includes('asaluyeh') ||
    haystack.includes('petro') ||
    haystack.includes('energy') ||
    haystack.includes('damavand') ||
    haystack.includes('عسلویه') ||
    haystack.includes('دماوند') ||
    haystack.includes('نفت') ||
    haystack.includes('پتروشیمی') ||
    haystack.includes('پالایش') ||
    haystack.includes('گاز')
  ) {
    return 'ENERGY_PETRO';
  }

  // 3. Civil & Infrastructure (e.g. موسسه حرا / مترو / راه و ابنیه)
  if (
    haystack.includes('hera') ||
    haystack.includes('civil') ||
    haystack.includes('حرا') ||
    haystack.includes('مترو') ||
    haystack.includes('عمران') ||
    haystack.includes('راه') ||
    haystack.includes('ابنیه') ||
    haystack.includes('تونل')
  ) {
    return 'CIVIL_INFRA';
  }

  // Fallback to previously chosen professional track if present, otherwise default to CIVIL_INFRA
  if (isProfessionalTrack(savedTrack)) {
    return savedTrack;
  }

  return 'CIVIL_INFRA';
}

/**
 * Returns the domain tracks permitted for a user:
 * - Admin/Instructor: all 4 tracks (to preview & test every company/holding)
 * - Regular Learner: strictly 2 tracks (their org's specialized domain + Home & Family)
 */
export function getAllowedTracksForUser(
  orgTrack: IndustryTrackId,
  isAdmin: boolean = false
): IndustryTrackId[] {
  if (isAdmin) {
    return [...ALL_INDUSTRY_TRACKS];
  }
  const safeOrgTrack: IndustryTrackId =
    orgTrack === 'GENERAL_EVERYDAY' ? 'CIVIL_INFRA' : orgTrack;
  return [safeOrgTrack, 'GENERAL_EVERYDAY'];
}

/**
 * Clamps any track selection for regular users to [assigned org track, GENERAL_EVERYDAY].
 * Admins are allowed to switch freely to any track.
 */
export function coerceTrackToAllowed(
  track: IndustryTrackId,
  orgTrack: IndustryTrackId,
  isAdmin: boolean = false
): IndustryTrackId {
  if (isAdmin) {
    return track;
  }
  if (track === 'GENERAL_EVERYDAY') {
    return 'GENERAL_EVERYDAY';
  }
  return orgTrack === 'GENERAL_EVERYDAY' ? 'CIVIL_INFRA' : orgTrack;
}
