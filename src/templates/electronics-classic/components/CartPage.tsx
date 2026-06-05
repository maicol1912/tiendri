// Electronics Classic — Cart Page (Presentational)
// Empty state + items list + summary 2-col on desktop.
// All colors via var(--t-*). ZERO hardcoded hex.

import { ShoppingCart } from "lucide-react";
import type { StorefrontStore, CartItem } from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";

interface CartPageProps {
  store: StorefrontStore;
  items: CartItem[];
  cartCount: number;
  layout?: {
    headerStyle?: string;
    footerStyle?: string;
    buttonStyle?: string;
  };
  currencySymbol?: string;
  onNavigate?: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onQuantityChange: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPage({
  store,
  items,
  cartCount,
  layout,
  currencySymbol = "$",
  onNavigate,
  onSearchSubmit,
  onCartClick,
  onQuantityChange,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartPageProps) {
  const btnClass = BUTTON_STYLE_MAP[(layout?.buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartCount={cartCount}
        layout={layout}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--t-text-primary)] py-6">
          Mi carrito
          {items.length > 0 && (
            <span className="text-[var(--t-text-muted)] font-normal text-base ml-2">
              ({items.length} {items.length === 1 ? "producto" : "productos"})
            </span>
          )}
        </h1>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
              aria-hidden="true"
            >
              <ShoppingCart className="w-10 h-10" style={{ color: "var(--t-text-muted)" }} />
            </div>
            <div>
              <p className="font-semibold text-[var(--t-text-primary)] mb-1">
                Tu carrito está vacío
              </p>
              <p className="text-[var(--t-text-muted)] text-sm">
                Agrega productos para empezar tu pedido.
              </p>
            </div>
            <button
              onClick={onContinueShopping}
              className={`px-6 py-3 text-sm font-semibold rounded-[var(--t-radius-button)] transition-opacity border ${btnClass}`}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1 min-w-0">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  currencySymbol={currencySymbol}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                />
              ))}

              <div className="mt-4">
                <button
                  onClick={onContinueShopping}
                  className="text-[var(--t-primary)] text-sm underline hover:no-underline transition-all"
                >
                  ← Seguir comprando
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-80 shrink-0">
              <OrderSummary
                items={items}
                currencySymbol={currencySymbol}
                onCheckout={onCheckout}
              />
            </div>
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
