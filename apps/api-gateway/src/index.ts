import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import { renderTrpcPanel } from "trpc-panel";
import ws from "ws";
import { inviteRouter, userRouter, gameRouter } from "./routers";
import { createContext, router } from "./trpc";

const PORT = process.env.PORT ?? "8080";
const API_PUBLIC_URL = process.env.API_PUBLIC_URL ?? "http://localhost"

const app = express();
const appRouter = router({
  invite: inviteRouter,
  user: userRouter,
  game: gameRouter,
});

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

if (API_PUBLIC_URL === "http://localhost") {
  app.use("/panel", (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, { url: `${API_PUBLIC_URL}:${PORT}/trpc` }),
    );
  });
}

const server = app.listen(Number.parseInt(PORT), () => {
  console.log("API Gateway listening on", PORT);
});

const wss = new ws.Server({ server });
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
