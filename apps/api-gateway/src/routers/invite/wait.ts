import { emitter, publicProcedure, readJWTFromInput } from "../../trpc";
import { observable } from "@trpc/server/observable";
import { InviteLinkConsumedInfo } from "./consume";
import z from "zod";

const inputSchema = z.object({
  jwt: z.string(),
});

export const wait = publicProcedure
  .input(inputSchema)
  .use(readJWTFromInput)
  .subscription(({ ctx }) => {
    return observable<InviteLinkConsumedInfo>((emit) => {
      const onInviteLinkConsumed = (info: InviteLinkConsumedInfo) => {
        if (info.inviterId === ctx.userId) emit.next(info);
      };

      emitter.on("invite-consumed", onInviteLinkConsumed);

      return () => emitter.off("invite-consumed", emit.next);
    });
  });
