"use client";

import { useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardBreadcrumbs } from "@/components/dashboard/breadcrumbs";
import { migrateInlineImagesToMediaLibrary } from "@/shared/media-migration";
import { useDashboardTour } from "@/app/(dashboard)/_hooks/useDashboardTour";

interface Props {
  children: React.ReactNode;
  storeName: string;
  storeSlug: string;
}

export function DashboardLayoutClient({ children, storeName, storeSlug }: Props) {
  useDashboardTour();

  useEffect(() => {
    void migrateInlineImagesToMediaLibrary('demo-store');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar storeName={storeName} storeSlug={storeSlug} />
      <div className="lg:pl-64">
        <DashboardHeader storeName={storeName} storeSlug={storeSlug} />
        <main className="p-4 md:p-6 lg:p-8">
          <DashboardBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
