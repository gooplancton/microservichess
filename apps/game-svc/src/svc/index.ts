import { CreateGameMessage, GameCreatedMessage, GameOutcome, GameRecordsMessage, GameServiceImplementation, GameStateMessage, GetGameStateMessage, GetGamesMessage, MakeMoveMessage, MoveValidatedMessage } from "protobufs/dist/game_svc";
import type { GameRepository } from "../repo";
import { GameSettingsInput, IGame, gameSettingsSchema } from "types"
import { Chess } from "chess.js"

export class GameService implements GameServiceImplementation {
    repo: GameRepository

    constructor(repo: GameRepository) {
        this.repo = repo
    }

    async createGame(request: CreateGameMessage): Promise<GameCreatedMessage> {
        const settings = gameSettingsSchema.parse(request.settings as GameSettingsInput)
        const game = await this.repo.createGame(request.whitePlayerId, request.blackPlayerId, settings)

        const res: GameCreatedMessage = {
            gameId: game._id
        }

        return res
    }

    private getGameClientAndTimeLeft(game: IGame) {
        const client = new Chess()

        let timeRemainingWhiteSec = game.settings.maxTimeForPlayerSec ?? Infinity
        let timeRemainingBlackSec = game.settings.maxTimeForPlayerSec ?? Infinity
        let lastMoveTime = game.createdAt.getTime()

        let isWhiteTurn = true
        for (const { move, createdAt } of game.moves) {
            const elapsedSeconds = Math.floor((createdAt.getTime() - lastMoveTime) / 1000)

            if (isWhiteTurn) timeRemainingWhiteSec -= elapsedSeconds + (game.settings.timeGainedOnMoveSec ?? 0)
            else timeRemainingBlackSec -= elapsedSeconds + (game.settings.timeGainedOnMoveSec ?? 0)

            client.move(move)

            isWhiteTurn = !isWhiteTurn
        }

        return { client, timeRemainingWhiteSec, timeRemainingBlackSec }
    }

    async getGameState(request: GetGameStateMessage): Promise<GameStateMessage> {
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

    async makeMove({ playerId, gameId, move }: MakeMoveMessage): Promise<MoveValidatedMessage> {
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

    async getGames(request: GetGamesMessage): Promise<GameRecordsMessage> {
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
}
