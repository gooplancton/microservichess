import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import * as React from 'react';
import { trpc } from './trpc';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContext } from './user-context';
import { Home } from './pages/Home';
import { useCookies } from 'react-cookie';

export function App() {
  const [cookies, _, __] = useCookies(["microservichess-user-jwt"])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
            if (cookies["microservichess-user-jwt"]) return {
              authorization: cookies['microservichess-user-jwt']
            }

            return {}
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
