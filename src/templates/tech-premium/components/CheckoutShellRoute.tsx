"use client";

// Tech Premium — CheckoutShellRoute
// URL-router version of CheckoutShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/checkout

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, CheckoutFormData, NavTab, TemplateMode } from "../types";

function formatForWhatsApp(price: number, symbol: string): string {
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
        `- ${item.name} x ${item.quantity} = ${formatForWhatsApp(item.price * item.quantity, symbol)}`
    ),
    "",
    `*Total: ${formatForWhatsApp(total, symbol)}*`,
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
  mode?: TemplateMode;
}

export function CheckoutShellRoute({
  store,
  currencySymbol = "$",
  mode = "preview",
}: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, clearCart } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: "",
    whatsapp: "",
    email: "",
    direccion: "",
    notas: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const totalCartItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleFieldChange = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormError(null);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (mode === "preview") {
      const error = validateForm(formData);
      if (error) {
        setFormError(error);
        return;
      }
      alert(
        "¡Tu tienda con este template estaría lista para recibir pedidos via WhatsApp! Creá la tuya gratis en tiendri.com"
      );
      return;
    }

    // mode === "live"
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
  }, [formData, store, items, totalPrice, currencySymbol, clearCart, mode]);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") nav.goListing();
      else nav.goHome();
    },
    [nav]
  );

  return (
    <>
      {formError && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-sm font-semibold shadow-lg bg-[var(--t-primary)] text-[var(--t-on-primary)] max-w-[90vw]"
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}
      <CheckoutPage
        store={store}
        items={items}
        navLinks={config.content?.navLinks ?? []}
        footerServices={config.content?.footerServices ?? []}
        footerAssistance={config.content?.footerAssistance ?? []}
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
        onNavLinkClick={handleNavLinkClick}
      />
    </>
  );
}
