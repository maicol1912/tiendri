"use client";

// Beauty Elegant Template — Bottom Navigation
// Dark glassmorphic pill. 4 tabs: Inicio (active = primary circle), others muted.
// md:hidden — desktop uses top header.

import { Home, CalendarDays, Ticket, User } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
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
  onTabChange,
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
    </nav>
  );
}
