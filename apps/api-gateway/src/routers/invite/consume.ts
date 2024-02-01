import { z } from "zod";
import { publicProcedure, possiblyCreateGuest, emitter } from "../../trpc";
import { handleGrpcCallError, inviteServiceClient } from "../../grpc-clients";

const inviteLinkConsumedSchema = z.strictObject({
  inviteLinkId: z.string(),
  inviterId: z.string(),
  joinerId: z.string(),
  gameId: z.string(),
});
export type InviteLinkConsumedInfo = z.infer<typeof inviteLinkConsumedSchema>;

const inputSchema = z.strictObject({
  inviteLinkId: z.string(),
});

export const consume = publicProcedure
  .use(possiblyCreateGuest)
  .input(inputSchema)
  .mutation(async ({ ctx, input }) => {
    const res = await inviteServiceClient.consumeInviteLink({
      userId: ctx.userId,
      inviteLinkId: input.inviteLinkId
    }).catch(handleGrpcCallError);

    const inviteLinkComsumedInfo: InviteLinkConsumedInfo = {
      gameId: res.gameId,
      inviterId: res.inviterId,
      inviteLinkId: input.inviteLinkId,
      joinerId: ctx.userId,
    };

    emitter.emit("invite-consumed", inviteLinkComsumedInfo);

    return { gameId: res.gameId, jwt: ctx.jwt };
  });
