import { useState } from "react";
import { trpc } from "../trpc";
import { useNavigate } from "react-router-dom";

export function useWaitForOpponent() {
  const navigate = useNavigate()

  const [isWaiting, setIsWaiting] = useState(false)

  trpc.invite.wait.useSubscription(
    undefined,
    {
      enabled: isWaiting,
      onData: (gameJoined) => navigate(`/game?gameId=${gameJoined.gameId}`)
    }
  )

  const startWaiting = () => setIsWaiting(true)
  const stopWaiting = () => setIsWaiting(false)

  return { startWaiting, isWaiting, stopWaiting }
}
