"use client";

// Beauty Elegant Template — Cart Page
// Purple glassmorphic theme. Cart items + total + checkout button.

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { CartItemRow } from "./CartItemRow";
import { BottomNav } from "./BottomNav";
import { useCart } from "../context/CartContext";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle } from "@/types/templates";

interface CartPageProps {
  currencySymbol?: string;
  layout?: { buttonStyle?: ButtonStyle };
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function CartPage({
  currencySymbol = "$",
  layout,
  onBack,
  onGoHome,
  onCheckout,
}: CartPageProps) {
  const { items, totalPrice, incrementItem, decrementItem, removeItem } = useCart();
  const isEmpty = items.length === 0;
  const ctaClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "var(--t-background)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-3 px-5 h-14 relative">
          <motion.button
            type="button"
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "var(--t-back-button-bg)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Volver"
            onClick={onBack}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronLeft size={22} strokeWidth={2} color="#FFFFFF" />
          </motion.button>

          <p
            className="absolute left-1/2 -translate-x-1/2 text-lg font-bold"
            style={{ color: "var(--t-foreground)", margin: 0 }}
          >
            Mi carrito
          </p>
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-5"
        style={{ paddingBottom: isEmpty ? "24px" : "calc(280px + env(safe-area-inset-bottom, 0px))" }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-primary)" strokeWidth="1.75" />
                <path d="M16 10a4 4 0 0 1-8 0" stroke="var(--t-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-base font-semibold" style={{ color: "var(--t-foreground)", margin: 0 }}>
              Tu carrito está vacío
            </p>
            <p className="text-sm" style={{ color: "var(--t-muted)", margin: 0 }}>
              Agrega productos para continuar
            </p>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-semibold border ${ctaClass}`}
              style={{
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
              }}
              onClick={onGoHome}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Cart items */}
            <div className="flex-1 flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.variantLabel ?? ""}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CartItemRow
                      item={item}
                      currencySymbol={currencySymbol}
                      onIncrement={() => incrementItem(item.productId, item.variantLabel)}
                      onDecrement={() => decrementItem(item.productId, item.variantLabel)}
                      onRemove={() => removeItem(item.productId, item.variantLabel)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex flex-col w-[380px] flex-shrink-0 sticky top-24 self-start gap-4">
              <div
                className="flex items-center justify-between p-4"
                style={{ backgroundColor: "var(--t-icon-pill-bg)", borderRadius: "20px" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                  Total
                </span>
                <span className="text-lg font-bold" style={{ color: "var(--t-foreground)" }}>
                  {formatPrice(totalPrice, currencySymbol)}
                </span>
              </div>
              <motion.button
                type="button"
                className={`w-full flex items-center justify-center py-3.5 text-sm font-bold border ${ctaClass}`}
                style={{
                  borderRadius: "var(--t-radius-button)",
                  cursor: "pointer",
                }}
                onClick={onCheckout}
                whileTap={{ scale: 0.97 }}
              >
                Finalizar pedido
              </motion.button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile checkout bar */}
      {!isEmpty && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{
            paddingBottom: "calc(70px + env(safe-area-inset-bottom, 0px))",
            borderTop: "1px solid var(--t-border-light)",
            backgroundColor: "var(--t-background)",
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="max-w-5xl mx-auto px-5 pt-3 pb-3 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                Total
              </span>
              <span className="text-base font-bold" style={{ color: "var(--t-foreground)" }}>
                {formatPrice(totalPrice, currencySymbol)}
              </span>
            </div>
            <motion.button
              type="button"
              className="w-full flex items-center justify-center py-3.5 text-base font-bold"
              style={{
                color: "var(--t-on-primary)",
                backgroundColor: "var(--t-primary)",
                border: "none",
                borderRadius: "var(--t-radius-button)",
                cursor: "pointer",
              }}
              onClick={onCheckout}
              whileTap={{ scale: 0.97 }}
            >
              Finalizar pedido
            </motion.button>
          </div>
        </motion.div>
      )}

      <BottomNav activeTab="home" />
    </motion.div>
  );
}
