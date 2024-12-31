import { logout, verifySession } from "@actions";
import { NextRequest, NextResponse } from "next/server";
import { UserClassesEnum } from "common";
import { Route } from "next";

const FALLBACK_ROUTE: Route = "/inicio";

const COMMON_ROUTES: Route[] = [FALLBACK_ROUTE, "/republica"];
const COMMON_AUTH_ROUTES: Route[] = ["/configuracoes"];
const CLASSES_ROUTES: Record<UserClassesEnum, Route[]> = {
  [UserClassesEnum.REPUBLICA]: ["/minha-republica", ...COMMON_AUTH_ROUTES],
  [UserClassesEnum.BIXO]: ["/interesses", "/perfil", ...COMMON_AUTH_ROUTES],
  [UserClassesEnum.NAO_DEFINIDA]: [],
};

const UNAUTH_ROUTES: Route[] = ["/auth/criar", "/auth/entrar"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname as Route;
  const response = NextResponse.next();

  response.headers.set("x-pathname", pathname);
  const userSession = await verifySession();
  const ALLOWED_ROUTES = COMMON_ROUTES;

  if (userSession) {
    ALLOWED_ROUTES.push(...CLASSES_ROUTES[userSession.class]);
    const isUnauthRoute = UNAUTH_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (isUnauthRoute) return handleRedirect(FALLBACK_ROUTE, request.url);

    const isAllowed = ALLOWED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAllowed) return handleRedirect(FALLBACK_ROUTE, request.url);
  } else {
    ALLOWED_ROUTES.push(...UNAUTH_ROUTES);
    const session = request.cookies.get("session");
    if (session) {
      await logout();
      response.cookies.delete("session");
    }
    const isAuthRoute =
      !ALLOWED_ROUTES.some((route) => pathname.startsWith(route)) &&
      !COMMON_ROUTES.includes(pathname);

    if (isAuthRoute) return handleRedirect(FALLBACK_ROUTE, request.url);
  }

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
