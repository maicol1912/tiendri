"use client";

// Shared — LocationGreeting Header (from furniture-dark)
// Mobile: location pill left + bell + avatar right → greeting "Hi, {Store}" with gradient name
// Desktop: store name left + centered search + nav links + cart right
// ALL colors via var(--t-*)

import Image from "next/image";
import { Search, ShoppingBag, Bell, MapPin, ChevronDown } from "lucide-react";
import type { HeaderProps } from "./types";

const DEFAULT_NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Categorías", href: "/catalogo" },
  { label: "Ofertas", href: "/buscar" },
];

export default function LocationGreeting({
  store,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  navLinks = DEFAULT_NAV_LINKS,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "var(--t-header-bg)" }}
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
            <MapPin size={14} strokeWidth={2.5} className="text-[var(--t-text-primary)]" />
            <span
              className="text-[var(--t-text-primary)] text-xs"
              style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)", letterSpacing: "-0.36px" }}
            >
              {store.name}
            </span>
            <ChevronDown size={14} strokeWidth={2} className="text-[var(--t-text-secondary)]" />
          </div>

          {/* Right: notification + avatar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center w-[38px] h-[38px] rounded-[var(--t-radius-category)]"
              style={{ backgroundColor: "var(--t-surface)" }}
              aria-label="Notificaciones"
            >
              <Bell size={16} strokeWidth={1.75} className="text-[var(--t-text-primary)]" />
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
                    className="text-[var(--t-text-primary)] text-sm font-semibold"
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
              color: "var(--t-text-primary)",
              letterSpacing: "-0.9px",
            }}
          >
            Hola,{" "}
            <span
              style={{
                fontWeight: 600,
                background: "linear-gradient(to right, var(--t-primary), var(--t-text-secondary))",
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
              color: "var(--t-text-primary)",
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
                className="font-semibold tracking-tight truncate text-[var(--t-text-primary)]"
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
              style={{ backgroundColor: "var(--t-surface)" }}
              onClick={onSearchClick}
              role="button"
              tabIndex={0}
              aria-label="Buscar productos"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSearchClick?.(); }}
            >
              <Search size={16} strokeWidth={2} className="text-[var(--t-text-secondary)] flex-shrink-0" />
              <span
                className="text-[var(--t-text-secondary)]"
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
            <nav className="flex items-center gap-1 mr-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="px-3 py-1.5 rounded-full text-[var(--t-text-secondary)] hover:text-[var(--t-text-primary)] transition-colors"
                  style={{
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Cart icon with badge */}
            <button
              type="button"
              className="relative flex items-center justify-center w-10 h-10 rounded-full"
              aria-label={`Carrito${cartItemCount > 0 ? `, ${cartItemCount} productos` : ""}`}
              onClick={onCartClick}
            >
              <ShoppingBag size={22} strokeWidth={1.75} className="text-[var(--t-text-primary)]" />
              {cartItemCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
                  style={{
                    backgroundColor: "var(--t-badge-bg)",
                    color: "var(--t-badge-text)",
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
