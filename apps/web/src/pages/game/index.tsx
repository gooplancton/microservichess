import React from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useSearchParams } from "react-router-dom";
import { Paper, Center, Button } from "@mantine/core";
import { Chessboard } from "../../components/Chessboard";
import { Timer } from "../../components/Timer";
import { trpc } from "../../trpc";

export function GamePage() {
  const [params] = useSearchParams();
  const gameId = params.get("gameId")!;
  const { makeMove, isConnected, leave, game } = useGame(gameId);
  const forfeitMutation = trpc.game.forfeit.useMutation();
  const askDrawMutation = trpc.game.askDraw.useMutation();
  const acceptDrawMuation = trpc.game.acceptDraw.useMutation();

  const handleForfeit = async () => {
    try {
      await forfeitMutation.mutateAsync({ gameId });
      leave();
    } catch {
      alert("could not forfeit game");
    }
  };

  const handleDraw = () => {
    // Implement draw logic here
  };

  return (
    <>
      <Center w={"100vw"} pt={50}>
        <Paper w={900} shadow="lg" withBorder>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "70%" }}>
              {isConnected && <Chessboard submitMove={makeMove} />}
            </div>
            <div style={{ width: "28%", padding: "20px" }}>
              <Timer
                username={"[WHITE] " + game.gameInfo?.whitePlayerUsername}
                isPlayersTurn={game.gameState?.fen.split(" ")[1] === "w"}
                timeLeftAtLastUpdate={game.gameState?.timeLeftWhite}
              />
              <ul>
                {game.gameState?.moveSans.map(moveSan => <li>{moveSan}</li>)}
              </ul>
              <Timer
                username={"[BLACK] " + game.gameInfo?.blackPlayerUsername}
                isPlayersTurn={game.gameState?.fen.split(" ")[1] === "b"}
                timeLeftAtLastUpdate={game.gameState?.timeLeftBlack}
              />
              <Button onClick={handleForfeit} fullWidth>
                Forfeit
              </Button>
              <Button onClick={handleDraw} fullWidth>
                Offer Draw
              </Button>
            </div>
          </div>
        </Paper>
      </Center>
    </>
  );
}
