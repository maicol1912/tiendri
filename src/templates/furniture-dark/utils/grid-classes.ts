// Furniture Dark Template — Grid Column Class Mapping
// Tailwind purges dynamic classes. Static lookup keeps all classes scannable.

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
 * Falls back to 2 (mobile) and 4 (desktop) if out of range.
 */
export function gridColsClass(mobile: number, desktop: number): string {
  const mobileClass = MOBILE_GRID_COLS[mobile] ?? "grid-cols-2";
  const desktopClass = DESKTOP_GRID_COLS[desktop] ?? "lg:grid-cols-4";
  return `${mobileClass} ${desktopClass}`;
}
