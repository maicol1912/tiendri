// Pet V3 Template — Cart Page
// Cart items + order summary + checkout CTA.
// ZERO hardcoded colors — all via CSS variables.

import { ArrowLeft } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";
import type { CartItem, NavTab } from "../types";
import type { ButtonStyle } from "@/types/templates";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  activeTab: NavTab;
  layout?: { buttonStyle?: ButtonStyle };
  onBack?: () => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  activeTab,
  layout,
  onBack,
  onCheckout,
  onContinueShopping,
  onIncrement,
  onDecrement,
  onRemove,
  onTabChange,
}: CartPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-[var(--t-background)] pb-24 lg:pb-8">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[var(--t-header-bg)]/95 backdrop-blur-sm border-b border-[var(--t-border-light)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex items-center h-14">
          <button onClick={onBack} className="p-1 mr-3" aria-label="Volver">
            <ArrowLeft className="w-5 h-5 text-[var(--t-text-primary)]" />
          </button>
          <h1 className="text-[var(--t-text-primary)] text-lg font-bold">Mi carrito</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 mt-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-[var(--t-text-muted)] text-lg font-medium">
              Tu carrito esta vacio
            </p>
            <button
              onClick={onBack}
              className="mt-4 text-[var(--t-primary)] text-base font-medium hover:underline"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Cart items */}
            <div className="flex-1 space-y-4">
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

            {/* Order summary */}
            <OrderSummary
              totalPrice={totalPrice}
              currencySymbol={currencySymbol}
              buttonStyle={layout?.buttonStyle}
              onCheckout={onCheckout}
              onContinueShopping={onContinueShopping}
            />
          </div>
        )}
      </div>

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
