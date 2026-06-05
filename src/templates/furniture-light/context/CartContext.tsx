"use client";

// Furniture Light — Cart Context
// Key: tc_furniture_light_cart_{slug}
// Pattern: isFirstPersistRun guard to avoid overwriting stored cart on mount.

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import type { FurnitureCartItem } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CartState {
  items: FurnitureCartItem[];
  slug: string;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: FurnitureCartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "INCREMENT"; payload: { productId: string } }
  | { type: "DECREMENT"; payload: { productId: string } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: FurnitureCartItem[] };

interface CartContextValue {
  items: FurnitureCartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<FurnitureCartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
}

// ── Key ───────────────────────────────────────────────────────────────────────

function cartKey(slug: string): string {
  return `tc_furniture_light_cart_${slug}`;
}

// ── Reducer ───────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.productId === action.payload.productId);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.payload.productId ? { ...i, quantity: i.quantity - 1 } : i
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

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(cartKey(slug));
      if (raw) {
        const parsed = JSON.parse(raw) as FurnitureCartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // Invalid JSON — start fresh
    }
    isHydrated.current = true;
  }, [slug]);

  // Persist with first-run guard
  const isFirstPersistRun = useRef(true);
  useEffect(() => {
    if (isFirstPersistRun.current) {
      isFirstPersistRun.current = false;
      return;
    }
    try {
      localStorage.setItem(cartKey(slug), JSON.stringify(state.items));
    } catch {
      // Storage unavailable
    }
  }, [state.items, slug]);

  const addItem = useCallback(
    (item: Omit<FurnitureCartItem, "quantity"> & { quantity?: number }) => {
      dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: item.quantity ?? 1 } });
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const incrementItem = useCallback((productId: string) => {
    dispatch({ type: "INCREMENT", payload: { productId } });
  }, []);

  const decrementItem = useCallback((productId: string) => {
    dispatch({ type: "DECREMENT", payload: { productId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, totalPrice, addItem, removeItem, incrementItem, decrementItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
