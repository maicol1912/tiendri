'use client'

/**
 * HowItWorksSection — Tiendri Landing (Ember Core)
 *
 * "Tres pasos y ya estás vendiendo"
 *
 * Animations:
 *   - Timeline line: GSAP ScrollTrigger scrub — grows as user scrolls
 *   - Step cards: Framer Motion whileInView fade-up 40px
 *   - Step icons: static drop-shadow (clay icons with built-in glow)
 */

import { useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Step card variants (Valentina's layout — unchanged) ──

interface StepCardProps {
  number: string
  title: string
  description: ReactNode
  visual?: ReactNode
  variant?: 'default' | 'narrow' | 'reversed'
}

function StepCard({ number, title, description, variant = 'default' }: StepCardProps) {
  if (variant === 'narrow') {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--ember-bg-elevated)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="p-5 md:p-7 lg:p-9">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{ fontFamily: 'var(--ember-font-display)', color: 'var(--ember-text-primary)' }}
            >
              {title}
            </h3>
            <span
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none flex-shrink-0 select-none"
              style={{
                fontFamily: 'var(--ember-font-display)',
                color: 'rgba(185,28,28,0.28)',
                letterSpacing: '-0.05em',
              }}
              aria-hidden="true"
            >
              {number}
            </span>
          </div>
          <div
            className="text-base leading-relaxed"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
          >
            {description}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'reversed') {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--ember-bg-elevated)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="p-5 md:p-8 lg:p-10 flex flex-col justify-center">
          <span
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 select-none block"
            style={{
              fontFamily: 'var(--ember-font-display)',
              color: 'rgba(185,28,28,0.28)',
              letterSpacing: '-0.05em',
            }}
            aria-hidden="true"
          >
            {number}
          </span>
          <h3
            className="text-xl md:text-2xl font-bold mb-4"
            style={{ fontFamily: 'var(--ember-font-display)', color: 'var(--ember-text-primary)' }}
          >
            {title}
          </h3>
          <div
            className="text-base leading-relaxed"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
          >
            {description}
          </div>
        </div>
      </div>
    )
  }

  // Default
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--ember-bg-elevated)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="p-5 md:p-8 lg:p-10 flex flex-col justify-center">
        <span
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 select-none block"
          style={{
            fontFamily: 'var(--ember-font-display)',
            color: 'rgba(185,28,28,0.28)',
            letterSpacing: '-0.05em',
          }}
          aria-hidden="true"
        >
          {number}
        </span>
        <h3
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ fontFamily: 'var(--ember-font-display)', color: 'var(--ember-text-primary)' }}
        >
          {title}
        </h3>
        <div
          className="text-base leading-relaxed"
          style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function HowItWorksSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!lineRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.6,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="como-funciona"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--ember-bg-base)' }}
      aria-labelledby="how-it-works-title"
    >
      {/* Ambient glow — right side */}
      <div
        className="absolute top-1/3 -right-40 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section header */}
        <motion.div
          className="mb-14 md:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-red-400)' }}
          >
            El proceso
          </p>
          <h2
            id="how-it-works-title"
            className="font-bold leading-[1.1] md:leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--ember-font-display)',
              color: 'var(--ember-text-primary)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
            }}
          >
            Tres pasos y ya estás vendiendo
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative flex flex-col gap-0">

          {/* Vertical timeline line — GSAP scrub */}
          <div
            className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0 top-0 bottom-0 w-px block"
            style={{ backgroundColor: 'rgba(185,28,28,0.15)' }}
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              className="w-full h-full"
              style={{
                background: 'var(--ember-red-600)',
                transformOrigin: 'top center',
              }}
            />
          </div>

          {/* ── STEP 1: Crea tu tienda ── */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 pb-6">
            <motion.div
              className="flex flex-shrink-0 w-auto md:w-40 items-center justify-center z-10 relative"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              aria-hidden="true"
            >
              <div
                className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--ember-bg-elevated)',
                  border: '2px solid rgba(185,28,28,0.3)',
                  boxShadow: '0 0 30px rgba(185,28,28,0.15)',
                }}
              >
                <Image
                  src="/images/icons/icon-create-store.png"
                  alt="Crea tu tienda"
                  width={100}
                  height={100}
                  className="object-contain w-16 h-16 md:w-[100px] md:h-[100px]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <StepCard
                number="01"
                title="Crea tu tienda"
                description={
                  <>
                    Sube tus productos, elige una plantilla y ajusta los colores con tu logo.
                    No necesitas diseñador ni saber nada de páginas web. La tienda queda activa
                    desde el primer día en tu propia URL:{' '}
                    <span style={{ color: 'var(--ember-red-400)' }}>tiendri.com/tu-negocio</span>.
                  </>
                }
              />
            </motion.div>
          </div>

          {/* ── STEP 2: Compártela ── */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 pb-6">
            <motion.div
              className="flex flex-shrink-0 w-auto md:w-40 items-center justify-center z-10 relative"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              aria-hidden="true"
            >
              <div
                className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--ember-bg-elevated)',
                  border: '2px solid rgba(185,28,28,0.3)',
                  boxShadow: '0 0 30px rgba(185,28,28,0.15)',
                }}
              >
                <Image
                  src="/images/icons/icon-share.png"
                  alt="Compártela"
                  width={100}
                  height={100}
                  className="object-contain w-16 h-16 md:w-[100px] md:h-[100px]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <StepCard
                number="02"
                variant="narrow"
                title="Compártela"
                description={
                  <>
                    Manda el link por donde ya estás: estados, grupos, Instagram, o imprime el
                    código QR y pégalo en el mostrador. Tus clientes la abren en el celular,{' '}
                    <span style={{ color: 'var(--ember-text-primary)', fontWeight: 500 }}>
                      sin apps, sin registro.
                    </span>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['WhatsApp', 'Instagram', 'Estados', 'QR Físico'].map((ch) => (
                        <span
                          key={ch}
                          className="px-2.5 py-1 text-xs font-medium"
                          style={{
                            fontFamily: 'var(--ember-font-body)',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 'var(--ember-radius-badge)',
                            color: 'var(--ember-text-secondary)',
                          }}
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </>
                }
              />
            </motion.div>
          </div>

          {/* ── STEP 3: Recibe los pedidos ── */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
            <motion.div
              className="flex flex-shrink-0 w-auto md:w-40 items-center justify-center z-10 relative"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              aria-hidden="true"
            >
              <div
                className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--ember-bg-elevated)',
                  border: '2px solid rgba(185,28,28,0.3)',
                  boxShadow: '0 0 30px rgba(185,28,28,0.15)',
                }}
              >
                <Image
                  src="/images/icons/icon-orders.png"
                  alt="Recibe los pedidos organizados"
                  width={100}
                  height={100}
                  className="object-contain w-16 h-16 md:w-[100px] md:h-[100px]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <StepCard
                number="03"
                variant="reversed"
                title="Recibe los pedidos organizados"
                description={
                  <>
                    Cuando alguien hace un pedido, te llega con todo incluido: productos,
                    cantidades, variantes y datos del cliente.{' '}
                    <span style={{ color: 'var(--ember-text-primary)', fontWeight: 500 }}>
                      Sin que tengas que preguntar nada.
                    </span>{' '}
                    Funciona con WhatsApp y seguimos sumando canales.
                  </>
                }
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
