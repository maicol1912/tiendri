'use client'

/**
 * PricingSection — Tiendri Landing (Ember Core)
 *
 * "Sin letra chica ni sorpresas"
 *
 * Layout: 3 vertical cards + expandible "Ver todas las características"
 * Interactivity:
 *   - FAQ accordion: useState for active index, AnimatePresence for height animation
 *   - Cards: fade-up on viewport entry (Framer Motion whileInView)
 *   - Expandible features table: AnimatePresence height animation
 *   - Pro card: ember-pulse on mount, scale-105, hero treatment
 *   - Mobile carousel: auto-scroll each 3s, snap-x, peek of neighbor cards, dots indicator
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FEATURES = [
  { label: 'Productos incluidos', free: 'Hasta 20', pro: 'Ilimitados', business: 'Ilimitados' },
  { label: 'Plantillas disponibles', free: true, pro: true, business: true },
  { label: 'Recibe pedidos al instante', free: true, pro: true, business: true },
  { label: 'Código QR de tu tienda', free: true, pro: true, business: true },
  { label: 'Sin comisiones por venta', free: true, pro: true, business: true },
  { label: 'Panel de estadísticas', free: false, pro: true, business: true },
  { label: 'Historial de pedidos', free: false, pro: true, business: true },
  { label: 'Secciones personalizadas', free: false, pro: true, business: true },
  { label: 'Soporte prioritario', free: false, pro: true, business: true },
  { label: 'Múltiples tiendas', free: false, pro: false, business: true },
  { label: 'Dominio personalizado', free: false, pro: false, business: true },
  { label: 'Reportes avanzados', free: false, pro: false, business: true },
]

const FEATURES_PRIMARY = FEATURES.slice(0, 6)
const FEATURES_EXTRA = FEATURES.slice(6)

const FAQ_ITEMS = [
  {
    question: '¿Cobran algo por cada pedido que recibo?',
    answer: 'No. Nunca. Tu plan es fijo mensual y lo que vendes queda en tu bolsillo.',
  },
  {
    question: '¿Puedo subir de plan después?',
    answer: 'Sí, en cualquier momento. También puedes bajar o cancelar, sin penalizaciones.',
  },
  {
    question: '¿El plan gratis tiene alguna trampa?',
    answer: 'No. Es gratis con hasta 20 productos. Cuando necesites más, puedes pasar al plan Pro.',
  },
  {
    question: '¿Qué pasa si llego al límite de 20 productos?',
    answer: 'Te avisamos. Puedes subir al plan Pro en un clic y seguir cargando.',
  },
]

type FeatureValue = boolean | string

// ─── Inline feature row for cards ───────────────────────────────────────────

function FeatureRow({
  label,
  value,
  isPro,
}: {
  label: string
  value: FeatureValue
  isPro?: boolean
}) {
  const renderIndicator = () => {
    if (typeof value === 'string') {
      return (
        <span
          className="text-xs font-semibold shrink-0"
          style={{
            fontFamily: 'var(--ember-font-body)',
            color: isPro ? 'var(--ember-red-400)' : 'var(--ember-text-secondary)',
          }}
        >
          {value}
        </span>
      )
    }
    if (value) {
      return (
        <svg
          className="w-4 h-4 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          aria-label="Incluido"
        >
          <circle
            cx="10"
            cy="10"
            r="9"
            fill={isPro ? 'rgba(185,28,28,0.2)' : 'rgba(255,255,255,0.07)'}
          />
          <path
            d="M6.5 10l2.5 2.5 4.5-5"
            stroke={isPro ? 'var(--ember-red-400)' : 'var(--ember-text-muted)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    return (
      <span
        className="block w-3 h-px shrink-0"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        aria-label="No incluido"
      />
    )
  }

  return (
    <div className="flex items-center gap-3">
      {renderIndicator()}
      <span
        className="text-sm leading-snug"
        style={{
          fontFamily: 'var(--ember-font-body)',
          color: value ? 'var(--ember-text-secondary)' : 'rgba(255,255,255,0.3)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Compact cell for expandible table ──────────────────────────────────────

function FeatureCell({ value, isPro }: { value: FeatureValue; isPro?: boolean }) {
  if (typeof value === 'string') {
    return (
      <span
        className="text-xs font-medium"
        style={{
          fontFamily: 'var(--ember-font-body)',
          color: isPro ? 'var(--ember-red-400)' : 'var(--ember-text-primary)',
        }}
      >
        {value}
      </span>
    )
  }
  if (value) {
    return (
      <svg className="w-4 h-4 mx-auto" viewBox="0 0 20 20" fill="none" aria-label="Incluido">
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={isPro ? 'rgba(185,28,28,0.2)' : 'rgba(255,255,255,0.07)'}
        />
        <path
          d="M6.5 10l2.5 2.5 4.5-5"
          stroke={isPro ? 'var(--ember-red-400)' : 'var(--ember-text-secondary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <span
      className="block w-3 h-px mx-auto"
      style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
      aria-label="No incluido"
    />
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div
      className="flex flex-col max-w-2xl"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = activeIndex === i

        return (
          <div
            key={i}
            className="py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <button
              className="flex items-center justify-between gap-4 w-full text-left"
              aria-expanded={isOpen}
              onClick={() => setActiveIndex(isOpen ? null : i)}
              type="button"
            >
              <span
                className="text-base font-medium"
                style={{
                  fontFamily: 'var(--ember-font-body)',
                  color: 'var(--ember-text-primary)',
                }}
              >
                {item.question}
              </span>
              <motion.svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
              >
                <path
                  d="M10 4v12M4 10h12"
                  stroke="var(--ember-text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    className="pt-3 text-sm leading-relaxed"
                    style={{
                      fontFamily: 'var(--ember-font-body)',
                      color: 'var(--ember-text-secondary)',
                    }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Plan card ───────────────────────────────────────────────────────────────

type PlanKey = 'free' | 'pro' | 'business'

interface PlanCardProps {
  planKey: PlanKey
  name: string
  price: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  isPro?: boolean
  delay?: number
}

function PlanCard({
  planKey,
  name,
  price,
  subtitle,
  ctaLabel,
  ctaHref,
  isPro,
  delay = 0,
}: PlanCardProps) {
  const cardStyle: React.CSSProperties = isPro
    ? {
        backgroundColor: 'color-mix(in srgb, rgba(185,28,28,0.04), var(--ember-bg-elevated))',
        border: '2px solid rgba(185,28,28,0.3)',
        boxShadow: '0 0 40px rgba(185,28,28,0.12)',
        borderRadius: '1rem',
        position: 'relative',
      }
    : {
        backgroundColor: 'var(--ember-bg-elevated)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '1rem',
        position: 'relative',
      }

  return (
    <motion.div
      className={`flex flex-col rounded-2xl${isPro ? ' md:scale-105 z-10' : ''}`}
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {/* "Más popular" badge — only for Pro */}
      {isPro && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full flex justify-center">
          <motion.div
            className="inline-flex items-center px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-b-lg"
            style={{
              fontFamily: 'var(--ember-font-body)',
              backgroundColor: 'var(--ember-red-600)',
              color: '#fff',
              letterSpacing: '0.1em',
              boxShadow: '0 4px 16px rgba(185,28,28,0.3)',
            }}
            animate={{
              boxShadow: [
                '0 4px 16px rgba(185,28,28,0.3)',
                '0 4px 28px rgba(185,28,28,0.55)',
                '0 4px 16px rgba(185,28,28,0.3)',
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            Más popular
          </motion.div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Plan name */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{
            fontFamily: 'var(--ember-font-body)',
            color: isPro ? 'var(--ember-red-400)' : 'var(--ember-text-muted)',
          }}
        >
          {name}
        </p>

        {/* Price */}
        <div className="mb-1">
          <span
            className="text-4xl font-bold"
            style={{
              fontFamily: 'var(--ember-font-display)',
              color: 'var(--ember-text-primary)',
            }}
          >
            {price}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="text-xs mb-6"
          style={{
            fontFamily: 'var(--ember-font-body)',
            color: 'var(--ember-text-muted)',
          }}
        >
          {subtitle}
        </p>

        {/* CTA button */}
        {isPro ? (
          <a
            href={ctaHref}
            className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-lg mb-6"
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
            {ctaLabel}
          </a>
        ) : (
          <a
            href={ctaHref}
            className="w-full text-center px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg mb-6"
            style={{
              fontFamily: 'var(--ember-font-body)',
              color: 'var(--ember-text-primary)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--ember-radius-button)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {ctaLabel}
          </a>
        )}

        {/* Divider */}
        <div
          className="mb-5"
          style={{
            height: '1px',
            backgroundColor: isPro ? 'rgba(185,28,28,0.2)' : 'rgba(255,255,255,0.06)',
          }}
        />

        {/* 6 key features */}
        <ul className="flex flex-col gap-3">
          {FEATURES_PRIMARY.map((feature) => (
            <li key={feature.label}>
              <FeatureRow
                label={feature.label}
                value={feature[planKey]}
                isPro={isPro}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Expandible features table ───────────────────────────────────────────────

function ExpandableFeatures() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
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
        <span>{isOpen ? 'Ocultar características' : 'Ver todas las características'}</span>
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <path
            d="M3 5.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Expandible table */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="extra-features"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            {/* Desktop table — 4 columns */}
            <div
              className="hidden md:block mt-6 rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                backgroundColor: 'var(--ember-bg-elevated)',
              }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="px-5 py-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{
                      fontFamily: 'var(--ember-font-body)',
                      color: 'var(--ember-text-muted)',
                    }}
                  >
                    Característica
                  </span>
                </div>
                {(['Gratis', 'Pro', 'Negocio'] as const).map((col) => (
                  <div
                    key={col}
                    className="px-4 py-3 text-center"
                    style={
                      col === 'Pro'
                        ? {
                            backgroundColor: 'rgba(185,28,28,0.07)',
                            borderLeft: '1px solid rgba(185,28,28,0.2)',
                            borderRight: '1px solid rgba(185,28,28,0.2)',
                          }
                        : {}
                    }
                  >
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{
                        fontFamily: 'var(--ember-font-body)',
                        color: col === 'Pro' ? 'var(--ember-red-400)' : 'var(--ember-text-muted)',
                      }}
                    >
                      {col}
                    </span>
                  </div>
                ))}
              </div>

              {/* Extra feature rows */}
              {FEATURES_EXTRA.map((feature, i) => (
                <div
                  key={feature.label}
                  className="grid grid-cols-4"
                  style={{
                    borderBottom:
                      i < FEATURES_EXTRA.length - 1
                        ? '1px solid rgba(255,255,255,0.04)'
                        : 'none',
                  }}
                >
                  <div
                    className="px-5 py-3 flex items-center"
                    style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: 'var(--ember-font-body)',
                        color: 'var(--ember-text-secondary)',
                      }}
                    >
                      {feature.label}
                    </span>
                  </div>
                  <div
                    className="px-4 py-3 flex items-center justify-center"
                    style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <FeatureCell value={feature.free} />
                  </div>
                  <div
                    className="px-4 py-3 flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(185,28,28,0.05)',
                      borderLeft: '1px solid rgba(185,28,28,0.15)',
                      borderRight: '1px solid rgba(185,28,28,0.15)',
                    }}
                  >
                    <FeatureCell value={feature.pro} isPro />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-center">
                    <FeatureCell value={feature.business} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile list — feature name + 3 inline indicators */}
            <div
              className="block md:hidden mt-6 rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                backgroundColor: 'var(--ember-bg-elevated)',
              }}
            >
              {FEATURES_EXTRA.map((feature, i) => (
                <div
                  key={feature.label}
                  className="px-4 py-3"
                  style={{
                    borderBottom:
                      i < FEATURES_EXTRA.length - 1
                        ? '1px solid rgba(255,255,255,0.04)'
                        : 'none',
                  }}
                >
                  <span
                    className="text-sm block mb-2"
                    style={{
                      fontFamily: 'var(--ember-font-body)',
                      color: 'var(--ember-text-secondary)',
                    }}
                  >
                    {feature.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
                    >
                      Gratis:
                    </span>
                    <FeatureCell value={feature.free} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-red-400)' }}
                    >
                      Pro:
                    </span>
                    <FeatureCell value={feature.pro} isPro />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
                    >
                      Negocio:
                    </span>
                    <FeatureCell value={feature.business} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Pricing Carousel (mobile auto-scroll + dots) ───────────────────────────

/**
 * Card order in mobile: Gratis (first) → Pro → Negocio.
 * Indices used for scrollTo calculations match the DOM order: 0=Gratis, 1=Pro, 2=Negocio.
 */
const CAROUSEL_CARDS = [
  {
    planKey: 'free' as const,
    name: 'Gratis',
    price: '$0',
    subtitle: 'para siempre',
    ctaLabel: 'Empezar gratis',
    ctaHref: '/auth?mode=register',
    isPro: false,
    delay: 0,
  },
  {
    planKey: 'pro' as const,
    name: 'Pro',
    price: '$49.900',
    subtitle: 'COP/mes',
    ctaLabel: 'Empezar con Pro',
    ctaHref: '/auth?mode=register&plan=pro',
    isPro: true,
    delay: 0.1,
  },
  {
    planKey: 'business' as const,
    name: 'Negocio',
    price: '$99.900',
    subtitle: 'COP/mes',
    ctaLabel: 'Hablar con ventas',
    ctaHref: 'https://wa.me/573000000000?text=Hola%2C%20quiero%20info%20del%20Plan%20Negocio',
    isPro: false,
    delay: 0.2,
  },
]

function PricingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  // pausedUntil stores the timestamp (ms) until which auto-scroll is paused
  const pausedUntilRef = useRef<number>(0)

  // Scroll to a given card index programmatically
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement | undefined
    if (!card) return
    const containerRect = container.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    // Center the card within the container
    const offset =
      card.offsetLeft - container.offsetLeft - (containerRect.width - cardRect.width) / 2
    container.scrollTo({ left: offset, behavior: 'smooth' })
  }, [])

  // Derive active index from scroll position: find whichever card center is
  // closest to the container center. More reliable than IntersectionObserver
  // because it works regardless of how many cards are partially visible.
  const updateIndexFromScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement
      const cardCenter = el.offsetLeft + el.offsetWidth / 2
      const distance = Math.abs(containerCenter - cardCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    })
    setActiveIndex(closestIndex)
  }, [])

  // Listen to scroll events on the carousel container (passive for performance)
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', updateIndexFromScroll, { passive: true })
    return () => container.removeEventListener('scroll', updateIndexFromScroll)
  }, [updateIndexFromScroll])

  // Auto-scroll interval: advances to next card every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return
      setActiveIndex((prev) => {
        const next = (prev + 1) % CAROUSEL_CARDS.length
        scrollToIndex(next)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [scrollToIndex])

  // Pause auto-scroll for 5s when user touches the carousel
  const handleTouchStart = useCallback(() => {
    pausedUntilRef.current = Date.now() + 5000
  }, [])

  // Wheel → horizontal scroll (non-passive so preventDefault works).
  // Also pauses the auto-scroll interval for 5s so wheel input isn't overridden.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        pausedUntilRef.current = Date.now() + 5000
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  return (
    <>
      {/* Inject webkit scrollbar hide for the carousel */}
      <style>{`
        .pricing-carousel::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Desktop: plain grid (no carousel logic) ── */}
      <div
        className="hidden md:grid md:grid-cols-3 md:gap-6 md:items-start md:pt-6"
        role="region"
        aria-label="Planes de precios"
      >
        {/* Desktop keeps original order: Gratis | Pro | Negocio */}
        <div>
          <PlanCard
            planKey="free"
            name="Gratis"
            price="$0"
            subtitle="para siempre"
            ctaLabel="Empezar gratis"
            ctaHref="/auth?mode=register"
            delay={0}
          />
        </div>
        <div className="relative -mt-4">
          <PlanCard
            planKey="pro"
            name="Pro"
            price="$49.900"
            subtitle="COP/mes"
            ctaLabel="Empezar con Pro"
            ctaHref="/auth?mode=register&plan=pro"
            isPro
            delay={0.1}
          />
        </div>
        <div>
          <PlanCard
            planKey="business"
            name="Negocio"
            price="$99.900"
            subtitle="COP/mes"
            ctaLabel="Hablar con ventas"
            ctaHref="https://wa.me/573000000000?text=Hola%2C%20quiero%20info%20del%20Plan%20Negocio"
            delay={0.2}
          />
        </div>
      </div>

      {/* ── Mobile: carousel with peek ── */}
      <div
        ref={scrollRef}
        className="pricing-carousel md:hidden flex overflow-x-auto gap-4 pt-10 pb-6 snap-x snap-mandatory -mx-5 px-4 sm:-mx-8 sm:px-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        role="region"
        aria-label="Planes de precios"
        onTouchStart={handleTouchStart}
      >
        {CAROUSEL_CARDS.map((card) => (
          <div
            key={card.planKey}
            className={`snap-center flex-shrink-0 w-[75vw]${card.isPro ? ' relative' : ''}`}
          >
            <PlanCard
              planKey={card.planKey}
              name={card.name}
              price={card.price}
              subtitle={card.subtitle}
              ctaLabel={card.ctaLabel}
              ctaHref={card.ctaHref}
              isPro={card.isPro}
              delay={card.delay}
            />
          </div>
        ))}
      </div>

      {/* ── Dots indicator (mobile only) ── */}
      <div
        className="flex md:hidden justify-center gap-2 mt-4"
        role="tablist"
        aria-label="Indicador de plan activo"
      >
        {CAROUSEL_CARDS.map((card, i) => (
          <button
            key={card.planKey}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Ver plan ${card.name}`}
            onClick={() => {
              pausedUntilRef.current = Date.now() + 5000
              setActiveIndex(i)
              scrollToIndex(i)
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeIndex === i ? '20px' : '8px',
              height: '8px',
              backgroundColor:
                activeIndex === i ? 'var(--ember-red-600)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────

export function PricingSection() {
  return (
    <section
      id="precios"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--ember-bg-base)' }}
      aria-labelledby="pricing-title"
    >
      {/* Ambient glow — left side */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 100%, rgba(185,28,28,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-red-400)' }}
          >
            Precios
          </p>
          <h2
            id="pricing-title"
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--ember-font-display)',
              color: 'var(--ember-text-primary)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
            }}
          >
            Sin letra chica ni sorpresas
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{
              fontFamily: 'var(--ember-font-body)',
              color: 'var(--ember-text-secondary)',
            }}
          >
            Una tarifa mensual fija. Cero comisiones por venta. Lo que vendas es tuyo.
          </p>
        </motion.div>

        {/* 3 pricing cards */}
        {/*
          Mobile: horizontal scroll carousel — each card w-[75vw], snap-center, peek of neighbors.
          Desktop (md+): grid 3 columns as before.
          Auto-scroll every 3s, pauses 5s on user touch, resumes after.
          Dots indicator below carousel (mobile only).
        */}
        <PricingCarousel />

        {/* Expandible — extra 6 features */}
        <ExpandableFeatures />

        {/* Plan taglines */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6 mt-8 px-2">
          {[
            { name: 'Gratis', tagline: 'Para empezar hoy, sin arriesgar nada' },
            { name: 'Pro', tagline: 'Para cuando el negocio ya despegó', highlight: true },
            { name: 'Negocio', tagline: 'Para el que maneja más de una tienda' },
          ].map((plan) => (
            <p
              key={plan.name}
              className="text-xs text-center"
              style={{
                fontFamily: 'var(--ember-font-body)',
                color: plan.highlight ? 'var(--ember-red-400)' : 'var(--ember-text-muted)',
              }}
            >
              {plan.tagline}
            </p>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="mt-20 md:mt-24">
          <motion.h3
            className="text-2xl font-bold mb-8"
            style={{
              fontFamily: 'var(--ember-font-display)',
              color: 'var(--ember-text-primary)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Preguntas frecuentes
          </motion.h3>

          <FaqAccordion />
        </div>
      </div>
    </section>
  )
}
