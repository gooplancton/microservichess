import { IGame, IGameState } from "types";
import { GameRepository } from "./base";


export class MemoryGameRepository implements GameRepository {
    games: Map<string, IGame>

    constructor() {
        this.games = new Map()
    }

    async updateGameState(gameId: string, updatedState: IGameState): Promise<IGame> {
        throw new Error("Method not implemented.");
    }

    async getGame(gameId: string) {
        const game = this.games.get(gameId)
        if (!game) return null

        return game
    }

    async getGames(playerId: string) {
        const games = Array.from(this.games.entries())
            .filter(([_, game]) => game.whitePlayerId === playerId || game.blackPlayerId === playerId)
            .map(([gameId, game]) => ({ gameId, ...game }))

        return games
    }

    async createGame(game: IGame) {
        this.games.set(game._id, game)
    }
}
