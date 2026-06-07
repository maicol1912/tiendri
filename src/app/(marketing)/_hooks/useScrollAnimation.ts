'use client';

import { useEffect, useRef, RefObject } from 'react';
import { lerp, DISCOVER_CONFIG, HOTEL_CONFIG, IO_OPTIONS } from '../_lib/animations';

// Discover animation (copied from clone)
export interface DiscoverRefs {
  heightRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLElement | null>;
  phoneLeftRef: RefObject<HTMLElement | null>;
  phoneCenterRef: RefObject<HTMLElement | null>;
  phoneRightRef: RefObject<HTMLElement | null>;
}

export function useDiscoverAnimation(refs: DiscoverRefs) {
  useEffect(() => {
    const { heightRef, containerRef, headerRef, phoneLeftRef, phoneCenterRef, phoneRightRef } = refs;

    let rafId: number;
    let ticking = false;

    function update() {
      const height = heightRef.current;
      const container = containerRef.current;
      const header = headerRef.current;
      const left = phoneLeftRef.current;
      const center = phoneCenterRef.current;
      const right = phoneRightRef.current;

      if (!height) return;

      const rect = height.getBoundingClientRect();
      const totalScroll = height.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

      if (container) {
        const containerY = lerp(DISCOVER_CONFIG.container.startY, DISCOVER_CONFIG.container.endY, progress * 3);
        container.style.transform = `translateY(${containerY}%)`;
      }

      if (header) {
        let opacity: number;
        let scale: number;
        let translateY: number;
        const { phaseIn, phaseOut, scale: sc, translateY: ty } = DISCOVER_CONFIG.header;

        if (progress < phaseIn.end) {
          const t = progress / phaseIn.end;
          opacity = t;
          scale = lerp(sc.max, sc.mid, t);
          translateY = lerp(ty.max, ty.mid, t);
        } else {
          const t = Math.min(1, (progress - phaseOut.start) / (phaseOut.end - phaseOut.start));
          opacity = lerp(1, 0, t);
          scale = lerp(sc.mid, sc.min, t);
          translateY = lerp(ty.mid, ty.min, t);
        }

        header.style.opacity = String(opacity);
        header.style.transform = `scale(${scale}) translateY(${translateY}vh)`;
      }

      if (left && center && right) {
        const { xRange, yRange, sideHeight, centerHeight } = DISCOVER_CONFIG.phones;
        const phoneX = lerp(xRange.start, xRange.end, progress);
        const phoneY = lerp(yRange.start, yRange.end, progress);
        const sideH = lerp(sideHeight.start, sideHeight.end, progress);
        const centerH = lerp(centerHeight.start, centerHeight.end, progress);

        left.style.transform = `translate3d(-${phoneX}%, ${phoneY}vh, 0)`;
        left.style.height = `${sideH}vh`;
        center.style.transform = `translate3d(0px, ${phoneY}vh, 0)`;
        center.style.height = `${centerH}vh`;
        right.style.transform = `translate3d(${phoneX}%, ${phoneY}vh, 0)`;
        right.style.height = `${sideH}vh`;
      }
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
  }, [refs]);
}

// Hotel animation (copied from clone)
export interface HotelWindowCard {
  windowRef: RefObject<HTMLElement | null>;
  cardRef: RefObject<HTMLElement | null>;
}

export function useHotelAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  blackOverlayRefs: RefObject<HTMLElement | null>[],
  pairs: HotelWindowCard[],
) {
  useEffect(() => {
    const triggered = new Array<boolean>(pairs.length).fill(false);
    let rafId: number;
    let ticking = false;

    function update() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const scrollInSection = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollInSection / (sectionH * 0.6)));

      blackOverlayRefs.forEach((ref) => {
        const el = ref.current;
        if (el) el.style.opacity = String(Math.max(0, 1 - progress * HOTEL_CONFIG.blackFade.speed));
      });

      HOTEL_CONFIG.pairs.forEach((config, i) => {
        if (progress > config.threshold && !triggered[i]) {
          triggered[i] = true;
          const pair = pairs[i];
          if (pair?.windowRef.current) {
            const win = pair.windowRef.current;
            win.style.transition = `opacity ${HOTEL_CONFIG.revealDuration} ease`;
            win.style.opacity = '1';
          }
          if (pair?.cardRef.current) {
            const card = pair.cardRef.current;
            card.style.transition = `opacity ${HOTEL_CONFIG.revealDuration} ease ${HOTEL_CONFIG.cardDelay}, transform ${HOTEL_CONFIG.revealDuration} ease ${HOTEL_CONFIG.cardDelay}`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        }
      });
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
  }, [sectionRef, blackOverlayRefs, pairs]);
}

// Navbar scroll hide/show (copied from clone)
export function useNavbarScroll(navRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let lastScrollY = 0;

    function onScroll() {
      const nav = navRef.current;
      if (!nav) return;
      const currentY = window.scrollY;
      if (currentY > 100) {
        if (currentY > lastScrollY) {
          nav.style.transform = 'translateY(-150%)';
        } else {
          nav.style.transform = 'translateY(0%)';
          nav.style.transition = 'transform 0.4s ease-out';
        }
      } else {
        nav.style.transform = '';
        nav.style.transition = '';
      }
      lastScrollY = currentY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navRef]);
}

// Entrance animation via IntersectionObserver (copied from clone)
export function useFadeInOnScroll(refs: RefObject<HTMLElement | null>[], type: 'fadeUp' | 'scaleIn' = 'fadeUp') {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) translateX(0) scale(1)';
          el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
          observer.unobserve(el);
        }
      });
    }, IO_OPTIONS);

    refs.forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      if (type === 'scaleIn') {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [refs, type]);
}

// Smooth scroll hook (copied from clone)
export function useSmoothScroll() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    async function init() {
      const LenisClass = (await import('lenis')).default;
      lenis = new LenisClass({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (!isMobile) init();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
