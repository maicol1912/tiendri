"use client";

import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
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

const STORE_STORAGE_KEY = "tiendri_demo-store_store";

interface StoreData {
  name?: string;
  slug?: string;
}

function useStoreData(): StoreData {
  const [storeData, setStoreData] = useState<StoreData>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoreData;
        setStoreData(parsed);
      }
    } catch {
      // localStorage unavailable or corrupted — use defaults
    }
  }, []);

  return storeData;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname.startsWith(href);
}

/** Shared navigation content — used by both desktop sidebar and mobile Sheet */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const storeData = useStoreData();
  const storeName = storeData.name || "Mi Tienda";
  const storeSlug = storeData.slug || "";

  return (
    <div className="flex h-full flex-col">
      {/* Store identity */}
      <div className="border-b border-zinc-800 px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-white">
            {storeName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {storeName}
            </p>
            <span className="inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium tracking-wide text-zinc-400">
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
                    ? "border-l-2 border-primary bg-zinc-800 pl-[10px] font-medium text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
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
      <div className="border-t border-zinc-800 px-3 py-3">
        {storeSlug ? (
          <a
            href={`/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            data-tour="preview"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors duration-150 hover:bg-zinc-800/60 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver mi tienda
          </a>
        ) : (
          <span className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-500">
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver mi tienda
          </span>
        )}
      </div>
    </div>
  );
}

/** Desktop-only fixed sidebar */
export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-zinc-800 bg-zinc-950 lg:block">
      <SidebarNav />
    </aside>
  );
}
