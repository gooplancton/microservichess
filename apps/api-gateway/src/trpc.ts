import { TRPCError, initTRPC } from "@trpc/server"
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import { GrpcUserClient } from "./grpc-clients";

type Context = {
	userId?: string
	isGuest?: boolean
}

function getClaimsFromAuthHeader(authHeader: string): jwt.JwtPayload {
	if (!authHeader.startsWith("Bearer ")) throw new TRPCError({ code: "UNAUTHORIZED" })
	const token = authHeader.split(" ")[1]!

	try {
		const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
		return claims
	} catch (e) {}

	throw new TRPCError({ code: "UNAUTHORIZED" })
}

export async function createContext({ req }: trpcExpress.CreateExpressContextOptions): Promise<Context> {
	const authHeader = req.headers.authorization
	if (!authHeader) return {}

	const claims = getClaimsFromAuthHeader(authHeader)
	const userId = claims.sub!
	const isGuest = claims.isGuest!

	return { userId, isGuest }
}

const t = initTRPC.context<Context>().create()

export const isAuthenticated = t.middleware(({ ctx, next }) => {
	if (ctx.userId) return next({ ctx: ctx as { userId: string } })

	throw new TRPCError({ code: "UNAUTHORIZED" })
})

export const isRegisteredUser = t.middleware(({ ctx, next }) => {
	if (!ctx.userId || ctx.isGuest) throw new TRPCError({ code: "UNAUTHORIZED" })

	return next({ ctx: ctx as { userId: string, isGuest: false }})
})

export const possiblyCreateGuest = t.middleware(async ({ ctx, next }) => {
	if (!ctx.userId) {
		ctx.userId = await new Promise<string>((resolve, reject) => {
			GrpcUserClient.instance.guestLogin({}, (error, res) => {
				if (error) reject(error)
				resolve(res.userId)
			})
		})

		ctx.isGuest = true
	}

	return next({ ctx: ctx as { userId: string, isGuest: boolean } })
})

export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(isAuthenticated)
export const registeredUserProcedure = t.procedure.use(isRegisteredUser)
