import { z } from "zod"
import { gameSettingsSchema } from "types"
import { authenticatedProcedure, possiblyCreateGuest, publicProcedure, router } from "../trpc";
import { EventEmitter } from "events"
import { observable } from "@trpc/server/observable";
import { inviteServiceClient } from "../grpc-clients";

const emitter = new EventEmitter()

const inviteLinkConsumedSchema = z.strictObject({
	inviterId: z.string(),
	joinerId: z.string(),
	gameId: z.string()
})
type InviteLinkConsumedInfo = z.infer<typeof inviteLinkConsumedSchema>

const create = authenticatedProcedure
	.input(gameSettingsSchema.partial())
	.mutation(({ ctx, input: settings }) => inviteServiceClient.createInviteLink({ userId: ctx.userId, settings }))

const consume = publicProcedure
	.use(possiblyCreateGuest)
	.input(z.object({ inviterId: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const res = await inviteServiceClient.consumeInviteLink({ userId: ctx.userId, inviterId: input.inviterId })
		const inviteLinkComsumedInfo: InviteLinkConsumedInfo = { gameId: res.gameId, inviterId: input.inviterId, joinerId: ctx.userId }
		emitter.emit("invite-consumed", inviteLinkComsumedInfo)

		return { gameId: res.gameId, jwt: ctx.jwt }
	})

const wait = authenticatedProcedure
	.subscription(({ ctx }) => {
		return observable<InviteLinkConsumedInfo>((emit) => {
			const onInviteLinkConsumed = (info: InviteLinkConsumedInfo) => {
				if (info.inviterId === ctx.userId) emit.next(info)
			}

			emitter.on('invite-consumed', onInviteLinkConsumed)

			return () => emitter.off('invite-consumed', emit.next)
		})
	})


export const inviteRouter = router({
	create,
	consume,
	wait
})
