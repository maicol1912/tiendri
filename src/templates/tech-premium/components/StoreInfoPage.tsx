// Tech Premium Template — Store Info Page
// Shows store contact info, address, social links, and business hours.
// Visual only — all data received as props.

import { MapPin, Phone, Mail, Share2, Clock } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  cartItemCount?: number;
  activeTab?: NavTab;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function StoreInfoPage({
  store,
  navLinks,
  footerServices,
  footerAssistance,
  cartItemCount = 0,
  activeTab = "info",
  onSearchClick,
  onCartClick,
  onTabChange,
  onNavLinkClick,
}: StoreInfoPageProps) {
  return (
    <div className="bg-[var(--t-background)] min-h-screen font-['Inter',sans-serif] flex flex-col">
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="flex-1 px-4 py-8 lg:px-[160px] lg:py-16 flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Store name heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--t-foreground)]">
            {store.name}
          </h1>
          {store.description && (
            <p className="text-base text-[var(--t-muted)] leading-relaxed max-w-2xl">
              {store.description}
            </p>
          )}
        </div>

        {/* Contact card */}
        <div className="bg-[var(--t-card)] rounded-[var(--t-radius-card)] p-6 flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-[var(--t-foreground)]">Contacto</h2>

          {store.whatsapp && (
            <a
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--t-muted)] hover:text-[var(--t-primary)] transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[var(--t-primary)]" />
              </div>
              <span className="text-sm font-medium">+{store.whatsapp}</span>
            </a>
          )}

          <div className="flex items-center gap-3 text-[var(--t-muted)]">
            <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[var(--t-primary)]" />
            </div>
            <span className="text-sm font-medium">info@{store.slug}.com</span>
          </div>

          <div className="flex items-start gap-3 text-[var(--t-muted)]">
            <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[var(--t-primary)]" />
            </div>
            <span className="text-sm font-medium">Colombia</span>
          </div>
        </div>

        {/* Business hours */}
        <div className="bg-[var(--t-card)] rounded-[var(--t-radius-card)] p-6 flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-[var(--t-foreground)]">Horario de atención</h2>
          <div className="flex flex-col gap-3">
            {[
              { days: "Lunes — Viernes", hours: "9:00 am – 6:00 pm" },
              { days: "Sábado", hours: "10:00 am – 4:00 pm" },
              { days: "Domingo", hours: "Cerrado" },
            ].map(({ days, hours }) => (
              <div key={days} className="flex items-center justify-between py-2 border-b border-[var(--t-border)]/40 last:border-0">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--t-muted)]" />
                  <span className="text-sm text-[var(--t-foreground)]">{days}</span>
                </div>
                <span className="text-sm font-medium text-[var(--t-muted)]">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social media */}
        {store.social_links && Object.keys(store.social_links).length > 0 && (
          <div className="bg-[var(--t-card)] rounded-[var(--t-radius-card)] p-6 flex flex-col gap-5">
            <h2 className="text-lg font-semibold text-[var(--t-foreground)]">Redes sociales</h2>
            <div className="flex flex-col gap-3">
              {store.social_links.instagram && (
                <a
                  href={store.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--t-muted)] hover:text-[var(--t-primary)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4 text-[var(--t-primary)]" />
                  </div>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              )}
              {store.social_links.facebook && (
                <a
                  href={store.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--t-muted)] hover:text-[var(--t-primary)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4 text-[var(--t-primary)]" />
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              )}
              {store.social_links.twitter && (
                <a
                  href={store.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--t-muted)] hover:text-[var(--t-primary)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--t-spec-badge-bg)] flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4 text-[var(--t-primary)]" />
                  </div>
                  <span className="text-sm font-medium">Twitter / X</span>
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
            className="w-full py-4 rounded-[var(--t-radius-button)] bg-[var(--t-primary)] text-[var(--t-on-primary)] text-base font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Contactar por WhatsApp
          </a>
        )}
      </main>

      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />

      {/* Spacer for bottom nav */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
