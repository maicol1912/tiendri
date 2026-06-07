'use client';

import { useRef, useEffect } from 'react';

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
  { src: '/clone-assets/hotel-card-1.avif', alt: 'Fully flexible rates', inset: '12% auto auto 14%' },
  { src: '/clone-assets/hotel-card-3.avif', alt: 'Semi-flexible options', inset: '24% 14% auto auto' },
  { src: '/clone-assets/hotel-card-2.avif', alt: 'Amend or cancel your booking online', inset: '45% auto auto 15%' },
  { src: '/clone-assets/hotel-card-4.avif', alt: 'On-demand customer service', inset: '54% 15% auto auto' },
];

/**
 * Hotel section — "Book and relax"
 *
 * Desktop:
 * - Grey building base image fills the container
 * - Black overlay (data-hotel="black-overlay") sits absolute over it, fades out on scroll
 * - 4 window images (data-hotel="window-1" … "window-4") are absolute, reveal in sequence
 * - 4 feature cards (data-hotel="card-1" … "card-4") are ABSOLUTELY POSITIONED around the
 *   building (top-left, right, lower-left, lower-right), slide up with 0.3s delay
 *
 * Mobile: 2×2 feature card grid + hotel image
 *
 * Animation is scroll-driven: progress = scrollInSection / (sectionHeight * 0.6)
 * Each window+card pair fires once when its threshold is crossed.
 */
export function Hotel() {
  const sectionRef = useRef<HTMLElement>(null);

  const blackRef = useRef<HTMLImageElement>(null);
  const windowRefs = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggered = [false, false, false, false];
    const thresholds = [0.05, 0.25, 0.45, 0.65];

    function update() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const scrollInSection = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollInSection / (sectionH * 0.6)));

      if (blackRef.current) {
        blackRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.5));
      }

      thresholds.forEach((threshold, i) => {
        if (progress > threshold && !triggered[i]) {
          triggered[i] = true;

          const win = windowRefs[i].current;
          const card = cardRefs[i].current;

          if (win) {
            win.style.transition = 'opacity 0.8s ease';
            win.style.opacity = '1';
          }
          if (card) {
            card.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        }
      });
    }

    function onScroll() {
      update();
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      aria-labelledby="hotel-heading"
    >
      {/* Header — black background */}
      <div className="bg-black px-6 lg:px-10" style={{ paddingTop: 130, paddingBottom: 130 }}>
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
          <h2
            id="hotel-heading"
            className="text-white font-black leading-tight"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Book and relax
          </h2>
          <p className="text-neutral-400 text-base max-w-xl leading-relaxed">
            Flexible options give you more time to get ready for your trip and less time stressing if things change.
          </p>
        </div>
      </div>

      {/* ── Desktop: building with absolutely positioned cards ── */}
      <div
        className="hidden lg:block"
        style={{
          position: 'relative',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: -4,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          overflow: 'hidden',
        }}
      >
        {/* Grey base building — sets the container height */}
        <img
          src="/clone-assets/hotel-grey.avif"
          alt="Hotel building"
          className="w-full block"
          loading="lazy"
        />

        {/* Black overlay — position:absolute inset:0, fades out on scroll */}
        <img
          ref={blackRef}
          src="/clone-assets/hotel-black.avif"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0%',
            width: '100%',
            opacity: 1,
          }}
          loading="lazy"
        />

        {/* Window overlays — each absolutely covers the full building, reveals in sequence */}
        <div style={{ position: 'absolute', inset: '0%', height: '100%' }}>
          {HOTEL_WINDOWS.map((w, i) => (
            <img
              key={i}
              ref={windowRefs[i]}
              src={w.src}
              alt={w.alt}
              style={{
                position: 'absolute',
                inset: '0%',
                width: '100%',
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Feature cards — absolutely positioned around the building, NOT in a row */}
        {HOTEL_CARDS.map((card, i) => (
          <div
            key={i}
            ref={cardRefs[i]}
            style={{
              position: 'absolute',
              inset: card.inset,
              width: '13%',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              style={{ width: '100%', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ── Mobile view ── */}
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
