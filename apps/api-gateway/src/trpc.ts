import { TRPCError, initTRPC } from "@trpc/server"
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import cookie from "cookie"
import { userServiceClient } from "./grpc-clients";

type Context = {
	userId?: string
	isGuest?: boolean
	jwt?: string
}

export function createUserJWT(userId: string, isGuest: boolean): string {
	return jwt.sign({ sub: userId, isGuest }, JWT_SECRET)
}

export async function createContext({ req }: trpcExpress.CreateExpressContextOptions | CreateWSSContextFnOptions): Promise<Context> {
	let token: string

	const authHeader = req.headers.authorization
	const cookieHeader = req.headers.cookie

	if (authHeader) {
		if (!authHeader.startsWith("Bearer ")) throw new TRPCError({ code: "BAD_REQUEST" })
		token = authHeader.split(" ")[1]!
	} else if (cookieHeader) {
		const parsedToken = cookie.parse(cookieHeader)["microservichess-user-jwt"]
		if (parsedToken) token = parsedToken
		else return {}
	} else {
		return {}
	}

	try {
		const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
		const userId = claims.sub!
		const isGuest = claims.isGuest!

		return { userId, isGuest }
	} catch (e) {
		return {}
	}
}

const t = initTRPC.context<Context>().create()

export const isAuthenticated = t.middleware(({ ctx, next }) => {
	if (ctx.userId) return next({ ctx: ctx as { userId: string } })

	throw new TRPCError({ code: "UNAUTHORIZED" })
})

export const isRegisteredUser = t.middleware(({ ctx, next }) => {
	if (!ctx.userId || ctx.isGuest) throw new TRPCError({ code: "UNAUTHORIZED" })

	return next({ ctx: ctx as { userId: string, isGuest: false } })
})

export const possiblyCreateGuest = t.middleware(async ({ ctx, next }) => {
	if (!ctx.userId) {
		const guest = await userServiceClient.guestLogin({})
		ctx.userId = guest.userId

		ctx.isGuest = true
		ctx.jwt = createUserJWT(ctx.userId, true)
	}

	return next({ ctx: ctx as { userId: string, isGuest: boolean } })
})

export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(isAuthenticated)
export const registeredUserProcedure = t.procedure.use(isRegisteredUser)
