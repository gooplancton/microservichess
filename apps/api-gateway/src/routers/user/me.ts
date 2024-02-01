import { handleGrpcCallError, userServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const me = authenticatedProcedure.query(({ ctx }) =>
  userServiceClient.getUserInfo({ userId: ctx.userId }).catch(handleGrpcCallError),
);
