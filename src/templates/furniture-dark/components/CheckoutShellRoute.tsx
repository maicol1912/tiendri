"use client";

// Furniture Dark — CheckoutShellRoute
// Form state + buildWhatsAppMessage using Intl.NumberFormat("en-US")
// NOT toLocaleString — tiendri rule

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { CheckoutPage } from "./CheckoutPage";
import { mockStore } from "../mock/data";
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

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildWhatsAppMessage(
  formData: CheckoutFormData,
  items: { name: string; quantity: number; price: number }[],
  total: number,
  storeName: string
): string {
  const itemLines = items
    .map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
    .join("\n");

  return encodeURIComponent(
    `¡Hola ${storeName}! 👋\n\nQuiero hacer un pedido:\n\n${itemLines}\n\n*Total: ${formatPrice(total)}*\n\n` +
      `📦 Datos de entrega:\nNombre: ${formData.firstName} ${formData.lastName}\nDirección: ${formData.address}, ${formData.city}${formData.state ? `, ${formData.state}` : ""}\nTeléfono: ${formData.phone}` +
      (formData.notes ? `\nNotas: ${formData.notes}` : "")
  );
}

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

    const message = buildWhatsAppMessage(formData, items, totalPrice, mockStore.name);
    const whatsappNumber = mockStore.whatsapp?.replace(/\D/g, "") ?? "";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;

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
    />
  );
}
