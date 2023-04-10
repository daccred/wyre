// import type { NextAuthOptions } from "next-auth";
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from '@wyrecc/db';

import { TRPCError } from '@trpc/server';

import { loginSchema } from './interfaces';
import { ServerError, verifyHash } from './utils';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: User;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    firstName?: string;
    lastName?: string;
    userType?: string;
    phone?: string;
    password?: string;
    emailVerified?: boolean;
    category?: string;
    role: string | null;
    companyId?: string;
  }

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  //  interface Account {}

  /** The OAuth profile returned from your provider */
  //  interface Profile {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
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
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'User not found.',
            });
          } else if (!user.emailVerified) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Your email is not verified',
            });
          }

          const isValidPassword = await verifyHash(password, user.password);

          if (!isValidPassword) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Your username or password is incorrect',
            });
          }
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            userType: user.type,
            emailVerified: user.emailVerified,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.jobRole,
          };
        } catch (error) {
          if (error instanceof TRPCError) {
            ServerError(error);
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
    signIn: '/login',
    newUser: '/sign-up',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == 'development',
};
