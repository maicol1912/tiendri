"use client";

// Fashion Template — Store Header
// Mobile: hamburger left + diamond logo center + cart/user circles right
// Desktop: diamond logo + store name left, page nav links center, search + icons right
// Editorial B&W aesthetic — uses CSS vars for all colors.

import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import type { StoreInfo } from "../types";

interface NavLink {
  label: string;
  href: string;
}

const PAGE_NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Info", href: "/info" },
];

interface HeaderProps {
  store: StoreInfo;
  navLinks?: readonly NavLink[];
  cartItemCount?: number;
  activeHref?: string;
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
  activeHref,
  layout,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    onMenuClick?.();
  };

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavLinkClick?.(href);
  };

  // headerStyle: "centered" (default) — logo+name left, nav center, icons right
  const headerStyle: string = "centered";
  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--t-background)]/95 backdrop-blur-sm">
        {/* Mobile header */}
        <div className="md:hidden px-5 py-4">
          <div className="flex items-center justify-between">
            {/* Left: hamburger menu */}
            <button
              type="button"
              className="p-1 -ml-1"
              style={{ color: "var(--t-foreground)" }}
              onClick={handleMobileMenuToggle}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
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
                className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--t-button-bg)" }}
                onClick={onCartClick}
                aria-label={`Carrito — ${cartItemCount} artículos`}
              >
                <ShoppingBag size={16} strokeWidth={1.5} style={{ color: "var(--t-card)" }} />
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-medium rounded-full"
                    style={{
                      backgroundColor: "var(--t-primary)",
                      color: "var(--t-on-primary)",
                      fontFamily: "var(--font-sans)",
                    }}
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
                className="text-sm uppercase tracking-[0.2em] font-bold"
                style={{ fontFamily: "var(--font-sans)", color: "var(--t-foreground)" }}
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
                className="text-sm uppercase tracking-[0.2em] font-bold"
                style={{ fontFamily: "var(--font-sans)", color: "var(--t-foreground)" }}
              >
                {store.name}
              </span>
            </div>
          )}

          {/* Center: page navigation links */}
          <nav className="flex items-center gap-8" aria-label="Navegación principal">
            {PAGE_NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <button
                  key={link.href}
                  type="button"
                  className="relative flex flex-col items-center gap-0.5 bg-transparent border-none p-0 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: isActive ? 600 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: isActive ? "var(--t-foreground)" : "var(--t-muted-foreground, var(--t-foreground))",
                    opacity: isActive ? 1 : 0.55,
                    transition: "color 200ms ease, opacity 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--t-foreground)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? "1" : "0.55";
                    (e.currentTarget as HTMLButtonElement).style.color = isActive
                      ? "var(--t-foreground)"
                      : "var(--t-muted-foreground, var(--t-foreground))";
                  }}
                  onClick={() => onNavLinkClick?.(link.href)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {/* Active underline indicator — fashion editorial style */}
                  <span
                    style={{
                      display: "block",
                      width: isActive ? "100%" : "0%",
                      height: "1px",
                      backgroundColor: "var(--t-foreground)",
                      transition: "width 200ms ease",
                    }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: search + cart */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1.5 bg-transparent border-none cursor-pointer transition-opacity hover:opacity-60"
              style={{ color: "var(--t-foreground)", opacity: 0.7 }}
              onClick={onSearchClick}
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity border-none cursor-pointer"
              style={{ backgroundColor: "var(--t-button-bg)" }}
              onClick={onCartClick}
              aria-label={`Carrito — ${cartItemCount} artículos`}
            >
              <ShoppingBag size={16} strokeWidth={1.5} style={{ color: "var(--t-card)" }} />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-medium rounded-full"
                  style={{
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Border bottom */}
        <div style={{ height: "1px", backgroundColor: "var(--t-border)" }} aria-hidden="true" />
      </header>

      {/* Mobile nav panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: "var(--t-background)" }}
        >
          {/* Offset for sticky header height */}
          <nav
            className="flex flex-col pt-20 px-6 gap-1"
            aria-label="Navegación móvil"
          >
            {PAGE_NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <button
                  key={link.href}
                  type="button"
                  className="flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-left w-full"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--t-foreground)" : "var(--t-foreground)",
                    opacity: isActive ? 1 : 0.6,
                    borderBottom: "1px solid var(--t-border)",
                  }}
                  onClick={() => handleMobileNavClick(link.href)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "9999px",
                        backgroundColor: "var(--t-primary)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
