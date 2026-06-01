// Pet V3 Template — Cart Page
// Cart items + order summary + checkout CTA.
// ZERO hardcoded colors — all via CSS variables.

import Image from "next/image";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { BottomNav } from "./BottomNav";
import type { CartItem, NavTab } from "../types";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  activeTab: NavTab;
  onBack?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onTabChange?: (tab: NavTab) => void;
}

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  activeTab,
  onBack,
  onCheckout,
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
                <div
                  key={item.productId}
                  className="flex items-center gap-4 p-3 border border-[var(--t-border)] rounded-[var(--t-radius-card)]"
                >
                  {/* Image */}
                  <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[var(--t-surface)] rounded-[var(--t-radius-button)] overflow-hidden flex-shrink-0">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="100px"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--t-text-primary)] text-sm font-medium line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[var(--t-text-primary)] text-base font-bold mt-1">
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </p>

                    {/* Quantity stepper */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => onDecrement?.(item.productId)}
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--t-radius-button)] border border-[var(--t-border)] text-[var(--t-text-primary)] hover:border-[var(--t-primary)] transition-colors"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[var(--t-text-primary)] text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onIncrement?.(item.productId)}
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--t-radius-button)] border border-[var(--t-border)] text-[var(--t-text-primary)] hover:border-[var(--t-primary)] transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemove?.(item.productId)}
                    className="p-2 text-[var(--t-text-muted)] hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="mt-6 lg:mt-0 lg:w-[380px] lg:sticky lg:top-24">
              <div className="border border-[var(--t-border)] rounded-[var(--t-radius-card)] p-5">
                <h3 className="text-[var(--t-text-primary)] text-lg font-bold mb-4">
                  Resumen del pedido
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--t-text-muted)]">Subtotal</span>
                    <span className="text-[var(--t-text-primary)] font-medium">
                      {formatPrice(totalPrice, currencySymbol)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--t-text-muted)]">Envio</span>
                    <span className="text-[var(--t-primary)] font-medium">Via WhatsApp</span>
                  </div>
                  <div className="border-t border-[var(--t-border)] pt-3 flex items-center justify-between">
                    <span className="text-[var(--t-text-primary)] text-base font-bold">Total</span>
                    <span className="text-[var(--t-text-primary)] text-lg font-bold">
                      {formatPrice(totalPrice, currencySymbol)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full mt-5 h-[56px] bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-base font-bold uppercase rounded-[var(--t-radius-button)] transition-colors hover:opacity-90 active:opacity-80"
                >
                  Continuar al checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav — mobile only */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
