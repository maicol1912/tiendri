import type { ReactNode } from 'react';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/for-business', label: 'For business' },
];

const LEGAL_LINKS = [
  { href: '#', label: 'Cookie Settings' },
  { href: 'https://www.nubreedhotels.com/privacy-policy', label: 'Privacy Policy', external: true },
  { href: 'https://www.nubreedhotels.com/terms-of-service', label: 'Terms of Service', external: true },
];

function FooterSocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-500 hover:text-black transition-colors"
    >
      {children}
    </a>
  );
}

/**
 * Footer section.
 * The original uses a sticky footer pattern (footer-height-set → footer-sticky)
 * to create a parallax scroll-up effect where the footer appears to be revealed
 * from beneath the previous section. We replicate this with the same approach.
 */
export function Footer() {
  return (
    <section className="footer-sc">
      {/* Height wrapper — creates the sticky reveal effect */}
      <div style={{ minHeight: '80vh', position: 'relative' }}>
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: '#fff',
          }}
        >
          <footer className="max-w-5xl mx-auto px-4 py-16" aria-label="Site footer">

            {/* Top row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
              {/* Logo */}
              <a href="/" aria-label="EventBeds home" className="text-2xl font-black tracking-tight">
                EventBeds™
              </a>

              <p className="text-sm text-gray-500">EventBeds™ is a trading name of NuBreed Hotels Ltd.</p>

              {/* Social */}
              <div className="flex gap-4">
                <FooterSocialLink href="https://www.linkedin.com/company/nubreed-hotels/" label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <path d="M16.2 0H1.8C0.81 0 0 0.81 0 1.8V16.2C0 17.19 0.81 18 1.8 18H16.2C17.19 18 18 17.19 18 16.2V1.8C18 0.81 17.19 0 16.2 0ZM5.4 15.3H2.7V6.75H5.4V15.3ZM4.05 5.58C3.15 5.58 2.43 4.86 2.43 3.96C2.43 3.06 3.15 2.34 4.05 2.34C4.95 2.34 5.67 3.06 5.67 3.96C5.67 4.86 4.95 5.58 4.05 5.58ZM15.3 15.3H12.6V10.8C12.6 9.99 12.6 8.91 11.43 8.91C10.26 8.91 10.08 9.81 10.08 10.71V15.3H7.38V6.75H9.99V7.74H10.02C10.395 7.065 11.25 6.57 12.33 6.57C15.06 6.57 15.3 8.37 15.3 10.71V15.3Z" />
                  </svg>
                </FooterSocialLink>
                <FooterSocialLink href="https://www.instagram.com/nubreedhotels/" label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="13.25" cy="4.75" r="1" fill="currentColor" />
                  </svg>
                </FooterSocialLink>
                <FooterSocialLink href="https://www.facebook.com/nubreedhotels/" label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <path d="M17 1H1C0.45 1 0 1.45 0 2V16C0 16.55 0.45 17 1 17H9.615V10.64H7.276V8.009H9.615V6.01C9.615 3.69 11.063 2.398 13.14 2.398C14.133 2.398 14.985 2.471 15.24 2.505V4.93H13.782C12.657 4.93 12.439 5.466 12.439 6.254V8.009H15.148L14.798 10.64H12.439V17H17C17.55 17 18 16.55 18 16V2C18 1.45 17.55 1 17 1Z" />
                  </svg>
                </FooterSocialLink>
              </div>
            </div>

            {/* Middle rows */}
            <div className="grid md:grid-cols-2 gap-10 py-8 border-b border-gray-100">
              {/* Sitemap */}
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sitemap</h2>
                <div className="flex flex-col gap-2">
                  {FOOTER_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Address</h2>
                <address className="not-italic text-sm text-gray-500 leading-relaxed">
                  NuBreed Hotels Ltd<br />
                  1 Park Row, Leeds, LS1 5HN, United Kingdom<br />
                  IATA Accredited Agent: 96093104
                </address>
                <div className="flex gap-4 mt-4 items-center">
                  <img
                    src="/clone-assets/footer-brand-2.avif"
                    alt=""
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                  <img
                    src="/clone-assets/footer-brand-1.avif"
                    alt=""
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                  <img
                    src="/clone-assets/footer-iso.avif"
                    alt="ISO 27001 Certified"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
              <p className="text-xs text-gray-400">
                EventBeds™ by NuBreed Hotels © 2026. All rights reserved.
              </p>
              <div className="flex gap-6">
                {LEGAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs text-gray-400 hover:text-black transition-colors"
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
