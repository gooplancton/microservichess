import { handleUnaryCall } from "@grpc/grpc-js";
import { ConsumeInviteLinkMessage, CreateInviteLinkMessage, EmptyMessage, InvalidateLinkMessage, InviteServiceServer } from "protobufs/src/gen/invite_svc"
import { InviteLinkRepository } from "../repo"; import { gameSettingsSchema } from "../../../../packages/types/src"; import { CreateGameMessage } from "protobufs/src/gen/game_svc";

export class InviteService implements InviteServiceServer {
    [k: string]: any

    repo: InviteLinkRepository

    constructor(repo: InviteLinkRepository) {
        this.repo = repo
    }

    private async _createInviteLink(request: CreateInviteLinkMessage): Promise<EmptyMessage> {
        const settings = gameSettingsSchema.parse(request.settings)
        await this.repo.createInviteLink(request.userId, settings)

        return {}
    }

    public createInviteLink: handleUnaryCall<CreateInviteLinkMessage, EmptyMessage> = (call, callback) => {
        this._createInviteLink(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _consumeInviteLink(request: ConsumeInviteLinkMessage): Promise<EmptyMessage> {
        if (request.inviterId === request.userId) throw new Error("cannot consume your own invite links")

        const inviteLink = await this.repo.deleteInviteLink(request.inviterId)
        if (!inviteLink) throw new Error("no such invite link found")

        const gameCreationRequest: CreateGameMessage = {
            whitePlayerId: request.inviterId,
            blackPlayerId: request.userId,
            settings: inviteLink.settings
        }

        // TODO: send game creation req

        return {}
    }

    public consumeInviteLink: handleUnaryCall<ConsumeInviteLinkMessage, EmptyMessage> = (call, callback) => {
        this._consumeInviteLink(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _invalidateLink(request: InvalidateLinkMessage): Promise<EmptyMessage> {
        const inviteLink = await this.repo.deleteInviteLink(request.userId)
        if (!inviteLink) throw new Error("no such invite link found")

        return {}
    }

    public invalidateInviteLink: handleUnaryCall<InvalidateLinkMessage, EmptyMessage> = (call, callback) => {
        this._invalidateLink(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }
}
