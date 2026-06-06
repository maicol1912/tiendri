"use client";

// Shared — Notification Header (from furniture-light)
// Mobile: bell (left) | store name + home icon (center) | cart (right)
// Desktop: logo+name (left) | nav links (center) | search bar + cart (right)
// ZERO hardcoded colors — all via var(--t-*)

import { Bell, ShoppingCart, Search } from "lucide-react";
import type { HeaderProps } from "./types";

interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Descubrir", href: "/listing" },
  { label: "Categorías", href: "/categories" },
];

export default function Notification({
  store,
  navLinks,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onMenuClick,
}: HeaderProps) {
  const effectiveNavLinks = (navLinks as NavLink[] | undefined) ?? DEFAULT_NAV_LINKS;

  return (
    <header
      className="sticky top-0 z-40 bg-[var(--t-header-bg)] border-b border-[var(--t-nav-border)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      {/* ── Mobile ─────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3">
        {/* Bell */}
        <button
          onClick={onMenuClick}
          aria-label="Notificaciones"
          className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--t-text-primary)]"
        >
          <Bell size={22} strokeWidth={1.8} />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--t-primary)] text-[var(--t-button-text)] text-[8px] font-bold flex items-center justify-center">
            6
          </span>
        </button>

        {/* Name + icon */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-7 h-7 rounded-[var(--t-radius-button)] flex items-center justify-center bg-[var(--t-primary)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[var(--t-text-primary)] tracking-tight">
            {store.name}
          </span>
        </div>

        {/* Cart */}
        <button
          onClick={onCartClick}
          aria-label={`Carrito — ${cartItemCount} artículos`}
          className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--t-text-primary)]"
        >
          <ShoppingCart size={22} strokeWidth={1.8} />
          {cartItemCount > 0 && (
            <span className="absolute top-0.5 right-0 w-5 h-5 rounded-full bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[9px] font-bold flex items-center justify-center">
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-[var(--t-radius-button)] bg-[var(--t-primary)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[var(--t-text-primary)] tracking-tight">
            {store.name}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-8 text-sm font-medium text-[var(--t-text-muted)]">
          {effectiveNavLinks.map((link, idx) => (
            <button
              key={`${link.href}-${idx}`}
              className={`${idx === 0 ? "text-[var(--t-text-primary)] font-semibold" : "hover:text-[var(--t-text-primary)]"} transition-colors`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search + cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchClick}
            aria-label="Buscar productos"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--t-search-bg)] text-[var(--t-text-muted)] text-sm hover:opacity-90 transition-opacity min-w-[240px]"
          >
            <Search size={16} strokeWidth={2} />
            <span className="font-normal">Buscar productos...</span>
          </button>

          <button
            onClick={onCartClick}
            aria-label={`Carrito — ${cartItemCount} artículos`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--t-text-primary)] hover:bg-[var(--t-surface)] transition-colors"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[9px] font-bold flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
