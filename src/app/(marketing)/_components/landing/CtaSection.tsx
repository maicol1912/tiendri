'use client';

import { useEffect } from 'react';

/**
 * CtaSection — Tiendri Landing (Dark theme)
 *
 * Visual structure: clone Benefits (scroll-triggered fade-up on elements).
 * Content: 3 key benefit blocks — "Personalizable", "Sin comisiones", "WhatsApp-first".
 *
 * IntersectionObserver drives fade-up on [data-animate] elements.
 * Image clusters: using benf-col images from clone-assets.
 */

import { useRef } from 'react';

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>('[data-animate]');

    elements.forEach((el) => {
      const delay = el.dataset.animateDelay ?? '0s';
      const baseTransform = el.style.transform || '';
      el.dataset.baseTransform = baseTransform;
      el.style.opacity = '0';
      el.style.transform = `${baseTransform} translateY(30px)`;
      el.style.transition = `opacity 0.6s ease-out ${delay}, transform 0.6s ease-out ${delay}`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const baseTransform = el.dataset.baseTransform || '';
            el.style.opacity = '1';
            el.style.transform = `${baseTransform} translateY(0)`;
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-landing-bg pt-20 pb-24" aria-labelledby="cta-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Section heading */}
        <div className="mb-10 lg:mb-20">
          <h2
            id="cta-heading"
            data-animate
            data-animate-delay="0s"
            className="hidden lg:block font-black leading-tight text-landing-fg font-sora"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
          >
            Lo que te da Tiendri<br />ningún otro te da
          </h2>
          <h2
            data-animate
            data-animate-delay="0s"
            className="block lg:hidden font-black leading-tight text-landing-fg font-sora"
            style={{ fontSize: 'clamp(36px, 8vw, 56px)' }}
          >
            Lo que te da Tiendri ningún otro te da
          </h2>
        </div>

        {/* Benefit 1 — Personalizable: image left, text right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-4 lg:items-center">
          <div data-animate data-animate-delay="0s" className="relative">
            <img
              src="/images/landing/macbook-dashboard.png"
              alt="Dashboard Tiendri en laptop"
              className="w-full rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-landing-fg font-sora"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              Tu tienda, tu marca
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-landing-muted-fg text-base leading-relaxed hidden lg:block font-sora"
            >
              Elige una plantilla, cambia los colores y sube tu logo. En minutos tienes una tienda
              que parece profesional. Tus clientes ven tu marca, no la nuestra.
            </p>
          </div>
        </div>

        {/* Benefit 2 — Sin comisiones: text left, image right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16 lg:items-center">
          <div data-animate data-animate-delay="0.2s" className="relative order-1 lg:order-2 flex justify-center">
            <img
              src="/images/landing/phone-pizzanight.png"
              alt="Tienda Pizzanight en Tiendri"
              className="w-full max-w-[60%] mx-auto lg:max-w-[276px] lg:mx-auto rounded-2xl object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3
              data-animate
              data-animate-delay="0s"
              className="font-black text-landing-fg font-sora"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              0% de comisión, siempre
            </h3>
            <p
              data-animate
              data-animate-delay="0.1s"
              className="text-landing-muted-fg text-base leading-relaxed font-sora"
            >
              Una tarifa mensual fija. Lo que vendas queda en tu bolsillo. Sin sorpresas, sin
              letra chica, sin porcentajes por venta.
            </p>
          </div>
        </div>

        {/* Benefit 3 — WhatsApp-first: image left, text right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
          <div data-animate data-animate-delay="0s" className="relative">
            <img
              src="/images/landing/macbook-petshop.png"
              alt="Tienda Pet Shop en Tiendri"
              className="w-full rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-landing-fg font-sora"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              Pedidos por WhatsApp
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-landing-muted-fg text-base leading-relaxed font-sora"
            >
              Cuando alguien hace un pedido, te llega con todo incluido: productos, cantidades,
              variantes y datos del cliente. Sin que tengas que preguntar nada. ♥
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
