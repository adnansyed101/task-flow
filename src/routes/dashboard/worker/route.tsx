import DashboardHeader from '#/components/dashboard/header'
import Sidebar from '#/components/dashboard/sidebar'
import type { NavItem } from '#/lib/schema/general'
import { ensureSession } from '#/middleware/auth.function'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { FileCheck, Home, ListChecks, Wallet } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/worker')({
  beforeLoad: async () => {
    const session = await ensureSession()

    if (session.user.role !== 'worker') {
      throw redirect({
        to: '/dashboard',
      })
    }

    return session
  },
  component: WorkerLayout,
})

const worker: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    url: { to: '/dashboard/worker/home' },
  },
  {
    id: 'tasklist',
    label: 'Task list',
    icon: ListChecks,
    url: { to: '/dashboard/worker/task-list' },
  },
  {
    id: 'submissions',
    label: 'My submissions',
    icon: FileCheck,
    url: { to: '/dashboard/worker/submissions' },
  },
  {
    id: 'withdrawals',
    label: 'Withdrawals',
    icon: Wallet,
    url: { to: '/dashboard/worker/withdrawals' },
  },
]

function WorkerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="mx-auto grid max-w-350 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Sidebar
          navLink={worker}
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
