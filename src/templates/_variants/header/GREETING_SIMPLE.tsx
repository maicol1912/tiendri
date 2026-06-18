"use client";

// Header variant: GREETING_SIMPLE
// Extracted from decor-warm Header.
// Mobile: single row — greeting text left (greeting + store description) + search/cart icon buttons right.
// Desktop: store name left, nav links center with active dot indicator, search + cart icons right.
// Sticky top. ZERO hardcoded colors — all via --t-* CSS variables.

import React from "react";
import { Search, ShoppingBag } from "lucide-react";
import type { HeaderSlotProps } from "./types";

const GREETING_SIMPLE = React.memo(function GREETING_SIMPLE({
  store,
  navLinks,
  cartCount,
  isActive,
  onNavClick,
  onSearchClick,
  onCartClick,
}: HeaderSlotProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        backgroundColor: "var(--t-background)",
        borderBottom: "1px solid var(--t-border)",
      }}
    >
      {/* ── Mobile header (single row) — hidden on lg+ ── */}
      <div className="flex lg:hidden items-center px-4 h-16 w-full max-w-7xl mx-auto">
        {/* Greeting + description — left */}
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span
            style={{
              color: "var(--t-primary)",
              fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            Hola, Bienvenido
          </span>
          <span
            style={{
              color: "var(--t-muted)",
              fontFamily: "var(--font-body, 'Poppins', sans-serif)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {store.description ?? store.name}
          </span>
        </div>

        {/* Search + Cart icon buttons — right */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width: 31,
              height: 31,
              borderRadius: "var(--t-radius-category)",
              backgroundColor: "var(--t-primary)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onSearchClick}
            aria-label="Buscar productos"
          >
            <Search size={14} strokeWidth={2} style={{ color: "var(--t-background)" }} />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center"
            style={{
              width: 31,
              height: 31,
              borderRadius: "var(--t-radius-category)",
              backgroundColor: "var(--t-primary)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onCartClick}
            aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} artículos` : ""}`}
          >
            <ShoppingBag size={14} strokeWidth={2} style={{ color: "var(--t-background)" }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center text-[9px] font-bold leading-none"
                style={{
                  minWidth: 16,
                  height: 16,
                  borderRadius: "9999px",
                  backgroundColor: "var(--t-primary)",
                  color: "var(--t-background)",
                  padding: "0 3px",
                }}
                aria-hidden="true"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Desktop header — hidden below lg ── */}
      <div className="hidden lg:flex items-center justify-between px-8 h-16 w-full max-w-7xl mx-auto">
        {/* Store name — left */}
        <span
          aria-label={store.name}
          style={{
            color: "var(--t-primary)",
            fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          {store.name}
        </span>

        {/* Nav links — center with active dot indicator */}
        <nav className="flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <button
                key={link.href}
                type="button"
                className="relative bg-transparent border-none p-0 cursor-pointer transition-colors flex flex-col items-center gap-0.5"
                style={{
                  fontFamily: "var(--font-body, 'Poppins', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: active ? "var(--t-primary)" : "var(--t-foreground)",
                  opacity: active ? 1 : 0.45,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--t-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = active ? "1" : "0.45";
                  (e.currentTarget as HTMLButtonElement).style.color = active
                    ? "var(--t-primary)"
                    : "var(--t-foreground)";
                }}
                onClick={() => onNavClick(link.href)}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {/* Active dot indicator */}
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "9999px",
                    backgroundColor: active ? "var(--t-primary)" : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        {/* Search + Cart icons — right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--t-radius-category)",
              backgroundColor: "var(--t-primary)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onSearchClick}
            aria-label="Buscar productos"
          >
            <Search size={16} strokeWidth={2} style={{ color: "var(--t-background)" }} />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--t-radius-category)",
              backgroundColor: "var(--t-primary)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onCartClick}
            aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} artículos` : ""}`}
          >
            <ShoppingBag size={16} strokeWidth={2} style={{ color: "var(--t-background)" }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center text-[9px] font-bold leading-none"
                style={{
                  minWidth: 16,
                  height: 16,
                  borderRadius: "9999px",
                  backgroundColor: "var(--t-primary)",
                  color: "var(--t-background)",
                  padding: "0 3px",
                }}
                aria-hidden="true"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
});

export default GREETING_SIMPLE;
