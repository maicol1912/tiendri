"use client";

// Beauty Soft Template — Store Header
// Desktop: store name left, nav links center, search + cart icons right.
// Mobile: store name left, search + cart icons right (BottomNav handles mobile nav).
// Sticky top. ZERO hardcoded colors — all via --t-* CSS variables.

import { Search, ShoppingBag } from "lucide-react";
import type { StoreInfo } from "@/types/store";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Info", href: "/info" },
];

interface HeaderProps {
  store: StoreInfo;
  cartItemCount?: number;
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function Header({
  store,
  cartItemCount = 0,
  activeHref,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        backgroundColor: "var(--t-background)",
        borderBottom: "1px solid var(--t-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-[60px]">
        {/* Store name — left */}
        <span
          className="font-semibold text-[17px] tracking-[-0.408px] leading-[22px] flex-shrink-0"
          style={{
            color: "var(--t-foreground)",
            fontFamily: "'Wix Madefor Display', var(--font-display), ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {store.name}
        </span>

        {/* Nav links — center (desktop only) */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <button
                key={link.href}
                type="button"
                className="relative bg-transparent border-none p-0 pb-1 cursor-pointer flex flex-col items-center gap-0.5"
                style={{
                  fontFamily: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive ? "var(--t-primary)" : "var(--t-muted)",
                  opacity: isActive ? 1 : 0.8,
                  transition: "color 0.2s ease, opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--t-primary)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = isActive
                    ? "var(--t-primary)"
                    : "var(--t-muted)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? "1" : "0.8";
                }}
                onClick={() => onNavLinkClick?.(link.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {/* Active underline indicator — soft and subtle */}
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    height: 1.5,
                    width: isActive ? "100%" : "0%",
                    borderRadius: "9999px",
                    backgroundColor: "var(--t-primary)",
                    transition: "width 0.2s ease",
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Search + Cart icons — right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--t-icon-pill-bg, var(--t-card))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
            onClick={onSearchClick}
            aria-label="Buscar productos"
          >
            <Search size={20} strokeWidth={1.75} style={{ color: "var(--t-muted)" }} />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--t-icon-pill-bg, var(--t-card))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
            onClick={onCartClick}
            aria-label={`Carrito de compras${cartItemCount > 0 ? `, ${cartItemCount} artículos` : ""}`}
          >
            <ShoppingBag size={20} strokeWidth={1.75} style={{ color: "var(--t-muted)" }} />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold leading-none"
                style={{
                  backgroundColor: "var(--t-primary)",
                  color: "var(--t-on-primary, #FFFFFF)",
                }}
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
