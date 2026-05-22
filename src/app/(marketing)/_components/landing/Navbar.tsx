'use client'

/**
 * Navbar — Tiendri Landing (Ember Core)
 *
 * Dark, fixed navbar. Transparent at top — glass effect kicks in on scroll.
 * Logo left (wordmark only, no icon). Nav links center. CTAs right.
 *
 * Glass on scroll adds:
 *   background: rgba(16, 15, 20, 0.90)
 *   backdrop-filter: blur(20px)
 *   border-bottom: 1px solid rgba(255,255,255,0.06)
 *
 * The red dot after "tiendri" is intentional brand detail — not decoration.
 * It anchors the wordmark and signals precision/technology.
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  className?: string
}

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#plantillas', label: 'Plantillas' },
  { href: '#precios', label: 'Precios' },
]

export function Navbar({ className = '' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'ember-navbar-scrolled' : ''} ${className}`}
      style={{
        backgroundColor: scrolled ? undefined : 'transparent',
        transition: 'background-color 300ms ease, backdrop-filter 300ms ease',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="Tiendri — inicio"
          >
            <img
              src="/images/logo-dark.png"
              alt="Tiendri"
              className="h-20 sm:h-28 w-auto -my-4 sm:-my-8"
              style={{ mixBlendMode: 'lighten' }}
            />
          </a>

          {/* Center nav links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-180 hover:text-white"
                  style={{
                    fontFamily: 'var(--ember-font-body)',
                    color: 'var(--ember-text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--ember-text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--ember-text-secondary)'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="flex items-center gap-4">
            {/* Ingresar — ghost */}
            <a
              href="/auth"
              className="hidden sm:inline-flex items-center text-sm font-medium transition-colors duration-180"
              style={{
                fontFamily: 'var(--ember-font-body)',
                color: 'var(--ember-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ember-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ember-text-secondary)'
              }}
            >
              Ingresar
            </a>

            {/* Primary CTA */}
            <a
              href="/auth?mode=register"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300"
              style={{
                fontFamily: 'var(--ember-font-body)',
                backgroundColor: 'var(--ember-red-600)',
                borderRadius: 'var(--ember-radius-button)',
                boxShadow: '0 0 16px rgba(185, 28, 28, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ember-red-500)'
                e.currentTarget.style.boxShadow = 'var(--ember-glow-cta)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ember-red-600)'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(185, 28, 28, 0.3)'
              }}
            >
              Crear mi tienda gratis
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className="block w-5 h-0.5 transition-transform duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--ember-text-primary)',
                  transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 transition-opacity duration-300"
                style={{
                  backgroundColor: 'var(--ember-text-primary)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-3.5 h-0.5 transition-transform duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--ember-text-secondary)',
                  transform: menuOpen ? 'translateX(3px) translateY(-8px) rotate(-45deg)' : 'none',
                  width: menuOpen ? '20px' : '14px',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — AnimatePresence slide-down */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: 'rgba(16, 15, 20, 0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium py-3"
                  style={{
                    fontFamily: 'var(--ember-font-body)',
                    color: 'var(--ember-text-primary)',
                  }}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <div
                className="pt-3 flex flex-col gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <a
                  href="/auth"
                  className="text-sm font-medium"
                  style={{
                    fontFamily: 'var(--ember-font-body)',
                    color: 'var(--ember-text-secondary)',
                  }}
                  onClick={closeMenu}
                >
                  Ingresar
                </a>
                <a
                  href="/auth?mode=register"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    fontFamily: 'var(--ember-font-body)',
                    backgroundColor: 'var(--ember-red-600)',
                    borderRadius: 'var(--ember-radius-button)',
                    boxShadow: '0 0 16px rgba(185, 28, 28, 0.3)',
                  }}
                  onClick={closeMenu}
                >
                  Crear mi tienda gratis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
