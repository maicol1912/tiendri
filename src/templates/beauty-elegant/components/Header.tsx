"use client";

// Beauty Elegant Template — Desktop Header
// Glassmorphic header: backdrop-blur + purple border tint.
// Visible md+. Logo + nav links + search + cart icons.
// Nav links are clickable buttons with active page indicator (thin underline).

import { Search, ShoppingCart } from "lucide-react";
import type { StoreInfo } from "../types";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/info" },
];

interface HeaderProps {
  store: StoreInfo;
  cartItemCount?: number;
  layout?: { headerStyle?: string };
  activeHref?: string;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function Header({
  store,
  cartItemCount = 0,
  activeHref,
  onSearchOpen,
  onCartOpen,
  onNavLinkClick,
}: HeaderProps) {
  return (
    <header
      className="hidden md:block sticky top-0 z-40"
      style={{
        backgroundColor: "var(--t-background)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--t-nav-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Brand name */}
        <h1
          className="text-[22px] font-extrabold m-0"
          style={{ color: "var(--t-foreground)" }}
        >
          {store.name}
        </h1>

        {/* Center nav links */}
        <nav className="flex items-center gap-8" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <button
                key={link.href}
                type="button"
                className="relative bg-transparent border-none p-0 pb-1 cursor-pointer flex flex-col items-center gap-0.5"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive ? "var(--t-primary)" : "var(--t-muted)",
                  opacity: isActive ? 1 : 0.7,
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
                  (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? "1" : "0.7";
                }}
                onClick={() => onNavLinkClick?.(link.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {/* Active underline indicator — subtle and elegant */}
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

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Buscar"
            onClick={onSearchOpen}
          >
            <Search size={20} strokeWidth={1.75} color="var(--t-muted)" />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label={`Carrito de compras${cartItemCount > 0 ? `, ${cartItemCount} artículos` : ""}`}
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} strokeWidth={1.75} color="var(--t-muted)" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-[var(--t-radius-button)] text-[var(--t-on-primary)] text-[9px] font-bold leading-none"
                style={{ backgroundColor: "var(--t-primary)" }}
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
