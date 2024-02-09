import { UserService } from "./svc";
import { createServer } from "nice-grpc";
import { UserServiceDefinition } from "protobufs/dist/user_svc";
import { MongoDBUserRepository } from "./repo";

const PORT = process.env.PORT ?? "50050";
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/microservichess";

const repo = new MongoDBUserRepository(MONGODB_URI);
const svc = new UserService(repo);
const server = createServer();

server.add(UserServiceDefinition, svc);
server.listen(`0.0.0.0:${PORT}`).then(() => {
  console.log("User Server runnning on port: ", PORT);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  server.forceShutdown();
});
