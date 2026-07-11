import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/lib/auth-client'
import { AuthProvider } from '#/providers/auth-prroviderr'
import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Layout,
})

function Layout() {
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

  return (
    <>
      <AuthProvider
        name={session.user.name}
        email={session.user.email}
        role={session.user.role}
      >
        <Outlet />
      </AuthProvider>
    </>
  )
}
