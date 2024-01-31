import { gameSettingsSchema } from "types"
import { inviteServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const create = authenticatedProcedure
	.input(gameSettingsSchema.partial())
	.mutation(({ ctx, input: settings }) => inviteServiceClient.createInviteLink({ userId: ctx.userId, settings }))

