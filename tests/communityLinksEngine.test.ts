import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_COMMUNITY_SOCIAL_CONFIG,
  buildVisibleCommunityBadges,
  sanitizeCommunitySocialConfig,
  sanitizeSocialUrl
} from '../src/utils/communityLinksEngine';

test('buildVisibleCommunityBadges returns empty array when admin has not configured any links', () => {
  assert.deepEqual(buildVisibleCommunityBadges(DEFAULT_COMMUNITY_SOCIAL_CONFIG), []);
  assert.deepEqual(buildVisibleCommunityBadges(null), []);
  assert.deepEqual(buildVisibleCommunityBadges(undefined), []);
});

test('sanitizeSocialUrl rejects unsafe protocols and normalizes valid domains', () => {
  assert.equal(sanitizeSocialUrl('javascript:alert(1)'), '');
  assert.equal(sanitizeSocialUrl('data:text/html,<script>'), '');
  assert.equal(sanitizeSocialUrl('notadomain'), '');
  assert.equal(
    sanitizeSocialUrl('linkedin.com/in/fakourizad'),
    'https://linkedin.com/in/fakourizad'
  );
  assert.equal(sanitizeSocialUrl('https://ble.ir/owjbc'), 'https://ble.ir/owjbc');
});

test('buildVisibleCommunityBadges generates named personal, org, Bale, and custom badges only for filled links', () => {
  const sanitized = sanitizeCommunitySocialConfig({
    instructorName: 'مهندس فکوری‌زاد',
    instructorTitle: 'مدرس دوره',
    inviteMessage: 'همراه ما باشید',
    adminLinkedinUrl: 'linkedin.com/in/fakouri',
    owjLinkedinUrl: 'https://linkedin.com/company/owjbc',
    instagramUrl: '',
    baleUrl: 'https://ble.ir/owj_ai',
    extraLinks: [
      { id: 'tg1', platform: 'telegram', label: 'کانال تلگرام اوج', url: 'https://t.me/owjbc' },
      { id: 'empty_one', platform: 'website', label: 'خالی', url: '' }
    ]
  });

  const badges = buildVisibleCommunityBadges(sanitized);
  assert.equal(badges.length, 4);
  assert.equal(badges[0].labelFa, 'لینکدین مهندس فکوری‌زاد');
  assert.equal(badges[0].subtextFa, 'مدرس دوره');
  assert.equal(badges[1].labelFa, 'لینکدین اوج');
  assert.equal(badges[2].labelFa, 'کانال بله اوج');
  assert.equal(badges[3].labelFa, 'کانال تلگرام اوج');
});
