import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import * as React from "react";
import { trpc } from "./trpc";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SignupPage } from "./pages/auth/signup";
import { HomePage } from "./pages/home";
import { GamePage } from "./pages/game";
import { JoinPage } from "./pages/join";
import Cookies from "js-cookie";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const wsClient = createWSClient({
  url: `ws://localhost:8080/trpc`,
});

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/join",
      element: <JoinPage />,
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
  ]);

  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpBatchLink({
            url: "http://localhost:8080/trpc",
            headers() {
              const jwt = Cookies.get("microservichess-user-jwt");
              if (jwt) return { authorization: `Bearer ${jwt}` };

              return {};
            },
          }),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
