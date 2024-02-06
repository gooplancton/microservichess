import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { trpc } from "../../trpc";
import { AUTH_COOKIE_NAME } from "../../constants"

export function usePossiblyConsumeInviteLink() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const consumeLinkMutation = trpc.invite.consume.useMutation();

  useEffect(() => {
    const inviteLinkId = params.get("invite");
    if (!inviteLinkId) return;

    consumeLinkMutation
      .mutateAsync({ inviteLinkId })
      .then(({ gameId, jwt }) => {
        if (jwt) Cookies.set(AUTH_COOKIE_NAME, jwt, { path: "/" });

        navigate("/game?gameId=" + gameId);
      });
  }, []);
}
