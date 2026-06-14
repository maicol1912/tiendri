// Beauty Soft Template — Store Info Page (Presentational)
// Muestra nombre, descripción, contacto, dirección y redes sociales de la tienda.
// ZERO hardcoded colors — all via var(--t-*).

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo } from "@/types/store";
import type { NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  onBack?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  cartItemCount?: number;
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function StoreInfoPage({ store, onBack, onTabChange, onNavLinkClick, onCartClick, onSearchClick, cartItemCount = 0 }: StoreInfoPageProps) {
  const whatsappHref = store.whatsapp
    ? `https://wa.me/${store.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/info"
        onNavLinkClick={onNavLinkClick}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="max-w-2xl mx-auto px-5 py-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] lg:pb-8 flex flex-col gap-6">
        {/* Encabezado tienda */}
        <div
          className="flex flex-col items-center gap-2 py-6 rounded-[var(--t-radius-card)]"
          style={{ backgroundColor: "var(--t-background)" }}
        >
          <h1
            className="text-[22px] font-semibold text-[var(--t-foreground)] text-center leading-tight tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
          >
            {store.name}
          </h1>

          {store.description && (
            <p
              className="text-sm text-center text-[var(--t-muted)] max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Contacto */}
        <section className="flex flex-col gap-3">
          <h2
            className="text-sm font-semibold text-[var(--t-muted)] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Contacto
          </h2>

          <div
            className="flex flex-col divide-y rounded-[var(--t-radius-card)] overflow-hidden"
            style={{ backgroundColor: "var(--t-background)", borderColor: "var(--t-border)" }}
          >
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3.5 transition-opacity hover:opacity-80"
              >
                <div
                  className="w-9 h-9 rounded-[var(--t-radius-button)] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                >
                  <MessageCircle size={18} strokeWidth={1.75} className="text-[var(--t-primary)]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-[var(--t-muted)]" style={{ fontFamily: "var(--font-sans)" }}>WhatsApp</span>
                  <span className="text-sm font-medium text-[var(--t-foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
                    +{store.whatsapp}
                  </span>
                </div>
              </a>
            )}

            {store.whatsapp && (
              <a
                href={`tel:+${store.whatsapp}`}
                className="flex items-center gap-3 px-4 py-3.5 transition-opacity hover:opacity-80"
              >
                <div
                  className="w-9 h-9 rounded-[var(--t-radius-button)] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                >
                  <Phone size={18} strokeWidth={1.75} className="text-[var(--t-primary)]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-[var(--t-muted)]" style={{ fontFamily: "var(--font-sans)" }}>Teléfono</span>
                  <span className="text-sm font-medium text-[var(--t-foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
                    +{store.whatsapp}
                  </span>
                </div>
              </a>
            )}
          </div>
        </section>

        {/* Redes sociales */}
        {(store.social_links?.instagram || store.social_links?.facebook) && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-sm font-semibold text-[var(--t-muted)] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Redes sociales
            </h2>

            <div
              className="flex flex-col divide-y rounded-[var(--t-radius-card)] overflow-hidden"
              style={{ backgroundColor: "var(--t-background)", borderColor: "var(--t-border)" }}
            >
              {store.social_links?.instagram && (
                <a
                  href={`https://instagram.com/${store.social_links.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-[var(--t-radius-button)] flex items-center justify-center flex-shrink-0 text-[var(--t-muted)]"
                    style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                  >
                    <InstagramIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[var(--t-muted)]" style={{ fontFamily: "var(--font-sans)" }}>Instagram</span>
                    <span className="text-sm font-medium text-[var(--t-foreground)] truncate" style={{ fontFamily: "var(--font-sans)" }}>
                      @{store.social_links.instagram.replace("@", "")}
                    </span>
                  </div>
                </a>
              )}

              {store.social_links?.facebook && (
                <a
                  href={`https://facebook.com/${store.social_links.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-[var(--t-radius-button)] flex items-center justify-center flex-shrink-0 text-[var(--t-muted)]"
                    style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
                  >
                    <FacebookIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[var(--t-muted)]" style={{ fontFamily: "var(--font-sans)" }}>Facebook</span>
                    <span className="text-sm font-medium text-[var(--t-foreground)] truncate" style={{ fontFamily: "var(--font-sans)" }}>
                      {store.social_links.facebook}
                    </span>
                  </div>
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab="info"
        onTabChange={onTabChange}
      />
    </div>
  );
}
