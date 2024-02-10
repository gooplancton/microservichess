import type { GameOutcome } from "types";
import { getUserId } from "../utils/get-user-id";
import { create } from "zustand";

type Side = "white" | "black";

type GameInfo = {
  whitePlayerId: string;
  blackPlayerId: string;
  playerUsername?: string;
  opponentUsername?: string;
  time: number;
  increment: number;
};

type GameState = {
  fen: string;
  outcome: GameOutcome;
  timeLeftPlayer: number;
  timeLeftOpponent: number;
  moveSans: string[];
};

type GameContext = {
  gameInfo?: GameInfo;
  gameState?: GameState;
  updatedAt: number;

  initGame: (
    gameInfo: GameInfo,
    initialState: GameState,
    updatedAt: number,
  ) => void;
  updateState: (
    updatedFen: string,
    updatedOutcome: GameOutcome,
    newSan: string,
    updatedTimeLeft: number,
    updatedAt: number,
  ) => void;
  optimisticallyUpdateState: (updatedFen: string) => void;
  getSide: () => Side | undefined,
  getTurn: () => Side;
};

export const useGameContext = create<GameContext>((set, get) => ({
  updatedAt: Math.floor(Date.now() / 1000),

  initGame: (
    gameInfo: GameInfo,
    initialState: GameState,
    updatedAt: number,
  ) => {
    
    set({ gameInfo, gameState: initialState, updatedAt });
  },

  updateState: (
    updatedFen: string,
    updatedOutcome: GameOutcome,
    newSan: string,
    updatedTimeLeft: number,
    updatedAt: number,
  ) => {
    const updatedState = { ...get().gameState };
    updatedState.fen = updatedFen;
    updatedState.outcome = updatedOutcome;
    updatedState.moveSans?.push(newSan);

    const sideToMove = updatedFen.split(" ")[1] as "b" | "w";
    const hasPlayerJustMoved = !get().getSide()!.startsWith(sideToMove)
    if (hasPlayerJustMoved) updatedState.timeLeftPlayer = updatedTimeLeft;
    else updatedState.timeLeftOpponent = updatedTimeLeft;

    set({ gameState: updatedState as GameState, updatedAt });
  },

  optimisticallyUpdateState: (updatedFen: string) => {
    const { gameState, updatedAt } = get();
    const updatedState = { ...gameState };
    const now = Math.floor(Date.now() / 1000);
    const elapsedTime = now - updatedAt;

    updatedState.fen = updatedFen;
    const increment = get().gameInfo!.increment;

    updatedState.timeLeftPlayer! -= elapsedTime + increment;

    set({ gameState: updatedState as GameState, updatedAt: now });
  },

  getSide: () => {
    const { gameInfo } = get()
    const userId = getUserId();
    if (!userId || !gameInfo) return;

    const side = userId === gameInfo.whitePlayerId ? "white" : "black";
    return side
  },

  getTurn: () => {
    const { gameState } = get();
    if (!gameState) return "white"

    const isWhiteTurn = gameState!.moveSans.length % 2 === 0
    return isWhiteTurn ? "white" : "black";
  },
}));
