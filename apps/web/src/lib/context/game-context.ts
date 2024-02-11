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
  drawAskedBy?: string;
  updatedAt: number;
};

type GameContext = Partial<GameInfo> & Partial<GameState> & {

  updateStateAfterMove: (
    updatedFen: string,
    updatedOutcome: GameOutcome,
    newSan: string,
    updatedTimeLeft: number,
    updatedAt: number,
  ) => void;
  updateDrawStatus: (drawRequesterId: string) => void;
  optimisticallyUpdateStateAfterMove: (updatedFen: string) => void;
  getSide: () => Side | undefined;
  getTurn: () => Side;
};

export const useGameContext = create<GameContext>((set, get) => ({

  updateStateAfterMove: (fen: string, outcome: GameOutcome, san: string, timeLeft: number, updatedAt: number) => {
    set((state) => {
      const moveSans = state.moveSans ? [...state.moveSans, san] : [san]
      const side = state.getSide!()!
      const sideToMove = fen.split(" ")[1] as "b" | "w";
      const hasPlayerJustMoved = !side.startsWith(sideToMove)
      let timeLeftPlayer = state.timeLeftPlayer
      let timeLeftOpponent = state.timeLeftOpponent
      if (hasPlayerJustMoved) timeLeftPlayer = timeLeft;
      else timeLeftOpponent = timeLeft;

      return { fen, outcome, moveSans, timeLeftOpponent, timeLeftPlayer, updatedAt, drawAskedBy: undefined }
    })
  },

  updateDrawStatus: (drawRequesterId: string) => {
    set((state) => {
      const isDrawPending = !!state.drawAskedBy
      if (!isDrawPending) return { drawAskedBy: drawRequesterId }
      else return { outcome: 2 }
    })
  },

  optimisticallyUpdateStateAfterMove: (fen: string) => {
    set((state) => {
      const now = Math.floor(Date.now() / 1000)
      const elapsedTime = now - state.updatedAt!
      const increment = state.increment!
      const timeLeftPlayer = state.timeLeftPlayer! - elapsedTime + increment

      return { fen, timeLeftPlayer, updatedAt: now }
    })
  },

  getSide: () => {
    const { whitePlayerId } = get()
    const userId = getUserId();
    if (!userId || !whitePlayerId) return;

    const side = userId === whitePlayerId ? "white" : "black";
    return side
  },

  getTurn: () => {
    const { moveSans } = get();
    if (!moveSans) return "white"

    const isWhiteTurn = moveSans.length % 2 === 0
    return isWhiteTurn ? "white" : "black";
  },
}));
