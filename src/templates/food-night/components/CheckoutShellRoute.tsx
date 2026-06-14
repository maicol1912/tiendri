"use client";

// Food Night — Checkout Shell Route
// WhatsApp message builder + form validation + cart clear on submit

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
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

function buildWhatsAppMessage(
  store: StoreInfo,
  form: CheckoutFormData,
  items: { name: string; quantity: number; price: number; variantName?: string | null }[],
  total: number,
  currencySymbol: string
): string {
  const fmt = (n: number) => `${currencySymbol}${new Intl.NumberFormat("en-US").format(n)}`;
  const lines: string[] = [];
  lines.push(`🍕 *Nuevo pedido desde tiendri.com/${store.slug}*`);
  lines.push("");
  lines.push("*Productos:*");
  items.forEach((item) => {
    const size = item.variantName ? ` (${item.variantName})` : "";
    lines.push(`• ${item.quantity}× ${item.name}${size} — ${fmt(item.price * item.quantity)}`);
  });
  lines.push("");
  lines.push(`*Total: ${fmt(total)}*`);
  lines.push("");
  lines.push("*Datos del cliente:*");
  lines.push(`Nombre: ${form.nombre.trim()}`);
  lines.push(`WhatsApp: ${form.whatsapp.trim()}`);
  lines.push(`Dirección: ${form.direccion.trim()}`);
  if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
  if (form.notas.trim()) lines.push(`Notas: ${form.notas.trim()}`);
  return lines.join("\n");
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

    const phone = (store.whatsapp ?? "").replace(/\D/g, "");
    const message = buildWhatsAppMessage(store, formData, items, subtotal, currencySymbol);
    const encoded = encodeURIComponent(message);

    clearCart();
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank", "noopener,noreferrer");

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
      formData={formData}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      layout={layout}
      onFormChange={handleFieldChange}
      onSubmit={handleSubmit}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
