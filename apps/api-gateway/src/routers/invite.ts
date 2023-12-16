import { z } from "zod"
import { gameSettingsSchema } from "types"
import { authenticatedProcedure, possiblyCreateGuest, publicProcedure, router } from "../trpc";
import { GrpcInviteClient } from "../grpc-clients";
import { EventEmitter } from "events"
import { observable } from "@trpc/server/observable";

const emitter = new EventEmitter()

const inviteLinkConsumedSchema = z.strictObject({
	inviterId: z.string(),
	joinerId: z.string(),
	gameId: z.string()
})
type InviteLinkConsumedInfo = z.infer<typeof inviteLinkConsumedSchema>

const create = authenticatedProcedure
	.input(gameSettingsSchema.partial())
	.mutation(({ ctx, input: settings }) => GrpcInviteClient.instance.createInviteLink({ userId: ctx.userId, settings }))

const consume = publicProcedure
	.use(possiblyCreateGuest)
	.input(z.string())
	.mutation(async ({ ctx, input: inviterId }) => {
		const res = await GrpcInviteClient.instance.consumeInviteLink({ userId: ctx.userId, inviterId })
		const inviteLinkComsumedInfo: InviteLinkConsumedInfo = { gameId: res.gameId, inviterId, joinerId: ctx.userId }
		emitter.emit("invite-consumed", inviteLinkComsumedInfo)

		return res
	})

const wait = authenticatedProcedure
	.subscription(({ ctx }) => {
		return observable<InviteLinkConsumedInfo>((emit) => {
			const onInviteLinkConsumed = (info: InviteLinkConsumedInfo) => {
				if (info.inviterId === ctx.userId) emit.next(info)
			}

			emitter.on('invite-consumed', onInviteLinkConsumed)

			return () =>  emitter.off('invite-consumed', onInviteLinkConsumed)
		})
	})


export const inviteRouter = router({
	create,
	consume,
	wait
})
