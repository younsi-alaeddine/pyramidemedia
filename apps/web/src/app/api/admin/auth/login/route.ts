import { NextResponse } from "next/server";
import {
  ADMIN_TOKEN_COOKIE,
  isSecureAdminCookie,
  loginAdmin,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginAdmin(body.email, body.password);

    const response = NextResponse.json({ user: result.user });
    response.cookies.set(ADMIN_TOKEN_COOKIE, result.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isSecureAdminCookie(request),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }
}
