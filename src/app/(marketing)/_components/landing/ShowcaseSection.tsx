'use client'

/**
 * ShowcaseSection — Tiendri Landing (Ember Core)
 *
 * "Cada tienda en Tiendri se ve distinta"
 *
 * Interactivity:
 *   - Auto-scroll via requestAnimationFrame (scrollLeft) — not CSS transform
 *   - Native swipe/drag: overflow-x scroll on container, browser handles touch
 *   - Pause on hover (desktop)
 *   - Pause on touch/mousedown → resume 3s after release
 *   - Seamless loop: items duplicated in JSX; jump back to 0 when reaching midpoint
 *   - Section fade-up on viewport entry (Framer Motion whileInView)
 */

import { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface StoreMockupProps {
  storeName: string
  tagline: string
  category: string
  headerBg: string
  headerText: string
  headerBorderColor: string
  accentColor: string
  surfaceBg: string
  bodyText: string
  mutedText: string
  borderColor: string
  heroBg: string
  products: Array<{ name: string; price: string; thumbBg: string }>
  featured?: boolean
}

function StoreMockup({
  storeName,
  tagline,
  category,
  headerBg,
  headerText,
  headerBorderColor,
  accentColor,
  surfaceBg,
  bodyText,
  mutedText,
  borderColor,
  heroBg,
  products,
  featured = false,
}: StoreMockupProps) {
  return (
    <motion.div
      className={`flex-shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-pointer ${featured ? 'w-72' : 'w-64'}`}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
        transition: { duration: 0.25 },
      }}
    >
      {/* Inner store mockup */}
      <div
        className="flex flex-col flex-1 rounded-xl overflow-hidden m-2"
        style={{ backgroundColor: surfaceBg }}
      >
        {/* Store header */}
        <div
          className="px-4 pt-3.5 pb-3"
          style={{ backgroundColor: headerBg, borderBottom: `1px solid ${headerBorderColor}` }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{
                backgroundColor: accentColor,
                color: headerText === '#FFFFFF' ? '#fff' : headerBg,
                fontFamily: 'var(--ember-font-display)',
              }}
            >
              {storeName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold leading-tight" style={{ fontFamily: 'var(--ember-font-display)', color: headerText }}>
                {storeName}
              </div>
              <div
                className="text-xs opacity-60 leading-tight"
                style={{ fontFamily: 'var(--ember-font-body)', color: headerText, fontSize: '10px' }}
              >
                {tagline}
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: accentColor, color: '#fff', fontFamily: 'var(--ember-font-body)', fontSize: '10px', borderRadius: '3px' }}
            >
              {category}
            </span>
            <span
              className="px-2 py-0.5 text-xs opacity-50"
              style={{ border: `1px solid ${headerText}30`, color: headerText, fontFamily: 'var(--ember-font-body)', fontSize: '10px', borderRadius: '3px' }}
            >
              Todo
            </span>
          </div>
        </div>

        {/* Hero band */}
        <div className="h-20 flex items-center justify-center" style={{ backgroundColor: heroBg }}>
          <div className="w-12 h-8 rounded opacity-50" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Product list */}
        <div className="flex-1 flex flex-col">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2.5"
              style={{
                borderBottom: i < products.length - 1 ? `1px solid ${borderColor}` : 'none',
                backgroundColor: surfaceBg,
              }}
            >
              <div className="w-8 h-8 rounded-md flex-shrink-0" style={{ backgroundColor: product.thumbBg }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ fontFamily: 'var(--ember-font-body)', color: bodyText, fontSize: '10px' }}>
                  {product.name}
                </div>
                <div className="text-xs font-bold" style={{ fontFamily: 'var(--ember-font-display)', color: accentColor, fontSize: '11px' }}>
                  {product.price}
                </div>
              </div>
              <button
                className="px-2 py-1 text-xs font-semibold rounded flex-shrink-0"
                style={{ fontFamily: 'var(--ember-font-body)', backgroundColor: accentColor, color: '#fff', border: 'none', fontSize: '10px', borderRadius: '3px' }}
                type="button"
                aria-label={`Pedir ${product.name}`}
              >
                Pedir
              </button>
            </div>
          ))}
        </div>

        {/* Watermark */}
        <div className="px-3 py-2" style={{ borderTop: `1px solid ${borderColor}` }}>
          <span className="text-xs opacity-40" style={{ fontFamily: 'var(--ember-font-body)', color: mutedText, fontSize: '10px' }}>
            tiendri.com
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const STORE_MOCKUPS: StoreMockupProps[] = [
  {
    storeName: 'Ferretería Don Carlos',
    tagline: 'Materiales y herramientas',
    category: 'Herramientas',
    headerBg: '#1E3A5F',
    headerText: '#FFFFFF',
    headerBorderColor: 'rgba(255,255,255,0.08)',
    accentColor: '#F59E0B',
    heroBg: '#2D4E72',
    surfaceBg: '#F8FAFC',
    bodyText: '#1E293B',
    mutedText: '#64748B',
    borderColor: '#E2E8F0',
    featured: true,
    products: [
      { name: 'Taladro Bosch 750W', price: '$289.000', thumbBg: '#CBD5E1' },
      { name: 'Cemento gris 50kg', price: '$42.000', thumbBg: '#94A3B8' },
      { name: 'Extensión 10m 16A', price: '$38.500', thumbBg: '#BFDBFE' },
    ],
  },
  {
    storeName: 'Dulce Canela',
    tagline: 'Tortas y postres artesanales',
    category: 'Tortas',
    headerBg: '#FDF2F8',
    headerText: '#831843',
    headerBorderColor: '#FBD0E8',
    accentColor: '#EC4899',
    heroBg: '#FCE7F3',
    surfaceBg: '#FFFFFF',
    bodyText: '#1F2937',
    mutedText: '#9CA3AF',
    borderColor: '#F9A8D4',
    products: [
      { name: 'Torta Red Velvet 20cm', price: '$75.000', thumbBg: '#FBD0E8' },
      { name: 'Cupcakes × 12', price: '$48.000', thumbBg: '#F9A8D4' },
      { name: 'Cheesecake NY', price: '$65.000', thumbBg: '#FDE8D8' },
    ],
  },
  {
    storeName: 'Tech Zone',
    tagline: 'Accesorios y gadgets',
    category: 'Destacados',
    headerBg: '#0F172A',
    headerText: '#F8FAFC',
    headerBorderColor: 'rgba(255,255,255,0.06)',
    accentColor: '#3B82F6',
    heroBg: '#1E293B',
    surfaceBg: '#0F172A',
    bodyText: '#E2E8F0',
    mutedText: '#64748B',
    borderColor: '#1E293B',
    featured: true,
    products: [
      { name: 'Auriculares BT Pro X', price: '$189.000', thumbBg: '#1E3A5F' },
      { name: 'Cargador USB-C 65W', price: '$65.000', thumbBg: '#172554' },
      { name: 'Hub USB 7 puertos', price: '$89.000', thumbBg: '#1D4ED8' },
    ],
  },
  {
    storeName: 'Modas Luna',
    tagline: 'Ropa y accesorios mujer',
    category: 'Nuevos',
    headerBg: '#F0F4F0',
    headerText: '#1A3320',
    headerBorderColor: '#C8DBC8',
    accentColor: '#4D7C5F',
    heroBg: '#DCE8DC',
    surfaceBg: '#FAFCFA',
    bodyText: '#1A3320',
    mutedText: '#6B8F6B',
    borderColor: '#D1E8D1',
    products: [
      { name: 'Blusa lino natural L', price: '$89.000', thumbBg: '#C8DBC8' },
      { name: 'Falda midi floral M', price: '$115.000', thumbBg: '#A8C8A8' },
      { name: 'Cartera tejida beige', price: '$135.000', thumbBg: '#E8F0E8' },
    ],
  },
]

// Duplicated array for seamless infinite loop (jump back when reaching midpoint)
const CAROUSEL_ITEMS = [...STORE_MOCKUPS, ...STORE_MOCKUPS]

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // All mutable state lives in refs — no re-renders needed for scroll logic
  const pausedRef = useRef(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const speedRef = useRef(0.6) // px per frame — adjust for faster/slower

  // --- Pause helpers ---

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }, [])

  const pause = useCallback(() => {
    clearResumeTimer()
    pausedRef.current = true
  }, [clearResumeTimer])

  const scheduleResume = useCallback((delayMs: number) => {
    clearResumeTimer()
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false
    }, delayMs)
  }, [clearResumeTimer])

  // --- rAF loop ---

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const animate = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += speedRef.current
        // Seamless loop: when we reach the halfway point (the duplicate set),
        // jump back to 0. The content at 0 is identical so the cut is invisible.
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      clearResumeTimer()
    }
  }, [clearResumeTimer])

  // --- Wheel → horizontal scroll (non-passive so preventDefault works) ---
  // Pauses the rAF auto-scroll while the user is wheel-scrolling, then resumes 3s later.

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        pause()
        el.scrollLeft += e.deltaY
        scheduleResume(3000)
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [pause, scheduleResume])

  // --- Event handlers ---

  // Desktop: hover pauses; leaving resumes immediately
  const onMouseEnter = useCallback(() => pause(), [pause])
  const onMouseLeave = useCallback(() => {
    clearResumeTimer()
    pausedRef.current = false
  }, [clearResumeTimer])

  // Mouse drag: pause on press, resume 3s after release
  const onMouseDown = useCallback(() => pause(), [pause])
  const onMouseUp = useCallback(() => scheduleResume(3000), [scheduleResume])

  // Touch: pause on touch start, resume 3s after last touchend
  const onTouchStart = useCallback(() => pause(), [pause])
  const onTouchEnd = useCallback(() => scheduleResume(3000), [scheduleResume])

  return (
    <section
      id="plantillas"
      className="py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--ember-bg-elevated)' }}
      aria-labelledby="showcase-title"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-red-400)' }}
          >
            Plantillas
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="showcase-title"
              className="font-bold leading-[1.05] tracking-tight"
              style={{
                fontFamily: 'var(--ember-font-display)',
                color: 'var(--ember-text-primary)',
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                maxWidth: '520px',
              }}
            >
              Cada tienda en Tiendri{' '}
              <span style={{ color: 'var(--ember-red-400)' }}>se ve distinta</span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
            >
              Elige una plantilla, cambia los colores y sube tu logo. En minutos tienes
              una tienda que parece profesional. Tus clientes ven tu marca, no la nuestra.
            </p>
          </div>

          <p
            className="mt-8 text-sm font-medium"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
          >
            Así se ven tiendas reales de Tiendri
          </p>
        </motion.div>

      </div>

      {/*
        Carousel container — full-width, breakout from the content column.
        overflow-x-auto enables native scroll (and thus touch swipe).
        scrollbar-none hides the bar visually while keeping scroll functional.
        The rAF loop drives scrollLeft for the auto-scroll.
      */}
      <div
        className="relative w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Edge fade masks — left and right */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, var(--ember-bg-elevated), transparent)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to left, var(--ember-bg-elevated), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Scrollable track — overflow-x-auto + hide scrollbar */}
        <div
          ref={containerRef}
          className="flex gap-5 pb-6 pt-2 overflow-x-auto select-none"
          role="region"
          aria-label="Galería de tiendas de ejemplo"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            scrollbarWidth: 'none',        // Firefox
            msOverflowStyle: 'none',       // IE/Edge legacy
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
          }}
        >
          {/* Hide scrollbar in WebKit browsers */}
          <style>{`
            [aria-label="Galería de tiendas de ejemplo"]::-webkit-scrollbar { display: none; }
          `}</style>

          {CAROUSEL_ITEMS.map((store, index) => (
            <StoreMockup key={`${store.storeName}-${index}`} {...store} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Bottom CTA */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <a
            href="/auth?mode=register"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300"
            style={{
              fontFamily: 'var(--ember-font-body)',
              backgroundColor: 'var(--ember-red-600)',
              borderRadius: 'var(--ember-radius-button)',
              boxShadow: 'var(--ember-glow-subtle)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ember-red-500)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ember-red-600)'
            }}
          >
            Crear mi tienda gratis
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
          >
            Sin diseñador. Sin experiencia en web. En 5 minutos.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
