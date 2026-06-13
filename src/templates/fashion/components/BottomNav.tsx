// Fashion Template — Bottom Navigation (mobile only)
// Minimal: Home, Search, Cart, Info. Hidden on md+.
// Visual only — handlers come as props.

import { Home, Search, ShoppingBag, Store } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavTab {
  id: NavTab;
  label: string;
  icon: typeof Home;
}

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
}

const TABS: BottomNavTab[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "search", label: "Buscar", icon: Search },
  { id: "cart", label: "Carrito", icon: ShoppingBag },
  { id: "info", label: "Info", icon: Store },
];

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--t-background)] border-t border-[var(--t-border)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navegación principal"
    >
      <div className="flex items-stretch h-16">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-opacity bg-transparent border-none cursor-pointer"
              style={{
                color: isActive
                  ? "var(--t-foreground)"
                  : "var(--t-muted)",
              }}
              onClick={() => onTabChange?.(id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {id === "cart" && cartItemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1.5 w-4 h-4 flex items-center justify-center bg-[var(--t-primary)] text-[var(--t-on-primary)] text-[9px] font-medium rounded-full"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              <span
                className="text-[9px] uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: isActive ? 500 : 400,
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
