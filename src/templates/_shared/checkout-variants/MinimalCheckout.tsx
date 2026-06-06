// Shared — MinimalCheckout (from furniture-dark)
// 2-col desktop: sectioned form left + order summary right.
// WhatsApp button below the form, outside the summary panel.
// Visual only — business logic stays in template shell.

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import type { MinimalCheckoutProps, MinimalFormData } from "./types";

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
  name: keyof MinimalFormData;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (field: keyof MinimalFormData, value: string) => void;
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

function formatPrice(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${new Intl.NumberFormat("en-US").format(amount)}`;
}

export default function MinimalCheckout({
  items,
  subtotal,
  currencySymbol = "$",
  isSubmitting = false,
  formData = {},
  onFieldChange,
  onSubmit,
  onBack,
}: MinimalCheckoutProps) {
  const fd = formData as Partial<MinimalFormData>;

  const handleChange = (field: keyof MinimalFormData, value: string) => {
    onFieldChange?.(field, value);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
      {/* Back button */}
      <button
        type="button"
        className="flex items-center gap-1.5 mb-6 transition-opacity hover:opacity-80"
        onClick={onBack}
        aria-label="Volver al carrito"
      >
        <ChevronLeft size={18} strokeWidth={2} className="text-[var(--t-text-breadcrumb)]" />
        <span
          className="text-[var(--t-text-breadcrumb)]"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Volver al carrito
        </span>
      </button>

      {/* Page title */}
      <h1
        className="text-[var(--t-text-primary)] mb-8"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "26px",
          fontWeight: 700,
          letterSpacing: "-0.78px",
        }}
      >
        Resumen del pedido
      </h1>

      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Form (left) */}
        <div className="flex-1">
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
                  value={fd.firstName ?? ""}
                  name="firstName"
                  placeholder="Tu nombre"
                  required
                  onChange={handleChange}
                />
                <InputField
                  label="Apellido"
                  value={fd.lastName ?? ""}
                  name="lastName"
                  placeholder="Tu apellido"
                  required
                  onChange={handleChange}
                />
                <InputField
                  label="WhatsApp"
                  value={fd.phone ?? ""}
                  name="phone"
                  type="tel"
                  placeholder="+57 300 000 0000"
                  required
                  onChange={handleChange}
                />
                <InputField
                  label="Correo electrónico"
                  value={fd.email ?? ""}
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  onChange={handleChange}
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
                  value={fd.address ?? ""}
                  name="address"
                  placeholder="Calle, número, apartamento"
                  required
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Ciudad"
                    value={fd.city ?? ""}
                    name="city"
                    placeholder="Ciudad"
                    required
                    onChange={handleChange}
                  />
                  <InputField
                    label="Departamento"
                    value={fd.state ?? ""}
                    name="state"
                    placeholder="Departamento"
                    onChange={handleChange}
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
                  value={fd.notes ?? ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
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

          {/* Submit button */}
          <button
            type="button"
            className="w-full mt-8 py-4 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-60"
            style={{
              backgroundColor: "var(--t-button-bg)",
              color: "var(--t-button-text)",
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
            onClick={onSubmit}
            disabled={isSubmitting}
            aria-label="Enviar pedido por WhatsApp"
          >
            {isSubmitting ? "Enviando…" : "ENVIAR POR WHATSAPP"}
          </button>
        </div>

        {/* Order summary (right) */}
        <div className="mt-8 lg:mt-0 lg:w-[380px] lg:flex-shrink-0">
          <div
            className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
            style={{ backgroundColor: "var(--t-spec-badge-bg)" }}
          >
            <h3
              className="text-[var(--t-text-primary)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.48px",
              }}
            >
              Resumen del pedido
            </h3>

            {/* Item list */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div
                    className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: "var(--t-card-bg)" }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[var(--t-text-primary)] line-clamp-1"
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[var(--t-text-muted)] mt-0.5"
                      style={{
                        fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                        fontSize: "12px",
                      }}
                    >
                      × {item.quantity}
                    </p>
                  </div>

                  <p
                    className="text-[var(--t-text-primary)] font-semibold flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {formatPrice(item.price * item.quantity, currencySymbol)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid var(--t-border-mid)" }}
            >
              <span
                className="text-[var(--t-text-primary)] font-semibold"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Total
              </span>
              <span
                className="font-bold"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--t-primary)",
                }}
              >
                {formatPrice(subtotal, currencySymbol)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
