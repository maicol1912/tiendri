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

  const { data: store } = await supabase
    .from("stores")
    .select("id, name, slug")
    .eq("owner_id", user.id)
    .limit(1)
    .single();

  if (!store) {
    redirect("/onboarding");
  }

  return (
    <DashboardLayoutClient storeName={store.name} storeSlug={store.slug}>
      {children}
    </DashboardLayoutClient>
  );
}
