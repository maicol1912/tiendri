import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/infrastructure/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=auth-code-error", origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth?error=auth-code-error", origin));
  }

  return NextResponse.redirect(new URL(next, origin));
}
