import React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { trpc } from "../../trpc";
import Cookies from "js-cookie";

export function JoinPage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const consumeLinkMutation = trpc.invite.consume.useMutation()

    useEffect(() => {
        const inviterId = params.get("inviterId")
        if (!inviterId) return navigate("/")

        consumeLinkMutation.mutateAsync({ inviterId })
            .then(({ gameId, jwt }) => {
                if (jwt) Cookies.set("microservichess-user-jwt", jwt, { path: "/" })

                navigate("/game?gameId=" + gameId)
            })
    }, [])

    return <></>
}