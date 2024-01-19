import React from "react";
import { useGame } from "../../lib/game"
import {  useSearchParams } from "react-router-dom";
import { Paper, Center } from "@mantine/core";
import { Chessboard } from "react-chessboard"

export function GamePage() {
	const [params] = useSearchParams()
	const game = useGame(params.get("gameId")!)

	return <>
		<Center w={"100vw"} pt={50}>
			<Paper w={600} shadow="lg" withBorder>
				<Chessboard position={game.gameState.fen} onPieceDrop={(from, to, piece) => {
					const pieceFormatted = piece.toString().startsWith("w")
						? piece.toString().at(1)?.toLowerCase()
						: piece.toString().at(1)?.toUpperCase()

					const move = `${pieceFormatted}${from}${to}`
					game.playMove(move)

					return true
				}} />
			</Paper>
		</Center>
	</>
}
