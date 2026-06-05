// Beauty Elegant Template — Store Info Page
// Shows store contact info, address, social links, and business hours.
// Glassmorphic aesthetic matching the template. All colors via var(--t-*).

import { MapPin, Phone, Mail, Share2, Clock } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  cartItemCount?: number;
  activeTab?: NavTab;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

export function StoreInfoPage({
  store,
  cartItemCount = 0,
  activeTab = "info",
  onSearchOpen,
  onCartOpen,
  onTabChange,
}: StoreInfoPageProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchOpen={onSearchOpen}
        onCartOpen={onCartOpen}
      />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col gap-6 pb-28 md:pb-12">
        {/* Store heading */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl font-extrabold"
            style={{ color: "var(--t-text-primary)" }}
          >
            {store.name}
          </h1>
          {store.description && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--t-text-secondary)" }}>
              {store.description}
            </p>
          )}
        </div>

        {/* Contact card */}
        <div
          className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
          style={{
            backgroundColor: "var(--t-card-bg)",
            border: "1px solid var(--t-nav-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <h2
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--t-text-secondary)" }}
          >
            Contacto
          </h2>

          {store.whatsapp && (
            <a
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 no-underline"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                <Phone size={16} color="#FFFFFF" />
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--t-primary)" }}>
                +{store.whatsapp}
              </span>
            </a>
          )}

          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--t-icon-pill-bg, rgba(255,255,255,0.1))" }}
            >
              <Mail size={16} color="var(--t-text-secondary)" />
            </div>
            <span className="text-sm" style={{ color: "var(--t-text-secondary)" }}>
              info@{store.slug}.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--t-icon-pill-bg, rgba(255,255,255,0.1))" }}
            >
              <MapPin size={16} color="var(--t-text-secondary)" />
            </div>
            <span className="text-sm" style={{ color: "var(--t-text-secondary)" }}>
              Colombia
            </span>
          </div>
        </div>

        {/* Hours */}
        <div
          className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
          style={{
            backgroundColor: "var(--t-card-bg)",
            border: "1px solid var(--t-nav-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <h2
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--t-text-secondary)" }}
          >
            Horario de atención
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { days: "Lunes — Viernes", hours: "9:00 am – 6:00 pm" },
              { days: "Sábado", hours: "10:00 am – 4:00 pm" },
              { days: "Domingo", hours: "Cerrado" },
            ].map(({ days, hours }) => (
              <div
                key={days}
                className="flex items-center justify-between py-2 border-b border-[var(--t-nav-border)] last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Clock size={13} color="var(--t-text-secondary)" />
                  <span className="text-sm" style={{ color: "var(--t-text-primary)" }}>
                    {days}
                  </span>
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--t-text-secondary)" }}>
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        {store.social_links && (store.social_links.instagram || store.social_links.facebook) && (
          <div
            className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
            style={{
              backgroundColor: "var(--t-card-bg)",
              border: "1px solid var(--t-nav-border)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <h2
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "var(--t-text-secondary)" }}
            >
              Redes sociales
            </h2>
            <div className="flex gap-3 flex-wrap">
              {store.social_links.instagram && (
                <a
                  href={`https://instagram.com/${store.social_links.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold no-underline"
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: "var(--t-primary)",
                    color: "#FFFFFF",
                  }}
                >
                  <Share2 size={15} />
                  Instagram
                </a>
              )}
              {store.social_links.facebook && (
                <a
                  href={`https://facebook.com/${store.social_links.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold no-underline"
                  style={{
                    borderRadius: "9999px",
                    border: "1.5px solid var(--t-primary)",
                    color: "var(--t-primary)",
                  }}
                >
                  <Share2 size={15} />
                  Facebook
                </a>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp CTA */}
        {store.whatsapp && (
          <a
            href={`https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 text-center text-base font-bold no-underline"
            style={{
              borderRadius: "9999px",
              backgroundColor: "var(--t-primary)",
              color: "#FFFFFF",
            }}
          >
            Contactar por WhatsApp
          </a>
        )}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
