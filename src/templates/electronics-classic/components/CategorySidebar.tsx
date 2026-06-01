// Electronics Classic — Category Sidebar
// Categories list + rating filter. Filter by price is a placeholder.
// All colors via var(--t-*). ZERO hardcoded hex.

import type { StorefrontCategory } from "../types";

interface CategorySidebarProps {
  categories: StorefrontCategory[];
  selectedCategory: string | null;
  minRating: number;
  onCategorySelect: (id: string | null) => void;
  onRatingChange: (rating: number) => void;
  onClose?: () => void;
  isDrawer?: boolean;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  minRating,
  onCategorySelect,
  onRatingChange,
  onClose,
  isDrawer = false,
}: CategorySidebarProps) {
  return (
    <aside
      className={`flex flex-col gap-6 ${isDrawer ? "p-5" : ""}`}
      aria-label="Filtros"
    >
      {/* Drawer header */}
      {isDrawer && onClose && (
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[var(--t-text-primary)]">Filtros</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:opacity-70 transition-opacity"
            style={{ color: "var(--t-text-muted)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-[var(--t-text-primary)] text-sm mb-3">
          Categorías
        </h3>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full text-left px-3 py-2 text-sm rounded-[var(--t-radius-button)] transition-colors ${
                selectedCategory === null
                  ? "font-semibold"
                  : "hover:opacity-70"
              }`}
              style={
                selectedCategory === null
                  ? {
                      backgroundColor: "var(--t-filter-active-bg, var(--t-primary))",
                      color: "var(--t-button-text)",
                    }
                  : { color: "var(--t-text-secondary)" }
              }
              aria-current={selectedCategory === null ? "true" : undefined}
            >
              Todos los productos
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategorySelect(cat.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-[var(--t-radius-button)] transition-colors flex items-center justify-between gap-2 ${
                  selectedCategory === cat.id ? "font-semibold" : "hover:opacity-70"
                }`}
                style={
                  selectedCategory === cat.id
                    ? {
                        backgroundColor: "var(--t-filter-active-bg, var(--t-primary))",
                        color: "var(--t-button-text)",
                      }
                    : { color: "var(--t-text-secondary)" }
                }
                aria-current={selectedCategory === cat.id ? "true" : undefined}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span
                    className="text-xs shrink-0"
                    style={{
                      color:
                        selectedCategory === cat.id
                          ? "var(--t-button-text)"
                          : "var(--t-text-muted)",
                    }}
                  >
                    {cat.productCount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-semibold text-[var(--t-text-primary)] text-sm mb-3">
          Calificación mínima
        </h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1, 0].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(stars)}
              className="flex items-center gap-2 text-sm text-left hover:opacity-70 transition-opacity"
              aria-pressed={minRating === stars}
            >
              <span
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{
                  borderColor: minRating === stars ? "var(--t-primary)" : "var(--t-surface)",
                  backgroundColor: minRating === stars ? "var(--t-primary)" : "transparent",
                }}
                aria-hidden="true"
              >
                {minRating === stars && (
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--t-background)" }} />
                )}
              </span>
              <span style={{ color: "var(--t-text-secondary)" }}>
                {stars === 0 ? "Todas" : `${stars}+ estrellas`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price filter — placeholder */}
      <div>
        <h3 className="font-semibold text-[var(--t-text-primary)] text-sm mb-2">
          Precio
        </h3>
        <p className="text-[var(--t-text-muted)] text-xs">
          Filtro de precio disponible próximamente.
        </p>
      </div>
    </aside>
  );
}
