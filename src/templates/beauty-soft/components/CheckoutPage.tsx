// Beauty Soft Template — Checkout Page (Presentational)
// WhatsApp order form: fullName, whatsapp, email, address, notes.
// Validation + order summary inline.
// ZERO hardcoded colors — all via var(--t-*).

import { ChevronLeft } from "lucide-react";
import { CheckoutForm } from "./CheckoutForm";
import type { CheckoutOrderItem } from "../types";

interface CheckoutFormData {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  notes: string;
}

interface FieldError {
  fullName?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

interface CheckoutPageProps {
  orderItems: CheckoutOrderItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  errors: FieldError;
  isSubmitting: boolean;
  currencySymbol?: string;
  onBack?: () => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

export function CheckoutPage({
  orderItems,
  totalPrice,
  formData,
  errors,
  isSubmitting,
  currencySymbol = "$",
  onBack,
  onFieldChange,
  onSubmit,
}: CheckoutPageProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <header className="px-5 pt-[12px] pb-0">
        <div className="max-w-5xl mx-auto flex items-center gap-[10px] h-[47px] relative">
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-section-bg)",
            }}
            aria-label="Volver"
            onClick={onBack}
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>

          <p
            className="absolute left-1/2 -translate-x-1/2 m-0 text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Finalizar pedido
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 pt-6 pb-32">
        <CheckoutForm
          orderItems={orderItems}
          totalPrice={totalPrice}
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          currencySymbol={currencySymbol}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
        />
      </main>
    </div>
  );
}
