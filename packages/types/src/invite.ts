import { z } from "zod";
import { gameSettingsSchema } from "./game";

export const inviteLinkSchema = z.object({
    playerId: z.string(),
    createdAt: z.date().default(new Date()),
    settings: gameSettingsSchema
})

export type IInviteLink = z.infer<typeof inviteLinkSchema>
export type InviteLinkInput = z.input<typeof inviteLinkSchema>
