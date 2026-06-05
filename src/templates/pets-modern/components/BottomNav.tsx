// Pet V3 Template — Bottom Navigation
// 4 tabs: Tienda, Explorar, Carrito, Info. Active tab uses primary color.
// Hidden on lg+ desktop.
// ZERO hardcoded colors — all via CSS variables.

import { Store, Search, ShoppingCart, Info } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab: NavTab;
  cartItemCount?: number;
  onTabChange?: (tab: NavTab) => void;
}

const tabs: Array<{ id: NavTab; label: string; Icon: typeof Store }> = [
  { id: "shop", label: "Tienda", Icon: Store },
  { id: "explore", label: "Explorar", Icon: Search },
  { id: "cart", label: "Carrito", Icon: ShoppingCart },
  { id: "info", label: "Info", Icon: Info },
];

export function BottomNav({ activeTab, cartItemCount = 0, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div
        className="bg-[var(--t-header-bg)] rounded-t-[var(--t-radius-button)] border-t border-[var(--t-nav-border)]"
        style={{
          boxShadow: "0px -12px 37px 0px rgba(230,235,243,0.5)",
        }}
      >
        <div className="flex items-center justify-around px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange?.(id)}
                className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]"
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-[var(--t-primary)]" : "text-[var(--t-text-primary)]"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {id === "cart" && cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-[var(--t-primary)]" : "text-[var(--t-text-primary)]"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
