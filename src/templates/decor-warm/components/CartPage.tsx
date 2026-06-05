// Decor Warm Template — Cart Page (Presentational)
// Item list with 66px linen thumbnails + QuantityStepper.
// Price breakdown: Subtotal / Envío / Total.
// Full-width peach pill CTA at bottom.
// ZERO hardcoded colors — all via var(--t-*).

import { ArrowLeft } from "lucide-react";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import { BottomNav } from "./BottomNav";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { CartItem } from "../context/CartContext";
import type { DecorWarmNavTab } from "../types";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  layout?: { buttonStyle?: string };
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  layout,
  onBack,
  onGoHome,
  onCheckout,
  onIncrement,
  onDecrement,
  onRemove,
  onTabChange,
}: CartPageProps) {
  const btnClass = BUTTON_STYLE_MAP[(layout?.buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];
  const isEmpty = items.length === 0;
  const TAX_RATE = 0;
  const DELIVERY = 0;
  const subtotal = totalPrice;
  const total = subtotal + TAX_RATE + DELIVERY;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          backgroundColor: "var(--t-header-bg)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--t-surface)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver"
          onClick={onBack}
        >
          <ArrowLeft size={18} style={{ color: "var(--t-dark-mode)" }} />
        </button>

        <span
          style={{
            color: "var(--t-dark-mode)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Mi carrito
        </span>

        <div style={{ width: 38 }} aria-hidden="true" />
      </div>

      {/* ── Main ── */}
      <main
        className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 pt-4"
        style={{
          paddingBottom: isEmpty
            ? "calc(80px + env(safe-area-inset-bottom, 0px))"
            : "calc(220px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-primary)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Tu carrito está vacío
            </p>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "14px",
                margin: 0,
              }}
            >
              Agrega productos para continuar
            </p>
            <button
              type="button"
              className={`border ${btnClass}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
                padding: "12px 28px",
              }}
              onClick={onGoHome}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                currencySymbol={currencySymbol}
                onIncrement={() => onIncrement?.(item.productId)}
                onDecrement={() => onDecrement?.(item.productId)}
                onRemove={() => onRemove?.(item.productId)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Price breakdown + CTA (fixed bottom) ── */}
      {!isEmpty && (
        <OrderSummary
          subtotal={subtotal}
          total={total}
          currencySymbol={currencySymbol}
          buttonStyle={layout?.buttonStyle}
          onCheckout={onCheckout}
          onContinueShopping={onGoHome}
        />
      )}

      <BottomNav
        activeTab="cart"
        cartItemCount={items.reduce((s, i) => s + i.quantity, 0)}
        onTabChange={onTabChange}
      />
    </div>
  );
}
