"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarNav } from "@/components/dashboard/sidebar";

const STORE_STORAGE_KEY = "tiendri_demo-store_store";

/** Mobile-only header with hamburger menu, store name, and Tiendri logo */
export function DashboardHeader() {
  const [storeName, setStoreName] = useState("Mi Tienda");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string };
        if (parsed.name) setStoreName(parsed.name);
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur-sm lg:hidden">
      {/* Hamburger + mobile Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 border-zinc-800 bg-zinc-950 p-0"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <SidebarNav onNavigate={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Store name — center */}
      <span className="text-sm font-medium text-white">{storeName}</span>

      {/* Tiendri logo — right */}
      <Image
        src="/images/logo-dark.png"
        alt="Tiendri"
        width={80}
        height={24}
        className="h-5 w-auto"
      />
    </header>
  );
}
