import { z } from "zod";
import { gameServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

const inputSchema = z.strictObject({
	gameId: z.string()
})

export const askDraw = authenticatedProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) => gameServiceClient.proposeDraw({
		gameId: input.gameId, playerId: ctx.userId
	}))

