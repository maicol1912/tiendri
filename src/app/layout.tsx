import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tiendri.com"),
  title: {
    default: "Tiendri — Creá tu tienda online",
    template: "%s | Tiendri",
  },
  description:
    "Tiendri: la plataforma para crear tu tienda online en minutos y recibir pedidos por WhatsApp.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Tiendri",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Tiendri — Tu tienda online" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
