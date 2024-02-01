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
  const game = useGame(gameId);
  const forfeitMutation = trpc.game.forfeit.useMutation();
  const proposeDrawMutation = trpc.game.proposeDraw.useMutation();
  const acceptDrawMuation = trpc.game.acceptDraw.useMutation();

  const handleForfeit = async () => {
    try {
      await forfeitMutation.mutateAsync(gameId);
      game.leave();
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
              {game.isConnected && <Chessboard submitMove={game.makeMove} />}
            </div>
            <div style={{ width: "28%", padding: "20px" }}>
              <Timer
                username={""}
                isPlayersTurn={false}
                timeLeftAtLastUpdate={100}
              />
              <Timer
                username={""}
                isPlayersTurn={true}
                timeLeftAtLastUpdate={100}
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
