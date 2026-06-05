"use client";

// Pets Classic — Header
// Mobile: hamburger left | store name center | avatar right
// Desktop: store name left | search center | cart + avatar right
// All colors via var(--t-*)

import Image from "next/image";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import type { StoreInfo } from "../types";
import { ASSETS } from "../mock/assets";

interface HeaderProps {
  store: StoreInfo;
  cartItemCount?: number;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  layout?: { headerStyle?: string };
}

export function Header({
  store,
  cartItemCount = 0,
  onMenuClick,
  onSearchClick,
  onCartClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "var(--t-header-bg)", borderBottom: "1px solid var(--t-border)" }}
    >
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)]"
          style={{ backgroundColor: "var(--t-surface)", border: "none", cursor: "pointer" }}
          aria-label="Abrir menú"
        >
          <Menu size={18} strokeWidth={2} style={{ color: "var(--t-text-primary)" }} />
        </button>

        <button
          type="button"
          onClick={onMenuClick}
          className="flex flex-col items-center"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Tienda"
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 400,
              color: "var(--t-text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Entrega en ▾
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--t-primary)",
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {store.name}
          </span>
        </button>

        <button
          type="button"
          onClick={onProfileClick}
          className="flex items-center justify-center w-9 h-9 overflow-hidden"
          style={{
            borderRadius: "50%",
            border: "2px solid var(--t-primary)",
            cursor: "pointer",
            padding: 0,
            backgroundColor: "var(--t-surface)",
          }}
          aria-label="Mi perfil"
        >
          <Image
            src={ASSETS.avatarUser}
            alt="Avatar usuario"
            width={36}
            height={36}
            className="object-cover"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:flex items-center gap-4 px-8 h-16 max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--t-text-primary)",
            }}
          >
            {store.name}
          </span>
        </div>

        <div className="flex-1 mx-8 max-w-lg">
          <button
            type="button"
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 px-4"
            style={{
              height: 44,
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-search-bg)",
              border: "1.5px solid var(--t-border-input, var(--t-border))",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
            aria-label="Buscar productos"
          >
            <Search size={16} strokeWidth={2} style={{ color: "var(--t-primary)" }} />
            <span style={{ fontSize: "13px", fontWeight: 400, color: "var(--t-text-muted)" }}>
              Buscar
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onCartClick}
            className="relative flex items-center justify-center w-10 h-10"
            style={{
              borderRadius: "50%",
              backgroundColor: "var(--t-surface)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={`Carrito${cartItemCount > 0 ? ` — ${cartItemCount} artículos` : ""}`}
          >
            <ShoppingCart size={18} strokeWidth={2} style={{ color: "var(--t-primary)" }} />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: "var(--t-badge-bg)",
                  color: "var(--t-badge-text)",
                  fontSize: "9px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onProfileClick}
            className="flex items-center justify-center w-10 h-10 overflow-hidden"
            style={{
              borderRadius: "50%",
              border: "2px solid var(--t-primary)",
              cursor: "pointer",
              padding: 0,
              backgroundColor: "var(--t-surface)",
            }}
            aria-label="Mi perfil"
          >
            <Image
              src={ASSETS.avatarUser}
              alt="Avatar usuario"
              width={40}
              height={40}
              className="object-cover"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
