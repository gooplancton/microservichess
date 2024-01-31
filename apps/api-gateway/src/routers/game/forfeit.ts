import { z } from "zod";
import { gameServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

const inputSchema = z.strictObject({
	gameId: z.string()
})

export const forfeit = authenticatedProcedure
	.input(inputSchema)
	.mutation(({ input, ctx }) => gameServiceClient.makeMove({
		gameId: input.gameId, playerId: ctx.userId, move: "[FORFEIT]"
	}))

