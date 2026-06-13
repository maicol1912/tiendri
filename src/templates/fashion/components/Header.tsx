"use client";

// Fashion Template — Store Header
// Mobile: hamburger left + diamond logo center + cart/user circles right
// Desktop: diamond logo + store name left, nav links center, search + icons right
// Editorial B&W aesthetic — uses CSS vars for all colors.

import { Menu, Search, ShoppingBag } from "lucide-react";
import type { StoreInfo } from "../types";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  store: StoreInfo;
  navLinks?: readonly NavLink[];
  cartItemCount?: number;
  /** Layout options from ThemeCustomizer. */
  layout?: Record<string, unknown>;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function Header({
  store,
  navLinks = [],
  cartItemCount = 0,
  layout,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
}: HeaderProps) {
  // headerStyle: "centered" (default) — logo+name left, nav center, icons right
  const headerStyle: string = "centered";
  return (
    <header className="sticky top-0 z-40 bg-[var(--t-background)]/95 backdrop-blur-sm">
      {/* Mobile header */}
      <div className="md:hidden px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Left: hamburger menu */}
          <button
            type="button"
            className="p-1 -ml-1 text-[var(--t-foreground)]"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Center: diamond logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={`Logo ${store.name}`}
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
          </div>

          {/* Right: cart icon */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="relative w-9 h-9 rounded-full bg-[var(--t-button-bg)] flex items-center justify-center"
              onClick={onCartClick}
              aria-label={`Carrito — ${cartItemCount} artículos`}
            >
              <ShoppingBag size={16} strokeWidth={1.5} className="text-[var(--t-card)]" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[9px] font-medium rounded-full"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        {/* Left: diamond logo + store name (hidden in minimal — centered instead) */}
        {headerStyle !== "minimal" && (
          <div className="flex items-center gap-2.5">
            <svg
              width="18"
              height="18"
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
              className="text-sm uppercase tracking-[0.2em] font-bold text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {store.name}
            </span>
          </div>
        )}

        {/* Minimal: centered logo */}
        {headerStyle === "minimal" && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <svg
              width="18"
              height="18"
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
              className="text-sm uppercase tracking-[0.2em] font-bold text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {store.name}
            </span>
          </div>
        )}

        {/* Center: nav links (centered for "centered" style, left-aligned for "standard") */}
        {navLinks.length > 0 && headerStyle !== "minimal" && (
          <nav
            className={`flex gap-8 ${headerStyle === "standard" ? "ml-8" : ""}`}
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                className="cursor-pointer text-[11px] uppercase tracking-[0.15em] font-medium text-[var(--t-foreground)]/70 hover:text-[var(--t-foreground)] transition-colors bg-transparent border-none p-0"
                style={{ fontFamily: "var(--font-sans)" }}
                onClick={() => onNavLinkClick?.(link.href)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right: search + cart */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-1.5 text-[var(--t-foreground)]/70 hover:text-[var(--t-foreground)] transition-colors bg-transparent border-none cursor-pointer"
            onClick={onSearchClick}
            aria-label="Buscar"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="relative w-9 h-9 rounded-full bg-[var(--t-button-bg)] flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer"
            onClick={onCartClick}
            aria-label={`Carrito — ${cartItemCount} artículos`}
          >
            <ShoppingBag size={16} strokeWidth={1.5} className="text-[var(--t-card)]" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[9px] font-medium rounded-full"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
