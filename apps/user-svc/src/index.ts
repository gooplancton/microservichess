import { UserService } from "./svc"
import { MemoryUserRepository } from "./repo/memory"
import { createServer } from "nice-grpc"
import { UserServiceDefinition } from "protobufs/dist/user_svc"

const SERVER_PORT = 50050

const repo = new MemoryUserRepository()
const svc = new UserService(repo)
const server = createServer()
server.add(UserServiceDefinition, svc)
server.listen(`0.0.0.0:${SERVER_PORT}`).then(() => {
    console.log("User Server runnning on port: ", SERVER_PORT)
})
