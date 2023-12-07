import { z } from "zod" 
import { v4 as uuidv4 } from "uuid"

export const moveSchema = z.strictObject({
	createdAt: z.date().default(new Date()),
	move: z.string()
})

export type IMove = z.infer<typeof moveSchema>

enum PlayAs {
	WHITE = 0,
	BLACK,
	RANDOM
}

export const gameSettingsSchema = z.strictObject({
	playAs: z.nativeEnum(PlayAs).default(PlayAs.RANDOM),
	maxTimeForPlayerSec: z.number().default(Infinity),
	timeGainedOnMoveSec: z.number().default(0),
})

export type IGameSettings = z.infer<typeof gameSettingsSchema>

export const gameSchema = z.strictObject({
	_id: z.string().default(uuidv4),
	whitePlayerId: z.string(),
	blackPlayerId: z.string(),
	createdAt: z.date().default(new Date()),
	settings: gameSettingsSchema,
	moves: z.array(moveSchema).default([]),
	hasFinished: z.boolean().default(false),
})

export type IGame = z.infer<typeof gameSchema>
