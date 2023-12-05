import { CreateGameMessage, GameCreatedMessage, GameRecordsMessage, GameServiceServer, GameStateMessage, GetGameStateMessage, GetGamesMessage, MakeMoveMessage, MoveValidatedMessage } from "protobufs/out/proto/game_svc";
import { GameRepository } from "../repo";
import { IGame, gameSchema } from "types"
import { Chess } from "chess.js"
import { handleUnaryCall } from "@grpc/grpc-js";

export class GameService implements GameServiceServer {
    [k: string]: any

    repo: GameRepository

    constructor(repo: GameRepository) {
        this.repo = repo
    }

    private async _createGame(request: CreateGameMessage): Promise<GameCreatedMessage> {
        const game = gameSchema.parse(request)
        const gameId = await this.repo.createGame(game)

        const res: GameCreatedMessage = {
            gameId: request.gameId
        }

        return res
    }

    public createGame: handleUnaryCall<CreateGameMessage, GameCreatedMessage> = (call, callback) => {
        this._createGame(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    }

    private getGameClientAndTimeLeft(game: IGame) {
        const client = new Chess()

        let timeRemainingWhiteSec = game.maxTimeForPlayerSec
        let timeRemainingBlackSec = game.maxTimeForPlayerSec
        let lastMoveTime = game.createdAt.getTime()

        let isWhiteTurn = true
        for (const { move, createdAt } of game.moves) {
            const elapsedSeconds = Math.floor((createdAt.getTime() - lastMoveTime) / 1000)

            if (isWhiteTurn) timeRemainingWhiteSec -= elapsedSeconds + game.timeGainedOnMoveSec
            else timeRemainingBlackSec -= elapsedSeconds + game.timeGainedOnMoveSec

            client.move(move)

            isWhiteTurn = !isWhiteTurn
        }

        return { client, timeRemainingWhiteSec, timeRemainingBlackSec }
    }

    private async _getGameState(request: GetGameStateMessage): Promise<GameStateMessage> {
        const gameId = request.gameId
        const game = await this.repo.getGame(gameId)
        if (!game) throw new Error("game not found")

        const { client, timeRemainingBlackSec, timeRemainingWhiteSec } = this.getGameClientAndTimeLeft(game)

        const res: GameStateMessage = {
            whitePlayerId: game.whitePlayerId,
            blackPlayerId: game.blackPlayerId,
            fen: client.fen(),
            timeRemainingBlackSec,
            timeRemainingWhiteSec,
            moves: game.moves.map(m => m.move)
        }

        return res
    }

    public getGameState: handleUnaryCall<GetGameStateMessage, GameStateMessage> = (call, callback) => {
        this._getGameState(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    }

    private async _makeMove({ playerId, gameId, move }: MakeMoveMessage): Promise<MoveValidatedMessage> {
        const game = await this.repo.getGame(gameId)
        if (!game) throw new Error("game not found")

        const { client, timeRemainingBlackSec, timeRemainingWhiteSec } = this.getGameClientAndTimeLeft(game)
        const lastMoveTime = game.moves.at(-1)?.createdAt.getTime() ?? game.createdAt.getTime()
        const elapsedSeconds = Math.floor((Date.now() - lastMoveTime) / 1000)

        if ((timeRemainingWhiteSec <= elapsedSeconds && playerId === game.whitePlayerId) ||
            (timeRemainingBlackSec <= elapsedSeconds && playerId === game.blackPlayerId)) {
            throw new Error("no time left")
        }

        try {
            client.move(move)
            return { resultingFen: client.fen() }
        } catch (e) {
            throw new Error("invalid move")
        }
    }

    public makeMove: handleUnaryCall<MakeMoveMessage, MoveValidatedMessage> = (call, callback) => {
        this._makeMove(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    }

    private async _getGames(request: GetGamesMessage): Promise<GameRecordsMessage> {
        const games = await this.repo.getGames(request)
        const res: GameRecordsMessage = {
            games: games.map(game => ({ ...game, moves: game.moves.map(m => m.move) }))
        }

        return res
    }

    public getGames: handleUnaryCall<GetGamesMessage, GameRecordsMessage> = (call, callback) => {
        this._getGames(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    }
}