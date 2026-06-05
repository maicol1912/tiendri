// Electronics Classic — Store Info Page (Presentational)
// Displays contact info, address, social links, and store hours.
// All colors via var(--t-*). ZERO hardcoded hex.

import { Phone, MapPin, Clock, Share2 } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StorefrontStore } from "../types";

interface StoreInfoPageProps {
  store: StorefrontStore;
  cartCount?: number;
  address?: string;
  hours?: string;
  onNavigate?: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
}

export function StoreInfoPage({
  store,
  cartCount = 0,
  address = "Cra. 15 #93-47, Bogotá, Colombia",
  hours = "Lun – Sáb: 8:00 am – 7:00 pm",
  onNavigate,
  onSearchSubmit,
  onCartClick,
}: StoreInfoPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartCount={cartCount}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs" aria-label="Migas de pan">
          <ol className="flex items-center gap-1">
            <li>
              <button
                onClick={() => onNavigate?.("/template/electronics-classic")}
                className="hover:underline"
                style={{ color: "var(--t-text-breadcrumb, var(--t-text-muted))" }}
              >
                Inicio
              </button>
            </li>
            <li aria-hidden="true" style={{ color: "var(--t-text-muted)" }}>/</li>
            <li style={{ color: "var(--t-text-primary)" }} aria-current="page">
              Información
            </li>
          </ol>
        </nav>

        <h1
          className="text-2xl font-bold mb-8"
          style={{ color: "var(--t-text-primary)" }}
        >
          Información de la tienda
        </h1>

        {/* Contact section */}
        <section
          className="rounded-[var(--t-radius-card)] p-6 mb-6"
          style={{ backgroundColor: "var(--t-card-bg)", border: "1px solid var(--t-border)" }}
          aria-labelledby="contact-heading"
        >
          <h2
            id="contact-heading"
            className="text-sm font-bold uppercase tracking-wider mb-4"
            style={{ color: "var(--t-text-muted)" }}
          >
            Contacto
          </h2>

          <div className="flex flex-col gap-4">
            {store.phone && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-primary)" }}
                  aria-hidden="true"
                >
                  <Phone className="w-4 h-4" style={{ color: "var(--t-button-text)" }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>Teléfono</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--t-text-primary)" }}>
                    {store.phone}
                  </p>
                </div>
              </div>
            )}

            {store.whatsapp && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-primary)" }}
                  aria-hidden="true"
                >
                  <Phone className="w-4 h-4" style={{ color: "var(--t-button-text)" }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>WhatsApp</p>
                  <a
                    href={`https://wa.me/${store.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: "var(--t-primary)" }}
                  >
                    +{store.whatsapp}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--t-primary)" }}
                aria-hidden="true"
              >
                <MapPin className="w-4 h-4" style={{ color: "var(--t-button-text)" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>Dirección</p>
                <p className="text-sm font-semibold" style={{ color: "var(--t-text-primary)" }}>
                  {address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--t-primary)" }}
                aria-hidden="true"
              >
                <Clock className="w-4 h-4" style={{ color: "var(--t-button-text)" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>Horario</p>
                <p className="text-sm font-semibold" style={{ color: "var(--t-text-primary)" }}>
                  {hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social links */}
        {store.social_links && (
          <section
            className="rounded-[var(--t-radius-card)] p-6"
            style={{ backgroundColor: "var(--t-card-bg)", border: "1px solid var(--t-border)" }}
            aria-labelledby="social-heading"
          >
            <h2
              id="social-heading"
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--t-text-muted)" }}
            >
              Redes sociales
            </h2>

            <div className="flex flex-col gap-3">
              {store.social_links.instagram && (
                <a
                  href={store.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <Share2 className="w-5 h-5" style={{ color: "var(--t-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--t-text-primary)" }}>
                    Instagram
                  </span>
                </a>
              )}
              {store.social_links.facebook && (
                <a
                  href={store.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <Share2 className="w-5 h-5" style={{ color: "var(--t-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--t-text-primary)" }}>
                    Facebook
                  </span>
                </a>
              )}
              {store.social_links.youtube && (
                <a
                  href={store.social_links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  aria-label="YouTube"
                >
                  <Share2 className="w-5 h-5" style={{ color: "var(--t-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--t-text-primary)" }}>
                    YouTube
                  </span>
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer store={store} />
      <BottomNav activeTab="info" cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
