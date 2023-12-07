import { Server, ServerCredentials } from "@grpc/grpc-js"
import { UserServiceService } from "protobufs/src/gen/user_svc"
import { UserService } from "./svc"
import { MemoryUserRepository } from "./repo/memory"

const SERVER_PORT = 50050

const repo = new MemoryUserRepository()
const svc = new UserService(repo)
const server = new Server()

server.addService(UserServiceService, svc)
server.bindAsync(`0.0.0.0:${SERVER_PORT}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Server binding failed:', err)
        return
    }

    console.log(`Server is running on port ${port}`)
    server.start()
})
