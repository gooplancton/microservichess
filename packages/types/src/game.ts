import { z } from "zod" 

export const moveSchema = z.strictObject({
	createdAt: z.date().default(new Date()),
	move: z.string()
})

export type IMove = z.infer<typeof moveSchema>

export const gameSchema = z.strictObject({
	_id: z.string(),
	whitePlayerId: z.string(),
	blackPlayerId: z.string(),
	createdAt: z.date().default(new Date()),
	updatedAt: z.date().default(new Date()),
	maxTimeForPlayerSec: z.number().default(Infinity),
	timeGainedOnMoveSec: z.number().default(0),
	moves: z.array(moveSchema).default([]),
	hasFinished: z.boolean().default(false),
})

export type IGame = z.infer<typeof gameSchema>
