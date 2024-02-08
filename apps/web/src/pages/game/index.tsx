import React from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useSearchParams } from "react-router-dom";
import { Paper, Center, Button, Flex, List, Pill, Group, Container } from "@mantine/core";
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
      <Flex direction={"column"} align={"center"}>
        <Timer side={game.side === "white" ? "black" : "white"} />
        <Paper w={{ lg: "70vh", base: "80vw" }} shadow="md" withBorder>
          <Flex direction={{ lg: "row", base: "column" }} >
            <List type="ordered" h={{ base: "10vh", lg: undefined }} withPadding pt={20} pr={20}>
              {game.gameState?.moveSans.map((moveSan, idx) => <List.Item key={idx} pb={5}>
                <Pill size="lg">{moveSan}</Pill>
              </List.Item>)}
            </List>
            <Chessboard submitMove={makeMove} fen={game.gameState!.fen} side={game.side} />
          </Flex>
        </Paper>
        <Timer side={game.side} />
      </Flex>
    </>
  );
}
