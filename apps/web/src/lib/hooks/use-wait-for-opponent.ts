import { useState } from "react";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../../constants";

export function useWaitForOpponent() {
  const navigate = useNavigate();

  const [isWaiting, setIsWaiting] = useState(false);

  trpc.invite.wait.useSubscription(
    { jwt: Cookies.get(AUTH_COOKIE_NAME)! },
    {
      enabled: isWaiting,
      onStarted: () => console.log("started waiting"),
      onData: (gameJoined) => navigate(`/game?gameId=${gameJoined.gameId}`),
    },
  );

  const startWaiting = () => setIsWaiting(true);
  const stopWaiting = () => setIsWaiting(false);

  return { startWaiting, isWaiting, stopWaiting };
}
