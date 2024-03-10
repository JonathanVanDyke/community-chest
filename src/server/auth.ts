/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials'

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/react";


import bcrypt from 'bcrypt';
import { type AuthUser, jwtHelper, tokenOneDay, tokenOneWeek } from "~/utils/jwtHelper";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  providers: [
    CredentialsProvider({
      id: "next-auth",
      name: "email or Sign up",
      async authorize(credentials, _): Promise<User | null> {
        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials?.email
            }
          });

          if (user?.email && user?.password && credentials) {
            const validPassword = await bcrypt.compare(credentials?.password, user.password);
          
            if (validPassword) {
              return {
                id: user.id,
                email: user.email,
              }
            }
          }

          if (!user && credentials?.email && credentials?.password) {
            const createUser: { id: string; password: string | null; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; } = await db.user.create({
              data: {
                email: credentials.email,
                password: bcrypt.hashSync(credentials.password, 10)
              }
            });

            return {
              id: createUser?.id ?? '',
              email: createUser?.email ?? ''
            }
          }
        } catch (error) {
          console.log(error)
        }

        return null
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
        }
      }
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async jwt({token, user, profile, account, isNewUser}: any){

      // credentials provider:  Save the access token and refresh token in the JWT on the initial login
      if (user){
        const authUser = {id: user.id, name: user.name, email: user.email} as AuthUser;

        const accessToken = await jwtHelper.createAccessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() / 1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() / 1000 + tokenOneWeek;

        return {
          ...token, accessToken, refreshToken, accessTokenExpired, refreshTokenExpired,
          user: authUser
        }

      } else {
        if (token){
          // In subsequent requests, check access token has expired, try to refresh it
          if (Date.now() / 1000 > token.accessTokenExpired){
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken){

              const user = await db.user.findFirst({
                where: {
                  OR: [
                    {
                      email: token.user.email,
                      name: token.user.name
                    }
                  ]
                }
              });

              if (user){
                const accessToken = await jwtHelper.createAccessToken(token.user);
                const accessTokenExpired = Date.now() /1000 + tokenOneDay;

                return {...token, accessToken, accessTokenExpired}
              } 
            }

            return {...token, error: "RefreshAccessTokenError"}
          }
        }
      }

      return token
    },

    async session({ session, token }: any){
      if (session?.user && token){
        session.user = {
          name: token?.user?.name,
          email: token?.email,
          userId: token?.user?.id
        }
      }
      session.error = token.error;
      return session;
    }
  
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
