import { IGameSettings, IInviteLink } from "types"

export interface InviteLinkRepository {
    createInviteLink(userId: string, settings: IGameSettings): Promise<IInviteLink>
    deleteInviteLink(userId: string): Promise<IInviteLink | undefined>
}
