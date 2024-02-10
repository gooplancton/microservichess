import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/game-context";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../../constants";
import { getUserId } from "../utils";
import { useChessTimers } from "./use-chess-timers";

export function useGame(gameId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const { data } = trpc.game.info.useQuery(gameId, { enabled: !isConnected });
  const navigate = useNavigate();
  const game = useGameContext();
  const userId = getUserId();
  const timers = useChessTimers();

  useEffect(() => {
    if (!data || !data.state) return;

    const now = Math.floor(Date.now() / 1000)
    const isWhitePlayer = data.whitePlayerId === userId
    const timeLeftPlayer = (isWhitePlayer ? data.state.timeLeftWhite : data.state.timeLeftBlack) ?? Infinity
    const timeLeftOpponent = (isWhitePlayer ? data.state.timeLeftBlack : data.state.timeLeftWhite) ?? Infinity

    game.initGame(
      {
        whitePlayerId: data.whitePlayerId,
        whitePlayerUsername: data.whitePlayerUsername,
        blackPlayerId: data.blackPlayerId,
        blackPlayerUsername: data.blackPlayerUsername,
        time: data.settings?.time ?? Infinity,
        increment: data.settings?.increment ?? 0,
      },
      {
        fen: data.state.fen,
        outcome: data.state.outcome,
        moveSans: data.state.moveSans,
        timeLeftPlayer: timeLeftPlayer,
        timeLeftOpponent: timeLeftOpponent,
      },
      data.updatedAt,
    );

    const hasGameStarted = data.state.moveSans.length > 0
    const elapsedSeconds = hasGameStarted ? now - data.updatedAt : 0
    const isPlayerTurn = game.getTurn() === game.getSide()

    timers.setCurrentTimer(isPlayerTurn ? "player" : "opponent")
    timers.setPlayerTime(timeLeftPlayer - (isPlayerTurn ? elapsedSeconds : 0))
    timers.setOpponentTime(timeLeftOpponent - (isPlayerTurn ? 0 : elapsedSeconds))
    timers.setIsActive(hasGameStarted)
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
          res.updatedAt,
        );

        const isPlayerTurn = game.getTurn() === game.getSide()
        if (!isPlayerTurn) {
          timers.setPlayerTime(res.updatedTimeLeft ?? Infinity)
          timers.setCurrentTimer("opponent")
        } else {
          timers.setOpponentTime(res.updatedTimeLeft ?? Infinity)
          timers.setCurrentTimer("player")
        }

        timers.setIsActive(true)
      },
    },
  );

  const makeMoveMutation = trpc.game.makeMove.useMutation();
  const makeMove = async (san: string) => {
    timers.setIsActive(false)
    await makeMoveMutation.mutateAsync({ gameId, san });
  };

  const leave = () => {
    setIsConnected(false);
    navigate("/");
  };

  return { makeMove, leave, isConnected, game, timers };
}
