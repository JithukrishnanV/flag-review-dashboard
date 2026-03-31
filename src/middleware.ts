import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove the header that blocks iframe embedding
  response.headers.delete("X-Frame-Options");

  // Allow embedding from specific origins (Power BI, Microsoft, and localhost)
  // Power BI Desktop might use custom schemes like ms-pbi: or file:
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://app.powerbi.com https://*.powerbi.com https://*.microsoft.com http://localhost:* ms-pbi: pbi: file: data:;"
  );

  response.headers.set("Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: "/(.*)",
};
