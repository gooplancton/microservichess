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

  const playerUsername = game.side === "white" ? game.gameInfo!.whitePlayerUsername : game.gameInfo!.blackPlayerUsername
  let playerTime = game.side === "white" ? game.gameState!.timeLeftWhite : game.gameState!.timeLeftBlack

  const opponentUsername = game.side === "white" ? game.gameInfo!.blackPlayerUsername : game.gameInfo!.whitePlayerUsername
  let opponentTime = game.side === "white" ? game.gameState!.timeLeftBlack : game.gameState!.timeLeftWhite

  const now = Math.floor(Date.now() / 1000)
  const elapsedSeconds = now - game.updatedAt
  const isPlayerTurn = game.side.startsWith(game.gameState!.fen.split(" ")[1])

  if (isPlayerTurn) playerTime -= elapsedSeconds
  else opponentTime -= elapsedSeconds

  const handleDraw = () => {
    // Implement draw logic here
  };

  return (
    <>
      <Center w={"100vw"} pt={50}>
        <Flex direction={"column"} align={"center"}>
          <Timer username={opponentUsername ?? "Guest"} initialTime={opponentTime} isPlayersTurn={!isPlayerTurn} />
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
          <Timer username={playerUsername ?? "Guest"} initialTime={playerTime} isPlayersTurn={isPlayerTurn} />
        </Flex>
      </Center>
    </>
  );
}
