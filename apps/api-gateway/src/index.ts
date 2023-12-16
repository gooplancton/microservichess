import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { createContext, router } from "./trpc"
import { inviteRouter } from "./routers/invite"
import { userRouter } from "./routers/user"
import { gameRouter } from "./routers/game"
import { renderTrpcPanel } from "trpc-panel"
import cors from "cors"

const app = express()
const appRouter = router({
	invite: inviteRouter,
	user: userRouter,
	game: gameRouter
})

app.use(cors())

app.use("/trpc", trpcExpress.createExpressMiddleware({
	router: appRouter,
	createContext
}))

app.use("/panel", (_, res) => {
	return res.send(
		renderTrpcPanel(appRouter, { url: "http://localhost:8080/trpc" })
	)
})

app.listen(8080)

export type AppRouter = typeof appRouter

