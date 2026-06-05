"use client";

// Pets Classic — Store Info Page
// Shows store contact info, address, social links, and business hours.
// All colors via var(--t-*). ZERO hardcoded colors.

import { MapPin, Phone, Mail, Share2, Clock } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoPageProps {
  store: StoreInfo;
  cartItemCount?: number;
  activeTab?: NavTab;
  animationLevel?: "full" | "subtle" | "none";
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onCatalogClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

export function StoreInfoPage({
  store,
  cartItemCount = 0,
  activeTab = "info",
  animationLevel = "none",
  onSearchClick,
  onCartClick,
  onMenuClick,
  onCatalogClick,
  onTabChange,
}: StoreInfoPageProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        onCatalogClick={onCatalogClick}
      />

      <main className="flex-1 px-4 py-8 lg:px-8 lg:py-12 flex flex-col gap-6 max-w-2xl mx-auto w-full pb-28 lg:pb-12">
        {/* Store name */}
        <div className="flex flex-col gap-2">
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--t-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {store.name}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--t-text-muted)", lineHeight: 1.6 }}>
            Encuentra todo lo que tu mascota necesita.
          </p>
        </div>

        {/* Contact card */}
        <div
          style={{
            backgroundColor: "var(--t-surface)",
            borderRadius: "var(--t-radius-card)",
            border: "1px solid var(--t-border)",
            padding: "20px",
          }}
          className="flex flex-col gap-4"
        >
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)" }}>
            Contacto
          </h2>

          {store.whatsapp && (
            <a
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 shrink-0"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "var(--t-primary)",
                }}
              >
                <Phone size={16} style={{ color: "var(--t-button-text)" }} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--t-primary)" }}>
                +{store.whatsapp}
              </span>
            </a>
          )}

          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 shrink-0"
              style={{
                borderRadius: "50%",
                backgroundColor: "var(--t-surface)",
                border: "1px solid var(--t-border)",
              }}
            >
              <Mail size={16} style={{ color: "var(--t-text-muted)" }} />
            </div>
            <span style={{ fontSize: "14px", color: "var(--t-text-secondary)" }}>
              info@{store.slug}.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 shrink-0"
              style={{
                borderRadius: "50%",
                backgroundColor: "var(--t-surface)",
                border: "1px solid var(--t-border)",
              }}
            >
              <MapPin size={16} style={{ color: "var(--t-text-muted)" }} />
            </div>
            <span style={{ fontSize: "14px", color: "var(--t-text-secondary)" }}>
              Colombia
            </span>
          </div>
        </div>

        {/* Hours */}
        <div
          style={{
            backgroundColor: "var(--t-surface)",
            borderRadius: "var(--t-radius-card)",
            border: "1px solid var(--t-border)",
            padding: "20px",
          }}
          className="flex flex-col gap-4"
        >
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)" }}>
            Horario
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { days: "Lunes — Viernes", hours: "9:00 am – 6:00 pm" },
              { days: "Sábado", hours: "10:00 am – 4:00 pm" },
              { days: "Domingo", hours: "Cerrado" },
            ].map(({ days, hours }) => (
              <div
                key={days}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid var(--t-border)" }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--t-text-muted)" }} />
                  <span style={{ fontSize: "13px", color: "var(--t-text-primary)" }}>{days}</span>
                </div>
                <span style={{ fontSize: "13px", color: "var(--t-text-muted)", fontWeight: 600 }}>
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social media */}
        {store.social_links && (store.social_links.instagram || store.social_links.facebook) && (
          <div
            style={{
              backgroundColor: "var(--t-surface)",
              borderRadius: "var(--t-radius-card)",
              border: "1px solid var(--t-border)",
              padding: "20px",
            }}
            className="flex flex-col gap-4"
          >
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)" }}>
              Redes sociales
            </h2>
            <div className="flex gap-3">
              {store.social_links.instagram && (
                <a
                  href={store.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    borderRadius: "var(--t-radius-button)",
                    backgroundColor: "var(--t-primary)",
                    textDecoration: "none",
                  }}
                >
                  <Share2 size={16} style={{ color: "var(--t-button-text)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-button-text)" }}>
                    Instagram
                  </span>
                </a>
              )}
              {store.social_links.facebook && (
                <a
                  href={store.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    borderRadius: "var(--t-radius-button)",
                    border: "1.5px solid var(--t-primary)",
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <Share2 size={16} style={{ color: "var(--t-primary)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-primary)" }}>
                    Facebook
                  </span>
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
            className="w-full py-4 text-center font-bold"
            style={{
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-primary)",
              color: "var(--t-button-text)",
              fontSize: "15px",
              textDecoration: "none",
              display: "block",
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
        animationLevel={animationLevel}
        onTabChange={onTabChange}
      />
    </div>
  );
}
