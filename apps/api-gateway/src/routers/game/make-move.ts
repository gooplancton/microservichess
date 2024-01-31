import { z } from "zod"
import { gameServiceClient } from "../../grpc-clients"
import { authenticatedProcedure, emitter } from "../../trpc"

const inputSchema = z.strictObject({
	gameId: z.string(),
	move: z.string()
})

export const makeMove = authenticatedProcedure
	.input(inputSchema)
	.mutation(async ({ ctx, input }) => {
		const res = await gameServiceClient.makeMove({ playerId: ctx.userId, ...input })

		emitter.emit("move", res)
		return res
	})

