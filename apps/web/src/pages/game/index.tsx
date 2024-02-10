import React from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useSearchParams } from "react-router-dom";
import {
  Paper,
  Flex,
  List,
  Pill,
  Space,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Chessboard } from "../../components/Chessboard";
import { Timer } from "../../components/Timer";

export function GamePage() {
  const [params] = useSearchParams();
  const gameId = params.get("gameId")!;
  const { game, timers, makeMove, isConnected } = useGame(gameId);
  const shouldRenderMoveList = useMediaQuery("(min-width: 49em)");

  if (!isConnected) return <></>;

  return (
    <>
      <Flex direction={"column"} align={"center"}>
        <Timer 
          time={timers.opponentTime}
          running={timers.currentTimer === "opponent"}
          username={game.gameInfo?.opponentUsername}
        />
        <Flex direction={"row"} justify={"center"} align={"center"}>
          <Paper w={"min(70vh, 90vw)"} shadow="md" withBorder>
            <Chessboard
              submitMove={makeMove}
              fen={game.gameState!.fen}
              side={game.getSide()!}
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
         <Timer 
          time={timers.playerTime}
          running={timers.currentTimer === "player"}
          username={game.gameInfo?.playerUsername}
        />
      </Flex>
    </>
  );
}
