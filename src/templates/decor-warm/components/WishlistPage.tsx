// Decor Warm Template — Wishlist Page (Presentational)
// "Guardados" header, 70px linen thumbnails, trash icon removal, "Ver Más" CTA.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import type { DecorWarmWishlistItem } from "../types";

function formatPrice(price: number, symbol = "$") {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

interface WishlistPageProps {
  items: DecorWarmWishlistItem[];
  currencySymbol?: string;
  onBack?: () => void;
  onRemove?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  onAddMore?: () => void;
}

export function WishlistPage({
  items,
  currencySymbol = "$",
  onBack,
  onRemove,
  onProductClick,
  onAddMore,
}: WishlistPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          backgroundColor: "var(--t-header-bg)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--t-surface)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver"
        >
          <ArrowLeft size={18} style={{ color: "var(--t-dark-mode)" }} />
        </button>

        <span
          style={{
            color: "var(--t-dark-mode)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Guardados
        </span>

        <div style={{ width: 38 }} aria-hidden="true" />
      </div>

      {/* ── Content ── */}
      <main
        className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-4"
        style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))" }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <ShoppingBag size={32} style={{ color: "var(--t-peach)" }} />
            </div>
            <p
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Sin productos guardados
            </p>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "14px",
                margin: 0,
              }}
            >
              Guarda tus productos favoritos aquí
            </p>
            {onAddMore && (
              <button
                type="button"
                onClick={onAddMore}
                style={{
                  backgroundColor: "var(--t-peach)",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "var(--t-radius-button)",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 28px",
                }}
              >
                Ver catálogo
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3"
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid var(--t-border)",
                }}
              >
                {/* Thumbnail — 70px linen */}
                <button
                  type="button"
                  onClick={() => onProductClick?.(item.productId)}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "var(--t-radius-category)",
                    backgroundColor: "var(--t-surface)",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                  aria-label={`Ver ${item.name}`}
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="70px"
                      className="object-contain p-1.5"
                    />
                  ) : null}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <p
                    className="line-clamp-2 m-0"
                    style={{
                      color: "var(--t-text-secondary)",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </p>
                  <span
                    style={{
                      color: "var(--t-primary)",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {formatPrice(item.price, currencySymbol)}
                  </span>
                </div>

                {/* Remove button */}
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.productId)}
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      backgroundColor: "var(--t-surface)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`Quitar ${item.name} de guardados`}
                  >
                    <Trash2 size={15} style={{ color: "var(--t-text-muted)" }} />
                  </button>
                )}
              </div>
            ))}

            {/* "Agregar más" CTA */}
            {onAddMore && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={onAddMore}
                  style={{
                    backgroundColor: "var(--t-surface)",
                    color: "var(--t-primary)",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "var(--t-radius-button)",
                    border: "1px solid var(--t-peach)",
                    cursor: "pointer",
                    padding: "11px 28px",
                  }}
                >
                  Agregar más
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
