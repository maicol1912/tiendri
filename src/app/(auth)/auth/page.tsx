import type { Metadata } from "next";
import { AuthPageClient } from "../_components/AuthPageClient";

export const metadata: Metadata = {
  title: "Acceso | Tiendri",
  robots: { index: false, follow: false },
};

type AuthPageProps = {
  searchParams: Promise<{ mode?: string; error?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const mode = params.mode === "register" ? "register" : "login";
  const urlError = params.error;

  return <AuthPageClient initialMode={mode} urlError={urlError} />;
}
