import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  // TODO: Handle auth callback from Supabase
  return NextResponse.redirect(new URL("/dashboard", _request.url));
}
