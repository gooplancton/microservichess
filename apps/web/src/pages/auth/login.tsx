import React, { useCallback, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  LoadingOverlay,
  Dialog,
  Group,
  Modal,
} from "@mantine/core";
import { trpc } from "../../trpc";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../../constants";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opened, setOpened] = useState(false);
  const [guestUsername, setGuestUsername] = useState<string | undefined>(
    undefined,
  );
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);
  const navigate = useNavigate();

  const loginUserMutation = trpc.user.loginUser.useMutation();
  const loginGuestMutation = trpc.user.loginGuest.useMutation();

  const loginWithEmailAndPassword = useCallback(async () => {
    try {
      startLoading();
      const authToken = await loginUserMutation.mutateAsync({
        email,
        password,
      });
      Cookies.set(AUTH_COOKIE_NAME, authToken, { path: "/" });

      navigate("/");
    } catch (e) {
      notifications.show({
        autoClose: 2000,
        title: "Wrong Credentials",
        message: "Please double check your credentials and try again",
        color: "red",
        style: {
          width: 500,
        },
      });
    } finally {
      stopLoading();
    }
  }, [email, password]);

  const guestLogin = useCallback(async () => {
    const authToken = await loginGuestMutation.mutateAsync({
      username: guestUsername || undefined,
    });
    Cookies.set(AUTH_COOKIE_NAME, authToken, { path: "/" });

    setOpened(false);
    navigate("/");
  }, [guestUsername]);

  return (
    <>
      <Modal
        opened={opened}
        withCloseButton
        onClose={guestLogin}
        size="lg"
        radius="md"
        title="(Optional) Pick a Username"
      >
        <Group align="flex-end">
          <TextInput
            placeholder="microservichamp"
            onChange={(e) => setGuestUsername(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button onClick={guestLogin}>Continue</Button>
        </Group>
      </Modal>

      <Container size={420} my={40} pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Title ta="center" className="title">
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?
          <br />
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/auth/signup")}
          >
            Create one
          </Anchor>
          {" or "}
          <Anchor size="sm" component="button" onClick={() => setOpened(true)}>
            Continue as Guest
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="bobby.fisher@microservichess.com"
            disabled={loading}
            required
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            disabled={loading}
            required
            mt="md"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            fullWidth
            mt="xl"
            disabled={!email || !password || loading}
            onClick={loginWithEmailAndPassword}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
