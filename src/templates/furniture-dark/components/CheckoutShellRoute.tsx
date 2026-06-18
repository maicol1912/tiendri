"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { CheckoutPage } from "./CheckoutPage";
import { mockStore } from "../mock/data";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CheckoutFormData } from "../types";

const EMPTY_FORM: CheckoutFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  notes: "",
};

export function CheckoutShellRoute() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const nav = useTemplateNav();
  const [formData, setFormData] = useState<CheckoutFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!formData.firstName || !formData.phone || !formData.address || !formData.city) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage({
      items,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      customerAddress: `${formData.address}, ${formData.city}${formData.state ? `, ${formData.state}` : ""}`,
      customerNotes: formData.notes,
      storePhone: mockStore.whatsapp ?? "",
      storeName: mockStore.name,
      storeSlug: mockStore.slug ?? "",
    });
    const url = buildWhatsAppUrl(mockStore.whatsapp ?? "", message);

    clearCart();
    window.open(url, "_blank");
    nav.goHome();
  }

  return (
    <CheckoutPage
      store={mockStore}
      items={items}
      totalPrice={totalPrice}
      formData={formData}
      isSubmitting={isSubmitting}
      cartItemCount={totalItems}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={nav.goCart}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
    />
  );
}
