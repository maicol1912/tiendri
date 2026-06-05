// Furniture Dark — CartPage
// Presentational: empty state OR 2-col desktop (60%/40%) items + summary
// ALL text in Spanish Colombian; ALL colors via var(--t-*)

import { ShoppingBag } from "lucide-react";
import type { CartItem } from "../types";
import type { StorefrontStore } from "../types";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";

interface CartPageProps {
  store: StorefrontStore;
  items: CartItem[];
  totalPrice: number;
  cartItemCount?: number;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onBottomNavTab: (tab: "home" | "cart" | "wishlist" | "account") => void;
}

export function CartPage({
  store,
  items,
  totalPrice,
  cartItemCount = 0,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onContinueShopping,
  onSearchClick,
  onCartClick,
  onBottomNavTab,
}: CartPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
        {/* Page title */}
        <h1
          className="text-[var(--t-text-primary)] mb-6"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.78px",
          }}
        >
          Carrito
        </h1>

        {isEmpty ? (
          /* ── Empty state */
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <ShoppingBag size={32} strokeWidth={1.5} className="text-[var(--t-text-muted)]" />
            </div>
            <div className="text-center">
              <p
                className="text-[var(--t-text-primary)] font-semibold"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Tu carrito está vacío
              </p>
              <p
                className="mt-2 text-[var(--t-text-muted)]"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "14px",
                }}
              >
                Agrega productos para continuar
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-3.5 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--t-button-bg)",
                color: "var(--t-button-text)",
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
              }}
              onClick={onContinueShopping}
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          /* ── Cart with items */
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Items list (60%) */}
            <div className="flex-1 lg:w-[60%]">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                />
              ))}
            </div>

            {/* Summary (40%) */}
            <div className="mt-6 lg:mt-0 lg:w-[40%] lg:flex-shrink-0">
              <CartSummary
                subtotal={totalPrice}
                onCheckout={onCheckout}
                onContinueShopping={onContinueShopping}
              />
            </div>
          </div>
        )}
      </div>

      <BottomNav
        activeTab="cart"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
