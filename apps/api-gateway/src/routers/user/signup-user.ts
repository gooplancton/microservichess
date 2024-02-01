import { z } from "zod";
import { handleGrpcCallError, userServiceClient } from "../../grpc-clients";
import { publicProcedure } from "../../trpc";

const inputSchema = z.strictObject({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

export const signupUser = publicProcedure
  .input(inputSchema)
  .mutation(({ input }) => userServiceClient.userSignup(input).catch(handleGrpcCallError));
