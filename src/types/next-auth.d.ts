import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      createdAt: string;
    };
  }

  interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    createdAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name: string;
      username: string;
      email: string;
      createdAt: string;
    };
  }
}
