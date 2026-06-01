// Pet V3 Template — Store Header
// Mobile: pet logo + search bar.
// Desktop (lg+): logo left, search center, nav links + icons right.
// ZERO hardcoded colors — all via CSS variables.

import Image from "next/image";
import { ShoppingCart, Heart, User, PawPrint } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  storeName: string;
  logoUrl?: string | null;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onExploreClick?: () => void;
  onHomeClick?: () => void;
  layout?: {
    headerStyle?: string;
  };
}

export function Header({
  storeName,
  logoUrl,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onExploreClick,
  onHomeClick,
}: HeaderProps) {
  const hasLogo = logoUrl && logoUrl.length > 0 && !logoUrl.includes("logo-pet.png");

  const LogoBadge = ({ size = 36 }: { size?: number }) => (
    <span className="flex items-center gap-1.5">
      {hasLogo ? (
        <Image src={logoUrl} alt={storeName} width={size} height={size} className="object-contain" />
      ) : (
        <span
          className="flex items-center justify-center rounded-[var(--t-radius-button)]"
          style={{ width: size, height: size, backgroundColor: "var(--t-primary)" }}
        >
          <PawPrint size={size * 0.6} className="text-[var(--t-button-text)]" />
        </span>
      )}
      <span className="font-bold text-[var(--t-text-primary)] text-sm lg:text-base">{storeName}</span>
    </span>
  );

  return (
    <header className="sticky top-0 z-40 bg-[var(--t-header-bg)]/95 backdrop-blur-sm">
      {/* Mobile header */}
      <div className="flex lg:hidden items-center gap-3 px-4 py-3">
        <button onClick={onHomeClick} className="flex-shrink-0" aria-label={storeName}>
          <LogoBadge size={32} />
        </button>
        <div className="flex-1">
          <SearchBar readOnly onSearchClick={onSearchClick} />
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <button onClick={onHomeClick} className="flex items-center gap-2 flex-shrink-0" aria-label={storeName}>
          <LogoBadge size={36} />
        </button>

        <nav className="flex items-center gap-8">
          <button onClick={onHomeClick} className="text-sm font-medium text-[var(--t-primary)] hover:opacity-80 transition-colors">
            Tienda
          </button>
          <button onClick={onExploreClick} className="text-sm font-medium text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors">
            Explorar
          </button>
          <button className="text-sm font-medium text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors">
            Favoritos
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-[280px]">
            <SearchBar readOnly onSearchClick={onSearchClick} />
          </div>
          <button className="p-2 text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors" aria-label="Favoritos">
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={onCartClick}
            className="relative p-2 text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--t-badge-bg)] text-[var(--t-badge-text)] text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
          <button className="p-2 text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors" aria-label="Cuenta">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
