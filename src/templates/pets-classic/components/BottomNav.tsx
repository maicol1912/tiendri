"use client";

// Pets Classic — Orange Bottom Navigation (signature!)
// Solid orange bg, curved top corners, 4 tabs.
// All colors via var(--t-*)

import { MessageSquare, Heart, ShoppingBag, User } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
}

const TABS: { id: NavTab; label: string; Icon: typeof MessageSquare }[] = [
  { id: "home", label: "Inicio", Icon: MessageSquare },
  { id: "wishlist", label: "Favoritos", Icon: Heart },
  { id: "cart", label: "Carrito", Icon: ShoppingBag },
  { id: "profile", label: "Perfil", Icon: User },
];

export function BottomNav({ activeTab = "home", cartItemCount = 0, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--t-primary)",
        borderRadius: "24px 24px 0 0",
        height: 72,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-4">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === "cart";

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange?.(id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive ? "var(--t-button-text)" : "none"}
                  style={{
                    color: isActive ? "var(--t-button-text)" : "rgba(255,255,255,0.65)",
                    transition: "all 0.15s ease",
                  }}
                />
                {isCart && cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "var(--t-secondary)",
                      color: "var(--t-background)",
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
            </button>
          );
        })}
      </div>
    </nav>
  );
}
