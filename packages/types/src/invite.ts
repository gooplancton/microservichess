import z from "zod";

const inviteLinkSchema = z.object({
    playerId: z.string(),
    createdAt: z.date().default(new Date()),
    maxTimeForPlayerSec: z.number().default(Infinity),
	timeGainedOnMoveSec: z.number().default(0),
    expiresInSeconds: z.number().default(Infinity)
})

export type IInviteLink = z.infer<typeof inviteLinkSchema>