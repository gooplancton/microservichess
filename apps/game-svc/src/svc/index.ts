import { AcceptDrawMessage, CreateGameMessage, GameCreatedMessage, GameRecordsMessage, GameServiceImplementation, GameStateMessage, GetGameStateMessage, GetGamesMessage, MakeMoveMessage, MoveValidatedMessage, ProposeDrawMessage } from "protobufs/dist/game_svc";
import type { GameRepository } from "../repo";
import { GameSettingsInput, IGame, gameSettingsSchema, GameOutcome } from "types"
import { Chess } from "chess.js"
import { ServerError, Status } from "nice-grpc";

export class GameService implements GameServiceImplementation {
    repo: GameRepository

    constructor(repo: GameRepository) {
        this.repo = repo
    }

    async proposeDraw(request: ProposeDrawMessage) {
        const game = await this.repo.getGame(request.gameId)
        
        if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found")
        if (game.drawProposedBy === request.playerId)
            throw new ServerError(Status.INVALID_ARGUMENT, "invalid draw proposal")

        await this.repo.updateDrawOffer(request.gameId, request.playerId)

        return {}
    }

    async acceptDraw(request: AcceptDrawMessage) {
        const game = await this.repo.getGame(request.gameId)

        if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found")
        if (game.hasFinished) throw new ServerError(Status.INVALID_ARGUMENT, "game already over")
        if (game.drawProposedBy && game.drawProposedBy !== request.playerId)
            throw new ServerError(Status.INVALID_ARGUMENT, "invalid draw acceptance")

        await this.repo.submitMove(request.gameId, { createdAt: Date.now(), move: "[DRAW_ACCEPTED]" }, GameOutcome.TIE)

        return {}
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
        let lastMoveTime = game.createdAt

        let isWhiteTurn = true
        for (const { move, createdAt } of game.moves) {
            const elapsedSeconds = Math.floor((createdAt - lastMoveTime) / 1000)
            const recovery = game.settings.timeGainedOnMoveSec ?? 0

            if (isWhiteTurn) timeRemainingWhiteSec -= elapsedSeconds + recovery
            else timeRemainingBlackSec -= elapsedSeconds + recovery

            client.move(move)

            isWhiteTurn = !isWhiteTurn
        }

        return { client, timeRemainingWhiteSec, timeRemainingBlackSec }
    }

    async getGameState({ gameId }: GetGameStateMessage): Promise<GameStateMessage> {
        const game = await this.repo.getGame(gameId)
        if (!game) throw new ServerError(Status.INVALID_ARGUMENT, "game not found")

        const { client, timeRemainingBlackSec, timeRemainingWhiteSec } = this.getGameClientAndTimeLeft(game)

        const res: GameStateMessage = {
            fen: client.fen(),
            timeRemainingBlackSec,
            timeRemainingWhiteSec,
            moves: game.moves.map(m => m.move),
            whitePlayerId: game.whitePlayerId,
            blackPlayerId: game.blackPlayerId
        }

        return res
    }

    async makeMove({ playerId, gameId, move }: MakeMoveMessage): Promise<MoveValidatedMessage> {
        const game = await this.repo.getGame(gameId)
        if (!game) throw new Error("game not found")
        if (game.hasFinished) throw new Error("game already over")

        const colorToMove = game.moves.length % 2 === 0 ? "w" : "b"
        if (colorToMove === "w" && playerId !== game.whitePlayerId) throw new ServerError(Status.INVALID_ARGUMENT, "opponent turn")
        if (colorToMove === "b" && playerId !== game.blackPlayerId) throw new ServerError(Status.INVALID_ARGUMENT, "opponent turn")

        const { client, timeRemainingBlackSec, timeRemainingWhiteSec } = this.getGameClientAndTimeLeft(game)
        const lastMoveTime = game.moves.at(-1)?.createdAt ?? game.createdAt
        const elapsedSeconds = Math.floor((Date.now() - lastMoveTime) / 1000)

        if (playerId === game.whitePlayerId) {
            if (timeRemainingWhiteSec <= elapsedSeconds || move === "[FORFEIT]") {
                return {
                    gameId: game._id,
                    resultingFen: client.fen(),
                    outcome: GameOutcome.BLACK_WINS,
                    timeRemainingWhiteSec,
                    timeRemainingBlackSec
                }
            }
        } else if (playerId === game.blackPlayerId) {
            if (timeRemainingBlackSec <= elapsedSeconds || move === "[FORFEIT]") {
                return {
                    gameId: game._id,
                    resultingFen: client.fen(),
                    outcome: GameOutcome.WHITE_WINS,
                    timeRemainingWhiteSec,
                    timeRemainingBlackSec
                }
            }
        } else {
            throw new ServerError(Status.INTERNAL, "unexpected")
        }

        try {
            client.move(move)
        } catch (e) {
            throw new ServerError(Status.INVALID_ARGUMENT, "invalid move")
        }

        let outcome: GameOutcome
        if (client.isGameOver()) {
            if (client.isDraw()) outcome = GameOutcome.TIE
            else if (client.turn() === "b") outcome = GameOutcome.WHITE_WINS
            else outcome = GameOutcome.BLACK_WINS
        } else {
            outcome = GameOutcome.KEEP_PLAYING
        }

        await this.repo.submitMove(gameId, { createdAt: Date.now(), move }, outcome)

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
