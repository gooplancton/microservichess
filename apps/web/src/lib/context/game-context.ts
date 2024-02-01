import { create } from "zustand";

type GameState = {
  side: "white" | "black";
  isWhiteTurn: boolean;
  moves: string[];
  fen: string;
};

type GameContext = GameState & {
  setInitialState: (state: GameState) => void;
  addMove: (move: string, newFen: string) => void;
};

export const useGameContext = create<GameContext>((set, get) => ({
  side: "white" as const,
  isWhiteTurn: true,
  moves: [],
  fen: "",
  setInitialState: (state) => set(state),
  addMove: (move, newFen) =>
    set({
      isWhiteTurn: get().isWhiteTurn!,
      moves: [...get().moves, move],
      fen: newFen,
    }),
}));
