"use client";

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, CheckoutFormData } from "../types";

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

const EMPTY_FORM: CheckoutFormData = {
  nombre: "",
  whatsapp: "",
  email: "",
  direccion: "",
  notas: "",
};

interface FieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

function validateForm(data: CheckoutFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.nombre.trim()) errors.nombre = "El nombre es obligatorio";
  if (!data.whatsapp.trim()) errors.whatsapp = "El número de WhatsApp es obligatorio";
  else if (!/^\+?[\d\s\-().]{7,20}$/.test(data.whatsapp.trim()))
    errors.whatsapp = "Número de WhatsApp inválido";
  if (!data.direccion.trim()) errors.direccion = "La dirección de entrega es obligatoria";
  return errors;
}


export function CheckoutShellRoute({
  store,
  currencySymbol = "$",
}: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice: subtotal, clearCart } = useCart();
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;

  const [formData, setFormData] = useState<CheckoutFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavLinkClick = useCallback((href: string) => {
    if (href === "/") nav.goHome();
    else if (href === "/catalogo") nav.goListing();
    else if (href === "/info") nav.goInfo();
  }, [nav]);

  const handleFieldChange = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [formErrors]
  );

  const handleSubmit = useCallback(() => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage({
      items,
      customerName: formData.nombre,
      customerPhone: formData.whatsapp,
      customerEmail: formData.email,
      customerAddress: formData.direccion,
      customerNotes: formData.notas,
      storePhone: store.whatsapp ?? "",
      storeName: store.name,
      storeSlug: store.slug ?? "",
      currencySymbol,
    });

    clearCart();
    window.open(buildWhatsAppUrl(store.whatsapp ?? "", message), "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    nav.goHome();
  }, [formData, store, items, subtotal, currencySymbol, clearCart, nav]);

  return (
    <CheckoutPage
      store={store}
      items={items}
      subtotal={subtotal}
      currencySymbol={currencySymbol}
      activeTab="cart"
      activeHref={undefined}
      formData={formData}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      layout={layout}
      onFormChange={handleFieldChange}
      onSubmit={handleSubmit}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
