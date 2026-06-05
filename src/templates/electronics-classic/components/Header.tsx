// Electronics Classic — Store Header
// Top utility bar (blue) + brand logo bar + nav links bar.
// All colors via var(--t-*) — ZERO hardcoded hex.
// Visual only: event handlers injected from shell.

import Image from "next/image";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  Phone,
  Truck,
  RotateCcw,
  X,
} from "lucide-react";
import type { StorefrontStore, NavTab } from "../types";

interface NavLink {
  label: string;
  hasDropdown?: boolean;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Todos los productos", hasDropdown: true },
  { label: "Electrodomésticos" },
  { label: "Audio & Video" },
  { label: "Refrigeradores" },
  { label: "Nuevos" },
  { label: "Ofertas del día" },
  { label: "Regalos" },
];

interface HeaderProps {
  store: StorefrontStore;
  navLinks?: NavLink[];
  /** Alias for cartItemCount — preferred in page-level usage */
  cartCount?: number;
  cartItemCount?: number;
  menuOpen?: boolean;
  activeTab?: NavTab;
  layout?: { headerStyle?: string };
  onSearchClick?: () => void;
  /** Alias for onSearchClick that accepts a query string — used by page shells */
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onMenuToggle?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (index: number) => void;
  onNavigate?: (path: string) => void;
}

export function Header({
  store,
  navLinks = DEFAULT_NAV_LINKS,
  cartCount,
  cartItemCount = 0,
  menuOpen = false,
  onSearchClick,
  onSearchSubmit,
  onCartClick,
  onMenuToggle,
  onTabChange,
  onNavigate,
}: HeaderProps) {
  const effectiveCartCount = cartCount ?? cartItemCount;
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
            <span className="ml-1 hidden sm:inline">{store.phone ?? "1-002-345-45235"}</span>
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
              aria-label={`Carrito, ${effectiveCartCount} productos`}
            >
              <ShoppingCart className="w-[25px] h-[25px]" />
              {effectiveCartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-3 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {effectiveCartCount > 9 ? "9+" : effectiveCartCount}
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
              aria-label={`Carrito, ${effectiveCartCount} productos`}
            >
              <ShoppingCart className="w-5 h-5" />
              {effectiveCartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {effectiveCartCount > 9 ? "9+" : effectiveCartCount}
                </span>
              )}
            </button>
            <button
              onClick={onMenuToggle}
              className="text-[var(--t-top-bar-text)] p-2"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            {navLinks.map((link, idx) => (
              <button
                key={`${link.label}-${idx}`}
                className="flex items-center gap-1 px-2.5 py-2.5 text-[var(--t-top-bar-text)] font-semibold text-[15px] hover:bg-[var(--t-card-bg)]/10 rounded-[var(--t-radius-button)] transition-colors"
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className="w-[15px] h-[15px]" aria-hidden="true" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-[var(--t-card-bg)]/20"
          style={{ backgroundColor: "var(--t-header-bg)" }}
        >
          <nav
            className="max-w-7xl mx-auto px-4 py-3 space-y-1"
            aria-label="Menú móvil"
          >
            {navLinks.map((link, idx) => (
              <button
                key={`${link.label}-${idx}`}
                className="flex items-center justify-between w-full px-3 py-3 text-[var(--t-top-bar-text)] font-semibold text-[15px] hover:bg-[var(--t-card-bg)]/10 rounded-[var(--t-radius-button)] transition-colors"
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
