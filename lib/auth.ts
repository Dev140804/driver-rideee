// lib/auth.ts

import GoogleProvider from "next-auth/providers/google";
import { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // You can add filtering logic here if needed
      return true;
    },

    async jwt({ token, account }) {
      // Save the Google access token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      // Fetch phone number using Google People API
      try {
        const res = await fetch(
          "https://people.googleapis.com/v1/people/me?personFields=phoneNumbers",
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );

        const data = await res.json();
        const phone = data?.phoneNumbers?.[0]?.value ?? null;

        if (session.user && phone) {
          (session.user as any).phone = phone; // Workaround if no type extension
        }
      } catch (error) {
        console.error("❌ Failed to fetch phone number from People API:", error);
      }

      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/welcome`; // 👈 After login, redirect to welcome screen
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};