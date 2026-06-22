"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/infrastructure/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/* ─── Eye toggle icons ─── */
function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    if (newPassword.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (newPassword !== confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError("Error al actualizar la contraseña. Intentá de nuevo.");
        return;
      }

      toast.success("Contraseña actualizada correctamente");
      router.push("/dashboard");
    } catch {
      setError("Ocurrió un error inesperado. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">

      {/* Dark branding panel */}
      <div
        className={[
          "hidden md:flex flex-col justify-between",
          "absolute inset-y-0 w-[45%] z-20 left-0 rounded-r-[40px]",
          "bg-gradient-to-br from-[#0a0a14] via-[#0d1025] to-[#111638]",
        ].join(" ")}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 p-10">
          <span className="font-sora text-xl font-semibold lowercase tracking-tight text-white">
            tiendri<span className="text-blue-500">.</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-1 items-center px-10">
          <p className="text-4xl lg:text-5xl font-light text-white/90 italic leading-tight">
            Nueva
            <br />
            contraseña.
          </p>
        </div>

        <div className="p-8" />
      </div>

      {/* Form panel */}
      <div
        className={[
          "w-full md:w-[55%] min-h-screen",
          "flex items-center justify-center",
          "md:ml-[45%]",
        ].join(" ")}
      >
        <div className="w-full max-w-[400px] px-6 md:px-0 py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Restablecer contraseña
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Ingresá tu nueva contraseña para acceder a tu cuenta.
          </p>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                Nueva contraseña
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-colors"
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            ¿Ya recordaste tu contraseña?{" "}
            <a
              href="/auth"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Iniciá sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
