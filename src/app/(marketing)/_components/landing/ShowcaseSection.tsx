'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { lerp } from '../../_lib/animations';

/**
 * ShowcaseSection — Tiendri Landing
 *
 * Visual structure: exact clone of the Discover section (black bg, 3 phone
 * mockups converge on scroll-pin).
 * Content: "Cada tienda se ve distinta" — 3 Tiendri store previews.
 *
 * Desktop: scroll-driven lerp animation, phones rise from below and converge.
 * Mobile/tablet: static vertical stack of 3 phone cards.
 *
 * id="plantillas" for nav anchor.
 */

const PHONES = [
  {
    src: '/images/landing/discover-phone-1.png',
    alt: 'Dulce Canela — tienda de tortas',
    label: 'Personalizable',
    desc: 'Colores, fuentes y logo de tu negocio. En minutos.',
  },
  {
    src: '/images/landing/discover-phone-2.png',
    alt: 'Ferretería Don Carlos — materiales',
    label: 'Sin comisiones',
    desc: 'Lo que vendás queda en tu bolsillo. Sin letra chica.',
  },
  {
    src: '/images/landing/discover-phone-3.png',
    alt: 'Modas Luna — ropa y accesorios',
    label: 'Listo en 5 min',
    desc: 'Subí tus productos y compartí el link al instante.',
  },
];

// ── Mobile/Tablet: swipeable carousel with arrows ────────────────────────────

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.05)',
        color: 'hsl(0, 0%, 96%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        {direction === 'left'
          ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          : <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        }
      </svg>
    </button>
  );
}

function ShowcaseStatic() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((index: number) => {
    const clamped = ((index % PHONES.length) + PHONES.length) % PHONES.length;
    setCurrent(clamped);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (trackRef.current) {
      const containerWidth = trackRef.current.parentElement?.offsetWidth || window.innerWidth;
      const base = -(current * 100);
      const pxToPercent = (touchDeltaX.current / containerWidth) * 100;
      trackRef.current.style.transform = `translateX(${base + pxToPercent}%)`;
    }
  }, [current]);

  const onTouchEnd = useCallback(() => {
    if (trackRef.current) trackRef.current.style.transition = 'transform 0.35s ease-out';
    if (Math.abs(touchDeltaX.current) > 50) {
      goTo(touchDeltaX.current < 0 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  }, [current, goTo]);

  return (
    <section
      id="plantillas"
      className="block lg:hidden"
      style={{ backgroundColor: '#16141B', overflow: 'hidden' }}
    >
      <div style={{ padding: '60px 5% 40px' }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'hsl(0, 0%, 60%)', fontFamily: "'Sora', sans-serif", marginBottom: 8 }}>
            Plantillas
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: '32px',
              color: 'hsl(0, 0%, 96%)',
              margin: 0,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Cada tienda se ve distinta
          </h2>
        </div>

        {/* carousel with arrows on sides */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowButton direction="left" onClick={() => goTo(current - 1)} />

          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div
              ref={trackRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                display: 'flex',
                transform: `translateX(-${current * 100}%)`,
                transition: 'transform 0.35s ease-out',
              }}
            >
              {PHONES.map((phone, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 8px',
                  }}
                >
                  <img
                    src={phone.src}
                    alt={phone.alt}
                    style={{ width: '100%', maxWidth: 200, display: 'block', borderRadius: 20 }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      paddingTop: 16,
                      rowGap: 6,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: '24px',
                        color: 'hsl(0, 0%, 96%)',
                        margin: 0,
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      {phone.label}
                    </h3>
                    <div style={{ fontSize: 13, fontWeight: 400, lineHeight: '18px', color: 'hsl(0, 0%, 60%)', fontFamily: "'Sora', sans-serif" }}>
                      {phone.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ArrowButton direction="right" onClick={() => goTo(current + 1)} />
        </div>

        {/* dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {PHONES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
              style={{
                width: current === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: current === i ? 'hsl(0, 0%, 96%)' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Desktop: scroll-driven 3 phones converge ──────────────────────────────────

function ShowcaseDesktop() {
  const discoverHeightRef = useRef<HTMLDivElement>(null);
  const discoverContainerRef = useRef<HTMLDivElement>(null);
  const discoverHeaderRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // lg breakpoint mirrors Tailwind's 1024px
    const LG_BREAKPOINT = 1024;

    let rafId: number;
    let ticking = false;
    let scrollCleanup: (() => void) | null = null;

    function resetTransforms() {
      const discoverContainer = discoverContainerRef.current;
      const discoverHeader = discoverHeaderRef.current;
      const phoneLeft = phoneLeftRef.current;
      const phoneCenter = phoneCenterRef.current;
      const phoneRight = phoneRightRef.current;

      if (discoverContainer) discoverContainer.style.transform = 'translateY(30%)';
      if (discoverHeader) {
        discoverHeader.style.opacity = '0';
        discoverHeader.style.transform = 'scale3d(1.7,1.7,1) translateY(10vh)';
      }
      if (phoneLeft) {
        phoneLeft.style.transform = 'translate3d(-70%, 40vh, 0px)';
        phoneLeft.style.height = '85%';
      }
      if (phoneCenter) {
        phoneCenter.style.transform = 'translate3d(0px, 40vh, 0px)';
        phoneCenter.style.height = '115%';
      }
      if (phoneRight) {
        phoneRight.style.transform = 'translate3d(70%, 40vh, 0px)';
        phoneRight.style.height = '85%';
      }
    }

    function setupScrollListener() {
      if (scrollCleanup) {
        scrollCleanup();
        scrollCleanup = null;
      }

      // Only attach scroll animation on desktop viewports
      if (window.innerWidth < LG_BREAKPOINT) {
        resetTransforms();
        return;
      }

      function updateAnimation() {
        const discoverHeight = discoverHeightRef.current;
        const discoverContainer = discoverContainerRef.current;
        const discoverHeader = discoverHeaderRef.current;
        const phoneLeft = phoneLeftRef.current;
        const phoneCenter = phoneCenterRef.current;
        const phoneRight = phoneRightRef.current;

        if (!discoverHeight) return;

        const rect = discoverHeight.getBoundingClientRect();
        const totalScroll = discoverHeight.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

        if (discoverContainer) {
          const containerY = lerp(30, 0, progress * 3);
          discoverContainer.style.transform = 'translateY(' + containerY + '%)';
        }

        if (discoverHeader) {
          let headerOpacity: number;
          let headerScale: number;
          let headerY: number;

          if (progress < 0.25) {
            const t = progress / 0.25;
            headerOpacity = t;
            headerScale = lerp(1.7, 1.1, t);
            headerY = lerp(24, 12, t);
          } else if (progress < 0.65) {
            headerOpacity = 1;
            headerScale = 1.1;
            headerY = 12;
          } else {
            const t2 = (progress - 0.65) / 0.35;
            headerOpacity = lerp(1, 0, t2);
            headerScale = lerp(1.1, 1, t2);
            headerY = lerp(12, 5, t2);
          }

          discoverHeader.style.opacity = String(headerOpacity);
          discoverHeader.style.transform = 'scale(' + headerScale + ') translateY(' + headerY + 'vh)';
        }

        if (phoneLeft && phoneCenter && phoneRight) {
          const phoneX = lerp(70, 110, progress);
          const phoneY = lerp(40, -10, progress);
          const sideHeight = lerp(85, 70, progress);
          const centerHeight = lerp(115, 70, progress);

          phoneLeft.style.transform = 'translate3d(-' + phoneX + '%, ' + phoneY + 'vh, 0)';
          phoneLeft.style.height = sideHeight + '%';
          phoneCenter.style.transform = 'translate3d(0, ' + phoneY + 'vh, 0)';
          phoneCenter.style.height = centerHeight + '%';
          phoneRight.style.transform = 'translate3d(' + phoneX + '%, ' + phoneY + 'vh, 0)';
          phoneRight.style.height = sideHeight + '%';
        }
      }

      function onScroll() {
        if (!ticking) {
          rafId = requestAnimationFrame(function () {
            updateAnimation();
            ticking = false;
          });
          ticking = true;
        }
      }

      updateAnimation();
      window.addEventListener('scroll', onScroll, { passive: true });
      scrollCleanup = () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
      };
    }

    // Initial setup
    setupScrollListener();

    // Re-setup on resize so transforms reset when breakpoint crosses lg
    function onResize() {
      setupScrollListener();
    }
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (scrollCleanup) scrollCleanup();
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="plantillas"
      className="hidden lg:block"
      style={{
        willChange: 'background',
        backgroundColor: '#16141B',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* discover-subhead — z-index:10, height:200vh, position:relative */}
      <div style={{ zIndex: 10, height: '200vh', position: 'relative' }}>
        {/* discover-height — height:300vh, position:relative, top:-100vh */}
        <div
          ref={discoverHeightRef}
          style={{ height: '300vh', position: 'relative', top: '-100vh' }}
        >
          {/* discover-sticky — height:100vh, sticky, overflow:hidden */}
          <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' }}>
            {/* discover-scroll-container — translateY(30%) initial */}
            <div
              ref={discoverContainerRef}
              style={{
                width: '100vw',
                height: '100%',
                willChange: 'transform',
                transform: 'translateY(30%)',
              }}
            >
              {/* discovery-content */}
              <div style={{ width: '100%', height: '100vh', position: 'relative' }}>

                {/* discover-header-block — fades + scales in on scroll */}
                <div
                  ref={discoverHeaderRef}
                  style={{
                    textAlign: 'center',
                    fontSize: 65,
                    lineHeight: '65px',
                    willChange: 'opacity, transform',
                    opacity: 0,
                    transform: 'scale3d(1.7,1.7,1) translateY(10vh)',
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 400, lineHeight: '24px', color: 'hsl(0, 0%, 60%)', fontFamily: "'Sora', sans-serif" }}>
                    Plantillas
                  </div>
                  <div>
                    <div>
                      <h2
                        style={{
                          paddingBottom: 7,
                          fontSize: 50,
                          fontWeight: 700,
                          lineHeight: '50px',
                          color: 'hsl(0, 0%, 96%)',
                          margin: 0,
                          fontFamily: "'Sora', sans-serif",
                        }}
                      >
                        Cada tienda se ve distinta
                      </h2>
                    </div>
                  </div>
                </div>

                {/* mobiles-block — flex row, phones positioned inside */}
                <div
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}
                >
                  {/* Left phone */}
                  <div
                    ref={phoneLeftRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(-70%, 40vh, 0px)',
                      height: '85%',
                      width: 387,
                      maxHeight: 1440,
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  >
                    <img
                      src={PHONES[0].src}
                      alt={PHONES[0].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* down-position-block */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 0,
                        overflow: 'visible',
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 280,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'hsl(0, 0%, 96%)',
                            margin: 0,
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[0].label}
                        </p>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'hsl(0, 0%, 60%)',
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[0].desc}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center phone */}
                  <div
                    ref={phoneCenterRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(0px, 40vh, 0px)',
                      height: '115%',
                      width: 524,
                      maxHeight: 1440,
                      position: 'relative',
                      zIndex: 20,
                    }}
                  >
                    <img
                      src={PHONES[1].src}
                      alt={PHONES[1].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* down-position-block */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 0,
                        overflow: 'visible',
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 280,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'hsl(0, 0%, 96%)',
                            margin: 0,
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[1].label}
                        </p>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'hsl(0, 0%, 60%)',
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[1].desc}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right phone */}
                  <div
                    ref={phoneRightRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(70%, 40vh, 0px)',
                      height: '85%',
                      width: 387,
                      maxHeight: 1440,
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  >
                    <img
                      src={PHONES[2].src}
                      alt={PHONES[2].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* down-position-block */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 0,
                        overflow: 'visible',
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 280,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'hsl(0, 0%, 96%)',
                            margin: 0,
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[2].label}
                        </p>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'hsl(0, 0%, 60%)',
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {PHONES[2].desc}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShowcaseSection() {
  return (
    <>
      <ShowcaseDesktop />
      <ShowcaseStatic />
    </>
  );
}
