// Electronics Classic — Mobile Bottom Navigation
// Fixed bottom, mobile only (md:hidden).
// All colors via var(--t-*) — ZERO hardcoded hex.

import { Home, Search, ShoppingCart, Store } from "lucide-react";
import type { NavTab } from "../types";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  /** Alias for cartItemCount — used by page shells */
  cartCount?: number;
  onTabChange?: (tab: NavTab) => void;
  /** Alias for onTabChange — used by page shells that navigate by path */
  onNavigate?: (path: string) => void;
}

const TABS: { id: NavTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "search", label: "Buscar", Icon: Search },
  { id: "cart", label: "Carrito", Icon: ShoppingCart },
  { id: "info", label: "Info", Icon: Store },
];

const TEMPLATE_BASE = "/template/electronics-classic";

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  cartCount,
  onTabChange,
  onNavigate,
}: BottomNavProps) {
  const effectiveCartCount = cartCount ?? cartItemCount;

  const handleTabClick = (tab: NavTab) => {
    onTabChange?.(tab);
    if (onNavigate) {
      const paths: Record<NavTab, string> = {
        home: TEMPLATE_BASE,
        search: `${TEMPLATE_BASE}/buscar`,
        cart: `${TEMPLATE_BASE}/carrito`,
        wishlist: TEMPLATE_BASE,
        account: TEMPLATE_BASE,
        info: `${TEMPLATE_BASE}/info`,
      };
      onNavigate(paths[tab]);
    }
  };
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-[var(--t-border)]"
      style={{ backgroundColor: "var(--t-card-bg)" }}
      aria-label="Navegación móvil"
    >
      <div className="flex items-center justify-around h-14">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors"
              style={{ color: isActive ? "var(--t-primary)" : "var(--t-text-muted)" }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon className="w-5 h-5" aria-hidden="true" />
                {id === "cart" && effectiveCartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {effectiveCartCount > 9 ? "9+" : effectiveCartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
