'use client';

import { useEffect } from 'react';

/**
 * CtaSection — Tiendri Landing (Light / Clone style)
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
    <section ref={sectionRef} className="bg-white pt-20 pb-24" aria-labelledby="cta-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Section heading */}
        <div className="mb-10 lg:mb-20">
          <h2
            id="cta-heading"
            data-animate
            data-animate-delay="0s"
            className="hidden lg:block font-black leading-tight text-black"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontFamily: "'Aeonik', sans-serif" }}
          >
            Lo que te da Tiendri<br />ningún otro te da
          </h2>
          <h2
            data-animate
            data-animate-delay="0s"
            className="block lg:hidden font-black leading-tight text-black"
            style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontFamily: "'Aeonik', sans-serif" }}
          >
            Lo que te da Tiendri ningún otro te da
          </h2>
        </div>

        {/* Benefit 1 — Personalizable: image left, text right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-4 lg:items-center">
          <div data-animate data-animate-delay="0s" className="relative">
            <div className="block lg:hidden relative" style={{ marginBottom: 80 }}>
              <img src="/clone-assets/benf-col-3.avif" alt="" className="rounded-2xl object-cover" style={{ width: '65%' }} />
              <div className="absolute" style={{ right: 0, bottom: '-40%', width: '43%', zIndex: 10 }}>
                <img src="/clone-assets/benf-col-2.avif" alt="" className="w-full rounded-2xl shadow-2xl" />
              </div>
            </div>
            <div className="hidden lg:flex relative items-start">
              <div className="flex-shrink-0 relative z-0" style={{ width: '55%' }}>
                <img src="/clone-assets/benf-col-3.avif" alt="" className="w-full rounded-2xl object-cover" />
              </div>
              <div className="flex-shrink-0 relative z-10" style={{ width: '55%', marginLeft: '-15%' }}>
                <img src="/clone-assets/benf-col-2.avif" alt="" className="w-full rounded-2xl object-cover" />
                <div className="absolute -bottom-6 -left-4 w-1/2 rounded-xl overflow-hidden shadow-2xl">
                  <img src="/clone-assets/benf-col-1.avif" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-black"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontFamily: "'Aeonik', sans-serif" }}
            >
              Tu tienda, tu marca
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-neutral-500 text-base leading-relaxed hidden lg:block"
              style={{ fontFamily: "'Aeonik', sans-serif" }}
            >
              Elige una plantilla, cambia los colores y sube tu logo. En minutos tienes una tienda
              que parece profesional. Tus clientes ven tu marca, no la nuestra.
            </p>
          </div>
        </div>

        {/* Benefit 2 — Sin comisiones: text left, image right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16 lg:items-center">
          <div data-animate data-animate-delay="0.2s" className="relative order-1 lg:order-2">
            <div className="block lg:hidden">
              <img src="/clone-assets/benf-col-8.avif" alt="" className="w-full rounded-2xl object-cover" />
            </div>
            <div className="hidden lg:block" style={{ transform: 'scale(0.7)', transformOrigin: 'top right' }}>
              <div className="relative">
                <img src="/clone-assets/benf-col-8.avif" alt="" className="w-full rounded-2xl object-cover" />
                <div className="absolute top-1/2 left-0 flex flex-col gap-3 -translate-x-1/2" style={{ transform: 'translateY(70px)' }}>
                  <div className="w-24 rounded-xl overflow-hidden shadow-xl">
                    <img src="/clone-assets/benf-col-6.avif" alt="" className="w-full" />
                  </div>
                  <div className="w-24 rounded-xl overflow-hidden shadow-xl">
                    <img src="/clone-assets/benf-col-9.avif" alt="" className="w-full" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 flex flex-col gap-2" style={{ transform: 'translateY(90px)' }}>
                  <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                    <img src="/clone-assets/benf-col-10.avif" alt="" className="w-full" />
                  </div>
                  <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                    <img src="/clone-assets/benf-col-4.avif" alt="" className="w-full" />
                  </div>
                  <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                    <img src="/clone-assets/benf-col-5.avif" alt="" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3
              data-animate
              data-animate-delay="0s"
              className="font-black text-black"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontFamily: "'Aeonik', sans-serif" }}
            >
              0% de comisión, siempre
            </h3>
            <p
              data-animate
              data-animate-delay="0.1s"
              className="text-neutral-500 text-base leading-relaxed"
              style={{ fontFamily: "'Aeonik', sans-serif" }}
            >
              Una tarifa mensual fija. Lo que vendas queda en tu bolsillo. Sin sorpresas, sin
              letra chica, sin porcentajes por venta.
            </p>
          </div>
        </div>

        {/* Benefit 3 — WhatsApp-first: image left, text right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
          <div data-animate data-animate-delay="0s" className="relative">
            <div className="block lg:hidden relative">
              <img src="/clone-assets/benf-col-13.avif" alt="Pedidos por WhatsApp" className="rounded-2xl object-cover" style={{ width: '65%' }} />
              <div className="absolute" style={{ right: 0, bottom: '-10%', width: '55%', zIndex: 10 }}>
                <img src="/clone-assets/benf-col-12.avif" alt="" className="w-full rounded-2xl shadow-2xl" />
              </div>
            </div>
            <div className="hidden lg:block relative" style={{ transform: 'scale(0.95)', transformOrigin: 'top left', marginLeft: '30%' }}>
              <img src="/clone-assets/benf-col-13.avif" alt="Pedidos por WhatsApp" className="w-full rounded-2xl object-cover" />
              <div className="absolute bottom-0 left-0 flex gap-2" style={{ transform: 'translateY(70px)' }}>
                <div className="w-28 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-12.avif" alt="" className="w-full" />
                </div>
                <div className="w-28 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-11.avif" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-black"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontFamily: "'Aeonik', sans-serif" }}
            >
              Pedidos por WhatsApp
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-neutral-500 text-base leading-relaxed"
              style={{ fontFamily: "'Aeonik', sans-serif" }}
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
