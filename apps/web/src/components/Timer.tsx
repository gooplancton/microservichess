import React, { useEffect, useState } from "react";
import { ColorSwatch, Flex, Paper, Space, Text } from "@mantine/core";
import { useGameContext } from "../lib";

interface Props {
  side: "white" | "black";
}

export function Timer(props: Props) {
  const { gameInfo, getTimeLeft, getTurn } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(props.side));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft(props.side));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const username =
    props.side === "white"
      ? gameInfo?.whitePlayerUsername
      : gameInfo?.blackPlayerUsername;
  const isPlayerToMove = props.side === getTurn();

  return (
    <Paper w={300} shadow="md" withBorder my={15}>
      <Flex direction={"column"} py={10}>
        <Flex direction={"row"} justify={"center"} align={"center"}>
          {isPlayerToMove && <ColorSwatch color="green" size={10} />}
          {isPlayerToMove && <Space w={10} />}
          <Text ta="center" size="md" fw={500}>
            {username ?? "Guest"}
          </Text>
        </Flex>
        <Text ta="center" size="xl" fw={800}>
          {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(
            2,
            "0",
          )}`}
        </Text>
      </Flex>
    </Paper>
  );
}
