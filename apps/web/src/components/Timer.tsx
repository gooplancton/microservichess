import React from "react";
import { ActionIcon, ColorSwatch, Flex, Paper, Space, Text, Tooltip } from "@mantine/core";
import { getUserId } from "../lib/utils";

interface Props {
  time: number
  running: boolean
  username?: string
  forfeitFn?: () => void
  drawFn?: () => void
  drawRequester?: string
}

function formatTime(time: number) {
  if (time === Infinity) return "∞"

  const minutes = Math.floor(time / 60)
  const seconds = String(time % 60).padStart(2, "0")
  return `${minutes}:${seconds}`
}

export function Timer(props: Props) {
  return (
    <Paper shadow="md" withBorder my={15}>
      <Flex direction={"row"} justify={"space-around"} align={"center"}>
        {props.forfeitFn && <Tooltip label="Forfeit">
          <ActionIcon
            mx={15}
            size={"xl"}
            color="red"
            variant="light"
            onClick={props.forfeitFn}
            fz={25}
          >🏳️</ActionIcon>
        </Tooltip>}
        <Flex direction={"column"} py={10} px={30}>
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
        {props.drawFn && <Tooltip label={!props.drawRequester ? "Ask for a Draw" : "Accept Draw"}>
          <ActionIcon
            mx={15}
            size={"xl"}
            fz={25}
            onClick={props.drawFn}
            color={props.drawRequester ? "green" : "blue"}
            disabled={props.drawRequester === getUserId()}
            variant="light"
          >🤝</ActionIcon>
        </Tooltip>}
      </Flex>
    </Paper>
  );
}
