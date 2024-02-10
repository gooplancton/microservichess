import { z } from "zod";
import { gameServiceClient, handleGrpcCallError } from "../../grpc-clients";
import { authenticatedProcedure, emitter } from "../../trpc";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const draw = authenticatedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }) => {

    const msg = await gameServiceClient.draw({
      gameId: input.gameId,
      playerId: ctx.userId,
    }).catch(handleGrpcCallError)

    emitter.emit("update", { typ: "draw", msg })
    return msg
  });
