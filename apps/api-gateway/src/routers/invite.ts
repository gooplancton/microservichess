import { z } from "zod"
import { gameSettingsSchema } from "types"
import { authenticatedProcedure, possiblyCreateGuest, publicProcedure, router } from "../trpc";
import { ConsumeInviteLinkMessage, CreateInviteLinkMessage } from "protobufs/dist/invite_svc";

const create = authenticatedProcedure
	.input(gameSettingsSchema.partial())
	.mutation(({ ctx, input }) => new Promise<string>((resolve, reject) => {
		const req: CreateInviteLinkMessage = { userId: ctx.userId, settings: input }
		inviteClient.createInviteLink(req, (error, _res) => {
			if (error) reject(error)
			resolve(ctx.userId)
		})
	}))

const consume = publicProcedure
	.use(possiblyCreateGuest)
	.input(z.string())
	.mutation(({ ctx, input: inviterId }) => new Promise<string>((resolve, reject) => {
		const req: ConsumeInviteLinkMessage = { userId: ctx.userId, inviterId }
		inviteClient.consumeInviteLink(req, (error, res) => {
			if (error) reject(error)
			resolve(res.gameId)
		})
	}))

export const inviteRouter = router({
	create,
	consume
})
