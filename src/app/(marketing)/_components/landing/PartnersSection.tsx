'use client'

/**
 * PartnersSection — reused slot for Pricing/Plans section.
 * Export name kept as PartnersSection so page.tsx imports don't break.
 *
 * Layout: section heading + 3 plan cards side-by-side + FAQ accordion
 * Style: light/white palette, no Framer Motion, plain useState for accordion
 */

import { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

type FeatureValue = boolean | string

interface Feature {
  label: string
  free: FeatureValue
  pro: FeatureValue
  business: FeatureValue
}

const FEATURES: Feature[] = [
  { label: 'Productos incluidos',      free: 'Hasta 20',    pro: 'Ilimitados',  business: 'Ilimitados' },
  { label: 'Plantillas disponibles',   free: true,          pro: true,          business: true },
  { label: 'Recibe pedidos al instante', free: true,        pro: true,          business: true },
  { label: 'Código QR de tu tienda',   free: true,          pro: true,          business: true },
  { label: 'Sin comisiones por venta', free: true,          pro: true,          business: true },
  { label: 'Panel de estadísticas',    free: false,         pro: true,          business: true },
  { label: 'Historial de pedidos',     free: false,         pro: true,          business: true },
  { label: 'Secciones personalizadas', free: false,         pro: true,          business: true },
  { label: 'Soporte prioritario',      free: false,         pro: true,          business: true },
  { label: 'Múltiples tiendas',        free: false,         pro: false,         business: true },
  { label: 'Dominio personalizado',    free: false,         pro: false,         business: true },
  { label: 'Reportes avanzados',       free: false,         pro: false,         business: true },
]

const FAQ_ITEMS = [
  {
    question: '¿Cobran algo por cada pedido que recibo?',
    answer: 'No. Nunca. Tu plan es fijo mensual y lo que vendés queda en tu bolsillo.',
  },
  {
    question: '¿Puedo subir de plan después?',
    answer: 'Sí, en cualquier momento. También podés bajar o cancelar, sin penalizaciones.',
  },
  {
    question: '¿El plan gratis tiene alguna trampa?',
    answer: 'No. Es gratis con hasta 20 productos. Cuando necesités más, podés pasar al plan Pro.',
  },
  {
    question: '¿Qué pasa si llego al límite de 20 productos?',
    answer: 'Te avisamos. Podés subir al plan Pro en un clic y seguir cargando.',
  },
]

type PlanKey = 'free' | 'pro' | 'business'

interface Plan {
  key: PlanKey
  name: string
  price: string
  period: string
  tagline: string
  ctaLabel: string
  ctaHref: string
  isPro?: boolean
}

const PLANS: Plan[] = [
  {
    key: 'free',
    name: 'Gratis',
    price: '$0',
    period: 'para siempre',
    tagline: 'Para empezar hoy, sin arriesgar nada',
    ctaLabel: 'Empezar gratis',
    ctaHref: '/auth?mode=register',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49.900',
    period: 'COP / mes',
    tagline: 'Para cuando el negocio ya despegó',
    ctaLabel: 'Empezar con Pro',
    ctaHref: '/auth?mode=register&plan=pro',
    isPro: true,
  },
  {
    key: 'business',
    name: 'Negocio',
    price: '$99.900',
    period: 'COP / mes',
    tagline: 'Para el que maneja más de una tienda',
    ctaLabel: 'Hablar con ventas',
    ctaHref: 'https://wa.me/573000000000?text=Hola%2C%20quiero%20info%20del%20Plan%20Negocio',
  },
]

// ─── Feature row ─────────────────────────────────────────────────────────────

function FeatureRow({ value, label, isPro }: { value: FeatureValue; label: string; isPro?: boolean }) {
  const checkColor = isPro ? '#18181b' : '#52525b'
  const dashColor = '#d4d4d8'

  const indicator = () => {
    if (typeof value === 'string') {
      return (
        <span
          className="text-xs font-semibold shrink-0"
          style={{ color: isPro ? '#18181b' : '#71717a', fontFamily: "'Aeonik', sans-serif" }}
        >
          {value}
        </span>
      )
    }
    if (value) {
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" aria-label="Incluido">
          <circle cx="10" cy="10" r="9" fill={isPro ? 'rgba(24,24,27,0.08)' : 'rgba(24,24,27,0.05)'} />
          <path
            d="M6.5 10l2.5 2.5 4.5-5"
            stroke={checkColor}
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
        style={{ backgroundColor: dashColor }}
        aria-label="No incluido"
      />
    )
  }

  return (
    <div className="flex items-center gap-3">
      {indicator()}
      <span
        className="text-sm leading-snug"
        style={{ color: value ? '#3f3f46' : '#a1a1aa', fontFamily: "'Aeonik', sans-serif" }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Plan card ───────────────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: Plan }) {
  const { key, name, price, period, ctaLabel, ctaHref, isPro } = plan

  const cardStyle: React.CSSProperties = isPro
    ? {
        backgroundColor: '#ffffff',
        border: '2px solid #18181b',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        position: 'relative',
      }
    : {
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: 16,
        position: 'relative',
      }

  return (
    <div className="flex flex-col" style={cardStyle}>
      {/* "Más popular" badge */}
      {isPro && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-full"
          style={{ top: 0 }}
        >
          <span
            className="inline-flex items-center px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
            style={{
              backgroundColor: '#18181b',
              color: '#fff',
              letterSpacing: '0.08em',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Más popular
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Plan name */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: isPro ? '#18181b' : '#71717a', letterSpacing: '0.12em', fontFamily: "'Aeonik', sans-serif" }}
        >
          {name}
        </p>

        {/* Price */}
        <div className="mb-1">
          <span className="text-4xl font-bold" style={{ color: '#18181b', fontFamily: "'Aeonik', sans-serif" }}>
            {price}
          </span>
        </div>

        {/* Period */}
        <p className="text-xs mb-6" style={{ color: '#71717a', fontFamily: "'Aeonik', sans-serif" }}>
          {period}
        </p>

        {/* CTA */}
        {isPro ? (
          <a
            href={ctaHref}
            className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 mb-6 block"
            style={{
              backgroundColor: '#18181b',
              borderRadius: 12,
              fontFamily: "'Aeonik', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#27272a' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#18181b' }}
          >
            {ctaLabel}
          </a>
        ) : (
          <a
            href={ctaHref}
            className="w-full text-center px-4 py-2.5 text-sm font-semibold transition-colors duration-200 mb-6 block"
            style={{
              color: '#18181b',
              border: '1px solid #e4e4e7',
              borderRadius: 12,
              backgroundColor: 'transparent',
              fontFamily: "'Aeonik', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f4f5' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {ctaLabel}
          </a>
        )}

        {/* Divider */}
        <div className="mb-5" style={{ height: 1, backgroundColor: isPro ? '#e4e4e7' : '#f4f4f5' }} />

        {/* Features list */}
        <ul className="flex flex-col gap-3">
          {FEATURES.map((feat) => (
            <li key={feat.label}>
              <FeatureRow label={feat.label} value={feat[key]} isPro={isPro} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col" style={{ borderTop: '1px solid #e4e4e7' }}>
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = activeIndex === i
        return (
          <div
            key={i}
            className="py-5"
            style={{ borderBottom: '1px solid #e4e4e7' }}
          >
            <button
              type="button"
              className="flex items-center justify-between gap-4 w-full text-left"
              aria-expanded={isOpen}
              onClick={() => setActiveIndex(isOpen ? null : i)}
            >
              <span className="text-base font-medium" style={{ color: '#18181b', fontFamily: "'Aeonik', sans-serif" }}>
                {item.question}
              </span>
              <svg
                className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <path
                  d="M10 4v12M4 10h12"
                  stroke="#71717a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {isOpen && (
              <p
                className="pt-3 text-sm leading-relaxed"
                style={{ color: '#71717a', fontFamily: "'Aeonik', sans-serif" }}
              >
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────

export function PartnersSection() {
  return (
    <section
      id="precios"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#fafafa' }}
      aria-labelledby="pricing-title"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#71717a', fontFamily: "'Aeonik', sans-serif" }}
          >
            Precios
          </p>
          <h2
            id="pricing-title"
            className="font-bold tracking-tight mb-4"
            style={{
              color: '#18181b',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontFamily: "'Aeonik', sans-serif",
            }}
          >
            Sin letra chica ni sorpresas
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: '#71717a', fontFamily: "'Aeonik', sans-serif" }}
          >
            Una tarifa mensual fija. Cero comisiones por venta. Lo que vendás es tuyo.
          </p>
        </div>

        {/* 3 plan cards — desktop: 3 cols, mobile: stack */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          style={{ paddingTop: 24 }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={plan.isPro ? 'relative md:-mt-4' : ''}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Plan taglines — desktop only */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6 mt-6 px-2">
          {PLANS.map((plan) => (
            <p
              key={plan.key}
              className="text-xs text-center"
              style={{ color: plan.isPro ? '#18181b' : '#a1a1aa', fontFamily: "'Aeonik', sans-serif" }}
            >
              {plan.tagline}
            </p>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 md:mt-24">
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: '#18181b', fontFamily: "'Aeonik', sans-serif" }}
          >
            Preguntas frecuentes
          </h3>
          <FaqAccordion />
        </div>

      </div>
    </section>
  )
}
