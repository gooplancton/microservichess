import React from "react"
import { Container } from "@mantine/core"
import { useUserContext } from "../../user-context"

export function HomePage() {
	const userContext = useUserContext()

	return (
		<Container size={420} my={40} pos="relative">
			{ userContext.user?._id }
		</Container>
	)
}

