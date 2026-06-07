/**
 * Tiendri Landing — Animation utilities
 * Copied from clone/lib/animations.ts and adapted for light palette.
 */

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_STD = 'ease-out';

// Phone scroll
export const PHONE_START_Y = -100;
export const PHONE_END_Y = 5;

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.min(1, Math.max(0, t));
}

export const DISCOVER_CONFIG = {
  container: { startY: 30, endY: 0 },
  header: {
    phaseIn: { start: 0, end: 0.3 },
    phaseOut: { start: 0.3, end: 0.7 },
    scale: { max: 1.7, mid: 1.1, min: 1 },
    translateY: { max: 24, mid: 12, min: 5 },
  },
  phones: {
    xRange: { start: 70, end: 110 },
    yRange: { start: 40, end: -10 },
    sideHeight: { start: 85, end: 70 },
    centerHeight: { start: 115, end: 70 },
  },
};

export const HOTEL_CONFIG = {
  blackFade: { speed: 1.5 },
  pairs: [
    { threshold: 0.05 },
    { threshold: 0.25 },
    { threshold: 0.45 },
    { threshold: 0.65 },
  ],
  revealDuration: '0.8s',
  cardDelay: '0.3s',
};

export const MARQUEE_DURATION = {
  logos: '60s',
  brands: '40s',
  ticker: '30s',
};

export const IO_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

// Review card positions (resting + hover states) — same as clone
export type ReviewPosition = 1 | 2 | 3 | 4 | 5;

export const REVIEW_RESTING: Record<ReviewPosition, string> = {
  1: 'translate3d(-60%, 10%, 0) rotateZ(-6deg)',
  2: 'translate3d(10%, -30%, 0) rotateZ(5deg)',
  3: 'translate3d(70%, -10%, 0) rotateZ(4deg)',
  4: 'translate3d(-10%, 40%, 0) rotateZ(-3deg)',
  5: 'translate3d(50%, 25%, 0) rotateZ(11deg)',
};

export const REVIEW_HOVER: Record<ReviewPosition, string> = {
  1: 'translate3d(-170%, -40%, 0) rotateZ(0deg)',
  2: 'translate3d(0%, -45%, 0) rotateZ(0deg)',
  3: 'translate3d(170%, -40%, 0) rotateZ(0deg)',
  4: 'translate3d(-85%, 60%, 0) rotateZ(0deg)',
  5: 'translate3d(85%, 55%, 0) rotateZ(0deg)',
};
