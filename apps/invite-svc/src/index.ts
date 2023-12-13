import { Server, ServerCredentials } from "@grpc/grpc-js"
import { MemoryInviteLinkRepository } from "./repo"
import { InviteService } from "./svc"
import { InviteServiceService } from "protobufs/dist/invite_svc"
import { GameServiceClient } from "protobufs/dist/game_svc"
import { credentials } from "@grpc/grpc-js"

const GAME_SERVER_ADDR = "0.0.0.0:50052"
const SERVER_PORT = 50053

const repo = new MemoryInviteLinkRepository()
const gameClient = new GameServiceClient(GAME_SERVER_ADDR, credentials.createInsecure())
const svc = new InviteService(repo, gameClient)

const server = new Server()
server.addService(InviteServiceService, svc)
server.bindAsync(`0.0.0.0:${SERVER_PORT}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Server binding failed:', err)
        return
    }

    console.log(`Server is running on port ${port}`)
    server.start()
})
