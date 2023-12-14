import { z } from "zod"
import { observable } from '@trpc/server/observable';
import { authenticatedProcedure, registeredUserProcedure, router } from "../trpc";
import type { MoveValidatedMessage } from "protobufs/dist/game_svc";
import { EventEmitter } from "events"
import { GrpcGameClient } from "../grpc-clients";

const emitter = new EventEmitter()

const joinGameInputSchema = z.strictObject({
	gameId: z.string()
})

const join = authenticatedProcedure
	.input(joinGameInputSchema)
	.subscription(({ input }) => {
		return observable<MoveValidatedMessage>((emit) => {
			const onMoveValidated = (msg: MoveValidatedMessage) => {
				if (msg.gameId === input.gameId) emit.next(msg)
			}

			emitter.on('move', onMoveValidated)

			return () => emitter.off('move', onMoveValidated)
		})
	})

const submitMoveInputSchema = z.strictObject({
	gameId: z.string(),
	move: z.string()
})

const makeMove = authenticatedProcedure
	.input(submitMoveInputSchema)
	.mutation(({ ctx, input }) => GrpcGameClient.instance.makeMove({ playerId: ctx.userId, ...input }))

const list = registeredUserProcedure
	.query(({ ctx }) => GrpcGameClient.instance.getGames({ playerId: ctx.userId }))

export const gameRouter = router({
	join,
	makeMove,
	list
})
