import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { gameProtos } from "protobufs";

export const INITIAL_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const moveSchema = z.strictObject({
  createdAt: z.number().default(Date.now),
  san: z.string(),
});

export type IMove = z.infer<typeof moveSchema>;

export const gameSettingsSchema = z.strictObject({
  time: z.number().min(0).optional(),
  increment: z.number().min(0).default(0),
});

const gameOutcomeSchema = z.nativeEnum(gameProtos.GameOutcome);
export type GameOutcome = z.infer<typeof gameOutcomeSchema>

export const gameStateSchema = z.object({
  fen: z.string().default(INITIAL_FEN),
  moves: z.array(moveSchema).default([]),
  outcome: gameOutcomeSchema.default(gameProtos.GameOutcome.KEEP_PLAYING),
  timeLeftWhite: z.number().optional(),
  timeLeftBlack: z.number().optional(),
  drawAskedBy: z.string().optional(),
});

export type IGameState = z.infer<typeof gameStateSchema>;
export const gameSchema = z.object({
  _id: z.string().default(uuidv4),
  createdAt: z.number().default(Date.now),
  whitePlayerId: z.string(),
  whitePlayerUsername: z.string().optional(),
  blackPlayerId: z.string(),
  blackPlayerUsername: z.string().optional(),
  settings: gameSettingsSchema,
  state: gameStateSchema,
  updatedAt: z.number().default(Date.now),
});
export type IGame = z.infer<typeof gameSchema>;
