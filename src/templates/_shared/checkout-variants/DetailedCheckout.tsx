// Shared — DetailedCheckout (from tech-premium)
// 2-col desktop: form left + sticky summary right.
// Inline WhatsApp button inside the summary panel.
// Visual only — business logic stays in template shell.

import Image from "next/image";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { DetailedCheckoutProps, DetailedFormData, CheckoutMode } from "./types";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const FORM_FIELDS: {
  key: keyof DetailedFormData;
  label: string;
  placeholder: string;
  required: boolean;
  type?: string;
}[] = [
  { key: "nombre", label: "Nombre completo", placeholder: "Tu nombre", required: true },
  { key: "whatsapp", label: "WhatsApp", placeholder: "+57 300 123 4567", required: true, type: "tel" },
  { key: "email", label: "Email (opcional)", placeholder: "tu@email.com", required: false, type: "email" },
  { key: "direccion", label: "Dirección de entrega", placeholder: "Calle, barrio, ciudad", required: true },
  { key: "notas", label: "Notas adicionales", placeholder: "Instrucciones especiales...", required: false },
];

export default function DetailedCheckout({
  items,
  subtotal,
  currencySymbol = "$",
  mode = "preview",
  isSubmitting = false,
  formData = {},
  onFieldChange,
  onSubmit,
}: DetailedCheckoutProps) {
  const whatsappBtnClass = BUTTON_STYLE_MAP["filled"];
  const isEmpty = items.length === 0;

  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-xl font-semibold text-[var(--t-text-primary)]">No hay artículos para finalizar la compra</p>
        <p className="text-base text-[var(--t-text-secondary)]">Agregá artículos al carrito primero</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
      {/* Left: Form */}
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="text-2xl font-semibold text-[var(--t-text-primary)]">Finalizar compra</h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
          noValidate
        >
          {FORM_FIELDS.map(({ key, label, placeholder, required, type }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label htmlFor={`checkout-${key}`} className="text-sm font-medium text-[var(--t-text-subtle)]">
                {label}{" "}
                {required && (
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              {key === "notas" ? (
                <textarea
                  id={`checkout-${key}`}
                  value={formData[key] ?? ""}
                  onChange={(e) => onFieldChange?.(key, e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                  className="border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-3 text-sm text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)] outline-none focus:border-[var(--t-text-primary)] transition-colors resize-none bg-[var(--t-card-bg)]"
                />
              ) : (
                <input
                  id={`checkout-${key}`}
                  type={type ?? "text"}
                  value={formData[key] ?? ""}
                  onChange={(e) => onFieldChange?.(key, e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-3 text-sm text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)] outline-none focus:border-[var(--t-text-primary)] transition-colors bg-[var(--t-card-bg)]"
                />
              )}
            </div>
          ))}
        </form>
      </div>

      {/* Right: Summary */}
      <aside className="lg:w-[380px] shrink-0">
        <div className="border border-[var(--t-border-light)] rounded-[10px] px-6 py-8 flex flex-col gap-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-[var(--t-primary)]">Resumen del pedido</h2>

          {/* Items list */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="relative w-12 h-12 shrink-0 bg-[var(--t-card-bg)] rounded">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--t-text-primary)] truncate">{item.name}</p>
                  <p className="text-xs text-[var(--t-text-secondary)]">x{item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-[var(--t-text-primary)] shrink-0">
                  {fmt(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-[var(--t-border-light)] pt-4 flex items-center justify-between">
            <span className="text-base font-semibold text-[var(--t-text-primary)]">Total</span>
            <span className="text-base font-semibold text-[var(--t-text-primary)]">{fmt(subtotal)}</span>
          </div>

          {/* CTA */}
          {mode === "preview" ? (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className={`w-full py-4 text-base font-medium rounded-[var(--t-radius-button)] border cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-3 ${whatsappBtnClass}`}
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                <WhatsAppIcon />
                Enviar por WhatsApp
              </button>
              <p className="text-xs text-center text-[var(--t-text-secondary)]">
                ¿Te gustó este template?{" "}
                <span className="text-[var(--t-text-primary)] underline cursor-pointer font-medium">
                  Creá tu tienda gratis
                </span>
              </p>
            </div>
          ) : (
            <button
              type="button"
              className={`w-full py-4 text-base font-medium rounded-[var(--t-radius-button)] border cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-3 ${whatsappBtnClass}`}
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              <WhatsAppIcon />
              Enviar por WhatsApp
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
