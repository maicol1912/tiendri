"use client";

// Furniture Light — Bottom Navigation (mobile only)
// 4 tabs: Inicio | Descubrir | Carrito | Info
// Active: primary color indicator bar at top + filled icon
// ZERO hardcoded colors

import { Home, Sofa, ShoppingCart, Store } from "lucide-react";
import type { FurnitureNavTab } from "../types";

interface BottomNavProps {
  activeTab: FurnitureNavTab;
  cartItemCount?: number;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function BottomNav({ activeTab, cartItemCount = 0, onTabChange }: BottomNavProps) {
  const tabs: Array<{
    key: FurnitureNavTab;
    label: string;
    icon: (active: boolean) => React.ReactNode;
    badge?: boolean;
  }> = [
    {
      key: "home",
      label: "Inicio",
      icon: (active) => <Home size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
    },
    {
      key: "search",
      label: "Descubrir",
      icon: (active) => <Sofa size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
    },
    {
      key: "cart",
      label: "Carrito",
      icon: (active) => <ShoppingCart size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
      badge: true,
    },
    {
      key: "info",
      label: "Info",
      icon: (active) => <Store size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
    },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--t-background)]"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.04)" }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around px-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const showBadge = tab.badge && cartItemCount > 0;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className="relative flex flex-col items-center justify-center py-3 px-4 transition-colors"
              style={{ color: isActive ? "var(--t-primary)" : "var(--t-muted)" }}
              aria-current={isActive ? "page" : undefined}
              aria-label={tab.label}
            >
              {isActive && (
                <div
                  className="absolute top-0 w-8 h-1 rounded-b-full"
                  style={{ backgroundColor: "var(--t-primary)" }}
                />
              )}
              <div className="relative">
                {tab.icon(isActive)}
                {showBadge && (
                  <span
                    className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold leading-none"
                    style={{
                      backgroundColor: "var(--t-primary)",
                      color: "var(--t-on-primary)",
                    }}
                    aria-hidden="true"
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
