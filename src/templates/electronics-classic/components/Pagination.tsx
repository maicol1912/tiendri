// Electronics Classic — Pagination
// Numbered pages + prev/next arrows.
// All colors via var(--t-*). ZERO hardcoded hex.

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = (): Array<number | "..."> => {
    const pages: Array<number | "..."> = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    // Always show first + last, collapse middle with ellipsis
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="Paginación">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
        className="w-9 h-9 flex items-center justify-center rounded-[var(--t-radius-button)] border disabled:opacity-40 hover:opacity-70 transition-opacity"
        style={{
          borderColor: "var(--t-surface)",
          color: "var(--t-text-primary)",
          backgroundColor: "var(--t-card-bg)",
        }}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sm"
            style={{ color: "var(--t-text-muted)" }}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className="w-9 h-9 flex items-center justify-center text-sm rounded-[var(--t-radius-button)] font-medium transition-colors"
            style={
              page === currentPage
                ? {
                    backgroundColor: "var(--t-primary)",
                    color: "var(--t-button-text)",
                  }
                : {
                    backgroundColor: "var(--t-card-bg)",
                    color: "var(--t-text-primary)",
                    border: "1px solid var(--t-surface)",
                  }
            }
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Página siguiente"
        className="w-9 h-9 flex items-center justify-center rounded-[var(--t-radius-button)] border disabled:opacity-40 hover:opacity-70 transition-opacity"
        style={{
          borderColor: "var(--t-surface)",
          color: "var(--t-text-primary)",
          backgroundColor: "var(--t-card-bg)",
        }}
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
