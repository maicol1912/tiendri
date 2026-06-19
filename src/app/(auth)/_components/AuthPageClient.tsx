"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/infrastructure/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* ─── Google SVG icon ─── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Eye toggle icons ─── */
function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/40"
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
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/40"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

/* ─── Types ─── */
type AuthMode = "login" | "register";

type AuthPageClientProps = {
  initialMode: AuthMode;
  urlError?: string;
};

/* ─── Component ─── */
export function AuthPageClient({ initialMode, urlError }: AuthPageClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(urlError === "auth-code-error" ? "Error al verificar el código de acceso. Intenta de nuevo." : null);
  const [success, setSuccess] = useState<string | null>(null);

  const isRegister = mode === "register";

  /* ─── Mode toggle ─── */
  const toggleMode = useCallback(
    (newMode: AuthMode) => {
      setMode(newMode);
      setError(null);
      setSuccess(null);
      setPassword("");
      setConfirmPassword("");
      router.push(newMode === "register" ? "/auth?mode=register" : "/auth", {
        scroll: false,
      });
    },
    [router],
  );

  /* ─── Validation ─── */
  const validate = (): string | null => {
    if (!email.trim()) return "El correo electrónico es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Ingresa un correo electrónico válido.";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (isRegister && password !== confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      if (isRegister) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
          },
        });

        if (signUpError) {
          setError(mapAuthError(signUpError.message));
          return;
        }

        setSuccess(
          "Revisa tu correo electrónico para confirmar tu cuenta.",
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(mapAuthError(signInError.message));
          return;
        }

        router.push("/dashboard");
      }
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── Google OAuth ─── */
  const handleGoogleAuth = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center md:px-4 md:py-8">
      <div className="relative w-full md:w-auto">
        {/* Glass Card */}
        <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden border-white/[0.12] bg-white/[0.06] px-6 py-10 backdrop-blur-[9px] md:w-[410px] md:rounded-[28px] md:border-[2px] md:bg-white/[0.08] md:px-20 md:py-8">
          {/* Logo */}
          <span className="font-sora text-xl font-semibold tracking-tight lowercase text-white">
            tiendri
          </span>

          {/* Form container */}
          <div className="flex w-full flex-col gap-6 md:w-[250px]">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-white">
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </h1>

            {/* Error alert */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Success alert */}
            {success && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[13px] font-medium text-white"
                >
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 bg-white/[0.08] border-white/[0.12] rounded-[5px] text-white placeholder:text-white/40 focus-visible:border-[#2563EB]/50 focus-visible:ring-[#2563EB]/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[13px] font-medium text-white"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 bg-white/[0.08] border-white/[0.12] rounded-[5px] text-white placeholder:text-white/40 focus-visible:border-[#2563EB]/50 focus-visible:ring-[#2563EB]/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Confirm password (register only) */}
              {isRegister && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-[13px] font-medium text-white"
                  >
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
                      className="h-10 bg-white/[0.08] border-white/[0.12] rounded-[5px] text-white placeholder:text-white/40 focus-visible:border-[#2563EB]/50 focus-visible:ring-[#2563EB]/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot password (login only) */}
              {!isRegister && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-[13px] text-white/80 hover:text-white transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-10 w-full bg-[#2563EB] hover:bg-[#3B82F6] rounded-[7px] text-base font-bold"
              >
                {loading
                  ? "Cargando..."
                  : isRegister
                    ? "Crear cuenta"
                    : "Iniciar sesión"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 border-t border-white/20" />
              <span className="text-[13px] text-white text-center">o continúa con</span>
              <div className="h-px flex-1 border-t border-white/20" />
            </div>

            {/* Google button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="h-10 w-full bg-white/[0.08] border-white/[0.12] hover:bg-white/[0.12] text-white rounded-[7px] gap-3"
            >
              <GoogleIcon />
              Continuar con Google
            </Button>

            {/* Toggle mode */}
            <p className="text-center text-[10px] text-white">
              {isRegister ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
              <button
                type="button"
                onClick={() => toggleMode(isRegister ? "login" : "register")}
                className="font-bold text-white transition-colors hover:text-white/80"
              >
                {isRegister ? "Inicia sesión" : "Regístrate gratis"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Error mapper ─── */
function mapAuthError(message: string): string {
  if (message.includes("Invalid login credentials"))
    return "Correo o contraseña incorrectos.";
  if (message.includes("User already registered"))
    return "Este correo ya está registrado. Intenta iniciar sesión.";
  if (message.includes("Password should be at least 6 characters"))
    return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("Email not confirmed"))
    return "Debes confirmar tu correo electrónico antes de iniciar sesión.";
  if (message.includes("Too many requests"))
    return "Demasiados intentos. Espera un momento antes de intentar de nuevo.";
  return message;
}
