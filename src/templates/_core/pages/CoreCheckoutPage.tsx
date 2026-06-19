"use client";

// _core/pages/CoreCheckoutPage.tsx
// Layout estructural de la página de checkout.
// Formulario de datos + resumen del pedido + botón de enviar por WhatsApp.
// NO gestiona estado — todo viene como props del shell.

import React, { memo } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { resolveStyleTokens } from "./style-tokens";
import { formatPrice } from "@/shared/format";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { CartItem } from "@/types/domain/cart";

const FORM_FIELDS = [
  { id: "nombre", label: "Nombre completo", type: "text", placeholder: "Tu nombre", required: true },
  { id: "whatsapp", label: "WhatsApp", type: "tel", placeholder: "Ej: 3001234567", required: true },
  { id: "email", label: "Correo electrónico", type: "email", placeholder: "tu@correo.com", required: false },
  { id: "direccion", label: "Dirección de envío", type: "text", placeholder: "Ciudad, barrio, dirección", required: false },
  { id: "notas", label: "Notas adicionales", type: "textarea", placeholder: "Instrucciones especiales, colores, etc.", required: false },
] as const;

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

interface CoreCheckoutPageProps {
  config: ResolvedStoreConfig;
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  formData: {
    nombre: string;
    whatsapp: string;
    email: string;
    direccion: string;
    notas: string;
  };
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  handleFieldChange: (field: string, value: string) => void;
  handleSubmit: () => void;
  onBack?: () => void;
}

export const CoreCheckoutPage = memo(function CoreCheckoutPage({
  config,
  items,
  totalPrice,
  currencySymbol = "$",
  formData,
  errors,
  isSubmitting,
  isValid,
  handleFieldChange,
  handleSubmit,
  onBack,
}: CoreCheckoutPageProps) {
  const { buttonClass } = resolveStyleTokens(config);
  const isEmpty = items.length === 0;

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "var(--t-card)",
    border: "1px solid var(--t-border)",
    borderRadius: "var(--t-radius-card, 12px)",
    fontSize: "14px",
    color: "var(--t-foreground)",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 150ms ease",
  };

  const errorFieldStyle: React.CSSProperties = {
    ...fieldStyle,
    borderColor: "var(--t-error, #ef4444)",
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Header móvil ─────────────────────────────────────────────────── */}
      <header
        className="md:hidden sticky top-0 z-30"
        style={{
          backgroundColor: "var(--t-background)",
          borderBottom: "1px solid var(--t-border)",
        }}
      >
        <div className="flex items-center gap-3 px-4 h-14 relative">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
              style={{ background: "var(--t-card)", border: "none", cursor: "pointer" }}
              aria-label="Volver al carrito"
            >
              <ChevronLeft size={20} style={{ color: "var(--t-foreground)" }} aria-hidden="true" />
            </button>
          )}
          <p
            className="absolute left-1/2 -translate-x-1/2 text-base font-bold"
            style={{ color: "var(--t-foreground)", margin: 0 }}
          >
            Finalizar pedido
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-12 pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-12">
        {isEmpty ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p
              className="text-xl font-semibold"
              style={{ color: "var(--t-foreground)" }}
            >
              No hay artículos para finalizar la compra
            </p>
            <p className="text-base" style={{ color: "var(--t-muted)" }}>
              Agregá artículos al carrito primero
            </p>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className={`px-6 py-3 text-sm font-semibold ${buttonClass}`}
                style={{ borderRadius: "var(--t-radius-button, 9999px)", cursor: "pointer" }}
              >
                Ver carrito
              </button>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* ── Formulario ──────────────────────────────────────────── */}
            <section
              aria-labelledby="checkout-form-heading"
              className="flex-1 flex flex-col gap-5"
            >
              <h1
                id="checkout-form-heading"
                className="text-xl font-bold"
                style={{ color: "var(--t-foreground)" }}
              >
                Tus datos
              </h1>

              <form
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                noValidate
                className="flex flex-col gap-4"
              >
                {FORM_FIELDS.map((field) => {
                  const value = formData[field.id as keyof typeof formData];
                  const error = errors[field.id];
                  const currentStyle = error ? errorFieldStyle : fieldStyle;

                  return (
                    <div key={field.id} className="flex flex-col gap-1">
                      <label
                        htmlFor={`checkout-${field.id}`}
                        className="text-sm font-medium"
                        style={{ color: "var(--t-foreground)" }}
                      >
                        {field.label}
                        {field.required && (
                          <span style={{ color: "var(--t-primary)", marginLeft: "2px" }}>*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={`checkout-${field.id}`}
                          value={value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          style={{ ...currentStyle, resize: "none" }}
                          aria-invalid={!!error}
                          aria-describedby={error ? `${field.id}-error` : undefined}
                        />
                      ) : (
                        <input
                          id={`checkout-${field.id}`}
                          type={field.type}
                          value={value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          style={currentStyle}
                          aria-invalid={!!error}
                          aria-describedby={error ? `${field.id}-error` : undefined}
                        />
                      )}

                      {error && (
                        <p
                          id={`${field.id}-error`}
                          className="text-xs"
                          style={{ color: "var(--t-error, #ef4444)", margin: 0 }}
                          role="alert"
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  );
                })}
              </form>
            </section>

            {/* ── Resumen del pedido ──────────────────────────────────── */}
            <aside
              aria-labelledby="order-summary-heading"
              className="lg:w-[360px] lg:flex-shrink-0"
            >
              <div
                className="flex flex-col gap-5 p-5 lg:sticky"
                style={{
                  top: "80px",
                  border: "1px solid var(--t-border)",
                  borderRadius: "var(--t-radius-card, 16px)",
                  background: "var(--t-card)",
                  color: "var(--t-card-foreground)",
                }}
              >
                <h2
                  id="order-summary-heading"
                  className="text-base font-bold"
                  style={{ color: "var(--t-card-foreground)", margin: 0 }}
                >
                  Resumen del pedido
                </h2>

                {/* Ítems */}
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantName ?? ""}`}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="relative w-11 h-11 flex-shrink-0 overflow-hidden"
                        style={{
                          borderRadius: "var(--t-radius-card, 8px)",
                          background: "var(--t-background)",
                        }}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="44px"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ color: "var(--t-border)" }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--t-card-foreground)", margin: 0 }}
                        >
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--t-card-foreground)", opacity: 0.6, margin: 0 }}>
                          {item.variantName ? `${item.variantName} · ` : ""}×{item.quantity}
                        </p>
                      </div>
                      <span
                        className="text-sm font-semibold flex-shrink-0"
                        style={{ color: "var(--t-card-foreground)" }}
                      >
                        {formatPrice(item.price * item.quantity, currencySymbol)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid var(--t-border)" }}
                >
                  <span className="text-base font-semibold" style={{ color: "var(--t-card-foreground)" }}>
                    Total
                  </span>
                  <span className="text-lg font-bold" style={{ color: "var(--t-card-foreground)" }}>
                    {formatPrice(totalPrice, currencySymbol)}
                  </span>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  className={`w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 disabled:opacity-50 ${buttonClass}`}
                  style={{
                    borderRadius: "var(--t-radius-button, 9999px)",
                    cursor: !isValid || isSubmitting ? "not-allowed" : "pointer",
                  }}
                  aria-busy={isSubmitting}
                >
                  <WhatsAppIcon />
                  {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--t-card-foreground)", opacity: 0.6, margin: 0 }}>
                  Tu pedido se enviará directamente al WhatsApp de la tienda
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
});
