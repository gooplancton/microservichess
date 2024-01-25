import { GameInput, GameOutcome, IGame, IGameSettings, IMove, PlayAs, gameSchema } from "types";
import { GameRepository } from "./base";
import { ServerError, Status } from "nice-grpc";

export class MemoryGameRepository implements GameRepository {
    games: Map<string, IGame>

    constructor() {
        this.games = new Map()
    }

    getGame(gameId: string) {
        const game = this.games.get(gameId)

        return Promise.resolve(game)
    }

    getGames(playerId: string) {
        const games = Array.from(this.games.entries())
            .filter(([_, game]) => game.whitePlayerId === playerId || game.blackPlayerId === playerId)
            .map(([gameId, game]) => ({ gameId, ...game }))

        return Promise.resolve(games)
    }

    createGame(whitePlayerId: string, blackPlayerId: string, settings: IGameSettings) {
        const game = gameSchema.parse({ whitePlayerId, blackPlayerId, settings } as GameInput)
        this.games.set(game._id, game)

        return Promise.resolve(game)
    }

    submitMove(gameId: string, move: IMove, outcome: GameOutcome) {
        const game = this.games.get(gameId)
        if (!game) throw new ServerError(Status.INTERNAL, "unexpected")

        game.moves.push(move)
        game.drawProposedBy = undefined
        if (outcome !== GameOutcome.KEEP_PLAYING) game.hasFinished = true

        return Promise.resolve(game)
    }

    updateDrawOffer(gameId: string, proposingPlayerId: string) {
        const game = this.games.get(gameId)
        if (!game) throw new ServerError(Status.INTERNAL, "unexpected")

        game.drawProposedBy = proposingPlayerId

        return Promise.resolve(game)
    }
}
