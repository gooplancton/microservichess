import React, { FormEvent, useCallback, useState } from "react";
import {
  Text,
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Divider,
  Flex,
  NumberInput,
  SegmentedControl,
  Modal,
  CopyButton,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../trpc";
import { useForm } from "@mantine/form";
import { useWaitForOpponent } from "../../lib";

function getInviteLink(inviterId: string) {
  return `${window.location.origin}/join?inviterId=${inviterId}`;
}

export function HomePage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      time: 5,
      increment: 2,
      playAs: "random",
    },
  });

  const createInviteMutation = trpc.invite.create.useMutation();
  const consumeInviteMutation = trpc.invite.consume.useMutation();
  const [inviteLink, setInviteLink] = useState<string>("");
  const [inviteLinkToConsume, setInviteLinkToConsume] = useState<string>("");
  const { startWaiting, isWaiting, stopWaiting } = useWaitForOpponent();

  const createInviteLink = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { time, increment, playAs } = form.values;

      const { userId } = await createInviteMutation.mutateAsync({
        playAs: ["white", "black", "random"].indexOf(playAs),
        maxTimeForPlayerSec: time * 60,
        timeGainedOnMoveSec: increment,
      });

      setInviteLink(getInviteLink(userId));

      startWaiting();
    },
    [form.values],
  );

  const consumeInviteLink = useCallback(async () => {
    const inviterId = inviteLinkToConsume.split("=")[1];
    const { gameId } = await consumeInviteMutation.mutateAsync({ inviterId });
    if (gameId) navigate("/game?gameId" + gameId);
  }, [inviteLinkToConsume]);

  return (
    <Container size={420} my={40} pt={40} pos="relative">
      <Modal
        opened={isWaiting}
        onClose={stopWaiting}
        size={"xl"}
        title="Invite link created"
      >
        <Paper withBorder shadow="md" p={30} mb={30} radius="md">
          <Flex direction={"row"} align={"center"}>
            <Image radius="md" src={"/chessboard.png"} height={60} mr={20} />
            <div>
              <Text>
                Time:{" "}
                <b>
                  {form.values.time}' + {form.values.increment}"
                </b>
              </Text>
              <Text>
                Side: <b>{form.values.playAs}</b>
              </Text>
            </div>
          </Flex>
        </Paper>
        <Text>Hand this link to a friend to play with them!</Text>
        <Flex direction={"row"}>
          <TextInput
            readOnly
            value={inviteLink}
            mr={5}
            style={{ flexGrow: 1 }}
          />
          <CopyButton value={inviteLink}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? "Copied!" : "Copy url"}
              </Button>
            )}
          </CopyButton>
        </Flex>
      </Modal>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title ta="center" className="title">
          microservichess
        </Title>

        <form onSubmit={createInviteLink}>
          <Flex
            mt="xl"
            direction="row"
            gap="sm"
            justify="center"
            align="center"
          >
            <NumberInput
              label="Time"
              suffix=" minutes"
              allowNegative={false}
              allowDecimal={false}
              {...form.getInputProps("time", { type: "input" })}
            />
            <NumberInput
              label="Increment"
              suffix=" seconds"
              allowNegative={false}
              allowDecimal={false}
              {...form.getInputProps("increment", { type: "input" })}
            />
          </Flex>
          <Text size="sm" fw={500} mt="sm">
            Play as
          </Text>
          <SegmentedControl
            fullWidth
            data={[
              { value: "white", label: "White" },
              { value: "random", label: "Random" },
              { value: "black", label: "Black" },
            ]}
            {...form.getInputProps("playAs")}
          />
          <Button fullWidth my="md" type="submit">
            Create Game
          </Button>
        </form>
        <Divider my="md" label="or" />
        <TextInput
          label="Invite Link"
          mt="md"
          onChange={(e) => setInviteLinkToConsume(e.currentTarget.value)}
        />
        <Button
          fullWidth
          mt="md"
          disabled={!inviteLinkToConsume}
          onClick={consumeInviteLink}
        >
          Join Game
        </Button>
      </Paper>
    </Container>
  );
}
