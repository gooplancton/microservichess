import { z } from "zod";
import { gameServiceClient, handleGrpcCallError } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const acceptDraw = authenticatedProcedure
  .input(z.string())
  .mutation(({ input: gameId, ctx }) =>
    gameServiceClient.acceptDraw({ gameId, playerId: ctx.userId }).catch(handleGrpcCallError),
  );
