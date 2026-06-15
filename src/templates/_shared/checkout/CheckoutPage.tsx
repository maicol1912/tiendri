import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { CheckoutForm } from "./CheckoutForm";
import type { CartItem, CheckoutFormData } from "@/types/cart";

interface CheckoutFormFieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
}

interface SharedCheckoutPageProps {
  header: React.ReactNode;
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  formData: CheckoutFormData;
  formErrors?: CheckoutFormFieldErrors;
  isSubmitting?: boolean;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
  onBack?: () => void;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function SharedCheckoutPage({
  header,
  items,
  totalPrice,
  currencySymbol = "$",
  formData,
  formErrors,
  isSubmitting = false,
  onFieldChange,
  onSubmit,
  onBack,
}: SharedCheckoutPageProps) {
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
        {header}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-lg font-semibold" style={{ color: "var(--t-foreground)" }}>
            Tu carrito está vacío
          </p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--t-primary)",
                color: "var(--t-on-primary)",
                borderRadius: "var(--t-radius-button)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Seguir comprando
            </button>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-12" style={{ backgroundColor: "var(--t-background)" }}>
      {header}

      <main className="max-w-5xl mx-auto px-4 lg:px-6 pt-6">
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-start">
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl font-bold mb-6"
              style={{ color: "var(--t-foreground)" }}
            >
              Datos de envío
            </h1>
            <CheckoutForm
              formData={formData}
              errors={formErrors}
              onFieldChange={onFieldChange}
            />
          </div>

          <aside className="mt-8 lg:mt-0 lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-20 self-start">
            <div
              className="p-5 flex flex-col gap-4"
              style={{
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-card, var(--t-radius-button))",
                backgroundColor: "var(--t-card)",
              }}
            >
              <h2 className="text-sm font-bold" style={{ color: "var(--t-foreground)" }}>
                Tu pedido
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantName ?? ""}`} className="flex items-start gap-3">
                    <div
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "var(--t-radius-button)",
                        backgroundColor: "var(--t-background)",
                        border: "1px solid var(--t-border)",
                      }}
                    >
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="52px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold line-clamp-2"
                        style={{ color: "var(--t-foreground)" }}
                      >
                        {item.name}
                      </p>
                      {item.variantName && (
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--t-muted)" }}>
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-[10px]" style={{ color: "var(--t-muted)" }}>
                        ×{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium flex-shrink-0" style={{ color: "var(--t-foreground)" }}>
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid var(--t-border)" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                  Total
                </span>
                <span className="text-base font-bold" style={{ color: "var(--t-foreground)" }}>
                  {formatPrice(totalPrice, currencySymbol)}
                </span>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="hidden lg:flex w-full items-center justify-center gap-2.5 py-3.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{
                  backgroundColor: "var(--t-primary)",
                  color: "var(--t-on-primary)",
                  borderRadius: "var(--t-radius-button)",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                <WhatsAppIcon size={18} />
                {isSubmitting ? "Enviando…" : "Enviar pedido por WhatsApp"}
              </button>
            </div>
          </aside>
        </div>
      </main>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{
          backgroundColor: "var(--t-background)",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{
            backgroundColor: "var(--t-primary)",
            color: "var(--t-on-primary)",
            borderRadius: "var(--t-radius-button)",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          <WhatsAppIcon size={18} />
          {isSubmitting ? "Enviando…" : "Enviar pedido por WhatsApp"}
        </button>
      </div>
    </div>
  );
}
