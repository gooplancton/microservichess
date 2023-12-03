import { IGame, IMove } from "types"
import { GetGamesMessage } from "protobufs"

export interface GameRepository {
    createGame(game: IGame): Promise<string>
    getGame(gameId: string): Promise<IGame | undefined>
    getGames(query: GetGamesMessage): Promise<Array<IGame & { gameId: string }>>
    submitMove(gameId: string, move: IMove, newFen: string): Promise<IGame>
}