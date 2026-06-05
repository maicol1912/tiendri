"use client";

// Food Night — Sticky Add-to-Cart Bottom Bar (mobile only)

import { ShoppingCart } from "lucide-react";

interface StickyBottomBarProps {
  price: number;
  available?: boolean;
  currencySymbol?: string;
  onAddToCart?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function StickyBottomBar({
  price,
  available = true,
  currencySymbol = "$",
  onAddToCart,
}: StickyBottomBarProps) {
  return (
    <div
      className="md:hidden fixed left-0 right-0 z-[51] px-4 py-3"
      style={{ bottom: 72, backgroundColor: "var(--t-background)" }}
    >
      <button
        type="button"
        disabled={!available}
        onClick={onAddToCart}
        className="w-full flex items-center justify-center gap-2 px-5 transition-opacity hover:opacity-90"
        style={{
          borderRadius: "var(--t-radius-button)",
          height: 52,
          backgroundColor: available ? "var(--t-button-bg)" : "var(--t-card-bg)",
          border: "none",
          cursor: available ? "pointer" : "not-allowed",
        }}
        aria-label={available ? `Agregar al carrito — ${formatPrice(price, currencySymbol)}` : "Producto agotado"}
      >
        <span
          className="flex items-center gap-2 text-[14px] font-semibold"
          style={{ color: available ? "var(--t-button-text)" : "var(--t-text-muted)" }}
        >
          <ShoppingCart size={16} strokeWidth={2} />
          {available ? "Agregar al carrito" : "Agotado"}
        </span>
        {available && (
          <>
            <span className="text-[14px] font-normal" style={{ color: "var(--t-button-text)" }}>
              |
            </span>
            <span className="text-[14px] font-bold" style={{ color: "var(--t-button-text)" }}>
              {formatPrice(price, currencySymbol)}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
