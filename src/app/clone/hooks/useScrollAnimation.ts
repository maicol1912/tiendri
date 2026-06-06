'use client';

import { useEffect, useRef, RefObject } from 'react';
import { lerp, DISCOVER_CONFIG, HOTEL_CONFIG, IO_OPTIONS, IO_OPTIONS_STRICT } from '../lib/animations';

// ─── Discover section animation ──────────────────────────────────────────────

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

      // Container slides up from 30% to 0%
      if (container) {
        const containerY = lerp(
          DISCOVER_CONFIG.container.startY,
          DISCOVER_CONFIG.container.endY,
          progress * 3,
        );
        container.style.transform = `translateY(${containerY}%)`;
      }

      // Header: fades in (0→0.3) then fades out (0.3→0.7), scaling from 1.7→1
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

      // Phones spread outward: X lerp(70,110,p), Y lerp(40,-10,p) (rise into view).
      // Heights also animate: side 85%→70%, center 115%→70% (% of sticky vh).
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

// ─── Hotel section animation ─────────────────────────────────────────────────

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

      // Fade out the black overlay as user scrolls in
      blackOverlayRefs.forEach((ref) => {
        const el = ref.current;
        if (el) el.style.opacity = String(Math.max(0, 1 - progress * HOTEL_CONFIG.blackFade.speed));
      });

      // Reveal each window+card pair when their threshold is crossed
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

// ─── Parallax for benefits elements ─────────────────────────────────────────

export function useParallax(refs: RefObject<HTMLElement | null>[], startY = 70) {
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    function update() {
      refs.forEach((ref) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          const progress = 1 - rect.top / window.innerHeight;
          const currentY = lerp(startY, 0, progress);
          el.style.transform = `translateY(${currentY}px)`;
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
  }, [refs, startY]);
}

// ─── Founder word-by-word reveal ────────────────────────────────────────────

export function useFounderWords(
  sectionRef: RefObject<HTMLElement | null>,
  spanRefs: RefObject<HTMLElement | null>[],
) {
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    function update() {
      const section = sectionRef.current;
      if (!section || spanRefs.length === 0) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (-rect.top + window.innerHeight * 0.3) / (rect.height * 0.7)),
      );
      const wordsToShow = Math.floor(progress * spanRefs.length);

      spanRefs.forEach((ref, i) => {
        const span = ref.current;
        if (!span) return;
        if (i < wordsToShow) {
          span.style.opacity = '1';
        } else {
          span.style.opacity = '0';
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
  }, [sectionRef, spanRefs]);
}

// ─── Navbar scroll hide/show ─────────────────────────────────────────────────

export function useNavbarScroll(navRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let lastScrollY = 0;

    function onScroll() {
      const nav = navRef.current;
      if (!nav) return;

      const currentY = window.scrollY;

      if (currentY > 100) {
        if (currentY > lastScrollY) {
          // Scrolling DOWN — hide navbar
          nav.style.transform = 'translateY(-150%)';
        } else {
          // Scrolling UP — show navbar
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

// ─── Entrance animation via IntersectionObserver ─────────────────────────────

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

// ─── RAF-based marquee (brand sliders) ──────────────────────────────────────

export function useBrandSliders(
  leftRef: RefObject<HTMLElement | null>,
  rightRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    let leftRafId: number;
    let rightRafId: number;
    let leftPos = 0;
    let rightPos = 0;
    let rightHeight = 0;

    function animateLeft() {
      const el = leftRef.current;
      if (!el) { leftRafId = requestAnimationFrame(animateLeft); return; }
      const totalHeight = el.scrollHeight / 2;
      leftPos += 0.5;
      if (leftPos >= totalHeight) leftPos = 0;
      el.style.transform = `translateY(-${leftPos}px)`;
      leftRafId = requestAnimationFrame(animateLeft);
    }

    function animateRight() {
      const el = rightRef.current;
      if (!el) { rightRafId = requestAnimationFrame(animateRight); return; }
      if (rightHeight === 0) rightHeight = el.scrollHeight / 2;
      rightPos -= 0.5;
      if (rightPos <= 0) rightPos = rightHeight;
      el.style.transform = `translateY(-${rightPos}px)`;
      rightRafId = requestAnimationFrame(animateRight);
    }

    leftRafId = requestAnimationFrame(animateLeft);
    rightRafId = requestAnimationFrame(animateRight);

    return () => {
      cancelAnimationFrame(leftRafId);
      cancelAnimationFrame(rightRafId);
    };
  }, [leftRef, rightRef]);
}

// ─── RAF-based ticker (CTA) ──────────────────────────────────────────────────

export function useTicker(ref: RefObject<HTMLElement | null>, speed = 1) {
  useEffect(() => {
    let rafId: number;
    let pos = 0;

    function animate() {
      const el = ref.current;
      if (!el) { rafId = requestAnimationFrame(animate); return; }
      const totalWidth = el.scrollWidth / 2;
      pos += speed;
      if (pos >= totalWidth) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [ref, speed]);
}

// ─── Screen image cycler (phone screen shots in deals section) ───────────────

export function useScreenCycler(
  refs: RefObject<HTMLImageElement | null>[],
  interval = 3000,
) {
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (refs.length === 0) return;

    function cycle() {
      const prev = refs[currentIndexRef.current]?.current;
      currentIndexRef.current = (currentIndexRef.current + 1) % refs.length;
      const next = refs[currentIndexRef.current]?.current;

      if (prev) {
        prev.style.transition = 'opacity 0.6s ease';
        prev.style.opacity = '0';
      }
      if (next) {
        next.style.transition = 'opacity 0.6s ease';
        next.style.opacity = '1';
      }
    }

    const id = setInterval(cycle, interval);
    return () => clearInterval(id);
  }, [refs, interval]);
}
