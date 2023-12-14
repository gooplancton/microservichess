import { GameServiceClient, GameServiceDefinition } from "protobufs/dist/game_svc"
import { InviteServiceClient, InviteServiceDefinition } from "protobufs/dist/invite_svc"
import { UserServiceClient, UserServiceDefinition } from "protobufs/dist/user_svc"
import { createClient, createChannel } from "nice-grpc"

export class GrpcUserClient {
	static _instance: UserServiceClient

	public static get instance() {
		if (!GrpcUserClient._instance) {
			GrpcUserClient._instance = createClient(UserServiceDefinition, createChannel("0.0.0.0:50050"))
		} 

		return GrpcUserClient._instance
	}
}

export class GrpcGameClient {
	static _instance: GameServiceClient

	public static get instance() {
		if (!GrpcGameClient._instance) {
			GrpcGameClient._instance = createClient(GameServiceDefinition, createChannel("0.0.0.0:50051"))
		} 

		return GrpcGameClient._instance
	}
}

export class GrpcInviteClient {
	static _instance: InviteServiceClient

	public static get instance() {
		if (!GrpcInviteClient._instance) {
			GrpcInviteClient._instance = createClient(InviteServiceDefinition, createChannel("0.0.0.0:50052"))
		} 

		return GrpcInviteClient._instance
	}
}

