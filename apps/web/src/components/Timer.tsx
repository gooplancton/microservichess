import React, { useEffect, useState } from "react";
import { ColorSwatch, Flex, Paper, Space, Text } from "@mantine/core";

interface Props {
  username: string;
  isPlayersTurn: boolean;
  timeLeftAtLastUpdate: number;
}

export function Timer(props: Props) {
  const [timeLeft, setTimeLeft] = useState(props.timeLeftAtLastUpdate);

  useEffect(() => {
    if (!props.isPlayersTurn) return;

    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  });

  return (

    <Paper w={300} shadow="md" withBorder my={15}>
      <Flex direction={"column"} py={10}>
        <Flex direction={"row"} justify={"center"} align={"center"}>
          { props.isPlayersTurn && <ColorSwatch color="green" size={10} /> }
          { props.isPlayersTurn && <Space w={10} /> }
          <Text ta="center" size="md" fw={500}>
            {props.username}
          </Text>
        </Flex>
        { props.timeLeftAtLastUpdate < Infinity && <Text ta="center" size="xl" fw={800}>
          {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
        </Text> }
      </Flex>
    </Paper>
  );
}
