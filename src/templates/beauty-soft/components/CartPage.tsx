// Beauty Soft Template — Cart Page (Presentational)
// Soft background, white card items, discount code input, total, checkout button.
// ZERO hardcoded colors — all via var(--t-*).

import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import type { CartItem } from "@/lib/cart";
import type { StoreInfo } from "@/types/store";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle } from "@/types/templates";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  totalPrice: number;
  cartItemCount?: number;
  currencySymbol?: string;
  layout?: { buttonStyle?: ButtonStyle };
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string, variantLabel?: string | null) => void;
  onDecrement?: (productId: string, variantLabel?: string | null) => void;
  onRemove?: (productId: string, variantLabel?: string | null) => void;
  onTabChange?: (tab: "home" | "cart" | "search" | "info") => void;
  onNavLinkClick?: (href: string) => void;
}

export function CartPage({
  store,
  items,
  totalPrice,
  cartItemCount = 0,
  currencySymbol = "$",
  layout,
  onBack: _onBack,
  onGoHome,
  onCheckout,
  onIncrement,
  onDecrement,
  onTabChange,
  onNavLinkClick,
}: CartPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onNavLinkClick={onNavLinkClick}
      />

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
              style={{ backgroundColor: "var(--t-background)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-muted)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="m-0 text-base font-semibold text-[var(--t-foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Tu carrito está vacío
            </p>
            <p
              className="m-0 text-sm font-normal text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Agrega productos para continuar
            </p>
            <button
              type="button"
              className={`px-6 py-3 cursor-pointer border ${BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"]}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 600,
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
                key={`${item.productId}-${item.variantName ?? ""}`}
                item={item}
                currencySymbol={currencySymbol}
                onIncrement={() => onIncrement?.(item.productId, item.variantName)}
                onDecrement={() => onDecrement?.(item.productId, item.variantName)}
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
          buttonStyle={layout?.buttonStyle}
          onCheckout={onCheckout}
          onContinueShopping={onGoHome}
        />
      )}

      <BottomNav activeTab="cart" onTabChange={onTabChange} />
    </div>
  );
}
