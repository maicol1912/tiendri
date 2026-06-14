// Decor Warm Template — Checkout Page (Presentational)
// Shared Header + form fields + order summary sidebar + WhatsApp CTA.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { Header } from "./Header";
import { CheckoutForm } from "./CheckoutForm";
import { formatPrice } from "@/lib/format";
import type { StoreInfo } from "@/types/store";

export interface CheckoutOrderItem {
  productId: string;
  name: string;
  imageUrl?: string | null;
  quantity: number;
  price: number;
}

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

interface CheckoutPageProps {
  store: StoreInfo;
  orderItems: CheckoutOrderItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  errors?: FieldErrors;
  isSubmitting?: boolean;
  currencySymbol?: string;
  cartItemCount?: number;
  onCartOpen?: () => void;
  onNavLinkClick?: (href: string) => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
}

export function CheckoutPage({
  store,
  orderItems,
  totalPrice,
  formData,
  errors = {},
  isSubmitting = false,
  currencySymbol = "$",
  cartItemCount = 0,
  onCartOpen,
  onNavLinkClick,
  onFieldChange,
  onSubmit,
}: CheckoutPageProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onCartClick={onCartOpen}
        onNavLinkClick={onNavLinkClick}
      />

      {/* ── Content ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-5 lg:flex lg:gap-8 lg:items-start">
        {/* ── Form section ── */}
        <CheckoutForm
          formData={formData}
          errors={errors}
          onFieldChange={onFieldChange}
        />

        {/* ── Order summary (desktop sidebar / mobile below form) ── */}
        <div
          className="mt-6 lg:mt-0 lg:w-80 flex-shrink-0"
          style={{
            backgroundColor: "var(--t-card)",
            borderRadius: "var(--t-radius-card)",
            padding: "16px",
          }}
        >
          <h3
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              margin: "0 0 12px 0",
            }}
          >
            Resumen del pedido
          </h3>

          <div className="flex flex-col gap-3">
            {orderItems.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                {/* Thumbnail */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "var(--t-radius-category)",
                    backgroundColor: "var(--t-border)",
                    overflow: "hidden",
                  }}
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="46px"
                      className="object-contain p-1"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="line-clamp-1 m-0"
                    style={{
                      color: "var(--t-muted)",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      color: "var(--t-muted)",
                      fontFamily: "'League Spartan', sans-serif",
                      fontSize: "11px",
                    }}
                  >
                    ×{item.quantity}
                  </p>
                </div>
                <span
                  style={{
                    color: "var(--t-primary)",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {formatPrice(item.price * item.quantity, currencySymbol)}
                </span>
              </div>
            ))}

            <hr style={{ borderColor: "var(--t-border)", borderTopWidth: 1, margin: "4px 0" }} />

            <div className="flex justify-between">
              <span
                style={{
                  color: "var(--t-dark-mode)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Total
              </span>
              <span
                style={{
                  color: "var(--t-primary)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                {formatPrice(totalPrice, currencySymbol)}
              </span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-full flex items-center justify-center gap-2 mt-4"
            style={{
              backgroundColor: isSubmitting ? "var(--t-border)" : "var(--t-primary)",
              color: "#FFFFFF",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              borderRadius: "var(--t-radius-button)",
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              padding: "13px 0",
              letterSpacing: "0.03em",
              transition: "background-color 0.2s ease",
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {isSubmitting ? "Enviando..." : "ENVIAR VÍA WHATSAPP"}
          </button>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div
        className="lg:hidden sticky bottom-0 px-4 py-4"
        style={{
          backgroundColor: "var(--t-background)",
          borderTop: "1px solid var(--t-border)",
          paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full flex items-center justify-center gap-2"
          style={{
            backgroundColor: isSubmitting ? "var(--t-border)" : "var(--t-primary)",
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            borderRadius: "var(--t-radius-button)",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            padding: "14px 0",
            letterSpacing: "0.03em",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {isSubmitting ? "Enviando..." : "ENVIAR VÍA WHATSAPP"}
        </button>
      </div>
    </div>
  );
}
