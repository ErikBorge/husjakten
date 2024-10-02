import { withAuth } from "next-auth/middleware";

// export default withAuth((req) => {
//   console.log("middleware");

//   if (!req.nextauth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   } else if (req.nextauth && req.nextUrl.pathname === "/login") {
//     const newUrl = new URL("/", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
//   return NextResponse.next();
// });

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
