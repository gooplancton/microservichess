import React, { useCallback, useEffect, useState } from "react";
import { useGame } from "../../lib/hooks/use-game";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Text,
  Paper,
  Flex,
  List,
  Pill,
  Space,
  Modal,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Chessboard } from "../../components/Chessboard";
import { Timer } from "../../components/Timer";
import { useGameContext } from "../../lib";

// TODO: not really pretty
function getGameOverMessage(outcome: number) {
  switch (outcome) {
    case 0: return "White Wins"
    case 1: return "Black Wins"
    case 2: return "Draw"
    default: ""
  }
}

export function GamePage() {
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const gameId = params.get("gameId")!;
  const { game, timers, forfeit, draw, makeMove, isConnected } = useGame(gameId);
  const shouldRenderMoveList = useMediaQuery("(min-width: 49em)");

  if (!isConnected) return <></>;

  return (
    <>
      <Modal title="Game Over" opened={game.gameState?.outcome !== 3} onClose={() => navigate("/")}>
        <Text><b>{getGameOverMessage(game.gameState!.outcome)}</b></Text>
        <Text>Close this window to return to the homepage</Text>
      </Modal>
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
          forfeitFn={forfeit}
          drawFn={draw}
          drawRequester={game.gameState?.drawAskedBy}
        />
      </Flex>
    </>
  );
}
