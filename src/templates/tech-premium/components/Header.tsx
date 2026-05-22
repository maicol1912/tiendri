// Tech Premium Template — Header
// Figma desktop: logo (left), search bar (#F5F5F5 rounded, center-left),
// nav links "Home About Contact Us Blog" (center), icons heart+cart+user (right).
// Figma mobile: logo (left), hamburger icon (right).
// Border-bottom: #B5B5B5. Padding: px-[160px] desktop, px-4 mobile.
// Visual only — handlers come as props.

import { Heart, ShoppingCart, User, Menu } from "lucide-react";
import { SearchBar } from "./SearchBar";
import type { StoreInfo } from "../types";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  store: StoreInfo;
  navLinks: readonly NavLink[];
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onMenuClick?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function Header({
  store,
  navLinks,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onWishlistClick,
  onMenuClick,
  onNavLinkClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--t-border)]">
      {/* ── Desktop header ── */}
      <div className="hidden lg:flex items-center justify-between px-[160px] py-4">
        {/* Logo */}
        <span
          className="text-[22px] font-bold italic lowercase tracking-tight text-black shrink-0"
          aria-label={store.name}
        >
          {store.name.toLowerCase()}
        </span>

        {/* Search bar — fixed width */}
        <div className="w-[372px] shrink-0 ml-8">
          <SearchBar placeholder="Buscar" onFocus={onSearchClick} />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-[52px] ml-8" aria-label="Navegación principal">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              type="button"
              className={`bg-transparent border-none p-0 text-base font-medium cursor-pointer transition-colors ${
                i === 0
                  ? "text-black"
                  : "text-black/30 hover:text-black/60"
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
            className="p-0 bg-transparent border-none cursor-pointer"
            onClick={onWishlistClick}
            aria-label="Favoritos"
          >
            <Heart className="w-6 h-6 text-black" />
          </button>
          <button
            type="button"
            className="relative p-0 bg-transparent border-none cursor-pointer"
            onClick={onCartClick}
            aria-label={`Carrito${cartItemCount > 0 ? `, ${cartItemCount} artículos` : ""}`}
          >
            <ShoppingCart className="w-6 h-6 text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-0 bg-transparent border-none cursor-pointer"
            aria-label="Mi cuenta"
          >
            <User className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>

      {/* ── Mobile header ── */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        {/* Logo */}
        <span
          className="text-[20px] font-bold italic lowercase tracking-tight text-black"
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
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>
    </header>
  );
}
