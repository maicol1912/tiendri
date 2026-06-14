"use client";

// Furniture Dark — Header
// Mobile: location pill left + bell + avatar right → greeting "Hi, {Store}" with gradient name
// Desktop: store name left + centered search + nav links + cart right
// ALL colors via var(--t-*)

import Image from "next/image";
import { Search, ShoppingBag, Bell, MapPin, ChevronDown } from "lucide-react";
import type { StorefrontStore } from "../types";

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
  store: StorefrontStore;
  cartItemCount?: number;
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  layout?: { headerStyle?: string };
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
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Mobile header */}
      <div className="lg:hidden">
        {/* Top row: location pill + notification + avatar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          {/* Location pill */}
          <div
            className="flex items-center gap-1.5 rounded-[var(--t-radius-category)] px-3 py-2.5"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <MapPin size={14} strokeWidth={2.5} className="text-[var(--t-foreground)]" />
            <span
              className="text-[var(--t-foreground)] text-xs"
              style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)", letterSpacing: "-0.36px" }}
            >
              {store.name}
            </span>
            <ChevronDown size={14} strokeWidth={2} className="text-[var(--t-muted)]" />
          </div>

          {/* Right: notification + avatar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center w-[38px] h-[38px] rounded-[var(--t-radius-category)]"
              style={{ backgroundColor: "var(--t-surface)" }}
              aria-label="Notificaciones"
            >
              <Bell size={16} strokeWidth={1.75} className="text-[var(--t-foreground)]" />
            </button>

            <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden">
              {store.logo ? (
                <Image src={store.logo} alt={store.name} fill sizes="38px" className="object-cover" />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "var(--t-surface)" }}
                >
                  <span
                    className="text-[var(--t-foreground)] text-sm font-semibold"
                    style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)" }}
                  >
                    {store.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Greeting text with gradient store name */}
        <div className="px-5 pt-3 pb-4">
          <p
            className="leading-none"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "30px",
              fontWeight: 400,
              color: "var(--t-foreground)",
              letterSpacing: "-0.9px",
            }}
          >
            Hola,{" "}
            <span
              style={{
                fontWeight: 600,
                background: "linear-gradient(to right, var(--t-primary), var(--t-muted))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {store.name}
            </span>
          </p>
          <p
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "30px",
              fontWeight: 400,
              color: "var(--t-foreground)",
              letterSpacing: "-0.9px",
              lineHeight: "1.2",
            }}
          >
            Explorá nuestro catálogo
          </p>
        </div>
      </div>

      {/* ── Desktop header */}
      <div
        className="hidden lg:block"
        style={{ borderBottom: "1px solid var(--t-border)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-8 h-16 w-full">
          {/* Store name / logo */}
          <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
            {store.logo ? (
              <div className="relative h-8 w-auto max-w-[140px]">
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={120}
                  height={32}
                  className="object-contain h-8 w-auto"
                  priority
                />
              </div>
            ) : (
              <span
                className="font-semibold tracking-tight truncate text-[var(--t-foreground)]"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.6px",
                }}
              >
                {store.name}
              </span>
            )}
          </div>

          {/* Centered search bar */}
          <div className="flex flex-1 items-center justify-center px-8">
            <div
              className="flex items-center gap-2 w-full max-w-sm px-5 py-3 cursor-text rounded-[var(--t-radius-button)]"
              style={{ backgroundColor: "var(--t-search-bg)" }}
              onClick={onSearchClick}
              role="button"
              tabIndex={0}
              aria-label="Buscar productos"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSearchClick?.(); }}
            >
              <Search size={16} strokeWidth={2} className="text-[var(--t-muted)] flex-shrink-0" />
              <span
                className="text-[var(--t-muted)]"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "-0.42px",
                }}
              >
                Buscar
              </span>
            </div>
          </div>

          {/* Right: nav links + cart */}
          <div className="flex items-center gap-1 ml-auto">
            <nav className="flex items-center gap-1 mr-2" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <button
                    key={link.href}
                    type="button"
                    className="px-3 py-1.5 rounded-full transition-colors relative"
                    style={{
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--t-primary)" : "var(--t-muted)",
                    }}
                    onClick={() => onNavLinkClick?.(link.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor: "var(--t-primary)" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Cart icon with badge */}
            <button
              type="button"
              className="relative flex items-center justify-center w-10 h-10 rounded-full"
              aria-label={`Carrito${cartItemCount > 0 ? `, ${cartItemCount} productos` : ""}`}
              onClick={onCartClick}
            >
              <ShoppingBag size={22} strokeWidth={1.75} className="text-[var(--t-foreground)]" />
              {cartItemCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
                  style={{
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  }}
                  aria-hidden="true"
                >
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
