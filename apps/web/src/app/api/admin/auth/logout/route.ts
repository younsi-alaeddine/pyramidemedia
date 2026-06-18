import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE, isSecureAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureAdminCookie(request),
    path: "/",
    maxAge: 0,
  });
  return response;
}
