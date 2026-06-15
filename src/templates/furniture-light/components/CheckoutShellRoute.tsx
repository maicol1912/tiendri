"use client";

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureStoreInfo, FurnitureCheckoutFormData, FurnitureNavTab } from "../types";

type TemplateMode = "preview" | "live";

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
    const shippingItem = {
      productId: "__shipping__",
      name: "Envío estándar",
      price: shipping,
      quantity: 1,
      imageUrl: null,
      variantName: null,
    };
    const message = buildWhatsAppMessage({
      items: [...items, shippingItem],
      customerName: formData.nombre,
      customerPhone: formData.whatsapp,
      customerEmail: formData.email,
      customerAddress: formData.direccion,
      customerNotes: formData.notas,
      storePhone: store.whatsapp,
      storeName: store.name,
      storeSlug: store.slug ?? "",
      currencySymbol,
    });

    const waUrl = buildWhatsAppUrl(store.whatsapp, message);
    clearCart();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [formData, store, items, totalPrice, currencySymbol, clearCart, mode]);

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

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
          style={{ backgroundColor: "var(--t-primary)", color: "var(--t-on-primary)" }}
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
        layout={config.layout}
        currencySymbol={currencySymbol}
        activeTab="cart"
        cartItemCount={totalCartItems}
        formData={formData}
        mode={mode}
        onSearchClick={nav.goSearch}
        onCartClick={nav.goCart}
        onNavLinkClick={handleNavLinkClick}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        onTabChange={handleTabChange}
      />
    </>
  );
}
