import { IGame, IGameSettings, IMove, gameSchema } from "types";
import { GameRepository } from "./base";

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
        const game = gameSchema.parse({ whitePlayerId, blackPlayerId, settings })
        this.games.set(game._id, game)

        return Promise.resolve(game)
    }

    submitMove(gameId: string, move: IMove, isGameEndingMove: boolean) {
        const game = this.games.get(gameId)
        if (!game) return Promise.reject("no games found with id " + gameId)

        game.moves.push(move)
        if (isGameEndingMove) game.hasFinished = true

        return Promise.resolve(game)
    }
}
