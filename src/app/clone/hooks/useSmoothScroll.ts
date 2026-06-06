'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

/**
 * Initializes Lenis smooth scrolling at the page level.
 * Returns the Lenis instance ref so child components can integrate their
 * RAF loops (e.g. GSAP ScrollTrigger).
 *
 * NOTE: Lenis v1.x uses `new Lenis({ lerp, smoothWheel })` API.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis;
    let rafId: number;

    async function init() {
      const LenisClass = (await import('lenis')).default;
      lenis = new LenisClass({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    // Only initialize on desktop — match original behavior (smooth scroll
    // is only used on the desktop hero/discover sections)
    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (!isMobile) {
      init();
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
