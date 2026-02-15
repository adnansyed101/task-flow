import { createFileRoute, Outlet } from '@tanstack/react-router'
import MainLayout from '@/components/layout/main-layout'
import { Links } from '@/lib/general.types'
import { Home, List } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayoutComponent,
})

function DashboardLayoutComponent() {
  const links: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/home',
          icon: Home,
        },
        {
          title: 'Task List',
          url: '/dashboard/task-list',
          icon: List,
        },
        {
          title: 'Task List',
          url: '/dashboard/task-list',
          icon: List,
        },
      ],
    },
  ]

  return (
    <MainLayout links={links}>
      <Outlet />
    </MainLayout>
  )
}
