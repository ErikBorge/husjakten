import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth"; // Import the correct User type

import Credentials from "next-auth/providers/credentials";
// import { saltAndHashPassword } from "./utils/password";
// import { ZodError } from "zod";
// import { signInSchema } from "./lib/zod";
// import { NextResponse } from "next/server";

// type User = {
//   username: string;
//   password: string | undefined;
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user: NextAuthUser | null = null;
          // const { username, password } = await signInSchema.parseAsync(
          //   credentials
          // );

          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(credentials.password);

          // logic to verify if the user exists
          // user = await getUserFromDb(credentials.email, pwHash);
          user =
            credentials.username === "abc" && credentials.password === "123"
              ? { name: credentials.username }
              : null;

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   authorized: async ({ auth, request }) => {
  //     // Matcher to skip specific routes
  //     const matcher = /\/((?!api|_next\/static|_next\/image|.*\.png$).*)/;
  //     if (matcher.test(request.nextUrl.pathname)) {
  //       return true; // Allow access without authentication
  //     }

  //     // Logged in users are authenticated, otherwise redirect to login page
  //     return !!auth;
  //   },
  // },
});
