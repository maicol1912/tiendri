'use client'

/**
 * HeroSection — Tiendri Landing (Ember Core)
 *
 * Dark tech hero. Asymmetric two-column layout on desktop.
 * Left: large headline + subheadline + CTAs + metrics.
 * Right: Phone mockup image.
 *
 * Animations (Framer Motion):
 *   - Headline: stagger fade-up 40px, 600ms
 *   - Subheadline: fade-up 30px, 500ms, delay 300ms
 *   - CTAs row: fade-up 20px, delay 450ms
 *   - Metrics: fade-up stagger, delay 600ms
 */

import { type RefObject } from 'react'
import { motion } from 'framer-motion'

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

const STATS = [
  { value: '5 min', label: 'para tener tu tienda' },
  { value: '$0', label: 'para empezar' },
  { value: '0%', label: 'de comisión' },
]

interface HeroSectionProps {
  sectionRef?: RefObject<HTMLElement | null>
}

export function HeroSection({ sectionRef }: HeroSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-start pt-16 pb-20 md:items-center md:pt-24 md:pb-28 overflow-hidden ember-grid-texture"
      style={{ backgroundColor: 'var(--ember-bg-deep)' }}
      aria-label="Hero — propuesta de valor principal"
    >
      {/* Ambient light — large red glow top-left, low opacity */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(185,28,28,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col gap-4 lg:gap-7 max-w-2xl lg:-translate-x-[50%]">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0)}>
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1.5"
                style={{
                  backgroundColor: 'var(--ember-red-950)',
                  border: '1px solid rgba(185, 28, 28, 0.3)',
                  borderRadius: 'var(--ember-radius-badge)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{ backgroundColor: 'var(--ember-red-400)' }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{
                    fontFamily: 'var(--ember-font-body)',
                    color: 'var(--ember-red-400)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Sin comisiones por venta
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-bold leading-[0.95] tracking-tight"
              style={{
                fontFamily: 'var(--ember-font-display)',
                color: 'var(--ember-text-primary)',
                fontSize: 'clamp(36px, 10vw, 80px)',
              }}
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.span
                className="block"
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
                }}
              >
                Tu catálogo online,
              </motion.span>
              <motion.span
                className="block"
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.1 } },
                }}
                style={{
                  color: 'var(--ember-red-600)',
                  textShadow: '0 0 40px rgba(185,28,28,0.4)',
                }}
              >
                listo en 5 minutos.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="hidden lg:block text-lg leading-[1.7] max-w-lg"
              style={{
                fontFamily: 'var(--ember-font-body)',
                color: 'var(--ember-text-secondary)',
              }}
              {...fadeUp(0.3)}
            >
              Sube tus productos, comparte el link y recibe cada pedido con el
              detalle completo: qué quiere el cliente, en qué variante y cómo
              contactarlo.{' '}
              <span style={{ color: 'var(--ember-text-primary)' }}>
                Sin andar preguntando precio por precio.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-row gap-3 items-stretch sm:items-start"
              {...fadeUp(0.45)}
            >
              <a
                href="/auth?mode=register"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-3 sm:px-7 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300"
                style={{
                  fontFamily: 'var(--ember-font-body)',
                  backgroundColor: 'var(--ember-red-600)',
                  borderRadius: 'var(--ember-radius-button)',
                  boxShadow: 'var(--ember-glow-cta)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ember-red-500)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ember-red-600)'
                }}
              >
                <span className="sm:hidden">Crear tienda</span>
                <span className="hidden sm:inline">Crear mi tienda gratis</span>
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#plantillas"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-3 sm:px-7 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300"
                style={{
                  fontFamily: 'var(--ember-font-body)',
                  color: 'var(--ember-text-primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--ember-radius-button)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="sm:hidden">Ver tiendas</span>
                <span className="hidden sm:inline">Ver ejemplo de tienda</span>
              </a>
            </motion.div>

            {/* Metrics row */}
            <motion.div
              className="flex items-center gap-0 mt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                >
                  <div className="flex flex-col gap-0.5 pr-4 sm:pr-6 md:pr-10">
                    <span
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                      style={{
                        fontFamily: 'var(--ember-font-display)',
                        color: 'var(--ember-red-400)',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] sm:text-xs"
                      style={{
                        fontFamily: 'var(--ember-font-body)',
                        color: 'var(--ember-text-muted)',
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className="w-px h-8 mr-4 sm:mr-6 md:mr-10 flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT: Rocket video — desktop only ── */}
          <div className="hidden lg:flex relative justify-end items-center translate-x-[30%] -translate-y-[30%]">
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: '100%', maxWidth: '420px' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' as const }}
              aria-hidden="true"
            >
              <div className="relative w-full overflow-hidden" style={{ borderRadius: '20px' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full block"
                >
                  <source src="/videos/hero-cart-rocket.mp4" type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(to right, var(--ember-bg-deep) 0%, transparent 15%, transparent 85%, var(--ember-bg-deep) 100%),
                      linear-gradient(to bottom, var(--ember-bg-deep) 0%, transparent 12%, transparent 88%, var(--ember-bg-deep) 100%)
                    `,
                  }}
                />
              </div>
            </motion.div>

            {/* Floating badge — "Nuevo pedido" */}
            <motion.div
              className="absolute -right-[15%] top-[15%] z-20 flex items-center gap-2.5 px-3.5 py-2.5"
              style={{
                background: 'rgba(22, 20, 27, 0.90)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.9 }}
            >
              <motion.div
                className="flex items-center gap-2.5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#22C55E' }}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-primary)' }}
                  >
                    Nuevo pedido
                  </span>
                  <span
                    className="text-xs leading-tight mt-0.5"
                    style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
                  >
                    2 productos · $45.000
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — "Tienda activa" */}
            <motion.div
              className="absolute left-[10%] bottom-[15%] z-20 flex items-center gap-2.5 px-3.5 py-2.5"
              style={{
                background: 'rgba(22, 20, 27, 0.90)',
                border: '1px solid rgba(185,28,28,0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 1.1 }}
            >
              <motion.div
                className="flex items-center gap-2.5"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--ember-red-500)', boxShadow: '0 0 6px rgba(220,38,38,0.6)' }}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-primary)' }}
                  >
                    Tienda activa
                  </span>
                  <span
                    className="text-xs leading-tight mt-0.5"
                    style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
                  >
                    tiendri.com/dulce-canela
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
