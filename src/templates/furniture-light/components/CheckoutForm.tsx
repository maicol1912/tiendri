import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { CheckoutFormData } from "../types";
import type { CartItem } from "@/lib/cart";

interface CheckoutFormProps {
  items: CartItem[];
  currencySymbol?: string;
  formData: CheckoutFormData;
  mode?: "preview" | "live";
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

const SHIPPING = 15000;

export function CheckoutForm({
  items,
  currencySymbol = "$",
  formData,
  mode = "preview",
  onFieldChange,
  onSubmit,
}: CheckoutFormProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + SHIPPING;

  const inputClass =
    "w-full px-3.5 py-3 text-sm rounded-[var(--t-radius-button)] border border-[var(--t-border)] bg-[var(--t-card)] text-[var(--t-foreground)] placeholder-[var(--t-muted)] outline-none focus:border-[var(--t-primary)] transition-colors";

  const labelClass = "block text-xs font-semibold text-[var(--t-foreground)] mb-1";

  return (
    <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 lg:items-start">
      {/* Form fields */}
      <div className="space-y-4">
        {/* Contact info section */}
        <div
          className="p-4"
          style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
        >
          <p className="text-sm font-bold text-[var(--t-foreground)] mb-4">Información de contacto</p>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nombre completo *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => onFieldChange?.("nombre", e.target.value)}
                placeholder="Tu nombre"
                className={inputClass}
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp *</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => onFieldChange?.("whatsapp", e.target.value)}
                placeholder="3001234567"
                className={inputClass}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className={labelClass}>Email (opcional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onFieldChange?.("email", e.target.value)}
                placeholder="tu@email.com"
                className={inputClass}
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div
          className="p-4"
          style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
        >
          <p className="text-sm font-bold text-[var(--t-foreground)] mb-4">Entrega</p>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Dirección *</label>
              <textarea
                value={formData.direccion}
                onChange={(e) => onFieldChange?.("direccion", e.target.value)}
                placeholder="Calle, número, barrio, ciudad"
                rows={2}
                className={`${inputClass} resize-none`}
                autoComplete="street-address"
              />
            </div>
            <div>
              <label className={labelClass}>Notas (opcional)</label>
              <textarea
                value={formData.notas}
                onChange={(e) => onFieldChange?.("notas", e.target.value)}
                placeholder="Instrucciones especiales para el envío"
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Items summary */}
        <div
          className="p-4"
          style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
        >
          <p className="text-sm font-bold text-[var(--t-foreground)] mb-3">Productos ({items.length})</p>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ width: "52px", height: "52px", borderRadius: "var(--t-radius-card)", backgroundColor: "var(--t-card)" }}
                >
                  {item.imageUrl && (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" sizes="52px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--t-foreground)] line-clamp-1">{item.name}</p>
                  {item.variantName && <p className="text-[10px] text-[var(--t-muted)]">{item.variantName}</p>}
                  <p className="text-xs text-[var(--t-muted)]">x{item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-[var(--t-foreground)] shrink-0">{formatPrice(item.price * item.quantity, currencySymbol)}</p>
              </div>
            ))}
          </div>

          {/* Shipment row */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--t-border)]">
            <div
              className="w-[52px] h-[52px] shrink-0 flex items-center justify-center"
              style={{ borderRadius: "var(--t-radius-card)", backgroundColor: "var(--t-background)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--t-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[var(--t-foreground)]">Envío estándar</p>
              <p className="text-[10px] text-[var(--t-muted)]">3-5 días hábiles</p>
            </div>
            <p className="text-sm font-bold text-[var(--t-foreground)]">{formatPrice(SHIPPING, currencySymbol)}</p>
          </div>
        </div>
      </div>

      {/* Order summary sticky */}
      <div
        className="mt-4 lg:mt-0 p-5 lg:sticky lg:top-[80px]"
        style={{
          borderRadius: "var(--t-radius-card)",
          backgroundColor: "var(--t-secondary)",
        }}
      >
        <p className="text-base font-bold mb-4" style={{ color: "var(--t-on-secondary)" }}>Resumen</p>
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-sm">
            <span style={{ color: "color-mix(in srgb, var(--t-on-secondary) 70%, transparent)" }}>Subtotal</span>
            <span className="font-medium" style={{ color: "var(--t-on-secondary)" }}>{formatPrice(subtotal, currencySymbol)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "color-mix(in srgb, var(--t-on-secondary) 70%, transparent)" }}>Envío</span>
            <span className="font-medium" style={{ color: "var(--t-on-secondary)" }}>{formatPrice(SHIPPING, currencySymbol)}</span>
          </div>
          <div className="h-px my-2" style={{ backgroundColor: "color-mix(in srgb, var(--t-on-secondary) 10%, transparent)" }} />
          <div className="flex justify-between text-base">
            <span className="font-bold" style={{ color: "var(--t-on-secondary)" }}>Total</span>
            <span className="font-bold" style={{ color: "var(--t-on-secondary)" }}>{formatPrice(total, currencySymbol)}</span>
          </div>
        </div>

        {mode === "preview" && (
          <p className="text-[10px] text-center mb-3" style={{ color: "color-mix(in srgb, var(--t-on-secondary) 50%, transparent)" }}>
            Vista previa — conectá tu número de WhatsApp para recibir pedidos reales
          </p>
        )}

        <button
          onClick={onSubmit}
          className="w-full py-3.5 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            borderRadius: "var(--t-radius-button)",
            backgroundColor: "var(--t-primary)",
            color: "var(--t-on-primary)",
          }}
        >
          {/* WhatsApp icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Pedir por WhatsApp
        </button>
      </div>
    </div>
  );
}
