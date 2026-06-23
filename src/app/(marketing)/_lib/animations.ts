/**
 * Landing — Animation utilities
 * Shared constants for scroll-driven animations.
 */

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_STD = 'ease-out';

// Phone scroll
export const PHONE_START_Y = -100;
export const PHONE_END_Y = 5;

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.min(1, Math.max(0, t));
}

// Review card positions (resting + hover states)
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
