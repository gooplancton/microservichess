import { authenticatedProcedure, emitter } from "../../trpc";
import type { gameProtos } from "protobufs";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

const inputSchema = z.strictObject({
  gameId: z.string(),
});

export const join = authenticatedProcedure
  .input(inputSchema)
  .subscription(({ input }) => {
    return observable<gameProtos.GameUpdateMsg>((emit) => {
      const onMoveValidated = (msg: gameProtos.GameUpdateMsg) => {
        if (msg.gameId === input.gameId) emit.next(msg);
      };

      emitter.on("move", onMoveValidated);

      return () => emitter.off("move", emit.next);
    });
  });
