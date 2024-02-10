import React from "react";
import { ColorSwatch, Flex, Paper, Space, Text } from "@mantine/core";

interface Props {
  time: number
  running: boolean
  username?: string
}

function formatTime(time: number) {
  if (time === Infinity) return "∞"

  const minutes = Math.floor(time / 60)
  const seconds = String(time % 60).padStart(2, "0")
  return `${minutes}:${seconds}`
}

export function Timer(props: Props) {
  return (
    <Paper w={300} shadow="md" withBorder my={15}>
      <Flex direction={"column"} py={10}>
        <Flex direction={"row"} justify={"center"} align={"center"}>
          {props.running && <ColorSwatch color="green" size={10} />}
          {props.running && <Space w={10} />}
          <Text ta="center" size="md" fw={500}>
            {props.username ?? "Guest"}
          </Text>
        </Flex>
        <Text ta="center" size="xl" fw={800}>
          {formatTime(props.time)}
        </Text>
      </Flex>
    </Paper>
  );
}
