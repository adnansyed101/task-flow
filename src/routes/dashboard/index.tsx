import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex justify-center h-screen w-full items-center">
        <Spinner />
      </div>
    )
  }
  if (error) return <div>Error: {error.message}</div>

  if (!session) {
    return <Navigate to="/auth/login" />
  }

  if (session.user.role === 'worker') {
    return <Navigate to="/dashboard/worker" />
  } else if (session.user.role === 'buyer') {
    return <Navigate to="/dashboard/buyer" />
  } else {
    return <Navigate to="/dashboard/admin" />
  }
}
