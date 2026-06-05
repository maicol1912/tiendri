"use client";

// Furniture Light — Bottom Navigation (mobile only)
// 4 tabs: Inicio | Descubrir | Favoritos | Perfil
// Active: primary color indicator bar at top + filled icon
// ZERO hardcoded colors

import { Home, Sofa, Bookmark, User } from "lucide-react";
import type { FurnitureNavTab } from "../types";

interface BottomNavProps {
  activeTab: FurnitureNavTab;
  cartItemCount?: number;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: Array<{
    key: FurnitureNavTab;
    label: string;
    icon: (active: boolean) => React.ReactNode;
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
      key: "wishlist",
      label: "Favoritos",
      icon: (active) => <Bookmark size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
    },
    {
      key: "cart",
      label: "Perfil",
      icon: (active) => <User size={24} strokeWidth={active ? 2.2 : 1.6} fill={active ? "currentColor" : "none"} />,
    },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--t-header-bg)]"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.04)" }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around px-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className="relative flex flex-col items-center justify-center py-3 px-4 transition-colors"
              style={{ color: isActive ? "var(--t-primary)" : "var(--t-text-muted)" }}
              aria-current={isActive ? "page" : undefined}
              aria-label={tab.label}
            >
              {isActive && (
                <div
                  className="absolute top-0 w-8 h-1 rounded-b-full"
                  style={{ backgroundColor: "var(--t-primary)" }}
                />
              )}
              {tab.icon(isActive)}
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
