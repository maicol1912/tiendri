"use client";

// Bottom nav variant: DOT_INDICATOR
// Extracted from decor-warm BottomNav.
// 4 tabs: Home, Categorías (search slot), Carrito, Info.
// Active state: subtle icon fill (fillOpacity 0.08) + 4px primary-colored dot below the icon.
// Inactive state: muted color, no dot.
// Cart badge: small primary-bg circle with count.
// Background: var(--t-background), border-top: var(--t-border). Fixed bottom, 64px height. lg:hidden.

import { memo } from "react";
import { Home, LayoutGrid, ShoppingCart, Store } from "lucide-react";
import type { BottomNavSlotProps, NavTab } from "./types";

interface TabConfig {
  id: NavTab;
  label: string;
  icon: typeof Home;
}

const TABS: TabConfig[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "search", label: "Categorías", icon: LayoutGrid },
  { id: "cart", label: "Carrito", icon: ShoppingCart },
  { id: "info", label: "Info", icon: Store },
];

const DotIndicatorBottomNav = memo(function DotIndicatorBottomNav({
  activeTab,
  cartCount,
  onTabChange,
}: BottomNavSlotProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        backgroundColor: "var(--t-background)",
        borderTop: "1px solid var(--t-border)",
        height: 64,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Navegación móvil"
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === "cart";

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full bg-transparent border-none cursor-pointer"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon with optional cart badge */}
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  style={{
                    color: isActive ? "var(--t-foreground)" : "var(--t-muted)",
                    fill: isActive ? "var(--t-foreground)" : "transparent",
                    fillOpacity: isActive ? 0.08 : 0,
                    transition: "color 0.15s ease, fill 0.15s ease",
                  }}
                />
                {/* Cart badge */}
                {isCart && cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
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
                    {cartCount > 9 ? "9+" : cartCount}
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
                    backgroundColor: "var(--t-primary)",
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
});

export default DotIndicatorBottomNav;
