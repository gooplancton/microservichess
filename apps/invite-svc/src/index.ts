import { Server, ServerCredentials } from "@grpc/grpc-js"
import { InviteLinkRepository } from "./repo"
import { InviteService } from "./svc"
import { InviteServiceService } from "protobufs/out/proto/invite_svc"

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