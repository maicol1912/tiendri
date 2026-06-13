// Furniture Light — Footer
// Clean minimal footer with store name, links, Tiendri attribution
// ZERO hardcoded colors

import type { FurnitureStoreInfo } from "../types";

interface FooterProps {
  store: FurnitureStoreInfo;
  layout?: Record<string, unknown>;
}

export function Footer({ store }: FooterProps) {
  const style: string = "minimal";

  return (
    <footer
      className="bg-[var(--t-background)] border-t border-[var(--t-border)] pb-24 lg:pb-8 mt-8"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-8 pb-4">
        {style === "columns" ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-[var(--t-radius-button)] bg-[var(--t-primary)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="text-base font-bold text-[var(--t-foreground)]">{store.name}</p>
              </div>
              <p className="text-xs text-[var(--t-muted)]">Muebles modernos para tu hogar</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--t-foreground)] uppercase tracking-wider mb-3">Servicios</p>
              <ul className="space-y-2">
                {["Política de privacidad", "Términos y condiciones"].map((item) => (
                  <li key={item}><a href="#" className="text-xs text-[var(--t-muted)] hover:text-[var(--t-foreground)] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--t-foreground)] uppercase tracking-wider mb-3">Ayuda</p>
              <ul className="space-y-2">
                {["Preguntas frecuentes", "Contacto"].map((item) => (
                  <li key={item}><a href="#" className="text-xs text-[var(--t-muted)] hover:text-[var(--t-foreground)] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-7 h-7 rounded-[var(--t-radius-button)] bg-[var(--t-primary)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-[var(--t-foreground)]">{store.name}</p>
              </div>
              <p className="text-xs text-[var(--t-muted)] mt-1">Muebles modernos para tu hogar</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--t-muted)]">
              <a href="#" className="hover:text-[var(--t-foreground)] transition-colors">Política de privacidad</a>
              <a href="#" className="hover:text-[var(--t-foreground)] transition-colors">Términos</a>
            </div>
          </div>
        )}

        {/* Attribution */}
        <div className="mt-6 pt-4 border-t border-[var(--t-border)] text-center">
          <p className="text-xs text-[var(--t-muted)]">
            Tienda impulsada por{" "}
            <a href="https://tiendri.com" target="_blank" rel="noopener noreferrer" className="text-[var(--t-primary)] hover:underline font-medium">
              Tiendri
            </a>
            {" "}· tiendri.com/{store.slug}
          </p>
        </div>
      </div>
    </footer>
  );
}
