import { GameServiceDefinition } from "protobufs/dist/game_svc";
import { InviteServiceDefinition } from "protobufs/dist/invite_svc";
import { UserServiceDefinition } from "protobufs/dist/user_svc";
import { createClient, createChannel, ServerError, Status } from "nice-grpc";
import { TRPCError } from "@trpc/server";

const USER_SERVER_ADDR = process.env.USER_SERVER_ADDR ?? "user:50050";
export const userServiceClient = createClient(
  UserServiceDefinition,
  createChannel(USER_SERVER_ADDR),
);

const GAME_SERVER_ADDR = process.env.GAME_SERVER_ADDR ?? "game:50051";
export const gameServiceClient = createClient(
  GameServiceDefinition,
  createChannel(GAME_SERVER_ADDR),
);

const INVITE_SERVER_ADDR = process.env.USER_SERVER_ADDR ?? "invite:50052";
export const inviteServiceClient = createClient(
  InviteServiceDefinition,
  createChannel(INVITE_SERVER_ADDR),
);

export async function handleGrpcCallError(e: ServerError): Promise<never> {
  if (e.code === Status.INVALID_ARGUMENT) {
    throw new TRPCError({ code: "BAD_REQUEST", message: e.message });
  } else if (e.code === Status.UNAVAILABLE) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: e.message });
  } else if (e.code === Status.INTERNAL) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: e.message });
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "unhandled",
    });
  }
}
