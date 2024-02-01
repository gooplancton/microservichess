import { gameProtos } from "protobufs";
import { IGame, IGameState, IMove } from "types";

export interface GameRepository {
  createGame(game: IGame): Promise<void>;
  getGame(gameId: string): Promise<IGame | null>;
  getGames(playerId: string): Promise<IGame[]>;
  updateGameState(gameId: string, updatedState: IGameState): Promise<void>;
}
