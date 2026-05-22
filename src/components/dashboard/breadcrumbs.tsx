"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Inicio",
  productos: "Productos",
  categorias: "Categorías",
  banners: "Banners",
  compartir: "Compartir",
  configuracion: "Configuración",
  nuevo: "Nuevo",
};

interface BreadcrumbItem {
  label: string;
  href: string;
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Remove leading slash and split
  const segments = pathname.replace(/^\//, "").split("/");

  // First segment should be "dashboard"
  if (segments[0] !== "dashboard") return [];

  const crumbs: BreadcrumbItem[] = [];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = ROUTE_LABELS[segment];

    if (label) {
      crumbs.push({ label, href: currentPath });
    } else {
      // Dynamic segment (e.g., [id]) — skip or show as-is
      // For now, skip unknown segments to keep breadcrumbs clean
    }
  }

  return crumbs;
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);

  // Don't render for just "Inicio" — redundant
  if (crumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 hidden text-sm text-zinc-400 md:block"
    >
      <ol className="flex items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-zinc-600" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className="font-medium text-white" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition-colors duration-150 hover:text-white"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
