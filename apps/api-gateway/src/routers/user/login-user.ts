import { userServiceClient } from "../../grpc-clients";
import { signUserJWT, publicProcedure } from "../../trpc";
import { z } from "zod";

const userLoginInputSchema = z.strictObject({
  email: z.string().email(),
  password: z.string(),
});

export const loginUser = publicProcedure
  .input(userLoginInputSchema)
  .mutation(({ input }) =>
    userServiceClient
      .userLogin(input)
      .then((res) => signUserJWT(res.userId, false)),
  );
