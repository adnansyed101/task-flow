import type { RegisteredRouter, LinkProps } from '@tanstack/react-router'

export type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  url: LinkProps<RegisteredRouter['routeTree']>
}
