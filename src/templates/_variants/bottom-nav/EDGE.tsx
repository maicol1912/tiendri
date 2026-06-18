"use client";

// Bottom nav variant: EDGE
// Extracted from tech-premium BottomNav.
// Sticky edge-to-edge bar fixed at bottom. 4 tabs with icon + label. Active tab uses foreground color.
// Hidden on lg+ (desktop uses top header nav).

import { memo } from "react";
import { Home, Search, ShoppingCart, Store } from "lucide-react";
import type { BottomNavSlotProps, NavTab } from "./types";

interface TabConfig {
  id: NavTab;
  label: string;
  icon: typeof Home;
}

const TABS: TabConfig[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "search", label: "Buscar", icon: Search },
  { id: "cart", label: "Carrito", icon: ShoppingCart },
  { id: "info", label: "Info", icon: Store },
];

const EdgeBottomNav = memo(function EdgeBottomNav({
  activeTab,
  cartCount,
  onTabChange,
}: BottomNavSlotProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--t-background)] border-t border-[var(--t-border)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navegación móvil"
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className="flex flex-col items-center justify-center gap-0.5 bg-transparent border-none cursor-pointer relative px-4 py-1"
              onClick={() => onTabChange(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[var(--t-foreground)]" : "text-[var(--t-muted)]"}`}
                />
                {id === "cart" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? "text-[var(--t-foreground)]" : "text-[var(--t-muted)]"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default EdgeBottomNav;
