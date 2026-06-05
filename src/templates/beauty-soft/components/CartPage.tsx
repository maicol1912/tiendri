// Beauty Soft Template — Cart Page (Presentational)
// Soft background, white card items, discount code input, total, checkout button.
// ZERO hardcoded colors — all via var(--t-*).

import { ChevronLeft } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import type { CartItem } from "../context/CartContext";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string, variantLabel?: string | null) => void;
  onDecrement?: (productId: string, variantLabel?: string | null) => void;
  onRemove?: (productId: string, variantLabel?: string | null) => void;
  onTabChange?: (tab: "home" | "cart" | "favorites" | "profile") => void;
}

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  onBack,
  onGoHome,
  onCheckout,
  onIncrement,
  onDecrement,
  onTabChange,
}: CartPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <header className="px-5 pt-[12px] pb-0">
        <div className="max-w-5xl mx-auto flex items-center gap-[10px] h-[47px] relative">
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-section-bg)",
            }}
            aria-label="Volver"
            onClick={onBack}
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>

          <p
            className="absolute left-1/2 -translate-x-1/2 m-0 text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Mi carrito
          </p>
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-5"
        style={{
          paddingBottom: isEmpty
            ? "24px"
            : "calc(300px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-section-bg)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-text-muted)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="m-0 text-base font-semibold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Tu carrito está vacío
            </p>
            <p
              className="m-0 text-sm font-normal text-[var(--t-text-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Agrega productos para continuar
            </p>
            <button
              type="button"
              className="px-6 py-3 border-0 cursor-pointer text-[var(--t-button-text)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 600,
                backgroundColor: "var(--t-button-bg)",
                borderRadius: "var(--t-radius-button)",
              }}
              onClick={onGoHome}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.variantLabel ?? ""}`}
                item={item}
                currencySymbol={currencySymbol}
                onIncrement={() => onIncrement?.(item.productId, item.variantLabel)}
                onDecrement={() => onDecrement?.(item.productId, item.variantLabel)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom checkout section */}
      {!isEmpty && (
        <OrderSummary
          totalPrice={totalPrice}
          currencySymbol={currencySymbol}
          onCheckout={onCheckout}
        />
      )}

      <BottomNav activeTab="cart" onTabChange={onTabChange} />
    </div>
  );
}
