import { gameServiceClient } from "../../grpc-clients";
import { registeredUserProcedure } from "../../trpc";

export const list = registeredUserProcedure
	.query(({ ctx }) => gameServiceClient.getGames({ playerId: ctx.userId }))

