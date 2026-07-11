import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { auth } from '@/lib/auth' // Your server-side Better Auth instance
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

interface MyRouterContext {
  queryClient: QueryClient
}

// 1. Create a server function to fetch the session reliably on the server
const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  if (!request) return null

  // Better Auth reads the session directly from the request cookies
  const session = await auth.api.getSession({ headers: request.headers })
  return session
})

// 2. Define the context type
interface MyRouterContext {
  session: Awaited<ReturnType<typeof getSession>>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  // 3. Fetch the session before rendering the route tree
  beforeLoad: async () => {
    const session = await getSession()
    return { session }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
