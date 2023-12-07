import { IInviteLink } from "types"

export interface InviteLinkRepository {
    createInviteLink(playerId: string, expiresInSeconds: string): Promise<IInviteLink>
    consumeInviteLink(gameId: string): Promise<string | undefined>
}