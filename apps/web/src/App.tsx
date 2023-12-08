import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import * as React from 'react';
import { trpc } from './trpc';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContext } from './user-context';
import { getCookie } from './cookies';

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/game",
      element: <div>Game</div>,
    },
    {
      path: "/history",
      element: <div>History</div>
    }
  ])

  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          async headers() {
            return {
              authorization: getCookie("microservichess-token"),
            }
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={null}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
