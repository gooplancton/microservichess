import { Collection, MongoClient } from "mongodb"
import { IGame, IGameState } from "types";
import { GameRepository } from "./base"
import { ServerError, Status } from "nice-grpc"

export class MongoDBGameRepository implements GameRepository {
    connected: boolean = false
    games: Collection<IGame>

    constructor(url: string) {
        const client = new MongoClient(url)
        client.connect().then(() => this.connected = true)

        this.games = client.db().collection<IGame>("games")
    }

    async updateGameState(gameId: string, updatedState: IGameState): Promise<IGame> {
        throw new Error("Method not implemented.");
    }

    async createGame(game: IGame) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        await this.games.insertOne(game)
    }

    async getGame(gameId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const game = await this.games.findOne({ _id: gameId })

        return game
    }

    async getGames(playerId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const games = await this.games.find({
            $or: [
                { whitePlayerId: playerId },
                { blackPlayerId: playerId }
            ]
        }).toArray()

        return games
    }

    // async submitMove(gameId: string, move: IMove, outcome: gameProtos.GameOutcome) {
    //     if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

    //     const game = await this.games.findOneAndUpdate(
    //         { _id: gameId },
    //         {
    //             $push: { moves: move },
    //             $unset: { drawProposedBy: true }
    //         },
    //     )

    //     if (!game) throw new ServerError(Status.INTERNAL, "unexpected")

    //     return game
    // }

    // async updateDrawOffer(gameId: string, proposingPlayerId?: string | undefined) {
    //     if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

    //     const game = await this.games.findOneAndUpdate(
    //         { _id: gameId },
    //         {
    //             $set: {
    //                 drawProposedBy: proposingPlayerId
    //             },
    //         }
    //     )

    //     if (!game) throw new ServerError(Status.INTERNAL, "unexpected")

    //     return game
    // }
}
