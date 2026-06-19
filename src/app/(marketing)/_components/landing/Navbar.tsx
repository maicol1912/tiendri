'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Plantillas', href: '#plantillas' },
  { label: 'Precios', href: '#precios' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-5 font-sora">
      {/* Logo */}
      <a href="/" className="text-landing-fg text-xl font-semibold tracking-tight lowercase">
        tiendri
      </a>

      {/* Center nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-landing-muted-fg hover:text-landing-fg transition-colors uppercase tracking-widest"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right CTA + mobile menu toggle */}
      <div className="flex items-center gap-4">
        <a
          href="/auth?mode=register"
          className="hidden md:inline-flex items-center bg-nav-button hover:bg-nav-button/80 text-landing-fg px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all active:scale-[0.97]"
        >
          Crear mi tienda
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-landing-fg p-2"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-64 bg-landing-secondary/95 backdrop-blur-xl border border-landing-border rounded-xl p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-landing-muted-fg hover:text-landing-fg transition-colors py-2 px-3 rounded-lg hover:bg-landing-muted"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-landing-border" />
            <a
              href="/auth"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-landing-muted-fg hover:text-landing-fg transition-colors py-2 px-3 rounded-lg hover:bg-landing-muted"
            >
              Ingresar
            </a>
            <a
              href="/auth?mode=register"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-center bg-landing-primary text-landing-primary-fg py-2.5 px-3 rounded-lg font-medium"
            >
              Crear mi tienda
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
