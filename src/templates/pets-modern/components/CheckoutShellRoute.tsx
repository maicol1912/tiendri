"use client";

// Pet V3 Template — Checkout Shell Route
// WhatsApp checkout: form state + message builder + redirect.
// Per tiendri-rules.md: wa.me/{phone}?text={encoded}, footer: "Pedido desde tiendri.com/{slug}"

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo, CheckoutFormData } from "../types";

function formatCOP(price: number, symbol = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function buildWhatsAppMessage(
  store: StoreInfo,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number,
  formData: CheckoutFormData,
  symbol: string
): string {
  const parts: Array<string | null> = [
    `*Nuevo pedido — ${store.name}*`,
    "",
    "*Productos:*",
    ...items.map(
      (item) =>
        `- ${item.name} x ${item.quantity} = ${formatCOP(item.price * item.quantity, symbol)}`
    ),
    "",
    `*Total: ${formatCOP(total, symbol)}*`,
    "",
    "*Datos del cliente:*",
    `- Nombre: ${formData.nombre}`,
    `- WhatsApp: ${formData.whatsapp}`,
    formData.email ? `- Email: ${formData.email}` : null,
    `- Direccion: ${formData.direccion}`,
    formData.notas ? `- Notas: ${formData.notas}` : null,
    "",
    `_Pedido desde tiendri.com/${store.slug}_`,
  ];

  return parts.filter((line): line is string => line !== null).join("\n");
}

function validateForm(data: CheckoutFormData): string | null {
  if (!data.nombre.trim()) return "El nombre es obligatorio";
  if (!data.whatsapp.trim()) return "El numero de WhatsApp es obligatorio";
  if (!data.direccion.trim()) return "La direccion es obligatoria";
  return null;
}

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CheckoutShellRoute({
  store,
  currencySymbol = "$",
}: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: "",
    whatsapp: "",
    email: "",
    direccion: "",
    notas: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleFieldChange = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormError(null);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const error = validateForm(formData);
    if (error) {
      setFormError(error);
      return;
    }

    if (!store.whatsapp) {
      setFormError("Esta tienda no tiene numero de WhatsApp configurado.");
      return;
    }

    const message = buildWhatsAppMessage(
      store,
      items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
      formData,
      currencySymbol
    );

    const phone = store.whatsapp.replace(/\D/g, "");
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    clearCart();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [formData, store, items, totalPrice, currencySymbol, clearCart]);

  return (
    <>
      {formError && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[var(--t-radius-button)] text-sm font-semibold shadow-lg bg-[var(--t-button-bg)] text-[var(--t-button-text)] max-w-[90vw]"
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}
      <CheckoutPage
        items={items}
        totalPrice={totalPrice}
        currencySymbol={currencySymbol}
        formData={formData}
        onBack={nav.goCart}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
