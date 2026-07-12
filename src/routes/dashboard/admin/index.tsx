import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/admin/')({
  component: AdminPage,
})

function AdminPage() {
  return <Navigate to="/dashboard/admin/home" />
}
