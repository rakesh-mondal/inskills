import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public paths that don't require authentication
const publicPaths = ["/login", "/register", "/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If token exists and trying to access login/register, redirect to appropriate dashboard
  if (token && (pathname === "/login" || pathname === "/register")) {
    try {
      // Parse the JWT-like token
      const [header, payload] = token.split(".")
      if (!header || !payload) {
        throw new Error("Invalid token format")
      }
      const userData = JSON.parse(atob(payload))
      const role = userData.role

      let redirectPath = "/"
      switch (role) {
        case "admin":
          redirectPath = "/dashboard"
          break
        case "instructor":
          redirectPath = "/dashboard/instructor"
          break
        case "student":
          redirectPath = "/student"
          break
        default:
          redirectPath = "/login"
      }

      return NextResponse.redirect(new URL(redirectPath, request.url))
    } catch (error) {
      console.error("Token parsing error:", error)
      // If token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }
  }

  // If accessing root path with token, redirect to appropriate dashboard
  if (pathname === "/" && token) {
    try {
      // Parse the JWT-like token
      const [header, payload] = token.split(".")
      if (!header || !payload) {
        throw new Error("Invalid token format")
      }
      const userData = JSON.parse(atob(payload))
      const role = userData.role

      let redirectPath = "/"
      switch (role) {
        case "admin":
          redirectPath = "/dashboard"
          break
        case "instructor":
          redirectPath = "/dashboard/instructor"
          break
        case "student":
          redirectPath = "/student"
          break
        default:
          redirectPath = "/login"
      }

      return NextResponse.redirect(new URL(redirectPath, request.url))
    } catch (error) {
      console.error("Token parsing error:", error)
      // If token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
} 