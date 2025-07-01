import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // You can log or store profile info like name, email, etc.
      console.log("Driver Profile", profile);
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
};
