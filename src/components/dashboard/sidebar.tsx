import type { NavItem } from '#/lib/schema/general'
import { Link } from '@tanstack/react-router'
import { type Dispatch, type SetStateAction } from 'react'

type SidebarType = {
  navLink: NavItem[]
  mobileOpen: boolean
  setMobileOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({ navLink, mobileOpen, setMobileOpen }: SidebarType) => {
  return (
    <aside
      className={`${
        mobileOpen ? 'block' : 'hidden'
      } lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]`}
    >
      <nav className="rounded-2xl border border-border bg-card p-2">
        {navLink.map((n) => {
          const Icon = n.icon
          return (
            <Link
              to={n.url.to}
              key={n.id}
              onClick={() => {
                setMobileOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-muted-foreground hover:bg-muted hover:text-foreground mt-2`}
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
  )
}

export default Sidebar
