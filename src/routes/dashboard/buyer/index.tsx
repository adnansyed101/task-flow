import DashboardHeader from '#/components/dashboard/header'
import { createFileRoute } from '@tanstack/react-router'
import {
  Coins,
  Home,
  ListChecks,
  Plus,
  ShoppingBag,
  Bell,
  LogOut,
  Users2,
  ClipboardList,
  Wallet,
  Receipt,
  FileCheck,
  Send,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/buyer/')({
  component: BuyerPage,
})

type NavItem = { id: string; label: string; icon: React.ElementType }[]

function BuyerPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return <div>Hello World</div>
}
