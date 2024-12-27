import { deleteSessionCookie, verifySession } from "@actions";
import { NextRequest, NextResponse } from "next/server";
import { UserClassesEnum } from "common";
import { cookies } from "next/headers";

const FALLBACK_ROUTE = "/inicio";

const COMMON_ROUTES = [FALLBACK_ROUTE];
const COMMON_AUTH_ROUTES = ["/configuracoes"];
const CLASSES_ROUTES: Record<UserClassesEnum, string[]> = {
  [UserClassesEnum.REPUBLICA]: ["/republica", ...COMMON_AUTH_ROUTES],
  [UserClassesEnum.BIXO]: ["/interesses", "/perfil", ...COMMON_AUTH_ROUTES],
  [UserClassesEnum.NAO_DEFINIDA]: [],
};

const UNAUTH_ROUTES = ["/auth"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  response.headers.set("x-pathname", pathname);
  const userSession = await verifySession();
  const ALLOWED_ROUTES = [
    ...(userSession ? CLASSES_ROUTES[userSession.class] : []),
    ...COMMON_ROUTES,
  ];

  if (userSession) {
    const isUnauthRoute = UNAUTH_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (isUnauthRoute) return handleRedirect(FALLBACK_ROUTE, request.url);

    const isAllowed = ALLOWED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAllowed) return handleRedirect(FALLBACK_ROUTE, request.url);
    
    return response;
  }
  
  const session = request.cookies.get("session");
  if (session) response.cookies.delete("session");
  const isAuthRoute =
    ALLOWED_ROUTES.some((route) => pathname.startsWith(route)) &&
    !COMMON_ROUTES.includes(pathname);
  if (isAuthRoute) return handleRedirect(FALLBACK_ROUTE, request.url);

  return response;
}

function handleRedirect(destination: string, base: string) {
  return NextResponse.redirect(new URL(destination, base));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
