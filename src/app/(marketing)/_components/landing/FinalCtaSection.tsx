/**
 * FinalCtaSection — Tiendri Landing
 *
 * Centered single-column layout: label → heading → subtitle → CTA → trust → stats.
 */

const STATS = [
  { value: '5 min', label: 'para tener tu tienda' },
  { value: '$0', label: 'para empezar' },
  { value: '0%', label: 'de comisión' },
];

export function FinalCtaSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}
      aria-labelledby="final-cta-heading"
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>

        <p style={{ color: 'hsl(0, 0%, 60%)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Sora', sans-serif" }}>
          EMPIEZA HOY
        </p>

        <h2
          id="final-cta-heading"
          style={{ color: 'hsl(0, 0%, 96%)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, fontSize: 'clamp(36px, 5vw, 64px)', fontFamily: "'Sora', sans-serif" }}
        >
          ¿Listo para crear tu tienda?
        </h2>

        <p style={{ color: 'hsl(0, 0%, 60%)', fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.6, maxWidth: 560, margin: '0 auto 36px', fontFamily: "'Sora', sans-serif" }}>
          Miles de negocios en Colombia y LATAM ya están vendiendo con Tiendri. La tienda que nunca tuviste te espera.
        </p>

        <a
          href="/auth?mode=register"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(221, 83%, 53%)',
            color: 'hsl(0, 0%, 4%)',
            fontWeight: 700,
            fontSize: 16,
            padding: '16px 36px',
            borderRadius: 12,
            textDecoration: 'none',
            marginBottom: 16,
            fontFamily: "'Sora', sans-serif",
          }}
        >
          Crear mi tienda gratis &nbsp;→
        </a>

        <p style={{ color: 'hsl(0, 0%, 60%)', fontSize: 13, marginBottom: 64, fontFamily: "'Sora', sans-serif" }}>
          Empieza gratis.{' '}
          <strong style={{ color: 'hsl(0, 0%, 75%)', fontWeight: 600 }}>Sin tarjeta de crédito.</strong>
          {' '}Sin comisiones.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            borderTop: '1px solid hsl(0, 0%, 20%)',
            paddingTop: 40,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                maxWidth: 180,
                padding: '0 24px',
                borderLeft: i > 0 ? '1px solid hsl(0, 0%, 20%)' : 'none',
              }}
            >
              <p style={{ color: 'hsl(0, 0%, 96%)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.1, marginBottom: 6, letterSpacing: '-0.02em', fontFamily: "'Sora', sans-serif" }}>
                {stat.value}
              </p>
              <p style={{ color: 'hsl(0, 0%, 60%)', fontSize: 13, lineHeight: 1.4, fontFamily: "'Sora', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
