import { gameProtos, userProtos } from "protobufs";
import type { GameRepository } from "../repo";
import { gameSchema, gameSettingsSchema, gameStateSchema } from "types";
import { Chess } from "chess.js";
import { ServerError, Status } from "nice-grpc";

export class GameService implements gameProtos.GameServiceImplementation {
  repo: GameRepository;
  userClient: userProtos.UserServiceClient;

  constructor(repo: GameRepository, userClient: userProtos.UserServiceClient) {
    this.repo = repo;
    this.userClient = userClient;
  }

  async askDraw(request: gameProtos.AskOrAcceptDrawRequest) {
    const game = await this.repo.getGame(request.gameId);

    if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found");
    if (game.state.drawAskedBy === request.playerId)
      throw new ServerError(Status.INVALID_ARGUMENT, "invalid draw proposal");

    game.state.drawAskedBy = request.playerId;
    await this.repo.updateGameState(game._id, game.state);

    return {};
  }

  async acceptDraw(request: gameProtos.AskOrAcceptDrawRequest) {
    const game = await this.repo.getGame(request.gameId);
    if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found");
    if (game.state.outcome !== gameProtos.GameOutcome.KEEP_PLAYING)
      throw new ServerError(Status.INVALID_ARGUMENT, "game already over");
    if (game.state.drawAskedBy && game.state.drawAskedBy !== request.playerId)
      throw new ServerError(Status.INVALID_ARGUMENT, "invalid draw acceptance");

    game.state.outcome = gameProtos.GameOutcome.TIE;
    await this.repo.updateGameState(game._id, game.state);

    return {};
  }

  async forfeit(request: gameProtos.ForfeitRequest) {
    const game = await this.repo.getGame(request.gameId);
    if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found");
    if (game.state.outcome !== gameProtos.GameOutcome.KEEP_PLAYING)
      throw new ServerError(Status.INVALID_ARGUMENT, "game already over");

    if (
      request.playerId !== game.whitePlayerId &&
      request.playerId !== game.blackPlayerId
    )
      throw new ServerError(Status.INVALID_ARGUMENT, "not a player");

    return {
      gameId: game._id,
      san: "[FORFEIT]",
      updatedFen: game.state.fen,
      updatedOutcome:
        request.playerId === game.whitePlayerId
          ? gameProtos.GameOutcome.BLACK_WINS
          : gameProtos.GameOutcome.WHITE_WINS,
    };
  }

  async _getUsername(userId: string): Promise<string | undefined> {
    return await this.userClient
      .getUserInfo({ userId })
      .then((info) => info.username);
  }

  async createGame(
    request: gameProtos.CreateGameRequest,
  ): Promise<gameProtos.GameIdMsg> {
    const settings = gameSettingsSchema.parse({
      time: request.settings?.time || undefined,
      increment: request.settings?.increment,
    });

    const [whitePlayerUsername, blackPlayerUsername] = await Promise.all([
      this._getUsername(request.whitePlayerId),
      this._getUsername(request.blackPlayerId),
    ]);

    const initialState = gameStateSchema.parse({
      timeLeftWhite: request.settings?.time,
      timeLeftBlack: request.settings?.time,
    });

    const game = gameSchema.parse({
      whitePlayerId: request.whitePlayerId,
      blackPlayerId: request.blackPlayerId,
      whitePlayerUsername,
      blackPlayerUsername,
      settings,
      state: initialState,
    });

    await this.repo.createGame(game);

    const res = {
      gameId: game._id,
    };

    return res;
  }

  async getGameInfo({
    gameId,
  }: gameProtos.GameIdMsg): Promise<gameProtos.GetGameInfoResponse> {
    const game = await this.repo.getGame(gameId);
    if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found");

    const res: gameProtos.GetGameInfoResponse = {
      whitePlayerId: game.whitePlayerId,
      blackPlayerId: game.blackPlayerId,
      whitePlayerUsername: game.whitePlayerUsername,
      blackPlayerUsername: game.blackPlayerUsername,
      settings: game.settings,
      updatedAt: game.updatedAt,
      state: {
        fen: game.state.fen,
        moveSans: game.state.moves.map((move) => move.san),
        outcome: game.state.outcome,
        timeLeftWhite: game.state.timeLeftWhite,
        timeLeftBlack: game.state.timeLeftBlack,
      },
    };

    return res;
  }

  async makeMove(
    request: gameProtos.MakeMoveRequest,
  ): Promise<gameProtos.GameUpdateMsg> {
    const { gameId, playerId, san } = request;
    const now = Math.floor(Date.now() / 1000)

    const game = await this.repo.getGame(gameId);
    if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found");
    if (game.state.outcome !== gameProtos.GameOutcome.KEEP_PLAYING)
      throw new ServerError(Status.INVALID_ARGUMENT, "game already over");

    const colorToMove = game.state.moves.length % 2 === 0 ? "w" : "b";
    if (colorToMove === "w" && playerId !== game.whitePlayerId)
      throw new ServerError(Status.INVALID_ARGUMENT, "opponent turn");
    if (colorToMove === "b" && playerId !== game.blackPlayerId)
      throw new ServerError(Status.INVALID_ARGUMENT, "opponent turn");

    const lastMoveTime = game.state.moves.at(-1)?.createdAt;
    const elapsedSeconds = lastMoveTime ? now - lastMoveTime : 0;

    const timeLeft =
      playerId === game.whitePlayerId
        ? game.state.timeLeftWhite
        : game.state.timeLeftBlack;

    const isTimeOver = (timeLeft ?? Infinity) <= elapsedSeconds;
    if (isTimeOver) {
      const updatedOutcome =
        colorToMove === "w"
          ? gameProtos.GameOutcome.BLACK_WINS
          : gameProtos.GameOutcome.WHITE_WINS;

      await this.repo.updateGameState(game._id, {
        ...game.state,
        outcome: updatedOutcome,
      });

      return {
        gameId: game._id,
        san: "[TIME]",
        updatedFen: game.state.fen,
        updatedOutcome,
        updatedAt: now
      };
    }

    game.state.drawAskedBy = undefined
    game.state.moves.push({ san, createdAt: now });
    const updatedTimeLeft = timeLeft
      ? timeLeft - elapsedSeconds + game.settings.increment
      : undefined;
    if (colorToMove === "w") game.state.timeLeftWhite = updatedTimeLeft;
    else if (colorToMove === "b") game.state.timeLeftBlack = updatedTimeLeft;

    const client = new Chess(game.state.fen);

    try {
      client.move(san);
      game.state.fen = client.fen();
    } catch (e) {
      throw new ServerError(Status.INVALID_ARGUMENT, "invalid move");
    }

    if (client.isGameOver()) {
      if (client.isDraw()) game.state.outcome = gameProtos.GameOutcome.TIE;
      else if (client.turn() === "b")
        game.state.outcome = gameProtos.GameOutcome.WHITE_WINS;
      else game.state.outcome = gameProtos.GameOutcome.BLACK_WINS;
    }

    await this.repo.updateGameState(game._id, game.state);

    const res = {
      gameId: game._id,
      san: request.san,
      updatedFen: game.state.fen,
      updatedOutcome: game.state.outcome,
      updatedTimeLeft,
      updatedAt: now
    };

    return res;
  }

  // async getGames(request: GetGamesMessage): Promise<GameRecordsMessage> {
  //     const games = await this.repo.getGames(request.playerId)
  //     const res: GameRecordsMessage = {
  //         games: games.map(game => ({
  //             gameId: game._id,
  //             whitePlayerId: game.whitePlayerId,
  //             blackPlayerId: game.blackPlayerId,
  //             createdAt: game.createdAt,
  //             moves: game.moves.map(m => m.move)
  //         }))
  //     }

  //     return res
  // }
}
