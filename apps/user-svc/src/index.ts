import { UserService } from "./svc";
import { createServer } from "nice-grpc";
import { UserServiceDefinition } from "protobufs/dist/user_svc";
import { MongoDBUserRepository } from "./repo";

const SERVER_PORT = 50050;
const MONGODB_URI = "mongodb://0.0.0.0:27017/microservichess";

const repo = new MongoDBUserRepository(MONGODB_URI);
const svc = new UserService(repo);
const server = createServer();
server.add(UserServiceDefinition, svc);
server.listen(`0.0.0.0:${SERVER_PORT}`).then(() => {
  console.log("User Server runnning on port: ", SERVER_PORT);
});
