import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import { renderTrpcPanel } from "trpc-panel";
import ws from "ws";
import { inviteRouter, userRouter, gameRouter } from "./routers";
import { createContext, router } from "./trpc";

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

app.use("/panel", (_, res) => {
  return res.send(
    renderTrpcPanel(appRouter, { url: "http://localhost:8080/trpc" }),
  );
});

const server = app.listen(8080);

const wss = new ws.Server({ server });
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext,
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});

export type AppRouter = typeof appRouter;

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
