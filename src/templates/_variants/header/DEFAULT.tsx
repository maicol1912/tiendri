"use client";

// Header variant: DEFAULT
// Extracted from tech-premium Header.
// Edge-to-edge layout: logo (left) + search inline (center-left) + nav links (center) + cart (right).
// Mobile: logo (left) + hamburger (right).

import { memo } from "react";
import { ShoppingCart, Menu, Search } from "lucide-react";
import type { HeaderSlotProps } from "./types";

const DefaultHeader = memo(function DefaultHeader({
  store,
  navLinks,
  cartCount,
  isActive,
  onNavClick,
  onSearchClick,
  onCartClick,
}: HeaderSlotProps) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--t-background)] border-b border-[var(--t-border)]">
      {/* ── Desktop header ── */}
      <div className="hidden lg:flex items-center justify-between px-[160px] py-4">
        {/* Logo */}
        <span
          className="text-[22px] font-bold italic lowercase tracking-tight text-[var(--t-foreground)] shrink-0"
          aria-label={store.name}
        >
          {store.name.toLowerCase()}
        </span>

        {/* Search bar — fixed width */}
        <div className="w-[372px] shrink-0 ml-8">
          <div className="flex items-center gap-2 bg-[var(--t-card)] rounded-lg h-14 px-4 w-full">
            <Search className="w-5 h-5 text-[var(--t-muted)] shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar"
              readOnly
              onFocus={onSearchClick}
              className="bg-transparent text-sm font-medium text-[var(--t-muted)] placeholder:text-[var(--t-muted)]/50 outline-none w-full cursor-pointer"
              aria-label="Buscar productos"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-[52px] ml-8" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <button
                key={link.href}
                type="button"
                aria-current={active ? "page" : undefined}
                className={`bg-transparent border-none p-0 text-base font-medium cursor-pointer transition-colors pb-0.5 ${
                  active
                    ? "text-[var(--t-foreground)] border-b border-[var(--t-foreground)]"
                    : "text-[var(--t-foreground)]/30 hover:text-[var(--t-foreground)]/60"
                }`}
                onClick={() => onNavClick(link.href)}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Cart icon */}
        <div className="flex items-center gap-6 ml-8">
          <button
            type="button"
            className="relative p-0 bg-transparent border-none cursor-pointer"
            onClick={onCartClick}
            aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} artículos` : ""}`}
          >
            <ShoppingCart className="w-6 h-6 text-[var(--t-foreground)]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile header ── */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        {/* Logo */}
        <span
          className="text-[20px] font-bold italic lowercase tracking-tight text-[var(--t-foreground)]"
          aria-label={store.name}
        >
          {store.name.toLowerCase()}
        </span>

        {/* Hamburger */}
        <button
          type="button"
          className="p-0 bg-transparent border-none cursor-pointer"
          onClick={onSearchClick}
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6 text-[var(--t-foreground)]" />
        </button>
      </div>
    </header>
  );
});

export default DefaultHeader;
