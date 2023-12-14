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
	.mutation(({ input }) => GrpcUserClient.instance.userLogin(input))

const loginGuest = publicProcedure
	.use(possiblyCreateGuest)
	.mutation(({ ctx }) => createUserJWT(ctx.userId, true))

const signupUserInputSchema = userLoginInputSchema.extend({
	username: z.string()
})

const signupUser = publicProcedure
	.input(signupUserInputSchema)
	.mutation(({ input }) => GrpcUserClient.instance.userSignup(input))

const getCurrentUser = authenticatedProcedure
	.query(({ ctx }) => GrpcUserClient.instance.getUser({ userId: ctx.userId }))

export const userRouter = router({
	loginUser,
	loginGuest,
	signupUser,
	getCurrentUser
})
