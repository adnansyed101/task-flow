import DashboardHeader from '#/components/dashboard/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Home, ClipboardList, Users2, Wallet } from 'lucide-react'
import { useState } from 'react'
import type { NavItem } from '#/lib/schema/general'
import Sidebar from '#/components/dashboard/sidebar'

export const Route = createFileRoute('/dashboard/admin')({
  component: AdminPages,
})

const admin: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    url: { to: '/dashboard/admin/home' },
  },
  {
    id: 'users',
    label: 'Manage users',
    icon: Users2,
    url: { to: '/dashboard/admin/manage-user' },
  },
  {
    id: 'tasks',
    label: 'Manage tasks',
    icon: ClipboardList,
    url: { to: '/dashboard/admin/manage-task' },
  },
  {
    id: 'withdrawals',
    label: 'Withdraw requests',
    icon: Wallet,
    url: { to: '/dashboard/admin/withdraw-requests' },
  },
]

function AdminPages() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="mx-auto grid max-w-350 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Sidebar
          navLink={admin}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
