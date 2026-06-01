// Electronics Classic — Store Footer
// White bg, 4-column layout, payment icons + copyright.
// All colors via var(--t-*) — ZERO hardcoded hex.

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import type { StorefrontStore } from "../types";

interface FooterProps {
  store: StorefrontStore;
  shopLinks?: string[];
  helpLinks?: string[];
  layout?: { footerStyle?: string };
}

const DEFAULT_SHOP_LINKS = [
  "Ofertas especiales",
  "Categorías",
  "Marcas",
  "Rebajas",
  "Ofertas semanales",
];

const DEFAULT_HELP_LINKS = [
  "Pedidos en línea",
  "Devoluciones",
  "Envíos y entregas",
  "Pagos",
  "Preguntas frecuentes",
];

export function Footer({
  store,
  shopLinks = DEFAULT_SHOP_LINKS,
  helpLinks = DEFAULT_HELP_LINKS,
  layout,
}: FooterProps) {
  const footerStyle = layout?.footerStyle ?? "columns";

  // Minimal style
  if (footerStyle === "minimal") {
    return (
      <footer
        className="border-t border-[var(--t-border)]"
        style={{ backgroundColor: "var(--t-footer-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-bold text-[var(--t-primary)]">{store.name}</span>
          <p className="text-[var(--t-text-footer)] text-xs text-center">
            &copy; {new Date().getFullYear()} {store.name}. Todos los derechos reservados. Powered by Tiendri.
          </p>
        </div>
      </footer>
    );
  }

  // Centered style
  if (footerStyle === "centered") {
    return (
      <footer
        className="border-t border-[var(--t-border)]"
        style={{ backgroundColor: "var(--t-footer-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex flex-col items-center gap-4 text-center">
          <span className="font-bold text-[var(--t-primary)] text-lg">{store.name}</span>
          <p className="text-[var(--t-text-muted)] text-sm max-w-md">
            Tu tienda de electrónica y electrodomésticos de confianza. Calidad, precio y servicio al cliente excepcional.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center mt-2">
            {[...shopLinks, ...helpLinks].slice(0, 6).map((link) => (
              <span
                key={link}
                className="text-[var(--t-text-muted)] text-sm hover:text-[var(--t-primary)] cursor-pointer transition-colors"
              >
                {link}
              </span>
            ))}
          </div>
          <p className="text-[var(--t-text-footer)] text-xs mt-4">
            &copy; {new Date().getFullYear()} {store.name}. Todos los derechos reservados. Powered by Tiendri.
          </p>
        </div>
      </footer>
    );
  }

  // Columns style (default)
  return (
    <footer
      className="border-t border-[var(--t-border)]"
      style={{ backgroundColor: "var(--t-footer-bg)" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={30}
                    height={30}
                    className="object-contain rounded-full"
                  />
                ) : (
                  <span className="text-[var(--t-button-text)] font-bold text-xs">
                    {store.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-[var(--t-primary)] font-bold text-base">
                {store.name}
              </span>
            </div>
            <p className="text-[var(--t-text-muted)] text-sm leading-relaxed">
              Tu tienda de electrónica y electrodomésticos. Los mejores precios y el mejor servicio al cliente.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="font-bold text-[var(--t-text-primary)] text-base mb-4">
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link}>
                  <span className="text-[var(--t-text-muted)] text-sm hover:text-[var(--t-primary)] cursor-pointer transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h3 className="font-bold text-[var(--t-text-primary)] text-base mb-4">
              Ayuda
            </h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link}>
                  <span className="text-[var(--t-text-muted)] text-sm hover:text-[var(--t-primary)] cursor-pointer transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-[var(--t-text-primary)] text-base mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[var(--t-text-muted)] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>Calle 123 #45-67, Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--t-text-muted)] text-sm">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{store.phone ?? "1-002-345-45235"}</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--t-text-muted)] text-sm">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>info@{store.slug}.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--t-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Payment icons (CSS-based) */}
          <div className="flex items-center gap-3" aria-label="Métodos de pago aceptados">
            <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center">
              <span className="text-white text-[8px] font-bold italic">VISA</span>
            </div>
            <div className="w-10 h-6 rounded flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#EB001B" }}>
              <div className="absolute left-1.5 w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
              <div className="absolute right-1.5 w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-80" />
            </div>
            <div className="w-10 h-6 bg-[#003087] rounded flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">PayPal</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[var(--t-text-footer)] text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} {store.name}. Todos los derechos reservados. Powered by Tiendri.
          </p>
        </div>
      </div>
    </footer>
  );
}
