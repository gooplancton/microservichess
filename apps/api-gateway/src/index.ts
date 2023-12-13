import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { createContext, router } from "./trpc"
import { inviteRouter } from "./routers/invite"
import { userRouter } from "./routers/user"
import { gameRouter } from "./routers/game"

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

