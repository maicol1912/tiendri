"use client";

// Beauty Elegant Template — Checkout Form
// Controlled form: fullName, whatsapp, email, address, notes.
// Purple-themed inputs. Callback props only.

import type { CheckoutFormValues } from "../types";

interface CheckoutFormProps {
  values: CheckoutFormValues;
  errors?: Partial<Record<keyof CheckoutFormValues, string>>;
  onChange: (values: CheckoutFormValues) => void;
}

interface FormFieldProps {
  id: keyof CheckoutFormValues;
  label: string;
  type?: "text" | "tel" | "email" | "textarea";
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (id: keyof CheckoutFormValues, value: string) => void;
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  onChange,
}: FormFieldProps) {
  const baseStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: 400,
    color: "var(--t-text-primary)",
    backgroundColor: "var(--t-icon-pill-bg)",
    border: error
      ? "1.5px solid #DC2626"
      : "1.5px solid var(--t-border-input)",
    borderRadius: "16px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    lineHeight: "20px",
    resize: "none" as const,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-semibold"
        style={{ color: "var(--t-text-primary)", lineHeight: "18px" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--t-primary)", marginLeft: "2px" }}>*</span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          style={baseStyle}
          aria-required={required}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          style={baseStyle}
          aria-required={required}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
        />
      )}

      {error && (
        <span className="text-xs" style={{ color: "#DC2626" }}>
          {error}
        </span>
      )}
    </div>
  );
}

export function CheckoutForm({ values, errors = {}, onChange }: CheckoutFormProps) {
  const handleFieldChange = (id: keyof CheckoutFormValues, value: string) => {
    onChange({ ...values, [id]: value });
  };

  return (
    <div
      className="flex flex-col gap-0"
      style={{
        backgroundColor: "var(--t-section-bg)",
        borderRadius: "20px",
        border: "1px solid var(--t-nav-border)",
      }}
    >
      <div
        className="px-5 pt-5 pb-3"
        style={{ borderBottom: "1px solid var(--t-border-light)" }}
      >
        <h2 className="text-base font-bold" style={{ color: "var(--t-text-primary)", margin: 0 }}>
          Información de contacto
        </h2>
        <p className="text-xs mt-1" style={{ color: "var(--t-text-muted)", margin: "4px 0 0 0" }}>
          Te contactaremos por WhatsApp para coordinar tu pedido
        </p>
      </div>

      <div className="flex flex-col gap-4 px-5 pt-4 pb-5">
        <FormField
          id="fullName"
          label="Nombre completo"
          placeholder="Tu nombre y apellido"
          value={values.fullName}
          error={errors.fullName}
          required
          onChange={handleFieldChange}
        />
        <FormField
          id="whatsapp"
          label="WhatsApp"
          type="tel"
          placeholder="+57 300 000 0000"
          value={values.whatsapp}
          error={errors.whatsapp}
          required
          onChange={handleFieldChange}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={values.email}
          error={errors.email}
          onChange={handleFieldChange}
        />
        <div style={{ height: "1px", backgroundColor: "var(--t-border-light)", margin: "4px 0" }} />
        <div>
          <p className="text-[13px] font-bold" style={{ color: "var(--t-text-primary)", margin: "0 0 12px 0" }}>
            Dirección de entrega
          </p>
          <FormField
            id="address"
            label="Dirección completa"
            placeholder="Calle, número, barrio, ciudad"
            value={values.address}
            error={errors.address}
            required
            onChange={handleFieldChange}
          />
        </div>
        <FormField
          id="notes"
          label="Notas adicionales"
          type="textarea"
          placeholder="Instrucciones especiales, referencias..."
          value={values.notes}
          error={errors.notes}
          onChange={handleFieldChange}
        />
      </div>
    </div>
  );
}
