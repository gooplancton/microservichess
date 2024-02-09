import { handleGrpcCallError, inviteServiceClient } from "../../grpc-clients"
import { authenticatedProcedure } from "../../trpc"

export const invalidate = authenticatedProcedure
  .mutation(async ({ ctx }) => {
    const userId = ctx.userId

    await inviteServiceClient.invalidateInviteLink({ userId }).catch(handleGrpcCallError)
  })

