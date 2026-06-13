"use client";

// Beauty Soft Template — Bottom Navigation
// Floating pill with 4 tabs. Active tab = colored pill with label + icon.
// ZERO hardcoded colors — all via var(--t-*).

import { Home, ShoppingCart, Search, Store } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
}

interface NavItem {
  tab: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { tab: "home", label: "Inicio", icon: Home },
  { tab: "cart", label: "Carrito", icon: ShoppingCart },
  { tab: "search", label: "Buscar", icon: Search },
  { tab: "info", label: "Info", icon: Store },
];

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
      aria-label="Navegación principal"
    >
      <div
        className="max-w-md mx-auto flex items-center justify-around"
        style={{
          backgroundColor: "var(--t-surface)",
          borderRadius: "36px",
          height: "63px",
          padding: "8px 10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {navItems.map(({ tab, label, icon: Icon }) => {
          const isActive = activeTab === tab;
          const showBadge = tab === "cart" && cartItemCount > 0 && !isActive;

          return (
            <button
              key={tab}
              type="button"
              className="relative flex items-center justify-center gap-[6px] border-0 cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "var(--font-heading, var(--font-sans))",
                fontSize: "17px",
                fontWeight: 400,
                color: isActive ? "var(--t-on-primary)" : "var(--t-muted)",
                backgroundColor: isActive ? "var(--t-primary)" : "transparent",
                borderRadius: "31px",
                height: "47px",
                padding: isActive ? "0 20px" : "0 16px",
                lineHeight: "22px",
                letterSpacing: "-0.408px",
              }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onTabChange?.(tab)}
            >
              <Icon
                size={isActive ? 21 : 24}
                strokeWidth={1.75}
                className={isActive ? "text-[var(--t-on-primary)]" : "text-[var(--t-muted)]"}
              />
              {isActive && <span>{label}</span>}

              {showBadge && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold leading-none"
                  style={{
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                    fontFamily: "var(--font-sans)",
                  }}
                  aria-hidden="true"
                >
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
