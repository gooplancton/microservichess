import { handleUnaryCall } from "@grpc/grpc-js";
import { ConsumeInviteLinkMessage, CreateInviteLinkMessage, GameIdMessage, InviteServiceServer } from "protobufs/out/proto/invite_svc";
import { InviteLinkRepository } from "../repo";
import { IGame, gameSchema } from "../../../../packages/types/src";

type GameSink = {
    createGame: (game: IGame) => Promise<void>
}

export class InviteService implements InviteServiceServer {
    [k: string]: any

    repo: InviteLinkRepository
    gameSink: GameSink

    constructor(repo: InviteLinkRepository, gameSink: GameSink) {
        this.repo = repo
        this.gameSink = gameSink
    }

    private async _createInviteLink(request: CreateInviteLinkMessage): Promise<GameIdMessage> {
        const gameId = await this.repo.createInviteLink()

        const game = gameSchema.parse({
            
        })

        const res = {
            gameId
        }

        return res
    }

    public createInviteLink: handleUnaryCall<CreateInviteLinkMessage, GameIdMessage> = (call, callback) => {
        this._createInviteLink(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }
}