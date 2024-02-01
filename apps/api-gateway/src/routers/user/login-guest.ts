import {
  publicProcedure,
  possiblyCreateGuest,
  createUserJWT,
} from "../../trpc";

export const loginGuest = publicProcedure
  .use(possiblyCreateGuest)
  .mutation(({ ctx }) => createUserJWT(ctx.userId, true));
