import { z } from "zod"
import { observable } from '@trpc/server/observable';
import { authenticatedProcedure, registeredUserProcedure, router } from "../trpc";
import type { MoveValidatedMessage } from "protobufs/dist/game_svc";
import { EventEmitter } from "events"
import { gameServiceClient } from "../grpc-clients";

// TODO: handle grpc service errors as user errors

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

			return () => emitter.off('move', emit.next)
		})
	})

const submitMoveInputSchema = z.strictObject({
	gameId: z.string(),
	move: z.string()
})

const makeMove = authenticatedProcedure
	.input(submitMoveInputSchema)
	.mutation(async ({ ctx, input }) => {
		const res = await gameServiceClient.makeMove({ playerId: ctx.userId, ...input })

		emitter.emit("move", res)
		return res
	})

const list = registeredUserProcedure
	.query(({ ctx }) => gameServiceClient.getGames({ playerId: ctx.userId }))

const info = authenticatedProcedure
	.input(z.string())
	.query(({ input: gameId }) => gameServiceClient.getGameState({ gameId }))

const proposeDraw = authenticatedProcedure
	.input(z.string())
	.mutation(({ input: gameId, ctx }) => gameServiceClient.proposeDraw({ gameId, playerId: ctx.userId }))

const acceptDraw = authenticatedProcedure
	.input(z.string())
	.mutation(({ input: gameId, ctx }) => gameServiceClient.acceptDraw({ gameId, playerId: ctx.userId }))

const forfeit = authenticatedProcedure
	.input(z.string())
	.mutation(({ input: gameId, ctx }) => gameServiceClient.makeMove({ gameId, playerId: ctx.userId, move: "[FORFEIT]" }))

export const gameRouter = router({
	join,
	makeMove,
	list,
	info,
	proposeDraw,
	acceptDraw,
	forfeit
})

