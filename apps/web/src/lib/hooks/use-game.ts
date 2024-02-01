import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/get-user-id";
import { useGameContext } from "../context/game-context";

export function useGame(gameId: string) {
  const userId = getUserId();
  const [isConnected, setIsConnected] = useState(false);
  const { data } = trpc.game.info.useQuery(gameId, { enabled: !isConnected });
  const navigate = useNavigate();
  const gameContext = useGameContext();

  useEffect(() => {
    if (!data || !data.state) return;

    const side = userId === data.whitePlayerId ? "white" : "black";
    gameContext.setInitialState({
      side,
      isWhiteTurn: data.state.moveSans.length % 2 === 0,
      fen: data.state.fen,
      moves: data.state.moveSans,
    });

    setIsConnected(true);
  }, [data]);

  trpc.game.join.useSubscription(
    { gameId },
    {
      enabled: isConnected,
      onData: (res) => {
        gameContext.addMove(res.san, res.updatedFen);
      },
    },
  );

  const makeMoveMutation = trpc.game.makeMove.useMutation();
  const makeMove = async (san: string) => {
    const res = await makeMoveMutation.mutateAsync({ gameId, san });
    gameContext.addMove(san, res.updatedFen);
  };

  const leave = () => {
    setIsConnected(false);
    navigate("/");
  };

  return { makeMove, leave, isConnected };
}
