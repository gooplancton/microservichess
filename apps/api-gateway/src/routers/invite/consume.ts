import { z } from "zod";
import { publicProcedure, possiblyCreateGuest, emitter } from "../../trpc";
import { inviteServiceClient } from "../../grpc-clients";

const inviteLinkConsumedSchema = z.strictObject({
  inviterId: z.string(),
  joinerId: z.string(),
  gameId: z.string(),
});
type InviteLinkConsumedInfo = z.infer<typeof inviteLinkConsumedSchema>;

const inputSchema = z.strictObject({
  inviterId: z.string(),
});

export const consume = publicProcedure
  .use(possiblyCreateGuest)
  .input(inputSchema)
  .mutation(async ({ ctx, input }) => {
    const res = await inviteServiceClient.consumeInviteLink({
      userId: ctx.userId,
      inviterId: input.inviterId,
    });
    const inviteLinkComsumedInfo: InviteLinkConsumedInfo = {
      gameId: res.gameId,
      inviterId: input.inviterId,
      joinerId: ctx.userId,
    };
    emitter.emit("invite-consumed", inviteLinkComsumedInfo);

    return { gameId: res.gameId, jwt: ctx.jwt };
  });
