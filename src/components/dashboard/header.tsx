import { Bell, Coins, LogOut, Menu, X } from 'lucide-react'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { authClient } from '#/lib/auth-client'
import { Route } from '@/routes/__root'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type DashboardHeaderType = {
  mobileOpen: boolean
  setMobileOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardHeader = ({
  mobileOpen,
  setMobileOpen,
}: DashboardHeaderType) => {
  const [notifOpen, setNotifOpen] = useState(false)
  const { session } = Route.useRouteContext()

  function logOut() {
    void authClient.signOut()
    window.location.reload()
  }

  if (!session) {
    throw new Error('No session found in dashboard header component.')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-350 items-center gap-3 px-4 sm:px-6">
        <button
          className="rounded-md p-1.5 hover:bg-muted lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <a href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            m
          </div>
          <span className="hidden font-display text-xl sm:block">Micron</span>
        </a>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
            <Coins className="h-3.5 w-3.5 text-accent" />
            <span className="font-medium tabular-nums">
              {session.user.coin}
            </span>
          </div>

          {/* <NotificationBell
            open={notifOpen}
            setOpen={setNotifOpen}
            email={session.user.email}
          /> */}

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <div className="text-xs capitalize text-muted-foreground">
                {session.user.role}
              </div>
              <div className="text-sm font-medium leading-tight">
                {session.user.name}
              </div>
            </div>
            <Avatar className="h-9 w-9 ring-2 ring-border">
              <AvatarImage
                src={session.user.image || '/batman.jpg'}
                alt={session.user.name}
              />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          </div>

          <Button size="sm" variant="ghost" onClick={logOut}>
            <LogOut className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

// function NotificationBell({
//   open,
//   setOpen,
//   email,
// }: {
//   open: boolean
//   setOpen: (v: boolean) => void
//   email: string
// }) {
//   const notes = useStore((s) => s.notifications)
//     .filter((n) => n.toEmail === email)
//     .sort((a, b) => (a.time > b.time ? -1 : 1))

//   useEffect(() => {
//     if (!open) return
//     const h = () => setOpen(false)
//     const t = setTimeout(() => document.addEventListener('click', h), 50)
//     return () => {
//       clearTimeout(t)
//       document.removeEventListener('click', h)
//     }
//   }, [open, setOpen])

//   return (
//     <div className="relative">
//       <button
//         onClick={(e) => {
//           e.stopPropagation()
//           setOpen(!open)
//         }}
//         className="relative rounded-full p-2 hover:bg-muted"
//       >
//         <Bell className="h-4 w-4" />
//         {notes.length > 0 && (
//           <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
//         )}
//       </button>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-lg"
//         >
//           <div className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground">
//             Notifications
//           </div>
//           {notes.length === 0 ? (
//             <div className="px-3 py-6 text-center text-sm text-muted-foreground">
//               You're all caught up.
//             </div>
//           ) : (
//             <div className="max-h-80 space-y-1 overflow-y-auto">
//               {notes.map((n) => (
//                 <div key={n.id} className="rounded-lg p-3 hover:bg-muted">
//                   <p className="text-sm">{n.message}</p>
//                   <div className="mt-1 text-xs text-muted-foreground">
//                     {new Date(n.time).toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

export default DashboardHeader
