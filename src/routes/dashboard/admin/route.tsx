import DashboardHeader from '#/components/dashboard/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  Home,
  Plus,
  ShoppingBag,
  ClipboardList,
  Receipt,
  Users2,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { NavItem } from '#/lib/schema/general'

export const Route = createFileRoute('/dashboard/admin')({
  component: AdminPages,
})

// worker: [
//     { id: "home", label: "Home", icon: Home },
//     { id: "tasklist", label: "Task list", icon: ListChecks },
//     { id: "submissions", label: "My submissions", icon: FileCheck },
//     { id: "withdrawals", label: "Withdrawals", icon: Wallet },
//   ],
//   buyer: [
//     { id: "home", label: "Home", icon: Home },
//     { id: "add-task", label: "Add new task", icon: Plus },
//     { id: "my-tasks", label: "My tasks", icon: ClipboardList },
//     { id: "purchase", label: "Purchase coins", icon: ShoppingBag },
//     { id: "payments", label: "Payment history", icon: Receipt },
//   ],
//   admin: [
//     { id: "home", label: "Home", icon: Home },
//     { id: "users", label: "Manage users", icon: Users2 },
//     { id: "tasks", label: "Manage tasks", icon: ClipboardList },
//     { id: "withdrawals", label: "Withdraw requests", icon: Wallet },
//   ],

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
    url: { to: '/dashboard/admin/home' },
  },
  {
    id: 'my-tasks',
    label: 'My tasks',
    icon: ClipboardList,
    url: { to: '/dashboard/admin/home' },
  },
  {
    id: 'purchase',
    label: 'Purchase coins',
    icon: ShoppingBag,
    url: { to: '/dashboard/admin/home' },
  },
  {
    id: 'payments',
    label: 'Payment history',
    icon: Receipt,
    url: { to: '/dashboard/admin/home' },
  },
]

function AdminPages() {
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
            {admin.map((n) => {
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
