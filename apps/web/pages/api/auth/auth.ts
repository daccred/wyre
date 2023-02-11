import { ISODateString, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@wyre-zayroll/db";
import { loginSchema } from "../../../../../packages/api/src/interfaces";
import { verifyHash } from "../../../../../packages/api/src/utils";

// interface MainSession {
//     user: {
//         name: string | null;
//         email: string | null;
//         image: string | null;
//         userId: string | null;
//     };
//     expires: ISODateString;
// }

// export interface Session extends MainSession {
// }

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: { email },
          });

          if (!result) return null;

          const isValidPassword = await verifyHash(
            result.password as string,
            password
          );

          if (!isValidPassword) return null;

          return { id: result.id, email: result.email };
        } catch {
          return null;
        }
      },
    }),
    // add another auth this time for admin
    Credentials({
      name: "admin",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma.admin.findFirst({
            where: { email },
          });

          if (!result) return null;
          const isValidPassword = await verifyHash(
            result.password as string,
            password
          );

          if (!isValidPassword) return null;

          return { id: result.id, email: result.email };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        (session as any).user.userId = token.userId;
        (session as any).user.email = token.email;
        (session as any).user.username = token.username;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  secret: "super-secret",
};
