import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

export const moveSchema = z.strictObject({
	createdAt: z.date().default(new Date()),
	move: z.string()
})

export type IMove = z.infer<typeof moveSchema>
export type MoveInput = z.input<typeof moveSchema>

export enum PlayAs {
	WHITE = 0,
	BLACK,
	RANDOM
}

export enum GameOutcome {
	WHITE_WINS = 0,
	BLCK_WINS = 1,
	TIE = 2,
	KEEP_PLAYING = 3,
	UNRECOGNIZED = -1
}

export const gameSettingsSchema = z.strictObject({
	playAs: z.nativeEnum(PlayAs).default(PlayAs.RANDOM),
	maxTimeForPlayerSec: z.number().min(0).optional(),
	timeGainedOnMoveSec: z.number().min(0).optional(),
})

export type IGameSettings = z.infer<typeof gameSettingsSchema>
export type GameSettingsInput = z.input<typeof gameSettingsSchema>

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
export type GameInput = z.input<typeof gameSchema>
