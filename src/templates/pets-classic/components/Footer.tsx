"use client";

// Pets Classic — Footer
// Minimal or columns layout. All colors via var(--t-*).

import type { StoreInfo } from "../types";

interface FooterProps {
  store: StoreInfo;
  layout?: { footerStyle?: string };
}

export function Footer({ store, layout }: FooterProps) {
  const style = layout?.footerStyle ?? "minimal";
  const hasSocials =
    store.social_links &&
    Object.values(store.social_links).some(Boolean);

  if (style === "columns") {
    return (
      <footer
        className="pb-24 lg:pb-8 pt-10"
        style={{ backgroundColor: "var(--t-footer-bg)", borderTop: "1px solid var(--t-border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--t-text-footer)", marginBottom: 12 }}>
                {store.name}
              </p>
              <p style={{ fontSize: "13px", color: "var(--t-text-footer)", lineHeight: 1.6 }}>
                Tu tienda de confianza para el cuidado de tus mascotas.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-footer)", marginBottom: 8 }}>
                Servicios
              </p>
              {["Envío a domicilio", "Asesoría veterinaria", "Garantía", "Devoluciones"].map((s) => (
                <p key={s} style={{ fontSize: "12px", color: "var(--t-text-footer)", marginBottom: 4 }}>{s}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-footer)", marginBottom: 8 }}>
                Ayuda
              </p>
              {["Preguntas frecuentes", "Contáctenos", "Términos de uso", "Privacidad"].map((s) => (
                <p key={s} style={{ fontSize: "12px", color: "var(--t-text-footer)", marginBottom: 4 }}>{s}</p>
              ))}
            </div>
          </div>
          <div style={{ height: 1, backgroundColor: "var(--t-border)", marginBottom: 16 }} aria-hidden="true" />
          <p style={{ fontSize: "11px", color: "var(--t-text-footer)", textAlign: "center" }}>
            Creado con{" "}
            <span style={{ color: "var(--t-primary)", fontWeight: 600 }}>tiendri.com</span>
          </p>
        </div>
      </footer>
    );
  }

  // minimal (default)
  return (
    <footer
      className="pb-24 lg:pb-8 pt-8"
      style={{ backgroundColor: "var(--t-footer-bg)", borderTop: "1px solid var(--t-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--t-text-primary)" }}>
            {store.name}
          </p>

          {hasSocials && store.social_links && (
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {store.social_links.instagram && (
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--t-primary)" }}>
                  Instagram
                </span>
              )}
              {store.social_links.facebook && (
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--t-primary)" }}>
                  Facebook
                </span>
              )}
            </div>
          )}

          <div
            style={{ width: 40, height: 2, backgroundColor: "var(--t-primary)", borderRadius: 9999 }}
            aria-hidden="true"
          />

          <p style={{ fontSize: "11px", color: "var(--t-text-muted)" }}>
            Creado con{" "}
            <span style={{ color: "var(--t-primary)", fontWeight: 600 }}>tiendri.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
