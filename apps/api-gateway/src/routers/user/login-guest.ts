import {
  publicProcedure,
  possiblyCreateGuest,
  signUserJWT,
} from "../../trpc";

export const loginGuest = publicProcedure
  .use(possiblyCreateGuest)
  .mutation(({ ctx }) => signUserJWT(ctx.userId, true));
