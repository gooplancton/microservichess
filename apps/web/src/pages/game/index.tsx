import React from "react";
import { useGame } from "../../lib/hooks/use-game"
import {  useSearchParams } from "react-router-dom";
import { Paper, Center } from "@mantine/core";
import { Chessboard } from "../../components/Chessboard"

export function GamePage() {
	const [params] = useSearchParams()
	const game = useGame(params.get("gameId")!)

	return <>
		<Center w={"100vw"} pt={50}>
			<Paper w={600} shadow="lg" withBorder>
				{ game.isConnected && <Chessboard
					submitMove={game.makeMove}
				/> }
			</Paper>
		</Center>
	</>
}
