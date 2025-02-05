import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  // Ensure x-forwarded-host exists and is a valid URL
  if (requestHeaders.has("x-forwarded-host")) {
    const forwardedHost = requestHeaders.get("x-forwarded-host") as string;
    
    // Check if the forwardedHost is a valid URL, otherwise prepend "https://"
    try {
      new URL(forwardedHost); // If valid, it won't throw an error
      requestHeaders.set("origin", forwardedHost);
    } catch (error) {
      requestHeaders.set("origin", `https://${forwardedHost}`);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
