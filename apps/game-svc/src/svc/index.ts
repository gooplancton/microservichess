import { CreateGameMessage, GameCreatedMessage, GameOutcome, GameRecordsMessage, GameServiceServer, GameStateMessage, GetGameStateMessage, GetGamesMessage, MakeMoveMessage, MoveValidatedMessage } from "protobufs/dist/game_svc";
import type { GameRepository } from "../repo";
import { IGame, gameSettingsSchema } from "types"
import { Chess } from "chess.js"
import { handleUnaryCall } from "@grpc/grpc-js";

export class GameService implements GameServiceServer {
    [k: string]: any

    repo: GameRepository

    constructor(repo: GameRepository) {
        this.repo = repo
    }

    private async _createGame(request: CreateGameMessage): Promise<GameCreatedMessage> {
        const settings = gameSettingsSchema.parse(request.settings)
        const game = await this.repo.createGame(request.whitePlayerId, request.blackPlayerId, settings)

        const res: GameCreatedMessage = {
            gameId: game._id
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

        let timeRemainingWhiteSec = game.settings.maxTimeForPlayerSec
        let timeRemainingBlackSec = game.settings.maxTimeForPlayerSec
        let lastMoveTime = game.createdAt.getTime()

        let isWhiteTurn = true
        for (const { move, createdAt } of game.moves) {
            const elapsedSeconds = Math.floor((createdAt.getTime() - lastMoveTime) / 1000)

            if (isWhiteTurn) timeRemainingWhiteSec -= elapsedSeconds + game.settings.timeGainedOnMoveSec
            else timeRemainingBlackSec -= elapsedSeconds + game.settings.timeGainedOnMoveSec

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
        const now = new Date()
        const game = await this.repo.getGame(gameId)
        if (!game) throw new Error("game not found")

        const colorToMove = game.moves.length % 2 === 0 ? "w" : "b"
        if (colorToMove === "w" && playerId !== game.whitePlayerId) throw new Error("invalid move")
        if (colorToMove === "b" && playerId !== game.blackPlayerId) throw new Error("invalid move")

        const { client, timeRemainingBlackSec, timeRemainingWhiteSec } = this.getGameClientAndTimeLeft(game)
        const lastMoveTime = game.moves.at(-1)?.createdAt.getTime() ?? game.createdAt.getTime()
        const elapsedSeconds = Math.floor((now.getTime() - lastMoveTime) / 1000)

        if (timeRemainingWhiteSec <= elapsedSeconds && playerId === game.whitePlayerId) {
            return { gameId: game._id, resultingFen: client.fen(), outcome: GameOutcome.BLACK_WINS, timeRemainingWhiteSec: 0, timeRemainingBlackSec }
        } else if (timeRemainingBlackSec <= elapsedSeconds && playerId === game.blackPlayerId) {
            return { gameId: game._id, resultingFen: client.fen(), outcome: GameOutcome.WHITE_WINS, timeRemainingWhiteSec, timeRemainingBlackSec: 0 }
        }

        try {
            client.move(move)
        } catch (e) {
            throw new Error("invalid move")
        }

        let outcome: GameOutcome
        let isGameEndingMove: boolean

        if (client.isGameOver()) {
            isGameEndingMove = true

            if (client.isDraw()) outcome = GameOutcome.TIE
            else if (client.turn() === "b") outcome = GameOutcome.WHITE_WINS
            else outcome = GameOutcome.BLACK_WINS
        } else {
            isGameEndingMove = false
            outcome = GameOutcome.KEEP_PLAYING
        }

        this.repo.submitMove(gameId, { createdAt: now, move }, isGameEndingMove)

        return { gameId: game._id, resultingFen: client.fen(), outcome, timeRemainingWhiteSec, timeRemainingBlackSec }
    }

    public makeMove: handleUnaryCall<MakeMoveMessage, MoveValidatedMessage> = (call, callback) => {
        this._makeMove(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }

    private async _getGames(request: GetGamesMessage): Promise<GameRecordsMessage> {
        const games = await this.repo.getGames(request.playerId)
        const res: GameRecordsMessage = {
            games: games.map(game => ({
                gameId: game._id,
                whitePlayerId: game.whitePlayerId,
                blackPlayerId: game.blackPlayerId,
                createdAt: game.createdAt,
                moves: game.moves.map(m => m.move)
            }))
        }

        return res
    }

    public getGames: handleUnaryCall<GetGamesMessage, GameRecordsMessage> = (call, callback) => {
        this._getGames(call.request)
            .then(res => callback(null, res))
            .catch(err => callback({ code: 3, message: err }))
    }
}
