// Tech Premium Template — Checkout Form
// Collects customer info: name, whatsapp, email, address, notes.
// Visual only — form data and change handler come as props.

import type { CheckoutFormData } from "../types";

const FORM_FIELDS: {
  key: keyof CheckoutFormData;
  label: string;
  placeholder: string;
  required: boolean;
  type?: string;
}[] = [
  { key: "nombre", label: "Nombre completo", placeholder: "Tu nombre", required: true },
  { key: "whatsapp", label: "WhatsApp", placeholder: "+57 300 123 4567", required: true, type: "tel" },
  { key: "email", label: "Email (opcional)", placeholder: "tu@email.com", required: false, type: "email" },
  { key: "direccion", label: "Direccion de entrega", placeholder: "Calle, barrio, ciudad", required: true },
  { key: "notas", label: "Notas adicionales", placeholder: "Instrucciones especiales...", required: false },
];

export interface CheckoutFormProps {
  formData?: Partial<CheckoutFormData>;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

export function CheckoutForm({ formData = {}, onFieldChange, onSubmit }: CheckoutFormProps) {
  return (
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
                <span className="text-[var(--t-primary)]" aria-hidden="true">
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
  );
}
