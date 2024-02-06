import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpBatchLink, loggerLink, splitLink, wsLink } from "@trpc/client";
import * as React from "react";
import { trpc } from "./trpc";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SignupPage } from "./pages/auth/signup";
import { HomePage } from "./pages/home";
import { GamePage } from "./pages/game";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "./constants"

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_DOMAIN: string
}

interface ImportMeta {
  readonly env?: ImportMetaEnv
}

const VITE_PUBLIC_API_DOMAIN = (import.meta as ImportMeta).env?.VITE_PUBLIC_API_DOMAIN || "localhost:8080"
const httpProtocol = VITE_PUBLIC_API_DOMAIN.startsWith("localhost") ? "http" : "https"
const wsProtocol = VITE_PUBLIC_API_DOMAIN.startsWith("localhost") ? "ws" : "wss"

const wsClient = createWSClient({
  url: `${wsProtocol}://${VITE_PUBLIC_API_DOMAIN}/trpc`,
});

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink({ client: wsClient }),
      false: httpBatchLink({
        url: `${httpProtocol}://${VITE_PUBLIC_API_DOMAIN}/trpc`,
        headers() {
          const jwt = Cookies.get(AUTH_COOKIE_NAME);
          if (jwt) return { authorization: `Bearer ${jwt}` };

          return {};
        },
      }),
    }),
  ],
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
], { basename: "/microservichess" });

export function App() {

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
