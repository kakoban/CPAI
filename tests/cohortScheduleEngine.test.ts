import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_WEEKDAY_COHORTS,
  normalizePersianSearchText,
  getTehranWeekdayIndex,
  classifyCohortIdByFirstEntryDate,
  groupUsersByWeekdayCohort,
  searchCohortsByQuery,
  buildExpectedLearningSummary,
  getDefaultCohortSchedules,
  sanitizeModuleIds
} from '../src/utils/cohortScheduleEngine';

test('normalizePersianSearchText unifies Persian/Arabic forms and ZWNJ', () => {
  assert.equal(normalizePersianSearchText('مؤسسه حرا'), normalizePersianSearchText('موسسه حرا'));
  assert.equal(normalizePersianSearchText('پنج‌شنبه'), normalizePersianSearchText('پنج شنبه'));
  assert.equal(normalizePersianSearchText('كلاس عسلويه'), normalizePersianSearchText('کلاس عسلویه'));
});

test('getTehranWeekdayIndex classifies UTC timestamps accurately in Asia/Tehran timezone', () => {
  // 2026-11-22 is Sunday. At 21:00 UTC, Tehran (+03:30) is Monday 00:30!
  assert.equal(getTehranWeekdayIndex('2026-11-22T21:00:00Z'), 1);
  assert.equal(classifyCohortIdByFirstEntryDate('2026-11-22T21:00:00Z'), 'cohort_mon_hera');

  // Sunday midday Tehran -> طرح دماوند تیم عسلویه
  assert.equal(classifyCohortIdByFirstEntryDate('2026-11-22T10:00:00Z'), 'cohort_sun_damavand_asaluyeh');
  // Wednesday midday Tehran -> طرح دماوند تهران
  assert.equal(classifyCohortIdByFirstEntryDate('2026-11-25T10:00:00Z'), 'cohort_wed_damavand_tehran');
  // Thursday midday Tehran -> هلدینگ پایا سامان (موسسه دماوند)
  assert.equal(classifyCohortIdByFirstEntryDate('2026-11-26T10:00:00Z'), 'cohort_thu_paya_damavand');
  // Tuesday -> unmatched (null)
  assert.equal(classifyCohortIdByFirstEntryDate('2026-11-24T10:00:00Z'), null);
});

test('groupUsersByWeekdayCohort splits users by first entry weekday and respects manual overrides', () => {
  const sampleUsers = [
    { id: 'u1', email: 'a@x.com', fullName: 'کاربر دوشنبه', createdAt: '2026-11-23T08:00:00Z' },
    { id: 'u2', email: 'b@x.com', fullName: 'کاربر چهارشنبه', createdAt: '2026-11-25T08:00:00Z' },
    { id: 'u3', email: 'c@x.com', fullName: 'کاربر پنجشنبه', createdAt: '2026-11-26T08:00:00Z' },
    { id: 'u4', email: 'd@x.com', fullName: 'کاربر یکشنبه', createdAt: '2026-11-22T08:00:00Z' },
    { id: 'u5', email: 'e@x.com', fullName: 'کاربر سه‌شنبه', createdAt: '2026-11-24T08:00:00Z' },
    {
      id: 'u6',
      email: 'f@x.com',
      fullName: 'کاربر انتقال دستی',
      createdAt: '2026-11-24T08:00:00Z',
      weekdayCohortId: 'cohort_mon_hera',
      weekdayCohortManual: true
    }
  ];

  const grouped = groupUsersByWeekdayCohort(sampleUsers);
  assert.equal(grouped.byCohort.cohort_mon_hera.length, 2);
  assert.equal(grouped.byCohort.cohort_wed_damavand_tehran.length, 1);
  assert.equal(grouped.byCohort.cohort_thu_paya_damavand.length, 1);
  assert.equal(grouped.byCohort.cohort_sun_damavand_asaluyeh.length, 1);
  assert.equal(grouped.unmatched.length, 1);
  assert.equal(grouped.unmatched[0].id, 'u5');
});

test('searchCohortsByQuery matches partial Persian org/project names cleanly', () => {
  const cohorts = getDefaultCohortSchedules();

  const hera = searchCohortsByQuery(cohorts, 'حرا');
  assert.equal(hera.length, 1);
  assert.equal(hera[0].id, 'cohort_mon_hera');

  const asaluyeh = searchCohortsByQuery(cohorts, 'عسلویه');
  assert.equal(asaluyeh.length, 1);
  assert.equal(asaluyeh[0].id, 'cohort_sun_damavand_asaluyeh');

  const paya = searchCohortsByQuery(cohorts, 'پایا');
  assert.equal(paya.length, 1);
  assert.equal(paya[0].id, 'cohort_thu_paya_damavand');

  const tehran = searchCohortsByQuery(cohorts, 'تهران');
  assert.equal(tehran.length, 1);
  assert.equal(tehran[0].id, 'cohort_wed_damavand_tehran');

  // Ambiguous query "دماوند" should return all 3 Damavand-affiliated cohorts so user can choose
  const damavand = searchCohortsByQuery(cohorts, 'دماوند');
  assert.equal(damavand.length, 3);
  assert.equal(OFFICIAL_WEEKDAY_COHORTS.length, 4);
});

test('buildExpectedLearningSummary aggregates outcomes strictly from valid admin module selections', () => {
  const sanitized = sanitizeModuleIds(['s1_markdown', 'invalid_id', 's1_demo', 's1_demo', 's5_database_crud']);
  // Ordered canonically
  assert.deepEqual(sanitized, ['s1_demo', 's1_markdown', 's5_database_crud']);

  const summary = buildExpectedLearningSummary(
    ['s1_demo', 's1_drive', 'prompting'],
    ['s5_database_crud']
  );

  assert.equal(summary.totalReviewedModules, 3);
  assert.equal(summary.sessionGroups.length, 2);
  assert.equal(summary.sessionGroups[0].sessionId, 's1');
  assert.equal(summary.sessionGroups[1].sessionId, 's2');
  assert.equal(summary.nextModules.length, 1);
  assert.equal(summary.nextModules[0].id, 's5_database_crud');
  assert.ok(summary.totalExpectedOutcomes >= 6);
});
