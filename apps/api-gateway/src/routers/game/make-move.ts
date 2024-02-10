import { z } from "zod";
import { gameServiceClient, handleGrpcCallError } from "../../grpc-clients";
import { authenticatedProcedure, emitter } from "../../trpc";

const inputSchema = z.strictObject({
  gameId: z.string(),
  san: z.string(),
});

export const makeMove = authenticatedProcedure
  .input(inputSchema)
  .mutation(async ({ ctx, input }) => {
    const msg = await gameServiceClient
      .makeMove({
        playerId: ctx.userId,
        gameId: input.gameId,
        san: input.san,
      })
      .catch(handleGrpcCallError);

    emitter.emit("update", { typ: "move", msg });
    return msg;
  });
