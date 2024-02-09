import {
  experimental_standaloneMiddleware,
  initTRPC,
  TRPCError,
} from "@trpc/server";
import { constructContextFromToken, Context, signUserJWT } from "./context";
import { userServiceClient } from "../grpc-clients";
import { EventEmitter } from "events";

const t = initTRPC.context<Context>().create();
export const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (ctx.userId) return next({ ctx: ctx as { userId: string } });

  throw new TRPCError({ code: "UNAUTHORIZED" });
});

export const isRegisteredUser = t.middleware(({ ctx, next }) => {
  if (!ctx.userId || ctx.isGuest) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({ ctx: ctx as { userId: string; isGuest: false } });
});

export const possiblyCreateGuest = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    const guest = await userServiceClient.guestLogin({});
    ctx.userId = guest.userId;

    ctx.isGuest = true;
    ctx.jwt = signUserJWT(ctx.userId, true);
  }

  return next({ ctx: ctx as { userId: string; isGuest: boolean } });
});

/**
 * This middleware is needed because tRPC doesn't fully support passing authentication
 * headers to protocol switch requests needed for clients to subscribe to procedures.
 * Instead of messing around with cookies, we can just pass the jwt in the input.
 */
export const readJWTFromInput = experimental_standaloneMiddleware<{
  input: { jwt: string };
}>().create(({ input, next }) => {
  try {
    const token = input.jwt;
    const ctx = constructContextFromToken(token);
    return next({ ctx });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
export const emitter = new EventEmitter();
