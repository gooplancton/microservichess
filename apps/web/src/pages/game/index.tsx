import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function GamePage() {
	const navigate = useNavigate()
    const [params] = useSearchParams()

	return <>
		<h1>{params.get("gameId")}</h1>
	</>
}
