"use client";

// Furniture Dark — BottomNav
// 4 tabs: home / cart / wishlist / account
// Active tab: white icon; Inactive: #666666-equivalent via --t-text-footer
// Background: rgba(24,24,24,0.95) with backdrop-blur → mobile only
// ALL colors via var(--t-*)

import { Home, ShoppingBag, Heart, User } from "lucide-react";

type TabId = "home" | "cart" | "wishlist" | "account";

interface BottomNavProps {
  activeTab: TabId;
  cartItemCount?: number;
  onTab: (tab: TabId) => void;
}

const TABS = [
  { id: "home" as TabId, Icon: Home, label: "Inicio" },
  { id: "cart" as TabId, Icon: ShoppingBag, label: "Carrito" },
  { id: "wishlist" as TabId, Icon: Heart, label: "Favoritos" },
  { id: "account" as TabId, Icon: User, label: "Cuenta" },
] as const;

export function BottomNav({ activeTab, cartItemCount = 0, onTab }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      aria-label="Navegación principal"
      style={{
        backgroundColor: "rgba(24,24,24,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--t-nav-border)",
      }}
    >
      <div className="flex items-center justify-around px-4 py-3 pb-safe">
        {TABS.map(({ id, Icon, label }) => {
          const isActive = activeTab === id;
          const showBadge = id === "cart" && cartItemCount > 0;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTab(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-col items-center gap-1 min-w-[44px] py-1 transition-opacity active:opacity-70"
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.75}
                  style={{ color: isActive ? "var(--t-text-primary)" : "var(--t-text-footer)" }}
                />
                {showBadge && (
                  <span
                    className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
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
              </div>
              <span
                className="text-[10px] leading-none font-medium"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  color: isActive ? "var(--t-text-primary)" : "var(--t-text-footer)",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
