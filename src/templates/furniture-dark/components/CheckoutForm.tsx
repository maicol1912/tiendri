// Furniture Dark — CheckoutForm
// Dark pill inputs; yellow section headers
// ALL colors via var(--t-*)

import type { CheckoutFormData } from "../types";

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

function InputField({
  label,
  value,
  name,
  type = "text",
  placeholder,
  required,
  onChange,
}: {
  label: string;
  value: string;
  name: keyof CheckoutFormData;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[var(--t-text-secondary)]"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        {label}
        {required && <span className="text-[var(--t-primary)] ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="outline-none bg-transparent placeholder:text-[var(--t-text-muted)] text-[var(--t-text-primary)]"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "14px",
          backgroundColor: "var(--t-surface)",
          borderRadius: "var(--t-radius-button)",
          border: "1px solid var(--t-border-input)",
          padding: "12px 16px",
        }}
      />
    </div>
  );
}

export function CheckoutForm({ formData, onChange }: CheckoutFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section: Datos de contacto */}
      <div>
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "var(--t-primary)",
          }}
        >
          DATOS DE CONTACTO
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            value={formData.firstName}
            name="firstName"
            placeholder="Tu nombre"
            required
            onChange={onChange}
          />
          <InputField
            label="Apellido"
            value={formData.lastName}
            name="lastName"
            placeholder="Tu apellido"
            required
            onChange={onChange}
          />
          <InputField
            label="WhatsApp"
            value={formData.phone}
            name="phone"
            type="tel"
            placeholder="+57 300 000 0000"
            required
            onChange={onChange}
          />
          <InputField
            label="Correo electrónico"
            value={formData.email}
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            onChange={onChange}
          />
        </div>
      </div>

      {/* Section: Dirección de entrega */}
      <div>
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "var(--t-primary)",
          }}
        >
          DIRECCIÓN DE ENTREGA
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Dirección"
            value={formData.address}
            name="address"
            placeholder="Calle, número, apartamento"
            required
            onChange={onChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Ciudad"
              value={formData.city}
              name="city"
              placeholder="Ciudad"
              required
              onChange={onChange}
            />
            <InputField
              label="Departamento"
              value={formData.state}
              name="state"
              placeholder="Departamento"
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {/* Section: Notas */}
      <div>
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "var(--t-primary)",
          }}
        >
          NOTA DEL PEDIDO
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="notes"
            className="text-[var(--t-text-secondary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Instrucciones adicionales (opcional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            rows={3}
            placeholder="Ej: dejar en portería, color específico, etc."
            className="outline-none bg-transparent resize-none placeholder:text-[var(--t-text-muted)] text-[var(--t-text-primary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              backgroundColor: "var(--t-surface)",
              borderRadius: "var(--t-radius-card)",
              border: "1px solid var(--t-border-input)",
              padding: "12px 16px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
