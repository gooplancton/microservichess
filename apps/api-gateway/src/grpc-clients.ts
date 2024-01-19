import { GameServiceDefinition } from "protobufs/dist/game_svc"
import { InviteServiceDefinition } from "protobufs/dist/invite_svc"
import {  UserServiceDefinition } from "protobufs/dist/user_svc"
import { createClient, createChannel } from "nice-grpc"

export const userServiceClient = createClient(UserServiceDefinition, createChannel("0.0.0.0:50050"))
export const gameServiceClient = createClient(GameServiceDefinition, createChannel("0.0.0.0:50051"))
export const inviteServiceClient = createClient(InviteServiceDefinition, createChannel("0.0.0.0:50052"))

