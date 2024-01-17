import { z } from "zod"
import { authenticatedProcedure, createUserJWT, router, possiblyCreateGuest, publicProcedure } from "../trpc"
import { GrpcUserClient } from "../grpc-clients";

const userLoginInputSchema = z.strictObject({
	email: z.string().email(),
	password: z.string()
})

const loginUser = publicProcedure
	.input(userLoginInputSchema)
	.mutation(({ input }) => GrpcUserClient.instance.userLogin(input).then((res) => createUserJWT(res.userId, false)))

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
