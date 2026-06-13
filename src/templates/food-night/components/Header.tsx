"use client";

// Food Night — Header
// Mobile: greeting + store name left, avatar circle right.
// Desktop: avatar + name left, search bar center, icons right.

import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";
import type { StoreInfo } from "../types";

interface HeaderProps {
  store: StoreInfo;
  cartItemCount?: number;
  layout?: Record<string, unknown>;
  onSearchClick?: () => void;
  onCartClick?: () => void;
}

export function Header({
  store,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
}: HeaderProps) {
  const greeting = store.greeting ?? "Hola, Bienvenido 👋";
  const avatarSrc = store.avatar ?? store.logo;

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center px-4 md:px-6 lg:px-8 h-16 w-full">

        {/* Mobile: Greeting + store name */}
        <div className="lg:hidden flex flex-col justify-center min-w-0 flex-1">
          <span
            className="text-[12px] font-normal leading-tight"
            style={{ color: "var(--t-muted)" }}
          >
            {greeting}
          </span>
          <span
            className="truncate text-[16px] font-bold leading-tight"
            style={{ color: "var(--t-foreground)" }}
          >
            {store.name}
          </span>
        </div>

        {/* Mobile: Avatar circle */}
        <div className="lg:hidden flex items-center justify-center ml-3 flex-shrink-0">
          {avatarSrc ? (
            <div
              className="relative overflow-hidden"
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            >
              <Image
                src={avatarSrc}
                alt={store.name}
                fill
                className="object-cover"
                sizes="32px"
                priority
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center text-[13px] font-bold flex-shrink-0"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "var(--t-card)",
                color: "var(--t-foreground)",
              }}
              aria-hidden="true"
            >
              {store.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Desktop: Avatar + name */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0 min-w-0">
          {avatarSrc ? (
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{ width: 36, height: 36, borderRadius: "50%" }}
            >
              <Image
                src={avatarSrc}
                alt={store.name}
                fill
                className="object-cover"
                sizes="36px"
                priority
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center flex-shrink-0 text-[14px] font-bold"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "var(--t-card)",
                color: "var(--t-foreground)",
              }}
              aria-hidden="true"
            >
              {store.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span
            className="text-[18px] font-bold"
            style={{ color: "var(--t-foreground)" }}
          >
            {store.name}
          </span>
        </div>

        {/* Desktop: Search bar center */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-8">
          <div
            className="flex items-center gap-2 w-full max-w-sm px-4 cursor-text"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--t-border-light)",
              borderRadius: "var(--t-radius-category)",
              height: 40,
            }}
            onClick={onSearchClick}
            role="button"
            tabIndex={0}
            aria-label="Buscar productos"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSearchClick?.();
            }}
          >
            <Search
              size={15}
              strokeWidth={2}
              style={{ color: "var(--t-muted)", flexShrink: 0 }}
            />
            <span
              className="text-[13px] font-normal flex-1"
              style={{ color: "var(--t-muted)" }}
            >
              Buscar platos...
            </span>
          </div>
        </div>

        {/* Desktop: Nav icons */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          <button
            type="button"
            className="relative flex items-center justify-center w-10 h-10 rounded-full"
            aria-label={`Carrito${cartItemCount > 0 ? `, ${cartItemCount} productos` : ""}`}
            onClick={onCartClick}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <ShoppingBag size={20} strokeWidth={1.75} style={{ color: "var(--t-foreground)" }} />
            {cartItemCount > 0 && (
              <span
                className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
                style={{
                  backgroundColor: "var(--t-primary)",
                  color: "var(--t-on-primary)",
                }}
                aria-hidden="true"
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
