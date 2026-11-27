import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SHOW_CPMAI_METHODOLOGY,
  coerceTrackToAllowed,
  getAllowedTracksForUser,
  resolveUserOrgTrack,
  sanitizeActivePage
} from '../src/utils/userWorkspaceEngine';

test('SHOW_CPMAI_METHODOLOGY defaults to false and sanitizeActivePage redirects pages 1..21 to 0', () => {
  assert.equal(SHOW_CPMAI_METHODOLOGY, false);
  assert.equal(sanitizeActivePage(1, false), 0);
  assert.equal(sanitizeActivePage(21, false), 0);
  assert.equal(sanitizeActivePage(0, false), 0);
  assert.equal(sanitizeActivePage('landing', false), 'landing');
  assert.equal(sanitizeActivePage('quiz', false), 'quiz');
  assert.equal(sanitizeActivePage(5, true), 5);
});

test('resolveUserOrgTrack maps Paya Saman, Damavand/Asaluyeh, and Hera cohorts accurately', () => {
  assert.equal(
    resolveUserOrgTrack({
      cohort: {
        id: 'cohort_thu_paya_damavand',
        code: 'COHORT-THU-PAYA-DAMAVAND',
        title: 'هلدینگ پایا سامان (موسسه دماوند)',
        organization: 'هلدینگ پایا سامان — موسسه دماوند'
      }
    }),
    'PAYA_SAMAN_PARS'
  );

  assert.equal(
    resolveUserOrgTrack({
      cohort: {
        id: 'cohort_sun_damavand_asaluyeh',
        code: 'COHORT-SUN-DAMAVAND-ASALUYEH',
        title: 'طرح دماوند تیم عسلویه',
        organization: 'طرح دماوند — تیم عسلویه'
      }
    }),
    'ENERGY_PETRO'
  );

  assert.equal(
    resolveUserOrgTrack({
      cohort: {
        id: 'cohort_mon_hera',
        code: 'COHORT-MON-HERA',
        title: 'موسسه حرا',
        organization: 'موسسه حرا'
      }
    }),
    'CIVIL_INFRA'
  );
});

test('resolveUserOrgTrack falls back cleanly when cohort is unassigned', () => {
  assert.equal(
    resolveUserOrgTrack({
      cohort: null,
      currentUser: { specialty: 'مهندسی نفت و پتروشیمی' },
      savedTrack: 'GENERAL_EVERYDAY'
    }),
    'ENERGY_PETRO'
  );

  assert.equal(
    resolveUserOrgTrack({
      cohort: null,
      currentUser: null,
      savedTrack: 'PAYA_SAMAN_PARS'
    }),
    'PAYA_SAMAN_PARS'
  );

  assert.equal(
    resolveUserOrgTrack({
      cohort: null,
      currentUser: null,
      savedTrack: 'GENERAL_EVERYDAY'
    }),
    'CIVIL_INFRA'
  );
});

test('getAllowedTracksForUser and coerceTrackToAllowed strictly limit choices to org track + GENERAL_EVERYDAY', () => {
  assert.deepEqual(getAllowedTracksForUser('PAYA_SAMAN_PARS'), [
    'PAYA_SAMAN_PARS',
    'GENERAL_EVERYDAY'
  ]);
  assert.deepEqual(getAllowedTracksForUser('GENERAL_EVERYDAY'), [
    'CIVIL_INFRA',
    'GENERAL_EVERYDAY'
  ]);

  assert.equal(coerceTrackToAllowed('GENERAL_EVERYDAY', 'PAYA_SAMAN_PARS'), 'GENERAL_EVERYDAY');
  assert.equal(coerceTrackToAllowed('ENERGY_PETRO', 'PAYA_SAMAN_PARS'), 'PAYA_SAMAN_PARS');
  assert.equal(coerceTrackToAllowed('CIVIL_INFRA', 'ENERGY_PETRO'), 'ENERGY_PETRO');
});

test('getAllowedTracksForUser and coerceTrackToAllowed grant Admin access to all 4 tracks', () => {
  assert.deepEqual(getAllowedTracksForUser('CIVIL_INFRA', true), [
    'CIVIL_INFRA',
    'ENERGY_PETRO',
    'PAYA_SAMAN_PARS',
    'GENERAL_EVERYDAY'
  ]);
  assert.equal(coerceTrackToAllowed('ENERGY_PETRO', 'CIVIL_INFRA', true), 'ENERGY_PETRO');
  assert.equal(coerceTrackToAllowed('PAYA_SAMAN_PARS', 'CIVIL_INFRA', true), 'PAYA_SAMAN_PARS');
});
