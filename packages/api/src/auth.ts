import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@wyre-zayroll/db";
import { loginSchema } from "./interfaces";
import { verifyHash } from "./utils";

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
  adapter: PrismaAdapter(prisma),

  providers: [
    // EmailProvider({
    //   from: "admin@tecmie.com",
    //   server: env.AUTH_EMAIL_SERVER,
    // }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),

    // ...add more providers here
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
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
    // add another auth this time for admin
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      console.warn(user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        // session.user.id = token.id;
        session.user.email = token.email;
        // session.user.name = token.name;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
