// Tech Premium Template — Grid Column Class Mapping
//
// Tailwind purges dynamic classes like `grid-cols-${n}`.
// This lookup table keeps all class strings statically present in source
// so Tailwind's scanner picks them up correctly.
//
// Valid range: 1–6 columns (covers all config.grid values).

const MOBILE_GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const DESKTOP_GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * Returns the Tailwind grid-cols classes for a responsive grid.
 * Falls back to 2 columns (mobile) and 4 columns (desktop) if
 * the value is out of the supported 1–6 range.
 *
 * @example
 * gridColsClass(2, 4) → "grid-cols-2 lg:grid-cols-4"
 */
export function gridColsClass(mobile: number, desktop: number): string {
  const mobileClass = MOBILE_GRID_COLS[mobile] ?? "grid-cols-2";
  const desktopClass = DESKTOP_GRID_COLS[desktop] ?? "lg:grid-cols-4";
  return `${mobileClass} ${desktopClass}`;
}
