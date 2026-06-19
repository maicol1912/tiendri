import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso | Tiendri",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <div>Auth Page</div>;
}
