import { InviteLinkRepository } from "./base";
import { v4 as uuidv4 } from "uuid"

type GameId = string
type PlayerId = string

export class MemoryInviteLinkRepository implements InviteLinkRepository {
    links: Map<GameId, PlayerId>

    constructor() {
        this.links = new Map()
    }
    
    async createInviteLink(playerId: string): Promise<string> {
        const gameId = uuidv4()
        this.links.set(gameId, playerId)

        return gameId
    }

    async consumeInviteLink(gameId: string): Promise<string | undefined> {
        const linksExisted = this.links.delete(gameId)
        if (linksExisted) return gameId
        else return undefined
    }
}