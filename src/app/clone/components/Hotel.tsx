'use client';

import { useRef, useEffect } from 'react';
import { lerp, HOTEL_CONFIG } from '../lib/animations';

const mobileCards = [
  { iconSrc: '/clone-assets/hotel-icon-1.svg', title: 'Fully flexible rates.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-2.svg', title: 'Semi-flexible options.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-3.svg', title: 'Amend or cancel your booking online.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-4.svg', title: 'On demand customer service.', dark: true },
];

const HOTEL_WINDOWS = [
  { src: '/clone-assets/hotel-window-4.avif', alt: 'Fully flexible rates' },
  { src: '/clone-assets/hotel-window-3.avif', alt: 'Semi-flexible options' },
  { src: '/clone-assets/hotel-window-2.avif', alt: 'Amend or cancel' },
  { src: '/clone-assets/hotel-window-1.avif', alt: 'On-demand customer service' },
];

const HOTEL_CARDS = [
  { src: '/clone-assets/hotel-card-1.avif', alt: 'Fully flexible rates' },
  { src: '/clone-assets/hotel-card-2.avif', alt: 'Semi-flexible options' },
  { src: '/clone-assets/hotel-card-3.avif', alt: 'Amend or cancel your booking online' },
  { src: '/clone-assets/hotel-card-4.avif', alt: 'On-demand customer service' },
];

/**
 * Hotel section — "Book and relax"
 *
 * Desktop:
 * - Black overlay (data-hotel="black-overlay") fades out as user scrolls in
 * - 4 window images (data-hotel="window-1" … "window-4") reveal in sequence
 * - 4 feature cards (data-hotel="card-1" … "card-4") slide up with 0.3s delay
 *
 * Mobile: 2×2 feature card grid + hotel image
 *
 * Animation uses Intersection-Observer + scroll-position tracking via RAF loop.
 * DOM nodes are queried by data-hotel attributes (Valentina's convention).
 */
export function Hotel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blackOverlay = section.querySelector<HTMLElement>('[data-hotel="black-overlay"]');
    const windows = Array.from({ length: 4 }, (_, i) =>
      section.querySelector<HTMLElement>(`[data-hotel="window-${i + 1}"]`),
    );
    const cards = Array.from({ length: 4 }, (_, i) =>
      section.querySelector<HTMLElement>(`[data-hotel="card-${i + 1}"]`),
    );
    const bodyText = section.querySelector<HTMLElement>('[data-hotel="body-text"]');

    const triggered = new Array<boolean>(4).fill(false);
    let rafId: number;
    let ticking = false;

    // Reveal body text on entry
    const bodyObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && bodyText) {
          bodyText.style.opacity = '1';
          bodyText.style.transform = 'translateY(0)';
          bodyObserver.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (bodyText) bodyObserver.observe(bodyText);

    function update() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const scrollInSection = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollInSection / (sectionH * 0.6)));

      // Fade out black overlay
      if (blackOverlay) {
        const opacity = Math.max(0, 1 - progress * HOTEL_CONFIG.blackFade.speed);
        blackOverlay.style.opacity = String(opacity);
      }

      // Reveal each window + card pair when threshold crossed
      HOTEL_CONFIG.pairs.forEach((config, i) => {
        if (progress > config.threshold && !triggered[i]) {
          triggered[i] = true;

          if (windows[i] && !prefersReducedMotion) {
            windows[i]!.style.transition = `opacity ${HOTEL_CONFIG.revealDuration} ease`;
            windows[i]!.style.opacity = '1';
          } else if (windows[i]) {
            windows[i]!.style.opacity = '1';
          }

          if (cards[i] && !prefersReducedMotion) {
            cards[i]!.style.transition = `opacity ${HOTEL_CONFIG.revealDuration} ease ${HOTEL_CONFIG.cardDelay}, transform ${HOTEL_CONFIG.revealDuration} ease ${HOTEL_CONFIG.cardDelay}`;
            cards[i]!.style.opacity = '1';
            cards[i]!.style.transform = 'translateY(0)';
          } else if (cards[i]) {
            cards[i]!.style.opacity = '1';
            cards[i]!.style.transform = 'translateY(0)';
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
      bodyObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hotel-sc overflow-hidden"
      aria-labelledby="hotel-heading"
    >
      {/* Header — black background */}
      <div
        className="bg-black px-6 lg:px-10 py-16"
        style={{ willChange: 'background' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <h2
            id="hotel-heading"
            className="text-white font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Book and relax
          </h2>
          <p
            data-hotel="body-text"
            className="text-neutral-400 text-base max-w-xl leading-relaxed"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            }}
          >
            Flexible options give you more time to get ready for your trip and less time stressing if things change.
          </p>
        </div>
      </div>

      {/* Desktop building + animated cards */}
      <div
        className="hidden lg:block relative w-full bg-black"
        style={{ minHeight: '90vh', willChange: 'width, height' }}
      >
        {/* Grey base hotel building */}
        <img
          src="/clone-assets/hotel-grey.avif"
          alt="Hotel building"
          className="w-full block"
          loading="lazy"
        />

        {/* Black overlay — fades out on scroll */}
        <img
          data-hotel="black-overlay"
          src="/clone-assets/hotel-black.avif"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'opacity', opacity: 1 }}
        />

        {/* Window overlays — reveal one by one */}
        {HOTEL_WINDOWS.map((w, i) => (
          <img
            key={i}
            data-hotel={`window-${i + 1}`}
            src={w.src}
            alt={w.alt}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ opacity: 0 }}
            loading="lazy"
          />
        ))}

        {/* Feature cards — slide up sequentially */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-5 px-8">
          {HOTEL_CARDS.map((card, i) => (
            <div
              key={i}
              data-hotel={`card-${i + 1}`}
              className="rounded-2xl overflow-hidden shadow-2xl bg-white"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                width: '22%',
                maxWidth: 280,
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden">
        {/* 2×2 feature card grid */}
        <div className="grid grid-cols-2 gap-px bg-neutral-200" role="list">
          {mobileCards.map((card, i) => (
            <div
              key={i}
              role="listitem"
              className={`p-8 flex flex-col gap-4 ${card.dark ? 'bg-black' : 'bg-white'}`}
            >
              <div className="w-10 h-10" aria-hidden="true">
                <img
                  src={card.iconSrc}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <h3
                className={`font-black leading-tight text-xl ${card.dark ? 'text-white' : 'text-black'}`}
              >
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Mobile hotel building */}
        <div className="relative w-full">
          <img
            src="/clone-assets/mobile-hotel-grey.avif"
            alt="Hotel building exterior"
            className="w-full"
            loading="lazy"
          />
          <img
            src="/clone-assets/mobile-hotel-black.avif"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
