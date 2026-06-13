// Beauty Soft Template — Store Footer
// Layout styles: minimal (default), columns, centered.
// ZERO hardcoded colors — all via var(--t-*).

import type { StoreInfo } from "@/types/store";

interface FooterProps {
  store: StoreInfo;
  layout?: Record<string, unknown>;
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer({ store }: FooterProps) {
  const { social_links } = store;
  const footerStyle: string = "minimal";

  interface SocialLink { label: string; href: string; icon: React.ReactNode; }
  const socialItems: SocialLink[] = [];

  if (social_links?.instagram) {
    socialItems.push({
      label: "Instagram",
      href: `https://instagram.com/${social_links.instagram.replace("@", "")}`,
      icon: <InstagramIcon />,
    });
  }
  if (social_links?.facebook) {
    socialItems.push({
      label: "Facebook",
      href: `https://facebook.com/${social_links.facebook}`,
      icon: <FacebookIcon />,
    });
  }
  if (social_links?.tiktok) {
    socialItems.push({
      label: "TikTok",
      href: `https://tiktok.com/@${social_links.tiktok.replace("@", "")}`,
      icon: <TikTokIcon />,
    });
  }

  if (footerStyle === "columns") {
    return (
      <footer
        className="w-full pb-24 lg:pb-8"
        style={{ backgroundColor: "var(--t-background)", borderTop: "1px solid var(--t-border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-3">
              <span
                className="text-base font-semibold text-[var(--t-foreground)]"
                style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
              >
                {store.name}
              </span>
              {store.description && (
                <p className="text-sm text-[var(--t-muted)] max-w-xs">{store.description}</p>
              )}
            </div>
            {socialItems.length > 0 && (
              <div className="flex items-center gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] text-[var(--t-muted)]"
                    style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--t-border)", margin: "20px 0" }} />
          <a
            href="https://tiendri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5"
            aria-label="Tienda creada con Tiendri"
          >
            <span className="text-xs text-[var(--t-muted)]">Creado con</span>
            <span className="text-xs font-semibold text-[var(--t-primary)]">Tiendri</span>
          </a>
        </div>
      </footer>
    );
  }

  if (footerStyle === "centered") {
    return (
      <footer
        className="w-full pb-24 lg:pb-8"
        style={{ backgroundColor: "var(--t-background)", borderTop: "1px solid var(--t-border)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 px-4 py-6">
          <span
            className="text-base font-semibold text-[var(--t-foreground)] text-center"
            style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
          >
            {store.name}
          </span>
          {socialItems.length > 0 && (
            <div className="flex items-center gap-4">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] text-[var(--t-muted)]"
                  style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
          <a
            href="https://tiendri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
            aria-label="Tienda creada con Tiendri"
          >
            <span className="text-xs text-[var(--t-muted)]">Creado con</span>
            <span className="text-xs font-semibold text-[var(--t-primary)]">Tiendri</span>
          </a>
        </div>
      </footer>
    );
  }

  // minimal (default)
  return (
    <footer
      className="w-full pb-24 lg:pb-8"
      style={{ backgroundColor: "var(--t-background)", borderTop: "1px solid var(--t-border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 px-4 md:px-6 lg:px-8 py-6">
        {socialItems.length > 0 && (
          <div className="flex items-center gap-4">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] text-[var(--t-muted)]"
                style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        )}
        <a
          href="https://tiendri.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5"
          aria-label="Tienda creada con Tiendri"
        >
          <span className="text-xs text-[var(--t-muted)]">Creado con</span>
          <span className="text-xs font-semibold text-[var(--t-primary)]">Tiendri</span>
        </a>
      </div>
    </footer>
  );
}
