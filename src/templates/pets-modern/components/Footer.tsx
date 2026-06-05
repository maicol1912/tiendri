// Pets Modern Template — Footer
// Minimal centered layout: store name, social links, paw divider, attribution.
// Matches pets-modern's fresh/modern aesthetic.
// ZERO hardcoded colors — all via var(--t-*).

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
        style={{
          backgroundColor: "var(--t-footer-bg)",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--t-text-footer)",
                  letterSpacing: "-0.01em",
                  marginBottom: 12,
                }}
              >
                {store.name}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--t-text-footer)",
                  lineHeight: 1.6,
                }}
              >
                Tu tienda de confianza para el cuidado de tus mascotas.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--t-text-footer)",
                  marginBottom: 8,
                }}
              >
                Servicios
              </p>
              {[
                "Envío a domicilio",
                "Asesoría veterinaria",
                "Garantía",
                "Devoluciones",
              ].map((s) => (
                <p
                  key={s}
                  style={{
                    fontSize: "12px",
                    color: "var(--t-text-footer)",
                    marginBottom: 4,
                  }}
                >
                  {s}
                </p>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--t-text-footer)",
                  marginBottom: 8,
                }}
              >
                Ayuda
              </p>
              {[
                "Preguntas frecuentes",
                "Contáctenos",
                "Términos de uso",
                "Privacidad",
              ].map((s) => (
                <p
                  key={s}
                  style={{
                    fontSize: "12px",
                    color: "var(--t-text-footer)",
                    marginBottom: 4,
                  }}
                >
                  {s}
                </p>
              ))}
            </div>
          </div>
          <div
            style={{
              height: 1,
              backgroundColor: "var(--t-border)",
              marginBottom: 16,
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontSize: "11px",
              color: "var(--t-text-footer)",
              textAlign: "center",
            }}
          >
            Creado con{" "}
            <span style={{ color: "var(--t-primary)", fontWeight: 600 }}>
              tiendri.com
            </span>
          </p>
        </div>
      </footer>
    );
  }

  // minimal (default)
  return (
    <footer
      className="pb-24 lg:pb-8 pt-8"
      style={{
        backgroundColor: "var(--t-footer-bg)",
        borderTop: "1px solid var(--t-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "var(--t-text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {store.name}
          </p>

          {hasSocials && store.social_links && (
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {store.social_links.instagram && (
                <a
                  href={store.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--t-primary)",
                    textDecoration: "none",
                  }}
                >
                  Instagram
                </a>
              )}
              {store.social_links.facebook && (
                <a
                  href={store.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--t-primary)",
                    textDecoration: "none",
                  }}
                >
                  Facebook
                </a>
              )}
            </div>
          )}

          {/* Paw print divider */}
          <div
            className="flex items-center gap-3 w-full max-w-xs"
            aria-hidden="true"
          >
            <div
              style={{ flex: 1, height: 1, backgroundColor: "var(--t-border)" }}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="var(--t-primary)"
              opacity={0.5}
              aria-hidden="true"
            >
              <ellipse cx="7" cy="5" rx="2" ry="2.5" />
              <ellipse cx="12" cy="3.5" rx="2" ry="2.5" />
              <ellipse cx="17" cy="5" rx="2" ry="2.5" />
              <ellipse cx="5" cy="10" rx="2" ry="2.5" />
              <path d="M8 14c0 0 1-3 4-3s4 3 4 3 1 4-1 5.5S11 18 9 16.5 8 14 8 14z" />
            </svg>
            <div
              style={{ flex: 1, height: 1, backgroundColor: "var(--t-border)" }}
            />
          </div>

          <p style={{ fontSize: "11px", color: "var(--t-text-muted)" }}>
            Creado con{" "}
            <span style={{ color: "var(--t-primary)", fontWeight: 600 }}>
              tiendri.com
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
