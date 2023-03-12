import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@wyre-zayroll/db";
import { loginSchema } from "./interfaces";
import { verifyHash } from "./utils";
import { TRPCError } from "@trpc/server";
import { ServicesError } from "./services";

/**
 * * Important Info
 * TODO: Extend session object to accept more user data
 **/

export const nextAuthOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),

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
      name: "Credentials",
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

          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found.",
            });
          } else if (!user.emailVerified) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Your email is not verified",
            });
          }

          // const verify = await hashString(password)

          const isValidPassword = await verifyHash(
            password,
            user.password
          );

          if (!isValidPassword) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Your username or password is incorrect",
            });
          }
          return {
            id: user.id,
            name: user.name,
            image: user.image,
            userType: user.type,
            emailVerified: user.emailVerified,
            email: user.email,
            jobRole: user.jobRole,
          };
        } catch (error) {
          if (error instanceof TRPCError) {
            ServicesError(error);
          }
          throw new Error(error as string);
        }
      },
    }),
    // add another auth this time for admin
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return { ...token, user };
      }
      return token;
    },
    session: ({ session, token }) => {
      return { ...session, ...token };
    },
  },

  session: {
    maxAge: 1 * 24 * 60 * 60, // 1 days
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};
