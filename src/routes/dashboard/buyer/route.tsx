import DashboardHeader from '#/components/dashboard/header'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Home, Plus, ShoppingBag, ClipboardList, Receipt } from 'lucide-react'
import { useState } from 'react'
import type { NavItem } from '#/lib/schema/general'
import Sidebar from '#/components/dashboard/sidebar'
import { ensureSession } from '#/middleware/auth.function'

export const Route = createFileRoute('/dashboard/buyer')({
  beforeLoad: async () => {
    const session = await ensureSession()

    if (session.user.role !== 'buyer') {
      throw redirect({
        to: '/dashboard',
      })
    }

    return session
  },
  component: BuyerPage,
})

const buyer: NavItem[] = [
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
    url: { to: '/dashboard/buyer/my-task' },
  },
  {
    id: 'purchase',
    label: 'Purchase coins',
    icon: ShoppingBag,
    url: { to: '/dashboard/buyer/purchase-coins' },
  },
  {
    id: 'payments',
    label: 'Payment history',
    icon: Receipt,
    url: { to: '/dashboard/buyer/payment-history' },
  },
]

function BuyerPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="mx-auto grid max-w-350 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Sidebar
          navLink={buyer}
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
