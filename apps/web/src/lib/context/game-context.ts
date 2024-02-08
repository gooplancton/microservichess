import type { GameOutcome } from "types"
import { getUserId } from "../utils/get-user-id"
import { create } from "zustand";

type Side = "white" | "black"

type GameInfo = {
  whitePlayerId: string
  whitePlayerUsername?: string
  blackPlayerId: string
  blackPlayerUsername?: string
  time: number
  increment: number
}

type GameState = {
  fen: string
  outcome: GameOutcome,
  timeLeftWhite: number
  timeLeftBlack: number
  moveSans: string[]
}

type GameContext = {

  side: Side
  gameInfo?: GameInfo
  gameState?: GameState
  updatedAt: number

  initGame: (gameInfo: GameInfo, initialState: GameState, updatedAt: number) => void
  updateState: (updatedFen: string, updatedOutcome: GameOutcome, newSan: string, updatedTimeLeft: number, updatedAt: number) => void
  optimisticallyUpdateState: (updatedFen: string) => void
  getTurn: () => Side,
  getTimeLeft: (side: Side) => number
};

export const useGameContext = create<GameContext>((set, get) => ({
  side: "white" as const,
  updatedAt: Math.floor(Date.now() / 1000),

  initGame: (gameInfo: GameInfo, initialState: GameState, updatedAt: number) => {
    const userId = getUserId()
    if (!userId) return

    const side = userId === gameInfo.whitePlayerId ? "white" : "black"
    set({ gameInfo, side, gameState: initialState, updatedAt })
  },

  updateState: (updatedFen: string, updatedOutcome: GameOutcome, newSan: string, updatedTimeLeft: number, updatedAt: number) => {
    const updatedState = { ...get().gameState }
    updatedState.fen = updatedFen
    updatedState.outcome = updatedOutcome
    updatedState.moveSans?.push(newSan)

    const sideToMove = updatedFen.split(" ")[1] as "b" | "w"
    if (sideToMove === "b") updatedState.timeLeftWhite = updatedTimeLeft
    else updatedState.timeLeftBlack = updatedTimeLeft

    set({ gameState: updatedState as GameState, updatedAt })
  },

  optimisticallyUpdateState: (updatedFen: string) => {
    const { gameState, side, updatedAt } = get()
    const updatedState = { ...gameState }
    const now = Math.floor(Date.now() / 1000)
    const elapsedTime = now - updatedAt

    updatedState.fen = updatedFen
    const increment = get().gameInfo!.increment

    if (side === "white") updatedState.timeLeftWhite! -= elapsedTime + increment
    else updatedState.timeLeftBlack! -= elapsedTime + increment

    set({ gameState: updatedState as GameState, updatedAt: now })
  },
  
  getTurn: () => {
    const { gameState } = get()
    const firstLetter = gameState!.fen.split(" ")[1]
    return firstLetter === "w" ? "white" : "black"
  },

  getTimeLeft: (side: Side) => {
    const now = Math.floor(Date.now() / 1000)
    const { gameState, updatedAt, getTurn } = get()
    const isGameRunning = gameState?.outcome === 3 && gameState.moveSans.length > 0
    const elapsedSeconds = isGameRunning ? now - updatedAt : 0
    const isPlayerToMove = side === getTurn()

    let initialTime = side === "white" ? gameState!.timeLeftWhite : gameState!.timeLeftBlack

    let timeLeft: number = initialTime
    if (isPlayerToMove) timeLeft = initialTime - elapsedSeconds
    timeLeft = Math.max(timeLeft, 0)

    return timeLeft
  }
}));
