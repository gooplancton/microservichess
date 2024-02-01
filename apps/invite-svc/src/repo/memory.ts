import { IInviteLink, inviteLinkSchema } from "types";
import { InviteLinkRepository } from "./base";
import type { gameProtos, inviteProtos } from "protobufs";

export class MemoryInviteLinkRepository implements InviteLinkRepository {
    links: Map<string, IInviteLink>

    constructor() {
        this.links = new Map()
    }

    async getInviteLink(inviteLinkId: string): Promise<IInviteLink | null> {
        const inviteLink = this.links.get(inviteLinkId)
        if (!inviteLink) return null

        return inviteLink
    }
    
    async createInviteLink(userId: string, gameSettings: gameProtos.GameSettingsMsg, playAs?: inviteProtos.PlayAs): Promise<IInviteLink> {
        const inviteLink = inviteLinkSchema.parse({
            inviterId: userId,
            gameSettings,
            playAs
        }) 

        this.links.set(inviteLink._id, inviteLink)

        return inviteLink
    }

    async deleteInviteLink(inviteLinkId: string): Promise<IInviteLink | null> {
        const inviteLink = this.links.get(inviteLinkId)
        if (!inviteLink) return null

        this.links.delete(inviteLinkId)

        return inviteLink
    }
}
