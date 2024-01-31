import { z } from "zod";
import { gameServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const info = authenticatedProcedure
	.input(z.string())
	.query(({ input: gameId }) => gameServiceClient.getGameState({ gameId }))
