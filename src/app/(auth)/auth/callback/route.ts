import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/infrastructure/supabase/server";

function sanitizeRedirectPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next");
  const next = sanitizeRedirectPath(rawNext);

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=auth-code-error", origin));
  }

  const supabase = await createClient();
  const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth?error=auth-code-error", origin));
  }

  // Smart redirect: only when ?next= was not explicitly set
  if (!rawNext) {
    const user = sessionData?.user;
    if (user) {
      const { data: store } = await supabase
        .from("stores")
        .select("onboarding_completed")
        .eq("owner_id", user.id)
        .single();

      const redirectTo = store?.onboarding_completed ? "/dashboard" : "/onboarding";
      return NextResponse.redirect(new URL(redirectTo, origin));
    }
  }

  return NextResponse.redirect(new URL(next, origin));
}
