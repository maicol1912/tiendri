// Tech Premium Template — Cart Page
// Desktop: 2-col — cart items left, order summary right (sticky).
// Mobile: stacked — items + summary below.
// Visual only — handlers come as props.

import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { StoreInfo, CartItem, NavTab } from "../types";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  layout?: Partial<TemplateLayoutConfig>;
  shipping?: number;
  tax?: number;
  currencySymbol?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function CartPage({
  store,
  items,
  navLinks,
  footerServices,
  footerAssistance,
  layout,
  shipping = 29,
  tax = 50,
  currencySymbol = "$",
  activeTab = "cart",
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onTabChange,
  onNavLinkClick,
}: CartPageProps) {
  const proceedBtnClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + tax + shipping;
  const isEmpty = items.length === 0;

  return (
    <div className="bg-[var(--t-section-bg)] min-h-screen font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Main content */}
      <main className="flex-1 px-4 py-10 lg:px-[160px] lg:py-[112px]">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <p className="text-xl font-semibold text-[var(--t-text-primary)]">Tu carrito está vacío</p>
            <p className="text-base text-[var(--t-text-secondary)]">Explorá los productos y agregá artículos a tu carrito</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Cart items */}
            <div className="flex flex-col gap-10 flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-[var(--t-text-primary)]">Carrito de compras</h1>

              <div className="flex flex-col gap-10">
                {items.map((item, idx) => (
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    currencySymbol={currencySymbol}
                    isLast={idx === items.length - 1}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              currencySymbol={currencySymbol}
              buttonStyle={layout?.buttonStyle}
              onCheckout={onCheckout}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      {/* Bottom nav — mobile */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
