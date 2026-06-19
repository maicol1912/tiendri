import type { ReactNode } from 'react';

const FOOTER_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '#precios', label: 'Precios' },
  { href: '#plantillas', label: 'Plantillas' },
  { href: '#como-funciona', label: 'Cómo funciona' },
];

const ACCOUNT_LINKS = [
  { href: '/auth?mode=register', label: 'Crear mi tienda' },
  { href: '/auth', label: 'Ingresar' },
];

const LEGAL_LINKS = [
  { href: '/legal/privacidad', label: 'Política de privacidad' },
  { href: '/legal/terminos', label: 'Términos y condiciones' },
];

function FooterSocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ color: '#999', transition: 'color 0.2s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
    >
      {children}
    </a>
  );
}

/**
 * Footer section.
 * Uses a sticky footer pattern (footer-height-set → footer-sticky)
 * to create a parallax scroll-up effect where the footer appears to be revealed
 * from beneath the previous section.
 */
export function Footer() {
  return (
    <section className="footer-sc">
      {/* Footer container — flush to bottom with floating look */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            background: 'hsl(0, 0%, 4%)',
            borderRadius: '24px 24px 0 0',
            overflow: 'hidden',
          }}
        >
          <footer className="max-w-5xl mx-auto px-4 py-16" aria-label="Pie de página de Tiendri">

            {/* Top row */}
            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8"
              style={{ borderBottom: '1px solid hsl(0, 0%, 20%)' }}
            >
              {/* Logo */}
              <a
                href="/"
                aria-label="Tiendri — inicio"
                className="text-2xl font-black tracking-tight"
                style={{ color: '#fff', fontFamily: "'Sora', sans-serif" }}
              >
                tiendri
              </a>

              <p className="text-sm" style={{ color: '#999', fontFamily: "'Sora', sans-serif" }}>
                Tiendri es la plataforma para crear tu tienda online en minutos.
              </p>

              {/* Social */}
              <div className="flex gap-4">
                <FooterSocialLink href="https://www.linkedin.com/company/tiendri/" label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <path d="M16.2 0H1.8C0.81 0 0 0.81 0 1.8V16.2C0 17.19 0.81 18 1.8 18H16.2C17.19 18 18 17.19 18 16.2V1.8C18 0.81 17.19 0 16.2 0ZM5.4 15.3H2.7V6.75H5.4V15.3ZM4.05 5.58C3.15 5.58 2.43 4.86 2.43 3.96C2.43 3.06 3.15 2.34 4.05 2.34C4.95 2.34 5.67 3.06 5.67 3.96C5.67 4.86 4.95 5.58 4.05 5.58ZM15.3 15.3H12.6V10.8C12.6 9.99 12.6 8.91 11.43 8.91C10.26 8.91 10.08 9.81 10.08 10.71V15.3H7.38V6.75H9.99V7.74H10.02C10.395 7.065 11.25 6.57 12.33 6.57C15.06 6.57 15.3 8.37 15.3 10.71V15.3Z" />
                  </svg>
                </FooterSocialLink>
                <FooterSocialLink href="https://www.instagram.com/tiendri/" label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="13.25" cy="4.75" r="1" fill="currentColor" />
                  </svg>
                </FooterSocialLink>
                <FooterSocialLink href="https://www.facebook.com/tiendri/" label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <path d="M17 1H1C0.45 1 0 1.45 0 2V16C0 16.55 0.45 17 1 17H9.615V10.64H7.276V8.009H9.615V6.01C9.615 3.69 11.063 2.398 13.14 2.398C14.133 2.398 14.985 2.471 15.24 2.505V4.93H13.782C12.657 4.93 12.439 5.466 12.439 6.254V8.439V10.64H15.148L14.798 10.64H12.439V17H17C17.55 17 18 16.55 18 16V2C18 1.45 17.55 1 17 1Z" />
                  </svg>
                </FooterSocialLink>
              </div>
            </div>

            {/* Middle rows — PRODUCTO + CUENTA */}
            <div
              className="grid md:grid-cols-2 gap-10 py-8"
              style={{ borderBottom: '1px solid hsl(0, 0%, 20%)' }}
            >
              {/* PRODUCTO */}
              <div>
                <h2
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: 'hsl(221, 83%, 53%)', fontFamily: "'Sora', sans-serif" }}
                >
                  Producto
                </h2>
                <div className="flex flex-col gap-2">
                  {FOOTER_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: '#ccc', fontFamily: "'Sora', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* CUENTA */}
              <div>
                <h2
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: 'hsl(221, 83%, 53%)', fontFamily: "'Sora', sans-serif" }}
                >
                  Cuenta
                </h2>
                <div className="flex flex-col gap-2">
                  {ACCOUNT_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: '#ccc', fontFamily: "'Sora', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter section */}
            <div
              className="py-8"
              style={{ borderBottom: '1px solid hsl(0, 0%, 20%)' }}
            >
              <p className="text-sm font-semibold mb-4" style={{ color: '#fff', fontFamily: "'Sora', sans-serif" }}>
                Suscribite a nuestro newsletter
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 text-sm px-4 py-2.5 rounded outline-none"
                  style={{
                    background: 'hsl(0, 0%, 14%)',
                    border: '1px solid hsl(0, 0%, 22%)',
                    color: '#fff',
                    fontFamily: "'Sora', sans-serif",
                  }}
                />
                <button
                  type="button"
                  className="text-sm font-semibold px-5 py-2.5 rounded transition-opacity hover:opacity-90"
                  style={{
                    background: 'hsl(221, 83%, 53%)',
                    color: 'hsl(0, 0%, 4%)',
                    whiteSpace: 'nowrap',
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  Suscribirse
                </button>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 shrink-0"
                  style={{ accentColor: 'hsl(221, 83%, 53%)' }}
                />
                <span className="text-xs leading-relaxed" style={{ color: '#777', fontFamily: "'Sora', sans-serif" }}>
                  Acepto recibir comunicaciones de Tiendri y acepto la{' '}
                  <a
                    href="/legal/privacidad"
                    className="underline transition-colors"
                    style={{ color: '#999', fontFamily: "'Sora', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
                  >
                    Política de privacidad
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
              <p className="text-xs" style={{ color: '#666', fontFamily: "'Sora', sans-serif" }}>
                © 2026 Tiendri · tiendri.com. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                {LEGAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs transition-colors"
                    style={{ color: '#666', fontFamily: "'Sora', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
