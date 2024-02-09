import z from "zod";
import { publicProcedure, signUserJWT } from "../../trpc";
import { handleGrpcCallError, userServiceClient } from "../../grpc-clients";

const inputSchema = z.object({
  username: z.string().optional(),
});

export const loginGuest = publicProcedure
  .input(inputSchema)
  .mutation(async ({ input }) => {
    const res = await userServiceClient
      .guestLogin({ username: input.username })
      .catch(handleGrpcCallError);

    return signUserJWT(res.userId, true);
  });
