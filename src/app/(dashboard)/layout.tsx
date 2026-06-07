"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardBreadcrumbs } from "@/components/dashboard/breadcrumbs";
import { migrateInlineImagesToMediaLibrary } from "@/lib/media-migration";
import { useDashboardTour } from "@/hooks/useDashboardTour";
import { shouldRedirectToOnboarding } from "@/lib/onboarding/first-time";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useDashboardTour();

  useEffect(() => {
    if (shouldRedirectToOnboarding()) {
      router.replace('/onboarding');
    } else {
      setChecking(false);
    }
  }, [router]);

  // Run one-time migration from inline base64 images to MediaLibrary IDs.
  // The migration sets a localStorage flag after completion — subsequent calls are no-ops.
  useEffect(() => {
    void migrateInlineImagesToMediaLibrary('demo-store');
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
