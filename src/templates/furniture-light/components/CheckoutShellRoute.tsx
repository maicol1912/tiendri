"use client";

// Furniture Light — CheckoutShellRoute
// Rendered at /template/furniture-light/checkout

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureStoreInfo, FurnitureCheckoutFormData, FurnitureNavTab } from "../types";

type TemplateMode = "preview" | "live";

function formatForWhatsApp(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function buildWhatsAppMessage(
  store: FurnitureStoreInfo,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number,
  formData: FurnitureCheckoutFormData,
  symbol: string
): string {
  const parts: Array<string | null> = [
    `*Nuevo pedido — ${store.name}*`,
    "",
    "*Productos:*",
    ...items.map(
      (item) =>
        `- ${item.name} x ${item.quantity} = ${formatForWhatsApp(item.price * item.quantity, symbol)}`
    ),
    "",
    `*Total: ${formatForWhatsApp(total, symbol)}*`,
    "",
    "*Datos del cliente:*",
    `- Nombre: ${formData.nombre}`,
    `- WhatsApp: ${formData.whatsapp}`,
    formData.email ? `- Email: ${formData.email}` : null,
    `- Dirección: ${formData.direccion}`,
    formData.notas ? `- Notas: ${formData.notas}` : null,
    "",
    `_Pedido desde tiendri.com/${store.slug}_`,
  ];
  return parts.filter((line): line is string => line !== null).join("\n");
}

function validateForm(data: FurnitureCheckoutFormData): string | null {
  if (!data.nombre.trim()) return "El nombre es obligatorio";
  if (!data.whatsapp.trim()) return "El número de WhatsApp es obligatorio";
  if (!data.direccion.trim()) return "La dirección es obligatoria";
  return null;
}

interface CheckoutShellRouteProps {
  store: FurnitureStoreInfo;
  currencySymbol?: string;
  mode?: TemplateMode;
}

export function CheckoutShellRoute({
  store,
  currencySymbol = "$",
  mode = "preview",
}: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, clearCart } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [formData, setFormData] = useState<FurnitureCheckoutFormData>({
    nombre: "",
    whatsapp: "",
    email: "",
    direccion: "",
    notas: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const totalCartItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleFieldChange = useCallback(
    (field: keyof FurnitureCheckoutFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormError(null);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (mode === "preview") {
      const error = validateForm(formData);
      if (error) { setFormError(error); return; }
      alert(
        "¡Tu tienda con este template estaría lista para recibir pedidos via WhatsApp! Creá la tuya gratis en tiendri.com"
      );
      return;
    }

    const error = validateForm(formData);
    if (error) { setFormError(error); return; }

    if (!store.whatsapp) {
      setFormError("Esta tienda no tiene número de WhatsApp configurado.");
      return;
    }

    const shipping = 15000;
    const message = buildWhatsAppMessage(
      store,
      items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
      totalPrice + shipping,
      formData,
      currencySymbol
    );

    const phone = store.whatsapp.replace(/\D/g, "");
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    clearCart();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [formData, store, items, totalPrice, currencySymbol, clearCart, mode]);

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
    },
    [nav]
  );

  return (
    <>
      {formError && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-sm font-semibold shadow-lg max-w-[90vw]"
          style={{ backgroundColor: "var(--t-primary)", color: "var(--t-button-text)" }}
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}
      <CheckoutPage
        store={store}
        items={items}
        navLinks={config.navLinks}
        layout={config.layout}
        currencySymbol={currencySymbol}
        activeTab="cart"
        cartItemCount={totalCartItems}
        formData={formData}
        mode={mode}
        onSearchClick={nav.goSearch}
        onCartClick={nav.goCart}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        onTabChange={handleTabChange}
      />
    </>
  );
}
