"use client";

// Beauty Elegant Template — Checkout Page
// Form state, validation, WhatsApp link per tiendri-rules.md §1.4.

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { OrderSummary } from "./OrderSummary";
import { CheckoutForm } from "./CheckoutForm";
import { useCart } from "../context/CartContext";
import type { StoreInfo, CheckoutFormValues, CheckoutOrderItem } from "../types";

interface CheckoutPageProps {
  store: StoreInfo;
  currencySymbol?: string;
  onBack?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function validateForm(
  values: CheckoutFormValues
): Partial<Record<keyof CheckoutFormValues, string>> {
  const errors: Partial<Record<keyof CheckoutFormValues, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "El nombre es obligatorio";
  if (!values.whatsapp.trim()) {
    errors.whatsapp = "El número de WhatsApp es obligatorio";
  } else if (!/^\+?[\d\s\-()]{7,}$/.test(values.whatsapp.trim())) {
    errors.whatsapp = "Ingresa un número de WhatsApp válido";
  }
  if (!values.address.trim()) errors.address = "La dirección es obligatoria";
  return errors;
}

function buildWhatsAppMessage(
  items: CheckoutOrderItem[],
  values: CheckoutFormValues,
  currencySymbol: string,
  slug: string
): string {
  const lines: string[] = [];
  lines.push("\u{1F6CD}\u{FE0F} *Nuevo pedido*");
  lines.push("");
  lines.push("*Productos:*");
  for (const item of items) {
    const price = formatPrice(item.price * item.quantity, currencySymbol);
    const variant = item.variantLabel ? ` (${item.variantLabel})` : "";
    lines.push(`• ${item.productName}${variant} × ${item.quantity} — ${price}`);
  }
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  lines.push("");
  lines.push(`*Total: ${formatPrice(total, currencySymbol)}*`);
  lines.push("");
  lines.push("*Datos del cliente:*");
  lines.push(`• Nombre: ${values.fullName}`);
  lines.push(`• WhatsApp: ${values.whatsapp}`);
  if (values.email.trim()) lines.push(`• Email: ${values.email}`);
  lines.push(`• Dirección: ${values.address}`);
  if (values.notes.trim()) lines.push(`• Notas: ${values.notes}`);
  lines.push("");
  lines.push(`Pedido desde tiendri.com/${slug}`);
  return lines.join("\n");
}

// WhatsApp send icon
function WhatsAppIcon({ size = 18, color = "#FFF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckoutPage({
  store,
  currencySymbol = "$",
  onBack,
}: CheckoutPageProps) {
  const { items, totalItems, clearCart } = useCart();

  const [formValues, setFormValues] = useState<CheckoutFormValues>({
    fullName: "",
    whatsapp: "",
    email: "",
    address: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CheckoutFormValues, string>>
  >({});

  const orderItems: CheckoutOrderItem[] = items.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    price: item.price,
    imageUrl: item.imageUrl,
    variantLabel: item.variantLabel ?? undefined,
    quantity: item.quantity,
  }));

  const handleFormChange = useCallback((values: CheckoutFormValues) => {
    setFormValues(values);
    setFormErrors((prev) => {
      const updated = { ...prev };
      for (const key of Object.keys(values) as (keyof CheckoutFormValues)[]) {
        if (updated[key]) delete updated[key];
      }
      return updated;
    });
  }, []);

  const handleSendOrder = useCallback(() => {
    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    if (!store.whatsapp) {
      alert("Esta tienda no tiene WhatsApp configurado.");
      return;
    }
    const message = buildWhatsAppMessage(orderItems, formValues, currencySymbol, store.slug);
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${store.whatsapp}?text=${encodedMessage}`;
    clearCart();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [formValues, orderItems, store, currencySymbol, clearCart]);

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "var(--t-background)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 md:px-6 h-14">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--t-radius-button)] flex-shrink-0"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Volver al carrito"
            onClick={onBack}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="var(--t-foreground)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex items-baseline gap-2 flex-1 min-w-0">
            <h1 className="text-lg font-bold" style={{ color: "var(--t-foreground)", margin: 0 }}>
              Checkout
            </h1>
            <span className="text-sm" style={{ color: "var(--t-muted)" }}>
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col pb-[calc(96px+env(safe-area-inset-bottom,0px))] lg:pb-8">
        <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row lg:items-start lg:gap-6 lg:px-6 lg:pt-6">
          {/* Left column */}
          <div className="flex flex-col flex-1 min-w-0 gap-4 px-4 pt-4 lg:px-0">
            {/* Mobile order summary */}
            <div className="lg:hidden">
              <OrderSummary items={orderItems} currencySymbol={currencySymbol} />
            </div>

            <CheckoutForm
              values={formValues}
              errors={formErrors}
              onChange={handleFormChange}
            />

            {/* Trust note */}
            <div
              className="flex items-center gap-2 p-3 rounded-2xl"
              style={{
                backgroundColor: "var(--t-icon-pill-bg)",
                border: "1px solid var(--t-border)",
              }}
            >
              <WhatsAppIcon size={20} color="var(--t-primary)" />
              <p className="text-xs" style={{ color: "var(--t-foreground)", margin: 0, lineHeight: "17px" }}>
                Tu pedido se enviará por WhatsApp a{" "}
                <strong style={{ fontWeight: 700 }}>{store.name}</strong>{" "}
                para coordinar pago y entrega.
              </p>
            </div>
          </div>

          {/* Right column — desktop sidebar */}
          <div className="hidden lg:flex flex-col w-72 flex-shrink-0 gap-4 sticky top-20 self-start">
            <OrderSummary items={orderItems} currencySymbol={currencySymbol} />
            <motion.button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-4 text-sm font-bold"
              style={{
                color: "var(--t-on-primary)",
                backgroundColor: "var(--t-primary)",
                border: "none",
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
              }}
              onClick={handleSendOrder}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon size={18} />
              Enviar pedido por WhatsApp
            </motion.button>
          </div>
        </div>
      </main>

      {/* Mobile WhatsApp CTA */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{
          backgroundColor: "var(--t-background)",
          borderTop: "1px solid var(--t-border-light)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <motion.button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-4 text-base font-bold"
            style={{
              color: "var(--t-on-primary)",
              backgroundColor: "var(--t-primary)",
              border: "none",
              borderRadius: "var(--t-radius-button)",
              cursor: "pointer",
            }}
            onClick={handleSendOrder}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon size={20} />
            Enviar pedido por WhatsApp
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
