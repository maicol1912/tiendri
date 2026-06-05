"use client";

// Beauty Elegant Template — Bottom Navigation
// Dark glassmorphic pill. 4 tabs: Inicio (active = primary circle), others muted.
// md:hidden — desktop uses top header.
// cartItemCount + onCartClick: floating cart badge visible when cart has items.

import { Home, CalendarDays, Ticket, User, ShoppingCart } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
  onCartClick?: () => void;
}

interface NavItem {
  tab: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
}

const navItems: NavItem[] = [
  { tab: "home",     label: "Inicio",    icon: Home },
  { tab: "calendar", label: "Calendario", icon: CalendarDays },
  { tab: "tickets",  label: "Tickets",   icon: Ticket },
  { tab: "profile",  label: "Perfil",    icon: User },
];

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
  onCartClick,
}: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      aria-label="Navegación inferior"
    >
      <div
        className="max-w-md mx-auto flex items-center justify-around"
        style={{
          backgroundColor: "var(--t-bottom-nav-bg)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          borderRadius: "9999px",
          height: "60px",
          padding: "8px 16px",
        }}
      >
        {navItems.map(({ tab, label, icon: Icon }) => {
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
              onClick={() => onTabChange?.(tab)}
            >
              <Icon
                size={isActive ? 20 : 22}
                strokeWidth={1.75}
                color="#FFFFFF"
              />
            </button>
          );
        })}
      </div>

      {/* Floating cart button — appears above the pill when cart has items */}
      {cartItemCount > 0 && onCartClick && (
        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Carrito (${cartItemCount} artículo${cartItemCount !== 1 ? "s" : ""})`}
          className="absolute -top-14 right-0 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "var(--t-primary)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ShoppingCart size={20} strokeWidth={1.75} color="#FFFFFF" aria-hidden="true" />
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold leading-none"
            style={{
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
            }}
            aria-hidden="true"
          >
            {cartItemCount > 99 ? "99+" : cartItemCount}
          </span>
        </button>
      )}
    </nav>
  );
}
