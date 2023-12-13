import { GameServiceClient } from "protobufs/dist/game_svc"
import { InviteServiceClient } from "protobufs/dist/invite_svc"
import { UserServiceClient } from "protobufs/dist/user_svc"
import { credentials } from "@grpc/grpc-js"

export class GrpcUserClient {
	static _instance: UserServiceClient

	public static get instance() {
		if (!GrpcUserClient._instance) {
			GrpcUserClient._instance = new UserServiceClient("0.0.0.0:50050", credentials.createInsecure())
		} 

		return GrpcUserClient._instance
	}
}

export class GrpcGameClient {
	static _instance: GameServiceClient

	public static get instance() {
		if (!GrpcGameClient._instance) {
			GrpcGameClient._instance = new GameServiceClient("0.0.0.0:50051", credentials.createInsecure())
		} 

		return GrpcGameClient._instance
	}
}

export class GrpcInviteClient {
	static _instance: InviteServiceClient

	public static get instance() {
		if (!GrpcInviteClient._instance) {
			GrpcInviteClient._instance = new InviteServiceClient("0.0.0.0:50052", credentials.createInsecure())
		} 

		return GrpcInviteClient._instance
	}
}

