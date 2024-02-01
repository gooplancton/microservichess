import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { gameSettingsSchema } from "./game";
import { inviteProtos } from "protobufs";

const playAsSchema = z.nativeEnum(inviteProtos.PlayAs);

export const inviteLinkSchema = z.object({
  _id: z.string().default(uuidv4),
  createdAt: z.number().default(Date.now),
  inviterId: z.string(),
  gameSettings: gameSettingsSchema,
  playAs: playAsSchema.default(inviteProtos.PlayAs.RANDOM),
});
export type IInviteLink = z.infer<typeof inviteLinkSchema>;
