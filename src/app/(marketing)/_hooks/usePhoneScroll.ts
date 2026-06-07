'use client';

import { useEffect } from 'react';
import { lerp, PHONE_START_Y, PHONE_END_Y } from '../_lib/animations';

/**
 * Drives the phone element's translateY from PHONE_START_Y to PHONE_END_Y
 * as the user scrolls through the hero section.
 * Copied from clone/hooks/usePhoneScroll.ts
 */
export function usePhoneScroll(
  phoneRef: React.RefObject<HTMLDivElement | null>,
  heroRef: React.RefObject<HTMLElement | null>,
  isMobilePhone: boolean = false,
) {
  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    if (isMobilePhone) {
      const MOBILE_START = -100;
      const MOBILE_END = 0;

      const update = () => {
        if (!phone) return;
        const scrolled = window.scrollY;
        const heroH = window.innerHeight;
        if (heroH === 0) return;
        const progress = Math.min(Math.max(scrolled / heroH, 0), 1);
        const phoneY = MOBILE_START + (MOBILE_END - MOBILE_START) * progress;
        phone.style.transform = `translate3d(0px, ${phoneY}%, 0px)`;
      };

      update();
      window.addEventListener('scroll', update, { passive: true });
      return () => window.removeEventListener('scroll', update);
    }

    const hero = heroRef.current;
    const isMobileViewport = !hero || hero.offsetHeight === 0;

    if (isMobileViewport) {
      phone.style.transform = `translate3d(0px, 0%, 0px)`;
      return;
    }

    let rafId: number;
    let ticking = false;

    function update() {
      if (!phone || !hero) return;
      const heroH = hero.offsetHeight;
      const heroTop = hero.getBoundingClientRect().top;
      const scrolled = -heroTop;
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

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [phoneRef, heroRef, isMobilePhone]);
}
