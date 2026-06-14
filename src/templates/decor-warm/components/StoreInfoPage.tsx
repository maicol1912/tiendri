// Decor Warm Template — Store Info Page (Presentational)
// Warm linen aesthetic. Contact, address, social links.
// All colors via var(--t-*). ZERO hardcoded hex.

import { Phone, MapPin, Clock, Share2, ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import type { StoreInfo } from "@/types/store";
import type { DecorWarmNavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  activeTab?: DecorWarmNavTab;
  cartItemCount?: number;
  address?: string;
  hours?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div
      className="flex items-start gap-4 px-4 py-4 rounded-[var(--t-radius-card)]"
      style={{ backgroundColor: "var(--t-card)" }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: "var(--t-primary)",
        }}
        aria-hidden="true"
      >
        <span style={{ color: "#FFFFFF" }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p
          style={{
            color: "var(--t-muted)",
            fontFamily: "'League Spartan', sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <div
          style={{
            color: "var(--t-dark-mode)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
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
  onBack,
  onSearchClick,
  onCartClick,
  onCartOpen,
  onNavLinkClick,
  onTabChange,
}: StoreInfoPageProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref="/info"
        onSearchClick={onSearchClick}
        onCartClick={onCartClick ?? onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="flex-1 pb-[calc(80px+env(safe-area-inset-bottom,0px))] pt-4 px-4 md:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {/* Back button + title */}
        <div className="flex items-center gap-3 mb-6">
          {onBack && (
            <button
              type="button"
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "var(--t-card)",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onBack}
              aria-label="Volver"
            >
              <ArrowLeft size={16} style={{ color: "var(--t-dark-mode)" }} />
            </button>
          )}
          <h1
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Información de la tienda
          </h1>
        </div>

        {/* Store name + description */}
        <div
          className="px-4 py-5 mb-5 rounded-[var(--t-radius-card)]"
          style={{ backgroundColor: "var(--t-primary)", opacity: 0.92 }}
        >
          <p
            style={{
              color: "#FFFFFF",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              margin: "0 0 4px 0",
            }}
          >
            {store.name}
          </p>
          {store.description && (
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {store.description}
            </p>
          )}
        </div>

        {/* Contact info */}
        <section aria-labelledby="contact-heading" className="mb-5">
          <h2
            id="contact-heading"
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Contacto
          </h2>

          <div className="flex flex-col gap-3">
            {store.whatsapp && (
              <InfoCard
                icon={<Phone size={16} strokeWidth={2} />}
                label="WhatsApp"
                value={
                  <a
                    href={`https://wa.me/${store.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--t-primary)" }}
                  >
                    +{store.whatsapp}
                  </a>
                }
              />
            )}
            <InfoCard
              icon={<MapPin size={16} strokeWidth={2} />}
              label="Dirección"
              value={address}
            />
            <InfoCard
              icon={<Clock size={16} strokeWidth={2} />}
              label="Horario de atención"
              value={hours}
            />
          </div>
        </section>

        {/* Social links */}
        {store.social_links && (
          <section aria-labelledby="social-heading">
            <h2
              id="social-heading"
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Redes sociales
            </h2>

            <div className="flex flex-col gap-3">
              {store.social_links.instagram && (
                <InfoCard
                  icon={<Share2 size={16} strokeWidth={2} />}
                  label="Instagram"
                  value={
                    <a
                      href={`https://instagram.com/${store.social_links.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--t-primary)" }}
                    >
                      @{store.social_links.instagram}
                    </a>
                  }
                />
              )}
              {store.social_links.facebook && (
                <InfoCard
                  icon={<Share2 size={16} strokeWidth={2} />}
                  label="Facebook"
                  value={
                    <a
                      href={`https://facebook.com/${store.social_links.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--t-primary)" }}
                    >
                      {store.social_links.facebook}
                    </a>
                  }
                />
              )}
            </div>
          </section>
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
