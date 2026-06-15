"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
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
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
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
    router.push(TEMPLATE_BASE);
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
      onBack={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onNavLinkClick={(href) => {
        if (href === "/") router.push(TEMPLATE_BASE);
        else if (href === "/catalogo") router.push(`${TEMPLATE_BASE}/catalogo`);
        else if (href === "/info") router.push(`${TEMPLATE_BASE}/info`);
      }}
    />
  );
}
