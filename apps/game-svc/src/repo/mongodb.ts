import { Collection, MongoClient, ObjectId } from "mongodb"
import { IGameSettings, gameSchema, IGame, IMove } from "types";
import { GameRepository } from "./base"
import { ServerError, Status } from "nice-grpc"

export class MongoDBGameRepository implements GameRepository {
    connected: boolean = false
    games: Collection<IGame>

    constructor(url: string) {
        const client = new MongoClient(url)
        client.connect().then(() => this.connected = true)

        this.games = client.db().collection("games")
    }

    async createGame(whitePlayerId: string, blackPlayerId: string, settings: IGameSettings) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const gameId = new ObjectId()
        const game = gameSchema.parse({ whitePlayerId, blackPlayerId, settings, _id: gameId })
        await this.games.insertOne(game)

        return game
    }

    async getGame(gameId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const game = await this.games.findOne({ _id: new ObjectId(gameId) })

        return game ?? undefined
    }

    async getGames(playerId: string) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const games = await this.games.find({ $or: [
            { whitePlayerId: playerId },
            { blackPlayerId: playerId }
        ]}).toArray()

        return games
    }

    async submitMove(gameId: string, move: IMove, isGameEndingMove: boolean) {
        if (!this.connected) throw new ServerError(Status.UNAVAILABLE, "not connected")

        const game = await this.games.findOne({ _id: new ObjectId(gameId) })
        if (!game) throw new Error("no games found with id " + gameId)

        await this.games.updateOne(
            { _id: new ObjectId(gameId) },
            {
                $push: { moves: move },
                $set: { hasFinished: isGameEndingMove }
            }
        )

        return {
            ...game,
            moves: [...game.moves, move],
            hasFinished: isGameEndingMove
        }
    }
}
