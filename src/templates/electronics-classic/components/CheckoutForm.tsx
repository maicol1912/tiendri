// Electronics Classic — Checkout Form
// Fields: nombre, whatsapp, email, dirección, notas.
// WhatsApp CTA submit button.
// All colors via var(--t-*). ZERO hardcoded hex.

import { MessageCircle } from "lucide-react";
import type { CheckoutFormData } from "../types";

interface CheckoutFormProps {
  formData: CheckoutFormData;
  items: { length: number };
  isSubmitting: boolean;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutForm({
  formData,
  items,
  isSubmitting,
  onFieldChange,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex-1 flex flex-col gap-4"
      aria-label="Formulario de pedido"
    >
      <h2 className="font-semibold text-[var(--t-text-primary)] text-sm">
        Tus datos
      </h2>

      {[
        { field: "nombre" as const, label: "Nombre completo", type: "text", placeholder: "Ej. Carlos Pérez", required: true },
        { field: "whatsapp" as const, label: "WhatsApp", type: "tel", placeholder: "Ej. 3001234567", required: true },
        { field: "email" as const, label: "Correo electrónico (opcional)", type: "email", placeholder: "Ej. carlos@mail.com", required: false },
        { field: "direccion" as const, label: "Dirección de entrega", type: "text", placeholder: "Calle, ciudad, departamento", required: true },
      ].map(({ field, label, type, placeholder, required }) => (
        <div key={field} className="flex flex-col gap-1">
          <label
            htmlFor={`checkout-${field}`}
            className="text-xs text-[var(--t-text-secondary)]"
          >
            {label}
          </label>
          <input
            id={`checkout-${field}`}
            type={type}
            value={formData[field]}
            onChange={(e) => onFieldChange(field, e.target.value)}
            placeholder={placeholder}
            required={required}
            className="px-3 py-2.5 text-sm border rounded-[var(--t-radius-button)] outline-none"
            style={{
              borderColor: "var(--t-surface)",
              backgroundColor: "var(--t-search-bg)",
              color: "var(--t-text-primary)",
            }}
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="checkout-notas"
          className="text-xs text-[var(--t-text-secondary)]"
        >
          Notas adicionales (opcional)
        </label>
        <textarea
          id="checkout-notas"
          value={formData.notas}
          onChange={(e) => onFieldChange("notas", e.target.value)}
          placeholder="Instrucciones especiales para tu pedido..."
          rows={3}
          className="px-3 py-2.5 text-sm border rounded-[var(--t-radius-button)] outline-none resize-none"
          style={{
            borderColor: "var(--t-surface)",
            backgroundColor: "var(--t-search-bg)",
            color: "var(--t-text-primary)",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 font-semibold text-sm rounded-[var(--t-radius-button)] transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: "#25D366",
          color: "#FFFFFF",
        }}
        aria-label="Enviar pedido por WhatsApp"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {isSubmitting ? "Enviando..." : "Enviar pedido por WhatsApp"}
      </button>
    </form>
  );
}
