export interface OrbitPoint {
  x: number;
  y: number;
  rad: number;
}

export const normalizeOrbitDeg = (deg: number): number =>
  ((((deg + 180) % 360) + 360) % 360) - 180;

export const computeOrbitStepDeg = (count: number): number =>
  count > 0 ? 360 / count : 72;

export const computeOrbitNodePosition = (
  index: number,
  count: number,
  rotationDeg: number,
  cx: number,
  cy: number,
  radius: number
): OrbitPoint => {
  const stepDeg = computeOrbitStepDeg(count);
  const rad = ((index * stepDeg + rotationDeg) * Math.PI) / 180;
  return {
    x: cx + radius * Math.sin(rad),
    y: cy - radius * Math.cos(rad),
    rad
  };
};

export const getTopOrbitIndex = (rotationDeg: number, count: number): number => {
  if (count <= 0) return 0;
  const stepDeg = computeOrbitStepDeg(count);
  const steps = Math.round(-rotationDeg / stepDeg);
  return ((steps % count) + count) % count;
};
