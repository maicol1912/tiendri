"use client";

import React from "react";
import { MapPin, ChevronDown, Bell, ShoppingCart, Search } from "lucide-react";
import Image from "next/image";
import type { HeaderSlotProps } from "./types";

function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

const GREETING = React.memo(function GREETING({
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
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Mobile layout (two rows) — hidden on desktop ── */}
      <div className="lg:hidden">
        {/* Row 1: location pill (left) + bell + avatar (right) */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          {/* Location pill */}
          <div
            className="flex items-center gap-1.5 rounded-[var(--t-radius-category)] px-3 py-2"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <MapPin
              size={14}
              strokeWidth={2.5}
              style={{ color: "var(--t-foreground)" }}
            />
            <span
              className="text-xs"
              style={{
                color: "var(--t-foreground)",
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                letterSpacing: "-0.36px",
              }}
            >
              {store.name}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              style={{ color: "var(--t-muted)" }}
            />
          </div>

          {/* Right: bell + avatar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center w-[38px] h-[38px] rounded-[var(--t-radius-category)]"
              style={{ backgroundColor: "var(--t-surface)" }}
              aria-label="Notificaciones"
            >
              <Bell
                size={16}
                strokeWidth={1.75}
                style={{ color: "var(--t-foreground)" }}
              />
            </button>

            {/* Avatar — logo image if available, else initials */}
            <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  fill
                  sizes="38px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "var(--t-surface)" }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: "var(--t-foreground)",
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    }}
                  >
                    {getInitials(store.name)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: greeting heading + subtitle */}
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
              color: "var(--t-muted)",
              letterSpacing: "-0.9px",
              lineHeight: "1.2",
            }}
          >
            Explorá nuestro catálogo
          </p>
        </div>
      </div>

      {/* ── Desktop sticky header bar — hidden on mobile ── */}
      <div
        className="hidden lg:block"
        style={{ borderBottom: "1px solid var(--t-border)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-8 h-16 w-full">
          {/* Store logo or name */}
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
                className="font-semibold tracking-tight truncate"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.6px",
                  color: "var(--t-foreground)",
                }}
              >
                {store.name}
              </span>
            )}
          </div>

          {/* Centered search input */}
          <div className="flex flex-1 items-center justify-center px-8">
            <div
              className="flex items-center gap-2 w-full max-w-sm px-5 py-3 cursor-text rounded-[var(--t-radius-button)]"
              style={{ backgroundColor: "var(--t-surface)" }}
              onClick={onSearchClick}
              role="button"
              tabIndex={0}
              aria-label="Buscar productos"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSearchClick();
              }}
            >
              <Search
                size={16}
                strokeWidth={2}
                className="flex-shrink-0"
                style={{ color: "var(--t-muted)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "-0.42px",
                  color: "var(--t-muted)",
                }}
              >
                Buscar
              </span>
            </div>
          </div>

          {/* Right: nav links + cart */}
          <div className="flex items-center gap-1 ml-auto">
            <nav className="flex items-center gap-1 mr-2" aria-label="Navegación principal">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <button
                    key={link.href}
                    type="button"
                    className="px-3 py-1.5 rounded-full transition-colors relative"
                    style={{
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                      fontSize: "14px",
                      fontWeight: active ? 600 : 500,
                      color: active ? "var(--t-primary)" : "var(--t-muted)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => onNavClick(link.href)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active && (
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

            {/* Cart icon with count badge */}
            <button
              type="button"
              className="relative flex items-center justify-center w-10 h-10 rounded-full"
              aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} productos` : ""}`}
              onClick={onCartClick}
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <ShoppingCart
                size={22}
                strokeWidth={1.75}
                style={{ color: "var(--t-foreground)" }}
              />
              {cartCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
                  style={{
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  }}
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

export default GREETING;
