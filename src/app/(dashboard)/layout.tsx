"use client";

import { useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardBreadcrumbs } from "@/components/dashboard/breadcrumbs";
import { migrateInlineImagesToMediaLibrary } from "@/lib/media-migration";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Run one-time migration from inline base64 images to MediaLibrary IDs.
  // The migration sets a localStorage flag after completion — subsequent calls are no-ops.
  useEffect(() => {
    void migrateInlineImagesToMediaLibrary('demo-store');
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 md:p-6 lg:p-8">
          <DashboardBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
