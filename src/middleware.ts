import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove the header that blocks iframe embedding
  response.headers.delete("X-Frame-Options");

  // We are completely removing Content-Security-Policy for frame-ancestors here.
  // Power BI Desktop HTML Content visual uses a sandboxed iframe with a 'null' origin.
  // The CSP spec does not allow whitelisting 'null' in frame-ancestors, so the only
  // way to allow embedding in Power BI Desktop is to omit frame-ancestors entirely.
  // response.headers.set("Content-Security-Policy", "...");

  response.headers.set("Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: "/(.*)",
};
