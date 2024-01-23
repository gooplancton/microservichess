import { z } from "zod";
import { gameSettingsSchema } from "./game";

export const inviteLinkSchema = z.object({
    playerId: z.string(),
    createdAt: z.number().default(Date.now),
    settings: gameSettingsSchema
})

export type IInviteLink = z.infer<typeof inviteLinkSchema>
export type InviteLinkInput = z.input<typeof inviteLinkSchema>
