"use client";

// Pets Classic — Cart Page
// Items list + order summary. TAX 2.5%, DELIVERY $5,000.
// PROCEED TO PAY → checkout. All colors via var(--t-*).

import { ShoppingBag } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { StoreInfo, CartItem, NavTab } from "../types";

const TAX_RATE = 0.025;
const DELIVERY_FEE = 5000;


interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  layout?: Partial<TemplateLayoutConfig>;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onRemoveItem?: (productId: string) => void;
  onIncrementItem?: (productId: string) => void;
  onDecrementItem?: (productId: string) => void;
  onContinueShopping?: () => void;
  onCheckout?: () => void;
}

export function CartPage({
  store,
  items,
  layout,
  activeTab = "cart",
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onTabChange,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  onContinueShopping,
  onCheckout,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (subtotal > 0 ? DELIVERY_FEE : 0);

  const isEmpty = items.length === 0;
  const exploreBtnClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-6 pb-32 lg:pb-8">
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 20 }}>
          Mi carrito
        </h1>

        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <ShoppingBag size={48} style={{ color: "var(--t-border)" }} />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--t-text-primary)" }}>
              Tu carrito está vacío
            </p>
            <p style={{ fontSize: "13px", color: "var(--t-text-muted)" }}>
              Agrega productos para continuar con tu compra.
            </p>
            <button
              type="button"
              onClick={onContinueShopping}
              className={`px-6 py-3 ${exploreBtnClass}`}
              style={{
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Items list ── */}
            <div className="flex-1 flex flex-col gap-3">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  currencySymbol={currencySymbol}
                  onIncrement={onIncrementItem}
                  onDecrement={onDecrementItem}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>

            {/* ── Order summary ── */}
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              currencySymbol={currencySymbol}
              buttonStyle={layout?.buttonStyle}
              onCheckout={onCheckout}
              onContinueShopping={onContinueShopping}
            />
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
