import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { session } = Route.useRouteContext()
  if (!session) {
    return <Navigate to="/auth/login" />
  }
  return <Outlet />
}
