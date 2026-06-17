"use client";

// Decor Warm Template — Store Footer
// White bg, subtle border. Store name, social links, Tiendri attribution.

import { ExternalLink } from "lucide-react";
import type { StoreInfo } from "@/types/store";

interface FooterProps {
  store: StoreInfo;
  layout?: { footerStyle?: string };
}

export function Footer({ store }: FooterProps) {
  const hasSocial =
    store.social_links &&
    Object.values(store.social_links).some(Boolean);

  return (
    <footer
      className="w-full pb-20 lg:pb-8 pt-10"
      style={{
        backgroundColor: "var(--t-background)",
        borderTop: "1px solid var(--t-border)",
      }}
      aria-label="Pie de página de la tienda"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center gap-5">

        {/* Store name */}
        <span
          style={{
            color: "var(--t-foreground)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {store.name}
        </span>

        {/* Social links */}
        {hasSocial && (
          <div className="flex items-center flex-wrap justify-center gap-3" aria-label="Redes sociales">
            {store.social_links?.instagram && (
              <a
                href={`https://instagram.com/${store.social_links.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center gap-1"
                style={{
                  height: 32,
                  borderRadius: 9999,
                  backgroundColor: "var(--t-card)",
                  border: "1px solid var(--t-border)",
                  paddingLeft: 12,
                  paddingRight: 12,
                  color: "var(--t-muted)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={12} strokeWidth={1.75} />
                <span>Instagram</span>
              </a>
            )}
            {store.social_links?.facebook && (
              <a
                href={`https://facebook.com/${store.social_links.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center gap-1"
                style={{
                  height: 32,
                  borderRadius: 9999,
                  backgroundColor: "var(--t-card)",
                  border: "1px solid var(--t-border)",
                  paddingLeft: 12,
                  paddingRight: 12,
                  color: "var(--t-muted)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={12} strokeWidth={1.75} />
                <span>Facebook</span>
              </a>
            )}
            {store.social_links?.tiktok && (
              <a
                href={`https://tiktok.com/@${store.social_links.tiktok.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex items-center justify-center gap-1"
                style={{
                  height: 32,
                  borderRadius: 9999,
                  backgroundColor: "var(--t-card)",
                  border: "1px solid var(--t-border)",
                  paddingLeft: 12,
                  paddingRight: 12,
                  color: "var(--t-muted)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={12} strokeWidth={1.75} />
                <span>TikTok</span>
              </a>
            )}
          </div>
        )}

        {/* Tiendri attribution */}
        <div className="flex items-center gap-1">
          <span
            style={{
              color: "var(--t-muted)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            Creado con
          </span>
          <a
            href="https://tiendri.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--t-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              textDecoration: "none",
            }}
          >
            Tiendri
          </a>
        </div>

        {/* WhatsApp contact hint */}
        {store.whatsapp && (
          <p
            style={{
              color: "var(--t-muted)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            Pedidos vía WhatsApp · {store.whatsapp}
          </p>
        )}

      </div>
    </footer>
  );
}
