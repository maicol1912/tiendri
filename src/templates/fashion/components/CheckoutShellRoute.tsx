"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { CheckoutPage } from "./CheckoutPage";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { StoreInfo, CheckoutFormData, NavTab } from "../types";

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

    const message = buildWhatsAppMessage({
      items,
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
  return <CheckoutShellInner store={store} currencySymbol={currencySymbol} />;
}
