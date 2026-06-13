"use client";

// Food Night — Bottom Navigation
// Floating pill, 4 tabs: Inicio, Carrito, Buscar, Info.
// md:hidden on desktop.

import { Home, ShoppingBag, Search, Store } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
}

const TABS: { id: NavTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "cart", label: "Carrito", Icon: ShoppingBag },
  { id: "search", label: "Buscar", Icon: Search },
  { id: "info", label: "Info", Icon: Store },
];

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="md:hidden fixed bottom-4 left-4 right-4 z-50"
      style={{
        backgroundColor: "var(--t-secondary)",
        borderRadius: 44,
        height: 60,
      }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around h-full px-3">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === "cart";

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange?.(id)}
              className="flex flex-col items-center justify-center gap-1"
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.75}
                  style={{ color: "var(--t-foreground)", transition: "color 0.15s ease" }}
                />
                {isCart && cartItemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "var(--t-primary)",
                      color: "var(--t-on-primary)",
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
              {isActive && (
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: "var(--t-foreground)",
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
