// Fashion Template — Store Info Page (Presentational)
// Editorial B&W aesthetic. Contact, address, social links.
// All colors via var(--t-*). ZERO hardcoded hex.

import { Phone, MapPin, Clock, Share2 } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  activeTab?: NavTab;
  cartItemCount?: number;
  address?: string;
  hours?: string;
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-[var(--t-border)] last:border-b-0">
      <div
        className="flex-shrink-0 mt-0.5"
        style={{ color: "var(--t-muted)" }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.15em] mb-1"
          style={{ fontFamily: "var(--font-sans)", color: "var(--t-muted)", fontWeight: 400 }}
        >
          {label}
        </p>
        <div
          className="text-sm"
          style={{ fontFamily: "var(--font-sans)", color: "var(--t-foreground)", fontWeight: 500 }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export function StoreInfoPage({
  store,
  activeTab = "info",
  cartItemCount = 0,
  address = "Cra. 15 #93-47, Bogotá, Colombia",
  hours = "Lun – Sáb: 9:00 am – 7:00 pm",
  activeHref,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onTabChange,
}: StoreInfoPageProps) {
  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="max-w-2xl mx-auto px-5 md:px-6 lg:px-8 pb-28 md:pb-12 pt-8">
        {/* Page title */}
        <div className="mb-8 border-b border-[var(--t-border)] pb-6">
          <p
            className="text-[10px] uppercase tracking-[0.2em] mb-1"
            style={{ fontFamily: "var(--font-sans)", color: "var(--t-muted)", fontWeight: 400 }}
          >
            Tienda
          </p>
          <h1
            className="text-xl font-bold uppercase tracking-[0.05em]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--t-foreground)" }}
          >
            {store.name}
          </h1>
          {store.description && (
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "var(--t-muted)", fontWeight: 400 }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Contact info */}
        <section aria-labelledby="contact-heading" className="mb-8">
          <h2
            id="contact-heading"
            className="text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ fontFamily: "var(--font-sans)", color: "var(--t-muted)", fontWeight: 400 }}
          >
            Contacto
          </h2>

          <div className="border-t border-[var(--t-border)]">
            {store.whatsapp && (
              <InfoRow
                icon={<Phone size={16} strokeWidth={1.5} />}
                label="WhatsApp"
                value={
                  <a
                    href={`https://wa.me/${store.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "var(--t-primary)" }}
                  >
                    +{store.whatsapp}
                  </a>
                }
              />
            )}
            <InfoRow
              icon={<MapPin size={16} strokeWidth={1.5} />}
              label="Dirección"
              value={address}
            />
            <InfoRow
              icon={<Clock size={16} strokeWidth={1.5} />}
              label="Horario"
              value={hours}
            />
          </div>
        </section>

        {/* Social links */}
        {store.social_links && (
          <section aria-labelledby="social-heading">
            <h2
              id="social-heading"
              className="text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "var(--font-sans)", color: "var(--t-muted)", fontWeight: 400 }}
            >
              Redes sociales
            </h2>

            <div className="border-t border-[var(--t-border)]">
              {store.social_links.instagram && (
                <InfoRow
                  icon={<Share2 size={16} strokeWidth={1.5} />}
                  label="Instagram"
                  value={
                    <a
                      href={store.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--t-primary)" }}
                    >
                      {store.social_links.instagram.replace("https://instagram.com/", "@")}
                    </a>
                  }
                />
              )}
              {store.social_links.facebook && (
                <InfoRow
                  icon={<Share2 size={16} strokeWidth={1.5} />}
                  label="Facebook"
                  value={
                    <a
                      href={store.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--t-primary)" }}
                    >
                      {store.social_links.facebook.replace("https://facebook.com/", "")}
                    </a>
                  }
                />
              )}
              {store.social_links.tiktok && (
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  }
                  label="TikTok"
                  value={
                    <a
                      href={store.social_links.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--t-primary)" }}
                    >
                      {store.social_links.tiktok.replace("https://tiktok.com/@", "@")}
                    </a>
                  }
                />
              )}
            </div>
          </section>
        )}
      </main>

      <Footer store={store} />
      <BottomNav activeTab={activeTab} cartItemCount={cartItemCount} onTabChange={onTabChange} />
    </div>
  );
}
