"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";

export type { CartItem };

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantName?: string | null } }
  | { type: "INCREMENT"; payload: { productId: string; variantName?: string | null } }
  | { type: "DECREMENT"; payload: { productId: string; variantName?: string | null } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantName?: string | null) => void;
  incrementItem: (productId: string, variantName?: string | null) => void;
  decrementItem: (productId: string, variantName?: string | null) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
  slug: string;
  storageKey: string;
}

export function createCartStorageKey(templateId: string): string {
  return `tc_${templateId.replace(/-/g, "_")}_cart`;
}

function itemMatches(
  item: CartItem,
  productId: string,
  variantName?: string | null
): boolean {
  if (item.productId !== productId) return false;
  if (variantName != null) {
    return (item.variantName ?? null) === (variantName ?? null);
  }
  return true;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD_ITEM": {
      const { productId, variantName } = action.payload;
      const exists = state.items.find((i) => itemMatches(i, productId, variantName));
      if (exists) {
        return {
          items: state.items.map((i) =>
            itemMatches(i, productId, variantName)
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !itemMatches(i, action.payload.productId, action.payload.variantName)
        ),
      };

    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          itemMatches(i, action.payload.productId, action.payload.variantName)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREMENT":
      return {
        items: state.items.map((i) =>
          itemMatches(i, action.payload.productId, action.payload.variantName)
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        ),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children, slug, storageKey }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const isHydrated = useRef(false);
  const isFirstPersistRun = useRef(true);

  const storageKeyFull = `${storageKey}_${slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKeyFull);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // Invalid JSON — start fresh
    }
    isHydrated.current = true;
  }, [storageKeyFull]);

  useEffect(() => {
    if (isFirstPersistRun.current) {
      isFirstPersistRun.current = false;
      return;
    }
    try {
      localStorage.setItem(storageKeyFull, JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable
    }
  }, [state.items, storageKeyFull]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, quantity: item.quantity ?? 1 },
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, variantName?: string | null) => {
      dispatch({ type: "REMOVE_ITEM", payload: { productId, variantName } });
    },
    []
  );

  const incrementItem = useCallback(
    (productId: string, variantName?: string | null) => {
      dispatch({ type: "INCREMENT", payload: { productId, variantName } });
    },
    []
  );

  const decrementItem = useCallback(
    (productId: string, variantName?: string | null) => {
      dispatch({ type: "DECREMENT", payload: { productId, variantName } });
    },
    []
  );

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
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
