/**
 * Converts an angle from degrees to radians.
 * @param angle
 * @returns {number} The angle in radians.
 */
export const toRadians = (angle: number) => (angle - 90) * (Math.PI / 180.0);

/**
 * Calculates the end angle for a sector given its start angle and value.
 * If the value is between 0 and 1 (inclusive), it is treated as a fraction of 360 degrees.
 * Otherwise, the value is treated as the angle in degrees.
 *
 * @param {number} startAngle - The starting angle in degrees.
 * @param {number} value - The value representing the angle or fraction.
 * @returns {number} The computed end angle in degrees.
 */

export function getEndAngle(startAngle: number, value: number) {
  let centralAngle = value;
  if (0 <= value && value <= 1) {
    centralAngle = 360 * value;
  }
  return startAngle + centralAngle;
}

export interface Sector {
  /**
   * The central angle of the sector.
   * - `0` to `1` — treated as a proportion of the full circle (e.g. `0.5` = 180°)
   * - `> 1` — treated as degrees (e.g. `180` = 180°)
   * @default 90
   */
  value?: number;
  /**
   * The inner radius as a proportion of the sector's width, creating a donut cutout.
   * @default 0
   */
  innerRadius?: number;
  /**
   * The clockwise starting angle in degrees.
   * @default 0
   */
  startAngle?: number;
  /**
   * The clockwise ending angle in degrees. If omitted, derived from `startAngle + value`.
   */
  endAngle?: number;
}

export interface SectorPathOptions extends Omit<Sector, 'value'> {
  center?: [number, number];
  outerRadius?: number;
}

/**
 * Returns the coordinates of the midpoint of a sector.
 * @param {SectorPathOptions} options
 * @returns {[number, number]} The x and y coordinates of the midpoint of the sector.
 */
export function getMidpoint({
  startAngle = 0,
  endAngle = 90,
  center = [0.5, 0.5],
  outerRadius = 0.5,
  innerRadius = 0
}: SectorPathOptions) {
  const midAngle = (startAngle + endAngle) / 2;
  const midRadius = (outerRadius + innerRadius) / 2;
  return [
    center[0] + midRadius * Math.cos(toRadians(midAngle)),
    center[1] + midRadius * Math.sin(toRadians(midAngle))
  ];
}

/**
 * Returns the SVG path data string representing a circular sector.
 * @param {SectorPathOptions} options
 * @param {[number, number]} options.center - The x coordinate of the circle center.
 * @param {number} options.outerRadius - The radius of the circle.
 * @param {number} options.innerRadius - The inner radius (hole) of the circle.
 * @param {number} options.startAngle - The starting angle (in degrees).
 * @param {number} options.endAngle - The ending angle (in degrees).
 * @returns {string} The SVG path data (d) for the sector.
 */
export function sectorPath(options: SectorPathOptions = {}): string {
  const {
    center = [0.5, 0.5],
    outerRadius: ro = 0.5,
    innerRadius: ri = 0,
    startAngle = 0,
    endAngle = 90
  } = options;
  const [cx, cy] = center;

  // Full circle/donut
  if (endAngle - startAngle >= 360) {
    if (ri === 0) {
      // Solid full circle
      return [
        `M ${cx + ro} ${cy}`,
        `A ${ro} ${ro} 0 1 1 ${cx - ro} ${cy}`,
        `A ${ro} ${ro} 0 1 1 ${cx + ro} ${cy}`,
        `Z`
      ].join(' ');
    }
    // Full donut — two concentric circles (even-odd fill rule)
    return [
      // Outer circle (clockwise)
      `M ${cx + ro} ${cy}`,
      `A ${ro} ${ro} 0 1 1 ${cx - ro} ${cy}`,
      `A ${ro} ${ro} 0 1 1 ${cx + ro} ${cy}`,
      `Z`,
      // Inner circle (counter-clockwise — punches the hole)
      `M ${cx + ri} ${cy}`,
      `A ${ri} ${ri} 0 1 0 ${cx - ri} ${cy}`,
      `A ${ri} ${ri} 0 1 0 ${cx + ri} ${cy}`,
      `Z`
    ].join(' ');
  }

  const radStart = toRadians(startAngle);
  const radEnd = toRadians(endAngle);

  // Outer arc points
  const ox1 = cx + ro * Math.cos(radStart);
  const oy1 = cy + ro * Math.sin(radStart);
  const ox2 = cx + ro * Math.cos(radEnd);
  const oy2 = cy + ro * Math.sin(radEnd);

  const deltaAngle = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = deltaAngle > 180 ? 1 : 0;

  // Slice (no hole) — line to center instead of inner arc
  if (ri === 0) {
    return [
      `M ${ox1} ${oy1}`,
      `A ${ro} ${ro} 0 ${largeArcFlag} 1 ${ox2} ${oy2}`,
      `L ${cx} ${cy}`,
      `Z`
    ].join(' ');
  }

  // Inner arc points
  const ix1 = cx + ri * Math.cos(radStart);
  const iy1 = cy + ri * Math.sin(radStart);
  const ix2 = cx + ri * Math.cos(radEnd);
  const iy2 = cy + ri * Math.sin(radEnd);

  return [
    `M ${ox1} ${oy1}`,
    `A ${ro} ${ro} 0 ${largeArcFlag} 1 ${ox2} ${oy2}`,
    `L ${ix2} ${iy2}`,
    `A ${ri} ${ri} 0 ${largeArcFlag} 0 ${ix1} ${iy1}`,
    `Z`
  ].join(' ');
}

/**
 * Computes the SVG path string for a circular sector given either a decimal value (0-1, as proportion of a circle)
 * or a central angle value (in degrees).
 * - If `value` is between 0 and 1, it's treated as a proportion of the circle (value * 360 deg).
 * - If `value` > 1, it's treated as a central angle in degrees.
 *  `startAngle` can be provided to shift the start of the sector (default 0).
 *
 * @param {Sector} sector - { value?: number, startAngle?: number }
 * @returns {string} SVG path string
 */
export const computeSectorPath = ({
  innerRadius,
  value = 0.25,
  startAngle = 0,
  endAngle
}: Sector = {}) =>
  sectorPath({
    innerRadius,
    startAngle,
    endAngle: endAngle ?? getEndAngle(startAngle, value)
  });
