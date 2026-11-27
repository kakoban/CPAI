export type SocialPlatformType =
  | 'linkedin'
  | 'instagram'
  | 'bale'
  | 'telegram'
  | 'youtube'
  | 'website'
  | 'other';

export interface CustomSocialLink {
  id: string;
  platform: SocialPlatformType;
  label: string;
  url: string;
  badgeSubtext?: string;
}

export interface CommunitySocialConfig {
  instructorName: string;
  instructorTitle?: string;
  inviteMessage?: string;
  adminLinkedinUrl: string;
  owjLinkedinUrl: string;
  instagramUrl: string;
  baleUrl: string;
  extraLinks: CustomSocialLink[];
  updatedAt?: string;
}

export interface VisibleCommunityBadge {
  id: string;
  platform: SocialPlatformType;
  kind: 'personal' | 'org' | 'community' | 'custom';
  labelFa: string;
  labelEn: string;
  subtextFa?: string;
  url: string;
}

export const DEFAULT_COMMUNITY_SOCIAL_CONFIG: CommunitySocialConfig = {
  instructorName: '',
  instructorTitle: '',
  inviteMessage: '',
  adminLinkedinUrl: '',
  owjLinkedinUrl: '',
  instagramUrl: '',
  baleUrl: '',
  extraLinks: []
};

/**
 * Safely normalizes an external social URL. Returns empty string if blank or unsafe.
 */
export function sanitizeSocialUrl(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return '';
  }

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
    if (!parsed.hostname || !parsed.hostname.includes('.')) return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

const VALID_PLATFORMS: ReadonlySet<string> = new Set([
  'linkedin',
  'instagram',
  'bale',
  'telegram',
  'youtube',
  'website',
  'other'
]);

export function sanitizeCommunitySocialConfig(raw: unknown): CommunitySocialConfig {
  const src = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const cleanStr = (val: unknown, maxLen: number) =>
    typeof val === 'string' ? val.trim().slice(0, maxLen) : '';

  const rawExtras = Array.isArray(src.extraLinks) ? src.extraLinks : [];
  const extraLinks: CustomSocialLink[] = [];
  for (let i = 0; i < rawExtras.length && extraLinks.length < 8; i++) {
    const item = rawExtras[i];
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    const label = cleanStr(rec.label, 80);
    const url = sanitizeSocialUrl(rec.url);
    if (!label || !url) continue;
    const rawPlat = cleanStr(rec.platform, 20).toLowerCase();
    const platform: SocialPlatformType = VALID_PLATFORMS.has(rawPlat)
      ? (rawPlat as SocialPlatformType)
      : 'other';
    extraLinks.push({
      id: cleanStr(rec.id, 48) || `extra_${i + 1}`,
      platform,
      label,
      url,
      badgeSubtext: cleanStr(rec.badgeSubtext, 80) || undefined
    });
  }

  return {
    instructorName: cleanStr(src.instructorName, 100),
    instructorTitle: cleanStr(src.instructorTitle, 120) || undefined,
    inviteMessage: cleanStr(src.inviteMessage, 280) || undefined,
    adminLinkedinUrl: sanitizeSocialUrl(src.adminLinkedinUrl),
    owjLinkedinUrl: sanitizeSocialUrl(src.owjLinkedinUrl),
    instagramUrl: sanitizeSocialUrl(src.instagramUrl),
    baleUrl: sanitizeSocialUrl(src.baleUrl),
    extraLinks,
    updatedAt: cleanStr(src.updatedAt, 64) || undefined
  };
}

/**
 * Produces polished display badges only for configured & valid links.
 * Returns [] when admin has not entered anything, so the student dashboard stays untouched.
 */
export function buildVisibleCommunityBadges(
  config: CommunitySocialConfig | null | undefined
): VisibleCommunityBadge[] {
  if (!config) return [];
  const badges: VisibleCommunityBadge[] = [];

  const adminUrl = sanitizeSocialUrl(config.adminLinkedinUrl);
  if (adminUrl) {
    const ownerName = config.instructorName?.trim();
    badges.push({
      id: 'admin_linkedin',
      platform: 'linkedin',
      kind: 'personal',
      labelFa: ownerName ? `لینکدین ${ownerName}` : 'لینکدین مدرس دوره',
      labelEn: ownerName ? `${ownerName} · LinkedIn` : 'Instructor LinkedIn',
      subtextFa: config.instructorTitle?.trim() || 'ارتباط مستقیم با مدرس',
      url: adminUrl
    });
  }

  const owjUrl = sanitizeSocialUrl(config.owjLinkedinUrl);
  if (owjUrl) {
    badges.push({
      id: 'owj_linkedin',
      platform: 'linkedin',
      kind: 'org',
      labelFa: 'لینکدین اوج',
      labelEn: 'OWJ LinkedIn',
      subtextFa: 'شورای کسب‌وکار اوج',
      url: owjUrl
    });
  }

  const igUrl = sanitizeSocialUrl(config.instagramUrl);
  if (igUrl) {
    badges.push({
      id: 'owj_instagram',
      platform: 'instagram',
      kind: 'org',
      labelFa: 'اینستاگرام اوج',
      labelEn: 'OWJ Instagram',
      subtextFa: 'نکات و رویدادها',
      url: igUrl
    });
  }

  const baleUrl = sanitizeSocialUrl(config.baleUrl);
  if (baleUrl) {
    badges.push({
      id: 'owj_bale',
      platform: 'bale',
      kind: 'community',
      labelFa: 'کانال بله اوج',
      labelEn: 'OWJ Bale Channel',
      subtextFa: 'عضویت در جمع فراگیران',
      url: baleUrl
    });
  }

  for (const extra of config.extraLinks || []) {
    const cleanUrl = sanitizeSocialUrl(extra.url);
    const cleanLabel = extra.label?.trim();
    if (!cleanUrl || !cleanLabel) continue;
    badges.push({
      id: extra.id,
      platform: extra.platform,
      kind: 'custom',
      labelFa: cleanLabel,
      labelEn: cleanLabel,
      subtextFa: extra.badgeSubtext?.trim() || undefined,
      url: cleanUrl
    });
  }

  return badges;
}
