'use client';

import { type RefObject } from 'react';

/**
 * HeroSection — Tiendri Landing (Light / Clone style)
 *
 * Visual structure copied from clone Hero.
 * Content: Tiendri copies (headline, subtitle, CTAs, metrics).
 * Images: light background with gradient overlays.
 *
 * Desktop: full-screen city-layer parallax (3 layers) with Tiendri info pins.
 * Tablet: single background image with fade + heading.
 * Mobile: faded background, large heading, info pins row.
 *
 * Hero backgrounds: 3-layer parallax of diverse commercial storefronts (GPT Image 2).
 */

export interface HeroSectionProps {
  sectionRef?: RefObject<HTMLElement | null>;
}

// Tiendri info pin (replaces hotel price pins)
function TiendriPin({ label, sub }: { label: string; sub: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'white',
        borderRadius: 999,
        padding: '8px 14px 8px 10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        minWidth: 110,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#22C55E',
          flexShrink: 0,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ color: 'black', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: "'Aeonik', sans-serif" }}>
          {label}
        </span>
        <span style={{ color: '#888', fontSize: 11, whiteSpace: 'nowrap', fontFamily: "'Aeonik', sans-serif" }}>
          {sub}
        </span>
      </div>
    </div>
  );
}

// Stat badge — WhatsApp / metrics
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: '10px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'black', fontSize: 18, fontWeight: 700, lineHeight: 1, fontFamily: "'Aeonik', sans-serif" }}>
          {value}
        </span>
        <span style={{ color: '#888', fontSize: 12, marginTop: 2, fontFamily: "'Aeonik', sans-serif" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// Desktop Hero
function HeroDesktop({ sectionRef }: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="hidden lg:block"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#e8f0fe',
      }}
    >
      <video
        src="/hero-sky.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(1.15) saturate(0.5)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.3)',
          zIndex: 1,
        }}
      />

      {/* Heading overlay */}
      <div
        style={{
          zIndex: 20,
          position: 'absolute',
          top: '12vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 22,
            lineHeight: '28px',
            color: '#666',
            fontWeight: 500,
            margin: '0 0 12px 0',
            fontStyle: 'italic',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          listo en 5 minutos
        </p>
        <h1
          style={{
            fontWeight: 900,
            lineHeight: 1.0,
            color: 'black',
            textTransform: 'uppercase',
            fontSize: 'clamp(72px, 10vw, 130px)',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          Tu negocio online
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: '26px',
            color: '#555',
            fontWeight: 500,
            marginTop: 12,
            maxWidth: '50ch',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          Sube tus productos, comparte el link y recibe cada pedido por WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, pointerEvents: 'all' }}>
          <a
            href="/auth?mode=register"
            style={{
              padding: '14px 28px',
              backgroundColor: 'black',
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 12,
              textDecoration: 'none',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Crear mi tienda gratis
          </a>
          <a
            href="#plantillas"
            style={{
              padding: '14px 28px',
              backgroundColor: 'white',
              color: 'black',
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 12,
              textDecoration: 'none',
              border: '1px solid #e0e0e0',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Ver plantillas
          </a>
        </div>
      </div>

      {/* Info pins */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 100,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ position: 'absolute', bottom: '32%', left: '28%', zIndex: 100 }}>
          <TiendriPin label="Nuevo pedido" sub="2 productos · $45.000" />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', right: '28%', zIndex: 100 }}>
          <TiendriPin label="Tienda activa" sub="tiendri.com/dulce-canela" />
        </div>
        <div style={{ position: 'absolute', bottom: '44%', right: '34%', zIndex: 100 }}>
          <StatBadge value="5 min" label="para crear tu tienda" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        style={{
          zIndex: 100,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

// Tablet Hero
function HeroTablet() {
  return (
    <section
      className="hidden md:block lg:hidden"
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#e8f0fe', minHeight: '60vh' }}
    >
      <video
        src="/hero-sky.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(1.15) saturate(0.5)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.3)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, #ffffff)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          paddingTop: '30vh',
          paddingBottom: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30vh 32px 64px',
        }}
      >
          <p style={{ fontSize: 16, letterSpacing: '0.05em', color: '#666', fontWeight: 500, marginBottom: 12, fontStyle: 'italic', fontFamily: "'Aeonik', sans-serif" }}>
            Listo en 5 minutos
          </p>
          <p
            style={{
              textAlign: 'center',
              fontWeight: 900,
              lineHeight: 1,
              color: 'black',
              textTransform: 'uppercase',
              fontSize: 'clamp(48px, 9vw, 90px)',
              marginBottom: 20,
              letterSpacing: '-0.02em',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Tu negocio online
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <TiendriPin label="Nuevo pedido" sub="$45.000" />
            <TiendriPin label="Tienda activa" sub="tiendri.com/tu-negocio" />
          </div>
        </div>
    </section>
  );
}

// Mobile Hero
function HeroMobile() {
  return (
    <section className="block md:hidden relative overflow-hidden" style={{ minHeight: '85vh', backgroundColor: '#e8f0fe' }}>
      <video
        src="/hero-sky.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(1.15) saturate(0.5)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.3)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 20%, rgba(232,240,254,0.7) 60%, #e8f0fe 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 120,
          paddingBottom: 48,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 16,
            letterSpacing: '0.05em',
            color: '#888',
            fontWeight: 500,
            margin: '0 0 14px 0',
            fontStyle: 'italic',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          Listo en 5 minutos
        </p>

        <p
          style={{
            fontWeight: 900,
            lineHeight: 1,
            color: 'black',
            textTransform: 'uppercase',
            fontSize: 'clamp(56px, 16vw, 88px)',
            margin: '0 0 32px 0',
            letterSpacing: '-0.02em',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          TU NEGOCIO<br />ONLINE
        </p>

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 24px',
            marginBottom: 24,
          }}
        >
          <TiendriPin label="Nuevo pedido" sub="$45.000" />
          <TiendriPin label="Tienda activa" sub="tiendri.com" />
        </div>

        <a
          href="/auth?mode=register"
          style={{
            padding: '14px 28px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 12,
            textDecoration: 'none',
            fontFamily: "'Aeonik', sans-serif",
          }}
        >
          Crear mi tienda gratis
        </a>
      </div>

      <div style={{ height: 300 }} aria-hidden="true" />
    </section>
  );
}

export function HeroSection({ sectionRef }: HeroSectionProps) {
  return (
    <>
      <HeroDesktop sectionRef={sectionRef} />
      <HeroTablet />
      <HeroMobile />
    </>
  );
}
