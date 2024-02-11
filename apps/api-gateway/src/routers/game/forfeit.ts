import { z } from "zod";
import { gameServiceClient } from "../../grpc-clients";
import { authenticatedProcedure, emitter } from "../../trpc";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const forfeit = authenticatedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }) => {
    const msg = await gameServiceClient.forfeit({
      gameId: input.gameId,
      playerId: ctx.userId,
    });

    emitter.emit("update", { typ: "move", msg });
    return msg;
  });
