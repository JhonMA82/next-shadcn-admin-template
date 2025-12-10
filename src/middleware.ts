import { NextResponse, type NextRequest } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import type { Session } from "@/server/auth";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => pathName.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathName);

  // Obtener sesión via API
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: process.env.BETTER_AUTH_URL,
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  // Ruta protegida sin sesión → redirigir a login
  if (isProtectedRoute && !session) {
    const callbackUrl = encodeURIComponent(pathName);
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url));
  }

  // Ruta de auth con sesión → redirigir a dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard/default", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
