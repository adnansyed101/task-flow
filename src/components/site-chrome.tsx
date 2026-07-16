import { Link, useMatch } from '@tanstack/react-router'
import { Coins, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { authClient } from '#/lib/auth-client'

const GH = 'https://github.com'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  const { session } = useMatch({ from: '__root__' }).context

  function logOut() {
    void authClient.signOut()
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            m
          </div>
          <span className="font-display text-xl">Micron</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground data-[status=active]:text-foreground"
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#workers"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Top workers
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                <Coins className="h-3.5 w-3.5 text-accent" />
                <span className="font-medium tabular-nums">{10}</span>
              </div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 ring-2 ring-border">
                    <AvatarImage
                      src={session.user.image || '/batman.jpg'}
                      alt={session.user.name}
                    />
                    <AvatarFallback>{session.user.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex justify-between">
                    <div className="text-sm font-medium">
                      {session.user.name}
                    </div>
                    -
                    <div className="text-xs capitalize text-muted-foreground">
                      {session.user.role}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logOut}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a
                href={GH}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-primary bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link to="/auth/register">Register</Link>
              </Button>
              <a
                href={GH}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-input px-4 py-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {open && (
          <div className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {session ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.user.image || '/batman.jpg'}
                        alt={session.user.name}
                      />
                      <AvatarFallback>{session.user.name}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {session.user.name}
                      </div>
                      <div className="text-xs capitalize text-muted-foreground">
                        {session.user.role} · {10} coins
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                  >
                    Register
                  </Link>
                </>
              )}
              <a
                href={GH}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-input px-3 py-2 text-sm"
              >
                Join as Developer
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              m
            </div>
            <span className="font-display text-xl">Micron</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A minimal micro-task marketplace. Post work. Complete tasks. Cash
            out — no clutter, no friction.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium">Platform</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth/register" className="hover:text-foreground">
                Become a worker
              </Link>
            </li>
            <li>
              <Link to="/auth/register" className="hover:text-foreground">
                Post a task
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Follow</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Micron. Crafted for the assessment.
      </div>
    </footer>
  )
}
