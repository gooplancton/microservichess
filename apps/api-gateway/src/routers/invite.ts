import { z } from "zod"
import { gameSettingsSchema } from "types"
import { authenticatedProcedure, possiblyCreateGuest, publicProcedure, router } from "../trpc";
import { GrpcInviteClient } from "../grpc-clients";

const create = authenticatedProcedure
	.input(gameSettingsSchema.partial())
	.mutation(({ ctx, input: settings }) => GrpcInviteClient.instance.createInviteLink({ userId: ctx.userId, settings }))

const consume = publicProcedure
	.use(possiblyCreateGuest)
	.input(z.string())
	.mutation(({ ctx, input: inviterId }) => GrpcInviteClient.instance.consumeInviteLink({ userId: ctx.userId, inviterId }))


export const inviteRouter = router({
	create,
	consume
})
