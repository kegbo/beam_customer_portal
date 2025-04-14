import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessId = request.cookies.get("next_auth");

  if (!sessId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    "/customers/:path*",
    "/markets/:path*",
    "/overviews/:path*",
    "/settings/:path*",
    "/transactions/:path*",
    "/accountings/:path*",
  ],
};
