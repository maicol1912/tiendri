import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/infrastructure/supabase/server";
import { DashboardLayoutClient } from "./dashboard-layout-client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
