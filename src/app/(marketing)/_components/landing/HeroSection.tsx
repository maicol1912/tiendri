'use client'

/**
 * HeroSection — Tiendri Landing (Ember Core)
 *
 * Dark tech hero. Asymmetric two-column layout on desktop.
 * Left: large headline + subheadline + CTAs + floating metrics badges.
 * Right: Holographic cart visualization — CSS/SVG/Framer Motion only.
 *
 * Animations (Framer Motion):
 *   - Headline: stagger fade-up 40px, 600ms
 *   - Subheadline: fade-up 30px, 500ms, delay 300ms
 *   - CTAs row: fade-up 20px, delay 450ms
 *   - Metrics: fade-up stagger, delay 600ms
 *   - Badge "Nuevo pedido": slide-in from right, spring, delay 900ms
 *   - Badge "Activos": slide-in from left, delay 1.1s
 *   - Cart hologram: float oscillation loop + radial glow breathing
 */

import { motion } from 'framer-motion'

// ── Hero video with edge fade — Cart to Rocket transformation ──
function HeroCartHologram() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: '100%', maxWidth: '520px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' as const }}
      aria-hidden="true"
    >
      {/* Video with edge fade gradient — blends into dark background */}
      <div className="relative w-full overflow-hidden" style={{ borderRadius: '20px' }}>
        {/* The video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full block"
        >
          <source src="/videos/hero-cart-rocket.mp4" type="video/mp4" />
        </video>

        {/* Edge fade — all 4 sides fade to the page background color */}
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
  )
}

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

const springRight = { type: 'spring', stiffness: 180, damping: 20, delay: 0.9 } as const
const springLeft = { type: 'spring', stiffness: 180, damping: 20, delay: 1.1 } as const

const STATS = [
  { value: '5 min', label: 'para tener tu tienda' },
  { value: '$0', label: 'para empezar' },
  { value: '0%', label: 'de comisión' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden ember-grid-texture"
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
          <div className="flex flex-col gap-7 max-w-2xl">

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
              className="text-lg leading-[1.7] max-w-lg"
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
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start"
              {...fadeUp(0.45)}
            >
              <a
                href="/auth?mode=register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white transition-all duration-300"
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
                Crear mi tienda gratis
                <svg className="ml-2.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#plantillas"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-medium transition-all duration-300"
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
                Ver ejemplo de tienda
              </a>
            </motion.div>

            {/* Trust note */}
            <motion.p
              className="text-sm"
              style={{
                fontFamily: 'var(--ember-font-body)',
                color: 'var(--ember-text-muted)',
              }}
              {...fadeUp(0.5)}
            >
              Empieza gratis.{' '}
              <span style={{ color: 'var(--ember-text-secondary)' }}>Sin tarjeta de crédito.</span>{' '}
              Sin comisiones.
            </motion.p>

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

            {/* ── Video mobile — debajo de métricas, oculto en desktop ── */}
            <div className="flex lg:hidden max-w-[220px] mx-auto mt-4 opacity-90 w-full">
              <HeroCartHologram />
            </div>
          </div>

          {/* ── RIGHT: 3D Cart — desktop only ── */}
          <div className="hidden lg:flex relative justify-center lg:justify-end overflow-hidden">
            {/* Holographic cart — CSS/SVG/Framer Motion */}
            <HeroCartHologram />

            {/* Floating badge 1 — "Nuevo pedido" — slide-in from right */}
            <motion.div
              className="hidden sm:flex absolute right-2 lg:right-2 top-[28%] z-20 items-center gap-2.5 px-3.5 py-2.5"
              style={{
                background: 'rgba(22, 20, 27, 0.90)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={springRight}
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

            {/* Floating badge 2 — "Tienda activa" — slide-in from left */}
            <motion.div
              className="hidden sm:flex absolute left-2 lg:left-2 bottom-[28%] z-20 items-center gap-2.5 px-3.5 py-2.5"
              style={{
                background: 'rgba(22, 20, 27, 0.90)',
                border: '1px solid rgba(185,28,28,0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={springLeft}
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
