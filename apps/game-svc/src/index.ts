import { userProtos, gameProtos } from "protobufs";
import { MongoDBGameRepository } from "./repo";
import { GameService } from "./svc";
import { createChannel, createClient, createServer } from "nice-grpc";

const USER_SERVER_ADDR =
  process.env.USER_SERVER_ADDR ?? "http://localhost:50050";
const PORT = process.env.PORT ?? "50051";
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/microservichess";

const userClient = createClient(
  userProtos.UserServiceDefinition,
  createChannel(USER_SERVER_ADDR),
);
const repo = new MongoDBGameRepository(MONGODB_URI);
const svc = new GameService(repo, userClient);
const server = createServer();

server.add(gameProtos.GameServiceDefinition, svc);
server.listen(`0.0.0.0:${PORT}`).then(() => {
  console.log("Game Server runnning on port: ", PORT);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  server.forceShutdown();
});
