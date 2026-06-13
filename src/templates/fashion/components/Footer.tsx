// Fashion Template — Store Footer
// Off-white bg, minimal, editorial.
// pb-20 lg:pb-8 accounts for mobile bottom nav clearance.
// "Creado con Tiendri" attribution.
// Supports footerStyle: "minimal" (default), "columns", "centered".

import type { StoreInfo } from "../types";

interface FooterProps {
  store: StoreInfo;
  services?: readonly string[];
  assistance?: readonly string[];
  /** Layout options from ThemeCustomizer. */
  layout?: Record<string, unknown>;
}

export function Footer({ store, services = [], assistance = [], layout }: FooterProps) {
  // footerStyle: "minimal" (default) — brand + copyright, optional columns when links provided
  const footerStyle: string = "minimal";
  const isCentered = footerStyle === "centered";
  const showColumns = footerStyle === "columns" || (services.length > 0 || assistance.length > 0);
  return (
    <footer className="bg-[var(--t-background)] pb-20 md:pb-8 pt-10 md:pt-14 border-t border-[var(--t-border)]">
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
        {/* Top row */}
        <div
          className={`flex gap-8 mb-10 ${
            isCentered
              ? "flex-col items-center text-center"
              : "flex-col lg:flex-row lg:items-start lg:justify-between"
          }`}
        >
          {/* Brand */}
          <div className={isCentered ? "flex flex-col items-center" : "lg:max-w-xs"}>
            {/* Diamond logo + brand name */}
            <div className={`flex items-center gap-2 mb-3 ${isCentered ? "justify-center" : ""}`}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="10"
                  y="0"
                  width="14.14"
                  height="14.14"
                  rx="0"
                  transform="rotate(45 10 0)"
                  fill="var(--t-primary)"
                />
              </svg>
              <span
                className="text-lg uppercase tracking-widest font-bold text-[var(--t-foreground)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {store.name}
              </span>
            </div>
            {store.description && (
              <p
                className={`text-[var(--t-muted)] leading-[1.7] ${isCentered ? "text-center max-w-sm" : ""}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {store.description}
              </p>
            )}
          </div>

          {/* Footer link columns — visible when showColumns is true */}
          {showColumns && (
            <div
              className={`flex gap-8 lg:gap-16 ${
                isCentered ? "flex-col items-center" : "flex-col lg:flex-row"
              }`}
            >
              {services.length > 0 && (
                <nav aria-label="Servicios">
                  <p
                    className={`mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--t-foreground)] ${isCentered ? "text-center" : ""}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Servicios
                  </p>
                  {services.map((item) => (
                    <p
                      key={item}
                      className={`mb-1.5 cursor-pointer transition-opacity hover:opacity-60 text-xs text-[var(--t-muted)] ${isCentered ? "text-center" : ""}`}
                      style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                    >
                      {item}
                    </p>
                  ))}
                </nav>
              )}

              {assistance.length > 0 && (
                <nav aria-label="Asistencia al comprador">
                  <p
                    className={`mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--t-foreground)] ${isCentered ? "text-center" : ""}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Asistencia
                  </p>
                  {assistance.map((item) => (
                    <p
                      key={item}
                      className={`mb-1.5 cursor-pointer transition-opacity hover:opacity-60 text-xs text-[var(--t-muted)] ${isCentered ? "text-center" : ""}`}
                      style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                    >
                      {item}
                    </p>
                  ))}
                </nav>
              )}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          className={`pt-5 flex gap-2 border-t border-[var(--t-border)] ${
            isCentered
              ? "flex-col items-center text-center"
              : "flex-col lg:flex-row items-center lg:justify-between"
          }`}
        >
          <p
            className="text-[11px] text-[var(--t-muted)]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
          >
            &copy; {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
          </p>
          <p
            className="text-[11px] text-[var(--t-muted)]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
          >
            Creado con{" "}
            <span className="font-medium text-[var(--t-foreground)] underline underline-offset-2">
              Tiendri
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
