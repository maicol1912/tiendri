import { formatPrice } from "@/lib/format";
import type { CheckoutOrderItem } from "../types";

interface CheckoutFormData {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  notes: string;
}

interface FieldError {
  fullName?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

interface CheckoutFormProps {
  orderItems: CheckoutOrderItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  errors: FieldError;
  isSubmitting: boolean;
  currencySymbol?: string;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

function FormField({
  label,
  value,
  error,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
}) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-[6px]">
      <label
        className="text-sm font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full outline-none text-sm text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]"
        style={{
          fontFamily: "var(--font-sans)",
          height: "47px",
          borderRadius: "var(--t-radius-button)",
          border: hasError
            ? "2px solid var(--t-primary)"
            : "1.5px solid var(--t-border)",
          backgroundColor: "var(--t-background)",
          paddingLeft: "16px",
          paddingRight: "16px",
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "-0.408px",
        }}
      />

      {hasError && (
        <span
          className="text-xs font-medium leading-[18px]"
          style={{ color: "var(--t-primary)", fontFamily: "var(--font-sans)" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export function CheckoutForm({
  orderItems,
  totalPrice,
  formData,
  errors,
  isSubmitting,
  currencySymbol = "$",
  onFieldChange,
  onSubmit,
}: CheckoutFormProps) {
  const formattedTotal = formatPrice(totalPrice, currencySymbol);

  return (
    <div className="flex flex-col gap-6">
      {/* Order Summary */}
      <section
        className="flex flex-col gap-3 p-4"
        style={{
          backgroundColor: "var(--t-background)",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        <h2
          className="m-0 text-base font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Resumen del pedido
        </h2>

        <div className="flex flex-col gap-[10px]">
          {orderItems.map((item, i) => (
            <div
              key={`${item.productId}-${item.variantName ?? i}`}
              className="flex items-center justify-between"
            >
              <span
                className="text-sm font-normal text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.quantity}× {item.name}
                {item.variantName ? ` (${item.variantName})` : ""}
              </span>
              <span
                className="text-sm font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {formatPrice(item.price * item.quantity, currencySymbol)}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--t-border)" }}
        >
          <span
            className="text-sm font-bold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Total
          </span>
          <span
            className="text-base font-bold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {formattedTotal}
          </span>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="flex flex-col gap-4 p-4"
        style={{
          backgroundColor: "var(--t-background)",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        <h2
          className="m-0 text-base font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Datos de contacto
        </h2>

        <FormField
          label="Nombre completo *"
          value={formData.fullName}
          error={errors.fullName}
          placeholder="Tu nombre completo"
          onChange={(v) => onFieldChange?.("fullName", v)}
        />

        <FormField
          label="WhatsApp *"
          value={formData.whatsapp}
          error={errors.whatsapp}
          placeholder="573001234567"
          type="tel"
          onChange={(v) => onFieldChange?.("whatsapp", v)}
        />

        <FormField
          label="Correo electrónico *"
          value={formData.email}
          error={errors.email}
          placeholder="correo@ejemplo.com"
          type="email"
          onChange={(v) => onFieldChange?.("email", v)}
        />

        <FormField
          label="Dirección de entrega *"
          value={formData.address}
          error={errors.address}
          placeholder="Calle, número, barrio, ciudad"
          onChange={(v) => onFieldChange?.("address", v)}
        />

        {/* Notes (optional, textarea style) */}
        <div className="flex flex-col gap-[6px]">
          <label
            className="text-sm font-semibold text-[var(--t-foreground)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Notas adicionales
          </label>
          <textarea
            value={formData.notes}
            placeholder="Instrucciones especiales (opcional)"
            rows={3}
            onChange={(e) => onFieldChange?.("notes", e.target.value)}
            className="w-full outline-none resize-none text-sm text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]"
            style={{
              fontFamily: "var(--font-sans)",
              borderRadius: "18px",
              border: "1.5px solid var(--t-border)",
              backgroundColor: "var(--t-background)",
              padding: "12px 16px",
              fontSize: "14px",
              lineHeight: "22px",
              letterSpacing: "-0.408px",
            }}
          />
        </div>
      </section>

      {/* Submit CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "var(--t-background)",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 py-4">
          <button
            type="button"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 border-0 cursor-pointer transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              fontFamily: "var(--font-heading, var(--font-sans))",
              fontSize: "17px",
              fontWeight: 600,
              color: "var(--t-on-primary)",
              backgroundColor: "var(--t-primary)",
              borderRadius: "var(--t-radius-button)",
              height: "52px",
              lineHeight: "22px",
              letterSpacing: "-0.408px",
            }}
            onClick={onSubmit}
          >
            {/* WhatsApp icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {isSubmitting ? "Enviando..." : "Enviar pedido por WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}
