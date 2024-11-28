import { verifySession } from "@actions";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  response.headers.set("x-pathname", pathname);
  const isSessionValid = await verifySession();

  if (isSessionValid) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (["/"].includes(pathname)) {
      response.cookies.delete("session");
    }
  }

  return response;
}
