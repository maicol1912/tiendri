"use client";

// Food Night — Cart Page
// Mobile: stacked; Desktop: items (left) + summary (right, sticky)

import { ShoppingCart } from "lucide-react";
import { Header } from "./Header";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, CartItem, NavTab } from "../types";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  currencySymbol?: string;
  activeTab?: NavTab;
  layout?: Record<string, unknown>;
  onBack?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onSearchClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

function formatPrice(amount: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(amount)}`;
}

export function CartPage({
  store,
  items,
  subtotal,
  discount = 0,
  deliveryFee = 0,
  currencySymbol = "$",
  activeTab = "cart",
  layout,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onSearchClick,
  onTabChange,
}: CartPageProps) {
  const total = subtotal - discount + deliveryFee;
  const isEmpty = items.length === 0;
  const ctaClass = BUTTON_STYLE_MAP["filled"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={items.length}
        layout={layout}
        onSearchClick={onSearchClick}
      />

      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-[calc(100px+env(safe-area-inset-bottom,0px))] md:pb-12">
        <h1 className="text-[18px] font-bold mb-6" style={{ color: "var(--t-foreground)" }}>
          Mi carrito
        </h1>

        {isEmpty ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            role="status"
            aria-label="Carrito vacío"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "var(--t-card)",
              }}
            >
              <ShoppingCart size={36} strokeWidth={1.5} style={{ color: "var(--t-muted)" }} />
            </div>
            <p className="text-[16px] font-semibold" style={{ color: "var(--t-foreground)" }}>
              Tu carrito está vacío
            </p>
            <p className="text-[13px] font-normal text-center" style={{ color: "var(--t-muted)" }}>
              Agrega productos deliciosos para hacer tu pedido por WhatsApp
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Items list */}
            <section aria-label="Productos en el carrito">
              <div className="flex flex-col">
                {items.map((item) => (
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    currencySymbol={currencySymbol}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </section>

            {/* Summary + CTA (sticky on desktop) */}
            <aside className="lg:sticky lg:top-6 flex flex-col gap-4">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                deliveryFee={deliveryFee}
                currencySymbol={currencySymbol}
                itemCount={items.length}
              />

              <button
                type="button"
                onClick={onCheckout}
                className={`w-full flex items-center justify-center gap-2 transition-opacity hover:opacity-90 border ${ctaClass}`}
                style={{
                  borderRadius: "var(--t-radius-button)",
                  height: 52,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
                aria-label={`Ir al pago — Total: ${formatPrice(total, currencySymbol)}`}
              >
                Ir al pago · {formatPrice(total, currencySymbol)}
              </button>
            </aside>
          </div>
        )}
      </main>

      {/* Mobile checkout CTA */}
      {!isEmpty && (
        <div
          className="md:hidden fixed left-0 right-0 z-[51] px-4 py-3"
          style={{ bottom: 72, backgroundColor: "var(--t-background)" }}
        >
          <button
            type="button"
            onClick={onCheckout}
            className="w-full flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{
              borderRadius: "var(--t-radius-button)",
              height: 52,
              backgroundColor: "var(--t-button-bg)",
              color: "var(--t-button-text)",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
            aria-label={`Ir al pago — Total: ${formatPrice(total, currencySymbol)}`}
          >
            Ir al pago · {formatPrice(total, currencySymbol)}
          </button>
        </div>
      )}

      <BottomNav
        activeTab={activeTab}
        cartItemCount={items.length}
        onTabChange={onTabChange}
      />
    </div>
  );
}
