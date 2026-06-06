// Shared — MultiTier Header (from electronics-classic)
// Top utility bar (top-bar-bg) + brand logo + search bar + nav links bar.
// All colors via var(--t-*) — ZERO hardcoded hex.

import Image from "next/image";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  Phone,
  Truck,
  RotateCcw,
} from "lucide-react";
import type { HeaderProps } from "./types";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Todos los productos", href: "/", hasDropdown: true },
  { label: "Categorías", href: "/listing" },
  { label: "Novedades", href: "/new" },
  { label: "Ofertas del día", href: "/offers" },
  { label: "Regalos", href: "/gifts" },
];

export default function MultiTier({
  store,
  navLinks,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
}: HeaderProps) {
  const effectiveNavLinks = (navLinks as NavLink[] | undefined) ?? DEFAULT_NAV_LINKS;

  return (
    <header
      className="sticky top-0 z-50"
      aria-label="Encabezado de la tienda"
    >
      {/* ── Top utility bar ── */}
      <div
        className="text-[var(--t-top-bar-text)]"
        style={{ backgroundColor: "var(--t-top-bar-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-[34px] text-xs font-normal">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" aria-hidden="true" />
            <span>Servicio al cliente 24/7</span>
            <span className="ml-1 hidden sm:inline">{store.whatsapp ?? "1-002-345-45235"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Envíos y devoluciones</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Rastrear pedido</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand logo + search bar ── */}
      <div
        className="border-b border-[var(--t-nav-border)]/30"
        style={{ backgroundColor: "var(--t-header-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-[60px] md:h-[78px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-[35px] h-[35px] bg-[var(--t-card-bg)] rounded-full flex items-center justify-center overflow-hidden shrink-0"
            >
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={35}
                  height={35}
                  className="object-contain"
                />
              ) : (
                <span
                  className="font-bold text-sm"
                  style={{ color: "var(--t-header-bg)" }}
                >
                  {store.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-[var(--t-top-bar-text)] font-bold text-lg tracking-tight">
              {store.name}
            </span>
          </div>

          {/* Desktop search bar */}
          <div
            className="hidden md:flex items-center bg-[var(--t-card-bg)] rounded-[var(--t-radius-button)] h-[38px] w-[173px] lg:w-[280px] px-3 gap-2"
          >
            <input
              type="text"
              placeholder="Buscar producto"
              className="flex-1 text-sm text-[var(--t-text-muted)] bg-transparent outline-none"
              readOnly
              onClick={onSearchClick}
              aria-label="Buscar producto"
            />
            <Search className="w-[18px] h-[18px] text-[var(--t-text-muted)]" aria-hidden="true" />
          </div>

          {/* Desktop: cart */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 text-[var(--t-top-bar-text)] relative"
              aria-label={`Carrito, ${cartItemCount} productos`}
            >
              <ShoppingCart className="w-[25px] h-[25px]" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-3 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: search + cart + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onSearchClick}
              className="text-[var(--t-top-bar-text)] p-2"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onCartClick}
              className="text-[var(--t-top-bar-text)] p-2 relative"
              aria-label={`Carrito, ${cartItemCount} productos`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={onMenuClick}
              className="text-[var(--t-top-bar-text)] p-2"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop nav links bar ── */}
      <div
        className="hidden md:block"
        style={{ backgroundColor: "var(--t-header-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-[58px]">
          <nav className="flex items-center gap-1" aria-label="Navegación principal">
            {effectiveNavLinks.map((link, idx) => (
              <button
                key={`${link.label}-${idx}`}
                className="flex items-center gap-1 px-2.5 py-2.5 text-[var(--t-top-bar-text)] font-semibold text-[15px] hover:bg-[var(--t-card-bg)]/10 rounded-[var(--t-radius-button)] transition-colors"
                onClick={() => onNavLinkClick?.(link.href)}
              >
                <span>{link.label}</span>
                {(link as NavLink).hasDropdown && (
                  <ChevronDown className="w-[15px] h-[15px]" aria-hidden="true" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
