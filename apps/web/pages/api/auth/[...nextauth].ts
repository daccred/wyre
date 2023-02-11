import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { nextAuthOptions } from "./auth";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // https://next-auth.js.org/providers/google
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: "admin@tecmie.com",
      server: env.AUTH_EMAIL_SERVER,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(nextAuthOptions);
