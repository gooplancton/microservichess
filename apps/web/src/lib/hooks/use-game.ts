import { useEffect, useState } from "react"
import { trpc } from "../../trpc"
import { useNavigate } from "react-router-dom"
import { getUserId } from "../utils/get-user-id"
import { useGameContext } from "../context/game-context"

export function useGame(gameId: string) {
  const userId = getUserId()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const { data } = trpc.game.info.useQuery(gameId, { enabled: !isConnected })
  const navigate = useNavigate()
  const gameContext = useGameContext()

  useEffect(() => {
    if (!data) return

    gameContext.setFen(data.fen)
    gameContext.setSide(userId === data.whitePlayerId ? "white" : "black")

    setIsConnected(true)
  }, [data])

  trpc.game.join.useSubscription({ gameId }, {
    enabled: isConnected,
    onData: (res) => {
      gameContext.setFen(res.resultingFen)
    }
  })

  const makeMoveMutation = trpc.game.makeMove.useMutation()
  const makeMove = async (move: string) => {
    const res = await makeMoveMutation.mutateAsync({ gameId, move })
    gameContext.setFen(res.resultingFen)
  }

  const leave = () => {
    setIsConnected(false)
    navigate("/")
  }

  return { makeMove, leave, isConnected }
}
