import { CreateGameMessage, GameCreatedMessage, GameRecordsMessage, GameServiceClient, GameServiceServer, GameStateMessage, GetGameStateMessage, GetGamesMessage, MakeMoveMessage, MoveValidatedMessage } from "protobufs";
import { GameRepository } from "../repo";
import { IGame, gameSchema } from "types"
import { Chess } from "chess.js"

export class ClassicChessGameService {
    repo: GameRepository

    constructor(repo: GameRepository) {
        this.repo = repo
    }

    public async CreateGame(request: CreateGameMessage): Promise<GameCreatedMessage> {
        const game = gameSchema.parse(request)
        const gameId = await this.repo.createGame(game)

        const res: GameCreatedMessage = {
            gameId
        }

        return res
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

    public async GetGameState(request: GetGameStateMessage): Promise<GameStateMessage> {
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

    public async MakeMove({ playerId, gameId, move }: MakeMoveMessage): Promise<MoveValidatedMessage> {
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

    public async GetGames(request: GetGamesMessage): Promise<GameRecordsMessage> {
        const games = await this.repo.getGames(request)
        const res: GameRecordsMessage = {
            games: games.map(game => ({ ...game, moves: game.moves.map(m => m.move) }))
        }

        return res
    }
}