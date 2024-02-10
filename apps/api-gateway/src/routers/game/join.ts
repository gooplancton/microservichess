import { emitter, publicProcedure, readJWTFromInput } from "../../trpc";
import type { gameProtos } from "protobufs";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

const inputSchema = z.strictObject({
  gameId: z.string(),
  jwt: z.string(),
});

type GameUpdate = {
  typ: "move"
  msg: gameProtos.GameUpdateMsg
} | {
  typ: "draw"
  msg: gameProtos.DrawResponse
}

export const join = publicProcedure
  .input(inputSchema)
  .use(readJWTFromInput)
  .subscription(({ input }) => {
    return observable<GameUpdate>((emit) => {
      const sendUpdate = (update: GameUpdate) => {
        if (update.msg.gameId === input.gameId) emit.next(update);
      };

      emitter.on("update", sendUpdate);

      return () => {
        emitter.off("update", emit.next);
      }
    });
  });
