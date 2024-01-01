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

export function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPw, setRepeatedPw] = useState("")
  const [_, setCookie, __] = useCookies(["microservichess-user-jwt"])
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false)
  const navigate = useNavigate()

  const signupUserMutation = trpc.user.signupUser.useMutation()

  const signupWithEmailAndPassword = useCallback(async () => {
    try {
      startLoading()
      const authToken = await signupUserMutation.mutateAsync({ email, username, password })
      setCookie("microservichess-user-jwt", authToken)
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

  return (
    <Container size={420} my={40} pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title ta="center" className="title">
        Welcome to microservichess!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{'  '}
        <Anchor size="sm" component="button" onClick={() => navigate("/auth/login")}>
          Sign In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="bobbyfish" disabled={loading} required onChange={(e) => setUsername(e.currentTarget.value)} />
        <TextInput label="Email" placeholder="bobby.fisher@microservichess.com" disabled={loading} mt="md" required onChange={(e) => setEmail(e.currentTarget.value)} />
        <PasswordInput label="Password" placeholder="Your password" disabled={loading} required mt="md" onChange={(e) => setPassword(e.currentTarget.value)} />
        <PasswordInput
          label="Repeat Password" placeholder="Repeat password" disabled={loading} required mt="md" onChange={(e) => setRepeatedPw(e.currentTarget.value)}
          error={repeatedPw !== password}
        />
        <Button fullWidth mt="xl" disabled={!email || !password || !username || (repeatedPw !== password) || loading} onClick={signupWithEmailAndPassword}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  )
}
