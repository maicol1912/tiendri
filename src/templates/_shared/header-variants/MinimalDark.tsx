// Shared — MinimalDark Header (from tech-premium)
// Figma desktop: logo (left), search bar (#F5F5F5 rounded, center-left),
// nav links (center), cart icon (right).
// Figma mobile: logo (left), hamburger icon (right).
// Border-bottom: #B5B5B5. Padding: px-[160px] desktop, px-4 mobile.
// Visual only — handlers come as props.

import { ShoppingCart, Menu, Search } from "lucide-react";
import type { HeaderProps } from "./types";

const DEFAULT_NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/listing" },
  { label: "Populares", href: "/popular" },
  { label: "Ofertas", href: "/discounts" },
];

export default function MinimalDark({
  store,
  navLinks = DEFAULT_NAV_LINKS,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--t-header-bg)] border-b border-[var(--t-border)]">
      {/* ── Desktop header ── */}
      <div className="hidden lg:flex items-center justify-between px-[160px] py-4">
        {/* Logo */}
        <span
          className="text-[22px] font-bold italic lowercase tracking-tight text-[var(--t-text-primary)] shrink-0"
          aria-label={store.name}
        >
          {store.name.toLowerCase()}
        </span>

        {/* Search bar — fixed width */}
        <div className="w-[372px] shrink-0 ml-8">
          <div className="flex items-center gap-2 bg-[var(--t-search-bg)] rounded-lg h-14 px-4 w-full">
            <Search className="w-5 h-5 text-[var(--t-text-muted)] shrink-0" />
            <input
              type="text"
              placeholder="Buscar"
              onFocus={onSearchClick}
              className="bg-transparent text-sm font-medium text-[var(--t-text-muted)] placeholder:text-[var(--t-text-muted)]/50 outline-none w-full"
              aria-label="Buscar"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-[52px] ml-8" aria-label="Navegación principal">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              type="button"
              className={`bg-transparent border-none p-0 text-base font-medium cursor-pointer transition-colors ${
                i === 0
                  ? "text-[var(--t-text-primary)]"
                  : "text-[var(--t-text-primary)]/30 hover:text-[var(--t-text-primary)]/60"
              }`}
              onClick={() => onNavLinkClick?.(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6 ml-8">
          <button
            type="button"
            className="relative p-0 bg-transparent border-none cursor-pointer"
            onClick={onCartClick}
            aria-label={`Carrito${cartItemCount > 0 ? `, ${cartItemCount} artículos` : ""}`}
          >
            <ShoppingCart className="w-6 h-6 text-[var(--t-text-primary)]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile header ── */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        {/* Logo */}
        <span
          className="text-[20px] font-bold italic lowercase tracking-tight text-[var(--t-text-primary)]"
          aria-label={store.name}
        >
          {store.name.toLowerCase()}
        </span>

        {/* Hamburger */}
        <button
          type="button"
          className="p-0 bg-transparent border-none cursor-pointer"
          onClick={onMenuClick}
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6 text-[var(--t-text-primary)]" />
        </button>
      </div>
    </header>
  );
}
