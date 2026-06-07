'use client';

import { useRef, useState, useEffect } from 'react';
import { useNavbarScroll } from '../../_hooks/useScrollAnimation';

/**
 * Navbar — Tiendri Landing (Light / Clone style)
 *
 * Light pill fixed at top:16px, 95% width, centered.
 * Auto-hide on scroll down / show on scroll up (via useNavbarScroll).
 * Copied structure from clone Navbar, replaced with Tiendri brand + links.
 */

const NavArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M15.0004 6.03551H0.999643" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.1211 1.08594L15.0008 6.03498L10.1211 10.9854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Plantillas', href: '#plantillas' },
  { label: 'Precios', href: '#precios' },
  { label: 'Ingresar', href: '/auth' },
];

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navPillRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar stays fixed — no auto-hide on scroll

  // Transparent background when scrolled, solid when at top
  useEffect(() => {
    const SCROLL_THRESHOLD = 50;

    function onScroll() {
      const pill = navPillRef.current;
      if (!pill) return;
      if (window.scrollY > SCROLL_THRESHOLD) {
        pill.style.backgroundColor = 'transparent';
      } else {
        pill.style.backgroundColor = '#f2f3f3';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Outer wrapper: fixed positioning + width — the nav bar + floating panel live here
    // navRef goes here so useNavbarScroll translateY moves the whole unit (bar + panel together)
    <div
      ref={navRef}
      style={{
        position: 'absolute',
        top: 16,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '95%',
        margin: '0 auto',
      }}
    >
      {/* Nav bar pill */}
      <nav
        ref={navPillRef}
        role="banner"
        aria-label="Navegación principal"
        style={{
          backgroundColor: '#f2f3f3',
          border: '1px solid #dadbdb',
          borderRadius: 12,
          padding: '8px 8px 8px 20px',
          transition: 'background-color 0.3s ease, transform 0.4s ease-out',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Logo */}
        <a href="/" aria-label="Tiendri — inicio" style={{ flexShrink: 0, textDecoration: 'none', fontSize: 22, fontWeight: 900, color: '#000', letterSpacing: '-0.02em', fontFamily: "'Aeonik', sans-serif" }}>
          tiendri
        </a>

        {/* Right: primary CTA + menu/close button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Crear tienda — hidden on mobile */}
          <a
            href="/auth?mode=register"
            className="hidden sm:inline-flex"
            style={{
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: 'black',
              color: 'white',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 12,
              textDecoration: 'none',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Crear mi tienda
          </a>

          {/* Menu / Cerrar button — toggles in place */}
          {menuOpen ? (
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              aria-expanded={true}
              aria-controls="nav-menu-open"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                border: 'none',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                color: 'white',
                backgroundColor: '#7c3aed',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'Aeonik', sans-serif",
              }}
            >
              <span>Cerrar</span>
              <span style={{ fontSize: 15, lineHeight: 1 }}>✕</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={false}
              aria-controls="nav-menu-open"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                border: '1px solid #dadbdb',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                color: 'black',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: "'Aeonik', sans-serif",
              }}
            >
              <span>Menú</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 16 }}>
                <div style={{ height: 1, backgroundColor: 'black', width: '100%' }} />
                <div style={{ height: 1, backgroundColor: 'black', width: '100%' }} />
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Floating dropdown panel — compact, right-aligned */}
      {menuOpen && (
        <div
          id="nav-menu-open"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 280,
            backgroundColor: 'white',
            border: '1px solid #e4e4e7',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Nav links */}
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '13px 12px',
                fontSize: 15,
                fontWeight: 600,
                color: 'black',
                textDecoration: 'none',
                borderBottom: i < navLinks.length - 1 ? '1px solid #f0f0f0' : 'none',
                borderRadius: 8,
                fontFamily: "'Aeonik', sans-serif",
              }}
            >
              <span>{link.label}</span>
              <NavArrowIcon />
            </a>
          ))}

          {/* Social icons row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 4,
              padding: '10px 12px 4px',
              borderTop: '1px solid #f0f0f0',
              color: '#888',
            }}
          >
            <a
              href="https://linkedin.com/company/tiendri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#888', textDecoration: 'none', display: 'flex' }}
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://instagram.com/tiendri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#888', textDecoration: 'none', display: 'flex' }}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com/tiendri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: '#888', textDecoration: 'none', display: 'flex' }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{ color: '#888', textDecoration: 'none', display: 'flex' }}
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
