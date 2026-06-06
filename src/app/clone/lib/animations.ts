/**
 * Animation configurations and utility functions for EventBeds landing page.
 * All durations and easings reverse-engineered from the original HTML/JS.
 */

// ─── Easing functions ────────────────────────────────────────────────────────
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'; // spring-like
export const EASE_STD = 'ease-out';

// ─── Phone scroll animation ──────────────────────────────────────────────────
/**
 * The phone starts at translateY(-140%) (off-screen above), and as the user
 * scrolls through the hero section it travels down to 0% (its resting position).
 * Progress is tied to hero section's scroll depth (0 → 1 over the full hero height).
 */
export const PHONE_START_Y = -140; // %
export const PHONE_END_Y = 0; // %

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.min(1, Math.max(0, t));
}

// ─── Discover section animation values ──────────────────────────────────────
export const DISCOVER_CONFIG = {
  container: { startY: 30, endY: 0 }, // %
  header: {
    phaseIn: { start: 0, end: 0.3 },
    phaseOut: { start: 0.3, end: 0.7 },
    scale: { max: 1.7, mid: 1.3, min: 1 },
    translateY: { max: 10, mid: 5, min: 0 }, // vh
  },
  phones: {
    // Phones START at ±70% translateX and SPREAD to ±110% as the user scrolls.
    // This is the exact original behavior: lerp(70, 110, progress).
    // The phones also RISE from 40vh to -10vh (positive = below center, negative = above).
    // Heights SHRINK: side 85%→70%, center 115%→70% (all relative to sticky vh height).
    xRange: { start: 70, end: 110 }, // % translateX — spreads outward
    yRange: { start: 40, end: -10 }, // vh — below → above center
    sideHeight: { start: 85, end: 70 }, // % of sticky vh
    centerHeight: { start: 115, end: 70 }, // % of sticky vh
  },
};

// ─── Hotel section animation ─────────────────────────────────────────────────
// Black overlay fades as user scrolls, then each window/card reveals in sequence.
export const HOTEL_CONFIG = {
  blackFade: { speed: 1.5 }, // multiplier on progress
  pairs: [
    { threshold: 0.05 }, // window 1 + card 1
    { threshold: 0.25 }, // window 2 + card 2
    { threshold: 0.45 }, // window 3 + card 3
    { threshold: 0.65 }, // window 4 + card 4
  ],
  revealDuration: '0.8s',
  cardDelay: '0.3s',
};

// ─── Marquee speeds ──────────────────────────────────────────────────────────
export const MARQUEE_DURATION = {
  logos: '60s',     // icon scroller horizontal
  brands: '40s',    // brand columns vertical
  ticker: '30s',    // CTA ticker horizontal
};

// ─── IntersectionObserver defaults ───────────────────────────────────────────
export const IO_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

export const IO_OPTIONS_STRICT: IntersectionObserverInit = {
  threshold: 0.3,
};

// ─── Framer Motion variants ───────────────────────────────────────────────────
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUpLgVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const headingRevealVariants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Review card positions (resting + hover states) ─────────────────────────
export type ReviewPosition = 1 | 2 | 3 | 4 | 5;

export const REVIEW_RESTING: Record<ReviewPosition, string> = {
  1: 'translate3d(60%,20%,0) rotateZ(-6deg)',
  2: 'translate3d(-10%,10%,0) rotateZ(-10deg)',
  3: 'translate3d(-55%,10%,0) rotateZ(11deg)',
  4: 'translate3d(40%,-40%,0) rotateZ(-2deg)',
  5: 'translate3d(-20%,-40%,0) rotateZ(13deg)',
};

export const REVIEW_HOVER: Record<ReviewPosition, string> = {
  1: 'translate3d(-5%,5%,0) rotateZ(-6deg)',
  2: 'translate3d(15%,-15%,0) rotateZ(-3deg)',
  3: 'translate3d(70%,-5%,0) rotateZ(5deg)',
  4: 'translate3d(15%,55%,0) rotateZ(-2deg)',
  5: 'translate3d(50%,45%,0) rotateZ(8deg)',
};
