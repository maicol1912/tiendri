"use client";

// Header variant: GLASS
// Extracted from beauty-elegant Header.
// Glassmorphic: backdrop-blur + border tint. Nav centered. Icon-only search + cart (right).
// Desktop only — works alongside a mobile BottomNav.

import { memo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import type { HeaderSlotProps } from "./types";

const GlassHeader = memo(function GlassHeader({
  store,
  navLinks,
  cartCount,
  isActive,
  onNavClick,
  onSearchClick,
  onCartClick,
  config,
}: HeaderSlotProps) {
  const showDiamond = config?.headerIcon === "diamond";
  return (
    <header
      className="hidden md:block sticky top-0 z-40"
      style={{
        backgroundColor: "color-mix(in srgb, var(--t-background) 75%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--t-nav-border, var(--t-border))",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Brand name */}
        <h1
          className="flex items-center gap-2 text-[22px] font-extrabold m-0"
          style={{ color: "var(--t-foreground)" }}
        >
          {showDiamond && (
            <span aria-hidden="true" style={{ fontSize: "14px", lineHeight: 1 }}>◆</span>
          )}
          {store.name}
        </h1>

        {/* Center nav links */}
        <nav className="flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <button
                key={link.href}
                type="button"
                className="relative bg-transparent border-none p-0 pb-1 cursor-pointer flex flex-col items-center gap-0.5"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: active ? "var(--t-primary)" : "var(--t-muted)",
                  opacity: active ? 1 : 0.7,
                  transition: "color 0.2s ease, opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "var(--t-primary)";
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = active ? "var(--t-primary)" : "var(--t-muted)";
                  el.style.opacity = active ? "1" : "0.7";
                }}
                onClick={() => onNavClick(link.href)}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {/* Active underline indicator */}
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    height: 1.5,
                    width: active ? "100%" : "0%",
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
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button,8px)] transition-colors hover:bg-[var(--t-icon-pill-bg,var(--t-card))]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Buscar"
            onClick={onSearchClick}
          >
            <Search size={20} strokeWidth={1.75} color="var(--t-muted)" />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button,8px)] transition-colors hover:bg-[var(--t-icon-pill-bg,var(--t-card))]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} artículos` : ""}`}
            onClick={onCartClick}
          >
            <ShoppingCart size={20} strokeWidth={1.75} color="var(--t-muted)" />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[var(--t-on-primary)] text-[9px] font-bold leading-none"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
});

export default GlassHeader;
