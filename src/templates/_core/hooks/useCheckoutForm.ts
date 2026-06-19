"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/templates/_core/cart";
import type { CartItem } from "@/types/domain/cart";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/storefront/whatsapp";
import type { StoreInfo } from "@/types/domain/store";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

export type FieldErrors = Partial<Record<keyof CheckoutFormData, string>>;

export interface UseCheckoutFormReturn {
  formData: CheckoutFormData;
  errors: FieldErrors;
  isSubmitting: boolean;
  handleFieldChange: (field: keyof CheckoutFormData, value: string) => void;
  handleSubmit: () => void;
  isValid: boolean;
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateForm(data: CheckoutFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
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

  if (!data.direccion.trim()) {
    errors.direccion = "La dirección de entrega es requerida";
  }

  return errors;
}

function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCheckoutForm(
  store: StoreInfo,
  items: CartItem[],
  currencySymbol: string,
  mode: "preview" | "live" = "preview"
): UseCheckoutFormReturn {
  const { clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: "",
    whatsapp: "",
    email: "",
    direccion: "",
    notas: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    if (mode === "preview") {
      alert(
        "¡Tu tienda con este template estaría lista para recibir pedidos via WhatsApp! Creá la tuya gratis en tiendri.com"
      );
      return;
    }

    // mode === "live"
    if (!store.whatsapp) {
      setErrors({ nombre: "Esta tienda no tiene número de WhatsApp configurado." });
      return;
    }

    if (items.length === 0) {
      return;
    }

    setIsSubmitting(true);

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
    setIsSubmitting(false);
  }, [formData, items, store, currencySymbol, clearCart, mode]);

  const isValid = !hasErrors(validateForm(formData));

  return {
    formData,
    errors,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
    isValid,
  };
}
