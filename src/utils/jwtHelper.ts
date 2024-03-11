import { encode, decode, type JWT } from "next-auth/jwt";
import { env } from "~/env";
import { type User } from "@prisma/client";

export type AuthUser = Omit<User, "Password">

export const tokenOneDay = 24 * 60 * 60;
export const tokenOneWeek = tokenOneDay * 7 

const createJWT = (token:JWT, duration: number) => encode({token, secret: env.JWT_SECRET, maxAge: duration})

export const jwtHelper = {
  createAccessToken: (token:JWT) => createJWT(token, tokenOneDay),
  createRefreshToken: (token:JWT) => createJWT(token, tokenOneWeek),
  verifyToken: (token:string) => decode({token, secret: env.JWT_SECRET})
}
