import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove the header that blocks iframe embedding
  response.headers.delete("X-Frame-Options");

  // Allow embedding from any origin (Power BI)
  response.headers.set("Content-Security-Policy", "frame-ancestors *");

  return response;
}

export const config = {
  matcher: "/(.*)",
};
