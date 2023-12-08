import { TRPCError, initTRPC } from "@trpc/server"
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

type Context = {
	userId?: string
}

function getUserIdFromAuthHeader(authHeader: string): string {
	if (!authHeader.startsWith("Bearer ")) throw new TRPCError({ code: "UNAUTHORIZED" })
	const token = authHeader.split(" ")[1]!

	try {
		const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
		if (claims.sub) return claims.sub
	} catch (e) {}

	throw new TRPCError({ code: "UNAUTHORIZED" })
}

export async function createContext({ req }: trpcExpress.CreateExpressContextOptions): Promise<Context> {
	const authHeader = req.headers.authorization
	if (!authHeader) return {}

	const userId = getUserIdFromAuthHeader(authHeader)
	return { userId }
}

const t = initTRPC.context<Context>().create()

export const isAuthenticated = t.middleware(({ ctx, next }) => {
	if (ctx.userId) return next({ ctx: ctx as { userId: string } })

	throw new TRPCError({ code: "UNAUTHORIZED" })
})

export const possiblyCreateGuest = t.middleware(async ({ ctx, next }) => {
	if (!ctx.userId) {
		ctx.userId = await new Promise<string>((resolve, reject) => {
			userClient.guestLogin({}, (error, res) => {
				if (error) reject(error)
				resolve(res.userId)
			})
		})
	}

	return next({ ctx: ctx as { userId: string } })
})

export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(isAuthenticated)
