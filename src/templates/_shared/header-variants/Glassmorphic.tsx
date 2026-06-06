// Shared — Glassmorphic Header (from beauty-elegant)
// Desktop backdrop-blur header with nav-border tint. Hidden on mobile.
// Visible md+. Logo + nav links + search + cart icons.
// ZERO hardcoded colors — all via var(--t-*)

import { Search, ShoppingCart } from "lucide-react";
import type { HeaderProps } from "./types";

const DEFAULT_NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/listing" },
  { label: "Nosotros", href: "/about" },
];

export default function Glassmorphic({
  store,
  navLinks,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
}: HeaderProps) {
  const effectiveNavLinks = navLinks ?? DEFAULT_NAV_LINKS;

  return (
    <header
      className="hidden md:block sticky top-0 z-40"
      style={{
        backgroundColor: "var(--t-header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--t-nav-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Brand name */}
        <h1
          className="text-[22px] font-extrabold m-0"
          style={{ color: "var(--t-text-primary)" }}
        >
          {store.name}
        </h1>

        {/* Center nav links */}
        <nav className="flex items-center gap-8" aria-label="Navegación principal">
          {effectiveNavLinks.map((link) => (
            <span
              key={link.href}
              className="text-sm font-medium cursor-pointer transition-colors hover:text-[var(--t-primary)]"
              style={{ color: "var(--t-text-secondary)" }}
              onClick={() => onNavLinkClick?.(link.href)}
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Buscar"
            onClick={onSearchClick}
          >
            <Search size={20} strokeWidth={1.75} color="var(--t-text-secondary)" />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Carrito de compras"
            onClick={onCartClick}
          >
            <ShoppingCart size={20} strokeWidth={1.75} color="var(--t-text-secondary)" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-[var(--t-radius-button)] text-[var(--t-badge-text)] text-[9px] font-bold leading-none"
                style={{ backgroundColor: "var(--t-badge-bg)" }}
              >
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
