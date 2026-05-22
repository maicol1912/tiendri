"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardBreadcrumbs } from "@/components/dashboard/breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
