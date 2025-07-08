import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authenticateUser } from "./authenticator";
import type { JWT } from "next-auth/jwt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validateCredentials = schema.safeParse(credentials);

        if (!validateCredentials.success) {
          return null; // Return null if validation fails
        }

        const { email, password } = validateCredentials.data;

        const user = await authenticateUser({ email, password });

        if (!user) return null;

        // Convert number id to string for NextAuth compatibility
        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      const user = token.user as NonNullable<JWT["user"]>;
      if (token.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.username = user.username;
        session.user.email = user.email;
        session.user.createdAt = user.createdAt;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name || "",
          username: user.username || user.email || "",
          email: user.email || "",
          createdAt: user.createdAt || new Date().toISOString(),
        };
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
