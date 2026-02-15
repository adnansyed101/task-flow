import { createFileRoute, Outlet } from '@tanstack/react-router'
import MainLayout from '@/components/layout/main-layout'
import { Links } from '@/lib/general.types'
import {
  Home,
  ListTodo,
  FileText,
  Wallet,
  Plus,
  Eye,
  CreditCard,
  History,
  Users,
  Shield,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayoutComponent,
})

const mockUserRole = 'worker' as 'worker' | 'buyer' | 'admin'

function DashboardLayoutComponent() {
  const workerLinks: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Task List',
          url: '/dashboard/worker/tasks',
          icon: ListTodo,
        },
        {
          title: 'Task List',
          url: '/dashboard/worker/submissions',
          icon: FileText,
        },
        {
          title: 'Withdrawals',
          url: '/dashboard/worker/withdrawals',
          icon: Wallet,
        },
      ],
    },
  ]

  const buyerLinks: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Add New Task',
          url: '/dashboard/buyer/add-task',
          icon: Plus,
        },
        {
          title: 'My Tasks',
          url: '/dashboard/buyer/my-tasks',
          icon: Eye,
        },
        {
          title: 'Purhcase Coin',
          url: '/dashboard/buyer/purchase',
          icon: CreditCard,
        },
        {
          title: 'Payment history',
          url: '/dashboard/buyer/payments',
          icon: History,
        },
      ],
    },
  ]

  const adminLinks: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Manage Users',
          url: '/dashboard/admin/users',
          icon: Users,
        },
        {
          title: 'Manage Tasks',
          url: '/dashboard/admin/manage-tasks',
          icon: Shield,
        },
      ],
    },
  ]

  const currentLinks =
    mockUserRole === 'admin'
      ? adminLinks
      : mockUserRole === 'worker'
        ? workerLinks
        : buyerLinks

  return (
    <MainLayout links={currentLinks}>
      <Outlet />
    </MainLayout>
  )
}
