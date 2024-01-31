import { z } from "zod";
import { v4 as uuidv4 } from "uuid"
import { gameSettingsSchema } from "./game";
import { inviteProtos } from "protobufs";

const playAsSchema = z.nativeEnum(inviteProtos.PlayAs)

export const inviteLinkSchema = z.object({
		_id: z.string().default(uuidv4),
    inviterId: z.string(),
    createdAt: z.number().default(Date.now),
    settings: gameSettingsSchema.extend({
				playAs: playAsSchema.default(inviteProtos.PlayAs.RANDOM)
		})
})

export type IInviteLink = z.infer<typeof inviteLinkSchema>
