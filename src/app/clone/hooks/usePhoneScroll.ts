'use client';

import { useEffect, useRef } from 'react';
import { lerp, PHONE_START_Y, PHONE_END_Y } from '../lib/animations';

/**
 * Drives the phone element's translateY from PHONE_START_Y (off-screen above)
 * to PHONE_END_Y (resting position) as the user scrolls through the hero section.
 *
 * Mechanism (direct from the original JS):
 *   scrolled  = -heroSection.getBoundingClientRect().top
 *   progress  = scrolled / heroSection.offsetHeight  (clamped 0→1)
 *   phoneY    = lerp(-140, 0, progress)
 *   phone.style.transform = `translate3d(0px, ${phoneY}%, 0px)`
 */
export function usePhoneScroll(
  phoneRef: React.RefObject<HTMLElement | null>,
  heroRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const phone = phoneRef.current;
    const hero = heroRef.current;
    if (!phone || !hero) return;

    let rafId: number;
    let ticking = false;

    function update() {
      if (!phone || !hero) return;
      const heroRect = hero.getBoundingClientRect();
      const heroH = hero.offsetHeight;
      const scrolled = -heroRect.top;
      const progress = Math.min(1, Math.max(0, scrolled / heroH));
      const phoneY = lerp(PHONE_START_Y, PHONE_END_Y, progress);
      phone.style.transform = `translate3d(0px, ${phoneY}%, 0px)`;
    }

    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Set initial position
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [phoneRef, heroRef]);
}
