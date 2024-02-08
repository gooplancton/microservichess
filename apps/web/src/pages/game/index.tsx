import React from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useSearchParams } from "react-router-dom";
import { Paper, Center, Button, Flex, List, Pill } from "@mantine/core";
import { Chessboard } from "../../components/Chessboard";
import { Timer } from "../../components/Timer";
import { trpc } from "../../trpc";

export function GamePage() {
  const [params] = useSearchParams();
  const gameId = params.get("gameId")!;
  const { game, makeMove, isConnected, leave } = useGame(gameId);
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

  if (!isConnected) return <></>

  const handleDraw = () => {
    // Implement draw logic here
  };

  return (
    <>
      <Center w={"100vw"} pt={50}>
        <Flex direction={"column"} align={"center"}>
          <Timer side={game.side === "white" ? "black" : "white"} />
          <Paper w={800} shadow="md" withBorder>
            <Flex>
              <div style={{ width: "80%" }}>
                <Chessboard submitMove={makeMove} fen={game.gameState!.fen} side={game.side} />
              </div>
              <div style={{ width: "20%", padding: "2rem", height: 600, overflow: "auto" }}>
                <List type="ordered">
                  {game.gameState?.moveSans.map((moveSan, idx) => <List.Item key={idx} pb={5}>
                    <Pill size="lg">{moveSan}</Pill>
                  </List.Item>)}
                </List>
              </div>
            </Flex>
          </Paper>
          <Timer side={game.side} />
        </Flex>
      </Center>
    </>
  );
}
