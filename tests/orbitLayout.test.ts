import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeOrbitStepDeg,
  computeOrbitNodePosition,
  getTopOrbitIndex,
  normalizeOrbitDeg
} from '../src/utils/orbitLayout';

test('computeOrbitStepDeg adapts dynamically for 5 and 6 orbit nodes', () => {
  assert.equal(computeOrbitStepDeg(5), 72);
  assert.equal(computeOrbitStepDeg(6), 60);
  assert.equal(computeOrbitStepDeg(0), 72);
});

test('computeOrbitNodePosition places 6 nodes symmetrically around hub at radius 246', () => {
  const cx = 400;
  const cy = 330;
  const r = 246;
  const top = computeOrbitNodePosition(0, 6, 0, cx, cy, r);
  assert.ok(Math.abs(top.x - 400) < 1e-6);
  assert.ok(Math.abs(top.y - (330 - 246)) < 1e-6);

  const bottom = computeOrbitNodePosition(3, 6, 0, cx, cy, r);
  assert.ok(Math.abs(bottom.x - 400) < 1e-6);
  assert.ok(Math.abs(bottom.y - (330 + 246)) < 1e-6);

  const upperRight = computeOrbitNodePosition(1, 6, 0, cx, cy, r);
  const upperLeft = computeOrbitNodePosition(5, 6, 0, cx, cy, r);
  assert.ok(Math.abs(upperRight.y - upperLeft.y) < 1e-6);
  assert.ok(upperRight.x > cx && upperLeft.x < cx);
});

test('getTopOrbitIndex resolves the snapped session index at 12 oclock for 6 sections', () => {
  assert.equal(getTopOrbitIndex(0, 6), 0);
  assert.equal(getTopOrbitIndex(-60, 6), 1);
  assert.equal(getTopOrbitIndex(-120, 6), 2);
  assert.equal(getTopOrbitIndex(-180, 6), 3);
  assert.equal(getTopOrbitIndex(60, 6), 5);
});

test('normalizeOrbitDeg keeps shortest angular delta within [-180, 180)', () => {
  assert.equal(normalizeOrbitDeg(240), -120);
  assert.equal(normalizeOrbitDeg(-240), 120);
});
