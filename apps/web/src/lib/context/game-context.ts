import type { GameOutcome } from "types"
import { getUserId } from "../utils/get-user-id"
import { create } from "zustand";

type GameInfo = {
  whitePlayerId: string
  whitePlayerUsername?: string
  blackPlayerId: string
  blackPlayerUsername?: string
  time?: number
  increment: number
}

type GameState = {
  fen: string
  outcome: GameOutcome,
  timeLeftWhite?: number
  timeLeftBlack?: number
  moveSans: string[]
  updatedAt: number
}

type GameContext = {

  side: "black" | "white"
  gameInfo?: GameInfo
  gameState?: GameState

  initGame: (gameInfo: GameInfo, initialState: GameState) => void
  updateState: (updatedFen: string, updatedOutcome: GameOutcome, newSan: string, updatedTimeLeft?: number) => void
};

export const useGameContext = create<GameContext>((set, get) => ({
  side: "white" as const,

  initGame: (gameInfo, initialState) => {
    const userId = getUserId()
    if (!userId) return

    const side = userId === gameInfo.whitePlayerId ? "white" : "black"
    set({ gameInfo, side, gameState: initialState })
  },

  updateState: (updatedFen: string, updatedOutcome: GameOutcome, newSan: string, updatedTimeLeft?: number) => {
    const updatedState = { ...get().gameState }
    updatedState.fen = updatedFen
    updatedState.outcome = updatedOutcome
    updatedState.moveSans?.push(newSan)
    updatedState.updatedAt = Date.now() // TODO: fix

    const sideToMove = updatedFen.split(" ")[1] as "b" | "w"
    if (sideToMove === "b") updatedState.timeLeftWhite = updatedTimeLeft
    else updatedState.timeLeftBlack = updatedTimeLeft

    set({ gameState: updatedState as GameState })
  }
}));
