// Decor Warm Template — Checkout Form
// Fields: nombre, whatsapp, email, dirección, notas.
// Uses FormField internal component for consistent styling.
// ZERO hardcoded colors — all via var(--t-*).

interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

interface FieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  onChange?: (v: string) => void;
}

function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  required,
  textarea,
  onChange,
}: FormFieldProps) {
  const inputStyle = {
    width: "100%",
    backgroundColor: "var(--t-card)",
    border: error ? "1px solid var(--t-primary)" : "1px solid var(--t-border)",
    borderRadius: "var(--t-radius-category)",
    padding: "10px 14px",
    color: "var(--t-foreground)",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    outline: "none",
  } as const;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        style={{
          color: "var(--t-muted)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        {label} {required && <span style={{ color: "var(--t-primary)" }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          style={{ ...inputStyle, height: 42 }}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {error && (
        <span
          style={{
            color: "var(--t-primary)",
            fontFamily: "'League Spartan', sans-serif",
            fontSize: "12px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  errors?: FieldErrors;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
}

export function CheckoutForm({
  formData,
  errors = {},
  onFieldChange,
}: CheckoutFormProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2
        style={{
          color: "var(--t-foreground)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Datos de contacto
      </h2>

      <FormField
        label="Nombre completo"
        name="nombre"
        value={formData.nombre}
        placeholder="Tu nombre completo"
        error={errors.nombre}
        required
        onChange={(v) => onFieldChange?.("nombre", v)}
      />

      <FormField
        label="WhatsApp"
        name="whatsapp"
        type="tel"
        value={formData.whatsapp}
        placeholder="573001234567"
        error={errors.whatsapp}
        required
        onChange={(v) => onFieldChange?.("whatsapp", v)}
      />

      <FormField
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        placeholder="tu@correo.com"
        error={errors.email}
        required
        onChange={(v) => onFieldChange?.("email", v)}
      />

      <FormField
        label="Dirección de entrega"
        name="direccion"
        value={formData.direccion}
        placeholder="Calle, número, ciudad"
        error={errors.direccion}
        required
        onChange={(v) => onFieldChange?.("direccion", v)}
      />

      <FormField
        label="Notas adicionales"
        name="notas"
        value={formData.notas}
        placeholder="Instrucciones especiales de entrega..."
        textarea
        onChange={(v) => onFieldChange?.("notas", v)}
      />
    </div>
  );
}
