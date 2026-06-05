"use client";

// Decor Warm Template — Bottom Navigation (4 tabs)
// Home, Categories, Cart, Info.
// Active: filled icon with peach dot below. lg:hidden on desktop.

import { Home, LayoutGrid, ShoppingCart, Store } from "lucide-react";
import type { DecorWarmNavTab } from "../types";

interface BottomNavProps {
  activeTab?: DecorWarmNavTab;
  cartItemCount?: number;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

const TABS: { id: DecorWarmNavTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "categories", label: "Categorías", Icon: LayoutGrid },
  { id: "cart", label: "Carrito", Icon: ShoppingCart },
  { id: "info", label: "Info", Icon: Store },
];

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--t-header-bg)",
        borderTop: "1px solid var(--t-border)",
        height: 64,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === "cart";

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange?.(id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon with optional cart badge */}
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  style={{
                    color: isActive ? "var(--t-dark-mode)" : "var(--t-icon-inactive)",
                    transition: "color 0.15s ease",
                    fill: isActive ? `var(--t-dark-mode)` : "transparent",
                    fillOpacity: isActive ? 0.08 : 0,
                  }}
                />
                {/* Cart badge */}
                {isCart && cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "var(--t-peach)",
                      color: "#FFFFFF",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>

              {/* Active dot indicator */}
              {isActive && (
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: "var(--t-peach)",
                    marginTop: 2,
                  }}
                  aria-hidden="true"
                />
              )}

              <span className="sr-only">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
