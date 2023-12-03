import { Server, ServerCredentials } from "@grpc/grpc-js"
import { MemoryGameRepository } from "./repo"
import { ClassicChessGameService } from "./svc"
import { GameServiceServer, GameServiceService } from "protobufs"

const SERVER_PORT = 50051

const repo = new MemoryGameRepository()
const svc = new ClassicChessGameService(repo)

const svcGrpcAdapter: GameServiceServer = {
    createGame: (call, callback) => {
        svc.CreateGame(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    },
    getGames: (call, callback) => {
        svc.GetGames(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    },
    getGameState: (call, callback) => {
        svc.GetGameState(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    },
    makeMove: (call, callback) => {
        svc.MakeMove(call.request)
        .then(res => callback(null, res))
        .catch(err => callback({ code: 3, message: err }))
    },
}

const server = new Server()
server.addService(GameServiceService, svcGrpcAdapter)
server.bindAsync(`0.0.0.0:${SERVER_PORT}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Server binding failed:', err)
        return
    }

    console.log(`Server is running on port ${port}`)
    server.start()
})