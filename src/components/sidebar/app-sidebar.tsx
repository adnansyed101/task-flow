import * as React from 'react'
import { NavMain } from '@/components/sidebar/nav-main'
import { NavUser } from '@/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import type { Links } from '@/lib/general.types'
import { Link } from '@tanstack/react-router'
import { Coins } from 'lucide-react'

type AppSidebarProps = {
  links: Links
  props?: React.ComponentProps<typeof Sidebar>
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ links, ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
              <Coins className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              TaskFlow
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {links.map((link) => (
          <NavMain key={link.label} links={link} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
