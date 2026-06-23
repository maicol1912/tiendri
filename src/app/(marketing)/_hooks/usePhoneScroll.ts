'use client';

import { useEffect } from 'react';
import { lerp, PHONE_START_Y, PHONE_END_Y } from '../_lib/animations';

/**
 * Drives the phone element's translateY from PHONE_START_Y to PHONE_END_Y
 * as the user scrolls through the hero section.
 *
 * Handles viewport resize: when the breakpoint changes the active phone
 * switches, so we reset transforms and restart the correct scroll path.
 */
export function usePhoneScroll(
  phoneRef: React.RefObject<HTMLDivElement | null>,
  heroRef: React.RefObject<HTMLElement | null>,
  isMobilePhone: boolean = false,
) {
  useEffect(() => {
    // lg breakpoint mirrors Tailwind's 1024px
    const LG_BREAKPOINT = 1024;

    let rafId: number;
    let ticking = false;
    let cleanup: (() => void) | null = null;

    function setupListeners() {
      // Tear down any previous listeners/rAF before re-setting up
      if (cleanup) {
        cleanup();
        cleanup = null;
      }

      // Re-read the ref in case it was set after the initial mount
      const phoneEl = phoneRef.current;
      if (!phoneEl) return;

      const isDesktopViewport = window.innerWidth >= LG_BREAKPOINT;

      if (isMobilePhone) {
        // Mobile phone: active only on viewports < lg
        if (isDesktopViewport) {
          // Hidden on desktop — reset to initial off-screen position
          phoneEl.style.transform = `translate3d(0px, -100%, 0px)`;
          return;
        }

        // Start higher so the phone is partially visible in the hero on page load.
        // MOBILE_START = -130%: top ~30% of the phone peeks above the HowItWorks
        // section into the hero viewport on a 375px screen (phone height ≈ 504px,
        // 30% ≈ 151px which sits at the bottom quarter of the hero).
        // The animation triggers over 75% of the hero height so it completes
        // right as the user reaches the HowItWorks section.
        const MOBILE_START = -100;
        const MOBILE_END = 0;
        const SCROLL_DISTANCE_FACTOR = 0.85;

        const update = () => {
          const scrolled = window.scrollY;
          const heroH = window.innerHeight;
          if (heroH === 0) return;
          const scrollDistance = heroH * SCROLL_DISTANCE_FACTOR;
          const progress = Math.min(Math.max(scrolled / scrollDistance, 0), 1);
          const phoneY = MOBILE_START + (MOBILE_END - MOBILE_START) * progress;
          phoneEl.style.transform = `translate3d(0px, ${phoneY}%, 0px)`;
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        cleanup = () => window.removeEventListener('scroll', update);
        return;
      }

      // Desktop phone: active only on viewports >= lg
      if (!isDesktopViewport) {
        // Hidden on mobile — reset to initial off-screen position
        phoneEl.style.transform = `translate3d(0px, -80%, 0px)`;
        return;
      }

      const hero = heroRef.current;
      if (!hero) return;

      function update() {
        if (!phoneEl || !hero) return;
        const heroH = hero.offsetHeight;
        const heroTop = hero.getBoundingClientRect().top;
        const scrolled = -heroTop;
        const progress = Math.min(1, Math.max(0, scrolled / heroH));
        const phoneY = lerp(PHONE_START_Y, PHONE_END_Y, progress);
        phoneEl.style.transform = `translate3d(0px, ${phoneY}%, 0px)`;
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
      cleanup = () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
      };
    }

    // Initial setup
    setupListeners();

    // Re-run on resize so the correct phone path stays active
    function onResize() {
      setupListeners();
    }

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, [phoneRef, heroRef, isMobilePhone]);
}
