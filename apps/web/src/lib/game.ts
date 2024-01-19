import { useState } from "react"
import { trpc } from "../trpc"
import { useNavigate } from "react-router-dom"

type GameState = {
  timeRemainingWhiteSec: number
  timeRemainingBlackSec: number
  fen: string
  lastUpdatedAt: number
  outcome: number
}

export function useGame(gameId: string) {
  const [gameState, setGameState] = useState<GameState>({
    timeRemainingBlackSec: 100000,
    timeRemainingWhiteSec: 100000,
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    lastUpdatedAt: Date.now(),
    outcome: 3
  })
  const navigate = useNavigate()

  const [isConnected, setIsConnected] = useState(true)

  trpc.game.join.useSubscription({ gameId }, {
    enabled: isConnected,
    onData: (res) => {
      setGameState({
        outcome: res.outcome,
        timeRemainingWhiteSec: res.timeRemainingWhiteSec,
        timeRemainingBlackSec: res.timeRemainingBlackSec,
        lastUpdatedAt: Date.now(),
        fen: res.resultingFen
      })
    }
  })

  const makeMoveMutation = trpc.game.makeMove.useMutation()
  const playMove = async (move: string) => {
    const res = await makeMoveMutation.mutateAsync({ gameId, move })
    setGameState({
      outcome: res.outcome,
      timeRemainingWhiteSec: res.timeRemainingWhiteSec,
      timeRemainingBlackSec: res.timeRemainingBlackSec,
      lastUpdatedAt: Date.now(),
      fen: res.resultingFen
    })
  }

  const leave = () => {
    setIsConnected(false)
    navigate("/")
  }

  return { gameState, playMove, leave }
}
