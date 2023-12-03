import { IGame, IMove } from "types";
import { GameRepository } from "./base";
import { GetGamesMessage } from "protobufs";

export class MemoryGameRepository implements GameRepository {
    games: Map<string, IGame>

    constructor() {
        this.games = new Map()
    }

    getGame(gameId: string) {
        const game = this.games.get(gameId)

        return Promise.resolve(game)
    }

    getGames(query: GetGamesMessage) {
        // TODO: implement query
        const games = Array.from(this.games.entries()).map(([gameId, game]) => ({ gameId, ...game }))
        return Promise.resolve(games)
    }

    createGame(game: IGame) {
        const nGames = this.games.size        
        const gameId = (nGames + 1).toString()
        this.games.set(gameId, game)

        return Promise.resolve(gameId)
    }

    submitMove(gameId: string, move: IMove) {
        const game = this.games.get(gameId)
        if (!game) return Promise.reject("no games found with id " + gameId)

        game.moves.push(move)

        return Promise.resolve(game)
    }
}