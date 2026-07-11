import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: Layout,
})

function Layout() {
  const { session } = Route.useRouteContext()

  if (session) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
