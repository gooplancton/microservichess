import { gameSettingsSchema, playAsSchema } from "types";
import { handleGrpcCallError, inviteServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";
import z from "zod";

const inputSchema = z.object({
  gameSettings: gameSettingsSchema,
  playAs: playAsSchema,
  ttlSeconds: z.number().min(0).optional()
});

export const create = authenticatedProcedure
  .input(inputSchema)
  .mutation(({ ctx, input }) =>
    inviteServiceClient
      .createInviteLink({ userId: ctx.userId, ...input })
      .catch(handleGrpcCallError),
  );
