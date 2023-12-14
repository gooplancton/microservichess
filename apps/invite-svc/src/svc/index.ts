import type { ConsumeInviteLinkMessage, CreateInviteLinkMessage, InvalidateLinkMessage, InviteServiceImplementation } from "protobufs/dist/invite_svc"
import type { CreateGameMessage, GameServiceClient } from "protobufs/dist/game_svc";
import { InviteLinkRepository } from "../repo"; 
import { gameSettingsSchema } from "types"; 

export class InviteService implements InviteServiceImplementation {
    repo: InviteLinkRepository
    gameClient: GameServiceClient

    constructor(repo: InviteLinkRepository, gameClient: GameServiceClient) {
        this.repo = repo
        this.gameClient = gameClient
    }

    async createInviteLink(request: CreateInviteLinkMessage) {
        const settings = gameSettingsSchema.parse(request.settings)
        await this.repo.createInviteLink(request.userId, settings)

        return {}
    }

    async consumeInviteLink(request: ConsumeInviteLinkMessage) {
        if (request.inviterId === request.userId) throw new Error("cannot consume your own invite links")

        const inviteLink = await this.repo.deleteInviteLink(request.inviterId)
        if (!inviteLink) throw new Error("no such invite link found")

        const gameCreationRequest: CreateGameMessage = {
            whitePlayerId: request.inviterId,
            blackPlayerId: request.userId,
            settings: inviteLink.settings
        }

        const gameCreatedResponse = await this.gameClient.createGame(gameCreationRequest)

        return gameCreatedResponse
    }

    async invalidateInviteLink(request: InvalidateLinkMessage) {
        const inviteLink = await this.repo.deleteInviteLink(request.userId)
        if (!inviteLink) throw new Error("no such invite link found")

        return {}
    }
}
