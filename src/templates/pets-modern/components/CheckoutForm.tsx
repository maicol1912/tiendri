// Pet V3 Template — Checkout Form
// Collects customer info: name, whatsapp, email, address, notes.
// Visual only — form data and change handler come as props.

import type { CheckoutFormData } from "../types";

export interface CheckoutFormProps {
  formData: CheckoutFormData;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
}

export function CheckoutForm({ formData, onFieldChange }: CheckoutFormProps) {
  return (
    <div className="flex-1">
      <h2 className="text-[var(--t-text-primary)] text-lg font-bold mb-4">
        Tus datos
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--t-text-primary)] mb-1.5">
            Nombre *
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => onFieldChange?.("nombre", e.target.value)}
            className="w-full h-12 px-4 border border-[var(--t-border)] rounded-[var(--t-radius-button)] text-sm text-[var(--t-text-primary)] bg-[var(--t-background)] outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 focus:border-[var(--t-primary)] transition-all"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--t-text-primary)] mb-1.5">
            Numero de WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => onFieldChange?.("whatsapp", e.target.value)}
            className="w-full h-12 px-4 border border-[var(--t-border)] rounded-[var(--t-radius-button)] text-sm text-[var(--t-text-primary)] bg-[var(--t-background)] outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 focus:border-[var(--t-primary)] transition-all"
            placeholder="573001234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--t-text-primary)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onFieldChange?.("email", e.target.value)}
            className="w-full h-12 px-4 border border-[var(--t-border)] rounded-[var(--t-radius-button)] text-sm text-[var(--t-text-primary)] bg-[var(--t-background)] outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 focus:border-[var(--t-primary)] transition-all"
            placeholder="email@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--t-text-primary)] mb-1.5">
            Direccion de entrega *
          </label>
          <input
            type="text"
            value={formData.direccion}
            onChange={(e) => onFieldChange?.("direccion", e.target.value)}
            className="w-full h-12 px-4 border border-[var(--t-border)] rounded-[var(--t-radius-button)] text-sm text-[var(--t-text-primary)] bg-[var(--t-background)] outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 focus:border-[var(--t-primary)] transition-all"
            placeholder="Direccion completa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--t-text-primary)] mb-1.5">
            Notas
          </label>
          <textarea
            value={formData.notas}
            onChange={(e) => onFieldChange?.("notas", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-[var(--t-border)] rounded-[var(--t-radius-button)] text-sm text-[var(--t-text-primary)] bg-[var(--t-background)] outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 focus:border-[var(--t-primary)] transition-all resize-none"
            placeholder="Instrucciones especiales..."
          />
        </div>
      </div>
    </div>
  );
}
