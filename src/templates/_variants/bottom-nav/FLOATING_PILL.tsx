"use client";

// Bottom nav variant: FLOATING_PILL
// Extracted from beauty-elegant BottomNav.
// Dark glassmorphic pill floating above the bottom edge. Active tab shows filled circle.
// Hidden on md+ (desktop uses top header nav).

import { memo } from "react";
import { Home, Search, ShoppingCart, MapPin } from "lucide-react";
import type { BottomNavSlotProps, NavTab } from "./types";

interface NavItem {
  tab: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { tab: "home", label: "Inicio", icon: Home },
  { tab: "search", label: "Buscar", icon: Search },
  { tab: "cart", label: "Carrito", icon: ShoppingCart },
  { tab: "info", label: "Info", icon: MapPin },
];

const FloatingPillBottomNav = memo(function FloatingPillBottomNav({
  activeTab,
  cartCount,
  onTabChange,
}: BottomNavSlotProps) {
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      aria-label="Navegación inferior"
    >
      <div
        className="max-w-md mx-auto flex items-center justify-around"
        style={{
          backgroundColor: "var(--t-bottom-nav-bg, var(--t-card))",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          borderRadius: "9999px",
          height: "60px",
          padding: "8px 16px",
        }}
      >
        {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              className="relative flex items-center justify-center transition-all duration-200"
              style={{
                width: isActive ? "44px" : "40px",
                height: isActive ? "44px" : "40px",
                borderRadius: "50%",
                backgroundColor: isActive ? "var(--t-primary)" : "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onTabChange(tab)}
            >
              <Icon
                size={isActive ? 20 : 22}
                strokeWidth={1.75}
                color="var(--t-on-primary)"
              />
              {tab === "cart" && cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold leading-none"
                  style={{
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                  }}
                  aria-hidden="true"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default FloatingPillBottomNav;
