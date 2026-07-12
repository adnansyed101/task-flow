import DashboardHeader from '#/components/dashboard/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  Home,
  Plus,
  ShoppingBag,
  ClipboardList,
  Receipt,
  Icon,
} from 'lucide-react'
import { useState } from 'react'
import type { RegisteredRouter, LinkProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/buyer')({
  component: BuyerPage,
})

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  url: LinkProps<RegisteredRouter['routeTree']>
}[]

const buyer: NavItem = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    url: { to: '/dashboard/buyer/home' },
  },
  {
    id: 'add-task',
    label: 'Add new task',
    icon: Plus,
    url: { to: '/dashboard/buyer/add-task' },
  },
  {
    id: 'my-tasks',
    label: 'My tasks',
    icon: ClipboardList,
    url: { to: '/dashboard/buyer/home' },
  },
  {
    id: 'purchase',
    label: 'Purchase coins',
    icon: ShoppingBag,
    url: { to: '/dashboard/buyer/home' },
  },
  {
    id: 'payments',
    label: 'Payment history',
    icon: Receipt,
    url: { to: '/dashboard/buyer/home' },
  },
]

function BuyerPage() {
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
            {buyer.map((n) => {
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
