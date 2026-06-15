import type { CheckoutFormData } from "@/types/cart";

interface CheckoutFormFieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  errors?: CheckoutFormFieldErrors;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold"
      style={{ color: "var(--t-foreground)" }}
    >
      {children}
    </label>
  );
}

function ErrorMsg({ message }: { message: string }) {
  return (
    <p className="text-xs" style={{ color: "var(--t-primary)" }}>
      {message}
    </p>
  );
}

export function CheckoutForm({ formData, errors = {}, onFieldChange }: CheckoutFormProps) {
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    border: hasError ? "2px solid var(--t-primary)" : "1px solid var(--t-border)",
    borderRadius: "var(--t-radius-button)",
    backgroundColor: "var(--t-card)",
    color: "var(--t-foreground)",
  });

  return (
    <div className="flex flex-col gap-4">
      <FieldWrapper>
        <Label htmlFor="nombre">Nombre completo *</Label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={(e) => onFieldChange("nombre", e.target.value)}
          placeholder="Tu nombre completo"
          autoComplete="name"
          style={inputStyle(!!errors.nombre)}
          className="placeholder:text-[var(--t-muted)]"
        />
        {errors.nombre && <ErrorMsg message={errors.nombre} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="whatsapp">Teléfono *</Label>
        <input
          id="whatsapp"
          type="tel"
          value={formData.whatsapp}
          onChange={(e) => onFieldChange("whatsapp", e.target.value)}
          placeholder="3001234567"
          autoComplete="tel"
          style={inputStyle(!!errors.whatsapp)}
          className="placeholder:text-[var(--t-muted)]"
        />
        {errors.whatsapp && <ErrorMsg message={errors.whatsapp} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="email">Correo electrónico</Label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          style={inputStyle(!!errors.email)}
          className="placeholder:text-[var(--t-muted)]"
        />
        {errors.email && <ErrorMsg message={errors.email} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="direccion">Dirección de envío *</Label>
        <input
          id="direccion"
          type="text"
          value={formData.direccion}
          onChange={(e) => onFieldChange("direccion", e.target.value)}
          placeholder="Calle, número, barrio, ciudad"
          autoComplete="street-address"
          style={inputStyle(!!errors.direccion)}
          className="placeholder:text-[var(--t-muted)]"
        />
        {errors.direccion && <ErrorMsg message={errors.direccion} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="notas">Notas adicionales</Label>
        <textarea
          id="notas"
          value={formData.notas}
          onChange={(e) => onFieldChange("notas", e.target.value)}
          placeholder="Instrucciones especiales, referencias, etc."
          rows={3}
          style={{
            ...inputStyle(false),
            resize: "none",
          }}
          className="placeholder:text-[var(--t-muted)]"
        />
      </FieldWrapper>
    </div>
  );
}
