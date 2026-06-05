// Fashion Template — Cart Page (Bolsa de Compras)
// Two tabs (CARRITO, FAVORITOS) → Cart items list → Order summary
// Empty state: "TU CARRITO ESTÁ VACÍO" with "SEGUIR COMPRANDO" button.
// Monochromatic B&W. Background: var(--t-background).

import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import type { StoreInfo, CartItem, NavTab } from "../types";

const fmt = new Intl.NumberFormat("en-US");

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  totalPrice: number;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: { buttonStyle?: string };
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProductClick?: (productId: string) => void;
  onRemoveItem?: (productId: string) => void;
  onIncrementItem?: (productId: string) => void;
  onDecrementItem?: (productId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

export function CartPage({
  store,
  items,
  totalPrice,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  onBack,
  onSearchClick,
  onCartClick,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  onCheckout,
  onContinueShopping,
  onTabChange,
}: CartPageProps) {
  const btnClass = BUTTON_STYLE_MAP[(layout?.buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];
  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-4 md:pt-6 pb-[140px] lg:pb-12">
        {/* Back button */}
        <button
          type="button"
          className="flex items-center gap-1 mb-4 transition-opacity hover:opacity-60 bg-transparent border-0 p-0 cursor-pointer"
          onClick={onBack}
          aria-label="Volver"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="text-[var(--t-text-primary)]"
          />
        </button>

        {/* Tab header: CARRITO / FAVORITOS */}
        <div className="flex gap-6 mb-8">
          <span
            className="cursor-pointer text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[1.5px] text-[var(--t-text-primary)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            CARRITO
          </span>
          <span
            className="cursor-pointer text-lg md:text-xl lg:text-2xl font-normal uppercase tracking-[1.5px] text-[var(--t-text-muted)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            FAVORITOS
          </span>
        </div>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="mb-2 text-lg md:text-xl font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              TU CARRITO ESTÁ VACÍO
            </p>
            <p
              className="mb-8 text-sm md:text-base text-[var(--t-text-secondary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              Explora nuestra tienda y encuentra algo que te guste.
            </p>
            <button
              type="button"
              className={`px-8 py-3 transition-opacity hover:opacity-80 cursor-pointer border ${btnClass}`}
              style={{
                borderRadius: "var(--t-radius-button)",
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onClick={onContinueShopping}
            >
              SEGUIR COMPRANDO
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Cart items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  currencySymbol={currencySymbol}
                  onRemove={onRemoveItem}
                  onIncrement={onIncrementItem}
                  onDecrement={onDecrementItem}
                />
              ))}

              {/* Continue shopping link */}
              <button
                type="button"
                className="mt-4 transition-opacity hover:opacity-60 bg-transparent border-0 p-0 cursor-pointer"
                onClick={onContinueShopping}
                style={{
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontSize: "11px",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--t-text-secondary)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Seguir Comprando
              </button>
            </div>

            {/* Order summary — sticky sidebar on desktop */}
            <div className="mt-8 lg:mt-0 lg:w-[380px] lg:sticky lg:top-24 hidden lg:block">
              <OrderSummary
                totalPrice={totalPrice}
                cartItemCount={cartItemCount}
                currencySymbol={currencySymbol}
                onCheckout={onCheckout}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile/tablet sticky checkout bar — sits ABOVE the bottom nav */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-[60px] left-0 right-0 z-40 bg-[var(--t-card-bg)] border-t border-[var(--t-border)] px-4 py-3 flex items-center justify-between">
          <div>
            <p
              className="text-xs text-[var(--t-text-secondary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              Total
            </p>
            <p
              className="text-lg font-bold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              {currencySymbol}{fmt.format(totalPrice)}
            </p>
          </div>
          <button
            type="button"
            className={`px-8 py-3 transition-opacity hover:opacity-80 cursor-pointer border ${btnClass}`}
            style={{
              borderRadius: "var(--t-radius-button)",
              fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onClick={onCheckout}
          >
            CHECKOUT
          </button>
        </div>
      )}

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
