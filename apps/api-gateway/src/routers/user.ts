import { z } from "zod"
import { router } from "../trpc"
import { possiblyCreateGuest, publicProcedure } from "../trpc";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

function createUserJWT(userId: string): string {
	return jwt.sign({ sub: userId }, JWT_SECRET)
}

const userLoginInputSchema = z.strictObject({
	email: z.string().email(),
	password: z.string()
})

const loginUser = publicProcedure
	.input(userLoginInputSchema)
	.mutation(({ input }) => new Promise<string>((resolve, reject) => {
		userClient.userLogin(input, (error, res) => {
			if (error) reject(error)
			resolve(createUserJWT(res.userId))
		})
	}))

const loginGuest = publicProcedure
	.use(possiblyCreateGuest)
	.mutation(({ ctx }) => createUserJWT(ctx.userId))

const signupUserInputSchema = userLoginInputSchema.extend({
	username: z.string()
})

const signupUser = publicProcedure
	.input(signupUserInputSchema)
	.mutation(({ input }) => new Promise<string>((resolve, reject) => {
		userClient.userSignup(input, (error, res) => {
			if (error) reject(error)
			resolve(createUserJWT(res.userId))
		})
	}))

export const userRouter = router({
	loginUser,
	loginGuest,
	signupUser
})
