import { IGame, IMove } from "types"
import { GetGamesMessage } from "protobufs/out/proto/game_svc"

export interface GameRepository {
    createGame(game: IGame): Promise<void>
    getGame(gameId: string): Promise<IGame | undefined>
    getGames(query: GetGamesMessage): Promise<Array<IGame & { gameId: string }>>
    submitMove(gameId: string, move: IMove, newFen: string): Promise<IGame>
}