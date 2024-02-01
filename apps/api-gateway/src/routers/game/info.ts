import { z } from "zod";
import { gameServiceClient, handleGrpcCallError } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const info = authenticatedProcedure
  .input(z.string())
  .query(({ input: gameId }) => gameServiceClient
    .getGameInfo({ gameId })
    .catch(handleGrpcCallError)
  );
