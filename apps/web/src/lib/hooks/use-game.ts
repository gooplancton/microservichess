import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/game-context";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../../constants"

export function useGame(gameId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const { data } = trpc.game.info.useQuery(gameId, { enabled: !isConnected });
  const navigate = useNavigate();
  const game = useGameContext();

  useEffect(() => {
    if (!data || !data.state) return;

    game.initGame({
      whitePlayerId: data.whitePlayerId,
      whitePlayerUsername: data.whitePlayerUsername,
      blackPlayerId: data.blackPlayerId,
      blackPlayerUsername: data.blackPlayerUsername,
      time: data.settings?.time ?? Infinity,
      increment: data.settings?.increment ?? 0
    }, {
      fen: data.state.fen,
      outcome: data.state.outcome,
      moveSans: data.state.moveSans,
      timeLeftWhite: data.state.timeLeftWhite ?? Infinity,
      timeLeftBlack: data.state.timeLeftBlack ?? Infinity,
    }, data.updatedAt);

    setIsConnected(true);
  }, [data]);

  trpc.game.join.useSubscription(
    { gameId, jwt: Cookies.get(AUTH_COOKIE_NAME)! },
    {
      enabled: isConnected,
      onData: (res) => {
        game.updateState(
          res.updatedFen,
          res.updatedOutcome,
          res.san,
          res.updatedTimeLeft ?? Infinity,
          res.updatedAt
        )
      },
    },
  );

  const makeMoveMutation = trpc.game.makeMove.useMutation();
  const makeMove = async (san: string) => {
    const res = await makeMoveMutation.mutateAsync({ gameId, san });
    // game.updateState(
    //   res.updatedFen,
    //   res.updatedOutcome,
    //   res.san,
    //   res.updatedTimeLeft
    // )
  };

  const leave = () => {
    setIsConnected(false);
    navigate("/");
  };

  return { makeMove, leave, isConnected, game };
}
