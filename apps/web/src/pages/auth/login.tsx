import React, { useCallback, useState } from "react"
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
} from '@mantine/core'
import { trpc } from "../../trpc"
import { useDisclosure } from '@mantine/hooks';
import { useCookies } from "react-cookie"
import { notifications } from '@mantine/notifications'
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../user-context";

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [_, setCookie, __] = useCookies(["microservichess-user-jwt"])
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false)
  const navigate = useNavigate()
  const userContext = useUserContext()

  const loginUserMutation = trpc.user.loginUser.useMutation()
  const loginGuestMutation = trpc.user.loginGuest.useMutation()
  const getCurrentUserQuery = trpc.user.getCurrentUser.useQuery(undefined, { enabled: false })

  const loginWithEmailAndPassword = useCallback(async () => {
    try {
      startLoading()
      const authToken = await loginUserMutation.mutateAsync({ email, password })
      setCookie("microservichess-user-jwt", authToken, { path: "/" })
      await getCurrentUserQuery.refetch()
      if (!getCurrentUserQuery.data) throw new Error()

      userContext.setUser({ ...getCurrentUserQuery.data, _id: getCurrentUserQuery.data.userId })
      navigate("/home")
    } catch (e) {
      notifications.show({
        autoClose: 2000,
        title: "Wrong Credentials",
        message: 'Please double check your credentials and try again',
        color: 'red',
        style: {
          width: 500,
        }
      })
    } finally {
      stopLoading()
    }
  }, [email, password])

  const loginAsGuest = useCallback(async () => {
    const authToken = await loginGuestMutation.mutateAsync()
    setCookie("microservichess-user-jwt", authToken, { path: "/" })
    await getCurrentUserQuery.refetch()
    if (!getCurrentUserQuery.data) throw new Error()

    userContext.setUser({ ...getCurrentUserQuery.data, _id: getCurrentUserQuery.data.userId })
    navigate("/home")
  }, [])

  return (
    <Container size={420} my={40} pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title ta="center" className="title">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?<br />
        <Anchor size="sm" component="button" onClick={() => navigate("/auth/signup")}>
          Create one
        </Anchor>
        {' or '}
        <Anchor size="sm" component="button" onClick={loginAsGuest}>
          Continue as Guest
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="bobby.fisher@microservichess.com" disabled={loading} required onChange={(e) => setEmail(e.currentTarget.value)} />
        <PasswordInput label="Password" placeholder="Your password" disabled={loading} required mt="md" onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button fullWidth mt="xl" disabled={!email || !password || loading} onClick={loginWithEmailAndPassword}>
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
