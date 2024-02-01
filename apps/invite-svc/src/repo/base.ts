import type { gameProtos, inviteProtos } from "protobufs"
import { IInviteLink } from "types"

export interface InviteLinkRepository {
    getInviteLink(inviteLinkId: string): Promise<IInviteLink | null>
    createInviteLink(userId: string, settings: gameProtos.GameSettingsMsg, playAs?: inviteProtos.PlayAs): Promise<IInviteLink>
    deleteInviteLink(inviteLinkId: string): Promise<IInviteLink | null>
}
