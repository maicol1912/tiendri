'use client'

/**
 * CtaSection — Tiendri Landing (Ember Core)
 *
 * Final call to action before footer.
 *
 * Animations:
 *   - Headline: fade-up 40px, spring physics, on viewport entry
 *   - CTA button: ember-pulse CSS animation + Framer Motion hover scale
 *   - Glow div: subtle scale breathing loop (Framer Motion)
 *   - Metrics: counter animation from 0 when entering viewport
 *   - All reduced-motion safe (checked via CSS media query in globals.css)
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Counter hook — counts from 0 to target when visible ──
function useCounter(target: number, duration = 1200, shouldStart = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const startTime = performance.now()
    let raf: number

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shouldStart, target, duration])

  return value
}

// Metric with animated counter
function AnimatedMetric({ stat, isVisible }: { stat: { value: string; label: string }; isVisible: boolean }) {
  // Parse numeric part and suffix
  const match = stat.value.match(/^([^0-9]*)(\d+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const numericTarget = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ''

  const count = useCounter(numericTarget, 1200, isVisible)
  const displayValue = numericTarget > 0 ? `${prefix}${count}${suffix}` : stat.value

  return (
    <span
      className="text-2xl sm:text-3xl font-bold"
      style={{
        fontFamily: 'var(--ember-font-display)',
        color: 'var(--ember-text-primary)',
      }}
    >
      {displayValue}
    </span>
  )
}

const STATS = [
  { value: '5 min', label: 'para tener tu tienda' },
  { value: '$0', label: 'para empezar' },
  { value: '0%', label: 'de comisión' },
]

export function CtaSection() {
  const metricsRef = useRef<HTMLDivElement>(null)
  const metricsVisible = useInView(metricsRef, { once: true, amount: 0.5 })

  return (
    <section
      className="relative py-16 md:py-28 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--ember-bg-deep)' }}
      aria-labelledby="cta-final-title"
    >
      {/* Background glow — breathing pulse */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(185,28,28,0.18) 0%, rgba(185,28,28,0.07) 35%, transparent 65%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle dot texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none ember-dot-texture opacity-30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

        {/* Overline */}
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.25em] mb-6"
          style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-red-400)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Empieza hoy
        </motion.p>

        {/* Headline — spring physics */}
        <motion.h2
          id="cta-final-title"
          className="font-bold tracking-tight leading-[1.0] mb-7"
          style={{
            fontFamily: 'var(--ember-font-display)',
            color: 'var(--ember-text-primary)',
            fontSize: 'clamp(32px, 8vw, 72px)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.1 }}
        >
          ¿Listo para crear{' '}
          <span
            style={{
              color: 'var(--ember-red-600)',
              textShadow: '0 0 40px rgba(185,28,28,0.5)',
            }}
          >
            tu tienda?
          </span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          Miles de negocios en Colombia y LATAM ya están vendiendo con Tiendri.
          La tienda que nunca tuviste te espera.
        </motion.p>

        {/* CTA — pulsing glow */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.a
            href="/auth?mode=register"
            className="w-full sm:w-auto max-w-sm inline-flex items-center justify-center px-7 sm:px-10 text-base font-semibold text-white transition-colors duration-300"
            style={{
              fontFamily: 'var(--ember-font-body)',
              backgroundColor: 'var(--ember-red-600)',
              borderRadius: 'var(--ember-radius-button)',
              animation: 'ember-pulse 2.4s ease-in-out infinite',
              paddingTop: '18px',
              paddingBottom: '18px',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ember-red-500)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ember-red-600)'
            }}
          >
            Crear mi tienda gratis
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          {/* Trust note */}
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
          >
            Empieza gratis.{' '}
            <span style={{ color: 'var(--ember-text-secondary)' }}>Sin tarjeta de crédito.</span>{' '}
            Sin comisiones.
          </p>
        </motion.div>

        {/* Metrics — animated counters */}
        <div
          ref={metricsRef}
          className="mt-14 flex flex-wrap items-center justify-center gap-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px' }}
          aria-label="Indicadores clave"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1 px-4 sm:px-8 md:px-12">
                <AnimatedMetric stat={stat} isVisible={metricsVisible} />
                <span
                  className="text-xs text-center"
                  style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
                >
                  {stat.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className="w-px h-8 sm:h-10 flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
