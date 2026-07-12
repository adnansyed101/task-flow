import DashboardHeader from '#/components/dashboard/header'
import type { NavItem } from '#/lib/schema/general'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { FileCheck, Home, ListChecks, Wallet } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/worker')({
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
        <aside
          className={`${
            mobileOpen ? 'block' : 'hidden'
          } lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]`}
        >
          <nav className="rounded-2xl border border-border bg-card p-2">
            {worker.map((n) => {
              const Icon = n.icon
              return (
                <Link
                  to={n.url.to}
                  key={n.id}
                  onClick={() => {
                    setMobileOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-muted-foreground hover:bg-muted hover:text-foreground`}
                  activeProps={{
                    className: 'bg-primary text-primary-foreground',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-4 rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground">
            <div className="font-medium text-foreground">Need help?</div>
            <p className="mt-1">
              Check the README for demo accounts and platform features.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
