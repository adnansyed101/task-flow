import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/buyer/')({
  component: IndexPage,
})

function IndexPage() {
  return <Navigate to="/dashboard/buyer/home" />
}
