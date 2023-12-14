import { GameServiceDefinition } from "protobufs/dist/game_svc"
import { MemoryGameRepository } from "./repo"
import { GameService } from "./svc"
import { createServer } from "nice-grpc"

const SERVER_PORT = 50051

const repo = new MemoryGameRepository()
const svc = new GameService(repo)
const server = createServer()
server.add(GameServiceDefinition, svc)
server.listen(`0.0.0.0:${SERVER_PORT}`).then(() => {
    console.log("Game Server runnning on port: ", SERVER_PORT)
})
