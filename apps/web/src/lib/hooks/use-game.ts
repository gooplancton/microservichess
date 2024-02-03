import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/game-context";

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
      time: data.settings?.time,
      increment: data.settings?.increment ?? 0
    }, {
      fen: data.state.fen,
      outcome: data.state.outcome,
      moveSans: data.state.moveSans,
      updatedAt: Date.now() // TODO: correct
    });

    setIsConnected(true);
  }, [data]);

  trpc.game.join.useSubscription(
    { gameId },
    {
      enabled: isConnected,
      onData: (res) => {
        game.updateState(
          res.updatedFen,
          res.updatedOutcome,
          res.san,
          res.updatedTimeLeft
        )
      },
    },
  );

  const makeMoveMutation = trpc.game.makeMove.useMutation();
  const makeMove = async (san: string) => {
    const res = await makeMoveMutation.mutateAsync({ gameId, san });
    game.updateState(
      res.updatedFen,
      res.updatedOutcome,
      res.san,
      res.updatedTimeLeft
    )
  };

  const leave = () => {
    setIsConnected(false);
    navigate("/");
  };

  return { makeMove, leave, isConnected, game };
}
