// Food Night — Store Info Page (Presentational)
// Muestra nombre, descripción, contacto y redes sociales de la tienda.
// ALL colors via var(--t-*).

import { Phone, MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  onBack?: () => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
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
  onCartClick,
  onSearchClick,
  onTabChange,
}: StoreInfoPageProps) {
  const whatsappHref = store.whatsapp
    ? `https://wa.me/${store.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <main className="max-w-2xl mx-auto px-4 py-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-8 flex flex-col gap-6">
        {/* Encabezado tienda */}
        <div
          className="flex flex-col items-center gap-3 py-10"
          style={{
            backgroundColor: "var(--t-card)",
            borderRadius: "var(--t-radius-card)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "var(--t-card)" }}
          >
            {store.avatar || store.logo ? (
              <img
                src={store.avatar ?? store.logo ?? ""}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--t-foreground)" }}
              >
                {store.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h1
            className="text-[22px] font-bold text-center leading-tight"
            style={{
              color: "var(--t-foreground)",
              letterSpacing: "-0.66px",
            }}
          >
            {store.name}
          </h1>
        </div>

        {/* Contacto */}
        {(whatsappHref || store.whatsapp) && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Contacto
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-card)",
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
                    style={{ backgroundColor: "var(--t-card)" }}
                  >
                    <MessageCircle size={18} strokeWidth={1.75} style={{ color: "var(--t-primary)" }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>WhatsApp</span>
                    <span className="text-sm font-medium" style={{ color: "var(--t-foreground)" }}>
                      +{store.whatsapp}
                    </span>
                  </div>
                </a>
              )}

              {store.whatsapp && (
                <a
                  href={`tel:+${store.whatsapp}`}
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-card)" }}
                  >
                    <Phone size={18} strokeWidth={1.75} style={{ color: "var(--t-primary)" }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>Teléfono</span>
                    <span className="text-sm font-medium" style={{ color: "var(--t-foreground)" }}>
                      +{store.whatsapp}
                    </span>
                  </div>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Redes sociales */}
        {(store.social_links?.instagram || store.social_links?.facebook) && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Redes sociales
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-card)",
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
                    style={{ backgroundColor: "var(--t-card)", color: "var(--t-muted)" }}
                  >
                    <InstagramIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>Instagram</span>
                    <span className="text-sm font-medium truncate" style={{ color: "var(--t-foreground)" }}>
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
                    style={{ backgroundColor: "var(--t-card)", color: "var(--t-muted)" }}
                  >
                    <FacebookIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>Facebook</span>
                    <span className="text-sm font-medium truncate" style={{ color: "var(--t-foreground)" }}>
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
