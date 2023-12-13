import { z } from "zod"
import { observable } from '@trpc/server/observable';
import { authenticatedProcedure, registeredUserProcedure, router } from "../trpc";
import type { GameRecordsMessage_GameRecordMessage, MakeMoveMessage, MoveValidatedMessage } from "protobufs/dist/game_svc";
import { EventEmitter } from "events"

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
	.mutation(({ ctx, input }) => new Promise<void>((resolve, reject) => {
		const req: MakeMoveMessage = { playerId: ctx.userId, ...input }
		gameClient.makeMove(req, (error, res) => {
			if (error) reject(error)
			emitter.emit('move', res)
			resolve()
		})
	}))

const list = registeredUserProcedure
	.query(({ ctx }) => new Promise<GameRecordsMessage_GameRecordMessage[]>((resolve, reject) => {
		gameClient.getGames({ playerId: ctx.userId }, (error, res) => {
			if (error) reject(error)
			resolve(res.games)
		})
	}))

export const gameRouter = router({
	join,
	makeMove,
	list
})
