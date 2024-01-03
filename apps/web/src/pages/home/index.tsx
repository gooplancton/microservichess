import React, { FormEvent, useCallback, useState } from "react"
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
	Box,
} from '@mantine/core'
import { useNavigate } from "react-router-dom";
import { trpc } from "../../trpc";
import { useForm } from '@mantine/form';

export function HomePage() {
	const navigate = useNavigate()
	const form = useForm({
		initialValues: {
			time: 5,
			increment: 2,
			playAs: "random"
		}
	})

	const createInviteMutation = trpc.invite.create.useMutation()
	const consumeInviteMutation = trpc.invite.consume.useMutation()
	const [inviteLink, setInviteLink] = useState<string>("")

	const createInviteLink = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		const { time, increment, playAs } = form.values

		const link = await createInviteMutation.mutateAsync({
			playAs: ["white", "black", "random"].indexOf(playAs),
			maxTimeForPlayerSec: time * 60,
			timeGainedOnMoveSec: increment
		})

		alert(JSON.stringify(link))
	}, [form.values])

	const consumeInviteLink = useCallback(() => {
		consumeInviteMutation.mutate(inviteLink)
	}, [inviteLink])

	return (
		<Container size={420} my={40} pt={40} pos="relative">
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<Title ta="center" className="title">
					microservichess
				</Title>

				<form onSubmit={createInviteLink} >
					<Flex
						mt="xl"
						direction="row"
						gap="sm"
						justify="center"
						align="center"
					>
						<NumberInput label="Time" suffix=" minutes" allowNegative={false} allowDecimal={false} {...form.getInputProps('time', { type: "input" })} />
						<NumberInput label="Increment" suffix=' seconds' allowNegative={false} allowDecimal={false} {...form.getInputProps('increment', { type: "input" })} />
					</Flex>
					<Text size="sm" fw={500} mt="sm">
						Play as
					</Text>
					<SegmentedControl
						fullWidth
						data={[
							{ value: 'white', label: 'White' },
							{ value: 'random', label: 'Random' },
							{ value: 'black', label: 'Black' },
						]}
						{...form.getInputProps('playAs')}
					/>
					<Button fullWidth my="md" type="submit">
						Create Game
					</Button>
				</form>
				<Divider my="md" label="or" />
				<TextInput label="Invite Link" mt="md" onChange={(e) => setInviteLink(e.currentTarget.value)} />
				<Button fullWidth mt="md" disabled={!inviteLink}>
					Join Game
				</Button>
			</Paper>
		</Container>
	)
}
