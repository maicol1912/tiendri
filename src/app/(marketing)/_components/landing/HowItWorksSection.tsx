'use client';

import { useRef, type RefObject } from 'react';
import { usePhoneScroll } from '../../_hooks/usePhoneScroll';

/**
 * HowItWorksSection — Tiendri Landing (Light / Clone style)
 *
 * Visual structure: clone Deals (phone drop animation + side text + marquee).
 * Content: Tiendri's "Cómo funciona" — 3 pasos, métricas, canales.
 *
 * Phone animation: drops from -140% above hero, settles at 0% as user scrolls.
 * Marquee: partner/channel logos (WhatsApp, Instagram, etc.) + placeholder brand slots.
 */

export interface HowItWorksSectionProps {
  heroRef: RefObject<HTMLElement | null>;
}

const channelLogos = [
  { src: '/clone-assets/hotel-logo-1.avif', alt: 'Canal 1' },
  { src: '/clone-assets/hotel-logo-2.avif', alt: 'Canal 2' },
  { src: '/clone-assets/hotel-logo-3.avif', alt: 'Canal 3' },
  { src: '/clone-assets/hotel-logo-5.avif', alt: 'Canal 5' },
  { src: '/clone-assets/hotel-logo-4.avif', alt: 'Canal 4' },
  { src: '/clone-assets/hotel-logo-9.avif', alt: 'Canal 9' },
  { src: '/clone-assets/hotel-logo-6.avif', alt: 'Canal 6' },
  { src: '/clone-assets/hotel-logo-10.avif', alt: 'Canal 10' },
  { src: '/clone-assets/hotel-logo-7.avif', alt: 'Canal 7' },
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
        backgroundColor: '#f5f5f5',
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
      style={{ backgroundColor: '#f8f9f9', position: 'relative', zIndex: 100 }}
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
              style={{ fontSize: 64, fontWeight: 700, lineHeight: '72px', color: '#000', margin: 0, whiteSpace: 'nowrap', fontFamily: "'Aeonik', sans-serif" }}
            >
              Tres pasos y ya<br />estás vendiendo
            </h2>
          </div>
          <div className="block lg:hidden">
            <h2
              aria-hidden="true"
              style={{ fontSize: 32, fontWeight: 700, lineHeight: '38px', color: '#000', margin: 0, fontFamily: "'Aeonik', sans-serif" }}
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
            alignItems: 'flex-start',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            minHeight: 600,
          }}
        >

          {/* Left column — borderRight frames the content block on desktop */}
          <div className="flex flex-col" style={{ paddingRight: 20, position: 'relative', borderRight: '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '30ch', gap: 20 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#000', fontFamily: "'Aeonik', sans-serif" }}>
                  Sube tus productos y elige una plantilla
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', color: '#999', fontFamily: "'Aeonik', sans-serif" }}>
                  Tu tienda queda activa desde el primer día en tu propia URL.
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundImage: 'linear-gradient(to right, #0000, #0000001f 50%, #0000)',
                height: 2,
                width: '30ch',
                marginTop: 62,
                marginBottom: 48,
              }}
            />

            {/* Step images */}
            <div style={{ width: '30ch', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <img src="/clone-assets/pin-frame-1.avif" alt="" style={{ width: '100%', borderRadius: 12 }} />
            </div>

          </div>

          {/* Center phone — animated drop */}
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
            <div
              ref={phoneRef}
              style={{
                height: 720,
                position: 'relative',
                willChange: 'transform',
                transform: 'translate3d(0px, -80%, 0px)',
                width: 350,
              }}
              aria-label="Tiendri app en celular"
            >
              {/* Phone screen content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  margin: '4%',
                  zIndex: 10,
                  overflow: 'hidden',
                  clipPath: 'polygon(90% 0, 96% 2%, 100% 5%, 100% 94%, 97% 98%, 90% 100%, 13% 100%, 3% 99%, 0 95%, 0 5%, 4% 2%, 11% 0)',
                  backgroundColor: '#f7f7f8',
                }}
              >
                {/* TODO: imagen — captura de pantalla de la app Tiendri mostrando catálogo de productos */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f4e8 50%, #fff3e0 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 12,
                    gap: 8,
                  }}
                >
                  <div style={{ backgroundColor: 'white', borderRadius: 8, padding: '8px 10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#000', marginBottom: 2, fontFamily: "'Aeonik', sans-serif" }}>🛍️ Dulce Canela</div>
                    <div style={{ fontSize: 9, color: '#888', fontFamily: "'Aeonik', sans-serif" }}>Tortas y postres</div>
                  </div>
                  {['Torta Red Velvet · $75.000', 'Cupcakes ×12 · $48.000', 'Cheesecake · $65.000'].map((item, i) => (
                    <div key={i} style={{ backgroundColor: 'white', borderRadius: 6, padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <span style={{ fontSize: 9, color: '#333', fontFamily: "'Aeonik', sans-serif" }}>{item}</span>
                      <span style={{ fontSize: 9, backgroundColor: '#000', color: 'white', borderRadius: 3, padding: '2px 5px', fontFamily: "'Aeonik', sans-serif" }}>Pedir</span>
                    </div>
                  ))}
                  <div style={{ backgroundColor: '#25D366', borderRadius: 6, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 9, color: 'white', fontWeight: 600, fontFamily: "'Aeonik', sans-serif" }}>📲 Pedido por WhatsApp</span>
                  </div>
                  <div style={{ fontSize: 8, color: '#aaa', textAlign: 'center', marginTop: 4, fontFamily: "'Aeonik', sans-serif" }}>tiendri.com/dulce-canela</div>
                </div>
              </div>

              {/* Phone frame */}
              <img
                src="/clone-assets/mobile-frame.avif"
                alt=""
                aria-hidden="true"
                style={{ position: 'relative', zIndex: 100, width: '100%', height: '100%', objectFit: 'contain' }}
                loading="eager"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col" style={{ paddingLeft: 20, position: 'relative', borderLeft: '1px solid #e4e4e7' }}>
            {/* QR image */}
            <div style={{ paddingLeft: 30, marginBottom: 16, marginTop: -90 }}>
              <img src="/images/qr-tiendri.png" alt="QR code de tu tienda Tiendri" style={{ width: 280, borderRadius: 12 }} />
            </div>

            {/* Separator line */}
            <div
              style={{
                backgroundImage: 'linear-gradient(to right, #0000, #0000001f 50%, #0000)',
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
                <div style={{ fontSize: 20, fontWeight: 400, lineHeight: '24px', color: '#000', fontFamily: "'Aeonik', sans-serif" }}>
                  Comparte el link y recibe pedidos organizados
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 60 }}>
                <span style={{ color: 'gray', fontSize: 20, lineHeight: '20px', paddingLeft: 24, marginBottom: 12, fontFamily: "'Aeonik', sans-serif" }}>con</span>
                <span style={{ fontSize: 100, fontWeight: 700, lineHeight: '70px', color: '#000', fontFamily: "'Aeonik', sans-serif" }}>0%</span>
                <span style={{ color: 'gray', fontSize: 20, lineHeight: '20px', marginLeft: 'auto', marginTop: 12, fontFamily: "'Aeonik', sans-serif" }}>de comisión</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex lg:hidden flex-col items-center w-full" style={{ gap: 40 }}>

          {/* Animated mobile phone */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
            <div
              ref={mobilePhoneRef}
              style={{
                width: 220,
                height: 480,
                position: 'relative',
                willChange: 'transform',
                transform: 'translate3d(0px, -110%, 0px)',
                zIndex: 10,
              }}
              aria-label="Tiendri app en celular"
            >
              {/* Phone screen content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  margin: '4%',
                  zIndex: 10,
                  overflow: 'hidden',
                  clipPath: 'polygon(90% 0, 96% 2%, 100% 5%, 100% 94%, 97% 98%, 90% 100%, 13% 100%, 3% 99%, 0 95%, 0 5%, 4% 2%, 11% 0)',
                  backgroundColor: '#f7f7f8',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f4e8 50%, #fff3e0 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 12,
                    gap: 6,
                  }}
                >
                  <div style={{ backgroundColor: 'white', borderRadius: 8, padding: '8px 10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#000', marginBottom: 2, fontFamily: "'Aeonik', sans-serif" }}>🛍️ Dulce Canela</div>
                    <div style={{ fontSize: 9, color: '#888', fontFamily: "'Aeonik', sans-serif" }}>Tortas y postres</div>
                  </div>
                  {['Torta Red Velvet · $75.000', 'Cupcakes ×12 · $48.000', 'Cheesecake · $65.000'].map((item, i) => (
                    <div key={i} style={{ backgroundColor: 'white', borderRadius: 6, padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <span style={{ fontSize: 9, color: '#333', fontFamily: "'Aeonik', sans-serif" }}>{item}</span>
                      <span style={{ fontSize: 9, backgroundColor: '#000', color: 'white', borderRadius: 3, padding: '2px 5px', fontFamily: "'Aeonik', sans-serif" }}>Pedir</span>
                    </div>
                  ))}
                  <div style={{ backgroundColor: '#25D366', borderRadius: 6, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 9, color: 'white', fontWeight: 600, fontFamily: "'Aeonik', sans-serif" }}>📲 Pedido por WhatsApp</span>
                  </div>
                  <div style={{ fontSize: 8, color: '#aaa', textAlign: 'center', marginTop: 2, fontFamily: "'Aeonik', sans-serif" }}>tiendri.com/dulce-canela</div>
                </div>
              </div>

              {/* Phone frame */}
              <img
                src="/clone-assets/mobile-frame.avif"
                alt=""
                aria-hidden="true"
                style={{ position: 'relative', zIndex: 100, width: '100%', height: '100%', objectFit: 'contain' }}
                loading="eager"
              />
            </div>
          </div>

          {/* Steps text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#000', fontFamily: "'Aeonik', sans-serif" }}>
                Sube tus productos y elige una plantilla
              </div>
              <div style={{ fontSize: 15, fontWeight: 400, lineHeight: '20px', color: '#999', fontFamily: "'Aeonik', sans-serif" }}>
                Tu tienda queda activa desde el primer día.
              </div>
            </div>

            <div style={{ backgroundImage: 'linear-gradient(to right, #0000, #0000001f 50%, #0000)', height: 2, width: '80%' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '85%', maxWidth: 320 }}>
              <img src="/clone-assets/pin-frame-1.avif" alt="" style={{ width: '100%', borderRadius: 12 }} />
            </div>

            <div style={{ backgroundImage: 'linear-gradient(to right, #0000, #0000001f 50%, #0000)', height: 2, width: '80%' }} />

            <div style={{ fontSize: 18, fontWeight: 400, lineHeight: '24px', color: '#000', textAlign: 'center', fontFamily: "'Aeonik', sans-serif" }}>
              Comparte el link y recibe pedidos con todo el detalle
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <span style={{ color: 'gray', fontSize: 16, lineHeight: '20px', fontFamily: "'Aeonik', sans-serif" }}>con</span>
              <span style={{ fontSize: 72, fontWeight: 700, lineHeight: '56px', color: '#000', fontFamily: "'Aeonik', sans-serif" }}>0%</span>
              <span style={{ color: 'gray', fontSize: 16, lineHeight: '20px', fontFamily: "'Aeonik', sans-serif" }}>de comisión</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '85%', maxWidth: 320 }}>
              <img src="/clone-assets/pin-frame-1.avif" alt="" style={{ width: '100%', borderRadius: 12 }} />
            </div>

            <div style={{ backgroundImage: 'linear-gradient(to right, #0000, #0000001f 50%, #0000)', height: 2, width: '80%' }} />
          </div>
        </div>


      </div>
    </section>
  );
}
