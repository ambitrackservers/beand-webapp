import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    // Si el usuario está autenticado y quiere ir a /acceder
    if (token && req.nextUrl.pathname.startsWith("/acceder")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // permite que el middleware se ejecute siempre
    },
  },
);

export const config = {
  matcher: ["/acceder"],
};
