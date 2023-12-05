import { IGame, IMove } from "types";
import { GameRepository } from "./base";
import { GetGamesMessage } from "protobufs/out/proto/game_svc";

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
        this.games.set(game._id, game)

        return Promise.resolve()
    }

    submitMove(gameId: string, move: IMove) {
        const game = this.games.get(gameId)
        if (!game) return Promise.reject("no games found with id " + gameId)

        game.moves.push(move)

        return Promise.resolve(game)
    }
}