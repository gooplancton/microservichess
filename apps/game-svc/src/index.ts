import { Server, ServerCredentials } from "@grpc/grpc-js"
import { MemoryGameRepository } from "./repo"
import { GameService } from "./svc"
import { GameServiceService } from "protobufs/src/gen/game_svc"

const SERVER_PORT = 50051

const repo = new MemoryGameRepository()
const svc = new GameService(repo)
const server = new Server()
server.addService(GameServiceService, svc)
server.bindAsync(`0.0.0.0:${SERVER_PORT}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Server binding failed:', err)
        return
    }

    console.log(`Server is running on port ${port}`)
    server.start()
})
