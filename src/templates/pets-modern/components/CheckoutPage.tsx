// Pet V3 Template — Checkout Page
// WhatsApp checkout following tiendri-rules.md pattern.
// ZERO hardcoded colors — all via CSS variables.

import { ArrowLeft } from "lucide-react";
import { CheckoutForm } from "./CheckoutForm";
import type { CartItem, CheckoutFormData } from "../types";

interface CheckoutPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  formData: CheckoutFormData;
  onBack?: () => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function CheckoutPage({
  items,
  totalPrice,
  currencySymbol = "$",
  formData,
  onBack,
  onFieldChange,
  onSubmit,
}: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[var(--t-header-bg)]/95 backdrop-blur-sm border-b border-[var(--t-border-light)]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 flex items-center h-14">
          <button onClick={onBack} className="p-1 mr-3" aria-label="Volver">
            <ArrowLeft className="w-5 h-5 text-[var(--t-text-primary)]" />
          </button>
          <h1 className="text-[var(--t-text-primary)] text-lg font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Form */}
          <CheckoutForm
            formData={formData}
            onFieldChange={onFieldChange}
          />

          {/* Order summary */}
          <div className="mt-6 lg:mt-0 lg:w-[340px]">
            <div className="border border-[var(--t-border)] rounded-[var(--t-radius-card)] p-5 lg:sticky lg:top-24">
              <h3 className="text-[var(--t-text-primary)] text-lg font-bold mb-4">
                Resumen del pedido
              </h3>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--t-text-muted)] truncate flex-1 mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-[var(--t-text-primary)] font-medium flex-shrink-0">
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--t-border)] pt-3 flex items-center justify-between">
                <span className="text-[var(--t-text-primary)] text-base font-bold">Total</span>
                <span className="text-[var(--t-text-primary)] text-lg font-bold">
                  {formatPrice(totalPrice, currencySymbol)}
                </span>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={onSubmit}
                className="w-full mt-5 h-[56px] bg-[var(--t-whatsapp-bg)] text-[var(--t-whatsapp-text)] text-base font-bold rounded-[var(--t-radius-button)] transition-colors hover:opacity-90 active:opacity-80 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar pedido por WhatsApp
              </button>

              <p className="text-center text-[var(--t-text-muted)] text-xs mt-3">
                Tu pedido sera enviado a la tienda por WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
