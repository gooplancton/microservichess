import { GameServiceClient } from "protobufs/src/gen/game_svc"
import { InviteServiceClient } from "protobufs/src/gen/invite_svc"
import { UserServiceClient } from "protobufs/src/gen/user_svc"
import { credentials } from "@grpc/grpc-js"
import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { createContext, router } from "./trpc"
import { inviteRouter } from "./routers/invite"
import { userRouter } from "./routers/user"
import { gameRouter } from "./routers/game"

declare global {
	var gameClient: GameServiceClient
	var inviteClient: InviteServiceClient
	var userClient: UserServiceClient
}

userClient = new UserServiceClient("0.0.0.0:50050", credentials.createInsecure())
gameClient = new GameServiceClient("0.0.0.0:50051", credentials.createInsecure())
inviteClient = new InviteServiceClient("0.0.0.0:50052", credentials.createInsecure())

const app = express()
const appRouter = router({
	invite: inviteRouter,
	user: userRouter,
	game: gameRouter
})

app.use("/trpc", trpcExpress.createExpressMiddleware({
	router: appRouter,
	createContext
}))

app.listen(8080)

export type AppRouter = typeof appRouter

