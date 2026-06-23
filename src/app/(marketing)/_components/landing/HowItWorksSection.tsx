'use client';

import { useRef, type RefObject } from 'react';
import { usePhoneScroll } from '../../_hooks/usePhoneScroll';

export interface HowItWorksSectionProps {
  heroRef: RefObject<HTMLElement | null>;
}

const channelLogos = [
  { src: '/images/landing/hotel-logo-1.avif', alt: 'Canal 1' },
  { src: '/images/landing/hotel-logo-2.avif', alt: 'Canal 2' },
  { src: '/images/landing/hotel-logo-3.avif', alt: 'Canal 3' },
  { src: '/images/landing/hotel-logo-5.avif', alt: 'Canal 5' },
  { src: '/images/landing/hotel-logo-4.avif', alt: 'Canal 4' },
  { src: '/images/landing/hotel-logo-9.avif', alt: 'Canal 9' },
  { src: '/images/landing/hotel-logo-6.avif', alt: 'Canal 6' },
  { src: '/images/landing/hotel-logo-10.avif', alt: 'Canal 10' },
  { src: '/images/landing/hotel-logo-7.avif', alt: 'Canal 7' },
];

const marqueeCSS = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .how-icon-container {
    display: flex;
    flex: none;
    gap: 28px;
    animation: marquee-left 60s linear infinite;
  }
  .how-icon-wrapper {
    display: flex;
    flex: none;
    gap: 28px;
    width: 1664px;
  }
  @media (prefers-reduced-motion: reduce) {
    .how-icon-container { animation: none; }
  }
`;

function IconScroller() {
  return (
    <div
      style={{
        backgroundColor: 'hsl(0, 0%, 14%)',
        borderRadius: 24,
        overflow: 'hidden',
        width: '100%',
      }}
      aria-hidden="true"
    >
      <style>{marqueeCSS}</style>
      <div className="how-icon-container">
        <div className="how-icon-wrapper">
          {channelLogos.map((logo, i) => (
            <div key={`a-${i}`} style={{ flexShrink: 0, width: 160, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
        <div className="how-icon-wrapper">
          {channelLogos.map((logo, i) => (
            <div key={`b-${i}`} style={{ flexShrink: 0, width: 160, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection({ heroRef }: HowItWorksSectionProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const mobilePhoneRef = useRef<HTMLDivElement>(null);

  usePhoneScroll(phoneRef, heroRef);
  usePhoneScroll(mobilePhoneRef, heroRef, true);

  return (
    <section
      id="como-funciona"
      style={{ backgroundColor: 'var(--ember-bg-elevated)', position: 'relative', zIndex: 100, overflow: 'visible' }}
      aria-labelledby="how-heading"
    >
      <div
        className="px-5 lg:px-10 pt-16 pb-16 lg:pt-[140px] lg:pb-[140px]"
        style={{
          maxWidth: 1280,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 48,
          position: 'relative',
        }}
      >

        {/* Section heading */}
        <div style={{ zIndex: 10, width: 'min(50ch, 100%)', textAlign: 'center', position: 'relative' }}>
          <div className="hidden lg:block">
            <h2
              id="how-heading"
              style={{ fontSize: 64, fontWeight: 700, lineHeight: '72px', color: 'hsl(0, 0%, 96%)', margin: 0, whiteSpace: 'nowrap', fontFamily: "'Sora', sans-serif" }}
            >
              Tres pasos y ya<br />estás vendiendo
            </h2>
          </div>
          <div className="block lg:hidden">
            <h2
              aria-hidden="true"
              style={{ fontSize: 32, fontWeight: 700, lineHeight: '38px', color: 'hsl(0, 0%, 96%)', margin: 0, fontFamily: "'Sora', sans-serif" }}
            >
              Tres pasos y ya estás vendiendo
            </h2>
          </div>
        </div>

        {/* ── DESKTOP layout: left text | center phone | right text ── */}
        <div
          className="hidden lg:flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'stretch',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            minHeight: 600,
          }}
        >

          {/* Left column — borderRight frames the content block on desktop */}
          <div className="flex flex-col" style={{ paddingRight: 20, position: 'relative', borderRight: '1px solid hsl(0, 0%, 20%)', justifyContent: 'center', alignSelf: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30ch', gap: 20, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: 'hsl(0, 0%, 96%)', fontFamily: "'Sora', sans-serif" }}>
                  Sube tus productos y elige una plantilla
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', color: 'hsl(0, 0%, 60%)', fontFamily: "'Sora', sans-serif" }}>
                  Tu tienda queda activa desde el primer día en tu propia URL.
                </div>
              </div>
            </div>
          </div>

          {/* Center phone — entry animation wrapper + scroll-controlled inner */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <div className="animate-phone-reveal">
              <div
                ref={phoneRef}
                style={{
                  height: 756,
                  position: 'relative',
                  willChange: 'transform',
                  transform: 'translate3d(0px, -80%, 0px)',
                  width: 368,
                }}
                aria-label="Tiendri app en celular"
              >
                <img
                  src="/images/landing/phone-scroll-content.png"
                  alt="Tienda Moda Élite"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col" style={{ paddingLeft: 20, position: 'relative', borderLeft: '1px solid hsl(0, 0%, 20%)' }}>
            {/* QR image */}
            <div style={{ paddingLeft: 30, marginBottom: 16, marginTop: -90 }}>
              <img src="/images/qr-tiendri.png" alt="QR code de tu tienda Tiendri" style={{ width: 280, borderRadius: 12 }} />
            </div>

            {/* Separator line */}
            <div
              style={{
                backgroundImage: 'linear-gradient(to right, transparent, hsl(0, 0%, 20%) 50%, transparent)',
                height: 2,
                width: '22ch',
                marginLeft: 30,
                marginTop: -100,
                marginBottom: 12,
              }}
            />

            {/* Text and stat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '22ch', gap: 8, paddingLeft: 30 }}>
              <div style={{ width: '20ch' }}>
                <div style={{ fontSize: 20, fontWeight: 400, lineHeight: '24px', color: 'hsl(0, 0%, 96%)', fontFamily: "'Sora', sans-serif" }}>
                  Comparte el link y recibe pedidos organizados
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 60 }}>
                <span style={{ color: 'hsl(0, 0%, 60%)', fontSize: 20, lineHeight: '20px', paddingLeft: 24, marginBottom: 12, fontFamily: "'Sora', sans-serif" }}>con</span>
                <span style={{ fontSize: 100, fontWeight: 700, lineHeight: '70px', color: 'hsl(0, 0%, 96%)', fontFamily: "'Sora', sans-serif" }}>0%</span>
                <span style={{ color: 'hsl(0, 0%, 60%)', fontSize: 20, lineHeight: '20px', marginLeft: 'auto', marginTop: 12, fontFamily: "'Sora', sans-serif" }}>de comisión</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex lg:hidden flex-col items-center w-full" style={{ gap: 40 }}>

          {/* Animated mobile phone — overflow: visible lets the phone extend up into the hero */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 10, overflow: 'visible' }}>
            <div className="animate-phone-reveal" style={{ overflow: 'visible' }}>
              <div
                ref={mobilePhoneRef}
                style={{
                  width: 231,
                  height: 504,
                  position: 'relative',
                  willChange: 'transform',
                  transform: 'translate3d(0px, -100%, 0px)',
                  zIndex: 10,
                }}
                aria-label="Tiendri app en celular"
              >
                <img
                  src="/images/landing/phone-scroll-content.png"
                  alt="Tienda Moda Élite"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Steps text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: 'hsl(0, 0%, 96%)', fontFamily: "'Sora', sans-serif" }}>
                Sube tus productos y elige una plantilla
              </div>
              <div style={{ fontSize: 15, fontWeight: 400, lineHeight: '20px', color: 'hsl(0, 0%, 60%)', fontFamily: "'Sora', sans-serif" }}>
                Tu tienda queda activa desde el primer día en tu propia URL.
              </div>
            </div>

            <div style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0, 0%, 20%) 50%, transparent)', height: 2, width: '80%' }} />

            <div style={{ fontSize: 18, fontWeight: 400, lineHeight: '24px', color: 'hsl(0, 0%, 96%)', textAlign: 'center', fontFamily: "'Sora', sans-serif" }}>
              Comparte el link y recibe pedidos con todo el detalle
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <span style={{ color: 'hsl(0, 0%, 60%)', fontSize: 16, lineHeight: '20px', fontFamily: "'Sora', sans-serif" }}>con</span>
              <span style={{ fontSize: 72, fontWeight: 700, lineHeight: '56px', color: 'hsl(0, 0%, 96%)', fontFamily: "'Sora', sans-serif" }}>0%</span>
              <span style={{ color: 'hsl(0, 0%, 60%)', fontSize: 16, lineHeight: '20px', fontFamily: "'Sora', sans-serif" }}>de comisión</span>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
