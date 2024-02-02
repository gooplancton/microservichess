import { userProtos, gameProtos } from "protobufs";
import { MongoDBGameRepository } from "./repo";
import { GameService } from "./svc";
import { createChannel, createClient, createServer } from "nice-grpc";

const SERVER_PORT = 50051;
const MONGODB_URI = "mongodb://0.0.0.0:27017/microservichess";
const USER_SERVER_ADDR = "0.0.0.0:50050";

const userClient = createClient(
  userProtos.UserServiceDefinition,
  createChannel(USER_SERVER_ADDR),
);
const repo = new MongoDBGameRepository(MONGODB_URI);
const svc = new GameService(repo, userClient);
const server = createServer();

server.add(gameProtos.GameServiceDefinition, svc);
server.listen(`0.0.0.0:${SERVER_PORT}`).then(() => {
  console.log("Game Server runnning on port: ", SERVER_PORT);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  server.forceShutdown();
});
