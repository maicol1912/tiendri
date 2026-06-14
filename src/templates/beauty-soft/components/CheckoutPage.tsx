// Beauty Soft Template — Checkout Page (Presentational)
// WhatsApp order form: fullName, whatsapp, email, address, notes.
// Validation + order summary inline.
// ZERO hardcoded colors — all via var(--t-*).

import { Header } from "./Header";
import { CheckoutForm } from "./CheckoutForm";
import type { CheckoutOrderItem } from "../types";
import type { StoreInfo } from "@/types/store";

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
  store: StoreInfo;
  orderItems: CheckoutOrderItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  errors: FieldError;
  isSubmitting: boolean;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
  onNavLinkClick?: (href: string) => void;
}

export function CheckoutPage({
  store,
  orderItems,
  totalPrice,
  formData,
  errors,
  isSubmitting,
  cartItemCount = 0,
  currencySymbol = "$",
  onBack: _onBack,
  onFieldChange,
  onSubmit,
  onNavLinkClick,
}: CheckoutPageProps) {
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
