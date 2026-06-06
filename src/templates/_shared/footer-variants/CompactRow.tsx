import type { FooterProps } from './types'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function FooterCompactRow({ store, showBranding = true }: FooterProps) {
  return (
    <footer
      className="px-5 py-8 pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-footer-bg)", borderTop: "1px solid var(--t-border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        {/* Store name */}
        <div>
          <p
            className="font-semibold text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.54px",
            }}
          >
            {store.name}
          </p>
          {store.description && (
            <p
              className="mt-1 text-[var(--t-text-footer)] max-w-xs"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {[
            { Icon: InstagramIcon, label: "Instagram" },
            { Icon: FacebookIcon, label: "Facebook" },
            { Icon: TwitterIcon, label: "X (Twitter)" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: "var(--t-secondary)" }}
            >
              <span className="text-[var(--t-text-primary)]">
                <Icon size={16} />
              </span>
            </button>
          ))}
        </div>

        {/* Branding */}
        {showBranding && (
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              color: "var(--t-text-footer)",
            }}
          >
            Creado con{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--t-primary)" }}
            >
              Tiendri
            </span>
          </p>
        )}
      </div>
    </footer>
  );
}
