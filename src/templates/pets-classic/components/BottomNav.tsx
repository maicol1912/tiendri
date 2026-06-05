"use client";

// Pets Classic — Orange Bottom Navigation (signature!)
// Solid orange bg, curved top corners, 4 tabs.
// All colors via var(--t-*)
// Tab selection spring animation gated by animationLevel prop.

import { Home, LayoutGrid, ShoppingBag, Store } from "lucide-react";
import { useRef, useEffect } from "react";
import type { NavTab } from "../types";

type AnimationLevel = "full" | "subtle" | "none";

interface BottomNavProps {
  activeTab?: NavTab;
  cartItemCount?: number;
  animationLevel?: AnimationLevel;
  onTabChange?: (tab: NavTab) => void;
}

const TABS: { id: NavTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "listing", label: "Catálogo", Icon: LayoutGrid },
  { id: "cart", label: "Carrito", Icon: ShoppingBag },
  { id: "info", label: "Info", Icon: Store },
];

// Keyframe for the spring bounce: scale(0.85) → scale(1.1) → scale(1.0)
// Injected once per render via a scoped <style> tag using React 19 stylesheet hoisting.
const SPRING_KEYFRAMES = `
@keyframes pets-nav-spring {
  0%   { transform: scale(0.85); }
  55%  { transform: scale(1.1); }
  100% { transform: scale(1.0); }
}
@keyframes pets-nav-fade {
  0%   { opacity: 0.5; }
  100% { opacity: 1; }
}
`;

interface TabIconProps {
  isActive: boolean;
  animationLevel: AnimationLevel;
  Icon: typeof Home;
}

function TabIcon({ isActive, animationLevel, Icon }: TabIconProps) {
  // Track previous active state to fire animation only when transitioning TO active
  const prevActiveRef = useRef(isActive);
  const justActivatedRef = useRef(false);

  if (prevActiveRef.current !== isActive) {
    justActivatedRef.current = isActive; // true only when switching from inactive → active
    prevActiveRef.current = isActive;
  }

  // After one render with animation, clear the flag so it doesn't replay
  useEffect(() => {
    if (justActivatedRef.current) {
      justActivatedRef.current = false;
    }
  });

  const shouldPlaySpring = animationLevel === "full" && justActivatedRef.current;
  const shouldPlayFade = animationLevel === "subtle" && justActivatedRef.current;

  return (
    <Icon
      size={22}
      strokeWidth={isActive ? 2.5 : 2}
      fill={isActive ? "var(--t-button-text)" : "none"}
      style={{
        color: isActive ? "var(--t-button-text)" : "rgba(255,255,255,0.65)",
        transition: animationLevel === "subtle" ? "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)" : "color 0.15s ease, fill 0.15s ease",
        animation: shouldPlaySpring
          ? "pets-nav-spring 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards"
          : shouldPlayFade
          ? "pets-nav-fade 200ms cubic-bezier(0.23, 1, 0.32, 1) forwards"
          : undefined,
      }}
    />
  );
}

export function BottomNav({
  activeTab = "home",
  cartItemCount = 0,
  animationLevel = "none",
  onTabChange,
}: BottomNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--t-primary)",
        borderRadius: "24px 24px 0 0",
        height: 72,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
      aria-label="Navegación principal"
    >
      {/* Inject keyframes once — React dedupes style tags with identical content */}
      <style>{SPRING_KEYFRAMES}</style>

      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-4">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === "cart";

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange?.(id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <TabIcon
                  isActive={isActive}
                  animationLevel={animationLevel}
                  Icon={Icon}
                />
                {isCart && cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "var(--t-secondary)",
                      color: "var(--t-background)",
                      fontSize: "9px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              <span
                aria-hidden="true"
                style={{
                  fontSize: "9px",
                  fontWeight: 500,
                  color: isActive ? "var(--t-button-text)" : "rgba(255,255,255,0.65)",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
