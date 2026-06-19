import type { Metadata } from "next";
import { AuthParticles } from "./_components/AuthParticles";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a14]">
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Animated particles background */}
      <AuthParticles />

      {/* Large background glass rectangle (inner viewport panel) */}
      <div
        className="absolute hidden md:block bg-white/[0.03] border border-white/[0.06] rounded-3xl backdrop-blur-sm"
        style={{ left: "14.4%", top: "8%", width: "71.1%", height: "84%" }}
      />

      {/* Page content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
