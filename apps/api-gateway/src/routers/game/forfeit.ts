import { z } from "zod";
import { gameServiceClient } from "../../grpc-clients";
import { authenticatedProcedure, emitter } from "../../trpc";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const forfeit = authenticatedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }) => {
    const res = await gameServiceClient.forfeit({
      gameId: input.gameId,
      playerId: ctx.userId,
    });

    emitter.emit("move", res);
    return res;
  });
