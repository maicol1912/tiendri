'use client'

import { forwardRef } from 'react'

interface HeroSectionProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  function HeroSection({ sectionRef }, ref) {
    return (
      <section
        ref={sectionRef || ref}
        className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden"
      >
        {/* Video background — recorded from Spline 3D scene */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/videos/hero-spline.mp4"
          />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-16 pt-32">
          <p
            className="animate-fade-up text-landing-fg/70 text-sm font-light tracking-widest uppercase mb-3 font-sora italic"
            style={{ animationDelay: '0.1s' }}
          >
            listo en 5 minutos
          </p>

          <h1
            className="animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-landing-fg mb-2 md:mb-4 uppercase font-sora"
            style={{ animationDelay: '0.2s' }}
          >
            TU NEGOCIO <span className="text-landing-primary">ONLINE</span>
          </h1>

          <p
            className="animate-fade-up text-landing-fg/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6 font-sora"
            style={{ animationDelay: '0.4s' }}
          >
            Sube tus productos, comparte el link y recibe cada pedido por WhatsApp.
          </p>

          <p
            className="animate-fade-up text-landing-muted-fg text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8 font-sora"
            style={{ animationDelay: '0.55s' }}
          >
            Tu catálogo profesional en minutos. Cero comisiones por venta.
            Pedidos organizados directo a tu WhatsApp. Sin código, sin complicaciones.
          </p>

          <div
            className="animate-fade-up flex flex-wrap gap-3 font-bold font-sora"
            style={{ animationDelay: '0.7s' }}
          >
            <a
              href="/auth?mode=register"
              className="pointer-events-auto bg-landing-primary text-landing-primary-fg px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97]"
            >
              Crear mi tienda gratis
            </a>
            <a
              href="#plantillas"
              className="pointer-events-auto bg-white text-hero-bg px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97]"
            >
              Ver plantillas
            </a>
          </div>

          <p
            className="animate-fade-up text-landing-muted-fg/60 text-xs font-light mt-4 md:mt-6 font-sora"
            style={{ animationDelay: '0.85s' }}
          >
            Sin tarjeta de crédito · Sin comisiones · Empieza gratis hoy
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-hero-bg z-[2] pointer-events-none" />
      </section>
    )
  }
)

export default HeroSection
