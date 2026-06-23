'use client'

/**
 * Footer — Tiendri Landing (Ember Core)
 *
 * Dark, minimal footer. bg-deep — fuses visually with CtaSection above.
 * Static reference element — hover colors handled via inline event handlers.
 *
 * Layout:
 *   Top: Logo + tagline (left) | Links (right)
 *   Bottom: Copyright (left) | Legal links (right)
 */

export function Footer() {
  const currentYear = 2026

  const linkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--ember-text-primary)'
  }
  const linkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--ember-text-secondary)'
  }
  const mutedHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--ember-text-secondary)'
  }
  const mutedLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--ember-text-muted)'
  }

  return (
    <footer
      style={{
        backgroundColor: 'var(--ember-bg-deep)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Top section */}
        <div
          className="py-12 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-10"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Brand + tagline */}
          <div className="flex flex-col gap-3.5 max-w-xs">
            <a
              href="/"
              className="inline-flex items-center w-fit"
              aria-label="Tiendri — inicio"
            >
              <img
                src="/images/logo-dark.png"
                alt="Tiendri"
                className="h-16 sm:h-24 w-auto -my-3 sm:-my-6"
                style={{ mixBlendMode: 'lighten' }}
              />
            </a>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
            >
              La tienda online de los que nunca tuvieron una.
            </p>
          </div>

          {/* Navigation — two columns */}
          <nav aria-label="Links del footer" className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
              >
                Producto
              </span>
              <ul className="flex flex-col gap-2.5" role="list">
                {[
                  { href: '/', label: 'Inicio' },
                  { href: '#precios', label: 'Precios' },
                  { href: '#plantillas', label: 'Plantillas' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm py-1 transition-colors duration-180"
                      style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
                      onMouseEnter={linkHover}
                      onMouseLeave={linkLeave}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
              >
                Cuenta
              </span>
              <ul className="flex flex-col gap-2.5" role="list">
                {[
                  { href: '/auth?mode=register', label: 'Crear mi tienda' },
                  { href: '/auth', label: 'Ingresar' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm py-1 transition-colors duration-180"
                      style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-secondary)' }}
                      onMouseEnter={linkHover}
                      onMouseLeave={linkLeave}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
          >
            © {currentYear} Tiendri · tiendri.com
          </p>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/legal/terminos"
              className="text-xs py-1 transition-colors duration-180"
              style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
              onMouseEnter={mutedHover}
              onMouseLeave={mutedLeave}
            >
              Términos y condiciones
            </a>
            <span style={{ color: 'rgba(255,255,255,0.1)' }} aria-hidden="true">·</span>
            <a
              href="/legal/privacidad"
              className="text-xs py-1 transition-colors duration-180"
              style={{ fontFamily: 'var(--ember-font-body)', color: 'var(--ember-text-muted)' }}
              onMouseEnter={mutedHover}
              onMouseLeave={mutedLeave}
            >
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
