"use client";

import { useState, useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import type { CheckoutOrderItem } from "./CheckoutPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { StoreInfo } from "@/types/store";

interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

interface FieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
}

function validateForm(data: CheckoutFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.nombre.trim()) errors.nombre = "El nombre es requerido";
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
  if (!data.direccion.trim()) errors.direccion = "La dirección de entrega es requerida";
  return errors;
}


interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CheckoutShellRoute({ store, currencySymbol = "$" }: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, totalItems, clearCart } = useCart();

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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) {
      nav.goCart();
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage({
      items: orderItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl ?? null,
        variantName: null,
      })),
      customerName: formData.nombre,
      customerPhone: formData.whatsapp,
      customerEmail: formData.email,
      customerAddress: formData.direccion,
      customerNotes: formData.notas,
      storePhone: store.whatsapp ?? "",
      storeName: store.name,
      storeSlug: store.slug ?? "",
      currencySymbol,
    });

    const waUrl = buildWhatsAppUrl(store.whatsapp ?? "", message);

    window.open(waUrl, "_blank", "noopener,noreferrer");

    clearCart();
    setIsSubmitting(false);
    nav.goHome();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, items, totalPrice, store, currencySymbol, clearCart, nav]);

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const orderItems: CheckoutOrderItem[] = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    imageUrl: item.imageUrl,
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
      onCartOpen={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
    />
  );
}
