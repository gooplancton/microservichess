import { z } from "zod"
import { authenticatedProcedure, router } from "../trpc"
import { possiblyCreateGuest, publicProcedure } from "../trpc";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import { GrpcUserClient } from "../grpc-clients";

function createUserJWT(userId: string, isGuest: boolean): string {
	return jwt.sign({ sub: userId, isGuest }, JWT_SECRET)
}

const userLoginInputSchema = z.strictObject({
	email: z.string().email(),
	password: z.string()
})

const loginUser = publicProcedure
	.input(userLoginInputSchema)
	.mutation(({ input }) => new Promise<string>((resolve, reject) => {
		GrpcUserClient.instance.userLogin(input, (error, res) => {
			if (error) reject(error)
			resolve(createUserJWT(res.userId, false))
		})
	}))

const loginGuest = publicProcedure
	.use(possiblyCreateGuest)
	.mutation(({ ctx }) => createUserJWT(ctx.userId, true))

const signupUserInputSchema = userLoginInputSchema.extend({
	username: z.string()
})

const signupUser = publicProcedure
	.input(signupUserInputSchema)
	.mutation(({ input }) => new Promise<string>((resolve, reject) => {
		GrpcUserClient.instance.userSignup(input, (error, res) => {
			if (error) reject(error)
			resolve(createUserJWT(res.userId, false))
		})
	}))

const getCurrentUser = authenticatedProcedure
	.query(({ ctx }) => new Promise((resolve, reject) => {
		GrpcUserClient.instance.getUser({ userId: ctx.userId }, (error, res) => {
			if (error) reject(error)
			resolve(createUserJWT(res.userId, false))
		})
	}))

export const userRouter = router({
	loginUser,
	loginGuest,
	signupUser,
	getCurrentUser
})
