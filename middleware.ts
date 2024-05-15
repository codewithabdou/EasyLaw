import { NextRequest, NextResponse } from "next/server";
import authorization from "@services/authorizations.service";
import { cookies } from "next/headers";

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const userRole: string | undefined = cookies().get("role")?.value;
  const UserIsNotAuthenticated: boolean = !userRole || !userRole.length;

  if (authorization.isProtectedRoute(pathname)) {
    if (
      UserIsNotAuthenticated ||
      !authorization.isUserAuthorized(userRole, pathname)
    ) {
      return redirectToNotFound(url);
    }
  } else if (authorization.isAuthRoute(pathname)) {
    if (!UserIsNotAuthenticated) {
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

function redirectToNotFound(url: URL): NextResponse {
  url.pathname = "/not-found";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/search", "/auth/login", "/auth/register", "/admin/dashboard"],
  // matcher: [],
};
