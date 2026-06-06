import { Home, Search, ShoppingCart, Store } from "lucide-react";
import type { BottomNavProps, BottomNavTab } from "./types";

interface BottomNavTabItem {
  id: BottomNavTab;
  label: string;
  icon: typeof Home;
}

const TABS: BottomNavTabItem[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "search", label: "Buscar", icon: Search },
  { id: "cart", label: "Carrito", icon: ShoppingCart },
  { id: "info", label: "Info", icon: Store },
];

export default function FlatSolid({
  activeTab = "home",
  cartItemCount = 0,
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--t-header-bg)] border-t border-[var(--t-nav-border)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navegación móvil"
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className="flex flex-col items-center justify-center gap-0.5 bg-transparent border-none cursor-pointer relative px-4 py-1"
              onClick={() => onTabChange?.(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[var(--t-text-primary)]" : "text-[var(--t-text-muted)]"}`}
                />
                {id === "cart" && cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? "text-[var(--t-text-primary)]" : "text-[var(--t-text-muted)]"}`}
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
