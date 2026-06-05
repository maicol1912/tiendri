// Furniture Light — Cart Page
// Items list with +/- (orange) buttons; dark navy summary card with voucher row, total, checkout CTA
// ZERO hardcoded colors

import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import type { FurnitureStoreInfo, FurnitureNavTab } from "../types";
import type { FurnitureCartItem } from "../types";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";

interface CartPageProps {
  store: FurnitureStoreInfo;
  items: FurnitureCartItem[];
  navLinks?: readonly { label: string; href: string }[];
  layout?: { footerStyle?: string; buttonStyle?: string };
  currencySymbol?: string;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onContinueShopping?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function CartPage({
  store,
  items,
  navLinks = [],
  layout,
  currencySymbol = "$",
  activeTab = "cart",
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onContinueShopping,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onTabChange,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15000;
  const total = subtotal + shipping;
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-32 lg:pb-8 px-5 md:px-6 lg:px-8 lg:max-w-3xl lg:mx-auto">
        <h1
          className="text-xl font-bold text-[var(--t-text-primary)] py-5"
          style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
        >
          Mi carrito{cartItemCount > 0 && ` (${cartItemCount})`}
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div
              className="w-20 h-20 flex items-center justify-center bg-[var(--t-section-bg)]"
              style={{ borderRadius: "var(--t-radius-card)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--t-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[var(--t-text-primary)]">Tu carrito está vacío</p>
            <p className="text-sm text-[var(--t-text-muted)] text-center">Explorá los productos y agregá artículos a tu carrito</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-5">
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

        {/* Order summary — dark navy card */}
        {!isEmpty && (
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            currencySymbol={currencySymbol}
            buttonStyle={layout?.buttonStyle}
            onCheckout={onCheckout}
            onContinueShopping={onContinueShopping}
          />
        )}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "search") onSearchClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
