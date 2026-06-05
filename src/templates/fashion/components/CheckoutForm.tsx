// Fashion Template — Checkout Form
// Two sections: INFORMACIÓN (name, whatsapp, email) + DIRECCIÓN DE ENVÍO (address, notes).
// Bottom-border-only inputs (SharpInput style). Desktop CTA included.
// Monochromatic B&W. All colors via var(--t-*). ZERO hardcoded hex.

import type { CheckoutFormData } from "../types";

interface SharpInputProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (val: string) => void;
}

function SharpInput({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: SharpInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[10px] font-medium uppercase tracking-wider text-[var(--t-text-primary)]"
        style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
      >
        {label}
        {required && (
          <span className="text-[var(--t-text-secondary)]"> *</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none py-2.5 transition-colors bg-transparent border-b border-[var(--t-border)] focus:border-[var(--t-primary)]"
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "var(--t-radius-button)",
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: "13px",
          fontWeight: 400,
          color: "var(--t-text-primary)",
        }}
      />
    </div>
  );
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

export function CheckoutForm({
  formData,
  onFieldChange,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <div>
      {/* Section: Información */}
      <div className="mb-8">
        <h2
          className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          INFORMACIÓN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SharpInput
            label="Nombre completo"
            value={formData.nombre}
            placeholder="Tu nombre"
            required
            onChange={(v) => onFieldChange?.("nombre", v)}
          />
          <SharpInput
            label="WhatsApp"
            value={formData.whatsapp}
            placeholder="+57 300 000 0000"
            type="tel"
            required
            onChange={(v) => onFieldChange?.("whatsapp", v)}
          />
          <div className="md:col-span-2">
            <SharpInput
              label="Email (opcional)"
              value={formData.email}
              placeholder="tu@email.com"
              type="email"
              onChange={(v) => onFieldChange?.("email", v)}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-[var(--t-border)] mb-8" />

      {/* Section: Dirección de envío */}
      <div className="mb-8">
        <h2
          className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          DIRECCIÓN DE ENVÍO
        </h2>
        <div className="flex flex-col gap-5">
          <SharpInput
            label="Dirección"
            value={formData.direccion}
            placeholder="Calle, número..."
            required
            onChange={(v) => onFieldChange?.("direccion", v)}
          />
          <SharpInput
            label="Notas del pedido (opcional)"
            value={formData.notas}
            placeholder="Instrucciones especiales..."
            onChange={(v) => onFieldChange?.("notas", v)}
          />
        </div>
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:block">
        <button
          type="button"
          className="w-full py-3.5 bg-[var(--t-secondary)] transition-opacity hover:opacity-80 border-0 cursor-pointer"
          style={{
            borderRadius: "var(--t-radius-button)",
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--t-text-primary)",
          }}
          onClick={onSubmit}
        >
          CONTINUAR CON WHATSAPP
        </button>
        <p
          className="text-center mt-3 text-[11px] text-[var(--t-text-muted)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
        >
          WhatsApp se abrirá para confirmar tu pedido
        </p>
      </div>
    </div>
  );
}
