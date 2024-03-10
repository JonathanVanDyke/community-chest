import { type AuthUser } from "@/utils/jwtHelper";

declare module "next-auth" {
  interface User {
    userId?: string,
    name?: string,
    email?: string,
  }

  interface Session extends DefaultSession {
    user: {
      userId?: string,
      name?: string,
      email?: string,
    },
    error?: "RefreshAccessTokenError"
  }
}

interface UserAuth extends AuthUser {
  name: string,
  id: string,
  email: string,
}

declare module "next-auth/jwt" {
  interface JWT{
    user: UserAuth, 
    accessToken: string,
    refreshToken: string,
    accessTokenExpired: number,
    refreshTokenExpired: number,
    error?: "RefreshAccessTokenError"
  }
}