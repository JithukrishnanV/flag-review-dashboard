import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove the header that blocks iframe embedding
  response.headers.delete("X-Frame-Options");

  // Allow embedding from specific origins (Power BI, Microsoft, and localhost)
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://app.powerbi.com https://*.powerbi.com https://*.microsoft.com http://localhost:*;"
  );

  response.headers.set("Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: "/(.*)",
};
