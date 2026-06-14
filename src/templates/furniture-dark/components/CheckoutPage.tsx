// Furniture Dark — CheckoutPage
// Presentational: 2-col desktop; form left + order summary right
// ALL text Spanish Colombian; ALL colors via var(--t-*)

import { ChevronLeft } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import type { CheckoutFormData, StorefrontStore } from "../types";
import { Header } from "./Header";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

interface CheckoutPageProps {
  store: StorefrontStore;
  items: CartItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  isSubmitting?: boolean;
  cartItemCount?: number;
  activeHref?: string;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function CheckoutPage({
  store,
  items,
  totalPrice,
  formData,
  isSubmitting = false,
  cartItemCount = 0,
  activeHref,
  onChange,
  onSubmit,
  onBack,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
}: CheckoutPageProps) {
  return (
    <div
      className="min-h-screen pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
        {/* Back button */}
        <button
          type="button"
          className="flex items-center gap-1.5 mb-6 transition-opacity hover:opacity-80"
          onClick={onBack}
          aria-label="Volver al carrito"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-[var(--t-muted)]" />
          <span
            className="text-[var(--t-muted)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Volver al carrito
          </span>
        </button>

        {/* Page title */}
        <h1
          className="text-[var(--t-foreground)] mb-8"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.78px",
          }}
        >
          Resumen del pedido
        </h1>

        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Form (left) */}
          <div className="flex-1">
            <CheckoutForm formData={formData} onChange={onChange} />

            {/* Submit button */}
            <button
              type="button"
              className="w-full mt-8 py-4 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{
                backgroundColor: "var(--t-primary)",
                color: "var(--t-on-primary)",
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
              onClick={onSubmit}
              disabled={isSubmitting}
              aria-label="Enviar pedido por WhatsApp"
            >
              {isSubmitting ? "Enviando…" : "ENVIAR POR WHATSAPP"}
            </button>
          </div>

          {/* Order summary (right) */}
          <div className="mt-8 lg:mt-0 lg:w-[380px] lg:flex-shrink-0">
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
