"use client";

// Fashion Template — Checkout Shell Route
// Form state, validation, WhatsApp message builder.
// Clears cart on successful WhatsApp redirect.
// Navigation via useTemplateNav.

import { useState, useCallback } from "react";
import { CartProvider, useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { CheckoutPage } from "./CheckoutPage";
import type { StoreInfo, CheckoutFormData, NavTab } from "../types";

// ── WhatsApp message builder ─────────────────────────────────────────────────

function formatPrice(price: number, symbol = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function buildWhatsAppMessage(
  store: StoreInfo,
  items: Array<{
    name: string;
    variantName: string | null;
    quantity: number;
    price: number;
  }>,
  total: number,
  formData: CheckoutFormData,
  symbol: string
): string {
  const lines: Array<string | null> = [
    `*Nuevo pedido — ${store.name}*`,
    "",
    "*Productos:*",
    ...items.map((item) => {
      const variantStr = item.variantName ? ` (${item.variantName})` : "";
      return `- ${item.name}${variantStr} × ${item.quantity} = ${formatPrice(item.price * item.quantity, symbol)}`;
    }),
    "",
    `*Total: ${formatPrice(total, symbol)}*`,
    "",
    "*Datos del cliente:*",
    `- Nombre: ${formData.nombre}`,
    `- WhatsApp: ${formData.whatsapp}`,
    formData.email ? `- Email: ${formData.email}` : null,
    `- Dirección: ${formData.direccion}`,
    formData.notas ? `- Notas: ${formData.notas}` : null,
    "",
    `_Pedido vía tiendri.com/${store.slug}_`,
  ];

  return lines.filter((l): l is string => l !== null).join("\n");
}

function validateForm(data: CheckoutFormData): string | null {
  if (!data.nombre.trim()) return "El nombre es obligatorio";
  if (!data.whatsapp.trim()) return "El número de WhatsApp es obligatorio";
  if (!data.direccion.trim()) return "La dirección es obligatoria";
  return null;
}

// ── Inner component ──────────────────────────────────────────────────────────

interface CheckoutShellInnerProps {
  store: StoreInfo;
  currencySymbol?: string;
}

function CheckoutShellInner({
  store,
  currencySymbol = "$",
}: CheckoutShellInnerProps) {
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
      setFormError("Esta tienda no tiene número de WhatsApp configurado.");
      return;
    }

    const message = buildWhatsAppMessage(
      store,
      items.map((item) => ({
        name: item.name,
        variantName: item.variantName,
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

  const totalCartItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <>
      {/* Validation error toast */}
      {formError && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 text-sm font-medium bg-[var(--t-primary)] text-[var(--t-on-primary)]"
          style={{
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            maxWidth: "90vw",
            letterSpacing: "0.05em",
          }}
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}

      <CheckoutPage
        store={store}
        items={items}
        totalPrice={totalPrice}
        formData={formData}
        activeTab="cart"
        cartItemCount={totalCartItems}
        currencySymbol={currencySymbol}
        onBack={() => {
          if (typeof window !== "undefined") window.history.back();
        }}
        onSearchClick={nav.goSearch}
        onCartClick={nav.goCart}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        onTabChange={handleTabChange}
      />
    </>
  );
}

// ── Public shell wrapper ─────────────────────────────────────────────────────

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CheckoutShellRoute({
  store,
  currencySymbol,
}: CheckoutShellRouteProps) {
  return (
    <CartProvider slug={store.slug}>
      <CheckoutShellInner store={store} currencySymbol={currencySymbol} />
    </CartProvider>
  );
}
