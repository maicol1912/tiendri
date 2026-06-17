// Furniture Dark — Footer
// Social links as dark circles + "Creado con Tiendri" in primary color
// ALL colors via var(--t-*)

import type { StorefrontStore } from "../types";

// Inline SVG icons — lucide-react doesn't always export brand icons
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

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

interface FooterProps {
  store: StorefrontStore;
}

export function Footer({ store }: FooterProps) {
  return (
    <footer
      className="px-5 py-8 pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)", borderTop: "1px solid var(--t-border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        {/* Store name */}
        <div>
          <p
            className="font-semibold text-[var(--t-foreground)]"
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
              className="mt-1 max-w-xs"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "var(--t-text-secondary)",
              }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {store.social_links?.instagram && (
            <a
              href={store.social_links.instagram.startsWith("http") ? store.social_links.instagram : `https://instagram.com/${store.social_links.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-80 no-underline"
              style={{ backgroundColor: "var(--t-secondary)", color: "var(--t-foreground)" }}
            >
              <InstagramIcon size={16} />
            </a>
          )}
          {store.social_links?.facebook && (
            <a
              href={store.social_links.facebook.startsWith("http") ? store.social_links.facebook : `https://facebook.com/${store.social_links.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-80 no-underline"
              style={{ backgroundColor: "var(--t-secondary)", color: "var(--t-foreground)" }}
            >
              <FacebookIcon size={16} />
            </a>
          )}
          {store.social_links?.tiktok && (
            <a
              href={store.social_links.tiktok.startsWith("http") ? store.social_links.tiktok : `https://tiktok.com/@${store.social_links.tiktok.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-80 no-underline"
              style={{ backgroundColor: "var(--t-secondary)", color: "var(--t-foreground)" }}
            >
              <TikTokIcon size={16} />
            </a>
          )}
        </div>

        {/* Branding */}
        <p
          className="text-xs"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            color: "var(--t-muted)",
          }}
        >
          Creado con{" "}
          <a
            href="https://tiendri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold no-underline"
            style={{ color: "var(--t-primary)" }}
          >
            Tiendri
          </a>
        </p>
      </div>
    </footer>
  );
}
