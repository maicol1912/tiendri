"use client";

// Beauty Soft Template — CheckoutShellRoute
// Client boundary. Validates form, builds WhatsApp message, clears cart.

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo } from "@/types/store";

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

interface FormData {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  notes: string;
}

interface FieldError {
  fullName?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

function validateForm(data: FormData): FieldError {
  const errors: FieldError = {};

  if (!data.fullName.trim()) {
    errors.fullName = "El nombre es requerido";
  }

  if (!data.whatsapp.trim()) {
    errors.whatsapp = "El número de WhatsApp es requerido";
  } else if (!/^\+?[0-9]{7,15}$/.test(data.whatsapp.replace(/\s/g, ""))) {
    errors.whatsapp = "Ingresa un número válido (ej: 573001234567)";
  }

  if (!data.email.trim()) {
    errors.email = "El correo es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Ingresa un correo válido";
  }

  if (!data.address.trim()) {
    errors.address = "La dirección de entrega es requerida";
  }

  return errors;
}

function buildWhatsAppMessage(
  storeName: string,
  formData: FormData,
  items: Array<{ name: string; variantName?: string | null; quantity: number; price: number }>,
  totalPrice: number,
  currencySymbol: string
): string {
  const lines: string[] = [
    `*Nuevo pedido — ${storeName}*`,
    "",
    "*Datos del cliente:*",
    `• Nombre: ${formData.fullName}`,
    `• WhatsApp: ${formData.whatsapp}`,
    `• Email: ${formData.email}`,
    `• Dirección: ${formData.address}`,
    ...(formData.notes ? [`• Notas: ${formData.notes}`] : []),
    "",
    "*Productos:*",
    ...items.map(
      (item) =>
        `• ${item.quantity}× ${item.name}${item.variantName ? ` (${item.variantName})` : ""} — ${currencySymbol}${new Intl.NumberFormat("en-US").format(item.price * item.quantity)}`
    ),
    "",
    `*Total: ${currencySymbol}${new Intl.NumberFormat("en-US").format(totalPrice)}*`,
  ];

  return lines.join("\n");
}

export function CheckoutShellRoute({ store, currencySymbol = "$" }: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, totalItems, clearCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsapp: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (items.length === 0) {
      nav.goCart();
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage(
      store.name,
      formData,
      items,
      totalPrice,
      currencySymbol
    );

    const whatsappNumber = store.whatsapp?.replace(/\D/g, "") ?? "";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Clear cart and redirect home
    clearCart();
    setIsSubmitting(false);
    nav.goHome();
  }, [formData, items, totalPrice, store, currencySymbol, clearCart, nav]);

  const orderItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    imageUrl: item.imageUrl,
    variantName: item.variantName ?? undefined,
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <CheckoutPage
      store={store}
      orderItems={orderItems}
      totalPrice={totalPrice}
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      onBack={nav.goCart}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
