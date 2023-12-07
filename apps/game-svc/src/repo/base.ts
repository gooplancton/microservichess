import { IGame, IGameSettings, IMove } from "types"

export interface GameRepository {
    createGame(whitePlayerId: string, blackPlayerId: string, settings: IGameSettings): Promise<IGame>
    getGame(gameId: string): Promise<IGame | undefined>
    getGames(playerId: string): Promise<IGame[]>
    submitMove(gameId: string, move: IMove, isGameEndingMove: boolean): Promise<IGame>
}
