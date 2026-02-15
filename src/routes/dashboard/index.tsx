import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

// Mock user role - will be replaced with real auth
const mockUserRole = 'buyer' as 'worker' | 'buyer' | 'admin'

function DashboardPage() {
  switch (mockUserRole) {
    case 'buyer':
      return <Navigate to="/dashboard/buyer" />
    case 'admin':
      return <Navigate to="/dashboard/admin" />
    default:
      return <Navigate to="/dashboard/worker" />
  }
}
