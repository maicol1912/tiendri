"use client";

// Pets Classic — Checkout Form
// Collects delivery data: name, phone, address, notes.
// State and validation live in parent (CheckoutPage). Props carry values + handlers.

import type { CheckoutFormData } from "../types";

// Semantic error color — not a theme token, always red for validation errors
const ERROR_COLOR = "hsl(0 72% 51%)";

export interface CheckoutFormProps {
  form: CheckoutFormData;
  errors: Partial<CheckoutFormData>;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const FIELDS: {
  key: keyof CheckoutFormData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { key: "name", label: "Nombre completo", type: "text", placeholder: "Ej: María García" },
  { key: "phone", label: "Teléfono / WhatsApp", type: "tel", placeholder: "Ej: 3001234567" },
  { key: "address", label: "Dirección de entrega", type: "text", placeholder: "Calle 123 # 45-67, Ciudad" },
  { key: "notes", label: "Notas adicionales (opcional)", type: "text", placeholder: "Color, talla, instrucciones especiales..." },
];

export function CheckoutForm({ form, errors, onChange }: CheckoutFormProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 4 }}>
        Datos de entrega
      </p>

      {FIELDS.map(({ key, label, type, placeholder }) => (
        <div key={key} className="flex flex-col gap-1">
          <label
            htmlFor={`field-${key}`}
            style={{ fontSize: "12px", fontWeight: 600, color: "var(--t-text-secondary)" }}
          >
            {label}
          </label>
          <input
            id={`field-${key}`}
            type={type}
            value={form[key]}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 outline-none"
            style={{
              borderRadius: "var(--t-radius-category)",
              border: errors[key]
                ? `1.5px solid ${ERROR_COLOR}`
                : "1px solid var(--t-border-input)",
              backgroundColor: "var(--t-search-bg)",
              fontSize: "13px",
              color: "var(--t-text-primary)",
            }}
          />
          {errors[key] && (
            <p style={{ fontSize: "11px", color: ERROR_COLOR }}>{errors[key]}</p>
          )}
        </div>
      ))}

      {/* Payment note */}
      <div
        className="flex items-start gap-3 p-3"
        style={{
          borderRadius: "var(--t-radius-category)",
          backgroundColor: "var(--t-surface)",
          border: "1px solid var(--t-border)",
        }}
      >
        <span style={{ fontSize: "20px" }}>💬</span>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--t-text-primary)" }}>
            Pago vía WhatsApp
          </p>
          <p style={{ fontSize: "11px", color: "var(--t-text-muted)", lineHeight: 1.5 }}>
            Al confirmar, te redireccionamos a WhatsApp donde podrás coordinar el pago y entrega directamente con la tienda.
          </p>
        </div>
      </div>
    </div>
  );
}
