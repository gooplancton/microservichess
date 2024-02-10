import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { gameSettingsSchema } from "./game";
import { inviteProtos } from "protobufs";
import { timestampSchema } from ".";

export const playAsSchema = z.nativeEnum(inviteProtos.PlayAs);

export const inviteLinkSchema = z.object({
  inviterId: z.string().default(uuidv4),
  createdAt: timestampSchema,
  gameSettings: gameSettingsSchema,
  playAs: playAsSchema.default(inviteProtos.PlayAs.RANDOM),
  hasBeenConsumed: z.boolean().default(false)
});
export type IInviteLink = z.infer<typeof inviteLinkSchema>;
