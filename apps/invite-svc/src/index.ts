import { MemoryInviteLinkRepository } from "./repo";
import { InviteService } from "./svc";
import { InviteServiceDefinition } from "protobufs/dist/invite_svc";
import { createChannel, createClient, createServer } from "nice-grpc";
import { GameServiceDefinition } from "protobufs/dist/game_svc";

const GAME_SERVER_ADDR = "0.0.0.0:50051";
const SERVER_PORT = 50052;

const repo = new MemoryInviteLinkRepository();
const gameClient = createClient(
  GameServiceDefinition,
  createChannel(GAME_SERVER_ADDR),
);
const svc = new InviteService(repo, gameClient);
const server = createServer();
server.add(InviteServiceDefinition, svc);
server.listen(`0.0.0.0:${SERVER_PORT}`).then(() => {
  console.log("Invite Server runnning on port: ", SERVER_PORT);
});
