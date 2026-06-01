"use client";

// Electronics Classic — Checkout Shell Route
// "use client" — manages form state + WhatsApp link generation.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { CheckoutPage } from "./CheckoutPage";
import type { ElectronicsClassicConfig } from "../config";
import { mockStore } from "../mock/data";
import type { CheckoutFormData } from "../types";

const fmt = new Intl.NumberFormat("en-US");

function buildWhatsAppMessage(
  formData: CheckoutFormData,
  items: Array<{ name: string; price: number; quantity: number }>,
  storeName: string,
  currencySymbol: string
): string {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const lines: string[] = [
    `*Nuevo pedido — ${storeName}*`,
    "",
    `*Nombre:* ${formData.nombre}`,
    `*WhatsApp:* ${formData.whatsapp}`,
    formData.email ? `*Email:* ${formData.email}` : "",
    `*Dirección:* ${formData.direccion}`,
    formData.notas ? `*Notas:* ${formData.notas}` : "",
    "",
    "*Productos:*",
    ...items.map(
      (i) =>
        `• ${i.name} ×${i.quantity} — ${currencySymbol}${fmt.format(i.price * i.quantity)}`
    ),
    "",
    `*Total:* ${currencySymbol}${fmt.format(subtotal)}`,
  ].filter((l) => l !== null);

  return lines.join("\n");
}

export function CheckoutShellRoute() {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { items, totalItems: cartCount, clearCart } = useCart();

  const layout = config.layout as Record<string, string> | undefined;

  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: "",
    whatsapp: "",
    email: "",
    direccion: "",
    notas: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const message = buildWhatsAppMessage(formData, items, mockStore.name, "$");
    const phone = mockStore.whatsapp ?? "";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    clearCart();

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // Redirect back home after clearing
    setTimeout(() => {
      router.push(`${TEMPLATE_BASE}`);
    }, 500);
  };

  return (
    <CheckoutPage
      store={mockStore}
      items={items}
      cartCount={cartCount}
      formData={formData}
      isSubmitting={isSubmitting}
      layout={layout}
      onNavigate={(path) => router.push(path)}
      onSearchSubmit={(q) =>
        router.push(`${TEMPLATE_BASE}/buscar?q=${encodeURIComponent(q)}`)
      }
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
    />
  );
}
