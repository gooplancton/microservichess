import { userServiceClient } from "../../grpc-clients";
import { authenticatedProcedure } from "../../trpc";

export const me = authenticatedProcedure
	.query(({ ctx }) => userServiceClient.getUser({ userId: ctx.userId }))

