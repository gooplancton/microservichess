import React, { useEffect, useState } from "react";
import { Paper, Text } from "@mantine/core";

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
    <Paper py={"20px"}>
      <Text ta="center" size="lg" fw={500}>
        {props.username}
      </Text>
      <Text ta="center" size="lg" fw={500}>
        {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
      </Text>
    </Paper>
  );
}
