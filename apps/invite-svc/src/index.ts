import { Server, ServerCredentials } from "@grpc/grpc-js"
import { MemoryInviteLinkRepository } from "./repo"
import { InviteService } from "./svc"
import { InviteServiceService } from "protobufs/src/gen/invite_svc"

const SERVER_PORT = 50051

const repo = new MemoryInviteLinkRepository()
const svc = new InviteService(repo)
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
