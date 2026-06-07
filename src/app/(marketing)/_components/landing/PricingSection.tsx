'use client';

import { useRef, useEffect } from 'react';

/**
 * PricingSection — Tiendri Landing (Light / Clone style)
 *
 * Visual structure: clone Hotel (scroll-driven reveal of features).
 * Content: "Pedidos sin complicaciones" — 4 key features of Tiendri order flow.
 *
 * Desktop: building image with overlay fade → sequential card reveal on scroll.
 * Mobile: zigzag feature cards.
 *
 * NOTE: Section id="precios" kept for nav anchor. Content focuses on order/product
 * workflow features rather than pricing plans (pricing table preserved separately below
 * as PricingPlans for future use if CTO wants to add it back).
 */

const mobileFeatures = [
  { iconSrc: '/clone-assets/hotel-icon-1.svg', title: 'Catálogo sin límites en el plan Pro.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-2.svg', title: 'Pedidos por WhatsApp con detalle completo.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-3.svg', title: 'Tu tienda activa en 5 minutos.', dark: false },
  { iconSrc: '/clone-assets/hotel-icon-4.svg', title: '0% de comisión. Siempre.', dark: true },
];

const FEATURE_WINDOWS = [
  { src: '/clone-assets/hotel-window-4.avif', alt: 'Catálogo de productos' },
  { src: '/clone-assets/hotel-window-3.avif', alt: 'Pedidos por WhatsApp' },
  { src: '/clone-assets/hotel-window-2.avif', alt: 'Tienda activa' },
  { src: '/clone-assets/hotel-window-1.avif', alt: 'Sin comisiones' },
];

const FEATURE_CARDS = [
  { src: '/clone-assets/hotel-card-1.avif', alt: 'Catálogo sin límites', inset: '12% auto auto 14%' },
  { src: '/clone-assets/hotel-card-3.avif', alt: 'Pedidos WhatsApp', inset: '24% 14% auto auto' },
  { src: '/clone-assets/hotel-card-2.avif', alt: 'Tienda en minutos', inset: '45% auto auto 15%' },
  { src: '/clone-assets/hotel-card-4.avif', alt: 'Sin comisiones', inset: '54% 15% auto auto' },
];

export function PricingSection() {
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

    // lg breakpoint mirrors Tailwind's 1024px
    const LG_BREAKPOINT = 1024;

    const thresholds = [0.05, 0.25, 0.45, 0.65];
    let triggered = [false, false, false, false];
    let scrollCleanup: (() => void) | null = null;

    function resetDesktopElements() {
      triggered = [false, false, false, false];
      if (blackRef.current) {
        blackRef.current.style.transition = '';
        blackRef.current.style.opacity = '1';
      }
      windowRefs.forEach((ref) => {
        const el = ref.current;
        if (el) {
          el.style.transition = '';
          el.style.opacity = '0';
        }
      });
      cardRefs.forEach((ref) => {
        const el = ref.current;
        if (el) {
          el.style.transition = '';
          el.style.opacity = '0';
          el.style.transform = 'translateY(40px)';
        }
      });
    }

    function setupScrollListener() {
      if (scrollCleanup) {
        scrollCleanup();
        scrollCleanup = null;
      }

      // Only run desktop animation on lg+ viewports
      if (window.innerWidth < LG_BREAKPOINT) {
        resetDesktopElements();
        return;
      }

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

      update();
      window.addEventListener('scroll', update, { passive: true });
      scrollCleanup = () => window.removeEventListener('scroll', update);
    }

    // Initial setup
    setupScrollListener();

    // Re-setup on resize to reset state when breakpoint crosses lg
    function onResize() {
      setupScrollListener();
    }
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (scrollCleanup) scrollCleanup();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="precios"
      ref={sectionRef}
      className="overflow-hidden"
      style={{ borderRadius: '0 0 24px 24px' }}
      aria-labelledby="pricing-section-heading"
    >
      {/* Header — black background */}
      <div className="bg-black px-6 lg:px-10 pt-16 pb-16 lg:pt-[130px] lg:pb-[130px]">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
          <h2
            id="pricing-section-heading"
            className="text-white font-black leading-tight text-center lg:text-left"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontFamily: "'Aeonik', sans-serif" }}
          >
            Vende sin complicaciones
          </h2>
          <p className="text-neutral-400 text-base max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: "'Aeonik', sans-serif" }}>
            Sube tus productos, comparte el link y recibe cada pedido con el detalle completo.
            Sin andar preguntando precio por precio. Sin comisiones. Sin letra chica.
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
        <img
          src="/clone-assets/hotel-grey.avif"
          alt="Plataforma Tiendri"
          className="w-full block"
          loading="lazy"
        />

        <img
          ref={blackRef}
          src="/clone-assets/hotel-black.avif"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: '0%', width: '100%', opacity: 1 }}
          loading="lazy"
        />

        <div style={{ position: 'absolute', inset: '0%', height: '100%' }}>
          {FEATURE_WINDOWS.map((w, i) => (
            <img
              key={i}
              ref={windowRefs[i]}
              src={w.src}
              alt={w.alt}
              style={{ position: 'absolute', inset: '0%', width: '100%', opacity: 0 }}
            />
          ))}
        </div>

        {FEATURE_CARDS.map((card, i) => (
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
            <img src={card.src} alt={card.alt} style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        ))}
      </div>

      {/* ── Mobile view ── */}
      <div className="block lg:hidden bg-black px-6 pb-16 pt-4">
        <div className="flex flex-col gap-5" role="list">
          {mobileFeatures.map((feat, i) => {
            const bgColors = ['#CDE06A', '#ffffff', '#ffffff', '#a78bfa'];
            const textColors = ['#000000', '#000000', '#000000', '#ffffff'];
            const dotColors = ['#ffffff', '#000000', '#000000', '#ffffff'];
            const showDot = i === 0 || i === 3;
            return (
              <div
                key={i}
                role="listitem"
                style={{
                  alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  width: '55%',
                  aspectRatio: '1',
                  backgroundColor: bgColors[i],
                  color: textColors[i],
                  borderRadius: i % 2 === 0 ? '20px 20px 0 20px' : '20px 20px 20px 0',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {showDot && <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: dotColors[i], marginBottom: 8 }} />}
                  <img src={feat.iconSrc} alt="" style={{ width: 36, height: 36 }} aria-hidden="true" />
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, lineHeight: '22px', color: textColors[i], fontFamily: "'Aeonik', sans-serif" }}>
                  {feat.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
