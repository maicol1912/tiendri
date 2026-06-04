"use client";

// Beauty Elegant Template — Cart Context
// Manages cart state in localStorage.
// Key: tc_beauty_elegant_cart_{slug}

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  slug: string;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantLabel?: string | null } }
  | { type: "INCREMENT"; payload: { productId: string; variantLabel?: string | null } }
  | { type: "DECREMENT"; payload: { productId: string; variantLabel?: string | null } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantLabel?: string | null) => void;
  incrementItem: (productId: string, variantLabel?: string | null) => void;
  decrementItem: (productId: string, variantLabel?: string | null) => void;
  clearCart: () => void;
}

// ── Key helper ────────────────────────────────────────────────────────────────

function cartKey(slug: string): string {
  return `tc_beauty_elegant_cart_${slug}`;
}

// ── Item match helper ─────────────────────────────────────────────────────────

function itemMatches(
  item: CartItem,
  productId: string,
  variantLabel?: string | null
): boolean {
  return (
    item.productId === productId &&
    (item.variantLabel ?? null) === (variantLabel ?? null)
  );
}

// ── Reducer ───────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const { productId, variantLabel } = action.payload;
      const exists = state.items.find((i) =>
        itemMatches(i, productId, variantLabel)
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            itemMatches(i, productId, variantLabel)
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !itemMatches(i, action.payload.productId, action.payload.variantLabel)
        ),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          itemMatches(i, action.payload.productId, action.payload.variantLabel)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            itemMatches(i, action.payload.productId, action.payload.variantLabel)
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
  slug: string;
}

export function CartProvider({ children, slug }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], slug });
  const isHydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(cartKey(slug));
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // Invalid JSON in localStorage — ignore
    }
    isHydrated.current = true;
  }, [slug]);

  const isFirstPersistRun = useRef(true);
  useEffect(() => {
    if (isFirstPersistRun.current) {
      isFirstPersistRun.current = false;
      return;
    }
    try {
      localStorage.setItem(cartKey(slug), JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable — ignore
    }
  }, [state.items, slug]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((productId: string, variantLabel?: string | null) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantLabel } });
  }, []);

  const incrementItem = useCallback((productId: string, variantLabel?: string | null) => {
    dispatch({ type: "INCREMENT", payload: { productId, variantLabel } });
  }, []);

  const decrementItem = useCallback((productId: string, variantLabel?: string | null) => {
    dispatch({ type: "DECREMENT", payload: { productId, variantLabel } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        incrementItem,
        decrementItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider (beauty-elegant)");
  }
  return ctx;
}
