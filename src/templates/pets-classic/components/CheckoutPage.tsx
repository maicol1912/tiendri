"use client";

// Pets Classic — Checkout Page
// Order summary + form. "Pagar ahora" sends order via WhatsApp.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useState } from "react";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CheckoutForm } from "./CheckoutForm";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { TemplateLayoutConfig } from "@/types/templates";
import type {
  StoreInfo,
  CartItem,
  CheckoutFormData,
  NavTab,
} from "../types";

const TAX_RATE = 0.025;
const DELIVERY_FEE = 5000;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

function buildWhatsAppMessage(
  store: StoreInfo,
  items: CartItem[],
  form: CheckoutFormData,
  total: number,
  currencySymbol: string
): string {
  const lines = [
    `*Nuevo pedido — ${store.name}*`,
    ``,
    `*Cliente:* ${form.name}`,
    `*Teléfono:* ${form.phone}`,
    `*Dirección:* ${form.address}`,
    form.notes ? `*Notas:* ${form.notes}` : null,
    ``,
    `*Productos:*`,
    ...items.map(
      (i) =>
        `- ${i.name} x${i.quantity} — ${currencySymbol}${formatPrice(i.price * i.quantity)}`
    ),
    ``,
    `*Total a pagar: ${currencySymbol}${formatPrice(total)}*`,
    ``,
    `_Pedido realizado desde tiendri.com_`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return encodeURIComponent(lines);
}

interface CheckoutPageProps {
  store: StoreInfo;
  items: CartItem[];
  layout?: Partial<TemplateLayoutConfig>;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onBack?: () => void;
  onSuccess?: () => void;
}

export function CheckoutPage({
  store,
  items,
  layout,
  activeTab = "cart",
  cartItemCount = 0,
  currencySymbol = "$",
  onSearchClick,
  onCartClick,
  onMenuClick,
  onTabChange,
  onBack,
  onSuccess,
}: CheckoutPageProps) {
  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const payNowBtnClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (subtotal > 0 ? DELIVERY_FEE : 0);

  const validate = (): boolean => {
    const e: Partial<CheckoutFormData> = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre completo";
    if (!form.phone.trim()) e.phone = "Ingresa tu número de teléfono";
    if (!form.address.trim()) e.address = "Ingresa tu dirección de entrega";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (!store.whatsapp) return;

    const message = buildWhatsAppMessage(store, items, form, total, currencySymbol);
    const url = `https://wa.me/${store.whatsapp}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-6 pb-32 lg:pb-8">
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 20 }}>
          Finalizar pedido
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--t-text-primary)" }}>
              No tienes productos en el carrito
            </p>
            <button
              type="button"
              onClick={onBack}
              className={`px-6 py-3 ${payNowBtnClass}`}
              style={{
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Volver al carrito
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Form ── */}
            <CheckoutForm
              form={form}
              errors={errors}
              onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
            />

            {/* ── Order summary ── */}
            <div
              className="lg:w-72 flex-shrink-0"
              style={{
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
                backgroundColor: "var(--t-card-bg)",
                padding: 20,
                height: "fit-content",
              }}
            >
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 12 }}>
                Resumen
              </p>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-2">
                    {item.imageUrl && (
                      <div
                        className="relative flex-shrink-0"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--t-radius-category)",
                          overflow: "hidden",
                          backgroundColor: "var(--t-surface)",
                        }}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-0.5"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--t-text-primary)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: "10px", color: "var(--t-text-muted)" }}>x{item.quantity}</p>
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--t-text-primary)", flexShrink: 0 }}>
                      {currencySymbol}{formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, backgroundColor: "var(--t-border)", marginBottom: 12 }} aria-hidden="true" />

              <div className="flex flex-col gap-1.5 mb-4">
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "IVA (2.5%)", value: tax },
                  { label: "Domicilio", value: DELIVERY_FEE },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ fontSize: "12px", color: "var(--t-text-secondary)" }}>{label}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--t-text-primary)" }}>
                      {currencySymbol}{formatPrice(value)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-4">
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--t-text-primary)" }}>Total</span>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--t-primary)" }}>
                  {currencySymbol}{formatPrice(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!store.whatsapp}
                className={`w-full py-3 ${payNowBtnClass}`}
                style={{
                  borderRadius: "var(--t-radius-button)",
                  cursor: store.whatsapp ? "pointer" : "not-allowed",
                  fontSize: "14px",
                  fontWeight: 700,
                  opacity: store.whatsapp ? 1 : 0.6,
                }}
              >
                💬 Pagar ahora
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full py-2 mt-2"
                style={{
                  borderRadius: "var(--t-radius-button)",
                  backgroundColor: "transparent",
                  color: "var(--t-text-secondary)",
                  border: "1px solid var(--t-border)",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Volver al carrito
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
