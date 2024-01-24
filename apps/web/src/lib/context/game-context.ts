import { create } from 'zustand'
import { INITIAL_FEN } from "../../constants"

type GameContext = {
    side: "white" | "black"
    setSide: (side: "white" | "black") => void
    fen: string
    setFen: (fen: string) => void
}

export const useGameContext = create<GameContext>((set) => ({
    side: "white",
    setSide: (side) => set({ side }),
    fen: INITIAL_FEN,
    setFen: (fen) => set({ fen })
}))

