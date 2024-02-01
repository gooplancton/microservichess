import { z } from "zod";
import { gameServiceClient, handleGrpcCallError } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const askDraw = authenticatedProcedure
  .input(inputSchema)
  .mutation(({ input, ctx }) =>
    gameServiceClient
      .askDraw({
        gameId: input.gameId,
        playerId: ctx.userId,
      })
      .catch(handleGrpcCallError),
  );
