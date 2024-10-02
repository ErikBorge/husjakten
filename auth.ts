import { User as NextAuthUser, AuthOptions, getServerSession } from "next-auth"; // Import the correct User type
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
          const { username, password } = credentials as {
            username: string;
            password: string;
          };
          if (!username || !password) return null;

          if (!process.env.AUTH_USERNAME || !process.env.AUTH_PASSWORD) {
            return null;
          }
          user =
            username === process.env.AUTH_USERNAME &&
            password === process.env.AUTH_PASSWORD
              ? { name: username, id: "123" }
              : null;

          if (!user) return null;

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
};

export const getSession = () => getServerSession(authOptions);
