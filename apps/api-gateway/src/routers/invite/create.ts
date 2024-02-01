import { gameSettingsSchema, playAsSchema } from "types";
import { handleGrpcCallError, inviteServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

const inputSchema = gameSettingsSchema
  .extend({
    playAs: playAsSchema,
  })
  .partial();

export const create = authenticatedProcedure
  .input(inputSchema)
  .mutation(({ ctx, input: gameSettings }) =>
    inviteServiceClient
      .createInviteLink({ userId: ctx.userId, gameSettings })
      .catch(handleGrpcCallError),
  );
