// Furniture Dark — Store Info Page (Presentational)
// Muestra nombre, descripción, contacto y redes sociales de la tienda.
// ALL colors via var(--t-*).

import { Phone, MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StorefrontStore } from "../types";

type TabId = "home" | "cart" | "search" | "info";

interface StoreInfoPageProps {
  store: StorefrontStore;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onTabChange?: (tab: TabId) => void;
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

export function StoreInfoPage({
  store,
  onSearchClick,
  onCartClick,
  onTabChange,
}: StoreInfoPageProps) {
  const whatsappHref = store.whatsapp
    ? `https://wa.me/${store.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div
      className="min-h-screen pb-20"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <main className="max-w-2xl mx-auto px-5 py-6 flex flex-col gap-6">
        {/* Encabezado tienda */}
        <div
          className="flex flex-col items-center gap-4 py-10 rounded-[var(--t-radius-card)]"
          style={{ backgroundColor: "var(--t-surface)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "var(--t-card-bg)" }}
          >
            {store.logo ? (
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  color: "var(--t-text-primary)",
                }}
              >
                {store.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--t-text-primary)",
              letterSpacing: "-0.72px",
              textAlign: "center",
            }}
          >
            {store.name}
          </h1>

          {store.description && (
            <p
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                color: "var(--t-text-secondary)",
                textAlign: "center",
                maxWidth: "280px",
                lineHeight: "1.6",
              }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Contacto */}
        {store.whatsapp && (
          <section className="flex flex-col gap-3">
            <h2
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--t-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Contacto
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-surface)",
                borderRadius: "var(--t-radius-card)",
                borderColor: "var(--t-border)",
              }}
            >
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-primary)" }}
                  >
                    <MessageCircle size={18} strokeWidth={1.75} style={{ color: "var(--t-button-text)" }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "11px",
                        color: "var(--t-text-secondary)",
                      }}
                    >
                      WhatsApp
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--t-text-primary)",
                      }}
                    >
                      +{store.whatsapp}
                    </span>
                  </div>
                </a>
              )}

              <a
                href={`tel:+${store.whatsapp}`}
                className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-card-bg)" }}
                >
                  <Phone size={18} strokeWidth={1.75} style={{ color: "var(--t-text-primary)" }} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    style={{
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                      fontSize: "11px",
                      color: "var(--t-text-secondary)",
                    }}
                  >
                    Teléfono
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--t-text-primary)",
                    }}
                  >
                    +{store.whatsapp}
                  </span>
                </div>
              </a>
            </div>
          </section>
        )}

        {/* Redes sociales */}
        {(store.social_links?.instagram || store.social_links?.facebook) && (
          <section className="flex flex-col gap-3">
            <h2
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--t-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Redes sociales
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-surface)",
                borderRadius: "var(--t-radius-card)",
                borderColor: "var(--t-border)",
              }}
            >
              {store.social_links?.instagram && (
                <a
                  href={`https://instagram.com/${store.social_links.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-card-bg)", color: "var(--t-text-muted)" }}
                  >
                    <InstagramIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "11px",
                        color: "var(--t-text-secondary)",
                      }}
                    >
                      Instagram
                    </span>
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--t-text-primary)",
                      }}
                    >
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
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-card-bg)", color: "var(--t-text-muted)" }}
                  >
                    <FacebookIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "11px",
                        color: "var(--t-text-secondary)",
                      }}
                    >
                      Facebook
                    </span>
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--t-text-primary)",
                      }}
                    >
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
        onTab={(tab) => onTabChange?.(tab)}
      />
    </div>
  );
}
