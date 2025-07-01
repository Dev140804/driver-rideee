// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      phone?: string | null; // ✅ allow null if phone is missing
    };
  }

  interface User {
    phone?: string | null;
  }

  interface JWT {
    accessToken?: string;
  }
}