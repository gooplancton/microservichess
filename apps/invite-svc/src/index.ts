import { InviteService } from "./svc";
import { InviteServiceDefinition } from "protobufs/dist/invite_svc";
import { createChannel, createClient, createServer } from "nice-grpc";
import { GameServiceDefinition } from "protobufs/dist/game_svc";
import { MongoDBInviteLinkRepository } from "./repo";

const GAME_SERVER_ADDR = process.env.GAME_SERVER_ADDR ?? "game:50051";
const PORT = process.env.PORT ?? "50052";
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://mongo:27017/microservichess";

const gameClient = createClient(
  GameServiceDefinition,
  createChannel(GAME_SERVER_ADDR),
);
const repo = new MongoDBInviteLinkRepository(MONGODB_URI);
const svc = new InviteService(repo, gameClient);
const server = createServer();

server.add(InviteServiceDefinition, svc);
server.listen(`0.0.0.0:${PORT}`).then(() => {
  console.log("Invite Server runnning on port: ", PORT);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  server.forceShutdown();
});
