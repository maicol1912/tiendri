"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image as ImageIcon,
  Images,
  Share2,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/shared/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TourChecklist } from "@/components/dashboard/tour-checklist";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tourTarget?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { label: "Productos", href: "/dashboard/productos", icon: Package, tourTarget: "productos" },
  { label: "Categorías", href: "/dashboard/categorias", icon: FolderTree, tourTarget: "categorias" },
  { label: "Biblioteca", href: "/dashboard/biblioteca", icon: Images },
  { label: "Banners", href: "/dashboard/banners", icon: ImageIcon },
  { label: "Compartir", href: "/dashboard/compartir", icon: Share2, tourTarget: "compartir" },
  { label: "Configuración", href: "/dashboard/configuracion", icon: Settings, tourTarget: "configuracion" },
];

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname.startsWith(href);
}

interface SidebarNavProps {
  storeName: string;
  storeSlug: string;
  onNavigate?: () => void;
}

/** Shared navigation content — used by both desktop sidebar and mobile Sheet */
export function SidebarNav({ storeName, storeSlug, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Store identity */}
      <div className="border-b border-border px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            {storeName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {storeName}
            </p>
            <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
              Gratis
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                {...(item.tourTarget ? { 'data-tour': item.tourTarget } : {})}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                  active
                    ? "border-l-2 border-primary bg-primary/5 pl-[10px] font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Onboarding checklist */}
      <div className="px-3 pb-2">
        <TourChecklist />
      </div>

      {/* Bottom section */}
      <div className="border-t border-border px-3 py-3">
        {storeSlug ? (
          <a
            href={`/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            data-tour="preview"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver mi tienda
          </a>
        ) : (
          <span className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground/60">
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver mi tienda
          </span>
        )}
      </div>
    </div>
  );
}

interface DashboardSidebarProps {
  storeName: string;
  storeSlug: string;
}

/** Desktop-only fixed sidebar */
export function DashboardSidebar({ storeName, storeSlug }: DashboardSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
      <SidebarNav storeName={storeName} storeSlug={storeSlug} />
    </aside>
  );
}
