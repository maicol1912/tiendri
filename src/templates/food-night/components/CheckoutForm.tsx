"use client";

// Food Night — Checkout Form Fields
// nombre, whatsapp, email, direccion, notas

import type { CheckoutFormData } from "../types";

interface FieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

interface CheckoutFormProps {
  data: CheckoutFormData;
  errors?: FieldErrors;
  onChange?: (field: keyof CheckoutFormData, value: string) => void;
}

interface FieldConfig {
  id: keyof CheckoutFormData;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

const FIELDS: FieldConfig[] = [
  { id: "nombre",    label: "Nombre completo",    placeholder: "¿Cómo te llamás?",               required: true,  maxLength: 80 },
  { id: "whatsapp",  label: "WhatsApp",           placeholder: "Ej: 3001234567",                  required: true,  inputMode: "tel", maxLength: 20 },
  { id: "email",     label: "Correo electrónico", placeholder: "tu@correo.com",                   required: false, type: "email", maxLength: 120 },
  { id: "direccion", label: "Dirección de entrega",placeholder: "Calle, barrio, ciudad",          required: true,  maxLength: 200 },
  { id: "notas",     label: "Notas adicionales",  placeholder: "Ej: sin cebolla, piso 3, etc.",  required: false, multiline: true, maxLength: 300 },
];

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--t-radius-category)",
  backgroundColor: "var(--t-card)",
  color: "var(--t-foreground)",
  fontSize: "13px",
  fontWeight: 400,
  outline: "none",
  transition: "border-color 0.15s ease",
  boxSizing: "border-box",
};

export function CheckoutForm({ data, errors = {}, onChange }: CheckoutFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-5"
      noValidate
      aria-label="Formulario de pedido"
    >
      {FIELDS.map((field) => {
        const error = errors[field.id];
        const borderColor = error ? "var(--t-primary)" : "var(--t-border)";

        return (
          <div key={field.id} className="flex flex-col gap-1">
            <label
              htmlFor={`fn-checkout-${field.id}`}
              className="text-[12px] font-medium"
              style={{ color: "var(--t-muted)" }}
            >
              {field.label}
              {field.required && (
                <span style={{ color: "var(--t-primary)", marginLeft: 2 }} aria-hidden="true">*</span>
              )}
            </label>

            {field.multiline ? (
              <textarea
                id={`fn-checkout-${field.id}`}
                name={field.id}
                value={data[field.id]}
                onChange={(e) => onChange?.(field.id, e.target.value)}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                rows={3}
                style={{
                  ...inputBaseStyle,
                  border: `1px solid ${borderColor}`,
                  resize: "vertical",
                  minHeight: 80,
                }}
                aria-required={field.required}
                aria-invalid={!!error}
                aria-describedby={error ? `fn-checkout-${field.id}-error` : undefined}
              />
            ) : (
              <input
                id={`fn-checkout-${field.id}`}
                name={field.id}
                type={field.type ?? "text"}
                inputMode={field.inputMode}
                value={data[field.id]}
                onChange={(e) => onChange?.(field.id, e.target.value)}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                style={{
                  ...inputBaseStyle,
                  border: `1px solid ${borderColor}`,
                  height: 42,
                }}
                aria-required={field.required}
                aria-invalid={!!error}
                aria-describedby={error ? `fn-checkout-${field.id}-error` : undefined}
              />
            )}

            {error && (
              <span
                id={`fn-checkout-${field.id}-error`}
                role="alert"
                className="text-[11px] font-normal"
                style={{ color: "var(--t-primary)" }}
              >
                {error}
              </span>
            )}
          </div>
        );
      })}
    </form>
  );
}
