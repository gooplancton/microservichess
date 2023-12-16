import { IGameSettings, IInviteLink, InviteLinkInput, inviteLinkSchema } from "types";
import { InviteLinkRepository } from "./base";

type InviterId = string

export class MemoryInviteLinkRepository implements InviteLinkRepository {
    links: Map<InviterId, IInviteLink>

    constructor() {
        this.links = new Map()
    }
    
    async createInviteLink(inviterId: string, settings: IGameSettings): Promise<IInviteLink> {
        const inviteLink = inviteLinkSchema.parse({
            playerId: inviterId,
            settings
        } as InviteLinkInput) 

        this.links.set(inviterId, inviteLink)

        return inviteLink
    }

    async deleteInviteLink(inviterId: string): Promise<IInviteLink | undefined> {
        const inviteLink = this.links.get(inviterId)
        if (!inviteLink) return undefined

        this.links.delete(inviterId)

        return inviteLink
    }
}
