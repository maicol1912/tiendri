export function PricingSection() {
  return (
    <section
      id="precios"
      className="overflow-hidden"
      style={{ borderRadius: '0 0 24px 24px' }}
      aria-labelledby="pricing-section-heading"
    >
      <div className="bg-hero-bg px-6 lg:px-10 py-24 lg:py-[130px]">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-6">
          <h2
            id="pricing-section-heading"
            className="text-landing-fg font-black leading-tight text-center font-sora"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Vende sin complicaciones
          </h2>
          <p
            className="text-landing-muted-fg text-base max-w-xl leading-relaxed text-center font-sora"
          >
            Sube tus productos, comparte el link y recibe cada pedido con el detalle completo.
            Sin andar preguntando precio por precio. Sin comisiones. Sin letra chica.
          </p>
        </div>
      </div>
    </section>
  );
}
