import { authenticatedProcedure, emitter } from "../../trpc";
import type { MoveValidatedMessage } from "protobufs/dist/game_svc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const join = authenticatedProcedure
  .input(inputSchema)
  .subscription(({ input }) => {
    return observable<MoveValidatedMessage>((emit) => {
      const onMoveValidated = (msg: MoveValidatedMessage) => {
        if (msg.gameId === input.gameId) emit.next(msg);
      };

      emitter.on("move", onMoveValidated);

      return () => emitter.off("move", emit.next);
    });
  });
