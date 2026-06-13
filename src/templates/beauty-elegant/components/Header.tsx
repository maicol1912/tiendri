// Beauty Elegant Template — Desktop Header
// Glassmorphic header: backdrop-blur + purple border tint.
// Visible md+. Logo + nav links + search + cart icons.

import { Search, ShoppingCart } from "lucide-react";
import type { StoreInfo } from "../types";

interface HeaderProps {
  store: StoreInfo;
  cartItemCount?: number;
  layout?: { headerStyle?: string };
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
}

export function Header({
  store,
  cartItemCount = 0,
  onSearchOpen,
  onCartOpen,
}: HeaderProps) {
  return (
    <header
      className="hidden md:block sticky top-0 z-40"
      style={{
        backgroundColor: "var(--t-background)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--t-nav-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Brand name */}
        <h1
          className="text-[22px] font-extrabold m-0"
          style={{ color: "var(--t-foreground)" }}
        >
          {store.name}
        </h1>

        {/* Center nav links */}
        <nav className="flex items-center gap-8" aria-label="Navegación principal">
          {["Inicio", "Productos", "Nosotros"].map((link) => (
            <span
              key={link}
              className="text-sm font-medium cursor-pointer transition-colors hover:text-[var(--t-primary)]"
              style={{ color: "var(--t-muted)" }}
            >
              {link}
            </span>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Buscar"
            onClick={onSearchOpen}
          >
            <Search size={20} strokeWidth={1.75} color="var(--t-muted)" />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] transition-colors hover:bg-[var(--t-icon-pill-bg)]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Carrito de compras"
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} strokeWidth={1.75} color="var(--t-muted)" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-[var(--t-radius-button)] text-[var(--t-on-primary)] text-[9px] font-bold leading-none"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
