import { authenticatedProcedure, emitter } from "../../trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

const inviteLinkConsumedSchema = z.strictObject({
  inviterId: z.string(),
  joinerId: z.string(),
  gameId: z.string(),
});
type InviteLinkConsumedInfo = z.infer<typeof inviteLinkConsumedSchema>;

export const wait = authenticatedProcedure.subscription(({ ctx }) => {
  return observable<InviteLinkConsumedInfo>((emit) => {
    const onInviteLinkConsumed = (info: InviteLinkConsumedInfo) => {
      if (info.inviterId === ctx.userId) emit.next(info);
    };

    emitter.on("invite-consumed", onInviteLinkConsumed);

    return () => emitter.off("invite-consumed", emit.next);
  });
});
