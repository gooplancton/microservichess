import React from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useSearchParams } from "react-router-dom";
import {
  Paper,
  Center,
  Button,
  Flex,
  List,
  Pill,
  Group,
  Container,
  Space,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Chessboard } from "../../components/Chessboard";
import { Timer } from "../../components/Timer";
import { trpc } from "../../trpc";

export function GamePage() {
  const [params] = useSearchParams();
  const gameId = params.get("gameId")!;
  const { game, makeMove, isConnected, leave } = useGame(gameId);
  const shouldRenderMoveList = useMediaQuery("(min-width: 49em)");
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

  if (!isConnected) return <></>;

  const handleDraw = () => {
    // Implement draw logic here
  };

  return (
    <>
      <Flex direction={"column"} align={"center"}>
        <Timer side={game.side === "white" ? "black" : "white"} />
        <Flex direction={"row"} justify={"center"} align={"center"}>
          <Paper w={"min(70vh, 90vw)"} shadow="md" withBorder>
            <Chessboard
              submitMove={makeMove}
              fen={game.gameState!.fen}
              side={game.side}
            />
          </Paper>

          {shouldRenderMoveList && (
            <>
              <Space w={30} />
              <Paper shadow="md" withBorder h={"60vh"}>
                <List
                  h={"100%"}
                  type="ordered"
                  withPadding
                  pt={20}
                  pr={20}
                  style={{ overflow: "auto" }}
                >
                  {game.gameState?.moveSans.map((moveSan, idx) => (
                    <List.Item key={idx} pb={5}>
                      <Pill size="lg">{moveSan}</Pill>
                    </List.Item>
                  ))}
                </List>
              </Paper>
            </>
          )}
        </Flex>
        <Timer side={game.side} />
      </Flex>
    </>
  );
}
