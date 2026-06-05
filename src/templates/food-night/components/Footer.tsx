"use client";

// Food Night — Footer
// Dark minimal footer with social links + Tiendri attribution.

import { ExternalLink } from "lucide-react";
import type { StoreInfo } from "../types";

interface FooterProps {
  store: StoreInfo;
  layout?: { footerStyle?: string };
}

export function Footer({ store }: FooterProps) {
  const hasSocial =
    store.social_links && Object.values(store.social_links).some(Boolean);

  return (
    <footer
      className="w-full pb-24 md:pb-8 pt-10"
      style={{
        backgroundColor: "var(--t-footer-bg)",
        borderTop: "1px solid var(--t-border-light)",
      }}
      aria-label="Pie de página de la tienda"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center gap-5">

        <span
          className="text-[16px] font-bold"
          style={{ color: "var(--t-text-primary)" }}
        >
          {store.name}
        </span>

        {hasSocial && (
          <div className="flex items-center gap-4 flex-wrap justify-center" aria-label="Redes sociales">
            {store.social_links?.instagram && (
              <a
                href={`https://instagram.com/${store.social_links.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center gap-1 text-[12px] font-normal no-underline"
                style={{
                  height: 32,
                  borderRadius: "var(--t-radius-category)",
                  backgroundColor: "var(--t-card-bg)",
                  paddingLeft: 12,
                  paddingRight: 12,
                  color: "var(--t-text-secondary)",
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
                className="flex items-center justify-center gap-1 text-[12px] font-normal no-underline"
                style={{
                  height: 32,
                  borderRadius: "var(--t-radius-category)",
                  backgroundColor: "var(--t-card-bg)",
                  paddingLeft: 12,
                  paddingRight: 12,
                  color: "var(--t-text-secondary)",
                }}
              >
                <ExternalLink size={12} strokeWidth={1.75} />
                <span>Facebook</span>
              </a>
            )}
          </div>
        )}

        <div className="flex flex-col items-center gap-1">
          <span className="text-[12px] font-normal" style={{ color: "var(--t-text-muted)" }}>
            Creado con
          </span>
          <span
            className="text-[13px] font-semibold"
            style={{ color: "var(--t-rating-star)" }}
          >
            Tiendri
          </span>
        </div>

        {store.whatsapp && (
          <p
            className="text-[11px] font-normal text-center"
            style={{ color: "var(--t-text-muted)" }}
          >
            Pedidos por WhatsApp · {store.whatsapp}
          </p>
        )}
      </div>
    </footer>
  );
}
