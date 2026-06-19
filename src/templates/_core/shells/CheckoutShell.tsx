"use client";

// _core/shells/CheckoutShell.tsx
// Client boundary para la ruta de checkout.
// Gestiona formulario y envío por WhatsApp; delega render a CoreCheckoutPage.

import { useCallback } from "react";
import { CoreCheckoutPage } from "@/templates/_core/pages/CoreCheckoutPage";
import { useCheckoutForm } from "@/templates/_core/hooks/useCheckoutForm";
import type { CheckoutFormData } from "@/templates/_core/hooks/useCheckoutForm";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import type { StoreInfo } from "@/types/domain/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface CheckoutShellProps {
  store: StoreInfo;
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

export function CheckoutShell({
  store,
  config,
  currencySymbol = "$",
}: CheckoutShellProps) {
  const nav = useTemplateNav();
  const { items, totalPrice } = useCartController();

  const {
    formData,
    errors,
    isSubmitting,
    isValid,
    handleFieldChange,
    handleSubmit,
  } = useCheckoutForm(store, items, currencySymbol, "preview");

  const handleBack = useCallback(() => nav.goCart(), [nav]);

  return (
    <CoreCheckoutPage
      config={config}
      items={items}
      totalPrice={totalPrice}
      currencySymbol={currencySymbol}
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      isValid={isValid}
      handleFieldChange={(field: string, value: string) =>
        handleFieldChange(field as keyof CheckoutFormData, value)
      }
      handleSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
