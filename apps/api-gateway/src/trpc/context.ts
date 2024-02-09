import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import * as trpcExpress from "@trpc/server/adapters/express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export type Context = {
  userId?: string;
  isGuest?: boolean;
  jwt?: string;
};

export function signUserJWT(userId: string, isGuest: boolean): string {
  return jwt.sign({ sub: userId, isGuest }, JWT_SECRET);
}

export function constructContextFromToken(token: string): Context {
  const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  const userId = claims.sub!;
  const isGuest = claims.isGuest!;

  return { userId, isGuest };
}

export async function createContext({
  req,
}:
  | trpcExpress.CreateExpressContextOptions
  | CreateWSSContextFnOptions): Promise<Context> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return {};
  const token = authHeader.split(" ")[1]!;

  try {
    return constructContextFromToken(token);
  } catch (e) {
    return {};
  }
}
